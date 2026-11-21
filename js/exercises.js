// Exercise types. Each takes (ctx, word, onDone, meta) and returns an element.
// onDone receives { correct, rating } (rating uses the SRS scale) or { skipped: true }.
import { h, icon, bindKeys, shuffle, pick, set } from './ui.js';
import { playButton, audioControls, pronunciationPanel, speakPractice, exampleBlock } from './components.js';
import { alignDiff } from './compare.js';
import { AGAIN, HARD, GOOD, EASY } from './srs.js';

const PRAISE = ['Doğru! Correct.', 'Harika! Great.', 'Aferin! Well done.', 'Süper! Nice.'];

function once(fn) {
  let called = false;
  return (...args) => { if (!called) { called = true; fn(...args); } };
}

/** Pick 4 options including the target, preferring the same category. */
export function pickOptions(lang, word, label, n = 4) {
  const same = shuffle(lang.wordsIn(word.cat).filter((w) => w.id !== word.id));
  const others = shuffle(lang.words.filter((w) => w.cat !== word.cat));
  const seen = new Set([label(word)]);
  const out = [word];
  for (const w of [...same, ...others]) {
    if (out.length >= n) break;
    const l = label(w);
    if (seen.has(l)) continue;
    seen.add(l);
    out.push(w);
  }
  return shuffle(out);
}

function reveal(ctx, word, correct, extra) {
  const a = ctx.lang.analyze(word);
  return h('div', { class: `reveal ${correct ? 'good' : 'bad'}` },
    h('p', { class: 'verdict' }, icon(correct ? 'check' : 'x', 18), correct ? pick(PRAISE) : 'Not quite — here’s the answer:'),
    h('div', { class: 'reveal-word' },
      playButton(ctx, word.tr),
      h('div', null,
        h('p', null, h('span', { class: 'tr', lang: ctx.lang.code }, word.tr), h('span', { class: 'en' }, ` — ${word.en}`)),
        h('p', { class: 'respell small' }, a.respell),
      ),
    ),
    extra,
  );
}

function continueButton(onClick, label = 'Continue') {
  return h('button', { type: 'button', class: 'btn primary wide continue', onclick: onClick }, label, icon('arrow', 18));
}

function choice(ctx, word, onDone, { kicker, prompt, label, optionLang }) {
  const opts = pickOptions(ctx.lang, word, label);
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
  const actions = h('div', { class: 'actions' });
  let correct = false;
  let answered = false;

  const buttons = opts.map((w, i) =>
    h('button', { type: 'button', class: 'option', lang: optionLang, onclick: () => answer(i) },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(i + 1)),
      h('span', { class: 'option-label' }, label(w))));

  const finish = once(() => { unbind(); onDone({ correct, rating: correct ? GOOD : AGAIN }); });

  function answer(i) {
    if (answered) return;
    answered = true;
    correct = opts[i].id === word.id;
    buttons.forEach((b, j) => {
      b.disabled = true;
      if (opts[j].id === word.id) b.classList.add('correct');
      else if (j === i) b.classList.add('wrong');
    });
    set(feedback, reveal(ctx, word, correct));
    ctx.say(word.tr);
    const btn = continueButton(finish);
    set(actions, btn);
    btn.focus({ preventScroll: true });
  }

  const unbind = bindKeys({
    1: () => answer(0), 2: () => answer(1), 3: () => answer(2), 4: () => answer(3),
    Enter: () => { if (answered) finish(); },
  });
  ctx.onCleanup(unbind);

  return h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, kicker),
    prompt,
    h('div', { class: 'options' }, buttons),
    feedback,
    actions,
  );
}

export function listen(ctx, word, onDone) {
  setTimeout(() => ctx.say(word.tr), 300);
  const prompt = h('div', { class: 'prompt listen-prompt' },
    h('button', { type: 'button', class: 'big-play', 'aria-label': 'Play the word again', onclick: () => ctx.say(word.tr) }, icon('volume', 40)),
    h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(word.tr, { slow: true }) }, icon('slow', 14), 'Slowly'),
  );
  return choice(ctx, word, onDone, { kicker: 'Listen — what does it mean?', prompt, label: (w) => w.en });
}

