// Progress + settings persistence. Everything stays on-device.
// Browser: localStorage. Android/iOS apps: localStorage plus a mirror in
// native storage (Capacitor Preferences), because the OS may clear WebView
// storage when the device runs low on space.
import { hasPlugin, plugin } from './native.js';
import { sanitize, stamp, DAY_FIELDS } from './sync.js';

const KEY = 'lisan:v1';
const DEVICE_KEY = 'lisan:device';
const LOG_KEY = 'lisan:synclog';
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

// Allowed ranges for numeric settings (the same limits the Settings view uses).
const RANGES = { rate: [0.5, 1.2, false], lessonSize: [3, 15, true], sessionSize: [5, 100, true], dailyGoal: [1, 500, true] };

const isObj = (x) => x != null && typeof x === 'object' && !Array.isArray(x);
const BAD_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

const fresh = () => ({ settings: { ...DEFAULTS }, progress: {}, game: {} });

let memDeviceId = null;
let wiped = false; // set by deleteAllData(): nothing may be written back before the reload
let state = load();

/**
 * Settings checked against DEFAULTS: known keys keep their type (numbers are
 * also read from numeric strings, then clamped), voices stay a map of strings,
 * and other simple values are kept for settings added later.
 */
function cleanSettings(raw) {
  const out = { ...DEFAULTS };
  if (!isObj(raw)) return out;
  for (const [k, v] of Object.entries(raw)) {
    if (BAD_KEYS.has(k)) continue;
    if (Object.hasOwn(DEFAULTS, k)) {
      const def = DEFAULTS[k];
      if (typeof def === 'number') {
        const n = typeof v === 'string' && v.trim() ? Number(v) : v;
        if (typeof n !== 'number' || !Number.isFinite(n)) continue;
        const [min, max, int] = RANGES[k] || [0, Infinity, false];
        out[k] = Math.min(max, Math.max(min, int ? Math.round(n) : n));
      } else if (typeof v === typeof def) out[k] = typeof v === 'string' ? v.slice(0, 500) : v;
    } else if (k === 'voices') {
      if (!isObj(v)) continue;
      out.voices = {};
      for (const [lang, uri] of Object.entries(v)) if (!BAD_KEYS.has(lang) && typeof uri === 'string') out.voices[lang] = uri.slice(0, 500);
    } else if (typeof v === 'boolean' || (typeof v === 'number' && Number.isFinite(v)) || (typeof v === 'string' && v.length <= 500)) {
      out[k] = v;
    }
  }
  return out;
}

/** Checked, current-format state from stored or imported data (old flat day logs are converted, see sync.js). */
function fromData(d) {
  const settings = cleanSettings(d?.settings);
  const { progress, game } = sanitize(d, { device: deviceId(), dailyGoal: settings.dailyGoal });
  return { settings, progress, game };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return fromData(JSON.parse(raw));
  } catch { /* private mode or corrupt data: start fresh */ }
  return fresh();
}

