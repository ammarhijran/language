import { h, icon } from '../ui.js';
import { audioControls, pronunciationPanel, speakPractice, exampleBlock, readingLine, registerBlock, regBadge } from '../components.js';
import { status, STATUS_LABEL, markKnown } from '../srs.js';

export default function word(ctx, id) {
  const { lang, store } = ctx;
  const w = lang.byId(id);
  if (!w) {
    return h('div', { class: 'view' }, h('div', { class: 'summary' },
      h('h2', null, 'Word not found'), h('a', { class: 'btn primary', href: '#/progress' }, 'Go to the word list')));
  }
  const card = store.getCard(lang.code, w.id);
  const st = status(card);
  const cat = lang.categories.find((c) => c.id === w.cat);
  if (ctx.settings.autoplay) setTimeout(() => ctx.say(w.tr), 300);

  return h('div', { class: 'view' },
    h('a', { href: '#/progress', class: 'back-link' }, icon('back', 16), 'Word list'),
    h('article', { class: 'card word-detail' },
      h('div', { class: 'detail-meta' },
        h('span', { class: `badge ${st}` }, STATUS_LABEL[st]),
        h('a', { href: `#/learn/${cat.id}`, class: 'muted small' }, `${cat.emoji} ${cat.name}`)),
      h('div', { class: 'word-hero' },
        h('h1', { class: 'hero-tr', lang: lang.code }, w.tr),
        readingLine(ctx, w),
        h('p', { class: 'hero-en' }, w.en, ' ', regBadge(w))),
      audioControls(ctx, w.tr),
      pronunciationPanel(ctx, w),
      registerBlock(ctx, w),
      exampleBlock(ctx, w),
      w.note ? h('p', { class: 'note' }, w.note) : null,
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
