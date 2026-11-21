// Native (Capacitor) code paths of js/native.js and js/speech.js, run against a
// fake bridge that behaves like the Android app's plugins.
import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

const calls = [];
const handlers = { TextToSpeech: {}, SpeechRecognition: {}, App: {} };
const listeners = {};
let platform = 'android';

globalThis.window = {
  Capacitor: {
    isNativePlatform: () => true,
    getPlatform: () => platform,
    PluginHeaders: [{ name: 'TextToSpeech' }, { name: 'SpeechRecognition' }, { name: 'App' }],
    nativePromise: (plugin, method, options) => {
      calls.push({ plugin, method, options });
      const fn = handlers[plugin]?.[method];
      return Promise.resolve().then(() => (fn ? fn(options) : {}));
    },
    addListener: (plugin, eventName, fn) => {
      listeners[`${plugin}.${eventName}`] = fn;
      return { remove() {} };
    },
  },
};
globalThis.document = Object.assign(new EventTarget(), { visibilityState: 'visible' });

const voice = (voiceURI, lang) => ({ voiceURI, name: voiceURI, lang, localService: true, default: false });
const TR = voice('tr-tr-x-cfs-local', 'tr-TR');
const EN = voice('en-us-x-sfg-local', 'en-US');
const AR = voice('ar-xa-x-ard-local', 'ar');

// Android binds its TTS engine in the background: the first request fails
// (the plugin's NullPointerException), later ones work.
let voiceCalls = 0;
let engineVoices = [TR, EN];
handlers.TextToSpeech.getSupportedVoices = () => {
  voiceCalls++;
  if (voiceCalls === 1) throw new Error("Attempt to invoke interface method 'java.util.Iterator java.util.Set.iterator()' on a null object reference");
  return { voices: engineVoices };
};
handlers.SpeechRecognition.available = () => ({ available: true });
handlers.SpeechRecognition.checkPermissions = () => ({ speechRecognition: 'granted' });

mock.timers.enable({ apis: ['setTimeout'] });
const speech = await import('../js/speech.js');
const native = await import('../js/native.js');

/** Let pending promise callbacks run (timers are mocked, setImmediate is not). */
const flush = async () => { for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r)); };
const countCalls = (plugin, method) => calls.filter((c) => c.plugin === plugin && c.method === method).length;

test('voice list: a failed first request is retried instead of reporting "no voice"', async () => {
  let notified = 0;
  speech.onVoicesChanged(() => notified++);
  await flush();
  assert.equal(voiceCalls, 1);
  assert.equal(speech.voicesReady(), false, 'not "ready" (and so no "no voice" banner) while retrying');
  mock.timers.tick(300);
  await flush();
  assert.equal(voiceCalls, 2);
  assert.equal(speech.voicesReady(), true);
  assert.deepEqual(speech.voicesFor('tr-TR').map((v) => v.voiceURI), [TR.voiceURI]);
  assert.ok(notified >= 1, 'listeners hear about the voices');
});

test('voice list: fetched again when the app comes back (e.g. after installing voice data)', async () => {
  engineVoices = [AR, TR, EN];
  let notified = 0;
  const off = speech.onVoicesChanged(() => notified++);
  document.dispatchEvent(new Event('visibilitychange'));
  await flush();
  off();
  assert.deepEqual(speech.voicesFor('ar').map((v) => v.voiceURI), [AR.voiceURI]);
  assert.equal(notified, 1);
});

test('speak() picks the voice index from the engine\'s current list', async () => {
  engineVoices = [TR, EN];
  document.dispatchEvent(new Event('visibilitychange'));
  await flush();
  // The engine's list changes while the app is open (voice data finished downloading).
  engineVoices = [AR, EN, TR];
  const before = calls.length;
  assert.equal(await speech.speak('merhaba', { lang: 'tr-TR', voiceURI: TR.voiceURI }), true);
  const spoke = calls.slice(before).find((c) => c.method === 'speak');
  assert.equal(spoke.options.voice, 2, 'index of the Turkish voice in the fresh list, not the old one');
  assert.equal(spoke.options.lang, 'tr-TR');
});

