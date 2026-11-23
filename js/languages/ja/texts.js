// Read & Listen: graded dialogues, stories, everyday texts, speeches, tongue twisters and proverbs.
// Each text: { id, kind, level, title, titleNative, summary, dialect?, register?,
//   lines: [{ speaker?, tr, en, kana, note?, say? }], glossary: [{ tr, en, kana }],
//   questions: [{ q, options[4], answer, explain }] }.
// Written and proofread with AI assistance; not yet reviewed by native speakers. Edit freely.
// Loaded on demand (not at startup).
export const texts = [
  {
    "id": "ja-new-neighbour",
    "kind": "dialogue",
    "level": "A1",
    "title": "Meeting the Neighbour",
    "titleNative": "お隣さんにあいさつ",
    "summary": "Ms Mori has just moved in and greets her next-door neighbour, Mr Sato, with a small gift.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Mori",
        "tr": "こんにちは、となりに引っ越してきた森です。",
        "en": "Hello, I'm Mori. I've just moved in next door.",
        "kana": "こんにち は となり に ひっこして きた もり です"
      },
      {
        "speaker": "Sato",
        "tr": "ああ、こんにちは、佐藤です。",
        "en": "Oh, hello, I'm Sato.",
        "kana": "ああ こんにち は さとう です"
      },
      {
        "speaker": "Mori",
        "tr": "これからよろしくお願いします。",
        "en": "I look forward to being your neighbour.",
        "kana": "これから よろしく おねがい します"
      },
      {
        "speaker": "Sato",
        "tr": "こちらこそ、よろしくお願いします。",
        "en": "Likewise, nice to meet you.",
        "kana": "こちらこそ よろしく おねがい します"
      },
      {
        "speaker": "Mori",
        "tr": "これ、ほんの気持ちですが、どうぞ。",
        "en": "This is just a little something — please take it.",
        "kana": "これ ほんの きもち です が どうぞ"
      },
      {
        "speaker": "Sato",
        "tr": "ご丁寧にありがとうございます。",
        "en": "That's very kind of you, thank you.",
        "kana": "ごていねい に ありがとう ございます"
      },
      {
        "speaker": "Sato",
        "tr": "ご家族と一緒ですか。",
        "en": "Are you here with your family?",
        "kana": "ごかぞく と いっしょ です か"
      },
      {
        "speaker": "Mori",
        "tr": "はい、夫と娘と三人です。",
        "en": "Yes, there are three of us: my husband, my daughter and me.",
        "kana": "はい おっと と むすめ と さんにん です"
      },
      {
        "speaker": "Sato",
        "tr": "そうですか、にぎやかになりますね。",
        "en": "I see — it'll be livelier around here.",
        "kana": "そう です か にぎやか に なります ね"
      },
      {
        "speaker": "Sato",
        "tr": "ゴミの日は火曜日と金曜日ですよ。",
        "en": "Rubbish collection days are Tuesday and Friday, by the way.",
        "kana": "ゴミ の ひ は かようび と きんようび です よ"
      },
      {
        "speaker": "Mori",
        "tr": "火曜日と金曜日ですね、わかりました。",
        "en": "Tuesday and Friday — got it.",
        "kana": "かようび と きんようび です ね わかりました"
      },
      {
        "speaker": "Sato",
        "tr": "何か困ったことがあったら、いつでも声をかけてくださいね。",
        "en": "If you ever need anything, just let me know any time.",
        "kana": "なにか こまった こと が あったら いつでも こえ を かけて ください ね"
      },
      {
        "speaker": "Mori",
        "tr": "ありがとうございます、本当に助かります。",
        "en": "Thank you, that's a big help.",
        "kana": "ありがとう ございます ほんとう に たすかります"
      }
    ],
    "glossary": [
      {
        "tr": "となり",
        "en": "next door",
        "kana": "となり"
      },
      {
        "tr": "引っ越してきた",
        "en": "have moved in",
        "kana": "ひっこして きた"
      },
      {
        "tr": "よろしくお願いします",
        "en": "nice to meet you / I'm counting on you (set phrase)",
        "kana": "よろしく おねがい します"
      },
      {
        "tr": "こちらこそ",
        "en": "likewise, the same to you",
        "kana": "こちらこそ"
      },
      {
        "tr": "ほんの気持ち",
        "en": "just a small token (said when giving a gift)",
        "kana": "ほんの きもち"
      },
      {
        "tr": "夫",
        "en": "(my) husband",
        "kana": "おっと"
      },
      {
        "tr": "娘",
        "en": "(my) daughter",
        "kana": "むすめ"
      },
      {
        "tr": "ゴミの日",
        "en": "rubbish collection day",
        "kana": "ゴミ の ひ"
      },
      {
        "tr": "声をかけて",
        "en": "call out to (me), let (me) know",
        "kana": "こえ を かけて"
      },
      {
        "tr": "助かります",
        "en": "that's a help",
        "kana": "たすかります"
      }
    ],
    "questions": [
      {
        "q": "What has Ms Mori just done?",
        "options": [
          "Moved in next door",
          "Started a new job",
          "Come back from a trip",
          "Opened a shop"
        ],
        "answer": 0,
        "explain": "She says となりに引っ越してきた — she has moved in next door."
      },
      {
        "q": "How many people are in her family?",
        "options": [
          "Two",
          "Three",
          "Four",
          "Five"
        ],
        "answer": 1,
        "explain": "She says 夫と娘と三人です: her husband, her daughter and herself."
      },
      {
        "q": "When is rubbish collected?",
        "options": [
          "Monday and Thursday",
          "Tuesday and Friday",
          "Wednesday and Saturday",
          "Every day"
        ],
        "answer": 1,
        "explain": "Mr Sato says ゴミの日は火曜日と金曜日です."
      },
      {
        "q": "What does Mr Sato offer?",
        "options": [
          "To lend her his car",
          "Help whenever she needs it",
          "A tour of the town",
          "Dinner at his house"
        ],
        "answer": 1,
        "explain": "いつでも声をかけてください means \"let me know any time\"."
      }
    ]
  },
  {
    "id": "ja-cafe-for-two",
    "kind": "dialogue",
    "level": "A1",
    "title": "Ordering for Two at a Café",
    "titleNative": "カフェで二人分の注文",
    "summary": "Two friends chat casually about what to have, then order politely from the waiter.",
    "register": "mixed",
    "lines": [
      {
        "speaker": "Waiter",
        "tr": "いらっしゃいませ、二名様ですか。",
        "en": "Welcome — a table for two?",
        "kana": "いらっしゃいませ にめいさま です か"
      },
      {
        "speaker": "Yui",
        "tr": "はい、二人です。",
        "en": "Yes, two of us.",
        "kana": "はい ふたり です"
      },
      {
        "speaker": "Waiter",
        "tr": "こちらのお席へどうぞ。",
        "en": "Please take this table.",
        "kana": "こちら の おせき へ どうぞ"
      },
      {
        "speaker": "Yui",
        "tr": "ケンは何にする？",
        "en": "Ken, what are you having?",
        "kana": "ケン は なに に する"
      },
      {
        "speaker": "Ken",
        "tr": "僕はホットコーヒーかな。",
        "en": "I think I'll have a hot coffee.",
        "kana": "ぼく は ホット コーヒー かな"
      },
      {
        "speaker": "Yui",
        "tr": "じゃあ、私はアイスティーにしようかな。",
        "en": "Then I think I'll go for an iced tea.",
        "kana": "じゃあ わたし は アイスティー に しよう かな"
      },
      {
        "speaker": "Ken",
        "tr": "ケーキも食べない？",
        "en": "Shall we get some cake too?",
        "kana": "ケーキ も たべない"
      },
      {
        "speaker": "Yui",
        "tr": "いいね、チーズケーキを一つ頼んで、半分こしよう。",
        "en": "Good idea — let's order one cheesecake and share it.",
        "kana": "いい ね チーズケーキ を ひとつ たのんで はんぶんこ しよう"
      },
      {
        "speaker": "Ken",
        "tr": "すみません、注文お願いします。",
        "en": "Excuse me, we'd like to order.",
        "kana": "すみません ちゅうもん おねがい します"
      },
      {
        "speaker": "Waiter",
        "tr": "はい、ご注文をどうぞ。",
        "en": "Yes, what would you like?",
        "kana": "はい ごちゅうもん を どうぞ"
      },
      {
        "speaker": "Ken",
        "tr": "ホットコーヒーとアイスティーを一つずつお願いします。",
        "en": "One hot coffee and one iced tea, please.",
        "kana": "ホット コーヒー と アイスティー を ひとつ ずつ おねがい します"
      },
      {
        "speaker": "Ken",
        "tr": "あと、チーズケーキを一つと、フォークを二つお願いします。",
        "en": "And one cheesecake and two forks, please.",
        "kana": "あと チーズケーキ を ひとつ と フォーク を ふたつ おねがい します"
      },
      {
        "speaker": "Waiter",
        "tr": "かしこまりました、少々お待ちください。",
        "en": "Certainly. Just a moment, please.",
        "kana": "かしこまりました しょうしょう おまち ください"
      },
      {
        "speaker": "Yui",
        "tr": "このお店、雰囲気いいね。",
        "en": "This place has a really nice atmosphere.",
        "kana": "この おみせ ふんいき いい ね"
      }
    ],
    "glossary": [
      {
        "tr": "二名様",
        "en": "party of two (polite, used by staff)",
        "kana": "にめいさま"
      },
      {
        "tr": "お席",
        "en": "seat, table (polite)",
        "kana": "おせき"
      },
      {
        "tr": "何にする？",
        "en": "what will you have? (casual)",
        "kana": "なに に する"
      },
      {
        "tr": "頼んで",
        "en": "order (and...)",
        "kana": "たのんで"
      },
      {
        "tr": "半分こ",
        "en": "splitting something half and half (casual)",
        "kana": "はんぶんこ"
      },
      {
        "tr": "注文",
        "en": "order",
        "kana": "ちゅうもん"
      },
      {
        "tr": "一つずつ",
        "en": "one of each",
        "kana": "ひとつ ずつ"
      },
      {
        "tr": "かしこまりました",
        "en": "certainly (very polite \"understood\")",
        "kana": "かしこまりました"
      },
      {
        "tr": "少々お待ちください",
        "en": "please wait a moment",
        "kana": "しょうしょう おまち ください"
      },
      {
        "tr": "雰囲気",
        "en": "atmosphere",
        "kana": "ふんいき"
      }
    ],
    "questions": [
      {
        "q": "How many people are eating together?",
        "options": [
          "One",
          "Two",
          "Three",
          "Four"
        ],
        "answer": 1,
        "explain": "The waiter asks 二名様ですか and Yui answers 二人です."
      },
      {
        "q": "What does Yui have to drink?",
        "options": [
          "Hot coffee",
          "Iced tea",
          "Hot tea",
          "Orange juice"
        ],
        "answer": 1,
        "explain": "She says 私はアイスティーにしようかな."
      },
      {
        "q": "What will they do with the cheesecake?",
        "options": [
          "Take it home",
          "Share one between them",
          "Order one each",
          "Give it to the waiter"
        ],
        "answer": 1,
        "explain": "半分こしよう means \"let's share it half and half\", so they ask for two forks."
      },
      {
        "q": "How do Ken and Yui talk to each other?",
        "options": [
          "Casually, like friends",
          "Very formally",
          "In English",
          "Only through the waiter"
        ],
        "answer": 0,
        "explain": "With each other they use plain forms like 何にする？ and いいね; with the waiter they use お願いします."
      }
    ]
  },
  {
    "id": "ja-returning-a-sweater",
    "kind": "dialogue",
    "level": "A2",
    "title": "Returning a Sweater",
    "titleNative": "セーターの返品",
    "summary": "A customer tries to exchange a sweater that is too small, but the larger size is sold out, so she gets a refund.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Customer",
        "tr": "すみません、昨日ここでこのセーターを買ったんですが…",
        "en": "Excuse me, I bought this sweater here yesterday, but…",
        "kana": "すみません きのう ここ で この セーター を かった ん です が"
      },
      {
        "speaker": "Assistant",
        "tr": "はい、どうなさいましたか。",
        "en": "Yes, is something wrong?",
        "kana": "はい どう なさいました か"
      },
      {
        "speaker": "Customer",
        "tr": "家で着てみたら、ちょっと小さかったんです。",
        "en": "When I tried it on at home, it was a bit small.",
        "kana": "いえ で きて みたら ちょっと ちいさかった ん です"
      },
      {
        "speaker": "Customer",
        "tr": "一つ大きいサイズと交換できますか。",
        "en": "Could I exchange it for one size up?",
        "kana": "ひとつ おおきい サイズ と こうかん できます か"
      },
      {
        "speaker": "Assistant",
        "tr": "レシートはお持ちですか。",
        "en": "Do you have the receipt?",
        "kana": "レシート は おもち です か"
      },
      {
        "speaker": "Customer",
        "tr": "はい、こちらです。",
        "en": "Yes, here it is.",
        "kana": "はい こちら です"
      },
      {
        "speaker": "Assistant",
        "tr": "確認いたしますので、少々お待ちください。",
        "en": "I'll check, so please wait a moment.",
        "kana": "かくにん いたします ので しょうしょう おまち ください"
      },
      {
        "speaker": "Assistant",
        "tr": "大変申し訳ございません、Lサイズは今、在庫を切らしております。",
        "en": "I'm very sorry, we're out of the large size at the moment.",
        "kana": "たいへん もうしわけ ございません エル サイズ は いま ざいこ を きらして おります"
      },
      {
        "speaker": "Assistant",
        "tr": "返金でもよろしいでしょうか。",
        "en": "Would a refund be all right?",
        "kana": "へんきん でも よろしい でしょう か"
      },
      {
        "speaker": "Customer",
        "tr": "そうですか、では返金でお願いします。",
        "en": "I see. A refund, then, please.",
        "kana": "そう です か で は へんきん で おねがい します"
      },
      {
        "speaker": "Assistant",
        "tr": "かしこまりました、こちらの用紙にお名前とお電話番号をお願いします。",
        "en": "Certainly. Please write your name and phone number on this form.",
        "kana": "かしこまりました こちら の ようし に おなまえ と おでんわ ばんごう を おねがい します"
      },
      {
        "speaker": "Customer",
        "tr": "はい、これでいいですか。",
        "en": "Sure — is this OK?",
        "kana": "はい これ で いい です か"
      },
      {
        "speaker": "Assistant",
        "tr": "では、4800円のご返金です。",
        "en": "Here's your refund of 4,800 yen.",
        "kana": "で は よんせんはっぴゃく えん の ごへんきん です"
      },
      {
        "speaker": "Assistant",
        "tr": "ご不便をおかけして、申し訳ございませんでした。",
        "en": "We're very sorry for the inconvenience.",
        "kana": "ごふべん を おかけ して もうしわけ ございませんでした"
      }
    ],
    "glossary": [
      {
        "tr": "着てみたら",
        "en": "when I tried it on",
        "kana": "きて みたら"
      },
      {
        "tr": "交換",
        "en": "exchange",
        "kana": "こうかん"
      },
      {
        "tr": "レシート",
        "en": "receipt",
        "kana": "レシート"
      },
      {
        "tr": "お持ちですか",
        "en": "do you have…? (polite)",
        "kana": "おもち です か"
      },
      {
        "tr": "確認いたします",
        "en": "I'll check (humble)",
        "kana": "かくにん いたします"
      },
      {
        "tr": "申し訳ございません",
        "en": "I'm terribly sorry (very polite)",
        "kana": "もうしわけ ございません"
      },
      {
        "tr": "在庫を切らしております",
        "en": "we're out of stock (humble)",
        "kana": "ざいこ を きらして おります"
      },
      {
        "tr": "返金",
        "en": "refund",
        "kana": "へんきん"
      },
      {
        "tr": "用紙",
        "en": "form (sheet of paper)",
        "kana": "ようし"
      },
      {
        "tr": "ご不便",
        "en": "inconvenience (polite)",
        "kana": "ごふべん"
      }
    ],
    "questions": [
      {
        "q": "What is wrong with the sweater?",
        "options": [
          "It's too small",
          "It's the wrong colour",
          "It's damaged",
          "It's too expensive"
        ],
        "answer": 0,
        "explain": "She says ちょっと小さかったんです — it was a bit small."
      },
      {
        "q": "What did the customer ask for first?",
        "options": [
          "A refund",
          "One size bigger",
          "A different colour",
          "A discount"
        ],
        "answer": 1,
        "explain": "一つ大きいサイズと交換できますか — she wanted to exchange it for one size up."
      },
      {
        "q": "Why can't the shop exchange it?",
        "options": [
          "She has no receipt",
          "The large size is out of stock",
          "She bought it a month ago",
          "It was a sale item"
        ],
        "answer": 1,
        "explain": "Lサイズは今、在庫を切らしております — the L size is out of stock."
      },
      {
        "q": "How much does she get back?",
        "options": [
          "480 yen",
          "4,000 yen",
          "4,800 yen",
          "8,400 yen"
        ],
        "answer": 2,
        "explain": "The assistant says 4800円のご返金です."
      }
    ]
  },
  {
    "id": "ja-way-to-the-station",
    "kind": "dialogue",
    "level": "A1",
    "title": "The Way to the Station",
    "titleNative": "駅までの道",
    "summary": "A visitor heading the wrong way asks a passer-by how to get to the station.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Visitor",
        "tr": "すみません、ちょっといいですか。",
        "en": "Excuse me, do you have a moment?",
        "kana": "すみません ちょっと いい です か"
      },
      {
        "speaker": "Passer-by",
        "tr": "はい、どうしましたか。",
        "en": "Yes, can I help?",
        "kana": "はい どう しました か"
      },
      {
        "speaker": "Visitor",
        "tr": "駅に行きたいんですが、この道で合っていますか。",
        "en": "I'm trying to get to the station — am I going the right way?",
        "kana": "えき に いきたい ん です が この みち で あって います か"
      },
      {
        "speaker": "Passer-by",
        "tr": "駅ですか、反対ですよ。",
        "en": "The station? It's the other way.",
        "kana": "えき です か はんたい です よ"
      },
      {
        "speaker": "Passer-by",
        "tr": "この道をまっすぐ戻ってください。",
        "en": "Go straight back along this road.",
        "kana": "この みち を まっすぐ もどって ください"
      },
      {
        "speaker": "Passer-by",
        "tr": "二つ目の信号を右に曲がってください。",
        "en": "Turn right at the second traffic light.",
        "kana": "ふたつめ の しんごう を みぎ に まがって ください"
      },
      {
        "speaker": "Visitor",
        "tr": "二つ目の信号を右ですね。",
        "en": "Right at the second light, OK.",
        "kana": "ふたつめ の しんごう を みぎ です ね"
      },
      {
        "speaker": "Passer-by",
        "tr": "はい、曲がると左にコンビニがあります。",
        "en": "Yes, and after you turn, there's a convenience store on the left.",
        "kana": "はい まがる と ひだり に コンビニ が あります"
      },
      {
        "speaker": "Passer-by",
        "tr": "駅はそのコンビニのとなりです。",
        "en": "The station is next to that convenience store.",
        "kana": "えき は その コンビニ の となり です"
      },
      {
        "speaker": "Visitor",
        "tr": "歩いて何分ぐらいかかりますか。",
        "en": "About how long does it take on foot?",
        "kana": "あるいて なんぷん ぐらい かかります か"
      },
      {
        "speaker": "Passer-by",
        "tr": "10分ぐらいですね。",
        "en": "About ten minutes.",
        "kana": "じゅっぷん ぐらい です ね"
      },
      {
        "speaker": "Visitor",
        "tr": "わかりました、ご親切にありがとうございます。",
        "en": "Got it — thank you, that's very kind of you.",
        "kana": "わかりました ごしんせつ に ありがとう ございます"
      },
      {
        "speaker": "Passer-by",
        "tr": "いえいえ、お気をつけて。",
        "en": "Not at all. Take care.",
        "kana": "いえいえ おき を つけて"
      }
    ],
    "glossary": [
      {
        "tr": "道",
        "en": "road, way",
        "kana": "みち"
      },
      {
        "tr": "合っていますか",
        "en": "is it right?",
        "kana": "あって います か"
      },
      {
        "tr": "反対",
        "en": "the opposite direction",
        "kana": "はんたい"
      },
      {
        "tr": "まっすぐ",
        "en": "straight ahead",
        "kana": "まっすぐ"
      },
      {
        "tr": "戻って",
        "en": "go back",
        "kana": "もどって"
      },
      {
        "tr": "二つ目",
        "en": "the second",
        "kana": "ふたつめ"
      },
      {
        "tr": "信号",
        "en": "traffic light",
        "kana": "しんごう"
      },
      {
        "tr": "曲がって",
        "en": "turn",
        "kana": "まがって"
      },
      {
        "tr": "ご親切に",
        "en": "kindly (polite)",
        "kana": "ごしんせつ に"
      },
      {
        "tr": "お気をつけて",
        "en": "take care",
        "kana": "おき を つけて"
      }
    ],
    "questions": [
      {
        "q": "Where does the visitor want to go?",
        "options": [
          "The station",
          "A hotel",
          "A convenience store",
          "A bookshop"
        ],
        "answer": 0,
        "explain": "The visitor says 駅に行きたいんですが."
      },
      {
        "q": "What is the problem?",
        "options": [
          "The visitor is going the wrong way",
          "The station is closed",
          "The road is blocked",
          "The visitor has lost a ticket"
        ],
        "answer": 0,
        "explain": "反対ですよ — the station is the other way."
      },
      {
        "q": "Where should the visitor turn right?",
        "options": [
          "At the first traffic light",
          "At the second traffic light",
          "At the convenience store",
          "At the end of the road"
        ],
        "answer": 1,
        "explain": "二つ目の信号を右に曲がってください."
      },
      {
        "q": "How long is the walk?",
        "options": [
          "About 2 minutes",
          "About 5 minutes",
          "About 10 minutes",
          "About 30 minutes"
        ],
        "answer": 2,
        "explain": "The passer-by says 10分ぐらいですね."
      }
    ]
  },
  {
    "id": "ja-weekend-plans",
    "kind": "dialogue",
    "level": "A2",
    "title": "Plans for the Weekend",
    "titleNative": "週末の予定",
    "summary": "Two friends casually plan a Sunday trip to the cinema with lunch beforehand.",
    "register": "casual",
    "lines": [
      {
        "speaker": "Mei",
        "tr": "ねえ、今週末ひま？",
        "en": "Hey, are you free this weekend?",
        "kana": "ねえ こんしゅうまつ ひま"
      },
      {
        "speaker": "Riku",
        "tr": "土曜日はバイトだけど、日曜日なら空いてるよ。",
        "en": "I've got work at my part-time job on Saturday, but I'm free on Sunday.",
        "kana": "どようび は バイト だ けど にちようび なら あいてる よ"
      },
      {
        "speaker": "Mei",
        "tr": "じゃあ、日曜日に映画見に行かない？",
        "en": "Then do you want to go and see a film on Sunday?",
        "kana": "じゃあ にちようび に えいが み に いかない"
      },
      {
        "speaker": "Riku",
        "tr": "いいね、何見る？",
        "en": "Sounds good — what shall we see?",
        "kana": "いい ね なに みる"
      },
      {
        "speaker": "Mei",
        "tr": "新しいアニメの映画、すごく評判いいんだって。",
        "en": "People say the new anime film is really good.",
        "kana": "あたらしい アニメ の えいが すごく ひょうばん いい ん だ って"
      },
      {
        "speaker": "Riku",
        "tr": "あ、それ見たかったんだ！",
        "en": "Oh, I wanted to see that one!",
        "kana": "あ それ みたかった ん だ"
      },
      {
        "speaker": "Mei",
        "tr": "何時がいい？",
        "en": "What time suits you?",
        "kana": "なんじ が いい"
      },
      {
        "speaker": "Riku",
        "tr": "朝はゆっくりしたいから、午後がいいな。",
        "en": "I want to take it easy in the morning, so the afternoon would be good.",
        "kana": "あさ は ゆっくり したい から ごご が いい な"
      },
      {
        "speaker": "Mei",
        "tr": "じゃあ、二時の回にしよう。",
        "en": "OK, let's go to the two o'clock showing.",
        "kana": "じゃあ にじ の かい に しよう"
      },
      {
        "speaker": "Riku",
        "tr": "映画の前に、どこかでお昼食べる？",
        "en": "Shall we have lunch somewhere before the film?",
        "kana": "えいが の まえ に どこか で おひる たべる"
      },
      {
        "speaker": "Mei",
        "tr": "うん、駅前に新しいラーメン屋ができたよ。",
        "en": "Yeah — a new ramen place has opened in front of the station.",
        "kana": "うん えきまえ に あたらしい ラーメンや が できた よ"
      },
      {
        "speaker": "Riku",
        "tr": "いいね、じゃあ十二時に駅で待ち合わせしよう。",
        "en": "Great, then let's meet at the station at twelve.",
        "kana": "いい ね じゃあ じゅうにじ に えき で まちあわせ しよう"
      },
      {
        "speaker": "Mei",
        "tr": "オッケー、チケットは私がネットで買っとくね。",
        "en": "OK, I'll buy the tickets online.",
        "kana": "オッケー チケット は わたし が ネット で かっとく ね"
      }
    ],
    "glossary": [
      {
        "tr": "ひま",
        "en": "free (with nothing to do)",
        "kana": "ひま"
      },
      {
        "tr": "バイト",
        "en": "part-time job",
        "kana": "バイト"
      },
      {
        "tr": "空いてる",
        "en": "free, available (casual)",
        "kana": "あいてる"
      },
      {
        "tr": "評判いい",
        "en": "well reviewed, has a good reputation",
        "kana": "ひょうばん いい"
      },
      {
        "tr": "〜んだって",
        "en": "I hear that…, apparently… (casual)",
        "kana": "ん だ って"
      },
      {
        "tr": "ゆっくりしたい",
        "en": "want to take it easy",
        "kana": "ゆっくり したい"
      },
      {
        "tr": "回",
        "en": "showing, screening",
        "kana": "かい"
      },
      {
        "tr": "駅前",
        "en": "in front of the station",
        "kana": "えきまえ"
      },
      {
        "tr": "待ち合わせ",
        "en": "meeting up (at an agreed place)",
        "kana": "まちあわせ"
      },
      {
        "tr": "買っとく",
        "en": "buy in advance (casual for 買っておく)",
        "kana": "かっとく"
      }
    ],
    "questions": [
      {
        "q": "Why can't Riku go out on Saturday?",
        "options": [
          "He has his part-time job",
          "He's visiting family",
          "He's ill",
          "He has an exam"
        ],
        "answer": 0,
        "explain": "土曜日はバイトだけど — he works his part-time job on Saturday."
      },
      {
        "q": "What time does their film start?",
        "options": [
          "12:00",
          "1:00",
          "2:00",
          "6:00"
        ],
        "answer": 2,
        "explain": "Mei says 二時の回にしよう — the two o'clock showing."
      },
      {
        "q": "What will they do before the film?",
        "options": [
          "Go shopping",
          "Have ramen for lunch",
          "Go to a café",
          "Visit a friend"
        ],
        "answer": 1,
        "explain": "They plan lunch at the new ラーメン屋 by the station."
      },
      {
        "q": "Who will buy the tickets?",
        "options": [
          "Riku",
          "Mei",
          "They'll buy them at the cinema",
          "A friend"
        ],
        "answer": 1,
        "explain": "Mei says チケットは私がネットで買っとくね."
      }
    ]
  },
  {
    "id": "ja-at-the-pharmacy",
    "kind": "dialogue",
    "level": "A2",
    "title": "At the Pharmacy",
    "titleNative": "薬局で",
    "summary": "A customer with a sore throat and a slight fever asks a pharmacist for cold medicine.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Pharmacist",
        "tr": "こんにちは、どうされましたか。",
        "en": "Hello, what seems to be the problem?",
        "kana": "こんにち は どう されました か"
      },
      {
        "speaker": "Customer",
        "tr": "昨日から喉が痛くて、少し熱もあるんです。",
        "en": "My throat's been sore since yesterday, and I have a slight fever too.",
        "kana": "きのう から のど が いたくて すこし ねつ も ある ん です"
      },
      {
        "speaker": "Pharmacist",
        "tr": "熱は何度ぐらいですか。",
        "en": "About how high is your temperature?",
        "kana": "ねつ は なんど ぐらい です か"
      },
      {
        "speaker": "Customer",
        "tr": "今朝測ったら、37度ちょっとでした。",
        "en": "When I took it this morning, it was just over 37 degrees.",
        "kana": "けさ はかったら さんじゅうななど ちょっと でした"
      },
      {
        "speaker": "Pharmacist",
        "tr": "咳や鼻水はありますか。",
        "en": "Do you have a cough or a runny nose?",
        "kana": "せき や はなみず は あります か"
      },
      {
        "speaker": "Customer",
        "tr": "咳は少し出ますが、鼻水は出ません。",
        "en": "I'm coughing a little, but I don't have a runny nose.",
        "kana": "せき は すこし でます が はなみず は でません"
      },
      {
        "speaker": "Pharmacist",
        "tr": "薬のアレルギーはありますか。",
        "en": "Are you allergic to any medicines?",
        "kana": "くすり の アレルギー は あります か"
      },
      {
        "speaker": "Customer",
        "tr": "いいえ、特にありません。",
        "en": "No, not that I know of.",
        "kana": "いいえ とくに ありません"
      },
      {
        "speaker": "Pharmacist",
        "tr": "では、こちらの風邪薬はいかがでしょうか。",
        "en": "In that case, how about this cold medicine?",
        "kana": "で は こちら の かぜぐすり は いかが でしょう か"
      },
      {
        "speaker": "Pharmacist",
        "tr": "一日三回、食後に二錠ずつ飲んでください。",
        "en": "Take two tablets three times a day, after meals.",
        "kana": "いちにち さんかい しょくご に にじょう ずつ のんで ください"
      },
      {
        "speaker": "Pharmacist",
        "tr": "少し眠くなることがあるので、車の運転はしないでください。",
        "en": "It can make you a little drowsy, so please don't drive.",
        "kana": "すこし ねむく なる こと が ある ので くるま の うんてん は しないで ください"
      },
      {
        "speaker": "Customer",
        "tr": "わかりました、気をつけます。",
        "en": "I understand. I'll be careful.",
        "kana": "わかりました き を つけます"
      },
      {
        "speaker": "Pharmacist",
        "tr": "三日飲んでもよくならなかったら、病院に行ってくださいね。",
        "en": "If you're not better after three days of taking it, please see a doctor.",
        "kana": "みっか のんで も よく ならなかったら びょういん に いって ください ね"
      },
      {
        "speaker": "Pharmacist",
        "tr": "どうぞお大事に。",
        "en": "I hope you feel better soon.",
        "kana": "どうぞ おだいじ に"
      }
    ],
    "glossary": [
      {
        "tr": "喉",
        "en": "throat",
        "kana": "のど"
      },
      {
        "tr": "熱",
        "en": "fever, temperature",
        "kana": "ねつ"
      },
      {
        "tr": "測ったら",
        "en": "when I measured (it)",
        "kana": "はかったら"
      },
      {
        "tr": "咳",
        "en": "cough",
        "kana": "せき"
      },
      {
        "tr": "鼻水",
        "en": "runny nose",
        "kana": "はなみず"
      },
      {
        "tr": "風邪薬",
        "en": "cold medicine",
        "kana": "かぜぐすり"
      },
      {
        "tr": "食後",
        "en": "after meals",
        "kana": "しょくご"
      },
      {
        "tr": "二錠ずつ",
        "en": "two tablets each time",
        "kana": "にじょう ずつ"
      },
      {
        "tr": "眠くなる",
        "en": "become drowsy",
        "kana": "ねむく なる"
      },
      {
        "tr": "お大事に",
        "en": "get well soon, take care",
        "kana": "おだいじ に"
      }
    ],
    "questions": [
      {
        "q": "Since when has the customer had a sore throat?",
        "options": [
          "This morning",
          "Yesterday",
          "Three days ago",
          "Last week"
        ],
        "answer": 1,
        "explain": "昨日から喉が痛くて — since yesterday."
      },
      {
        "q": "Which symptom does the customer NOT have?",
        "options": [
          "A sore throat",
          "A slight fever",
          "A cough",
          "A runny nose"
        ],
        "answer": 3,
        "explain": "鼻水は出ません — no runny nose."
      },
      {
        "q": "How should the medicine be taken?",
        "options": [
          "One tablet before bed",
          "Two tablets three times a day after meals",
          "Three tablets once a day",
          "Two tablets before meals"
        ],
        "answer": 1,
        "explain": "一日三回、食後に二錠ずつ."
      },
      {
        "q": "Why shouldn't the customer drive?",
        "options": [
          "The medicine can make you drowsy",
          "They have a high fever",
          "It's raining",
          "The hospital is nearby"
        ],
        "answer": 0,
        "explain": "少し眠くなることがあるので — it can make you drowsy."
      }
    ]
  },
  {
    "id": "ja-my-morning",
    "kind": "story",
    "level": "A1",
    "title": "My Morning",
    "titleNative": "わたしの朝",
    "summary": "Someone describes a rainy morning on the way to work, including a forgotten umbrella.",
    "register": "polite",
    "lines": [
      {
        "tr": "今朝は六時半に起きました。",
        "en": "This morning I got up at half past six.",
        "kana": "けさ は ろくじはん に おきました"
      },
      {
        "tr": "まず、シャワーを浴びました。",
        "en": "First, I had a shower.",
        "kana": "まず シャワー を あびました"
      },
      {
        "tr": "それから、コーヒーを入れました。",
        "en": "Then I made some coffee.",
        "kana": "それから コーヒー を いれました"
      },
      {
        "tr": "朝ご飯はパンと卵でした。",
        "en": "Breakfast was bread and eggs.",
        "kana": "あさごはん は パン と たまご でした"
      },
      {
        "tr": "七時半に家を出ました。",
        "en": "I left home at half past seven.",
        "kana": "しちじはん に いえ を でました"
      },
      {
        "tr": "外は雨でした。",
        "en": "It was raining outside.",
        "kana": "そと は あめ でした"
      },
      {
        "tr": "でも、傘を忘れました。",
        "en": "But I had forgotten my umbrella.",
        "kana": "でも かさ を わすれました"
      },
      {
        "tr": "急いで家に戻りました。",
        "en": "I hurried back home.",
        "kana": "いそいで いえ に もどりました"
      },
      {
        "tr": "そして、駅まで走りました。",
        "en": "And then I ran to the station.",
        "kana": "そして えき まで はしりました"
      },
      {
        "tr": "電車はとても混んでいました。",
        "en": "The train was very crowded.",
        "kana": "でんしゃ は とても こんで いました"
      },
      {
        "tr": "八時半に会社に着きました。",
        "en": "I got to the office at half past eight.",
        "kana": "はちじはん に かいしゃ に つきました"
      },
      {
        "tr": "少し疲れましたが、遅刻しませんでした。",
        "en": "I was a bit tired, but I wasn't late.",
        "kana": "すこし つかれました が ちこく しませんでした"
      }
    ],
    "glossary": [
      {
        "tr": "今朝",
        "en": "this morning",
        "kana": "けさ"
      },
      {
        "tr": "起きました",
        "en": "got up",
        "kana": "おきました"
      },
      {
        "tr": "シャワーを浴びました",
        "en": "had a shower",
        "kana": "シャワー を あびました"
      },
      {
        "tr": "コーヒーを入れました",
        "en": "made coffee",
        "kana": "コーヒー を いれました"
      },
      {
        "tr": "傘",
        "en": "umbrella",
        "kana": "かさ"
      },
      {
        "tr": "忘れました",
        "en": "forgot",
        "kana": "わすれました"
      },
      {
        "tr": "戻りました",
        "en": "went back",
        "kana": "もどりました"
      },
      {
        "tr": "混んでいました",
        "en": "was crowded",
        "kana": "こんで いました"
      },
      {
        "tr": "遅刻",
        "en": "being late",
        "kana": "ちこく"
      }
    ],
    "questions": [
      {
        "q": "What time did the narrator get up?",
        "options": [
          "6:00",
          "6:30",
          "7:30",
          "8:30"
        ],
        "answer": 1,
        "explain": "六時半に起きました — at half past six."
      },
      {
        "q": "What did they have for breakfast?",
        "options": [
          "Rice and fish",
          "Bread and eggs",
          "Just coffee",
          "Cereal"
        ],
        "answer": 1,
        "explain": "朝ご飯はパンと卵でした."
      },
      {
        "q": "Why did they go back home?",
        "options": [
          "They had forgotten their umbrella",
          "They had forgotten their phone",
          "They had forgotten their keys",
          "The train was cancelled"
        ],
        "answer": 0,
        "explain": "傘を忘れました — they forgot their umbrella, and it was raining."
      },
      {
        "q": "Were they late for work?",
        "options": [
          "Yes, a little",
          "Yes, very late",
          "No",
          "They didn't go to work"
        ],
        "answer": 2,
        "explain": "遅刻しませんでした — they were not late."
      }
    ]
  },
  {
    "id": "ja-trip-to-kyoto",
    "kind": "story",
    "level": "A2",
    "title": "A Trip to Kyoto",
    "titleNative": "京都旅行",
    "summary": "The narrator remembers a two-day family trip to Kyoto: temples, a traditional inn and souvenirs.",
    "register": "polite",
    "lines": [
      {
        "tr": "先月、家族と京都へ旅行に行きました。",
        "en": "Last month I went on a trip to Kyoto with my family.",
        "kana": "せんげつ かぞく と きょうと へ りょこう に いきました"
      },
      {
        "tr": "東京から新幹線で二時間ちょっとかかりました。",
        "en": "It took a little over two hours from Tokyo by bullet train.",
        "kana": "とうきょう から しんかんせん で にじかん ちょっと かかりました"
      },
      {
        "tr": "一日目は、古いお寺や神社をたくさん見ました。",
        "en": "On the first day we saw lots of old temples and shrines.",
        "kana": "いちにちめ は ふるい おてら や じんじゃ を たくさん みました"
      },
      {
        "tr": "どこも観光客でいっぱいでした。",
        "en": "Everywhere was packed with tourists.",
        "kana": "どこ も かんこうきゃく で いっぱい でした"
      },
      {
        "tr": "夜は旅館に泊まって、温泉に入りました。",
        "en": "At night we stayed at a traditional inn and had a hot-spring bath.",
        "kana": "よる は りょかん に とまって おんせん に はいりました"
      },
      {
        "tr": "晩ご飯は和食で、とてもおいしかったです。",
        "en": "Dinner was Japanese food, and it was delicious.",
        "kana": "ばんごはん は わしょく で とても おいしかった です"
      },
      {
        "tr": "二日目は朝早く起きて、竹林を散歩しました。",
        "en": "On the second day we got up early and walked through a bamboo grove.",
        "kana": "ふつかめ は あさ はやく おきて ちくりん を さんぽ しました"
      },
      {
        "tr": "静かで、空気がとてもきれいでした。",
        "en": "It was quiet, and the air was very fresh.",
        "kana": "しずか で くうき が とても きれい でした"
      },
      {
        "tr": "午後は、お土産を買いに行きました。",
        "en": "In the afternoon we went to buy souvenirs.",
        "kana": "ごご は おみやげ を かい に いきました"
      },
      {
        "tr": "母は抹茶のお菓子をたくさん買いました。",
        "en": "My mother bought lots of matcha sweets.",
        "kana": "はは は まっちゃ の おかし を たくさん かいました"
      },
      {
        "tr": "帰りの新幹線では、みんなすぐに寝てしまいました。",
        "en": "On the bullet train home, everyone fell asleep straight away.",
        "kana": "かえり の しんかんせん で は みんな すぐ に ねて しまいました"
      },
      {
        "tr": "短い旅行でしたが、とても楽しかったです。",
        "en": "It was a short trip, but it was great fun.",
        "kana": "みじかい りょこう でした が とても たのしかった です"
      }
    ],
    "glossary": [
      {
        "tr": "旅行",
        "en": "trip",
        "kana": "りょこう"
      },
      {
        "tr": "新幹線",
        "en": "bullet train",
        "kana": "しんかんせん"
      },
      {
        "tr": "お寺",
        "en": "Buddhist temple",
        "kana": "おてら"
      },
      {
        "tr": "神社",
        "en": "Shinto shrine",
        "kana": "じんじゃ"
      },
      {
        "tr": "観光客",
        "en": "tourists",
        "kana": "かんこうきゃく"
      },
      {
        "tr": "旅館",
        "en": "traditional Japanese inn",
        "kana": "りょかん"
      },
      {
        "tr": "温泉",
        "en": "hot spring",
        "kana": "おんせん"
      },
      {
        "tr": "竹林",
        "en": "bamboo grove",
        "kana": "ちくりん"
      },
      {
        "tr": "お土産",
        "en": "souvenirs, gifts from a trip",
        "kana": "おみやげ"
      },
      {
        "tr": "寝てしまいました",
        "en": "ended up falling asleep",
        "kana": "ねて しまいました"
      }
    ],
    "questions": [
      {
        "q": "Who did the narrator travel with?",
        "options": [
          "Friends",
          "Their family",
          "Colleagues",
          "Nobody — they went alone"
        ],
        "answer": 1,
        "explain": "家族と京都へ旅行に行きました."
      },
      {
        "q": "Where did they stay?",
        "options": [
          "A hotel by the station",
          "A traditional inn",
          "A friend's house",
          "A campsite"
        ],
        "answer": 1,
        "explain": "旅館に泊まって — a ryokan, a traditional inn."
      },
      {
        "q": "What did they do on the second morning?",
        "options": [
          "Went shopping",
          "Walked through a bamboo grove",
          "Visited a museum",
          "Slept late"
        ],
        "answer": 1,
        "explain": "二日目は朝早く起きて、竹林を散歩しました."
      },
      {
        "q": "What happened on the train home?",
        "options": [
          "They had dinner",
          "Everyone fell asleep quickly",
          "They lost a bag",
          "They met a friend"
        ],
        "answer": 1,
        "explain": "みんなすぐに寝てしまいました."
      }
    ]
  },
  {
    "id": "ja-lost-phone",
    "kind": "story",
    "level": "B1",
    "title": "The Lost Phone",
    "titleNative": "なくしたスマホ",
    "summary": "Told in plain style: the narrator loses their phone after work and gets it back from a café.",
    "register": "casual",
    "lines": [
      {
        "tr": "先週の金曜日、仕事の帰りにスマホをなくしてしまった。",
        "en": "Last Friday, on my way home from work, I lost my phone.",
        "kana": "せんしゅう の きんようび しごと の かえり に スマホ を なくして しまった"
      },
      {
        "tr": "家に着いてから、かばんの中にないことに気づいた。",
        "en": "It was only after I got home that I noticed it wasn't in my bag.",
        "kana": "いえ に ついて から かばん の なか に ない こと に きづいた"
      },
      {
        "tr": "ポケットも机の上も探したけど、どこにもなかった。",
        "en": "I searched my pockets and my desk, but it was nowhere to be found.",
        "kana": "ポケット も つくえ の うえ も さがした けど どこ に も なかった"
      },
      {
        "tr": "最後に使ったのは、駅前のカフェだったはずだ。",
        "en": "The last place I used it must have been the café in front of the station.",
        "kana": "さいご に つかった の は えきまえ の カフェ だった はず だ"
      },
      {
        "tr": "急いで妻のスマホを借りて、自分の番号にかけてみた。",
        "en": "I quickly borrowed my wife's phone and tried calling my own number.",
        "kana": "いそいで つま の スマホ を かりて じぶん の ばんごう に かけて みた"
      },
      {
        "tr": "何回か鳴ったあとで、知らない人が出た。",
        "en": "After it rang a few times, someone I didn't know answered.",
        "kana": "なんかい か なった あと で しらない ひと が でた"
      },
      {
        "tr": "「駅前のカフェの者ですが、お忘れ物をお預かりしております」と言われた。",
        "en": "They said, \"This is the café in front of the station — we're looking after something you left behind.\"",
        "kana": "えきまえ の カフェ の もの です が おわすれもの を おあずかり して おります と いわれた"
      },
      {
        "tr": "本当にほっとして、思わず何度もお礼を言った。",
        "en": "I was so relieved that I found myself thanking them again and again.",
        "kana": "ほんとう に ほっと して おもわず なんど も おれい を いった"
      },
      {
        "tr": "その日の夜、すぐにカフェまで取りに行った。",
        "en": "That same evening I went straight to the café to pick it up.",
        "kana": "その ひ の よる すぐ に カフェ まで とり に いった"
      },
      {
        "tr": "店員さんによると、いすの下に落ちていたそうだ。",
        "en": "According to the staff member, it had been lying under a chair.",
        "kana": "てんいん さん に よる と いす の した に おちて いた そう だ"
      },
      {
        "tr": "お礼にコーヒーを一杯注文して、ゆっくり飲んでから帰った。",
        "en": "To say thank you, I ordered a coffee and drank it slowly before going home.",
        "kana": "おれい に コーヒー を いっぱい ちゅうもん して ゆっくり のんで から かえった"
      },
      {
        "tr": "これからは、店を出る前に必ず忘れ物がないか確認しようと思う。",
        "en": "From now on, I'm going to make sure I haven't left anything behind before I leave a shop.",
        "kana": "これから は みせ を でる まえ に かならず わすれもの が ない か かくにん しよう と おもう"
      }
    ],
    "glossary": [
      {
        "tr": "なくしてしまった",
        "en": "lost (and regret it)",
        "kana": "なくして しまった"
      },
      {
        "tr": "気づいた",
        "en": "noticed",
        "kana": "きづいた"
      },
      {
        "tr": "探した",
        "en": "searched, looked for",
        "kana": "さがした"
      },
      {
        "tr": "はずだ",
        "en": "must have been, should be",
        "kana": "はず だ"
      },
      {
        "tr": "借りて",
        "en": "borrowed",
        "kana": "かりて"
      },
      {
        "tr": "お忘れ物",
        "en": "something left behind (polite)",
        "kana": "おわすれもの"
      },
      {
        "tr": "お預かりしております",
        "en": "we are looking after it for you (humble)",
        "kana": "おあずかり して おります"
      },
      {
        "tr": "ほっとして",
        "en": "feeling relieved",
        "kana": "ほっと して"
      },
      {
        "tr": "思わず",
        "en": "without meaning to, instinctively",
        "kana": "おもわず"
      },
      {
        "tr": "〜によると…そうだ",
        "en": "according to…, apparently…",
        "kana": "に よる と そう だ"
      }
    ],
    "questions": [
      {
        "q": "When did the narrator lose the phone?",
        "options": [
          "On the way to work on Monday",
          "On the way home from work last Friday",
          "At home on Sunday",
          "At lunch yesterday"
        ],
        "answer": 1,
        "explain": "先週の金曜日、仕事の帰りに — last Friday on the way home from work."
      },
      {
        "q": "How did the narrator find out where the phone was?",
        "options": [
          "By checking an app on a computer",
          "By calling their own number from their wife's phone",
          "By asking at the station office",
          "A friend told them"
        ],
        "answer": 1,
        "explain": "妻のスマホを借りて、自分の番号にかけてみた."
      },
      {
        "q": "Where had the phone been?",
        "options": [
          "In the narrator's pocket",
          "Under a chair at the café",
          "On the train",
          "On the narrator's desk"
        ],
        "answer": 1,
        "explain": "いすの下に落ちていたそうだ — it had fallen under a chair."
      },
      {
        "q": "How did the narrator say thank you?",
        "options": [
          "By giving the staff a present",
          "By ordering a coffee",
          "By writing a review",
          "By paying a reward"
        ],
        "answer": 1,
        "explain": "お礼にコーヒーを一杯注文して."
      }
    ]
  },
  {
    "id": "ja-surprise-birthday",
    "kind": "story",
    "level": "A2",
    "title": "A Surprise Birthday",
    "titleNative": "サプライズの誕生日",
    "summary": "The narrator thinks their friends have forgotten their birthday, until a surprise party in the evening.",
    "register": "polite",
    "lines": [
      {
        "tr": "昨日は私の二十五歳の誕生日でした。",
        "en": "Yesterday was my twenty-fifth birthday.",
        "kana": "きのう は わたし の にじゅうごさい の たんじょうび でした"
      },
      {
        "tr": "朝、母からメッセージが来ました。",
        "en": "In the morning I got a message from my mother.",
        "kana": "あさ はは から メッセージ が きました"
      },
      {
        "tr": "でも、友達からは何も連絡がありませんでした。",
        "en": "But I didn't hear anything from my friends.",
        "kana": "でも ともだち から は なにも れんらく が ありませんでした"
      },
      {
        "tr": "少しさびしい気持ちで、仕事に行きました。",
        "en": "I went to work feeling a little lonely.",
        "kana": "すこし さびしい きもち で しごと に いきました"
      },
      {
        "tr": "夜、友達のアパートに呼ばれました。",
        "en": "In the evening I was invited over to a friend's flat.",
        "kana": "よる ともだち の アパート に よばれました"
      },
      {
        "tr": "ドアを開けると、みんなが「お誕生日おめでとう！」と言いました。",
        "en": "When I opened the door, everyone said, \"Happy birthday!\"",
        "kana": "ドア を あける と みんな が おたんじょうび おめでとう と いいました"
      },
      {
        "tr": "サプライズパーティーだったんです。",
        "en": "It was a surprise party!",
        "kana": "サプライズ パーティー だった ん です"
      },
      {
        "tr": "テーブルには、手作りのケーキと料理がたくさんありました。",
        "en": "On the table there was a homemade cake and lots of food.",
        "kana": "テーブル に は てづくり の ケーキ と りょうり が たくさん ありました"
      },
      {
        "tr": "みんなで写真をたくさん撮りました。",
        "en": "We all took lots of photos together.",
        "kana": "みんな で しゃしん を たくさん とりました"
      },
      {
        "tr": "プレゼントは、ずっとほしかった青いマフラーでした。",
        "en": "The present was a blue scarf I'd wanted for ages.",
        "kana": "プレゼント は ずっと ほしかった あおい マフラー でした"
      },
      {
        "tr": "朝は少しさびしかったですが、最高の一日になりました。",
        "en": "I felt a bit lonely in the morning, but it turned into the best day ever.",
        "kana": "あさ は すこし さびしかった です が さいこう の いちにち に なりました"
      },
      {
        "tr": "友達に本当に感謝しています。",
        "en": "I'm really grateful to my friends.",
        "kana": "ともだち に ほんとう に かんしゃ して います"
      }
    ],
    "glossary": [
      {
        "tr": "誕生日",
        "en": "birthday",
        "kana": "たんじょうび"
      },
      {
        "tr": "連絡",
        "en": "contact, getting in touch",
        "kana": "れんらく"
      },
      {
        "tr": "さびしい",
        "en": "lonely",
        "kana": "さびしい"
      },
      {
        "tr": "気持ち",
        "en": "feeling",
        "kana": "きもち"
      },
      {
        "tr": "呼ばれました",
        "en": "was invited (over)",
        "kana": "よばれました"
      },
      {
        "tr": "おめでとう",
        "en": "congratulations, happy (birthday)",
        "kana": "おめでとう"
      },
      {
        "tr": "手作り",
        "en": "homemade",
        "kana": "てづくり"
      },
      {
        "tr": "マフラー",
        "en": "scarf",
        "kana": "マフラー"
      },
      {
        "tr": "最高",
        "en": "the best",
        "kana": "さいこう"
      },
      {
        "tr": "感謝しています",
        "en": "I am grateful",
        "kana": "かんしゃ して います"
      }
    ],
    "questions": [
      {
        "q": "How old did the narrator turn?",
        "options": [
          "20",
          "22",
          "25",
          "30"
        ],
        "answer": 2,
        "explain": "二十五歳の誕生日 — their twenty-fifth birthday."
      },
      {
        "q": "Why did the narrator feel a little lonely?",
        "options": [
          "Their mother forgot the birthday",
          "Their friends hadn't been in touch",
          "They had to work late",
          "It was raining"
        ],
        "answer": 1,
        "explain": "友達からは何も連絡がありませんでした."
      },
      {
        "q": "What was waiting at the friend's flat?",
        "options": [
          "A surprise party",
          "A job offer",
          "A broken door",
          "Nobody"
        ],
        "answer": 0,
        "explain": "サプライズパーティーだったんです."
      },
      {
        "q": "What was the present?",
        "options": [
          "A red scarf",
          "A blue scarf",
          "A cake",
          "A camera"
        ],
        "answer": 1,
        "explain": "ずっとほしかった青いマフラー — a blue scarf."
      }
    ]
  },
  {
    "id": "ja-lunch-texts",
    "kind": "everyday",
    "level": "A1",
    "title": "Lunch Plans by Text",
    "titleNative": "ランチのメッセージ",
    "summary": "Two friends text each other to arrange lunch, and one of them is running late.",
    "register": "casual",
    "lines": [
      {
        "speaker": "Aoi",
        "tr": "おはよう、今日のランチ何時にする？",
        "en": "Morning! What time shall we have lunch today?",
        "kana": "おはよう きょう の ランチ なんじ に する"
      },
      {
        "speaker": "Sota",
        "tr": "十二時半はどう？",
        "en": "How about half past twelve?",
        "kana": "じゅうにじはん は どう"
      },
      {
        "speaker": "Aoi",
        "tr": "いいよ、どこで会う？",
        "en": "OK, where shall we meet?",
        "kana": "いい よ どこ で あう"
      },
      {
        "speaker": "Sota",
        "tr": "駅の北口で待ってるね。",
        "en": "I'll wait for you at the station's north exit.",
        "kana": "えき の きたぐち で まってる ね"
      },
      {
        "speaker": "Aoi",
        "tr": "了解！",
        "en": "Got it!",
        "kana": "りょうかい"
      },
      {
        "speaker": "Aoi",
        "tr": "ごめん、電車が遅れてる…",
        "en": "Sorry, my train's running late…",
        "kana": "ごめん でんしゃ が おくれてる"
      },
      {
        "speaker": "Sota",
        "tr": "大丈夫、ゆっくり来て。",
        "en": "No worries, take your time.",
        "kana": "だいじょうぶ ゆっくり きて"
      },
      {
        "speaker": "Aoi",
        "tr": "10分ぐらい遅れそう。",
        "en": "Looks like I'll be about ten minutes late.",
        "kana": "じゅっぷん ぐらい おくれそう"
      },
      {
        "speaker": "Sota",
        "tr": "じゃあ、先にお店に入ってるね。",
        "en": "Then I'll go into the restaurant first.",
        "kana": "じゃあ さき に おみせ に はいってる ね"
      },
      {
        "speaker": "Sota",
        "tr": "駅前のパスタのお店だよ。",
        "en": "It's the pasta place in front of the station.",
        "kana": "えきまえ の パスタ の おみせ だ よ"
      },
      {
        "speaker": "Aoi",
        "tr": "ありがとう、すぐ行く！",
        "en": "Thanks, I'll be right there!",
        "kana": "ありがとう すぐ いく"
      },
      {
        "speaker": "Aoi",
        "tr": "着いた、どこにいる？",
        "en": "I'm here — where are you?",
        "kana": "ついた どこ に いる"
      },
      {
        "speaker": "Sota",
        "tr": "窓のそばの席だよ。",
        "en": "I'm at the table by the window.",
        "kana": "まど の そば の せき だ よ"
      }
    ],
    "glossary": [
      {
        "tr": "ランチ",
        "en": "lunch",
        "kana": "ランチ"
      },
      {
        "tr": "北口",
        "en": "north exit",
        "kana": "きたぐち"
      },
      {
        "tr": "待ってる",
        "en": "I'll be waiting (casual)",
        "kana": "まってる"
      },
      {
        "tr": "了解",
        "en": "got it, OK",
        "kana": "りょうかい"
      },
      {
        "tr": "遅れてる",
        "en": "is running late (casual)",
        "kana": "おくれてる"
      },
      {
        "tr": "大丈夫",
        "en": "it's fine, no problem",
        "kana": "だいじょうぶ"
      },
      {
        "tr": "遅れそう",
        "en": "looks like (I) will be late",
        "kana": "おくれそう"
      },
      {
        "tr": "先に",
        "en": "first, ahead (of you)",
        "kana": "さき に"
      },
      {
        "tr": "着いた",
        "en": "I've arrived",
        "kana": "ついた"
      },
      {
        "tr": "窓のそば",
        "en": "by the window",
        "kana": "まど の そば"
      }
    ],
    "questions": [
      {
        "q": "What time do they arrange to meet?",
        "options": [
          "12:00",
          "12:30",
          "1:00",
          "1:30"
        ],
        "answer": 1,
        "explain": "Sota suggests 十二時半 and Aoi agrees."
      },
      {
        "q": "Why is Aoi late?",
        "options": [
          "She overslept",
          "Her train is delayed",
          "She got lost",
          "She forgot her phone"
        ],
        "answer": 1,
        "explain": "電車が遅れてる — her train is running late."
      },
      {
        "q": "What kind of restaurant is it?",
        "options": [
          "Ramen",
          "Sushi",
          "Pasta",
          "Curry"
        ],
        "answer": 2,
        "explain": "駅前のパスタのお店だよ."
      },
      {
        "q": "Where is Sota sitting?",
        "options": [
          "By the door",
          "By the window",
          "At the counter",
          "Outside"
        ],
        "answer": 1,
        "explain": "窓のそばの席だよ."
      }
    ]
  },
  {
    "id": "ja-signs-and-notices",
    "kind": "everyday",
    "level": "B1",
    "title": "Signs and Notices",
    "titleNative": "お知らせと注意書き",
    "summary": "Signs and notices you might read on a shop door, in the street, in an apartment building and at a station.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Shop door",
        "tr": "本日は定休日です。",
        "en": "We are closed today (our regular day off).",
        "kana": "ほんじつ は ていきゅうび です"
      },
      {
        "speaker": "Shop door",
        "tr": "営業時間は午前十時から午後八時までです。",
        "en": "Opening hours are from 10 a.m. to 8 p.m.",
        "kana": "えいぎょう じかん は ごぜん じゅうじ から ごご はちじ まで です"
      },
      {
        "speaker": "Shop door",
        "tr": "店内での写真撮影はご遠慮ください。",
        "en": "Please refrain from taking photos inside the shop.",
        "kana": "てんない で の しゃしん さつえい は ごえんりょ ください"
      },
      {
        "speaker": "Street",
        "tr": "工事中のため、この先は通行できません。",
        "en": "Due to construction work, there is no way through beyond this point.",
        "kana": "こうじちゅう の ため この さき は つうこう できません"
      },
      {
        "speaker": "Street",
        "tr": "ここに自転車を止めないでください。",
        "en": "Please do not park bicycles here.",
        "kana": "ここ に じてんしゃ を とめないで ください"
      },
      {
        "speaker": "Apartment notice",
        "tr": "ゴミは収集日の朝八時までに出してください。",
        "en": "Please put your rubbish out by 8 a.m. on collection day.",
        "kana": "ゴミ は しゅうしゅうび の あさ はちじ まで に だして ください"
      },
      {
        "speaker": "Apartment notice",
        "tr": "十一月二十日の午前中、エレベーターの点検を行います。",
        "en": "The lift will be inspected on the morning of 20 November.",
        "kana": "じゅういちがつ はつか の ごぜんちゅう エレベーター の てんけん を おこないます"
      },
      {
        "speaker": "Apartment notice",
        "tr": "点検中はエレベーターをご利用いただけません。",
        "en": "The lift cannot be used during the inspection.",
        "kana": "てんけんちゅう は エレベーター を ごりよう いただけません"
      },
      {
        "speaker": "Station",
        "tr": "優先席付近では、携帯電話をマナーモードに設定してください。",
        "en": "Near the priority seats, please set your mobile phone to silent mode.",
        "kana": "ゆうせんせき ふきん で は けいたい でんわ を マナーモード に せってい して ください"
      },
      {
        "speaker": "Station",
        "tr": "駆け込み乗車はおやめください。",
        "en": "Please do not rush onto the train.",
        "kana": "かけこみ じょうしゃ は おやめ ください"
      },
      {
        "speaker": "Station",
        "tr": "お忘れ物にご注意ください。",
        "en": "Please make sure you have all your belongings.",
        "kana": "おわすれもの に ごちゅうい ください"
      },
      {
        "speaker": "Station",
        "tr": "エスカレーターでは歩かず、立ち止まってご利用ください。",
        "en": "Please do not walk on the escalator; stand still while using it.",
        "kana": "エスカレーター で は あるかず たちどまって ごりよう ください"
      }
    ],
    "glossary": [
      {
        "tr": "定休日",
        "en": "regular closing day",
        "kana": "ていきゅうび"
      },
      {
        "tr": "営業時間",
        "en": "business hours",
        "kana": "えいぎょう じかん"
      },
      {
        "tr": "ご遠慮ください",
        "en": "please refrain from",
        "kana": "ごえんりょ ください"
      },
      {
        "tr": "工事中",
        "en": "under construction",
        "kana": "こうじちゅう"
      },
      {
        "tr": "通行できません",
        "en": "no way through, cannot pass",
        "kana": "つうこう できません"
      },
      {
        "tr": "収集日",
        "en": "collection day",
        "kana": "しゅうしゅうび"
      },
      {
        "tr": "点検",
        "en": "inspection, maintenance check",
        "kana": "てんけん"
      },
      {
        "tr": "優先席",
        "en": "priority seats",
        "kana": "ゆうせんせき"
      },
      {
        "tr": "駆け込み乗車",
        "en": "rushing onto a train as the doors close",
        "kana": "かけこみ じょうしゃ"
      },
      {
        "tr": "立ち止まって",
        "en": "standing still",
        "kana": "たちどまって"
      }
    ],
    "questions": [
      {
        "q": "Why is the shop closed today?",
        "options": [
          "It's the shop's regular day off",
          "It's being repaired",
          "It's a national holiday",
          "The staff are ill"
        ],
        "answer": 0,
        "explain": "本日は定休日です — today is the regular closing day."
      },
      {
        "q": "What is not allowed inside the shop?",
        "options": [
          "Eating",
          "Taking photos",
          "Using phones",
          "Bringing pets"
        ],
        "answer": 1,
        "explain": "店内での写真撮影はご遠慮ください."
      },
      {
        "q": "What will happen on the morning of 20 November?",
        "options": [
          "Rubbish will not be collected",
          "The lift will be inspected",
          "The road will reopen",
          "The station will close"
        ],
        "answer": 1,
        "explain": "エレベーターの点検を行います — the lift will be inspected."
      },
      {
        "q": "What should you do on the escalator?",
        "options": [
          "Walk on the right",
          "Stand still",
          "Hold your phone",
          "Walk quickly"
        ],
        "answer": 1,
        "explain": "歩かず、立ち止まって — don't walk; stand still."
      }
    ]
  },
  {
    "id": "ja-cafe-menu",
    "kind": "everyday",
    "level": "A1",
    "title": "The Café Menu",
    "titleNative": "カフェのメニュー",
    "summary": "A short café menu, followed by a customer ordering a cake set from the waiter.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Menu",
        "tr": "ブレンドコーヒー　400円",
        "en": "House blend coffee — 400 yen",
        "kana": "ブレンド コーヒー よんひゃく えん"
      },
      {
        "speaker": "Menu",
        "tr": "カフェラテ　450円",
        "en": "Café latte — 450 yen",
        "kana": "カフェラテ よんひゃくごじゅう えん"
      },
      {
        "speaker": "Menu",
        "tr": "紅茶　400円",
        "en": "Tea — 400 yen",
        "kana": "こうちゃ よんひゃく えん"
      },
      {
        "speaker": "Menu",
        "tr": "本日のケーキ　500円",
        "en": "Today's cake — 500 yen",
        "kana": "ほんじつ の ケーキ ごひゃく えん"
      },
      {
        "speaker": "Menu",
        "tr": "ケーキセット　ドリンク付き　800円",
        "en": "Cake set with a drink — 800 yen",
        "kana": "ケーキ セット ドリンク つき はっぴゃく えん"
      },
      {
        "speaker": "Menu",
        "tr": "サンドイッチ　600円",
        "en": "Sandwich — 600 yen",
        "kana": "サンドイッチ ろっぴゃく えん"
      },
      {
        "speaker": "Waiter",
        "tr": "いらっしゃいませ、ご注文はお決まりですか。",
        "en": "Hello — are you ready to order?",
        "kana": "いらっしゃいませ ごちゅうもん は おきまり です か"
      },
      {
        "speaker": "Customer",
        "tr": "ケーキセットをお願いします。",
        "en": "The cake set, please.",
        "kana": "ケーキ セット を おねがい します"
      },
      {
        "speaker": "Waiter",
        "tr": "お飲み物は何になさいますか。",
        "en": "What would you like to drink?",
        "kana": "おのみもの は なに に なさいます か"
      },
      {
        "speaker": "Customer",
        "tr": "カフェラテでお願いします。",
        "en": "I'll have a café latte, please.",
        "kana": "カフェラテ で おねがい します"
      },
      {
        "speaker": "Waiter",
        "tr": "カフェラテはプラス50円になりますが、よろしいですか。",
        "en": "A café latte is 50 yen extra — is that all right?",
        "kana": "カフェラテ は プラス ごじゅう えん に なります が よろしい です か"
      },
      {
        "speaker": "Customer",
        "tr": "はい、大丈夫です。",
        "en": "Yes, that's fine.",
        "kana": "はい だいじょうぶ です"
      },
      {
        "speaker": "Waiter",
        "tr": "合計で850円です。",
        "en": "That's 850 yen altogether.",
        "kana": "ごうけい で はっぴゃくごじゅう えん です"
      }
    ],
    "glossary": [
      {
        "tr": "紅茶",
        "en": "black tea",
        "kana": "こうちゃ"
      },
      {
        "tr": "本日の",
        "en": "today's",
        "kana": "ほんじつ の"
      },
      {
        "tr": "ドリンク付き",
        "en": "drink included",
        "kana": "ドリンク つき"
      },
      {
        "tr": "ご注文はお決まりですか",
        "en": "are you ready to order?",
        "kana": "ごちゅうもん は おきまり です か"
      },
      {
        "tr": "お飲み物",
        "en": "drink (polite)",
        "kana": "おのみもの"
      },
      {
        "tr": "なさいますか",
        "en": "would you like (polite)",
        "kana": "なさいます か"
      },
      {
        "tr": "プラス",
        "en": "extra, additional",
        "kana": "プラス"
      },
      {
        "tr": "よろしいですか",
        "en": "is that all right? (polite)",
        "kana": "よろしい です か"
      },
      {
        "tr": "合計",
        "en": "total",
        "kana": "ごうけい"
      }
    ],
    "questions": [
      {
        "q": "How much is the cake set on the menu?",
        "options": [
          "500 yen",
          "600 yen",
          "800 yen",
          "850 yen"
        ],
        "answer": 2,
        "explain": "ケーキセット　ドリンク付き　800円."
      },
      {
        "q": "Which drink does the customer choose?",
        "options": [
          "House blend coffee",
          "Café latte",
          "Tea",
          "Water"
        ],
        "answer": 1,
        "explain": "カフェラテでお願いします."
      },
      {
        "q": "Why does the customer pay 50 yen extra?",
        "options": [
          "The cake is extra large",
          "The café latte costs more in the set",
          "It's a service charge",
          "For a takeaway bag"
        ],
        "answer": 1,
        "explain": "カフェラテはプラス50円になります."
      },
      {
        "q": "What is the total?",
        "options": [
          "800 yen",
          "850 yen",
          "900 yen",
          "1,250 yen"
        ],
        "answer": 1,
        "explain": "合計で850円です."
      }
    ]
  },
  {
    "id": "ja-new-colleagues-intro",
    "kind": "speech",
    "level": "A2",
    "title": "Introducing Myself at Work",
    "titleNative": "新しい職場でのあいさつ",
    "summary": "On her first day, a new employee introduces herself to her colleagues in the sales department.",
    "register": "polite",
    "lines": [
      {
        "tr": "皆さん、はじめまして。",
        "en": "Hello everyone, nice to meet you.",
        "kana": "みなさん はじめまして"
      },
      {
        "tr": "今日から営業部でお世話になります、中村ゆいと申します。",
        "en": "My name is Yui Nakamura, and I'm joining the sales department from today.",
        "kana": "きょう から えいぎょうぶ で おせわ に なります なかむら ゆい と もうします"
      },
      {
        "tr": "前は大阪の会社で、五年間営業の仕事をしていました。",
        "en": "Before this I worked in sales at a company in Osaka for five years.",
        "kana": "まえ は おおさか の かいしゃ で ごねんかん えいぎょう の しごと を して いました"
      },
      {
        "tr": "東京に住むのは初めてなので、まだこのあたりのことがよくわかりません。",
        "en": "It's my first time living in Tokyo, so I don't know this area very well yet.",
        "kana": "とうきょう に すむ の は はじめて な ので まだ この あたり の こと が よく わかりません"
      },
      {
        "tr": "趣味は料理と山登りです。",
        "en": "My hobbies are cooking and hiking.",
        "kana": "しゅみ は りょうり と やまのぼり です"
      },
      {
        "tr": "大阪では、週末によく近くの山に登っていました。",
        "en": "In Osaka, I often climbed the mountains nearby at weekends.",
        "kana": "おおさか で は しゅうまつ に よく ちかく の やま に のぼって いました"
      },
      {
        "tr": "おいしいお店やいいハイキングコースがあったら、ぜひ教えてください。",
        "en": "If you know any good restaurants or hiking trails, please do tell me.",
        "kana": "おいしい おみせ や いい ハイキング コース が あったら ぜひ おしえて ください"
      },
      {
        "tr": "仕事では、ご迷惑をおかけすることもあるかと思いますが、精一杯頑張ります。",
        "en": "I may cause you some trouble at work, but I'll do my very best.",
        "kana": "しごと で は ごめいわく を おかけ する こと も ある か と おもいます が せいいっぱい がんばります"
      },
      {
        "tr": "いろいろ教えていただけるとうれしいです。",
        "en": "I'd be grateful if you could teach me the ropes.",
        "kana": "いろいろ おしえて いただける と うれしい です"
      },
      {
        "tr": "どうぞよろしくお願いいたします。",
        "en": "I look forward to working with you all.",
        "kana": "どうぞ よろしく おねがい いたします"
      }
    ],
    "glossary": [
      {
        "tr": "営業部",
        "en": "sales department",
        "kana": "えいぎょうぶ"
      },
      {
        "tr": "お世話になります",
        "en": "I'll be in your care (set phrase when joining a group)",
        "kana": "おせわ に なります"
      },
      {
        "tr": "と申します",
        "en": "my name is… (humble)",
        "kana": "と もうします"
      },
      {
        "tr": "このあたり",
        "en": "this area, around here",
        "kana": "この あたり"
      },
      {
        "tr": "趣味",
        "en": "hobby",
        "kana": "しゅみ"
      },
      {
        "tr": "山登り",
        "en": "hiking, mountain climbing",
        "kana": "やまのぼり"
      },
      {
        "tr": "ぜひ",
        "en": "by all means, please do",
        "kana": "ぜひ"
      },
      {
        "tr": "ご迷惑をおかけする",
        "en": "cause (you) trouble (humble)",
        "kana": "ごめいわく を おかけ する"
      },
      {
        "tr": "精一杯頑張ります",
        "en": "I'll do my very best",
        "kana": "せいいっぱい がんばります"
      },
      {
        "tr": "よろしくお願いいたします",
        "en": "I look forward to working with you (very polite)",
        "kana": "よろしく おねがい いたします"
      }
    ],
    "questions": [
      {
        "q": "Which department will the speaker work in?",
        "options": [
          "Sales",
          "Accounting",
          "Human resources",
          "Design"
        ],
        "answer": 0,
        "explain": "営業部でお世話になります — the sales department."
      },
      {
        "q": "Where did she work before?",
        "options": [
          "In Tokyo",
          "In Osaka",
          "Abroad",
          "She has never worked before"
        ],
        "answer": 1,
        "explain": "前は大阪の会社で — at a company in Osaka."
      },
      {
        "q": "What are her hobbies?",
        "options": [
          "Cooking and hiking",
          "Reading and films",
          "Music and travel",
          "Sport and games"
        ],
        "answer": 0,
        "explain": "趣味は料理と山登りです."
      },
      {
        "q": "What does she ask her colleagues to do?",
        "options": [
          "Lend her a map",
          "Tell her about good restaurants and hiking trails",
          "Help her move house",
          "Teach her English"
        ],
        "answer": 1,
        "explain": "おいしいお店やいいハイキングコースがあったら、ぜひ教えてください."
      }
    ]
  },
  {
    "id": "ja-wedding-toast",
    "kind": "speech",
    "level": "B1",
    "title": "A Toast at a Friend's Wedding",
    "titleNative": "友人の結婚式での乾杯のあいさつ",
    "summary": "The groom's university friend gives a short speech and leads the toast at the wedding reception.",
    "register": "polite",
    "lines": [
      {
        "tr": "健太さん、美咲さん、ご結婚おめでとうございます。",
        "en": "Kenta, Misaki, congratulations on your marriage.",
        "kana": "けんた さん みさき さん ごけっこん おめでとう ございます"
      },
      {
        "tr": "ご両家の皆様にも、心よりお祝い申し上げます。",
        "en": "My warmest congratulations to both families as well.",
        "kana": "ごりょうけ の みなさま に も こころ より おいわい もうしあげます"
      },
      {
        "tr": "ただいまご紹介いただきました、健太さんの大学時代からの友人の佐々木と申します。",
        "en": "As you've just heard, my name is Sasaki, and I've been Kenta's friend since university.",
        "kana": "ただいま ごしょうかい いただきました けんた さん の だいがく じだい から の ゆうじん の ささき と もうします"
      },
      {
        "tr": "健太さんとは、大学のサークルで初めて会いました。",
        "en": "I first met Kenta in a university club.",
        "kana": "けんた さん と は だいがく の サークル で はじめて あいました"
      },
      {
        "tr": "彼はいつも明るくて、困っている人がいると、すぐに助けてくれる人です。",
        "en": "He's always cheerful, and whenever someone is in trouble, he's the first to help.",
        "kana": "かれ は いつも あかるくて こまって いる ひと が いる と すぐ に たすけて くれる ひと です"
      },
      {
        "tr": "三年前、彼から「すごく素敵な人に出会った」と電話があったのを、今でもよく覚えています。",
        "en": "I still clearly remember him phoning me three years ago to say, \"I've met someone really wonderful.\"",
        "kana": "さんねん まえ かれ から すごく すてき な ひと に であった と でんわ が あった の を いま でも よく おぼえて います"
      },
      {
        "tr": "今日、お二人の幸せそうな笑顔を見て、私もうれしい気持ちでいっぱいです。",
        "en": "Seeing your happy smiles today fills me with joy as well.",
        "kana": "きょう おふたり の しあわせそう な えがお を みて わたし も うれしい きもち で いっぱい です"
      },
      {
        "tr": "美咲さん、健太さんは少しうっかりしたところもありますが、本当に心の優しい人です。",
        "en": "Misaki, Kenta can be a little absent-minded, but he truly has a kind heart.",
        "kana": "みさき さん けんた さん は すこし うっかり した ところ も あります が ほんとう に こころ の やさしい ひと です"
      },
      {
        "tr": "どうかこれからも、お二人で支え合って、笑顔あふれる家庭を築いてください。",
        "en": "Please keep supporting each other and build a home full of smiles.",
        "kana": "どうか これから も おふたり で ささえあって えがお あふれる かてい を きずいて ください"
      },
      {
        "tr": "それでは皆様、お手元のグラスをお持ちください。",
        "en": "And now, everyone, please pick up your glasses.",
        "kana": "それ で は みなさま おてもと の グラス を おもち ください"
      },
      {
        "tr": "お二人の末永いお幸せを願って、乾杯！",
        "en": "To the lasting happiness of the couple — cheers!",
        "kana": "おふたり の すえながい おしあわせ を ねがって かんぱい"
      }
    ],
    "glossary": [
      {
        "tr": "ご結婚",
        "en": "marriage (polite)",
        "kana": "ごけっこん"
      },
      {
        "tr": "ご両家",
        "en": "both families (of the bride and groom)",
        "kana": "ごりょうけ"
      },
      {
        "tr": "心より",
        "en": "from the heart, sincerely",
        "kana": "こころ より"
      },
      {
        "tr": "友人",
        "en": "friend (formal)",
        "kana": "ゆうじん"
      },
      {
        "tr": "サークル",
        "en": "university club",
        "kana": "サークル"
      },
      {
        "tr": "困っている",
        "en": "in trouble, struggling",
        "kana": "こまって いる"
      },
      {
        "tr": "出会った",
        "en": "met (someone special)",
        "kana": "であった"
      },
      {
        "tr": "うっかりした",
        "en": "careless, absent-minded",
        "kana": "うっかり した"
      },
      {
        "tr": "支え合って",
        "en": "supporting each other",
        "kana": "ささえあって"
      },
      {
        "tr": "乾杯",
        "en": "cheers! (a toast)",
        "kana": "かんぱい"
      }
    ],
    "questions": [
      {
        "q": "Who is giving the speech?",
        "options": [
          "The bride's father",
          "The groom's friend from university",
          "The groom's boss",
          "The bride's sister"
        ],
        "answer": 1,
        "explain": "健太さんの大学時代からの友人の佐々木と申します."
      },
      {
        "q": "Where did the speaker first meet Kenta?",
        "options": [
          "At work",
          "In a university club",
          "At high school",
          "At a wedding"
        ],
        "answer": 1,
        "explain": "大学のサークルで初めて会いました."
      },
      {
        "q": "What did Kenta say on the phone three years ago?",
        "options": [
          "He'd got a new job",
          "He'd met someone wonderful",
          "He was moving abroad",
          "He was getting married the next week"
        ],
        "answer": 1,
        "explain": "「すごく素敵な人に出会った」."
      },
      {
        "q": "How does the speaker describe Kenta?",
        "options": [
          "Serious and quiet",
          "Cheerful and quick to help others",
          "Funny but lazy",
          "Shy and nervous"
        ],
        "answer": 1,
        "explain": "いつも明るくて、困っている人がいると、すぐに助けてくれる人です."
      }
    ]
  },
  {
    "id": "ja-my-hometown-kanazawa",
    "kind": "speech",
    "level": "B1",
    "title": "My Hometown, Kanazawa",
    "titleNative": "わたしのふるさと、金沢",
    "summary": "A short talk introducing the speaker's hometown of Kanazawa: its garden, gold leaf, seafood and snowy winters.",
    "register": "polite",
    "lines": [
      {
        "tr": "今日は、私のふるさと、金沢について紹介したいと思います。",
        "en": "Today I'd like to tell you about my hometown, Kanazawa.",
        "kana": "きょう は わたし の ふるさと かなざわ に ついて しょうかい したい と おもいます"
      },
      {
        "tr": "金沢は日本海側にある石川県の町で、東京から新幹線で二時間半ぐらいです。",
        "en": "Kanazawa is a city in Ishikawa Prefecture on the Sea of Japan coast, about two and a half hours from Tokyo by bullet train.",
        "kana": "かなざわ は にほんかいがわ に ある いしかわけん の まち で とうきょう から しんかんせん で にじかんはん ぐらい です"
      },
      {
        "tr": "一番有名な場所は、日本三名園の一つと言われる兼六園です。",
        "en": "The most famous place is Kenrokuen, which is said to be one of Japan's three great gardens.",
        "kana": "いちばん ゆうめい な ばしょ は にほん さんめいえん の ひとつ と いわれる けんろくえん です"
      },
      {
        "tr": "春は桜、秋は紅葉がとてもきれいで、季節ごとに違う景色が楽しめます。",
        "en": "The cherry blossoms in spring and the autumn leaves are beautiful, so you can enjoy different scenery every season.",
        "kana": "はる は さくら あき は こうよう が とても きれい で きせつ ごと に ちがう けしき が たのしめます"
      },
      {
        "tr": "また、金沢は金箔の町としても知られています。",
        "en": "Kanazawa is also known as a city of gold leaf.",
        "kana": "また かなざわ は きんぱく の まち と して も しられて います"
      },
      {
        "tr": "観光客に人気なのは、金箔がのったソフトクリームです。",
        "en": "Something popular with tourists is soft-serve ice cream topped with gold leaf.",
        "kana": "かんこうきゃく に にんき な の は きんぱく が のった ソフトクリーム です"
      },
      {
        "tr": "海に近いので、魚がとても新鮮でおいしいです。",
        "en": "Because it's close to the sea, the fish is very fresh and tasty.",
        "kana": "うみ に ちかい ので さかな が とても しんせん で おいしい です"
      },
      {
        "tr": "私のおすすめは、朝、市場で食べる海鮮丼です。",
        "en": "My recommendation is a seafood rice bowl at the market in the morning.",
        "kana": "わたし の おすすめ は あさ いちば で たべる かいせんどん です"
      },
      {
        "tr": "冬は雪が多くて寒いですが、雪の中の古い町並みもとても美しいです。",
        "en": "Winters are cold with a lot of snow, but the old streets look beautiful in the snow.",
        "kana": "ふゆ は ゆき が おおくて さむい です が ゆき の なか の ふるい まちなみ も とても うつくしい です"
      },
      {
        "tr": "東京のような大都市ではありませんが、伝統と自然を一緒に楽しめるところが魅力です。",
        "en": "It isn't a huge city like Tokyo, but its charm is that you can enjoy tradition and nature together.",
        "kana": "とうきょう の よう な だいとし で は ありません が でんとう と しぜん を いっしょ に たのしめる ところ が みりょく です"
      },
      {
        "tr": "皆さんも機会があったら、ぜひ一度遊びに来てください。",
        "en": "If you ever get the chance, please do come and visit.",
        "kana": "みなさん も きかい が あったら ぜひ いちど あそび に きて ください"
      },
      {
        "tr": "ご清聴ありがとうございました。",
        "en": "Thank you for listening.",
        "kana": "ごせいちょう ありがとう ございました"
      }
    ],
    "glossary": [
      {
        "tr": "ふるさと",
        "en": "hometown",
        "kana": "ふるさと"
      },
      {
        "tr": "日本海側",
        "en": "the Sea of Japan side (of the country)",
        "kana": "にほんかいがわ"
      },
      {
        "tr": "紅葉",
        "en": "autumn leaves",
        "kana": "こうよう"
      },
      {
        "tr": "景色",
        "en": "scenery, view",
        "kana": "けしき"
      },
      {
        "tr": "金箔",
        "en": "gold leaf",
        "kana": "きんぱく"
      },
      {
        "tr": "新鮮",
        "en": "fresh",
        "kana": "しんせん"
      },
      {
        "tr": "海鮮丼",
        "en": "seafood rice bowl",
        "kana": "かいせんどん"
      },
      {
        "tr": "町並み",
        "en": "streets, townscape",
        "kana": "まちなみ"
      },
      {
        "tr": "魅力",
        "en": "charm, appeal",
        "kana": "みりょく"
      },
      {
        "tr": "ご清聴ありがとうございました",
        "en": "thank you for listening (formal)",
        "kana": "ごせいちょう ありがとう ございました"
      }
    ],
    "questions": [
      {
        "q": "How long does it take from Tokyo by bullet train?",
        "options": [
          "About one hour",
          "About two and a half hours",
          "About four hours",
          "About six hours"
        ],
        "answer": 1,
        "explain": "東京から新幹線で二時間半ぐらいです."
      },
      {
        "q": "What is Kenrokuen?",
        "options": [
          "A famous garden",
          "A seafood market",
          "A temple",
          "A mountain"
        ],
        "answer": 0,
        "explain": "日本三名園の一つ — one of Japan's three great gardens."
      },
      {
        "q": "What is Kanazawa known for?",
        "options": [
          "Gold leaf",
          "Silk",
          "Green tea",
          "Cars"
        ],
        "answer": 0,
        "explain": "金箔の町としても知られています."
      },
      {
        "q": "What does the speaker recommend?",
        "options": [
          "Skiing in winter",
          "A seafood rice bowl at the market in the morning",
          "Shopping at a big mall",
          "A night tour of the castle"
        ],
        "answer": 1,
        "explain": "私のおすすめは、朝、市場で食べる海鮮丼です."
      }
    ]
  },
  {
    "id": "ja-momotaro-tale",
    "kind": "story",
    "level": "B1",
    "title": "Momotaro, the Peach Boy",
    "titleNative": "桃太郎",
    "summary": "The old folk tale retold in simple words: a boy born from a peach sets off with a dog, a monkey and a pheasant to defeat the ogres.",
    "register": "polite",
    "lines": [
      {
        "tr": "むかしむかし、ある村に、おじいさんとおばあさんが住んでいました。",
        "en": "Once upon a time, in a certain village, there lived an old man and an old woman.",
        "kana": "むかしむかし ある むら に おじいさん と おばあさん が すんで いました"
      },
      {
        "tr": "ある日、おじいさんは山へしばかりに、おばあさんは川へ洗濯に行きました。",
        "en": "One day the old man went to the mountains to gather firewood, and the old woman went to the river to do the washing.",
        "kana": "ある ひ おじいさん は やま へ しばかり に おばあさん は かわ へ せんたく に いきました"
      },
      {
        "tr": "おばあさんが洗濯をしていると、大きな桃がどんぶらこ、どんぶらこと流れてきました。",
        "en": "While the old woman was washing, a big peach came bobbing along down the river.",
        "kana": "おばあさん が せんたく を して いる と おおきな もも が どんぶらこ どんぶらこ と ながれて きました"
      },
      {
        "tr": "おばあさんはその桃を拾って、おじいさんと食べようと家に持って帰りました。",
        "en": "The old woman picked up the peach and took it home to eat with the old man.",
        "kana": "おばあさん は その もも を ひろって おじいさん と たべよう と いえ に もって かえりました"
      },
      {
        "tr": "二人が桃を切ろうとすると、桃が二つに割れて、中から元気な男の子が出てきました。",
        "en": "Just as the two of them were about to cut the peach, it split in two and a healthy baby boy came out.",
        "kana": "ふたり が もも を きろう と する と もも が ふたつ に われて なか から げんき な おとこのこ が でて きました"
      },
      {
        "tr": "二人はとても喜んで、桃から生まれたその子を桃太郎と名付けました。",
        "en": "The two were overjoyed, and they named the child, who had been born from a peach, Momotaro.",
        "kana": "ふたり は とても よろこんで もも から うまれた その こ を ももたろう と なづけました"
      },
      {
        "tr": "桃太郎はご飯をたくさん食べて、どんどん大きく、強くなりました。",
        "en": "Momotaro ate a lot of rice and quickly grew bigger and stronger.",
        "kana": "ももたろう は ごはん を たくさん たべて どんどん おおきく つよく なりました"
      },
      {
        "tr": "そのころ、鬼が島の鬼たちが村に来ては、人々の宝物をうばっていました。",
        "en": "In those days, the ogres of Ogre Island kept coming to the village and robbing people of their treasures.",
        "kana": "その ころ おにがしま の おに たち が むら に きて は ひとびと の たからもの を うばって いました"
      },
      {
        "tr": "ある日、桃太郎は「鬼が島へ行って、悪い鬼を退治してきます」と言いました。",
        "en": "One day Momotaro said, \"I am going to Ogre Island to get rid of the wicked ogres.\"",
        "kana": "ある ひ ももたろう は おにがしま へ いって わるい おに を たいじ して きます と いいました"
      },
      {
        "tr": "おじいさんとおばあさんは心配しましたが、桃太郎の気持ちは変わりませんでした。",
        "en": "The old man and the old woman were worried, but Momotaro did not change his mind.",
        "kana": "おじいさん と おばあさん は しんぱい しました が ももたろう の きもち は かわりませんでした"
      },
      {
        "tr": "そこで、おばあさんは日本一のきびだんごを作って、桃太郎に持たせました。",
        "en": "So the old woman made the best millet dumplings in Japan and gave them to Momotaro to take with him.",
        "kana": "そこで おばあさん は にっぽんいち の きびだんご を つくって ももたろう に もたせました"
      },
      {
        "tr": "桃太郎が歩いていくと、犬が来て、「桃太郎さん、どこへ行くのですか」と聞きました。",
        "en": "As Momotaro walked along, a dog came up and asked, \"Momotaro, where are you going?\"",
        "kana": "ももたろう が あるいて いく と いぬ が きて ももたろう さん どこ へ いく の です か と ききました"
      },
      {
        "tr": "桃太郎は「鬼が島へ鬼退治に行くんだ」と答えました。",
        "en": "\"I'm going to Ogre Island to fight the ogres,\" Momotaro answered.",
        "kana": "ももたろう は おにがしま へ おにたいじ に いく ん だ と こたえました"
      },
      {
        "tr": "犬は「そのきびだんごを一つくださるなら、お供します」と言いました。",
        "en": "The dog said, \"If you give me one of those millet dumplings, I will come with you.\"",
        "kana": "いぬ は その きびだんご を ひとつ くださる なら おとも します と いいました"
      },
      {
        "tr": "桃太郎は犬にきびだんごを一つあげて、仲間にしました。",
        "en": "Momotaro gave the dog a dumpling and made him his companion.",
        "kana": "ももたろう は いぬ に きびだんご を ひとつ あげて なかま に しました"
      },
      {
        "tr": "同じようにして、サルとキジも桃太郎の仲間になりました。",
        "en": "In the same way, a monkey and a pheasant joined Momotaro too.",
        "kana": "おなじ よう に して サル と キジ も ももたろう の なかま に なりました"
      },
      {
        "tr": "桃太郎たちは船に乗って海をわたり、やっと鬼が島に着きました。",
        "en": "Momotaro and his companions got on a boat, crossed the sea and at last reached Ogre Island.",
        "kana": "ももたろう たち は ふね に のって うみ を わたり やっと おにがしま に つきました"
      },
      {
        "tr": "鬼たちは、お酒を飲んでさわいでいるところでした。",
        "en": "The ogres were in the middle of drinking and making a lot of noise.",
        "kana": "おに たち は おさけ を のんで さわいで いる ところ でした"
      },
      {
        "tr": "犬は鬼の足にかみつき、サルは顔をひっかき、キジは目をつつきました。",
        "en": "The dog bit the ogres' legs, the monkey scratched their faces, and the pheasant pecked at their eyes.",
        "kana": "いぬ は おに の あし に かみつき サル は かお を ひっかき キジ は め を つつきました"
      },
      {
        "tr": "桃太郎も、一番強い鬼と力いっぱい戦いました。",
        "en": "Momotaro, too, fought the strongest ogre with all his might.",
        "kana": "ももたろう も いちばん つよい おに と ちからいっぱい たたかいました"
      },
      {
        "tr": "とうとう鬼たちは「もう悪いことはしません、許してください」と泣いて謝りました。",
        "en": "In the end the ogres cried and apologised: \"We will never do anything bad again. Please forgive us.\"",
        "kana": "とうとう おに たち は もう わるい こと は しません ゆるして ください と ないて あやまりました"
      },
      {
        "tr": "桃太郎は鬼たちを許して、取られた宝物を持って村へ帰りました。",
        "en": "Momotaro forgave the ogres and went back to the village with the treasures that had been taken.",
        "kana": "ももたろう は おに たち を ゆるして とられた たからもの を もって むら へ かえりました"
      },
      {
        "tr": "おじいさんとおばあさんは、無事に帰ってきた桃太郎を見て、とても喜びました。",
        "en": "The old man and the old woman were delighted to see Momotaro come home safely.",
        "kana": "おじいさん と おばあさん は ぶじ に かえって きた ももたろう を みて とても よろこびました"
      },
      {
        "tr": "桃太郎は、宝物を全部、村の人たちに返しました。",
        "en": "Momotaro gave all the treasures back to the people of the village.",
        "kana": "ももたろう は たからもの を ぜんぶ むら の ひと たち に かえしました"
      },
      {
        "tr": "それから三人は、いつまでも幸せに暮らしました。",
        "en": "And from then on, the three of them lived happily ever after.",
        "kana": "それから さんにん は いつまでも しあわせ に くらしました"
      },
      {
        "tr": "めでたし、めでたし。",
        "en": "And so the story ends happily.",
        "kana": "めでたし めでたし"
      }
    ],
    "glossary": [
      {
        "tr": "むかしむかし",
        "en": "once upon a time",
        "kana": "むかしむかし"
      },
      {
        "tr": "しばかり",
        "en": "gathering firewood (an old word known from this tale)",
        "kana": "しばかり"
      },
      {
        "tr": "どんぶらこ",
        "en": "the sound of something big bobbing along in water (used in this tale)",
        "kana": "どんぶらこ"
      },
      {
        "tr": "割れて",
        "en": "split, broke open (割れる)",
        "kana": "われて"
      },
      {
        "tr": "名付けました",
        "en": "named, gave the name (名付ける)",
        "kana": "なづけました"
      },
      {
        "tr": "鬼が島",
        "en": "Ogre Island (鬼 = ogre, demon)",
        "kana": "おにがしま"
      },
      {
        "tr": "宝物",
        "en": "treasure",
        "kana": "たからもの"
      },
      {
        "tr": "うばっていました",
        "en": "used to take by force, rob (うばう)",
        "kana": "うばって いました"
      },
      {
        "tr": "退治",
        "en": "getting rid of, defeating (monsters, pests)",
        "kana": "たいじ"
      },
      {
        "tr": "日本一",
        "en": "the best in Japan",
        "kana": "にっぽんいち"
      },
      {
        "tr": "きびだんご",
        "en": "millet dumplings",
        "kana": "きびだんご"
      },
      {
        "tr": "お供します",
        "en": "I will go with you, I will accompany you (humble)",
        "kana": "おとも します"
      },
      {
        "tr": "仲間",
        "en": "companion, one of the group",
        "kana": "なかま"
      },
      {
        "tr": "かみつき",
        "en": "bit, sank his teeth into (かみつく)",
        "kana": "かみつき"
      },
      {
        "tr": "戦いました",
        "en": "fought (戦う)",
        "kana": "たたかいました"
      },
      {
        "tr": "謝りました",
        "en": "apologised (謝る)",
        "kana": "あやまりました"
      },
      {
        "tr": "無事に",
        "en": "safely, unharmed",
        "kana": "ぶじ に"
      },
      {
        "tr": "めでたし",
        "en": "happily ended — the set phrase that closes a folk tale",
        "kana": "めでたし"
      }
    ],
    "questions": [
      {
        "q": "Where did the baby boy come from?",
        "options": [
          "He was found in the mountains",
          "The ogres left him in the village",
          "He came out of a big peach",
          "A dog brought him to the house"
        ],
        "answer": 2,
        "explain": "桃が二つに割れて、中から元気な男の子が出てきました — the peach split in two and a boy came out."
      },
      {
        "q": "What did the old woman make for Momotaro to take with him?",
        "options": [
          "Millet dumplings",
          "A new boat",
          "Rice balls",
          "Warm clothes"
        ],
        "answer": 0,
        "explain": "おばあさんは日本一のきびだんごを作って、桃太郎に持たせました."
      },
      {
        "q": "Which animals became his companions?",
        "options": [
          "A dog, a cat and a crane",
          "A dog, a monkey and a pheasant",
          "A horse, a monkey and a crow",
          "A fox, a dog and a pheasant"
        ],
        "answer": 1,
        "explain": "First 犬, and then サルとキジも桃太郎の仲間になりました."
      },
      {
        "q": "What did Momotaro do with the treasures?",
        "options": [
          "He kept them for his family",
          "He left them on the island",
          "He shared them with the ogres",
          "He gave them all back to the villagers"
        ],
        "answer": 3,
        "explain": "宝物を全部、村の人たちに返しました — he returned all of them to the people of the village."
      }
    ]
  },
  {
    "id": "ja-why-i-learn-japanese",
    "kind": "speech",
    "level": "B1",
    "title": "Why I'm Learning Japanese",
    "titleNative": "私が日本語を勉強している理由",
    "summary": "A learner from Spain gives a short talk to her class: why she started Japanese, what was hard, what helped, a funny mistake and her plans.",
    "register": "polite",
    "lines": [
      {
        "tr": "皆さん、こんにちは。",
        "en": "Hello, everyone.",
        "kana": "みなさん こんにち は"
      },
      {
        "tr": "スペインから来ましたマリアと申します。",
        "en": "My name is Maria, and I come from Spain.",
        "kana": "スペイン から きました マリア と もうします"
      },
      {
        "tr": "今日は、私が日本語を勉強している理由についてお話ししたいと思います。",
        "en": "Today I'd like to talk about why I am studying Japanese.",
        "kana": "きょう は わたし が にほんご を べんきょう して いる りゆう に ついて おはなし したい と おもいます"
      },
      {
        "tr": "日本語を始めたのは三年前です。",
        "en": "I started Japanese three years ago.",
        "kana": "にほんご を はじめた の は さんねん まえ です"
      },
      {
        "tr": "きっかけは、子どものころから好きだった日本のアニメでした。",
        "en": "What got me started was Japanese anime, which I'd loved since I was a child.",
        "kana": "きっかけ は こども の ころ から すき だった にほん の アニメ でした"
      },
      {
        "tr": "字幕なしで見られるようになりたいと思って、一人で勉強を始めました。",
        "en": "I wanted to be able to watch it without subtitles, so I began studying on my own.",
        "kana": "じまく なし で みられる よう に なりたい と おもって ひとり で べんきょう を はじめました"
      },
      {
        "tr": "でも、最初は思ったよりずっと大変でした。",
        "en": "But at first it was much harder than I had expected.",
        "kana": "でも さいしょ は おもった より ずっと たいへん でした"
      },
      {
        "tr": "まず、漢字は数が多くて、覚えてもすぐに忘れてしまいました。",
        "en": "First of all, there are so many kanji, and even when I learned them I soon forgot them.",
        "kana": "まず かんじ は かず が おおくて おぼえて も すぐ に わすれて しまいました"
      },
      {
        "tr": "「は」と「が」のような助詞の使い方も、今でもよく間違えます。",
        "en": "I still often make mistakes with how to use particles like は and が, too.",
        "kana": "は と が の よう な じょし の つかいかた も いま でも よく まちがえます"
      },
      {
        "tr": "それに、敬語は相手によって言葉が変わるので、本当に難しいと思いました。",
        "en": "On top of that, with polite language the words change depending on who you are talking to, so I found it really difficult.",
        "kana": "それに けいご は あいて に よって ことば が かわる ので ほんとう に むずかしい と おもいました"
      },
      {
        "tr": "一番役に立ったのは、毎日少しずつ続けることでした。",
        "en": "What helped me most was keeping going a little every day.",
        "kana": "いちばん やく に たった の は まいにち すこし ずつ つづける こと でした"
      },
      {
        "tr": "毎朝十五分だけ漢字を練習して、電車の中では日本語のポッドキャストを聞きました。",
        "en": "Every morning I practised kanji for just fifteen minutes, and on the train I listened to podcasts in Japanese.",
        "kana": "まいあさ じゅうごふん だけ かんじ を れんしゅう して でんしゃ の なか で は にほんご の ポッドキャスト を ききました"
      },
      {
        "tr": "週に一回、日本人の友達とオンラインで話す練習もしています。",
        "en": "Once a week I also practise speaking online with a Japanese friend.",
        "kana": "しゅう に いっかい にほんじん の ともだち と オンライン で はなす れんしゅう も して います"
      },
      {
        "tr": "間違えてもいいから、たくさん話すことが大切だと分かりました。",
        "en": "I've learned that the important thing is to speak a lot, even if you make mistakes.",
        "kana": "まちがえて も いい から たくさん はなす こと が たいせつ だ と わかりました"
      },
      {
        "tr": "実は、おもしろい失敗もたくさんあります。",
        "en": "To tell the truth, I have made plenty of funny mistakes as well.",
        "kana": "じつ は おもしろい しっぱい も たくさん あります"
      },
      {
        "tr": "ある日、友達の赤ちゃんを見て、「かわいいですね」と言おうとしました。",
        "en": "One day I saw my friend's baby and tried to say \"Kawaii desu ne\" — \"How cute!\"",
        "kana": "ある ひ ともだち の あかちゃん を みて かわいい です ね と いおう と しました"
      },
      {
        "tr": "ところが、間違えて「こわいですね」と言ってしまったんです。",
        "en": "But by mistake I said \"Kowai desu ne\" — \"How scary!\"",
        "kana": "ところが まちがえて こわい です ね と いって しまった ん です"
      },
      {
        "tr": "友達は大笑いしましたが、この二つの言葉はもう二度と間違えないと思います。",
        "en": "My friend burst out laughing, but I don't think I'll ever mix up those two words again.",
        "kana": "ともだち は おおわらい しました が この ふたつ の ことば は もう にど と まちがえない と おもいます"
      },
      {
        "tr": "来年は日本へ行って、日本語だけで旅行をしてみたいです。",
        "en": "Next year I'd like to go to Japan and try travelling using only Japanese.",
        "kana": "らいねん は にほん へ いって にほんご だけ で りょこう を して みたい です"
      },
      {
        "tr": "そしていつか、日本語を使う仕事ができたらいいなと思っています。",
        "en": "And one day, I hope I'll be able to have a job where I use Japanese.",
        "kana": "そして いつか にほんご を つかう しごと が できたら いい な と おもって います"
      },
      {
        "tr": "ここまで続けられたのは、いつも親切に教えてくださる先生と、クラスの皆さんのおかげです。",
        "en": "It's thanks to our teacher, who always teaches us so kindly, and to all of you in the class that I've been able to keep going this far.",
        "kana": "ここ まで つづけられた の は いつも しんせつ に おしえて くださる せんせい と クラス の みなさん の おかげ です"
      },
      {
        "tr": "これからも、楽しみながら勉強を続けていきたいと思います。",
        "en": "I'd like to carry on studying, and enjoying it as I go.",
        "kana": "これから も たのしみながら べんきょう を つづけて いきたい と おもいます"
      },
      {
        "tr": "ご清聴ありがとうございました。",
        "en": "Thank you for listening.",
        "kana": "ごせいちょう ありがとう ございました"
      }
    ],
    "glossary": [
      {
        "tr": "と申します",
        "en": "my name is… (humble)",
        "kana": "と もうします"
      },
      {
        "tr": "理由",
        "en": "reason",
        "kana": "りゆう"
      },
      {
        "tr": "きっかけ",
        "en": "what got (me) started, the trigger",
        "kana": "きっかけ"
      },
      {
        "tr": "字幕なしで",
        "en": "without subtitles",
        "kana": "じまく なし で"
      },
      {
        "tr": "思ったより",
        "en": "than (I) expected",
        "kana": "おもった より"
      },
      {
        "tr": "忘れてしまいました",
        "en": "ended up forgetting (忘れる + てしまう)",
        "kana": "わすれて しまいました"
      },
      {
        "tr": "助詞",
        "en": "particle (は, が, を…)",
        "kana": "じょし"
      },
      {
        "tr": "使い方",
        "en": "how to use, usage",
        "kana": "つかいかた"
      },
      {
        "tr": "敬語",
        "en": "polite / honorific language",
        "kana": "けいご"
      },
      {
        "tr": "相手によって",
        "en": "depending on the person you are talking to",
        "kana": "あいて に よって"
      },
      {
        "tr": "役に立った",
        "en": "was useful, helped (役に立つ)",
        "kana": "やく に たった"
      },
      {
        "tr": "少しずつ",
        "en": "little by little",
        "kana": "すこし ずつ"
      },
      {
        "tr": "間違えてもいい",
        "en": "it's all right to make mistakes",
        "kana": "まちがえて も いい"
      },
      {
        "tr": "失敗",
        "en": "mistake, failure",
        "kana": "しっぱい"
      },
      {
        "tr": "大笑い",
        "en": "a big laugh, bursting out laughing",
        "kana": "おおわらい"
      },
      {
        "tr": "二度と",
        "en": "never again (with a negative)",
        "kana": "にど と"
      },
      {
        "tr": "おかげ",
        "en": "thanks to (someone)",
        "kana": "おかげ"
      },
      {
        "tr": "楽しみながら",
        "en": "while enjoying (it)",
        "kana": "たのしみながら"
      }
    ],
    "questions": [
      {
        "q": "Why did Maria start learning Japanese?",
        "options": [
          "Her company sent her to Japan",
          "She wanted to watch anime without subtitles",
          "Her grandmother is Japanese",
          "She needed it for a university exam"
        ],
        "answer": 1,
        "explain": "きっかけは…日本のアニメでした, and 字幕なしで見られるようになりたいと思って — she wanted to watch without subtitles."
      },
      {
        "q": "What helped her most?",
        "options": [
          "Moving to Japan for a year",
          "Buying an expensive textbook",
          "Memorising a hundred kanji a day",
          "Continuing a little every day"
        ],
        "answer": 3,
        "explain": "一番役に立ったのは、毎日少しずつ続けることでした."
      },
      {
        "q": "What did she say by mistake about her friend's baby?",
        "options": [
          "\"How scary!\"",
          "\"How cute!\"",
          "\"How expensive!\"",
          "\"How small!\""
        ],
        "answer": 0,
        "explain": "She meant かわいい (cute) but said こわいですね (scary): 間違えて「こわいですね」と言ってしまったんです."
      },
      {
        "q": "What does she want to do next year?",
        "options": [
          "Take a Japanese exam",
          "Start teaching Japanese",
          "Travel in Japan using only Japanese",
          "Find a job in Spain"
        ],
        "answer": 2,
        "explain": "来年は日本へ行って、日本語だけで旅行をしてみたいです."
      }
    ]
  },
  {
    "id": "ja-letter-from-osaka",
    "kind": "everyday",
    "level": "A2",
    "title": "A Letter from Osaka",
    "titleNative": "大阪からの手紙",
    "summary": "A month after moving to Osaka, someone writes a long, friendly message to their friend Yuki about the flat, the neighbourhood, daily life and food, and invites her to visit.",
    "register": "casual",
    "lines": [
      {
        "tr": "ゆき、ひさしぶり！",
        "en": "Yuki, it's been a while!",
        "kana": "ゆき ひさしぶり"
      },
      {
        "tr": "元気にしてる？",
        "en": "How have you been?",
        "kana": "げんき に してる"
      },
      {
        "tr": "大阪に引っ越して、もう一か月になったよ。",
        "en": "It's already been a month since I moved to Osaka.",
        "kana": "おおさか に ひっこして もう いっかげつ に なった よ"
      },
      {
        "tr": "新しいアパートは小さいけど、駅から歩いて五分で、とても便利だよ。",
        "en": "My new flat is small, but it's a five-minute walk from the station, so it's really convenient.",
        "kana": "あたらしい アパート は ちいさい けど えき から あるいて ごふん で とても べんり だ よ"
      },
      {
        "tr": "部屋は三階で、窓から小さい公園が見えるんだ。",
        "en": "My flat is on the third floor, and I can see a little park from the window.",
        "kana": "へや は さんがい で まど から ちいさい こうえん が みえる ん だ"
      },
      {
        "tr": "近所には、スーパーやパン屋や古い商店街があるよ。",
        "en": "In the neighbourhood there's a supermarket, a bakery and an old shopping street.",
        "kana": "きんじょ に は スーパー や パンや や ふるい しょうてんがい が ある よ"
      },
      {
        "tr": "商店街の人はみんな明るくて、よく話しかけてくれる。",
        "en": "The people in the shopping street are all cheerful and often start chatting to me.",
        "kana": "しょうてんがい の ひと は みんな あかるくて よく はなしかけて くれる"
      },
      {
        "tr": "大阪弁はまだよく分からないけど、聞いていると楽しい。",
        "en": "I still don't understand Osaka dialect very well, but it's fun to listen to.",
        "kana": "おおさかべん は まだ よく わからない けど きいて いる と たのしい"
      },
      {
        "tr": "店の人がよく言う「おおきに」は、「ありがとう」という意味なんだって。",
        "en": "Apparently \"ookini\", which the shop people often say, means \"thank you\".",
        "kana": "みせ の ひと が よく いう おおきに は ありがとう と いう いみ な ん だ って"
      },
      {
        "tr": "平日は毎朝七時に起きて、八時の電車で会社に行く。",
        "en": "On weekdays I get up at seven every morning and take the eight o'clock train to work.",
        "kana": "へいじつ は まいあさ しちじ に おきて はちじ の でんしゃ で かいしゃ に いく"
      },
      {
        "tr": "朝の電車はすごく混んでいて、毎日ちょっと大変だよ。",
        "en": "The morning train is really crowded, so every day is a bit of a struggle.",
        "kana": "あさ の でんしゃ は すごく こんで いて まいにち ちょっと たいへん だ よ"
      },
      {
        "tr": "仕事は六時ごろ終わって、帰りにスーパーで買い物をする。",
        "en": "Work finishes at about six, and I do my shopping at the supermarket on the way home.",
        "kana": "しごと は ろくじ ごろ おわって かえり に スーパー で かいもの を する"
      },
      {
        "tr": "夜は自分でご飯を作るけど、まだあまり上手じゃない。",
        "en": "In the evening I cook for myself, but I'm not very good at it yet.",
        "kana": "よる は じぶん で ごはん を つくる けど まだ あまり じょうず じゃ ない"
      },
      {
        "tr": "それに、大阪は食べ物が安くておいしいから、つい外で食べちゃう。",
        "en": "Besides, the food in Osaka is cheap and tasty, so I end up eating out without meaning to.",
        "kana": "それに おおさか は たべもの が やすくて おいしい から つい そと で たべちゃう"
      },
      {
        "tr": "先週は、会社の人とお好み焼きを食べに行ったよ。",
        "en": "Last week I went to eat okonomiyaki with people from work.",
        "kana": "せんしゅう は かいしゃ の ひと と おこのみやき を たべ に いった よ"
      },
      {
        "tr": "店の人が目の前で焼いてくれて、本当においしかった。",
        "en": "The staff cooked it right in front of us, and it was really delicious.",
        "kana": "みせ の ひと が め の まえ で やいて くれて ほんとう に おいしかった"
      },
      {
        "tr": "たこ焼きも毎週食べているから、少し太ったかもしれない。",
        "en": "I'm eating takoyaki every week too, so I may have put on a little weight.",
        "kana": "たこやき も まいしゅう たべて いる から すこし ふとった かも しれない"
      },
      {
        "tr": "週末は、自転車で大阪城の公園まで行くことが多いよ。",
        "en": "At weekends I often cycle to the park at Osaka Castle.",
        "kana": "しゅうまつ は じてんしゃ で おおさかじょう の こうえん まで いく こと が おおい よ"
      },
      {
        "tr": "今は公園の木が赤や黄色になっていて、とてもきれいなんだ。",
        "en": "Right now the trees in the park have turned red and yellow, and it looks beautiful.",
        "kana": "いま は こうえん の き が あか や きいろ に なって いて とても きれい な ん だ"
      },
      {
        "tr": "一人暮らしは自由だけど、ときどきさびしくなる。",
        "en": "Living alone means freedom, but sometimes I get lonely.",
        "kana": "ひとりぐらし は じゆう だ けど ときどき さびしく なる"
      },
      {
        "tr": "だから、ゆきが遊びに来てくれたら、すごくうれしいな。",
        "en": "So I'd be really happy if you came to visit.",
        "kana": "だから ゆき が あそび に きて くれたら すごく うれしい な"
      },
      {
        "tr": "冬休みに時間があったら、ぜひ大阪に来てね。",
        "en": "If you have time in the winter holidays, do come to Osaka.",
        "kana": "ふゆやすみ に じかん が あったら ぜひ おおさか に きて ね"
      },
      {
        "tr": "うちに泊まっていいから、ホテルはいらないよ。",
        "en": "You can stay at my place, so you won't need a hotel.",
        "kana": "うち に とまって いい から ホテル は いらない よ"
      },
      {
        "tr": "おいしい店をたくさん案内するから、楽しみにしていてね。",
        "en": "I'll take you to lots of good places to eat, so look forward to it.",
        "kana": "おいしい みせ を たくさん あんない する から たのしみ に して いて ね"
      },
      {
        "tr": "じゃあ、体に気をつけて、また連絡するね。",
        "en": "Well, take care of yourself, and I'll be in touch again.",
        "kana": "じゃあ からだ に き を つけて また れんらく する ね"
      }
    ],
    "glossary": [
      {
        "tr": "ひさしぶり",
        "en": "it's been a while, long time no see",
        "kana": "ひさしぶり"
      },
      {
        "tr": "引っ越して",
        "en": "moved house (引っ越す)",
        "kana": "ひっこして"
      },
      {
        "tr": "便利",
        "en": "convenient, handy",
        "kana": "べんり"
      },
      {
        "tr": "近所",
        "en": "neighbourhood",
        "kana": "きんじょ"
      },
      {
        "tr": "商店街",
        "en": "shopping street (a street lined with small local shops)",
        "kana": "しょうてんがい"
      },
      {
        "tr": "話しかけてくれる",
        "en": "start talking to me, chat to me (話しかける)",
        "kana": "はなしかけて くれる"
      },
      {
        "tr": "大阪弁",
        "en": "Osaka dialect",
        "kana": "おおさかべん"
      },
      {
        "tr": "意味",
        "en": "meaning",
        "kana": "いみ"
      },
      {
        "tr": "平日",
        "en": "weekdays",
        "kana": "へいじつ"
      },
      {
        "tr": "混んでいて",
        "en": "is crowded, and… (混む)",
        "kana": "こんで いて"
      },
      {
        "tr": "食べちゃう",
        "en": "end up eating (casual for 食べてしまう)",
        "kana": "たべちゃう"
      },
      {
        "tr": "お好み焼き",
        "en": "okonomiyaki, a savoury pancake cooked on a hot plate",
        "kana": "おこのみやき"
      },
      {
        "tr": "目の前で",
        "en": "right in front of (us)",
        "kana": "め の まえ で"
      },
      {
        "tr": "太った",
        "en": "put on weight (太る)",
        "kana": "ふとった"
      },
      {
        "tr": "一人暮らし",
        "en": "living alone",
        "kana": "ひとりぐらし"
      },
      {
        "tr": "さびしく",
        "en": "lonely (さびしい)",
        "kana": "さびしく"
      },
      {
        "tr": "泊まって",
        "en": "stay overnight (泊まる)",
        "kana": "とまって"
      },
      {
        "tr": "案内する",
        "en": "show (you) around, take (you) to",
        "kana": "あんない する"
      }
    ],
    "questions": [
      {
        "q": "How long has the writer been living in Osaka?",
        "options": [
          "One week",
          "One month",
          "Half a year",
          "One year"
        ],
        "answer": 1,
        "explain": "大阪に引っ越して、もう一か月になったよ — a month has already passed."
      },
      {
        "q": "How far is the flat from the station?",
        "options": [
          "Five minutes by bike",
          "Fifteen minutes by bus",
          "Three minutes by train",
          "Five minutes on foot"
        ],
        "answer": 3,
        "explain": "駅から歩いて五分 — a five-minute walk from the station."
      },
      {
        "q": "What did the writer eat with colleagues last week?",
        "options": [
          "Okonomiyaki",
          "Sushi",
          "Ramen",
          "Curry"
        ],
        "answer": 0,
        "explain": "先週は、会社の人とお好み焼きを食べに行ったよ."
      },
      {
        "q": "Where can Yuki stay if she comes to Osaka?",
        "options": [
          "At a hotel near the station",
          "At a colleague's house",
          "At the writer's flat",
          "At an inn by the castle"
        ],
        "answer": 2,
        "explain": "うちに泊まっていいから、ホテルはいらないよ — she can stay at the writer's place."
      }
    ]
  },
  {
    "id": "ja-job-interview",
    "kind": "dialogue",
    "level": "B1",
    "title": "A Job Interview at a Café",
    "titleNative": "カフェのアルバイトの面接",
    "summary": "Lin, a university student from Vietnam, has an interview for a part-time job at a café with the manager, Mr Yamada.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Interviewer",
        "tr": "どうぞ、お入りください。",
        "en": "Please come in.",
        "kana": "どうぞ おはいり ください"
      },
      {
        "speaker": "Lin",
        "tr": "失礼します。",
        "en": "Excuse me. (said on entering)",
        "kana": "しつれい します"
      },
      {
        "speaker": "Lin",
        "tr": "リンと申します、本日はよろしくお願いいたします。",
        "en": "My name is Lin. Thank you for seeing me today.",
        "kana": "リン と もうします ほんじつ は よろしく おねがい いたします"
      },
      {
        "speaker": "Interviewer",
        "tr": "店長の山田です、どうぞおかけください。",
        "en": "I'm Yamada, the manager. Please take a seat.",
        "kana": "てんちょう の やまだ です どうぞ おかけ ください"
      },
      {
        "speaker": "Interviewer",
        "tr": "では、まず簡単に自己紹介をお願いします。",
        "en": "Now, first of all, could you briefly introduce yourself?",
        "kana": "で は まず かんたん に じこしょうかい を おねがい します"
      },
      {
        "speaker": "Lin",
        "tr": "はい、私はベトナムのハノイ出身で、今は大学で経済を勉強しています。",
        "en": "Certainly. I'm from Hanoi in Vietnam, and I'm now studying economics at university.",
        "kana": "はい わたし は ベトナム の ハノイ しゅっしん で いま は だいがく で けいざい を べんきょう して います"
      },
      {
        "speaker": "Lin",
        "tr": "日本に来て二年になります。",
        "en": "I've been in Japan for two years.",
        "kana": "にほん に きて にねん に なります"
      },
      {
        "speaker": "Interviewer",
        "tr": "この店で働きたいと思った理由を教えてください。",
        "en": "Please tell me why you would like to work at this café.",
        "kana": "この みせ で はたらきたい と おもった りゆう を おしえて ください"
      },
      {
        "speaker": "Lin",
        "tr": "こちらのお店にはよく来ていて、店員の皆さんの明るい接客がすてきだと思ったからです。",
        "en": "I often come here, and I thought the cheerful way all the staff look after customers was lovely.",
        "kana": "こちら の おみせ に は よく きて いて てんいん の みなさん の あかるい せっきゃく が すてき だ と おもった から です"
      },
      {
        "speaker": "Interviewer",
        "tr": "今までにアルバイトの経験はありますか。",
        "en": "Have you had a part-time job before?",
        "kana": "いままで に アルバイト の けいけん は あります か"
      },
      {
        "speaker": "Lin",
        "tr": "はい、コンビニで一年ほどレジの仕事をしておりました。",
        "en": "Yes, I worked on the till at a convenience store for about a year.",
        "kana": "はい コンビニ で いちねん ほど レジ の しごと を して おりました"
      },
      {
        "speaker": "Interviewer",
        "tr": "ご自分の長所は何だと思いますか。",
        "en": "What do you think your strengths are?",
        "kana": "ごじぶん の ちょうしょ は なん だ と おもいます か"
      },
      {
        "speaker": "Lin",
        "tr": "人と話すのが好きで、いつも笑顔でいられるところだと思います。",
        "en": "I think it is that I like talking to people and can always keep smiling.",
        "kana": "ひと と はなす の が すき で いつも えがお で いられる ところ だ と おもいます"
      },
      {
        "speaker": "Lin",
        "tr": "それから、一度教えていただいたことは、必ずメモをして覚えるようにしています。",
        "en": "Also, once I have been taught something, I always take notes and make sure I remember it.",
        "kana": "それから いちど おしえて いただいた こと は かならず メモ を して おぼえる よう に して います"
      },
      {
        "speaker": "Interviewer",
        "tr": "日本語がとてもお上手ですね。",
        "en": "Your Japanese is very good.",
        "kana": "にほんご が とても おじょうず です ね"
      },
      {
        "speaker": "Lin",
        "tr": "いえ、まだまだですが、敬語をもっと勉強したいと思っております。",
        "en": "No, I still have a long way to go, but I'd like to study polite language more.",
        "kana": "いえ まだまだ です が けいご を もっと べんきょう したい と おもって おります"
      },
      {
        "speaker": "Interviewer",
        "tr": "週に何日ぐらい入れますか。",
        "en": "About how many days a week can you work?",
        "kana": "しゅう に なんにち ぐらい はいれます か"
      },
      {
        "speaker": "Lin",
        "tr": "火曜日と木曜日は午後五時から、土曜日と日曜日は一日中働けます。",
        "en": "On Tuesdays and Thursdays I can work from 5 p.m., and on Saturdays and Sundays I can work all day.",
        "kana": "かようび と もくようび は ごご ごじ から どようび と にちようび は いちにちじゅう はたらけます"
      },
      {
        "speaker": "Interviewer",
        "tr": "いつから働けますか。",
        "en": "When can you start?",
        "kana": "いつ から はたらけます か"
      },
      {
        "speaker": "Lin",
        "tr": "来週からでしたら、いつでも始められます。",
        "en": "From next week onwards, I can start at any time.",
        "kana": "らいしゅう から でしたら いつでも はじめられます"
      },
      {
        "speaker": "Interviewer",
        "tr": "最後に、何か質問はありますか。",
        "en": "Finally, do you have any questions?",
        "kana": "さいご に なにか しつもん は あります か"
      },
      {
        "speaker": "Lin",
        "tr": "はい、制服はお借りできるのでしょうか。",
        "en": "Yes — would I be able to borrow a uniform?",
        "kana": "はい せいふく は おかり できる の でしょう か"
      },
      {
        "speaker": "Interviewer",
        "tr": "ええ、エプロンはこちらで用意しますので、白いシャツだけ持ってきてください。",
        "en": "Yes, we'll provide the apron, so please just bring a white shirt.",
        "kana": "ええ エプロン は こちら で ようい します ので しろい シャツ だけ もって きて ください"
      },
      {
        "speaker": "Interviewer",
        "tr": "結果は、今週中にお電話でお知らせします。",
        "en": "We'll let you know the result by phone by the end of this week.",
        "kana": "けっか は こんしゅうちゅう に おでんわ で おしらせ します"
      },
      {
        "speaker": "Lin",
        "tr": "承知いたしました、本日はお時間をいただき、ありがとうございました。",
        "en": "I understand. Thank you very much for your time today.",
        "kana": "しょうち いたしました ほんじつ は おじかん を いただき ありがとう ございました"
      },
      {
        "speaker": "Interviewer",
        "tr": "こちらこそ、ありがとうございました。",
        "en": "Thank you, too.",
        "kana": "こちらこそ ありがとう ございました"
      }
    ],
    "glossary": [
      {
        "tr": "失礼します",
        "en": "excuse me (said when entering or leaving a room)",
        "kana": "しつれい します"
      },
      {
        "tr": "本日",
        "en": "today (formal)",
        "kana": "ほんじつ"
      },
      {
        "tr": "店長",
        "en": "shop / café manager",
        "kana": "てんちょう"
      },
      {
        "tr": "おかけください",
        "en": "please take a seat (honorific)",
        "kana": "おかけ ください"
      },
      {
        "tr": "自己紹介",
        "en": "self-introduction",
        "kana": "じこしょうかい"
      },
      {
        "tr": "出身",
        "en": "coming from, a native of",
        "kana": "しゅっしん"
      },
      {
        "tr": "接客",
        "en": "serving customers, customer service",
        "kana": "せっきゃく"
      },
      {
        "tr": "経験",
        "en": "experience",
        "kana": "けいけん"
      },
      {
        "tr": "しておりました",
        "en": "was doing (humble for していました)",
        "kana": "して おりました"
      },
      {
        "tr": "長所",
        "en": "strength, strong point",
        "kana": "ちょうしょ"
      },
      {
        "tr": "笑顔",
        "en": "smile, smiling face",
        "kana": "えがお"
      },
      {
        "tr": "教えていただいた",
        "en": "(I) was kindly taught (humble, 教えてもらった)",
        "kana": "おしえて いただいた"
      },
      {
        "tr": "まだまだです",
        "en": "I still have a long way to go (modest reply to praise)",
        "kana": "まだまだ です"
      },
      {
        "tr": "入れます",
        "en": "can work a shift (入れる, from シフトに入る)",
        "kana": "はいれます"
      },
      {
        "tr": "一日中",
        "en": "all day long",
        "kana": "いちにちじゅう"
      },
      {
        "tr": "制服",
        "en": "uniform",
        "kana": "せいふく"
      },
      {
        "tr": "お知らせします",
        "en": "we will let you know (humble)",
        "kana": "おしらせ します"
      },
      {
        "tr": "承知いたしました",
        "en": "understood, certainly (humble)",
        "kana": "しょうち いたしました"
      }
    ],
    "questions": [
      {
        "q": "What is Lin studying at university?",
        "options": [
          "Japanese literature",
          "Economics",
          "Tourism",
          "Cooking"
        ],
        "answer": 1,
        "explain": "今は大学で経済を勉強しています — she is studying economics."
      },
      {
        "q": "What work experience does she have?",
        "options": [
          "About a year on the till at a convenience store",
          "Two years as a waitress in Hanoi",
          "Six months in another café",
          "None at all"
        ],
        "answer": 0,
        "explain": "コンビニで一年ほどレジの仕事をしておりました."
      },
      {
        "q": "On which days can she work all day?",
        "options": [
          "Tuesday and Thursday",
          "Monday to Friday",
          "Every day from next week",
          "Saturday and Sunday"
        ],
        "answer": 3,
        "explain": "土曜日と日曜日は一日中働けます; on Tuesdays and Thursdays only from 5 p.m."
      },
      {
        "q": "What does Lin need to bring herself?",
        "options": [
          "An apron",
          "A uniform",
          "A white shirt",
          "Black shoes"
        ],
        "answer": 2,
        "explain": "エプロンはこちらで用意しますので、白いシャツだけ持ってきてください — only a white shirt."
      }
    ]
  },
  {
    "id": "ja-farewell-speech",
    "kind": "speech",
    "level": "B1",
    "title": "A Farewell Speech at Work",
    "titleNative": "送別会でのあいさつ",
    "summary": "At a farewell party, someone leaving the company after three years thanks their colleagues in polite, humble Japanese.",
    "register": "polite",
    "lines": [
      {
        "tr": "皆さん、本日は私のために集まってくださり、ありがとうございます。",
        "en": "Thank you all for gathering here for me today.",
        "kana": "みなさん ほんじつ は わたし の ため に あつまって くださり ありがとう ございます"
      },
      {
        "tr": "今月いっぱいで、この会社を辞めることになりました。",
        "en": "I will be leaving this company at the end of this month.",
        "kana": "こんげつ いっぱい で この かいしゃ を やめる こと に なりました"
      },
      {
        "tr": "入社したのは三年前の春です。",
        "en": "I joined the company in the spring three years ago.",
        "kana": "にゅうしゃ した の は さんねん まえ の はる です"
      },
      {
        "tr": "最初は日本語も仕事も分からないことばかりでした。",
        "en": "At first there was so much I didn’t understand, in Japanese and in the job.",
        "kana": "さいしょ は にほんご も しごと も わからない こと ばかり でした"
      },
      {
        "tr": "初めての会議では、話の半分も分かりませんでした。",
        "en": "In my first meeting I didn’t understand even half of what was said.",
        "kana": "はじめて の かいぎ で は はなし の はんぶん も わかりません でした"
      },
      {
        "tr": "それでも、皆さんはいつも親切に教えてくださいました。",
        "en": "Even so, you always taught me kindly.",
        "kana": "それでも みなさん は いつも しんせつ に おしえて くださいました"
      },
      {
        "tr": "私が間違えても、だれも笑いませんでした。",
        "en": "Even when I made mistakes, nobody laughed.",
        "kana": "わたし が まちがえて も だれ も わらいません でした"
      },
      {
        "tr": "おかげで、少しずつ自信が持てるようになりました。",
        "en": "Thanks to you, little by little I came to feel confident.",
        "kana": "おかげ で すこし ずつ じしん が もてる よう に なりました"
      },
      {
        "tr": "仕事だけでなく、日本の文化もたくさん学びました。",
        "en": "I learned not only about the work, but a great deal about Japanese culture too.",
        "kana": "しごと だけ で なく にほん の ぶんか も たくさん まなびました"
      },
      {
        "tr": "昼休みに一緒に食べたお弁当の味は、一生忘れません。",
        "en": "I will never forget the taste of the lunch boxes we ate together at lunchtime.",
        "kana": "ひるやすみ に いっしょ に たべた おべんとう の あじ は いっしょう わすれません"
      },
      {
        "tr": "忙しい時期には、夜遅くまで一緒に頑張りましたね。",
        "en": "In the busy periods we worked hard together until late at night, didn’t we?",
        "kana": "いそがしい じき に は よる おそく まで いっしょ に がんばりました ね"
      },
      {
        "tr": "大変なこともありましたが、今ではいい思い出です。",
        "en": "There were hard times too, but now they are good memories.",
        "kana": "たいへん な こと も ありました が いま で は いい おもいで です"
      },
      {
        "tr": "特に、田中部長には大変お世話になりました。",
        "en": "In particular, I am deeply indebted to Mr Tanaka, our department manager.",
        "kana": "とくに たなか ぶちょう に は たいへん おせわ に なりました"
      },
      {
        "tr": "いつも温かく見守ってくださり、心から感謝しております。",
        "en": "Thank you from the bottom of my heart for always watching over me so warmly.",
        "kana": "いつも あたたかく みまもって くださり こころ から かんしゃ して おります"
      },
      {
        "tr": "来月からは、大阪で新しい仕事を始めます。",
        "en": "From next month I will be starting a new job in Osaka.",
        "kana": "らいげつ から は おおさか で あたらしい しごと を はじめます"
      },
      {
        "tr": "不安もありますが、ここで学んだことを生かして頑張ります。",
        "en": "I do feel some anxiety, but I will do my best, making use of what I learned here.",
        "kana": "ふあん も あります が ここ で まなんだ こと を いかして がんばります"
      },
      {
        "tr": "皆さんと離れるのは、本当に寂しいです。",
        "en": "I am truly sad to be parting from you all.",
        "kana": "みなさん と はなれる の は ほんとう に さびしい です"
      },
      {
        "tr": "大阪にいらっしゃるときは、ぜひご連絡ください。",
        "en": "When you come to Osaka, please do get in touch.",
        "kana": "おおさか に いらっしゃる とき は ぜひ ごれんらく ください"
      },
      {
        "tr": "おいしいたこ焼きの店をご案内します。",
        "en": "I will take you to a place with delicious takoyaki.",
        "kana": "おいしい たこやき の みせ を ごあんない します"
      },
      {
        "tr": "最後になりますが、皆さんのご健康とご活躍をお祈りしております。",
        "en": "Finally, I wish you all good health and every success.",
        "kana": "さいご に なります が みなさん の ごけんこう と ごかつやく を おいのり して おります"
      },
      {
        "tr": "三年間、本当にお世話になりました。",
        "en": "Thank you so much for everything over these three years.",
        "kana": "さんねんかん ほんとう に おせわ に なりました"
      },
      {
        "tr": "どうもありがとうございました。",
        "en": "Thank you very much.",
        "kana": "どうも ありがとう ございました"
      }
    ],
    "glossary": [
      {
        "tr": "集まってくださり",
        "en": "(thank you) for gathering — くださる is respectful “do for me”",
        "kana": "あつまって くださり"
      },
      {
        "tr": "辞めることになりました",
        "en": "it has been decided that I will leave (a soft way to announce it)",
        "kana": "やめる こと に なりました"
      },
      {
        "tr": "入社",
        "en": "joining a company",
        "kana": "にゅうしゃ"
      },
      {
        "tr": "会議",
        "en": "meeting",
        "kana": "かいぎ"
      },
      {
        "tr": "半分",
        "en": "half",
        "kana": "はんぶん"
      },
      {
        "tr": "親切に",
        "en": "kindly",
        "kana": "しんせつ に"
      },
      {
        "tr": "おかげで",
        "en": "thanks to (you)",
        "kana": "おかげ で"
      },
      {
        "tr": "自信",
        "en": "confidence",
        "kana": "じしん"
      },
      {
        "tr": "昼休み",
        "en": "lunch break",
        "kana": "ひるやすみ"
      },
      {
        "tr": "一生",
        "en": "all one’s life",
        "kana": "いっしょう"
      },
      {
        "tr": "思い出",
        "en": "a memory",
        "kana": "おもいで"
      },
      {
        "tr": "お世話になりました",
        "en": "thank you for all you have done for me (a set phrase)",
        "kana": "おせわ に なりました"
      },
      {
        "tr": "見守って",
        "en": "watching over (見守る)",
        "kana": "みまもって"
      },
      {
        "tr": "感謝しております",
        "en": "I am grateful (humble form of 感謝しています)",
        "kana": "かんしゃ して おります"
      },
      {
        "tr": "不安",
        "en": "anxiety, worry",
        "kana": "ふあん"
      },
      {
        "tr": "生かして",
        "en": "making use of (生かす)",
        "kana": "いかして"
      },
      {
        "tr": "寂しい",
        "en": "lonely; sad to part",
        "kana": "さびしい"
      },
      {
        "tr": "ご活躍",
        "en": "(your) success and activity — a respectful word",
        "kana": "ごかつやく"
      }
    ],
    "questions": [
      {
        "q": "When did the speaker join the company?",
        "options": [
          "Last month",
          "In the spring three years ago",
          "In the autumn five years ago",
          "Ten years ago"
        ],
        "answer": 1,
        "explain": "「入社したのは三年前の春です。」"
      },
      {
        "q": "What does the speaker say about the first meeting?",
        "options": [
          "It was cancelled",
          "They gave a presentation",
          "They understood less than half of it",
          "They arrived late"
        ],
        "answer": 2,
        "explain": "「初めての会議では、話の半分も分かりませんでした。」"
      },
      {
        "q": "Who does the speaker thank in particular?",
        "options": [
          "Mr Tanaka, the department manager",
          "The company president",
          "A friend from university",
          "The customers"
        ],
        "answer": 0,
        "explain": "「特に、田中部長には大変お世話になりました。」"
      },
      {
        "q": "Where will the speaker work from next month?",
        "options": [
          "Tokyo",
          "Kyoto",
          "Nagoya",
          "Osaka"
        ],
        "answer": 3,
        "explain": "「来月からは、大阪で新しい仕事を始めます。」"
      }
    ]
  },
  {
    "id": "ja-new-year-presentation",
    "kind": "speech",
    "level": "B1",
    "title": "A Short Presentation: New Year in Japan",
    "titleNative": "発表：日本のお正月",
    "summary": "A learner gives a short class presentation about the Japanese New Year: the big clean, soba on New Year’s Eve, the first shrine visit, special food and gifts for children.",
    "register": "polite",
    "lines": [
      {
        "tr": "皆さん、こんにちは。",
        "en": "Hello, everyone.",
        "kana": "みなさん こんにち は"
      },
      {
        "tr": "今日は、日本のお正月についてお話しします。",
        "en": "Today I am going to talk about New Year in Japan.",
        "kana": "きょう は にほん の おしょうがつ に ついて おはなし します"
      },
      {
        "tr": "お正月は、日本で一番大切な行事だと言われています。",
        "en": "New Year is said to be the most important occasion of the year in Japan.",
        "kana": "おしょうがつ は にほん で いちばん たいせつ な ぎょうじ だ と いわれて います"
      },
      {
        "tr": "十二月の終わりになると、家じゅうをきれいにする大掃除をします。",
        "en": "At the end of December people give the whole house a big clean.",
        "kana": "じゅうにがつ の おわり に なる と いえじゅう を きれい に する おおそうじ を します"
      },
      {
        "tr": "十二月三十一日は大みそかと言います。",
        "en": "December 31st is called Ōmisoka.",
        "kana": "じゅうにがつ さんじゅういちにち は おおみそか と いいます"
      },
      {
        "tr": "この日の夜には、年越しそばを食べる習慣があります。",
        "en": "On the evening of this day it is the custom to eat toshikoshi soba noodles.",
        "kana": "この ひ の よる に は としこしそば を たべる しゅうかん が あります"
      },
      {
        "tr": "そばのように細く長く生きられるように、という意味だそうです。",
        "en": "I am told it means “may we live long, like the long thin noodles”.",
        "kana": "そば の よう に ほそく ながく いきられる よう に と いう いみ だ そう です"
      },
      {
        "tr": "夜の十二時ごろ、お寺では鐘を百八回鳴らします。",
        "en": "Around midnight, temples ring their bells 108 times.",
        "kana": "よる の じゅうにじ ごろ おてら で は かね を ひゃくはっかい ならします"
      },
      {
        "tr": "年が明けると、「明けましておめでとうございます」とあいさつします。",
        "en": "When the new year begins, people greet each other with “Akemashite omedetō gozaimasu”.",
        "kana": "とし が あける と あけまして おめでとう ございます と あいさつ します"
      },
      {
        "tr": "一月一日から三日までは、多くの会社や店が休みです。",
        "en": "From January 1st to 3rd many companies and shops are closed.",
        "kana": "いちがつ ついたち から みっか まで は おおく の かいしゃ や みせ が やすみ です"
      },
      {
        "tr": "多くの人が神社やお寺へ初もうでに行きます。",
        "en": "Many people go to a shrine or temple for their first visit of the year.",
        "kana": "おおく の ひと が じんじゃ や おてら へ はつもうで に いきます"
      },
      {
        "tr": "そこで、新しい一年の健康や幸せをお願いします。",
        "en": "There they pray for health and happiness in the new year.",
        "kana": "そこ で あたらしい いちねん の けんこう や しあわせ を おねがい します"
      },
      {
        "tr": "お正月には、おせち料理という特別な料理を食べます。",
        "en": "At New Year people eat special dishes called osechi.",
        "kana": "おしょうがつ に は おせちりょうり と いう とくべつ な りょうり を たべます"
      },
      {
        "tr": "おせち料理の一つ一つに、意味があります。",
        "en": "Each of the osechi dishes has a meaning.",
        "kana": "おせちりょうり の ひとつ ひとつ に いみ が あります"
      },
      {
        "tr": "たとえば、黒豆は「まめに働けるように」という願いを表しています。",
        "en": "For example, black beans express the wish “to be able to work diligently”.",
        "kana": "たとえば くろまめ は まめ に はたらける よう に と いう ねがい を あらわして います"
      },
      {
        "tr": "おもちが入ったスープ、お雑煮も欠かせません。",
        "en": "Ozōni, a soup with rice cakes in it, is another must.",
        "kana": "おもち が はいった スープ おぞうに も かかせません"
      },
      {
        "tr": "子どもたちは、お年玉というお金をもらいます。",
        "en": "Children receive money called otoshidama.",
        "kana": "こども たち は おとしだま と いう おかね を もらいます"
      },
      {
        "tr": "私も去年、友達の家でお正月を過ごしました。",
        "en": "Last year I spent New Year at a friend’s home too.",
        "kana": "わたし も きょねん ともだち の いえ で おしょうがつ を すごしました"
      },
      {
        "tr": "おもちを食べすぎて、三日間で二キロも太ってしまいました。",
        "en": "I ate too many rice cakes and put on two whole kilos in three days.",
        "kana": "おもち を たべすぎて みっかかん で にキロ も ふとって しまいました"
      },
      {
        "tr": "でも、家族みんなでゆっくり過ごす時間は、とてもすてきでした。",
        "en": "But the time spent relaxing with the whole family was really lovely.",
        "kana": "でも かぞく みんな で ゆっくり すごす じかん は とても すてき でした"
      },
      {
        "tr": "皆さんも、機会があればぜひ日本のお正月を体験してみてください。",
        "en": "If you get the chance, please do experience a Japanese New Year for yourselves.",
        "kana": "みなさん も きかい が あれば ぜひ にほん の おしょうがつ を たいけん して みて ください"
      },
      {
        "tr": "ご清聴ありがとうございました。",
        "en": "Thank you for listening.",
        "kana": "ごせいちょう ありがとう ございました"
      }
    ],
    "glossary": [
      {
        "tr": "お正月",
        "en": "New Year (the holiday)",
        "kana": "おしょうがつ"
      },
      {
        "tr": "行事",
        "en": "an annual event or occasion",
        "kana": "ぎょうじ"
      },
      {
        "tr": "大掃除",
        "en": "the big end-of-year clean",
        "kana": "おおそうじ"
      },
      {
        "tr": "大みそか",
        "en": "New Year’s Eve",
        "kana": "おおみそか"
      },
      {
        "tr": "年越しそば",
        "en": "soba noodles eaten on New Year’s Eve",
        "kana": "としこしそば"
      },
      {
        "tr": "習慣",
        "en": "custom, habit",
        "kana": "しゅうかん"
      },
      {
        "tr": "鐘",
        "en": "bell (of a temple)",
        "kana": "かね"
      },
      {
        "tr": "年が明ける",
        "en": "the new year begins",
        "kana": "とし が あける"
      },
      {
        "tr": "神社",
        "en": "Shinto shrine",
        "kana": "じんじゃ"
      },
      {
        "tr": "初もうで",
        "en": "the first shrine or temple visit of the year",
        "kana": "はつもうで"
      },
      {
        "tr": "幸せ",
        "en": "happiness",
        "kana": "しあわせ"
      },
      {
        "tr": "おせち料理",
        "en": "traditional New Year dishes",
        "kana": "おせちりょうり"
      },
      {
        "tr": "願い",
        "en": "a wish",
        "kana": "ねがい"
      },
      {
        "tr": "欠かせません",
        "en": "cannot be left out (欠かせない)",
        "kana": "かかせません"
      },
      {
        "tr": "お年玉",
        "en": "New Year’s gift of money for children",
        "kana": "おとしだま"
      },
      {
        "tr": "過ごしました",
        "en": "spent (time) (過ごす)",
        "kana": "すごしました"
      },
      {
        "tr": "太ってしまいました",
        "en": "ended up putting on weight (太る)",
        "kana": "ふとって しまいました"
      },
      {
        "tr": "体験して",
        "en": "experiencing (体験する)",
        "kana": "たいけん して"
      }
    ],
    "questions": [
      {
        "q": "What do people eat on the evening of December 31st?",
        "options": [
          "Osechi dishes",
          "Toshikoshi soba noodles",
          "Ozōni soup",
          "Black beans"
        ],
        "answer": 1,
        "explain": "「この日の夜には、年越しそばを食べる習慣があります。」"
      },
      {
        "q": "How many times do temples ring their bells around midnight?",
        "options": [
          "12 times",
          "100 times",
          "108 times",
          "365 times"
        ],
        "answer": 2,
        "explain": "「お寺では鐘を百八回鳴らします。」"
      },
      {
        "q": "What is otoshidama?",
        "options": [
          "Money that children receive at New Year",
          "A soup with rice cakes",
          "The first shrine visit of the year",
          "A New Year greeting card"
        ],
        "answer": 0,
        "explain": "「子どもたちは、お年玉というお金をもらいます。」"
      },
      {
        "q": "What happened to the speaker last New Year?",
        "options": [
          "They got lost on the way to a shrine",
          "They forgot the greeting",
          "They slept through midnight",
          "They ate too many rice cakes and gained two kilos"
        ],
        "answer": 3,
        "explain": "「おもちを食べすぎて、三日間で二キロも太ってしまいました。」"
      }
    ]
  },
  {
    "id": "ja-urashima-taro-tale",
    "kind": "story",
    "level": "B1",
    "title": "Urashima Taro",
    "titleNative": "浦島太郎",
    "summary": "The old folk tale retold in simple words: a young fisherman saves a turtle, is taken to the Dragon Palace under the sea, and comes home with a box he must never open.",
    "register": "polite",
    "lines": [
      {
        "tr": "むかしむかし、ある海辺の村に、浦島太郎という若い漁師が住んでいました。",
        "en": "Once upon a time, in a village by the sea, there lived a young fisherman called Urashima Taro.",
        "kana": "むかしむかし ある うみべ の むら に うらしま たろう と いう わかい りょうし が すんで いました"
      },
      {
        "tr": "太郎は毎日海で魚をとって、年を取ったお母さんと二人で暮らしていました。",
        "en": "Every day Taro caught fish in the sea, and he lived with his elderly mother, just the two of them.",
        "kana": "たろう は まいにち うみ で さかな を とって とし を とった おかあさん と ふたり で くらして いました"
      },
      {
        "tr": "ある日、太郎が浜辺を歩いていると、子どもたちが大きなカメをいじめていました。",
        "en": "One day, as Taro was walking along the beach, some children were tormenting a big turtle.",
        "kana": "ある ひ たろう が はまべ を あるいて いる と こども たち が おおきな カメ を いじめて いました"
      },
      {
        "tr": "太郎は「かわいそうだから、やめなさい」と言いました。",
        "en": "“Stop it, the poor thing,” said Taro.",
        "kana": "たろう は かわいそう だ から やめなさい と いいました"
      },
      {
        "tr": "子どもたちがいなくなると、太郎はカメを海へ逃がしてやりました。",
        "en": "When the children had gone, Taro let the turtle go back into the sea.",
        "kana": "こども たち が いなく なる と たろう は カメ を うみ へ にがして やりました"
      },
      {
        "tr": "何日かたったある日、太郎が船で釣りをしていると、あのカメが海から顔を出しました。",
        "en": "One day a few days later, while Taro was fishing from his boat, that same turtle put its head up out of the sea.",
        "kana": "なんにち か たった ある ひ たろう が ふね で つり を して いる と あの カメ が うみ から かお を だしました"
      },
      {
        "tr": "カメは「先日は助けてくださって、ありがとうございました」と言いました。",
        "en": "The turtle said, “Thank you very much for saving me the other day.”",
        "kana": "カメ は せんじつ は たすけて くださって ありがとう ございました と いいました"
      },
      {
        "tr": "それから、「お礼に、海の底にある竜宮城へご案内します」と言いました。",
        "en": "Then it said, “To thank you, I will take you to the Dragon Palace at the bottom of the sea.”",
        "kana": "それから おれい に うみ の そこ に ある りゅうぐうじょう へ ごあんない します と いいました"
      },
      {
        "tr": "太郎がカメの背中に乗ると、カメは海の中へどんどんもぐっていきました。",
        "en": "When Taro got on the turtle’s back, the turtle dived deeper and deeper into the sea.",
        "kana": "たろう が カメ の せなか に のる と カメ は うみ の なか へ どんどん もぐって いきました"
      },
      {
        "tr": "しばらくすると、今まで見たこともないほど美しいお城が見えてきました。",
        "en": "After a while, a palace more beautiful than anything he had ever seen came into view.",
        "kana": "しばらく する と いままで みた こと も ない ほど うつくしい おしろ が みえて きました"
      },
      {
        "tr": "お城では、乙姫様というお姫様が太郎を待っていました。",
        "en": "At the palace, a princess called Otohime was waiting for Taro.",
        "kana": "おしろ で は おとひめさま と いう おひめさま が たろう を まって いました"
      },
      {
        "tr": "乙姫様は「カメを助けてくださったそうですね、どうぞゆっくりしていってください」と言いました。",
        "en": "Otohime said, “I hear that you saved the turtle. Please stay a while and make yourself at home.”",
        "kana": "おとひめさま は カメ を たすけて くださった そう です ね どうぞ ゆっくり して いって ください と いいました"
      },
      {
        "tr": "太郎の前には、食べきれないほどのごちそうが並びました。",
        "en": "More delicious food than he could ever eat was set out in front of Taro.",
        "kana": "たろう の まえ に は たべきれない ほど の ごちそう が ならびました"
      },
      {
        "tr": "タイやヒラメなどの魚たちも、楽しい踊りを見せてくれました。",
        "en": "Sea bream, flounder and other fish also performed merry dances for him.",
        "kana": "タイ や ヒラメ など の さかな たち も たのしい おどり を みせて くれました"
      },
      {
        "tr": "毎日が夢のように楽しくて、太郎は時間がたつのも忘れてしまいました。",
        "en": "Every day was as delightful as a dream, and Taro quite forgot that time was passing.",
        "kana": "まいにち が ゆめ の よう に たのしくて たろう は じかん が たつ の も わすれて しまいました"
      },
      {
        "tr": "けれども、三年ほどたつと、太郎は村に残してきたお母さんのことが心配になりました。",
        "en": "But after about three years, Taro began to worry about the mother he had left behind in the village.",
        "kana": "けれども さんねん ほど たつ と たろう は むら に のこして きた おかあさん の こと が しんぱい に なりました"
      },
      {
        "tr": "太郎が「そろそろ村へ帰りたいと思います」と言うと、乙姫様は悲しそうな顔をしました。",
        "en": "When Taro said, “I think it is time I went back to my village,” Otohime looked sad.",
        "kana": "たろう が そろそろ むら へ かえりたい と おもいます と いう と おとひめさま は かなしそう な かお を しました"
      },
      {
        "tr": "別れるとき、乙姫様は太郎に玉手箱という美しい箱を渡しました。",
        "en": "When they parted, Otohime handed Taro a beautiful box called a tamatebako.",
        "kana": "わかれる とき おとひめさま は たろう に たまてばこ と いう うつくしい はこ を わたしました"
      },
      {
        "tr": "そして、「どんなことがあっても、この箱を開けてはいけません」と言いました。",
        "en": "And she said, “Whatever happens, you must not open this box.”",
        "kana": "そして どんな こと が あって も この はこ を あけて は いけません と いいました"
      },
      {
        "tr": "太郎はカメに乗って浜辺に戻りましたが、村の様子はすっかり変わっていました。",
        "en": "Taro rode the turtle back to the beach, but the village looked completely different.",
        "kana": "たろう は カメ に のって はまべ に もどりました が むら の ようす は すっかり かわって いました"
      },
      {
        "tr": "自分の家はどこにもなく、知っている人は一人もいませんでした。",
        "en": "His own house was nowhere to be found, and there was not a single person he knew.",
        "kana": "じぶん の いえ は どこ に も なく しって いる ひと は ひとり も いませんでした"
      },
      {
        "tr": "村の人に聞くと、「浦島太郎は三百年も前に海でいなくなった人ですよ」と言われました。",
        "en": "When he asked a villager, he was told, “Urashima Taro is someone who disappeared at sea a full three hundred years ago.”",
        "kana": "むら の ひと に きく と うらしま たろう は さんびゃくねん も まえ に うみ で いなく なった ひと です よ と いわれました"
      },
      {
        "tr": "竜宮城での三年は、地上では三百年だったのです。",
        "en": "The three years at the Dragon Palace had been three hundred years on land.",
        "kana": "りゅうぐうじょう で の さんねん は ちじょう で は さんびゃくねん だった の です"
      },
      {
        "tr": "悲しくなった太郎は、乙姫様の言葉を忘れて、玉手箱を開けてしまいました。",
        "en": "Overcome with sadness, Taro forgot Otohime’s words and opened the box.",
        "kana": "かなしく なった たろう は おとひめさま の ことば を わすれて たまてばこ を あけて しまいました"
      },
      {
        "tr": "すると、中から白い煙が出てきて、太郎はあっという間におじいさんになってしまいました。",
        "en": "At once white smoke came out of it, and in the blink of an eye Taro turned into an old man.",
        "kana": "すると なか から しろい けむり が でて きて たろう は あっというま に おじいさん に なって しまいました"
      }
    ],
    "glossary": [
      {
        "tr": "漁師",
        "en": "fisherman",
        "kana": "りょうし"
      },
      {
        "tr": "浜辺",
        "en": "beach, seashore",
        "kana": "はまべ"
      },
      {
        "tr": "いじめていました",
        "en": "were bullying, tormenting (いじめる)",
        "kana": "いじめて いました"
      },
      {
        "tr": "逃がしてやりました",
        "en": "let (it) go, set (it) free (逃がす + てやる, doing something for someone)",
        "kana": "にがして やりました"
      },
      {
        "tr": "釣り",
        "en": "fishing (with a line)",
        "kana": "つり"
      },
      {
        "tr": "先日",
        "en": "the other day (polite)",
        "kana": "せんじつ"
      },
      {
        "tr": "お礼に",
        "en": "as thanks, to thank (you)",
        "kana": "おれい に"
      },
      {
        "tr": "竜宮城",
        "en": "the Dragon Palace under the sea (竜 = dragon, 城 = castle)",
        "kana": "りゅうぐうじょう"
      },
      {
        "tr": "もぐっていきました",
        "en": "dived down (and away) (もぐる)",
        "kana": "もぐって いきました"
      },
      {
        "tr": "ごちそう",
        "en": "a feast, delicious food",
        "kana": "ごちそう"
      },
      {
        "tr": "踊り",
        "en": "a dance",
        "kana": "おどり"
      },
      {
        "tr": "夢のように",
        "en": "like a dream",
        "kana": "ゆめ の よう に"
      },
      {
        "tr": "残してきた",
        "en": "(had) left behind (残す)",
        "kana": "のこして きた"
      },
      {
        "tr": "悲しそうな",
        "en": "sad-looking",
        "kana": "かなしそう な"
      },
      {
        "tr": "玉手箱",
        "en": "tamatebako, the box of this tale",
        "kana": "たまてばこ"
      },
      {
        "tr": "様子",
        "en": "the look of things, how something appears",
        "kana": "ようす"
      },
      {
        "tr": "煙",
        "en": "smoke",
        "kana": "けむり"
      },
      {
        "tr": "あっという間に",
        "en": "in an instant, in the blink of an eye",
        "kana": "あっというま に"
      }
    ],
    "questions": [
      {
        "q": "What were the children on the beach doing?",
        "options": [
          "Catching fish for their families",
          "Tormenting a big turtle",
          "Building a small boat",
          "Looking for a lost box"
        ],
        "answer": 1,
        "explain": "「子どもたちが大きなカメをいじめていました。」"
      },
      {
        "q": "Why did Taro want to leave the Dragon Palace after about three years?",
        "options": [
          "He was tired of the food and the dances",
          "Otohime asked him to go",
          "He wanted to go fishing again",
          "He was worried about his mother"
        ],
        "answer": 3,
        "explain": "「太郎は村に残してきたお母さんのことが心配になりました。」"
      },
      {
        "q": "What did Otohime tell Taro about the box?",
        "options": [
          "He must not open it, whatever happens",
          "He should open it as soon as he got home",
          "He should give it to his mother",
          "He should throw it into the sea"
        ],
        "answer": 0,
        "explain": "「どんなことがあっても、この箱を開けてはいけません」"
      },
      {
        "q": "What happened when Taro opened the box?",
        "options": [
          "The turtle came back for him",
          "He found his old house again",
          "White smoke came out and he became an old man",
          "He was carried back to the palace"
        ],
        "answer": 2,
        "explain": "「中から白い煙が出てきて、太郎はあっという間におじいさんになってしまいました。」"
      }
    ]
  },
  {
    "id": "ja-viewing-a-flat",
    "kind": "dialogue",
    "level": "B1",
    "title": "Viewing a Flat",
    "titleNative": "アパートの部屋を見に行く",
    "summary": "Ms Chen looks round a flat with an estate agent and asks about the rooms, the walk to the station, the rent, the deposit and key money, and when she can move in.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Agent",
        "tr": "チェン様、こちらがお部屋です、どうぞ中をご覧ください。",
        "en": "Ms Chen, this is the flat. Please have a look inside.",
        "kana": "チェン さま こちら が おへや です どうぞ なか を ごらん ください"
      },
      {
        "speaker": "Chen",
        "tr": "ありがとうございます、明るくていい部屋ですね。",
        "en": "Thank you. It’s a nice bright room, isn’t it?",
        "kana": "ありがとう ございます あかるくて いい へや です ね"
      },
      {
        "speaker": "Agent",
        "tr": "はい、南向きですので、日当たりがとてもいいんです。",
        "en": "Yes, it faces south, so it gets plenty of sun.",
        "kana": "はい みなみむき です ので ひあたり が とても いい ん です"
      },
      {
        "speaker": "Chen",
        "tr": "部屋はいくつありますか。",
        "en": "How many rooms are there?",
        "kana": "へや は いくつ あります か"
      },
      {
        "speaker": "Agent",
        "tr": "六畳の部屋が一つと台所、それからお風呂とトイレがあります。",
        "en": "There is one six-mat room and a kitchen, and then a bath and a toilet.",
        "kana": "ろくじょう の へや が ひとつ と だいどころ それから おふろ と トイレ が あります"
      },
      {
        "speaker": "Chen",
        "tr": "お風呂とトイレは別ですか。",
        "en": "Are the bath and the toilet separate?",
        "kana": "おふろ と トイレ は べつ です か"
      },
      {
        "speaker": "Agent",
        "tr": "はい、別になっております。",
        "en": "Yes, they are separate.",
        "kana": "はい べつ に なって おります"
      },
      {
        "speaker": "Chen",
        "tr": "一番近い駅まで、歩いて何分ぐらいかかりますか。",
        "en": "About how many minutes does it take to walk to the nearest station?",
        "kana": "いちばん ちかい えき まで あるいて なんぷん ぐらい かかります か"
      },
      {
        "speaker": "Agent",
        "tr": "駅までは歩いて七分ほどで、途中にスーパーとコンビニもございます。",
        "en": "It is about a seven-minute walk to the station, and there are a supermarket and a convenience store on the way.",
        "kana": "えき まで は あるいて ななふん ほど で とちゅう に スーパー と コンビニ も ございます"
      },
      {
        "speaker": "Chen",
        "tr": "便利ですね、家賃はいくらですか。",
        "en": "That’s convenient. How much is the rent?",
        "kana": "べんり です ね やちん は いくら です か"
      },
      {
        "speaker": "Agent",
        "tr": "家賃は月に六万八千円で、ほかに管理費が三千円かかります。",
        "en": "The rent is 68,000 yen a month, and on top of that there is a management fee of 3,000 yen.",
        "kana": "やちん は つき に ろくまんはっせん えん で ほか に かんりひ が さんぜん えん かかります"
      },
      {
        "speaker": "Chen",
        "tr": "敷金と礼金も必要ですか。",
        "en": "Do I need to pay a deposit and key money as well?",
        "kana": "しききん と れいきん も ひつよう です か"
      },
      {
        "speaker": "Agent",
        "tr": "敷金は家賃の一か月分ですが、礼金はいただいておりません。",
        "en": "The deposit is one month’s rent, but we do not charge key money.",
        "kana": "しききん は やちん の いっかげつぶん です が れいきん は いただいて おりません"
      },
      {
        "speaker": "Chen",
        "tr": "礼金がないのは助かります。",
        "en": "It’s a great help that there is no key money.",
        "kana": "れいきん が ない の は たすかります"
      },
      {
        "speaker": "Chen",
        "tr": "いつから入居できますか。",
        "en": "When could I move in?",
        "kana": "いつ から にゅうきょ できます か"
      },
      {
        "speaker": "Agent",
        "tr": "今は空いておりますので、来週からでもご入居いただけます。",
        "en": "It is empty at the moment, so you could move in as early as next week.",
        "kana": "いま は あいて おります ので らいしゅう から でも ごにゅうきょ いただけます"
      },
      {
        "speaker": "Chen",
        "tr": "実は、来月の一日から住みたいと思っているんですが。",
        "en": "Actually, I was hoping to live here from the first of next month.",
        "kana": "じつ は らいげつ の ついたち から すみたい と おもって いる ん です が"
      },
      {
        "speaker": "Agent",
        "tr": "来月の一日でしたら、まったく問題ございません。",
        "en": "The first of next month would be no problem at all.",
        "kana": "らいげつ の ついたち でしたら まったく もんだい ございません"
      },
      {
        "speaker": "Chen",
        "tr": "契約のときには、何が必要ですか。",
        "en": "What will I need when we sign the contract?",
        "kana": "けいやく の とき に は なに が ひつよう です か"
      },
      {
        "speaker": "Agent",
        "tr": "在留カードと最初の月の家賃、それに敷金をご用意ください。",
        "en": "Please have ready your residence card, the first month’s rent and also the deposit.",
        "kana": "ざいりゅう カード と さいしょ の つき の やちん それに しききん を ごようい ください"
      },
      {
        "speaker": "Chen",
        "tr": "全部でいくらぐらいになりますか。",
        "en": "About how much will that come to altogether?",
        "kana": "ぜんぶ で いくら ぐらい に なります か"
      },
      {
        "speaker": "Agent",
        "tr": "管理費も入れて、十三万九千円になります。",
        "en": "Including the management fee, it comes to 139,000 yen.",
        "kana": "かんりひ も いれて じゅうさんまんきゅうせん えん に なります"
      },
      {
        "speaker": "Chen",
        "tr": "わかりました、とても気に入ったので、この部屋に決めたいと思います。",
        "en": "I see. I like it very much, so I would like to take this flat.",
        "kana": "わかりました とても き に いった ので この へや に きめたい と おもいます"
      },
      {
        "speaker": "Agent",
        "tr": "ありがとうございます、では、事務所に戻って手続きをいたしましょう。",
        "en": "Thank you very much. Then let us go back to the office and do the paperwork.",
        "kana": "ありがとう ございます で は じむしょ に もどって てつづき を いたしましょう"
      },
      {
        "speaker": "Chen",
        "tr": "はい、よろしくお願いします。",
        "en": "Yes, thank you.",
        "kana": "はい よろしく おねがい します"
      }
    ],
    "glossary": [
      {
        "tr": "ご覧ください",
        "en": "please have a look (honorific for 見てください)",
        "kana": "ごらん ください"
      },
      {
        "tr": "南向き",
        "en": "south-facing",
        "kana": "みなみむき"
      },
      {
        "tr": "日当たり",
        "en": "how much sun a room gets",
        "kana": "ひあたり"
      },
      {
        "tr": "六畳",
        "en": "six tatami mats — a room size of about 10 square metres (畳 counts mats)",
        "kana": "ろくじょう"
      },
      {
        "tr": "別",
        "en": "separate",
        "kana": "べつ"
      },
      {
        "tr": "家賃",
        "en": "rent",
        "kana": "やちん"
      },
      {
        "tr": "管理費",
        "en": "management fee (a monthly charge for looking after the building)",
        "kana": "かんりひ"
      },
      {
        "tr": "敷金",
        "en": "deposit (paid at the start; returned, less any costs, when you move out)",
        "kana": "しききん"
      },
      {
        "tr": "礼金",
        "en": "key money (a payment to the landlord that is not returned)",
        "kana": "れいきん"
      },
      {
        "tr": "一か月分",
        "en": "one month’s worth",
        "kana": "いっかげつぶん"
      },
      {
        "tr": "助かります",
        "en": "that is a great help (助かる)",
        "kana": "たすかります"
      },
      {
        "tr": "入居",
        "en": "moving in (to a flat or house)",
        "kana": "にゅうきょ"
      },
      {
        "tr": "空いております",
        "en": "is empty, is vacant (humble for 空いています)",
        "kana": "あいて おります"
      },
      {
        "tr": "一日",
        "en": "the first (day of the month)",
        "kana": "ついたち"
      },
      {
        "tr": "契約",
        "en": "contract",
        "kana": "けいやく"
      },
      {
        "tr": "在留カード",
        "en": "residence card (the ID card of foreign residents in Japan)",
        "kana": "ざいりゅう カード"
      },
      {
        "tr": "気に入った",
        "en": "liked, took a liking to (気に入る)",
        "kana": "き に いった"
      },
      {
        "tr": "手続き",
        "en": "procedure, paperwork",
        "kana": "てつづき"
      }
    ],
    "questions": [
      {
        "q": "How long does it take to walk from the flat to the nearest station?",
        "options": [
          "About three minutes",
          "About seven minutes",
          "About ten minutes",
          "About fifteen minutes"
        ],
        "answer": 1,
        "explain": "「駅までは歩いて七分ほどで…」"
      },
      {
        "q": "How much is the rent each month, not counting the management fee?",
        "options": [
          "3,000 yen",
          "71,000 yen",
          "68,000 yen",
          "139,000 yen"
        ],
        "answer": 2,
        "explain": "「家賃は月に六万八千円で、ほかに管理費が三千円かかります。」"
      },
      {
        "q": "What does the agent say about key money?",
        "options": [
          "They do not charge any",
          "It is one month’s rent",
          "It is two months’ rent",
          "It is paid when you move out"
        ],
        "answer": 0,
        "explain": "「礼金はいただいておりません。」 Only the deposit (敷金) is one month’s rent."
      },
      {
        "q": "From when does Ms Chen want to live in the flat?",
        "options": [
          "From tomorrow",
          "From next week",
          "From the end of this month",
          "From the first of next month"
        ],
        "answer": 3,
        "explain": "「来月の一日から住みたいと思っているんですが。」 Next week is only what the agent offers."
      }
    ]
  },
  {
    "id": "ja-onigiri-talk",
    "kind": "speech",
    "level": "B1",
    "title": "A Japanese Dish and How to Make It: Onigiri",
    "titleNative": "発表：おにぎりの作り方",
    "summary": "A learner gives a short talk about onigiri rice balls: what they are, when people eat them, what you need, and how to make one step by step.",
    "register": "polite",
    "lines": [
      {
        "tr": "皆さん、こんにちは。",
        "en": "Hello, everyone.",
        "kana": "みなさん こんにち は"
      },
      {
        "tr": "今日は、私の好きな日本の料理、おにぎりについてお話しします。",
        "en": "Today I am going to talk about a Japanese dish I like: onigiri.",
        "kana": "きょう は わたし の すき な にほん の りょうり おにぎり に ついて おはなし します"
      },
      {
        "tr": "おにぎりは、ご飯を手でにぎって、三角や丸い形にした食べ物です。",
        "en": "Onigiri is a food made by pressing cooked rice in your hands into a triangle or a round shape.",
        "kana": "おにぎり は ごはん を て で にぎって さんかく や まるい かたち に した たべもの です"
      },
      {
        "tr": "中に梅干しやツナなどを入れて、外にのりを巻くことが多いです。",
        "en": "People often put something like a pickled plum or tuna inside and wrap nori seaweed round the outside.",
        "kana": "なか に うめぼし や ツナ など を いれて そと に のり を まく こと が おおい です"
      },
      {
        "tr": "日本では、朝ご飯やお弁当として、また遠足やピクニックのときによく食べます。",
        "en": "In Japan people often eat it for breakfast or as a packed lunch, and also on school outings and picnics.",
        "kana": "にほん で は あさごはん や おべんとう と して また えんそく や ピクニック の とき に よく たべます"
      },
      {
        "tr": "コンビニでも一個百五十円ぐらいで売っていて、とても人気があります。",
        "en": "Convenience stores sell them too, for about 150 yen each, and they are very popular.",
        "kana": "コンビニ でも いっこ ひゃくごじゅう えん ぐらい で うって いて とても にんき が あります"
      },
      {
        "tr": "でも、自分で作るのも簡単ですから、今日は作り方を紹介します。",
        "en": "But they are also easy to make yourself, so today I will show you how.",
        "kana": "でも じぶん で つくる の も かんたん です から きょう は つくりかた を しょうかい します"
      },
      {
        "tr": "材料は、炊いたご飯と塩、のり、そして梅干しです。",
        "en": "The ingredients are cooked rice, salt, nori and pickled plums.",
        "kana": "ざいりょう は たいた ごはん と しお のり そして うめぼし です"
      },
      {
        "tr": "まず、ご飯を炊いて、少し冷まします。",
        "en": "First, cook the rice and let it cool a little.",
        "kana": "まず ごはん を たいて すこし さまします"
      },
      {
        "tr": "ご飯が熱すぎると、手で持てないからです。",
        "en": "That is because you cannot hold the rice in your hands if it is too hot.",
        "kana": "ごはん が あつすぎる と て で もてない から です"
      },
      {
        "tr": "次に、手を水でぬらして、手のひらに塩を少しつけます。",
        "en": "Next, wet your hands with water and put a little salt on your palms.",
        "kana": "つぎ に て を みず で ぬらして てのひら に しお を すこし つけます"
      },
      {
        "tr": "こうすると、ご飯が手につきにくくなります。",
        "en": "If you do this, the rice does not stick to your hands so easily.",
        "kana": "こう する と ごはん が て に つきにくく なります"
      },
      {
        "tr": "それから、茶わん一杯ぐらいのご飯を手にのせます。",
        "en": "Then put about one bowlful of rice on your hand.",
        "kana": "それから ちゃわん いっぱい ぐらい の ごはん を て に のせます"
      },
      {
        "tr": "ご飯の真ん中に梅干しを一つ置いて、ご飯で包みます。",
        "en": "Put one pickled plum in the middle of the rice and wrap the rice round it.",
        "kana": "ごはん の まんなか に うめぼし を ひとつ おいて ごはん で つつみます"
      },
      {
        "tr": "そして、両手で三回か四回やさしくにぎって、三角の形にします。",
        "en": "Then press it gently three or four times with both hands and shape it into a triangle.",
        "kana": "そして りょうて で さんかい か よんかい やさしく にぎって さんかく の かたち に します"
      },
      {
        "tr": "強くにぎりすぎると固くなるので、気をつけてください。",
        "en": "Be careful, because it goes hard if you press it too firmly.",
        "kana": "つよく にぎりすぎる と かたく なる ので き を つけて ください"
      },
      {
        "tr": "最後に、のりを巻いたら、できあがりです。",
        "en": "Finally, wrap the nori round it, and it is ready.",
        "kana": "さいご に のり を まいたら できあがり です"
      },
      {
        "tr": "中に入れるものは、何でもかまいません。",
        "en": "You can put anything you like inside.",
        "kana": "なか に いれる もの は なんでも かまいません"
      },
      {
        "tr": "私の国ではチーズをよく食べるので、私はチーズを入れてみました。",
        "en": "In my country we eat a lot of cheese, so I tried putting cheese in.",
        "kana": "わたし の くに で は チーズ を よく たべる ので わたし は チーズ を いれて みました"
      },
      {
        "tr": "意外においしかったので、皆さんもぜひ試してみてください。",
        "en": "It was surprisingly good, so please do try it yourselves.",
        "kana": "いがい に おいしかった ので みなさん も ぜひ ためして みて ください"
      },
      {
        "tr": "自分で作ったおにぎりは、形が少し悪くても、とてもおいしいです。",
        "en": "An onigiri you have made yourself tastes very good, even if its shape is not quite right.",
        "kana": "じぶん で つくった おにぎり は かたち が すこし わるくて も とても おいしい です"
      },
      {
        "tr": "以上で、私の発表を終わります。",
        "en": "That is the end of my presentation.",
        "kana": "いじょう で わたし の はっぴょう を おわります"
      },
      {
        "tr": "聞いてくださって、ありがとうございました。",
        "en": "Thank you for listening.",
        "kana": "きいて くださって ありがとう ございました"
      }
    ],
    "glossary": [
      {
        "tr": "にぎって",
        "en": "pressing, squeezing in the hands (にぎる)",
        "kana": "にぎって"
      },
      {
        "tr": "梅干し",
        "en": "pickled plum (salty and sour)",
        "kana": "うめぼし"
      },
      {
        "tr": "のり",
        "en": "nori, thin sheets of dried seaweed",
        "kana": "のり"
      },
      {
        "tr": "巻く",
        "en": "to wrap round, to roll",
        "kana": "まく"
      },
      {
        "tr": "遠足",
        "en": "school outing, day trip",
        "kana": "えんそく"
      },
      {
        "tr": "人気があります",
        "en": "is popular",
        "kana": "にんき が あります"
      },
      {
        "tr": "作り方",
        "en": "how to make (it)",
        "kana": "つくりかた"
      },
      {
        "tr": "材料",
        "en": "ingredients",
        "kana": "ざいりょう"
      },
      {
        "tr": "炊いた",
        "en": "cooked (rice) (炊く, to cook rice)",
        "kana": "たいた"
      },
      {
        "tr": "冷まします",
        "en": "let (it) cool (冷ます)",
        "kana": "さまします"
      },
      {
        "tr": "ぬらして",
        "en": "wetting (ぬらす)",
        "kana": "ぬらして"
      },
      {
        "tr": "手のひら",
        "en": "palm of the hand",
        "kana": "てのひら"
      },
      {
        "tr": "つきにくく",
        "en": "not sticking easily (つく + にくい, hard to …)",
        "kana": "つきにくく"
      },
      {
        "tr": "茶わん",
        "en": "rice bowl",
        "kana": "ちゃわん"
      },
      {
        "tr": "包みます",
        "en": "wrap, enclose (包む)",
        "kana": "つつみます"
      },
      {
        "tr": "できあがり",
        "en": "finished, ready",
        "kana": "できあがり"
      },
      {
        "tr": "意外に",
        "en": "surprisingly, unexpectedly",
        "kana": "いがい に"
      },
      {
        "tr": "試して",
        "en": "trying out (試す)",
        "kana": "ためして"
      }
    ],
    "questions": [
      {
        "q": "About how much does one onigiri cost at a convenience store?",
        "options": [
          "About 50 yen",
          "About 100 yen",
          "About 150 yen",
          "About 500 yen"
        ],
        "answer": 2,
        "explain": "「コンビニでも一個百五十円ぐらいで売っていて…」"
      },
      {
        "q": "Why should you let the rice cool a little first?",
        "options": [
          "Because you cannot hold rice that is too hot",
          "Because cold rice tastes sweeter",
          "Because hot rice breaks the nori",
          "Because the salt would disappear"
        ],
        "answer": 0,
        "explain": "「ご飯が熱すぎると、手で持てないからです。」"
      },
      {
        "q": "Why do you wet your hands and put salt on your palms?",
        "options": [
          "So that the rice ball becomes round",
          "So that the rice cooks faster",
          "So that the nori stays dry",
          "So that the rice does not stick to your hands so easily"
        ],
        "answer": 3,
        "explain": "「こうすると、ご飯が手につきにくくなります。」"
      },
      {
        "q": "What did the speaker try putting inside an onigiri?",
        "options": [
          "Tuna",
          "Cheese",
          "Chocolate",
          "Fried egg"
        ],
        "answer": 1,
        "explain": "「私はチーズを入れてみました。」"
      }
    ]
  },
  {
    "id": "ja-tongue-twisters",
    "kind": "twister",
    "level": "B1",
    "title": "Tongue Twisters",
    "titleNative": "早口言葉",
    "summary": "Nine classic Japanese tongue twisters (hayakuchi kotoba). Say each one slowly first, then three times fast.",
    "lines": [
      {
        "tr": "生麦生米生卵。",
        "en": "Raw wheat, raw rice, raw egg.",
        "kana": "なまむぎ なまごめ なまたまご",
        "note": "Trains m and g between vowels. Notice that 米 (kome) becomes ごめ after 生.",
        "say": "なまむぎ、なまごめ、なまたまご。"
      },
      {
        "tr": "隣の客はよく柿食う客だ。",
        "en": "The guest next door is a guest who eats a lot of persimmons.",
        "kana": "となり の きゃく は よく かき くう きゃく だ",
        "note": "Trains きゃ against か and く.",
        "say": "隣の客はよくかきくう客だ。"
      },
      {
        "tr": "赤巻紙、青巻紙、黄巻紙。",
        "en": "Red rolled paper, blue rolled paper, yellow rolled paper.",
        "kana": "あかまきがみ あおまきがみ きまきがみ",
        "note": "Trains k, m and g. 紙 (kami) becomes がみ at the end of a longer word.",
        "say": "あかまきがみ、あおまきがみ、きまきがみ。"
      },
      {
        "tr": "東京特許許可局。",
        "en": "The Tokyo Patent Licensing Office.",
        "kana": "とうきょう とっきょ きょかきょく",
        "note": "Trains きょ and the small っ. The office is made up — it exists only in this tongue twister.",
        "say": "東京とっきょきょかきょく。"
      },
      {
        "tr": "すもももももももものうち。",
        "en": "Plums and peaches are both kinds of peach.",
        "kana": "すもも も もも も もも の うち",
        "note": "Nothing but も: read it as sumomo mo / momo mo / momo no uchi.",
        "say": "すももも、ももも、もものうち。"
      },
      {
        "tr": "坊主が屏風に上手に坊主の絵を描いた。",
        "en": "The monk skilfully painted a picture of a monk on the folding screen.",
        "kana": "ぼうず が びょうぶ に じょうず に ぼうず の え を かいた",
        "note": "Trains the long vowels in ぼう, びょう and じょう.",
        "say": "坊主がびょうぶにじょうずに坊主のえをかいた。"
      },
      {
        "tr": "庭には二羽鶏がいる。",
        "en": "There are two chickens in the garden.",
        "kana": "にわ に は にわ にわとり が いる",
        "note": "にわ four times: 庭 “garden”, the particles に は (said “ni wa”), 二羽 “two birds” and 鶏 “chicken”.",
        "say": "にわにはにわ、にわとりがいる。"
      },
      {
        "tr": "この釘は引き抜きにくい釘だ。",
        "en": "This nail is a nail that is hard to pull out.",
        "kana": "この くぎ は ひきぬきにくい くぎ だ",
        "note": "Trains k and g with the vowels i and u: kugi, hikinuki-nikui."
      },
      {
        "tr": "かえるぴょこぴょこ三ぴょこぴょこ、合わせてぴょこぴょこ六ぴょこぴょこ。",
        "en": "Frogs go hop-hop, three hop-hops; together that makes hop-hop, six hop-hops.",
        "kana": "かえる ぴょこぴょこ みぴょこぴょこ あわせて ぴょこぴょこ むぴょこぴょこ",
        "note": "Trains ぴょ. Here 三 and 六 are read み and む, the old Japanese way of counting.",
        "say": "かえるぴょこぴょこ、みぴょこぴょこ、あわせてぴょこぴょこ、むぴょこぴょこ。"
      }
    ],
    "glossary": [
      {
        "tr": "生卵",
        "en": "raw egg",
        "kana": "なまたまご"
      },
      {
        "tr": "隣",
        "en": "next door",
        "kana": "となり"
      },
      {
        "tr": "客",
        "en": "guest; customer",
        "kana": "きゃく"
      },
      {
        "tr": "柿",
        "en": "persimmon",
        "kana": "かき"
      },
      {
        "tr": "坊主",
        "en": "a Buddhist monk (informal)",
        "kana": "ぼうず"
      },
      {
        "tr": "上手に",
        "en": "skilfully",
        "kana": "じょうずに"
      },
      {
        "tr": "庭",
        "en": "garden",
        "kana": "にわ"
      },
      {
        "tr": "鶏",
        "en": "chicken",
        "kana": "にわとり"
      },
      {
        "tr": "釘",
        "en": "nail",
        "kana": "くぎ"
      }
    ],
    "questions": [
      {
        "q": "What does the guest next door eat a lot of?",
        "options": [
          "Raw eggs",
          "Persimmons",
          "Peaches",
          "Rice"
        ],
        "answer": 1,
        "explain": "「よく柿食う客」 — a guest who often eats persimmons (柿, かき)."
      },
      {
        "q": "Where did the monk paint his picture?",
        "options": [
          "On rolled paper",
          "In the garden",
          "On a folding screen",
          "On a nail"
        ],
        "answer": 2,
        "explain": "「屏風に」 — on a folding screen (びょうぶ)."
      },
      {
        "q": "How many chickens are in the garden?",
        "options": [
          "Two",
          "Three",
          "Six",
          "None"
        ],
        "answer": 0,
        "explain": "「二羽」 (にわ) is “two birds”: 羽 is the counter for birds."
      },
      {
        "q": "What is special about 東京特許許可局?",
        "options": [
          "It is the oldest office in Tokyo",
          "It is where tongue twisters are registered",
          "It is in Kyoto, not Tokyo",
          "It is not a real office — it was made up for the tongue twister"
        ],
        "answer": 3,
        "explain": "There is no such office; the name was put together because きょ and っ are hard to say in a row."
      }
    ]
  },
  {
    "id": "ja-proverbs",
    "kind": "saying",
    "level": "A2",
    "title": "Proverbs You Will Hear",
    "titleNative": "ことわざ",
    "summary": "Thirteen proverbs and four-character sayings that Japanese people really use. The translation is word for word; the note under it says what people mean.",
    "lines": [
      {
        "tr": "猿も木から落ちる。",
        "en": "Even monkeys fall from trees.",
        "kana": "さる も き から おちる",
        "note": "Even experts make mistakes."
      },
      {
        "tr": "七転び八起き。",
        "en": "Fall seven times, get up eight.",
        "kana": "ななころび やおき",
        "note": "Never give up, however many times you fail.",
        "say": "ななころびやおき。"
      },
      {
        "tr": "花より団子。",
        "en": "Dumplings rather than flowers.",
        "kana": "はな より だんご",
        "note": "Practical things matter more than pretty ones — said of someone who goes to see the cherry blossom for the food."
      },
      {
        "tr": "急がば回れ。",
        "en": "If you are in a hurry, go the long way round.",
        "kana": "いそがば まわれ",
        "note": "More haste, less speed: the safe way is quicker in the end."
      },
      {
        "tr": "石の上にも三年。",
        "en": "Three years, even on a stone.",
        "kana": "いし の うえ に も さんねん",
        "note": "Sit on a cold stone for three years and it gets warm: patience pays off."
      },
      {
        "tr": "ちりも積もれば山となる。",
        "en": "Even dust, if it piles up, becomes a mountain.",
        "kana": "ちり も つもれば やま と なる",
        "note": "Small efforts add up."
      },
      {
        "tr": "十人十色。",
        "en": "Ten people, ten colours.",
        "kana": "じゅうにん といろ",
        "note": "Everyone has their own tastes and opinions.",
        "say": "じゅうにんといろ。"
      },
      {
        "tr": "一石二鳥。",
        "en": "One stone, two birds.",
        "kana": "いっせき にちょう",
        "note": "To kill two birds with one stone.",
        "say": "いっせきにちょう。"
      },
      {
        "tr": "郷に入っては郷に従え。",
        "en": "When you enter a village, follow the village.",
        "kana": "ごう に いって は ごう に したがえ",
        "note": "When in Rome, do as the Romans do.",
        "say": "ごうにいってはごうにしたがえ。"
      },
      {
        "tr": "百聞は一見にしかず。",
        "en": "Hearing about it a hundred times is not as good as seeing it once.",
        "kana": "ひゃくぶん は いっけん に しかず",
        "note": "Seeing is believing.",
        "say": "ひゃくぶんはいっけんにしかず。"
      },
      {
        "tr": "出る杭は打たれる。",
        "en": "The stake that sticks out gets hammered down.",
        "kana": "でる くい は うたれる",
        "note": "People who stand out get criticised — often quoted about fitting in with the group.",
        "say": "でるくいはうたれる。"
      },
      {
        "tr": "笑う門には福来る。",
        "en": "Good fortune comes to the gate of those who laugh.",
        "kana": "わらう かど に は ふく きたる",
        "note": "A cheerful home attracts good luck.",
        "say": "わらうかどにはふくきたる。"
      },
      {
        "tr": "継続は力なり。",
        "en": "Keeping going is strength.",
        "kana": "けいぞく は ちから なり",
        "note": "Steady practice is what makes you good — a favourite of teachers and language learners.",
        "say": "けいぞくはちからなり。"
      }
    ],
    "glossary": [
      {
        "tr": "猿",
        "en": "monkey",
        "kana": "さる"
      },
      {
        "tr": "団子",
        "en": "sweet rice dumplings",
        "kana": "だんご"
      },
      {
        "tr": "急がば",
        "en": "if you hurry (an old form of 急げば)",
        "kana": "いそがば"
      },
      {
        "tr": "石",
        "en": "stone",
        "kana": "いし"
      },
      {
        "tr": "山",
        "en": "mountain",
        "kana": "やま"
      },
      {
        "tr": "十人",
        "en": "ten people",
        "kana": "じゅうにん"
      },
      {
        "tr": "郷",
        "en": "a village; one’s home district",
        "kana": "ごう"
      },
      {
        "tr": "杭",
        "en": "a stake, a post",
        "kana": "くい"
      },
      {
        "tr": "福",
        "en": "good fortune",
        "kana": "ふく"
      }
    ],
    "questions": [
      {
        "q": "Which proverb means “even experts make mistakes”?",
        "options": [
          "花より団子。",
          "急がば回れ。",
          "猿も木から落ちる。",
          "一石二鳥。"
        ],
        "answer": 2,
        "explain": "Even monkeys fall from trees."
      },
      {
        "q": "What does 花より団子 say about a person?",
        "options": [
          "They prefer practical things, like food, to beautiful ones",
          "They love flowers more than anything",
          "They never share their food",
          "They are always late"
        ],
        "answer": 0,
        "explain": "Dumplings rather than flowers: substance over looks."
      },
      {
        "q": "A friend wants to give up after failing an exam twice. Which proverb would encourage them?",
        "options": [
          "十人十色。",
          "七転び八起き。",
          "出る杭は打たれる。",
          "百聞は一見にしかず。"
        ],
        "answer": 1,
        "explain": "Fall seven times, get up eight."
      },
      {
        "q": "What happens to 出る杭, the stake that sticks out?",
        "options": [
          "It becomes a mountain",
          "It brings good fortune",
          "It falls from a tree",
          "It gets hammered down"
        ],
        "answer": 3,
        "explain": "「打たれる」 — it gets hit: people who stand out are criticised."
      }
    ]
  }
];
