// Read & Listen helpers: loading texts on demand, glossary matching, the
// line-by-line player, shadowing fades, recording / scoring a line, and the
// entry card on Learn. The screens live in js/views/read.js; everything here
// except readLink() is free of DOM work, so the tests run it in node.
import * as speech from './speech.js';
import { scoreSpoken } from './compare.js';
import { h, icon } from './ui.js';

export const LEVELS = ['A1', 'A2', 'B1'];

export const KINDS = {
  dialogue: { emoji: '💬', label: 'Dialogues', one: 'Dialogue' },
  story: { emoji: '📖', label: 'Stories', one: 'Story' },
  everyday: { emoji: '🧾', label: 'Everyday', one: 'Everyday text' },
  speech: { emoji: '🎤', label: 'Speeches', one: 'Speech' },
  twister: { emoji: '👅', label: 'Tongue twisters', one: 'Tongue twisters' },
  saying: { emoji: '🪶', label: 'Proverbs', one: 'Proverbs' },
};

/** Texts made for saying aloud: line-by-line practice (repeat, shadow) is offered for them. */
export const canPractise = (text) => ['speech', 'twister', 'saying'].includes(text?.kind);
/** Recording "the whole thing" only makes sense for a speech. */
/** A text needs this many gaps for "Fill the gaps" to be offered. */
export const MIN_GAPS = 4;
export const practiceModes = (text) => (text?.kind === 'speech' ? ['repeat', 'shadow', 'record'] : canPractise(text) ? ['repeat', 'shadow'] : []);

export const REGISTERS = {
  casual: { label: 'Casual', cls: 'reg-casual' },
  polite: { label: 'Polite', cls: 'reg-polite' },
  mixed: { label: 'Casual + polite', cls: 'reg-mixed' },
};

// ---------- Loading ----------

// Texts are big (a few hundred kB for all languages), so each language's file
// is only fetched when Read & Listen (or the Learn card counting them) needs it.
const cache = new Map();
const pending = new Map();

/** The texts of a language if they are already loaded, else null. */
export const cachedTexts = (code) => cache.get(code) ?? null;

/** Load a language's texts (once). Resolves to an array, possibly empty. */
export function loadTexts(code) {
  if (cache.has(code)) return Promise.resolve(cache.get(code));
  if (!/^[a-z]{2,3}$/.test(code)) return Promise.resolve([]);
  if (!pending.has(code)) {
    pending.set(code, import(`./languages/${code}/texts.js`)
      .then((m) => {
        const texts = Array.isArray(m.texts) ? m.texts : [];
        cache.set(code, texts);
        return texts;
      })
      .finally(() => pending.delete(code)));
  }
  return pending.get(code);
}

// ---------- Entry card on Learn ----------

/** The "Read & Listen" card on the Learn screen; the text count fills in once loaded. */
export function readLink(ctx) {
  const { lang } = ctx;
  const small = h('small', null, 'Dialogues, stories, speeches and proverbs');
  const fill = (texts) => {
    ctx.game.registerTexts?.(lang.code, texts.map((t) => t.id));
    const done = texts.filter((t) => ctx.game.textBest(lang.code, t.id) != null).length;
    small.textContent = texts.length
      ? `${texts.length} texts · dialogues, stories, speeches, proverbs${done ? ` · ${done} done` : ''}`
      : 'Coming soon: dialogues, stories and speeches';
  };
  const cached = cachedTexts(lang.code);
  if (cached) fill(cached);
  else loadTexts(lang.code).then(fill, () => {});
  return h('a', { class: 'quick-link read-link', href: '#/read' },
    h('span', { class: 'read-link-icon', 'aria-hidden': 'true' }, '🎧'),
    h('span', null, h('b', null, 'Read & Listen'), small),
    icon('arrow'));
}

// ---------- Text facts ----------

const levelRank = (l) => (LEVELS.includes(l) ? LEVELS.indexOf(l) : LEVELS.length);

