// Home = today: the daily goal, one thing to do next (review, continue a
// topic or start the next one), what comes after it, shortcuts to the
// phrasebook, everyday speech, texts and sentences, the word of the day and
// this week's challenges. Every topic is one tap away on Learn.
import { STUDY_MODES, studyMode } from '../stats.js';
import { h, icon, storageBanner } from '../ui.js';
import { voiceBanner, playButton, readingLine, glyph, devicePref } from '../components.js';
import { computeStats, nextTopics, topicCounts, wordOfTheDay, learnedWords } from '../stats.js';
import { challengeList, repairBanner } from './journey.js';
import { newsToShow } from '../news.js';
import { tripKit } from '../kit.js';

/** The news items: the newest few, and a button for the rest, so the card never fills the screen. */
const NEWS_SHOWN = 3;
function newsList(ctx, news) {
  const item = (n) => h('li', null,
    h('a', { href: n.href, onclick: () => ctx.store.updateSettings({ newsSeen: news.id }) },
      h('span', { 'aria-hidden': 'true' }, n.emoji), h('span', null, h('b', null, n.text), h('small', null, n.where))));
  const list = h('ul', { class: 'news-list', id: 'news-list' }, news.items.slice(0, NEWS_SHOWN).map(item));
  const rest = news.items.length - NEWS_SHOWN;
  if (rest <= 0) return list;
  const more = h('button', {
    type: 'button', class: 'btn ghost small news-more', 'aria-controls': 'news-list',
    onclick: () => { list.append(...news.items.slice(NEWS_SHOWN).map(item)); more.remove(); list.children[NEWS_SHOWN]?.querySelector('a')?.focus(); },
  }, `Show ${rest} more`);
  return h('div', null, list, more);
}

