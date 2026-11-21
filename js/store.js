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
  dailyGoal: 20, // exercises per day (reviews + new words + practice)
  onboarded: false,
  gameOn: true, // XP, levels, achievements, challenges and celebrations
};

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return { settings: { ...DEFAULTS, ...s.settings }, progress: s.progress || {}, game: s.game || {} };
    }
  } catch { /* private mode or corrupt data: start fresh */ }
  return { settings: { ...DEFAULTS }, progress: {}, game: {} };
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

/**
 * A random id for this installation. Kept outside the synced/exported data on
 * purpose: when progress is merged from another device, each device's XP and
 * counters stay separate and are added up, so nothing is counted twice.
 */
let memDeviceId = null;
export function deviceId() {
  try {
    let id = localStorage.getItem('lisan:device');
    if (!id) {
      id = Math.random().toString(36).slice(2, 10);
      localStorage.setItem('lisan:device', id);
    }
    return id;
  } catch {
    memDeviceId ??= Math.random().toString(36).slice(2, 10);
    return memDeviceId;
  }
}

/** Game state (XP, achievements, challenges…) — owned by game.js. */
export const getGame = () => state.game;
export const persist = () => save();

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
export function deleteCard(lang, id) {
  delete prog(lang).cards[id];
  save();
}

export function dayKey(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Everything that counts toward the daily goal. */
export const dayTotal = (d) => (d?.reviews || 0) + (d?.learned || 0) + (d?.practiced || 0);

export function logActivity(lang, delta) {
  const days = prog(lang).days;
  const k = dayKey();
  const d = days[k] || (days[k] = { reviews: 0, learned: 0, practiced: 0, correct: 0 });
  const before = dayTotal(d);
  for (const [key, v] of Object.entries(delta)) d[key] = (d[key] || 0) + v;
  save();
  const goal = state.settings.dailyGoal;
  if (typeof window !== 'undefined') {
    if (before < goal && dayTotal(d) >= goal) window.dispatchEvent(new CustomEvent('lisan:goal-reached', { detail: { lang } }));
    window.dispatchEvent(new CustomEvent('lisan:activity', { detail: { lang, total: dayTotal(d) } }));
  }
}

/** Mark a missed day as repaired so it keeps the streak alive. */
export function repairDay(lang, key) {
  const days = prog(lang).days;
  days[key] = { ...(days[key] || {}), repaired: true };
  save();
}

export const hasAnyProgress = () =>
  Object.values(state.progress).some((p) => Object.keys(p.cards || {}).length > 0);

export const getDays = (lang) => prog(lang).days;
export const getDay = (lang, d = new Date()) => prog(lang).days[dayKey(d)];

export const isActive = (x) => !!x && (x.repaired || (x.reviews || 0) + (x.learned || 0) + (x.practiced || 0) > 0);

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
  state = { settings: { ...DEFAULTS, ...d.settings }, progress: d.progress, game: d.game || {} };
  save();
}

export function resetProgress(lang) {
  delete state.progress[lang];
  save();
}

/** Everything that sync carries between devices (no settings — those stay per device). */
export const syncData = () => ({ progress: state.progress, game: state.game });

/** Replace progress and game state with a merged version (see sync.js). */
export function applySync({ progress, game }) {
  state.progress = progress;
  state.game = game;
  if (Object.values(progress).some((p) => Object.keys(p.cards || {}).length)) state.settings.onboarded = true;
  save();
}

/** A short, device-only log of syncs (never synced or exported itself). */
export function syncLog(entry) {
  let log = [];
  try { log = JSON.parse(localStorage.getItem('lisan:synclog') || '[]'); } catch { /* ignore */ }
  if (entry) {
    log = [{ ...entry, at: Date.now() }, ...log].slice(0, 10);
    try { localStorage.setItem('lisan:synclog', JSON.stringify(log)); } catch { /* ignore */ }
  }
  return log;
}

/** Tests only: start from a clean in-memory state. */
export function _resetAll() {
  state = { settings: { ...DEFAULTS }, progress: {}, game: {} };
}
