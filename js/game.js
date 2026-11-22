// Game layer: XP and levels, achievements, weekly challenges, streak repair
// and personal goals. Pure logic on top of store.js; the UI listens for
// rewards with onReward() and decides how to celebrate them.
import * as store from './store.js';
import { languages } from './languages/index.js';
import { status, AGAIN, HARD, DAY } from './srs.js';

// Topics in the biggest course: 'every topic' scales with the content, and a
// complete smaller course counts as complete (see metrics()).
/** Same time of day, n calendar days later (24 h steps drift across DST changes). */
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

const ALL_TOPICS = Math.max(...Object.values(languages).map((L) => L.categories.length));

// ---------- XP ----------

export const XP = {
  correct: 10, // right answer
  hard: 6, // right, with a struggle (or only the special letters wrong)
  again: 2, // wrong — effort still counts
  combo: 5, // bonus per right answer while on a combo of 5+
  learned: 15, // each new word finished in a lesson
  speakGreat: 8, // pronunciation drill outside a session, ≥ 90%
  speakGood: 5, // ≥ 70%
  speakTry: 2,
  earCorrect: 4, // per right answer in an ear-training quiz
  earPerfect: 20, // 10/10 bonus
  session: 10, // finishing a session of 5+ answers
  flawless: 25, // a session of 10+ answers, all right first time
  dailyGoal: 50,
  challenge: 100,
  personalGoal: 150,
  textFirst: 40, // first completion of a Read & Listen text
  textCorrect: 5, // per right comprehension answer, once per text per day
  textPractice: 15, // a finished speech practice or role-play, once per text and mode per day
};

// ---------- Levels ----------

/** Total XP needed to reach level n (1 → 0, 2 → 100, 3 → 280, 4 → 540 …). */
export const xpForLevel = (n) => (n <= 1 ? 0 : 40 * (n - 1) ** 2 + 60 * (n - 1));

const TITLES = [[1, 'Beginner'], [3, 'Explorer'], [5, 'Word Collector'], [8, 'Conversationalist'], [12, 'Storyteller'], [16, 'Wordsmith'], [20, 'Polyglot']];
export const titleFor = (level) => TITLES.filter(([n]) => level >= n).pop()[1];
/** True when reaching `level` earns a new title. */
export const newTitleAt = (level) => TITLES.some(([n]) => n === level);

/**
 * The level for an XP total, in constant time (XP can come from a sync code,
 * so a loop over levels could be made to run forever). Anything that isn't a
 * finite, non-negative number counts as 0 XP.
 */
export function levelFromXp(raw) {
  const xp = Number.isFinite(raw) && raw > 0 ? Math.min(raw, Number.MAX_SAFE_INTEGER) : 0;
  // Solve 40m² + 60m = xp for m = level - 1, then fix floating-point rounding.
  let level = Math.floor((-60 + Math.sqrt(3600 + 160 * xp)) / 80) + 1;
  for (let i = 0; i < 3 && level > 1 && xpForLevel(level) > xp; i++) level--;
  for (let i = 0; i < 3 && xpForLevel(level + 1) <= xp; i++) level++;
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return { level, title: titleFor(level), total: xp, into: xp - base, need: next - base, next };
}

// ---------- Achievements ----------

const A = (id, icon, title, desc, metric, target, group) => ({ id, icon, title, desc, metric, target, group });

