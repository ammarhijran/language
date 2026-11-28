// "What's new": shown once on Home to people who already use the app, so new
// features are not only found by accident. Bump `id` when the list changes.
export const NEWS = {
  id: '2026-11-u',
  items: [
    { emoji: '⚙️', text: 'Settings in a side panel, from the gear at the top', where: 'Top right', href: '#/settings' },
    { emoji: '🎨', text: 'Ready-made themes, corners, headings, animations', where: 'Settings → Display', href: '#/settings/display' },
    { emoji: '🎧', text: 'Listening only · speaking only', where: 'Practice', href: '#/practice' },
    { emoji: '🎶', text: 'Rule quizzes: harmony · sun letters · я ю є · は', where: 'Practice → Speak → Alphabet', href: '#/speak/alphabet' },
    { emoji: '⏱', text: 'Reader: speed control and sleep timer', where: 'Read & Listen', href: '#/read' },
    { emoji: '🔤', text: 'Letter quiz: kana, Arabic, Cyrillic', where: 'Practice → Speak → Alphabet', href: '#/speak/alphabet' },
    { emoji: '📊', text: 'Your skills, side by side', where: 'Me → Progress', href: '#/progress' },
    { emoji: '🔧', text: 'Voice says a word wrong? Respell it', where: 'A word’s page', href: '#/progress' },
    { emoji: '☎️', text: 'Phone numbers and years by ear', where: 'Practice → Numbers by ear', href: '#/numbers' },
    { emoji: '💡', text: 'Tips: everything Four Tongues can do', where: 'Me → Tips', href: '#/help' },
    { emoji: '📝', text: 'My words: add your own vocabulary', where: 'Learn → Words', href: '#/mywords' },
    { emoji: '🗒️', text: 'Your own note on any word', where: 'A word’s page', href: '#/progress' },
  ],
};

/**
 * Whether to show the list: only to someone with progress who has not seen
 * this edition. A new learner has nothing "new" to be told about — for them
 * it is marked as seen straight away.
 */
export function newsToShow(store) {
  if (store.getSettings().newsSeen === NEWS.id) return null;
  if (!store.hasAnyProgress()) {
    store.updateSettings({ newsSeen: NEWS.id });
    return null;
  }
  return NEWS;
}
