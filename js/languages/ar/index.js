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
import { analyzeTranslit, asciiTranslit, spokenArabic, alignTranslit } from './translit.js';
import { say } from './say.js';
import { makePack, pauseBetweenWords, sameScriptAlts, writtenUnits } from '../common.js';

const TASHKEEL = /[ؐ-ًؚ-ٰٟۖ-ۭ]/g;

/** Plain Arabic: no vowel marks or tatweel, alif/yā/tā-marbūṭa variants unified; Latin lowercased, ʾ/ʿ and apostrophes dropped. No spaces. */
// Arabizi (chat Arabic) numbers for letters Latin lacks, accepted in typed
// transliteration: 2 = ʾ, 3 = ʿ, 5 = kh, 6 = ṭ, 7 = ḥ, 8 = gh (ma3lesh, 7abibi).
const ARABIZI = { 2: 'ʾ', 3: 'ʿ', 5: 'kh', 6: 'ṭ', 7: 'ḥ', 8: 'gh' };
const arabizi = (s) => (/[a-z]/i.test(s) ? s.replace(/[235678]/g, (d) => ARABIZI[d]) : s);

// In Latin text every Arabizi digit is a letter, also when it stands alone, so
// the letter-by-letter diff of "eb3atli" lines up with normalize() of the whole.
const arabiziUnit = (s) => normalize(s.replace(/[235678]/g, (d) => ARABIZI[d]));

