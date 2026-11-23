// Tips: what the app can do and where to find it — a short guide, one line
// per thing, each with the link that opens it. Kept next to the features it
// describes: tests/nav.test.js checks that every link is a real screen.
import { h, icon } from '../ui.js';
import { backLink } from '../components.js';
import { remindersSupported } from '../reminders.js';

/** The language's own exercise about how words sound: [practice mode, name, what you do]. */
function soundTip(lang) {
  if (lang.misread) return ['letters', 'Tricky letters', 'See a word and pick how it is read — c, ç, ş, ı, ğ, ö, ü are not read the English way.'];
  if (lang.stressPractice) return ['stress', 'Word stress', 'Tap the syllable that is stressed. It is not written, so it has to be learned with the word.'];
  if (lang.beatPractice) return ['beats', 'Count the beats', 'Say how many beats a word has: small っ, ん and long vowels each take one.'];
  return null;
}

/**
 * The guide: [{ title, items: [{ emoji, name, text, href }] }]. Items that
 * do not apply to the language (no reminders on the web, no sound exercise)
 * are left out. `scope` ('' or '/all') is added to practice links: the
 * whole course for someone who has not learned much yet.
 */
export function tips(lang, { reminders = false, scope = '' } = {}) {
  const sound = soundTip(lang);
  const letters = typeof lang.letterName === 'function'; // a script that is new: it has a letter quiz
  const item = (emoji, name, text, href) => ({ emoji, name, text, href });
  return [
    {
      title: 'Learn and review',
      items: [
        item('📚', 'Lessons', 'Open a topic and learn its words a few at a time: each is introduced, then asked.', '#/learn'),
        item('🔁', 'Reviews', 'Words come back just before you would forget them. A wrong tap that was only a slip? “I mis-tapped” on the answer keeps the word’s schedule. With nothing due, “Review ahead” does tomorrow’s words today.', '#/review'),
        item('✅', 'Already know some words?', 'Mark them, or take the placement check, and lessons skip them.', '#/known'),
        item('📈', 'Progress', 'Your last six weeks as a calendar, the reviews coming up this week, your skills side by side — listening, reading, recall, spelling, speaking — and every word with its status.', '#/progress'),
      ],
    },
    {
      title: 'Practise',
      items: [
        item('🔀', 'Quick rounds', 'Ten questions in the mode you choose — listening, spelling, flashcards, sentences, dictation — on what you have learned or on any topic.', '#/practice'),
        item('🧩', 'In context', 'A word’s own example sentence with the word left out: choose the word.', `#/practice/cloze${scope}`),
        item('🎧', 'Hands-free', 'Listen and repeat with nothing to tap. In its options you can add each word’s example sentence, hear the meaning first and recall the word, or let round follow round.', `#/practice/handsfree${scope}`),
        item('🔢', 'Numbers by ear', 'Hear a number, type its digits — also years, and phone numbers said digit by digit.', '#/numbers'),
      ],
    },
    {
      title: 'Pronunciation',
      items: [
        item('🎤', 'Speak', 'Say words aloud and get a score that shows which letters to work on.', '#/speak/drill'),
        item('👂', 'Ear training', 'Pairs of words one sound apart — including pairs from the words you have learned. Which one did you hear?', '#/speak/ear'),
        ...(letters ? [item('🔤', lang.code === 'ja' ? 'Kana quiz' : 'Letter quiz', 'See a letter and pick how it is read, or the other way round — ten at a time, with the ones you missed listed at the end.', '#/speak/alphabet/quiz')] : []),
        ...(lang.sunLetters ? [item('☀️', 'Sun or moon letter?', 'How “the” (al-) is said before each letter: ash-shams, but al-qamar.', '#/speak/alphabet/sun')] : []),
        ...(lang.code === 'tr' ? [item('🎶', 'Vowel harmony', 'Which ending a word takes — -lar or -ler, mı, mi, mu or mü — from its last vowel.', '#/speak/alphabet/harmony')] : []),
        ...(lang.code === 'uk' ? [item('🔤', 'я, ю, є: two sounds or one?', 'ya or a, yu or u, ye or e — where the letter stands in the word decides it.', '#/speak/alphabet/iotated')] : []),
        ...(lang.code === 'ja' ? [item('🔤', 'は: ha or wa?', 'は and へ are read wa and e as particles, ha and he inside a word — on the course’s own sentences.', '#/speak/alphabet/particles')] : []),
        item('🗣️', 'Sounds', 'The sounds English speakers find new, each with words to practise.', '#/speak/sounds'),
        ...(sound ? [item('🎯', sound[1], sound[2], `#/practice/${sound[0]}${scope}`)] : []),
        item('🔧', 'Voice says a word wrong?', 'On the word’s page, “Voice says it wrong?” lets you respell the word for the voice only — the word on screen stays. Settings → Audio has a switch for the whole language where there is one.', '#/progress'),
      ],
    },
    {
      title: 'Read and listen',
      items: [
        item('📖', 'Texts and speeches', 'Dialogues, stories, speeches and proverbs with audio line by line. Tap an underlined word for its meaning — and add it to My words.', '#/read'),
        item('⏭', 'Keep playing', 'In a text’s player, “Keep playing” goes on to the next text by itself. The same bar changes the voice’s speed, and ⏱ is a sleep timer that stops playing after 10 to 60 minutes.', '#/read'),
        item('🧱', 'Work with a text', 'Under each text: fill the gaps, build its sentences, take it as dictation, answer the questions.', '#/read'),
        item('✍️', 'Your own text', 'Paste a speech or an introduction and rehearse it with the voice. Its new words can go to My words.', '#/read/new'),
      ],
    },
    {
      title: 'Make it yours',
      items: [
        item('📝', 'My words', 'Add words and phrases you met elsewhere — one at a time or a whole pasted list — and learn them like the course’s.', '#/mywords'),
        item('🗒️', 'Your own notes', 'On any word’s page, “Add a note of my own”: a memory hook that shows after every answer about that word.', '#/progress'),
        item('⭐', 'Phrasebook', 'Ready-made phrases by situation. ☆ saves one; “Show” puts it on screen in big letters to show someone.', '#/phrases'),
        item('🎨', 'Themes and text size', 'Light or dark, the colour of buttons, the background, and larger text.', '#/settings'),
        item('⌨️', 'No keyboard, or can’t talk?', 'Settings → Lessons switches typing or speaking questions off.', '#/settings'),
        ...(reminders ? [item('🔔', 'Daily reminder', 'A notification at the time you choose that says what is waiting.', '#/settings')] : []),
      ],
    },
    {
      title: 'Keep it safe',
      items: [
        item('💾', 'Back up', 'Everything is stored on this device only. Settings → Your data exports a backup file.', '#/settings'),
        item('🔄', 'Sync between devices', 'A sync code carries your progress, notes and own words to another phone or computer — no account.', '#/sync'),
      ],
    },
  ];
}

