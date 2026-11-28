// Speak → Alphabet → "я, ю, є: two sounds or one?" (Ukrainian). These three
// letters are read as y + vowel (ya, yu, ye) at the start of a word, after a
// vowel and after an apostrophe; after a consonant they are the vowel alone
// and make that consonant soft. Where the letter stands decides it — a rule
// without exceptions — and the questions are the course's own words.
import { h, icon, set, shuffle, bindKeys } from '../ui.js';
import { backLink, playButton } from '../components.js';

const COUNT = 10;
const VOWELS = 'аеєиіїоуюя';
const SOUND = { я: ['ya', 'a'], ю: ['yu', 'u'], є: ['ye', 'e'] };

/**
 * Where the first я, ю or є of a word stands, and so how it is read:
 * { at, letter, two, why } — `two`: y + vowel (two sounds) — or null when
 * the word has none, or has it somewhere the rule is not about (after ь, й or a hyphen).
 */
export function iotatedIn(word) {
  const chars = [...String(word)];
  const at = chars.findIndex((ch) => 'яює'.includes(ch.toLowerCase()));
  if (at < 0) return null;
  const letter = chars[at].toLowerCase();
  const before = (chars[at - 1] || '').toLowerCase();
  if (at === 0) return { at, letter, two: true, why: 'it is the first letter of the word' };
  if (VOWELS.includes(before)) return { at, letter, two: true, why: `it follows a vowel (${before})` };
  if (/['’ʼ]/.test(before)) return { at, letter, two: true, why: 'it follows an apostrophe, which keeps the consonant before it hard' };
  if (/[бвгґджзклмнпрстфхцчшщ]/.test(before)) return { at, letter, two: false, why: `it follows a consonant (${before}), which it makes soft` };
  return null;
}

/** A round: course words, single and not the learner's own — half read as two sounds, half as one. */
export function iotatedQuestions(lang, count = COUNT, mix = shuffle) {
  const all = lang.words.filter((w) => !w.own && !/[\s-]/.test(w.tr)).map((word) => ({ word, ...iotatedIn(word.tr) })).filter((q) => q.letter);
  const half = Math.floor(count / 2);
  return mix([...mix(all.filter((q) => q.two)).slice(0, half), ...mix(all.filter((q) => !q.two)).slice(0, count - half)]);
}

export default function iotated(ctx) {
  const { lang } = ctx;
  const view = h('div', { class: 'view letter-quiz iotated' });
  const qs = lang.code === 'uk' ? iotatedQuestions(lang) : [];
  if (!qs.length) {
    set(view, backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'summary' }, h('h1', null, 'Not for this language'), h('a', { class: 'btn primary', href: '#/speak/alphabet' }, 'See the letters')));
    return view;
  }
  const missed = [];
  let i = 0;
  let right = 0;
  let answered = false;
  let pick = () => {};
  let goOn = () => {};
  // The word with the letter in question marked.
  const marked = (q) => { const c = [...q.word.tr]; return [c.slice(0, q.at).join(''), h('mark', { class: 'iotated-mark' }, c[q.at]), c.slice(q.at + 1).join('')]; };

  function show() {
    answered = false;
    const q = qs[i];
    const [two, one] = SOUND[q.letter];
    const order = Math.random() < 0.5 ? [true, false] : [false, true];
    const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
    const buttons = order.map((isTwo, k) => h('button', { type: 'button', class: 'option', onclick: () => pick(k) },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(k + 1)),
      h('span', { class: 'option-label' }, h('b', null, isTwo ? `“${two}”` : `“${one}”`), h('small', null, isTwo ? 'two sounds: y + vowel' : 'the vowel alone, after a soft consonant'))));
    pick = (k) => {
      if (answered || order[k] === undefined) return;
      answered = true;
      const ok = order[k] === q.two;
      if (ok) right++; else missed.push(q);
      ctx.store.logActivity(lang.code, { practiced: 1 });
      ctx.store.logSkill?.(lang.code, 'sounds', ok);
      if (ok) ctx.game?.count?.({ lang: lang.code, key: 'soundQuiz' });
      buttons.forEach((b, n) => {
        b.disabled = true;
        if (order[n] === q.two) b.classList.add('correct');
        else if (n === k) b.classList.add('wrong');
      });
      const next = h('button', { type: 'button', class: 'btn primary wide', onclick: () => goOn() }, i + 1 < qs.length ? 'Next word' : 'See my score');
      set(feedback,
        h('div', { class: `reveal ${ok ? 'good' : 'bad'}` },
          h('p', { class: 'verdict' }, icon(ok ? 'check' : 'x', 18), ok ? 'Right!' : 'Not quite:'),
          h('div', { class: 'letter-quiz-ex' }, playButton(ctx, q.word),
            h('span', { class: 'letter-answer' }, h('b', { lang: lang.code }, marked(q)), ' ', h('span', { class: 'muted' }, q.word.en))),
          h('p', { class: 'small' }, `Here ${q.letter} is “${q.two ? two : one}”: ${q.why}.`)),
        next);
      if (ctx.settings.autoplay) ctx.say(q.word, { auto: true });
      next.focus({ preventScroll: true });
    };
    goOn = () => {
      if (!answered) return;
      i++;
      ctx.speech.cancelSpeech();
      if (i < qs.length) show(); else summary();
    };
    set(view,
      backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'exercise' },
        h('p', { class: 'kicker' }, `я, ю, є · ${i + 1} of ${qs.length}`),
        h('p', { class: `letter-quiz-prompt${q.word.tr.length > 10 ? ' long' : ''}`, lang: lang.code }, marked(q)),
        h('p', { class: 'muted letter-quiz-ask' }, `${q.word.en} — how is the marked ${q.letter} read?`),
        h('div', { class: 'options' }, buttons),
        feedback));
    window.scrollTo(0, 0);
  }

  function summary() {
    const unique = [...new Set(missed)];
    set(view,
      backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === qs.length ? '🌟' : '🔤'),
        h('h2', null, 'Round done'),
        h('p', { class: 'big-number' }, `${right}/${qs.length}`),
        unique.length
          ? [h('p', { class: 'muted' }, 'Worth another look:'),
            h('ul', { class: 'word-chips letter-missed' }, unique.map((q) => h('li', null, h('a', { href: `#/word/${encodeURIComponent(q.word.id)}` }, h('b', { lang: lang.code }, q.word.tr), ' ', h('span', null, q.word.en)))))]
          : h('p', { class: 'muted' }, 'Every one right.'),
        h('p', { class: 'hint' }, 'я, ю, є are two sounds — ya, yu, ye — at the start of a word, after a vowel and after an apostrophe. After a consonant they are a, u, e, and the consonant before them is soft. (ї is always two sounds: yi.)'),
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
