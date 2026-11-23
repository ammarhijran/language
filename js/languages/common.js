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
//   say                          — per-entry text for the voice (the pack's say.js), see speech below
//   speech(entry, said)          — what the voice reads for an entry, see pack.speech()
//   speechRegions                — voice locales to prefer, best first (default [speechLang])
//   slowText(text, entry)        — the text with pauses between words, for slow playback
// Telling words apart (js/compare.js scoreWord / checkTyped):
//   negation                     — RegExp for a negative, tested on normalize(text); or
//   negative(text)               — true when the text is negative (overrides `negation`)
//   strictNormalize(text)        — finer than normalize() for typed answers (Arabic keeps ʾ/ʿ)
//   typedVariants(input)         — other readings of what was typed (Turkish: a US-keyboard I as i)
//   romanKey(text) / looseKey    — Latin text folded across romanisation conventions (null
//                                  when not Latin): equal keys are right / almost right
//   sameSound(a, b)              — two entries sound exactly alike (Japanese: same kana)
//   soundsLike(heard, word)      — { score, note? } when a transcript is the word's sound
//                                  written another way (Japanese kanji for kana), else null
//   foreignWord(heard, word)     — the transcript holds a word the target doesn't (Japanese:
//                                  a kanji it is never written with), so it is another word
//   wordOrder                    — sentence-builder rules for valid other orders (js/sentences.js)

import { alignDiff } from '../compare.js';

// Scripts a recogniser writes: an alt spelling in another script (a Latin
// transliteration among Arabic or Cyrillic forms) is for typing only.
const SCRIPTS = ['Arabic', 'Cyrillic', 'Latin'].map((name) => [name, new RegExp(`\\p{Script=${name}}`, 'u')]);
const scriptOf = (s) => SCRIPTS.find(([, re]) => re.test(s))?.[0] ?? 'other';
/** The alt spellings of `w` written in the same script as its headword. */
export const sameScriptAlts = (w) => (w.alt || []).filter((a) => scriptOf(a) === scriptOf(w.tr));

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

/**
 * A phrase with a pause after each word (", " or the script's own comma), for
 * slow playback: the voice keeps its natural speed and each word stays clear.
 * null for a single word. A word that `leans` on the next one (a one-letter
 * preposition, Ukrainian не) or `clings` to the one before (Turkish mi) is
 * kept with it, so a pause never splits “не їм” or “alabilir miyiz”.
 */
