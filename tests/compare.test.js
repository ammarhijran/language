import { test } from 'node:test';
import assert from 'node:assert/strict';
import { levenshtein, similarity, alignDiff, scoreSpoken, scoreWord, checkTyped, glosses, overlaps, sameMeaning, OTHER_WORD_CAP } from '../js/compare.js';
import tr, { normalize, stripDiacritics, numberToWords, normalizeSpoken } from '../js/languages/tr/index.js';
import uk from '../js/languages/uk/index.js';
import ja from '../js/languages/ja/index.js';
import ar from '../js/languages/ar/index.js';
import { speakRating } from '../js/exercises.js';
import { AGAIN, HARD, GOOD } from '../js/srs.js';

test('levenshtein and similarity', () => {
  assert.equal(levenshtein('kitten', 'sitting'), 3);
  assert.equal(levenshtein('', 'abc'), 3);
  assert.equal(similarity('merhaba', 'merhaba'), 1);
  assert.ok(similarity('kır', 'kir') < 1);
});

test('alignDiff marks mismatched target letters', () => {
  const d = alignDiff('kız', 'kiz');
  assert.deepEqual(d.map((x) => x.ok), [true, false, true]);
  const missing = alignDiff('elli', 'eli');
  assert.equal(missing.filter((x) => !x.ok).length, 1);
});

test('Turkish normalisation', () => {
  assert.equal(normalize('  İyi Akşamlar! '), 'iyi akşamlar');
  assert.equal(normalize('ILIK'), 'ılık');
  assert.equal(normalize("Türkiye'de"), 'türkiyede');
  assert.equal(stripDiacritics('Teşekkür ederim'), 'tesekkur ederim');
});

test('numbers to words', () => {
  assert.equal(numberToWords(0), 'sıfır');
  assert.equal(numberToWords(2), 'iki');
  assert.equal(numberToWords(25), 'yirmi beş');
  assert.equal(numberToWords(100), 'yüz');
  assert.equal(numberToWords(1000), 'bin');
  assert.equal(numberToWords(2026), 'iki bin yirmi altı');
  assert.equal(numberToWords(1000000), 'bir milyon');
  assert.equal(normalizeSpoken('20'), 'yirmi');
  assert.equal(normalizeSpoken('1.000'), 'bin');
});

test('scoreSpoken', () => {
  const perfect = scoreSpoken('merhaba', [{ transcript: 'Merhaba' }], tr);
  assert.equal(perfect.score, 1);
  const digits = scoreSpoken('yirmi', [{ transcript: '20' }], tr);
  assert.equal(digits.score, 1);
  const close = scoreSpoken('teşekkürler', [{ transcript: 'teşekkür' }], tr);
  assert.ok(close.score > 0.6 && close.score < 1);
  const embedded = scoreSpoken('çay', [{ transcript: 'bir çay' }], tr);
  assert.equal(embedded.score, 1);
  const alt = scoreSpoken('kız', [{ transcript: 'kiz' }, { transcript: 'kız' }], tr);
  assert.ok(alt.score > 0.9 && alt.score < 1, 'later alternatives are slightly penalised');
  const none = scoreSpoken('kız', [], tr);
  assert.equal(none.score, 0);
});

test('scoreSpoken keeps the transcript even when nothing matches', () => {
  const r = scoreSpoken('kız', [{ transcript: 'araba' }], tr);
  assert.equal(r.score, 0);
  assert.equal(r.raw, 'araba');
});

// ---------- Word-aware speech scores ----------

const P = { tr, uk, ja, ar };
const entry = (L, text) => {
  const w = L.words.find((x) => x.tr === text || x.id === L.normalize(text).replace(/\s+/g, '-'));
  assert.ok(w, `${L.code}: ${text} is in the course`);
  return w;
};
const spoken = (code, target, heard) => scoreWord(P[code], entry(P[code], target), [{ transcript: heard }]);

