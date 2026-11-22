// What a Japanese speech recogniser may write for a word of the course,
// besides the course's own spellings (`alt` in the vocabulary). Scoring
// (js/compare.js scoreWord, via the pack's spokenTargets and soundsLike)
// counts these as the right sound.
//
// SPELLINGS   the same word written another way: kanji for a kana headword
//             (かわいい 可愛い), okurigana or a kana mix (友達 友だち). Keyed by
//             word id; spoken, they score like the headword itself.
// COURSE      entries of the course that share a reading (鼻 and 花 are both
//             はな). Generated from the pack: tests/scoring.test.js checks it
//             and rewrites it with UPDATE_HOMOPHONES=1 npm test.
// EXTRA       common words outside the course that sound like a short word in
//             it (気 for 木, 芽 for 目). A recogniser can't tell them apart.
// Homophones score just under full marks, and the result says “same sound”.

export const SPELLINGS = {
  'かわいい': ['可愛い'],
  'すごい': ['凄い'],
  'できる': ['出来る'],
  'いただきます': ['頂きます'],
  'ありえない': ['あり得ない', '有り得ない'],
  'まっすぐ': ['真っ直ぐ', '真っすぐ'],
  'いい': ['良い'],
  '子供': ['子ども'],
  '友達': ['友だち'],
  '携帯': ['ケータイ'],
  '分かる': ['解る', '判る'],
  'つまらない': ['詰まらない'],
  'もらう': ['貰う'],
  'あげる': ['上げる'],
  'あります': ['有ります', '在ります'],
  'いる': ['居る'],
  'なる': ['成る'],
  'また': ['又'],
  'よく': ['良く'],
  'ほとんど': ['殆ど'],
  'ごめん': ['御免'],
  'ごめんなさい': ['御免なさい'],
  'いとこ': ['従兄弟', '従姉妹'],
  'みかん': ['蜜柑'],
  'ここ': ['此処'],
  'そこ': ['其処'],
  'どこ': ['何処'],
  'あなた': ['貴方', '貴女'],
  'いくら': ['幾ら'],
  'まだ': ['未だ'],
  'いつも': ['何時も'],
  'あまり': ['余り'],
  'ただいま': ['只今'],
  'はじめまして': ['初めまして'],
  'ありがとう': ['有難う', '有り難う'],
  'おやすみなさい': ['お休みなさい'],
  'すみません': ['済みません'],
  'さようなら': ['左様なら'],
  // Kana in the course, usually kanji in a transcript.
  'にんじん': ['人参'],
  'きゅうり': ['胡瓜'],
  'のど': ['喉'],
  'けが': ['怪我'],
  'けがをしました': ['怪我をしました'],
  'かばん': ['鞄'],
  'ゆでる': ['茹でる'],
  'めんどくさい': ['面倒くさい', '面倒臭い'],
  'わかんない': ['分かんない'],
  'いちご': ['苺'],
  'ぶどう': ['葡萄'],
  'りんご': ['林檎'],
  'すいか': ['西瓜'],
  'きのこ': ['茸'],
  'おじ': ['叔父', '伯父'],
  'おば': ['叔母', '伯母'],
  'うまい': ['美味い'],
  'かぶる': ['被る'],
};

// BEGIN COURSE (generated)
export const COURSE = {
  'あげる': ['あげる', '揚げる'],
  'かう': ['買う', '飼う'],
  'かえる': ['帰る', '変える'],
  'かぜ': ['風', '風邪'],
  'きる': ['着る', '切る'],
  'せき': ['咳', '席'],
  'はし': ['橋', '箸'],
  'はな': ['鼻', '花'],
};
// END COURSE

export const EXTRA = {
  'き': ['気', '樹', '黄'],
  'め': ['芽'],
  'は': ['葉', '刃'],
  'あめ': ['飴'],
  'にほん': ['二本'],
  'かわ': ['皮', '革', '河'],
  'はし': ['端'],
  'はな': ['華'],
  'あう': ['合う'],
  'かく': ['描く'],
  'みる': ['観る', '診る'],
  'きく': ['聴く', '効く'],
  'あし': ['脚'],
  'はる': ['貼る', '張る'],
  'あき': ['空き'],
  'かえる': ['変える', '替える'],
  'かう': ['飼う'],
  'まつ': ['松'],
  'ひく': ['引く'],
  'ふる': ['振る'],
  'ふく': ['拭く', '吹く'],
  'のる': ['載る'],
  'すむ': ['済む'],
  'はく': ['吐く'],
};
