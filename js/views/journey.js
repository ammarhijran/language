// Journey: level & XP, goals (daily, weekly challenges, personal), achievements.
import { h, icon, meter, set } from '../ui.js';
import { meta } from '../languages/index.js';
import { GOALS } from './welcome.js';
import { bottomSheet } from '../components.js';

const fmtDate = (d) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

export function levelCard(ctx, { compact = false } = {}) {
  const lv = ctx.game.level();
  return h(compact ? 'a' : 'section', { class: `card level-card${compact ? ' compact' : ''}`, href: compact ? '#/journey' : null },
    h('div', { class: 'level-badge', 'aria-hidden': 'true' }, h('small', null, 'LVL'), h('b', null, String(lv.level))),
    h('div', { class: 'level-body' },
      h('p', { class: 'level-title' }, h('b', null, `Level ${lv.level}`), ` · ${lv.title}`),
      meter(lv.into, lv.need, 'xp-meter'),
      h('p', { class: 'muted small' }, `${lv.need - lv.into} XP to level ${lv.level + 1} · ${lv.total.toLocaleString()} XP total`)),
    compact ? icon('arrow') : null);
}

export function challengeList(ctx, { compact = false } = {}) {
  const list = ctx.game.challengeProgress();
  return h('ul', { class: `challenge-list${compact ? ' compact' : ''}` }, list.map((c) =>
    h('li', { class: c.done ? 'done' : '', 'aria-label': `${c.title}: ${c.done ? 'complete' : `${c.value} of ${c.target}`}` },
      h('span', { class: 'challenge-icon', 'aria-hidden': 'true' }, c.done ? '✅' : c.icon),
      h('span', { class: 'challenge-body' },
        h('span', { class: 'challenge-title' }, c.title),
        meter(c.value, c.target, c.done ? 'done' : '')),
      h('span', { class: 'challenge-reward' }, c.done ? 'Done' : `${c.value}/${c.target}`))));
}

/** Banner offering to save a broken streak by doing double today. */
export function repairBanner(ctx) {
  const offer = ctx.game.repairOffer(ctx.lang.code);
  if (!offer) return null;
  return h('div', { class: 'banner repair', role: 'note' },
    h('b', null, `🔧 Save your ${offer.lost}-day streak! `),
    `You missed yesterday — do ${offer.target} exercises today (double your goal) to repair it. `,
    h('span', { class: 'repair-progress' }, `${offer.done}/${offer.target}`),
    meter(offer.done, offer.target));
}

function personalGoalCard(ctx) {
  const { lang } = ctx;
  const wrap = h('section', { class: 'card' });
  const total = lang.words.length;

  function render(editing = false) {
    const p = ctx.game.personalGoal(lang.code);
    if (!p.goal || editing) {
      // Only sizes still ahead of the learner (a goal pays once, when it is reached),
      // and never the size of a goal that is already done.
      const choices = [25, 50, 100, 200].filter((n) => n < total && n > p.learned).concat([total]);
      const current = p.goal && !p.goal.doneAt && choices.includes(p.goal.words) ? p.goal.words : null;
      let words = current ?? choices.find((n) => n >= Math.min(50, total)) ?? total;
      const pills = choices.map((n) => h('button', {
        type: 'button', class: `pill${n === words ? ' selected' : ''}`,
        onclick: (e) => { words = n; pills.forEach((b) => b.classList.toggle('selected', b === e.currentTarget)); },
      }, n === total ? `All ${n}` : String(n)));
      const by = h('input', { type: 'date', class: 'select', value: p.goal?.by || '', min: new Date().toISOString().slice(0, 10), 'aria-label': 'Target date (optional)' });
      set(wrap,
        h('h2', { class: 'card-title' }, icon('target', 18), ` Personal goal · ${lang.flag} ${lang.name}`),
        h('p', { class: 'hint' }, `How many ${lang.name} words do you want to know? You’ve learned ${p.learned} so far.`),
        h('div', { class: 'pill-row' }, pills),
        h('label', { class: 'field' }, h('span', null, 'By (optional)'), by),
        h('div', { class: 'button-row' },
          h('button', { type: 'button', class: 'btn primary', onclick: () => { ctx.game.setPersonalGoal(lang.code, { words, by: by.value || null }); render(); } }, 'Set goal'),
          p.goal ? h('button', { type: 'button', class: 'btn ghost', onclick: () => render() }, 'Cancel') : null));
      return;
    }
    const g = p.goal;
    let projection;
    if (g.doneAt) projection = `🏁 Achieved on ${fmtDate(new Date(g.doneAt))}. Ready for a bigger one?`;
    else if (p.perDayNeeded) projection = `Learn about ${p.perDayNeeded} word${p.perDayNeeded === 1 ? '' : 's'} a day to make it by ${fmtDate(new Date(`${g.by}T12:00`))}.`;
    else if (p.eta) projection = `At your recent pace (~${p.rate.toFixed(1)} words a day) you’ll get there around ${fmtDate(p.eta)}.`;
    else projection = 'Finish a lesson to start building momentum.';
    set(wrap,
      h('h2', { class: 'card-title' }, icon('target', 18), ` Personal goal · ${lang.flag} ${lang.name}`),
      h('p', null, h('b', null, `${Math.min(p.learned, g.words)} / ${g.words}`), ` words learned${g.by ? ` · by ${fmtDate(new Date(`${g.by}T12:00`))}` : ''}`),
      meter(Math.min(p.learned, g.words), g.words, g.doneAt ? 'done' : ''),
      h('p', { class: 'hint' }, projection),
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn small', onclick: () => render(true) }, g.doneAt ? 'Set a new goal' : 'Edit'),
        h('button', { type: 'button', class: 'btn small ghost', onclick: () => { ctx.game.setPersonalGoal(lang.code, null); render(); } }, 'Remove')));
  }
  render();
  return wrap;
}

