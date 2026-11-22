// Phrasebook: every ready-made phrase and everyday expression, by situation,
// with search, ★ saved entries first, the polite ⇄ everyday (Arabic: Standard
// ⇄ Egyptian) form of each, and Show mode (big letters, to show someone).
import { h, icon, set, debounce } from '../ui.js';
import { phraseRow, showMode, devicePref, setDevicePref, pairToggleLabel, glyph } from '../components.js';
import { rankEntries } from './search.js';

const PHRASE_GROUPS = new Set(['phrases', 'talk']);

export default function phrases(ctx, chipArg, queryArg = '') {
  const { lang, store } = ctx;
  const cats = lang.categories.filter((c) => PHRASE_GROUPS.has(c.group));
  const entries = lang.words.filter((w) => cats.some((c) => c.id === w.cat));
  const saved = () => store.getFavs(lang.code).map((id) => lang.byId(id)).filter(Boolean);
  const valid = (id) => id === 'saved' || cats.some((c) => c.id === id);
  const remembered = devicePref('phraseChip', null);
  let chip = valid(chipArg) ? chipArg : valid(remembered) ? remembered : saved().length ? 'saved' : cats[0]?.id || 'saved';
  let query = String(queryArg || '');
  const pairsPref = () => devicePref('pairs', null);
  const catOf = (id) => cats.find((c) => c.id === id);
  // Talk like a local is about the two ways of saying things: shown by default there.
  let pairs = pairsPref() == null ? catOf(chip)?.group === 'talk' : !!pairsPref();
  let current = [];

  const list = h('ul', { class: 'phrase-list' });
  const heading = h('h2', { class: 'section-title phrase-heading' });
  const note = h('div', { class: 'phrase-note' });

  const chipButtons = new Map();
  const chipFor = (id, label, extra = {}) => {
    const b = h('button', {
      type: 'button', class: 'pill chip-tab', 'aria-pressed': String(id === chip), ...extra,
      onclick: () => {
        chip = id;
        setDevicePref('phraseChip', id);
        if (pairsPref() == null) { pairs = catOf(id)?.group === 'talk'; paintPairBtn(); }
        if (query) { query = ''; input.value = ''; }
        paint();
      },
    }, label);
    chipButtons.set(id, b);
    return b;
  };
  const savedLabel = () => `★ Saved (${saved().length})`;
  const chips = h('div', { class: 'chip-scroll', role: 'group', 'aria-label': 'Situations' },
    chipFor('saved', savedLabel(), { class: 'pill chip-tab saved-chip' }),
    cats.map((c) => chipFor(c.id, `${c.emoji} ${c.name}`)));

  const input = h('input', {
    type: 'search', class: 'search', value: query, enterkeyhint: 'search',
    placeholder: `Find a phrase in ${lang.name} or English…`, 'aria-label': 'Search the phrasebook',
    autocomplete: 'off', spellcheck: 'false',
    oninput: (e) => { query = e.target.value; later(); },
    onkeydown: (e) => { if (e.key === 'Enter') { later.cancel(); paint(); input.blur(); } },
  });
  const later = debounce(() => paint(), 160);
  ctx.onCleanup(() => later.cancel());

  const pairBtn = h('button', {
    type: 'button', class: 'pill toggle',
    title: lang.code === 'ar' ? 'Show the Egyptian / Standard Arabic form of each phrase' : 'Show the polite / everyday form of each phrase',
    onclick: () => { pairs = !pairs; setDevicePref('pairs', pairs); paintPairBtn(); paintList(); },
  }, glyph('swap', 16), pairToggleLabel(lang));
  function paintPairBtn() {
    pairBtn.classList.toggle('selected', pairs);
    pairBtn.setAttribute('aria-pressed', String(pairs));
  }
  paintPairBtn();
  const showBtn = h('button', {
    type: 'button', class: 'pill', title: 'Show these one by one in big letters, to show someone',
    onclick: () => showMode(ctx, current, 0),
  }, glyph('expand', 16), 'Show');

  function paintList() {
    set(list, current.map((w) => phraseRow(ctx, w, { pairs, onShow: (word) => showMode(ctx, current, current.indexOf(word)) })));
  }

  function paint() {
    const q = query.trim();
    chipButtons.forEach((b, id) => b.setAttribute('aria-pressed', String(!q && id === chip)));
    ctx.setPath(`/phrases/${encodeURIComponent(chip)}${q ? `/${encodeURIComponent(q)}` : ''}`);
    if (q) {
      const favs = saved().filter((w) => !entries.includes(w));
      current = rankEntries(lang, q, { among: [...entries, ...favs] }).map((r) => r.word);
      set(heading, current.length ? `${current.length} found for “${q}”` : `Nothing in the phrasebook for “${q}”`);
      set(note, h('a', { class: 'small', href: `#/search/${encodeURIComponent(q)}` }, icon('search', 14), ` Search all words for “${q}”`));
    } else if (chip === 'saved') {
      current = saved();
      set(heading, '★ Saved');
      set(note, current.length >= 4 ? h('p', { class: 'hint' }, h('a', { href: '#/practice/handsfree/saved' }, 'Listen to them hands-free')) : current.length ? null : h('p', { class: 'muted empty-note' }, 'Nothing saved yet. Tap ☆ next to any phrase (or any word in a topic) to keep it here — handy before a trip.'));
    } else {
      const cat = catOf(chip);
      current = lang.wordsIn(chip);
      set(heading, `${cat.emoji} ${cat.name}`);
      set(note, h('p', { class: 'hint' }, h('span', { lang: lang.code }, cat.native), ' · ',
        h('a', { href: `#/topic/${encodeURIComponent(cat.id)}` }, 'Learn these'), ' · ',
        h('a', { href: `#/practice/mixed/${encodeURIComponent(cat.id)}` }, 'Practise'), ' · ',
        h('a', { href: `#/practice/handsfree/${encodeURIComponent(cat.id)}` }, 'Listen hands-free')));
    }
    showBtn.disabled = !current.length;
    paintList();
  }

  // ★ toggled in a row: keep the Saved count current (rows stay until the list is redrawn).
  const onFav = (e) => {
    if (e.detail?.lang !== lang.code) return;
    chipButtons.get('saved').textContent = savedLabel();
  };
  window.addEventListener('lisan:fav', onFav);
  ctx.onCleanup(() => window.removeEventListener('lisan:fav', onFav));

  paint();
  // The chosen situation in view in the scrolling row.
  setTimeout(() => chipButtons.get(chip)?.scrollIntoView?.({ block: 'nearest', inline: 'center' }), 0);

  return h('div', { class: 'view phrasebook' },
    h('div', { class: 'title-row' },
      h('h1', null, 'Phrasebook'),
      h('a', { class: 'btn small', href: '#/search' }, icon('search', 16), 'All words')),
    h('p', { class: 'muted' }, `${entries.length} ready-to-use phrases and everyday expressions in ${cats.length} situations. Tap one to hear it, ☆ to save it.`),
    h('div', { class: 'search-bar' }, icon('search'), input),
    chips,
    h('div', { class: 'list-head' }, heading, h('div', { class: 'button-row' }, pairBtn, showBtn)),
    note,
    list,
  );
}
