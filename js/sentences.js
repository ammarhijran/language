// Practice sentences for the sentence builder: phrases, example sentences and
// grammar examples cut into word tiles. Plain data, no DOM, so it runs in node.
//
// A sentence is { id, text, en, tokens, display?, reading?, audioText, source, reg?, dialect? }:
//   tokens     the tiles in the right order: words as written, punctuation attached
//   text       the tiles joined by spaces (what the learner builds)
//   display    the sentence as normally written, when the tiles are a reading of
//              it (Japanese: kana tiles for a sentence written with kanji)
//   reading    kana · rōmaji or transliteration, when the source has one
//   audioText  what the voice reads: the sentence as written (kanji reads better
//              than spaced kana, where a particle は would be read “ha”)
//   source     { kind: 'phrase' | 'pair' | 'example' | 'grammar', wordId?, lessonId? }

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
  const want = sentence.tokens.map((t) => tileKey(lang, t));
  const got = answer.map((t) => tileKey(lang, t));
  const marks = want.map((k, i) => got[i] === k);
  return { correct: got.length === want.length && marks.every(Boolean), marks };
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
    display: tiles === src.tr ? undefined : src.tr,
    reading: lang.reading(src) || undefined,
    audioText: src.tr,
    source,
    reg: src.reg,
    dialect: src.dialect,
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
    const [tr, en] = word.ex;
    out.push(makeSentence(lang, { tr, en }, { kind: 'example', wordId: word.id }, `example:${word.id}`));
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
