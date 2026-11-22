// Daily study reminders (Android / iOS apps).
//
// Reminders are local notifications scheduled on the device by the
// @capacitor/local-notifications plugin: nothing is sent anywhere. Instead of
// one fixed repeating notification, the next two weeks are scheduled one day
// at a time, so each message can be honest about what is waiting ("12 words
// are due for review") and today's is skipped once the daily goal is met.
// They are re-planned whenever the app starts, the settings change or the
// goal is reached; after two weeks without opening the app they simply stop.

import { hasPlugin, plugin } from './native.js';

const LN = plugin('LocalNotifications');
export const DAYS_AHEAD = 14;
export const FIRST_ID = 4100; // ids FIRST_ID … FIRST_ID + DAYS_AHEAD - 1
export const DEFAULT_TIME = '19:00';

export const remindersSupported = () => hasPlugin('LocalNotifications');

/** "19:05" → { hour: 19, minute: 5 }; anything else → the default time. */
export function parseTime(text) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(text || ''));
  const hour = m ? Number(m[1]) : NaN;
  const minute = m ? Number(m[2]) : NaN;
  if (!(hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59)) return parseTime(DEFAULT_TIME);
  return { hour, minute };
}

// Messages for days with nothing due: rotated by date, so they vary but stay predictable.
const NUDGES = [
  (name) => `A few minutes of ${name} today keeps it fresh.`,
  (name) => `Ready for today's ${name}? One short lesson is enough.`,
  (name) => `Your ${name} is waiting — learn five new words.`,
  (name) => `Little and often wins. Time for some ${name}?`,
];

/** The reminder text for one day. `due` = words due for review by then. */
export function messageFor({ langName, due, streak, dayIndex }) {
  const title = streak >= 2 && dayIndex === 0 ? `Keep your ${streak}-day streak going` : `Time for ${langName}`;
  if (due > 0) {
    return { title, body: `${due} ${langName} word${due === 1 ? ' is' : 's are'} ready for review.` };
  }
  return { title, body: NUDGES[dayIndex % NUDGES.length](langName) };
}

/**
 * The notifications to schedule: one per day for the next DAYS_AHEAD days at
 * the chosen local time. Today is skipped when the time has passed or the
 * daily goal is already met. Dates are built from calendar fields, so a
 * daylight-saving change never shifts the hour.
 * @param {{ time: string, now?: Date, langName: string, dueAt: (ms: number) => number, streak?: number, goalMetToday?: boolean }} o
 */
export function plan({ time, now = new Date(), langName, dueAt, streak = 0, goalMetToday = false }) {
  const { hour, minute } = parseTime(time);
  const out = [];
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, hour, minute, 0, 0);
    if (at <= now || (i === 0 && goalMetToday)) continue;
    const { title, body } = messageFor({ langName, due: dueAt(at.getTime()), streak, dayIndex: i });
    out.push({ id: FIRST_ID + i, title, body, at });
  }
  return out;
}

const allIds = () => Array.from({ length: DAYS_AHEAD }, (_, i) => ({ id: FIRST_ID + i }));

/** 'granted' | 'denied' | 'prompt' | 'unsupported' */
export async function permission() {
  if (!remindersSupported()) return 'unsupported';
  try { return (await LN.checkPermissions()).display || 'prompt'; } catch { return 'prompt'; }
}

/** Ask for notification permission (Android 13+, iOS). Resolves true when granted. */
export async function askPermission() {
  if (!remindersSupported()) return false;
  try {
    let state = (await LN.checkPermissions()).display;
    if (state !== 'granted') state = (await LN.requestPermissions()).display;
    return state === 'granted';
  } catch { return false; }
}

/**
 * Bring the scheduled reminders in line with the settings. Safe to call
 * often; it never asks for permission (the Settings switch does that).
 * @returns {Promise<number>} how many reminders are now scheduled
 */
export async function syncReminders({ settings, langName, dueAt, streak, goalMetToday, now }) {
  if (!remindersSupported()) return 0;
  try {
    await LN.cancel({ notifications: allIds() });
    if (!settings.reminder || (await permission()) !== 'granted') return 0;
    const notifications = plan({ time: settings.reminderTime, now, langName, dueAt, streak, goalMetToday })
      .map((n) => ({
        id: n.id, title: n.title, body: n.body,
        // allowWhileIdle: still delivered in Doze; an inexact alarm is fine for a reminder
        schedule: { at: n.at, allowWhileIdle: true },
        extra: { route: '/review' },
      }));
    if (notifications.length) await LN.schedule({ notifications });
    return notifications.length;
  } catch { return 0; }
}

/** Run fn(route) when the learner taps a reminder. */
export function onReminderTap(fn) {
  if (!remindersSupported()) return;
  LN.addListener('localNotificationActionPerformed', (e) => {
    const route = e?.notification?.extra?.route;
    if (typeof route === 'string' && route.startsWith('/')) fn(route);
  }).catch(() => {});
}
