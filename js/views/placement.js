// Learn → "Already know some words?" → a quick placement check.
import { h, icon, shuffle } from '../ui.js';
import { runSession } from '../session.js';
import { backLink } from '../components.js';
import { markKnown } from '../srs.js';
import { placementPlan, passedTopics, PER_TOPIC } from '../placement.js';

export default function placement(ctx, started) {
  const { lang, store } = ctx;
  const cards = store.getCards(lang.code);
  const plan = placementPlan(lang, cards, (list, n) => shuffle(list).slice(0, n));

  if (!plan.length) {
    return h('div', { class: 'view' },
      backLink(ctx, '#/learn', 'Learn'),
      h('div', { class: 'summary' },
        h('h1', null, 'Nothing left to check'),
        h('p', { class: 'muted' }, 'You have already started every word topic.'),
        h('a', { class: 'btn primary', href: '#/learn' }, 'Back to Learn')));
  }

  if (started !== 'go') {
    return h('div', { class: 'view' },
      backLink(ctx, '#/known', 'Already learned'),
      h('h1', null, 'Quick placement check'),
      h('p', { class: 'muted' }, `Already know some ${lang.name}? Answer ${plan.length * PER_TOPIC} quick questions from the first ${plan.length} topics.`),
      h('section', { class: 'card' },
        h('ul', null,
          h('li', null, `${PER_TOPIC} words from each topic. Get all ${PER_TOPIC} right and you can mark that topic as already learned.`),
          h('li', null, 'Lessons then skip those words; each comes back once, in about a month, for a quick check.'),
          h('li', null, 'Not sure about a word? Just guess — a wrong answer only means the topic stays in your lessons.'))),
      h('div', { class: 'actions stack' },
        h('a', { class: 'btn primary wide', href: '#/placement/go' }, 'Start the check', icon('arrow', 18)),
        h('a', { class: 'btn ghost wide', href: '#/learn' }, 'No thanks, I’m starting from zero')));
  }

  // Meaning and production in turn, topic by topic (easier topics first).
  const items = plan.flatMap((p) => p.words.map((word, i) => ({ word, type: i === PER_TOPIC - 1 ? 'produce' : 'meaning' })));
  const right = new Set();
  const wrong = new Set();

  return h('div', { class: 'view' }, runSession(ctx, {
    label: 'Placement check',
    exitHref: '#/learn',
    items,
    onResult(item, r) {
      if (r.skipped || !r.correct) wrong.add(item.word.id);
      else if (!wrong.has(item.word.id)) right.add(item.word.id);
      return null; // one try per word
    },
    onFinish() {
      const passed = passedTopics(plan, right);
      const chosen = new Set(passed.map((c) => c.id));
      const count = () => passed.filter((c) => chosen.has(c.id)).reduce((n, c) => n + lang.wordsIn(c.id).filter((w) => !store.getCard(lang.code, w.id)).length, 0);
      const button = h('button', { type: 'button', class: 'btn primary wide', onclick: apply });
      const paint = () => {
        button.disabled = !chosen.size;
        button.textContent = chosen.size ? `Mark ${count()} words as already learned` : 'Tick at least one topic';
      };
      function apply() {
        let n = 0;
        for (const c of passed) {
          if (!chosen.has(c.id)) continue;
          for (const w of lang.wordsIn(c.id)) if (!store.getCard(lang.code, w.id)) { store.setCard(lang.code, w.id, markKnown()); n++; }
        }
        ctx.toast(`Marked ${n} words as already learned`);
        ctx.go('/learn');
      }
      paint();
      return h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, passed.length ? '🎓' : '🌱'),
        h('h2', null, passed.length ? `You know ${passed.length} of ${plan.length} topics` : 'A fresh start'),
        h('p', { class: 'big-number' }, `${right.size}/${items.length}`),
        passed.length
          ? [
            h('p', { class: 'muted' }, 'You got every sampled word right in these topics. Untick any you would still like to go through:'),
            h('ul', { class: 'known-list placement-topics' }, passed.map((c) => h('li', null, h('label', { class: 'known-row' },
              h('input', { type: 'checkbox', checked: true, onchange: (e) => { if (e.target.checked) chosen.add(c.id); else chosen.delete(c.id); paint(); } }),
              h('span', { class: 'known-text' }, h('b', null, `${c.emoji} ${c.name}`), h('span', { class: 'muted' }, `${lang.wordsIn(c.id).length} words`)))))),
            h('div', { class: 'actions stack' }, button,
              h('a', { class: 'btn ghost wide', href: '#/learn' }, 'Keep everything in my lessons')),
          ]
          : [
            h('p', { class: 'muted' }, 'No topic was all right, so your lessons start from the beginning — which is the best place to start.'),
            h('div', { class: 'actions stack' }, h('a', { class: 'btn primary wide', href: '#/learn' }, 'Go to Learn', icon('arrow', 18))),
          ]);
    },
  }));
}
