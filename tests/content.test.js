import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from './all-languages.js';

const root = fileURLToPath(new URL('..', import.meta.url));

// Script each pack's written words must use.
// (phrases may also contain punctuation and digits)
const SCRIPT = {
  tr: /^[A-Za-zÇĞİÖŞÜÂÎÛçğıöşüâîû'\p{P}\p{N} ]+$/u,
  uk: /^[\p{Script=Cyrillic}’'\p{P}\p{N} ]+$/u,
  ja: /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー々〜\p{P}\p{N}\p{Script=Latin} ]+$/u,
  ar: /^[\p{Script=Arabic}\u064B-\u0652\u0670\p{P}\p{N} ]+$/u,
};
const REGS = new Set(['formal', 'polite', 'neutral', 'casual', 'slang']);
const GROUPS = new Set(['words', 'phrases', 'talk']);

for (const [code, lang] of Object.entries(languages)) {
  test(`${code}: pack has the required fields`, () => {
    for (const key of ['name', 'nativeName', 'flag', 'speechLang', 'greeting', 'welcome', 'sampleSentence', 'alphabetIntro']) {
      assert.ok(lang[key], `${code}.${key}`);
    }
    assert.ok(lang.sampleWords.length >= 3);
    assert.ok(lang.categories.length >= 12);
    assert.equal(new Set(lang.categories.map((c) => c.id)).size, lang.categories.length, 'unique category ids');
    for (const c of lang.categories) {
      assert.ok(c.name && c.native && c.emoji, `category ${c.id} needs name, native and emoji`);
      assert.ok(GROUPS.has(c.group || 'words'), `category ${c.id} has unknown group ${c.group}`);
    }
  });

  test(`${code}: every word has a unique id, a category and text`, () => {
    const ids = new Set();
    const catIds = new Set(lang.categories.map((c) => c.id));
    for (const w of lang.words) {
      assert.ok(!ids.has(w.id), `duplicate id ${w.id}`);
      ids.add(w.id);
      assert.ok(catIds.has(w.cat), `${w.id} has unknown category ${w.cat}`);
      assert.ok(w.tr.trim() && w.en.trim(), `${w.id} is missing text`);
      assert.match(w.tr, SCRIPT[code], `${w.tr} uses the wrong script`);
      if (w.ex) assert.equal(w.ex.length, 2, `${w.id} example needs [text, english]`);
      if (w.reg) assert.ok(REGS.has(w.reg), `${w.id}: unknown register ${w.reg}`);
      if (w.pair) {
        assert.ok(w.pair.tr && REGS.has(w.pair.reg), `${w.id}: pair needs tr and a valid reg`);
        if (code === 'ja') assert.ok(w.pair.kana, `${w.id}: ja pair needs kana`);
        if (code === 'ar') assert.ok(w.pair.tl, `${w.id}: ar pair needs tl`);
      }
      if (code === 'ja') assert.ok(w.kana, `${w.id}: ja entries need kana`);
      if (code === 'ar') assert.ok(w.tl, `${w.id}: ar entries need tl`);
    }
    assert.ok(lang.words.length >= 150, `expected a decent vocabulary, got ${lang.words.length}`);
  });

  test(`${code}: every category has enough words for multiple choice`, () => {
    for (const c of lang.categories) assert.ok(lang.wordsIn(c.id).length >= 8, `${c.id}: ${lang.wordsIn(c.id).length}`);
  });

  test(`${code}: every word can be analysed and typed`, () => {
    for (const w of lang.words) {
      const a = lang.analyze(w);
      assert.ok(a.ipa && !/undefined|NaN/.test(a.ipa + a.respell), `${w.tr}: ${a.ipa} ${a.respell}`);
      assert.ok(a.words.every((x) => x.syllables.length > 0), w.tr);
      for (const x of a.words) assert.ok(x.stressIndex < x.syllables.length, `${w.tr}: stress out of range`);
      // The word itself is always an accepted typed answer and a spoken target.
      const accepted = lang.acceptedAnswers(w).map(lang.normalize);
      assert.ok(accepted.includes(lang.normalize(w.tr)), w.tr);
      assert.ok(lang.spokenTargets(w).length >= 1);
    }
  });

  test(`${code}: grammar lessons are well formed`, () => {
    const lessons = lang.grammar || [];
    assert.equal(new Set(lessons.map((l) => l.id)).size, lessons.length, 'unique lesson ids');
    assert.ok(lessons.length >= 16, `${lessons.length} lessons`);
    // Levels never go down: the list reads from first sentences to everyday speech.
    assert.deepEqual(lessons.map((l) => l.level), [...lessons.map((l) => l.level)].sort(), 'lessons are in level order');
    for (const l of lessons) {
      assert.ok(l.id && l.title && l.summary && ['A1', 'A2', 'B1'].includes(l.level), `lesson ${l.id}`);
      assert.ok(l.sections?.length >= 1, `${l.id}: sections`);
      for (const s of l.sections) {
        assert.ok(s.heading && typeof s.body === 'string', `${l.id}: section heading/body`);
        if (s.table) assert.ok(s.table.head.length && s.table.rows.every((r) => Array.isArray(r)), `${l.id}: table`);
        for (const ex of s.examples || []) {
          assert.ok(ex.tr && ex.en, `${l.id}: example needs tr and en`);
          if (code === 'ja') assert.ok(ex.kana, `${l.id}: ja example needs kana (${ex.tr})`);
          if (code === 'ar') assert.ok(ex.tl, `${l.id}: ar example needs tl (${ex.tr})`);
        }
      }
      for (const q of l.quiz || []) {
        assert.equal(q.options.length, 4, `${l.id}: 4 options`);
        assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, `${l.id}: answer index`);
        assert.equal(new Set(q.options).size, 4, `${l.id}: options must differ (${q.q})`);
      }
    }
  });

  test(`${code}: alphabet, tips and minimal pairs are well formed`, () => {
    assert.ok(lang.alphabet.length >= 26);
    for (const l of lang.alphabet) assert.ok(l.upper && l.ipa && l.hint && l.ex?.length === 2, JSON.stringify(l));
    assert.ok(lang.soundTips.length >= 5);
    for (const g of lang.minimalPairs) for (const p of g.pairs) assert.equal(p.length, 4);
  });
}

