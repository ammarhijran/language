// Offline support: network-first so updates show up immediately when online,
// falling back to the cache when offline. Bump VERSION when the file list changes.
const VERSION = 'lisan-v13';

const ASSETS = [
  './',
  'index.html',
  'privacy.html',
  'manifest.webmanifest',
  'css/styles.css',
  'css/read.css',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'js/app.js',
  'js/celebrate.js',
  'js/game.js',
  'js/compare.js',
  'js/components.js',
  'js/exercises.js',
  'js/native.js',
  'js/sentences.js',
  'js/session.js',
  'js/speech.js',
  'js/srs.js',
  'js/stats.js',
  'js/store.js',
  'js/sync.js',
  'js/ui.js',
  'js/languages/index.js',
  'js/languages/tr/more.js',
  'js/languages/tr/grammar.js',
  'js/languages/tr/examples.js',
  'js/languages/tr/texts.js',
  'js/languages/uk/more.js',
  'js/languages/uk/grammar.js',
  'js/languages/uk/examples.js',
  'js/languages/uk/texts.js',
  'js/languages/ja/more.js',
  'js/languages/ja/grammar.js',
  'js/languages/ja/examples.js',
  'js/languages/ja/texts.js',
  'js/languages/ja/readings.js',
  'js/languages/ar/more.js',
  'js/languages/ar/grammar.js',
  'js/languages/ar/examples.js',
  'js/languages/ar/texts.js',
  'js/languages/ar/readings.js',
  'js/languages/common.js',
  'js/languages/uk/index.js',
  'js/languages/uk/phonetics.js',
  'js/languages/uk/sounds.js',
  'js/languages/uk/vocab.js',
  'js/languages/ja/index.js',
  'js/languages/ja/kana.js',
  'js/languages/ja/sounds.js',
  'js/languages/ja/vocab.js',
  'js/languages/ar/index.js',
  'js/languages/ar/translit.js',
  'js/languages/ar/sounds.js',
  'js/languages/ar/vocab.js',
  'js/views/language.js',
  'js/languages/tr/index.js',
  'js/languages/tr/phonetics.js',
  'js/languages/tr/sounds.js',
  'js/languages/tr/vocab.js',
  'js/views/grammar.js',
  'js/views/read.js',
  'js/views/home.js',
  'js/views/journey.js',
  'js/views/known.js',
  'js/views/learn.js',
  'js/views/practice.js',
  'js/views/progress.js',
  'js/views/pronounce.js',
  'js/views/review.js',
  'js/views/settings.js',
  'js/views/sync.js',
  'js/views/welcome.js',
  'js/views/word.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request).then((r) => r || caches.match('index.html'))),
  );
});
