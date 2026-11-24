import { studyMode, typeInMode } from '../stats.js';
import { h, icon, shuffle, set } from '../ui.js';
import { GROUPS, topicTile, devicePref, setDevicePref } from '../components.js';
import { runSession } from '../session.js';
import { newCard, review, markKnown, GOOD, HARD, AGAIN } from '../srs.js';
import { recognitionSupported } from '../speech.js';
import { lessonDrillHref } from './pronounce.js';
import { readLink, loadTexts, cachedTexts, sortTexts, KINDS } from '../reader.js';
import { nextTopics, topicCounts, stagesOf } from '../stats.js';
import { tripKit } from '../kit.js';
import { scriptRuns } from './grammar.js';

/** The sections of Learn (#/learn/g/<id>); the last one opened is remembered on this device. */
export const SECTIONS = [
  { id: 'words', title: 'Words' },
  { id: 'phrases', title: 'Phrases' },
  { id: 'talk', title: 'Talk like a local' },
  { id: 'grammar', title: 'Grammar' },
  { id: 'read', title: 'Read & Listen' },
];

function stagedTopics(cats, grid) {
  const stages = stagesOf(cats);
  if (stages.length < 2) return grid(cats);
  return stages.map((g) => [
    h('h2', { class: 'stage-title' }, g.title, h('small', null, `${g.cats.length} topics`)),
    grid(g.cats),
  ]);
}

export default function learn(ctx, catId, section) {
  const { lang, store } = ctx;
  if (catId === 'g' || !catId) return picker(ctx, section);
  // "kit": the trip essentials as a short course of their own (a virtual topic
  // made of entries from many topics; see kit.js).
  const kit = catId === 'kit' ? tripKit(lang) : null;
  const cat = kit?.length ? { id: 'kit', name: 'Trip essentials', emoji: '🎒', virtual: true } : lang.categories.find((c) => c.id === catId);
  if (!cat) return picker(ctx);
  const topicHref = cat.virtual ? '#/phrases/kit' : `#/topic/${encodeURIComponent(cat.id)}`;

  const all = kit?.length ? kit : lang.wordsIn(cat.id);
  const unseen = all.filter((w) => !store.getCard(lang.code, w.id));
  if (!unseen.length) {
    if (cat.virtual) ctx.game.count?.({ lang: lang.code, key: 'kitDone', once: true });
    return finished(ctx, cat, topicHref);
  }

  // "Continue" on Home picks up this topic next time.
  if (!cat.virtual) store.setLastCat(lang.code, cat.id);
  const batch = unseen.slice(0, ctx.settings.lessonSize);
  const items = [
    ...batch.map((word, index) => ({ word, type: 'intro', meta: { index, total: batch.length } })),
    // (in listening-only or speaking-only mode, the quick check is all in that one way)
    ...shuffle(batch).map((word, i) => ({ word, type: typeInMode(i % 2 ? 'produce' : 'listen', studyMode(ctx.settings)) })),
  ];

  const known = [];
  const introduced = new Set(); // saved by this lesson when their card was shown
  const missed = new Set(); // needed a second try in this lesson's quick check

  return h('div', { class: 'view' }, runSession(ctx, {
    label: `Lesson: ${cat.name}`,
    exitHref: topicHref,
    // Leaving early keeps the words already shown, but not the quick check.
    confirmExit: () => (introduced.size
      ? `Leave this lesson? The ${introduced.size === 1 ? 'word' : `${introduced.size} words`} you’ve seen ${introduced.size === 1 ? 'is' : 'are'} kept and will come back in Review.`
      : null),
    items,
    onResult(item, r) {
      if (r.known) {
        store.setCard(lang.code, item.word.id, markKnown());
        known.push(item.word);
        introduced.delete(item.word.id);
        return { drop: true };
      }
      if (r.intro) {
        // Saved as soon as it has been introduced, due now: leaving the lesson
        // early (a tab, Android back, a phone call) keeps it for Review
        // instead of throwing the lesson away.
        if (!store.getCard(lang.code, item.word.id)) {
          store.setCard(lang.code, item.word.id, newCard(Date.now()));
          store.logActivity(lang.code, { learned: 1 });
          introduced.add(item.word.id);
        }
        return null;
      }
      if (r.rating !== AGAIN) return null;
      missed.add(item.word.id); // needed a second try in the quick check
      const retries = (item.retries || 0) + 1;
      return retries <= 2 ? { word: item.word, type: item.type === 'listen' ? 'meaning' : 'produce', retries } : null;
    },
    onFinish() {
      const now = Date.now();
      for (const w of batch) {
        const card = store.getCard(lang.code, w.id);
        if (!card) {
          store.setCard(lang.code, w.id, review(newCard(now), GOOD, now));
          store.logActivity(lang.code, { learned: 1 });
          introduced.add(w.id);
        } else if (introduced.has(w.id) && card.reps === 0 && !card.known) {
          // The quick check is done: the word moves on from "due now" to tomorrow.
          // One that was missed in the check starts as HARD, so it grows more slowly.
          store.setCard(lang.code, w.id, review(card, missed.has(w.id) ? HARD : GOOD, now, { id: w.id }));
        }
      }
      const added = introduced.size;
      if (added) ctx.game.learned({ lang: lang.code, count: added });
      const remaining = all.filter((w) => !store.getCard(lang.code, w.id)).length;
      if (cat.virtual && !remaining) ctx.game.count?.({ lang: lang.code, key: 'kitDone', once: true });
      const upNext = remaining ? null : nextTopics(ctx, { count: 1 }).next[0];
      const learnedNow = batch.filter((w) => !known.includes(w));
      const chips = (list) => h('ul', { class: 'word-chips' }, list.map((w) =>
        h('li', null, h('a', { href: `#/word/${encodeURIComponent(w.id)}` }, h('b', { lang: lang.code }, w.tr), ' ', h('span', null, w.en)))));
      return h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, learnedNow.length ? '🎉' : '💪'),
        h('h2', null, 'Lesson complete!'),
        learnedNow.length
          ? h('p', { class: 'muted' }, `You learned ${learnedNow.length} new word${learnedNow.length === 1 ? '' : 's'}. They’ll come back for review tomorrow.`)
          : null,
        learnedNow.length ? chips(learnedNow) : null,
        known.length
          ? h('p', { class: 'muted' }, `Marked ${known.length} as already learned — they’ll only come back for a quick check in about a month.`)
          : null,
        known.length ? chips(known) : null,
        h('div', { class: 'actions stack' },
          remaining
            ? h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, `Next ${Math.min(remaining, ctx.settings.lessonSize)} words`, icon('arrow', 18))
            : upNext
              ? h('a', { class: 'btn primary wide', href: `#/learn/${encodeURIComponent(upNext.id)}` }, `Next topic: ${upNext.emoji} ${upNext.name}`, icon('arrow', 18))
              : h('a', { class: 'btn primary wide', href: '#/learn' }, 'Choose another topic'),
          sayThemLink(batch),
          h('a', { class: 'btn wide', href: topicHref }, `All of ${cat.emoji} ${cat.name}`),
          h('a', { class: 'btn ghost wide', href: '#/' }, 'Back home'),
        ),
      );
    },
  }));
}

