// Checks css/styles.css in node, without a browser.
// - WCAG AA contrast for tinted chips/badges and the amber XP texts, in light and dark themes.
// - The layout rules that keep the Home quick links and ear-training pairs inside 320px screens.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const CSS_PATH = process.env.LISAN_CSS || new URL('../css/styles.css', import.meta.url);
const src = readFileSync(CSS_PATH, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

// ---------- Tiny CSS reader ----------

const decls = (body) => Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const LIGHT = decls(src.match(/^:root\s*\{([^}]*)\}/m)[1]);
const DARK = { ...LIGHT, ...decls(src.match(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([^}]*)\}/)[1]) };
const RULES = [...src.replace(/@media[^{]*\{\s*:root\s*\{[^}]*\}\s*\}/g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  .map((m) => [m[1].split(',').map((s) => s.trim().replace(/\s+/g, ' ')), m[2]]);

/** Last declared value of `name` for an exact selector (background counts as background-color). */
function prop(selector, name) {
  let val = null;
  for (const [sels, body] of RULES) {
    if (!sels.includes(selector)) continue;
    for (const m of body.matchAll(/(?:^|;)\s*([\w-]+)\s*:\s*([^;]+)/g)) {
      if (m[1] === name || (name === 'background-color' && m[1] === 'background')) val = m[2].trim();
    }
  }
  return val;
}

// ---------- Colour maths (sRGB, as browsers composite) ----------

const hex = (s) => {
  const m = s.slice(1);
  const v = m.length === 3 ? [...m].map((c) => c + c).join('') : m;
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)).concat(1);
};
const mix = (a, p, b) => {
  const alpha = a[3] * p + b[3] * (1 - p);
  if (!alpha) return [0, 0, 0, 0];
  return [0, 1, 2].map((i) => (a[i] * a[3] * p + b[i] * b[3] * (1 - p)) / alpha).concat(alpha);
};
const over = (top, bottom) => [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1);
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

function args(s) {
  const out = [];
  let depth = 0, cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && !depth) { out.push(cur.trim()); cur = ''; } else cur += ch;
  }
  return out.concat(cur.trim());
}

/** Evaluate #hex, var(), transparent and color-mix(in srgb, …) to [r, g, b, a]. */
function color(value, tokens) {
  const v = value.trim();
  if (v === 'transparent') return [0, 0, 0, 0];
  if (v.startsWith('#')) return hex(v);
  let m = v.match(/^var\((--[\w-]+)\)$/);
  if (m) return color(tokens[m[1]], tokens);
  m = v.match(/^color-mix\(in srgb,(.*)\)$/);
  if (!m) throw new Error(`cannot evaluate colour: ${v}`);
  const [a, b] = args(m[1]);
  const part = (s) => { const pm = s.match(/^(.*?)\s+([\d.]+)%$/); return pm ? [pm[1], Number(pm[2]) / 100] : [s, null]; };
  const [ca, pa] = part(a);
  const [cb, pb] = part(b);
  return mix(color(ca, tokens), pa ?? (pb != null ? 1 - pb : 0.5), color(cb, tokens));
}

// [text selector, own background selector, surfaces underneath]
const SURFACES = ['--bg', '--surface', '--surface-2'];
const PAIRS = [
  ['.session-xp', '.session-xp', SURFACES],
  ['.celebrate-xp', '.celebrate-xp', ['--surface']],
  ['.badge-tile.fresh .badge-date', '.badge-tile.unlocked', ['--surface']],
  ...['learning', 'familiar', 'known', 'mastered', 'reg-casual', 'reg-slang', 'reg-polite', 'reg-formal', 'level-A1', 'level-A2', 'level-B1']
    .map((c) => [`.badge.${c}`, `.badge.${c}`, SURFACES]),
  ...['bad', 'warn', 'good', 'easy'].map((c) => [`.rate.${c}`, `.rate.${c}`, ['--surface']]),
  ['.reveal.good .verdict', '.reveal.good', ['--surface']],
  ['.reveal.bad .verdict', '.reveal.bad', ['--surface']],
];

for (const [theme, tokens] of [['light', LIGHT], ['dark', DARK]]) {
  test(`badges and XP texts reach WCAG AA in the ${theme} theme`, () => {
    for (const [fgSel, bgSel, surfaces] of PAIRS) {
      const fgVal = prop(fgSel, 'color');
      const bgVal = prop(bgSel, 'background-color');
      assert.ok(fgVal && bgVal, `${fgSel} has a colour and a background`);
      for (const s of surfaces) {
        const bg = over(color(bgVal, tokens), color(`var(${s})`, tokens));
        const r = ratio(over(color(fgVal, tokens), bg), bg);
        assert.ok(r >= 4.5, `${fgSel} on ${s} (${theme}): ${r.toFixed(2)}:1 < 4.5:1`);
      }
    }
  });
}

test('amber texts use the themed --xp-ink token, not a fixed colour', () => {
  for (const sel of ['.session-xp', '.celebrate-xp', '.badge-tile.fresh .badge-date']) {
    assert.equal(prop(sel, 'color'), 'var(--xp-ink)', sel);
  }
  assert.ok(DARK['--xp-ink'] && DARK['--xp-ink'] !== LIGHT['--xp-ink'], 'dark theme overrides --xp-ink');
});

test('Home quick links and ear-training pairs can shrink to a 320px screen', () => {
  assert.match(prop('.quick', 'grid-template-columns'), /minmax\(0,\s*1fr\)/);
  assert.equal(prop('.pair-btn', 'min-width'), '0');
  assert.match(prop('.pair-btn', 'flex'), /^1 1 0/);
  assert.equal(prop('.pair-btn b', 'overflow-wrap'), 'anywhere');
  assert.equal(prop('.pair-btn small', 'overflow-wrap'), 'anywhere');
});

test('sentence-builder tiles wrap inside a 320px screen', () => {
  assert.equal(prop('.build-line', 'flex-wrap'), 'wrap');
  assert.equal(prop('.build-bank', 'flex-wrap'), 'wrap');
  assert.equal(prop('.tile', 'max-width'), '100%');
  assert.equal(prop('.tile', 'overflow-wrap'), 'anywhere');
  assert.equal(prop('.prompt-word.build-en', 'overflow-wrap'), 'anywhere');
});
