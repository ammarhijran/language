// Skills: which kinds of question go well, and which do not. Every answer in
// a lesson, review or practice round is filed under the skill its exercise
// trains; the store keeps the last answers of each (store.logSkill), and
// Progress shows them side by side — with a way to practise the weakest.

export const SKILLS = [
  { id: 'listening', name: 'Listening', emoji: '👂', hint: 'hear it, know what it means', types: ['listen'], mode: 'listen' },
  { id: 'reading', name: 'Reading', emoji: '👀', hint: 'see it, know what it means', types: ['meaning', 'script'], mode: 'meaning' },
  { id: 'recall', name: 'Recall', emoji: '💭', hint: 'find the word for a meaning', types: ['produce', 'cloze', 'flashcard'], mode: 'flashcard' },
  { id: 'spelling', name: 'Spelling', emoji: '⌨️', hint: 'type the word', types: ['type'], mode: 'type' },
  { id: 'speaking', name: 'Speaking', emoji: '🎤', hint: 'say it aloud', types: ['speak'], mode: 'speak' },
  { id: 'sentences', name: 'Sentences', emoji: '🧱', hint: 'put the words in order', types: ['build'], mode: 'build' },
  // The language's own exercise about how words sound: its practice mode is chosen by skillMode().
  { id: 'sounds', name: 'Sounds', emoji: '🎯', hint: 'stress, beats, tricky letters', types: ['stress', 'beats', 'letters'], mode: null },
  // Not an exercise of a session: Practice → Numbers by ear files its answers here itself.
  // Likewise the letter quiz (Speak → Alphabet), where the script is new.
  { id: 'letters', name: 'Letters', emoji: '🔤', hint: 'know the script', types: [], mode: null, href: '#/speak/alphabet' },
  { id: 'numbers', name: 'Numbers', emoji: '🔢', hint: 'hear a number, type it', types: [], mode: null, href: '#/numbers' },
];

const BY_TYPE = new Map(SKILLS.flatMap((s) => s.types.map((t) => [t, s.id])));

/** The skill an exercise trains, or null (a new-word card trains none). A sentence built by ear is listening. */
export function skillOf(type, meta = null) {
  if (type === 'build' && meta?.byEar) return 'listening';
  return BY_TYPE.get(type) || null;
}

/** The practice mode that trains a skill in this language, or null. */
export function skillMode(skill, lang) {
  if (skill.mode) return skill.mode;
  return lang?.misread ? 'letters' : lang?.stressPractice ? 'stress' : lang?.beatPractice ? 'beats' : null;
}

/** Answers a skill needs before its number says anything. */
export const SKILL_MIN = 8;

/**
 * The skills with enough answers, in the order above:
 * { rows: [{ id, name, emoji, hint, right, total, pct, mode, href }], weakest }
 * (`href`: where to practise it when that is not a practice mode).
 * `tallies`: { id: { right, total } } (store.getSkills). `weakest` is the id
 * of the row to practise — the lowest, when there are two or more to compare
 * and it is both under 90 % and clearly below the best — or null.
 */
export function skillSummary(tallies, lang = null) {
  const rows = [];
  for (const s of SKILLS) {
    const t = tallies && Object.hasOwn(tallies, s.id) ? tallies[s.id] : null;
    if (!t || !(t.total >= SKILL_MIN)) continue;
    const right = Math.max(0, Math.min(t.total, t.right || 0));
    rows.push({ id: s.id, name: s.name, emoji: s.emoji, hint: s.hint, right, total: t.total, pct: Math.round((right / t.total) * 100), mode: skillMode(s, lang), href: s.href || null });
  }
  let weakest = null;
  if (rows.length >= 2) {
    const low = rows.reduce((a, b) => (b.pct < a.pct ? b : a));
    const best = Math.max(...rows.map((r) => r.pct));
    if (low.pct < 90 && best - low.pct >= 5) weakest = low.id;
  }
  return { rows, weakest };
}
