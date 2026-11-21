// Arabic pronunciation from a learner transliteration (e.g. "marḥaban",
// "ṣabāḥ al-khayr"): syllables, Modern Standard Arabic stress, IPA and an
// English-friendly respelling.

const DIGRAPHS = ['th', 'kh', 'dh', 'sh', 'gh'];
const SINGLE = new Set([...'ʾʿbtjḥdrzsṣḍṭẓfqklmnhwygvp']); // g, v, p: Egyptian Arabic and loanwords
const VOWELS = new Set([...'aiueoāīūēō']); // e, o, ē, ō: Egyptian Arabic
const LONG = new Set([...'āīūēō']);

const IPA = {
  ʾ: 'ʔ', ʿ: 'ʕ', b: 'b', t: 't', th: 'θ', j: 'd͡ʒ', ḥ: 'ħ', kh: 'x', d: 'd', dh: 'ð', r: 'r', z: 'z', s: 's',
  sh: 'ʃ', ṣ: 'sˤ', ḍ: 'dˤ', ṭ: 'tˤ', ẓ: 'ðˤ', gh: 'ɣ', f: 'f', q: 'q', k: 'k', l: 'l', m: 'm', n: 'n', h: 'h',
  w: 'w', y: 'j', g: 'ɡ', v: 'v', p: 'p', a: 'a', i: 'i', u: 'u', e: 'e', o: 'o', ā: 'aː', ī: 'iː', ū: 'uː', ē: 'eː', ō: 'oː',
};
const RESPELL = {
  ʾ: "'", ʿ: "'", ḥ: 'h', ṣ: 's', ḍ: 'd', ṭ: 't', ẓ: 'z', ā: 'aa', ī: 'ee', ū: 'oo', e: 'e', o: 'o', ē: 'ay', ō: 'oh',
};

/** Split one transliterated word into sounds. */
export function tokenize(word) {
  const s = word.toLowerCase().replace(/[-‐'’]/g, (c) => (c === '-' || c === '‐' ? '' : 'ʾ'));
  const out = [];
  for (let i = 0; i < s.length;) {
    const two = s.slice(i, i + 2);
    if (DIGRAPHS.includes(two)) { out.push(two); i += 2; continue; }
    const ch = s[i];
    if (SINGLE.has(ch) || VOWELS.has(ch)) out.push(ch);
    i += 1;
  }
  return out;
}

const isV = (t) => VOWELS.has(t);

/** Syllables as arrays of sounds. Arabic allows no consonant clusters at the start of a syllable. */
export function syllabify(tokens) {
  const vs = [];
  tokens.forEach((t, i) => { if (isV(t)) vs.push(i); });
  if (vs.length < 2) return [tokens];
  const starts = [0];
  for (let k = 0; k < vs.length - 1; k++) {
    const a = vs[k];
    const b = vs[k + 1];
    starts.push(b - a - 1 === 0 ? b : b - 1);
  }
  return starts.map((st, i) => tokens.slice(st, starts[i + 1]));
}

function weight(syl) {
  const vi = syl.findIndex(isV);
  const coda = syl.length - vi - 1;
  const long = LONG.has(syl[vi]);
  if ((long && coda >= 1) || coda >= 2) return 3; // superheavy
  if (long || coda === 1) return 2; // heavy
  return 1; // light
}

/** MSA stress: superheavy final; else heavy penult; else antepenult (or penult in two-syllable words). */
export function stressIndex(syls) {
  const n = syls.length;
  if (n < 2) return -1;
  if (weight(syls[n - 1]) === 3) return n - 1;
  if (weight(syls[n - 2]) >= 2) return n - 2;
  return n >= 3 ? n - 3 : n - 2;
}

const ipaOf = (syl) => syl.map((t) => IPA[t] ?? t).join('');
const respellOf = (syl, first) => syl.map((t, i) => {
  if (t === 'ʾ' && first && i === 0) return '';
  return RESPELL[t] ?? t;
}).join('');

/**
 * @param {string} tl transliteration
 * @param {number|number[]} [stress] optional override (1-based; array per word)
 */
export function analyzeTranslit(tl, stress) {
  const ws = tl.trim().split(/\s+/);
  const words = ws.map((w, wi) => {
    const syls = syllabify(tokenize(w));
    const override = Array.isArray(stress) ? stress[wi] : (ws.length === 1 ? stress : undefined);
    const si = override === 0 ? -1 : override ? override - 1 : stressIndex(syls);
    // Display each syllable in transliteration (keep the word's own letters).
    return {
      text: w,
      syllables: syls.map((syl, i) => ({ text: syl.join(''), ipa: ipaOf(syl), respell: respellOf(syl, i === 0) })),
      stressIndex: syls.length > 1 ? si : -1,
    };
  });
  const ipa = words.map((w) => w.syllables.map((s, i) => (i === w.stressIndex ? 'ˈ' : i > 0 ? '.' : '') + s.ipa).join('')).join(' ');
  const respell = words.map((w) => w.syllables.map((s, i) => (i === w.stressIndex ? s.respell.toUpperCase() : s.respell)).join('-')).join(' ');
  return { words, ipa, respell, stressMarked: words.some((w) => w.stressIndex >= 0) };
}

const ASCII = { ḥ: 'h', ṣ: 's', ḍ: 'd', ṭ: 't', ẓ: 'z', ā: 'a', ī: 'i', ū: 'u', ē: 'e', ō: 'o' };
/** Plain-ASCII version of a transliteration, as people type it: "ṣabāḥ al-khayr" → "sabah al-khayr". */
export const asciiTranslit = (tl) => tl.replace(/[ḥṣḍṭẓāīūēō]/g, (c) => ASCII[c]).replace(/[ʾʿ'’]/g, '');
