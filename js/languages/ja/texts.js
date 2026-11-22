// Read & Listen: graded dialogues, stories, everyday texts and short speeches.
// Each text: { id, kind, level, title, titleNative, summary, dialect?, register?,
//   lines: [{ speaker?, tr, en, kana }], glossary: [{ tr, en, kana }],
//   questions: [{ q, options[4], answer, explain }] }.
// Written by one author and checked line by line by a native-level reviewer; edit freely.
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
  }
];
