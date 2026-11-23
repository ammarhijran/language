// Accuracy across whole packs: every valid form of every entry scores as the
// right answer, no other entry passes for it, multiple-choice options never
// hold two right answers, and the generated Japanese homophone list matches
// the course. (Single cases are in compare.test.js.)
//
// js/languages/ja/homophones.js COURSE is generated from the pack: when the
// vocabulary changes, run `UPDATE_HOMOPHONES=1 node --test tests/scoring.test.js`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { scoreWord, checkTyped, similarity, overlaps } from '../js/compare.js';
import { pickOptions, speakRating } from '../js/exercises.js';
import { AGAIN } from '../js/srs.js';
import { sameScriptAlts } from '../js/languages/common.js';
import tr from '../js/languages/tr/index.js';
import uk from '../js/languages/uk/index.js';
import ja from '../js/languages/ja/index.js';
import ar from '../js/languages/ar/index.js';
import { SPELLINGS, COURSE } from '../js/languages/ja/homophones.js';

const PACKS = [tr, uk, ja, ar];
const said = (L, w, text) => scoreWord(L, w, [{ transcript: text }]);

test('every entry, and every alt spelling a recogniser could write, scores 100 % spoken', () => {
  for (const L of PACKS) {
    for (const w of L.words) {
      assert.equal(said(L, w, w.tr).score, 1, `${L.code} ${w.tr}`);
      for (const a of sameScriptAlts(w)) assert.equal(said(L, w, a).score, 1, `${L.code} ${w.tr} ← alt ${a}`);
      if (L.code === 'ja') assert.equal(said(L, w, w.kana.replace(/\s+/g, '')).score, 1, `ja ${w.tr} ← its kana`);
    }
  }
});

test('every entry typed as written, or in the course’s transliteration, is right', () => {
  for (const L of PACKS) {
    for (const w of L.words) {
      for (const a of L.acceptedAnswers(w)) assert.equal(checkTyped(L, w, a).verdict, 'good', `${L.code} ${w.tr} ← ${a}`);
    }
  }
});

test('no other single word of the course passes for a word when spoken or typed', () => {
  for (const L of PACKS) {
    const single = L.words.filter((w) => !/\s/.test(w.tr.trim()) && w.tr.length <= 12)
      .map((w) => ({ w, key: L.normalize(w.tr).replace(/\s+/g, '') }));
    for (const { w, key } of single) {
      // The neighbours the audit found: other words that share most letters.
      for (const { w: o, key: ok } of single) {
        if (o.id === w.id || Math.abs(ok.length - key.length) > 0.45 * Math.max(ok.length, key.length) || similarity(key, ok) < 0.55) continue;
        if (L.spokenTargets(w).some((t) => L.normalize(t) === L.normalize(o.tr))) continue; // one is the other's spelling
        if (L.sameSound?.(o, w)) continue; // homophones (鼻 · 花) can't be told apart by ear
        const r = said(L, w, o.tr);
        // Heard as the other-register form of an entry that sounds the same (Egyptian أَوِي is
        // written قوي, like the word “strong”): by ear they are one word.
        if (r.match === 'sound' && r.pair && L.sameSound?.(r.other.pair, w)) continue;
        assert.equal(speakRating(r.score), AGAIN, `${L.code} ${w.tr} ← ${o.tr}: ${r.score} (${r.match})`);
        assert.notEqual(checkTyped(L, w, o.tr).verdict === 'almost', true, `${L.code} ${w.tr} typed ${o.tr}`);
      }
    }
  }
});

test('multiple choice never offers a second right answer', () => {
  for (const L of PACKS) {
    for (const w of L.words) {
      for (const label of [(x) => x.en, (x) => x.tr]) {
        for (let i = 0; i < 3; i++) {
          const opts = pickOptions(L, w, label);
          assert.equal(opts.filter((o) => o.id === w.id).length, 1);
          assert.equal(new Set(opts.map(label)).size, opts.length, `${L.code} ${w.tr}: duplicate labels`);
          for (const o of opts) if (o.id !== w.id) assert.ok(!overlaps(o.en, w.en), `${L.code} ${w.tr} (${w.en}) offered with ${o.tr} (${o.en})`);
          assert.ok(opts.length >= 3, `${L.code} ${w.tr}: only ${opts.length} options`);
        }
      }
    }
  }
  // The audit's case: ごめん is never next to すみません-like “sorry” glosses.
  const gomen = ja.words.find((x) => x.tr === 'ごめん');
  for (let i = 0; i < 50; i++) assert.ok(pickOptions(ja, gomen, (x) => x.en).filter((o) => /\bsorry\b/i.test(o.en)).length === 1);
});

