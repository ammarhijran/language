// A topic's page: progress, what to do with it (learn the next words,
// practise, build its sentences, say them, mark known ones) and every entry
// with its reading, register, other-register form, audio and ★.
import { h, icon, meter, set } from '../ui.js';
import { GROUPS, backLink, phraseRow, showMode, devicePref, setDevicePref, pairToggleLabel, glyph } from '../components.js';
import { status } from '../srs.js';
import { sentencesFor, MIN_SENTENCES } from '../sentences.js';
import { recognitionSupported } from '../speech.js';

export default function topic(ctx, catId) {
  const { lang, store } = ctx;
  const cat = lang.categories.find((c) => c.id === catId);
  if (!cat) {
    return h('div', { class: 'view' }, h('div', { class: 'summary' },
      h('h2', null, 'Topic not found'), h('a', { class: 'btn primary', href: '#/learn' }, 'All topics')));
  }
  const group = GROUPS.find((g) => g.id === (cat.group || 'words')) || GROUPS[0];
  const words = lang.wordsIn(cat.id);
  const cards = store.getCards(lang.code);
  const learned = words.filter((w) => cards[w.id]).length;
  const unseen = words.length - learned;
  const size = Math.min(ctx.settings.lessonSize, unseen);
  const done = unseen === 0;
  const canBuild = sentencesFor(lang, cat.id, { cards }).length >= MIN_SENTENCES;
  const hasPairs = words.some((w) => w.pair);
  // Talk like a local is all about the two ways of saying things: shown by default there.
  const pref = devicePref('pairs', null);
  let pairs = hasPairs && (pref == null ? group.id === 'talk' : !!pref);

  const list = h('ul', { class: 'phrase-list' });
  const paint = () => set(list, words.map((w) => phraseRow(ctx, w, {
    pairs, status: status(cards[w.id]), onShow: (word) => showMode(ctx, words, words.indexOf(word)),
  })));
  paint();
  const pairBtn = hasPairs ? h('button', {
    type: 'button', class: `pill toggle${pairs ? ' selected' : ''}`, 'aria-pressed': String(pairs),
    title: lang.code === 'ar' ? 'Show the Egyptian / Standard Arabic form of each entry' : 'Show the polite / everyday form of each entry',
    onclick: () => {
      pairs = !pairs;
      setDevicePref('pairs', pairs);
      pairBtn.classList.toggle('selected', pairs);
      pairBtn.setAttribute('aria-pressed', String(pairs));
      paint();
    },
  }, glyph('swap', 16), pairToggleLabel(lang)) : null;

  const primary = done
    ? h('a', { class: 'btn primary wide', href: `#/practice/mixed/${encodeURIComponent(cat.id)}` }, icon('repeat', 18), 'Practise this topic')
    : h('a', { class: 'btn primary wide', href: `#/learn/${encodeURIComponent(cat.id)}` },
      learned ? `Continue · next ${size}` : `Learn the first ${size}`, icon('arrow', 18));
  const scored = recognitionSupported();

  return h('div', { class: 'view topic' },
    backLink(ctx, `#/learn/g/${group.id}`, 'Learn'),
    h('header', { class: 'topic-head' },
      h('span', { class: 'topic-emoji', 'aria-hidden': 'true' }, cat.emoji),
      h('div', { class: 'topic-title' },
        h('p', { class: 'kicker' }, group.title),
        h('h1', null, cat.name),
        h('p', { class: 'topic-native', lang: lang.code }, cat.native))),
    h('div', { class: 'topic-progress' },
      h('p', null, done
        ? [icon('check', 16), ` All ${words.length} learned`]
        : [h('b', null, String(learned)), ` of ${words.length} learned`]),
      meter(learned, words.length, done ? 'done' : '')),
    group.id === 'talk' ? h('p', { class: 'hint' }, group.hint) : null,
    h('div', { class: 'topic-actions' },
      primary,
      h('div', { class: 'button-row' },
        done ? null : h('a', { class: 'btn small', href: `#/practice/mixed/${encodeURIComponent(cat.id)}` }, icon('repeat', 16), 'Practise'),
        canBuild ? h('a', { class: 'btn small', href: `#/practice/build/${encodeURIComponent(cat.id)}` }, icon('tiles', 16), 'Sentences') : null,
        h('a', { class: 'btn small', href: `#/speak/drill/${encodeURIComponent(cat.id)}` }, icon(scored ? 'mic' : 'volume', 16), scored ? 'Say them' : 'Listen & repeat'),
        h('a', { class: 'btn small', href: `#/practice/handsfree/${encodeURIComponent(cat.id)}` }, icon('volume', 16), 'Hands-free'),
        h('a', { class: 'btn small', href: `#/known/${encodeURIComponent(cat.id)}` }, icon('check', 16), 'Mark known'))),
    h('div', { class: 'list-head' },
      h('h2', { class: 'section-title' }, `${words.length} ${group.id === 'words' ? 'words' : 'entries'}`),
      h('div', { class: 'button-row' },
        pairBtn,
        h('button', { type: 'button', class: 'pill', onclick: () => showMode(ctx, words, 0), title: 'Show them one by one in big letters' }, glyph('expand', 16), 'Show'))),
    list,
  );
}
