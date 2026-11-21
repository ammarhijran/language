// Extra everyday words, phrases and "talk like a local" entries, in the
// internal word format (see js/languages/common.js). Written by an author and
// checked by a native-level editor in the content workflow; edit freely.
export const categories = [
  {
    "id": "verbs2",
    "name": "More Everyday Verbs",
    "native": "よく使う動詞",
    "emoji": "🔁",
    "group": "words"
  },
  {
    "id": "daily",
    "name": "Daily Routine",
    "native": "毎日の生活",
    "emoji": "⏰",
    "group": "words"
  },
  {
    "id": "feelings",
    "name": "Feelings & Opinions",
    "native": "気持ちと意見",
    "emoji": "💬",
    "group": "words"
  },
  {
    "id": "shopping",
    "name": "Shopping & Money",
    "native": "買い物とお金",
    "emoji": "🛒",
    "group": "words"
  },
  {
    "id": "connectors",
    "name": "Adverbs & Connectors",
    "native": "副詞とつなぎの言葉",
    "emoji": "🔗",
    "group": "words"
  },
  {
    "id": "work",
    "name": "Work & Study",
    "native": "仕事と勉強",
    "emoji": "💼",
    "group": "words"
  },
  {
    "id": "p-smalltalk",
    "name": "Small Talk",
    "native": "世間話",
    "emoji": "🙂",
    "group": "phrases"
  },
  {
    "id": "p-cafe",
    "name": "Café & Restaurant",
    "native": "カフェ・レストラン",
    "emoji": "☕",
    "group": "phrases"
  },
  {
    "id": "p-shop",
    "name": "Shopping",
    "native": "買い物",
    "emoji": "🛍️",
    "group": "phrases"
  },
  {
    "id": "p-directions",
    "name": "Getting Around",
    "native": "交通と道案内",
    "emoji": "🚌",
    "group": "phrases"
  },
  {
    "id": "p-plans",
    "name": "Making Plans",
    "native": "予定を立てる",
    "emoji": "📅",
    "group": "phrases"
  },
  {
    "id": "p-reactions",
    "name": "Reactions & Feelings",
    "native": "あいづちと気持ち",
    "emoji": "😮",
    "group": "phrases"
  },
  {
    "id": "p-help",
    "name": "Problems & Help",
    "native": "困ったとき",
    "emoji": "🆘",
    "group": "phrases"
  },
  {
    "id": "p-polite",
    "name": "Polite Requests",
    "native": "丁寧なお願い",
    "emoji": "🙏",
    "group": "phrases"
  },
  {
    "id": "everyday",
    "name": "Everyday Speech",
    "native": "ふだんの話し言葉",
    "emoji": "🗣️",
    "group": "talk"
  },
  {
    "id": "slang",
    "name": "Slang & Expressions",
    "native": "スラングとよく使う表現",
    "emoji": "😎",
    "group": "talk"
  }
];

