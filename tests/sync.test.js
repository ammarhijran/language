import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inflateRawSync } from 'node:zlib';
import { encode, decode, extractCode, isEncrypted, mergeAll, mergeGame, sanitize, passphraseOk, SyncError, OLD_DEV } from '../js/sync.js';
import { levelFromXp } from '../js/game.js';
import { newCard, review, markKnown, GOOD } from '../js/srs.js';
import { languages } from '../js/languages/index.js';

const T0 = new Date(2026, 10, 10).getTime();
const DAY = 86400000;
const card = (when) => review(newCard(when), GOOD, when);
const tally = (reviews, learned = 0, practiced = 0, correct = reviews) => ({ reviews, learned, practiced, correct });
const total = (day) => Object.values(day?.dev || {}).reduce((s, t) => s + t.reviews + t.learned + t.practiced, 0);

function sampleProgress(n = 300, device = 'devA') {
  const cards = {};
  languages.tr.words.slice(0, n).forEach((w, i) => { cards[w.id] = card(T0 + i * 60000); });
  const days = {};
  for (let i = 0; i < 60; i++) days[`2026-09-${String((i % 30) + 1).padStart(2, '0')}`] = { dev: { [device]: tally(i, 5, 2, i) } };
  return { tr: { cards, days } };
}

