import { h, icon, shuffle } from '../ui.js';
import { categoryCard, categorySections, grammarLink } from '../components.js';
import { runSession } from '../session.js';
import { newCard, review, markKnown, GOOD, AGAIN } from '../srs.js';
import { recognitionSupported } from '../speech.js';
import { lessonDrillHref } from './pronounce.js';
import { readLink } from '../reader.js';

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

  const known = [];

  return h('div', { class: 'view' }, runSession(ctx, {
    label: `Lesson: ${cat.name}`,
    exitHref: '#/learn',
    items,
    onResult(item, r) {
      if (r.known) {
        store.setCard(lang.code, item.word.id, markKnown());
        known.push(item.word);
        return { drop: true };
      }
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
      if (added) ctx.game.learned({ lang: lang.code, count: added });
      const remaining = all.filter((w) => !store.getCard(lang.code, w.id)).length;
      const learnedNow = batch.filter((w) => !known.includes(w));
      const chips = (list) => h('ul', { class: 'word-chips' }, list.map((w) =>
        h('li', null, h('a', { href: `#/word/${encodeURIComponent(w.id)}` }, h('b', { lang: lang.code }, w.tr), ' ', h('span', null, w.en)))));
      return h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, learnedNow.length ? '🎉' : '💪'),
        h('h2', null, 'Lesson complete!'),
        learnedNow.length
          ? h('p', { class: 'muted' }, `You learned ${learnedNow.length} new word${learnedNow.length === 1 ? '' : 's'}. They’ll come back for review tomorrow.`)
          : null,
        learnedNow.length ? chips(learnedNow) : null,
        known.length
          ? h('p', { class: 'muted' }, `Marked ${known.length} as already learned — they’ll only come back for a quick check in about a month.`)
          : null,
        known.length ? chips(known) : null,
        h('div', { class: 'actions stack' },
          remaining
            ? h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, `Next ${Math.min(remaining, ctx.settings.lessonSize)} words`, icon('arrow', 18))
            : h('a', { class: 'btn primary wide', href: '#/learn' }, 'Choose another topic'),
          sayThemLink(batch),
          h('a', { class: 'btn ghost wide', href: '#/' }, 'Back home'),
        ),
      );
    },
  }));
}

/**
 * After a lesson: drill saying exactly the words it taught. Without speech
 * recognition the drill still works for listening and recording yourself,
 * so the link says that instead of promising a score.
 */
function sayThemLink(words) {
  const scored = recognitionSupported();
  return h('a', { class: 'btn wide', href: lessonDrillHref(words) },
    icon(scored ? 'mic' : 'volume', 18), scored ? 'Practise saying them' : 'Listen and repeat them');
}

function picker(ctx) {
  return h('div', { class: 'view' },
    h('h1', null, 'Learn'),
    h('p', { class: 'muted' }, `Pick a topic. Each lesson introduces ${ctx.settings.lessonSize} words or phrases with audio and pronunciation tips, then checks you remember them.`),
    grammarLink(ctx),
    readLink(ctx),
    categorySections(ctx),
    h('a', { class: 'quick-link known-link', href: '#/known' },
      icon('check', 22),
      h('span', null, h('b', null, 'Already know some words?'), h('small', null, 'Mark them as already learned and lessons will skip them'))),
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
        h('a', { class: 'btn wide', href: `#/known/${cat.id}` }, 'Edit “already learned” words'),
        h('a', { class: 'btn ghost wide', href: '#/learn' }, 'Choose another topic')),
    ),
  );
}
