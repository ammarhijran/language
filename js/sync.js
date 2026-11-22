// Device-to-device sync without a server.
//
// Progress is packed into a "sync code" (or a file containing the same code)
// that the learner moves between their own devices themselves — clipboard,
// AirDrop / Nearby Share, a note to self, their own cloud drive. Lisan never
// uploads anything. With a passphrase (at least 8 characters), the code is
// end-to-end encrypted (PBKDF2-SHA-256 → AES-GCM-256), so whatever carries it
// only sees ciphertext.
//
// Code format: LISAN1.<flags>.<base64url data>. Flags: z = deflate-raw
// compressed, e = encrypted, k = the key was derived with 600 000 PBKDF2
// iterations. Codes from older builds have "e" without "k" (210 000 iterations,
// and any passphrase length); they still decode.
//
// Everything that arrives from outside — a sync code, a backup file via
// store.importData, and the saved data when the app starts — goes through
// sanitize() first: only finite, non-negative numbers survive (XP and counters
// are clamped), cards, days, goals and weeks must have the right shape, unsafe
// keys are dropped, and data in older formats (flat day tallies, top-level XP)
// is converted. Inflated codes are capped at 16 MB.
//
// Receiving a code *merges* it with this device's progress instead of
// overwriting it, so syncing in either order, or repeatedly, is safe:
//  - words: the card with the newest stamp wins (its last review, or when it
//    was marked or unmarked). Unmarking a word leaves a {deleted, last}
//    tombstone, so the removal travels too.
//  - "Reset progress" clears one language on this device only and stamps it
//    (resetAt): cards older than that and daily logs from before that day are
//    left out when codes from other devices are merged here, so a sync can't
//    undo the reset. The other devices keep their own progress.
//  - daily logs: kept per device (days[k].dev[deviceId]) and added up when
//    read; a merge takes the larger count per device, per field. The day's
//    "repaired" and "goalMet" flags are kept if either side has them. Older
//    builds kept one flat tally per day and merged it with max(), so after a
//    sync two devices hold copies of the same numbers: those tallies share one
//    slot (OLD_DEV) that is still merged with max(), never added up twice.
//  - XP & counters: kept per device and added up (each device's own numbers
//    only grow, so taking the larger value per device never double-counts)
//  - personal goals: the most recently set one (removing a goal stores a
//    {removed, set} tombstone). For the same goal, the copy completed first
//    wins, so a goal another device already finished is not paid again.
//  - achievements, alphabet letters, well-spoken words, challenge completions:
//    union
//  - grammar lessons and Read & Listen texts: the best score per lesson / text
// Older builds read the codes of this one only partly (they don't know
// tombstones or per-device day logs), so every device should be updated.

export const PREFIX = 'LISAN1';
const ITERATIONS = 600000; // OWASP's figure for PBKDF2-HMAC-SHA-256 (flag "k")
const OLD_ITERATIONS = 210000; // encrypted codes made before the "k" flag
export const MIN_PASSPHRASE = 8;
const CODE_RE = /LISAN1\.([a-z-]+)\.([A-Za-z0-9_-]+)/;
const MAX_CODE = 4_000_000; // base64 characters (~3 MB): far above any real code
const MAX_JSON = 16 * 1024 * 1024; // bytes once inflated: stops "zip bombs"

export class SyncError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

/** Long enough to be worth encrypting with (counted in characters, not bytes). */
export const passphraseOk = (p) => [...String(p || '').trim()].length >= MIN_PASSPHRASE;

// ---------- bytes <-> base64url ----------

function toB64url(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function fromB64url(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  return Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
}

/** Run bytes through a (de)compression stream, giving up once the output passes `limit`. */
async function pipe(bytes, stream, limit = Infinity) {
  const reader = new Blob([bytes]).stream().pipeThrough(stream).getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > limit) {
      reader.cancel().catch(() => {});
      throw new SyncError('too-big', 'This sync code is far too large to be Lisan progress.');
    }
    chunks.push(value);
  }
  const out = new Uint8Array(size);
  let at = 0;
  for (const c of chunks) { out.set(c, at); at += c.length; }
  return out;
}
const canCompress = () => typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