/** A1 → B1, keeping the authors' order inside a level. */
export const sortTexts = (texts) => texts.map((t, i) => [t, i])
  .sort((a, b) => levelRank(a[0].level) - levelRank(b[0].level) || a[1] - b[1])
  .map(([t]) => t);

export function filterTexts(texts, { level = 'all', kind = null } = {}) {
  return texts.filter((t) => (level === 'all' || t.level === level) && (!kind || t.kind === kind));
}

/** A text of 20 lines or more: marked "Long read" in the list. */
export const isLongRead = (text) => text.lines.length >= 20;

// Seconds a native reading takes: about 12 letters (or 7 kana) a second, a short pause per line.
const speechSeconds = (text) => text.lines.reduce((sec, l) => sec + (l.kana ? [...l.kana.replace(/\s+/g, '')].length / 7 : [...l.tr].length / 12), 0) + text.lines.length * 1.5;

/** Rough minutes to listen once and read along, plus the questions: three readings. */
export function estimateMinutes(text) {
  return Math.max(1, Math.round((speechSeconds(text) * 3) / 60));
}

/**
 * How long a learner may record the whole text: about twice a native reading
 * of it, never under 1:30 and never over 5:00, in steps of 30 s.
 */
export function recordLimit(text) {
  const ms = Math.ceil((speechSeconds(text) * 2) / 30) * 30000;
  return Math.min(300000, Math.max(90000, ms));
}

/** Speakers in order of appearance → colour index (lines without a speaker get none). */
export function speakerIndex(text) {
  const map = new Map();
  for (const l of text.lines) if (l.speaker && !map.has(l.speaker)) map.set(l.speaker, map.size);
  return map;
}

/** Role-play needs a dialogue with at least two people. */
export const canRolePlay = (text) => text.kind === 'dialogue' && speakerIndex(text).size >= 2;

/** The text after `id` in list order, else the first one not done yet. */
export function nextText(texts, id, isDone = () => false) {
  const list = sortTexts(texts);
  const i = list.findIndex((t) => t.id === id);
  return list.slice(i + 1).find((t) => !isDone(t.id)) || list.slice(i + 1)[0]
    || list.find((t) => t.id !== id && !isDone(t.id)) || null;
}

// ---------- Glossary ----------

// Pattern entries such as "〜によると…そうだ" are matched part by part.
const PATTERN_SPLIT = /[〜~…]+|\.{3,}/;
// Glossary items are dictionary forms; in Turkish (and other languages with
// suffixes) the text often adds endings: "karşı daire" → "karşı daireye".
// Items at least this long may be followed by more letters of the same word.
const MIN_STEM = 4;
const ARABIC_PROCLITICS = new Set(['', 'و', 'ف', 'ب', 'ل', 'ك', 'س', 'ال', 'وال', 'فال', 'بال', 'كال', 'لل', 'ولل', 'فلل', 'وب', 'ول', 'فب', 'فل']);
const WORDISH = /[\p{L}\p{M}\p{N}]/u;

/** The normalised forms of a glossary item that should be found in the text. */
export function glossaryForms(lang, item) {
  return String(item?.tr || '').split(PATTERN_SPLIT).map((p) => lang.normalize(p)).filter(Boolean);
}

/** A line as display units with its normalised text, and a map from each normalised character to its unit. */
function indexLine(lang, text) {
  const units = lang.displayUnits(text);
  let norm = '';
  const at = [];
  units.forEach((u, i) => {
    norm += u.key;
    for (let k = 0; k < u.key.length; k++) at.push(i);
  });
  return { units, norm, at };
}

