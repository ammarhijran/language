// play/release-notes.txt goes inside every Play bundle (see the Android
// workflow) and an uploader pastes it into Play as the release's
// "What's new". Play wants it in language tags, at most 500 characters; the
// owner's rule for store text is no em or en dashes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const text = readFileSync(new URL('../play/release-notes.txt', import.meta.url), 'utf8');

test('Play release notes: one en-US block, at most 500 characters, no dashes', () => {
  const m = text.match(/^<en-US>\n([\s\S]+?)\n<\/en-US>\n?$/);
  assert.ok(m, 'the file is <en-US>, the notes, </en-US>, each on its own line');
  const notes = m[1];
  assert.ok(notes.trim().length > 20, 'there are notes');
  assert.ok([...notes].length <= 500, `${[...notes].length} characters; Play allows 500`);
  assert.doesNotMatch(notes, /[–—]/, 'no em or en dashes in store text');
  assert.doesNotMatch(notes, /[<>]/, 'no markup inside the notes');
});
