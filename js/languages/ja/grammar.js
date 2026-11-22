// Grammar lessons (explanations, tables, examples, quiz). Written and proofread
// with AI assistance; not yet reviewed by native speakers. Edit freely.
export const lessons = [
  {
    "id": "x-wa-y-desu",
    "title": "X は Y です: “X is Y”",
    "level": "A1",
    "summary": "Build your first Japanese sentence and say what something is, isn’t, was or wasn’t.",
    "sections": [
      {
        "heading": "The basic pattern",
        "body": "The simplest Japanese sentence is **X は Y です**: “X is Y”. **は** marks the topic, the thing you are talking about. As a particle it is always pronounced **wa**, even though the kana は normally reads “ha”. **です** means “is / am / are” and makes the sentence polite; its final u is barely heard (“dess”).\n\nThere is no “a” or “the”, no plural ending, and です never changes for I, you or they: 学生です can mean “I’m a student”, “she’s a student” or “they’re students”. To change the meaning, change the ending of です. For the negative you will also hear じゃありません, and in writing ではありません.",
        "table": {
          "head": [
            "Form",
            "Polite",
            "Meaning"
          ],
          "rows": [
            [
              "Present",
              "学生**です**",
              "am / is / are a student"
            ],
            [
              "Negative",
              "学生**じゃないです**",
              "am not a student"
            ],
            [
              "Past",
              "学生**でした**",
              "was a student"
            ],
            [
              "Past negative",
              "学生**じゃなかったです**",
              "was not a student"
            ]
          ]
        },
        "examples": [
          {
            "tr": "私はエンジニアです。",
            "en": "I’m an engineer.",
            "kana": "わたし は エンジニア です",
            "note": "Loanwords like エンジニア are written in katakana."
          },
          {
            "tr": "私は日本人じゃないです。",
            "en": "I’m not Japanese.",
            "kana": "わたし は にほんじん じゃない です",
            "note": "More formal: 日本人ではありません。"
          },
          {
            "tr": "昨日は日曜日でした。",
            "en": "Yesterday was Sunday.",
            "kana": "きのう は にちようび でした",
            "note": "でした is the past of です."
          }
        ]
      },
      {
        "heading": "Leave out what’s obvious",
        "body": "Japanese drops anything that is clear from context, especially 私は (“I”). When you introduce yourself, just say your name + です. Repeating 私は in every sentence sounds stiff.\n\nInstead of あなた (“you”), which can sound too direct, use the person’s name + **さん**: 田中さん, マリアさん. さん works like Mr or Ms for anyone, but never add it to your own name.",
        "examples": [
          {
            "tr": "はじめまして。トムです。よろしくお願いします。",
            "en": "Nice to meet you. I’m Tom. I look forward to getting to know you.",
            "kana": "はじめまして トム です よろしく おねがい します",
            "note": "No 私は needed. よろしくお願いします ends almost every introduction."
          },
          {
            "tr": "会社員です。",
            "en": "I’m an office worker.",
            "kana": "かいしゃいん です",
            "note": "The topic 私は is understood."
          },
          {
            "tr": "鈴木さんは医者です。",
            "en": "Ms Suzuki is a doctor.",
            "kana": "すずき さん は いしゃ です",
            "note": "さん = Mr / Ms, for men and women alike."
          }
        ]
      },
      {
        "heading": "これ, それ, あれ: this and that",
        "body": "Japanese points at things from three distances. **こ-** words are near me, **そ-** words are near you, and **あ-** words are far from both of us. **ど-** words ask “which?”. これ, それ and あれ stand on their own, but この, その and あの must have a noun after them.",
        "table": {
          "head": [
            "Distance",
            "Thing",
            "+ noun",
            "Place"
          ],
          "rows": [
            [
              "Near me (こ)",
              "これ this one",
              "この本 this book",
              "ここ here"
            ],
            [
              "Near you (そ)",
              "それ that one",
              "その本 that book",
              "そこ there"
            ],
            [
              "Far from both (あ)",
              "あれ that one over there",
              "あの本 that book over there",
              "あそこ over there"
            ],
            [
              "Question (ど)",
              "どれ which one?",
              "どの本 which book?",
              "どこ where?"
            ]
          ]
        },
        "examples": [
          {
            "tr": "あれは東京タワーです。",
            "en": "That (over there) is Tokyo Tower.",
            "kana": "あれ は とうきょう タワー です"
          },
          {
            "tr": "このかばんは私のです。",
            "en": "This bag is mine.",
            "kana": "この かばん は わたし の です",
            "note": "この + noun. 私の = my, 私のです = it’s mine."
          },
          {
            "tr": "ここは私の部屋です。",
            "en": "This is my room.",
            "kana": "ここ は わたし の へや です",
            "note": "Literally “Here is my room”."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How is the particle は pronounced in 私は学生です？",
        "options": [
          "ha",
          "ba",
          "wa",
          "e"
        ],
        "answer": 2,
        "explain": "As the topic particle, は is always read wa, even though it is written with the kana for ha."
      },
      {
        "q": "How do you say “I’m not a teacher”?",
        "options": [
          "先生でした。",
          "先生じゃないです。",
          "先生です。",
          "先生じゃなかったです。"
        ],
        "answer": 1,
        "explain": "じゃないです (formal: ではありません) is the negative of です."
      },
      {
        "q": "Which sentence means “Yesterday was Sunday”?",
        "options": [
          "昨日は日曜日です。",
          "昨日は日曜日じゃないです。",
          "昨日は日曜日じゃなかったです。",
          "昨日は日曜日でした。"
        ],
        "answer": 3,
        "explain": "でした is the past of です."
      },
      {
        "q": "You are holding a book. How do you say “this book”?",
        "options": [
          "この本",
          "これ本",
          "ここ本",
          "その本"
        ],
        "answer": 0,
        "explain": "この (not これ) goes directly before a noun, and こ- means near the speaker."
      }
    ]
  },
  {
    "id": "questions",
    "title": "Questions: か and question words",
    "level": "A1",
    "summary": "Turn any sentence into a question with か, and ask who, what, where and when.",
    "sections": [
      {
        "heading": "Just add か",
        "body": "To ask a polite question, put **か** at the end of the sentence. Nothing else moves, and your voice rises a little at the end. In writing, a か-question normally ends with 。 because か already shows it is a question; ？ is more common in casual messages.\n\nAnswer with **はい** (yes) or **いいえ** (no). When the question ends in noun + ですか, people often say そうです (“that’s right”) or 違います (“that’s not right”) instead of repeating the whole sentence. For a verb question, repeat the verb: 行きますか → はい、行きます / いいえ、行きません.",
        "examples": [
          {
            "tr": "学生ですか。",
            "en": "Are you a student?",
            "kana": "がくせい です か"
          },
          {
            "tr": "はい、そうです。",
            "en": "Yes, I am.",
            "kana": "はい そう です",
            "note": "Literally “Yes, that’s so.”"
          },
          {
            "tr": "いいえ、違います。",
            "en": "No, I’m not.",
            "kana": "いいえ ちがいます",
            "note": "Literally “No, that’s wrong.”"
          }
        ]
      },
      {
        "heading": "Question words",
        "body": "A question word sits exactly where the answer will go, so the word order stays the same: 駅は**どこ**ですか (Where is the station?) → 駅は**あそこ**です (The station is over there). 何 is read **なに** before particles like を, が and も, but **なん** before です, の and counters (何時, 何人).",
        "table": {
          "head": [
            "Question word",
            "Meaning",
            "Example"
          ],
          "rows": [
            [
              "何 (なに / なん)",
              "what",
              "これは何ですか。 What is this?"
            ],
            [
              "誰 (だれ)",
              "who",
              "あの人は誰ですか。 Who is that?"
            ],
            [
              "どこ",
              "where",
              "トイレはどこですか。 Where is the toilet?"
            ],
            [
              "いつ",
              "when",
              "誕生日はいつですか。 When is your birthday?"
            ],
            [
              "どうして / なんで",
              "why (なんで is more casual)",
              "どうしてですか。 Why?"
            ],
            [
              "どう",
              "how (is it)",
              "日本はどうですか。 How do you like Japan?"
            ],
            [
              "いくら",
              "how much (price)",
              "これはいくらですか。 How much is this?"
            ],
            [
              "いくつ",
              "how many; how old",
              "おいくつですか。 How old are you? (polite)"
            ],
            [
              "どれ / どの",
              "which",
              "どれがいいですか。 Which one would you like?"
            ]
          ]
        },
        "examples": [
          {
            "tr": "郵便局はどこですか。",
            "en": "Where is the post office?",
            "kana": "ゆうびんきょく は どこ です か"
          },
          {
            "tr": "あの人は誰ですか。",
            "en": "Who is that person?",
            "kana": "あの ひと は だれ です か",
            "note": "More polite: あの方はどなたですか。"
          },
          {
            "tr": "何を食べますか。",
            "en": "What are you going to eat?",
            "kana": "なに を たべます か",
            "note": "何 is read なに before を."
          },
          {
            "tr": "今、何時ですか。",
            "en": "What time is it now?",
            "kana": "いま なんじ です か",
            "note": "何 is read なん before a counter (時 = o’clock)."
          }
        ]
      },
      {
        "heading": "Something, nothing, anywhere",
        "body": "Add **か** to a question word to get “some-”: 何か (something), 誰か (someone), どこか (somewhere). Add **も** and use a negative verb to get “no-”: 何も…ません (nothing), 誰も…ません (nobody). With places, keep the particle before も: どこ**にも**行きません (I’m not going anywhere).",
        "table": {
          "head": [
            "Question word",
            "+ か: some-",
            "+ も + negative: no-"
          ],
          "rows": [
            [
              "何 what",
              "何か something",
              "何も nothing"
            ],
            [
              "誰 who",
              "誰か someone",
              "誰も nobody"
            ],
            [
              "どこ where",
              "どこか somewhere",
              "どこにも nowhere"
            ]
          ]
        },
        "examples": [
          {
            "tr": "何か飲みますか。",
            "en": "Would you like something to drink?",
            "kana": "なに か のみます か"
          },
          {
            "tr": "誰もいません。",
            "en": "Nobody is here.",
            "kana": "だれ も いません",
            "note": "誰も + a negative verb = nobody."
          },
          {
            "tr": "昨日はどこにも行きませんでした。",
            "en": "I didn’t go anywhere yesterday.",
            "kana": "きのう は どこ に も いきません でした"
          }
        ]
      },
      {
        "heading": "ね and よ at the end",
        "body": "Two tiny particles at the end of a sentence add a lot of feeling. **ね** looks for agreement, like “…isn’t it?” or “right?”. **よ** tells the listener something they may not know, like “…you know” or “I’m telling you”. Both are everyday words in polite and casual speech.",
        "examples": [
          {
            "tr": "今日は暑いですね。",
            "en": "It’s hot today, isn’t it?",
            "kana": "きょう は あつい です ね",
            "note": "ね: you expect the other person to agree."
          },
          {
            "tr": "この店は安いですよ。",
            "en": "This shop is cheap, you know.",
            "kana": "この みせ は やすい です よ",
            "note": "よ: you are giving new information."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you turn 学生です (I’m a student) into a question?",
        "options": [
          "か学生です。",
          "学生かです。",
          "学生ですか。",
          "学生ですね。"
        ],
        "answer": 2,
        "explain": "Just add か at the end; nothing else changes."
      },
      {
        "q": "Which sentence asks “Where is the station?”",
        "options": [
          "駅はいつですか。",
          "駅はどこですか。",
          "駅は誰ですか。",
          "駅は何ですか。"
        ],
        "answer": 1,
        "explain": "どこ means where; いつ is when, 誰 is who and 何 is what."
      },
      {
        "q": "How is 何 read in 何ですか？",
        "options": [
          "なに",
          "なぜ",
          "なの",
          "なん"
        ],
        "answer": 3,
        "explain": "Before です (and before counters) 何 is read なん."
      },
      {
        "q": "How do you say “Nobody is here”?",
        "options": [
          "誰もいません。",
          "誰かいます。",
          "誰がいません。",
          "誰もいます。"
        ],
        "answer": 0,
        "explain": "誰も followed by a negative verb means “nobody”."
      }
    ]
  },
  {
    "id": "verbs-masu",
    "title": "Verbs and the polite ます form",
    "level": "A1",
    "summary": "Sort verbs into three groups, make the ます form, and say do, don’t, did and didn’t.",
    "sections": [
      {
        "heading": "Three verb groups",
        "body": "Verbs are listed in the **dictionary form**, which always ends in an -u sound: 飲む, 食べる, する. Before you can change a verb, you need to know its group. Watch out for a few verbs that end in -iru or -eru but belong to **Group 1**: 帰る (go home), 入る (enter), 走る (run) and 知る (know).",
        "table": {
          "head": [
            "Group",
            "How to spot it",
            "Examples"
          ],
          "rows": [
            [
              "Group 1 (u-verbs)",
              "Most verbs",
              "飲む drink · 書く write · 話す speak · 買う buy · 待つ wait"
            ],
            [
              "Group 2 (ru-verbs)",
              "Most verbs ending in -iru or -eru",
              "食べる eat · 見る see · 寝る sleep · 起きる get up"
            ],
            [
              "Group 3 (irregular)",
              "Only two verbs",
              "する do · 来る (くる) come"
            ]
          ]
        }
      },
      {
        "heading": "Making the ます form",
        "body": "The **ます form** is the polite verb form for anyone you don’t know well. **Group 1**: change the final -u sound to its -i partner and add ます (飲**む** → 飲**み**ます, 話**す** → 話**し**ます, 待**つ** → 待**ち**ます). **Group 2**: drop る and add ます (食べる → 食べます). **Group 3**: する → します, 来る → 来ます (read きます).\n\nThe ます form is **non-past**: it means both “I do (usually)” and “I will do”. A time word or the context tells you which.",
        "table": {
          "head": [
            "Dictionary form",
            "ます form",
            "Meaning"
          ],
          "rows": [
            [
              "飲む (のむ)",
              "飲みます",
              "drink"
            ],
            [
              "書く (かく)",
              "書きます",
              "write"
            ],
            [
              "話す (はなす)",
              "話します",
              "speak"
            ],
            [
              "待つ (まつ)",
              "待ちます",
              "wait"
            ],
            [
              "買う (かう)",
              "買います",
              "buy"
            ],
            [
              "帰る (かえる)",
              "帰ります",
              "go home"
            ],
            [
              "食べる (たべる)",
              "食べます",
              "eat"
            ],
            [
              "見る (みる)",
              "見ます",
              "see; watch"
            ],
            [
              "する",
              "します",
              "do"
            ],
            [
              "来る (くる)",
              "来ます (きます)",
              "come"
            ]
          ]
        },
        "examples": [
          {
            "tr": "毎日コーヒーを飲みます。",
            "en": "I drink coffee every day.",
            "kana": "まいにち コーヒー を のみます",
            "note": "を marks the object (see the particles lesson)."
          },
          {
            "tr": "明日、京都に行きます。",
            "en": "I’m going to Kyoto tomorrow.",
            "kana": "あした きょうと に いきます",
            "note": "The same form with a future meaning."
          },
          {
            "tr": "何時に帰りますか。",
            "en": "What time will you go home?",
            "kana": "なんじ に かえります か"
          },
          {
            "tr": "週末はテニスをします。",
            "en": "I play tennis at the weekend.",
            "kana": "しゅうまつ は テニス を します"
          }
        ]
      },
      {
        "heading": "Don’t, did, didn’t",
        "body": "Once you have the ます form, the other polite forms are completely regular: just swap the ending. This works for every verb, including する and 来る. To say “not yet”, use **まだです** rather than a negative past.",
        "table": {
          "head": [
            "",
            "Affirmative",
            "Negative"
          ],
          "rows": [
            [
              "Non-past",
              "食べ**ます** eat / will eat",
              "食べ**ません** don’t / won’t eat"
            ],
            [
              "Past",
              "食べ**ました** ate",
              "食べ**ませんでした** didn’t eat"
            ]
          ]
        },
        "examples": [
          {
            "tr": "昨日、映画を見ました。",
            "en": "I watched a film yesterday.",
            "kana": "きのう えいが を みました"
          },
          {
            "tr": "肉は食べません。",
            "en": "I don’t eat meat.",
            "kana": "にく は たべません"
          },
          {
            "tr": "今朝は朝ご飯を食べませんでした。",
            "en": "I didn’t have breakfast this morning.",
            "kana": "けさ は あさごはん を たべません でした"
          },
          {
            "tr": "もう晩ご飯を食べましたか。",
            "en": "Have you had dinner yet?",
            "kana": "もう ばんごはん を たべました か"
          },
          {
            "tr": "いいえ、まだです。",
            "en": "No, not yet.",
            "kana": "いいえ まだ です",
            "note": "食べませんでした would sound as if dinnertime is over and you skipped it."
          }
        ]
      },
      {
        "heading": "Let’s…: ましょう and ませんか",
        "body": "Change ます to **ましょう** for “let’s…”, and to **ましょうか** for “shall we…?” or “shall I…?”. A negative question, **～ませんか** (“won’t you…?”), is the polite way to invite someone.",
        "examples": [
          {
            "tr": "一緒に昼ご飯を食べませんか。",
            "en": "Would you like to have lunch together?",
            "kana": "いっしょ に ひるごはん を たべません か",
            "note": "～ませんか: a polite invitation."
          },
          {
            "tr": "いいですね。行きましょう。",
            "en": "Sounds good. Let’s go!",
            "kana": "いい です ね いきましょう"
          },
          {
            "tr": "ちょっと休みましょうか。",
            "en": "Shall we take a short break?",
            "kana": "ちょっと やすみましょう か"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which group does 食べる (eat) belong to?",
        "options": [
          "Group 1 (u-verbs)",
          "Group 3 (irregular)",
          "Group 2 (ru-verbs)",
          "It depends on the sentence"
        ],
        "answer": 2,
        "explain": "食べる ends in -eru and is a regular Group 2 verb: 食べます."
      },
      {
        "q": "What is the ます form of 帰る (go home)?",
        "options": [
          "帰ます",
          "帰るます",
          "帰きます",
          "帰ります"
        ],
        "answer": 3,
        "explain": "帰る looks like a Group 2 verb but is Group 1, so る becomes り before ます."
      },
      {
        "q": "How do you say “I didn’t go”?",
        "options": [
          "行きません。",
          "行きませんでした。",
          "行きました。",
          "行きましょう。"
        ],
        "answer": 1,
        "explain": "ませんでした is the polite past negative."
      },
      {
        "q": "A colleague says 一緒に行きませんか。 What is she doing?",
        "options": [
          "Saying she won’t go",
          "Inviting you to go with her",
          "Asking why you didn’t go",
          "Telling you not to go"
        ],
        "answer": 1,
        "explain": "～ませんか (“won’t you…?”) is a polite invitation."
      }
    ]
  },
  {
    "id": "particles",
    "title": "Particles を, に, で, へ, と, も, の",
    "level": "A1",
    "summary": "Learn the small words after a noun that show its job in the sentence.",
    "sections": [
      {
        "heading": "Little tags after words",
        "body": "A **particle** comes right after a word and shows its job in the sentence, like the English words “to”, “at” or “with”, but placed after the noun. The verb always comes last, and because the particles carry the meaning, the other parts of the sentence can be ordered quite freely. Watch two readings: the particle **へ** is read **e**, not “he”, and **を** (sometimes romanised “wo”) is pronounced **o**, the same sound as お.",
        "table": {
          "head": [
            "Particle",
            "Job",
            "Example"
          ],
          "rows": [
            [
              "を (o)",
              "direct object",
              "水**を**飲みます drink water"
            ],
            [
              "に (ni)",
              "point in time; destination; where something is; “to” a person",
              "7時**に**起きます get up at 7"
            ],
            [
              "で (de)",
              "where an action happens; by means of",
              "駅**で**会います meet at the station"
            ],
            [
              "へ (e)",
              "direction: towards",
              "日本**へ**行きます go to Japan"
            ],
            [
              "と (to)",
              "and (between nouns); with",
              "友達**と**行きます go with a friend"
            ],
            [
              "も (mo)",
              "also, too",
              "私**も**行きます I’m going too"
            ],
            [
              "の (no)",
              "’s, of: links two nouns",
              "私**の**本 my book"
            ]
          ]
        }
      },
      {
        "heading": "に or で?",
        "body": "Both can mean “at” or “in”, so learners often mix them up. **に** marks where something **exists** (with あります / います), where you **go**, and a **point in time**. **で** marks where an **action happens**, and the **means** you use: by train, with chopsticks, in Japanese.",
        "examples": [
          {
            "tr": "毎朝、六時に起きます。",
            "en": "I get up at six every morning.",
            "kana": "まいあさ ろくじ に おきます",
            "note": "に: a point in time."
          },
          {
            "tr": "部屋に猫がいます。",
            "en": "There’s a cat in the room.",
            "kana": "へや に ねこ が います",
            "note": "に: where something is."
          },
          {
            "tr": "駅で友達に会います。",
            "en": "I’m meeting a friend at the station.",
            "kana": "えき で ともだち に あいます",
            "note": "で: where the action happens. 会う takes に for the person you meet."
          },
          {
            "tr": "電車で会社に行きます。",
            "en": "I go to work by train.",
            "kana": "でんしゃ で かいしゃ に いきます",
            "note": "で: the means; に: the destination."
          }
        ]
      },
      {
        "heading": "と, も, の and へ",
        "body": "**と** joins nouns (“A and B”) and also means “with” a person. **も** means “also” and **replaces** は, が or を: say 私も, never 私はも. After other particles, も is simply added: 東京にも (to Tokyo too). **の** links two nouns: 私の傘 (my umbrella), 日本の車 (a Japanese car). **へ** shows direction; for a destination, へ and に are both fine.",
        "examples": [
          {
            "tr": "パンと卵を買いました。",
            "en": "I bought bread and eggs.",
            "kana": "パン と たまご を かいました"
          },
          {
            "tr": "週末、友達と映画を見ます。",
            "en": "I’m watching a film with a friend at the weekend.",
            "kana": "しゅうまつ ともだち と えいが を みます",
            "note": "と: with."
          },
          {
            "tr": "私もコーヒーをお願いします。",
            "en": "A coffee for me too, please.",
            "kana": "わたし も コーヒー を おねがい します",
            "note": "も replaces は."
          },
          {
            "tr": "これは母の車です。",
            "en": "This is my mother’s car.",
            "kana": "これ は はは の くるま です",
            "note": "の = ’s. 母 is “my mother” when talking to others."
          },
          {
            "tr": "来月、日本へ行きます。",
            "en": "I’m going to Japan next month.",
            "kana": "らいげつ にほん へ いきます",
            "note": "The particle へ is read e."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Fill in the gap: 電車＿学校に行きます。 (I go to school by train.)",
        "options": [
          "を",
          "で",
          "に",
          "の"
        ],
        "answer": 1,
        "explain": "で marks the means of doing something, such as a train."
      },
      {
        "q": "Fill in the gap: 図書館＿勉強します。 (I study at the library.)",
        "options": [
          "で",
          "に",
          "を",
          "へ"
        ],
        "answer": 0,
        "explain": "Studying is an action, so the place where it happens takes で."
      },
      {
        "q": "Which particle marks the direct object, the thing you eat, drink or buy?",
        "options": [
          "の",
          "と",
          "も",
          "を"
        ],
        "answer": 3,
        "explain": "を (read o) marks the direct object: 水を飲みます."
      },
      {
        "q": "How do you say “I’m a student too”?",
        "options": [
          "私はも学生です。",
          "私も学生です。",
          "私の学生です。",
          "私と学生です。"
        ],
        "answer": 1,
        "explain": "も replaces は, so you never say はも."
      }
    ]
  },
  {
    "id": "adjectives",
    "title": "い-adjectives and な-adjectives",
    "level": "A1",
    "summary": "Describe things with the two kinds of Japanese adjectives and make them negative and past.",
    "sections": [
      {
        "heading": "Two families",
        "body": "**い-adjectives** end in い and change their own endings: 高い (expensive, tall), 寒い (cold), 美味しい (tasty). **な-adjectives** behave more like nouns and need **な** before a noun: 静か (quiet), 元気 (well, lively), 有名 (famous), 好き (liked). A few な-adjectives happen to end in い; the common ones are **きれい** (pretty, clean) and **嫌い** (disliked).",
        "examples": [
          {
            "tr": "富士山は高い山です。",
            "en": "Mount Fuji is a high mountain.",
            "kana": "ふじさん は たかい やま です",
            "note": "An い-adjective goes straight in front of the noun."
          },
          {
            "tr": "静かな町が好きです。",
            "en": "I like quiet towns.",
            "kana": "しずかな まち が すき です",
            "note": "A な-adjective adds な before a noun."
          }
        ]
      },
      {
        "heading": "Changing the ending",
        "body": "With an い-adjective the tense is inside the adjective, and です only adds politeness. With a な-adjective, the です part changes, just as it does after a noun. **いい** (good) is irregular: its other forms are built on よい, so you get よくない, よかった and よくなかった.",
        "table": {
          "head": [
            "",
            "い-adjective: 高い",
            "な-adjective: 静か"
          ],
          "rows": [
            [
              "Before a noun",
              "高い店",
              "静かな店"
            ],
            [
              "Present",
              "高いです",
              "静かです"
            ],
            [
              "Negative",
              "高**くない**です",
              "静か**じゃない**です"
            ],
            [
              "Past",
              "高**かった**です",
              "静か**でした**"
            ],
            [
              "Past negative",
              "高**くなかった**です",
              "静か**じゃなかった**です"
            ]
          ]
        },
        "examples": [
          {
            "tr": "昨日はとても寒かったです。",
            "en": "It was very cold yesterday.",
            "kana": "きのう は とても さむかった です"
          },
          {
            "tr": "このカレーは辛くないです。",
            "en": "This curry isn’t spicy.",
            "kana": "この カレー は からくない です"
          },
          {
            "tr": "天気がよかったです。",
            "en": "The weather was nice.",
            "kana": "てんき が よかった です",
            "note": "いい → よかった, never いかった."
          },
          {
            "tr": "京都はきれいでした。",
            "en": "Kyoto was beautiful.",
            "kana": "きょうと は きれい でした",
            "note": "きれい is a な-adjective, so its past is きれいでした."
          },
          {
            "tr": "映画はあまり面白くなかったです。",
            "en": "The film wasn’t very interesting.",
            "kana": "えいが は あまり おもしろくなかった です",
            "note": "あまり + negative = not very."
          }
        ]
      },
      {
        "heading": "Common mistakes",
        "body": "**✗ 高いでした** → ✓ 高かったです. The past goes on the い-adjective, not on です.\n\n**✗ きれくない** → ✓ きれいじゃない. きれい is a な-adjective, so you never cut off its い.\n\n**✗ 静か町** → ✓ 静かな町. Don’t forget な before a noun."
      }
    ],
    "quiz": [
      {
        "q": "What is the past of 寒いです (it’s cold)?",
        "options": [
          "寒いでした",
          "寒くでした",
          "寒かったです",
          "寒いだったです"
        ],
        "answer": 2,
        "explain": "An い-adjective takes the past itself: 寒い → 寒かった, plus です for politeness."
      },
      {
        "q": "How do you say “a quiet room”?",
        "options": [
          "静かな部屋",
          "静か部屋",
          "静かい部屋",
          "静かの部屋"
        ],
        "answer": 0,
        "explain": "静か is a な-adjective, so it needs な before a noun."
      },
      {
        "q": "What is the negative of きれいです?",
        "options": [
          "きれくないです",
          "きれいくないです",
          "きれかったです",
          "きれいじゃないです"
        ],
        "answer": 3,
        "explain": "きれい is a な-adjective, so you add じゃない instead of changing い."
      },
      {
        "q": "How do you say “it was good”?",
        "options": [
          "いかったです",
          "よかったです",
          "いいでした",
          "よいでした"
        ],
        "answer": 1,
        "explain": "いい is irregular: its past is よかった."
      }
    ]
  },
  {
    "id": "numbers-counters",
    "title": "Numbers and counters",
    "level": "A1",
    "summary": "Count past 10,000 and use the right counter for people, things and animals.",
    "sections": [
      {
        "heading": "Big numbers",
        "body": "Numbers are built from their parts: 23 is 二十三 (にじゅうさん, “two tens and three”) and 456 is 四百五十六 (よんひゃくごじゅうろく). 1,000 is just 千 (せん), with no 一 in front. A few hundreds and thousands change their sound (see the table). Big numbers go up in units of **万** (まん, 10,000) rather than thousands. Unlike 千, it needs the 一: 10,000 is 一万 (いちまん), 100,000 is 十万 (じゅうまん) and a million is 百万 (ひゃくまん).",
        "table": {
          "head": [
            "Number",
            "Written",
            "Reading"
          ],
          "rows": [
            [
              "300",
              "三百",
              "さん**びゃく**"
            ],
            [
              "600",
              "六百",
              "ろっ**ぴゃく**"
            ],
            [
              "800",
              "八百",
              "はっ**ぴゃく**"
            ],
            [
              "3,000",
              "三千",
              "さん**ぜん**"
            ],
            [
              "8,000",
              "八千",
              "はっ**せん**"
            ],
            [
              "10,000",
              "一万",
              "いちまん"
            ],
            [
              "100,000",
              "十万",
              "じゅうまん"
            ]
          ]
        },
        "examples": [
          {
            "tr": "この本は千五百円です。",
            "en": "This book is 1,500 yen.",
            "kana": "この ほん は せんごひゃくえん です"
          },
          {
            "tr": "全部で三万円です。",
            "en": "That’s 30,000 yen altogether.",
            "kana": "ぜんぶ で さんまんえん です",
            "note": "30,000 = three 万."
          }
        ]
      },
      {
        "heading": "Counters",
        "body": "Japanese doesn’t put a number straight onto a noun. Instead it adds a **counter** that depends on what you are counting, a bit like “two **sheets** of paper” or “three **cups** of tea” in English, but for everything. The usual order is **noun + particle + number and counter + verb**: りんごを三つください. To ask “how many?”, use 何 + counter, or いくつ for the つ series.",
        "table": {
          "head": [
            "Counter",
            "Used for",
            "1",
            "2",
            "3",
            "How many?"
          ],
          "rows": [
            [
              "つ",
              "general things (up to 10)",
              "ひとつ",
              "ふたつ",
              "みっつ",
              "いくつ"
            ],
            [
              "人 (にん)",
              "people",
              "ひとり",
              "ふたり",
              "さんにん",
              "なんにん"
            ],
            [
              "枚 (まい)",
              "flat things: tickets, paper, shirts",
              "いちまい",
              "にまい",
              "さんまい",
              "なんまい"
            ],
            [
              "本 (ほん)",
              "long things: bottles, pens, umbrellas",
              "いっぽん",
              "にほん",
              "さんぼん",
              "なんぼん"
            ],
            [
              "匹 (ひき)",
              "small animals: cats, dogs, fish",
              "いっぴき",
              "にひき",
              "さんびき",
              "なんびき"
            ],
            [
              "杯 (はい)",
              "cups, glasses, bowls",
              "いっぱい",
              "にはい",
              "さんばい",
              "なんばい"
            ],
            [
              "歳 (さい)",
              "years of age",
              "いっさい",
              "にさい",
              "さんさい",
              "なんさい"
            ]
          ]
        },
        "examples": [
          {
            "tr": "りんごを三つください。",
            "en": "Three apples, please.",
            "kana": "りんご を みっつ ください"
          },
          {
            "tr": "切符を二枚お願いします。",
            "en": "Two tickets, please.",
            "kana": "きっぷ を にまい おねがい します",
            "note": "Tickets are flat, so they take 枚."
          },
          {
            "tr": "うちには猫が二匹います。",
            "en": "We have two cats at home.",
            "kana": "うち に は ねこ が にひき います"
          }
        ]
      },
      {
        "heading": "People, ages and times",
        "body": "One and two people are irregular: **ひとり**, **ふたり**, then さんにん, よにん. The age of 20 has its own word, **はたち** (二十歳). For clock times, add 時 (じ), but note 4 o’clock is **よじ**, 7 o’clock is **しちじ** and 9 o’clock is **くじ**.",
        "examples": [
          {
            "tr": "四人です。",
            "en": "There are four of us.",
            "kana": "よにん です",
            "note": "Your answer when restaurant staff ask 何名様ですか (How many in your party?)."
          },
          {
            "tr": "妹は二十歳です。",
            "en": "My younger sister is twenty.",
            "kana": "いもうと は はたち です",
            "note": "Age 20 is normally はたち rather than にじゅっさい."
          },
          {
            "tr": "一人で来ました。",
            "en": "I came on my own.",
            "kana": "ひとり で きました"
          },
          {
            "tr": "会議は四時からです。",
            "en": "The meeting is from four o’clock.",
            "kana": "かいぎ は よじ から です"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “two people”?",
        "options": [
          "ににん",
          "ふたり",
          "ふたつ",
          "にまい"
        ],
        "answer": 1,
        "explain": "One and two people are irregular: ひとり, ふたり."
      },
      {
        "q": "Which counter do you use for tickets?",
        "options": [
          "枚 (まい)",
          "本 (ほん)",
          "匹 (ひき)",
          "杯 (はい)"
        ],
        "answer": 0,
        "explain": "枚 counts flat things such as tickets, paper and shirts."
      },
      {
        "q": "How is 600 read?",
        "options": [
          "ろくひゃく",
          "ろくびゃく",
          "ろっひゃく",
          "ろっぴゃく"
        ],
        "answer": 3,
        "explain": "六 + 百 changes its sound to ろっぴゃく."
      },
      {
        "q": "How do you say “Three apples, please”?",
        "options": [
          "りんごを三人ください。",
          "りんごを三つください。",
          "りんごを三枚ください。",
          "三りんごをください。"
        ],
        "answer": 1,
        "explain": "Apples are general things, so they take the つ counter, placed after the noun and particle."
      }
    ]
  },
  {
    "id": "wa-vs-ga",
    "title": "は vs が: topic and subject",
    "level": "A2",
    "summary": "Learn when to use は (the topic) and when to use が (the subject), the most famous puzzle in Japanese.",
    "sections": [
      {
        "heading": "Topic and subject",
        "body": "**は** marks the **topic**: “as for X…”. It sets the scene with something already known, and the important information comes after it. **が** marks the **subject** and puts the spotlight on it: “X is the one that…”. A handy rule of thumb: with は, the news is at the end of the sentence; with が, the news is the word just before が.",
        "examples": [
          {
            "tr": "田中さんは先生です。",
            "en": "Mr Tanaka is a teacher.",
            "kana": "たなか さん は せんせい です",
            "note": "We’re talking about Tanaka; the news is what he does."
          },
          {
            "tr": "田中さんが先生です。",
            "en": "Mr Tanaka is the teacher.",
            "kana": "たなか さん が せんせい です",
            "note": "Answers “Which one is the teacher?”; the news is who."
          }
        ]
      },
      {
        "heading": "When to use が",
        "body": "Start with **は** when you say something about a known topic (私は…, 東京は…). Switch to **が** in the situations below. Note that a question word can never take は: say 誰が, never 誰は.",
        "table": {
          "head": [
            "Use が…",
            "Example"
          ],
          "rows": [
            [
              "after a question word",
              "誰**が**来ましたか。 Who came?"
            ],
            [
              "in the answer to that question",
              "田中さん**が**来ました。 Tanaka did."
            ],
            [
              "for something you’ve just noticed",
              "あ、雨**が**降っています。 Oh, it’s raining."
            ],
            [
              "for what exists, with あります / います",
              "駅の前に銀行**が**あります。 There’s a bank in front of the station."
            ],
            [
              "for what is liked, wanted, understood…",
              "猫**が**好きです。 I like cats."
            ]
          ]
        },
        "examples": [
          {
            "tr": "誰が来ましたか。",
            "en": "Who came?",
            "kana": "だれ が きました か"
          },
          {
            "tr": "私は猫が好きです。",
            "en": "I like cats.",
            "kana": "わたし は ねこ が すき です",
            "note": "は marks me (the topic); が marks what is liked."
          },
          {
            "tr": "象は鼻が長いです。",
            "en": "Elephants have long trunks.",
            "kana": "ぞう は はな が ながい です",
            "note": "Literally “As for elephants, the trunk is long”: は and が in one sentence."
          },
          {
            "tr": "駅の前に銀行があります。",
            "en": "There’s a bank in front of the station.",
            "kana": "えき の まえ に ぎんこう が あります"
          }
        ]
      },
      {
        "heading": "は for contrast",
        "body": "は can also **contrast** one thing with another, like stressing a word in English. This is very common in negative sentences: お酒は飲みません suggests “alcohol, I don’t drink (other things, yes)”. Here は replaces を.",
        "examples": [
          {
            "tr": "ビールは飲みますが、ワインは飲みません。",
            "en": "I drink beer, but not wine.",
            "kana": "ビール は のみます が ワイン は のみません",
            "note": "Two は’s contrast beer and wine. The が in the middle is a different word: “but”."
          },
          {
            "tr": "今日は時間がありません。",
            "en": "I don’t have time today.",
            "kana": "きょう は じかん が ありません",
            "note": "今日は: today, at least (maybe another day)."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Fill in the gap: 誰＿先生ですか。 (Who is the teacher?)",
        "options": [
          "が",
          "は",
          "を",
          "の"
        ],
        "answer": 0,
        "explain": "Question words like 誰 are followed by が, never は."
      },
      {
        "q": "Fill in the gap: 私は寿司＿好きです。 (I like sushi.)",
        "options": [
          "を",
          "が",
          "で",
          "へ"
        ],
        "answer": 1,
        "explain": "The thing that is liked takes が with 好き."
      },
      {
        "q": "Someone asks 誰が来ましたか。 Which answer fits?",
        "options": [
          "田中さんは来ました。",
          "田中さんを来ました。",
          "田中さんに来ました。",
          "田中さんが来ました。"
        ],
        "answer": 3,
        "explain": "The answer to a が question also takes が, because Tanaka is the new information."
      },
      {
        "q": "What does は add in お酒は飲みません？",
        "options": [
          "It shows that alcohol is doing the drinking.",
          "It turns the sentence into a question.",
          "A contrast: alcohol, at least, I don’t drink.",
          "It makes the sentence past tense."
        ],
        "answer": 2,
        "explain": "In negative sentences は often contrasts the topic with other things."
      }
    ]
  },
  {
    "id": "want-to-tai",
    "title": "～たい: I want to…",
    "level": "A2",
    "summary": "Say what you want to do with ～たい, and what you want to have with ほしい.",
    "sections": [
      {
        "heading": "Making ～たい",
        "body": "Take the ます form, drop ます and add **たい**: 食べます → 食べ**たい** (want to eat), 行きます → 行き**たい**, します → し**たい**. The result works like an **い-adjective**, so it changes like 高い: add です to be polite, くない for the negative and かった for the past. The object can take を or が: 水を飲みたい and 水が飲みたい are both fine.",
        "table": {
          "head": [
            "",
            "Casual",
            "Polite"
          ],
          "rows": [
            [
              "want to go",
              "行きたい",
              "行きたいです"
            ],
            [
              "don’t want to go",
              "行きた**くない**",
              "行きた**くない**です"
            ],
            [
              "wanted to go",
              "行きた**かった**",
              "行きた**かった**です"
            ],
            [
              "didn’t want to go",
              "行きた**くなかった**",
              "行きた**くなかった**です"
            ]
          ]
        },
        "examples": [
          {
            "tr": "日本に行きたいです。",
            "en": "I want to go to Japan.",
            "kana": "にほん に いきたい です"
          },
          {
            "tr": "何が食べたいですか。",
            "en": "What would you like to eat?",
            "kana": "なに が たべたい です か"
          },
          {
            "tr": "今日は何もしたくないです。",
            "en": "I don’t want to do anything today.",
            "kana": "きょう は なに も したくない です"
          },
          {
            "tr": "子供のころ、先生になりたかったです。",
            "en": "When I was a child, I wanted to be a teacher.",
            "kana": "こども の ころ せんせい に なりたかった です",
            "note": "なる (become) → なりたい → なりたかった."
          }
        ]
      },
      {
        "heading": "Wanting things: ほしい",
        "body": "たい only attaches to verbs. To want a **thing**, use **ほしい**, which is also an い-adjective. The thing you want takes **が**: 新しい靴がほしいです.",
        "examples": [
          {
            "tr": "新しい靴がほしいです。",
            "en": "I want some new shoes.",
            "kana": "あたらしい くつ が ほしい です"
          },
          {
            "tr": "誕生日に何がほしいですか。",
            "en": "What do you want for your birthday?",
            "kana": "たんじょうび に なに が ほしい です か"
          }
        ]
      },
      {
        "heading": "Other people’s wishes",
        "body": "たい and ほしい describe **your own** feelings. Japanese avoids stating someone else’s feelings as fact, so for another person say **～たがっています** (“shows that he wants to”) or **～たいと言っています** (“says he wants to”). Asking a teacher or a boss 飲みたいですか is also too direct; make an offer instead: コーヒーはいかがですか.",
        "examples": [
          {
            "tr": "弟は犬を飼いたがっています。",
            "en": "My younger brother wants to get a dog.",
            "kana": "おとうと は いぬ を かいたがって います"
          },
          {
            "tr": "田中さんも行きたいと言っています。",
            "en": "Mr Tanaka says he wants to go too.",
            "kana": "たなか さん も いきたい と いって います"
          },
          {
            "tr": "コーヒーはいかがですか。",
            "en": "Would you like some coffee?",
            "kana": "コーヒー は いかが です か",
            "note": "A polite offer; better than 飲みたいですか with a superior."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “I want to eat sushi”?",
        "options": [
          "寿司が食べますたい。",
          "寿司が食べたいです。",
          "寿司が食べるたいです。",
          "寿司が食べたです。"
        ],
        "answer": 1,
        "explain": "Drop ます from 食べます and add たい."
      },
      {
        "q": "How do you say “I didn’t want to go”?",
        "options": [
          "行きたいじゃなかったです。",
          "行きたいでした。",
          "行きたかったじゃないです。",
          "行きたくなかったです。"
        ],
        "answer": 3,
        "explain": "たい changes like an い-adjective: たくなかった."
      },
      {
        "q": "Which word do you use to say you want a thing, such as a new phone?",
        "options": [
          "たい",
          "好き",
          "ほしい",
          "です"
        ],
        "answer": 2,
        "explain": "ほしい is for things; たい is for actions."
      },
      {
        "q": "Which is the natural way to say “My sister wants to go to Paris”?",
        "options": [
          "姉はパリに行きたがっています。",
          "姉はパリに行きたいです。",
          "姉はパリに行きたくです。",
          "姉はパリに行きたいがっています。"
        ],
        "answer": 0,
        "explain": "For someone else’s wishes, use ～たがっています (or ～たいと言っています)."
      }
    ]
  },
  {
    "id": "te-form",
    "title": "The て-form: ～てください and ～ています",
    "level": "A2",
    "summary": "Make the て-form, then use it to ask for things politely and to say what is happening now.",
    "sections": [
      {
        "heading": "Making the て-form",
        "body": "The て-form links verbs together and appears in many patterns. Groups 2 and 3 are easy; for Group 1, it depends on the last kana of the dictionary form. The **た-form** (the plain past) follows exactly the same rules, with た / だ instead of て / で.",
        "table": {
          "head": [
            "Dictionary form ends in",
            "て-form",
            "Examples"
          ],
          "rows": [
            [
              "う・つ・る (Group 1)",
              "って",
              "買う → 買って · 待つ → 待って · 帰る → 帰って"
            ],
            [
              "む・ぶ・ぬ",
              "んで",
              "飲む → 飲んで · 遊ぶ → 遊んで · 死ぬ → 死んで"
            ],
            [
              "く",
              "いて",
              "書く → 書いて (exception: 行く → **行って**)"
            ],
            [
              "ぐ",
              "いで",
              "泳ぐ → 泳いで"
            ],
            [
              "す",
              "して",
              "話す → 話して"
            ],
            [
              "る (Group 2)",
              "て",
              "食べる → 食べて · 見る → 見て"
            ],
            [
              "Group 3",
              "して / きて",
              "する → して · 来る → 来て (きて)"
            ]
          ]
        }
      },
      {
        "heading": "～てください: please do…",
        "body": "て-form + **ください** is the standard polite request: “please do…”. Put **すみません** or **ちょっと** in front to sound softer.",
        "examples": [
          {
            "tr": "すみません、ちょっと待ってください。",
            "en": "Sorry, could you wait a moment?",
            "kana": "すみません ちょっと まって ください",
            "note": "待つ → 待って + ください."
          },
          {
            "tr": "もう一度言ってください。",
            "en": "Could you say that again, please?",
            "kana": "もう いちど いって ください"
          },
          {
            "tr": "もう少しゆっくり話してください。",
            "en": "Could you speak a little more slowly, please?",
            "kana": "もう すこし ゆっくり はなして ください"
          },
          {
            "tr": "ここに名前を書いてください。",
            "en": "Please write your name here.",
            "kana": "ここ に なまえ を かいて ください"
          }
        ]
      },
      {
        "heading": "～ています: ongoing actions and states",
        "body": "て-form + **います** has two main uses. (1) An action **in progress**: 雨が降っています (it’s raining). (2) A **state that continues** after a change: 結婚しています (I’m married: I got married and still am), 住んでいます (I live somewhere), 知っています (I know). It can also describe a habit. Note that the negative of 知っています is **知りません** (I don’t know).",
        "examples": [
          {
            "tr": "今、何をしていますか。",
            "en": "What are you doing now?",
            "kana": "いま なに を して います か"
          },
          {
            "tr": "雨が降っています。",
            "en": "It’s raining.",
            "kana": "あめ が ふって います"
          },
          {
            "tr": "大阪に住んでいます。",
            "en": "I live in Osaka.",
            "kana": "おおさか に すんで います",
            "note": "Not 住みます: living somewhere is an ongoing state."
          },
          {
            "tr": "姉は結婚しています。",
            "en": "My older sister is married.",
            "kana": "あね は けっこん して います"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What is the て-form of 飲む (drink)?",
        "options": [
          "飲みて",
          "飲って",
          "飲いて",
          "飲んで"
        ],
        "answer": 3,
        "explain": "Verbs ending in む, ぶ and ぬ change to んで."
      },
      {
        "q": "What is the て-form of 行く (go)?",
        "options": [
          "行って",
          "行いて",
          "行きて",
          "行んで"
        ],
        "answer": 0,
        "explain": "行く is the one exception among く-verbs: 行って."
      },
      {
        "q": "How do you say “I live in Tokyo”?",
        "options": [
          "東京に住みます。",
          "東京に住んでいます。",
          "東京で住んでいます。",
          "東京に住んでください。"
        ],
        "answer": 1,
        "explain": "Living somewhere is an ongoing state (～ています), and 住む takes に."
      },
      {
        "q": "How do you politely ask someone to wait?",
        "options": [
          "待ちてください。",
          "待っています。",
          "待ってください。",
          "待つください。"
        ],
        "answer": 2,
        "explain": "待つ → 待って, then add ください."
      }
    ]
  },
  {
    "id": "plain-form",
    "title": "Plain form and casual speech",
    "level": "A2",
    "summary": "Learn the short “plain” forms that friends use with each other and that a lot of grammar is built on.",
    "sections": [
      {
        "heading": "Polite and plain side by side",
        "body": "Every polite form has a **plain** (short) partner. Plain forms are what you use with friends and family, and they also appear inside longer sentences, before patterns like ～んです and ～と思います. The dictionary form is simply the plain non-past. In casual speech the plain だ after a noun is often dropped, too: 学生 instead of 学生だ.",
        "table": {
          "head": [
            "Meaning",
            "Polite",
            "Plain"
          ],
          "rows": [
            [
              "eat / will eat",
              "食べます",
              "食べる"
            ],
            [
              "don’t eat",
              "食べません",
              "食べない"
            ],
            [
              "ate",
              "食べました",
              "食べた"
            ],
            [
              "didn’t eat",
              "食べませんでした",
              "食べなかった"
            ],
            [
              "is a student",
              "学生です",
              "学生だ"
            ],
            [
              "isn’t a student",
              "学生じゃないです",
              "学生じゃない"
            ],
            [
              "was a student",
              "学生でした",
              "学生だった"
            ],
            [
              "is expensive",
              "高いです",
              "高い"
            ]
          ]
        }
      },
      {
        "heading": "Making ない and た",
        "body": "**ない form**: Group 1 changes the final -u to -a and adds ない (飲む → 飲**ま**ない). A final う becomes **わ**, not あ (買う → 買**わ**ない). Group 2 just drops る (食べない). **た form**: take the て-form and change て → た, で → だ. The plain negative of ある (there is) is simply **ない**.",
        "table": {
          "head": [
            "Dictionary",
            "ない form",
            "た form",
            "なかった form"
          ],
          "rows": [
            [
              "飲む drink",
              "飲まない",
              "飲んだ",
              "飲まなかった"
            ],
            [
              "書く write",
              "書かない",
              "書いた",
              "書かなかった"
            ],
            [
              "買う buy",
              "買わない",
              "買った",
              "買わなかった"
            ],
            [
              "行く go",
              "行かない",
              "行った",
              "行かなかった"
            ],
            [
              "食べる eat",
              "食べない",
              "食べた",
              "食べなかった"
            ],
            [
              "する do",
              "しない",
              "した",
              "しなかった"
            ],
            [
              "来る come",
              "来ない (こない)",
              "来た (きた)",
              "来なかった (こなかった)"
            ],
            [
              "ある there is",
              "ない",
              "あった",
              "なかった"
            ]
          ]
        }
      },
      {
        "heading": "Talking casually",
        "body": "In casual speech, questions usually drop か and simply rise at the end: 行く？. After nouns and な-adjectives, だ disappears in questions (暇？, not 暇だ？). Yes is **うん** and no is **ううん**. Particles like が and を are often left out as well.",
        "examples": [
          {
            "tr": "明日、来る？",
            "en": "Are you coming tomorrow?",
            "kana": "あした くる",
            "note": "Polite: 明日、来ますか。"
          },
          {
            "tr": "うん、行く。",
            "en": "Yeah, I’ll be there.",
            "kana": "うん いく",
            "note": "Polite: はい、行きます。"
          },
          {
            "tr": "昨日、何した？",
            "en": "What did you do yesterday?",
            "kana": "きのう なに した",
            "note": "Polite: 昨日、何をしましたか。"
          },
          {
            "tr": "今日、暇？",
            "en": "Are you free today?",
            "kana": "きょう ひま",
            "note": "No だ and no か, just a rising tone."
          },
          {
            "tr": "喉渇いた。",
            "en": "I’m thirsty.",
            "kana": "のど かわいた",
            "note": "Polite: 喉が渇きました。 が is dropped in casual speech."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What is the plain form of 飲みませんでした (didn’t drink)?",
        "options": [
          "飲まない",
          "飲んだ",
          "飲みなかった",
          "飲まなかった"
        ],
        "answer": 3,
        "explain": "Make the ない form (飲まない), then change ない to なかった."
      },
      {
        "q": "What is the ない form of 買う (buy)?",
        "options": [
          "買わない",
          "買あない",
          "買らない",
          "買いない"
        ],
        "answer": 0,
        "explain": "Verbs ending in う change to わ before ない."
      },
      {
        "q": "How would you ask a friend “Are you a student?”",
        "options": [
          "学生だか？",
          "学生？",
          "学生ですだ？",
          "学生だです？"
        ],
        "answer": 1,
        "explain": "Casual questions drop だ and か and just rise at the end."
      },
      {
        "q": "What is the plain negative of ある (there is)?",
        "options": [
          "あらない",
          "あない",
          "ない",
          "ありない"
        ],
        "answer": 2,
        "explain": "ある is irregular: its negative is just ない."
      }
    ]
  },
  {
    "id": "politeness-levels",
    "title": "Politeness levels: casual, polite and keigo",
    "level": "B1",
    "summary": "Choose the right level of speech for friends, strangers and customers, and recognise keigo when you hear it.",
    "sections": [
      {
        "heading": "Three levels",
        "body": "Japanese changes its verb endings, and sometimes the verb itself, depending on who you are talking to.\n\n**Casual** (plain form): friends, family, children, close colleagues of your own age. **Polite** (です / ます): strangers, shop staff, teachers, colleagues and anyone older; this is the safe default for learners. **Keigo** (敬語, honorific language): customers, bosses, formal speeches and announcements. You will hear keigo every day from staff in shops, hotels and stations. In very formal speech even です becomes **でございます**: こちらでございます (Here it is).",
        "table": {
          "head": [
            "",
            "Casual",
            "Polite",
            "Respectful (their actions)",
            "Humble (my actions)"
          ],
          "rows": [
            [
              "go / come",
              "行く・来る",
              "行きます・来ます",
              "いらっしゃいます",
              "参ります"
            ],
            [
              "be (people)",
              "いる",
              "います",
              "いらっしゃいます",
              "おります"
            ],
            [
              "eat / drink",
              "食べる・飲む",
              "食べます・飲みます",
              "召し上がります",
              "いただきます"
            ],
            [
              "say",
              "言う",
              "言います",
              "おっしゃいます",
              "申します"
            ],
            [
              "do",
              "する",
              "します",
              "なさいます",
              "いたします"
            ],
            [
              "see",
              "見る",
              "見ます",
              "ご覧になります",
              "拝見します"
            ]
          ]
        }
      },
      {
        "heading": "Respectful and humble",
        "body": "Beyond です / ます, keigo has two sides. **Respectful** language (尊敬語) raises the other person: use it for what a customer, boss or teacher does. **Humble** language (謙譲語) lowers yourself: use it for your own actions when you speak to them (申します, 参ります, おります), and for what you do for them. Never use respectful forms about yourself. Besides the special verbs in the table, there are regular patterns: **お + stem + になります** is respectful (お帰りになります), and **お + stem + します** is humble, for something you do for the other person (お持ちします). Nouns get polite prefixes too: お名前, ご家族.",
        "examples": [
          {
            "tr": "こちらにお名前をお書きください。",
            "en": "Please write your name here.",
            "kana": "こちら に おなまえ を おかき ください",
            "note": "Respectful request, お + stem + ください: the keigo version of ここに名前を書いてください。"
          },
          {
            "tr": "田中と申します。",
            "en": "My name is Tanaka.",
            "kana": "たなか と もうします",
            "note": "Humble: for introducing yourself formally or on the phone."
          },
          {
            "tr": "社長はもうお帰りになりました。",
            "en": "The company president has already gone home.",
            "kana": "しゃちょう は もう おかえり に なりました",
            "note": "Respectful: お + 帰り + になる, for the boss’s action."
          },
          {
            "tr": "お荷物をお持ちしましょうか。",
            "en": "Shall I carry your bags?",
            "kana": "おにもつ を おもち しましょう か",
            "note": "Humble: お + 持ち + する, for what you do for someone."
          },
          {
            "tr": "何名様ですか。",
            "en": "How many are in your party?",
            "kana": "なんめい さま です か",
            "note": "Restaurant staff ask this. 様 (さま) is a very polite さん."
          }
        ]
      },
      {
        "heading": "One question, three levels",
        "body": "The same question sounds very different depending on who you ask. As a learner, aim to **speak** in です / ます and to **understand** the keigo that staff use with you. Switch to casual speech only when the other person does, or tells you it’s fine: タメ口でいいよ (“you can talk casually with me”).",
        "table": {
          "head": [
            "English",
            "Casual",
            "Polite",
            "Keigo"
          ],
          "rows": [
            [
              "Where are you going?",
              "どこ行くの？",
              "どこに行きますか。",
              "どちらへいらっしゃいますか。"
            ],
            [
              "Have you eaten?",
              "もう食べた？",
              "もう食べましたか。",
              "もう召し上がりましたか。"
            ],
            [
              "Got it.",
              "分かった。",
              "分かりました。",
              "かしこまりました。"
            ],
            [
              "What’s your name?",
              "名前は？",
              "お名前は何ですか。",
              "お名前を伺ってもよろしいですか。"
            ]
          ]
        },
        "examples": [
          {
            "tr": "どこ行くの？",
            "en": "Where are you off to?",
            "kana": "どこ いく の",
            "note": "Casual: に is dropped and の makes it a friendly question."
          },
          {
            "tr": "どちらへいらっしゃいますか。",
            "en": "Where are you going?",
            "kana": "どちら へ いらっしゃいます か",
            "note": "Keigo: どちら is the polite どこ, いらっしゃる the respectful 行く."
          },
          {
            "tr": "ご注文はお決まりですか。",
            "en": "Are you ready to order?",
            "kana": "ごちゅうもん は おきまり です か",
            "note": "What restaurant staff ask. Plain polite version: 注文は決まりましたか。"
          },
          {
            "tr": "かしこまりました。少々お待ちください。",
            "en": "Certainly. One moment, please.",
            "kana": "かしこまりました しょうしょう おまち ください",
            "note": "What staff say when they take your order. 少々お待ちください is the keigo version of ちょっと待ってください。"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which level is the safe default with strangers and shop staff?",
        "options": [
          "Casual (plain form)",
          "Respectful keigo",
          "Polite (です / ます)",
          "Humble keigo"
        ],
        "answer": 2,
        "explain": "です / ます is polite without being stiff, so it fits almost any situation."
      },
      {
        "q": "Which verb is humble, used about your own actions?",
        "options": [
          "おっしゃいます",
          "申します",
          "いらっしゃいます",
          "召し上がります"
        ],
        "answer": 1,
        "explain": "申します is the humble “say”; the other three are respectful forms for other people."
      },
      {
        "q": "Which verb do you use for a customer eating?",
        "options": [
          "いただきます",
          "申します",
          "参ります",
          "召し上がります"
        ],
        "answer": 3,
        "explain": "召し上がる raises the eater; いただく is the humble version for yourself."
      },
      {
        "q": "A waiter says かしこまりました. What does it mean?",
        "options": [
          "Certainly, I’ll do that.",
          "Welcome!",
          "Please wait a moment.",
          "Thank you very much."
        ],
        "answer": 0,
        "explain": "かしこまりました is a very polite way to say 分かりました (understood)."
      }
    ]
  },
  {
    "id": "spoken-japanese",
    "title": "Spoken Japanese: how people really talk",
    "level": "B1",
    "summary": "Understand the contractions and shortcuts of everyday speech, side by side with the textbook forms.",
    "sections": [
      {
        "heading": "Everyday contractions",
        "body": "Textbooks teach the full forms, but in conversation people squeeze them. These contractions are normal speech, even in polite conversation (待ってます, 知ってます), but they are avoided in formal writing such as reports or business emails.",
        "table": {
          "head": [
            "Full (written) form",
            "Spoken form",
            "Meaning"
          ],
          "rows": [
            [
              "食べ**ている**",
              "食べ**てる**",
              "is eating"
            ],
            [
              "見**ていない**",
              "見**てない**",
              "haven’t seen"
            ],
            [
              "忘れ**てしまった**",
              "忘れ**ちゃった**",
              "forgot (oops)"
            ],
            [
              "飲ん**でしまった**",
              "飲ん**じゃった**",
              "drank it all (oops)"
            ],
            [
              "買っ**ておく**",
              "買っ**とく**",
              "buy now, for later"
            ],
            [
              "行か**なければ**ならない",
              "行か**なきゃ**",
              "have to go"
            ],
            [
              "食べ**ては**いけない",
              "食べ**ちゃ**だめ",
              "mustn’t eat"
            ],
            [
              "学生**では**ない",
              "学生**じゃ**ない",
              "isn’t a student"
            ],
            [
              "行く**の**です",
              "行く**ん**です / 行く**ん**だ",
              "(you see,) I’m going"
            ],
            [
              "来る**と**言っていた",
              "来る**って**言ってた",
              "said he’s coming"
            ]
          ]
        }
      },
      {
        "heading": "～んです / ～んだ: explaining",
        "body": "**～んです** (written ～のです; casual **～んだ** or just **～の**) adds a feeling of explanation: “it’s that…”, “you see…”. Use it to give a reason, or to ask about something you have noticed. After a noun or a な-adjective it becomes **なんです / なんだ**. Overusing it with strangers can sound pushy, but everyday speech is full of it.",
        "examples": [
          {
            "tr": "どうしたんですか。",
            "en": "What’s wrong?",
            "kana": "どう したん です か",
            "note": "Asking about something you’ve noticed, e.g. someone looks upset."
          },
          {
            "tr": "ちょっと頭が痛いんです。",
            "en": "I’ve got a bit of a headache, you see.",
            "kana": "ちょっと あたま が いたいん です",
            "note": "Giving a reason; softer than 頭が痛いです。"
          },
          {
            "tr": "明日は休みなんだ。",
            "en": "I’ve got tomorrow off, you see.",
            "kana": "あした は やすみ なんだ",
            "note": "Noun + なんだ (casual)."
          }
        ]
      },
      {
        "heading": "Textbook vs real life",
        "body": "Here are the same ideas the way a textbook writes them and the way friends actually say them. Notice how particles disappear, sentences get shorter and verb endings shrink.",
        "examples": [
          {
            "tr": "宿題を忘れちゃった。",
            "en": "I forgot my homework!",
            "kana": "しゅくだい を わすれちゃった",
            "note": "Textbook: 宿題を忘れてしまいました。"
          },
          {
            "tr": "今、何してる？",
            "en": "What are you up to?",
            "kana": "いま なに してる",
            "note": "Textbook: 今、何をしていますか。 を is dropped and ている becomes てる."
          },
          {
            "tr": "それ、まだ見てない。",
            "en": "I haven’t seen that yet.",
            "kana": "それ まだ みてない",
            "note": "Textbook: それはまだ見ていません。"
          },
          {
            "tr": "そろそろ帰らなきゃ。",
            "en": "I’d better head home soon.",
            "kana": "そろそろ かえらなきゃ",
            "note": "Textbook: そろそろ帰らなければなりません。"
          },
          {
            "tr": "田中さん、明日来ないって。",
            "en": "Tanaka says he isn’t coming tomorrow.",
            "kana": "たなか さん あした こない って",
            "note": "Textbook: 田中さんは明日来ないと言っていました。"
          },
          {
            "tr": "ここで写真撮っちゃだめだよ。",
            "en": "You can’t take photos here.",
            "kana": "ここ で しゃしん とっちゃ だめ だ よ",
            "note": "Textbook: ここで写真を撮ってはいけません。"
          },
          {
            "tr": "このケーキ、美味しくない？",
            "en": "Isn’t this cake delicious?",
            "kana": "この ケーキ おいしくない",
            "note": "With a rising tone, a negative question means “don’t you think it’s…?”: a compliment, not a complaint."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What is the spoken form of 食べている (is eating)?",
        "options": [
          "食べちゃう",
          "食べてる",
          "食べとく",
          "食べなきゃ"
        ],
        "answer": 1,
        "explain": "ている is shortened to てる in everyday speech."
      },
      {
        "q": "What does 忘れちゃった mean?",
        "options": [
          "I haven’t forgotten.",
          "I must forget.",
          "I forgot (oops).",
          "I’ll forget it for later."
        ],
        "answer": 2,
        "explain": "ちゃった is the spoken form of てしまった: something done completely, often with regret."
      },
      {
        "q": "行かなきゃ is short for…",
        "options": [
          "行かないで",
          "行ってしまう",
          "行っておく",
          "行かなければ(ならない)"
        ],
        "answer": 3,
        "explain": "なきゃ comes from なければ (ならない): “I have to go”."
      },
      {
        "q": "A friend tastes some cake and says このケーキ、美味しくない？ with a rising tone. What does she mean?",
        "options": [
          "Isn’t this cake delicious? (She likes it.)",
          "This cake isn’t delicious.",
          "Don’t eat this cake.",
          "Was the cake delicious?"
        ],
        "answer": 0,
        "explain": "A negative question with a rising tone invites agreement: she thinks it is delicious."
      }
    ]
  }
];
