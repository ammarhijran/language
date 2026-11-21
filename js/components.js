// Reusable UI pieces: audio buttons, pronunciation breakdown, speaking practice.
import { h, icon, platform, set } from './ui.js';
import * as speech from './speech.js';
import { scoreSpoken } from './compare.js';

export function playButton(ctx, text, { label = 'Listen', slow = false, cls = '' } = {}) {
  return h('button', {
    type: 'button',
    class: `icon-btn play ${cls}`,
    'aria-label': `${label}: ${text}`,
    title: slow ? 'Play slowly' : 'Play',
    onclick: (e) => { e.stopPropagation(); ctx.say(text, { slow }); },
  }, icon(slow ? 'slow' : 'volume'));
}

export function audioControls(ctx, text) {
  return h('div', { class: 'audio-controls' },
    h('button', { type: 'button', class: 'btn primary', onclick: () => ctx.say(text) }, icon('volume'), 'Listen'),
    h('button', { type: 'button', class: 'btn', onclick: () => ctx.say(text, { slow: true }) }, icon('slow'), 'Slowly'),
  );
}

/** Syllables with stress, IPA, respelling and notes on tricky letters. */
export function pronunciationPanel(ctx, word, { compact = false } = {}) {
  const a = ctx.lang.analyze(word);
  const syllableRow = h('div', { class: 'syllables', lang: ctx.lang.code },
    a.words.map((w, wi) => [
      wi > 0 ? h('span', { class: 'syl-gap' }) : null,
      w.syllables.map((s, i) => h('button', {
        type: 'button',
        class: `syl${i === w.stressIndex ? ' stressed' : ''}`,
        title: i === w.stressIndex ? 'Stressed syllable — tap to hear it' : 'Tap to hear this syllable',
        onclick: () => ctx.say(s.text, { slow: true }),
      }, s.text)),
    ]),
  );

  const notes = ctx.lang.letterNotes(word.tr);
  return h('div', { class: `pron${compact ? ' compact' : ''}` },
    syllableRow,
    h('dl', { class: 'pron-facts' },
      h('div', null, h('dt', null, 'Say it like'), h('dd', { class: 'respell' }, a.respell)),
      h('div', null, h('dt', null, 'IPA'), h('dd', { class: 'ipa' }, `/${a.ipa}/`)),
    ),
    a.stressMarked && !compact
      ? h('p', { class: 'hint' }, 'Highlighted syllable = stress. Tap any syllable to hear it slowly.')
      : null,
    !compact && notes.length
      ? h('ul', { class: 'letter-notes' }, notes.map((n) =>
        h('li', null, h('b', { lang: ctx.lang.code }, n.letter), h('span', { class: 'ipa' }, `/${n.ipa}/`), ' ', n.hint)))
      : null,
  );
}

export function exampleBlock(ctx, word) {
  if (!word.ex) return null;
  const [tr, en] = word.ex;
  return h('div', { class: 'example' },
    playButton(ctx, tr, { label: 'Play example' }),
    h('div', null, h('p', { class: 'ex-tr', lang: ctx.lang.code }, tr), h('p', { class: 'ex-en' }, en)),
  );
}

function feedbackFor(score) {
  if (score >= 0.95) return { cls: 'good', title: 'Mükemmel! Excellent.' };
  if (score >= 0.8) return { cls: 'good', title: 'Çok iyi! Very close.' };
  if (score >= 0.55) return { cls: 'warn', title: 'Almost — focus on the highlighted letters.' };
  return { cls: 'bad', title: 'Not quite yet. Listen once more and try again.' };
}

/**
 * Speak-and-score widget. Uses the browser's speech recognition to transcribe
 * the attempt and compares it to the target; also lets learners record
 * themselves and compare with the native audio.
 */
