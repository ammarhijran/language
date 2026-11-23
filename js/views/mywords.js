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
  if (lang.code === 'uk') {
    // Not typed: picked by tapping a syllable (see stressPicker). Stored as the
    // stressed syllable of each word, counted from 1: "2", or "1 0 3" for a phrase.
    return {
      label: 'Stress', picked: true,
      hint: 'Tap the stressed syllable of each word if you know it. It is shown on the word’s page and asked in Word stress practice.',
      check: (v) => (/^\d+(?: \d+)*$/.test(v) ? null : 'Tap the stressed syllable.'),
    };
  }
  return null;
}

/**
 * Stress written with accent marks, as dictionaries print it (мете́лик):
 * { tr, stress } — the text without the marks and, for each word, its
 * stressed syllable counted from 1 (0 = not marked). stress is null when
 * there are no marks.
 */
export function stressFromAccents(lang, text) {
  const tr = String(text).normalize('NFC').replace(/\u0301/g, '');
  if (tr === String(text).normalize('NFC')) return { tr, stress: null };
  const marked = new Set(); // positions in `tr` of the letters that carried a mark
  let at = 0;
  for (const ch of String(text).normalize('NFC')) {
    if (ch === '\u0301') marked.add(at - 1); else at += ch.length;
  }
  let from = 0;
  const stress = lang.analyze({ tr, own: true }).words.map((w) => {
    let pos = tr.indexOf(w.text, from);
    if (pos < 0) return 0;
    from = pos + w.text.length;
    for (let k = 0; k < w.syllables.length; k++) {
      const end = pos + w.syllables[k].text.length;
      for (let j = pos; j < end; j++) if (marked.has(j)) return k + 1;
      pos = end;
    }
    return 0;
  });
  return { tr, stress };
}

/**
 * Why an entry can't be saved, or null: both fields are needed, the reading
 * has to be in the right script, and the word must not be in the list — or in
 * the course — already. `id` is the entry being edited, if any.
 * Returns { field, message, word? } — `word` is the course entry it repeats.
 * @param {Map} [known] normalised form → entry, to check many entries without scanning the pack each time
 */
export function ownWordProblem(lang, { id = null, tr = '', en = '', read = '' }, known = null) {
  const word = tr.replace(/\s+/g, ' ').trim();
  if (!word) return { field: 'tr', message: `Type the word or phrase in ${lang.name}.` };
  if (!en.trim()) return { field: 'en', message: 'Type what it means.' };
  const reading = readingField(lang);
  const problem = read.trim() && reading ? reading.check(read.trim()) : null;
  if (problem) return { field: 'read', message: problem };
  const key = lang.normalize(word);
  // `known` (a pasted list checks many entries): the pack's words by their normalised form.
  const same = key && (known ? [known.get(key)].find((w) => w && w.id !== id) : lang.words.find((w) => w.id !== id && lang.normalize(w.tr) === key));
  if (same?.own) return { field: 'tr', message: `“${same.tr}” is already in your words.` };
  if (same) return { field: 'tr', message: `“${same.tr}” (${same.en}) is already in the course.`, word: same };
  return null;
}

/** How many lines of a pasted list are read at once. */
export const LIST_LINES_MAX = 300;
const SEPARATORS = [/\t+/, /\s*=\s*/, /\s+[-–—]\s+/, /\s*;\s*/, /\s*:\s+/];
const BRACKETED = /^(.*?)\s*[(（\[［]\s*([^()（）[\]［］]+?)\s*[)）\]］]\s*$/u;

/**
 * A pasted list, one entry per line: "word – meaning", "word = meaning",
 * "word; meaning", or columns copied from a spreadsheet (word, meaning,
 * reading, note, separated by tabs). In languages with a reading field the
 * reading can follow the word in brackets: "蝶 (ちょう) = butterfly".
 * Returns { entries: [{ tr, en, read, note, line }], unread: [{ line, text }] } —
 * `unread` are the lines without a separator or a meaning; `line` counts from 1.
 */
export function parseWordList(text, lang) {
  const entries = [];
  const unread = [];
  const lines = String(text || '').split(/\r?\n/);
  for (let i = 0; i < lines.length && entries.length + unread.length < LIST_LINES_MAX; i++) {
    const raw = lines[i].trim();
    if (!raw) continue;
    let tr = ''; let en = ''; let read = ''; let note = '';
    if (raw.includes('\t')) {
      [tr = '', en = '', read = '', note = ''] = raw.split(/\t/).map((c) => c.trim());
    } else {
      const sep = SEPARATORS.slice(1).map((re) => re.exec(raw)).filter((m) => m && m.index > 0).sort((a, b) => a.index - b.index)[0];
      if (sep) { tr = raw.slice(0, sep.index).trim(); en = raw.slice(sep.index + sep[0].length).trim(); }
    }
    const field = readingField(lang)?.picked ? null : readingField(lang);
    const bracket = field && !read ? BRACKETED.exec(tr) : null;
    if (bracket && bracket[1] && !field.check(bracket[2])) { tr = bracket[1]; read = bracket[2]; }
    if (field && read && field.check(read)) read = ''; // not a reading in the right script: leave it out
    if (!field) { note ||= read; read = ''; } // no reading field: a third column is a note
    if (tr && en) entries.push({ tr, en, read, note, line: i + 1 });
    else unread.push({ line: i + 1, text: raw.slice(0, 40) });
  }
  return { entries, unread };
}

