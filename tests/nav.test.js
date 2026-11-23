// Navigation logic without a browser: the learning path and "continue where
// I left off", saved words and phrases (store, sanitize and sync merge), and
// search ranking.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from './all-languages.js';
import { learningPath, nextTopics, nextCategory, topicCounts, stagesOf } from '../js/stats.js';
import { sanitize, mergeAll } from '../js/sync.js';
import * as store from '../js/store.js';
import { tripKit } from '../js/kit.js';
import { NEWS, newsToShow } from '../js/news.js';
import { rankEntries, scoreEntry, searchGrammar, searchTexts, searchLines, searchTopics, glossesOf } from '../js/views/search.js';

const card = (t = Date.now()) => ({ ease: 2.5, interval: 1, reps: 1, lapses: 0, due: t + 86400000, added: t, last: t });
const group = (c) => c.group || 'words';

/** A view context with these cards and this last topic. */
function ctxFor(lang, { cards = {}, lastCat = null } = {}) {
  return { lang, store: { getCards: () => cards, getLastCat: () => lastCat } };
}
const learnAll = (lang, catId, cards = {}) => {
  for (const w of lang.wordsIn(catId)) cards[w.id] = card();
  return cards;
};

// ---------- Learning path and resume ----------

for (const [code, lang] of Object.entries(languages)) {
  test(`${code}: the learning path holds every topic once and mixes phrases in early`, () => {
    const path = learningPath(lang);
    assert.equal(path.length, lang.categories.length);
    assert.equal(new Set(path).size, path.length);
    assert.equal(path[0], lang.categories[0], 'it starts with the first word topic (Essentials)');
    const firstPhrase = path.findIndex((c) => group(c) === 'phrases');
    const firstTalk = path.findIndex((c) => group(c) === 'talk');
    assert.ok(firstPhrase > 0 && firstPhrase <= 3, `first phrase situation at ${firstPhrase}`);
    assert.ok(firstTalk > firstPhrase && firstTalk <= firstPhrase + 1, 'Talk like a local right after the first phrase situation');
    // Never more than two word topics in a row while phrase situations are left.
    const lastPhrase = path.map(group).lastIndexOf('phrases');
    let run = 0;
    for (const c of path.slice(0, lastPhrase)) {
      run = group(c) === 'words' ? run + 1 : 0;
      assert.ok(run <= 2, 'two word topics, then a phrase situation');
    }
    // Each group keeps the pack's order (most common first).
    for (const g of ['words', 'phrases', 'talk']) {
      assert.deepEqual(path.filter((c) => group(c) === g), lang.categories.filter((c) => group(c) === g));
    }
  });
}

test('learning path: the default order, and a pack’s own `path`', () => {
  const ids = learningPath(languages.tr).slice(0, 8).map((c) => c.id);
  assert.deepEqual(ids, ['essentials', 'numbers', 'p-smalltalk', 'everyday', 'people', 'food', 'p-cafe', 'time']);
  const cats = [{ id: 'a' }, { id: 'b', group: 'phrases' }, { id: 'c' }];
  const pack = { categories: cats, path: ['c', 'nope', 'b', 'c'] };
  assert.deepEqual(learningPath(pack).map((c) => c.id), ['c', 'b', 'a'], 'listed first, unknown ids skipped, the rest after');
});

test('next topics: a new learner starts at the beginning of the path', () => {
  const lang = languages.tr;
  const { resume, next } = nextTopics(ctxFor(lang));
  assert.equal(resume, null);
  assert.deepEqual(next.map((c) => c.id), learningPath(lang).slice(0, 3).map((c) => c.id));
  assert.equal(nextCategory(ctxFor(lang)).id, 'essentials');
});

test('next topics: the last topic started is resumed while it has new words', () => {
  const lang = languages.ja;
  const cards = {};
  for (const w of lang.wordsIn('p-cafe').slice(0, 5)) cards[w.id] = card();
  const ctx = ctxFor(lang, { cards, lastCat: 'p-cafe' });
  const { resume, next } = nextTopics(ctx);
  assert.equal(resume.id, 'p-cafe');
  assert.ok(!next.includes(resume), 'the next topics are other topics');
  assert.equal(next[0].id, 'essentials');
  assert.equal(nextCategory(ctx).id, 'p-cafe', 'Review’s “Learn something new” continues it too');
});