test('Turkish keeps its 29-letter alphabet', () => {
  assert.equal(languages.tr.alphabet.length, 29);
});

test('service worker caches every shipped file', () => {
  const sw = readFileSync(join(root, 'sw.js'), 'utf8');
  const walk = (dir) => readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
  const files = [...walk(join(root, 'js')), ...walk(join(root, 'css')), ...walk(join(root, 'icons'))]
    .map((p) => relative(root, p).split('\\').join('/'));
  for (const f of files) assert.ok(sw.includes(`'${f}'`), `sw.js is missing ${f}`);
});

test('every Japanese and Arabic example sentence has a reading', async () => {
  const { exampleReadings: jaR } = await import('../js/languages/ja/readings.js');
  const { exampleReadings: arR } = await import('../js/languages/ar/readings.js');
  for (const [code, map, key] of [['ja', jaR, 'kana'], ['ar', arR, 'tl']]) {
    const lang = languages[code];
    const used = new Set();
    for (const w of lang.words.filter((x) => x.ex)) {
      assert.ok(w.example?.[key], `${code}: no reading for the example of ${w.tr}: ${w.ex[0]}`);
      used.add(w.ex[0]);
    }
    for (const k of Object.keys(map)) assert.ok(used.has(k), `${code}: unused reading for “${k}”`);
  }
  // Japanese: kana only, and the kana written in the sentence appear in order
  const toH = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  for (const [sentence, kana] of Object.entries(jaR)) {
    assert.match(kana, /^[぀-ヿー]+( [぀-ヿー]+)*$/, `ja reading is spaced kana: ${kana}`);
    const want = toH(sentence.replace(/[^぀-ヿー]/g, ''));
    let i = 0;
    for (const ch of toH(kana.replace(/ /g, ''))) if (ch === want[i]) i++;
    assert.equal(i, want.length, `ja reading misses kana of “${sentence}”: ${kana}`);
  }
});

