// Start-up, offline and saving behaviour that the performance work relies on:
// the service worker (run here against fake caches and a fake network), the
// stamped build, batched saving in a browser (no native mirror), and the
// loading screen in index.html.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const root = fileURLToPath(new URL('..', import.meta.url));

// ---------- A browser without the native apps' bridge ----------

const local = new Map();
let failWrites = null; // an Error to throw from setItem
let setCalls = 0;
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem: (k) => (local.has(k) ? local.get(k) : null),
    setItem: (k, v) => {
      if (k === 'lisan:v1') setCalls++;
      if (failWrites) throw failWrites;
      local.set(k, String(v));
    },
    removeItem: (k) => local.delete(k),
    key: (i) => [...local.keys()][i] ?? null,
    get length() { return local.size; },
  },
});
const win = new EventTarget();
globalThis.window = win;
globalThis.CustomEvent ??= class extends Event { constructor(type, init) { super(type); this.detail = init?.detail; } };
const doc = Object.assign(new EventTarget(), { visibilityState: 'visible' });
globalThis.document = doc;
let persistCalls = 0;
Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: { storage: { persisted: async () => false, persist: async () => { persistCalls++; return true; } } },
});

const store = await import('../js/store.js');
const T = Date.now();
const card = { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: T, added: T, last: T };
const tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));
const saved = () => JSON.parse(local.get('lisan:v1') || 'null');

test('saving: everything one tap changes is written once', async () => {
  store._resetAll();
  setCalls = 0;
  // what one review answer does: card, day log, game state
  store.setCard('tr', 'kedi', card);
  store.logActivity('tr', { reviews: 1, correct: 1 });
  store.getGame().x = 1;
  store.persist();
  assert.equal(setCalls, 0, 'nothing is written while the tap is still being handled');
  await tick();
  assert.equal(setCalls, 1);
  assert.ok(saved().progress.tr.cards.kedi, 'and the write has all of it');
  assert.equal(saved().game.x, 1);
});

test('saving: at most one write per 300 ms; the rest waits and is not lost', async () => {
  store._resetAll();
  setCalls = 0;
  store.setCard('tr', 'a', card);
  await tick();
  assert.equal(setCalls, 1);
  for (const id of ['b', 'c', 'd']) {
    store.setCard('tr', id, card);
    await tick(20);
  }
  assert.equal(setCalls, 1, 'changes within 300 ms of a write wait for the next one');
  await tick(320);
  assert.equal(setCalls, 2, 'then one write takes them all');
  assert.deepEqual(Object.keys(saved().progress.tr.cards), ['a', 'b', 'c', 'd']);
});

test('saving: written at once when the page is hidden or closed', async () => {
  store._resetAll();
  store.setCard('tr', 'a', card);
  await tick();
  store.setCard('tr', 'hidden', card);
  doc.visibilityState = 'hidden';
  doc.dispatchEvent(new Event('visibilitychange'));
  doc.visibilityState = 'visible';
  assert.ok(saved().progress.tr.cards.hidden, 'visibilitychange → hidden');
  store.setCard('tr', 'closed', card);
  win.dispatchEvent(new Event('pagehide'));
  assert.ok(saved().progress.tr.cards.closed, 'pagehide');
  store.updateSettings({ lang: 'ja' });
  assert.equal(saved().settings.lang, 'ja', 'settings are written straight away (a language switch reloads)');
});

test('saving: a failed write is reported, and clears once saving works again', async () => {
  store._resetAll();
  const seen = [];
  const on = (e) => seen.push(e.detail.problem);
  win.addEventListener('lisan:storage', on);
  assert.equal(store.storageProblem(), null);
  failWrites = Object.assign(new Error('full'), { name: 'QuotaExceededError' });
  store.setCard('tr', 'a', card);
  await tick();
  assert.equal(store.storageProblem(), 'full');
  assert.equal(store.saveOk(), false);
  failWrites = Object.assign(new Error('denied'), { name: 'SecurityError' });
  store.flush();
  store.setCard('tr', 'b', card);
  await tick(350);
  assert.equal(store.storageProblem(), 'blocked');
  failWrites = null;
  store.setCard('tr', 'c', card);
  await tick(350);
  assert.equal(store.storageProblem(), null);
  assert.deepEqual(seen, ['full', 'blocked', null]);
  win.removeEventListener('lisan:storage', on);
});

