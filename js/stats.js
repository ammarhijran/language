// Derived numbers used across views.
import { isDue, status, startOfDay } from './srs.js';
import { recognitionSupported } from './speech.js';
import { phraseSentence } from './sentences.js';

export function dueWords(ctx, now = Date.now()) {
  const { lang, store } = ctx;
  const cards = store.getCards(lang.code);
  return lang.words
    .map((word) => ({ word, card: cards[word.id] }))
    .filter(({ card }) => isDue(card, now))
    .sort((a, b) => a.card.due - b.card.due);
}

/**
 * Words that keep slipping: forgotten at least once in review (a lapse) or
 * with a lowered ease, most-forgotten first. Words ticked "already learned"
 * and words not yet reviewed don't count.
 */
export function trickyWords(ctx) {
  const cards = ctx.store.getCards(ctx.lang.code);
  return ctx.lang.words
    .filter((w) => { const c = cards[w.id]; return c && !c.known && (c.lapses >= 1 || c.ease <= 2.2); })
    .sort((a, b) => (cards[b.id].lapses - cards[a.id].lapses) || (cards[a.id].ease - cards[b.id].ease));
}

export function learnedWords(ctx) {
  const cards = ctx.store.getCards(ctx.lang.code);
  return ctx.lang.words.filter((w) => cards[w.id]);
}

export function computeStats(ctx) {
  const { lang, store } = ctx;
  const cards = store.getCards(lang.code);
  const counts = { new: 0, learning: 0, familiar: 0, mastered: 0, known: 0 };
  for (const w of lang.words) counts[status(cards[w.id])]++;
  const today = store.getDay(lang.code); // summed over devices
  return {
    total: lang.words.length,
    learned: lang.words.length - counts.new,
    counts,
    due: dueWords(ctx).length,
    streak: store.streak(lang.code),
    today,
  };
}

// ---------- What to learn next ----------

const groupOf = (c) => c.group || 'words';
const paths = new WeakMap();

/**
 * The suggested order of a pack's topics. A pack can give its own as `path`
 * (category ids; topics it leaves out follow in pack order). Otherwise the
 * groups take turns, so a learner who follows the main button meets ready-
 * made phrases and everyday speech early instead of after every word topic:
 * two word topics, then one phrase situation, over and over (each group in
 * pack order, most common first), with the "Talk like a local" topics after
 * the first phrase situation and then after every third.
 */
export function learningPath(lang) {
  if (paths.has(lang)) return paths.get(lang);
  const cats = lang.categories.filter((c) => !c.own); // the learner's own words are not a step of the course
  let path;
  if (Array.isArray(lang.path)) {
    const listed = lang.path.map((id) => cats.find((c) => c.id === id)).filter(Boolean);
    path = [...new Set(listed)];
    path.push(...cats.filter((c) => !path.includes(c)));
  } else {
    const of = (g) => cats.filter((c) => groupOf(c) === g);
    const words = of('words');
    const phrases = of('phrases');
    const talk = of('talk');
    path = [];
    let w = 0;
    let p = 0;
    let t = 0;
    while (w < words.length || p < phrases.length) {
      for (let k = 0; k < 2 && w < words.length; k++) path.push(words[w++]);
      if (p < phrases.length) {
        path.push(phrases[p++]);
        if (t < talk.length && (p === 1 || (p - 1) % 3 === 0)) path.push(talk[t++]);
      }
    }
    path.push(...talk.slice(t), ...cats.filter((c) => !path.includes(c)));
  }
  paths.set(lang, path);
  return path;
}

/** Learned (seen) and total entries per topic: Map id → { learned, total }. One pass over the words. */
export function topicCounts(ctx) {
  const cards = ctx.store.getCards(ctx.lang.code);
  const out = new Map(ctx.lang.categories.map((c) => [c.id, { learned: 0, total: 0 }]));
  for (const w of ctx.lang.words) {
    const n = out.get(w.cat);
    if (!n) continue;
    n.total++;
    if (cards[w.id]) n.learned++;
  }
  return out;
}

/**
 * What to learn next: `resume` is the topic of the last lesson started
 * (progress[lang].lastCat) while it still has new words, `next` the first
 * `count` other topics on the learning path that still have new words.
 * @returns {{ resume: object|null, next: object[] }}
 */
export function nextTopics(ctx, { count = 3 } = {}) {
  const { lang } = ctx;
  const counts = topicCounts(ctx);
  const open = (c) => { const n = counts.get(c.id); return !!n && n.learned < n.total; };
  const lastId = ctx.store.getLastCat?.(lang.code);
  const last = lastId ? lang.categories.find((c) => c.id === lastId) : null;
  const resume = last && open(last) ? last : null;
  const next = [];
  for (const c of learningPath(lang)) {
    if (next.length >= count) break;
    if (c !== resume && open(c)) next.push(c);
  }
  return { resume, next };
}

