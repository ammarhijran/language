// Japanese language pack.
import { categories as baseCategories, vocab as baseVocab } from './vocab.js';
import { categories as moreCategories, vocab as moreVocab } from './more.js';
import { lessons } from './grammar.js';
import { alphabet, soundTips, minimalPairs } from './sounds.js';
import { analyzeKana, romaji, toHiragana, hasKana, morae } from './kana.js';
import { makePack } from '../common.js';

/** Full-width → normal, katakana → hiragana, lowercase rōmaji, no spaces or punctuation. */
export function normalize(s) {
  return toHiragana(s.normalize('NFKC'))
    .toLowerCase()
    .replace(/[\s、。・，．,.!?！？「」『』（）()〜~'’\-]/g, '');
}

const MACRON = { ā: 'a', ī: 'i', ū: 'u', ē: 'e', ō: 'o' };
/**
 * Lenient comparison form: kana are converted to rōmaji, then long vowels,
 * double consonants and apostrophes are folded so “otosan” ≈ “otōsan”.
 */
export function stripDiacritics(s) {
  let x = normalize(s);
  if (hasKana(x)) x = x.replace(/[ぁ-ゖー]+/g, (k) => romaji(k, 'wapuro').replace(/\s/g, ''));
  return x
    .replace(/[āīūēō]/g, (c) => MACRON[c])
    .replace(/([aiueo])\1+/g, '$1')
    .replace(/ou/g, 'o')
    .replace(/ei/g, 'e')
    .replace(/([kstpgdzbcfhjmr])\1/g, '$1')
    .replace(/tch/g, 'ch')
    .replace(/nn/g, 'n');
}

const plainKana = (w) => w.kana.replace(/\s+/g, '');
const romanOf = (w) => w.rom ?? romaji(w.kana);

export default makePack({
  code: 'ja',
  name: 'Japanese',
  nativeName: '日本語',
  flag: '🇯🇵',
  speechLang: 'ja-JP',
  greeting: 'こんにちは',
  welcome: 'ようこそ!',
  sampleWords: [['こんにちは', 'hello'], ['ありがとう', 'thanks'], ['おはよう', 'good morning']],
  sampleSentence: 'こんにちは!一緒に日本語を勉強しましょう。',
  typingHint: 'Type in Japanese or rōmaji…',
  almostHint: 'Almost! Check the long vowels and double consonants:',
  // Feedback: Japanese words with an English gloss.
  praise: [['正解！', 'Correct.'], ['すごい！', 'Great.'], ['よくできました！', 'Well done.'], ['いいね！', 'Nice.']],
  scoreTitles: { excellent: ['すばらしい！', 'Excellent.'], close: ['とてもいい！', 'Very good.'] },
  alphabetIntro: 'Japanese is written with hiragana (below), katakana for foreign words (shown beside each one) and kanji. Every kana is one beat and always sounds the same. Tap a kana to hear an example word.',
  pronHint: () => 'Each box is one beat (mora). Give every beat the same length — a long vowel like ō counts as two. Tap a beat to hear it.',
  categories: [...baseCategories, ...moreCategories],
  vocab: [...baseVocab, ...moreVocab],
  grammar: lessons,
  alphabet,
  soundTips,
  minimalPairs,
  analyze(word) {
    // A final particle は read “wa” (こんにちは) is analysed as わ.
    const kana = word.rom && /wa$/.test(word.rom) ? word.kana.replace(/は$/, 'わ') : word.kana;
    const analysed = analyzeKana(kana);
    const written = word.kana.split(/\s+/).map((w) => morae(w));
    const words = analysed.map((ms, wi) => ({
      text: ms.map((m) => m.kana).join(''),
      // Chips show the kana as written (は), sound data uses how it is read (わ).
      syllables: ms.map((m, i) => ({ text: written[wi]?.[i] ?? m.kana, ipa: m.ipa, respell: m.rom })),
      stressIndex: -1,
    }));
    const ipa = words.map((w) => w.syllables.map((s) => s.ipa).join('')).join(' ');
    // "Say it like": rōmaji split into beats (the lengthening beats merge into the macron).
    // ん and the doubling っ attach to the neighbouring beat: ben-kyō, kip-pu.
    const respell = word.rom ?? analysed.map((ms) => {
      const parts = [];
      ms.forEach((m) => {
        if ((m.kind === 'n' || m.kind === 'gem') && parts.length) parts[parts.length - 1] += m.rom;
        else if (m.rom) parts.push(m.rom);
      });
      return parts.join('-');
    }).join(' ');
    return { words, ipa, respell, stressMarked: false };
  },
  reading(w) {
    if (!w.kana) return null;
    const kana = plainKana(w);
    return normalize(w.tr) === normalize(kana) ? romanOf(w) : `${kana} · ${romanOf(w)}`;
  },
  acceptedAnswers: (w) => [...new Set([w.tr, plainKana(w), romanOf(w), romaji(w.kana, 'wapuro'), ...(w.alt || [])])],
  spokenTargets: (w) => [...new Set([w.tr, plainKana(w)])],
  noteSource: (w) => plainKana(w),
  // Written Japanese has no spaces between words: sentence-builder tiles are the
  // spaced kana reading, so sentences without one (example sentences) are skipped.
  sentenceTiles: (w) => w.kana || null,
  normalize,
  stripDiacritics,
  voiceHelp: {
    ios: 'Open Settings → Accessibility → Spoken Content → Voices → Japanese and download a voice (e.g. Kyoko).',
    android: 'Open Settings → search “Text-to-speech” → Speech Services by Google → Install voice data → Japanese.',
    mac: 'Open System Settings → Accessibility → Spoken Content → System voice → Manage Voices… → Japanese (Kyoko).',
    windows: 'Open Settings → Time & language → Speech → Manage voices → Add voices → Japanese. Microsoft Edge also has free online Japanese voices.',
    other: 'Install a Japanese text-to-speech voice for your operating system, or try Microsoft Edge, which includes free online Japanese voices.',
  },
});
