// Japanese language pack.
import { categories as baseCategories, vocab as baseVocab } from './vocab.js';
import { categories as moreCategories, vocab as moreVocab } from './more.js';
import { lessons } from './grammar.js';
import { extraExamples } from './examples.js';
import { exampleReadings } from './readings.js';
import { alphabet, soundTips, minimalPairs } from './sounds.js';
import { analyzeKana, romaji, toHiragana, hasKana, morae, readAmbiguous, pausedJapanese, moraSay, alignReading } from './kana.js';
import { say, saySentences } from './say.js';
import { SPELLINGS, COURSE, EXTRA } from './homophones.js';
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

const plainKana = (w) => (w.kana ?? '').replace(/\s+/g, '');
const romanOf = (w) => w.rom ?? romaji(w.kana);
const HAN = /[\p{Script=Han}々〆ヶ]/u;
const isKanaOnly = (s) => hasKana(s) && !HAN.test(s) && !/[a-z0-9]/i.test(s);

// A negative: ない, ません, なかった (分かります · 分かりません).
const NEGATION = /ない|ません|なかった|なくて/u;

// Homophones by reading: the course's own (鼻 · 花) and common words outside it (木 · 気).
const HOMOPHONES = new Map();
for (const [kana, forms] of [...Object.entries(COURSE), ...Object.entries(EXTRA)]) {
  const set = HOMOPHONES.get(kana) || new Set();
  forms.forEach((f) => set.add(normalize(f)));
  HOMOPHONES.set(kana, set);
}

/**
 * Kanji (with okurigana) → their readings, from the course: headwords, alt
 * spellings, SPELLINGS, homophones and the kana readings of example
 * sentences. Used to read a recogniser's kanji back into kana.
 */
