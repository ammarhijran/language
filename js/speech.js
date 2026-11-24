// Speech: text-to-speech, speech recognition and voice recording.
//
// In a browser this uses the Web Speech API. In the Android/iOS apps the
// WebView doesn't provide those APIs, so the same functions call native
// plugins instead (@capacitor-community/text-to-speech and
// @capacitor-community/speech-recognition).
import { isNative, nativePlatform, hasPlugin, plugin } from './native.js';

const NATIVE = isNative();
const TTS = plugin('TextToSpeech');
const STT = plugin('SpeechRecognition');

const synth = !NATIVE && typeof window !== 'undefined' ? window.speechSynthesis : undefined;
const Recognition = !NATIVE && typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : undefined;

let nativeVoices = [];
let nativeRecognition = NATIVE && hasPlugin('SpeechRecognition');

export const ttsSupported = () =>
  NATIVE ? hasPlugin('TextToSpeech') : !!synth && typeof SpeechSynthesisUtterance !== 'undefined';
export const recognitionSupported = () => (NATIVE ? nativeRecognition : !!Recognition);
export const recordingSupported = () =>
  typeof navigator !== 'undefined' && !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);

const langPrefix = (lang) => lang.toLowerCase().split(/[-_]/)[0];
const voiceLang = (v) => (v.lang || '').toLowerCase().replace('_', '-');

let voicesLoaded = false;
const voiceListeners = new Set();
const notifyVoices = () => voiceListeners.forEach((fn) => fn());

// Native voice list. Android connects to its text-to-speech engine in the
// background, so a request made at start-up can fail or come back empty:
// retry with backoff before reporting "no voice". The list is fetched again
// whenever the app comes back to the foreground, e.g. after the learner
// installed voice data from the banner or the system settings.
const VOICE_RETRY_MS = [300, 700, 1500, 3000];
const VOICE_LOOKUP_MS = 1500; // longest a word waits for the fresh list before speaking
const sameVoices = (a, b) => a.length === b.length && a.every((v, i) => v.voiceURI === b[i].voiceURI);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let voiceFetch = null;
let voiceLoad = null;

// Android names every voice of a locale the same (“Turkish Turkey”), so the
// voice picker showed identical rows: add the voice's own code from its id
// (tr-tr-x-cfs-network → “Turkish Turkey · cfs”).
const ANDROID_VOICE = /^[a-z]{2,3}-[a-z0-9]{2,3}-x-([a-z0-9]+)-(local|network)$/i;
const labelled = (v) => {
  const m = ANDROID_VOICE.exec(v.voiceURI || '');
  return m && !v.name.includes(m[1]) ? { ...v, name: `${v.name} · ${m[1]}` } : v;
};

/** One request for the engine's current voices. Resolves to the list, or null if it failed. */
function fetchNativeVoices() {
  voiceFetch ??= TTS.getSupportedVoices()
    .then((r) => (Array.isArray(r?.voices) ? r.voices.map(labelled) : []), () => null)
    .then((voices) => {
      voiceFetch = null;
      if (voices && !sameVoices(voices, nativeVoices)) {
        nativeVoices = voices;
        if (voicesLoaded) notifyVoices();
      }
      return voices;
    });
  return voiceFetch;
}

/** Fetch the voice list, retrying while the engine is still starting up. */
function refreshVoices() {
  voiceLoad ??= (async () => {
    for (let attempt = 0; ; attempt++) {
      const voices = await fetchNativeVoices();
      if (voices?.length || attempt >= VOICE_RETRY_MS.length) break;
      await sleep(VOICE_RETRY_MS[attempt]);
    }
    voiceLoad = null;
    if (!voicesLoaded) { voicesLoaded = true; notifyVoices(); }
  })();
  return voiceLoad;
}

