// Me: the learner's own corner — a summary of progress, and the way to
// Progress, Journey (or Goals, with game features off), Already learned,
// the language, Sync and Settings.
import { h, icon } from '../ui.js';
import { computeStats } from '../stats.js';
import { levelCard } from './journey.js';
import { devicePref, setDevicePref } from '../components.js';

/** Days after which a reminder to back up is shown, and how much there must be to lose first. */
export const BACKUP_AFTER_DAYS = 30;
export const BACKUP_MIN_WORDS = 30;
/**
 * Whether to remind the learner to save a copy of their data: only once there
 * is something to lose, and only if nothing has left this device for a while.
 * `snoozed` is when the learner last said “Not now”.
 * Returns null, or { never, days } — `days` since the last backup or sync code.
 */
export function backupNudge(last, learned, now = Date.now(), snoozed = 0) {
  if (learned < BACKUP_MIN_WORDS) return null;
  if (snoozed && now - snoozed < BACKUP_AFTER_DAYS * 86400000) return null; // “Not now”: asked again in a month
  if (last == null) return { never: true, days: null };
  const days = Math.floor((now - last) / 86400000);
  return days >= BACKUP_AFTER_DAYS ? { never: false, days } : null;
}

/** "today", "yesterday", "12 days ago", "3 months ago" — or "never". */
export function agoText(at, now = Date.now()) {
  if (at == null) return 'never';
  const days = Math.max(0, Math.floor((now - at) / 86400000));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 60) return `${days} days ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export default function me(ctx) {
  const { lang } = ctx;
  const s = computeStats(ctx);
  const gameOn = ctx.settings.gameOn;
  const fresh = gameOn ? ctx.game.unseenCount() : 0;
  const goal = ctx.game.personalGoal(lang.code);
  const goalLine = goal.goal && !goal.goal.doneAt
    ? `${Math.min(goal.learned, goal.goal.words)} / ${goal.goal.words} words${goal.goal.by ? ` by ${new Date(`${goal.goal.by}T12:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` : ''}`
    : null;

  // Everything lives on this device: after a while, a reminder to keep a copy elsewhere.
  const learnedAll = Object.keys(ctx.store.getCards(lang.code)).length;
  const nudge = backupNudge(ctx.store.lastBackup(), learnedAll, Date.now(), Number(devicePref('backupSnooze', 0)) || 0);
  const backupBanner = nudge ? h('div', { class: 'banner backup-nudge', role: 'note' },
    h('b', null, '💾 Keep a copy of your progress. '),
    nudge.never
      ? 'What you have learned is saved only on this device. '
      : `Your last backup or sync code was ${agoText(ctx.store.lastBackup())}. `,
    'A backup file or a sync code keeps it safe if the phone is lost or the app is removed.',
    h('div', { class: 'button-row' },
      h('a', { class: 'btn small', href: '#/settings' }, 'Export a backup'),
      h('a', { class: 'btn small', href: '#/sync' }, 'Make a sync code'),
      h('button', { type: 'button', class: 'link-btn', onclick: () => { setDevicePref('backupSnooze', Date.now()); backupBanner.remove(); } }, 'Not now'))) : null;

  const row = (href, ic, title, sub, extra = null) => h('li', null, h('a', { class: 'me-row', href },
    h('span', { class: 'me-icon', 'aria-hidden': 'true' }, ic),
    h('span', { class: 'me-text' }, h('b', null, title, extra), h('small', null, sub)),
    icon('arrow', 18)));

  return h('div', { class: 'view me' },
    h('h1', null, 'Me'),
    h('div', { class: 'stat-row' },
      stat(icon('flame'), s.streak, 'day streak'),
      stat(icon('book'), s.learned, `of ${s.total} learned`),
      stat(icon('star'), s.counts.mastered, 'mastered'),
      stat(icon('repeat'), s.due, 'due now')),
    gameOn ? levelCard(ctx, { compact: true }) : null,
    backupBanner,
    h('ul', { class: 'me-list' },
      row('#/progress', icon('chart', 22), 'Progress', 'Activity, mastery by topic and the full word list'),
      gameOn
        ? row('#/journey', icon('trophy', 22), 'Journey', goalLine ? `Goal: ${goalLine} · achievements` : 'Level, goals and achievements',
          fresh ? h('span', { class: 'badge me-new' }, `${fresh} new`) : null)
        : row('#/journey', icon('target', 22), 'Goals', goalLine ? `Goal: ${goalLine}` : 'Daily goal, streak and your personal goal'),
      row('#/known', icon('check', 22), 'Already learned', 'Tick words you already know so lessons skip them'),
      row('#/language', h('span', { class: 'me-flag' }, lang.flag), 'Language', `Learning ${lang.name} · switch to another`),
      row('#/sync', icon('repeat', 22), 'Sync between devices', 'Move your progress to another phone or computer'),
      row('#/settings', icon('settings', 22), 'Settings', 'Audio, lessons, game features, backup')),
  );
}

function stat(ic, value, label) {
  return h('div', { class: 'stat' }, ic, h('b', null, String(value)), h('span', null, label));
}