const OLD = {
  // made by the previous build (encode() before the "k" flag) from the payload in oldPayload()
  plain:
    'LISAN1.z.lZPNjpswFIXf5azNyOYnyXjXdqSu-gRRFg7cUgTYyHZIooiH6r679sEq86MwnYnUYQG-V_h89_oe36C6DhJN5ZQGQw8' +
    'pGArqq5wgYZrihXoBBuUhxfY5TXfpjoeHobOmtOQc5A3ehneubDGGLdkf6qjCkpQjyPgpY6i0J9urZmRY6ty4aFTnyEFyhuJEEyX' +
    'JsnimqKKgYs6KKcnDJuf_SQ4MjhrVPoQmCzR-H7oRafq_0OddukDL37-0uhZ_furHZL6gk3fRm92G7z7aL0OtzVlDenuiYWAo1HU' +
    '8_JjHm0iISPAQWeorOs9oUlYH9ThMT-W-ykPEGXJjLeUeMhnYXUC8EshWAvyVgFgJpMMQiilVS2F3QX34LEaSN1w6yCTNGC7d5-v' +
    'inSTNBoY8hA05Z_TkDaXdmWxYxyuE4AylUY37Rn787UjOfzHt0UBuGFxHqv5qKVg2HotpyPtRZoLtocBwxGFgOOnG5HVo4obvlXU' +
    '-mvhvzXXSjkhD7g8z_e77sxl9n3GG4xUyHOA24iJKws1x9HZyhdH0yUPqU9OEAl1nahr9U6hZYJkAQxW09_BWLtcqFF5a1bbK3ov' +
    'wNioFJH_aZkHyTFSHdE1rQf4Mhq7K61Hy0oGBlMU8WRwYukfjWptnNZfReUaHYQ_TwbyMPtyvmzgMw_AX',
  shortPass: // passphrase "pw" (the old build accepted any length)
    'LISAN1.ze.WAfVhtWlI0tRRHQC19txtVFBmQQ1JmwBP9fE7V3sg5u6O_JyDr9tDS5B1yMINNVsenhEeM154kekegtSG5fP_WyWFH' +
    '-mvUVo-xyO6dahmOkPkDeFFWScG3cFC1Bhc1J_AuK4mn-2sNYeBuHRCc6BUXwGRtlPzq7A-fIQAdJaWttij9WEWyVawWmYOH-daI' +
    'Na4CECgnbAfgeelpbWnFNoox_OG2ZEKAEqC4Crzazh8cpePqwKRjjOzevpqKv9fBBNIbC3R30rNnwGlSuRh6se2REiqIwjuqnjD1' +
    '3r9bstV-pRONj_fpi64eJGG-XdRblF3BtXzaEj5CBxkKX72rThro0IDGMYJ6J47RbBNQYD8cVffB0skXzF5nuvdxKi0mhKww4618' +
    'K5po9JGbMXwn15u7VaXmyD814cHNkXD4diowuPdCC1it6wVd8OoFOLnhVt7a84UzcJKCFJiVXNfs_X6CJL4XXyQdRyeGqUU0-dOv' +
    'WCnE9ZOlXpC06URcyPeiY3tNyZP5xGwY_q85ATxLxve3p90MewXk6yBGoHh9sfFbJkvo2418IOqmTDHt-SY2_6JSjOehuFxqiZs9' +
    '2O3jjFMBR_AoaJ6IZkwjrPcri-Sf4O04Tro7RVEDOxru8oS9a99xuXLRo-Y70SCA4-i0CLI4QGrB4TrDAY_bZjKXM7ZJDe5DFS5Y' +
    '4SzGl9HVtwfMY8e8jUfgafz9kggLO0gF0xNm0phLA',
  longPass: // passphrase "correct horse battery", 210 000 iterations
    'LISAN1.ze.r0iol4lX8K2uX18FxIRLcIBz768EKjVF2bdthzPcdX7JaUEeWiPBFfEGcfqi-hKbFtZtm_mDlxAhklHYgZLvjv5s8r' +
    'NRoGt8JcX6UL5DojnAWwkj_nPlKIQD9pvgWhKnGZpKV-NvpyMngbQuuf7jXMpnA3cpE-utk3vNpmU8D6QFN-bhncj6ocXX8-DLiU' +
    '1IcNDsVdQyrr7bJ4mSA0mtEoATYsFqwR5-mQRZ-leSe_8pPlQBjPiLFG2tPuO0YSMu-tfaUKAz9YQXxmOVRG93eKoaWxW7WzJY1M' +
    'GeRat4INWhRJVi8WSVy8TzLkbfOLIecIpQhon4ZS3DSc7drfrWRbL1IWA8ACDp48EJ_HufCJLn3E6fJfEH2hN-2TQBdPuxXoLGaS' +
    'aD4B3pWThzyka-BWH6r9aMd-3Pr9IsXmih9oqDQbjYgVBtkao0TQXRQtTJFBcCXXJjqEaC0Ok64s6BWNnYUo734i8ztd__cnMPc-' +
    'Du_a_qFh_QK7UP2rI7LrnEgTWKB5JXtrpG2dmzrMsgVmGyywiMF2NCkoiV1Rg43olDjDBGUgONNc15ksh5NmV5OhejmJhX5si6FY' +
    'bZzou9Y5Zzy_e_BE7abN3tdiO98UNZ1SHcy9pd8bFhgfSWs1ErGhtpggBth9D4j7_elXtFEDyhHp0rD8kAjXsEk9IsERBvOasURr' +
    'wU78uxwtWHfeF2H8eOxI2pbAQX-Wfsa4VUGqaRhgg',
};

test('round trip: plain and encrypted', async () => {
  const payload = { device: 'devA', at: T0, progress: sampleProgress(), game: { dev: { devA: { xp: 1234, xpBy: { tr: 1234 }, c: { answers: 99 } } } } };
  const plain = await encode(payload);
  assert.match(plain, /^LISAN1\.z\./);
  assert.equal(isEncrypted(plain), false);
  const back = await decode(plain);
  assert.deepEqual(back.progress, payload.progress);
  assert.equal(back.game.dev.devA.xp, 1234);
  assert.equal(back.device, 'devA');
  assert.equal(back.at, T0);

  const secret = await encode(payload, { passphrase: 'correct horse' });
  assert.match(secret, /^LISAN1\.zek\./, 'new codes are marked as using 600 000 iterations');
  assert.equal(isEncrypted(secret), true);
  assert.ok(!secret.includes('merhaba'));
  await assert.rejects(decode(secret), (e) => e instanceof SyncError && e.code === 'needs-passphrase');
  await assert.rejects(decode(secret, { passphrase: 'wrong one' }), (e) => e.code === 'wrong-passphrase');
  const ok = await decode(secret, { passphrase: 'correct horse' });
  assert.deepEqual(ok.progress, payload.progress);
});