if (NATIVE) {
  refreshVoices();
  if (typeof document !== 'undefined') {
    const onForeground = () => { if (document.visibilityState !== 'hidden') refreshVoices(); };
    document.addEventListener('visibilitychange', onForeground);
    document.addEventListener('resume', onForeground); // Capacitor's "app came back" event
  }
  if (nativeRecognition) {
    STT.available().then((r) => { nativeRecognition = !!r?.available; notifyVoices(); }).catch(() => {});
  }
} else if (synth) {
  const onChange = () => {
    if (synth.getVoices().length) voicesLoaded = true;
    notifyVoices();
  };
  synth.addEventListener?.('voiceschanged', onChange);
  // Some browsers never fire the event; poll briefly.
  let tries = 0;
  const poll = setInterval(() => {
    tries++;
    if (synth.getVoices().length || tries > 10) {
      clearInterval(poll);
      voicesLoaded = true;
      onChange();
    }
  }, 250);
}

export const voicesReady = () => voicesLoaded;

export function onVoicesChanged(fn) {
  voiceListeners.add(fn);
  return () => voiceListeners.delete(fn);
}

const allVoices = () => (NATIVE ? nativeVoices : synth ? synth.getVoices() : []);

// ---------- Choosing a voice ----------

// Apple's Eloquence voices (Eddy, Flo, Grandma…) and novelty voices are
// robotic or comic: Safari lists them first for Japanese, Turkish… because
// every Apple voice is local and the names sort first.
const NOVELTY_URI = /com\.apple\.(eloquence|speech\.synthesis\.voice)/i;
const NOVELTY_NAME = /^(Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley)(\s|$)/;
// eSpeak (Linux speech-dispatcher) is understandable but far from natural.
const BASIC = /espeak|speechd|speech-dispatcher/i;

/** Online voices (Edge "Online (Natural)", Chrome's Google voices, Android "-network") need the internet. */
export const isOnlineVoice = (v) => v.localService === false || /-network$/i.test(v.voiceURI || '');

/** 'premium' | 'enhanced' | 'standard' | 'basic' | 'novelty': how good a voice is likely to sound. */
export function voiceQuality(v) {
  const id = `${v.name || ''} ${v.voiceURI || ''}`;
  if (NOVELTY_URI.test(v.voiceURI || '') || NOVELTY_NAME.test(v.name || '')) return 'novelty';
  if (BASIC.test(id)) return 'basic';
  if (/premium/i.test(id)) return 'premium';
  if (/enhanced|neural|natural|wavenet/i.test(id)) return 'enhanced';
  return 'standard';
}

const QUALITY_SCORE = { premium: 40, enhanced: 30, standard: 0, basic: -30, novelty: -100 };

/**
 * How well a voice suits `regions` (locales, most wanted first): quality,
 * online voices only while online (and natively, local voices first: they
 * don't fail without a connection), then a matching region.
 */
export function rankVoice(v, { regions = [], online = true, native = false } = {}) {
  let score = QUALITY_SCORE[voiceQuality(v)];
  if (isOnlineVoice(v)) score += !online ? -50 : native ? -5 : 20;
  const at = regions.findIndex((r) => r.toLowerCase().replace('_', '-') === voiceLang(v));
  if (at === 0) score += 10;
  else if (at > 0) score += 5;
  if (v.default) score += 1;
  return score;
}

const isOnline = () => typeof navigator === 'undefined' || navigator.onLine !== false;

/** Voices for a language (any region), best first. `regions` defaults to `lang` itself. */
export function voicesFor(lang, { regions = [lang] } = {}) {
  const p = langPrefix(lang);
  const opts = { regions, online: isOnline(), native: NATIVE };
  return allVoices()
    .filter((v) => langPrefix(voiceLang(v)) === p)
    .map((v) => ({ v, score: rankVoice(v, opts) }))
    .sort((a, b) => b.score - a.score || a.v.name.localeCompare(b.v.name))
    .map(({ v }) => v);
}

