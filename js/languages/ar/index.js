// Arabic (Modern Standard Arabic) language pack.
//
// Each word is stored as vowelled Arabic (what the learner sees and the voice
// reads) plus a transliteration (which drives syllables, stress and IPA). A
// plain form without vowel marks is derived for matching answers and speech —
// everyday Arabic, and speech recognisers, leave the short vowels out.
import { categories as baseCategories, vocab as baseVocab } from './vocab.js';
import { categories as moreCategories, vocab as moreVocab } from './more.js';
import { lessons } from './grammar.js';
import { extraExamples } from './examples.js';
import { exampleReadings } from './readings.js';
import { alphabet, soundTips, minimalPairs } from './sounds.js';
import { analyzeTranslit, asciiTranslit } from './translit.js';
import { makePack } from '../common.js';

const TASHKEEL = /[ؐ-ًؚ-ٰٟۖ-ۭ]/g;

/** Plain Arabic: no vowel marks or tatweel, alif/yā/tā-marbūṭa variants unified; Latin lowercased, ʾ/ʿ and apostrophes dropped. No spaces. */
// Arabizi (chat Arabic) numbers for letters Latin lacks, accepted in typed
// transliteration: 2 = ʾ, 3 = ʿ, 5 = kh, 6 = ṭ, 7 = ḥ, 8 = gh (ma3lesh, 7abibi).
const ARABIZI = { 2: 'ʾ', 3: 'ʿ', 5: 'kh', 6: 'ṭ', 7: 'ḥ', 8: 'gh' };
const arabizi = (s) => (/[a-z]/i.test(s) ? s.replace(/[235678]/g, (d) => ARABIZI[d]) : s);

export function normalize(s) {
  return arabizi(s.normalize('NFC'))
    .replace(TASHKEEL, '')
    .replace(/ـ/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .toLowerCase()
    // Hamza ʾ and ʿayn ʿ are hard to type and the plain-ASCII forms leave them
    // out, so typed apostrophes (or none) both count.
    .replace(/[ʾʿ'’‘`ʼʻ]/g, '')
    .replace(/[\s\-‐.,!?؟،؛:;"“”()«»]/g, '');
}

/** Lenient form: transliteration diacritics and ʾ/ʿ dropped, hamza ignored. */
export function stripDiacritics(s) {
  return asciiTranslit(normalize(s)).replace(/ء/g, '').replace(/(.)\1/g, '$1');
}

export default makePack({
  extraExamples,
  exampleReadings,
  exampleReadingKey: 'tl',
  code: 'ar',
  name: 'Arabic',
  nativeName: 'العربية',
  flag: '🇸🇦',
  dir: 'rtl',
  speechLang: 'ar-SA',
  greeting: 'مَرْحَبًا',
  welcome: 'أَهْلًا وَسَهْلًا!',
  sampleWords: [['مَرْحَبًا', 'hello'], ['شُكْرًا', 'thank you'], ['صَبَاحُ الْخَيْرِ', 'good morning']],
  sampleSentence: 'مَرْحَبًا! هَيَّا نَتَعَلَّمُ الْعَرَبِيَّةَ.',
  typingHint: 'Type in Arabic or Latin letters (e.g. shukran, ma3lesh)…',
  almostHint: 'So close! Just a letter or two off:',
  // Feedback: Arabic words (none addressed to “you”, so no gender) with an English gloss.
  praise: [['صَحِيح!', 'Correct.'], ['رَائِع!', 'Great.'], ['جَيِّد!', 'Good.'], ['جَمِيل!', 'Nice.']],
  scoreTitles: { excellent: ['مُمْتَاز!', 'Excellent.'], close: ['جَيِّد جِدًّا!', 'Very good.'] },
  alphabetIntro: 'Arabic is written right to left with 28 letters that join together — most change shape depending on their position in a word. Short vowels are small marks, shown on every word in Lisan. Tap a letter to hear an example word.',
  pronHint: (a) => (a.stressMarked
    ? 'Syllables are shown in transliteration; the highlighted one is stressed. Tap a syllable to hear the word slowly.'
    : 'Syllables are shown in transliteration. Tap one to hear the word slowly.'),
  categories: [...baseCategories, ...moreCategories],
  vocab: [...baseVocab, ...moreVocab],
  grammar: lessons,
  alphabet,
  soundTips,
  minimalPairs,
  analyze: (word) => ({ ...analyzeTranslit(word.tl, word.s, word.dialect), chipLang: null, chipsSpeakable: false }),
  reading: (w) => w.tl,
  // Arabic keyboards aren't on every phone: transliteration (with or without ḥ/ā marks) counts too.
  acceptedAnswers: (w) => [...new Set([w.tr, ...(w.alt || []), w.tl, asciiTranslit(w.tl)])],
  normalize,
  stripDiacritics,
  voiceHelp: {
    ios: 'Open Settings → Accessibility → Spoken Content → Voices → Arabic and download a voice (e.g. Majed).',
    android: 'Open Settings → search “Text-to-speech” → Speech Services by Google → Install voice data → Arabic.',
    mac: 'Open System Settings → Accessibility → Spoken Content → System voice → Manage Voices… → Arabic (Majed).',
    windows: 'Open Settings → Time & language → Speech → Manage voices → Add voices → Arabic. Microsoft Edge also has free online Arabic voices.',
    other: 'Install an Arabic text-to-speech voice for your operating system, or try Microsoft Edge, which includes free online Arabic voices.',
  },
});