// ---------- js/languages/ja/homophones.js ----------

/** kana → the course's headwords read that way, for readings shared by 2+ entries. */
function courseHomophones() {
  const groups = new Map();
  for (const w of ja.words) {
    const k = ja.normalize(w.kana);
    if (!groups.has(k)) groups.set(k, []);
    if (!groups.get(k).includes(w.tr)) groups.get(k).push(w.tr);
  }
  return Object.fromEntries([...groups].filter(([, v]) => v.length > 1).sort(([a], [b]) => a.localeCompare(b, 'ja')));
}

test('homophones.js COURSE lists the course’s own homophones (regenerate with UPDATE_HOMOPHONES=1)', () => {
  const want = courseHomophones();
  if (process.env.UPDATE_HOMOPHONES) {
    const file = new URL('../js/languages/ja/homophones.js', import.meta.url);
    const body = Object.entries(want).map(([k, v]) => `  '${k}': [${v.map((x) => `'${x}'`).join(', ')}],`).join('\n');
    const src = readFileSync(file, 'utf8').replace(/(\/\/ BEGIN COURSE \(generated\)\n)[\s\S]*?(\/\/ END COURSE)/, `$1export const COURSE = {\n${body}\n};\n$2`);
    writeFileSync(file, src);
    return;
  }
  assert.deepEqual(COURSE, want, 'run: UPDATE_HOMOPHONES=1 node --test tests/scoring.test.js');
});

test('homophones.js SPELLINGS are for words of the course, and none is another entry', () => {
  for (const [id, forms] of Object.entries(SPELLINGS)) {
    const w = ja.byId(id);
    assert.ok(w, `SPELLINGS: no word with id ${id}`);
    for (const f of forms) {
      const others = ja.entriesWritten(f).filter((e) => e.word.id !== id);
      assert.deepEqual(others.map((e) => e.word.tr), [], `${f} (for ${id}) is another entry`);
      assert.equal(said(ja, w, f).score, 1, `${id} ← ${f}`);
    }
  }
});

test('word stress: one-word entries of two or more syllables can be asked, with the pack’s stress', async () => {
  const { stressItem } = await import('../js/exercises.js');
  const find = (t) => uk.words.find((w) => w.tr === t);
  assert.deepEqual(stressItem(uk, find('молоко')), { syllables: ['мо', 'ло', 'ко'], stressed: 2 });
  assert.deepEqual(stressItem(uk, find('привіт')), { syllables: ['при', 'віт'], stressed: 1 });
  assert.equal(stressItem(uk, uk.words.find((w) => /\s/.test(w.tr))), null, 'not for phrases');
  assert.equal(stressItem(uk, find('так')), null, 'not for one-syllable words');
  let n = 0;
  for (const w of uk.words) {
    const item = stressItem(uk, w);
    if (!item) continue;
    n++;
    const letters = (t) => t.replace(/[^\p{L}\p{M}]/gu, '');
    assert.equal(letters(item.syllables.join('')), letters(w.tr), `${w.tr}: the syllables spell the word`);
    assert.ok(item.syllables.length >= 2 && item.stressed >= 0 && item.stressed < item.syllables.length, w.tr);
    assert.ok(/[аеєиіїоуюя]/i.test(item.syllables[item.stressed]), `${w.tr}: the stressed syllable has a vowel`);
  }
  assert.ok(n >= 600, `${n} Ukrainian words to ask`);
  // Arabic: the syllables are those of the transliteration; Egyptian entries follow Egyptian stress.
  const kitab = ar.words.find((w) => w.tl === 'kitāb');
  assert.deepEqual(stressItem(ar, kitab), { syllables: ['ki', 'tāb'], stressed: 1 });
  const shajara = ar.words.find((w) => w.tl === 'shajara');
  assert.deepEqual(stressItem(ar, shajara), { syllables: ['sha', 'ja', 'ra'], stressed: 0 });
  let arabic = 0;
  for (const w of ar.words) {
    const item = stressItem(ar, w);
    if (!item) continue;
    arabic++;
    assert.ok(item.syllables.every((x) => x && !/\p{Script=Arabic}/u.test(x)), `${w.tr}: syllables in Latin letters`);
    assert.ok(/[aiuāīūeoēō]/i.test(item.syllables[item.stressed]), `${w.tr}: the stressed syllable ${item.syllables[item.stressed]} has a vowel`);
  }
  assert.ok(arabic >= 600, `${arabic} Arabic words to ask`);
  assert.equal(uk.stressPractice, true);
  assert.equal(ar.stressPractice, true);
  assert.ok(!tr.stressPractice && !ja.stressPractice, 'Turkish stress is nearly always final; Japanese has pitch, not stress');
  const unmarked = { analyze: () => ({ words: [{ text: 'salı', syllables: [{ text: 'sa' }, { text: 'lı' }], stressIndex: 1 }], stressMarked: false }) };
  assert.equal(stressItem(unmarked, { tr: 'salı' }), null);
  const broken = { analyze: () => { throw new Error('no'); } };
  assert.equal(stressItem(broken, { tr: 'слово' }), null);
});