test('new codes need a passphrase of 8+ characters to be encrypted', async () => {
  assert.equal(passphraseOk('1234567'), false);
  assert.equal(passphraseOk('  short  '), false, 'surrounding spaces don’t count');
  assert.equal(passphraseOk('12345678'), true);
  assert.equal(passphraseOk('水曜日の猫と犬と'), true, 'counted in characters, not bytes');
  const payload = { device: 'd', at: T0, progress: {}, game: {} };
  await assert.rejects(encode(payload, { passphrase: 'a' }), (e) => e instanceof SyncError && e.code === 'weak-passphrase');
  assert.match(await encode(payload), /^LISAN1\.z\./, 'no passphrase: a plain code');
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

test('codes made by the previous build still decode and merge', async () => {
  const plain = await decode(OLD.plain);
  const short = await decode(OLD.shortPass, { passphrase: 'pw' });
  const long = await decode(OLD.longPass, { passphrase: 'correct horse battery' });
  await assert.rejects(decode(OLD.longPass, { passphrase: 'correct horse' }), (e) => e.code === 'wrong-passphrase');
  for (const p of [plain, short, long]) {
    assert.equal(p.device, 'oldDev1');
    assert.deepEqual(Object.keys(p.progress.tr.cards), ['merhaba', 'selam', 'günaydın']);
    assert.equal(p.progress.tr.cards['günaydın'].known, true);
    // old flat day tallies (max-merged by that build) go into the shared old slot
    assert.deepEqual(p.progress.tr.days['2026-11-10'], { dev: { [OLD_DEV]: tally(3, 2, 0, 3) } });
    // that build paid the goal on the days in its weekly goal list without recording it
    assert.deepEqual(p.progress.tr.days['2026-11-11'], { dev: { [OLD_DEV]: tally(5, 0, 1, 4) }, goalMet: true });
    assert.equal(p.game.dev.oldDev1.xp, 345);
    assert.deepEqual(p.game.goals.tr, { words: 50, by: '2027-01-31', set: p.game.goals.tr.set, doneAt: null });
    assert.deepEqual(p.game.week.p, { oldDev1: { xp: 345, learned: 2, answers: 12 } });
  }
  const local = { progress: { tr: { cards: { merhaba: card(T0 + 5 * DAY) }, days: { '2026-11-10': { dev: { me: tally(4) } } } } }, game: { dev: { me: { xp: 10, xpBy: { tr: 10 }, c: {} } } } };
  const m = mergeAll(local, plain, { device: 'me' });
  assert.deepEqual(Object.keys(m.progress.tr.cards).sort(), ['günaydın', 'merhaba', 'selam']);
  assert.equal(m.progress.tr.cards.merhaba.last, T0 + 5 * DAY, 'this device’s newer review wins');
  assert.equal(total(m.progress.tr.days['2026-11-10']), 9, '4 here + 5 on the old device');
  assert.equal(m.game.dev.oldDev1.xp + m.game.dev.me.xp, 355);
  // the raw old payload (as the previous build wrote it, before sanitizing) merges the same way
  const raw = JSON.parse(inflateRawSync(Buffer.from(OLD.plain.split('.')[2], 'base64url')));
  assert.equal(raw.progress.tr.days['2026-11-10'].reviews, 3, 'old format: flat day tallies');
  assert.deepEqual(mergeAll(local, raw, { device: 'me' }).progress, m.progress);
});

test('merge: union of words, newest review wins, per-device day tallies add up', () => {
  const local = { progress: { tr: { cards: { a: card(T0), b: card(T0) }, days: { '2026-11-01': { dev: { A: tally(5, 2) } } } } }, game: {} };
  const remote = { device: 'B', progress: {
    tr: { cards: { b: { ...card(T0 + 1000), interval: 9 }, c: card(T0) }, days: { '2026-11-01': { dev: { B: tally(3, 4) } }, '2026-11-02': { dev: { B: tally(1) } } } },
    ja: { cards: { 水: card(T0) }, days: {} },
  } };
  const { progress, summary } = mergeAll(local, remote, { device: 'A' });
  assert.deepEqual(Object.keys(progress.tr.cards).sort(), ['a', 'b', 'c']);
  assert.equal(progress.tr.cards.b.interval, 9, 'newer review of b wins');
  assert.deepEqual(progress.tr.days['2026-11-01'], { dev: { A: tally(5, 2), B: tally(3, 4) } }, 'both devices’ work is kept');
  assert.equal(total(progress.tr.days['2026-11-01']), 14);
  assert.equal(total(progress.tr.days['2026-11-02']), 1);
  assert.ok(progress.ja.cards['水']);
  assert.deepEqual(summary.langs.find((l) => l.code === 'tr'), { code: 'tr', remoteWords: 2, added: 1, updated: 1, removed: 0, skipped: 0 });
  assert.equal(summary.changed, true);
  assert.equal(local.progress.tr.cards.c, undefined, 'inputs are not mutated');
});

test('merge: the same device’s tallies take the larger count; flags come from either side', () => {
  const day = (t, extra = {}) => ({ progress: { tr: { cards: {}, days: { '2026-11-01': { dev: { A: t }, ...extra } } } }, game: {} });
  const m = mergeAll(day(tally(5)), { device: 'A', ...day(tally(3, 1), { repaired: true, goalMet: true }) });
  assert.deepEqual(m.progress.tr.days['2026-11-01'], { dev: { A: { reviews: 5, learned: 1, practiced: 0, correct: 5 } }, repaired: true, goalMet: true });
});

test('merge is idempotent and order-independent', () => {
  const A = { device: 'A', progress: { tr: { cards: { a: card(T0), b: card(T0 + 5), gone: { deleted: true, last: T0 + 9 } }, days: { '2026-11-01': { dev: { A: tally(2) } } } } },
    game: { dev: { A: { xp: 50, xpBy: { tr: 50 }, c: { answers: 5 } } }, goals: { tr: { words: 50, by: null, set: T0, doneAt: T0 + 3 } }, said: { great: ['tr:a'], perfect: [] } } };
  const B = { device: 'B', progress: { tr: { cards: { b: card(T0 + 9), c: card(T0), gone: card(T0 + 1) }, days: { '2026-11-01': { dev: { B: tally(7) }, goalMet: true }, '2026-11-02': { dev: { B: tally(0, 1, 0, 0) } } } } },
    game: { dev: { B: { xp: 30, xpBy: { tr: 30 }, c: { answers: 3 } } }, goals: { tr: { words: 50, by: null, set: T0, doneAt: null } }, said: { great: ['tr:b'], perfect: ['tr:b'] } } };
  const ab = mergeAll(A, B, { device: 'A' });
  const ba = mergeAll(B, A, { device: 'B' });
  const sorted = (x) => JSON.parse(JSON.stringify(x, (k, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).sort()) : Array.isArray(v) ? [...v].sort() : v)));
  assert.deepEqual(sorted(ab.progress), sorted(ba.progress));
  assert.deepEqual(sorted(ab.game.dev), sorted(ba.game.dev));
  assert.deepEqual(ab.game.goals, ba.game.goals);
  assert.deepEqual(sorted(ab.game.said), sorted(ba.game.said));
  const again = mergeAll({ progress: ab.progress, game: ab.game }, B, { device: 'A' });
  assert.deepEqual(again.progress, ab.progress, 'merging the same code twice changes nothing');
  assert.deepEqual(again.game.dev, ab.game.dev);
  assert.equal(again.summary.changed, false);
});

