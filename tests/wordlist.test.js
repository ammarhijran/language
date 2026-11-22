// Exporting: the word list as CSV, and how a file reaches the learner in the
// apps (the share sheet — a WebView has no downloads).
import { test } from 'node:test';
import assert from 'node:assert/strict';

const calls = [];
globalThis.window = {
  Capacitor: {
    isNativePlatform: () => true,
    getPlatform: () => 'android',
    PluginHeaders: [{ name: 'Filesystem' }, { name: 'Share' }],
    nativePromise: (plugin, method, options) => {
      calls.push({ plugin, method, options });
      return Promise.resolve(plugin === 'Filesystem' ? { uri: 'file:///cache/' + options.path } : {});
    },
  },
};

const { saveTextFile } = await import('../js/native.js');
const { wordsCsv } = await import('../js/wordlist.js');
const { languages } = await import('./all-languages.js');

test('in the apps a file is written to the cache and handed to the share sheet', async () => {
  await saveTextFile('lisan-progress.json', '{"a":1}', { type: 'application/json', dialogTitle: 'Save your Lisan backup' });
  assert.deepEqual(calls.map((c) => `${c.plugin}.${c.method}`), ['Filesystem.writeFile', 'Share.share']);
  assert.deepEqual(calls[0].options, { path: 'lisan-progress.json', data: '{"a":1}', directory: 'CACHE', encoding: 'utf8' });
  assert.deepEqual(calls[1].options.files, ['file:///cache/lisan-progress.json']);
  assert.equal(calls[1].options.dialogTitle, 'Save your Lisan backup');
});

test('the word list: only started words, in course order, with readings and safe quoting', () => {
  const ja = languages.ja;
  const [a, b, c] = ja.words;
  const withComma = ja.words.find((w) => ![a, b, c].includes(w) && (/[,"]/.test(w.en) || /[,"]/.test(w.ex?.[1] || '')));
  const now = Date.now();
  const cards = {
    [c.id]: { ease: 2.5, interval: 30, reps: 5, lapses: 0, due: now + 864e5 * 30, added: now },
    [a.id]: { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: now, added: now },
    [withComma.id]: { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: now, added: now, known: true },
  };
  const { count, text } = wordsCsv(ja, cards);
  assert.equal(count, 3);
  assert.ok(text.startsWith('﻿Word,Reading,Meaning,Example,Example meaning,Topic,Status\r\n'), 'byte-order mark and header');
  const lines = text.trim().split('\r\n');
  assert.equal(lines.length, 4);
  assert.ok(lines[1].startsWith(`${a.tr},`), 'course order, not the order of the cards');
  assert.ok(!text.includes(`\r\n${b.tr},`), 'a word not started is left out');
  // a comma or quote inside a cell is quoted, and quotes are doubled
  const row = lines.find((l) => l.startsWith(`${withComma.tr},`) || l.startsWith(`"${withComma.tr}`));
  assert.ok(row && /"[^"]*[,][^"]*"|""/.test(row), row);
  assert.match(text, /Already learned|Known|known/i, 'the status of a word marked as known');
  assert.deepEqual(wordsCsv(ja, {}).count, 0);
  // Arabic gives the transliteration as the reading
  const ar = languages.ar;
  const w = ar.words[0];
  assert.ok(wordsCsv(ar, { [w.id]: cards[a.id] }).text.includes(`${w.tr},${w.tl},`));
});
