// Runs a queue of exercises with a progress bar.
import { h, icon, set } from './ui.js';
import { EXERCISES } from './exercises.js';
import { AGAIN } from './srs.js';

/**
 * @param ctx
 * @param {object} opts
 * @param {Array<{word, type, meta?}>} opts.items
 * @param {(item, result) => object|null} opts.onResult  may return an item to re-queue,
 *   or { drop: true } to remove the word's remaining items
 * @param {() => Node} opts.onFinish  rendered when the queue is empty
 */
export function runSession(ctx, { items, onResult, onFinish, exitHref = '#/', label = 'Session' }) {
  const game = ctx.game;
  const gameOn = ctx.settings.gameOn;
  const xpStart = game.totalXp();
  let combo = 0;
  let bestCombo = 0;
  let answered = 0;
  const firstTry = new Map(); // word id → right first time?
  const comboEl = h('span', { class: 'session-combo', hidden: true, 'aria-live': 'polite' });
  const xpChip = h('span', { class: 'session-xp', hidden: !gameOn, dataset: { xp: '0' }, title: 'XP earned this session' }, h('b', null, '+0'), h('span', { class: 'xp-unit' }, ' XP'));
  const fill = h('div', { class: 'meter-fill' });
  const counter = h('span', { class: 'session-count' });
  const stage = h('div', { class: 'stage' });
  let queue = [...items];
  let done = 0;
  let localCleanups = [];

  const root = h('section', { class: 'session', 'aria-label': label },
    h('div', { class: 'session-head' },
      h('a', { href: exitHref, class: 'icon-btn', 'aria-label': 'Leave session' }, icon('x')),
      h('div', { class: 'meter session-meter' }, fill),
      comboEl,
      xpChip,
      counter),
    stage);

  // Exercise-level cleanups run when moving on, plus when the view unmounts.
  const exCtx = Object.create(ctx, {
    onCleanup: { value: (fn) => localCleanups.push(fn) },
  });
  ctx.inSession = true;
  ctx.onCleanup(() => {
    localCleanups.forEach((f) => f());
    ctx.inSession = false;
    ctx.flushRewards?.();
  });

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
    const el = render(exCtx, item.word, (result) => {
      scoreAnswer(item, result);
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
