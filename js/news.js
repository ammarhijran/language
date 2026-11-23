// "What's new": shown once on Home to people who already use the app, so new
// features are not only found by accident. Bump `id` when the list changes.
export const NEWS = {
  id: '2026-11-m',
  items: [
    { emoji: '💡', text: 'Tips: everything Lisan can do', where: 'Me → Tips', href: '#/help' },
    { emoji: '🌍', text: 'Ten new topics: “Wider world”', where: 'Learn', href: '#/learn' },
    { emoji: '🧩', text: 'Four new grammar lessons', where: 'Learn → Grammar', href: '#/grammar' },
    { emoji: '🪶', text: 'Proverbs · twisters · fill the gaps', where: 'Read & Listen', href: '#/read' },
    { emoji: '📚', text: 'New long reads: tales, a recipe talk', where: 'Read & Listen', href: '#/read' },
    { emoji: '🎤', text: 'Practise one sound at a time', where: 'Practice → Speak → Sounds', href: '#/speak/sounds' },
    { emoji: '📝', text: 'My words: add your own vocabulary', where: 'Learn → Words', href: '#/mywords' },
    { emoji: '🗒️', text: 'Your own note on any word', where: 'A word’s page', href: '#/progress' },
    { emoji: '🎨', text: 'Themes: dark mode, colours, backgrounds', where: 'Settings → Display', href: '#/settings' },
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
