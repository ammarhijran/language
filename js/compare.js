// String comparison used to score typed answers and spoken attempts.

export function levenshtein(a, b) {
  const s = [...a];
  const t = [...b];
  let prev = Array.from({ length: t.length + 1 }, (_, j) => j);
  for (let i = 1; i <= s.length; i++) {
    const cur = [i];
    for (let j = 1; j <= t.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (s[i - 1] === t[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[t.length];
}

export function similarity(a, b) {
  const len = Math.max([...a].length, [...b].length);
  return len === 0 ? 1 : 1 - levenshtein(a, b) / len;
}

/**
 * Align `heard` against `target` and report, for every character of the
 * target, whether it was matched. Used to highlight the letters to work on.
 */
export function alignDiff(target, heard) {
  const s = [...target];
  const t = [...heard];
  const m = s.length;
  const n = t.length;
  const d = Array.from({ length: m + 1 }, (_, i) => {
    const row = new Array(n + 1).fill(0);
    row[0] = i;
    return row;
  });
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (s[i - 1] === t[j - 1] ? 0 : 1));
    }
  }
  const out = new Array(m);
  let i = m;
  let j = n;
  while (i > 0) {
    if (j > 0 && s[i - 1] === t[j - 1] && d[i][j] === d[i - 1][j - 1]) {
      out[i - 1] = { ch: s[i - 1], ok: true };
      i--; j--;
    } else if (j > 0 && d[i][j] === d[i - 1][j - 1] + 1) {
      out[i - 1] = { ch: s[i - 1], ok: s[i - 1] === ' ' };
      i--; j--;
    } else if (d[i][j] === d[i - 1][j] + 1) {
      out[i - 1] = { ch: s[i - 1], ok: s[i - 1] === ' ' };
      i--;
    } else {
      j--;
    }
  }
  return out;
}

/**
 * Score speech-recognition alternatives against the target text.
 * Lower-ranked alternatives are slightly penalised so a mumbled attempt
 * doesn't get full marks just because the right word was the 5th guess.
 */
export function scoreSpoken(target, alternatives, { normalize, normalizeSpoken }) {
  const t = normalize(target);
  let best = null;
  alternatives.forEach((alt, rank) => {
    const heard = normalizeSpoken(alt.transcript || '');
    if (!heard) return;
    const score = letterScore(t, heard) * rankWeight(rank);
    // The first transcript is kept even at 0, so the learner sees what was heard.
    if (!best || score > best.score) best = { score, heard, raw: alt.transcript.trim() };
  });
  best ||= { score: 0, heard: '', raw: '' };
  return { ...best, target: t, diff: alignDiff(t, best.heard) };
}

const compact = (s) => s.replace(/\s+/g, '');
// A recogniser's 2nd–5th guesses count a little less: a mumble shouldn't get
// full marks because the right word was its 5th guess.
const rankWeight = (rank) => 1 - Math.min(rank, 4) * 0.04;

/** Letter similarity of a normalised target and transcript; the target said as a whole word inside a longer transcript counts fully. */
function letterScore(t, heard) {
  if (` ${heard} `.includes(` ${t} `)) return 1;
  return similarity(compact(t), compact(heard));
}

// ---------- Words, not just letters ----------

// Notes in brackets that only say how or where a word is used: the meaning is the same.
const REGISTER_NOTE = /\((?:[^)]*\b(?:spoken|casual|informal|formal|polite|slang|colloquial|egyptian|msa|standard|humble|written|short|plural|feminine|masculine|to a (?:wo)?man|to (?:a group|several people))\b[^)]*)\)/gi;

/**
 * The core meanings in an English gloss: lowercased, split on ; , / and “or”,
 * without a leading to/a/an/the or final punctuation, and without notes in
 * brackets ("sorry; excuse me (spoken)" → sorry · excuse me). With
 * `keepNotes`, a bracket that changes the meaning stays part of it: "aunt
 * (father's sister)" and "aunt (mother's sister)" are then different.
 */
