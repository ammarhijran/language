// Shows game rewards: small "+XP" toasts, and celebration overlays for level-ups,
// achievements, challenges and goals. Overlays wait while a session is running
// so they never interrupt an exercise; they appear on the summary screen.
import { h, icon } from './ui.js';
import * as game from './game.js';

const BIG = new Set(['level', 'achievement', 'challenge', 'goal', 'repair', 'personal-goal', 'flawless']);

export function initCelebrations(ctx) {
  const queue = [];
  let showing = false;

  game.onReward((r) => {
    const on = ctx.settings.gameOn;
    if (r.kind === 'xp') {
      if (!on) return;
      const chip = document.querySelector('.session-xp');
      if (chip && ctx.inSession) bumpChip(chip, r.amount);
      else if (r.reason === 'speak' || r.reason === 'ear') ctx.toast(`+${r.amount} XP`);
      return;
    }
    if (!BIG.has(r.kind)) return;
    // With game features off, still mark the core habit moments with a toast.
    if (!on) {
      if (r.kind === 'goal') ctx.toast('🎉 Daily goal reached — great work!');
      if (r.kind === 'repair') ctx.toast(`🔧 Streak saved — ${r.streak} days!`);
      return;
    }
    queue.push(r);
    schedule();
  });

  // Rewards fire in bursts (an answer can unlock several things at once):
  // wait a moment so they all land on the same card.
  let timer = null;
  const schedule = () => { clearTimeout(timer); timer = setTimeout(flush, 60); };

  // Everything that arrived together is shown on one card: the most important
  // reward on top, the rest listed underneath.
  const RANK = { level: 0, 'personal-goal': 1, challenge: 2, achievement: 3, repair: 4, goal: 5, flawless: 6 };
  function flush() {
    if (showing || ctx.inSession || !queue.length) return;
    showing = true;
    const batch = queue.splice(0).sort((a, b) => RANK[a.kind] - RANK[b.kind]);
    show(batch, () => { showing = false; flush(); });
  }
  ctx.flushRewards = schedule;
}

function bumpChip(chip, amount) {
  const total = Number(chip.dataset.xp || 0) + amount;
  chip.dataset.xp = total;
  chip.querySelector('b').textContent = `+${total}`;
  chip.classList.remove('pop');
  void chip.offsetWidth; // restart the animation
  chip.classList.add('pop');
}

function content(r) {
  switch (r.kind) {
    case 'level': return { emoji: '⭐', title: `Level ${r.level}!`, text: game.newTitleAt(r.level) ? `New title unlocked: ${r.title}.` : 'Every answer counts — keep going!' };
    case 'achievement': return { emoji: r.achievement.icon, title: r.achievement.title, text: r.achievement.desc, kicker: 'Achievement unlocked', link: true };
    case 'challenge': return { emoji: r.challenge.icon, title: 'Weekly challenge complete!', text: r.challenge.title, xp: r.xp };
    case 'goal': return { emoji: '🎯', title: 'Daily goal reached!', text: 'That’s how habits are built — see you tomorrow.', xp: r.xp };
    case 'repair': return { emoji: '🔧', title: 'Streak saved!', text: `Your streak is back: ${r.streak} days.` };
    case 'personal-goal': return { emoji: '🏁', title: 'Goal achieved!', text: `You learned ${r.words} words — time to set a new goal.`, xp: r.xp, link: true };
    case 'flawless': return { emoji: '✨', title: 'Flawless!', text: `${r.answered} answers, every one right first time.`, xp: 25 };
    default: return { emoji: '🎉', title: 'Nice!', text: '' };
  }
}

function show(batch, done) {
  const [r, ...more] = batch;
  const c = content(r);
  const extraXp = more.reduce((sum, x) => sum + (content(x).xp || 0), 0);
  const prevFocus = document.activeElement;
  let closed = false;
  const close = (path) => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey, true);
    overlay.classList.add('leaving');
    setTimeout(() => { overlay.remove(); prevFocus?.focus?.({ preventScroll: true }); done(); }, 180);
    if (path) location.hash = path;
  };
  // Tab and Shift+Tab cycle through the dialog's buttons (wrapping around).
  const moveFocus = (step) => {
    const buttons = [...overlay.querySelectorAll('button')];
    const at = buttons.indexOf(document.activeElement);
    const next = at < 0 ? (step > 0 ? 0 : buttons.length - 1) : (at + step + buttons.length) % buttons.length;
    buttons[next]?.focus();
  };
  // The dialog is modal: keys never reach the page's shortcuts underneath.
  // Enter or Space on a focused button activates that button as usual; Enter
  // anywhere else means “Continue”.
  const onKey = (e) => {
    e.stopPropagation();
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') { e.preventDefault(); moveFocus(e.shiftKey ? -1 : 1); return; }
    const onButton = document.activeElement?.closest?.('button') && overlay.contains(document.activeElement);
    if (e.key === 'Enter' && !onButton) { e.preventDefault(); close(); }
  };
  const confetti = h('div', { class: 'confetti', 'aria-hidden': 'true' },
    Array.from({ length: 28 }, (_, i) => h('i', { style: { '--x': `${(i * 37) % 100}%`, '--d': `${(i % 7) * 0.08}s`, '--h': `${(i * 47) % 360}` } })));
  const ok = h('button', { type: 'button', class: 'btn primary wide', onclick: () => close() }, 'Continue');
  const overlay = h('div', { class: 'celebrate', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'celebrate-title' },
    confetti,
    h('div', { class: 'celebrate-card' },
      c.kicker ? h('p', { class: 'kicker' }, c.kicker) : null,
      h('div', { class: 'celebrate-emoji', 'aria-hidden': 'true' }, c.emoji),
      h('h2', { id: 'celebrate-title' }, c.title),
      c.text ? h('p', { class: 'muted' }, c.text) : null,
      c.xp || extraXp ? h('p', { class: 'celebrate-xp' }, icon('flame', 16), `+${(c.xp || 0) + extraXp} XP`) : null,
      more.length
        ? h('ul', { class: 'celebrate-more', 'aria-label': 'Also earned' }, more.map((x) => {
          const m = content(x);
          return h('li', null, h('span', { 'aria-hidden': 'true' }, m.emoji), h('span', null, h('b', null, m.title), m.kicker ? h('small', null, m.kicker) : null));
        }))
        : null,
      h('div', { class: 'actions stack' },
        ok,
        c.link || more.some((x) => content(x).link) ? h('button', { type: 'button', class: 'btn ghost wide', onclick: () => close('#/journey') }, 'See all achievements') : null)));
  document.body.append(overlay);
  document.addEventListener('keydown', onKey, true);
  navigator.vibrate?.(30);
  requestAnimationFrame(() => ok.focus({ preventScroll: true }));
}
