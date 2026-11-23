// Speak → Alphabet → "Sun or moon letter?" (Arabic): is the l of the article
// al- said before this letter, or does the letter take its place? A rule with
// no exceptions — fourteen sun letters, the rest moon letters — and one that
// decides how every word with the article is pronounced.
import { h, icon, set, shuffle, bindKeys } from '../ui.js';
import { backLink, playButton } from '../components.js';

const COUNT = 10;

/** How a letter is written in Latin letters, from its name: shīn → sh, ṣād → ṣ, ʿayn → ʿ. '' for alif. */
export const consonantOf = (name) => (/^(th|kh|dh|sh|gh|[^aāiīuū])/.exec(String(name || '')) || ['', ''])[1];

/**
 * The letters that can be asked: [{ letter, glyph, name, tl, sun }]. Alif and
 * hamza are left out — no word begins with a bare alif, and hamza is simply
 * a moon letter with nothing to hear.
 */
export function sunMoonItems(lang) {
  if (!lang?.sunLetters) return [];
  return lang.alphabet
    .filter((l) => l.upper !== 'ا' && l.upper !== 'ء' && consonantOf(l.lower))
    .map((l) => ({ letter: l, glyph: l.upper, name: l.lower, tl: consonantOf(l.lower), sun: lang.sunLetters.includes(l.upper) }));
}

const bare = (text) => String(text).replace(/[\u064B-\u0652\u0670\u0640]/g, '');

/**
 * Course entries in Standard Arabic that begin with the article, as questions
 * about a real word: [{ ...letter item, entry, first }] — `first`: the first
 * word as written. Words whose first letter after ال is a hamza are left out
 * (as hamza is among the letters).
 */
export function sunMoonWords(lang) {
  const letters = new Map(sunMoonItems(lang).map((x) => [x.glyph, x]));
  const out = [];
  for (const entry of lang.words) {
    if (entry.own || entry.dialect || !entry.tl || !bare(entry.tr).startsWith('ال')) continue;
    const item = letters.get([...bare(entry.tr)][2]);
    if (item) out.push({ ...item, entry, first: entry.tr.trim().split(/\s+/)[0].replace(/[،.؟!]+$/, '') });
  }
  return out;
}

/** The two ways to say al- before a letter: { sun: "ash-sh…", moon: "al-sh…" }. */
export const withArticle = (item) => ({ sun: `a${item.tl}-${item.tl}…`, moon: `al-${item.tl}…` });

