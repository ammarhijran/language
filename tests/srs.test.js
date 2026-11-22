import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { newCard, review, markKnown, isDue, missedToday, status, fuzz, AGAIN, HARD, GOOD, EASY, startOfDay, KNOWN_INTERVAL, DAY } from '../js/srs.js';

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
  assert.equal(c.due, startOfDay(NOW, 1));
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

test('already learned words skip ahead and come back in about a month', () => {
  const c = markKnown(NOW);
  assert.equal(status(c), 'known');
  assert.ok(!isDue(c, NOW));
  assert.ok(isDue(c, startOfDay(NOW, KNOWN_INTERVAL)));
  assert.ok(!isDue(c, startOfDay(NOW, KNOWN_INTERVAL) - 1));
  const ok = review(c, GOOD, NOW);
  assert.equal(status(ok), 'known');
  assert.ok(ok.interval > KNOWN_INTERVAL);
});

test('forgetting an already learned word turns it into a normal learning card', () => {
  const c = review(markKnown(NOW), AGAIN, NOW);
  assert.equal(c.known, false);
  assert.equal(status(c), 'learning');
  assert.ok(isDue(c, NOW));
});

// A word that was mature before this session, then missed.
const MATURE = { ease: 2.5, interval: 30, reps: 5, lapses: 0, due: NOW, added: 0, last: 0 };

test('in-session retries of a missed word do not lower ease again', () => {
  let c = review(MATURE, AGAIN, NOW); // the real lapse
  assert.equal(c.ease, 2.3);
  assert.equal(c.lapses, 1);
  c = review(c, AGAIN, NOW + 1, { retry: true }); // easier re-ask, missed again
  c = review(c, AGAIN, NOW + 2, { retry: true }); // last re-ask, missed again
  assert.equal(c.ease, 2.3);
  assert.equal(c.lapses, 1);
  assert.equal(c.reps, 0);
  assert.equal(c.interval, 0);
  assert.ok(isDue(c, NOW + 2));
});

test('a retry reschedules exactly like a normal answer, apart from ease', () => {
  const lapsed = review(MATURE, AGAIN, NOW);
  for (const rating of [AGAIN, HARD, GOOD, EASY]) {
    const plain = review(lapsed, rating, NOW + 1);
    const retry = review(lapsed, rating, NOW + 1, { retry: true });
    // Same interval, reps and due date; ease and lapses as before the retry.
    assert.deepEqual(retry, { ...plain, ease: lapsed.ease, lapses: lapsed.lapses }, `rating ${rating}`);
  }
  // A hard retry still gets the relearning interval of one day.
  const hard = review(lapsed, HARD, NOW + 1, { retry: true });
  assert.equal(hard.interval, 1);
  assert.equal(hard.due, startOfDay(NOW, 1));
});

test('the first miss on a later day still costs ease', () => {
  let c = review(MATURE, AGAIN, NOW);
  c = review(c, AGAIN, NOW + 1, { retry: true });
  const tomorrow = startOfDay(NOW, 1) + 10 * 60 * 60 * 1000;
  assert.ok(!missedToday(c, tomorrow));
  c = review(c, AGAIN, tomorrow);
  assert.ok(Math.abs(c.ease - 2.1) < 1e-9);
});

test('missedToday is true only for a word missed earlier the same day', () => {
  // Never answered, passed, or marked as learned: not a miss.
  assert.equal(missedToday(undefined, NOW), false);
  assert.equal(missedToday(newCard(NOW), NOW), false);
  assert.equal(missedToday(review(newCard(NOW), GOOD, NOW), NOW), false);
  assert.equal(missedToday(markKnown(NOW), NOW), false);
  // Missed at 15:00: still a miss at 23:59 that day, not after midnight.
  const missed = review(MATURE, AGAIN, NOW);
  assert.equal(missedToday(missed, NOW), true);
  assert.equal(missedToday(missed, startOfDay(NOW, 1) - 1), true);
  assert.equal(missedToday(missed, startOfDay(NOW, 1)), false);
  // Passed on a re-ask: no longer a miss.
  assert.equal(missedToday(review(missed, GOOD, NOW + 1, { retry: true }), NOW + 2), false);
});

test('a fresh session the same day does not charge the lapse twice', () => {
  // "Keep reviewing" after a bad session: review.js passes retry from missedToday.
  let c = review(MATURE, AGAIN, NOW);
  c = review(c, AGAIN, NOW + 1, { retry: true });
  const later = NOW + 2 * 60 * 60 * 1000;
  c = review(c, AGAIN, later, { retry: missedToday(c, later) });
  assert.equal(c.ease, 2.3);
  assert.equal(c.lapses, 1);
});

test('retrying a missed already-learned word keeps it a normal learning card', () => {
  let c = review(markKnown(NOW), AGAIN, NOW);
  assert.equal(c.ease, 2.3);
  c = review(c, AGAIN, NOW + 1, { retry: true });
  assert.equal(c.ease, 2.3);
  assert.equal(c.known, false);
  assert.equal(status(c), 'learning');
});

