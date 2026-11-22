// Runs a queue of exercises with a progress bar, full screen ("focus mode"):
// while it runs, body.in-session hides the app's top bar and tab bar and the
// session head (✕, progress, XP) stays at the top (css/session.css). The bars
// come back on the summary, and whenever the screen goes away (✕, back, a link).
import { h, icon, set } from './ui.js';
import { EXERCISES } from './exercises.js';
import { AGAIN } from './srs.js';

export const FOCUS_CLASS = 'in-session';

// The running session's answer to the system back button (Android), or null.
let backHandler = null;

/**
 * The system back button was pressed (js/app.js). A running session that
 * would lose answers asks the same "Leave this lesson?" question as its ✕
 * and returns true; `leave()` then runs if the learner leaves. Otherwise
 * (no session, nothing answered yet, a session that saves every answer)
 * it returns false and the back button does what it always does.
 */
export function sessionBack(leave) {
  return backHandler ? backHandler(leave) : false;
}

const bodyClass = (on) => {
  const list = typeof document !== 'undefined' ? document.body?.classList : null;
  if (list) list[on ? 'add' : 'remove'](FOCUS_CLASS);
};

/**
 * @param ctx
 * @param {object} opts
 * @param {Array<{word, type, meta?}>} opts.items
 * @param {(item, result) => object|null} opts.onResult  may return an item to re-queue,
 *   or { drop: true } to remove the word's remaining items
 * @param {() => Node} opts.onFinish  rendered when the queue is empty
 * @param {string|((state: {done: number, left: number}) => string|null)} [opts.confirmExit]
 *   only for sessions that would lose answers when left early: the question the ✕
 *   asks once something has been answered and before the end. Without it the ✕
 *   simply leaves (reviews and practice save every answer as it is given).
 */
