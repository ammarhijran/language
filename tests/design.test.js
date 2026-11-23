// Follow-ups of the navigation and design rework, without a browser:
// - Android back in a lesson asks "Leave this lesson?" like the ✕ (session.js sessionBack).
// - The Sync preview and result name ★ saved entries, so a code that only
//   changes favourites never reads "0 new, 0 updated".
// - Search: Egyptian romanisation (hesab, el-hesab) and word starts in Arabic and Japanese.
// - Readings in parts (kana · rōmaji) are split so no "·" ends a line.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// ---------- A tiny fake DOM (set up before the app modules load) ----------

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
    const style = {};
    this.style = { setProperty: (k, v) => { style[k] = v; }, removeProperty: (k) => { delete style[k]; } };
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
  dispatch(type) {
    const e = { type, target: this, currentTarget: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, stopPropagation() {} };
    (this.listeners[type] || []).forEach((fn) => fn(e));
    return e;
  }
  click() { return this.dispatch('click'); }
  adopt(n) { n = typeof n === 'string' ? new FakeText(n) : n; n.parentNode = this; return n; }
  append(...nodes) { for (const n of nodes) this.children.push(this.adopt(n)); }
  prepend(...nodes) { this.children.unshift(...nodes.map((n) => this.adopt(n))); }
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
  remove() { if (this.parentNode) { this.parentNode.children = this.parentNode.children.filter((c) => c !== this); this.parentNode = null; } }
  get isConnected() { return true; }
  closest() { return null; }
  get textContent() { return this.children.map((c) => c.textContent).join(''); }
  set textContent(t) { this.replaceChildren(String(t)); }
  focus() { document.activeElement = this; }
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
const body = new FakeEl('body');
globalThis.Node = FakeNode;
globalThis.document = {
  body,
  activeElement: body,
  createElement: (tag) => new FakeEl(tag),
  addEventListener() {},
  removeEventListener() {},
};
globalThis.window = globalThis;
globalThis.scrollTo = () => {};
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { userAgent: 'node' } });

const { languages } = await import('./all-languages.js');
const { runSession, sessionBack } = await import('../js/session.js');
const { mergedText, langChanges } = await import('../js/views/sync.js');
const { rankEntries, scoreEntry, foldEgyptian } = await import('../js/views/search.js');
const { readingText, scriptLang } = await import('../js/components.js');
const { h } = await import('../js/ui.js');
const { AGAIN } = await import('../js/srs.js');
const { tr, ja, ar } = languages;

const cls = (c) => (e) => e.classList.contains(c);
const text = (nodes) => [nodes].flat(Infinity).map((n) => (typeof n === 'string' ? n : n?.textContent ?? '')).join('');

function fakeCtx(lang) {
  const cleanups = [];
  const ctx = {
    lang,
    xp: 0,
    settings: { gameOn: true, autoplay: false },
    speech: { cancelSpeech() {} },
    say() { return Promise.resolve(); },
    onCleanup(fn) { cleanups.push(fn); },
    toast() {},
    inSession: false,
    game: { totalXp: () => ctx.xp, answer: (a) => { ctx.xp += a.rating === AGAIN ? 2 : 10; }, sessionEnd() {}, spoke() {} },
    leave() { cleanups.splice(0).forEach((fn) => fn()); },
  };
  return ctx;
}

// ---------- Android back in a lesson ----------

test('Android back in a lesson asks the ✕’s question first, and only when answers would be lost', () => {
  assert.equal(sessionBack(() => {}), false, 'no session: back does what it always does');
  const ctx = fakeCtx(tr);
  const ws = tr.words.filter((w) => w.cat === tr.categories[0].id).slice(0, 2);
  const root = runSession(ctx, {
    items: ws.map((word) => ({ word, type: 'meaning' })),
    onResult: () => null,
    onFinish: () => h('div', { class: 'summary' }),
    confirmExit: 'Leave this lesson? The words you’ve seen are kept.',
  });
  let left = 0;
  assert.equal(sessionBack(() => left++), false, 'nothing answered yet: just go back');
  const opt = root.findAll(cls('option')).find((o) => o.textContent.includes(ws[0].en));
  opt.click();
  root.find(cls('continue')).click();
  assert.equal(sessionBack(() => left++), true, 'answers would be lost: ask');
  const dialog = root.find((e) => e.getAttribute('role') === 'dialog');
  assert.ok(dialog, 'the same “Leave?” sheet as the ✕');
  assert.match(dialog.textContent, /Leave this lesson\?/);
  const leave = dialog.find((e) => e.tagName === 'A' && e.textContent === 'Leave');
  assert.equal(leave.click().defaultPrevented, true, 'Leave goes back instead of following the ✕’s link');
  assert.equal(left, 1);
  assert.ok(!root.find((e) => e.getAttribute('role') === 'dialog'), 'the question closes');
  ctx.leave();
  assert.equal(sessionBack(() => left++), false, 'the screen has gone: nothing to ask');
});

test('a session without a question (reviews, practice) never stops the back button', () => {
  const ctx = fakeCtx(tr);
  const ws = tr.words.slice(0, 2);
  const root = runSession(ctx, { items: ws.map((word) => ({ word, type: 'meaning' })), onResult: () => null, onFinish: () => h('div', {}) });
  root.findAll(cls('option'))[0].click();
  root.find(cls('continue')).click();
  assert.equal(sessionBack(() => {}), false);
  ctx.leave();
});