export const ACHIEVEMENTS = [
  A('first-lesson', '🌱', 'First Words', 'Finish your first lesson', 'lessons', 1, 'Learning'),
  A('words-10', '📗', 'Word Collector I', 'Learn 10 words', 'words', 10, 'Learning'),
  A('words-50', '📘', 'Word Collector II', 'Learn 50 words', 'words', 50, 'Learning'),
  A('words-100', '📙', 'Word Collector III', 'Learn 100 words', 'words', 100, 'Learning'),
  A('words-250', '📚', 'Word Hoarder', 'Learn 250 words', 'words', 250, 'Learning'),
  A('mastered-10', '🔒', 'Locked In', 'Master 10 words (reviewed until they stick for 3+ weeks)', 'mastered', 10, 'Learning'),
  A('mastered-50', '🧠', 'Long-Term Memory', 'Master 50 words', 'mastered', 50, 'Learning'),
  A('topic-1', '🗂️', 'Topic Master', 'Learn every word in a topic', 'topics', 1, 'Learning'),
  A('topics-all', '🏛️', 'Completionist', 'Learn every topic in one language', 'topicsInLang', ALL_TOPICS, 'Learning'),
  A('personal-goal', '🎯', 'Mission Complete', 'Reach a personal word goal', 'personalGoals', 1, 'Learning'),

  A('streak-3', '🔥', 'On a Roll', 'Keep a 3-day streak', 'streak', 3, 'Habits'),
  A('streak-7', '📅', 'One Week Strong', 'Keep a 7-day streak', 'streak', 7, 'Habits'),
  A('streak-30', '🗓️', 'Habit Formed', 'Keep a 30-day streak', 'streak', 30, 'Habits'),
  A('streak-100', '💯', 'Unstoppable', 'Keep a 100-day streak', 'streak', 100, 'Habits'),
  A('goal-1', '✅', 'Goal Getter', 'Meet your daily goal', 'goalsMet', 1, 'Habits'),
  A('goal-10', '🏅', 'Consistent', 'Meet your daily goal 10 times', 'goalsMet', 10, 'Habits'),
  A('goal-50', '🏆', 'Dedicated', 'Meet your daily goal 50 times', 'goalsMet', 50, 'Habits'),
  A('challenge-1', '⚔️', 'Challenger', 'Complete a weekly challenge', 'challenges', 1, 'Habits'),
  A('challenge-10', '👑', 'Champion', 'Complete 10 weekly challenges', 'challenges', 10, 'Habits'),
  A('early-bird', '🌅', 'Early Bird', 'Practise before 8 am', 'early', 1, 'Habits'),
  A('night-owl', '🦉', 'Night Owl', 'Practise after 10 pm', 'night', 1, 'Habits'),

  A('speak-10', '🎙️', 'Clear Voice', 'Say 10 different words with 90%+', 'speakGreat', 10, 'Pronunciation'),
  A('speak-50', '🗣️', 'Silver Tongue', 'Say 50 different words with 90%+', 'speakGreat', 50, 'Pronunciation'),
  A('speak-perfect', '💎', 'Native-Like', 'Score 100% on 25 words', 'speakPerfect', 25, 'Pronunciation'),
  A('ear-perfect', '👂', 'Golden Ear', 'Get 10/10 in an ear-training quiz', 'earPerfect', 1, 'Pronunciation'),
  A('alphabet', '🔤', 'Letter by Letter', 'Listen to every letter of an alphabet', 'alphabet', 1, 'Pronunciation'),

  A('grammar-1', '📐', 'First Rules', 'Finish a grammar lesson', 'grammar', 1, 'Grammar'),
  A('grammar-5', '🤓', 'Grammar Geek', 'Finish 5 grammar lessons', 'grammar', 5, 'Grammar'),
  A('grammar-all', '🎓', 'Grammarian', 'Finish every grammar lesson in one language', 'grammarAll', 1, 'Grammar'),
  A('grammar-perfect', '💯', 'Rule Master', 'Score 4/4 on 10 grammar quizzes', 'grammarPerfect', 10, 'Grammar'),
  A('talk-local', '🗣️', 'Talk Like a Local', 'Learn 20 everyday or slang expressions', 'talkWords', 20, 'Learning'),

  A('text-1', '📜', 'First Read', 'Finish a text in Read & Listen', 'texts', 1, 'Reading'),
  A('texts-5', '🔖', 'Bookworm', 'Finish 5 texts in Read & Listen', 'texts', 5, 'Reading'),
  A('texts-all', '🎖️', 'Well Read', 'Finish every text in one language', 'textsAll', 1, 'Reading'),
  A('speech-1', '🎤', 'Public Speaker', 'Practise a speech: repeat it, shadow it or record it', 'speechPractice', 1, 'Reading'),
  A('roleplay-1', '🎭', 'On Stage', 'Play a part in a dialogue', 'rolePlays', 1, 'Reading'),

  A('combo-10', '⚡', 'Hot Streak', 'Get 10 answers right in a row', 'bestCombo', 10, 'Skill'),
  A('combo-25', '☄️', 'On Fire', 'Get 25 answers right in a row', 'bestCombo', 25, 'Skill'),
  A('flawless', '✨', 'Flawless', 'Finish a session of 10+ with every answer right first time', 'flawless', 1, 'Skill'),
  A('reviews-500', '🔁', 'Spaced Out', 'Answer 500 exercises', 'answers', 500, 'Skill'),
  A('level-5', '⭐', 'Rising Star', 'Reach level 5', 'level', 5, 'Skill'),
  A('level-10', '🌟', 'Language Lover', 'Reach level 10', 'level', 10, 'Skill'),
  A('polyglot-2', '🌍', 'Bilingual Brain', 'Learn words in 2 languages', 'langs', 2, 'Skill'),
  A('polyglot-4', '🗺️', 'Polyglot', 'Learn words in all 4 languages', 'langs', 4, 'Skill'),
];