export function runSession(ctx, { items, onResult, onFinish, exitHref = '#/', label = 'Session', confirmExit = null }) {
  const game = ctx.game;
  const gameOn = ctx.settings.gameOn;
  const xpStart = game.totalXp();
  let combo = 0;
  let bestCombo = 0;
  let answered = 0;
  const firstTry = new Map(); // word id → right first time?
  const comboEl = h('span', { class: 'session-combo', hidden: true, 'aria-live': 'polite' });
  // Shown from the first XP earned (css: [data-xp="0"] is hidden); celebrate.js bumps it.
  const xpChip = h('span', { class: 'session-xp', hidden: !gameOn, dataset: { xp: '0' }, title: 'XP earned this session' }, h('b', null, '+0'), h('span', { class: 'xp-unit' }, ' XP'));
  const fill = h('div', { class: 'meter-fill' });
  const counter = h('span', { class: 'session-count' });
  const stage = h('div', { class: 'stage' });
  let queue = [...items];
  let done = 0;
  let localCleanups = [];
  let running = true;
  let closeConfirm = null;

  const exit = h('a', { href: exitHref, class: 'icon-btn session-exit', 'aria-label': 'Leave session', onclick: onExit }, icon('x', 22));
  const root = h('section', { class: 'session', 'aria-label': label },
    h('div', { class: 'session-head' },
      exit,
      h('div', { class: 'meter session-meter' }, fill),
      comboEl,
      xpChip,
      counter),
    stage);

  // Focus mode. Set now (the screen is being built) and once more when it is
  // on, in case the shell reset the body's classes while putting it in.
  bodyClass(true);
  const raf = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame(() => { if (running && root.isConnected) bodyClass(true); })
    : null;
  const endFocus = () => {
    if (backHandler === onBack) backHandler = null;
    running = false;
    if (raf != null) cancelAnimationFrame(raf);
    closeConfirm?.();
    bodyClass(false);
  };

  // Exercise-level cleanups run when moving on, plus when the view unmounts.
  const exCtx = Object.create(ctx, {
    onCleanup: { value: (fn) => localCleanups.push(fn) },
  });
  ctx.inSession = true;
  ctx.onCleanup(() => {
    localCleanups.forEach((f) => f());
    localCleanups = [];
    endFocus();
    ctx.inSession = false;
    ctx.flushRewards?.();
  });

  /** The question to ask before leaving, or null when leaving loses nothing. */
  function leaveQuestion() {
    if (!confirmExit || !running || !done) return null;
    // `left` counts the card on screen, which isn't in the queue any more.
    return typeof confirmExit === 'function' ? confirmExit({ done, left: queue.length + 1 }) : confirmExit;
  }

  /** Leaving with the ✕: ask first only if this session would lose answers. */
  function onExit(e) {
    const ask = leaveQuestion();
    if (!ask) return; // the link just leaves
    e.preventDefault();
    askToLeave(ask);
  }

  /** The system back button: the same question as the ✕; "Leave" then goes back (`leave`). */
  function onBack(leave) {
    const ask = leaveQuestion();
    if (!ask) return false;
    askToLeave(ask, leave);
    return true;
  }
  backHandler = onBack;

  function askToLeave(question, leaveBy = null) {
    if (closeConfirm) return;
    const stay = h('button', { type: 'button', class: 'btn wide', onclick: () => close() }, 'Keep going');
    const leave = h('a', {
      class: 'btn primary wide', href: exitHref,
      onclick: (e) => {
        close(false);
        if (leaveBy) { e.preventDefault(); leaveBy(); }
      },
    }, 'Leave');
    const box = h('div', { class: 'session-confirm', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'session-confirm-q' },
      h('div', { class: 'session-confirm-card' },
        h('p', { id: 'session-confirm-q', class: 'session-confirm-q' }, question),
        h('div', { class: 'actions split' }, stay, leave)));
    // Modal: the exercise's shortcuts (1–4, Enter…) don't reach the card underneath.
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') { e.preventDefault(); (document.activeElement === stay ? leave : stay).focus(); return; }
      e.stopPropagation();
    };
    const prev = document.activeElement;
    function close(refocus = true) {
      if (!closeConfirm) return;
      closeConfirm = null;
      document.removeEventListener('keydown', onKey, true);
      box.remove();
      if (refocus) prev?.focus?.({ preventScroll: true });
    }
    closeConfirm = close;
    root.append(box);
    document.addEventListener('keydown', onKey, true);
    stay.focus({ preventScroll: true });
  }

  function scoreAnswer(item, result) {
    if (result.intro || result.skipped || result.known || result.rating == null) return;
    answered++;
    const right = result.rating !== AGAIN;
    combo = right ? combo + 1 : 0;
    bestCombo = Math.max(bestCombo, combo);
    if (!firstTry.has(item.word.id)) firstTry.set(item.word.id, right);
    comboEl.hidden = !gameOn || combo < 3;
    comboEl.textContent = `🔥 ${combo}`;
    game.answer({ lang: ctx.lang.code, rating: result.rating, combo });
  }

  function summary() {
    const firstTryCorrect = [...firstTry.values()].filter(Boolean).length;
    const xp = game.totalXp() - xpStart;
    if (!gameOn || !answered) return null;
    return h('div', { class: 'session-rewards' },
      h('span', null, h('b', null, `+${xp}`), ' XP'),
      bestCombo >= 3 ? h('span', null, '🔥 best combo ', h('b', null, String(bestCombo))) : null,
      h('span', null, h('b', null, `${firstTryCorrect}/${firstTry.size}`), ' right first time'));
  }

  function next() {
    localCleanups.forEach((f) => f());
    localCleanups = [];
    ctx.speech.cancelSpeech();

    const total = done + queue.length;
    fill.style.width = `${total ? (done / total) * 100 : 100}%`;

    if (!queue.length) {
      counter.textContent = '';
      comboEl.hidden = true;
      ctx.inSession = false;
      // The summary is an ordinary screen again: the app's bars come back.
      endFocus();
      const firstTryCorrect = [...firstTry.values()].filter(Boolean).length;
      game.sessionEnd({ lang: ctx.lang.code, answered: firstTry.size, firstTryCorrect });
      const end = onFinish();
      const rewards = summary();
      if (rewards) end.prepend(rewards);
      set(stage, end);
      ctx.flushRewards?.();
      return;
    }
    counter.textContent = `${done + 1} / ${total}`;
    const item = queue.shift();
    const render = EXERCISES[item.type] || EXERCISES.flashcard;
    // An exercise reports its verdict as soon as it is shown (onAnswer), so XP
    // and the combo land with the answer sheet; the item is scored once.
    let scored = false;
    const itemCtx = Object.create(exCtx, {
      onAnswer: { value: (result) => { if (!scored && running) { scored = true; scoreAnswer(item, result); } } },
    });
    const el = render(itemCtx, item.word, (result) => {
      if (!scored) { scored = true; scoreAnswer(item, result); }
      const again = onResult(item, result);
      if (again?.drop) queue = queue.filter((q) => q.word.id !== item.word.id);
      else if (again) queue.push(again);
      done++;
      next();
    }, item.meta);
    set(stage, el);
    window.scrollTo(0, 0);
  }

  next();
  return root;
}
