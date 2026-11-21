import { h, icon, set } from '../ui.js';
import * as speech from '../speech.js';
import { voiceBanner } from '../components.js';
import { GOALS } from './welcome.js';
import { languageCards } from './language.js';

export default function settings(ctx) {
  const { lang, store } = ctx;
  const s = store.getSettings();

  const voiceSelect = h('select', {
    class: 'select', id: 'voice',
    onchange: (e) => { store.updateSettings({ voices: { ...s.voices, [lang.code]: e.target.value } }); ctx.say(lang.greeting); },
  });
  const fillVoices = () => {
    const voices = speech.voicesFor(lang.speechLang);
    set(voiceSelect, 
      h('option', { value: '' }, voices.length ? 'Automatic' : `No ${lang.name} voices found`),
      voices.map((v) => h('option', { value: v.voiceURI, selected: v.voiceURI === s.voices?.[lang.code] }, `${v.name} (${v.lang})${v.localService ? '' : ' · online'}`)));
  };
  fillVoices();
  ctx.onCleanup(speech.onVoicesChanged(fillVoices));

  const rateOut = h('output', { for: 'rate' }, `${s.rate.toFixed(2)}×`);
  const rate = h('input', {
    type: 'range', id: 'rate', min: '0.5', max: '1.2', step: '0.05', value: String(s.rate),
    oninput: (e) => { rateOut.textContent = `${Number(e.target.value).toFixed(2)}×`; },
    onchange: (e) => { store.updateSettings({ rate: Number(e.target.value) }); ctx.say(lang.sampleSentence); },
  });

  const number = (key, min, max) => h('input', {
    type: 'number', class: 'num', min: String(min), max: String(max), value: String(s[key]),
    onchange: (e) => {
      const v = Math.min(max, Math.max(min, Math.round(Number(e.target.value) || s[key])));
      e.target.value = v;
      store.updateSettings({ [key]: v });
    },
  });

  const gameOn = h('input', { type: 'checkbox', checked: s.gameOn, onchange: (e) => { store.updateSettings({ gameOn: e.target.checked }); ctx.toast(e.target.checked ? 'Game features on' : 'Game features off'); } });
  const autoplay = h('input', { type: 'checkbox', checked: s.autoplay, onchange: (e) => store.updateSettings({ autoplay: e.target.checked }) });

  const fileInput = h('input', {
    type: 'file', accept: 'application/json,.json', hidden: true,
    onchange: async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        store.importData(await file.text());
        ctx.toast('Progress imported.');
        ctx.rerender();
      } catch (err) {
        ctx.toast(err.message || 'Could not import that file.');
      }
    },
  });

  function exportProgress() {
    const blob = new Blob([store.exportData()], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: `lisan-progress-${store.dayKey()}.json` });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function reset() {
    if (!confirm(`Delete all your ${lang.name} progress on this device? This can’t be undone.`)) return;
    store.resetProgress(lang.code);
    ctx.toast('Progress reset.');
    ctx.go('/');
  }

  // Everything, every language, then a fresh start on the welcome screen.
  async function deleteAll() {
    if (!confirm('Delete ALL your Lisan data on this device — every language’s words and streaks, XP, achievements, goals, settings and sync history? This can’t be undone.')) return;
    await store.deleteAllData();
    history.replaceState(null, '', '#/welcome');
    location.reload();
  }

  return h('div', { class: 'view' },
    h('h1', null, 'Settings'),
    voiceBanner(ctx),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Language'),
      languageCards(ctx, { path: '/settings' })),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Audio'),
      h('label', { class: 'field', for: 'voice' }, h('span', null, `${lang.name} voice`), voiceSelect),
      h('label', { class: 'field', for: 'rate' }, h('span', null, 'Speaking speed ', rateOut), rate),
      h('label', { class: 'field inline' }, autoplay, h('span', null, 'Play words automatically')),
      h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(lang.sampleSentence) }, icon('volume', 16), 'Test voice'),
      h('p', { class: 'hint' }, 'Speech recognition: ', speech.recognitionSupported()
        ? 'available ✓ (it may send your audio to an online service — Google, Apple or your browser maker — to transcribe it).'
        : 'not available in this browser — try Chrome, Edge or Safari to get pronunciation scores.')),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Motivation'),
      h('label', { class: 'field inline' }, gameOn, h('span', null, 'Game features — XP, levels, weekly challenges, achievements and celebrations')),
      h('p', { class: 'hint' }, 'Daily goal, streaks and personal goals stay on either way.')),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Lessons'),
      h('label', { class: 'field' }, h('span', null, 'Daily goal'),
        h('select', { class: 'select', onchange: (e) => store.updateSettings({ dailyGoal: Number(e.target.value) }) },
          GOALS.map((g) => h('option', { value: String(g.value), selected: g.value === s.dailyGoal }, `${g.name} — ${g.value} exercises (${g.time})`)))),
      h('label', { class: 'field inline' }, number('lessonSize', 3, 15), h('span', null, 'New words per lesson')),
      h('label', { class: 'field inline' }, number('sessionSize', 5, 100), h('span', null, 'Max words per review session'))),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Your data'),
      h('a', { class: 'btn primary', href: '#/sync' }, icon('repeat', 16), 'Sync between devices'),
      h('p', { class: 'hint' }, 'Copy your progress to another phone, tablet or computer — no account or server needed.'),
      h('p', { class: 'hint' }, 'Progress is saved on this device and never sent to us. Export a backup, or use Sync, to move it to another device.'),
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn', onclick: exportProgress }, 'Export progress'),
        h('button', { type: 'button', class: 'btn', onclick: () => fileInput.click() }, 'Import progress'),
        h('button', { type: 'button', class: 'btn danger', onclick: reset }, 'Reset progress')),
      h('p', { class: 'hint' }, `Reset clears only your ${lang.name} words and daily history; XP, achievements and other languages stay.`),
      fileInput),
    h('section', { class: 'card form danger-zone', 'aria-labelledby': 'delete-all-title' },
      h('h2', { class: 'card-title', id: 'delete-all-title' }, 'Delete all my data'),
      h('p', { class: 'hint' }, 'Removes everything Lisan has stored on this device: all languages, XP, achievements, goals, settings, the device id and the sync log — including the copy the app keeps in the phone’s own storage. Backups or sync codes you saved elsewhere aren’t touched.'),
      h('button', { type: 'button', class: 'btn danger', onclick: deleteAll }, 'Delete all my data')),
    h('p', { class: 'hint center' }, 'Lisan · ', h('a', { href: 'privacy.html' }, 'Privacy policy')),
  );
}
