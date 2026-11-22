// The sentence builder's data side (js/sentences.js), in node: how sentences
// are cut into tiles per language, how an answer is checked, and that every
// language has plenty of sentences to practise.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from '../js/languages/index.js';
import {
  tokenize, checkOrder, makeSentence, phraseSentence, sentencesFor, tileKey, MIN_TOKENS, MAX_TOKENS, MIN_SENTENCES,
} from '../js/sentences.js';
import { chooseReviewType } from '../js/stats.js';
import { newCard, markKnown } from '../js/srs.js';

const { tr, uk, ja, ar } = languages;
const NBSP = '\u00a0';
const find = (L, scope, id) => sentencesFor(L, scope).find((s) => s.id === id);
const swap = (a, i, j) => { const b = [...a]; [b[i], b[j]] = [b[j], b[i]]; return b; };

// ---------- Tokenization ----------

test('tokenize splits on spaces and keeps punctuation on its word', () => {
  assert.deepEqual(tokenize('  Menüyü   alabilir miyim? '), ['Menüyü', 'alabilir', 'miyim?']);
  assert.deepEqual(tokenize(''), []);
  assert.deepEqual(tokenize(undefined), []);
});

test('tokenize attaches a dialogue dash to the next word (or the last one)', () => {
  assert.deepEqual(tokenize('— Adınız ne? — Benim adım Tom.'),
    [`—${NBSP}Adınız`, 'ne?', `—${NBSP}Benim`, 'adım', 'Tom.']);
  assert.deepEqual(tokenize('evet evet —'), ['evet', `evet${NBSP}—`]);
  assert.deepEqual(tokenize('— —'), []);
});

test('Turkish and Ukrainian phrases are cut into their words as written', () => {
  const t = find(tr, 'p-cafe', 'phrase:iki-kişilik-bir-masanız-var-mı');
  assert.deepEqual(t.tokens, ['İki', 'kişilik', 'bir', 'masanız', 'var', 'mı?']);
  assert.equal(t.audioText, 'İki kişilik bir masanız var mı?');
  assert.equal(t.display, undefined);
  assert.equal(t.reading, undefined);

  const u = find(uk, 'p-cafe', 'phrase:столик-на-двох-будь-ласка');
  assert.deepEqual(u.tokens, ['Столик', 'на', 'двох,', 'будь', 'ласка.']);
  assert.equal(u.text, 'Столик на двох, будь ласка.');
});

test('Japanese tiles are the spaced kana; the kanji sentence is shown and spoken', () => {
  const s = find(ja, 'p-smalltalk', 'phrase:お名前は何ですか');
  assert.deepEqual(s.tokens, ['おなまえ', 'は', 'なん', 'です', 'か']);
  assert.equal(s.display, 'お名前は何ですか。');
  assert.equal(s.audioText, 'お名前は何ですか。');
  assert.match(s.reading, /onamae wa nan desu ka/);
  // The casual pair has its own kana, so it is a sentence too.
  const pair = find(ja, 'p-smalltalk', 'pair:お名前は何ですか');
  assert.deepEqual(pair.tokens, ['なまえ', 'なんて', 'いう', 'の']);
  assert.equal(pair.reg, 'casual');
});

test('Japanese example sentences use their kana reading as tiles; a sentence without one is skipped', () => {
  const all = sentencesFor(ja, 'all');
  assert.ok(all.filter((s) => s.source.kind === 'example').length > 100, 'example sentences are buildable');
  const ex = all.find((s) => s.audioText === '先生、おはようございます。');
  assert.deepEqual(ex.tokens, ['せんせい', 'おはよう', 'ございます']);
  assert.equal(ex.display, '先生、おはようございます。');
  assert.equal(makeSentence(ja, { tr: '先生、おはようございます。', en: 'Good morning, teacher.' }, {}, 'x'), null);
  for (const s of all) {
    assert.doesNotMatch(s.text, /\p{Script=Han}/u, s.id);
    assert.ok(s.display, s.id);
  }
});

