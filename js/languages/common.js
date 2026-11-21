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
//   acceptedAnswers(word), spokenTargets(word), noteSource(word), voiceHelp

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
