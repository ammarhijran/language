import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyze as ukAnalyze, syllabify as ukSyllabify, transliterate } from '../js/languages/uk/phonetics.js';
import uk from '../js/languages/uk/index.js';
import { romaji, morae, analyzeKana } from '../js/languages/ja/kana.js';
import ja from '../js/languages/ja/index.js';
import { analyzeTranslit, asciiTranslit } from '../js/languages/ar/translit.js';
import ar from '../js/languages/ar/index.js';
import { scoreSpoken } from '../js/compare.js';

// ---- Ukrainian ----
test('uk: syllables, stress and soft sounds', () => {
  assert.deepEqual(ukSyllabify('дякую'), ['дя', 'ку', 'ю']);
  assert.deepEqual(ukSyllabify('сестра'), ['сес', 'тра']);
  assert.deepEqual(ukSyllabify('кімната'), ['кім', 'на', 'та']);
  assert.deepEqual(ukSyllabify('добрий'), ['до', 'брий']);
  assert.equal(ukAnalyze('дякую', 1).ipa, 'ˈdʲa.ku.ju');
  assert.equal(ukAnalyze('привіт', 2).respell, 'prih-VEET');
  assert.equal(ukAnalyze('вовк').ipa, 'ʋɔwk', 'в after a vowel before a consonant is [w]');
  assert.equal(ukAnalyze('дев’ять', 1).respell, 'DEH-vyat', 'apostrophe: separate y, no w');
  assert.equal(ukAnalyze('до побачення', [0, 2]).respell, 'doh poh-BAH-chehn-nya');
});

test('uk: transliteration and typing', () => {
  assert.equal(transliterate('Київ'), 'kyiv');
  assert.equal(transliterate('дякую'), 'diakuiu');
  assert.equal(transliterate('дякую', { easy: true }), 'dyakuyu');
  const w = uk.byId('дякую');
  for (const typed of ['дякую', 'Дякую', 'diakuiu', 'dyakuyu']) {
    assert.ok(uk.acceptedAnswers(w).some((a) => uk.normalize(a) === uk.normalize(typed)), typed);
  }
  assert.equal(uk.normalize('П’ять'), uk.normalize("п'ять"));
});

// ---- Japanese ----
test('ja: morae and rōmaji', () => {
  assert.deepEqual(morae('きょうしつ'), ['きょ', 'う', 'し', 'つ']);
  assert.equal(romaji('ありがとう'), 'arigatō');
  assert.equal(romaji('ありがとう', 'wapuro'), 'arigatou');
  assert.equal(romaji('きって'), 'kitte');
  assert.equal(romaji('まっちゃ'), 'matcha');
  assert.equal(romaji('コーヒー'), 'kōhī');
  assert.equal(romaji('きんようび'), "kin'yōbi");
  assert.equal(romaji('おはよう ございます'), 'ohayō gozaimasu');
  assert.equal(analyzeKana('さんぽ')[0].map((m) => m.ipa).join(''), 'sampo', 'ん before p is m');
});

test('ja: answers in kanji, kana or rōmaji', () => {
  const w = ja.words.find((x) => x.tr === '東京');
  const rate = (typed) => {
    const acc = ja.acceptedAnswers(w);
    if (acc.some((a) => ja.normalize(a) === ja.normalize(typed))) return 'good';
    if (acc.some((a) => ja.stripDiacritics(a) === ja.stripDiacritics(typed))) return 'close';
    return 'wrong';
  };
  for (const t of ['東京', 'とうきょう', 'トウキョウ', 'tōkyō', 'toukyou']) assert.equal(rate(t), 'good', t);
  assert.equal(rate('tokyo'), 'close');
  assert.equal(rate('kyoto'), 'wrong');
  assert.equal(ja.reading(w), 'とうきょう · tōkyō');
});

test('ja: spoken answers match kanji or kana', () => {
  const w = ja.words.find((x) => x.tr === '水');
  const best = (heard) => Math.max(...ja.spokenTargets(w).map((t) => scoreSpoken(t, [{ transcript: heard }], ja).score));
  assert.equal(best('水'), 1);
  assert.equal(best('みず'), 1);
  assert.equal(best('ミズ'), 1);
  const two = ja.words.find((x) => x.n === 2);
  assert.equal(scoreSpoken(two.tr, [{ transcript: '2' }], ja).score, 1, 'digits from the recogniser');
});

// ---- Arabic ----
test('ar: syllables and MSA stress from transliteration', () => {
  const s = (tl) => analyzeTranslit(tl).respell;
  assert.equal(s('marḥaban'), 'MAR-ha-ban');
  assert.equal(s('kitāb'), 'ki-TAAB');
  assert.equal(s('madrasa'), 'MAD-ra-sa');
  assert.equal(s('mustashfā'), 'mus-TASH-faa');
  assert.equal(s('ṣaydaliyya'), 'say-da-LIY-ya');
  assert.equal(analyzeTranslit('shukran').ipa, 'ˈʃuk.ran');
  assert.equal(asciiTranslit('ṣabāḥ al-khayr'), 'sabah al-khayr');
});

test('ar: vowel marks are optional when matching', () => {
  assert.equal(ar.normalize('مَرْحَبًا'), ar.normalize('مرحبا'));
  assert.equal(ar.normalize('أَهْلًا'), ar.normalize('اهلا'));
  const w = ar.words.find((x) => x.tl === 'shukran');
  for (const t of ['شكرا', 'شُكْرًا', 'shukran']) {
    assert.ok(ar.acceptedAnswers(w).some((a) => ar.normalize(a) === ar.normalize(t)), t);
  }
  assert.equal(scoreSpoken(w.tr, [{ transcript: 'شكرا' }], ar).score, 1);
  const five = ar.words.find((x) => x.n === 5);
  assert.equal(scoreSpoken(five.tr, [{ transcript: '٥' }], ar).score, 1, 'Arabic-Indic digits');
  assert.equal(ar.dir, 'rtl');
});
