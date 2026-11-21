import { h, icon, shuffle } from '../ui.js';
import { runSession } from '../session.js';
import { learnedWords } from '../stats.js';
import { recognitionSupported } from '../speech.js';
import { GROUPS } from '../components.js';

const MODES = [
  { id: 'mixed', name: 'Mixed', desc: 'A bit of everything', icon: 'shuffle' },
  { id: 'listen', name: 'Listening', desc: 'Hear it, pick the meaning', icon: 'ear' },
  { id: 'speak', name: 'Speaking', desc: 'Say it, get a score', icon: 'mic', needsMic: true },
  { id: 'type', name: 'Spelling', desc: 'Type the word', icon: 'book' },
  { id: 'meaning', name: 'Reading', desc: 'See it, pick the meaning', icon: 'search' },
  { id: 'flashcard', name: 'Flashcards', desc: 'Recall and self-rate', icon: 'repeat' },
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
  const pool = wordsFor(ctx, scope);
  if (pool.length < 4) {
    return h('div', { class: 'view' }, h('div', { class: 'summary' },
      h('h2', null, 'Not enough words yet'),
      h('p', { class: 'muted' }, 'Learn a lesson first, or pick a topic to practise from.'),
      h('a', { class: 'btn primary wide', href: '#/practice' }, 'Choose a topic')));
  }

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
    onFinish() {
      return h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === answered ? '🌟' : '👏'),
        h('h2', null, 'Practice done'),
        h('p', { class: 'big-number' }, `${right}/${answered}`),
        h('p', { class: 'muted' }, 'Practice doesn’t change your review schedule — it’s just for fun and extra reps.'),
        h('div', { class: 'actions stack' },
          h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Another round', icon('arrow', 18)),
          h('a', { class: 'btn wide', href: '#/practice' }, 'Change mode or topic'),
          h('a', { class: 'btn ghost wide', href: '#/' }, 'Back home')),
      );
    },
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
      onclick: (e) => { mode = m.id; select(modeButtons, e.currentTarget); },
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
  const scopeRows = [h('div', { class: 'pill-row' }, pillFor('learned'), pillFor('all'))];
  for (const { g, cats } of grouped) {
    if (grouped.length > 1) scopeRows.push(h('h3', { class: 'kicker pill-group-title' }, g.title));
    scopeRows.push(h('div', { class: 'pill-row' }, cats.map((c) => pillFor(c.id))));
  }

  return h('div', { class: 'view' },
    h('h1', null, 'Practice'),
    h('p', { class: 'muted' }, `Quick rounds of ${ROUND} questions. Practice doesn’t affect your review schedule.`),
    h('h2', { class: 'section-title' }, 'Mode'),
    h('div', { class: 'choice-grid' }, modeButtons),
    h('h2', { class: 'section-title' }, 'Words'),
    scopeRows,
    h('div', { class: 'actions sticky' },
      h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.go(`/practice/${mode}/${scope}`) }, 'Start', icon('arrow', 18))),
  );
}

function select(buttons, el) {
  buttons.forEach((b) => { b.classList.toggle('selected', b === el); b.setAttribute('aria-pressed', String(b === el)); });
}
