import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newCard, review, isDue, status, AGAIN, HARD, GOOD, EASY, DAY, startOfDay } from '../js/srs.js';

const NOW = new Date(2026, 0, 10, 15, 0).getTime();

test('new card is due immediately', () => {
  const c = newCard(NOW);
  assert.ok(isDue(c, NOW));
  assert.equal(status(c), 'learning');
  assert.equal(status(undefined), 'new');
});

test('good answers grow the interval', () => {
  let c = newCard(NOW);
  c = review(c, GOOD, NOW);
  assert.equal(c.interval, 1);
  assert.equal(c.due, startOfDay(NOW) + DAY);
  assert.ok(!isDue(c, NOW));
  c = review(c, GOOD, NOW);
  assert.equal(c.interval, 3);
  c = review(c, GOOD, NOW);
  assert.equal(c.interval, 8); // 3 * 2.5 rounded
  assert.equal(status(c), 'familiar');
});

test('again resets and lowers ease', () => {
  let c = review(review(newCard(NOW), GOOD, NOW), GOOD, NOW);
  c = review(c, AGAIN, NOW);
  assert.equal(c.reps, 0);
  assert.equal(c.interval, 0);
  assert.equal(c.lapses, 1);
  assert.equal(c.ease, 2.3);
  assert.ok(isDue(c, NOW));
});

test('hard and easy adjust ease', () => {
  const base = review(review(newCard(NOW), GOOD, NOW), GOOD, NOW);
  const hard = review(base, HARD, NOW);
  const easy = review(base, EASY, NOW);
  assert.ok(hard.interval < easy.interval);
  assert.ok(hard.ease < base.ease);
  assert.ok(easy.ease > base.ease);
  assert.ok(hard.interval >= base.interval);
});

test('interval is capped', () => {
  let c = newCard(NOW);
  for (let i = 0; i < 30; i++) c = review(c, EASY, NOW);
  assert.equal(c.interval, 365);
  assert.equal(status(c), 'mastered');
});
