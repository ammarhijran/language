// My words: the learner's own words and phrases — how they are stored, how
// they join a language pack as one more topic, and what the form accepts.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from './all-languages.js';
import * as store from '../js/store.js';
import { OWN_CATEGORY } from '../js/languages/common.js';
import { ownWordProblem, readingField, parseWordList, LIST_LINES_MAX } from '../js/views/mywords.js';
import { newCard } from '../js/srs.js';

const { tr, uk, ja, ar } = languages;

test('own words: saved per language in the order added, trimmed, kept in backups, never in sync data', () => {
  store._resetAll();
  assert.deepEqual(store.getOwnWords('tr'), []);
  assert.equal(store.saveOwnWord('tr', { tr: 'kelebek', en: '  ' }), null, 'a meaning is needed');
  assert.equal(store.saveOwnWord('tr', { tr: '', en: 'butterfly' }), null, 'a word is needed');
  assert.deepEqual(store.getOwnWords('tr'), [], 'nothing is left behind by a refused entry');
  const id = store.saveOwnWord('tr', { tr: '  uğur   böceği ', en: ' ladybird\n', note: ' from a song ', junk: 'x' });
  assert.match(id, /^mw-[a-z0-9]{1,12}$/);
  const id2 = store.saveOwnWord('tr', { tr: 'yağmurluk', en: 'raincoat' });
  assert.notEqual(id2, id);
  const [a, b] = store.getOwnWords('tr');
  assert.deepEqual([a.id, a.tr, a.en, a.read, a.note], [id, 'uğur böceği', 'ladybird', '', 'from a song']);
  assert.equal('junk' in a, false);
  assert.equal(b.id, id2);
  assert.deepEqual(store.getOwnWords('uk'), []);
  // What is handed out is a copy.
  a.tr = 'changed';
  assert.equal(store.getOwnWords('tr')[0].tr, 'uğur böceği');
  // Editing keeps the id and the place in the list.
  assert.equal(store.saveOwnWord('tr', { id, tr: 'uğur böceği', en: 'ladybug' }), id);
  assert.deepEqual(store.getOwnWords('tr').map((w) => [w.id, w.en, w.note]), [[id, 'ladybug', ''], [id2, 'raincoat', '']]);
  // Fields are cut to their limits.
  const long = store.saveOwnWord('ja', { tr: 'あ'.repeat(200), en: 'e'.repeat(500), read: 'か'.repeat(500), note: 'n'.repeat(900) });
  const rec = store.getOwnWords('ja')[0];
  for (const [k, max] of Object.entries(store.OWN_WORD_LIMITS)) assert.equal(rec[k].length, max, k);
  store.deleteOwnWord('ja', long);
  assert.deepEqual(store.getOwnWords('ja'), []);

  assert.equal('words' in store.syncData(), false, 'not synced');
  const backup = JSON.parse(store.exportData());
  assert.deepEqual(backup.words.tr.map((w) => w.tr), ['uğur böceği', 'yağmurluk']);
  store._resetAll();
  store.importData(JSON.stringify(backup));
  assert.deepEqual(store.getOwnWords('tr').map((w) => [w.id, w.tr]), [[id, 'uğur böceği'], [id2, 'yağmurluk']]);
});

test('own words: at most OWN_WORDS_MAX per language', () => {
  store._resetAll();
  for (let i = 0; i < store.OWN_WORDS_MAX; i++) assert.ok(store.saveOwnWord('uk', { tr: `слово${i}`, en: `word ${i}` }));
  assert.equal(store.saveOwnWord('uk', { tr: 'ще', en: 'one more' }), null);
  assert.equal(store.getOwnWords('uk').length, store.OWN_WORDS_MAX);
  assert.equal(new Set(store.getOwnWords('uk').map((w) => w.id)).size, store.OWN_WORDS_MAX, 'every id is different');
  assert.ok(store.saveOwnWord('tr', { tr: 'bir', en: 'another language is not affected' }));
});

