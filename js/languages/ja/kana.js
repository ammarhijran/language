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
  const words = kana.trim().split(/\s+/);
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
