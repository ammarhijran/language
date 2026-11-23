import { h, icon, meter, set, growList, debounce } from '../ui.js';
import { computeStats, nextCategory, reviewForecast, activityCalendar } from '../stats.js';
import { status, STATUS_LABEL } from '../srs.js';
import { skillSummary, SKILL_MIN } from '../skills.js';
import { playButton } from '../components.js';

/**
 * Your skills: how the last answers of each kind of question went — the
 * weakest with a link to a round of just that. Shown once two kinds have
 * enough answers to compare.
 */
function skillsCard(ctx) {
  const { lang, store } = ctx;
  const { rows, weakest } = skillSummary(store.getSkills(lang.code), lang);
  if (rows.length < 2) return null;
  const weak = rows.find((r) => r.id === weakest) || null;
  return h('section', { class: 'card skills' },
    h('h2', { class: 'card-title' }, 'Your skills'),
    h('ul', { class: 'skill-list' }, rows.map((r) => h('li', { class: r.id === weakest ? 'weakest' : null },
      h('span', { class: 'skill-icon', 'aria-hidden': 'true' }, r.emoji),
      h('span', { class: 'skill-name' }, h('b', null, r.name), h('small', null, r.hint)),
      h('span', { class: 'skill-pct' }, `${r.pct}%`, h('span', { class: 'sr-only' }, ` right, of the last ${r.total} answers`)),
      meter(r.right, r.total)))),
    weak && (weak.mode || weak.href)
      ? h('p', { class: 'skill-next' }, `${weak.name} is the one to work on. `,
        h('a', { class: 'btn small', href: weak.href || `#/practice/${weak.mode}` }, `Practise ${weak.name.toLowerCase()}`, icon('arrow', 16)))
      : null,
    h('p', { class: 'hint chart-note' }, `How your last answers of each kind went (up to ${store.SKILL_WINDOW}, on this device). A kind shows up after ${SKILL_MIN} answers.`));
}