test('own words: deleting one forgets what was learned about it and unsaves it', () => {
  store._resetAll();
  const id = store.saveOwnWord('tr', { tr: 'kelebek gibi', en: 'like a butterfly' });
  store.setCard('tr', id, { ...newCard(), reps: 2 });
  store.setFav('tr', id, true);
  assert.ok(store.getCard('tr', id));
  assert.ok(store.isFav('tr', id));
  store.deleteOwnWord('tr', id);
  assert.deepEqual(store.getOwnWords('tr'), []);
  assert.equal(store.getCard('tr', id), undefined);
  assert.equal(store.isFav('tr', id), false);
  store.deleteOwnWord('tr', 'mw-nothere'); // nothing to do, nothing thrown
});

test('own words: a backup file’s list is checked like everything else in it', () => {
  store._resetAll();
  const ok = { id: 'mw-abc', tr: 'kelebek gibi', en: 'like a butterfly', at: 5 };
  store.importData(JSON.stringify({
    progress: {},
    words: {
      tr: [ok, { ...ok }, { id: 'mw-def', tr: 'x', en: '' }, { id: '../etc', tr: 'a', en: 'b' }, { id: 'essentials', tr: 'a', en: 'b' }, 'text', null,
        { id: 'mw-ghi', tr: ['a'], en: { b: 1 } }, { id: 'mw-jkl', tr: 'iki\nsatır', en: 'two lines', read: 7, note: '  n  ', at: 'soon', evil: '<script>' }],
      __proto__: [ok], constructor: [ok], 'not a language': [ok], uk: 'nope', ja: [],
    },
  }));
  assert.deepEqual(store.getOwnWords('tr'), [
    { id: 'mw-abc', tr: 'kelebek gibi', en: 'like a butterfly', read: '', note: '', at: 5 },
    { id: 'mw-jkl', tr: 'iki satır', en: 'two lines', read: '', note: 'n', at: 0 },
  ]);
  for (const code of ['uk', 'ja', 'constructor', '__proto__']) assert.deepEqual(store.getOwnWords(code), []);
  // A file without the list (an older backup) has none.
  store.importData(JSON.stringify({ progress: {} }));
  assert.deepEqual(store.getOwnWords('tr'), []);
});

