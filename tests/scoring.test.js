// Accuracy across whole packs: every valid form of every entry scores as the
// right answer, no other entry passes for it, multiple-choice options never
// hold two right answers, and the generated Japanese homophone list matches
// the course. (Single cases are in compare.test.js.)
//
// js/languages/ja/homophones.js COURSE is generated from the pack: when the
// vocabulary changes, run `UPDATE_HOMOPHONES=1 node --test tests/scoring.test.js`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { scoreWord, checkTyped, similarity, overlaps } from '../js/compare.js';
import { pickOptions, speakRating } from '../js/exercises.js';
import { AGAIN } from '../js/srs.js';
import { sameScriptAlts } from '../js/languages/common.js';
import tr from '../js/languages/tr/index.js';
import uk from '../js/languages/uk/index.js';
import ja from '../js/languages/ja/index.js';
import ar from '../js/languages/ar/index.js';
import { SPELLINGS, COURSE } from '../js/languages/ja/homophones.js';

const PACKS = [tr, uk, ja, ar];
const said = (L, w, text) => scoreWord(L, w, [{ transcript: text }]);

test('every entry, and every alt spelling a recogniser could write, scores 100 % spoken', () => {
  for (const L of PACKS) {
    for (const w of L.words) {
      assert.equal(said(L, w, w.tr).score, 1, `${L.code} ${w.tr}`);
      for (const a of sameScriptAlts(w)) assert.equal(said(L, w, a).score, 1, `${L.code} ${w.tr} ← alt ${a}`);
      if (L.code === 'ja') assert.equal(said(L, w, w.kana.replace(/\s+/g, '')).score, 1, `ja ${w.tr} ← its kana`);
    }
  }
});

test('every entry typed as written, or in the course’s transliteration, is right', () => {
  for (const L of PACKS) {
    for (const w of L.words) {
      for (const a of L.acceptedAnswers(w)) assert.equal(checkTyped(L, w, a).verdict, 'good', `${L.code} ${w.tr} ← ${a}`);
    }
  }
});

test('no other single word of the course passes for a word when spoken or typed', () => {
  for (const L of PACKS) {
    const single = L.words.filter((w) => !/\s/.test(w.tr.trim()) && w.tr.length <= 12)
      .map((w) => ({ w, key: L.normalize(w.tr).replace(/\s+/g, '') }));
    for (const { w, key } of single) {
      // The neighbours the audit found: other words that share most letters.
      for (const { w: o, key: ok } of single) {
        if (o.id === w.id || Math.abs(ok.length - key.length) > 0.45 * Math.max(ok.length, key.length) || similarity(key, ok) < 0.55) continue;
        if (L.spokenTargets(w).some((t) => L.normalize(t) === L.normalize(o.tr))) continue; // one is the other's spelling
        if (L.sameSound?.(o, w)) continue; // homophones (鼻 · 花) can't be told apart by ear
        const r = said(L, w, o.tr);
        assert.equal(speakRating(r.score), AGAIN, `${L.code} ${w.tr} ← ${o.tr}: ${r.score} (${r.match})`);
        assert.notEqual(checkTyped(L, w, o.tr).verdict === 'almost', true, `${L.code} ${w.tr} typed ${o.tr}`);
      }
    }
  }
});

test('multiple choice never offers a second right answer', () => {
  for (const L of PACKS) {
    for (const w of L.words) {
      for (const label of [(x) => x.en, (x) => x.tr]) {
        for (let i = 0; i < 3; i++) {
          const opts = pickOptions(L, w, label);
          assert.equal(opts.filter((o) => o.id === w.id).length, 1);
          assert.equal(new Set(opts.map(label)).size, opts.length, `${L.code} ${w.tr}: duplicate labels`);
          for (const o of opts) if (o.id !== w.id) assert.ok(!overlaps(o.en, w.en), `${L.code} ${w.tr} (${w.en}) offered with ${o.tr} (${o.en})`);
          assert.ok(opts.length >= 3, `${L.code} ${w.tr}: only ${opts.length} options`);
        }
      }
    }
  }
  // The audit's case: ごめん is never next to すみません-like “sorry” glosses.
  const gomen = ja.words.find((x) => x.tr === 'ごめん');
  for (let i = 0; i < 50; i++) assert.ok(pickOptions(ja, gomen, (x) => x.en).filter((o) => /\bsorry\b/i.test(o.en)).length === 1);
});

// ---------- js/languages/ja/homophones.js ----------

/** kana → the course's headwords read that way, for readings shared by 2+ entries. */
function courseHomophones() {
  const groups = new Map();
  for (const w of ja.words) {
    const k = ja.normalize(w.kana);
    if (!groups.has(k)) groups.set(k, []);
    if (!groups.get(k).includes(w.tr)) groups.get(k).push(w.tr);
  }
  return Object.fromEntries([...groups].filter(([, v]) => v.length > 1).sort(([a], [b]) => a.localeCompare(b, 'ja')));
}

test('homophones.js COURSE lists the course’s own homophones (regenerate with UPDATE_HOMOPHONES=1)', () => {
  const want = courseHomophones();
  if (process.env.UPDATE_HOMOPHONES) {
    const file = new URL('../js/languages/ja/homophones.js', import.meta.url);
    const body = Object.entries(want).map(([k, v]) => `  '${k}': [${v.map((x) => `'${x}'`).join(', ')}],`).join('\n');
    const src = readFileSync(file, 'utf8').replace(/(\/\/ BEGIN COURSE \(generated\)\n)[\s\S]*?(\/\/ END COURSE)/, `$1export const COURSE = {\n${body}\n};\n$2`);
    writeFileSync(file, src);
    return;
  }
  assert.deepEqual(COURSE, want, 'run: UPDATE_HOMOPHONES=1 node --test tests/scoring.test.js');
});

test('homophones.js SPELLINGS are for words of the course, and none is another entry', () => {
  for (const [id, forms] of Object.entries(SPELLINGS)) {
    const w = ja.byId(id);
    assert.ok(w, `SPELLINGS: no word with id ${id}`);
    for (const f of forms) {
      const others = ja.entriesWritten(f).filter((e) => e.word.id !== id);
      assert.deepEqual(others.map((e) => e.word.tr), [], `${f} (for ${id}) is another entry`);
      assert.equal(said(ja, w, f).score, 1, `${id} ← ${f}`);
    }
  }
});