export function meaning(ctx, word, onDone) {
  if (ctx.settings.autoplay) setTimeout(() => ctx.say(word.tr), 300);
  const prompt = h('div', { class: 'prompt' },
    h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr, ' ', playButton(ctx, word.tr)));
  return choice(ctx, word, onDone, { kicker: 'What does this mean?', prompt, label: (w) => w.en });
}

export function produce(ctx, word, onDone) {
  const prompt = h('div', { class: 'prompt' }, h('p', { class: 'prompt-word en' }, word.en));
  return choice(ctx, word, onDone, {
    kicker: `Choose the ${ctx.lang.name}`, prompt, label: (w) => w.tr, optionLang: ctx.lang.code,
  });
}

export function type(ctx, word, onDone) {
  const { lang } = ctx;
  const input = h('input', {
    class: 'answer-input', type: 'text', lang: lang.code, autocomplete: 'off', autocapitalize: 'off',
    autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'done', 'aria-label': `Your answer in ${lang.name}`,
    placeholder: `Type in ${lang.name}…`,
  });
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
  const submit = h('button', { type: 'submit', class: 'btn primary wide' }, 'Check');
  let result = null;

  function insert(c) {
    const s = input.selectionStart ?? input.value.length;
    const e = input.selectionEnd ?? s;
    input.value = input.value.slice(0, s) + c + input.value.slice(e);
    input.focus();
    input.setSelectionRange(s + c.length, s + c.length);
  }

  const chars = h('div', { class: 'char-row', 'aria-label': 'Special letters' },
    lang.specialChars.map((c) => h('button', { type: 'button', class: 'char', lang: lang.code, onclick: () => insert(c) }, c)));

  const finish = once(() => onDone(result));

  function check() {
    const v = input.value;
    if (!v.trim()) { input.focus(); return; }
    const accepted = [word.tr, ...(word.alt || [])];
    const n = lang.normalize(v);
    let rating;
    let extra = null;
    if (accepted.some((a) => lang.normalize(a) === n)) {
      rating = GOOD;
    } else if (accepted.some((a) => lang.stripDiacritics(a) === lang.stripDiacritics(v))) {
      rating = HARD;
      const diff = alignDiff(lang.normalize(word.tr), n);
      extra = h('div', null,
        h('p', { class: 'hint' }, 'So close! Only the special letters were off:'),
        h('p', { class: 'diff', lang: lang.code }, diff.map((d) => h('span', { class: d.ok ? 'ok' : 'miss' }, d.ch))));
    } else {
      rating = AGAIN;
      extra = h('p', { class: 'hint' }, 'You wrote: ', h('q', { lang: lang.code }, v));
    }
    result = { correct: rating !== AGAIN, rating };
    input.readOnly = true;
    chars.hidden = true;
    set(feedback, reveal(ctx, word, rating !== AGAIN, extra));
    ctx.say(word.tr);
    set(submit, 'Continue', icon('arrow', 18));
  }

  const form = h('form', {
    class: 'type-form',
    onsubmit: (e) => { e.preventDefault(); if (result) finish(); else check(); },
  }, input, chars, feedback, submit);

  setTimeout(() => input.focus({ preventScroll: true }), 50);

  return h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, `Write it in ${lang.name}`),
    h('div', { class: 'prompt' }, h('p', { class: 'prompt-word en' }, word.en)),
    form,
  );
}