export default function sunQuiz(ctx) {
  const { lang } = ctx;
  const items = sunMoonItems(lang);
  const view = h('div', { class: 'view letter-quiz sun-quiz' });
  if (!items.length) {
    set(view, backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'summary' }, h('h1', null, 'Not for this language'), h('a', { class: 'btn primary', href: '#/speak/alphabet' }, 'See the letters')));
    return view;
  }
  // Half sun, half moon, so that guessing one side gets half of them wrong.
  // On each side, up to two are real words from the course; the rest are letters.
  const words = sunMoonWords(lang);
  const side = (sun) => {
    const real = shuffle(words.filter((x) => x.sun === sun)).slice(0, 2);
    const used = new Set(real.map((x) => x.glyph));
    return [...real, ...shuffle(items.filter((x) => x.sun === sun && !used.has(x.glyph))).slice(0, COUNT / 2 - real.length)];
  };
  const qs = shuffle([...side(true), ...side(false)]);
  const missed = [];
  let i = 0;
  let right = 0;
  let answered = false;
  let pick = () => {};
  let goOn = () => {};

  function show() {
    answered = false;
    const q = qs[i];
    const said = withArticle(q);
    // The order of the two answers changes from question to question.
    const order = Math.random() < 0.5 ? ['sun', 'moon'] : ['moon', 'sun'];
    const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
    const buttons = order.map((kind, k) => h('button', { type: 'button', class: 'option', onclick: () => pick(k) },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(k + 1)),
      h('span', { class: 'option-label' }, h('b', null, said[kind]), h('small', null, kind === 'sun' ? 'the l is not said' : 'the l is said'))));
    pick = (k) => {
      if (answered || !order[k]) return;
      answered = true;
      const ok = (order[k] === 'sun') === q.sun;
      if (ok) right++; else missed.push(q);
      ctx.store.logActivity(lang.code, { practiced: 1 });
      ctx.store.logSkill?.(lang.code, 'letters', ok);
      if (ok) ctx.game?.count?.({ lang: lang.code, key: 'lettersRight' });
      buttons.forEach((b, n) => {
        b.disabled = true;
        if ((order[n] === 'sun') === q.sun) b.classList.add('correct');
        else if (n === k) b.classList.add('wrong');
      });
      const next = h('button', { type: 'button', class: 'btn primary wide', onclick: () => goOn() }, i + 1 < qs.length ? 'Next letter' : 'See my score');
      set(feedback,
        h('div', { class: `reveal ${ok ? 'good' : 'bad'}` },
          h('p', { class: 'verdict' }, icon(ok ? 'check' : 'x', 18), ok ? 'Right!' : 'Not quite:'),
          h('p', { class: 'letter-answer' }, h('b', { lang: lang.code }, q.glyph), ' ', q.name, ' — ', q.sun ? 'a sun letter' : 'a moon letter'),
          q.entry ? h('div', { class: 'letter-quiz-ex' }, playButton(ctx, q.entry),
            h('span', null, h('b', { lang: lang.code }, q.entry.tr), ' ', h('span', { class: 'reading' }, q.entry.tl), ' ', h('span', { class: 'muted' }, q.entry.en))) : null,
          h('p', { class: 'small' }, q.sun
            ? `The l of al- is not said: the ${q.tl} takes its place and is held twice as long — ${said.sun} The article is still written ال.`
            : `al- is said in full, l and all — ${said.moon}`)),
        next);
      next.focus({ preventScroll: true });
    };
    goOn = () => {
      if (!answered) return;
      i++;
      if (i < qs.length) show(); else summary();
    };
    set(view,
      backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'exercise' },
        h('p', { class: 'kicker' }, `Sun or moon letter? · ${i + 1} of ${qs.length}`),
        h('p', { class: 'letter-quiz-prompt', lang: lang.code, dir: 'rtl' }, // (without its vowel marks: the doubling mark on a sun letter would give the answer away)
          q.entry ? bare(q.first) : `الـ + ${q.glyph}`),
        h('p', { class: 'muted letter-quiz-ask' }, q.entry
          ? `It begins with the article and then ${q.name}: how does it start?`
          : `“The” before a word that begins with ${q.name}: how is it said?`),
        h('div', { class: 'options' }, buttons),
        feedback));
    window.scrollTo(0, 0);
  }

  function summary() {
    const unique = [...new Set(missed)];
    set(view,
      backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === qs.length ? '🌟' : '☀️'),
        h('h2', null, 'Round done'),
        h('p', { class: 'big-number' }, `${right}/${qs.length}`),
        unique.length
          ? [h('p', { class: 'muted' }, 'Worth another look:'),
            h('ul', { class: 'word-chips letter-missed' }, unique.map((x) => h('li', null, h('span', null, h('b', { lang: lang.code }, x.glyph), ' ', x.name, x.sun ? ' · sun' : ' · moon'))))]
          : h('p', { class: 'muted' }, 'Every one right.'),
        h('p', { class: 'hint' }, 'The sun letters are the ones made with the tip or blade of the tongue — t, d, s, z, r, l, n and their neighbours — the same place as the l they replace.'),
        h('div', { class: 'actions stack' },
          h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Another round'),
          h('a', { class: 'btn ghost wide', href: '#/speak/alphabet' }, 'Back to the chart'))));
    ctx.flushRewards?.();
    window.scrollTo(0, 0);
  }

  ctx.onCleanup(bindKeys({ 1: () => pick(0), 2: () => pick(1), Enter: () => goOn() }));
  show();
  return view;
}
