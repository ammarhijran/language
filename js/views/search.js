// Search everything: words and phrases (in the script, a reading or
// romanisation, or English, including each entry's other-register form),
// topics, grammar lessons and Read & Listen texts. Opened from the search
// button in the top bar; recent searches are kept on this device.
import { h, icon, set, growList, debounce } from '../ui.js';
import { phraseRow, topicTile, devicePref, setDevicePref, backLink } from '../components.js';
import { topicCounts } from '../stats.js';
import { status } from '../srs.js';
import { searchTips } from './help.js';
import { loadTexts, cachedTexts } from '../reader.js';

// ---------- Ranking (no DOM: tested in tests/nav.test.js) ----------

const formsCache = new WeakMap(); // lang → Map(word id → { main, mainStarts, pair, pairStarts, en, pairEn })

const LEADING = /^(?:to|the|a|an)\s+/;
/** The English glosses of a meaning: "to eat; a meal (food)" → ['eat', 'meal']. */
export function glossesOf(en) {
  return String(en || '').toLowerCase().replace(/\([^)]*\)/g, ' ').split(/[;,/]|\s[-–—]\s/)
    .map((g) => g.trim().replace(/[.!?…"“”]+/g, '').replace(LEADING, '').trim())
    .filter(Boolean);
}

/**
 * Egyptian romanisation folded onto the three MSA vowels: e → i, o → u,
 * ē → ī, ō → ū (and the article el-/il- → al-), so "hesab" meets ḥisāb and
 * "maalesh" meets maʿlish. Only for Latin text in Arabic (null otherwise).
 */
export function foldEgyptian(lang, s) {
  if (lang.code !== 'ar' || !s || /\p{Script=Arabic}/u.test(s) || !/[a-zāīūēō]/i.test(s)) return null;
  const out = s.toLowerCase().replace(/(^|[\s-])(?:el|il)(?=[-\s])/g, '$1al')
    .replace(/ē/g, 'ī').replace(/ō/g, 'ū').replace(/e/g, 'i').replace(/o/g, 'u');
  return out === s ? null : out;
}

/** The comparison keys of a string: as written (normalized), without diacritics, and folded (Arabic). */
function keysFor(lang, f) {
  const keys = [lang.normalize(f), lang.stripDiacritics(f)];
  const folded = foldEgyptian(lang, f);
  if (folded) keys.push(lang.normalize(folded), lang.stripDiacritics(folded));
  return keys.filter(Boolean);
}

// Where a word starts inside a form. Arabic and Japanese keys lose their
// spaces when normalized, so the words are split before (kana and rōmaji
// readings, transliterations) and the Arabic article al-/ال counts as a start.
const WORD_BREAK = /[\s\-‐.,!?؟،؛:;"“”()«»「」『』、。・…]+/u;
const AR_ARTICLE = /^(?:ال|al)(?=..)/;

function keysOf(lang, entry, withAnswers) {
  const forms = [entry.tr];
  if (withAnswers) {
    // A pack's own form lists may expect fields an other-register pair lacks.
    try { forms.push(...lang.acceptedAnswers(entry)); } catch { /* the headword is enough */ }
  }
  const reading = lang.fullReading(entry);
  if (reading) forms.push(...String(reading).split(' · '));
  const keys = new Set();
  const starts = new Set();
  for (const f of forms) {
    if (typeof f !== 'string' || !f) continue;
    for (const k of keysFor(lang, f)) keys.add(k);
    f.split(WORD_BREAK).filter(Boolean).forEach((word, i) => {
      for (const k of keysFor(lang, word)) {
        if (i > 0) starts.add(k);
        if (lang.code === 'ar' && AR_ARTICLE.test(k)) starts.add(k.replace(AR_ARTICLE, ''));
      }
    });
  }
  return { keys: [...keys], starts: [...starts] };
}

function formsOf(lang, w) {
  let map = formsCache.get(lang);
  if (!map) formsCache.set(lang, (map = new Map()));
  let f = map.get(w.id);
  if (!f) {
    const pair = w.pair ? { ...w.pair, en: w.pair.en || w.en, cat: w.cat } : null;
    const main = keysOf(lang, w, true);
    const other = pair ? keysOf(lang, pair, true) : { keys: [], starts: [] };
    f = {
      main: main.keys,
      mainStarts: main.starts,
      pair: other.keys,
      pairStarts: other.starts,
      en: String(w.en || '').toLowerCase(),
      pairEn: pair && pair.en !== w.en ? String(pair.en).toLowerCase() : '',
    };
    map.set(w.id, f);
  }
  return f;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Whether `q` starts a word inside `k` (after a space or punctuation), not only somewhere in a word. */
const startsAWord = (k, q) => {
  for (let i = k.indexOf(q, 1); i > 0; i = k.indexOf(q, i + 1)) if (!/[\p{L}\p{N}\p{M}]/u.test(k[i - 1])) return true;
  return false;
};

/**
 * 0 the whole form, 2 its start, 3 the start of a word in it, 4 anywhere in it;
 * null when no form matches. `qs` is the query as typed (normalized), then
 * without diacritics, then folded: a match only once the marks the learner
 * typed are dropped counts a little less (Arabic ماء "water" before مَا "what").
 * `starts`: the keys of the words that start inside the forms (see keysOf).
 */
function formScore(keys, starts, qs) {
  let best = null;
  const consider = (s, i) => { if (s != null && (best == null || s + i * 0.1 < best)) best = s + i * 0.1; };
  for (const k of keys) {
    qs.forEach((q, i) => consider(k === q ? 0 : k.startsWith(q) ? 2 : !k.includes(q) ? null : startsAWord(k, q) ? 3 : 4, i));
    if (best === 0) return 0;
  }
  if (best == null || best >= 3) {
    for (const k of starts) qs.forEach((q, i) => consider(k.startsWith(q) ? 3 : null, i));
  }
  return best;
}

/** 1 a whole gloss, 3 the start of a word, 5 anywhere; null when the meaning doesn't contain the query. */
function englishScore(en, q) {
  if (!en || !q || !en.includes(q)) return null;
  const bare = q.replace(LEADING, '');
  if (glossesOf(en).some((g) => g === q || g === bare)) return 1;
  if (new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRe(q)}`, 'u').test(en)) return 3;
  return 5;
}

/**
 * How well entry `w` matches the query, lower is better, or null: the whole
 * written form (0), a whole English meaning (1), the start of a form (2), the
 * start of a word in a form or in the meaning (3), inside a form (4), inside
 * the meaning (5).
 * A match on the entry's other-register form counts half a step less.
 */
export function scoreEntry(lang, w, query) {
  const q = String(query || '').trim();
  if (!q) return null;
  const qs = [...new Set(keysFor(lang, q))];
  const lq = q.toLowerCase();
  const f = formsOf(lang, w);
  const scores = [
    qs.length ? formScore(f.main, f.mainStarts, qs) : null,
    englishScore(f.en, lq),
    qs.length && f.pair.length ? formScore(f.pair, f.pairStarts, qs) : null,
    englishScore(f.pairEn, lq),
  ];
  const pairOff = [0, 0, 0.5, 0.5];
  let best = null;
  scores.forEach((s, i) => { if (s != null && (best == null || s + pairOff[i] < best)) best = s + pairOff[i]; });
  return best;
}

/**
 * Entries matching the query, best first: [{ word, score }]. Ties go to the
 * shorter entry (a word before the phrases that contain it), then pack order.
 * `among`: only these entries (default: all of the pack's).
 */
export function rankEntries(lang, query, { among = lang.words, limit = Infinity } = {}) {
  const out = [];
  for (const word of among) {
    const score = scoreEntry(lang, word, query);
    if (score != null) out.push({ word, score });
  }
  out.sort((a, b) => a.score - b.score || [...a.word.tr].length - [...b.word.tr].length || a.word.index - b.word.index);
  return limit < out.length ? out.slice(0, limit) : out;
}

const textMatch = (hay, q) => String(hay || '').toLowerCase().includes(q);

/** Grammar lessons whose title (first) or summary mentions the query. */
export function searchGrammar(lang, query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];
  return (lang.grammar || [])
    .map((l) => ({ l, s: textMatch(l.title, q) ? 0 : textMatch(l.summary, q) ? 1 : null }))
    .filter((x) => x.s != null).sort((a, b) => a.s - b.s).map((x) => x.l);
}

/** Read & Listen texts whose title (English or in the language) contains the query. */
export function searchTexts(lang, texts, query) {
  const q = String(query || '').trim();
  if (!q) return [];
  const nq = lang.normalize(q);
  return (texts || []).filter((t) => textMatch(t.title, q.toLowerCase())
    || (nq && t.titleNative && (lang.normalize(t.titleNative).includes(nq) || lang.stripDiacritics(t.titleNative).includes(lang.stripDiacritics(q)))));
}

/**
 * Lines of the Read & Listen texts that contain the query, in the language or
 * in their translation: [{ text, index, line }], at most `limit`, and at most
 * two per text so one long text does not fill the list. Needs three letters
 * (two in scripts without spaces between words), or it would match everywhere.
 */
export function searchLines(lang, texts, query, limit = 8) {
  const q = String(query || '').trim();
  const nq = lang.normalize(q).replace(/\s+/g, ' ');
  const spaced = lang.normalize('a b') === 'a b';
  if ([...nq.replace(/\s/g, '')].length < (spaced ? 3 : 2)) return [];
  const en = q.toLowerCase();
  const out = [];
  for (const text of texts || []) {
    let here = 0;
    for (const [index, line] of text.lines.entries()) {
      if (here >= 2 || out.length >= limit) break;
      const inLang = lang.normalize(line.tr).replace(/\s+/g, ' ').includes(nq);
      if (inLang || (en.length >= 3 && String(line.en || '').toLowerCase().includes(en))) {
        out.push({ text, index, line });
        here++;
      }
    }
    if (out.length >= limit) break;
  }
  return out;
}

/** Topics whose name (English or in the language) contains the query. */
/**
 * Entries whose note — the learner's own (`notes`: id → text) — contains the
 * query (two letters or more, any case), in course order, without the
 * entries in `skip`: [{ word, note }].
 */
export function searchNotes(lang, notes, query, skip = new Set(), limit = 20) {
  const q = String(query || '').trim().toLowerCase();
  if ([...q].length < 2) return [];
  const out = [];
  for (const w of lang.words) {
    const note = Object.hasOwn(notes, w.id) ? notes[w.id] : '';
    if (!note || skip.has(w.id) || !note.toLowerCase().includes(q)) continue;
    out.push({ word: w, note });
    if (out.length >= limit) break;
  }
  return out;
}

export function searchTopics(lang, query) {
  const q = String(query || '').trim();
  if (!q) return [];
  const nq = lang.normalize(q);
  return lang.categories.filter((c) => textMatch(c.name, q.toLowerCase()) || (nq && c.native && lang.normalize(c.native).includes(nq)));
}

// ---------- Recent searches (this device) ----------

const RECENT_MAX = 6;
export function recentSearches(code) {
  const all = devicePref('recent', {});
  const list = all && typeof all === 'object' ? all[code] : null;
  return Array.isArray(list) ? list.filter((q) => typeof q === 'string' && q).slice(0, RECENT_MAX) : [];
}
function rememberSearch(code, query) {
  const q = query.trim();
  if (q.length < 2) return;
  const all = devicePref('recent', {});
  const next = { ...(all && typeof all === 'object' && !Array.isArray(all) ? all : {}) };
  next[code] = [q, ...recentSearches(code).filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, RECENT_MAX);
  setDevicePref('recent', next);
}
function forgetSearches(code) {
  const all = devicePref('recent', {});
  if (all && typeof all === 'object' && !Array.isArray(all)) { delete all[code]; setDevicePref('recent', all); }
}

// ---------- The screen ----------

export default function search(ctx, initial = '') {
  const { lang, store } = ctx;
  let query = String(initial || '');
  let stopList = () => {};
  let found = 0;
  const results = h('div', { class: 'search-results' });
  // Screen readers hear how many results there are, not every row read out again on each key.
  const statusLine = h('p', { class: 'search-status', role: 'status' });
  const tell = (q) => set(statusLine, !q ? '' : found ? `${found} result${found === 1 ? '' : 's'} for “${q}”` : `Nothing found for “${q}”`);
  const input = h('input', {
    type: 'search', class: 'search search-big', value: query, enterkeyhint: 'search',
    placeholder: `Search ${lang.name} or English…`, 'aria-label': `Search ${lang.name} words, phrases, grammar and texts`,
    autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
    oninput: (e) => { query = e.target.value; later(); },
    onkeydown: (e) => { if (e.key === 'Enter') { later.cancel(); update(); rememberSearch(lang.code, query); input.blur(); } },
  });
  const later = debounce(update, 160);
  ctx.onCleanup(() => {
    later.cancel();
    stopList();
    if (found) rememberSearch(lang.code, query);
  });

  function emptyState() {
    const recent = recentSearches(lang.code);
    return [
      recent.length
        ? h('section', { class: 'search-recent' },
          h('div', { class: 'title-row' },
            h('h2', { class: 'section-title' }, 'Recent'),
            h('button', { type: 'button', class: 'link-btn', onclick: () => { forgetSearches(lang.code); update(); } }, 'Clear')),
          h('div', { class: 'chip-row' }, recent.map((q) => h('button', {
            type: 'button', class: 'chip', onclick: () => { input.value = q; query = q; update(); },
          }, icon('search', 14), h('b', { lang: /[a-z]/i.test(q) ? null : lang.code }, q)))))
        : null,
      h('p', { class: 'hint' }, `Type a word in ${lang.name} — in its own script, ${lang.code === 'ja' ? 'kana or rōmaji' : lang.code === 'ar' ? 'with or without vowel marks, or in transliteration' : lang.code === 'uk' ? 'or in Latin letters' : 'with or without its special letters'} — or in English.`),
      h('div', { class: 'button-row' },
        h('a', { class: 'btn small', href: '#/phrases' }, 'Browse the phrasebook'),
        h('a', { class: 'btn small', href: '#/learn' }, 'All topics')),
    ];
  }

  function update() {
    stopList();
    stopList = () => {};
    const q = query.trim();
    ctx.setPath(q ? `/search/${encodeURIComponent(q)}` : '/search');
    if (!q) { found = 0; tell(''); set(results, emptyState()); return; }
    const entries = rankEntries(lang, q);
    const topics = searchTopics(lang, q);
    const lessons = searchGrammar(lang, q);
    const appTips = searchTips(lang, q, { scope: Object.keys(store.getCards(lang.code)).length >= 40 ? '' : '/all' });
    const noted = searchNotes(lang, store.getNotes(lang.code), q, new Set(entries.map((e) => e.word.id)));
    const textBox = h('section', { class: 'search-group', hidden: true });
    found = entries.length + topics.length + lessons.length + noted.length + appTips.length;
    tell(q);
    const cards = store.getCards(lang.code);
    const counts = topics.length ? topicCounts(ctx) : null;
    const list = h('ul', { class: 'phrase-list' });
    set(results,
      topics.length
        ? h('section', { class: 'search-group' },
          h('h2', { class: 'section-title' }, `Topics (${topics.length})`),
          h('div', { class: 'topic-grid' }, topics.map((c) => topicTile(ctx, c, counts.get(c.id)))))
        : null,
      h('section', { class: 'search-group' },
        h('h2', { class: 'section-title' }, entries.length ? `Words & phrases (${entries.length})` : 'Words & phrases'),
        entries.length ? list : h('p', { class: 'muted' }, `Nothing found for “${q}”. `,
          // A word met elsewhere: it can be added and learned like the course's own. Typed in the
          // language's script, it is filled in; typed in Latin letters it may be English, so it is not.
          h('a', { id: 'search-add', href: lang.code !== 'tr' && /[^\u0000-\u024F]/.test(q) ? `#/mywords/new/${encodeURIComponent(q)}` : '#/mywords' }, 'Add it to My words'))),
      // Words found by what the learner wrote about them.
      noted.length
        ? h('section', { class: 'search-group' },
          h('h2', { class: 'section-title' }, `In your notes (${noted.length})`),
          h('ul', { class: 'link-list' }, noted.map(({ word, note }) => h('li', null, h('a', { href: `#/word/${encodeURIComponent(word.id)}` },
            h('span', { class: 'll-icon', 'aria-hidden': 'true' }, '📝'),
            h('span', { class: 'll-text' },
              h('b', null, h('span', { lang: lang.code }, word.tr), ` — ${word.en}`),
              h('small', null, note)))))))
        : null,
      lessons.length
        ? h('section', { class: 'search-group' },
          h('h2', { class: 'section-title' }, `Grammar (${lessons.length})`),
          h('ul', { class: 'link-list' }, lessons.map((l) => h('li', null, h('a', { href: `#/grammar/${encodeURIComponent(l.id)}` },
            h('span', { class: 'll-icon', 'aria-hidden': 'true' }, '📖'),
            h('span', { class: 'll-text' }, h('b', null, l.title), h('small', null, l.summary)),
            h('span', { class: `badge level-${l.level}` }, l.level))))))
        : null,
      textBox,
      // What the app itself can do (Me → Tips).
      appTips.length
        ? h('section', { class: 'search-group help' },
          h('h2', { class: 'section-title' }, `In the app (${appTips.length})`),
          h('ul', { class: 'link-list' }, appTips.map((it) => h('li', null, h('a', { href: it.href },
            h('span', { class: 'll-icon', 'aria-hidden': 'true' }, it.emoji),
            h('span', { class: 'll-text' }, h('b', null, it.name), h('small', null, it.text)))))))
        : null);
    if (entries.length) {
      stopList = growList(list, entries, ({ word }) => phraseRow(ctx, word, { status: status(cards[word.id]) }), { first: 40, step: 80, label: 'Show more' });
    }
    // Read & Listen texts load on demand.
    const fillTexts = (texts) => {
      if (query.trim() !== q || !textBox.isConnected) return;
      const hits = searchTexts(lang, texts, q);
      const lines = searchLines(lang, texts, q);
      found += hits.length + lines.length;
      if (hits.length || lines.length) tell(q);
      textBox.hidden = !hits.length && !lines.length;
      set(textBox,
        hits.length ? [
          h('h2', { class: 'section-title' }, `Read & Listen (${hits.length})`),
          h('ul', { class: 'link-list' }, hits.map((t) => h('li', null, h('a', { href: `#/read/${encodeURIComponent(t.id)}` },
            h('span', { class: 'll-icon', 'aria-hidden': 'true' }, '🎧'),
            h('span', { class: 'll-text' }, h('b', null, t.title), t.titleNative ? h('small', { lang: lang.code }, t.titleNative) : null),
            h('span', { class: `badge level-${t.level}` }, t.level))))),
        ] : null,
        // Sentences inside the texts (a proverb, a line of a dialogue).
        lines.length ? [
          h('h2', { class: 'section-title' }, `In the texts (${lines.length}${lines.length >= 8 ? '+' : ''})`),
          h('ul', { class: 'link-list' }, lines.map(({ text, line }) => h('li', null, h('a', { href: `#/read/${encodeURIComponent(text.id)}` },
            h('span', { class: 'll-icon', 'aria-hidden': 'true' }, '💬'),
            h('span', { class: 'll-text' },
              h('b', { lang: lang.code, dir: lang.dir === 'rtl' ? 'rtl' : null }, line.tr),
              h('small', null, `${line.en} · ${text.title}`)))))),
        ] : null);
    };
    const cached = cachedTexts(lang.code);
    if (cached) fillTexts(cached);
    else loadTexts(lang.code).then(fillTexts, () => {});
  }

  update();
  // Ready to type (after the app has put focus on the screen's heading).
  setTimeout(() => { if (input.isConnected && !query) input.focus({ preventScroll: true }); }, 0);

  return h('div', { class: 'view search-view' },
    backLink(ctx, '#/', 'Home'),
    h('h1', null, 'Search'),
    h('div', { class: 'search-bar' }, icon('search'), input),
    statusLine,
    results);
}
