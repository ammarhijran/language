// Turkish phonetics helpers.
//
// Turkish spelling is almost perfectly phonemic, so syllables, a broad IPA
// transcription and an English-friendly respelling can all be derived from
// the written word with a handful of rules.

export const lower = (s) => s.toLocaleLowerCase('tr-TR');
export const upper = (s) => s.toLocaleUpperCase('tr-TR');

const VOWELS = new Set([...'aeıioöuüâîû']);
const FRONT = new Set([...'eiöüî']);
export const isVowel = (ch) => VOWELS.has(lower(ch));

const IPA = {
  a: 'a', b: 'b', c: 'dʒ', ç: 'tʃ', d: 'd', e: 'e', f: 'f', g: 'ɡ', h: 'h',
  ı: 'ɯ', i: 'i', j: 'ʒ', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', ö: 'ø',
  p: 'p', r: 'ɾ', s: 's', ş: 'ʃ', t: 't', u: 'u', ü: 'y', v: 'v', y: 'j',
  z: 'z', â: 'a', î: 'i', û: 'u',
};

// Respelling aimed at English speakers. ö → "eu", ü → "ew", ı → "uh".
const RESPELL = {
  a: 'ah', b: 'b', c: 'j', ç: 'ch', d: 'd', e: 'eh', f: 'f', g: 'g', h: 'h',
  ı: 'uh', i: 'ee', j: 'zh', k: 'k', l: 'l', m: 'm', n: 'n', o: 'oh', ö: 'eu',
  p: 'p', r: 'r', s: 's', ş: 'sh', t: 't', u: 'oo', ü: 'ew', v: 'v', y: 'y',
  z: 'z', â: 'ah', î: 'ee', û: 'oo',
};

// Vowel + y before a consonant (or word end) reads more naturally as a diphthong.
const Y_DIPHTHONG = { a: 'ai', e: 'ay', o: 'oy' };

const LETTERS = /[^A-Za-zÇĞİÖŞÜÂÎÛçğıöşüâîû]/g;

/** Split a phrase into bare words (punctuation and apostrophes removed). */
export function splitWords(text) {
  return text
    .split(/[\s\-–—]+/)
    .map((w) => w.replace(LETTERS, ''))
    .filter(Boolean);
}

/**
 * Split one word into syllables. Every Turkish syllable has exactly one vowel;
 * when consonants sit between two vowels, only the last one starts the next
 * syllable (ek-mek, Türk-çe, kont-rol). Adjacent vowels split (sa-at).
 */
export function syllabify(word) {
  const chars = [...word];
  const vowels = [];
  chars.forEach((c, i) => { if (isVowel(c)) vowels.push(i); });
  if (vowels.length < 2) return [word];
  const starts = [0];
  for (let k = 0; k < vowels.length - 1; k++) {
    const a = vowels[k];
    const b = vowels[k + 1];
    starts.push(b - a - 1 === 0 ? b : b - 1);
  }
  return starts.map((s, i) => chars.slice(s, starts[i + 1]).join(''));
}

/** Per-letter [ipa, respelling] pairs, using neighbouring letters for context. */
function phones(word) {
  const chars = [...lower(word)];
  return chars.map((c, i) => {
    const prev = chars[i - 1];
    const next = chars[i + 1];
    const nextIsVowel = next !== undefined && VOWELS.has(next);

    if (c === 'ğ') {
      // Between vowels: a light glide after front vowels, otherwise silent.
      if (nextIsVowel) return FRONT.has(prev) && FRONT.has(next) ? ['j', 'y'] : ['', ''];
      // Before a consonant or at the end: lengthens the vowel (e + ğ ≈ "ey").
      return prev === 'e' ? ['j', ''] : ['ː', ':'];
    }
    // Circumflex after k/g/l marks a palatal consonant (kâr, rüzgâr, lâzım).
    if ((c === 'k' || c === 'g') && (next === 'â' || next === 'û')) {
      return c === 'k' ? ['c', 'ky'] : ['ɟ', 'gy'];
    }
    if (c === 'l' && next === 'â') return ['ʎ', 'ly'];

    if (c === 'e' && next === 'ğ' && !VOWELS.has(chars[i + 2])) return [IPA.e, 'ay'];
    if (c === 'y' && Y_DIPHTHONG[prev] && !nextIsVowel) return [IPA.y, ''];
    if (Y_DIPHTHONG[c] && next === 'y' && !VOWELS.has(chars[i + 2])) {
      return [IPA[c], Y_DIPHTHONG[c]];
    }

    let resp = RESPELL[c] ?? c;
    // Avoid "ahh"-style doubling when an h closes the vowel's syllable (kah-ve,
    // sa-bah). Before a vowel the h starts the next syllable (şe-hir), so the
    // vowel keeps its own "eh"/"ah", or "she-" would read as English "shee".
    const hClosesSyllable = next === 'h' && !VOWELS.has(chars[i + 2]);
    if (VOWELS.has(c) && hClosesSyllable && resp.endsWith('h')) resp = resp.slice(0, -1);
    return [IPA[c] ?? c, resp];
  });
}

/**
 * Analyse a word or phrase.
 * @param {string} text
 * @param {number} [stress] 1-based stressed syllable for a single word.
 *   undefined → regular final stress, 0 → don't mark stress.
 */
export function analyze(text, stress) {
  const ws = splitWords(text);
  const single = ws.length === 1;
  const words = ws.map((w) => {
    const display = [...lower(w)].length === [...w].length ? w : lower(w);
    const parts = syllabify(display);
    const ph = phones(display);
    let idx = 0;
    const syllables = parts.map((t) => {
      const n = [...t].length;
      const seg = ph.slice(idx, idx + n);
      idx += n;
      const syl = { text: t, ipa: seg.map((p) => p[0]).join(''), respell: seg.map((p) => p[1]).join('') };
      // No Turkish word starts with ğ, so a voice spells “ğil” out: say what it
      // sounds like instead — a y between front vowels (değil → “yil”), else nothing (soğuk → “uk”).
      if (lower(t).startsWith('ğ')) syl.say = (seg[0][0] === 'j' ? 'y' : '') + [...t].slice(1).join('');
      return syl;
    });
    let stressIndex = -1;
    if (single && syllables.length > 1 && stress !== 0) {
      const s = stress ? stress - 1 : syllables.length - 1;
      stressIndex = Math.min(Math.max(s, 0), syllables.length - 1);
    }
    return { text: w, syllables, stressIndex };
  });

  const ipa = words
    .map((w) => w.syllables.map((s, i) => (i === w.stressIndex ? 'ˈ' : i > 0 ? '.' : '') + s.ipa).join(''))
    .join(' ');
  const respell = words
    .map((w) => w.syllables.map((s, i) => (i === w.stressIndex ? s.respell.toUpperCase() : s.respell)).join('-'))
    .join(' ');

  return { words, ipa, respell, stressMarked: words.some((w) => w.stressIndex >= 0) };
}