async function keyFrom(passphrase, salt, iterations) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase.normalize('NFKC')), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'],
  );
}

// ---------- encode / decode ----------

/**
 * Pack a payload into a sync code.
 * @param {object} payload  { device, at, progress, game }
 * @param {{ passphrase?: string }} [opts]  a passphrase must have MIN_PASSPHRASE+ characters
 */
export async function encode(payload, { passphrase = '' } = {}) {
  if (passphrase && !passphraseOk(passphrase)) {
    throw new SyncError('weak-passphrase', `Use a passphrase of at least ${MIN_PASSPHRASE} characters.`);
  }
  let bytes = new TextEncoder().encode(JSON.stringify({ app: 'lisan', v: 1, ...payload }));
  let flags = '';
  if (canCompress()) {
    bytes = await pipe(bytes, new CompressionStream('deflate-raw'));
    flags += 'z';
  }
  if (passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await keyFrom(passphrase, salt, ITERATIONS);
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
    bytes = new Uint8Array(salt.length + iv.length + ct.length);
    bytes.set(salt, 0);
    bytes.set(iv, salt.length);
    bytes.set(ct, salt.length + iv.length);
    flags += 'ek';
  }
  return `${PREFIX}.${flags || '-'}.${toB64url(bytes)}`;
}

/** Find a sync code inside pasted text (chat apps may add line breaks or extra words). */
export function extractCode(text) {
  const m = String(text || '').replace(/\s+/g, '').match(CODE_RE);
  return m ? { flags: m[1], data: m[2] } : null;
}

export const isEncrypted = (text) => !!extractCode(text)?.flags.includes('e');

/** Read a sync code. The result is sanitized: { app, device, at, progress, game }. */
export async function decode(text, { passphrase = '' } = {}) {
  const found = extractCode(text);
  if (!found) throw new SyncError('invalid', 'That doesn’t look like a Lisan sync code.');
  if (found.data.length > MAX_CODE) throw new SyncError('too-big', 'This sync code is far too large to be Lisan progress.');
  let bytes;
  try { bytes = fromB64url(found.data); } catch { throw new SyncError('invalid', 'The sync code is incomplete or damaged.'); }
  if (found.flags.includes('e')) {
    if (!passphrase) throw new SyncError('needs-passphrase', 'This sync code is protected — enter its passphrase.');
    try {
      const key = await keyFrom(passphrase, bytes.subarray(0, 16), found.flags.includes('k') ? ITERATIONS : OLD_ITERATIONS);
      bytes = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.subarray(16, 28) }, key, bytes.subarray(28)));
    } catch {
      throw new SyncError('wrong-passphrase', 'Wrong passphrase (or the code was cut off).');
    }
  }
  if (found.flags.includes('z')) {
    if (!canCompress()) throw new SyncError('unsupported', 'This device can’t read compressed sync codes — update your browser or system.');
    try {
      bytes = await pipe(bytes, new DecompressionStream('deflate-raw'), MAX_JSON);
    } catch (e) {
      if (e instanceof SyncError) throw e;
      throw new SyncError('invalid', 'The sync code is incomplete or damaged.');
    }
  }
  if (bytes.length > MAX_JSON) throw new SyncError('too-big', 'This sync code is far too large to be Lisan progress.');
  let payload;
  try { payload = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new SyncError('invalid', 'The sync code is incomplete or damaged.'); }
  if (!isObj(payload) || payload.app !== 'lisan' || !isObj(payload.progress)) throw new SyncError('invalid', 'That isn’t Lisan progress.');
  const device = okKey(payload.device) ? payload.device : 'other';
  return { app: 'lisan', device, at: num(payload.at, MAX_TIME) ?? null, ...sanitize(payload, { device }) };
}

// ---------- sanitizing ----------

const MAX_XP = 1e9;
const MAX_COUNT = 1e7;
const MAX_TIME = 8.64e15; // the largest valid Date
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const LANG_RE = /^[a-z]{2,3}$/;
const ID_RE = /^[a-z0-9][a-z0-9-]{0,39}$/; // achievement and challenge ids
const BAD_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
export const DAY_FIELDS = ['reviews', 'learned', 'practiced', 'correct'];
/** The day-log slot for tallies from builds before per-device logs (device ids never contain "_"). */
export const OLD_DEV = '_old';

