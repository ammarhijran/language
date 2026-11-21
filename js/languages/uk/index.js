// Ukrainian language pack.
import { categories, vocab } from './vocab.js';
import { alphabet, soundTips, minimalPairs } from './sounds.js';
import { analyze, lower, transliterate } from './phonetics.js';
import { makePack } from '../common.js';

const APOS = /['’ʼ`]/g;

/** Lowercase, unify apostrophes, drop stress marks and punctuation. */
export function normalize(s) {
  return lower(s.normalize('NFC'))
    .replace(/́/g, '')
    .replace(APOS, "'")
    .replace(/[^\p{L}\p{N}\s']/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const FOLD = { ї: 'і', є: 'е', ґ: 'г', й: 'и' };
/** Lenient form: fold look-alike letters, drop apostrophes and soft signs. */
export function stripDiacritics(s) {
  return normalize(s).replace(/[їєґй]/g, (c) => FOLD[c]).replace(/['ь]/g, '');
}

export default makePack({
  code: 'uk',
  name: 'Ukrainian',
  nativeName: 'Українська',
  flag: '🇺🇦',
  speechLang: 'uk-UA',
  greeting: 'Привіт',
  welcome: 'Ласкаво просимо!',
  sampleWords: [['Привіт', 'hi'], ['Дякую', 'thank you'], ['Добрий день', 'good afternoon']],
  sampleSentence: 'Привіт! Давай вчити українську!',
  specialChars: ['і', 'ї', 'є', 'ґ', 'и', 'щ', 'ь', '’'],
  typingHint: 'Type in Ukrainian (or Latin letters)…',
  almostHint: 'So close! Just a letter or two off:',
  alphabetIntro: 'Ukrainian uses the Cyrillic alphabet — 33 letters, read almost exactly as they are written. Tap a letter to hear an example word. Highlighted letters are the ones English speakers usually find surprising.',
  pronHint: (a) => (a.stressMarked
    ? 'Highlighted syllable = stress. Ukrainian stress can fall on any syllable, so learn it with the word. Tap a syllable to hear it.'
    : 'Tap a syllable to hear it slowly.'),
  categories,
  vocab,
  alphabet,
  soundTips,
  minimalPairs,
  analyze: (word) => analyze(word.tr, word.s),
  normalize,
  stripDiacritics,
  // Cyrillic keyboards aren't on every phone: Latin transliteration counts too.
  acceptedAnswers: (w) => [...new Set([w.tr, ...(w.alt || []), transliterate(w.tr), transliterate(w.tr, { easy: true })])],
  voiceHelp: {
    ios: 'Open Settings → Accessibility → Spoken Content → Voices → Ukrainian and download a voice (e.g. Lesya).',
    android: 'Open Settings → search “Text-to-speech” → Speech Services by Google → Install voice data → Ukrainian.',
    mac: 'Open System Settings → Accessibility → Spoken Content → System voice → Manage Voices… → Ukrainian (Lesya).',
    windows: 'Open Settings → Time & language → Speech → Manage voices → Add voices → Ukrainian. Microsoft Edge also has free online Ukrainian voices.',
    other: 'Install a Ukrainian text-to-speech voice for your operating system, or try Microsoft Edge, which includes free online Ukrainian voices.',
  },
});

export { transliterate };
