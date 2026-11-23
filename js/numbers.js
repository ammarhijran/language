// Numbers by ear: the voice says a number, the learner types its digits.
// Voices read digits in their own language, so no number-to-words tables are
// needed (and none could be wrong).

export const RANGES = [
  { id: '10', label: '0 – 10', min: 0, max: 10 },
  { id: '100', label: '11 – 100', min: 11, max: 100 },
  { id: '1000', label: '101 – 1,000', min: 101, max: 1000 },
  { id: '10000', label: '1,001 – 10,000', min: 1001, max: 10000 },
];
// Rounds about what numbers are used for. A year is said as one number; a
// phone number is said digit by digit (`digits`: how many) and answered as a
// string of digits, where a leading 0 counts.
export const SPECIAL = [
  { id: 'years', label: 'Years', sub: '1950 – 2030', min: 1950, max: 2030 },
  { id: 'phone', label: 'Phone numbers', sub: 'digit by digit', digits: 7 },
];
export const rangeOf = (id) => [...RANGES, ...SPECIAL].find((r) => r.id === id) || null;

/**
 * `count` different numbers from a range (fewer when the range is smaller);
 * for a digit-by-digit range, `count` different strings of `digits` digits.
 */
export function pickNumbers(range, count = 10, random = Math.random) {
  if (range.digits) {
    const strings = new Set();
    // (the guard ends the loop if `random` is a constant, as in tests)
    for (let tries = 0; strings.size < count && tries < count * 20; tries++) {
      strings.add(Array.from({ length: range.digits }, () => Math.floor(random() * 10)).join(''));
    }
    return [...strings];
  }
  const size = range.max - range.min + 1;
  const out = new Set();
  while (out.size < Math.min(count, size)) out.add(range.min + Math.floor(random() * size));
  return [...out];
}

// Arabic-Indic, Persian and full-width digits → 0-9.
const DIGIT_SETS = ['٠١٢٣٤٥٦٧٨٩', '۰۱۲۳۴۵۶۷۸۹', '０１２３４５６７８９'];

const westernDigits = (text) => {
  let s = String(text ?? '').trim();
  for (const set of DIGIT_SETS) s = s.replace(new RegExp(`[${set}]`, 'g'), (ch) => String(set.indexOf(ch)));
  return s;
};

/** The number typed, or null when it is not one: spaces, thousands separators and other digit scripts are fine. */
export function parseNumber(text) {
  const s = westernDigits(text).replace(/[\s.,'’٬،]/g, '');
  return /^\d{1,9}$/.test(s) ? Number(s) : null;
}

/** The digits typed for a phone number, as a string (a leading 0 stays), or null: spaces, hyphens, dots and brackets are fine. */
export function parseDigits(text) {
  const s = westernDigits(text).replace(/[\s.\-–()+/]/g, '');
  return /^\d{1,15}$/.test(s) ? s : null;
}

/** A digit string in groups for reading: 4702915 → "470 29 15" (threes, then twos at the end, as phone numbers are written). */
export function groupDigits(digits) {
  const s = String(digits);
  if (s.length <= 4) return s;
  const head = s.length % 2 ? 3 : 2;
  return [s.slice(0, head), ...(s.slice(head).match(/\d{2}/g) || [])].join(' ');
}
