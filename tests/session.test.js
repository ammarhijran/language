// Sessions in focus mode and the answer sheet, without a browser: a tiny fake
// DOM stands in for the page. Checks that the app's bars are hidden while a
// session runs and come back after it (finish, ✕, leaving the screen), that
// every exercise puts its main action and, once answered, the verdict, the
// answer and Continue in the docked sheet, that Continue takes the focus and
// Enter continues, that XP is scored with the answer (once), and that a wrong
// answer buzzes where the device can. Also checks css/session.css.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// ---------- Fake browser (set up before the app modules load) ----------

class FakeNode {}
class FakeText extends FakeNode {
  constructor(text) { super(); this.data = text; this.parentNode = null; }
  get textContent() { return this.data; }
}
class FakeEl extends FakeNode {
  constructor(tag) {
    super();
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attrs = {};
    this.listeners = {};
    this.className = '';
    this.dataset = {};
    this.value = '';
    this.readOnly = false;
    const style = {};
    this.style = { setProperty: (k, v) => { style[k] = v; }, removeProperty: (k) => { delete style[k]; }, get: (k) => style[k] };
  }
  get classList() {
    const list = () => this.className.split(/\s+/).filter(Boolean);
    return {
      add: (...cs) => { for (const c of cs) if (!list().includes(c)) this.className = [...list(), c].join(' '); },
      remove: (...cs) => { this.className = list().filter((x) => !cs.includes(x)).join(' '); },
      contains: (c) => list().includes(c),
      toggle: (c, on = !list().includes(c)) => { if (on) this.classList.add(c); else this.classList.remove(c); return on; },
    };
  }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return this.attrs[k] ?? null; }
  removeAttribute(k) { delete this.attrs[k]; }
  toggleAttribute(k, on) { if (on) this.attrs[k] = ''; else delete this.attrs[k]; }
  get hidden() { return 'hidden' in this.attrs; }
  set hidden(v) { this.toggleAttribute('hidden', v); }
  get disabled() { return 'disabled' in this.attrs; }
  set disabled(v) { this.toggleAttribute('disabled', v); }
  set innerHTML(v) { this.html = v; }
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  removeEventListener(type, fn) { this.listeners[type] = (this.listeners[type] || []).filter((f) => f !== fn); }
  dispatch(type, extra = {}) {
    const e = { type, target: this, currentTarget: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, stopPropagation() {}, ...extra };
    (this.listeners[type] || []).forEach((fn) => fn(e));
    return e;
  }
  click() { return this.dispatch('click'); }
  adopt(n) { n = typeof n === 'string' ? new FakeText(n) : n; n.parentNode?.children && n.parentNode !== this && n.remove?.(); n.parentNode = this; return n; }
  append(...nodes) { for (const n of nodes) this.children.push(this.adopt(n)); }
  prepend(...nodes) { this.children.unshift(...nodes.map((n) => this.adopt(n))); }
  replaceChildren(...nodes) { this.children.forEach((c) => { c.parentNode = null; }); this.children = []; this.append(...nodes); }
  remove() { if (this.parentNode) { this.parentNode.children = this.parentNode.children.filter((c) => c !== this); this.parentNode = null; } }
  contains(n) { for (let x = n; x; x = x.parentNode) if (x === this) return true; return false; }
  get textContent() { return this.children.map((c) => c.textContent).join(''); }
  set textContent(t) { this.replaceChildren(String(t)); }
  focus() { document.activeElement = this; }
  blur() { if (document.activeElement === this) document.activeElement = document.body; }
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
  findAll(pred, out = []) {
    for (const c of this.children) {
      if (!(c instanceof FakeEl)) continue;
      if (pred(c)) out.push(c);
      c.findAll(pred, out);
    }
    return out;
  }
}

const docListeners = [];
const body = new FakeEl('body');
globalThis.Node = FakeNode;
globalThis.document = {
  body,
  activeElement: body,
  createElement: (tag) => new FakeEl(tag),
  addEventListener: (type, fn, capture = false) => docListeners.push({ type, fn, capture: !!capture }),
  removeEventListener: (type, fn, capture = false) => {
    const i = docListeners.findIndex((l) => l.type === type && l.fn === fn && l.capture === !!capture);
    if (i >= 0) docListeners.splice(i, 1);
  },
};
globalThis.window = globalThis;
globalThis.scrollTo = () => {};
const buzzes = [];
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { userAgent: 'node', vibrate: (p) => { buzzes.push(p); return true; } } });
globalThis.SpeechRecognition = class {
  start() { setTimeout(() => this.onresult?.({ results: [[{ transcript: globalThis.heard ?? '', confidence: 0.9 }]] }), 1); }
  stop() {}
  abort() {}
};

