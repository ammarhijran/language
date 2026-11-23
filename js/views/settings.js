import { h, icon, set, storageBanner } from '../ui.js';
import * as speech from '../speech.js';
import { voiceBanner } from '../components.js';
import { GOALS } from './welcome.js';
import { languageCards } from './language.js';
import { remindersSupported, askPermission, parseTime, DEFAULT_TIME } from '../reminders.js';
import { saveTextFile } from '../native.js';
import { wordsCsv } from '../wordlist.js';
import { agoText } from './me.js';
import { MODES, ACCENTS, BACKGROUNDS, CUSTOM_ACCENT, DARK_QUERY, resolveMode, accentKey, backgroundKey, backgroundName, hueOf, palette } from '../themes.js';

export default function settings(ctx) {
  const { lang, store } = ctx;
  const s = store.getSettings();

  const voiceSelect = h('select', {
    class: 'select', id: 'voice',
    onchange: (e) => { store.updateSettings({ voices: { ...store.getSettings().voices, [lang.code]: e.target.value } }); fillVoiceList(); ctx.say(lang.greeting); },
  });
  const fillVoices = () => {
    const voices = speech.voicesFor(lang.speechLang);
    set(voiceSelect, 
      h('option', { value: '' }, voices.length ? 'Automatic' : `No ${lang.name} voices found`),
      voices.map((v) => h('option', { value: v.voiceURI, selected: v.voiceURI === store.getSettings().voices?.[lang.code] }, `${v.name} (${v.lang})${v.localService ? '' : ' · online'}`)));
  };
  // Compare voices: the same sentence in every installed voice, so the learner
  // can keep the most natural one (the biggest lever on how the audio sounds).
  const QUALITY = { premium: 'Premium', enhanced: 'Enhanced', basic: 'Basic', novelty: 'Novelty voice' };
  const voiceList = h('div', { class: 'voice-list', hidden: true });
  const useVoice = (uri) => {
    store.updateSettings({ voices: { ...store.getSettings().voices, [lang.code]: uri } });
    voiceSelect.value = uri;
    fillVoiceList();
  };
  function fillVoiceList() {
    const voices = speech.voicesFor(lang.speechLang);
    const chosen = store.getSettings().voices?.[lang.code] || '';
    const inUse = voices.find((v) => v.voiceURI === chosen) || voices[0];
    voiceList.hidden = voices.length < 2;
    if (voiceList.hidden) return;
    const sample = lang.speech(lang.sampleSentence).text;
    set(voiceList,
      h('p', { class: 'hint' }, 'Hear the same sentence in each voice and keep the one that sounds most natural.'),
      voices.map((v, i) => h('div', { class: `voice-row${v === inUse ? ' selected' : ''}` },
        h('button', {
          type: 'button', class: 'icon-btn play', 'aria-label': `Hear ${v.name}`,
          onclick: () => speech.speak(sample, { lang: v.lang, voiceURI: v.voiceURI, rate: store.getSettings().rate, regions: [v.lang] }),
        }, icon('volume')),
        h('span', { class: 'voice-name' },
          h('b', null, v.name),
          h('small', null, [v.lang, QUALITY[speech.voiceQuality(v)], speech.isOnlineVoice(v) ? 'needs internet' : null, i === 0 ? 'suggested' : null].filter(Boolean).join(' · '))),
        v === inUse
          ? h('span', { class: 'voice-on' }, icon('check', 16), 'In use')
          : h('button', { type: 'button', class: 'btn small', onclick: () => useVoice(v.voiceURI) }, 'Use'))));
  }
  const fillAll = () => { fillVoices(); fillVoiceList(); };
  fillAll();
  ctx.onCleanup(speech.onVoicesChanged(fillAll));

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
  const toggle = (key) => h('input', { type: 'checkbox', checked: s[key] !== false, onchange: (e) => store.updateSettings({ [key]: e.target.checked }) });
  // The pack's voice switch, and an entry to hear it with.
  const ownSays = Object.entries(store.getSay(lang.code)).map(([id, text]) => [lang.byId(id), text]).filter(([w]) => w);
  const voiceOption = lang.voiceOption || null;
  const voiceSample = voiceOption ? lang.words.find((w) => w.tr === voiceOption.sample) || null : null;
  const autoplay = h('input', { type: 'checkbox', checked: s.autoplay, onchange: (e) => store.updateSettings({ autoplay: e.target.checked }) });

  const fileInput = h('input', {
    type: 'file', accept: 'application/json,.json', hidden: true,
    onchange: async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        store.importData(await file.text());
        ctx.applyDisplaySettings?.(); // the file's theme, text size and reading aids
        ctx.refreshOwnWords?.(); // and its "My words"
        ctx.summariseLanguages?.({ fresh: true });
        ctx.toast('Progress imported.');
        ctx.rerender();
      } catch (err) {
        ctx.toast(err.message || 'Could not import that file.');
      }
    },
  });

  // In the apps a file goes through the share sheet (a WebView cannot download); on the web it is a download.
  const cancelled = (e) => /cancel|abort/i.test(String(e?.message || e));
  const backupText = () => `Last backup or sync code from this device: ${agoText(store.lastBackup())}.`;
  const backupLine = h('p', { class: 'hint', 'aria-live': 'polite' }, backupText());
  function exportProgress() {
    saveTextFile(`lisan-progress-${store.dayKey()}.json`, store.exportData(), { type: 'application/json', dialogTitle: 'Save your Lisan backup' })
      .then(() => { store.noteBackup(); backupLine.textContent = backupText(); })
      .catch((e) => { if (!cancelled(e)) ctx.toast('Couldn’t save the file.'); });
  }
  function exportWords() {
    const { count, text } = wordsCsv(lang, store.getCards(lang.code), store.getNotes(lang.code));
    if (!count) { ctx.toast('Learn a few words first — then there is a list to export.'); return; }
    saveTextFile(`lisan-${lang.code}-words-${store.dayKey()}.csv`, text, { type: 'text/csv', dialogTitle: `Save your ${lang.name} word list` })
      .catch((e) => { if (!cancelled(e)) ctx.toast('Couldn’t save the file.'); });
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

  // Daily reminder: a local notification scheduled on the device (apps only).
  const reminderNote = h('p', { class: 'hint', 'aria-live': 'polite' });
  const timeOk = (t) => { const { hour, minute } = parseTime(t); return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`; };
  const reminderTime = h('input', {
    type: 'time', class: 'select', id: 'reminder-time', value: timeOk(s.reminderTime || DEFAULT_TIME), disabled: !s.reminder,
    onchange: (e) => { store.updateSettings({ reminderTime: timeOk(e.target.value) }); ctx.planReminders?.(); },
  });
  const reminderOn = h('input', {
    type: 'checkbox', checked: !!s.reminder,
    onchange: async (e) => {
      const box = e.target;
      if (box.checked && !(await askPermission())) {
        box.checked = false;
        reminderNote.textContent = 'Notifications are turned off for Lisan. Allow them in your phone’s Settings → Apps → Lisan → Notifications, then switch this on again.';
      } else {
        reminderNote.textContent = box.checked ? `You’ll get one reminder a day at ${reminderTime.value} — skipped once you’ve met your goal.` : '';
      }
      store.updateSettings({ reminder: box.checked });
      reminderTime.disabled = !box.checked;
      ctx.planReminders?.();
    },
  });
  const reminderCard = h('section', { class: 'card form' },
    h('h2', { class: 'card-title' }, 'Daily reminder'),
    remindersSupported()
      ? [
        h('label', { class: 'field inline' }, reminderOn, h('span', null, `Remind me to practise ${lang.name}`)),
        h('label', { class: 'field', for: 'reminder-time' }, h('span', null, 'At'), reminderTime),
        h('p', { class: 'hint' }, 'Reminders are scheduled on this phone — nothing is sent anywhere. Today’s is skipped once you reach your daily goal, and they stop by themselves if you don’t open the app for two weeks.'),
        reminderNote,
      ]
      : h('p', { class: 'hint' }, 'Daily reminders are available in the Lisan app for Android and iOS. A website can’t reliably notify you while it is closed.'));

  // Display: text size for everyone; reading aids for scripts that have them.
  const pick = (key, options) => h('select', {
    class: 'select', id: `set-${key}`,
    onchange: (e) => { store.updateSettings({ [key]: e.target.value }); ctx.applyDisplaySettings?.(); },
  }, options.map(([value, label]) => h('option', { value, selected: (s[key] || options[0][0]) === value }, label)));
  const aidField = lang.code === 'ja'
    ? [h('label', { class: 'field', for: 'set-aidJa' }, h('span', null, 'Readings under Japanese'),
      pick('aidJa', [['full', 'Kana and rōmaji'], ['script', 'Kana only'], ['off', 'Hidden']])),
    h('p', { class: 'hint' }, 'New words, answers and word pages always show the full reading. Hide rōmaji once you can read kana — it is the fastest way to stop depending on it.')]
    : lang.code === 'ar'
      ? [h('label', { class: 'field', for: 'set-aidAr' }, h('span', null, 'Transliteration under Arabic'),
        pick('aidAr', [['full', 'Shown'], ['off', 'Hidden']])),
      h('p', { class: 'hint' }, 'New words, answers and word pages always show the transliteration. Hide it elsewhere once you can read the script.')]
      : null;
  // Who is speaking: packs with feminine forms (Ukrainian, Arabic) can give
  // first-person phrases in the form a woman says. It changes the pack, so the app reloads.
  const speakerField = lang.feminine
    ? [h('label', { class: 'field', for: 'set-speakAs' }, h('span', null, 'I speak as'),
      h('select', {
        class: 'select', id: 'set-speakAs',
        onchange: (e) => { store.updateSettings({ speakAs: e.target.value }); store.flush?.(); location.reload(); },
      }, [['m', 'A man'], ['f', 'A woman']].map(([value, label]) => h('option', { value, selected: (s.speakAs || 'm') === value }, label)))),
    h('p', { class: 'hint' }, `${lang.name} changes some “I …” phrases with the speaker (${lang.code === 'uk' ? 'Я згоден / Я згодна' : 'آسِف / آسِفَة'}). Lisan shows, says and checks the form you choose; the other one still counts as right.`)]
    : null;
  // Theme: light or dark, the colour of buttons and links, and the page
  // background. Everything applies at once; the swatches show the colours of
  // the mode in force, so they are redrawn when the mode changes.
  const setTheme = (patch) => {
    const row = document.activeElement?.closest?.('.swatches');
    store.updateSettings(patch);
    ctx.applyDisplaySettings?.();
    drawTheme();
    row?.querySelector('[aria-pressed="true"]')?.focus(); // the swatches were redrawn: keep the keyboard where it was
  };
  const modeNow = () => resolveMode(store.getSettings().theme, window.matchMedia?.(DARK_QUERY).matches);
  const swatch = (label, pressed, vars, onclick, cls = '') => h('button', {
    type: 'button', class: `swatch ${cls}`.trim(), 'aria-pressed': String(pressed), 'aria-label': label, title: label, style: vars, onclick,
  });
  const accentRow = h('div', { class: 'swatches', role: 'group', 'aria-labelledby': 'set-accent-label' });
  const accentName = h('b');
  const bgRow = h('div', { class: 'swatches', role: 'group', 'aria-labelledby': 'set-background-label' });
  const bgName = h('b');
  const hue = h('input', {
    type: 'range', class: 'hue-slider', id: 'set-accentHue', min: '0', max: '359', step: '1', 'aria-label': 'Your own colour',
    oninput: (e) => {
      // Dragging: recolour the page without rebuilding the swatches (the slider keeps the pointer).
      store.updateSettings({ accent: CUSTOM_ACCENT, accentHue: Number(e.target.value) });
      ctx.applyDisplaySettings?.();
    },
    onchange: () => drawTheme(),
  });
  const hueField = h('label', { class: 'field', for: 'set-accentHue' }, h('span', null, 'Your own colour'), hue);
  function drawTheme() {
    const now = store.getSettings();
    const mode = modeNow();
    const accent = accentKey(now);
    const background = backgroundKey(now);
    accentName.textContent = accent === CUSTOM_ACCENT ? 'Your own' : ACCENTS[accent].name;
    set(accentRow,
      Object.entries(ACCENTS).map(([key, a]) => swatch(a.name, key === accent,
        { '--sw': a[mode][0], '--sw-ink': a[mode][2] }, () => setTheme({ accent: key }))),
      swatch('Your own colour', accent === CUSTOM_ACCENT,
        accent === CUSTOM_ACCENT ? { '--sw': palette(now, mode).accent[0], '--sw-ink': palette(now, mode).accent[2] } : { '--sw-ink': '#ffffff' },
        () => { setTheme({ accent: CUSTOM_ACCENT, accentHue: hueOf(now) }); hue.focus(); }, accent === CUSTOM_ACCENT ? '' : 'rainbow'));
    hueField.hidden = accent !== CUSTOM_ACCENT;
    hue.value = String(hueOf(now));
    hue.setAttribute('aria-valuetext', `Hue ${hueOf(now)}°`);
    bgName.textContent = backgroundName(background, mode);
    set(bgRow, Object.entries(BACKGROUNDS).map(([key, b]) => swatch(backgroundName(key, mode), key === background,
      { '--sw': b[mode][0], '--sw-card': b[mode][1], '--sw-line': b[mode][3], '--sw-ink': mode === 'dark' ? '#f3eee6' : '#1f1b16' },
      () => setTheme({ background: key }), 'page')));
  }
  drawTheme();
  const themeFields = [
    h('label', { class: 'field', for: 'set-theme' }, h('span', null, 'Theme'),
      h('select', { class: 'select', id: 'set-theme', onchange: (e) => setTheme({ theme: e.target.value }) },
        MODES.map(([value, label]) => h('option', { value, selected: (MODES.some(([m]) => m === s.theme) ? s.theme : 'system') === value }, label)))),
    h('div', { class: 'field' }, h('span', { id: 'set-accent-label' }, 'Colour: ', accentName), accentRow),
    hueField,
    h('div', { class: 'field' }, h('span', { id: 'set-background-label' }, 'Background: ', bgName), bgRow),
    h('p', { class: 'hint' }, 'The colour is used for buttons, links and highlights. Every combination keeps text easy to read; right and wrong answers stay green and red.'),
  ];
  const displayCard = h('section', { class: 'card form' },
    h('h2', { class: 'card-title' }, 'Display'),
    themeFields,
    h('label', { class: 'field', for: 'set-textSize' }, h('span', null, 'Text size'),
      pick('textSize', [['m', 'Normal'], ['l', 'Large'], ['xl', 'Extra large']])),
    aidField,
    speakerField);

  return h('div', { class: 'view' },
    h('h1', null, 'Settings'),
    storageBanner(ctx),
    voiceBanner(ctx),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Language'),
      languageCards(ctx, { path: '/settings' })),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Audio'),
      h('label', { class: 'field', for: 'voice' }, h('span', null, `${lang.name} voice`), voiceSelect),
      voiceList,
      h('label', { class: 'field', for: 'rate' }, h('span', null, 'Speaking speed ', rateOut), rate),
      h('label', { class: 'field inline' }, autoplay, h('span', null, 'Play words automatically')),
      h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(lang.sampleSentence) }, icon('volume', 16), 'Test voice'),
      // The pack's own way of helping the voice (Ukrainian stress marks, Japanese kana): a switch to try.
      voiceOption ? [
        h('label', { class: 'field inline' },
          h('input', {
            type: 'checkbox', id: 'set-voiceOption', checked: s[voiceOption.setting] === true,
            onchange: (e) => {
              store.updateSettings({ [voiceOption.setting]: e.target.checked });
              ctx.applyDisplaySettings?.();
              if (voiceSample) ctx.say(voiceSample); // hear the difference at once
            },
          }),
          h('span', null, voiceOption.label)),
        h('p', { class: 'hint' }, voiceOption.hint, voiceSample ? ' Listen with it on and off, and keep what sounds better.' : ''),
        voiceSample ? h('button', { type: 'button', class: 'btn small', id: 'voiceOption-listen', onclick: () => ctx.say(voiceSample) },
          icon('volume', 16), h('span', { lang: lang.code }, `“${voiceSample.tr}”`)) : null,
      ] : null,
      // The learner's own spellings for the voice (a word's page → "Voice says it wrong?"), to find and undo.
      ownSays.length ? h('details', { class: 'voice-fixes' },
        h('summary', null, `Your spellings for the voice (${ownSays.length})`),
        h('ul', { class: 'word-chips' }, ownSays.map(([w, text]) => h('li', null,
          h('a', { href: `#/word/${encodeURIComponent(w.id)}` }, h('b', { lang: lang.code }, w.tr), ' → ', h('span', { lang: lang.code }, text))))),
        h('button', {
          type: 'button', class: 'btn small', id: 'voice-fixes-clear',
          onclick: () => {
            if (!confirm(`Go back to the course’s spelling for ${ownSays.length === 1 ? 'this word' : `all ${ownSays.length} words`}?`)) return;
            for (const [w] of ownSays) store.setSay(lang.code, w.id, '');
            lang.setOwnSay(store.getSay(lang.code));
            ctx.toast('The voice reads the course’s spellings again.');
            ctx.rerender();
          },
        }, 'Use the course’s spelling for all')) : null,
      h('p', { class: 'hint' }, 'Speech recognition: ', speech.recognitionSupported()
        ? 'available ✓ (it may send your audio to an online service — Google, Apple or your browser maker — to transcribe it).'
        : 'not available in this browser — try Chrome, Edge or Safari to get pronunciation scores.')),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Motivation'),
      h('label', { class: 'field inline' }, gameOn, h('span', null, 'Game features — XP, levels, weekly challenges, achievements and celebrations')),
      h('p', { class: 'hint' }, 'Daily goal, streaks and personal goals stay on either way.')),
    displayCard,
    reminderCard,
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Lessons'),
      h('label', { class: 'field' }, h('span', null, 'Daily goal'),
        h('select', { class: 'select', onchange: (e) => store.updateSettings({ dailyGoal: Number(e.target.value) }) },
          GOALS.map((g) => h('option', { value: String(g.value), selected: g.value === s.dailyGoal }, `${g.name} — ${g.value} exercises (${g.time})`)))),
      h('label', { class: 'field inline' }, number('lessonSize', 3, 15), h('span', null, 'New words per lesson')),
      h('label', { class: 'field inline' }, number('sessionSize', 5, 100), h('span', null, 'Max words per review session')),
      h('label', { class: 'field inline' }, toggle('typing'), h('span', null, 'Typing questions')),
      h('label', { class: 'field inline' }, toggle('speaking'), h('span', null, 'Speaking questions')),
      h('p', { class: 'hint' }, `In reviews and Mixed practice. Switch typing off if you have no ${lang.name} keyboard, speaking off when you can’t talk — the words are then asked by choosing or as flashcards. Spelling and Speaking practice stay available when you pick them yourself.`),
      h('label', { class: 'field inline' },
        h('input', { type: 'checkbox', id: 'set-autoNext', checked: s.autoNext === true, onchange: (e) => store.updateSettings({ autoNext: e.target.checked }) }),
        h('span', null, 'Go on by itself after a right answer')),
      h('p', { class: 'hint' }, 'In multiple-choice questions: the next one comes once the word has been said. A wrong answer always waits for you.'),
      h('label', { class: 'field' }, h('span', null, 'Flashcards show first'),
        h('select', { class: 'select', id: 'set-cardFront', onchange: (e) => store.updateSettings({ cardFront: e.target.value }) },
          h('option', { value: 'en', selected: s.cardFront !== 'word' }, 'The meaning — recall the word'),
          h('option', { value: 'word', selected: s.cardFront === 'word' }, `The ${lang.name} word — recall what it means`)))),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'Your data'),
      h('a', { class: 'btn primary', href: '#/sync' }, icon('repeat', 16), 'Sync between devices'),
      h('p', { class: 'hint' }, 'Copy your progress to another phone, tablet or computer — no account or server needed.'),
      h('p', { class: 'hint' }, 'Progress is saved on this device and never sent to us. Export a backup, or use Sync, to move it to another device.'),
      backupLine,
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn', onclick: exportProgress }, 'Export progress'),
        h('button', { type: 'button', class: 'btn', onclick: () => fileInput.click() }, 'Import progress'),
        h('button', { type: 'button', class: 'btn', onclick: exportWords }, 'Export my words (CSV)'),
        h('button', { type: 'button', class: 'btn danger', onclick: reset }, 'Reset progress')),
      h('p', { class: 'hint' }, `“Export my words” saves the ${lang.name} words you have started as a spreadsheet file (word, reading, meaning, example) — for printing or a flashcard program.`),
      h('p', { class: 'hint' }, `Reset clears only your ${lang.name} words and daily history; XP, achievements and other languages stay.`),
      fileInput),
    h('section', { class: 'card form danger-zone', 'aria-labelledby': 'delete-all-title' },
      h('h2', { class: 'card-title', id: 'delete-all-title' }, 'Delete all my data'),
      h('p', { class: 'hint' }, 'Removes everything Lisan has stored on this device: all languages, XP, achievements, goals, settings, the device id and the sync log — including the copy the app keeps in the phone’s own storage. Backups or sync codes you saved elsewhere aren’t touched.'),
      h('button', { type: 'button', class: 'btn danger', onclick: deleteAll }, 'Delete all my data')),
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, 'About the lessons'),
      h('p', { class: 'hint' }, 'Lisan’s words, phrases, grammar notes and texts were written and checked with AI help and automated tests. They haven’t been reviewed by native speakers yet — if a native speaker tells you something different, trust them.')),
    h('p', { class: 'hint center' }, 'Lisan · ', h('a', { href: 'privacy.html' }, 'Privacy policy')),
  );
}