test('the pack takes the learner’s words in as one more topic, and gives them back', () => {
  // Made-up words in each script: [a word, a phrase, what both start with].
  const MADE_UP = { tr: ['zzqx', 'zzqy zzqz', 'zzq'], uk: ['ззюх', 'ззюй ззюц', 'ззю'], ja: ['ずずけ', 'ずずこ ずずさ', 'ずず'], ar: ['ززقخ', 'ززقح ززقج', 'ززق'] };
  for (const L of [tr, uk, ja, ar]) {
    const before = { words: L.words.length, cats: L.categories.length, last: L.words[L.words.length - 1] };
    const [one, two, start] = MADE_UP[L.code];
    try {
      assert.equal(L.setOwnWords([
        { id: 'mw-1', tr: one, en: 'made-up word', note: 'a note' },
        { id: 'mw-2', tr: two, en: 'made-up phrase' },
        { id: 'mw-1', tr: 'again', en: 'the same id twice' },
        { id: L.words[0].id, tr: 'clash', en: 'the id of a course word' },
        { id: 'mw-3', tr: '', en: 'no word' }, null,
      ]), L);
      const own = L.wordsIn(OWN_CATEGORY.id);
      assert.deepEqual(own.map((w) => w.id), ['mw-1', 'mw-2'], L.code);
      assert.equal(L.words.length, before.words + 2);
      assert.equal(L.byId('mw-1'), own[0]);
      assert.equal(L.byId(L.words[0].id), L.words[0], 'a course word is never replaced');
      assert.ok(own.every((w) => w.own && w.cat === OWN_CATEGORY.id));
      assert.equal(own[0].note, 'a note');
      assert.deepEqual(own.map((w) => w.index), [before.words, before.words + 1]);
      const cat = L.categories[L.categories.length - 1];
      assert.deepEqual([cat.id, cat.own, cat.group, L.categories.length], [OWN_CATEGORY.id, true, 'words', before.cats + 1]);
      // They work like any entry: analysis, what the voice says, accepted answers, search, the lexicon.
      for (const w of own) {
        const a = L.analyze(w);
        assert.ok(a.words.length >= 1 && a.words.every((x) => x.syllables.length >= 1), `${L.code} ${w.tr}`);
        assert.equal(L.speech(w).text, w.tr);
        assert.ok(L.acceptedAnswers(w).includes(w.tr));
        assert.ok(L.matches(w, start) && L.matches(w, 'made-up'), `${L.code} ${w.tr}: found by search`);
        assert.ok(L.entriesWritten(w.tr).some((e) => (e.word || e).id === w.id), `${L.code}: found by its written form`);
      }
      assert.equal(L.matches(L.words[0], start), false);
      // Changing the list replaces it (an edit, a deletion).
      L.setOwnWords([{ id: 'mw-2', tr: one, en: 'shorter now' }]);
      assert.deepEqual(L.wordsIn(OWN_CATEGORY.id).map((w) => [w.id, w.tr]), [['mw-2', one]]);
      assert.equal(L.byId('mw-1'), undefined);
      assert.equal(L.matches(L.byId('mw-2'), 'shorter'), true);
      // A word in another script (a brand name) is kept in one piece instead of losing its syllables.
      L.setOwnWords([{ id: 'mw-9', tr: L.code === 'tr' ? 'ззюх' : 'Zzqx', en: 'another script' }]);
      assert.ok(L.analyze(L.byId('mw-9')).words.every((x) => x.syllables.length >= 1));
      L.setOwnWords([{ id: 'mw-2', tr: one, en: 'shorter now' }]);
      assert.equal(L.categories.filter((c) => c.own).length, 1);
    } finally {
      L.setOwnWords([]);
    }
    assert.equal(L.words.length, before.words);
    assert.equal(L.categories.length, before.cats);
    assert.equal(L.words[L.words.length - 1], before.last);
    assert.equal(L.categories.some((c) => c.own), false, 'no empty topic is left');
    assert.equal(L.byId('mw-2'), undefined);
  }
});

test('readings of own words: kana for Japanese, a transliteration for Arabic — or the word in one piece', () => {
  try {
    ja.setOwnWords([
      { id: 'mw-1', tr: '蝶', en: 'butterfly', read: 'ちょう' },
      { id: 'mw-2', tr: 'ちょうちょ', en: 'butterfly (said to children)' },
      { id: 'mw-3', tr: '住所', en: 'address' },
      { id: 'mw-4', tr: '住所', en: 'address', read: 'jūsho' },
      { id: 'mw-5', tr: 'どこに住んでいますか。', en: 'Where do you live?', read: 'どこ に すんで います か' },
    ]);
    const [kanji, kana, bare, latin, phrase] = ja.wordsIn(OWN_CATEGORY.id);
    assert.equal(ja.fullReading(kanji), 'ちょう · chō');
    assert.ok(ja.acceptedAnswers(kanji).includes('ちょう') && ja.acceptedAnswers(kanji).includes('chō'));
    assert.equal(ja.fullReading(kana), 'chōcho', 'a word in kana is its own reading');
    assert.equal(ja.fullReading(bare), null);
    assert.equal('kana' in latin, false, 'a reading that is not kana is not used');
    for (const w of [bare, latin]) {
      const a = ja.analyze(w);
      assert.deepEqual(a.words.map((x) => x.syllables.map((y) => y.text)), [['住所']], 'kanji without a reading stay in one piece');
      assert.equal(a.respell, '');
      assert.equal(a.stressMarked, false);
    }
    assert.equal(ja.fullReading(phrase), 'どこにすんでいますか · doko ni sunde imasu ka');
    assert.equal(ja.analyze(phrase).words.length, 5);

    ar.setOwnWords([
      { id: 'mw-1', tr: 'فراشة', en: 'butterfly', read: 'farāsha' },
      { id: 'mw-2', tr: 'فراشة', en: 'butterfly' },
      { id: 'mw-3', tr: 'فراشة', en: 'butterfly', read: 'فراشة' },
    ]);
    const [withTl, without, wrong] = ar.wordsIn(OWN_CATEGORY.id);
    assert.equal(ar.fullReading(withTl), 'farāsha');
    assert.equal(ar.analyze(withTl).words[0].syllables.length, 3);
    assert.ok(ar.acceptedAnswers(withTl).includes('farasha'));
    for (const w of [without, wrong]) {
      assert.equal('tl' in w, false);
      assert.equal(ar.analyze(w).words[0].syllables.length, 1);
      assert.ok(!ar.fullReading(w));
    }
    // A course entry that cannot be analysed is still an error: only own words fall back.
    assert.throws(() => ar.analyze({ tr: 'فراشة', en: 'x' }));
  } finally {
    ja.setOwnWords([]);
    ar.setOwnWords([]);
  }
});

