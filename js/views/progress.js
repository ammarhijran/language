import { h, icon, meter, set } from '../ui.js';
import { computeStats } from '../stats.js';
import { status, STATUS_LABEL, DAY } from '../srs.js';
import { playButton } from '../components.js';

export default function progress(ctx, catFilter) {
  const { lang, store } = ctx;
  const s = computeStats(ctx);
  const cards = store.getCards(lang.code);
  const days = store.getDays(lang.code);

  // Last 14 days of activity.
  const today = new Date();
  const history = Array.from({ length: 14 }, (_, k) => {
    const d = new Date(today.getTime() - (13 - k) * DAY);
    const rec = days[store.dayKey(d)] || {};
    return { d, n: (rec.reviews || 0) + (rec.learned || 0) + (rec.practiced || 0) };
  });
  const maxN = Math.max(5, ...history.map((x) => x.n));

  let query = '';
  let filter = 'all';
  let cat = lang.categories.some((c) => c.id === catFilter) ? catFilter : 'all';
  const list = h('ul', { class: 'word-list' });

  function renderList() {
    const rows = lang.words.filter((w) => {
      if (cat !== 'all' && w.cat !== cat) return false;
      if (filter !== 'all' && status(cards[w.id]) !== filter) return false;
      return lang.matches(w, query);
    });
    set(list, ...(rows.length ? rows.map((w) => {
      const st = status(cards[w.id]);
      return h('li', null,
        playButton(ctx, w.tr),
        h('a', { href: `#/word/${encodeURIComponent(w.id)}`, class: 'word-row' },
          h('b', { lang: lang.code }, w.tr),
          h('span', { class: 'muted' }, w.en)),
        h('span', { class: `badge ${st}` }, STATUS_LABEL[st]));
    }) : [h('li', { class: 'muted empty' }, 'No words match.')]));
  }

  const search = h('input', {
    type: 'search', class: 'search', placeholder: `Search ${lang.name} or English…`, 'aria-label': 'Search words',
    oninput: (e) => { query = e.target.value.trim(); renderList(); },
  });
  const statusSelect = h('select', { class: 'select', 'aria-label': 'Filter by status', onchange: (e) => { filter = e.target.value; renderList(); } },
    h('option', { value: 'all' }, 'All statuses'),
    Object.entries(STATUS_LABEL).map(([k, v]) => h('option', { value: k }, v)));
  const catSelect = h('select', { class: 'select', 'aria-label': 'Filter by topic', onchange: (e) => { cat = e.target.value; renderList(); } },
    h('option', { value: 'all' }, 'All topics'),
    lang.categories.map((c) => h('option', { value: c.id, selected: c.id === cat }, `${c.emoji} ${c.name}`)));

  renderList();

  return h('div', { class: 'view' },
    h('div', { class: 'title-row' }, h('h1', null, 'Progress'),
      h('div', { class: 'button-row' },
        h('a', { href: '#/known', class: 'btn small' }, icon('check', 16), 'Already learned'),
        h('a', { href: '#/settings', class: 'btn small' }, icon('settings', 16), 'Settings'))),
    h('div', { class: 'stat-row' },
      stat(s.streak, 'day streak'),
      stat(s.learned, 'words learned'),
      stat(s.counts.mastered, 'mastered'),
      stat(s.due, 'due now')),
    h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, 'Last 14 days'),
      h('div', { class: 'bars', role: 'img', 'aria-label': `Activity over the last 14 days: ${history.map((x) => x.n).join(', ')}` },
        history.map((x, k) => h('div', { class: `bar${k === 13 ? ' today' : ''}`, title: `${x.d.toLocaleDateString()}: ${x.n}` },
          h('span', { style: { height: `${(x.n / maxN) * 100}%` } }),
          h('small', null, x.d.toLocaleDateString(undefined, { weekday: 'narrow' })))))),
    h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, 'Mastery'),
      h('div', { class: 'stack-bar', role: 'img', 'aria-label': Object.entries(s.counts).map(([k, v]) => `${STATUS_LABEL[k]} ${v}`).join(', ') },
        ['mastered', 'known', 'familiar', 'learning', 'new'].map((k) => h('span', { class: k, style: { flex: s.counts[k] } }))),
      h('ul', { class: 'legend' }, ['mastered', 'known', 'familiar', 'learning', 'new'].map((k) =>
        h('li', null, h('i', { class: k }), `${STATUS_LABEL[k]} · ${s.counts[k]}`))),
      h('ul', { class: 'cat-progress-list' }, lang.categories.map((c) => {
        const ws = lang.wordsIn(c.id);
        const learned = ws.filter((w) => cards[w.id]).length;
        return h('li', null,
          h('a', { href: `#/learn/${c.id}` }, `${c.emoji} ${c.name}`),
          meter(learned, ws.length),
          h('span', { class: 'muted small' }, `${learned}/${ws.length}`));
      }))),
    h('section', null,
      h('h2', { class: 'section-title' }, 'Word list'),
      h('div', { class: 'filters' }, search, catSelect, statusSelect),
      list),
  );
}

function stat(value, label) {
  return h('div', { class: 'stat' }, h('b', null, String(value)), h('span', null, label));
}