test('an unmarked word stays unmarked after a two-way sync; a later review brings it back', () => {
  const w = 'merhaba';
  const known = markKnown(T0);
  // both devices have the word ticked as already learned; A unmarks it later
  const A = { device: 'A', progress: { tr: { cards: { [w]: { deleted: true, last: T0 + DAY } }, days: {} } }, game: {} };
  const B = { device: 'B', progress: { tr: { cards: { [w]: known }, days: {} } }, game: {} };
  const onB = mergeAll(B, A, { device: 'B' });
  assert.equal(onB.progress.tr.cards[w].deleted, true);
  assert.equal(onB.summary.langs[0].removed, 1);
  assert.equal(onB.summary.changed, true, 'a code that only removes something can still be merged');
  const onA = mergeAll(A, { device: 'B', ...onB }, { device: 'A' });
  assert.equal(onA.progress.tr.cards[w].deleted, true, 'the old card doesn’t come back');
  // learning the word again later wins over the removal
  const relearned = card(T0 + 2 * DAY);
  const back = mergeAll({ progress: onA.progress, game: {} }, { device: 'B', progress: { tr: { cards: { [w]: relearned }, days: {} } }, game: {} }, { device: 'A' });
  assert.deepEqual(back.progress.tr.cards[w], relearned);
  assert.equal(back.summary.langs[0].added, 1);
});

