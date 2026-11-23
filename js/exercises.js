// Exercise types. Each takes (ctx, word, onDone, meta) and returns an element.
// onDone receives { correct, rating } (rating uses the SRS scale) or { skipped: true }.
// 'build' (the sentence builder) takes its sentence from meta.sentence, or builds one from the phrase.
import { h, icon, bindKeys, shuffle, pick, set } from './ui.js';
import {
  playButton, audioControls, pronunciationPanel, speakPractice, exampleBlock, readingLine, registerBlock, regBadge,
  praiseLine, diffLine, sayLater, readingText, scriptLang,
} from './components.js';
import { checkTyped, overlaps } from './compare.js';
import { AGAIN, HARD, GOOD, EASY } from './srs.js';
import { phraseSentence, checkOrder, tileKey, acceptedOrders } from './sentences.js';
import { canSpeak } from './speech.js';

function once(fn) {
  let called = false;
  return (...args) => { if (!called) { called = true; fn(...args); } };
}

// ---------- Answer sheet, feedback and haptics ----------
//
// Every card's main actions sit in a sheet docked at the bottom of the screen
// (css/session.css), so they are always in reach: before the answer, the
// card's own buttons (Next word, Check, Show answer…) on a plain bar; after it,
// a green or red sheet with the verdict, the right answer and Continue, which
// takes the focus. The session is padded by the sheet's height (--sheet-h) so
// the end of the card can always scroll clear of it.

const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A very short buzz on a wrong answer where the device can (Android); a no-op elsewhere. */
export function buzzWrong() {
  if (reducedMotion()) return;
  try { globalThis.navigator?.vibrate?.(35); } catch { /* not allowed here */ }
}