const isObj = (x) => x != null && typeof x === 'object' && !Array.isArray(x);
/** Keys that are safe to use as property names in plain objects. */
const okKey = (k) => typeof k === 'string' && k.length > 0 && k.length <= 200 && !BAD_KEYS.has(k);
/** A finite number in [0, max], or undefined. */
const num = (x, max = MAX_COUNT) => (typeof x === 'number' && Number.isFinite(x) && x >= 0 ? Math.min(x, max) : undefined);
/** Own [key, value] pairs with safe keys, at most `max` of them. */
const pairs = (o, max = 50000) => (isObj(o) ? Object.entries(o).filter(([k]) => okKey(k)).slice(0, max) : []);
/** A list of short, unique strings. */
const strList = (a, max = 50000, test = (s) => s.length <= 200) =>
  (Array.isArray(a) ? [...new Set(a.filter((s) => typeof s === 'string' && s && test(s)))].slice(0, max) : []);

function numMap(o, max = MAX_COUNT) {
  const out = {};
  for (const [k, v] of pairs(o, 1000)) { const n = num(v, max); if (n !== undefined) out[k] = n; }
  return out;
}

/** A word's card: finite scheduling fields, or a {deleted, last} tombstone. Anything else is dropped. */
function sanitizeCard(c) {
  if (!isObj(c)) return null;
  if (c.deleted === true) {
    const last = num(c.last, MAX_TIME);
    return last === undefined ? null : { deleted: true, last };
  }
  const ease = num(c.ease, 10);
  const interval = num(c.interval, 36500);
  const reps = num(c.reps);
  const due = num(c.due, MAX_TIME);
  if (ease === undefined || interval === undefined || reps === undefined || due === undefined) return null;
  const out = { ...extraFields(c), ease, interval, reps, lapses: num(c.lapses) ?? 0, due };
  const added = num(c.added, MAX_TIME);
  if (added !== undefined) out.added = added;
  const last = num(c.last, MAX_TIME);
  out.last = last ?? null;
  if (typeof c.known === 'boolean') out.known = c.known;
  return out;
}

/** Card fields this build doesn't know about yet: kept if they are simple values. */
function extraFields(c) {
  const out = {};
  for (const [k, v] of pairs(c, 30)) {
    if (['ease', 'interval', 'reps', 'lapses', 'due', 'added', 'last', 'known', 'deleted'].includes(k)) continue;
    if (typeof v === 'boolean' || (typeof v === 'string' && v.length <= 100)) out[k] = v;
    else if (num(v, MAX_TIME) !== undefined) out[k] = num(v, MAX_TIME);
  }
  return out;
}

/** One device's tallies for a day, or null when it has none. */
function tally(t) {
  const out = {};
  for (const f of DAY_FIELDS) { const n = num(t?.[f], 1e6); if (n !== undefined) out[f] = n; }
  return Object.keys(out).length ? out : null;
}

const maxTally = (a, b) => {
  if (!a) return { ...b };
  const out = { ...a };
  for (const f of DAY_FIELDS) if (b[f] !== undefined) out[f] = Math.max(out[f] || 0, b[f]);
  return out;
};

const tallyTotal = (t) => (t.reviews || 0) + (t.learned || 0) + (t.practiced || 0);

/**
 * A day log: { dev: { deviceId: tallies }, repaired?, goalMet? }. Days from
 * older builds have the tallies at the top level. Those builds merged them
 * with max(), so they may already include another device's work: they go into
 * the shared OLD_DEV slot (see the top of this file). Those builds also paid
 * the daily goal without recording it, so `legacyGoalMet` says whether that
 * already happened.
 */
function sanitizeDay(d, legacyGoalMet) {
  if (!isObj(d)) return null;
  const dev = {};
  for (const [id, t] of pairs(d.dev, 200)) { const s = tally(t); if (s) dev[id] = s; }
  const flat = tally(d);
  const out = {};
  if (flat) dev[OLD_DEV] = maxTally(dev[OLD_DEV], flat);
  if (Object.keys(dev).length) out.dev = dev;
  if (d.repaired === true) out.repaired = true;
  if (d.goalMet === true || (flat && legacyGoalMet(tallyTotal(flat)))) out.goalMet = true;
  return Object.keys(out).length ? out : null;
}

