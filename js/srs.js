// Spaced repetition scheduling (a simplified SM-2, similar to Anki).

export const AGAIN = 0;
export const HARD = 1;
export const GOOD = 2;
export const EASY = 3;

export const DAY = 24 * 60 * 60 * 1000;
const MAX_INTERVAL = 365;

/**
 * Local midnight that starts the day of `t`, or the day `days` calendar days
 * later. It steps by calendar date (setDate), not by `days` × 24h, so a DST
 * change in between can't land the result on 23:00 the evening before or
 * 01:00 on the day.
 */
export function startOfDay(t, days = 0) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  // Snap again: if `t`'s day had no 00:00 (DST starting at midnight), the
  // first snap gave 01:00, which setDate would carry over to the new day.
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
    due: startOfDay(now, KNOWN_INTERVAL), added: now, last: now, known: true,
  };
}

/**
 * A small, repeatable spread of ±5 % (at least a day) for intervals of 4+
 * days, so the words of one lesson don't all come back on the same day. It is
 * seeded by the word id and the day, so every device that replays the same
 * review gets the same date (sync merges cards by their last review).
 */
export function fuzz(iv, seed) {
  if (iv < 4) return iv;
  const range = Math.max(1, Math.round(iv * 0.05));
  let x = 2166136261;
  for (const ch of String(seed)) x = Math.imul(x ^ ch.codePointAt(0), 16777619);
  const r = ((x >>> 0) % 1000) / 999; // 0…1
  return iv + Math.round((r * 2 - 1) * range);
}

/**
 * Return a new card state after answering with `rating`.
 *
 * Pass `{ retry: true }` when the word was already rated earlier in the same
 * session (a re-ask after a miss), or was missed earlier today (missedToday).
 * The card is rescheduled as usual, but ease and lapses stay put: SM-2 and
 * Anki charge a lapse once, and the same-day relearning drills that follow it
 * don't lower ease again.
 *
 * `{ slip: true }`: a HARD that was a typing slip (special letters or spaces
 * off): the interval grows less, but ease isn't lowered for it.
 * `{ id }`: the word id, which seeds the interval fuzz (`fuzzy: false` turns it off).
 *
 * A word recalled after a break gets credit for the time it actually held:
 * GOOD and EASY grow from the interval plus half the extra days (as Anki does).
 */
export function review(card, rating, now = Date.now(), { retry = false, slip = false, id = '', fuzzy = true } = {}) {
  const c = { ...card, last: now };

  if (rating === AGAIN) {
    c.known = false;
    if (!retry) {
      if (c.reps > 0) c.lapses += 1;
      c.ease = Math.max(1.3, c.ease - 0.2);
    }
    c.reps = 0;
    c.interval = 0;
    c.due = now; // due again right away (re-asked within the session)
    return c;
  }

  // Days since the last review, when that is longer than the interval (a late review).
  const held = card.last != null ? Math.max(c.interval, Math.round((startOfDay(now) - startOfDay(card.last)) / DAY)) : c.interval;
  const base = c.interval + (held - c.interval) / 2;
  let iv;
  let min = 1;
  if (c.reps === 0) {
    iv = rating === EASY ? 4 : 1;
  } else if (c.reps === 1) {
    iv = rating === EASY ? 7 : rating === GOOD ? 3 : 2;
  } else if (rating === HARD) {
    // Always at least a day longer: ×1.2 alone leaves an interval of 2 stuck at 2.
    iv = Math.max(c.interval + 1, Math.round(c.interval * 1.2));
    min = c.interval + 1;
  } else if (rating === GOOD) {
    iv = Math.max(c.interval + 1, Math.round(base * c.ease));
    min = c.interval + 1;
  } else {
    iv = Math.max(c.interval + 2, Math.round(base * c.ease * 1.3));
    min = c.interval + 2;
  }
  if (fuzzy) iv = Math.max(min, fuzz(iv, `${id || card.added}:${startOfDay(now)}`));

  if (!retry && !slip && rating === HARD) c.ease = Math.max(1.3, c.ease - 0.15);
  if (!retry && rating === EASY) c.ease = c.ease + 0.15;

  c.interval = Math.min(Math.max(iv, 1), MAX_INTERVAL);
  c.reps += 1;
  c.due = startOfDay(now, c.interval);
  return c;
}

export const isDue = (card, now = Date.now()) => !!card && card.due <= now;

/**
 * True when the card was missed earlier today and hasn't been passed since
 * (AGAIN is the only answer that leaves reps at 0 with `last` set). Any more
 * answers today are relearning drills, which SM-2 says don't change ease, even
 * in a fresh session such as "Keep reviewing" right after a bad one.
 */
export const missedToday = (card, now = Date.now()) =>
  !!card && card.reps === 0 && card.last != null && card.last >= startOfDay(now);

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
