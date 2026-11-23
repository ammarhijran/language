// Letter quiz: which letters can be asked, and what a round looks like.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { letterSets, letterQuestions } from '../js/letterquiz.js';
import { languages } from './all-languages.js';

const { tr, uk, ja, ar } = languages;

test('the scripts that are new have a letter quiz; Turkish has none', () => {
  assert.deepEqual(letterSets(tr), []);
  assert.deepEqual(letterSets(null), []);
  assert.deepEqual(letterSets(ja).map((s) => s.id), ['hiragana', 'katakana', 'match', 'voiced', 'combined']);
  assert.deepEqual(letterSets(ar).map((s) => s.id), ['letters', 'shapes']);
  assert.deepEqual(letterSets(uk).map((s) => s.id), ['letters']);
  for (const lang of [uk, ja, ar]) {
    for (const set of letterSets(lang)) {
      assert.ok(/^[a-z]+$/.test(set.id) && set.name);
      assert.ok(set.items.length >= 20, `${lang.code} ${set.id}: ${set.items.length}`);
      const glyphs = set.items.map((x) => x.glyph);
      assert.equal(new Set(glyphs).size, glyphs.length, 'no glyph twice');
      for (const x of set.items) {
        assert.ok(x.label && x.glyph && x.label !== x.glyph, `${lang.code}: ${x.glyph}`);
        if (!set.native) assert.ok(/^[\x20-\x7Eāīūēōḥṣḍṭẓʾʿ—“”]+$/.test(x.label), `a reading in Latin letters: ${x.label}`);
      }
    }
  }
});

test('Japanese: every kana by its rōmaji, in both scripts; っ and ー are not asked', () => {
  const [hira, kata] = letterSets(ja);
  const label = (set, glyph) => set.items.find((x) => x.glyph === glyph)?.label;
  assert.equal(hira.items.length, 46);
  assert.equal(kata.items.length, 46);
  for (const [h, k, rom] of [['あ', 'ア', 'a'], ['し', 'シ', 'shi'], ['ち', 'チ', 'chi'], ['つ', 'ツ', 'tsu'], ['ふ', 'フ', 'fu'], ['ん', 'ン', 'n'], ['を', 'ヲ', 'o (wo)'], ['ろ', 'ロ', 'ro']]) {
    assert.equal(label(hira, h), rom);
    assert.equal(label(kata, k), rom);
  }
  for (const set of [hira, kata]) assert.ok(!set.items.some((x) => /[っッー]/.test(x.glyph)));
  const labels = hira.items.map((x) => x.label);
  assert.equal(new Set(labels).size, labels.length, 'no two kana share a reading');
});

test('Ukrainian and Arabic: every letter has a reading of its own', () => {
  const [u] = letterSets(uk);
  assert.equal(u.items.length, 33);
  const of = (glyph) => u.items.find((x) => x.glyph === glyph)?.label;
  assert.equal(of('Г г'), 'h');
  assert.equal(of('Ґ ґ'), 'g');
  assert.equal(of('Х х'), 'kh');
  assert.equal(of('Щ щ'), 'shch');
  assert.equal(of('Ь ь'), 'soft sign');
  assert.notEqual(of('И и'), of('Й й'));
  const [a] = letterSets(ar);
  assert.equal(a.items.length, ar.alphabet.length);
  assert.equal(a.items.find((x) => x.glyph === 'ب').label, 'bāʾ');
  // the joined shapes: 22 joining letters × 3, 6 non-joining × 1; a letter keeps its name in every shape
  const shapes = letterSets(ar)[1];
  assert.equal(shapes.items.length, 22 * 3 + 6);
  assert.deepEqual(shapes.items.filter((x) => x.letter.upper === 'ب').map((x) => x.glyph), ['بـ', 'ـبـ', 'ـب']);
  assert.deepEqual(shapes.items.filter((x) => x.letter.upper === 'د').map((x) => x.glyph), ['ـد']);
  assert.ok(shapes.items.every((x) => x.label === ar.alphabet.find((l) => l.upper === x.letter.upper).lower && x.glyph.includes('ـ')));
  assert.ok(!shapes.items.some((x) => x.letter.upper === 'ء'));
  for (const set of [u, a]) {
    const labels = set.items.map((x) => x.label);
    assert.equal(new Set(labels).size, labels.length);
  }
});

