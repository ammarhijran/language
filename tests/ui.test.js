// UI logic that doesn't need a browser: per-language feedback text, diffs shown
// as written, and components cleaning up after themselves. A tiny fake DOM and
// fake speech APIs stand in for the browser.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// ---------- Fake browser (set up before the app modules load) ----------

class FakeNode {}
class FakeText extends FakeNode {
  constructor(text) { super(); this.data = text; }
  get textContent() { return this.data; }
}
class FakeEl extends FakeNode {
  constructor(tag) {
    super();
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.attrs = {};
    this.listeners = {};
    this.className = '';
    this.dataset = {};
    this.style = { setProperty() {} };
  }
  get classList() {
    const list = () => this.className.split(/\s+/).filter(Boolean);
    return {
      add: (c) => { if (!list().includes(c)) this.className = [...list(), c].join(' '); },
      remove: (c) => { this.className = list().filter((x) => x !== c).join(' '); },
      contains: (c) => list().includes(c),
    };
  }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return this.attrs[k] ?? null; }
  toggleAttribute(k, on) { if (on) this.attrs[k] = ''; else delete this.attrs[k]; }
  get hidden() { return 'hidden' in this.attrs; }
  set hidden(v) { this.toggleAttribute('hidden', v); }
  get disabled() { return 'disabled' in this.attrs; }
  set disabled(v) { this.toggleAttribute('disabled', v); }
  set innerHTML(v) { this.html = v; }
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  click() { (this.listeners.click || []).forEach((fn) => fn({ currentTarget: this, target: this, stopPropagation() {} })); }
  append(...nodes) { for (const n of nodes) this.children.push(typeof n === 'string' ? new FakeText(n) : n); }
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
  get textContent() { return this.children.map((c) => c.textContent).join(''); }
  set textContent(t) { this.children = [new FakeText(String(t))]; }
  focus() {}
  /** Depth-first search (test helper). */
  find(pred) {
    for (const c of this.children) {
      if (!(c instanceof FakeEl)) continue;
      if (pred(c)) return c;
      const hit = c.find(pred);
      if (hit) return hit;
    }
    return null;
  }
}

const log = [];
const recognitions = [];
const urls = { made: 0, revoked: 0 };
let pendingMic = null; // when set, getUserMedia waits for this promise

globalThis.Node = FakeNode;
globalThis.document = { createElement: (tag) => new FakeEl(tag) };
globalThis.window = globalThis;
globalThis.SpeechRecognition = class {
  constructor() { this.active = false; recognitions.push(this); }
  start() { this.active = true; }
  // Like Chrome: stopping still delivers what was heard so far.
  stop() { this.active = false; setTimeout(() => this.onresult?.({ results: [[{ transcript: this.heard ?? '', confidence: 0.9 }]] }), 1); }
  abort() { this.active = false; }
};
globalThis.MediaRecorder = class {
  constructor() { this.state = 'inactive'; }
  start() { this.state = 'recording'; log.push('record'); }
  stop() {
    if (this.state === 'inactive') return;
    this.state = 'inactive';
    log.push('stop');
    setTimeout(() => this.onstop?.(), 1);
  }
};
globalThis.Audio = class {
  constructor(url) { this.url = url; }
  play() { log.push('play'); return Promise.resolve(); }
  pause() { log.push('pause'); }
};
Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: { userAgent: 'node', mediaDevices: { getUserMedia: async () => { await pendingMic; return { getTracks: () => [{ stop() {} }] }; } } },
});
const createUrl = URL.createObjectURL.bind(URL);
const revokeUrl = URL.revokeObjectURL.bind(URL);
URL.createObjectURL = (b) => { urls.made++; return createUrl(b); };
URL.revokeObjectURL = (u) => { urls.revoked++; revokeUrl(u); };

const { languages } = await import('./all-languages.js');
const { makePack, writtenUnits } = await import('../js/languages/common.js');
const { recorder, speakPractice, praiseLine, cleanupScope, sayLater, pronunciationPanel, exampleBlock, playButton, registerBlock } = await import('../js/components.js');
const { tr, uk, ja, ar } = languages;

const wait = (ms = 5) => new Promise((r) => setTimeout(r, ms));
const byText = (el, text) => el.find((e) => e.tagName === 'BUTTON' && e.textContent.includes(text));

function fakeCtx(lang) {
  const cleanups = [];
  return {
    lang,
    said: [],
    spoken: [],
    toasts: [],
    say(text, opts) { this.said.push(text); this.sayOpts = opts; return Promise.resolve(); },
    onCleanup(fn) { cleanups.push(fn); },
    toast(msg) { this.toasts.push(msg); },
    game: { spoke(x) { this.owner.spoken.push(x); } },
    /** The screen goes away (what app.js render() does with its cleanups). */
    leave() { cleanups.splice(0).forEach((fn) => fn()); },
  };
}
const ctxFor = (lang) => { const c = fakeCtx(lang); c.game.owner = c; return c; };
const reset = () => { log.length = 0; urls.made = 0; urls.revoked = 0; };

