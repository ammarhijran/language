// Hands-free listening: each entry is spoken, the learner gets time to say it
// aloud, hears it again and then (optionally) its meaning in English, and the
// round moves on by itself. Built on the Read & Listen line player.
import { createPlayer } from './reader.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Time to repeat an entry aloud: longer for longer entries, 1.5–7 s, times the learner's `factor`. */
export function repeatPause(entry, factor = 1) {
  const kana = entry.kana ? String(entry.kana).replace(/\s+/g, '') : '';
  const base = kana ? 1000 + [...kana].length * 220 : 1000 + [...String(entry.tr)].length * 110;
  return Math.round(Math.min(7000, Math.max(1500, base)) * factor);
}

/** An English gloss as a voice should read it: “hi / hello (casual)” → “hi or hello, casual”. */
export function englishFor(en) {
  return String(en ?? '')
    .replace(/\s*\/\s*/g, ' or ')
    .replace(/\s*\(([^)]*)\)/g, ', $1')
    .replace(/[“”"]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^,\s*/, '')
    .trim();
}

/**
 * A round over `items`. say(entry) and sayEnglish(text) speak and resolve when
 * done (say: false when there is no voice, which ends the round via onFail).
 * `opts` ({ pause, twice, english, sentence }) may be changed while it plays.
 * With `sentence`, an entry's example sentence follows the entry: spoken, a
 * pause to repeat it, and (with `english`) its meaning.
 * Callbacks: onStep(step, i) with 'listen' | 'repeat' | 'again' | 'meaning' |
 * 'example' | 'exampleRepeat' | 'exampleMeaning',
 * onItem(i), onHeard(i) once an item has played to its end, onState(playing),
 * onEnd(), onFail().
 */
export function createHandsFree({ items, say, sayEnglish = null, opts = {}, wait = sleep, onStep, onItem, onHeard, onState, onEnd, onFail }) {
  const o = Object.assign({ pause: 1, twice: true, english: true, sentence: false }, opts);
  let seq = 0;
  const player = createPlayer({
    count: items.length,
    gap: 500,
    say: async (i) => {
      const my = ++seq;
      const live = () => my === seq;
      const entry = items[i];
      onStep?.('listen', i);
      if ((await say(entry)) === false) return false;
      if (!live()) return true;
      onStep?.('repeat', i);
      await wait(repeatPause(entry, o.pause));
      if (!live()) return true;
      if (o.twice) {
        onStep?.('again', i);
        await say(entry);
        if (!live()) return true;
      }
      if (o.english && sayEnglish) {
        onStep?.('meaning', i);
        await sayEnglish(englishFor(entry.en));
        if (!live()) return true;
      }
      // The word in a sentence: its example, when it has one.
      const ex = o.sentence ? entry.example : null;
      if (ex?.tr) {
        onStep?.('example', i);
        if ((await say(ex)) === false) return false;
        if (!live()) return true;
        onStep?.('exampleRepeat', i);
        await wait(repeatPause(ex, o.pause));
        if (!live()) return true;
        if (o.english && sayEnglish && ex.en) {
          onStep?.('exampleMeaning', i);
          await sayEnglish(englishFor(ex.en));
          if (!live()) return true;
        }
      }
      onHeard?.(i);
      return true;
    },
    onLine: onItem,
    // Pausing (or leaving) abandons the item being played.
    onState: (playing) => { if (!playing) seq++; onState?.(playing); },
    onEnd,
    onFail,
  });
  return { player, opts: o };
}