export function glosses(en, { keepNotes = false } = {}) {
  let s = String(en || '').toLowerCase().replace(/[’‘]/g, "'");
  s = keepNotes ? s.replace(REGISTER_NOTE, ' ') : s.replace(/\([^)]*\)|\[[^\]]*\]/g, ' ');
  // “cool! great!” is two meanings, like “cool; great” (a note in brackets stays with the last).
  return [...new Set(s.split(/[;,/]|\bor\b|!(?=\s+[^\s(])/)
    .map((g) => g.replace(/[.!?…"“”¿¡]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/^(?:to|a|an|the) /, ''))
    .filter(Boolean))];
}

// As a choice, “I'm sorry” is the same answer as “sorry”.
const withoutI = (g) => g.replace(/^(?:i'm|i am) /, '');

/** Two glosses share a meaning ("OK, done" · "OK; sure"): such words can't both be offered as choices. */
export function overlaps(a, b) {
  const other = new Set(glosses(b).map(withoutI));
  return glosses(a).some((g) => other.has(withoutI(g)));
}

/** Two glosses mean the same: each one's first meaning is among the other's ("now" · "now; right now"). */
export function sameMeaning(a, b) {
  const ga = glosses(a, { keepNotes: true });
  const gb = glosses(b, { keepNotes: true });
  return ga.length > 0 && gb.length > 0 && gb.includes(ga[0]) && ga.includes(gb[0]);
}

// A transcript that is a different word scores at most this ("not quite").
export const OTHER_WORD_CAP = 0.5;
// A transcript this close to another entry, and closer than to the target, is taken to be that entry.
const NEAR_OTHER = 0.75;

/**
 * Score a spoken attempt at `word` (alternatives from the recogniser). The
 * score is letter similarity, so a mispronounced word still gets partial
 * credit, but it is word-aware: recognisers write real words, and a transcript
 * that is another entry of the course (там for так, سبعة for أربعة), is closer
 * to one than to the target, or adds or drops a negative (anlıyorum for
 * anlamıyorum) is not the word, however few letters differ. It scores at
 * most OTHER_WORD_CAP. The same sound written another way (Japanese 花 for 鼻,
 * 多分 for たぶん) counts.
 *
 * → { score, heard, raw, written, match, other?, pair? }
 *   written  the form of the target the transcript was compared with
 *   match    'exact' | 'letters' | 'sound' (same sound, other writing) |
 *            'other' (another entry: `other`, `pair` when it is an entry's other-register form;
 *            no `other` for a word outside the course) |
 *            'negation' | 'none' (nothing heard)
 */
export function scoreWord(lang, word, alternatives = []) {
  const targets = [...new Set(lang.spokenTargets(word).filter(Boolean))];
  let best = null;
  (alternatives || []).forEach((alt, rank) => {
    const raw = String(alt?.transcript || '').trim();
    const heard = lang.normalizeSpoken(raw);
    if (!heard) return;
    const r = judgeSpoken(lang, word, targets, heard, raw);
    const score = r.score * rankWeight(rank);
    if (!best || score > best.score) best = { ...r, score, heard, raw };
  });
  return best || { score: 0, heard: '', raw: '', written: targets[0] ?? word.tr, match: 'none' };
}

function judgeSpoken(lang, word, targets, heard, raw) {
  const said = compact(heard);
  let best = { score: -1, written: targets[0] };
  for (const t of targets) {
    const nt = lang.normalize(t);
    if (compact(nt) === said) return { score: 1, written: t, match: 'exact' };
    const s = letterScore(nt, heard);
    if (s > best.score) best = { score: s, written: t };
  }
  best.match = 'letters';
  // The transcript is another entry, or another entry's other-register form.
  const hit = headwordsFirst(lang.entriesWritten?.(said, { normalized: true }) || []).find((e) => e.word.id !== word.id || e.pair);
  if (hit) {
    if (lang.sameSound?.(hit.pair ? hit.word.pair : hit.word, word)) return { score: 0.95, written: word.tr, match: 'sound', other: hit.word, pair: hit.pair };
    return { ...best, score: Math.min(best.score, OTHER_WORD_CAP), match: 'other', other: hit.word, pair: hit.pair };
  }
  // The same sound written another way (Japanese kanji for a kana word, homophones).
  const sound = lang.soundsLike?.(heard, word);
  if (sound && sound.score > best.score) return { score: sound.score, written: word.tr, match: 'sound', ...sound };
  // A negative that the target doesn't have, or the other way round.
  if (lang.negative && lang.negative(word.tr) !== lang.negative(raw)) {
    return { ...best, score: Math.min(best.score, OTHER_WORD_CAP), match: 'negation' };
  }
  if (best.score < 1) {
    const near = nearestOther(lang, word, said, best.score);
    if (near) return { ...best, score: Math.min(best.score, OTHER_WORD_CAP), match: 'other', other: near.word, pair: near.pair };
    // A part the word never has (Japanese: a kanji it doesn't write, お客さん for
    // お母さん) is another word, however many letters around it match.
    if (lang.foreignWord?.(heard, word)) return { ...best, score: Math.min(best.score, OTHER_WORD_CAP), match: 'other' };
  }
  return best;
}

/**
 * Lexicon hits with the entries whose own headword (or other-register form)
 * this is first: “hala” is the word hala “aunt” before it is hâlâ written plain.
 */
function headwordsFirst(hits) {
  const own = (e) => (e.form === (e.pair ? e.word.pair.tr : e.word.tr) ? 0 : 1);
  return [...hits].sort((a, b) => own(a) - own(b));
}

/** The entry (not `word`) whose written form is closest to `said`, when that is nearer than the target (score `than`). */
function nearestOther(lang, word, said, than) {
  const entries = lang.lexicon?.();
  if (!entries) return null;
  const floor = Math.max(than, NEAR_OTHER - 1e-9);
  const n = [...said].length;
  let best = null;
  let bestScore = floor;
  for (const [key, list] of entries) {
    const len = [...key].length;
    // Too long or short to beat `floor`: skip without computing the distance.
    if (Math.abs(len - n) > (1 - floor) * Math.max(len, n)) continue;
    const s = similarity(key, said);
    if (s <= bestScore) continue;
    const e = list.find((x) => x.word.id !== word.id && !lang.sameSound?.(x.word, word));
    if (e) { best = e; bestScore = s; }
  }
  return best;
}

/**
 * Grade a typed answer to `word`. Accepted forms (the word, its other
 * spellings and romanisations) are tried first; then the whole course, so a
 * different word is never “almost” right because few letters differ (su for
 * şu, いえ for いいえ, مطار for مطر). Then the lenient checks, from closest:
 * spacing, romanisation conventions (marhaba, privit), special letters.
 *
 * → { verdict: 'good' | 'almost' | 'wrong', kind, form?, other?, pair?, slip? }
 *   kind  'exact' · 'also' (another word, or the other-register form, with the same meaning) ·
 *         'spelling' (a usual romanisation: `form` is how the course writes it) ·
 *         'spaces' · 'letters' (only special letters, long vowels… off) · 'loose' (a looser
 *         romanisation) · 'other' (a different word: `other`) · 'none'
 *   form  the accepted form the answer matched or came closest to
 *   slip  an “almost” that is a typing slip (spaces, special letters): it doesn't lower ease
 */
export function checkTyped(lang, word, input) {
  const accepted = [...new Set(lang.acceptedAnswers(word).filter(Boolean))];
  const inputs = [...new Set([input, ...(lang.typedVariants?.(input) || [])])];
  const levels = lang.strictNormalize ? [lang.strictNormalize, lang.normalize] : [lang.normalize];
  for (const norm of levels) {
    const strict = norm !== lang.normalize;
    for (const v of inputs) {
      const n = norm(v);
      const form = n && accepted.find((a) => norm(a) === n);
      if (form) return { verdict: 'good', kind: 'exact', form };
    }
    // The word itself with its spaces wrong is a spacing slip (below), not another entry.
    const own = new Set(accepted.map((a) => compact(norm(a))));
    for (const v of inputs) {
      const key = compact(norm(v));
      const other = !own.has(key) && otherEntry(lang, word, key, strict);
      if (other) return other;
    }
  }
  const nearest = (fold) => {
    const keys = inputs.map(fold).filter(Boolean);
    const forms = accepted.filter((a) => keys.includes(fold(a)));
    // Kana and rōmaji can both be close: mark against the one nearest to what was typed.
    const n = lang.normalize(input);
    return forms.sort((a, b) => similarity(lang.normalize(b), n) - similarity(lang.normalize(a), n))[0];
  };
  let form = nearest((s) => compact(lang.normalize(s)));
  if (form) return { verdict: 'almost', kind: 'spaces', form, slip: true };
  if (lang.romanKey && (form = nearest(lang.romanKey))) return { verdict: 'good', kind: 'spelling', form };
  if ((form = nearest(lang.stripDiacritics))) return { verdict: 'almost', kind: 'letters', form, slip: true };
  if (lang.looseKey && (form = nearest(lang.looseKey))) return { verdict: 'almost', kind: 'loose', form };
  return { verdict: 'wrong', kind: 'none' };
}

/** `key` is how the course writes another entry (or another entry's other-register form, or this one's). */
function otherEntry(lang, word, key, strict) {
  const hits = headwordsFirst(lang.entriesWritten?.(key, { strict, normalized: true }) || []).filter((e) => e.word.id !== word.id || e.pair);
  if (!hits.length) return null;
  // The same meaning (the Egyptian word for an MSA prompt, the polite form): also right.
  const meaning = (e) => (e.pair ? e.word.pair.en || e.word.en : e.word.en);
  const same = hits.find((e) => (e.word.id === word.id && e.pair) || sameMeaning(meaning(e), word.en));
  if (same) return { verdict: 'good', kind: 'also', other: same.word, pair: same.pair, form: same.form };
  return { verdict: 'wrong', kind: 'other', other: hits[0].word, pair: hits[0].pair, form: hits[0].form };
}