/** Visually hidden, polite: says right or wrong (and the answer) while focus moves to Continue. */
function liveRegion() {
  return h('p', { class: 'session-sr', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
}

/** Fill the live region a moment after the focus moves, so both are read out. */
function announce(ctx, region, ...parts) {
  const t = setTimeout(() => set(region, ...parts), 150);
  ctx.onCleanup(() => clearTimeout(t));
}

/** What the live region says about an entry: the word in its own language, then its meaning. */
const spoken = (ctx, tr, en) => [h('span', { lang: ctx.lang.code }, tr), ` — ${en}`];

/**
 * Pad the session by the sheet's height, and when `keep` is given (the options
 * answered, the typed word…), scroll just enough to show it above the sheet,
 * without pushing its top under the session head.
 */
function fitSheet(el, keep) {
  if (!el.isConnected || typeof innerHeight !== 'number') return;
  const height = el.offsetHeight;
  el.closest('.session')?.style.setProperty('--sheet-h', `${height}px`);
  const targets = [keep].flat().filter((k) => k?.isConnected);
  if (!targets.length) return;
  const head = document.querySelector('.session-head')?.getBoundingClientRect().bottom || 0;
  const winTop = head + 8;
  const winBottom = innerHeight - height - 12;
  const rects = targets.map((k) => k.getBoundingClientRect());
  const top = Math.min(...rects.map((r) => r.top));
  const bottom = Math.max(...rects.map((r) => r.bottom));
  const over = bottom - winBottom;
  if (over <= 0) return;
  // All of them if they fit, else as much as fits from the top-most down; the
  // first one (the option picked, the mic) is always shown whole.
  const [first] = rects;
  const by = Math.min(Math.max(Math.min(over, top - winTop), first.bottom - winBottom), first.top - winTop);
  if (by > 0) window.scrollBy({ top: by, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

/**
 * The docked sheet. `tone`: 'neutral' (a card's actions), 'good', 'bad' or
 * 'warn' (after an answer). Returns the element; `refit(keep)` after changing
 * what it holds.
 */
function sheet(ctx, tone, children, keep) {
  const el = h('div', { class: `answer-sheet ${tone}` }, children);
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => fitSheet(el)) : null;
  ro?.observe(el);
  el.refit = (k) => { if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => fitSheet(el, k)); };
  /** Turn a card's action bar into the answer sheet. */
  el.show = (t, kids, k) => { el.className = `answer-sheet ${t}`; set(el, kids); el.refit(k); };
  el.refit(keep);
  ctx.onCleanup(() => {
    ro?.disconnect();
    if (el.isConnected) el.closest('.session')?.style.removeProperty('--sheet-h');
  });
  return el;
}

/** After an answer: the verdict and the right answer (scrolls if long), then Continue. */
const answerParts = (body, button) => [h('div', { class: 'sheet-body' }, body), h('div', { class: 'sheet-actions' }, button)];
const answerSheet = (ctx, tone, body, button, keep) => sheet(ctx, tone, answerParts(body, button), keep);

/** ✓ / ✕ inside an answered option, so right and wrong aren't told by colour alone. */
const mark = (right) => h('span', { class: `mark ${right ? 'yes' : 'no'}` }, icon(right ? 'check' : 'x', 16));

/**
 * Pick 4 options including the target, preferring the same category. A word
 * whose meaning overlaps the target's (“sorry” next to “sorry; excuse me”) is
 * never offered: it would be a second right answer.
 */
export function pickOptions(lang, word, label, n = 4) {
  const same = shuffle(lang.wordsIn(word.cat).filter((w) => w.id !== word.id));
  const others = shuffle(lang.words.filter((w) => w.cat !== word.cat));
  const seen = new Set([label(word)]);
  const out = [word];
  for (const w of [...same, ...others]) {
    if (out.length >= n) break;
    const l = label(w);
    if (seen.has(l) || overlaps(w.en, word.en)) continue;
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
      playButton(ctx, word),
      h('div', null,
        h('p', null, h('span', { class: 'tr', lang: ctx.lang.code }, word.tr), h('span', { class: 'en' }, ` — ${word.en}`)),
        readingLine(ctx, word, 'reading small', { full: true }),
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

function choice(ctx, word, onDone, { kicker, prompt, label, optionLang, render, options = null, cls = '', wrong = AGAIN }) {
  const opts = options || pickOptions(ctx.lang, word, label);
  const live = liveRegion();
  let correct = false;
  let answered = false;

  const buttons = opts.map((w, i) =>
    h('button', { type: 'button', class: 'option', lang: optionLang, onclick: () => answer(i) },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(i + 1)),
      render ? render(w) : h('span', { class: 'option-label' }, label(w))));

  const finish = once(() => { unbind(); onDone({ correct, rating: correct ? GOOD : wrong }); });

  function answer(i) {
    if (answered) return;
    answered = true;
    correct = opts[i].id === word.id;
    const right = buttons[opts.findIndex((o) => o.id === word.id)];
    buttons.forEach((b, j) => {
      b.disabled = true;
      if (b === right) { b.classList.add('correct'); b.append(mark(true)); }
      else if (j === i) { b.classList.add('wrong'); b.append(mark(false)); }
    });
    buttons[i].classList.add('picked');
    el.classList.add('answered');
    ctx.onAnswer?.({ correct, rating: correct ? GOOD : wrong });
    if (!correct) buzzWrong();
    const btn = continueButton(finish);
    el.append(answerSheet(ctx, correct ? 'good' : 'bad', reveal(ctx, word, correct), btn, [buttons[i], right]));
    announce(ctx, live, correct ? 'Right! ' : 'Not quite. The answer: ', spoken(ctx, word.tr, word.en));
    ctx.say(word, { auto: true });
    btn.focus({ preventScroll: true });
  }

  const unbind = bindKeys({
    ...Object.fromEntries(opts.slice(0, 9).map((_, i) => [i + 1, () => answer(i)])),
    Enter: () => { if (answered) finish(); },
  });
  ctx.onCleanup(unbind);

  const el = h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, kicker),
    prompt,
    h('div', { class: `options ${cls}`.trim() }, buttons),
    live,
  );
  return el;
}

export function listen(ctx, word, onDone) {
  // Without a voice for the language there is nothing to listen to: read it instead.
  if (canSpeak(ctx.lang.speech(word).lang) === false) return meaning(ctx, word, onDone);
  sayLater(ctx, word);
  const prompt = h('div', { class: 'prompt listen-prompt' },
    h('button', { type: 'button', class: 'big-play', 'aria-label': 'Play the word again', onclick: () => ctx.say(word) }, icon('volume', 40)),
    h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(word, { slow: true }) }, icon('slow', 14), 'Slowly'),
  );
  return choice(ctx, word, onDone, { kicker: 'Listen — what does it mean?', prompt, label: (w) => w.en });
}

export function meaning(ctx, word, onDone) {
  if (ctx.settings.autoplay) sayLater(ctx, word);
  const prompt = h('div', { class: 'prompt' },
    h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr, ' ', playButton(ctx, word)),
    readingLine(ctx, word));
  return choice(ctx, word, onDone, { kicker: 'What does this mean?', prompt, label: (w) => w.en });
}