function dailyGoalCard(ctx) {
  const goal = ctx.settings.dailyGoal;
  const done = ctx.store.dayTotal(ctx.store.getDay(ctx.lang.code));
  return h('section', { class: 'card daily-card' },
    h('div', { class: `goal-ring${done >= goal ? ' done' : ''}`, style: { '--pct': Math.min(100, Math.round((done / goal) * 100)) } },
      h('span', null, done >= goal ? icon('check', 22) : h('b', null, String(done)), h('small', null, done >= goal ? 'goal met' : `of ${goal}`))),
    h('div', { class: 'daily-body' },
      h('h2', { class: 'card-title' }, 'Today'),
      h('p', { class: 'hint' }, done >= goal ? 'Daily goal met — every extra exercise is a bonus.' : `${goal - done} more exercise${goal - done === 1 ? '' : 's'} to reach your daily goal.`)),
    h('select', {
      class: 'select', 'aria-label': 'Daily goal',
      onchange: (e) => { ctx.store.updateSettings({ dailyGoal: Number(e.target.value) }); ctx.rerender(); },
    }, GOALS.map((g) => h('option', { value: String(g.value), selected: g.value === goal }, `${g.name} · ${g.value}/day`))));
}

/** The badge's details in a sheet: what it is for, and how far along it is. */
function badgeSheet(ctx, a, fresh, from) {
  bottomSheet(ctx, {
    label: a.title,
    opener: from,
    className: 'medal-sheet',
    build: (close) => [
      h('p', { class: 'kicker' }, a.group),
      h('div', { class: `medal-sheet-icon${a.unlocked ? ' unlocked' : ''}`, 'aria-hidden': 'true' }, a.icon),
      h('h2', null, a.title),
      h('p', null, a.desc),
      a.unlocked
        ? h('p', { class: 'hint' }, fresh.has(a.id) ? '✨ New — unlocked ' : 'Unlocked ', fmtDate(new Date(a.at)), '.')
        : [meter(a.value, a.target), h('p', { class: 'hint' }, `${a.value} of ${a.target} — ${a.target - a.value} to go.`)],
      h('div', { class: 'actions' }, h('button', { type: 'button', class: 'btn wide sheet-focus', onclick: close }, 'Close')),
    ],
  });
}

