import { loadLanguage } from './languages/index.js';
import * as store from './store.js';
import * as speech from './speech.js';
import { h, icon, toast, set } from './ui.js';
import { dueWords } from './stats.js';
import { glyph } from './components.js';
import { onBackButton, backAction, leaveApp } from './native.js';
import { bootDone } from './boot.js';
import { syncReminders, onReminderTap } from './reminders.js';
import { sessionBack } from './session.js';
import home from './views/home.js';
import learn from './views/learn.js';
import review from './views/review.js';
import practice from './views/practice.js';
import pronounce from './views/pronounce.js';
import progress from './views/progress.js';
import settingsView from './views/settings.js';
import wordView from './views/word.js';
import welcome, { STEPS as WELCOME_STEPS } from './views/welcome.js';
import journey from './views/journey.js';
import syncView from './views/sync.js';
import grammarView from './views/grammar.js';
import readView from './views/read.js';
import * as game from './game.js';
import { initCelebrations } from './celebrate.js';
import known from './views/known.js';
import language from './views/language.js';
import topic from './views/topic.js';
import phrases from './views/phrases.js';
import search from './views/search.js';
import me from './views/me.js';

// In the apps, progress (and with it the chosen language) may first have to be
// restored from native storage, so wait for that before anything reads settings.
await store.init();

// Only the language being learned is loaded (the others' names and counts are in languages/meta.js).
const lang = await loadLanguage(store.getSettings().lang);

// Settings that change how everything is shown: reading aids and text size.
function applyDisplaySettings() {
  const s = store.getSettings();
  const aid = { ja: s.aidJa, ar: s.aidAr }[lang.code];
  lang.readingAid = ['full', 'script', 'off'].includes(aid) ? aid : 'full';
  lang.speakAs?.(s.speakAs === 'f' ? 'f' : 'm');
  document.documentElement.dataset.textSize = ['l', 'xl'].includes(s.textSize) ? s.textSize : 'm';
}
applyDisplaySettings();

const ROUTES = {
  '': home,
  learn,
  review,
  practice,
  speak: pronounce,
  progress,
  settings: settingsView,
  word: wordView,
  welcome,
  known,
  language,
  journey,
  sync: syncView,
  grammar: grammarView,
  read: readView,
  topic,
  phrases,
  search,
  me,
};

// Bottom navigation: Home (today), Learn (topics, grammar, texts), Practice
// (reviews, quick rounds, speaking), Phrasebook, Me (progress, goals, settings).
const TABS = [
  { id: '', label: 'Home', icon: 'home' },
  { id: 'learn', label: 'Learn', icon: 'book' },
  { id: 'practice', label: 'Practice', icon: 'repeat', badge: true },
  { id: 'phrases', label: 'Phrasebook', icon: 'chat' },
  { id: 'me', label: 'Me', icon: 'user', dot: true },
];
// The tab each screen belongs to (a screen with no entry is its own tab).
const TAB_OF = {
  topic: 'learn', grammar: 'learn', read: 'learn', known: 'learn', word: 'learn',
  review: 'practice', speak: 'practice',
  progress: 'me', journey: 'me', settings: 'me', sync: 'me', language: 'me',
  search: null, welcome: null,
};
// Detail screens opened from many places: they light up the tab of the screen
// they were opened from (a word from the phrasebook, Already learned from Me…).
const INHERIT_TAB = new Set(['word', 'known', 'search', 'sync', 'language']);

let cleanups = [];
let lastView = null; // the route name rendered last; null before the first render

const ctx = {
  lang,
  store,
  speech,
  get settings() { return store.getSettings(); },
  // Speaks an entry, a display string or { text, lang } through the pack
  // (lang.speech: say.js overrides, Arabic pausal forms, Egyptian voices).
  // With no voice for the language it stays silent and says why (not for autoplay).
  say(target, { slow = false, auto = false } = {}) {
    const s = store.getSettings();
    return speech.sayFor(lang, target, { slow, rate: s.rate, voices: s.voices, onNoVoice: auto ? null : toast });
  },
  go(path) { location.hash = path; },
  /** Show `path` in place of the current screen, without a new history entry (e.g. a section of Learn). */
  replace(path) {
    history.replaceState(history.state, '', `#${path}`);
    render();
  },
  /** Change the address of the current screen without re-rendering it (a search query typed in). */
  setPath(path) {
    history.replaceState(history.state, '', `#${path}`);
    const entry = stack[here];
    if (entry) { entry.path = path.replace(/^\/?/, ''); saveStack(); }
  },
  /** The screen the learner came from, for back links: { href, title }, or null. */
  previous() {
    const p = stack[here - 1];
    if (!p || p.lang !== lang.code || p.session || p.path === currentPath()) return null;
    return { href: `#/${p.path}`, title: p.title };
  },
  onCleanup(fn) { cleanups.push(fn); },
  toast,
  rerender: () => render(),
  game,
  inSession: false,
};

