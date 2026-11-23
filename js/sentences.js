// Practice sentences for the sentence builder: phrases, example sentences and
// grammar examples cut into word tiles. Plain data, no DOM, so it runs in node.
//
// A sentence is { id, text, en, tokens, tiles, display?, reading?, audio, audioText, source, reg?, dialect?, orders? }:
//   tokens     the words in the right order, as written, punctuation attached
//   tiles      what each tile shows: the token without its punctuation, and without
//              the capital that only marks the start of a sentence (see tileTexts)
//   text       the tokens joined by spaces: the finished sentence
//   display    the sentence as normally written, when the tiles are a reading of
//              it (Japanese: kana tiles for a sentence written with kanji)
//   reading    kana · rōmaji or transliteration, when the source has one
//   audio      what the voice reads: the source entry, which ctx.say() reads through
//              lang.speech() (its say.js override, Arabic pausal form, Egyptian voice);
//              the sentence as written, not the spaced kana tiles (a particle は would be read “ha”)
//   audioText  the sentence as written (the text of `audio`)
//   source     { kind: 'phrase' | 'pair' | 'example' | 'grammar', wordId?, lessonId? }
//   orders     other valid orders listed on the source entry (tile texts), if any
//
// Other valid orders are accepted too (acceptedOrders): the pack's rules
// (lang.wordOrder: “please” at either end, time words, Ukrainian object
// pronouns, a name or other vocative), the entry's own `orders`, and any
// other sentence of the course made of the same words with the same meaning.

export const MIN_TOKENS = 3;
export const MAX_TOKENS = 8;
/** Fewer than this and a round is not worth starting. */
export const MIN_SENTENCES = 3;

const HAS_WORD = /[\p{L}\p{N}]/u;
// Joins a dialogue dash to its word so the tile never breaks between them.
const NBSP = '\u00a0';

/**
 * Split a sentence into word tiles on spaces. A token with no letters or
 * digits (the “—” that opens each line of a dialogue) is attached to the next
 * word, or to the last one when nothing follows.
 */
export function tokenize(text) {
  const out = [];
  let lead = '';
  for (const t of String(text ?? '').trim().split(/\s+/)) {
    if (!t) continue;
    if (!HAS_WORD.test(t)) lead += t + NBSP;
    else { out.push(lead + t); lead = ''; }
  }
  if (lead && out.length) out[out.length - 1] += NBSP + lead.slice(0, -1);
  return out;
}

// What a tile key keeps: letters, marks and digits.
const NOT_WORD = /[^\p{L}\p{M}\p{N}]/gu;

/**
 * The comparison key of a tile: the pack's normalize() drops case and (Arabic)
 * vowel marks; punctuation a pack keeps (Arabic's normalize keeps the dialogue
 * dash “—”) is dropped here, so a word with a dash matches the same word without.
 */
export const tileKey = (lang, token) => lang.normalize(token).replace(NOT_WORD, '');

/**
 * Check the learner's order (tile texts) against the sentence, word by word.
 * Tiles are compared by key, so two identical words may swap places.
 * `marks[i]` says whether position i holds the right word.
 */
export function checkOrder(lang, sentence, answer) {
  const got = answer.map((t) => tileKey(lang, t));
  const orders = acceptedOrders(lang, sentence);
  const at = orders.findIndex((o) => o.length === got.length && o.every((k, i) => got[i] === k));
  // `usual`: the order as the course writes it; else another valid order (the reveal shows the usual one).
  if (at >= 0) return { correct: true, marks: got.map(() => true), usual: at === 0 };
  // Wrong: mark the places against the valid order it comes closest to.
  const right = (o) => o.map((k, i) => got[i] === k);
  const marks = orders.map(right).reduce((a, b) => (b.filter(Boolean).length > a.filter(Boolean).length ? b : a));
  return { correct: false, marks, usual: true };
}

// ---------- Tiles ----------

