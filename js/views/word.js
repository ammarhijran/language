import { h, icon, set } from '../ui.js';
import { audioControls, pronunciationPanel, speakPractice, exampleBlock, readingLine, registerBlock, regBadge, sayLater, backLink, favButton } from '../components.js';
import { status, STATUS_LABEL, markKnown } from '../srs.js';
import { rich } from './grammar.js';
import { loadTexts, textsWithWord } from '../reader.js';
import { lookalikes } from '../stats.js';
import { copyText, canShareText, shareText } from '../native.js';

export default function word(ctx, id) {
  const { lang, store } = ctx;
  const w = lang.byId(id);
  if (!w) {
    return h('div', { class: 'view' },
      backLink(ctx, '#/progress', 'Word list'),
      h('div', { class: 'summary' },
        h('h1', null, 'Word not found'), h('a', { class: 'btn primary', href: '#/progress' }, 'Go to the word list')));
  }
  const card = store.getCard(lang.code, w.id);
  const st = status(card);
  const cat = lang.categories.find((c) => c.id === w.cat);
  const alike = lookalikes(lang, w);
  const stressNote = !/\s/.test(w.tr.trim()) ? lang.stressNote?.(w) || null : null;
  if (ctx.settings.autoplay) sayLater(ctx, w.tr);

  // "In Read & Listen": the texts that use this word, filled in once the texts are loaded.
  const seen = h('section', { class: 'card seen-in', hidden: true });
  let gone = false;
  ctx.onCleanup(() => { gone = true; });
  loadTexts(lang.code).then((texts) => {
    if (gone) return;
    const found = textsWithWord(lang, texts, w.id).slice(0, 4);
    if (!found.length) return;
    seen.hidden = false;
    seen.append(
      h('h2', { class: 'card-title' }, '🎧 In Read & Listen'),
      h('ul', { class: 'seen-list' }, found.map((f) => h('li', null,
        h('a', { href: `#/read/${encodeURIComponent(f.id)}` },
          h('b', null, f.title, f.level ? h('span', { class: `badge level-${f.level}` }, f.level) : null),
          h('span', { lang: lang.code, dir: lang.dir === 'rtl' ? 'rtl' : null }, f.line))))));
  }).catch(() => { /* the texts are optional here */ });

  return h('div', { class: 'view' },
    backLink(ctx, '#/progress', 'Word list'),
    h('article', { class: 'card word-detail' },
      h('div', { class: 'detail-meta' },
        h('span', { class: `badge ${st}` }, STATUS_LABEL[st]),
        cat ? h('a', { href: `#/topic/${encodeURIComponent(cat.id)}`, class: 'detail-topic' }, `${cat.emoji} ${cat.name}`) : null,
        favButton(ctx, w)),
      h('div', { class: 'word-hero' },
        h('h1', { class: 'hero-tr', lang: lang.code }, w.tr),
        readingLine(ctx, w, 'reading', { full: true }),
        h('p', { class: 'hero-en' }, w.en, ' ', regBadge(w))),
      audioControls(ctx, w),
      // To paste it into a message, a search, a note.
      h('div', { class: 'word-send' },
        h('button', {
          type: 'button', class: 'link-btn copy-btn',
          onclick: async () => ctx.toast((await copyText(w.tr)) ? `Copied “${w.tr}”` : 'Couldn’t copy — select the word and copy it by hand.'),
        }, 'Copy'),
        // The word with its meaning, through the phone's share sheet.
        canShareText() ? h('button', {
          type: 'button', class: 'link-btn share-btn',
          onclick: async () => {
            const reading = lang.fullReading?.(w);
            const result = await shareText(`${w.tr}${reading ? ` (${reading})` : ''} — ${w.en}`, { title: `${lang.name}: ${w.tr}`, dialogTitle: 'Share this word' });
            if (result === 'failed') ctx.toast('Couldn’t open the share sheet — use Copy instead.');
          },
        }, 'Share') : null),
      pronunciationPanel(ctx, w),
      // Where stress follows rules (Arabic): the rule behind this word's stress.
      stressNote ? h('p', { class: 'hint stress-note' }, h('b', null, 'Why the stress is there: '), stressNote) : null,
      voiceFix(ctx, w),
      registerBlock(ctx, w),
      exampleBlock(ctx, w, { links: true }),
      w.note ? h('p', { class: 'note' }, rich(w.note, lang.code)) : null,
      w.own ? null : myNote(ctx, w),
      w.own ? h('p', { class: 'hint' }, 'One of your own words. ', h('a', { href: `#/mywords/${encodeURIComponent(w.id)}` }, 'Change or delete it')) : null,
      st === 'new'
        ? h('button', {
          type: 'button', class: 'btn small',
          onclick: () => { store.setCard(lang.code, w.id, markKnown()); ctx.toast('Marked as already learned'); ctx.rerender(); },
        }, icon('check', 16), 'Already learned')
        : null,
      st === 'known'
        ? h('p', { class: 'hint' }, 'You marked this as already learned. ',
          h('button', {
            type: 'button', class: 'link-btn',
            onclick: () => { store.deleteCard(lang.code, w.id); ctx.toast('Moved back to new words'); ctx.rerender(); },
          }, 'Undo — I want to learn it'))
        : null,
      card ? h('p', { class: 'hint' }, card.due <= Date.now()
        ? 'Due for review now.'
        : `Next review: ${new Date(card.due).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}.`) : null,
    ),
    h('section', { class: 'card' },
      h('h2', { class: 'card-title' }, 'Practise saying it'),
      speakPractice(ctx, w)),
    // Entries that are one letter away: worth telling apart on purpose.
    alike.length ? h('section', { class: 'card lookalikes' },
      h('h2', { class: 'card-title' }, '👀 Easy to mix up'),
      h('ul', { class: 'word-chips' }, alike.map((x) => h('li', null,
        h('a', { href: `#/word/${encodeURIComponent(x.id)}` }, h('b', { lang: lang.code }, x.tr), ' ', h('span', null, x.en)))))) : null,
    seen,
  );
}