test('next topics: a finished or unknown last topic isn’t resumed; finished topics are skipped', () => {
  const lang = languages.uk;
  const cards = learnAll(lang, 'essentials', learnAll(lang, 'numbers'));
  learnAll(lang, 'p-cafe', cards);
  assert.equal(nextTopics(ctxFor(lang, { cards, lastCat: 'p-cafe' })).resume, null);
  assert.equal(nextTopics(ctxFor(lang, { cards, lastCat: 'no-such-topic' })).resume, null);
  assert.deepEqual(nextTopics(ctxFor(lang, { cards }), { count: 2 }).next.map((c) => c.id), ['p-smalltalk', 'everyday']);
  // Everything learned: nothing left to suggest.
  const all = {};
  for (const w of lang.words) all[w.id] = card();
  const done = nextTopics(ctxFor(lang, { cards: all, lastCat: 'p-cafe' }));
  assert.equal(done.resume, null);
  assert.deepEqual(done.next, []);
  assert.equal(nextCategory(ctxFor(lang, { cards: all })), undefined);
});

test('topic counts: learned and total per topic', () => {
  const lang = languages.ar;
  const cards = { [lang.wordsIn('food')[0].id]: card(), [lang.wordsIn('food')[1].id]: card() };
  const counts = topicCounts(ctxFor(lang, { cards }));
  assert.deepEqual(counts.get('food'), { learned: 2, total: lang.wordsIn('food').length });
  assert.deepEqual(counts.get('essentials'), { learned: 0, total: lang.wordsIn('essentials').length });
  assert.equal([...counts.values()].reduce((s, n) => s + n.total, 0), lang.words.length);
});

// ---------- Saved words and phrases, last topic: store ----------

test('store: saving, unsaving (tombstone) and the newest-first list', async (t) => {
  store._resetAll();
  t.mock.timers.enable({ apis: ['Date'], now: 1_000_000 });
  assert.deepEqual(store.getFavs('tr'), []);
  assert.equal(store.setFav('tr', 'çay', true), true);
  t.mock.timers.tick(1000);
  store.setFav('tr', 'su', true);
  assert.deepEqual(store.getFavs('tr'), ['su', 'çay'], 'most recently saved first');
  assert.equal(store.isFav('tr', 'çay'), true);
  assert.equal(store.isFav('ja', 'çay'), false, 'per language');
  store.setFav('tr', 'çay', false);
  assert.equal(store.isFav('tr', 'çay'), false);
  assert.deepEqual(store.getFavs('tr'), ['su']);
  const fav = store.syncData().progress.tr.fav;
  assert.equal(fav['çay'].deleted, true, 'unsaving leaves a tombstone for sync');
  assert.ok(fav['çay'].last > fav.su.last - 1000, 'stamped newer than the save it replaces');
  // Unsaving again changes nothing.
  const before = JSON.stringify(store.syncData());
  store.setFav('tr', 'çay', false);
  assert.equal(JSON.stringify(store.syncData()), before);
  t.mock.timers.reset();
});

test('store: the last topic, and Reset progress keeps saved entries', () => {
  store._resetAll();
  assert.equal(store.getLastCat('ja'), null);
  store.setLastCat('ja', 'p-cafe');
  const first = store.syncData().progress.ja.lastCat.at;
  store.setLastCat('ja', 'food');
  assert.equal(store.getLastCat('ja'), 'food');
  assert.ok(store.syncData().progress.ja.lastCat.at > first, 'each start is stamped newer');
  store.setFav('ja', '水', true);
  store.resetProgress('ja');
  assert.deepEqual(store.getFavs('ja'), ['水'], 'saved phrases are a phrasebook, not progress');
  assert.equal(store.getLastCat('ja'), null);
});

// ---------- Sanitize and merge ----------

test('sanitize: saved entries and the last topic survive, malformed ones are dropped', () => {
  const T = 1_700_000_000_000;
  const raw = {
    progress: {
      tr: {
        cards: {}, days: {},
        fav: { çay: { last: T }, su: { deleted: true, last: T + 5 }, bad1: { last: -1 }, bad2: 'yes', bad3: { last: 'soon' }, bad4: null, ['__proto__']: { last: T } },
        lastCat: { id: 'p-cafe', at: T, extra: 1 },
      },
      ja: { cards: {}, days: {}, fav: [], lastCat: { id: 'x'.repeat(80), at: T } },
      uk: { cards: {}, days: {}, lastCat: { id: 'food', at: Infinity } },
      ar: { cards: {}, days: {}, lastCat: 'food' },
    },
  };
  const { progress } = sanitize(raw, { device: 'me' });
  assert.deepEqual(progress.tr.fav, { çay: { last: T }, su: { deleted: true, last: T + 5 } });
  assert.deepEqual(progress.tr.lastCat, { id: 'p-cafe', at: T });
  assert.equal(progress.ja.fav, undefined, 'no saved entries: no field');
  assert.equal(progress.ja.lastCat, undefined, 'an absurd id is dropped');
  assert.deepEqual(progress.uk.lastCat, { id: 'food', at: 0 }, 'a bad stamp counts as oldest');
  assert.equal(progress.ar.lastCat, undefined);
  assert.equal(Object.getPrototypeOf(progress.tr.fav), Object.prototype);
  // Data without these fields keeps its old shape.
  assert.deepEqual(Object.keys(sanitize({ progress: { tr: { cards: {}, days: {} } } }).progress.tr), ['cards', 'days']);
});