test('count the beats (Japanese): morae of single words where counting teaches something', async () => {
  const { beatItem, beatOptions } = await import('../js/exercises.js');
  const of = (kana) => beatItem(ja, ja.words.find((w) => w.kana === kana))?.beats.join('・');
  assert.equal(of('きっぷ'), 'き・っ・ぷ', 'a small っ is a beat');
  assert.equal(of('にちようび'), 'に・ち・よ・う・び', 'the second half of a long vowel is a beat');
  assert.equal(of('しゅくじつ'), 'しゅ・く・じ・つ', 'a contracted sound is one beat');
  assert.equal(of('オーブン'), 'オ・ー・ブ・ン', 'ー and ん are beats');
  // Nothing to learn from plain consonant + vowel words, and phrases are not asked.
  const plain = ja.words.find((w) => w.kana && /^[かきくけこさしすせそたちつてとなにぬねのまみむめもらりるれろ]{2,4}$/.test(w.kana));
  assert.equal(beatItem(ja, plain), null, plain.kana);
  assert.equal(beatItem(ja, ja.words.find((w) => /\s/.test(w.kana || ''))), null);
  assert.equal(beatItem(ja, { tr: '蝶', en: 'no reading' }), null);
  let n = 0;
  for (const w of ja.words) {
    const item = beatItem(ja, w);
    if (!item) continue;
    n++;
    assert.equal(item.beats.join(''), w.kana, `${w.tr}: the beats spell the reading`);
    assert.ok(item.beats.length >= 2 && item.beats.length <= 8 && item.beats.every((b) => [...b].length <= 2), w.kana);
  }
  assert.ok(n >= 400, `${n} Japanese words to ask`);
  // The four options are consecutive, include the answer and never go below one.
  for (let beats = 2; beats <= 8; beats++) {
    for (const r of [0, 0.49, 0.5, 0.99]) {
      const opts = beatOptions(beats, () => r);
      assert.equal(opts.length, 4);
      assert.ok(opts.includes(beats) && opts[0] >= 1 && opts.every((k, i) => i === 0 || k === opts[i - 1] + 1), `${beats}: ${opts}`);
    }
  }
  assert.equal(ja.beatPractice, true);
  assert.ok(!tr.beatPractice && !uk.beatPractice && !ar.beatPractice);
});

