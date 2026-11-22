// Read & Listen helpers: loading texts on demand, glossary matching, the
// line-by-line player, shadowing fades, recording / scoring a line, and the
// entry card on Learn. The screens live in js/views/read.js; everything here
// except readLink() is free of DOM work, so the tests run it in node.
import * as speech from './speech.js';
import { scoreSpoken } from './compare.js';
import { h, icon } from './ui.js';

export const LEVELS = ['A1', 'A2', 'B1'];

export const KINDS = {
  dialogue: { emoji: '💬', label: 'Dialogues', one: 'Dialogue' },
  story: { emoji: '📖', label: 'Stories', one: 'Story' },
  everyday: { emoji: '🧾', label: 'Everyday', one: 'Everyday text' },
  speech: { emoji: '🎤', label: 'Speeches', one: 'Speech' },
};

export const REGISTERS = {
  casual: { label: 'Casual', cls: 'reg-casual' },
  polite: { label: 'Polite', cls: 'reg-polite' },
  mixed: { label: 'Casual + polite', cls: 'reg-mixed' },
};

// ---------- Loading ----------

// Texts are big (a few hundred kB for all languages), so each language's file
// is only fetched when Read & Listen (or the Learn card counting them) needs it.
const cache = new Map();
const pending = new Map();

/** The texts of a language if they are already loaded, else null. */
export const cachedTexts = (code) => cache.get(code) ?? null;

/** Load a language's texts (once). Resolves to an array, possibly empty. */
export function loadTexts(code) {
  if (cache.has(code)) return Promise.resolve(cache.get(code));
  if (!/^[a-z]{2,3}$/.test(code)) return Promise.resolve([]);
  if (!pending.has(code)) {
    pending.set(code, import(`./languages/${code}/texts.js`)
      .then((m) => {
        const texts = Array.isArray(m.texts) ? m.texts : [];
        cache.set(code, texts);
        return texts;
      })
      .finally(() => pending.delete(code)));
  }
  return pending.get(code);
}

// ---------- Entry card on Learn ----------

/** The "Read & Listen" card on the Learn screen; the text count fills in once loaded. */
export function readLink(ctx) {
  const { lang } = ctx;
  const small = h('small', null, 'Dialogues, stories and short speeches');
  const fill = (texts) => {
    ctx.game.registerTexts?.(lang.code, texts.map((t) => t.id));
    const done = texts.filter((t) => ctx.game.textBest(lang.code, t.id) != null).length;
    small.textContent = texts.length
      ? `${texts.length} texts · dialogues, stories and speeches${done ? ` · ${done} done` : ''}`
      : 'Coming soon: dialogues, stories and speeches';
  };
  const cached = cachedTexts(lang.code);
  if (cached) fill(cached);
  else loadTexts(lang.code).then(fill, () => {});
  return h('a', { class: 'quick-link read-link', href: '#/read' },
    h('span', { class: 'read-link-icon', 'aria-hidden': 'true' }, '🎧'),
    h('span', null, h('b', null, 'Read & Listen'), small),
    icon('arrow'));
}

// ---------- Text facts ----------

const levelRank = (l) => (LEVELS.includes(l) ? LEVELS.indexOf(l) : LEVELS.length);

/** A1 → B1, keeping the authors' order inside a level. */
export const sortTexts = (texts) => texts.map((t, i) => [t, i])
  .sort((a, b) => levelRank(a[0].level) - levelRank(b[0].level) || a[1] - b[1])
  .map(([t]) => t);

export function filterTexts(texts, { level = 'all', kind = null } = {}) {
  return texts.filter((t) => (level === 'all' || t.level === level) && (!kind || t.kind === kind));
}

/**
 * Rough minutes to listen once and read along, plus the questions: about 12
 * letters (or 7 kana) a second of speech, a short pause per line, times three.
 */
export function estimateMinutes(text) {
  const speech = text.lines.reduce((sec, l) => sec + (l.kana ? [...l.kana.replace(/\s+/g, '')].length / 7 : [...l.tr].length / 12), 0);
  const seconds = (speech + text.lines.length * 1.5) * 3;
  return Math.max(1, Math.round(seconds / 60));
}