function sanitizeProgress(progress, legacyGoalMet) {
  const out = {};
  for (const [code, p] of pairs(progress, 50)) {
    if (!LANG_RE.test(code) || !isObj(p)) continue;
    const cards = {};
    for (const [id, c] of pairs(p.cards)) { const s = sanitizeCard(c); if (s) cards[id] = s; }
    const days = {};
    for (const [k, d] of pairs(p.days, 20000)) {
      if (!DATE_RE.test(k)) continue;
      const s = sanitizeDay(d, (total) => legacyGoalMet(k, total));
      if (s) days[k] = s;
    }
    out[code] = { cards, days };
    // A reset can't be in the future: one that was would keep out everything learned until then.
    const resetAt = num(p.resetAt, Date.now());
    if (resetAt) out[code].resetAt = resetAt;
  }
  return out;
}

function devEntry(d) {
  return { xp: num(d?.xp, MAX_XP) ?? 0, xpBy: numMap(d?.xpBy, MAX_XP), c: numMap(d?.c) };
}

const maxDev = (a, b) => (a ? { xp: Math.max(a.xp, b.xp), xpBy: maxMap(a.xpBy, b.xpBy), c: maxMap(a.c, b.c) } : b);

function sanitizeGoal(x) {
  if (!isObj(x)) return null;
  const set = num(x.set, MAX_TIME) ?? 0;
  if (x.removed === true) return { removed: true, set };
  const words = Math.round(num(x.words, 1e5) ?? 0);
  if (words < 1) return null;
  return {
    words,
    by: typeof x.by === 'string' && DATE_RE.test(x.by) ? x.by : null,
    set,
    doneAt: num(x.doneAt, MAX_TIME) || null,
  };
}

function sanitizeWeek(w, device) {
  if (!isObj(w) || typeof w.key !== 'string' || !DATE_RE.test(w.key)) return undefined;
  // Very old builds kept one progress map; newer ones keep one per device.
  const p = isObj(w.p) && Object.values(w.p).some((v) => typeof v === 'number') ? { [device]: w.p } : w.p;
  const perDev = {};
  for (const [id, m] of pairs(p, 200)) if (isObj(m)) perDev[id] = numMap(m, MAX_XP);
  const done = {};
  for (const [id, v] of pairs(w.done, 100)) if (ID_RE.test(id) && v === true) done[id] = true;
  return {
    key: w.key,
    picks: strList(w.picks, 3, (s) => ID_RE.test(s)),
    p: perDev,
    done,
    goalDays: strList(w.goalDays, 7, (s) => DATE_RE.test(s)),
  };
}

function sanitizeGame(g, device) {
  if (!isObj(g)) return {};
  const out = { dev: {} };
  for (const [id, d] of pairs(g.dev, 200)) if (isObj(d)) out.dev[id] = devEntry(d);
  // Before per-device counters, XP and counters sat at the top level.
  if (g.xp !== undefined || isObj(g.c) || isObj(g.xpBy)) out.dev[device] = maxDev(out.dev[device], devEntry(g));
  out.letters = {};
  for (const [lang, list] of pairs(g.letters, 50)) out.letters[lang] = strList(list, 1000, (s) => s.length <= 20);
  out.unlocked = {};
  for (const [id, at] of pairs(g.unlocked, 500)) { const t = num(at, MAX_TIME); if (ID_RE.test(id) && t !== undefined) out.unlocked[id] = t; }
  out.unseen = strList(g.unseen, 500).filter((id) => Object.hasOwn(out.unlocked, id));
  out.goals = {};
  for (const [lang, goal] of pairs(g.goals, 50)) { const s = sanitizeGoal(goal); if (s) out.goals[lang] = s; }
  out.grammar = {};
  for (const [lang, lessons] of pairs(g.grammar, 50)) out.grammar[lang] = numMap(lessons, 1);
  // Read & Listen: best comprehension score (0..1) per text, like grammar.
  out.texts = {};
  for (const [lang, texts] of pairs(g.texts, 50)) out.texts[lang] = numMap(texts, 1);
  const week = sanitizeWeek(g.week, device);
  if (week) out.week = week;
  if (isObj(g.spoken) && typeof g.spoken.day === 'string' && (DATE_RE.test(g.spoken.day) || g.spoken.day === '')) {
    out.spoken = { day: g.spoken.day, ids: strList(g.spoken.ids, 5000), best: numMap(g.spoken.best, 1) };
  }
  if (isObj(g.said)) out.said = { great: strList(g.said.great), perfect: strList(g.said.perfect) };
  return out;
}

