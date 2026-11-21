// Choose which language to learn. Progress is kept separately per language.
import { h, icon } from '../ui.js';
import { languages } from '../languages/index.js';

export function switchLanguage(ctx, code, path = '/') {
  if (code === ctx.lang.code) { ctx.go(path); return; }
  ctx.store.updateSettings({ lang: code });
  // The language pack is chosen at start-up, so reload into the new one.
  location.hash = `#${path}`;
  location.reload();
}

export function languageCards(ctx, { path = '/' } = {}) {
  return h('div', { class: 'lang-grid' }, Object.values(languages).map((l) => {
    const cards = ctx.store.getCards(l.code);
    const learned = l.words.filter((w) => cards[w.id]).length;
    const current = l.code === ctx.lang.code;
    return h('button', {
      type: 'button', class: `lang-card${current ? ' selected' : ''}`, 'aria-pressed': String(current),
      onclick: () => switchLanguage(ctx, l.code, path),
    },
      h('span', { class: 'lang-flag', 'aria-hidden': 'true' }, l.flag),
      h('span', { class: 'lang-names' },
        h('b', null, l.name),
        h('span', { lang: l.code }, l.nativeName)),
      h('small', { class: 'muted' }, learned ? `${learned}/${l.words.length} learned` : `${l.words.length} words`),
      current ? icon('check', 18) : null);
  }));
}

export default function language(ctx) {
  return h('div', { class: 'view' },
    h('h1', null, 'Languages'),
    h('p', { class: 'muted' }, 'Pick the language to study. Your progress, streak and daily goal are kept separately for each one.'),
    languageCards(ctx),
  );
}