test('merge: per saved entry the newest stamp wins, tombstones included, in either order', () => {
  const T = 1_700_000_000_000;
  const a = { progress: { tr: { cards: {}, days: {}, fav: { çay: { last: T }, su: { last: T }, ekmek: { deleted: true, last: T + 9 } }, lastCat: { id: 'food', at: T } } }, game: {} };
  const b = { device: 'B', progress: { tr: { cards: {}, days: {}, fav: { çay: { deleted: true, last: T + 1 }, su: { last: T - 50 }, ekmek: { last: T + 3 }, peynir: { last: T + 2 } }, lastCat: { id: 'p-cafe', at: T + 10 } } }, game: {} };
  const ab = mergeAll(a, b, { device: 'A' });
  assert.deepEqual(ab.progress.tr.fav, {
    çay: { deleted: true, last: T + 1 }, // unsaved on B after A saved it
    su: { last: T }, // A's is newer
    ekmek: { deleted: true, last: T + 9 }, // A's removal is newer than B's save
    peynir: { last: T + 2 }, // new from B
  });
  assert.deepEqual(ab.progress.tr.lastCat, { id: 'p-cafe', at: T + 10 }, 'the newest last topic');
  assert.equal(ab.summary.changed, true);
  const sum = ab.summary.langs.find((l) => l.code === 'tr');
  assert.equal(sum.savedAdded, 1, 'peynir is saved here by the merge (ekmek stays unsaved)');
  assert.equal(sum.savedRemoved, 1, 'çay is unsaved here by the merge');
  const ba = mergeAll({ progress: b.progress, game: {} }, { device: 'A', ...a }, { device: 'B' });
  assert.deepEqual(ba.progress.tr.fav, ab.progress.tr.fav, 'the same result in either order');
  assert.deepEqual(ba.progress.tr.lastCat, ab.progress.tr.lastCat);
  const again = mergeAll(ab, b, { device: 'A' });
  assert.equal(again.summary.changed, false, 'merging the same code twice changes nothing');
});

test('merge: a tie goes to the removal; equal last topics settle on one id', () => {
  const T = 1_700_000_000_000;
  const on = { progress: { tr: { cards: {}, days: {}, fav: { su: { last: T } }, lastCat: { id: 'food', at: T } } }, game: {} };
  const off = { device: 'B', progress: { tr: { cards: {}, days: {}, fav: { su: { deleted: true, last: T } }, lastCat: { id: 'body', at: T } } }, game: {} };
  const x = mergeAll(on, off, { device: 'A' }).progress.tr;
  const y = mergeAll({ ...off }, { device: 'A', ...on }, { device: 'B' }).progress.tr;
  assert.deepEqual(x.fav.su, { deleted: true, last: T });
  assert.deepEqual(y.fav.su, x.fav.su);
  assert.deepEqual(x.lastCat, y.lastCat);
});

test('merge: saved entries arrive even for a language with no words yet, and a reset doesn’t filter them', () => {
  const T = Date.now() - 1000;
  const local = { progress: { ja: { cards: {}, days: {}, resetAt: Date.now() } }, game: {} };
  const remote = { device: 'B', progress: { ja: { cards: {}, days: {}, fav: { 水: { last: T } } }, uk: { cards: {}, days: {}, fav: { дякую: { last: T } } } }, game: {} };
  const m = mergeAll(local, remote, { device: 'A' });
  assert.deepEqual(m.progress.ja.fav, { 水: { last: T } }, 'older than the reset, still kept');
  assert.deepEqual(m.progress.uk.fav, { дякую: { last: T } });
  // Without saved entries or a last topic on either side, the merged shape is unchanged.
  const plain = mergeAll({ progress: { tr: { cards: { a: card(T) }, days: {} } }, game: {} }, { device: 'B', progress: { tr: { cards: { b: card(T) }, days: {} } }, game: {} });
  assert.deepEqual(Object.keys(plain.progress.tr), ['cards', 'days']);
});

// ---------- Search ----------

