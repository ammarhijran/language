// Hands-free listening: the pause to repeat, the spoken English gloss and the
// order of a round (listen → repeat → again → meaning → next).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { repeatPause, englishFor, createHandsFree } from '../js/handsfree.js';

test('repeatPause grows with the entry and stays within 1.5–7 s', () => {
  assert.equal(repeatPause({ tr: 'su' }), 1500);
  assert.ok(repeatPause({ tr: 'Teşekkür ederim' }) > repeatPause({ tr: 'evet' }));
  assert.equal(repeatPause({ tr: 'x'.repeat(200) }), 7000);
  // Japanese is timed by its kana, not by a handful of kanji
  assert.ok(repeatPause({ tr: '図書館', kana: 'としょかん' }) > repeatPause({ tr: 'abc' }));
  assert.equal(repeatPause({ tr: 'su' }, 1.6), 2400);
  assert.equal(repeatPause({ tr: 'su' }, 0.6), 900);
});

test('englishFor makes a gloss speakable', () => {
  assert.equal(englishFor('hi / hello'), 'hi or hello');
  assert.equal(englishFor('good night (to a man)'), 'good night, to a man');
  assert.equal(englishFor('“please”'), 'please');
  assert.equal(englishFor(undefined), '');
});

const flush = () => new Promise((r) => setTimeout(r, 0));

test('a round plays every item in order and reports what was heard', async () => {
  const log = [];
  const items = [{ tr: 'bir', en: 'one' }, { tr: 'iki', en: 'two / a pair' }];
  let ended = false;
  const heard = [];
  const { player } = createHandsFree({
    items,
    say: async (e) => { log.push(`say:${e.tr}`); return true; },
    sayEnglish: async (t) => { log.push(`en:${t}`); return true; },
    wait: async (ms) => { log.push(`wait:${ms}`); },
    onStep: (s, i) => log.push(`${s}:${i}`),
    onHeard: (i) => heard.push(i),
    onEnd: () => { ended = true; },
  });
  player.play();
  for (let i = 0; i < 20 && !ended; i++) await new Promise((r) => setTimeout(r, 100));
  assert.equal(ended, true);
  assert.deepEqual(heard, [0, 1]);
  assert.deepEqual(log.slice(0, 8), ['listen:0', 'say:bir', 'repeat:0', 'wait:1500', 'again:0', 'say:bir', 'meaning:0', 'en:one']);
  assert.ok(log.includes('en:two or a pair'));
});

test('options apply while playing; no voice ends the round; pausing abandons the item', async () => {
  const log = [];
  let failed = false;
  const a = createHandsFree({
    items: [{ tr: 'bir', en: 'one' }],
    opts: { twice: false, english: false },
    say: async (e) => { log.push(e.tr); return true; },
    sayEnglish: async () => { log.push('en'); },
    wait: async () => {},
  });
  a.player.play();
  await flush(); await flush(); await flush();
  assert.deepEqual(log, ['bir'], 'once, no English');

  const b = createHandsFree({ items: [{ tr: 'x', en: 'y' }], say: async () => false, wait: async () => {}, onFail: () => { failed = true; } });
  b.player.play();
  await flush(); await flush();
  assert.equal(failed, true);

  const heard = [];
  let release;
  const c = createHandsFree({
    items: [{ tr: 'x', en: 'y' }, { tr: 'z', en: 'w' }],
    say: async () => true,
    wait: () => new Promise((r) => { release = r; }),
    onHeard: (i) => heard.push(i),
  });
  c.player.play();
  await flush(); await flush();
  c.player.pause();
  release();
  await flush(); await flush();
  assert.deepEqual(heard, [], 'a paused item is not counted');
  assert.equal(c.player.playing, false);
});
