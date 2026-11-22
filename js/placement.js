// Placement check: a short quiz over the first word topics for someone who
// already knows some of the language. A topic whose sampled words are all
// answered right can be marked as already learned in one go (those words
// still come back once, about a month later, for a quick check).

export const PER_TOPIC = 3;
export const MAX_TOPICS = 8;

/**
 * What to ask: PER_TOPIC not-yet-started words from each of the first word
 * topics that still have that many (at most MAX_TOPICS topics).
 * `cards` = the learner's cards by word id; `pick(list, n)` chooses n of a list.
 */
export function placementPlan(lang, cards, pick) {
  const plan = [];
  for (const cat of lang.categories) {
    if ((cat.group || 'words') !== 'words') continue;
    const fresh = lang.wordsIn(cat.id).filter((w) => !cards[w.id]);
    if (fresh.length < PER_TOPIC) continue;
    plan.push({ cat, words: pick(fresh, PER_TOPIC) });
    if (plan.length === MAX_TOPICS) break;
  }
  return plan;
}

/** Topics of the plan in which every sampled word was answered right first time. */
export function passedTopics(plan, right) {
  return plan.filter((p) => p.words.every((w) => right.has(w.id))).map((p) => p.cat);
}
