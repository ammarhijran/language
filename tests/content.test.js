import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from '../js/languages/index.js';

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