export default function progress(ctx, catFilter) {
  const { lang, store } = ctx;
  const s = computeStats(ctx);
  const cards = store.getCards(lang.code);

  // Last 14 days of activity (summed over synced devices).
  const today = new Date();
  const history = Array.from({ length: 14 }, (_, k) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (13 - k)); // calendar days: 24 h steps can skip a day across DST
    return { d, n: store.dayTotal(store.getDay(lang.code, d)) };
  });
  const busiest = Math.max(...history.map((x) => x.n));
  const maxN = Math.max(5, busiest);
  const nothingYet = s.learned === 0 && busiest === 0;

  let query = '';
  let filter = 'all';
  let cat = lang.categories.some((c) => c.id === catFilter) ? catFilter : 'all';
  const list = h('ul', { class: 'word-list' });

  const row = (w) => {
    const st = status(cards[w.id]);
    return h('li', null,
      playButton(ctx, w),
      h('a', { href: `#/word/${encodeURIComponent(w.id)}`, class: 'word-row' },
        h('b', { lang: lang.code }, w.tr),
        h('span', { class: 'muted' }, w.en)),
      h('span', { class: `badge ${st}` }, STATUS_LABEL[st]));
  };

  // The list sits below the stats, so it is built a screenful at a time
  // (hundreds of rows at once made opening Progress and every search slow).
  let stopList = () => {};
  function renderList() {
    searchLater.cancel(); // a filter changed: no need to redo it for the search too
    stopList();
    const notes = filter === 'noted' ? store.getNotes(lang.code) : null;
    const rows = lang.words.filter((w) => {
      if (cat !== 'all' && w.cat !== cat) return false;
      if (filter === 'missed') { if (!(cards[w.id]?.lapses > 0)) return false; }
      else if (filter === 'noted') { if (!Object.hasOwn(notes, w.id)) return false; }
      else if (filter !== 'all' && status(cards[w.id]) !== filter) return false;
      return lang.matches(w, query);
    });
    // The words missed most come first.
    if (filter === 'missed') rows.sort((a, b) => cards[b.id].lapses - cards[a.id].lapses);
    if (!rows.length) {
      stopList = () => {};
      set(list, h('li', { class: 'muted empty' }, 'No words match.'));
      return;
    }
    stopList = growList(list, rows, row, { first: 40, step: 120, label: 'Show more words' });
  }
  const searchLater = debounce(renderList, 150);
  ctx.onCleanup(() => { searchLater.cancel(); stopList(); });

  const search = h('input', {
    type: 'search', class: 'search', placeholder: `Search ${lang.name} or English…`, 'aria-label': 'Search words',
    oninput: (e) => { query = e.target.value.trim(); searchLater(); },
  });
  const statusSelect = h('select', { class: 'select', 'aria-label': 'Filter by status', onchange: (e) => { filter = e.target.value; renderList(); } },
    h('option', { value: 'all' }, 'All statuses'),
    Object.entries(STATUS_LABEL).map(([k, v]) => h('option', { value: k }, v)),
    // Not statuses, but the two other ways to pick words out of the list.
    h('option', { value: 'missed' }, 'Missed before (most first)'),
    h('option', { value: 'noted' }, 'With a note of mine'));
  const catSelect = h('select', { class: 'select', 'aria-label': 'Filter by topic', onchange: (e) => { cat = e.target.value; renderList(); } },
    h('option', { value: 'all' }, 'All topics'),
    lang.categories.map((c) => h('option', { value: c.id, selected: c.id === cat }, `${c.emoji} ${c.name}`)));

  renderList();

  // Six weeks as a calendar: which days were practised, and how much against the daily goal.
  const weeks = activityCalendar((d) => {
    const day = store.getDay(lang.code, d);
    return { n: store.dayTotal(day), goalMet: day.goalMet || day.repaired };
  }, { goal: ctx.settings.dailyGoal });
  const past = weeks.filter((c) => !c.future);
  const activeDays = past.filter((c) => c.level > 0).length;
  const goalDays = past.filter((c) => c.level === 3).length;
  const next = nextCategory(ctx);
  // Reviews coming up: what falls due on each of the next seven days.
  const ahead = reviewForecast(lang, cards);
  const aheadMax = Math.max(1, ...ahead.map((x) => x.n));
  const aheadTotal = ahead.reduce((n, x) => n + x.n, 0);
  const dayName = (d) => d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  // The busiest day and today carry their numbers; the rest is the shape.
  const labelled = new Set([13, busiest ? history.findIndex((x) => x.n === busiest) : -1]);

  return h('div', { class: 'view progress' },
    h('h1', null, 'Progress'),
    h('div', { class: 'stat-row' },
      stat(s.streak, 'day streak'),
      stat(s.learned, 'words learned'),
      stat(s.counts.mastered, 'mastered'),
      stat(s.due, 'due now')),
    nothingYet
      ? h('section', { class: 'card empty-state' },
        h('div', { class: 'empty-art', 'aria-hidden': 'true' }, '🌱'),
        h('h2', null, 'Your first lesson starts your chart'),
        h('p', null, `Each day you practise shows up here as a bar, and every topic fills up as you learn its words. Lessons teach ${ctx.settings.lessonSize} words at a time.`),
        h('div', { class: 'actions stack' },
          next ? h('a', { class: 'btn primary wide', href: `#/learn/${encodeURIComponent(next.id)}` }, `Start: ${next.emoji} ${next.name}`, icon('arrow', 18)) : null,
          h('a', { class: 'btn wide', href: '#/known' }, icon('check', 18), 'I already know some words')))
      : [
        h('section', { class: 'card' },
          h('h2', { class: 'card-title' }, 'Last 14 days'),
          h('div', { class: 'bars', role: 'img', 'aria-label': `Exercises per day over the last 14 days: ${history.map((x) => `${dayName(x.d)} ${x.n}`).join(', ')}` },
            history.map((x, k) => {
              const pct = Math.round((x.n / maxN) * 100);
              return h('div', { class: `bar${k === 13 ? ' today' : ''}${x.n ? '' : ' none'}`, title: `${dayName(x.d)}: ${x.n}`, style: { '--h': pct } },
                labelled.has(k) && x.n ? h('b', { class: 'bar-val', 'aria-hidden': 'true' }, String(x.n)) : null,
                h('span', { class: 'bar-fill', style: { height: `${pct}%` } }));
            })),
          h('div', { class: 'bar-days', 'aria-hidden': 'true' }, history.map((x, k) => h('small', { class: k === 13 ? 'today' : null }, x.d.toLocaleDateString(undefined, { weekday: 'narrow' })))),
          h('p', { class: 'hint chart-note' }, history[13].n
            ? `Today: ${history[13].n} exercise${history[13].n === 1 ? '' : 's'}${busiest > history[13].n ? ` · best day: ${busiest}` : ''}.`
            : `Nothing yet today${busiest ? ` · best day: ${busiest}` : ''}.`)),
        h('section', { class: 'card' },
          h('h2', { class: 'card-title' }, 'Last 6 weeks'),
          h('div', { class: 'cal-head', 'aria-hidden': 'true' }, ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x) => h('small', null, x))),
          h('div', { class: 'cal', role: 'img', 'aria-label': `The last six weeks: practised on ${activeDays} of ${past.length} days, daily goal met on ${goalDays}.` },
            weeks.map((c) => h('i', {
              class: `l${c.level}${c.today ? ' today' : ''}${c.future ? ' future' : ''}`,
              title: c.future ? null : `${dayName(c.d)}: ${c.n}${c.level === 3 ? ' · goal met' : ''}`,
            }))),
          h('p', { class: 'hint chart-note' }, `Practised on ${activeDays} of ${past.length} days · daily goal met on ${goalDays}. `,
            h('span', { class: 'cal-key', 'aria-hidden': 'true' }, 'less ', h('i', { class: 'l0' }), h('i', { class: 'l1' }), h('i', { class: 'l2' }), h('i', { class: 'l3' }), ' goal met'))),
        aheadTotal ? h('section', { class: 'card' },
          h('h2', { class: 'card-title' }, 'Reviews coming up'),
          h('div', { class: 'bars week', role: 'img', 'aria-label': `Words due for review over the next 7 days: ${ahead.map((x, k) => `${k === 0 ? 'today' : dayName(x.d)} ${x.n}`).join(', ')}` },
            ahead.map((x, k) => {
              const pct = Math.round((x.n / aheadMax) * 100);
              return h('div', { class: `bar${k === 0 ? ' today' : ''}${x.n ? '' : ' none'}`, title: `${k === 0 ? 'Today' : dayName(x.d)}: ${x.n}`, style: { '--h': pct } },
                x.n ? h('b', { class: 'bar-val', 'aria-hidden': 'true' }, String(x.n)) : null,
                h('span', { class: 'bar-fill', style: { height: `${pct}%` } }));
            })),
          h('div', { class: 'bar-days week', 'aria-hidden': 'true' }, ahead.map((x, k) => h('small', { class: k === 0 ? 'today' : null }, k === 0 ? 'Today' : x.d.toLocaleDateString(undefined, { weekday: 'short' })))),
          h('p', { class: 'hint chart-note' }, ahead[0].n
            ? `${ahead[0].n} due today (overdue ones included) · ${aheadTotal} in the next 7 days.`
            : `Nothing due today · ${aheadTotal} in the next 7 days.`)) : null,
        skillsCard(ctx),
        h('section', { class: 'card' },
          h('h2', { class: 'card-title' }, 'Mastery'),
          h('div', { class: 'stack-bar', role: 'img', 'aria-label': Object.entries(s.counts).map(([k, v]) => `${STATUS_LABEL[k]} ${v}`).join(', ') },
            ['mastered', 'known', 'familiar', 'learning', 'new'].map((k) => h('span', { class: k, style: { flex: s.counts[k] } }))),
          h('ul', { class: 'legend' }, ['mastered', 'known', 'familiar', 'learning', 'new'].map((k) =>
            h('li', null, h('i', { class: k }), `${STATUS_LABEL[k]} · ${s.counts[k]}`))),
          h('h3', { class: 'kicker' }, 'By topic'),
          h('ul', { class: 'cat-progress-list' }, lang.categories.map((c) => {
            const ws = lang.wordsIn(c.id);
            const learned = ws.filter((w) => cards[w.id]).length;
            const done = ws.length > 0 && learned >= ws.length;
            return h('li', null, h('a', {
              href: `#/topic/${encodeURIComponent(c.id)}`, class: done ? 'done' : null,
              'aria-label': `${c.name}: ${done ? 'all learned' : `${learned} of ${ws.length} learned`}`,
            },
              h('span', { class: 'cpl-icon', 'aria-hidden': 'true' }, c.emoji),
              h('span', { class: 'cpl-name' }, c.name),
              h('span', { class: 'cpl-count' }, done ? [icon('check', 14), 'Done'] : `${learned}/${ws.length}`),
              meter(learned, ws.length, done ? 'done' : '')));
          }))),
      ],
    h('section', null,
      h('div', { class: 'word-list-head' },
        h('h2', { class: 'section-title' }, 'Word list'),
        h('a', { href: '#/known', class: 'btn small' }, icon('check', 16), 'Already learned')),
      h('div', { class: 'filters' }, search, catSelect, statusSelect),
      list),
  );
}

function stat(value, label) {
  return h('div', { class: 'stat' }, h('b', null, String(value)), h('span', null, label));
}
