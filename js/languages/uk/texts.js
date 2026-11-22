// Read & Listen: graded dialogues, stories, everyday texts and short speeches.
// Each text: { id, kind, level, title, titleNative, summary, dialect?, register?,
//   lines: [{ speaker?, tr, en }], glossary: [{ tr, en }],
//   questions: [{ q, options[4], answer, explain }] }.
// Written by one author and checked line by line by a native-level reviewer; edit freely.
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
  }
];
