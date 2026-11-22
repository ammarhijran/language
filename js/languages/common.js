// Shared helpers for language packs.
//
// A language pack is a plain object; makePack() fills in sensible defaults and
// the derived lookups so each language only describes what is specific to it.
//
// Required in `def`:
//   code, name, nativeName, flag, speechLang, greeting
//   categories, vocab            — vocab entries: { tr, en, cat, id?, s?, ex?, note?, alt?, n?, … }
//   alphabet, soundTips, minimalPairs
//   analyze(word)                — { words:[{ text, syllables:[{text, ipa, respell}], stressIndex }],
//                                    ipa, respell, stressMarked, chipLang?, chipsSpeakable? }
//   normalize(text)              — canonical form used to compare answers
// Optional (defaults below):
//   dir, welcome, sampleWords, sampleSentence, alphabetIntro, pronHint, typingHint,
//   specialChars, stripDiacritics, normalizeSpoken, reading(word),
//   acceptedAnswers(word), spokenTargets(word), noteSource(word), voiceHelp,
//   praise, scoreTitles          — feedback lines: an English string, or [native, English gloss]
//   displayUnits(text)           — see writtenUnits() below
//   sentenceTiles(entry)         — the text cut into word tiles by the sentence builder
//                                  (js/sentences.js), or null when it can't be built

import { alignDiff } from '../compare.js';

const DIGITS = /[٠-٩۰-۹０-９]/g;

/** Arabic-Indic, Persian and full-width digits → ASCII digits. */
export function asciiDigits(s) {
  return s.replace(DIGITS, (d) => {
    const c = d.charCodeAt(0);
    if (c >= 0xFF10) return String(c - 0xFF10);
    if (c >= 0x06F0) return String(c - 0x06F0);
    return String(c - 0x0660);
  });
}

// One unit per letter as the learner sees it: a base character plus any
// combining marks after it (Arabic vowel signs, a Ukrainian stress accent).
const UNIT = /\P{M}\p{M}*|\p{M}+/gu;

/**
 * Split `text` as written into display units, each with its share of
 * normalize(text) as `key`: a letter keeps its script and marks (コ → key こ,
 * سَّ → key س), spaces and punctuation are kept for display but only count as a
 * space where the pack's normalize() keeps spaces. Joining the keys gives
 * normalize(text), so diffs can be aligned on keys and shown as written.
 */
export function writtenUnits(text, normalize) {
  const space = normalize('a b') === 'a b' ? ' ' : '';
  const units = (text.normalize('NFC').match(UNIT) || []).map((ch) => {
    const key = normalize(ch);
    // A space or a word-splitting mark (comma, dash…) normalises to one space.
    return { ch, key: key || (normalize(`a${ch}a`) === 'a a' ? space : '') };
  });
  // Like normalize(): never two spaces in a row, none at either end.
  let afterSpace = true;
  for (const u of units) {
    if (u.key !== ' ') {
      if (u.key) afterSpace = false;
    } else if (afterSpace) {
      u.key = '';
    } else {
      afterSpace = true;
    }
  }
  for (let i = units.length - 1; i >= 0 && (!units[i].key || units[i].key === ' '); i--) units[i].key = '';
  return units;
}

export function makePack(def) {
  const normalize = def.normalize;
  const stripDiacritics = def.stripDiacritics || normalize;

  const words = def.vocab.map((w, index) => ({
    ...w,
    id: w.id ?? normalize(w.tr).replace(/\s+/g, '-'),
    index,
  }));
  const byId = new Map(words.map((w) => [w.id, w]));
  const letterInfo = new Map(def.alphabet.map((l) => [l.key ?? l.lower, l]));

  // Speech recognisers often answer with digits: map the numbers in the
  // vocabulary (entries with `n`) back to their written form.
  const numberWords = new Map(words.filter((w) => typeof w.n === 'number').map((w) => [String(w.n), w.tr]));
  const normalizeSpoken = def.normalizeSpoken || ((s) => normalize(
    asciiDigits(s).replace(/(\d)[.,\s](?=\d{3}\b)/g, '$1').replace(/\d+/g, (d) => ` ${numberWords.get(d) ?? d} `),
  ));

  const pack = {
    dir: 'ltr',
    specialChars: [],
    typingHint: `Type in ${def.name}…`,
    almostHint: 'So close! Only the special letters were off:',
    pronHint: (a) => (a.stressMarked ? 'Highlighted syllable = stress. Tap any syllable to hear it slowly.' : 'Tap any syllable to hear it slowly.'),
    alphabetIntro: `Tap a letter to hear an example word. Highlighted letters are the ones English speakers usually find surprising.`,
    welcome: `${def.greeting}!`,
    sampleWords: [],
    sampleSentence: def.greeting,
    voiceHelp: {},
    reading: () => null,
    acceptedAnswers: (w) => [w.tr, ...(w.alt || [])],
    spokenTargets: (w) => [w.tr],
    noteSource: (w) => w.tr,
    sentenceTiles: (w) => w.tr,
    // Feedback in English unless the pack has native words for it.
    praise: ['Correct!', 'Great!', 'Well done!', 'Nice!'],
    scoreTitles: { excellent: 'Excellent!', close: 'Very close!' },
    displayUnits: (text) => writtenUnits(text, normalize),
    ...def,
    normalize,
    stripDiacritics,
    normalizeSpoken,
    words,
    byId: (id) => byId.get(id),
    wordsIn: (cat) => words.filter((w) => w.cat === cat),
    letterHint: (ch) => letterInfo.get(ch),
  };

  /** Hints for the "surprising" letters that appear in a word. */
  pack.letterNotes = def.letterNotes || ((word) => {
    const seen = new Set();
    const notes = [];
    for (const ch of normalize(pack.noteSource(word))) {
      const l = letterInfo.get(ch);
      if (l?.special && !l.noNote && !seen.has(ch)) {
        seen.add(ch);
        notes.push({ letter: l.key ?? l.lower, ipa: l.ipa, hint: l.hint });
      }
    }
    return notes;
  });

  /**
   * Which letters of `text` (as written) were matched by `heard` (already
   * normalised): aligned on the normalised letters, reported per display unit
   * as { ch, key, ok } so the learner sees the word in its own script.
   */
  pack.diffAsWritten = (text, heard) => {
    const units = pack.displayUnits(text);
    const diff = alignDiff(units.map((u) => u.key).join(''), heard);
    let i = 0;
    return units.map(({ ch, key }) => {
      const part = diff.slice(i, (i += [...key].length));
      return { ch, key, ok: part.every((d) => d.ok) };
    });
  };

  /** Text used by the word-list search: the word, its readings and romanisations. */
  for (const w of words) {
    const forms = [w.tr, ...pack.acceptedAnswers(w), pack.reading(w) || ''];
    w.searchKey = [...new Set(forms.flatMap((f) => [normalize(f), stripDiacritics(f)]))].join(' ');
  }
  pack.matches = (w, query) => {
    const q = query.trim();
    if (!q) return true;
    return w.searchKey.includes(normalize(q)) || w.searchKey.includes(stripDiacritics(q))
      || w.en.toLowerCase().includes(q.toLowerCase());
  };

  return pack;
}
