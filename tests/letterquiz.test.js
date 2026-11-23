// Letter quiz: which letters can be asked, and what a round looks like.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { letterSets, letterQuestions } from '../js/letterquiz.js';
import { languages } from './all-languages.js';

const { tr, uk, ja, ar } = languages;

test('the scripts that are new have a letter quiz; Turkish has none', () => {
  assert.deepEqual(letterSets(tr), []);
  assert.deepEqual(letterSets(null), []);
  assert.deepEqual(letterSets(ja).map((s) => s.id), ['hiragana', 'katakana']);
  assert.deepEqual(letterSets(ar).map((s) => s.id), ['letters']);
  assert.deepEqual(letterSets(uk).map((s) => s.id), ['letters']);
  for (const lang of [uk, ja, ar]) {
    for (const set of letterSets(lang)) {
      assert.ok(/^[a-z]+$/.test(set.id) && set.name);
      assert.ok(set.items.length >= 20, `${lang.code} ${set.id}: ${set.items.length}`);
      const glyphs = set.items.map((x) => x.glyph);
      assert.equal(new Set(glyphs).size, glyphs.length, 'no glyph twice');
      for (const x of set.items) {
        assert.ok(x.label && x.glyph && x.label !== x.glyph, `${lang.code}: ${x.glyph}`);
        assert.ok(lang.alphabet.includes(x.letter));
        assert.ok(/^[\x20-\x7Eāīūēōḥṣḍṭẓʾʿ—“”]+$/.test(x.label), `a reading in Latin letters: ${x.label}`);
      }
    }
  }
});

test('Japanese: every kana by its rōmaji, in both scripts; っ and ー are not asked', () => {
  const [hira, kata] = letterSets(ja);
  const label = (set, glyph) => set.items.find((x) => x.glyph === glyph)?.label;
  assert.equal(hira.items.length, 46);
  assert.equal(kata.items.length, 46);
  for (const [h, k, rom] of [['あ', 'ア', 'a'], ['し', 'シ', 'shi'], ['ち', 'チ', 'chi'], ['つ', 'ツ', 'tsu'], ['ふ', 'フ', 'fu'], ['ん', 'ン', 'n'], ['を', 'ヲ', 'o (wo)'], ['ろ', 'ロ', 'ro']]) {
    assert.equal(label(hira, h), rom);
    assert.equal(label(kata, k), rom);
  }
  for (const set of [hira, kata]) assert.ok(!set.items.some((x) => /[っッー]/.test(x.glyph)));
  const labels = hira.items.map((x) => x.label);
  assert.equal(new Set(labels).size, labels.length, 'no two kana share a reading');
});

test('Ukrainian and Arabic: every letter has a reading of its own', () => {
  const [u] = letterSets(uk);
  assert.equal(u.items.length, 33);
  const of = (glyph) => u.items.find((x) => x.glyph === glyph)?.label;
  assert.equal(of('Г г'), 'h');
  assert.equal(of('Ґ ґ'), 'g');
  assert.equal(of('Х х'), 'kh');
  assert.equal(of('Щ щ'), 'shch');
  assert.equal(of('Ь ь'), 'soft sign');
  assert.notEqual(of('И и'), of('Й й'));
  const [a] = letterSets(ar);
  assert.equal(a.items.length, ar.alphabet.length);
  assert.equal(a.items.find((x) => x.glyph === 'ب').label, 'bāʾ');
  for (const set of [u, a]) {
    const labels = set.items.map((x) => x.label);
    assert.equal(new Set(labels).size, labels.length);
  }
});

test('a round: different letters, four distinct options with the right one among them', () => {
  for (const lang of [uk, ja, ar]) {
    for (const set of letterSets(lang)) {
      for (let run = 0; run < 20; run++) {
        const qs = letterQuestions(set, 10);
        assert.equal(qs.length, 10);
        assert.equal(new Set(qs.map((q) => q.item)).size, 10, 'no letter twice in a round');
        for (const q of qs) {
          assert.ok(['read', 'find'].includes(q.dir));
          assert.equal(q.options.length, 4);
          assert.equal(q.options.filter((o) => o === q.item).length, 1);
          assert.equal(new Set(q.options.map((o) => o.label)).size, 4, 'no reading twice');
          assert.equal(new Set(q.options.map((o) => o.glyph)).size, 4, 'no glyph twice');
          assert.ok(q.options.every((o) => set.items.includes(o)));
        }
      }
    }
  }
  // both directions come up, and wrong answers are close to the right one where they can be
  const [hira] = letterSets(ja);
  const many = Array.from({ length: 30 }, () => letterQuestions(hira, 10)).flat();
  assert.ok(many.some((q) => q.dir === 'read') && many.some((q) => q.dir === 'find'));
  const ka = many.filter((q) => q.item.label === 'ka');
  assert.ok(ka.length > 0);
  assert.ok(ka.every((q) => q.options.filter((o) => o !== q.item && (o.label[0] === 'k' || o.label.endsWith('a'))).length >= 2), 'two of か’s wrong answers share its row or its vowel');
  // a fixed random source gives a fixed round
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const a = letterQuestions(hira, 5, rnd).map((q) => q.item.glyph + q.dir);
  seed = 7;
  assert.deepEqual(letterQuestions(hira, 5, rnd).map((q) => q.item.glyph + q.dir), a);
});
