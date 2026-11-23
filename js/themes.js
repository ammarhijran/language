// Themes: light or dark (or whatever the device uses), the colour of
// everything you tap, and the page background.
//
// How it reaches the page:
//   • Light is css/styles.css. Dark is css/dark.css, a stylesheet whose
//     `media` the app sets: "(prefers-color-scheme: dark)" follows the device,
//     "all" is always dark, "not all" is always light. The loading screen's
//     dark colours (a <style id="boot-dark"> in index.html) switch the same way.
//   • A colour or background other than the default is a handful of custom
//     properties set on <html>; the default sets nothing, so the stylesheets
//     stay the source of the standard look.
//   • The same properties are remembered under THEME_KEY, where the inline
//     script in index.html reads them before the first paint.
//
// Every choice keeps the contrast the stylesheets are tested for
// (tests/themes.test.js): light backgrounds are never darker, and dark ones
// never lighter, than the default surfaces; every colour is readable on all
// of them.

export const THEME_KEY = 'lisan:theme';
export const DARK_QUERY = '(prefers-color-scheme: dark)';

export const MODES = [['system', 'Same as device'], ['light', 'Light'], ['dark', 'Dark']];

/** Colours for buttons, links and highlights: [--action, --action-hover, --action-ink] per mode. */
export const ACCENTS = {
  indigo: { name: 'Indigo', light: ['#4338ca', '#3730a3', '#ffffff'], dark: ['#a5b4fc', '#c7d2fe', '#0d1030'] },
  blue: { name: 'Blue', light: ['#1d4ed8', '#1e40af', '#ffffff'], dark: ['#8dbdf3', '#bfdbfe', '#0b1b3a'] },
  teal: { name: 'Teal', light: ['#0f766e', '#115e59', '#ffffff'], dark: ['#54d0bd', '#99f6e4', '#042f2e'] },
  green: { name: 'Green', light: ['#157a3a', '#166534', '#ffffff'], dark: ['#73ce94', '#bbf7d0', '#052e16'] },
  orange: { name: 'Orange', light: ['#aa4d08', '#8a3c0d', '#ffffff'], dark: ['#ebad6c', '#fed7aa', '#3b1a03'] },
  rose: { name: 'Rose', light: ['#be185d', '#9d174d', '#ffffff'], dark: ['#efa1cc', '#fbcfe8', '#3b0a22'] },
  purple: { name: 'Purple', light: ['#7e22ce', '#6b21a8', '#ffffff'], dark: ['#cfadf4', '#e9d5ff', '#2a0a45'] },
};
export const DEFAULT_ACCENT = 'indigo';
/** "Your own colour": a hue picked on a slider; the shades are worked out by accentFromHue(). */
export const CUSTOM_ACCENT = 'custom';
export const DEFAULT_HUE = 200;

/** Page backgrounds: [--bg, --surface, --surface-2, --border] per mode. */
export const BACKGROUNDS = {
  warm: { name: 'Warm', light: ['#faf7f2', '#ffffff', '#f3eee6', '#e7e0d5'], dark: ['#121110', '#27231e', '#332e28', '#443d35'] },
  neutral: { name: 'Grey', light: ['#f6f7f9', '#ffffff', '#eff1f4', '#e1e4e9'], dark: ['#111214', '#232528', '#2b2e32', '#42464c'] },
  cool: { name: 'Cool', light: ['#f1f6fb', '#ffffff', '#ebf1f8', '#d6e1ee'], dark: ['#0f1419', '#1e2630', '#262f39', '#3d4a59'] },
  paper: { name: 'Paper', light: ['#f8f1dd', '#fffaf0', '#f6efdc', '#e4d8b9'], dark: ['#16110b', '#2d241a', '#372c20', '#4d3e2e'] },
  plain: { name: 'White', darkName: 'Black', light: ['#ffffff', '#ffffff', '#f3f3f1', '#deddd9'], dark: ['#000000', '#1b1b1b', '#262626', '#3b3b3b'] },
};
export const DEFAULT_BACKGROUND = 'warm';