test('speech: another word of the course, or the opposite meaning, is never “correct”', () => {
  const cases = [
    ['tr', 'anlamıyorum', 'anlıyorum', 'negation'], // I understand for I don't
    ['tr', 'bilmiyorum', 'biliyorum', 'negation'],
    ['tr', 'yarın', 'yakın', 'other'], // near for tomorrow
    ['tr', 'hafta', 'hasta', 'other'],
    ['tr', 'iki', 'iyi', 'other'],
    ['tr', 'iyi', 'iyi değil', 'negation'],
    ['uk', 'так', 'там', 'other'],
    ['uk', 'рука', 'ручка', 'other'],
    ['ja', 'お母さん', 'お父さん', 'other'],
    ['ja', 'うん', 'ううん', 'other'],
    ['ja', '分かりません', '分かります', 'negation'],
    ['ja', '目', '手', 'other'],
    ['ar', 'أَرْبَعَة', 'سبعة', 'other'], // seven for four
    ['ar', 'مِفْتَاح', 'مفتوح', 'other'],
    // A long vowel, ʾ or ʿ makes another word: rain/airport, water/what, tea/thing.
    ['ar', 'مَطَر', 'مطار', 'other'],
    ['ar', 'مَاء', 'ما', 'other'],
    ['ar', 'شَاي', 'شيء', 'other'],
    ['ar', 'مَنْ', 'معا', 'other'],
  ];
  for (const [code, target, heard, match] of cases) {
    const r = spoken(code, target, heard);
    assert.ok(r.score <= OTHER_WORD_CAP, `${code} ${target} ← ${heard}: ${r.score}`);
    assert.equal(r.match, match, `${code} ${target} ← ${heard}`);
    assert.equal(speakRating(r.score), AGAIN);
    assert.equal(r.raw, heard, 'the transcript is shown');
  }
  // The note names the other word.
  assert.equal(spoken('uk', 'так', 'там').other.tr, 'там');
  assert.equal(spoken('ar', 'أَرْبَعَة', 'سبعة').other.en, 'seven');
});

test('speech: a mispronounced right word keeps honest partial credit', () => {
  const close = spoken('tr', 'teşekkürler', 'teşekkür');
  assert.ok(close.score > 0.6 && close.score < 0.85, `${close.score}`);
  assert.equal(close.match, 'letters');
  const near = spoken('uk', 'привіт', 'привід');
  assert.ok(near.score >= 0.8 && near.score < 1, `${near.score}`);
  // The right word inside a longer transcript still counts fully.
  assert.equal(spoken('tr', 'çay', 'bir çay').score, 1);
  // The recogniser's later guesses can still find the right word.
  const r = scoreWord(tr, entry(tr, 'anlamıyorum'), [{ transcript: 'anlıyorum' }, { transcript: 'anlamıyorum' }]);
  assert.ok(r.score > 0.9 && r.match === 'exact', `${r.score} ${r.match}`);
});

test('speech: valid written forms count — alt spellings, homophones, kanji, â/î/û, Egyptian spellings', () => {
  const full = [
    ['tr', 'hâlâ', 'hala'], ['tr', 'dükkân', 'dükkan'], ['tr', 'lokanta', 'restoran'], ['tr', 'abi', 'ağabey'], ['tr', 'baş', 'kafa'],
    ['uk', 'вже', 'уже'], ['uk', 'все', 'усе'], ['uk', 'вдома', 'удома'], ['uk', 'вміти', 'уміти'],
    ['ja', 'たぶん', '多分'], ['ja', 'たくさん', '沢山'], ['ja', 'わかった', '分かった'], ['ja', 'お疲れ様です', 'お疲れさまです'],
    ['ja', '何', 'なん'], ['ja', '七', 'しち'], ['ja', '子供', '子ども'], ['ja', '友達', '友だち'], ['ja', 'かわいい', '可愛い'],
    ['ja', 'できる', '出来る'], ['ja', 'まっすぐ', '真っ直ぐ'],
    ['ar', 'مِائَة', 'مئة'], ['ar', 'لَا يَزَالُ', 'ما زال'], ['ar', 'أَوِي', 'اوي'], ['ar', 'كِدَه', 'كدا'], ['ar', 'دِلْوَقْتِي', 'دلوأتي'],
  ];
  for (const [code, target, heard] of full) assert.equal(spoken(code, target, heard).score, 1, `${code} ${target} ← ${heard}`);
  // The same sound written as a different word: just under full marks, “same sound”.
  for (const [code, target, heard] of [['ja', '鼻', '花'], ['ja', '木', '気'], ['ja', '目', '芽'], ['ja', '歯', '葉'], ['ja', '雨', '飴'], ['ja', '日本', '二本'], ['ar', 'أَوِي', 'قوي']]) {
    const r = spoken(code, target, heard);
    assert.equal(r.match, 'sound', `${code} ${target} ← ${heard}`);
    assert.ok(r.score >= 0.95 && speakRating(r.score) === GOOD, `${code} ${target} ← ${heard}: ${r.score}`);
  }
  // Turkish phrases: â read as a.
  assert.equal(spoken('tr', 'Kahvaltı dâhil mi?', 'kahvaltı dahil mi').score, 1);
  // Heard as another entry's other-register form (جِدًّا's Egyptian قَوِي): the note reads that form.
  const awi = spoken('ar', 'أَوِي', 'قوي');
  assert.ok(awi.pair && ar.reading(awi.other.pair) === 'ʾawi', `${awi.other?.tr} ${awi.pair}`);
});