export function normalize(s) {
  return plain(s, /[ʾʿ'’‘`ʼʻ]/g);
}

/** Like normalize(), but a typed ʾ or ʿ counts: ʿamal (work) is not ʾaʿmal (I work). For typed answers. */
export function strictNormalize(s) {
  return plain(s, /['’‘`ʼʻ]/g);
}

function plain(s, apostrophes) {
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
    .replace(apostrophes, '')
    .replace(/[\s\-‐.,!?؟،؛:;"“”()«»]/g, '');
}

/** Lenient form: transliteration diacritics and ʾ/ʿ dropped, hamza ignored. */
export function stripDiacritics(s) {
  return asciiTranslit(normalize(s)).replace(/ء/g, '').replace(/(.)\1/g, '$1');
}

const isLatin = (s) => /[a-z]/i.test(s) && !/\p{Script=Arabic}/u.test(s);

/**
 * Latin text folded across the usual ways to write Arabic in English
 * letters, so marhaba, bait, kabeer, souq, shokran and “sabah el-kheir” meet
 * the course's transliteration: no marks, ee/ie → i, oo/ou → u, ai/ei/ey →
 * ay, au/ow → aw, e → i, o → u (Arabic has three vowels), el-/il- → al-, no
 * doubled letters. null for Arabic script.
 */
export function romanKey(s) {
  if (!isLatin(s)) return null;
  const article = s.toLowerCase().replace(/(^|[\s-])(?:el|il)[-\s]/g, '$1al');
  return asciiTranslit(normalize(article))
    .replace(/ee|ii|ie/g, 'i').replace(/oo|ou|uu/g, 'u').replace(/aa/g, 'a')
    .replace(/ai|ei|ey/g, 'ay').replace(/au|ow/g, 'aw')
    .replace(/e/g, 'i').replace(/o/g, 'u')
    .replace(/([a-z])\1+/g, '$1');
}

/** Looser still (souk for sūq, tazkara for tadhkara): almost right, not right. */
export const looseKey = (s) => romanKey(s)?.replace(/q/g, 'k').replace(/dh/g, 'd').replace(/th/g, 't').replace(/h$/, '') ?? null;

// Negative particles, and the Egyptian ma-…-sh around a verb (مَعْرَفْش).
// “لا أفهم” for “أفهم” is a different answer, not a near miss.
const NEGATIVES = new Set(['لا', 'لم', 'لن', 'ليس', 'ليست', 'لست', 'لسنا', 'ولا', 'ولم', 'ولن', 'فلا', 'مش', 'مو', 'مفيش']);
const NOT_NEGATIVE = new Set(['معلش', 'مدهش', 'منعش', 'مشمش']);
export const negative = (text) => String(text).split(/\s+/).map(normalize).some((w) => NEGATIVES.has(w) || (/^م\S{2,}ش$/u.test(w) && !NOT_NEGATIVE.has(w)));

// A word that ends in tanwin -an (مَرْحَبًا marḥaban) is usually typed without the n: marhaba, shukra(n).
const TANWIN_FATH = /[ًٌٍ]ا?$|اً$/u;
const withoutTanwin = (w) => (w.tl && TANWIN_FATH.test(w.tr.trim().replace(/[.!?؟،]+$/u, '')) && /an$/.test(w.tl.trim()) ? [w.tl.trim().replace(/n$/, '')] : []);

/**
 * How a recogniser may write an Egyptian word: ق as أ where it is said ʾ
 * (قَهْوَة → أهوة), ذ as ز and ث as ت/س where Cairenes say z, t or s, a final
 * -a as ا (كِدَه → كدا).
 */
const FINAL_HA = /[هة]([\u064B-\u0652]*[؟?!.،]*)$/u;
export function egyptianSpellings(e) {
  if (e.dialect !== 'Egyptian' || !e.tl) return [];
  const tl = e.tl.toLowerCase();
  let forms = [e.tr];
  const swap = (re, to) => { forms = [...new Set(forms.flatMap((f) => [f, f.replace(re, to)]))]; };
  if (/ق/.test(e.tr) && /ʾ/.test(tl) && !/q/.test(tl)) swap(/ق/g, 'أ');
  if (/ذ/.test(e.tr) && /z/.test(tl) && !/dh/.test(tl)) swap(/ذ/g, 'ز');
  if (/ث/.test(e.tr) && !/th/.test(tl)) { swap(/ث/g, 'ت'); swap(/ث/g, 'س'); }
  // A final -a written ه / ة (كِدَه keda) is also written ا.
  const words = e.tr.trim().split(/\s+/);
  const tlWords = tl.trim().split(/[\s-]+/);
  if (words.length === tlWords.length) {
    const ends = words.map((w, i) => FINAL_HA.test(w) && /[ae]$/.test(tlWords[i]));
    const asAlif = (f) => f.split(/\s+/).map((w, i) => (ends[i] ? w.replace(FINAL_HA, 'ا$1') : w)).join(' ');
    if (ends.some(Boolean)) forms = [...new Set(forms.flatMap((f) => [f, asAlif(f)]))];
  }
  return forms.filter((f) => f !== e.tr);
}

// How an entry sounds: its transliteration with long vowels, ʾ and ʿ (maṭar
// “rain” is not maṭār “airport”, mā “what” not māʾ “water”); only spaces,
// hyphens and punctuation set aside.
const soundOf = (tl) => tl.normalize('NFC').toLowerCase().replace(/[\s\-‐.,!?؟،]/g, '');

// Standard Arabic voices: Saudi first, then Apple's "Arabic (World)".
const MSA_REGIONS = ['ar-SA', 'ar-001'];

// The spoken-Arabic lesson marks its Egyptian examples only in their note
// ("Egyptian: …"): give them the dialect too, so an Egyptian voice reads them.
const isEgyptianNote = (x) => !x.dialect && /^Egyptian\b/.test(x.note || '');
const withDialects = (lessons) => lessons.map((l) => ({
  ...l,
  sections: (l.sections || []).map((s) => (s.examples?.some(isEgyptianNote)
    ? { ...s, examples: s.examples.map((x) => (isEgyptianNote(x) ? { ...x, dialect: 'Egyptian' } : x)) }
    : s)),
}));

export default makePack({
  displayUnits: (text) => writtenUnits(text, /[a-z]/i.test(text) ? arabiziUnit : normalize),
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
  grammar: withDialects(lessons),
  alphabet,
  soundTips,
  minimalPairs,
  analyze: (word) => {
    const a = analyzeTranslit(word.tl, word.s, word.dialect);
    // Chips are transliteration, which no voice reads: a tap speaks the
    // script word it belongs to (the whole entry when they don't line up).
    const al = a.words.length > 1 && alignTranslit(word.tr, word.tl);
    if (al) {
      const spaced = word.tl.trim().split(/\s+/);
      a.words.forEach((w, wi) => {
        const own = al.pairs.filter((p) => p.word === wi);
        const tr = own.map((p) => al.tokens[p.at]).join(' ');
        const say = { tr, tl: spaced[wi], dialect: word.dialect };
        w.syllables.forEach((syl) => { syl.say = say; });
      });
    }
    return { ...a, chipLang: null, chipsSpeakable: false };
  },
  reading: (w) => w.tl,
  // Arabic keyboards aren't on every phone: transliteration (with or without ḥ/ā marks) counts too.
  acceptedAnswers: (w) => [...new Set([w.tr, ...(w.alt || []), ...[w.tl, ...withoutTanwin(w)].flatMap((t) => (t ? [t, asciiTranslit(t)] : []))])],
  // Spoken: the Arabic-script spellings, and the ways Egyptian words are written.
  spokenTargets: (w) => [...new Set([w.tr, ...sameScriptAlts(w), ...egyptianSpellings(w)])],
  normalize,
  strictNormalize,
  stripDiacritics,
  romanKey,
  looseKey,
  negative,
  // Two spellings of one sound (Egyptian قَوِي and أَوِي, both ʾawi).
  sameSound: (a, b) => !!a.tl && !!b.tl && a.dialect === b.dialect && soundOf(a.tl) === soundOf(b.tl),
  wordOrder: {
    // “Please” may open or close a request (الْحِسَابُ مِنْ فَضْلِكَ · مِنْ فَضْلِكَ الْحِسَابُ).
    free: ['مِنْ فَضْلِكَ', 'لَوْ سَمَحْتَ', 'مِنْ فَضْلِكِ', 'لَوْ سَمَحْتِ'],
    // A time word may open or close a statement.
    time: ['الْيَوْمَ', 'غَدًا', 'أَمْسِ', 'الْآنَ', 'بُكْرَة', 'النَّهَارْدَه', 'دِلْوَقْتِي', 'إِمْبَارِح'],
    timeSlots: ['start', 'end'],
    // A subordinate clause keeps its time word (أَظُنُّ أَنَّ الْمَطْعَمَ مُغْلَقٌ الْيَوْمَ).
    freeze: /^(?:ان|لان|الذي|التي|الذين|عندما|اذا|لو|كي|حتي|لكن|انه|انها)$/u,
    questionWords: ['ما', 'ماذا', 'متى', 'أين', 'كيف', 'لماذا', 'من', 'هل', 'كم', 'أي', 'إيه', 'فين', 'إمتى', 'ليه', 'إزاي', 'مين'],
  },
  say,
  speechRegions: MSA_REGIONS,
  altVoiceHint: 'This device has no Egyptian voice, so a Standard Arabic voice reads this. In Cairo ج is a hard g (gamīl) and ق is usually a catch in the throat, ʾ (ʾahwa): follow the transliteration.',
  // The voice reads what the transliteration shows: pausal forms instead of
  // case endings it leaves out. Egyptian entries go to an Egyptian voice; a
  // device without one reads them respelled with its Standard Arabic voice.
  speech(e, said) {
    const msa = { lang: 'ar-SA', regions: MSA_REGIONS };
    const read = (voice) => (said ? { text: said, slow: pauseBetweenWords(said, '،') } : e.tl ? spokenArabic(e.tr, e.tl, { voice }) : { text: e.tr, slow: pauseBetweenWords(e.tr, '،') });
    if (e.dialect !== 'Egyptian') return { ...msa, ...read('msa') };
    return { lang: 'ar-EG', regions: ['ar-EG'], ...read('egyptian'), alt: { ...msa, ...read('msa-for-egyptian') } };
  },
  voiceHelp: {
    ios: 'Open Settings → Accessibility → Spoken Content → Voices → Arabic and download a voice (e.g. Majed).',
    android: 'Open Settings → search “Text-to-speech” → set the preferred engine to Speech Services by Google → Install voice data → Arabic.',
    mac: 'Open System Settings → Accessibility → Spoken Content → System voice → Manage Voices… → Arabic (Majed).',
    windows: 'Open Settings → Time & language → Speech → Manage voices → Add voices → Arabic (Saudi Arabia: Naayf; Egypt: Hoda), then restart the browser. Microsoft Edge also has free online Arabic voices, Egyptian ones included.',
    other: 'Install an Arabic text-to-speech voice for your operating system, or try Microsoft Edge, which includes free online Arabic voices.',
  },
});