// Punctuation at either end of a token (“ласка,” “цукру.” “— Selam!”).
const EDGE_PUNCT = /^[^\p{L}\p{M}\p{N}]+|[^\p{L}\p{M}\p{N}]+$/gu;
const ENDS_SENTENCE = /[.!?…؟。！？:]["”»)]*$/u;
const startsSentence = (tokens, i) => i === 0 || ENDS_SENTENCE.test(tokens[i - 1]) || /^[—–-]/u.test(tokens[i]);

/**
 * What each tile shows: its word without the punctuation around it, and
 * without a capital that only says “a sentence starts here”: otherwise the
 * capital and the full stop give the first and last places away. A name
 * keeps its capital. The finished sentence is shown with both.
 */
export function tileTexts(lang, tokens) {
  const names = properNouns(lang);
  return tokens.map((t, i) => {
    const bare = t.replace(EDGE_PUNCT, '') || t;
    const [first, second = ''] = bare;
    // A name, or an abbreviation (ATM), keeps its capitals.
    if (!startsSentence(tokens, i) || !/\p{Lu}/u.test(first) || /\p{Lu}/u.test(second) || names.has(tileKey(lang, bare)) || suffixedName(lang, bare)) return bare;
    return first.toLocaleLowerCase(lang.code) + bare.slice(first.length);
  });
}

// Turkish writes a suffix on a name after an apostrophe: İzmir'e, Türkiye'de.
const suffixedName = (lang, word) => lang.code === 'tr' && /^\p{Lu}\p{L}*['’]\p{L}/u.test(word);

const NAMES = new WeakMap();
/**
 * Tile keys of the names in a pack: words written with a capital where no
 * sentence starts, and capitalised single-word entries (İstanbul, Україна).
 */
function properNouns(lang) {
  if (NAMES.has(lang)) return NAMES.get(lang);
  const names = new Set();
  const scan = (text) => {
    const tokens = tokenize(text);
    tokens.forEach((t, i) => {
      const bare = t.replace(EDGE_PUNCT, '');
      if (!/^\p{Lu}/u.test(bare)) return;
      if (!startsSentence(tokens, i) || suffixedName(lang, bare)) names.add(tileKey(lang, bare));
    });
  };
  const groups = new Map(lang.categories.map((c) => [c.id, c.group || 'words']));
  for (const w of lang.words) {
    if (groups.get(w.cat) === 'words' && /^\p{Lu}\p{Ll}/u.test(w.tr) && !/\s/.test(w.tr.trim())) names.add(tileKey(lang, w.tr));
    [w.tr, w.pair?.tr, w.ex?.[0], ...(w.alt || [])].filter(Boolean).forEach(scan);
  }
  for (const l of lang.grammar || []) for (const sec of l.sections || []) for (const x of sec.examples || []) scan(x.tr);
  NAMES.set(lang, names);
  return names;
}

// ---------- Other valid orders ----------

/**
 * Every order the learner may build, as tile keys, the usual one first: the
 * sentence's own, those its pack's rules allow (lang.wordOrder), those
 * listed on its entry (`orders`), and any other sentence of the course with
 * the same words and the same meaning (Hava bugün çok güzel · Bugün hava çok güzel).
 */
export function acceptedOrders(lang, sentence) {
  const want = sentence.tokens.map((t) => tileKey(lang, t));
  const bag = [...want].sort().join(' ');
  const seen = new Set();
  const out = [];
  const add = (keys) => {
    const k = keys.join(' ');
    // Only the same tiles: an order rule never adds or drops a word.
    if (seen.has(k) || [...keys].sort().join(' ') !== bag) return;
    seen.add(k);
    out.push(keys);
  };
  add(want);
  // Japanese tiles are a kana reading without punctuation: the sentence as written shows where sentences end.
  const twoSentences = /[。！？!?](?=.)/u.test((sentence.display || '').trim());
  if (!twoSentences) ruleOrders(lang, want, sentence.tokens).forEach(add);
  for (const o of sentence.orders || []) add(tokenize(o).map((t) => tileKey(lang, t)));
  courseOrders(lang, bag, sentence.en).forEach(add);
  return out;
}

const keysOf = (lang, text) => tokenize(text).map((t) => tileKey(lang, t)).filter(Boolean);
const indexOfRun = (keys, run) => {
  for (let i = 0; i + run.length <= keys.length; i++) if (run.every((k, j) => keys[i + j] === k)) return i;
  return -1;
};

// Where a clause ends inside a sentence: after a comma, semicolon or dash.
const ENDS_CLAUSE = /[,;،؛—–]["”»)]*$/u;

/** [start, end) of each comma-separated clause of `tokens`. */
function clauses(tokens) {
  const out = [];
  let from = 0;
  tokens.forEach((t, i) => {
    if (i === tokens.length - 1 || ENDS_CLAUSE.test(t)) { out.push([from, i + 1]); from = i + 1; }
  });
  return out;
}

/**
 * Orders the pack's word-order rules allow for `keys` (`tokens`: as written,
 * for the commas). Each rule moves one thing within one sentence: a sentence
 * of two (“Вибачте, я не розумію. Повторіть, будь ласка.”) is left alone.
 */
function ruleOrders(lang, keys, tokens) {
  const r = lang.wordOrder;
  if (!r || tokens.slice(0, -1).some((t) => ENDS_SENTENCE.test(t))) return [];
  const set = (list) => new Set((list || []).flatMap((x) => keysOf(lang, x)));
  const out = [];

  // Japanese: a bare time word (no particle after it) may stand before or
  // after the topic that opens the sentence (母は毎朝… · 毎朝母は…).
  if (r.aroundTopic) {
    const times = set(r.aroundTopic.time);
    const particles = set(r.aroundTopic.particles);
    const [topic] = keysOf(lang, r.aroundTopic.topic);
    const bareTime = (i) => times.has(keys[i]) && i + 1 < keys.length && !particles.has(keys[i + 1]);
    const isTopic = (i) => i + 1 < keys.length && !particles.has(keys[i]) && !times.has(keys[i]) && keys[i + 1] === topic;
    if (keys.length > 4 && bareTime(0) && isTopic(1)) out.push([keys[1], keys[2], keys[0], ...keys.slice(3)]);
    if (keys.length > 4 && isTopic(0) && bareTime(2)) out.push([keys[2], keys[0], keys[1], ...keys.slice(3)]);
  }

  const questions = set(r.questionWords);
  const together = set(r.keepTogether);
  const timeRuns = (r.time || []).map((t) => keysOf(lang, t)).sort((a, b) => b.length - a.length);
  const timeKeys = new Set(timeRuns.flat());
  // Who a time word may follow (Я сьогодні…, Hava bugün…): a list, or the pack's own test.
  const afterSet = Array.isArray(r.secondAfter) && set(r.secondAfter);
  const after = typeof r.secondAfter === 'function' ? (w, next) => r.secondAfter(w, properNouns(lang), next) : afterSet ? (w) => afterSet.has(w) : () => true;
  const parts = clauses(tokens);
  const clauseAt = (i) => parts.find(([a, b]) => i >= a && i < b);
  // keys with [a, b) replaced by `middle`
  const splice = (a, b, middle) => [...keys.slice(0, a), ...middle, ...keys.slice(b)];

  // “Please” on its own between commas may open or close the sentence
  // (Мені, будь ласка, капучино…); inside a clause, it may open or close that clause.
  for (const run of (r.free || []).map((x) => keysOf(lang, x))) {
    const at = indexOfRun(keys, run);
    if (at < 0 || keys.length === run.length) continue;
    const [a, b] = clauseAt(at);
    const end = at + run.length;
    const rest = [...keys.slice(0, at), ...keys.slice(end)];
    if (a === at && b === end) out.push([...run, ...rest], [...rest, ...run]);
    else if (a === at && b > end) out.push(splice(a, b, [...keys.slice(end, b), ...run]));
    else if (b === end && a < at) out.push(splice(a, b, [...run, ...keys.slice(a, at)]));
  }

  // A time word moves between the places in its clause the pack allows, from one of them.
  if (!questions.has(keys[0])) {
    for (const run of timeRuns) {
      const at = indexOfRun(keys, run);
      if (at < 0) continue;
      const [a, b] = clauseAt(at);
      const end = at + run.length;
      // A clause with a question particle or a subordinate clause (mı, що, أَنَّ) keeps its order.
      if (r.freeze && keys.slice(a, b).some((k) => r.freeze.test(k))) break;
      // A time word tied to its neighbour (yarın sabah, до завтра, çok…) stays put.
      const next = end < b ? keys[end] : null;
      const prev = at > a ? keys[at - 1] : null;
      if ([next, prev].some((k) => k && (together.has(k) || timeKeys.has(k)))) break;
      const rest = [...keys.slice(a, at), ...keys.slice(end, b)];
      const canFollow = (w) => rest.length > 1 && !together.has(w) && !timeKeys.has(w) && !questions.has(w) && after(w, rest[1]);
      const slots = {
        start: [...run, ...rest],
        second: canFollow(rest[0]) ? [rest[0], ...run, ...rest.slice(1)] : null,
        end: rest.length > 1 ? [...rest, ...run] : null,
      };
      const here = keys.slice(a, b).join(' ');
      const from = Object.keys(slots).find((k) => slots[k]?.join(' ') === here);
      if (r.timeSlots.includes(from)) r.timeSlots.forEach((k) => slots[k] && out.push(splice(a, b, slots[k])));
      break;
    }
  }

  // Ukrainian: an object pronoun before or after the final word of a statement (Я тебе люблю · Я люблю тебе).
  if (r.objectPronouns && !/\?/.test(tokens.at(-1))) {
    const pron = set(r.objectPronouns);
    const n = keys.length;
    const [x, y] = keys.slice(-2);
    const other = pron.has(x) ? y : x;
    // …but not when the final word is an infinitive after another verb (навчив мене плавати).
    const verbBefore = r.infinitive?.test(keys[n - 1]) && r.verb?.test(keys[n - 3]);
    if (n >= 3 && pron.has(x) !== pron.has(y) && !together.has(other) && !together.has(keys[n - 3]) && !verbBefore && clauseAt(n - 2) === clauseAt(n - 1)) {
      out.push([...keys.slice(0, -2), y, x]);
    }
  }

  // A one-word vocative set off by a comma may stand at either end (Мамо, я вдома · Я вдома, мамо).
  // Not a name: after a comma it may be an apposition (Це моя дружина, Оксана).
  if (r.vocatives) {
    const voc = set(r.vocatives);
    const n = keys.length;
    const isVoc = (k) => voc.has(k);
    if (n > 2 && /,$/.test(tokens[0]) && isVoc(keys[0])) out.push([...keys.slice(1), keys[0]]);
    if (n > 2 && /,$/.test(tokens[n - 2]) && isVoc(keys[n - 1])) out.push([keys[n - 1], ...keys.slice(0, -1)]);
  }
  return out;
}

// The words of an English meaning, for telling whether two sentences mean the same.
const meaningKey = (en) => `${String(en).toLowerCase().match(/[\p{L}\p{N}']+/gu)?.sort().join(' ')}${/\?\s*$/.test(en) ? '?' : ''}`;

const COURSE = new WeakMap();
/** Orders of other course sentences (and phrase spellings) with the same tiles (`bag`) and the same meaning. */
function courseOrders(lang, bag, en) {
  let index = COURSE.get(lang);
  if (!index) {
    index = new Map();
    const alts = lang.words.flatMap((w) => (w.alt || []).map((tr, i) => makeSentence(lang, { ...w, tr, kana: undefined }, { kind: 'phrase', wordId: w.id }, `alt:${w.id}:${i}`)));
    for (const x of [...sentencesFor(lang, 'all'), ...alts.filter(Boolean)]) {
      const keys = x.tokens.map((t) => tileKey(lang, t));
      const k = [...keys].sort().join(' ');
      if (!index.has(k)) index.set(k, []);
      index.get(k).push({ keys, meaning: meaningKey(x.en) });
    }
    COURSE.set(lang, index);
  }
  const meaning = meaningKey(en);
  return (index.get(bag) || []).filter((x) => x.meaning === meaning).map((x) => x.keys);
}

/**
 * A practice sentence from an entry-like object { tr, en, kana?, tl?, rom?, reg?, dialect? },
 * or null when it has no tiles (a Japanese sentence without a kana reading) or
 * is too short or too long to build.
 */
export function makeSentence(lang, src, source, id) {
  const tiles = lang.sentenceTiles(src);
  if (!tiles || !src.en) return null;
  const tokens = tokenize(tiles);
  if (tokens.length < MIN_TOKENS || tokens.length > MAX_TOKENS) return null;
  const text = tokens.join(' ');
  return {
    id,
    text,
    en: src.en,
    tokens,
    tiles: tileTexts(lang, tokens),
    display: tiles === src.tr ? undefined : src.tr,
    reading: lang.reading(src) || undefined,
    audio: src,
    audioText: src.tr,
    source,
    reg: src.reg,
    dialect: src.dialect,
    ...(src.orders ? { orders: src.orders } : {}),
  };
}

/** The phrase itself as a sentence (null when it can't be built): used by reviews. */
export function phraseSentence(lang, word) {
  return makeSentence(lang, word, { kind: 'phrase', wordId: word.id }, `phrase:${word.id}`);
}

const isPhraseGroup = (group) => group === 'phrases' || group === 'talk';

/**
 * Sentences that come with a word: for phrases and talk-like-a-local entries
 * the phrase and its other-register pair, and for every word its example sentence.
 */
export function wordSentences(lang, word, group = lang.categories.find((c) => c.id === word.cat)?.group) {
  const out = [];
  if (isPhraseGroup(group)) {
    out.push(phraseSentence(lang, word));
    if (word.pair) {
      const pair = { ...word.pair, en: word.pair.en || word.en };
      out.push(makeSentence(lang, pair, { kind: 'pair', wordId: word.id }, `pair:${word.id}`));
    }
  }
  if (word.ex) {
    const example = word.example || { tr: word.ex[0], en: word.ex[1] };
    out.push(makeSentence(lang, example, { kind: 'example', wordId: word.id }, `example:${word.id}`));
  }
  return out.filter(Boolean);
}

/** A grammar lesson's examples as sentences ([] for an unknown lesson). */
export function lessonSentences(lang, lessonId) {
  const lesson = (lang.grammar || []).find((l) => l.id === lessonId);
  if (!lesson) return [];
  return lesson.sections.flatMap((s, si) => (s.examples || []).map((ex, ei) =>
    makeSentence(lang, ex, { kind: 'grammar', lessonId }, `grammar:${lessonId}:${si}:${ei}`))).filter(Boolean);
}

/**
 * The lines of a Read & Listen text as practice sentences (those that can be
 * built: not too short, not too long, with a translation), in the text's order.
 */
export function textSentences(lang, text) {
  if (!text?.lines) return [];
  return unique(lang, text.lines.map((line, i) =>
    makeSentence(lang, line, { kind: 'text', textId: text.id }, `text:${text.id}:${i}`)).filter(Boolean));
}

/** The same sentence from two places (a phrase and an example, two lessons) is practised once. */
function unique(lang, sentences) {
  const seen = new Set();
  return sentences.filter((s) => {
    const key = s.tokens.map((t) => tileKey(lang, t)).join(' ');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Practice sentences for a scope:
 *   '<category id>'      its entries and their example sentences
 *   'learned' (default)  from the words and phrases the learner has cards for (`cards`: id → card)
 *   'all'                every entry and every grammar example
 *   'grammar:<lessonId>' that lesson's examples
 */
export function sentencesFor(lang, scope, { cards = {} } = {}) {
  scope = scope || 'learned';
  if (scope.startsWith('grammar:')) return unique(lang, lessonSentences(lang, scope.slice('grammar:'.length)));
  const groups = new Map(lang.categories.map((c) => [c.id, c.group || 'words']));
  const words = scope === 'all' ? lang.words
    : scope === 'learned' ? lang.words.filter((w) => cards[w.id])
      : lang.wordsIn(scope);
  const out = words.flatMap((w) => wordSentences(lang, w, groups.get(w.cat)));
  if (scope === 'all') for (const l of lang.grammar || []) out.push(...lessonSentences(lang, l.id));
  return unique(lang, out);
}