test('reset progress: cards and days from before the reset don’t come back from other devices', () => {
  const resetAt = new Date(2026, 10, 15, 12).getTime();
  const A = { device: 'A', progress: { tr: { cards: { after: card(resetAt + 1000) }, days: { '2026-11-15': { dev: { A: tally(1) } } }, resetAt } }, game: {} };
  const B = { device: 'B', progress: { tr: {
    cards: { old: card(resetAt - DAY), after: card(resetAt + 500), newer: card(resetAt + DAY) },
    days: { '2026-11-14': { dev: { B: tally(9) } }, '2026-11-15': { dev: { B: tally(2) } }, '2026-11-16': { dev: { B: tally(3) } } },
  } }, game: {} };
  const onA = mergeAll(A, B, { device: 'A' });
  assert.deepEqual(Object.keys(onA.progress.tr.cards).sort(), ['after', 'newer']);
  assert.deepEqual(Object.keys(onA.progress.tr.days).sort(), ['2026-11-15', '2026-11-16']);
  assert.equal(onA.progress.tr.resetAt, resetAt);
  assert.deepEqual(onA.summary.langs[0], { code: 'tr', remoteWords: 3, added: 1, updated: 0, removed: 0, skipped: 1 }, 'the preview says what was left out');
  const again = mergeAll({ progress: onA.progress, game: onA.game }, B, { device: 'A' });
  assert.equal(again.summary.changed, false, 'the old words stay out');
  // a reset is for "this device": merging A's code doesn't delete B's progress
  const onB = mergeAll(B, A, { device: 'B' });
  assert.deepEqual(Object.keys(onB.progress.tr.cards).sort(), ['after', 'newer', 'old']);
  assert.deepEqual(Object.keys(onB.progress.tr.days).sort(), ['2026-11-14', '2026-11-15', '2026-11-16']);
  assert.equal(onB.progress.tr.resetAt, undefined);
  // a reset can't come from outside: a crafted far-future one neither wipes this device nor sticks in a backup
  const crafted = { device: 'X', progress: { tr: { cards: {}, days: {}, resetAt: 8.64e15 } }, game: {} };
  assert.deepEqual(Object.keys(mergeAll(B, crafted, { device: 'B' }).progress.tr.cards).sort(), ['after', 'newer', 'old']);
  assert.ok(sanitize(crafted).progress.tr.resetAt <= Date.now());
  // a code from a device that reset a language it then didn't use changes nothing here
  const emptied = { device: 'A', progress: { tr: { cards: {}, days: {}, resetAt } }, game: {} };
  assert.equal(mergeAll(B, emptied, { device: 'B' }).summary.changed, false);
  assert.equal(mergeAll({ progress: {}, game: {} }, emptied, { device: 'B' }).summary.changed, false);
});