test('saving: storage that can’t even be read is reported from the start', async () => {
  const desc = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new DOMException('denied', 'SecurityError'); } });
  try {
    const blocked = await import('../js/store.js?blocked');
    assert.equal(blocked.storageProblem(), 'blocked');
    assert.equal(blocked.getSettings().onboarded, false);
  } finally {
    Object.defineProperty(globalThis, 'localStorage', desc);
  }
});

test('persistent storage is asked for once, and only when there is progress to keep', async () => {
  store._resetAll();
  local.delete('lisan:persist');
  persistCalls = 0;
  assert.equal(await store.requestPersistence(), null, 'nothing learned yet');
  assert.equal(persistCalls, 0);
  store.setCard('tr', 'a', card);
  assert.equal(await store.requestPersistence(), true);
  assert.equal(await store.requestPersistence(), null, 'not asked again');
  assert.equal(persistCalls, 1);
});

// ---------- Loading screen ----------

test('the loading screen uses the app’s light and dark colours', () => {
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  const css = readFileSync(join(root, 'css/styles.css'), 'utf8');
  const tokens = (src) => Object.fromEntries([...src.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim().toLowerCase()]));
  const light = tokens(css.match(/^:root\s*\{([^}]*)\}/m)[1]);
  const darkCss = readFileSync(join(root, 'css/dark.css'), 'utf8');
  const dark = { ...light, ...tokens(darkCss.match(/^:root\s*\{([^}]*)\}/m)[1]) };
  const boot = html.match(/<style>([\s\S]*?)<\/style>/)[1];
  const bootLight = tokens(boot.match(/\.boot\s*\{([^}]*)\}/)[1]);
  // The dark colours are a second <style>, switched with the dark stylesheet (same media, same script).
  const bootDark = tokens(html.match(/<style id="boot-dark" media="\(prefers-color-scheme: dark\)">\s*\.boot\s*\{([^}]*)\}/)[1]);
  assert.match(html, /<link rel="stylesheet" href="css\/dark\.css" id="dark-css" media="\(prefers-color-scheme: dark\)">/);
  const names = { bg: '--bg', surface: '--surface', text: '--text', muted: '--muted', border: '--border', accent: '--accent', 'accent-ink': '--accent-ink' };
  for (const [short, token] of Object.entries(names)) {
    assert.equal(bootLight[`--boot-${short}`], light[token], `light ${token}`);
    assert.equal(bootDark[`--boot-${short}`], dark[token], `dark ${token}`);
  }
  assert.match(html, /<div id="boot"/, 'the screen is in the HTML, so it paints before any script');
});

/** Run the loading screen's inline watchdog against a tiny fake page. */
function bootPage() {
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  const code = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).find((c) => c.includes('boot-retry'));
  const els = {};
  const page = { view: false, listeners: {}, logged: [] };
  for (const id of ['boot', 'boot-text', 'boot-actions', 'boot-retry', 'boot-repair']) {
    els[id] = { id, hidden: false, className: 'boot', innerHTML: '', text: '', focus() {}, appendChild(c) { this.text += c.textContent ?? c.text ?? ''; }, parentNode: { removeChild: (c) => { delete els[c.id]; } } };
  }
  const unref = (t) => { t.unref?.(); return t; };
  const window = { addEventListener: (type, fn) => { page.listeners[type] = fn; } };
  vm.runInNewContext(code, {
    window,
    navigator: {},
    location: { reload() {} },
    console: { error: (...a) => page.logged.push(a) },
    setTimeout: (fn, ms) => unref(setTimeout(fn, ms)),
    setInterval: (fn, ms) => unref(setInterval(fn, ms)),
    clearInterval,
    document: {
      getElementById: (id) => els[id] || null,
      querySelector: (sel) => (sel === '#view > *' && page.view ? {} : null),
      createElement: (tag) => (tag === 'script' ? { noModule: false } : { textContent: '' }),
      createTextNode: (text) => ({ text }),
    },
  });
  return { page, window, els };
}

test('the loading screen goes once a first view is on, even one drawn by cached scripts older than the page', async () => {
  const { page, window, els } = bootPage();
  await tick(300);
  assert.ok(els.boot, 'still loading');
  page.view = true; // an older app.js (no js/boot.js) rendered its first view
  await tick(300);
  assert.equal(els.boot, undefined, 'the screen is gone');
  assert.equal(window.__lisanBooted, true);
  page.listeners.error({ target: window, error: new Error('later') }); // errors after start-up are not a failed start
  await tick(1100);
  assert.deepEqual(page.logged, []);
});