/**
 * Tips whose name or text contains the query (three letters or more, any
 * case) — so Search also finds what the app can do ("dark", "backup").
 */
export function searchTips(lang, query, opts = {}) {
  const q = String(query || '').trim().toLowerCase();
  if ([...q].length < 3) return [];
  return tips(lang, opts).flatMap((g) => g.items).filter((it) => `${it.name} ${it.text}`.toLowerCase().includes(q)).slice(0, 4);
}

export default function help(ctx) {
  // Practice links: among the learned words once there are enough, else from the whole course.
  const learned = Object.keys(ctx.store.getCards(ctx.lang.code)).length;
  const groups = tips(ctx.lang, { reminders: remindersSupported(), scope: learned >= 40 ? '' : '/all' });
  return h('div', { class: 'view help' },
    backLink(ctx, '#/me', 'Me'),
    h('h1', null, 'Tips'),
    h('p', { class: 'muted' }, 'What Lisan can do, and where each thing is.'),
    groups.map((g) => h('section', { class: 'search-group' },
      h('h2', { class: 'section-title' }, g.title),
      h('ul', { class: 'link-list' }, g.items.map((it) => h('li', null, h('a', { href: it.href },
        h('span', { class: 'll-icon', 'aria-hidden': 'true' }, it.emoji),
        h('span', { class: 'll-text' }, h('b', null, it.name), h('small', null, it.text)),
        icon('arrow', 18))))))));
}