/** True when a voice for exactly this locale (e.g. ar-EG, not just any Arabic voice) is installed. */
export const hasRegionVoice = (lang) => allVoices().some((v) => voiceLang(v) === lang.toLowerCase());

/**
 * Can this device speak `lang` at all? false: the voices are known and none
 * is for this language. null: not known yet (the voices are still loading).
 */
export function canSpeak(lang) {
  if (!ttsSupported()) return false;
  if (!voicesLoaded) return null;
  return voicesFor(lang).length > 0;
}

/**
 * The learner's chosen voice when it is for this language, else the best one
 * (null: none for the language). `strict`: only voices for exactly `lang`'s
 * region (Egyptian text, not the learner's Saudi voice).
 */
function pickVoice(lang, voiceURI, regions, strict = false) {
  let voices = voicesFor(lang, { regions });
  if (strict) voices = voices.filter((v) => voiceLang(v) === lang.toLowerCase());
  return voices.find((v) => v.voiceURI === voiceURI) || voices[0] || null;
}

/** On Android, opens the system screen for installing text-to-speech voice data. */
export const canInstallVoices = () => NATIVE && nativePlatform() === 'android' && hasPlugin('TextToSpeech');
export const installVoices = () => TTS.openInstall().catch(() => {});

// Bumped by cancelSpeech(), so a native speak() still waiting for the voice
// list doesn't start talking after the learner has moved on.
let speechGen = 0;

async function speakNative(text, { lang, rate, voiceURI, regions, strict }) {
  if (!ttsSupported()) return false;
  const gen = speechGen;
  // The plugin picks the voice by its index in the engine's *current* list,
  // which changes when voice data is installed or removed. Look the voice up
  // in a fresh copy so the index can't point at a voice for another language.
  // (If the request fails or doesn't answer quickly, the last list we got is
  // the best guess: a stuck request must never silence every word.)
  await Promise.race([fetchNativeVoices(), sleep(VOICE_LOOKUP_MS)]);
  if (gen !== speechGen) return false;
  const v = pickVoice(lang, voiceURI, regions, strict);
  if (!v) {
    // No voice for this language. Android ignores a failed setLanguage() and
    // keeps its last voice (Ukrainian read by the Turkish voice), so stay
    // silent unless the engine lists no voices at all and says it can.
    if (nativeVoices.length) return false;
    const supported = await TTS.isLanguageSupported({ lang }).then((r) => !!r?.supported, () => false);
    if (!supported || gen !== speechGen) return false;
  }
  const index = v ? nativeVoices.indexOf(v) : -1;
  return TTS.speak({
    text,
    lang,
    rate,
    // "playback" so audio is heard even with the iPhone's silent switch on.
    category: 'playback',
    queueStrategy: 0,
    ...(index >= 0 ? { voice: index } : {}),
  }).then(() => true, () => false);
}

/** Resolves once the browser has listed its voices, or after `ms`. */
function voicesSettled(ms) {
  if (voicesLoaded) return Promise.resolve();
  return new Promise((resolve) => {
    const off = onVoicesChanged(() => { if (voicesLoaded) { off(); resolve(); } });
    setTimeout(() => { off(); resolve(); }, ms);
  });
}

/** One utterance in the browser. Resolves false on an error (not when cancelled). */
function utter(text, { lang, rate, voice }, onFail) {
  return new Promise((resolve) => {
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice?.lang || lang;
    u.rate = rate;
    if (voice) u.voice = voice;
    let settled = false;
    const done = (ok) => { if (!settled) { settled = true; resolve(ok); } };
    u.onend = () => done(true);
    u.onerror = (e) => {
      if (settled) return;
      // An online voice that fails (offline, server error) gets one retry with a local voice.
      if (!/interrupted|canceled/.test(e?.error || '') && onFail) { settled = true; resolve(onFail()); } else done(false);
    };
    // Guard against engines that never fire onend.
    setTimeout(() => done(true), 2000 + text.length * 250);
    synth.speak(u);
  });
}