/**
 * How an entry is read, in Latin letters: rōmaji (Japanese), the
 * transliteration (Arabic), or the “say it like” respelling of its syllables
 * (Ukrainian). null when the pack has none for it.
 */
export function readingLabel(lang, w) {
  const full = lang.fullReading?.(w);
  if (full) return String(full).split(' · ').pop();
  try {
    const parts = lang.analyze(w).words.map((x) => x.syllables.map((y) => y.respell || '').join('-'));
    return parts.length && parts.every((x) => x.replace(/-/g, '')) ? parts.join(' ') : null;
  } catch { return null; }
}

/** The entry and three others of about the same length and number of words, each read differently. */
export function scriptOptions(lang, word, n = 4) {
  const own = readingLabel(lang, word);
  const count = (w) => w.tr.trim().split(/\s+/).length;
  const len = (w) => [...w.tr].length;
  const seen = new Set([own]);
  const near = lang.words
    .filter((w) => w.id !== word.id && count(w) === count(word))
    .sort((a, b) => Math.abs(len(a) - len(word)) - Math.abs(len(b) - len(word)))
    .slice(0, 24);
  const picks = [];
  for (const w of shuffle(near)) {
    const r = readingLabel(lang, w);
    if (!r || seen.has(r)) continue;
    seen.add(r);
    picks.push(w);
    if (picks.length === n - 1) break;
  }
  return shuffle([word, ...picks]);
}

/** Read the script: the word as written, no audio and no reading — pick how it is read. */
export function script(ctx, word, onDone) {
  const { lang } = ctx;
  const options = readingLabel(lang, word) ? scriptOptions(lang, word) : [];
  if (options.length < 3) return meaning(ctx, word, onDone);
  const prompt = h('div', { class: 'prompt' }, h('p', { class: 'prompt-word script-word', lang: lang.code }, word.tr));
  return choice(ctx, word, onDone, { kicker: 'How is this read?', prompt, label: (w) => readingLabel(lang, w), options });
}

/**
 * What a "where is the stress?" question needs: the syllables of a one-word
 * entry and which of them is stressed. null for phrases, one-syllable words
 * and words whose stress the pack does not mark.
 */
export function stressItem(lang, w) {
  if (/\s/.test(w.tr.trim())) return null;
  try {
    const a = lang.analyze(w);
    if (a.words.length !== 1 || a.stressMarked === false) return null;
    const { syllables, stressIndex } = a.words[0];
    if (syllables.length < 2 || !Number.isInteger(stressIndex) || stressIndex < 0 || stressIndex >= syllables.length) return null;
    return { syllables: syllables.map((x) => x.text), stressed: stressIndex };
  } catch { return null; }
}

/**
 * Word stress: the word in syllables, with no audio and no reading — tap the
 * syllable that is stressed. The answer then shows and says the word. For
 * languages where stress is free and unwritten, and the phone's voice does
 * not always get it right (Ukrainian).
 */
export function stress(ctx, word, onDone) {
  const item = stressItem(ctx.lang, word);
  if (!item) return meaning(ctx, word, onDone);
  const prompt = h('div', { class: 'prompt' },
    h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr),
    h('p', { class: 'prompt-gloss' }, word.en));
  return choice(ctx, word, onDone, {
    // Arabic syllables are shown in transliteration, so they are not set in the Arabic font.
    kicker: 'Which syllable is stressed?', prompt, cls: 'syllables', optionLang: scriptLang(item.syllables.join('')) || (ctx.lang.dir === 'rtl' ? null : ctx.lang.code),
    // Knowing the word but not its stress is a slip, not a forgotten word: in a
    // review it comes back sooner (Hard) without starting again from the first step.
    wrong: HARD,
    // The stressed syllable stands for the entry itself: that is what choice() counts as right.
    options: item.syllables.map((text, i) => ({ id: i === item.stressed ? word.id : `${word.id}#${i}`, text })),
    label: (o) => o.text,
  });
}