/** A key pressed with focus on `target` (capture listeners first, as in a browser). */
function press(key, target = document.activeElement) {
  let stopped = false;
  const e = { key, target, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, stopPropagation() { stopped = true; } };
  for (const l of [...docListeners].sort((a, b) => b.capture - a.capture)) {
    if (l.type !== 'keydown') continue;
    if (stopped && !l.capture) break;
    l.fn(e);
  }
  return e;
}

const { languages } = await import('./all-languages.js');
const { runSession, FOCUS_CLASS } = await import('../js/session.js');
const { EXERCISES, buzzWrong } = await import('../js/exercises.js');
const { GOOD, AGAIN } = await import('../js/srs.js');
const { phraseSentence } = await import('../js/sentences.js');
const { tr, ja, ar } = languages;

const wait = (ms = 5) => new Promise((r) => setTimeout(r, ms));
const cls = (c) => (e) => e.classList.contains(c);
const byText = (el, text) => el.find((e) => e.tagName === 'BUTTON' && e.textContent.includes(text));
const sheetOf = (el) => el.find(cls('answer-sheet'));

function fakeCtx(lang, { gameOn = true } = {}) {
  const cleanups = [];
  const ctx = {
    lang,
    said: [],
    answers: [],
    xp: 0,
    settings: { gameOn, autoplay: false },
    speech: { cancelSpeech() {} },
    say(text) { this.said.push(text); return Promise.resolve(); },
    onCleanup(fn) { cleanups.push(fn); },
    toast() {},
    inSession: false,
    game: {
      totalXp: () => ctx.xp,
      answer: (a) => { ctx.answers.push(a); ctx.xp += a.rating === AGAIN ? 2 : 10; },
      sessionEnd() {},
      spoke() {},
    },
    /** The screen goes away (what app.js render() does with its cleanups). */
    leave() { cleanups.splice(0).forEach((fn) => fn()); },
  };
  return ctx;
}

/** Exercise context: cleanups collected per card, as session.js does. */
function exCtx(lang) {
  const c = fakeCtx(lang);
  c.verdicts = [];
  c.onAnswer = (r) => c.verdicts.push(r);
  return c;
}

const words = (lang, n = 3) => lang.words.filter((w) => w.cat === lang.categories[0].id).slice(0, n);

/** The option of a choice card that is right (or wrong): by its meaning, or its word for 'produce'. */
function option(el, word, right, lang = tr) {
  const label = (o) => o.find((e) => e.getAttribute('lang') === lang.code)?.textContent ?? o.find(cls('option-label')).textContent;
  return el.findAll(cls('option')).find((o) => [word.en, word.tr].includes(label(o)) === right);
}

// ---------- Focus mode ----------

test('a session hides the app’s bars while it runs and brings them back on its summary', async () => {
  body.className = '';
  const ctx = fakeCtx(tr);
  const [w] = words(tr, 1);
  const root = runSession(ctx, {
    items: [{ word: w, type: 'meaning' }],
    onResult: () => null,
    onFinish: () => h('div', 'summary'),
  });
  assert.ok(body.classList.contains(FOCUS_CLASS), 'body.in-session while the session runs');
  assert.ok(ctx.inSession);
  option(root, w, true).click();
  sheetOf(root).find(cls('continue')).click();
  assert.ok(root.find(cls('summary')), 'summary shown');
  assert.ok(!body.classList.contains(FOCUS_CLASS), 'bars back on the summary');
  ctx.leave();
  assert.ok(!body.classList.contains(FOCUS_CLASS));
});