function speakWeb(text, { lang, rate, voiceURI, regions, strict }, gen) {
  if (gen !== speechGen) return Promise.resolve(false);
  const voice = pickVoice(lang, voiceURI, regions, strict);
  // Never read a language with another language's voice (the default English
  // or Russian voice reading Ukrainian): no voice, no audio.
  if (!voice && voicesLoaded) return Promise.resolve(false);
  const local = () => voicesFor(lang, { regions }).find((v) => !isOnlineVoice(v));
  const retry = voice && isOnlineVoice(voice) && local()
    ? () => (gen === speechGen ? utter(text, { lang, rate, voice: local() }) : false)
    : null;
  return utter(text, { lang, rate, voice }, retry);
}

/**
 * Speak `text` with a voice for `lang` (the learner's `voiceURI` if it is one,
 * else the best voice, preferring `regions`). Resolves false, without a
 * sound, when the device has no voice for the language.
 */
export function speak(text, { lang, rate = 0.9, voiceURI, regions = [lang], strict = false } = {}) {
  const opts = { lang, rate, voiceURI, regions, strict };
  if (NATIVE) return speakNative(text, opts);
  if (!ttsSupported()) return Promise.resolve(false);
  const gen = speechGen;
  // Speak in the same tick when the voices are known: iOS Safari only allows
  // speech that starts inside the tap that asked for it.
  if (voicesLoaded) return speakWeb(text, opts, gen);
  return voicesSettled(VOICE_LOOKUP_MS).then(() => speakWeb(text, opts, gen));
}

// ---------- Speaking a language pack's entries ----------

/** Slow playback of one word: a lower rate, but not so low that the voice distorts. */
export const slowRate = (rate) => Math.max(0.5, rate * 0.75);
/** Slow playback of a phrase: pauses between the words do the slowing, the voice stays natural. */
export const phraseRate = (rate) => Math.max(0.5, rate * 0.9);

const NO_VOICE_TOAST_MS = 8000;
let lastNoVoiceToast = 0;

/**
 * A short toast for a tap that found no voice (the banners on the word page,
 * Settings and Pronunciation hold the platform's how-to, pack.voiceHelp).
 */
export const noVoiceMessage = (pack) => `No ${pack.name} voice on this device — see Settings to add one.`;

/**
 * Speak an entry ({ tr, … }), a string or a resolved { text, lang } through
 * the pack: pack.speech() decides what the voice reads and in which locale.
 * A regional form (Egyptian Arabic) is read by a voice from that region, or
 * as the pack's `alt` by another voice of the language. `slow` uses the
 * pause-chunked text for phrases and a floor on the rate for single words.
 * `onNoVoice(message)` hears about a missing voice (at most every few seconds).
 */
export function sayFor(pack, target, { slow = false, rate = 0.9, voices = {}, onNoVoice } = {}) {
  const sp = pack.speech(target);
  let v = sp;
  const go = () => {
    // A regional form with an alternative needs a voice from its region.
    v = sp.alt && !hasRegionVoice(sp.lang) ? sp.alt : sp;
    // Pauses only where the text already had them change nothing: slow the voice down instead.
    const phrase = slow && v.slow && v.slow !== v.text ? v.slow : null;
    return speak(phrase || v.text, {
      lang: v.lang,
      rate: !slow ? rate : phrase ? phraseRate(rate) : slowRate(rate),
      voiceURI: voices?.[v.lang] ?? voices?.[pack.code] ?? '',
      regions: v.regions || [v.lang],
      strict: v !== sp.alt && !!sp.alt,
    });
  };
  // Which voice reads it depends on the voices, so wait for the list (web) first.
  const gen = speechGen;
  const said = voicesLoaded || NATIVE || !ttsSupported() ? go()
    : voicesSettled(VOICE_LOOKUP_MS).then(() => (gen === speechGen ? go() : false));
  if (onNoVoice) {
    said.then((ok) => {
      if (ok || canSpeak(v.lang) !== false || Date.now() - lastNoVoiceToast < NO_VOICE_TOAST_MS) return;
      lastNoVoiceToast = Date.now();
      onNoVoice(noVoiceMessage(pack));
    });
  }
  return said;
}