test('old day logs that two devices both hold (max-merged by the previous build) are not added up twice', () => {
  // the previous build merged days with max(), so after a sync both devices had the same numbers
  const old = (device) => ({ device, progress: { tr: { cards: {}, days: { '2026-11-20': { reviews: 15, learned: 2, practiced: 0, correct: 14 } } } }, game: {} });
  const a = sanitize(old('A'), { device: 'A', dailyGoal: 20 });
  const b = sanitize(old('B'), { device: 'B', dailyGoal: 20 });
  assert.deepEqual(a.progress.tr.days['2026-11-20'], { dev: { [OLD_DEV]: tally(15, 2, 0, 14) } });
  const m = mergeAll(a, { device: 'B', ...b }, { device: 'A' });
  assert.equal(total(m.progress.tr.days['2026-11-20']), 17, 'the same 17 exercises, not 34');
  assert.equal(m.summary.changed, false);
  // work done after the upgrade is each device's own and adds up
  const day = m.progress.tr.days['2026-11-20'];
  day.dev.A = tally(3);
  const withB = mergeAll(m, { device: 'B', progress: { tr: { cards: {}, days: { '2026-11-20': { dev: { [OLD_DEV]: tally(15, 2, 0, 14), B: tally(4) } } } } }, game: {} }, { device: 'A' });
  assert.equal(total(withB.progress.tr.days['2026-11-20']), 17 + 3 + 4);
});

test('personal goals: a removal syncs, and a goal finished elsewhere isn’t finished again', () => {
  const goal = { words: 5, by: null, set: T0, doneAt: null };
  const done = { ...goal, doneAt: T0 + DAY };
  // same goal on both devices; the remote one is completed → it wins, in either order
  assert.equal(mergeGame({ goals: { tr: goal } }, { goals: { tr: done } }).goals.tr.doneAt, T0 + DAY);
  assert.equal(mergeGame({ goals: { tr: done } }, { goals: { tr: goal } }).goals.tr.doneAt, T0 + DAY);
  assert.equal(mergeGame({ goals: { tr: { ...done, doneAt: T0 + 2 * DAY } } }, { goals: { tr: done } }).goals.tr.doneAt, T0 + DAY, 'earliest completion');
  // a removal is newer than the goal it removes
  const removed = { removed: true, set: T0 + 5 };
  assert.deepEqual(mergeGame({ goals: { tr: goal } }, { goals: { tr: removed } }).goals.tr, removed);
  assert.deepEqual(mergeGame({ goals: { tr: removed } }, { goals: { tr: goal } }).goals.tr, removed);
  // a goal set after the removal wins
  const later = { words: 100, by: null, set: T0 + 9, doneAt: null };
  assert.deepEqual(mergeGame({ goals: { tr: removed } }, { goals: { tr: later } }).goals.tr, later);
});

