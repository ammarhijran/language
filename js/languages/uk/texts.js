// Read & Listen: graded dialogues, stories, everyday texts and short speeches.
// Each text: { id, kind, level, title, titleNative, summary, dialect?, register?,
//   lines: [{ speaker?, tr, en }], glossary: [{ tr, en }],
//   questions: [{ q, options[4], answer, explain }] }.
// Written and proofread with AI assistance; not yet reviewed by native speakers. Edit freely.
// Loaded on demand (not at startup).
export const texts = [
  {
    "id": "uk-new-neighbour",
    "kind": "dialogue",
    "level": "A1",
    "title": "The New Neighbour",
    "titleNative": "Новий сусід",
    "summary": "Dmytro, who has just moved in, meets his older neighbour on the landing and they get acquainted politely.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Neighbour",
        "tr": "Добрий день, ви наш новий сусід?",
        "en": "Good afternoon, are you our new neighbour?"
      },
      {
        "speaker": "Dmytro",
        "tr": "Добрий день, так, я щойно переїхав у дванадцяту квартиру.",
        "en": "Good afternoon, yes, I've just moved into flat twelve."
      },
      {
        "speaker": "Neighbour",
        "tr": "Дуже приємно, мене звати Галина Петрівна.",
        "en": "Very nice to meet you, my name is Halyna Petrivna."
      },
      {
        "speaker": "Dmytro",
        "tr": "А я Дмитро, радий познайомитися.",
        "en": "And I'm Dmytro, pleased to meet you."
      },
      {
        "speaker": "Neighbour",
        "tr": "Я живу поруч, у чотирнадцятій квартирі.",
        "en": "I live next door, in flat fourteen."
      },
      {
        "speaker": "Dmytro",
        "tr": "Скажіть, будь ласка, де тут найближчий продуктовий магазин?",
        "en": "Could you tell me, please, where the nearest grocery shop is?"
      },
      {
        "speaker": "Neighbour",
        "tr": "Зовсім близько, за рогом, біля аптеки.",
        "en": "Very close, around the corner, next to the pharmacy."
      },
      {
        "speaker": "Dmytro",
        "tr": "Дякую, а ви давно тут живете?",
        "en": "Thank you, and have you lived here long?"
      },
      {
        "speaker": "Neighbour",
        "tr": "Так, уже майже двадцять років.",
        "en": "Yes, almost twenty years now."
      },
      {
        "speaker": "Neighbour",
        "tr": "Якщо щось буде потрібно, стукайте, не соромтеся.",
        "en": "If you ever need anything, just knock, don't be shy."
      },
      {
        "speaker": "Dmytro",
        "tr": "Щиро дякую, ви дуже добрі.",
        "en": "Thank you so much, you're very kind."
      },
      {
        "speaker": "Neighbour",
        "tr": "Будь ласка, гарного вам дня!",
        "en": "You're welcome, have a nice day!"
      },
      {
        "speaker": "Dmytro",
        "tr": "Навзаєм, до побачення!",
        "en": "You too, goodbye!"
      }
    ],
    "glossary": [
      {
        "tr": "сусід",
        "en": "neighbour (male)"
      },
      {
        "tr": "щойно переїхав",
        "en": "have just moved (in)"
      },
      {
        "tr": "квартиру",
        "en": "flat, apartment"
      },
      {
        "tr": "радий познайомитися",
        "en": "pleased to meet you (said by a man)"
      },
      {
        "tr": "поруч",
        "en": "next door, nearby"
      },
      {
        "tr": "найближчий",
        "en": "the nearest"
      },
      {
        "tr": "за рогом",
        "en": "around the corner"
      },
      {
        "tr": "стукайте",
        "en": "knock (polite imperative)"
      },
      {
        "tr": "не соромтеся",
        "en": "don't be shy (polite)"
      },
      {
        "tr": "Навзаєм",
        "en": "likewise, you too"
      }
    ],
    "questions": [
      {
        "q": "Which flat has Dmytro just moved into?",
        "options": [
          "Flat 4",
          "Flat 12",
          "Flat 14",
          "Flat 20"
        ],
        "answer": 1,
        "explain": "He says «я щойно переїхав у дванадцяту квартиру» – flat twelve."
      },
      {
        "q": "How long has the neighbour lived in the building?",
        "options": [
          "Almost two years",
          "About five years",
          "Twelve years",
          "Almost twenty years"
        ],
        "answer": 3,
        "explain": "She says «уже майже двадцять років» – almost twenty years."
      },
      {
        "q": "Where is the nearest grocery shop?",
        "options": [
          "Around the corner, next to the pharmacy",
          "Inside the building",
          "On the other side of the park",
          "Next to the station"
        ],
        "answer": 0,
        "explain": "«За рогом, біля аптеки» means around the corner, next to the pharmacy."
      },
      {
        "q": "How do Dmytro and his neighbour address each other?",
        "options": [
          "With the informal ти",
          "With the polite ви",
          "Only with nicknames",
          "They don't introduce themselves"
        ],
        "answer": 1,
        "explain": "They have just met, so they use ви and polite forms like «Скажіть, будь ласка» and «стукайте»."
      }
    ]
  },
  {
    "id": "uk-coffee-for-two",
    "kind": "dialogue",
    "level": "A1",
    "title": "Coffee for Two",
    "titleNative": "Кава на двох",
    "summary": "Two friends order drinks and dessert in a café, chatting casually with each other and politely with the waiter.",
    "register": "mixed",
    "lines": [
      {
        "speaker": "Waiter",
        "tr": "Добрий день, що будете замовляти?",
        "en": "Good afternoon, what would you like to order?"
      },
      {
        "speaker": "Marta",
        "tr": "Андрію, ти що будеш?",
        "en": "Andriy, what are you having?"
      },
      {
        "speaker": "Andriy",
        "tr": "Мені капучино та круасан, будь ласка.",
        "en": "A cappuccino and a croissant for me, please."
      },
      {
        "speaker": "Marta",
        "tr": "А мені великий чорний чай із лимоном.",
        "en": "And a large black tea with lemon for me."
      },
      {
        "speaker": "Waiter",
        "tr": "Бажаєте щось на десерт?",
        "en": "Would you like anything for dessert?"
      },
      {
        "speaker": "Andriy",
        "tr": "Марто, візьми яблучний пиріг, він тут дуже смачний!",
        "en": "Marta, get the apple pie, it's really good here!"
      },
      {
        "speaker": "Marta",
        "tr": "Ну добре, тоді ще яблучний пиріг, будь ласка.",
        "en": "Oh, all right, one apple pie as well, please."
      },
      {
        "speaker": "Waiter",
        "tr": "Чудово, ваше замовлення буде готове за п’ять хвилин.",
        "en": "Great, your order will be ready in five minutes."
      },
      {
        "speaker": "Andriy",
        "tr": "Слухай, сьогодні я пригощаю.",
        "en": "Listen, today it's my treat."
      },
      {
        "speaker": "Marta",
        "tr": "Дякую, тоді наступного разу плачу я!",
        "en": "Thanks, then next time I'm paying!"
      },
      {
        "speaker": "Waiter",
        "tr": "Ось ваше замовлення, смачного!",
        "en": "Here's your order, enjoy!"
      },
      {
        "speaker": "Marta",
        "tr": "Дякуємо, пахне дуже смачно!",
        "en": "Thank you, it smells delicious!"
      }
    ],
    "glossary": [
      {
        "tr": "що будете замовляти?",
        "en": "what would you like to order? (polite)"
      },
      {
        "tr": "ти що будеш?",
        "en": "what are you having? (casual)"
      },
      {
        "tr": "із лимоном",
        "en": "with lemon"
      },
      {
        "tr": "Бажаєте",
        "en": "would you like (polite)"
      },
      {
        "tr": "на десерт",
        "en": "for dessert"
      },
      {
        "tr": "яблучний пиріг",
        "en": "apple pie"
      },
      {
        "tr": "замовлення",
        "en": "order"
      },
      {
        "tr": "я пригощаю",
        "en": "it's my treat"
      },
      {
        "tr": "наступного разу",
        "en": "next time"
      },
      {
        "tr": "смачного",
        "en": "enjoy your meal"
      }
    ],
    "questions": [
      {
        "q": "What does Andriy order?",
        "options": [
          "Black tea with lemon",
          "A cappuccino and a croissant",
          "Only an apple pie",
          "A large coffee"
        ],
        "answer": 1,
        "explain": "Andriy says «Мені капучино та круасан»."
      },
      {
        "q": "Who suggests the apple pie?",
        "options": [
          "The waiter",
          "Marta",
          "Andriy",
          "Nobody"
        ],
        "answer": 2,
        "explain": "Andriy tells Marta «візьми яблучний пиріг»."
      },
      {
        "q": "Who is paying today?",
        "options": [
          "Andriy",
          "Marta",
          "They split the bill",
          "The café"
        ],
        "answer": 0,
        "explain": "Andriy says «сьогодні я пригощаю» – it's his treat."
      },
      {
        "q": "How do the friends speak to each other compared with the waiter?",
        "options": [
          "Everyone uses ви",
          "The waiter uses ти with them",
          "The friends use ти; the waiter uses ви",
          "Everyone uses ти"
        ],
        "answer": 2,
        "explain": "The friends say «ти що будеш?» and «візьми», while the waiter says «будете» and «Бажаєте»."
      }
    ]
  },
  {
    "id": "uk-way-to-the-station",
    "kind": "dialogue",
    "level": "A1",
    "title": "The Way to the Station",
    "titleNative": "Як пройти до вокзалу?",
    "summary": "A tourist politely asks a passer-by how to get to the train station.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Tourist",
        "tr": "Перепрошую, ви не підкажете, як пройти до вокзалу?",
        "en": "Excuse me, could you tell me how to get to the train station?"
      },
      {
        "speaker": "Passer-by",
        "tr": "Звичайно, це недалеко.",
        "en": "Of course, it's not far."
      },
      {
        "speaker": "Passer-by",
        "tr": "Ідіть прямо до світлофора, а там поверніть ліворуч.",
        "en": "Go straight on to the traffic lights and turn left there."
      },
      {
        "speaker": "Tourist",
        "tr": "Ліворуч, а потім куди?",
        "en": "Left, and then where?"
      },
      {
        "speaker": "Passer-by",
        "tr": "Потім ідіть через парк, і вокзал буде праворуч.",
        "en": "Then go through the park, and the station will be on your right."
      },
      {
        "speaker": "Passer-by",
        "tr": "Ви його одразу побачите.",
        "en": "You'll see it straight away."
      },
      {
        "speaker": "Tourist",
        "tr": "А пішки це далеко?",
        "en": "And is it far on foot?"
      },
      {
        "speaker": "Passer-by",
        "tr": "Ні, хвилин десять.",
        "en": "No, about ten minutes."
      },
      {
        "speaker": "Passer-by",
        "tr": "Або можете поїхати п’ятим автобусом.",
        "en": "Or you can take the number five bus."
      },
      {
        "speaker": "Tourist",
        "tr": "Дякую, я краще пройдуся пішки.",
        "en": "Thank you, I'd rather walk."
      },
      {
        "speaker": "Passer-by",
        "tr": "Будь ласка, щасливої дороги!",
        "en": "You're welcome, have a good journey!"
      }
    ],
    "glossary": [
      {
        "tr": "Перепрошую",
        "en": "excuse me"
      },
      {
        "tr": "ви не підкажете",
        "en": "could you tell me (polite)"
      },
      {
        "tr": "як пройти",
        "en": "how to get to (on foot)"
      },
      {
        "tr": "вокзалу",
        "en": "train station"
      },
      {
        "tr": "світлофора",
        "en": "traffic lights"
      },
      {
        "tr": "поверніть ліворуч",
        "en": "turn left (polite)"
      },
      {
        "tr": "праворуч",
        "en": "on the right"
      },
      {
        "tr": "пішки",
        "en": "on foot"
      },
      {
        "tr": "щасливої дороги",
        "en": "have a good journey"
      }
    ],
    "questions": [
      {
        "q": "Where does the tourist want to go?",
        "options": [
          "To the bank",
          "To the train station",
          "To the park",
          "To the bus stop"
        ],
        "answer": 1,
        "explain": "He asks «як пройти до вокзалу?» – the train station."
      },
      {
        "q": "Where should he turn left?",
        "options": [
          "At the traffic lights",
          "At the station",
          "In the park",
          "At the bus stop"
        ],
        "answer": 0,
        "explain": "«Ідіть прямо до світлофора, а там поверніть ліворуч.»"
      },
      {
        "q": "How long does it take on foot?",
        "options": [
          "About five minutes",
          "About an hour",
          "About ten minutes",
          "Half an hour"
        ],
        "answer": 2,
        "explain": "«Хвилин десять» means about ten minutes."
      },
      {
        "q": "What does the tourist decide to do?",
        "options": [
          "Take a taxi",
          "Take the number five bus",
          "Ask someone else",
          "Walk"
        ],
        "answer": 3,
        "explain": "He says «я краще пройдуся пішки» – he'd rather walk."
      }
    ]
  },
  {
    "id": "uk-returning-a-jumper",
    "kind": "dialogue",
    "level": "A2",
    "title": "Returning a Jumper",
    "titleNative": "Повернення светра",
    "summary": "A customer brings back a jumper that is too big and exchanges it for a smaller size.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Shop assistant",
        "tr": "Добрий день, чим можу вам допомогти?",
        "en": "Good afternoon, how can I help you?"
      },
      {
        "speaker": "Customer",
        "tr": "Добрий день, я хотіла б повернути цей светр.",
        "en": "Good afternoon, I'd like to return this jumper."
      },
      {
        "speaker": "Shop assistant",
        "tr": "Скажіть, будь ласка, що з ним не так?",
        "en": "Could you tell me what's wrong with it?"
      },
      {
        "speaker": "Customer",
        "tr": "Він мені завеликий, а меншого розміру тоді не було.",
        "en": "It's too big for me, and there wasn't a smaller size at the time."
      },
      {
        "speaker": "Shop assistant",
        "tr": "У вас є чек?",
        "en": "Do you have the receipt?"
      },
      {
        "speaker": "Customer",
        "tr": "Так, ось чек, я купила светр у суботу.",
        "en": "Yes, here's the receipt; I bought the jumper on Saturday."
      },
      {
        "speaker": "Shop assistant",
        "tr": "Ми можемо обміняти його на інший розмір або повернути вам гроші.",
        "en": "We can exchange it for a different size or give you a refund."
      },
      {
        "speaker": "Customer",
        "tr": "А менший розмір уже є?",
        "en": "And do you have the smaller size now?"
      },
      {
        "speaker": "Shop assistant",
        "tr": "Так, сьогодні саме привезли нові светри.",
        "en": "Yes, new jumpers arrived just today."
      },
      {
        "speaker": "Shop assistant",
        "tr": "Ось, будь ласка, примірочна праворуч.",
        "en": "Here you are; the fitting room is on the right."
      },
      {
        "speaker": "Customer",
        "tr": "Цей мені якраз, я його обміняю.",
        "en": "This one fits me perfectly; I'll exchange it."
      },
      {
        "speaker": "Shop assistant",
        "tr": "Чудово, ціна однакова, тож доплачувати нічого не треба.",
        "en": "Great, the price is the same, so there's nothing extra to pay."
      },
      {
        "speaker": "Customer",
        "tr": "Дякую вам за допомогу!",
        "en": "Thank you for your help!"
      },
      {
        "speaker": "Shop assistant",
        "tr": "Будь ласка, приходьте до нас ще!",
        "en": "You're welcome, come and see us again!"
      }
    ],
    "glossary": [
      {
        "tr": "повернути",
        "en": "to return (an item)"
      },
      {
        "tr": "завеликий",
        "en": "too big"
      },
      {
        "tr": "розміру",
        "en": "size"
      },
      {
        "tr": "чек",
        "en": "receipt"
      },
      {
        "tr": "обміняти",
        "en": "to exchange"
      },
      {
        "tr": "повернути вам гроші",
        "en": "to give you a refund"
      },
      {
        "tr": "примірочна",
        "en": "fitting room"
      },
      {
        "tr": "якраз",
        "en": "just right, a perfect fit"
      },
      {
        "tr": "доплачувати",
        "en": "to pay extra"
      },
      {
        "tr": "приходьте до нас ще",
        "en": "come and see us again"
      }
    ],
    "questions": [
      {
        "q": "Why does the customer want to return the jumper?",
        "options": [
          "It's too small",
          "It's too big",
          "It's the wrong colour",
          "It's damaged"
        ],
        "answer": 1,
        "explain": "She says «Він мені завеликий» – it's too big for her."
      },
      {
        "q": "When did she buy the jumper?",
        "options": [
          "Yesterday",
          "On Sunday",
          "On Saturday",
          "A month ago"
        ],
        "answer": 2,
        "explain": "«Я купила светр у суботу» – on Saturday."
      },
      {
        "q": "What does she decide to do in the end?",
        "options": [
          "Exchange it for a smaller size",
          "Get her money back",
          "Keep the big one",
          "Buy two jumpers"
        ],
        "answer": 0,
        "explain": "The smaller one fits, so she says «я його обміняю»."
      },
      {
        "q": "Does she have to pay extra?",
        "options": [
          "Yes, a little",
          "Yes, double the price",
          "Only for delivery",
          "No, the price is the same"
        ],
        "answer": 3,
        "explain": "«Ціна однакова, тож доплачувати нічого не треба.»"
      }
    ]
  },
  {
    "id": "uk-weekend-plans",
    "kind": "dialogue",
    "level": "A2",
    "title": "Weekend Plans",
    "titleNative": "Плани на вихідні",
    "summary": "Two friends make casual plans for the weekend and agree on a bike ride in the park.",
    "register": "casual",
    "lines": [
      {
        "speaker": "Taras",
        "tr": "Привіт, Олю, що робиш на вихідних?",
        "en": "Hi, Olya, what are you up to at the weekend?"
      },
      {
        "speaker": "Olya",
        "tr": "Привіт, ще не знаю, а що?",
        "en": "Hi, I don't know yet, why?"
      },
      {
        "speaker": "Taras",
        "tr": "Може, сходимо в суботу в кіно?",
        "en": "Shall we go to the cinema on Saturday?"
      },
      {
        "speaker": "Olya",
        "tr": "У суботу не можу, бо їду до бабусі, а от у неділю я вільна.",
        "en": "I can't on Saturday because I'm going to my gran's, but on Sunday I'm free."
      },
      {
        "speaker": "Taras",
        "tr": "Супер, тоді давай у неділю!",
        "en": "Great, let's do Sunday then!"
      },
      {
        "speaker": "Taras",
        "tr": "Вийшов новий фільм про космос, кажуть, дуже класний.",
        "en": "There's a new film about space out, and people say it's really good."
      },
      {
        "speaker": "Olya",
        "tr": "Ой, я не дуже люблю фантастику.",
        "en": "Oh, I'm not really into sci-fi."
      },
      {
        "speaker": "Olya",
        "tr": "Може, краще покатаємося на велосипедах у парку, якщо буде сонячно?",
        "en": "Why don't we go cycling in the park instead, if it's sunny?"
      },
      {
        "speaker": "Taras",
        "tr": "Давай, а потім можна зайти на піцу.",
        "en": "Sure, and afterwards we could grab a pizza."
      },
      {
        "speaker": "Olya",
        "tr": "Домовились, о котрій зустрічаємось?",
        "en": "Deal, what time shall we meet?"
      },
      {
        "speaker": "Taras",
        "tr": "Давай об одинадцятій біля входу в парк.",
        "en": "Let's say eleven at the park entrance."
      },
      {
        "speaker": "Olya",
        "tr": "Добре, до неділі!",
        "en": "OK, see you on Sunday!"
      }
    ],
    "glossary": [
      {
        "tr": "на вихідних",
        "en": "at the weekend"
      },
      {
        "tr": "а що?",
        "en": "why (do you ask)?"
      },
      {
        "tr": "сходимо",
        "en": "shall we go (there and back)"
      },
      {
        "tr": "їду до бабусі",
        "en": "I'm going to my grandma's"
      },
      {
        "tr": "вільна",
        "en": "free (said by a woman)"
      },
      {
        "tr": "фантастику",
        "en": "science fiction"
      },
      {
        "tr": "покатаємося на велосипедах",
        "en": "let's go for a bike ride"
      },
      {
        "tr": "зайти на піцу",
        "en": "drop in for a pizza"
      },
      {
        "tr": "Домовились",
        "en": "deal, agreed"
      },
      {
        "tr": "о котрій",
        "en": "at what time"
      }
    ],
    "questions": [
      {
        "q": "Why can't Olya go out on Saturday?",
        "options": [
          "She has to work",
          "She's visiting her grandma",
          "She's ill",
          "She's busy with friends"
        ],
        "answer": 1,
        "explain": "She says «їду до бабусі» – she's going to her grandma's."
      },
      {
        "q": "What does Olya suggest instead of the film?",
        "options": [
          "A concert",
          "Going shopping",
          "Cycling in the park",
          "Staying at home"
        ],
        "answer": 2,
        "explain": "Olya says «Може, краще покатаємося на велосипедах у парку, якщо буде сонячно?»"
      },
      {
        "q": "What could they do after the park?",
        "options": [
          "Go for a pizza",
          "Watch the space film",
          "Visit Olya's grandma",
          "Go swimming"
        ],
        "answer": 0,
        "explain": "Taras says «потім можна зайти на піцу»."
      },
      {
        "q": "When and where will they meet?",
        "options": [
          "At ten at the cinema",
          "At one at Olya's house",
          "At eleven at the pizzeria",
          "At eleven at the park entrance"
        ],
        "answer": 3,
        "explain": "«Об одинадцятій біля входу в парк» – at eleven by the park entrance."
      }
    ]
  },
  {
    "id": "uk-at-the-pharmacy",
    "kind": "dialogue",
    "level": "A2",
    "title": "At the Pharmacy",
    "titleNative": "В аптеці",
    "summary": "A customer with a runny nose and a sore throat asks a pharmacist for advice and pays.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Pharmacist",
        "tr": "Добрий день, що вам підказати?",
        "en": "Good afternoon, how can I help you?"
      },
      {
        "speaker": "Customer",
        "tr": "Добрий день, у мене нежить і болить горло.",
        "en": "Good afternoon, I have a runny nose and a sore throat."
      },
      {
        "speaker": "Pharmacist",
        "tr": "У вас є температура?",
        "en": "Do you have a temperature?"
      },
      {
        "speaker": "Customer",
        "tr": "Ні, температури немає, але зранку трохи кашляю.",
        "en": "No, no temperature, but I cough a little in the mornings."
      },
      {
        "speaker": "Pharmacist",
        "tr": "Тоді раджу вам ось ці льодяники для горла.",
        "en": "Then I recommend these throat lozenges."
      },
      {
        "speaker": "Pharmacist",
        "tr": "Розсмоктуйте один льодяник кожні три години, але не більше шести на день.",
        "en": "Let one dissolve in your mouth every three hours, but no more than six a day."
      },
      {
        "speaker": "Customer",
        "tr": "А можна ще щось від нежитю?",
        "en": "And could I have something for my runny nose too?"
      },
      {
        "speaker": "Pharmacist",
        "tr": "Ось спрей для носа, його можна використовувати тричі на день.",
        "en": "Here's a nasal spray; you can use it three times a day."
      },
      {
        "speaker": "Customer",
        "tr": "Скільки з мене?",
        "en": "How much do I owe you?"
      },
      {
        "speaker": "Pharmacist",
        "tr": "Разом двісті сорок гривень.",
        "en": "That's two hundred and forty hryvnias altogether."
      },
      {
        "speaker": "Customer",
        "tr": "Можна оплатити карткою?",
        "en": "Can I pay by card?"
      },
      {
        "speaker": "Pharmacist",
        "tr": "Так, звичайно, ось термінал.",
        "en": "Yes, of course, here's the card reader."
      },
      {
        "speaker": "Pharmacist",
        "tr": "Одужуйте!",
        "en": "Get well soon!"
      },
      {
        "speaker": "Customer",
        "tr": "Дякую, до побачення!",
        "en": "Thank you, goodbye!"
      }
    ],
    "glossary": [
      {
        "tr": "нежить",
        "en": "runny nose"
      },
      {
        "tr": "болить горло",
        "en": "(my) throat hurts"
      },
      {
        "tr": "температура",
        "en": "a temperature, fever"
      },
      {
        "tr": "кашляю",
        "en": "I cough"
      },
      {
        "tr": "раджу",
        "en": "I recommend, I advise"
      },
      {
        "tr": "льодяники",
        "en": "lozenges"
      },
      {
        "tr": "Розсмоктуйте",
        "en": "let it dissolve in your mouth (polite)"
      },
      {
        "tr": "від нежитю",
        "en": "for a runny nose"
      },
      {
        "tr": "Скільки з мене?",
        "en": "How much do I owe?"
      },
      {
        "tr": "Одужуйте!",
        "en": "Get well soon! (polite)"
      }
    ],
    "questions": [
      {
        "q": "What symptoms does the customer have?",
        "options": [
          "A headache and a fever",
          "A runny nose and a sore throat",
          "A stomach ache",
          "A toothache"
        ],
        "answer": 1,
        "explain": "«У мене нежить і болить горло.»"
      },
      {
        "q": "How often can the customer take a lozenge?",
        "options": [
          "Every three hours",
          "Once a day",
          "Every hour",
          "Only at night"
        ],
        "answer": 0,
        "explain": "«Кожні три години, але не більше шести на день.»"
      },
      {
        "q": "How much does the customer pay?",
        "options": [
          "140 hryvnias",
          "204 hryvnias",
          "240 hryvnias",
          "420 hryvnias"
        ],
        "answer": 2,
        "explain": "«Разом двісті сорок гривень» – 240 hryvnias."
      },
      {
        "q": "How does the customer pay?",
        "options": [
          "In cash",
          "He doesn't pay",
          "By card",
          "By bank transfer"
        ],
        "answer": 2,
        "explain": "He asks «Можна оплатити карткою?» and the pharmacist offers the card reader."
      }
    ]
  },
  {
    "id": "uk-my-morning",
    "kind": "story",
    "level": "A1",
    "title": "My Morning",
    "titleNative": "Мій ранок",
    "summary": "A woman describes an ordinary morning, from waking up to arriving at work.",
    "register": "casual",
    "lines": [
      {
        "tr": "Учора я прокинулася о сьомій годині.",
        "en": "Yesterday I woke up at seven o'clock."
      },
      {
        "tr": "Спочатку я вмилася, а потім почистила зуби.",
        "en": "First I washed my face, and then I brushed my teeth."
      },
      {
        "tr": "Після цього я приготувала сніданок.",
        "en": "After that I made breakfast."
      },
      {
        "tr": "На сніданок я з’їла яєчню з хлібом і випила каву.",
        "en": "For breakfast I had fried eggs with bread and a cup of coffee."
      },
      {
        "tr": "Кава була гаряча й дуже смачна.",
        "en": "The coffee was hot and very tasty."
      },
      {
        "tr": "О восьмій я одяглася й вийшла з дому.",
        "en": "At eight I got dressed and left the house."
      },
      {
        "tr": "На вулиці було холодно, тому я взяла теплий шарф.",
        "en": "It was cold outside, so I took a warm scarf."
      },
      {
        "tr": "Я чекала на автобус десять хвилин.",
        "en": "I waited for the bus for ten minutes."
      },
      {
        "tr": "В автобусі я читала книжку.",
        "en": "On the bus I read a book."
      },
      {
        "tr": "На роботу я приїхала о пів на дев’яту.",
        "en": "I got to work at half past eight."
      },
      {
        "tr": "Це був звичайний, але гарний ранок.",
        "en": "It was an ordinary but lovely morning."
      }
    ],
    "glossary": [
      {
        "tr": "прокинулася",
        "en": "woke up (woman speaking)"
      },
      {
        "tr": "вмилася",
        "en": "washed my face"
      },
      {
        "tr": "почистила зуби",
        "en": "brushed my teeth"
      },
      {
        "tr": "яєчню",
        "en": "fried eggs"
      },
      {
        "tr": "одяглася",
        "en": "got dressed"
      },
      {
        "tr": "вийшла з дому",
        "en": "left the house"
      },
      {
        "tr": "шарф",
        "en": "scarf"
      },
      {
        "tr": "чекала на автобус",
        "en": "waited for the bus"
      },
      {
        "tr": "о пів на дев’яту",
        "en": "at half past eight"
      },
      {
        "tr": "звичайний",
        "en": "ordinary"
      }
    ],
    "questions": [
      {
        "q": "What time did she wake up?",
        "options": [
          "At six",
          "At seven",
          "At eight",
          "At half past eight"
        ],
        "answer": 1,
        "explain": "«Я прокинулася о сьомій годині» – at seven."
      },
      {
        "q": "What did she have for breakfast?",
        "options": [
          "Porridge and tea",
          "A sandwich and juice",
          "Fried eggs with bread, and coffee",
          "Nothing at all"
        ],
        "answer": 2,
        "explain": "«Я з’їла яєчню з хлібом і випила каву.»"
      },
      {
        "q": "Why did she take a scarf?",
        "options": [
          "It was cold outside",
          "It was raining",
          "It was a present",
          "Her office is cold"
        ],
        "answer": 0,
        "explain": "«На вулиці було холодно» – it was cold outside."
      },
      {
        "q": "What did she do on the bus?",
        "options": [
          "She slept",
          "She listened to music",
          "She talked on the phone",
          "She read a book"
        ],
        "answer": 3,
        "explain": "«В автобусі я читала книжку.»"
      }
    ]
  },
  {
    "id": "uk-trip-to-the-carpathians",
    "kind": "story",
    "level": "A2",
    "title": "A Trip to the Carpathians",
    "titleNative": "Поїздка в Карпати",
    "summary": "The narrator remembers a summer trip to the Carpathian Mountains with a friend.",
    "register": "casual",
    "lines": [
      {
        "tr": "Минулого літа ми з другом поїхали в Карпати.",
        "en": "Last summer my friend and I went to the Carpathian Mountains."
      },
      {
        "tr": "Ми їхали поїздом цілу ніч.",
        "en": "We travelled by train all night."
      },
      {
        "tr": "Уранці ми приїхали в маленьке село біля гір.",
        "en": "In the morning we arrived in a small village near the mountains."
      },
      {
        "tr": "Там ми зупинилися в дерев’яному будинку.",
        "en": "There we stayed in a wooden house."
      },
      {
        "tr": "Господиня приготувала нам смачні вареники з картоплею.",
        "en": "The landlady cooked us delicious potato varenyky."
      },
      {
        "tr": "Другого дня ми піднялися на гору.",
        "en": "The next day we climbed a mountain."
      },
      {
        "tr": "Дорога була довга й важка, але краєвид був неймовірний.",
        "en": "The way up was long and hard, but the view was incredible."
      },
      {
        "tr": "На вершині ми зробили багато фотографій.",
        "en": "At the top we took lots of photos."
      },
      {
        "tr": "Увечері пішов дощ, і ми грали в карти біля каміна.",
        "en": "In the evening it started to rain, and we played cards by the fireplace."
      },
      {
        "tr": "Додому ми повернулися втомлені, але щасливі.",
        "en": "We came home tired but happy."
      },
      {
        "tr": "Наступного року ми обов’язково поїдемо туди знову.",
        "en": "Next year we'll definitely go there again."
      }
    ],
    "glossary": [
      {
        "tr": "Минулого літа",
        "en": "last summer"
      },
      {
        "tr": "ми з другом",
        "en": "my friend and I"
      },
      {
        "tr": "поїздом",
        "en": "by train"
      },
      {
        "tr": "зупинилися",
        "en": "stayed (for the night)"
      },
      {
        "tr": "дерев’яному будинку",
        "en": "a wooden house"
      },
      {
        "tr": "Господиня",
        "en": "the landlady, hostess"
      },
      {
        "tr": "вареники з картоплею",
        "en": "dumplings filled with potato"
      },
      {
        "tr": "краєвид",
        "en": "view, landscape"
      },
      {
        "tr": "На вершині",
        "en": "at the top (of the mountain)"
      },
      {
        "tr": "втомлені, але щасливі",
        "en": "tired but happy"
      }
    ],
    "questions": [
      {
        "q": "How did they travel to the mountains?",
        "options": [
          "By car",
          "By bus",
          "By train",
          "By plane"
        ],
        "answer": 2,
        "explain": "«Ми їхали поїздом цілу ніч.»"
      },
      {
        "q": "Where did they stay?",
        "options": [
          "In a hotel",
          "In a wooden house",
          "In a tent",
          "With relatives"
        ],
        "answer": 1,
        "explain": "«Ми зупинилися в дерев’яному будинку.»"
      },
      {
        "q": "What did they do when it rained in the evening?",
        "options": [
          "They played cards by the fireplace",
          "They watched a film",
          "They went to bed early",
          "They climbed the mountain"
        ],
        "answer": 0,
        "explain": "«Ми грали в карти біля каміна.»"
      },
      {
        "q": "How did they feel when they came home?",
        "options": [
          "Bored",
          "Ill",
          "Disappointed",
          "Tired but happy"
        ],
        "answer": 3,
        "explain": "«Втомлені, але щасливі» – tired but happy."
      }
    ]
  },
  {
    "id": "uk-the-lost-phone",
    "kind": "story",
    "level": "B1",
    "title": "The Lost Phone",
    "titleNative": "Загублений телефон",
    "summary": "A tired commuter loses his phone on the metro and gets it back thanks to an honest stranger.",
    "register": "casual",
    "lines": [
      {
        "tr": "Минулої п’ятниці я повертався з роботи додому дуже втомлений.",
        "en": "Last Friday I was coming home from work, feeling very tired."
      },
      {
        "tr": "У метро я сів у куточку й ненадовго задрімав.",
        "en": "On the metro I sat down in a corner and dozed off for a bit."
      },
      {
        "tr": "Коли я вийшов на своїй станції, то одразу помітив, що кишеня порожня.",
        "en": "When I got off at my station, I immediately noticed that my pocket was empty."
      },
      {
        "tr": "Мого телефону ніде не було — ні в куртці, ні в рюкзаку.",
        "en": "My phone was nowhere to be found, not in my jacket and not in my backpack."
      },
      {
        "tr": "Спочатку я дуже злякався, бо там були всі мої контакти й фотографії.",
        "en": "At first I was really scared, because all my contacts and photos were on it."
      },
      {
        "tr": "Потім я трохи заспокоївся та звернувся до працівниці метро.",
        "en": "Then I calmed down a little and went to a metro staff member for help."
      },
      {
        "tr": "Вона уважно мене вислухала й зателефонувала на кінцеву станцію.",
        "en": "She listened to me carefully and phoned the last station on the line."
      },
      {
        "tr": "Виявилося, що якась жінка вже знайшла мій телефон у вагоні й віддала його черговому.",
        "en": "It turned out that a woman had already found my phone in the carriage and handed it to the station attendant."
      },
      {
        "tr": "Уже за годину я знову тримав свій телефон у руках.",
        "en": "Within an hour I was holding my phone in my hands again."
      },
      {
        "tr": "Я дуже хотів подякувати тій жінці, але вона не залишила свого імені.",
        "en": "I really wanted to thank that woman, but she hadn't left her name."
      },
      {
        "tr": "Відтоді я ніколи не сплю в метро й завжди тримаю телефон у внутрішній кишені.",
        "en": "Since then I never sleep on the metro, and I always keep my phone in an inside pocket."
      },
      {
        "tr": "А ще я зрозумів, що чесних людей навколо набагато більше, ніж здається.",
        "en": "I also realised that there are far more honest people around than it seems."
      }
    ],
    "glossary": [
      {
        "tr": "задрімав",
        "en": "dozed off"
      },
      {
        "tr": "помітив",
        "en": "noticed"
      },
      {
        "tr": "кишеня порожня",
        "en": "the pocket was empty"
      },
      {
        "tr": "злякався",
        "en": "got scared"
      },
      {
        "tr": "заспокоївся",
        "en": "calmed down"
      },
      {
        "tr": "звернувся до",
        "en": "went to (someone) for help"
      },
      {
        "tr": "Виявилося",
        "en": "it turned out"
      },
      {
        "tr": "вагоні",
        "en": "(train) carriage"
      },
      {
        "tr": "черговому",
        "en": "the attendant on duty"
      },
      {
        "tr": "Відтоді",
        "en": "since then"
      }
    ],
    "questions": [
      {
        "q": "Where did he lose his phone?",
        "options": [
          "At work",
          "On the metro",
          "In a café",
          "At home"
        ],
        "answer": 1,
        "explain": "He dozed off on the metro, and the phone was later found in the carriage."
      },
      {
        "q": "Who found the phone?",
        "options": [
          "A police officer",
          "His colleague",
          "A woman on the train",
          "He found it himself"
        ],
        "answer": 2,
        "explain": "«Якась жінка вже знайшла мій телефон у вагоні.»"
      },
      {
        "q": "Why couldn't he thank the person who found it?",
        "options": [
          "She didn't leave her name",
          "She asked for money",
          "He forgot to",
          "She was rude to him"
        ],
        "answer": 0,
        "explain": "«Вона не залишила свого імені.»"
      },
      {
        "q": "What has he changed since then?",
        "options": [
          "He bought a second phone",
          "He takes a taxi to work",
          "He leaves his phone at home",
          "He never naps on the metro"
        ],
        "answer": 3,
        "explain": "«Відтоді я ніколи не сплю в метро» – and he keeps the phone in an inside pocket."
      }
    ]
  },
  {
    "id": "uk-sisters-birthday",
    "kind": "story",
    "level": "A2",
    "title": "My Sister's Birthday",
    "titleNative": "День народження сестри",
    "summary": "A family throws a surprise party for the narrator's sister on her twentieth birthday.",
    "register": "casual",
    "lines": [
      {
        "tr": "У суботу моїй сестрі Соломії виповнилося двадцять років.",
        "en": "On Saturday my sister Solomiia turned twenty."
      },
      {
        "tr": "Ми вирішили влаштувати їй сюрприз.",
        "en": "We decided to throw her a surprise party."
      },
      {
        "tr": "Мама спекла великий шоколадний торт, а я купив кульки й квіти.",
        "en": "Mum baked a big chocolate cake, and I bought balloons and flowers."
      },
      {
        "tr": "Удень сестра була на роботі, тож ми все підготували вдома.",
        "en": "During the day my sister was at work, so we got everything ready at home."
      },
      {
        "tr": "Увечері прийшли її друзі, а також бабуся з дідусем.",
        "en": "In the evening her friends came, and so did Grandma and Grandpa."
      },
      {
        "tr": "Коли Соломія відчинила двері, ми всі закричали: «З днем народження!»",
        "en": "When Solomiia opened the door, we all shouted, “Happy birthday!”"
      },
      {
        "tr": "Вона була така здивована, що навіть заплакала від радості.",
        "en": "She was so surprised that she even cried with joy."
      },
      {
        "tr": "Потім ми їли торт, співали пісні й танцювали.",
        "en": "Then we ate cake, sang songs and danced."
      },
      {
        "tr": "Батьки подарували їй новий фотоапарат, бо вона давно про нього мріяла.",
        "en": "Our parents gave her a new camera, because she had wanted one for a long time."
      },
      {
        "tr": "А від мене вона отримала цікаву книжку й листівку з побажаннями.",
        "en": "And from me she got an interesting book and a card with good wishes."
      },
      {
        "tr": "Гості розійшлися аж опівночі.",
        "en": "The guests didn't leave until midnight."
      },
      {
        "tr": "Сестра сказала, що це був її найкращий день народження.",
        "en": "My sister said it was her best birthday ever."
      }
    ],
    "glossary": [
      {
        "tr": "виповнилося двадцять років",
        "en": "turned twenty"
      },
      {
        "tr": "влаштувати їй сюрприз",
        "en": "to throw her a surprise"
      },
      {
        "tr": "спекла",
        "en": "baked"
      },
      {
        "tr": "кульки",
        "en": "balloons"
      },
      {
        "tr": "підготували",
        "en": "got ready, prepared"
      },
      {
        "tr": "бабуся з дідусем",
        "en": "Grandma and Grandpa"
      },
      {
        "tr": "здивована",
        "en": "surprised"
      },
      {
        "tr": "від радості",
        "en": "with joy"
      },
      {
        "tr": "мріяла",
        "en": "dreamed of, really wanted"
      },
      {
        "tr": "аж опівночі",
        "en": "not until midnight"
      }
    ],
    "questions": [
      {
        "q": "How old did the sister turn?",
        "options": [
          "Eighteen",
          "Twenty",
          "Twenty-one",
          "Thirty"
        ],
        "answer": 1,
        "explain": "«Виповнилося двадцять років» – she turned twenty."
      },
      {
        "q": "What did Mum make?",
        "options": [
          "A chocolate cake",
          "A fruit salad",
          "Pizza",
          "Varenyky"
        ],
        "answer": 0,
        "explain": "«Мама спекла великий шоколадний торт.»"
      },
      {
        "q": "How did the sister react to the surprise?",
        "options": [
          "She laughed and left",
          "She was angry",
          "She cried with joy",
          "She didn't notice"
        ],
        "answer": 2,
        "explain": "«Навіть заплакала від радості» – she even cried with joy."
      },
      {
        "q": "What did the parents give her?",
        "options": [
          "A laptop",
          "A book",
          "Flowers",
          "A camera"
        ],
        "answer": 3,
        "explain": "«Батьки подарували їй новий фотоапарат.»"
      }
    ]
  },
  {
    "id": "uk-texting-with-mum",
    "kind": "everyday",
    "level": "A1",
    "title": "Texting with Mum",
    "titleNative": "Листування з мамою",
    "summary": "A mum and her son exchange text messages about shopping on the way home and dinner.",
    "register": "casual",
    "lines": [
      {
        "speaker": "Mum",
        "tr": "Остапе, ти де?",
        "en": "Ostap, where are you?"
      },
      {
        "speaker": "Ostap",
        "tr": "Я ще на тренуванні, мам.",
        "en": "Still at practice, Mum."
      },
      {
        "speaker": "Mum",
        "tr": "Купиш хліб і молоко дорогою додому?",
        "en": "Can you pick up bread and milk on the way home?"
      },
      {
        "speaker": "Ostap",
        "tr": "Так, без проблем.",
        "en": "Yes, no problem."
      },
      {
        "speaker": "Ostap",
        "tr": "Ще щось треба?",
        "en": "Need anything else?"
      },
      {
        "speaker": "Mum",
        "tr": "Візьми ще десяток яєць, будь ласка.",
        "en": "Get ten eggs as well, please."
      },
      {
        "speaker": "Ostap",
        "tr": "Добре, буду вдома о сьомій.",
        "en": "OK, I'll be home at seven."
      },
      {
        "speaker": "Mum",
        "tr": "Чудово, я якраз готую борщ.",
        "en": "Great, I'm just making borscht."
      },
      {
        "speaker": "Ostap",
        "tr": "Ура, я дуже голодний!",
        "en": "Yay, I'm starving!"
      },
      {
        "speaker": "Mum",
        "tr": "Тільки не запізнюйся!",
        "en": "Just don't be late!"
      },
      {
        "speaker": "Ostap",
        "tr": "Не запізнюся, обіцяю.",
        "en": "I won't, I promise."
      }
    ],
    "glossary": [
      {
        "tr": "ти де?",
        "en": "where are you?"
      },
      {
        "tr": "тренуванні",
        "en": "(sports) practice, training"
      },
      {
        "tr": "дорогою додому",
        "en": "on the way home"
      },
      {
        "tr": "Ще щось треба?",
        "en": "Need anything else?"
      },
      {
        "tr": "десяток яєць",
        "en": "ten eggs"
      },
      {
        "tr": "о сьомій",
        "en": "at seven"
      },
      {
        "tr": "якраз готую",
        "en": "I'm cooking right now"
      },
      {
        "tr": "голодний",
        "en": "hungry"
      },
      {
        "tr": "не запізнюйся",
        "en": "don't be late"
      },
      {
        "tr": "обіцяю",
        "en": "I promise"
      }
    ],
    "questions": [
      {
        "q": "Where is Ostap when Mum writes?",
        "options": [
          "At school",
          "At sports practice",
          "At the shop",
          "At home"
        ],
        "answer": 1,
        "explain": "He writes «Я ще на тренуванні» – still at practice."
      },
      {
        "q": "What does Mum ask him to buy first?",
        "options": [
          "Bread and milk",
          "Eggs and cheese",
          "Meat",
          "Vegetables"
        ],
        "answer": 0,
        "explain": "«Купиш хліб і молоко дорогою додому?»"
      },
      {
        "q": "What time will Ostap be home?",
        "options": [
          "At six",
          "At eight",
          "At seven",
          "At nine"
        ],
        "answer": 2,
        "explain": "«Буду вдома о сьомій» – at seven."
      },
      {
        "q": "What is Mum cooking?",
        "options": [
          "Pizza",
          "Pasta",
          "Pancakes",
          "Borscht"
        ],
        "answer": 3,
        "explain": "«Я якраз готую борщ.»"
      }
    ]
  },
  {
    "id": "uk-notices-in-the-entrance-hall",
    "kind": "everyday",
    "level": "B1",
    "title": "Notices in the Entrance Hall",
    "titleNative": "Оголошення в під’їзді",
    "summary": "A set of notices and signs that residents read in the entrance hall of an apartment block.",
    "register": "polite",
    "lines": [
      {
        "tr": "Шановні мешканці, у четвер із дев’ятої до сімнадцятої не буде гарячої води.",
        "en": "Dear residents, there will be no hot water on Thursday from 9 a.m. to 5 p.m."
      },
      {
        "tr": "Перепрошуємо за тимчасові незручності.",
        "en": "We apologise for the temporary inconvenience."
      },
      {
        "tr": "Ліфт не працює, ремонт триватиме до п’ятниці.",
        "en": "The lift is out of order; repairs will last until Friday."
      },
      {
        "tr": "Не паліть на сходах і в під’їзді.",
        "en": "No smoking on the stairs or in the entrance hall."
      },
      {
        "tr": "Обережно, пофарбовано!",
        "en": "Caution, wet paint!"
      },
      {
        "tr": "Зачиняйте, будь ласка, двері за собою.",
        "en": "Please close the door behind you."
      },
      {
        "tr": "Стороннім вхід заборонено.",
        "en": "No unauthorised entry."
      },
      {
        "tr": "Сміття викидайте лише в контейнери біля будинку.",
        "en": "Please put rubbish only in the bins next to the building."
      },
      {
        "tr": "Хто загубив ключі біля дитячого майданчика, заходьте до сьомої квартири.",
        "en": "If you lost your keys near the playground, please come to flat 7."
      },
      {
        "tr": "Просимо не залишати велосипеди та дитячі візочки біля ліфта.",
        "en": "Please do not leave bicycles or prams by the lift."
      },
      {
        "tr": "Збори мешканців відбудуться в неділю о вісімнадцятій у дворі будинку.",
        "en": "The residents' meeting will take place on Sunday at 6 p.m. in the courtyard."
      },
      {
        "tr": "Ваша думка важлива, приходьте всі!",
        "en": "Your opinion matters, so please, everyone, come!"
      }
    ],
    "glossary": [
      {
        "tr": "Шановні мешканці",
        "en": "dear residents"
      },
      {
        "tr": "гарячої води",
        "en": "hot water"
      },
      {
        "tr": "тимчасові незручності",
        "en": "temporary inconvenience"
      },
      {
        "tr": "триватиме",
        "en": "will last"
      },
      {
        "tr": "Не паліть",
        "en": "do not smoke"
      },
      {
        "tr": "під’їзді",
        "en": "entrance hall, stairwell of a block of flats"
      },
      {
        "tr": "пофарбовано",
        "en": "(freshly) painted"
      },
      {
        "tr": "Стороннім вхід заборонено",
        "en": "no unauthorised entry"
      },
      {
        "tr": "візочки",
        "en": "prams, pushchairs"
      },
      {
        "tr": "Збори мешканців",
        "en": "residents' meeting"
      }
    ],
    "questions": [
      {
        "q": "When will there be no hot water?",
        "options": [
          "On Thursday, 9 a.m. to 5 p.m.",
          "All week",
          "On Sunday evening",
          "On Friday morning"
        ],
        "answer": 0,
        "explain": "«У четвер із дев’ятої до сімнадцятої не буде гарячої води.»"
      },
      {
        "q": "How long will the lift be under repair?",
        "options": [
          "Until Thursday",
          "Until Friday",
          "Until Sunday",
          "For a month"
        ],
        "answer": 1,
        "explain": "«Ремонт триватиме до п’ятниці» – until Friday."
      },
      {
        "q": "What should you do if you lost your keys near the playground?",
        "options": [
          "Call the police",
          "Ask at the shop",
          "Go to flat 7",
          "Wait by the lift"
        ],
        "answer": 2,
        "explain": "«Заходьте до сьомої квартири» – come to flat 7."
      },
      {
        "q": "Where will the residents' meeting take place?",
        "options": [
          "In the basement",
          "In flat 7",
          "By the lift",
          "In the courtyard"
        ],
        "answer": 3,
        "explain": "«У дворі будинку» – in the building's courtyard."
      }
    ]
  },
  {
    "id": "uk-cafe-menu",
    "kind": "everyday",
    "level": "A1",
    "title": "The Café Menu",
    "titleNative": "Меню кав’ярні",
    "summary": "A café's breakfast menu, followed by a short polite exchange between a guest and a waiter.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Menu",
        "tr": "Сніданки — до дванадцятої.",
        "en": "Breakfast served until 12 noon."
      },
      {
        "speaker": "Menu",
        "tr": "Сирники зі сметаною — 120 гривень.",
        "en": "Syrnyky (cottage cheese pancakes) with sour cream – 120 hryvnias."
      },
      {
        "speaker": "Menu",
        "tr": "Омлет з овочами — 110 гривень.",
        "en": "Vegetable omelette – 110 hryvnias."
      },
      {
        "speaker": "Menu",
        "tr": "Вареники з вишнями — 140 гривень.",
        "en": "Cherry varenyky – 140 hryvnias."
      },
      {
        "speaker": "Menu",
        "tr": "Борщ із пампушками — 150 гривень.",
        "en": "Borscht with pampushky (garlic buns) – 150 hryvnias."
      },
      {
        "speaker": "Menu",
        "tr": "Кава американо — 50 гривень.",
        "en": "Americano coffee – 50 hryvnias."
      },
      {
        "speaker": "Menu",
        "tr": "Чай у чайнику — 70 гривень.",
        "en": "A pot of tea – 70 hryvnias."
      },
      {
        "speaker": "Guest",
        "tr": "Перепрошую, можна мені сирники та чай у чайнику?",
        "en": "Excuse me, could I have the syrnyky and a pot of tea?"
      },
      {
        "speaker": "Waiter",
        "tr": "Звичайно, який чай бажаєте: чорний, зелений чи трав’яний?",
        "en": "Of course, what kind of tea would you like: black, green or herbal?"
      },
      {
        "speaker": "Guest",
        "tr": "Зелений, будь ласка.",
        "en": "Green, please."
      },
      {
        "speaker": "Waiter",
        "tr": "Сирники будуть готові за десять хвилин.",
        "en": "The syrnyky will be ready in ten minutes."
      },
      {
        "speaker": "Guest",
        "tr": "Дякую, а скільки це буде разом?",
        "en": "Thank you, and how much will that be altogether?"
      },
      {
        "speaker": "Waiter",
        "tr": "Разом сто дев’яносто гривень.",
        "en": "That's one hundred and ninety hryvnias altogether."
      }
    ],
    "glossary": [
      {
        "tr": "Сніданки",
        "en": "breakfasts, breakfast menu"
      },
      {
        "tr": "Сирники зі сметаною",
        "en": "cottage cheese pancakes with sour cream"
      },
      {
        "tr": "з овочами",
        "en": "with vegetables"
      },
      {
        "tr": "з вишнями",
        "en": "with cherries"
      },
      {
        "tr": "пампушками",
        "en": "small garlic buns served with borscht"
      },
      {
        "tr": "Чай у чайнику",
        "en": "a pot of tea"
      },
      {
        "tr": "бажаєте",
        "en": "would you like (polite)"
      },
      {
        "tr": "трав’яний",
        "en": "herbal"
      },
      {
        "tr": "разом",
        "en": "altogether, in total"
      }
    ],
    "questions": [
      {
        "q": "Until what time is breakfast served?",
        "options": [
          "Until ten",
          "Until eleven",
          "Until twelve",
          "All day"
        ],
        "answer": 2,
        "explain": "«Сніданки — до дванадцятої» – until twelve."
      },
      {
        "q": "What comes with the borscht?",
        "options": [
          "Garlic buns (pampushky)",
          "Sour cream",
          "Cherries",
          "Vegetables"
        ],
        "answer": 0,
        "explain": "«Борщ із пампушками» – borscht with garlic buns."
      },
      {
        "q": "What kind of tea does the guest choose?",
        "options": [
          "Black",
          "Green",
          "Herbal",
          "Fruit"
        ],
        "answer": 1,
        "explain": "The guest answers «Зелений, будь ласка» – green."
      },
      {
        "q": "How much does the guest pay altogether?",
        "options": [
          "120 hryvnias",
          "170 hryvnias",
          "210 hryvnias",
          "190 hryvnias"
        ],
        "answer": 3,
        "explain": "Syrnyky (120) plus a pot of tea (70) make «сто дев’яносто гривень» – 190."
      }
    ]
  },
  {
    "id": "uk-meeting-new-colleagues",
    "kind": "speech",
    "level": "A2",
    "title": "Meeting New Colleagues",
    "titleNative": "Знайомство з колегами",
    "summary": "A new marketing manager introduces herself to her colleagues on her first day at work.",
    "register": "polite",
    "lines": [
      {
        "tr": "Доброго ранку всім!",
        "en": "Good morning, everyone!"
      },
      {
        "tr": "Мене звати Ірина, і від сьогодні я працюю у вашому відділі.",
        "en": "My name is Iryna, and from today I'm working in your department."
      },
      {
        "tr": "Я ваш новий менеджер із маркетингу.",
        "en": "I'm your new marketing manager."
      },
      {
        "tr": "До цього я три роки працювала в невеликій компанії у Львові.",
        "en": "Before this, I worked for three years at a small company in Lviv."
      },
      {
        "tr": "Місяць тому я переїхала до Києва, тож місто для мене ще зовсім нове.",
        "en": "I moved to Kyiv a month ago, so the city is still quite new to me."
      },
      {
        "tr": "Я люблю працювати в команді й завжди рада новим ідеям.",
        "en": "I love working in a team and I'm always happy to hear new ideas."
      },
      {
        "tr": "У вільний час я займаюся йогою та багато фотографую.",
        "en": "In my free time I do yoga and take a lot of photos."
      },
      {
        "tr": "Якщо у вас будуть запитання, пишіть мені або просто заходьте до мене.",
        "en": "If you have any questions, message me or just drop by."
      },
      {
        "tr": "Буду рада познайомитися з кожним із вас ближче.",
        "en": "I'll be glad to get to know each of you better."
      },
      {
        "tr": "Дякую за теплий прийом!",
        "en": "Thank you for the warm welcome!"
      }
    ],
    "glossary": [
      {
        "tr": "від сьогодні",
        "en": "from today"
      },
      {
        "tr": "відділі",
        "en": "department"
      },
      {
        "tr": "менеджер із маркетингу",
        "en": "marketing manager"
      },
      {
        "tr": "До цього",
        "en": "before this"
      },
      {
        "tr": "переїхала",
        "en": "moved (to a new place)"
      },
      {
        "tr": "тож",
        "en": "so"
      },
      {
        "tr": "працювати в команді",
        "en": "to work in a team"
      },
      {
        "tr": "займаюся йогою",
        "en": "I do yoga"
      },
      {
        "tr": "заходьте до мене",
        "en": "drop by (polite)"
      },
      {
        "tr": "теплий прийом",
        "en": "warm welcome"
      }
    ],
    "questions": [
      {
        "q": "What is Iryna's new job?",
        "options": [
          "Accountant",
          "Marketing manager",
          "Teacher",
          "Designer"
        ],
        "answer": 1,
        "explain": "«Я ваш новий менеджер із маркетингу.»"
      },
      {
        "q": "Where did she work before?",
        "options": [
          "In Kyiv",
          "Abroad",
          "At a small company in Lviv",
          "At a school"
        ],
        "answer": 2,
        "explain": "«Три роки працювала в невеликій компанії у Львові.»"
      },
      {
        "q": "How long has she lived in Kyiv?",
        "options": [
          "A week",
          "A year",
          "Three years",
          "A month"
        ],
        "answer": 3,
        "explain": "«Місяць тому я переїхала до Києва» – a month ago."
      },
      {
        "q": "What does she do in her free time?",
        "options": [
          "Yoga and photography",
          "Running and cooking",
          "Painting",
          "Football"
        ],
        "answer": 0,
        "explain": "«Я займаюся йогою та багато фотографую.»"
      }
    ]
  },
  {
    "id": "uk-wedding-toast",
    "kind": "speech",
    "level": "B1",
    "title": "A Wedding Toast",
    "titleNative": "Тост на весіллі",
    "summary": "The groom's best friend gives a warm toast at the wedding, speaking to the guests and to the couple.",
    "register": "mixed",
    "lines": [
      {
        "tr": "Дорогі гості, дозвольте сказати кілька слів!",
        "en": "Dear guests, allow me to say a few words!"
      },
      {
        "tr": "Я знаю Максима ще зі шкільних років, ми навіть сиділи за однією партою.",
        "en": "I've known Maksym since our school days; we even shared a desk."
      },
      {
        "tr": "Він завжди був справжнім другом, який допоможе в будь-якій ситуації.",
        "en": "He has always been a true friend who will help you in any situation."
      },
      {
        "tr": "Пам’ятаю, як він казав, що ніколи не одружиться, бо ще не зустрів ту єдину.",
        "en": "I remember him saying he would never get married because he hadn't met the one yet."
      },
      {
        "tr": "А потім у його житті з’явилася Христина, і все змінилося.",
        "en": "And then Khrystyna came into his life, and everything changed."
      },
      {
        "tr": "Христино, ти зробила мого друга найщасливішою людиною на світі.",
        "en": "Khrystyna, you've made my friend the happiest man in the world."
      },
      {
        "tr": "Я бачу, як ви дивитеся одне на одного, і щиро радію за вас.",
        "en": "I can see the way you look at each other, and I'm truly happy for you."
      },
      {
        "tr": "Бажаю вам терпіння, взаєморозуміння та багато спільних мрій.",
        "en": "I wish you patience, understanding and lots of shared dreams."
      },
      {
        "tr": "Нехай ваш дім завжди буде повний сміху, тепла й любові.",
        "en": "May your home always be full of laughter, warmth and love."
      },
      {
        "tr": "А якщо колись посваритеся, згадайте цей день і те, як ви кохаєте одне одного.",
        "en": "And if you ever quarrel, remember this day and how much you love each other."
      },
      {
        "tr": "Тож прошу всіх підняти келихи!",
        "en": "So I invite everyone to raise their glasses!"
      },
      {
        "tr": "За молодих!",
        "en": "To the newlyweds!"
      }
    ],
    "glossary": [
      {
        "tr": "Дорогі гості",
        "en": "dear guests"
      },
      {
        "tr": "зі шкільних років",
        "en": "since school days"
      },
      {
        "tr": "сиділи за однією партою",
        "en": "shared a desk at school"
      },
      {
        "tr": "одружиться",
        "en": "will get married (of a man)"
      },
      {
        "tr": "ту єдину",
        "en": "the one (true love)"
      },
      {
        "tr": "з’явилася",
        "en": "appeared, came along"
      },
      {
        "tr": "найщасливішою людиною",
        "en": "the happiest person"
      },
      {
        "tr": "посваритеся",
        "en": "you quarrel"
      },
      {
        "tr": "підняти келихи",
        "en": "to raise your glasses"
      },
      {
        "tr": "За молодих!",
        "en": "To the newlyweds!"
      }
    ],
    "questions": [
      {
        "q": "How does the speaker know the groom?",
        "options": [
          "They work together",
          "They were at school together",
          "They are brothers",
          "They met at university"
        ],
        "answer": 1,
        "explain": "«Я знаю Максима ще зі шкільних років.»"
      },
      {
        "q": "What did the groom use to say?",
        "options": [
          "That he would never get married",
          "That he wanted a big wedding",
          "That he would move abroad",
          "That he hated school"
        ],
        "answer": 0,
        "explain": "«Він казав, що ніколи не одружиться.»"
      },
      {
        "q": "What does the speaker wish the couple?",
        "options": [
          "Lots of money",
          "A big house",
          "Patience, understanding and shared dreams",
          "Many children"
        ],
        "answer": 2,
        "explain": "«Бажаю вам терпіння, взаєморозуміння та багато спільних мрій.»"
      },
      {
        "q": "What should the couple do if they ever quarrel?",
        "options": [
          "Call the speaker",
          "Go on holiday",
          "Stop talking for a day",
          "Remember this day and their love"
        ],
        "answer": 3,
        "explain": "«Згадайте цей день і те, як ви кохаєте одне одного.»"
      }
    ]
  },
  {
    "id": "uk-welcome-to-lviv",
    "kind": "speech",
    "level": "B1",
    "title": "Welcome to Lviv",
    "titleNative": "Ласкаво просимо до Львова",
    "summary": "A short talk presenting Lviv to an audience of potential visitors: its history, sights, coffee and weather.",
    "register": "polite",
    "lines": [
      {
        "tr": "Добрий день, сьогодні я хочу розповісти вам про своє рідне місто — Львів.",
        "en": "Good afternoon, today I'd like to tell you about my home town, Lviv."
      },
      {
        "tr": "Львів розташований на заході України, недалеко від кордону з Польщею.",
        "en": "Lviv is in the west of Ukraine, not far from the Polish border."
      },
      {
        "tr": "Це місто з довгою історією, якій уже понад сім століть.",
        "en": "It's a city with a long history going back more than seven centuries."
      },
      {
        "tr": "Історичний центр Львова внесено до списку світової спадщини ЮНЕСКО.",
        "en": "The historic centre of Lviv is on the UNESCO World Heritage List."
      },
      {
        "tr": "Найкраще знайомитися з містом пішки, бо вузькі бруковані вулички Старого міста просто чарівні.",
        "en": "The best way to get to know the city is on foot, because the narrow cobbled streets of the Old Town are simply charming."
      },
      {
        "tr": "Обов’язково прогуляйтеся площею Ринок і подивіться на старовинні кам’яниці навколо неї.",
        "en": "Be sure to stroll around Rynok Square and look at the old stone townhouses that surround it."
      },
      {
        "tr": "Львів також славиться своєю кавою, тому тут на кожному кроці є затишні кав’ярні.",
        "en": "Lviv is also famous for its coffee, so there are cosy cafés at every turn."
      },
      {
        "tr": "Увечері можна сходити до оперного театру — однієї з найкрасивіших будівель міста.",
        "en": "In the evening you can go to the opera house, one of the most beautiful buildings in the city."
      },
      {
        "tr": "Щоправда, у Львові часто йде дощ, тож парасольку краще мати із собою.",
        "en": "Admittedly, it often rains in Lviv, so it's best to carry an umbrella."
      },
      {
        "tr": "Але навіть у дощ це місто має свій особливий настрій.",
        "en": "But even in the rain, the city has its own special atmosphere."
      },
      {
        "tr": "Я впевнена, що Львів вас не розчарує.",
        "en": "I'm sure Lviv won't disappoint you."
      },
      {
        "tr": "Приїжджайте, і я з радістю покажу вам свої улюблені місця!",
        "en": "Come and visit, and I'll gladly show you my favourite places!"
      },
      {
        "tr": "Дякую за увагу!",
        "en": "Thank you for your attention!"
      }
    ],
    "glossary": [
      {
        "tr": "рідне місто",
        "en": "home town"
      },
      {
        "tr": "розташований",
        "en": "located"
      },
      {
        "tr": "на заході",
        "en": "in the west"
      },
      {
        "tr": "понад сім століть",
        "en": "more than seven centuries"
      },
      {
        "tr": "світової спадщини",
        "en": "World Heritage"
      },
      {
        "tr": "бруковані вулички",
        "en": "cobbled little streets"
      },
      {
        "tr": "кам’яниці",
        "en": "old stone townhouses"
      },
      {
        "tr": "славиться",
        "en": "is famous for"
      },
      {
        "tr": "затишні кав’ярні",
        "en": "cosy cafés"
      },
      {
        "tr": "не розчарує",
        "en": "won't disappoint"
      }
    ],
    "questions": [
      {
        "q": "Where is Lviv?",
        "options": [
          "In the east of Ukraine",
          "In the west, near Poland",
          "On the Black Sea coast",
          "In the centre of Ukraine"
        ],
        "answer": 1,
        "explain": "«На заході України, недалеко від кордону з Польщею.»"
      },
      {
        "q": "How old is the city's history?",
        "options": [
          "Over seven centuries",
          "About a hundred years",
          "Two thousand years",
          "Fifty years"
        ],
        "answer": 0,
        "explain": "«Понад сім століть» – more than seven centuries."
      },
      {
        "q": "What is Lviv famous for, according to the speaker?",
        "options": [
          "Its beaches",
          "Its skyscrapers",
          "Its coffee",
          "Its mountains"
        ],
        "answer": 2,
        "explain": "«Львів також славиться своєю кавою.»"
      },
      {
        "q": "Why should visitors bring an umbrella?",
        "options": [
          "It's always sunny",
          "It's a local tradition",
          "Shops don't sell them",
          "It often rains"
        ],
        "answer": 3,
        "explain": "«У Львові часто йде дощ.»"
      }
    ]
  },
  {
    "id": "uk-the-mitten-tale",
    "kind": "story",
    "level": "B1",
    "title": "The Mitten",
    "titleNative": "Рукавичка",
    "summary": "A well-loved Ukrainian folk tale, retold in simple words: an old man loses a mitten in the winter forest, and one animal after another squeezes into it to keep warm.",
    "register": "mixed",
    "lines": [
      {
        "tr": "Якось узимку йшов дід лісом, а за ним бігла собачка.",
        "en": "One winter's day an old man was walking through the forest, and his little dog was running along behind him."
      },
      {
        "tr": "Ішов він, ішов та й загубив рукавичку.",
        "en": "He walked and walked, and somewhere along the way he lost a mitten."
      },
      {
        "tr": "Невдовзі прибігла мишка, побачила рукавичку й залізла всередину.",
        "en": "Before long a mouse came running up, saw the mitten and climbed inside."
      },
      {
        "tr": "— Тут тепло й затишно, тут я й буду жити! — зраділа вона.",
        "en": "\"It's warm and cosy in here – this is where I'm going to live!\" she said happily."
      },
      {
        "tr": "Трохи згодом до рукавички прискакала жабка.",
        "en": "A little later a frog came hopping up to the mitten."
      },
      {
        "tr": "— Хто, хто в рукавичці живе? — спитала вона.",
        "en": "\"Who, who lives in the mitten?\" she asked."
      },
      {
        "tr": "— Я, мишка-шкряботушка, а ти хто? — відповіла мишка.",
        "en": "\"It's me, Mouse the Scratcher – and who are you?\" answered the mouse."
      },
      {
        "tr": "— А я жабка-скрекотушка, пусти й мене до себе!",
        "en": "\"I'm Frog the Croaker – let me in too!\""
      },
      {
        "tr": "Мишка посунулася, і стали вони жити вдвох.",
        "en": "The mouse moved over, and the two of them began to live there together."
      },
      {
        "tr": "Потім прибіг зайчик-побігайчик, а за ним — лисичка-сестричка, і їх теж пустили погрітися.",
        "en": "Then Hare the Runner came running up, and after him Little Sister Fox, and they too were let in to warm up."
      },
      {
        "tr": "У рукавичці стало вже тіснувато, аж тут із-за дерев вийшов вовчик-братик.",
        "en": "It was already getting a bit cramped in the mitten when out from behind the trees came Brother Wolf."
      },
      {
        "tr": "— Пустіть і мене, бо надворі дуже холодно! — попросив він.",
        "en": "\"Let me in too, because it's very cold outside!\" he asked."
      },
      {
        "tr": "— Та де ж ти помістишся, нас тут уже четверо! — відповіли звірі.",
        "en": "\"But where would you fit? There are already four of us in here!\" the animals replied."
      },
      {
        "tr": "Проте вовк так змерз, що звірі пожаліли його й посунулися ще трохи.",
        "en": "But the wolf was so frozen that the animals took pity on him and squeezed up a little more."
      },
      {
        "tr": "Останнім до рукавички прийшов великий ведмідь.",
        "en": "The last to come to the mitten was a big bear."
      },
      {
        "tr": "— Я ведмідь-набрідь, пустіть і мене! — заревів він на весь ліс.",
        "en": "\"I'm Bear the Wanderer – let me in as well!\" he roared so that the whole forest could hear."
      },
      {
        "tr": "— Ти ж такий величезний, що рукавичка розірветься! — злякалися всі.",
        "en": "\"But you're so huge that the mitten will burst!\" they all cried in alarm."
      },
      {
        "tr": "— Та я тільки скраєчку сяду, — пообіцяв ведмідь і таки втиснувся всередину.",
        "en": "\"I'll just sit right on the edge,\" the bear promised, and he squeezed inside after all."
      },
      {
        "tr": "Тепер їх було шестеро, і рукавичка аж тріщала по швах.",
        "en": "Now there were six of them, and the mitten was bursting at the seams."
      },
      {
        "tr": "Тим часом дід помітив, що однієї рукавички немає, і повернувся її шукати.",
        "en": "Meanwhile the old man noticed that one of his mittens was missing and went back to look for it."
      },
      {
        "tr": "Собачка побігла вперед, побачила, що рукавичка ворушиться, і голосно загавкала.",
        "en": "The dog ran on ahead, saw that the mitten was moving, and started barking loudly."
      },
      {
        "tr": "Звірі так перелякалися, що вискочили з рукавички й розбіглися лісом хто куди.",
        "en": "The animals got such a fright that they jumped out of the mitten and scattered through the forest in all directions."
      },
      {
        "tr": "А дід підійшов, підняв свою рукавичку й пішов додому.",
        "en": "And the old man came up, picked up his mitten and went home."
      },
      {
        "tr": "Ось і казці кінець, а хто слухав — молодець!",
        "en": "And that's the end of the tale – and well done to everyone who listened!"
      }
    ],
    "glossary": [
      {
        "tr": "загубив",
        "en": "lost, dropped (загубити)"
      },
      {
        "tr": "залізла всередину",
        "en": "climbed inside (залізти)"
      },
      {
        "tr": "затишно",
        "en": "cosy"
      },
      {
        "tr": "Трохи згодом",
        "en": "a little later"
      },
      {
        "tr": "посунулася",
        "en": "moved over, made room (посунутися)"
      },
      {
        "tr": "погрітися",
        "en": "to warm oneself up"
      },
      {
        "tr": "тіснувато",
        "en": "a bit cramped (from тісно – cramped)"
      },
      {
        "tr": "помістишся",
        "en": "you will fit (поміститися)"
      },
      {
        "tr": "змерз",
        "en": "got very cold, was frozen (змерзнути)"
      },
      {
        "tr": "пожаліли",
        "en": "took pity on (пожаліти)"
      },
      {
        "tr": "заревів",
        "en": "roared (заревіти)"
      },
      {
        "tr": "розірветься",
        "en": "will tear, will burst (розірватися)"
      },
      {
        "tr": "втиснувся",
        "en": "squeezed in (втиснутися)"
      },
      {
        "tr": "шестеро",
        "en": "six (collective number, used for a group of people or animals)"
      },
      {
        "tr": "тріщала по швах",
        "en": "was bursting at the seams (тріщати по швах)"
      },
      {
        "tr": "ворушиться",
        "en": "is moving, is stirring (ворушитися)"
      },
      {
        "tr": "загавкала",
        "en": "started barking (загавкати)"
      },
      {
        "tr": "хто куди",
        "en": "in all directions (lit. who where to)"
      }
    ],
    "questions": [
      {
        "q": "Who was the first to move into the mitten?",
        "options": [
          "The frog",
          "The hare",
          "The mouse",
          "The dog"
        ],
        "answer": 2,
        "explain": "«Невдовзі прибігла мишка, побачила рукавичку й залізла всередину» – the mouse came first."
      },
      {
        "q": "Why did the animals let the wolf in, although it was already cramped?",
        "options": [
          "He was so cold that they felt sorry for him",
          "He promised to guard the mitten",
          "He was the mouse's brother",
          "They were afraid he would eat them"
        ],
        "answer": 0,
        "explain": "«Вовк так змерз, що звірі пожаліли його й посунулися ще трохи.»"
      },
      {
        "q": "How many animals were in the mitten once the bear had squeezed in?",
        "options": [
          "Three",
          "Four",
          "Five",
          "Six"
        ],
        "answer": 3,
        "explain": "«Тепер їх було шестеро» – mouse, frog, hare, fox, wolf and bear."
      },
      {
        "q": "What made the animals run away?",
        "options": [
          "The mitten tore apart",
          "The dog barked loudly",
          "The old man shouted at them",
          "It started to snow"
        ],
        "answer": 1,
        "explain": "The dog «голосно загавкала», and the animals «так перелякалися, що вискочили з рукавички»."
      }
    ]
  },
  {
    "id": "uk-why-i-learn-ukrainian",
    "kind": "speech",
    "level": "B1",
    "title": "Why I'm Learning Ukrainian",
    "titleNative": "Чому я вчу українську",
    "summary": "A learner's short talk to a language class: why they started Ukrainian, what was hard, what helped, a funny mistake and their plans. It is written without gendered forms, so any speaker can adapt it and give it as their own.",
    "register": "polite",
    "lines": [
      {
        "tr": "Добрий вечір, друзі!",
        "en": "Good evening, friends!"
      },
      {
        "tr": "Мене звати Алекс, я з Канади й працюю в невеликій книгарні.",
        "en": "My name is Alex, I'm from Canada and I work in a small bookshop."
      },
      {
        "tr": "Сьогодні я хочу розповісти вам, чому вчу українську мову.",
        "en": "Today I'd like to tell you why I'm learning Ukrainian."
      },
      {
        "tr": "Усе почалося два роки тому, коли в нашому будинку оселилася родина з Харкова.",
        "en": "It all began two years ago, when a family from Kharkiv moved into our building."
      },
      {
        "tr": "Мені дуже хотілося розмовляти з ними їхньою мовою, а не лише усміхатися й кивати.",
        "en": "I really wanted to talk to them in their own language, and not just smile and nod."
      },
      {
        "tr": "Скажу чесно: спочатку мені було дуже важко.",
        "en": "I'll be honest: at first it was very hard for me."
      },
      {
        "tr": "Найбільше мене лякали відмінки, бо в українській мові їх аж сім.",
        "en": "What scared me most was the cases, because Ukrainian has as many as seven of them."
      },
      {
        "tr": "Дієслова руху — це взагалі окрема розмова, бо я досі плутаю «йти» та «їхати».",
        "en": "Verbs of motion are a whole other story, because I still mix up «йти» (to go on foot) and «їхати» (to go by vehicle)."
      },
      {
        "tr": "А ще є наголос, який в українських словах може падати на будь-який склад.",
        "en": "And then there's the stress, which in Ukrainian words can fall on any syllable."
      },
      {
        "tr": "Що ж мені допомогло?",
        "en": "So what helped me?"
      },
      {
        "tr": "По-перше, я щодня вчу мову хоча б п’ятнадцять хвилин, навіть коли зовсім немає настрою.",
        "en": "First, I study the language for at least fifteen minutes every day, even when I'm not in the mood at all."
      },
      {
        "tr": "По-друге, дорогою на роботу я слухаю українські пісні та подкасти.",
        "en": "Second, I listen to Ukrainian songs and podcasts on my way to work."
      },
      {
        "tr": "По-третє, я багато розмовляю з носіями мови й не боюся помилятися.",
        "en": "Third, I talk a lot with native speakers and I'm not afraid of making mistakes."
      },
      {
        "tr": "До речі, про помилки: одна з них досі смішить моїх друзів.",
        "en": "Speaking of mistakes, one of them still makes my friends laugh."
      },
      {
        "tr": "Якось у кав’ярні замість «Можна платити карткою?» у мене вийшло «Можна плакати карткою?».",
        "en": "Once, in a café, instead of \"Can I pay by card?\" what came out was \"Can I cry by card?\""
      },
      {
        "tr": "Дівчина за касою усміхнулася й відповіла: «Плакати не треба, у нас недорого».",
        "en": "The girl at the till smiled and replied, \"No need to cry, it's not expensive here.\""
      },
      {
        "tr": "Відтоді я більше не плутаю цих двох слів.",
        "en": "Since then I haven't mixed up those two words again."
      },
      {
        "tr": "Сьогодні я вже можу читати новини, писати повідомлення друзям і навіть трохи жартувати.",
        "en": "Today I can already read the news, write messages to my friends and even joke a little."
      },
      {
        "tr": "Звісно, до досконалості мені ще далеко, але я бачу, що рухаюся вперед.",
        "en": "Of course, I'm still a long way from perfect, but I can see that I'm moving forward."
      },
      {
        "tr": "Наступного року я мрію поїхати до України й побачити Київ, Львів та Карпати.",
        "en": "Next year I dream of going to Ukraine and seeing Kyiv, Lviv and the Carpathians."
      },
      {
        "tr": "А ще я хочу прочитати в оригіналі хоча б одну українську книжку.",
        "en": "I'd also like to read at least one Ukrainian book in the original."
      },
      {
        "tr": "Моя порада всім, хто тільки починає: не чекайте, доки заговорите ідеально.",
        "en": "My advice to everyone who is just starting: don't wait until you can speak perfectly."
      },
      {
        "tr": "Говоріть уже сьогодні — з помилками, з акцентом, але говоріть!",
        "en": "Speak today – with mistakes, with an accent, but speak!"
      },
      {
        "tr": "Щиро дякую нашій викладачці за терпіння, а всім вам — за підтримку.",
        "en": "My sincere thanks to our teacher for her patience, and to all of you for your support."
      },
      {
        "tr": "Дякую за увагу, і до зустрічі на наступному занятті!",
        "en": "Thank you for listening, and see you at the next class!"
      }
    ],
    "glossary": [
      {
        "tr": "оселилася",
        "en": "settled, moved in (оселитися)"
      },
      {
        "tr": "усміхатися й кивати",
        "en": "to smile and nod"
      },
      {
        "tr": "Скажу чесно",
        "en": "I'll be honest (lit. I'll say honestly)"
      },
      {
        "tr": "відмінки",
        "en": "(grammatical) cases (відмінок)"
      },
      {
        "tr": "Дієслова руху",
        "en": "verbs of motion"
      },
      {
        "tr": "досі плутаю",
        "en": "I still mix up (плутати)"
      },
      {
        "tr": "наголос",
        "en": "(word) stress"
      },
      {
        "tr": "будь-який склад",
        "en": "any syllable"
      },
      {
        "tr": "хоча б",
        "en": "at least"
      },
      {
        "tr": "немає настрою",
        "en": "(I'm) not in the mood (lit. there is no mood)"
      },
      {
        "tr": "носіями мови",
        "en": "native speakers (носій мови); instrumental after «з»"
      },
      {
        "tr": "помилятися",
        "en": "to make mistakes"
      },
      {
        "tr": "До речі",
        "en": "by the way, speaking of which"
      },
      {
        "tr": "у мене вийшло",
        "en": "what came out was; I ended up saying"
      },
      {
        "tr": "Відтоді",
        "en": "since then"
      },
      {
        "tr": "до досконалості",
        "en": "to perfection (досконалість)"
      },
      {
        "tr": "рухаюся вперед",
        "en": "I'm moving forward (рухатися)"
      },
      {
        "tr": "терпіння",
        "en": "patience"
      }
    ],
    "questions": [
      {
        "q": "Why did the speaker start learning Ukrainian?",
        "options": [
          "Their job in a bookshop required it",
          "A family from Kharkiv moved into their building",
          "They were planning to study in Lviv",
          "Their grandmother spoke it at home"
        ],
        "answer": 1,
        "explain": "«Усе почалося два роки тому, коли в нашому будинку оселилася родина з Харкова.»"
      },
      {
        "q": "Which of these does the speaker NOT mention as a difficulty?",
        "options": [
          "The cases",
          "Verbs of motion",
          "Word stress",
          "The alphabet"
        ],
        "answer": 3,
        "explain": "The talk names «відмінки», «дієслова руху» and «наголос»; the alphabet is never mentioned."
      },
      {
        "q": "What did the speaker accidentally ask in the café?",
        "options": [
          "Whether they could \"cry\" by card",
          "Whether the coffee was free",
          "Where they could sleep",
          "Whether the cashier was married"
        ],
        "answer": 0,
        "explain": "Instead of «платити» (to pay) they said «плакати» (to cry): «Можна плакати карткою?»"
      },
      {
        "q": "What advice does the speaker give to beginners?",
        "options": [
          "Learn all seven cases before speaking",
          "Only talk to your teacher at first",
          "Start speaking now, mistakes and all",
          "Read a book in the original every month"
        ],
        "answer": 2,
        "explain": "«Не чекайте, доки заговорите ідеально» and «Говоріть уже сьогодні — з помилками, з акцентом, але говоріть!»"
      }
    ]
  },
  {
    "id": "uk-letter-from-kyiv",
    "kind": "everyday",
    "level": "A2",
    "title": "A Letter from Kyiv",
    "titleNative": "Лист із Києва",
    "summary": "Marta, a young woman who has moved from Odesa to Kyiv, writes a long message to her friend Ira about her flat, her neighbourhood, her daily routine and her weekends, and invites her to visit.",
    "register": "casual",
    "lines": [
      {
        "tr": "Привіт, Іро!",
        "en": "Hi, Ira!"
      },
      {
        "tr": "Вибач, що так довго не писала — у мене було багато справ.",
        "en": "Sorry I haven't written for so long – I've had a lot to do."
      },
      {
        "tr": "Я вже місяць живу в Києві, і мені тут дуже подобається.",
        "en": "I've been living in Kyiv for a month now, and I really like it here."
      },
      {
        "tr": "Я винаймаю невелику квартиру на п’ятому поверсі.",
        "en": "I'm renting a small flat on the fifth floor."
      },
      {
        "tr": "У ній є одна кімната, маленька кухня й балкон, де я вранці п’ю каву.",
        "en": "It has one room, a little kitchen and a balcony where I drink my coffee in the morning."
      },
      {
        "tr": "Мій район тихий і зелений, а поруч із будинком є великий парк.",
        "en": "My neighbourhood is quiet and green, and there's a big park right next to the building."
      },
      {
        "tr": "До метро лише десять хвилин пішки.",
        "en": "It's only ten minutes on foot to the metro."
      },
      {
        "tr": "Щодня я встаю о сьомій, снідаю та їду на роботу.",
        "en": "Every day I get up at seven, have breakfast and go to work."
      },
      {
        "tr": "Дорога до офісу забирає приблизно пів години.",
        "en": "The journey to the office takes about half an hour."
      },
      {
        "tr": "Я працюю з дев’ятої до шостої, а в обід ходжу з колегами до їдальні.",
        "en": "I work from nine to six, and at lunchtime I go to the canteen with my colleagues."
      },
      {
        "tr": "Після роботи я купую продукти в магазині біля дому й готую вечерю.",
        "en": "After work I buy groceries at the shop near my place and make dinner."
      },
      {
        "tr": "Учора я вперше сама зварила борщ, і він вийшов дуже смачний!",
        "en": "Yesterday I made borscht all by myself for the first time, and it turned out really tasty!"
      },
      {
        "tr": "А біля метро є маленька пекарня, де продають найсмачніші у світі булочки з маком.",
        "en": "And near the metro there's a little bakery that sells the most delicious poppy-seed buns in the world."
      },
      {
        "tr": "У вихідні я зазвичай гуляю в центрі або ходжу на ринок по свіжі овочі та фрукти.",
        "en": "At weekends I usually walk around the centre or go to the market for fresh vegetables and fruit."
      },
      {
        "tr": "Минулої неділі я була на Андріївському узвозі й купила там гарну листівку для тебе.",
        "en": "Last Sunday I went to Andriivskyi Descent and bought a pretty postcard for you there."
      },
      {
        "tr": "Потім я довго сиділа біля Дніпра й дивилася на мости.",
        "en": "Then I sat by the Dnipro for a long time and looked at the bridges."
      },
      {
        "tr": "Київ дуже великий, і я ще не все тут бачила.",
        "en": "Kyiv is very big, and I haven't seen everything here yet."
      },
      {
        "tr": "Але я трохи сумую за Одесою, за морем і, звісно, за тобою.",
        "en": "But I do miss Odesa a little, and the sea, and you, of course."
      },
      {
        "tr": "Тому маю ідею: приїжджай до мене в гості на вихідні!",
        "en": "So I've got an idea: come and visit me for a weekend!"
      },
      {
        "tr": "Нічний потяг з Одеси приїжджає о сьомій ранку, і я зустріну тебе на вокзалі.",
        "en": "The night train from Odesa gets in at seven in the morning, and I'll meet you at the station."
      },
      {
        "tr": "Ти можеш спати на дивані, він великий і зручний.",
        "en": "You can sleep on the sofa – it's big and comfortable."
      },
      {
        "tr": "Я покажу тобі місто, а ввечері ми підемо до моєї улюбленої кав’ярні.",
        "en": "I'll show you the city, and in the evening we'll go to my favourite café."
      },
      {
        "tr": "Напиши, коли зможеш приїхати.",
        "en": "Write and tell me when you can come."
      },
      {
        "tr": "Чекаю на твою відповідь і міцно обіймаю!",
        "en": "Looking forward to your reply – big hugs!"
      },
      {
        "tr": "Твоя Марта.",
        "en": "Yours, Marta."
      }
    ],
    "glossary": [
      {
        "tr": "Вибач",
        "en": "sorry (informal, to one person)"
      },
      {
        "tr": "винаймаю",
        "en": "I rent (винаймати)"
      },
      {
        "tr": "на п’ятому поверсі",
        "en": "on the fifth floor (поверх – floor)"
      },
      {
        "tr": "район",
        "en": "neighbourhood, district"
      },
      {
        "tr": "поруч із будинком",
        "en": "next to the building"
      },
      {
        "tr": "пішки",
        "en": "on foot"
      },
      {
        "tr": "снідаю",
        "en": "I have breakfast (снідати)"
      },
      {
        "tr": "пів години",
        "en": "half an hour"
      },
      {
        "tr": "їдальні",
        "en": "canteen (їдальня)"
      },
      {
        "tr": "продукти",
        "en": "groceries, food"
      },
      {
        "tr": "пекарня",
        "en": "bakery"
      },
      {
        "tr": "булочки з маком",
        "en": "poppy-seed buns"
      },
      {
        "tr": "зазвичай",
        "en": "usually"
      },
      {
        "tr": "листівку",
        "en": "postcard (листівка)"
      },
      {
        "tr": "сумую за",
        "en": "I miss (сумувати за + instrumental)"
      },
      {
        "tr": "в гості",
        "en": "on a visit (приїжджати в гості – to come and visit)"
      },
      {
        "tr": "зустріну тебе на вокзалі",
        "en": "I'll meet you at the station"
      },
      {
        "tr": "міцно обіймаю",
        "en": "big hugs (lit. I hug you tight)"
      }
    ],
    "questions": [
      {
        "q": "How long has Marta been living in Kyiv?",
        "options": [
          "A week",
          "A year",
          "A month",
          "Half a year"
        ],
        "answer": 2,
        "explain": "«Я вже місяць живу в Києві» – for a month now."
      },
      {
        "q": "How far is it from her flat to the metro?",
        "options": [
          "Ten minutes on foot",
          "Half an hour by bus",
          "Five minutes by car",
          "An hour on foot"
        ],
        "answer": 0,
        "explain": "«До метро лише десять хвилин пішки.» Half an hour is the journey to the office."
      },
      {
        "q": "What did Marta cook by herself for the first time?",
        "options": [
          "Poppy-seed buns",
          "Dumplings",
          "Fish soup",
          "Borscht"
        ],
        "answer": 3,
        "explain": "«Учора я вперше сама зварила борщ, і він вийшов дуже смачний!»"
      },
      {
        "q": "Where will Ira sleep if she comes to visit?",
        "options": [
          "In a hotel near the station",
          "On Marta's sofa",
          "On the balcony",
          "At a colleague's flat"
        ],
        "answer": 1,
        "explain": "«Ти можеш спати на дивані, він великий і зручний.»"
      }
    ]
  },
  {
    "id": "uk-job-interview",
    "kind": "dialogue",
    "level": "B1",
    "title": "A Job Interview",
    "titleNative": "Співбесіда",
    "summary": "Andrii has an interview for a manager's job at a travel company; Olena asks about his background, experience, strengths and languages, and he asks about the hours and the start date.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Olena",
        "tr": "Добрий день, пане Андрію, проходьте, будь ласка, сідайте.",
        "en": "Good afternoon, Mr Andrii, please come in and take a seat."
      },
      {
        "speaker": "Andrii",
        "tr": "Добрий день, пані Олено, дякую, що запросили мене на співбесіду.",
        "en": "Good afternoon, Ms Olena, thank you for inviting me to the interview."
      },
      {
        "speaker": "Olena",
        "tr": "Ви подали резюме на посаду менеджера в нашій туристичній компанії.",
        "en": "You've applied for the position of manager at our travel company."
      },
      {
        "speaker": "Olena",
        "tr": "Розкажіть, будь ласка, трохи про себе.",
        "en": "Please tell me a little about yourself."
      },
      {
        "speaker": "Andrii",
        "tr": "Мені двадцять вісім років, я закінчив університет у Харкові за спеціальністю «Туризм».",
        "en": "I'm twenty-eight, and I graduated from university in Kharkiv with a degree in tourism."
      },
      {
        "speaker": "Andrii",
        "tr": "Останні чотири роки я працюю адміністратором у невеликому готелі.",
        "en": "For the last four years I've been working as a receptionist at a small hotel."
      },
      {
        "speaker": "Olena",
        "tr": "А чому ви вирішили змінити роботу?",
        "en": "And why have you decided to change jobs?"
      },
      {
        "speaker": "Andrii",
        "tr": "Мені подобається моя робота, але я хочу розвиватися й працювати в більшій команді.",
        "en": "I like my job, but I want to grow and work in a bigger team."
      },
      {
        "speaker": "Olena",
        "tr": "Зрозуміло, а які у вас зараз обов’язки?",
        "en": "I see, and what are your duties at the moment?"
      },
      {
        "speaker": "Andrii",
        "tr": "Я зустрічаю гостей, відповідаю на дзвінки й листи та розв’язую проблеми, якщо вони виникають.",
        "en": "I welcome guests, answer calls and emails, and sort out problems if they come up."
      },
      {
        "speaker": "Olena",
        "tr": "А які ваші сильні сторони?",
        "en": "And what are your strengths?"
      },
      {
        "speaker": "Andrii",
        "tr": "Я відповідальний, уважний до деталей і вмію зберігати спокій у стресових ситуаціях.",
        "en": "I'm responsible, I pay attention to detail, and I can keep calm in stressful situations."
      },
      {
        "speaker": "Olena",
        "tr": "Наші клієнти — здебільшого іноземці, тож скажіть, якими мовами ви володієте?",
        "en": "Our clients are mostly foreigners, so tell me, which languages do you speak?"
      },
      {
        "speaker": "Andrii",
        "tr": "Я вільно розмовляю англійською, добре знаю польську й трохи розумію німецьку.",
        "en": "I speak English fluently, I know Polish well and I understand a little German."
      },
      {
        "speaker": "Olena",
        "tr": "Чудово, а чи маєте ви запитання до мене?",
        "en": "Excellent, and do you have any questions for me?"
      },
      {
        "speaker": "Andrii",
        "tr": "Так, скажіть, будь ласка, який у вас графік роботи?",
        "en": "Yes, could you tell me, please, what the working hours are?"
      },
      {
        "speaker": "Olena",
        "tr": "Ми працюємо з понеділка до п’ятниці, з дев’ятої до вісімнадцятої, з перервою на обід.",
        "en": "We work Monday to Friday, from 9 a.m. to 6 p.m., with a break for lunch."
      },
      {
        "speaker": "Olena",
        "tr": "Раз на місяць потрібно чергувати в суботу, але за це ми даємо додатковий вихідний.",
        "en": "Once a month you have to be on duty on a Saturday, but we give an extra day off for that."
      },
      {
        "speaker": "Andrii",
        "tr": "Мене це цілком влаштовує, а коли потрібно буде стати до роботи?",
        "en": "That suits me perfectly, and when would I need to start work?"
      },
      {
        "speaker": "Olena",
        "tr": "Нам потрібна людина вже з першого числа наступного місяця.",
        "en": "We need someone from the first of next month."
      },
      {
        "speaker": "Andrii",
        "tr": "Це мені підходить, бо про звільнення я маю попередити за два тижні.",
        "en": "That works for me, because I have to give two weeks' notice before I leave."
      },
      {
        "speaker": "Olena",
        "tr": "Добре, ми зателефонуємо вам до кінця тижня й повідомимо про своє рішення.",
        "en": "Good, we'll call you by the end of the week and let you know our decision."
      },
      {
        "speaker": "Andrii",
        "tr": "Щиро дякую за розмову, пані Олено, чекатиму на ваш дзвінок.",
        "en": "Thank you very much for the conversation, Ms Olena, I'll be waiting for your call."
      },
      {
        "speaker": "Olena",
        "tr": "Дякую й вам, пане Андрію, на все добре!",
        "en": "Thank you too, Mr Andrii, all the best!"
      },
      {
        "speaker": "Andrii",
        "tr": "До побачення, гарного вам дня!",
        "en": "Goodbye, have a nice day!"
      }
    ],
    "glossary": [
      {
        "tr": "пане Андрію",
        "en": "polite address to a man: пан + first name, both in the vocative (Андрій → Андрію)"
      },
      {
        "tr": "на співбесіду",
        "en": "to the interview (співбесіда – job interview)"
      },
      {
        "tr": "на посаду",
        "en": "for the position (посада – post, job)"
      },
      {
        "tr": "за спеціальністю",
        "en": "with a degree in, majoring in (спеціальність)"
      },
      {
        "tr": "розвиватися",
        "en": "to develop, to grow (professionally)"
      },
      {
        "tr": "обов’язки",
        "en": "duties, responsibilities (обов’язок)"
      },
      {
        "tr": "сильні сторони",
        "en": "strengths, strong points"
      },
      {
        "tr": "уважний до деталей",
        "en": "attentive to detail (said of a man)"
      },
      {
        "tr": "зберігати спокій",
        "en": "to keep calm"
      },
      {
        "tr": "здебільшого",
        "en": "mostly, for the most part"
      },
      {
        "tr": "володієте",
        "en": "you speak, you have a command of (володіти + instrumental)"
      },
      {
        "tr": "вільно розмовляю",
        "en": "I speak fluently"
      },
      {
        "tr": "графік роботи",
        "en": "working hours, work schedule"
      },
      {
        "tr": "з перервою на обід",
        "en": "with a lunch break (перерва – break)"
      },
      {
        "tr": "чергувати",
        "en": "to be on duty"
      },
      {
        "tr": "додатковий вихідний",
        "en": "an extra day off"
      },
      {
        "tr": "стати до роботи",
        "en": "to start work (set phrase)"
      },
      {
        "tr": "попередити",
        "en": "to give notice, to warn in advance"
      }
    ],
    "questions": [
      {
        "q": "Which job is Andrii being interviewed for?",
        "options": [
          "Receptionist at a small hotel",
          "Manager at a travel company",
          "Tour guide in Kharkiv",
          "Teacher of English"
        ],
        "answer": 1,
        "explain": "«Ви подали резюме на посаду менеджера в нашій туристичній компанії.» The hotel is where he works now."
      },
      {
        "q": "Why does he want to change jobs?",
        "options": [
          "He doesn't like his current job",
          "He wants a higher salary",
          "His hotel is closing",
          "He wants to grow and work in a bigger team"
        ],
        "answer": 3,
        "explain": "«Мені подобається моя робота, але я хочу розвиватися й працювати в більшій команді.»"
      },
      {
        "q": "Which language does Andrii say he speaks fluently?",
        "options": [
          "English",
          "Polish",
          "German",
          "French"
        ],
        "answer": 0,
        "explain": "«Я вільно розмовляю англійською, добре знаю польську й трохи розумію німецьку.»"
      },
      {
        "q": "When does the company need the new person to start?",
        "options": [
          "Next Monday",
          "In two weeks",
          "On the first of next month",
          "At the end of the week"
        ],
        "answer": 2,
        "explain": "«Нам потрібна людина вже з першого числа наступного місяця.» Two weeks is the notice he must give; the end of the week is when they will call."
      }
    ]
  }
];