export function speak(ctx, word, onDone) {
  let best = 0;
  const actions = h('div', { class: 'actions split' });
  const finish = once((r) => onDone(r));
  const rate = () => (best >= 0.8 ? GOOD : best >= 0.55 ? HARD : AGAIN);

  const cont = continueButton(() => finish({ correct: rate() !== AGAIN, rating: rate() }));
  cont.disabled = true;
  actions.append(
    h('button', { type: 'button', class: 'btn ghost', onclick: () => finish({ skipped: true }) }, 'Can’t speak now'),
    cont,
  );

  const practice = speakPractice(ctx, word, {
    onResult: ({ best: b }) => { best = b; cont.disabled = false; },
    onOverride: () => finish({ correct: true, rating: GOOD }),
  });

  if (ctx.settings.autoplay) setTimeout(() => ctx.say(word.tr), 300);

  return h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, 'Say it out loud'),
    h('div', { class: 'prompt' },
      h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr, ' ', playButton(ctx, word.tr), playButton(ctx, word.tr, { slow: true })),
      h('p', { class: 'prompt-sub' }, word.en)),
    pronunciationPanel(ctx, word, { compact: true }),
    practice,
    actions,
  );
}

export function flashcard(ctx, word, onDone) {
  const back = h('div', { class: 'card-back', hidden: true });
  const actions = h('div', { class: 'actions' });
  let shown = false;
  const finish = once((rating) => { unbind(); onDone({ correct: rating !== AGAIN, rating }); });

  const ratings = [
    [AGAIN, 'Again', 'bad'], [HARD, 'Hard', 'warn'], [GOOD, 'Good', 'good'], [EASY, 'Easy', 'easy'],
  ];

  function show() {
    if (shown) return;
    shown = true;
    back.hidden = false;
    set(back, 
      h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr, ' ', playButton(ctx, word.tr)),
      pronunciationPanel(ctx, word, { compact: true }),
    );
    ctx.say(word.tr);
    set(actions, 
      h('p', { class: 'hint center' }, 'How well did you remember it?'),
      h('div', { class: 'rating-row' }, ratings.map(([r, label, cls], i) =>
        h('button', { type: 'button', class: `rate ${cls}`, onclick: () => finish(r) },
          h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(i + 1)), label))),
    );
  }

  const unbind = bindKeys({
    ' ': show, Enter: show,
    1: () => shown && finish(AGAIN), 2: () => shown && finish(HARD), 3: () => shown && finish(GOOD), 4: () => shown && finish(EASY),
  });
  ctx.onCleanup(unbind);
  actions.append(h('button', { type: 'button', class: 'btn primary wide', onclick: show }, 'Show answer'));

  return h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, `Do you remember the ${ctx.lang.name}?`),
    h('div', { class: 'prompt' }, h('p', { class: 'prompt-word en' }, word.en)),
    back,
    actions,
  );
}

/** Teaching card used when a word is first introduced. */
export function intro(ctx, word, onDone, meta = {}) {
  if (ctx.settings.autoplay) setTimeout(() => ctx.say(word.tr), 300);
  const finish = once(() => { unbind(); onDone({ intro: true }); });
  const unbind = bindKeys({ Enter: finish });
  ctx.onCleanup(unbind);

  return h('div', { class: 'exercise intro' },
    h('p', { class: 'kicker' }, `New word ${meta.index + 1} of ${meta.total}`),
    h('div', { class: 'word-hero' },
      h('h2', { class: 'hero-tr', lang: ctx.lang.code }, word.tr),
      h('p', { class: 'hero-en' }, word.en),
    ),
    audioControls(ctx, word.tr),
    pronunciationPanel(ctx, word),
    exampleBlock(ctx, word),
    word.note ? h('p', { class: 'note' }, word.note) : null,
    h('details', { class: 'try-speak' },
      h('summary', null, icon('mic', 16), 'Try saying it'),
      speakPractice(ctx, word)),
    h('div', { class: 'actions' }, continueButton(finish, meta.index + 1 === meta.total ? 'Start quick check' : 'Next word')),
  );
}

export const EXERCISES = { listen, meaning, produce, type, speak, flashcard, intro };
