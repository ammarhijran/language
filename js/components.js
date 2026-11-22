// Reusable UI pieces: audio buttons, pronunciation breakdown, speaking practice.
import { h, icon, platform, set } from './ui.js';
import * as speech from './speech.js';
import { scoreWord } from './compare.js';

// Audio takes what is being spoken, not just its text: an entry ({ tr, kana?,
// tl?, dialect?, say? }), an example or pair object, a string, or a resolved
// { text, lang }. ctx.say() reads it through lang.speech(), so the voice gets
// say.js overrides, Arabic pausal forms and the Egyptian voice.

/** The text as shown, for labels. */
const shownText = (target) => (typeof target === 'string' ? target : target?.tr ?? target?.text ?? '');

export function playButton(ctx, target, { label = 'Listen', slow = false, cls = '' } = {}) {
  return h('button', {
    type: 'button',
    class: `icon-btn play ${cls}`,
    'aria-label': `${label}: ${shownText(target)}`,
    title: slow ? 'Play slowly' : 'Play',
    onclick: (e) => { e.stopPropagation(); ctx.say(target, { slow }); },
  }, icon(slow ? 'slow' : 'volume'));
}

/** Listen / Slowly buttons, with a note on how to get a voice when the device has none. */
export function audioControls(ctx, target) {
  return h('div', null,
    h('div', { class: 'audio-controls' },
      h('button', { type: 'button', class: 'btn primary', onclick: () => ctx.say(target) }, icon('volume'), 'Listen'),
      h('button', { type: 'button', class: 'btn', onclick: () => ctx.say(target, { slow: true }) }, icon('slow'), 'Slowly'),
    ),
    voiceBanner(ctx, { lang: ctx.lang.speech(target).lang, style: { marginBottom: '1rem' } }),
  );
}

/** Syllables (or morae) with stress, IPA, respelling and notes on tricky letters. */
export function pronunciationPanel(ctx, word, { compact = false } = {}) {
  const { lang } = ctx;
  const a = lang.analyze(word);
  // Chips are normally in the language's own script and can be spoken one by
  // one. Some packs (Arabic) show them in transliteration instead.
  const chipLang = a.chipLang === undefined ? lang.code : a.chipLang;
  const speakable = a.chipsSpeakable !== false;
  const syllableRow = h('div', { class: 'syllables', lang: chipLang || null },
    a.words.map((w, wi) => [
      wi > 0 ? h('span', { class: 'syl-gap' }) : null,
      w.syllables.map((s, i) => h('button', {
        type: 'button',
        class: `syl${i === w.stressIndex ? ' stressed' : ''}`,
        title: i === w.stressIndex ? 'Stressed syllable' : (speakable ? 'Tap to hear this part' : 'Tap to hear the word slowly'),
        // A chip says what it sounds like (`say`: わ for a particle は, きっぷ
        // for っ), or, when chips aren't in a script a voice reads (Arabic
        // transliteration), the word it belongs to.
        onclick: () => ctx.say(speakable ? { text: s.say ?? s.text } : (s.say ?? word), { slow: true }),
      }, s.text)),
    ]),
  );

  const notes = lang.letterNotes(word);
  return h('div', { class: `pron${compact ? ' compact' : ''}` },
    syllableRow,
    h('dl', { class: 'pron-facts' },
      h('div', null, h('dt', null, 'Say it like'), h('dd', { class: 'respell' }, a.respell)),
      h('div', null, h('dt', null, 'IPA'), h('dd', { class: 'ipa' }, `/${a.ipa}/`)),
    ),
    !compact ? h('p', { class: 'hint' }, lang.pronHint(a)) : null,
    !compact ? regionVoiceNote(ctx, word) : null,
    !compact && notes.length
      ? h('ul', { class: 'letter-notes' }, notes.map((n) =>
        h('li', null, h('b', { lang: lang.code }, n.letter), h('span', { class: 'ipa' }, `/${n.ipa}/`), ' ', n.hint)))
      : null,
  );
}

/** Secondary line under a word: kana reading, transliteration… (null when the pack has none). */
export function readingLine(ctx, word, cls = 'reading') {
  const r = ctx.lang.reading(word);
  return r ? h('p', { class: cls }, r) : null;
}

/**
 * For a regional form (Egyptian Arabic) on a device with no voice from that
 * region: the pack's note on what the other voice gets wrong.
 */
