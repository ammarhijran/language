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

if (NATIVE) {
  TTS.getSupportedVoices()
    .then((r) => { nativeVoices = r?.voices || []; })
    .catch(() => {})
    .finally(() => { voicesLoaded = true; notifyVoices(); });
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

export function voicesFor(lang) {
  const p = langPrefix(lang);
  return allVoices()
    .filter((v) => langPrefix(voiceLang(v)) === p)
    .sort((a, b) => Number(b.localService === false) - Number(a.localService === false) || a.name.localeCompare(b.name));
}

function pickVoice(lang, voiceURI) {
  const voices = voicesFor(lang);
  return voices.find((v) => v.voiceURI === voiceURI) || voices.find((v) => voiceLang(v) === lang.toLowerCase()) || voices[0];
}

/** On Android, opens the system screen for installing text-to-speech voice data. */
export const canInstallVoices = () => NATIVE && nativePlatform() === 'android' && hasPlugin('TextToSpeech');
export const installVoices = () => TTS.openInstall().catch(() => {});

export function speak(text, { lang, rate = 0.9, voiceURI } = {}) {
  if (NATIVE) {
    if (!ttsSupported()) return Promise.resolve(false);
    const v = pickVoice(lang, voiceURI);
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

  return new Promise((resolve) => {
    if (!ttsSupported()) return resolve(false);
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    const v = pickVoice(lang, voiceURI);
    if (v) u.voice = v;
    let settled = false;
    const done = (ok) => { if (!settled) { settled = true; resolve(ok); } };
    u.onend = () => done(true);
    u.onerror = () => done(false);
    // Guard against engines that never fire onend.
    setTimeout(() => done(true), 2000 + text.length * 250);
    synth.speak(u);
  });
}

export function cancelSpeech() {
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

function listenNative({ lang, maxAlternatives, timeout }) {
  let stopped = false;
  const result = (async () => {
    try {
      let perm = await STT.checkPermissions();
      if (perm?.speechRecognition !== 'granted') perm = await STT.requestPermissions();
      if (perm?.speechRecognition !== 'granted') return { ok: false, error: 'not-allowed' };
      await TTS.stop().catch(() => {});
      // iOS keeps listening until told to stop, so cap the attempt's length.
      const limit = manualStop() ? Math.min(timeout, 4000) : timeout;
      const timer = setTimeout(() => STT.stop().catch(() => {}), limit);
      const r = await STT.start({ language: lang, maxResults: maxAlternatives, partialResults: false, popup: false });
      clearTimeout(timer);
      const matches = (r?.matches || []).filter(Boolean);
      if (!matches.length) return { ok: false, error: stopped && !manualStop() ? 'aborted' : 'no-speech' };
      return { ok: true, alternatives: matches.map((transcript) => ({ transcript, confidence: null })) };
    } catch (err) {
      return { ok: false, error: nativeError(err) };
    }
  })();
  return { result, stop: () => { stopped = true; STT.stop().catch(() => {}); } };
}

/**
 * Listen for one utterance.
 * Returns { result: Promise<{ok, alternatives?, error?}>, stop() }.
 */
export function listen({ lang, maxAlternatives = 5, timeout = 8000 } = {}) {
  if (NATIVE) {
    if (!nativeRecognition) return { result: Promise.resolve({ ok: false, error: 'unsupported' }), stop() {} };
    return listenNative({ lang, maxAlternatives, timeout });
  }
  if (!Recognition) {
    return { result: Promise.resolve({ ok: false, error: 'unsupported' }), stop() {} };
  }
  cancelSpeech();
  const r = new Recognition();
  r.lang = lang;
  r.interimResults = false;
  r.continuous = false;
  r.maxAlternatives = maxAlternatives;

  let finish;
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
      const res = e.results[0];
      const alternatives = Array.from(res, (a) => ({ transcript: a.transcript, confidence: a.confidence }));
      finish({ ok: true, alternatives });
    };
    r.onerror = (e) => finish({ ok: false, error: e.error || 'unknown' });
    r.onend = () => finish({ ok: false, error: 'no-speech' });
    timer = setTimeout(() => finish({ ok: false, error: 'no-speech' }), timeout);
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
    ? 'Microphone or speech recognition access is off. Turn it on for Lisan in your phone’s Settings.'
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
