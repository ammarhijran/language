// Read & Listen: graded dialogues, stories, everyday texts and short speeches.
//   #/read                         the list, with level and kind filters
//   #/read/<id>                    the reader: player bar, lines, glossary, questions
//   #/read/<id>/practice/<mode>    speeches: repeat line by line, shadow, record
//   #/read/<id>/roleplay/<n>       dialogues: play one of the speakers
// Texts load on demand (js/reader.js), so the first visit renders a short
// loading state and fills in; later visits render straight away.
import { h, icon, set, bindKeys, meter } from '../ui.js';
import { voiceBanner, diffLine, praiseLine, cleanupScope, backLink, readingText } from '../components.js';
import { rich } from './grammar.js';
import * as speech from '../speech.js';
import { newCard } from '../srs.js';
import {
  KINDS, LEVELS, REGISTERS, loadTexts, cachedTexts, sortTexts, filterTexts, estimateMinutes, speakerIndex,
  canRolePlay, nextText, findWord, fadeLine, SHADOW_ROUNDS, createPlayer, listenTimeout,
  scoreLine, verdict, recordClip, playClip, clock, recordLimit, isLongRead, ownTextFor, splitIntoLines, OWN_LINES_MAX, markAll, extraGlossary,
} from '../reader.js';

// The Learn screen's entry card lives in reader.js, so Learn doesn't load this view.
export { readLink } from '../reader.js';

const MODES = [
  { id: 'repeat', emoji: '🔁', title: 'Listen & repeat', short: 'Repeat', hint: 'Hear each line, then say it yourself.' },
  { id: 'shadow', emoji: '👥', title: 'Shadowing', short: 'Shadow', hint: 'Speak along with the voice while the text fades out over three rounds.' },
  { id: 'record', emoji: '🎙️', title: 'Record the speech', short: 'Record', hint: 'Give the whole speech, then compare it with the model.' },
];
const TRANSLATION = { show: 'Shown', tap: 'On tap', hide: 'Hidden' };

// Icons the shared set doesn't have.
const GLYPHS = {
  pause: '<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>',
  prev: '<path d="M18 19 9 12l9-7z" fill="currentColor" stroke="none"/><path d="M6 5v14"/>',
  next: '<path d="m6 5 9 7-9 7z" fill="currentColor" stroke="none"/><path d="M18 5v14"/>',
};
function glyph(name, size = 20) {
  const span = document.createElement('span');
  span.className = 'icon';
  span.setAttribute('aria-hidden', 'true');
  span.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[name]}</svg>`;
  return span;
}

const reduceMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const href = (...parts) => `#/read/${parts.map((p) => encodeURIComponent(p)).join('/')}`;
const pct = (x) => `${Math.round(x * 100)}%`;
const textAttrs = (lang) => ({ lang: lang.code, dir: lang.dir === 'rtl' ? 'rtl' : null });

/**
 * What to hand ctx.say for a line or glossary item: the entry itself when the
 * pack can use it (its reading, pausal forms, an Egyptian voice for a text in
 * dialect), else just its text.
 */
function sayable(ctx, text, entry) {
  if (typeof ctx.lang.speech !== 'function') return entry.tr;
  return text?.dialect && !entry.dialect ? { ...entry, dialect: text.dialect } : entry;
}
/** The recogniser's locale for a line (Egyptian Arabic listens as ar-EG). */
const listenLang = (ctx, entry) => (typeof ctx.lang.speech === 'function' && ctx.lang.speech(entry)?.lang) || ctx.lang.speechLang;

/** Reader options, remembered on this device (settings aren't synced). */
function prefs(ctx) {
  const s = ctx.settings;
  return {
    slow: s.readSlow === true,
    translation: TRANSLATION[s.readTranslation] ? s.readTranslation : 'show',
    reading: s.readReading !== false,
  };
}

// The list's filters last while the app is open.
const filters = { level: 'all', kind: null };

// ---------- Small pieces ----------

function registerBadge(reg) {
  const r = REGISTERS[reg];
  return r ? h('span', { class: `badge ${r.cls}` }, r.label) : null;
}
const dialectBadge = (d) => (d ? h('span', { class: 'badge read-dialect' }, d === 'Egyptian' ? '🇪🇬 Egyptian' : d) : null);
const levelBadge = (level) => h('span', { class: `badge level-${level}` }, level);
const longBadge = (t) => (isLongRead(t) ? h('span', { class: 'badge read-long' }, 'Long read') : null);

function toggle(label, on, onChange, extra = {}) {
  const btn = h('button', {
    type: 'button', class: `pill read-toggle${on ? ' selected' : ''}`, 'aria-pressed': String(on), ...extra,
    onclick: () => {
      const now = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(now));
      btn.classList.toggle('selected', now);
      onChange(now);
    },
  }, label);
  return btn;
}

/** A label with a shorter form for narrow screens (CSS picks one). */
const label = (long, short) => [h('span', { class: 'read-long' }, long), h('span', { class: 'read-short', 'aria-hidden': 'true' }, short)];