test('leaving mid-session (✕, back button, any link) ends focus mode', () => {
  body.className = 'bare';
  const ctx = fakeCtx(ja);
  runSession(ctx, { items: words(ja, 2).map((word) => ({ word, type: 'produce' })), onResult: () => null, onFinish: () => h('div', 'summary') });
  assert.ok(body.classList.contains(FOCUS_CLASS));
  ctx.leave(); // app.js runs the screen's cleanups on every route change
  assert.ok(!body.classList.contains(FOCUS_CLASS));
  assert.ok(body.classList.contains('bare'), 'other body classes are left alone');
  assert.equal(ctx.inSession, false);
  body.className = '';
});

test('the ✕ leaves at once, unless the session asks first and answers would be lost', () => {
  const plain = fakeCtx(tr);
  const r1 = runSession(plain, { items: words(tr, 2).map((word) => ({ word, type: 'meaning' })), onResult: () => null, onFinish: () => h('div', 's') });
  const exit1 = r1.find(cls('session-exit'));
  option(r1, words(tr, 2)[0], true).click();
  r1.find(cls('continue')).click();
  assert.equal(exit1.click().defaultPrevented, false, 'no question without confirmExit');
  plain.leave();

  const ctx = fakeCtx(tr);
  const ws = words(tr, 2);
  const root = runSession(ctx, {
    items: ws.map((word) => ({ word, type: 'meaning' })),
    onResult: () => null,
    onFinish: () => h('div', 's'),
    confirmExit: 'Leave? Your answers so far won’t be saved.',
  });
  const exit = root.find(cls('session-exit'));
  assert.equal(exit.click().defaultPrevented, false, 'nothing answered yet: just leave');
  option(root, ws[0], true).click();
  root.find(cls('continue')).click();
  assert.equal(exit.click().defaultPrevented, true, 'something would be lost: ask');
  const dialog = root.find((e) => e.getAttribute('role') === 'dialog');
  assert.ok(dialog);
  assert.equal(document.activeElement, byText(dialog, 'Keep going'));
  // Modal: the card’s shortcuts (1–4 answer) don’t reach the card underneath.
  press('1', document.activeElement);
  assert.equal(sheetOf(root), null, 'the second card is still unanswered');
  press('Escape');
  assert.ok(!root.find((e) => e.getAttribute('role') === 'dialog'), 'Escape keeps going');
  ctx.leave();
});

test('the XP chip waits for the first XP; XP and combo come with the answer, scored once', () => {
  const ctx = fakeCtx(tr);
  const ws = words(tr, 2);
  const results = [];
  const root = runSession(ctx, { items: ws.map((word) => ({ word, type: 'meaning' })), onResult: (item, r) => { results.push(r); return null; }, onFinish: () => h('div', 's') });
  const chip = root.find(cls('session-xp'));
  assert.equal(chip.dataset.xp, '0', 'chip starts at 0 (hidden by css until XP arrives)');
  option(root, ws[0], false).click();
  assert.equal(ctx.answers.length, 1, 'scored as soon as the answer is shown');
  assert.equal(ctx.answers[0].rating, AGAIN);
  assert.equal(results.length, 0, 'the item itself is only done on Continue');
  root.find(cls('continue')).click();
  assert.equal(ctx.answers.length, 1, 'not scored again on Continue');
  assert.equal(results[0].rating, AGAIN);
  ctx.leave();
});

// ---------- The answer sheet, per exercise ----------

test('choice: the answer opens a sheet with the verdict, the answer and Continue, which takes the focus', async () => {
  for (const type of ['meaning', 'produce', 'listen']) {
    for (const right of [true, false]) {
      const ctx = exCtx(tr);
      const [w] = words(tr, 1);
      let done = null;
      const el = EXERCISES[type](ctx, w, (r) => { done = r; });
      assert.equal(sheetOf(el), null, `${type}: no sheet before answering`);
      const opt = option(el, w, right);
      opt.click();
      const sheet = sheetOf(el);
      assert.ok(sheet.classList.contains(right ? 'good' : 'bad'), `${type}: tinted ${right ? 'good' : 'bad'}`);
      assert.ok(sheet.find(cls('verdict')), 'verdict with its icon');
      assert.ok(sheet.textContent.includes(w.tr) && sheet.textContent.includes(w.en), 'the right answer');
      const cont = sheet.find(cls('continue'));
      assert.equal(document.activeElement, cont, 'focus moves to Continue');
      assert.ok(opt.classList.contains('picked'));
      assert.ok(opt.find(cls('mark')), 'the chosen option gets ✓ / ✕');
      assert.deepEqual(ctx.verdicts, [{ correct: right, rating: right ? GOOD : AGAIN }]);
      // Screen readers hear right / wrong from the card's live region.
      await wait(200);
      const live = el.find((e) => e.getAttribute('aria-live') === 'polite' && e.classList.contains('session-sr'));
      assert.match(live.textContent, right ? /^Right!/ : /^Not quite/);
      assert.ok(live.textContent.includes(w.en));
      press('Enter', body);
      assert.deepEqual(done, { correct: right, rating: right ? GOOD : AGAIN }, 'Enter continues');
      ctx.leave?.();
    }
  }
});