/** Every [startUnit, endUnit] where `needle` occurs in the line, by the language's word rules. */
function findForm(lang, line, needle, mode, exact = false) {
  const { units, norm, at } = line;
  const out = [];
  const sep = (i) => i < 0 || i >= units.length || !WORDISH.test(units[i].ch);
  for (let pos = norm.indexOf(needle); pos >= 0; pos = norm.indexOf(needle, pos + 1)) {
    let end = pos + needle.length; // exclusive, in norm
    if (mode === 'spaced') {
      // Words are separated by spaces in the normalised text.
      if (pos > 0 && norm[pos - 1] !== ' ') continue;
      if (end < norm.length && norm[end] !== ' ') {
        if (exact || [...needle].length < MIN_STEM) continue;
        while (end < norm.length && norm[end] !== ' ') end++;
      }
      out.push([at[pos], at[end - 1]]);
    } else if (mode === 'words') {
      // Arabic: no spaces once normalised, so word edges come from the text.
      // A match may follow a prefix (و، ب، ال…) and take endings when long enough.
      let s = at[pos];
      let e = at[end - 1];
      let before = '';
      while (!sep(s - 1)) { s--; before = units[s].key + before; }
      if (exact ? before !== '' : !ARABIC_PROCLITICS.has(before)) continue;
      if (!sep(e + 1) && (exact || [...needle].length < 3)) continue;
      while (!sep(e + 1)) e++;
      out.push([s, e]);
    } else {
      // Japanese: no spaces between words; match anywhere.
      out.push([at[pos], at[end - 1]]);
    }
  }
  return out;
}

function lineMode(lang, text) {
  if (lang.normalize('a b') === 'a b') return 'spaced';
  return /\s/.test(text) ? 'words' : 'chars';
}

/**
 * Split a line into plain runs and glossary words: [{ text, gloss }] where
 * gloss is the glossary index or null. Matching is case- and
 * diacritic-insensitive (the pack's normalize()); where two items overlap the
 * longer one wins.
 */
export function markGlossary(lang, text, glossary = []) {
  const line = indexLine(lang, text);
  const mode = lineMode(lang, text);
  const hits = [];
  glossary.forEach((item, gi) => {
    for (const form of glossaryForms(lang, item)) {
      for (const [s, e] of findForm(lang, line, form, mode, !!item.exact)) hits.push({ s, e, gi });
    }
  });
  hits.sort((a, b) => a.s - b.s || (b.e - b.s) - (a.e - a.s));
  const taken = [];
  let free = 0;
  for (const hit of hits) {
    if (hit.s < free) continue;
    taken.push(hit);
    free = hit.e + 1;
  }
  const out = [];
  let i = 0;
  const chars = (a, b) => line.units.slice(a, b).map((u) => u.ch).join('');
  for (const hit of taken) {
    if (hit.s > i) out.push({ text: chars(i, hit.s), gloss: null });
    out.push({ text: chars(hit.s, hit.e + 1), gloss: hit.gi });
    i = hit.e + 1;
  }
  if (i < line.units.length) out.push({ text: chars(i, line.units.length), gloss: null });
  return out;
}

/**
 * markGlossary with a second list that only fills what the first leaves
 * plain (a text's own glossary, then the course's other words in it). Items
 * of `extra` get the index glossary.length + their own.
 */
export function markAll(lang, text, glossary = [], extra = []) {
  const first = markGlossary(lang, text, glossary);
  if (!extra.length) return first;
  return first.flatMap((seg) => (seg.gloss != null ? [seg]
    : markGlossary(lang, seg.text, extra).map((x) => (x.gloss == null ? x : { text: x.text, gloss: glossary.length + x.gloss }))));
}

/** The course's words in a text that its own glossary does not already explain (see autoGlossary). */
export function extraGlossary(lang, text) {
  if (text.own) return [];
  const have = new Set((text.glossary || []).flatMap((g) => glossaryForms(lang, g)));
  return autoGlossary(lang, text.lines).filter((g) => !have.has(lang.normalize(g.tr)));
}

/** Indexes of the glossary items found somewhere in the text. */
export function glossaryFound(lang, text) {
  const found = new Set();
  for (const l of text.lines) {
    for (const seg of markGlossary(lang, l.tr, text.glossary)) if (seg.gloss != null) found.add(seg.gloss);
  }
  return found;
}

