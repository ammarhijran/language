// Speak → Alphabet → "Vowel harmony" (Turkish): which form of an ending a
// word takes. The ending copies the word's last vowel — two forms for the
// plural (-lar / -ler), four for the question word (mı / mi / mu / mü), and
// -da / -de / -ta / -te for "in, at", where the consonant matters too. The
// words are everyday course nouns that follow the rule; a few borrowed words
// that do not (saat → saatler) are deliberately not among them.
import { h, icon, set, shuffle, bindKeys } from '../ui.js';
import { backLink, playButton } from '../components.js';

const COUNT = 10;
export const HARMONY_WORDS = ('ev kitap göz okul kız gün çocuk kedi araba köpek yol süt balık deniz kuş göl baş el ağaç üzüm masa kapı pencere oda köy dağ çiçek '
  + 'elma ekmek yumurta tavuk yıl hafta arkadaş kardeş kalem defter top oyun gömlek çanta anahtar köprü sokak ada orman yıldız güneş bulut yağmur').split(' ');

const VOWELS = 'aıoueiöü';
/** The last vowel of a word, or ''. */
export const lastVowel = (word) => [...String(word).toLowerCase()].filter((ch) => VOWELS.includes(ch)).pop() || '';
/** The plural ending after a word: -lar after a back vowel (a ı o u), -ler after a front one (e i ö ü). */
export const pluralOf = (word) => `${word}${'aıou'.includes(lastVowel(word)) ? 'lar' : 'ler'}`;
/** The question word after a word: mı (a ı), mi (e i), mu (o u), mü (ö ü). */
export const questionOf = (word) => ({ a: 'mı', ı: 'mı', e: 'mi', i: 'mi', o: 'mu', u: 'mu', ö: 'mü', ü: 'mü' }[lastVowel(word)] || '');

/**
 * "In / at / on" after a word: -da or -de by the last vowel (back / front) —
 * and with t instead of d after a voiceless consonant (p ç t k f h s ş):
 * evde, okulda, kitapta, sütte.
 */
export const locativeOf = (word) => `${word}${'pçtkfhsş'.includes([...String(word).toLowerCase()].pop()) ? 't' : 'd'}${'aıou'.includes(lastVowel(word)) ? 'a' : 'e'}`;

const KIND = { a: 'back, unrounded', ı: 'back, unrounded', o: 'back, rounded', u: 'back, rounded', e: 'front, unrounded', i: 'front, unrounded', ö: 'front, rounded', ü: 'front, rounded' };

/** A round: [{ word, kind: 'plural' | 'question' | 'place', answer, options }], on course words only. */
export function harmonyQuestions(lang, count = COUNT, mix = shuffle) {
  const words = HARMONY_WORDS.map((tr) => lang.words.find((w) => w.tr === tr)).filter(Boolean);
  return mix(words).slice(0, count).map((word, i) => [
    { word, kind: 'plural', answer: pluralOf(word.tr), options: ['lar', 'ler'].map((s) => `${word.tr}${s}`) },
    { word, kind: 'question', answer: `${word.tr} ${questionOf(word.tr)}?`, options: ['mı', 'mi', 'mu', 'mü'].map((q) => `${word.tr} ${q}?`) },
    { word, kind: 'place', answer: locativeOf(word.tr), options: ['da', 'de', 'ta', 'te'].map((s) => `${word.tr}${s}`) },
  ][i % 3]);
}

