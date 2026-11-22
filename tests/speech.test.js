// What the voice reads (lang.speech: say.js overrides, Arabic pausal forms,
// Egyptian voices, Japanese readings, chips, slow playback) and how a voice
// is chosen (ranking, region, never another language's voice), run against a
// fake browser speechSynthesis and SpeechRecognition.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// ---------- Fake browser speech (set up before speech.js loads) ----------

const utterances = [];
let voices = [];
const synthListeners = {};
globalThis.window = globalThis;
globalThis.speechSynthesis = {
  getVoices: () => voices,
  addEventListener: (type, fn) => { synthListeners[type] = fn; },
  // An utterance ends a tick later; a voice marked `fails` errors like an online voice offline.
  speak(u) { utterances.push(u); setTimeout(() => (u.voice?.fails ? u.onerror?.({ error: 'network' }) : u.onend?.()), 0); },
  cancel() {},
};
globalThis.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
const recognitions = [];
globalThis.SpeechRecognition = class {
  constructor() { recognitions.push(this); }
  start() { this.started = true; }
  stop() { this.stopped = true; setTimeout(() => this.onend?.(), 0); }
  abort() {}
};
const setNavigator = (value) => Object.defineProperty(globalThis, 'navigator', { configurable: true, value });
setNavigator({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130', onLine: true });

const speech = await import('../js/speech.js');
const { languages } = await import('../js/languages/index.js');
const { pauseBetweenWords } = await import('../js/languages/common.js');
const { alignReading, readAmbiguous, pausedJapanese } = await import('../js/languages/ja/kana.js');
const { spokenArabic, pausalWord, egyptianRespell, alignTranslit } = await import('../js/languages/ar/translit.js');
const { tr, uk, ja, ar } = languages;

const tick = (ms = 5) => new Promise((r) => setTimeout(r, ms));
const voice = (name, lang, extra = {}) => ({ name, lang, voiceURI: extra.voiceURI ?? name, localService: true, default: false, ...extra });
function useVoices(list) {
  voices = list;
  synthListeners.voiceschanged?.();
}
const lastUtterance = () => utterances.at(-1);

/** Every speakable entry-like object of a pack: words, pairs, examples, grammar examples. */
function speakables(L) {
  const out = [];
  for (const w of L.words) {
    out.push({ kind: 'word', id: w.id, e: w });
    if (w.pair) out.push({ kind: 'pair', id: w.id, e: w.pair });
    if (w.example) out.push({ kind: 'example', id: w.id, e: w.example });
  }
  for (const l of L.grammar || []) for (const s of l.sections) for (const ex of s.examples || []) out.push({ kind: 'grammar', id: l.id, e: ex });
  return out;
}

// ---------- lang.speech(): entries, strings and overrides ----------

test('speech(): an entry, its display string and a resolved { text, lang } all work', () => {
  for (const L of [tr, uk, ja, ar]) {
    const w = L.words[0];
    const sp = L.speech(w);
    assert.equal(typeof sp.text, 'string', L.code);
    assert.ok(sp.lang.startsWith(L.code), `${L.code}: ${sp.lang}`);
    assert.deepEqual(L.speech(w.tr), sp, `${L.code}: a display string is spoken like its entry`);
    assert.deepEqual(L.speech({ text: 'x' }), { lang: L.speechLang, text: 'x' });
    assert.equal(L.speech('not a word in the course').text, 'not a word in the course');
  }
  assert.deepEqual(tr.speech(tr.words.find((w) => w.tr === 'Merhaba') || 'Merhaba').lang, 'tr-TR');
});

test('speech(): a say override is what the voice reads, never what is shown', () => {
  const w = ja.byId('二人です');
  assert.equal(w.tr, '二人です。', 'the entry is still shown with kanji');
  assert.equal(w.say, 'ふたりです。');
  assert.equal(ja.speech(w).text, 'ふたりです。');
  assert.equal(ja.speech('二人です。').text, 'ふたりです。');
  // Example sentences and other-register forms carry their own override.
  assert.equal(ja.speech(ja.byId('十').example).text, '店は十時にあきます。');
  assert.equal(ja.speech(ja.byId('もう一度お願いします').pair).text, 'もういっかい言って。');
  // Grammar examples are keyed by their text.
  assert.equal(ja.speech('妹は二十歳です。').text, '妹ははたちです。');
});

test('say.js: every Japanese override still fits its entry (none left out as stale)', () => {
  assert.deepEqual(ja.staleSay, []);
  for (const { e } of speakables(ja)) {
    if (!e.say) continue;
    assert.ok(alignReading(e.say, e.kana), `${e.say} reads as ${e.kana}`);
    assert.notEqual(e.say, e.tr);
    // Only kana replace kanji: no new kanji, no Latin letters.
    for (const ch of e.say) if (/\p{Script=Han}/u.test(ch)) assert.ok(e.tr.includes(ch), `${e.say}: ${ch}`);
    assert.doesNotMatch(e.say, /\p{Script=Latin}/u);
  }
  for (const [text, said] of Object.entries(ja.saySentences)) {
    const ex = speakables(ja).find((x) => x.kind === 'grammar' && x.e.tr === text);
    assert.ok(ex, `grammar sentence still exists: ${text}`);
    assert.ok(alignReading(said, ex.e.kana), `${said} reads as ${ex.e.kana}`);
  }
});

test('say.js: an override that no longer fits its entry is ignored', async () => {
  const { makePack } = await import('../js/languages/common.js');
  const p = makePack({
    code: 'ja', name: 'Test', greeting: 'x', speechLang: 'ja-JP', categories: [], alphabet: [], normalize: (s) => s,
    vocab: [{ tr: '開く', kana: 'あく', en: 'open', cat: 'c', id: 'a' }],
    say: { a: 'しまる' }, sayFits: ja.sayFits,
  });
  assert.equal(p.byId('a').say, undefined);
  assert.deepEqual(p.staleSay, [{ tr: '開く', say: 'しまる' }]);
});

// ---------- Japanese ----------

test('ja: counters and two-reading kanji are read as the course teaches', () => {
  const cases = {
    '店は十時に開きます。': '店は十時にあきます。',
    'ドアが開いています。': 'ドアがあいています。',
    '冬は雪がたくさん降ります。': '冬は雪がたくさんふります。',
    'このカレーは辛くないです。': 'このカレーはからくないです。',
    '次の角を右に曲がってください。': '次のかどを右に曲がってください。',
    'すみません、十分ぐらい遅れます。': 'すみません、じゅっぷんぐらい遅れます。',
    'もう一回言って。': 'もういっかい言って。',
    '子供が二人います。': '子供がふたりいます。',
    '私の家族は四人です。': '私の家族はよにんです。',
    '会議は四時からです。': '会議はよじからです。',
    '授業は九時に始まります。': '授業はくじに始まります。',
    '今日は七時に帰ります。': '今日はしちじに帰ります。',
    '妹は二十歳です。': '妹ははたちです。',
    '今、何時ですか。': '今、なんじですか。',
    '何名様ですか。': 'なんめい様ですか。',
    '明日の朝、電話します。': 'あしたの朝、電話します。',
  };
  for (const [written, spoken] of Object.entries(cases)) assert.equal(ja.speech(written).text, spoken, written);
  // Only the ambiguous token changes: other kanji stay for the pitch accent.
  assert.equal(ja.speech(ja.byId('明日')).text, 'あした');
  assert.equal(ja.speech(ja.byId('雨')).text, '雨');
});

test('ja: text with a kana reading but no override (Read & Listen lines) gets the same reading', () => {
  assert.equal(ja.speech({ tr: '一人で来ました。', kana: 'ひとり で きました' }).text, 'ひとりで来ました。');
  assert.equal(readAmbiguous('窓を開けてください。', 'まど を あけて ください'), '窓を開けてください。', '開ける is never ひらける');
  assert.equal(readAmbiguous('開店は十時です。', 'かいてん は じゅうじ です'), '開店は十時です。', 'a different word is left alone');
  assert.equal(readAmbiguous('明日', 'あす'), '明日', 'a reading the voice gives anyway is left alone');
  assert.equal(readAmbiguous('明日は休み', 'まるで ちがう'), '明日は休み', 'a reading that does not fit changes nothing');
  assert.deepEqual(alignReading('お名前は何ですか。', 'おなまえ は なん です か').filter((r) => r.kind === 'kanji').map((r) => r.kana), ['なまえ', 'なん']);
});

test('ja: the reading is split between kanji at its word breaks when several splits fit', () => {
  const kanjiReadings = (t, k) => alignReading(t, k).filter((r) => r.kind === 'kanji').map((r) => r.kana);
  // Kanji runs either side of a comma, and a reading that repeats the particle after it.
  assert.deepEqual(kanjiReadings('先月、家族と京都へ旅行に行きました。', 'せんげつ かぞく と きょうと へ りょこう に いきました'),
    ['せんげつ', 'かぞく', 'きょうと', 'りょこう', 'い']);
  assert.deepEqual(kanjiReadings('母は台所にいます。', 'はは は だいどころ に います'), ['はは', 'だいどころ']);
  assert.deepEqual(kanjiReadings('このお店、雰囲気いいね。', 'この おみせ ふんいき いい ね'), ['みせ', 'ふんいき']);
  // A break inside a kanji run (さんねん まえ): the split with 1–3 kana per kanji wins.
  assert.deepEqual(kanjiReadings('三年前、彼から電話があった。', 'さんねん まえ かれ から でんわ が あった'), ['さんねんまえ', 'かれ', 'でんわ']);
  // So a comma no longer hides an ambiguous word, and pauses fall after the particles.
  assert.equal(ja.speech({ tr: '明日、時間がありますか。', kana: 'あした じかん が あります か' }).text, 'あした、時間がありますか。');
  assert.equal(ja.speech({ tr: '母は台所にいます。', kana: 'はは は だいどころ に います' }).slow, '母は、台所に、います。');
  assert.equal(ja.speech({ tr: '週末、友達と遊びました。', kana: 'しゅうまつ ともだち と あそびました' }).slow, '週末、友達と、遊びました。');
});

test('ja: every entry with a reading lines up with it, and is spoken in Japanese script only', () => {
  for (const { e } of speakables(ja)) {
    if (!e.kana) continue;
    assert.ok(alignReading(e.tr, e.kana), `${e.tr} / ${e.kana}`);
    // Latin only where the text itself has it (Wi-Fi), never rōmaji.
    const latin = (t) => (t.match(/\p{Script=Latin}+/gu) || []).join(' ');
    assert.equal(latin(ja.speech(e).text), latin(e.tr), e.tr);
  }
});

test('ja: 歯 is the word は (ha), not the particle', () => {
  const w = ja.words.find((x) => x.tr === '歯');
  const a = ja.analyze(w);
  assert.equal(a.respell, 'ha');
  assert.equal(a.ipa, 'ha');
  assert.ok(ja.acceptedAnswers(w).includes('ha'));
  assert.ok(!ja.acceptedAnswers(w).includes('wa'));
  // A particle は in a spaced reading is still wa.
  assert.equal(ja.analyze({ tr: 'これは', kana: 'これ は' }).respell, 'ko-re wa');
});

test('ja: a mora chip says what it sounds like', () => {
  const says = (tr) => ja.analyze(ja.words.find((w) => w.tr === tr)).words.flatMap((w) => w.syllables.map((s) => s.say));
  assert.deepEqual(says('こんにちは'), ['こ', 'こん', 'に', 'ち', 'わ'], 'particle は → わ, ん leans on its mora');
  assert.deepEqual(says('コーヒー'), ['コ', 'コー', 'ヒ', 'ヒー']);
  assert.deepEqual(says('切符'), ['き', 'きっぷ', 'ぷ']);
  assert.deepEqual(says('ありがとう'), ['あ', 'り', 'が', 'と', 'とう'], 'a lengthening う goes with its mora');
  // No chip anywhere is a lone っ, ー or ん.
  for (const w of ja.words) {
    for (const s of ja.analyze(w).words.flatMap((x) => x.syllables)) assert.doesNotMatch(s.say, /^[っッーんン]$/u, `${w.tr}: ${s.text}`);
  }
});

// ---------- Arabic ----------

const CASE_VOWEL_END = /[ً-ِ]ّ?[^\p{L}\p{M}]*$/u;
const AN_END = /ًّ?[اى][^\p{L}\p{M}]*$|[اى]ً[^\p{L}\p{M}]*$/u;
const tlEndsInConsonant = (tl) => /[^aiueoāīūēōn]$/.test(tl.trim().split(/\s+/).at(-1).replace(/[^\p{L}ʾʿ]+$/u, ''));

test('ar: the voice reads the pausal form the transliteration shows', () => {
  const cases = [
    ['لَا أَفْهَمُ', 'lā ʾafham', 'لَا أَفْهَمْ'],
    ['مِنْ فَضْلِكَ', 'min faḍlik', 'مِنْ فَضْلِكْ'],
    ['مَسَاءُ الْخَيْرِ', 'masāʾ al-khayr', 'مَسَاءْ الْخَيْرْ'],
    ['تُصْبِحُ عَلَى خَيْرٍ', 'tuṣbiḥ ʿalā khayr', 'تُصْبِحْ عَلَى خَيْرْ'],
    ['مَعَ السَّلَامَةِ', 'maʿa-s-salāma', 'مَعَ السَّلَامَةْ'],
    ['الْجَوُّ حَارٌّ جِدًّا الْيَوْمَ.', 'al-jaww ḥārr jiddan al-yawm', 'الْجَوّ حَارّ جِدًّا الْيَوْمْ.'],
    // Kept: the -an ending, and endings the transliteration shows.
    ['شُكْرًا جَزِيلًا', 'shukran jazīlan', 'شُكْرًا جَزِيلًا'],
    ['صَبَاحُ الْخَيْرِ يَا أُمِّي!', 'ṣabāḥu-l-khayri yā ʾummī', 'صَبَاحُ الْخَيْرِ يَا أُمِّي!'],
    ['عِنْدِي سُؤَالٌ وَاحِدٌ فَقَطْ.', 'ʿindī suʾālun wāḥidun faqaṭ', 'عِنْدِي سُؤَالٌ وَاحِدٌ فَقَطْ.'],
    ['دَرَسَ', 'darasa', 'دَرَسَ'],
  ];
  for (const [t, tl, want] of cases) assert.equal(spokenArabic(t, tl).text, want, `${t} (${tl})`);
  assert.equal(pausalWord('بِالْبِطَاقَةِ؟', 'bil-biṭāqa'), 'بِالْبِطَاقَةْ؟', 'punctuation stays');
  assert.deepEqual(alignTranslit('مَعَ السَّلَامَةِ', 'maʿa-s-salāma').pairs.map((p) => p.tl), ['maʿa', 's-salāma']);
});

test('ar: no entry is spoken with a final case vowel its transliteration leaves out, and what is shown is unchanged', () => {
  let checked = 0;
  for (const { e } of speakables(ar)) {
    if (!e.tl || !tlEndsInConsonant(e.tl)) continue;
    const words = (t) => t.split(/\s+/).filter((w) => /\p{Script=Arabic}/u.test(w));
    const shown = words(e.tr).at(-1);
    if (!CASE_VOWEL_END.test(shown) || AN_END.test(shown)) continue;
    checked++;
    const spoken = words(ar.speech(e).text).at(-1);
    assert.doesNotMatch(spoken, CASE_VOWEL_END, `${e.tr} (${e.tl}) → ${ar.speech(e).text}`);
  }
  assert.ok(checked > 200, `checked ${checked} texts`);
  const w = ar.words.find((x) => x.tr === 'لَا أَفْهَمُ');
  assert.equal(w.tr, 'لَا أَفْهَمُ', 'the display keeps its vowel marks');
});

test('ar: every text keeps its letters when spoken (only vowel marks change, plus the Egyptian respellings)', () => {
  const skeleton = (s) => ar.normalize(s);
  const egyptianSkeleton = (s) => skeleton(s.replace(/آ/g, 'ءا').replace(/[قءأإئؤ]/g, 'ء').replace(/[ذزد]/g, 'ز'));
  for (const { e } of speakables(ar)) {
    const sp = ar.speech(e);
    assert.equal(skeleton(sp.text), skeleton(e.tr), e.tr);
    if (sp.alt) assert.equal(egyptianSkeleton(sp.alt.text), egyptianSkeleton(e.tr), e.tr);
    assert.doesNotMatch(sp.text, /\p{Script=Latin}/u, 'never the transliteration');
  }
});

test('ar: Egyptian entries go to an Egyptian voice, respelled for a Standard Arabic one', () => {
  const awi = ar.speech(ar.words.find((w) => w.dialect === 'Egyptian' && w.tl === 'ʾawi') || { tr: 'قَوِي', tl: 'ʾawi', dialect: 'Egyptian' });
  assert.equal(awi.lang, 'ar-EG');
  assert.deepEqual(awi.regions, ['ar-EG']);
  assert.equal(awi.alt.lang, 'ar-SA');
  assert.equal(awi.alt.text, 'أَوِي');
  assert.equal(egyptianRespell('مَقْفُول', 'maʾfūl'), 'مَأْفُول');
  assert.equal(egyptianRespell('دِلْوَقْتِي', 'dilwaʾti'), 'دِلْوَأْتِي');
  assert.equal(egyptianRespell('تَذْكَرَة', 'tazkara'), 'تَزْكَرَة');
  assert.equal(egyptianRespell('قَهْوَة', 'qahwa'), 'قَهْوَة', 'a q in the transliteration stays ق');
  assert.equal(egyptianRespell('السُّوق', 'is-sūʾ'), 'السُّوء', 'hamza seats: on the line after a long vowel at the end');
  assert.equal(egyptianRespell('تِقُول', 'tiʾūl'), 'تِئُول');
  assert.equal(egyptianRespell('زَهْقَان', 'zahʾān'), 'زَهْآن');
  // The Egyptian voice gets ē/ō without the kasra/damma that would make it say ī/ū.
  assert.equal(ar.speech({ tr: 'فِين', tl: 'fēn', dialect: 'Egyptian' }).text, 'فين');
  // MSA entries stay with Standard Arabic voices.
  const msa = ar.speech(ar.words.find((w) => w.tr === 'مِنْ فَضْلِكَ'));
  assert.equal(msa.lang, 'ar-SA');
  assert.equal(msa.alt, undefined);
  // Every Egyptian text in the course is routed, its pair side and example too.
  for (const { e } of speakables(ar)) if (e.dialect === 'Egyptian') assert.equal(ar.speech(e).lang, 'ar-EG', e.tr);
  const lesson = ar.grammar.find((l) => l.id === 'msa-vs-egyptian');
  const egyptianExamples = lesson.sections.flatMap((s) => s.examples || []).filter((x) => /^Egyptian/.test(x.note || ''));
  assert.ok(egyptianExamples.length >= 7);
  for (const x of egyptianExamples) assert.equal(x.dialect, 'Egyptian', x.tr);
});

test('ar: a transliteration chip says its own word (pausal), the whole entry when they do not line up', () => {
  const w = ar.words.find((x) => x.tr === 'صَبَاحُ الْخَيْرِ');
  const a = ar.analyze(w);
  assert.equal(a.chipsSpeakable, false);
  assert.deepEqual(a.words.map((x) => ar.speech(x.syllables[0].say).text), ['صَبَاحْ', 'الْخَيْرْ']);
  const one = ar.analyze(ar.words.find((x) => x.tr === 'شُكْرًا'));
  assert.equal(one.words[0].syllables[0].say, undefined, 'a single word: the chip plays the entry');
});

// ---------- Turkish and Ukrainian chips ----------

test('tr/uk: every chip says something with a vowel (ğ-syllables and lone prepositions are fixed up)', () => {
  const say = (L, text) => L.analyze({ tr: text }).words.map((w) => w.syllables.map((s) => s.say ?? s.text));
  assert.deepEqual(say(tr, 'değil'), [['de', 'yil']]);
  assert.deepEqual(say(tr, 'soğuk'), [['so', 'uk']]);
  assert.deepEqual(say(tr, 'ağaç'), [['a', 'aç']]);
  assert.deepEqual(say(uk, 'Можна з собою?'), [['Мож', 'на'], ['з собою'], ['со', 'бо', 'ю']]);
  const VOWEL = { tr: /[aeıioöuüâîû]/u, uk: /[аеєиіїоуюя]/u };
  for (const L of [tr, uk]) {
    for (const w of L.words) {
      // Chat shorthand (slm nbr, tşk) has no vowel to say.
      for (const s of L.analyze(w).words.filter((x) => VOWEL[L.code].test(x.text.toLocaleLowerCase(L.code))).flatMap((x) => x.syllables)) {
        assert.match((s.say ?? s.text).toLocaleLowerCase(L.code), VOWEL[L.code], `${L.code} ${w.tr}: ${s.text}`);
        assert.doesNotMatch(s.say ?? s.text, /^[ğĞ]/u, `${w.tr}: ${s.text}`);
      }
    }
  }
});

// ---------- Slow playback ----------

test('slow: phrases get pauses between words, single words a gentler rate', () => {
  assert.equal(pauseBetweenWords('Merhaba, nasılsın?'), 'Merhaba, nasılsın?');
  assert.equal(pauseBetweenWords('bir şey değil'), 'bir, şey, değil');
  // A pause never splits a particle from its word.
  assert.equal(tr.speech('Hesabı alabilir miyiz?').slow, 'Hesabı, alabilir miyiz?');
  assert.equal(tr.speech('bir şey değil').slow, 'bir, şey değil');
  assert.equal(uk.speech('Я не їм м’яса.').slow, 'Я не їм, м’яса.');
  assert.equal(uk.speech('Мені, будь ласка, капучино без цукру.').slow, 'Мені, будь ласка, капучино, без цукру.');
  assert.equal(pauseBetweenWords('Я в шоці!'), null, 'one-letter words stay with the next word');
  assert.equal(pauseBetweenWords('Можна з собою?'), 'Можна, з собою?');
  assert.equal(pauseBetweenWords('merhaba'), null);
  // Japanese pauses between phrases of the kana reading, particles stay attached.
  assert.equal(pausedJapanese('店は十時にあきます。', 'みせ は じゅうじ に あきます'), '店は、十時に、あきます。');
  assert.equal(pausedJapanese('ドアがあいています。', 'ドア が あいて います'), 'ドアが、あいています。');
  assert.equal(ja.speech(ja.byId('十').example).slow, '店は、十時に、あきます。');
  // する stays with its noun, an auxiliary with its て-form.
  assert.equal(pausedJapanese('日本語を勉強しています。', 'にほんご を べんきょう して います'), '日本語を、勉強しています。');
  assert.equal(pausedJapanese('お願いします', 'おねがい します'), null);
  assert.equal(pausedJapanese('何をしていますか。', 'なに を して います か'), '何を、していますか。');
  assert.equal(pausedJapanese('これは何と書いてありますか。', 'これ は なん と かいて あります か'), 'これは、何と、書いてありますか。');
  // Arabic pauses between transliteration words; hyphen-joined words stay together.
  assert.equal(spokenArabic('مَعَ السَّلَامَةِ', 'maʿa-s-salāma').slow, null);
  assert.equal(spokenArabic('لَا أَفْهَمُ', 'lā ʾafham').slow, null, 'lā stays with its verb: one chunk');
  assert.equal(spokenArabic('مُمْكِن الْحِسَاب لَوْ سَمَحْت؟', 'mumkin il-ḥisāb law samaḥt').slow, 'مُمْكِن، الْحِسَاب، لَوْ سَمَحْت؟');
  // Rates: never below 0.5, phrases close to the normal speed.
  assert.equal(speech.slowRate(0.5), 0.5);
  assert.equal(speech.slowRate(0.9), 0.9 * 0.75);
  assert.equal(speech.phraseRate(1), 0.9);
});

// ---------- Choosing a voice ----------

const SAFARI_MAC_JA = [
  voice('Eddy (日本語（日本）)', 'ja-JP', { voiceURI: 'com.apple.eloquence.ja-JP.Eddy' }),
  voice('Flo (日本語（日本）)', 'ja-JP', { voiceURI: 'com.apple.eloquence.ja-JP.Flo' }),
  voice('Grandma (日本語（日本）)', 'ja-JP', { voiceURI: 'com.apple.eloquence.ja-JP.Grandma' }),
  voice('Hattori', 'ja-JP', { voiceURI: 'com.apple.voice.compact.ja-JP.Hattori' }),
  voice('Kyoko', 'ja-JP', { voiceURI: 'com.apple.voice.compact.ja-JP.Kyoko' }),
  voice('Kyoko (Enhanced)', 'ja-JP', { voiceURI: 'com.apple.voice.enhanced.ja-JP.Kyoko' }),
  voice('Samantha', 'en-US', { voiceURI: 'com.apple.voice.compact.en-US.Samantha', default: true }),
];
const EDGE_UK = [
  voice('Microsoft Polina Online (Natural) - Ukrainian (Ukraine)', 'uk-UA', { localService: false }),
  voice('Microsoft Ostap Online (Natural) - Ukrainian (Ukraine)', 'uk-UA', { localService: false }),
  voice('Microsoft Irina - Russian (Russia)', 'ru-RU'),
  voice('Microsoft David - English (United States)', 'en-US', { default: true }),
];
const ANDROID_TR = [
  voice('Turkish Turkey', 'tr-TR', { voiceURI: 'tr-tr-x-cfs-network', localService: false }),
  voice('Turkish Turkey', 'tr-TR', { voiceURI: 'tr-tr-x-cfs-local' }),
  voice('Turkish Turkey', 'tr-TR', { voiceURI: 'tr-tr-x-efu-local' }),
];

test('rankVoice: quality first, novelty voices last, region and online voices as fits', () => {
  const best = (list, regions, opts = {}) => [...list].sort((a, b) => speech.rankVoice(b, { regions, ...opts }) - speech.rankVoice(a, { regions, ...opts }))[0];
  assert.equal(best(SAFARI_MAC_JA, ['ja-JP']).name, 'Kyoko (Enhanced)', 'Safari: not the Eloquence voice Eddy');
  assert.equal(speech.voiceQuality(SAFARI_MAC_JA[0]), 'novelty');
  assert.equal(speech.voiceQuality(voice('Otoya (Premium)', 'ja-JP', { voiceURI: 'com.apple.voice.premium.ja-JP.Otoya' })), 'premium');
  assert.equal(speech.voiceQuality(voice('eSpeak Japanese', 'ja', { voiceURI: 'urn:moz-tts:speechd:Japanese?ja' })), 'basic');
  // Edge: natural online voices while online, a local voice offline.
  const edgeJa = [voice('Microsoft Haruka - Japanese (Japan)', 'ja-JP'), voice('Microsoft Nanami Online (Natural) - Japanese (Japan)', 'ja-JP', { localService: false })];
  assert.match(best(edgeJa, ['ja-JP']).name, /Nanami/);
  assert.match(best(edgeJa, ['ja-JP'], { online: false }).name, /Haruka/);
  // Native Android: a local voice first (works without a connection).
  assert.equal(best(ANDROID_TR, ['tr-TR'], { native: true }).voiceURI.endsWith('-local'), true);
  // Region: Egyptian before Saudi for Egyptian text, and the other way round.
  const arVoices = [voice('Microsoft Hamed Online (Natural) - Arabic (Saudi Arabia)', 'ar-SA', { localService: false }), voice('Microsoft Salma Online (Natural) - Arabic (Egypt)', 'ar-EG', { localService: false })];
  assert.match(best(arVoices, ['ar-EG']).name, /Salma/);
  assert.match(best(arVoices, ['ar-SA', 'ar-001']).name, /Hamed/);
});

test('voicesFor: sorted by rank, only the language asked for', () => {
  useVoices(SAFARI_MAC_JA);
  assert.deepEqual(speech.voicesFor('ja-JP').map((v) => v.name).slice(0, 3), ['Kyoko (Enhanced)', 'Hattori', 'Kyoko']);
  assert.equal(speech.voicesFor('ja-JP').at(-1).voiceURI.includes('eloquence'), true);
  assert.deepEqual(speech.voicesFor('uk-UA'), []);
  assert.equal(speech.canSpeak('ja-JP'), true);
  assert.equal(speech.canSpeak('uk-UA'), false);
});

test('sayFor: no voice for the language → silence and a platform hint, never another language\'s voice', async () => {
  useVoices([voice('Microsoft Irina - Russian (Russia)', 'ru-RU'), voice('Microsoft David - English (United States)', 'en-US', { default: true })]);
  const before = utterances.length;
  const hints = [];
  const ok = await speech.sayFor(uk, uk.words[0], { onNoVoice: (m) => hints.push(m) });
  assert.equal(ok, false);
  assert.equal(utterances.length, before, 'nothing was sent to the engine');
  await tick();
  assert.equal(hints.length, 1);
  assert.equal(hints[0], 'No Ukrainian voice on this device — see Settings to add one.');
  assert.match(uk.voiceHelp.windows, /^Windows has no Ukrainian voice of its own/, 'Windows: the Edge hint, not “Add voices → Ukrainian”');
  // A second tap a moment later doesn't repeat the toast.
  await speech.sayFor(uk, uk.words[0], { onNoVoice: (m) => hints.push(m) });
  await tick();
  assert.equal(hints.length, 1);
  assert.equal(await speech.speak('привіт', { lang: 'uk-UA' }), false);
});

test('sayFor: the best voice reads the pack\'s text; slow uses pauses for phrases and a floor for words', async () => {
  useVoices(EDGE_UK);
  const w = uk.words.find((x) => x.tr.trim().split(/\s+/).length === 3);
  assert.equal(await speech.sayFor(uk, w, { rate: 1 }), true);
  assert.match(lastUtterance().voice.name, /Polina|Ostap/);
  assert.equal(lastUtterance().text, w.tr);
  assert.equal(lastUtterance().rate, 1);
  await speech.sayFor(uk, w, { rate: 1, slow: true });
  assert.equal(lastUtterance().text, pauseBetweenWords(w.tr));
  assert.equal(lastUtterance().rate, 0.9);
  await speech.sayFor(uk, uk.words[0], { rate: 0.5, slow: true });
  assert.equal(lastUtterance().rate, 0.5, 'a single word: slower, but never below 0.5');
  // A phrase whose only pause is already in the text is slowed like a word.
  await speech.sayFor(uk, { text: 'Так, дякую.', slow: 'Так, дякую.' }, { rate: 1, slow: true });
  assert.equal(lastUtterance().rate, 0.75);
  // The learner's own voice choice wins.
  await speech.sayFor(uk, uk.words[0], { voices: { uk: EDGE_UK[1].voiceURI } });
  assert.match(lastUtterance().voice.name, /Ostap/);
});

test('sayFor: Egyptian text gets an Egyptian voice, or is respelled for a Saudi one', async () => {
  const awi = { tr: 'قَوِي', tl: 'ʾawi', dialect: 'Egyptian' };
  const hamed = voice('Microsoft Hamed Online (Natural) - Arabic (Saudi Arabia)', 'ar-SA', { localService: false });
  const salma = voice('Microsoft Salma Online (Natural) - Arabic (Egypt)', 'ar-EG', { localService: false });
  useVoices([hamed, salma]);
  await speech.sayFor(ar, awi, { voices: { ar: hamed.voiceURI } });
  assert.equal(lastUtterance().voice, salma, 'Egyptian text: the Egyptian voice, even when Saudi is chosen');
  assert.equal(lastUtterance().text, 'قَوِي');
  await speech.sayFor(ar, ar.words.find((x) => x.tr === 'مِنْ فَضْلِكَ'));
  assert.equal(lastUtterance().voice, hamed);
  assert.equal(lastUtterance().text, 'مِنْ فَضْلِكْ');
  useVoices([hamed]);
  await speech.sayFor(ar, awi);
  assert.equal(lastUtterance().voice, hamed);
  assert.equal(lastUtterance().text, 'أَوِي', 'ق said ʾ is respelled for a Standard Arabic voice');
});

test('speak: an online voice that fails is retried once with a local voice', async () => {
  const online = voice('Microsoft Polina Online (Natural) - Ukrainian (Ukraine)', 'uk-UA', { localService: false, fails: true });
  const local = voice('Lesya', 'uk-UA');
  useVoices([online, local]);
  const before = utterances.length;
  assert.equal(await speech.speak('привіт', { lang: 'uk-UA' }), true);
  assert.deepEqual(utterances.slice(before).map((u) => u.voice.name), [online.name, 'Lesya']);
});

// ---------- Listening for longer ----------

test('listen: default attempts are unchanged; maxMs keeps listening through pauses and joins what was heard', async () => {
  const short = speech.listen({ lang: 'tr-TR' });
  const r1 = recognitions.at(-1);
  assert.equal(r1.continuous, false);
  r1.onresult({ results: [[{ transcript: 'merhaba', confidence: 0.9 }]] });
  assert.deepEqual((await short.result).alternatives.map((a) => a.transcript), ['merhaba']);

  const long = speech.listen({ lang: 'tr-TR', maxMs: 30000 });
  const r2 = recognitions.at(-1);
  assert.equal(r2.continuous, true);
  const seg = (...alts) => Object.assign(alts.map((transcript) => ({ transcript, confidence: 0.8 })), { isFinal: true });
  r2.onresult({ resultIndex: 0, results: [seg('bugün hava', 'bugün haya')] });
  r2.onresult({ resultIndex: 1, results: [seg('bugün hava', 'bugün haya'), seg('çok güzel')] });
  long.stop();
  const res = await long.result;
  assert.equal(res.ok, true);
  assert.deepEqual(res.alternatives.map((a) => a.transcript), ['bugün hava çok güzel', 'bugün haya çok güzel']);

  // Chrome on Android repeats the earlier segments in each new one: they are not heard twice.
  const android = speech.listen({ lang: 'tr-TR', maxMs: 30000 });
  const r3 = recognitions.at(-1);
  r3.onresult({ resultIndex: 0, results: [seg('bugün')] });
  r3.onresult({ resultIndex: 1, results: [seg('bugün'), seg('bugün hava güzel')] });
  android.stop();
  assert.deepEqual((await android.result).alternatives.map((a) => a.transcript), ['bugün hava güzel']);
});
