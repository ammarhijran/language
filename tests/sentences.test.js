// The sentence builder's data side (js/sentences.js), in node: how sentences
// are cut into tiles per language, how an answer is checked, and that every
// language has plenty of sentences to practise.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from './all-languages.js';
import {
  tokenize, checkOrder, makeSentence, phraseSentence, sentencesFor, tileKey, tileTexts, acceptedOrders, MIN_TOKENS, MAX_TOKENS, MIN_SENTENCES,
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
      // The voice reads the source entry (its override, reading, dialect), not the tiles.
      assert.equal(s.audio.tr, s.audioText, `${L.code} ${s.id}`);
      assert.equal(L.speech(s.audio).lang.slice(0, 2), L.code);
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
  assert.deepEqual(checkOrder(tr, s, s.tokens), { correct: true, marks: [true, true, true, true, true, true], usual: true });
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

// ---------- Tiles give nothing away ----------

test('tiles have no punctuation and no sentence-initial capital; the reveal keeps both', () => {
  const s = find(uk, 'p-cafe', 'phrase:мені-будь-ласка-капучино-без-цукру')
    || sentencesFor(uk, 'all').find((x) => x.audioText === 'Мені, будь ласка, капучино без цукру.');
  assert.ok(s, 'the café sentence');
  assert.deepEqual([...s.tiles].sort(), ['без', 'будь', 'капучино', 'ласка', 'мені', 'цукру']);
  assert.equal(s.text, 'Мені, будь ласка, капучино без цукру.');
  for (const L of [tr, uk, ja, ar]) {
    for (const x of sentencesFor(L, 'all')) {
      assert.equal(x.tiles.length, x.tokens.length);
      x.tiles.forEach((t, i) => {
        assert.match(t, /^[\p{L}\p{M}\p{N}](?:.*[\p{L}\p{M}\p{N}])?$/u, `${L.code} ${x.id}: “${t}”`);
        assert.equal(tileKey(L, t), tileKey(L, x.tokens[i]), `${L.code} ${x.id}: ${t}`);
      });
    }
  }
});

test('the first tile is lowercase unless it is a name; names keep their capitals', () => {
  assert.deepEqual(tileTexts(tr, tokenize('Bugün hava çok güzel.')), ['bugün', 'hava', 'çok', 'güzel']);
  assert.deepEqual(tileTexts(tr, tokenize('İyi geceler!')), ['iyi', 'geceler'], 'Turkish İ → i');
  assert.deepEqual(tileTexts(tr, tokenize("Yarın İzmir'e gidiyorum.")), ['yarın', "İzmir'e", 'gidiyorum']);
  assert.deepEqual(tileTexts(tr, tokenize('Merhaba Ali, nasılsın?')), ['merhaba', 'Ali', 'nasılsın']);
  assert.equal(tileTexts(tr, tokenize("İstanbul'a gidiyorum."))[0], "İstanbul'a");
  // A dialogue: each line's first word too.
  assert.deepEqual(tileTexts(tr, tokenize('— Nasılsın? — İyiyim.')), ['nasılsın', 'iyiyim']);
  assert.equal(tileTexts(uk, tokenize('Київ дуже гарний.'))[0], 'Київ');
  // How often a capital still marks the first tile in tr/uk phrases: only for names.
  for (const L of [tr, uk]) {
    const phrases = L.categories.filter((c) => c.group === 'phrases').flatMap((c) => sentencesFor(L, c.id));
    const capital = phrases.filter((x) => /^\p{Lu}/u.test(x.tiles[0]));
    assert.ok(capital.length <= phrases.length * 0.1, `${L.code}: ${capital.length}/${phrases.length} start with a capital tile`);
  }
});

// ---------- Other valid orders ----------

const sentenceOf = (L, text) => sentencesFor(L, 'all').find((x) => x.audioText === text) || makeSentence(L, { tr: text, en: text }, {}, 'test');

test('valid other orders count: “please”, time words, Ukrainian object pronouns, vocatives', () => {
  const right = [
    [uk, 'Мені, будь ласка, капучино без цукру.', 'мені капучино без цукру будь ласка'],
    [uk, 'Мені, будь ласка, капучино без цукру.', 'будь ласка мені капучино без цукру'],
    [uk, 'Я тебе люблю.', 'я люблю тебе'],
    [uk, 'Я сьогодні працюю з дому.', 'сьогодні я працюю з дому'],
    [uk, 'Я сьогодні працюю з дому.', 'я працюю з дому сьогодні'],
    [uk, 'Доброго ранку, колеги!', 'колеги доброго ранку'],
    [tr, 'Bugün hava çok güzel.', 'hava bugün çok güzel'],
    [tr, 'Lütfen bir doktor çağırın!', 'bir doktor çağırın lütfen'],
    [tr, 'Bir çay, lütfen.', 'lütfen bir çay'],
    [tr, 'Bebek uyuyor, lütfen sessiz olun.', 'bebek uyuyor sessiz olun lütfen'],
    [ar, 'الْحِسَابُ مِنْ فَضْلِكَ.', 'مِنْ فَضْلِكَ الْحِسَابُ'],
    [ar, 'الْجَوُّ حَارٌّ جِدًّا الْيَوْمَ.', 'الْيَوْمَ الْجَوُّ حَارٌّ جِدًّا'],
    [ja, '母は毎朝お弁当を作ります。', 'まいあさ はは は おべんとう を つくります'], // a time word before or after the topic
    [ja, 'お父さんは今、家にいますか。', 'いま おとうさん は いえ に います か'],
  ];
  for (const [L, text, answer] of right) {
    const r = checkOrder(L, sentenceOf(L, text), tokenize(answer));
    assert.equal(r.correct, true, `${L.code} ${text} ← ${answer}`);
    assert.equal(r.usual, false, 'the reveal shows the usual order');
  }
});

test('orders the rules must not accept', () => {
  const wrong = [
    [uk, 'Столик на двох, будь ласка.', 'на столик двох будь ласка'],
    [uk, 'На добраніч, до завтра!', 'завтра на добраніч до'], // до завтра stays together
    [uk, 'Батько навчив мене плавати.', 'батько навчив плавати мене'],
    [uk, 'Це моя дружина, Оксана.', 'оксана це моя дружина'], // an apposition, not a vocative
    [uk, 'Вибачте, я не розумію. Повторіть, будь ласка.', 'будь ласка вибачте я не розумію повторіть'], // two sentences
    [tr, 'Bugün çok yorgunum.', 'çok bugün yorgunum'],
    [tr, 'Yarın sabah erken kalkmam lazım.', 'erken yarın sabah kalkmam lazım'],
    [tr, 'Yemekten sonra çay içelim.', 'sonra yemekten çay içelim'], // a postposition
    [tr, 'Bu akşam müsait misiniz?', 'müsait bu akşam misiniz'], // the question particle
    [tr, 'Yarın diş hekimine gitmem lazım.', 'diş yarın hekimine gitmem lazım'], // a compound
    [tr, 'Daha yavaş lütfen, çok hızlı konuşuyorsunuz.', 'daha yavaş çok hızlı konuşuyorsunuz lütfen'], // lütfen stays in its clause
    [ar, 'أَظُنُّ أَنَّ الْمَطْعَمَ مُغْلَقٌ الْيَوْمَ.', 'الْيَوْمَ أَظُنُّ أَنَّ الْمَطْعَمَ مُغْلَقٌ'], // out of the subordinate clause
    [ja, '母は毎朝お弁当を作ります。', 'はは まいあさ は おべんとう を つくります'], // between a noun and its particle
    [ja, '今日の晩ご飯は魚です。', 'の きょう ばんごはん は さかな です'], // 今日 is tied to its の
  ];
  for (const [L, text, answer] of wrong) {
    const s = sentenceOf(L, text);
    assert.equal(checkOrder(L, s, tokenize(answer)).correct, false, `${L.code} ${text} ← ${answer}`);
  }
});

test('every accepted order uses exactly the sentence’s tiles, the usual one first', () => {
  for (const L of [tr, uk, ja, ar]) {
    for (const s of sentencesFor(L, 'all')) {
      const orders = acceptedOrders(L, s);
      const keys = s.tokens.map((t) => tileKey(L, t));
      assert.deepEqual(orders[0], keys);
      const bag = [...keys].sort().join(' ');
      for (const o of orders) assert.equal([...o].sort().join(' '), bag, `${L.code} ${s.id}`);
      assert.deepEqual(checkOrder(L, s, s.tiles), { correct: true, marks: s.tiles.map(() => true), usual: true });
    }
  }
});

test('an order listed on the entry, or another course sentence with the same words and meaning, counts', () => {
  const s = makeSentence(uk, { tr: 'Я йду додому.', en: 'I am going home.', orders: ['Додому я йду'] }, {}, 'x');
  assert.equal(checkOrder(uk, s, tokenize('додому я йду')).correct, true);
  assert.equal(checkOrder(uk, s, tokenize('йду я додому')).correct, false);
});
