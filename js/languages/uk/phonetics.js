// Ukrainian phonetics: syllables, broad IPA, English-friendly respelling and
// Latin transliteration. Ukrainian spelling is close to phonemic, but stress is
// free (it can fall on any syllable), so it comes from the vocabulary data.

// Unicode has no Ukrainian-specific case rules, so the plain (much faster) mapping is identical.
export const lower = (s) => s.toLowerCase();

const VOWELS = new Set([...'аеєиіїоуюя']);
const IOTATED = { я: 'a', ю: 'u', є: 'ɛ', ї: 'i' };
const SONORANTS = new Set([...'йрлмнв']);
const LIQUIDS = new Set([...'рл']);
const APOS = /['’ʼ`]/g;

const IPA_CONS = {
  б: 'b', в: 'ʋ', г: 'ɦ', ґ: 'ɡ', д: 'd', ж: 'ʒ', з: 'z', й: 'j', к: 'k', л: 'l', м: 'm', н: 'n',
  п: 'p', р: 'r', с: 's', т: 't', ф: 'f', х: 'x', ц: 't͡s', ч: 't͡ʃ', ш: 'ʃ', щ: 'ʃt͡ʃ',
};
const IPA_VOW = { а: 'ɑ', е: 'ɛ', и: 'ɪ', і: 'i', о: 'ɔ', у: 'u' };

const RESP_CONS = {
  б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', ж: 'zh', з: 'z', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
  п: 'p', р: 'r', с: 's', т: 't', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
};
const RESP_VOW = { а: 'ah', е: 'eh', и: 'ih', і: 'ee', о: 'oh', у: 'oo', я: 'ya', ю: 'yoo', є: 'yeh', ї: 'yee' };

// Official 2010 transliteration (Cabinet of Ministers of Ukraine), plus a
// common informal variant (ya/yu/ye/yi everywhere) accepted when typing.
const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'i',
  й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
  х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'iu', я: 'ia',
};
const TRANSLIT_INITIAL = { є: 'ye', ї: 'yi', й: 'y', ю: 'yu', я: 'ya' };
const TRANSLIT_EASY = { є: 'ye', ї: 'yi', й: 'y', ю: 'yu', я: 'ya' };

export const isVowel = (ch) => VOWELS.has(lower(ch));