const top = (code, q, n = 1) => rankEntries(languages[code], q).slice(0, n).map((r) => r.word.tr);

test('search: the exact word comes first, then words starting with it, then phrases containing it', () => {
  assert.deepEqual(top('tr', 'çay'), ['çay']);
  assert.deepEqual(top('tr', 'cay'), ['çay'], 'without the special letters');
  const r = rankEntries(languages.tr, 'çay');
  assert.ok(r.findIndex((x) => x.word.tr === 'çaydanlık') < r.findIndex((x) => x.word.tr.includes('Bir çay')), 'a word starting with it before a phrase containing it');
  assert.deepEqual(r.map((x) => x.score), [...r.map((x) => x.score)].sort((a, b) => a - b), 'sorted best first');
  // "cay" is a word of "Bir çay alabilir miyim?" but only part of a word in "Bir yastıkta kocayın!".
  const c = rankEntries(languages.tr, 'cay').map((x) => x.word.tr);
  assert.ok(c.indexOf('Bir çay alabilir miyim?') < c.indexOf('Bir yastıkta kocayın!'), 'a whole word inside a phrase before part of a word');
  assert.equal(scoreEntry(languages.uk, languages.uk.byId('чайник'), 'чай'), 2);
});

test('search: readings, romanisation and transliteration', () => {
  assert.deepEqual(top('ja', 'arigatou'), ['ありがとう']);
  assert.deepEqual(top('ja', 'mizu'), ['水']);
  assert.deepEqual(top('ar', 'shukran'), ['شُكْرًا']);
  assert.deepEqual(top('ar', 'ma3lesh'), ['مَعْلِش'], 'Arabizi');
  assert.deepEqual(top('uk', 'dyakuyu'), ['дякую']);
  assert.deepEqual(top('uk', 'Дякую'), ['дякую']);
  // Typed with its hamza, "water" comes before مَا "what" (the same letters once the hamza is dropped).
  assert.deepEqual(top('ar', 'ماء'), ['مَاء']);
  assert.ok(top('ar', 'ما', 3).includes('مَا'));
});

test('search: English meanings — a whole meaning before a word inside one', () => {
  assert.deepEqual(top('tr', 'water'), ['su']);
  assert.deepEqual(top('tr', 'the bill'), ['hesap']);
  assert.deepEqual(top('ja', 'water'), ['水']);
  const r = rankEntries(languages.tr, 'water');
  assert.ok(r.some((x) => x.word.tr === 'karpuz'), 'watermelon still matches');
  assert.ok(r.find((x) => x.word.tr === 'su').score < r.find((x) => x.word.tr === 'karpuz').score);
  assert.deepEqual(glossesOf('to eat; a meal (food) / dinner'), ['eat', 'meal', 'dinner']);
});

test('search: an entry is found by its other-register form, just below its own forms', () => {
  const ar = languages.ar;
  const bus = ar.words.find((w) => w.pair?.tl === 'ʾotobīs');
  assert.ok(bus, 'حافلة has the Egyptian أتوبيس as its pair');
  assert.equal(rankEntries(ar, 'otobis')[0].word, bus);
  assert.equal(scoreEntry(ar, bus, 'otobis'), 0.5);
  const tr = languages.tr;
  const r = rankEntries(tr, 'nasılsın');
  assert.equal(r[0].word.tr, 'nasılsın');
  assert.equal(r[1].word.tr, 'Nasılsınız?', 'the polite entry whose everyday form is “Nasılsın?”');
});

test('search: nothing for an empty query; a limit; a subset', () => {
  assert.deepEqual(rankEntries(languages.tr, '  '), []);
  assert.equal(scoreEntry(languages.tr, languages.tr.words[0], ''), null);
  assert.equal(rankEntries(languages.uk, 'a', { limit: 5 }).length, 5);
  const cafe = languages.tr.wordsIn('p-cafe');
  assert.ok(rankEntries(languages.tr, 'su', { among: cafe }).every((r) => cafe.includes(r.word)));
});

test('search: grammar lessons, texts and topics by title', () => {
  const tr = languages.tr;
  assert.deepEqual(searchGrammar(tr, 'question').map((l) => l.id), [tr.grammar.find((l) => /question/i.test(l.title)).id]);
  assert.ok(searchGrammar(tr, 'vowel').length >= 1);
  assert.deepEqual(searchGrammar(tr, ''), []);
  const texts = [{ id: 'a', title: 'At the Café', titleNative: 'Kafede' }, { id: 'b', title: 'My Morning', titleNative: 'Sabahım' }];
  assert.deepEqual(searchTexts(tr, texts, 'café').map((t) => t.id), ['a']);
  assert.deepEqual(searchTexts(tr, texts, 'sabah').map((t) => t.id), ['b'], 'by the title in the language');
  assert.deepEqual(searchTopics(tr, 'café').map((c) => c.id), ['p-cafe']);
  assert.ok(searchTopics(languages.uk, 'їжа').length + searchTopics(languages.uk, 'food').length >= 1);
});