// ---------- Feedback text comes from the language pack ----------

const SCRIPT = { tr: /\p{Script=Latin}/u, uk: /\p{Script=Cyrillic}/u, ja: /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u, ar: /\p{Script=Arabic}/u };
const lines = (L) => [...L.praise, L.scoreTitles.excellent, L.scoreTitles.close];

test('every pack has praise and score titles in its own language, with an English gloss', () => {
  for (const L of [tr, uk, ja, ar]) {
    assert.ok(L.praise.length >= 2, L.code);
    for (const line of lines(L)) {
      assert.ok(Array.isArray(line) && line.length === 2, `${L.code}: ${line}`);
      const [native, gloss] = line;
      assert.match(native, SCRIPT[L.code], `${L.code}: ${native}`);
      assert.match(gloss, /^[A-Z][a-z ]+\.$/, `${L.code}: ${gloss}`);
    }
  }
  assert.deepEqual(tr.praise[0], ['Doğru!', 'Correct.']);
  assert.deepEqual(tr.scoreTitles.excellent, ['Mükemmel!', 'Excellent.']);
});

test('no Turkish feedback in the other courses', () => {
  const turkish = new Set(lines(tr).map(([native]) => native));
  for (const L of [uk, ja, ar]) {
    for (const [native] of lines(L)) assert.ok(!turkish.has(native) && !/\p{Script=Latin}/u.test(native), `${L.code}: ${native}`);
  }
});

test('a pack without its own feedback falls back to English only', () => {
  const p = makePack({
    code: 'xx', name: 'Test', greeting: 'Hi', categories: [], alphabet: [],
    vocab: [{ tr: 'abc', en: 'abc', cat: 'c' }], normalize: (s) => s.toLowerCase(),
  });
  assert.ok(p.praise.every((x) => typeof x === 'string' && /^[A-Z][a-z ]+!$/.test(x)));
  assert.equal(p.scoreTitles.excellent, 'Excellent!');
  assert.equal(p.scoreTitles.close, 'Very close!');
});

test('praiseLine tags the native words with their language', () => {
  assert.equal(praiseLine(tr, 'Correct!'), 'Correct!');
  const [native, space, gloss] = praiseLine(ar, ['صَحِيح!', 'Correct.']);
  assert.equal(native.tagName, 'BDI');
  assert.equal(native.getAttribute('lang'), 'ar');
  assert.equal(native.textContent, 'صَحِيح!');
  assert.equal(space, ' ');
  assert.equal(gloss, 'Correct.');
});

// ---------- Diffs are shown as written ----------

const show = (diff) => diff.map((d) => (d.ok ? d.ch : `[${d.ch}]`)).join('');

test('display units rebuild the written text and its normalised form, for every entry', () => {
  for (const L of [tr, uk, ja, ar]) {
    for (const w of L.words) {
      for (const t of new Set([w.tr, ...L.acceptedAnswers(w), ...L.spokenTargets(w)])) {
        const units = L.displayUnits(t);
        assert.equal(units.map((u) => u.ch).join(''), t.normalize('NFC'), `${L.code}: ${t}`);
        assert.equal(units.map((u) => u.key).join(''), L.normalize(t), `${L.code}: ${t}`);
      }
    }
  }
});

test('Japanese: katakana stays katakana in the diff', () => {
  const d = ja.diffAsWritten('コーヒー', ja.normalizeSpoken('こうひい'));
  assert.equal(show(d), 'コ[ー]ヒ[ー]');
  assert.equal(d.map((x) => x.ch).join(''), 'コーヒー');
  assert.equal(show(ja.diffAsWritten('ゼロ', ja.normalizeSpoken('ぜろ'))), 'ゼロ');
});

test('Arabic: the diff keeps spaces, vowel marks and the spelling (ة, أ)', () => {
  const t = 'السَّلَامُ عَلَيْكُمْ';
  assert.equal(show(ar.diffAsWritten(t, ar.normalizeSpoken('السلام عليكم'))), t);
  const near = ar.diffAsWritten(t, ar.normalizeSpoken('السلام عليكن'));
  assert.equal(near.map((x) => x.ch).join(''), t);
  assert.deepEqual(near.filter((x) => !x.ok).map((x) => x.ch), ['مْ']);
  assert.equal(near.find((x) => x.ch === ' ').ok, true);
  assert.equal(show(ar.diffAsWritten('ثَلَاثَة', ar.normalizeSpoken('ثلاثه'))), 'ثَلَاثَة');
  const hamza = ar.words.find((w) => /أ/.test(w.tr));
  assert.ok(ar.diffAsWritten(hamza.tr, ar.normalize(hamza.tr)).some((x) => x.ch.startsWith('أ')));
});