test('a mixed practice round also asks for stress (Ukrainian, Arabic) or beats (Japanese), never elsewhere', async () => {
  const { typeFor } = await import('../js/views/practice.js');
  const kinds = (mode, w, L) => new Set(Array.from({ length: 400 }, () => typeFor(mode, w, L)));
  const moloko = uk.words.find((w) => w.tr === 'молоко');
  assert.ok(kinds('mixed', moloko, uk).has('stress'));
  assert.ok(!kinds('mixed', moloko, uk).has('beats'));
  assert.ok(!kinds('mixed', uk.words.find((w) => /\s/.test(w.tr)), uk).has('stress'), 'not for a phrase');
  assert.ok(kinds('mixed', ar.words.find((w) => w.tl === 'kitāb'), ar).has('stress'));
  const kippu = ja.words.find((w) => w.kana === 'きっぷ');
  assert.ok(kinds('mixed', kippu, ja).has('beats'));
  assert.ok(!kinds('mixed', kippu, ja).has('stress'));
  const turkish = kinds('mixed', tr.words.find((w) => w.tr === 'cami'), tr);
  assert.ok(!turkish.has('stress') && !turkish.has('beats'));
  assert.ok(turkish.has('letters'), 'Turkish: how a word with special letters is read');
  assert.ok(!kinds('mixed', moloko, uk).has('letters'));
  assert.ok(!kinds('mixed', moloko).has('stress'), 'without the pack nothing changes');
  assert.deepEqual([...kinds('listen', moloko, uk)], ['listen'], 'a chosen mode stays that mode');
});

test('tricky letters (Turkish): the wrong readings are the special letters read the English way', async () => {
  const { misreadItem } = await import('../js/exercises.js');
  const of = (t) => misreadItem(tr, tr.words.find((w) => w.tr === t));
  assert.deepEqual(of('cami'), { right: 'jah-mee', wrong: ['kah-mee', 'sah-mee'] });
  assert.deepEqual(of('kuş'), { right: 'koosh', wrong: ['koos'] });
  assert.deepEqual(of('kış'), { right: 'kuhsh', wrong: ['kuhs', 'keesh', 'kees'] }); // ş alone, ı alone, both
  assert.deepEqual(of('soğuk').wrong, ['soh-GOOK', 'soh-YOOK']);
  assert.deepEqual(of('değil').wrong, ['deh-GEEL'], 'ğ read as y is the right reading here, so it is not offered as a wrong one');
  assert.equal(misreadItem(tr, tr.words.find((w) => /^[abdefghklmnoprstuvyz]+$/.test(w.tr))), null, 'no special letter, nothing to ask');
  assert.equal(misreadItem(tr, tr.words.find((w) => /\s/.test(w.tr) && /ş/.test(w.tr))), null, 'phrases are not asked');
  assert.equal(misreadItem(uk, uk.words[0]), null, 'only packs that list misreadings');
  let n = 0;
  let rich = 0;
  for (const w of tr.words) {
    const item = misreadItem(tr, w);
    if (!item) continue;
    n++;
    if (item.wrong.length >= 2) rich++;
    assert.equal(item.right, tr.analyze(w).respell, w.tr);
    assert.ok(!item.wrong.includes(item.right) && new Set(item.wrong).size === item.wrong.length, `${w.tr}: ${item.wrong}`);
    assert.ok(item.wrong.every((x) => /^[a-zA-Z:-]+$/.test(x)), `${w.tr}: ${item.wrong}`);
  }
  assert.ok(n >= 300 && rich >= 120, `${n} Turkish words to ask, ${rich} with two or more wrong readings`);
});

test('read the script: every entry has a Latin reading, and the options are four different readings', async () => {
  const { readingLabel, scriptOptions } = await import('../js/exercises.js');
  for (const L of [uk, ja, ar]) {
    let n = 0;
    for (const w of L.words) {
      const own = readingLabel(L, w);
      assert.ok(own && /[a-z]/i.test(own), `${L.code} ${w.tr}: a reading in Latin letters (${own})`);
      if (w.tr.trim().split(/\s+/).length > 3 || n++ % 7) continue; // a sample is enough for the options
      const opts = scriptOptions(L, w);
      assert.equal(opts.length, 4, `${L.code} ${w.tr}`);
      assert.ok(opts.includes(w), `${L.code} ${w.tr}: the word is among them`);
      assert.equal(new Set(opts.map((o) => readingLabel(L, o))).size, 4, `${L.code} ${w.tr}: no two options read the same`);
    }
  }
  // Japanese gives rōmaji, Arabic its transliteration, Ukrainian the respelling.
  assert.equal(readingLabel(ja, ja.words.find((w) => w.tr === '百')), 'hyaku');
  assert.equal(readingLabel(ar, ar.words.find((w) => w.tr === 'مَرْحَبًا')), 'marḥaban');
  assert.equal(readingLabel(uk, uk.words.find((w) => w.tr === 'привіт')), 'prih-veet');
});
