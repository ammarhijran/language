// Me: the learner's own corner — a summary of progress, and the way to
// Progress, Journey (or Goals, with game features off), Already learned,
// the language, Sync and Settings.
import { h, icon } from '../ui.js';
import { computeStats } from '../stats.js';
import { levelCard } from './journey.js';

export default function me(ctx) {
  const { lang } = ctx;
  const s = computeStats(ctx);
  const gameOn = ctx.settings.gameOn;
  const fresh = gameOn ? ctx.game.unseenCount() : 0;
  const goal = ctx.game.personalGoal(lang.code);
  const goalLine = goal.goal && !goal.goal.doneAt
    ? `${Math.min(goal.learned, goal.goal.words)} / ${goal.goal.words} words${goal.goal.by ? ` by ${new Date(`${goal.goal.by}T12:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` : ''}`
    : null;

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
