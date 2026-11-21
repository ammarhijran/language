import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as store from '../js/store.js';
import * as game from '../js/game.js';
import { newCard, review, markKnown, GOOD, HARD, AGAIN, DAY } from '../js/srs.js';
import { languages } from '../js/languages/index.js';

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
  assert.equal(game.state().xpBy.tr, game.totalXp());
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
  game.answer({ lang: 'tr', rating: GOOD });
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

test('speaking counts once per word per day; XP only outside sessions', () => {
  assert.equal(game.spoke({ lang: 'tr', wordId: 'kedi', score: 0.95 }), 8);
  assert.equal(game.spoke({ lang: 'tr', wordId: 'kedi', score: 1 }), 0, 'same word again today');
  assert.equal(game.spoke({ lang: 'tr', wordId: 'su', score: 1, inSession: true }), 0);
  assert.equal(game.state().c.speakGreat, 2);
  assert.equal(game.state().c.speakPerfect, 1);
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
  days[key(4)] = { reviews: 5 };
  days[key(3)] = { reviews: 5 };
  days[key(2)] = { reviews: 5 };
  // yesterday (1) missed
  assert.equal(store.streak('tr', now), 0);
  const offer = game.repairOffer('tr', now);
  assert.equal(offer.lost, 3);
  assert.equal(offer.target, 40);
  days[key(0)] = { reviews: 39 };
  assert.equal(game.checkRepair('tr', now), false);
  days[key(0)] = { reviews: 40 };
  assert.equal(game.checkRepair('tr', now), true);
  assert.equal(store.streak('tr', now), 5, 'missed day is repaired: 3 + yesterday + today');
  assert.equal(game.repairOffer('tr', now), null);
});

test('personal goals: progress, projection and completion', () => {
  const now = new Date(2026, 10, 21, 12);
  game.setPersonalGoal('tr', { words: 10, by: '2026-11-30' });
  const days = store.getDays('tr');
  days[store.dayKey(now)] = { learned: 7 };
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

test('every achievement has a reachable metric', () => {
  const m = game.metrics();
  for (const a of game.ACHIEVEMENTS) assert.ok(a.metric in m, `${a.id}: unknown metric ${a.metric}`);
  assert.equal(new Set(game.ACHIEVEMENTS.map((a) => a.id)).size, game.ACHIEVEMENTS.length);
});