export function splitWords(text) {
  return text.split(/[\s\-–—]+/).map((w) => w.replace(/[^\p{Script=Cyrillic}'’ʼ]/gu, '')).filter(Boolean);
}

export function transliterate(text, { easy = false } = {}) {
  return lower(text).replace(APOS, '').split(/(\s+)/).map((word) => {
    let out = '';
    [...word].forEach((ch, i) => {
      const initial = i === 0;
      if (easy && TRANSLIT_EASY[ch]) out += TRANSLIT_EASY[ch];
      else if (initial && TRANSLIT_INITIAL[ch]) out += TRANSLIT_INITIAL[ch];
      else if (ch === 'г' && word[i - 1] === 'з') out += 'gh'; // зг → zgh
      else out += TRANSLIT[ch] ?? ch;
    });
    return out;
  }).join('');
}

/**
 * Split a word into syllables (one vowel each). Between vowels a single
 * consonant starts the next syllable; in clusters, an obstruent + р/л pair
 * stays together (до-бре), a leading sonorant closes the previous syllable
 * (кім-на-та), otherwise the first consonant closes it (сес-тра).
 */
export function syllabify(word) {
  const chars = [...word];
  const lc = chars.map(lower);
  const v = [];
  lc.forEach((c, i) => { if (VOWELS.has(c)) v.push(i); });
  if (v.length < 2) return [word];
  const starts = [0];
  for (let k = 0; k < v.length - 1; k++) {
    const a = v[k];
    const b = v[k + 1];
    // consonant letters between the vowels (soft sign / apostrophe stick to the previous one)
    const cons = [];
    for (let i = a + 1; i < b; i++) if (!/[ь'’ʼ]/.test(lc[i])) cons.push(i);
    let start;
    if (cons.length === 0) start = b;
    else if (cons.length === 1) start = cons[0];
    else {
      const last = cons[cons.length - 1];
      const prev = cons[cons.length - 2];
      if (LIQUIDS.has(lc[last]) && !SONORANTS.has(lc[prev])) start = prev;
      else if (SONORANTS.has(lc[cons[0]])) start = cons[1];
      else start = cons[1];
    }
    starts.push(start);
  }
  return starts.map((s, i) => chars.slice(s, starts[i + 1]).join(''));
}

/** Per-letter [ipa, respelling], using neighbours for context. */
function phones(word) {
  const c = [...lower(word)];
  return c.map((ch, i) => {
    const prev = c[i - 1];
    const next = c[i + 1];
    if (ch === 'ь') return ['ʲ', next === 'о' ? 'y' : ''];
    if (/['’ʼ`]/.test(ch)) return ['', ''];
    if (IOTATED[ch]) {
      // After a consonant (not an apostrophe): softens it. Otherwise: y + vowel.
      const afterConsonant = prev && !VOWELS.has(prev) && !/['’ʼ`ь]/.test(prev);
      if (ch === 'ї') return ['ji', 'yee'];
      return afterConsonant ? [`ʲ${IOTATED[ch]}`, RESP_VOW[ch]] : [`j${IOTATED[ch]}`, RESP_VOW[ch]];
    }
    if (IPA_VOW[ch]) return [IPA_VOW[ch], RESP_VOW[ch]];
    if (ch === 'в') {
      // Before a consonant or at the end, в sounds like w/u̯ — after a vowel
      // (вовк, Київ) and also at the start of a word (вчора, вчитель). Before a
      // vowel (вода, твій) it stays [ʋ].
      const nextReal = next === 'ь' ? c[i + 2] : next;
      const beforeApostrophe = next && /['’ʼ`]/.test(next);
      const afterVowelOrStart = !prev || VOWELS.has(prev);
      if (afterVowelOrStart && !beforeApostrophe && (!nextReal || !VOWELS.has(nextReal))) return ['w', 'w'];
      return ['ʋ', 'v'];
    }
    if (ch === 'д' && (next === 'ж' || next === 'з')) return ['d', 'd'];
    if (IPA_CONS[ch]) return [IPA_CONS[ch], RESP_CONS[ch]];
    return [ch, ch];
  });
}

/**
 * @param {string} text
 * @param {number|number[]} [stress] 1-based stressed syllable; an array gives one
 *   value per word in a phrase. 0 or missing = not marked.
 */
export function analyze(text, stress) {
  const ws = splitWords(text);
  const words = ws.map((w, wi) => {
    const parts = syllabify(w);
    const ph = phones(w);
    let idx = 0;
    const syllables = parts.map((t) => {
      const n = [...t].length;
      const seg = ph.slice(idx, idx + n);
      idx += n;
      return { text: t, ipa: seg.map((p) => p[0]).join(''), respell: seg.map((p) => p[1]).join('') };
    });
    const sw = Array.isArray(stress) ? stress[wi] : (ws.length === 1 ? stress : 0);
    const stressIndex = syllables.length > 1 && sw ? Math.min(sw, syllables.length) - 1 : -1;
    return { text: w, syllables, stressIndex };
  });
  // A preposition with no vowel (в, з, к, й) is read as a letter name on its
  // own: a tap says it with the word it belongs to (“з собою”).
  words.forEach((w, wi) => {
    const next = words[wi + 1];
    if (next && w.syllables.length === 1 && ![...lower(w.text)].some((c) => VOWELS.has(c))) w.syllables[0].say = `${w.text} ${next.text}`;
  });

  const ipa = words
    .map((w) => w.syllables.map((s, i) => (i === w.stressIndex ? 'ˈ' : i > 0 ? '.' : '') + s.ipa).join(''))
    .join(' ');
  const respell = words
    .map((w) => w.syllables.map((s, i) => (i === w.stressIndex ? s.respell.toUpperCase() : s.respell)).join('-'))
    .join(' ');
  return { words, ipa, respell, stressMarked: words.some((w) => w.stressIndex >= 0) };
}