export function cancelSpeech() {
  speechGen++;
  if (NATIVE) TTS.stop().catch(() => {});
  else if (synth) synth.cancel();
}

/** True when the learner has to tap again to finish (iOS doesn't detect the end of speech). */
export const manualStop = () => NATIVE && nativePlatform() === 'ios';

function nativeError(err) {
  const msg = String(err?.message || err || '').toLowerCase();
  if (/permission|denied|not authori[sz]ed|insufficient/.test(msg)) return 'not-allowed';
  if (/no match|no speech|didn.?t|1110|timeout|speech timeout/.test(msg)) return 'no-speech';
  if (/network|server|connection/.test(msg)) return 'network';
  if (/already in use|busy|ongoing/.test(msg)) return 'busy';
  if (/language/.test(msg)) return 'language-not-supported';
  return 'unknown';
}

function listenNative({ lang, maxAlternatives, timeout, long }) {
  let stopped = false;
  let timer;
  const result = (async () => {
    try {
      let perm = await STT.checkPermissions();
      if (perm?.speechRecognition !== 'granted') perm = await STT.requestPermissions();
      if (perm?.speechRecognition !== 'granted') return { ok: false, error: 'not-allowed' };
      speechGen++; // a word still waiting to be spoken mustn't play over the recording
      await TTS.stop().catch(() => {});
      // iOS keeps listening until told to stop, so cap the attempt's length
      // (a long line asked for with maxMs gets all of it).
      const limit = manualStop() && !long ? Math.min(timeout, 4000) : timeout;
      timer = setTimeout(() => STT.stop().catch(() => {}), limit);
      const r = await STT.start({ language: lang, maxResults: maxAlternatives, partialResults: false, popup: false });
      const matches = (r?.matches || []).filter(Boolean);
      if (!matches.length) return { ok: false, error: stopped && !manualStop() ? 'aborted' : 'no-speech' };
      return { ok: true, alternatives: matches.map((transcript) => ({ transcript, confidence: null })) };
    } catch (err) {
      return { ok: false, error: nativeError(err) };
    } finally {
      // Also when start() fails (e.g. "no speech" after a silence): a timer
      // left running would stop the learner's next attempt part-way through.
      clearTimeout(timer);
    }
  })();
  return { result, stop: () => { stopped = true; STT.stop().catch(() => {}); } };
}

/** The alternatives of several recognised segments joined: the k-th of each, or its best. */
function joinSegments(all, max) {
  const best = (s) => s[0].transcript.trim();
  // Chrome on Android repeats the earlier segments in each new one (“bugün”,
  // “bugün hava”): a segment the next one starts with is dropped.
  const heard = all.filter((s) => s?.length);
  const repeats = (next, s) => next && (best(next) === best(s) || best(next).startsWith(`${best(s)} `));
  const segments = heard.filter((s, i) => !repeats(heard[i + 1], s));
  const n = Math.min(max, Math.max(...segments.map((s) => s.length)));
  return Array.from({ length: n }, (_, k) => ({
    transcript: segments.map((s) => (s[k] || s[0]).transcript.trim()).join(' '),
    confidence: Math.min(...segments.map((s) => (s[k] || s[0]).confidence ?? 1)),
  }));
}

/**
 * Listen for one utterance.
 * `maxMs` lets the learner speak for longer than the default 8 s (a whole
 * line or a short speech): the browser then keeps listening through pauses
 * and the segments it heard are joined.
 * Returns { result: Promise<{ok, alternatives?, error?}>, stop() }.
 */
