import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// A browser-like setup, installed before store.js loads: localStorage, window
// events, and a fake Capacitor bridge with the Preferences plugin (the native
// mirror of the saved data).
const local = new Map();
globalThis.localStorage = {
  getItem: (k) => (local.has(k) ? local.get(k) : null),
  setItem: (k, v) => local.set(k, String(v)),
  removeItem: (k) => local.delete(k),
  key: (i) => [...local.keys()][i] ?? null,
  get length() { return local.size; },
};
const native = new Map();
const events = [];
const handlers = {};
const appListeners = {};
let nativeSets = 0;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; this.detail = init?.detail; } };
globalThis.window = {
  Capacitor: {
    isNativePlatform: () => true,
    getPlatform: () => 'android',
    PluginHeaders: [{ name: 'Preferences' }, { name: 'App' }],
    addListener: (name, event, fn) => { appListeners[`${name}.${event}`] = fn; return { remove() {} }; },
    nativePromise: async (name, method, { key, value } = {}) => {
      if (method === 'set') { nativeSets++; native.set(key, value); }
      if (method === 'get') return { value: native.get(key) ?? null };
      if (method === 'remove') native.delete(key);
      return {};
    },
  },
  dispatchEvent: (e) => { events.push(e); (handlers[e.type] || []).forEach((f) => f(e)); },
  addEventListener: (t, f) => (handlers[t] ||= []).push(f),
};

const T = new Date(2026, 10, 18, 12).getTime();
const today = () => new Date();

