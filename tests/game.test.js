import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as store from '../js/store.js';
import * as game from '../js/game.js';
import { newCard, review, markKnown, GOOD, HARD, AGAIN, DAY } from '../js/srs.js';
import { languages } from './all-languages.js';
import { mergeAll } from '../js/sync.js';

let rewards = [];
game.onReward((r) => rewards.push(r));
beforeEach(() => { store._resetAll(); rewards = []; });

const learn = (lang, ids) => ids.forEach((id) => store.setCard(lang, id, review(newCard(), GOOD)));
const kinds = () => rewards.map((r) => r.kind);

test('levels grow quadratically', () => {
  assert.equal(game.xpForLevel(1), 0);
  assert.equal(game.xpForLevel(2), 100);
  assert.equal(game.xpForLevel(3), 280);
  assert.deepEqual(game.levelFromXp(0), { level: 1, title: 'Beginner', total: 0, into: 0, need: 100, next: 100 });
  assert.equal(game.levelFromXp(99).level, 1);
  assert.equal(game.levelFromXp(100).level, 2);
  assert.equal(game.levelFromXp(5000).title, game.titleFor(game.levelFromXp(5000).level));
});

test('levels are computed in constant time, matching the level table', () => {
  let level = 1;
  for (let xp = 0; xp <= 300000; xp++) {
    while (xp >= game.xpForLevel(level + 1)) level++;
    if (game.levelFromXp(xp).level !== level) assert.fail(`xp ${xp}: ${game.levelFromXp(xp).level} ≠ ${level}`);
  }
  for (const n of [2, 10, 1000, 123456]) {
    assert.equal(game.levelFromXp(game.xpForLevel(n)).level, n);
    assert.equal(game.levelFromXp(game.xpForLevel(n) - 1).level, n - 1);
  }
  // XP from a sync code can be anything: never hang, never NaN
  for (const bad of [Infinity, -Infinity, NaN, -5, '100', undefined]) assert.equal(game.levelFromXp(bad).level, 1, String(bad));
  const huge = game.levelFromXp(1e300);
  assert.ok(Number.isFinite(huge.level) && huge.into >= 0 && huge.into < huge.need);
});

test('answers earn XP with combo bonus, and level-ups are announced', () => {
  const noon = new Date(2026, 0, 5, 12);
  assert.equal(game.answer({ lang: 'tr', rating: GOOD, combo: 1, now: noon }), 10);
  assert.equal(game.answer({ lang: 'tr', rating: HARD, combo: 2, now: noon }), 6);
  assert.equal(game.answer({ lang: 'tr', rating: AGAIN, combo: 0, now: noon }), 2);
  assert.equal(game.answer({ lang: 'tr', rating: GOOD, combo: 5, now: noon }), 15);
  assert.equal(game.totalXp(), 33);
  for (let i = 0; i < 8; i++) game.answer({ lang: 'tr', rating: GOOD, combo: 1, now: noon });
  assert.ok(kinds().includes('level'), 'crossing 100 XP is a level-up');
  assert.equal(game.level().level, 2);
  assert.equal(game.xpByLang().tr, game.totalXp());
});

test('achievements unlock once, from real progress', () => {
  learn('tr', languages.tr.words.slice(0, 10).map((w) => w.id));
  game.learned({ lang: 'tr', count: 10 });
  const unlocked = rewards.filter((r) => r.kind === 'achievement').map((r) => r.achievement.id);
  assert.ok(unlocked.includes('first-lesson'));
  assert.ok(unlocked.includes('words-10'));
  assert.ok(!unlocked.includes('words-50'));
  rewards = [];
  game.learned({ lang: 'tr', count: 0 });
  game.answer({ lang: 'tr', rating: GOOD, now: new Date(2026, 0, 5, 12) }); // midday: no Early Bird / Night Owl
  assert.ok(!rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'words-10'), 'not unlocked twice');
  const p = game.achievementProgress().find((a) => a.id === 'words-50');
  assert.equal(p.value, 10);
  assert.equal(p.unlocked, false);
  assert.equal(game.unseenCount(), 2);
  game.markSeen();
  assert.equal(game.unseenCount(), 0);
});

test('known words do not count as learned', () => {
  store.setCard('uk', 'привіт', markKnown());
  assert.equal(game.metrics().words, 0);
  learn('uk', ['дякую']);
  assert.equal(game.metrics().words, 1);
  assert.equal(game.metrics().langs, 1);
});