// The time zone is fixed when node starts, so DST cases run in a child process
// with TZ set. `body` gets `srs`, `at(y, m, d, h, min)` (local time) and
// `local(t)` → [year, month (1-12), day, hour, minute]; it returns JSON.
function inZone(tz, body) {
  const url = new URL('../js/srs.js', import.meta.url).href;
  const code = `import * as srs from ${JSON.stringify(url)};
const at = (...a) => new Date(...a).getTime();
const local = (t) => { const d = new Date(t); return [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()]; };
console.log(JSON.stringify((() => { ${body} })()));`;
  const out = execFileSync(process.execPath, ['--input-type=module', '-e', code], {
    env: { ...process.env, TZ: tz }, encoding: 'utf8',
  });
  return JSON.parse(out);
}

// Schedules a young card (reps 1) with GOOD at local time `t`: a 3-day interval.
const THREE_DAYS = `const three = (t) => srs.review(srs.review(srs.newCard(t), srs.GOOD, t), srs.GOOD, t);`;

test('due dates land on local midnight across US DST changes', () => {
  const r = inZone('America/New_York', `${THREE_DAYS}
    const fall = three(at(2026, 9, 30, 10)); // Oct 30 + 3 days, clocks go back Nov 1
    const spring = three(at(2026, 2, 6, 10)); // Mar 6 + 3 days, clocks go forward Mar 8
    return {
      offsetChanged: new Date(at(2026, 9, 30)).getTimezoneOffset() !== new Date(at(2026, 10, 2)).getTimezoneOffset(),
      fall: local(fall.due), dueEveningBefore: srs.isDue(fall, at(2026, 10, 1, 23, 30)),
      spring: local(spring.due), dueJustAfterMidnight: srs.isDue(spring, at(2026, 2, 9, 0, 30)),
      known: local(srs.markKnown(at(2026, 9, 20, 10)).due),
      sameDay: local(srs.review(srs.newCard(0), srs.GOOD, at(2026, 10, 1, 20)).due),
      // Missed at 00:30 on the 25-hour day: still "today" at 23:30, not at 00:00 next day.
      missedLate: srs.missedToday(srs.review(srs.newCard(0), srs.AGAIN, at(2026, 10, 1, 0, 30)), at(2026, 10, 1, 23, 30)),
      missedNextDay: srs.missedToday(srs.review(srs.newCard(0), srs.AGAIN, at(2026, 10, 1, 0, 30)), at(2026, 10, 2)),
    };`);
  assert.ok(r.offsetChanged, 'tz data has US DST');
  assert.deepEqual(r.fall, [2026, 11, 2, 0, 0]);
  assert.equal(r.dueEveningBefore, false);
  assert.deepEqual(r.spring, [2026, 3, 9, 0, 0]);
  assert.equal(r.dueJustAfterMidnight, true);
  assert.deepEqual(r.known, [2026, 11, 19, 0, 0]); // markKnown: Oct 20 + 30 days
  assert.deepEqual(r.sameDay, [2026, 11, 2, 0, 0]); // reviewed on the 25-hour day itself
  assert.equal(r.missedLate, true);
  assert.equal(r.missedNextDay, false);
});

test('due dates land on local midnight across EU DST changes', () => {
  const r = inZone('Europe/Berlin', `${THREE_DAYS}
    return {
      fall: local(three(at(2026, 9, 23, 10)).due), // clocks go back Oct 25
      spring: local(three(at(2026, 2, 27, 10)).due), // clocks go forward Mar 29
      endOfTomorrow: local(srs.startOfDay(at(2026, 9, 24, 22), 2)),
    };`);
  assert.deepEqual(r.fall, [2026, 10, 26, 0, 0]);
  assert.deepEqual(r.spring, [2026, 3, 30, 0, 0]);
  assert.deepEqual(r.endOfTomorrow, [2026, 10, 26, 0, 0]);
});

test('startOfDay steps whole calendar days through every 2026 day', () => {
  // Any n-day step from 10:00 on any day must end on local midnight exactly
  // n calendar days away (back in time for negative n), whatever DST does.
  const bad = inZone('America/New_York', `
    const DAY = 86400000;
    const bad = [];
    for (let day = 0; day < 365; day++) {
      const t = at(2026, 0, 1 + day, 10);
      for (const n of [-13, -1, 1, 2, 3, 7, 30, 120]) {
        const [y, m, d, hh, mm] = local(srs.startOfDay(t, n));
        const s = new Date(t);
        const steps = (Date.UTC(y, m - 1, d) - Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())) / DAY;
        if (steps !== n || hh || mm) bad.push([local(t), n, [y, m, d, hh, mm]]);
      }
    }
    return bad;`);
  assert.deepEqual(bad, []);
});