test('the loading screen says when starting failed, with a way to try again', async () => {
  const { page, els } = bootPage();
  page.listeners.error({ target: { tagName: 'SCRIPT', src: 'https://x/js/app.js' } }); // a module could not be fetched
  assert.equal(els.boot.className, 'boot failed');
  assert.match(els['boot-text'].text, /couldn’t start.*didn’t load/);
  assert.equal(els['boot-actions'].hidden, false);
  assert.equal(page.logged.length, 1, 'and the error is logged');
});

// ---------- Service worker ----------

const ORIGIN = 'https://lisan.test/app/';
const assetsOf = (src) => [...src.match(/const ASSETS = \[([\s\S]*?)\];/)[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);

/** Run sw.js against fake caches and a fake network that serves `serve(path)`. */
function worker(source, serve) {
  const listeners = {};
  const stores = new Map();
  const net = { offline: false, log: [] };
  const key = (req, opts = {}) => {
    const url = new URL(typeof req === 'string' ? req : req.url, ORIGIN);
    if (opts.ignoreSearch) url.search = '';
    return url.href;
  };
  const cache = (name) => ({
    put: async (req, res) => { stores.get(name).set(key(req), res); },
    match: async (req, opts) => stores.get(name).get(key(req, opts))?.clone(),
    keys: async () => [...stores.get(name).keys()],
  });
  const caches = {
    open: async (name) => { if (!stores.has(name)) stores.set(name, new Map()); return cache(name); },
    keys: async () => [...stores.keys()],
    delete: async (name) => stores.delete(name),
  };
  class Req extends Request {
    constructor(url, init) { super(typeof url === 'string' ? new URL(url, ORIGIN).href : url, init); }
  }
  const fetch = async (req) => {
    const url = new URL(typeof req === 'string' ? req : req.url, ORIGIN);
    net.log.push(url.href);
    if (net.offline) throw new TypeError('Failed to fetch');
    const body = serve(url.pathname.slice(new URL(ORIGIN).pathname.length) || 'index.html');
    return body == null ? new Response('Not found', { status: 404 }) : new Response(body, { status: 200 });
  };
  let skipped = false;
  const self = {
    location: new URL('sw.js', ORIGIN),
    addEventListener: (type, fn) => (listeners[type] ||= []).push(fn),
    clients: { claim: async () => {} },
    skipWaiting: () => { skipped = true; },
  };
  vm.runInNewContext(source, { self, caches, fetch, Request: Req, Response, URL, crypto: globalThis.crypto, Uint8Array, Promise, Error, TypeError });
  const fire = (type, props = {}) => {
    let result;
    const event = { ...props, waitUntil: (p) => { result = p; }, respondWith: (p) => { result = p; } };
    for (const fn of listeners[type] || []) fn(event);
    return result;
  };
  return {
    net, stores, caches,
    skipped: () => skipped,
    install: () => fire('install'),
    activate: () => fire('activate'),
    message: (data) => fire('message', { data }),
    get: (path, mode = 'cors') => fire('fetch', { request: { url: new URL(path, ORIGIN).href, method: 'GET', mode } }),
  };
}

// One build for all the service worker tests below.
const out = mkdtempSync(join(tmpdir(), 'lisan-build-'));
execFileSync(process.execPath, [join(root, 'scripts/build-web.js'), out], { stdio: 'pipe' });
process.on('exit', () => rmSync(out, { recursive: true, force: true }));
const builtSw = readFileSync(join(out, 'sw.js'), 'utf8');
const fromBuild = (overrides = {}) => (path) => {
  if (Object.hasOwn(overrides, path)) return overrides[path];
  try { return readFileSync(join(out, path)); } catch { return null; }
};

test('the build stamps the service worker with its version and file hashes', () => {
  const version = builtSw.match(/const VERSION = '([^']+)';/)[1];
  assert.match(version, /^[0-9a-f]{12}$/);
  const hashes = JSON.parse(builtSw.match(/const HASHES = (\{.*\});/)[1]);
  const files = assetsOf(builtSw).map((u) => (u === './' ? 'index.html' : u));
  assert.deepEqual(Object.keys(hashes).sort(), [...new Set(files)].sort());
  for (const f of files) {
    assert.equal(hashes[f], createHash('sha256').update(readFileSync(join(out, f))).digest('hex').slice(0, 16), f);
  }
  const src = readFileSync(join(root, 'sw.js'), 'utf8');
  assert.match(src, /const VERSION = 'dev';/, 'the source stays unstamped');
});

