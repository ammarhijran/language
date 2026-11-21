// Device-to-device sync without a server.
//
// Progress is packed into a "sync code" (or a file containing the same code)
// that the learner moves between their own devices themselves — clipboard,
// AirDrop / Nearby Share, a note to self, their own cloud drive. Lisan never
// uploads anything. With a passphrase, the code is end-to-end encrypted
// (PBKDF2-SHA-256 → AES-GCM-256), so whatever carries it only sees ciphertext.
//
// Receiving a code *merges* it with this device's progress instead of
// overwriting it, so syncing in either order, or repeatedly, is always safe:
//  - words: the card reviewed most recently wins
//  - daily logs: the larger count per day, per field
//  - XP & counters: kept per device and added up (each device's own numbers
//    only grow, so taking the larger value per device never double-counts)
//  - achievements, alphabet letters, challenge completions: union

export const PREFIX = 'LISAN1';
const ITERATIONS = 210000;
const CODE_RE = /LISAN1\.([a-z-]+)\.([A-Za-z0-9_-]+)/;

export class SyncError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

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

async function pipe(bytes, stream) {
  const res = new Response(new Blob([bytes]).stream().pipeThrough(stream));
  return new Uint8Array(await res.arrayBuffer());
}
const canCompress = () => typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

async function keyFrom(passphrase, salt) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase.normalize('NFKC')), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'],
  );
}

// ---------- encode / decode ----------

/**
 * Pack a payload into a sync code.
 * @param {object} payload  { device, at, progress, game }
 * @param {{ passphrase?: string }} [opts]
 */
export async function encode(payload, { passphrase = '' } = {}) {
  let bytes = new TextEncoder().encode(JSON.stringify({ app: 'lisan', v: 1, ...payload }));
  let flags = '';
  if (canCompress()) {
    bytes = await pipe(bytes, new CompressionStream('deflate-raw'));
    flags += 'z';
  }
  if (passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await keyFrom(passphrase, salt);
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
    bytes = new Uint8Array(salt.length + iv.length + ct.length);
    bytes.set(salt, 0);
    bytes.set(iv, salt.length);
    bytes.set(ct, salt.length + iv.length);
    flags += 'e';
  }
  return `${PREFIX}.${flags || '-'}.${toB64url(bytes)}`;
}

/** Find a sync code inside pasted text (chat apps may add line breaks or extra words). */
export function extractCode(text) {
  const m = String(text || '').replace(/\s+/g, '').match(CODE_RE);
  return m ? { flags: m[1], data: m[2] } : null;
}

export const isEncrypted = (text) => !!extractCode(text)?.flags.includes('e');

export async function decode(text, { passphrase = '' } = {}) {
  const found = extractCode(text);
  if (!found) throw new SyncError('invalid', 'That doesn’t look like a Lisan sync code.');
  let bytes;
  try { bytes = fromB64url(found.data); } catch { throw new SyncError('invalid', 'The sync code is incomplete or damaged.'); }
  if (found.flags.includes('e')) {
    if (!passphrase) throw new SyncError('needs-passphrase', 'This sync code is protected — enter its passphrase.');
    try {
      const key = await keyFrom(passphrase, bytes.subarray(0, 16));
      bytes = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.subarray(16, 28) }, key, bytes.subarray(28)));
    } catch {
      throw new SyncError('wrong-passphrase', 'Wrong passphrase (or the code was cut off).');
    }
  }
  if (found.flags.includes('z')) {
    if (!canCompress()) throw new SyncError('unsupported', 'This device can’t read compressed sync codes — update your browser or system.');
    try { bytes = await pipe(bytes, new DecompressionStream('deflate-raw')); } catch { throw new SyncError('invalid', 'The sync code is incomplete or damaged.'); }
  }
  let payload;
  try { payload = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new SyncError('invalid', 'The sync code is incomplete or damaged.'); }
  if (payload?.app !== 'lisan' || typeof payload.progress !== 'object') throw new SyncError('invalid', 'That isn’t Lisan progress.');
  return payload;
}

// ---------- merge ----------