/** Per form: does every part of a pattern item occur? (Tests use this to check the data.) */
export function glossaryMissing(lang, text) {
  return text.glossary.filter((item) => glossaryForms(lang, item).some((form) =>
    !text.lines.some((l) => {
      const line = indexLine(lang, l.tr);
      return findForm(lang, line, form, lineMode(lang, l.tr)).length > 0;
    })));
}

const vocabIndex = new Map();
function indexOfVocab(lang) {
  let index = vocabIndex.get(lang.code);
  if (!index) {
    index = new Map();
    for (const w of lang.words) {
      for (const f of [w.tr, ...(w.alt || []), w.kana ? w.kana.replace(/\s+/g, '') : '']) {
        const k = f && lang.normalize(f);
        if (k && !index.has(k)) index.set(k, w);
      }
    }
    vocabIndex.set(lang.code, index);
  }
  return index;
}

/** The vocabulary entry a glossary item stands for (its own word, or the same normalised form), or null. */
export function findWord(lang, item) {
  if (item.wordId) return lang.byId(item.wordId) || null;
  const index = indexOfVocab(lang);
  const keys = [item.tr, item.kana ? item.kana.replace(/\s+/g, '') : ''].filter(Boolean).map((f) => lang.normalize(f));
  for (const k of keys) if (index.has(k)) return index.get(k);
  return null;
}

// Arabic: the word without what is written onto its front (و، ف، ب، ل، ك، ال، لل).
function withoutProclitics(key) {
  const out = [];
  for (const head of [key, /^[وف]/.test(key) ? key.slice(1) : null].filter(Boolean)) {
    if (head !== key) out.push(head);
    if (head.startsWith('لل')) out.push(head.slice(2), `ال${head.slice(2)}`);
    const rest = /^[بلك]/.test(head) ? head.slice(1) : null;
    if (rest) out.push(rest);
    for (const h of [head, rest].filter(Boolean)) if (h.startsWith('ال')) out.push(h.slice(2));
  }
  return out.filter((k) => [...k].length >= 2);
}

const EDGE_PUNCT = /^[^\p{L}\p{M}\p{N}]+|[^\p{L}\p{M}\p{N}]+$/gu;
const KANJI = /\p{Script=Han}/u;

// Every course word by its written forms (the headword and its other spellings): key → [words].
const writtenIndex = new Map();
function wordsByWritten(lang) {
  let index = writtenIndex.get(lang.code);
  if (!index) {
    index = new Map();
    for (const w of lang.words) {
      for (const f of [w.tr, ...(w.alt || [])]) {
        const k = f && lang.normalize(f);
        if (!k) continue;
        const list = index.get(k) || [];
        if (!list.includes(w)) index.set(k, [...list, w]);
      }
    }
    writtenIndex.set(lang.code, index);
  }
  return index;
}

/**
 * A glossary for a text that has none (the learner's own): the words and
 * phrases in it that are in the course, as written in the text. Only whole
 * words count (plus, in Arabic, a word behind و، ب، ال…; in Japanese, the
 * longest course word at each place), so an inflected form the course doesn't
 * list is left alone rather than guessed. A spelling that is two course words
 * lists both meanings; two-letter Arabic words are skipped.
 */