/** Speakers in order of appearance → colour index (lines without a speaker get none). */
export function speakerIndex(text) {
  const map = new Map();
  for (const l of text.lines) if (l.speaker && !map.has(l.speaker)) map.set(l.speaker, map.size);
  return map;
}

/** Role-play needs a dialogue with at least two people. */
export const canRolePlay = (text) => text.kind === 'dialogue' && speakerIndex(text).size >= 2;

/** The text after `id` in list order, else the first one not done yet. */
export function nextText(texts, id, isDone = () => false) {
  const list = sortTexts(texts);
  const i = list.findIndex((t) => t.id === id);
  return list.slice(i + 1).find((t) => !isDone(t.id)) || list.slice(i + 1)[0]
    || list.find((t) => t.id !== id && !isDone(t.id)) || null;
}

// ---------- Glossary ----------

// Pattern entries such as "〜によると…そうだ" are matched part by part.
const PATTERN_SPLIT = /[〜~…]+|\.{3,}/;
// Glossary items are dictionary forms; in Turkish (and other languages with
// suffixes) the text often adds endings: "karşı daire" → "karşı daireye".
// Items at least this long may be followed by more letters of the same word.
const MIN_STEM = 4;
const ARABIC_PROCLITICS = new Set(['', 'و', 'ف', 'ب', 'ل', 'ك', 'س', 'ال', 'وال', 'فال', 'بال', 'كال', 'لل', 'ولل', 'فلل', 'وب', 'ول', 'فب', 'فل']);
const WORDISH = /[\p{L}\p{M}\p{N}]/u;

/** The normalised forms of a glossary item that should be found in the text. */
export function glossaryForms(lang, item) {
  return String(item?.tr || '').split(PATTERN_SPLIT).map((p) => lang.normalize(p)).filter(Boolean);
}

/** A line as display units with its normalised text, and a map from each normalised character to its unit. */
function indexLine(lang, text) {
  const units = lang.displayUnits(text);
  let norm = '';
  const at = [];
  units.forEach((u, i) => {
    norm += u.key;
    for (let k = 0; k < u.key.length; k++) at.push(i);
  });
  return { units, norm, at };
}

/** Every [startUnit, endUnit] where `needle` occurs in the line, by the language's word rules. */
function findForm(lang, line, needle, mode) {
  const { units, norm, at } = line;
  const out = [];
  const sep = (i) => i < 0 || i >= units.length || !WORDISH.test(units[i].ch);
  for (let pos = norm.indexOf(needle); pos >= 0; pos = norm.indexOf(needle, pos + 1)) {
    let end = pos + needle.length; // exclusive, in norm
    if (mode === 'spaced') {
      // Words are separated by spaces in the normalised text.
      if (pos > 0 && norm[pos - 1] !== ' ') continue;
      if (end < norm.length && norm[end] !== ' ') {
        if ([...needle].length < MIN_STEM) continue;
        while (end < norm.length && norm[end] !== ' ') end++;
      }
      out.push([at[pos], at[end - 1]]);
    } else if (mode === 'words') {
      // Arabic: no spaces once normalised, so word edges come from the text.
      // A match may follow a prefix (و، ب، ال…) and take endings when long enough.
      let s = at[pos];
      let e = at[end - 1];
      let before = '';
      while (!sep(s - 1)) { s--; before = units[s].key + before; }
      if (!ARABIC_PROCLITICS.has(before)) continue;
      if (!sep(e + 1) && [...needle].length < 3) continue;
      while (!sep(e + 1)) e++;
      out.push([s, e]);
    } else {
      // Japanese: no spaces between words; match anywhere.
      out.push([at[pos], at[end - 1]]);
    }
  }
  return out;
}

function lineMode(lang, text) {
  if (lang.normalize('a b') === 'a b') return 'spaced';
  return /\s/.test(text) ? 'words' : 'chars';
}

/**
 * Split a line into plain runs and glossary words: [{ text, gloss }] where
 * gloss is the glossary index or null. Matching is case- and
 * diacritic-insensitive (the pack's normalize()); where two items overlap the
 * longer one wins.
 */