function regionVoiceNote(ctx, word) {
  const sp = ctx.lang.speech(word);
  if (!sp.alt || !ctx.lang.altVoiceHint) return null;
  const el = h('p', { class: 'hint', hidden: true }, ctx.lang.altVoiceHint);
  const update = () => { el.hidden = !speech.voicesReady() || speech.hasRegionVoice(sp.lang) || speech.canSpeak(sp.alt.lang) === false; };
  update();
  ctx.onCleanup(speech.onVoicesChanged(update));
  return el;
}

export function exampleBlock(ctx, word) {
  if (!word.ex) return null;
  const ex = word.example || { tr: word.ex[0], en: word.ex[1] };
  // Kana · rōmaji (Japanese) or transliteration (Arabic) when the pack has one.
  const reading = ex.kana || ex.tl ? ctx.lang.reading(ex) : null;
  return h('div', { class: 'example' },
    playButton(ctx, ex, { label: 'Play example' }),
    h('div', null,
      h('p', { class: 'ex-tr', lang: ctx.lang.code }, ex.tr),
      reading ? h('p', { class: 'reading small' }, reading) : null,
      h('p', { class: 'ex-en' }, ex.en)),
  );
}

/**
 * A feedback line from the language pack: plain English, or [native, gloss].
 * The native words are isolated and tagged so they get the right font and
 * direction (an Arabic “!” stays at the end of its word).
 */
export function praiseLine(lang, line) {
  if (!Array.isArray(line)) return line;
  const [native, gloss] = line;
  return [h('bdi', { lang: lang.code }, native), ' ', gloss];
}

// The same bands as the speak exercise's ratings (exercises.js): GOOD from 85 %, HARD from 70 %.
function feedbackFor(score, lang) {
  if (score >= 0.95) return { cls: 'good', title: lang.scoreTitles.excellent };
  if (score >= 0.85) return { cls: 'good', title: lang.scoreTitles.close };
  if (score >= 0.7) return { cls: 'warn', title: 'Almost — focus on the highlighted letters.' };
  return { cls: 'bad', title: 'Not quite yet. Listen once more and try again.' };
}

/** Why a transcript scored as it did, when that isn't just letters: another word, a homophone, a negative. */
function heardNote(lang, scored) {
  const q = (text) => h('bdi', { lang: lang.code }, text);
  if (scored.match === 'other' && scored.other) {
    // This entry's own other-register form (the casual or Egyptian way to say it).
    if (scored.pair && scored.other.id === scored.word?.id) {
      return h('p', { class: 'hint heard-note' }, 'That’s ', q(scored.other.pair.tr), ', the other way to say it. This card practises ', q(scored.word.tr), '.');
    }
    const other = scored.pair ? { tr: scored.other.pair.tr, en: scored.other.pair.en || scored.other.en } : scored.other;
    return h('p', { class: 'hint heard-note' }, 'That’s a different word: ', q(other.tr), ` — “${other.en}”.`);
  }
  // A word outside the course (Japanese: a kanji the target isn't written with).
  if (scored.match === 'other') return h('p', { class: 'hint heard-note' }, 'That sounds like a different word. Listen once more and try again.');
  if (scored.match === 'sound') {
    // The reading of the form heard: an entry's other-register form (قَوِي ʾawi) has its own.
    const heardAs = scored.other && scored.pair ? scored.other.pair : scored.other;
    const reading = lang.reading(heardAs || {}) || lang.reading(scored.word || {});
    return h('p', { class: 'hint heard-note' }, 'Same sound, written another way ✓', reading ? [' (', q(reading.split(' · ')[0]), ')'] : null);
  }
  if (scored.match === 'negation') {
    return h('p', { class: 'hint heard-note' }, lang.negative?.(scored.word?.tr || '')
      ? 'Listen for the negative: this one says “not”.'
      : 'That was the negative — this one says it without “not”.');
  }
  return null;
}

/** The target as written, with the letters to work on marked (diff from lang.diffAsWritten). */
export function diffLine(diff, attrs = {}) {
  return h('p', { class: 'diff', ...attrs }, diff.map((d) => h('span', { class: d.ok ? 'ok' : 'miss' }, d.ch)));
}

/**
 * A child cleanup scope for content that is replaced inside a screen (one
 * card at a time): hand `scope.ctx` to its components and call
 * `scope.cleanup()` before showing the next card. It also runs when the
 * screen itself goes away.
 */