// ---------- Weekly challenges ----------

export const CHALLENGES = [
  { id: 'xp', icon: '⭐', title: 'Earn 500 XP', metric: 'xp', target: 500 },
  { id: 'learn', icon: '🌱', title: 'Learn 15 new words', metric: 'learned', target: 15 },
  { id: 'speak', icon: '🎙️', title: 'Say 10 words with 80%+', metric: 'speak80', target: 10 },
  { id: 'goal-days', icon: '✅', title: 'Meet your daily goal on 4 days', metric: 'goalDays', target: 4 },
  { id: 'ear', icon: '👂', title: 'Finish 2 ear-training quizzes', metric: 'ear', target: 2 },
  { id: 'reviews', icon: '🔁', title: 'Answer 80 exercises', metric: 'answers', target: 80 },
  { id: 'combo', icon: '⚡', title: 'Get 15 right in a row', metric: 'combo', target: 15 },
  { id: 'flawless', icon: '✨', title: 'Finish a flawless session', metric: 'flawless', target: 1 },
];

/** Monday of the week containing `now`, as YYYY-MM-DD. */
export function weekKey(now = new Date()) {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return store.dayKey(d);
}

/** Three different challenges per week, the same for everyone in that week. */
export function challengesForWeek(key) {
  let seed = [...key].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const pool = [...CHALLENGES];
  const picks = [];
  while (picks.length < 3) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    picks.push(pool.splice(seed % pool.length, 1)[0].id);
  }
  return picks;
}

// ---------- State ----------

const COUNTERS = ['lessons', 'answers', 'correct', 'sessions', 'flawless', 'speakGreat', 'speakPerfect', 'earQuizzes', 'earPerfect',
  'goalsMet', 'challenges', 'bestCombo', 'bestStreak', 'early', 'night', 'personalGoals', 'speechPractice', 'rolePlays'];

// Counters where the best value counts, rather than the sum across devices.
const BEST = new Set(['bestCombo', 'bestStreak']);

/*
 * XP and counters are kept per device (s.dev[deviceId]) and added up when read.
 * That makes merging progress from another device safe: each device's numbers
 * only ever grow, so a merge takes the larger value per device (a "G-counter").
 */
function g() {
  const s = store.getGame();
  const me = store.deviceId();
  s.dev ??= {};
  if (s.xp !== undefined || s.c || s.xpBy) {
    // Data from before per-device counters: it all belongs to this device.
    s.dev[me] = { xp: (s.xp || 0), xpBy: { ...(s.xpBy || {}) }, c: { ...(s.c || {}) } };
    delete s.xp; delete s.xpBy; delete s.c;
  }
  const own = (s.dev[me] ??= {});
  own.xp ??= 0;
  own.xpBy ??= {};
  own.c ??= {};
  for (const k of COUNTERS) own.c[k] ??= 0;
  s.letters ??= {};
  s.unlocked ??= {};
  s.unseen ??= [];
  s.goals ??= {};
  s.spoken ??= { day: '', ids: [], best: {} }; // today's once-a-day keys and best speaking scores
  s.spoken.best ??= {};
  s.said ??= { great: [], perfect: [] }; // 'lang:wordId' ever said with 90%+ / 100%
  s.grammar ??= {}; // { lang: { lessonId: best score 0..1 } }
  s.texts ??= {}; // Read & Listen: { lang: { textId: best quiz score 0..1 } }
  const wk = weekKey();
  if (!s.week || s.week.key !== wk) s.week = { key: wk, picks: challengesForWeek(wk), p: {}, done: {}, goalDays: [] };
  if (Object.values(s.week.p).some((v) => typeof v === 'number')) s.week.p = { [me]: s.week.p }; // old format
  // A week from a sync code must name three real challenges.
  if (s.week.picks?.length !== 3 || !s.week.picks.every((id) => CHALLENGES.some((x) => x.id === id))) s.week.picks = challengesForWeek(s.week.key);
  s.week.p[me] ??= {};
  return s;
}