/**
 * Clean data that came from outside (a sync code or a backup) and convert
 * older formats. `device` owns any XP and challenge progress from before
 * per-device counters (old day tallies go to OLD_DEV); `dailyGoal`, when
 * known, tells which old days already met the goal (otherwise the data's own
 * weekly goal days are used).
 * @returns {{ progress, game }}
 */
export function sanitize(data, { device, dailyGoal } = {}) {
  const dev = okKey(device) ? device : 'other';
  const game = sanitizeGame(data?.game, dev);
  const goalDays = game.week?.goalDays || [];
  const legacyGoalMet = (key, total) => (num(dailyGoal) ? total >= dailyGoal : goalDays.includes(key));
  return { progress: sanitizeProgress(data?.progress, legacyGoalMet), game };
}

// ---------- merge ----------

const clone = (x) => (x == null ? x : JSON.parse(JSON.stringify(x)));
export const stamp = (card) => card?.last ?? card?.added ?? 0;

/** YYYY-MM-DD in local time (the same as store.dayKey). */
function dayKeyOf(t) {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Two copies of one day: per device, the larger count per field; flags from either. */
function mergeDay(a, b) {
  if (!a) return clone(b);
  const out = clone(a);
  for (const [id, t] of Object.entries(b.dev || {})) (out.dev ||= {})[id] = maxTally(out.dev[id], t);
  if (b.repaired) out.repaired = true;
  if (b.goalMet) out.goalMet = true;
  return out;
}

/**
 * Merge one language's progress. Only this device's own reset (local.resetAt)
 * filters anything: the other device's cards and days from before it are left
 * out (counted as `skipped`), and a reset made on the other device never
 * deletes progress here — the confirm dialog promises "on this device".
 * Returns { cards, days, resetAt?, added, updated, removed, skipped }.
 */
function mergeLang(local = {}, remote = {}) {
  const resetAt = local.resetAt || 0;
  const resetDay = resetAt ? dayKeyOf(resetAt) : '';
  const cards = clone(local.cards || {});
  let added = 0;
  let updated = 0;
  let removed = 0;
  let skipped = 0;
  for (const [id, rc] of Object.entries(remote.cards || {})) {
    const lc = cards[id];
    const had = !!lc && !lc.deleted;
    if (stamp(rc) < resetAt) { if (!rc.deleted && !had) skipped++; continue; }
    if (lc && stamp(rc) <= stamp(lc)) continue;
    cards[id] = clone(rc); // tombstones are kept too, so the removal reaches other devices
    if (rc.deleted) { if (had) removed++; } else if (had) updated++; else added++;
  }
  const days = clone(local.days || {});
  for (const [k, d] of Object.entries(remote.days || {})) if (k >= resetDay) days[k] = mergeDay(days[k], d);
  return { cards, days, ...(resetAt ? { resetAt } : {}), added, updated, removed, skipped };
}

function maxMap(a = {}, b = {}) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(num(out[k]) ?? 0, num(v) ?? 0);
  return out;
}

const union = (a = [], b = []) => [...new Set([...a, ...b])];

/** True when goal copy `a` should replace `b`: newer set wins; for the same goal, the copy completed first. */
function goalWins(a, b) {
  if (!b) return true;
  if ((a.set || 0) !== (b.set || 0)) return (a.set || 0) > (b.set || 0);
  return (a.doneAt || Infinity) < (b.doneAt || Infinity);
}

