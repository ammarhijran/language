// Grammar guide: a list of short lessons per language, each with explanations,
// tables, audio examples and a 4-question quiz.
import { h, icon, set, bindKeys } from '../ui.js';
import { playButton } from '../components.js';

/** Plain text with **bold** → nodes (no HTML parsing). */
export function rich(text) {
  return String(text).split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? h('b', null, part) : part));
}
const paragraphs = (text) => String(text || '').split(/\n{2,}/).map((p) => h('p', null, rich(p)));

function lessonCard(ctx, lesson, index) {
  const best = ctx.game.grammarBest(ctx.lang.code, lesson.id);
  return h('a', { class: `grammar-card${best != null ? ' done' : ''}`, href: `#/grammar/${encodeURIComponent(lesson.id)}` },
    h('span', { class: 'grammar-num', 'aria-hidden': 'true' }, best != null ? '✓' : String(index + 1)),
    h('span', { class: 'grammar-text' },
      h('b', null, lesson.title),
      h('small', null, lesson.summary)),
    h('span', { class: `badge level-${lesson.level}` }, lesson.level));
}

function list(ctx) {
  const { lang } = ctx;
  const lessons = lang.grammar || [];
  const done = lessons.filter((l) => ctx.game.grammarBest(lang.code, l.id) != null).length;
  return h('div', { class: 'view' },
    h('a', { href: '#/learn', class: 'back-link' }, icon('back', 16), 'Learn'),
    h('h1', null, `${lang.name} grammar`),
    lessons.length
      ? h('p', { class: 'muted' }, `${lessons.length} short lessons, from first sentences to everyday speech — each ends with a quick quiz. ${done ? `${done} done.` : ''}`)
      : h('p', { class: 'muted' }, `Grammar lessons for ${lang.name} are coming soon.`),
    h('div', { class: 'grammar-list' }, lessons.map((l, i) => lessonCard(ctx, l, i))),
  );
}

function example(ctx, ex) {
  const { lang } = ctx;
  const reading = lang.reading({ ...ex, en: ex.en });
  return h('li', { class: 'g-example' },
    playButton(ctx, ex.tr, { label: 'Play example' }),
    h('div', null,
      h('p', { class: 'ex-tr', lang: lang.code }, ex.tr),
      reading ? h('p', { class: 'reading small' }, reading) : null,
      h('p', { class: 'ex-en' }, ex.en),
      ex.note ? h('p', { class: 'g-note' }, ex.note) : null));
}

function table(t) {
  return h('div', { class: 'g-table-wrap' },
    h('table', { class: 'g-table' },
      h('thead', null, h('tr', null, t.head.map((c) => h('th', { scope: 'col' }, rich(c))))),
      h('tbody', null, t.rows.map((r) => h('tr', null, r.map((c, i) => (i === 0 ? h('th', { scope: 'row' }, rich(c)) : h('td', null, rich(c)))))))));
}

function quiz(ctx, lesson, next) {
  const wrap = h('section', { class: 'card g-quiz' });
  const answers = new Array(lesson.quiz.length).fill(null);
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    const correct = answers.filter((a, i) => a === lesson.quiz[i].answer).length;
    ctx.store.logActivity(ctx.lang.code, { practiced: lesson.quiz.length });
    const xp = ctx.game.grammarDone({ lang: ctx.lang.code, id: lesson.id, correct, total: lesson.quiz.length });
    wrap.append(h('div', { class: 'summary g-result' },
      h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, correct === lesson.quiz.length ? '🌟' : '📘'),
      h('h2', null, `${correct} / ${lesson.quiz.length} correct`),
      xp ? h('p', { class: 'muted' }, `+${xp} XP`) : null,
      h('div', { class: 'actions stack' },
        next ? h('a', { class: 'btn primary wide', href: `#/grammar/${encodeURIComponent(next.id)}` }, `Next: ${next.title}`, icon('arrow', 18)) : null,
        h('a', { class: 'btn wide', href: '#/grammar' }, 'All lessons'))));
    ctx.flushRewards?.();
  }

  const qs = lesson.quiz.map((q, qi) => {
    const feedback = h('p', { class: 'g-explain', 'aria-live': 'polite' });
    const buttons = q.options.map((opt, oi) => h('button', {
      type: 'button', class: 'option',
      onclick: () => {
        if (answers[qi] !== null) return;
        answers[qi] = oi;
        buttons.forEach((b, j) => {
          b.disabled = true;
          if (j === q.answer) b.classList.add('correct');
          else if (j === oi) b.classList.add('wrong');
        });
        set(feedback, h('b', null, oi === q.answer ? 'Correct. ' : 'Not quite. '), rich(q.explain || ''));
        if (answers.every((a) => a !== null)) finish();
      },
    }, h('span', { class: 'option-label' }, rich(opt))));
    return h('div', { class: 'g-q' },
      h('p', { class: 'g-q-text' }, h('b', null, `${qi + 1}. `), rich(q.q)),
      h('div', { class: 'options' }, buttons),
      feedback);
  });
  set(wrap, h('h2', { class: 'card-title' }, '✏️ Quick check'), qs);
  return wrap;
}

function lessonView(ctx, id) {
  const { lang } = ctx;
  const lessons = lang.grammar || [];
  const i = lessons.findIndex((l) => l.id === id);
  if (i < 0) return list(ctx);
  const lesson = lessons[i];
  const next = lessons[i + 1];
  const unbind = bindKeys({});
  ctx.onCleanup(unbind);
  return h('div', { class: 'view grammar-lesson' },
    h('a', { href: '#/grammar', class: 'back-link' }, icon('back', 16), 'All grammar lessons'),
    h('p', { class: 'kicker' }, `Lesson ${i + 1} of ${lessons.length} · `, h('span', { class: `badge level-${lesson.level}` }, lesson.level)),
    h('h1', null, lesson.title),
    h('p', { class: 'muted' }, lesson.summary),
    lesson.sections.map((s) => h('section', { class: 'card g-section' },
      h('h2', { class: 'card-title' }, s.heading),
      paragraphs(s.body),
      s.table ? table(s.table) : null,
      s.examples?.length ? h('ul', { class: 'g-examples' }, s.examples.map((ex) => example(ctx, ex))) : null)),
    lesson.quiz?.length ? quiz(ctx, lesson, next) : null,
  );
}

export default function grammar(ctx, id) {
  return id ? lessonView(ctx, id) : list(ctx);
}