export function produce(ctx, word, onDone) {
  const prompt = h('div', { class: 'prompt' }, h('p', { class: 'prompt-word en' }, word.en));
  return choice(ctx, word, onDone, {
    kicker: `Choose the ${ctx.lang.name}`, prompt, label: (w) => w.tr,
    // Show the reading (kana / transliteration) under the script for beginners.
    render: (w) => h('span', { class: 'option-label' },
      h('span', { lang: ctx.lang.code }, w.tr),
      readingText(ctx.lang.reading(w), 'option-reading', 'small')),
  });
}

export function type(ctx, word, onDone) {
  const { lang } = ctx;
  const input = h('input', {
    class: 'answer-input', type: 'text', lang: lang.code, autocomplete: 'off', autocapitalize: 'off',
    autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'done', 'aria-label': `Your answer in ${lang.name}`,
    placeholder: lang.typingHint, dir: 'auto',
  });
  const live = liveRegion();
  // Check stays under the field (a bar at the bottom would sit behind the
  // phone's keyboard); the verdict and Continue then come up in the sheet.
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

  const finish = once(() => { unbind(); onDone(result); });

  function check() {
    const v = input.value;
    if (!v.trim()) { input.focus(); return; }
    // Accepted forms include romanisations (rōmaji, transliteration) for scripts
    // that are hard to type on a phone keyboard; a different word of the course
    // is never “almost” right (compare.js checkTyped).
    const verdict = checkTyped(lang, word, v);
    const rating = verdict.verdict === 'good' ? GOOD : verdict.verdict === 'almost' ? HARD : AGAIN;
    const right = rating !== AGAIN;
    // A slip (special letters, spaces) still grows the interval less, but doesn't lower ease.
    result = { correct: right, rating, ...(verdict.slip ? { slip: true } : {}) };
    input.readOnly = true;
    input.classList.add(right ? 'right' : 'wrong');
    chars.hidden = true;
    submit.hidden = true;
    el.classList.add('answered');
    ctx.onAnswer?.(result);
    if (!right) buzzWrong();
    const btn = continueButton(finish);
    el.append(answerSheet(ctx, right ? 'good' : 'bad', reveal(ctx, word, right, typedNote(lang, word, verdict, v)), btn, input));
    announce(ctx, live, right ? 'Right! ' : 'Not quite. The answer: ', spoken(ctx, word.tr, word.en));
    ctx.say(word, { auto: true });
    // Moving focus off the field also closes the phone's keyboard.
    btn.focus({ preventScroll: true });
  }

  const form = h('form', {
    class: 'type-form',
    onsubmit: (e) => { e.preventDefault(); if (result) finish(); else check(); },
  }, input, chars, submit);

  // Enter continues from anywhere once checked (in the field, the form does it).
  const unbind = bindKeys({ Enter: () => { if (result) finish(); } });
  ctx.onCleanup(unbind);
  const t = setTimeout(() => { if (!result) input.focus({ preventScroll: true }); }, 50);
  ctx.onCleanup(() => clearTimeout(t));

  const el = h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, `Write it in ${lang.name}`),
    h('div', { class: 'prompt' }, h('p', { class: 'prompt-word en' }, word.en)),
    form,
    live,
  );
  return el;
}

