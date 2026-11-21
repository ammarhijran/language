// Runs a queue of exercises with a progress bar.
import { h, icon, set } from './ui.js';
import { EXERCISES } from './exercises.js';

/**
 * @param ctx
 * @param {object} opts
 * @param {Array<{word, type, meta?}>} opts.items
 * @param {(item, result) => object|null} opts.onResult  may return an item to re-queue
 * @param {() => Node} opts.onFinish  rendered when the queue is empty
 */
export function runSession(ctx, { items, onResult, onFinish, exitHref = '#/', label = 'Session' }) {
  const fill = h('div', { class: 'meter-fill' });
  const counter = h('span', { class: 'session-count' });
  const stage = h('div', { class: 'stage' });
  const queue = [...items];
  let done = 0;
  let localCleanups = [];

  const root = h('section', { class: 'session', 'aria-label': label },
    h('div', { class: 'session-head' },
      h('a', { href: exitHref, class: 'icon-btn', 'aria-label': 'Leave session' }, icon('x')),
      h('div', { class: 'meter session-meter' }, fill),
      counter),
    stage);

  // Exercise-level cleanups run when moving on, plus when the view unmounts.
  const exCtx = Object.create(ctx, {
    onCleanup: { value: (fn) => localCleanups.push(fn) },
  });
  ctx.onCleanup(() => localCleanups.forEach((f) => f()));

  function next() {
    localCleanups.forEach((f) => f());
    localCleanups = [];
    ctx.speech.cancelSpeech();

    const total = done + queue.length;
    fill.style.width = `${total ? (done / total) * 100 : 100}%`;

    if (!queue.length) {
      counter.textContent = '';
      set(stage, onFinish());
      return;
    }
    counter.textContent = `${done + 1} / ${total}`;
    const item = queue.shift();
    const render = EXERCISES[item.type] || EXERCISES.flashcard;
    const el = render(exCtx, item.word, (result) => {
      const again = onResult(item, result);
      if (again) queue.push(again);
      done++;
      next();
    }, item.meta);
    set(stage, el);
    window.scrollTo(0, 0);
  }

  next();
  return root;
}
