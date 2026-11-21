// Progress + settings persistence. Everything stays on-device.
// Browser: localStorage. Android/iOS apps: localStorage plus a mirror in
// native storage (Capacitor Preferences), because the OS may clear WebView
// storage when the device runs low on space.
import { hasPlugin, plugin } from './native.js';

const KEY = 'lisan:v1';
const prefs = hasPlugin('Preferences') ? plugin('Preferences') : null;

const DEFAULTS = {
  lang: 'tr',
  rate: 0.9,
  voiceURI: '',
  lessonSize: 5,
  sessionSize: 25,
  autoplay: true,
};

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return { settings: { ...DEFAULTS, ...s.settings }, progress: s.progress || {} };
    }
  } catch { /* private mode or corrupt data: start fresh */ }
  return { settings: { ...DEFAULTS }, progress: {} };
}

function save() {
  const json = JSON.stringify(state);
  try {
    localStorage.setItem(KEY, json);
  } catch { /* storage full or unavailable */ }
  prefs?.set({ key: KEY, value: json }).catch(() => {});
}

/** In the native apps, restore from native storage if the WebView's copy was lost. */
export async function init() {
  if (!prefs) return;
  try {
    const hasLocal = !!localStorage.getItem(KEY);
    const { value } = await prefs.get({ key: KEY });
    if (!hasLocal && value) {
      localStorage.setItem(KEY, value);
      state = load();
    } else if (hasLocal && !value) {
      save();
    }
  } catch { /* keep whatever we have */ }
}

function prog(lang) {
  if (!state.progress[lang]) state.progress[lang] = { cards: {}, days: {} };
  return state.progress[lang];
}

export const getSettings = () => state.settings;
export function updateSettings(patch) {
  Object.assign(state.settings, patch);
  save();
}

export const getCards = (lang) => prog(lang).cards;
export const getCard = (lang, id) => prog(lang).cards[id];
export function setCard(lang, id, card) {
  prog(lang).cards[id] = card;
  save();
}

export function dayKey(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function logActivity(lang, delta) {
  const days = prog(lang).days;
  const k = dayKey();
  const d = days[k] || (days[k] = { reviews: 0, learned: 0, practiced: 0, correct: 0 });
  for (const [key, v] of Object.entries(delta)) d[key] = (d[key] || 0) + v;
  save();
}

export const getDays = (lang) => prog(lang).days;
export const getDay = (lang, d = new Date()) => prog(lang).days[dayKey(d)];

const isActive = (x) => !!x && (x.reviews || 0) + (x.learned || 0) + (x.practiced || 0) > 0;

/** Consecutive active days ending today (or yesterday, if today has no activity yet). */
export function streak(lang, now = new Date()) {
  const days = prog(lang).days;
  const d = new Date(now);
  if (!isActive(days[dayKey(d)])) d.setDate(d.getDate() - 1);
  let n = 0;
  while (isActive(days[dayKey(d)])) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function exportData() {
  return JSON.stringify({ app: 'lisan', version: 1, exported: new Date().toISOString(), ...state }, null, 2);
}

export function importData(text) {
  const d = JSON.parse(text);
  if (!d || typeof d !== 'object' || typeof d.progress !== 'object') {
    throw new Error('That file is not a Lisan backup.');
  }
  state = { settings: { ...DEFAULTS, ...d.settings }, progress: d.progress };
  save();
}

export function resetProgress(lang) {
  delete state.progress[lang];
  save();
}
