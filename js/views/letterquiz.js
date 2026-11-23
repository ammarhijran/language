// Speak → Alphabet → Quiz: ten letters, one at a time (js/letterquiz.js).
import { h, icon, set, bindKeys } from '../ui.js';
import { backLink, playButton, devicePref, setDevicePref } from '../components.js';
import { rich } from './grammar.js';
import { letterSets, letterQuestions } from '../letterquiz.js';

const COUNT = 10;

export default function letterQuiz(ctx, setId) {
  const { lang } = ctx;
  const sets = letterSets(lang);
  const chosen = sets.find((s) => s.id === setId) || sets[0];
  const view = h('div', { class: 'view letter-quiz' });
  if (!chosen) {
    set(view, backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'summary' }, h('h1', null, 'No letter quiz for this language'),
        h('a', { class: 'btn primary', href: '#/speak/alphabet' }, 'See the letters')));
    return view;
  }
  // The letters missed in the last round of this set come up again in this one.
  const prefKey = `letterMissed:${lang.code}:${chosen.id}`;
  const before = devicePref(prefKey, []);
  const wideGlyphs = chosen.items.some((x) => [...x.glyph].length > 3);
  const qs = letterQuestions(chosen, COUNT, Math.random, Array.isArray(before) ? before.filter((g) => typeof g === 'string').slice(0, COUNT) : []);
  const missed = [];
  let i = 0;
  let right = 0;
  let answered = false;
  let pickOption = () => {};
  let goOn = () => {};

  const pair = (x) => [h('b', { lang: lang.code }, x.glyph), ' ', chosen.native ? h('span', { lang: lang.code }, `${x.label} · ${lang.letterName(x.letter)}`) : x.label];

  function show() {
    answered = false;
    const q = qs[i];
    const read = q.dir === 'read';
    const hear = q.dir === 'hear';
    const word = q.item.letter.ex?.[0];
    const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
    const buttons = q.options.map((o, k) => h('button', {
      type: 'button', class: 'option', onclick: () => pickOption(k),
      ...(read && !chosen.native ? {} : { lang: lang.code }),
    },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(k + 1)),
      h('span', { class: `option-label${read && !chosen.native ? '' : ' letter-option'}` }, read ? o.label : o.glyph)));
    pickOption = (k) => {
      if (answered || !q.options[k]) return;
      answered = true;
      const ok = q.options[k] === q.item;
      if (ok) right++; else missed.push(q.item);
      ctx.store.logActivity(lang.code, { practiced: 1 });
      ctx.store.logSkill?.(lang.code, 'letters', ok); // Progress → Your skills
      if (ok) ctx.game?.count?.({ lang: lang.code, key: 'lettersRight' });
      buttons.forEach((b, n) => {
        b.disabled = true;
        if (q.options[n] === q.item) b.classList.add('correct');
        else if (n === k) b.classList.add('wrong');
        else b.classList.add('dim');
      });
      const l = q.item.letter;
      const next = h('button', { type: 'button', class: 'btn primary wide', onclick: () => goOn() }, i + 1 < qs.length ? 'Next letter' : 'See my score');
      set(feedback,
        h('div', { class: `reveal ${ok ? 'good' : 'bad'}` },
          h('p', { class: 'verdict' }, icon(ok ? 'check' : 'x', 18), ok ? 'Right!' : 'Not quite:'),
          h('p', { class: 'letter-answer' }, pair(q.item), l.ipa ? h('span', { class: 'ipa' }, ` /${l.ipa}/`) : null),
          // What was picked instead: the two side by side are what to tell apart.
          ok ? null : h('p', { class: 'hint' }, 'You picked ', pair(q.options[k]), '.'),
          l.hint ? h('p', { class: 'small' }, rich(l.hint, lang.code)) : null,
          l.ex ? h('div', { class: 'letter-quiz-ex' }, playButton(ctx, l.ex[0]),
            h('span', null, h('b', { lang: lang.code }, l.ex[0]), ' ', h('span', { class: 'muted' }, l.ex[1]))) : null),
        next);
      if (l.ex && ctx.settings.autoplay) ctx.say(l.ex[0], { auto: true });
      next.focus({ preventScroll: true });
    };
    goOn = () => {
      if (!answered) return;
      i++;
      ctx.speech.cancelSpeech();
      if (i < qs.length) show(); else summary();
    };
    set(view,
      backLink(ctx, '#/speak/alphabet', lang.code === 'ja' ? 'Kana' : 'Alphabet'),
      h('div', { class: 'exercise' },
        h('p', { class: 'kicker' }, `${chosen.name} · ${i + 1} of ${qs.length}`),
        hear
          ? h('p', { class: 'letter-quiz-prompt' }, h('button', { type: 'button', class: 'icon-btn play big', id: 'letter-hear', 'aria-label': 'Play the word again', onclick: () => ctx.say(word) }, icon('volume', 28)))
          : h('p', { class: `letter-quiz-prompt${read || chosen.native ? '' : ' as-label'}`, ...(read || chosen.native ? { lang: lang.code } : {}) }, read ? q.item.glyph : q.item.label),
        h('p', { class: 'muted letter-quiz-ask' }, hear ? 'Which one does the word start with?' : chosen.asks ? chosen.asks[read ? 0 : 1] : read ? 'How is it read?' : 'Which one is it?'),
        // Two columns, unless the glyphs are long (きゃ キャ) and are what is being picked: then one, so none is cut off.
        h('div', { class: `options${!read && wideGlyphs ? '' : ' two'}` }, buttons),
        feedback));
    if (hear) ctx.say(word, { auto: true });
    window.scrollTo(0, 0);
  }

  function summary() {
    const others = sets.filter((s) => s !== chosen);
    const unique = [...new Set(missed)];
    setDevicePref(prefKey, unique.map((x) => x.glyph));
    set(view,
      backLink(ctx, '#/speak/alphabet', lang.code === 'ja' ? 'Kana' : 'Alphabet'),
      h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === qs.length ? '🌟' : '🔤'),
        h('h2', null, 'Round done'),
        h('p', { class: 'big-number' }, `${right}/${qs.length}`),
        unique.length
          ? [h('p', { class: 'muted' }, 'Worth another look — they come up again next round:'),
            h('ul', { class: 'word-chips letter-missed' }, unique.map((x) => h('li', null, h('span', null, pair(x)))))]
          : h('p', { class: 'muted' }, 'Every one right.'),
        h('div', { class: 'actions stack' },
          h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Another round'),
          others.map((s) => h('a', { class: 'btn wide', href: `#/speak/alphabet/quiz/${s.id}` }, `Quiz: ${s.name}`)),
          h('a', { class: 'btn ghost wide', href: '#/speak/alphabet' }, 'Back to the chart'))));
    ctx.flushRewards?.();
    window.scrollTo(0, 0);
  }

  // Keys 1–4 answer, Enter goes on.
  ctx.onCleanup(bindKeys({
    1: () => pickOption(0), 2: () => pickOption(1), 3: () => pickOption(2), 4: () => pickOption(3),
    Enter: () => goOn(),
  }));
  ctx.onCleanup(() => ctx.speech.cancelSpeech());
  show();
  return view;
}
