// Start-up helpers: hand over from the loading screen in index.html, then
// (website only) the service worker with its "Update ready" prompt, a request
// for persistent storage, and a warning when progress can't be saved.
import { h, icon } from './ui.js';
import { isNative } from './native.js';

const idle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 3000 }) : setTimeout(fn, 1500));

// ---------- The start screen ----------
// The loading screen in index.html is also the start screen ("intro"): the
// icon's tea glass on terracotta, then the name. Once the first screen is on
// it hands over after a short beat, so a fast start still shows the whole
// moment (about a second from launch, never more than loading plus that
// beat). An app opened at a particular screen (a reminder, a shortcut, a
// link) goes straight there. A tap skips the wait.
export const INTRO_MS = 700; // from the start of the page: the entrance plays out
export const INTRO_BEAT_MS = 150; // at least this long after the app is ready

/** How long to keep the start screen once the app is ready, `now` ms after the page started. */
export function introWait(now, { deepLink = false, skipped = false } = {}) {
  if (deepLink || skipped) return 0;
  return Math.max(INTRO_BEAT_MS, INTRO_MS - now);
}

/** An address that asks for a particular screen, not the app's own start. */
export const isDeepLink = (hash) => !!hash && !/^#?\/?(welcome)?$/.test(hash);

let skipped = false;
const bootEl = typeof document !== 'undefined' ? document.getElementById('boot') : null;
bootEl?.addEventListener('click', (e) => { if (!e.target.closest?.('button')) { skipped = true; if (window.__lisanBooted) leaveIntro(bootEl); } });

/** Hand over: the start screen fades (and, with motion on, its mark lifts a little), then goes. */
function leaveIntro(el) {
  if (!el?.isConnected || el.dataset.leaving) return;
  el.dataset.leaving = '1';
  el.style.pointerEvents = 'none';
  const still = document.documentElement.dataset.motion === 'off' || matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const gone = () => el.remove();
  if (!el.animate) { gone(); return; }
  // Web Animations, not CSS: a fade still runs when movement is turned off.
  el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: still ? 220 : 320, easing: 'ease-out', fill: 'forwards' }).finished.then(gone, gone);
  if (!still) el.querySelector('.boot-mark')?.animate([{ transform: 'none' }, { transform: 'translateY(-12px) scale(1.04)' }], { duration: 320, easing: 'ease-out', fill: 'forwards' });
  setTimeout(gone, 600);
}

/** The first screen is on: hand over from the start screen and start the background work. */
export function bootDone(ctx) {
  window.__lisanBooted = true;
  const el = document.getElementById('boot');
  if (el && el.classList.contains('intro')) {
    const wait = introWait(performance.now(), { deepLink: isDeepLink(location.hash), skipped });
    setTimeout(() => leaveIntro(el), wait);
  } else el?.remove();
  watchStorage(ctx);
  if (isNative()) return;
  // After the page has loaded, so the worker's downloads don't compete with it.
  const later = () => idle(() => {
    registerServiceWorker();
    ctx.store.requestPersistence();
  });
  if (document.readyState === 'complete') later();
  else window.addEventListener('load', later, { once: true });
}

// ---------- Saving problems ----------

function watchStorage(ctx) {
  let told = false;
  const tell = () => {
    if (told || !ctx.store.storageProblem()) return;
    told = true;
    ctx.toast('Progress can’t be saved on this device — see Settings.');
  };
  window.addEventListener('lisan:storage', tell);
  // Blocked storage is known from the start; say so once the first screen is up.
  if (ctx.store.storageProblem()) setTimeout(tell, 1200);
}

// ---------- Service worker ----------

const HOUR = 3600e3;

export function registerServiceWorker() {
  const sw = navigator.serviceWorker;
  if (!sw || location.protocol === 'file:') return;
  // A new version only takes over an open page when someone pressed Reload on
  // the prompt (in this or another tab). Load it in full then, so no page runs
  // a mix of two versions. The first install taking over the page is not that.
  let current = sw.controller;
  let reloading = false;
  sw.addEventListener('controllerchange', () => {
    const had = current;
    current = sw.controller;
    if (!had || reloading) return;
    reloading = true;
    location.reload();
  });

  sw.register('sw.js').then((reg) => {
    const offer = () => { if (reg.waiting && sw.controller) updatePrompt(reg); };
    offer();
    reg.addEventListener('updatefound', () => {
      const next = reg.installing;
      next?.addEventListener('statechange', () => { if (next.state === 'installed') offer(); });
    });
    // An installed app can stay open for days: look for a new version when it comes back.
    let checked = Date.now();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible' || Date.now() - checked < HOUR) return;
      checked = Date.now();
      reg.update().catch(() => {});
    });
  }).catch(() => { /* no offline files: the site still works online */ });
}

function updatePrompt(reg) {
  if (document.querySelector('.update-prompt')) return;
  const reload = () => {
    bar.querySelector('button').disabled = true;
    if (reg.waiting) reg.waiting.postMessage({ type: 'skip-waiting' }); // the page reloads once it has taken over
    else location.reload();
  };
  const bar = h('div', { class: 'update-prompt', role: 'status' },
    h('span', null, 'Update ready'),
    h('button', { type: 'button', class: 'btn small primary', onclick: reload }, 'Reload'),
    h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Later (updates at the next launch)', onclick: () => bar.remove() }, icon('x', 18)));
  document.body.append(bar);
}
