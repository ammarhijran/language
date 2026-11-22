// Exercise types. Each takes (ctx, word, onDone, meta) and returns an element.
// onDone receives { correct, rating } (rating uses the SRS scale) or { skipped: true }.
// 'build' (the sentence builder) takes its sentence from meta.sentence, or builds one from the phrase.
import { h, icon, bindKeys, shuffle, pick, set } from './ui.js';
import {
  playButton, audioControls, pronunciationPanel, speakPractice, exampleBlock, readingLine, registerBlock, regBadge,
  praiseLine, diffLine, sayLater,
} from './components.js';
import { similarity } from './compare.js';
import { AGAIN, HARD, GOOD, EASY } from './srs.js';
import { phraseSentence, checkOrder, tileKey } from './sentences.js';

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
    h('p', { class: 'verdict' }, icon(correct ? 'check' : 'x', 18), correct ? praiseLine(ctx.lang, pick(ctx.lang.praise)) : 'Not quite — here’s the answer:'),
    h('div', { class: 'reveal-word' },
      playButton(ctx, word.tr),
      h('div', null,
        h('p', null, h('span', { class: 'tr', lang: ctx.lang.code }, word.tr), h('span', { class: 'en' }, ` — ${word.en}`)),
        readingLine(ctx, word, 'reading small'),
        h('p', { class: 'respell small' }, a.respell),
      ),
    ),
    registerBlock(ctx, word, { compact: true }),
    extra,
  );
}

function continueButton(onClick, label = 'Continue') {
  return h('button', { type: 'button', class: 'btn primary wide continue', onclick: onClick }, label, icon('arrow', 18));
}

function choice(ctx, word, onDone, { kicker, prompt, label, optionLang, render }) {
  const opts = pickOptions(ctx.lang, word, label);
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
  const actions = h('div', { class: 'actions' });
  let correct = false;
  let answered = false;

  const buttons = opts.map((w, i) =>
    h('button', { type: 'button', class: 'option', lang: optionLang, onclick: () => answer(i) },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(i + 1)),
      render ? render(w) : h('span', { class: 'option-label' }, label(w))));

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
  sayLater(ctx, word.tr);
  const prompt = h('div', { class: 'prompt listen-prompt' },
    h('button', { type: 'button', class: 'big-play', 'aria-label': 'Play the word again', onclick: () => ctx.say(word.tr) }, icon('volume', 40)),
    h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(word.tr, { slow: true }) }, icon('slow', 14), 'Slowly'),
  );
  return choice(ctx, word, onDone, { kicker: 'Listen — what does it mean?', prompt, label: (w) => w.en });
}

export function meaning(ctx, word, onDone) {
  if (ctx.settings.autoplay) sayLater(ctx, word.tr);
  const prompt = h('div', { class: 'prompt' },
    h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr, ' ', playButton(ctx, word.tr)),
    readingLine(ctx, word));
  return choice(ctx, word, onDone, { kicker: 'What does this mean?', prompt, label: (w) => w.en });
}

export function produce(ctx, word, onDone) {
  const prompt = h('div', { class: 'prompt' }, h('p', { class: 'prompt-word en' }, word.en));
  return choice(ctx, word, onDone, {
    kicker: `Choose the ${ctx.lang.name}`, prompt, label: (w) => w.tr,
    // Show the reading (kana / transliteration) under the script for beginners.
    render: (w) => h('span', { class: 'option-label' },
      h('span', { lang: ctx.lang.code }, w.tr),
      ctx.lang.reading(w) ? h('small', { class: 'option-reading' }, ctx.lang.reading(w)) : null),
  });
}

