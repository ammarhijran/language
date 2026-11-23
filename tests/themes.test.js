// Themes (js/themes.js): light / dark / same as device, the colour of buttons
// and links, and the page background.
// - Every background keeps the contrast the stylesheets are tested for, and
//   every colour — the presets and any hue of "your own" — reads on all of them.
// - The standard look sets nothing on the page; other looks set only what differs.
// - The page applies the choice before the first paint (the inline script in
//   index.html) and the app applies it again, the same way.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import {
  ACCENTS, BACKGROUNDS, MODES, THEME_VARS, THEME_KEY, DARK_QUERY, CTA_TINT, CUSTOM_ACCENT, DEFAULT_ACCENT, DEFAULT_BACKGROUND,
  resolveMode, darkMedia, accentKey, backgroundKey, backgroundName, hueOf, accentFromHue, palette, themeVars, applyTheme,
  contrast, luminance, mix,
} from '../js/themes.js';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const tokens = (css) => Object.fromEntries([...css.match(/^:root\s*\{([^}]*)\}/m)[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const LIGHT = tokens(read('css/styles.css'));
const DARK = { ...LIGHT, ...tokens(read('css/dark.css')) };
const TOKENS = { light: LIGHT, dark: DARK };
const HEX = /^#[0-9a-f]{6}$/;
const EVERY_ACCENT = [
  ...Object.keys(ACCENTS).map((accent) => ({ accent })),
  ...Array.from({ length: 72 }, (_, i) => ({ accent: CUSTOM_ACCENT, accentHue: i * 5 })),
];

test('the default colour and background are the stylesheets’ own tokens', () => {
  for (const mode of ['light', 'dark']) {
    const T = TOKENS[mode];
    assert.deepEqual(BACKGROUNDS[DEFAULT_BACKGROUND][mode], [T['--bg'], T['--surface'], T['--surface-2'], T['--border']], `${mode} background`);
    assert.deepEqual(ACCENTS[DEFAULT_ACCENT][mode], [T['--action'], T['--action-hover'], T['--action-ink']], `${mode} colour`);
  }
  assert.equal(mix(LIGHT['--action'], 0.1, LIGHT['--surface']), LIGHT['--action-soft'], 'the tint is 10% of the colour over a card');
  assert.match(read('css/dark.css'), new RegExp(`\\.cta \\{\\s*background: color-mix\\(in srgb, var\\(--action\\) ${CTA_TINT * 100}%, var\\(--surface\\)\\)`), 'CTA_TINT is the dark call to action’s tint');
});

test('every background keeps the contrast the stylesheets are tested for', () => {
  for (const mode of ['light', 'dark']) {
    // Text colours are tested on the default surfaces: no light background may be
    // darker than the darkest of them, no dark one lighter than the lightest.
    const limit = luminance(BACKGROUNDS[DEFAULT_BACKGROUND][mode][2]);
    for (const [key, b] of Object.entries(BACKGROUNDS)) {
      const [bg, surface, surface2, border] = b[mode];
      assert.ok(b[mode].every((c) => HEX.test(c)), `${key} ${mode}: six-digit lower-case hex`);
      for (const c of [bg, surface, surface2]) {
        const l = luminance(c);
        assert.ok(mode === 'light' ? l >= limit - 1e-9 : l <= limit + 1e-9, `${key} ${mode}: ${c} is outside the tested range`);
      }
      assert.ok(contrast(surface2, surface) >= 1.08, `${key} ${mode}: insets (${surface2}) show on a card`);
      if (mode === 'dark') {
        assert.ok(contrast(surface, bg) >= 1.18, `${key}: dark cards stand apart from the page`);
        assert.ok(contrast(border, surface) >= 1.4, `${key}: dark borders stand apart from the cards`);
      } else {
        assert.ok(contrast(border, surface) >= 1.25, `${key}: light borders show on a card`);
      }
    }
  }
  assert.equal(backgroundName('plain', 'light'), 'White');
  assert.equal(backgroundName('plain', 'dark'), 'Black');
  assert.equal(BACKGROUNDS.plain.dark[0], '#000000', 'true black, for OLED screens');
});

test('every colour, preset or your own, reads on every background in both modes', () => {
  for (const mode of ['light', 'dark']) {
    const { '--text': text, '--muted': muted } = TOKENS[mode];
    for (const background of Object.keys(BACKGROUNDS)) {
      for (const choice of EVERY_ACCENT) {
        const who = `${choice.accent}${choice.accentHue ?? ''} on ${background} (${mode})`;
        const { surfaces, accent: [action, hover, ink], soft } = palette({ ...choice, background }, mode);
        for (const c of [action, hover, ink, soft]) assert.match(c, HEX, `${who}: ${c}`);
        for (const ground of [...surfaces.slice(0, 3), soft]) {
          assert.ok(contrast(action, ground) >= 4.5, `${who}: links ${action} on ${ground} are ${contrast(action, ground).toFixed(2)}:1`);
        }
        assert.ok(contrast(ink, action) >= 4.5, `${who}: button text ${ink} on ${action}`);
        assert.ok(contrast(ink, hover) >= 4.5, `${who}: button text ${ink} on the hover colour ${hover}`);
        assert.ok(contrast(text, soft) >= 7, `${who}: text on the tint ${soft}`);
        assert.ok(contrast(muted, soft) >= 4.5, `${who}: muted text on the tint ${soft}`);
        assert.notEqual(hover, action, `${who}: hovering changes the colour`);
        if (mode === 'dark') {
          const cta = mix(action, CTA_TINT, surfaces[1]);
          assert.ok(contrast(muted, cta) >= 4.5, `${who}: muted text on the tinted call to action ${cta} is ${contrast(muted, cta).toFixed(2)}:1`);
        }
      }
    }
  }
});

test('your own colour follows the hue', () => {
  const hueOfHex = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
    const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return (h * 60 + 360) % 360;
  };
  for (const mode of ['light', 'dark']) {
    for (const hue of [0, 45, 120, 200, 275, 330]) {
      const [action] = accentFromHue(hue, mode);
      const off = Math.abs(hueOfHex(action) - hue);
      assert.ok(Math.min(off, 360 - off) <= 2, `${mode} hue ${hue}: ${action}`);
    }
  }
  assert.notEqual(accentFromHue(0, 'light')[0], accentFromHue(180, 'light')[0]);
  // Out-of-range and missing hues fall back sensibly.
  assert.equal(hueOf({ accentHue: 400 }), 40);
  assert.equal(hueOf({ accentHue: -10 }), 350);
  assert.equal(hueOf({ accentHue: 'x' }), 200);
  assert.equal(hueOf({}), 200);
});

test('what the settings come to', () => {
  assert.deepEqual(MODES.map(([m]) => m), ['system', 'light', 'dark']);
  assert.equal(resolveMode('system', true), 'dark');
  assert.equal(resolveMode('system', false), 'light');
  assert.equal(resolveMode(undefined, true), 'dark');
  assert.equal(resolveMode('light', true), 'light');
  assert.equal(resolveMode('dark', false), 'dark');
  assert.equal(resolveMode('sepia', false), 'light', 'an unknown theme follows the device');
  assert.equal(darkMedia('system'), DARK_QUERY);
  assert.equal(darkMedia('dark'), 'all');
  assert.equal(darkMedia('light'), 'not all');
  assert.equal(darkMedia('nonsense'), DARK_QUERY);
  assert.equal(accentKey({ accent: 'teal' }), 'teal');
  assert.equal(accentKey({ accent: 'toString' }), 'indigo');
  assert.equal(accentKey({}), 'indigo');
  assert.equal(backgroundKey({ background: 'cool' }), 'cool');
  assert.equal(backgroundKey({ background: '__proto__' }), 'warm');
});

test('the standard look sets nothing; other looks set only what differs', () => {
  for (const mode of ['light', 'dark']) {
    assert.deepEqual(themeVars({}, mode), {});
    assert.deepEqual(themeVars({ theme: 'dark', accent: 'indigo', background: 'warm' }, mode), {});
    const colour = themeVars({ accent: 'teal' }, mode);
    assert.deepEqual(Object.keys(colour).sort(), ['--action', '--action-hover', '--action-ink', '--action-soft']);
    assert.equal(colour['--action'], ACCENTS.teal[mode][0]);
    const page = themeVars({ background: 'cool' }, mode);
    assert.deepEqual(Object.keys(page).sort(), ['--action-soft', '--bg', '--border', '--surface', '--surface-2']);
    assert.equal(page['--bg'], BACKGROUNDS.cool[mode][0]);
    const both = themeVars({ accent: CUSTOM_ACCENT, accentHue: 30, background: 'plain' }, mode);
    assert.deepEqual(Object.keys(both).sort(), [...THEME_VARS].sort());
    for (const v of Object.values(both)) assert.match(v, HEX);
    assert.equal(both['--action-soft'], mix(both['--action'], 0.1, both['--surface']), 'the tint is the colour over this background’s card');
  }
});

// ---------- On the page ----------

// The app listens for the device changing mode once, however many fake pages there are.
const listeners = [];

/** A fake page: the dark stylesheet, the loading screen's dark colours, the two theme-color metas. */
function page({ prefersDark = false, stored = {} } = {}) {
  const style = new Map();
  const els = {
    'dark-css': { media: DARK_QUERY },
    'boot-dark': { media: DARK_QUERY },
  };
  const metas = { dark: { content: '#121110' }, other: { content: '#c8102e' } };
  const local = new Map(Object.entries(stored));
  const mq = { matches: prefersDark, addEventListener: (type, fn) => listeners.push(fn) };
  const document = {
    documentElement: {
      dataset: {},
      style: { setProperty: (k, v) => style.set(k, v), removeProperty: (k) => style.delete(k) },
    },
    getElementById: (id) => els[id] || null,
    querySelector: (sel) => (sel.includes(':not([media])') ? metas.other : metas.dark),
    createElement: () => ({}),
    head: { appendChild() {} },
  };
  const localStorage = {
    getItem: (k) => (local.has(k) ? local.get(k) : null),
    setItem: (k, v) => local.set(k, String(v)),
    removeItem: (k) => local.delete(k),
  };
  return { document, localStorage, matchMedia: () => mq, mq, listeners, els, metas, style, local };
}

function withPage(p, fn) {
  const saved = ['document', 'localStorage', 'matchMedia'].map((k) => [k, Object.getOwnPropertyDescriptor(globalThis, k)]);
  for (const k of ['document', 'localStorage', 'matchMedia']) Object.defineProperty(globalThis, k, { configurable: true, writable: true, value: p[k] });
  try { return fn(); } finally {
    for (const [k, d] of saved) { if (d) Object.defineProperty(globalThis, k, d); else delete globalThis[k]; }
  }
}

test('applyTheme switches the dark stylesheet, sets the colours and remembers them', () => {
  const p = page({ prefersDark: false });
  withPage(p, () => {
    assert.equal(applyTheme({}), 'light');
    assert.equal(p.els['dark-css'].media, DARK_QUERY);
    assert.equal(p.style.size, 0, 'the standard look sets nothing');
    assert.equal(p.local.has(THEME_KEY), false);

    assert.equal(applyTheme({ theme: 'dark', accent: 'teal', background: 'plain' }), 'dark');
    assert.equal(p.els['dark-css'].media, 'all');
    assert.equal(p.els['boot-dark'].media, 'all', 'the loading screen goes dark with it');
    assert.equal(p.document.documentElement.dataset.theme, 'dark');
    assert.equal(p.style.get('--bg'), '#000000');
    assert.equal(p.style.get('--action'), ACCENTS.teal.dark[0]);
    assert.equal(p.metas.dark.content, '#000000');
    assert.equal(p.metas.other.content, '#000000', 'the toolbar is dark even on a light device');
    const kept = JSON.parse(p.local.get(THEME_KEY));
    assert.deepEqual(kept.dark, themeVars({ accent: 'teal', background: 'plain' }, 'dark'));
    assert.deepEqual(kept.light, themeVars({ accent: 'teal', background: 'plain' }, 'light'));

    assert.equal(applyTheme({ theme: 'light', accent: 'teal' }), 'light');
    assert.equal(p.els['dark-css'].media, 'not all');
    assert.equal(p.style.has('--bg'), false, 'the background went back to the stylesheet’s');
    assert.equal(p.style.get('--action'), ACCENTS.teal.light[0]);
    assert.equal(p.metas.dark.content, '#c8102e');

    applyTheme({});
    assert.equal(p.style.size, 0);
    assert.equal(p.local.has(THEME_KEY), false, 'nothing is kept for the standard look');
    assert.equal(p.metas.dark.content, '#121110');
    assert.equal(p.metas.other.content, '#c8102e');
  });
});

test('“Same as device” follows the device when it changes', () => {
  const p = page({ prefersDark: false });
  withPage(p, () => {
    assert.equal(applyTheme({ accent: 'rose' }), 'light');
    assert.equal(p.style.get('--action'), ACCENTS.rose.light[0]);
    p.mq.matches = true; // sunset
    for (const fn of p.listeners) fn();
    assert.equal(p.document.documentElement.dataset.theme, 'dark');
    assert.equal(p.style.get('--action'), ACCENTS.rose.dark[0], 'the colour changes to its dark shade');
    assert.equal(p.els['dark-css'].media, DARK_QUERY, 'the stylesheet follows the device by itself');
  });
});

/** Run index.html's first inline script (theme + language preload) on a fake page. */
function firstPaint(p) {
  const code = [...read('index.html').matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).find((c) => c.includes('dark-css'));
  assert.ok(code, 'index.html has the theme script');
  vm.runInNewContext(code, { document: p.document, localStorage: p.localStorage, window: { matchMedia: p.matchMedia }, matchMedia: p.matchMedia, JSON });
}

test('the page applies the theme before the first paint', () => {
  const html = read('index.html');
  const at = (s) => { const i = html.indexOf(s); assert.ok(i > 0, s); return i; };
  assert.ok(at('id="dark-css"') < at("getElementById('dark-css')"), 'the stylesheet is parsed before the script that switches it');
  assert.ok(at('id="boot-dark"') < at("getElementById('boot-dark')"));
  assert.ok(at('href="css/session.css"') < at('id="dark-css"'), 'dark rules come after the rules they override');

  const settings = { theme: 'dark', accent: 'green', background: 'cool' };
  const vars = { light: themeVars(settings, 'light'), dark: themeVars(settings, 'dark') };
  let p = page({ stored: { 'lisan:v1': JSON.stringify({ settings }), [THEME_KEY]: JSON.stringify(vars) } });
  firstPaint(p);
  assert.equal(p.els['dark-css'].media, 'all');
  assert.equal(p.els['boot-dark'].media, 'all');
  assert.deepEqual(Object.fromEntries(p.style), vars.dark);

  // Same as device: the media stays, the colours are those of the device's mode.
  p = page({ prefersDark: true, stored: { 'lisan:v1': JSON.stringify({ settings: { accent: 'green' } }), [THEME_KEY]: JSON.stringify(vars) } });
  firstPaint(p);
  assert.equal(p.els['dark-css'].media, DARK_QUERY);
  assert.equal(p.style.get('--action'), vars.dark['--action']);
  p = page({ stored: { 'lisan:v1': JSON.stringify({ settings: { theme: 'light' } }), [THEME_KEY]: JSON.stringify(vars) } });
  firstPaint(p);
  assert.equal(p.els['dark-css'].media, 'not all');
  assert.equal(p.style.get('--bg'), vars.light['--bg']);

  // Nothing stored, or rubbish: the page is left alone and only colours are ever set.
  p = page();
  firstPaint(p);
  assert.equal(p.els['dark-css'].media, DARK_QUERY);
  assert.equal(p.style.size, 0);
  p = page({ stored: { [THEME_KEY]: JSON.stringify({ light: { '--bg': 'url(https://x/)', 'background': '#000000', '--surface': '#ABCDEF;x', '--border': '#0a0b0c' } }) } });
  firstPaint(p);
  assert.deepEqual(Object.fromEntries(p.style), { '--border': '#0a0b0c' });
  p = page({ stored: { 'lisan:v1': '{not json', [THEME_KEY]: 'null' } });
  assert.doesNotThrow(() => firstPaint(p));
});

test('the loading screen shows a chosen background', () => {
  const boot = read('index.html').match(/<style>([\s\S]*?)<\/style>/)[1];
  assert.match(boot, /background: var\(--bg, var\(--boot-bg\)\)/, 'the page colour, or the built-in one if no stylesheet loaded');
});
