import { test } from 'node:test';
import assert from 'node:assert/strict';
import { levenshtein, similarity, alignDiff, scoreSpoken } from '../js/compare.js';
import tr, { normalize, stripDiacritics, numberToWords, normalizeSpoken } from '../js/languages/tr/index.js';

test('levenshtein and similarity', () => {
  assert.equal(levenshtein('kitten', 'sitting'), 3);
  assert.equal(levenshtein('', 'abc'), 3);
  assert.equal(similarity('merhaba', 'merhaba'), 1);
  assert.ok(similarity('kır', 'kir') < 1);
});

test('alignDiff marks mismatched target letters', () => {
  const d = alignDiff('kız', 'kiz');
  assert.deepEqual(d.map((x) => x.ok), [true, false, true]);
  const missing = alignDiff('elli', 'eli');
  assert.equal(missing.filter((x) => !x.ok).length, 1);
});

test('Turkish normalisation', () => {
  assert.equal(normalize('  İyi Akşamlar! '), 'iyi akşamlar');
  assert.equal(normalize('ILIK'), 'ılık');
  assert.equal(normalize("Türkiye'de"), 'türkiyede');
  assert.equal(stripDiacritics('Teşekkür ederim'), 'tesekkur ederim');
});

test('numbers to words', () => {
  assert.equal(numberToWords(0), 'sıfır');
  assert.equal(numberToWords(2), 'iki');
  assert.equal(numberToWords(25), 'yirmi beş');
  assert.equal(numberToWords(100), 'yüz');
  assert.equal(numberToWords(1000), 'bin');
  assert.equal(numberToWords(2026), 'iki bin yirmi altı');
  assert.equal(numberToWords(1000000), 'bir milyon');
  assert.equal(normalizeSpoken('20'), 'yirmi');
  assert.equal(normalizeSpoken('1.000'), 'bin');
});

test('scoreSpoken', () => {
  const perfect = scoreSpoken('merhaba', [{ transcript: 'Merhaba' }], tr);
  assert.equal(perfect.score, 1);
  const digits = scoreSpoken('yirmi', [{ transcript: '20' }], tr);
  assert.equal(digits.score, 1);
  const close = scoreSpoken('teşekkürler', [{ transcript: 'teşekkür' }], tr);
  assert.ok(close.score > 0.6 && close.score < 1);
  const embedded = scoreSpoken('çay', [{ transcript: 'bir çay' }], tr);
  assert.equal(embedded.score, 1);
  const alt = scoreSpoken('kız', [{ transcript: 'kiz' }, { transcript: 'kız' }], tr);
  assert.ok(alt.score > 0.9 && alt.score < 1, 'later alternatives are slightly penalised');
  const none = scoreSpoken('kız', [], tr);
  assert.equal(none.score, 0);
});
