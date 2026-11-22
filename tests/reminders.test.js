// Daily reminders: the pure planning and message logic.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { plan, parseTime, messageFor, DAYS_AHEAD, FIRST_ID, remindersSupported, syncReminders } from '../js/reminders.js';

test('parseTime accepts HH:MM and falls back to 19:00', () => {
  assert.deepEqual(parseTime('07:05'), { hour: 7, minute: 5 });
  assert.deepEqual(parseTime('23:59'), { hour: 23, minute: 59 });
  for (const bad of ['', '25:00', '12:60', 'soon', null, undefined, '7']) assert.deepEqual(parseTime(bad), { hour: 19, minute: 0 }, String(bad));
});

test('messages are honest about what is waiting', () => {
  assert.equal(messageFor({ langName: 'Turkish', due: 12, streak: 0, dayIndex: 3 }).body, '12 Turkish words are ready for review.');
  assert.equal(messageFor({ langName: 'Arabic', due: 1, streak: 0, dayIndex: 0 }).body, '1 Arabic word is ready for review.');
  const none = messageFor({ langName: 'Japanese', due: 0, streak: 0, dayIndex: 1 });
  assert.match(none.body, /Japanese/);
  assert.doesNotMatch(none.body, /\d+ .*ready for review/);
  assert.equal(messageFor({ langName: 'Ukrainian', due: 0, streak: 5, dayIndex: 0 }).title, 'Keep your 5-day streak going');
  assert.equal(messageFor({ langName: 'Ukrainian', due: 0, streak: 5, dayIndex: 2 }).title, 'Time for Ukrainian', 'the streak is only promised for today');
});

test('plan: one reminder a day at the chosen local time for two weeks', () => {
  const now = new Date(2026, 10, 22, 9, 0);
  const p = plan({ time: '19:30', now, langName: 'Turkish', dueAt: () => 0 });
  assert.equal(p.length, DAYS_AHEAD);
  assert.equal(p[0].id, FIRST_ID);
  p.forEach((n, i) => {
    assert.equal(n.at.getHours(), 19);
    assert.equal(n.at.getMinutes(), 30);
    assert.equal(n.at.getDate(), new Date(2026, 10, 22 + i).getDate());
  });
  assert.equal(new Set(p.map((n) => n.id)).size, p.length);
});

test('plan: today is skipped when the time has passed or the goal is met', () => {
  const evening = new Date(2026, 10, 22, 20, 0);
  const late = plan({ time: '19:00', now: evening, langName: 'Turkish', dueAt: () => 0 });
  assert.equal(late.length, DAYS_AHEAD - 1);
  assert.equal(late[0].at.getDate(), 23);
  const met = plan({ time: '19:00', now: new Date(2026, 10, 22, 9, 0), langName: 'Turkish', dueAt: () => 0, goalMetToday: true });
  assert.equal(met[0].at.getDate(), 23);
});

test('plan: each day reports the words due by then', () => {
  const now = new Date(2026, 10, 22, 9, 0);
  const dueTimes = [new Date(2026, 10, 22, 12).getTime(), new Date(2026, 10, 24, 8).getTime(), new Date(2026, 10, 24, 23).getTime()];
  const p = plan({ time: '19:00', now, langName: 'Turkish', dueAt: (t) => dueTimes.filter((d) => d <= t).length });
  assert.match(p[0].body, /^1 Turkish word is/);
  assert.match(p[1].body, /^1 Turkish word is/);
  assert.match(p[2].body, /^2 Turkish words are/);
  assert.match(p[3].body, /^3 Turkish words are/);
});

test('plan: the hour stays put across a daylight-saving change', () => {
  // The calendar-field construction keeps 19:00 local whatever the offset does.
  const p = plan({ time: '19:00', now: new Date(2026, 2, 20, 9, 0), langName: 'Turkish', dueAt: () => 0 });
  assert.ok(p.every((n) => n.at.getHours() === 19 && n.at.getMinutes() === 0));
});

test('in a browser (no native plugin) nothing is scheduled', async () => {
  assert.equal(remindersSupported(), false);
  assert.equal(await syncReminders({ settings: { reminder: true, reminderTime: '19:00' }, langName: 'Turkish', dueAt: () => 0 }), 0);
});