export function autoGlossary(lang, lines, max = 60) {
  const index = wordsByWritten(lang);
  const items = new Map();
  const add = (written, words) => {
    const k = lang.normalize(written);
    if (items.has(k) || items.size >= max) return;
    // Written with its vowel marks or accents, the text itself says which word it is.
    const same = words.filter((w) => [w.tr, ...(w.alt || [])].some((f) => f.normalize('NFC') === written.normalize('NFC')));
    const list = (same.length ? same : words).slice(0, 3);
    const [word] = list;
    const meanings = [...new Set(list.map((w) => w.en))];
    items.set(k, {
      tr: written, en: meanings.join(' · or: '), exact: true,
      ...(meanings.length === 1 ? { wordId: word.id } : {}),
      ...(list.length === 1 && word.kana ? { kana: word.kana } : {}),
      ...(list.length === 1 && word.tl ? { tl: word.tl } : {}),
    });
  };
  const arabic = lang.dir === 'rtl';
  for (const { tr } of lines) {
    if (lineMode(lang, tr) === 'chars') {
      // Japanese: the longest course word starting at each character. Short
      // kana strings turn up inside other words (さん in 皆さん, いま in しています),
      // so a word written in hiragana needs three characters.
      const chars = [...tr];
      const wordish = (c) => !!c && WORDISH.test(c);
      for (let i = 0; i < chars.length; i++) {
        if (!wordish(chars[i])) continue;
        for (let n = Math.min(10, chars.length - i); n >= 1; n--) {
          const part = chars.slice(i, i + n);
          if (!part.every(wordish)) continue;
          const piece = part.join('');
          const kanji = KANJI.test(piece);
          if (!kanji && n < (/^\p{Script=Katakana}/u.test(piece) ? 2 : 3)) break;
          // one kanji inside a longer kanji word is part of that word, not this one
          if (n === 1 && (KANJI.test(chars[i - 1] || '') || KANJI.test(chars[i + 1] || ''))) break;
          const found = index.get(lang.normalize(piece));
          if (found) { add(piece, found); i += n - 1; break; }
        }
      }
      continue;
    }
    const tokens = tr.split(/\s+/).map((t) => t.replace(EDGE_PUNCT, '')).filter(Boolean);
    for (let i = 0; i < tokens.length; i++) {
      let n = Math.min(4, tokens.length - i);
      for (; n >= 2; n--) {
        const phrase = tokens.slice(i, i + n).join(' ');
        const found = index.get(lang.normalize(phrase));
        if (found) { add(phrase, found); break; }
      }
      if (n >= 2) { i += n - 1; continue; }
      const key = lang.normalize(tokens[i]);
      // Two-letter Arabic words without their vowels are too many things (من: from, who) to guess.
      if (arabic && [...key].length <= 2) continue;
      const found = index.get(key) || (arabic ? withoutProclitics(key).map((k) => index.get(k)).find(Boolean) : null);
      if (found) add(tokens[i], found);
    }
  }
  return [...items.values()];
}

// Which texts use which course words: word id → [{ id, title, line }] (the
// first line of each text that has the word, built once per language).
const seenIn = new Map();
/** The texts in which a course word occurs (as a whole word), with the line it is first seen in. */
export function textsWithWord(lang, texts, wordId) {
  let index = seenIn.get(lang.code);
  if (!index || index.texts !== texts) {
    const map = new Map();
    for (const t of texts) {
      const done = new Set();
      for (const line of t.lines) {
        for (const item of autoGlossary(lang, [line], 200)) {
          if (!item.wordId || done.has(item.wordId)) continue;
          done.add(item.wordId);
          map.set(item.wordId, [...(map.get(item.wordId) || []), { id: t.id, title: t.title, level: t.level, line: line.tr }]);
        }
      }
    }
    index = { texts, map };
    seenIn.set(lang.code, index);
  }
  return index.map.get(wordId) || [];
}

// ---------- Fill the gaps ----------

/**
 * Gap-fill items made from a text's own glossary: a line with one glossary
 * word left out, and four words of the text to choose from (as they are
 * written in it, so the endings fit a sentence of this text). At most one gap
 * per line and per glossary item, in text order; [] when the text has fewer
 * than four different glossary words to choose between.
 * [{ line, gloss, before, answer, after, option, options }]: `answer` is the word as
 * the line writes it; `option` (the same) is the one of `options` that is right.
 */