test('a round: different letters, four distinct options with the right one among them', () => {
  for (const lang of [uk, ja, ar]) {
    for (const set of letterSets(lang)) {
      for (let run = 0; run < 20; run++) {
        const qs = letterQuestions(set, 10);
        assert.equal(qs.length, 10);
        assert.equal(new Set(qs.map((q) => q.item)).size, 10, 'no letter twice in a round');
        for (const q of qs) {
          assert.ok(['read', 'find', 'hear'].includes(q.dir));
          if (q.dir === 'hear') assert.ok([...q.item.letter.ex[0]][0].toLowerCase() === q.item.letter.lower || [...q.item.letter.ex[0]][0] === q.item.letter.upper, 'by ear only when the word begins with the letter');
          assert.equal(q.options.length, 4);
          assert.equal(q.options.filter((o) => o === q.item).length, 1);
          assert.equal(new Set(q.options.map((o) => o.label)).size, 4, 'no reading twice');
          assert.equal(new Set(q.options.map((o) => o.glyph)).size, 4, 'no glyph twice');
          assert.ok(q.options.every((o) => set.items.includes(o)));
        }
      }
    }
  }
  // both directions come up, and wrong answers are close to the right one where they can be
  const [hira] = letterSets(ja);
  const many = Array.from({ length: 30 }, () => letterQuestions(hira, 10)).flat();
  assert.ok(many.some((q) => q.dir === 'read') && many.some((q) => q.dir === 'find') && many.some((q) => q.dir === 'hear'));
  assert.ok(!many.some((q) => q.dir === 'hear' && 'ぬらるれろをん'.includes(q.item.glyph)), 'not for kana no example word begins with');
  // sets without example words (the voiced kana, the joined shapes keep theirs) are never asked by ear unless the word fits
  const voiced = letterSets(ja).find((x) => x.id === 'voiced');
  assert.ok(!Array.from({ length: 10 }, () => letterQuestions(voiced, 10)).flat().some((q) => q.dir === 'hear'));
  const ka = many.filter((q) => q.item.label === 'ka');
  assert.ok(ka.length > 0);
  assert.ok(ka.every((q) => q.options.filter((o) => o !== q.item && (o.label[0] === 'k' || o.label.endsWith('a'))).length >= 2), 'two of か’s wrong answers share its row or its vowel');
  // お and を are the same sound: never both among the options
  assert.ok(!many.some((q) => q.options.some((o) => o.glyph === 'お') && q.options.some((o) => o.glyph === 'を')));
  // a fixed random source gives a fixed round
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const a = letterQuestions(hira, 5, rnd).map((q) => q.item.glyph + q.dir);
  seed = 7;
  assert.deepEqual(letterQuestions(hira, 5, rnd).map((q) => q.item.glyph + q.dir), a);
});

test('letters missed last time are asked again', () => {
  const [hira] = letterSets(ja);
  for (let run = 0; run < 20; run++) {
    const qs = letterQuestions(hira, 10, Math.random, ['ぬ', 'め', 'nope']);
    const glyphs = qs.map((q) => q.item.glyph);
    assert.equal(qs.length, 10);
    assert.equal(new Set(glyphs).size, 10);
    assert.ok(glyphs.includes('ぬ') && glyphs.includes('め'));
  }
  // more missed than a round holds: still one round
  assert.equal(letterQuestions(hira, 10, Math.random, hira.items.map((x) => x.glyph)).length, 10);
});

test('Japanese: the voiced kana are a set of their own, in both scripts', () => {
  const voiced = letterSets(ja).find((s) => s.id === 'voiced');
  assert.equal(voiced.items.length, 25);
  const of = (glyph) => voiced.items.find((x) => x.glyph === glyph)?.label;
  assert.equal(of('が ガ'), 'ga');
  assert.equal(of('じ ジ'), 'ji');
  assert.equal(of('ぢ ヂ'), 'ji (di)');
  assert.equal(of('づ ヅ'), 'zu (du)');
  assert.equal(of('ぽ ポ'), 'po');
  const labels = voiced.items.map((x) => x.label);
  assert.equal(new Set(labels).size, 25);
  assert.ok(voiced.items.every((x) => x.letter.hint && /^[ぁ-ん] [ァ-ヶ]$/.test(x.glyph)));
});

test('Japanese: katakana against hiragana, 46 pairs', () => {
  const match = letterSets(ja).find((s) => s.id === 'match');
  assert.equal(match.native, true);
  assert.equal(match.items.length, 46);
  assert.equal(match.asks.length, 2);
  assert.equal(match.items.find((x) => x.glyph === 'シ').label, 'し');
  assert.ok(match.items.every((x) => /^[ァ-ヶ]$/.test(x.glyph) && /^[ぁ-ん]$/.test(x.label)));
  assert.ok(letterSets(ja).filter((s) => s.id !== 'match').every((s) => s.native === false));
});

test('Japanese: the combined kana (きゃ, しゅ…) are a set too', () => {
  const set = letterSets(ja).find((s) => s.id === 'combined');
  assert.equal(set.items.length, 33);
  const of = (glyph) => set.items.find((x) => x.glyph === glyph)?.label;
  assert.equal(of('きゃ キャ'), 'kya');
  assert.equal(of('しゅ シュ'), 'shu');
  assert.equal(of('ちょ チョ'), 'cho');
  assert.equal(of('じゃ ジャ'), 'ja');
  assert.equal(of('りょ リョ'), 'ryo');
  assert.equal(new Set(set.items.map((x) => x.label)).size, 33);
  assert.ok(set.items.every((x) => /^[ぁ-ん]{2} [ァ-ヶ]{2}$/.test(x.glyph) && x.letter.hint));
});