/** Focus a heading that arrived after the screen rendered (texts loaded later). */
function focusHeading(root) {
  const el = root.querySelector('h1');
  const a = document.activeElement;
  if (!el || (a && a !== document.body && a !== document.getElementById('view') && a.isConnected)) return;
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

/** The sticky bar sits under the (sticky) top bar, whatever its height. */
function stickUnderTopbar(ctx, el) {
  const place = () => el.style.setProperty('--read-top', `${Math.round(document.querySelector('.topbar')?.getBoundingClientRect().height || 0)}px`);
  place();
  window.addEventListener('resize', place);
  ctx.onCleanup(() => window.removeEventListener('resize', place));
}

/**
 * Scroll a row into the part of the screen the sticky bars don't cover:
 * centred there when it fits, else with its top just under the bar.
 */
function bringIntoView(row, bar) {
  const r = row.getBoundingClientRect();
  const topbar = document.querySelector('.topbar')?.getBoundingClientRect().bottom || 0;
  const bottom = window.innerHeight - (document.querySelector('.tabbar')?.getBoundingClientRect().height || 0) - 8;
  if (r.top >= Math.max(topbar, bar?.getBoundingClientRect().bottom || 0) + 8 && r.bottom <= bottom) return;
  // Aim below where the sticky bar will be once the page has scrolled: a bar
  // still lower down in the page (not stuck yet) moves up with the scroll, so
  // its current position would leave almost no room on a small screen.
  const stuck = bar ? (parseFloat(getComputedStyle(bar).top) || 0) + bar.offsetHeight : 0;
  const top = Math.max(topbar, stuck) + 8;
  const delta = r.height > bottom - top ? r.top - top : (r.top + r.bottom) / 2 - (top + bottom) / 2;
  window.scrollBy({ top: delta, behavior: reduceMotion() ? 'auto' : 'smooth' });
}

/** Speaker label, text (with glossary words), reading and translation of one line. */
function lineBody(ctx, text, line, { glossary = null, extra = [], onGloss } = {}) {
  const { lang } = ctx;
  const reading = lang.reading(line);
  const parts = glossary
    ? markAll(lang, line.tr, glossary, extra).map((seg) => (seg.gloss == null ? seg.text : h('button', {
      type: 'button', class: `gloss${seg.gloss >= glossary.length ? ' gloss-course' : ''}`, 'aria-haspopup': 'dialog', title: (glossary[seg.gloss] || extra[seg.gloss - glossary.length]).en,
      onclick: (e) => { e.stopPropagation(); onGloss(seg.gloss, e.currentTarget); },
    }, seg.text)))
    : line.tr;
  return [
    h('p', { class: 'read-tr', ...textAttrs(lang) }, parts),
    readingText(reading, 'reading small read-reading'),
    h('p', { class: 'read-en' }, line.en),
  ];
}

function speakerLabel(text, line, spk) {
  if (!line.speaker || spk.size < 2) return null;
  return h('span', { class: 'read-speaker' }, line.speaker);
}
const speakerClass = (line, spk) => (line.speaker && spk.size >= 2 ? ` spk spk-${spk.get(line.speaker) % 5}` : '');

// ---------- List ----------

function ownCard(ctx, t) {
  return h('a', { class: 'read-card', href: href(t.id) },
    h('span', { class: 'read-emoji', 'aria-hidden': 'true' }, '✍️'),
    h('span', { class: 'read-card-text' },
      h('b', { ...textAttrs(ctx.lang) }, t.title),
      h('span', { class: 'read-meta' }, h('span', null, `${t.lines.length} line${t.lines.length === 1 ? '' : 's'} · ~${estimateMinutes(t)} min`))));
}

/** "My texts": the learner's own texts and the way to add one. */
function ownSection(ctx, own) {
  return h('section', { class: 'read-own' },
    h('div', { class: 'title-row' },
      h('h2', { class: 'section-title' }, 'My texts'),
      h('a', { class: 'btn small', href: href('new') }, '＋ Add a text')),
    own.length
      ? h('div', { class: 'read-list' }, own.map((t) => ownCard(ctx, t)))
      : h('p', { class: 'hint' }, `Paste your own ${ctx.lang.name} — a self-introduction, a speech, a message your teacher corrected — and practise it line by line: listen, repeat, shadow and record.`));
}

/** At the top of the list: the learner's texts when there are some, else one line that leads to adding one. */
function ownTop(ctx, own) {
  if (own.length) return ownSection(ctx, own);
  return h('a', { class: 'quick-link read-own-link', href: href('new') },
    h('span', { class: 'read-emoji', 'aria-hidden': 'true' }, '✍️'),
    h('span', null, h('b', null, 'Practise your own text'), h('small', null, 'Paste a speech or an introduction and rehearse it with the voice')),
    icon('arrow', 18));
}

function textCard(ctx, t) {
  const { lang } = ctx;
  const best = ctx.game.textBest(lang.code, t.id);
  const kind = KINDS[t.kind] || KINDS.story;
  return h('a', { class: `read-card${best != null ? ' done' : ''}`, href: href(t.id) },
    h('span', { class: 'read-emoji', 'aria-hidden': 'true' }, kind.emoji),
    h('span', { class: 'read-card-text' },
      h('b', null, t.title),
      h('span', { class: 'read-native', ...textAttrs(lang) }, t.titleNative),
      h('span', { class: 'read-meta' },
        levelBadge(t.level),
        h('span', null, `${kind.one} · ${t.lines.length} lines · ~${estimateMinutes(t)} min`),
        longBadge(t), registerBadge(t.register), dialectBadge(t.dialect))),
    best != null
      ? h('span', { class: 'read-score' }, h('span', { 'aria-hidden': 'true' }, '✓'), h('small', null, h('span', { class: 'read-sr' }, 'Done, best score '), pct(best)))
      : null);
}

function emptyState(ctx) {
  const { lang } = ctx;
  return h('section', { class: 'card read-empty' },
    h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, '🎧'),
    h('h2', null, `${lang.name} texts are coming soon`),
    h('p', { class: 'muted' }, lang.code === 'ar'
      ? 'Dialogues, stories and short speeches in Modern Standard Arabic — with everyday Egyptian versions where people speak differently — are being written. Each will have audio line by line, a glossary and questions.'
      : 'Dialogues, stories and short speeches are being written. Each will have audio line by line, a glossary and questions.'),
    h('div', { class: 'actions stack' },
      lang.grammar?.length ? h('a', { class: 'btn primary wide', href: '#/grammar' }, `${lang.name} grammar`, icon('arrow', 18)) : null,
      h('a', { class: 'btn wide', href: '#/learn' }, 'Back to topics')));
}