/** The topic to learn next: the one to continue, else the next on the path (undefined when all are learned). */
export function nextCategory(ctx) {
  const { resume, next } = nextTopics(ctx, { count: 1 });
  return resume || next[0];
}

const FAMILIAR = new Set(['familiar', 'mastered', 'known']);

/** Exercise type for a review, based on how well the word is known (pass `lang` to allow sentence building). */
export function chooseReviewType(card, word, lang) {
  const speak = recognitionSupported();
  // Typing a whole sentence is tedious: phrases are practised by choice, recall and speaking.
  const long = word && (word.tr.trim().split(/\s+/).length > 3 || word.tr.length > 24);
  let pool;
  if (card.reps <= 1) pool = ['listen', 'meaning', 'produce'];
  else if (card.reps <= 3) pool = ['produce', 'listen', 'flashcard', ...(speak ? ['speak'] : [])];
  else pool = ['type', 'flashcard', 'listen', ...(speak ? ['speak', 'speak'] : ['type'])];
  if (long) pool = pool.filter((t) => t !== 'type').concat(['produce']);
  // A phrase the learner already knows fairly well is sometimes built from
  // shuffled words instead: recall of its word order, not just its meaning.
  if (lang && word && FAMILIAR.has(status(card)) && phraseSentence(lang, word)) pool.push('build');
  // Where stress is unwritten and has to be learned with the word (Ukrainian),
  // a single word the learner already knows is sometimes asked for its stress.
  if (lang?.stressPractice && word && FAMILIAR.has(status(card)) && !/\s/.test(word.tr.trim())) pool.push('stress');
  return pool[Math.floor(Math.random() * pool.length)];
}

export function wordOfTheDay(ctx, d = new Date()) {
  const day = Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  const withExamples = ctx.lang.words.filter((w) => w.ex);
  const words = withExamples.length >= 30 ? withExamples : ctx.lang.words;
  return words[(day * 7919) % words.length];
}

// Long topic lists are split by stage (a category's `stage`, 1 when absent),
// each under its own heading on the Learn screen.
const STAGES = ['Start here', 'Everyday life', 'Going further', 'Wider world'];
/** [{ stage, title, cats }] in stage order; topics keep their order within a stage. */
export function stagesOf(cats) {
  const out = [];
  for (const c of cats) {
    const stage = Math.min(STAGES.length, Math.max(1, c.stage || 1));
    let g = out.find((x) => x.stage === stage);
    if (!g) out.push(g = { stage, title: STAGES[stage - 1], cats: [] });
    g.cats.push(c);
  }
  return out.sort((a, b) => a.stage - b.stage);
}

/**
 * How many of the language's words fall due for review on each of the next
 * `days` days, by the calendar: [{ d: Date, n }], today first. Today's
 * number includes what is overdue.
 */
export function reviewForecast(lang, cards, { days = 7, now = Date.now() } = {}) {
  const out = Array.from({ length: days }, (_, i) => ({ d: new Date(startOfDay(now, i)), n: 0 }));
  const end = out.map((_, i) => startOfDay(now, i + 1)); // each day ends where the next starts
  for (const w of lang.words) {
    const c = cards[w.id];
    if (!c || !Number.isFinite(c.due)) continue;
    const i = end.findIndex((t) => c.due < t);
    if (i >= 0) out[i].n++;
  }
  return out;
}

/** Whether two strings are the same or one letter apart (one changed, added or left out). */
export function oneApart(a, b) {
  const x = [...a];
  const y = [...b];
  if (Math.abs(x.length - y.length) > 1) return false;
  let i = 0;
  while (i < x.length && i < y.length && x[i] === y[i]) i++;
  let j = 0;
  while (j < x.length - i && j < y.length - i && x[x.length - 1 - j] === y[y.length - 1 - j]) j++;
  return Math.max(x.length, y.length) - i - j <= 1;
}

/**
 * Other one-word entries that look or sound almost like `word`: the same
 * form (a homonym) or one letter away — kuş / kış, おばさん / おばあさん.
 * Compared in the form the language is read in (kana for Japanese, the
 * transliteration for Arabic). Words of
 * fewer than three letters have too many neighbours to be worth listing.
 */
export function lookalikes(lang, word, max = 4) {
  // Arabic is compared in transliteration: without its vowels almost every short word has neighbours.
  const form = (w) => (/\s/.test(w.tr.trim()) ? '' : w.tl ? String(w.tl).toLowerCase() : lang.normalize(w.kana ? w.kana.replace(/\s+/g, '') : w.tr));
  const key = form(word);
  if ([...key].length < 3) return [];
  const out = [];
  for (const w of lang.words) {
    if (w.id === word.id) continue;
    const k = form(w);
    if ([...k].length < 3 || !oneApart(key, k)) continue;
    out.push(w);
    if (out.length >= max) break;
  }
  return out;
}
