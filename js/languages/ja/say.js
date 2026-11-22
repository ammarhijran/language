// What the voice should read when it would misread the text as written
// (never shown). Keyed by word id: a string is for the headword, or
// { tr, ex, pair } for the headword, its example sentence and its
// other-register form. See js/languages/common.js (pack.speech).
//
// Voices read kanji with their own default reading. For counters and words
// with two everyday readings that is often not the one the course teaches
// (二人 ふたり, not ににん; 開きます あきます, not ひらきます; 十分 じゅっぷん,
// not じゅうぶん), so only that token is written in kana here: voices use the
// other kanji to choose the pitch accent. Checked against kuromoji/UniDic and
// the course's own kana readings (tests/speech.test.js). An override that no
// longer matches its entry's kana (the sentence was rewritten) is ignored.
// Text without an entry here (Read & Listen lines, new sentences) gets the
// same treatment from its kana reading: see AMBIGUOUS in kana.js.
export const say = {
  "さようなら": { ex: "皆さん、さようなら。またあした。" },
  "十": { ex: "店は十時にあきます。" },
  "家族": { ex: "私の家族はよにんです。" },
  "子供": { ex: "子供がふたりいます。" },
  "明日": { tr: "あした", ex: "あしたの朝、電話します。" },
  "朝": { ex: "朝はなんじに起きますか。" },
  "どあ": { ex: "ドアがあいています。" },
  "薬": { ex: "この薬をいちにち三回飲んでください。" },
  "読む": { ex: "この漢字はなんと読みますか。" },
  "これ": { ex: "これはなんですか。" },
  "天気": { ex: "あしたの天気はどうですか。" },
  "雪": { ex: "冬は雪がたくさんふります。" },
  "思う": { ex: "あしたは雨だと思います。" },
  "晩ご飯": { ex: "今日の晩ご飯はなんですか。" },
  "帰る": { ex: "今日はしちじに帰ります。" },
  "店": { ex: "この店はなんじまであいていますか。" },
  "仕事": { ex: "あしたも仕事です。" },
  "休み": { ex: "あしたは休みです。" },
  "授業": { ex: "授業はくじに始まります。" },
  "お名前は何ですか": { tr: "お名前はなんですか。", ex: "「お名前はなんですか。」「田中です。」" },
  "趣味は何ですか": "趣味はなんですか。",
  "二人です": "ふたりです。",
  "おすすめは何ですか": { tr: "おすすめはなんですか。", ex: "今日のおすすめはなんですか。" },
  "次の角を右に曲がってください": "次のかどを右に曲がってください。",
  "何時にしますか": { tr: "なんじにしますか。", pair: "なんじにする？", ex: "「なんじにしますか。」「しちじはどうですか。」" },
  "少し遅れます": { ex: "すみません、じゅっぷんぐらい遅れます。" },
  "ではまた明日": { tr: "では、またあした。", pair: "じゃあ、またあしたね。" },
  "それは残念ですね": { ex: "「あしたのコンサート、中止になりました。」「それは残念ですね。」" },
  "もう一度お願いします": { pair: "もういっかい言って。" },
  "わかった": { ex: "「しちじに駅ね。」「わかった！」" },
  "あのさ": { ex: "あのさ、あしたひま？" },
  "明日雨だって": { pair: "あしたは雨だそうです。" },
  "雨降るかな": { pair: "雨はふるでしょうか。" },
  "一日": { tr: "ついたち", ex: "毎月ついたちに家賃を払います。" },
  "着る": { ex: "あしたは何を着ますか。" },
  "天気予報": { ex: "天気予報によると、あしたは雨だそうです。" },
  "降る": { tr: "ふる", ex: "雪がふっています。" },
  "建物": { ex: "あの高い建物はなんですか。" },
  "辛い": { tr: "からい", ex: "からい料理は大丈夫ですか。" },
  "これは日本語で何と言いますか": { tr: "これは日本語でなんと言いますか。", pair: "これ、日本語でなんて言うの？", ex: "「傘」は英語でなんと言いますか。" },
  "この漢字は何と読みますか": { tr: "この漢字はなんと読みますか。", ex: "この駅の名前はなんと読みますか。" },
  "これは何と書いてありますか": { tr: "これはなんと書いてありますか。", pair: "これ、なんて書いてあるの？", ex: "すみません、この紙にはなんと書いてありますか。" },
  "兄弟はいますか": { ex: "「兄弟はいますか。」「いいえ、ひとりっ子です。」" },
  "結婚しています": { ex: "結婚していて、子供がふたりいます。" },
  "うまくいくといいですね": { ex: "あしたの面接、うまくいくといいですね。" },
  "この薬は一日何回飲みますか": "この薬はいちにち何回飲みますか。",
  "おけ": { ex: "「あした10時でいい？」「おけ！」" },
  "ちぇっくあうとは何時ですか": { tr: "チェックアウトはなんじですか。", pair: "チェックアウト、なんじだっけ？", ex: "「チェックアウトはなんじですか。」「十時でございます。」" },
  "朝食は何時からですか": { tr: "朝食はなんじからですか。", pair: "朝ご飯、なんじから？" },
  "終電は何時ですか": { tr: "終電はなんじですか。", pair: "終電、なんじ？" },
  "明日はお休みをいただきます": "あしたはお休みをいただきます。",
};

// Sentences that belong to no word (grammar examples), keyed by the text as written.
export const saySentences = {
  "今、何時ですか。": "今、なんじですか。",
  "何時に帰りますか。": "なんじに帰りますか。",
  "このカレーは辛くないです。": "このカレーはからくないです。",
  "四人です。": "よにんです。",
  "妹は二十歳です。": "妹ははたちです。",
  "一人で来ました。": "ひとりで来ました。",
  "会議は四時からです。": "会議はよじからです。",
  "雨が降っています。": "雨がふっています。",
  "何名様ですか。": "なんめい様ですか。",
  "明日は休みなんだ。": "あしたは休みなんだ。",
  "田中さん、明日来ないって。": "田中さん、あした来ないって。",
};
