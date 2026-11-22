// Turkish language pack.
import { categories as baseCategories, vocab as baseVocab } from './vocab.js';
import { categories as moreCategories, vocab as moreVocab } from './more.js';
import { lessons } from './grammar.js';
import { extraExamples } from './examples.js';
import { alphabet, soundTips, minimalPairs } from './sounds.js';
import { analyze, lower } from './phonetics.js';
import { makePack, pauseBetweenWords } from '../common.js';

const DIACRITICS = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };

/** Lowercase (Turkish rules: I→ı, İ→i), drop punctuation, collapse spaces. */
export function normalize(s) {
  return lower(s)
    .replace(/['’`]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Normalised text with Turkish letters folded to ASCII (ş→s, ı→i …). */
export function stripDiacritics(s) {
  return normalize(s).replace(/[çğıöşüâîû]/g, (c) => DIACRITICS[c]);
}

const ONES = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
const TENS = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];

function below1000(n) {
  const parts = [];
  const h = Math.floor(n / 100);
  if (h) parts.push(h === 1 ? 'yüz' : `${ONES[h]} yüz`);
  const t = Math.floor((n % 100) / 10);
  if (t) parts.push(TENS[t]);
  const o = n % 10;
  if (o) parts.push(ONES[o]);
  return parts.join(' ');
}

/** 25 → "yirmi beş", 1000 → "bin" (speech recognisers often return digits). */
export function numberToWords(n) {
  if (!Number.isFinite(n) || n < 0) return String(n);
  if (n === 0) return 'sıfır';
  const parts = [];
  const millions = Math.floor(n / 1e6);
  const thousands = Math.floor((n % 1e6) / 1000);
  const rest = n % 1000;
  if (millions) parts.push(`${below1000(millions)} milyon`);
  if (thousands) parts.push(thousands === 1 ? 'bin' : `${below1000(thousands)} bin`);
  if (rest) parts.push(below1000(rest));
  return parts.join(' ');
}

export function normalizeSpoken(s) {
  const joined = s.replace(/(\d)[.,](?=\d{3}\b)/g, '$1');
  return normalize(normalize(joined).replace(/\d+/g, (d) => ` ${numberToWords(Number(d))} `));
}

// Words that belong to the word before them in slow playback: the question
// particle (alabilir miyiz), değil, and de/da “too”, ki “that”.
const ENCLITIC = /^(m[ıiuü](y[ıiuü][mz]|s[ıiuü]n([ıiuü]z)?|d[ıiuü]r|yd[ıiuü]([mnk]|n[ıiuü]z)?)?|değil.*|de|da|ki)$/;

// A negative verb or sentence: -mıyor, -mayacak, -madı, -mamış, -maz, -mayız,
// değil, yok. Two or three letters make “I understand” “I don't”, so speech
// that adds or drops one is a different answer, not a near miss.
const NEGATION = /m[ıiuü]yor|m[ae]y[ae]c[ae]k|m[ae]d[ıiuü]|m[ae]m[ıiuü]ş|m[ae]z(?:s[ıiuü]n(?:[ıiuü]z)?|l[ae]r)?(?!\p{L})|m[ae]y[ıiuü]z|(?:^|\s)(?:değil|yok)(?!\p{L})/u;

/** â î û as plain a i u: recognisers and most people write hala for hâlâ, dükkan for dükkân. */
const plainVowels = (s) => s.replace(/[âîûÂÎÛ]/g, (c) => ({ â: 'a', î: 'i', û: 'u', Â: 'A', Î: 'I', Û: 'U' }[c]));

// Sentence-builder orders (js/sentences.js): lütfen may open or close a
// request, and a time word that opens a sentence may also follow its first
// word (Bugün hava çok güzel · Hava bugün çok güzel), unless that word is
// one a time word can't follow there: a modifier, determiner, question word…
// Not sonra/önce: after a noun they are postpositions (yemekten sonra).
const TIME_WORDS = ['bugün', 'yarın', 'dün', 'şimdi', 'artık', 'bazen', 'hep', 'her gün', 'bu akşam', 'bu sabah', 'yarın sabah'];
const KEEP_TOGETHER = ['çok', 'daha', 'en', 'biraz', 'hiç', 'az', 'pek', 'gayet', 'bir', 'bu', 'şu', 'o', 'her', 'hangi', 'ne', 'nerede', 'nereye', 'nereden',
  'kim', 'nasıl', 'kaç', 'neden', 'niye', 'niçin', 've', 'ama', 'ile', 'de', 'da', 'ki', 'sabah', 'akşam', 'öğle', 'öğleden', 'gece', 'saat', 'geçen', 'gelecek', 'sonra', 'önce', 'içinde'];
// Topics whose words are nouns: such a word, a name or a pronoun can stand before a time word.
const NOUN_TOPICS = new Set(['people', 'food', 'travel', 'home', 'body', 'nature', 'family2', 'clothes', 'hobbies', 'countries', 'weather', 'groceries', 'health', 'tech', 'town', 'kitchen', 'jobs']);
const PRONOUNS = new Set(['ben', 'sen', 'biz', 'siz', 'onlar', 'beni', 'seni', 'bizi', 'sizi', 'onları', 'bana', 'sana', 'bize', 'size', 'onlara']);
// A case or possessive ending, taken off to find the noun (plajda → plaj, öğretmenimiz → öğretmen).
const ENDING = /(?:n?[dt][ae]n?|y?l[ae]|n?[ıiuü]n|[ıiuü]?m[ıiuü]z|[ıiuü]?m|n[ae]|y?[ae]|n[ıiuü]|y?[ıiuü])$/;

/** A noun of the course, maybe with a case or possessive ending (hava, plajda, öğretmenimiz). */
function isNoun(key) {
  let k = key;
  for (let i = 0; i < 3 && k.length >= 2; i++) {
    if (pack.entriesWritten(k, { normalized: true }).some((e) => !e.pair && NOUN_TOPICS.has(e.word.cat) && !/m[ae]k$/.test(k))) return true;
    const shorter = k.replace(ENDING, '');
    if (shorter === k) break;
    k = shorter;
  }
  return false;
}

const pack = makePack({
  extraExamples,
  code: 'tr',
  name: 'Turkish',
  nativeName: 'Türkçe',
  flag: '🇹🇷',
  speechLang: 'tr-TR',
  greeting: 'Merhaba',
  welcome: 'Hoş geldin!',
  sampleWords: [['Merhaba', 'hello'], ['Teşekkürler', 'thanks'], ['Günaydın', 'good morning']],
  sampleSentence: 'Merhaba! Türkçe öğrenmeye hazır mısın?',
  specialChars: ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü'],
  // Feedback: Turkish words with an English gloss.
  praise: [['Doğru!', 'Correct.'], ['Harika!', 'Great.'], ['Aferin!', 'Well done.'], ['Süper!', 'Nice.']],
  scoreTitles: { excellent: ['Mükemmel!', 'Excellent.'], close: ['Çok iyi!', 'Very good.'] },
  alphabetIntro: 'Türkçe has 29 letters and every letter is always pronounced the same way. Tap a letter to hear an example word. Highlighted letters are the ones English speakers usually find surprising.',
  categories: [...baseCategories, ...moreCategories],
  vocab: [...baseVocab, ...moreVocab],
  grammar: lessons,
  alphabet,
  soundTips,
  minimalPairs,
  analyze: (word) => analyze(word.tr, word.s),
  normalize,
  stripDiacritics,
  normalizeSpoken,
  slowText: (text) => pauseBetweenWords(text, ',', { clings: (w) => ENCLITIC.test(w) }),
  // Spoken: the listed spellings, and â î û written plain.
  spokenTargets: (w) => [...new Set([w.tr, ...(w.alt || [])].flatMap((f) => [f, plainVowels(f)]))],
  negation: NEGATION,
  // A US keyboard's capital I is a dotted i to most learners (Istanbul, Iyi), not ı.
  typedVariants: (s) => (/I/.test(s) ? [s.replace(/I/g, 'i')] : []),
  wordOrder: {
    free: ['lütfen'],
    time: TIME_WORDS,
    timeSlots: ['start', 'second'],
    keepTogether: KEEP_TOGETHER,
    questionWords: ['ne', 'nerede', 'nereye', 'nereden', 'kim', 'nasıl', 'kaç', 'hangi', 'neden', 'niye', 'niçin'],
    // …but not the first half of a compound (diş · hekimine).
    secondAfter: (key, names, next) => (names.has(key) || PRONOUNS.has(key) || isNoun(key)) && !(next && isNoun(key + next)),
    // A question particle keeps the clause as it is (Bu akşam müsait misiniz?).
    freeze: /^(?:m[ıiuü](?:s[ıiuü]n(?:[ıiuü]z)?|y[ıiuü]z|d[ıiuü]r)?|di)$/,
    // Said to someone, set off by a comma (Abi, bakar mısın? · Bakar mısın, abi?).
    vocatives: ['anne', 'baba', 'abi', 'abla', 'hocam', 'kanka', 'arkadaşlar', 'çocuklar', 'canım', 'efendim', 'beyefendi', 'hanımefendi', 'kardeşim', 'dostum', 'oğlum', 'kızım'],
  },
  // â is a, and r is too common to flag on every word.
  letterNotes(word) {
    const seen = new Set();
    const notes = [];
    for (const ch of normalize(word.tr)) {
      const l = alphabet.find((x) => x.lower === (ch === 'â' ? 'a' : ch));
      if (l?.special && l.lower !== 'r' && !seen.has(ch)) {
        seen.add(ch);
        notes.push({ letter: l.lower, ipa: l.ipa, hint: l.hint });
      }
    }
    return notes;
  },
  voiceHelp: {
    ios: 'Open Settings → Accessibility → Spoken Content → Voices → Turkish and download a voice (e.g. Yelda).',
    android: 'Open Settings → search “Text-to-speech” → set the preferred engine to Speech Services by Google → Install voice data → Turkish.',
    mac: 'Open System Settings → Accessibility → Spoken Content → System voice → Manage Voices… → Turkish (Yelda).',
    windows: 'Open Settings → Time & language → Speech → Manage voices → Add voices → Turkish (Tolga), then restart the browser. Microsoft Edge also has free online Turkish voices.',
    other: 'Install a Turkish text-to-speech voice for your operating system, or try Microsoft Edge, which includes free online Turkish voices.',
  },
});

export default pack;
