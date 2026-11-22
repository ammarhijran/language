// Navigation logic without a browser: the learning path and "continue where
// I left off", saved words and phrases (store, sanitize and sync merge), and
// search ranking.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from './all-languages.js';
import { learningPath, nextTopics, nextCategory, topicCounts, stagesOf } from '../js/stats.js';
import { sanitize, mergeAll } from '../js/sync.js';
import * as store from '../js/store.js';
import { rankEntries, scoreEntry, searchGrammar, searchTexts, searchTopics, glossesOf } from '../js/views/search.js';

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
  assert.deepEqual(g.map((x) => [x.stage, x.title, x.cats.map((c) => c.id).join('')]), [[1, 'Start here', 'ac'], [2, 'Everyday life', 'be'], [3, 'Going further', 'd']]);
  for (const lang of Object.values(languages)) {
    for (const group of ['words', 'phrases']) {
      const stages = stagesOf(lang.categories.filter((c) => (c.group || 'words') === group));
      assert.ok(stages.length >= 2, `${lang.code} ${group}`);
      assert.ok(stages.every((s) => s.cats.length >= 4 && s.cats.length <= 20), `${lang.code} ${group}: no stage is tiny or endless`);
    }
  }
});
