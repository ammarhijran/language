// First run: a short stepper without the app's bars — choose a language, set
// a daily goal, check the sound (and what the microphone is for), then start.
//   #/welcome            step 1, the language
//   #/welcome/goal       step 2 (choosing another language reloads the app here)
//   #/welcome/sound      step 3
//   #/welcome/start      step 4
import { h, icon, set } from '../ui.js';
import * as speech from '../speech.js';
import { voiceBanner } from '../components.js';
import { meta } from '../languages/index.js';
import { switchLanguage } from './language.js';

export const GOALS = [
  { value: 10, name: 'Casual', time: '~3 min a day' },
  { value: 20, name: 'Regular', time: '~5 min a day' },
  { value: 40, name: 'Serious', time: '~10 min a day' },
  { value: 60, name: 'Intense', time: '~15 min a day' },
];

export const STEPS = ['language', 'goal', 'sound', 'start'];

export default function welcome(ctx, stepArg) {
  const { lang, store } = ctx;
  const step = Math.max(0, STEPS.indexOf(stepArg));
  let goal = ctx.settings.dailyGoal;
  let chosen = lang.code;

  function finish(path) {
    store.updateSettings({ dailyGoal: goal, onboarded: true });
    ctx.go(path);
  }
  // Steps replace each other in place (no history entry for each).
  const goTo = (i) => (ctx.replace ? ctx.replace(`/welcome/${STEPS[i]}`) : ctx.go(`/welcome/${STEPS[i]}`));

  const dots = h('ol', { class: 'step-dots', 'aria-label': `Step ${step + 1} of ${STEPS.length}` },
    STEPS.map((_, i) => h('li', { class: i < step ? 'done' : i === step ? 'now' : null, 'aria-hidden': 'true' })));
  const top = h('div', { class: 'welcome-top' },
    step > 0
      ? h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Back', onclick: () => goTo(step - 1) }, icon('back', 22))
      : h('span', { class: 'spacer' }),
    dots,
    step > 0 && step < STEPS.length - 1
      ? h('button', { type: 'button', class: 'link-btn welcome-skip', onclick: () => goTo(STEPS.length - 1) }, 'Skip')
      : h('span', { class: 'spacer' }));

  let body;
  let foot;
  if (step === 0) {
    // Choosing a card only selects it; Continue switches the course (the app
    // reloads into the new language's pack) and moves on.
    const cards = Object.values(meta).map((l) => h('button', {
      type: 'button', class: `lang-card${l.code === chosen ? ' selected' : ''}`, 'aria-pressed': String(l.code === chosen),
      onclick: (e) => {
        chosen = l.code;
        cards.forEach((c) => { const on = c === e.currentTarget; c.classList.toggle('selected', on); c.setAttribute('aria-pressed', String(on)); });
      },
    },
      h('span', { class: 'lang-flag', 'aria-hidden': 'true' }, l.flag),
      h('span', { class: 'lang-names' }, h('b', null, l.name), h('span', { lang: l.code }, l.nativeName)),
      h('small', { class: 'muted' }, `${l.words} words & phrases`),
      icon('check', 18)));
    body = [
      h('section', { class: 'welcome-hero' },
        h('img', { src: 'icons/icon.svg', alt: '', width: 64, height: 64 }),
        h('h1', null, 'Welcome to Lisan'),
        h('p', null, 'Everyday words and phrases, and how to say them properly. Short lessons, spaced reviews and instant pronunciation feedback.')),
      h('section', { 'aria-labelledby': 'welcome-lang' },
        h('h2', { class: 'section-title', id: 'welcome-lang' }, 'What would you like to learn?'),
        h('div', { class: 'lang-grid' }, cards),
        h('p', { class: 'hint' }, 'You can switch at any time — progress is kept for each language.')),
    ];
    foot = [
      h('button', {
        type: 'button', class: 'btn primary wide step-next',
        onclick: () => { if (chosen !== lang.code) switchLanguage(ctx, chosen, `/welcome/${STEPS[1]}`); else goTo(1); },
      }, 'Continue', icon('arrow', 18)),
      h('button', { type: 'button', class: 'btn ghost wide', onclick: () => finish('/sync') }, 'I already use Lisan on another device'),
    ];
  } else if (step === 1) {
    const goalButtons = GOALS.map((g) => h('button', {
      type: 'button',
      class: `choice${g.value === goal ? ' selected' : ''}`,
      'aria-pressed': String(g.value === goal),
      onclick: (e) => {
        goal = g.value;
        store.updateSettings({ dailyGoal: goal });
        goalButtons.forEach((b) => { b.classList.toggle('selected', b === e.currentTarget); b.setAttribute('aria-pressed', String(b === e.currentTarget)); });
      },
    }, h('b', null, g.name), h('small', null, `${g.value} exercises`), h('small', null, g.time)));
    body = [
      h('h1', { class: 'welcome-step-title' }, 'Set a daily goal'),
      h('p', { class: 'hint' }, 'Every review, new word and practice question counts. Small and steady beats long and rare — you can change it later.'),
      h('div', { class: 'choice-grid' }, goalButtons),
    ];
    foot = [h('button', { type: 'button', class: 'btn primary wide step-next', onclick: () => goTo(2) }, 'Continue', icon('arrow', 18))];
  } else if (step === 2) {
    const voiceStatus = h('p', { class: 'hint', 'aria-live': 'polite' });
    const updateVoice = () => {
      if (!speech.ttsSupported()) return set(voiceStatus, 'Audio isn’t available here.');
      if (!speech.voicesReady()) return set(voiceStatus, `Looking for a ${lang.name} voice…`);
      const v = speech.voicesFor(lang.speechLang)[0];
      set(voiceStatus, v ? `✓ ${lang.name} voice ready: ${v.name}` : '');
    };
    updateVoice();
    ctx.onCleanup(speech.onVoicesChanged(updateVoice));
    body = [
      h('h1', { class: 'welcome-step-title' }, 'Sound check'),
      h('p', { class: 'hint' }, `Tap to hear ${lang.name}. If it doesn’t sound right, the tip below shows how to add a voice.`),
      h('div', { class: 'welcome-sound' },
        h('button', { type: 'button', class: 'big-play', 'aria-label': `Play “${lang.greeting}”`, onclick: () => ctx.say(lang.sampleSentence) }, icon('volume', 40)),
        h('p', null, h('b', { lang: lang.code }, lang.greeting)),
        voiceStatus),
      voiceBanner(ctx),
      h('div', { class: 'chip-row center-row' }, lang.sampleWords.map(([w, en]) =>
        h('button', { type: 'button', class: 'chip', onclick: () => ctx.say(w) }, icon('volume', 14), h('b', { lang: lang.code }, w), h('span', null, en)))),
      h('section', { class: 'card' },
        h('h2', { class: 'card-title' }, '🎙️ Speaking practice'),
        h('p', { class: 'hint', style: { margin: 0 } }, speech.recognitionSupported()
          ? 'When you practise speaking, Lisan asks for the microphone and scores your pronunciation. Nothing is saved or sent to us.'
          : 'Pronunciation scoring isn’t available in this browser (try Chrome, Edge or Safari, or the Lisan app). Everything else works.')),
    ];
    foot = [h('button', { type: 'button', class: 'btn primary wide step-next', onclick: () => goTo(3) }, 'Continue', icon('arrow', 18))];
  } else {
    const g = GOALS.find((x) => x.value === goal);
    body = [
      h('section', { class: 'welcome-ready' },
        h('h1', { class: 'welcome-step-title' }, h('span', { lang: lang.code }, lang.welcome)),
        h('p', { class: 'hint' }, `You’re all set to learn ${lang.name}.`),
        h('ul', null,
          h('li', null, h('span', { 'aria-hidden': 'true' }, lang.flag), h('span', null, h('b', null, lang.name), ` · ${lang.words.length} words & phrases in ${lang.categories.length} topics`)),
          h('li', null, h('span', { 'aria-hidden': 'true' }, '🎯'), h('span', null, h('b', null, g ? g.name : `${goal} a day`), g ? ` · ${g.value} exercises a day` : '')),
          h('li', null, h('span', { 'aria-hidden': 'true' }, '📚'), h('span', null, `Your first lesson: ${lang.categories[0].emoji} ${lang.categories[0].name}, ${ctx.settings.lessonSize} words`)))),
    ];
    foot = [
      h('button', { type: 'button', class: 'btn primary wide step-next', onclick: () => finish(`/learn/${lang.categories[0].id}`) },
        'Start my first lesson', icon('arrow', 18)),
      h('button', { type: 'button', class: 'btn ghost wide', onclick: () => finish('/') }, 'Look around first'),
    ];
  }

  // Moving between steps re-renders this screen: start each step at its heading.
  if (stepArg) {
    setTimeout(() => {
      const title = document.querySelector('.welcome-body h1');
      if (!title?.isConnected) return;
      title.setAttribute('tabindex', '-1');
      title.focus({ preventScroll: true });
    }, 0);
  }

  return h('div', { class: 'view welcome' },
    top,
    h('div', { class: 'welcome-body' }, body),
    h('div', { class: 'welcome-foot' }, foot));
}