test('ticking whole topics as already learned does not unlock Topic Master or Completionist', () => {
  const L = languages.tr;
  for (const c of L.categories) for (const w of L.wordsIn(c.id)) store.setCard('tr', w.id, markKnown());
  game.answer({ lang: 'tr', rating: GOOD });
  const m = game.metrics();
  assert.equal(m.topics, 0);
  assert.equal(m.topicsInLang, 0);
  assert.ok(!rewards.some((r) => r.kind === 'achievement' && ['topic-1', 'topics-all'].includes(r.achievement.id)));
  // a topic still counts when known words fill the gaps around words learned in lessons
  const [first] = L.wordsIn(L.categories[0].id);
  learn('tr', [first.id]);
  game.answer({ lang: 'tr', rating: GOOD });
  assert.equal(game.metrics().topics, 1);
  assert.ok(rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'topic-1'));
  assert.ok(!rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'topics-all'));
});

test('polyglot counts languages with learned words', () => {
  learn('tr', ['merhaba']);
  learn('ja', [languages.ja.words[0].id]);
  game.answer({ lang: 'ja', rating: GOOD });
  assert.ok(rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'polyglot-2'));
});

test('weekly challenges are deterministic, distinct and reset each week', () => {
  const a = game.challengesForWeek('2026-11-16');
  assert.equal(a.length, 3);
  assert.equal(new Set(a).size, 3);
  assert.deepEqual(a, game.challengesForWeek('2026-11-16'));
  assert.equal(game.weekKey(new Date(2026, 10, 22)), '2026-11-16', 'Sunday belongs to the week starting Monday');
  assert.equal(game.weekKey(new Date(2026, 10, 23)), '2026-11-23');
  const weeks = new Set(Array.from({ length: 8 }, (_, i) => game.challengesForWeek(`2026-0${(i % 9) + 1}-0${(i % 7) + 1}`).join()));
  assert.ok(weeks.size > 1, 'different weeks get different challenges');
});

test('completing a challenge awards XP once', () => {
  const s = game.state();
  s.week.picks = ['reviews', 'ear', 'learn'];
  for (let i = 0; i < 80; i++) game.answer({ lang: 'tr', rating: GOOD });
  assert.equal(rewards.filter((r) => r.kind === 'challenge').length, 1);
  assert.equal(game.challengeProgress()[0].done, true);
  game.answer({ lang: 'tr', rating: GOOD });
  assert.equal(rewards.filter((r) => r.kind === 'challenge').length, 1);
});

test('flawless sessions and the daily goal', () => {
  game.sessionEnd({ lang: 'tr', answered: 12, firstTryCorrect: 12 });
  assert.ok(kinds().includes('flawless'));
  game.sessionEnd({ lang: 'tr', answered: 12, firstTryCorrect: 11 });
  assert.equal(rewards.filter((r) => r.kind === 'flawless').length, 1);
  game.goalMet('tr');
  assert.ok(kinds().includes('goal'));
  assert.equal(game.state().week.goalDays.length, 1);
  assert.ok(rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'goal-1'));
});

test('speaking: the best attempt of the day counts, XP only outside sessions', () => {
  assert.equal(game.spoke({ lang: 'tr', wordId: 'kedi', score: 0.95 }), 8);
  assert.equal(game.spoke({ lang: 'tr', wordId: 'kedi', score: 0.9 }), 0, 'a worse attempt adds nothing');
  assert.equal(game.spoke({ lang: 'tr', wordId: 'kedi', score: 1 }), 0, 'same XP tier: nothing more');
  assert.equal(game.spoke({ lang: 'tr', wordId: 'su', score: 1, inSession: true }), 0);
  const m = game.metrics();
  assert.equal(m.speakGreat, 2);
  assert.equal(m.speakPerfect, 2, 'kedi reached 100% on the retry');
});