test('speech: Arabic “same sound” means the same transliteration, long vowels, ʾ and ʿ included', () => {
  const forms = ar.words.flatMap((w) => [w, ...(w.pair ? [w.pair] : [])]).filter((e) => e.tl);
  for (const a of forms) {
    for (const b of forms) {
      if (a !== b && ar.sameSound(a, b)) assert.equal(a.tl.replace(/[\s\-.,!?؟]/g, ''), b.tl.replace(/[\s\-.,!?؟]/g, ''), `${a.tr} · ${b.tr}`);
    }
  }
});

test('speech: Japanese kanji the course doesn’t list are read back from its kana', () => {
  // 3+ beats: an unknown kanji stands for 1–3 kana when the kana around it match (0.9).
  const w = { ...entry(ja, 'お疲れ様です'), alt: [] };
  const r = scoreWord(ja, w, [{ transcript: 'お疲れ様です' }]);
  assert.equal(r.score, 1);
  const k = scoreWord(ja, { tr: 'ありがとうございます', kana: 'ありがとう ございます', en: 'thank you', id: 'test' }, [{ transcript: '有難うございます' }]);
  assert.ok(k.score >= 0.9 && k.match === 'sound', `${k.score} ${k.match}`);
  // But not for a one-beat word: 手 is not め.
  assert.notEqual(spoken('ja', '目', '手').match, 'sound');
  // More of the word in kanji still counts (行って来ます)…
  assert.ok(spoken('ja', '行ってきます', '行って来ます').score >= 0.9);
  // …but a kanji the word isn't written with is another word, however much kana matches.
  for (const [target, heard] of [['お母さん', 'お客さん'], ['お父さん', 'お客さん'], ['赤ちゃん', '坊ちゃん']]) {
    const r = spoken('ja', target, heard);
    assert.equal(r.match, 'other', `${target} ← ${heard}`);
    assert.equal(speakRating(r.score), AGAIN, `${target} ← ${heard}: ${r.score}`);
  }
  // No word of the course passes with its kanji swapped for one it isn't written with.
  for (const w of ja.words.filter((x) => /\p{Script=Han}/u.test(x.tr))) {
    const r = scoreWord(ja, w, [{ transcript: w.tr.replace(/\p{Script=Han}/gu, '鬱') }]);
    assert.ok(r.match !== 'sound' && r.score <= OTHER_WORD_CAP, `${w.tr}: ${r.score} ${r.match}`);
  }
});

test('speech ratings: GOOD from 85 %, HARD from 70 %', () => {
  assert.equal(speakRating(0.85), GOOD);
  assert.equal(speakRating(0.84), HARD);
  assert.equal(speakRating(0.7), HARD);
  assert.equal(speakRating(0.69), AGAIN);
  assert.equal(speakRating(OTHER_WORD_CAP), AGAIN);
});

// ---------- Typed answers ----------

const typed = (code, target, input) => checkTyped(P[code], entry(P[code], target), input);

test('typing: another word of the course is wrong, and says which word it is', () => {
  const cases = [
    ['ja', 'うん', 'ううん', 'ううん'], ['ja', 'いいえ', 'いえ', '家'], ['ja', 'いいえ', 'ie', '家'], ['ja', 'もう', 'も', 'も'],
    ['tr', 'su', 'şu', 'şu'], ['tr', 'şu', 'su', 'su'],
    ['ar', 'مَطَار', 'maṭar', 'مَطَر'], ['ar', 'غَدًا', 'غداء', 'غَدَاء'], ['ar', 'مَاء', 'ما', 'مَا'], ['ar', 'أَعْمَلُ', 'ʿamal', 'عَمَل'], ['ar', 'كَلْب', 'qalb', 'قَلْب'],
    ['uk', 'так', 'там', 'там'],
  ];
  for (const [code, target, input, other] of cases) {
    const r = typed(code, target, input);
    assert.equal(r.verdict, 'wrong', `${code} ${target} ← ${input}`);
    assert.equal(r.kind, 'other');
    assert.equal(r.other.tr, other);
  }
  // Ambiguous plain spellings of the target itself stay right (amal for ʾaʿmal).
  assert.equal(typed('ar', 'أَعْمَلُ', 'amal').verdict, 'good');
  // A form that is one entry's headword and another's plain spelling names the headword's entry.
  assert.equal(typed('tr', 'teyze', 'hala').other.tr, 'hala');
  assert.equal(spoken('tr', 'teyze', 'hala').other.tr, 'hala');
});

