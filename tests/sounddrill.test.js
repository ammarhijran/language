// "Practise this sound": the course's words that contain the sound of a tip.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languages } from './all-languages.js';
import { hasSound, soundWords, drillableTips } from '../js/sounddrill.js';

const { tr, uk, ja, ar } = languages;
const w = (lang, tr_, extra = {}) => ({ tr: tr_, en: 'x', ...extra });

test('every drillable tip is a real sound tip and finds enough single words', () => {
  for (const lang of Object.values(languages)) {
    const tips = new Set(lang.soundTips.map((t) => t.id));
    assert.ok(drillableTips(lang).length >= 5, `${lang.code}: most tips can be drilled`);
    for (const id of drillableTips(lang)) {
      assert.ok(tips.has(id), `${lang.code}: ${id} is a sound tip`);
      const words = soundWords(lang, id);
      assert.equal(words.length, 8, `${lang.code}/${id}: eight words`);
      assert.equal(new Set(words.map((x) => x.id)).size, 8);
      for (const x of words) {
        assert.ok(hasSound(lang, id, x), `${lang.code}/${id}: ${x.tr}`);
        assert.ok(!/\s/.test(lang.code === 'ja' ? x.kana : x.tr), `${lang.code}/${id}: one word, not a phrase: ${x.tr}`);
        assert.equal(lang.byId(x.id), x, 'a word of the course (the drill finds it by id)');
      }
    }
    // Tips about rhythm, stress or pitch have no letters to look for.
    assert.deepEqual(soundWords(lang, 'no-such-tip'), []);
  }
  for (const [lang, id] of [[tr, 'stress'], [tr, 'harmony'], [uk, 'stress'], [ja, 'pitch'], [ja, 'mora']]) assert.deepEqual(soundWords(lang, id), [], `${lang.code}/${id}`);
});

test('the sound is read off the spelling', () => {
  assert.ok(hasSound(tr, 'dotless-i', w(tr, 'Kız')) && !hasSound(tr, 'dotless-i', w(tr, 'İyi')), 'Turkish I / İ are told apart');
  assert.ok(hasSound(tr, 'double', w(tr, 'anne')) && !hasSound(tr, 'double', w(tr, 'ane')));
  assert.ok(hasSound(tr, 'double', w(tr, 'saat')) === false, 'two vowels are not a double consonant');
  // Ukrainian в before a consonant or at the end of a word; a voiced consonant at the end.
  for (const x of ['вчора', 'Київ', 'завтра']) assert.ok(hasSound(uk, 'v-w', w(uk, x)), x);
  for (const x of ['вода', 'ви', 'нове', 'здоров’я']) assert.ok(!hasSound(uk, 'v-w', w(uk, x)), x);
  assert.ok(hasSound(uk, 'voiced', w(uk, 'хліб')) && !hasSound(uk, 'voiced', w(uk, 'хліба')));
  assert.ok(hasSound(uk, 'apostrophe', w(uk, 'м’ясо')) && hasSound(uk, 'apostrophe', w(uk, "м'ясо")));
  // Japanese is read from the kana: long vowels, but not a verb's final う; whispered i / u.
  const j = (kana, en = 'x') => ({ tr: kana, kana, en });
  for (const x of ['がっこう', 'コーヒー', 'おおきい', 'せんせい', 'くうこう']) assert.ok(hasSound(ja, 'long', j(x)), x);
  for (const x of ['いえ', 'あおい', 'かお']) assert.ok(!hasSound(ja, 'long', j(x)), x);
  assert.ok(!hasSound(ja, 'long', j('おもう', 'to think')), '思う: o-mo-u, three beats');
  assert.ok(hasSound(ja, 'long', j('すもう', 'sumo')), '相撲 is sumō');
  for (const x of ['すき', 'ひと', 'あした', 'です', 'キップ']) assert.ok(hasSound(ja, 'devoicing', j(x)), x);
  for (const x of ['すいか', 'こんにちは', 'しごと']) assert.ok(!hasSound(ja, 'devoicing', j(x)), x);
  assert.ok(hasSound(ja, 'double', j('きって')) && hasSound(ja, 'double', j('ベッド')) && !hasSound(ja, 'double', j('きて')));
  // Arabic: by letter, by the shadda mark, by the article.
  assert.ok(hasSound(ar, 'emphatics', w(ar, 'صَيْف')) && !hasSound(ar, 'emphatics', w(ar, 'سَيْف')));
  assert.ok(hasSound(ar, 'shadda', w(ar, 'سُكَّر')) && !hasSound(ar, 'shadda', w(ar, 'كِتَاب')));
  assert.ok(hasSound(ar, 'sun-moon', w(ar, 'الشَّمْس')) && !hasSound(ar, 'sun-moon', w(ar, 'شَمْس')));
  assert.ok(hasSound(ar, 'q-k', w(ar, 'قَلْب')) && !hasSound(ar, 'q-k', w(ar, 'كَلْب')));
});

test('the learner’s own words come first', () => {
  const all = soundWords(tr, 'soft-g', { n: 999 });
  assert.ok(all.length > 12);
  const mine = new Set(all.slice(-3).map((x) => x.id));
  const picked = soundWords(tr, 'soft-g', { learned: (x) => mine.has(x.id), random: () => 0.5 });
  assert.deepEqual(new Set(picked.slice(0, 3).map((x) => x.id)), mine);
  assert.deepEqual(picked.slice(3).map((x) => x.id), all.slice(0, 5).map((x) => x.id), 'then the course order');
  assert.equal(soundWords(tr, 'soft-g', { n: 3 }).length, 3);
});