export function speakPractice(ctx, word, { onResult, onOverride } = {}) {
  const { lang } = ctx;
  const target = word.tr;
  const canRecognize = speech.recognitionSupported();
  let best = 0;
  let attempts = 0;
  let session = null;

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
    if (session) { session.stop(); return; }
    mic.classList.add('live');
    mic.setAttribute('aria-label', 'Stop listening');
    status.textContent = speech.manualStop() ? 'Listening… tap the mic again when you’re done' : 'Listening… speak now';
    session = speech.listen({ lang: lang.speechLang });
    const res = await session.result;
    session = null;
    mic.classList.remove('live');
    mic.setAttribute('aria-label', 'Speak now');
    if (!res.ok) {
      status.textContent = speech.RECOGNITION_ERRORS[res.error] || `Something went wrong (${res.error}).`;
      return;
    }
    const scored = scoreSpoken(target, res.alternatives, lang);
    attempts++;
    best = Math.max(best, scored.score);
    status.textContent = attempts > 1 ? `Attempt ${attempts} · best ${Math.round(best * 100)}%` : '';
    renderResult(scored);
    onResult?.({ score: scored.score, best, attempts });
  }

  function renderResult(scored) {
    const fb = feedbackFor(scored.score);
    const pct = Math.round(scored.score * 100);
    const missed = new Set(scored.diff.filter((d) => !d.ok).map((d) => d.ch));
    const tips = [...missed].map((ch) => lang.letterHint(ch)).filter((l) => l?.special);
    result.hidden = false;
    result.className = `speak-result ${fb.cls}`;
    set(result, 
      h('div', { class: 'score-row' },
        h('div', { class: 'score-ring', style: { '--pct': pct } }, h('span', null, `${pct}%`)),
        h('div', null,
          h('p', { class: 'score-title' }, fb.title),
          h('p', { class: 'heard' }, 'Heard: ', h('q', { lang: lang.code }, scored.raw || '…')),
        ),
      ),
      h('p', { class: 'diff', lang: lang.code, 'aria-label': 'Target with letters to work on highlighted' },
        scored.diff.map((d) => h('span', { class: d.ok ? 'ok' : 'miss' }, d.ch))),
      tips.length
        ? h('ul', { class: 'letter-notes' }, tips.map((l) =>
          h('li', null, h('b', { lang: lang.code }, l.lower), h('span', { class: 'ipa' }, `/${l.ipa}/`), ' ', l.hint)))
        : null,
      onOverride && scored.score < 0.8
        ? h('button', { type: 'button', class: 'link-btn', onclick: () => onOverride() }, 'I said it right — the recogniser misheard')
        : null,
    );
  }

  ctx.onCleanup(() => session?.stop());

  return h('div', { class: 'speak' },
    h('div', { class: 'speak-main' },
      mic,
      h('div', { class: 'speak-side' }, status, recorder(ctx, target)),
    ),
    result,
  );
}

/** Record yourself, then play your attempt back next to the native audio. */
export function recorder(ctx, text) {
  if (!speech.recordingSupported()) return null;
  const wrap = h('div', { class: 'recorder' });
  let rec = null;
  let url = null;
  ctx.onCleanup(() => { rec?.stop(); if (url) URL.revokeObjectURL(url); });

  function idle() {
    set(wrap, 
      h('button', { type: 'button', class: 'btn small', onclick: start }, icon('record', 14), 'Record myself'),
      url ? h('button', { type: 'button', class: 'btn small', onclick: () => ctx.say(text) }, icon('volume', 14), 'Native') : null,
      url ? h('button', { type: 'button', class: 'btn small', onclick: () => new Audio(url).play() }, icon('play', 14), 'Mine') : null,
    );
  }

  async function start() {
    try {
      rec = await speech.startRecording({ maxMs: 4000 });
    } catch {
      ctx.toast('Microphone unavailable — check your browser permissions.');
      return;
    }
    set(wrap, h('button', { type: 'button', class: 'btn small recording', onclick: () => rec.stop() }, icon('stop', 14), 'Stop'));
    const newUrl = await rec.stopped;
    rec = null;
    if (url) URL.revokeObjectURL(url);
    url = newUrl;
    idle();
    // Play native then the learner's attempt for an immediate comparison.
    await ctx.say(text);
    new Audio(url).play().catch(() => {});
  }

  idle();
  return wrap;
}

/** Banner explaining how to install a voice when none exists for the language. */
export function voiceBanner(ctx) {
  const el = h('div', { class: 'banner', hidden: true, role: 'note' });
  const update = () => {
    if (!speech.ttsSupported()) {
      el.hidden = false;
      set(el, h('b', null, 'Audio unavailable. '), 'This browser can’t play speech, so pronunciation audio won’t work.');
      return;
    }
    if (!speech.voicesReady()) return;
    const has = speech.voicesFor(ctx.lang.speechLang).length > 0;
    el.hidden = has;
    if (!has) {
      set(el,
        h('b', null, `No ${ctx.lang.name} voice found. `),
        'Audio may sound wrong until you install one. ',
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
