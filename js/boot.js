// Start-up helpers: hand over from the loading screen in index.html, then
// (website only) the service worker with its "Update ready" prompt, a request
// for persistent storage, and a warning when progress can't be saved.
import { h, icon } from './ui.js';
import { isNative } from './native.js';

const idle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 3000 }) : setTimeout(fn, 1500));

/** The first screen is on: remove the loading screen and start the background work. */
export function bootDone(ctx) {
  window.__lisanBooted = true;
  document.getElementById('boot')?.remove();
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
