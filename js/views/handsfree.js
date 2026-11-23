// Practice → Hands-free: listen and repeat a round of words without tapping.
import { h, icon, set, shuffle } from '../ui.js';
import * as speech from '../speech.js';
import { readingLine, backLink } from '../components.js';
import { createHandsFree } from '../handsfree.js';
import { keepScreenOn } from '../native.js';

const COUNT = 20;
const PREFS_KEY = 'lisan:handsfree';
const STEPS = {
  ask: 'How do you say…', recall: 'Your turn — say the word', listen: 'Listen…', repeat: 'Your turn — say it out loud', again: 'Once more…', meaning: 'It means…',
  example: 'In a sentence…', exampleRepeat: 'Your turn — say the sentence', exampleMeaning: 'The sentence means…',
};
const PAUSES = [['0.6', 'Short'], ['1', 'Normal'], ['1.6', 'Long']];

function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    return { english: p.english !== false, twice: p.twice !== false, sentence: p.sentence === true, recall: p.recall === true, pause: PAUSES.some(([v]) => Number(v) === p.pause) ? p.pause : 1 };
  } catch { return { english: true, twice: true, sentence: false, recall: false, pause: 1 }; }
}
const savePrefs = (p) => { try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch { /* not kept */ } };

export default function handsFree(ctx, pool) {
  const { lang } = ctx;
  const items = shuffle(pool).slice(0, COUNT);
  const prefs = loadPrefs();
  const heard = new Set();
  // Keep the screen on while it plays (the apps' KeepAwake plugin, or the browser's wake lock).
  const keepAwake = (on) => keepScreenOn(on);

  const count = h('p', { class: 'kicker' });
  const word = h('p', { class: 'hero-tr', lang: lang.code, dir: lang.dir === 'rtl' ? 'rtl' : null });
  const reading = h('div');
  const english = h('p', { class: 'hero-en' });
  const step = h('p', { class: 'hf-step', 'aria-live': 'polite' }, 'Press play, then put your phone down.');
  const playBtn = h('button', { type: 'button', class: 'btn primary hf-play', onclick: () => round.player.toggle() });
  const paintPlay = (playing) => set(playBtn, playing ? h('span', { class: 'hf-pause', 'aria-hidden': 'true' }) : icon('play', 22), playing ? 'Pause' : round.player.index < 0 ? 'Start' : 'Continue');
  const show = (i) => {
    const e = items[i];
    count.textContent = `${i + 1} / ${items.length}`;
    word.textContent = e.tr;
    set(reading, readingLine(ctx, e, 'reading', { full: true }));
    english.textContent = e.en;
    exBox.hidden = true;
    exTr.textContent = e.example?.tr || '';
    exEn.textContent = e.example?.en || '';
  };
  // The example sentence, shown while it is being said.
  const exTr = h('p', { class: 'hf-ex-tr', lang: lang.code, dir: lang.dir === 'rtl' ? 'rtl' : null });
  const exEn = h('p', { class: 'hf-ex-en muted' });
  const exBox = h('div', { class: 'hf-example', hidden: true }, exTr, exEn);
  const card = h('section', { class: 'card hf-card' }, count, h('div', { class: 'word-hero' }, word, reading, english), exBox, step);

  const view = h('div', { class: 'view handsfree' });
  const round = createHandsFree({
    items,
    opts: { pause: prefs.pause, twice: prefs.twice, english: prefs.english, sentence: prefs.sentence, recall: prefs.recall },
    say: (entry) => ctx.say(entry),
    sayEnglish: (text) => speech.speak(text, { lang: 'en-US', rate: 1, regions: ['en-US', 'en-GB'] }),
    onItem: show,
    onStep: (name) => {
      step.textContent = STEPS[name];
      if (name === 'example') exBox.hidden = false;
      // Meaning first: the word stays covered until it is said.
      if (name === 'ask' || name === 'recall') card.classList.add('hf-covered');
      else card.classList.remove('hf-covered');
    },
    onHeard: (i) => {
      if (heard.has(i)) return;
      heard.add(i);
      ctx.store.logActivity(lang.code, { practiced: 1 });
    },
    onState: (playing) => { paintPlay(playing); keepAwake(playing); if (!playing && !round.player.ended) step.textContent = 'Paused'; },
    onFail: () => { step.textContent = speech.noVoiceMessage(lang); },
    onEnd: () => {
      keepAwake(false);
      // A round counts once most of it was really played (not skipped through).
      if (heard.size >= Math.min(10, items.length)) ctx.game.count?.({ lang: lang.code, key: 'handsFree' });
      set(view,
        h('div', { class: 'summary' },
          h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, '🎧'),
          h('h2', null, 'Round done'),
          h('p', { class: 'big-number' }, String(heard.size)),
          h('p', { class: 'muted' }, `${heard.size === 1 ? 'word' : 'words'} heard and repeated. Listening rounds don’t change your review schedule.`),
          h('div', { class: 'actions stack' },
            h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Another round', icon('arrow', 18)),
            h('a', { class: 'btn wide', href: '#/practice' }, 'Change mode or topic'),
            h('a', { class: 'btn ghost wide', href: '#/' }, 'Back home'))));
      ctx.flushRewards?.();
    },
  });
  ctx.onCleanup(() => { round.player.stop(); speech.cancelSpeech(); keepAwake(false); });

  const change = (patch) => { Object.assign(prefs, patch); Object.assign(round.opts, patch); savePrefs(prefs); };
  const noEnglish = speech.canSpeak('en-US') === false;
  if (noEnglish) { round.opts.english = false; round.opts.recall = false; }
  const options = h('section', { class: 'card form' },
    h('h2', { class: 'card-title' }, 'Options'),
    h('label', { class: 'field inline' },
      h('input', { type: 'checkbox', checked: prefs.english && !noEnglish, disabled: noEnglish, onchange: (e) => change({ english: e.target.checked }) }),
      h('span', null, noEnglish ? 'Say the meaning in English (no English voice on this device)' : 'Say the meaning in English')),
    h('label', { class: 'field inline' },
      h('input', { type: 'checkbox', checked: prefs.twice, onchange: (e) => change({ twice: e.target.checked }) }),
      h('span', null, 'Say each word a second time after the pause')),
    h('label', { class: 'field inline' },
      h('input', { type: 'checkbox', checked: prefs.sentence, onchange: (e) => change({ sentence: e.target.checked }) }),
      h('span', null, 'Then say its example sentence too')),
    h('label', { class: 'field inline' },
      h('input', { type: 'checkbox', id: 'hf-recall', checked: prefs.recall && !noEnglish, disabled: noEnglish, onchange: (e) => change({ recall: e.target.checked }) }),
      h('span', null, 'Meaning first: hear the English, say the word, then hear it')),
    h('label', { class: 'field', for: 'hf-pause' }, h('span', null, 'Time to repeat'),
      h('select', { class: 'select', id: 'hf-pause', onchange: (e) => change({ pause: Number(e.target.value) }) },
        PAUSES.map(([value, label]) => h('option', { value, selected: Number(value) === prefs.pause }, label)))));

  show(0);
  paintPlay(false);
  count.textContent = `${items.length} ${items.length === 1 ? 'word' : 'words'}`;
  set(view,
    backLink(ctx, '#/practice', 'Practice'),
    h('h1', null, 'Hands-free listening'),
    h('p', { class: 'muted' }, 'Each word is spoken, you get a moment to say it, then you hear it again and what it means. Nothing to tap.'),
    card,
    h('div', { class: 'hf-controls' },
      h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Previous word', onclick: () => round.player.prev() }, icon('back')),
      playBtn,
      h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Next word', onclick: () => round.player.next() }, icon('arrow'))),
    options);
  return view;
}