function listView(ctx, texts, own = []) {
  const { lang } = ctx;
  const all = sortTexts(texts);
  const head = [
    backLink(ctx, '#/learn/g/read', 'Learn'),
    h('h1', null, 'Read & Listen'),
  ];
  if (!all.length) return [...head, ownTop(ctx, own), emptyState(ctx)];

  const done = all.filter((t) => ctx.game.textBest(lang.code, t.id) != null).length;
  const listEl = h('div', { class: 'read-list' });
  const status = h('p', { class: 'read-sr', role: 'status', 'aria-live': 'polite' });
  const levelBtns = ['all', ...LEVELS].map((l) => h('button', {
    type: 'button', class: 'pill', onclick: () => { filters.level = l; update(true); },
  }, l === 'all' ? 'All' : l));
  const kindBtns = Object.entries(KINDS).map(([k, info]) => h('button', {
    type: 'button', class: 'pill', onclick: () => { filters.kind = filters.kind === k ? null : k; update(true); },
  }, h('span', { 'aria-hidden': 'true' }, info.emoji), ` ${info.label} `, h('small', { class: 'read-chip-n' })));

  function update(announce) {
    levelBtns.forEach((b, i) => {
      const on = ['all', ...LEVELS][i] === filters.level;
      b.classList.toggle('selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
    Object.keys(KINDS).forEach((k, i) => {
      const on = filters.kind === k;
      kindBtns[i].classList.toggle('selected', on);
      kindBtns[i].setAttribute('aria-pressed', String(on));
      kindBtns[i].querySelector('.read-chip-n').textContent = String(filterTexts(all, { level: filters.level, kind: k }).length);
      kindBtns[i].disabled = !on && !filterTexts(all, { level: filters.level, kind: k }).length;
    });
    const shown = filterTexts(all, filters);
    set(listEl, shown.length
      ? shown.map((t) => textCard(ctx, t))
      : h('p', { class: 'muted read-none' }, 'No texts match these filters. ',
        h('button', { type: 'button', class: 'link-btn', onclick: () => { filters.level = 'all'; filters.kind = null; update(true); } }, 'Show all texts')));
    if (announce) status.textContent = `${shown.length} text${shown.length === 1 ? '' : 's'} shown`;
  }
  update(false);

  return [
    ...head,
    h('p', { class: 'muted' }, `${all.length} graded texts with audio line by line: dialogues, short stories, everyday texts and speeches. Tap words for their meaning, then check you understood.`),
    h('div', { class: 'read-progress' },
      meter(done, all.length, done === all.length ? 'done' : ''),
      h('span', { class: 'muted small' }, `${done} of ${all.length} done`)),
    ownTop(ctx, own),
    h('div', { class: 'read-filters' },
      h('div', { class: 'pill-row', role: 'group', 'aria-label': 'Level' }, levelBtns),
      h('div', { class: 'pill-row', role: 'group', 'aria-label': 'Kind of text' }, kindBtns)),
    status,
    listEl,
  ];
}

// ---------- My texts: add or edit ----------

function editor(ctx, rec) {
  const { lang, store } = ctx;
  const title = h('input', { type: 'text', class: 'select', id: 'own-title', maxlength: '80', value: rec?.title || '', placeholder: 'For example: My introduction' });
  const body = h('textarea', {
    class: 'own-body', id: 'own-body', rows: '10', ...textAttrs(lang), spellcheck: 'false', autocapitalize: 'sentences',
    placeholder: `Type or paste your ${lang.name} text here.`,
  });
  body.value = rec?.body || '';
  const count = h('p', { class: 'hint', 'aria-live': 'polite' });
  const paint = () => {
    const n = splitIntoLines(body.value).length;
    count.textContent = !body.value.trim() ? 'One sentence becomes one line to listen to and repeat.'
      : `${n} line${n === 1 ? '' : 's'}${n >= OWN_LINES_MAX ? ` (the first ${OWN_LINES_MAX} — split a longer text in two)` : ''} · ${body.value.trim().length} of ${store.OWN_TEXT_MAX} characters`;
  };
  body.addEventListener('input', paint);
  paint();
  const save = () => {
    if (!body.value.trim()) { ctx.toast('Type or paste some text first.'); body.focus(); return; }
    const id = store.saveOwnText(lang.code, { id: rec?.id, title: title.value, body: body.value });
    if (!id) { ctx.toast(`You can keep ${store.OWN_TEXTS_MAX} texts per language. Delete one first.`); return; }
    store.flush?.();
    ctx.replace(`/read/${id}`);
  };
  const remove = () => {
    if (!confirm('Delete this text? This can’t be undone.')) return;
    store.deleteOwnText(lang.code, rec.id);
    ctx.replace('/read');
  };
  queueMicrotask(() => { document.title = `${rec ? 'Edit my text' : 'Add a text'} · Read & Listen · Lisan`; });
  return [
    backLink(ctx, rec ? href(rec.id) : '#/read', rec ? 'Back to the text' : 'All texts'),
    h('h1', null, rec ? 'Edit my text' : 'Add a text'),
    h('p', { class: 'muted' }, `The app reads your text aloud with the ${lang.name} voice and lets you repeat, shadow and record it. It does not correct or translate it — use a text you trust.`),
    h('section', { class: 'card form' },
      h('label', { class: 'field', for: 'own-title' }, h('span', null, 'Title (optional)'), title),
      h('label', { class: 'field', for: 'own-body' }, h('span', null, `Your text in ${lang.name}`), body),
      count,
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn primary', onclick: save }, icon('check', 16), 'Save'),
        rec ? h('button', { type: 'button', class: 'btn danger', onclick: remove }, 'Delete') : null),
      h('p', { class: 'hint' }, 'Your texts stay on this device (and in a backup file you export). They are not part of sync codes. They are read by your device’s voice — with an online voice, each sentence is sent to that voice’s provider.')),
  ];
}

// ---------- Glossary sheet ----------

/** `say` speaks the word (the reader pauses Play all first, so the two don't cut each other off). */
function glossSheet(ctx, text, host, { say = ctx.say, onOpen, items = text.glossary } = {}) {
  const { lang, store } = ctx;
  let el = null;
  let opener = null;

  function close({ restore = true } = {}) {
    if (!el) return;
    document.removeEventListener('keydown', onKey, true);
    el.remove();
    el = null;
    if (restore && opener?.isConnected) opener.focus({ preventScroll: true });
  }
  // Modal: keys don't reach the reader's shortcuts; Tab stays inside the sheet.
  function onKey(e) {
    if (!el) return;
    e.stopPropagation();
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      const items = [...el.querySelectorAll('button, a[href]')].filter((x) => !x.disabled);
      const at = items.indexOf(document.activeElement);
      e.preventDefault();
      items[at < 0 ? 0 : (at + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
    }
  }
  ctx.onCleanup(() => close({ restore: false }));

  function vocab(word) {
    const box = h('div', { class: 'sheet-vocab' });
    const link = () => h('a', { class: 'btn small', href: `#/word/${encodeURIComponent(word.id)}` }, 'Open word page', icon('arrow', 16));
    const paint = () => {
      const card = store.getCard(lang.code, word.id);
      set(box,
        card
          ? h('p', { class: 'sheet-status', tabindex: '-1' }, icon('check', 16), card.known ? 'Marked as already learned' : 'In your reviews')
          : h('button', {
            type: 'button', class: 'btn small primary',
            onclick: () => {
              store.setCard(lang.code, word.id, newCard());
              ctx.toast(`Added “${word.tr}” to your reviews`);
              paint();
              box.querySelector('.sheet-status')?.focus({ preventScroll: true });
            },
          }, icon('repeat', 16), 'Add to reviews'),
        link());
    };
    paint();
    return box;
  }

  function open(gi, from) {
    close({ restore: false });
    onOpen?.();
    opener = from;
    const item = items[gi];
    const word = findWord(lang, item);
    const reading = lang.reading(item);
    const listen = h('button', { type: 'button', class: 'btn small', onclick: () => say(sayable(ctx, text, item)) }, icon('volume', 16), 'Listen');
    el = h('div', { class: 'sheet-wrap' },
      h('div', { class: 'sheet-backdrop', onclick: () => close() }),
      h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'sheet-word', 'aria-describedby': 'sheet-en' },
        h('button', { type: 'button', class: 'icon-btn sheet-close', 'aria-label': 'Close', onclick: () => close() }, icon('x')),
        h('p', { class: 'kicker' }, item.exact ? 'From your word lists' : 'Glossary'),
        h('h2', { id: 'sheet-word', class: 'sheet-word', ...textAttrs(lang) }, item.tr),
        readingText(reading),
        h('p', { id: 'sheet-en', class: 'sheet-en' }, item.en),
        h('div', { class: 'button-row' },
          listen,
          h('button', { type: 'button', class: 'btn small', onclick: () => say(sayable(ctx, text, item), { slow: true }) }, icon('slow', 16), 'Slowly')),
        word ? h('div', { class: 'sheet-word-info' },
          h('p', { class: 'hint' }, 'In your word lists: ', h('b', { ...textAttrs(lang) }, word.tr), ` — ${word.en}`),
          vocab(word)) : null,
        item.exact ? h('p', { class: 'hint' }, 'Matched by spelling with a word of the course — in this sentence it may mean something else.') : null));
    host.append(el);
    document.addEventListener('keydown', onKey, true);
    if (ctx.settings.autoplay !== false) say(sayable(ctx, text, item), { auto: true });
    requestAnimationFrame(() => listen.focus({ preventScroll: true }));
  }

  return { open, close, isOpen: () => !!el };
}

// ---------- Quiz ----------

function textQuiz(ctx, texts, text) {
  const { lang } = ctx;
  const wrap = h('section', { class: 'card g-quiz read-quiz' });
  const qs = text.questions || [];

  function result(correct, xp) {
    const next = nextText(texts, text.id, (id) => ctx.game.textBest(lang.code, id) != null);
    const title = h('h2', { tabindex: '-1' }, `${correct} / ${qs.length} correct`);
    const box = h('div', { class: 'summary g-result' },
      h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, correct === qs.length ? '🌟' : '📘'),
      title,
      xp ? h('p', { class: 'muted' }, `+${xp} XP`) : h('p', { class: 'hint' }, 'XP for a text is counted once a day — your best score is kept.'),
      h('div', { class: 'actions stack' },
        next ? h('a', { class: 'btn primary wide', href: href(next.id) }, `Next: ${next.title}`, icon('arrow', 18)) : null,
        text.kind === 'speech' ? h('a', { class: 'btn wide', href: href(text.id, 'practice', 'repeat') }, '🎤 Practise this speech') : null,
        canRolePlay(text) ? h('a', { class: 'btn wide', href: href(text.id, 'roleplay') }, '🎭 Role-play this dialogue') : null,
        h('button', { type: 'button', class: 'btn wide', onclick: () => { set(wrap, ...questions()); wrap.querySelector('.option')?.focus(); } }, 'Answer the questions again'),
        h('a', { class: 'btn ghost wide', href: '#/read' }, 'All texts')));
    wrap.append(box);
    title.focus({ preventScroll: true });
  }

  function questions() {
    const answers = new Array(qs.length).fill(null);
    const items = qs.map((q, qi) => {
      const feedback = h('p', { class: 'g-explain', 'aria-live': 'polite' });
      const buttons = q.options.map((opt, oi) => h('button', {
        type: 'button', class: 'option',
        onclick: (e) => {
          if (answers[qi] !== null) return;
          answers[qi] = oi;
          buttons.forEach((b, j) => {
            b.disabled = true;
            if (j === q.answer) b.classList.add('correct');
            else if (j === oi) b.classList.add('wrong');
          });
          set(feedback, h('b', null, oi === q.answer ? 'Correct. ' : 'Not quite. '), rich(q.explain || ''));
          if (answers.every((a) => a !== null)) {
            const correct = answers.filter((a, i) => a === qs[i].answer).length;
            ctx.store.logActivity(lang.code, { practiced: qs.length });
            const xp = ctx.game.textDone({ lang: lang.code, id: text.id, correct, total: qs.length });
            result(correct, xp);
            ctx.flushRewards?.();
          } else if (e.detail === 0) {
            // Answered from the keyboard: the button just got disabled, so move
            // on to the next unanswered question (Space mustn't fall through to
            // the player's play/pause shortcut).
            const nextQ = answers.findIndex((a) => a === null);
            requestAnimationFrame(() => wrap.querySelectorAll('.g-q')[nextQ]?.querySelector('.option')?.focus({ preventScroll: true }));
          }
        },
      }, h('span', { class: 'option-label' }, rich(opt))));
      return h('div', { class: 'g-q', role: 'group', 'aria-label': `Question ${qi + 1}` },
        h('p', { class: 'g-q-text' }, h('b', null, `${qi + 1}. `), rich(q.q)),
        h('div', { class: 'options' }, buttons),
        feedback);
    });
    return [h('h2', { class: 'card-title' }, '✏️ Did you understand?'), items];
  }

  if (!qs.length) return null;
  set(wrap, ...questions());
  return wrap;
}