export function cleanupScope(ctx) {
  let fns = [];
  const cleanup = () => { const run = fns; fns = []; run.forEach((f) => f()); };
  ctx.onCleanup(cleanup);
  return { ctx: Object.create(ctx, { onCleanup: { value: (fn) => fns.push(fn) } }), cleanup };
}

/** Speak `target` after a short pause, unless the card or screen has gone by then (autoplay: no "no voice" toast). */
export function sayLater(ctx, target, ms = 300) {
  const t = setTimeout(() => ctx.say(target, { auto: true }), ms);
  ctx.onCleanup(() => clearTimeout(t));
}

/**
 * Speak-and-score widget. Uses the browser's speech recognition to transcribe
 * the attempt and compares it to the target; also lets learners record
 * themselves and compare with the native audio.
 */
export function speakPractice(ctx, word, { onResult, onOverride, maxMs } = {}) {
  const { lang } = ctx;
  // Egyptian entries are recognised as Egyptian Arabic (ar-EG).
  const listenLang = lang.speech(word).lang;
  const canRecognize = speech.recognitionSupported();
  let best = 0;
  let attempts = 0;
  let session = null;
  let disposed = false;

  const status = h('p', { class: 'speak-status', 'aria-live': 'polite' },
    canRecognize ? 'Tap the mic, then say it out loud.' : speech.RECOGNITION_ERRORS.unsupported);
  const result = h('div', { class: 'speak-result', hidden: true });

  const mic = h('button', {
    type: 'button',
    class: 'mic-btn',
    'aria-label': 'Speak now',
    disabled: !canRecognize,
    onclick: toggle,
  }, icon('mic', 30));

  async function toggle() {
    if (disposed) return;
    if (session) { session.stop(); return; }
    mic.classList.add('live');
    mic.setAttribute('aria-label', 'Stop listening');
    status.textContent = speech.manualStop() ? 'Listening… tap the mic again when you’re done' : 'Listening… speak now';
    session = speech.listen({ lang: listenLang, maxMs });
    let res = await session.result;
    // A recogniser without the regional locale (iOS has no ar-EG) gets the pack's own.
    if (!res.ok && res.error === 'language-not-supported' && listenLang !== lang.speechLang && !disposed) {
      session = speech.listen({ lang: lang.speechLang, maxMs });
      res = await session.result;
    }
    session = null;
    // The card or screen went away while listening: don't score or reward the old word.
    if (disposed) return;
    mic.classList.remove('live');
    mic.setAttribute('aria-label', 'Speak now');
    if (!res.ok) {
      status.textContent = speech.RECOGNITION_ERRORS[res.error] || `Something went wrong (${res.error}).`;
      return;
    }
    // Against every valid written form (kanji and kana, other spellings), and
    // word-aware: another word of the course or the opposite meaning never counts.
    const scored = { ...scoreWord(lang, word, res.alternatives), word };
    attempts++;
    best = Math.max(best, scored.score);
    status.textContent = attempts > 1 ? `Attempt ${attempts} · best ${Math.round(best * 100)}%` : '';
    renderResult(scored);
    ctx.game?.spoke({ lang: lang.code, wordId: word.id, score: scored.score, inSession: !!ctx.inSession });
    onResult?.({ score: scored.score, best, attempts });
  }

  function renderResult(scored) {
    const fb = feedbackFor(scored.score, lang);
    const pct = Math.round(scored.score * 100);
    // Show the target as written (katakana stays katakana, Arabic keeps its
    // spaces and spelling); tips are looked up by the normalised letters. The
    // same sound written another way (花 for 鼻) has nothing to fix.
    const diff = scored.match === 'sound'
      ? lang.diffAsWritten(word.tr, lang.normalize(word.tr))
      : lang.diffAsWritten(scored.written, scored.heard);
    const missed = new Set(diff.filter((d) => !d.ok).flatMap((d) => [...d.key]));
    const tips = [...missed].map((ch) => lang.letterHint(ch)).filter((l) => l?.special);
    result.hidden = false;
    result.className = `speak-result ${fb.cls}`;
    set(result, 
      h('div', { class: 'score-row' },
        h('div', { class: 'score-ring', style: { '--pct': pct } }, h('span', null, `${pct}%`)),
        h('div', null,
          h('p', { class: 'score-title' }, praiseLine(lang, fb.title)),
          h('p', { class: 'heard' }, 'Heard: “', h('bdi', { lang: lang.code }, scored.raw || '…'), '”'),
        ),
      ),
      heardNote(lang, scored),
      diffLine(diff, { lang: lang.code, 'aria-label': 'Target with letters to work on highlighted' }),
      tips.length
        ? h('ul', { class: 'letter-notes' }, tips.map((l) =>
          h('li', null, h('b', { lang: lang.code }, l.lower), h('span', { class: 'ipa' }, `/${l.ipa}/`), ' ', l.hint)))
        : null,
      onOverride && scored.score < 0.85
        ? h('button', { type: 'button', class: 'link-btn', onclick: () => onOverride() }, 'I said it right — the recogniser misheard')
        : null,
    );
  }

  ctx.onCleanup(() => { disposed = true; session?.stop(); });

  return h('div', { class: 'speak' },
    h('div', { class: 'speak-main' },
      mic,
      h('div', { class: 'speak-side' }, status, recorder(ctx, word)),
    ),
    result,
  );
}