test('speak() cancelled while the voice list loads stays silent', async () => {
  const before = countCalls('TextToSpeech', 'speak');
  const said = speech.speak('merhaba', { lang: 'tr-TR' });
  speech.cancelSpeech();
  assert.equal(await said, false);
  assert.equal(countCalls('TextToSpeech', 'speak'), before);
});

test('listen(): the safety timer of a failed attempt does not stop the next attempt', async () => {
  // Attempt 1: the recogniser gives up straight away ("No speech input").
  handlers.SpeechRecognition.start = () => { throw new Error('No speech input'); };
  const first = speech.listen({ lang: 'tr-TR', timeout: 8000 });
  assert.deepEqual(await first.result, { ok: false, error: 'no-speech' });

  // Attempt 2, five seconds later, keeps listening until stop() is called.
  mock.timers.tick(5000);
  let finish;
  handlers.SpeechRecognition.start = () => new Promise((resolve) => { finish = resolve; });
  handlers.SpeechRecognition.stop = () => finish?.({ matches: [] });
  const stopsBefore = countCalls('SpeechRecognition', 'stop');
  const second = speech.listen({ lang: 'tr-TR', timeout: 8000 });
  await flush();
  // 8 s after attempt 1 began: its timer must be gone.
  mock.timers.tick(3000);
  await flush();
  assert.equal(countCalls('SpeechRecognition', 'stop'), stopsBefore, 'attempt 2 was not cut off');
  // Attempt 2's own limit still applies.
  mock.timers.tick(5000);
  await flush();
  assert.equal(countCalls('SpeechRecognition', 'stop'), stopsBefore + 1);
  assert.deepEqual(await second.result, { ok: false, error: 'no-speech' });
});

test('listen(): a successful attempt clears its timer too', async () => {
  handlers.SpeechRecognition.start = () => ({ matches: ['merhaba'] });
  const stopsBefore = countCalls('SpeechRecognition', 'stop');
  const res = await speech.listen({ lang: 'tr-TR', timeout: 8000 }).result;
  assert.equal(res.ok, true);
  mock.timers.tick(10000);
  await flush();
  assert.equal(countCalls('SpeechRecognition', 'stop'), stopsBefore);
});

test('backAction: dialog first, exit only from a top-level screen, else back or home', () => {
  const { backAction } = native;
  assert.equal(backAction({ dialogOpen: true, atRoot: true, canGoBack: true }), 'close-dialog');
  assert.equal(backAction({ dialogOpen: true, atRoot: false, canGoBack: false }), 'close-dialog');
  assert.equal(backAction({ dialogOpen: false, atRoot: true, canGoBack: true }), 'exit');
  assert.equal(backAction({ dialogOpen: false, atRoot: true, canGoBack: false }), 'exit');
  assert.equal(backAction({ dialogOpen: false, atRoot: false, canGoBack: true }), 'back');
  assert.equal(backAction({ dialogOpen: false, atRoot: false, canGoBack: false }), 'home');
});

test('onBackButton: subscribes to the App plugin\'s backButton event on Android only', async () => {
  const seen = [];
  platform = 'ios';
  native.onBackButton((e) => seen.push(e));
  await flush();
  assert.equal(listeners['App.backButton'], undefined, 'iOS has no back button');

  platform = 'android';
  native.onBackButton((e) => seen.push(e));
  await flush();
  listeners['App.backButton']({ canGoBack: true });
  assert.deepEqual(seen, [{ canGoBack: true }]);
});

test('leaveApp: moves the app to the background, or closes it if that fails', async () => {
  const before = calls.length;
  native.leaveApp();
  await flush();
  assert.deepEqual(calls.slice(before).map((c) => `${c.plugin}.${c.method}`), ['App.minimizeApp']);

  handlers.App.minimizeApp = () => { throw new Error('not implemented'); };
  const mid = calls.length;
  native.leaveApp();
  await flush();
  assert.deepEqual(calls.slice(mid).map((c) => `${c.plugin}.${c.method}`), ['App.minimizeApp', 'App.exitApp']);
});

test('plugin().addListener rejects for a plugin the app does not have', async () => {
  await assert.rejects(native.plugin('Nope').addListener('x', () => {}), /not available/);
});
