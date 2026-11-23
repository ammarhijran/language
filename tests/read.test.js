// Read & Listen: the texts of every language, the reader's pure helpers
// (glossary matching, fading, the player), text progress and XP, and how
// text progress is sanitized and merged by sync.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from './all-languages.js';
import * as store from '../js/store.js';
import * as game from '../js/game.js';
import { sanitize, mergeGame, mergeAll } from '../js/sync.js';
import {
  KINDS, LEVELS, REGISTERS, canPractise, practiceModes, gapItems, MIN_GAPS, loadTexts, cachedTexts, sortTexts, filterTexts, estimateMinutes, speakerIndex,
  canRolePlay, nextText, markGlossary, glossaryForms, glossaryFound, glossaryMissing, findWord, fadeLine,
  createPlayer, listenTimeout, scoreLine, verdict, clock, recordLimit, newWords, ownTextFor,
} from '../js/reader.js';

const ALL = {};
for (const code of Object.keys(languages)) ALL[code] = await loadTexts(code);

const nonEmpty = (s) => typeof s === 'string' && s.trim().length > 0;
const joined = (segs) => segs.map((s) => s.text).join('');
const glossed = (segs) => segs.filter((s) => s.gloss != null).map((s) => s.text);

// ---------- The texts ----------

for (const [code, texts] of Object.entries(ALL)) {
  const lang = languages[code];

  test(`${code}: texts load on demand and are cached`, async () => {
    assert.ok(Array.isArray(texts));
    assert.equal(cachedTexts(code), texts);
    assert.equal(await loadTexts(code), texts, 'the same array the second time');
  });

  if (!texts.length) {
    test(`${code}: no texts yet (the reader shows "coming soon")`, () => assert.deepEqual(texts, []));
    continue;
  }

  test(`${code}: texts are well formed`, () => {
    const ids = texts.map((t) => t.id);
    assert.equal(new Set(ids).size, ids.length, 'ids are unique');
    for (const t of texts) {
      const where = `${code}/${t.id}`;
      assert.match(t.id, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${where}: id is URL- and sync-safe`);
      assert.ok(t.id.length <= 60, `${where}: id is short`);
      assert.ok(Object.hasOwn(KINDS, t.kind), `${where}: kind ${t.kind}`);
      assert.ok(LEVELS.includes(t.level), `${where}: level ${t.level}`);
      if (t.register !== undefined) assert.ok(Object.hasOwn(REGISTERS, t.register), `${where}: register ${t.register}`);
      if (t.dialect !== undefined) assert.ok(nonEmpty(t.dialect), `${where}: dialect`);
      for (const f of ['title', 'titleNative', 'summary']) assert.ok(nonEmpty(t[f]), `${where}: ${f}`);

      assert.ok(Array.isArray(t.lines) && t.lines.length >= 4, `${where}: has lines`);
      for (const [i, l] of t.lines.entries()) {
        assert.ok(nonEmpty(l.tr) && nonEmpty(l.en), `${where} line ${i}: text and translation`);
        if (l.speaker !== undefined) assert.ok(nonEmpty(l.speaker), `${where} line ${i}: speaker`);
        if (code === 'ja') {
          assert.ok(nonEmpty(l.kana), `${where} line ${i}: kana reading`);
          assert.match(l.kana, /^[\p{Script=Hiragana}\p{Script=Katakana}ー\s]+$/u, `${where} line ${i}: kana only`);
        }
        if (code === 'ar') assert.ok(nonEmpty(l.tl), `${where} line ${i}: transliteration`);
        if (code === 'ja' || code === 'ar') assert.ok(lang.reading(l), `${where} line ${i}: the pack can show its reading`);
      }
      if (t.kind === 'dialogue') {
        assert.ok(t.lines.every((l) => l.speaker), `${where}: every dialogue line has a speaker`);
        assert.ok(canRolePlay(t), `${where}: a dialogue has two or more speakers`);
      }

      assert.ok(Array.isArray(t.glossary) && t.glossary.length, `${where}: glossary`);
      for (const g of t.glossary) {
        assert.ok(nonEmpty(g.tr) && nonEmpty(g.en), `${where}: glossary item ${g.tr}`);
        if (code === 'ja') assert.ok(nonEmpty(g.kana), `${where}: kana for ${g.tr}`);
        if (code === 'ar') assert.ok(nonEmpty(g.tl), `${where}: transliteration for ${g.tr}`);
      }

      assert.equal(t.questions?.length, 4, `${where}: 4 questions`);
      for (const q of t.questions) {
        assert.ok(nonEmpty(q.q) && nonEmpty(q.explain), `${where}: question and explanation`);
        assert.equal(q.options.length, 4, `${where}: 4 options for "${q.q}"`);
        assert.ok(q.options.every(nonEmpty), `${where}: options are text`);
        assert.equal(new Set(q.options).size, 4, `${where}: options differ for "${q.q}"`);
        assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, `${where}: answer index`);
      }
    }
  });

  test(`${code}: every glossary item occurs in its text`, () => {
    for (const t of texts) {
      assert.deepEqual(glossaryMissing(lang, t).map((g) => g.tr), [], `${code}/${t.id}`);
      assert.equal(glossaryFound(lang, t).size, t.glossary.length, `${code}/${t.id}: each item is marked in a line`);
    }
  });

  test(`${code}: glossary marking keeps every line intact`, () => {
    for (const t of texts) {
      for (const l of t.lines) assert.equal(joined(markGlossary(lang, l.tr, t.glossary)), l.tr.normalize('NFC'), `${code}/${t.id}: ${l.tr}`);
    }
  });

  test(`${code}: the list covers every level and kind`, () => {
    for (const level of LEVELS) assert.ok(texts.some((t) => t.level === level), level);
    for (const kind of Object.keys(KINDS)) assert.ok(texts.some((t) => t.kind === kind), kind);
    assert.ok(texts.every((t) => estimateMinutes(t) >= 1 && estimateMinutes(t) <= 15));
  });

  test(`${code}: longer reads exist, and a whole speech fits the recording limit`, () => {
    assert.ok(texts.filter((t) => t.lines.length >= 20).length >= 3, 'at least three long texts');
    for (const t of texts) {
      const ms = recordLimit(t);
      assert.ok(ms >= 90000 && ms <= 300000 && ms % 30000 === 0, `${code}/${t.id}: ${ms}`);
      // a native reading is about a third of estimateMinutes' "three passes"
      if (t.kind === 'speech') assert.ok(ms >= estimateMinutes(t) * 60000 * 0.4, `${code}/${t.id}: room to give the speech`);
    }
  });
}

// ---------- Glossary matching ----------

const L = languages;
const gl = (...items) => items.map((tr) => ({ tr, en: '' }));

test('glossary: case-insensitive, whole words, Turkish endings on longer items', () => {
  const segs = markGlossary(L.tr, 'Ben Selin, karşı daireye yeni taşındım.', gl('karşı daire', 'YENİ TAŞINDIM'));
  assert.deepEqual(glossed(segs), ['karşı daireye', 'yeni taşındım']);
  assert.deepEqual(segs.find((s) => s.text === 'karşı daireye').gloss, 0);
  // Short items must be whole words: "bir" isn't marked inside "birlikte".
  assert.deepEqual(glossed(markGlossary(L.tr, 'Birlikte bir kahve içtik.', gl('bir'))), ['bir']);
  // Turkish İ/i and I/ı lowercase correctly.
  assert.deepEqual(glossed(markGlossary(L.tr, "İzmir'e gittik.", gl('izmir'))), ["İzmir'e"]);
  // Not inside another word, even when long enough.
  assert.deepEqual(glossed(markGlossary(L.tr, 'Kahveci kapalı.', gl('ahve'))), []);
});

test('glossary: overlapping items — the longer one wins; every occurrence is marked', () => {
  const segs = markGlossary(L.tr, 'Ben de memnun oldum, memnun oldum!', gl('memnun', 'memnun oldum'));
  assert.deepEqual(glossed(segs), ['memnun oldum', 'memnun oldum']);
  assert.ok(segs.filter((s) => s.gloss != null).every((s) => s.gloss === 1));
});

test('glossary: Ukrainian ignores stress marks and apostrophe styles', () => {
  assert.deepEqual(glossed(markGlossary(L.uk, 'Мене́ звати Тарас.', gl('мене звати'))), ['Мене́ звати']);
  assert.deepEqual(glossed(markGlossary(L.uk, "Ось м'ясо.", gl('м’ясо'))), ["м'ясо"]);
});

test('glossary: Japanese matches inside a sentence, katakana = hiragana, patterns part by part', () => {
  assert.deepEqual(glossed(markGlossary(L.ja, 'スマホをなくしてしまった。', gl('なくしてしまった'))), ['なくしてしまった']);
  assert.deepEqual(glossed(markGlossary(L.ja, 'スマホを買った。', gl('すまほ'))), ['スマホ']);
  assert.deepEqual(glossaryForms(L.ja, { tr: '〜によると…そうだ' }), ['によると', 'そうだ']);
  const segs = markGlossary(L.ja, '店員さんによると、いすの下に落ちていたそうだ。', gl('〜によると…そうだ'));
  assert.deepEqual(glossed(segs), ['によると', 'そうだ']);
});

test('glossary: Arabic ignores vowel marks, takes the whole word, allows و/ب/ال in front', () => {
  const line = 'أَهْلًا وَسَهْلًا، أَنَا سَمِيرٌ، جَارُكِ فِي الشَّقَّةِ الْمُقَابِلَةِ.';
  assert.deepEqual(glossed(markGlossary(L.ar, line, gl('شقة'))), ['الشَّقَّةِ']);
  assert.deepEqual(glossed(markGlossary(L.ar, line, gl('سَهْلًا'))), ['وَسَهْلًا']);
  assert.deepEqual(glossed(markGlossary(L.ar, line, gl('جار'))), ['جَارُكِ'], 'endings on a longer word');
  // ...but not in the middle of an unrelated word.
  assert.deepEqual(glossed(markGlossary(L.ar, line, gl('قاب'))), []);
  assert.deepEqual(glossed(markGlossary(L.ar, line, gl('نا'))), []);
});

test('glossary: an item matches its vocabulary entry when there is one', () => {
  assert.equal(findWord(L.tr, { tr: 'buyurun' })?.id, 'buyurun');
  assert.equal(findWord(L.tr, { tr: 'Nerelisiniz?' })?.id, 'nerelisiniz');
  assert.equal(findWord(L.tr, { tr: 'karşı daire' }), null);
  const ja = findWord(L.ja, { tr: 'よろしくお願いします', kana: 'よろしく おねがい します' });
  assert.ok(ja && L.ja.byId(ja.id));
});

// ---------- Fading, lists, player ----------

test('shadowing: full text, then first letters, then nothing', () => {
  const line = { tr: 'Merhaba, iyi akşamlar!', en: '' };
  assert.equal(fadeLine(L.tr, line, 0), line.tr);
  assert.equal(fadeLine(L.tr, line, 1), 'M______, i__ a_______!');
  assert.equal(fadeLine(L.tr, line, 2), null);
  // Japanese hints come from the spaced kana reading.
  assert.equal(fadeLine(L.ja, { tr: '今日は晴れです。', kana: 'きょう は はれ です' }, 1), 'き＿＿ は は＿ で＿');
  // Arabic keeps the vowel marks on the first letter and the word's length.
  const ar = fadeLine(L.ar, { tr: 'مَرْحَبًا يَا سَمِير' }, 1);
  assert.equal(ar.split(' ').length, 3);
  assert.ok(ar.startsWith('مَ'));
  // ...and the article (also after و/ب/لِ) stays, with the stem's first letter: not just its alif.
  assert.equal(fadeLine(L.ar, { tr: 'صَبَاحُ الْخَيْرِ وَالْبَيْتُ لِلْعَائِلَةِ' }, 1), 'صَـــ الْخَــ وَالْبَــ لِلْعَــــ');
  assert.equal(fadeLine(L.ar, { tr: 'الْيَوْم' }, 1), 'الْيَــ');
});

test('lists: sorted by level, filtered by level and kind, next text', () => {
  const t = (id, level, kind) => ({ id, level, kind, lines: [{ tr: 'a b c', en: '' }] });
  const texts = [t('c', 'B1', 'story'), t('a', 'A1', 'dialogue'), t('b', 'A2', 'speech'), t('a2', 'A1', 'story')];
  assert.deepEqual(sortTexts(texts).map((x) => x.id), ['a', 'a2', 'b', 'c']);
  assert.deepEqual(filterTexts(texts, { level: 'A1' }).map((x) => x.id), ['a', 'a2']);
  assert.deepEqual(filterTexts(texts, { level: 'all', kind: 'story' }).map((x) => x.id), ['c', 'a2']);
  assert.equal(nextText(texts, 'a').id, 'a2');
  assert.equal(nextText(texts, 'a', (id) => id === 'a2').id, 'b', 'skips texts already done');
  assert.equal(nextText(texts, 'c', (id) => id !== 'b').id, 'b', 'after the last: the first one not done');
  assert.equal(nextText(texts, 'c', () => true), null);
});

test('speakers get colours in order of appearance; role-play needs a dialogue', () => {
  const d = { kind: 'dialogue', lines: [{ speaker: 'A' }, { speaker: 'B' }, { speaker: 'A' }] };
  assert.deepEqual([...speakerIndex(d)], [['A', 0], ['B', 1]]);
  assert.equal(canRolePlay(d), true);
  assert.equal(canRolePlay({ ...d, kind: 'everyday' }), false);
  assert.equal(canRolePlay({ kind: 'dialogue', lines: [{ speaker: 'A' }] }), false);
});

test('player: plays every line in order, pauses, resumes and jumps', async () => {
  const said = [];
  const events = [];
  let release = null;
  const say = (i) => { said.push(i); return new Promise((r) => { release = () => r(true); }); };
  const p = createPlayer({ count: 3, say, gap: 0, onLine: (i) => events.push(`line ${i}`), onState: (s) => events.push(s ? 'play' : 'stop'), onEnd: () => events.push('end') });
  const tick = () => new Promise((r) => setTimeout(r, 5));
  p.play();
  await tick();
  assert.equal(p.playing, true);
  release(); await tick();
  p.pause();
  assert.equal(p.playing, false);
  assert.equal(p.index, 1);
  release(); await tick(); // a cancelled line ending doesn't carry on
  assert.deepEqual(said, [0, 1]);
  p.play(); // resumes at line 1
  await tick(); release(); await tick(); release(); await tick();
  assert.deepEqual(said, [0, 1, 1, 2]);
  assert.equal(events.at(-1), 'end');
  assert.equal(p.ended, true);
  p.play(); // finished: starts over
  assert.equal(p.ended, false);
  await tick();
  assert.equal(said.at(-1), 0);
  p.pause();
  p.jump(2); // one line on its own
  await tick();
  assert.equal(said.at(-1), 2);
  assert.equal(p.playing, false);
  assert.ok(p.index === 2 && !p.ended, 'a tapped line: playing carries on from it (the reader says "Continue")');
  p.play();
  await tick();
  assert.equal(said.at(-1), 2);
  p.pause();
});

test('player: stops and reports when audio fails', async () => {
  let failed = 0;
  const p = createPlayer({ count: 3, say: async () => false, gap: 0, onFail: () => failed++ });
  p.play();
  await new Promise((r) => setTimeout(r, 5));
  assert.equal(failed, 1);
  assert.equal(p.playing, false);
  assert.equal(p.index, 0);
});

test('speaking a line: longer lines get longer to listen; scores and verdicts', () => {
  assert.ok(listenTimeout('Merhaba') < listenTimeout('Merhaba, iyi akşamlar, nasılsınız bugün?'));
  assert.equal(listenTimeout('x'.repeat(1000)), 20000);
  const line = { tr: 'Merhaba, iyi akşamlar.' };
  assert.equal(scoreLine(L.tr, line, [{ transcript: 'merhaba iyi akşamlar' }]).score, 1);
  assert.ok(scoreLine(L.tr, line, [{ transcript: 'bir şey' }]).score < 0.5);
  // Japanese also counts the kana reading as the target.
  const ja = { tr: '今日は晴れです。', kana: 'きょう は はれ です' };
  assert.equal(scoreLine(L.ja, ja, [{ transcript: 'きょうははれです' }]).score, 1);
  // Nothing in common: the score is 0, but what was heard is still shown.
  assert.deepEqual(['score', 'raw'].map((k) => scoreLine(L.tr, line, [{ transcript: ' zzz ' }])[k]), [0, 'zzz']);
  assert.deepEqual([verdict(0.95), verdict(0.7), verdict(0.2)], ['good', 'warn', 'bad']);
  assert.deepEqual([clock(0), clock(9400), clock(90000)], ['0:00', '0:09', '1:30']);
});

// ---------- Progress, XP and achievements ----------

let rewards = [];
game.onReward((r) => rewards.push(r));
beforeEach(() => { store._resetAll(); rewards = []; });
const unlocked = () => rewards.filter((r) => r.kind === 'achievement').map((r) => r.achievement.id);
const nextDay = () => { game.state().spoken.day = '2000-01-01'; };

test('texts: first completion bonus, then XP per right answer once per text per day', () => {
  const id = ALL.tr[0].id;
  assert.equal(game.textBest('tr', id), null);
  assert.equal(game.textDone({ lang: 'tr', id, correct: 3, total: 4 }), game.XP.textFirst + 3 * game.XP.textCorrect);
  assert.equal(game.textBest('tr', id), 0.75);
  assert.equal(game.textDone({ lang: 'tr', id, correct: 4, total: 4 }), 0, 'no more XP today');
  assert.equal(game.textBest('tr', id), 1, 'the best score is kept');
  assert.equal(game.textDone({ lang: 'tr', id, correct: 1, total: 4 }), 0);
  assert.equal(game.textBest('tr', id), 1, 'a worse score never lowers it');
  nextDay();
  assert.equal(game.textDone({ lang: 'tr', id, correct: 2, total: 4 }), 2 * game.XP.textCorrect, 'the next day: per answer, no first bonus');
  // Another text the same day earns its own XP.
  assert.equal(game.textDone({ lang: 'tr', id: ALL.tr[1].id, correct: 0, total: 4 }), game.XP.textFirst);
  assert.equal(game.xpByLang().tr, game.totalXp());
  // Out-of-range answers can't inflate anything.
  assert.equal(game.textDone({ lang: 'uk', id: ALL.uk[0].id, correct: 9, total: 4 }), game.XP.textFirst + 4 * game.XP.textCorrect);
  assert.equal(game.textBest('uk', ALL.uk[0].id), 1);
});

test('texts: achievements for the first text, five texts and every text in a language', () => {
  game.registerTexts('tr', ALL.tr.map((t) => t.id));
  game.textDone({ lang: 'tr', id: ALL.tr[0].id, correct: 4, total: 4 });
  assert.deepEqual(unlocked(), ['text-1']);
  for (const t of ALL.tr.slice(1, 5)) game.textDone({ lang: 'tr', id: t.id, correct: 2, total: 4 });
  assert.ok(unlocked().includes('texts-5'));
  assert.ok(!unlocked().includes('texts-all'));
  for (const t of ALL.tr.slice(5)) game.textDone({ lang: 'tr', id: t.id, correct: 2, total: 4 });
  assert.ok(unlocked().includes('texts-all'));
  assert.equal(game.metrics().texts, ALL.tr.length);
});

test('texts: once the list is known, ids that no longer exist don\'t count', () => {
  game.registerTexts('uk', ALL.uk.map((t) => t.id));
  game.state().texts.uk = { 'renamed-long-ago': 1 };
  assert.equal(game.metrics().texts, 0);
  // A language whose texts were never loaded in this session counts what it has.
  game.state().texts.zz = { a: 1, b: 0.5 };
  assert.equal(game.metrics().texts, 0, 'not a language pack');
});

test('practice: XP once per text and mode per day; speech and role-play achievements', () => {
  const id = ALL.tr.find((t) => t.kind === 'speech').id;
  assert.equal(game.textPractised({ lang: 'tr', id, mode: 'repeat' }), game.XP.textPractice);
  assert.ok(unlocked().includes('speech-1'));
  assert.equal(game.textPractised({ lang: 'tr', id, mode: 'repeat' }), 0, 'again today: no XP');
  assert.equal(game.textPractised({ lang: 'tr', id, mode: 'shadow' }), game.XP.textPractice, 'another mode');
  assert.equal(game.counters().speechPractice, 3);
  const d = ALL.tr.find((t) => t.kind === 'dialogue').id;
  assert.equal(game.textPractised({ lang: 'tr', id: d, mode: 'roleplay' }), game.XP.textPractice);
  assert.ok(unlocked().includes('roleplay-1'));
  assert.equal(game.counters().rolePlays, 1);
  assert.equal(game.textPractised({ lang: 'tr', id: d, mode: 'gaps' }), game.XP.textPractice, 'filling the gaps earns XP too');
  assert.deepEqual([game.counters().speechPractice, game.counters().rolePlays], [3, 1], '…but it is not speaking practice');
  nextDay();
  assert.equal(game.textPractised({ lang: 'tr', id, mode: 'repeat' }), game.XP.textPractice, 'the next day');
});

test('Reading achievements all have known metrics', () => {
  const reading = game.ACHIEVEMENTS.filter((a) => a.group === 'Reading');
  assert.deepEqual(reading.map((a) => a.id), ['text-1', 'texts-5', 'texts-all', 'speech-1', 'roleplay-1', 'own-text']);
  const m = game.metrics();
  for (const a of reading) assert.ok(a.metric in m, a.id);
});

// ---------- Sync ----------

test('sync: text scores are sanitized like grammar scores', () => {
  const g = sanitize({ progress: {}, game: { texts: { tr: { a: 0.5, b: 7, c: -1, d: 'x', e: NaN, ['__proto__']: 1 }, uk: 'junk' } } }, { device: 'X' }).game;
  assert.deepEqual(g.texts.tr, { a: 0.5, b: 1 });
  assert.deepEqual(g.texts.uk, {});
  assert.deepEqual(sanitize({ progress: {}, game: {} }).game.texts, {}, 'older data has none');
});

test('sync: text progress merges to the best score per text, in any order', () => {
  const a = { texts: { tr: { one: 0.5, two: 1 } } };
  const b = { texts: { tr: { one: 0.75 }, ja: { x: 0.25 } } };
  const ab = mergeGame(a, b).texts;
  assert.deepEqual(ab, { tr: { one: 0.75, two: 1 }, ja: { x: 0.25 } });
  assert.deepEqual(mergeGame(b, a).texts, ab);
  assert.deepEqual(mergeGame({ texts: ab }, b).texts, ab, 'merging again changes nothing');
});

test('sync: a code from another device brings its finished texts; local progress survives a reload', () => {
  game.textDone({ lang: 'tr', id: ALL.tr[0].id, correct: 2, total: 4 });
  const remote = { device: 'B', progress: {}, game: { texts: { tr: { [ALL.tr[0].id]: 1, [ALL.tr[1].id]: 0.5 } } } };
  const merged = mergeAll(store.syncData(), remote, { device: store.deviceId() });
  assert.equal(merged.summary.changed, true);
  store.applySync(merged);
  assert.equal(game.textBest('tr', ALL.tr[0].id), 1);
  assert.equal(game.textBest('tr', ALL.tr[1].id), 0.5);
  // The saved data goes through sanitize() when the app starts again: texts are kept.
  const again = JSON.parse(store.exportData());
  assert.deepEqual(sanitize(again, { device: 'me' }).game.texts.tr, { [ALL.tr[0].id]: 1, [ALL.tr[1].id]: 0.5 });
});

// ---------- My texts ----------

test('own texts: a pasted text becomes one line per sentence', async () => {
  const { splitIntoLines, ownText, OWN_LINES_MAX } = await import('../js/reader.js');
  assert.deepEqual(splitIntoLines('Merhaba! Benim adım Alex.\n\nKanadalıyım ve 3.5 yıldır öğreniyorum… Dr. Ali ile çalışıyorum'),
    ['Merhaba!', 'Benim adım Alex.', 'Kanadalıyım ve 3.5 yıldır öğreniyorum…', 'Dr. Ali ile çalışıyorum']);
  assert.deepEqual(splitIntoLines('皆さん、こんにちは。マリアと申します！どうぞよろしく'), ['皆さん、こんにちは。', 'マリアと申します！', 'どうぞよろしく']);
  assert.deepEqual(splitIntoLines('اسمي سام، وأنا من كندا. لماذا أتعلم العربية؟ لأنني أحبها.'), ['اسمي سام، وأنا من كندا.', 'لماذا أتعلم العربية؟', 'لأنني أحبها.']);
  assert.deepEqual(splitIntoLines('  \n '), []);
  // long sentences are cut, nothing is lost, and the number of lines is capped
  const long = `${'слово '.repeat(40)}, а потім ${'ще '.repeat(40)}.`;
  const cut = splitIntoLines(long);
  assert.ok(cut.length > 1 && cut.every((l) => [...l].length <= 180));
  assert.equal(cut.join(' ').replace(/\s+/g, ''), long.replace(/\s+/g, ''));
  assert.equal(splitIntoLines('Ben de. '.repeat(500)).length, OWN_LINES_MAX);
  assert.deepEqual(splitIntoLines('Ben de. Sen mi? Evet, o.'), ['Ben de.', 'Sen mi?', 'Evet, o.'], 'short last words end a sentence');

  const t = ownText({ id: 'my-1', title: '', body: 'Merhaba! Nasılsın?' });
  assert.equal(t.own, true);
  assert.equal(t.kind, 'speech');
  assert.equal(t.title, 'Merhaba!');
  assert.deepEqual(t.lines, [{ tr: 'Merhaba!', en: '' }, { tr: 'Nasılsın?', en: '' }]);
  assert.deepEqual([t.glossary, t.questions], [[], []]);
  assert.equal(ownText({ id: 'my-2', title: 'Intro', body: 'x' }).title, 'Intro');
  // the reader's helpers work on it
  assert.ok(estimateMinutes(t) >= 1);
  assert.ok(recordLimit(t) >= 90000);
});

test('own texts: saved per language, kept in backups, never in sync data', () => {
  store._resetAll();
  assert.deepEqual(store.getOwnTexts('tr'), []);
  assert.equal(store.saveOwnText('tr', { title: 'x', body: '   ' }), null, 'empty text');
  const id = store.saveOwnText('tr', { title: '  Intro ', body: ' Merhaba! ' });
  assert.match(id, /^my-[a-z0-9]{1,12}$/);
  const id2 = store.saveOwnText('tr', { body: 'İkinci metin.' });
  assert.notEqual(id2, id);
  assert.deepEqual(store.getOwnTexts('tr').map((t) => [t.id, t.title, t.body]).sort(), [[id, 'Intro', 'Merhaba!'], [id2, '', 'İkinci metin.']].sort());
  assert.deepEqual(store.getOwnTexts('uk'), []);
  // editing keeps the id
  assert.equal(store.saveOwnText('tr', { id, title: 'Intro 2', body: 'Selam!' }), id);
  assert.equal(store.getOwnTexts('tr').find((t) => t.id === id).body, 'Selam!');
  assert.equal(store.getOwnTexts('tr').length, 2);
  // too long is cut; too many are refused
  const big = store.saveOwnText('uk', { body: 'я'.repeat(store.OWN_TEXT_MAX + 50) });
  assert.equal(store.getOwnTexts('uk')[0].body.length, store.OWN_TEXT_MAX);
  store.deleteOwnText('uk', big);
  assert.deepEqual(store.getOwnTexts('uk'), []);
  for (let i = 0; i < store.OWN_TEXTS_MAX; i++) store.saveOwnText('ja', { body: `テキスト${i}` });
  assert.equal(store.saveOwnText('ja', { body: 'もう一つ' }), null);
  assert.equal(store.getOwnTexts('ja').length, store.OWN_TEXTS_MAX);

  assert.equal('mine' in store.syncData(), false, 'not synced');
  const backup = store.exportData();
  store._resetAll();
  assert.deepEqual(store.getOwnTexts('tr'), []);
  store.importData(backup);
  assert.equal(store.getOwnTexts('tr').length, 2);
  // a tampered backup is cleaned
  const d = JSON.parse(backup);
  d.mine = { tr: [{ id: '../x', body: 'a' }, { id: 'my-ok', title: 5, body: 'b' }, { id: 'my-ok', body: 'dup' }, { id: 'my-empty', body: ' ' }], __proto__: [], 'not a lang': [] };
  store.importData(JSON.stringify(d));
  assert.deepEqual(store.getOwnTexts('tr').map((t) => [t.id, t.title, t.body]), [['my-ok', '', 'b']]);
  store._resetAll();
});

test('own texts: words of the course in them become a glossary — whole words only', async () => {
  const { autoGlossary, ownTextFor } = await import('../js/reader.js');
  const gloss = (code, body) => { const t = ownTextFor(languages[code], { id: 'my-1', body }); return { t, map: Object.fromEntries(t.glossary.map((g) => [g.tr, g.en])) }; };

  const tr = gloss('tr', 'Merhaba! Teşekkür ederim, çok güzel bir gün. Evde kahve içiyorum, karşıda.');
  assert.equal(tr.map.Merhaba, 'hello');
  assert.equal(tr.map['Teşekkür ederim'], 'thank you', 'a phrase of the course is one item');
  assert.ok(tr.map.kahve && tr.map['çok'] && !('Evde' in tr.map) && !('içiyorum' in tr.map), 'inflected forms are not guessed');
  assert.ok(tr.t.glossary.every((g) => g.exact && g.wordId && languages.tr.byId(g.wordId)));

  const ja = gloss('ja', '皆さん、こんにちは。私は学生です。日本語を勉強しています。目的は旅行です。コーヒーを飲みます。');
  assert.deepEqual(Object.keys(ja.map), ['こんにちは', '私', '学生', '日本語', '旅行', 'コーヒー']);
  assert.ok(ja.t.glossary.every((g) => g.kana), 'with the course’s reading');

  const ar = gloss('ar', 'مرحبا! اسمي سام، وأنا من كندا. أدرس العربية في الجامعة والبيت قريب، وبالقهوة نبدأ.');
  assert.equal(ar.map['والبيت'], 'house; home', 'behind و and the article');
  assert.equal(ar.map['وبالقهوة'], 'coffee');
  assert.ok(!('من' in ar.map) && !('في' in ar.map), 'two-letter words without vowels are not guessed');

  const uk = gloss('uk', 'Добрий вечір, друзі! Мене звати Алекс. Дякую, це дуже гарний день.');
  assert.equal(uk.map['Добрий вечір'], 'good evening');
  assert.ok(uk.map['Дякую'] && uk.map['день']);

  // marking keeps every line intact and finds every item
  for (const { t } of [tr, ja, ar, uk]) {
    const lang = languages[t.id === 'my-1' && t.lines[0].tr.startsWith('Merhaba') ? 'tr' : /[\u3040-\u30ff]/.test(t.lines[0].tr) ? 'ja' : /[\u0600-\u06ff]/.test(t.lines[0].tr) ? 'ar' : 'uk'];
    for (const l of t.lines) assert.equal(joined(markGlossary(lang, l.tr, t.glossary)), l.tr.normalize('NFC'));
    assert.equal(glossaryFound(lang, t).size, t.glossary.length);
  }
  assert.deepEqual(autoGlossary(languages.tr, []), []);
  assert.ok(autoGlossary(languages.tr, [{ tr: languages.tr.words.filter((w) => !/\s/.test(w.tr)).slice(0, 200).map((w) => w.tr).join(' ') }]).length <= 60, 'capped');
});

test('built-in texts: the course’s other words can be tapped too, without touching the text’s own glossary', async () => {
  const { markAll, extraGlossary } = await import('../js/reader.js');
  for (const [code, texts] of Object.entries(ALL)) {
    const lang = languages[code];
    let extraMarks = 0;
    for (const t of texts) {
      const extra = extraGlossary(lang, t);
      const own = new Set(t.glossary.flatMap((g) => glossaryForms(lang, g)));
      assert.ok(extra.every((g) => g.exact && !own.has(lang.normalize(g.tr))), `${code}/${t.id}: no item twice`);
      for (const l of t.lines) {
        const plain = markGlossary(lang, l.tr, t.glossary);
        const all = markAll(lang, l.tr, t.glossary, extra);
        assert.equal(joined(all), l.tr.normalize('NFC'), `${code}/${t.id}: ${l.tr}`);
        // every word the text's glossary marks is still marked, with the same item
        assert.deepEqual(all.filter((s) => s.gloss != null && s.gloss < t.glossary.length), plain.filter((s) => s.gloss != null), `${code}/${t.id}: ${l.tr}`);
        extraMarks += all.filter((s) => s.gloss != null && s.gloss >= t.glossary.length).length;
      }
    }
    assert.ok(extraMarks > texts.length * 5, `${code}: ${extraMarks} extra tappable words`);
  }
  assert.deepEqual(extraGlossary(languages.tr, { own: true, lines: [{ tr: 'Merhaba' }], glossary: [] }), []);
});

test('word pages: the texts a course word appears in, with the line it is first seen in', async () => {
  const { textsWithWord } = await import('../js/reader.js');
  for (const [code, texts] of Object.entries(ALL)) {
    const lang = languages[code];
    let linked = 0;
    for (const w of lang.words) {
      const found = textsWithWord(lang, texts, w.id);
      if (!found.length) continue;
      linked++;
      assert.equal(new Set(found.map((f) => f.id)).size, found.length, `${code} ${w.id}: each text once`);
      for (const f of found) {
        const t = texts.find((x) => x.id === f.id);
        assert.ok(t && t.lines.some((l) => l.tr === f.line), `${code} ${w.id}: a real line of ${f.id}`);
      }
    }
    assert.ok(linked >= 150, `${code}: ${linked} words are linked to a text`);
    assert.deepEqual(textsWithWord(lang, texts, 'no-such-word'), []);
  }
});

test('proverbs and tongue twisters: practised line by line, with a note under every line', () => {
  assert.deepEqual(practiceModes({ kind: 'speech' }), ['repeat', 'shadow', 'record']);
  assert.deepEqual(practiceModes({ kind: 'twister' }), ['repeat', 'shadow']);
  assert.deepEqual(practiceModes({ kind: 'saying' }), ['repeat', 'shadow']);
  assert.deepEqual(practiceModes({ kind: 'dialogue' }), []);
  assert.equal(canPractise({ kind: 'story' }), false);
  assert.equal(canPractise(null), false);
  for (const [code, texts] of Object.entries(ALL)) {
    const lang = languages[code];
    // Speak → Sounds and the Phrasebook link to these by id.
    for (const [id, kind] of [[`${code}-tongue-twisters`, 'twister'], [`${code}-proverbs`, 'saying']]) {
      const t = texts.find((x) => x.id === id);
      assert.equal(t?.kind, kind, id);
      for (const l of t.lines) {
        assert.ok(nonEmpty(l.note), `${id}: note for ${l.tr}`);
        assert.ok(!l.speaker, `${id}: no speakers`);
        // What the voice is given instead of the text is the same sentence: its
        // kana reading, or the text with only some of its kanji spelled out.
        if (l.say) {
          const compact = (x) => x.replace(/[\s、。]/g, '');
          if (/\p{Script=Han}/u.test(l.say)) assert.ok([...l.say].every((ch) => !/\p{Script=Han}/u.test(ch) || l.tr.includes(ch)), `${id}: say for ${l.tr}`);
          else assert.equal(compact(l.say), compact(l.kana), `${id}: say for ${l.tr}`);
        }
      }
    }
  }
});

// ---------- Fill the gaps ----------

/** A repeatable random(): the same gaps every run. */
function seeded(seed = 7) {
  let x = seed;
  return () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648; };
}

test('fill the gaps: one glossary word per line, four different options, the line stays intact', () => {
  for (const [code, texts] of Object.entries(ALL)) {
    const lang = languages[code];
    let offered = 0;
    for (const t of texts) {
      const items = gapItems(lang, t, { random: seeded() });
      assert.ok(items.length <= 10, `${code}/${t.id}: at most ten gaps`);
      assert.equal(new Set(items.map((g) => g.line)).size, items.length, `${code}/${t.id}: one gap per line`);
      assert.equal(new Set(items.map((g) => g.gloss)).size, items.length, `${code}/${t.id}: each word once`);
      assert.deepEqual(items.map((g) => g.line), items.map((g) => g.line).sort((a, b) => a - b), `${code}/${t.id}: in text order`);
      for (const g of items) {
        assert.equal(g.before + g.answer + g.after, t.lines[g.line].tr.normalize('NFC'), `${code}/${t.id}: line ${g.line}`);
        assert.equal(g.options.length, 4);
        assert.equal(new Set(g.options.map((o) => lang.normalize(o))).size, 4, `${code}/${t.id}: options differ: ${g.options.join(' / ')}`);
        assert.ok(g.options.includes(g.option), `${code}/${t.id}: the right answer is offered`);
        assert.equal(lang.normalize(g.option), lang.normalize(g.answer));
        assert.ok(lang.normalize(g.answer), `${code}/${t.id}: the gap is a word`);
      }
      if (items.length >= MIN_GAPS) offered++;
    }
    assert.ok(offered >= texts.length - 2, `${code}: nearly every text has a gap exercise (${offered}/${texts.length})`);
  }
});

test('fill the gaps: no capital-letter giveaway, repeated words skipped, too few words gives nothing', () => {
  const text = (lines, words) => ({ lines: lines.map((tr) => ({ tr, en: '' })), glossary: words.map((tr) => ({ tr, en: '' })) });
  const t = text(['Kedi uyuyor.', 'Bu bir köpek.', 'İyi günler, efendim.', 'Balık yüzüyor.'], ['kedi', 'köpek', 'iyi günler', 'balık']);
  const items = gapItems(L.tr, t, { random: seeded(3) });
  assert.equal(items.length, 4);
  assert.deepEqual(items.map((g) => g.answer), ['Kedi', 'köpek', 'İyi günler', 'Balık'], 'the line keeps its own spelling');
  // A gap at the start of a sentence: every option gets a capital (Turkish i → İ)…
  assert.deepEqual([...items[0].options].sort(), ['Balık', 'Kedi', 'Köpek', 'İyi günler']);
  // …a gap inside one: words that only had a capital from starting a sentence are written small (İ → i).
  assert.deepEqual([...items[1].options].sort(), ['balık', 'iyi günler', 'kedi', 'köpek']);
  for (const g of items) assert.equal(g.option, g.answer);
  // A name keeps its capital inside a sentence: the glossary writes it with one.
  const named = gapItems(L.tr, text(['Ankara güzel.', 'Kedi uyuyor.', 'Bu bir köpek.', 'Balık yüzüyor.'], ['Ankara', 'kedi', 'köpek', 'balık']), { random: seeded() });
  assert.ok(named.find((g) => g.answer === 'köpek').options.includes('Ankara'));
  // "berber" twice in a line would answer itself: that line gets no gap for it.
  const twice = gapItems(L.tr, text(['Bir berber bir berbere geldi.', 'Kedi uyuyor.', 'Bu bir köpek.', 'Balık yüzüyor.', 'Kuş uçuyor.'], ['berber', 'kedi', 'köpek', 'balık', 'kuş']), { random: seeded() });
  assert.ok(!twice.some((g) => g.line === 0));
  assert.deepEqual(gapItems(L.tr, text(['Kedi uyuyor.', 'Bu bir köpek.', 'Balık yüzüyor.'], ['kedi', 'köpek', 'balık'])), [], 'three words are not enough for four options');
  assert.deepEqual(gapItems(L.tr, text(['Kedi uyuyor.'], [])), []);
  assert.equal(gapItems(L.tr, t, { max: 2, random: seeded() }).length, 2);
});

test('own texts: the words that are in no word list yet, each once and in order', () => {
  const tr = languages.tr;
  const text = { lines: [{ tr: 'Merhaba! Benim adım Zzqa, zzqb’de oturuyorum.' }, { tr: 'Zzqa bir a, tek-zzqc ve MERHABA.' }] };
  const found = newWords(tr, text);
  assert.ok(!found.some((w) => /^merhaba$/i.test(w)), 'a course word is not listed');
  assert.deepEqual(found.filter((w) => /zzq/i.test(w)), ['Zzqa', 'zzqb’de', 'tek-zzqc'], 'made-up words: once each, as written, apostrophes and hyphens kept');
  assert.ok(!found.includes('a'), 'single letters are left out');
  assert.deepEqual(newWords(tr, text, 1).length, 1, 'no more than asked for');
  // The learner's own words count as known.
  try {
    tr.setOwnWords([{ id: 'mw-1', tr: 'zzqa', en: 'made up' }]);
    assert.ok(!newWords(tr, text).some((w) => /^zzqa$/i.test(w)));
  } finally {
    tr.setOwnWords([]);
  }
  // Japanese has no spaces between words: nothing is listed.
  assert.deepEqual(newWords(languages.ja, { lines: [{ tr: '私はここに住んでいます。' }] }), []);
  assert.deepEqual(newWords(tr, { lines: [] }), []);
});
