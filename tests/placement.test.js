// Placement check: which words are asked, and which topics count as known.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from './all-languages.js';
import { placementPlan, passedTopics, PER_TOPIC, MAX_TOPICS } from '../js/placement.js';

const first = (list, n) => list.slice(0, n);

test('the plan samples the first word topics that still have new words', () => {
  for (const lang of Object.values(languages)) {
    const plan = placementPlan(lang, {}, first);
    assert.equal(plan.length, MAX_TOPICS, lang.code);
    const wordTopics = lang.categories.filter((c) => (c.group || 'words') === 'words');
    assert.deepEqual(plan.map((p) => p.cat.id), wordTopics.slice(0, MAX_TOPICS).map((c) => c.id), `${lang.code}: in course order`);
    for (const p of plan) {
      assert.equal(p.words.length, PER_TOPIC);
      assert.ok(p.words.every((w) => w.cat === p.cat.id));
    }
  }
});

test('topics already started or finished are skipped; none left gives an empty plan', () => {
  const lang = languages.tr;
  const [a, b] = lang.categories.filter((c) => (c.group || 'words') === 'words');
  const cards = Object.fromEntries(lang.wordsIn(a.id).map((w) => [w.id, { reps: 1 }]));
  const plan = placementPlan(lang, cards, first);
  assert.equal(plan[0].cat.id, b.id, 'the finished first topic is not asked again');
  // a topic with fewer new words than the sample size is skipped too
  const some = Object.fromEntries(lang.wordsIn(b.id).slice(0, lang.wordsIn(b.id).length - (PER_TOPIC - 1)).map((w) => [w.id, {}]));
  assert.notEqual(placementPlan(lang, { ...cards, ...some }, first)[0].cat.id, b.id);
  const all = Object.fromEntries(lang.words.map((w) => [w.id, {}]));
  assert.deepEqual(placementPlan(lang, all, first), []);
});

test('a topic is passed only when every sampled word was right', () => {
  const plan = placementPlan(languages.uk, {}, first);
  const right = new Set([...plan[0].words.map((w) => w.id), ...plan[1].words.slice(1).map((w) => w.id)]);
  assert.deepEqual(passedTopics(plan, right).map((c) => c.id), [plan[0].cat.id]);
  assert.deepEqual(passedTopics(plan, new Set()), []);
  assert.equal(passedTopics(plan, new Set(plan.flatMap((p) => p.words.map((w) => w.id)))).length, plan.length);
});