// ---------- Sync: saved entries ----------

test('sync: a code that only changes ★ saved entries says so, never “0 new, 0 updated”', () => {
  const favOnly = [{ code: 'tr', remoteWords: 0, added: 0, updated: 0, removed: 0, savedAdded: 3 }];
  assert.equal(mergedText(favOnly), '3 entries added to your saved phrases. ');
  assert.doesNotMatch(mergedText(favOnly), /0 new|0 updated/);
  const line = text(langChanges(favOnly[0]));
  assert.equal(line, '★ 3 saved');
  const both = [{ code: 'tr', remoteWords: 12, added: 2, updated: 1, removed: 0 }, { code: 'ja', remoteWords: 0, added: 0, updated: 0, removed: 0, savedAdded: 1, savedRemoved: 2 }];
  assert.equal(mergedText(both), '2 new and 1 updated words, 1 entry added to your saved phrases and 2 entries removed from them. ');
  assert.equal(text(langChanges(both[1])), '★ 1 saved, 2 unsaved');
  assert.equal(text(langChanges(both[0])), '12 words · 2 new · 1 updated');
  assert.equal(mergedText([{ code: 'tr', remoteWords: 3, added: 0, updated: 0, removed: 0 }]), 'Progress combined. ');
  // The learner's own words are named when the merge changes them.
  assert.equal(mergedText([], { added: 2, updated: 0, removed: 1 }), 'In My words 2 new, 1 removed. ');
  assert.equal(mergedText(favOnly, { added: 0, updated: 1, removed: 0 }), '3 entries added to your saved phrases and in My words 1 changed. ');
  assert.equal(mergedText([], { added: 0, updated: 0, removed: 0 }), 'Progress combined. ');
});

// ---------- Search ----------

test('search: Egyptian romanisation (e, o, ē, ō, el-) meets the course’s transliteration', () => {
  assert.equal(foldEgyptian(ar, 'hesab'), 'hisab');
  assert.equal(foldEgyptian(ar, 'el-ōtobēs'), 'al-ūtubīs');
  assert.equal(foldEgyptian(ar, 'حساب'), null, 'Arabic script is left alone');
  assert.equal(foldEgyptian(tr, 'hesap'), null, 'only for Arabic');
  const found = rankEntries(ar, 'hesab').map((r) => r.word.tr);
  assert.ok(found.includes('الْحِسَاب'), '“hesab” finds الحساب (the bill)');
  assert.ok(found.indexOf('الْحِسَاب') < 3);
  assert.equal(rankEntries(ar, 'el-hesab')[0].word.tr, 'الْحِسَاب');
  assert.equal(rankEntries(ar, 'maalesh')[0].word.tr, 'مَعْلِش');
});

test('search: the start of a word ranks above the inside of one in Arabic and Japanese too', () => {
  const bill = ar.words.find((w) => w.tr === 'الْحِسَاب');
  assert.equal(scoreEntry(ar, bill, 'حساب'), 3, 'after the article ال a word starts');
  assert.equal(scoreEntry(ar, bill, 'hisab'), 3, 'and after al- in transliteration');
  const ex = ja.words.find((w) => /飲みます/.test(w.tr) && w.kana);
  if (ex) assert.equal(Math.floor(scoreEntry(ja, ex, 'nomimasu')), 3, 'a rōmaji word inside a phrase');
  // The existing tiers are unchanged.
  assert.equal(scoreEntry(tr, tr.byId('çay') || tr.words.find((w) => w.tr === 'çay'), 'çay'), 0);
});

// ---------- Readings in parts ----------

test('a reading in parts keeps each part whole, with the separator for screen readers only', () => {
  const p = readingText('まいにち みずを のみます · mainichi mizu o nomimasu', 'reading small');
  assert.match(p.className, /rd-split/);
  assert.match(p.className, /rd-long/);
  const parts = p.findAll(cls('rd-part')).map((e) => e.textContent);
  assert.deepEqual(parts, ['まいにち みずを のみます', 'mainichi mizu o nomimasu']);
  assert.equal(p.find(cls('rd-sep')).textContent, ' · ');
  const one = readingText('marḥaban', 'reading');
  assert.equal(one.className, 'reading');
  assert.equal(one.textContent, 'marḥaban');
  assert.equal(readingText(null), null);
});

test('the kana of a reading is marked Japanese (its font), the rōmaji and transliterations are not', () => {
  const p = readingText('みず · mizu', 'reading');
  const [kana, romaji] = p.findAll(cls('rd-part'));
  assert.equal(kana.getAttribute('lang'), 'ja', 'kana in the Japanese font, not a (Chinese) fallback');
  assert.equal(romaji.getAttribute('lang'), null);
  assert.equal(readingText('ḥisāb', 'reading').getAttribute('lang'), null, 'Arabic transliteration is Latin');
  assert.equal(readingText('すし', 'reading').getAttribute('lang'), 'ja');
  assert.equal(scriptLang('食べる'), 'ja');
  assert.equal(scriptLang('حساب'), 'ar');
  assert.equal(scriptLang('taberu'), null);
});