/** The hint under a typed answer: which word it was, the spacing, or the letters to fix. */
function typedNote(lang, word, v, typed) {
  const q = (text, l = lang.code) => h('q', { lang: l }, text);
  const roman = (text) => (/^[\p{Script=Latin}\s'ʾʿ’-]+$/u.test(text) ? null : lang.code);
  const pairName = (p) => (p.dialect ? `the ${p.dialect} form` : p.reg ? `the ${p.reg} form` : 'another way to say it');
  switch (v.kind) {
    case 'also':
      return h('p', { class: 'hint' }, 'Also right! ',
        v.other.id === word.id ? [q(v.form), ` is ${pairName(word.pair || {})}. `] : [q(v.other.tr), ` means “${v.other.en}” too. `],
        'This card’s word is ', q(word.tr), '.');
    case 'spelling':
      return h('p', { class: 'hint' }, 'Right — the course spells it ', q(v.form, roman(v.form)), '.');
    case 'spaces':
      return h('p', { class: 'hint' }, 'Almost! Check the spaces: ', q(v.form, roman(v.form)));
    case 'letters':
    case 'loose':
      // The accepted answer as written (its own script, spaces and marks), letters to fix marked.
      return h('div', null,
        h('p', { class: 'hint' }, v.kind === 'loose' ? 'Almost! The usual spelling is:' : lang.almostHint),
        diffLine(lang.diffAsWritten(v.form, lang.normalize(typed)), { lang: roman(v.form) }));
    case 'other': {
      const other = v.pair ? { tr: v.form, en: v.other.pair.en || v.other.en } : v.other;
      return h('p', { class: 'hint' }, 'That’s ', q(other.tr), ` — “${other.en}”, a different word. You wrote: `, q(typed, roman(typed)));
    }
    default:
      // What was typed, in its own script (Latin quotes stay Latin in Arabic).
      return h('p', { class: 'hint' }, 'You wrote: ', q(typed, roman(typed)));
  }
}

// Speech scores: GOOD from 85 %, HARD from 70 %. A different word or the
// opposite meaning scores at most 50 % (compare.js scoreWord), so it never counts.
export const SPEAK_GOOD = 0.85;
export const SPEAK_HARD = 0.7;
export const speakRating = (score) => (score >= SPEAK_GOOD ? GOOD : score >= SPEAK_HARD ? HARD : AGAIN);

export function speak(ctx, word, onDone) {
  let best = 0;
  const live = liveRegion();
  const finish = once((r) => { unbind(); onDone(r); });
  const rate = () => speakRating(best);

  const cont = continueButton(() => finish({ correct: rate() !== AGAIN, rating: rate() }));
  cont.disabled = true;
  // The best score so far, on the sheet next to Continue (the attempt's details stay on the card).
  const verdict = h('p', { class: 'verdict', hidden: true });
  const bar = sheet(ctx, 'neutral', [
    verdict,
    h('div', { class: 'actions split' },
      h('button', { type: 'button', class: 'btn ghost', onclick: () => finish({ skipped: true }) }, 'Can’t speak now'),
      cont),
  ]);

  const practice = speakPractice(ctx, word, {
    onResult: ({ best: b, attempts = 1 }) => {
      best = b;
      cont.disabled = false;
      const r = rate();
      const [tone, text] = r === GOOD ? ['good', 'Well said!'] : r === HARD ? ['warn', 'Almost there'] : ['bad', 'Not yet — try again'];
      const score = `${attempts > 1 ? 'best ' : ''}${Math.round(best * 100)}%`;
      bar.className = `answer-sheet ${tone}`;
      set(verdict, icon(r === AGAIN ? 'x' : 'check', 18), h('span', null, text, ' ', h('small', null, `· ${score}`)));
      verdict.hidden = false;
      if (r === AGAIN) buzzWrong();
      announce(ctx, live, `${text} ${score}.`);
      // Show the score, but keep the mic in view to try again.
      bar.refit([practice.querySelector?.('.mic-btn'), practice.querySelector?.('.speak-result')]);
      // Said well: the focus moves to Continue (Enter / Space go on). Otherwise
      // it stays on the mic, so Enter / Space try again.
      const at = document.activeElement;
      if (r === GOOD && (!at || at === document.body || el.contains(at))) cont.focus({ preventScroll: true });
    },
    onOverride: () => finish({ correct: true, rating: GOOD }),
  });

  // Enter goes on once there is a score (on a focused button, the button acts: the mic tries again).
  const unbind = bindKeys({ Enter: () => { if (!cont.disabled) cont.click(); } });
  ctx.onCleanup(unbind);

  if (ctx.settings.autoplay) sayLater(ctx, word);

  const el = h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, 'Say it out loud'),
    h('div', { class: 'prompt' },
      h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr, ' ', playButton(ctx, word), playButton(ctx, word, { slow: true })),
      readingLine(ctx, word),
      h('p', { class: 'prompt-sub' }, word.en)),
    pronunciationPanel(ctx, word, { compact: true }),
    practice,
    live,
    bar,
  );
  return el;
}

