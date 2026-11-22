// Read & Listen: graded dialogues, stories, everyday texts and short speeches.
// Each text: { id, kind, level, title, titleNative, summary, dialect?, register?,
//   lines: [{ speaker?, tr, en, tl }], glossary: [{ tr, en, tl }],
//   questions: [{ q, options[4], answer, explain }] }.
// Written by one author and checked line by line by a native-level reviewer; edit freely.
// Loaded on demand (not at startup).
export const texts = [
  {
    "id": "the-new-neighbour",
    "kind": "dialogue",
    "level": "A1",
    "title": "The New Neighbour",
    "titleNative": "الْجَارَةُ الْجَدِيدَةُ",
    "summary": "Samir welcomes Huda, who has just moved into the flat opposite his, and tells her about the area.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Samir",
        "tr": "مَسَاءُ الْخَيْرِ، هَلْ أَنْتِ الْجَارَةُ الْجَدِيدَةُ؟",
        "en": "Good evening, are you the new neighbour?",
        "tl": "masāʾu-l-khayri hal ʾanti-l-jāratu-l-jadīda"
      },
      {
        "speaker": "Huda",
        "tr": "نَعَمْ، أَنَا هُدَى، وَصَلْتُ أَمْسِ.",
        "en": "Yes, I’m Huda. I arrived yesterday.",
        "tl": "naʿam ʾanā hudā waṣaltu ʾams"
      },
      {
        "speaker": "Samir",
        "tr": "أَهْلًا وَسَهْلًا، أَنَا سَمِيرٌ، جَارُكِ فِي الشَّقَّةِ الْمُقَابِلَةِ.",
        "en": "Welcome! I’m Samir, your neighbour in the flat opposite.",
        "tl": "ʾahlan wa-sahlan ʾanā samīrun jāruki fī-sh-shaqqati-l-muqābila"
      },
      {
        "speaker": "Huda",
        "tr": "تَشَرَّفْتُ بِمَعْرِفَتِكَ.",
        "en": "Pleased to meet you.",
        "tl": "tasharraftu bi-maʿrifatik"
      },
      {
        "speaker": "Samir",
        "tr": "هَلْ تَحْتَاجِينَ إِلَى أَيِّ مُسَاعَدَةٍ؟",
        "en": "Do you need any help?",
        "tl": "hal taḥtājīna ʾilā ʾayyi musāʿada"
      },
      {
        "speaker": "Huda",
        "tr": "شُكْرًا جَزِيلًا، هَلْ يُوجَدُ مَخْبَزٌ قَرِيبٌ مِنْ هُنَا؟",
        "en": "Thank you very much. Is there a bakery near here?",
        "tl": "shukran jazīlan hal yūjadu makhbazun qarībun min hunā"
      },
      {
        "speaker": "Samir",
        "tr": "نَعَمْ، هُنَاكَ مَخْبَزٌ مُمْتَازٌ فِي آخِرِ الشَّارِعِ.",
        "en": "Yes, there’s an excellent bakery at the end of the street.",
        "tl": "naʿam hunāka makhbazun mumtāzun fī ʾākhiri-sh-shāriʿ"
      },
      {
        "speaker": "Huda",
        "tr": "رَائِعٌ، وَمَتَى تُجْمَعُ الْقُمَامَةُ هُنَا؟",
        "en": "Great. And when is the rubbish collected here?",
        "tl": "rāʾiʿun wa-matā tujmaʿu-l-qumāmatu hunā"
      },
      {
        "speaker": "Samir",
        "tr": "كُلَّ يَوْمٍ فِي الصَّبَاحِ الْبَاكِرِ.",
        "en": "Every day, early in the morning.",
        "tl": "kulla yawmin fī-ṣ-ṣabāḥi-l-bākir"
      },
      {
        "speaker": "Samir",
        "tr": "وَإِذَا احْتَجْتِ أَيَّ شَيْءٍ، فَأَنَا هُنَا.",
        "en": "And if you need anything, I’m right here.",
        "tl": "wa-ʾidhā-ḥtajti ʾayya shayʾin fa-ʾanā hunā"
      },
      {
        "speaker": "Huda",
        "tr": "هَذَا لُطْفٌ كَبِيرٌ مِنْكَ، شُكْرًا لَكَ.",
        "en": "That’s very kind of you, thank you.",
        "tl": "hādhā luṭfun kabīrun minka shukran lak"
      },
      {
        "speaker": "Samir",
        "tr": "عَفْوًا، وَمَرْحَبًا بِكِ فِي الْعِمَارَةِ.",
        "en": "You’re welcome — and welcome to the building.",
        "tl": "ʿafwan wa-marḥaban biki fī-l-ʿimāra"
      }
    ],
    "glossary": [
      {
        "tr": "الْجَارَةُ",
        "en": "the neighbour (a woman); a man is جَار",
        "tl": "al-jāra"
      },
      {
        "tr": "وَصَلْتُ",
        "en": "I arrived",
        "tl": "waṣalt"
      },
      {
        "tr": "الشَّقَّةِ",
        "en": "the flat, the apartment",
        "tl": "ash-shaqqa"
      },
      {
        "tr": "الْمُقَابِلَةِ",
        "en": "opposite, across the landing",
        "tl": "al-muqābila"
      },
      {
        "tr": "تَشَرَّفْتُ بِمَعْرِفَتِكَ",
        "en": "pleased to meet you (literally “I am honoured to know you”)",
        "tl": "tasharraft bi-maʿrifatik"
      },
      {
        "tr": "مَخْبَزٌ",
        "en": "a bakery",
        "tl": "makhbaz"
      },
      {
        "tr": "آخِرِ الشَّارِعِ",
        "en": "the end of the street",
        "tl": "ʾākhir ash-shāriʿ"
      },
      {
        "tr": "الْقُمَامَةُ",
        "en": "the rubbish, the trash",
        "tl": "al-qumāma"
      },
      {
        "tr": "إِذَا احْتَجْتِ",
        "en": "if you need (said to a woman)",
        "tl": "ʾidhā-ḥtajti"
      },
      {
        "tr": "الْعِمَارَةِ",
        "en": "the apartment building",
        "tl": "al-ʿimāra"
      }
    ],
    "questions": [
      {
        "q": "When did Huda arrive?",
        "options": [
          "Last week",
          "This morning",
          "Yesterday",
          "Today at noon"
        ],
        "answer": 2,
        "explain": "She says وَصَلْتُ أَمْسِ — “I arrived yesterday.”"
      },
      {
        "q": "Where does Samir live?",
        "options": [
          "Above the bakery",
          "In the flat opposite Huda’s",
          "In another building",
          "On the ground floor"
        ],
        "answer": 1,
        "explain": "He is جَارُكِ فِي الشَّقَّةِ الْمُقَابِلَةِ — her neighbour in the flat opposite."
      },
      {
        "q": "What is Huda looking for?",
        "options": [
          "A bakery nearby",
          "A pharmacy",
          "A bus stop",
          "A supermarket"
        ],
        "answer": 0,
        "explain": "She asks هَلْ يُوجَدُ مَخْبَزٌ قَرِيبٌ — is there a bakery nearby?"
      },
      {
        "q": "When is the rubbish collected?",
        "options": [
          "Twice a week",
          "Every evening",
          "On Fridays only",
          "Every day, early in the morning"
        ],
        "answer": 3,
        "explain": "Samir says كُلَّ يَوْمٍ فِي الصَّبَاحِ الْبَاكِرِ."
      }
    ]
  },
  {
    "id": "asking-the-way",
    "kind": "dialogue",
    "level": "A1",
    "title": "Asking the Way",
    "titleNative": "السُّؤَالُ عَنِ الطَّرِيقِ",
    "summary": "A tourist politely asks a woman in the street how to get to the train station.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Tourist",
        "tr": "عَفْوًا، لَوْ سَمَحْتِ، أَيْنَ مَحَطَّةُ الْقِطَارِ؟",
        "en": "Excuse me, please — where is the train station?",
        "tl": "ʿafwan law samaḥti ʾayna maḥaṭṭatu-l-qiṭār"
      },
      {
        "speaker": "Passer-by",
        "tr": "مَحَطَّةُ الْقِطَارِ بَعِيدَةٌ قَلِيلًا عَنْ هُنَا.",
        "en": "The train station is a little far from here.",
        "tl": "maḥaṭṭatu-l-qiṭāri baʿīdatun qalīlan ʿan hunā"
      },
      {
        "speaker": "Tourist",
        "tr": "هَلْ أَسْتَطِيعُ أَنْ أَمْشِيَ إِلَيْهَا؟",
        "en": "Can I walk there?",
        "tl": "hal ʾastaṭīʿu ʾan ʾamshiya ʾilayhā"
      },
      {
        "speaker": "Passer-by",
        "tr": "نَعَمْ، تَحْتَاجُ إِلَى عِشْرِينَ دَقِيقَةً تَقْرِيبًا.",
        "en": "Yes, it takes about twenty minutes.",
        "tl": "naʿam taḥtāju ʾilā ʿishrīna daqīqatan taqrīban"
      },
      {
        "speaker": "Passer-by",
        "tr": "اِمْشِ مُبَاشَرَةً حَتَّى الْإِشَارَةِ.",
        "en": "Go straight on as far as the traffic lights.",
        "tl": "imshi mubāsharatan ḥattā-l-ʾishāra"
      },
      {
        "speaker": "Passer-by",
        "tr": "ثُمَّ خُذِ الشَّارِعَ الْأَوَّلَ عَلَى الْيَمِينِ.",
        "en": "Then take the first street on the right.",
        "tl": "thumma khudhi-sh-shāriʿa-l-ʾawwala ʿalā-l-yamīn"
      },
      {
        "speaker": "Tourist",
        "tr": "الشَّارِعُ الْأَوَّلُ عَلَى الْيَمِينِ، وَبَعْدَ ذَلِكَ؟",
        "en": "The first street on the right — and after that?",
        "tl": "ash-shāriʿu-l-ʾawwalu ʿalā-l-yamīni wa-baʿda dhālik"
      },
      {
        "speaker": "Passer-by",
        "tr": "سَتَرَى الْمَحَطَّةَ أَمَامَكَ، بِجَانِبِ مَكْتَبِ الْبَرِيدِ.",
        "en": "You’ll see the station in front of you, next to the post office.",
        "tl": "sa-tarā-l-maḥaṭṭata ʾamāmaka bi-jānibi maktabi-l-barīd"
      },
      {
        "speaker": "Tourist",
        "tr": "وَهَلْ هُنَاكَ حَافِلَةٌ إِلَى الْمَحَطَّةِ؟",
        "en": "And is there a bus to the station?",
        "tl": "wa-hal hunāka ḥāfilatun ʾilā-l-maḥaṭṭa"
      },
      {
        "speaker": "Passer-by",
        "tr": "نَعَمْ، وَالْمَوْقِفُ هُنَاكَ، أَمَامَ الْمَقْهَى.",
        "en": "Yes, and the stop is over there, in front of the café.",
        "tl": "naʿam wa-l-mawqifu hunāka ʾamāma-l-maqhā"
      },
      {
        "speaker": "Tourist",
        "tr": "شُكْرًا جَزِيلًا عَلَى مُسَاعَدَتِكِ.",
        "en": "Thank you very much for your help.",
        "tl": "shukran jazīlan ʿalā musāʿadatik"
      },
      {
        "speaker": "Passer-by",
        "tr": "عَفْوًا، رِحْلَةً سَعِيدَةً!",
        "en": "You’re welcome — have a good trip!",
        "tl": "ʿafwan riḥlatan saʿīda"
      }
    ],
    "glossary": [
      {
        "tr": "لَوْ سَمَحْتِ",
        "en": "please, excuse me (to a woman)",
        "tl": "law samaḥti"
      },
      {
        "tr": "مَحَطَّةُ الْقِطَارِ",
        "en": "the train station",
        "tl": "maḥaṭṭat al-qiṭār"
      },
      {
        "tr": "بَعِيدَةٌ",
        "en": "far (describing a feminine noun)",
        "tl": "baʿīda"
      },
      {
        "tr": "اِمْشِ",
        "en": "walk, go (to a man)",
        "tl": "imshi"
      },
      {
        "tr": "مُبَاشَرَةً",
        "en": "straight on; directly",
        "tl": "mubāsharatan"
      },
      {
        "tr": "الْإِشَارَةِ",
        "en": "the traffic lights",
        "tl": "al-ʾishāra"
      },
      {
        "tr": "عَلَى الْيَمِينِ",
        "en": "on the right",
        "tl": "ʿalā-l-yamīn"
      },
      {
        "tr": "مَكْتَبِ الْبَرِيدِ",
        "en": "the post office",
        "tl": "maktab al-barīd"
      },
      {
        "tr": "الْمَوْقِفُ",
        "en": "the (bus) stop",
        "tl": "al-mawqif"
      }
    ],
    "questions": [
      {
        "q": "Where does the tourist want to go?",
        "options": [
          "The post office",
          "The train station",
          "A café",
          "The bus station"
        ],
        "answer": 1,
        "explain": "He asks أَيْنَ مَحَطَّةُ الْقِطَارِ؟"
      },
      {
        "q": "How long does it take to walk there?",
        "options": [
          "About twenty minutes",
          "Five minutes",
          "An hour",
          "Ten minutes"
        ],
        "answer": 0,
        "explain": "تَحْتَاجُ إِلَى عِشْرِينَ دَقِيقَةً تَقْرِيبًا — about twenty minutes."
      },
      {
        "q": "What is next to the station?",
        "options": [
          "A bakery",
          "A bank",
          "The traffic lights",
          "The post office"
        ],
        "answer": 3,
        "explain": "بِجَانِبِ مَكْتَبِ الْبَرِيدِ — next to the post office."
      },
      {
        "q": "Where is the bus stop?",
        "options": [
          "Next to the station",
          "In front of the café",
          "On the first street on the right",
          "At the traffic lights"
        ],
        "answer": 1,
        "explain": "الْمَوْقِفُ هُنَاكَ، أَمَامَ الْمَقْهَى — in front of the café."
      }
    ]
  },
  {
    "id": "coffee-for-two",
    "kind": "dialogue",
    "level": "A1",
    "title": "Coffee for Two",
    "titleNative": "فِي الْكَافِيه",
    "summary": "Two friends in a Cairo café chat casually with each other and order politely from the waiter.",
    "dialect": "Egyptian",
    "register": "mixed",
    "lines": [
      {
        "speaker": "Karim",
        "tr": "تِشْرَبِي إِيه يَا مُنَى؟",
        "en": "What are you having, Mona?",
        "tl": "tishrabi ʾēh ya mona"
      },
      {
        "speaker": "Mona",
        "tr": "مِشْ عَارْفَة، يِمْكِن قَهْوَة بِاللَّبَن.",
        "en": "Not sure… maybe a coffee with milk.",
        "tl": "mish ʿarfa yimkin ʾahwa bi-l-laban"
      },
      {
        "speaker": "Karim",
        "tr": "وِأَنَا عَايِز شَاي بِالنِّعْنَاع.",
        "en": "And I want a mint tea.",
        "tl": "wi-ʾana ʿāyiz shāy bi-n-niʿnāʿ"
      },
      {
        "speaker": "Karim",
        "tr": "لَوْ سَمَحْت!",
        "en": "Excuse me!",
        "tl": "law samaḥt"
      },
      {
        "speaker": "Waiter",
        "tr": "أَيْوَه يَا فَنْدِم، تُؤْمُرُوا بِإِيه؟",
        "en": "Yes, sir — what can I get you?",
        "tl": "ʾaywa ya fandim tuʾmuru bi-ʾēh"
      },
      {
        "speaker": "Karim",
        "tr": "عَايْزِين وَاحِد قَهْوَة بِاللَّبَن وِوَاحِد شَاي بِالنِّعْنَاع.",
        "en": "We’d like one coffee with milk and one mint tea.",
        "tl": "ʿayzīn wāḥid ʾahwa bi-l-laban wi-wāḥid shāy bi-n-niʿnāʿ"
      },
      {
        "speaker": "Waiter",
        "tr": "حَاضِر، تِحِبُّوا تَاكْلُوا حَاجَة؟",
        "en": "Certainly. Would you like something to eat?",
        "tl": "ḥāḍir tiḥibbu taklu ḥāga"
      },
      {
        "speaker": "Mona",
        "tr": "عَنْدُكُم كِيكِة شُوكُولَاتَة؟",
        "en": "Do you have chocolate cake?",
        "tl": "ʿandukum kēkit shokolāta"
      },
      {
        "speaker": "Waiter",
        "tr": "أَيْوَه عَنْدِنَا، وِهِيَّ طَازَة النَّهَارْدَه.",
        "en": "Yes, we do, and it’s fresh today.",
        "tl": "ʾaywa ʿandina wi-hiyya ṭāza-n-nahārda"
      },
      {
        "speaker": "Mona",
        "tr": "تَمَام، حِتَّة وَاحْدَة لَوْ سَمَحْت.",
        "en": "Great — one slice, please.",
        "tl": "tamām ḥitta waḥda law samaḥt"
      },
      {
        "speaker": "Karim",
        "tr": "وِمُمْكِن إِزَازِة مَيَّة كَمَان؟",
        "en": "And could we have a bottle of water too?",
        "tl": "wi-mumkin ʾizāzit mayya kamān"
      },
      {
        "speaker": "Waiter",
        "tr": "تَحْت أَمْرَك يَا فَنْدِم، خَمَس دَقَايِق.",
        "en": "At your service, sir. Five minutes.",
        "tl": "taḥt ʾamrak ya fandim khamas daʾāyiʾ"
      },
      {
        "speaker": "Mona",
        "tr": "الْمَكَان هِنَا حِلْو أَوِي، صَحّ؟",
        "en": "This place is really nice, isn’t it?",
        "tl": "il-makān hina ḥilw ʾawi ṣaḥḥ"
      },
      {
        "speaker": "Karim",
        "tr": "آه، وِالْقَهْوَة هِنَا جَامْدَة!",
        "en": "Yeah, and the coffee here is amazing!",
        "tl": "ʾāh wi-l-ʾahwa hina gamda"
      }
    ],
    "glossary": [
      {
        "tr": "تِشْرَبِي إِيه",
        "en": "what will you drink? (to a woman)",
        "tl": "tishrabi ʾēh"
      },
      {
        "tr": "مِشْ عَارْفَة",
        "en": "I don’t know (a woman speaking)",
        "tl": "mish ʿarfa"
      },
      {
        "tr": "قَهْوَة بِاللَّبَن",
        "en": "coffee with milk; in Egypt قَهْوَة (ʾahwa) also means a café",
        "tl": "ʾahwa bi-l-laban"
      },
      {
        "tr": "عَايِز",
        "en": "I want (a man speaking); a woman says عَايْزَة, a group عَايْزِين",
        "tl": "ʿāyiz"
      },
      {
        "tr": "يَا فَنْدِم",
        "en": "sir / madam — a polite way to address customers",
        "tl": "ya fandim"
      },
      {
        "tr": "حَاضِر",
        "en": "certainly, right away",
        "tl": "ḥāḍir"
      },
      {
        "tr": "طَازَة",
        "en": "fresh",
        "tl": "ṭāza"
      },
      {
        "tr": "حِتَّة",
        "en": "a piece, a slice",
        "tl": "ḥitta"
      },
      {
        "tr": "تَحْت أَمْرَك",
        "en": "at your service",
        "tl": "taḥt ʾamrak"
      },
      {
        "tr": "جَامْدَة",
        "en": "great, amazing (slang; describing a feminine noun)",
        "tl": "gamda"
      }
    ],
    "questions": [
      {
        "q": "What does Mona order to drink?",
        "options": [
          "Mint tea",
          "Coffee with milk",
          "A bottle of water",
          "Orange juice"
        ],
        "answer": 1,
        "explain": "She says يِمْكِن قَهْوَة بِاللَّبَن, and Karim orders it for her."
      },
      {
        "q": "What do they order to eat?",
        "options": [
          "Nothing",
          "A cheese sandwich",
          "A slice of chocolate cake",
          "Two pieces of cake"
        ],
        "answer": 2,
        "explain": "Mona asks for كِيكِة شُوكُولَاتَة and orders حِتَّة وَاحْدَة — one slice."
      },
      {
        "q": "How long will the order take?",
        "options": [
          "Five minutes",
          "Ten minutes",
          "Half an hour",
          "It’s already ready"
        ],
        "answer": 0,
        "explain": "The waiter says خَمَس دَقَايِق — five minutes."
      },
      {
        "q": "Which phrase shows the waiter speaking politely?",
        "options": [
          "صَحّ؟",
          "جَامْدَة",
          "مِشْ عَارْفَة",
          "يَا فَنْدِم"
        ],
        "answer": 3,
        "explain": "يَا فَنْدِم (sir/madam) is how staff address customers politely; the friends speak casually to each other."
      }
    ]
  },
  {
    "id": "haggling-at-the-market",
    "kind": "dialogue",
    "level": "A2",
    "title": "Haggling at the Market",
    "titleNative": "الْفِصَال فِي السُّوق",
    "summary": "A woman bargains for a cotton shawl at a Cairo market stall and asks about returns and paying by card.",
    "dialect": "Egyptian",
    "register": "mixed",
    "lines": [
      {
        "speaker": "Customer",
        "tr": "لَوْ سَمَحْت، الشَّال دَه بِكَام؟",
        "en": "Excuse me, how much is this shawl?",
        "tl": "law samaḥt ish-shāl da bi-kām"
      },
      {
        "speaker": "Seller",
        "tr": "دَه قُطْن مِيَّة فِي الْمِيَّة يَا مَدَام، بِمِيتِين جِنِيه.",
        "en": "It’s a hundred percent cotton, madam — two hundred pounds.",
        "tl": "da ʾuṭn miyya fi-l-miyya ya madām bi-mitēn ginēh"
      },
      {
        "speaker": "Customer",
        "tr": "دَه غَالِي أَوِي، مُمْكِن تِنَزِّل شْوَيَّة؟",
        "en": "That’s really expensive. Could you bring it down a bit?",
        "tl": "da ghāli ʾawi mumkin tinazzil shwayya"
      },
      {
        "speaker": "Seller",
        "tr": "عَشَانِك إِنْتِي، مِيَّة وِتِسْعِين.",
        "en": "Just for you, a hundred and ninety.",
        "tl": "ʿashānik ʾinti miyya wi-tisʿīn"
      },
      {
        "speaker": "Customer",
        "tr": "لَأ، بَرْضُه كِتِير، هَدْفَع مِيَّة وِخَمْسِين.",
        "en": "No, that’s still a lot. I’ll pay a hundred and fifty.",
        "tl": "laʾ barḍu kitīr hadfaʿ miyya wi-khamsīn"
      },
      {
        "speaker": "Seller",
        "tr": "لَأ يَا مَدَام، كِدَه أَنَا هَخْسَر.",
        "en": "No, madam, I’d lose money at that price.",
        "tl": "laʾ ya madām kida ʾana hakhsar"
      },
      {
        "speaker": "Seller",
        "tr": "خَلِّيهَا مِيَّة وِسَبْعِين، وِدَه آخِر كَلَام.",
        "en": "Let’s say a hundred and seventy, and that’s my final offer.",
        "tl": "khallīha miyya wi-sabʿīn wi-da ʾākhir kalām"
      },
      {
        "speaker": "Customer",
        "tr": "مَاشِي، بَسّ عَايْزَة لُون تَانِي.",
        "en": "OK, but I want a different colour.",
        "tl": "māshi bass ʿayza lōn tāni"
      },
      {
        "speaker": "Customer",
        "tr": "عَنْدَك نَفْس الشَّال بِالْأَزْرَق؟",
        "en": "Do you have the same shawl in blue?",
        "tl": "ʿandak nafs ish-shāl bi-l-ʾazraʾ"
      },
      {
        "speaker": "Seller",
        "tr": "أَيْوَه، اتْفَضَّلِي.",
        "en": "Yes — here you are.",
        "tl": "ʾaywa-tfaḍḍali"
      },
      {
        "speaker": "Seller",
        "tr": "وِلَوْ مَعَجَبْكِيش، مُمْكِن تِرَجَّعِيه خِلَال أُسْبُوع.",
        "en": "And if you don’t like it, you can bring it back within a week.",
        "tl": "wi-law maʿagabkīsh mumkin tiraggaʿīh khilāl ʾusbūʿ"
      },
      {
        "speaker": "Customer",
        "tr": "مُمْتَاز، يِنْفَع أَدْفَع بِالْكَارْت؟",
        "en": "Great. Can I pay by card?",
        "tl": "mumtāz yinfaʿ ʾadfaʿ bi-l-kart"
      },
      {
        "speaker": "Seller",
        "tr": "لَأ، كَاش بَسّ لِلْأَسَف.",
        "en": "No, cash only, I’m afraid.",
        "tl": "laʾ kāsh bass li-l-ʾasaf"
      },
      {
        "speaker": "Customer",
        "tr": "مَاشِي، اتْفَضَّل، مِيَّة وِسَبْعِين.",
        "en": "All right — here you go, a hundred and seventy.",
        "tl": "māshi-tfaḍḍal miyya wi-sabʿīn"
      }
    ],
    "glossary": [
      {
        "tr": "بِكَام",
        "en": "how much? (for what price?)",
        "tl": "bi-kām"
      },
      {
        "tr": "مِيَّة فِي الْمِيَّة",
        "en": "a hundred percent",
        "tl": "miyya fi-l-miyya"
      },
      {
        "tr": "غَالِي أَوِي",
        "en": "really expensive",
        "tl": "ghāli ʾawi"
      },
      {
        "tr": "تِنَزِّل",
        "en": "bring down (the price)",
        "tl": "tinazzil"
      },
      {
        "tr": "عَشَانِك",
        "en": "for you (to a woman)",
        "tl": "ʿashānik"
      },
      {
        "tr": "بَرْضُه",
        "en": "still; also",
        "tl": "barḍu"
      },
      {
        "tr": "آخِر كَلَام",
        "en": "final word, final offer",
        "tl": "ʾākhir kalām"
      },
      {
        "tr": "لُون",
        "en": "colour",
        "tl": "lōn"
      },
      {
        "tr": "مَعَجَبْكِيش",
        "en": "you didn’t like it (to a woman; literally “it didn’t please you”)",
        "tl": "maʿagabkīsh"
      },
      {
        "tr": "تِرَجَّعِيه",
        "en": "return it, bring it back (to a woman)",
        "tl": "tiraggaʿīh"
      }
    ],
    "questions": [
      {
        "q": "What was the seller’s first price?",
        "options": [
          "150 pounds",
          "170 pounds",
          "190 pounds",
          "200 pounds"
        ],
        "answer": 3,
        "explain": "بِمِيتِين جِنِيه — two hundred pounds."
      },
      {
        "q": "What price do they finally agree on?",
        "options": [
          "170 pounds",
          "150 pounds",
          "190 pounds",
          "200 pounds"
        ],
        "answer": 0,
        "explain": "The seller’s last offer is مِيَّة وِسَبْعِين, and she pays a hundred and seventy."
      },
      {
        "q": "What colour does the customer want?",
        "options": [
          "Red",
          "Blue",
          "Black",
          "Green"
        ],
        "answer": 1,
        "explain": "She asks for the shawl بِالْأَزْرَق — in blue."
      },
      {
        "q": "How can she pay?",
        "options": [
          "By card only",
          "Card or cash",
          "Cash only",
          "By bank transfer"
        ],
        "answer": 2,
        "explain": "كَاش بَسّ لِلْأَسَف — cash only, unfortunately."
      }
    ]
  },
  {
    "id": "plans-for-friday",
    "kind": "dialogue",
    "level": "A2",
    "title": "Plans for Friday",
    "titleNative": "هَنِعْمِل إِيه يُوم الْجُمْعَة؟",
    "summary": "Two friends make casual plans for a Friday trip to the Pyramids and lunch afterwards.",
    "dialect": "Egyptian",
    "register": "casual",
    "lines": [
      {
        "speaker": "Tamer",
        "tr": "بُصِّي يَا نُور، إِنْتِي فَاضْيَة يُوم الْجُمْعَة؟",
        "en": "Listen, Nour — are you free on Friday?",
        "tl": "buṣṣi ya nūr ʾinti faḍya yōm il-gumʿa"
      },
      {
        "speaker": "Nour",
        "tr": "أَيْوَه، مَعَنْدِيش حَاجَة، لِيه؟",
        "en": "Yes, I’ve got nothing on. Why?",
        "tl": "ʾaywa maʿandīsh ḥāga lēh"
      },
      {
        "speaker": "Tamer",
        "tr": "إِيه رَأْيِك نِرُوح الْأَهْرَامَات الصُّبْح؟",
        "en": "How about going to the Pyramids in the morning?",
        "tl": "ʾēh raʾyik nirūḥ il-ʾahramāt iṣ-ṣubḥ"
      },
      {
        "speaker": "Nour",
        "tr": "فِكْرَة حِلْوَة، بَسّ الْجَوّ حَرّ أَوِي الضُّهْر.",
        "en": "Nice idea, but it’s really hot at midday.",
        "tl": "fikra ḥilwa bass il-gaww ḥarr ʾawi-ḍ-ḍuhr"
      },
      {
        "speaker": "Tamer",
        "tr": "خَلَاص، نِتْقَابِل بَدْرِي، السَّاعَة سَبْعَة.",
        "en": "OK then, let’s meet early — at seven.",
        "tl": "khalāṣ nitʾābil badri-s-sāʿa sabʿa"
      },
      {
        "speaker": "Nour",
        "tr": "سَبْعَة الصُّبْح دِي بَدْرِي أَوِي يَا عَمّ!",
        "en": "Seven in the morning is way too early, mate!",
        "tl": "sabʿa-ṣ-ṣubḥ di badri ʾawi ya ʿamm"
      },
      {
        "speaker": "Tamer",
        "tr": "طَيِّب، تَمَانْيَة وِنُصّ، وِهَعَدِّي عَلِيكِي بِالْعَرَبِيَّة.",
        "en": "All right, half past eight, and I’ll pick you up in the car.",
        "tl": "ṭayyib tamanya wi-nuṣṣ wi-haʿaddi ʿalēki bi-l-ʿarabiyya"
      },
      {
        "speaker": "Nour",
        "tr": "تَمَام، وِنِعْزِم مَرْيَم مَعَانَا؟",
        "en": "Great. Shall we ask Maryam to come with us?",
        "tl": "tamām wi-niʿzim maryam maʿāna"
      },
      {
        "speaker": "Tamer",
        "tr": "أَكِيد، هَكَلِّمْهَا النَّهَارْدَه بِاللِّيل.",
        "en": "Sure, I’ll call her tonight.",
        "tl": "ʾakīd hakallimha-n-nahārda bi-l-lēl"
      },
      {
        "speaker": "Nour",
        "tr": "وِبَعْد الْأَهْرَامَات نِتْغَدَّى فِين؟",
        "en": "And after the Pyramids, where shall we have lunch?",
        "tl": "wi-baʿd il-ʾahramāt nitghadda fēn"
      },
      {
        "speaker": "Tamer",
        "tr": "فِيه مَطْعَم كُشَرِي جَامِد قُرَيِّب مِن هِنَاك.",
        "en": "There’s a great koshari place close by.",
        "tl": "fīh maṭʿam kushari gāmid ʾurayyib min hināk"
      },
      {
        "speaker": "Nour",
        "tr": "حِلْو أَوِي، يِبْقَى اتَّفَقْنَا!",
        "en": "Lovely — it’s a deal, then!",
        "tl": "ḥilw ʾawi yibʾa-ttafaʾna"
      },
      {
        "speaker": "Tamer",
        "tr": "اِتَّفَقْنَا، أَشُوفِك الْجُمْعَة!",
        "en": "Deal. See you on Friday!",
        "tl": "ittafaʾna ʾashūfik il-gumʿa"
      }
    ],
    "glossary": [
      {
        "tr": "بُصِّي",
        "en": "listen, look (to a woman; literally “look”)",
        "tl": "buṣṣi"
      },
      {
        "tr": "فَاضْيَة",
        "en": "free, not busy (a woman)",
        "tl": "faḍya"
      },
      {
        "tr": "مَعَنْدِيش حَاجَة",
        "en": "I’ve got nothing on (literally “I don’t have anything”)",
        "tl": "maʿandīsh ḥāga"
      },
      {
        "tr": "إِيه رَأْيِك",
        "en": "how about…? what do you think? (to a woman)",
        "tl": "ʾēh raʾyik"
      },
      {
        "tr": "الضُّهْر",
        "en": "midday, noon",
        "tl": "iḍ-ḍuhr"
      },
      {
        "tr": "نِتْقَابِل",
        "en": "let’s meet; we meet",
        "tl": "nitʾābil"
      },
      {
        "tr": "بَدْرِي",
        "en": "early",
        "tl": "badri"
      },
      {
        "tr": "هَعَدِّي عَلِيكِي",
        "en": "I’ll come by for you, pick you up (to a woman)",
        "tl": "haʿaddi ʿalēki"
      },
      {
        "tr": "نِتْغَدَّى",
        "en": "we have lunch",
        "tl": "nitghadda"
      },
      {
        "tr": "اِتَّفَقْنَا",
        "en": "it’s a deal (literally “we have agreed”)",
        "tl": "ittafaʾna"
      }
    ],
    "questions": [
      {
        "q": "Where do they plan to go on Friday?",
        "options": [
          "To the beach",
          "To the Pyramids",
          "To the cinema",
          "To a museum"
        ],
        "answer": 1,
        "explain": "Tamer suggests نِرُوح الْأَهْرَامَات — going to the Pyramids."
      },
      {
        "q": "Why doesn’t Nour want to go at midday?",
        "options": [
          "It’s too hot",
          "She has to work",
          "It’s too crowded",
          "She’s having lunch with family"
        ],
        "answer": 0,
        "explain": "الْجَوّ حَرّ أَوِي الضُّهْر — it’s really hot at midday."
      },
      {
        "q": "What time do they finally agree to meet?",
        "options": [
          "Seven o’clock",
          "Eight o’clock",
          "Half past eight",
          "Nine o’clock"
        ],
        "answer": 2,
        "explain": "After Nour says seven is too early, Tamer suggests تَمَانْيَة وِنُصّ — half past eight."
      },
      {
        "q": "What will Tamer do tonight?",
        "options": [
          "Book a restaurant",
          "Wash the car",
          "Buy tickets",
          "Call Maryam"
        ],
        "answer": 3,
        "explain": "هَكَلِّمْهَا النَّهَارْدَه بِاللِّيل — he’ll call her (Maryam) tonight."
      }
    ]
  },
  {
    "id": "at-the-pharmacy",
    "kind": "dialogue",
    "level": "A2",
    "title": "At the Pharmacy",
    "titleNative": "فِي الصَّيْدَلِيَّةِ",
    "summary": "A man with a headache asks a pharmacist for advice, and she explains how to take the medicine.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Pharmacist",
        "tr": "صَبَاحُ الْخَيْرِ، كَيْفَ أَسْتَطِيعُ أَنْ أُسَاعِدَكَ؟",
        "en": "Good morning, how can I help you?",
        "tl": "ṣabāḥu-l-khayri kayfa ʾastaṭīʿu ʾan ʾusāʿidak"
      },
      {
        "speaker": "Customer",
        "tr": "صَبَاحُ النُّورِ، عِنْدِي صُدَاعٌ شَدِيدٌ مُنْذُ الْأَمْسِ.",
        "en": "Good morning. I’ve had a bad headache since yesterday.",
        "tl": "ṣabāḥu-n-nūri ʿindī ṣudāʿun shadīdun mundhu-l-ʾams"
      },
      {
        "speaker": "Pharmacist",
        "tr": "هَلْ عِنْدَكَ حَرَارَةٌ أَيْضًا؟",
        "en": "Do you have a temperature as well?",
        "tl": "hal ʿindaka ḥarāratun ʾayḍan"
      },
      {
        "speaker": "Customer",
        "tr": "لَا، وَلَكِنِّي أَشْعُرُ بِالتَّعَبِ قَلِيلًا.",
        "en": "No, but I feel a little tired.",
        "tl": "lā wa-lākinnī ʾashʿuru bi-t-taʿabi qalīlan"
      },
      {
        "speaker": "Pharmacist",
        "tr": "هَلْ تَتَنَاوَلُ أَيَّ دَوَاءٍ آخَرَ الْآنَ؟",
        "en": "Are you taking any other medicine at the moment?",
        "tl": "hal tatanāwalu ʾayya dawāʾin ʾākhara-l-ʾān"
      },
      {
        "speaker": "Customer",
        "tr": "لَا، لَا أَتَنَاوَلُ أَيَّ دَوَاءٍ.",
        "en": "No, I’m not taking any medicine.",
        "tl": "lā lā ʾatanāwalu ʾayya dawāʾ"
      },
      {
        "speaker": "Pharmacist",
        "tr": "إِذَنْ خُذْ هَذَا الدَّوَاءَ، حَبَّةً وَاحِدَةً كُلَّ ثَمَانِي سَاعَاتٍ.",
        "en": "Then take this medicine: one tablet every eight hours.",
        "tl": "ʾidhan khudh hādhā-d-dawāʾa ḥabbatan wāḥidatan kulla thamānī sāʿāt"
      },
      {
        "speaker": "Pharmacist",
        "tr": "وَلَا تَأْخُذْ أَكْثَرَ مِنْ ثَلَاثِ حَبَّاتٍ فِي الْيَوْمِ.",
        "en": "And don’t take more than three tablets a day.",
        "tl": "wa-lā taʾkhudh ʾakthara min thalāthi ḥabbātin fī-l-yawm"
      },
      {
        "speaker": "Customer",
        "tr": "هَلْ آخُذُهُ قَبْلَ الْأَكْلِ أَمْ بَعْدَهُ؟",
        "en": "Do I take it before or after meals?",
        "tl": "hal ʾākhudhuhu qabla-l-ʾakli ʾam baʿdah"
      },
      {
        "speaker": "Pharmacist",
        "tr": "بَعْدَ الْأَكْلِ، وَاشْرَبِ الْكَثِيرَ مِنَ الْمَاءِ.",
        "en": "After meals, and drink plenty of water.",
        "tl": "baʿda-l-ʾakli wa-shrabi-l-kathīra mina-l-māʾ"
      },
      {
        "speaker": "Pharmacist",
        "tr": "وَإِذَا لَمْ تَتَحَسَّنْ بَعْدَ يَوْمَيْنِ، فَاذْهَبْ إِلَى الطَّبِيبِ.",
        "en": "And if you don’t feel better in two days, go and see a doctor.",
        "tl": "wa-ʾidhā lam tataḥassan baʿda yawmayni fa-dhhab ʾilā-ṭ-ṭabīb"
      },
      {
        "speaker": "Customer",
        "tr": "حَسَنًا، كَمْ ثَمَنُهُ مِنْ فَضْلِكِ؟",
        "en": "All right. How much is it, please?",
        "tl": "ḥasanan kam thamanuhu min faḍlik"
      },
      {
        "speaker": "Pharmacist",
        "tr": "خَمْسَةَ عَشَرَ دِرْهَمًا، وَسَلَامَتُكَ.",
        "en": "Fifteen dirhams. Get well soon.",
        "tl": "khamsata ʿashara dirhaman wa-salāmatuk"
      },
      {
        "speaker": "Customer",
        "tr": "شُكْرًا جَزِيلًا، اللَّهُ يُسَلِّمُكِ.",
        "en": "Thank you very much — that’s kind of you.",
        "tl": "shukran jazīlan allāhu yusallimuk"
      }
    ],
    "glossary": [
      {
        "tr": "صُدَاعٌ",
        "en": "a headache",
        "tl": "ṣudāʿ"
      },
      {
        "tr": "حَرَارَةٌ",
        "en": "a temperature, a fever (literally “heat”)",
        "tl": "ḥarāra"
      },
      {
        "tr": "أَشْعُرُ بِالتَّعَبِ",
        "en": "I feel tired",
        "tl": "ʾashʿur bi-t-taʿab"
      },
      {
        "tr": "تَتَنَاوَلُ",
        "en": "you are taking (medicine, food)",
        "tl": "tatanāwal"
      },
      {
        "tr": "دَوَاءٍ",
        "en": "medicine",
        "tl": "dawāʾ"
      },
      {
        "tr": "حَبَّةً",
        "en": "a tablet, a pill",
        "tl": "ḥabba"
      },
      {
        "tr": "قَبْلَ الْأَكْلِ",
        "en": "before eating, before meals",
        "tl": "qabl al-ʾakl"
      },
      {
        "tr": "لَمْ تَتَحَسَّنْ",
        "en": "you haven’t got better",
        "tl": "lam tataḥassan"
      },
      {
        "tr": "سَلَامَتُكَ",
        "en": "get well soon (literally “your safety”)",
        "tl": "salāmatuk"
      },
      {
        "tr": "اللَّهُ يُسَلِّمُكِ",
        "en": "the usual reply to سَلَامَتُك (literally “may God keep you safe”)",
        "tl": "allāhu yusallimuk"
      }
    ],
    "questions": [
      {
        "q": "What is the customer’s problem?",
        "options": [
          "A high temperature",
          "A stomach ache",
          "A bad headache",
          "A sore throat"
        ],
        "answer": 2,
        "explain": "عِنْدِي صُدَاعٌ شَدِيدٌ — I have a bad headache."
      },
      {
        "q": "How often should he take a tablet?",
        "options": [
          "Every eight hours",
          "Three times an hour",
          "Once a day",
          "Every two hours"
        ],
        "answer": 0,
        "explain": "حَبَّةً وَاحِدَةً كُلَّ ثَمَانِي سَاعَاتٍ — one tablet every eight hours."
      },
      {
        "q": "When should he take the medicine?",
        "options": [
          "Before meals",
          "After meals",
          "At night only",
          "With coffee"
        ],
        "answer": 1,
        "explain": "بَعْدَ الْأَكْلِ — after meals."
      },
      {
        "q": "What should he do if he isn’t better after two days?",
        "options": [
          "Take more tablets",
          "Come back to the pharmacy",
          "Stop drinking water",
          "Go to the doctor"
        ],
        "answer": 3,
        "explain": "فَاذْهَبْ إِلَى الطَّبِيبِ — go to the doctor."
      }
    ]
  },
  {
    "id": "my-morning",
    "kind": "story",
    "level": "A1",
    "title": "My Morning",
    "titleNative": "صَبَاحِي",
    "summary": "Someone describes an ordinary, calm morning, from waking up to arriving at work.",
    "register": "casual",
    "lines": [
      {
        "tr": "اِسْتَيْقَظْتُ الْيَوْمَ فِي السَّاعَةِ السَّابِعَةِ.",
        "en": "Today I woke up at seven o’clock.",
        "tl": "istayqaẓtu-l-yawma fī-s-sāʿati-s-sābiʿa"
      },
      {
        "tr": "نَهَضْتُ مِنَ السَّرِيرِ وَشَرِبْتُ كُوبًا مِنَ الْمَاءِ.",
        "en": "I got out of bed and drank a glass of water.",
        "tl": "nahaḍtu mina-s-sarīri wa-sharibtu kūban mina-l-māʾ"
      },
      {
        "tr": "ثُمَّ اسْتَحْمَمْتُ وَلَبِسْتُ مَلَابِسِي.",
        "en": "Then I had a shower and got dressed.",
        "tl": "thumma-staḥmamtu wa-labistu malābisī"
      },
      {
        "tr": "فِي الْمَطْبَخِ، حَضَّرْتُ الْفُطُورَ.",
        "en": "In the kitchen, I made breakfast.",
        "tl": "fī-l-maṭbakhi ḥaḍḍartu-l-fuṭūr"
      },
      {
        "tr": "أَكَلْتُ خُبْزًا وَجُبْنًا وَبَيْضَةً، وَشَرِبْتُ الشَّايَ.",
        "en": "I had bread, cheese and an egg, and I drank tea.",
        "tl": "ʾakaltu khubzan wa-jubnan wa-bayḍatan wa-sharibtu-sh-shāy"
      },
      {
        "tr": "كَانَتْ أُخْتِي الصَّغِيرَةُ نَائِمَةً.",
        "en": "My little sister was asleep.",
        "tl": "kānat ʾukhtī-ṣ-ṣaghīratu nāʾima"
      },
      {
        "tr": "خَرَجْتُ مِنَ الْبَيْتِ فِي السَّاعَةِ الثَّامِنَةِ.",
        "en": "I left the house at eight o’clock.",
        "tl": "kharajtu mina-l-bayti fī-s-sāʿati-th-thāmina"
      },
      {
        "tr": "كَانَ الْجَوُّ جَمِيلًا، فَمَشَيْتُ إِلَى مَوْقِفِ الْحَافِلَةِ.",
        "en": "The weather was lovely, so I walked to the bus stop.",
        "tl": "kāna-l-jawwu jamīlan fa-mashaytu ʾilā mawqifi-l-ḥāfila"
      },
      {
        "tr": "وَصَلَتِ الْحَافِلَةُ مُتَأَخِّرَةً خَمْسَ دَقَائِقَ.",
        "en": "The bus came five minutes late.",
        "tl": "waṣalati-l-ḥāfilatu mutaʾakhkhiratan khamsa daqāʾiq"
      },
      {
        "tr": "وَصَلْتُ إِلَى الْعَمَلِ فِي التَّاسِعَةِ تَمَامًا.",
        "en": "I got to work at exactly nine.",
        "tl": "waṣaltu ʾilā-l-ʿamali fī-t-tāsiʿati tamāman"
      },
      {
        "tr": "كَانَ صَبَاحًا عَادِيًّا، وَلَكِنَّهُ كَانَ هَادِئًا وَجَمِيلًا.",
        "en": "It was an ordinary morning, but it was calm and lovely.",
        "tl": "kāna ṣabāḥan ʿādiyyan wa-lākinnahu kāna hādiʾan wa-jamīl"
      }
    ],
    "glossary": [
      {
        "tr": "اِسْتَيْقَظْتُ",
        "en": "I woke up",
        "tl": "istayqaẓt"
      },
      {
        "tr": "السَّرِيرِ",
        "en": "the bed",
        "tl": "as-sarīr"
      },
      {
        "tr": "اسْتَحْمَمْتُ",
        "en": "I had a shower, I bathed",
        "tl": "istaḥmamt"
      },
      {
        "tr": "لَبِسْتُ مَلَابِسِي",
        "en": "I got dressed (literally “I put on my clothes”)",
        "tl": "labist malābisī"
      },
      {
        "tr": "الْفُطُورَ",
        "en": "breakfast",
        "tl": "al-fuṭūr"
      },
      {
        "tr": "نَائِمَةً",
        "en": "asleep (a woman or girl)",
        "tl": "nāʾima"
      },
      {
        "tr": "مَوْقِفِ الْحَافِلَةِ",
        "en": "the bus stop",
        "tl": "mawqif al-ḥāfila"
      },
      {
        "tr": "مُتَأَخِّرَةً",
        "en": "late (describing a feminine noun)",
        "tl": "mutaʾakhkhira"
      },
      {
        "tr": "تَمَامًا",
        "en": "exactly",
        "tl": "tamāman"
      },
      {
        "tr": "هَادِئًا",
        "en": "calm, quiet",
        "tl": "hādiʾ"
      }
    ],
    "questions": [
      {
        "q": "What time did the narrator wake up?",
        "options": [
          "At six",
          "At seven",
          "At eight",
          "At nine"
        ],
        "answer": 1,
        "explain": "فِي السَّاعَةِ السَّابِعَةِ — at seven o’clock."
      },
      {
        "q": "What did the narrator drink with breakfast?",
        "options": [
          "Coffee",
          "Milk",
          "Tea",
          "Juice"
        ],
        "answer": 2,
        "explain": "وَشَرِبْتُ الشَّايَ — and I drank tea."
      },
      {
        "q": "How did the narrator get to the bus stop?",
        "options": [
          "On foot",
          "By car",
          "By bike",
          "By taxi"
        ],
        "answer": 0,
        "explain": "فَمَشَيْتُ إِلَى مَوْقِفِ الْحَافِلَةِ — so I walked to the bus stop."
      },
      {
        "q": "How late was the bus?",
        "options": [
          "Ten minutes",
          "It was on time",
          "Half an hour",
          "Five minutes"
        ],
        "answer": 3,
        "explain": "مُتَأَخِّرَةً خَمْسَ دَقَائِقَ — five minutes late."
      }
    ]
  },
  {
    "id": "a-trip-to-the-sea",
    "kind": "story",
    "level": "A2",
    "title": "A Trip to the Seaside",
    "titleNative": "رِحْلَةٌ إِلَى الْبَحْرِ",
    "summary": "The narrator remembers a three-day summer trip with friends to a small town by the sea.",
    "register": "casual",
    "lines": [
      {
        "tr": "فِي الصَّيْفِ الْمَاضِي، سَافَرْتُ مَعَ أَصْدِقَائِي إِلَى مَدِينَةٍ صَغِيرَةٍ عَلَى الْبَحْرِ.",
        "en": "Last summer, I travelled with my friends to a small town by the sea.",
        "tl": "fī-ṣ-ṣayfi-l-māḍī sāfartu maʿa ʾaṣdiqāʾī ʾilā madīnatin ṣaghīratin ʿalā-l-baḥr"
      },
      {
        "tr": "أَخَذْنَا الْقِطَارَ فِي الصَّبَاحِ الْبَاكِرِ، وَكَانَتِ الرِّحْلَةُ طَوِيلَةً.",
        "en": "We took the train early in the morning, and the journey was long.",
        "tl": "ʾakhadhnā-l-qiṭāra fī-ṣ-ṣabāḥi-l-bākiri wa-kānati-r-riḥlatu ṭawīla"
      },
      {
        "tr": "نَظَرْتُ مِنَ النَّافِذَةِ إِلَى الْحُقُولِ الْخَضْرَاءِ وَالْجِبَالِ.",
        "en": "I looked out of the window at the green fields and the mountains.",
        "tl": "naẓartu mina-n-nāfidhati ʾilā-l-ḥuqūli-l-khaḍrāʾi wa-l-jibāl"
      },
      {
        "tr": "وَصَلْنَا بَعْدَ أَرْبَعِ سَاعَاتٍ، وَذَهَبْنَا مُبَاشَرَةً إِلَى الْفُنْدُقِ.",
        "en": "We arrived four hours later and went straight to the hotel.",
        "tl": "waṣalnā baʿda ʾarbaʿi sāʿātin wa-dhahabnā mubāsharatan ʾilā-l-funduq"
      },
      {
        "tr": "كَانَتْ غُرْفَتُنَا صَغِيرَةً، وَلَكِنْ كَانَتْ لَهَا شُرْفَةٌ تُطِلُّ عَلَى الْبَحْرِ.",
        "en": "Our room was small, but it had a balcony overlooking the sea.",
        "tl": "kānat ghurfatunā ṣaghīratan wa-lākin kānat lahā shurfatun tuṭillu ʿalā-l-baḥr"
      },
      {
        "tr": "فِي الْيَوْمِ الْأَوَّلِ، سَبَحْنَا وَلَعِبْنَا عَلَى الشَّاطِئِ.",
        "en": "On the first day, we swam and played on the beach.",
        "tl": "fī-l-yawmi-l-ʾawwali sabaḥnā wa-laʿibnā ʿalā-sh-shāṭiʾ"
      },
      {
        "tr": "وَفِي الْمَسَاءِ، أَكَلْنَا سَمَكًا طَازَجًا فِي مَطْعَمٍ قَرِيبٍ مِنَ الْمِينَاءِ.",
        "en": "In the evening, we ate fresh fish in a restaurant near the harbour.",
        "tl": "wa-fī-l-masāʾi ʾakalnā samakan ṭāzajan fī maṭʿamin qarībin mina-l-mīnāʾ"
      },
      {
        "tr": "فِي الْيَوْمِ الثَّانِي، زُرْنَا السُّوقَ الْقَدِيمَ وَاشْتَرَيْنَا بَعْضَ الْهَدَايَا.",
        "en": "On the second day, we visited the old market and bought some presents.",
        "tl": "fī-l-yawmi-th-thānī zurnā-s-sūqa-l-qadīma wa-shtaraynā baʿḍa-l-hadāyā"
      },
      {
        "tr": "اِشْتَرَيْتُ لِأُمِّي وِشَاحًا جَمِيلًا، وَلِأَبِي كِتَابًا عَنْ تَارِيخِ الْمَدِينَةِ.",
        "en": "I bought my mother a beautiful scarf, and my father a book about the town’s history.",
        "tl": "ishtaraytu li-ʾummī wishāḥan jamīlan wa-li-ʾabī kitāban ʿan tārīkhi-l-madīna"
      },
      {
        "tr": "كَانَ الطَّقْسُ حَارًّا، لَكِنَّ نَسِيمَ الْبَحْرِ كَانَ لَطِيفًا.",
        "en": "The weather was hot, but the sea breeze was pleasant.",
        "tl": "kāna-ṭ-ṭaqsu ḥārran lākinna nasīma-l-baḥri kāna laṭīf"
      },
      {
        "tr": "فِي الْيَوْمِ الثَّالِثِ، رَجَعْنَا إِلَى الْبَيْتِ مُتْعَبِينَ وَلَكِنْ سُعَدَاءَ.",
        "en": "On the third day, we went back home tired but happy.",
        "tl": "fī-l-yawmi-th-thālithi rajaʿnā ʾilā-l-bayti mutʿabīna wa-lākin suʿadāʾ"
      },
      {
        "tr": "كَانَتْ رِحْلَةً قَصِيرَةً، وَلَكِنَّنِي لَنْ أَنْسَاهَا أَبَدًا.",
        "en": "It was a short trip, but I will never forget it.",
        "tl": "kānat riḥlatan qaṣīratan wa-lākinnanī lan ʾansāhā ʾabadan"
      }
    ],
    "glossary": [
      {
        "tr": "سَافَرْتُ",
        "en": "I travelled",
        "tl": "sāfart"
      },
      {
        "tr": "الْبَاكِرِ",
        "en": "early (of the morning)",
        "tl": "al-bākir"
      },
      {
        "tr": "النَّافِذَةِ",
        "en": "the window",
        "tl": "an-nāfidha"
      },
      {
        "tr": "الْحُقُولِ",
        "en": "the fields",
        "tl": "al-ḥuqūl"
      },
      {
        "tr": "شُرْفَةٌ",
        "en": "a balcony",
        "tl": "shurfa"
      },
      {
        "tr": "تُطِلُّ عَلَى",
        "en": "overlooks, looks out onto",
        "tl": "tuṭill ʿalā"
      },
      {
        "tr": "الشَّاطِئِ",
        "en": "the beach",
        "tl": "ash-shāṭiʾ"
      },
      {
        "tr": "طَازَجًا",
        "en": "fresh",
        "tl": "ṭāzaj"
      },
      {
        "tr": "الْهَدَايَا",
        "en": "presents, gifts",
        "tl": "al-hadāyā"
      },
      {
        "tr": "نَسِيمَ الْبَحْرِ",
        "en": "the sea breeze",
        "tl": "nasīm al-baḥr"
      }
    ],
    "questions": [
      {
        "q": "How did they travel to the town?",
        "options": [
          "By train",
          "By car",
          "By bus",
          "By boat"
        ],
        "answer": 0,
        "explain": "أَخَذْنَا الْقِطَارَ — we took the train."
      },
      {
        "q": "How long did the train journey take?",
        "options": [
          "Two hours",
          "Three days",
          "Four hours",
          "One hour"
        ],
        "answer": 2,
        "explain": "وَصَلْنَا بَعْدَ أَرْبَعِ سَاعَاتٍ — we arrived after four hours."
      },
      {
        "q": "What was special about their room?",
        "options": [
          "It was very big",
          "It had a balcony overlooking the sea",
          "It was next to the market",
          "It had a kitchen"
        ],
        "answer": 1,
        "explain": "كَانَتْ لَهَا شُرْفَةٌ تُطِلُّ عَلَى الْبَحْرِ — it had a balcony overlooking the sea."
      },
      {
        "q": "What did the narrator buy for their father?",
        "options": [
          "A scarf",
          "Fresh fish",
          "A painting",
          "A book about the town’s history"
        ],
        "answer": 3,
        "explain": "وَلِأَبِي كِتَابًا عَنْ تَارِيخِ الْمَدِينَةِ — and for my father a book about the town’s history."
      }
    ]
  },
  {
    "id": "the-lost-phone",
    "kind": "story",
    "level": "B1",
    "title": "The Lost Phone",
    "titleNative": "الْهَاتِفُ الضَّائِعُ",
    "summary": "After a long day, a man leaves his phone in a taxi — and an honest driver brings it back.",
    "register": "casual",
    "lines": [
      {
        "tr": "يَوْمَ الْخَمِيسِ الْمَاضِي، رَكِبْتُ سَيَّارَةَ أُجْرَةٍ بَعْدَ يَوْمٍ طَوِيلٍ فِي الْعَمَلِ.",
        "en": "Last Thursday, I took a taxi after a long day at work.",
        "tl": "yawma-l-khamīsi-l-māḍī rakibtu sayyārata ʾujratin baʿda yawmin ṭawīlin fī-l-ʿamal"
      },
      {
        "tr": "كُنْتُ مُتْعَبًا جِدًّا، فَنِمْتُ قَلِيلًا فِي الطَّرِيقِ.",
        "en": "I was very tired, so I dozed off a little on the way.",
        "tl": "kuntu mutʿaban jiddan fa-nimtu qalīlan fī-ṭ-ṭarīq"
      },
      {
        "tr": "عِنْدَمَا وَصَلْتُ إِلَى الْبَيْتِ، بَحَثْتُ عَنْ هَاتِفِي فِي جَيْبِي، وَلَكِنَّهُ لَمْ يَكُنْ هُنَاكَ.",
        "en": "When I got home, I looked for my phone in my pocket, but it wasn’t there.",
        "tl": "ʿindamā waṣaltu ʾilā-l-bayti baḥathtu ʿan hātifī fī jaybī wa-lākinnahu lam yakun hunāk"
      },
      {
        "tr": "بَحَثْتُ فِي حَقِيبَتِي وَفِي كُلِّ مَكَانٍ، وَلَكِنْ بِلَا فَائِدَةٍ.",
        "en": "I searched my bag and everywhere else, but it was no use.",
        "tl": "baḥathtu fī ḥaqībatī wa-fī kulli makānin wa-lākin bi-lā fāʾida"
      },
      {
        "tr": "شَعَرْتُ بِالْقَلَقِ، لِأَنَّ كُلَّ صُوَرِي وَأَرْقَامِي كَانَتْ عَلَيْهِ.",
        "en": "I got worried, because all my photos and numbers were on it.",
        "tl": "shaʿartu bi-l-qalaqi li-ʾanna kulla ṣuwarī wa-ʾarqāmī kānat ʿalayh"
      },
      {
        "tr": "فَجْأَةً تَذَكَّرْتُ أَنَّنِي وَضَعْتُهُ عَلَى الْمَقْعَدِ بِجَانِبِي فِي السَّيَّارَةِ.",
        "en": "Suddenly I remembered that I had put it on the seat next to me in the car.",
        "tl": "fajʾatan tadhakkartu ʾannanī waḍaʿtuhu ʿalā-l-maqʿadi bi-jānibī fī-s-sayyāra"
      },
      {
        "tr": "اِسْتَعَرْتُ هَاتِفَ جَارِي، وَاتَّصَلْتُ بِرَقْمِي.",
        "en": "I borrowed my neighbour’s phone and called my number.",
        "tl": "istaʿartu hātifa jārī wa-ttaṣaltu bi-raqmī"
      },
      {
        "tr": "رَنَّ الْهَاتِفُ طَوِيلًا، ثُمَّ أَجَابَ رَجُلٌ بِصَوْتٍ هَادِئٍ.",
        "en": "The phone rang for a long time, then a man answered in a calm voice.",
        "tl": "ranna-l-hātifu ṭawīlan thumma ʾajāba rajulun bi-ṣawtin hādiʾ"
      },
      {
        "tr": "كَانَ سَائِقَ سَيَّارَةِ الْأُجْرَةِ، وَقَالَ إِنَّهُ وَجَدَ الْهَاتِفَ بَعْدَ أَنْ نَزَلْتُ.",
        "en": "It was the taxi driver, and he said he had found the phone after I got out.",
        "tl": "kāna sāʾiqa sayyārati-l-ʾujrati wa-qāla ʾinnahu wajada-l-hātifa baʿda ʾan nazalt"
      },
      {
        "tr": "اِتَّفَقْنَا أَنْ نَلْتَقِيَ أَمَامَ الْمَخْبَزِ الْقَرِيبِ مِنْ بَيْتِي.",
        "en": "We agreed to meet in front of the bakery near my house.",
        "tl": "ittafaqnā ʾan naltaqiya ʾamāma-l-makhbazi-l-qarībi min baytī"
      },
      {
        "tr": "بَعْدَ رُبْعِ سَاعَةٍ، أَعَادَ لِيَ الْهَاتِفَ وَهُوَ يَبْتَسِمُ.",
        "en": "A quarter of an hour later, he handed me back the phone with a smile.",
        "tl": "baʿda rubʿi sāʿatin ʾaʿāda liya-l-hātifa wa-huwa yabtasim"
      },
      {
        "tr": "أَرَدْتُ أَنْ أُعْطِيَهُ بَعْضَ الْمَالِ، لَكِنَّهُ رَفَضَ بِلُطْفٍ.",
        "en": "I wanted to give him some money, but he politely refused.",
        "tl": "ʾaradtu ʾan ʾuʿṭiyahu baʿḍa-l-māli lākinnahu rafaḍa bi-luṭf"
      },
      {
        "tr": "مُنْذُ ذَلِكَ الْيَوْمِ، أَتَأَكَّدُ دَائِمًا مِنْ أَنَّ هَاتِفِي مَعِي قَبْلَ أَنْ أَنْزِلَ.",
        "en": "Since that day, I always check that I have my phone before I get out.",
        "tl": "mundhu dhālika-l-yawmi ʾataʾakkadu dāʾiman min ʾanna hātifī maʿī qabla ʾan ʾanzil"
      },
      {
        "tr": "وَتَعَلَّمْتُ أَيْضًا أَنَّ النَّاسَ الطَّيِّبِينَ مَا زَالُوا مَوْجُودِينَ.",
        "en": "And I also learned that good people are still out there.",
        "tl": "wa-taʿallamtu ʾayḍan ʾanna-n-nāsa-ṭ-ṭayyibīna mā zālū mawjūdīn"
      }
    ],
    "glossary": [
      {
        "tr": "سَيَّارَةَ أُجْرَةٍ",
        "en": "a taxi (literally “a car for hire”)",
        "tl": "sayyārat ʾujra"
      },
      {
        "tr": "جَيْبِي",
        "en": "my pocket",
        "tl": "jaybī"
      },
      {
        "tr": "بِلَا فَائِدَةٍ",
        "en": "in vain, no use",
        "tl": "bi-lā fāʾida"
      },
      {
        "tr": "شَعَرْتُ بِالْقَلَقِ",
        "en": "I felt worried",
        "tl": "shaʿart bi-l-qalaq"
      },
      {
        "tr": "فَجْأَةً",
        "en": "suddenly",
        "tl": "fajʾatan"
      },
      {
        "tr": "الْمَقْعَدِ",
        "en": "the seat",
        "tl": "al-maqʿad"
      },
      {
        "tr": "اِسْتَعَرْتُ",
        "en": "I borrowed",
        "tl": "istaʿart"
      },
      {
        "tr": "سَائِقَ",
        "en": "driver",
        "tl": "sāʾiq"
      },
      {
        "tr": "رَفَضَ بِلُطْفٍ",
        "en": "he politely refused",
        "tl": "rafaḍ bi-luṭf"
      },
      {
        "tr": "أَتَأَكَّدُ",
        "en": "I make sure, I check (followed by مِنْ)",
        "tl": "ʾataʾakkad"
      }
    ],
    "questions": [
      {
        "q": "Where had the narrator left the phone?",
        "options": [
          "At work",
          "On the seat in the taxi",
          "In the bakery",
          "At his neighbour’s"
        ],
        "answer": 1,
        "explain": "وَضَعْتُهُ عَلَى الْمَقْعَدِ بِجَانِبِي فِي السَّيَّارَةِ — on the seat next to him in the car."
      },
      {
        "q": "How did he call his own number?",
        "options": [
          "From a public phone",
          "From his work phone",
          "With his neighbour’s phone",
          "The driver called him first"
        ],
        "answer": 2,
        "explain": "اِسْتَعَرْتُ هَاتِفَ جَارِي — I borrowed my neighbour’s phone."
      },
      {
        "q": "Where did they meet?",
        "options": [
          "In front of the bakery near his house",
          "At the taxi rank",
          "At his office",
          "At the police station"
        ],
        "answer": 0,
        "explain": "أَمَامَ الْمَخْبَزِ الْقَرِيبِ مِنْ بَيْتِي — in front of the bakery near my house."
      },
      {
        "q": "What happened when he offered the driver money?",
        "options": [
          "The driver took it",
          "The driver asked for more",
          "He forgot to offer any",
          "The driver politely refused"
        ],
        "answer": 3,
        "explain": "لَكِنَّهُ رَفَضَ بِلُطْفٍ — but he politely refused."
      }
    ]
  },
  {
    "id": "mums-surprise-party",
    "kind": "story",
    "level": "B1",
    "title": "Mum’s Surprise Party",
    "titleNative": "مُفَاجَأَةٌ لِأُمِّي",
    "summary": "A family secretly prepares a surprise party for their mother’s sixtieth birthday.",
    "register": "casual",
    "lines": [
      {
        "tr": "فِي الشَّهْرِ الْمَاضِي، احْتَفَلَتْ أُمِّي بِعِيدِ مِيلَادِهَا السِّتِّينَ.",
        "en": "Last month, my mother celebrated her sixtieth birthday.",
        "tl": "fī-sh-shahri-l-māḍī-ḥtafalat ʾummī bi-ʿīdi mīlādihā-s-sittīn"
      },
      {
        "tr": "قَرَّرْنَا أَنَا وَإِخْوَتِي أَنْ نُحَضِّرَ لَهَا حَفْلَةً مُفَاجِئَةً.",
        "en": "My brothers and sisters and I decided to throw her a surprise party.",
        "tl": "qarrarnā ʾanā wa-ʾikhwatī ʾan nuḥaḍḍira lahā ḥaflatan mufājiʾa"
      },
      {
        "tr": "اِتَّصَلْنَا بِصَدِيقَاتِهَا الْقَدِيمَاتِ وَبِأَقَارِبِنَا، وَطَلَبْنَا مِنْهُمْ أَنْ يَحْفَظُوا السِّرَّ.",
        "en": "We called her old friends and our relatives, and asked them to keep it a secret.",
        "tl": "ittaṣalnā bi-ṣadīqātihā-l-qadīmāti wa-bi-ʾaqāribinā wa-ṭalabnā minhum ʾan yaḥfaẓū-s-sirr"
      },
      {
        "tr": "فِي يَوْمِ الْحَفْلَةِ، أَخَذَهَا أَبِي إِلَى السُّوقِ لِكَيْ نُجَهِّزَ الْبَيْتَ.",
        "en": "On the day of the party, my father took her to the market so that we could get the house ready.",
        "tl": "fī yawmi-l-ḥaflati ʾakhadhahā ʾabī ʾilā-s-sūqi li-kay nujahhiza-l-bayt"
      },
      {
        "tr": "زَيَّنَّا الصَّالَةَ بِالْبَالُونَاتِ وَالْوُرُودِ، وَعَلَّقْنَا صُوَرَهَا الْقَدِيمَةَ عَلَى الْجُدْرَانِ.",
        "en": "We decorated the living room with balloons and flowers, and hung her old photos on the walls.",
        "tl": "zayyannā-ṣ-ṣālata bi-l-bālūnāti wa-l-wurūdi wa-ʿallaqnā ṣuwarahā-l-qadīmata ʿalā-l-judrān"
      },
      {
        "tr": "وَخَبَزَتْ أُخْتِي كَعْكَةَ الشُّوكُولَاتَةِ الَّتِي تُحِبُّهَا أُمِّي.",
        "en": "And my sister baked the chocolate cake that my mother loves.",
        "tl": "wa-khabazat ʾukhtī kaʿkata-sh-shūkūlātati-llatī tuḥibbuhā ʾummī"
      },
      {
        "tr": "عِنْدَمَا فَتَحَتِ الْبَابَ فِي الْمَسَاءِ، صَرَخْنَا جَمِيعًا: «عِيدُ مِيلَادٍ سَعِيدٌ!»",
        "en": "When she opened the door that evening, we all shouted: “Happy birthday!”",
        "tl": "ʿindamā fataḥati-l-bāba fī-l-masāʾi ṣarakhnā jamīʿan ʿīdu mīlādin saʿīd"
      },
      {
        "tr": "وَقَفَتْ أُمِّي فِي مَكَانِهَا، وَلَمْ تُصَدِّقْ عَيْنَيْهَا.",
        "en": "My mother froze on the spot and couldn’t believe her eyes.",
        "tl": "waqafat ʾummī fī makānihā wa-lam tuṣaddiq ʿaynayhā"
      },
      {
        "tr": "ثُمَّ ضَحِكَتْ وَبَكَتْ فِي الْوَقْتِ نَفْسِهِ، وَعَانَقَتْ كُلَّ وَاحِدٍ مِنَّا.",
        "en": "Then she laughed and cried at the same time, and hugged every one of us.",
        "tl": "thumma ḍaḥikat wa-bakat fī-l-waqti nafsihi wa-ʿānaqat kulla wāḥidin minnā"
      },
      {
        "tr": "قَضَيْنَا السَّهْرَةَ نَأْكُلُ وَنَتَحَدَّثُ وَنَتَذَكَّرُ قِصَصًا مِنْ أَيَّامِ شَبَابِهَا.",
        "en": "We spent the evening eating, chatting and remembering stories from her younger days.",
        "tl": "qaḍaynā-s-sahrata naʾkulu wa-nataḥaddathu wa-natadhakkaru qiṣaṣan min ʾayyāmi shabābihā"
      },
      {
        "tr": "وَفِي آخِرِ اللَّيْلِ، فَتَحَتْ هَدَايَاهَا وَشَكَرَتْنَا وَاحِدًا وَاحِدًا.",
        "en": "At the end of the night, she opened her presents and thanked us one by one.",
        "tl": "wa-fī ʾākhiri-l-layli fataḥat hadāyāhā wa-shakaratnā wāḥidan wāḥidan"
      },
      {
        "tr": "قَالَتْ لَنَا إِنَّهَا كَانَتْ أَجْمَلَ لَيْلَةٍ فِي حَيَاتِهَا.",
        "en": "She told us it had been the most beautiful night of her life.",
        "tl": "qālat lanā ʾinnahā kānat ʾajmala laylatin fī ḥayātihā"
      },
      {
        "tr": "وَأَنَا أَيْضًا لَنْ أَنْسَى ابْتِسَامَتَهَا فِي تِلْكَ اللَّحْظَةِ.",
        "en": "And I will never forget her smile at that moment either.",
        "tl": "wa-ʾanā ʾayḍan lan ʾansā-btisāmatahā fī tilka-l-laḥẓa"
      }
    ],
    "glossary": [
      {
        "tr": "احْتَفَلَتْ",
        "en": "she celebrated",
        "tl": "iḥtafalat"
      },
      {
        "tr": "عِيدِ مِيلَادِهَا",
        "en": "her birthday",
        "tl": "ʿīd mīlādihā"
      },
      {
        "tr": "حَفْلَةً مُفَاجِئَةً",
        "en": "a surprise party",
        "tl": "ḥafla mufājiʾa"
      },
      {
        "tr": "أَقَارِبِنَا",
        "en": "our relatives",
        "tl": "ʾaqāribinā"
      },
      {
        "tr": "يَحْفَظُوا السِّرَّ",
        "en": "keep the secret",
        "tl": "yaḥfaẓū-s-sirr"
      },
      {
        "tr": "زَيَّنَّا",
        "en": "we decorated",
        "tl": "zayyannā"
      },
      {
        "tr": "الصَّالَةَ",
        "en": "the living room",
        "tl": "aṣ-ṣāla"
      },
      {
        "tr": "لَمْ تُصَدِّقْ عَيْنَيْهَا",
        "en": "she couldn’t believe her eyes",
        "tl": "lam tuṣaddiq ʿaynayhā"
      },
      {
        "tr": "عَانَقَتْ",
        "en": "she hugged",
        "tl": "ʿānaqat"
      },
      {
        "tr": "السَّهْرَةَ",
        "en": "the evening (spent together), the evening party",
        "tl": "as-sahra"
      }
    ],
    "questions": [
      {
        "q": "How old did the mother turn?",
        "options": [
          "Fifty",
          "Sixty",
          "Seventy",
          "Sixty-five"
        ],
        "answer": 1,
        "explain": "عِيدِ مِيلَادِهَا السِّتِّينَ — her sixtieth birthday."
      },
      {
        "q": "Why did the father take her to the market?",
        "options": [
          "To buy her a present",
          "To buy food for the party",
          "So the children could get the house ready",
          "Because she asked him to"
        ],
        "answer": 2,
        "explain": "لِكَيْ نُجَهِّزَ الْبَيْتَ — so that we could get the house ready."
      },
      {
        "q": "Who baked the cake?",
        "options": [
          "The narrator’s sister",
          "The narrator",
          "The mother’s friend",
          "A bakery"
        ],
        "answer": 0,
        "explain": "وَخَبَزَتْ أُخْتِي كَعْكَةَ الشُّوكُولَاتَةِ — my sister baked the chocolate cake."
      },
      {
        "q": "How did the mother react at first?",
        "options": [
          "She was angry",
          "She went straight to the cake",
          "She left the room",
          "She stood still, then laughed and cried"
        ],
        "answer": 3,
        "explain": "She froze (وَقَفَتْ فِي مَكَانِهَا), then ضَحِكَتْ وَبَكَتْ فِي الْوَقْتِ نَفْسِهِ."
      }
    ]
  },
  {
    "id": "running-late-texts",
    "kind": "everyday",
    "level": "A1",
    "title": "Running Late",
    "titleNative": "سَأَتَأَخَّرُ قَلِيلًا",
    "summary": "A text-message thread between two friends: one is stuck in traffic, the other is waiting at a café.",
    "register": "casual",
    "lines": [
      {
        "speaker": "Rana",
        "tr": "مَرْحَبًا يَا سَامِي، هَلْ وَصَلْتَ؟",
        "en": "Hi Sami, are you there yet?",
        "tl": "marḥaban yā sāmī hal waṣalt"
      },
      {
        "speaker": "Sami",
        "tr": "لَا، أَنَا فِي الْحَافِلَةِ الْآنَ.",
        "en": "No, I’m on the bus now.",
        "tl": "lā ʾanā fī-l-ḥāfilati-l-ʾān"
      },
      {
        "speaker": "Sami",
        "tr": "الطَّرِيقُ مُزْدَحِمٌ جِدًّا، آسِفٌ!",
        "en": "The traffic is terrible, sorry!",
        "tl": "aṭ-ṭarīqu muzdaḥimun jiddan ʾāsif"
      },
      {
        "speaker": "Rana",
        "tr": "لَا مُشْكِلَةَ، أَنَا فِي الْمَقْهَى.",
        "en": "No problem, I’m at the café.",
        "tl": "lā mushkilata ʾanā fī-l-maqhā"
      },
      {
        "speaker": "Rana",
        "tr": "هَلْ أَطْلُبُ لَكَ قَهْوَةً؟",
        "en": "Shall I order you a coffee?",
        "tl": "hal ʾaṭlubu laka qahwa"
      },
      {
        "speaker": "Sami",
        "tr": "نَعَمْ، مِنْ فَضْلِكِ، قَهْوَةً بِالْحَلِيبِ بِدُونِ سُكَّرٍ.",
        "en": "Yes please — a coffee with milk, no sugar.",
        "tl": "naʿam min faḍliki qahwatan bi-l-ḥalībi bi-dūni sukkar"
      },
      {
        "speaker": "Rana",
        "tr": "حَسَنًا، كَمْ دَقِيقَةً تَحْتَاجُ؟",
        "en": "OK. How long will you be?",
        "tl": "ḥasanan kam daqīqatan taḥtāj"
      },
      {
        "speaker": "Sami",
        "tr": "عَشْرُ دَقَائِقَ تَقْرِيبًا.",
        "en": "About ten minutes.",
        "tl": "ʿashru daqāʾiqa taqrīban"
      },
      {
        "speaker": "Sami",
        "tr": "نَزَلْتُ مِنَ الْحَافِلَةِ، أَنَا قَادِمٌ!",
        "en": "I’ve got off the bus — on my way!",
        "tl": "nazaltu mina-l-ḥāfilati ʾanā qādim"
      },
      {
        "speaker": "Rana",
        "tr": "رَائِعٌ، أَرَاكَ بَعْدَ قَلِيلٍ.",
        "en": "Great, see you in a bit.",
        "tl": "rāʾiʿun ʾarāka baʿda qalīl"
      },
      {
        "speaker": "Sami",
        "tr": "أَنَا عِنْدَ الْبَابِ، أَيْنَ تَجْلِسِينَ؟",
        "en": "I’m at the door. Where are you sitting?",
        "tl": "ʾanā ʿinda-l-bābi ʾayna tajlisīn"
      },
      {
        "speaker": "Rana",
        "tr": "فِي الدَّاخِلِ، بِجَانِبِ النَّافِذَةِ.",
        "en": "Inside, by the window.",
        "tl": "fī-d-dākhili bi-jānibi-n-nāfidha"
      }
    ],
    "glossary": [
      {
        "tr": "هَلْ وَصَلْتَ",
        "en": "have you arrived? (to a man)",
        "tl": "hal waṣalt"
      },
      {
        "tr": "الْحَافِلَةِ",
        "en": "the bus",
        "tl": "al-ḥāfila"
      },
      {
        "tr": "مُزْدَحِمٌ",
        "en": "crowded, congested",
        "tl": "muzdaḥim"
      },
      {
        "tr": "آسِفٌ",
        "en": "sorry (a man speaking); a woman says آسِفَة",
        "tl": "ʾāsif"
      },
      {
        "tr": "لَا مُشْكِلَةَ",
        "en": "no problem",
        "tl": "lā mushkila"
      },
      {
        "tr": "بِالْحَلِيبِ",
        "en": "with milk",
        "tl": "bi-l-ḥalīb"
      },
      {
        "tr": "بِدُونِ سُكَّرٍ",
        "en": "without sugar",
        "tl": "bi-dūn sukkar"
      },
      {
        "tr": "قَادِمٌ",
        "en": "coming, on my way",
        "tl": "qādim"
      },
      {
        "tr": "بَعْدَ قَلِيلٍ",
        "en": "in a little while, soon",
        "tl": "baʿd qalīl"
      },
      {
        "tr": "بِجَانِبِ",
        "en": "next to, by",
        "tl": "bi-jānib"
      }
    ],
    "questions": [
      {
        "q": "Where is Sami when Rana first writes?",
        "options": [
          "At home",
          "On the bus",
          "At the café",
          "At work"
        ],
        "answer": 1,
        "explain": "أَنَا فِي الْحَافِلَةِ الْآنَ — I’m on the bus now."
      },
      {
        "q": "Why is Sami late?",
        "options": [
          "He overslept",
          "He missed the bus",
          "The traffic is bad",
          "He forgot the meeting"
        ],
        "answer": 2,
        "explain": "الطَّرِيقُ مُزْدَحِمٌ جِدًّا — the road is very congested."
      },
      {
        "q": "How does Sami want his coffee?",
        "options": [
          "With milk and no sugar",
          "Black with sugar",
          "With milk and sugar",
          "He doesn’t want coffee"
        ],
        "answer": 0,
        "explain": "قَهْوَةً بِالْحَلِيبِ بِدُونِ سُكَّرٍ — coffee with milk, without sugar."
      },
      {
        "q": "Where is Rana sitting?",
        "options": [
          "Outside on the terrace",
          "At the door",
          "Upstairs",
          "Inside, by the window"
        ],
        "answer": 3,
        "explain": "فِي الدَّاخِلِ، بِجَانِبِ النَّافِذَةِ — inside, by the window."
      }
    ]
  },
  {
    "id": "signs-around-town",
    "kind": "everyday",
    "level": "A2",
    "title": "Signs Around Town",
    "titleNative": "لَافِتَاتٌ وَإِعْلَانَاتٌ",
    "summary": "Signs and notices you might see in shops, buildings and public places.",
    "register": "polite",
    "lines": [
      {
        "tr": "مَمْنُوعُ التَّدْخِينِ.",
        "en": "No smoking.",
        "tl": "mamnūʿu-t-tadkhīn"
      },
      {
        "tr": "الْمَحَلُّ مُغْلَقٌ يَوْمَ الْجُمُعَةِ.",
        "en": "The shop is closed on Fridays.",
        "tl": "al-maḥallu mughlaqun yawma-l-jumuʿa"
      },
      {
        "tr": "أَوْقَاتُ الْعَمَلِ: مِنَ التَّاسِعَةِ صَبَاحًا إِلَى الْخَامِسَةِ مَسَاءً.",
        "en": "Opening hours: 9 a.m. to 5 p.m.",
        "tl": "ʾawqātu-l-ʿamal mina-t-tāsiʿati ṣabāḥan ʾilā-l-khāmisati masāʾan"
      },
      {
        "tr": "يُرْجَى إِغْلَاقُ الْبَابِ بَعْدَ الدُّخُولِ.",
        "en": "Please close the door behind you.",
        "tl": "yurjā ʾighlāqu-l-bābi baʿda-d-dukhūl"
      },
      {
        "tr": "الْمِصْعَدُ مُعَطَّلٌ، نَعْتَذِرُ عَنِ الْإِزْعَاجِ.",
        "en": "The lift is out of order. We apologise for the inconvenience.",
        "tl": "al-miṣʿadu muʿaṭṭalun naʿtadhiru ʿani-l-ʾizʿāj"
      },
      {
        "tr": "فِي حَالَةِ الطَّوَارِئِ، اسْتَخْدِمِ الدَّرَجَ.",
        "en": "In case of emergency, use the stairs.",
        "tl": "fī ḥālati-ṭ-ṭawāriʾi-stakhdimi-d-daraj"
      },
      {
        "tr": "الدَّفْعُ نَقْدًا فَقَطْ.",
        "en": "Cash only.",
        "tl": "ad-dafʿu naqdan faqaṭ"
      },
      {
        "tr": "الرَّجَاءُ عَدَمُ لَمْسِ الْمَعْرُوضَاتِ.",
        "en": "Please do not touch the items on display.",
        "tl": "ar-rajāʾu ʿadamu lamsi-l-maʿrūḍāt"
      },
      {
        "tr": "مَوْقِفُ السَّيَّارَاتِ لِلسُّكَّانِ فَقَطْ.",
        "en": "Parking for residents only.",
        "tl": "mawqifu-s-sayyārāti li-s-sukkāni faqaṭ"
      },
      {
        "tr": "تَخْفِيضَاتٌ تَصِلُ إِلَى خَمْسِينَ فِي الْمِئَةِ.",
        "en": "Sale: up to 50% off.",
        "tl": "takhfīḍātun taṣilu ʾilā khamsīna fī-l-miʾa"
      },
      {
        "tr": "اِنْتَبِهْ: الْأَرْضُ مُبَلَّلَةٌ.",
        "en": "Caution: wet floor.",
        "tl": "intabih al-ʾarḍu muballala"
      },
      {
        "tr": "يُرْجَى إِطْفَاءُ الْهَوَاتِفِ دَاخِلَ الْقَاعَةِ.",
        "en": "Please switch off your phone in the hall.",
        "tl": "yurjā ʾiṭfāʾu-l-hawātifi dākhila-l-qāʿa"
      },
      {
        "tr": "شُكْرًا لِزِيَارَتِكُمْ، نَتَمَنَّى لَكُمْ يَوْمًا سَعِيدًا.",
        "en": "Thank you for visiting. Have a nice day.",
        "tl": "shukran li-ziyāratikum natamannā lakum yawman saʿīd"
      }
    ],
    "glossary": [
      {
        "tr": "مَمْنُوعُ",
        "en": "forbidden, not allowed",
        "tl": "mamnūʿ"
      },
      {
        "tr": "مُغْلَقٌ",
        "en": "closed",
        "tl": "mughlaq"
      },
      {
        "tr": "أَوْقَاتُ الْعَمَلِ",
        "en": "opening hours, business hours",
        "tl": "ʾawqāt al-ʿamal"
      },
      {
        "tr": "يُرْجَى",
        "en": "please… (formal, literally “it is requested”)",
        "tl": "yurjā"
      },
      {
        "tr": "الْمِصْعَدُ",
        "en": "the lift, the elevator",
        "tl": "al-miṣʿad"
      },
      {
        "tr": "مُعَطَّلٌ",
        "en": "out of order, broken",
        "tl": "muʿaṭṭal"
      },
      {
        "tr": "الطَّوَارِئِ",
        "en": "emergency",
        "tl": "aṭ-ṭawāriʾ"
      },
      {
        "tr": "نَقْدًا",
        "en": "in cash",
        "tl": "naqdan"
      },
      {
        "tr": "تَخْفِيضَاتٌ",
        "en": "reductions, a sale",
        "tl": "takhfīḍāt"
      },
      {
        "tr": "مُبَلَّلَةٌ",
        "en": "wet",
        "tl": "muballala"
      }
    ],
    "questions": [
      {
        "q": "When is the shop closed?",
        "options": [
          "On Fridays",
          "On Sundays",
          "Every evening",
          "In the afternoon"
        ],
        "answer": 0,
        "explain": "الْمَحَلُّ مُغْلَقٌ يَوْمَ الْجُمُعَةِ — closed on Friday."
      },
      {
        "q": "What is wrong with the lift?",
        "options": [
          "It is being cleaned",
          "It is only for residents",
          "It is out of order",
          "It is too small"
        ],
        "answer": 2,
        "explain": "الْمِصْعَدُ مُعَطَّلٌ — the lift is out of order."
      },
      {
        "q": "How can you pay in this shop?",
        "options": [
          "By card only",
          "In cash only",
          "By phone",
          "Card or cash"
        ],
        "answer": 1,
        "explain": "الدَّفْعُ نَقْدًا فَقَطْ — payment in cash only."
      },
      {
        "q": "What should you do inside the hall?",
        "options": [
          "Take off your shoes",
          "Speak quietly",
          "Use the stairs",
          "Switch off your phone"
        ],
        "answer": 3,
        "explain": "يُرْجَى إِطْفَاءُ الْهَوَاتِفِ دَاخِلَ الْقَاعَةِ — please switch off phones inside the hall."
      }
    ]
  },
  {
    "id": "the-cafe-menu",
    "kind": "everyday",
    "level": "A1",
    "title": "The Café Menu",
    "titleNative": "قَائِمَةُ الْمَقْهَى",
    "summary": "A short café menu with prices, followed by a customer ordering from the waiter.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Menu",
        "tr": "قَائِمَةُ الْمَشْرُوبَاتِ وَالْحَلَوِيَّاتِ",
        "en": "Drinks and desserts",
        "tl": "qāʾimatu-l-mashrūbāti wa-l-ḥalawiyyāt"
      },
      {
        "speaker": "Menu",
        "tr": "قَهْوَةٌ عَرَبِيَّةٌ بِالْهَيْلِ: ثَمَانِيَةُ دَرَاهِمَ",
        "en": "Arabic coffee with cardamom: 8 dirhams",
        "tl": "qahwatun ʿarabiyyatun bi-l-hayl thamāniyatu darāhim"
      },
      {
        "speaker": "Menu",
        "tr": "شَايٌ بِالنَّعْنَاعِ: سِتَّةُ دَرَاهِمَ",
        "en": "Mint tea: 6 dirhams",
        "tl": "shāyun bi-n-naʿnāʿ sittatu darāhim"
      },
      {
        "speaker": "Menu",
        "tr": "عَصِيرُ بُرْتُقَالٍ طَازَجٌ: عَشَرَةُ دَرَاهِمَ",
        "en": "Fresh orange juice: 10 dirhams",
        "tl": "ʿaṣīru burtuqālin ṭāzaj ʿasharatu darāhim"
      },
      {
        "speaker": "Menu",
        "tr": "كَعْكَةُ الشُّوكُولَاتَةِ: اِثْنَا عَشَرَ دِرْهَمًا",
        "en": "Chocolate cake: 12 dirhams",
        "tl": "kaʿkatu-sh-shūkūlāta ithnā ʿashara dirham"
      },
      {
        "speaker": "Menu",
        "tr": "فَطِيرَةٌ بِالْجُبْنِ: سَبْعَةُ دَرَاهِمَ",
        "en": "Cheese pastry: 7 dirhams",
        "tl": "faṭīratun bi-l-jubn sabʿatu darāhim"
      },
      {
        "speaker": "Waiter",
        "tr": "أَهْلًا وَسَهْلًا، مَاذَا تَطْلُبِينَ؟",
        "en": "Welcome! What would you like?",
        "tl": "ʾahlan wa-sahlan mādhā taṭlubīn"
      },
      {
        "speaker": "Customer",
        "tr": "أُرِيدُ قَهْوَةً عَرَبِيَّةً، مِنْ فَضْلِكَ.",
        "en": "I’d like an Arabic coffee, please.",
        "tl": "ʾurīdu qahwatan ʿarabiyyatan min faḍlik"
      },
      {
        "speaker": "Waiter",
        "tr": "هَلْ تُرِيدِينَ شَيْئًا مَعَهَا؟",
        "en": "Would you like anything with it?",
        "tl": "hal turīdīna shayʾan maʿahā"
      },
      {
        "speaker": "Customer",
        "tr": "نَعَمْ، قِطْعَةً مِنْ كَعْكَةِ الشُّوكُولَاتَةِ.",
        "en": "Yes, a slice of chocolate cake.",
        "tl": "naʿam qiṭʿatan min kaʿkati-sh-shūkūlāta"
      },
      {
        "speaker": "Waiter",
        "tr": "مُمْتَازٌ، الْمَجْمُوعُ عِشْرُونَ دِرْهَمًا.",
        "en": "Great. That’s twenty dirhams altogether.",
        "tl": "mumtāz al-majmūʿu ʿishrūna dirham"
      },
      {
        "speaker": "Customer",
        "tr": "تَفَضَّلْ، وَشُكْرًا.",
        "en": "Here you are — thank you.",
        "tl": "tafaḍḍal wa-shukran"
      }
    ],
    "glossary": [
      {
        "tr": "قَائِمَةُ",
        "en": "menu, list",
        "tl": "qāʾima"
      },
      {
        "tr": "الْمَشْرُوبَاتِ",
        "en": "drinks",
        "tl": "al-mashrūbāt"
      },
      {
        "tr": "الْحَلَوِيَّاتِ",
        "en": "desserts, sweets",
        "tl": "al-ḥalawiyyāt"
      },
      {
        "tr": "بِالْهَيْلِ",
        "en": "with cardamom",
        "tl": "bi-l-hayl"
      },
      {
        "tr": "عَصِيرُ بُرْتُقَالٍ",
        "en": "orange juice",
        "tl": "ʿaṣīr burtuqāl"
      },
      {
        "tr": "فَطِيرَةٌ",
        "en": "a pastry, a pie",
        "tl": "faṭīra"
      },
      {
        "tr": "تَطْلُبِينَ",
        "en": "you order, you’d like (to a woman)",
        "tl": "taṭlubīn"
      },
      {
        "tr": "قِطْعَةً",
        "en": "a piece, a slice",
        "tl": "qiṭʿa"
      },
      {
        "tr": "الْمَجْمُوعُ",
        "en": "the total",
        "tl": "al-majmūʿ"
      },
      {
        "tr": "تَفَضَّلْ",
        "en": "here you are (to a man)",
        "tl": "tafaḍḍal"
      }
    ],
    "questions": [
      {
        "q": "How much is the mint tea?",
        "options": [
          "8 dirhams",
          "6 dirhams",
          "10 dirhams",
          "7 dirhams"
        ],
        "answer": 1,
        "explain": "شَايٌ بِالنَّعْنَاعِ: سِتَّةُ دَرَاهِمَ — six dirhams."
      },
      {
        "q": "What does the customer order to drink?",
        "options": [
          "Arabic coffee",
          "Mint tea",
          "Orange juice",
          "Water"
        ],
        "answer": 0,
        "explain": "أُرِيدُ قَهْوَةً عَرَبِيَّةً — I’d like an Arabic coffee."
      },
      {
        "q": "What does she have with her drink?",
        "options": [
          "A cheese pastry",
          "Nothing",
          "Two pastries",
          "A slice of chocolate cake"
        ],
        "answer": 3,
        "explain": "قِطْعَةً مِنْ كَعْكَةِ الشُّوكُولَاتَةِ — a slice of chocolate cake."
      },
      {
        "q": "How much does she pay in total?",
        "options": [
          "18 dirhams",
          "12 dirhams",
          "20 dirhams",
          "22 dirhams"
        ],
        "answer": 2,
        "explain": "الْمَجْمُوعُ عِشْرُونَ دِرْهَمًا — coffee (8) + cake (12) = 20."
      }
    ]
  },
  {
    "id": "meet-the-new-colleague",
    "kind": "speech",
    "level": "A2",
    "title": "Meet the New Colleague",
    "titleNative": "أُقَدِّمُ نَفْسِي",
    "summary": "On his first morning, a new engineer introduces himself to his team.",
    "register": "polite",
    "lines": [
      {
        "tr": "صَبَاحُ الْخَيْرِ جَمِيعًا.",
        "en": "Good morning, everyone.",
        "tl": "ṣabāḥu-l-khayri jamīʿan"
      },
      {
        "tr": "اِسْمِي يُوسُفُ، وَأَنَا الْمُهَنْدِسُ الْجَدِيدُ فِي الْفَرِيقِ.",
        "en": "My name is Yusuf, and I’m the new engineer on the team.",
        "tl": "ismī yūsufu wa-ʾanā-l-muhandisu-l-jadīdu fī-l-farīq"
      },
      {
        "tr": "أَنَا مِنَ الْإِسْكَنْدَرِيَّةِ، وَلَكِنِّي أَعِيشُ هُنَا مُنْذُ سَنَتَيْنِ.",
        "en": "I’m from Alexandria, but I’ve been living here for two years.",
        "tl": "ʾanā mina-l-ʾiskandariyyati wa-lākinnī ʾaʿīshu hunā mundhu sanatayn"
      },
      {
        "tr": "دَرَسْتُ الْهَنْدَسَةَ فِي الْجَامِعَةِ، ثُمَّ عَمِلْتُ خَمْسَ سَنَوَاتٍ فِي شَرِكَةٍ صَغِيرَةٍ.",
        "en": "I studied engineering at university, then worked for five years at a small company.",
        "tl": "darastu-l-handasata fī-l-jāmiʿati thumma ʿamiltu khamsa sanawātin fī sharikatin ṣaghīra"
      },
      {
        "tr": "أَنَا سَعِيدٌ جِدًّا بِالِانْضِمَامِ إِلَيْكُمْ.",
        "en": "I’m very happy to be joining you.",
        "tl": "ʾanā saʿīdun jiddan bi-l-inḍimāmi ʾilaykum"
      },
      {
        "tr": "سَمِعْتُ أَشْيَاءَ جَمِيلَةً عَنْ هَذَا الْفَرِيقِ وَعَنْ طَرِيقَةِ عَمَلِكُمْ.",
        "en": "I’ve heard great things about this team and the way you work.",
        "tl": "samiʿtu ʾashyāʾa jamīlatan ʿan hādhā-l-farīqi wa-ʿan ṭarīqati ʿamalikum"
      },
      {
        "tr": "فِي وَقْتِ الْفَرَاغِ، أُحِبُّ كُرَةَ الْقَدَمِ وَالطَّبْخَ.",
        "en": "In my free time, I love football and cooking.",
        "tl": "fī waqti-l-farāghi ʾuḥibbu kurata-l-qadami wa-ṭ-ṭabkh"
      },
      {
        "tr": "وَإِذَا كَانَ أَحَدٌ مِنْكُمْ يُحِبُّ الْقَهْوَةَ، فَأَنَا أَعْرِفُ مَقْهًى مُمْتَازًا قُرْبَ الْمَكْتَبِ.",
        "en": "And if any of you like coffee, I know an excellent café near the office.",
        "tl": "wa-ʾidhā kāna ʾaḥadun minkum yuḥibbu-l-qahwata fa-ʾanā ʾaʿrifu maqhan mumtāzan qurba-l-maktab"
      },
      {
        "tr": "مَا زِلْتُ جَدِيدًا، لِذَلِكَ سَأَسْأَلُ أَسْئِلَةً كَثِيرَةً فِي الْبِدَايَةِ.",
        "en": "I’m still new, so I’ll be asking lots of questions at first.",
        "tl": "mā ziltu jadīdan li-dhālika sa-ʾasʾalu ʾasʾilatan kathīratan fī-l-bidāya"
      },
      {
        "tr": "أَرْجُو أَنْ تَصْبِرُوا عَلَيَّ قَلِيلًا!",
        "en": "I hope you’ll be a little patient with me!",
        "tl": "ʾarjū ʾan taṣbirū ʿalayya qalīlan"
      },
      {
        "tr": "شُكْرًا لَكُمْ عَلَى هَذَا التَّرْحِيبِ اللَّطِيفِ.",
        "en": "Thank you for this kind welcome.",
        "tl": "shukran lakum ʿalā hādhā-t-tarḥībi-l-laṭīf"
      },
      {
        "tr": "أَتَطَلَّعُ إِلَى الْعَمَلِ مَعَكُمْ.",
        "en": "I’m looking forward to working with you.",
        "tl": "ʾataṭallaʿu ʾilā-l-ʿamali maʿakum"
      }
    ],
    "glossary": [
      {
        "tr": "الْمُهَنْدِسُ",
        "en": "the engineer",
        "tl": "al-muhandis"
      },
      {
        "tr": "الْفَرِيقِ",
        "en": "the team",
        "tl": "al-farīq"
      },
      {
        "tr": "مُنْذُ سَنَتَيْنِ",
        "en": "for two years (literally “since two years”)",
        "tl": "mundhu sanatayn"
      },
      {
        "tr": "شَرِكَةٍ",
        "en": "a company",
        "tl": "sharika"
      },
      {
        "tr": "بِالِانْضِمَامِ إِلَيْكُمْ",
        "en": "to be joining you",
        "tl": "bi-l-inḍimām ʾilaykum"
      },
      {
        "tr": "وَقْتِ الْفَرَاغِ",
        "en": "free time",
        "tl": "waqt al-farāgh"
      },
      {
        "tr": "كُرَةَ الْقَدَمِ",
        "en": "football, soccer",
        "tl": "kurat al-qadam"
      },
      {
        "tr": "مَا زِلْتُ",
        "en": "I am still",
        "tl": "mā zilt"
      },
      {
        "tr": "تَصْبِرُوا عَلَيَّ",
        "en": "be patient with me (to a group)",
        "tl": "taṣbirū ʿalayy"
      },
      {
        "tr": "أَتَطَلَّعُ إِلَى",
        "en": "I look forward to",
        "tl": "ʾataṭallaʿ ʾilā"
      }
    ],
    "questions": [
      {
        "q": "What is Yusuf’s job?",
        "options": [
          "Teacher",
          "Engineer",
          "Doctor",
          "Chef"
        ],
        "answer": 1,
        "explain": "أَنَا الْمُهَنْدِسُ الْجَدِيدُ — I’m the new engineer."
      },
      {
        "q": "Where is Yusuf from?",
        "options": [
          "Cairo",
          "He doesn’t say",
          "Alexandria",
          "A small village"
        ],
        "answer": 2,
        "explain": "أَنَا مِنَ الْإِسْكَنْدَرِيَّةِ — I’m from Alexandria."
      },
      {
        "q": "How long did he work at his previous company?",
        "options": [
          "Five years",
          "Two years",
          "One year",
          "Ten years"
        ],
        "answer": 0,
        "explain": "عَمِلْتُ خَمْسَ سَنَوَاتٍ فِي شَرِكَةٍ صَغِيرَةٍ — five years at a small company."
      },
      {
        "q": "What does he ask his new colleagues for?",
        "options": [
          "Help finding a flat",
          "A coffee",
          "The office address",
          "A little patience"
        ],
        "answer": 3,
        "explain": "أَرْجُو أَنْ تَصْبِرُوا عَلَيَّ قَلِيلًا — I hope you’ll be a little patient with me."
      }
    ]
  },
  {
    "id": "a-wedding-speech",
    "kind": "speech",
    "level": "B1",
    "title": "A Speech for the Bride and Groom",
    "titleNative": "كَلِمَةٌ فِي حَفْلِ الزِّفَافِ",
    "summary": "At her best friend’s wedding, Hala tells the guests how she met the bride and how the bride fell for the groom.",
    "register": "polite",
    "lines": [
      {
        "tr": "مَسَاءُ الْخَيْرِ جَمِيعًا، وَشُكْرًا لِحُضُورِكُمْ فِي هَذِهِ اللَّيْلَةِ الْجَمِيلَةِ.",
        "en": "Good evening, everyone, and thank you for being here on this beautiful night.",
        "tl": "masāʾu-l-khayri jamīʿan wa-shukran li-ḥuḍūrikum fī hādhihi-l-laylati-l-jamīla"
      },
      {
        "tr": "اِسْمِي هَالَةُ، وَأَعْرِفُ الْعَرُوسَ مُنْذُ أَيَّامِ الْمَدْرَسَةِ الِابْتِدَائِيَّةِ.",
        "en": "My name is Hala, and I’ve known the bride since our primary-school days.",
        "tl": "ismī hālatu wa-ʾaʿrifu-l-ʿarūsa mundhu ʾayyāmi-l-madrasati-l-ibtidāʾiyya"
      },
      {
        "tr": "كُنَّا نَجْلِسُ مَعًا فِي الصَّفِّ، وَنَتَشَارَكُ الْأَسْرَارَ وَالسَّنْدَوِيشَاتِ.",
        "en": "We used to sit together in class and share secrets and sandwiches.",
        "tl": "kunnā najlisu maʿan fī-ṣ-ṣaffi wa-natashāraku-l-ʾasrāra wa-s-sandawīshāt"
      },
      {
        "tr": "سَلْمَى لَيْسَتْ صَدِيقَتِي فَقَطْ، بَلْ هِيَ أُخْتِي الَّتِي اخْتَرْتُهَا بِنَفْسِي.",
        "en": "Salma isn’t just my friend — she’s the sister I chose for myself.",
        "tl": "salmā laysat ṣadīqatī faqaṭ bal hiya ʾukhtī-llatī-khtartuhā bi-nafsī"
      },
      {
        "tr": "اِتَّصَلَتْ بِي سَلْمَى فِي مُنْتَصَفِ اللَّيْلِ بَعْدَ أَنْ قَابَلَتْ آدَمَ لِأَوَّلِ مَرَّةٍ.",
        "en": "Salma phoned me in the middle of the night after she met Adam for the first time.",
        "tl": "ittaṣalat bī salmā fī muntaṣafi-l-layli baʿda ʾan qābalat ʾādama li-ʾawwali marra"
      },
      {
        "tr": "وَقَالَتْ لِي: «أَظُنُّ أَنَّنِي وَجَدْتُ الشَّخْصَ الْمُنَاسِبَ».",
        "en": "And she said to me: “I think I’ve found the right person.”",
        "tl": "wa-qālat lī ʾaẓunnu ʾannanī wajadtu-sh-shakhṣa-l-munāsib"
      },
      {
        "tr": "فِي الْبِدَايَةِ ضَحِكْتُ، وَلَكِنْ عِنْدَمَا عَرَفْتُ آدَمَ فَهِمْتُ كُلَّ شَيْءٍ.",
        "en": "At first I laughed, but when I got to know Adam, I understood everything.",
        "tl": "fī-l-bidāyati ḍaḥiktu wa-lākin ʿindamā ʿaraftu ʾādama fahimtu kulla shayʾ"
      },
      {
        "tr": "آدَمُ رَجُلٌ طَيِّبٌ وَصَبُورٌ، وَيَجْعَلُهَا تَضْحَكُ كُلَّ يَوْمٍ.",
        "en": "Adam is a kind and patient man, and he makes her laugh every day.",
        "tl": "ʾādamu rajulun ṭayyibun wa-ṣabūrun wa-yajʿaluhā taḍḥaku kulla yawm"
      },
      {
        "tr": "وَالْأَهَمُّ مِنْ ذَلِكَ أَنَّهُ يَتَحَمَّلُ تَأَخُّرَهَا الدَّائِمَ!",
        "en": "And, even more importantly, he puts up with her always being late!",
        "tl": "wa-l-ʾahammu min dhālika ʾannahu yataḥammalu taʾakhkhurahā-d-dāʾim"
      },
      {
        "tr": "أَتَمَنَّى لَكُمَا حَيَاةً مَلِيئَةً بِالْحُبِّ وَالصِّحَّةِ وَالسَّعَادَةِ.",
        "en": "I wish you both a life full of love, health and happiness.",
        "tl": "ʾatamannā lakumā ḥayātan malīʾatan bi-l-ḥubbi wa-ṣ-ṣiḥḥati wa-s-saʿāda"
      },
      {
        "tr": "وَأَتَمَنَّى أَنْ تَبْقَى صَدَاقَتُنَا كَمَا هِيَ، حَتَّى بَعْدَ الزَّوَاجِ.",
        "en": "And I hope our friendship stays just as it is, even after the wedding.",
        "tl": "wa-ʾatamannā ʾan tabqā ṣadāqatunā kamā hiya ḥattā baʿda-z-zawāj"
      },
      {
        "tr": "وَالْآنَ، أَرْجُو أَنْ تُصَفِّقُوا مَعِي لِلْعَرُوسَيْنِ: سَلْمَى وَآدَمَ!",
        "en": "And now, please join me in a round of applause for the happy couple, Salma and Adam!",
        "tl": "wa-l-ʾāna ʾarjū ʾan tuṣaffiqū maʿī li-l-ʿarūsayn salmā wa-ʾādam"
      },
      {
        "tr": "أَلْفُ مَبْرُوكٍ!",
        "en": "Congratulations!",
        "tl": "ʾalfu mabrūk"
      }
    ],
    "glossary": [
      {
        "tr": "الْعَرُوسَ",
        "en": "the bride",
        "tl": "al-ʿarūs"
      },
      {
        "tr": "الْمَدْرَسَةِ الِابْتِدَائِيَّةِ",
        "en": "primary school",
        "tl": "al-madrasa-l-ibtidāʾiyya"
      },
      {
        "tr": "نَتَشَارَكُ",
        "en": "we share",
        "tl": "natashārak"
      },
      {
        "tr": "الْأَسْرَارَ",
        "en": "secrets",
        "tl": "al-ʾasrār"
      },
      {
        "tr": "الشَّخْصَ الْمُنَاسِبَ",
        "en": "the right person",
        "tl": "ash-shakhṣ al-munāsib"
      },
      {
        "tr": "صَبُورٌ",
        "en": "patient",
        "tl": "ṣabūr"
      },
      {
        "tr": "يَتَحَمَّلُ",
        "en": "he puts up with, he tolerates",
        "tl": "yataḥammal"
      },
      {
        "tr": "تَأَخُّرَهَا",
        "en": "her lateness, her being late",
        "tl": "taʾakhkhurahā"
      },
      {
        "tr": "لِلْعَرُوسَيْنِ",
        "en": "for the bride and groom (literally “the two newlyweds”)",
        "tl": "li-l-ʿarūsayn"
      },
      {
        "tr": "أَلْفُ مَبْرُوكٍ",
        "en": "congratulations! (literally “a thousand blessings”)",
        "tl": "ʾalf mabrūk"
      }
    ],
    "questions": [
      {
        "q": "How long has Hala known the bride?",
        "options": [
          "Since university",
          "Since primary school",
          "For two years",
          "Since they were neighbours"
        ],
        "answer": 1,
        "explain": "مُنْذُ أَيَّامِ الْمَدْرَسَةِ الِابْتِدَائِيَّةِ — since primary-school days."
      },
      {
        "q": "What did Salma do after meeting Adam for the first time?",
        "options": [
          "She wrote Hala a letter",
          "She told her parents",
          "She phoned Hala in the middle of the night",
          "She didn’t tell anyone"
        ],
        "answer": 2,
        "explain": "اِتَّصَلَتْ بِي سَلْمَى فِي مُنْتَصَفِ اللَّيْلِ — Salma phoned me in the middle of the night."
      },
      {
        "q": "What joke does Hala make about the couple?",
        "options": [
          "Adam puts up with Salma always being late",
          "Salma can’t cook",
          "Adam talks too much",
          "They met by mistake"
        ],
        "answer": 0,
        "explain": "يَتَحَمَّلُ تَأَخُّرَهَا الدَّائِمَ — he puts up with her constant lateness."
      },
      {
        "q": "What does Hala ask the guests to do at the end?",
        "options": [
          "Raise their glasses",
          "Dance with the couple",
          "Sit down for dinner",
          "Applaud the couple"
        ],
        "answer": 3,
        "explain": "أَرْجُو أَنْ تُصَفِّقُوا مَعِي لِلْعَرُوسَيْنِ — please applaud the couple with me."
      }
    ]
  },
  {
    "id": "my-hobby-photography",
    "kind": "speech",
    "level": "B1",
    "title": "My Hobby: Photography",
    "titleNative": "هِوَايَتِي: التَّصْوِيرُ",
    "summary": "In a short talk, the speaker explains how they got into street photography and what it has taught them.",
    "register": "polite",
    "lines": [
      {
        "tr": "مَرْحَبًا بِكُمْ جَمِيعًا.",
        "en": "Hello, everyone.",
        "tl": "marḥaban bikum jamīʿan"
      },
      {
        "tr": "سَأُحَدِّثُكُمُ الْيَوْمَ عَنْ هِوَايَتِي الْمُفَضَّلَةِ: التَّصْوِيرِ.",
        "en": "Today I’m going to tell you about my favourite hobby: photography.",
        "tl": "sa-ʾuḥaddithukumu-l-yawma ʿan hiwāyatī-l-mufaḍḍala at-taṣwīr"
      },
      {
        "tr": "بَدَأْتُ أُصَوِّرُ قَبْلَ خَمْسِ سَنَوَاتٍ، عِنْدَمَا أَهْدَانِي أَبِي كَامِيرَا قَدِيمَةً.",
        "en": "I started taking photos five years ago, when my father gave me an old camera.",
        "tl": "badaʾtu ʾuṣawwiru qabla khamsi sanawātin ʿindamā ʾahdānī ʾabī kāmīrā qadīma"
      },
      {
        "tr": "فِي الْبِدَايَةِ، كُنْتُ أُصَوِّرُ كُلَّ شَيْءٍ: الْقِطَطَ وَالزُّهُورَ وَالسَّيَّارَاتِ.",
        "en": "At first, I photographed everything: cats, flowers, cars.",
        "tl": "fī-l-bidāyati kuntu ʾuṣawwiru kulla shayʾ al-qiṭaṭa wa-z-zuhūra wa-s-sayyārāt"
      },
      {
        "tr": "وَمَعَ الْوَقْتِ، تَعَلَّمْتُ أَنَّ الصُّورَةَ الْجَيِّدَةَ تَحْكِي قِصَّةً.",
        "en": "Over time, I learned that a good photo tells a story.",
        "tl": "wa-maʿa-l-waqti taʿallamtu ʾanna-ṣ-ṣūrata-l-jayyidata taḥkī qiṣṣa"
      },
      {
        "tr": "الْآنَ أُحِبُّ تَصْوِيرَ النَّاسِ فِي الشَّوَارِعِ وَالْأَسْوَاقِ الْقَدِيمَةِ.",
        "en": "Now I love photographing people in the streets and the old markets.",
        "tl": "al-ʾāna ʾuḥibbu taṣwīra-n-nāsi fī-sh-shawāriʿi wa-l-ʾaswāqi-l-qadīma"
      },
      {
        "tr": "أُفَضِّلُ الْخُرُوجَ فِي الصَّبَاحِ الْبَاكِرِ، لِأَنَّ الضَّوْءَ يَكُونُ نَاعِمًا وَدَافِئًا.",
        "en": "I prefer to go out early in the morning, because the light is soft and warm.",
        "tl": "ʾufaḍḍilu-l-khurūja fī-ṣ-ṣabāḥi-l-bākiri li-ʾanna-ḍ-ḍawʾa yakūnu nāʿiman wa-dāfiʾ"
      },
      {
        "tr": "وَأَطْلُبُ الْإِذْنَ دَائِمًا قَبْلَ أَنْ أُصَوِّرَ أَيَّ شَخْصٍ.",
        "en": "And I always ask for permission before I photograph anyone.",
        "tl": "wa-ʾaṭlubu-l-ʾidhna dāʾiman qabla ʾan ʾuṣawwira ʾayya shakhṣ"
      },
      {
        "tr": "بَعْضُ النَّاسِ يَرْفُضُونَ، لَكِنَّ أَكْثَرَهُمْ يَبْتَسِمُونَ وَيُحِبُّونَ الْفِكْرَةَ.",
        "en": "Some people say no, but most of them smile and like the idea.",
        "tl": "baʿḍu-n-nāsi yarfuḍūna lākinna ʾaktharahum yabtasimūna wa-yuḥibbūna-l-fikra"
      },
      {
        "tr": "عَلَّمَنِي التَّصْوِيرُ أَنْ أُلَاحِظَ التَّفَاصِيلَ الصَّغِيرَةَ فِي حَيَاتِي الْيَوْمِيَّةِ.",
        "en": "Photography has taught me to notice the small details in my everyday life.",
        "tl": "ʿallamanī-t-taṣwīru ʾan ʾulāḥiẓa-t-tafāṣīla-ṣ-ṣaghīrata fī ḥayātī-l-yawmiyya"
      },
      {
        "tr": "كَمَا سَاعَدَنِي عَلَى التَّعَرُّفِ إِلَى أَشْخَاصٍ جُدُدٍ يُحِبُّونَ مَا أُحِبُّ.",
        "en": "It has also helped me get to know new people who love what I love.",
        "tl": "kamā sāʿadanī ʿalā-t-taʿarrufi ʾilā ʾashkhāṣin jududin yuḥibbūna mā ʾuḥibb"
      },
      {
        "tr": "نَصِيحَتِي لَكُمْ بَسِيطَةٌ: لَا تَحْتَاجُونَ إِلَى كَامِيرَا غَالِيَةٍ، فَهَاتِفُكُمْ يَكْفِي لِلْبِدَايَةِ.",
        "en": "My advice to you is simple: you don’t need an expensive camera — your phone is enough to start with.",
        "tl": "naṣīḥatī lakum basīṭa lā taḥtājūna ʾilā kāmīrā ghāliyatin fa-hātifukum yakfī li-l-bidāya"
      },
      {
        "tr": "الْمُهِمُّ أَنْ تَنْظُرُوا حَوْلَكُمْ بِعُيُونٍ جَدِيدَةٍ.",
        "en": "What matters is that you look around you with new eyes.",
        "tl": "al-muhimmu ʾan tanẓurū ḥawlakum bi-ʿuyūnin jadīda"
      },
      {
        "tr": "شُكْرًا لِاسْتِمَاعِكُمْ!",
        "en": "Thank you for listening!",
        "tl": "shukran li-stimāʿikum"
      }
    ],
    "glossary": [
      {
        "tr": "هِوَايَتِي",
        "en": "my hobby",
        "tl": "hiwāyatī"
      },
      {
        "tr": "التَّصْوِيرِ",
        "en": "photography, taking photos",
        "tl": "at-taṣwīr"
      },
      {
        "tr": "أَهْدَانِي",
        "en": "he gave me (as a present)",
        "tl": "ʾahdānī"
      },
      {
        "tr": "تَحْكِي قِصَّةً",
        "en": "tells a story",
        "tl": "taḥkī qiṣṣa"
      },
      {
        "tr": "الضَّوْءَ",
        "en": "the light",
        "tl": "aḍ-ḍawʾ"
      },
      {
        "tr": "نَاعِمًا",
        "en": "soft",
        "tl": "nāʿim"
      },
      {
        "tr": "الْإِذْنَ",
        "en": "permission",
        "tl": "al-ʾidhn"
      },
      {
        "tr": "أُلَاحِظَ",
        "en": "(to) notice",
        "tl": "ʾulāḥiẓ"
      },
      {
        "tr": "التَّفَاصِيلَ",
        "en": "the details",
        "tl": "at-tafāṣīl"
      },
      {
        "tr": "نَصِيحَتِي",
        "en": "my advice",
        "tl": "naṣīḥatī"
      }
    ],
    "questions": [
      {
        "q": "Who gave the speaker their first camera?",
        "options": [
          "Their father",
          "A friend",
          "Their teacher",
          "They bought it themselves"
        ],
        "answer": 0,
        "explain": "عِنْدَمَا أَهْدَانِي أَبِي كَامِيرَا قَدِيمَةً — when my father gave me an old camera."
      },
      {
        "q": "Why does the speaker like going out early in the morning?",
        "options": [
          "The streets are empty",
          "The light is soft and warm",
          "The markets are cheaper",
          "It isn’t hot yet"
        ],
        "answer": 1,
        "explain": "لِأَنَّ الضَّوْءَ يَكُونُ نَاعِمًا وَدَافِئًا — because the light is soft and warm."
      },
      {
        "q": "What does the speaker always do before photographing someone?",
        "options": [
          "Pays them",
          "Shows them old photos",
          "Asks for permission",
          "Takes a test shot"
        ],
        "answer": 2,
        "explain": "وَأَطْلُبُ الْإِذْنَ دَائِمًا — and I always ask permission."
      },
      {
        "q": "What is the speaker’s advice?",
        "options": [
          "Buy a good camera first",
          "Only photograph people",
          "Take a photography course",
          "A phone is enough to start with"
        ],
        "answer": 3,
        "explain": "لَا تَحْتَاجُونَ إِلَى كَامِيرَا غَالِيَةٍ، فَهَاتِفُكُمْ يَكْفِي لِلْبِدَايَةِ."
      }
    ]
  }
];