// An old-format state (flat day tallies, no goalMet flags) saved by the previous build.
local.set('lisan:device', 'mine1');
const todayKey = (() => { const d = today(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();
local.set('lisan:v1', JSON.stringify({
  settings: { onboarded: true, dailyGoal: 20, rate: '0.8' },
  progress: { tr: { cards: { merhaba: { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T }, selam: null }, days: { [todayKey]: { reviews: 21, learned: 0, practiced: 0, correct: 20 }, '2026-11-01': { reviews: 3 } } } },
  game: {},
}));

const store = await import('../js/store.js');
const { OLD_DEV } = await import('../js/sync.js');
const goalEvents = () => events.filter((e) => e.type === 'lisan:goal-reached').length;

// What the app sees right after loading the old data (checked before any test resets it).
const loaded = {
  rate: store.getSettings().rate,
  cards: Object.keys(store.getCards('tr')),
  today: JSON.parse(JSON.stringify(store.getDays('tr')[todayKey])),
  older: JSON.parse(JSON.stringify(store.getDays('tr')['2026-11-01'])),
  total: store.dayTotal(store.getDay('tr')),
};
store.logActivity('tr', { reviews: 1 });
loaded.goalEventsAfterNextExercise = goalEvents();

test('old saved data is checked and converted on load', () => {
  assert.equal(loaded.rate, 0.8, 'a numeric string is read as a number');
  assert.deepEqual(loaded.cards, ['merhaba'], 'the null card is dropped');
  assert.deepEqual(loaded.today.dev, { [OLD_DEV]: { reviews: 21, learned: 0, practiced: 0, correct: 20 } }, 'flat tallies go into the shared old slot');
  assert.equal(loaded.today.reviews, undefined);
  assert.equal(loaded.today.goalMet, true, 'the old build already paid today’s goal (21 ≥ 20)');
  assert.deepEqual(loaded.older, { dev: { [OLD_DEV]: { reviews: 3 } } });
  assert.equal(loaded.total, 21);
  assert.equal(loaded.goalEventsAfterNextExercise, 0, 'so the next exercise doesn’t pay it a second time');
});

beforeEach(() => {
  store._resetAll();
  events.length = 0;
});

test('day tallies are kept per device and summed when read', () => {
  store.logActivity('tr', { reviews: 2, correct: 1 });
  store.logActivity('tr', { learned: 3 });
  const raw = store.getDays('tr')[store.dayKey()];
  assert.deepEqual(raw.dev[store.deviceId()], { reviews: 2, learned: 3, practiced: 0, correct: 1 });
  raw.dev.other = { reviews: 10, practiced: 1, correct: 9 }; // synced from another device
  assert.deepEqual(store.getDay('tr'), { reviews: 12, learned: 3, practiced: 1, correct: 10, repaired: false, goalMet: false });
  assert.equal(store.dayTotal(store.getDay('tr')), 16);
  assert.equal(store.dayTotal(raw), 16, 'raw days can be summed too');
  assert.equal(store.isActive(raw), true);
  assert.equal(store.streak('tr'), 1);
});

test('daily goal: paid once a day, even when the goal is raised again', () => {
  store.updateSettings({ dailyGoal: 10 });
  for (let i = 0; i < 10; i++) store.logActivity('tr', { reviews: 1 });
  assert.equal(goalEvents(), 1);
  assert.equal(store.getDay('tr').goalMet, true);
  store.updateSettings({ dailyGoal: 20 });
  for (let i = 0; i < 50; i++) store.logActivity('tr', { reviews: 1 });
  store.updateSettings({ dailyGoal: 40 });
  assert.equal(goalEvents(), 1, 'crossing a raised goal on the same day pays nothing more');
});

test('daily goal: lowering it below today’s total credits today, once', () => {
  store.updateSettings({ dailyGoal: 20 });
  for (let i = 0; i < 15; i++) store.logActivity('tr', { reviews: 1 });
  assert.equal(goalEvents(), 0);
  store.updateSettings({ dailyGoal: 10 });
  assert.equal(goalEvents(), 1);
  assert.equal(events.find((e) => e.type === 'lisan:goal-reached').detail.lang, 'tr');
  store.updateSettings({ dailyGoal: 20 });
  store.updateSettings({ dailyGoal: 10 });
  store.logActivity('tr', { reviews: 1 });
  assert.equal(goalEvents(), 1);
  store.updateSettings({ lessonSize: 7 });
  assert.equal(goalEvents(), 1, 'other settings never re-check');
});

test('daily goal: met by two devices together after a sync', () => {
  store.updateSettings({ dailyGoal: 20 });
  for (let i = 0; i < 15; i++) store.logActivity('tr', { reviews: 1 });
  const { progress, game } = JSON.parse(JSON.stringify(store.syncData()));
  progress.tr.days[store.dayKey()].dev.otherDevice = { reviews: 15, learned: 0, practiced: 0, correct: 15 };
  store.applySync({ progress, game });
  assert.equal(store.dayTotal(store.getDay('tr')), 30);
  assert.equal(goalEvents(), 1);
  store.applySync(JSON.parse(JSON.stringify(store.syncData())));
  assert.equal(goalEvents(), 1, 'and only once');
});

test('unmarking a word keeps a tombstone that every reader skips', () => {
  store.setCard('tr', 'kedi', { ease: 2.5, interval: 30, reps: 3, lapses: 0, due: T, added: T, last: T, known: true });
  assert.ok(store.getCard('tr', 'kedi'));
  assert.equal(store.hasAnyProgress(), true);
  store.deleteCard('tr', 'kedi');
  assert.equal(store.getCard('tr', 'kedi'), undefined);
  assert.deepEqual(store.getCards('tr'), {});
  assert.equal(store.hasAnyProgress(), false);
  const raw = store.syncData().progress.tr.cards.kedi;
  assert.equal(raw.deleted, true);
  assert.ok(raw.last > T, 'stamped newer than the card it removes');
  assert.equal(store.getCard('tr', 'constructor'), undefined, 'inherited properties are not cards');
});

test('own spellings for the voice: kept per language on this device, in backups but not in sync data', () => {
  assert.deepEqual(store.getSay('ja'), {});
  assert.equal(store.setSay('ja', '今日', '  きょう \n'), 'きょう');
  assert.equal(store.setSay('ja', '明日', 'あした'), 'あした');
  assert.equal(store.setSay('uk', 'молоко', 'молоко\u0301'), 'молоко\u0301');
  assert.deepEqual(store.getSay('ja'), { 今日: 'きょう', 明日: 'あした' });
  store.getSay('ja').今日 = 'changed'; // a copy: changing it changes nothing
  assert.equal(store.getSay('ja').今日, 'きょう');
  assert.equal(store.setSay('ja', '明日', '   '), '', 'an empty text removes it');
  assert.deepEqual(store.getSay('ja'), { 今日: 'きょう' });
  assert.equal(store.setSay('ja', 'x', 'y'.repeat(500)).length, store.SAY_MAX);
  // nothing odd gets in
  for (const [lang, id] of [['constructor', 'a'], ['ja', '__proto__'], ['ja', ''], ['ja', 'i'.repeat(81)], ['JA', 'a'], ['ja', 5]]) {
    assert.equal(store.setSay(lang, id, 'text'), '', `${lang}/${id}`);
  }
  assert.deepEqual(store.getSay('constructor'), {});
  // a sync code carries progress and own words, not these
  assert.equal(JSON.stringify(store.syncData()).includes('きょう'), false);
  // resetting a language's progress leaves them (they are about the voice, not about learning)
  store.resetProgress('ja');
  assert.equal(store.getSay('ja').今日, 'きょう');
  // a backup file has them, and brings them back — checked on the way in
  const backup = JSON.parse(store.exportData());
  assert.equal(backup.say.ja.今日, 'きょう');
  backup.say.ja.bad = { not: 'a string' };
  backup.say.ja.empty = '   ';
  backup.say.zz9 = { a: 'b' };
  backup.say.tr = 'nope';
  store.setSay('ja', '今日', '');
  store.importData(JSON.stringify(backup));
  assert.deepEqual(Object.keys(store.getSay('ja')).sort(), ['x', '今日']);
  assert.deepEqual(store.getSay('uk'), { молоко: 'молоко\u0301' });
  assert.deepEqual(store.getSay('tr'), {});
  // a backup from before the feature
  delete backup.say;
  store.importData(JSON.stringify(backup));
  assert.deepEqual(store.getSay('ja'), {});
});

test('skills: the last answers of each kind, per language, on this device', () => {
  assert.deepEqual(store.getSkills('tr'), {});
  for (let i = 0; i < 10; i++) store.logSkill('tr', 'listening', i % 2 === 0);
  store.logSkill('tr', 'spelling', false);
  store.logSkill('uk', 'listening', true);
  assert.deepEqual(store.getSkills('tr'), { listening: { right: 5, total: 10 }, spelling: { right: 0, total: 1 } });
  assert.deepEqual(store.getSkills('uk'), { listening: { right: 1, total: 1 } });
  // a window: older answers fall out
  for (let i = 0; i < store.SKILL_WINDOW; i++) store.logSkill('tr', 'listening', true);
  assert.deepEqual(store.getSkills('tr').listening, { right: store.SKILL_WINDOW, total: store.SKILL_WINDOW });
  // nothing odd gets in
  for (const [lang, id] of [['constructor', 'listening'], ['tr', '__proto__'], ['tr', 'constructor1'], ['tr', ''], ['tr', 'UP'], ['tr', 7]]) store.logSkill(lang, id, true);
  assert.deepEqual(Object.keys(store.getSkills('tr')).sort(), ['listening', 'spelling']);
  assert.deepEqual(store.getSkills('constructor'), {});
  // not in sync data; in backups, checked on the way in
  assert.equal('skills' in store.syncData(), false);
  const backup = JSON.parse(store.exportData());
  assert.equal(backup.skills.tr.spelling, '0');
  backup.skills.tr.recall = '1'.repeat(100);
  backup.skills.tr.reading = '10x1';
  backup.skills.tr.speaking = 11;
  backup.skills.ja = 'nope';
  store.importData(JSON.stringify(backup));
  assert.deepEqual(store.getSkills('tr').recall, { right: store.SKILL_WINDOW, total: store.SKILL_WINDOW });
  assert.deepEqual(Object.keys(store.getSkills('tr')).sort(), ['listening', 'recall', 'spelling']);
  assert.deepEqual(store.getSkills('ja'), {});
  // resetting a language's progress clears its skills, and only its own
  store.resetProgress('tr');
  assert.deepEqual(store.getSkills('tr'), {});
  assert.deepEqual(store.getSkills('uk'), { listening: { right: 1, total: 1 } });
});

test('reset progress remembers when it happened', () => {
  store.setCard('tr', 'kedi', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T });
  const before = Date.now();
  store.resetProgress('tr');
  assert.deepEqual(store.getCards('tr'), {});
  assert.ok(store.syncData().progress.tr.resetAt >= before);
});

test('reset progress can’t earn today’s daily goal a second time', () => {
  store.updateSettings({ dailyGoal: 10 });
  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < 10; i++) store.logActivity('ja', { reviews: 1 });
    store.resetProgress('ja');
  }
  assert.equal(goalEvents(), 1);
  assert.equal(store.dayTotal(store.getDay('ja')), 0, 'today’s work is cleared');
  assert.equal(store.isActive(store.getDays('ja')[store.dayKey()]), false, 'and no longer counts for the streak');
});

