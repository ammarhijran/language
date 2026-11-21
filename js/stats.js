// Derived numbers used across views.
import { isDue, status } from './srs.js';
import { recognitionSupported } from './speech.js';

export function dueWords(ctx, now = Date.now()) {
  const { lang, store } = ctx;
  const cards = store.getCards(lang.code);
  return lang.words
    .map((word) => ({ word, card: cards[word.id] }))
    .filter(({ card }) => isDue(card, now))
    .sort((a, b) => a.card.due - b.card.due);
}

export function learnedWords(ctx) {
  const cards = ctx.store.getCards(ctx.lang.code);
  return ctx.lang.words.filter((w) => cards[w.id]);
}

export function computeStats(ctx) {
  const { lang, store } = ctx;
  const cards = store.getCards(lang.code);
  const counts = { new: 0, learning: 0, familiar: 0, mastered: 0 };
  for (const w of lang.words) counts[status(cards[w.id])]++;
  const today = store.getDay(lang.code) || {};
  return {
    total: lang.words.length,
    learned: lang.words.length - counts.new,
    counts,
    due: dueWords(ctx).length,
    streak: store.streak(lang.code),
    today,
  };
}

/** First category that still has unseen words. */
export function nextCategory(ctx) {
  const cards = ctx.store.getCards(ctx.lang.code);
  return ctx.lang.categories.find((c) => ctx.lang.wordsIn(c.id).some((w) => !cards[w.id]));
}

/** Exercise type for a review, based on how well the word is known. */
export function chooseReviewType(card) {
  const speak = recognitionSupported();
  let pool;
  if (card.reps <= 1) pool = ['listen', 'meaning', 'produce'];
  else if (card.reps <= 3) pool = ['produce', 'listen', 'flashcard', ...(speak ? ['speak'] : [])];
  else pool = ['type', 'flashcard', 'listen', ...(speak ? ['speak', 'speak'] : ['type'])];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function wordOfTheDay(ctx, d = new Date()) {
  const day = Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  const withExamples = ctx.lang.words.filter((w) => w.ex);
  const words = withExamples.length >= 30 ? withExamples : ctx.lang.words;
  return words[(day * 7919) % words.length];
}
