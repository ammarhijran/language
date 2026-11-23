import { h, icon, shuffle, pick, bindKeys, set } from '../ui.js';
import { pronunciationPanel, speakPractice, voiceBanner, exampleBlock, readingLine, cleanupScope, sayLater, audioControls, bottomSheet } from '../components.js';
import { learnedWords, coursePairs } from '../stats.js';
import { rich } from './grammar.js';
import { soundWords } from '../sounddrill.js';

// Doing first (speaking, ear training), then the reference (letters, sounds).
// `short`: the label on a phone, so the four always fit in one row.
const TABS = [
  { id: 'drill', name: 'Speak' },
  { id: 'ear', name: 'Ear training', short: 'Ear' },
  { id: 'alphabet', name: 'Alphabet', short: 'Letters', ja: 'Kana' },
  { id: 'sounds', name: 'Sounds' },
];

export default function pronounce(ctx, tab, ...args) {
  // Without a section: speaking, once there are a few words to say; before that, the letters.
  if (!TABS.some((t) => t.id === tab)) tab = learnedWords(ctx).length >= 5 ? 'drill' : 'alphabet';
  const body = { alphabet, sounds, ear, drill }[tab](ctx, ...args);
  const code = ctx.lang.code;
  return h('div', { class: 'view speak-lab' },
    h('h1', null, 'Speak'),
    voiceBanner(ctx),
    h('nav', { class: 'tabs', 'aria-label': 'Speak sections' },
      TABS.map((t) => {
        const name = (code === 'ja' && t.ja) || t.name;
        const short = (code === 'ja' && t.ja) || t.short;
        return h('a', { href: `#/speak/${t.id}`, class: t.id === tab ? 'active' : '', 'aria-current': t.id === tab ? 'page' : null },
          short ? [h('span', { class: 'tab-long' }, name), h('span', { class: 'tab-short', 'aria-hidden': 'true' }, short)] : name);
      })),
    body,
  );
}

// The kana chart as the gojūon table: rows by consonant, columns a i u e o.
const GOJUON = ['あいうえお', 'かきくけこ', 'さしすせそ', 'たちつてと', 'なにぬねの', 'はひふへほ', 'まみむめも', 'や_ゆ_よ', 'らりるれろ', 'わ___を', 'ん____'];
// Arabic letters that never join the letter after them (no initial or medial form).
const AR_NON_JOINING = new Set([...'اأإآدذرزوؤءة']);
const TATWEEL = 'ـ';

/** An Arabic letter's shapes: [label, text], in reading order (isolated first). */
function arabicForms(letter) {
  if (letter === 'ء') return [];
  const forms = [['isolated', letter]];
  if (!AR_NON_JOINING.has(letter)) forms.push(['initial', letter + TATWEEL], ['medial', TATWEEL + letter + TATWEEL]);
  forms.push(['final', TATWEEL + letter]);
  return forms;
}

