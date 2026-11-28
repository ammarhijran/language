// The store screenshots' captions (scripts/store-screenshots.cjs): six to
// eight shots, headlines short enough to read as a thumbnail, no em or en
// dashes (the owner's rule for store text), at most one dark shot.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../scripts/store-screenshots.cjs', import.meta.url), 'utf8');
const block = src.match(/const SHOTS = \[([\s\S]*?)\n\];/)[1];
const shots = [...block.matchAll(/\{ id: '([^']+)'.*?title: '([^']+)', sub: '([^']+)'.*\}/g)].map((m) => ({ id: m[1], title: m[2], sub: m[3], dark: /dark: true/.test(m[0]) }));

test('store screenshots: 6 to 8, short headlines, one short subline, no dashes, one dark shot at most', () => {
  assert.equal(shots.length, block.split('\n').filter((l) => l.trim().startsWith('{ id:')).length, 'every shot was read');
  assert.ok(shots.length >= 6 && shots.length <= 8, `${shots.length} shots`);
  shots.forEach((s, i) => assert.ok(s.id.startsWith(String(i + 1).padStart(2, '0')), `${s.id} is numbered in order`));
  for (const s of shots) {
    assert.ok(s.title.split(/\s+/).length <= 6, `${s.id}: “${s.title}” has more than six words`);
    assert.ok(s.sub.length <= 70, `${s.id}: the subline is one short sentence`);
    assert.doesNotMatch(s.title + s.sub, /[–—]/, `${s.id}: no em or en dashes`);
  }
  assert.ok(shots.filter((s) => s.dark).length <= 1, 'at most one dark-mode shot');
});