function save() {
  if (wiped) return;
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
 * purpose: when progress is merged from another device, each device's XP,
 * counters and daily tallies stay separate and are added up, so nothing is
 * counted twice.
 */
export function deviceId() {
  try {
    if (wiped) throw new Error('wiped');
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = Math.random().toString(36).slice(2, 10);
      localStorage.setItem(DEVICE_KEY, id);
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
  const goalBefore = state.settings.dailyGoal;
  Object.assign(state.settings, patch);
  save();
  // A new daily goal may already be met today: credit it now (once per day).
  if (state.settings.dailyGoal !== goalBefore) Object.keys(state.progress).forEach(checkGoal);
}

// ---------- Words ----------
// Unmarked/removed words are kept as { deleted, last } tombstones so the
// removal survives a sync (see sync.js). Everything here skips them; the raw
// data, tombstones included, is only handed out by syncData() and exportData().

const live = (c) => !!c && !c.deleted;

/** The learner's cards for a language (no tombstones). */
export function getCards(lang) {
  const out = {};
  for (const [id, c] of Object.entries(prog(lang).cards)) if (live(c)) out[id] = c;
  return out;
}
export function getCard(lang, id) {
  const cards = prog(lang).cards;
  return Object.hasOwn(cards, id) && live(cards[id]) ? cards[id] : undefined;
}
export function setCard(lang, id, card) {
  prog(lang).cards[id] = card;
  save();
}
/** Forget a word (it becomes "new" again). Stamped newer than the card it replaces, so the removal wins a merge. */
export function deleteCard(lang, id) {
  const cards = prog(lang).cards;
  const old = Object.hasOwn(cards, id) ? cards[id] : null;
  cards[id] = { deleted: true, last: Math.max(Date.now(), stamp(old) + 1) };
  save();
}

// ---------- Days ----------
// Each day keeps one tally per device (days[k].dev[deviceId]) so that syncing
// two devices that were both used on the same day adds their work up (tallies
// from before this format share the OLD_DEV slot). Read days only through
// these helpers, which sum the slots.

export function dayKey(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** A day's tallies summed over devices. Also accepts a summed day (top-level fields). */
export function dayCounts(d) {
  const out = { reviews: 0, learned: 0, practiced: 0, correct: 0 };
  const add = (t) => { for (const f of DAY_FIELDS) if (Number.isFinite(t?.[f])) out[f] += t[f]; };
  add(d);
  for (const t of Object.values(d?.dev || {})) add(t);
  return out;
}

/** Everything that counts toward the daily goal. */
export function dayTotal(d) {
  const c = dayCounts(d);
  return c.reviews + c.learned + c.practiced;
}

/** One language's day, summed over devices: { reviews, learned, practiced, correct, repaired, goalMet }. */
export function getDay(lang, d = new Date()) {
  const raw = prog(lang).days[dayKey(d)];
  return { ...dayCounts(raw), repaired: !!raw?.repaired, goalMet: !!raw?.goalMet };
}

/** The raw day logs (per device). For streaks use streak()/isActive(), for numbers getDay(). */
export const getDays = (lang) => prog(lang).days;

export const isActive = (x) => !!x && (!!x.repaired || dayTotal(x) > 0);

/**
 * Today's daily goal counts once per language: the day remembers it was met
 * (merged by sync like "repaired"), so raising the goal later doesn't pay
 * again, and lowering it below today's total still credits today.
 */
function checkGoal(lang) {
  const d = prog(lang).days[dayKey()];
  if (!d || d.goalMet || dayTotal(d) < state.settings.dailyGoal) return;
  d.goalMet = true;
  save();
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('lisan:goal-reached', { detail: { lang } }));
}

export function logActivity(lang, delta) {
  const days = prog(lang).days;
  const d = (days[dayKey()] ||= {});
  const mine = ((d.dev ||= {})[deviceId()] ||= { reviews: 0, learned: 0, practiced: 0, correct: 0 });
  for (const [key, v] of Object.entries(delta)) if (DAY_FIELDS.includes(key)) mine[key] = (mine[key] || 0) + v;
  save();
  checkGoal(lang);
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('lisan:activity', { detail: { lang, total: dayTotal(d) } }));
}

/** Mark a missed day as repaired so it keeps the streak alive. */
export function repairDay(lang, key) {
  const days = prog(lang).days;
  days[key] = { ...(days[key] || {}), repaired: true };
  save();
}

export const hasAnyProgress = () =>
  Object.values(state.progress).some((p) => Object.values(p.cards || {}).some(live));

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

// ---------- Backup, sync and deletion ----------

export function exportData() {
  return JSON.stringify({ app: 'lisan', version: 1, exported: new Date().toISOString(), ...state }, null, 2);
}

/** Replace everything with a backup file's contents, checked and converted like a sync code. */
export function importData(text) {
  let d;
  try { d = JSON.parse(text); } catch { d = null; }
  if (!isObj(d) || !isObj(d.progress)) throw new Error('That file is not a Lisan backup.');
  state = fromData(d);
  save();
}

/**
 * Clear one language's progress. The reset time is kept so that a later sync
 * can't bring back cards and days from before it (see sync.js). Today keeps
 * its "goal met" flag, so resetting can't earn today's daily goal twice.
 */
export function resetProgress(lang) {
  const k = dayKey();
  const met = !!state.progress[lang]?.days?.[k]?.goalMet;
  state.progress[lang] = { cards: {}, days: met ? { [k]: { goalMet: true } } : {}, resetAt: Date.now() };
  save();
}

/**
 * "Delete all my data": every language's progress, game state, settings, the
 * device id and the sync log — in localStorage and in the native mirror.
 * The caller reloads the app afterwards.
 */
export async function deleteAllData() {
  wiped = true;
  state = fresh();
  memDeviceId = null;
  try {
    const keys = [KEY, DEVICE_KEY, LOG_KEY];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith('lisan:') && !keys.includes(k)) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  } catch { /* storage unavailable: nothing stored there */ }
  try { await prefs?.remove({ key: KEY }); } catch { /* not stored natively */ }
}

/** Everything that sync carries between devices, tombstones included (no settings — those stay per device). */
export const syncData = () => ({ progress: state.progress, game: state.game });

/** Replace progress and game state with a merged version (see sync.js). */
export function applySync({ progress, game }) {
  const clean = sanitize({ progress, game }, { device: deviceId() }); // already clean; this is only a safety net
  state.progress = clean.progress;
  state.game = clean.game;
  if (hasAnyProgress()) state.settings.onboarded = true;
  save();
  // Work done on the other device today may complete today's goal here.
  Object.keys(state.progress).forEach(checkGoal);
}

/** A short, device-only log of syncs (never synced or exported itself). */
export function syncLog(entry) {
  let log = [];
  try { log = JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); } catch { /* ignore */ }
  if (!Array.isArray(log)) log = [];
  if (entry && !wiped) {
    log = [{ ...entry, at: Date.now() }, ...log].slice(0, 10);
    try { localStorage.setItem(LOG_KEY, JSON.stringify(log)); } catch { /* ignore */ }
  }
  return log;
}

/** Tests only: start from a clean in-memory state. */
export function _resetAll() {
  wiped = false;
  state = fresh();
}