function alphabet(ctx) {
  const { lang } = ctx;
  const code = lang.code;
  const tile = (l) => h('button', {
    type: 'button', class: `letter${l.special ? ' special' : ''}`, 'aria-haspopup': 'dialog',
    'aria-label': `${l.upper}${l.lowerIsName ? `, ${l.lower}` : ''}: /${l.ipa}/. ${l.hint}`,
    onclick: (e) => open(l, e.currentTarget),
  },
    h('span', { class: 'letter-big', 'aria-hidden': 'true' },
      h('span', { lang: code }, l.upper),
      !l.lowerIsName && l.lower !== l.upper ? h('small', { lang: code }, l.lower) : null),
    h('span', { class: 'ipa', 'aria-hidden': 'true' }, `/${l.ipa}/`));

  function open(l, from) {
    ctx.say(l.ex[0]);
    ctx.game.letterTapped(code, l.key ?? l.lower);
    const forms = code === 'ar' ? arabicForms(l.upper) : [];
    bottomSheet(ctx, {
      label: `${l.upper}${l.lowerIsName ? ` (${l.lower})` : ''}`,
      opener: from,
      className: 'letter-sheet',
      build: () => [
        h('p', { class: 'kicker' }, code === 'ja' ? 'Kana' : 'Letter', l.lowerIsName ? ` · ${l.lower}` : '', l.special ? ' · worth a closer look' : ''),
        h('p', { class: 'letter-sheet-glyph' },
          h('span', { lang: code }, l.upper),
          !l.lowerIsName && l.lower !== l.upper ? h('small', { lang: code }, l.lower) : null,
          h('span', { class: 'ipa' }, `/${l.ipa}/`)),
        forms.length > 1 ? h('ul', { class: 'letter-forms', 'aria-label': 'Its shapes in a word' }, forms.map(([name, text]) =>
          h('li', null, h('b', { lang: 'ar' }, text), h('small', null, name)))) : null,
        h('p', null, rich(l.hint, code)),
        h('div', { class: 'letter-sheet-ex' },
          h('div', { class: 'example-text' }, h('b', { lang: code }, l.ex[0]), h('p', { class: 'muted' }, l.ex[1]))),
        h('div', { class: 'button-row' },
          h('button', { type: 'button', class: 'btn primary sheet-focus', onclick: () => ctx.say(l.ex[0]) }, icon('volume', 18), 'Listen'),
          h('button', { type: 'button', class: 'btn', onclick: () => ctx.say(l.ex[0], { slow: true }) }, icon('slow', 18), 'Slowly')),
      ],
    });
  }

  let chart;
  if (code === 'ja') {
    const byKey = new Map(lang.alphabet.map((l) => [l.key ?? l.upper, l]));
    const placed = new Set();
    const cells = GOJUON.flatMap((row) => [...row].map((k) => {
      const l = k === '_' ? null : byKey.get(k);
      if (!l) return h('span', { class: 'letter-gap', 'aria-hidden': 'true' });
      placed.add(l);
      return tile(l);
    }));
    const extra = lang.alphabet.filter((l) => !placed.has(l));
    chart = [
      h('div', { class: 'letter-grid gojuon' }, cells),
      extra.length ? h('div', { class: 'letter-grid letter-extra' }, extra.map(tile)) : null,
    ];
  } else {
    chart = h('div', { class: 'letter-grid', dir: lang.dir === 'rtl' || code === 'ar' ? 'rtl' : null }, lang.alphabet.map(tile));
  }
  return h('section', null,
    h('p', { class: 'muted' }, lang.alphabetIntro),
    chart,
    lang.alphabet.some((l) => l.special) ? h('p', { class: 'hint letter-legend' }, h('i', { 'aria-hidden': 'true' }), 'Tinted: sounds English speakers find new.') : null,
  );
}

function sounds(ctx) {
  const { lang } = ctx;
  const cards = ctx.store.getCards(lang.code);
  const learned = (w) => !!cards[w.id];
  // The language's own quick exercise about how words sound: its letters, its stress or its beats.
  const quiz = lang.misread ? ['letters', '🔤', 'Tricky letters', 'c, ç, ş, ı, ğ, ö, ü: pick how a word is read']
    : lang.stressPractice ? ['stress', '🎯', 'Word stress', 'Tap the syllable that is stressed']
      : lang.beatPractice ? ['beats', '🥁', 'Count the beats', 'How many beats does a word have?']
        : null;
  // Among the words already learned once there are enough of them, else from the whole course.
  const scope = Object.keys(cards).length >= 40 ? 'learned' : 'all';
  return h('section', { class: 'tips' },
    quiz ? h('a', { class: 'quick-link sound-quiz', href: `#/practice/${quiz[0]}/${scope}` },
      h('span', { class: 'sc-emoji', 'aria-hidden': 'true' }, quiz[1]),
      h('span', null, h('b', null, quiz[2]), h('small', null, quiz[3])),
      icon('arrow', 18)) : null,
    lang.soundTips.map((t) => {
    // The course's words with this sound, the learner's own first, for the speaking drill.
    const words = soundWords(lang, t.id, { learned });
    return h('article', { class: 'card tip' },
      h('h2', null, rich(t.title, lang.code), t.ipa ? h('span', { class: 'ipa' }, ` /${t.ipa}/`) : null),
      h('p', null, rich(t.body, lang.code)),
      h('div', { class: 'chip-row' }, t.examples.map(([w, en]) =>
        h('button', { type: 'button', class: 'chip', onclick: () => ctx.say(w, { slow: true }) },
          icon('volume', 14), h('b', { lang: lang.code }, w), h('span', null, en)))),
      words.length >= 4
        ? h('a', { class: 'btn small tip-drill', href: wordsDrillHref(words) }, icon('mic', 16), `Practise this sound · ${words.length} words`)
        : null,
    );
  }),
    // The sounds put together at speed (a text in Read & Listen).
    h('a', { class: 'quick-link', href: `#/read/${lang.code}-tongue-twisters` },
      h('span', { class: 'sc-emoji', 'aria-hidden': 'true' }, '👅'),
      h('span', null, h('b', null, 'Tongue twisters'), h('small', null, 'Put the sounds together: listen, repeat, speed up')),
      icon('arrow', 18)));
}

