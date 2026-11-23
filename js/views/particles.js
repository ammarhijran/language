// Speak → Kana → "は: ha or wa?" (Japanese). The kana は and へ are read ha
// and he inside a word, but wa and e when they stand alone as particles (the
// topic marker and "to"). The questions are the course's own example
// sentences, whose readings are written word by word — so a は on its own is
// the particle, and one inside a word is not.
import { h, icon, set, shuffle, bindKeys } from '../ui.js';
import { backLink, playButton } from '../components.js';

const COUNT = 10;
const READ = { は: { particle: 'wa', word: 'ha', role: 'the topic particle' }, へ: { particle: 'e', word: 'he', role: 'the particle for “to, towards”' } };
// 歯 (tooth) and 葉 (leaf) are words read は on their own: sentences with them are left out.
const LONE_WORDS = /[歯葉派]/;

/**
 * What can be asked: one は or へ per example sentence —
 * { example, word, tokens, token, at, kana, particle }. `tokens`: the
 * reading word by word; `token`/`at`: which word and which kana in it.
 */
export function particleItems(lang) {
  const out = [];
  for (const word of lang.words) {
    const ex = word.example;
    if (word.own || !ex?.kana || LONE_WORDS.test(ex.tr)) continue;
    const tokens = ex.kana.trim().split(/\s+/);
    if (tokens.length > 10) continue; // a short sentence fits on the screen in kana
    let found = null;
    tokens.forEach((t, token) => {
      if (found) return;
      if (t === 'は' || t === 'へ') found = { token, at: 0, kana: t, particle: true };
      else {
        const at = [...t].findIndex((ch) => ch === 'は' || ch === 'へ');
        if (at >= 0 && [...t].length > 1) found = { token, at, kana: [...t][at], particle: false };
      }
    });
    if (found) out.push({ example: ex, word, tokens, ...found });
  }
  return out;
}

/** A round: half particles, half は/へ inside a word, each from a different sentence. */
export function particleQuestions(lang, count = COUNT, mix = shuffle) {
  const all = particleItems(lang);
  const half = Math.floor(count / 2);
  return mix([...mix(all.filter((q) => q.particle)).slice(0, half), ...mix(all.filter((q) => !q.particle)).slice(0, count - half)]);
}

export default function particles(ctx) {
  const { lang } = ctx;
  const view = h('div', { class: 'view letter-quiz particles' });
  const qs = lang.code === 'ja' ? particleQuestions(lang) : [];
  if (!qs.length) {
    set(view, backLink(ctx, '#/speak/alphabet', 'Kana'),
      h('div', { class: 'summary' }, h('h1', null, 'Not for this language'), h('a', { class: 'btn primary', href: '#/speak/alphabet' }, 'See the letters')));
    return view;
  }
  const missed = [];
  let i = 0;
  let right = 0;
  let answered = false;
  let pick = () => {};
  let goOn = () => {};
  // The reading, word by word, with the kana in question marked.
  const marked = (q) => q.tokens.flatMap((t, n) => {
    const c = [...t];
    return [n ? ' ' : '', n === q.token ? [c.slice(0, q.at).join(''), h('mark', { class: 'iotated-mark' }, c[q.at]), c.slice(q.at + 1).join('')] : t];
  });

  function show() {
    answered = false;
    const q = qs[i];
    const r = READ[q.kana];
    const order = Math.random() < 0.5 ? [true, false] : [false, true];
    const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
    const buttons = order.map((isParticle, k) => h('button', { type: 'button', class: 'option', onclick: () => pick(k) },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(k + 1)),
      h('span', { class: 'option-label letter-option' }, isParticle ? r.particle : r.word)));
    pick = (k) => {
      if (answered || order[k] === undefined) return;
      answered = true;
      const ok = order[k] === q.particle;
      if (ok) right++; else missed.push(q);
      ctx.store.logActivity(lang.code, { practiced: 1 });
      ctx.store.logSkill?.(lang.code, 'sounds', ok);
      if (ok) ctx.game?.count?.({ lang: lang.code, key: 'soundQuiz' });
      buttons.forEach((b, n) => {
        b.disabled = true;
        if (order[n] === q.particle) b.classList.add('correct');
        else if (n === k) b.classList.add('wrong');
      });
      const next = h('button', { type: 'button', class: 'btn primary wide', onclick: () => goOn() }, i + 1 < qs.length ? 'Next sentence' : 'See my score');
      set(feedback,
        h('div', { class: `reveal ${ok ? 'good' : 'bad'}` },
          h('p', { class: 'verdict' }, icon(ok ? 'check' : 'x', 18), ok ? 'Right!' : 'Not quite:'),
          h('div', { class: 'letter-quiz-ex' }, playButton(ctx, q.example),
            h('span', null, h('b', { lang: lang.code }, q.example.tr), ' ', h('span', { class: 'muted' }, q.example.en))),
          h('p', { class: 'small' }, q.particle
            ? [h('span', { lang: lang.code }, q.kana), ` stands on its own here: it is ${r.role}, read “${r.particle}”.`]
            : [h('span', { lang: lang.code }, q.kana), ' is part of the word ', h('span', { lang: lang.code }, q.tokens[q.token]), ` here, so it is read “${r.word}”.`])),
        next);
      if (ctx.settings.autoplay) ctx.say(q.example, { auto: true });
      next.focus({ preventScroll: true });
    };
    goOn = () => {
      if (!answered) return;
      i++;
      ctx.speech.cancelSpeech();
      if (i < qs.length) show(); else summary();
    };
    set(view,
      backLink(ctx, '#/speak/alphabet', 'Kana'),
      h('div', { class: 'exercise' },
        h('p', { class: 'kicker' }, `は and へ · ${i + 1} of ${qs.length}`),
        h('p', { class: 'particle-line', lang: lang.code }, marked(q)),
        h('p', { class: 'muted letter-quiz-ask' }, 'How is the marked kana read here?'),
        h('div', { class: 'options two' }, buttons),
        feedback));
    window.scrollTo(0, 0);
  }

  function summary() {
    const unique = [...new Set(missed)];
    set(view,
      backLink(ctx, '#/speak/alphabet', 'Kana'),
      h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === qs.length ? '🌟' : '🔤'),
        h('h2', null, 'Round done'),
        h('p', { class: 'big-number' }, `${right}/${qs.length}`),
        unique.length
          ? [h('p', { class: 'muted' }, 'Worth another look:'),
            h('ul', { class: 'link-list particle-missed' }, unique.map((q) => h('li', null, h('span', { lang: lang.code }, marked(q)))))]
          : h('p', { class: 'muted' }, 'Every one right.'),
        h('p', { class: 'hint' }, 'As particles — standing on their own after a word — は is read wa and へ is read e. Inside a word they are ha and he. (The particle を is always o.)'),
        h('div', { class: 'actions stack' },
          h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Another round'),
          h('a', { class: 'btn ghost wide', href: '#/speak/alphabet' }, 'Back to the chart'))));
    ctx.flushRewards?.();
    window.scrollTo(0, 0);
  }

  ctx.onCleanup(bindKeys({ 1: () => pick(0), 2: () => pick(1), Enter: () => goOn() }));
  ctx.onCleanup(() => ctx.speech.cancelSpeech());
  show();
  return view;
}
