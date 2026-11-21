import { h, icon, shuffle } from '../ui.js';
import { runSession } from '../session.js';
import { newCard, review as schedule, missedToday, AGAIN, startOfDay } from '../srs.js';
import { dueWords, chooseReviewType, nextCategory } from '../stats.js';

const EASIER = { type: 'produce', speak: 'produce', flashcard: 'produce', produce: 'meaning', listen: 'meaning', meaning: 'produce' };

export default function review(ctx) {
  const { lang, store } = ctx;
  const due = dueWords(ctx);

  if (!due.length) return empty(ctx);

  const items = shuffle(due.slice(0, ctx.settings.sessionSize))
    .map(({ word, card }) => ({ word, type: chooseReviewType(card, word) }));
  const firstTry = new Map();

  return h('div', { class: 'view' }, runSession(ctx, {
    label: 'Review',
    items,
    onResult(item, r) {
      if (r.skipped) return { ...item, type: 'flashcard' };
      const now = Date.now();
      const card = store.getCard(lang.code, item.word.id) || newCard(now);
      // Only a word's first rating may change its ease. The easier re-asks
      // after a miss, and any session later the same day that brings the
      // missed word back, just reschedule it.
      const seen = firstTry.has(item.word.id);
      const retry = seen || missedToday(card, now);
      store.setCard(lang.code, item.word.id, schedule(card, r.rating, now, { retry }));
      store.logActivity(lang.code, { reviews: 1, correct: r.correct ? 1 : 0 });
      if (!seen) firstTry.set(item.word.id, r.correct);
      if (r.rating === AGAIN) {
        const retries = (item.retries || 0) + 1;
        if (retries <= 2) return { word: item.word, type: EASIER[item.type] || 'meaning', retries };
      }
      return null;
    },
    onFinish() {
      const n = firstTry.size;
      const right = [...firstTry.values()].filter(Boolean).length;
      const tomorrow = startOfDay(Date.now(), 2); // end of tomorrow, by the calendar
      const comingUp = Object.values(store.getCards(lang.code)).filter((c) => c.due < tomorrow).length;
      return h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === n ? '🏆' : '💪'),
        h('h2', null, 'Review complete'),
        h('p', { class: 'big-number' }, `${n ? Math.round((right / n) * 100) : 0}%`),
        h('p', { class: 'muted' }, `${right} of ${n} right on the first try. ${comingUp} word${comingUp === 1 ? '' : 's'} due by tomorrow.`),
        h('div', { class: 'actions stack' },
          dueWords(ctx).length
            ? h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Keep reviewing', icon('arrow', 18))
            : h('a', { class: 'btn primary wide', href: nextCategory(ctx) ? `#/learn/${nextCategory(ctx).id}` : '#/practice' }, 'Learn something new'),
          h('a', { class: 'btn wide', href: '#/speak/drill' }, icon('mic', 18), 'Speaking drill'),
          h('a', { class: 'btn ghost wide', href: '#/' }, 'Back home')),
      );
    },
  }));
}

function empty(ctx) {
  const learned = Object.keys(ctx.store.getCards(ctx.lang.code)).length;
  const next = nextCategory(ctx);
  return h('div', { class: 'view' },
    h('div', { class: 'summary' },
      h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, learned ? '✅' : '🌱'),
      h('h2', null, learned ? 'Nothing to review right now' : 'No words to review yet'),
      h('p', { class: 'muted' }, learned
        ? 'Words come back just before you’re likely to forget them. Check back later — or keep going:'
        : 'Learn a few words first and they’ll show up here for spaced-repetition review.'),
      h('div', { class: 'actions stack' },
        next ? h('a', { class: 'btn primary wide', href: `#/learn/${next.id}` }, `Learn: ${next.emoji} ${next.name}`) : null,
        learned ? h('a', { class: 'btn wide', href: '#/practice' }, 'Practise anyway') : null,
        h('a', { class: 'btn ghost wide', href: '#/speak' }, 'Pronunciation lab')),
    ),
  );
}