export function listen({ lang, maxAlternatives = 5, timeout = 8000, maxMs } = {}) {
  const long = maxMs != null;
  const limit = long ? maxMs : timeout;
  if (NATIVE) {
    if (!nativeRecognition) return { result: Promise.resolve({ ok: false, error: 'unsupported' }), stop() {} };
    return listenNative({ lang, maxAlternatives, timeout: limit, long });
  }
  if (!Recognition) {
    return { result: Promise.resolve({ ok: false, error: 'unsupported' }), stop() {} };
  }
  cancelSpeech();
  const r = new Recognition();
  r.lang = lang;
  r.interimResults = false;
  r.continuous = long;
  r.maxAlternatives = maxAlternatives;

  let finish;
  const segments = [];
  const heard = () => (segments.some((s) => s?.length) ? { ok: true, alternatives: joinSegments(segments, maxAlternatives) } : null);
  const result = new Promise((resolve) => {
    let settled = false;
    let timer;
    finish = (res) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try { r.abort(); } catch { /* already stopped */ }
      resolve(res);
    };
    r.onresult = (e) => {
      if (!long) {
        const res = e.results[0];
        finish({ ok: true, alternatives: Array.from(res, (a) => ({ transcript: a.transcript, confidence: a.confidence })) });
        return;
      }
      for (let i = e.resultIndex ?? 0; i < e.results.length; i++) {
        if (e.results[i].isFinal !== false) segments[i] = Array.from(e.results[i], (a) => ({ transcript: a.transcript, confidence: a.confidence }));
      }
    };
    r.onerror = (e) => finish(heard() || { ok: false, error: e.error || 'unknown' });
    r.onend = () => finish(heard() || { ok: false, error: 'no-speech' });
    // A long attempt is stopped (not aborted) at its limit, so what was said so far still counts.
    timer = setTimeout(() => {
      if (!long) { finish({ ok: false, error: 'no-speech' }); return; }
      try { r.stop(); } catch { /* ignore */ }
      timer = setTimeout(() => finish(heard() || { ok: false, error: 'no-speech' }), 1500);
    }, limit);
    try {
      r.start();
    } catch (err) {
      finish({ ok: false, error: err?.name === 'NotAllowedError' ? 'not-allowed' : 'unknown' });
    }
  });

  return { result, stop: () => { try { r.stop(); } catch { /* ignore */ } } };
}

export const RECOGNITION_ERRORS = {
  'not-allowed': NATIVE
    ? 'Microphone or speech recognition access is off. Turn it on for Four Tongues in your phone’s Settings.'
    : 'Microphone access is blocked. Allow the microphone for this site in your browser settings.',
  'service-not-allowed': 'Speech recognition is blocked in this browser. Try Chrome, Edge or Safari.',
  'no-speech': 'I didn’t catch that — tap the mic and speak a little louder.',
  'audio-capture': 'No microphone was found.',
  network: 'Speech recognition needs an internet connection.',
  busy: 'The microphone is busy — wait a moment and try again.',
  'language-not-supported': 'Speech recognition on this device doesn’t support this language.',
  unsupported: NATIVE
    ? 'Speech recognition isn’t available on this device.'
    : 'Speech recognition isn’t available in this browser. Try Chrome, Edge or Safari.',
  aborted: 'Stopped.',
  unknown: 'Something went wrong with speech recognition. Please try again.',
};

/** Start recording the microphone. Returns { stop(): Promise<string objectURL> }. */
export async function startRecording({ maxMs = 5000 } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const rec = new MediaRecorder(stream);
  const chunks = [];
  rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  const stopped = new Promise((resolve) => {
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      resolve(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' })));
    };
  });
  rec.start();
  const timer = setTimeout(() => rec.state !== 'inactive' && rec.stop(), maxMs);
  return {
    stopped,
    stop() {
      clearTimeout(timer);
      if (rec.state !== 'inactive') rec.stop();
      return stopped;
    },
  };
}