test('Arabic tiles keep their vowel marks and punctuation; the transliteration is the reading', () => {
  const s = find(ar, 'p-cafe', 'phrase:القايمهمنفضلك');
  assert.deepEqual(s.tokens, ['الْقَائِمَةُ،', 'مِنْ', 'فَضْلِكَ.']);
  assert.equal(s.reading, 'al-qāʾima, min faḍlik');
  // Example sentences carry their transliteration from js/languages/ar/readings.js.
  const ex = find(ar, 'essentials', 'example:مرحبا');
  assert.deepEqual(ex.tokens, ['مَرْحَبًا،', 'كَيْفَ', 'حَالُكَ؟']);
  assert.ok(ex.reading && /^marḥaban/.test(ex.reading), ex.reading);
});

test(`every sentence has ${MIN_TOKENS}–${MAX_TOKENS} tiles, each with a letter or digit`, () => {
  for (const L of [tr, uk, ja, ar]) {
    for (const s of sentencesFor(L, 'all')) {
      assert.ok(s.tokens.length >= MIN_TOKENS && s.tokens.length <= MAX_TOKENS, `${L.code} ${s.id}: ${s.tokens.length}`);
      for (const t of s.tokens) assert.match(t, /[\p{L}\p{N}]/u, `${L.code} ${s.id}`);
      assert.equal(s.text, s.tokens.join(' '));
      assert.ok(s.en && s.audioText && s.id, `${L.code} ${s.id}`);
    }
  }
  const short = makeSentence(tr, { tr: 'Çok güzel!', en: 'Very nice!' }, {}, 'x');
  const long = makeSentence(tr, { tr: 'bir iki üç dört beş altı yedi sekiz dokuz', en: '1–9' }, {}, 'y');
  assert.equal(short, null);
  assert.equal(long, null);
});

// ---------- Checking an answer ----------

test('the right order is correct; a wrong one marks the misplaced words', () => {
  const s = find(tr, 'p-cafe', 'phrase:iki-kişilik-bir-masanız-var-mı');
  assert.deepEqual(checkOrder(tr, s, s.tokens), { correct: true, marks: [true, true, true, true, true, true] });
  const r = checkOrder(tr, s, swap(s.tokens, 4, 5));
  assert.equal(r.correct, false);
  assert.deepEqual(r.marks, [true, true, true, true, false, false]);
  // Leaving a tile out is never correct.
  assert.equal(checkOrder(tr, s, s.tokens.slice(0, -1)).correct, false);
});

test('punctuation and case are ignored', () => {
  const s = find(uk, 'p-cafe', 'phrase:столик-на-двох-будь-ласка');
  assert.equal(checkOrder(uk, s, ['столик', 'НА', 'двох', 'будь', 'ласка']).correct, true);
  const t = find(tr, 'all', 'example:nasılsınız');
  assert.equal(checkOrder(tr, t, t.tokens.map((x) => x.replace(/[—?.,\s]/g, '').toLocaleLowerCase('tr'))).correct, true);
});

test('Arabic vowel marks are ignored', () => {
  const s = find(ar, 'p-cafe', 'phrase:القايمهمنفضلك');
  assert.equal(checkOrder(ar, s, ['القائمة', 'من', 'فضلك']).correct, true);
  assert.equal(checkOrder(ar, s, ['من', 'القائمة', 'فضلك']).correct, false);
});