// ---------- Reader ----------

function practiceCard(text) {
  if (text.kind === 'speech') {
    return h('section', { class: 'card read-practice' },
      h('h2', { class: 'card-title' }, '🎤 Practise this speech'),
      h('div', { class: 'read-modes' }, MODES.map((m) => h('a', { class: 'read-mode', href: href(text.id, 'practice', m.id) },
        h('span', { 'aria-hidden': 'true' }, m.emoji), h('span', null, h('b', null, m.title), h('small', null, m.hint))))));
  }
  if (canRolePlay(text)) {
    const spk = speakerIndex(text);
    return h('section', { class: 'card read-practice' },
      h('h2', { class: 'card-title' }, '🎭 Role-play'),
      h('p', { class: 'muted small' }, 'Take a part: the app says the other lines and waits for yours.'),
      h('div', { class: 'button-row' }, [...spk.keys()].map((name, i) => h('a', { class: `btn small spk-btn spk-${i % 5}`, href: href(text.id, 'roleplay', String(i)) }, `Be ${name}`))));
  }
  return null;
}

function readerView(ctx, texts, text) {
  const { lang } = ctx;
  const p = prefs(ctx);
  const n = text.lines.length;
  const spk = speakerIndex(text);
  const hasReading = text.lines.some((l) => lang.reading(l));
  const best = ctx.game.textBest(lang.code, text.id);
  const kind = KINDS[text.kind] || KINDS.story;
  const host = h('div', { class: 'read-sheet-host' });
  // Other audio on this screen (a glossary word) pauses Play all first: it
  // would cut the current line off, and the player would take that for a
  // missing voice. Looking a word up also keeps the place in the text.
  const pausePlayer = () => { if (player.playing) player.pause(); };
  const sayAside = (target, opts) => { pausePlayer(); return ctx.say(target, opts); };
  // Besides the text's own glossary, the course's other words in it can be tapped.
  const extra = extraGlossary(lang, text);
  const sheet = glossSheet(ctx, text, host, { say: sayAside, onOpen: pausePlayer, items: [...text.glossary, ...extra] });
  let listenFirst = false;
  let current = -1;

  const live = h('p', { class: 'read-sr', 'aria-live': 'polite', 'aria-atomic': 'true' });
  const counter = h('span', { class: 'read-count', 'aria-hidden': 'true' }, `0 / ${n}`);

  const rows = text.lines.map((line, i) => {
    const en = () => li.querySelector('.read-en');
    const reveal = h('button', {
      type: 'button', class: 'link-btn read-reveal', 'aria-expanded': 'false',
      onclick: (e) => {
        e.stopPropagation();
        li.classList.add('revealed');
        reveal.setAttribute('aria-expanded', 'true');
        en().setAttribute('tabindex', '-1');
        en().focus({ preventScroll: true });
      },
    }, 'Show translation');
    const li = h('li', {
      class: `read-line${speakerClass(line, spk)}`,
      // Tapping the line plays it (the buttons inside do their own thing).
      onclick: (e) => { if (!e.target.closest('button, a, select')) player.jump(i); },
    },
      speakerLabel(text, line, spk),
      h('div', { class: 'read-row' },
        h('button', { type: 'button', class: 'icon-btn play read-play', 'aria-label': `Play line ${i + 1}`, onclick: (e) => { e.stopPropagation(); player.jump(i); } }, icon('volume')),
        h('div', { class: 'read-body' },
          h('span', { class: 'read-mask', 'aria-hidden': 'true', style: { '--w': `${Math.min(100, 25 + [...line.tr].length * 1.6)}%` } }),
          lineBody(ctx, text, line, { glossary: text.glossary, extra, onGloss: (gi, from) => sheet.open(gi, from) }),
          reveal)));
    return li;
  });
  const list = h('ol', { class: 'read-lines', 'aria-label': 'Text' }, rows);
  const hasEn = text.lines.some((l) => l.en);
  const applyView = () => {
    list.className = `read-lines tr-${hasEn ? p.translation : 'hide'}${p.reading ? '' : ' no-reading'}${listenFirst ? ' listen-first' : ''}`;
  };
  applyView();

  const player = createPlayer({
    count: n,
    say: (i) => ctx.say(sayable(ctx, text, text.lines[i]), { slow: p.slow }),
    onLine: (i) => highlight(i),
    onState: (playing) => paintPlay(playing),
    onEnd: () => { live.textContent = 'End of the text.'; },
    onFail: () => ctx.toast('Audio isn’t available — check that a voice is installed for this language.'),
  });
  ctx.onCleanup(() => player.stop());

  function highlight(i) {
    rows[current]?.classList.remove('current');
    rows[current]?.removeAttribute('aria-current');
    current = i;
    rows[i].classList.add('current');
    rows[i].setAttribute('aria-current', 'true');
    counter.textContent = `${i + 1} / ${n}`;
    const line = text.lines[i];
    live.textContent = `Line ${i + 1} of ${n}${line.speaker && spk.size > 1 ? `, ${line.speaker}` : ''}`;
    bringIntoView(rows[i], bar);
    if (!player.playing) paintPlay(false); // a tapped line: playing carries on from it
  }

  const playBtn = h('button', { type: 'button', class: 'btn primary small read-main', 'aria-keyshortcuts': 'Space', title: 'Play or pause (Space)', onclick: () => player.toggle() });
  function paintPlay(playing) {
    // Stopped part-way (paused, or a line tapped): play() carries on from the
    // current line, so the label must not promise the whole text.
    const midway = player.index > 0 && !player.ended;
    set(playBtn, playing ? glyph('pause', 16) : icon('play', 16), playing ? 'Pause' : midway ? 'Continue' : 'Play all');
  }
  paintPlay(false);

  const revealBtn = h('button', { type: 'button', class: 'btn small read-reveal-all', hidden: true, onclick: () => setListenFirst(false) }, 'Reveal the text');
  const firstBtn = toggle(h('span', null, h('span', { 'aria-hidden': 'true' }, '🎧 '), 'Listen first'), false, (on) => setListenFirst(on, true));
  function setListenFirst(on, fromToggle = false) {
    listenFirst = on;
    applyView();
    revealBtn.hidden = !on;
    if (!fromToggle) {
      firstBtn.setAttribute('aria-pressed', 'false');
      firstBtn.classList.remove('selected');
      firstBtn.focus({ preventScroll: true });
    }
    live.textContent = on ? 'Text hidden. Listen first, then reveal it.' : 'Text shown.';
  }

  const trSelect = h('select', {
    class: 'read-select', 'aria-label': 'Translation',
    onchange: () => {
      p.translation = trSelect.value;
      ctx.store.updateSettings({ readTranslation: p.translation });
      list.querySelectorAll('.read-line.revealed').forEach((li) => li.classList.remove('revealed'));
      list.querySelectorAll('.read-reveal').forEach((b) => b.setAttribute('aria-expanded', 'false'));
      applyView();
    },
  }, Object.entries(TRANSLATION).map(([v, label]) => h('option', { value: v, selected: v === p.translation }, label)));

  const bar = h('div', { class: 'read-bar', role: 'region', 'aria-label': 'Player' },
    h('div', { class: 'read-transport' },
      playBtn,
      h('button', { type: 'button', class: 'icon-btn read-step', 'aria-label': 'Previous line', 'aria-keyshortcuts': 'ArrowLeft', title: 'Previous line (←)', onclick: () => player.prev() }, glyph('prev')),
      h('button', { type: 'button', class: 'icon-btn read-step', 'aria-label': 'Next line', 'aria-keyshortcuts': 'ArrowRight', title: 'Next line (→)', onclick: () => player.next() }, glyph('next')),
      counter,
      toggle([icon('slow', 16), h('span', { class: 'read-long' }, 'Slow')], p.slow, (on) => { p.slow = on; ctx.store.updateSettings({ readSlow: on }); }, { 'aria-label': 'Slow' })),
    h('div', { class: 'read-options' },
      hasEn ? h('label', { class: 'read-select-wrap' }, h('span', { 'aria-hidden': 'true' }, 'EN'), trSelect) : null,
      hasReading
        ? toggle(lang.code === 'ja' ? label('Kana · rōmaji', 'Kana') : lang.code === 'ar' ? label('Transliteration', 'Latin') : 'Reading', p.reading, (on) => {
          p.reading = on;
          ctx.store.updateSettings({ readReading: on });
          applyView();
        }, { 'aria-label': lang.code === 'ja' ? 'Kana and rōmaji' : lang.code === 'ar' ? 'Transliteration' : 'Reading' })
        : null,
      firstBtn),
    live);
  stickUnderTopbar(ctx, bar);

  ctx.onCleanup(bindKeys({
    ' ': () => player.toggle(),
    ArrowRight: () => player.next(),
    ArrowLeft: () => player.prev(),
  }));

  // The tab title names the text (the router sets the section's name first).
  queueMicrotask(() => { document.title = `${text.title} · Read & Listen · Lisan`; });

  return [
    backLink(ctx, '#/read', 'All texts'),
    text.own
      ? h('p', { class: 'kicker read-kicker' }, h('span', { 'aria-hidden': 'true' }, '✍️ '), `My text · ${n} line${n === 1 ? '' : 's'} · ~${estimateMinutes(text)} min`)
      : h('p', { class: 'kicker read-kicker' }, h('span', { 'aria-hidden': 'true' }, `${kind.emoji} `), `${kind.one} · `, levelBadge(text.level), ` · ${n} lines · ~${estimateMinutes(text)} min`),
    h('div', { class: 'read-head' },
      h('h1', { ...(text.own ? textAttrs(lang) : {}) }, text.title),
      text.titleNative ? h('p', { class: 'read-native-title', ...textAttrs(lang) }, text.titleNative) : null,
      text.own
        ? h('p', { class: 'muted read-summary' }, 'Your own text, read by the voice as written. ', text.glossary.length ? 'Underlined words are in the course: tap one for its meaning. ' : '', h('a', { href: href(text.id, 'edit') }, 'Edit or delete'))
        : h('p', { class: 'muted read-summary' }, text.summary, ' ', registerBadge(text.register), ' ', dialectBadge(text.dialect)),
      best != null ? h('p', { class: 'read-best' }, icon('check', 16), `Done · best score ${pct(best)}`) : null),
    voiceBanner(ctx),
    practiceCard(text),
    bar,
    revealBtn,
    list,
    text.glossary?.length ? h('section', { class: 'card read-glossary' },
      h('h2', { class: 'card-title' }, text.own ? '📝 Words from the course' : '📝 Glossary'),
      h('ul', { class: 'read-gloss-list' }, text.glossary.map((g, gi) => {
        const reading = lang.reading(g);
        const btn = h('button', { type: 'button', class: 'read-gloss-item', 'aria-haspopup': 'dialog', onclick: () => sheet.open(gi, btn) },
          h('b', { ...textAttrs(lang) }, g.tr),
          reading ? h('span', { class: 'reading small' }, reading) : null,
          h('span', { class: 'read-gloss-en' }, g.en));
        const play = h('button', { type: 'button', class: 'icon-btn play', 'aria-label': `Listen: ${g.tr}`, onclick: () => sayAside(sayable(ctx, text, g)) }, icon('volume'));
        return h('li', null, play, btn);
      }))) : null,
    textQuiz(ctx, texts, text),
    host,
  ];
}

