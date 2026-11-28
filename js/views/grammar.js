// Grammar guide: a list of short lessons per language, each with explanations,
// tables, audio examples and a 4-question quiz.
import { h, icon, set, bindKeys, shuffle, motionOff } from '../ui.js';
import { playButton, backLink, readingText } from '../components.js';
import { sentencesFor, MIN_SENTENCES } from '../sentences.js';

// Runs of Arabic or Japanese inside the English text of a lesson get their
// language, so they are set in the script's font and Arabic keeps its
// direction inside an English sentence.
const ARABIC = '؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿';
const SCRIPT_RUN = {
  ar: new RegExp(`([${ARABIC}]+(?:[  ]+[${ARABIC}]+)*)`, 'u'),
  ja: /([　-〿぀-ヿ㐀-䶿一-鿿豈-﫿！-～｡-ﾟ]+)/u,
};
export function scriptRuns(text, code) {
  const re = SCRIPT_RUN[code];
  if (!re) return text;
  return String(text).split(re).map((part, i) => (i % 2 ? h('span', { lang: code }, part) : part)).filter((p) => p !== '');
}

/** Plain text with **bold** → nodes (no HTML parsing); `code`: tag that language's script in it. */
export function rich(text, code) {
  return String(text).split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? h('b', null, scriptRuns(part, code)) : scriptRuns(part, code)));
}
const plain = (text) => String(text).replace(/\*\*/g, '');
const paragraphs = (text, code) => String(text || '').split(/\n{2,}/).map((p) => h('p', null, rich(p, code)));
const LESSONS_HREF = '#/learn/g/grammar';

function lessonCard(ctx, lesson, index) {
  const best = ctx.game.grammarBest(ctx.lang.code, lesson.id);
  return h('a', { class: `grammar-card${best != null ? ' done' : ''}`, href: `#/grammar/${encodeURIComponent(lesson.id)}` },
    h('span', { class: 'grammar-num', 'aria-hidden': 'true' }, best != null ? '✓' : String(index + 1)),
    h('span', { class: 'grammar-text' },
      h('b', null, rich(lesson.title, ctx.lang.code)),
      h('small', null, rich(lesson.summary, ctx.lang.code))),
    h('span', { class: `badge level-${lesson.level}` }, lesson.level));
}

function list(ctx) {
  const { lang } = ctx;
  const lessons = lang.grammar || [];
  const done = lessons.filter((l) => ctx.game.grammarBest(lang.code, l.id) != null).length;
  return h('div', { class: 'view' },
    backLink(ctx, LESSONS_HREF, 'Learn'),
    h('h1', null, `${lang.name} grammar`),
    lessons.length
      ? h('p', { class: 'muted' }, `${lessons.length} short lessons, from first sentences to everyday speech — each ends with a quick quiz. ${done ? `${done} done.` : ''}`)
      : h('p', { class: 'muted' }, `Grammar lessons for ${lang.name} are coming soon.`),
    // Questions from the lessons already done, mixed — to keep the rules fresh.
    done >= MIXED_MIN ? h('a', { class: 'quick-link', id: 'g-mixed', href: '#/grammar/review' },
      h('span', { class: 'sc-emoji', 'aria-hidden': 'true' }, '🔀'),
      h('span', null, h('b', null, 'Mixed review'), h('small', null, `${MIXED_COUNT} questions from the ${done} lessons you have done`)),
      icon('arrow', 18)) : null,
    h('div', { class: 'grammar-list' }, lessons.map((l, i) => lessonCard(ctx, l, i))),
  );
}

export const MIXED_MIN = 2; // lessons done before a mixed review is offered
export const MIXED_COUNT = 10;

/**
 * Questions for a mixed review: up to `count` from the quizzes of the lessons
 * in `doneIds`, in random order, at most two from any one lesson while there
 * are enough lessons — each with `from` (its lesson's id and title).
 */
export function mixedQuestions(lessons, doneIds, count = MIXED_COUNT, mix = shuffle) {
  const pools = lessons.filter((l) => doneIds.includes(l.id) && l.quiz?.length)
    .map((l) => mix(l.quiz).map((q) => ({ ...q, from: { id: l.id, title: l.title } })));
  const out = [];
  // Round after round, one question from each lesson, until there are enough.
  for (let round = 0; out.length < count && pools.some((p) => p[round]); round++) {
    for (const p of mix(pools)) if (p[round] && out.length < count) out.push(p[round]);
  }
  return mix(out);
}