export function flashcard(ctx, word, onDone) {
  const back = h('div', { class: 'card-back', hidden: true });
  let shown = false;
  const finish = once((rating) => { unbind(); onDone({ correct: rating !== AGAIN, rating }); });

  const ratings = [
    [AGAIN, 'Again', 'bad'], [HARD, 'Hard', 'warn'], [GOOD, 'Good', 'good'], [EASY, 'Easy', 'easy'],
  ];
  const bar = sheet(ctx, 'neutral', h('button', { type: 'button', class: 'btn primary wide', onclick: show }, 'Show answer'));

  function show() {
    if (shown) return;
    shown = true;
    back.hidden = false;
    set(back,
      h('p', { class: 'prompt-word', lang: ctx.lang.code }, word.tr, ' ', playButton(ctx, word)),
      readingLine(ctx, word, 'reading', { full: true }),
      pronunciationPanel(ctx, word, { compact: true }),
    );
    ctx.say(word, { auto: true });
    // The question labels the group, which takes the focus (the button that had it is gone).
    const row = h('div', { class: 'rating-row', role: 'group', 'aria-label': 'How well did you remember it?', tabindex: '-1' },
      ratings.map(([r, label, cls], i) =>
        h('button', { type: 'button', class: `rate ${cls}`, onclick: () => finish(r) },
          h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(i + 1)), label)));
    set(bar, h('p', { class: 'hint center sheet-question', 'aria-hidden': 'true' }, 'How well did you remember it?'), row);
    bar.classList.add('rating');
    row.focus({ preventScroll: true });
    bar.refit(back);
  }

  const unbind = bindKeys({
    ' ': show, Enter: show,
    1: () => shown && finish(AGAIN), 2: () => shown && finish(HARD), 3: () => shown && finish(GOOD), 4: () => shown && finish(EASY),
  });
  ctx.onCleanup(unbind);

  return h('div', { class: 'exercise' },
    h('p', { class: 'kicker' }, `Do you remember the ${ctx.lang.name}?`),
    h('div', { class: 'prompt' }, h('p', { class: 'prompt-word en' }, word.en)),
    back,
    bar,
  );
}

/** Teaching card used when a word is first introduced. */
export function intro(ctx, word, onDone, meta = {}) {
  if (ctx.settings.autoplay) sayLater(ctx, word);
  const finish = once(() => { unbind(); onDone({ intro: true }); });
  const unbind = bindKeys({ Enter: finish });
  ctx.onCleanup(unbind);

  return h('div', { class: 'exercise intro' },
    h('p', { class: 'kicker' }, `New word ${meta.index + 1} of ${meta.total}`),
    h('div', { class: 'word-hero' },
      h('h2', { class: 'hero-tr', lang: ctx.lang.code }, word.tr),
      readingLine(ctx, word, 'reading', { full: true }),
      h('p', { class: 'hero-en' }, word.en, ' ', regBadge(word)),
    ),
    audioControls(ctx, word),
    pronunciationPanel(ctx, word),
    registerBlock(ctx, word),
    exampleBlock(ctx, word),
    word.note ? h('p', { class: 'note' }, word.note) : null,
    h('details', { class: 'try-speak' },
      h('summary', null, icon('mic', 16), 'Try saying it'),
      speakPractice(ctx, word)),
    // Next word stays in reach at the bottom of the screen however long the card is.
    sheet(ctx, 'neutral', h('div', { class: 'actions split intro-actions' },
      h('button', {
        type: 'button', class: 'btn', title: 'Skip this word — it will only come back for a check in about a month',
        onclick: () => { unbind(); onDone({ intro: true, known: true }); },
      }, icon('check', 18), 'Already learned'),
      continueButton(finish, meta.index + 1 === meta.total ? 'Start quick check' : 'Next word'))),
  );
}

// ---------- Sentence builder ----------

/**
 * The tiles (words without punctuation or a sentence-initial capital) in a
 * random order that isn't already a right answer, when the words allow one.
 */
function scramble(lang, s) {
  const tiles = (s.tiles || s.tokens).map((text) => ({ text, key: tileKey(lang, text) }));
  const right = new Set(acceptedOrders(lang, s).map((o) => o.join(' ')));
  const isRight = (ts) => right.has(ts.map((t) => t.key).join(' '));
  let out = shuffle(tiles);
  for (let n = 0; n < 12 && isRight(out); n++) out = shuffle(tiles);
  return out;
}

/**
 * After checking: the sentence as written (capitals and punctuation back),
 * its reading and meaning, and the learner's order when it was wrong or a
 * valid order other than the usual one.
 */
