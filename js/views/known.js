// "Already learned": tick off words you already know so lessons skip them.
import { h, icon, set } from '../ui.js';
import { playButton } from '../components.js';
import { markKnown, status, STATUS_LABEL } from '../srs.js';

export default function known(ctx, catId) {
  const { lang, store } = ctx;
  const cat = lang.categories.find((c) => c.id === catId) || lang.categories[0];
  const words = lang.wordsIn(cat.id);
  const list = h('ul', { class: 'known-list' });
  const summary = h('p', { class: 'hint', 'aria-live': 'polite' });
  const saveBtn = h('button', { type: 'button', class: 'btn primary wide', onclick: save });

  // Words being learned through lessons/reviews keep their schedule and can't be ticked here.
  const inProgress = (w) => {
    const st = status(store.getCard(lang.code, w.id));
    return st !== 'new' && st !== 'known';
  };
  const initial = new Set(words.filter((w) => status(store.getCard(lang.code, w.id)) === 'known').map((w) => w.id));
  const selected = new Set(initial);

  function changes() {
    const add = [...selected].filter((id) => !initial.has(id));
    const remove = [...initial].filter((id) => !selected.has(id));
    return { add, remove };
  }

  function refresh() {
    const { add, remove } = changes();
    const n = add.length + remove.length;
    saveBtn.disabled = n === 0;
    set(saveBtn, icon('check', 18), n === 0
      ? 'No changes'
      : [add.length ? `Mark ${add.length} as already learned` : null, add.length && remove.length ? ' · ' : null, remove.length ? `Unmark ${remove.length}` : null]);
    const free = words.filter((w) => !inProgress(w));
    set(summary, `${selected.size} of ${free.length} available words ticked`);
  }

  function row(w) {
    const busy = inProgress(w);
    const box = h('input', {
      type: 'checkbox', checked: selected.has(w.id), disabled: busy,
      'aria-label': `${w.tr} — ${w.en}`,
      onchange: (e) => { if (e.target.checked) selected.add(w.id); else selected.delete(w.id); refresh(); },
    });
    return h('li', { class: busy ? 'busy' : '' },
      h('label', { class: 'known-row' },
        box,
        h('span', { class: 'known-text' }, h('b', { lang: lang.code }, w.tr), h('span', { class: 'muted' }, w.en))),
      busy ? h('span', { class: `badge ${status(store.getCard(lang.code, w.id))}` }, STATUS_LABEL[status(store.getCard(lang.code, w.id))]) : null,
      playButton(ctx, w.tr));
  }

  function selectAll(on) {
    for (const w of words) if (!inProgress(w)) { if (on) selected.add(w.id); else selected.delete(w.id); }
    set(list, words.map(row));
    refresh();
  }

  function save() {
    const { add, remove } = changes();
    for (const id of add) store.setCard(lang.code, id, markKnown());
    for (const id of remove) store.deleteCard(lang.code, id);
    ctx.toast(add.length ? `Marked ${add.length} word${add.length === 1 ? '' : 's'} as already learned` : 'Saved');
    ctx.go(`/learn/${cat.id}`);
  }

  set(list, words.map(row));
  refresh();

  return h('div', { class: 'view' },
    h('a', { href: '#/learn', class: 'back-link' }, icon('back', 16), 'Learn'),
    h('h1', null, 'Already learned'),
    h('p', { class: 'muted' }, 'Tick the words you already know. Lessons will skip them, and they’ll only come back for a quick check in about a month — if you get one wrong then, it goes back into normal practice.'),
    h('label', { class: 'field' }, h('span', null, 'Topic'),
      h('select', { class: 'select', onchange: (e) => ctx.go(`/known/${e.target.value}`) },
        lang.categories.map((c) => h('option', { value: c.id, selected: c.id === cat.id }, `${c.emoji} ${c.name}`)))),
    h('div', { class: 'known-tools' },
      h('button', { type: 'button', class: 'btn small', onclick: () => selectAll(true) }, 'Tick all'),
      h('button', { type: 'button', class: 'btn small', onclick: () => selectAll(false) }, 'Clear'),
      summary),
    list,
    h('div', { class: 'actions sticky' }, saveBtn),
  );
}
