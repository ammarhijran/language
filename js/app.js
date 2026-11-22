import { languages, defaultLanguage } from './languages/index.js';
import * as store from './store.js';
import * as speech from './speech.js';
import { h, icon, toast, set } from './ui.js';
import { dueWords } from './stats.js';
import { isNative, onBackButton, backAction, leaveApp } from './native.js';
import home from './views/home.js';
import learn from './views/learn.js';
import review from './views/review.js';
import practice from './views/practice.js';
import pronounce from './views/pronounce.js';
import progress from './views/progress.js';
import settingsView from './views/settings.js';
import wordView from './views/word.js';
import welcome from './views/welcome.js';
import journey from './views/journey.js';
import syncView from './views/sync.js';
import grammarView from './views/grammar.js';
import readView from './views/read.js';
import * as game from './game.js';
import { initCelebrations } from './celebrate.js';
import known from './views/known.js';
import language from './views/language.js';

// In the apps, progress (and with it the chosen language) may first have to be
// restored from native storage, so wait for that before anything reads settings.
await store.init();

const lang = languages[store.getSettings().lang] || languages[defaultLanguage];

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
};

const TABS = [
  { id: '', label: 'Home', icon: 'home' },
  { id: 'learn', label: 'Learn', icon: 'book' },
  { id: 'review', label: 'Review', icon: 'repeat' },
  { id: 'speak', label: 'Speak', icon: 'mic' },
  { id: 'progress', label: 'Progress', icon: 'chart' },
];
const TAB_OF = { practice: '', word: 'progress', settings: 'progress', known: 'learn', language: '', journey: '', sync: 'progress', grammar: 'learn', read: 'learn' };

let cleanups = [];
let lastView = null; // the route name rendered last; null before the first render

const ctx = {
  lang,
  store,
  speech,
  get settings() { return store.getSettings(); },
  say(text, { slow = false } = {}) {
    const s = store.getSettings();
    return speech.speak(text, { lang: lang.speechLang, rate: slow ? Math.min(0.6, s.rate * 0.7) : s.rate, voiceURI: s.voices?.[lang.code] ?? '' });
  },
  go(path) { location.hash = path; },
  onCleanup(fn) { cleanups.push(fn); },
  toast,
  rerender: () => render(),
  game,
  inSession: false,
};

function shell() {
  const tabbar = h('nav', { class: 'tabbar', 'aria-label': 'Main' },
    TABS.map((t) => h('a', { href: `#/${t.id}`, dataset: { tab: t.id } },
      icon(t.icon, 22), h('span', null, t.label),
      t.id === 'review' ? h('i', { class: 'tab-badge', hidden: true }) : null)));

  document.body.prepend(
    h('a', {
      href: '#/', class: 'skip-link',
      onclick: (e) => { e.preventDefault(); document.getElementById('view').focus(); },
    }, 'Skip to content'),
    h('header', { class: 'topbar' },
      h('a', { href: '#/', class: 'brand', 'aria-label': 'Lisan home' },
        h('img', { src: 'icons/icon.svg', alt: '', width: 28, height: 28 }), 'Lisan'),
      h('a', { class: 'lang-pill', href: '#/language', title: `Learning ${lang.name} — change language` }, h('span', { 'aria-hidden': 'true' }, lang.flag), ' ', h('span', { lang: lang.code }, lang.nativeName)),
      h('a', { href: '#/journey', class: 'icon-btn trophy', 'aria-label': 'Journey: level, goals and achievements' }, icon('trophy'), h('i', { class: 'dot', hidden: true })),
      h('a', { href: '#/settings', class: 'icon-btn', 'aria-label': 'Settings' }, icon('settings'))),
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

function render() {
  const main = document.getElementById('view');
  const { name, params } = parse();
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

  const tab = TAB_OF[name] ?? name;
  document.querySelectorAll('.tabbar a').forEach((a) => {
    const active = a.dataset.tab === tab;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  const trophy = document.querySelector('.trophy');
  if (trophy) {
    trophy.hidden = !ctx.settings.gameOn;
    trophy.querySelector('.dot').hidden = game.unseenCount() === 0;
  }
  const due = dueWords(ctx).length;
  const badge = document.querySelector('.tab-badge');
  if (badge) {
    badge.hidden = due === 0;
    badge.textContent = due > 99 ? '99+' : String(due);
  }
  const title = { '': 'Home', learn: 'Learn', review: 'Review', practice: 'Practice', speak: 'Pronunciation', progress: 'Progress', settings: 'Settings', welcome: 'Welcome', known: 'Already learned', language: 'Languages', journey: 'Journey', sync: 'Sync', grammar: 'Grammar', read: 'Read & Listen', word: lang.byId(params[0])?.tr }[name];
  document.title = title ? `${title} · Lisan ${lang.name}` : `Lisan · ${lang.name}`;
  window.scrollTo(0, 0);
  // On first load the browser (or screen reader) starts at the top by itself.
  if (lastView !== null) focusView(main, { restoreKey, title: title || 'Lisan' });
  lastView = name;
}

// Android's back button / gesture: close an open dialog first, otherwise go
// back a screen; only the home screen (or the welcome screen) leaves the app.
function onBack({ canGoBack }) {
  const dialog = document.querySelector('[role="dialog"][aria-modal="true"]:not(.leaving)');
  const { name } = parse();
  const action = backAction({ dialogOpen: !!dialog, atRoot: name === '' || name === 'welcome', canGoBack });
  if (action === 'close-dialog') dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
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
window.addEventListener('lisan:activity', (e) => game.checkRepair(e.detail?.lang || lang.code));
// Refresh the trophy dot when something is unlocked.
game.onReward((r) => {
  if (r.kind === 'achievement') document.querySelector('.trophy .dot')?.removeAttribute('hidden');
});

shell();
window.addEventListener('hashchange', render);
onBackButton(onBack);
render();

// Offline caching for the website. The native apps already ship their files.
if (!isNative() && 'serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