function sentenceReveal(ctx, s, correct, mine, usual = true) {
  const { lang } = ctx;
  return h('div', { class: `reveal ${correct ? 'good' : 'bad'}` },
    h('p', { class: 'verdict' }, icon(correct ? 'check' : 'x', 18),
      correct ? praiseLine(lang, pick(lang.praise)) : 'Not quite — here’s the right order:'),
    correct && !usual ? h('p', { class: 'hint build-also' }, 'Also right — the usual order is:') : null,
    h('div', { class: 'reveal-word' },
      playButton(ctx, s.audio ?? s.audioText),
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
  const tiles = scramble(lang, s);
  const placed = []; // indexes into tiles, in the learner's order
  let lineEls = [];
  let result = null;

  const finish = once((r) => { unbind(); onDone(r); });
  const live = liveRegion();
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
  const empty = h('span', { class: 'build-empty' }, 'Tap the words in order');
  const line = h('div', { class: 'build-line', role: 'group', 'aria-label': 'Your sentence', dir: lang.dir }, empty);
  const slots = tiles.map((t, i) => h('button', { type: 'button', class: 'tile', lang: lang.code, onclick: () => place(i, true) },
    i < 9 ? h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(i + 1)) : null,
    t.text));
  const bank = h('div', { class: 'build-bank', role: 'group', 'aria-label': 'Words to use', dir: lang.dir }, slots);
  const checkBtn = h('button', { type: 'button', class: 'btn primary', onclick: check }, 'Check');
  // Skip and Check on the bar at the bottom (a hint such as “2 left” right above
  // them); after checking it becomes the answer sheet.
  const bar = sheet(ctx, 'neutral', [
    feedback,
    h('div', { class: 'actions split' },
      h('button', { type: 'button', class: 'btn ghost', onclick: () => finish({ skipped: true }) }, 'Skip'),
      checkBtn),
  ]);

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
    const { correct, marks, usual } = checkOrder(lang, s, mine);
    result = { correct, rating: correct ? GOOD : AGAIN };
    lineEls.forEach((b, pos) => { b.disabled = true; b.classList.add(marks[pos] ? 'correct' : 'wrong'); });
    line.classList.add(correct ? 'right' : 'wrong');
    bank.hidden = true;
    el.classList.add('answered');
    ctx.onAnswer?.(result);
    if (!correct) buzzWrong();
    const btn = continueButton(() => finish(result));
    bar.show(correct ? 'good' : 'bad', answerParts(sentenceReveal(ctx, s, correct, mine, usual), btn), line);
    announce(ctx, live, correct ? 'Right! ' : 'Not quite. The right order: ', spoken(ctx, s.display || s.text, s.en));
    ctx.say(s.audio ?? s.audioText, { auto: true });
    btn.focus({ preventScroll: true });
  }

  const keys = {
    Enter: () => (result ? finish(result) : check()),
    Backspace: () => unplace(placed.length - 1),
  };
  slots.slice(0, 9).forEach((b, i) => { keys[i + 1] = () => place(i); });
  const unbind = bindKeys(keys);
  ctx.onCleanup(unbind);

  // By ear (dictation): the sentence is only heard — its meaning shows with the
  // answer. Without a voice for the language it falls back to the meaning.
  const byEar = !!meta.byEar && canSpeak(lang.speech(s.audio ?? s.audioText).lang) !== false;
  const meaning = h('p', { class: 'prompt-word en build-en', hidden: byEar }, s.en, ' ', regBadge(s));
  if (byEar) {
    const t = setTimeout(() => Promise.resolve(ctx.say(s.audio ?? s.audioText)).then((ok) => { if (ok === false) meaning.hidden = false; }), 350);
    ctx.onCleanup(() => clearTimeout(t));
  }
  const el = h('div', { class: `exercise build${byEar ? ' by-ear' : ''}` },
    h('p', { class: 'kicker' }, byEar ? 'Build what you hear' : 'Put the words in order'),
    h('div', { class: 'prompt build-prompt' },
      meaning,
      byEar ? h('p', { class: 'hint build-ear-hint' }, 'Listen as often as you like — the meaning comes with the answer.') : null,
      // Labelled buttons, not playButton(): its label would read the answer out to screen readers.
      h('div', { class: 'build-audio' },
        h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(s.audio ?? s.audioText) }, icon('volume', 14), 'Listen'),
        h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(s.audio ?? s.audioText, { slow: true }) }, icon('slow', 14), 'Slowly'))),
    line,
    bank,
    live,
    bar,
  );
  return el;
}

export const EXERCISES = { listen, meaning, produce, type, speak, flashcard, intro, build, script, stress };