function achievementGrid(ctx, fresh) {
  const all = ctx.game.achievementProgress();
  const groups = [...new Set(all.map((a) => a.group))];
  const unlocked = all.filter((a) => a.unlocked).length;
  // The three closest to unlocking (with some progress) come first.
  const close = all.filter((a) => !a.unlocked && a.value > 0)
    .sort((x, y) => y.value / y.target - x.value / x.target || x.target - y.target).slice(0, 3);
  const medal = (a) => {
    const pct = a.unlocked ? 100 : Math.round((a.value / a.target) * 100);
    return h('li', null, h('button', {
      type: 'button', class: `medal${a.unlocked ? ' unlocked' : ' locked'}${fresh.has(a.id) ? ' fresh' : ''}`, 'aria-haspopup': 'dialog',
      'aria-label': a.unlocked
        ? `${a.title} — ${a.desc}. Unlocked ${fmtDate(new Date(a.at))}.`
        : `Locked: ${a.title} — ${a.desc}. ${a.value} of ${a.target}.`,
      onclick: (e) => badgeSheet(ctx, a, fresh, e.currentTarget),
    },
      h('span', { class: 'medal-ring', style: { '--pct': pct }, 'aria-hidden': 'true' }, h('span', null, a.icon)),
      h('span', { class: 'medal-title', 'aria-hidden': 'true' }, a.title),
      h('span', { class: 'medal-sub', 'aria-hidden': 'true' }, a.unlocked ? (fresh.has(a.id) ? 'New!' : fmtDate(new Date(a.at))) : `${a.value}/${a.target}`)));
  };
  return h('section', null,
    h('div', { class: 'title-row' },
      h('h2', { class: 'section-title' }, 'Achievements'),
      h('span', { class: 'muted small' }, `${unlocked} of ${all.length} unlocked`)),
    close.length
      ? h('section', { class: 'card next-up-card' },
        h('h3', { class: 'card-title' }, 'Almost there'),
        h('ul', { class: 'next-up' }, close.map((a) => h('li', null,
          h('span', { class: 'nu-icon', 'aria-hidden': 'true' }, a.icon),
          h('span', { class: 'nu-body' }, h('b', null, a.title), h('small', null, a.desc), meter(a.value, a.target)),
          h('span', { class: 'nu-count' }, `${a.value}/${a.target}`)))))
      : null,
    groups.map((g) => h('div', { class: 'badge-group' },
      h('h3', { class: 'kicker' }, g),
      h('ul', { class: 'badge-grid' }, all.filter((a) => a.group === g).map(medal)))),
  );
}

function stats(ctx) {
  const m = ctx.game.metrics();
  const acc = m.answers ? Math.round((m.correct / m.answers) * 100) : 0;
  const row = (label, value) => h('div', { class: 'stat' }, h('b', null, String(value)), h('span', null, label));
  return h('section', null,
    h('h2', { class: 'section-title' }, 'Lifetime'),
    h('div', { class: 'stat-row' },
      row('best streak', m.streak), row('best combo', m.bestCombo), row('accuracy', `${acc}%`),
      row('words learned', m.words), row('goals met', m.goalsMet), row('challenges', m.challenges)));
}

export default function journey(ctx) {
  const on = ctx.settings.gameOn;
  const fresh = new Set(ctx.game.state().unseen);
  ctx.game.markSeen();
  document.querySelector('.trophy .dot')?.setAttribute('hidden', '');

  const daysLeft = 7 - ((new Date().getDay() + 6) % 7);
  const xpBy = ctx.game.xpByLang();

  return h('div', { class: 'view journey' },
    // With game features off this page is only about goals, and says so.
    h('h1', null, on ? 'Journey' : 'Goals'),
    repairBanner(ctx),
    on ? levelCard(ctx) : h('div', { class: 'banner' }, 'Game features (XP, levels, challenges and achievements) are turned off. ', h('a', { href: '#/settings/game' }, 'Turn them on in Settings.')),
    on && Object.keys(xpBy).length > 1
      ? h('div', { class: 'chip-row' }, Object.entries(xpBy).map(([code, xp]) =>
        h('span', { class: 'chip static' }, meta[code]?.flag, ' ', h('b', null, xp.toLocaleString()), ' XP')))
      : null,
    h('h2', { class: 'section-title' }, 'Goals'),
    dailyGoalCard(ctx),
    on ? h('section', { class: 'card' },
      h('div', { class: 'title-row' },
        h('h2', { class: 'card-title' }, '⚔️ This week’s challenges'),
        h('span', { class: 'muted small' }, `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`)),
      h('p', { class: 'hint' }, `Each one is worth +${ctx.game.XP.challenge} XP. New challenges every Monday.`),
      challengeList(ctx)) : null,
    personalGoalCard(ctx),
    on ? achievementGrid(ctx, fresh) : null,
    on ? stats(ctx) : null,
  );
}
