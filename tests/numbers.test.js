// Numbers by ear: ranges, the numbers of a round and reading what was typed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RANGES, rangeOf, pickNumbers, parseNumber } from '../js/numbers.js';

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
