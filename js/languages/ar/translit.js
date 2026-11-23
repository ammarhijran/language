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

/**
 * MSA stress: superheavy final; else heavy penult; else antepenult (or penult
 * in two-syllable words). `first` is the earliest syllable that may carry it:
 * proclitics such as the article are never stressed (al-ʾAḥad, not ʾAL-aḥad).
 */
/**
 * Cairene (Egyptian) stress: a superheavy final syllable is stressed; else a
 * heavy penult; else the penult or the antepenult, whichever comes an even
 * number of light syllables after the nearest heavy syllable (or the start of
 * the word): shan-ṬI-ti, mush-KI-la, mad-RA-sa, ša-ga-RA-tu-hu, KA-ta-bit.
 */
export function cairoStressIndex(syls, first = 0) {
  const n = syls.length;
  if (n < 2) return -1;
  let si;
  if (weight(syls[n - 1]) === 3) si = n - 1;
  else if (weight(syls[n - 2]) >= 2) si = n - 2;
  else {
    let light = 0;
    for (let i = n - 3; i >= 0 && weight(syls[i]) === 1; i--) light++;
    si = light % 2 === 0 ? n - 2 : n - 3;
  }
  return Math.min(Math.max(si, first), n - 1);
}

export function stressIndex(syls, first = 0) {
  const n = syls.length;
  if (n < 2) return -1;
  let si;
  if (weight(syls[n - 1]) === 3) si = n - 1;
  else if (weight(syls[n - 2]) >= 2) si = n - 2;
  else si = n >= 3 ? n - 3 : n - 2;
  return Math.min(Math.max(si, first), n - 1);
}

/**
 * Which rule put the stress on syllable `si`: 'final' (a superheavy last
 * syllable), 'penult' (a heavy second-to-last), 'two' (two syllables, neither
 * of those), 'antepenult' (Standard: the third from the end), 'cairo-penult' /
 * 'cairo-antepenult' (Egyptian counting), or 'clitic' (the article or a
 * one-letter word in front pushed it onto the word itself). null when the
 * word has no stress to explain.
 */
export function stressReason(syls, first, si, egyptian = false) {
  const n = syls.length;
  if (n < 2 || si < 0) return null;
  if ((egyptian ? cairoStressIndex : stressIndex)(syls, 0) !== si) return 'clitic';
  if (si === n - 1) return 'final';
  if (weight(syls[n - 2]) >= 2) return 'penult';
  if (n === 2) return 'two';
  if (!egyptian) return 'antepenult';
  return si === n - 2 ? 'cairo-penult' : 'cairo-antepenult';
}

// Hyphenated proclitics: the article in all its forms (al-, ash-, an-, il-,
// a bare l- or s- after elision) and the one-letter prepositions/conjunctions.
const PROCLITIC = /^(?:wa|fa|bi|li|ka|[aie]?(?:l|th|dh|sh|[tdrzsnṣḍṭẓ]))$/;

/** How many sounds at the start of a word belong to hyphenated proclitics. */
function procliticLength(word) {
  const parts = word.toLowerCase().split(/[-‐]/);
  let n = 0;
  for (const part of parts.slice(0, -1)) {
    if (!PROCLITIC.test(part)) break;
    n += tokenize(part).length;
  }
  return n;
}

