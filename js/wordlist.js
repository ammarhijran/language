// The learner's words as a spreadsheet (CSV): for printing, a spreadsheet, or
// importing into a flashcard program.
import { status, STATUS_LABEL } from './srs.js';

const cell = (v) => {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/**
 * CSV of every word the learner has started (or marked as already learned),
 * in course order: word, reading, meaning, example, its meaning, topic, status.
 * Starts with a byte-order mark so spreadsheet programs read it as UTF-8.
 */
export function wordsCsv(lang, cards, notes = {}) {
  const topics = new Map(lang.categories.map((c) => [c.id, c.name]));
  const rows = [['Word', 'Reading', 'Meaning', 'Example', 'Example meaning', 'Topic', 'Status', 'My note']];
  for (const w of lang.words) {
    const card = cards[w.id];
    if (!card) continue;
    const reading = (lang.fullReading ? lang.fullReading(w) : null) || '';
    rows.push([w.tr, reading, w.en, w.ex?.[0] || '', w.ex?.[1] || '', topics.get(w.cat) || '', STATUS_LABEL[status(card)] || '',
      // The learner's own note on a course word, or the note they gave a word of their own.
      (Object.hasOwn(notes, w.id) ? notes[w.id] : '') || (w.own ? w.note || '' : '')]);
  }
  return { count: rows.length - 1, text: `﻿${rows.map((r) => r.map(cell).join(',')).join('\r\n')}\r\n` };
}
