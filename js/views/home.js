import { h, icon } from '../ui.js';
import { categoryCard, voiceBanner, playButton, readingLine } from '../components.js';
import { computeStats, nextCategory, wordOfTheDay } from '../stats.js';

export default function home(ctx) {
  const { lang } = ctx;
  const s = computeStats(ctx);
  const next = nextCategory(ctx);
  const wotd = wordOfTheDay(ctx);
  const a = lang.analyze(wotd);

  let cta;
  if (s.due > 0) {
    cta = h('a', { class: 'cta', href: '#/review' },
      h('span', { class: 'cta-icon' }, icon('repeat', 26)),
      h('span', null, h('b', null, `Review ${s.due} word${s.due === 1 ? '' : 's'}`), h('small', null, 'Keep them fresh with spaced repetition')),
      icon('arrow'));
  } else if (next) {
    cta = h('a', { class: 'cta', href: `#/learn/${next.id}` },
      h('span', { class: 'cta-icon' }, icon('book', 26)),
      h('span', null, h('b', null, s.learned ? 'Learn new words' : 'Start your first lesson'), h('small', null, `${next.emoji} ${next.name}`)),
      icon('arrow'));
  } else {
    cta = h('a', { class: 'cta', href: '#/practice' },
      h('span', { class: 'cta-icon' }, icon('check', 26)),
      h('span', null, h('b', null, 'All caught up!'), h('small', null, 'Practise anything you like')),
      icon('arrow'));
  }

  const goal = ctx.settings.dailyGoal;
  const done = ctx.store.dayTotal(s.today);
  const pct = Math.min(100, Math.round((done / goal) * 100));

  return h('div', { class: 'view home' },
    h('section', { class: 'hello' },
      h('div', null,
        h('h1', null, h('span', { lang: lang.code }, `${lang.greeting}!`), ' 👋'),
        h('p', { class: 'muted' }, `${lang.name} vocabulary & pronunciation`)),
      h('a', {
        class: `goal-ring${done >= goal ? ' done' : ''}`, href: '#/settings', style: { '--pct': pct },
        title: 'Daily goal — change it in Settings',
        'aria-label': `Daily goal: ${Math.min(done, goal)} of ${goal} exercises done today`,
      }, h('span', null, done >= goal ? icon('check', 22) : h('b', null, String(done)), h('small', null, done >= goal ? 'goal met' : `of ${goal} today`)))),
    voiceBanner(ctx),
    h('div', { class: 'stat-row' },
      stat(icon('flame'), s.streak, s.streak === 1 ? 'day streak' : 'day streak'),
      stat(icon('book'), s.learned, `of ${s.total} learned`),
      stat(icon('repeat'), s.due, 'due now'),
    ),
    cta,
    h('div', { class: 'quick' },
      quick('#/practice', 'shuffle', 'Practice', 'Quizzes on any topic'),
      quick('#/speak', 'mic', 'Pronunciation', 'Sounds, ear training, speaking'),
    ),
    h('section', { class: 'card wotd' },
      h('p', { class: 'kicker' }, 'Word of the day'),
      h('div', { class: 'wotd-row' },
        h('div', null,
          h('a', { class: 'wotd-word', href: `#/word/${encodeURIComponent(wotd.id)}`, lang: lang.code }, wotd.tr),
          readingLine(ctx, wotd),
          h('p', { class: 'muted' }, wotd.en),
          h('p', { class: 'respell small' }, a.respell, ' · ', h('span', { class: 'ipa' }, `/${a.ipa}/`))),
        playButton(ctx, wotd.tr, { cls: 'big' }),
      ),
    ),
    h('section', null,
      h('h2', { class: 'section-title' }, 'Topics'),
      h('div', { class: 'cat-grid' }, lang.categories.map((c) => categoryCard(ctx, c)))),
  );
}

function stat(ic, value, label) {
  return h('div', { class: 'stat' }, ic, h('b', null, String(value)), h('span', null, label));
}

function quick(href, ic, title, sub) {
  return h('a', { class: 'quick-link', href }, icon(ic, 22), h('span', null, h('b', null, title), h('small', null, sub)));
}