test('Turkish and Ukrainian: capitals and punctuation shown as written, only real misses marked', () => {
  assert.equal(show(tr.diffAsWritten('Merhaba, nasılsın?', tr.normalizeSpoken('merhaba nasilsin'))), 'Merhaba, nas[ı]ls[ı]n?');
  assert.equal(show(uk.diffAsWritten('Добрий день', uk.normalize('добри день'))), 'Добри[й] день');
  // Tips are looked up by the normalised letter.
  assert.equal(tr.diffAsWritten('Işık', 'isik')[0].key, 'ı');
});

test('writtenUnits collapses separators like normalize() does', () => {
  const normalize = (s) => s.toLowerCase().replace(/[^\p{L}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  const units = writtenUnits(' Ab -  c! ', normalize);
  assert.equal(units.map((u) => u.key).join(''), normalize(' Ab -  c! '));
  assert.equal(units.map((u) => u.ch).join(''), ' Ab -  c! ');
});

// ---------- Cleanup: nothing from an old card or screen keeps running ----------

test('cleanupScope runs a card’s cleanups when the next card comes, and with the screen', () => {
  const ctx = ctxFor(tr);
  const scope = cleanupScope(ctx);
  const ran = [];
  scope.ctx.onCleanup(() => ran.push('card 1'));
  scope.cleanup();
  assert.deepEqual(ran, ['card 1']);
  scope.ctx.onCleanup(() => ran.push('card 2'));
  ctx.leave();
  assert.deepEqual(ran, ['card 1', 'card 2']);
  assert.equal(scope.ctx.lang, tr, 'the child still sees the parent context');
});

test('sayLater is cancelled when the card goes away first', async () => {
  const ctx = ctxFor(tr);
  sayLater(ctx, 'merhaba', 5);
  ctx.leave();
  await wait(15);
  assert.deepEqual(ctx.said, []);
  const ctx2 = ctxFor(tr);
  sayLater(ctx2, 'merhaba', 1);
  await wait(10);
  assert.deepEqual(ctx2.said, ['merhaba']);
});

test('recorder: a normal attempt plays the native audio, then the recording', async () => {
  reset();
  const ctx = ctxFor(tr);
  const el = recorder(ctx, 'merhaba');
  byText(el, 'Record myself').click();
  await wait();
  byText(el, 'Stop').click();
  await wait(10);
  assert.deepEqual(ctx.said, ['merhaba']);
  assert.deepEqual(log, ['record', 'stop', 'play']);
  assert.ok(byText(el, 'Mine'));
  ctx.leave();
  assert.equal(urls.revoked, urls.made, 'the recording is freed');
});

test('recorder: leaving while recording stops it, plays nothing and frees the recording', async () => {
  reset();
  const ctx = ctxFor(tr);
  const el = recorder(ctx, 'merhaba');
  byText(el, 'Record myself').click();
  await wait();
  ctx.leave();
  await wait(10);
  assert.deepEqual(ctx.said, []);
  assert.deepEqual(log, ['record', 'stop']);
  assert.equal(urls.made, 1);
  assert.equal(urls.revoked, 1);
});

test('recorder: leaving while the microphone prompt is open stops the recording at once', async () => {
  reset();
  let allow;
  pendingMic = new Promise((r) => { allow = r; });
  const ctx = ctxFor(tr);
  const el = recorder(ctx, 'merhaba');
  byText(el, 'Record myself').click();
  ctx.leave();
  allow();
  await wait(10);
  pendingMic = null;
  assert.deepEqual(ctx.said, []);
  assert.deepEqual(log, ['record', 'stop']);
  assert.equal(urls.revoked, urls.made);
  assert.deepEqual(ctx.toasts, []);
});

test('recorder: leaving during playback stops “Mine”', async () => {
  reset();
  const ctx = ctxFor(tr);
  const el = recorder(ctx, 'merhaba');
  byText(el, 'Record myself').click();
  await wait();
  byText(el, 'Stop').click();
  await wait(10);
  byText(el, 'Mine').click();
  ctx.leave();
  assert.deepEqual(log.slice(-3), ['pause', 'play', 'pause']);
});

test('speakPractice: a result after leaving is not scored, shown or rewarded', async () => {
  const ctx = ctxFor(uk);
  const word = uk.words[0];
  let results = 0;
  const el = speakPractice(ctx, word, { onResult: () => results++ });
  const mic = el.find((e) => e.getAttribute('aria-label') === 'Speak now');
  mic.click();
  const rec = recognitions.at(-1);
  assert.equal(rec.active, true);
  rec.heard = word.tr;
  ctx.leave();
  assert.equal(rec.active, false, 'leaving stops listening');
  await wait(10);
  assert.deepEqual(ctx.spoken, []);
  assert.equal(results, 0);
  assert.equal(el.find((e) => e.className.includes('speak-result')).hidden, true);
});

test('speakPractice: offline, it says before the first attempt that scores need a connection', () => {
  navigator.onLine = false;
  try {
    const el = speakPractice(ctxFor(uk), uk.words[0]);
    assert.match(el.find((e) => e.className === 'speak-status').textContent, /offline/i);
  } finally { delete navigator.onLine; }
  const el = speakPractice(ctxFor(uk), uk.words[0]);
  assert.match(el.find((e) => e.className === 'speak-status').textContent, /^Tap the mic/);
});

test('speakPractice: a good attempt gets the pack’s title and the word as written', async () => {
  const ctx = ctxFor(ja);
  const word = ja.words.find((w) => w.tr === 'コーヒー');
  const el = speakPractice(ctx, word);
  el.find((e) => e.getAttribute('aria-label') === 'Speak now').click();
  const rec = recognitions.at(-1);
  rec.heard = 'コーヒー';
  rec.stop();
  await wait(10);
  assert.equal(ctx.spoken.length, 1);
  assert.equal(ctx.spoken[0].wordId, word.id);
  const title = el.find((e) => e.className === 'score-title');
  assert.equal(title.textContent, 'すばらしい！ Excellent.');
  assert.equal(el.find((e) => e.className === 'diff').textContent, 'コーヒー');
  ctx.leave();
});

// ---------- Audio speaks entries, not display strings ----------

const buttons = (el) => {
  const out = [];
  const walk = (e) => { for (const c of e.children || []) { if (c.tagName === 'BUTTON') out.push(c); if (c.children) walk(c); } };
  walk(el);
  return out;
};

test('play buttons hand ctx.say the entry (its example, its pair), labelled with the text', () => {
  const ctx = ctxFor(ja);
  const w = ja.byId('十');
  const b = playButton(ctx, w.example, { label: 'Play example' });
  assert.equal(b.getAttribute('aria-label'), 'Play example: 店は十時に開きます。');
  b.click();
  assert.equal(ctx.said[0], w.example, 'the example object, so its say.js override and kana reach the voice');
  exampleBlock(ctx, w).find((e) => e.tagName === 'BUTTON').click();
  assert.equal(ctx.said[1], w.example);
  const arCtx = ctxFor(ar);
  const word = ar.words.find((x) => x.pair?.dialect === 'Egyptian');
  for (const btn of buttons(registerBlock(arCtx, word))) btn.click();
  assert.ok(arCtx.said.some((x) => x.dialect === 'Egyptian' && x.tr === word.pair.tr), 'the Egyptian side plays as Egyptian');
});

test('syllable chips say what they sound like; Arabic chips say their word', () => {
  const ctx = ctxFor(ja);
  const chips = buttons(pronunciationPanel(ctx, ja.words.find((w) => w.tr === 'こんにちは'))).filter((b) => b.className.startsWith('syl'));
  chips.at(-1).click();
  assert.deepEqual(ctx.said.at(-1), { text: 'わ' }, 'the particle は chip says わ');
  assert.deepEqual(ctx.sayOpts, { slow: true });
  const arCtx = ctxFor(ar);
  const w = ar.words.find((x) => x.tr === 'صَبَاحُ الْخَيْرِ');
  buttons(pronunciationPanel(arCtx, w)).filter((b) => b.className.startsWith('syl')).at(-1).click();
  assert.equal(ar.speech(arCtx.said.at(-1)).text, 'الْخَيْرْ');
});

test('speakPractice listens for Egyptian Arabic in Egyptian entries', () => {
  const ctx = ctxFor(ar);
  const el = speakPractice(ctx, ar.words.find((w) => w.dialect === 'Egyptian'));
  el.find((e) => e.getAttribute('aria-label') === 'Speak now').click();
  assert.equal(recognitions.at(-1).lang, 'ar-EG');
  ctx.leave();
  const msa = ctxFor(ar);
  speakPractice(msa, ar.words.find((w) => !w.dialect)).find((e) => e.getAttribute('aria-label') === 'Speak now').click();
  assert.equal(recognitions.at(-1).lang, 'ar-SA');
  msa.leave();
});
