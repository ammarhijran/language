import { h, icon, shuffle } from '../ui.js';
import { runSession } from '../session.js';
import { stressItem, beatItem, misreadItem, clozeItem } from '../exercises.js';
import { learnedWords, dueWords, trickyWords, nextReviews } from '../stats.js';
import { recognitionSupported } from '../speech.js';
import { GROUPS, missedChips } from '../components.js';
import { sentencesFor, textSentences, MIN_SENTENCES } from '../sentences.js';
import { cachedTexts, loadTexts } from '../reader.js';
import { skillSummary } from '../skills.js';
import handsFree from './handsfree.js';
import { tripKit } from '../kit.js';

const MODES = [
  { id: 'mixed', name: 'Mixed', desc: 'A bit of everything', icon: 'shuffle' },
  { id: 'listen', name: 'Listening', desc: 'Hear it, pick the meaning', icon: 'ear' },
  { id: 'speak', name: 'Speaking', desc: 'Say it, get a score', icon: 'mic', needsMic: true },
  { id: 'type', name: 'Spelling', desc: 'Type the word', icon: 'book' },
  { id: 'meaning', name: 'Reading', desc: 'See it, pick the meaning', icon: 'search' },
  { id: 'flashcard', name: 'Flashcards', desc: 'Recall and self-rate', icon: 'repeat' },
  { id: 'cloze', name: 'In context', desc: 'Put the word back into its sentence', icon: 'search' },
  { id: 'build', name: 'Sentences', desc: 'Put the words in order', icon: 'tiles' },
  { id: 'dictation', name: 'Dictation', desc: 'Hear a sentence, build it', icon: 'ear' },
  // For scripts that are new to the learner (not Turkish, which is written in Latin letters).
  { id: 'script', name: 'Read the script', desc: 'See it, pick how it’s read', icon: 'book', langs: ['ja', 'ar', 'uk'] },
  // Stress is free and unwritten in Ukrainian, and the phone's voice sometimes puts it on the wrong syllable.
  { id: 'stress', name: 'Word stress', desc: 'Tap the stressed syllable', icon: 'target', when: (lang) => lang.stressPractice },
  // Turkish is in Latin letters, but c, ç, ş, ı, ğ, ö, ü are not read the English way.
  { id: 'letters', name: 'Tricky letters', desc: 'See it, pick how it’s read', icon: 'book', when: (lang) => !!lang.misread },
  // Japanese has no stress: its rhythm is beats (morae) of equal length.
  { id: 'beats', name: 'Count the beats', desc: 'How many beats does the word have?', icon: 'wave', when: (lang) => lang.beatPractice },
  { id: 'handsfree', name: 'Hands-free', desc: 'Listen and repeat, no tapping', icon: 'volume' },
];

/** Whether a mode is for this language: some are only for new scripts (`langs`) or for packs with a feature (`when`). */
const offered = (m, lang) => (!m.langs || m.langs.includes(lang.code)) && (!m.when || !!m.when(lang));

const ROUND = 10;

/** The skill that is clearly behind the others (Progress → Your skills), one tap from a round of it — or nothing. */
function weakLink(ctx) {
  const { rows, weakest } = skillSummary(ctx.store.getSkills(ctx.lang.code), ctx.lang);
  const weak = rows.find((r) => r.id === weakest);
  if (!weak || !(weak.mode || weak.href)) return null;
  return h('a', { class: 'quick-link weak-link', href: weak.href || `#/practice/${weak.mode}` },
    h('span', { class: 'sc-emoji', 'aria-hidden': 'true' }, weak.emoji),
    h('span', null, h('b', null, `Work on ${weak.name.toLowerCase()}`), h('small', null, `${weak.pct}% right lately — your other skills are ahead`)),
    icon('arrow', 18));
}