// What to try when a voice reads a word wrong, by language.
const VOICE_FIX_TIPS = {
  ja: 'Kana usually works: きょう for 今日.',
  ar: 'Adding or leaving out vowel marks often changes how a voice reads a word.',
  uk: 'An accent mark after the stressed vowel (молоко́) helps some voices; a hyphen between syllables helps others.',
  tr: 'A hyphen between syllables, or a doubled vowel where it should be long, often helps.',
};

/**
 * "Voice says it wrong?" — the learner's own spelling of this entry for the
 * voice. Phone voices differ, and each gets its own words wrong; the word on
 * screen, its reading and the answers that count stay the course's. Kept on
 * this device (store.setSay) and applied wherever the entry is spoken.
 */
function voiceFix(ctx, w) {
  const { lang, store } = ctx;
  const box = h('div', { class: 'voice-fix' });
  const course = () => lang.speech(w, { course: true });
  // `text` as this entry would be spoken: its locale and voice, no slow version.
  const spoken = (text) => {
    const base = course();
    return { ...base, text, slow: null, ...(base.alt ? { alt: { ...base.alt, text, slow: null } } : {}) };
  };
  const apply = (text) => {
    const kept = store.setSay(lang.code, w.id, text);
    lang.setOwnSay(store.getSay(lang.code));
    return kept;
  };
  const show = () => {
    const mine = lang.ownSay(w);
    set(box, mine
      ? [h('p', { class: 'voice-fix-text' }, h('span', { 'aria-hidden': 'true' }, '🔧 '), 'The voice reads your spelling: ', h('b', { lang: lang.code }, mine)),
        h('button', { type: 'button', class: 'link-btn', onclick: edit }, 'Change it')]
      : h('button', { type: 'button', class: 'link-btn', onclick: edit }, 'Voice says it wrong?'));
  };
  function edit() {
    const mine = lang.ownSay(w);
    const input = h('input', {
      type: 'text', class: 'my-note-input', id: 'voice-fix-input', lang: lang.code, dir: lang.dir || 'auto', maxlength: String(store.SAY_MAX),
      autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': `How the voice should read ${w.tr}`,
    });
    input.value = mine || course().text;
    const back = (focus = true) => { show(); if (focus) box.querySelector('button')?.focus(); };
    const save = () => {
      const typed = input.value.replace(/\s+/g, ' ').trim();
      // The course's own text is no spelling of the learner's: nothing to keep.
      apply(typed === course().text ? '' : typed);
      back();
      ctx.toast(lang.ownSay(w) ? 'The voice will read your spelling.' : 'The voice reads the course’s spelling.');
    };
    set(box,
      h('label', { class: 'field', for: 'voice-fix-input' }, h('span', null, 'Spell it for the voice')),
      input,
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn small', onclick: () => { if (input.value.trim()) ctx.say(spoken(input.value.trim())); } }, icon('volume', 16), 'Listen'),
        h('button', { type: 'button', class: 'btn small primary', onclick: save }, 'Use this'),
        mine ? h('button', { type: 'button', class: 'btn small', onclick: () => { apply(''); back(); ctx.toast('The voice reads the course’s spelling.'); } }, 'Back to the course’s') : null,
        h('button', { type: 'button', class: 'btn small', onclick: () => back() }, 'Cancel')),
      h('p', { class: 'hint' }, 'Only the voice gets this: the word on screen and the answers that count stay the same. ',
        VOICE_FIX_TIPS[lang.code] || '', ' Kept on this device, for its voice.'));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); save(); } });
    input.focus();
  }
  show();
  return box;
}

/**
 * The learner's own note on an entry — a memory hook, a sentence of their
 * own: shown here and after each answer about the word, kept with the
 * progress (backups, sync). Edited in place.
 */
function myNote(ctx, w) {
  const { lang, store } = ctx;
  const box = h('div', { class: 'my-note' });
  const show = () => {
    const text = store.getNote(lang.code, w.id);
    set(box, text
      ? [h('p', { class: 'my-note-text' }, h('span', { 'aria-hidden': 'true' }, '📝 '), h('span', { class: 'sr-only' }, 'My note: '), text),
        h('button', { type: 'button', class: 'link-btn', onclick: edit }, 'Change my note')]
      : h('button', { type: 'button', class: 'btn small', onclick: edit }, '📝 Add a note of my own'));
  };
  function edit() {
    const area = h('textarea', {
      class: 'my-note-input', rows: '3', maxlength: String(store.NOTE_MAX), 'aria-label': `My note on ${w.tr}`,
      placeholder: 'A memory hook, where you heard it, a sentence of your own…',
    });
    area.value = store.getNote(lang.code, w.id);
    const save = () => {
      store.setNote(lang.code, w.id, area.value);
      ctx.game?.refresh?.(lang.code); // a note may complete an achievement
      show();
      box.querySelector('button')?.focus();
    };
    set(box, area,
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn small primary', onclick: save }, 'Save'),
        h('button', { type: 'button', class: 'btn small', onclick: () => { show(); box.querySelector('button')?.focus(); } }, 'Cancel')),
      h('p', { class: 'hint' }, 'Only you see it: it is shown after each answer about this word. Empty it to remove the note.'));
    area.focus();
  }
  show();
  return box;
}