test('import: old backups are converted, malformed values never reach the app', () => {
  store.importData(JSON.stringify({
    app: 'lisan', version: 1,
    settings: { rate: '0.9', dailyGoal: 1e9, lessonSize: 'many', gameOn: 'yes', voices: { tr: 'Yelda', ja: 5 }, extra: 'kept', obj: { a: 1 } },
    progress: { tr: { cards: { a: null, b: 'x', c: { ease: 2.5, interval: 1, reps: 1, due: Infinity }, ok: { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T } }, days: { [store.dayKey()]: { reviews: 25 }, nonsense: { reviews: 1 } } }, ja: null },
    game: { dev: { x: { xp: 1e300, c: { answers: -4, lessons: 3 } } }, xp: 120, c: { answers: 7 }, goals: { tr: null }, week: { key: '2026-11-16', picks: ['nope'], p: { xp: 5 }, done: {}, goalDays: [] } },
  }));
  const s = store.getSettings();
  assert.equal(s.rate, 0.9);
  assert.equal(s.dailyGoal, 500, 'clamped');
  assert.equal(s.lessonSize, 5, 'wrong type → default');
  assert.equal(s.gameOn, true);
  assert.deepEqual(s.voices, { tr: 'Yelda' });
  assert.equal(s.extra, 'kept');
  assert.equal(s.obj, undefined);
  assert.deepEqual(Object.keys(store.getCards('tr')), ['ok']);
  assert.deepEqual(Object.keys(store.getDays('tr')), [store.dayKey()]);
  assert.deepEqual(store.getDays('tr')[store.dayKey()].dev, { [OLD_DEV]: { reviews: 25 } });
  assert.equal(store.syncData().progress.ja, undefined);
  const g = store.getGame();
  assert.equal(g.dev.x.xp, 1e9, 'XP clamped');
  assert.deepEqual(g.dev.x.c, { lessons: 3 });
  assert.equal(g.dev[store.deviceId()].xp, 120, 'pre-per-device XP belongs to this device');
  assert.deepEqual(g.goals, {});
  assert.deepEqual(g.week.p, { [store.deviceId()]: { xp: 5 } });
  assert.throws(() => store.importData('{"app":"lisan","progress":null}'), /not a Lisan backup/);
  assert.throws(() => store.importData('not json'), /not a Lisan backup/);
});