test('languages/meta.js matches the packs (run: node scripts/lang-meta.mjs)', async () => {
  const { meta } = await import('../js/languages/index.js');
  const { metaOf } = await import('../scripts/lang-meta.mjs');
  assert.deepEqual(Object.keys(meta), Object.keys(languages));
  for (const L of Object.values(languages)) assert.deepEqual(meta[L.code], metaOf(L), `${L.code}: meta.js is out of date`);
});

test('Ukrainian stress marks fit their words: one value per word, never past the last vowel', () => {
  const uk = languages.uk;
  const vowels = (w) => (w.match(/[аеєиіїоуюя]/gi) || []).length;
  const check = (o, where) => {
    const words = o.tr.trim().split(/\s+/);
    if (o.s === undefined) return;
    const s = Array.isArray(o.s) ? o.s : [o.s];
    assert.equal(s.length, words.length, `${where}: “${o.tr}” has ${words.length} words but ${s.length} stress values`);
    s.forEach((n, i) => assert.ok(Number.isInteger(n) && n >= 0 && n <= vowels(words[i]), `${where}: stress ${n} does not fit “${words[i]}”`));
  };
  for (const w of uk.words) {
    check(w, w.id);
    if (w.pair) check(w.pair, `${w.id} (pair)`);
  }
});

test('no letters of the wrong script inside words, in any language', async () => {
  const { languages } = await import('./all-languages.js');
  const lines = async (code) => {
    const L = languages[code];
    const { texts } = await import(`../js/languages/${code}/texts.js`);
    const out = [];
    for (const w of L.words) { out.push(w.tr); if (w.example) out.push(w.example.tr); if (w.pair) out.push(w.pair.tr); }
    for (const t of texts) for (const l of t.lines) out.push(l.tr);
    for (const l of L.grammar || []) for (const s of l.sections || []) for (const e of s.examples || []) out.push(e.tr);
    return out.filter(Boolean).map(String);
  };
  const words = (text) => text.split(/[\s,.!?;:«»"“”()—–-]+/).filter(Boolean);
  // Ukrainian: no Latin look-alikes in Cyrillic words, no Russian-only letters, one kind of apostrophe
  for (const text of await lines('uk')) {
    for (const w of words(text)) {
      assert.ok(!(/[A-Za-z]/.test(w) && /[Ѐ-ӿ]/.test(w)), `Latin and Cyrillic mixed in ${w}: ${text}`);
      assert.ok(!/[ыэъё]/i.test(w), `a Russian letter in ${w}: ${text}`);
      assert.ok(!/['ʼ`´]/.test(w), `an apostrophe other than ’ in ${w}: ${text}`);
    }
  }
  // Arabic: no Latin letters inside Arabic words, no Persian or Urdu look-alikes (ی ک ە ہ ھ)
  for (const text of await lines('ar')) {
    for (const w of text.split(/\s+/)) {
      assert.ok(!(/[A-Za-z]/.test(w) && /[؀-ۿ]/.test(w)), `Latin and Arabic mixed in ${w}: ${text}`);
      assert.ok(!/[یکەہھ]/.test(w), `a non-Arabic letter in ${w}: ${text}`);
    }
  }
  // Turkish: Latin letters only
  for (const text of await lines('tr')) assert.ok(!/[Ͱ-ϿЀ-ӿ]/.test(text), `a Greek or Cyrillic letter in: ${text}`);
  // Japanese: no half-width kana, no dash standing in for the long-vowel mark
  for (const text of await lines('ja')) {
    assert.ok(!/[｡-ﾟ]/.test(text), `half-width kana in: ${text}`);
    assert.ok(!/[゠-ヿ][-—–―‐]/.test(text), `a dash for ー in: ${text}`);
  }
});
