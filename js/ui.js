// Tiny DOM helpers.

export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') {
        for (const [prop, val] of Object.entries(v)) {
          if (prop.startsWith('--')) el.style.setProperty(prop, String(val));
          else el.style[prop] = val;
        }
      }
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (typeof v === 'boolean') el.toggleAttribute(k, v);
      else if (k === 'value') el.value = v;
      else el.setAttribute(k, v);
    }
  }
  append(el, children);
  return el;
}

/** Replace an element's children (arrays are flattened, null/false skipped). */
export function set(el, ...children) {
  el.replaceChildren();
  append(el, children);
  return el;
}

function append(el, children) {
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : String(c));
  }
}

const ICONS = {
  volume: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
  slow: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v4"/><path d="M8 21h8"/>',
  record: '<circle cx="12" cy="12" r="7" fill="currentColor" stroke="none"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>',
  play: '<path d="M7 4v16l13-8z" fill="currentColor" stroke="none"/>',
  home: '<path d="M3 11 12 3l9 8"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  repeat: '<path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/>',
  wave: '<path d="M3 10v4"/><path d="M7 6v12"/><path d="M11 3v18"/><path d="M15 7v10"/><path d="M19 10v4"/>',
  chart: '<path d="M3 3v18h18"/><path d="M8 16v-5"/><path d="M13 16V7"/><path d="M18 16v-8"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  back: '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
  trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3"/><path d="M7 5H4v2a3 3 0 0 0 3 3"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  flame: '<path d="M12 2s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 1-3.5S9 11 11 11c0-4 1-9 1-9z"/>',
  ear: '<path d="M6 8.5a6 6 0 1 1 12 0c0 6-6 6-6 10a3 3 0 0 1-6 0"/><path d="M15 8.5a3 3 0 0 0-6 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  tiles: '<rect x="2" y="5" width="8" height="6" rx="1.5"/><rect x="13" y="5" width="9" height="6" rx="1.5"/><rect x="2" y="14" width="12" height="6" rx="1.5"/>',
  shuffle: '<path d="M2 18h3.5a5 5 0 0 0 4-2l5-8a5 5 0 0 1 4-2H22"/><path d="m19 3 3 3-3 3"/><path d="M2 6h3.5a5 5 0 0 1 3.8 1.8"/><path d="M14.7 16.2a5 5 0 0 0 3.8 1.8H22"/><path d="m19 15 3 3-3 3"/>',
};

// Each icon is parsed once and then cloned (a long list has one per row).
const iconCache = new Map();

export function icon(name, size = 20) {
  const key = `${name} ${size}`;
  const cached = iconCache.get(key);
  if (cached) return cached.cloneNode(true);
  const span = document.createElement('span');
  span.className = 'icon';
  span.setAttribute('aria-hidden', 'true');
  span.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
  if (typeof span.cloneNode !== 'function') return span; // minimal DOMs (tests)
  iconCache.set(key, span);
  return span.cloneNode(true);
}

/**
 * Fill a list with one row per item, a screenful at a time: `first` rows now,
 * then `step` more whenever its end comes near the screen, or when the
 * "Show more" button at the end is pressed. Returns stop(), to call before
 * the list is filled again and when the screen goes away.
 */
export function growList(list, items, row, { first = 60, step = 120, label = 'Show more' } = {}) {
  let shown = 0;
  const button = h('button', { type: 'button', class: 'btn small', onclick: () => grow(step, true) });
  const more = h('li', { class: 'list-more' }, button);
  const io = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) grow(step); }, { rootMargin: '0px 0px 600px 0px' })
    : null;

  function grow(n, pressed = false) {
    const rows = items.slice(shown, shown + n).map(row);
    shown += rows.length;
    if (more.isConnected) more.before(...rows); else list.append(...rows);
    if (shown < items.length) {
      button.textContent = `${label} (${items.length - shown} more)`;
      if (!more.isConnected) list.append(more);
      // Observing again reports at once if the end is still near the screen.
      io?.unobserve(more);
      io?.observe(more);
    } else {
      io?.disconnect();
      more.remove();
    }
    // Keyboard users continue at the first new row.
    if (pressed) rows[0]?.querySelector('a[href], button')?.focus({ preventScroll: true });
  }

  list.replaceChildren();
  grow(first);
  return () => io?.disconnect();
}

/** Debounce: fn runs once calls have paused for `ms`. Has .cancel(). */
export function debounce(fn, ms) {
  let t;
  const run = (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  run.cancel = () => clearTimeout(t);
  return run;
}

/**
 * A warning while progress can't be saved on this device (storage full or
 * blocked), kept up to date. `link`: show the way to Settings (for Home).
 */
export function storageBanner(ctx, { link = false } = {}) {
  const el = h('div', { class: 'banner storage-banner', role: 'note', hidden: true });
  const update = () => {
    const problem = ctx.store.storageProblem();
    el.hidden = !problem;
    if (!problem) return;
    set(el,
      h('b', null, 'Your progress can’t be saved on this device. '),
      problem === 'full'
        ? 'Its storage for Four Tongues is full. Free up some space. '
        : 'This browser is blocking storage for Four Tongues (private browsing or a privacy setting). Allow site data for Four Tongues. ',
      'Until then, what you learn is lost when Four Tongues closes — export a backup or make a sync code to keep it.',
      link ? h('div', null, h('a', { class: 'btn small', href: '#/settings' }, 'Back up in Settings')) : null);
  };
  update();
  window.addEventListener('lisan:storage', update);
  ctx.onCleanup(() => window.removeEventListener('lisan:storage', update));
  return el;
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Global keyboard shortcuts. Ignored while typing in a field, and Enter/Space
 * are left alone when a button or link has focus so normal activation works.
 */
export function bindKeys(map) {
  const fn = (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t.matches?.('input, textarea, select')) return;
    if ((e.key === 'Enter' || e.key === ' ') && t.matches?.('button, a, summary')) return;
    const f = map[e.key];
    if (f) {
      e.preventDefault();
      f(e);
    }
  };
  document.addEventListener('keydown', fn);
  return () => document.removeEventListener('keydown', fn);
}

let toastTimer;
export function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

export function meter(value, max, cls = '') {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return h('div', { class: `meter ${cls}`, role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100 },
    h('div', { class: 'meter-fill', style: { width: `${pct}%` } }));
}

export function platform() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Mac/.test(ua)) return 'mac';
  if (/Windows/.test(ua)) return 'windows';
  return 'other';
}