test('a dialogue dash never makes the same word count as different (Arabic normalize keeps “—”)', () => {
  // “— مِنْ أَيْنَ أَنْتَ؟ — أَنَا مِنْ كَنَدَا.”: the two مِنْ may swap, as the two yok may in Turkish.
  const a = find(ar, 'all', 'example:مناينانت');
  assert.equal(a.tokens[0], `—${NBSP}مِنْ`);
  assert.equal(checkOrder(ar, a, swap(a.tokens, 0, 4)).correct, true);
  const b = find(ar, 'all', 'example:تمام');
  assert.equal(checkOrder(ar, b, swap(b.tokens, 1, 2)).correct, true);
  const t = find(tr, 'all', 'example:poşet-ister-misiniz');
  assert.equal(checkOrder(tr, t, swap(t.tokens, 3, 5)).correct, true);
  // The dash alone never decides: different words are still wrong.
  assert.equal(checkOrder(ar, a, swap(a.tokens, 0, 1)).correct, false);
  for (const L of [tr, uk, ja, ar]) {
    for (const s of sentencesFor(L, 'all')) for (const tok of s.tokens) assert.match(tileKey(L, tok), /^[\p{L}\p{M}\p{N}]+$/u, `${L.code} ${s.id} ${tok}`);
  }
});

test('identical words may swap places', () => {
  // Same word, different case: Ayrı / ayrı.
  const t = find(tr, 'all', 'phrase:ayrı-ayrı-ödeyebilir-miyiz');
  assert.equal(checkOrder(tr, t, swap(t.tokens, 0, 1)).correct, true);
  // Це … це in Ukrainian, two は in Japanese, two هِيَ in Arabic.
  const u = find(uk, 'all', 'grammar:noun-gender:2:0');
  assert.equal(checkOrder(uk, u, swap(u.tokens, 0, 4)).correct, true);
  const j = find(ja, 'all', 'grammar:wa-vs-ga:2:0');
  assert.deepEqual(j.tokens.filter((x) => x === 'は').length, 2);
  assert.equal(checkOrder(ja, j, swap(j.tokens, 1, 5)).correct, true);
  assert.equal(checkOrder(ja, j, swap(j.tokens, 0, 4)).correct, false); // ビール ↔ ワイン changes the meaning
  const a = find(ar, 'all', 'grammar:negation:1:2');
  assert.equal(checkOrder(ar, a, swap(a.tokens, 0, 3)).correct, true);
});

test('Japanese answers are checked on the kana tiles (katakana or hiragana alike)', () => {
  const s = sentencesFor(ja, 'p-cafe').find((x) => x.tokens.includes('メニュー'));
  assert.ok(s, 'a café phrase with メニュー');
  assert.equal(checkOrder(ja, s, s.tokens).correct, true);
  assert.equal(checkOrder(ja, s, s.tokens.map((x) => (x === 'メニュー' ? 'めにゅー' : x))).correct, true);
  // The kanji sentence itself is not a tile.
  assert.equal(checkOrder(ja, s, [s.display]).correct, false);
});

// ---------- Scopes ----------