test('import: a backup made by the previous build', () => {
  // exportData() output of the previous build (flat day tallies, goal removed as null)
  const backup = {
    app: 'lisan', version: 1, exported: '2026-11-11T10:00:00.000Z',
    settings: { lang: 'uk', rate: 1, voiceURI: '', lessonSize: 8, sessionSize: 25, autoplay: false, dailyGoal: 40, onboarded: true, gameOn: true, voices: { uk: 'v' } },
    progress: { uk: { cards: { 'привіт': { ease: 2.5, interval: 3, reps: 2, lapses: 0, due: T, added: T - 1e8, last: T } }, days: { '2026-11-10': { reviews: 41, learned: 2, practiced: 0, correct: 40 } } } },
    game: { dev: { old: { xp: 900, xpBy: { uk: 900 }, c: { answers: 41 } } }, letters: { uk: ['а'] }, unlocked: { 'first-lesson': T }, unseen: ['first-lesson'], goals: { uk: { words: 50, by: null, set: T, doneAt: null }, tr: null }, spoken: { day: '2026-11-10', ids: ['uk:привіт'] }, grammar: {}, week: { key: '2026-11-09', picks: ['xp', 'ear', 'learn'], p: { old: { xp: 900 } }, done: {}, goalDays: ['2026-11-10'] } },
  };
  store.importData(JSON.stringify(backup));
  assert.equal(store.getSettings().lang, 'uk');
  assert.equal(store.getSettings().autoplay, false);
  assert.deepEqual(Object.keys(store.getCards('uk')), ['привіт']);
  assert.deepEqual(store.getDay('uk', new Date(2026, 10, 10)), { reviews: 41, learned: 2, practiced: 0, correct: 40, repaired: false, goalMet: true });
  const g = store.getGame();
  assert.equal(g.dev.old.xp, 900);
  assert.deepEqual(g.unlocked, { 'first-lesson': T });
  assert.deepEqual(g.goals, { uk: { words: 50, by: null, set: T, doneAt: null } });
  assert.deepEqual(g.spoken, { day: '2026-11-10', ids: ['uk:привіт'], best: {} });
  // and it exports again in the current format
  const again = JSON.parse(store.exportData());
  assert.deepEqual(again.progress.uk.days['2026-11-10'].dev, { [OLD_DEV]: { reviews: 41, learned: 2, practiced: 0, correct: 40 } });
});

