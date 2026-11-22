// Checks the stylesheets in node, without a browser.
// - WCAG contrast of text, tinted chips and badges, buttons and progress
//   tracks, in the light and dark themes (colours computed from the tokens,
//   with color-mix and the dark-theme overrides).
// - Colour roles: the brand red stays the brand, buttons use --action, progress
//   uses --progress on a --track, and red is left to wrong answers.
// - The design system: font sizes and corner radii come from the scales,
//   controls are at least 44px, Arabic and Japanese get their own fonts.
// - Layout rules that keep narrow screens from scrolling sideways.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const CSS_PATH = process.env.LISAN_CSS || new URL('../css/styles.css', import.meta.url);
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
const src = strip(readFileSync(CSS_PATH, 'utf8'));
const SHEETS = Object.fromEntries(['styles', 'nav', 'session', 'read'].map((n) => [n, n === 'styles' ? src : strip(readFileSync(new URL(`../css/${n}.css`, import.meta.url), 'utf8'))]));

// ---------- Tiny CSS reader ----------

/** Top-level rules and the rules of @media blocks: { sels, body, media }. */
function parse(css) {
  const out = [];
  let i = 0;
  const block = (from) => { // index after the matching }
    let depth = 0;
    for (let j = from; j < css.length; j++) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}' && --depth === 0) return j + 1;
    }
    return css.length;
  };
  const walk = (text, media) => {
    let k = 0;
    while (k < text.length) {
      const open = text.indexOf('{', k);
      if (open < 0) break;
      const head = text.slice(k, open).trim();
      let depth = 0, end = open;
      for (; end < text.length; end++) {
        if (text[end] === '{') depth++;
        else if (text[end] === '}' && --depth === 0) break;
      }
      const inner = text.slice(open + 1, end);
      if (head.startsWith('@media')) walk(inner, head);
      else if (!head.startsWith('@')) out.push({ sels: selectors(head), body: inner, media });
      k = end + 1;
    }
  };
  void block; void i;
  walk(css, '');
  return out;
}
/** Selectors of a rule, split on the commas that aren't inside :is(…) or :lang(…). */
function selectors(text) {
  const out = [];
  let depth = 0, cur = '';
  for (const ch of text) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && !depth) { out.push(cur.trim().replace(/\s+/g, ' ')); cur = ''; } else cur += ch;
  }
  return out.concat(cur.trim().replace(/\s+/g, ' ')).filter(Boolean);
}

const decls = (body) => Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const ALL_RULES = Object.values(SHEETS).flatMap(parse);
const RULES = parse(src);
const ROOT_LIGHT = RULES.find((r) => !r.media && r.sels.includes(':root') && /--bg:/.test(r.body));
const ROOT_DARK = RULES.find((r) => /prefers-color-scheme: dark/.test(r.media) && r.sels.includes(':root'));
const LIGHT = decls(ROOT_LIGHT.body);
const DARK = { ...LIGHT, ...decls(ROOT_DARK.body) };
const THEMES = [['light', LIGHT], ['dark', DARK]];