/** Index of the first syllable that is not made up only of proclitic sounds. */
function firstStemSyllable(syls, procLen) {
  let end = 0;
  for (let i = 0; i < syls.length; i++) {
    end += syls[i].length;
    if (end > procLen) return i;
  }
  return 0;
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
/** Syllables, stress, IPA and respelling. `dialect: 'Egyptian'` uses Cairene stress. */
export function analyzeTranslit(tl, stress, dialect) {
  const stressAt = dialect === 'Egyptian' ? cairoStressIndex : stressIndex;
  const ws = tl.trim().split(/\s+/);
  const words = ws.map((w, wi) => {
    const syls = syllabify(tokenize(w));
    const override = Array.isArray(stress) ? stress[wi] : (ws.length === 1 ? stress : undefined);
    const first = firstStemSyllable(syls, procliticLength(w));
    const si = override === 0 ? -1 : override ? override - 1 : stressAt(syls, first);
    // Display each syllable in transliteration (keep the word's own letters).
    return {
      text: w,
      syllables: syls.map((syl, i) => ({ text: syl.join(''), ipa: ipaOf(syl), respell: respellOf(syl, i === 0) })),
      stressIndex: syls.length > 1 ? si : -1,
      // Why it is there (see stressReason): only when the rules placed it, not an entry's own mark.
      stressWhy: override == null ? stressReason(syls, first, syls.length > 1 ? si : -1, dialect === 'Egyptian') : null,
    };
  });
  const ipa = words.map((w) => w.syllables.map((s, i) => (i === w.stressIndex ? 'ˈ' : i > 0 ? '.' : '') + s.ipa).join('')).join(' ');
  const respell = words.map((w) => w.syllables.map((s, i) => (i === w.stressIndex ? s.respell.toUpperCase() : s.respell)).join('-')).join(' ');
  return { words, ipa, respell, stressMarked: words.some((w) => w.stressIndex >= 0) };
}

const ASCII = { ḥ: 'h', ṣ: 's', ḍ: 'd', ṭ: 't', ẓ: 'z', ā: 'a', ī: 'i', ū: 'u', ē: 'e', ō: 'o' };
/** Plain-ASCII version of a transliteration, as people type it: "ṣabāḥ al-khayr" → "sabah al-khayr". */
export const asciiTranslit = (tl) => tl.replace(/[ḥṣḍṭẓāīūēō]/g, (c) => ASCII[c]).replace(/[ʾʿ'’]/g, '');

// ---------- What the voice reads ----------
//
// Fully vowelled script tells a voice to pronounce every case ending
// (أَفْهَمُ ʾafhamu, مِنْ فَضْلِكَ min faḍlika), while the transliteration,
// like people in conversation, leaves most of them out (ʾafham, min faḍlik).
// These helpers line the script's words up with the transliteration's and
// make the spoken text say what the transliteration shows.

const HARAKA = /[\u064B-\u0650]/gu; // tanwīn and the short vowels a, u, i
const HAS_HARAKA = /[\u064B-\u0650]/u;
const MARK = /[\u064B-\u0652\u0670]/u;
const AN_ENDING = /\u064B\u0651?[اى]$|[اى]\u064B$/u; // ـًا: -an (shukran, jiddan) is kept
const HAS_LETTER = /\p{Script=Arabic}/u;

// A hyphenated part that leans on the next one in the same written word:
// the article (al-, il-, ash-, l-…), wa-/wi-, fa-, bi-, li-, ka-, sa- and the
// fused bil-, lil-, wal-, wish-. Anything else ends a written word
// (maʿa-s-salāma is مَعَ + السَّلَامَة).
const LEANS = /^(?:(?:wa|wi|fa|bi|li|ka|la)?(?:[aiue]?l|[aie]?(?:th|dh|sh|[tdrzsnṣḍṭẓ]))|wa|wi|fa|bi|li|ka|la|sa|[wfbl])$/;

/**
 * The transliteration cut into one piece per written word, each with the
 * index of the space-separated transliteration word it is part of (for
 * pauses in slow playback): "maʿa-s-salāma" → [maʿa, s-salāma].
 */
export function translitWords(tl) {
  const out = [];
  String(tl).trim().split(/\s+/).forEach((spaced, wi) => {
    let lead = '';
    for (const part of spaced.split(/[-‐]/)) {
      const bare = part.toLowerCase().replace(/^[ʾ'’]/, '');
      if (LEANS.test(bare)) { lead += `${part}-`; continue; }
      out.push({ tl: lead + part, word: wi });
      lead = '';
    }
    if (lead) out.push({ tl: lead.slice(0, -1), word: wi });
  });
  return out.filter((w) => /\p{L}/u.test(w.tl));
}

/** The words of the Arabic text (tokens with letters) with their surroundings, or [] */
const scriptWords = (tr) => String(tr).split(/(\s+)/).map((t, i) => ({ t, i })).filter(({ t }) => HAS_LETTER.test(t));

/**
 * Pair each written word with its transliteration word, or null when the two
 * don't have the same number of words. Returns { tokens, pairs:[{ at, tl, word }] }
 * where `at` is the word's index in `tokens` (tr split on spaces, spaces kept).
 */
export function alignTranslit(tr, tl) {
  if (!tr || !tl) return null;
  const tokens = String(tr).split(/(\s+)/);
  const ws = scriptWords(tr);
  const tls = translitWords(tl);
  if (!ws.length || ws.length !== tls.length) return null;
  return { tokens, pairs: ws.map(({ i }, k) => ({ at: i, ...tls[k] })) };
}

/** How the transliteration of a word ends: 'tanwin' (-an/-un/-in), 'vowel', 'long' or 'consonant'. */
function translitEnding(tlWord) {
  const s = tlWord.toLowerCase().replace(/[^\p{L}ʾʿ]+$/u, '');
  if (/[aiu]n$/.test(s)) return 'tanwin';
  if (/[āīūēō]$/.test(s)) return 'long';
  if (/[aiueo]$/.test(s)) return 'vowel';
  return 'consonant';
}

/**
 * One written word in its pausal form where the transliteration has one:
 * a word whose transliteration ends in a consonant loses its final case
 * vowel or tanwīn and gets a sukūn (أَفْهَمُ → أَفْهَمْ), and tā marbūṭa
 * read -a loses its case ending (السَّلَامَةِ → السَّلَامَةْ). The -an ending
 * (شُكْرًا) and endings the transliteration shows (bi-khayrin) are kept.
 */
export function pausalWord(word, tlWord) {
  const [, body, punct] = word.match(/^(.*?)([^\p{L}\p{M}]*)$/su);
  if (AN_ENDING.test(body)) return word;
  const tail = body.match(/[\u064B-\u0652\u0670]*$/u)[0];
  const base = body.slice(0, body.length - tail.length);
  if (!HAS_HARAKA.test(tail)) return word;
  const end = translitEnding(tlWord);
  const s = tlWord.toLowerCase().replace(/[^\p{L}]+$/u, '');
  // ة read -at before the next word (maḥaṭṭat al-mitrū) keeps its vowel: a
  // sukūn would make the voice say -ah.
  if (base.endsWith('ة') && s.endsWith('t')) return word;
  const pausal = end === 'consonant'
    || (end === 'vowel' && base.endsWith('ة') && s.endsWith('a') && !s.endsWith('ta'));
  if (!pausal) return word;
  const kept = tail.replace(HARAKA, '');
  return base + (/[\u0651\u0652]/u.test(kept) ? kept : `${kept}\u0652`) + punct;
}

const FATHA = '\u064E';
const DAMMA = '\u064F';
const KASRA = '\u0650';
const SUKUN = '\u0652';

/** The hamza letter for a glottal stop at position `i` of `letters` ([{ ch, marks }]). */
function hamzaSeat(letters, i) {
  const own = letters[i].marks;
  if (i === 0) return own.includes(KASRA) ? 'إ' : 'أ';
  const prev = letters[i - 1];
  // ا, and ي / و without a mark of their own, are the long vowels ā / ī / ū.
  const long = !/[\u064E-\u0652]/u.test(prev.marks) && /[اوي]/.test(prev.ch);
  const last = i === letters.length - 1 || !/\p{L}/u.test(letters[i + 1].ch);
  if (last && (long || prev.marks.includes(SUKUN))) return 'ء'; // السُّوء, شَيْء
  if (long && prev.ch === 'ا') return own.includes(KASRA) ? 'ئ' : 'ء'; // قِرَاءَة
  const before = prev.marks.includes(KASRA) || (prev.ch === 'ي' && long) ? KASRA
    : prev.marks.includes(DAMMA) || (prev.ch === 'و' && long) ? DAMMA
      : prev.marks.includes(FATHA) ? FATHA : SUKUN;
  if (own.includes(KASRA) || before === KASRA) return 'ئ';
  if (own.includes(DAMMA) || before === DAMMA) return 'ؤ';
  if (own.includes(FATHA) || before === FATHA) return 'أ';
  return 'ء';
}

/**
 * An Egyptian word respelled for a voice that only speaks Standard Arabic:
 * ق said as a glottal stop (ʾawi) becomes a hamza (قَوِي → أَوِي, مَقْفُول →
 * مَأْفُول), and ذ said z or d (tazkara) becomes ز or د — only where the
 * transliteration shows that sound and not the Standard one.
 */
export function egyptianRespell(word, tlWord) {
  const tl = tlWord.toLowerCase();
  const letters = [];
  for (const ch of word) {
    if (MARK.test(ch) && letters.length) letters[letters.length - 1].marks += ch;
    else letters.push({ ch, marks: '' });
  }
  const qAsHamza = !tl.includes('q') && /[ʾ'’]/.test(tl);
  const dh = tl.includes('dh') ? null : tl.includes('z') && !tl.includes('d') ? 'ز' : tl.includes('d') && !tl.includes('z') ? 'د' : null;
  let skip = -1;
  return letters.map((l, i) => {
    if (i === skip) return '';
    if (l.ch === 'ق' && qAsHamza) {
      const seat = hamzaSeat(letters, i);
      // ʾā is written آ, not أَا (زَهْقَان → زَهْآن).
      const next = letters[i + 1];
      if (seat === 'أ' && l.marks === FATHA && next?.ch === 'ا' && !next.marks) { skip = i + 1; return 'آ'; }
      return seat + l.marks;
    }
    if (l.ch === 'ذ' && dh) return dh + l.marks;
    return l.ch + l.marks;
  }).join('');
}

/** Long ē/ō written as kasra/damma + ي/و: without the mark an Egyptian voice says them its own way (فِين fēn). */
const egyptianVowels = (word, tlWord) => {
  let w = word;
  if (/ē/.test(tlWord)) w = w.replace(/\u0650(?=ي)/gu, '');
  if (/ō/.test(tlWord)) w = w.replace(/\u064F(?=و)/gu, '');
  return w;
};

/**
 * What the voice reads for Arabic `tr` with transliteration `tl`:
 * { text, slow } where `slow` has a pause ("، ") between the words of the
 * transliteration (words joined with hyphens stay together).
 *   voice: 'msa' (default) — pausal forms; 'egyptian' — for an Egyptian
 *   voice; 'msa-for-egyptian' — Egyptian respelled for a Standard Arabic voice.
 */
export function spokenArabic(tr, tl, { voice = 'msa' } = {}) {
  const al = alignTranslit(tr, tl);
  const fix = (w, t) => {
    let out = pausalWord(w, t);
    if (voice === 'egyptian') out = egyptianVowels(out, t);
    if (voice === 'msa-for-egyptian') out = egyptianRespell(out, t);
    return out;
  };
  let tokens;
  let groups;
  const spaced = String(tl || '').trim().split(/\s+/);
  if (al) {
    tokens = [...al.tokens];
    for (const p of al.pairs) tokens[p.at] = fix(tokens[p.at], p.tl);
    // A particle or preposition goes with the next word (lā ʾafham, law samaḥt).
    groups = al.pairs.map((p) => p.word);
    for (let k = groups.length - 2; k >= 0; k--) {
      if (groups[k] !== groups[k + 1] && LEANS_ON_NEXT.has(asciiTranslit(spaced[groups[k]].toLowerCase()).replace(/[^a-z]/g, ''))) {
        const from = groups[k + 1];
        for (let j = k + 1; j < groups.length && groups[j] === from; j++) groups[j] = groups[k];
      }
    }
  } else {
    tokens = String(tr).split(/(\s+)/);
    // Without a word-by-word match, only the last word is sure to be before a pause.
    const ws = scriptWords(tr);
    const last = ws.at(-1);
    const tlLast = String(tl || '').trim().split(/\s+/).at(-1);
    if (last && tlLast && /\p{L}/u.test(tlLast)) tokens[last.i] = fix(tokens[last.i], tlLast.split(/[-‐]/).at(-1));
    groups = ws.map((_, k) => k);
  }
  const text = tokens.join('');
  return { text, slow: pausedArabic(tokens, groups) };
}

// Particles and prepositions that are said with the next word (in plain transliteration).
const LEANS_ON_NEXT = new Set(['la', 'lan', 'lam', 'ma', 'mish', 'mush', 'fi', 'min', 'ala', 'ila', 'an', 'inna', 'ya', 'qad', 'hal', 'wa', 'wi', 'law', 'bi', 'li', 'ka', 'ba']);

/** Script words joined with "، " between transliteration words, for slow playback (null for one word). */
function pausedArabic(tokens, groups) {
  const ws = tokens.map((t, i) => ({ t, i })).filter(({ t }) => HAS_LETTER.test(t));
  if (new Set(groups).size < 2) return null;
  const out = [];
  ws.forEach(({ t }, k) => {
    const word = t.replace(/[،,؛;:—–-]+$/u, '');
    const pause = k < ws.length - 1 && groups[k] !== groups[k + 1];
    out.push(pause ? `${word}،` : t);
  });
  return out.join(' ');
}