test('the build writes the packs\' data files compactly, with exactly the same values', async () => {
  let before = 0;
  let after = 0;
  let compacted = 0;
  for (const code of ['tr', 'uk', 'ja', 'ar']) {
    for (const name of readdirSync(join(root, 'js/languages', code))) {
      const rel = `js/languages/${code}/${name}`;
      const srcText = readFileSync(join(root, rel), 'utf8');
      const outText = readFileSync(join(out, rel), 'utf8');
      before += srcText.length;
      after += outText.length;
      if (outText === srcText) continue;
      compacted++;
      const a = await import(pathToFileURL(join(root, rel)).href);
      const b = await import(pathToFileURL(join(out, rel)).href);
      assert.deepEqual(Object.keys(b), Object.keys(a), rel);
      for (const k of Object.keys(a)) assert.deepStrictEqual(b[k], a[k], `${rel}: ${k}`);
      assert.equal(outText.split('\n')[0], srcText.split('\n')[0], `${rel}: the opening comment stays`);
    }
    // The code of a pack (its index, phonetics…) is shipped as written.
    assert.equal(readFileSync(join(out, `js/languages/${code}/index.js`), 'utf8'), readFileSync(join(root, `js/languages/${code}/index.js`), 'utf8'));
  }
  assert.ok(compacted >= 12, `${compacted} data files compacted`);
  assert.ok(after < before * 0.9, `packs: ${before} → ${after} characters`);
});

test('service worker: a version installs completely or not at all', async () => {
  const version = builtSw.match(/const VERSION = '([^']+)';/)[1];
  const sw = worker(builtSw, fromBuild());
  await sw.install();
  assert.deepEqual(await sw.caches.keys(), [`lisan-${version}`]);
  assert.equal(sw.stores.get(`lisan-${version}`).size, new Set(assetsOf(builtSw)).size);

  // The server has a different copy of one file (e.g. a CDN still serving the previous deploy).
  const stale = worker(builtSw, fromBuild({ 'js/ui.js': '// another version' }));
  await assert.rejects(stale.install(), /another version/);
  assert.deepEqual(await stale.caches.keys(), [], 'nothing is left behind');
  assert.ok(stale.net.log.filter((u) => u.endsWith('/js/ui.js')).length === 2, 'it asked the server again before giving up');

  const missing = worker(builtSw, fromBuild({ 'js/store.js': null }));
  await assert.rejects(missing.install(), /404/);
  assert.deepEqual(await missing.caches.keys(), []);
});

test('service worker: cache first; offline, pages get the app and scripts never get HTML', async () => {
  const sw = worker(builtSw, fromBuild());
  await sw.install();
  await sw.activate();
  sw.net.log.length = 0;
  const app = await sw.get('js/app.js');
  assert.equal(await app.text(), readFileSync(join(out, 'js/app.js'), 'utf8'));
  const page = await sw.get('./?utm=x', 'navigate');
  assert.equal(await page.text(), readFileSync(join(out, 'index.html'), 'utf8'));
  assert.deepEqual(sw.net.log, [], 'no network for cached files');

  sw.net.offline = true;
  assert.equal((await sw.get('js/missing.js')).type, 'error', 'an uncached script fails as a network error');
  assert.equal(await (await sw.get('somewhere', 'navigate')).text(), readFileSync(join(out, 'index.html'), 'utf8'));
});

test('service worker: activating removes other versions; skip-waiting on request', async () => {
  const sw = worker(builtSw, fromBuild());
  await sw.caches.open('lisan-v13');
  await sw.caches.open('someone-else');
  await sw.install();
  await sw.activate();
  const keys = await sw.caches.keys();
  assert.ok(!keys.includes('lisan-v13') && keys.includes('someone-else') && keys.length === 2, String(keys));
  assert.equal(sw.skipped(), false, 'a new version waits for open pages');
  sw.message({ type: 'skip-waiting' });
  assert.equal(sw.skipped(), true);
});

test('service worker, unbuilt (npm start): network first, the cache when offline', async () => {
  const src = readFileSync(join(root, 'sw.js'), 'utf8');
  let body = 'v1';
  const sw = worker(src, (path) => (path === 'js/app.js' ? body : fromBuild()(path)));
  await sw.install();
  body = 'v2';
  assert.equal(await (await sw.get('js/app.js')).text(), 'v2', 'edits show up straight away');
  await new Promise((r) => setImmediate(r));
  sw.net.offline = true;
  assert.equal(await (await sw.get('js/app.js')).text(), 'v2', 'offline: the last copy');
  assert.equal((await sw.get('js/missing.js')).type, 'error');
  assert.equal(await (await sw.get('./', 'navigate')).text(), readFileSync(join(out, 'index.html'), 'utf8'));
});