const PLENTY = 5;
for (const L of [tr, uk, ja, ar]) {
  test(`${L.code}: plenty of sentences for every phrase and talk topic, and for all`, () => {
    const phraseCats = L.categories.filter((c) => c.group === 'phrases' || c.group === 'talk');
    assert.ok(phraseCats.length >= 8);
    // Every topic can be practised; most have plenty. (Some situations are mostly
    // short exclamations — "Help!", "Call the police!" — too short to build.)
    const counts = phraseCats.map((c) => [c.id, sentencesFor(L, c.id).length]);
    for (const [id, n] of counts) assert.ok(n >= MIN_SENTENCES, `${L.code} ${id}: only ${n} sentences`);
    const plenty = counts.filter(([, n]) => n >= PLENTY).length;
    assert.ok(plenty >= counts.length * 0.8, `${L.code}: only ${plenty}/${counts.length} phrase topics have ${PLENTY}+ sentences`);
    const all = sentencesFor(L, 'all');
    assert.ok(all.length >= 200, `${L.code} all: only ${all.length}`);
    for (const kind of ['phrase', 'pair', 'grammar']) assert.ok(all.some((s) => s.source.kind === kind), `${L.code} has ${kind} sentences`);
    if (L.code !== 'ja') assert.ok(all.some((s) => s.source.kind === 'example'), `${L.code} has example sentences`);
    // The same sentence is only practised once.
    const keys = all.map((s) => s.tokens.map((t) => L.normalize(t)).join(' '));
    assert.equal(new Set(keys).size, keys.length);
    assert.equal(new Set(all.map((s) => s.id)).size, all.length);
  });

  test(`${L.code}: category, learned and grammar scopes`, () => {
    const cat = L.categories.find((c) => c.group === 'phrases');
    const inCat = new Set(L.wordsIn(cat.id).map((w) => w.id));
    for (const s of sentencesFor(L, cat.id)) assert.ok(inCat.has(s.source.wordId), s.id);

    assert.deepEqual(sentencesFor(L, 'learned', { cards: {} }), []);
    assert.deepEqual(sentencesFor(L, undefined), []);
    const words = L.wordsIn(cat.id).slice(0, 4);
    const cards = Object.fromEntries(words.map((w) => [w.id, newCard()]));
    const learned = sentencesFor(L, 'learned', { cards });
    assert.ok(learned.length >= MIN_SENTENCES, `${L.code}: ${learned.length}`);
    for (const s of learned) assert.ok(cards[s.source.wordId], s.id);

    const usable = L.grammar.filter((l) => sentencesFor(L, `grammar:${l.id}`).length >= MIN_SENTENCES);
    assert.ok(usable.length >= 10, `${L.code}: ${usable.length} lessons to practise`);
    const lesson = usable[0];
    for (const s of sentencesFor(L, `grammar:${lesson.id}`)) {
      assert.equal(s.source.kind, 'grammar');
      assert.equal(s.source.lessonId, lesson.id);
    }
    assert.deepEqual(sentencesFor(L, 'grammar:no-such-lesson'), []);
    assert.deepEqual(sentencesFor(L, 'no-such-topic'), []);
  });
}

// ---------- Reviews ----------

test('reviews sometimes build a familiar phrase, never a new one or a single word', () => {
  const phrase = tr.byId('iki-kişilik-bir-masanız-var-mı');
  const word = tr.words.find((w) => !phraseSentence(tr, w) && !w.tr.includes(' '));
  const familiar = { ...newCard(), reps: 4, interval: 10 };
  const types = (card, w, L = tr) => new Set(Array.from({ length: 300 }, () => chooseReviewType(card, w, L)));

  assert.ok(phraseSentence(tr, phrase));
  assert.ok(types(familiar, phrase).has('build'));
  assert.ok(types(markKnown(), phrase).has('build'));
  assert.ok(!types({ ...newCard(), reps: 1, interval: 1 }, phrase).has('build'));
  assert.ok(!types(familiar, word).has('build'));
  // Without the language pack (older callers) nothing changes.
  assert.ok(!Array.from({ length: 300 }, () => chooseReviewType(familiar, phrase)).includes('build'));
  // Japanese phrases are built from their kana.
  const jp = ja.byId('お名前は何ですか');
  assert.ok(types(familiar, jp, ja).has('build'));
  assert.deepEqual(phraseSentence(ja, jp).tokens, ['おなまえ', 'は', 'なん', 'です', 'か']);
});

test('every word topic can be practised in Sentences mode, and every core word has an example', () => {
  for (const L of [tr, uk, ja, ar]) {
    const wordTopics = L.categories.filter((c) => (c.group || 'words') === 'words');
    for (const c of wordTopics) assert.ok(sentencesFor(L, c.id).length >= 10, `${L.code} ${c.id}: ${sentencesFor(L, c.id).length}`);
    for (const c of L.categories.slice(0, 12)) {
      for (const w of L.wordsIn(c.id)) assert.ok(w.ex, `${L.code}: core word ${w.tr} has no example`);
    }
  }
});
