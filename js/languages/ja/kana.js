// Japanese kana helpers: morae, Hepburn rōmaji, "wāpuro" rōmaji (as typed on
// a keyboard: ou, uu) and a broad IPA transcription.

const BASE = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko', が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so', ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to', だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho', ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', ゐ: 'i', ゑ: 'e', を: 'o', ん: 'n', ゔ: 'vu',
};
const SMALL_Y = { ゃ: 'a', ゅ: 'u', ょ: 'o' };
const SMALL_V = { ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o' };
const SMALL = new Set([...'ぁぃぅぇぉゃゅょゎ']);

const KANA = /[ぁ-ゖァ-ヺー]/;
export const hasKana = (s) => KANA.test(s);

/** Katakana → hiragana (ー is kept). */
export const toHiragana = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** Split kana into morae: a kana plus any small ゃゅょぁぃぅぇぉ is one beat; っ, ん and ー are beats too. */
export function morae(text) {
  const out = [];
  for (const ch of text) {
    const h = toHiragana(ch);
    if (SMALL.has(h) && out.length) out[out.length - 1] += ch;
    else out.push(ch);
  }
  return out;
}

/** Rōmaji for one mora (without context: っ, ん and ー are handled by the caller). */
function moraRomaji(m) {
  const h = toHiragana(m);
  const [first, second] = [...h];
  const base = BASE[first] ?? '';
  if (!second) return base;
  if (SMALL_Y[second]) {
    const stem = base.endsWith('i') ? base.slice(0, -1) : base;
    return ['sh', 'ch', 'j'].includes(stem) ? stem + SMALL_Y[second] : `${stem}y${SMALL_Y[second]}`;
  }
  if (SMALL_V[second]) {
    let stem = base.replace(/[aiueo]$/, '');
    if (stem === '') stem = 'w'; // うぃ → wi
    return stem + SMALL_V[second];
  }
  if (second === 'ゎ') return `${base.replace(/[aiueo]$/, '')}wa`;
  return base;
}

/**
 * Convert kana to rōmaji, word by word (spaces are kept).
 * mode 'hepburn': long vowels with macrons (ō, ū, ā, ē);  mode 'wapuro': as typed (ou, uu, aa).
 * Returns { text, morae: [{ kana, rom, long }] per word } so callers can align with morae.
 */
export function romanize(kana, mode = 'hepburn') {
  // A particle written as its own token is read differently: は → wa, へ → e.
  // A reading that is a single は is the word itself (歯, tooth), not a particle.
  const tokens = kana.trim().split(/\s+/);
  const words = tokens.length < 2 ? tokens : tokens.map((w) => (w === 'は' ? 'わ' : w === 'へ' ? 'え' : w));
  return words.map((word) => {
    const ms = morae(word);
    const out = [];
    ms.forEach((m, i) => {
      const h = toHiragana(m);
      const prev = out[out.length - 1];
      const prevVowel = prev ? (prev.rom.match(/[aiueo]$/) || [''])[0] : '';
      if (h === 'っ') {
        const next = ms[i + 1] ? moraRomaji(ms[i + 1]) : '';
        out.push({ kana: m, rom: next.startsWith('ch') ? 't' : (next.match(/^[^aiueo]/) || [''])[0], kind: 'gem' });
      } else if (h === 'ー') {
        out.push({ kana: m, rom: mode === 'hepburn' ? '' : prevVowel, kind: 'long', vowel: prevVowel });
      } else if (h === 'ん') {
        const next = ms[i + 1] ? moraRomaji(ms[i + 1]) : '';
        out.push({ kana: m, rom: mode === 'hepburn' && /^[aiueoy]/.test(next) ? "n'" : 'n', kind: 'n' });
      } else if (mode === 'hepburn' && prev && prev.kind === 'mora'
        && ((h === 'う' && /[ou]$/.test(prev.rom)) || (h === 'あ' && /a$/.test(prev.rom)) || (h === 'お' && /o$/.test(prev.rom)) || (h === 'え' && /e$/.test(prev.rom) && prev.rom !== 'e'))) {
        // Long vowel spelled with a kana: おう/おお → ō, うう → ū, ああ → ā, ええ → ē
        out.push({ kana: m, rom: '', kind: 'long', vowel: prevVowel });
      } else {
        out.push({ kana: m, rom: moraRomaji(m), kind: 'mora' });
      }
    });
    if (mode === 'hepburn') {
      // Put the macron on the vowel before each lengthening mora.
      const MAC = { a: 'ā', i: 'ī', u: 'ū', e: 'ē', o: 'ō' };
      out.forEach((o, i) => {
        if (o.kind === 'long' && o.vowel) {
          for (let j = i - 1; j >= 0; j--) {
            if (out[j].rom) { out[j].rom = out[j].rom.replace(/[aiueo]$/, (v) => MAC[v] ?? v); break; }
          }
        }
      });
    }
    return out;
  });
}

export const romaji = (kana, mode = 'hepburn') => romanize(kana, mode).map((w) => w.map((m) => m.rom).join('')).join(' ');

// ---- IPA ----
const ONSETS = [
  ['sh', 'ɕ'], ['ch', 'tɕ'], ['ts', 'ts'], ['ky', 'kʲ'], ['gy', 'ɡʲ'], ['ny', 'ɲ'], ['hy', 'ç'], ['my', 'mʲ'],
  ['ry', 'ɾʲ'], ['by', 'bʲ'], ['py', 'pʲ'], ['j', 'dʑ'], ['k', 'k'], ['g', 'ɡ'], ['s', 's'], ['z', 'z'],
  ['t', 't'], ['d', 'd'], ['n', 'n'], ['h', 'h'], ['f', 'ɸ'], ['b', 'b'], ['p', 'p'], ['m', 'm'], ['y', 'j'],
  ['r', 'ɾ'], ['w', 'ɰ'], ['v', 'v'],
];
const VOWEL_IPA = { a: 'a', i: 'i', u: 'ɯ', e: 'e', o: 'o' };

function moraIpa(rom) {
  if (!rom) return '';
  let onset = '';
  let rest = rom;
  for (const [r, ipa] of ONSETS) {
    if (rom.startsWith(r)) { onset = ipa; rest = rom.slice(r.length); break; }
  }
  const v = rest[0];
  if (onset === 'n' && v === 'i') onset = 'ɲ';
  if (onset === 'h' && v === 'i') onset = 'ç';
  return onset + (VOWEL_IPA[v] ?? '');
}

/** Per word: [{ kana, rom (Hepburn), ipa }] aligned to morae. */
export function analyzeKana(kana) {
  const hep = romanize(kana, 'hepburn');
  const wap = romanize(kana, 'wapuro');
  return hep.map((word, wi) => word.map((m, i) => {
    let ipa;
    if (m.kind === 'long') ipa = 'ː';
    else if (m.kind === 'gem') {
      const next = moraIpa(wap[wi][i + 1]?.rom || '');
      ipa = next.startsWith('tɕ') || next.startsWith('ts') ? 't' : next[0] || '';
    } else if (m.kind === 'n') {
      const next = wap[wi][i + 1]?.rom || '';
      ipa = /^[pbm]/.test(next) ? 'm' : /^[kg]/.test(next) ? 'ŋ' : /^(t|d|n|r|ch|ts|j|z)/.test(next) ? 'n' : next ? 'ɰ̃' : 'ɴ';
    } else ipa = moraIpa(wap[wi][i].rom);
    return { kana: m.kana, rom: m.rom, ipa, kind: m.kind };
  }));
}

// ---- What the voice reads ----

const KANJI = /[\p{Script=Han}々〆ヶ\p{N}\p{Script=Latin}]/u;
const KANA_CH = /[ぁ-ゖァ-ヺー]/u;
const READING_NOISE = /[\s、。・，．,.!?！？「」『』（）()〜~'’"“”…:：;；\-]/gu;

/** The written text cut into runs of kanji (with digits and Latin letters, which the kana spells out), kana and the rest. */
function runs(text) {
  const out = [];
  for (const ch of text) {
    const kind = KANJI.test(ch) ? 'kanji' : KANA_CH.test(ch) ? 'kana' : 'other';
    if (out.length && out[out.length - 1].kind === kind) out[out.length - 1].text += ch;
    else out.push({ kind, text: ch });
  }
  return out;
}

/**
 * Line the kana reading up with the written text: each run of kanji gets the
 * kana it is read with ({ kind, text, kana }). null when they don't fit.
 * Often more than one split fits (母は → はは|は or は|はは; 先月、家族 →
 * せんげつ|かぞく or せ|んげつかぞく), so the one whose kanji start and end
 * where the spaced reading has word breaks wins.
 */
export function alignReading(text, kana) {
  if (!text || !kana) return null;
  // Runs keep the text as written (full-width ？ stays): only the matching is normalised.
  const rs = runs(text);
  const kanaOf = (r) => [...toHiragana(r.text.normalize('NFKC'))];
  const chars = [];
  const wordStart = [];
  for (const [w] of toHiragana(kana.normalize('NFKC')).replace(READING_NOISE, ' ').matchAll(/\S+/gu)) {
    [...w].forEach((ch, i) => { chars.push(ch); wordStart.push(i === 0); });
  }
  const n = chars.length;
  const isBreak = (i) => i === n || wordStart[i];
  // A kanji is read with 1–3 kana: when the breaks can't decide (三年前、彼
  // → さんねん まえ|かれ, not さんねん|まえ かれ), the split closer to that wins.
  const misfit = (count, len) => Math.max(0, len - 3 * count) + Math.max(0, count - len);
  // best(k, i): the best split of runs k… over chars i…, as { score, ends } (memoised).
  const memo = new Map();
  const best = (k, i) => {
    if (k === rs.length) return i === n ? { score: 0, ends: [] } : null;
    const key = k * (n + 1) + i;
    if (memo.has(key)) return memo.get(key);
    const r = rs[k];
    let out = null;
    if (r.kind === 'other') out = best(k + 1, i);
    else if (r.kind === 'kana') {
      const s = kanaOf(r);
      out = s.every((ch, j) => chars[i + j] === ch) ? best(k + 1, i + s.length) : null;
    } else {
      for (let j = i + 1; j <= n; j++) {
        const rest = best(k + 1, j);
        const score = rest && rest.score + 100 * (isBreak(i) + isBreak(j)) - misfit([...r.text].length, j - i);
        if (rest && (!out || score > out.score)) out = { score, ends: [j, ...rest.ends] };
      }
    }
    memo.set(key, out);
    return out;
  };
  const fit = best(0, 0);
  if (!fit) return null;
  let at = 0;
  let g = 0;
  return rs.map((r) => {
    if (r.kind === 'other') return { ...r, kana: '' };
    if (r.kind === 'kana') { at += kanaOf(r).length; return { ...r, kana: kanaOf(r).join('') }; }
    const end = fit.ends[g++];
    const read = chars.slice(at, end).join('');
    at = end;
    return { ...r, kana: read };
  });
}

// Kanji a voice often reads differently from the course: counters, and words
// with two everyday readings ([written, the readings a voice tends to miss]).
// Where the kana reading says one of these, the voice gets that kana instead.
// Only the ambiguous token is replaced: voices use the other kanji to choose
// the pitch accent (雨/飴, 橋/箸).
const AMBIGUOUS = [
  ['二十歳', ['はたち']], ['一人', ['ひとり']], ['二人', ['ふたり']], ['四人', ['よにん']], ['何人', ['なんにん']],
  ['四時', ['よじ']], ['七時', ['しちじ']], ['九時', ['くじ']], ['何時', ['なんじ']], ['十分', ['じゅっぷん', 'じっぷん']],
  ['一回', ['いっかい']], ['一日', ['ついたち', 'いちにち']], ['何名', ['なんめい']], ['明日', ['あした']],
  ['開', ['あ'], /^[かきくいこ]/], ['辛', ['から']], ['降', ['ふ']], ['角', ['かど']], ['何', ['なん']],
];

/** One kanji run respelled where it holds an ambiguous token read as its kana says (else unchanged). */
function readRun(run, after) {
  // 開く (あく, not ひらく), but 開ける is only ever あける: `okuri` says which endings are ambiguous.
  for (const [key, readings, okuri] of AMBIGUOUS) {
    if (run.text === key && readings.includes(run.kana) && (!okuri || okuri.test(after))) return run.kana;
  }
  for (const [key, readings] of AMBIGUOUS) {
    if (key.length < 2) continue;
    for (const rd of readings) {
      const head = run.text.startsWith(key) && run.kana.startsWith(rd);
      if (!head && !(run.text.endsWith(key) && run.kana.endsWith(rd))) continue;
      // Kanji that follow the token usually form one word with it, and cut off
      // they get their stand-alone reading (一日中 → いちにち + 中 "なか",
      // 一人暮らし → ひとり + "くらし"); so does a single kanji left in front.
      // Then the whole run is said in kana. 毎朝七時 keeps 毎朝.
      if (head || run.text.length - key.length === 1) return run.kana;
      return run.text.slice(0, -key.length) + rd;
    }
  }
  return run.text;
}

/**
 * The text for the voice: as written, with the ambiguous kanji (see
 * AMBIGUOUS) replaced by the kana the reading gives them, e.g.
 * 店は十時に開きます。 + みせ は じゅうじ に あきます → 店は十時にあきます。
 */
export function readAmbiguous(text, kana) {
  const al = alignReading(text, kana);
  return al ? al.map((r, i) => (r.kind === 'kanji' ? readRun(r, al[i + 1]?.kana ?? '') : r.text)).join('') : text;
}

// Particles and endings that belong to the word before them: slow playback
// pauses after 店は, not between 店 and は (a lone は could be read “ha”).
const ATTACHED = new Set(['は', 'が', 'を', 'に', 'で', 'と', 'も', 'の', 'へ', 'や', 'か', 'ね', 'よ', 'な', 'わ', 'ぞ', 'さ',
  'から', 'まで', 'より', 'だけ', 'しか', 'って', 'ので', 'のに', 'けど', 'けれど', 'ても', 'でも', 'ば', 'です', 'でした',
  'ます', 'ました', 'ません', 'ませんか', 'でしょう', 'だ', 'だった', 'じゃない', 'ない', 'ください', 'なさい', 'ございます',
  'さま', 'さん', 'ちゃん', 'くん', 'たち', 'ぐらい', 'くらい', 'ごろ', 'など', 'ずつ', 'とか', 'だろう']);
// …an auxiliary after a て-form (あいて います “is open”, かいて あります,
// いって きます), and する after a noun (べんきょう する: one verb).
const AUXILIARY = /^(い(る|ます|ました|ません|ない|た|く|きます)|あ(る|ります|りました|りません|った)|お(く|きます|いた)|き(ます|ました|た)|く(る|れる|れます|れました)|み(る|ます|た|ましょう)|しま(う|います|いました|った))ん?$/;
const SURU = /^(する|します|しました|しません|しない|した|して|しよう|しましょう)$/;
const attaches = (prev, next) => ATTACHED.has(next)
  || (/[てで]$/.test(prev) && AUXILIARY.test(next))
  || (SURU.test(next) && !ATTACHED.has(prev));

/**
 * `text` (as the voice reads it) with "、" between the phrases of its spaced
 * kana reading, for slow playback; null for a single phrase or when the
 * reading doesn't line up with the text.
 */
export function pausedJapanese(text, kana) {
  if (!kana) return null;
  const words = toHiragana(kana.normalize('NFKC')).replace(/[、。・，．,.!?！？「」『』（）()〜~'’"“”…]/g, ' ').trim().split(/\s+/).filter(Boolean);
  const ends = [];
  let at = 0;
  words.forEach((w, i) => {
    at += [...w].length;
    const next = words[i + 1];
    if (next && !attaches(w, next)) ends.push(at);
  });
  if (!ends.length) return null;
  const al = alignReading(text, kana);
  if (!al) return null;
  // Walk the text with a position in the reading: a kanji run takes its whole
  // reading at once (a pause never splits it), kana go one by one.
  const pieces = al.flatMap((r) => (r.kind === 'kana' ? [...r.text].map((ch) => ({ text: ch, n: 1, kind: 'kana' })) : [{ text: r.text, n: [...r.kana].length, kind: r.kind }]));
  let pos = 0;
  let out = '';
  let pauses = 0;
  pieces.forEach((p, i) => {
    out += p.text;
    pos += p.n;
    const next = pieces[i + 1];
    // A pause where a phrase ends, unless the text already has punctuation there.
    if (ends.includes(pos) && next && next.kind !== 'other' && p.kind !== 'other') { out += '、'; pauses++; }
  });
  return pauses ? out : null;
}

/** What a mora chip sounds like on its own: っ, ー and ん lean on a neighbour, a particle は is わ. */
export function moraSay(ms, i) {
  const m = ms[i];
  const prev = ms[i - 1]?.kana ?? '';
  const next = ms[i + 1]?.kana ?? '';
  if (m.kind === 'gem') return prev + m.kana + next;
  if (m.kind === 'long') return prev + m.kana;
  if (m.kind === 'n') return prev ? prev + m.kana : m.kana + next;
  return toHiragana(m.kana) === 'を' ? 'お' : m.kana;
}
