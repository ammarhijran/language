// Read & Listen: graded dialogues, stories, everyday texts and short speeches.
// Each text: { id, kind, level, title, titleNative, summary, dialect?, register?,
//   lines: [{ speaker?, tr, en }], glossary: [{ tr, en }],
//   questions: [{ q, options[4], answer, explain }] }.
// Written by one author and checked line by line by a native-level reviewer; edit freely.
// Loaded on demand (not at startup).
export const texts = [
  {
    "id": "meeting-the-neighbour",
    "kind": "dialogue",
    "level": "A1",
    "title": "Meeting the New Neighbour",
    "titleNative": "Yeni Komşu",
    "summary": "Selin has just moved into a new flat and knocks on her neighbour's door to introduce herself.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Selin",
        "tr": "Merhaba, iyi akşamlar.",
        "en": "Hello, good evening."
      },
      {
        "speaker": "Nermin",
        "tr": "İyi akşamlar, buyurun?",
        "en": "Good evening, can I help you?"
      },
      {
        "speaker": "Selin",
        "tr": "Ben Selin, karşı daireye yeni taşındım.",
        "en": "I'm Selin, I've just moved into the flat across the hall."
      },
      {
        "speaker": "Nermin",
        "tr": "Aa, hoş geldiniz, güle güle oturun!",
        "en": "Oh, welcome, I hope you'll be very happy in your new home!"
      },
      {
        "speaker": "Nermin",
        "tr": "Ben de Nermin, memnun oldum.",
        "en": "And I'm Nermin, nice to meet you."
      },
      {
        "speaker": "Selin",
        "tr": "Ben de memnun oldum.",
        "en": "Nice to meet you too."
      },
      {
        "speaker": "Nermin",
        "tr": "Nerelisiniz?",
        "en": "Where are you from?"
      },
      {
        "speaker": "Selin",
        "tr": "İzmirliyim ama iş için İstanbul'a geldim.",
        "en": "I'm from Izmir, but I came to Istanbul for work."
      },
      {
        "speaker": "Nermin",
        "tr": "Eşyalarınızı yerleştirdiniz mi?",
        "en": "Have you unpacked your things yet?"
      },
      {
        "speaker": "Selin",
        "tr": "Henüz değil, her şey hâlâ kutularda.",
        "en": "Not yet, everything is still in boxes."
      },
      {
        "speaker": "Nermin",
        "tr": "Bir şeye ihtiyacınız olursa lütfen kapımı çalın.",
        "en": "If you need anything, please knock on my door."
      },
      {
        "speaker": "Selin",
        "tr": "Çok teşekkür ederim, çok naziksiniz.",
        "en": "Thank you very much, that's very kind of you."
      },
      {
        "speaker": "Nermin",
        "tr": "Rica ederim, kolay gelsin!",
        "en": "You're welcome, good luck with the unpacking!"
      },
      {
        "speaker": "Selin",
        "tr": "Sağ olun, iyi akşamlar.",
        "en": "Thanks, good evening."
      }
    ],
    "glossary": [
      {
        "tr": "buyurun",
        "en": "yes? / can I help you? (polite reply when someone comes to you)"
      },
      {
        "tr": "yeni taşındım",
        "en": "I've just moved in"
      },
      {
        "tr": "karşı daire",
        "en": "the flat opposite / across the hall"
      },
      {
        "tr": "memnun oldum",
        "en": "nice to meet you"
      },
      {
        "tr": "Nerelisiniz?",
        "en": "Where are you from? (polite)"
      },
      {
        "tr": "eşyalarınızı yerleştirdiniz mi",
        "en": "have you unpacked / put your things away"
      },
      {
        "tr": "güle güle oturun",
        "en": "may you live happily here (said to someone who has moved into a new home)"
      },
      {
        "tr": "ihtiyacınız olursa",
        "en": "if you need (something)"
      },
      {
        "tr": "kapımı çalın",
        "en": "knock on my door"
      },
      {
        "tr": "kolay gelsin",
        "en": "lit. 'may it come easy'; said to someone who is busy working"
      }
    ],
    "questions": [
      {
        "q": "Why does Selin knock on Nermin's door?",
        "options": [
          "To introduce herself as the new neighbour",
          "To borrow some sugar",
          "To complain about noise",
          "To ask for directions"
        ],
        "answer": 0,
        "explain": "She says she has just moved into the flat across the hall: 'karşı daireye yeni taşındım'."
      },
      {
        "q": "Where is Selin from?",
        "options": [
          "Istanbul",
          "Izmir",
          "Ankara",
          "Bursa"
        ],
        "answer": 1,
        "explain": "'İzmirliyim' means 'I'm from Izmir'; she came to Istanbul for work."
      },
      {
        "q": "Has Selin finished unpacking?",
        "options": [
          "Yes, everything is in place",
          "She hasn't moved in yet",
          "No, everything is still in boxes",
          "Her family is unpacking for her"
        ],
        "answer": 2,
        "explain": "She says 'Henüz değil, her şey hâlâ kutularda' – not yet, everything is still in boxes."
      },
      {
        "q": "Which phrase does Nermin use because Selin is busy with her move?",
        "options": [
          "Memnun oldum",
          "Nerelisiniz?",
          "Buyurun",
          "Kolay gelsin"
        ],
        "answer": 3,
        "explain": "'Kolay gelsin' is said to someone who is working on something, here unpacking."
      }
    ]
  },
  {
    "id": "cafe-for-two",
    "kind": "dialogue",
    "level": "A1",
    "title": "Ordering for Two at a Café",
    "titleNative": "Kafede İki Kişi",
    "summary": "Two friends, Can and Elif, get a table at a café, decide what to have and order from the waiter.",
    "register": "mixed",
    "lines": [
      {
        "speaker": "Waiter",
        "tr": "Hoş geldiniz, kaç kişisiniz?",
        "en": "Welcome, how many of you are there?"
      },
      {
        "speaker": "Can",
        "tr": "İki kişiyiz.",
        "en": "There are two of us."
      },
      {
        "speaker": "Waiter",
        "tr": "Şöyle cam kenarına buyurun.",
        "en": "This way, please, by the window."
      },
      {
        "speaker": "Can",
        "tr": "Ne içmek istersin?",
        "en": "What would you like to drink?"
      },
      {
        "speaker": "Elif",
        "tr": "Bilmem, sen ne alacaksın?",
        "en": "I don't know, what are you getting?"
      },
      {
        "speaker": "Can",
        "tr": "Ben sade bir Türk kahvesi alacağım.",
        "en": "I'm going to have a Turkish coffee without sugar."
      },
      {
        "speaker": "Elif",
        "tr": "Ben de bir çay içeyim.",
        "en": "And I'll have a tea."
      },
      {
        "speaker": "Elif",
        "tr": "Bir de kurabiye alalım mı?",
        "en": "Shall we get some cookies too?"
      },
      {
        "speaker": "Can",
        "tr": "Olur, alalım.",
        "en": "Sure, let's."
      },
      {
        "speaker": "Can",
        "tr": "Bakar mısınız?",
        "en": "Excuse me!"
      },
      {
        "speaker": "Waiter",
        "tr": "Buyurun, ne alırsınız?",
        "en": "Yes, what would you like?"
      },
      {
        "speaker": "Can",
        "tr": "Bir sade Türk kahvesi, bir çay ve bir tabak kurabiye, lütfen.",
        "en": "One Turkish coffee without sugar, one tea and a plate of cookies, please."
      },
      {
        "speaker": "Waiter",
        "tr": "Tabii, hemen getiriyorum.",
        "en": "Of course, I'll bring them right away."
      },
      {
        "speaker": "Elif",
        "tr": "Teşekkür ederiz.",
        "en": "Thank you."
      }
    ],
    "glossary": [
      {
        "tr": "Kaç kişisiniz?",
        "en": "How many of you are there? (polite)"
      },
      {
        "tr": "iki kişiyiz",
        "en": "there are two of us"
      },
      {
        "tr": "cam kenarına",
        "en": "by the window"
      },
      {
        "tr": "istersin",
        "en": "you'd like (casual, to a friend)"
      },
      {
        "tr": "sade",
        "en": "plain, without sugar (for coffee)"
      },
      {
        "tr": "kurabiye",
        "en": "cookie, biscuit"
      },
      {
        "tr": "Bakar mısınız?",
        "en": "Excuse me! (polite way to call a waiter; lit. 'would you look?')"
      },
      {
        "tr": "ne alırsınız",
        "en": "what would you like? (polite)"
      },
      {
        "tr": "hemen getiriyorum",
        "en": "I'll bring it right away"
      }
    ],
    "questions": [
      {
        "q": "How many people are at the table?",
        "options": [
          "One",
          "Two",
          "Three",
          "Four"
        ],
        "answer": 1,
        "explain": "Can says 'İki kişiyiz' – there are two of us."
      },
      {
        "q": "How does Can want his Turkish coffee?",
        "options": [
          "With a lot of sugar",
          "With milk",
          "Without sugar",
          "With a little sugar"
        ],
        "answer": 2,
        "explain": "'Sade' means plain, with no sugar."
      },
      {
        "q": "Who suggests getting cookies?",
        "options": [
          "Can",
          "Elif",
          "The waiter",
          "Another customer"
        ],
        "answer": 1,
        "explain": "Elif asks 'Bir de kurabiye alalım mı?' – shall we get some cookies too?"
      },
      {
        "q": "Why does Can say 'Bakar mısınız?'",
        "options": [
          "To call the waiter politely",
          "To ask Elif to look at the menu",
          "To complain about the table",
          "To ask for the bill"
        ],
        "answer": 0,
        "explain": "'Bakar mısınız?' is the polite way to get a waiter's attention. Note that the friends use 'sen' with each other but the waiter uses 'siz'."
      }
    ]
  },
  {
    "id": "returning-a-shirt",
    "kind": "dialogue",
    "level": "A2",
    "title": "Returning a Shirt",
    "titleNative": "Gömlek İadesi",
    "summary": "A customer brings back a shirt she bought yesterday and asks the shop assistant for a refund.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Assistant",
        "tr": "İyi günler, nasıl yardımcı olabilirim?",
        "en": "Hello, how can I help you?"
      },
      {
        "speaker": "Customer",
        "tr": "İyi günler, dün bu gömleği buradan aldım.",
        "en": "Hello, I bought this shirt here yesterday."
      },
      {
        "speaker": "Customer",
        "tr": "Ama bana biraz küçük geldi.",
        "en": "But it turned out a bit small for me."
      },
      {
        "speaker": "Assistant",
        "tr": "Anlıyorum, fişiniz yanınızda mı?",
        "en": "I see, do you have your receipt with you?"
      },
      {
        "speaker": "Customer",
        "tr": "Evet, buyurun.",
        "en": "Yes, here you are."
      },
      {
        "speaker": "Assistant",
        "tr": "Bir beden büyüğüyle değiştirmek ister misiniz?",
        "en": "Would you like to exchange it for one size up?"
      },
      {
        "speaker": "Customer",
        "tr": "Aslında rengini de pek beğenmedim, iade etmek istiyorum.",
        "en": "Actually, I didn't really like the colour either, so I'd like to return it."
      },
      {
        "speaker": "Assistant",
        "tr": "Sorun değil, on dört gün içinde iade kabul ediyoruz.",
        "en": "No problem, we accept returns within fourteen days."
      },
      {
        "speaker": "Assistant",
        "tr": "Kartla mı ödediniz, nakit mi?",
        "en": "Did you pay by card or in cash?"
      },
      {
        "speaker": "Customer",
        "tr": "Kartla ödedim.",
        "en": "I paid by card."
      },
      {
        "speaker": "Assistant",
        "tr": "O zaman para birkaç gün içinde kartınıza iade edilir.",
        "en": "Then the money will be refunded to your card within a few days."
      },
      {
        "speaker": "Assistant",
        "tr": "Şuraya bir imza atar mısınız?",
        "en": "Could you sign here, please?"
      },
      {
        "speaker": "Customer",
        "tr": "Tabii, çok teşekkür ederim.",
        "en": "Of course, thank you very much."
      },
      {
        "speaker": "Assistant",
        "tr": "Rica ederim, iyi günler dilerim.",
        "en": "You're welcome, have a nice day."
      }
    ],
    "glossary": [
      {
        "tr": "gömleği",
        "en": "the shirt (object form of 'gömlek')"
      },
      {
        "tr": "küçük geldi",
        "en": "it was too small (lit. 'it came small')"
      },
      {
        "tr": "fişiniz",
        "en": "your receipt"
      },
      {
        "tr": "yanınızda",
        "en": "with you, on you"
      },
      {
        "tr": "bir beden büyüğü",
        "en": "one size bigger"
      },
      {
        "tr": "değiştirmek",
        "en": "to exchange, to change"
      },
      {
        "tr": "iade etmek",
        "en": "to return (an item), to refund"
      },
      {
        "tr": "nakit",
        "en": "cash"
      },
      {
        "tr": "imza atar mısınız",
        "en": "could you sign (polite)"
      },
      {
        "tr": "iyi günler dilerim",
        "en": "have a nice day (lit. 'I wish you good days')"
      }
    ],
    "questions": [
      {
        "q": "What is wrong with the shirt?",
        "options": [
          "It is too big",
          "It is a bit small and she doesn't like the colour",
          "It has a hole in it",
          "It was the wrong price"
        ],
        "answer": 1,
        "explain": "She says it is 'biraz küçük' and she didn't really like the colour ('rengini de pek beğenmedim')."
      },
      {
        "q": "What does the assistant offer first?",
        "options": [
          "A refund",
          "A discount",
          "An exchange for a bigger size",
          "A free shirt"
        ],
        "answer": 2,
        "explain": "'Bir beden büyüğüyle değiştirmek ister misiniz?' – would you like to exchange it for one size up?"
      },
      {
        "q": "How long do customers have to return items?",
        "options": [
          "Seven days",
          "Fourteen days",
          "One month",
          "Three days"
        ],
        "answer": 1,
        "explain": "'On dört gün içinde iade kabul ediyoruz' – we accept returns within fourteen days."
      },
      {
        "q": "How will the customer get her money back?",
        "options": [
          "In cash right away",
          "As a gift card",
          "Back to her card in a few days",
          "By bank transfer next month"
        ],
        "answer": 2,
        "explain": "She paid by card, so the money is refunded to her card 'birkaç gün içinde' – within a few days."
      }
    ]
  },
  {
    "id": "asking-for-directions",
    "kind": "dialogue",
    "level": "A1",
    "title": "Asking for Directions",
    "titleNative": "Yol Sormak",
    "summary": "A visitor stops a passer-by in the street to ask the way to the metro station.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Visitor",
        "tr": "Affedersiniz, bir şey sorabilir miyim?",
        "en": "Excuse me, may I ask you something?"
      },
      {
        "speaker": "Passer-by",
        "tr": "Tabii, buyurun.",
        "en": "Of course, go ahead."
      },
      {
        "speaker": "Visitor",
        "tr": "Metro istasyonu nerede acaba?",
        "en": "Do you know where the metro station is?"
      },
      {
        "speaker": "Passer-by",
        "tr": "Çok yakın, yürüyerek beş dakika.",
        "en": "It's very close, five minutes on foot."
      },
      {
        "speaker": "Passer-by",
        "tr": "Bu caddeden düz gidin.",
        "en": "Go straight down this street."
      },
      {
        "speaker": "Passer-by",
        "tr": "İkinci ışıklardan sağa dönün.",
        "en": "Turn right at the second traffic lights."
      },
      {
        "speaker": "Passer-by",
        "tr": "İstasyon solda, eczanenin hemen yanında.",
        "en": "The station is on the left, right next to the pharmacy."
      },
      {
        "speaker": "Visitor",
        "tr": "Düz, sonra ikinci ışıklardan sağa, değil mi?",
        "en": "Straight on, then right at the second lights, is that right?"
      },
      {
        "speaker": "Passer-by",
        "tr": "Evet, aynen öyle.",
        "en": "Yes, exactly."
      },
      {
        "speaker": "Visitor",
        "tr": "Çok teşekkür ederim.",
        "en": "Thank you very much."
      },
      {
        "speaker": "Passer-by",
        "tr": "Bir şey değil, iyi günler.",
        "en": "Not at all, have a good day."
      }
    ],
    "glossary": [
      {
        "tr": "Affedersiniz",
        "en": "Excuse me (polite)"
      },
      {
        "tr": "acaba",
        "en": "I wonder (makes a question softer and more polite)"
      },
      {
        "tr": "yürüyerek",
        "en": "on foot"
      },
      {
        "tr": "cadde",
        "en": "street, avenue"
      },
      {
        "tr": "düz gidin",
        "en": "go straight on (polite)"
      },
      {
        "tr": "ışıklardan",
        "en": "at the traffic lights"
      },
      {
        "tr": "sağa dönün",
        "en": "turn right (polite)"
      },
      {
        "tr": "hemen yanında",
        "en": "right next to"
      },
      {
        "tr": "aynen öyle",
        "en": "exactly, just like that"
      },
      {
        "tr": "bir şey değil",
        "en": "not at all, you're welcome"
      }
    ],
    "questions": [
      {
        "q": "What is the visitor looking for?",
        "options": [
          "A pharmacy",
          "The metro station",
          "A bus stop",
          "A hotel"
        ],
        "answer": 1,
        "explain": "'Metro istasyonu nerede acaba?' – where is the metro station?"
      },
      {
        "q": "How far is it on foot?",
        "options": [
          "Five minutes",
          "Fifteen minutes",
          "Half an hour",
          "One minute"
        ],
        "answer": 0,
        "explain": "'Yürüyerek beş dakika' – five minutes on foot."
      },
      {
        "q": "Where should the visitor turn right?",
        "options": [
          "At the first traffic lights",
          "At the pharmacy",
          "At the second traffic lights",
          "At the end of the street"
        ],
        "answer": 2,
        "explain": "'İkinci ışıklardan sağa dönün' – turn right at the second lights."
      },
      {
        "q": "What is right next to the station?",
        "options": [
          "A café",
          "A bank",
          "A school",
          "A pharmacy"
        ],
        "answer": 3,
        "explain": "'Eczanenin hemen yanında' – right next to the pharmacy."
      }
    ]
  },
  {
    "id": "weekend-plans",
    "kind": "dialogue",
    "level": "A2",
    "title": "Weekend Plans",
    "titleNative": "Hafta Sonu Planı",
    "summary": "Two friends, Deniz and Burak, make plans for breakfast and a walk on Saturday.",
    "register": "casual",
    "lines": [
      {
        "speaker": "Deniz",
        "tr": "Naber, bu hafta sonu ne yapıyorsun?",
        "en": "What's up, what are you doing this weekend?"
      },
      {
        "speaker": "Burak",
        "tr": "Şimdilik bir planım yok, sen?",
        "en": "No plans so far, what about you?"
      },
      {
        "speaker": "Deniz",
        "tr": "Cumartesi kahvaltıya gidelim mi?",
        "en": "Shall we go out for breakfast on Saturday?"
      },
      {
        "speaker": "Burak",
        "tr": "Olur, ama çok erken olmasın.",
        "en": "Sure, but not too early."
      },
      {
        "speaker": "Burak",
        "tr": "Cuma akşamı iş yemeğim var, geç yatacağım.",
        "en": "I've got a work dinner on Friday evening, so I'll be going to bed late."
      },
      {
        "speaker": "Deniz",
        "tr": "Tamam, on bir nasıl?",
        "en": "Okay, how about eleven?"
      },
      {
        "speaker": "Burak",
        "tr": "Süper, nerede buluşalım?",
        "en": "Great, where shall we meet?"
      },
      {
        "speaker": "Deniz",
        "tr": "Moda'daki o küçük kafe var ya, oraya gidelim.",
        "en": "You know that little café in Moda, let's go there."
      },
      {
        "speaker": "Burak",
        "tr": "Tamam, kahvaltıdan sonra da sahilde yürürüz.",
        "en": "Okay, and after breakfast we can walk along the seafront."
      },
      {
        "speaker": "Deniz",
        "tr": "Hava güzel olursa neden olmasın?",
        "en": "If the weather's nice, why not?"
      },
      {
        "speaker": "Burak",
        "tr": "Bu arada, pazar günü sinemaya gelir misin?",
        "en": "By the way, do you want to come to the cinema on Sunday?"
      },
      {
        "speaker": "Deniz",
        "tr": "Pazar olmaz, annemlere gideceğim.",
        "en": "Sunday's no good, I'm going over to my mum's."
      },
      {
        "speaker": "Burak",
        "tr": "Peki, o zaman cumartesi görüşürüz.",
        "en": "All right, see you on Saturday then."
      },
      {
        "speaker": "Deniz",
        "tr": "Görüşürüz, kendine iyi bak!",
        "en": "See you, take care!"
      }
    ],
    "glossary": [
      {
        "tr": "Naber",
        "en": "What's up? (very casual, from 'ne haber')"
      },
      {
        "tr": "hafta sonu",
        "en": "weekend"
      },
      {
        "tr": "kahvaltıya gidelim mi",
        "en": "shall we go out for breakfast"
      },
      {
        "tr": "geç yatacağım",
        "en": "I'll go to bed late"
      },
      {
        "tr": "buluşalım",
        "en": "let's meet"
      },
      {
        "tr": "var ya",
        "en": "you know (casual, to remind someone of something)"
      },
      {
        "tr": "sahilde",
        "en": "by the sea, on the seafront"
      },
      {
        "tr": "bu arada",
        "en": "by the way"
      },
      {
        "tr": "annemlere",
        "en": "to my mum's (to my parents' home)"
      },
      {
        "tr": "kendine iyi bak",
        "en": "take care (lit. 'look after yourself')"
      }
    ],
    "questions": [
      {
        "q": "What do Deniz and Burak plan for Saturday?",
        "options": [
          "Going to the cinema",
          "Going out for breakfast and maybe a walk",
          "Visiting Deniz's mum",
          "A work dinner"
        ],
        "answer": 1,
        "explain": "They agree on breakfast at eleven and a walk by the sea if the weather is nice."
      },
      {
        "q": "Why doesn't Burak want to meet too early?",
        "options": [
          "He works on Saturday morning",
          "He lives far away",
          "He'll go to bed late after a work dinner on Friday",
          "He doesn't like breakfast"
        ],
        "answer": 2,
        "explain": "'Cuma akşamı iş yemeğim var, geç yatacağım' – he has a work dinner and will go to bed late."
      },
      {
        "q": "What time will they meet?",
        "options": [
          "Eleven",
          "Nine",
          "Ten",
          "Twelve"
        ],
        "answer": 0,
        "explain": "Deniz suggests 'on bir' (eleven) and Burak agrees."
      },
      {
        "q": "Why can't Deniz go to the cinema on Sunday?",
        "options": [
          "She has to work",
          "She doesn't like films",
          "She's going on a trip",
          "She's going to her mum's"
        ],
        "answer": 3,
        "explain": "'Annemlere gideceğim' – I'm going to my mum's place."
      }
    ]
  },
  {
    "id": "at-the-pharmacy",
    "kind": "dialogue",
    "level": "A2",
    "title": "At the Pharmacy",
    "titleNative": "Eczanede",
    "summary": "A customer with a sore throat and a cough asks a pharmacist for advice and medicine.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Pharmacist",
        "tr": "Merhaba, buyurun.",
        "en": "Hello, how can I help?"
      },
      {
        "speaker": "Customer",
        "tr": "Merhaba, iki gündür boğazım ağrıyor.",
        "en": "Hello, my throat has been sore for two days."
      },
      {
        "speaker": "Customer",
        "tr": "Biraz da öksürüğüm var.",
        "en": "I've also got a bit of a cough."
      },
      {
        "speaker": "Pharmacist",
        "tr": "Ateşiniz var mı?",
        "en": "Do you have a temperature?"
      },
      {
        "speaker": "Customer",
        "tr": "Hayır, ateşim yok ama çok yorgunum.",
        "en": "No, no temperature, but I'm very tired."
      },
      {
        "speaker": "Pharmacist",
        "tr": "Size bir kutu pastil ve bir öksürük şurubu verebilirim.",
        "en": "I can give you a box of throat lozenges and a cough syrup."
      },
      {
        "speaker": "Pharmacist",
        "tr": "Şurubu günde üç kez, yemeklerden sonra için.",
        "en": "Take the syrup three times a day, after meals."
      },
      {
        "speaker": "Customer",
        "tr": "Pastilleri ne zaman kullanayım?",
        "en": "And when should I take the lozenges?"
      },
      {
        "speaker": "Pharmacist",
        "tr": "Boğazınız ağrıyınca bir tane emebilirsiniz.",
        "en": "When your throat hurts, you can suck one."
      },
      {
        "speaker": "Pharmacist",
        "tr": "Üç gün içinde geçmezse mutlaka doktora görünün.",
        "en": "If it doesn't get better within three days, be sure to see a doctor."
      },
      {
        "speaker": "Customer",
        "tr": "Tamam, çok teşekkürler, borcum ne kadar?",
        "en": "Okay, thanks a lot, how much do I owe you?"
      },
      {
        "speaker": "Pharmacist",
        "tr": "Toplam iki yüz elli lira.",
        "en": "It's two hundred and fifty lira in total."
      },
      {
        "speaker": "Pharmacist",
        "tr": "Geçmiş olsun.",
        "en": "Get well soon."
      }
    ],
    "glossary": [
      {
        "tr": "iki gündür",
        "en": "for two days"
      },
      {
        "tr": "boğazım ağrıyor",
        "en": "my throat hurts, I have a sore throat"
      },
      {
        "tr": "öksürüğüm var",
        "en": "I have a cough"
      },
      {
        "tr": "ateşiniz",
        "en": "your temperature, fever (polite)"
      },
      {
        "tr": "pastil",
        "en": "throat lozenge"
      },
      {
        "tr": "şurubu",
        "en": "the syrup (from 'şurup')"
      },
      {
        "tr": "günde üç kez",
        "en": "three times a day"
      },
      {
        "tr": "doktora görünün",
        "en": "see a doctor (polite)"
      },
      {
        "tr": "borcum ne kadar",
        "en": "how much do I owe? (common way to ask the price when paying)"
      },
      {
        "tr": "Geçmiş olsun",
        "en": "Get well soon (lit. 'may it be past')"
      }
    ],
    "questions": [
      {
        "q": "What are the customer's symptoms?",
        "options": [
          "A headache and a fever",
          "A sore throat and a slight cough",
          "A stomach ache",
          "A toothache"
        ],
        "answer": 1,
        "explain": "'Boğazım ağrıyor' and 'biraz da öksürüğüm var' – a sore throat and a bit of a cough; no fever."
      },
      {
        "q": "How often should the customer take the syrup?",
        "options": [
          "Once a day before bed",
          "Twice a day before meals",
          "Three times a day after meals",
          "Every hour"
        ],
        "answer": 2,
        "explain": "'Günde üç kez, yemeklerden sonra' – three times a day, after meals."
      },
      {
        "q": "When should the customer see a doctor?",
        "options": [
          "Immediately",
          "If it doesn't get better in three days",
          "Only if they feel tired",
          "Next month"
        ],
        "answer": 1,
        "explain": "'Üç gün içinde geçmezse mutlaka doktora görünün.'"
      },
      {
        "q": "What does the pharmacist mean by 'Geçmiş olsun'?",
        "options": [
          "Goodbye forever",
          "Enjoy your meal",
          "Get well soon",
          "Good luck at work"
        ],
        "answer": 2,
        "explain": "'Geçmiş olsun' is said to someone who is ill: get well soon."
      }
    ]
  },
  {
    "id": "my-morning",
    "kind": "story",
    "level": "A1",
    "title": "My Morning",
    "titleNative": "Bu Sabah",
    "summary": "The narrator tells us about this morning, from waking up to arriving at work.",
    "register": "casual",
    "lines": [
      {
        "tr": "Bu sabah saat yedide uyandım.",
        "en": "This morning I woke up at seven."
      },
      {
        "tr": "Önce bir bardak su içtim.",
        "en": "First I drank a glass of water."
      },
      {
        "tr": "Sonra duş aldım ve giyindim.",
        "en": "Then I had a shower and got dressed."
      },
      {
        "tr": "Mutfakta kahvaltı hazırladım.",
        "en": "I made breakfast in the kitchen."
      },
      {
        "tr": "Kahvaltıda peynir, zeytin, domates ve ekmek yedim.",
        "en": "For breakfast I had cheese, olives, tomatoes and bread."
      },
      {
        "tr": "Bir de büyük bir bardak çay içtim.",
        "en": "I also drank a big glass of tea."
      },
      {
        "tr": "Saat sekizde evden çıktım.",
        "en": "I left home at eight o'clock."
      },
      {
        "tr": "Hava soğuktu ama güneşliydi.",
        "en": "It was cold but sunny."
      },
      {
        "tr": "Otobüs durağına yürüdüm.",
        "en": "I walked to the bus stop."
      },
      {
        "tr": "Otobüs biraz geç geldi.",
        "en": "The bus came a little late."
      },
      {
        "tr": "İşe tam dokuzda geldim.",
        "en": "I got to work at nine on the dot."
      },
      {
        "tr": "Güzel bir sabahtı.",
        "en": "It was a nice morning."
      }
    ],
    "glossary": [
      {
        "tr": "uyandım",
        "en": "I woke up"
      },
      {
        "tr": "duş aldım",
        "en": "I had a shower"
      },
      {
        "tr": "giyindim",
        "en": "I got dressed"
      },
      {
        "tr": "hazırladım",
        "en": "I prepared, I made"
      },
      {
        "tr": "zeytin",
        "en": "olive(s)"
      },
      {
        "tr": "evden çıktım",
        "en": "I left home"
      },
      {
        "tr": "güneşliydi",
        "en": "it was sunny"
      },
      {
        "tr": "otobüs durağına",
        "en": "to the bus stop"
      },
      {
        "tr": "geç",
        "en": "late"
      },
      {
        "tr": "tam dokuzda",
        "en": "at exactly nine"
      }
    ],
    "questions": [
      {
        "q": "What time did the narrator wake up?",
        "options": [
          "Six",
          "Seven",
          "Eight",
          "Nine"
        ],
        "answer": 1,
        "explain": "'Saat yedide uyandım' – I woke up at seven."
      },
      {
        "q": "What did the narrator drink with breakfast?",
        "options": [
          "Coffee",
          "Orange juice",
          "Tea",
          "Milk"
        ],
        "answer": 2,
        "explain": "'Büyük bir bardak çay içtim' – a big glass of tea."
      },
      {
        "q": "What was the weather like?",
        "options": [
          "Cold but sunny",
          "Hot and sunny",
          "Rainy",
          "Snowy"
        ],
        "answer": 0,
        "explain": "'Hava soğuktu ama güneşliydi.'"
      },
      {
        "q": "How did the narrator get to work?",
        "options": [
          "By car",
          "On foot",
          "By metro",
          "By bus"
        ],
        "answer": 3,
        "explain": "The narrator walked to the bus stop and took the bus, which came a little late."
      }
    ]
  },
  {
    "id": "trip-to-cappadocia",
    "kind": "story",
    "level": "A2",
    "title": "A Trip to Cappadocia",
    "titleNative": "Kapadokya Gezisi",
    "summary": "The narrator remembers a weekend trip to Cappadocia with a friend, with a cave room and hot-air balloons.",
    "register": "casual",
    "lines": [
      {
        "tr": "Geçen ay arkadaşımla Kapadokya'ya gittik.",
        "en": "Last month my friend and I went to Cappadocia."
      },
      {
        "tr": "İstanbul'dan gece otobüsüne bindik.",
        "en": "We took the night bus from Istanbul."
      },
      {
        "tr": "Yolculuk on bir saat sürdü ama ben otobüste çoğunlukla uyudum.",
        "en": "The journey took eleven hours, but I slept most of the way."
      },
      {
        "tr": "Sabah Göreme'ye vardık ve küçük bir otele yerleştik.",
        "en": "In the morning we arrived in Göreme and checked into a small hotel."
      },
      {
        "tr": "Odamız bir mağaranın içindeydi!",
        "en": "Our room was inside a cave!"
      },
      {
        "tr": "İlk gün vadilerde uzun bir yürüyüş yaptık.",
        "en": "On the first day we went for a long walk in the valleys."
      },
      {
        "tr": "Ertesi sabah erkenden kalktık, çünkü balonları görmek istiyorduk.",
        "en": "The next morning we got up early because we wanted to see the balloons."
      },
      {
        "tr": "Gökyüzünde yüzlerce renkli balon vardı.",
        "en": "There were hundreds of colourful balloons in the sky."
      },
      {
        "tr": "Biz balona binmedik, çünkü biletler çok pahalıydı.",
        "en": "We didn't go up in a balloon, because the tickets were very expensive."
      },
      {
        "tr": "Ama tepeden izlemek de harikaydı.",
        "en": "But watching from the hill was amazing too."
      },
      {
        "tr": "Akşam yemeğinde testi kebabı yedik.",
        "en": "For dinner we had testi kebab, a stew cooked in a clay pot."
      },
      {
        "tr": "Çok yorulduk ama çok eğlendik.",
        "en": "We got very tired, but we had a lot of fun."
      },
      {
        "tr": "Seneye tekrar gitmek istiyorum.",
        "en": "I want to go again next year."
      }
    ],
    "glossary": [
      {
        "tr": "geçen ay",
        "en": "last month"
      },
      {
        "tr": "gece otobüsüne bindik",
        "en": "we took the night bus"
      },
      {
        "tr": "sürdü",
        "en": "it took, it lasted (time)"
      },
      {
        "tr": "çoğunlukla",
        "en": "mostly"
      },
      {
        "tr": "mağara",
        "en": "cave"
      },
      {
        "tr": "vadilerde",
        "en": "in the valleys"
      },
      {
        "tr": "ertesi sabah",
        "en": "the next morning"
      },
      {
        "tr": "gökyüzünde",
        "en": "in the sky"
      },
      {
        "tr": "tepeden",
        "en": "from the hill"
      },
      {
        "tr": "seneye",
        "en": "next year"
      }
    ],
    "questions": [
      {
        "q": "How did they travel to Cappadocia?",
        "options": [
          "By plane",
          "By night bus",
          "By car",
          "By train"
        ],
        "answer": 1,
        "explain": "'İstanbul'dan gece otobüsüne bindik' – they took the night bus."
      },
      {
        "q": "What was special about their room?",
        "options": [
          "It was inside a cave",
          "It had a swimming pool",
          "It had a sea view",
          "It was a tent"
        ],
        "answer": 0,
        "explain": "'Odamız bir mağaranın içindeydi!' – our room was inside a cave."
      },
      {
        "q": "Why didn't they take a balloon ride?",
        "options": [
          "The weather was bad",
          "They were afraid of heights",
          "They overslept",
          "The tickets were too expensive"
        ],
        "answer": 3,
        "explain": "'Biletler çok pahalıydı' – the tickets were very expensive."
      },
      {
        "q": "What did they eat for dinner?",
        "options": [
          "Fish",
          "Pizza",
          "Testi kebab",
          "Lentil soup"
        ],
        "answer": 2,
        "explain": "'Akşam yemeğinde testi kebabı yedik.'"
      }
    ]
  },
  {
    "id": "the-lost-phone",
    "kind": "story",
    "level": "B1",
    "title": "The Lost Phone",
    "titleNative": "Kayıp Telefon",
    "summary": "The narrator loses their phone on the metro and gets it back thanks to a kind stranger.",
    "register": "casual",
    "lines": [
      {
        "tr": "Geçen salı işten eve dönerken başıma ilginç bir şey geldi.",
        "en": "Last Tuesday, on my way home from work, something unusual happened to me."
      },
      {
        "tr": "Metrodan indiğimde elimi cebime attım ve telefonumun orada olmadığını fark ettim.",
        "en": "When I got off the metro, I put my hand in my pocket and realised my phone wasn't there."
      },
      {
        "tr": "Önce çantama, sonra ceketimin bütün ceplerine baktım ama telefon hiçbir yerde yoktu.",
        "en": "I looked in my bag first, then in all my jacket pockets, but the phone was nowhere to be found."
      },
      {
        "tr": "Çok panikledim, çünkü bütün fotoğraflarım ve önemli numaralarım o telefondaydı.",
        "en": "I really panicked, because all my photos and important numbers were on that phone."
      },
      {
        "tr": "Hemen istasyondaki görevliye gidip durumu anlattım.",
        "en": "I went straight to the attendant at the station and explained what had happened."
      },
      {
        "tr": "Görevli bana sakin olmamı söyledi ve kayıp eşya bürosunu aradı.",
        "en": "The attendant told me to stay calm and called the lost property office."
      },
      {
        "tr": "Maalesef o ana kadar kimse bir telefon teslim etmemişti.",
        "en": "Unfortunately, nobody had handed in a phone up to that point."
      },
      {
        "tr": "Eve gelince bilgisayarımdan telefonumun konumuna baktım.",
        "en": "When I got home, I checked my phone's location on my computer."
      },
      {
        "tr": "Telefon hâlâ metro hattının son durağında görünüyordu.",
        "en": "The phone was still showing at the last stop on the metro line."
      },
      {
        "tr": "Kendi numaramı aradığımda telefonu yaşlı bir amca açtı.",
        "en": "When I called my own number, an elderly man answered."
      },
      {
        "tr": "Telefonu koltuğun altında bulduğunu ve sahibinin aramasını beklediğini söyledi.",
        "en": "He said he had found it under a seat and was waiting for the owner to call."
      },
      {
        "tr": "Ertesi sabah buluştuk ve ona teşekkür etmek için bir kutu baklava götürdüm.",
        "en": "We met the next morning, and I brought him a box of baklava to say thank you."
      },
      {
        "tr": "O günden beri telefonumu hep çantamın fermuarlı iç cebinde taşıyorum.",
        "en": "Since that day, I always keep my phone in the zipped inside pocket of my bag."
      }
    ],
    "glossary": [
      {
        "tr": "başıma ilginç bir şey geldi",
        "en": "something interesting / unusual happened to me"
      },
      {
        "tr": "elimi cebime attım",
        "en": "I put my hand in my pocket"
      },
      {
        "tr": "fark ettim",
        "en": "I realised, I noticed"
      },
      {
        "tr": "hiçbir yerde",
        "en": "nowhere"
      },
      {
        "tr": "görevli",
        "en": "attendant, member of staff"
      },
      {
        "tr": "kayıp eşya bürosu",
        "en": "lost property office"
      },
      {
        "tr": "teslim etmemişti",
        "en": "had not handed in"
      },
      {
        "tr": "konum",
        "en": "location"
      },
      {
        "tr": "amca",
        "en": "older man (lit. 'uncle'; a friendly way to refer to an older man)"
      },
      {
        "tr": "o günden beri",
        "en": "since that day"
      }
    ],
    "questions": [
      {
        "q": "When did the narrator notice the phone was missing?",
        "options": [
          "While having lunch at work",
          "After getting off the metro",
          "When arriving home",
          "The next morning"
        ],
        "answer": 1,
        "explain": "'Metrodan indiğimde ... telefonumun orada olmadığını fark ettim.'"
      },
      {
        "q": "What did the station attendant do?",
        "options": [
          "Called the police",
          "Gave the narrator a new phone",
          "Called the lost property office",
          "Searched the train himself"
        ],
        "answer": 2,
        "explain": "'Kayıp eşya bürosunu aradı' – he called the lost property office."
      },
      {
        "q": "How did the narrator find out where the phone was?",
        "options": [
          "A friend told them",
          "They checked its location on their computer",
          "The attendant saw it on camera",
          "They found it in their bag"
        ],
        "answer": 1,
        "explain": "'Bilgisayarımdan telefonumun konumuna baktım' – they checked the location on their computer."
      },
      {
        "q": "What did the narrator bring the man to thank him?",
        "options": [
          "Flowers",
          "Money",
          "A new phone case",
          "A box of baklava"
        ],
        "answer": 3,
        "explain": "'Bir kutu baklava götürdüm' – I brought a box of baklava."
      }
    ]
  },
  {
    "id": "surprise-birthday",
    "kind": "story",
    "level": "B1",
    "title": "A Surprise Birthday",
    "titleNative": "Sürpriz Doğum Günü",
    "summary": "The narrator and some friends secretly organise a surprise thirtieth birthday party for their best friend.",
    "register": "casual",
    "lines": [
      {
        "tr": "Geçen hafta en yakın arkadaşım Ece'nin otuzuncu doğum günüydü.",
        "en": "Last week was my best friend Ece's thirtieth birthday."
      },
      {
        "tr": "Birkaç arkadaşla ona sürpriz bir parti hazırlamaya karar verdik.",
        "en": "A few friends and I decided to throw her a surprise party."
      },
      {
        "tr": "Ece'nin hiçbir şeyden şüphelenmemesi için doğum gününü unutmuş gibi yaptık.",
        "en": "So that Ece wouldn't suspect anything, we pretended we had forgotten her birthday."
      },
      {
        "tr": "Doğum günü sabahı kimse onu aramadı, o da buna biraz kırıldı.",
        "en": "Nobody called her on the morning of her birthday, and she was a bit hurt by that."
      },
      {
        "tr": "Akşam kız kardeşi, güya yemeğe gitmek için onu evden aldı.",
        "en": "In the evening her sister picked her up, supposedly to go out for dinner."
      },
      {
        "tr": "Biz de bu sırada benim evimde balonları şişirip pastayı hazırladık.",
        "en": "Meanwhile, at my place, we blew up the balloons and got the cake ready."
      },
      {
        "tr": "Yolda kardeşi, ceketini bende unuttuğunu söyledi ve onu benim evime getirdi.",
        "en": "On the way, her sister said she had left her jacket at my place and brought her round to my flat."
      },
      {
        "tr": "Ece içeri girer girmez hepimiz birden “Sürpriz!” diye bağırdık.",
        "en": "As soon as Ece walked in, we all shouted “Surprise!” at once."
      },
      {
        "tr": "Ece önce çok şaşırdı, sonra gülmeye başladı, hatta biraz ağladı.",
        "en": "At first Ece was really surprised, then she started laughing, and she even cried a little."
      },
      {
        "tr": "Ece mumları üfledikten sonra hep birlikte yemek yedik ve geç saatlere kadar dans ettik.",
        "en": "After Ece blew out the candles, we all ate together and danced until late."
      },
      {
        "tr": "Gecenin sonunda Ece, bunun hayatının en güzel doğum günü olduğunu söyledi.",
        "en": "At the end of the night, Ece said it was the best birthday of her life."
      },
      {
        "tr": "Bence sabah biraz kırılmasına değdi.",
        "en": "I think it was worth her feeling a little hurt that morning."
      }
    ],
    "glossary": [
      {
        "tr": "en yakın arkadaşım",
        "en": "my best friend (lit. 'my closest friend')"
      },
      {
        "tr": "karar verdik",
        "en": "we decided"
      },
      {
        "tr": "şüphelenmemesi için",
        "en": "so that she wouldn't suspect"
      },
      {
        "tr": "unutmuş gibi yaptık",
        "en": "we pretended to have forgotten"
      },
      {
        "tr": "kırıldı",
        "en": "she was hurt, upset (emotionally)"
      },
      {
        "tr": "güya",
        "en": "supposedly, as if"
      },
      {
        "tr": "şişirip",
        "en": "blowing up (balloons) and then..."
      },
      {
        "tr": "girer girmez",
        "en": "as soon as (she) came in"
      },
      {
        "tr": "hatta",
        "en": "even"
      },
      {
        "tr": "değdi",
        "en": "it was worth it"
      }
    ],
    "questions": [
      {
        "q": "How old did Ece turn?",
        "options": [
          "Twenty",
          "Twenty-five",
          "Thirty",
          "Forty"
        ],
        "answer": 2,
        "explain": "It was her 'otuzuncu doğum günü' – her thirtieth birthday."
      },
      {
        "q": "Why did nobody call Ece that morning?",
        "options": [
          "They had really forgotten",
          "They were pretending to forget so she wouldn't suspect anything",
          "Her phone was broken",
          "She was travelling"
        ],
        "answer": 1,
        "explain": "'Şüphelenmemesi için doğum gününü unutmuş gibi yaptık' – they pretended to forget so she wouldn't suspect."
      },
      {
        "q": "How did Ece's sister get her to the narrator's flat?",
        "options": [
          "She said she had left her jacket there",
          "She said they were going to the cinema",
          "She said the narrator was ill",
          "She told her about the party"
        ],
        "answer": 0,
        "explain": "'Ceketini bende unuttuğunu söyledi' – she said she had left her jacket at the narrator's place."
      },
      {
        "q": "How did Ece react to the surprise?",
        "options": [
          "She was angry and left",
          "She didn't notice anything",
          "She fell asleep",
          "She was surprised, laughed and even cried a little"
        ],
        "answer": 3,
        "explain": "'Önce çok şaşırdı, sonra gülmeye başladı, hatta biraz ağladı.'"
      }
    ]
  },
  {
    "id": "text-messages-dinner",
    "kind": "everyday",
    "level": "A1",
    "title": "Text Messages: Picking Up Groceries",
    "titleNative": "Mesajlar: Eve Gelirken",
    "summary": "Zeynep texts Ali, who is leaving work, to ask him to pick up a few things on his way home.",
    "register": "casual",
    "lines": [
      {
        "speaker": "Zeynep",
        "tr": "Selam, neredesin?",
        "en": "Hi, where are you?"
      },
      {
        "speaker": "Ali",
        "tr": "Hâlâ işteyim, birazdan çıkıyorum.",
        "en": "Still at work, leaving in a bit."
      },
      {
        "speaker": "Zeynep",
        "tr": "Eve gelirken ekmek alır mısın?",
        "en": "Can you get some bread on your way home?"
      },
      {
        "speaker": "Ali",
        "tr": "Tabii, başka bir şey lazım mı?",
        "en": "Sure, do we need anything else?"
      },
      {
        "speaker": "Zeynep",
        "tr": "Süt de bitti, bir litre süt al.",
        "en": "We're out of milk too, get a litre of milk."
      },
      {
        "speaker": "Ali",
        "tr": "Tamam, yumurta var mı?",
        "en": "OK, do we have eggs?"
      },
      {
        "speaker": "Zeynep",
        "tr": "Var, dün aldım.",
        "en": "Yes, I bought some yesterday."
      },
      {
        "speaker": "Ali",
        "tr": "Akşam ne yiyoruz?",
        "en": "What are we having for dinner?"
      },
      {
        "speaker": "Zeynep",
        "tr": "Makarna yapıyorum, yarım saate hazır olur.",
        "en": "I'm making pasta, it'll be ready in half an hour."
      },
      {
        "speaker": "Ali",
        "tr": "Süper, trafik berbat ama.",
        "en": "Great, the traffic's terrible though."
      },
      {
        "speaker": "Ali",
        "tr": "Yirmi dakikaya oradayım.",
        "en": "I'll be there in twenty minutes."
      },
      {
        "speaker": "Zeynep",
        "tr": "Tamam, dikkatli gel!",
        "en": "OK, get home safe!"
      }
    ],
    "glossary": [
      {
        "tr": "Selam",
        "en": "Hi (casual)"
      },
      {
        "tr": "hâlâ",
        "en": "still"
      },
      {
        "tr": "birazdan",
        "en": "in a bit, soon"
      },
      {
        "tr": "alır mısın",
        "en": "could you get / buy (casual request)"
      },
      {
        "tr": "lazım",
        "en": "needed"
      },
      {
        "tr": "bitti",
        "en": "has run out, is finished"
      },
      {
        "tr": "yarım saate",
        "en": "in half an hour"
      },
      {
        "tr": "berbat",
        "en": "terrible, awful"
      },
      {
        "tr": "oradayım",
        "en": "I'll be there (lit. 'I'm there')"
      },
      {
        "tr": "dikkatli gel",
        "en": "come carefully, get here safe"
      }
    ],
    "questions": [
      {
        "q": "Where is Ali when the messages start?",
        "options": [
          "At home",
          "At the supermarket",
          "Still at work",
          "On the bus"
        ],
        "answer": 2,
        "explain": "'Hâlâ işteyim' – I'm still at work."
      },
      {
        "q": "What does Zeynep ask Ali to buy?",
        "options": [
          "Bread and milk",
          "Eggs and bread",
          "Milk and pasta",
          "Cheese and eggs"
        ],
        "answer": 0,
        "explain": "She asks for 'ekmek' (bread) and then 'bir litre süt' (a litre of milk)."
      },
      {
        "q": "Why doesn't Ali need to buy eggs?",
        "options": [
          "They don't eat eggs",
          "Zeynep bought some yesterday",
          "The shop has none",
          "He forgot about them"
        ],
        "answer": 1,
        "explain": "'Var, dün aldım' – we have some, I bought them yesterday."
      },
      {
        "q": "When will Ali be home?",
        "options": [
          "In five minutes",
          "In half an hour",
          "In an hour",
          "In twenty minutes"
        ],
        "answer": 3,
        "explain": "'Yirmi dakikaya oradayım' – I'll be there in twenty minutes."
      }
    ]
  },
  {
    "id": "signs-and-notices",
    "kind": "everyday",
    "level": "A2",
    "title": "Signs and Notices",
    "titleNative": "Tabelalar ve Duyurular",
    "summary": "A collection of signs and notices you might see around a park, a shop and an apartment building.",
    "register": "polite",
    "lines": [
      {
        "tr": "Lütfen çimlere basmayınız.",
        "en": "Please keep off the grass."
      },
      {
        "tr": "Sigara içmek yasaktır.",
        "en": "Smoking is prohibited."
      },
      {
        "tr": "Asansör arızalıdır, lütfen merdivenleri kullanınız.",
        "en": "The lift is out of order, please use the stairs."
      },
      {
        "tr": "Dikkat, kaygan zemin!",
        "en": "Caution, slippery floor!"
      },
      {
        "tr": "Mağazamız pazar günleri kapalıdır.",
        "en": "Our shop is closed on Sundays."
      },
      {
        "tr": "Hafta içi ve cumartesi günleri sabah dokuzdan akşam altıya kadar açığız.",
        "en": "We are open on weekdays and Saturdays from nine in the morning until six in the evening."
      },
      {
        "tr": "Kapı önüne park etmeyiniz.",
        "en": "Do not park in front of the gate."
      },
      {
        "tr": "Bu alan kamera ile izlenmektedir.",
        "en": "This area is monitored by CCTV."
      },
      {
        "tr": "Tuvaletler alt kattadır.",
        "en": "The toilets are downstairs."
      },
      {
        "tr": "Evcil hayvan giremez.",
        "en": "No pets allowed."
      },
      {
        "tr": "Sayın apartman sakinleri, yarın saat dokuz ile on iki arasında su kesintisi olacaktır.",
        "en": "Dear residents, there will be no water tomorrow between nine and twelve."
      },
      {
        "tr": "Anlayışınız için teşekkür ederiz.",
        "en": "Thank you for your understanding."
      }
    ],
    "glossary": [
      {
        "tr": "basmayınız",
        "en": "do not step on (formal, used on signs)"
      },
      {
        "tr": "yasaktır",
        "en": "is forbidden"
      },
      {
        "tr": "arızalıdır",
        "en": "is out of order, broken"
      },
      {
        "tr": "kaygan zemin",
        "en": "slippery floor"
      },
      {
        "tr": "kapalıdır",
        "en": "is closed"
      },
      {
        "tr": "hafta içi",
        "en": "on weekdays"
      },
      {
        "tr": "park etmeyiniz",
        "en": "do not park (formal)"
      },
      {
        "tr": "izlenmektedir",
        "en": "is being monitored, watched (formal)"
      },
      {
        "tr": "evcil hayvan",
        "en": "pet"
      },
      {
        "tr": "su kesintisi",
        "en": "water cut, water outage"
      }
    ],
    "questions": [
      {
        "q": "Why should you take the stairs?",
        "options": [
          "The lift is out of order",
          "The lift is only for staff",
          "The stairs are faster",
          "The lift is being cleaned"
        ],
        "answer": 0,
        "explain": "'Asansör arızalıdır' – the lift is out of order."
      },
      {
        "q": "On which day is the shop closed?",
        "options": [
          "Monday",
          "Saturday",
          "Sunday",
          "Friday"
        ],
        "answer": 2,
        "explain": "'Mağazamız pazar günleri kapalıdır' – closed on Sundays; it is open on weekdays and Saturdays."
      },
      {
        "q": "What does 'Evcil hayvan giremez' mean?",
        "options": [
          "Pets welcome",
          "No pets allowed",
          "Pets must be on a lead",
          "Pet shop inside"
        ],
        "answer": 1,
        "explain": "Literally 'pets cannot enter'."
      },
      {
        "q": "What will happen tomorrow between nine and twelve?",
        "options": [
          "The lift will be repaired",
          "The shop will open late",
          "The cameras will be turned off",
          "There will be no water"
        ],
        "answer": 3,
        "explain": "'Su kesintisi olacaktır' – there will be a water cut."
      }
    ]
  },
  {
    "id": "cafe-menu",
    "kind": "everyday",
    "level": "A1",
    "title": "A Café Menu",
    "titleNative": "Kafe Menüsü",
    "summary": "A short café menu, followed by a customer ordering a toastie and a tea from the waiter.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Menu",
        "tr": "Mercimek çorbası: 150 lira",
        "en": "Lentil soup: 150 lira"
      },
      {
        "speaker": "Menu",
        "tr": "Peynirli tost: 180 lira",
        "en": "Cheese toastie: 180 lira"
      },
      {
        "speaker": "Menu",
        "tr": "Menemen: 240 lira",
        "en": "Menemen (eggs scrambled with tomatoes and peppers): 240 lira"
      },
      {
        "speaker": "Menu",
        "tr": "Çay: 40 lira",
        "en": "Tea: 40 lira"
      },
      {
        "speaker": "Menu",
        "tr": "Türk kahvesi: 90 lira",
        "en": "Turkish coffee: 90 lira"
      },
      {
        "speaker": "Menu",
        "tr": "Taze portakal suyu: 120 lira",
        "en": "Fresh orange juice: 120 lira"
      },
      {
        "speaker": "Customer",
        "tr": "Merhaba, bir peynirli tost ve bir çay alabilir miyim?",
        "en": "Hello, can I have a cheese toastie and a tea?"
      },
      {
        "speaker": "Waiter",
        "tr": "Tabii, çayınız açık mı olsun, demli mi?",
        "en": "Of course, would you like your tea weak or strong?"
      },
      {
        "speaker": "Customer",
        "tr": "Açık olsun, lütfen.",
        "en": "Weak, please."
      },
      {
        "speaker": "Waiter",
        "tr": "Başka bir arzunuz var mı?",
        "en": "Would you like anything else?"
      },
      {
        "speaker": "Customer",
        "tr": "Şimdilik bu kadar, teşekkürler.",
        "en": "That's all for now, thanks."
      },
      {
        "speaker": "Waiter",
        "tr": "Buyurun, tostunuz ve çayınız, afiyet olsun.",
        "en": "Here you are, your toastie and your tea, enjoy."
      },
      {
        "speaker": "Customer",
        "tr": "Hesabı alabilir miyim?",
        "en": "Could I have the bill, please?"
      },
      {
        "speaker": "Waiter",
        "tr": "Tabii, toplam 220 lira.",
        "en": "Of course, that's 220 lira in total."
      }
    ],
    "glossary": [
      {
        "tr": "mercimek çorbası",
        "en": "lentil soup"
      },
      {
        "tr": "peynirli tost",
        "en": "cheese toastie, toasted cheese sandwich"
      },
      {
        "tr": "menemen",
        "en": "eggs scrambled with tomatoes and green peppers"
      },
      {
        "tr": "taze",
        "en": "fresh"
      },
      {
        "tr": "alabilir miyim",
        "en": "can I have"
      },
      {
        "tr": "açık",
        "en": "weak, light (for tea)"
      },
      {
        "tr": "demli",
        "en": "strong, well-brewed (for tea)"
      },
      {
        "tr": "arzunuz",
        "en": "your wish (polite; 'anything else?')"
      },
      {
        "tr": "afiyet olsun",
        "en": "enjoy your meal"
      },
      {
        "tr": "hesabı",
        "en": "the bill"
      }
    ],
    "questions": [
      {
        "q": "What does the customer order?",
        "options": [
          "Lentil soup and orange juice",
          "A cheese toastie and a tea",
          "Menemen and a Turkish coffee",
          "Just a tea"
        ],
        "answer": 1,
        "explain": "'Bir peynirli tost ve bir çay alabilir miyim?'"
      },
      {
        "q": "How does the customer want the tea?",
        "options": [
          "Strong",
          "With milk",
          "Iced",
          "Weak"
        ],
        "answer": 3,
        "explain": "'Açık olsun' – weak (light) tea; 'demli' would be strong."
      },
      {
        "q": "How much is the bill?",
        "options": [
          "180 lira",
          "200 lira",
          "220 lira",
          "240 lira"
        ],
        "answer": 2,
        "explain": "Toastie 180 + tea 40 = 220 lira."
      },
      {
        "q": "Which item on the menu is the most expensive?",
        "options": [
          "Menemen",
          "Lentil soup",
          "Fresh orange juice",
          "Cheese toastie"
        ],
        "answer": 0,
        "explain": "Menemen costs 240 lira, more than anything else on the menu."
      }
    ]
  },
  {
    "id": "first-day-introduction",
    "kind": "speech",
    "level": "A2",
    "title": "Introducing Myself to New Colleagues",
    "titleNative": "Yeni İş Arkadaşlarıma Kendimi Tanıtıyorum",
    "summary": "On his first day at a new job, Mert introduces himself to his team.",
    "register": "polite",
    "lines": [
      {
        "tr": "Herkese merhaba, ben Mert.",
        "en": "Hello everyone, I'm Mert."
      },
      {
        "tr": "Bugün bu ekipteki ilk günüm, o yüzden biraz heyecanlıyım.",
        "en": "Today is my first day on this team, so I'm a little nervous."
      },
      {
        "tr": "Yirmi sekiz yaşındayım ve aslen Ankaralıyım.",
        "en": "I'm twenty-eight and I'm originally from Ankara."
      },
      {
        "tr": "Üniversitede bilgisayar mühendisliği okudum.",
        "en": "I studied computer engineering at university."
      },
      {
        "tr": "Daha önce üç yıl küçük bir yazılım şirketinde çalıştım.",
        "en": "Before this, I worked for three years at a small software company."
      },
      {
        "tr": "Burada mobil uygulama ekibinde çalışacağım.",
        "en": "Here I'll be working in the mobile app team."
      },
      {
        "tr": "İş dışında doğa yürüyüşü yapmayı ve fotoğraf çekmeyi çok seviyorum.",
        "en": "Outside work, I really love hiking and taking photos."
      },
      {
        "tr": "Hafta sonları genellikle şehir dışına çıkıyorum.",
        "en": "At weekends I usually get out of the city."
      },
      {
        "tr": "Ayrıca kahveye bayılırım, o yüzden beni mutfakta sık sık görebilirsiniz.",
        "en": "I also adore coffee, so you'll probably see me in the kitchen a lot."
      },
      {
        "tr": "İstanbul'a yeni taşındım, bu yüzden şehirle ilgili önerilerinize her zaman açığım.",
        "en": "I've just moved to Istanbul, so I'm always open to your tips about the city."
      },
      {
        "tr": "Sizinle çalışmayı dört gözle bekliyorum.",
        "en": "I'm really looking forward to working with you."
      },
      {
        "tr": "Teşekkür ederim.",
        "en": "Thank you."
      }
    ],
    "glossary": [
      {
        "tr": "ekip",
        "en": "team"
      },
      {
        "tr": "heyecanlıyım",
        "en": "I'm excited / nervous"
      },
      {
        "tr": "aslen",
        "en": "originally"
      },
      {
        "tr": "yazılım şirketinde",
        "en": "at a software company"
      },
      {
        "tr": "iş dışında",
        "en": "outside work"
      },
      {
        "tr": "şehir dışına",
        "en": "out of the city, out of town"
      },
      {
        "tr": "bayılırım",
        "en": "I adore, I love (lit. 'I faint')"
      },
      {
        "tr": "sık sık",
        "en": "often"
      },
      {
        "tr": "önerilerinize",
        "en": "to your recommendations, suggestions"
      },
      {
        "tr": "dört gözle bekliyorum",
        "en": "I'm really looking forward to it (lit. 'waiting with four eyes')"
      }
    ],
    "questions": [
      {
        "q": "Why is Mert a little nervous?",
        "options": [
          "It's his birthday",
          "It's his first day on the team",
          "He's getting married",
          "He's giving a big presentation"
        ],
        "answer": 1,
        "explain": "'Bugün bu ekipteki ilk günüm' – today is my first day on this team."
      },
      {
        "q": "What did he study at university?",
        "options": [
          "Economics",
          "Photography",
          "Computer engineering",
          "Architecture"
        ],
        "answer": 2,
        "explain": "'Bilgisayar mühendisliği okudum.'"
      },
      {
        "q": "Where might his colleagues often see him?",
        "options": [
          "In the kitchen, because he loves coffee",
          "In the gym",
          "In the car park",
          "In the meeting room"
        ],
        "answer": 0,
        "explain": "'Kahveye bayılırım, o yüzden beni mutfakta sık sık görebilirsiniz.'"
      },
      {
        "q": "Why is he open to recommendations?",
        "options": [
          "He is new to the software",
          "He wants to buy a camera",
          "He is planning a holiday",
          "He has just moved to Istanbul"
        ],
        "answer": 3,
        "explain": "'İstanbul'a yeni taşındım' – I've just moved to Istanbul."
      }
    ]
  },
  {
    "id": "wedding-toast",
    "kind": "speech",
    "level": "B1",
    "title": "A Toast at a Friend's Wedding",
    "titleNative": "Arkadaşımın Düğününde Bir Konuşma",
    "summary": "At his best friend's wedding, Kaan gives a short, warm and funny speech about the couple.",
    "register": "mixed",
    "lines": [
      {
        "tr": "Herkese iyi akşamlar, kısaca birkaç söz söylemek istiyorum.",
        "en": "Good evening, everyone, I'd like to say a few quick words."
      },
      {
        "tr": "Ben Kaan, Emre'nin lise yıllarından beri en yakın arkadaşıyım.",
        "en": "I'm Kaan, and I've been Emre's best friend since our high school days."
      },
      {
        "tr": "Emre'yi on beş yıldır tanıyorum ve onu hiç bu kadar mutlu görmedim.",
        "en": "I've known Emre for fifteen years, and I've never seen him this happy."
      },
      {
        "tr": "Duygu'yla tanıştığı gün beni aradı ve “Galiba hayatımın kadınıyla tanıştım” dedi.",
        "en": "The day he met Duygu, he called me and said, “I think I've met the woman of my life.”"
      },
      {
        "tr": "Açıkçası o zaman ona pek inanmadım, çünkü Emre biraz abartmayı sever.",
        "en": "To be honest, I didn't really believe him at the time, because Emre does like to exaggerate a bit."
      },
      {
        "tr": "Ama Duygu'yu tanıdıkça neden bu kadar heyecanlandığını anladım.",
        "en": "But the more I got to know Duygu, the more I understood why he was so excited."
      },
      {
        "tr": "Duygu, sen akıllı, sabırlı ve çok eğlenceli birisin.",
        "en": "Duygu, you're smart, patient and so much fun."
      },
      {
        "tr": "Emre'nin dağınıklığına katlanabilen tek kişi de muhtemelen sensin.",
        "en": "You're probably also the only person who can put up with Emre's messiness."
      },
      {
        "tr": "İkiniz birbirinizi gerçekten çok güzel tamamlıyorsunuz.",
        "en": "The two of you really complete each other beautifully."
      },
      {
        "tr": "Ömür boyu birbirinize bugünkü gibi sevgiyle bakmanızı diliyorum.",
        "en": "I hope you'll always look at each other with as much love as you do today."
      },
      {
        "tr": "Bir yastıkta kocayın!",
        "en": "May you grow old together!"
      },
      {
        "tr": "Haydi, herkes kadehini kaldırsın: Emre ile Duygu'ya!",
        "en": "Come on, everyone, raise your glasses: to Emre and Duygu!"
      }
    ],
    "glossary": [
      {
        "tr": "kısaca",
        "en": "briefly"
      },
      {
        "tr": "lise yıllarından beri",
        "en": "since our high school years"
      },
      {
        "tr": "galiba",
        "en": "I think, probably"
      },
      {
        "tr": "abartmayı sever",
        "en": "likes to exaggerate"
      },
      {
        "tr": "tanıdıkça",
        "en": "the more (I) got to know"
      },
      {
        "tr": "katlanabilen",
        "en": "who can put up with"
      },
      {
        "tr": "tamamlıyorsunuz",
        "en": "you complete (each other)"
      },
      {
        "tr": "ömür boyu",
        "en": "for a lifetime, all your lives"
      },
      {
        "tr": "Bir yastıkta kocayın!",
        "en": "May you grow old together! (traditional wedding wish; lit. 'grow old on one pillow')"
      },
      {
        "tr": "kadehini kaldırsın",
        "en": "raise (his/her) glass"
      }
    ],
    "questions": [
      {
        "q": "How long has Kaan known Emre?",
        "options": [
          "About five years",
          "Since university, about ten years",
          "Fifteen years, since high school",
          "Since childhood, thirty years"
        ],
        "answer": 2,
        "explain": "'On beş yıldır tanıyorum' and 'lise yıllarından beri' – fifteen years, since high school."
      },
      {
        "q": "Why didn't Kaan believe Emre at first?",
        "options": [
          "Emre likes to exaggerate a little",
          "Emre had never had a girlfriend",
          "Duygu lived in another country",
          "Emre was obviously joking"
        ],
        "answer": 0,
        "explain": "'Emre biraz abartmayı sever' – Emre likes to exaggerate a bit."
      },
      {
        "q": "What does Kaan joke about?",
        "options": [
          "Emre's cooking",
          "Emre's messiness",
          "Emre always being late",
          "Emre's singing"
        ],
        "answer": 1,
        "explain": "He says Duygu is probably the only one who can put up with Emre's 'dağınıklık' (messiness)."
      },
      {
        "q": "What does 'Bir yastıkta kocayın!' wish the couple?",
        "options": [
          "A good night's sleep",
          "A happy honeymoon",
          "Lots of children",
          "To grow old together"
        ],
        "answer": 3,
        "explain": "It is a traditional wedding wish: grow old together (on one pillow). Kaan addresses the guests as a group but uses casual 'sen' when he speaks to Duygu."
      }
    ]
  },
  {
    "id": "my-city-izmir",
    "kind": "speech",
    "level": "B1",
    "title": "Presenting My City: Izmir",
    "titleNative": "Şehrimi Tanıtıyorum: İzmir",
    "summary": "In a short presentation, the speaker introduces their home city of Izmir, its people, food and places to visit.",
    "register": "polite",
    "lines": [
      {
        "tr": "Bugün size doğup büyüdüğüm şehir İzmir'den bahsetmek istiyorum.",
        "en": "Today I'd like to tell you about Izmir, the city where I was born and grew up."
      },
      {
        "tr": "İzmir, Türkiye'nin batısında, Ege Denizi kıyısında büyük bir liman şehridir.",
        "en": "Izmir is a large port city in the west of Turkey, on the Aegean coast."
      },
      {
        "tr": "Nüfusu dört milyonun üzerindedir ve Türkiye'nin üçüncü büyük şehridir.",
        "en": "It has a population of over four million and is Turkey's third-largest city."
      },
      {
        "tr": "Bence İzmir'i özel kılan en önemli şey, insanlarının rahat ve sıcakkanlı olmasıdır.",
        "en": "In my opinion, what makes Izmir really special is that its people are relaxed and warm."
      },
      {
        "tr": "Şehrin sembolü olan Saat Kulesi, Konak Meydanı'nda bulunur.",
        "en": "The Clock Tower, the symbol of the city, stands in Konak Square."
      },
      {
        "tr": "Akşamüstü Kordon'da deniz kenarında yürümek, İzmirlilerin en sevdiği alışkanlıklardan biridir.",
        "en": "Walking by the sea along the Kordon in the early evening is one of the favourite habits of people from Izmir."
      },
      {
        "tr": "Yemek konusunda da İzmir'in kendine has lezzetleri vardır.",
        "en": "When it comes to food, Izmir also has its own special flavours."
      },
      {
        "tr": "Mesela sabahları boyoz ve haşlanmış yumurta yemek burada bir gelenektir.",
        "en": "For example, eating boyoz pastries with a boiled egg in the morning is a local tradition."
      },
      {
        "tr": "Ayrıca Ege mutfağında zeytinyağlı yemekler ve otlar çok önemli bir yer tutar.",
        "en": "Dishes cooked in olive oil and wild greens also play a big part in Aegean cuisine."
      },
      {
        "tr": "İzmir'e gelirseniz, şehre yaklaşık bir saat uzaklıktaki Efes Antik Kenti'ni mutlaka görün.",
        "en": "If you come to Izmir, make sure you see the ancient city of Ephesus, about an hour away."
      },
      {
        "tr": "Yaz aylarında ise Çeşme'nin masmavi denizi ve plajları sizi bekliyor.",
        "en": "And in the summer months, the bright blue sea and beaches of Çeşme are waiting for you."
      },
      {
        "tr": "Kısacası İzmir, hem tarihiyle hem de doğasıyla görülmeye değer bir şehirdir.",
        "en": "In short, Izmir is a city worth seeing for both its history and its nature."
      },
      {
        "tr": "Dinlediğiniz için teşekkür ederim, sorularınız varsa memnuniyetle cevaplarım.",
        "en": "Thank you for listening, and if you have any questions, I'll be happy to answer them."
      }
    ],
    "glossary": [
      {
        "tr": "doğup büyüdüğüm",
        "en": "where I was born and grew up"
      },
      {
        "tr": "bahsetmek",
        "en": "to talk about, to mention"
      },
      {
        "tr": "kıyısında",
        "en": "on the coast / shore of"
      },
      {
        "tr": "liman şehri",
        "en": "port city"
      },
      {
        "tr": "nüfusu",
        "en": "its population"
      },
      {
        "tr": "sıcakkanlı",
        "en": "warm, friendly (lit. 'warm-blooded')"
      },
      {
        "tr": "alışkanlıklardan biri",
        "en": "one of the habits"
      },
      {
        "tr": "kendine has",
        "en": "its own, unique"
      },
      {
        "tr": "gelenek",
        "en": "tradition"
      },
      {
        "tr": "görülmeye değer",
        "en": "worth seeing"
      }
    ],
    "questions": [
      {
        "q": "Where is Izmir?",
        "options": [
          "On the Black Sea in the north",
          "On the Aegean coast in the west",
          "In central Anatolia",
          "On the Mediterranean in the south-east"
        ],
        "answer": 1,
        "explain": "'Türkiye'nin batısında, Ege Denizi kıyısında' – in the west of Turkey, on the Aegean coast."
      },
      {
        "q": "What is the symbol of the city?",
        "options": [
          "The Clock Tower",
          "A castle",
          "A bridge",
          "The harbour"
        ],
        "answer": 0,
        "explain": "'Şehrin sembolü olan Saat Kulesi' – the Clock Tower in Konak Square."
      },
      {
        "q": "What is a traditional Izmir breakfast, according to the speaker?",
        "options": [
          "Menemen and tea",
          "Simit and cheese",
          "Boyoz and a boiled egg",
          "Pancakes with honey"
        ],
        "answer": 2,
        "explain": "'Sabahları boyoz ve haşlanmış yumurta yemek burada bir gelenektir.'"
      },
      {
        "q": "How far is Ephesus from Izmir?",
        "options": [
          "About ten minutes",
          "About five hours",
          "It's in the city centre",
          "About an hour"
        ],
        "answer": 3,
        "explain": "'Şehre yaklaşık bir saat uzaklıktaki Efes Antik Kenti' – about an hour away."
      }
    ]
  }
];