test('typing: the same meaning in another word or register is also right', () => {
  const cases = [
    ['ar', 'الْآن', 'دلوقتي'], ['ar', 'الْيَوْم', 'النهارده'], ['ar', 'أَيْنَ', 'فين'], ['ar', 'لِمَاذَا', 'ليه'], ['ar', 'نَعَم', 'أيوه'],
    ['tr', 'teşekkürler', 'sağ ol'], ['tr', 'bir şey değil', 'rica ederim'], ['uk', 'що', 'шо'],
  ];
  for (const [code, target, input] of cases) {
    const w = P[code].words.find((x) => P[code].normalize(x.tr) === P[code].normalize(target));
    const r = checkTyped(P[code], w, input);
    assert.equal(r.verdict, 'good', `${code} ${target} ← ${input}`);
    assert.equal(r.kind, 'also');
  }
  // A bracket that changes the meaning keeps them apart: hala is not teyze.
  assert.equal(typed('tr', 'hala', 'teyze').verdict, 'wrong');
});

test('typing: usual romanisations, spacing and a US capital I', () => {
  const good = [
    ['ar', 'مَرْحَبًا', 'marhaba'], ['ar', 'شَاي', 'shai'], ['ar', 'بَيْت', 'bait'], ['ar', 'بَيْت', 'beit'], ['ar', 'كَبِير', 'kabeer'],
    ['ar', 'سُوق', 'souq'], ['ar', 'أُرِيدُ', 'ureed'], ['ar', 'صَبَاحُ الْخَيْرِ', 'sabah al-khair'], ['ar', 'صَبَاحُ الْخَيْرِ', 'sabah el kheir'],
    ['ar', 'شُكْرًا', 'shokran'], ['ar', 'السَّلَامُ عَلَيْكُمْ', 'as-salamu alaikum'],
    ['uk', 'привіт', 'privit'], ['uk', 'говорити', 'hovoriti'], ['uk', 'говорити', 'govoryty'], ['uk', 'хліб', 'hlib'], ['uk', 'їсти', 'yisti'],
    ['uk', 'добрий день', 'dobriy den'], ['uk', 'день', "den'"], ['uk', 'сім’я', "sim'ia"],
    ['tr', 'istanbul', 'Istanbul'], ['tr', 'iyi', 'Iyi'],
    ['ja', '何', 'nan'], ['ja', '四', 'shi'], ['ja', 'ゼロ', 'rei'],
  ];
  for (const [code, target, input] of good) assert.equal(typed(code, target, input).verdict, 'good', `${code} ${target} ← ${input}`);
  const spaces = [['tr', 'hoşça kal', 'hoşçakal'], ['tr', 'bir şey değil', 'birşey değil'], ['tr', 'ne zaman', 'nezaman'],
    ['tr', 'her gün', 'hergün'], ['tr', 'teşekkür ederim', 'teşekkürederim'], ['uk', 'будь ласка', 'будьласка']];
  for (const [code, target, input] of spaces) {
    const r = typed(code, target, input);
    assert.deepEqual([r.verdict, r.kind, r.slip], ['almost', 'spaces', true], `${code} ${target} ← ${input}`);
  }
  // Special letters only: almost, and a slip (no ease penalty).
  assert.deepEqual(['verdict', 'kind', 'slip'].map((k) => typed('tr', 'teşekkür ederim', 'tesekkur ederim')[k]), ['almost', 'letters', true]);
  // Looser spellings are almost right, not right, and not a slip.
  for (const [code, target, input] of [['ar', 'سُوق', 'souk'], ['uk', 'сьогодні', 'siohodni']]) {
    const r = typed(code, target, input);
    assert.equal(r.verdict, 'almost', `${code} ${target} ← ${input}`);
    assert.ok(!r.slip);
  }
  assert.equal(typed('ja', '東京', 'kyoto').verdict, 'wrong');
});

// ---------- Glosses ----------

test('glosses: core meanings, overlaps and same meaning', () => {
  assert.deepEqual(glosses('sorry; excuse me (spoken)'), ['sorry', 'excuse me']);
  assert.deepEqual(glosses('to sit; to live'), ['sit', 'live']);
  assert.deepEqual(glosses('mate / sir'), ['mate', 'sir']);
  assert.deepEqual(glosses('For real?'), ['for real']);
  assert.ok(overlaps('sorry; excuse me (spoken)', 'sorry'));
  assert.ok(overlaps('he; she; it; that', 'that (nearby)'));
  assert.ok(overlaps('OK, done', 'OK; sure; fine'));
  assert.ok(!overlaps('water', 'that (nearby)'));
  // “!” between meanings splits them; “I'm sorry” is the same choice as “sorry”.
  assert.deepEqual(glosses('hey! hi! (matey)'), ['hey', 'hi']);
  assert.ok(overlaps('cool! great!', 'cool; fun; funny'));
  assert.ok(overlaps('excuse me; sorry', 'I’m sorry'));
  assert.ok(!overlaps('Watch out!', 'out'));
  assert.ok(sameMeaning('now', 'now'));
  assert.ok(sameMeaning('what', 'what (spoken)'));
  assert.ok(!sameMeaning("aunt (father's sister)", "aunt (mother's sister)"));
  assert.ok(!sameMeaning('still', 'more; yet; still'));
});
