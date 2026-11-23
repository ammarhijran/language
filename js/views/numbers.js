// Practice → Numbers by ear: hear a number, type its digits. Besides the
// ranges by size there are years, and phone numbers said digit by digit.
import { h, icon, set } from '../ui.js';
import * as speech from '../speech.js';
import { backLink, voiceBanner, readingLine } from '../components.js';
import { RANGES, SPECIAL, rangeOf, pickNumbers, parseNumber, parseDigits, groupDigits } from '../numbers.js';

const COUNT = 10;

export default function numbers(ctx, rangeId) {
  const range = rangeOf(rangeId);
  return range ? round(ctx, range) : setup(ctx);
}

function setup(ctx) {
  const { lang } = ctx;
  return h('div', { class: 'view numbers' },
    backLink(ctx, '#/practice', 'Practice'),
    h('h1', null, 'Numbers by ear'),
    h('p', { class: 'muted' }, `The ${lang.name} voice says a number; you type it in digits. Prices, times and phone numbers get easier with every round.`),
    voiceBanner(ctx),
    h('div', { class: 'choice-grid' }, RANGES.map((r) => h('a', { class: 'choice', href: `#/numbers/${r.id}` },
      h('b', null, r.label), h('small', null, `${COUNT} numbers`)))),
    h('h2', { class: 'section-title' }, 'In real life'),
    h('div', { class: 'choice-grid' }, SPECIAL.map((r) => h('a', { class: 'choice', href: `#/numbers/${r.id}` },
      h('b', null, r.label), h('small', null, r.sub)))));
}

function round(ctx, range) {
  const { lang } = ctx;
  const list = pickNumbers(range, COUNT);
  let i = 0;
  let right = 0;
  let answered = false;
  const view = h('div', { class: 'view numbers' });
  const spelled = !!range.digits; // a phone number: said and answered digit by digit
  // Each digit is its own utterance, so no voice can read "4 7 0" as one
  // number. A newer request (Listen again, the next number) ends the chain.
  let chain = 0;
  let gone = false;
  const say = async (slow = false) => {
    const mine = ++chain;
    if (!spelled) return ctx.say({ text: String(list[i]), lang: lang.speechLang }, { slow });
    for (const digit of list[i]) {
      // false: no voice, or the speech was stopped — either way, no more digits.
      if (await ctx.say({ text: digit, lang: lang.speechLang }, { slow }) === false || mine !== chain) return false;
    }
    return true;
  };
  const stop = () => { chain++; speech.cancelSpeech(); };

  const count = h('p', { class: 'kicker' });
  const input = h('input', {
    type: 'text', inputmode: 'numeric', class: 'answer-input', id: 'number-answer', autocomplete: 'off', enterkeyhint: 'done',
    'aria-label': spelled ? 'The digits you heard' : 'The number you heard, in digits', placeholder: '?',
  });
  const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
  const action = h('button', { type: 'submit', class: 'btn primary wide' }, 'Check');
  const form = h('form', {
    class: 'card numbers-card',
    onsubmit: (e) => { e.preventDefault(); if (answered) next(); else check(); },
  },
    count,
    h('div', { class: 'button-row numbers-audio' },
      h('button', { type: 'button', class: 'btn', onclick: () => { say(); input.focus(); } }, icon('volume', 18), 'Listen'),
      h('button', { type: 'button', class: 'btn', onclick: () => { say(true); input.focus(); } }, icon('slow', 18), 'Slowly')),
    input, feedback, action);

  function show() {
    answered = false;
    count.textContent = `${spelled ? 'Phone number' : range.id === 'years' ? 'Year' : 'Number'} ${i + 1} of ${list.length}`;
    input.value = '';
    input.readOnly = false;
    input.className = 'answer-input';
    set(feedback);
    action.textContent = 'Check';
    const at = i;
    setTimeout(() => { if (!answered && !gone && at === i) say(); }, 350);
    input.focus({ preventScroll: true });
  }

  function check() {
    const typed = spelled ? parseDigits(input.value) : parseNumber(input.value);
    if (typed == null) { set(feedback, h('p', { class: 'hint' }, spelled ? 'Type the digits you heard, for example 470 29 15.' : 'Type the number in digits, for example 47.')); return; }
    answered = true;
    stop();
    const n = list[i];
    const ok = typed === n;
    if (ok) right++;
    ctx.store.logActivity(lang.code, { practiced: 1 });
    ctx.store.logSkill?.(lang.code, 'numbers', ok); // Progress → Your skills
    input.readOnly = true;
    input.classList.add(ok ? 'right' : 'wrong');
    // The course's own word for the number, when it has one (the small numbers).
    const word = spelled ? null : lang.words.find((w) => w.n === n);
    // A phone number: in groups, with the digits that were typed differently marked.
    const shown = spelled
      ? groupDigits(n).split('').reduce((acc, ch) => {
        if (ch === ' ') return { ...acc, out: [...acc.out, ' '] };
        const miss = !ok && typed[acc.at] !== ch;
        return { at: acc.at + 1, out: [...acc.out, miss ? h('mark', { class: 'digit-miss' }, ch) : ch] };
      }, { at: 0, out: [] }).out
      : range.min >= 1900 && range.max <= 2100 ? String(n) : n.toLocaleString('en');
    set(feedback, h('div', { class: `reveal ${ok ? 'good' : 'bad'}` },
      h('p', { class: 'verdict' }, icon(ok ? 'check' : 'x', 18), ok ? 'Right!' : 'Not quite — it was:'),
      h('p', { class: 'numbers-answer' }, shown),
      spelled && !ok ? h('p', { class: 'hint' }, `You typed ${groupDigits(typed)}.`) : null,
      word ? h('p', { class: 'tr', lang: lang.code }, word.tr) : null,
      word ? readingLine(ctx, word, 'reading small', { full: true }) : null));
    action.textContent = i + 1 < list.length ? 'Next number' : 'See my score';
    if (!ok) say();
    action.focus({ preventScroll: true });
  }

  function next() {
    i++;
    stop();
    if (i < list.length) { show(); return; }
    const at = RANGES.indexOf(range);
    const harder = at >= 0 ? RANGES[at + 1] : null;
    set(view, h('div', { class: 'summary' },
      h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === list.length ? '🌟' : '🔢'),
      h('h2', null, 'Round done'),
      h('p', { class: 'big-number' }, `${right}/${list.length}`),
      h('p', { class: 'muted' }, right >= list.length - 1 && harder ? 'Ready for bigger numbers?' : 'Numbers need the ear more than the eye — another round helps.'),
      h('div', { class: 'actions stack' },
        right >= list.length - 1 && harder ? h('a', { class: 'btn primary wide', href: `#/numbers/${harder.id}` }, `Try ${harder.label}`, icon('arrow', 18)) : null,
        h('button', { type: 'button', class: `btn wide${right >= list.length - 1 && harder ? '' : ' primary'}`, onclick: () => ctx.rerender() }, 'Another round'),
        h('a', { class: 'btn wide', href: '#/numbers' }, 'Choose a range'),
        h('a', { class: 'btn ghost wide', href: '#/practice' }, 'Back to Practice'))));
    ctx.flushRewards?.();
  }

  ctx.onCleanup(() => { gone = true; stop(); });
  set(view,
    backLink(ctx, '#/numbers', 'Numbers'),
    h('h1', null, RANGES.includes(range) ? `Numbers ${range.label}` : range.label),
    voiceBanner(ctx),
    form);
  show();
  return view;
}
