import { test } from 'node:test';
import assert from 'node:assert/strict';
import { syllabify, analyze, splitWords } from '../js/languages/tr/phonetics.js';

test('syllabify follows Turkish rules', () => {
  const cases = {
    merhaba: ['mer', 'ha', 'ba'],
    ekmek: ['ek', 'mek'],
    Türkçe: ['Türk', 'çe'],
    kontrol: ['kont', 'rol'],
    saat: ['sa', 'at'],
    İstanbul: ['İs', 'tan', 'bul'],
    affedersiniz: ['af', 'fe', 'der', 'si', 'niz'],
    anlamıyorum: ['an', 'la', 'mı', 'yo', 'rum'],
    çay: ['çay'],
    o: ['o'],
  };
  for (const [word, expected] of Object.entries(cases)) {
    assert.deepEqual(syllabify(word), expected, word);
  }
});

test('IPA and stress', () => {
  assert.equal(analyze('merhaba', 1).ipa, 'ˈmeɾ.ha.ba');
  assert.equal(analyze('kitap').ipa, 'kiˈtap');
  assert.equal(analyze('çocuk').ipa, 'tʃoˈdʒuk');
  assert.equal(analyze('şeker').ipa, 'ʃeˈkeɾ');
  assert.equal(analyze('İstanbul', 2).ipa, 'isˈtan.bul');
  assert.equal(analyze('masa', 0).ipa, 'ma.sa');
  assert.equal(analyze('kız').ipa, 'kɯz');
  assert.equal(analyze('göz').ipa, 'ɡøz');
  assert.equal(analyze('üç').ipa, 'ytʃ');
});

test('soft g (ğ) handling', () => {
  assert.equal(analyze('dağ').ipa, 'daː');
  assert.equal(analyze('yağmur').ipa, 'jaːˈmuɾ');
  assert.equal(analyze('değil').ipa, 'deˈjil');
  assert.equal(analyze('ağaç').ipa, 'aˈatʃ');
  assert.equal(analyze('öğretmen').ipa, 'øː.ɾetˈmen');
});

test('respelling for English speakers', () => {
  assert.equal(analyze('merhaba', 1).respell, 'MEHR-hah-bah');
  assert.equal(analyze('çay').respell, 'chai');
  assert.equal(analyze('günaydın').respell, 'gew-nai-DUHN');
  assert.equal(analyze('teşekkürler').respell, 'teh-shehk-kewr-LEHR');
  assert.equal(analyze('kahve').respell, 'kah-VEH');
  assert.equal(analyze('eğlence').respell, 'ay-lehn-JEH');
});

test('phrases are split into words without stress marks', () => {
  assert.deepEqual(splitWords("Türkiye'de, iyi akşamlar!"), ['Türkiyede', 'iyi', 'akşamlar']);
  const a = analyze('iyi akşamlar');
  assert.equal(a.words.length, 2);
  assert.equal(a.stressMarked, false);
  assert.equal(a.ipa, 'i.ji ak.ʃam.laɾ');
});

test('circumflex palatalises k and g', () => {
  assert.equal(analyze('rüzgâr').ipa, 'ɾyzˈɟaɾ');
});
