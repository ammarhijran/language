import { h, icon, set } from '../ui.js';
import * as speech from '../speech.js';
import { voiceBanner } from '../components.js';

export default function settings(ctx) {
  const { lang, store } = ctx;
  const s = store.getSettings();

  const voiceSelect = h('select', {
    class: 'select', id: 'voice',
    onchange: (e) => { store.updateSettings({ voiceURI: e.target.value }); ctx.say(lang.greeting); },
  });
  const fillVoices = () => {
    const voices = speech.voicesFor(lang.speechLang);
    set(voiceSelect, 
      h('option', { value: '' }, voices.length ? 'Automatic' : `No ${lang.name} voices found`),
      voices.map((v) => h('option', { value: v.voiceURI, selected: v.voiceURI === s.voiceURI }, `${v.name} (${v.lang})${v.localService ? '' : ' · online'}`)));
  };
  fillVoices();
  ctx.onCleanup(speech.onVoicesChanged(fillVoices));

  const rateOut = h('output', { for: 'rate' }, `${s.rate.toFixed(2)}×`);
  const rate = h('input', {
    type: 'range', id: 'rate', min: '0.5', max: '1.2', step: '0.05', value: String(s.rate),
    oninput: (e) => { rateOut.textContent = `${Number(e.target.value).toFixed(2)}×`; },
    onchange: (e) => { store.updateSettings({ rate: Number(e.target.value) }); ctx.say('Merhaba, nasılsın?'); },
  });

  const number = (key, min, max) => h('input', {
    type: 'number', class: 'num', min: String(min), max: String(max), value: String(s[key]),
    onchange: (e) => {
      const v = Math.min(max, Math.max(min, Math.round(Number(e.target.value) || s[key])));
      e.target.value = v;
      store.updateSettings({ [key]: v });
    },
  });

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

  return h('div', { class: 'view' },
    h('h1', null, 'Settings'),
    voiceBanner(ctx),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Audio'),
      h('label', { class: 'field', for: 'voice' }, h('span', null, `${lang.name} voice`), voiceSelect),
      h('label', { class: 'field', for: 'rate' }, h('span', null, 'Speaking speed ', rateOut), rate),
      h('label', { class: 'field inline' }, autoplay, h('span', null, 'Play words automatically')),
      h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say('Merhaba, nasılsın?') }, icon('volume', 16), 'Test voice'),
      h('p', { class: 'hint' }, 'Speech recognition: ', speech.recognitionSupported()
        ? 'available ✓ (it may send your audio to an online service — Google, Apple or your browser maker — to transcribe it).'
        : 'not available in this browser — try Chrome, Edge or Safari to get pronunciation scores.')),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Lessons'),
      h('label', { class: 'field inline' }, number('lessonSize', 3, 15), h('span', null, 'New words per lesson')),
      h('label', { class: 'field inline' }, number('sessionSize', 5, 100), h('span', null, 'Max words per review session'))),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Your data'),
      h('p', { class: 'hint' }, 'Progress is saved only in this browser. Export a backup to move it to another device.'),
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn', onclick: exportProgress }, 'Export progress'),
        h('button', { type: 'button', class: 'btn', onclick: () => fileInput.click() }, 'Import progress'),
        h('button', { type: 'button', class: 'btn danger', onclick: reset }, 'Reset progress')),
      fileInput),
    h('p', { class: 'hint center' }, 'Lisan · ', h('a', { href: 'privacy.html' }, 'Privacy policy')),
  );
}
