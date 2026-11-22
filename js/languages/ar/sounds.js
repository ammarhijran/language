// Arabic alphabet, pronunciation tips and minimal pairs.
// `upper` is the letter, `lower` its name (shown in Latin letters).

const L = (letter, name, ipa, hint, ex, special = false) => ({ key: letter, upper: letter, lower: name, lowerIsName: true, ipa, hint, ex, special });

export const alphabet = [
  L('ا', 'alif', 'aː', 'long “aa”; also a seat for hamza (أ)', ['أَنَا', 'I']),
  L('ب', 'bāʾ', 'b', 'as in English', ['بَاب', 'door']),
  L('ت', 'tāʾ', 't', 'as in English', ['تَمْر', 'dates']),
  L('ث', 'thāʾ', 'θ', '“th” in “think”', ['ثَلَاثَة', 'three'], true),
  L('ج', 'jīm', 'd͡ʒ', '“j” in “jam” (a hard “g” in Egypt)', ['جَمَل', 'camel']),
  L('ح', 'ḥāʾ', 'ħ', 'a strong, breathy “h” from the throat — like fogging up a mirror', ['حَلِيب', 'milk'], true),
  L('خ', 'khāʾ', 'x', '“ch” in Scottish “loch”', ['خُبْز', 'bread'], true),
  L('د', 'dāl', 'd', 'as in English', ['دَجَاج', 'chicken']),
  L('ذ', 'dhāl', 'ð', '“th” in “this”', ['ذَهَب', 'gold'], true),
  { ...L('ر', 'rāʾ', 'r', 'a tapped or rolled r', ['رَأْس', 'head'], true), noNote: true },
  L('ز', 'zāy', 'z', 'as in English', ['زَيْت', 'oil']),
  L('س', 'sīn', 's', 'as in English', ['سَمَك', 'fish']),
  L('ش', 'shīn', 'ʃ', '“sh” in “shoe”', ['شَمْس', 'sun']),
  L('ص', 'ṣād', 'sˤ', 'an “emphatic” s: tongue low and pulled back, which darkens the vowels', ['صَبَاح', 'morning'], true),
  L('ض', 'ḍād', 'dˤ', 'emphatic d — Arabic is called “the language of ḍād”', ['ضَيْف', 'guest'], true),
  L('ط', 'ṭāʾ', 'tˤ', 'emphatic t', ['طَبِيب', 'doctor'], true),
  L('ظ', 'ẓāʾ', 'ðˤ', 'emphatic “th” as in “this”', ['ظُهْر', 'noon'], true),
  L('ع', 'ʿayn', 'ʕ', 'a voiced squeeze deep in the throat — no English equivalent', ['عَيْن', 'eye'], true),
  L('غ', 'ghayn', 'ɣ', 'like a gargled French r', ['غُرْفَة', 'room'], true),
  L('ف', 'fāʾ', 'f', 'as in English', ['فَم', 'mouth']),
  L('ق', 'qāf', 'q', 'a “k” made further back, against the uvula', ['قَلْب', 'heart'], true),
  L('ك', 'kāf', 'k', 'as in English', ['كِتَاب', 'book']),
  L('ل', 'lām', 'l', 'as in English', ['لَيْل', 'night']),
  L('م', 'mīm', 'm', 'as in English', ['مَاء', 'water']),
  L('ن', 'nūn', 'n', 'as in English', ['نَهْر', 'river']),
  L('ه', 'hāʾ', 'h', 'always pronounced, even at the end of a word', ['هُنَا', 'here']),
  L('و', 'wāw', 'w · uː', '“w”, or a long “oo”', ['وَرْدَة', 'rose']),
  L('ي', 'yāʾ', 'j · iː', '“y”, or a long “ee”', ['يَد', 'hand']),
  L('ء', 'hamza', 'ʔ', 'a glottal stop, the catch in “uh-oh”', ['سَمَاء', 'sky'], true),
];

