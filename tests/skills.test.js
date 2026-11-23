// Skills: which exercise trains what, and the summary shown on Progress.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SKILLS, SKILL_MIN, skillOf, skillMode, skillSummary } from '../js/skills.js';
import { EXERCISES } from '../js/exercises.js';

test('every exercise is filed under one skill — except the new-word card', () => {
  const ids = SKILLS.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => /^[a-z]{3,12}$/.test(id)), 'ids the store accepts');
  const types = SKILLS.flatMap((s) => s.types);
  assert.equal(new Set(types).size, types.length, 'no exercise in two skills');
  for (const type of Object.keys(EXERCISES)) {
    if (type === 'intro') assert.equal(skillOf(type), null);
    else assert.ok(ids.includes(skillOf(type)), type);
  }
  assert.deepEqual(types.filter((t) => !EXERCISES[t]), [], 'no skill names an exercise that does not exist');
  assert.equal(skillOf('listen'), 'listening');
  assert.equal(skillOf('build', { byEar: false }), 'sentences');
  assert.equal(skillOf('build', { byEar: true }), 'listening', 'a sentence built by ear is listening');
  assert.equal(skillOf('nope'), null);
  assert.equal(skillOf(undefined), null);
});

test('each skill has a practice mode; the sound exercise is the language’s own', () => {
  const sounds = SKILLS.find((s) => s.id === 'sounds');
  assert.equal(skillMode(sounds, { misread: {} }), 'letters');
  assert.equal(skillMode(sounds, { stressPractice: true }), 'stress');
  assert.equal(skillMode(sounds, { beatPractice: true }), 'beats');
  assert.equal(skillMode(sounds, {}), null);
  for (const s of SKILLS.filter((x) => x !== sounds)) assert.equal(skillMode(s, {}), s.mode);
  // every skill can be practised somewhere: a mode, the language's sound exercise, or a screen of its own
  for (const s of SKILLS) assert.ok(s.mode || s.href || s === sounds, s.id);
  const sum = skillSummary({ numbers: { right: 2, total: 10 }, reading: { right: 10, total: 10 } });
  assert.equal(sum.weakest, 'numbers');
  assert.equal(sum.rows.find((r) => r.id === 'numbers').href, '#/numbers');
});

test('the summary: only skills with enough answers, and the one to work on', () => {
  const t = (right, total) => ({ right, total });
  assert.deepEqual(skillSummary({}), { rows: [], weakest: null });
  assert.deepEqual(skillSummary(null), { rows: [], weakest: null });
  // too few answers: not shown
  assert.equal(skillSummary({ listening: t(3, SKILL_MIN - 1), reading: t(8, 8) }).rows.length, 1);
  // one skill alone has nothing to be weakest against
  assert.equal(skillSummary({ reading: t(2, 10) }).weakest, null);
  const s = skillSummary({ spelling: t(12, 20), listening: t(18, 20), reading: t(39, 40), toString: t(9, 9), unknown: t(1, 30) });
  assert.deepEqual(s.rows.map((r) => r.id), ['listening', 'reading', 'spelling'], 'in the fixed order, known skills only');
  assert.deepEqual(s.rows.map((r) => r.pct), [90, 98, 60]);
  assert.equal(s.weakest, 'spelling');
  assert.equal(s.rows[2].mode, 'type');
  // all good, or all about the same: nothing to single out
  assert.equal(skillSummary({ listening: t(19, 20), reading: t(20, 20) }).weakest, null);
  assert.equal(skillSummary({ listening: t(14, 20), reading: t(15, 21) }).weakest, null);
  // odd numbers are kept in range
  assert.equal(skillSummary({ listening: t(99, 10), reading: t(5, 10) }).rows[0].pct, 100);
});