export default function home(ctx) {
  const { lang } = ctx;
  const s = computeStats(ctx);
  const { resume, next } = nextTopics(ctx, { count: 2 });
  const counts = topicCounts(ctx);
  const wotd = wordOfTheDay(ctx);
  const a = lang.analyze(wotd);
  const gameOn = ctx.settings.gameOn;

  const countOf = (c) => counts.get(c.id) || { learned: 0, total: 0 };
  const lessonLabel = (c) => `${c.emoji} ${c.name} · ${countOf(c).learned}/${countOf(c).total}`;

  // One main thing to do, and what comes after it.
  let cta;
  let after = null; // { cat, verb }
  if (s.due > 0) {
    cta = ctaLink('#/review', 'repeat', `Review ${s.due} word${s.due === 1 ? '' : 's'}`, 'Keep them fresh before you forget them');
    const c = resume || next[0];
    if (c) after = { cat: c, verb: resume ? 'Continue' : 'Learn' };
  } else if (resume) {
    cta = ctaLink(`#/learn/${encodeURIComponent(resume.id)}`, 'book', `Continue ${resume.name}`, `${resume.emoji} Next ${Math.min(ctx.settings.lessonSize, countOf(resume).total - countOf(resume).learned)} · ${countOf(resume).learned}/${countOf(resume).total} learned`);
    if (next[0]) after = { cat: next[0], verb: 'Then' };
  } else if (next[0]) {
    const first = !s.learned;
    cta = ctaLink(`#/learn/${encodeURIComponent(next[0].id)}`, 'book', first ? 'Start your first lesson' : `Learn: ${next[0].name}`, `${next[0].emoji} ${first ? next[0].name : `${countOf(next[0]).learned}/${countOf(next[0]).total} learned`}`);
    if (next[1]) after = { cat: next[1], verb: 'Then' };
  } else {
    cta = ctaLink('#/practice', 'check', 'All caught up!', 'Every topic learned — practise anything you like');
  }

  const goal = ctx.settings.dailyGoal;
  const done = ctx.store.dayTotal(s.today);
  const pct = Math.min(100, Math.round((done / goal) * 100));
  const saved = ctx.store.getFavs(lang.code).filter((id) => lang.byId(id)).length;
  const talk = lang.categories.find((c) => c.group === 'talk');
  // Sentences from the words learned once there are enough, else from every phrase.
  const buildScope = learnedWords(ctx).length >= 20 ? 'learned' : 'all';

  // For someone near the start: the trip essentials as a crash course.
  const kit = tripKit(lang);
  const kitLearned = kit.filter((w) => ctx.store.getCard(lang.code, w.id)).length;
  const kitRow = kit.length && kitLearned < kit.length && Object.keys(ctx.store.getCards(lang.code)).length < 80
    ? h('a', { class: 'up-next kit-row', href: '#/learn/kit' },
      h('span', { class: 'kicker' }, 'Trip soon?'),
      h('span', { class: 'up-next-name' }, `🎒 Essentials · ${kitLearned}/${kit.length}`),
      icon('arrow', 18))
    : null;

  // Listening only or speaking only is on: say so where the day starts, with the way back.
  const only = STUDY_MODES.find((m) => m.id === studyMode(ctx.settings));
  const modeRow = only.id === 'all' ? null
    : h('a', { class: 'up-next kit-row mode-row', href: '#/practice' },
      h('span', { class: 'kicker' }, 'Mode'),
      h('span', { class: 'up-next-name' }, `${only.emoji} ${only.name} is on`),
      h('span', { class: 'small muted' }, 'Change'));

  // A text left part-way in Read & Listen: back to it in one tap (it offers to continue from that line).
  const last = devicePref('readLast', null);
  const listenRow = last && typeof last === 'object' && last.lang === lang.code && typeof last.id === 'string' && Number(last.line) > 0
    ? h('a', { class: 'up-next kit-row listen-row', href: `#/read/${encodeURIComponent(last.id)}` },
      h('span', { class: 'kicker' }, 'Keep listening'),
      h('span', { class: 'up-next-name' }, `🎧 ${String(last.title || 'Your text').slice(0, 60)} · line ${Number(last.line) + 1}`),
      icon('arrow', 18))
    : null;

  // A script that is new (kana, Arabic, Cyrillic), near the start: the letter quiz, one tap away.
  const scriptRow = typeof lang.letterName === 'function' && Object.keys(ctx.store.getCards(lang.code)).length < 60
    ? h('a', { class: 'up-next kit-row script-row', href: '#/speak/alphabet' },
      h('span', { class: 'kicker' }, 'New script?'),
      h('span', { class: 'up-next-name' }, `🔤 ${lang.code === 'ja' ? 'Kana' : 'Letters'}: chart and quiz`),
      icon('arrow', 18))
    : null;

  // The learner's own words that are still new: one tap to learn them.
  const own = lang.categories.find((c) => c.own);
  const ownNew = own ? countOf(own).total - countOf(own).learned : 0;
  const ownRow = ownNew > 0 && resume !== own
    ? h('a', { class: 'up-next own-row', href: `#/learn/${encodeURIComponent(own.id)}` },
      h('span', { class: 'kicker' }, 'Your words'),
      h('span', { class: 'up-next-name' }, `${own.emoji} ${own.name} · ${ownNew} to learn`),
      icon('arrow', 18))
    : null;

  // What's new: once, for people who were already using the app.
  const news = newsToShow(ctx.store);
  const newsCard = news ? h('section', { class: 'card news', 'aria-labelledby': 'news-title' },
    h('div', { class: 'title-row' },
      h('h2', { class: 'card-title', id: 'news-title' }, '✨ New in Four Tongues'),
      h('button', {
        type: 'button', class: 'btn small',
        onclick: () => { ctx.store.updateSettings({ newsSeen: news.id }); newsCard.remove(); },
      }, 'Got it')),
    newsList(ctx, news)) : null;

  return h('div', { class: 'view home today' },
    h('section', { class: 'hello' },
      h('div', null,
        h('h1', null, h('span', { lang: lang.code }, `${lang.greeting}!`), ' 👋'),
        h('p', { class: 'muted' },
          s.streak ? [icon('flame', 16), ` ${s.streak}-day streak · `] : null,
          done >= goal ? 'Daily goal met — nice work!' : done ? `${goal - done} more for today’s goal` : `Today’s goal: ${goal} exercises`)),
      h('a', {
        class: `goal-ring${done >= goal ? ' done' : ''}`, href: '#/journey', style: { '--pct': pct },
        title: 'Daily goal — see your goals',
        'aria-label': `Daily goal: ${Math.min(done, goal)} of ${goal} exercises done today. Open goals`,
      }, h('span', null, done >= goal ? icon('check', 22) : h('b', null, String(done)), h('small', null, done >= goal ? 'goal met' : `of ${goal} today`)))),
    storageBanner(ctx, { link: true }),
    voiceBanner(ctx),
    repairBanner(ctx),
    cta,
    newsCard,
    after
      ? h('a', { class: 'up-next', href: `#/learn/${encodeURIComponent(after.cat.id)}` },
        h('span', { class: 'kicker' }, 'Up next'),
        h('span', { class: 'up-next-name' }, after.verb === 'Continue' ? 'Continue ' : '', lessonLabel(after.cat)),
        icon('arrow', 18))
      : null,
    modeRow,
    kitRow,
    scriptRow,
    listenRow,
    ownRow,
    h('div', { class: 'shortcuts' },
      shortcut('#/phrases', glyph('chat', 22), 'Phrasebook', saved ? `★ ${saved} saved` : 'Ready-made phrases'),
      talk ? shortcut('#/learn/g/talk', h('span', { class: 'sc-emoji', 'aria-hidden': 'true' }, '🗣️'), 'Talk like a local', 'Slang & everyday speech') : null,
      shortcut('#/read', h('span', { class: 'sc-emoji', 'aria-hidden': 'true' }, '🎧'), 'Read & Listen', 'Dialogues & stories'),
      shortcut(`#/practice/build/${buildScope}`, icon('tiles', 22), 'Sentences', 'Put words in order')),
    h('section', { class: 'card wotd' },
      h('p', { class: 'kicker' }, 'Word of the day'),
      h('div', { class: 'wotd-row' },
        h('div', null,
          h('a', { class: 'wotd-word', href: `#/word/${encodeURIComponent(wotd.id)}`, lang: lang.code }, wotd.tr),
          readingLine(ctx, wotd),
          h('p', { class: 'muted' }, wotd.en),
          h('p', { class: 'respell small' }, a.respell, ' · ', h('span', { class: 'ipa' }, `/${a.ipa}/`))),
        playButton(ctx, wotd, { cls: 'big' }),
      ),
    ),
    gameOn
      ? h('section', { class: 'card' },
        h('div', { class: 'title-row' },
          h('h2', { class: 'card-title' }, '⚔️ This week'),
          h('a', { href: '#/journey', class: 'small' }, levelLine(ctx))),
        challengeList(ctx, { compact: true }))
      : null,
    h('a', { class: 'all-topics', href: '#/learn' }, `All ${lang.categories.filter((c) => !c.own).length} topics, grammar and texts`, icon('arrow', 18)),
  );
}

function ctaLink(href, ic, title, sub) {
  return h('a', { class: 'cta', href },
    h('span', { class: 'cta-icon' }, icon(ic, 26)),
    h('span', null, h('b', null, title), h('small', null, sub)),
    icon('arrow'));
}

function shortcut(href, ic, title, sub) {
  return h('a', { class: 'shortcut', href }, ic, h('span', null, h('b', null, title), h('small', null, sub)));
}

function levelLine(ctx) {
  const lv = ctx.game.level();
  return `Level ${lv.level} · all goals`;
}