// ---------- Practice: shared ----------

function practiceHead(ctx, text, title) {
  return [
    backLink(ctx, href(text.id), 'Back to the text'),
    h('p', { class: 'kicker' }, h('span', { 'aria-hidden': 'true' }, `${(KINDS[text.kind] || KINDS.story).emoji} `), `Practise · ${text.title}`),
    h('h1', null, title),
  ];
}

function scoreTitle(lang, score) {
  if (score >= 0.95) return praiseLine(lang, lang.scoreTitles.excellent);
  if (score >= 0.8) return praiseLine(lang, lang.scoreTitles.close);
  if (score >= 0.55) return 'Almost — check the highlighted parts.';
  return 'Not quite yet — listen again and try once more.';
}

/**
 * Record yourself and play it back right after the model audio. `playModel`
 * resolves when the model has finished. Returns null without a microphone API.
 */
function recorderWidget(ctx, { maxMs, playModel, onRecorded, big = false, label = 'Record myself' }) {
  if (!speech.recordingSupported()) return null;
  const wrap = h('div', { class: `recorder read-recorder${big ? ' big' : ''}` });
  const status = h('p', { class: 'speak-status', 'aria-live': 'polite' });
  let rec = null;
  let url = null;
  let clip = null;
  let disposed = false;
  let gen = 0;
  ctx.onCleanup(() => {
    disposed = true;
    gen++;
    rec?.stop();
    clip?.stop();
    if (url) URL.revokeObjectURL(url);
  });

  const mine = () => { clip?.stop(); clip = playClip(url); return clip.done; };
  async function compare() {
    const my = ++gen;
    status.textContent = 'The model first…';
    await playModel();
    if (my !== gen || disposed) return;
    status.textContent = 'Now your recording…';
    await mine();
    if (my === gen && !disposed) status.textContent = '';
  }

  function idle() {
    set(wrap,
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: `btn ${big ? '' : 'small'}`, onclick: start }, icon('record', 14), url ? 'Record again' : label),
        url ? h('button', { type: 'button', class: `btn ${big ? 'primary' : 'small'}`, onclick: compare }, icon('play', 14), 'Model, then mine') : null,
        url ? h('button', { type: 'button', class: 'btn small', onclick: () => { gen++; speech.cancelSpeech(); mine(); } }, icon('play', 14), 'Mine') : null),
      status);
  }

  async function start() {
    gen++;
    clip?.stop();
    speech.cancelSpeech();
    const time = h('span', { class: 'read-clock' }, `0:00 / ${clock(maxMs)}`);
    let r;
    try {
      r = await recordClip({ maxMs, onTick: (ms) => { time.textContent = `${clock(ms)} / ${clock(maxMs)}`; } });
    } catch {
      if (!disposed) ctx.toast('Microphone unavailable — check the microphone permission.');
      return;
    }
    if (disposed) { r.stop().then((u) => URL.revokeObjectURL(u)); return; }
    rec = r;
    const stop = h('button', { type: 'button', class: `btn ${big ? '' : 'small'} recording`, onclick: () => r.stop() }, icon('stop', 14), 'Stop ', time);
    set(wrap, h('div', { class: 'button-row' }, stop), status);
    status.textContent = 'Recording…';
    stop.focus({ preventScroll: true });
    const newUrl = await r.stopped;
    rec = null;
    if (disposed) { URL.revokeObjectURL(newUrl); return; }
    if (url) URL.revokeObjectURL(url);
    url = newUrl;
    idle();
    wrap.querySelector('button')?.focus({ preventScroll: true });
    onRecorded?.();
    compare();
  }

  idle();
  return wrap;
}