function reviewView(ctx) {
  const { lang } = ctx;
  const lessons = lang.grammar || [];
  const doneIds = lessons.filter((l) => ctx.game.grammarBest(lang.code, l.id) != null).map((l) => l.id);
  const qs = mixedQuestions(lessons, doneIds);
  if (doneIds.length < MIXED_MIN || !qs.length) return list(ctx);
  return h('div', { class: 'view grammar-lesson' },
    backLink(ctx, '#/grammar', 'Grammar'),
    h('h1', null, 'Mixed review'),
    h('p', { class: 'muted' }, `${qs.length} questions from the ${doneIds.length} lessons you have done. It is practice: your lesson scores stay as they are.`),
    quiz(ctx, { id: 'review', title: 'Mixed review', mixed: true, quiz: qs }, null));
}

function example(ctx, ex) {
  const { lang } = ctx;
  return h('li', { class: 'g-example' },
    playButton(ctx, ex, { label: 'Play example' }),
    h('div', null,
      h('p', { class: 'ex-tr', lang: lang.code }, ex.tr),
      readingText(lang.reading({ ...ex, en: ex.en }), 'reading small'),
      h('p', { class: 'ex-en' }, ex.en),
      ex.note ? h('p', { class: 'g-note' }, rich(ex.note, lang.code)) : null));
}

/**
 * A lesson table. With 3+ columns it stacks on phones (css .g-table.stack):
 * each row a small card, its cells labelled with their column. The roles keep
 * it a table for screen readers once its display changes.
 */
function table(t, code) {
  const labels = t.head.map(plain);
  // Stacked on phones when a row would not fit: 4+ columns, or 3 with long cells.
  const rowLen = t.rows.reduce((sum, r) => sum + r.reduce((n, c) => n + [...plain(c)].length, 0), 0) / (t.rows.length || 1);
  const stack = t.head.length >= 4 || (t.head.length === 3 && rowLen > 28);
  return h('div', { class: `g-table-wrap${stack ? ' stacked' : ''}` },
    h('table', { class: `g-table${stack ? ' stack' : ''}`, role: 'table' },
      h('thead', { role: 'rowgroup' }, h('tr', { role: 'row' }, t.head.map((c) => h('th', { scope: 'col', role: 'columnheader' }, rich(c, code))))),
      h('tbody', { role: 'rowgroup' }, t.rows.map((r) => h('tr', { role: 'row' }, r.map((c, i) => (i === 0
        ? h('th', { scope: 'row', role: 'rowheader' }, rich(c, code))
        : h('td', { role: 'cell', 'data-label': labels[i] || '' }, h('span', { class: 'g-cell' }, rich(c, code))))))))));
}