test('a wrong answer buzzes briefly where the device can; a right one doesn’t; no Vibration API is fine', () => {
  buzzes.length = 0;
  const ctx = exCtx(tr);
  const [w] = words(tr, 1);
  const el = EXERCISES.meaning(ctx, w, () => {});
  option(el, w, true).click();
  assert.equal(buzzes.length, 0);
  const ctx2 = exCtx(tr);
  const el2 = EXERCISES.meaning(ctx2, w, () => {});
  option(el2, w, false).click();
  ctx2.leave();
  assert.equal(buzzes.length, 1);
  assert.ok(buzzes[0] <= 50, 'very short');
  const nav = globalThis.navigator;
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { userAgent: 'node' } });
  assert.doesNotThrow(() => buzzWrong());
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { userAgent: 'node', vibrate() { throw new Error('blocked'); } } });
  assert.doesNotThrow(() => buzzWrong());
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: nav });
  ctx.leave?.();
});

test('type: Check stays under the field; the verdict and Continue come up in the sheet', () => {
  for (const right of [true, false]) {
    const ctx = exCtx(tr);
    const [w] = words(tr, 1);
    let done = null;
    const el = EXERCISES.type(ctx, w, (r) => { done = r; });
    const form = el.find((e) => e.tagName === 'FORM');
    const input = el.find((e) => e.tagName === 'INPUT');
    assert.ok(byText(form, 'Check'), 'Check is in the form, next to the field');
    input.value = right ? w.tr : 'qqqq';
    form.dispatch('submit');
    const sheet = sheetOf(el);
    assert.ok(sheet.classList.contains(right ? 'good' : 'bad'));
    assert.ok(byText(form, 'Check').hidden, 'Check makes way for Continue');
    assert.ok(input.readOnly && input.classList.contains(right ? 'right' : 'wrong'));
    assert.equal(document.activeElement, sheet.find(cls('continue')), 'focus leaves the field (the keyboard closes)');
    assert.equal(ctx.verdicts.length, 1);
    press('Enter', body);
    assert.equal(done.correct, right);
    ctx.leave?.();
  }
});

test('build: Skip and Check sit on the bar, which becomes the answer sheet', () => {
  const ctx = exCtx(tr);
  const phrase = tr.words.find((w) => w.tr.split(' ').length >= 3 && phraseSentence(tr, w));
  let done = null;
  const el = EXERCISES.build(ctx, phrase, (r) => { done = r; });
  const bar = sheetOf(el);
  assert.ok(bar.classList.contains('neutral'));
  assert.ok(byText(bar, 'Check') && byText(bar, 'Skip'));
  byText(bar, 'Check').click();
  assert.match(bar.textContent, /Use all the words first/, 'the hint shows on the bar, above Check');
  const bank = el.find(cls('build-bank'));
  for (const t of bank.findAll(cls('tile'))) t.click();
  byText(bar, 'Check').click();
  assert.equal(sheetOf(el), bar, 'the same bar');
  assert.ok(bar.classList.contains('good') || bar.classList.contains('bad'));
  assert.ok(bar.find(cls('continue')));
  assert.equal(document.activeElement, bar.find(cls('continue')));
  press('Enter', body);
  assert.ok(done && 'correct' in done);
  ctx.leave?.();
});