test('tricky words: forgotten in review or with lowered ease, most-forgotten first', async () => {
  const { trickyWords } = await import('../js/stats.js');
  const lang = languages.tr;
  const [a, b, c, d, e] = lang.words;
  const card = (over) => ({ ease: 2.5, interval: 3, reps: 2, lapses: 0, due: 0, added: 0, last: 0, ...over });
  const cards = {
    [a.id]: card({ lapses: 1 }),
    [b.id]: card({ lapses: 3 }),
    [c.id]: card({}), // doing fine
    [d.id]: card({ ease: 2.05 }), // rated hard several times
    [e.id]: card({ lapses: 2, known: true }), // ticked as already learned
  };
  const ctx = { lang, store: { getCards: () => cards } };
  assert.deepEqual(trickyWords(ctx).map((w) => w.id), [b.id, a.id, d.id]);
});

test('Learn: topics are grouped by stage, in order, and every language has more than one stage of words', () => {
  const g = stagesOf([{ id: 'a' }, { id: 'b', stage: 2 }, { id: 'c' }, { id: 'd', stage: 9 }, { id: 'e', stage: 2 }]);
  assert.deepEqual(g.map((x) => [x.stage, x.title, x.cats.map((c) => c.id).join('')]), [[1, 'Start here', 'ac'], [2, 'Everyday life', 'be'], [4, 'Wider world', 'd']]);
  for (const lang of Object.values(languages)) {
    for (const group of ['words', 'phrases']) {
      const stages = stagesOf(lang.categories.filter((c) => (c.group || 'words') === group));
      assert.ok(stages.length >= 2, `${lang.code} ${group}`);
      assert.ok(stages.every((s) => s.cats.length >= 4 && s.cats.length <= 20), `${lang.code} ${group}: no stage is tiny or endless`);
    }
  }
});

test('Phrasebook: every language has a trip-essentials kit, each entry once, strangers-first forms', () => {
  for (const lang of Object.values(languages)) {
    const kit = tripKit(lang);
    assert.ok(kit.length >= 34, `${lang.code}: ${kit.length} essentials`);
    assert.equal(new Set(kit.map((w) => w.id)).size, kit.length, `${lang.code}: no entry twice`);
    assert.equal(tripKit(lang), kit, 'computed once');
    const en = kit.map((w) => w.en).join(' | ');
    for (const must of [/hello/i, /thank/i, /please/i, /don.?t understand/i, /where is the toilet/i, /how much/i, /help/i]) assert.match(en, must, `${lang.code}: ${must}`);
    assert.ok(kit.every((w) => [...w.tr].length <= 45), `${lang.code}: short enough to say`);
    assert.ok(kit.filter((w) => ['casual', 'slang'].includes(w.reg)).length <= 4, `${lang.code}: not the casual forms`);
  }
});

