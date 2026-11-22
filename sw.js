// Offline files and fast launches for the website (the Android/iOS apps ship
// their files and don't use this).
//
// Each VERSION is one complete, consistent copy of the app:
// - install: the new worker downloads every file of its version, fresh from
//   the server, into a cache of its own. If any file fails (or, in a build,
//   doesn't match the hash it was built with), the install fails and the old
//   version stays: all or nothing.
// - fetch: files come from that cache first, so a launch never waits for the
//   network, and a page never mixes ES modules from two versions.
// - update: while a page of the old version is open, the new worker waits. It
//   takes over at the next launch, or straight away when the page asks
//   ('skip-waiting', from the "Update ready" prompt), and then the page reloads.
//
// scripts/build-web.js replaces VERSION and HASHES with hashes of the shipped
// files, so every deploy that changes a file is a new version. Served straight
// from the source tree (VERSION 'dev', e.g. `npm start`), the worker asks the
// network first instead, so edits show up on reload, and uses the cache offline.
const VERSION = 'dev';
const HASHES = null; // { file: first 16 hex digits of its SHA-256 } in a build

const CACHE = `lisan-${VERSION}`;
const DEV = VERSION === 'dev';

const ASSETS = [
  // App shell
  './',
  'index.html',
  'privacy.html',
  'manifest.webmanifest',
  'css/styles.css',
  'css/read.css',
  'css/nav.css',
  'css/session.css',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'js/app.js',
  'js/boot.js',
  'js/celebrate.js',
  'js/game.js',
  'js/handsfree.js',
  'js/compare.js',
  'js/components.js',
  'js/exercises.js',
  'js/native.js',
  'js/reader.js',
  'js/reminders.js',
  'js/sentences.js',
  'js/session.js',
  'js/speech.js',
  'js/srs.js',
  'js/stats.js',
  'js/store.js',
  'js/sync.js',
  'js/ui.js',
  'js/views/grammar.js',
  'js/views/home.js',
  'js/views/journey.js',
  'js/views/known.js',
  'js/views/language.js',
  'js/views/learn.js',
  'js/views/me.js',
  'js/views/phrases.js',
  'js/views/handsfree.js',
  'js/views/practice.js',
  'js/views/progress.js',
  'js/views/pronounce.js',
  'js/views/read.js',
  'js/views/review.js',
  'js/views/search.js',
  'js/views/settings.js',
  'js/views/sync.js',
  'js/views/topic.js',
  'js/views/welcome.js',
  'js/views/word.js',
  // Languages
  'js/languages/index.js',
  'js/languages/meta.js',
  'js/languages/common.js',
  'js/languages/tr/index.js',
  'js/languages/tr/phonetics.js',
  'js/languages/tr/sounds.js',
  'js/languages/tr/vocab.js',
  'js/languages/tr/more.js',
  'js/languages/tr/grammar.js',
  'js/languages/tr/examples.js',
  'js/languages/tr/texts.js',
  'js/languages/uk/index.js',
  'js/languages/uk/phonetics.js',
  'js/languages/uk/sounds.js',
  'js/languages/uk/vocab.js',
  'js/languages/uk/more.js',
  'js/languages/uk/grammar.js',
  'js/languages/uk/examples.js',
  'js/languages/uk/texts.js',
  'js/languages/ja/index.js',
  'js/languages/ja/kana.js',
  'js/languages/ja/say.js',
  'js/languages/ja/homophones.js',
  'js/languages/ja/sounds.js',
  'js/languages/ja/vocab.js',
  'js/languages/ja/more.js',
  'js/languages/ja/grammar.js',
  'js/languages/ja/examples.js',
  'js/languages/ja/texts.js',
  'js/languages/ja/readings.js',
  'js/languages/ar/index.js',
  'js/languages/ar/translit.js',
  'js/languages/ar/say.js',
  'js/languages/ar/sounds.js',
  'js/languages/ar/vocab.js',
  'js/languages/ar/more.js',
  'js/languages/ar/grammar.js',
  'js/languages/ar/examples.js',
  'js/languages/ar/texts.js',
  'js/languages/ar/readings.js',
];

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

/**
 * Download one file of the new version. In a build, the browser's HTTP cache
 * usually holds the right file already (the page just loaded it), so try that
 * first and check its hash; go to the server only if it is another version.
 * Unbuilt, there is no hash to check: always ask the server.
 */
async function download(url) {
  const want = HASHES?.[url === './' ? 'index.html' : url];
  for (const mode of want ? ['default', 'reload'] : ['no-cache']) {
    const res = await fetch(new Request(url, { cache: mode }));
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    if (!want) return [url, res];
    const got = hex(await crypto.subtle.digest('SHA-256', await res.clone().arrayBuffer())).slice(0, want.length);
    if (got === want) return [url, res];
  }
  throw new Error(`${url}: the server has another version than ${VERSION}`);
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const files = await Promise.all(ASSETS.map(download));
    const cache = await caches.open(CACHE);
    try {
      await Promise.all(files.map(([url, res]) => cache.put(url, res)));
    } catch (err) {
      if (!DEV) await caches.delete(CACHE); // never leave half a version behind
      throw err;
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('lisan-') && key !== CACHE) await caches.delete(key);
    }
    // On the first install, take over the page that is already open, so the
    // files it loads later (and the app offline) come from this version.
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(DEV ? networkFirst(request) : cacheFirst(request));
});

const isPage = (request) => request.mode === 'navigate';
const lookup = (cache, request) => cache.match(request, { ignoreSearch: isPage(request), ignoreVary: true });

/** A navigation can't use a response that was redirected: hand over a plain copy. */
const plain = (res) => (res.redirected ? new Response(res.body, { status: res.status, statusText: res.statusText, headers: res.headers }) : res);

/** Offline and not cached: a page gets the app (it routes by #hash); anything else fails as a network error, never HTML in place of a script. */
async function offline(cache, request) {
  const app = isPage(request) ? await cache.match('index.html', { ignoreVary: true }) : null;
  return app ? plain(app) : Response.error();
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await lookup(cache, request);
  if (hit) return plain(hit);
  try {
    return await fetch(request);
  } catch {
    return offline(cache, request);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request);
    if (res.ok) {
      const copy = res.clone();
      cache.put(request, copy).catch(() => {});
    }
    return res;
  } catch {
    const hit = await lookup(cache, request);
    return hit ? plain(hit) : offline(cache, request);
  }
}
