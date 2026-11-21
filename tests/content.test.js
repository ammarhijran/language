import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import tr from '../js/languages/tr/index.js';

const root = fileURLToPath(new URL('..', import.meta.url));

test('every word has a unique id, a category and text', () => {
  const ids = new Set();
  const catIds = new Set(tr.categories.map((c) => c.id));
  for (const w of tr.words) {
    assert.ok(!ids.has(w.id), `duplicate id ${w.id}`);
    ids.add(w.id);
    assert.ok(catIds.has(w.cat), `${w.id} has unknown category ${w.cat}`);
    assert.ok(w.tr.trim() && w.en.trim(), `${w.id} is missing text`);
    if (w.ex) assert.equal(w.ex.length, 2, `${w.id} example needs [tr, en]`);
  }
  assert.ok(tr.words.length >= 250, `expected a decent vocabulary, got ${tr.words.length}`);
});

test('every category has enough words for multiple choice', () => {
  for (const c of tr.categories) assert.ok(tr.wordsIn(c.id).length >= 8, c.id);
});

test('stress markers point at a real syllable', () => {
  for (const w of tr.words) {
    if (!w.s) continue;
    const a = tr.analyze(w);
    assert.equal(a.words.length, 1, `${w.tr}: stress only applies to single words`);
    assert.ok(w.s <= a.words[0].syllables.length, `${w.tr}: stress ${w.s} out of range`);
  }
});

test('only Turkish letters appear in words', () => {
  for (const w of tr.words) {
    assert.match(w.tr, /^[A-Za-zÇĞİÖŞÜÂÎÛçğıöşüâîû' ]+$/, w.tr);
  }
});

test('minimal pairs and alphabet are well formed', () => {
  assert.equal(tr.alphabet.length, 29);
  for (const g of tr.minimalPairs) for (const p of g.pairs) assert.equal(p.length, 4);
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