test('the form: both fields, the right script for the reading, and no word twice', () => {
  assert.equal(readingField(tr), null);
  assert.equal(readingField(uk), null);
  assert.match(readingField(ja).label, /kana/i);
  assert.match(readingField(ar).label, /transliteration/i);
  try {
    tr.setOwnWords([{ id: 'mw-1', tr: 'Uğur böceği', en: 'ladybird' }]);
    assert.equal(ownWordProblem(tr, { tr: 'zzqx', en: 'made up' }), null);
    assert.equal(ownWordProblem(tr, { tr: '  ', en: 'x' }).field, 'tr');
    assert.equal(ownWordProblem(tr, { tr: 'zzqx', en: ' ' }).field, 'en');
    // Already among the learner's words (however it is capitalised or spaced) — unless it is the entry being changed.
    assert.match(ownWordProblem(tr, { tr: 'uğur  böceği', en: 'x' }).message, /already in your words/);
    assert.equal(ownWordProblem(tr, { id: 'mw-1', tr: 'uğur böceği', en: 'ladybug' }), null);
    // Already in the course: says so and names the entry.
    const course = tr.words.find((w) => !w.own && !/\s/.test(w.tr));
    const p = ownWordProblem(tr, { tr: course.tr.toUpperCase(), en: 'x' });
    assert.match(p.message, /already in the course/);
    assert.equal(lang(p.word), course.id);
    // The reading's script.
    assert.equal(ownWordProblem(ja, { tr: '蝶々夫人', en: 'Madame Butterfly', read: 'chōchō fujin' }).field, 'read');
    assert.equal(ownWordProblem(ja, { tr: '蝶々夫人', en: 'Madame Butterfly', read: 'ちょうちょう ふじん' }), null);
    assert.equal(ownWordProblem(ja, { tr: '蝶々夫人', en: 'Madame Butterfly' }), null, 'the reading is optional');
    assert.equal(ownWordProblem(ar, { tr: 'زقزقة', en: 'chirping', read: 'زقزقة' }).field, 'read');
    assert.equal(ownWordProblem(ar, { tr: 'زقزقة', en: 'chirping', read: 'zaqzaqa' }), null);
    assert.equal(ownWordProblem(tr, { tr: 'zzqx', en: 'made up', read: 'anything' }), null, 'no reading field, nothing to check');
  } finally {
    tr.setOwnWords([]);
  }
  function lang(w) { return w.id; }
});

test('own words are not part of the course: finishing every course topic still completes the language', async () => {
  const game = await import('../js/game.js');
  const { meta } = await import('../js/languages/index.js');
  const allTopics = Math.max(...Object.values(meta).map((m) => m.topics));
  store._resetAll();
  game.forgetSummaries();
  try {
    tr.setOwnWords([{ id: 'mw-1', tr: 'zzqx', en: 'made up' }]);
    assert.equal(tr.categories.filter((c) => !c.own).length, tr.categories.length - 1);
    for (const w of tr.words) if (!w.own) store.setCard('tr', w.id, { ...newCard(), reps: 3, interval: 5 });
    assert.equal(game.metrics().topicsInLang, allTopics, 'an unlearned word of the learner’s own does not hold the language back');
    // Learning it too does not count as one more course topic.
    store.setCard('tr', 'mw-1', { ...newCard(), reps: 3, interval: 5 });
    game.forgetSummaries();
    assert.equal(game.metrics().topicsInLang, allTopics);
    assert.equal(game.metrics().topics, tr.categories.length - 1);
  } finally {
    tr.setOwnWords([]);
    store._resetAll();
    game.forgetSummaries();
  }
});