test('What’s new: shown once to a learner with progress, never to a new one', () => {
  store._resetAll();
  assert.equal(newsToShow(store), null, 'a new learner is not told what is new');
  assert.equal(store.getSettings().newsSeen, NEWS.id);

  store._resetAll();
  store.setCard('tr', 'merhaba', { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: Date.now(), added: Date.now() });
  assert.equal(newsToShow(store), NEWS, 'someone already learning sees it');
  assert.equal(newsToShow(store), NEWS, 'until they dismiss it');
  store.updateSettings({ newsSeen: NEWS.id });
  assert.equal(newsToShow(store), null);

  assert.ok(NEWS.items.length >= 4 && NEWS.items.every((n) => n.text && n.where && /^#\//.test(n.href)));
  store._resetAll();
});

test('search: sentences inside the Read & Listen texts', async () => {
  const { loadTexts } = await import('../js/reader.js');
  const tr = languages.tr;
  const texts = await loadTexts('tr');
  const hits = searchLines(tr, texts, 'damlaya');
  assert.equal(hits[0].text.id, 'tr-proverbs');
  assert.match(hits[0].line.tr, /Damlaya damlaya göl olur/);
  assert.ok(searchLines(tr, texts, 'DAMLAYA DAMLAYA').length >= 1, 'case and spacing do not matter');
  assert.ok(searchLines(tr, texts, 'water bottle').some((h) => h.text.id === 'tr-tongue-twisters'), 'by the translation');
  assert.deepEqual(searchLines(tr, texts, 'bi'), [], 'too short to be useful');
  assert.deepEqual(searchLines(tr, texts, ''), []);
  // Never more than the limit, and at most two lines of one text.
  const many = searchLines(tr, texts, 'bir', 6);
  assert.equal(many.length, 6);
  const per = new Map();
  for (const h of many) per.set(h.text.id, (per.get(h.text.id) || 0) + 1);
  assert.ok([...per.values()].every((n) => n <= 2));
  // Scripts without spaces: two characters are enough; Arabic is found without its vowel marks.
  assert.ok(searchLines(languages.ja, await loadTexts('ja'), '団子').some((h) => h.text.id === 'ja-proverbs'));
  assert.ok(searchLines(languages.ar, await loadTexts('ar'), 'الصبر مفتاح').some((h) => h.text.id === 'ar-proverbs'));
  assert.ok(searchLines(languages.uk, await loadTexts('uk'), 'далі будеш').some((h) => h.text.id === 'uk-proverbs'));
});

test('the reminder to back up: only with something to lose, and only after a month without a copy', async () => {
  const { backupNudge, agoText, BACKUP_AFTER_DAYS, BACKUP_MIN_WORDS } = await import('../js/views/me.js');
  const DAY = 86400000;
  const now = Date.UTC(2026, 10, 23, 12);
  assert.equal(backupNudge(null, BACKUP_MIN_WORDS - 1, now), null, 'nothing much to lose yet');
  assert.deepEqual(backupNudge(null, BACKUP_MIN_WORDS, now), { never: true, days: null });
  assert.equal(backupNudge(now - (BACKUP_AFTER_DAYS - 1) * DAY, 500, now), null, 'backed up recently');
  assert.deepEqual(backupNudge(now - 45 * DAY, 500, now), { never: false, days: 45 });
  // “Not now” puts it off for a month, then it comes back.
  assert.equal(backupNudge(null, 500, now, now - 3 * DAY), null);
  assert.deepEqual(backupNudge(null, 500, now, now - (BACKUP_AFTER_DAYS + 1) * DAY), { never: true, days: null });
  assert.equal(agoText(null, now), 'never');
  assert.equal(agoText(now - 1000, now), 'today');
  assert.equal(agoText(now - DAY - 1000, now), 'yesterday');
  assert.equal(agoText(now - 12 * DAY, now), '12 days ago');
  assert.equal(agoText(now - 100 * DAY, now), '3 months ago');
  assert.equal(agoText(now + DAY, now), 'today', 'a clock that went backwards');
});

test('my notes on entries: kept per language, trimmed, synced like saved entries, and they survive a reset', async () => {
  const store = await import('../js/store.js');
  store._resetAll();
  assert.equal(store.getNote('tr', 'merhaba'), '');
  assert.equal(store.setNote('tr', 'merhaba', '  sounds like\n “mare-haba”  '), 'sounds like “mare-haba”');
  assert.equal(store.getNote('tr', 'merhaba'), 'sounds like “mare-haba”');
  assert.equal(store.getNote('uk', 'merhaba'), '', 'another language has its own notes');
  assert.equal(store.setNote('tr', 'evet', 'x'.repeat(store.NOTE_MAX + 50)).length, store.NOTE_MAX);
  for (const id of ['constructor', '__proto__', 'toString']) assert.equal(store.getNote('tr', id), '');
  // They travel in sync data and in backups.
  const data = store.syncData();
  assert.equal(data.progress.tr.notes.merhaba.text, 'sounds like “mare-haba”');
  const theirs = { device: 'other', at: 1, game: {}, progress: { tr: { cards: {}, days: {}, notes: {
    merhaba: { text: 'older note', last: 5 },
    selam: { text: '  from the other phone ', last: 7 },
    bad: { text: '', last: 9 }, worse: 'text', gone: { deleted: true, last: 3 },
  } } } };
  const m = mergeAll(data, theirs, { device: 'this' });
  assert.equal(m.progress.tr.notes.merhaba.text, 'sounds like “mare-haba”', 'the newer note wins');
  assert.equal(m.progress.tr.notes.selam.text, 'from the other phone');
  assert.equal('bad' in m.progress.tr.notes || 'worse' in m.progress.tr.notes, false);
  assert.equal(m.summary.langs.find((l) => l.code === 'tr').notesChanged, 1);
  assert.equal(m.summary.changed, true);
  store.applySync(m);
  assert.equal(store.getNote('tr', 'selam'), 'from the other phone');
  assert.equal(mergeAll(store.syncData(), theirs, { device: 'this' }).summary.changed, false, 'the same code again changes nothing');
  // Emptying a note removes it, and the removal wins over an older copy elsewhere.
  assert.equal(store.setNote('tr', 'selam', '   '), '');
  assert.equal(store.getNote('tr', 'selam'), '');
  const again = mergeAll(store.syncData(), theirs, { device: 'this' });
  assert.equal(again.progress.tr.notes.selam.deleted, true);
  // A reset clears progress, not notes.
  store.resetProgress('tr');
  assert.equal(store.getNote('tr', 'merhaba'), 'sounds like “mare-haba”');
  // A backup keeps them.
  const backup = store.exportData();
  store._resetAll();
  store.importData(backup);
  assert.equal(store.getNote('tr', 'merhaba'), 'sounds like “mare-haba”');
  store._resetAll();
});

test('search finds words by the learner’s notes on them', async () => {
  const { searchNotes } = await import('../js/views/search.js');
  const tr = languages.tr;
  const [a, b, c] = tr.words;
  const notes = { [a.id]: 'Heard it in the Bazaar', [b.id]: 'bazaar again', [c.id]: 'something else', nothere: 'bazaar' };
  assert.deepEqual(searchNotes(tr, notes, 'BAZAAR').map((r) => r.word.id), [a.id, b.id], 'any case, course order, only real entries');
  assert.deepEqual(searchNotes(tr, notes, 'bazaar', new Set([a.id])).map((r) => r.word.id), [b.id], 'entries already found are left out');
  assert.equal(searchNotes(tr, notes, 'bazaar')[0].note, 'Heard it in the Bazaar');
  assert.deepEqual(searchNotes(tr, notes, 'b'), [], 'one letter is not a search');
  assert.deepEqual(searchNotes(tr, notes, 'bazaar', new Set(), 1).length, 1);
  assert.deepEqual(searchNotes(tr, {}, 'bazaar'), []);
});

test('reviews coming up: due words per calendar day, overdue ones counted today', async () => {
  const { reviewForecast } = await import('../js/stats.js');
  const { startOfDay } = await import('../js/srs.js');
  const tr = languages.tr;
  const now = new Date(2026, 10, 23, 15, 30).getTime();
  const at = (days, hours = 12) => startOfDay(now, days) + hours * 3600000;
  const [a, b, c, d, e, f] = tr.words;
  const cards = {
    [a.id]: { due: at(-3) }, // overdue
    [b.id]: { due: at(0, 23) }, // later today
    [c.id]: { due: at(1, 0) }, // midnight: tomorrow
    [d.id]: { due: at(6, 23) }, // the last day shown
    [e.id]: { due: at(7, 1) }, // beyond the week
    [f.id]: { due: 'soon' }, // not a time
    'not-a-word': { due: at(0) },
  };
  const week = reviewForecast(tr, cards, { now });
  assert.deepEqual(week.map((x) => x.n), [2, 1, 0, 0, 0, 0, 1]);
  assert.equal(week.length, 7);
  assert.equal(week[0].d.getDate(), 23);
  assert.equal(week[6].d.getDate(), 29);
  assert.deepEqual(reviewForecast(tr, {}, { now }).map((x) => x.n), [0, 0, 0, 0, 0, 0, 0]);
  assert.equal(reviewForecast(tr, cards, { now, days: 3 }).length, 3);
});

test('easy to mix up: entries that are the same or one letter apart in the form they are read in', async () => {
  const { lookalikes, oneApart } = await import('../js/stats.js');
  for (const [a, b, yes] of [['kuş', 'kış', true], ['kuş', 'kuşu', true], ['kuş', 'uş', true], ['kuş', 'kuş', true], ['kuş', 'kaşı', false], ['kedi', 'kadi', true], ['kedi', 'kadı', false],
    ['kedi', 'dedik', false], ['', 'a', true], ['abc', 'cba', false], ['おばさん', 'おばあさん', true]]) {
    assert.equal(oneApart(a, b), yes, `${a} / ${b}`);
    assert.equal(oneApart(b, a), yes, `${b} / ${a}`);
  }
  for (const L of Object.values(languages)) {
    let withSome = 0;
    for (const w of L.words) {
      const near = lookalikes(L, w);
      if (!near.length) continue;
      withSome++;
      assert.ok(near.length <= 4 && !near.includes(w), w.tr);
      assert.ok(near.every((x) => !/\s/.test(x.tr.trim())), `${w.tr}: only single words are listed`);
      // It goes both ways: each of them lists this word too (unless it is past the limit there).
      assert.ok(near.every((x) => lookalikes(L, x, 999).includes(w)), w.tr);
    }
    assert.ok(withSome >= 10, `${L.code}: ${withSome} words with a look-alike`);
    assert.deepEqual(lookalikes(L, { id: 'a-phrase', tr: `${L.words[0].tr} ${L.words[1].tr}` }), [], 'phrases have none');
  }
  const tr = languages.tr;
  const kis = tr.words.find((w) => w.tr === 'kış');
  assert.ok(lookalikes(tr, kis).some((w) => w.tr === 'kuş'), 'kış (winter) / kuş (bird)');
});

test('ear training pairs from the course: one sound apart, the learner’s words first', async () => {
  const { coursePairs } = await import('../js/stats.js');
  const tr = languages.tr;
  const all = coursePairs(tr, {}, 999);
  assert.ok(all.length >= 40);
  for (const { a, b, contrast } of all) {
    assert.notEqual(a.id, b.id);
    assert.equal([...tr.normalize(a.tr)].length, [...tr.normalize(b.tr)].length, `${a.tr} / ${b.tr}: the same length`);
    assert.notEqual(tr.normalize(a.tr), tr.normalize(b.tr), 'words read the same are not a pair to hear');
    assert.match(contrast, /^\S+ \/ \S+$/u, `${a.tr} / ${b.tr}: ${contrast}`);
  }
  assert.ok(all.some(({ a, b, contrast }) => [a.tr, b.tr].sort().join() === ['kış', 'kuş'].sort().join() && /^[ıu] \/ [ıu]$/.test(contrast)));
  assert.equal(new Set(all.map(({ a, b }) => [a.id, b.id].sort().join('|'))).size, all.length, 'each pair once');
  const uses = new Map();
  for (const { a, b } of all) for (const w of [a, b]) uses.set(w.id, (uses.get(w.id) || 0) + 1);
  assert.ok(Math.max(...uses.values()) <= 2, 'no word in more than two pairs');
  assert.equal(coursePairs(tr, {}).length, 12);
  // Pairs whose words the learner knows come first.
  const last = all[all.length - 1];
  const first = coursePairs(tr, { [last.a.id]: {}, [last.b.id]: {} })[0];
  assert.deepEqual([first.a.id, first.b.id], [last.a.id, last.b.id]);
  for (const L of Object.values(languages)) assert.ok(coursePairs(L, {}).length >= 10, L.code);
  // Japanese: voiced / unvoiced pairs and words one beat longer come first, and only there may the lengths differ.
  const ja = languages.ja;
  const jp = coursePairs(ja, {}, 999);
  const kana = (w) => (w.kana || w.tr).replace(/\s+/g, '');
  assert.ok(jp.some(({ a, b }) => [kana(a), kana(b)].sort().join() === ['あける', 'あげる'].sort().join()), 'あける / あげる');
  assert.equal(jp[0].contrast, 'け / げ');
  for (const { a, b, contrast } of jp) {
    const d = [...ja.normalize(kana(a))].length - [...ja.normalize(kana(b))].length;
    assert.ok(d === 0 || (d === -1 && /^– \/ [っんーあいうえお]$/.test(contrast)), `${kana(a)} / ${kana(b)} ${contrast}`);
  }
});

test('when nothing is due: how many words come back, and when', async () => {
  const { nextReviews } = await import('../js/stats.js');
  const { startOfDay } = await import('../js/srs.js');
  const tr = languages.tr;
  const now = new Date(2026, 10, 23, 15, 30).getTime(); // a Monday afternoon
  const at = (days, hours = 12) => startOfDay(now, days) + hours * 3600000;
  const [a, b, c, d] = tr.words;
  assert.equal(nextReviews(tr, {}, now), null);
  assert.equal(nextReviews(tr, { [a.id]: { due: now - 1000 } }, now), null, 'a word that is due now is not “next”');
  assert.deepEqual(nextReviews(tr, { [a.id]: { due: at(0, 20) }, [b.id]: { due: at(1) } }, now), { n: 1, days: 0, text: '1 word later today' });
  assert.deepEqual(nextReviews(tr, { [a.id]: { due: at(1, 1) }, [b.id]: { due: at(1, 22) }, [c.id]: { due: at(2) }, 'not-a-word': { due: at(1) } }, now), { n: 2, days: 1, text: '2 words tomorrow' });
  assert.match(nextReviews(tr, { [d.id]: { due: at(3) } }, now).text, /^1 word on Thursday$/);
  const far = nextReviews(tr, { [d.id]: { due: at(30) } }, now);
  assert.equal(far.days, 30);
  assert.match(far.text, /^1 word on \w+, \w+ \d+$/);
});