export function markGlossary(lang, text, glossary = []) {
  const line = indexLine(lang, text);
  const mode = lineMode(lang, text);
  const hits = [];
  glossary.forEach((item, gi) => {
    for (const form of glossaryForms(lang, item)) {
      for (const [s, e] of findForm(lang, line, form, mode)) hits.push({ s, e, gi });
    }
  });
  hits.sort((a, b) => a.s - b.s || (b.e - b.s) - (a.e - a.s));
  const taken = [];
  let free = 0;
  for (const hit of hits) {
    if (hit.s < free) continue;
    taken.push(hit);
    free = hit.e + 1;
  }
  const out = [];
  let i = 0;
  const chars = (a, b) => line.units.slice(a, b).map((u) => u.ch).join('');
  for (const hit of taken) {
    if (hit.s > i) out.push({ text: chars(i, hit.s), gloss: null });
    out.push({ text: chars(hit.s, hit.e + 1), gloss: hit.gi });
    i = hit.e + 1;
  }
  if (i < line.units.length) out.push({ text: chars(i, line.units.length), gloss: null });
  return out;
}

/** Indexes of the glossary items found somewhere in the text. */
export function glossaryFound(lang, text) {
  const found = new Set();
  for (const l of text.lines) {
    for (const seg of markGlossary(lang, l.tr, text.glossary)) if (seg.gloss != null) found.add(seg.gloss);
  }
  return found;
}

/** Per form: does every part of a pattern item occur? (Tests use this to check the data.) */
export function glossaryMissing(lang, text) {
  return text.glossary.filter((item) => glossaryForms(lang, item).some((form) =>
    !text.lines.some((l) => {
      const line = indexLine(lang, l.tr);
      return findForm(lang, line, form, lineMode(lang, l.tr)).length > 0;
    })));
}

const vocabIndex = new Map();
/** The vocabulary entry a glossary item stands for (same normalised form), or null. */
export function findWord(lang, item) {
  let index = vocabIndex.get(lang.code);
  if (!index) {
    index = new Map();
    for (const w of lang.words) {
      for (const f of [w.tr, ...(w.alt || []), w.kana ? w.kana.replace(/\s+/g, '') : '']) {
        const k = f && lang.normalize(f);
        if (k && !index.has(k)) index.set(k, w);
      }
    }
    vocabIndex.set(lang.code, index);
  }
  const keys = [item.tr, item.kana ? item.kana.replace(/\s+/g, '') : ''].filter(Boolean).map((f) => lang.normalize(f));
  for (const k of keys) if (index.has(k)) return index.get(k);
  return null;
}

// ---------- Shadowing ----------

export const SHADOW_ROUNDS = [
  { id: 'full', title: 'Full text', hint: 'Read along and speak with the voice.' },
  { id: 'hints', title: 'First letters', hint: 'Only the first letter of each word is left.' },
  { id: 'hidden', title: 'No text', hint: 'From memory — just follow the voice.' },
];

// The Arabic article, alone or after و/ف/ب/ك (and لل = لِ + الْ).
const AR_ARTICLE = /^(?:[وفبك]?[اٱ]ل|[وف]?لل)/;

/**
 * The line as shown in a shadowing round: 0 → as written, 1 → first letter
 * of each word (Japanese uses the spaced kana reading, Arabic keeps the article
 * and the word's length with joining strokes), 2 → null (hidden).
 */
export function fadeLine(lang, line, round) {
  if (round <= 0) return line.tr;
  if (round >= 2) return null;
  const ja = lang.code === 'ja' && line.kana;
  const base = ja ? line.kana : line.tr;
  const filler = lang.code === 'ar' ? 'ـ' : ja ? '＿' : '_';
  const isLetter = (u) => /\p{L}/u.test(u);
  return base.normalize('NFC').split(/(\s+)/).map((w) => {
    if (/^\s*$/.test(w)) return w;
    const units = w.match(/\P{M}\p{M}*/gu) || [];
    let keep = 1;
    if (lang.code === 'ar') {
      // The first letter of الْبَيْتِ is the article's alif, the same in half the
      // words: keep the article (with و/ف/ب/ك in front) and show the stem's first letter.
      const letters = units.filter(isLetter).map((u) => u[0]).join('');
      const art = AR_ARTICLE.exec(letters);
      if (art && letters.length - art[0].length >= 2) keep = art[0].length + 1;
    }
    let shown = 0;
    return units.map((u) => {
      if (!isLetter(u)) return u; // punctuation stays
      if (shown < keep) { shown++; return u; }
      return filler;
    }).join('');
  }).join('');
}