const ACCENT_VARS = ['--action', '--action-hover', '--action-ink'];
const BACKGROUND_VARS = ['--bg', '--surface', '--surface-2', '--border'];
/** Every custom property a theme may set on <html>. */
export const THEME_VARS = [...BACKGROUND_VARS, ...ACCENT_VARS, '--action-soft'];
/** How much of the colour is in its tint (--action-soft), over a card. */
const SOFT = 0.1;
/** The dark theme's call to action is this much of the colour over a card (css/dark.css `.cta`). */
export const CTA_TINT = 0.12;

// ---------- Colour maths (sRGB) ----------

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (c) => `#${c.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('')}`;
/** `p` of colour a over colour b, as color-mix(in srgb, a p%, b). */
export const mix = (a, p, b) => { const x = rgb(a), y = rgb(b); return toHex(x.map((v, i) => v * p + y[i] * (1 - p))); };
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
export const luminance = (hex) => { const [r, g, b] = rgb(hex).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
/** WCAG contrast ratio of two colours. */
export const contrast = (a, b) => { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
function hsl(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => { const k = (n + h / 30) % 12; return 255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))); };
  return toHex([f(0), f(8), f(4)]);
}

// ---------- What the settings mean ----------

const modeOf = (theme) => (theme === 'light' || theme === 'dark' ? theme : 'system');
/** 'light' or 'dark': what the theme setting comes to on a device that prefers dark, or not. */
export const resolveMode = (theme, prefersDark) => (modeOf(theme) === 'system' ? (prefersDark ? 'dark' : 'light') : modeOf(theme));
/** The `media` of the dark stylesheet for a theme setting. */
export const darkMedia = (theme) => ({ system: DARK_QUERY, dark: 'all', light: 'not all' })[modeOf(theme)];

export const accentKey = (s = {}) => (s.accent === CUSTOM_ACCENT || Object.hasOwn(ACCENTS, s.accent ?? '') ? s.accent : DEFAULT_ACCENT);
export const backgroundKey = (s = {}) => (Object.hasOwn(BACKGROUNDS, s.background ?? '') ? s.background : DEFAULT_BACKGROUND);
export const hueOf = (s = {}) => (Number.isFinite(Number(s.accentHue)) && s.accentHue !== '' && s.accentHue != null ? ((Math.round(Number(s.accentHue)) % 360) + 360) % 360 : DEFAULT_HUE);
export const backgroundName = (key, mode) => { const b = BACKGROUNDS[backgroundKey({ background: key })]; return (mode === 'dark' && b.darkName) || b.name; };

/**
 * [--action, --action-hover, --action-ink] for a hue (0–359). The lightness is
 * moved until the colour reads (4.5:1 or better) as text on every surface of
 * `mode`, on its own tint, and under its own ink.
 */
export function accentFromHue(hue, mode, surfaces = BACKGROUNDS[DEFAULT_BACKGROUND][mode]) {
  const dark = mode === 'dark';
  const grounds = [surfaces[0], surfaces[1], surfaces[2], BACKGROUNDS[DEFAULT_BACKGROUND][mode][2]];
  const ink = dark ? hsl(hue, 0.6, 0.1) : '#ffffff';
  const reads = (c) => contrast(c, ink) >= 4.6
    && [...grounds, mix(c, SOFT, surfaces[1])].every((g) => contrast(c, g) >= 4.6)
    && (!dark || contrast('#a89f93', mix(c, CTA_TINT, surfaces[1])) >= 4.6); // muted text on the tinted call to action
  const s = dark ? 0.75 : 0.72;
  // Start from a pleasant shade and move away from it a step at a time
  // (dark theme: lighter first; light theme: darker first) until it reads.
  let l = dark ? 0.76 : 0.44;
  for (let step = 0; step <= 40; step++) {
    const tries = dark ? [l + step / 100, l - step / 100] : [l - step / 100, l + step / 100];
    const ok = tries.find((t) => t > 0.05 && t < 0.95 && reads(hsl(hue, s, t)));
    if (ok !== undefined) { l = ok; break; }
  }
  const hover = dark ? mix('#ffffff', 0.3, hsl(hue, s, l)) : mix('#000000', 0.18, hsl(hue, s, l));
  return [hsl(hue, s, l), hover, ink];
}