export function pauseBetweenWords(text, comma = ',', { leans = () => false, clings = () => false } = {}) {
  const words = String(text).trim().split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  const bare = (w) => w.toLocaleLowerCase().replace(/[^\p{L}\p{M}'’]/gu, '');
  const chunks = [];
  let lead = '';
  words.forEach((w, i) => {
    const b = bare(w);
    const open = !/[,;:.!?…،؛]$/u.test(w); // no punctuation after it already
    if (i < words.length - 1 && open && (/^\p{L}$/u.test(b) || leans(b))) { lead += `${w} `; return; }
    if (chunks.length && !lead && clings(b) && !/[,;:.!?…،؛]$/u.test(chunks.at(-1))) { chunks[chunks.length - 1] += ` ${w}`; return; }
    chunks.push(lead + w);
    lead = '';
  });
  if (chunks.length < 2) return null;
  // The pause goes where a comma or dash already is, or is added; the end keeps its ? or !.
  return chunks.map((c, i) => (i < chunks.length - 1 ? `${c.replace(/[,;:—–\-،؛]+$/u, '')}${comma}` : c)).join(' ');
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

/** The topic the learner's own words live in (see pack.setOwnWords). */
export const OWN_CATEGORY = { id: 'my-words', name: 'My words', native: '', emoji: '📝', group: 'words', own: true };

export function makePack(def) {
  const normalize = def.normalize;
  const stripDiacritics = def.stripDiacritics || normalize;

  // Example sentences as entry-like objects, with their reading (Japanese kana,
  // Arabic transliteration) when the pack provides one: shown under the example
  // and used for sentence-builder tiles.
  const exampleOf = (w, extra) => {
    if (!w.ex) return undefined;
    const [tr, en] = w.ex;
    const reading = def.exampleReadings?.[tr] || extra?.[2];
    // An example of a dialect entry is in that dialect too (Egyptian stress, badge).
    const dialect = w.dialect ? { dialect: w.dialect } : {};
    return reading ? { tr, en, [def.exampleReadingKey]: reading, ...dialect } : { tr, en, ...dialect };
  };
  // say.js: id → what the voice reads for the headword, or { tr?, ex?, pair? }
  // for the headword, its example sentence and its other-register form.
  const sayOf = (id) => {
    const o = def.say?.[id];
    return typeof o === 'string' ? { tr: o } : o || {};
  };
  // An override that no longer fits its entry (the sentence was rewritten
  // since) is left out, so the voice never reads an old sentence.
  const staleSay = [];
  const fits = (e, text) => {
    if (!def.sayFits || def.sayFits(text, e)) return true;
    staleSay.push({ tr: e.tr, say: text });
    return false;
  };
  const withSay = (e, text) => (e && text && fits(e, text) ? { ...e, say: text } : e);
  const words = def.vocab.map((w, index) => {
    const id = w.id ?? normalize(w.tr).replace(/\s+/g, '-');
    // Core words without their own example get one from the pack's examples.js.
    const extra = w.ex ? null : def.extraExamples?.[id];
    const word = extra ? { ...w, ex: [extra[0], extra[1]] } : w;
    const say = sayOf(id);
    return {
      ...word, id, index, example: withSay(exampleOf(word, extra), say.ex),
      ...(word.pair ? { pair: withSay(word.pair, say.pair) } : {}),
      ...(say.tr && fits(word, say.tr) ? { say: say.tr } : {}),
    };
  });
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
    // Other spellings the authors listed count when spoken, if a recogniser could write them.
    spokenTargets: (w) => [w.tr, ...sameScriptAlts(w)],
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
    staleSay,
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

  // Reading aids can be reduced once a learner is ready to read the script:
  // readingAid 'full' (default), 'script' (Japanese: kana without rōmaji) or
  // 'off'. reading() is what prompts and lists show; fullReading() is always
  // complete (new-word cards, answers, the word page, search).
  const fullReading = pack.reading;
  pack.fullReading = fullReading;
  pack.readingAid = 'full';
  pack.reading = (w) => {
    if (pack.readingAid === 'full') return fullReading(w);
    if (pack.readingAid === 'off') return null;
    const parts = String(fullReading(w) || '').split(' · ');
    return parts.length > 1 ? parts[0] : null;
  };

  // ---------- The learner's own words ("My words") ----------
  // Entries added by hand (store.getOwnWords) join the pack as one more topic,
  // so lessons, reviews, practice, search and the word page work for them like
  // for the course's own. They carry `own: true`, and so does their topic:
  // whatever is about the course itself (finishing it, its topic list) leaves
  // them out. Called when the app starts and whenever the list changes.
  const analyzeEntry = pack.analyze;
  // A word without the reading its script needs (kanji without kana, Arabic
  // without a transliteration) has no syllables to show: it stays one piece.
  const inOnePiece = (w) => ({
    words: String(w.tr).split(/\s+/).filter(Boolean).map((text) => ({ text, syllables: [{ text, ipa: '', respell: '' }], stressIndex: -1 })),
    ipa: '', respell: '', stressMarked: false,
  });
  pack.analyze = (w) => {
    if (!w?.own) return analyzeEntry(w);
    try {
      const a = analyzeEntry(w);
      // Letters of another script (a brand name, a loan in Latin letters) give no syllables.
      return a.words.length && a.words.every((x) => x.syllables.length) ? a : inOnePiece(w);
    } catch { return inOnePiece(w); }
  };
  pack.setOwnWords = (list = []) => {
    for (let i = words.length - 1; i >= 0; i--) {
      if (words[i].own) { byId.delete(words[i].id); words.splice(i, 1); }
    }
    const cats = pack.categories;
    const at = cats.findIndex((c) => c.own);
    if (at >= 0) cats.splice(at, 1);
    for (const o of list) {
      if (!o || typeof o.id !== 'string' || !o.tr || !o.en || byId.has(o.id)) continue;
      const w = {
        id: o.id, tr: o.tr, en: o.en, cat: OWN_CATEGORY.id, own: true, index: words.length,
        ...(o.note ? { note: o.note } : {}),
        ...(def.ownReading ? def.ownReading(o) : {}),
      };
      words.push(w);
      byId.set(w.id, w);
    }
    if (words.some((w) => w.own)) cats.push({ ...OWN_CATEGORY });
    // Whatever was built from the word list is built again when next needed.
    pack.wordsVersion = (pack.wordsVersion || 0) + 1;
    keysBuilt = false;
    textIndex = null;
    lexicon = null;
    return pack;
  };

  // Who is speaking. The course gives first-person phrases in the form a man
  // says; a pack with a `feminine` map (id → { tr, s?, tl?, en?, pair? }) can
  // show, speak and check the form a woman says instead. The other form stays
  // an accepted answer. Applied once, when the app starts (before any search
  // key or lexicon is built); the ids, and so the learner's progress, stay.
  pack.speaker = 'm';
  pack.speakAs = (who) => {
    if (who !== 'f' || pack.speaker === 'f' || !def.feminine) return pack.speaker;
    const swap = (entry, f) => {
      const alt = [...new Set([...(entry.alt || []), entry.tr])].filter((a) => a !== f.tr);
      const { pair: _pair, ...own } = f;
      return { ...entry, ...own, alt, ...(entry.tl && f.tl ? { alt: [...alt, entry.tl] } : {}) };
    };
    for (const [id, f] of Object.entries(def.feminine)) {
      const w = byId.get(id);
      if (!w) continue;
      if (f.tr) Object.assign(w, swap(w, f));
      if (f.pair && w.pair) w.pair = swap(w.pair, f.pair);
    }
    pack.speaker = 'f';
    return pack.speaker;
  };

  /** Text used by the word-list search: the word, its readings and romanisations.
   * Built on the first search, not at startup (it is the costliest part of a pack). */
  let keysBuilt = false;
  const buildKeys = () => {
    if (keysBuilt) return;
    keysBuilt = true;
    for (const w of words) {
      if (w.searchKey != null) continue; // built before the learner's own words changed
      const forms = [w.tr, ...pack.acceptedAnswers(w), pack.fullReading(w) || ''];
      w.searchKey = [...new Set(forms.flatMap((f) => [normalize(f), stripDiacritics(f)]))].join(' ');
    }
  };
  // ---------- What the voice reads ----------

  // Display strings passed to ctx.say() (views, older callers) are looked up
  // here, so they are spoken like the entry, example or grammar example they
  // came from: its say.js override, Arabic pausal form, Egyptian voice…
  let textIndex = null;
  const entryForText = (text) => {
    if (!textIndex) {
      textIndex = new Map();
      const add = (e) => { if (e?.tr && !textIndex.has(e.tr)) textIndex.set(e.tr, e); };
      for (const w of words) { add(w); add(w.pair && { ...w.pair, en: w.pair.en || w.en }); add(w.example); }
      for (const l of def.grammar || []) for (const sec of l.sections || []) (sec.examples || []).forEach(add);
    }
    return textIndex.get(text) || textIndex.get(text.trim()) || { tr: text };
  };
  const speechOf = def.speech || ((e, said) => ({ text: said ?? e.tr, lang: def.speechLang }));
  const slowText = def.slowText || ((text) => pauseBetweenWords(text));

  /**
   * What the voice reads for `target` — an entry-like object ({ tr, kana?,
   * tl?, dialect?, say? }), a display string, or an already resolved
   * { text, lang }: { text, lang, regions, slow?, alt? }.
   *   text     the text for the voice: `say` (never shown) or the pack's reading of `tr`
   *   lang     the locale for the voice and for speech recognition
   *   regions  voice locales to prefer, best first
   *   slow     the text with pauses between the words (phrases only), for slow playback
   *   alt      what to say instead when no voice exists for `lang` itself (Egyptian
   *            Arabic read by a Standard Arabic voice)
   */
  pack.speech = (target) => {
    if (target == null) return { text: '', lang: def.speechLang, regions: [def.speechLang], slow: null };
    if (typeof target === 'object' && 'text' in target) return { lang: def.speechLang, ...target };
    const entry = typeof target === 'string' ? entryForText(target) : target;
    const said = entry.say ?? def.saySentences?.[entry.tr];
    const r = { regions: def.speechRegions || [def.speechLang], ...speechOf(entry, said) };
    if (r.slow === undefined) r.slow = slowText(r.text, entry);
    return r;
  };

  // ---------- Every written form of every entry ----------

  // Answers are checked against the whole course, not only the target: a
  // form that belongs to another entry is that word, however few letters it
  // differs by (su/şu, там/так, مطار/مطر). Keys are normalize() without
  // spaces; with strictNormalize, a second, finer map for typed answers.
  // Built on first use, not at startup.
  const keyOf = (s, norm = normalize) => norm(String(s)).replace(/\s+/g, '');
  let lexicon = null;
  const formsOf = (e) => {
    const forms = [e.tr];
    // A pack's own form lists may expect fields an other-register pair lacks.
    try { forms.push(...pack.acceptedAnswers(e), ...pack.spokenTargets(e)); } catch { /* the headword is enough */ }
    return forms;
  };
  const buildLexicon = () => {
    const maps = { normal: new Map(), strict: def.strictNormalize ? new Map() : null };
    const add = (map, norm, form, word, pair) => {
      const k = keyOf(form, norm);
      if (!k) return;
      const list = map.get(k) || [];
      if (!list.some((x) => x.word === word && x.pair === pair)) list.push({ word, pair, form });
      map.set(k, list);
    };
    for (const w of words) {
      for (const [e, pair] of [[w, false], ...(w.pair ? [[{ ...w.pair, en: w.pair.en || w.en, cat: w.cat }, true]] : [])]) {
        for (const f of formsOf(e)) {
          add(maps.normal, normalize, f, w, pair);
          if (maps.strict) add(maps.strict, def.strictNormalize, f, w, pair);
        }
      }
    }
    return maps;
  };
  /** [key, [{ word, pair, form }]] for every written form in the course (normalised, no spaces). */
  pack.lexicon = () => (lexicon ||= buildLexicon()).normal;
  /**
   * The entries written `text`: [{ word, pair, form }], `pair` when it is the
   * entry's other-register form. `normalized`: `text` is already a key.
   */
  pack.entriesWritten = (text, { strict = false, normalized = false } = {}) => {
    lexicon ||= buildLexicon();
    const map = strict && lexicon.strict ? lexicon.strict : lexicon.normal;
    const norm = strict && def.strictNormalize ? def.strictNormalize : normalize;
    return map.get(normalized ? String(text) : keyOf(text, norm)) || [];
  };
  if (!def.negative && def.negation) pack.negative = (text) => def.negation.test(normalize(String(text)));

  pack.matches = (w, query) => {
    const q = query.trim();
    if (!q) return true;
    buildKeys();
    return w.searchKey.includes(normalize(q)) || w.searchKey.includes(stripDiacritics(q))
      || w.en.toLowerCase().includes(q.toLowerCase());
  };

  return pack;
}
