import { h, icon, shuffle } from '../ui.js';
import { runSession } from '../session.js';
import { learnedWords } from '../stats.js';
import { recognitionSupported } from '../speech.js';
import { GROUPS } from '../components.js';
import { sentencesFor, MIN_SENTENCES } from '../sentences.js';

const MODES = [
  { id: 'mixed', name: 'Mixed', desc: 'A bit of everything', icon: 'shuffle' },
  { id: 'listen', name: 'Listening', desc: 'Hear it, pick the meaning', icon: 'ear' },
  { id: 'speak', name: 'Speaking', desc: 'Say it, get a score', icon: 'mic', needsMic: true },
  { id: 'type', name: 'Spelling', desc: 'Type the word', icon: 'book' },
  { id: 'meaning', name: 'Reading', desc: 'See it, pick the meaning', icon: 'search' },
  { id: 'flashcard', name: 'Flashcards', desc: 'Recall and self-rate', icon: 'repeat' },
  { id: 'build', name: 'Sentences', desc: 'Put the words in order', icon: 'tiles' },
];

const ROUND = 10;

function wordsFor(ctx, scope) {
  if (!scope || scope === 'learned') return learnedWords(ctx);
  if (scope === 'all') return ctx.lang.words;
  return ctx.lang.wordsIn(scope);
}

// Typing a whole sentence is tedious, so mixed rounds practise long phrases by
// choice, recall and speaking instead (Spelling mode still types them on request).
const isLong = (word) => word.tr.trim().split(/\s+/).length > 3 || word.tr.length > 24;

function typeFor(mode, word) {
  // Without speech recognition a speaking round would be all disabled buttons:
  // fall back to flashcards (hear it, say it aloud, self-rate).
  if (mode === 'speak' && !recognitionSupported()) return 'flashcard';
  if (mode !== 'mixed') return mode;
  const pool = ['listen', 'meaning', 'produce', ...(isLong(word) ? [] : ['type']), ...(recognitionSupported() ? ['speak'] : [])];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function practice(ctx, mode, scope) {
  if (!mode || !MODES.some((m) => m.id === mode)) return setup(ctx);
  if (mode === 'build') return sentenceRound(ctx, scope);
  const pool = wordsFor(ctx, scope);
  if (pool.length < 4) return notEnough('Not enough words yet', 'Learn a lesson first, or pick a topic to practise from.');

  const items = shuffle(pool).slice(0, ROUND).map((word) => ({ word, type: typeFor(mode, word) }));
  let right = 0;
  let answered = 0;

  return h('div', { class: 'view' }, runSession(ctx, {
    label: 'Practice',
    exitHref: '#/practice',
    items,
    onResult(item, r) {
      if (r.skipped) return { word: item.word, type: 'flashcard' };
      answered++;
      if (r.correct) right++;
      ctx.store.logActivity(ctx.lang.code, { practiced: 1 });
      return null;
    },
    onFinish: () => summary(ctx, right, answered),
  }));
}

function notEnough(title, hint, primary = null) {
  return h('div', { class: 'view' }, h('div', { class: 'summary' },
    h('h2', null, title),
    h('p', { class: 'muted' }, hint),
    primary
      ? h('div', { class: 'actions stack' }, primary, h('a', { class: 'btn wide', href: '#/practice' }, 'Choose a topic'))
      : h('a', { class: 'btn primary wide', href: '#/practice' }, 'Choose a topic')));
}

function summary(ctx, right, answered, back = null) {
  return h('div', { class: 'summary' },
    h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === answered ? '🌟' : '👏'),
    h('h2', null, 'Practice done'),
    h('p', { class: 'big-number' }, `${right}/${answered}`),
    h('p', { class: 'muted' }, 'Practice doesn’t change your review schedule — it’s just for fun and extra reps.'),
    h('div', { class: 'actions stack' },
      h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Another round', icon('arrow', 18)),
      back || h('a', { class: 'btn wide', href: '#/practice' }, 'Change mode or topic'),
      h('a', { class: 'btn ghost wide', href: '#/' }, 'Back home')),
  );
}

