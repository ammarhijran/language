// Read & Listen: graded dialogues, stories, everyday texts and short speeches.
// (Placeholder until the reader is built; texts load on demand per language.)
import { h, icon } from '../ui.js';

export default function read(ctx) {
  return h('div', { class: 'view' },
    h('a', { href: '#/learn', class: 'back-link' }, icon('back', 16), 'Learn'),
    h('h1', null, 'Read & Listen'),
    h('p', { class: 'muted' }, 'Dialogues, stories and short speeches are coming soon.'));
}
