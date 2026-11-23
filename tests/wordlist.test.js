// Exporting: the word list as CSV, and how a file reaches the learner in the
// apps (the share sheet — a WebView has no downloads).
import { test } from 'node:test';
import assert from 'node:assert/strict';

const calls = [];
globalThis.window = {
  Capacitor: {
    isNativePlatform: () => true,
    getPlatform: () => 'android',
    PluginHeaders: [{ name: 'Filesystem' }, { name: 'Share' }, { name: 'KeepAwake' }],
    nativePromise: (plugin, method, options) => {
      calls.push({ plugin, method, options });
      return Promise.resolve(plugin === 'Filesystem' ? { uri: 'file:///cache/' + options.path } : {});
    },
  },
};

const { saveTextFile, keepScreenOn, systemBars, canShareText, shareText } = await import('../js/native.js');
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
  assert.ok(text.startsWith('﻿Word,Reading,Meaning,Example,Example meaning,Topic,Status,My note\r\n'), 'byte-order mark and header');
  // The learner's own notes fill the last column.
  const noted = wordsCsv(ja, cards, { [a.id]: 'my hook, with a comma', toString: 'x' }).text.trim().split('\r\n');
  assert.ok(noted[1].endsWith(',"my hook, with a comma"'), noted[1]);
  assert.ok(noted[2].endsWith(','), 'no note: an empty cell');
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

test('keeping the screen on uses the KeepAwake plugin in the apps and never throws', async () => {
  calls.length = 0;
  await keepScreenOn(true);
  await keepScreenOn(false);
  assert.deepEqual(calls.map((c) => `${c.plugin}.${c.method}`), ['KeepAwake.keepAwake', 'KeepAwake.allowSleep']);
  // a plugin that fails must not break playback
  const real = window.Capacitor.nativePromise;
  window.Capacitor.nativePromise = () => Promise.reject(new Error('no activity'));
  await assert.doesNotReject(keepScreenOn(true));
  window.Capacitor.nativePromise = real;
});

test('a forced theme sets the phone’s status-bar icons to match, where the page is drawn under them', async () => {
  const NEW = 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/141.0.0.0 Mobile Safari/537.36';
  const OLD = NEW.replace('Chrome/141', 'Chrome/120');
  calls.length = 0;
  assert.equal(await systemBars('dark', NEW), null, 'without the plugin nothing happens');
  window.Capacitor.PluginHeaders.push({ name: 'SystemBars' });
  assert.equal(await systemBars('system', NEW), null, 'the bars already follow the device');
  assert.equal(await systemBars('dark', OLD), null, 'older WebViews keep the phone’s strip behind the icons: leave them');
  assert.equal(calls.length, 0);
  assert.equal(await systemBars('dark', NEW), 'DARK');
  assert.equal(await systemBars('dark', NEW), null, 'not set twice');
  assert.equal(await systemBars('light', NEW), 'LIGHT');
  assert.equal(await systemBars('system', NEW), 'DEFAULT');
  assert.deepEqual(calls.map((c) => `${c.plugin}.${c.method} ${c.options.style}`), ['SystemBars.setStyle DARK', 'SystemBars.setStyle LIGHT', 'SystemBars.setStyle DEFAULT']);
  // a failing plugin never breaks the app, and the next change is tried again
  const real = window.Capacitor.nativePromise;
  window.Capacitor.nativePromise = () => Promise.reject(new Error('no window'));
  assert.equal(await systemBars('dark', NEW), null);
  window.Capacitor.nativePromise = real;
  assert.equal(await systemBars('dark', NEW), 'DARK');
});

test('sharing a word uses the Share plugin in the apps, and says how it ended', async () => {
  calls.length = 0;
  assert.equal(canShareText(), true);
  assert.equal(await shareText('merhaba — hello', { title: 'Turkish: merhaba', dialogTitle: 'Share this word' }), 'shared');
  assert.deepEqual(calls.map((c) => `${c.plugin}.${c.method}`), ['Share.share']);
  assert.deepEqual(calls[0].options, { title: 'Turkish: merhaba', text: 'merhaba — hello', dialogTitle: 'Share this word' });
  const real = window.Capacitor.nativePromise;
  window.Capacitor.nativePromise = () => Promise.reject(new Error('Share canceled'));
  assert.equal(await shareText('x'), 'cancelled', 'closing the sheet is not an error');
  window.Capacitor.nativePromise = () => Promise.reject(new Error('no activity'));
  assert.equal(await shareText('x'), 'failed');
  window.Capacitor.nativePromise = real;
});