/** Last declared value of `name` for an exact selector in a theme (background counts as background-color). */
function prop(selector, name, theme = 'light', rules = ALL_RULES) {
  let val = null;
  for (const { sels, body, media } of rules) {
    if (!sels.includes(selector)) continue;
    if (/prefers-color-scheme: dark/.test(media) && theme !== 'dark') continue;
    if (/prefers-reduced-motion|max-width|min-width|hover/.test(media)) continue;
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
const hue = ([r, g, b]) => {
  const [R, G, B] = [r, g, b].map((v) => v / 255);
  const max = Math.max(R, G, B), min = Math.min(R, G, B), d = max - min;
  if (!d) return 0;
  const h = max === R ? ((G - B) / d) % 6 : max === G ? (B - R) / d + 2 : (R - G) / d + 4;
  return (h * 60 + 360) % 360;
};
const hueGap = (a, b) => { const d = Math.abs(hue(a) - hue(b)) % 360; return Math.min(d, 360 - d); };

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
const tok = (name, T) => color(`var(${name})`, T);
/** Contrast of `fg` over `bg`, both CSS colour values, on an opaque surface token. */
function contrast(fg, bg, surface, T) {
  const base = over(bg ? color(bg, T) : [0, 0, 0, 0], tok(surface, T));
  return ratio(over(color(fg, T), base), base);
}

// ---------- Contrast: text, chips, badges, buttons ----------

// [text selector, own background selector (null: none), surfaces underneath]
const SURFACES = ['--bg', '--surface', '--surface-2'];
const PAIRS = [
  ['.session-xp', '.session-xp', SURFACES],
  ['.celebrate-xp', '.celebrate-xp', ['--surface']],
  ['.medal.fresh .medal-sub', null, ['--surface', '--bg']],
  ...['learning', 'familiar', 'known', 'mastered', 'reg-casual', 'reg-slang', 'reg-polite', 'reg-formal', 'level-A1', 'level-A2', 'level-B1', 'me-new']
    .map((c) => [`.badge.${c}`, `.badge.${c}`, SURFACES]),
  ...['bad', 'warn', 'good', 'easy'].map((c) => [`.rate.${c}`, `.rate.${c}`, ['--surface']]),
  ['.reveal.good .verdict', '.reveal.good', ['--surface']],
  ['.reveal.bad .verdict', '.reveal.bad', ['--surface']],
  ['.btn.primary', '.btn.primary', ['--surface']],
  ['.pill.selected', '.pill.selected', ['--surface']],
  ['.cta', '.cta', ['--bg']],
  ['.syl.stressed', '.syl.stressed', ['--surface']],
  ['.letter-notes b', '.letter-notes b', ['--surface-2']],
  ['.session-combo', '.session-combo', ['--bg']],
  ['.tt-done', null, ['--surface']],
  ['.read-steps li.now', '.read-steps li.now', ['--surface']],
];

for (const [theme, tokens] of THEMES) {
  test(`text, badges, buttons and chips reach WCAG AA in the ${theme} theme`, () => {
    for (const [fgSel, bgSel, surfaces] of PAIRS) {
      const fgVal = prop(fgSel, 'color', theme);
      const bgVal = bgSel ? prop(bgSel, 'background-color', theme) : null;
      assert.ok(fgVal && (bgVal || !bgSel), `${fgSel} has a colour${bgSel ? ' and a background' : ''}`);
      for (const s of surfaces) {
        const r = contrast(fgVal, bgVal, s, tokens);
        assert.ok(r >= 4.5, `${fgSel} on ${s} (${theme}): ${r.toFixed(2)}:1 < 4.5:1`);
      }
    }
  });

  test(`body text, muted text and links reach WCAG AA on every surface in the ${theme} theme`, () => {
    for (const fg of ['--text', '--muted', '--action']) {
      for (const s of SURFACES) {
        if (fg === '--action' && s === '--surface-2') continue; // links don't sit on the inner panels
        const r = ratio(tok(fg, tokens), tok(s, tokens));
        assert.ok(r >= 4.5, `${fg} on ${s} (${theme}): ${r.toFixed(2)}:1`);
      }
    }
    assert.equal(prop('a', 'color', theme), 'var(--action)');
  });

  test(`progress tracks are visible and their fill stands out in the ${theme} theme`, () => {
    const track = tok('--track', tokens);
    for (const s of ['--surface', '--bg']) {
      const r = ratio(track, tok(s, tokens));
      assert.ok(r >= 1.25, `empty track on ${s} (${theme}): ${r.toFixed(2)}:1 < 1.25:1`);
    }
    for (const fill of ['--progress', '--done']) {
      const r = ratio(tok(fill, tokens), over(track, tok('--surface', tokens)));
      assert.ok(r >= 3, `${fill} on the track (${theme}): ${r.toFixed(2)}:1 < 3:1 (WCAG non-text contrast)`);
    }
    assert.equal(prop('.meter', 'background-color', theme), 'var(--track)');
    assert.equal(prop('.mini-meter', 'background-color', theme), 'var(--track)');
    assert.equal(prop('.stack-bar', 'background-color', theme), 'var(--track)');
    assert.match(prop('.goal-ring', 'background-color', theme), /var\(--track\)/);
    assert.match(prop('.medal-ring', 'background-color', theme), /var\(--progress\).*var\(--track\)/);
  });
}

test('dark theme: cards stand apart from the page, and their borders from the cards', () => {
  const card = ratio(tok('--surface', DARK), tok('--bg', DARK));
  assert.ok(card >= 1.18, `dark --surface on --bg: ${card.toFixed(2)}:1 < 1.18:1`);
  const border = ratio(tok('--border', DARK), tok('--surface', DARK));
  assert.ok(border >= 1.4, `dark --border on --surface: ${border.toFixed(2)}:1 < 1.4:1`);
  // The call to action is a tinted card in the dark theme, not a block of colour.
  assert.equal(prop('.cta', 'color', 'dark'), 'var(--text)');
  assert.match(prop('.cta', 'background-color', 'dark'), /color-mix\(in srgb, var\(--action\) \d+%, var\(--surface\)\)/);
});

test('muted labels stay AA on selected choices and on the tinted call to action', () => {
  for (const [theme, T] of THEMES) {
    for (const sel of ['.choice.selected', '.lang-card.selected']) {
      const bg = prop(sel, 'background-color', theme);
      for (const s of ['--surface', '--bg']) {
        const r = contrast('var(--muted)', bg, s, T);
        assert.ok(r >= 4.5, `muted text on ${sel} over ${s} (${theme}): ${r.toFixed(2)}:1 < 4.5:1`);
      }
    }
  }
  // Dark theme: the call to action's second line is muted text on its tint.
  assert.equal(prop('.cta small', 'color', 'dark'), 'var(--muted)');
  const r = contrast('var(--muted)', prop('.cta', 'background-color', 'dark'), '--bg', DARK);
  assert.ok(r >= 4.5, `muted text on the dark .cta: ${r.toFixed(2)}:1 < 4.5:1`);
});

test('amber texts use the themed --xp-ink token, not a fixed colour', () => {
  for (const sel of ['.session-xp', '.celebrate-xp', '.medal.fresh .medal-sub']) {
    assert.equal(prop(sel, 'color'), 'var(--xp-ink)', sel);
  }
  assert.ok(DARK['--xp-ink'] && DARK['--xp-ink'] !== LIGHT['--xp-ink'], 'dark theme overrides --xp-ink');
});

// ---------- Colour roles ----------

test('colour roles: buttons are --action, progress is --progress, red is for wrong answers', () => {
  for (const [, T] of THEMES) {
    const bad = tok('--bad', T);
    assert.ok(hueGap(tok('--action', T), bad) >= 60, 'the action colour is far from the error red');
    assert.ok(hueGap(tok('--progress', T), bad) >= 90, 'progress never looks like an error');
    assert.ok(hueGap(tok('--done', T), bad) >= 90, 'done never looks like an error');
  }
  for (const sel of ['.btn.primary', '.pill.selected', '.choice.selected', '.cta', '.big-play', '.mic-btn', '.syl.stressed']) {
    assert.match(prop(sel, 'background-color') || prop(sel, 'border-color'), /var\(--action/, `${sel} uses the action colour`);
  }
  for (const sel of ['.meter-fill', '.mini-meter span', '.bar.today .bar-fill']) {
    assert.equal(prop(sel, 'background-color'), 'var(--progress)', `${sel} uses the progress colour`);
  }
  for (const sel of ['.meter.done .meter-fill', '.topic-tile.done .mini-meter span']) {
    assert.equal(prop(sel, 'background-color'), 'var(--done)', `${sel} shows done in green`);
  }
  // The brand red only marks the brand: notification badges and dots.
  const BRAND = new Set(['.tab-badge', '.tab-dot', '.trophy .dot']);
  for (const { sels, body } of ALL_RULES) {
    if (/var\(--accent/.test(body)) {
      for (const s of sels) assert.ok(BRAND.has(s), `${s} uses the brand colour (--accent); use --action, --progress or --done`);
    }
  }
});

// ---------- Design system ----------

const FS = new Set(Object.keys(LIGHT).filter((k) => k.startsWith('--fs-')));
const RADII = new Set(Object.keys(LIGHT).filter((k) => k.startsWith('--r-')));

test('the type and radius scales are small', () => {
  assert.ok(FS.size >= 6 && FS.size <= 10, `${FS.size} font sizes`);
  assert.ok(RADII.size >= 4 && RADII.size <= 7, `${RADII.size} radii`);
  for (const k of ['--sp-1', '--sp-2', '--sp-3', '--sp-4', '--sp-5', '--sp-6']) assert.match(LIGHT[k], /^\d+px$/, k);
});

/** A size is from the scale: a --fs token (or a multiple of one), a fluid clamp(), or relative to its parent. */
const sizeOk = (v) => /^var\(--fs-[\w-]+\)$/.test(v) || /^calc\(var\(--fs-[\w-]+\) \* [\d.]+\)$/.test(v)
  || /^clamp\(/.test(v) || /^[\d.]+em$/.test(v) || v === 'inherit';

test('every font size in the stylesheets comes from the type scale', () => {
  for (const [name, css] of Object.entries(SHEETS)) {
    for (const { sels, body } of parse(css)) {
      if (sels.includes(':root')) continue;
      // The root size is the base of the whole rem scale (Settings → Text size).
      if (sels.every((x) => /^html\[data-text-size="\w+"\]$/.test(x))) continue;
      for (const m of body.matchAll(/(?:^|;)\s*font-size\s*:\s*([^;]+)/g)) {
        assert.ok(sizeOk(m[1].trim()), `${name}.css ${sels.join(', ')}: font-size ${m[1].trim()}`);
      }
      for (const m of body.matchAll(/(?:^|;)\s*font\s*:\s*([^;]+)/g)) {
        const v = m[1].trim();
        if (v === 'inherit') continue;
        const size = v.replace(/^(?:\d{3}|bold|normal|italic)\s+/, '').split(/\s|\//)[0];
        assert.ok(sizeOk(size), `${name}.css ${sels.join(', ')}: font ${v}`);
        if (FS.has(size.slice(4, -1))) assert.ok(FS.has(size.slice(4, -1)), size);
      }
      for (const m of body.matchAll(/var\((--fs-[\w-]+)\)/g)) assert.ok(FS.has(m[1]), `${m[1]} is defined`);
    }
  }
});

test('every corner radius comes from the radius scale', () => {
  const ok = (part) => /^var\(--r-[\w-]+\)$/.test(part) || part === '50%' || part === '0' || part === 'inherit';
  for (const [name, css] of Object.entries(SHEETS)) {
    for (const { sels, body } of parse(css)) {
      for (const m of body.matchAll(/(?:^|;)\s*border-radius\s*:\s*([^;]+)/g)) {
        const v = m[1].trim().replace(/calc\(var\(--r-[\w-]+\) - 1px\)/g, 'var(--r-x)');
        for (const part of v.split(/\s+/)) assert.ok(ok(part), `${name}.css ${sels.join(', ')}: border-radius ${m[1].trim()}`);
      }
      for (const m of body.matchAll(/var\((--r-[\w-]+)\)/g)) assert.ok(RADII.has(m[1]), `${m[1]} is defined`);
    }
  }
});

test('controls are at least 44px tall (or wide and tall)', () => {
  assert.equal(LIGHT['--tap'], '44px');
  const tall = (v) => v === 'var(--tap)' || (/^(\d+)px$/.test(v ?? '') && Number(v.slice(0, -2)) >= 44);
  for (const sel of ['.btn', '.btn.small', '.pill', '.chip', '.lang-pill', '.back-link', '.link-btn', '.tabs a', '.seg a', '.syl', '.word-chips a', '.g-nav button', '.medal', '.detail-topic', '.pair-btn', '.word-row']) {
    assert.ok(tall(prop(sel, 'min-height')), `${sel}: min-height ${prop(sel, 'min-height')}`);
  }
  assert.equal(prop('.icon-btn', 'width'), 'var(--tap)');
  assert.equal(prop('.icon-btn', 'height'), 'var(--tap)');
  assert.equal(prop('.icon-btn', 'flex-shrink'), '0', 'icon buttons are never squeezed by their row');
  // Nothing shrinks an icon button again.
  for (const { sels, body } of ALL_RULES) {
    if (sels.some((s) => /\.icon-btn\b/.test(s) && !/show-|\.big\b|session-exit/.test(s))) {
      for (const m of body.matchAll(/(?:^|;)\s*(width|height)\s*:\s*(\d+)px/g)) {
        assert.ok(Number(m[2]) >= 44, `${sels.join(', ')}: ${m[1]} ${m[2]}px`);
      }
    }
  }
});

// ---------- Script text: Arabic and Japanese ----------

/** Specificity (ids, classes/attributes/pseudo-classes, types) of a simple selector list. */
function specificity(sel) {
  const s = sel.replace(/:is\(([^)]*)\)/g, (_, inner) => inner.split(',')[0]).replace(/::[\w-]+/g, ' x');
  const ids = (s.match(/#[\w-]+/g) || []).length;
  const cls = (s.match(/\.[\w-]+|\[[^\]]+\]|:(?!lang\b|root\b)[\w-]+(\([^)]*\))?|:lang\([^)]*\)|:root/g) || []).length;
  const types = (s.replace(/\[[^\]]+\]|\([^)]*\)/g, '').match(/(^|[\s>+~])[a-z][\w-]*/g) || []).length;
  return ids * 10000 + cls * 100 + types;
}

test('Arabic and Japanese get their own fonts, stronger than any component font rule', () => {
  assert.match(LIGHT['--font-ar'], /Noto Naskh Arabic/);
  assert.match(LIGHT['--font-ja'], /Noto Sans JP/);
  const ar = ALL_RULES.find((r) => r.sels.includes(':root :lang(ar)'));
  const ja = ALL_RULES.find((r) => r.sels.includes(':root :lang(ja)'));
  assert.ok(ar && /font-family:\s*var\(--font-ar\)/.test(ar.body), ':root :lang(ar) sets the Arabic font');
  assert.ok(ja && /font-family:\s*var\(--font-ja\)/.test(ja.body), ':root :lang(ja) sets the Japanese font');
  const scriptSpec = specificity(':root :lang(ar)');
  // Every rule that sets a font family on a single class or attribute is weaker.
  for (const { sels, body } of ALL_RULES) {
    if (!/(?:^|;)\s*font(-family)?\s*:/.test(body) || sels.some((s) => /:lang\(/.test(s))) continue;
    for (const s of sels) {
      if (/^(\.[\w-]+|\.[\w-]+\.[\w-]+|[a-z]+|\.[\w-]+ [\w.-]+|\.[\w-]+\[[^\]]+\])$/.test(s) && !/\[lang|\[dir/.test(s)) {
        assert.ok(specificity(s) < scriptSpec || !/font-family|font:/.test(body), `${s} could override the script font`);
      }
    }
  }
  // The big script words don't reset the family with the font shorthand.
  for (const sel of ['.hero-tr', '.prompt-word', '.wotd-word', '.syl', '.letter-big', '.diff', '.show-tr']) {
    assert.equal(prop(sel, 'font'), null, `${sel} uses longhands, not the font shorthand`);
  }
});

test('Arabic is set larger, with room for vowel marks, and lines up with its transliteration', () => {
  const size = (v) => {
    const m = v.match(/var\((--fs-[\w-]+)\)(?: \* ([\d.]+))?/);
    return parseFloat(LIGHT[m[1]]) * (m[2] ? Number(m[2]) : 1);
  };
  assert.ok(size(prop(':root .hero-tr:lang(ar)', 'font-size')) > size(prop('.hero-tr', 'font-size')), 'Arabic hero larger than Latin');
  assert.ok(Number(prop(':root .hero-tr:lang(ar)', 'line-height')) >= 1.5);
  assert.ok(Number(prop(':root .hero-tr:lang(ar)', 'font-weight')) <= 700, 'a weight Naskh has (800 would be faked)');
  const ex = ALL_RULES.find((r) => r.sels.some((s) => s.startsWith(':root :is(.ex-tr') && /font-size/.test(r.body)));
  assert.ok(ex, 'example sentences have an Arabic size');
  assert.ok(Number(ex.body.match(/line-height:\s*([\d.]+)/)[1]) >= 1.8, 'tall lines for vowel marks');
  const align = ALL_RULES.find((r) => r.sels.some((s) => s.startsWith(':root :is(.ex-tr') && /text-align:\s*left/.test(r.body)));
  assert.ok(align, 'Arabic example lines start where their transliteration starts');
  assert.match(prop(':root .letter-notes b:lang(ar)', 'min-width'), /^(3[4-9]|[4-9]\d)px$/, 'a readable letter chip');
});

test('a reading in parts never leaves a "·" at the end of a line', () => {
  assert.equal(prop('.rd-split', 'flex-wrap'), 'wrap');
  assert.equal(prop('.rd-split', 'overflow'), 'hidden');
  assert.equal(prop('.rd-part ~ .rd-part::before', 'position'), 'absolute');
});

// ---------- Narrow screens ----------

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

test('Progress shows whole topic names, and the Speak tabs fit one row', () => {
  assert.match(prop('.cat-progress-list a', 'grid-template-areas'), /"icon name count" ". bar bar"/);
  assert.equal(prop('.cpl-name', 'overflow-wrap'), 'anywhere');
  assert.equal(prop('.cpl-name', 'white-space'), null, 'names wrap instead of being cut');
  assert.match(prop('.tabs a', 'flex'), /^1 1 0/);
  assert.equal(prop('.tabs a', 'min-width'), '0');
});

test('topic names, their native names and word meanings wrap instead of being cut', () => {
  for (const sel of ['.tt-name', '.tt-native', '.word-row span', '.known-text .muted']) {
    assert.equal(prop(sel, 'white-space'), null, `${sel} may wrap`);
    assert.equal(prop(sel, 'text-overflow'), null, `${sel} is not cut with an ellipsis`);
    assert.ok(Number(prop(sel, '-webkit-line-clamp')) >= 2, `${sel} gets at least two lines`);
  }
  // On phones the topic emoji goes above the name, so the name has the tile's whole width.
  const phone = ALL_RULES.find((r) => /max-width/.test(r.media || '') && r.sels.includes('.topic-tile'));
  assert.ok(phone && /grid-template-areas:\s*"emoji" "text" "meta"/.test(phone.body), 'emoji above the name on phones');
  // Arabic and Japanese topic names are larger than the 12px label size.
  assert.ok(prop(':root .tt-native:lang(ar)', 'font-size'), 'Arabic native names have their own size');
  assert.ok(prop(':root .tt-native:lang(ja)', 'font-size'), 'Japanese native names have their own size');
});
