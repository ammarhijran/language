// Spaced repetition scheduling (a simplified SM-2, similar to Anki).

export const AGAIN = 0;
export const HARD = 1;
export const GOOD = 2;
export const EASY = 3;

export const DAY = 24 * 60 * 60 * 1000;
const MAX_INTERVAL = 365;

export function startOfDay(t) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function newCard(now = Date.now()) {
  return { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: now, added: now, last: null };
}

/**
 * A word the learner says they "already learned": skip the lessons and only
 * check it again in about a month. Getting it wrong later turns it back into a
 * normal learning card.
 */
export const KNOWN_INTERVAL = 30;
export function markKnown(now = Date.now()) {
  return {
    ease: 2.5, interval: KNOWN_INTERVAL, reps: 3, lapses: 0,
    due: startOfDay(now) + KNOWN_INTERVAL * DAY, added: now, last: now, known: true,
  };
}

/** Return a new card state after answering with `rating`. */
export function review(card, rating, now = Date.now()) {
  const c = { ...card, last: now };

  if (rating === AGAIN) {
    c.known = false;
    if (c.reps > 0) c.lapses += 1;
    c.reps = 0;
    c.interval = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.due = now; // due again right away (re-asked within the session)
    return c;
  }

  let iv;
  if (c.reps === 0) {
    iv = rating === EASY ? 4 : 1;
  } else if (c.reps === 1) {
    iv = rating === EASY ? 7 : rating === GOOD ? 3 : 2;
  } else if (rating === HARD) {
    iv = Math.max(c.interval, Math.round(c.interval * 1.2));
  } else if (rating === GOOD) {
    iv = Math.max(c.interval + 1, Math.round(c.interval * c.ease));
  } else {
    iv = Math.max(c.interval + 2, Math.round(c.interval * c.ease * 1.3));
  }

  if (rating === HARD) c.ease = Math.max(1.3, c.ease - 0.15);
  if (rating === EASY) c.ease = c.ease + 0.15;

  c.interval = Math.min(Math.max(iv, 1), MAX_INTERVAL);
  c.reps += 1;
  c.due = startOfDay(now) + c.interval * DAY;
  return c;
}

export const isDue = (card, now = Date.now()) => !!card && card.due <= now;

/** new → learning → familiar → mastered, plus "known" (marked as already learned) */
export function status(card) {
  if (!card) return 'new';
  if (card.known) return 'known';
  if (card.reps === 0 || card.interval < 3) return 'learning';
  if (card.interval < 21) return 'familiar';
  return 'mastered';
}

export const STATUS_LABEL = {
  new: 'New',
  learning: 'Learning',
  familiar: 'Familiar',
  mastered: 'Mastered',
  known: 'Already learned',
};