function kanjiReadings(pack) {
  const map = new Map();
  const add = (text, kana) => {
    const k = normalize(text || '');
    if (!k || !HAN.test(k) || !kana) return;
    const set = map.get(k) || new Set();
    set.add(normalize(kana));
    map.set(k, set);
  };
  for (const w of pack.words) {
    for (const f of [w.tr, ...(w.alt || []), ...(SPELLINGS[w.id] || [])]) add(f, w.kana);
    if (w.pair?.kana) add(w.pair.tr, w.pair.kana);
    // Example sentences: each kanji run with the kana it is read with there.
    for (const r of (w.example?.kana && alignReading(w.example.tr, w.example.kana)) || []) if (r.kind === 'kanji') add(r.text, r.kana);
  }
  for (const [kana, forms] of HOMOPHONES) for (const f of forms) add(f, kana);
  return map;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * A pattern for the kana a transcript could be read as: kana as written,
 * known kanji as their readings, unknown kanji as 1–3 kana each.
 * → { re, wild (unknown kanji), fixed (kana the pattern pins down) }
 */
function readingPattern(heard, readings) {
  const chars = [...heard];
  let src = '';
  let wild = false;
  let fixed = 0;
  for (let i = 0; i < chars.length;) {
    if (!HAN.test(chars[i])) { src += escapeRe(chars[i]); fixed++; i++; continue; }
    let j = Math.min(chars.length, i + 8);
    for (; j > i && !readings.has(chars.slice(i, j).join('')); j--);
    if (j > i) {
      const options = [...readings.get(chars.slice(i, j).join(''))];
      src += `(?:${options.map(escapeRe).join('|')})`;
      fixed += Math.min(...options.map((o) => [...o].length));
      i = j;
      continue;
    }
    for (j = i; j < chars.length && HAN.test(chars[j]); j++);
    src += `.{1,${3 * (j - i)}}`;
    wild = true;
    i = j;
  }
  return { re: new RegExp(`^${src}$`, 'u'), wild, fixed };
}

/**
 * The transcript is the word's sound written another way: a homophone
 * (花 for 鼻, 気 for 木), or kanji for a word the course writes in kana
 * (沢山, 子ども…) read back with the course's own readings (0.95). For a word
 * of 3+ beats, kanji the course doesn't know may stand for 1–3 kana each
 * when the kana around them match (0.9).
 */
let readings = null; // built on first use
function soundsLike(pack, heard, w) {
  const kana = normalize(plainKana(w));
  if (!kana || !heard || heard === kana) return null;
  if (HOMOPHONES.get(kana)?.has(heard)) return { score: 0.95 };
  if (!HAN.test(heard)) return null;
  readings ||= kanjiReadings(pack);
  const { re, wild, fixed } = readingPattern(heard, readings);
  if (!re.test(kana)) return null;
  if (!wild) return { score: 0.95 };
  // Unknown kanji only stand for kana the course writes as kana (行って来ます for
  // 行ってきます): a kanji of the word itself missing from the transcript means
  // another word written there (お客さん for お母さん).
  if (![...w.tr].filter((ch) => HAN.test(ch)).every((ch) => heard.includes(ch))) return null;
  return morae(kana).length >= 3 && fixed * 2 >= [...kana].length ? { score: 0.9 } : null;
}

// Settings → Audio → “Read words from their kana”: see `speech` below.
const voice = { kana: false };

const pack = makePack({
  extraExamples,
  exampleReadings,
  exampleReadingKey: 'kana',
  code: 'ja',
  // Rhythm: every beat (mora) takes the same time — Practice → Count the beats.
  beatPractice: true,
  // Settings → Audio → “Read words from their kana” (see speech() below).
  voiceOption: {
    setting: 'voiceKana',
    label: 'Read words from their kana (try it)',
    hint: 'Kanji can be read in more than one way, and a voice sometimes picks the wrong reading. With this on, single words are sent to the voice in kana, so the reading is always the course’s. The melody of a word may change a little; phrases and sentences are still read as written.',
    sample: '今日',
    set: (on) => { voice.kana = !!on; },
  },
  // A word the learner adds: its reading in kana, as typed — or the word
  // itself when it is written in kana. Kanji without a reading get none.
  ownReading: (o) => {
    const kana = /^[\p{Script=Hiragana}\p{Script=Katakana}ー\s]+$/u;
    const strip = (t) => String(t || '').replace(/[、。！？!?・〜~「」]/g, ' ').replace(/\s+/g, ' ').trim();
    const read = [strip(o.read), strip(o.tr)].find((t) => t && kana.test(t));
    return read ? { kana: read } : {};
  },
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
    // A tap says what the beat sounds like (わ; きっぷ for っ, コー for ー),
    // leaning on the beats around it, also across words (ききたい ん → いん).
    const all = analysed.flat();
    let at = 0;
    const words = analysed.map((ms, wi) => ({
      text: ms.map((m) => m.kana).join(''),
      // Chips show the kana as written (は), sound data uses how it is read (わ).
      syllables: ms.map((m, i) => ({ text: written[wi]?.[i] ?? m.kana, ipa: m.ipa, respell: m.rom, say: moraSay(all, at++) })),
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
  // Kana alt readings (なん for 何, し for 四) count in rōmaji too.
  acceptedAnswers: (w) => (w.kana ? [...new Set([w.tr, plainKana(w), romanOf(w), romaji(w.kana, 'wapuro'),
    ...(w.alt || []).flatMap((a) => (isKanaOnly(a) ? [a, romaji(a), romaji(a, 'wapuro')] : [a]))])] : [w.tr, ...(w.alt || [])]),
  // Spoken: kanji or kana, the listed spellings and the other usual ones (SPELLINGS).
  spokenTargets: (w) => [...new Set([w.tr, plainKana(w), ...(w.alt || []).filter((a) => !/^[\x00-\x7f]+$/.test(a)), ...(SPELLINGS[w.id] || [])].filter(Boolean))],
  sameSound: (a, b) => !!a.kana && !!b.kana && normalize(plainKana(a)) === normalize(plainKana(b)),
  // Sentence-builder orders (js/sentences.js): a time word with no particle
  // after it may come before or after the topic (母は毎朝… · 毎朝母は…).
  wordOrder: {
    aroundTopic: {
      topic: 'は',
      time: ['きょう', 'あした', 'あす', 'きのう', 'いま', 'まいにち', 'まいあさ', 'まいばん', 'こんばん', 'けさ', 'こんど',
        'らいしゅう', 'せんしゅう', 'こんしゅう', 'らいげつ', 'せんげつ', 'こんげつ', 'らいねん', 'きょねん', 'ことし', 'ゆうべ', 'いつも'],
      // A particle after the time word ties it to what follows (きょう の よる, いま から).
      particles: ['は', 'が', 'を', 'に', 'で', 'と', 'の', 'も', 'へ', 'から', 'まで', 'より', 'や', 'か', 'ね', 'よ', 'には', 'では'],
    },
  },
  soundsLike: (heard, w) => soundsLike(pack, heard, w),
  // A kanji the word is never written with (お客さん for お母さん) is another word:
  // one kanji is a whole word, so letter similarity alone is too kind.
  foreignWord: (heard, w) => {
    const own = pack.spokenTargets(w).join('');
    return [...heard].some((ch) => HAN.test(ch) && !own.includes(ch));
  },
  negation: NEGATION,
  noteSource: (w) => plainKana(w),
  // Written Japanese has no spaces between words: sentence-builder tiles are the
  // spaced kana reading, so a sentence without one is skipped.
  sentenceTiles: (w) => w.kana || null,
  normalize,
  stripDiacritics,
  say,
  saySentences,
  // An override must still be the entry read with its own kana, keeping only its kanji.
  sayFits: (text, e) => !e.kana || (!!alignReading(text, e.kana) && [...text].every((ch) => !/\p{Script=Han}/u.test(ch) || e.tr.includes(ch))),
  // Voices read kanji with their own default reading: counters and words
  // with two readings are given the kana the course teaches (say.js, or the
  // kana reading where there is one), and slow playback pauses between phrases.
  // With “Read words from their kana” on, every single word is sent in kana,
  // not only the ambiguous ones: the reading is then always the course's.
  // Phrases and sentences stay as written — without kanji a voice loses where
  // the words end and how the particles は and へ are read.
  speech(e, said) {
    // A one-kana word (歯 は, 目 め) stays as written too: alone, は and へ can be
    // taken for the particles wa and e, and one kana gives a voice nothing to go on.
    const single = voice.kana && e.kana && !/\s/.test(e.kana.trim()) && [...e.kana.trim()].length > 1;
    const text = said ?? (single ? e.kana.trim() : e.kana ? readAmbiguous(e.tr, e.kana) : e.tr);
    return { text, lang: 'ja-JP', slow: e.kana ? pausedJapanese(text, e.kana) : null };
  },
  voiceHelp: {
    ios: 'Open Settings → Accessibility → Spoken Content → Voices → Japanese and download a voice (e.g. Kyoko).',
    android: 'Open Settings → search “Text-to-speech” → set the preferred engine to Speech Services by Google → Install voice data → Japanese.',
    mac: 'Open System Settings → Accessibility → Spoken Content → System voice → Manage Voices… → Japanese (Kyoko).',
    windows: 'Open Settings → Time & language → Speech → Manage voices → Add voices → Japanese (Haruka), then restart the browser. Microsoft Edge also has free online Japanese voices.',
    other: 'Install a Japanese text-to-speech voice for your operating system, or try Microsoft Edge, which includes free online Japanese voices.',
  },
});

export default pack;