export const vocab = [
  {
    "tr": "思う",
    "en": "to think",
    "cat": "verbs2",
    "kana": "おもう",
    "rom": "omou",
    "ex": [
      "明日は雨だと思います。",
      "I think it will rain tomorrow."
    ],
    "note": "Give opinions with 〜と思います (I think that…). It also softens what you say."
  },
  {
    "tr": "言う",
    "en": "to say",
    "cat": "verbs2",
    "kana": "いう",
    "ex": [
      "もう一度言ってください。",
      "Please say it once more."
    ],
    "note": "In speech it sounds like ゆう (yū). 日本語で何と言いますか？ = How do you say it in Japanese?"
  },
  {
    "tr": "なる",
    "en": "to become",
    "cat": "verbs2",
    "kana": "なる",
    "ex": [
      "もうすぐ春になります。",
      "It will soon be spring."
    ],
    "note": "Nouns take に: 先生になる (become a teacher). い-adjectives change to 〜く: 寒くなる (get cold)."
  },
  {
    "tr": "いる",
    "en": "to be; to exist (people, animals)",
    "cat": "verbs2",
    "kana": "いる",
    "ex": [
      "今、どこにいますか。",
      "Where are you now?"
    ],
    "note": "For people and animals. For things and plants use ある (あります): 猫がいる, but 本がある."
  },
  {
    "tr": "できる",
    "en": "can; to be able to",
    "cat": "verbs2",
    "kana": "できる",
    "ex": [
      "日本語が少しできます。",
      "I can speak a little Japanese."
    ],
    "note": "The skill takes が: 料理ができる (can cook). With する-verbs it replaces する: 勉強できる."
  },
  {
    "tr": "知る",
    "en": "to know",
    "cat": "verbs2",
    "kana": "しる",
    "ex": [
      "その店を知っていますか。",
      "Do you know that shop?"
    ],
    "note": "“I know” is 知っています, but “I don’t know” is 知りません — never 知っていません."
  },
  {
    "tr": "持つ",
    "en": "to hold; to have; to carry",
    "cat": "verbs2",
    "kana": "もつ",
    "ex": [
      "傘を持っていますか。",
      "Do you have an umbrella?"
    ],
    "note": "持っています = I have it (with me, or I own it)."
  },
  {
    "tr": "使う",
    "en": "to use",
    "cat": "verbs2",
    "kana": "つかう",
    "ex": [
      "このパソコンを使ってもいいですか。",
      "May I use this computer?"
    ]
  },
  {
    "tr": "作る",
    "en": "to make; to cook",
    "cat": "verbs2",
    "kana": "つくる",
    "ex": [
      "母は毎朝お弁当を作ります。",
      "My mother makes a packed lunch every morning."
    ]
  },
  {
    "tr": "会う",
    "en": "to meet; to see (someone)",
    "cat": "verbs2",
    "kana": "あう",
    "ex": [
      "明日、友達に会います。",
      "I’m meeting a friend tomorrow."
    ],
    "note": "The person takes に (or と), never を: 友達に会う."
  },
  {
    "tr": "待つ",
    "en": "to wait",
    "cat": "verbs2",
    "kana": "まつ",
    "ex": [
      "ちょっと待ってください。",
      "Please wait a moment."
    ],
    "note": "What you wait for takes を: バスを待つ (wait for the bus)."
  },
  {
    "tr": "入る",
    "en": "to enter; to go in",
    "cat": "verbs2",
    "kana": "はいる",
    "ex": [
      "どうぞ、入ってください。",
      "Please come in."
    ],
    "note": "Looks like a る-verb but conjugates like an う-verb: 入ります, 入って. The place takes に: 店に入る."
  },
  {
    "tr": "出る",
    "en": "to leave; to go out; to come out",
    "cat": "verbs2",
    "kana": "でる",
    "ex": [
      "八時に家を出ます。",
      "I leave home at eight."
    ],
    "note": "The place you leave takes を: 家を出る. 電話に出る = to answer the phone."
  },
  {
    "tr": "開ける",
    "en": "to open (something)",
    "cat": "verbs2",
    "kana": "あける",
    "ex": [
      "窓を開けてもいいですか。",
      "May I open the window?"
    ],
    "note": "You open something: 窓を開ける. When it opens by itself: 開く (あく) — ドアが開く."
  },
  {
    "tr": "閉める",
    "en": "to close (something)",
    "cat": "verbs2",
    "kana": "しめる",
    "ex": [
      "ドアを閉めてください。",
      "Please close the door."
    ],
    "note": "When something closes by itself: 閉まる (しまる) — 店が閉まる (the shop closes)."
  },
  {
    "tr": "始める",
    "en": "to start; to begin (something)",
    "cat": "verbs2",
    "kana": "はじめる",
    "ex": [
      "去年、日本語の勉強を始めました。",
      "I started learning Japanese last year."
    ],
    "note": "You start something: 仕事を始める. When it starts by itself: 始まる — 授業が始まる (class begins)."
  },
  {
    "tr": "終わる",
    "en": "to end; to finish",
    "cat": "verbs2",
    "kana": "おわる",
    "ex": [
      "仕事は六時に終わります。",
      "Work finishes at six."
    ]
  },
  {
    "tr": "忘れる",
    "en": "to forget; to leave behind",
    "cat": "verbs2",
    "kana": "わすれる",
    "ex": [
      "傘を忘れました。",
      "I forgot my umbrella."
    ],
    "note": "Also for leaving something behind: 電車に傘を忘れた = I left my umbrella on the train."
  },
  {
    "tr": "歩く",
    "en": "to walk",
    "cat": "verbs2",
    "kana": "あるく",
    "ex": [
      "駅まで歩いて五分です。",
      "It’s a five-minute walk to the station."
    ],
    "note": "歩いて行く = to go on foot."
  },
  {
    "tr": "乗る",
    "en": "to ride; to get on",
    "cat": "verbs2",
    "kana": "のる",
    "ex": [
      "毎朝、電車に乗ります。",
      "I take the train every morning."
    ],
    "note": "The vehicle takes に, not を: バスに乗る. Getting off: 降りる (おりる) — 電車を降りる."
  },
  {
    "tr": "住む",
    "en": "to live (reside)",
    "cat": "verbs2",
    "kana": "すむ",
    "ex": [
      "東京に住んでいます。",
      "I live in Tokyo."
    ],
    "note": "Use the ている form for where you live now: 住んでいます. The place takes に."
  },
  {
    "tr": "遊ぶ",
    "en": "to play; to hang out",
    "cat": "verbs2",
    "kana": "あそぶ",
    "ex": [
      "週末、友達と遊びました。",
      "I hung out with friends at the weekend."
    ],
    "note": "Not for sports or instruments: サッカーをする (play football), ピアノを弾く (ひく, play piano)."
  },
  {
    "tr": "もらう",
    "en": "to receive; to get",
    "cat": "verbs2",
    "kana": "もらう",
    "ex": [
      "友達にプレゼントをもらいました。",
      "I got a present from a friend."
    ],
    "note": "The giver takes に or から. Humble, polite version: いただく.",
    "pair": {
      "tr": "いただく",
      "reg": "formal",
      "en": "to receive (humble)",
      "kana": "いただく"
    }
  },
  {
    "tr": "あげる",
    "en": "to give",
    "cat": "verbs2",
    "kana": "あげる",
    "ex": [
      "弟に本をあげました。",
      "I gave my younger brother a book."
    ],
    "note": "For giving to others. When someone gives to you, use くれる: 友達がくれた (my friend gave it to me)."
  },
  {
    "tr": "教える",
    "en": "to teach; to tell",
    "cat": "verbs2",
    "kana": "おしえる",
    "ex": [
      "電話番号を教えてください。",
      "Could you tell me your phone number?"
    ],
    "note": "Also “tell” for information: 道を教えてください = Please tell me the way."
  },
  {
    "tr": "起きる",
    "en": "to wake up; to get up",
    "cat": "daily",
    "kana": "おきる",
    "ex": [
      "毎朝六時に起きます。",
      "I get up at six every morning."
    ],
    "note": "Covers both waking up and getting out of bed. The opposite is 寝る (to go to bed)."
  },
  {
    "tr": "顔を洗う",
    "en": "to wash one’s face",
    "cat": "daily",
    "kana": "かお を あらう",
    "ex": [
      "起きてから、顔を洗います。",
      "After I get up, I wash my face."
    ]
  },
  {
    "tr": "歯磨き",
    "en": "brushing your teeth",
    "cat": "daily",
    "kana": "はみがき",
    "ex": [
      "寝る前に歯を磨きます。",
      "I brush my teeth before bed."
    ],
    "note": "歯磨きをする or 歯を磨く = to brush your teeth. 歯磨き粉 (はみがきこ) = toothpaste.",
    "alt": [
      "歯みがき"
    ]
  },
  {
    "tr": "シャワーを浴びる",
    "en": "to take a shower",
    "cat": "daily",
    "kana": "シャワー を あびる",
    "ex": [
      "毎朝シャワーを浴びます。",
      "I take a shower every morning."
    ],
    "note": "The verb is 浴びる (to bathe in; be showered with). Many people in Japan bathe in the evening rather than the morning."
  },
  {
    "tr": "お風呂に入る",
    "en": "to take a bath",
    "cat": "daily",
    "kana": "おふろ に はいる",
    "ex": [
      "毎晩お風呂に入ります。",
      "I take a bath every night."
    ],
    "note": "Literally “enter the bath”. You wash before getting in — the tub is only for soaking."
  },
  {
    "tr": "着替える",
    "en": "to get changed",
    "cat": "daily",
    "kana": "きがえる",
    "ex": [
      "家に帰ったら、すぐ着替えます。",
      "When I get home, I get changed right away."
    ]
  },
  {
    "tr": "昼ご飯",
    "en": "lunch",
    "cat": "daily",
    "kana": "ひるごはん",
    "ex": [
      "一緒に昼ご飯を食べませんか。",
      "Would you like to have lunch together?"
    ],
    "note": "Also just お昼 (おひる) or ランチ. Formal: 昼食 (ちゅうしょく)."
  },
  {
    "tr": "晩ご飯",
    "en": "dinner; evening meal",
    "cat": "daily",
    "kana": "ばんごはん",
    "ex": [
      "今日の晩ご飯は何ですか。",
      "What’s for dinner tonight?"
    ],
    "note": "Also 夕ご飯 (ゆうごはん) or casual 夜ご飯 (よるごはん). Formal: 夕食 (ゆうしょく)."
  },
  {
    "tr": "お弁当",
    "en": "packed lunch; bento",
    "cat": "daily",
    "kana": "おべんとう",
    "ex": [
      "コンビニでお弁当を買いました。",
      "I bought a bento at the convenience store."
    ],
    "note": "At the till you may hear 温めますか？ — “Shall I heat it up?”"
  },
  {
    "tr": "出かける",
    "en": "to go out",
    "cat": "daily",
    "kana": "でかける",
    "ex": [
      "今から出かけます。",
      "I’m heading out now."
    ]
  },
  {
    "tr": "行ってきます",
    "en": "I’m off! (said when leaving home)",
    "cat": "daily",
    "kana": "いって きます",
    "ex": [
      "じゃあ、行ってきます！",
      "Right, I’m off!"
    ],
    "note": "Whoever stays replies 行ってらっしゃい (see you later / have a good day).",
    "pair": {
      "tr": "行ってまいります",
      "reg": "formal",
      "en": "I’m off (humble, e.g. at work)",
      "kana": "いって まいります"
    }
  },
  {
    "tr": "ただいま",
    "en": "I’m home!",
    "cat": "daily",
    "kana": "ただいま",
    "note": "Said as you come home. The reply is おかえり (casual) or おかえりなさい (welcome back)."
  },
  {
    "tr": "帰る",
    "en": "to go home; to return",
    "cat": "daily",
    "kana": "かえる",
    "ex": [
      "今日は七時に帰ります。",
      "I’m going home at seven today."
    ],
    "note": "Looks like a る-verb but conjugates like an う-verb: 帰ります, 帰って. 国に帰る = go back to your country."
  },
  {
    "tr": "通勤",
    "en": "commute (to work)",
    "cat": "daily",
    "kana": "つうきん",
    "ex": [
      "通勤に一時間かかります。",
      "My commute takes an hour."
    ],
    "note": "通勤する = to commute to work. For students going to school: 通学 (つうがく)."
  },
  {
    "tr": "料理する",
    "en": "to cook",
    "cat": "daily",
    "kana": "りょうり する",
    "ex": [
      "週末はよく料理します。",
      "I often cook at the weekend."
    ],
    "note": "料理 alone means cooking or a dish: 日本料理 = Japanese food."
  },
  {
    "tr": "掃除する",
    "en": "to clean (a room or house)",
    "cat": "daily",
    "kana": "そうじ する",
    "ex": [
      "日曜日に部屋を掃除します。",
      "I clean my room on Sundays."
    ]
  },
  {
    "tr": "洗濯する",
    "en": "to do the laundry",
    "cat": "daily",
    "kana": "せんたく する",
    "ex": [
      "天気がいいから、洗濯します。",
      "The weather’s nice, so I’ll do the laundry."
    ],
    "note": "洗濯物 (せんたくもの) = the laundry itself. 洗濯機 (せんたくき) = washing machine."
  },
  {
    "tr": "散歩する",
    "en": "to go for a walk",
    "cat": "daily",
    "kana": "さんぽ する",
    "ex": [
      "夕方、犬と散歩します。",
      "In the evening I go for a walk with my dog."
    ]
  },
  {
    "tr": "寝坊する",
    "en": "to oversleep",
    "cat": "daily",
    "kana": "ねぼう する",
    "ex": [
      "寝坊して、電車に乗り遅れました。",
      "I overslept and missed the train."
    ]
  },
  {
    "tr": "ゴミを出す",
    "en": "to take out the rubbish",
    "cat": "daily",
    "kana": "ゴミ を だす",
    "ex": [
      "火曜日の朝にゴミを出します。",
      "I take out the rubbish on Tuesday mornings."
    ],
    "note": "In Japan rubbish is sorted and collected on set days — check your area’s schedule.",
    "alt": [
      "ごみを出す"
    ]
  },
  {
    "tr": "いい",
    "en": "good; nice",
    "cat": "feelings",
    "kana": "いい",
    "ex": [
      "いいですね！",
      "Sounds great!"
    ],
    "note": "Irregular: “not good” is よくない and “was good” is よかった (from よい, the more formal form)."
  },
  {
    "tr": "悪い",
    "en": "bad",
    "cat": "feelings",
    "kana": "わるい",
    "ex": [
      "今日は天気が悪いですね。",
      "The weather’s bad today, isn’t it?"
    ],
    "note": "Casual 悪いけど… = “Sorry, but…”."
  },
  {
    "tr": "好き",
    "en": "to like; liked",
    "cat": "feelings",
    "kana": "すき",
    "ex": [
      "猫が好きです。",
      "I like cats."
    ],
    "note": "The thing you like takes が, not を: 猫が好きです. It’s a な-adjective, not a verb."
  },
  {
    "tr": "嫌い",
    "en": "to dislike; disliked",
    "cat": "feelings",
    "kana": "きらい",
    "ex": [
      "嫌いな食べ物はありますか。",
      "Is there any food you don’t like?"
    ],
    "note": "Ends in い but is a な-adjective: 嫌いな食べ物. It sounds strong — softer: あまり好きじゃないです."
  },
  {
    "tr": "大好き",
    "en": "to love; to really like",
    "cat": "feelings",
    "kana": "だいすき",
    "ex": [
      "日本の音楽が大好きです。",
      "I love Japanese music."
    ],
    "note": "For things and people. To a partner, Japanese usually say 好き or 大好き rather than 愛してる."
  },
  {
    "tr": "嬉しい",
    "en": "happy; glad",
    "cat": "feelings",
    "kana": "うれしい",
    "ex": [
      "会えて嬉しいです。",
      "I’m glad to see you."
    ],
    "note": "For happy moments and good news. Often written うれしい. Lasting happiness: 幸せ (しあわせ)."
  },
  {
    "tr": "悲しい",
    "en": "sad",
    "cat": "feelings",
    "kana": "かなしい",
    "ex": [
      "その映画はとても悲しかったです。",
      "That film was very sad."
    ]
  },
  {
    "tr": "疲れた",
    "en": "(I’m) tired",
    "cat": "feelings",
    "kana": "つかれた",
    "ex": [
      "今日は本当に疲れた。",
      "I’m really tired today."
    ],
    "note": "Japanese uses the past form: 疲れた = I’m tired (I’ve got tired). From 疲れる (to get tired).",
    "reg": "casual",
    "pair": {
      "tr": "疲れました",
      "reg": "polite",
      "kana": "つかれました"
    }
  },
  {
    "tr": "眠い",
    "en": "sleepy",
    "cat": "feelings",
    "kana": "ねむい",
    "ex": [
      "昨日あまり寝ていないので、眠いです。",
      "I didn’t get much sleep last night, so I’m sleepy."
    ]
  },
  {
    "tr": "つまらない",
    "en": "boring; dull",
    "cat": "feelings",
    "kana": "つまらない",
    "ex": [
      "この番組はつまらないです。",
      "This programme is boring."
    ],
    "note": "Describes the boring thing. “I’m bored” (nothing to do) is 暇です (ひまです) or 退屈です (たいくつです)."
  },
  {
    "tr": "面白い",
    "en": "interesting; funny",
    "cat": "feelings",
    "kana": "おもしろい",
    "ex": [
      "この本は面白いです。",
      "This book is interesting."
    ],
    "note": "Covers both “funny” and “interesting”. Also written おもしろい."
  },
  {
    "tr": "すごい",
    "en": "amazing; wow",
    "cat": "feelings",
    "kana": "すごい",
    "ex": [
      "すごい！上手ですね。",
      "Wow! You’re really good at it."
    ],
    "note": "Casual speech also uses すごく for “really”: すごく美味しい = really tasty."
  },
  {
    "tr": "怖い",
    "en": "scary; afraid",
    "cat": "feelings",
    "kana": "こわい",
    "ex": [
      "犬が怖いです。",
      "I’m scared of dogs."
    ],
    "note": "Works both ways: 怖い映画 = a scary film; 犬が怖い = I’m afraid of dogs."
  },
  {
    "tr": "寂しい",
    "en": "lonely; to miss someone",
    "cat": "feelings",
    "kana": "さびしい",
    "ex": [
      "家族に会えなくて、寂しいです。",
      "I can’t see my family, so I miss them."
    ],
    "note": "There’s no exact “I miss you”: people say 寂しい (I’m lonely) or 会いたい (I want to see you).",
    "alt": [
      "さみしい"
    ]
  },
  {
    "tr": "恥ずかしい",
    "en": "embarrassed; shy",
    "cat": "feelings",
    "kana": "はずかしい",
    "ex": [
      "人前で歌うのは恥ずかしいです。",
      "Singing in front of people is embarrassing."
    ]
  },
  {
    "tr": "心配する",
    "en": "to worry",
    "cat": "feelings",
    "kana": "しんぱい する",
    "ex": [
      "心配しないでください。",
      "Please don’t worry."
    ],
    "note": "心配です = I’m worried. ご心配なく = Don’t worry about it (polite)."
  },
  {
    "tr": "残念",
    "en": "too bad; a pity",
    "cat": "feelings",
    "kana": "ざんねん",
    "ex": [
      "行けなくて残念です。",
      "It’s a pity I can’t go."
    ],
    "note": "残念ですね = That’s a shame. It expresses disappointment, not an apology."
  },
  {
    "tr": "大変",
    "en": "tough; hard; terrible",
    "cat": "feelings",
    "kana": "たいへん",
    "ex": [
      "引っ越しですか。大変ですね。",
      "You’re moving house? That must be tough."
    ],
    "note": "大変ですね is the go-to way to show sympathy. In formal speech 大変 also means “very”."
  },
  {
    "tr": "楽しみ",
    "en": "looking forward to it",
    "cat": "feelings",
    "kana": "たのしみ",
    "ex": [
      "旅行、楽しみですね！",
      "I can’t wait for the trip!"
    ],
    "note": "楽しみです = I’m looking forward to it. With に: 週末を楽しみにしています."
  },
  {
    "tr": "そう思います",
    "en": "I think so",
    "cat": "feelings",
    "kana": "そう おもいます",
    "ex": [
      "本当にそう思います。",
      "I really think so."
    ],
    "note": "Agree with 私もそう思います (I think so too). To disagree politely: そうは思いません (I don’t think so).",
    "reg": "polite",
    "pair": {
      "tr": "そう思う",
      "reg": "casual",
      "kana": "そう おもう",
      "rom": "sō omou"
    }
  },
  {
    "tr": "店",
    "en": "shop; store",
    "cat": "shopping",
    "kana": "みせ",
    "ex": [
      "この店は何時まで開いていますか。",
      "What time is this shop open until?"
    ],
    "note": "Politely お店 (おみせ). In compounds it’s read てん: 喫茶店 (きっさてん, café)."
  },
  {
    "tr": "買い物",
    "en": "shopping",
    "cat": "shopping",
    "kana": "かいもの",
    "ex": [
      "週末、買い物に行きます。",
      "I’m going shopping at the weekend."
    ],
    "note": "買い物に行く = to go shopping; 買い物する = to do the shopping."
  },
  {
    "tr": "コンビニ",
    "en": "convenience store",
    "cat": "shopping",
    "kana": "コンビニ",
    "ex": [
      "近くにコンビニはありますか。",
      "Is there a convenience store nearby?"
    ],
    "note": "Short for コンビニエンスストア. Most are open 24 hours, with ATMs, hot food and bill payment."
  },
  {
    "tr": "スーパー",
    "en": "supermarket",
    "cat": "shopping",
    "kana": "スーパー",
    "ex": [
      "スーパーで野菜を買いました。",
      "I bought vegetables at the supermarket."
    ],
    "note": "Short for スーパーマーケット."
  },
  {
    "tr": "値段",
    "en": "price",
    "cat": "shopping",
    "kana": "ねだん",
    "ex": [
      "この店は値段が安いです。",
      "This shop’s prices are low."
    ]
  },
  {
    "tr": "円",
    "en": "yen",
    "cat": "shopping",
    "kana": "えん",
    "ex": [
      "これは五百円です。",
      "This is 500 yen."
    ],
    "note": "The number comes first: 千円 (1,000 yen). 円 also means “circle”."
  },
  {
    "tr": "現金",
    "en": "cash",
    "cat": "shopping",
    "kana": "げんきん",
    "ex": [
      "現金で払います。",
      "I’ll pay in cash."
    ],
    "note": "Some small shops and restaurants are still cash only: 現金のみ."
  },
  {
    "tr": "カード",
    "en": "card (credit or debit)",
    "cat": "shopping",
    "kana": "カード",
    "ex": [
      "カードで払えますか。",
      "Can I pay by card?"
    ],
    "note": "In full: クレジットカード (credit card)."
  },
  {
    "tr": "払う",
    "en": "to pay",
    "cat": "shopping",
    "kana": "はらう",
    "ex": [
      "私が払います。",
      "I’ll pay."
    ],
    "note": "How you pay takes で: 現金で払う (pay in cash), カードで払う (pay by card)."
  },
  {
    "tr": "売る",
    "en": "to sell",
    "cat": "shopping",
    "kana": "うる",
    "ex": [
      "この店では古い本を売っています。",
      "This shop sells second-hand books."
    ],
    "note": "売り切れ (うりきれ) = sold out — you’ll see it on signs."
  },
  {
    "tr": "レジ",
    "en": "checkout; till",
    "cat": "shopping",
    "kana": "レジ",
    "ex": [
      "レジはあちらです。",
      "The checkout is over there."
    ],
    "note": "From “register”. A self-checkout is セルフレジ."
  },
  {
    "tr": "袋",
    "en": "bag",
    "cat": "shopping",
    "kana": "ふくろ",
    "ex": [
      "袋はご利用ですか。",
      "Would you like a bag?"
    ],
    "note": "What cashiers ask. Shop bags (レジ袋, レジぶくろ) cost a few yen. To say no thanks: 大丈夫です."
  },
  {
    "tr": "レシート",
    "en": "receipt",
    "cat": "shopping",
    "kana": "レシート",
    "ex": [
      "レシートをください。",
      "Could I have the receipt, please?"
    ],
    "note": "For an official receipt (e.g. for work expenses), ask for 領収書 (りょうしゅうしょ)."
  },
  {
    "tr": "お釣り",
    "en": "change (money back)",
    "cat": "shopping",
    "kana": "おつり",
    "ex": [
      "お釣りは二百円です。",
      "Your change is 200 yen."
    ],
    "note": "Often written おつり. Coins and small change: 小銭 (こぜに)."
  },
  {
    "tr": "財布",
    "en": "wallet; purse",
    "cat": "shopping",
    "kana": "さいふ",
    "ex": [
      "財布を家に忘れました。",
      "I left my wallet at home."
    ]
  },
  {
    "tr": "割引",
    "en": "discount",
    "cat": "shopping",
    "kana": "わりびき",
    "ex": [
      "学生割引はありますか。",
      "Is there a student discount?"
    ],
    "note": "1割 = 10%, so 2割引 = 20% off. A student discount is usually shortened to 学割 (がくわり)."
  },
  {
    "tr": "税込",
    "en": "tax included",
    "cat": "shopping",
    "kana": "ぜいこみ",
    "note": "On price tags: 税込 = with tax, 税抜 (ぜいぬき) = before tax. Check which one you’re reading!",
    "alt": [
      "税込み"
    ]
  },
  {
    "tr": "一つ",
    "en": "one (thing)",
    "cat": "shopping",
    "kana": "ひとつ",
    "ex": [
      "これを一つください。",
      "One of these, please."
    ],
    "note": "Counting things: 一つ, 二つ (ふたつ), 三つ (みっつ)… up to 十 (とお). The easiest way to order."
  },
  {
    "tr": "これをください",
    "en": "I’ll take this; this one, please",
    "cat": "shopping",
    "kana": "これ を ください",
    "note": "〜をください = Please give me ~. In speech the を is often dropped: これください.",
    "reg": "polite"
  },
  {
    "tr": "見ているだけです",
    "en": "I’m just looking",
    "cat": "shopping",
    "kana": "みて いる だけ です",
    "note": "Staff greet you with いらっしゃいませ (welcome) — you don’t need to reply.",
    "reg": "polite",
    "pair": {
      "tr": "見てるだけ",
      "reg": "casual",
      "kana": "みてる だけ"
    }
  },
  {
    "tr": "もう",
    "en": "already; (not) anymore",
    "cat": "connectors",
    "kana": "もう",
    "ex": [
      "もう昼ご飯を食べました。",
      "I’ve already had lunch."
    ],
    "note": "With a negative: “not anymore” — もう寒くない. もう一度 = once more."
  },
  {
    "tr": "まだ",
    "en": "still; (not) yet",
    "cat": "connectors",
    "kana": "まだ",
    "ex": [
      "まだ食べていません。",
      "I haven’t eaten yet."
    ],
    "note": "“Not yet” is まだです or まだ〜ていません (not まだ〜ませんでした)."
  },
  {
    "tr": "いつも",
    "en": "always; usually",
    "cat": "connectors",
    "kana": "いつも",
    "ex": [
      "いつも電車で会社に行きます。",
      "I always go to work by train."
    ]
  },
  {
    "tr": "よく",
    "en": "often; well",
    "cat": "connectors",
    "kana": "よく",
    "ex": [
      "よくこのカフェに来ます。",
      "I often come to this café."
    ],
    "note": "Also “well”: よく寝た = I slept well; よく分かりません = I’m not really sure."
  },
  {
    "tr": "時々",
    "en": "sometimes",
    "cat": "connectors",
    "kana": "ときどき",
    "ex": [
      "時々、料理をします。",
      "I sometimes cook."
    ],
    "note": "々 repeats the kanji before it: 時々 = 時 + 時."
  },
  {
    "tr": "全然",
    "en": "not at all",
    "cat": "connectors",
    "kana": "ぜんぜん",
    "ex": [
      "全然分かりません。",
      "I don’t understand at all."
    ],
    "note": "Used with a negative. Casually also “totally”: 全然大丈夫 (totally fine). “Never (not once)” is 一度も〜ない."
  },
  {
    "tr": "あまり",
    "en": "not much; not very",
    "cat": "connectors",
    "kana": "あまり",
    "ex": [
      "あまりお酒を飲みません。",
      "I don’t drink much alcohol."
    ],
    "note": "Used with a negative verb or adjective. Casual: あんまり."
  },
  {
    "tr": "とても",
    "en": "very",
    "cat": "connectors",
    "kana": "とても",
    "ex": [
      "今日はとても暑いです。",
      "It’s very hot today."
    ],
    "note": "In casual speech people often say すごく, or slangy めっちゃ."
  },
  {
    "tr": "少し",
    "en": "a little; a bit",
    "cat": "connectors",
    "kana": "すこし",
    "ex": [
      "もう少しゆっくり話してください。",
      "Please speak a little more slowly."
    ],
    "note": "Casual ちょっと is also a soft “no”: ちょっと… = “that’s a bit (difficult)…”.",
    "pair": {
      "tr": "ちょっと",
      "reg": "casual",
      "kana": "ちょっと"
    }
  },
  {
    "tr": "たくさん",
    "en": "a lot; many",
    "cat": "connectors",
    "kana": "たくさん",
    "ex": [
      "写真をたくさん撮りました。",
      "I took lots of photos."
    ],
    "note": "Sometimes written 沢山. Casual: いっぱい.",
    "alt": [
      "沢山"
    ]
  },
  {
    "tr": "それから",
    "en": "and then; after that",
    "cat": "connectors",
    "kana": "それから",
    "ex": [
      "朝ご飯を食べます。それから、会社に行きます。",
      "I eat breakfast. Then I go to work."
    ]
  },
  {
    "tr": "だから",
    "en": "so; that’s why",
    "cat": "connectors",
    "kana": "だから",
    "ex": [
      "今日は雨です。だから、家にいます。",
      "It’s raining today, so I’m staying at home."
    ],
    "note": "Starts a sentence. More polite: ですから. Within one sentence use 〜から: 雨だから、…"
  },
  {
    "tr": "から",
    "en": "because; from",
    "cat": "connectors",
    "kana": "から",
    "ex": [
      "時間がないから、タクシーで行きます。",
      "I don’t have time, so I’ll take a taxi."
    ],
    "note": "Goes after the reason: [reason]から[result]. Also “from”: 九時から (from nine o’clock)."
  },
  {
    "tr": "も",
    "en": "also; too",
    "cat": "connectors",
    "kana": "も",
    "ex": [
      "私も行きます。",
      "I’m going too."
    ],
    "note": "A particle after the word it adds to, replacing は, が or を: 私も, 猫も好きです."
  },
  {
    "tr": "だけ",
    "en": "only; just",
    "cat": "connectors",
    "kana": "だけ",
    "ex": [
      "一つだけください。",
      "Just one, please."
    ],
    "note": "Goes after the word: 水だけ = only water."
  },
  {
    "tr": "一緒に",
    "en": "together",
    "cat": "connectors",
    "kana": "いっしょ に",
    "ex": [
      "一緒に写真を撮りましょう。",
      "Let’s take a photo together."
    ],
    "note": "With someone: 友達と一緒に = together with a friend."
  },
  {
    "tr": "また",
    "en": "again",
    "cat": "connectors",
    "kana": "また",
    "ex": [
      "また来ます。",
      "I’ll come again."
    ],
    "note": "Also a goodbye: また明日 (see you tomorrow), またね (see you, casual)."
  },
  {
    "tr": "たぶん",
    "en": "maybe; probably",
    "cat": "connectors",
    "kana": "たぶん",
    "ex": [
      "たぶん大丈夫です。",
      "It’ll probably be fine."
    ],
    "note": "Leans towards “probably”. Often with でしょう: たぶん雨でしょう (it’ll probably rain).",
    "alt": [
      "多分"
    ]
  },
  {
    "tr": "本当に",
    "en": "really; truly",
    "cat": "connectors",
    "kana": "ほんとう に",
    "ex": [
      "本当にありがとうございます。",
      "Thank you so much."
    ],
    "note": "本当？ = Really? Casual: ほんと？"
  },
  {
    "tr": "ほとんど",
    "en": "almost; most; hardly",
    "cat": "connectors",
    "kana": "ほとんど",
    "ex": [
      "宿題はほとんど終わりました。",
      "My homework is almost finished."
    ],
    "note": "With a negative it means “hardly”: ほとんど寝ていない = I hardly slept."
  },
  {
    "tr": "全部",
    "en": "all; everything",
    "cat": "connectors",
    "kana": "ぜんぶ",
    "ex": [
      "全部でいくらですか。",
      "How much is it altogether?"
    ],
    "note": "全部で = in total — handy at the till."
  },
  {
    "tr": "何も",
    "en": "nothing (with a negative)",
    "cat": "connectors",
    "kana": "なに も",
    "ex": [
      "今日は何も食べていません。",
      "I haven’t eaten anything today."
    ],
    "note": "Needs a negative verb: 何もない = there’s nothing. “Anything at all” is 何でも (なんでも): 何でもいいです."
  },
  {
    "tr": "誰か",
    "en": "someone; anyone",
    "cat": "connectors",
    "kana": "だれ か",
    "ex": [
      "誰か来ましたか。",
      "Did someone come?"
    ],
    "note": "Question word + か = some-: 何か (something), どこか (somewhere), いつか (someday)."
  },
  {
    "tr": "何か",
    "en": "something; anything",
    "cat": "connectors",
    "kana": "なに か",
    "ex": [
      "何か飲みますか。",
      "Would you like something to drink?"
    ],
    "note": "Casual speech often says なんか. “Nothing” is 何も〜ない."
  },
  {
    "tr": "後で",
    "en": "later",
    "cat": "connectors",
    "kana": "あと で",
    "ex": [
      "後で電話します。",
      "I’ll call you later."
    ],
    "note": "また後で = see you later. 後 alone means “after”: 仕事の後 (after work)."
  },
  {
    "tr": "仕事",
    "en": "work; job",
    "cat": "work",
    "kana": "しごと",
    "ex": [
      "明日も仕事です。",
      "I’ve got work tomorrow too."
    ],
    "note": "仕事に行く = to go to work. To ask politely what someone does: お仕事は何をされていますか？"
  },
  {
    "tr": "会社",
    "en": "company; the office",
    "cat": "work",
    "kana": "かいしゃ",
    "ex": [
      "会社は新宿にあります。",
      "My company is in Shinjuku."
    ],
    "note": "会社に行く = to go to the office. うちの会社 = my company (our company)."
  },
  {
    "tr": "会社員",
    "en": "office worker; company employee",
    "cat": "work",
    "kana": "かいしゃいん",
    "ex": [
      "私は会社員です。",
      "I’m an office worker."
    ],
    "note": "The usual answer to “What do you do?” for anyone employed by a company."
  },
  {
    "tr": "会議",
    "en": "meeting",
    "cat": "work",
    "kana": "かいぎ",
    "ex": [
      "三時から会議があります。",
      "I have a meeting at three."
    ],
    "note": "ミーティング is also common, especially for smaller, informal meetings."
  },
  {
    "tr": "忙しい",
    "en": "busy",
    "cat": "work",
    "kana": "いそがしい",
    "ex": [
      "今週はとても忙しいです。",
      "I’m very busy this week."
    ]
  },
  {
    "tr": "休み",
    "en": "day off; holiday; break",
    "cat": "work",
    "kana": "やすみ",
    "ex": [
      "明日は休みです。",
      "I’m off tomorrow."
    ],
    "note": "From 休む (to rest, take time off). 夏休み = summer holidays; 昼休み = lunch break."
  },
  {
    "tr": "お疲れ様です",
    "en": "thanks for your hard work",
    "cat": "work",
    "kana": "おつかれさま です",
    "ex": [
      "お疲れ様です。お先に失礼します。",
      "Good work today. I’ll head off now."
    ],
    "note": "Said to colleagues all day: as hello, thanks and goodbye. Leaving before others: お先に失礼します.",
    "reg": "polite",
    "alt": [
      "お疲れさまです"
    ],
    "pair": {
      "tr": "お疲れ",
      "reg": "casual",
      "kana": "おつかれ"
    }
  },
  {
    "tr": "頑張る",
    "en": "to do one’s best; to try hard",
    "cat": "work",
    "kana": "がんばる",
    "ex": [
      "試験、頑張ってください！",
      "Good luck with your exam!"
    ],
    "note": "頑張って！ = Good luck! / Hang in there! 頑張ります = I’ll do my best."
  },
  {
    "tr": "メール",
    "en": "email; message",
    "cat": "work",
    "kana": "メール",
    "ex": [
      "後でメールを送ります。",
      "I’ll send you an email later."
    ],
    "note": "メールする = to email. For messaging friends, most people use LINE: LINEする (ラインする), or just 連絡する (to get in touch)."
  },
  {
    "tr": "パソコン",
    "en": "computer (PC)",
    "cat": "work",
    "kana": "パソコン",
    "ex": [
      "パソコンで仕事をします。",
      "I work on a computer."
    ],
    "note": "Short for パーソナルコンピューター. A laptop is ノートパソコン."
  },
  {
    "tr": "学校",
    "en": "school",
    "cat": "work",
    "kana": "がっこう",
    "ex": [
      "子供は八時に学校に行きます。",
      "My kids go to school at eight."
    ]
  },
  {
    "tr": "大学",
    "en": "university; college",
    "cat": "work",
    "kana": "だいがく",
    "ex": [
      "大学で経済を勉強しています。",
      "I study economics at university."
    ],
    "note": "大学生 (だいがくせい) = university student."
  },
  {
    "tr": "授業",
    "en": "class; lesson",
    "cat": "work",
    "kana": "じゅぎょう",
    "ex": [
      "授業は九時に始まります。",
      "Class starts at nine."
    ]
  },
  {
    "tr": "宿題",
    "en": "homework",
    "cat": "work",
    "kana": "しゅくだい",
    "ex": [
      "宿題はもう終わりましたか。",
      "Have you finished your homework yet?"
    ],
    "note": "You “do” homework with する: 宿題をする."
  },
  {
    "tr": "試験",
    "en": "exam; test",
    "cat": "work",
    "kana": "しけん",
    "ex": [
      "来週、日本語の試験があります。",
      "I have a Japanese exam next week."
    ],
    "note": "テスト is also common, especially at school. 試験を受ける = to take an exam."
  },
  {
    "tr": "質問",
    "en": "question",
    "cat": "work",
    "kana": "しつもん",
    "ex": [
      "質問してもいいですか。",
      "May I ask a question?"
    ],
    "note": "質問はありますか？ = Any questions? A problem on a test is 問題 (もんだい)."
  },
  {
    "tr": "意味",
    "en": "meaning",
    "cat": "work",
    "kana": "いみ",
    "ex": [
      "この漢字の意味が分かりません。",
      "I don’t know what this kanji means."
    ],
    "note": "どういう意味ですか？ = What does it mean? / What do you mean?"
  },
  {
    "tr": "日本語",
    "en": "Japanese (language)",
    "cat": "work",
    "kana": "にほんご",
    "ex": [
      "日本語は難しいですが、面白いです。",
      "Japanese is difficult, but interesting."
    ],
    "note": "Country + 語 = its language: 英語, 中国語 (Chinese). Country + 人 = its people: 日本人."
  },
  {
    "tr": "英語",
    "en": "English (language)",
    "cat": "work",
    "kana": "えいご",
    "ex": [
      "英語を話せますか。",
      "Do you speak English?"
    ]
  },
  {
    "tr": "アルバイト",
    "en": "part-time job",
    "cat": "work",
    "kana": "アルバイト",
    "ex": [
      "週末はカフェでアルバイトをしています。",
      "I work part-time at a café at the weekend."
    ],
    "note": "From German “Arbeit” (work). In conversation it’s usually バイト.",
    "pair": {
      "tr": "バイト",
      "reg": "casual",
      "kana": "バイト"
    }
  },
  {
    "tr": "お名前は何ですか。",
    "en": "What's your name?",
    "cat": "p-smalltalk",
    "kana": "おなまえ は なん です か",
    "ex": [
      "「お名前は何ですか。」「田中です。」",
      "“What's your name?” “I'm Tanaka.”"
    ],
    "note": "Answer with your name + です. Softer: お名前を聞いてもいいですか。 At counters you'll hear お名前をお願いします (Your name, please).",
    "reg": "polite",
    "pair": {
      "tr": "名前、なんていうの？",
      "reg": "casual",
      "en": "What's your name? (casual)",
      "kana": "なまえ なんて いう の"
    }
  },
  {
    "tr": "よろしくお願いします。",
    "en": "nice to meet you; thanks in advance",
    "cat": "p-smalltalk",
    "kana": "よろしく おねがい します",
    "ex": [
      "はじめまして、ケンです。よろしくお願いします。",
      "How do you do, I'm Ken. I look forward to getting to know you."
    ],
    "note": "Ends every self-introduction and many requests. Extra formal: どうぞよろしくお願いいたします。",
    "reg": "polite",
    "pair": {
      "tr": "よろしく！",
      "reg": "casual",
      "en": "Nice to meet you! (casual)",
      "kana": "よろしく"
    }
  },
  {
    "tr": "どこから来ましたか。",
    "en": "Where are you from?",
    "cat": "p-smalltalk",
    "kana": "どこ から きました か",
    "ex": [
      "「どこから来ましたか。」「カナダから来ました。」",
      "“Where are you from?” “I'm from Canada.”"
    ],
    "note": "Answer: [country]から来ました or just [country]です. Politer: ご出身はどちらですか。",
    "reg": "polite",
    "pair": {
      "tr": "どこから来たの？",
      "reg": "casual",
      "kana": "どこ から きた の"
    }
  },
  {
    "tr": "お仕事は何をしていますか。",
    "en": "What do you do (for work)?",
    "cat": "p-smalltalk",
    "kana": "おしごと は なに を して います か",
    "ex": [
      "「お仕事は何をしていますか。」「エンジニアです。」",
      "“What do you do?” “I'm an engineer.”"
    ],
    "note": "Answer with your job + です, e.g. 会社員です (I'm an office worker) or 学生です (I'm a student).",
    "reg": "polite",
    "pair": {
      "tr": "仕事、何してるの？",
      "reg": "casual",
      "kana": "しごと なに してる の"
    }
  },
  {
    "tr": "趣味は何ですか。",
    "en": "What are your hobbies?",
    "cat": "p-smalltalk",
    "kana": "しゅみ は なん です か",
    "ex": [
      "趣味は料理です。",
      "My hobby is cooking."
    ],
    "note": "A classic getting-to-know-you question. Answer 趣味は〇〇です or 〇〇が好きです (I like …).",
    "reg": "polite",
    "pair": {
      "tr": "趣味とかある？",
      "reg": "casual",
      "en": "Got any hobbies?",
      "kana": "しゅみ とか ある"
    }
  },
  {
    "tr": "いい天気ですね。",
    "en": "Nice weather, isn't it?",
    "cat": "p-smalltalk",
    "kana": "いい てんき です ね",
    "note": "ね invites agreement — reply そうですね！ Weather is the go-to small talk: 暑いですね (Hot, isn't it?).",
    "reg": "polite",
    "pair": {
      "tr": "いい天気だね。",
      "reg": "casual",
      "kana": "いい てんき だ ね"
    }
  },
  {
    "tr": "今日はどうでしたか。",
    "en": "How was your day?",
    "cat": "p-smalltalk",
    "kana": "きょう は どう でした か",
    "ex": [
      "「今日はどうでしたか。」「ちょっと疲れました。」",
      "“How was your day?” “A bit tiring.”"
    ],
    "note": "Between family and friends the casual version is the norm.",
    "reg": "polite",
    "pair": {
      "tr": "今日どうだった？",
      "reg": "casual",
      "kana": "きょう どう だった"
    }
  },
  {
    "tr": "お久しぶりです。",
    "en": "Long time no see.",
    "cat": "p-smalltalk",
    "kana": "おひさしぶり です",
    "ex": [
      "お久しぶりです。お元気でしたか。",
      "Long time no see. Have you been well?"
    ],
    "note": "Often followed by お元気でしたか (Have you been well?).",
    "reg": "polite",
    "pair": {
      "tr": "久しぶり！",
      "reg": "casual",
      "kana": "ひさしぶり"
    }
  },
  {
    "tr": "日本は初めてですか。",
    "en": "Is this your first time in Japan?",
    "cat": "p-smalltalk",
    "kana": "にほん は はじめて です か",
    "ex": [
      "「日本は初めてですか。」「いいえ、二回目です。」",
      "“Is this your first time in Japan?” “No, it's my second.”"
    ],
    "reg": "polite",
    "pair": {
      "tr": "日本、初めて？",
      "reg": "casual",
      "kana": "にほん はじめて"
    }
  },
  {
    "tr": "いえいえ、まだまだです。",
    "en": "No, no, I still have a long way to go.",
    "cat": "p-smalltalk",
    "kana": "いえいえ まだまだ です",
    "note": "The modest reply when someone says 日本語が上手ですね！ (Your Japanese is good!). A simple ありがとうございます is fine too.",
    "reg": "polite",
    "pair": {
      "tr": "いやいや、全然だよ。",
      "reg": "casual",
      "en": "Nah, I'm not good at all.",
      "kana": "いやいや ぜんぜん だ よ"
    }
  },
  {
    "tr": "二人です。",
    "en": "There are two of us. (table for two)",
    "cat": "p-cafe",
    "kana": "ふたり です",
    "note": "Staff ask 何名様ですか？ (How many?). Answer 一人 (ひとり), 二人 (ふたり), 三人 (さんにん) + です — or hold up fingers.",
    "reg": "polite"
  },
  {
    "tr": "英語のメニューはありますか。",
    "en": "Do you have an English menu?",
    "cat": "p-cafe",
    "kana": "えいご の メニュー は あります か",
    "note": "Many places have photo menus or plastic food models in the window — pointing is perfectly fine.",
    "reg": "polite"
  },
  {
    "tr": "すみません、注文いいですか。",
    "en": "Excuse me, can we order?",
    "cat": "p-cafe",
    "kana": "すみません ちゅうもん いい です か",
    "note": "Calling out すみません！ to get staff's attention is normal, not rude. Many tables also have a call button.",
    "reg": "polite"
  },
  {
    "tr": "おすすめは何ですか。",
    "en": "What do you recommend?",
    "cat": "p-cafe",
    "kana": "おすすめ は なん です か",
    "ex": [
      "今日のおすすめは何ですか。",
      "What's today's special?"
    ],
    "reg": "polite",
    "pair": {
      "tr": "おすすめは？",
      "reg": "casual",
      "en": "Any recommendations?",
      "kana": "おすすめ は"
    }
  },
  {
    "tr": "お水をもらえますか。",
    "en": "Could I have some water?",
    "cat": "p-cafe",
    "kana": "おみず を もらえます か",
    "note": "Water or tea is usually free and refilled. Some places are self-service (セルフサービス). A refill of anything: おかわり.",
    "reg": "polite"
  },
  {
    "tr": "持ち帰りでお願いします。",
    "en": "To go, please.",
    "cat": "p-cafe",
    "kana": "もちかえり で おねがい します",
    "note": "Staff ask 店内でお召し上がりですか？ (Eating in?). Reply 店内で (for here) or 持ち帰りで / テイクアウトで (to go).",
    "reg": "polite"
  },
  {
    "tr": "肉は食べられません。",
    "en": "I can't eat meat.",
    "cat": "p-cafe",
    "kana": "にく は たべられません",
    "ex": [
      "すみません、肉と魚は食べられません。",
      "Sorry, I can't eat meat or fish."
    ],
    "note": "ベジタリアンです (I'm vegetarian) is understood, but naming foods is clearer. Fish stock (だし) hides in many dishes.",
    "reg": "polite",
    "pair": {
      "tr": "肉、食べられないんだ。",
      "reg": "casual",
      "kana": "にく たべられない ん だ"
    }
  },
  {
    "tr": "ナッツアレルギーがあります。",
    "en": "I have a nut allergy.",
    "cat": "p-cafe",
    "kana": "ナッツ アレルギー が あります",
    "note": "Swap in other foods: 卵アレルギー (egg), えびアレルギー (shrimp), 小麦アレルギー (wheat). Ask これに入っていますか？ (Is it in this?)",
    "reg": "polite"
  },
  {
    "tr": "お会計をお願いします。",
    "en": "The bill, please.",
    "cat": "p-cafe",
    "kana": "おかいけい を おねがい します",
    "note": "You often pay at the register (レジ) by the door. Tipping isn't done in Japan. At izakaya you'll also hear お勘定.",
    "reg": "polite"
  },
  {
    "tr": "おいしかったです。",
    "en": "It was delicious.",
    "cat": "p-cafe",
    "kana": "おいしかった です",
    "note": "On your way out, say ごちそうさまでした to the staff — it's always appreciated.",
    "reg": "polite",
    "alt": [
      "美味しかったです"
    ],
    "pair": {
      "tr": "おいしかった！",
      "reg": "casual",
      "kana": "おいしかった"
    }
  },
  {
    "tr": "これはいくらですか。",
    "en": "How much is this?",
    "cat": "p-shop",
    "kana": "これ は いくら です か",
    "note": "Price tags may show 税込 (tax included) or 税抜 (before tax).",
    "reg": "polite",
    "pair": {
      "tr": "これ、いくら？",
      "reg": "casual",
      "kana": "これ いくら"
    }
  },
  {
    "tr": "ほかの色はありますか。",
    "en": "Do you have it in other colours?",
    "cat": "p-shop",
    "kana": "ほか の いろ は あります か",
    "ex": [
      "これの黒はありますか。",
      "Do you have this in black?"
    ],
    "reg": "polite",
    "pair": {
      "tr": "ほかの色ある？",
      "reg": "casual",
      "kana": "ほか の いろ ある"
    }
  },
  {
    "tr": "カードは使えますか。",
    "en": "Can I pay by card?",
    "cat": "p-shop",
    "kana": "カード は つかえます か",
    "note": "Cash (現金, げんきん) is still common at small shops; IC cards like Suica and QR-code payments often work too.",
    "reg": "polite",
    "pair": {
      "tr": "カード使える？",
      "reg": "casual",
      "kana": "カード つかえる"
    }
  },
  {
    "tr": "試着してもいいですか。",
    "en": "Can I try this on?",
    "cat": "p-shop",
    "kana": "しちゃく して も いい です か",
    "note": "Take your shoes off before stepping into the fitting room (試着室).",
    "reg": "polite"
  },
  {
    "tr": "もっと大きいサイズはありますか。",
    "en": "Do you have a bigger size?",
    "cat": "p-shop",
    "kana": "もっと おおきい サイズ は あります か",
    "ex": [
      "Mサイズはありますか。",
      "Do you have it in medium?"
    ],
    "note": "Smaller: もっと小さいサイズ. Sizes are often S, M, L — said エス, エム, エル.",
    "reg": "polite"
  },
  {
    "tr": "これにします。",
    "en": "I'll take this one.",
    "cat": "p-shop",
    "kana": "これ に します",
    "note": "〜にします announces your choice — in shops and when ordering food.",
    "reg": "polite",
    "pair": {
      "tr": "これにする。",
      "reg": "casual",
      "kana": "これ に する"
    }
  },
  {
    "tr": "温めますか。",
    "en": "Shall I heat it up?",
    "cat": "p-shop",
    "kana": "あたためます か",
    "ex": [
      "「お弁当、温めますか。」「はい、お願いします。」",
      "“Shall I heat up your bento?” “Yes, please.”"
    ],
    "note": "You'll hear this at every konbini when you buy food. Say はい、お願いします, or 大丈夫です (No, thanks).",
    "reg": "polite"
  },
  {
    "tr": "袋はいりません。",
    "en": "I don't need a bag.",
    "cat": "p-shop",
    "kana": "ふくろ は いりません",
    "note": "Bags cost a few yen. When asked 袋はご利用ですか？ you can also just say 大丈夫です (No thanks).",
    "reg": "polite"
  },
  {
    "tr": "プレゼント用に包んでもらえますか。",
    "en": "Could you gift-wrap it?",
    "cat": "p-shop",
    "kana": "プレゼント よう に つつんで もらえます か",
    "note": "Shops often wrap gifts for free. Staff may ask ご自宅用ですか？ (Is it for yourself?).",
    "reg": "polite"
  },
  {
    "tr": "ポイントカードはお持ちですか。",
    "en": "Do you have a points card?",
    "cat": "p-shop",
    "kana": "ポイントカード は おもち です か",
    "note": "Staff ask this at almost every till. If you don't have one, just say ないです or 持ってないです.",
    "reg": "formal",
    "pair": {
      "tr": "ポイントカードは持っていますか。",
      "reg": "polite",
      "kana": "ポイントカード は もって います か"
    }
  },
  {
    "tr": "一番近い駅はどこですか。",
    "en": "Where's the nearest station?",
    "cat": "p-directions",
    "kana": "いちばん ちかい えき は どこ です か",
    "note": "Start with すみません to stop someone. Swap 駅 for コンビニ (convenience store) or バス停 (bus stop).",
    "reg": "polite",
    "pair": {
      "tr": "一番近い駅ってどこ？",
      "reg": "casual",
      "kana": "いちばん ちかい えき って どこ"
    }
  },
  {
    "tr": "東京駅までどうやって行けばいいですか。",
    "en": "How do I get to Tokyo Station?",
    "cat": "p-directions",
    "kana": "とうきょうえき まで どうやって いけば いい です か",
    "note": "まで = (up) to. A simpler version: 東京駅はどうやって行きますか。",
    "reg": "polite",
    "pair": {
      "tr": "東京駅ってどうやって行くの？",
      "reg": "casual",
      "kana": "とうきょうえき って どうやって いく の"
    }
  },
  {
    "tr": "ここから遠いですか。",
    "en": "Is it far from here?",
    "cat": "p-directions",
    "kana": "ここ から とおい です か",
    "ex": [
      "「ここから遠いですか。」「歩いて五分ぐらいです。」",
      "“Is it far from here?” “About five minutes on foot.”"
    ],
    "reg": "polite",
    "pair": {
      "tr": "ここから遠い？",
      "reg": "casual",
      "kana": "ここ から とおい"
    }
  },
  {
    "tr": "歩いて行けますか。",
    "en": "Can I walk there?",
    "cat": "p-directions",
    "kana": "あるいて いけます か",
    "reg": "polite",
    "pair": {
      "tr": "歩いて行ける？",
      "reg": "casual",
      "kana": "あるいて いける"
    }
  },
  {
    "tr": "このバスは渋谷に行きますか。",
    "en": "Does this bus go to Shibuya?",
    "cat": "p-directions",
    "kana": "この バス は しぶや に いきます か",
    "note": "Bus rules vary: in Tokyo you usually board at the front and pay first; elsewhere you often board at the back and pay when you get off.",
    "reg": "polite"
  },
  {
    "tr": "切符はどこで買えますか。",
    "en": "Where can I buy a ticket?",
    "cat": "p-directions",
    "kana": "きっぷ は どこ で かえます か",
    "note": "Most people just tap an IC card like Suica or PASMO instead of buying paper tickets.",
    "reg": "polite"
  },
  {
    "tr": "新宿行きは何番線ですか。",
    "en": "Which platform for Shinjuku?",
    "cat": "p-directions",
    "kana": "しんじゅく いき は なんばんせん です か",
    "note": "〜行き (いき or ゆき) = bound for. 番線 = platform/track number: 3番線 (さんばんせん).",
    "reg": "polite"
  },
  {
    "tr": "次の角を右に曲がってください。",
    "en": "Please turn right at the next corner.",
    "cat": "p-directions",
    "kana": "つぎ の かど を みぎ に まがって ください",
    "ex": [
      "二つ目の信号を左に曲がってください。",
      "Turn left at the second traffic light."
    ],
    "note": "Key words: 右 (right), 左 (left), まっすぐ (straight on), 信号 (traffic light), 角 (corner).",
    "reg": "polite"
  },
  {
    "tr": "ここまでお願いします。",
    "en": "(Take me) here, please.",
    "cat": "p-directions",
    "kana": "ここ まで おねがい します",
    "note": "Show the taxi driver a map or address as you say it. Taxi rear doors open and close automatically — don't touch them.",
    "reg": "polite"
  },
  {
    "tr": "ここで止めてください。",
    "en": "Please stop here.",
    "cat": "p-directions",
    "kana": "ここ で とめて ください",
    "note": "Also natural in a taxi: このへんで大丈夫です (Around here is fine).",
    "reg": "polite"
  },
  {
    "tr": "今週末、空いていますか。",
    "en": "Are you free this weekend?",
    "cat": "p-plans",
    "kana": "こんしゅうまつ あいて います か",
    "note": "空いている = free, available. 暇ですか？ also works, but it can imply 'nothing to do', so this is safer.",
    "reg": "polite",
    "pair": {
      "tr": "週末、空いてる？",
      "reg": "casual",
      "kana": "しゅうまつ あいてる"
    }
  },
  {
    "tr": "一緒に行きませんか。",
    "en": "Would you like to go together?",
    "cat": "p-plans",
    "kana": "いっしょ に いきません か",
    "ex": [
      "今度、一緒にご飯に行きませんか。",
      "Would you like to go for a meal sometime?"
    ],
    "note": "〜ませんか (won't you…?) is the polite way to invite. Accept with いいですね！ or 行きましょう！",
    "reg": "polite",
    "pair": {
      "tr": "一緒に行かない？",
      "reg": "casual",
      "kana": "いっしょ に いかない"
    }
  },
  {
    "tr": "どこで会いましょうか。",
    "en": "Where shall we meet?",
    "cat": "p-plans",
    "kana": "どこ で あいましょう か",
    "reg": "polite",
    "pair": {
      "tr": "どこで会う？",
      "reg": "casual",
      "kana": "どこ で あう"
    }
  },
  {
    "tr": "何時にしますか。",
    "en": "What time shall we make it?",
    "cat": "p-plans",
    "kana": "なんじ に します か",
    "ex": [
      "「何時にしますか。」「七時はどうですか。」",
      "“What time shall we make it?” “How about seven?”"
    ],
    "reg": "polite",
    "pair": {
      "tr": "何時にする？",
      "reg": "casual",
      "kana": "なんじ に する"
    }
  },
  {
    "tr": "土曜日はどうですか。",
    "en": "How about Saturday?",
    "cat": "p-plans",
    "kana": "どようび は どう です か",
    "note": "〜はどうですか suggests a time, place or idea. In casual speech days get shortened: 土曜 (どよう), 日曜 (にちよう).",
    "reg": "polite",
    "pair": {
      "tr": "土曜はどう？",
      "reg": "casual",
      "kana": "どよう は どう"
    }
  },
  {
    "tr": "すみません、今日はちょっと…",
    "en": "Sorry, today's not good for me.",
    "cat": "p-plans",
    "kana": "すみません きょう は ちょっと",
    "note": "Trailing off after ちょっと… is the polite way to decline — no reason or direct 'no' needed.",
    "reg": "polite",
    "pair": {
      "tr": "ごめん、今日は無理！",
      "reg": "casual",
      "en": "Sorry, can't today!",
      "kana": "ごめん きょう は むり"
    }
  },
  {
    "tr": "また今度にしましょう。",
    "en": "Let's make it another time.",
    "cat": "p-plans",
    "kana": "また こんど に しましょう",
    "note": "Heads-up: また今度 can also be a soft 'no' that never turns into real plans.",
    "reg": "polite",
    "pair": {
      "tr": "また今度ね。",
      "reg": "casual",
      "kana": "また こんど ね"
    }
  },
  {
    "tr": "少し遅れます。",
    "en": "I'll be a little late.",
    "cat": "p-plans",
    "kana": "すこし おくれます",
    "ex": [
      "すみません、十分ぐらい遅れます。",
      "Sorry, I'll be about ten minutes late."
    ],
    "note": "Punctuality matters in Japan, so send a quick message if you're running late.",
    "reg": "polite",
    "pair": {
      "tr": "ちょっと遅れる！",
      "reg": "casual",
      "kana": "ちょっと おくれる"
    }
  },
  {
    "tr": "楽しみにしています。",
    "en": "I'm looking forward to it.",
    "cat": "p-plans",
    "kana": "たのしみ に して います",
    "note": "A warm way to confirm plans. Casually: 楽しみ！ or 楽しみにしてるね。",
    "reg": "polite",
    "pair": {
      "tr": "楽しみ！",
      "reg": "casual",
      "kana": "たのしみ"
    }
  },
  {
    "tr": "では、また明日。",
    "en": "See you tomorrow, then.",
    "cat": "p-plans",
    "kana": "で は また あした",
    "note": "では is the polite form of じゃあ. Swap 明日 for 来週 (next week) or 土曜日に (on Saturday).",
    "reg": "polite",
    "pair": {
      "tr": "じゃあ、また明日ね。",
      "reg": "casual",
      "kana": "じゃあ また あした ね"
    }
  },
  {
    "tr": "本当ですか。",
    "en": "Really?",
    "cat": "p-reactions",
    "kana": "ほんとう です か",
    "note": "Say it with rising intonation to show surprise or interest.",
    "reg": "polite",
    "pair": {
      "tr": "ほんと？",
      "reg": "casual",
      "kana": "ほんと"
    }
  },
  {
    "tr": "そうなんですか。",
    "en": "Oh, is that so?",
    "cat": "p-reactions",
    "kana": "そう なん です か",
    "note": "The all-purpose 'Oh, I didn't know that!'. Japanese listeners react often (あいづち) to show they're following.",
    "reg": "polite",
    "pair": {
      "tr": "そうなんだ。",
      "reg": "casual",
      "kana": "そう なん だ"
    }
  },
  {
    "tr": "なるほど。",
    "en": "I see; that makes sense.",
    "cat": "p-reactions",
    "kana": "なるほど",
    "note": "Shows you've understood. Said to a boss or teacher it can sound like you're judging; そうなんですね is safer.",
    "pair": {
      "tr": "そうなんですね。",
      "reg": "polite",
      "en": "I see. (polite)",
      "kana": "そう なん です ね"
    }
  },
  {
    "tr": "よかったですね。",
    "en": "That's great! (I'm glad for you)",
    "cat": "p-reactions",
    "kana": "よかった です ね",
    "ex": [
      "「試験に合格しました！」「よかったですね！」",
      "“I passed the exam!” “That's great!”"
    ],
    "reg": "polite",
    "pair": {
      "tr": "よかったね！",
      "reg": "casual",
      "kana": "よかった ね"
    }
  },
  {
    "tr": "私もそう思います。",
    "en": "I think so too.",
    "cat": "p-reactions",
    "kana": "わたし も そう おもいます",
    "note": "A polite way to agree. With friends people just say だよね！ or the slang それな！",
    "reg": "polite",
    "pair": {
      "tr": "だよね！",
      "reg": "casual",
      "en": "Right?! / I know!",
      "kana": "だ よ ね"
    }
  },
  {
    "tr": "信じられません。",
    "en": "I can't believe it.",
    "cat": "p-reactions",
    "kana": "しんじられません",
    "note": "うそ means 'lie', but うそ！ / うそでしょ！ just means 'No way!' — it doesn't call anyone a liar.",
    "reg": "polite",
    "pair": {
      "tr": "うそでしょ！",
      "reg": "casual",
      "en": "No way!",
      "kana": "うそ でしょ"
    }
  },
  {
    "tr": "気にしないでください。",
    "en": "Please don't worry about it.",
    "cat": "p-reactions",
    "kana": "き に しないで ください",
    "note": "Use it when someone apologises to you. 大丈夫ですよ (It's fine) works too.",
    "reg": "polite",
    "pair": {
      "tr": "気にしないで。",
      "reg": "casual",
      "kana": "き に しないで"
    }
  },
  {
    "tr": "それは大変でしたね。",
    "en": "That must have been tough.",
    "cat": "p-reactions",
    "kana": "それ は たいへん でした ね",
    "note": "大変 = tough, a lot to deal with. The go-to sympathy line when someone shares a problem.",
    "reg": "polite",
    "pair": {
      "tr": "大変だったね。",
      "reg": "casual",
      "kana": "たいへん だった ね"
    }
  },
  {
    "tr": "それは残念ですね。",
    "en": "That's a shame.",
    "cat": "p-reactions",
    "kana": "それ は ざんねん です ね",
    "ex": [
      "「明日のコンサート、中止になりました。」「それは残念ですね。」",
      "“Tomorrow's concert was cancelled.” “That's a shame.”"
    ],
    "reg": "polite",
    "pair": {
      "tr": "残念だね。",
      "reg": "casual",
      "kana": "ざんねん だ ね"
    }
  },
  {
    "tr": "びっくりしました。",
    "en": "That surprised me!",
    "cat": "p-reactions",
    "kana": "びっくり しました",
    "note": "More formal: 驚きました. With friends you'll hear えっ！ or びっくりした〜！",
    "reg": "polite",
    "pair": {
      "tr": "びっくりした！",
      "reg": "casual",
      "kana": "びっくり した"
    }
  },
  {
    "tr": "道に迷いました。",
    "en": "I'm lost.",
    "cat": "p-help",
    "kana": "みち に まよいました",
    "ex": [
      "道に迷いました。駅に行きたいんですが…",
      "I'm lost. I'm trying to get to the station…"
    ],
    "note": "Police boxes (交番, こうばん) happily give directions too.",
    "reg": "polite",
    "pair": {
      "tr": "道に迷っちゃった。",
      "reg": "casual",
      "kana": "みち に まよっちゃった"
    }
  },
  {
    "tr": "医者を呼んでください。",
    "en": "Please call a doctor.",
    "cat": "p-help",
    "kana": "いしゃ を よんで ください",
    "ex": [
      "救急車を呼んでください！",
      "Please call an ambulance!"
    ],
    "note": "Emergency numbers in Japan: 119 for an ambulance or fire, 110 for the police.",
    "reg": "polite"
  },
  {
    "tr": "もう一度お願いします。",
    "en": "Could you say that again, please?",
    "cat": "p-help",
    "kana": "もう いちど おねがい します",
    "note": "Start with すみません、 to sound softer.",
    "reg": "polite",
    "pair": {
      "tr": "もう一回言って。",
      "reg": "casual",
      "en": "Say that again?",
      "kana": "もう いっかい いって"
    }
  },
  {
    "tr": "ゆっくり話してください。",
    "en": "Please speak slowly.",
    "cat": "p-help",
    "kana": "ゆっくり はなして ください",
    "note": "Even politer: もう少しゆっくり話していただけますか。 (Could you speak a little more slowly?)",
    "reg": "polite",
    "pair": {
      "tr": "ゆっくり話して。",
      "reg": "casual",
      "kana": "ゆっくり はなして"
    }
  },
  {
    "tr": "すみません、日本語があまり分かりません。",
    "en": "Sorry, I don't understand much Japanese.",
    "cat": "p-help",
    "kana": "すみません にほんご が あまり わかりません",
    "note": "あまり + negative = 'not much'. In speech it often becomes あんまり.",
    "reg": "polite",
    "pair": {
      "tr": "日本語、あんまり分からないんだ。",
      "reg": "casual",
      "kana": "にほんご あんまり わからない ん だ"
    }
  },
  {
    "tr": "これはどういう意味ですか。",
    "en": "What does this mean?",
    "cat": "p-help",
    "kana": "これ は どういう いみ です か",
    "ex": [
      "「おつかれ」はどういう意味ですか。",
      "What does “otsukare” mean?"
    ],
    "reg": "polite",
    "pair": {
      "tr": "これ、どういう意味？",
      "reg": "casual",
      "kana": "これ どういう いみ"
    }
  },
  {
    "tr": "英語を話せる人はいますか。",
    "en": "Is there anyone who speaks English?",
    "cat": "p-help",
    "kana": "えいご を はなせる ひと は います か",
    "note": "Useful at stations, hotels and hospitals.",
    "reg": "polite"
  },
  {
    "tr": "薬局はどこですか。",
    "en": "Where's the pharmacy?",
    "cat": "p-help",
    "kana": "やっきょく は どこ です か",
    "note": "Drugstores (ドラッグストア) sell everyday medicine; for prescriptions look for 薬局 or 調剤薬局.",
    "reg": "polite"
  },
  {
    "tr": "具合が悪いです。",
    "en": "I don't feel well.",
    "cat": "p-help",
    "kana": "ぐあい が わるい です",
    "note": "Point and say ここが痛いです (It hurts here). 気持ちが悪いです = I feel sick (nauseous).",
    "reg": "polite",
    "pair": {
      "tr": "具合悪い…",
      "reg": "casual",
      "kana": "ぐあい わるい"
    }
  },
  {
    "tr": "財布をなくしました。",
    "en": "I've lost my wallet.",
    "cat": "p-help",
    "kana": "さいふ を なくしました",
    "note": "Go to the nearest 交番 (police box) — lost items are very often handed in.",
    "reg": "polite",
    "pair": {
      "tr": "財布なくした！",
      "reg": "casual",
      "kana": "さいふ なくした"
    }
  },
  {
    "tr": "写真を撮っていただけますか。",
    "en": "Could you take a photo for us?",
    "cat": "p-polite",
    "kana": "しゃしん を とって いただけます か",
    "note": "〜ていただけますか is a very polite 'Could you…?'. Plainer polite: 〜てください (Please do…).",
    "reg": "polite",
    "pair": {
      "tr": "写真撮ってくれる？",
      "reg": "casual",
      "kana": "しゃしん とって くれる"
    }
  },
  {
    "tr": "ちょっとよろしいですか。",
    "en": "Excuse me, do you have a moment?",
    "cat": "p-polite",
    "kana": "ちょっと よろしい です か",
    "note": "A polite way to interrupt, e.g. to ask a colleague or shop staff something.",
    "reg": "polite",
    "pair": {
      "tr": "ちょっといい？",
      "reg": "casual",
      "kana": "ちょっと いい"
    }
  },
  {
    "tr": "ここに座ってもいいですか。",
    "en": "May I sit here?",
    "cat": "p-polite",
    "kana": "ここ に すわって も いい です か",
    "note": "〜てもいいですか = 'May I…?'. The usual reply is どうぞ (Go ahead).",
    "reg": "polite",
    "pair": {
      "tr": "ここ座っていい？",
      "reg": "casual",
      "kana": "ここ すわって いい"
    }
  },
  {
    "tr": "お手洗いをお借りできますか。",
    "en": "May I use the restroom?",
    "cat": "p-polite",
    "kana": "おてあらい を おかり できます か",
    "note": "お手洗い is the polite word for トイレ. You ask to 'borrow' it — at a café, a shop or someone's home.",
    "reg": "polite",
    "pair": {
      "tr": "トイレ借りていい？",
      "reg": "casual",
      "en": "Can I use the toilet?",
      "kana": "トイレ かりて いい"
    }
  },
  {
    "tr": "失礼します。",
    "en": "Excuse me (as I come in or leave).",
    "cat": "p-polite",
    "kana": "しつれい します",
    "note": "Said entering a room, leaving, or hanging up the phone. Leaving work before others: お先に失礼します。",
    "reg": "polite"
  },
  {
    "tr": "どうもありがとうございました。",
    "en": "Thank you very much (for what you did).",
    "cat": "p-polite",
    "kana": "どうも ありがとう ございました",
    "note": "The past tense thanks someone for something already done — after help, or when leaving a shop or lesson.",
    "reg": "polite",
    "pair": {
      "tr": "ほんとにありがとう！",
      "reg": "casual",
      "en": "Thanks so much!",
      "kana": "ほんと に ありがとう"
    }
  },
  {
    "tr": "どういたしまして。",
    "en": "You're welcome.",
    "cat": "p-polite",
    "kana": "どういたしまして",
    "note": "Correct but a little stiff. In daily life people often wave thanks off with いえいえ or とんでもないです.",
    "reg": "polite",
    "pair": {
      "tr": "いえいえ。",
      "reg": "neutral",
      "en": "Oh, not at all.",
      "kana": "いえいえ"
    }
  },
  {
    "tr": "少々お待ちください。",
    "en": "One moment, please.",
    "cat": "p-polite",
    "kana": "しょうしょう おまち ください",
    "note": "Keigo you'll hear from shop staff and on the phone. Everyday polite: ちょっと待ってください。",
    "reg": "formal",
    "pair": {
      "tr": "ちょっと待ってね。",
      "reg": "casual",
      "en": "Hang on a sec.",
      "kana": "ちょっと まって ね"
    }
  },
  {
    "tr": "いらっしゃいませ。",
    "en": "Welcome! (to a shop or restaurant)",
    "cat": "p-polite",
    "kana": "いらっしゃいませ",
    "note": "Staff call this out as you walk in. Customers don't reply — a nod or smile is plenty.",
    "reg": "formal",
    "pair": {
      "tr": "いらっしゃい！",
      "reg": "casual",
      "en": "Welcome! / Come on in!",
      "kana": "いらっしゃい"
    }
  },
  {
    "tr": "お願いいたします。",
    "en": "please (very polite)",
    "cat": "p-polite",
    "kana": "おねがい いたします",
    "ex": [
      "ご確認をお願いいたします。",
      "Please check it. (formal)"
    ],
    "note": "Humble form of お願いします, used by staff, in business and in emails. Formal emails end よろしくお願いいたします。",
    "reg": "formal",
    "pair": {
      "tr": "お願いします。",
      "reg": "polite",
      "en": "please",
      "kana": "おねがい します"
    }
  },
  {
    "tr": "うん",
    "en": "yeah; uh-huh",
    "cat": "everyday",
    "kana": "うん",
    "ex": [
      "「おなかすいた？」「うん、ちょっと。」",
      "“Are you hungry?” “Yeah, a bit.”"
    ],
    "note": "Casual 'yes' and the 'I'm listening' sound with friends and family. With teachers, staff or strangers, use はい.",
    "reg": "casual",
    "pair": {
      "tr": "はい",
      "reg": "polite",
      "en": "yes",
      "kana": "はい"
    }
  },
  {
    "tr": "ううん",
    "en": "nah; no",
    "cat": "everyday",
    "kana": "ううん",
    "rom": "uun",
    "note": "Casual 'no' with friends. Don't confuse it with うーん (hmm…, thinking). Politely: いいえ, or more softly いえ.",
    "reg": "casual",
    "pair": {
      "tr": "いいえ",
      "reg": "polite",
      "en": "no",
      "kana": "いいえ"
    }
  },
  {
    "tr": "じゃあね",
    "en": "see you; bye",
    "cat": "everyday",
    "kana": "じゃあ ね",
    "note": "With friends: じゃあね / またね. Leaving a teacher or boss: 失礼します. さようなら is mostly for school or long partings.",
    "reg": "casual",
    "pair": {
      "tr": "失礼します。",
      "reg": "polite",
      "en": "Goodbye (polite, when leaving)",
      "kana": "しつれい します"
    }
  },
  {
    "tr": "ごめん",
    "en": "sorry",
    "cat": "everyday",
    "kana": "ごめん",
    "ex": [
      "遅れてごめん！",
      "Sorry I'm late!"
    ],
    "note": "Sorry ladder: ごめん (friends) → ごめんなさい → すみません (polite) → 申し訳ありません (business, serious).",
    "reg": "casual",
    "pair": {
      "tr": "申し訳ありません。",
      "reg": "formal",
      "en": "I'm terribly sorry.",
      "kana": "もうしわけ ありません"
    }
  },
  {
    "tr": "わかった",
    "en": "got it; OK",
    "cat": "everyday",
    "kana": "わかった",
    "ex": [
      "「七時に駅ね。」「わかった！」",
      "“Seven at the station, OK?” “Got it!”"
    ],
    "note": "Friends: わかった. Polite: わかりました. Staff and business: かしこまりました or 承知しました.",
    "reg": "casual",
    "alt": [
      "分かった"
    ],
    "pair": {
      "tr": "かしこまりました。",
      "reg": "formal",
      "en": "Certainly. (formal)",
      "kana": "かしこまりました"
    }
  },
  {
    "tr": "わかんない",
    "en": "I dunno; I don't get it",
    "cat": "everyday",
    "kana": "わかんない",
    "note": "In fast speech ら before な often becomes ん: わからない → わかんない, つまらない → つまんない.",
    "reg": "casual",
    "alt": [
      "分かんない"
    ],
    "pair": {
      "tr": "分かりません。",
      "reg": "polite",
      "en": "I don't understand.",
      "kana": "わかりません"
    }
  },
  {
    "tr": "そっか",
    "en": "oh, I see",
    "cat": "everyday",
    "kana": "そっか",
    "note": "A clipped そうか, said softly as you take in news. Polite: そうですか or そうなんですね.",
    "reg": "casual",
    "pair": {
      "tr": "そうですか。",
      "reg": "polite",
      "en": "Is that so?",
      "kana": "そう です か"
    }
  },
  {
    "tr": "えっと…",
    "en": "um…; let me see…",
    "cat": "everyday",
    "kana": "えっと",
    "note": "Fillers buy thinking time. In polite talk, そうですね… sounds calmer than えっと… or あの…",
    "reg": "casual",
    "alt": [
      "えーと",
      "ええと"
    ],
    "pair": {
      "tr": "そうですね…",
      "reg": "polite",
      "en": "Let me see…",
      "kana": "そう です ね"
    }
  },
  {
    "tr": "あのさ",
    "en": "hey, you know what…",
    "cat": "everyday",
    "kana": "あの さ",
    "ex": [
      "あのさ、明日ひま？",
      "Hey, are you free tomorrow?"
    ],
    "note": "Grabs a friend's attention before you say something. あのね is a softer version. To strangers: あの、すみません。",
    "reg": "casual",
    "pair": {
      "tr": "あの、すみません。",
      "reg": "polite",
      "en": "Um, excuse me…",
      "kana": "あの すみません"
    }
  },
  {
    "tr": "何してるの？",
    "en": "What are you doing?",
    "cat": "everyday",
    "kana": "なに してる の",
    "note": "Two everyday shortcuts: ている → てる, and を is dropped. The rising の makes it a friendly question.",
    "reg": "casual",
    "pair": {
      "tr": "何をしていますか。",
      "reg": "polite",
      "kana": "なに を して います か"
    }
  },
  {
    "tr": "忘れちゃった。",
    "en": "Oops, I forgot.",
    "cat": "everyday",
    "kana": "わすれちゃった",
    "note": "ちゃう/ちゃった = てしまう: done by accident or with regret. After ん it's じゃう: 飲んじゃった (I drank it all).",
    "reg": "casual",
    "pair": {
      "tr": "忘れてしまいました。",
      "reg": "polite",
      "kana": "わすれて しまいました"
    }
  },
  {
    "tr": "もう行かなきゃ。",
    "en": "I've got to go now.",
    "cat": "everyday",
    "kana": "もう いかなきゃ",
    "note": "なきゃ is short for なければ(ならない), 'must': 勉強しなきゃ (I have to study). Leaving politely, people say そろそろ失礼します。",
    "reg": "casual",
    "pair": {
      "tr": "そろそろ失礼します。",
      "reg": "polite",
      "en": "I'd better be going. (polite)",
      "kana": "そろそろ しつれい します"
    }
  },
  {
    "tr": "明日、雨だって。",
    "en": "Apparently it'll rain tomorrow.",
    "cat": "everyday",
    "kana": "あした あめ だって",
    "note": "って reports what you heard (= と言っていた). It also works as a casual は: これって何？ (What's this?)",
    "reg": "casual",
    "pair": {
      "tr": "明日は雨だそうです。",
      "reg": "polite",
      "kana": "あした は あめ だ そう です"
    }
  },
  {
    "tr": "それ、私のじゃない。",
    "en": "That's not mine.",
    "cat": "everyday",
    "kana": "それ わたし の じゃない",
    "note": "じゃ is the spoken form of では. A polite middle ground in daily life: 私のじゃないです。",
    "reg": "casual",
    "pair": {
      "tr": "それは私のではありません。",
      "reg": "formal",
      "kana": "それ は わたし の で は ありません"
    }
  },
  {
    "tr": "どうしたの？",
    "en": "What's wrong? / What happened?",
    "cat": "everyday",
    "kana": "どう した の",
    "note": "A gentle 'What's up?' when someone looks upset. Doctors and staff ask どうしましたか or どうされましたか.",
    "reg": "casual",
    "pair": {
      "tr": "どうしましたか。",
      "reg": "polite",
      "kana": "どう しました か"
    }
  },
  {
    "tr": "予約しとくね。",
    "en": "I'll book it (ahead of time).",
    "cat": "everyday",
    "kana": "よやく しとく ね",
    "note": "とく = ておく, 'do in advance / get it done'. Also 買っとく (I'll buy it), 言っとく (I'll tell them).",
    "reg": "casual",
    "pair": {
      "tr": "予約しておきます。",
      "reg": "polite",
      "kana": "よやく して おきます"
    }
  },
  {
    "tr": "やっぱ",
    "en": "as I thought; after all",
    "cat": "everyday",
    "kana": "やっぱ",
    "ex": [
      "やっぱラーメンが一番だね。",
      "Ramen really is the best after all."
    ],
    "note": "Three levels: やはり (formal, written) → やっぱり (everyday) → やっぱ (casual). Also 'on second thought': やっぱやめた。",
    "reg": "casual",
    "pair": {
      "tr": "やはり",
      "reg": "formal",
      "kana": "やはり"
    }
  },
  {
    "tr": "ちょっと聞きたいんだけど…",
    "en": "Can I ask you something?",
    "cat": "everyday",
    "kana": "ちょっと ききたい ん だ けど",
    "note": "Ending on けど… (polite: が…) leaves a request hanging softly — much gentler than asking straight out.",
    "reg": "casual",
    "pair": {
      "tr": "ちょっとお聞きしたいんですが…",
      "reg": "polite",
      "kana": "ちょっと おききしたい ん です が"
    }
  },
  {
    "tr": "いいじゃん！",
    "en": "Nice! That's great!",
    "cat": "everyday",
    "kana": "いい じゃん",
    "note": "じゃん (from じゃない) = 'isn't it?' / 'see?'. Very common in casual speech, especially around Tokyo.",
    "reg": "casual",
    "pair": {
      "tr": "いいですね。",
      "reg": "polite",
      "kana": "いい です ね"
    }
  },
  {
    "tr": "お腹すいた。",
    "en": "I'm hungry.",
    "cat": "everyday",
    "kana": "おなか すいた",
    "note": "Casual speech drops particles like が and を. Same pattern: 疲れた (I'm tired), のど渇いた (I'm thirsty).",
    "reg": "casual",
    "pair": {
      "tr": "お腹がすきました。",
      "reg": "polite",
      "kana": "おなか が すきました"
    }
  },
  {
    "tr": "すいません",
    "en": "sorry; excuse me (spoken)",
    "cat": "everyday",
    "kana": "すいません",
    "note": "How すみません often sounds in quick speech. Fine to say, but write すみません and use it when being careful.",
    "reg": "casual",
    "pair": {
      "tr": "すみません",
      "reg": "polite",
      "kana": "すみません"
    }
  },
  {
    "tr": "どっちがいい？",
    "en": "Which one do you want?",
    "cat": "everyday",
    "kana": "どっち が いい",
    "note": "こっち/そっち/あっち/どっち are the casual forms of こちら/そちら/あちら/どちら (this way, which one…).",
    "reg": "casual",
    "pair": {
      "tr": "どちらがよろしいですか。",
      "reg": "formal",
      "kana": "どちら が よろしい です か"
    }
  },
  {
    "tr": "雨、降るかな。",
    "en": "I wonder if it'll rain.",
    "cat": "everyday",
    "kana": "あめ ふる かな",
    "note": "かな = 'I wonder…', often half to yourself. It also softens requests: 手伝ってくれるかな？ (Could you help?)",
    "reg": "casual",
    "pair": {
      "tr": "雨は降るでしょうか。",
      "reg": "polite",
      "kana": "あめ は ふる でしょう か"
    }
  },
  {
    "tr": "ちょっと待って！",
    "en": "Wait a sec!",
    "cat": "everyday",
    "kana": "ちょっと まって",
    "note": "ちょっと (a little) softens almost anything. Shop staff and phone keigo: 少々お待ちください。",
    "reg": "casual",
    "pair": {
      "tr": "ちょっと待ってください。",
      "reg": "polite",
      "kana": "ちょっと まって ください"
    }
  },
  {
    "tr": "いいよ。",
    "en": "Sure; OK.",
    "cat": "everyday",
    "kana": "いい よ",
    "ex": [
      "「手伝おうか？」「いいよ、大丈夫。」",
      "“Shall I help?” “No, it's fine.”"
    ],
    "note": "Careful: いいよ can mean 'Sure!' or 'No thanks, I'm good' — tone and context decide.",
    "reg": "casual",
    "pair": {
      "tr": "はい、いいですよ。",
      "reg": "polite",
      "kana": "はい いい です よ"
    }
  },
  {
    "tr": "やばい",
    "en": "awesome / terrible (it depends!)",
    "cat": "slang",
    "kana": "やばい",
    "ex": [
      "このケーキ、やばい！",
      "This cake is insanely good!"
    ],
    "note": "Originally 'dangerous, bad'; now also 'amazing' — tone and context tell you which. Avoid with bosses and strangers.",
    "reg": "slang",
    "pair": {
      "tr": "すごいですね。",
      "reg": "polite",
      "en": "That's amazing.",
      "kana": "すごい です ね"
    }
  },
  {
    "tr": "マジで？",
    "en": "Seriously? / For real?",
    "cat": "slang",
    "kana": "マジ で",
    "ex": [
      "マジでおいしい！",
      "This is seriously good!"
    ],
    "note": "マジ = 'serious'. Alone it's 'Seriously?!'; before a word it means 'really'. Casual — not for bosses.",
    "reg": "slang",
    "pair": {
      "tr": "本当ですか。",
      "reg": "polite",
      "en": "Really?",
      "kana": "ほんとう です か"
    }
  },
  {
    "tr": "めっちゃ",
    "en": "super; really",
    "cat": "slang",
    "kana": "めっちゃ",
    "ex": [
      "このラーメン、めっちゃおいしい！",
      "This ramen is super tasty!"
    ],
    "note": "From Kansai dialect, now used nationwide, especially by younger people. Neutral: すごく; polite or written: とても.",
    "reg": "slang",
    "pair": {
      "tr": "とても",
      "reg": "neutral",
      "en": "very",
      "kana": "とても"
    }
  },
  {
    "tr": "すげー！",
    "en": "Whoa, awesome!",
    "cat": "slang",
    "kana": "すげー",
    "note": "A rough, mostly male version of すごい. Same sound change: やばい → やべー, うまい → うめー. Keep it among friends.",
    "reg": "slang",
    "alt": [
      "すげえ"
    ],
    "pair": {
      "tr": "すごい",
      "reg": "neutral",
      "en": "amazing",
      "kana": "すごい"
    }
  },
  {
    "tr": "おつかれ！",
    "en": "Good work! / Hi! / See ya! (to peers)",
    "cat": "slang",
    "kana": "おつかれ",
    "note": "Lit. 'you must be tired'. Hi and bye among coworkers, teammates and classmates. To superiors always say お疲れ様です.",
    "reg": "casual",
    "pair": {
      "tr": "お疲れ様です。",
      "reg": "polite",
      "en": "Thank you for your hard work.",
      "kana": "おつかれさま です"
    }
  },
  {
    "tr": "ガチで",
    "en": "for real; totally",
    "cat": "slang",
    "kana": "ガチ で",
    "ex": [
      "ガチで眠い。",
      "I'm seriously sleepy."
    ],
    "note": "Youth slang from ガチンコ (an all-out, no-holds-barred match). Even stronger than マジで.",
    "reg": "slang",
    "pair": {
      "tr": "本当に",
      "reg": "neutral",
      "en": "really",
      "kana": "ほんとう に"
    }
  },
  {
    "tr": "それな！",
    "en": "Right?! / So true!",
    "cat": "slang",
    "kana": "それ な",
    "note": "Young people's 'Exactly!' when they totally agree, in chats and in person. Too casual for work.",
    "reg": "slang",
    "pair": {
      "tr": "本当にそうですね。",
      "reg": "polite",
      "en": "That's so true.",
      "kana": "ほんとう に そう です ね"
    }
  },
  {
    "tr": "ウケる",
    "en": "That's hilarious; LOL",
    "cat": "slang",
    "kana": "ウケる",
    "note": "From 受ける 'to go over well (with an audience)'. A casual 'LOL' — said flatly, it can also sound a bit sarcastic.",
    "reg": "slang",
    "pair": {
      "tr": "面白いですね。",
      "reg": "polite",
      "en": "That's funny.",
      "kana": "おもしろい です ね"
    }
  },
  {
    "tr": "微妙",
    "en": "meh; iffy; not great",
    "cat": "slang",
    "kana": "びみょう",
    "ex": [
      "「あの映画、どうだった？」「うーん、微妙。」",
      "“How was that movie?” “Hmm, kind of meh.”"
    ],
    "note": "The dictionary meaning is 'subtle', but in speech it's a soft way to say something isn't great.",
    "reg": "casual",
    "pair": {
      "tr": "あまりよくないです。",
      "reg": "polite",
      "en": "It's not very good.",
      "kana": "あまり よくない です"
    }
  },
  {
    "tr": "ぶっちゃけ",
    "en": "to be honest; frankly",
    "cat": "slang",
    "kana": "ぶっちゃけ",
    "ex": [
      "ぶっちゃけ、あんまり好きじゃない。",
      "Honestly, I don't really like it."
    ],
    "note": "From ぶっちゃける 'to spill it all'. A casual lead-in to an honest opinion. Polite: 正直に申しますと.",
    "reg": "slang",
    "pair": {
      "tr": "正直に言うと",
      "reg": "neutral",
      "en": "to be honest",
      "kana": "しょうじき に いう と"
    }
  },
  {
    "tr": "めんどくさい",
    "en": "what a pain; can't be bothered",
    "cat": "slang",
    "kana": "めんどくさい",
    "note": "From 面倒くさい; even shorter: めんどい. Fine with friends — just never say it about work your boss gives you!",
    "reg": "casual",
    "alt": [
      "面倒くさい"
    ],
    "pair": {
      "tr": "面倒です。",
      "reg": "polite",
      "en": "It's a hassle.",
      "kana": "めんどう です"
    }
  },
  {
    "tr": "ありえない！",
    "en": "No way! / Unbelievable!",
    "cat": "slang",
    "kana": "ありえない",
    "ex": [
      "え、また値上げ？ありえない！",
      "What, prices went up again? Unbelievable!"
    ],
    "note": "Lit. 'can't happen'. A reaction to something shocking or ridiculous. Casual — to superiors say 信じられません.",
    "reg": "casual",
    "pair": {
      "tr": "信じられません。",
      "reg": "polite",
      "en": "I can't believe it.",
      "kana": "しんじられません"
    }
  },
  {
    "tr": "ドンマイ",
    "en": "Don't worry about it! (after a mistake)",
    "cat": "slang",
    "kana": "ドンマイ",
    "note": "From English 'don't mind'. Cheers up a friend or teammate who messed up — very common in sports.",
    "reg": "casual",
    "pair": {
      "tr": "気にしないでください。",
      "reg": "polite",
      "kana": "き に しないで ください"
    }
  },
  {
    "tr": "あざっす",
    "en": "Thanks! (very casual)",
    "cat": "slang",
    "kana": "あざっす",
    "note": "A slurred ありがとうございます, used mainly by young men, sports teams and part-timers among themselves. Not for customers or bosses.",
    "reg": "slang",
    "alt": [
      "あざす"
    ],
    "pair": {
      "tr": "ありがとうございます。",
      "reg": "polite",
      "en": "Thank you.",
      "kana": "ありがとう ございます"
    }
  },
  {
    "tr": "了解！",
    "en": "Got it! / Roger!",
    "cat": "slang",
    "kana": "りょうかい",
    "note": "Used a lot in messages with friends (even shortened to りょ). With bosses or clients, say 承知しました or かしこまりました.",
    "reg": "casual",
    "pair": {
      "tr": "承知しました。",
      "reg": "formal",
      "en": "Understood. (formal)",
      "kana": "しょうち しました"
    }
  },
  {
    "tr": "よっしゃ！",
    "en": "Yes! / Alright!",
    "cat": "slang",
    "kana": "よっしゃ",
    "note": "A fist-pump cheer when something goes your way. やった！ is the neutral version anyone can use.",
    "reg": "slang",
    "pair": {
      "tr": "やった！",
      "reg": "neutral",
      "en": "I did it! / Yay!",
      "kana": "やった"
    }
  },
  {
    "tr": "しょうがない",
    "en": "It can't be helped; oh well",
    "cat": "slang",
    "kana": "しょうがない",
    "note": "Shrugging off what you can't change — you'll hear it constantly. Neutral: 仕方ない (しかたない).",
    "reg": "casual",
    "pair": {
      "tr": "仕方がありません。",
      "reg": "polite",
      "kana": "しかた が ありません"
    }
  },
  {
    "tr": "とりあえずビール！",
    "en": "A beer to start with!",
    "cat": "slang",
    "kana": "とりあえず ビール",
    "note": "The classic first order at an izakaya. とりあえず (for now, to start) is used all the time: とりあえず行ってみよう。",
    "reg": "casual",
    "pair": {
      "tr": "まずはビールをお願いします。",
      "reg": "polite",
      "kana": "まず は ビール を おねがい します"
    }
  },
  {
    "tr": "うまい！",
    "en": "Tasty! / Delicious!",
    "cat": "slang",
    "kana": "うまい",
    "note": "Common, especially among men (おいしい is neutral). Clipped slang: うまっ！ Also 'skilful': 歌がうまい (good at singing).",
    "reg": "casual",
    "alt": [
      "美味い",
      "旨い"
    ],
    "pair": {
      "tr": "おいしいです。",
      "reg": "polite",
      "en": "It's delicious.",
      "kana": "おいしい です"
    }
  },
  {
    "tr": "頑張って！",
    "en": "Good luck! / You can do it!",
    "cat": "slang",
    "kana": "がんばって",
    "note": "Cheers someone on before exams, games or a tough day; reply 頑張ります！ To a boss, 応援しています sounds more respectful.",
    "reg": "casual",
    "pair": {
      "tr": "頑張ってください。",
      "reg": "polite",
      "kana": "がんばって ください"
    }
  }
];
