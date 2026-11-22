// Numbers by ear: the voice says a number, the learner types its digits.
// Voices read digits in their own language, so no number-to-words tables are
// needed (and none could be wrong).

export const RANGES = [
  { id: '10', label: '0 – 10', min: 0, max: 10 },
  { id: '100', label: '11 – 100', min: 11, max: 100 },
  { id: '1000', label: '101 – 1,000', min: 101, max: 1000 },
  { id: '10000', label: '1,001 – 10,000', min: 1001, max: 10000 },
];
export const rangeOf = (id) => RANGES.find((r) => r.id === id) || null;

/** `count` different numbers from a range (fewer when the range is smaller). */
export function pickNumbers(range, count = 10, random = Math.random) {
  const size = range.max - range.min + 1;
  const out = new Set();
  while (out.size < Math.min(count, size)) out.add(range.min + Math.floor(random() * size));
  return [...out];
}

// Arabic-Indic, Persian and full-width digits → 0-9.
const DIGIT_SETS = ['٠١٢٣٤٥٦٧٨٩', '۰۱۲۳۴۵۶۷۸۹', '０１２３４５６７８９'];

/** The number typed, or null when it is not one: spaces, thousands separators and other digit scripts are fine. */
export function parseNumber(text) {
  let s = String(text ?? '').trim();
  for (const set of DIGIT_SETS) s = s.replace(new RegExp(`[${set}]`, 'g'), (ch) => String(set.indexOf(ch)));
  s = s.replace(/[\s.,'’٬،]/g, '');
  return /^\d{1,9}$/.test(s) ? Number(s) : null;
}