test('hostile or broken codes are cleaned up instead of saved', async () => {
  const b64 = (s) => Buffer.from(s).toString('base64url');
  const code = (json) => `LISAN1.-.${b64(json)}`;
  const id = languages.tr.words[0].id;
  // 1e999 parses as Infinity; 1e300 is finite but absurd
  const inf = await decode(code('{"app":"lisan","progress":{},"game":{"dev":{"x":{"xp":1e999,"c":{"answers":1e300}},"y":{"xp":1e300}}}}'));
  assert.equal(inf.game.dev.x.xp, 0);
  assert.equal(inf.game.dev.x.c.answers, 1e7);
  assert.equal(inf.game.dev.y.xp, 1e9);
  const merged = mergeAll({ progress: {}, game: {} }, inf);
  const xp = Object.values(merged.game.dev).reduce((s, d) => s + d.xp, 0);
  assert.ok(levelFromXp(xp).level > 1, 'the level is computed at once');

  const evil = await decode(code(JSON.stringify({
    app: 'lisan',
    progress: {
      tr: { cards: { [id]: null, x: 'str', y: 5, z: { ease: 2.5, interval: 1, reps: 1, due: 'soon' }, ok: card(T0) }, days: { 'not-a-day': { reviews: 1 }, '2026-11-01': { reviews: 'many', learned: -2 }, '2026-11-02': null } },
      ja: null, uk: 'x', 'Not a language': { cards: {} },
    },
    game: { letters: { tr: 'abc', uk: [1, 'а'] }, unlocked: { 'first-lesson': 'yesterday', 'words-10': T0 }, unseen: ['words-10', 'ghost'], goals: { tr: { words: 'all' }, uk: null, ja: { words: 10, by: 'soon', set: T0 } }, week: { key: '9999', picks: [] }, said: { great: 'tr:a' } },
  })));
  assert.deepEqual(Object.keys(evil.progress), ['tr']);
  assert.deepEqual(Object.keys(evil.progress.tr.cards), ['ok']);
  assert.deepEqual(evil.progress.tr.days, {});
  assert.deepEqual(evil.game.letters, { tr: [], uk: ['а'] });
  assert.deepEqual(evil.game.unlocked, { 'words-10': T0 });
  assert.deepEqual(evil.game.unseen, ['words-10']);
  assert.deepEqual(evil.game.goals, { ja: { words: 10, by: null, set: T0, doneAt: null } });
  assert.equal(evil.game.week, undefined);
  assert.deepEqual(evil.game.said, { great: [], perfect: [] });

  // prototype keys are dropped, and nothing is polluted
  const proto = await decode(code('{"app":"lisan","progress":{"__proto__":{"cards":{}},"tr":{"cards":{"__proto__":{"last":5,"polluted":1}},"days":{"__proto__":{"reviews":3}}}},"game":{"dev":{"__proto__":{"xp":1}},"letters":{"__proto__":["a"]},"unlocked":{"__proto__":1},"goals":{"__proto__":{"set":5}}}}'));
  const m = mergeAll({ progress: { tr: { cards: {}, days: {} } }, game: {} }, proto);
  assert.equal(Object.getPrototypeOf(m.progress.tr.cards), Object.prototype);
  assert.equal(Object.getPrototypeOf(m.game.dev), Object.prototype);
  assert.equal(({}).polluted, undefined);
  assert.deepEqual(m.game.letters, {});

  // the top level must still look like Lisan progress
  await assert.rejects(decode(code('{"app":"lisan","progress":null}')), (e) => e.code === 'invalid');
  await assert.rejects(decode(code('[1,2]')), (e) => e.code === 'invalid');
  assert.deepEqual(sanitize(null), { progress: {}, game: {} });
});

test('a compressed code that inflates to something huge is refused', async () => {
  const zeros = new Uint8Array(20 * 1024 * 1024);
  const res = new Response(new Blob([zeros]).stream().pipeThrough(new CompressionStream('deflate-raw')));
  const packed = Buffer.from(await res.arrayBuffer()).toString('base64url');
  await assert.rejects(decode(`LISAN1.z.${packed}`), (e) => e instanceof SyncError && e.code === 'too-big');
  await assert.rejects(decode(`LISAN1.-.${'A'.repeat(4_000_001)}`), (e) => e.code === 'too-big');
});

test('game merge: per-device XP is added up, never double counted', () => {
  const a = { dev: { A: { xp: 500, xpBy: { tr: 500 }, c: { answers: 50, bestCombo: 8 } } }, unlocked: { 'first-lesson': 100 }, unseen: [] };
  const b = { dev: { A: { xp: 300, xpBy: { tr: 300 }, c: { answers: 30, bestCombo: 4 } }, B: { xp: 200, xpBy: { ja: 200 }, c: { answers: 20, bestCombo: 12 } } }, unlocked: { 'first-lesson': 50, 'words-10': 80 } };
  const m = mergeGame(a, b);
  const sum = Object.values(m.dev).reduce((s, d) => s + d.xp, 0);
  assert.equal(sum, 700, "A's own newer total (500) + B's 200 — B's stale copy of A (300) is not added");
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