export function gapItems(lang, text, { max = 10, random = Math.random } = {}) {
  const mix = (list) => {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const all = [];
  text.lines.forEach((l, line) => {
    const segs = markGlossary(lang, l.tr, text.glossary || []);
    segs.forEach((seg, si) => {
      if (seg.gloss == null) return;
      // A word that is in the line twice would give itself away.
      if (segs.filter((x) => x.gloss === seg.gloss).length > 1) return;
      all.push({
        line, gloss: seg.gloss, answer: seg.text,
        before: segs.slice(0, si).map((x) => x.text).join(''),
        after: segs.slice(si + 1).map((x) => x.text).join(''),
      });
    });
  });
  // A capital letter must not give the place away. In the pool, a word that
  // is only capitalised because it starts a sentence is written small (the
  // glossary shows how it is normally written); and when the missing word
  // itself starts with a capital, every option is shown with one.
  const first = (f) => [...f][0] || '';
  const isUpper = (ch) => ch !== ch.toLocaleLowerCase(lang.code);
  const recase = (f, fn) => fn(first(f)) + [...f].slice(1).join('');
  const label = (c) => (isUpper(first(c.answer)) && !isUpper(first(String(text.glossary[c.gloss].tr)))
    ? recase(c.answer, (ch) => ch.toLocaleLowerCase(lang.code)) : c.answer);
  // One written form per glossary item, to choose the wrong answers from.
  const forms = new Map();
  for (const c of all) if (!forms.has(c.gloss)) forms.set(c.gloss, label(c));
  if (forms.size < 4) return [];
  const lines = new Set();
  const glosses = new Set();
  const picked = [];
  for (const c of mix(all)) {
    if (picked.length >= max) break;
    if (lines.has(c.line) || glosses.has(c.gloss)) continue;
    lines.add(c.line);
    glosses.add(c.gloss);
    picked.push(c);
  }
  return picked.sort((a, b) => a.line - b.line).map((c) => {
    const capital = isUpper(first(c.answer));
    const key = lang.normalize(c.answer);
    const wrong = mix([...forms].filter(([g, f]) => g !== c.gloss && lang.normalize(f) !== key).map(([, f]) => f));
    const others = [...new Map(wrong.map((f) => [lang.normalize(f), f])).values()].slice(0, 3)
      .map((f) => (capital ? recase(f, (ch) => ch.toLocaleUpperCase(lang.code)) : f));
    return { ...c, option: c.answer, options: mix([c.answer, ...others]) };
  }).filter((c) => c.options.length === 4);
}

// ---------- Shadowing ----------

export const SHADOW_ROUNDS = [
  { id: 'full', title: 'Full text', hint: 'Read along and speak with the voice.' },
  { id: 'hints', title: 'First letters', hint: 'Only the first letter of each word is left.' },
  { id: 'hidden', title: 'No text', hint: 'From memory — just follow the voice.' },
];

// The Arabic article, alone or after و/ف/ب/ك (and لل = لِ + الْ).
const AR_ARTICLE = /^(?:[وفبك]?[اٱ]ل|[وف]?لل)/;

/**
 * The line as shown in a shadowing round: 0 → as written, 1 → first letter
 * of each word (Japanese uses the spaced kana reading, Arabic keeps the article
 * and the word's length with joining strokes), 2 → null (hidden).
 */
export function fadeLine(lang, line, round) {
  if (round <= 0) return line.tr;
  if (round >= 2) return null;
  const ja = lang.code === 'ja' && line.kana;
  const base = ja ? line.kana : line.tr;
  const filler = lang.code === 'ar' ? 'ـ' : ja ? '＿' : '_';
  const isLetter = (u) => /\p{L}/u.test(u);
  return base.normalize('NFC').split(/(\s+)/).map((w) => {
    if (/^\s*$/.test(w)) return w;
    const units = w.match(/\P{M}\p{M}*/gu) || [];
    let keep = 1;
    if (lang.code === 'ar') {
      // The first letter of الْبَيْتِ is the article's alif, the same in half the
      // words: keep the article (with و/ف/ب/ك in front) and show the stem's first letter.
      const letters = units.filter(isLetter).map((u) => u[0]).join('');
      const art = AR_ARTICLE.exec(letters);
      if (art && letters.length - art[0].length >= 2) keep = art[0].length + 1;
    }
    let shown = 0;
    return units.map((u) => {
      if (!isLetter(u)) return u; // punctuation stays
      if (shown < keep) { shown++; return u; }
      return filler;
    }).join('');
  }).join('');
}

// ---------- The learner's own texts ----------

export const OWN_LINES_MAX = 80;
const LINE_MAX = 180; // characters: longer sentences are cut at a comma or space
// The end of a sentence: . ! ? … and their CJK / Arabic forms, with any closing quote or bracket.
const SENTENCE = /[^.!?…。！？؟۔]+(?:[.!?…。！？؟۔]+["'”’»」』)\]]*|$)/gu;

function cutLong(sentence) {
  const out = [];
  let rest = sentence;
  while ([...rest].length > LINE_MAX) {
    const head = [...rest].slice(0, LINE_MAX).join('');
    // the last comma (any script) in the second half, else the last space, else a hard cut
    const comma = Math.max(...[',', '،', '、', ';', '؛', '，', ':', '—'].map((c) => head.lastIndexOf(c)));
    const at = comma > LINE_MAX / 2 ? comma + 1 : head.lastIndexOf(' ') > LINE_MAX / 2 ? head.lastIndexOf(' ') : head.length;
    out.push(rest.slice(0, at).trim());
    rest = rest.slice(at).trim();
  }
  if (rest) out.push(rest);
  return out;
}

/**
 * A pasted text as lines to play and practise: one sentence each (line breaks
 * also separate), long sentences cut at a comma, at most OWN_LINES_MAX lines.
 * A number or abbreviation with a dot (“3.5”, “Dr. X”) stays in one line when
 * what follows the dot is not a space plus a new sentence.
 */
export function splitIntoLines(body) {
  const lines = [];
  for (const para of String(body ?? '').normalize('NFC').split(/\n+/)) {
    const text = para.replace(/\s+/g, ' ').trim();
    if (!text) continue;
    const parts = [];
    for (const m of text.match(SENTENCE) || [text]) {
      const piece = m.trim();
      if (!piece) continue;
      const prev = parts[parts.length - 1];
      // “3.” + “5 km”, or “Dr.” + “Ali”: a dot inside a number, or after a short capitalised
      // abbreviation, does not end a sentence (a short last word does: “Ben de.”).
      if (prev && (/\d\.$/.test(prev) && /^\d/.test(piece) || /(^|\s)\p{Lu}\p{L}?\.$/u.test(prev))) parts[parts.length - 1] = `${prev}${/\d\.$/.test(prev) ? '' : ' '}${piece}`;
      else if (!/[\p{L}\p{N}]/u.test(piece) && prev) parts[parts.length - 1] = `${prev}${piece}`; // stray punctuation
      else parts.push(piece);
    }
    for (const p of parts) lines.push(...cutLong(p));
  }
  return lines.slice(0, OWN_LINES_MAX);
}

/** A stored own text ({ id, title, body }) as a text the reader can show: a speech without translation, glossary or quiz. */
export function ownText(rec) {
  const lines = splitIntoLines(rec.body).map((tr) => ({ tr, en: '' }));
  const first = lines[0]?.tr || '';
  return {
    id: rec.id, kind: 'speech', level: null, own: true,
    title: rec.title || (first.length > 40 ? `${[...first].slice(0, 40).join('')}…` : first) || 'My text',
    titleNative: '', summary: 'Your own text.', lines, glossary: [], questions: [],
  };
}

/** The same text with the course's words in it as its glossary (see autoGlossary). */
export const ownTextFor = (lang, rec) => { const t = ownText(rec); return { ...t, glossary: autoGlossary(lang, t.lines) }; };

// ---------- Player ----------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Plays lines one after another. `say(i)` speaks line i and resolves when it
 * ends (false when no audio could be played). Pausing stops the current line;
 * playing again starts that line over.
 * Callbacks: onLine(i), onState(playing), onEnd(), onFail().
 */
export function createPlayer({ count, say, onLine, onState, onEnd, onFail, gap = 350 }) {
  let gen = 0;
  let playing = false;
  let index = -1;
  let ended = false; // played to the end: the next play() starts over
  const setPlaying = (v) => { if (playing !== v) { playing = v; onState?.(v); } };

  async function run(from) {
    const my = ++gen;
    ended = false;
    setPlaying(true);
    for (let i = from; i < count; i++) {
      index = i;
      onLine?.(i);
      const ok = await say(i);
      if (my !== gen) return;
      if (ok === false) { setPlaying(false); onFail?.(); return; }
      if (i < count - 1) {
        await sleep(gap);
        if (my !== gen) return;
      }
    }
    ended = true;
    setPlaying(false);
    onEnd?.();
  }

  const api = {
    get playing() { return playing; },
    get index() { return index; },
    /** True once the last line has played: the next play() starts over. */
    get ended() { return ended; },
    /** Play from line `from` (default: where we stopped, or the start once finished). */
    play(from = index < 0 || ended ? 0 : index) { if (count) run(Math.max(0, Math.min(count - 1, from))); },
    pause() { gen++; setPlaying(false); speech.cancelSpeech(); },
    toggle() { if (playing) api.pause(); else api.play(); },
    /** Line i alone, or — while playing all — carry on from line i. */
    jump(i) {
      if (i < 0 || i >= count) return;
      if (playing) { run(i); return; }
      gen++;
      ended = false;
      index = i;
      onLine?.(i);
      say(i);
    },
    next() { api.jump(Math.min(count - 1, index + 1)); },
    prev() { api.jump(Math.max(0, index - 1)); },
    stop() { gen++; playing = false; },
  };
  return api;
}

// ---------- Speaking a line ----------

/** How long to listen for a spoken line: longer sentences get more time. */
export const listenTimeout = (text) => Math.min(20000, 6000 + [...String(text)].length * 150);

/** Score recognised alternatives against a line (Japanese also against its kana). */
export function scoreLine(lang, line, alternatives) {
  const targets = [line.tr];
  if (line.kana) targets.push(line.kana.replace(/\s+/g, ''));
  const best = targets
    .map((t) => ({ ...scoreSpoken(t, alternatives, lang), written: t }))
    .reduce((a, b) => (b.score > a.score ? b : a));
  // scoreSpoken leaves raw empty when nothing matched at all: still show what was heard.
  return best.raw ? best : { ...best, raw: String(alternatives?.[0]?.transcript || '').trim() };
}

export function verdict(score) {
  if (score >= 0.9) return 'good';
  if (score >= 0.6) return 'warn';
  return 'bad';
}

/**
 * Record the microphone for up to `maxMs` (MediaRecorder; the same approach
 * as the word recorder, which also works in the apps' WebViews).
 * Resolves to { stopped: Promise<objectURL>, stop() }; onTick(ms) runs while recording.
 */
export async function recordClip({ maxMs = 90000, onTick } = {}) {
  const started = Date.now();
  const rec = await speech.startRecording({ maxMs });
  const timer = setInterval(() => onTick?.(Math.min(maxMs, Date.now() - started)), 250);
  rec.stopped.finally(() => clearInterval(timer));
  return { stopped: rec.stopped, stop: () => rec.stop() };
}

/** Play a recording. Resolves when it ends or fails; stop() ends it early. */
export function playClip(url) {
  const audio = new Audio(url);
  let finish;
  const done = new Promise((resolve) => { finish = resolve; });
  audio.onended = () => finish(true);
  audio.onerror = () => finish(false);
  audio.play().catch(() => finish(false));
  return { done, stop() { audio.pause(); finish(false); } };
}

/** 75 000 → "1:15". */
export const clock = (ms) => {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