/** Say a line into the microphone and get a score; without recognition, record and compare instead. */
function speakLine(ctx, line, { onAttempt, entry = line } = {}) {
  const { lang } = ctx;
  const recorder = () => recorderWidget(ctx, {
    maxMs: listenTimeout(line.tr),
    playModel: () => ctx.say(entry),
    onRecorded: () => onAttempt?.(null),
  });
  if (!speech.recognitionSupported()) {
    const rec = recorder();
    return h('div', { class: 'speak read-speak' },
      h('p', { class: 'hint' }, rec ? 'Say it out loud — record yourself to compare with the voice.' : 'Say it out loud along with the voice.'),
      rec);
  }
  let session = null;
  let disposed = false;
  let best = 0;
  const status = h('p', { class: 'speak-status', 'aria-live': 'polite' }, 'Tap the mic and say the line.');
  const result = h('div', { class: 'speak-result', hidden: true });
  const mic = h('button', { type: 'button', class: 'mic-btn', 'aria-label': 'Say the line', onclick: listenNow }, icon('mic', 30));
  ctx.onCleanup(() => { disposed = true; session?.stop(); });

  async function listenNow() {
    if (disposed) return;
    if (session) { session.stop(); return; }
    mic.classList.add('live');
    mic.setAttribute('aria-label', 'Stop listening');
    // A whole line takes longer than a word: listen() keeps going through
    // pauses until the mic is tapped again or maxMs runs out.
    status.textContent = 'Listening… say the line, then tap the mic again';
    session = speech.listen({ lang: listenLang(ctx, entry), maxMs: listenTimeout(line.tr) });
    const res = await session.result;
    session = null;
    if (disposed) return;
    mic.classList.remove('live');
    mic.setAttribute('aria-label', 'Say the line');
    if (!res.ok) {
      status.textContent = speech.RECOGNITION_ERRORS[res.error] || `Something went wrong (${res.error}).`;
      return;
    }
    const scored = scoreLine(lang, line, res.alternatives);
    best = Math.max(best, scored.score);
    status.textContent = '';
    const v = verdict(scored.score);
    result.hidden = false;
    result.className = `speak-result ${v}`;
    set(result,
      h('div', { class: 'score-row' },
        h('div', { class: 'score-ring', style: { '--pct': Math.round(scored.score * 100) } }, h('span', null, pct(scored.score))),
        h('div', null,
          h('p', { class: 'score-title' }, scoreTitle(lang, scored.score)),
          h('p', { class: 'heard' }, 'Heard: “', h('bdi', { lang: lang.code }, scored.raw || '…'), '”'))),
      diffLine(lang.diffAsWritten(scored.written, scored.heard), { lang: lang.code, 'aria-label': 'The line, with the parts to work on highlighted' }));
    onAttempt?.(best);
  }

  return h('div', { class: 'speak read-speak' },
    h('div', { class: 'speak-main' }, mic, h('div', { class: 'speak-side' }, status, recorder())),
    result);
}

function practiceSummary(ctx, text, { emoji, title, lines, mode, practiced, again }) {
  const { lang } = ctx;
  if (practiced) ctx.store.logActivity(lang.code, { practiced });
  const xp = ctx.game.textPractised({ lang: lang.code, id: text.id, mode });
  const heading = h('h2', { tabindex: '-1' }, title);
  const box = h('div', { class: 'summary read-summary-box' },
    h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, emoji),
    heading,
    lines.map((l) => h('p', { class: 'muted' }, l)),
    xp ? h('p', { class: 'celebrate-xp' }, icon('flame', 16), `+${xp} XP`) : null,
    h('div', { class: 'actions stack' },
      again,
      h('a', { class: 'btn wide', href: href(text.id) }, 'Back to the text'),
      h('a', { class: 'btn ghost wide', href: '#/read' }, 'All texts')));
  ctx.flushRewards?.();
  requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  return box;
}

function modeTabs(text, active) {
  return h('nav', { class: 'tabs read-tabs', 'aria-label': 'Practice mode' }, MODES.map((m) => h('a', {
    href: href(text.id, 'practice', m.id), class: m.id === active ? 'active' : null, 'aria-current': m.id === active ? 'page' : null,
  }, h('span', { 'aria-hidden': 'true' }, `${m.emoji} `), label(m.title, m.short))));
}

// ---------- Practice: listen & repeat ----------

function repeatMode(ctx, text) {
  const { lang } = ctx;
  const n = text.lines.length;
  const best = new Array(n).fill(null);
  const tried = new Set();
  const card = h('section', { class: 'card read-repeat' });
  const scope = cleanupScope(ctx);

  function show(i, autoplay) {
    scope.cleanup();
    const line = text.lines[i];
    const entry = sayable(ctx, text, line);
    const reading = lang.reading(line);
    const title = h('p', { class: 'kicker', tabindex: '-1' }, `Line ${i + 1} of ${n}`);
    set(card,
      title,
      meter(i + 1, n),
      h('p', { class: 'read-big', ...textAttrs(lang) }, line.tr),
      reading ? h('p', { class: 'reading small' }, reading) : null,
      h('p', { class: 'read-en' }, line.en),
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(entry) }, icon('volume', 16), 'Listen'),
        h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(entry, { slow: true }) }, icon('slow', 16), 'Slowly')),
      speakLine(scope.ctx, line, { entry, onAttempt: (score) => { tried.add(i); if (score != null) best[i] = Math.max(best[i] ?? 0, score); } }),
      h('div', { class: 'actions split' },
        h('button', { type: 'button', class: 'btn', disabled: i === 0, onclick: () => show(i - 1, true) }, icon('back', 16), 'Previous'),
        i < n - 1
          ? h('button', { type: 'button', class: 'btn primary', onclick: () => show(i + 1, true) }, 'Next line', icon('arrow', 16))
          : h('button', { type: 'button', class: 'btn primary', onclick: finish }, 'Finish', icon('check', 16))));
    if (autoplay) {
      title.focus({ preventScroll: true });
      const t = setTimeout(() => ctx.say(entry, { auto: true }), 250);
      scope.ctx.onCleanup(() => clearTimeout(t));
    }
  }

  function finish() {
    scope.cleanup();
    const scores = best.filter((s) => s != null);
    const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    set(card, practiceSummary(ctx, text, {
      emoji: '🔁',
      title: 'Speech repeated!',
      mode: 'repeat',
      practiced: tried.size,
      lines: [
        `You went through all ${n} lines.`,
        avg != null ? `Average of your best scores: ${pct(avg)} (${scores.length} line${scores.length === 1 ? '' : 's'} scored).` : null,
      ].filter(Boolean),
      again: h('a', { class: 'btn primary wide', href: href(text.id, 'practice', 'shadow') }, 'Next: shadowing', icon('arrow', 18)),
    }));
  }

  show(0, false);
  return [
    h('p', { class: 'muted' }, MODES[0].hint, ' ', speech.recognitionSupported() ? 'You get a score for each line.' : 'Record yourself to compare with the voice.'),
    card,
  ];
}

// ---------- Practice: shadowing ----------

function linesList(ctx, text, spk, render) {
  const rows = text.lines.map((line, i) => h('li', { class: `read-line${speakerClass(line, spk)}` }, render(line, i)));
  return { rows, el: h('ol', { class: 'read-lines tr-hide' }, rows) };
}