function ear(ctx) {
  const { lang } = ctx;
  const wrap = h('section', null);
  // Besides the pack's hand-picked pairs: words of the course itself that are
  // one sound apart, the learner's own first. They are said like any entry.
  const own = coursePairs(lang, ctx.store.getCards(lang.code));
  const groups = [
    ...lang.minimalPairs,
    ...(own.length ? [{ course: true, contrast: 'From the course: words one sound apart', pairs: own.map(({ a, b, contrast }) => [a.tr, a.en, b.tr, b.en, contrast]) }] : []),
  ];

  function list() {
    set(wrap, 
      h('p', { class: 'muted' }, 'These word pairs differ by a single sound. Listen to both, then quiz yourself — training your ear is the fastest way to fix your own pronunciation.'),
      h('button', { type: 'button', class: 'btn primary wide', onclick: quiz }, icon('ear', 18), 'Quiz me (10 rounds)'),
      groups.map((g) => h('div', { class: 'card pair-group' },
        g.course ? h('h2', null, g.contrast)
          : lang.code === 'ar' || lang.code === 'ja' ? h('h2', null, rich(g.contrast, lang.code)) : h('h2', { lang: lang.code }, g.contrast),
        g.pairs.map(([a, am, b, bm]) => h('div', { class: 'pair' },
          pairBtn(a, am), h('span', { class: 'vs' }, 'vs'), pairBtn(b, bm))))),
    );
  }

  function pairBtn(w, m) {
    return h('button', { type: 'button', class: 'pair-btn', onclick: () => ctx.say(w, { slow: true }) },
      icon('volume', 16), h('b', { lang: lang.code }, w), h('small', null, m));
  }

  function quiz() {
    const all = groups.flatMap((g) => g.pairs.map((p) => ({ contrast: p[4] || g.contrast, p })));
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
/** The same for a hand-picked set that is not a lesson (the words with one sound). */
const wordsDrillHref = (words) => lessonDrillHref(words).replace('/drill/lesson/', '/drill/words/');

/**
 * Speaking drill. `scope` is 'learned', a category id, or 'lesson' / 'words'
 * followed by the ids of the words to drill (see lessonDrillHref).
 */
function drill(ctx, scope, ...ids) {
  const { lang } = ctx;
  const learned = learnedWords(ctx);
  const given = scope === 'lesson' || scope === 'words';
  const lesson = given ? ids.map((id) => lang.byId(id)).filter(Boolean) : [];
  const scopeId = lesson.length ? 'lesson'
    : (scope && !given ? scope : (learned.length >= 5 ? 'learned' : lang.categories[0].id));
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
    lesson.length ? h('option', { value: 'lesson', selected: true }, scope === 'words' ? `These words (${lesson.length})` : `This lesson’s words (${lesson.length})`) : null,
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
        h('h2', { class: 'hero-tr', lang: lang.code }, w.tr),
        readingLine(c, w),
        h('p', { class: 'hero-en' }, w.en)),
      audioControls(c, w),
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