const own = () => g().dev[store.deviceId()];
const c = () => own().c;

export const state = () => g();
export const totalXp = () => Object.values(g().dev).reduce((sum, d) => sum + (d.xp || 0), 0);
export const level = () => levelFromXp(totalXp());

/** XP earned per language, summed over devices. */
export function xpByLang() {
  const out = {};
  for (const d of Object.values(g().dev)) for (const [k, v] of Object.entries(d.xpBy || {})) out[k] = (out[k] || 0) + v;
  return out;
}

/** Counters summed over devices (best-of counters take the maximum). */
export function counters() {
  const devs = Object.values(g().dev);
  const out = {};
  for (const k of COUNTERS) {
    const vals = devs.map((d) => d.c?.[k] || 0);
    out[k] = BEST.has(k) ? Math.max(0, ...vals) : vals.reduce((a, b) => a + b, 0);
  }
  return out;
}

/** Today's speaking/grammar bookkeeping (it starts again each day). */
function spokenToday(s) {
  const day = store.dayKey();
  if (s.spoken.day !== day) s.spoken = { day, ids: [], best: {} };
  return s.spoken;
}

/** This week's progress on a challenge metric, over all devices. */
function weekValue(metric) {
  const vals = Object.values(g().week.p).map((p) => p?.[metric] || 0);
  return metric === 'combo' ? Math.max(0, ...vals) : vals.reduce((a, b) => a + b, 0);
}

// ---------- Rewards ----------

