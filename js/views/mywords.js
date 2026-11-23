// My words: the learner's own words and phrases. Added here, they become one
// more topic of the language pack (pack.setOwnWords), so lessons, reviews,
// practice, search and the word page work for them like for the course's own.
import { h, icon, set } from '../ui.js';
import { backLink, playButton, readingText } from '../components.js';
import { status } from '../srs.js';
import { OWN_CATEGORY } from '../languages/common.js';

const STATUS_NAMES = { learning: 'Learning', familiar: 'Familiar', mastered: 'Mastered', known: 'Known' };
const KANA = /^[\p{Script=Hiragana}\p{Script=Katakana}ー\s、。！？!?・〜~]+$/u;

/** The optional "reading" field of a language: what it is called, and what may go in it. null when it has none. */
export function readingField(lang) {
  if (lang.code === 'ja') {
    return {
      label: 'Reading in kana',
      hint: 'Needed for words with kanji: it gives the rōmaji, the syllables and lets you answer in kana. Put spaces between the words of a phrase.',
      attrs: { lang: 'ja' },
      check: (v) => (KANA.test(v) ? null : 'Write the reading in kana (hiragana or katakana), for example たべもの.'),
    };
  }
  if (lang.code === 'ar') {
    return {
      label: 'Transliteration',
      hint: 'In Latin letters, for example kitāb. It gives the syllables and the stress, and lets you answer in Latin letters.',
      attrs: { lang: 'ar-Latn', dir: 'ltr' },
      check: (v) => (/\p{Script=Latin}/u.test(v) && !/\p{Script=Arabic}/u.test(v) ? null : 'Write the transliteration in Latin letters, for example kitāb.'),
    };
  }
  return null;
}

/**
 * Why an entry can't be saved, or null: both fields are needed, the reading
 * has to be in the right script, and the word must not be in the list — or in
 * the course — already. `id` is the entry being edited, if any.
 * Returns { field, message, word? } — `word` is the course entry it repeats.
 */
export function ownWordProblem(lang, { id = null, tr = '', en = '', read = '' }) {
  const word = tr.replace(/\s+/g, ' ').trim();
  if (!word) return { field: 'tr', message: `Type the word or phrase in ${lang.name}.` };
  if (!en.trim()) return { field: 'en', message: 'Type what it means.' };
  const reading = readingField(lang);
  const problem = read.trim() && reading ? reading.check(read.trim()) : null;
  if (problem) return { field: 'read', message: problem };
  const key = lang.normalize(word);
  const same = key && lang.words.find((w) => w.id !== id && lang.normalize(w.tr) === key);
  if (same?.own) return { field: 'tr', message: `“${same.tr}” is already in your words.` };
  if (same) return { field: 'tr', message: `“${same.tr}” (${same.en}) is already in the course.`, word: same };
  return null;
}

