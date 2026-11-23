// Ukrainian language pack.
import { categories as baseCategories, vocab as baseVocab } from './vocab.js';
import { categories as moreCategories, vocab as moreVocab } from './more.js';
import { lessons } from './grammar.js';
import { extraExamples } from './examples.js';
import { feminine } from './feminine.js';
import { alphabet, soundTips, minimalPairs } from './sounds.js';
import { analyze, lower, transliterate } from './phonetics.js';
import { makePack, pauseBetweenWords } from '../common.js';

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

// Slow playback keeps these with the next word (не їм, на роботі, будь ласка)…
const PROCLITIC = new Set(['не', 'ні', 'на', 'до', 'за', 'від', 'без', 'для', 'під', 'над', 'про', 'по', 'при', 'через', 'та', 'із', 'зі', 'будь']);
// …and these with the word before (ж, же, б, би).
const ENCLITIC = new Set(['ж', 'же', 'б', 'би']);

// A negative: не, ні, немає. “Я розумію” for “Я не розумію” is a different answer.
const NEGATION = /(?:^|\s)(?:не|ні|немає|нема)(?:\s|$)/u;

/**
 * Latin text folded across the usual ways to romanise Ukrainian, so privit,
 * pryvit, govoryty, hovoriti, den' and dobriy den all meet the course's
 * transliteration: kh/g → h, y/j/i → i, no apostrophes. null for Cyrillic.
 */
export function romanKey(s) {
  if (!/[a-z]/i.test(s) || /\p{Script=Cyrillic}/u.test(s)) return null;
  return normalize(s).replace(/['’ʼ`\s]/g, '').replace(/kh/g, 'h').replace(/g/g, 'h').replace(/[yji]+/g, 'i');
}

/** Looser still (siohodni for sohodni): a softening i before a vowel dropped. Almost right, not right. */
export const looseKey = (s) => romanKey(s)?.replace(/([bcdfhklmnprstvzšž])i(?=[aeou])/g, '$1') ?? null;

// Sentence-builder orders (js/sentences.js): будь ласка may open or close a
// request; a time word may open the sentence, follow a pronoun subject or
// close it (Я сьогодні працюю · Сьогодні я працюю · Я працюю сьогодні); an
// object pronoun may stand before or after a final verb (Я тебе люблю · Я люблю тебе).
const PRONOUNS = ['я', 'ти', 'він', 'вона', 'воно', 'ми', 'ви', 'вони', 'мені', 'тобі', 'йому', 'їй', 'нам', 'вам', 'їм', 'у мене', 'в мене'];
// Not його/її/їх: they are also possessives (його машину).
const OBJECT_PRONOUNS = ['мене', 'тебе', 'нас', 'вас'];
const QUESTION_WORDS = ['що', 'де', 'коли', 'як', 'чому', 'хто', 'куди', 'звідки', 'скільки', 'який', 'яка', 'яке', 'які', 'чи', 'котра', 'котрій', 'навіщо'];

export default makePack({
  extraExamples,
  feminine,
  code: 'uk',
  // A word the learner adds: its stress, when they marked it — the stressed
  // syllable of each word, counted from 1 (0 = not marked), as "2" or "1 0 3".
  ownReading: (o) => {
    const s = /^\d+(?: \d+)*$/.test(o.read || '') ? o.read.split(' ').map(Number) : [];
    return s.some(Boolean) ? { s: s.length === 1 ? s[0] : s } : {};
  },
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
  // Stress is free and unwritten, and phone voices sometimes misplace it: the
  // course asks for it (Practice → Word stress, and now and then in reviews).
  stressPractice: true,
  almostHint: 'So close! Just a letter or two off:',
  // Feedback: Ukrainian words with an English gloss.
  praise: [['Правильно!', 'Correct.'], ['Чудово!', 'Great.'], ['Молодець!', 'Well done.'], ['Супер!', 'Nice.']],
  scoreTitles: { excellent: ['Відмінно!', 'Excellent.'], close: ['Дуже добре!', 'Very good.'] },
  alphabetIntro: 'Ukrainian uses the Cyrillic alphabet — 33 letters, read almost exactly as they are written. Tap a letter to hear an example word. Highlighted letters are the ones English speakers usually find surprising.',
  pronHint: (a) => (a.stressMarked
    ? 'Highlighted syllable = stress. Ukrainian stress can fall on any syllable, so learn it with the word. Tap a syllable to hear it.'
    : 'Tap a syllable to hear it slowly.'),
  categories: [...baseCategories, ...moreCategories],
  vocab: [...baseVocab, ...moreVocab],
  grammar: lessons,
  alphabet,
  soundTips,
  minimalPairs,
  analyze: (word) => analyze(word.tr, word.s),
  normalize,
  stripDiacritics,
  slowText: (text) => pauseBetweenWords(text, ',', { leans: (w) => PROCLITIC.has(w), clings: (w) => ENCLITIC.has(w) }),
  negation: NEGATION,
  romanKey,
  looseKey,
  wordOrder: {
    free: ['будь ласка'],
    time: ['сьогодні', 'завтра', 'вчора', 'зараз', 'тепер', 'потім', 'вранці', 'ввечері', 'вночі', 'післязавтра', 'щодня'],
    timeSlots: ['start', 'second', 'end'],
    // After moving, a time word may only follow a pronoun subject (Я сьогодні…).
    secondAfter: PRONOUNS,
    questionWords: QUESTION_WORDS,
    objectPronouns: OBJECT_PRONOUNS,
    infinitive: /(?:ти|тися|тись|ть)$/u,
    verb: /(?:в|ла|ло|ли|ю|ує|ить|ать|ять|ш|мо|те)$/u,
    // A subordinate clause keeps its time word (Я думаю, що завтра…).
    freeze: /^(?:що|щоб|якщо|бо|коли)$/u,
    // Said to someone, set off by a comma (Мамо, я вдома · Я вдома, мамо); names count too.
    vocatives: ['мамо', 'тату', 'друже', 'друзі', 'колеги', 'пане', 'пані', 'сину', 'доню', 'брате', 'сестро', 'бабусю', 'дідусю', 'хлопці', 'дівчата', 'любий', 'люба'],
    // Words a final verb and its pronoun can't be split from: не, prepositions.
    keepTogether: ['не', 'ні', 'в', 'у', 'на', 'до', 'з', 'із', 'зі', 'за', 'від', 'без', 'для', 'під', 'над', 'про', 'по', 'при', 'через', 'дуже', 'так', 'і', 'й', 'та', 'а', 'але', 'що', 'щоб'],
  },
  // Cyrillic keyboards aren't on every phone: Latin transliteration counts too.
  acceptedAnswers: (w) => [...new Set([w.tr, ...(w.alt || []), transliterate(w.tr), transliterate(w.tr, { easy: true })])],
  voiceHelp: {
    ios: 'Open Settings → Accessibility → Spoken Content → Voices → Ukrainian and download a voice (e.g. Lesya).',
    android: 'Open Settings → search “Text-to-speech” → set the preferred engine to Speech Services by Google → Install voice data → Ukrainian.',
    mac: 'Open System Settings → Accessibility → Spoken Content → System voice → Manage Voices… → Ukrainian (Lesya).',
    windows: 'Windows has no Ukrainian voice of its own, and Chrome doesn’t bring one. Open Lisan in Microsoft Edge, which has free online Ukrainian voices (Polina, Ostap), or use the Android or iPhone app.',
    other: 'Install a Ukrainian text-to-speech voice for your system, or open Lisan in Microsoft Edge, which has free online Ukrainian voices.',
  },
});

export { transliterate };
