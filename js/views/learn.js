import { h, icon, shuffle } from '../ui.js';
import { categoryCard } from '../components.js';
import { runSession } from '../session.js';
import { newCard, review, GOOD, AGAIN } from '../srs.js';

export default function learn(ctx, catId) {
  const { lang, store } = ctx;
  const cat = lang.categories.find((c) => c.id === catId);
  if (!cat) return picker(ctx);

  const all = lang.wordsIn(cat.id);
  const unseen = all.filter((w) => !store.getCard(lang.code, w.id));
  if (!unseen.length) return finished(ctx, cat);

  const batch = unseen.slice(0, ctx.settings.lessonSize);
  const items = [
    ...batch.map((word, index) => ({ word, type: 'intro', meta: { index, total: batch.length } })),
    ...shuffle(batch).map((word, i) => ({ word, type: i % 2 ? 'produce' : 'listen' })),
  ];

  return h('div', { class: 'view' }, runSession(ctx, {
    label: `Lesson: ${cat.name}`,
    exitHref: '#/learn',
    items,
    onResult(item, r) {
      if (r.intro || r.rating !== AGAIN) return null;
      const retries = (item.retries || 0) + 1;
      return retries <= 2 ? { word: item.word, type: item.type === 'listen' ? 'meaning' : 'produce', retries } : null;
    },
    onFinish() {
      const now = Date.now();
      let added = 0;
      for (const w of batch) {
        if (!store.getCard(lang.code, w.id)) {
          store.setCard(lang.code, w.id, review(newCard(now), GOOD, now));
          added++;
        }
      }
      if (added) store.logActivity(lang.code, { learned: added });
      const remaining = all.filter((w) => !store.getCard(lang.code, w.id)).length;
      return h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, '🎉'),
        h('h2', null, 'Lesson complete!'),
        h('p', { class: 'muted' }, `You learned ${batch.length} new word${batch.length === 1 ? '' : 's'}. They’ll come back for review tomorrow.`),
        h('ul', { class: 'word-chips' }, batch.map((w) =>
          h('li', null, h('a', { href: `#/word/${encodeURIComponent(w.id)}` }, h('b', { lang: lang.code }, w.tr), ' ', h('span', null, w.en))))),
        h('div', { class: 'actions stack' },
          remaining
            ? h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, `Next ${Math.min(remaining, ctx.settings.lessonSize)} words`, icon('arrow', 18))
            : h('a', { class: 'btn primary wide', href: '#/learn' }, 'Choose another topic'),
          h('a', { class: 'btn wide', href: `#/practice/speak/${cat.id}` }, icon('mic', 18), 'Practise saying them'),
          h('a', { class: 'btn ghost wide', href: '#/' }, 'Back home'),
        ),
      );
    },
  }));
}

function picker(ctx) {
  return h('div', { class: 'view' },
    h('h1', null, 'Learn'),
    h('p', { class: 'muted' }, `Pick a topic. Each lesson introduces ${ctx.settings.lessonSize} words with audio, syllables and pronunciation tips, then checks you remember them.`),
    h('div', { class: 'cat-grid' }, ctx.lang.categories.map((c) => categoryCard(ctx, c))),
  );
}

function finished(ctx, cat) {
  return h('div', { class: 'view' },
    h('div', { class: 'summary' },
      h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, cat.emoji),
      h('h2', null, `You’ve learned every word in ${cat.name}`),
      h('p', { class: 'muted' }, 'They’ll keep coming back in reviews. You can also practise them any time.'),
      h('div', { class: 'actions stack' },
        h('a', { class: 'btn primary wide', href: `#/practice/mixed/${cat.id}` }, 'Practise this topic'),
        h('a', { class: 'btn wide', href: `#/progress/${cat.id}` }, 'See the word list'),
        h('a', { class: 'btn ghost wide', href: '#/learn' }, 'Choose another topic')),
    ),
  );
}