function wordsFor(ctx, scope) {
  if (!scope || scope === 'learned') return learnedWords(ctx);
  if (scope === 'all') return ctx.lang.words;
  if (scope === 'saved') return ctx.store.getFavs(ctx.lang.code).map((id) => ctx.lang.byId(id)).filter(Boolean);
  if (scope === 'tricky') return trickyWords(ctx);
  if (scope === 'kit') return tripKit(ctx.lang);
  return ctx.lang.wordsIn(scope);
}

// Typing a whole sentence is tedious, so mixed rounds practise long phrases by
// choice, recall and speaking instead (Spelling mode still types them on request).
const isLong = (word) => word.tr.trim().split(/\s+/).length > 3 || word.tr.length > 24;

export function typeFor(mode, word, lang = null, { typing = true, speaking = true } = {}) {
  // Without speech recognition a speaking round would be all disabled buttons:
  // fall back to flashcards (hear it, say it aloud, self-rate).
  if (mode === 'speak' && !recognitionSupported()) return 'flashcard';
  if (mode !== 'mixed') return mode;
  const pool = ['listen', 'meaning', 'produce', ...(isLong(word) || !typing ? [] : ['type']), ...(speaking && recognitionSupported() ? ['speak'] : []),
    // …and the word in its example sentence, when it stands there as written.
    ...(lang && clozeItem(lang, word) ? ['cloze'] : []),
    // A mixed round also asks how a word sounds, where the course teaches that: its stress, or its beats.
    ...(lang?.stressPractice && stressItem(lang, word) ? ['stress'] : []),
    ...(lang?.beatPractice && beatItem(lang, word) ? ['beats'] : []),
    ...(lang?.misread && misreadItem(lang, word) ? ['letters'] : [])];
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function practice(ctx, mode, scope) {
  const modeDef = MODES.find((m) => m.id === mode);
  if (!modeDef || !offered(modeDef, ctx.lang)) return setup(ctx);
  if (mode === 'build' || mode === 'dictation') return sentenceRound(ctx, scope, mode === 'dictation');
  // Reading the script is for words and short phrases, not whole sentences.
  const pool = wordsFor(ctx, scope).filter((w) => (mode !== 'script' || w.tr.trim().split(/\s+/).length <= 3)
    && (mode !== 'stress' || stressItem(ctx.lang, w)) // single words of two or more syllables
    && (mode !== 'beats' || beatItem(ctx.lang, w))
    && (mode !== 'letters' || misreadItem(ctx.lang, w))
    && (mode !== 'cloze' || clozeItem(ctx.lang, w)));
  if (pool.length < 4) return notEnough('Not enough words yet', 'Learn a lesson first, or pick a topic to practise from.');
  if (mode === 'handsfree') return handsFree(ctx, pool);
  // Tricky letters: words with a real choice (two or more ways to misread them) come first.
  const rich = mode === 'letters' ? pool.filter((w) => misreadItem(ctx.lang, w).wrong.length >= 2) : [];

  const items = shuffle(rich.length >= ROUND ? rich : pool).slice(0, ROUND).map((word) => ({ word, type: typeFor(mode, word, ctx.lang, { typing: ctx.settings.typing !== false, speaking: ctx.settings.speaking !== false }) }));
  let right = 0;
  let answered = 0;
  const missed = [];

  return h('div', { class: 'view' }, runSession(ctx, {
    label: 'Practice',
    exitHref: '#/practice',
    items,
    onResult(item, r) {
      if (r.skipped) return { word: item.word, type: 'flashcard' };
      answered++;
      if (r.correct) right++;
      else missed.push(item.word);
      ctx.store.logActivity(ctx.lang.code, { practiced: 1 });
      return null;
    },
    onFinish: () => summary(ctx, right, answered, null, missed),
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

function summary(ctx, right, answered, back = null, missed = []) {
  return h('div', { class: 'summary' },
    h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === answered ? '🌟' : '👏'),
    h('h2', null, 'Practice done'),
    h('p', { class: 'big-number' }, `${right}/${answered}`),
    h('p', { class: 'muted' }, 'Practice doesn’t change your review schedule — it’s just for fun and extra reps.'),
    h('div', { class: 'actions stack' },
      h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Another round', icon('arrow', 18)),
      back || h('a', { class: 'btn wide', href: '#/practice' }, 'Change mode or topic'),
      h('a', { class: 'btn ghost wide', href: '#/' }, 'Back home')),
    // Under the buttons, so “Another round” stays where the thumb is.
    missedChips(ctx, missed),
  );
}

/** Sentences mode: build up to ROUND sentences of the scope from shuffled word tiles. */
function sentenceRound(ctx, scope = 'learned', byEar = false) {
  const { lang } = ctx;
  // 'text:<id>': the lines of a Read & Listen text. The texts load on demand.
  const textId = scope.startsWith('text:') ? scope.slice('text:'.length) : null;
  if (textId && !cachedTexts(lang.code)) {
    let gone = false;
    ctx.onCleanup(() => { gone = true; });
    loadTexts(lang.code).then(() => { if (!gone) ctx.rerender(); }).catch(() => { if (!gone) ctx.replace('/read'); });
    return h('div', { class: 'view' }, h('p', { class: 'muted', role: 'status' }, 'Loading the text…'));
  }
  const text = textId ? (cachedTexts(lang.code) || []).find((t) => t.id === textId) : null;
  const textHref = text && `#/read/${encodeURIComponent(text.id)}`;
  const pool = textId ? textSentences(lang, text) : sentencesFor(lang, scope, { cards: ctx.store.getCards(lang.code) });
  const lesson = scope.startsWith('grammar:') ? (lang.grammar || []).find((l) => `grammar:${l.id}` === scope) : null;
  const lessonHref = lesson && `#/grammar/${encodeURIComponent(lesson.id)}`;
  if (pool.length < MIN_SENTENCES) {
    // Phrase topics have the most sentences; a word topic only has its example sentences.
    const hint = scope === 'learned' ? 'Learn a few phrases first, or practise the sentences of a Phrases topic.'
      : textId ? 'This text has too few lines that can be built from tiles.'
      : lesson ? 'This lesson has too few example sentences to build.'
        : 'This topic has too few example sentences to build. Phrases topics have plenty — or try all of them.';
    return notEnough('Not enough sentences yet', hint,
      h('a', { class: 'btn primary wide', href: `#/practice/${byEar ? 'dictation' : 'build'}/all` }, 'Practise all sentences', icon('arrow', 18)));
  }

  const items = shuffle(pool).slice(0, ROUND).map((s) => ({ word: s, type: 'build', meta: { sentence: s, byEar } }));
  let right = 0;
  let answered = 0;

  return h('div', { class: 'view' }, runSession(ctx, {
    label: byEar ? 'Dictation' : 'Sentence practice',
    exitHref: lessonHref || textHref || '#/practice',
    items,
    onResult(item, r) {
      // A skipped sentence just moves on: there is no word to fall back on.
      if (r.skipped) return null;
      answered++;
      if (r.correct) right++;
      ctx.store.logActivity(lang.code, { practiced: 1 });
      if (byEar && r.correct) ctx.game.count?.({ lang: lang.code, key: 'dictations' });
      return null;
    },
    onFinish: () => summary(ctx, right, answered,
      lesson ? h('a', { class: 'btn wide', href: lessonHref }, `Back to “${lesson.title}”`)
        : text ? h('a', { class: 'btn wide', href: textHref }, `Back to “${text.title}”`) : null),
  }));
}

function setup(ctx) {
  const { lang } = ctx;
  const learned = learnedWords(ctx).length;
  let mode = 'mixed';
  let scope = learned >= 4 ? 'learned' : ctx.lang.categories[0].id;

  const modes = MODES.filter((m) => offered(m, lang));
  const modeButtons = modes.map((m) => {
    const disabled = m.needsMic && !recognitionSupported();
    return h('button', {
      type: 'button', class: `choice${m.id === mode ? ' selected' : ''}`, disabled,
      'aria-pressed': String(m.id === mode),
      title: disabled ? 'Speech recognition isn’t available in this browser' : null,
      onclick: (e) => { mode = m.id; select(modeButtons, e.currentTarget); paintHint(); refreshScopes(); },
    }, icon(m.icon, 20), h('b', null, m.name), h('small', null, disabled ? 'Not supported here' : m.desc));
  });
  // The cards are compact (icon and name); what the chosen mode does is said in one line below them.
  const modeHint = h('p', { class: 'hint mode-hint', 'aria-live': 'polite' });
  const paintHint = () => { modeHint.textContent = `${modes.find((m) => m.id === mode)?.desc || ''}.`; };
  paintHint();

  // What to practise: three quick choices, or any one topic from a menu
  // grouped like Learn (Words / Phrases / Talk like a local).
  const savedCount = ctx.store.getFavs(lang.code).filter((id) => lang.byId(id)).length;
  const trickyCount = trickyWords(ctx).length;
  const pills = [
    { id: 'learned', name: `Words I’ve learned (${learned})`, disabled: learned < 4 },
    { id: 'all', name: `All words (${lang.words.length})` },
    { id: 'saved', name: `★ Saved (${savedCount})`, disabled: savedCount < 4, why: 'Save at least 4 words or phrases (☆) first' },
    // Shown once there is something in it: the words you keep forgetting in reviews.
    ...(trickyCount ? [{ id: 'tricky', name: `Tricky words (${trickyCount})`, disabled: trickyCount < 4, why: 'Needs at least 4 words you have missed in reviews' }] : []),
  ];
  const isPill = (id) => pills.some((p) => p.id === id);
  const pillButtons = pills.map((s) => h('button', {
    type: 'button', class: 'pill', disabled: !!s.disabled, title: s.disabled ? s.why || null : null,
    onclick: () => { scope = s.id; paintScope(); },
  }, s.name));
  const grouped = GROUPS.map((g) => ({ g, cats: lang.categories.filter((c) => (c.group || 'words') === g.id) }))
    .filter(({ cats }) => cats.length);
  const topicSelect = h('select', {
    class: 'select topic-select', 'aria-label': 'Or one topic',
    onchange: (e) => { if (e.target.value) { scope = e.target.value; paintScope(); } },
  },
    h('option', { value: '' }, 'Or one topic…'),
    grouped.map(({ g, cats }) => h('optgroup', { label: g.title }, cats.map((c) => h('option', { value: c.id }, `${c.emoji} ${c.name}`)))));
  function paintScope() {
    pillButtons.forEach((b, i) => {
      const on = pills[i].id === scope;
      b.classList.toggle('selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
    topicSelect.value = isPill(scope) ? '' : scope;
    topicSelect.classList.toggle('chosen', !isPill(scope));
  }
  const scopeTitle = h('h2', { class: 'section-title' }, 'What to practise');
  const scopeRows = [h('div', { class: 'pill-row' }, pillButtons), topicSelect];

  // Sentences mode: scopes with too few sentences can't be picked (Japanese word
  // topics have none — their example sentences have no kana reading to cut into tiles).
  let counts = null;
  const sentenceCount = (id) => {
    if (!counts) {
      const cards = ctx.store.getCards(lang.code);
      counts = new Map([...pills.map((p) => p.id), ...lang.categories.map((c) => c.id)]
        .map((id) => [id, id === 'saved' || id === 'tricky' ? 0 : sentencesFor(lang, id, { cards }).length]));
    }
    return counts.get(id);
  };
  function refreshScopes() {
    const build = mode === 'build' || mode === 'dictation';
    scopeTitle.textContent = build ? 'Sentences from' : 'What to practise';
    pills.forEach((s, i) => {
      const few = build && sentenceCount(s.id) < MIN_SENTENCES;
      pillButtons[i].disabled = !!s.disabled || few;
      if (few) pillButtons[i].title = 'Too few sentences to build';
      else if (s.disabled && s.why) pillButtons[i].title = s.why;
      else pillButtons[i].removeAttribute('title');
    });
    for (const opt of topicSelect.querySelectorAll('option[value]:not([value=""])')) {
      const few = build && sentenceCount(opt.value) < MIN_SENTENCES;
      opt.disabled = few;
    }
    const current = isPill(scope) ? pillButtons[pills.findIndex((p) => p.id === scope)].disabled
      : topicSelect.querySelector(`option[value="${CSS.escape(scope)}"]`)?.disabled;
    if (current) scope = 'all';
    paintScope();
  }
  paintScope();

  return h('div', { class: 'view practice' },
    h('h1', null, 'Practice'),
    reviewCard(ctx),
    weakLink(ctx),
    h('h2', { class: 'section-title' }, 'Speak & listen'),
    h('div', { class: 'shortcuts speak-links' },
      speakLink('#/speak/drill', icon('mic', 22), 'Speak', 'Say words, get a score'),
      speakLink('#/speak/ear', icon('ear', 22), 'Ear training', 'Hear the difference'),
      speakLink('#/speak/alphabet', h('span', { class: 'sc-emoji', 'aria-hidden': 'true', lang: lang.code }, lang.code === 'ja' ? 'あ' : lang.code === 'ar' ? 'ع' : lang.code === 'uk' ? 'Ї' : 'Ğ'), 'Alphabet', lang.code === 'ja' ? 'Kana chart' : 'Letters & sounds'),
      speakLink('#/speak/sounds', icon('wave', 22), 'Sounds', 'Tricky sounds explained')),
    h('a', { class: 'quick-link', href: '#/numbers' },
      h('span', { class: 'sc-emoji', 'aria-hidden': 'true' }, '🔢'),
      h('span', null, h('b', null, 'Numbers by ear'), h('small', null, 'Hear a number, type its digits')),
      icon('arrow', 18)),
    h('h2', { class: 'section-title' }, 'Quick round'),
    h('p', { class: 'hint' }, `${ROUND} questions in the mode you like. Practice doesn’t change your review schedule.`),
    h('div', { class: 'choice-grid practice-modes' }, modeButtons),
    modeHint,
    scopeTitle,
    scopeRows,
    h('div', { class: 'actions sticky' },
      h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.go(`/practice/${mode}/${scope}`) }, 'Start', icon('arrow', 18))),
  );
}

/** Reviews come first: due words (spaced repetition), or when the next ones are due. */
function reviewCard(ctx) {
  const due = dueWords(ctx).length;
  if (due) {
    return h('a', { class: 'cta', href: '#/review' },
      h('span', { class: 'cta-icon' }, icon('repeat', 26)),
      h('span', null, h('b', null, `Review ${due} word${due === 1 ? '' : 's'}`), h('small', null, 'Due now · spaced repetition')),
      icon('arrow'));
  }
  const next = nextReviews(ctx.lang, ctx.store.getCards(ctx.lang.code));
  return h('a', { class: 'quick-link review-idle', href: '#/review' },
    icon('check', 22),
    h('span', null, h('b', null, 'No reviews due'), h('small', null, next ? `Next: ${next.text}` : 'Learn a lesson and its words come back here')),
    icon('arrow', 18));
}

function speakLink(href, ic, title, sub) {
  return h('a', { class: 'shortcut', href, title: sub }, ic, h('span', null, h('b', null, title), h('small', null, sub)));
}

function select(buttons, el) {
  buttons.forEach((b) => { b.classList.toggle('selected', b === el); b.setAttribute('aria-pressed', String(b === el)); });
}