test('Arabic: sun and moon letters — the fourteen, and how al- is said before each', async () => {
  const { sunMoonItems, consonantOf, withArticle } = await import('../js/views/sunquiz.js');
  assert.deepEqual(sunMoonItems(tr), []);
  assert.deepEqual(sunMoonItems(ja), []);
  const items = sunMoonItems(ar);
  assert.equal(items.length, 27, 'every letter but alif and hamza');
  const sun = items.filter((x) => x.sun).map((x) => x.glyph).sort().join('');
  assert.equal(sun, [...'تثدذرزسشصضطظلن'].sort().join(''));
  assert.equal(items.filter((x) => !x.sun).map((x) => x.glyph).sort().join(''), [...'بجحخعغفقكمهوي'].sort().join(''));
  const of = (g) => items.find((x) => x.glyph === g);
  assert.deepEqual(withArticle(of('ش')), { sun: 'ash-sh…', moon: 'al-sh…' });
  assert.deepEqual(withArticle(of('ق')), { sun: 'aq-q…', moon: 'al-q…' });
  assert.deepEqual(withArticle(of('ص')), { sun: 'aṣ-ṣ…', moon: 'al-ṣ…' });
  assert.deepEqual(withArticle(of('ع')), { sun: 'aʿ-ʿ…', moon: 'al-ʿ…' });
  assert.equal(consonantOf('thāʾ'), 'th');
  assert.equal(consonantOf('alif'), '');
  assert.equal(new Set(items.map((x) => x.tl)).size, items.length, 'no two letters share a Latin spelling');
});

test('Turkish vowel harmony: the endings follow the last vowel, on course words only', async () => {
  const { HARMONY_WORDS, lastVowel, pluralOf, questionOf, harmonyQuestions } = await import('../js/views/harmony.js');
  for (const [word, plural, q] of [['ev', 'evler', 'mi'], ['kitap', 'kitaplar', 'mı'], ['göz', 'gözler', 'mü'], ['okul', 'okullar', 'mu'], ['kız', 'kızlar', 'mı'],
    ['gün', 'günler', 'mü'], ['yol', 'yollar', 'mu'], ['köprü', 'köprüler', 'mü'], ['yıldız', 'yıldızlar', 'mı'], ['pencere', 'pencereler', 'mi'], ['yağmur', 'yağmurlar', 'mu'], ['güneş', 'güneşler', 'mi']]) {
    assert.equal(pluralOf(word), plural);
    assert.equal(questionOf(word), q, word);
  }
  assert.equal(lastVowel('ÇOCUK'), 'u');
  assert.equal(lastVowel('brr'), '');
  assert.equal(new Set(HARMONY_WORDS).size, HARMONY_WORDS.length);
  for (const w of HARMONY_WORDS) {
    assert.ok(tr.words.some((x) => x.tr === w), `${w} is a course word`);
    assert.ok(!/\s/.test(w) && lastVowel(w));
  }
  for (const bad of ['saat', 'hal', 'gol', 'kalp', 'rol', 'harf', 'alkol', 'dikkat', 'meşgul']) assert.ok(!HARMONY_WORDS.includes(bad), `${bad} does not follow the rule`);
  const qs = harmonyQuestions(tr, 10);
  assert.equal(qs.length, 10);
  assert.equal(new Set(qs.map((q) => q.word.id)).size, 10);
  for (const q of qs) {
    assert.equal(q.options.filter((o) => o === q.answer).length, 1);
    assert.equal(q.options.length, q.kind === 'plural' ? 2 : 4);
  }
  assert.ok(qs.some((q) => q.kind === 'plural') && qs.some((q) => q.kind === 'question'));
});

test('Ukrainian я, ю, є: two sounds or one, by where the letter stands', async () => {
  const { iotatedIn, iotatedQuestions } = await import('../js/views/iotated.js');
  for (const [word, two] of [['яблуко', true], ['Європа', true], ['юрист', true], ['знаєш', true], ['Англія', true], ['п’ять', true], ['м’ясо', true], ['сім’я', true], ['комп’ютер', true],
    ['дякую', false], ['десять', false], ['неділя', false], ['вулиця', false], ['кухня', false], ['місяць', false], ['синє', false], ['люди', false]]) {
    assert.equal(iotatedIn(word)?.two, two, word);
  }
  assert.equal(iotatedIn('молоко'), null);
  assert.equal(iotatedIn('дякую').at, 1, 'the first of them is the one asked about');
  assert.equal(iotatedIn('Європа').letter, 'є');
  for (let run = 0; run < 5; run++) {
    const qs = iotatedQuestions(uk, 10);
    assert.equal(qs.length, 10);
    assert.equal(qs.filter((q) => q.two).length, 5, 'half and half');
    assert.equal(new Set(qs.map((q) => q.word.id)).size, 10);
    for (const q of qs) {
      assert.ok(!/[\s-]/.test(q.word.tr) && !q.word.own);
      assert.ok('яює'.includes([...q.word.tr][q.at].toLowerCase()));
      assert.ok(q.why);
    }
  }
  assert.deepEqual(iotatedQuestions(tr, 10), []);
});
