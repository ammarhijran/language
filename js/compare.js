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
  const compact = t.replace(/\s+/g, '');
  let best = { score: 0, heard: '', raw: '' };
  alternatives.forEach((alt, rank) => {
    const heard = normalizeSpoken(alt.transcript || '');
    if (!heard) return;
    let score = similarity(compact, heard.replace(/\s+/g, ''));
    if (` ${heard} `.includes(` ${t} `)) score = 1;
    score *= 1 - Math.min(rank, 4) * 0.04;
    if (score > best.score) best = { score, heard, raw: alt.transcript.trim() };
  });
  return { ...best, target: t, diff: alignDiff(t, best.heard) };
}