// ---------- Player ----------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Plays lines one after another. `say(i)` speaks line i and resolves when it
 * ends (false when no audio could be played). Pausing stops the current line;
 * playing again starts that line over.
 * Callbacks: onLine(i), onState(playing), onEnd(), onFail().
 */
export function createPlayer({ count, say, onLine, onState, onEnd, onFail, gap = 350 }) {
  let gen = 0;
  let playing = false;
  let index = -1;
  let ended = false; // played to the end: the next play() starts over
  const setPlaying = (v) => { if (playing !== v) { playing = v; onState?.(v); } };

  async function run(from) {
    const my = ++gen;
    ended = false;
    setPlaying(true);
    for (let i = from; i < count; i++) {
      index = i;
      onLine?.(i);
      const ok = await say(i);
      if (my !== gen) return;
      if (ok === false) { setPlaying(false); onFail?.(); return; }
      if (i < count - 1) {
        await sleep(gap);
        if (my !== gen) return;
      }
    }
    ended = true;
    setPlaying(false);
    onEnd?.();
  }

  const api = {
    get playing() { return playing; },
    get index() { return index; },
    /** True once the last line has played: the next play() starts over. */
    get ended() { return ended; },
    /** Play from line `from` (default: where we stopped, or the start once finished). */
    play(from = index < 0 || ended ? 0 : index) { if (count) run(Math.max(0, Math.min(count - 1, from))); },
    pause() { gen++; setPlaying(false); speech.cancelSpeech(); },
    toggle() { if (playing) api.pause(); else api.play(); },
    /** Line i alone, or — while playing all — carry on from line i. */
    jump(i) {
      if (i < 0 || i >= count) return;
      if (playing) { run(i); return; }
      gen++;
      ended = false;
      index = i;
      onLine?.(i);
      say(i);
    },
    next() { api.jump(Math.min(count - 1, index + 1)); },
    prev() { api.jump(Math.max(0, index - 1)); },
    stop() { gen++; playing = false; },
  };
  return api;
}

// ---------- Speaking a line ----------

/** How long to listen for a spoken line: longer sentences get more time. */
export const listenTimeout = (text) => Math.min(20000, 6000 + [...String(text)].length * 150);

/** Score recognised alternatives against a line (Japanese also against its kana). */
export function scoreLine(lang, line, alternatives) {
  const targets = [line.tr];
  if (line.kana) targets.push(line.kana.replace(/\s+/g, ''));
  const best = targets
    .map((t) => ({ ...scoreSpoken(t, alternatives, lang), written: t }))
    .reduce((a, b) => (b.score > a.score ? b : a));
  // scoreSpoken leaves raw empty when nothing matched at all: still show what was heard.
  return best.raw ? best : { ...best, raw: String(alternatives?.[0]?.transcript || '').trim() };
}

export function verdict(score) {
  if (score >= 0.9) return 'good';
  if (score >= 0.6) return 'warn';
  return 'bad';
}

/**
 * Record the microphone for up to `maxMs` (MediaRecorder; the same approach
 * as the word recorder, which also works in the apps' WebViews).
 * Resolves to { stopped: Promise<objectURL>, stop() }; onTick(ms) runs while recording.
 */
export async function recordClip({ maxMs = 90000, onTick } = {}) {
  const started = Date.now();
  const rec = await speech.startRecording({ maxMs });
  const timer = setInterval(() => onTick?.(Math.min(maxMs, Date.now() - started)), 250);
  rec.stopped.finally(() => clearInterval(timer));
  return { stopped: rec.stopped, stop: () => rec.stop() };
}

/** Play a recording. Resolves when it ends or fails; stop() ends it early. */
export function playClip(url) {
  const audio = new Audio(url);
  let finish;
  const done = new Promise((resolve) => { finish = resolve; });
  audio.onended = () => finish(true);
  audio.onerror = () => finish(false);
  audio.play().catch(() => finish(false));
  return { done, stop() { audio.pause(); finish(false); } };
}

/** 75 000 → "1:15". */
export const clock = (ms) => {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
