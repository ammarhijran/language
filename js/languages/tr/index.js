// Turkish language pack.
import { categories as baseCategories, vocab as baseVocab } from './vocab.js';
import { categories as moreCategories, vocab as moreVocab } from './more.js';
import { lessons } from './grammar.js';
import { alphabet, soundTips, minimalPairs } from './sounds.js';
import { analyze, lower } from './phonetics.js';
import { makePack } from '../common.js';

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

export default makePack({
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
    android: 'Open Settings → search “Text-to-speech” → Speech Services by Google → Install voice data → Turkish.',
    mac: 'Open System Settings → Accessibility → Spoken Content → System voice → Manage Voices… → Turkish (Yelda).',
    windows: 'Open Settings → Time & language → Speech → Manage voices → Add voices → Turkish. Microsoft Edge also has free online Turkish voices.',
    other: 'Install a Turkish text-to-speech voice for your operating system, or try Microsoft Edge, which includes free online Turkish voices.',
  },
});