function shadowMode(ctx, text) {
  const { lang } = ctx;
  const spk = speakerIndex(text);
  const n = text.lines.length;
  let round = 0;
  let current = -1;
  const slow = { on: prefs(ctx).slow };
  const status = h('p', { class: 'read-sr', 'aria-live': 'polite' });

  const lineView = (line) => {
    const faded = fadeLine(lang, line, round);
    return [
      speakerLabel(text, line, spk),
      faded == null
        ? h('span', { class: 'read-mask on', 'aria-hidden': 'true', style: { '--w': `${Math.min(100, 25 + [...line.tr].length * 1.6)}%` } })
        : h('p', { class: `read-tr${round ? ' faded' : ''}`, ...textAttrs(lang) }, faded),
    ];
  };
  const list = linesList(ctx, text, spk, lineView);
  const steps = h('ol', { class: 'read-steps', 'aria-label': 'Rounds' });
  const title = h('h2', { class: 'card-title', tabindex: '-1' });
  const hint = h('p', { class: 'muted small' });
  const playBtn = h('button', { type: 'button', class: 'btn primary', onclick: () => (player.playing ? player.pause() : player.play(0)) });
  const nextBtn = h('button', { type: 'button', class: 'btn', hidden: true, onclick: () => nextRound() });
  const controls = h('div', { class: 'button-row read-shadow-controls' }, playBtn,
    toggle(h('span', null, icon('slow', 16), 'Slow'), slow.on, (on) => { slow.on = on; }), nextBtn);
  const card = h('section', { class: 'card read-shadow' }, steps, title, hint, controls, status);
  const wrap = h('div', { class: 'read-shadow-wrap' }, card, list.el);
  stickUnderTopbar(ctx, card);

  const player = createPlayer({
    count: n,
    say: (i) => ctx.say(sayable(ctx, text, text.lines[i]), { slow: slow.on }),
    onLine: (i) => {
      list.rows[current]?.classList.remove('current');
      current = i;
      list.rows[i].classList.add('current');
      bringIntoView(list.rows[i], card);
    },
    onState: (playing) => paint(playing),
    onEnd: () => roundDone(),
    onFail: () => ctx.toast('Audio isn’t available — check that a voice is installed for this language.'),
  });
  ctx.onCleanup(() => player.stop());
  ctx.onCleanup(bindKeys({ ' ': () => { if (playBtn.isConnected) playBtn.click(); } }));

  function paint(playing = false) {
    set(steps, SHADOW_ROUNDS.map((r, i) => h('li', { class: i < round ? 'done' : i === round ? 'now' : null, 'aria-current': i === round ? 'step' : null }, `${i + 1}. ${r.title}`)));
    title.textContent = `Round ${round + 1} of 3 · ${SHADOW_ROUNDS[round].title}`;
    hint.textContent = SHADOW_ROUNDS[round].hint;
    set(playBtn, playing ? glyph('pause', 16) : icon('play', 16), playing ? 'Stop' : `Start round ${round + 1}`);
  }

  function roundDone() {
    list.rows[current]?.classList.remove('current');
    current = -1;
    if (round < 2) {
      status.textContent = `Round ${round + 1} done.`;
      nextBtn.hidden = false;
      set(nextBtn, `Next: ${SHADOW_ROUNDS[round + 1].title}`, icon('arrow', 16));
      nextBtn.focus({ preventScroll: true });
      return;
    }
    set(card, practiceSummary(ctx, text, {
      emoji: '👥',
      title: 'Three rounds of shadowing!',
      mode: 'shadow',
      practiced: 3,
      lines: ['From the full text to none at all — the speech is getting into your ears and mouth.'],
      again: h('a', { class: 'btn primary wide', href: href(text.id, 'practice', 'record') }, 'Next: record the whole speech', icon('arrow', 18)),
    }));
    list.el.remove();
  }

  function nextRound() {
    round++;
    nextBtn.hidden = true;
    list.rows.forEach((li, i) => set(li, lineView(text.lines[i])));
    paint(false);
    title.focus({ preventScroll: true });
    player.play(0);
  }

  paint(false);
  return [h('p', { class: 'muted' }, 'Shadowing: speak at the same time as the voice, copying its rhythm and melody — don’t wait for it to finish.'), wrap];
}

// ---------- Practice: record the whole speech ----------

function recordMode(ctx, text) {
  const { lang } = ctx;
  const spk = speakerIndex(text);
  let current = -1;
  const list = linesList(ctx, text, spk, (line) => [speakerLabel(text, line, spk), lineBody(ctx, text, line)]);
  list.el.className = 'read-lines tr-hide';
  const mark = (i) => {
    list.rows[current]?.classList.remove('current');
    current = i;
    if (i >= 0) { list.rows[i].classList.add('current'); bringIntoView(list.rows[i], null); }
  };
  let done = null; // resolves the model playback
  const player = createPlayer({
    count: text.lines.length,
    say: (i) => ctx.say(sayable(ctx, text, text.lines[i])),
    onLine: mark,
    onEnd: () => { mark(-1); done?.(); },
    onFail: () => { mark(-1); done?.(); },
  });
  ctx.onCleanup(() => { player.stop(); done?.(); });
  const playModel = () => new Promise((resolve) => { done = resolve; player.play(0); });

  let rewarded = false;
  const summary = h('div');
  const rec = recorderWidget(ctx, {
    maxMs: recordLimit(text),
    big: true,
    label: 'Record the speech',
    playModel,
    onRecorded: () => {
      if (rewarded) return;
      rewarded = true;
      const xp = ctx.game.textPractised({ lang: lang.code, id: text.id, mode: 'record' });
      ctx.store.logActivity(lang.code, { practiced: 1 });
      set(summary, h('p', { class: 'read-best' }, icon('check', 16), 'Speech recorded.', xp ? ` +${xp} XP` : ''));
      ctx.flushRewards?.();
    },
  });

  if (!rec) {
    return [h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, 'Recording isn’t available here'),
      h('p', { class: 'muted' }, 'This browser can’t record from the microphone. Try listen & repeat or shadowing instead.'),
      h('a', { class: 'btn primary', href: href(text.id, 'practice', 'repeat') }, 'Listen & repeat', icon('arrow', 16))), list.el];
  }
  return [
    h('section', { class: 'card read-record' },
      h('h2', { class: 'card-title' }, '🎙️ Give the speech'),
      h('p', { class: 'muted small' }, `Read it out from start to finish — up to ${clock(recordLimit(text))}. When you stop, you’ll hear the model and then yourself.`),
      h('div', { class: 'button-row' },
        h('button', {
          type: 'button', class: 'btn small',
          onclick: () => { if (player.playing) { player.pause(); mark(-1); done?.(); } else player.play(0); },
        }, icon('volume', 16), 'Hear the model')),
      rec,
      summary),
    list.el,
  ];
}

// ---------- Role-play ----------

