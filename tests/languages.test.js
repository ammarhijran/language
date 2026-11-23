import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyze as ukAnalyze, syllabify as ukSyllabify, transliterate } from '../js/languages/uk/phonetics.js';
import uk from '../js/languages/uk/index.js';
import { romaji, morae, analyzeKana } from '../js/languages/ja/kana.js';
import ja from '../js/languages/ja/index.js';
import { analyzeTranslit, asciiTranslit, tokenize, syllabify as arSyllabify } from '../js/languages/ar/translit.js';
import ar from '../js/languages/ar/index.js';
import tr from '../js/languages/tr/index.js';
import { lower as trLower } from '../js/languages/tr/phonetics.js';
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

test('uk: word-initial в before a consonant is a short w', () => {
  assert.equal(ukAnalyze('вчора', 1).respell, 'WCHOH-rah');
  assert.equal(ukAnalyze('вчора', 1).ipa, 'ˈwt͡ʃɔ.rɑ');
  assert.equal(ukAnalyze('вчитель', 1).respell, 'WCHIH-tehl');
  assert.equal(ukAnalyze('в', 0).ipa, 'w', 'the preposition в on its own');
  // Before a vowel, or after a consonant, в stays [ʋ].
  assert.equal(ukAnalyze('вода', 2).respell, 'voh-DAH');
  assert.equal(ukAnalyze('твій').ipa, 'tʋij');
  assert.equal(ukAnalyze('вовк').ipa, 'ʋɔwk');
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

test('ar: the article and other proclitics are never stressed', () => {
  const s = (tl) => analyzeTranslit(tl).respell;
  assert.equal(s('al-ʾaḥad'), "al-'A-had");
  assert.equal(analyzeTranslit('al-ʾaḥad').ipa, 'alˈʔa.ħad');
  assert.equal(s('al-walad'), 'al-WA-lad');
  assert.equal(s('al-qamar'), 'al-QA-mar');
  assert.equal(s('bi-qalam'), 'bi-QA-lam');
  assert.equal(s('wa-lā'), 'wa-LAA');
  assert.equal(s('wa-l-walad'), 'wal-WA-lad');
  // Where the regular rule already lands on the stem, nothing changes.
  assert.equal(s('al-jumuʿa'), "al-JU-mu-'a");
  assert.equal(s('al-yawm'), 'al-YAWM');
  assert.equal(s('ʾahlan wa-sahlan'), 'AH-lan wa-SAH-lan');
  assert.equal(s('ʿabd-allāh'), "'ab-dal-LAAH", 'a hyphenated compound is not a proclitic');
  assert.equal(analyzeTranslit('al-ʾaḥad', 1).respell, "AL-'a-had", 'an explicit override still wins');
  // No word in the pack is stressed on its article or proclitic (always its first syllable).
  for (const w of ar.words) {
    for (const x of ar.analyze(w).words) {
      if (!/^(?:wa|fa|bi|li|ka|a[a-zṣḍṭẓ]{1,2})-/.test(x.text)) continue;
      // A first syllable that also holds stem sounds may carry the stress: bi-smi is BIS-mi
      // (hamzat al-waṣl), but al-, wal-, bi- on their own never do.
      const procLen = x.text.split('-').slice(0, -1).join('').length;
      if (x.syllables[0].text.replace(/-/g, '').length > procLen) continue;
      assert.ok(x.stressIndex > 0, `${w.tl}: ${x.text}`);
    }
  }
});

const isArVowel = (t) => /^[aiueoāīūēō]$/.test(t);

test('ar: Modern Standard forms and elision in the pack', () => {
  const ticket = ar.words.find((x) => x.en === 'ticket');
  assert.equal(ticket.tr, 'تَذْكِرَة', 'MSA tadhkira has a kasra on the kāf');
  assert.equal(ar.analyze(ticket).respell, 'TADH-ki-ra');
  for (const t of ['تذكرة', 'tadhkira', 'tazkara']) {
    assert.ok(ar.acceptedAnswers(ticket).some((a) => ar.normalize(a) === ar.normalize(t)), t);
  }
  const bye = ar.words.find((x) => x.en === 'goodbye');
  assert.equal(ar.analyze(bye).ipa, 'ma.ʕas.saˈlaː.ma', 'the article’s a is silent after maʿa');
  for (const t of ['maʿa-s-salāma', 'maʿa as-salāma', 'maa as-salama']) {
    assert.ok(ar.acceptedAnswers(bye).some((a) => ar.normalize(a) === ar.normalize(t)), t);
  }
  for (const w of [...ar.words, ...ar.words.filter((x) => x.example?.tl).map((x) => x.example)]) {
    const parts = w.tl.split(/\s+/);
    // After a vowel-final word the article loses its a (hamzat al-waṣl): write maʿa-s-salāma.
    for (let i = 1; i < parts.length; i++) {
      assert.ok(!(/[aiuāīū]$/.test(parts[i - 1]) && /^a(?:l|th|dh|sh|[tdrzsnṣḍṭẓ])-/.test(parts[i])), `${w.tl}: elide the article’s a`);
    }
    // MSA syllables never start with two consonants (a sign of a stray space, as in "maʿa s-salāma").
    // Egyptian Arabic only adds consonant + w/y onsets (kwayyis, shwayya); anything else is still an error.
    for (const word of parts) {
      for (const syl of arSyllabify(tokenize(word))) {
        const v = syl.findIndex(isArVowel);
        const egyptianGlide = w.dialect === 'Egyptian' && v === 2 && /^[wy]$/.test(syl[1]);
        assert.ok(v <= 1 || egyptianGlide, `${w.tl}: ${syl.join('')}`);
      }
    }
  }
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

// ---- Ear training: every minimal pair differs in exactly one sound ----

/** Edit distance between two sequences of sounds. */
function soundDistance(a, b) {
  let row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    for (let j = 1; j <= b.length; j++) {
      next[j] = Math.min(row[j] + 1, next[j - 1] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    row = next;
  }
  return row[b.length];
}

/** IPA → sounds: tied affricates (t͡s) and modifiers (ʲ, ˤ, ː) stay with their base. */
const ipaSounds = (ipa) => ipa.replace(/[ˈˌ.\s]/g, '').match(/.\u0361.[ʲˤː]*|\P{M}\p{M}*[ʲˤː]*/gu) ?? [];

// Vowelled Arabic → sounds, just enough for the minimal pairs: consonants,
// short vowels from the marks, long vowels from ا/ي/و after a matching mark, shadda.
const AR_CONS = {
  ء: 'ʔ', أ: 'ʔ', إ: 'ʔ', ؤ: 'ʔ', ئ: 'ʔ', ب: 'b', ت: 't', ث: 'θ', ج: 'dʒ', ح: 'ħ', خ: 'x', د: 'd', ذ: 'ð',
  ر: 'r', ز: 'z', س: 's', ش: 'ʃ', ص: 'sˤ', ض: 'dˤ', ط: 'tˤ', ظ: 'ðˤ', ع: 'ʕ', غ: 'ɣ', ف: 'f', ق: 'q',
  ك: 'k', ل: 'l', م: 'm', ن: 'n', ه: 'h', و: 'w', ي: 'j', ة: 't',
};
const AR_VOWEL = { '\u064E': 'a', '\u0650': 'i', '\u064F': 'u' }; // fatha, kasra, damma
const AR_LONG = { ا: 'a', ي: 'i', و: 'u' };
const isVowelSound = (s) => /^[aiu]ː?$/.test(s);
function arabicSounds(word) {
  const out = [];
  const chars = [...word];
  chars.forEach((ch, i) => {
    const marked = /[\u064B-\u0652]/.test(chars[i + 1] ?? '');
    if (AR_VOWEL[ch]) out.push(AR_VOWEL[ch]);
    else if (ch === '\u0651') {
      // Shadda doubles the consonant it sits on (it may come before or after the vowel mark).
      const k = out.findLastIndex((s) => !isVowelSound(s));
      out.splice(k + 1, 0, out[k]);
    } else if (AR_LONG[ch] && out.at(-1) === AR_LONG[ch] && !marked) out[out.length - 1] += 'ː';
    else if (AR_CONS[ch]) out.push(AR_CONS[ch]);
  });
  return out;
}

const PAIR_SOUNDS = {
  tr: (w) => [...trLower(w)], // Turkish spelling is phonemic: one letter, one sound
  uk: (w) => ipaSounds(ukAnalyze(w).ipa),
  ja: (w) => ipaSounds(analyzeKana(w).flat().map((m) => m.ipa).join('')),
  ar: arabicSounds,
};

test('every ear-training pair differs in exactly one sound', () => {
  assert.deepEqual(arabicSounds('دَرَّسَ'), ['d', 'a', 'r', 'r', 'a', 's', 'a']);
  assert.deepEqual(arabicSounds('جَمَال'), ['dʒ', 'a', 'm', 'aː', 'l']);
  assert.deepEqual(arabicSounds('سَيْف'), ['s', 'a', 'j', 'f']);
  assert.equal(soundDistance(PAIR_SOUNDS.tr('durum'), PAIR_SOUNDS.tr('dürüm')), 2, 'the old u/ü pair');
  assert.equal(soundDistance(PAIR_SOUNDS.ja('ここ'), PAIR_SOUNDS.ja('こうこう')), 2, 'the old length pair');
  for (const [code, lang] of Object.entries({ tr, uk, ja, ar })) {
    for (const g of lang.minimalPairs) {
      for (const [a, , b] of g.pairs) {
        assert.notEqual(a, b, `${code} ${g.contrast}`);
        // Pitch-accent pairs (雨 / 飴) are written in kanji and share their sounds by design.
        if (/pitch/.test(g.contrast)) continue;
        const d = soundDistance(PAIR_SOUNDS[code](a), PAIR_SOUNDS[code](b));
        assert.equal(d, 1, `${code} ${g.contrast}: ${a} / ${b} differ in ${d} sounds`);
      }
    }
  }
});

test('ar: Egyptian entries use Cairene stress, MSA keeps MSA stress', () => {
  const eg = (tl) => analyzeTranslit(tl, undefined, 'Egyptian').respell;
  assert.equal(eg('shanṭiti'), 'shan-TI-ti');
  assert.equal(eg('mushkila'), 'mush-KI-la');
  assert.equal(eg('madrasa'), 'mad-RA-sa');
  assert.equal(eg('katabit'), 'KA-ta-bit');
  assert.equal(eg('maʿlēsh'), "ma'-LAYSH");
  assert.equal(analyzeTranslit('madrasa').respell, 'MAD-ra-sa', 'MSA');
  const maalesh = ar.words.find((w) => w.tl === 'maʿlēsh');
  assert.equal(ar.analyze(maalesh).respell, "ma'-LAYSH", 'dialect entries are analysed as Egyptian');
});

test('ar: Arabizi numbers count in typed transliteration', () => {
  const w = ar.words.find((x) => x.tl === 'maʿlēsh');
  for (const t of ['ma3lesh', 'maalesh', 'maʿlēsh']) {
    assert.ok(ar.acceptedAnswers(w).some((a) => ar.normalize(a) === ar.normalize(t)), t);
  }
  assert.equal(ar.normalize('7abibi'), ar.normalize('ḥabibi'));
  assert.equal(ar.normalize('٣ كيلو'), '٣كيلو', 'Arabic-script input is left alone');
});

test('fast lowercase/uppercase match the locale-aware versions on every pack string', () => {
  const strings = (L) => L.words.flatMap((w) => [w.tr, w.en, ...(w.alt || []), ...(w.ex || []), w.pair?.tr || ''])
    .concat(L.alphabet.flatMap((a) => [a.upper || '', a.lower || '']));
  for (const s of strings(tr).concat(['IĞDIR', 'İSTANBUL', 'Iİıi', 'İ'])) {
    assert.equal(trLower(s), s.toLocaleLowerCase('tr-TR'), s);
  }
  for (const s of strings(uk)) assert.equal(s.toLowerCase(), s.toLocaleLowerCase('uk-UA'), s);
});

test('reading aids: prompts can hide rōmaji or the transliteration, fullReading never does', () => {
  const mizu = ja.words.find((w) => w.tr === '水');
  const kana = ja.words.find((w) => w.tr === 'ありがとう');
  const shukran = ar.words.find((w) => w.tl === 'shukran');
  try {
    assert.equal(ja.reading(mizu), 'みず · mizu');
    ja.readingAid = 'script';
    assert.equal(ja.reading(mizu), 'みず');
    assert.equal(ja.reading(kana), null, 'a kana word has nothing left to show');
    assert.equal(ja.fullReading(mizu), 'みず · mizu');
    ja.readingAid = 'off';
    assert.equal(ja.reading(mizu), null);
    ar.readingAid = 'off';
    assert.equal(ar.reading(shukran), null);
    assert.equal(ar.fullReading(shukran), 'shukran');
    assert.ok(ja.matches(mizu, 'mizu') && ar.matches(shukran, 'shukran'), 'search still finds romanisations');
  } finally { ja.readingAid = 'full'; ar.readingAid = 'full'; }
});

test('Arabic: every rule-placed stress comes with the rule that placed it', () => {
  const why = (tl, dialect) => analyzeTranslit(tl, undefined, dialect).words[0].stressWhy;
  assert.equal(why('kitāb'), 'final'); // ki-TĀB: long vowel + consonant
  assert.equal(why('shukran'), 'penult'); // SHUK-ran: closed syllable
  assert.equal(why('qāmūs'), 'final');
  assert.equal(why('ʾāsif'), 'penult'); // ʾĀ-sif: long vowel
  assert.equal(why('shajara'), 'antepenult'); // SHA-ja-ra
  assert.equal(why('walad'), 'two'); // WA-lad
  assert.equal(why('al-ʾaḥad'), 'clitic'); // al-ʾA-ḥad: the article is never stressed
  assert.equal(why('madrasa'), 'antepenult'); // MAD-ra-sa in Standard Arabic…
  assert.equal(why('madrasa', 'Egyptian'), 'cairo-penult'); // …mad-RA-sa in Egyptian
  assert.equal(why('katabit', 'Egyptian'), 'cairo-antepenult'); // KA-ta-bit
  assert.equal(why('lā'), null, 'one syllable: nothing to explain');
  // A stress the entry marks itself is not explained by a rule.
  assert.equal(analyzeTranslit('shajara', 2).words[0].stressWhy, null);
  // Every word the stress question can ask about has its sentence.
  const pack = ar;
  let asked = 0;
  for (const w of pack.words) {
    if (/\s/.test(w.tr.trim())) continue;
    const a = pack.analyze(w);
    if (a.words.length !== 1 || a.words[0].stressIndex < 0) continue;
    asked++;
    const note = pack.stressNote(w);
    assert.ok(typeof note === 'string' && note.length > 30, `${w.tl}: ${note}`);
    if (w.dialect !== 'Egyptian') assert.doesNotMatch(note, /Egyptian stress/, w.tl);
  }
  assert.ok(asked >= 600);
});
