import { languages, defaultLanguage } from './languages/index.js';
import * as store from './store.js';
import * as speech from './speech.js';
import { h, icon, toast, set } from './ui.js';
import { dueWords } from './stats.js';
import { isNative } from './native.js';
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
import * as game from './game.js';
import { initCelebrations } from './celebrate.js';
import known from './views/known.js';
import language from './views/language.js';

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
};

const TABS = [
  { id: '', label: 'Home', icon: 'home' },
  { id: 'learn', label: 'Learn', icon: 'book' },
  { id: 'review', label: 'Review', icon: 'repeat' },
  { id: 'speak', label: 'Speak', icon: 'mic' },
  { id: 'progress', label: 'Progress', icon: 'chart' },
];
const TAB_OF = { practice: '', word: 'progress', settings: 'progress', known: 'learn', language: '', journey: '' };

let cleanups = [];

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
    tabbar,
  );
}

function parse() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [name = '', ...params] = raw.split('/').map((p) => decodeURIComponent(p));
  return { name: name in ROUTES ? name : '', params };
}

function render() {
  cleanups.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanups = [];
  speech.cancelSpeech();

  const { name, params } = parse();
  const main = document.getElementById('view');
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
  const title = { '': 'Home', learn: 'Learn', review: 'Review', practice: 'Practice', speak: 'Pronunciation', progress: 'Progress', settings: 'Settings', welcome: 'Welcome', known: 'Already learned', language: 'Languages', journey: 'Journey', word: lang.byId(params[0])?.tr }[name];
  document.title = title ? `${title} · Lisan ${lang.name}` : `Lisan · ${lang.name}`;
  window.scrollTo(0, 0);
}

await store.init();

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
render();

// Offline caching for the website. The native apps already ship their files.
if (!isNative() && 'serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
