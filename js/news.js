// "What's new": shown once on Home to people who already use the app, so new
// features are not only found by accident. Bump `id` when the list changes.
export const NEWS = {
  id: '2026-11-f',
  items: [
    { emoji: '🎧', text: 'Hands-free listening · dictation', where: 'Practice', href: '#/practice' },
    { emoji: '✍️', text: 'Practise your own text', where: 'Read & Listen → My texts', href: '#/read/new' },
    { emoji: '🎒', text: 'Trip essentials crash course', where: 'Phrasebook', href: '#/phrases/kit' },
    { emoji: '🧩', text: 'Four new grammar lessons', where: 'Learn → Grammar', href: '#/grammar' },
    { emoji: '🪶', text: 'Proverbs · twisters · fill the gaps', where: 'Read & Listen', href: '#/read' },
    { emoji: '📚', text: 'New topics, long reads, speeches', where: 'Learn', href: '#/learn' },
    { emoji: '🔊', text: 'Compare voices · bigger text', where: 'Settings', href: '#/settings' },
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
