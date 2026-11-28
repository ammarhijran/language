// The settings side panel: slides in from the side over the current screen,
// which stays dimmed behind it. The address #/settings (or #/settings/<group>)
// means "this panel is open", so links to Settings, the back gesture and
// reloads keep working: app.js opens it for that address and closes it for
// any other. Inside, the settings are groups that fold (js/views/settings.js).
//
// Closing (✕, a tap outside, Escape, Android's back) goes back in history to
// the screen underneath. Focus moves into the panel and back to the control
// that opened it; Tab stays inside while it is open. It comes from the end
// side of the page (the right in English), so a right-to-left page gets it
// from the left. Movement follows the app's Animations setting and the
// device's reduce-motion setting (css/styles.css).
import { h, icon } from './ui.js';

let current = null; // { wrap, panel, body, opener, onKey }

export const panelOpen = () => !!current;

/**
 * Open the panel with `build()` as its contents, or fill the open one again
 * (keeping its scroll position and which groups are unfolded). `onClose` is
 * what ✕, the backdrop and Escape do (app.js goes back in history).
 */
export function showPanel({ title, build, onClose }) {
  if (current) {
    const { body } = current;
    const openGroups = new Set([...body.querySelectorAll('details[open][data-group]')].map((d) => d.dataset.group));
    const top = body.scrollTop;
    body.replaceChildren(build());
    for (const d of body.querySelectorAll('details[data-group]')) if (openGroups.has(d.dataset.group)) d.open = true;
    body.scrollTop = top;
    return;
  }
  const opener = document.activeElement && document.activeElement !== document.body ? document.activeElement : null;
  const heading = h('h2', { class: 'panel-title', id: 'panel-title', tabindex: '-1' }, title);
  const body = h('div', { class: 'panel-body' }, build());
  const panel = h('aside', { class: 'panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'panel-title' },
    h('header', { class: 'panel-head' },
      heading,
      h('button', { type: 'button', class: 'icon-btn panel-close', 'aria-label': `Close ${title.toLowerCase()}`, onclick: () => onClose() }, icon('x'))),
    body);
  const wrap = h('div', { class: 'panel-wrap' }, h('div', { class: 'panel-backdrop', onclick: () => onClose() }), panel);
  const onKey = (e) => {
    if (!panel.contains(e.target) && e.target !== document.body) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onClose(); return; }
    if (e.key === 'Tab') {
      const items = [...panel.querySelectorAll('button, a[href], select, input, summary, textarea')]
        .filter((x) => !x.disabled && x.offsetParent !== null);
      if (!items.length) return;
      const at = items.indexOf(document.activeElement);
      const next = at < 0 ? 0 : (at + (e.shiftKey ? -1 : 1) + items.length) % items.length;
      if (at < 0 || (e.shiftKey && at === 0) || (!e.shiftKey && at === items.length - 1)) { e.preventDefault(); items[next].focus(); }
    }
  };
  document.body.append(wrap);
  document.documentElement.classList.add('panel-open');
  document.addEventListener('keydown', onKey, true);
  current = { wrap, panel, body, opener, onKey };
  heading.focus({ preventScroll: true });
}

/**
 * Take the panel away (the address no longer asks for it). Returns the
 * control that opened it, for app.js to give focus back to once the screen
 * underneath is drawn.
 */
export function hidePanel() {
  if (!current) return null;
  const { wrap, panel, opener, onKey } = current;
  current = null;
  document.removeEventListener('keydown', onKey, true);
  document.documentElement.classList.remove('panel-open');
  panel.classList.add('leaving'); // (the back button skips a dialog on its way out)
  wrap.classList.add('leaving');
  const gone = () => wrap.remove();
  const still = getComputedStyle(panel).animationName === 'none';
  if (still) gone();
  else { panel.addEventListener('animationend', gone, { once: true }); setTimeout(gone, 400); }
  return opener;
}