export default function harmony(ctx) {
  const { lang } = ctx;
  const view = h('div', { class: 'view letter-quiz harmony' });
  const qs = lang.code === 'tr' ? harmonyQuestions(lang) : [];
  if (!qs.length) {
    set(view, backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'summary' }, h('h1', null, 'Not for this language'), h('a', { class: 'btn primary', href: '#/speak/alphabet' }, 'See the letters')));
    return view;
  }
  const missed = [];
  let i = 0;
  let right = 0;
  let answered = false;
  let pick = () => {};
  let goOn = () => {};

  function show() {
    answered = false;
    const q = qs[i];
    const v = lastVowel(q.word.tr);
    const feedback = h('div', { class: 'feedback', 'aria-live': 'polite' });
    const buttons = q.options.map((o, k) => h('button', { type: 'button', class: 'option', lang: lang.code, onclick: () => pick(k) },
      h('span', { class: 'kbd', 'aria-hidden': 'true' }, String(k + 1)),
      h('span', { class: 'option-label' }, o)));
    pick = (k) => {
      if (answered || !q.options[k]) return;
      answered = true;
      const ok = q.options[k] === q.answer;
      if (ok) right++; else missed.push(q);
      ctx.store.logActivity(lang.code, { practiced: 1 });
      ctx.store.logSkill?.(lang.code, 'sounds', ok);
      if (ok) ctx.game?.count?.({ lang: lang.code, key: 'soundQuiz' }); // counts for Sound Sense, like Tricky letters
      buttons.forEach((b, n) => {
        b.disabled = true;
        if (q.options[n] === q.answer) b.classList.add('correct');
        else if (n === k) b.classList.add('wrong');
        else b.classList.add('dim');
      });
      const next = h('button', { type: 'button', class: 'btn primary wide', onclick: () => goOn() }, i + 1 < qs.length ? 'Next word' : 'See my score');
      set(feedback,
        h('div', { class: `reveal ${ok ? 'good' : 'bad'}` },
          h('p', { class: 'verdict' }, icon(ok ? 'check' : 'x', 18), ok ? 'Right!' : 'Not quite:'),
          h('div', { class: 'letter-quiz-ex' }, playButton(ctx, { text: q.answer, lang: lang.speechLang }),
            h('span', { class: 'letter-answer' }, h('b', { lang: lang.code }, q.answer))),
          h('p', { class: 'small' }, `The last vowel of ${q.word.tr} is ${v} (${KIND[v]}), so the ending has ${q.kind === 'question' ? `${questionOf(q.word.tr).slice(1)}: ${questionOf(q.word.tr)}` : 'aıou'.includes(v) ? 'a' : 'e'}${q.kind === 'plural' ? `: -${q.answer.slice(q.word.tr.length)}` : ''}.`,
            q.kind === 'place' ? ` ${q.word.tr} ends in ${[...q.word.tr].pop()}, ${q.answer.slice(q.word.tr.length)[0] === 't' ? 'a voiceless consonant, so the d becomes t' : 'so the d stays'}: -${q.answer.slice(q.word.tr.length)}.` : '')),
        next);
      if (ctx.settings.autoplay) ctx.say({ text: q.answer, lang: lang.speechLang }, { auto: true });
      next.focus({ preventScroll: true });
    };
    goOn = () => {
      if (!answered) return;
      i++;
      ctx.speech.cancelSpeech();
      if (i < qs.length) show(); else summary();
    };
    set(view,
      backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'exercise' },
        h('p', { class: 'kicker' }, `Vowel harmony · ${i + 1} of ${qs.length}`),
        h('p', { class: 'letter-quiz-prompt', lang: lang.code }, q.word.tr),
        h('p', { class: 'muted letter-quiz-ask' }, q.kind === 'plural' ? `${q.word.en} — more than one?` : q.kind === 'place' ? `${q.word.en} — “in / at / on it”?` : `${q.word.en} — “Is it a …?”`),
        h('div', { class: 'options two' }, buttons),
        feedback));
    window.scrollTo(0, 0);
  }

  function summary() {
    const unique = [...new Set(missed)];
    set(view,
      backLink(ctx, '#/speak/alphabet', 'Alphabet'),
      h('div', { class: 'summary' },
        h('div', { class: 'summary-emoji', 'aria-hidden': 'true' }, right === qs.length ? '🌟' : '🎶'),
        h('h2', null, 'Round done'),
        h('p', { class: 'big-number' }, `${right}/${qs.length}`),
        unique.length
          ? [h('p', { class: 'muted' }, 'Worth another look:'),
            h('ul', { class: 'word-chips letter-missed' }, unique.map((q) => h('li', null, h('span', null, h('b', { lang: lang.code }, q.answer)))))]
          : h('p', { class: 'muted' }, 'Every one right.'),
        h('p', { class: 'hint' }, 'After a, ı, o, u the plural is -lar; after e, i, ö, ü it is -ler. The question word copies the vowel more closely: mı after a ı, mi after e i, mu after o u, mü after ö ü. “In / at” is -da or -de, with t for d after p, ç, t, k, f, h, s, ş. A few borrowed words go their own way (saat → saatler).'),
        h('div', { class: 'actions stack' },
          h('button', { type: 'button', class: 'btn primary wide', onclick: () => ctx.rerender() }, 'Another round'),
          h('a', { class: 'btn ghost wide', href: '#/speak/alphabet' }, 'Back to the chart'))));
    ctx.flushRewards?.();
    window.scrollTo(0, 0);
  }

  ctx.onCleanup(bindKeys({ 1: () => pick(0), 2: () => pick(1), 3: () => pick(2), 4: () => pick(3), Enter: () => goOn() }));
  ctx.onCleanup(() => ctx.speech.cancelSpeech());
  show();
  return view;
}