/** The four background colours and three accent colours in force for the settings, in `mode`. */
export function palette(settings = {}, mode = 'light') {
  const m = mode === 'dark' ? 'dark' : 'light';
  const surfaces = BACKGROUNDS[backgroundKey(settings)][m];
  const key = accentKey(settings);
  const accent = key === CUSTOM_ACCENT ? accentFromHue(hueOf(settings), m, surfaces) : ACCENTS[key][m];
  return { surfaces, accent, soft: mix(accent[0], SOFT, surfaces[1]) };
}

/**
 * The custom properties to set on <html> for the settings in `mode`:
 * nothing for the standard look, otherwise only what differs from it.
 */
export function themeVars(settings = {}, mode = 'light') {
  const vars = {};
  const plainBg = backgroundKey(settings) === DEFAULT_BACKGROUND;
  const plainAccent = accentKey(settings) === DEFAULT_ACCENT;
  if (plainBg && plainAccent) return vars;
  const { surfaces, accent, soft } = palette(settings, mode);
  if (!plainBg) BACKGROUND_VARS.forEach((name, i) => { vars[name] = surfaces[i]; });
  if (!plainAccent) ACCENT_VARS.forEach((name, i) => { vars[name] = accent[i]; });
  vars['--action-soft'] = soft;
  return vars;
}

// ---------- Putting it on the page ----------

const LIGHT_BAR = '#c8102e'; // the browser's toolbar in the light theme: the brand red
let settingsNow = {};
let watching = false;

const prefersDark = () => typeof matchMedia === 'function' && matchMedia(DARK_QUERY).matches;

/** Apply the theme settings to the document, and remember them for the next start. */
export function applyTheme(settings = {}) {
  if (typeof document === 'undefined') return null;
  settingsNow = settings;
  const theme = modeOf(settings.theme);
  const mode = resolveMode(theme, prefersDark());
  const root = document.documentElement;

  const media = darkMedia(theme);
  for (const id of ['dark-css', 'boot-dark']) {
    const el = document.getElementById(id);
    if (el && el.media !== media) el.media = media;
  }
  root.dataset.theme = mode;

  const vars = themeVars(settings, mode);
  for (const name of THEME_VARS) {
    if (vars[name]) root.style.setProperty(name, vars[name]);
    else root.style.removeProperty(name);
  }

  // The browser's toolbar / the installed app's title bar.
  const darkBar = BACKGROUNDS[backgroundKey(settings)].dark[0];
  const whenDark = document.querySelector('meta[name="theme-color"][media]');
  const otherwise = document.querySelector('meta[name="theme-color"]:not([media])');
  if (whenDark) whenDark.content = theme === 'light' ? LIGHT_BAR : darkBar;
  if (otherwise) otherwise.content = theme === 'dark' ? darkBar : LIGHT_BAR;

  try {
    const both = { light: themeVars(settings, 'light'), dark: themeVars(settings, 'dark') };
    if (Object.keys(both.light).length) localStorage.setItem(THEME_KEY, JSON.stringify(both));
    else localStorage.removeItem(THEME_KEY);
  } catch { /* storage blocked: the theme is applied a moment after the page shows instead */ }

  // "Same as device" has to follow the device when it changes (sunset, a quick-settings tile).
  if (!watching && typeof matchMedia === 'function') {
    watching = true;
    matchMedia(DARK_QUERY).addEventListener?.('change', () => applyTheme(settingsNow));
  }
  return mode;
}
