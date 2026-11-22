import { h, icon, shuffle, pick, bindKeys, set } from '../ui.js';
import { playButton, pronunciationPanel, speakPractice, voiceBanner, exampleBlock, readingLine, cleanupScope, sayLater } from '../components.js';
import { learnedWords } from '../stats.js';

// Doing first (speaking, ear training), then the reference (letters, sounds).
const TABS = [
  { id: 'drill', name: 'Speak' },
  { id: 'ear', name: 'Ear training' },
  { id: 'alphabet', name: 'Alphabet' },
  { id: 'sounds', name: 'Sounds' },
];

export default function pronounce(ctx, tab, ...args) {
  // Without a section: speaking, once there are a few words to say; before that, the letters.
  if (!TABS.some((t) => t.id === tab)) tab = learnedWords(ctx).length >= 5 ? 'drill' : 'alphabet';
  const body = { alphabet, sounds, ear, drill }[tab](ctx, ...args);
  return h('div', { class: 'view' },
    h('h1', null, 'Pronunciation'),
    voiceBanner(ctx),
    h('nav', { class: 'tabs', 'aria-label': 'Pronunciation sections' },
      TABS.map((t) => h('a', { href: `#/speak/${t.id}`, class: t.id === tab ? 'active' : '', 'aria-current': t.id === tab ? 'page' : null }, t.name))),
    body,
  );
}

function alphabet(ctx) {
  const { lang } = ctx;
  return h('section', null,
    h('p', { class: 'muted' }, lang.alphabetIntro),
    h('div', { class: 'letter-grid' }, lang.alphabet.map((l) =>
      h('button', {
        type: 'button', class: `letter${l.special ? ' special' : ''}`,
        onclick: () => { ctx.say(l.ex[0]); ctx.game.letterTapped(lang.code, l.key ?? l.lower); },
        'aria-label': `${l.upper}: ${l.hint}. Example ${l.ex[0]}, ${l.ex[1]}`,
      },
        h('span', { class: 'letter-big' }, h('span', { lang: lang.code }, l.upper), h('small', { lang: l.lowerIsName ? null : lang.code }, l.lower)),
        h('span', { class: 'ipa' }, `/${l.ipa}/`),
        h('span', { class: 'letter-hint' }, l.hint),
        h('span', { class: 'letter-ex' }, h('b', { lang: lang.code }, l.ex[0]), ` ${l.ex[1]}`),
      ))),
  );
}

function sounds(ctx) {
  const { lang } = ctx;
  return h('section', { class: 'tips' }, lang.soundTips.map((t) =>
    h('article', { class: 'card tip' },
      h('h2', null, t.title, t.ipa ? h('span', { class: 'ipa' }, ` /${t.ipa}/`) : null),
      h('p', null, t.body),
      h('div', { class: 'chip-row' }, t.examples.map(([w, en]) =>
        h('button', { type: 'button', class: 'chip', onclick: () => ctx.say(w, { slow: true }) },
          icon('volume', 14), h('b', { lang: lang.code }, w), h('span', null, en)))),
    )));
}

function ear(ctx) {
  const { lang } = ctx;
  const wrap = h('section', null);

  function list() {
    set(wrap, 
      h('p', { class: 'muted' }, 'These word pairs differ by a single sound. Listen to both, then quiz yourself — training your ear is the fastest way to fix your own pronunciation.'),
      h('button', { type: 'button', class: 'btn primary wide', onclick: quiz }, icon('ear', 18), 'Quiz me (10 rounds)'),
      lang.minimalPairs.map((g) => h('div', { class: 'card pair-group' },
        h('h2', { lang: lang.code }, g.contrast),
        g.pairs.map(([a, am, b, bm]) => h('div', { class: 'pair' },
          pairBtn(a, am), h('span', { class: 'vs' }, 'vs'), pairBtn(b, bm))))),
    );
  }

  function pairBtn(w, m) {
    return h('button', { type: 'button', class: 'pair-btn', onclick: () => ctx.say(w, { slow: true }) },
      icon('volume', 16), h('b', { lang: lang.code }, w), h('small', null, m));
  }

  function quiz() {
    const all = lang.minimalPairs.flatMap((g) => g.pairs.map((p) => ({ contrast: g.contrast, p })));
    const rounds = shuffle(all).concat(shuffle(all)).slice(0, 10);
    let i = 0;
    let score = 0;
    let unbind = () => {};
    ctx.onCleanup(() => unbind());
    // Each round's delayed autoplay is dropped when the next round starts.
    const roundScope = cleanupScope(ctx);

    function round() {
      unbind();
      roundScope.cleanup();
      if (i >= rounds.length) {
        ctx.store.logActivity(lang.code, { practiced: rounds.length });
        ctx.game.earQuiz({ lang: lang.code, correct: score, total: rounds.length });
        set(wrap, h('div', { class: 'summary' },
          h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, score >= 8 ? '🎧' : '👂'),
          h('h2', null, 'Ear training complete'),
          h('p', { class: 'big-number' }, `${score}/${rounds.length}`),
          h('div', { class: 'actions stack' },
            h('button', { type: 'button', class: 'btn primary wide', onclick: quiz }, 'Go again'),
            h('button', { type: 'button', class: 'btn ghost wide', onclick: list }, 'Back to the pairs'))));
        return;
      }
      const { contrast, p } = rounds[i];
      const options = [[p[0], p[1]], [p[2], p[3]]];
      const answer = pick([0, 1]);
      const target = options[answer][0];
      let done = false;
      const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
      const nextBtn = h('button', { type: 'button', class: 'btn primary wide', hidden: true, onclick: () => { i++; round(); } }, 'Next', icon('arrow', 18));
      const buttons = options.map(([w, m], k) => h('button', {
        type: 'button', class: 'option',
        onclick: () => choose(k),
      }, h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(k + 1)), h('span', { class: 'option-label' }, h('b', { lang: lang.code }, w), h('small', null, ` ${m}`))));

      function choose(k) {
        if (done) return;
        done = true;
        const ok = k === answer;
        if (ok) score++;
        buttons.forEach((b, j) => {
          b.disabled = true;
          b.classList.add(j === answer ? 'correct' : j === k ? 'wrong' : 'dim');
        });
        set(feedback, h('div', { class: `reveal ${ok ? 'good' : 'bad'}` },
          h('p', { class: 'verdict' }, icon(ok ? 'check' : 'x', 18), ok ? 'Yes!' : `It was “${target}”.`),
          h('div', { class: 'chip-row' }, options.map(([w]) =>
            h('button', { type: 'button', class: 'chip', onclick: () => ctx.say(w, { slow: true }) }, icon('volume', 14), h('b', { lang: lang.code }, w))))));
        nextBtn.hidden = false;
        nextBtn.focus({ preventScroll: true });
      }

      unbind = bindKeys({ 1: () => choose(0), 2: () => choose(1), r: () => ctx.say(target), Enter: () => { if (done) { i++; round(); } } });
      set(wrap, h('div', { class: 'exercise' },
        h('p', { class: 'kicker' }, `Round ${i + 1} of ${rounds.length} · ${contrast}`),
        h('div', { class: 'prompt listen-prompt' },
          h('button', { type: 'button', class: 'big-play', 'aria-label': 'Play again', onclick: () => ctx.say(target) }, icon('volume', 40)),
          h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(target, { slow: true }) }, icon('slow', 14), 'Slowly')),
        h('p', { class: 'hint center' }, 'Which word did you hear?'),
        h('div', { class: 'options two' }, buttons),
        feedback,
        h('div', { class: 'actions' }, nextBtn)));
      sayLater(roundScope.ctx, target);
    }
    round();
  }

  list();
  return wrap;
}