function rolePlay(ctx, texts, text, who) {
  const { lang } = ctx;
  const spk = speakerIndex(text);
  const names = [...spk.keys()];
  const me = names[Number(who)];
  if (!canRolePlay(text)) return [h('p', { class: 'muted' }, 'Role-play is for dialogues.'), h('a', { class: 'btn', href: href(text.id) }, 'Back to the text')];
  if (me == null) {
    return [
      h('p', { class: 'muted' }, 'Choose your part. The app says the other lines and pauses for yours: say your line, check it, then carry on.'),
      h('div', { class: 'read-parts' }, names.map((name, i) => {
        const count = text.lines.filter((l) => l.speaker === name).length;
        return h('a', { class: `read-part spk spk-${i % 5}`, href: href(text.id, 'roleplay', String(i)) },
          h('b', null, `Be ${name}`), h('small', null, `${count} line${count === 1 ? '' : 's'}`), icon('arrow', 18));
      })),
    ];
  }

  const n = text.lines.length;
  const mine = text.lines.filter((l) => l.speaker === me).length;
  const scores = [];
  const tried = new Set();
  let k = 0;
  let gen = 0;
  let running = false;
  let hideMine = false;
  let turnScope = null;
  const transcript = h('ol', { class: 'read-lines read-transcript tr-show', 'aria-live': 'polite', 'aria-relevant': 'additions' });
  const startBtn = h('button', { type: 'button', class: 'btn primary', onclick: () => (running ? pause() : run()) });
  const status = h('p', { class: 'muted small read-rp-status' }, `You are ${me}: ${mine} line${mine === 1 ? '' : 's'}.`);
  const controls = h('div', { class: 'read-bar read-rp-bar' },
    h('div', { class: 'read-transport' }, startBtn,
      toggle('Hide my lines', false, (on) => { hideMine = on; })),
    status);
  stickUnderTopbar(ctx, controls);
  ctx.onCleanup(() => { gen++; turnScope?.cleanup(); });

  let waiting = false; // the learner's turn: the app waits for Continue
  const paint = () => {
    startBtn.hidden = waiting;
    status.textContent = waiting ? 'Your turn: say your line, then Continue.' : `You are ${me}: ${mine} line${mine === 1 ? '' : 's'}.`;
    set(startBtn, running ? glyph('pause', 16) : icon('play', 16), running ? 'Pause' : k === 0 ? 'Start' : 'Resume');
  };
  paint();

  function addRow(line, extra) {
    const li = h('li', { class: `read-line${speakerClass(line, spk)}${line.speaker === me ? ' mine' : ''}` },
      h('span', { class: 'read-speaker' }, line.speaker === me ? `${line.speaker} (you)` : line.speaker),
      h('div', { class: 'read-body' }, lineBody(ctx, text, line)),
      extra);
    transcript.append(li);
    bringIntoView(li, controls);
    return li;
  }

  function pause() { gen++; running = false; speech.cancelSpeech(); paint(); }

  async function run() {
    if (waiting) return;
    const my = ++gen;
    running = true;
    paint();
    while (k < n) {
      const line = text.lines[k];
      if (line.speaker === me) { running = false; waiting = true; paint(); yourTurn(k); return; }
      const li = transcript.querySelector(`[data-k="${k}"]`) || addRow(line);
      li.dataset.k = String(k);
      li.classList.add('current');
      const ok = await ctx.say(sayable(ctx, text, line));
      li.classList.remove('current');
      if (my !== gen) return;
      if (ok === false) { ctx.toast('Audio isn’t available — check that a voice is installed for this language.'); pause(); return; }
      await sleep(350);
      if (my !== gen) return;
      k++;
    }
    running = false;
    finish();
  }

  function yourTurn(i) {
    const line = text.lines[i];
    const entry = sayable(ctx, text, line);
    turnScope?.cleanup();
    turnScope = cleanupScope(ctx);
    const reading = lang.reading(line);
    const shown = !hideMine;
    const textBox = h('div', { class: 'read-body read-turn-text', hidden: !shown }, h('p', { class: 'read-tr', ...textAttrs(lang) }, line.tr), reading ? h('p', { class: 'reading small' }, reading) : null);
    const revealBtn = h('button', { type: 'button', class: 'btn small', hidden: shown, onclick: () => { textBox.hidden = false; revealBtn.hidden = true; ctx.say(entry); } }, 'Reveal & hear it');
    const cont = h('button', {
      type: 'button', class: 'btn primary',
      onclick: () => {
        turnScope.cleanup();
        set(turn, h('span', { class: 'read-speaker' }, `${line.speaker} (you)`), h('div', { class: 'read-body' }, lineBody(ctx, text, line)));
        turn.classList.remove('your-turn');
        k = i + 1;
        waiting = false;
        run();
      },
    }, i === n - 1 || !text.lines.slice(i + 1).length ? 'Finish' : 'Continue', icon('arrow', 16));
    const heading = h('p', { class: 'kicker read-turn-title', tabindex: '-1' }, `Your turn — ${line.speaker}`);
    const turn = h('li', { class: `read-line your-turn${speakerClass(line, spk)} mine` },
      heading,
      h('p', { class: 'read-en' }, line.en),
      textBox,
      h('div', { class: 'button-row' },
        revealBtn,
        h('button', { type: 'button', class: 'btn small', onclick: () => { textBox.hidden = false; revealBtn.hidden = true; ctx.say(entry); } }, icon('volume', 16), 'Hear it'),
        h('button', { type: 'button', class: 'btn small', onclick: () => { textBox.hidden = false; revealBtn.hidden = true; ctx.say(entry, { slow: true }); } }, icon('slow', 16), 'Slowly')),
      speakLine(turnScope.ctx, line, { entry, onAttempt: (score) => { tried.add(i); if (score != null) scores[i] = score; } }),
      h('div', { class: 'actions' }, cont));
    transcript.append(turn);
    bringIntoView(turn, controls);
    heading.focus({ preventScroll: true });
  }

  function finish() {
    const got = scores.filter((s) => s != null);
    const avg = got.length ? got.reduce((a, b) => a + b, 0) / got.length : null;
    const other = names.findIndex((x) => x !== me);
    controls.remove();
    transcript.after(h('section', { class: 'card' }, practiceSummary(ctx, text, {
      emoji: '🎭',
      title: `You played ${me}!`,
      mode: 'roleplay',
      practiced: tried.size,
      lines: [`${mine} line${mine === 1 ? '' : 's'} in a ${n}-line dialogue.`, avg != null ? `Average score: ${pct(avg)}.` : null].filter(Boolean),
      again: h('a', { class: 'btn primary wide', href: href(text.id, 'roleplay', String(other)) }, `Swap: be ${names[other]}`, icon('arrow', 18)),
    })));
  }

  return [
    h('div', { class: 'read-parts-switch' }, 'Part: ', names.map((name, i) => (name === me
      ? h('b', { class: `spk-name spk-${i % 5}` }, name)
      : h('a', { href: href(text.id, 'roleplay', String(i)) }, name))).flatMap((x, i) => (i ? [' · ', x] : [x]))),
    controls,
    transcript,
  ];
}

// ---------- Route ----------

function practiceView(ctx, texts, text, mode) {
  if (text.kind !== 'speech') return readerView(ctx, texts, text);
  const m = MODES.find((x) => x.id === mode) || MODES[0];
  queueMicrotask(() => { document.title = `${m.title} · ${text.title} · Lisan`; });
  const body = m.id === 'shadow' ? shadowMode(ctx, text) : m.id === 'record' ? recordMode(ctx, text) : repeatMode(ctx, text);
  return [...practiceHead(ctx, text, m.title), modeTabs(text, m.id), voiceBanner(ctx), body];
}

function routeView(ctx, texts, id, mode, arg) {
  const mine = ctx.store.getOwnTexts(ctx.lang.code);
  const own = mine.map((rec) => ownTextFor(ctx.lang, rec));
  if (!id) return listView(ctx, texts, own);
  if (id === 'new') return editor(ctx, null);
  const text = own.find((t) => t.id === id) || texts.find((t) => t.id === id);
  if (text?.own && mode === 'edit') return editor(ctx, mine.find((t) => t.id === id));
  if (!text) {
    return [
      backLink(ctx, '#/read', 'All texts'),
      h('div', { class: 'summary' }, h('h1', null, 'Text not found'), h('p', { class: 'muted' }, 'It may have been renamed or deleted.'),
        h('a', { class: 'btn primary', href: '#/read' }, 'All texts')),
    ];
  }
  if (mode === 'practice') return practiceView(ctx, texts, text, arg);
  if (mode === 'roleplay') {
    queueMicrotask(() => { document.title = `Role-play · ${text.title} · Lisan`; });
    return [...practiceHead(ctx, text, 'Role-play'), voiceBanner(ctx), rolePlay(ctx, texts, text, arg)];
  }
  return readerView(ctx, texts, text);
}

export default function read(ctx, id, mode, arg) {
  const { lang } = ctx;
  const view = h('div', { class: `view read${id ? ' read-reader' : ''}` });
  let gone = false;
  ctx.onCleanup(() => { gone = true; });

  const fill = (texts) => {
    ctx.game.registerTexts?.(lang.code, texts.map((t) => t.id));
    set(view, routeView(ctx, texts, id, mode, arg));
  };
  const cached = cachedTexts(lang.code);
  if (cached) {
    fill(cached);
    return view;
  }
  set(view,
    backLink(ctx, id ? '#/read' : '#/learn/g/read', id ? 'All texts' : 'Learn'),
    h('h1', null, 'Read & Listen'),
    h('p', { class: 'muted', role: 'status' }, 'Loading texts…'));
  loadTexts(lang.code).then((texts) => {
    if (gone) return;
    fill(texts);
    focusHeading(view);
  }, (err) => {
    if (gone) return;
    console.warn('Read & Listen: could not load texts', err);
    set(view,
      backLink(ctx, '#/learn/g/read', 'Learn'),
      h('h1', null, 'Read & Listen'),
      h('div', { class: 'banner', role: 'alert' }, 'The texts couldn’t be loaded. Check your connection and try again.'),
      h('button', { type: 'button', class: 'btn primary', onclick: () => ctx.rerender() }, 'Try again'));
  });
  return view;
}