/**
 * After a lesson: drill saying exactly the words it taught. Without speech
 * recognition the drill still works for listening and recording yourself,
 * so the link says that instead of promising a score.
 */
function sayThemLink(words) {
  const scored = recognitionSupported();
  return h('a', { class: 'btn wide', href: lessonDrillHref(words) },
    icon(scored ? 'mic' : 'volume', 18), scored ? 'Practise saying them' : 'Listen and repeat them');
}

function picker(ctx, wanted) {
  const { lang } = ctx;
  const has = (id) => SECTIONS.some((s) => s.id === id) && sectionAvailable(ctx, id);
  const section = has(wanted) ? wanted : has(devicePref('learnSection')) ? devicePref('learnSection') : 'words';
  setDevicePref('learnSection', section);
  if (wanted !== section) ctx.setPath?.(`/learn/g/${section}`); // the address names the section shown
  const counts = topicCounts(ctx);
  const { resume } = nextTopics(ctx, { count: 0 });

  const seg = h('nav', { class: 'seg', 'aria-label': 'Learn sections' }, SECTIONS.filter((s) => sectionAvailable(ctx, s.id)).map((s) => {
    const n = sectionCount(ctx, s.id);
    return h('a', {
      href: `#/learn/g/${s.id}`, class: s.id === section ? 'active' : null, 'aria-current': s.id === section ? 'page' : null,
      onclick: (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        if (s.id !== section) ctx.replace(`/learn/g/${s.id}`);
      },
    }, s.title, n ? h('small', { class: 'seg-n' }, String(n)) : null);
  }));

  // The chosen section in view in the sideways-scrolling row.
  setTimeout(() => seg.querySelector('a.active')?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' }), 0);
  let body;
  if (section === 'grammar') body = grammarSection(ctx);
  else if (section === 'read') body = readSection(ctx);
  else {
    const g = GROUPS.find((x) => x.id === section);
    const cats = lang.categories.filter((c) => !c.own && (c.group || 'words') === section);
    const own = section === 'words' ? lang.categories.find((c) => c.own) : null;
    body = h('section', { class: 'learn-section' },
      h('p', { class: 'hint' }, g.hint, section === 'words' ? '' : ' · ', section === 'words' ? null : h('a', { href: section === 'talk' ? `#/phrases/${encodeURIComponent(cats[0]?.id || '')}` : '#/phrases' }, 'Open the phrasebook')),
      stagedTopics(cats, (list) => h('div', { class: 'topic-grid' }, list.map((c) => topicTile(ctx, c, counts.get(c.id), { current: resume?.id === c.id })))),
      // The learner's own words: their topic once there are some, and where to add more.
      section === 'words' ? [
        own ? h('h2', { class: 'stage-title' }, 'Your own') : null,
        own ? h('div', { class: 'topic-grid' }, topicTile(ctx, own, counts.get(own.id), { current: resume?.id === own.id })) : null,
        h('a', { class: 'quick-link own-link', href: '#/mywords' },
          h('span', { class: 'quick-emoji', 'aria-hidden': 'true' }, '📝'),
          h('span', null, h('b', null, own ? 'Add or change your words' : 'Add your own words'), h('small', null, 'Words and phrases you met elsewhere — learn and review them like the course’s')),
          icon('arrow', 18)),
      ] : null,
      section === 'words'
        ? h('a', { class: 'quick-link known-link', href: '#/known' },
          icon('check', 22),
          h('span', null, h('b', null, 'Already know some words?'), h('small', null, 'Mark them as already learned and lessons will skip them')))
        : null);
  }

  return h('div', { class: 'view learn' },
    h('h1', null, 'Learn'),
    h('p', { class: 'muted' }, `Open a topic to see its words and learn them ${ctx.settings.lessonSize} at a time.`),
    seg,
    body,
  );
}

function sectionAvailable(ctx, id) {
  if (id === 'grammar') return !!ctx.lang.grammar?.length;
  if (id === 'read') return true;
  return ctx.lang.categories.some((c) => (c.group || 'words') === id);
}

function sectionCount(ctx, id) {
  if (id === 'grammar') return ctx.lang.grammar?.length || 0;
  if (id === 'read') return cachedTexts(ctx.lang.code)?.length || 0;
  return ctx.lang.categories.filter((c) => !c.own && (c.group || 'words') === id).length;
}

/** Learn → Grammar: the lessons in order, ticked once their quiz is done. */
function grammarSection(ctx) {
  const { lang } = ctx;
  const lessons = lang.grammar || [];
  const done = lessons.filter((l) => ctx.game.grammarBest(lang.code, l.id) != null).length;
  return h('section', { class: 'learn-section' },
    h('p', { class: 'hint' }, `${lessons.length} short lessons from A1 to B1, each with examples to play and a 4-question quiz${done ? ` · ${done} done` : ''}.`),
    h('ul', { class: 'link-list' }, lessons.map((l, i) => {
      const best = ctx.game.grammarBest(lang.code, l.id);
      return h('li', null, h('a', { href: `#/grammar/${encodeURIComponent(l.id)}`, class: best != null ? 'done' : null },
        h('span', { class: 'll-num', 'aria-hidden': 'true' }, best != null ? '✓' : String(i + 1)),
        // Arabic / Japanese words inside the English text get their own font
        h('span', { class: 'll-text' }, h('b', null, scriptRuns(l.title, lang.code)), h('small', null, scriptRuns(l.summary, lang.code))),
        h('span', { class: `badge level-${l.level}` }, l.level)));
    })));
}

/** Learn → Read & Listen: the texts by level (loaded on demand), and the full Read & Listen page. */
function readSection(ctx) {
  const { lang } = ctx;
  const list = h('ul', { class: 'link-list' }, h('li', { class: 'muted ll-loading' }, 'Loading texts…'));
  const fill = (texts) => {
    ctx.game.registerTexts?.(lang.code, texts.map((t) => t.id));
    if (!texts.length) { set(list, h('li', { class: 'muted ll-loading' }, 'Texts are coming soon for this language.')); return; }
    set(list, sortTexts(texts).map((t) => {
      const best = ctx.game.textBest(lang.code, t.id);
      return h('li', null, h('a', { href: `#/read/${encodeURIComponent(t.id)}`, class: best != null ? 'done' : null },
        h('span', { class: 'll-icon', 'aria-hidden': 'true' }, best != null ? '✓' : KINDS[t.kind]?.emoji || '📄'),
        h('span', { class: 'll-text' }, h('b', null, t.title),
          h('small', null, t.titleNative ? h('span', { lang: lang.code }, t.titleNative) : null, t.titleNative ? ' · ' : null, KINDS[t.kind]?.one || '')),
        h('span', { class: `badge level-${t.level}` }, t.level)));
    }));
  };
  const cached = cachedTexts(lang.code);
  if (cached) fill(cached);
  else {
    let gone = false;
    ctx.onCleanup(() => { gone = true; });
    loadTexts(lang.code).then((t) => { if (!gone) fill(t); }, () => { if (!gone) set(list, h('li', { class: 'muted ll-loading' }, 'The texts couldn’t be loaded. Check your connection and try again.')); });
  }
  return h('section', { class: 'learn-section' },
    readLink(ctx),
    list);
}

function finished(ctx, cat, topicHref) {
  return h('div', { class: 'view' },
    h('div', { class: 'summary' },
      h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, cat.emoji),
      h('h2', null, `You’ve learned every word in ${cat.name}`),
      h('p', { class: 'muted' }, 'They’ll keep coming back in reviews. You can also practise them any time.'),
      h('div', { class: 'actions stack' },
        h('a', { class: 'btn primary wide', href: `#/practice/mixed/${cat.id}` }, 'Practise this topic'),
        h('a', { class: 'btn wide', href: topicHref }, 'See all its words'),
        cat.virtual ? null : h('a', { class: 'btn wide', href: `#/known/${cat.id}` }, 'Edit “already learned” words'),
        h('a', { class: 'btn ghost wide', href: '#/learn' }, 'Choose another topic')),
    ),
  );
}