/** Record yourself, then play your attempt back next to the native audio (`target`: what ctx.say takes). */
export function recorder(ctx, target) {
  if (!speech.recordingSupported()) return null;
  const wrap = h('div', { class: 'recorder' });
  let rec = null;
  let url = null;
  let audio = null;
  let disposed = false;
  // When the card or screen goes away: stop recording and playback, free the
  // recording, and make any pending start() bail out instead of playing.
  ctx.onCleanup(() => {
    disposed = true;
    rec?.stop();
    audio?.pause();
    if (url) URL.revokeObjectURL(url);
    url = null;
  });

  function playMine() {
    audio?.pause();
    audio = new Audio(url);
    audio.play().catch(() => {});
  }

  function idle() {
    set(wrap, 
      h('button', { type: 'button', class: 'btn small', onclick: start }, icon('record', 14), 'Record myself'),
      url ? h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(target) }, icon('volume', 14), 'Native') : null,
      url ? h('button', { type: 'button', class: 'btn small', onclick: playMine }, icon('play', 14), 'Mine') : null,
    );
  }

  async function start() {
    let r;
    try {
      r = await speech.startRecording({ maxMs: 4000 });
    } catch {
      if (!disposed) ctx.toast('Microphone unavailable — check your browser permissions.');
      return;
    }
    // Left while the browser was asking for the microphone: stop straight away.
    if (disposed) { r.stop().then((u) => URL.revokeObjectURL(u)); return; }
    rec = r;
    set(wrap, h('button', { type: 'button', class: 'btn small recording', onclick: () => r.stop() }, icon('stop', 14), 'Stop'));
    const newUrl = await r.stopped;
    rec = null;
    if (disposed) { URL.revokeObjectURL(newUrl); return; }
    if (url) URL.revokeObjectURL(url);
    url = newUrl;
    idle();
    // Play native then the learner's attempt for an immediate comparison.
    await ctx.say(target);
    if (!disposed) playMine();
  }

  idle();
  return wrap;
}

/**
 * Banner explaining how to install a voice when none exists for the language
 * (`lang`: the locale to check, default the pack's). The app then plays no
 * audio rather than read the words with another language's voice; syllables,
 * IPA and the respelling still help.
 */
export function voiceBanner(ctx, { lang = ctx.lang.speechLang, style } = {}) {
  const el = h('div', { class: 'banner', hidden: true, role: 'note', style });
  const update = () => {
    if (!speech.ttsSupported()) {
      el.hidden = false;
      set(el, h('b', null, 'Audio unavailable. '), 'This browser can’t play speech, so pronunciation audio won’t work.');
      return;
    }
    const has = speech.canSpeak(lang) !== false;
    el.hidden = has;
    if (!has) {
      set(el,
        h('b', null, `No ${ctx.lang.name} voice found. `),
        'Audio stays off until you install one — the syllables and “Say it like” still show the pronunciation. ',
        ctx.lang.voiceHelp[platform()] || ctx.lang.voiceHelp.other,
        speech.canInstallVoices()
          ? h('div', null, h('button', { type: 'button', class: 'btn small', onclick: () => speech.installVoices() }, 'Install voice data'))
          : null,
      );
    }
  };
  update();
  ctx.onCleanup(speech.onVoicesChanged(update));
  return el;
}

