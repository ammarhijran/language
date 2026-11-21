// Browser speech: text-to-speech, speech recognition and voice recording.

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
const Recognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : undefined;

export const ttsSupported = () => !!synth && typeof SpeechSynthesisUtterance !== 'undefined';
export const recognitionSupported = () => !!Recognition;
export const recordingSupported = () => !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);

const langPrefix = (lang) => lang.toLowerCase().split(/[-_]/)[0];
const voiceLang = (v) => (v.lang || '').toLowerCase().replace('_', '-');

let voicesLoaded = false;
const voiceListeners = new Set();
if (synth) {
  const onChange = () => {
    if (synth.getVoices().length) voicesLoaded = true;
    voiceListeners.forEach((fn) => fn());
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

export function voicesFor(lang) {
  if (!synth) return [];
  const p = langPrefix(lang);
  return synth
    .getVoices()
    .filter((v) => langPrefix(voiceLang(v)) === p)
    .sort((a, b) => Number(b.localService === false) - Number(a.localService === false) || a.name.localeCompare(b.name));
}

function pickVoice(lang, voiceURI) {
  const voices = voicesFor(lang);
  return voices.find((v) => v.voiceURI === voiceURI) || voices.find((v) => voiceLang(v) === lang.toLowerCase()) || voices[0];
}

export function speak(text, { lang, rate = 0.9, voiceURI } = {}) {
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
  if (synth) synth.cancel();
}

/**
 * Listen for one utterance.
 * Returns { result: Promise<{ok, alternatives?, error?}>, stop() }.
 */
export function listen({ lang, maxAlternatives = 5, timeout = 8000 } = {}) {
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
  'not-allowed': 'Microphone access is blocked. Allow the microphone for this site in your browser settings.',
  'service-not-allowed': 'Speech recognition is blocked in this browser. Try Chrome, Edge or Safari.',
  'no-speech': 'I didn’t catch that — tap the mic and speak a little louder.',
  'audio-capture': 'No microphone was found.',
  network: 'Speech recognition needs an internet connection.',
  'language-not-supported': 'This browser’s speech recognition doesn’t support this language.',
  unsupported: 'Speech recognition isn’t available in this browser. Try Chrome, Edge or Safari.',
  aborted: 'Stopped.',
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