test('delete all my data: every language, game, settings, device id, sync log and the native mirror', async () => {
  store.updateSettings({ dailyGoal: 40, onboarded: true });
  store.setCard('tr', 'kedi', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T });
  store.setCard('ja', '水', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T });
  store.getGame().dev = { x: { xp: 5, xpBy: {}, c: {} } };
  store.persist();
  store.syncLog({ kind: 'sent' });
  store.deviceId();
  await new Promise((r) => setTimeout(r, 0)); // let the native mirror catch up
  assert.ok(native.get('lisan:v1'));
  assert.ok(local.get('lisan:v1') && local.get('lisan:device') && local.get('lisan:synclog'));
  local.set('lisan:other', '1');

  await store.deleteAllData();
  for (const k of ['lisan:v1', 'lisan:device', 'lisan:synclog', 'lisan:other']) assert.equal(local.has(k), false, k);
  assert.equal(native.has('lisan:v1'), false);
  assert.equal(store.hasAnyProgress(), false);
  assert.equal(store.getSettings().onboarded, false);
  assert.equal(store.getSettings().dailyGoal, 20);
  assert.deepEqual(store.getGame(), {});
  // Nothing is written back before the app reloads.
  store.persist();
  store.logActivity('tr', { reviews: 1 });
  store.syncLog({ kind: 'sent' });
  store.deviceId();
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(local.size, 0);
  assert.equal(native.size, 0);
});

test('native mirror: restores the WebView copy when it was cleared', async () => {
  store.setCard('tr', 'kedi', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T });
  await new Promise((r) => setTimeout(r, 0));
  local.delete('lisan:v1');
  store._resetAll();
  await store.init();
  assert.ok(store.getCard('tr', 'kedi'));
});

test('native mirror: written at most every 10 s while the app is used, and when it is left', async () => {
  const tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));
  nativeSets = 0;
  store.setCard('tr', 'a', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T });
  await tick();
  assert.equal(nativeSets, 1, 'the first change goes across straight away');
  store.setCard('tr', 'b', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T });
  await tick(350);
  assert.ok(JSON.parse(local.get('lisan:v1')).progress.tr.cards.b, 'localStorage has it');
  assert.equal(nativeSets, 1, 'the native copy waits');
  appListeners['App.pause']();
  assert.equal(nativeSets, 2, 'the app going to the background writes it');
  assert.ok(JSON.parse(native.get('lisan:v1')).progress.tr.cards.b);
  store.setCard('tr', 'c', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T });
  handlers.pagehide.forEach((f) => f());
  assert.equal(nativeSets, 3, 'so does closing the page');
  assert.ok(JSON.parse(local.get('lisan:v1')).progress.tr.cards.c);
});

test('native mirror: when the WebView can’t store anything, the mirror keeps the progress', async () => {
  const set = globalThis.localStorage.setItem;
  globalThis.localStorage.setItem = () => { throw Object.assign(new Error('full'), { name: 'QuotaExceededError' }); };
  try {
    store.setCard('tr', 'kedi', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T });
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));
    assert.ok(JSON.parse(native.get('lisan:v1')).progress.tr.cards.kedi);
    assert.equal(store.storageProblem(), null, 'nothing to warn about: it is saved natively');
  } finally {
    globalThis.localStorage.setItem = set;
  }
  // Next launch: the WebView copy is gone, the mirror brings it back.
  local.delete('lisan:v1');
  store._resetAll();
  await store.init();
  assert.ok(store.getCard('tr', 'kedi'));
});

test('native mirror: when the WebView storage fills up, the next launch gets the newest progress, not its outdated copy', async () => {
  const card = { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T };
  store.setCard('tr', 'before', card);
  store.flush();
  await new Promise((r) => setTimeout(r, 0));
  assert.ok(JSON.parse(local.get('lisan:v1')).progress.tr.cards.before, 'an older copy is in the WebView');
  const set = globalThis.localStorage.setItem;
  globalThis.localStorage.setItem = (k, v) => {
    if (k === 'lisan:v1') throw Object.assign(new Error('full'), { name: 'QuotaExceededError' });
    return set(k, v);
  };
  try {
    store.setCard('tr', 'after', card);
    store.flush();
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));
    assert.ok(JSON.parse(native.get('lisan:v1')).progress.tr.cards.after, 'the mirror has it');
  } finally {
    globalThis.localStorage.setItem = set;
  }
  // Next launch: load() reads the WebView, then init() checks the mirror.
  store._resetAll();
  await store.init();
  assert.ok(store.getCard('tr', 'after'), 'the outdated WebView copy did not win');
  assert.ok(store.getCard('tr', 'before'));
});