test('startOfDay copes with a day that has no 00:00 (DST at midnight)', () => {
  // Brazil, 4 Nov 2018: clocks jumped from 00:00 straight to 01:00.
  const r = inZone('America/Sao_Paulo', `return {
    gapDay: local(srs.startOfDay(at(2018, 10, 4, 10))),
    intoGapDay: local(srs.startOfDay(at(2018, 10, 3, 10), 1)),
    outOfGapDay: local(srs.startOfDay(at(2018, 10, 4, 10), 1)),
  };`);
  assert.deepEqual(r.gapDay, [2018, 11, 4, 1, 0]); // the earliest time that day has
  assert.deepEqual(r.intoGapDay, [2018, 11, 4, 1, 0]);
  assert.deepEqual(r.outOfGapDay, [2018, 11, 5, 0, 0]);
});

// ---------- Late reviews, fuzz, typing slips ----------

const card = (interval, daysAgo, extra = {}) => ({ ease: 2.5, interval, reps: 4, lapses: 0, due: NOW, added: 0, last: startOfDay(NOW, -daysAgo) + 9 * 3600000, ...extra });

test('a word recalled long after it was due gets credit for the time it held', () => {
  // Due after 8 days, recalled after 68: grows from 8 + (68 − 8) / 2 = 38 days, not from 8.
  const late = review(card(8, 68), GOOD, NOW, { fuzzy: false });
  assert.equal(late.interval, Math.round(38 * 2.5));
  // On time, the same as before.
  assert.equal(review(card(8, 8), GOOD, NOW, { fuzzy: false }).interval, 20);
  // Early (reviewed in practice before it was due): never less than the plain interval.
  assert.equal(review(card(8, 2), GOOD, NOW, { fuzzy: false }).interval, 20);
  const easy = review(card(8, 68), EASY, NOW, { fuzzy: false });
  assert.ok(easy.interval > late.interval);
  // Forgetting is still forgetting, however late.
  assert.equal(review(card(8, 68), AGAIN, NOW).interval, 0);
});

test('HARD always grows the interval by at least a day', () => {
  let c = card(2, 2);
  const seen = [];
  for (let i = 0; i < 4; i++) { c = review(c, HARD, NOW, { fuzzy: false }); seen.push(c.interval); }
  assert.deepEqual(seen, [3, 4, 5, 6]);
  assert.equal(review(card(20, 20), HARD, NOW, { fuzzy: false }).interval, 24);
});

test('a typing slip (HARD with slip) does not lower ease; a real HARD does', () => {
  const c = card(10, 10);
  assert.equal(review(c, HARD, NOW, { slip: true }).ease, 2.5);
  assert.equal(review(c, HARD, NOW).ease, 2.35);
  // A slip still grows the interval less than GOOD.
  assert.ok(review(c, HARD, NOW, { slip: true }).interval < review(c, GOOD, NOW).interval);
});

test('fuzz spreads a batch over a few days, deterministically', () => {
  const ivs = Array.from({ length: 40 }, (_, i) => review(card(8, 8), GOOD, NOW, { id: `w${i}` }).interval);
  assert.ok(new Set(ivs).size >= 2, 'not all on one day');
  for (const iv of ivs) assert.ok(iv >= 19 && iv <= 21, `±5 % (at least a day) of 20: ${iv}`);
  // Same word, same day → same date on every device.
  assert.equal(review(card(8, 8), GOOD, NOW, { id: 'w1' }).interval, review(card(8, 8), GOOD, NOW, { id: 'w1' }).interval);
  // Short intervals are left alone, and fuzz never undoes the growth.
  assert.equal(fuzz(3, 'x'), 3);
  for (let i = 0; i < 50; i++) assert.ok(review(card(4, 4), GOOD, NOW, { id: `s${i}` }).interval >= 5);
  for (let i = 0; i < 50; i++) assert.ok(Math.abs(fuzz(100, `k${i}`) - 100) <= 5);
});

test('cards stored before these changes keep working, and gain no new fields', () => {
  const old = { ease: 2.2, interval: 15, reps: 6, lapses: 1, due: NOW - DAY, added: 1, last: NOW - 16 * DAY };
  for (const r of [AGAIN, HARD, GOOD, EASY]) {
    const next = review(old, r, NOW, { id: 'merhaba' });
    assert.deepEqual(Object.keys(next).sort(), [...Object.keys(old), 'known'].filter((k) => k !== 'known' || r === AGAIN).sort());
    for (const k of ['ease', 'interval', 'reps', 'lapses', 'due', 'last']) assert.ok(Number.isFinite(next[k]), `${k} for rating ${r}`);
    assert.ok(Number.isInteger(next.interval));
  }
  // A card that never had `last` (an import) grows from its interval.
  assert.equal(review({ ...old, last: null }, GOOD, NOW, { fuzzy: false }).interval, Math.round(15 * 2.2));
});