/** The end-of-lesson quiz, one question at a time (keys 1–4 answer, Enter goes on). */
function quiz(ctx, lesson, next) {
  const code = ctx.lang.code;
  const qs = lesson.quiz;
  const wrap = h('section', { class: 'card g-quiz', id: 'g-quiz', 'aria-labelledby': 'g-quiz-title' });
  const answers = new Array(qs.length).fill(null);
  const dots = h('span', { class: 'g-quiz-dots', 'aria-hidden': 'true' }, qs.map(() => h('i')));
  const counter = h('span', { class: 'muted small' });
  const stage = h('div', { 'aria-live': 'polite' });
  let at = 0;
  let unbind = () => {};
  ctx.onCleanup(() => unbind());

  function paintDots() {
    [...dots.children].forEach((d, i) => {
      d.className = answers[i] == null ? (i === at ? 'now' : '') : answers[i] === qs[i].answer ? 'right' : 'wrong';
    });
    counter.textContent = at < qs.length ? `${at + 1} of ${qs.length}` : `${qs.length} of ${qs.length}`;
  }

  function finish() {
    unbind();
    const correct = answers.filter((a, i) => a === qs[i].answer).length;
    ctx.store.logActivity(code, { practiced: qs.length });
    // A mixed review is practice: it is no lesson of its own, so nothing is recorded for one.
    const xp = lesson.mixed ? 0 : ctx.game.grammarDone({ lang: code, id: lesson.id, correct, total: qs.length });
    paintDots();
    set(stage, h('div', { class: 'summary g-result' },
      h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, correct === qs.length ? '🌟' : '📘'),
      h('h3', { class: 'g-result-title', tabindex: '-1' }, `${correct} / ${qs.length} correct`),
      xp ? h('p', { class: 'muted' }, `+${xp} XP`) : null,
      h('ul', { class: 'g-review' }, qs.map((q, i) => h('li', { class: answers[i] === q.answer ? 'right' : 'wrong' },
        icon(answers[i] === q.answer ? 'check' : 'x', 16),
        h('span', null, rich(q.q, code),
          // In a mixed review: the lesson a missed question comes from, to read it again.
          q.from && answers[i] !== q.answer ? [' ', h('a', { class: 'small', href: `#/grammar/${encodeURIComponent(q.from.id)}` }, `→ ${q.from.title}`)] : null)))),
      h('div', { class: 'actions stack' },
        next ? h('a', { class: 'btn primary wide', href: `#/grammar/${encodeURIComponent(next.id)}` }, `Next: ${next.title}`, icon('arrow', 18)) : null,
        lesson.mixed ? h('button', { type: 'button', class: 'btn primary wide', id: 'g-mixed-again', onclick: () => ctx.rerender() }, 'Another ten', icon('arrow', 18)) : null,
        h('button', { type: 'button', class: 'btn wide', onclick: () => { answers.fill(null); at = 0; show(); } }, icon('repeat', 18), lesson.mixed ? 'These ten again' : 'Try the quiz again'),
        h('a', { class: 'btn ghost wide', href: LESSONS_HREF }, 'All lessons'))));
    stage.querySelector('.g-result-title')?.focus({ preventScroll: true });
    ctx.flushRewards?.();
  }

  function show() {
    unbind();
    paintDots();
    const q = qs[at];
    const feedback = h('div', { class: 'g-explain' });
    const nextBtn = h('button', {
      type: 'button', class: 'btn primary wide', hidden: true,
      onclick: () => { at++; if (at < qs.length) show(); else finish(); },
    }, at + 1 < qs.length ? 'Next question' : 'See my score', icon('arrow', 18));
    const choose = (oi) => {
      if (answers[at] !== null || !buttons[oi]) return;
      answers[at] = oi;
      const right = oi === q.answer;
      buttons.forEach((b, j) => {
        b.disabled = true;
        if (j === q.answer) { b.classList.add('correct'); b.append(h('span', { class: 'mark yes', 'aria-hidden': 'true' }, icon('check', 16))); }
        else if (j === oi) { b.classList.add('wrong'); b.append(h('span', { class: 'mark no', 'aria-hidden': 'true' }, icon('x', 16))); }
        else b.classList.add('dim');
      });
      if (right) buttons[oi].classList.add('picked');
      feedback.className = `g-explain ${right ? 'good' : 'bad'}`;
      set(feedback, h('b', null, right ? 'Correct. ' : 'Not quite. '), rich(q.explain || '', code));
      paintDots();
      nextBtn.hidden = false;
      nextBtn.focus({ preventScroll: true });
    };
    const buttons = q.options.map((opt, oi) => h('button', { type: 'button', class: 'option', onclick: () => choose(oi) },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(oi + 1)),
      h('span', { class: 'option-label' }, rich(opt, code))));
    set(stage,
      h('p', { class: 'g-q-text' }, rich(q.q, code)),
      h('div', { class: 'options' }, buttons),
      feedback,
      h('div', { class: 'actions' }, nextBtn));
    // The keys answer only while the quiz is on screen (not while reading the lesson above it).
    const onScreen = () => {
      if (!wrap.getBoundingClientRect) return true;
      const r = wrap.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    };
    const key = (fn) => () => { if (onScreen()) fn(); };
    unbind = bindKeys({
      1: key(() => choose(0)), 2: key(() => choose(1)), 3: key(() => choose(2)), 4: key(() => choose(3)),
      Enter: key(() => { if (!nextBtn.hidden) nextBtn.click(); }),
    });
  }

  set(wrap,
    h('div', { class: 'g-quiz-head' },
      h('h2', { class: 'card-title', id: 'g-quiz-title' }, lesson.mixed ? '🔀 Mixed review' : '✏️ Quick check'),
      h('span', { class: 'g-quiz-progress' }, counter, ' ', dots)),
    stage);
  show();
  return wrap;
}