/** Sentences mode: build up to ROUND sentences of the scope from shuffled word tiles. */
function sentenceRound(ctx, scope = 'learned') {
  const { lang } = ctx;
  const pool = sentencesFor(lang, scope, { cards: ctx.store.getCards(lang.code) });
  const lesson = scope.startsWith('grammar:') ? (lang.grammar || []).find((l) => `grammar:${l.id}` === scope) : null;
  const lessonHref = lesson && `#/grammar/${encodeURIComponent(lesson.id)}`;
  if (pool.length < MIN_SENTENCES) {
    // Phrase topics have the most sentences; a word topic only has its example sentences.
    const hint = scope === 'learned' ? 'Learn a few phrases first, or practise the sentences of a Phrases topic.'
      : lesson ? 'This lesson has too few example sentences to build.'
        : 'This topic has too few example sentences to build. Phrases topics have plenty — or try all of them.';
    return notEnough('Not enough sentences yet', hint,
      h('a', { class: 'btn primary wide', href: '#/practice/build/all' }, 'Practise all sentences', icon('arrow', 18)));
  }

  const items = shuffle(pool).slice(0, ROUND).map((s) => ({ word: s, type: 'build', meta: { sentence: s } }));
  let right = 0;
  let answered = 0;

  return h('div', { class: 'view' }, runSession(ctx, {
    label: 'Sentence practice',
    exitHref: lessonHref || '#/practice',
    items,
    onResult(item, r) {
      // A skipped sentence just moves on: there is no word to fall back on.
      if (r.skipped) return null;
      answered++;
      if (r.correct) right++;
      ctx.store.logActivity(lang.code, { practiced: 1 });
      return null;
    },
    onFinish: () => summary(ctx, right, answered,
      lesson ? h('a', { class: 'btn wide', href: lessonHref }, `Back to “${lesson.title}”`) : null),
  }));
}

function setup(ctx) {
  const learned = learnedWords(ctx).length;
  let mode = 'mixed';
  let scope = learned >= 4 ? 'learned' : ctx.lang.categories[0].id;

  const modeButtons = MODES.map((m) => {
    const disabled = m.needsMic && !recognitionSupported();
    return h('button', {
      type: 'button', class: `choice${m.id === mode ? ' selected' : ''}`, disabled,
      'aria-pressed': String(m.id === mode),
      title: disabled ? 'Speech recognition isn’t available in this browser' : null,
      onclick: (e) => { mode = m.id; select(modeButtons, e.currentTarget); refreshScopes(); },
    }, icon(m.icon, 20), h('b', null, m.name), h('small', null, disabled ? 'Not supported here' : m.desc));
  });

  const scopes = [
    { id: 'learned', name: `Words I’ve learned (${learned})`, disabled: learned < 4 },
    { id: 'all', name: `All words (${ctx.lang.words.length})` },
    ...ctx.lang.categories.map((c) => ({ id: c.id, name: `${c.emoji} ${c.name}` })),
  ];
  const scopeButtons = scopes.map((s) => h('button', {
    type: 'button', class: `pill${s.id === scope ? ' selected' : ''}`, disabled: !!s.disabled,
    'aria-pressed': String(s.id === scope),
    onclick: (e) => { scope = s.id; select(scopeButtons, e.currentTarget); },
  }, s.name));
  // Topic pills grouped like the Learn page (Words / Phrases / Talk like a local).
  const pillFor = (id) => scopeButtons[scopes.findIndex((s) => s.id === id)];
  const grouped = GROUPS.map((g) => ({ g, cats: ctx.lang.categories.filter((c) => (c.group || 'words') === g.id) }))
    .filter(({ cats }) => cats.length);
  const scopeTitle = h('h2', { class: 'section-title' }, 'Words');
  const scopeRows = [h('div', { class: 'pill-row' }, pillFor('learned'), pillFor('all'))];
  for (const { g, cats } of grouped) {
    if (grouped.length > 1) scopeRows.push(h('h3', { class: 'kicker pill-group-title' }, g.title));
    scopeRows.push(h('div', { class: 'pill-row' }, cats.map((c) => pillFor(c.id))));
  }

  // Sentences mode: topics with too few sentences can't be picked (Japanese word
  // topics have none — their example sentences have no kana reading to cut into tiles).
  let counts = null;
  const sentenceCount = (id) => {
    if (!counts) {
      const cards = ctx.store.getCards(ctx.lang.code);
      counts = new Map(scopes.map((s) => [s.id, sentencesFor(ctx.lang, s.id, { cards }).length]));
    }
    return counts.get(id);
  };
  function refreshScopes() {
    const build = mode === 'build';
    scopeTitle.textContent = build ? 'Sentences from' : 'Words';
    scopes.forEach((s, i) => {
      const few = build && sentenceCount(s.id) < MIN_SENTENCES;
      scopeButtons[i].disabled = !!s.disabled || few;
      if (few) scopeButtons[i].title = 'Too few sentences to build';
      else scopeButtons[i].removeAttribute('title');
    });
    if (pillFor(scope).disabled) { scope = 'all'; select(scopeButtons, pillFor('all')); }
  }

  return h('div', { class: 'view' },
    h('h1', null, 'Practice'),
    h('p', { class: 'muted' }, `Quick rounds of ${ROUND} questions. Practice doesn’t affect your review schedule.`),
    h('h2', { class: 'section-title' }, 'Mode'),
    h('div', { class: 'choice-grid' }, modeButtons),
    scopeTitle,
    scopeRows,
    h('div', { class: 'actions sticky' },
      h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.go(`/practice/${mode}/${scope}`) }, 'Start', icon('arrow', 18))),
  );
}

function select(buttons, el) {
  buttons.forEach((b) => { b.classList.toggle('selected', b === el); b.setAttribute('aria-pressed', String(b === el)); });
}
