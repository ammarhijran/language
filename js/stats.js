// Derived numbers used across views.
import { isDue, status } from './srs.js';
import { recognitionSupported } from './speech.js';
import { phraseSentence } from './sentences.js';

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
  const counts = { new: 0, learning: 0, familiar: 0, mastered: 0, known: 0 };
  for (const w of lang.words) counts[status(cards[w.id])]++;
  const today = store.getDay(lang.code); // summed over devices
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

const FAMILIAR = new Set(['familiar', 'mastered', 'known']);

/** Exercise type for a review, based on how well the word is known (pass `lang` to allow sentence building). */
export function chooseReviewType(card, word, lang) {
  const speak = recognitionSupported();
  // Typing a whole sentence is tedious: phrases are practised by choice, recall and speaking.
  const long = word && (word.tr.trim().split(/\s+/).length > 3 || word.tr.length > 24);
  let pool;
  if (card.reps <= 1) pool = ['listen', 'meaning', 'produce'];
  else if (card.reps <= 3) pool = ['produce', 'listen', 'flashcard', ...(speak ? ['speak'] : [])];
  else pool = ['type', 'flashcard', 'listen', ...(speak ? ['speak', 'speak'] : ['type'])];
  if (long) pool = pool.filter((t) => t !== 'type').concat(['produce']);
  // A phrase the learner already knows fairly well is sometimes built from
  // shuffled words instead: recall of its word order, not just its meaning.
  if (lang && word && FAMILIAR.has(status(card)) && phraseSentence(lang, word)) pool.push('build');
  return pool[Math.floor(Math.random() * pool.length)];
}

export function wordOfTheDay(ctx, d = new Date()) {
  const day = Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  const withExamples = ctx.lang.words.filter((w) => w.ex);
  const words = withExamples.length >= 30 ? withExamples : ctx.lang.words;
  return words[(day * 7919) % words.length];
}