/** Link to the speaking drill for exactly these words (e.g. the lesson just finished). */
export function lessonDrillHref(words) {
  return `#/speak/drill/lesson/${words.map((w) => encodeURIComponent(w.id)).join('/')}`;
}

/**
 * Speaking drill. `scope` is 'learned', a category id, or 'lesson' followed
 * by the ids of the words to drill (see lessonDrillHref).
 */
function drill(ctx, scope, ...ids) {
  const { lang } = ctx;
  const learned = learnedWords(ctx);
  const lesson = scope === 'lesson' ? ids.map((id) => lang.byId(id)).filter(Boolean) : [];
  const scopeId = lesson.length ? 'lesson'
    : (scope && scope !== 'lesson' ? scope : (learned.length >= 5 ? 'learned' : lang.categories[0].id));
  const pool = scopeId === 'lesson' ? lesson : scopeId === 'learned' ? learned : lang.wordsIn(scopeId);
  // A lesson's words come in the order they were taught; other lists are shuffled.
  const words = scopeId === 'lesson' ? lesson : shuffle(pool.length ? pool : lang.wordsIn(lang.categories[0].id));
  let i = 0;
  const stage = h('div');
  // Each card gets its own cleanup scope, so Next/Previous stop the previous
  // card's recognition, recording and pending autoplay.
  const card = cleanupScope(ctx);

  const select = h('select', {
    class: 'select', 'aria-label': 'Words to drill',
    onchange: (e) => ctx.go(`/speak/drill/${e.target.value}`),
  },
    lesson.length ? h('option', { value: 'lesson', selected: true }, `This lesson’s words (${lesson.length})`) : null,
    h('option', { value: 'learned', disabled: learned.length < 1, selected: scopeId === 'learned' }, `Words I’ve learned (${learned.length})`),
    lang.categories.map((c) => h('option', { value: c.id, selected: scopeId === c.id }, `${c.emoji} ${c.name}`)));

  function show() {
    card.cleanup();
    ctx.speech.cancelSpeech();
    const c = card.ctx;
    const w = words[i];
    set(stage, h('div', { class: 'card drill-card' },
      h('p', { class: 'kicker' }, `${i + 1} / ${words.length}`),
      h('div', { class: 'word-hero' },
        h('h2', { class: 'hero-tr', lang: lang.code }, w.tr, ' ', playButton(c, w.tr), playButton(c, w.tr, { slow: true })),
        readingLine(c, w),
        h('p', { class: 'hero-en' }, w.en)),
      pronunciationPanel(c, w),
      speakPractice(c, w),
      exampleBlock(c, w),
      h('div', { class: 'actions split' },
        h('button', { type: 'button', class: 'btn', disabled: i === 0, onclick: () => { i--; show(); } }, icon('back', 18), 'Previous'),
        h('button', { type: 'button', class: 'btn primary', onclick: () => { i = (i + 1) % words.length; show(); } }, 'Next', icon('arrow', 18))),
    ));
    if (ctx.settings.autoplay) sayLater(c, w.tr);
  }

  show();
  return h('section', null,
    h('p', { class: 'muted' }, 'Listen, then say each word. You’ll get a score and the letters to work on. Use “Record myself” to hear your voice next to the native audio.'),
    h('label', { class: 'field' }, h('span', null, 'Words'), select),
    stage,
  );
}