export function categoryCard(ctx, cat, { href } = {}) {
  const words = ctx.lang.wordsIn(cat.id);
  const learned = words.filter((w) => ctx.store.getCard(ctx.lang.code, w.id)).length;
  const pct = Math.round((learned / words.length) * 100);
  return h('a', { class: 'cat-card', href: href ?? `#/learn/${cat.id}` },
    h('span', { class: 'cat-emoji', 'aria-hidden': 'true' }, cat.emoji),
    h('span', { class: 'cat-text' },
      h('span', { class: 'cat-name' }, cat.name),
      h('span', { class: 'cat-native', lang: ctx.lang.code }, cat.native),
    ),
    h('span', { class: 'cat-progress' },
      h('span', { class: 'cat-count' }, `${learned}/${words.length}`),
      h('span', { class: 'mini-meter' }, h('span', { style: { width: `${pct}%` } })),
    ),
  );
}

// ---------- Register: polite / proper vs everyday ----------

export const REG_LABEL = { formal: 'Formal', polite: 'Polite', neutral: 'Neutral', casual: 'Casual', slang: 'Slang' };
const CASUAL = new Set(['casual', 'slang']);

/** A small badge for an entry's register (nothing for neutral words). */
export function regBadge(word) {
  if (!word.reg || word.reg === 'neutral') return word.dialect ? h('span', { class: 'badge reg-casual' }, `🇪🇬 ${word.dialect}`) : null;
  return h('span', { class: `badge reg-${word.reg}` }, REG_LABEL[word.reg] || word.reg, word.dialect ? ` · ${word.dialect}` : '');
}

/**
 * Side-by-side comparison of an entry and its other-register counterpart:
 * what people actually say day to day vs the proper / polite language.
 */
export function registerBlock(ctx, word, { compact = false } = {}) {
  if (!word.pair) return null;
  const { lang } = ctx;
  const me = { ...word, reg: word.reg || 'neutral' };
  const other = { ...word.pair, en: word.pair.en || word.en };
  const everyday = CASUAL.has(me.reg) || (!CASUAL.has(other.reg) && me.reg !== 'formal' && other.reg === 'formal') ? me : other;
  const proper = everyday === me ? other : me;
  const side = (w, title, cls) => h('div', { class: `reg-side ${cls}` },
    h('p', { class: 'kicker' }, title, w.dialect ? ` · ${w.dialect}` : ''),
    h('p', { class: 'reg-text' },
      playButton(ctx, w),
      h('span', null,
        h('b', { lang: lang.code }, w.tr),
        lang.reading(w) ? h('small', { class: 'reading small' }, lang.reading(w)) : null)),
    !compact && w.en && w.en !== word.en ? h('p', { class: 'muted small' }, w.en) : null);
  return h('div', { class: `register${compact ? ' compact' : ''}`, role: 'group', 'aria-label': 'Everyday speech compared with the proper form' },
    side(everyday, '🗣️ What people say', 'everyday'),
    side(proper, lang.code === 'ar' ? '📖 Standard Arabic' : '🎩 Proper / polite', 'proper'));
}

// ---------- Topic sections ----------

export const GROUPS = [
  { id: 'words', title: 'Words', hint: 'Everyday vocabulary, most common first' },
  { id: 'phrases', title: 'Phrases', hint: 'Ready-to-use sentences for real situations' },
  { id: 'talk', title: 'Talk like a local', hint: 'How people really speak — casual forms and slang, next to the proper version' },
];

/** Category cards grouped into Words / Phrases / Talk like a local. */
export function categorySections(ctx, { headingTag = 'h2' } = {}) {
  return GROUPS.map((g) => {
    const cats = ctx.lang.categories.filter((c) => (c.group || 'words') === g.id);
    if (!cats.length) return null;
    return h('section', { class: 'cat-section' },
      h(headingTag, { class: 'section-title' }, g.title),
      h('p', { class: 'hint' }, g.hint),
      h('div', { class: 'cat-grid' }, cats.map((c) => categoryCard(ctx, c))));
  });
}

/** Link card to the grammar guide. */
export function grammarLink(ctx) {
  const lessons = ctx.lang.grammar || [];
  if (!lessons.length) return null;
  const done = lessons.filter((l) => ctx.game?.grammarBest(ctx.lang.code, l.id) != null).length;
  return h('a', { class: 'quick-link grammar-link', href: '#/grammar' },
    h('span', { class: 'grammar-icon', 'aria-hidden': 'true' }, '📖'),
    h('span', null, h('b', null, `${ctx.lang.name} grammar`), h('small', null, `${lessons.length} short lessons with quizzes${done ? ` · ${done} done` : ''}`)),
    icon('arrow'));
}
