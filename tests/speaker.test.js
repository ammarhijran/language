// “I speak as a woman”: packs with a `feminine` map give first-person phrases
// in the form a woman says. This file changes the packs it loads, so it has
// its own process (node --test runs each file separately).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from './all-languages.js';
import { checkTyped, scoreWord } from '../js/compare.js';

const { uk, ar, tr, ja } = languages;
const before = {};
for (const lang of [uk, ar]) before[lang.code] = Object.fromEntries(Object.keys(lang.feminine).map((id) => [id, structuredClone({ tr: lang.byId(id)?.tr, pair: lang.byId(id)?.pair?.tr })]));

test('the feminine maps point at real entries and are well formed', () => {
  assert.equal(tr.feminine, undefined);
  assert.equal(ja.feminine, undefined);
  for (const lang of [uk, ar]) {
    const ids = Object.keys(lang.feminine);
    assert.ok(ids.length >= 20, `${lang.code}: ${ids.length} entries`);
    for (const [id, f] of Object.entries(lang.feminine)) {
      const w = lang.byId(id);
      assert.ok(w, `${lang.code}: ${id} exists`);
      assert.ok(f.tr || f.pair, `${id}: changes something`);
      if (f.pair) assert.ok(w.pair, `${id}: has an other-register form to change`);
      for (const [o, base] of [[f, w], [f.pair, w.pair]]) {
        if (!o?.tr) continue;
        assert.notEqual(o.tr, base.tr, `${id}: differs from the masculine form`);
        if (lang.code === 'uk') {
          assert.equal(o.s.length, o.tr.trim().split(/\s+/).length, `${id}: one stress per word in “${o.tr}”`);
          assert.equal(/[.!?]$/.test(o.tr), /[.!?]$/.test(base.tr), `${id}: same punctuation`);
        }
        if (lang.code === 'ar') {
          assert.ok(o.tl && /^[a-zʾʿḥṣḍṭẓāīūēō\-, ?]+$/.test(o.tl), `${id}: transliteration ${o.tl}`);
          assert.match(o.tr, /[ً-ْ]/, `${id}: vowel marks`);
        }
      }
    }
  }
});

test('speaking as a woman: the feminine form is shown, both forms are right, ids stay', () => {
  assert.equal(uk.speaker, 'm');
  assert.equal(uk.speakAs('f'), 'f');
  assert.equal(ar.speakAs('f'), 'f');
  assert.equal(uk.speakAs('f'), 'f', 'applying it twice changes nothing more');
  assert.equal(tr.speakAs('f'), 'm', 'a pack without feminine forms stays as it is');

  for (const lang of [uk, ar]) {
    for (const [id, f] of Object.entries(lang.feminine)) {
      const w = lang.byId(id);
      assert.equal(w.id, id);
      const was = before[lang.code][id];
      for (const [entry, o, old] of [[w, f, was.tr], [w.pair, f.pair, was.pair]]) {
        if (!o?.tr) continue;
        assert.equal(entry.tr, o.tr, `${id}: now the feminine form`);
        assert.ok(entry.alt.includes(old), `${id}: the masculine form is still accepted`);
        assert.equal(entry.alt.filter((a) => a === entry.tr).length, 0, `${id}: not its own alternative`);
      }
      if (f.tr) {
        assert.equal(checkTyped(lang, w, f.tr).verdict, 'good', `${id}: typed as a woman says it`);
        assert.equal(checkTyped(lang, w, was.tr).verdict, 'good', `${id}: typed as a man says it`);
        assert.equal(scoreWord(lang, w, [{ transcript: f.tr, confidence: 0.9 }]).score, 1, `${id}: spoken`);
        assert.equal(scoreWord(lang, w, [{ transcript: was.tr, confidence: 0.9 }]).score, 1, `${id}: spoken the other way`);
        assert.ok(lang.matches(w, f.tr.replace(/[.!?؟]/g, '')), `${id}: found by search`);
      }
      // the pronunciation breakdown and the voice use the new form
      assert.doesNotThrow(() => lang.analyze(w), id);
      assert.ok(lang.speech(w).text.length > 0);
      if (lang.code === 'ar' && f.tl) assert.equal(lang.reading(w), f.tl, `${id}: reading`);
      if (lang.code === 'uk' && f.tr) {
        const a = lang.analyze(w);
        assert.equal(a.words.length, f.tr.trim().split(/\s+/).length, `${id}: analysed word by word`);
      }
    }
  }
  assert.equal(uk.byId('я-згоден').tr, 'Я згодна.');
  assert.equal(ar.byId('اسف').tr, 'آسِفَة');
  assert.match(ar.byId('اسف').en, /said by a woman/);
});