const clone = (x) => (x == null ? x : JSON.parse(JSON.stringify(x)));
const stamp = (card) => card?.last ?? card?.added ?? 0;
const DAY_FIELDS = ['reviews', 'learned', 'practiced', 'correct'];

/** Merge one language's progress. Returns { cards, days, added, updated }. */
function mergeLang(local = { cards: {}, days: {} }, remote = { cards: {}, days: {} }) {
  const cards = clone(local.cards || {});
  let added = 0;
  let updated = 0;
  for (const [id, rc] of Object.entries(remote.cards || {})) {
    const lc = cards[id];
    if (!lc) { cards[id] = clone(rc); added++; } else if (stamp(rc) > stamp(lc)) { cards[id] = clone(rc); updated++; }
  }
  const days = clone(local.days || {});
  for (const [k, rd] of Object.entries(remote.days || {})) {
    const ld = days[k] || {};
    const out = { ...ld };
    for (const f of DAY_FIELDS) if (rd[f] != null || ld[f] != null) out[f] = Math.max(ld[f] || 0, rd[f] || 0);
    if (rd.repaired || ld.repaired) out.repaired = true;
    days[k] = out;
  }
  return { cards, days, added, updated };
}

function maxMap(a = {}, b = {}) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(out[k] || 0, v || 0);
  return out;
}

/** Merge game state (see the rules at the top of this file). */
export function mergeGame(local = {}, remote = {}) {
  const out = clone(local) || {};
  // per-device XP & counters: take the larger value per device, per field
  out.dev = clone(local.dev) || {};
  for (const [id, rd] of Object.entries(remote.dev || {})) {
    const ld = out.dev[id] || {};
    out.dev[id] = { xp: Math.max(ld.xp || 0, rd.xp || 0), xpBy: maxMap(ld.xpBy, rd.xpBy), c: maxMap(ld.c, rd.c) };
  }
  // alphabet letters heard: union
  out.letters = clone(local.letters) || {};
  for (const [lang, list] of Object.entries(remote.letters || {})) out.letters[lang] = [...new Set([...(out.letters[lang] || []), ...list])];
  // achievements: union, earliest date; newly arrived ones count as unseen here
  out.unlocked = { ...(local.unlocked || {}) };
  out.unseen = [...(local.unseen || [])];
  for (const [id, at] of Object.entries(remote.unlocked || {})) {
    if (!out.unlocked[id]) { out.unlocked[id] = at; out.unseen.push(id); } else out.unlocked[id] = Math.min(out.unlocked[id], at);
  }
  // personal goals: the most recently set one
  out.goals = clone(local.goals) || {};
  for (const [lang, rg] of Object.entries(remote.goals || {})) {
    const lg = out.goals[lang];
    if (rg && (!lg || (rg.set || 0) > (lg.set || 0))) out.goals[lang] = clone(rg);
  }
  // weekly challenges: same week → merge progress; otherwise the newer week
  const lw = local.week;
  const rw = remote.week;
  if (rw && (!lw || rw.key > lw.key)) out.week = clone(rw);
  else if (rw && lw && rw.key === lw.key) {
    out.week = clone(lw);
    for (const [id, rp] of Object.entries(rw.p || {})) out.week.p[id] = maxMap(out.week.p[id], rp);
    out.week.done = { ...(lw.done || {}), ...(rw.done || {}) };
    out.week.goalDays = [...new Set([...(lw.goalDays || []), ...(rw.goalDays || [])])];
  }
  return out;
}

/**
 * Merge a decoded payload into local data without touching either.
 * @returns {{ progress, game, summary }}
 */
export function mergeAll(local, payload) {
  const progress = clone(local.progress) || {};
  const langs = [];
  for (const [code, rp] of Object.entries(payload.progress || {})) {
    const m = mergeLang(progress[code], rp);
    progress[code] = { ...(progress[code] || {}), cards: m.cards, days: m.days };
    langs.push({ code, remoteWords: Object.keys(rp.cards || {}).length, added: m.added, updated: m.updated });
  }
  const game = mergeGame(local.game || {}, payload.game || {});
  return { progress, game, summary: { langs, from: payload.device, at: payload.at } };
}
