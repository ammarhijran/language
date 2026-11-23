// Numbers by ear: ranges, the numbers of a round and reading what was typed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RANGES, SPECIAL, rangeOf, pickNumbers, parseNumber, parseDigits, groupDigits } from '../js/numbers.js';

test('ranges follow one another without gaps', () => {
  assert.equal(RANGES[0].min, 0);
  for (let i = 1; i < RANGES.length; i++) assert.equal(RANGES[i].min, RANGES[i - 1].max + 1);
  assert.equal(rangeOf('100'), RANGES[1]);
  assert.equal(rangeOf('nope'), null);
  assert.equal(rangeOf(undefined), null);
});

test('a round has different numbers from its range', () => {
  for (const r of RANGES) {
    const list = pickNumbers(r, 10);
    assert.equal(list.length, 10);
    assert.equal(new Set(list).size, 10);
    assert.ok(list.every((n) => Number.isInteger(n) && n >= r.min && n <= r.max), r.label);
  }
  // a tiny range gives what it has; the edges can come up
  assert.deepEqual(pickNumbers({ min: 3, max: 5 }, 10).sort(), [3, 4, 5]);
  assert.deepEqual(pickNumbers({ min: 0, max: 10 }, 1, () => 0), [0]);
  assert.deepEqual(pickNumbers({ min: 0, max: 10 }, 1, () => 0.9999), [10]);
});

test('years and phone numbers: their own rounds', () => {
  assert.deepEqual(SPECIAL.map((r) => r.id), ['years', 'phone']);
  const ids = [...RANGES, ...SPECIAL].map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length, 'no two rounds share an id');
  for (const r of SPECIAL) assert.equal(rangeOf(r.id), r);
  const years = pickNumbers(rangeOf('years'), 10);
  assert.equal(new Set(years).size, 10);
  assert.ok(years.every((y) => Number.isInteger(y) && y >= 1950 && y <= 2030));
  // phone numbers are strings of digits: a leading 0 has to survive
  const phone = rangeOf('phone');
  const list = pickNumbers(phone, 10);
  assert.equal(list.length, 10);
  assert.equal(new Set(list).size, 10);
  assert.ok(list.every((n) => typeof n === 'string' && new RegExp(`^\\d{${phone.digits}}$`).test(n)), list.join(' '));
  assert.deepEqual(pickNumbers(phone, 3, () => 0), ['0'.repeat(phone.digits)], 'a stuck random source ends the loop');
});

test('typed phone numbers: digits as a string, however they are grouped', () => {
  assert.equal(parseDigits('0470291'), '0470291');
  assert.equal(parseDigits(' 047 02-91 '), '0470291');
  assert.equal(parseDigits('(047) 02.91'), '0470291');
  assert.equal(parseDigits('٠٤٧'), '047');
  assert.equal(parseDigits('０４７'), '047');
  for (const bad of ['', '   ', 'four seven', '47a', '1234567890123456', null, undefined]) assert.equal(parseDigits(bad), null, String(bad));
  assert.equal(groupDigits('4702915'), '470 29 15');
  assert.equal(groupDigits('047029'), '04 70 29');
  assert.equal(groupDigits('4702'), '4702');
  for (const n of pickNumbers(rangeOf('phone'), 5)) assert.equal(groupDigits(n).replace(/ /g, ''), n);
});

test('typed numbers: separators and other digit scripts are understood, words are not', () => {
  assert.equal(parseNumber('47'), 47);
  assert.equal(parseNumber(' 1 000 '), 1000);
  assert.equal(parseNumber('1,000'), 1000);
  assert.equal(parseNumber('1.000'), 1000);
  assert.equal(parseNumber('٤٧'), 47);
  assert.equal(parseNumber('۴۷'), 47);
  assert.equal(parseNumber('４７'), 47);
  assert.equal(parseNumber('0'), 0);
  for (const bad of ['', '  ', 'kırk yedi', '4a7', '-5', '12345678901', null, undefined]) assert.equal(parseNumber(bad), null, String(bad));
});

test('every language knows its number words as numbers (a recogniser may answer “3” for üç)', async () => {
  const { languages } = await import('./all-languages.js');
  const { scoreWord } = await import('../js/compare.js');
  const EN = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  for (const lang of Object.values(languages)) {
    for (const [n, en] of EN.entries()) {
      const w = lang.wordsIn('numbers').find((x) => x.en === en || x.en.startsWith(`${en};`) || x.en.startsWith(`${en} `));
      assert.ok(w, `${lang.code}: has “${en}”`);
      assert.equal(w.n, n, `${lang.code}: ${w.tr} is ${n}`);
      assert.equal(scoreWord(lang, w, [{ transcript: String(n), confidence: 0.9 }]).score, 1, `${lang.code}: “${n}” heard for ${w.tr}`);
    }
  }
});