test('speaking: a better retry earns the step up, and the weekly 80% challenge counts it', () => {
  const p = () => game.state().week.p[store.deviceId()].speak80 || 0;
  assert.equal(game.spoke({ lang: 'tr', wordId: 'merhaba', score: 0.6 }), 2);
  assert.equal(p(), 0);
  assert.equal(game.spoke({ lang: 'tr', wordId: 'merhaba', score: 0.75 }), 3, 'tier 2 → 5 XP: +3');
  assert.equal(game.spoke({ lang: 'tr', wordId: 'merhaba', score: 0.95 }), 3, 'tier 5 → 8 XP: +3');
  assert.equal(p(), 1, 'crossed 80% once');
  assert.equal(game.spoke({ lang: 'tr', wordId: 'merhaba', score: 0.99 }), 0);
  assert.equal(p(), 1, 'not again for the same word today');
  assert.equal(game.metrics().speakGreat, 1);
  assert.equal(game.totalXp(), 8, 'never more than one good attempt would earn');
});

test('speaking: "different words" achievements need different words, not different days', () => {
  for (let day = 0; day < 10; day++) {
    game.spoke({ lang: 'tr', wordId: 'merhaba', score: 0.95 });
    game.state().spoken.day = `2000-01-${String(day + 1).padStart(2, '0')}`; // as if the next day started
  }
  assert.equal(game.metrics().speakGreat, 1);
  assert.ok(!rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'speak-10'));
  for (const w of languages.tr.words.slice(1, 10)) game.spoke({ lang: 'tr', wordId: w.id, score: 0.93 });
  assert.equal(game.metrics().speakGreat, 10);
  assert.ok(rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'speak-10'));
});

test('speaking: counts from older builds are kept as a floor', () => {
  game.state().dev[store.deviceId()].c.speakGreat = 7;
  game.spoke({ lang: 'tr', wordId: 'kedi', score: 0.95 });
  assert.equal(game.metrics().speakGreat, 7);
});

test('ear quiz: perfect score bonus and Golden Ear', () => {
  assert.equal(game.earQuiz({ lang: 'tr', correct: 10, total: 10 }), 60);
  assert.ok(rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'ear-perfect'));
});

test('alphabet achievement after hearing every letter', () => {
  for (const l of languages.uk.alphabet) game.letterTapped('uk', l.key ?? l.lower);
  assert.ok(rewards.some((r) => r.kind === 'achievement' && r.achievement.id === 'alphabet'));
});

test('streak repair: miss a day, then do double the goal', () => {
  const now = new Date(2026, 10, 21, 18);
  const key = (offset) => { const d = new Date(now); d.setDate(d.getDate() - offset); return store.dayKey(d); };
  const days = store.getDays('tr');
  const on = (...tallies) => ({ dev: Object.fromEntries(tallies.map((reviews, i) => [`d${i}`, { reviews }])) });
  days[key(4)] = on(5);
  days[key(3)] = on(2, 3);
  days[key(2)] = on(5);
  // yesterday (1) missed
  assert.equal(store.streak('tr', now), 0);
  const offer = game.repairOffer('tr', now);
  assert.equal(offer.lost, 3);
  assert.equal(offer.target, 40);
  days[key(0)] = on(20, 19);
  assert.equal(game.checkRepair('tr', now), false);
  days[key(0)] = on(20, 20);
  assert.equal(game.checkRepair('tr', now), true);
  assert.equal(store.streak('tr', now), 5, 'missed day is repaired: 3 + yesterday + today');
  assert.equal(game.repairOffer('tr', now), null);
});

test('personal goals: progress, projection and completion', () => {
  const now = new Date(2026, 10, 21, 12);
  game.setPersonalGoal('tr', { words: 10, by: '2026-11-30' });
  const days = store.getDays('tr');
  days[store.dayKey(now)] = { dev: { a: { learned: 4 }, b: { learned: 3 } } };
  learn('tr', languages.tr.words.slice(0, 7).map((w) => w.id));
  const p = game.personalGoal('tr', now);
  assert.equal(p.learned, 7);
  assert.equal(p.remaining, 3);
  assert.equal(p.pct, 70);
  assert.ok(p.eta instanceof Date && p.eta > now);
  assert.equal(p.perDayNeeded, 1);
  learn('tr', languages.tr.words.slice(7, 10).map((w) => w.id));
  game.answer({ lang: 'tr', rating: GOOD });
  assert.ok(kinds().includes('personal-goal'));
  assert.ok(game.state().goals.tr.doneAt);
  assert.ok(Math.abs(p.eta - now) < 30 * DAY);
});