/** Merge game state (see the rules at the top of this file). Expects sanitized input. */
export function mergeGame(local = {}, remote = {}) {
  const out = clone(local) || {};
  // per-device XP & counters: take the larger value per device, per field
  out.dev = clone(local.dev) || {};
  for (const [id, rd] of Object.entries(remote.dev || {})) {
    const ld = out.dev[id] || {};
    out.dev[id] = { xp: Math.max(num(ld.xp, MAX_XP) ?? 0, num(rd.xp, MAX_XP) ?? 0), xpBy: maxMap(ld.xpBy, rd.xpBy), c: maxMap(ld.c, rd.c) };
  }
  // alphabet letters heard: union
  out.letters = clone(local.letters) || {};
  for (const [lang, list] of Object.entries(remote.letters || {})) out.letters[lang] = union(out.letters[lang], list);
  // words said well (for the "different words" achievements): union
  if (local.said || remote.said) {
    out.said = { great: union(local.said?.great, remote.said?.great), perfect: union(local.said?.perfect, remote.said?.perfect) };
  }
  // achievements: union, earliest date; newly arrived ones count as unseen here
  out.unlocked = { ...(local.unlocked || {}) };
  out.unseen = [...(local.unseen || [])];
  for (const [id, at] of Object.entries(remote.unlocked || {})) {
    if (!out.unlocked[id]) { out.unlocked[id] = at; out.unseen.push(id); } else out.unlocked[id] = Math.min(out.unlocked[id], at);
  }
  // personal goals: the most recently set one (or removal); same goal → completed first
  out.goals = clone(local.goals) || {};
  for (const [lang, rg] of Object.entries(remote.goals || {})) {
    if (rg && goalWins(rg, out.goals[lang])) out.goals[lang] = clone(rg);
  }
  // grammar lessons: best score per lesson
  out.grammar = clone(local.grammar) || {};
  for (const [lang, lessons] of Object.entries(remote.grammar || {})) out.grammar[lang] = maxMap(out.grammar[lang], lessons);
  // Read & Listen texts: best score per text
  out.texts = clone(local.texts) || {};
  for (const [lang, texts] of Object.entries(remote.texts || {})) out.texts[lang] = maxMap(out.texts[lang], texts);
  // weekly challenges: same week → merge progress; otherwise the newer week
  const lw = local.week;
  const rw = remote.week;
  if (rw && (!lw || rw.key > lw.key)) out.week = clone(rw);
  else if (rw && lw && rw.key === lw.key) {
    out.week = clone(lw);
    out.week.p ||= {};
    for (const [id, rp] of Object.entries(rw.p || {})) out.week.p[id] = maxMap(out.week.p[id], rp);
    out.week.done = { ...(lw.done || {}), ...(rw.done || {}) };
    out.week.goalDays = union(lw.goalDays, rw.goalDays);
  }
  return out;
}

/**
 * Merge a payload into local data without touching either. The payload is
 * sanitized first; `device` is this device's id (it owns any old-format
 * local day logs). summary.changed is false when merging would change nothing.
 * @returns {{ progress, game, summary }}
 */
export function mergeAll(local, payload, { device = 'this' } = {}) {
  const mine = sanitize(local, { device });
  const before = JSON.stringify(mine);
  const from = okKey(payload?.device) ? payload.device : 'other';
  const theirs = sanitize(payload, { device: from });
  const progress = mine.progress;
  const langs = [];
  for (const [code, rp] of Object.entries(theirs.progress)) {
    const empty = !Object.keys(rp.cards).length && !Object.keys(rp.days).length;
    if (empty && !progress[code]) continue; // a language the other device only opened (or reset)
    const m = mergeLang(progress[code], rp);
    progress[code] = { cards: m.cards, days: m.days, ...(m.resetAt ? { resetAt: m.resetAt } : {}) };
    const remoteWords = Object.values(rp.cards).filter((c) => !c.deleted).length;
    langs.push({ code, remoteWords, added: m.added, updated: m.updated, removed: m.removed, skipped: m.skipped });
  }
  const game = mergeGame(mine.game, theirs.game);
  const changed = JSON.stringify({ progress, game }) !== before;
  return { progress, game, summary: { langs, changed, from: payload?.device, at: payload?.at } };
}
