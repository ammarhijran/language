import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encode, decode, extractCode, isEncrypted, mergeAll, mergeGame, SyncError } from '../js/sync.js';
import { newCard, review, GOOD } from '../js/srs.js';
import { languages } from '../js/languages/index.js';

const T0 = new Date(2026, 10, 10).getTime();
const card = (when) => review(newCard(when), GOOD, when);

function sampleProgress(n = 300) {
  const cards = {};
  languages.tr.words.slice(0, n).forEach((w, i) => { cards[w.id] = card(T0 + i * 60000); });
  const days = {};
  for (let i = 0; i < 60; i++) days[`2026-09-${String((i % 30) + 1).padStart(2, '0')}`] = { reviews: i, learned: 5, practiced: 2, correct: i };
  return { tr: { cards, days } };
}

test('round trip: plain and encrypted', async () => {
  const payload = { device: 'devA', at: T0, progress: sampleProgress(), game: { dev: { devA: { xp: 1234, xpBy: { tr: 1234 }, c: { answers: 99 } } } } };
  const plain = await encode(payload);
  assert.match(plain, /^LISAN1\.z\./);
  assert.equal(isEncrypted(plain), false);
  const back = await decode(plain);
  assert.deepEqual(back.progress, payload.progress);
  assert.equal(back.game.dev.devA.xp, 1234);

  const secret = await encode(payload, { passphrase: 'correct horse' });
  assert.match(secret, /^LISAN1\.ze\./);
  assert.equal(isEncrypted(secret), true);
  assert.ok(!secret.includes('merhaba'));
  await assert.rejects(decode(secret), (e) => e instanceof SyncError && e.code === 'needs-passphrase');
  await assert.rejects(decode(secret, { passphrase: 'wrong' }), (e) => e.code === 'wrong-passphrase');
  const ok = await decode(secret, { passphrase: 'correct horse' });
  assert.deepEqual(ok.progress, payload.progress);
});

test('codes stay small enough to paste: 300 learned words < 12 kB', async () => {
  const code = await encode({ device: 'd', at: T0, progress: sampleProgress(300), game: {} });
  assert.ok(code.length < 12000, `code is ${code.length} chars`);
});

test('pasted text: line breaks and surrounding words are ignored', async () => {
  const code = await encode({ device: 'd', at: T0, progress: sampleProgress(5), game: {} });
  const messy = `Here's my Lisan sync:\n${code.slice(0, 40)}\n${code.slice(40)} 👍`;
  assert.ok(extractCode(messy));
  assert.equal(Object.keys((await decode(messy)).progress.tr.cards).length, 5);
  await assert.rejects(decode('hello'), (e) => e.code === 'invalid');
  await assert.rejects(decode(code.slice(0, code.length - 30)), (e) => e.code === 'invalid');
});

test('merge: union of words, newest review wins, day logs take the max', () => {
  const local = { progress: { tr: { cards: { a: card(T0), b: card(T0) }, days: { '2026-11-01': { reviews: 5, learned: 2 } } } }, game: {} };
  const remote = { device: 'B', progress: {
    tr: { cards: { b: { ...card(T0 + 1000), interval: 9 }, c: card(T0) }, days: { '2026-11-01': { reviews: 3, learned: 4 }, '2026-11-02': { reviews: 1 } } },
    ja: { cards: { 水: card(T0) }, days: {} },
  } };
  const { progress, summary } = mergeAll(local, remote);
  assert.deepEqual(Object.keys(progress.tr.cards).sort(), ['a', 'b', 'c']);
  assert.equal(progress.tr.cards.b.interval, 9, 'newer review of b wins');
  assert.deepEqual(progress.tr.days['2026-11-01'], { reviews: 5, learned: 4 });
  assert.equal(progress.tr.days['2026-11-02'].reviews, 1);
  assert.ok(progress.ja.cards['水']);
  assert.deepEqual(summary.langs.find((l) => l.code === 'tr'), { code: 'tr', remoteWords: 2, added: 1, updated: 1 });
  assert.equal(local.progress.tr.cards.c, undefined, 'inputs are not mutated');
});

test('merge is idempotent and order-independent', () => {
  const A = { progress: { tr: { cards: { a: card(T0), b: card(T0 + 5) }, days: { d1: { reviews: 2 } } } }, game: { dev: { A: { xp: 50, xpBy: { tr: 50 }, c: { answers: 5 } } } } };
  const B = { progress: { tr: { cards: { b: card(T0 + 9), c: card(T0) }, days: { d1: { reviews: 7 }, d2: { learned: 1 } } } }, game: { dev: { B: { xp: 30, xpBy: { tr: 30 }, c: { answers: 3 } } } } };
  const ab = mergeAll(A, B);
  const ba = mergeAll(B, A);
  assert.deepEqual(ab.progress, ba.progress);
  assert.deepEqual(ab.game.dev, ba.game.dev);
  const again = mergeAll({ progress: ab.progress, game: ab.game }, B);
  assert.deepEqual(again.progress, ab.progress, 'merging the same code twice changes nothing');
  assert.deepEqual(again.game.dev, ab.game.dev);
});

test('game merge: per-device XP is added up, never double counted', () => {
  const a = { dev: { A: { xp: 500, xpBy: { tr: 500 }, c: { answers: 50, bestCombo: 8 } } }, unlocked: { 'first-lesson': 100 }, unseen: [] };
  const b = { dev: { A: { xp: 300, xpBy: { tr: 300 }, c: { answers: 30, bestCombo: 4 } }, B: { xp: 200, xpBy: { ja: 200 }, c: { answers: 20, bestCombo: 12 } } }, unlocked: { 'first-lesson': 50, 'words-10': 80 } };
  const m = mergeGame(a, b);
  const total = Object.values(m.dev).reduce((s, d) => s + d.xp, 0);
  assert.equal(total, 700, "A's own newer total (500) + B's 200 — B's stale copy of A (300) is not added");
  assert.equal(m.dev.B.c.bestCombo, 12);
  assert.equal(m.unlocked['first-lesson'], 50, 'earliest unlock date');
  assert.deepEqual(m.unseen, ['words-10'], 'achievements that arrived are new here');
});

test('game merge: weekly challenges in the same week combine; a newer week wins', () => {
  const week = (key, p, done = {}, goalDays = []) => ({ key, picks: ['xp', 'ear', 'learn'], p, done, goalDays });
  const same = mergeGame({ week: week('2026-11-16', { A: { xp: 100 } }, { ear: true }, ['2026-11-17']) },
    { week: week('2026-11-16', { B: { xp: 250 } }, {}, ['2026-11-18']) });
  assert.deepEqual(same.week.p, { A: { xp: 100 }, B: { xp: 250 } });
  assert.deepEqual(same.week.done, { ear: true });
  assert.deepEqual(same.week.goalDays.sort(), ['2026-11-17', '2026-11-18']);
  const newer = mergeGame({ week: week('2026-11-09', { A: { xp: 900 } }) }, { week: week('2026-11-16', { B: { xp: 10 } }) });
  assert.equal(newer.week.key, '2026-11-16');
});