export const soundTips = [
  {
    id: 'emphatics',
    title: 'Emphatic letters ص ض ط ظ',
    ipa: 'sˤ dˤ tˤ ðˤ',
    body: 'These are said with the back of the tongue pulled toward the throat, which makes the sound — and the vowels around it — deeper and darker. Compare سَيْف (sword) with صَيْف (summer).',
    examples: [['سَيْف', 'sword'], ['صَيْف', 'summer'], ['تِين', 'figs'], ['طِين', 'clay']],
  },
  {
    id: 'throat',
    title: 'ع and ح — the throat letters',
    ipa: 'ʕ · ħ',
    body: 'ح is a strong, breathy h made by tightening the throat (as if fogging up a glass). ع is the same place with voice: a tight, squeezed sound. Both are new for English speakers — exaggerate at first.',
    examples: [['حَلِيب', 'milk'], ['عَيْن', 'eye'], ['مَرْحَبًا', 'hello'], ['عَرَبِيّ', 'Arabic']],
  },
  {
    id: 'kh-gh',
    title: 'خ and غ',
    ipa: 'x · ɣ',
    body: 'خ is the “ch” of Scottish “loch” or German “Bach”. غ is its voiced partner, close to a French gargled r.',
    examples: [['خُبْز', 'bread'], ['خَيْر', 'good'], ['غُرْفَة', 'room'], ['غَدًا', 'tomorrow']],
  },
  {
    id: 'q-k',
    title: 'ق is not ك',
    ipa: 'q · k',
    body: 'ق is made much further back than k, against the uvula — it sounds deeper. قَلْب is “heart”, but كَلْب is “dog”.',
    examples: [['قَلْب', 'heart'], ['كَلْب', 'dog'], ['قَمَر', 'moon'], ['كِتَاب', 'book']],
  },
  {
    id: 'th-dh',
    title: 'ث and ذ',
    ipa: 'θ · ð',
    body: 'ث is the “th” of “think”; ذ is the “th” of “this”. (In many dialects they turn into t/s and d/z.)',
    examples: [['ثَلَاثَة', 'three'], ['هَذَا', 'this'], ['ذَهَب', 'gold'], ['لَذِيذ', 'delicious']],
  },
  {
    id: 'length',
    title: 'Short and long vowels',
    ipa: 'a · aː',
    body: 'Short vowels are small marks above or below letters (ـَ a, ـِ i, ـُ u) and are usually left out in everyday writing. Long vowels are letters (ا ā, ي ī, و ū) and last about twice as long: جَمَل (camel) vs جَمَال (beauty).',
    examples: [['جَمَل', 'camel'], ['جَمَال', 'beauty'], ['كِتَاب', 'book'], ['سُوق', 'market']],
  },
  {
    id: 'shadda',
    title: 'Shadda: doubled consonants',
    body: 'The mark ـّ (shadda) doubles a consonant — hold it longer. دَرَسَ (he studied) vs دَرَّسَ (he taught).',
    examples: [['دَرَسَ', 'he studied'], ['دَرَّسَ', 'he taught'], ['سُكَّر', 'sugar'], ['مُعَلِّم', 'teacher']],
  },
  {
    id: 'sun-moon',
    title: 'Sun and moon letters',
    body: 'The article الـ (al-) keeps its l before “moon letters” (الْقَمَر al-qamar) but merges into “sun letters” like ش ت د ر س ن: الشَّمْس is ash-shams, not al-shams.',
    examples: [['الْقَمَر', 'the moon'], ['الشَّمْس', 'the sun'], ['السَّبْت', 'Saturday'], ['الْيَوْم', 'today']],
  },
];

export const minimalPairs = [
  { contrast: 'ق / ك', pairs: [['قَلْب', 'heart', 'كَلْب', 'dog'], ['قُلْ', 'say!', 'كُلْ', 'eat!']] },
  { contrast: 'س / ص', pairs: [['سَيْف', 'sword', 'صَيْف', 'summer'], ['سَارَ', 'he walked', 'صَارَ', 'he became']] },
  { contrast: 'ت / ط', pairs: [['تِين', 'figs', 'طِين', 'clay'], ['تَابَ', 'he repented', 'طَابَ', 'it became pleasant']] },
  { contrast: 'د / ض', pairs: [['دَلَّ', 'he showed the way', 'ضَلَّ', 'he lost his way']] },
  { contrast: 'ح / ه', pairs: [['حَرَم', 'sanctuary', 'هَرَم', 'pyramid'], ['سَاحِر', 'magician', 'سَاهِر', 'staying up late']] },
  { contrast: 'ح / خ', pairs: [['حَال', 'condition', 'خَال', 'maternal uncle'], ['حَلّ', 'solution', 'خَلّ', 'vinegar']] },
  { contrast: 'غ / خ', pairs: [['غَيْر', 'other than', 'خَيْر', 'good']] },
  { contrast: 'ع / ء', pairs: [['عَمَل', 'work', 'أَمَل', 'hope'], ['عَلَم', 'flag', 'أَلَم', 'pain'], ['سَعَلَ', 'he coughed', 'سَأَلَ', 'he asked']] },
  { contrast: 'short / long vowel', pairs: [['جَمَل', 'camel', 'جَمَال', 'beauty'], ['مَطَر', 'rain', 'مَطَار', 'airport'], ['كَتَبَ', 'he wrote', 'كَاتَبَ', 'he wrote to']] },
  { contrast: 'single / double', pairs: [['دَرَسَ', 'he studied', 'دَرَّسَ', 'he taught'], ['حَمَام', 'pigeons', 'حَمَّام', 'bathroom']] },
];