export function type(ctx, word, onDone) {
  const { lang } = ctx;
  const input = h('input', {
    class: 'answer-input', type: 'text', lang: lang.code, autocomplete: 'off', autocapitalize: 'off',
    autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'done', 'aria-label': `Your answer in ${lang.name}`,
    placeholder: lang.typingHint, dir: 'auto',
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

  const chars = h('div', { class: 'char-row', 'aria-label': 'Special letters', hidden: !lang.specialChars.length },
    lang.specialChars.map((c) => h('button', { type: 'button', class: 'char', lang: lang.code, onclick: () => insert(c) }, c)));

  const finish = once(() => onDone(result));

  function check() {
    const v = input.value;
    if (!v.trim()) { input.focus(); return; }
    // Accepted forms include romanisations (rōmaji, transliteration) for scripts
    // that are hard to type on a phone keyboard.
    const accepted = lang.acceptedAnswers(word);
    const n = lang.normalize(v);
    let rating;
    let extra = null;
    // Kana and rōmaji forms can both be close: show the one nearest to what was
    // typed, so “kohi” is marked against “koohii”, not as an all-wrong コーヒー.
    const close = accepted
      .filter((a) => lang.stripDiacritics(a) === lang.stripDiacritics(v))
      .sort((a, b) => similarity(lang.normalize(b), n) - similarity(lang.normalize(a), n))[0];
    if (accepted.some((a) => lang.normalize(a) === n)) {
      rating = GOOD;
    } else if (close) {
      rating = HARD;
      // The accepted answer as written (its own script, spaces and marks), letters to fix marked.
      const diff = lang.diffAsWritten(close, n);
      const latin = /^[\p{Script=Latin}\s'ʾʿ’-]+$/u.test(close);
      extra = h('div', null,
        h('p', { class: 'hint' }, lang.almostHint),
        diffLine(diff, { lang: latin ? null : lang.code }));
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

  if (ctx.settings.autoplay) sayLater(ctx, word.tr);

  return h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, 'Say it out loud'),
    h('div', { class: 'prompt' },
      h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr, ' ', playButton(ctx, word.tr), playButton(ctx, word.tr, { slow: true })),
      readingLine(ctx, word),
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
      readingLine(ctx, word),
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
  if (ctx.settings.autoplay) sayLater(ctx, word.tr);
  const finish = once(() => { unbind(); onDone({ intro: true }); });
  const unbind = bindKeys({ Enter: finish });
  ctx.onCleanup(unbind);

  return h('div', { class: 'exercise intro' },
    h('p', { class: 'kicker' }, `New word ${meta.index + 1} of ${meta.total}`),
    h('div', { class: 'word-hero' },
      h('h2', { class: 'hero-tr', lang: ctx.lang.code }, word.tr),
      readingLine(ctx, word),
      h('p', { class: 'hero-en' }, word.en, ' ', regBadge(word)),
    ),
    audioControls(ctx, word.tr),
    pronunciationPanel(ctx, word),
    registerBlock(ctx, word),
    exampleBlock(ctx, word),
    word.note ? h('p', { class: 'note' }, word.note) : null,
    h('details', { class: 'try-speak' },
      h('summary', null, icon('mic', 16), 'Try saying it'),
      speakPractice(ctx, word)),
    h('div', { class: 'actions split intro-actions' },
      h('button', {
        type: 'button', class: 'btn', title: 'Skip this word — it will only come back for a check in about a month',
        onclick: () => { unbind(); onDone({ intro: true, known: true }); },
      }, icon('check', 18), 'Already learned'),
      continueButton(finish, meta.index + 1 === meta.total ? 'Start quick check' : 'Next word')),
  );
}

// ---------- Sentence builder ----------

/** The tiles in a random order that isn't already the answer (when the words allow one). */
function scramble(lang, tokens) {
  const tiles = tokens.map((text) => ({ text, key: tileKey(lang, text) }));
  let out = shuffle(tiles);
  for (let n = 0; n < 12 && out.every((t, i) => t.key === tiles[i].key); n++) out = shuffle(tiles);
  return out;
}

/** After checking: the sentence as written, its reading and meaning, and (when wrong) the learner's order. */
function sentenceReveal(ctx, s, correct, mine) {
  const { lang } = ctx;
  return h('div', { class: `reveal ${correct ? 'good' : 'bad'}` },
    h('p', { class: 'verdict' }, icon(correct ? 'check' : 'x', 18),
      correct ? praiseLine(lang, pick(lang.praise)) : 'Not quite — here’s the right order:'),
    h('div', { class: 'reveal-word' },
      playButton(ctx, s.audioText),
      h('div', null,
        h('p', { class: 'tr', lang: lang.code }, s.display || s.text),
        s.reading ? h('p', { class: 'reading small' }, s.reading) : null,
        h('p', { class: 'en' }, s.en))),
    correct ? null : h('p', { class: 'hint build-mine' }, 'Your order: ', h('q', { lang: lang.code }, mine.join(' '))),
  );
}

/**
 * Sentence builder: the English meaning (audio on request) and the sentence's
 * words as shuffled tiles to tap into the answer line. `meta.sentence` comes
 * from sentences.js; in a review it is built from the phrase being reviewed.
 */
export function build(ctx, word, onDone, meta = {}) {
  const { lang } = ctx;
  const s = meta.sentence || phraseSentence(lang, word);
  if (!s) return produce(ctx, word, onDone);
  const tiles = scramble(lang, s.tokens);
  const placed = []; // indexes into tiles, in the learner's order
  let lineEls = [];
  let result = null;

  const finish = once((r) => { unbind(); onDone(r); });
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
  const empty = h('span', { class: 'build-empty' }, 'Tap the words in order');
  const line = h('div', { class: 'build-line', role: 'group', 'aria-label': 'Your sentence', dir: lang.dir }, empty);
  const slots = tiles.map((t, i) => h('button', { type: 'button', class: 'tile', lang: lang.code, onclick: () => place(i, true) },
    i < 9 ? h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(i + 1)) : null,
    t.text));
  const bank = h('div', { class: 'build-bank', role: 'group', 'aria-label': 'Words to use', dir: lang.dir }, slots);
  const checkBtn = h('button', { type: 'button', class: 'btn primary', onclick: check }, 'Check');
  const actions = h('div', { class: 'actions split' },
    h('button', { type: 'button', class: 'btn ghost', onclick: () => finish({ skipped: true }) }, 'Skip'),
    checkBtn);

  const hint = (text) => { if (!result) set(feedback, text ? h('p', { class: 'hint' }, text) : null); };

  function renderLine() {
    lineEls = placed.map((i, pos) => h('button', { type: 'button', class: 'tile', lang: lang.code, onclick: () => unplace(pos, true) }, tiles[i].text));
    set(line, lineEls.length ? lineEls : empty);
  }

  function place(i, fromTile = false) {
    if (result || placed.includes(i)) return;
    const hadFocus = fromTile || document.activeElement === slots[i];
    placed.push(i);
    // The tile leaves an empty slot in the bank, so the other tiles don't jump.
    slots[i].classList.add('used');
    slots[i].disabled = true;
    slots[i].setAttribute('aria-hidden', 'true');
    renderLine();
    hint(null);
    // Its button is gone from view: focus the next word left in the bank, or Check once all are placed.
    if (hadFocus || placed.length === tiles.length) {
      const left = slots.filter((b, j) => !placed.includes(j));
      (left.find((b) => slots.indexOf(b) > i) || left[left.length - 1] || checkBtn).focus({ preventScroll: true });
    }
  }

  function unplace(pos, fromTile = false) {
    if (result || pos < 0) return;
    const hadFocus = fromTile || lineEls.includes(document.activeElement);
    const [i] = placed.splice(pos, 1);
    slots[i].classList.remove('used');
    slots[i].disabled = false;
    slots[i].removeAttribute('aria-hidden');
    renderLine();
    hint(null);
    if (hadFocus) (lineEls[pos] || lineEls[pos - 1] || slots[i]).focus({ preventScroll: true });
  }

  function check() {
    if (result) return;
    const left = tiles.length - placed.length;
    if (left) { hint(`Use all the words first — ${left} left.`); return; }
    const mine = placed.map((i) => tiles[i].text);
    const { correct, marks } = checkOrder(lang, s, mine);
    result = { correct, rating: correct ? GOOD : AGAIN };
    lineEls.forEach((b, pos) => { b.disabled = true; b.classList.add(marks[pos] ? 'correct' : 'wrong'); });
    bank.hidden = true;
    set(feedback, sentenceReveal(ctx, s, correct, mine));
    ctx.say(s.audioText);
    const btn = continueButton(() => finish(result));
    set(actions, btn);
    btn.focus({ preventScroll: true });
  }

  const keys = {
    Enter: () => (result ? finish(result) : check()),
    Backspace: () => unplace(placed.length - 1),
  };
  slots.slice(0, 9).forEach((b, i) => { keys[i + 1] = () => place(i); });
  const unbind = bindKeys(keys);
  ctx.onCleanup(unbind);

  return h('div', { class: 'exercise build' },
    h('p', { class: 'kicker' }, 'Put the words in order'),
    h('div', { class: 'prompt build-prompt' },
      h('p', { class: 'prompt-word en build-en' }, s.en, ' ', regBadge(s)),
      // Labelled buttons, not playButton(): its label would read the answer out to screen readers.
      h('div', { class: 'build-audio' },
        h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(s.audioText) }, icon('volume', 14), 'Listen'),
        h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(s.audioText, { slow: true }) }, icon('slow', 14), 'Slowly'))),
    line,
    bank,
    feedback,
    actions,
  );
}

export const EXERCISES = { listen, meaning, produce, type, speak, flashcard, intro, build };
