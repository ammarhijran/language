import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from '../js/languages/index.js';

const root = fileURLToPath(new URL('..', import.meta.url));

// Script each pack's written words must use.
const SCRIPT = {
  tr: /^[A-Za-zÇĞİÖŞÜÂÎÛçğıöşüâîû' ]+$/,
  uk: /^[\p{Script=Cyrillic}’' ]+$/u,
  ja: /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー々 ]+$/u,
  ar: /^[\p{Script=Arabic}\u064B-\u0652\u0670 ]+$/u,
};

for (const [code, lang] of Object.entries(languages)) {
  test(`${code}: pack has the required fields`, () => {
    for (const key of ['name', 'nativeName', 'flag', 'speechLang', 'greeting', 'welcome', 'sampleSentence', 'alphabetIntro']) {
      assert.ok(lang[key], `${code}.${key}`);
    }
    assert.ok(lang.sampleWords.length >= 3);
    assert.equal(lang.categories.length, 12);
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