function shell() {
  const tabbar = h('nav', { class: 'tabbar', 'aria-label': 'Main' },
    TABS.map((t) => h('a', { href: `#/${t.id}`, dataset: { tab: t.id } },
      glyph(t.icon, 22), h('span', null, t.label),
      t.badge ? h('i', { class: 'tab-badge', hidden: true }) : null,
      t.dot ? h('i', { class: 'tab-dot', hidden: true, title: 'New achievements' }) : null)));

  document.body.prepend(
    h('a', {
      href: '#/', class: 'skip-link',
      onclick: (e) => { e.preventDefault(); document.getElementById('view').focus(); },
    }, 'Skip to content'),
    h('header', { class: 'topbar' },
      h('a', { href: '#/', class: 'brand', 'aria-label': 'Lisan home' },
        h('img', { src: 'icons/icon.svg', alt: '', width: 28, height: 28 }), 'Lisan'),
      h('a', { class: 'lang-pill', href: '#/language', title: `Learning ${lang.name} — change language` }, h('span', { 'aria-hidden': 'true' }, lang.flag), ' ', h('span', { lang: lang.code }, lang.nativeName)),
      h('a', { href: '#/search', class: 'icon-btn top-search', 'aria-label': 'Search words, phrases and lessons' }, icon('search'))),
    h('main', { id: 'view', tabindex: '-1' }),
    // Tells screen readers which screen they're on when no heading is read out.
    h('p', { id: 'announcer', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true', style: VISUALLY_HIDDEN }),
    tabbar,
  );
  keepFocusInView(document.getElementById('view'));
}

const VISUALLY_HIDDEN = {
  position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: '0',
  overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap', border: '0',
};

let announceTimer;
function announce(text) {
  const el = document.getElementById('announcer');
  if (!el) return;
  // Clear first so the same text (e.g. opening Review twice) is read again.
  el.textContent = '';
  clearTimeout(announceTimer);
  if (text) announceTimer = setTimeout(() => { el.textContent = text; }, 100);
}

/** Focus an element without scrolling; headings get tabindex=-1 so they can take focus. */
function focusQuietly(el) {
  if (!el.matches('a[href], button, input, select, textarea, [tabindex]')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

// A control's identity, to find it again after the same screen re-renders
// (e.g. the daily-goal menu on Journey): tag, label and position among
// controls with the same tag and label.
const CONTROLS = 'a[href], button, input, select, textarea';
const controlLabel = (el) => el.getAttribute('aria-label') || el.getAttribute('name') || el.textContent.trim();
function controlKey(main, el) {
  if (!el?.matches?.(CONTROLS) || !main.contains(el)) return null;
  const label = controlLabel(el);
  const same = [...main.querySelectorAll(el.tagName)].filter((c) => controlLabel(c) === label);
  return { tag: el.tagName, label, index: same.indexOf(el) };
}
function findControl(main, key) {
  if (!key) return null;
  return [...main.querySelectorAll(key.tag)].filter((c) => controlLabel(c) === key.label)[key.index] || null;
}

/**
 * After the view is replaced, focus would fall back to <body>: keyboard users
 * lose their place and screen readers say nothing about the new screen. Put
 * focus back on the same control when the same screen re-rendered and still
 * has it, otherwise on the new screen's main heading (or the view itself), and
 * announce the screen's name when no h1 is there to be read out.
 */
function focusView(main, { restoreKey, title }) {
  const same = findControl(main, restoreKey);
  if (same) { same.focus({ preventScroll: true }); return; }
  const target = main.querySelector('h1') || main.querySelector('h2, .kicker') || main;
  focusQuietly(target);
  announce(target.tagName === 'H1' ? '' : title);
}

/**
 * Content replaced inside the view (the next exercise of a session, a
 * lesson's summary, the next ear-training pair…) can take the focused button
 * with it. When that happens, focus the heading of the content that replaced
 * it. Exercises that focus their own input (typing) do so a moment later and
 * win. Nothing happens if focus is still somewhere, or the new content has no
 * heading (browsers then continue Tab from where the old element was).
 */
function keepFocusInView(main) {
  let last = null;
  document.addEventListener('focusin', (e) => { last = e.target; });
  new MutationObserver((records) => {
    const active = document.activeElement;
    if (!last || last.isConnected || (active && active !== document.body)) return;
    const lost = last;
    last = null;
    const rec = records.find((r) => [...r.removedNodes].some((n) => n === lost || n.contains?.(lost)));
    const box = rec?.target;
    if (!box?.isConnected || !main.contains(box) || box === main) return;
    const heading = box.querySelector('h1, h2, h3, .kicker');
    if (heading) focusQuietly(heading);
  }).observe(main, { childList: true, subtree: true });
}

function parse() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [name = '', ...params] = raw.split('/').map((p) => decodeURIComponent(p));
  return { name: name in ROUTES ? name : '', params };
}

// ---------- Where the learner came from ----------
// Every history entry the app shows gets an index (history.state.lisanIdx)
// and a record { path, title, tab, lang, session }. The record of the entry
// before the current one is the screen back links return to (history.back()
// lands exactly there), and the tab detail screens inherit. Kept for the tab
// (sessionStorage), so it survives a reload.
const STACK_KEY = 'lisan:navstack';
let stack = {}; // history index → record (only the last few dozen are kept)
try { stack = JSON.parse(sessionStorage.getItem(STACK_KEY) || '{}'); } catch { /* none */ }
if (!stack || typeof stack !== 'object' || Array.isArray(stack)) stack = {};
let here = -1;
const currentPath = () => location.hash.replace(/^#\/?/, '');
function saveStack() {
  for (const k of Object.keys(stack)) if (Number(k) < here - 40) delete stack[k];
  try { sessionStorage.setItem(STACK_KEY, JSON.stringify(stack)); } catch { /* not kept */ }
}
/** Screens that run a lesson, review or round: going back to one would start it again. */
const isSession = (name, params) => name === 'review' || (name === 'learn' && !!params[0] && params[0] !== 'g')
  || (name === 'practice' && !!params[0]) || name === 'welcome';

/**
 * Move `here` to the history entry being shown and return its record from
 * before (null for a new entry). A new entry follows the current one, and
 * any entries after it (forward history) are gone.
 */
function enter() {
  let idx = history.state?.lisanIdx;
  if (!Number.isInteger(idx) || idx < 0) {
    idx = here + 1;
    try { history.replaceState({ ...(history.state || {}), lisanIdx: idx }, ''); } catch { /* keep going */ }
    for (const k of Object.keys(stack)) if (Number(k) >= idx) delete stack[k];
  }
  here = idx;
  const old = stack[idx];
  return old && old.path === currentPath() && old.lang === lang.code ? old : null;
}

function track(name, params, title, tab) {
  stack[here] = { path: currentPath(), title, tab, lang: lang.code, session: isSession(name, params) };
  saveStack();
}

function titleOf(name, params) {
  switch (name) {
    case '': return 'Home';
    case 'learn': {
      const cat = params[0] !== 'g' && lang.categories.find((c) => c.id === params[0]);
      return cat ? `Lesson: ${cat.name}` : 'Learn';
    }
    case 'topic': return lang.categories.find((c) => c.id === params[0])?.name || 'Topic';
    case 'word': return lang.byId(params[0])?.tr || 'Word';
    case 'journey': return ctx.settings.gameOn ? 'Journey' : 'Goals';
    case 'grammar': return params[0] ? (lang.grammar || []).find((l) => l.id === params[0])?.title || 'Grammar' : 'Grammar';
    default: return {
      review: 'Review', practice: 'Practice', speak: 'Speak', progress: 'Progress', settings: 'Settings', welcome: 'Welcome',
      known: 'Already learned', language: 'Languages', sync: 'Sync', read: 'Read & Listen', phrases: 'Phrasebook', search: 'Search', me: 'Me',
    }[name];
  }
}

function render() {
  const main = document.getElementById('view');
  const { name, params } = parse();
  // The screen this one was opened from, and this entry's record if it was shown before.
  const from = stack[here]?.lang === lang.code ? stack[here] : null;
  const before = enter();
  // The same screen again (rerender(), a sub-tab, a menu that changes the
  // address): remember the focused control to put focus back on it.
  const restoreKey = name === lastView ? controlKey(main, document.activeElement) : null;
  cleanups.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanups = [];
  speech.cancelSpeech();

  let el;
  try {
    el = ROUTES[name](ctx, ...params);
  } catch (err) {
    console.error(err);
    el = h('div', { class: 'view' }, h('div', { class: 'summary' },
      h('h2', null, 'Something went wrong'), h('p', { class: 'muted' }, String(err.message || err)),
      h('a', { class: 'btn primary', href: '#/' }, 'Back home')));
  }
  set(main, el);
  document.body.classList.toggle('bare', name === 'welcome');

  const staticTab = Object.hasOwn(TAB_OF, name) ? TAB_OF[name] : name;
  const inherited = before ? before.tab : from?.tab;
  const tab = INHERIT_TAB.has(name) ? inherited ?? staticTab : staticTab;
  document.querySelectorAll('.tabbar a').forEach((a) => {
    const active = a.dataset.tab === tab;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  const searchBtn = document.querySelector('.top-search');
  if (searchBtn) { if (name === 'search') searchBtn.setAttribute('aria-current', 'page'); else searchBtn.removeAttribute('aria-current'); }
  const dot = document.querySelector('.tab-dot');
  if (dot) dot.hidden = !ctx.settings.gameOn || game.unseenCount() === 0;
  const due = dueWords(ctx).length;
  const badge = document.querySelector('.tab-badge');
  if (badge) {
    badge.hidden = due === 0;
    badge.textContent = due > 99 ? '99+' : String(due);
    badge.title = `${due} to review`;
  }
  const title = titleOf(name, params);
  track(name, params, title || 'Lisan', tab);
  document.title = title ? `${title} · Lisan ${lang.name}` : `Lisan · ${lang.name}`;
  window.scrollTo(0, 0);
  // On first load the browser (or screen reader) starts at the top by itself.
  if (lastView !== null) focusView(main, { restoreKey, title: title || 'Lisan' });
  lastView = name;
}

// Android's back button / gesture: close an open dialog first, otherwise go
// back a screen; only the home screen (or the welcome screen) leaves the app.
// In a lesson that would lose answers, it first asks "Leave this lesson?",
// like the lesson's ✕.
function onBack({ canGoBack }) {
  const dialog = document.querySelector('[role="dialog"][aria-modal="true"]:not(.leaving)');
  const { name, params } = parse();
  // Welcome steps 2–4: back means the previous step, not leaving the app.
  const step = name === 'welcome' && !dialog ? WELCOME_STEPS.indexOf(params[0]) : -1;
  if (step > 0) { location.replace(`#/welcome${step > 1 ? `/${WELCOME_STEPS[step - 1]}` : ''}`); return; }
  const action = backAction({ dialogOpen: !!dialog, atRoot: name === '' || name === 'welcome', canGoBack });
  const leave = () => { if (action === 'back') history.back(); else location.hash = '#/'; };
  if (action === 'close-dialog') dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  else if ((action === 'back' || action === 'home') && sessionBack(leave)) { /* asked first */ }
  else if (action === 'back') history.back();
  else if (action === 'home') location.hash = '#/';
  else { speech.cancelSpeech(); leaveApp(); }
}

// First launch: show the welcome screen. People who already have progress
// (e.g. from before onboarding existed, or an import) skip it.
if (!store.getSettings().onboarded) {
  if (store.hasAnyProgress()) store.updateSettings({ onboarded: true });
  else if (!location.hash || location.hash === '#/') history.replaceState(null, '', '#/welcome');
}
initCelebrations(ctx);
window.addEventListener('lisan:goal-reached', (e) => game.goalMet(e.detail?.lang || lang.code));

// Daily reminders (apps only): re-planned at start, when settings change and
// when today's goal is met, so each message says what is really waiting.
function planReminders() {
  const cards = Object.values(store.getCards(lang.code));
  return syncReminders({
    settings: store.getSettings(),
    langName: lang.name,
    dueAt: (t) => cards.filter((c) => c.due <= t).length,
    streak: store.streak(lang.code),
    goalMetToday: store.getDay(lang.code).goalMet,
  });
}
ctx.planReminders = planReminders;
ctx.applyDisplaySettings = applyDisplaySettings;

// Achievements such as "learn a topic in every language" need numbers from
// the other languages' packs. They are remembered per device; load a pack only
// when its numbers are missing (first run after an update, a sync, an import).
async function summariseLanguages({ fresh = false } = {}) {
  if (fresh) game.forgetSummaries();
  const codes = game.languagesToSummarise();
  if (!codes.length) return;
  try {
    await Promise.all(codes.map(loadLanguage));
    game.refresh(lang.code);
  } catch (e) { console.error(e); }
}
ctx.summariseLanguages = summariseLanguages;
window.addEventListener('lisan:goal-reached', planReminders);
onReminderTap((route) => ctx.go(route));
window.addEventListener('lisan:activity', (e) => game.checkRepair(e.detail?.lang || lang.code));
// Show the dot on the Me tab when something is unlocked.
game.onReward((r) => {
  if (r.kind === 'achievement' && ctx.settings.gameOn) document.querySelector('.tab-dot')?.removeAttribute('hidden');
});

shell();
window.addEventListener('hashchange', render);
onBackButton(onBack);
render();
// The first screen is up: drop the loading screen; on the website, also
// register the service worker (offline files, update prompt).
bootDone(ctx);
planReminders();
(window.requestIdleCallback || ((fn) => setTimeout(fn, 2000)))(() => summariseLanguages());