test('personal goals: one that is already reached when set is never paid', () => {
  learn('tr', languages.tr.words.slice(0, 30).map((w) => w.id));
  for (let i = 0; i < 5; i++) game.setPersonalGoal('tr', { words: 25 }); // "Set a new goal" → "Set goal", again and again
  game.setPersonalGoal('tr', null);
  game.setPersonalGoal('tr', { words: 25 }); // Remove, then set it again
  assert.equal(game.totalXp(), 0);
  assert.equal(game.counters().personalGoals, 0);
  assert.ok(!kinds().includes('personal-goal'));
  assert.ok(game.personalGoal('tr').goal.doneAt, 'recorded as done');
  // a goal ahead of the learner pays once, when it is reached
  game.setPersonalGoal('tr', { words: 35 });
  learn('tr', languages.tr.words.slice(30, 35).map((w) => w.id));
  game.answer({ lang: 'tr', rating: GOOD });
  game.answer({ lang: 'tr', rating: GOOD });
  assert.equal(rewards.filter((r) => r.kind === 'personal-goal').length, 1);
  assert.equal(game.counters().personalGoals, 1);
});

test('personal goals: removing one keeps a dated tombstone', () => {
  game.setPersonalGoal('tr', { words: 100 });
  const { set } = game.state().goals.tr;
  game.setPersonalGoal('tr', null);
  assert.equal(game.state().goals.tr.removed, true);
  assert.ok(game.state().goals.tr.set > set, 'newer than the goal it removes');
  assert.equal(game.personalGoal('tr').goal, null);
  game.answer({ lang: 'tr', rating: GOOD }); // evaluate() skips it
  assert.ok(!kinds().includes('personal-goal'));
});

test('sync: a goal another device already completed is not paid again here', () => {
  // both devices have the same goal; device B completes it and gets the reward
  game.setPersonalGoal('tr', { words: 5 });
  const goal = { ...game.state().goals.tr };
  const words = languages.tr.words.slice(0, 5).map((w) => w.id);
  const cards = Object.fromEntries(words.map((id) => [id, review(newCard(), GOOD)]));
  const remote = {
    device: 'B',
    progress: { tr: { cards, days: {} } },
    game: { dev: { B: { xp: 150, xpBy: { tr: 150 }, c: { personalGoals: 1 } } }, goals: { tr: { ...goal, doneAt: Date.now() } } },
  };
  store.applySync(mergeAll(store.syncData(), remote, { device: store.deviceId() }));
  game.refresh('tr');
  assert.ok(!kinds().includes('personal-goal'));
  assert.equal(game.counters().personalGoals, 1, 'B’s completion only');
  assert.equal(game.totalXp(), 150);
});

test('every achievement has a reachable metric', () => {
  const m = game.metrics();
  for (const a of game.ACHIEVEMENTS) assert.ok(a.metric in m, `${a.id}: unknown metric ${a.metric}`);
  assert.equal(new Set(game.ACHIEVEMENTS.map((a) => a.id)).size, game.ACHIEVEMENTS.length);
});

test('new counters: hands-free rounds, dictation, own texts and the trip kit unlock their achievements', () => {
  store._resetAll();
  for (const a of ['handsfree-5', 'dictation-20', 'own-text', 'trip-kit']) assert.ok(game.ACHIEVEMENTS.some((x) => x.id === a), a);
  const m0 = game.metrics();
  for (const k of ['handsFree', 'dictations', 'ownTextPractice', 'kitDone']) assert.equal(m0[k], 0, k);

  for (let i = 0; i < 5; i++) game.count({ lang: 'tr', key: 'handsFree' });
  for (let i = 0; i < 20; i++) game.count({ lang: 'tr', key: 'dictations' });
  game.count({ lang: 'tr', key: 'kitDone', once: true });
  game.count({ lang: 'tr', key: 'kitDone', once: true });
  game.textPractised({ lang: 'tr', id: 'my-abc', mode: 'repeat', own: true });
  game.count({ lang: 'tr', key: 'not-a-counter' });
  const m = game.metrics();
  assert.deepEqual([m.handsFree, m.dictations, m.kitDone, m.ownTextPractice], [5, 20, 1, 1]);
  assert.equal('not-a-counter' in m, false);
  for (const a of game.ACHIEVEMENTS.filter((x) => ['handsfree-5', 'dictation-20', 'own-text', 'trip-kit'].includes(x.id))) {
    assert.ok(m[a.metric] >= a.target, `${a.id} is reached`);
  }
  store._resetAll();
});