test('flashcard: Show answer on the bar, then the rating row in it', () => {
  const ctx = exCtx(ja);
  const [w] = words(ja, 1);
  let done = null;
  const el = EXERCISES.flashcard(ctx, w, (r) => { done = r; });
  const bar = sheetOf(el);
  byText(bar, 'Show answer').click();
  const row = bar.find(cls('rating-row'));
  assert.ok(row, 'ratings in the bar');
  assert.equal(document.activeElement, row, 'the labelled rating group takes the focus');
  assert.equal(row.getAttribute('aria-label'), 'How well did you remember it?');
  byText(row, 'Good').click();
  assert.deepEqual(done, { correct: true, rating: GOOD });
});

test('intro: Already learned and Next word on the bar; Enter goes on', () => {
  const ctx = exCtx(ar);
  const [w] = words(ar, 1);
  let done = null;
  const el = EXERCISES.intro(ctx, w, (r) => { done = r; }, { index: 4, total: 5 });
  const bar = sheetOf(el);
  assert.ok(byText(bar, 'Already learned'));
  assert.ok(byText(bar, 'Start quick check'));
  press('Enter', body);
  assert.deepEqual(done, { intro: true });
  ctx.leave?.();
});

test('speak: the best score tints the sheet and enables Continue', async () => {
  document.activeElement = document.body; // what a browser does when the last card's button went away
  const ctx = exCtx(tr);
  const [w] = words(tr, 1);
  let done = null;
  const el = EXERCISES.speak(ctx, w, (r) => { done = r; });
  const bar = sheetOf(el);
  const cont = bar.find(cls('continue'));
  assert.ok(cont.disabled, 'Continue waits for an attempt');
  globalThis.heard = w.tr;
  el.find(cls('mic-btn')).click();
  await wait(20);
  assert.ok(bar.classList.contains('good'), bar.className);
  assert.match(bar.find(cls('verdict')).textContent, /Well said!.*100%/);
  assert.ok(!cont.disabled);
  assert.equal(document.activeElement, cont, 'said well: the focus moves to Continue');
  cont.click();
  assert.deepEqual(done, { correct: true, rating: GOOD });
  ctx.leave();
});

test('speak: not said well, the focus stays on the mic to try again; Enter goes on', async () => {
  const ctx = exCtx(tr);
  const cleanups = [];
  ctx.onCleanup = (fn) => cleanups.push(fn);
  const [w] = words(tr, 1);
  let done = null;
  const el = EXERCISES.speak(ctx, w, (r) => { done = r; });
  const mic = el.find(cls('mic-btn'));
  press('Enter', document.body);
  assert.equal(done, null, 'Enter waits for an attempt');
  globalThis.heard = 'qqq zzz';
  mic.focus();
  mic.click();
  await wait(20);
  assert.ok(sheetOf(el).classList.contains('bad'));
  assert.equal(document.activeElement, mic, 'the mic keeps the focus');
  press('Enter', document.body);
  assert.deepEqual(done, { correct: false, rating: AGAIN });
  cleanups.forEach((f) => f());
  document.activeElement = document.body;
});

// ---------- css/session.css ----------

const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
const css = strip(readFileSync(new URL('../css/session.css', import.meta.url), 'utf8'));
const base = strip(readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8'));

test('focus mode hides the top bar and tab bar, and the head stays at the top below the notch', () => {
  assert.match(css, /body\.in-session \.topbar,\s*body\.in-session \.tabbar[^{]*\{\s*display:\s*none/);
  assert.match(css, /body\.in-session \.session-head\s*\{[^}]*position:\s*sticky;\s*top:\s*0[^}]*env\(safe-area-inset-top\)/);
  assert.match(css, /\.session-xp\[data-xp="0"\]\s*\{\s*display:\s*none/);
});

test('the sheet is fixed to the bottom on phones, clear of the home indicator, with the session padded by its height', () => {
  assert.match(css, /\.answer-sheet\s*\{[^}]*position:\s*fixed;[^}]*bottom:\s*0[^}]*env\(safe-area-inset-bottom\)/);
  assert.match(css, /\.session\s*\{\s*padding-bottom:\s*calc\(var\(--sheet-h/);
  // A long answer scrolls inside the sheet: on a small phone the head and a
  // strip of the card (the options answered) stay in view above it.
  assert.match(css, /\.answer-sheet\s*\{[^}]*max-height:\s*clamp\(50dvh,\s*100dvh - 15rem,\s*78dvh\)/);
  assert.match(css, /\.answer-sheet \.sheet-body\s*\{[^}]*overflow-y:\s*auto/);
});

/** Selectors of a rule, split on the commas that aren't inside :is(…). */
const selectors = (text) => {
  const out = [];
  let depth = 0, cur = '';
  for (const ch of text) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && !depth) { out.push(cur.trim()); cur = ''; } else cur += ch;
  }
  return out.concat(cur.trim()).filter(Boolean);
};
const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sels: selectors(m[1].trim()), body: m[2] }));