/**
 * #/mywords — the list and the form; #/mywords/<id> — changing an entry;
 * #/mywords/new/<word> — the form with a word filled in (from a text).
 */
export default function myWords(ctx, editId, prefill = '') {
  const { lang, store } = ctx;
  const reading = readingField(lang);
  const limits = store.OWN_WORD_LIMITS;
  let editing = null; // the stored entry being changed

  const input = (id, attrs = {}) => h('input', { type: 'text', class: 'select', id: `mw-${id}`, maxlength: String(limits[id]), autocomplete: 'off', ...attrs });
  const fields = {
    tr: input('tr', { lang: lang.code, dir: lang.dir === 'rtl' ? 'rtl' : null, autocapitalize: 'off', spellcheck: 'false', placeholder: lang.sampleWords?.[0]?.[0] || '' }),
    en: input('en', { placeholder: lang.sampleWords?.[0]?.[1] || 'What it means' }),
    read: reading ? (reading.picked ? h('input', { type: 'hidden', id: 'mw-read' }) : input('read', { ...reading.attrs, autocapitalize: 'off', spellcheck: 'false' })) : null,
    note: input('note', { placeholder: 'Where you met it, how it is used…' }),
  };
  const message = h('p', { class: 'form-message', role: 'status', 'aria-live': 'polite' });
  const submit = h('button', { type: 'submit', class: 'btn primary' });
  const cancel = h('button', { type: 'button', class: 'btn', onclick: () => edit(null) }, 'Cancel');
  const formTitle = h('h2', { class: 'card-title' });
  const list = h('ul', { class: 'phrase-list own-words' });
  const summary = h('div', { class: 'own-summary' });

  const say = (text, extra = null) => set(message, text, extra);

  // Stress (Ukrainian): the word in syllables; tap one to mark it, again to unmark.
  // The choice lives in the hidden "read" field as "2" or "1 0 3".
  const picker = reading?.picked ? h('div', { class: 'stress-pick', role: 'group', 'aria-label': 'Stressed syllable' }) : null;
  function drawPicker() {
    if (!picker) return;
    // Accent marks pasted with the word (мете́лик) become the choice, and leave the word.
    const typed = stressFromAccents(lang, fields.tr.value);
    if (typed.stress) { fields.tr.value = typed.tr; fields.read.value = typed.stress.join(' '); }
    const text = fields.tr.value.replace(/\s+/g, ' ').trim();
    let words = [];
    try { words = text ? lang.analyze({ tr: text, own: true }).words : []; } catch { words = []; }
    const chosen = fields.read.value.split(' ').map(Number);
    const stress = words.map((w, i) => (chosen[i] > 0 && chosen[i] <= w.syllables.length && w.syllables.length > 1 ? chosen[i] : 0));
    fields.read.value = stress.some(Boolean) ? stress.join(' ') : '';
    set(picker, words.some((w) => w.syllables.length > 1)
      ? words.map((w, wi) => h('span', { class: 'stress-word' }, w.syllables.map((syl, si) => h('button', {
        type: 'button', class: `syl${stress[wi] === si + 1 ? ' stressed' : ''}`, lang: lang.code, disabled: w.syllables.length < 2,
        'aria-pressed': String(stress[wi] === si + 1),
        onclick: () => {
          stress[wi] = stress[wi] === si + 1 ? 0 : si + 1;
          fields.read.value = stress.some(Boolean) ? stress.join(' ') : '';
          drawPicker();
          picker.querySelectorAll('.stress-word')[wi]?.children[si]?.focus();
        },
      }, syl.text))))
      : h('span', { class: 'muted' }, text ? 'One syllable: nothing to mark.' : 'Type the word first.'));
  }
  fields.tr.addEventListener('input', drawPicker);

  function edit(rec) {
    editing = rec;
    for (const [k, el] of Object.entries(fields)) if (el) el.value = rec?.[k] || '';
    drawPicker();
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

  // Several at once: a pasted list, one "word – meaning" per line.
  const listBody = h('textarea', {
    class: 'own-body', id: 'mw-list', rows: '6', spellcheck: 'false', autocapitalize: 'off', dir: 'auto',
    placeholder: `${lang.sampleWords?.[0]?.[0] || 'word'} – ${lang.sampleWords?.[0]?.[1] || 'meaning'}\n${lang.sampleWords?.[1]?.[0] || 'word'} – ${lang.sampleWords?.[1]?.[1] || 'meaning'}`,
  });
  const listMessage = h('p', { class: 'form-message', role: 'status', 'aria-live': 'polite' });
  function addList() {
    const { entries, unread } = parseWordList(listBody.value, lang);
    if (!entries.length && !unread.length) { set(listMessage, 'Paste or type a list first: one word and its meaning per line.'); listBody.focus(); return; }
    let added = 0;
    const skipped = unread.map((u) => `line ${u.line} (no meaning found)`);
    const done = new Set(); // lines that were added
    const known = new Map();
    for (const w of lang.words) { const k = lang.normalize(w.tr); if (k && !known.has(k)) known.set(k, w); }
    for (const e of entries) {
      if (reading?.picked) { // accent marks in a pasted word (мете́лик) are its stress
        const t = stressFromAccents(lang, e.tr);
        e.tr = t.tr;
        e.read = t.stress?.some(Boolean) ? t.stress.join(' ') : '';
      }
      const problem = ownWordProblem(lang, e, known);
      const id = problem ? null : store.saveOwnWord(lang.code, e);
      if (id) { // remembered, so the same word further down the list is caught
        added++;
        done.add(e.line);
        known.set(lang.normalize(e.tr.replace(/\s+/g, ' ').trim()), { id, tr: e.tr, en: e.en, own: true });
        continue;
      }
      skipped.push(`“${e.tr}” (${problem ? (/already/.test(problem.message) ? (problem.word ? 'already in the course' : 'already in your words') : problem.message) : `the list is full: ${store.OWN_WORDS_MAX} words`})`);
    }
    // What was added leaves the box; what was not stays there to be corrected.
    listBody.value = listBody.value.split(/\r?\n/).filter((l, i) => l.trim() && !done.has(i + 1)).join('\n');
    if (added) ctx.refreshOwnWords?.();
    paint();
    set(listMessage, `Added ${added} ${added === 1 ? 'entry' : 'entries'}.`,
      skipped.length ? ` Not added: ${skipped.slice(0, 6).join(', ')}${skipped.length > 6 ? ` and ${skipped.length - 6} more` : ''}.` : null);
  }
  const listPanel = h('div', { class: 'own-list-panel', hidden: true },
    h('label', { class: 'field', for: 'mw-list' }, h('span', null, 'One entry per line'), listBody),
    h('p', { class: 'hint' }, 'Write the word, then a dash, “=” or “;”, then its meaning — or paste two columns from a spreadsheet.',
      reading ? ` The ${reading.label.toLowerCase().replace('reading in ', '')} can follow the word in brackets: ${lang.code === 'ja' ? '蝶 (ちょう) = butterfly' : 'كتاب (kitāb) = book'}.` : ''),
    listMessage,
    h('button', { type: 'button', class: 'btn primary', onclick: addList }, icon('check', 16), 'Add them all'));
  const listToggle = h('button', {
    type: 'button', class: 'btn small', 'aria-expanded': 'false', 'aria-controls': 'mw-list-panel',
    onclick: () => {
      listPanel.hidden = !listPanel.hidden;
      listToggle.setAttribute('aria-expanded', String(!listPanel.hidden));
      if (!listPanel.hidden) listBody.focus();
    },
  }, 'Add several at once');
  listPanel.id = 'mw-list-panel';
  const listCard = h('section', { class: 'card form own-list' }, listToggle, listPanel);

  const field = (id, label, el, hint = null) => (el ? [
    h('label', { class: 'field', for: `mw-${id}` }, h('span', null, label), el),
    hint ? h('p', { class: 'hint' }, hint) : null,
  ] : null);
  const form = h('form', { class: 'card form', onsubmit: save, novalidate: true },
    formTitle,
    field('tr', `In ${lang.name}`, fields.tr),
    field('en', 'Meaning', fields.en),
    reading?.picked
      ? [fields.read, h('div', { class: 'field' }, h('span', null, `${reading.label} (optional)`), picker), h('p', { class: 'hint' }, reading.hint)]
      : field('read', reading ? `${reading.label} (optional)` : '', fields.read, reading?.hint),
    field('note', 'Note (optional)', fields.note),
    message,
    h('div', { class: 'button-row' }, submit, cancel));

  edit(editId && editId !== 'new' ? store.getOwnWords(lang.code).find((o) => o.id === editId) || null : null);
  if (editId === 'new' && prefill) {
    fields.tr.value = String(prefill).slice(0, limits.tr);
    drawPicker();
    setTimeout(() => fields.en.focus(), 0); // the meaning is what is left to type
  }
  paint();

  return h('div', { class: 'view my-words' },
    backLink(ctx, '#/learn/g/words', 'Learn'),
    h('h1', null, `${OWN_CATEGORY.emoji} ${OWN_CATEGORY.name}`),
    h('p', { class: 'muted' }, `Words and phrases you met somewhere else — a sign, a song, a friend. Add them here and learn, review and practise them like the course’s. The ${lang.name} voice reads them; the app does not check or translate them.`),
    form,
    listCard,
    summary,
    list,
    h('p', { class: 'hint' }, 'Your words are saved on this device. They are part of the backup file you can export and of sync codes (Settings → Your data), so they can follow you to another device.'));
}