const listeners = new Set();
export function onReward(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function emit(reward) {
  listeners.forEach((fn) => { try { fn(reward); } catch { /* a broken listener mustn't break the game */ } });
}

function addXp(lang, amount, reason) {
  if (!amount) return 0;
  const me = own();
  const before = level().level;
  me.xp += amount;
  me.xpBy[lang] = (me.xpBy[lang] || 0) + amount;
  bumpWeek('xp', amount);
  emit({ kind: 'xp', amount, reason, lang });
  const after = level();
  if (after.level > before) emit({ kind: 'level', level: after.level, title: after.title });
  return amount;
}

const weekOwn = () => g().week.p[store.deviceId()];
function bumpWeek(key, by = 1) { const p = weekOwn(); p[key] = (p[key] || 0) + by; }
function maxWeek(key, v) { const p = weekOwn(); p[key] = Math.max(p[key] || 0, v); }

// ---------- Metrics & evaluation ----------

/** Everything achievements are measured against. */
export function metrics() {
  const s = g();
  let words = 0; let mastered = 0; let langs = 0; let topics = 0; let topicsInLang = 0; let streakNow = 0; let alphabet = 0;
  let grammar = 0; let grammarAll = 0; let grammarPerfect = 0; let talkWords = 0; let texts = 0; let textsAll = 0;
  for (const [code, L] of Object.entries(languages)) {
    const cards = store.getCards(code);
    const ids = Object.keys(cards);
    if (ids.some((id) => !cards[id].known)) langs++;
    for (const id of ids) {
      if (!cards[id].known) words++;
      if (status(cards[id]) === 'mastered') mastered++;
    }
    const done = L.categories.filter((c) => topicLearned(L.wordsIn(c.id), cards)).length;
    topics += done;
    topicsInLang = Math.max(topicsInLang, done === L.categories.length ? ALL_TOPICS : done);
    streakNow = Math.max(streakNow, store.streak(code));
    if ((s.letters[code] || []).length >= L.alphabet.length) alphabet++;
    const g = s.grammar[code] || {};
    const doneIds = Object.keys(g).filter((id) => (L.grammar || []).some((l) => l.id === id));
    grammar += doneIds.length;
    grammarPerfect += doneIds.filter((id) => g[id] >= 1).length;
    if (L.grammar?.length && doneIds.length >= L.grammar.length) grammarAll++;
    talkWords += L.words.filter((w) => (w.reg === 'casual' || w.reg === 'slang') && cards[w.id] && !cards[w.id].known).length;
    const t = textsDone(s, code);
    texts += t.length;
    if (textIds[code]?.size && t.length >= textIds[code].size) textsAll++;
  }
  c().bestStreak = Math.max(c().bestStreak, streakNow);
  const all = counters();
  // "Different words": the sets of words said well. Counts from older builds
  // (one per word per day) are kept as a floor so progress never goes back.
  const speakGreat = Math.max(all.speakGreat, s.said.great.length);
  const speakPerfect = Math.max(all.speakPerfect, s.said.perfect.length);
  return { ...all, speakGreat, speakPerfect, words, mastered, langs, topics, topicsInLang, streak: all.bestStreak, level: level().level, alphabet, grammar, grammarAll, grammarPerfect, talkWords, texts, textsAll };
}

/**
 * A topic is learned when every word in it has a card and at least one of
 * them was learned in lessons: words ticked as "already learned" fill gaps,
 * but ticking a whole topic isn't learning it.
 */
function topicLearned(words, cards) {
  return words.every((w) => cards[w.id]) && words.some((w) => !cards[w.id].known);
}

export function achievementProgress() {
  const m = metrics();
  const s = g();
  return ACHIEVEMENTS.map((a) => ({ ...a, value: Math.min(m[a.metric] || 0, a.target), unlocked: !!s.unlocked[a.id], at: s.unlocked[a.id] || null }));
}

export function challengeProgress() {
  const s = g();
  const goalDays = s.week.goalDays.length;
  return s.week.picks.map((id) => {
    const c = CHALLENGES.find((x) => x.id === id);
    const raw = c.metric === 'goalDays' ? goalDays : weekValue(c.metric);
    return { ...c, value: Math.min(raw, c.target), done: !!s.week.done[id] };
  });
}

/** Unlock achievements, complete challenges and personal goals. Repeats until nothing changes (rewards can cascade). */
function evaluate(lang = 'tr') {
  const s = g();
  for (let pass = 0; pass < 4; pass++) {
    let changed = false;
    for (const ch of challengeProgress()) {
      if (!ch.done && ch.value >= ch.target) {
        s.week.done[ch.id] = true;
        c().challenges++;
        emit({ kind: 'challenge', challenge: ch, xp: XP.challenge });
        addXp(lang, XP.challenge, 'challenge');
        changed = true;
      }
    }
    for (const [code, goal] of Object.entries(s.goals)) {
      if (goal && !goal.removed && !goal.doneAt && learnedCount(code) >= goal.words) {
        goal.doneAt = Date.now();
        c().personalGoals++;
        emit({ kind: 'personal-goal', lang: code, words: goal.words, xp: XP.personalGoal });
        addXp(code, XP.personalGoal, 'personal goal');
        changed = true;
      }
    }
    const m = metrics();
    for (const a of ACHIEVEMENTS) {
      if (!s.unlocked[a.id] && (m[a.metric] || 0) >= a.target) {
        s.unlocked[a.id] = Date.now();
        s.unseen.push(a.id);
        emit({ kind: 'achievement', achievement: a });
        changed = true;
      }
    }
    if (!changed) break;
  }
  store.persist();
}

// ---------- Events from the app ----------

/** One answered exercise. Returns the XP earned. */
export function answer({ lang, rating, combo = 0, now = new Date() }) {
  const s = g();
  const correct = rating !== AGAIN;
  c().answers++;
  if (correct) c().correct++;
  c().bestCombo = Math.max(c().bestCombo, combo);
  bumpWeek('answers');
  maxWeek('combo', combo);
  const hour = now.getHours();
  if (hour < 8 && hour >= 4) c().early++;
  if (hour >= 22 || hour < 4) c().night++;
  let xp = rating === AGAIN ? XP.again : rating === HARD ? XP.hard : XP.correct;
  if (correct && combo >= 5) xp += XP.combo;
  addXp(lang, xp, 'answer');
  evaluate(lang);
  return xp;
}

/** A finished lesson / review / practice session. */
export function sessionEnd({ lang, answered, firstTryCorrect }) {
  const s = g();
  if (answered < 1) return 0;
  c().sessions++;
  let xp = 0;
  if (answered >= 5) xp += addXp(lang, XP.session, 'session');
  if (answered >= 10 && firstTryCorrect === answered) {
    c().flawless++;
    bumpWeek('flawless');
    emit({ kind: 'flawless', answered });
    xp += addXp(lang, XP.flawless, 'flawless');
  }
  evaluate(lang);
  return xp;
}

export function learned({ lang, count }) {
  const s = g();
  if (!count) return 0;
  c().lessons++;
  bumpWeek('learned', count);
  const xp = addXp(lang, XP.learned * count, 'learned');
  evaluate(lang);
  return xp;
}

const speakXp = (score) => (score >= 0.9 ? XP.speakGreat : score >= 0.7 ? XP.speakGood : XP.speakTry);
const addOnce = (list, key) => { if (!list.includes(key)) list.push(key); };

/**
 * A scored pronunciation attempt. Each word counts with its best score of the
 * day: a retry earns only what it adds (moving up an XP tier, or crossing 80%
 * for the weekly challenge for the first time today), so repeating one word
 * doesn't farm points but improving it is rewarded. The "different words"
 * achievements use the sets of words ever said with 90%+ and 100%. XP only
 * outside sessions — inside, the exercise's own answer already earns it.
 */
export function spoke({ lang, wordId, score, inSession = false }) {
  const s = g();
  if (!Number.isFinite(score)) return 0;
  const today = spokenToday(s);
  const key = `${lang}:${wordId}`;
  const prev = today.best[key];
  if (prev !== undefined && score <= prev) return 0; // no better than earlier today
  today.best[key] = score;
  if (score >= 0.8 && !(prev >= 0.8)) bumpWeek('speak80');
  if (score >= 0.9) addOnce(s.said.great, key);
  if (score >= 0.995) addOnce(s.said.perfect, key);
  const xp = inSession ? 0 : addXp(lang, speakXp(score) - (prev === undefined ? 0 : speakXp(prev)), 'speak');
  evaluate(lang);
  return xp;
}

export function earQuiz({ lang, correct, total }) {
  const s = g();
  c().earQuizzes++;
  bumpWeek('ear');
  let xp = addXp(lang, XP.earCorrect * correct, 'ear');
  if (total >= 10 && correct === total) {
    c().earPerfect++;
    xp += addXp(lang, XP.earPerfect, 'ear-perfect');
  }
  evaluate(lang);
  return xp;
}

export const grammarBest = (lang, id) => g().grammar[lang]?.[id] ?? null;

/**
 * A finished grammar quiz. XP: +30 the first time a lesson is completed, and
 * +5 per right answer once per lesson per day.
 */
export function grammarDone({ lang, id, correct, total }) {
  const s = g();
  const map = (s.grammar[lang] ||= {});
  const first = map[id] == null;
  map[id] = Math.max(map[id] ?? 0, total ? correct / total : 0);
  const today = spokenToday(s);
  const key = `grammar:${lang}:${id}`;
  let xp = 0;
  if (first) xp += addXp(lang, 30, 'grammar');
  if (!today.ids.includes(key)) {
    today.ids.push(key);
    xp += addXp(lang, 5 * correct, 'grammar');
  }
  evaluate(lang);
  return xp;
}

// ---------- Read & Listen ----------

// Texts are loaded on demand (not at start-up), so the game only knows a
// language's texts once the reader has registered them. Until then, finished
// texts count as they are (sync codes are sanitized), and "every text in one
// language" waits until the list is known.
const textIds = {};

/** The reader loaded a language's texts: their ids, for "every text" and to ignore stale ids. */
export function registerTexts(lang, ids) {
  textIds[lang] = new Set(ids);
}

/** Ids of the finished texts in a language (only ones that still exist, once the list is known). */
function textsDone(s, lang) {
  const ids = Object.keys(s.texts[lang] || {});
  return textIds[lang] ? ids.filter((id) => textIds[lang].has(id)) : ids;
}

export const textBest = (lang, id) => g().texts[lang]?.[id] ?? null;

/**
 * A finished Read & Listen text (its comprehension questions answered).
 * Like grammarDone: +40 XP the first time a text is completed, and +5 per
 * right answer once per text per day, so re-reading is welcome but can't be
 * farmed. The best score is kept (and synced).
 */
export function textDone({ lang, id, correct, total }) {
  const s = g();
  const map = (s.texts[lang] ||= {});
  const first = map[id] == null;
  map[id] = Math.max(map[id] ?? 0, total ? Math.min(correct, total) / total : 0);
  const today = spokenToday(s);
  const key = `text:${lang}:${id}`;
  let xp = 0;
  if (first) xp += addXp(lang, XP.textFirst, 'text');
  if (!today.ids.includes(key)) {
    today.ids.push(key);
    xp += addXp(lang, XP.textCorrect * Math.max(0, Math.min(correct, total)), 'text');
  }
  evaluate(lang);
  return xp;
}

/**
 * A finished speech practice ('repeat', 'shadow', 'record') or dialogue
 * role-play ('roleplay'). Counts towards the achievements every time; XP
 * once per text and mode per day.
 */
export function textPractised({ lang, id, mode }) {
  const s = g();
  if (mode === 'roleplay') c().rolePlays++;
  else c().speechPractice++;
  const today = spokenToday(s);
  const key = `practice:${lang}:${id}:${mode}`;
  let xp = 0;
  if (!today.ids.includes(key)) {
    today.ids.push(key);
    xp = addXp(lang, XP.textPractice, 'text-practice');
  }
  evaluate(lang);
  return xp;
}

export function letterTapped(lang, letter) {
  const s = g();
  const list = (s.letters[lang] ||= []);
  if (list.includes(letter)) return;
  list.push(letter);
  evaluate(lang);
}

export function goalMet(lang) {
  const s = g();
  c().goalsMet++;
  const today = store.dayKey();
  if (!s.week.goalDays.includes(today)) s.week.goalDays.push(today);
  emit({ kind: 'goal', lang, xp: XP.dailyGoal });
  addXp(lang, XP.dailyGoal, 'daily goal');
  evaluate(lang);
}

// ---------- Streak repair ----------

/**
 * If yesterday was missed but the day before kept a streak going, today the
 * learner can save the streak by doing twice the daily goal.
 */
export function repairOffer(lang, now = new Date()) {
  const date = (offset) => { const d = new Date(now); d.setDate(d.getDate() - offset); return d; };
  const active = (offset) => store.isActive(store.getDay(lang, date(offset)));
  if (active(1) || !active(2)) return null;
  let lost = 0;
  for (let i = 2; active(i); i++) lost++;
  const target = store.getSettings().dailyGoal * 2;
  return { target, done: store.dayTotal(store.getDay(lang, date(0))), lost, missedKey: store.dayKey(date(1)) };
}

export function checkRepair(lang, now = new Date()) {
  const offer = repairOffer(lang, now);
  if (!offer || offer.done < offer.target) return false;
  store.repairDay(lang, offer.missedKey);
  emit({ kind: 'repair', lang, streak: store.streak(lang, now) });
  evaluate(lang);
  return true;
}

// ---------- Personal goals ----------

/** Words learned in lessons (not ticked as already learned). */
const learnedCount = (lang) => Object.values(store.getCards(lang)).filter((c) => !c.known).length;

/**
 * Set (or with `null`, remove) a personal goal. Every change gets a newer
 * `set` stamp, and a removal is kept as { removed, set }, so the latest
 * choice wins when syncing. A goal is rewarded once, when it is reached: one
 * that is already reached when it is set is recorded as done without a reward.
 */
export function setPersonalGoal(lang, goal) {
  const s = g();
  const set = Math.max(Date.now(), (s.goals[lang]?.set || 0) + 1);
  if (!goal) {
    s.goals[lang] = { removed: true, set };
  } else {
    const words = Math.max(1, Math.round(goal.words));
    s.goals[lang] = { words, by: goal.by || null, set, doneAt: learnedCount(lang) >= words ? set : null };
  }
  evaluate(lang);
}

/** Progress and a projection based on the last 14 days. */
export function personalGoal(lang, now = new Date()) {
  const raw = g().goals[lang];
  const goal = raw && !raw.removed ? raw : null;
  const learned = learnedCount(lang);
  if (!goal) return { goal: null, learned };
  let recent = 0;
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    recent += store.getDay(lang, d).learned;
  }
  const rate = recent / 14; // words per day
  const remaining = Math.max(0, goal.words - learned);
  const eta = remaining === 0 ? now : rate > 0 ? addDays(now, Math.ceil(remaining / rate)) : null;
  let perDayNeeded = null;
  if (goal.by && remaining > 0) {
    const daysLeft = Math.max(1, Math.ceil((new Date(`${goal.by}T23:59:59`) - now) / DAY));
    perDayNeeded = Math.ceil(remaining / daysLeft);
  }
  return { goal, learned, remaining, rate, eta, perDayNeeded, pct: Math.min(100, Math.round((learned / goal.words) * 100)) };
}

/** Re-check achievements, challenges and goals — e.g. after merging progress from another device. */
export function refresh(lang = 'tr') {
  evaluate(lang);
}

// ---------- Seen state for the trophy badge ----------

export const unseenCount = () => g().unseen.length;
export function markSeen() {
  g().unseen = [];
  store.persist();
}
