import { h, icon } from '../ui.js';
import { audioControls, pronunciationPanel, speakPractice, exampleBlock, readingLine, registerBlock, regBadge, sayLater, backLink, favButton } from '../components.js';
import { status, STATUS_LABEL, markKnown } from '../srs.js';
import { rich } from './grammar.js';

export default function word(ctx, id) {
  const { lang, store } = ctx;
  const w = lang.byId(id);
  if (!w) {
    return h('div', { class: 'view' },
      backLink(ctx, '#/progress', 'Word list'),
      h('div', { class: 'summary' },
        h('h1', null, 'Word not found'), h('a', { class: 'btn primary', href: '#/progress' }, 'Go to the word list')));
  }
  const card = store.getCard(lang.code, w.id);
  const st = status(card);
  const cat = lang.categories.find((c) => c.id === w.cat);
  if (ctx.settings.autoplay) sayLater(ctx, w.tr);

  return h('div', { class: 'view' },
    backLink(ctx, '#/progress', 'Word list'),
    h('article', { class: 'card word-detail' },
      h('div', { class: 'detail-meta' },
        h('span', { class: `badge ${st}` }, STATUS_LABEL[st]),
        cat ? h('a', { href: `#/topic/${encodeURIComponent(cat.id)}`, class: 'detail-topic' }, `${cat.emoji} ${cat.name}`) : null,
        favButton(ctx, w)),
      h('div', { class: 'word-hero' },
        h('h1', { class: 'hero-tr', lang: lang.code }, w.tr),
        readingLine(ctx, w),
        h('p', { class: 'hero-en' }, w.en, ' ', regBadge(w))),
      audioControls(ctx, w),
      pronunciationPanel(ctx, w),
      registerBlock(ctx, w),
      exampleBlock(ctx, w),
      w.note ? h('p', { class: 'note' }, rich(w.note, lang.code)) : null,
      st === 'new'
        ? h('button', {
          type: 'button', class: 'btn small',
          onclick: () => { store.setCard(lang.code, w.id, markKnown()); ctx.toast('Marked as already learned'); ctx.rerender(); },
        }, icon('check', 16), 'Already learned')
        : null,
      st === 'known'
        ? h('p', { class: 'hint' }, 'You marked this as already learned. ',
          h('button', {
            type: 'button', class: 'link-btn',
            onclick: () => { store.deleteCard(lang.code, w.id); ctx.toast('Moved back to new words'); ctx.rerender(); },
          }, 'Undo — I want to learn it'))
        : null,
      card ? h('p', { class: 'hint' }, card.due <= Date.now()
        ? 'Due for review now.'
        : `Next review: ${new Date(card.due).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}.`) : null,
    ),
    h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, 'Practise saying it'),
      speakPractice(ctx, w)),
  );
}