test('a pasted list: one entry per line, with the usual separators', () => {
  const { entries, unread } = parseWordList([
    'kelebek - butterfly',
    '',
    '  uğur böceği – ladybird, ladybug  ',
    'Nerede oturuyorsun? = Where do you live?',
    'yağmurluk; raincoat',
    'şemsiye: umbrella',
    'saat 3:00 — three o’clock',
    'tek-başına - on one’s own',
    'justaword',
    '= no word',
    'no meaning -   ',
    'çekiç\thammer\ta tool\tfrom the shop',
  ].join('\r\n'), tr);
  assert.deepEqual(entries.map((e) => [e.line, e.tr, e.en]), [
    [1, 'kelebek', 'butterfly'],
    [3, 'uğur böceği', 'ladybird, ladybug'],
    [4, 'Nerede oturuyorsun?', 'Where do you live?'],
    [5, 'yağmurluk', 'raincoat'],
    [6, 'şemsiye', 'umbrella'],
    [7, 'saat 3:00', 'three o’clock'],
    [8, 'tek-başına', 'on one’s own'],
    [12, 'çekiç', 'hammer'],
  ]);
  assert.deepEqual(unread.map((u) => u.line), [9, 10, 11]);
  // Without a reading field, a third column is a note (a fourth wins).
  assert.equal(entries.at(-1).note, 'from the shop');
  assert.equal(parseWordList('çekiç\thammer\ta tool', tr).entries[0].note, 'a tool');
  assert.ok(entries.every((e) => e.read === ''));
  assert.deepEqual(parseWordList('', tr), { entries: [], unread: [] });
  assert.deepEqual(parseWordList(' \n\n', tr), { entries: [], unread: [] });
});

test('a pasted list: readings in brackets or in a third column, in the right script only', () => {
  const j = parseWordList(['蝶 (ちょう) = butterfly', '住所（じゅうしょ） - address', '傘 [kasa] = umbrella', '金槌\thammer\tかなづち\tfrom the shop', '図書館\tlibrary\ttoshokan', 'ちょうちょ = butterfly'].join('\n'), ja).entries;
  assert.deepEqual(j.map((e) => [e.tr, e.read, e.en]), [
    ['蝶', 'ちょう', 'butterfly'],
    ['住所', 'じゅうしょ', 'address'],
    ['傘 [kasa]', '', 'umbrella'], // not kana: the brackets stay part of what was typed
    ['金槌', 'かなづち', 'hammer'],
    ['図書館', '', 'library'],
    ['ちょうちょ', '', 'butterfly'],
  ]);
  assert.equal(j[3].note, 'from the shop');
  const a = parseWordList(['كتاب (kitāb) = book', 'قلم (قلم) = pen', 'فراشة\tbutterfly\tfarāsha'].join('\n'), ar).entries;
  assert.deepEqual(a.map((e) => [e.tr, e.read]), [['كتاب', 'kitāb'], ['قلم (قلم)', ''], ['فراشة', 'farāsha']]);
  // In a language without readings, brackets are part of the word.
  assert.equal(parseWordList('gitmek (to) = to go', tr).entries[0].tr, 'gitmek (to)');
});

test('a pasted list: at most LIST_LINES_MAX lines are read at once', () => {
  const text = Array.from({ length: LIST_LINES_MAX + 20 }, (_, i) => `kelime${i} = word ${i}`).join('\n');
  const { entries, unread } = parseWordList(text, tr);
  assert.equal(entries.length, LIST_LINES_MAX);
  assert.equal(unread.length, 0);
  assert.equal(entries.at(-1).line, LIST_LINES_MAX);
});
