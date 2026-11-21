// First-run welcome: pick a daily goal, check the sound, explain the microphone.
import { h, icon, set } from '../ui.js';
import * as speech from '../speech.js';
import { voiceBanner } from '../components.js';

export const GOALS = [
  { value: 10, name: 'Casual', time: '~3 min a day' },
  { value: 20, name: 'Regular', time: '~5 min a day' },
  { value: 40, name: 'Serious', time: '~10 min a day' },
  { value: 60, name: 'Intense', time: '~15 min a day' },
];

export default function welcome(ctx) {
  const { lang, store } = ctx;
  let goal = ctx.settings.dailyGoal;

  const goalButtons = GOALS.map((g) => h('button', {
    type: 'button',
    class: `choice${g.value === goal ? ' selected' : ''}`,
    'aria-pressed': String(g.value === goal),
    onclick: (e) => {
      goal = g.value;
      goalButtons.forEach((b) => { b.classList.toggle('selected', b === e.currentTarget); b.setAttribute('aria-pressed', String(b === e.currentTarget)); });
    },
  }, h('b', null, g.name), h('small', null, `${g.value} exercises · ${g.time}`)));

  const voiceStatus = h('p', { class: 'hint', 'aria-live': 'polite' });
  const updateVoice = () => {
    if (!speech.ttsSupported()) return set(voiceStatus, 'Audio isn’t available here.');
    if (!speech.voicesReady()) return set(voiceStatus, 'Looking for a Turkish voice…');
    const v = speech.voicesFor(lang.speechLang)[0];
    set(voiceStatus, v ? `✓ ${lang.name} voice ready: ${v.name}` : '');
  };
  updateVoice();
  ctx.onCleanup(speech.onVoicesChanged(updateVoice));

  function finish(path) {
    store.updateSettings({ dailyGoal: goal, onboarded: true });
    ctx.go(path);
  }

  const greetingWords = [['Merhaba', 'hello'], ['Teşekkürler', 'thanks'], ['Günaydın', 'good morning']];

  return h('div', { class: 'view welcome' },
    h('section', { class: 'welcome-hero' },
      h('img', { src: 'icons/icon.svg', alt: '', width: 72, height: 72 }),
      h('h1', null, h('span', { lang: lang.code }, 'Hoş geldin!'), ' Welcome to Lisan'),
      h('p', { class: 'muted' }, `Learn everyday ${lang.name} words — and learn to say them properly. Short lessons, spaced reviews and instant pronunciation feedback.`),
      h('div', { class: 'chip-row center-row' }, greetingWords.map(([w, en]) =>
        h('button', { type: 'button', class: 'chip', onclick: () => ctx.say(w) }, icon('volume', 14), h('b', { lang: lang.code }, w), h('span', null, en)))),
    ),

    h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, '1 · Set a daily goal'),
      h('p', { class: 'hint' }, 'Every review, new word and practice question counts. Small and steady beats long and rare.'),
      h('div', { class: 'choice-grid' }, goalButtons),
    ),

    h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, '2 · Sound check'),
      h('p', null, 'Tap to hear Turkish. If it doesn’t sound Turkish, follow the tip below to install a voice.'),
      h('button', { type: 'button', class: 'btn primary', onclick: () => ctx.say('Merhaba! Türkçe öğrenmeye hazır mısın?') },
        icon('volume', 18), 'Play “Merhaba!”'),
      voiceStatus,
      voiceBanner(ctx),
    ),

    h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, '3 · Speaking practice'),
      h('p', null, speech.recognitionSupported()
        ? 'When you practise speaking, Lisan asks for microphone access and scores your pronunciation. Nothing is saved or sent to us.'
        : 'Pronunciation scoring isn’t available in this browser (try Chrome, Edge or Safari, or the Lisan app). Everything else works.'),
    ),

    h('div', { class: 'actions stack welcome-actions' },
      h('button', { type: 'button', class: 'btn primary wide', onclick: () => finish(`/learn/${lang.categories[0].id}`) },
        'Start my first lesson', icon('arrow', 18)),
      h('button', { type: 'button', class: 'btn ghost wide', onclick: () => finish('/') }, 'Look around first'),
    ),
  );
}