/** End of a lesson: build its example sentences from shuffled words (Practice, Sentences mode). */
function practiseCard(ctx, lesson) {
  const scope = `grammar:${lesson.id}`;
  const n = sentencesFor(ctx.lang, scope).length;
  if (n < MIN_SENTENCES) return null;
  return h('section', { class: 'card g-practise', id: 'g-practise' },
    h('h2', { class: 'card-title' }, '🧩 Build the sentences'),
    h('p', { class: 'muted' }, `Put the words of this lesson’s ${n} example sentences back in order.`),
    h('a', { class: 'btn primary wide', href: `#/practice/build/${encodeURIComponent(scope)}` }, 'Practise these sentences', icon('arrow', 18)));
}

/**
 * Section chips under the top bar: each jumps to its part of the lesson, and
 * the one being read is marked as the page scrolls.
 */
function lessonNav(ctx, view, parts) {
  const chips = parts.map((p, i) => h('button', {
    type: 'button', 'aria-controls': p.el.id,
    onclick: () => {
      p.el.scrollIntoView({ behavior: motionOff() ? 'auto' : 'smooth', block: 'start' });
      const heading = p.el.querySelector('h2');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
      mark(i);
    },
  }, h('span', { class: 'g-nav-n', 'aria-hidden': 'true' }, p.n), h('span', null, scriptRuns(p.label, ctx.lang.code))));
  const nav = h('nav', { class: 'g-nav', 'aria-label': 'In this lesson' }, chips);
  let current = -1;
  function mark(i) {
    if (i === current) return;
    current = i;
    chips.forEach((c, j) => { c.classList.toggle('current', j === i); if (j === i) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current'); });
    const c = chips[i];
    if (c) nav.scrollTo?.({ left: Math.max(0, c.offsetLeft - 16), behavior: 'auto' });
  }
  let frame = 0;
  const update = () => {
    frame = 0;
    if (!nav.isConnected) return;
    const line = nav.getBoundingClientRect().bottom + 24;
    let i = 0;
    parts.forEach((p, j) => { if (p.el.getBoundingClientRect().top <= line) i = j; });
    // At the very end of the page the last part is the one in view.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) i = parts.length - 1;
    mark(i);
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
  // The chips stay just under the top bar, whatever its height (safe area, font size).
  const place = () => view.style.setProperty('--g-top', `${Math.round(document.querySelector('.topbar')?.getBoundingClientRect().height || 0)}px`);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', place);
  ctx.onCleanup(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', place); if (frame) cancelAnimationFrame(frame); });
  requestAnimationFrame(() => { place(); update(); });
  mark(0);
  return nav;
}

function lessonView(ctx, id) {
  const { lang } = ctx;
  const code = lang.code;
  const lessons = lang.grammar || [];
  const i = lessons.findIndex((l) => l.id === id);
  if (i < 0) return list(ctx);
  const lesson = lessons[i];
  const next = lessons[i + 1];
  const sections = lesson.sections.map((s, si) => h('section', { class: 'card g-section', id: `g-s-${si + 1}`, 'aria-labelledby': `g-h-${si + 1}` },
    h('h2', { class: 'card-title', id: `g-h-${si + 1}` }, h('span', { class: 'g-section-n', 'aria-hidden': 'true' }, `${si + 1}`), h('span', null, rich(s.heading, code))),
    paragraphs(s.body, code),
    s.table ? table(s.table, code) : null,
    s.examples?.length ? h('ul', { class: 'g-examples' }, s.examples.map((ex) => example(ctx, ex))) : null));
  const quizCard = lesson.quiz?.length ? quiz(ctx, lesson, next) : null;
  const practise = practiseCard(ctx, lesson);
  const parts = [
    ...sections.map((el, si) => ({ el, n: String(si + 1), label: plain(lesson.sections[si].heading) })),
    quizCard ? { el: quizCard, n: '✏️', label: 'Quick check' } : null,
    practise ? { el: practise, n: '🧩', label: 'Sentences' } : null,
  ].filter(Boolean);
  const view = h('div', { class: 'view grammar-lesson' });
  set(view,
    backLink(ctx, LESSONS_HREF, 'Grammar'),
    h('p', { class: 'kicker' }, `Lesson ${i + 1} of ${lessons.length} · `, h('span', { class: `badge level-${lesson.level}` }, lesson.level)),
    h('h1', null, rich(lesson.title, code)),
    h('p', { class: 'muted' }, rich(lesson.summary, code)),
    parts.length > 1 ? lessonNav(ctx, view, parts) : null,
    sections,
    quizCard,
    practise);
  return view;
}

export default function grammar(ctx, id) {
  if (id === 'review') return reviewView(ctx);
  return id ? lessonView(ctx, id) : list(ctx);
}