test('every animation in sessions stops for reduced motion', () => {
  const at = css.indexOf('@media (prefers-reduced-motion: reduce)');
  assert.ok(at > 0, 'has a reduced-motion block');
  const block = css.slice(at);
  const stopRule = rules.find((r) => block.includes(r.body) && /animation:\s*none/.test(r.body));
  const stopped = stopRule.sels.map((s) => s.split(' ').pop());
  const animated = rules.filter((r) => /(^|;)\s*animation(-name)?\s*:/.test(r.body) && !/none/.test(r.body))
    .flatMap((r) => r.sels).filter((s) => !/^(from|to|\d)/.test(s));
  assert.ok(animated.length >= 6);
  for (const sel of animated) {
    const target = sel.replace(/:is\([^)]*\)/g, '').split(' ').pop();
    assert.ok(stopped.some((c) => new RegExp(`\\${c}(?![\\w-])`).test(target)), `${sel} stops for reduced motion`);
  }
  assert.match(block, /\.session-meter \.meter-fill\s*\{\s*transition:\s*none/);
});

// Colour maths (sRGB), as in styles.test.js.
const tokens = (src, re) => Object.fromEntries([...src.match(re)[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const LIGHT = tokens(base, /^:root\s*\{([^}]*)\}/m);
const DARK = { ...LIGHT, ...tokens(base, /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([^}]*)\}/) };
const hex = (s) => [0, 2, 4].map((i) => parseInt(s.slice(1).slice(i, i + 2), 16));
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (c) => { const [r, g, b] = hex(c); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const decl = (sel, prop) => {
  let val = null;
  for (const r of rules) {
    if (!r.sels.includes(sel)) continue;
    const d = r.body.match(new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`));
    if (d) val = d[1].trim();
  }
  return val;
};
const tok = (v, T) => { const m = v.match(/^var\((--[\w-]+)\)$/); return m ? tok(T[m[1]], T) : v; };

// [text or icon, its background, minimum ratio]: text 4.5:1, icons (graphics) 3:1.
const PAIRS = [
  ['.answer-sheet.good .continue', '.answer-sheet.good .continue', 4.5],
  ['.answer-sheet:is(.bad, .warn) .continue', '.answer-sheet:is(.bad, .warn) .continue', 4.5],
  ['.answer-sheet.good .verdict', '.answer-sheet.good', 4.5],
  ['.answer-sheet.bad .verdict', '.answer-sheet.bad', 4.5],
  ['.answer-sheet.warn .verdict', '.answer-sheet.warn', 4.5],
  ['.answer-sheet .verdict > .icon', '.answer-sheet.good .verdict > .icon', 3],
  ['.answer-sheet .verdict > .icon', '.answer-sheet.bad .verdict > .icon', 3],
  ['.answer-sheet .verdict > .icon', '.answer-sheet.warn .verdict > .icon', 3],
  ['.option .mark', '.option .mark.yes', 3],
  ['.option .mark', '.option .mark.no', 3],
];

for (const [theme, T] of [['light', LIGHT], ['dark', DARK]]) {
  test(`Continue, verdicts, their icons and the option marks are readable in the ${theme} theme`, () => {
    for (const [fgSel, bgSel, min] of PAIRS) {
      const fg = decl(fgSel, 'color');
      const bg = decl(bgSel, 'background');
      assert.ok(fg && bg, `${fgSel} / ${bgSel} declared`);
      const r = ratio(tok(fg, T), tok(bg, T));
      assert.ok(r >= min, `${fgSel} on ${bgSel} (${theme}): ${r.toFixed(2)}:1 < ${min}:1`);
    }
  });
}

// ---------- helpers ----------

function h(tag, text) {
  const el = document.createElement(tag);
  el.className = text;
  return el;
}