export default function myWords(ctx, editId) {
  const { lang, store } = ctx;
  const reading = readingField(lang);
  const limits = store.OWN_WORD_LIMITS;
  let editing = null; // the stored entry being changed

  const input = (id, attrs = {}) => h('input', { type: 'text', class: 'select', id: `mw-${id}`, maxlength: String(limits[id]), autocomplete: 'off', ...attrs });
  const fields = {
    tr: input('tr', { lang: lang.code, dir: lang.dir === 'rtl' ? 'rtl' : null, autocapitalize: 'off', spellcheck: 'false', placeholder: lang.sampleWords?.[0]?.[0] || '' }),
    en: input('en', { placeholder: lang.sampleWords?.[0]?.[1] || 'What it means' }),
    read: reading ? input('read', { ...reading.attrs, autocapitalize: 'off', spellcheck: 'false' }) : null,
    note: input('note', { placeholder: 'Where you met it, how it is used…' }),
  };
  const message = h('p', { class: 'form-message', role: 'status', 'aria-live': 'polite' });
  const submit = h('button', { type: 'submit', class: 'btn primary' });
  const cancel = h('button', { type: 'button', class: 'btn', onclick: () => edit(null) }, 'Cancel');
  const formTitle = h('h2', { class: 'card-title' });
  const list = h('ul', { class: 'phrase-list own-words' });
  const summary = h('div', { class: 'own-summary' });

  const say = (text, extra = null) => set(message, text, extra);

  function edit(rec) {
    editing = rec;
    for (const [k, el] of Object.entries(fields)) if (el) el.value = rec?.[k] || '';
    formTitle.textContent = rec ? 'Change a word' : 'Add a word or phrase';
    set(submit, icon('check', 16), rec ? 'Save' : 'Add');
    cancel.hidden = !rec;
    say('');
    if (rec) fields.tr.focus();
  }

  function save(e) {
    e.preventDefault();
    const entry = Object.fromEntries(Object.entries(fields).map(([k, el]) => [k, el ? el.value : '']));
    const problem = ownWordProblem(lang, { id: editing?.id, ...entry });
    if (problem) {
      say(problem.message, problem.word ? [' ', h('a', { href: `#/word/${encodeURIComponent(problem.word.id)}` }, 'Open it')] : null);
      fields[problem.field]?.focus();
      return;
    }
    const id = store.saveOwnWord(lang.code, { id: editing?.id, ...entry });
    if (!id) {
      say(`You can keep ${store.OWN_WORDS_MAX} words of your own per language. Delete some first.`);
      return;
    }
    const changed = !!editing;
    ctx.refreshOwnWords?.();
    edit(null);
    paint();
    say(changed ? 'Saved.' : `Added “${lang.byId(id)?.tr || entry.tr.trim()}”.`);
    fields.tr.focus();
  }

  function remove(w) {
    if (!confirm(`Delete “${w.tr}”? What you have learned about it is forgotten too.`)) return;
    store.deleteOwnWord(lang.code, w.id);
    ctx.refreshOwnWords?.();
    if (editing?.id === w.id) edit(null);
    paint();
    say(`Deleted “${w.tr}”.`);
  }

  function paint() {
    const words = lang.wordsIn(OWN_CATEGORY.id);
    const cards = store.getCards(lang.code);
    const stored = new Map(store.getOwnWords(lang.code).map((o) => [o.id, o]));
    const unseen = words.filter((w) => !cards[w.id]).length;
    const size = Math.min(ctx.settings.lessonSize, unseen);
    set(summary,
      h('p', { class: 'muted' }, words.length
        ? `${words.length} of ${store.OWN_WORDS_MAX} · ${words.length - unseen} learned`
        : 'Nothing here yet. Add the first word above.'),
      words.length ? h('div', { class: 'button-row' },
        unseen ? h('a', { class: 'btn primary', href: `#/learn/${OWN_CATEGORY.id}` }, `Learn ${size === unseen ? (unseen === 1 ? 'it' : `all ${unseen}`) : `the next ${size}`}`, icon('arrow', 16)) : null,
        words.length >= 4 ? h('a', { class: 'btn', href: `#/practice/mixed/${OWN_CATEGORY.id}` }, icon('repeat', 16), 'Practise') : null,
        h('a', { class: 'btn', href: `#/topic/${OWN_CATEGORY.id}` }, 'Open as a topic')) : null,
      words.length && words.length < 4 ? h('p', { class: 'hint' }, 'With four or more words you can practise them on their own; until then they are mixed in with the course’s.') : null);
    // Newest first: the word just added is at the top.
    set(list, [...words].reverse().map((w) => {
      const st = status(cards[w.id]);
      return h('li', { class: 'phrase-row' },
        playButton(ctx, w),
        h('a', { class: 'pr-main', href: `#/word/${encodeURIComponent(w.id)}` },
          h('b', { class: 'pr-tr', lang: lang.code }, w.tr),
          readingText(lang.fullReading(w), 'pr-reading', 'span'),
          h('span', { class: 'pr-en' }, w.en, st && st !== 'new' ? [' ', h('span', { class: `badge ${st}` }, STATUS_NAMES[st] || st)] : null)),
        h('span', { class: 'pr-tools' },
          h('button', { type: 'button', class: 'btn small', 'aria-label': `Change ${w.tr}`, onclick: () => { edit(stored.get(w.id) || w); form.scrollIntoView?.({ block: 'start' }); } }, 'Edit'),
          h('button', { type: 'button', class: 'icon-btn', 'aria-label': `Delete ${w.tr}`, title: 'Delete', onclick: () => remove(w) }, icon('x', 18))));
    }));
  }

  const field = (id, label, el, hint = null) => (el ? [
    h('label', { class: 'field', for: `mw-${id}` }, h('span', null, label), el),
    hint ? h('p', { class: 'hint' }, hint) : null,
  ] : null);
  const form = h('form', { class: 'card form', onsubmit: save, novalidate: true },
    formTitle,
    field('tr', `In ${lang.name}`, fields.tr),
    field('en', 'Meaning', fields.en),
    field('read', reading ? `${reading.label} (optional)` : '', fields.read, reading?.hint),
    field('note', 'Note (optional)', fields.note),
    message,
    h('div', { class: 'button-row' }, submit, cancel));

  edit(editId ? store.getOwnWords(lang.code).find((o) => o.id === editId) || null : null);
  paint();

  return h('div', { class: 'view my-words' },
    backLink(ctx, '#/learn/g/words', 'Learn'),
    h('h1', null, `${OWN_CATEGORY.emoji} ${OWN_CATEGORY.name}`),
    h('p', { class: 'muted' }, `Words and phrases you met somewhere else — a sign, a song, a friend. Add them here and learn, review and practise them like the course’s. The ${lang.name} voice reads them; the app does not check or translate them.`),
    form,
    summary,
    list,
    h('p', { class: 'hint' }, 'Your words stay on this device and in a backup file you export (Settings → Your data). They are not part of sync codes.'));
}
