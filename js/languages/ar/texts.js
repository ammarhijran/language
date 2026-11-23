// Read & Listen: graded dialogues, stories, everyday texts, speeches, tongue twisters and proverbs.
// Each text: { id, kind, level, title, titleNative, summary, dialect?, register?,
//   lines: [{ speaker?, tr, en, tl, note? }], glossary: [{ tr, en, tl }],
//   questions: [{ q, options[4], answer, explain }] }.
// Written and proofread with AI assistance; not yet reviewed by native speakers. Edit freely.
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
    "summary": "A woman bargains for a cotton shawl at a Cairo market stall and is told she can return it and asks about paying by card.",
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
        "tr": "مَمْنُوعٌ التَّدْخِينُ.",
        "en": "No smoking.",
        "tl": "mamnūʿun at-tadkhīn"
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
        "tr": "مَمْنُوعٌ",
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
  },
  {
    "id": "ar-juha-tale",
    "kind": "story",
    "level": "B1",
    "title": "Juha, His Son and the Donkey",
    "titleNative": "جُحَا وَابْنُهُ وَالْحِمَارُ",
    "summary": "A classic folk tale: Juha and his son set off for the market with their donkey, and everyone they pass finds something to criticise.",
    "register": "mixed",
    "lines": [
      {
        "tr": "جُحَا شَخْصِيَّةٌ مَشْهُورَةٌ فِي الْحِكَايَاتِ الشَّعْبِيَّةِ الْعَرَبِيَّةِ، تُضْحِكُ النَّاسَ وَتُعَلِّمُهُمْ فِي الْوَقْتِ نَفْسِهِ.",
        "en": "Juha is a famous character in Arab folk tales, who makes people laugh and teaches them something at the same time.",
        "tl": "juḥā shakhṣiyyatun mashhūratun fī-l-ḥikāyāti-sh-shaʿbiyyati-l-ʿarabiyyati tuḍḥiku-n-nāsa wa-tuʿallimuhum fī-l-waqti nafsih"
      },
      {
        "tr": "فِي يَوْمٍ مِنَ الْأَيَّامِ، أَرَادَ جُحَا أَنْ يَذْهَبَ مَعَ ابْنِهِ إِلَى سُوقِ الْمَدِينَةِ.",
        "en": "One day, Juha wanted to go to the town market with his son.",
        "tl": "fī yawmin mina-l-ʾayyāmi ʾarāda juḥā ʾan yadhhaba maʿa-bnihi ʾilā sūqi-l-madīna"
      },
      {
        "tr": "رَكِبَ جُحَا الْحِمَارَ، وَمَشَى ابْنُهُ الصَّغِيرُ خَلْفَهُ عَلَى قَدَمَيْهِ.",
        "en": "Juha rode the donkey, and his young son walked behind him on foot.",
        "tl": "rakiba juḥā-l-ḥimāra wa-mashā-bnuhu-ṣ-ṣaghīru khalfahu ʿalā qadamayh"
      },
      {
        "tr": "مَرَّا بِبَعْضِ النِّسَاءِ، فَقَالَتْ وَاحِدَةٌ مِنْهُنَّ: «مَا أَقْسَى هَذَا الْأَبَ!»",
        "en": "They passed some women, and one of them said: “What a hard-hearted father!”",
        "tl": "marrā bi-baʿḍi-n-nisāʾi fa-qālat wāḥidatun minhunn mā ʾaqsā hādhā-l-ʾab"
      },
      {
        "tr": "وَقَالَتْ أُخْرَى: «يَرْكَبُ هُوَ الْحِمَارَ، وَيَتْرُكُ ابْنَهُ الصَّغِيرَ يَمْشِي تَحْتَ الشَّمْسِ!»",
        "en": "And another said: “He rides the donkey himself and leaves his little boy to walk in the sun!”",
        "tl": "wa-qālat ʾukhrā yarkabu huwa-l-ḥimāra wa-yatruku-bnahu-ṣ-ṣaghīra yamshī taḥta-sh-shams"
      },
      {
        "tr": "سَمِعَ جُحَا هَذَا الْكَلَامَ، فَنَزَلَ عَنِ الْحِمَارِ وَأَرْكَبَ ابْنَهُ مَكَانَهُ.",
        "en": "Juha heard these words, so he got down from the donkey and put his son on it in his place.",
        "tl": "samiʿa juḥā hādhā-l-kalāma fa-nazala ʿani-l-ḥimāri wa-ʾarkaba-bnahu makānah"
      },
      {
        "tr": "بَعْدَ قَلِيلٍ، مَرَّا بِرِجَالٍ يَجْلِسُونَ أَمَامَ دُكَّانٍ صَغِيرٍ.",
        "en": "A little later, they passed some men sitting in front of a small shop.",
        "tl": "baʿda qalīlin marrā bi-rijālin yajlisūna ʾamāma dukkānin ṣaghīr"
      },
      {
        "tr": "قَالَ أَحَدُهُمْ بِصَوْتٍ مُرْتَفِعٍ: «اُنْظُرُوا إِلَى هَذَا الْوَلَدِ الَّذِي لَا يَحْتَرِمُ أَبَاهُ!»",
        "en": "One of them said in a loud voice: “Look at this boy who has no respect for his father!”",
        "tl": "qāla ʾaḥaduhum bi-ṣawtin murtafiʿ unẓurū ʾilā hādhā-l-waladi-lladhī lā yaḥtarimu ʾabāh"
      },
      {
        "tr": "وَأَضَافَ صَدِيقُهُ: «الْوَلَدُ يَرْكَبُ مُرْتَاحًا، وَأَبُوهُ الْكَبِيرُ فِي السِّنِّ يَمْشِي مُتْعَبًا!»",
        "en": "And his friend added: “The boy rides in comfort while his elderly father walks, worn out!”",
        "tl": "wa-ʾaḍāfa ṣadīquh al-waladu yarkabu murtāḥan wa-ʾabūhu-l-kabīru fī-s-sinni yamshī mutʿab"
      },
      {
        "tr": "خَجِلَ الْوَلَدُ مِنْ كَلَامِهِمْ، فَقَالَ لَهُ جُحَا: «سَنَرْكَبُ الْحِمَارَ مَعًا، وَلَنْ يَقُولَ أَحَدٌ شَيْئًا.»",
        "en": "The boy was embarrassed by what they said, so Juha told him: “We’ll ride the donkey together, and nobody will say a thing.”",
        "tl": "khajila-l-waladu min kalāmihim fa-qāla lahu juḥā sa-narkabu-l-ḥimāra maʿan wa-lan yaqūla ʾaḥadun shayʾ"
      },
      {
        "tr": "رَكِبَ الِاثْنَانِ عَلَى ظَهْرِ الْحِمَارِ، وَسَارَ الْحِمَارُ بِبُطْءٍ شَدِيدٍ.",
        "en": "The two of them got on the donkey’s back, and the donkey plodded along very slowly.",
        "tl": "rakiba-l-ithnāni ʿalā ẓahri-l-ḥimāri wa-sāra-l-ḥimāru bi-buṭʾin shadīd"
      },
      {
        "tr": "ثُمَّ مَرَّا بِمَجْمُوعَةٍ مِنَ الشَّبَابِ، فَصَاحَ وَاحِدٌ مِنْهُمْ: «أَلَا تَرْحَمَانِ هَذَا الْحَيَوَانَ الْمِسْكِينَ؟»",
        "en": "Then they passed a group of young men, and one of them shouted: “Have you two no pity for this poor animal?”",
        "tl": "thumma marrā bi-majmūʿatin mina-sh-shabābi fa-ṣāḥa wāḥidun minhum ʾalā tarḥamāni hādhā-l-ḥayawāna-l-miskīn"
      },
      {
        "tr": "فَنَزَلَ جُحَا وَابْنُهُ، وَمَشَيَا خَلْفَ الْحِمَارِ وَلَا أَحَدَ عَلَى ظَهْرِهِ.",
        "en": "So Juha and his son got down and walked behind the donkey, with nobody on its back.",
        "tl": "fa-nazala juḥā wa-bnuhu wa-mashayā khalfa-l-ḥimāri wa-lā ʾaḥada ʿalā ẓahrih"
      },
      {
        "tr": "وَعِنْدَ بَابِ السُّوقِ، رَآهُمَا بَعْضُ التُّجَّارِ فَضَحِكُوا كَثِيرًا.",
        "en": "At the market gate, some of the merchants saw them and laughed out loud.",
        "tl": "wa-ʿinda bābi-s-sūqi raʾāhumā baʿḍu-t-tujjāri fa-ḍaḥikū kathīran"
      },
      {
        "tr": "قَالَ تَاجِرٌ مِنْهُمْ: «عِنْدَهُمَا حِمَارٌ قَوِيٌّ، وَيَمْشِيَانِ عَلَى أَقْدَامِهِمَا فِي هَذَا الْحَرِّ!»",
        "en": "One of the merchants said: “They have a strong donkey, and they’re walking on their own two feet in this heat!”",
        "tl": "qāla tājirun minhum ʿindahumā ḥimārun qawiyyun wa-yamshiyāni ʿalā ʾaqdāmihimā fī hādhā-l-ḥarr"
      },
      {
        "tr": "وَسَأَلَ آخَرُ: «لِمَاذَا اشْتَرَيَا الْحِمَارَ إِذَنْ؟»",
        "en": "And another asked: “So why did they buy the donkey?”",
        "tl": "wa-saʾala ʾākhar limādhā-shtarayā-l-ḥimāra ʾidhan"
      },
      {
        "tr": "وَقَفَ جُحَا فِي وَسَطِ الطَّرِيقِ، وَنَظَرَ إِلَى ابْنِهِ وَإِلَى الْحِمَارِ، ثُمَّ ضَحِكَ.",
        "en": "Juha stopped in the middle of the road, looked at his son and at the donkey, and then laughed.",
        "tl": "waqafa juḥā fī wasaṭi-ṭ-ṭarīqi wa-naẓara ʾilā-bnihi wa-ʾilā-l-ḥimāri thumma ḍaḥik"
      },
      {
        "tr": "قَالَ لِابْنِهِ: «هَلْ رَأَيْتَ يَا بُنَيَّ؟»",
        "en": "He said to his son: “Did you see that, my boy?”",
        "tl": "qāla li-bnih hal raʾayta yā bunayy"
      },
      {
        "tr": "«رَكِبْتُ أَنَا فَلَامُونَا، وَرَكِبْتَ أَنْتَ فَلَامُونَا، وَرَكِبْنَا مَعًا فَلَامُونَا، وَمَشَيْنَا فَضَحِكُوا مِنَّا.»",
        "en": "“I rode and they blamed us, you rode and they blamed us, we both rode and they blamed us, and we walked and they laughed at us.”",
        "tl": "rakibtu ʾanā fa-lāmūnā wa-rakibta ʾanta fa-lāmūnā wa-rakibnā maʿan fa-lāmūnā wa-mashaynā fa-ḍaḥikū minnā"
      },
      {
        "tr": "ثُمَّ أَضَافَ وَهُوَ يَضْحَكُ: «لَمْ يَبْقَ إِلَّا أَنْ نَحْمِلَ الْحِمَارَ عَلَى أَكْتَافِنَا!»",
        "en": "Then he added, laughing: “The only thing left is for us to carry the donkey on our shoulders!”",
        "tl": "thumma ʾaḍāfa wa-huwa yaḍḥak lam yabqa ʾillā ʾan naḥmila-l-ḥimāra ʿalā ʾaktāfinā"
      },
      {
        "tr": "فَهِمَ الْوَلَدُ الدَّرْسَ، وَضَحِكَ مَعَ أَبِيهِ.",
        "en": "The boy understood the lesson and laughed along with his father.",
        "tl": "fahima-l-waladu-d-darsa wa-ḍaḥika maʿa ʾabīh"
      },
      {
        "tr": "ثُمَّ رَكِبَ جُحَا حِمَارَهُ كَمَا فَعَلَ فِي أَوَّلِ الطَّرِيقِ، وَدَخَلَا السُّوقَ دُونَ أَنْ يَهْتَمَّا بِكَلَامِ أَحَدٍ.",
        "en": "Then Juha got back on his donkey, just as at the start of the journey, and the two of them went into the market without caring what anyone said.",
        "tl": "thumma rakiba juḥā ḥimārahu kamā faʿala fī ʾawwali-ṭ-ṭarīqi wa-dakhalā-s-sūqa dūna ʾan yahtammā bi-kalāmi ʾaḥad"
      },
      {
        "tr": "وَلِهَذَا يَقُولُ النَّاسُ إِلَى الْيَوْمِ: «إِرْضَاءُ النَّاسِ غَايَةٌ لَا تُدْرَكُ.»",
        "en": "And that is why people still say to this day: “Pleasing everybody is a goal that can never be reached.”",
        "tl": "wa-li-hādhā yaqūlu-n-nāsu ʾilā-l-yawm ʾirḍāʾu-n-nāsi ghāyatun lā tudrak"
      }
    ],
    "glossary": [
      {
        "tr": "الْحِكَايَاتِ الشَّعْبِيَّةِ",
        "en": "folk tales",
        "tl": "al-ḥikāyāt ash-shaʿbiyya"
      },
      {
        "tr": "الْحِمَارَ",
        "en": "the donkey",
        "tl": "al-ḥimār"
      },
      {
        "tr": "مَا أَقْسَى",
        "en": "how hard-hearted…! (مَا + أَفْعَلَ makes an exclamation)",
        "tl": "mā ʾaqsā"
      },
      {
        "tr": "نَزَلَ عَنِ",
        "en": "he got down from, he dismounted",
        "tl": "nazal ʿan"
      },
      {
        "tr": "أَرْكَبَ",
        "en": "he put (someone) on to ride",
        "tl": "ʾarkab"
      },
      {
        "tr": "بِصَوْتٍ مُرْتَفِعٍ",
        "en": "in a loud voice",
        "tl": "bi-ṣawt murtafiʿ"
      },
      {
        "tr": "لَا يَحْتَرِمُ",
        "en": "does not respect",
        "tl": "lā yaḥtarim"
      },
      {
        "tr": "خَجِلَ",
        "en": "he was embarrassed, he felt ashamed",
        "tl": "khajil"
      },
      {
        "tr": "بِبُطْءٍ شَدِيدٍ",
        "en": "very slowly (literally “with great slowness”)",
        "tl": "bi-buṭʾ shadīd"
      },
      {
        "tr": "تَرْحَمَانِ",
        "en": "you two have mercy on (dual)",
        "tl": "tarḥamān"
      },
      {
        "tr": "التُّجَّارِ",
        "en": "the merchants, the traders (singular تَاجِر)",
        "tl": "at-tujjār"
      },
      {
        "tr": "لَامُونَا",
        "en": "they blamed us",
        "tl": "lāmūnā"
      },
      {
        "tr": "لَمْ يَبْقَ إِلَّا أَنْ",
        "en": "the only thing left is to… (literally “nothing remains except that”)",
        "tl": "lam yabqa ʾillā ʾan"
      },
      {
        "tr": "أَكْتَافِنَا",
        "en": "our shoulders",
        "tl": "ʾaktāfinā"
      },
      {
        "tr": "دُونَ أَنْ يَهْتَمَّا",
        "en": "without (the two of them) caring",
        "tl": "dūn ʾan yahtammā"
      },
      {
        "tr": "إِرْضَاءُ النَّاسِ",
        "en": "pleasing people, keeping everybody happy",
        "tl": "ʾirḍāʾ an-nās"
      },
      {
        "tr": "غَايَةٌ لَا تُدْرَكُ",
        "en": "a goal that cannot be reached",
        "tl": "ghāya lā tudrak"
      }
    ],
    "questions": [
      {
        "q": "At the start of the journey, who is walking?",
        "options": [
          "Juha",
          "Juha’s son",
          "Both of them",
          "Nobody — they both ride"
        ],
        "answer": 1,
        "explain": "رَكِبَ جُحَا الْحِمَارَ، وَمَشَى ابْنُهُ الصَّغِيرُ خَلْفَهُ — Juha rode and his young son walked behind him."
      },
      {
        "q": "Why do the men in front of the shop criticise the boy?",
        "options": [
          "He is riding while his father walks",
          "He is shouting at the donkey",
          "He is walking too slowly",
          "He refuses to go to the market"
        ],
        "answer": 0,
        "explain": "الْوَلَدُ يَرْكَبُ مُرْتَاحًا، وَأَبُوهُ الْكَبِيرُ فِي السِّنِّ يَمْشِي مُتْعَبًا — the boy rides in comfort while his elderly father walks."
      },
      {
        "q": "What do the young men say when father and son are both riding?",
        "options": [
          "That they should hurry up",
          "That the donkey is too expensive",
          "That the boy should get down",
          "That they have no pity for the poor animal"
        ],
        "answer": 3,
        "explain": "أَلَا تَرْحَمَانِ هَذَا الْحَيَوَانَ الْمِسْكِينَ؟ — have you two no pity for this poor animal?"
      },
      {
        "q": "What is the lesson of the story?",
        "options": [
          "A donkey should never carry two people",
          "Children must always obey their parents",
          "You can never please everybody",
          "Strangers usually give good advice"
        ],
        "answer": 2,
        "explain": "The last line gives the saying: إِرْضَاءُ النَّاسِ غَايَةٌ لَا تُدْرَكُ — pleasing people is a goal that cannot be reached."
      }
    ]
  },
  {
    "id": "ar-why-i-learn-arabic",
    "kind": "speech",
    "level": "B1",
    "title": "Why I’m Learning Arabic",
    "titleNative": "لِمَاذَا أَتَعَلَّمُ الْعَرَبِيَّةَ؟",
    "summary": "A learner tells a class or meetup why they started Arabic, what was hard, what helped — and one unforgettable mistake. It uses only first-person verbs, so it suits any speaker, man or woman, as it stands.",
    "register": "polite",
    "lines": [
      {
        "tr": "مَسَاءُ الْخَيْرِ جَمِيعًا، وَشُكْرًا لَكُمْ عَلَى حُضُورِكُمْ.",
        "en": "Good evening, everyone, and thank you for coming.",
        "tl": "masāʾu-l-khayri jamīʿan wa-shukran lakum ʿalā ḥuḍūrikum"
      },
      {
        "tr": "اِسْمِي سَامْ، وَأَعْمَلُ فِي مَكْتَبَةٍ صَغِيرَةٍ فِي وَسَطِ الْمَدِينَةِ.",
        "en": "My name is Sam, and I work in a small bookshop in the town centre.",
        "tl": "ismī sām wa-ʾaʿmalu fī maktabatin ṣaghīratin fī wasaṭi-l-madīna"
      },
      {
        "tr": "أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ مُنْذُ سَنَتَيْنِ، وَأُرِيدُ أَنْ أَحْكِيَ لَكُمُ الْيَوْمَ قِصَّتِي مَعَهَا.",
        "en": "I have been studying Arabic for two years, and today I would like to tell you my story with it.",
        "tl": "ʾadrusu-l-lughata-l-ʿarabiyyata mundhu sanatayni wa-ʾurīdu ʾan ʾaḥkiya lakumu-l-yawma qiṣṣatī maʿahā"
      },
      {
        "tr": "بَدَأْتُ لِسَبَبٍ بَسِيطٍ: لِي جِيرَانٌ مِنْ سُورِيَا، وَأَرَدْتُ أَنْ أَقُولَ لَهُمْ أَكْثَرَ مِنْ «مَرْحَبًا».",
        "en": "I started for a simple reason: I have neighbours from Syria, and I wanted to say more to them than “hello”.",
        "tl": "badaʾtu li-sababin basīṭ lī jīrānun min sūriyā wa-ʾaradtu ʾan ʾaqūla lahum ʾakthara min marḥaban"
      },
      {
        "tr": "فِي الْبِدَايَةِ، كَانَ كُلُّ شَيْءٍ صَعْبًا، وَكَانَتِ الْحُرُوفُ أَوَّلَ مُشْكِلَةٍ.",
        "en": "At first everything was hard, and the letters were the first problem.",
        "tl": "fī-l-bidāyati kāna kullu shayʾin ṣaʿban wa-kānati-l-ḥurūfu ʾawwala mushkila"
      },
      {
        "tr": "الْحَرْفُ الْوَاحِدُ يُكْتَبُ بِأَشْكَالٍ مُخْتَلِفَةٍ فِي أَوَّلِ الْكَلِمَةِ وَوَسَطِهَا وَآخِرِهَا.",
        "en": "One and the same letter is written in different shapes at the beginning, in the middle and at the end of a word.",
        "tl": "al-ḥarfu-l-wāḥidu yuktabu bi-ʾashkālin mukhtalifatin fī ʾawwali-l-kalimati wa-wasaṭihā wa-ʾākhirihā"
      },
      {
        "tr": "وَكُنْتُ أَبْدَأُ الْقِرَاءَةَ مِنَ الْيَسَارِ دُونَ أَنْ أَشْعُرَ!",
        "en": "And I kept starting to read from the left without noticing!",
        "tl": "wa-kuntu ʾabdaʾu-l-qirāʾata mina-l-yasāri dūna ʾan ʾashʿur"
      },
      {
        "tr": "ثُمَّ جَاءَتِ الْأَصْوَاتُ: الْعَيْنُ وَالْحَاءُ وَالْقَافُ.",
        "en": "Then came the sounds: ʿayn, ḥāʾ and qāf.",
        "tl": "thumma jāʾati-l-ʾaṣwāt al-ʿaynu wa-l-ḥāʾu wa-l-qāf"
      },
      {
        "tr": "تَدَرَّبْتُ عَلَيْهَا أَمَامَ الْمِرْآةِ كُلَّ صَبَاحٍ، حَتَّى ظَنَّ جِيرَانِي أَنَّ عِنْدِي أَلَمًا فِي الْحَلْقِ.",
        "en": "I practised them in front of the mirror every morning, until my neighbours thought I had a sore throat.",
        "tl": "tadarrabtu ʿalayhā ʾamāma-l-mirʾāti kulla ṣabāḥin ḥattā ẓanna jīrānī ʾanna ʿindī ʾalaman fī-l-ḥalq"
      },
      {
        "tr": "وَاكْتَشَفْتُ أَنَّ هُنَاكَ عَرَبِيَّةً فُصْحَى فِي الْكُتُبِ وَالْأَخْبَارِ، وَلَهَجَاتٍ كَثِيرَةً فِي الشَّوَارِعِ وَالْبُيُوتِ.",
        "en": "And I discovered that there is a formal, standard Arabic in books and on the news, and many dialects in the streets and at home.",
        "tl": "wa-ktashaftu ʾanna hunāka ʿarabiyyatan fuṣḥā fī-l-kutubi wa-l-ʾakhbāri wa-lahajātin kathīratan fī-sh-shawāriʿi wa-l-buyūt"
      },
      {
        "tr": "قُلْتُ لِجَارِي جُمْلَةً مِنَ الْكِتَابِ، فَضَحِكَ وَقَالَ: «لَا أَحَدَ يَتَكَلَّمُ هَكَذَا فِي الْبَيْتِ!»",
        "en": "I said a sentence from the textbook to my neighbour, and he laughed and said: “Nobody talks like that at home!”",
        "tl": "qultu li-jārī jumlatan mina-l-kitābi fa-ḍaḥika wa-qāl lā ʾaḥada yatakallamu hākadhā fī-l-bayt"
      },
      {
        "tr": "وَأَمَّا الْمُثَنَّى فَقِصَّةٌ أُخْرَى: كِتَابٌ، كِتَابَانِ، كُتُبٌ.",
        "en": "As for the dual, that is another story: one book, two books, books.",
        "tl": "wa-ʾammā-l-muthannā fa-qiṣṣatun ʾukhrā kitābun kitābāni kutub"
      },
      {
        "tr": "لِمَاذَا تَحْتَاجُ الْعَرَبِيَّةُ إِلَى شَكْلٍ خَاصٍّ لِشَيْئَيْنِ فَقَطْ؟",
        "en": "Why does Arabic need a special form for just two things?",
        "tl": "limādhā taḥtāju-l-ʿarabiyyatu ʾilā shaklin khāṣṣin li-shayʾayni faqaṭ"
      },
      {
        "tr": "مَا الَّذِي سَاعَدَنِي إِذَنْ؟",
        "en": "So what helped me?",
        "tl": "mā-lladhī sāʿadanī ʾidhan"
      },
      {
        "tr": "أَوَّلًا، أَكْتُبُ خَمْسَ كَلِمَاتٍ جَدِيدَةٍ كُلَّ يَوْمٍ وَأَسْتَعْمِلُهَا فِي جُمَلٍ قَصِيرَةٍ.",
        "en": "First, I write down five new words every day and use them in short sentences.",
        "tl": "ʾawwalan ʾaktubu khamsa kalimātin jadīdatin kulla yawmin wa-ʾastaʿmiluhā fī jumalin qaṣīra"
      },
      {
        "tr": "ثَانِيًا، أَسْتَمِعُ إِلَى الْأَغَانِي وَالْأَخْبَارِ بِالْعَرَبِيَّةِ وَأَنَا أَطْبُخُ أَوْ أَمْشِي.",
        "en": "Second, I listen to songs and the news in Arabic while I cook or walk.",
        "tl": "thāniyan ʾastamiʿu ʾilā-l-ʾaghānī wa-l-ʾakhbāri bi-l-ʿarabiyyati wa-ʾanā ʾaṭbukhu ʾaw ʾamshī"
      },
      {
        "tr": "ثَالِثًا، أَتَكَلَّمُ مَعَ جِيرَانِي مَرَّةً فِي الْأُسْبُوعِ، وَلَا أَخَافُ مِنَ الْأَخْطَاءِ.",
        "en": "Third, I talk with my neighbours once a week, and I am not afraid of mistakes.",
        "tl": "thālithan ʾatakallamu maʿa jīrānī marratan fī-l-ʾusbūʿi wa-lā ʾakhāfu mina-l-ʾakhṭāʾ"
      },
      {
        "tr": "وَعَلَى ذِكْرِ الْأَخْطَاءِ، لِي خَطَأٌ لَنْ أَنْسَاهُ أَبَدًا.",
        "en": "And speaking of mistakes, there is one of mine that I will never forget.",
        "tl": "wa-ʿalā dhikri-l-ʾakhṭāʾi lī khaṭaʾun lan ʾansāhu ʾabadan"
      },
      {
        "tr": "أَرَدْتُ مَرَّةً أَنْ أَقُولَ لِجَارَتِي: «قَلْبُكِ كَبِيرٌ»، فَقُلْتُ لَهَا: «كَلْبُكِ كَبِيرٌ»!",
        "en": "I once wanted to tell my neighbour, “You have a big heart,” and what I said to her was, “You have a big dog”!",
        "tl": "ʾaradtu marratan ʾan ʾaqūla li-jāratī qalbuki kabīrun fa-qultu lahā kalbuki kabīr"
      },
      {
        "tr": "ضَحِكَتْ كَثِيرًا، ثُمَّ عَلَّمَتْنِي الْفَرْقَ بَيْنَ الْقَافِ وَالْكَافِ، وَلَمْ أَنْسَهُ بَعْدَ ذَلِكَ.",
        "en": "She laughed a lot, then taught me the difference between qāf and kāf, and I have never forgotten it since.",
        "tl": "ḍaḥikat kathīran thumma ʿallamatnī-l-farqa bayna-l-qāfi wa-l-kāfi wa-lam ʾansahu baʿda dhālik"
      },
      {
        "tr": "الْيَوْمَ أَسْتَطِيعُ أَنْ أَقْرَأَ قِصَّةً قَصِيرَةً وَأَنْ أَطْلُبَ الطَّعَامَ فِي الْمَطْعَمِ بِالْعَرَبِيَّةِ.",
        "en": "Today I can read a short story and order food in a restaurant in Arabic.",
        "tl": "al-yawma ʾastaṭīʿu ʾan ʾaqraʾa qiṣṣatan qaṣīratan wa-ʾan ʾaṭluba-ṭ-ṭaʿāma fī-l-maṭʿami bi-l-ʿarabiyya"
      },
      {
        "tr": "فِي السَّنَةِ الْقَادِمَةِ، أُرِيدُ أَنْ أُسَافِرَ إِلَى الْأُرْدُنِّ وَأَنْ أَدْرُسَ هُنَاكَ شَهْرًا أَوْ شَهْرَيْنِ.",
        "en": "Next year, I want to travel to Jordan and study there for a month or two.",
        "tl": "fī-s-sanati-l-qādimati ʾurīdu ʾan ʾusāfira ʾilā-l-ʾurdunni wa-ʾan ʾadrusa hunāka shahran ʾaw shahrayn"
      },
      {
        "tr": "وَحُلْمِي أَنْ أَقْرَأَ رِوَايَةً عَرَبِيَّةً كَامِلَةً بِدُونِ قَامُوسٍ.",
        "en": "And my dream is to read a whole Arabic novel without a dictionary.",
        "tl": "wa-ḥulmī ʾan ʾaqraʾa riwāyatan ʿarabiyyatan kāmilatan bi-dūni qāmūs"
      },
      {
        "tr": "نَصِيحَتِي لِمَنْ يَبْدَأُ الْآنَ: لَا تَنْتَظِرُوا حَتَّى تَتَكَلَّمُوا بِلَا أَخْطَاءٍ، بَلْ تَكَلَّمُوا مِنَ الْيَوْمِ الْأَوَّلِ.",
        "en": "My advice to anyone starting now: don’t wait until you can speak without mistakes — speak from day one.",
        "tl": "naṣīḥatī li-man yabdaʾu-l-ʾān lā tantaẓirū ḥattā tatakallamū bi-lā ʾakhṭāʾin bal takallamū mina-l-yawmi-l-ʾawwal"
      },
      {
        "tr": "أَشْكُرُ كُلَّ مَنْ عَلَّمَنِي حَرْفًا، وَأَشْكُرُكُمْ عَلَى حُسْنِ اسْتِمَاعِكُمْ.",
        "en": "I thank everyone who has taught me so much as a single letter, and I thank you for listening so kindly.",
        "tl": "ʾashkuru kulla man ʿallamanī ḥarfan wa-ʾashkurukum ʿalā ḥusni-stimāʿikum"
      }
    ],
    "glossary": [
      {
        "tr": "لِسَبَبٍ بَسِيطٍ",
        "en": "for a simple reason",
        "tl": "li-sabab basīṭ"
      },
      {
        "tr": "جِيرَانٌ",
        "en": "neighbours (singular جَار / جَارَة)",
        "tl": "jīrān"
      },
      {
        "tr": "بِأَشْكَالٍ مُخْتَلِفَةٍ",
        "en": "in different shapes, in different forms",
        "tl": "bi-ʾashkāl mukhtalifa"
      },
      {
        "tr": "دُونَ أَنْ أَشْعُرَ",
        "en": "without noticing, without realising",
        "tl": "dūn ʾan ʾashʿur"
      },
      {
        "tr": "الْأَصْوَاتُ",
        "en": "the sounds (singular صَوْت)",
        "tl": "al-ʾaṣwāt"
      },
      {
        "tr": "تَدَرَّبْتُ",
        "en": "I practised, I trained (followed by عَلَى)",
        "tl": "tadarrabt"
      },
      {
        "tr": "الْمِرْآةِ",
        "en": "the mirror",
        "tl": "al-mirʾāh"
      },
      {
        "tr": "الْحَلْقِ",
        "en": "the throat",
        "tl": "al-ḥalq"
      },
      {
        "tr": "اكْتَشَفْتُ",
        "en": "I discovered",
        "tl": "iktashaft"
      },
      {
        "tr": "فُصْحَى",
        "en": "formal, standard (Arabic): the language of books, news and speeches",
        "tl": "fuṣḥā"
      },
      {
        "tr": "لَهَجَاتٍ",
        "en": "dialects (singular لَهْجَة)",
        "tl": "lahajāt"
      },
      {
        "tr": "الْمُثَنَّى",
        "en": "the dual: the special form for two of something",
        "tl": "al-muthannā"
      },
      {
        "tr": "أَسْتَعْمِلُهَا",
        "en": "I use them",
        "tl": "ʾastaʿmiluhā"
      },
      {
        "tr": "عَلَى ذِكْرِ",
        "en": "speaking of…, while we are on the subject of…",
        "tl": "ʿalā dhikr"
      },
      {
        "tr": "الْفَرْقَ بَيْنَ",
        "en": "the difference between",
        "tl": "al-farq bayn"
      },
      {
        "tr": "رِوَايَةً",
        "en": "a novel",
        "tl": "riwāya"
      },
      {
        "tr": "قَامُوسٍ",
        "en": "a dictionary",
        "tl": "qāmūs"
      },
      {
        "tr": "حُسْنِ اسْتِمَاعِكُمْ",
        "en": "your kind attention (literally “the goodness of your listening”)",
        "tl": "ḥusn istimāʿikum"
      }
    ],
    "questions": [
      {
        "q": "Why did the speaker start learning Arabic?",
        "options": [
          "To get a job abroad",
          "To talk to their neighbours from Syria",
          "Because it was a school subject",
          "To read old poetry"
        ],
        "answer": 1,
        "explain": "لِي جِيرَانٌ مِنْ سُورِيَا، وَأَرَدْتُ أَنْ أَقُولَ لَهُمْ أَكْثَرَ مِنْ «مَرْحَبًا» — I have neighbours from Syria and wanted to say more than “hello”."
      },
      {
        "q": "What did the neighbours think when the speaker practised the sounds every morning?",
        "options": [
          "That the speaker was learning to sing",
          "That the speaker was arguing with someone",
          "That the speaker had a sore throat",
          "That the speaker was on the phone"
        ],
        "answer": 2,
        "explain": "حَتَّى ظَنَّ جِيرَانِي أَنَّ عِنْدِي أَلَمًا فِي الْحَلْقِ — until my neighbours thought I had a pain in my throat."
      },
      {
        "q": "What was the mistake the speaker will never forget?",
        "options": [
          "Saying “your dog is big” instead of “your heart is big”",
          "Reading a whole page from left to right",
          "Calling the neighbour by the wrong name",
          "Saying “two books” instead of “books”"
        ],
        "answer": 0,
        "explain": "The speaker meant قَلْبُكِ كَبِيرٌ (your heart is big) but said كَلْبُكِ كَبِيرٌ (your dog is big) — ك instead of ق."
      },
      {
        "q": "What is the speaker’s advice to people who are starting now?",
        "options": [
          "Learn the dialect before the standard language",
          "Buy a good dictionary first",
          "Spend a month in Jordan",
          "Speak from the very first day, mistakes and all"
        ],
        "answer": 3,
        "explain": "لَا تَنْتَظِرُوا حَتَّى تَتَكَلَّمُوا بِلَا أَخْطَاءٍ، بَلْ تَكَلَّمُوا مِنَ الْيَوْمِ الْأَوَّلِ — don’t wait until you speak without mistakes; speak from day one."
      }
    ]
  },
  {
    "id": "ar-letter-from-amman",
    "kind": "everyday",
    "level": "A2",
    "title": "A Letter from Amman",
    "titleNative": "رِسَالَةٌ مِنْ عَمَّانَ",
    "summary": "Layla (a woman) writes to her friend Rim (also a woman) about her new life in Amman — her flat, her neighbourhood, her working day, the food and her weekends — and invites her to visit.",
    "register": "casual",
    "lines": [
      {
        "tr": "عَزِيزَتِي رِيمُ، كَيْفَ حَالُكِ وَكَيْفَ حَالُ عَائِلَتِكِ؟",
        "en": "Dear Rim, how are you, and how is your family?",
        "tl": "ʿazīzatī rīmu kayfa ḥāluki wa-kayfa ḥālu ʿāʾilatik"
      },
      {
        "tr": "أَكْتُبُ لَكِ مِنْ عَمَّانَ، فَأَنَا أَسْكُنُ هُنَا مُنْذُ شَهْرَيْنِ.",
        "en": "I’m writing to you from Amman — I’ve been living here for two months now.",
        "tl": "ʾaktubu laki min ʿammāna fa-ʾanā ʾaskunu hunā mundhu shahrayn"
      },
      {
        "tr": "وَجَدْتُ شَقَّةً صَغِيرَةً فِي الطَّابِقِ الثَّالِثِ، فِيهَا غُرْفَةُ نَوْمٍ وَمَطْبَخٌ وَشُرْفَةٌ جَمِيلَةٌ.",
        "en": "I found a small flat on the third floor, with a bedroom, a kitchen and a lovely balcony.",
        "tl": "wajadtu shaqqatan ṣaghīratan fī-ṭ-ṭābiqi-th-thālithi fīhā ghurfatu nawmin wa-maṭbakhun wa-shurfatun jamīla"
      },
      {
        "tr": "مِنَ الشُّرْفَةِ أَرَى بُيُوتَ الْمَدِينَةِ الْبَيْضَاءَ عَلَى الْجِبَالِ.",
        "en": "From the balcony I can see the city’s white houses on the hills.",
        "tl": "mina-sh-shurfati ʾarā buyūta-l-madīnati-l-bayḍāʾa ʿalā-l-jibāl"
      },
      {
        "tr": "الْحَيُّ هَادِئٌ وَقَدِيمٌ، وَفِيهِ مَخْبَزٌ وَبَقَّالَةٌ وَمَقْهًى صَغِيرٌ.",
        "en": "The neighbourhood is quiet and old, and it has a bakery, a grocer’s and a small café.",
        "tl": "al-ḥayyu hādiʾun wa-qadīmun wa-fīhi makhbazun wa-baqqālatun wa-maqhan ṣaghīr"
      },
      {
        "tr": "جَارَتِي أُمُّ خَالِدٍ طَيِّبَةُ الْقَلْبِ، وَتُحْضِرُ لِي أَحْيَانًا طَبَقًا مِنْ طَعَامِهَا.",
        "en": "My neighbour, Umm Khalid, is kind-hearted, and she sometimes brings me a plate of her cooking.",
        "tl": "jāratī ʾummu khālidin ṭayyibatu-l-qalbi wa-tuḥḍiru lī ʾaḥyānan ṭabaqan min ṭaʿāmihā"
      },
      {
        "tr": "أَسْتَيْقِظُ كُلَّ يَوْمٍ فِي السَّاعَةِ السَّابِعَةِ، وَأَشْرَبُ قَهْوَتِي عَلَى الشُّرْفَةِ.",
        "en": "I wake up every day at seven o’clock and drink my coffee on the balcony.",
        "tl": "ʾastayqiẓu kulla yawmin fī-s-sāʿati-s-sābiʿati wa-ʾashrabu qahwatī ʿalā-sh-shurfa"
      },
      {
        "tr": "ثُمَّ أَذْهَبُ إِلَى الْعَمَلِ بِالْحَافِلَةِ، وَأَصِلُ بَعْدَ نِصْفِ سَاعَةٍ تَقْرِيبًا.",
        "en": "Then I go to work by bus, and I get there about half an hour later.",
        "tl": "thumma ʾadhhabu ʾilā-l-ʿamali bi-l-ḥāfilati wa-ʾaṣilu baʿda niṣfi sāʿatin taqrīban"
      },
      {
        "tr": "أَعْمَلُ فِي مَدْرَسَةٍ لِلُّغَاتِ، وَزُمَلَائِي لُطَفَاءُ مَعِي.",
        "en": "I work at a language school, and my colleagues are nice to me.",
        "tl": "ʾaʿmalu fī madrasatin li-l-lughāti wa-zumalāʾī luṭafāʾu maʿī"
      },
      {
        "tr": "أَرْجِعُ إِلَى الْبَيْتِ فِي السَّاعَةِ الْخَامِسَةِ مُتْعَبَةً وَلَكِنْ سَعِيدَةً.",
        "en": "I get home at five o’clock, tired but happy.",
        "tl": "ʾarjiʿu ʾilā-l-bayti fī-s-sāʿati-l-khāmisati mutʿabatan wa-lākin saʿīda"
      },
      {
        "tr": "الطَّعَامُ هُنَا لَذِيذٌ جِدًّا، وَأَنَا أُحِبُّ الْفَلَافِلَ وَالْحُمُّصَ فِي الصَّبَاحِ.",
        "en": "The food here is delicious, and I love falafel and hummus in the morning.",
        "tl": "aṭ-ṭaʿāmu hunā ladhīdhun jiddan wa-ʾanā ʾuḥibbu-l-falāfila wa-l-ḥummuṣa fī-ṣ-ṣabāḥ"
      },
      {
        "tr": "فِي الْأُسْبُوعِ الْمَاضِي، دَعَتْنِي زَمِيلَتِي إِلَى الْغَدَاءِ فِي بَيْتِ أَهْلِهَا، وَأَكَلْتُ الْمَنْسَفَ لِأَوَّلِ مَرَّةٍ.",
        "en": "Last week, a colleague invited me to lunch at her family’s house, and I ate mansaf for the first time.",
        "tl": "fī-l-ʾusbūʿi-l-māḍī daʿatnī zamīlatī ʾilā-l-ghadāʾi fī bayti ʾahlihā wa-ʾakaltu-l-mansafa li-ʾawwali marra"
      },
      {
        "tr": "الْمَنْسَفُ أَشْهَرُ طَبَقٍ فِي الْأُرْدُنِّ: أَرُزٌّ وَلَحْمٌ وَلَبَنٌ.",
        "en": "Mansaf is the most famous dish in Jordan: rice, meat and yoghurt.",
        "tl": "al-mansafu ʾashharu ṭabaqin fī-l-ʾurdunn ʾaruzzun wa-laḥmun wa-laban"
      },
      {
        "tr": "عُطْلَةُ نِهَايَةِ الْأُسْبُوعِ هُنَا يَوْمَ الْجُمُعَةِ وَيَوْمَ السَّبْتِ، فَأَنَامُ حَتَّى السَّاعَةِ التَّاسِعَةِ.",
        "en": "The weekend here is Friday and Saturday, so I sleep until nine o’clock.",
        "tl": "ʿuṭlatu nihāyati-l-ʾusbūʿi hunā yawma-l-jumuʿati wa-yawma-s-sabti fa-ʾanāmu ḥattā-s-sāʿati-t-tāsiʿa"
      },
      {
        "tr": "يَوْمَ الْجُمُعَةِ الْمَاضِيَةِ، ذَهَبْتُ مَعَ زَمِيلَاتِي إِلَى وَسَطِ الْبَلَدِ وَمَشَيْنَا فِي السُّوقِ الْقَدِيمِ.",
        "en": "Last Friday, I went downtown with my colleagues and we walked around the old market.",
        "tl": "yawma-l-jumuʿati-l-māḍiyati dhahabtu maʿa zamīlātī ʾilā wasaṭi-l-baladi wa-mashaynā fī-s-sūqi-l-qadīm"
      },
      {
        "tr": "ثُمَّ صَعِدْنَا إِلَى الْقَلْعَةِ، وَرَأَيْنَا الْمَدِينَةَ كُلَّهَا عِنْدَ غُرُوبِ الشَّمْسِ.",
        "en": "Then we went up to the Citadel and saw the whole city at sunset.",
        "tl": "thumma ṣaʿidnā ʾilā-l-qalʿati wa-raʾaynā-l-madīnata kullahā ʿinda ghurūbi-sh-shams"
      },
      {
        "tr": "الطَّقْسُ الْآنَ جَمِيلٌ: النَّهَارُ دَافِئٌ، وَاللَّيْلُ بَارِدٌ قَلِيلًا.",
        "en": "The weather is lovely at the moment: the days are warm, and the nights are a little cold.",
        "tl": "aṭ-ṭaqsu-l-ʾāna jamīl an-nahāru dāfiʾun wa-l-laylu bāridun qalīlan"
      },
      {
        "tr": "أَتَعَلَّمُ أَيْضًا بَعْضَ الْكَلِمَاتِ مِنَ اللَّهْجَةِ الْأُرْدُنِّيَّةِ، وَالنَّاسُ يَبْتَسِمُونَ عِنْدَمَا أَسْتَعْمِلُهَا.",
        "en": "I’m also learning a few words of the Jordanian dialect, and people smile when I use them.",
        "tl": "ʾataʿallamu ʾayḍan baʿḍa-l-kalimāti mina-l-lahjati-l-ʾurdunniyyati wa-n-nāsu yabtasimūna ʿindamā ʾastaʿmiluhā"
      },
      {
        "tr": "لَكِنِّي أَشْتَاقُ إِلَيْكِ كَثِيرًا، وَإِلَى قَهْوَةِ يَوْمِ السَّبْتِ مَعَكِ.",
        "en": "But I miss you a lot, and our Saturday coffee together.",
        "tl": "lākinnī ʾashtāqu ʾilayki kathīran wa-ʾilā qahwati yawmi-s-sabti maʿak"
      },
      {
        "tr": "مَتَى تَزُورِينَنِي؟",
        "en": "When are you coming to visit me?",
        "tl": "matā tazūrīnanī"
      },
      {
        "tr": "عِنْدِي مَكَانٌ لَكِ فِي الشَّقَّةِ، وَالتَّذَاكِرُ رَخِيصَةٌ فِي فَصْلِ الرَّبِيعِ.",
        "en": "I have room for you in the flat, and tickets are cheap in the spring.",
        "tl": "ʿindī makānun laki fī-sh-shaqqati wa-t-tadhākiru rakhīṣatun fī faṣli-r-rabīʿ"
      },
      {
        "tr": "إِذَا جِئْتِ، فَسَنَذْهَبُ مَعًا إِلَى الْبَتْرَاءِ وَإِلَى الْبَحْرِ الْمَيِّتِ.",
        "en": "If you come, we’ll go to Petra and to the Dead Sea together.",
        "tl": "ʾidhā jiʾti fa-sa-nadhhabu maʿan ʾilā-l-batrāʾi wa-ʾilā-l-baḥri-l-mayyit"
      },
      {
        "tr": "اُكْتُبِي لِي قَرِيبًا، وَأَخْبِرِينِي بِكُلِّ أَخْبَارِكِ.",
        "en": "Write to me soon and tell me all your news.",
        "tl": "uktubī lī qarīban wa-ʾakhbirīnī bi-kulli ʾakhbārik"
      },
      {
        "tr": "سَلِّمِي لِي عَلَى أُمِّكِ وَأَبِيكِ.",
        "en": "Say hello to your mum and dad for me.",
        "tl": "sallimī lī ʿalā ʾummiki wa-ʾabīk"
      },
      {
        "tr": "مَعَ كُلِّ الْحُبِّ، صَدِيقَتُكِ لَيْلَى.",
        "en": "With all my love, your friend Layla.",
        "tl": "maʿa kulli-l-ḥubbi ṣadīqatuki laylā"
      }
    ],
    "glossary": [
      {
        "tr": "الطَّابِقِ الثَّالِثِ",
        "en": "the third floor",
        "tl": "aṭ-ṭābiq ath-thālith"
      },
      {
        "tr": "شُرْفَةٌ",
        "en": "a balcony",
        "tl": "shurfa"
      },
      {
        "tr": "الْحَيُّ",
        "en": "the neighbourhood, the district",
        "tl": "al-ḥayy"
      },
      {
        "tr": "بَقَّالَةٌ",
        "en": "a grocer’s, a small food shop",
        "tl": "baqqāla"
      },
      {
        "tr": "طَيِّبَةُ الْقَلْبِ",
        "en": "kind-hearted (of a woman; literally “good of heart”)",
        "tl": "ṭayyibat al-qalb"
      },
      {
        "tr": "تُحْضِرُ لِي",
        "en": "she brings me",
        "tl": "tuḥḍir lī"
      },
      {
        "tr": "أَسْتَيْقِظُ",
        "en": "I wake up",
        "tl": "ʾastayqiẓ"
      },
      {
        "tr": "بِالْحَافِلَةِ",
        "en": "by bus",
        "tl": "bi-l-ḥāfila"
      },
      {
        "tr": "زُمَلَائِي",
        "en": "my colleagues (singular زَمِيل / زَمِيلَة)",
        "tl": "zumalāʾī"
      },
      {
        "tr": "دَعَتْنِي",
        "en": "she invited me",
        "tl": "daʿatnī"
      },
      {
        "tr": "أَشْهَرُ طَبَقٍ",
        "en": "the most famous dish",
        "tl": "ʾashhar ṭabaq"
      },
      {
        "tr": "عُطْلَةُ نِهَايَةِ الْأُسْبُوعِ",
        "en": "the weekend (literally “the end-of-the-week holiday”)",
        "tl": "ʿuṭlat nihāyat al-ʾusbūʿ"
      },
      {
        "tr": "وَسَطِ الْبَلَدِ",
        "en": "downtown, the town centre",
        "tl": "wasaṭ al-balad"
      },
      {
        "tr": "الْقَلْعَةِ",
        "en": "the citadel, the fortress",
        "tl": "al-qalʿa"
      },
      {
        "tr": "غُرُوبِ الشَّمْسِ",
        "en": "sunset",
        "tl": "ghurūb ash-shams"
      },
      {
        "tr": "أَشْتَاقُ إِلَيْكِ",
        "en": "I miss you (said to a woman)",
        "tl": "ʾashtāq ʾilayk"
      },
      {
        "tr": "تَزُورِينَنِي",
        "en": "you visit me (said to a woman)",
        "tl": "tazūrīnanī"
      },
      {
        "tr": "سَلِّمِي لِي عَلَى",
        "en": "say hello for me to… (said to a woman)",
        "tl": "sallimī lī ʿalā"
      }
    ],
    "questions": [
      {
        "q": "How long has Layla been living in Amman?",
        "options": [
          "Two weeks",
          "Two months",
          "Two years",
          "Since last Friday"
        ],
        "answer": 1,
        "explain": "أَسْكُنُ هُنَا مُنْذُ شَهْرَيْنِ — I have been living here for two months."
      },
      {
        "q": "How does she get to work?",
        "options": [
          "On foot",
          "By taxi",
          "In a colleague’s car",
          "By bus"
        ],
        "answer": 3,
        "explain": "أَذْهَبُ إِلَى الْعَمَلِ بِالْحَافِلَةِ — I go to work by bus."
      },
      {
        "q": "What did she eat for the first time at her colleague’s family home?",
        "options": [
          "Mansaf",
          "Falafel",
          "Hummus",
          "Fresh fish"
        ],
        "answer": 0,
        "explain": "دَعَتْنِي زَمِيلَتِي إِلَى الْغَدَاءِ … وَأَكَلْتُ الْمَنْسَفَ لِأَوَّلِ مَرَّةٍ — I ate mansaf for the first time."
      },
      {
        "q": "Where does Layla want to take Rim if she comes?",
        "options": [
          "To the Citadel and the old market",
          "To her school and the café",
          "To Petra and the Dead Sea",
          "To Umm Khalid’s for lunch"
        ],
        "answer": 2,
        "explain": "فَسَنَذْهَبُ مَعًا إِلَى الْبَتْرَاءِ وَإِلَى الْبَحْرِ الْمَيِّتِ — we’ll go to Petra and the Dead Sea together."
      }
    ]
  },
  {
    "id": "ar-job-interview",
    "kind": "dialogue",
    "level": "B1",
    "title": "A Job Interview",
    "titleNative": "مُقَابَلَةُ عَمَلٍ",
    "summary": "Nadia, a department manager (a woman), interviews Omar (a man) for a customer-service job: his background and experience, his strengths, his languages, the working hours and the start date.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Nadia",
        "tr": "صَبَاحُ الْخَيْرِ يَا سَيِّدُ عُمَرُ، تَفَضَّلْ بِالْجُلُوسِ.",
        "en": "Good morning, Mr Omar. Please, have a seat.",
        "tl": "ṣabāḥu-l-khayri yā sayyidu ʿumaru tafaḍḍal bi-l-julūs"
      },
      {
        "speaker": "Omar",
        "tr": "صَبَاحُ النُّورِ يَا سَيِّدَةُ نَادِيَةُ، وَشُكْرًا لَكِ عَلَى دَعْوَتِي إِلَى هَذِهِ الْمُقَابَلَةِ.",
        "en": "Good morning, Ms Nadia, and thank you for inviting me to this interview.",
        "tl": "ṣabāḥu-n-nūri yā sayyidatu nādiyatu wa-shukran laki ʿalā daʿwatī ʾilā hādhihi-l-muqābala"
      },
      {
        "speaker": "Nadia",
        "tr": "أَنَا مُدِيرَةُ قِسْمِ خِدْمَةِ الْعُمَلَاءِ، فَحَدِّثْنِي قَلِيلًا عَنْ نَفْسِكَ مِنْ فَضْلِكَ.",
        "en": "I’m the head of the customer service department, so please tell me a little about yourself.",
        "tl": "ʾanā mudīratu qismi khidmati-l-ʿumalāʾi fa-ḥaddithnī qalīlan ʿan nafsika min faḍlik"
      },
      {
        "speaker": "Omar",
        "tr": "بِكُلِّ سُرُورٍ، عُمْرِي ثَمَانِيَةٌ وَعِشْرُونَ عَامًا، وَدَرَسْتُ إِدَارَةَ الْأَعْمَالِ فِي الْجَامِعَةِ.",
        "en": "With pleasure. I’m twenty-eight, and I studied business administration at university.",
        "tl": "bi-kulli surūrin ʿumrī thamāniyatun wa-ʿishrūna ʿāman wa-darastu ʾidārata-l-ʾaʿmāli fī-l-jāmiʿa"
      },
      {
        "speaker": "Omar",
        "tr": "بَعْدَ التَّخَرُّجِ، عَمِلْتُ ثَلَاثَ سَنَوَاتٍ فِي قِسْمِ الِاسْتِقْبَالِ فِي فُنْدُقٍ كَبِيرٍ.",
        "en": "After graduating, I worked for three years on the front desk of a large hotel.",
        "tl": "baʿda-t-takharruji ʿamiltu thalātha sanawātin fī qismi-l-istiqbāli fī funduqin kabīr"
      },
      {
        "speaker": "Nadia",
        "tr": "وَمَا الَّذِي تَعَلَّمْتَهُ مِنْ هَذِهِ التَّجْرِبَةِ؟",
        "en": "And what did you learn from that experience?",
        "tl": "wa-mā-lladhī taʿallamtahu min hādhihi-t-tajriba"
      },
      {
        "speaker": "Omar",
        "tr": "تَعَلَّمْتُ أَنْ أَسْتَمِعَ إِلَى الزَّبُونِ جَيِّدًا، وَأَنْ أَبْقَى هَادِئًا حَتَّى فِي الْمَوَاقِفِ الصَّعْبَةِ.",
        "en": "I learned to listen carefully to the customer, and to stay calm even in difficult situations.",
        "tl": "taʿallamtu ʾan ʾastamiʿa ʾilā-z-zabūni jayyidan wa-ʾan ʾabqā hādiʾan ḥattā fī-l-mawāqifi-ṣ-ṣaʿba"
      },
      {
        "speaker": "Nadia",
        "tr": "وَلِمَاذَا تُرِيدُ أَنْ تَتْرُكَ عَمَلَكَ الْحَالِيَّ؟",
        "en": "And why do you want to leave your current job?",
        "tl": "wa-limādhā turīdu ʾan tatruka ʿamalaka-l-ḥālī"
      },
      {
        "speaker": "Omar",
        "tr": "أَحْتَرِمُ عَمَلِي الْحَالِيَّ كَثِيرًا، لَكِنِّي أَبْحَثُ عَنْ مَسْؤُولِيَّاتٍ أَكْبَرَ وَفُرْصَةٍ لِلتَّطَوُّرِ.",
        "en": "I have great respect for my current job, but I’m looking for greater responsibilities and a chance to develop.",
        "tl": "ʾaḥtarimu ʿamalī-l-ḥāliyya kathīran lākinnī ʾabḥathu ʿan masʾūliyyātin ʾakbara wa-furṣatin li-t-taṭawwur"
      },
      {
        "speaker": "Nadia",
        "tr": "مَا هِيَ نِقَاطُ قُوَّتِكَ فِي رَأْيِكَ؟",
        "en": "What are your strengths, in your opinion?",
        "tl": "mā hiya niqāṭu quwwatika fī raʾyik"
      },
      {
        "speaker": "Omar",
        "tr": "أَنَا مُنَظَّمٌ وَدَقِيقٌ فِي الْمَوَاعِيدِ، وَأُحِبُّ الْعَمَلَ ضِمْنَ فَرِيقٍ.",
        "en": "I’m organised and punctual, and I enjoy working as part of a team.",
        "tl": "ʾanā munaẓẓamun wa-daqīqun fī-l-mawāʿīdi wa-ʾuḥibbu-l-ʿamala ḍimna farīq"
      },
      {
        "speaker": "Nadia",
        "tr": "وَهَلْ لَدَيْكَ نُقْطَةُ ضَعْفٍ تَعْمَلُ عَلَى تَحْسِينِهَا؟",
        "en": "And do you have a weakness that you are working to improve?",
        "tl": "wa-hal ladayka nuqṭatu ḍaʿfin taʿmalu ʿalā taḥsīnihā"
      },
      {
        "speaker": "Omar",
        "tr": "نَعَمْ، كُنْتُ أَخَافُ مِنَ الْكَلَامِ أَمَامَ الْجُمْهُورِ، وَلَكِنِّي أَخَذْتُ دَوْرَةً تَدْرِيبِيَّةً وَتَحَسَّنْتُ كَثِيرًا.",
        "en": "Yes — I used to be afraid of speaking in front of an audience, but I took a training course and have improved a lot.",
        "tl": "naʿam kuntu ʾakhāfu mina-l-kalāmi ʾamāma-l-jumhūri wa-lākinnī ʾakhadhtu dawratan tadrībiyyatan wa-taḥassantu kathīran"
      },
      {
        "speaker": "Nadia",
        "tr": "نَتَعَامَلُ هُنَا مَعَ عُمَلَاءَ مِنْ بِلَادٍ كَثِيرَةٍ، فَمَا اللُّغَاتُ الَّتِي تَتَكَلَّمُهَا؟",
        "en": "We deal with clients from many countries here, so which languages do you speak?",
        "tl": "nataʿāmalu hunā maʿa ʿumalāʾa min bilādin kathīratin fa-mā-l-lughātu-llatī tatakallamuhā"
      },
      {
        "speaker": "Omar",
        "tr": "الْعَرَبِيَّةُ لُغَتِي الْأُمُّ، وَأَتَكَلَّمُ الْإِنْجِلِيزِيَّةَ بِطَلَاقَةٍ، وَأَفْهَمُ الْفَرَنْسِيَّةَ بِشَكْلٍ جَيِّدٍ.",
        "en": "Arabic is my mother tongue, I speak English fluently, and I understand French well.",
        "tl": "al-ʿarabiyyatu lughatī-l-ʾummu wa-ʾatakallamu-l-ʾinjilīziyyata bi-ṭalāqatin wa-ʾafhamu-l-faransiyyata bi-shaklin jayyid"
      },
      {
        "speaker": "Nadia",
        "tr": "مُمْتَازٌ، هَلْ عِنْدَكَ أَسْئِلَةٌ عَنِ الْوَظِيفَةِ؟",
        "en": "Excellent. Do you have any questions about the job?",
        "tl": "mumtāzun hal ʿindaka ʾasʾilatun ʿani-l-waẓīfa"
      },
      {
        "speaker": "Omar",
        "tr": "نَعَمْ، مَا هِيَ سَاعَاتُ الدَّوَامِ، وَهَلْ يُوجَدُ عَمَلٌ فِي عُطْلَةِ نِهَايَةِ الْأُسْبُوعِ؟",
        "en": "Yes — what are the working hours, and is there any work at the weekend?",
        "tl": "naʿam mā hiya sāʿātu-d-dawāmi wa-hal yūjadu ʿamalun fī ʿuṭlati nihāyati-l-ʾusbūʿ"
      },
      {
        "speaker": "Nadia",
        "tr": "الدَّوَامُ مِنَ السَّاعَةِ التَّاسِعَةِ صَبَاحًا إِلَى الْخَامِسَةِ مَسَاءً، مِنَ الْأَحَدِ إِلَى الْخَمِيسِ.",
        "en": "The hours are from nine in the morning to five in the evening, Sunday to Thursday.",
        "tl": "ad-dawāmu mina-s-sāʿati-t-tāsiʿati ṣabāḥan ʾilā-l-khāmisati masāʾan mina-l-ʾaḥadi ʾilā-l-khamīs"
      },
      {
        "speaker": "Nadia",
        "tr": "وَنَعْمَلُ أَحْيَانًا يَوْمَ السَّبْتِ فِي مَوْسِمِ الصَّيْفِ، مَعَ أَجْرٍ إِضَافِيٍّ.",
        "en": "And we sometimes work on Saturdays in the summer season, for extra pay.",
        "tl": "wa-naʿmalu ʾaḥyānan yawma-s-sabti fī mawsimi-ṣ-ṣayfi maʿa ʾajrin ʾiḍāfī"
      },
      {
        "speaker": "Omar",
        "tr": "هَذَا مُنَاسِبٌ لِي تَمَامًا، وَمَتَى يَبْدَأُ الْعَمَلُ إِذَا تَمَّ اخْتِيَارِي؟",
        "en": "That suits me perfectly. And when would the job start if I am chosen?",
        "tl": "hādhā munāsibun lī tamāman wa-matā yabdaʾu-l-ʿamalu ʾidhā tamma-khtiyārī"
      },
      {
        "speaker": "Nadia",
        "tr": "نُرِيدُ مُوَظَّفًا يَبْدَأُ فِي أَوَّلِ الشَّهْرِ الْقَادِمِ، فَهَلْ هَذَا مُمْكِنٌ؟",
        "en": "We want someone who can start at the beginning of next month — is that possible?",
        "tl": "nurīdu muwaẓẓafan yabdaʾu fī ʾawwali-sh-shahri-l-qādimi fa-hal hādhā mumkin"
      },
      {
        "speaker": "Omar",
        "tr": "نَعَمْ، أَسْتَطِيعُ أَنْ أَبْدَأَ فِي هَذَا التَّارِيخِ دُونَ أَيِّ مُشْكِلَةٍ.",
        "en": "Yes, I can start on that date without any problem.",
        "tl": "naʿam ʾastaṭīʿu ʾan ʾabdaʾa fī hādhā-t-tārīkhi dūna ʾayyi mushkila"
      },
      {
        "speaker": "Nadia",
        "tr": "شُكْرًا لَكَ يَا سَيِّدُ عُمَرُ، سَنَتَّصِلُ بِكَ خِلَالَ أُسْبُوعٍ لِنُخْبِرَكَ بِالنَّتِيجَةِ.",
        "en": "Thank you, Mr Omar. We will contact you within a week to let you know the result.",
        "tl": "shukran laka yā sayyidu ʿumaru sa-nattaṣilu bika khilāla ʾusbūʿin li-nukhbiraka bi-n-natīja"
      },
      {
        "speaker": "Omar",
        "tr": "شُكْرًا جَزِيلًا عَلَى وَقْتِكِ، وَأَتَمَنَّى أَنْ أَنْضَمَّ إِلَى فَرِيقِكُمْ قَرِيبًا.",
        "en": "Thank you very much for your time. I hope to join your team soon.",
        "tl": "shukran jazīlan ʿalā waqtiki wa-ʾatamannā ʾan ʾanḍamma ʾilā farīqikum qarīban"
      },
      {
        "speaker": "Nadia",
        "tr": "بِالتَّوْفِيقِ، وَمَعَ السَّلَامَةِ.",
        "en": "Good luck, and goodbye.",
        "tl": "bi-t-tawfīqi wa-maʿa-s-salāma"
      }
    ],
    "glossary": [
      {
        "tr": "تَفَضَّلْ بِالْجُلُوسِ",
        "en": "please have a seat (said to a man)",
        "tl": "tafaḍḍal bi-l-julūs"
      },
      {
        "tr": "الْمُقَابَلَةِ",
        "en": "the interview",
        "tl": "al-muqābala"
      },
      {
        "tr": "قِسْمِ خِدْمَةِ الْعُمَلَاءِ",
        "en": "the customer service department",
        "tl": "qism khidmat al-ʿumalāʾ"
      },
      {
        "tr": "إِدَارَةَ الْأَعْمَالِ",
        "en": "business administration",
        "tl": "ʾidārat al-ʾaʿmāl"
      },
      {
        "tr": "التَّخَرُّجِ",
        "en": "graduation, graduating",
        "tl": "at-takharruj"
      },
      {
        "tr": "التَّجْرِبَةِ",
        "en": "the experience",
        "tl": "at-tajriba"
      },
      {
        "tr": "الزَّبُونِ",
        "en": "the customer",
        "tl": "az-zabūn"
      },
      {
        "tr": "الْمَوَاقِفِ الصَّعْبَةِ",
        "en": "difficult situations",
        "tl": "al-mawāqif aṣ-ṣaʿba"
      },
      {
        "tr": "عَمَلَكَ الْحَالِيَّ",
        "en": "your current job",
        "tl": "ʿamalak al-ḥālī"
      },
      {
        "tr": "مَسْؤُولِيَّاتٍ",
        "en": "responsibilities",
        "tl": "masʾūliyyāt"
      },
      {
        "tr": "نِقَاطُ قُوَّتِكَ",
        "en": "your strengths (literally “your points of strength”)",
        "tl": "niqāṭ quwwatik"
      },
      {
        "tr": "نُقْطَةُ ضَعْفٍ",
        "en": "a weakness, a weak point",
        "tl": "nuqṭat ḍaʿf"
      },
      {
        "tr": "دَوْرَةً تَدْرِيبِيَّةً",
        "en": "a training course",
        "tl": "dawra tadrībiyya"
      },
      {
        "tr": "بِطَلَاقَةٍ",
        "en": "fluently",
        "tl": "bi-ṭalāqa"
      },
      {
        "tr": "سَاعَاتُ الدَّوَامِ",
        "en": "working hours",
        "tl": "sāʿāt ad-dawām"
      },
      {
        "tr": "أَجْرٍ إِضَافِيٍّ",
        "en": "extra pay",
        "tl": "ʾajr ʾiḍāfī"
      },
      {
        "tr": "سَنَتَّصِلُ بِكَ",
        "en": "we will contact you, we will call you",
        "tl": "sa-nattaṣil bik"
      },
      {
        "tr": "بِالتَّوْفِيقِ",
        "en": "good luck (literally “with success”)",
        "tl": "bi-t-tawfīq"
      }
    ],
    "questions": [
      {
        "q": "Where did Omar work after graduating?",
        "options": [
          "In a bank",
          "At a language school",
          "On the front desk of a large hotel",
          "In a travel agency abroad"
        ],
        "answer": 2,
        "explain": "عَمِلْتُ ثَلَاثَ سَنَوَاتٍ فِي قِسْمِ الِاسْتِقْبَالِ فِي فُنْدُقٍ كَبِيرٍ — three years in the reception department of a large hotel."
      },
      {
        "q": "Why is Omar looking for a new job?",
        "options": [
          "He wants greater responsibilities and a chance to develop",
          "He does not like his current job",
          "His hotel is closing",
          "He wants to work fewer hours"
        ],
        "answer": 0,
        "explain": "أَبْحَثُ عَنْ مَسْؤُولِيَّاتٍ أَكْبَرَ وَفُرْصَةٍ لِلتَّطَوُّرِ — I’m looking for greater responsibilities and a chance to develop."
      },
      {
        "q": "Besides Arabic, which language does Omar speak fluently?",
        "options": [
          "French",
          "Turkish",
          "Spanish",
          "English"
        ],
        "answer": 3,
        "explain": "وَأَتَكَلَّمُ الْإِنْجِلِيزِيَّةَ بِطَلَاقَةٍ — I speak English fluently; French he only “understands well”."
      },
      {
        "q": "When will the company let Omar know the result?",
        "options": [
          "The same evening",
          "Within a week",
          "At the beginning of next month",
          "After the summer season"
        ],
        "answer": 1,
        "explain": "سَنَتَّصِلُ بِكَ خِلَالَ أُسْبُوعٍ لِنُخْبِرَكَ بِالنَّتِيجَةِ — we will contact you within a week to tell you the result."
      }
    ]
  },
  {
    "id": "ar-farewell-speech",
    "kind": "speech",
    "level": "B1",
    "title": "A Farewell Speech at Work",
    "titleNative": "كَلِمَةُ وَدَاعٍ",
    "summary": "On their last day at the office, someone thanks their colleagues for three years together. It uses only first-person verbs about the speaker, so it suits a man or a woman as it stands.",
    "register": "polite",
    "lines": [
      {
        "tr": "زُمَلَائِي الْأَعِزَّاءَ، اِسْمَحُوا لِي بِكَلِمَةٍ قَصِيرَةٍ.",
        "en": "Dear colleagues, allow me a few short words.",
        "tl": "zumalāʾī-l-ʾaʿizzāʾa-smaḥū lī bi-kalimatin qaṣīra"
      },
      {
        "tr": "كَمَا تَعْرِفُونَ، الْيَوْمُ هُوَ آخِرُ يَوْمٍ لِي فِي هَذَا الْمَكْتَبِ.",
        "en": "As you know, today is my last day in this office.",
        "tl": "kamā taʿrifūna-l-yawmu huwa ʾākhiru yawmin lī fī hādhā-l-maktab"
      },
      {
        "tr": "قَبْلَ أَنْ أَذْهَبَ، أُرِيدُ أَنْ أَقُولَ لَكُمْ شَيْئًا مِنَ الْقَلْبِ.",
        "en": "Before I go, I want to tell you something from the heart.",
        "tl": "qabla ʾan ʾadhhaba ʾurīdu ʾan ʾaqūla lakum shayʾan mina-l-qalb"
      },
      {
        "tr": "وَصَلْتُ إِلَى هُنَا قَبْلَ ثَلَاثِ سَنَوَاتٍ، وَلَمْ أَكُنْ أَعْرِفُ أَحَدًا.",
        "en": "I arrived here three years ago, and I didn’t know anyone.",
        "tl": "waṣaltu ʾilā hunā qabla thalāthi sanawātin wa-lam ʾakun ʾaʿrifu ʾaḥad"
      },
      {
        "tr": "وَكَانَتْ لُغَتِي الْعَرَبِيَّةُ ضَعِيفَةً فِي ذَلِكَ الْوَقْتِ.",
        "en": "And my Arabic was weak at that time.",
        "tl": "wa-kānat lughatī-l-ʿarabiyyatu ḍaʿīfatan fī dhālika-l-waqt"
      },
      {
        "tr": "فِي أَوَّلِ اجْتِمَاعٍ، لَمْ أَفْهَمْ إِلَّا نِصْفَ الْكَلَامِ.",
        "en": "In the first meeting, I understood only half of what was said.",
        "tl": "fī ʾawwali-jtimāʿin lam ʾafham ʾillā niṣfa-l-kalām"
      },
      {
        "tr": "لَكِنَّكُمْ سَاعَدْتُمُونِي دَائِمًا بِصَبْرٍ كَبِيرٍ.",
        "en": "But you always helped me with great patience.",
        "tl": "lākinnakum sāʿadtumūnī dāʾiman bi-ṣabrin kabīr"
      },
      {
        "tr": "لَمْ يَضْحَكْ أَحَدٌ مِنْ أَخْطَائِي، بَلْ عَلَّمْتُمُونِي الصَّوَابَ بِلُطْفٍ.",
        "en": "Nobody laughed at my mistakes; instead, you kindly taught me what was right.",
        "tl": "lam yaḍḥak ʾaḥadun min ʾakhṭāʾī bal ʿallamtumūnī-ṣ-ṣawāba bi-luṭf"
      },
      {
        "tr": "تَعَلَّمْتُ هُنَا أَشْيَاءَ كَثِيرَةً عَنِ الْعَمَلِ وَعَنِ الْحَيَاةِ أَيْضًا.",
        "en": "I learned many things here about work, and about life too.",
        "tl": "taʿallamtu hunā ʾashyāʾa kathīratan ʿani-l-ʿamali wa-ʿani-l-ḥayāti ʾayḍan"
      },
      {
        "tr": "لَنْ أَنْسَى اسْتِرَاحَةَ الشَّايِ وَأَحَادِيثَنَا الطَّوِيلَةَ فِي الْمَطْبَخِ.",
        "en": "I won’t forget the tea break and our long chats in the kitchen.",
        "tl": "lan ʾansā-stirāḥata-sh-shāyi wa-ʾaḥādīthanā-ṭ-ṭawīlata fī-l-maṭbakh"
      },
      {
        "tr": "أَنْجَزْنَا مَعًا مَشَارِيعَ صَعْبَةً، وَعَمِلْنَا أَحْيَانًا حَتَّى اللَّيْلِ.",
        "en": "Together we completed difficult projects, and sometimes we worked into the night.",
        "tl": "ʾanjaznā maʿan mashārīʿa ṣaʿbatan wa-ʿamilnā ʾaḥyānan ḥattā-l-layl"
      },
      {
        "tr": "تَعِبْنَا كَثِيرًا، لَكِنَّنَا كُنَّا دَائِمًا فَرِيقًا وَاحِدًا.",
        "en": "We got very tired, but we were always one team.",
        "tl": "taʿibnā kathīran lākinnanā kunnā dāʾiman farīqan wāḥid"
      },
      {
        "tr": "أَشْكُرُ مُدِيرَتَنَا السَّيِّدَةَ نَادِيَةَ عَلَى ثِقَتِهَا بِي.",
        "en": "I thank our manager, Ms Nadia, for her trust in me.",
        "tl": "ʾashkuru mudīratanā-s-sayyidata nādiyata ʿalā thiqatihā bī"
      },
      {
        "tr": "وَأَشْكُرُكُمْ جَمِيعًا عَلَى كُلِّ فُرْصَةٍ أَعْطَيْتُمُونِي إِيَّاهَا.",
        "en": "And I thank you all for every opportunity you gave me.",
        "tl": "wa-ʾashkurukum jamīʿan ʿalā kulli furṣatin ʾaʿṭaytumūnī ʾiyyāhā"
      },
      {
        "tr": "فِي الشَّهْرِ الْقَادِمِ سَأَبْدَأُ عَمَلًا جَدِيدًا فِي الْإِسْكَنْدَرِيَّةِ.",
        "en": "Next month I will start a new job in Alexandria.",
        "tl": "fī-sh-shahri-l-qādimi sa-ʾabdaʾu ʿamalan jadīdan fī-l-ʾiskandariyya"
      },
      {
        "tr": "أَشْعُرُ بِالْحَمَاسِ، لَكِنَّ الْوَدَاعَ لَيْسَ سَهْلًا أَبَدًا.",
        "en": "I feel excited, but saying goodbye is never easy.",
        "tl": "ʾashʿuru bi-l-ḥamāsi lākinna-l-wadāʿa laysa sahlan ʾabadan"
      },
      {
        "tr": "هَذَا لَيْسَ وَدَاعًا، بَلْ إِلَى اللِّقَاءِ.",
        "en": "This is not a farewell, but “until we meet again”.",
        "tl": "hādhā laysa wadāʿan bal ʾilā-l-liqāʾ"
      },
      {
        "tr": "إِذَا زُرْتُمُ الْإِسْكَنْدَرِيَّةَ، فَبَيْتِي بَيْتُكُمْ.",
        "en": "If you visit Alexandria, my home is your home.",
        "tl": "ʾidhā zurtumu-l-ʾiskandariyyata fa-baytī baytukum"
      },
      {
        "tr": "كَانَ الْعَمَلُ مَعَكُمْ شَرَفًا لِي.",
        "en": "Working with you has been an honour for me.",
        "tl": "kāna-l-ʿamalu maʿakum sharafan lī"
      },
      {
        "tr": "أَتَمَنَّى لَكُمْ كُلَّ التَّوْفِيقِ وَالنَّجَاحِ.",
        "en": "I wish you all the very best and every success.",
        "tl": "ʾatamannā lakum kulla-t-tawfīqi wa-n-najāḥ"
      },
      {
        "tr": "شُكْرًا لَكُمْ مِنْ كُلِّ قَلْبِي.",
        "en": "Thank you with all my heart.",
        "tl": "shukran lakum min kulli qalbī"
      }
    ],
    "glossary": [
      {
        "tr": "اِسْمَحُوا لِي",
        "en": "allow me (to a group)",
        "tl": "ismaḥū lī"
      },
      {
        "tr": "آخِرُ يَوْمٍ",
        "en": "the last day",
        "tl": "ʾākhir yawm"
      },
      {
        "tr": "اجْتِمَاعٍ",
        "en": "a meeting (اِجْتِمَاع)",
        "tl": "ijtimāʿ"
      },
      {
        "tr": "نِصْفَ الْكَلَامِ",
        "en": "half of what was said",
        "tl": "niṣf al-kalām"
      },
      {
        "tr": "بِصَبْرٍ",
        "en": "with patience (صَبْر)",
        "tl": "bi-ṣabr"
      },
      {
        "tr": "أَخْطَائِي",
        "en": "my mistakes (singular خَطَأ)",
        "tl": "ʾakhṭāʾī"
      },
      {
        "tr": "الصَّوَابَ",
        "en": "what is right, the correct thing",
        "tl": "aṣ-ṣawāb"
      },
      {
        "tr": "اسْتِرَاحَةَ الشَّايِ",
        "en": "the tea break",
        "tl": "istirāḥat ash-shāy"
      },
      {
        "tr": "أَنْجَزْنَا",
        "en": "we completed, we got done",
        "tl": "ʾanjaznā"
      },
      {
        "tr": "مَشَارِيعَ",
        "en": "projects (singular مَشْرُوع)",
        "tl": "mashārīʿ"
      },
      {
        "tr": "فَرِيقًا وَاحِدًا",
        "en": "one team",
        "tl": "farīq wāḥid"
      },
      {
        "tr": "ثِقَتِهَا",
        "en": "her trust (ثِقَة)",
        "tl": "thiqatihā"
      },
      {
        "tr": "فُرْصَةٍ",
        "en": "an opportunity, a chance",
        "tl": "furṣa"
      },
      {
        "tr": "الْوَدَاعَ",
        "en": "saying goodbye, farewell",
        "tl": "al-wadāʿ"
      },
      {
        "tr": "إِلَى اللِّقَاءِ",
        "en": "until we meet again; goodbye",
        "tl": "ʾilā-l-liqāʾ"
      },
      {
        "tr": "شَرَفًا",
        "en": "an honour",
        "tl": "sharaf"
      },
      {
        "tr": "التَّوْفِيقِ",
        "en": "success, good fortune (a common good wish)",
        "tl": "at-tawfīq"
      }
    ],
    "questions": [
      {
        "q": "How long ago did the speaker arrive at this office?",
        "options": [
          "One year ago",
          "Three years ago",
          "Five years ago",
          "Ten years ago"
        ],
        "answer": 1,
        "explain": "«وَصَلْتُ إِلَى هُنَا قَبْلَ ثَلَاثِ سَنَوَاتٍ»."
      },
      {
        "q": "What happened in the first meeting?",
        "options": [
          "The speaker gave a talk",
          "The speaker arrived late",
          "The speaker understood only half of what was said",
          "The meeting was cancelled"
        ],
        "answer": 2,
        "explain": "«لَمْ أَفْهَمْ إِلَّا نِصْفَ الْكَلَامِ»."
      },
      {
        "q": "Who does the speaker thank by name?",
        "options": [
          "The manager, Ms Nadia",
          "A neighbour",
          "A teacher of Arabic",
          "The office driver"
        ],
        "answer": 0,
        "explain": "«أَشْكُرُ مُدِيرَتَنَا السَّيِّدَةَ نَادِيَةَ عَلَى ثِقَتِهَا بِي»."
      },
      {
        "q": "Where is the new job?",
        "options": [
          "In Cairo",
          "In Amman",
          "In Dubai",
          "In Alexandria"
        ],
        "answer": 3,
        "explain": "«سَأَبْدَأُ عَمَلًا جَدِيدًا فِي الْإِسْكَنْدَرِيَّةِ»."
      }
    ]
  },
  {
    "id": "ar-eid-presentation",
    "kind": "speech",
    "level": "B1",
    "title": "A Short Presentation: Eid al-Fitr",
    "titleNative": "عَرْضٌ قَصِيرٌ: عِيدُ الْفِطْرِ",
    "summary": "A learner gives a short class presentation about Eid al-Fitr: the preparations, the Eid cookies, visits, greetings and the children’s gift of money. It suits any speaker.",
    "register": "polite",
    "lines": [
      {
        "tr": "مَرْحَبًا بِكُمْ جَمِيعًا.",
        "en": "Hello, everyone.",
        "tl": "marḥaban bikum jamīʿan"
      },
      {
        "tr": "الْيَوْمَ سَأُحَدِّثُكُمْ عَنْ عِيدِ الْفِطْرِ فِي الْعَالَمِ الْعَرَبِيِّ.",
        "en": "Today I am going to talk to you about Eid al-Fitr in the Arab world.",
        "tl": "al-yawma sa-ʾuḥaddithukum ʿan ʿīdi-l-fiṭri fī-l-ʿālami-l-ʿarabī"
      },
      {
        "tr": "يَأْتِي هَذَا الْعِيدُ بَعْدَ شَهْرِ رَمَضَانَ مُبَاشَرَةً.",
        "en": "This festival comes straight after the month of Ramadan.",
        "tl": "yaʾtī hādhā-l-ʿīdu baʿda shahri ramaḍāna mubāsharatan"
      },
      {
        "tr": "وَيَسْتَمِرُّ ثَلَاثَةَ أَيَّامٍ فِي أَغْلَبِ الْبِلَادِ.",
        "en": "And it lasts three days in most countries.",
        "tl": "wa-yastamirru thalāthata ʾayyāmin fī ʾaghlabi-l-bilād"
      },
      {
        "tr": "قَبْلَ الْعِيدِ، تُنَظِّفُ الْعَائِلَاتُ بُيُوتَهَا وَتَشْتَرِي مَلَابِسَ جَدِيدَةً.",
        "en": "Before Eid, families clean their homes and buy new clothes.",
        "tl": "qabla-l-ʿīdi tunaẓẓifu-l-ʿāʾilātu buyūtahā wa-tashtarī malābisa jadīda"
      },
      {
        "tr": "وَيُعْطِي النَّاسُ الْفُقَرَاءَ طَعَامًا أَوْ مَالًا.",
        "en": "And people give food or money to the poor.",
        "tl": "wa-yuʿṭī-n-nāsu-l-fuqarāʾa ṭaʿāman ʾaw māl"
      },
      {
        "tr": "فِي مِصْرَ، تَصْنَعُ عَائِلَاتٌ كَثِيرَةٌ كَعْكَ الْعِيدِ فِي الْبَيْتِ.",
        "en": "In Egypt, many families make Eid cookies at home.",
        "tl": "fī miṣra taṣnaʿu ʿāʾilātun kathīratun kaʿka-l-ʿīdi fī-l-bayt"
      },
      {
        "tr": "وَهُوَ كَعْكٌ صَغِيرٌ عَلَيْهِ سُكَّرٌ نَاعِمٌ.",
        "en": "They are small cookies with powdered sugar on top.",
        "tl": "wa-huwa kaʿkun ṣaghīrun ʿalayhi sukkarun nāʿim"
      },
      {
        "tr": "فِي صَبَاحِ الْعِيدِ، يَذْهَبُ كَثِيرٌ مِنَ النَّاسِ إِلَى صَلَاةِ الْعِيدِ.",
        "en": "On the morning of Eid, many people go to the Eid prayer.",
        "tl": "fī ṣabāḥi-l-ʿīdi yadhhabu kathīrun mina-n-nāsi ʾilā ṣalāti-l-ʿīd"
      },
      {
        "tr": "بَعْدَ ذَلِكَ يَبْدَأُ يَوْمٌ طَوِيلٌ مِنَ الزِّيَارَاتِ.",
        "en": "After that, a long day of visits begins.",
        "tl": "baʿda dhālika yabdaʾu yawmun ṭawīlun mina-z-ziyārāt"
      },
      {
        "tr": "يَزُورُ النَّاسُ أَقَارِبَهُمْ وَجِيرَانَهُمْ وَأَصْدِقَاءَهُمْ.",
        "en": "People visit their relatives, their neighbours and their friends.",
        "tl": "yazūru-n-nāsu ʾaqāribahum wa-jīrānahum wa-ʾaṣdiqāʾahum"
      },
      {
        "tr": "يَقُولُ الْجَمِيعُ: «عِيدٌ مُبَارَكٌ!»",
        "en": "Everyone says: “Blessed Eid!”",
        "tl": "yaqūlu-l-jamīʿ ʿīdun mubārak"
      },
      {
        "tr": "وَهُنَاكَ تَهْنِئَةٌ أُخْرَى مَشْهُورَةٌ: «كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ.»",
        "en": "There is another well-known greeting too: “May you be well every year.”",
        "tl": "wa-hunāka tahniʾatun ʾukhrā mashhūra kullu ʿāmin wa-ʾantum bi-khayr"
      },
      {
        "tr": "يُحِبُّ الْأَطْفَالُ الْعِيدَ كَثِيرًا، لِأَنَّ الْكِبَارَ يُعْطُونَهُمُ «الْعِيدِيَّةَ».",
        "en": "Children love Eid very much, because the grown-ups give them the “ʿīdiyya”.",
        "tl": "yuḥibbu-l-ʾaṭfālu-l-ʿīda kathīran li-ʾanna-l-kibāra yuʿṭūnahumu-l-ʿīdiyya"
      },
      {
        "tr": "وَهِيَ مَالٌ قَلِيلٌ يَشْتَرِي بِهِ الطِّفْلُ مَا يُرِيدُ.",
        "en": "It is a little money with which the child buys whatever they like.",
        "tl": "wa-hiya mālun qalīlun yashtarī bihi-ṭ-ṭiflu mā yurīd"
      },
      {
        "tr": "فِي الْمَسَاءِ، تَمْتَلِئُ الشَّوَارِعُ وَالْحَدَائِقُ بِالنَّاسِ.",
        "en": "In the evening, the streets and parks fill with people.",
        "tl": "fī-l-masāʾi tamtaliʾu-sh-shawāriʿu wa-l-ḥadāʾiqu bi-n-nās"
      },
      {
        "tr": "فِي الْعَامِ الْمَاضِي دَعَانِي صَدِيقٌ مِصْرِيٌّ إِلَى بَيْتِ عَائِلَتِهِ.",
        "en": "Last year an Egyptian friend invited me to his family’s home.",
        "tl": "fī-l-ʿāmi-l-māḍī daʿānī ṣadīqun miṣriyyun ʾilā bayti ʿāʾilatih"
      },
      {
        "tr": "أَكَلْتُ كَعْكًا كَثِيرًا جِدًّا، وَشَرِبْتُ شَايًا أَكْثَرَ!",
        "en": "I ate far too many cookies, and drank even more tea!",
        "tl": "ʾakaltu kaʿkan kathīran jiddan wa-sharibtu shāyan ʾakthar"
      },
      {
        "tr": "وَأَعْطَتْنِي جَدَّتُهُ عِيدِيَّةً صَغِيرَةً، فَضَحِكَ الْجَمِيعُ.",
        "en": "And his grandmother gave me a small ʿīdiyya, and everybody laughed.",
        "tl": "wa-ʾaʿṭatnī jaddatuhu ʿīdiyyatan ṣaghīratan fa-ḍaḥika-l-jamīʿ"
      },
      {
        "tr": "أَجْمَلُ مَا فِي الْعِيدِ أَنَّ الْعَائِلَةَ كُلَّهَا تَجْتَمِعُ.",
        "en": "The most beautiful thing about Eid is that the whole family gets together.",
        "tl": "ʾajmalu mā fī-l-ʿīdi ʾanna-l-ʿāʾilata kullahā tajtamiʿ"
      },
      {
        "tr": "إِذَا كُنْتُمْ فِي بَلَدٍ عَرَبِيٍّ فِي الْعِيدِ، فَقُولُوا لِكُلِّ مَنْ تُقَابِلُونَهُ: «عِيدٌ مُبَارَكٌ!»",
        "en": "If you are in an Arab country at Eid, say to everyone you meet: “Blessed Eid!”",
        "tl": "ʾidhā kuntum fī baladin ʿarabiyyin fī-l-ʿīdi fa-qūlū li-kulli man tuqābilūnah ʿīdun mubārak"
      },
      {
        "tr": "شُكْرًا لِحُسْنِ اسْتِمَاعِكُمْ.",
        "en": "Thank you for listening.",
        "tl": "shukran li-ḥusni-stimāʿikum"
      }
    ],
    "glossary": [
      {
        "tr": "عِيدِ الْفِطْرِ",
        "en": "Eid al-Fitr, the festival that ends Ramadan",
        "tl": "ʿīd al-fiṭr"
      },
      {
        "tr": "مُبَاشَرَةً",
        "en": "directly, straight away",
        "tl": "mubāsharatan"
      },
      {
        "tr": "يَسْتَمِرُّ",
        "en": "it lasts, it continues",
        "tl": "yastamirr"
      },
      {
        "tr": "أَغْلَبِ الْبِلَادِ",
        "en": "most countries",
        "tl": "ʾaghlab al-bilād"
      },
      {
        "tr": "مَلَابِسَ جَدِيدَةً",
        "en": "new clothes",
        "tl": "malābis jadīda"
      },
      {
        "tr": "الْفُقَرَاءَ",
        "en": "the poor (singular فَقِير)",
        "tl": "al-fuqarāʾ"
      },
      {
        "tr": "كَعْكَ الْعِيدِ",
        "en": "Eid cookies",
        "tl": "kaʿk al-ʿīd"
      },
      {
        "tr": "نَاعِمٌ",
        "en": "fine, soft",
        "tl": "nāʿim"
      },
      {
        "tr": "صَلَاةِ الْعِيدِ",
        "en": "the Eid prayer",
        "tl": "ṣalāt al-ʿīd"
      },
      {
        "tr": "الزِّيَارَاتِ",
        "en": "visits (singular زِيَارَة)",
        "tl": "az-ziyārāt"
      },
      {
        "tr": "أَقَارِبَهُمْ",
        "en": "their relatives",
        "tl": "ʾaqāribahum"
      },
      {
        "tr": "عِيدٌ مُبَارَكٌ",
        "en": "Blessed Eid! — the usual greeting",
        "tl": "ʿīd mubārak"
      },
      {
        "tr": "تَهْنِئَةٌ",
        "en": "a greeting, congratulations",
        "tl": "tahniʾa"
      },
      {
        "tr": "كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ",
        "en": "May you be well every year — said at every festival",
        "tl": "kull ʿām wa-ʾantum bi-khayr"
      },
      {
        "tr": "الْعِيدِيَّةَ",
        "en": "the gift of money that children get at Eid",
        "tl": "al-ʿīdiyya"
      },
      {
        "tr": "تَمْتَلِئُ",
        "en": "fills up (with)",
        "tl": "tamtaliʾ"
      },
      {
        "tr": "دَعَانِي",
        "en": "he invited me",
        "tl": "daʿānī"
      },
      {
        "tr": "تَجْتَمِعُ",
        "en": "gets together, gathers",
        "tl": "tajtamiʿ"
      }
    ],
    "questions": [
      {
        "q": "When does Eid al-Fitr come?",
        "options": [
          "In the middle of Ramadan",
          "Straight after the month of Ramadan",
          "At the start of the school year",
          "On the first day of spring"
        ],
        "answer": 1,
        "explain": "«يَأْتِي هَذَا الْعِيدُ بَعْدَ شَهْرِ رَمَضَانَ مُبَاشَرَةً»."
      },
      {
        "q": "What is the ʿīdiyya?",
        "options": [
          "A kind of cookie",
          "The morning prayer",
          "A little money that children are given",
          "A visit to the neighbours"
        ],
        "answer": 2,
        "explain": "«وَهِيَ مَالٌ قَلِيلٌ يَشْتَرِي بِهِ الطِّفْلُ مَا يُرِيدُ»."
      },
      {
        "q": "What do many families in Egypt make at home?",
        "options": [
          "Eid cookies",
          "New clothes",
          "Lanterns",
          "Bread for the neighbours"
        ],
        "answer": 0,
        "explain": "«تَصْنَعُ عَائِلَاتٌ كَثِيرَةٌ كَعْكَ الْعِيدِ فِي الْبَيْتِ»."
      },
      {
        "q": "What made everybody laugh?",
        "options": [
          "The speaker forgot the greeting",
          "The speaker spilled the tea",
          "The speaker got lost",
          "The friend’s grandmother gave the speaker a small ʿīdiyya"
        ],
        "answer": 3,
        "explain": "«وَأَعْطَتْنِي جَدَّتُهُ عِيدِيَّةً صَغِيرَةً، فَضَحِكَ الْجَمِيعُ»."
      }
    ]
  },
  {
    "id": "ar-ali-baba-tale",
    "kind": "story",
    "level": "B1",
    "title": "Ali Baba and the Forty Thieves",
    "titleNative": "عَلِي بَابَا وَالْأَرْبَعُونَ لِصًّا",
    "summary": "A short, gentle retelling of the tale from the Thousand and One Nights: a poor woodcutter, a cave that opens to “Open, Sesame!”, a greedy brother — and a happy ending.",
    "register": "mixed",
    "lines": [
      {
        "tr": "كَانَ يَا مَا كَانَ، فِي قَدِيمِ الزَّمَانِ، رَجُلٌ فَقِيرٌ يَعِيشُ فِي بِلَادِ فَارِسَ.",
        "en": "Once upon a time, long ago, there was a poor man who lived in Persia.",
        "tl": "kāna yā mā kāna fī qadīmi-z-zamāni rajulun faqīrun yaʿīshu fī bilādi fāris"
      },
      {
        "tr": "كَانَ اسْمُهُ عَلِي بَابَا، وَكَانَ يَقْطَعُ الْحَطَبَ فِي الْغَابَةِ وَيَبِيعُهُ فِي السُّوقِ.",
        "en": "His name was Ali Baba, and he used to cut firewood in the forest and sell it in the market.",
        "tl": "kāna-smuhu ʿalī bābā wa-kāna yaqṭaʿu-l-ḥaṭaba fī-l-ghābati wa-yabīʿuhu fī-s-sūq"
      },
      {
        "tr": "أَمَّا أَخُوهُ قَاسِمٌ فَكَانَ تَاجِرًا غَنِيًّا، لَكِنَّهُ كَانَ يُحِبُّ الْمَالَ أَكْثَرَ مِنْ كُلِّ شَيْءٍ.",
        "en": "His brother Qasim, on the other hand, was a rich merchant, but he loved money more than anything.",
        "tl": "ʾammā ʾakhūhu qāsimun fa-kāna tājiran ghaniyyan lākinnahu kāna yuḥibbu-l-māla ʾakthara min kulli shayʾ"
      },
      {
        "tr": "فِي يَوْمٍ مِنَ الْأَيَّامِ، رَأَى عَلِي بَابَا فِي الْغَابَةِ أَرْبَعِينَ رَجُلًا عَلَى خُيُولِهِمْ.",
        "en": "One day, in the forest, Ali Baba saw forty men on their horses.",
        "tl": "fī yawmin mina-l-ʾayyāmi raʾā ʿalī bābā fī-l-ghābati ʾarbaʿīna rajulan ʿalā khuyūlihim"
      },
      {
        "tr": "خَافَ مِنْهُمْ، فَصَعِدَ إِلَى شَجَرَةٍ عَالِيَةٍ وَاخْتَبَأَ بَيْنَ أَغْصَانِهَا.",
        "en": "He was afraid of them, so he climbed a tall tree and hid among its branches.",
        "tl": "khāfa minhum fa-ṣaʿida ʾilā shajaratin ʿāliyatin wa-khtabaʾa bayna ʾaghṣānihā"
      },
      {
        "tr": "وَقَفَ الرِّجَالُ أَمَامَ صَخْرَةٍ كَبِيرَةٍ فِي الْجَبَلِ، وَكَانُوا لُصُوصًا يَحْمِلُونَ أَكْيَاسًا ثَقِيلَةً.",
        "en": "The men stopped in front of a big rock on the mountainside; they were thieves, carrying heavy sacks.",
        "tl": "waqafa-r-rijālu ʾamāma ṣakhratin kabīratin fī-l-jabali wa-kānū luṣūṣan yaḥmilūna ʾakyāsan thaqīla"
      },
      {
        "tr": "قَالَ رَئِيسُهُمْ بِصَوْتٍ مُرْتَفِعٍ: «اِفْتَحْ يَا سِمْسِمُ!»",
        "en": "Their leader said in a loud voice: “Open, Sesame!”",
        "tl": "qāla raʾīsuhum bi-ṣawtin murtafiʿ iftaḥ yā simsim"
      },
      {
        "tr": "فَانْفَتَحَ فِي الصَّخْرَةِ بَابُ مَغَارَةٍ، وَدَخَلَ اللُّصُوصُ كُلُّهُمْ، ثُمَّ انْغَلَقَ الْبَابُ خَلْفَهُمْ.",
        "en": "And the door of a cave opened in the rock. All the thieves went in, and then the door closed behind them.",
        "tl": "fa-nfataḥa fī-ṣ-ṣakhrati bābu maghāratin wa-dakhala-l-luṣūṣu kulluhum thumma-nghalaqa-l-bābu khalfahum"
      },
      {
        "tr": "بَعْدَ قَلِيلٍ خَرَجُوا، وَقَالَ الرَّئِيسُ: «أَغْلِقْ يَا سِمْسِمُ!» ثُمَّ رَكِبُوا خُيُولَهُمْ وَذَهَبُوا.",
        "en": "A little later they came out, and the leader said: “Close, Sesame!” Then they got on their horses and rode away.",
        "tl": "baʿda qalīlin kharajū wa-qāla-r-raʾīs ʾaghliq yā simsim thumma rakibū khuyūlahum wa-dhahabū"
      },
      {
        "tr": "نَزَلَ عَلِي بَابَا مِنَ الشَّجَرَةِ، وَوَقَفَ أَمَامَ الصَّخْرَةِ، وَقَالَ الْكَلِمَاتِ نَفْسَهَا.",
        "en": "Ali Baba came down from the tree, stood in front of the rock and said the same words.",
        "tl": "nazala ʿalī bābā mina-sh-shajarati wa-waqafa ʾamāma-ṣ-ṣakhrati wa-qāla-l-kalimāti nafsahā"
      },
      {
        "tr": "اِنْفَتَحَ الْبَابُ، فَدَخَلَ الْمَغَارَةَ، وَوَجَدَ فِيهَا ذَهَبًا وَفِضَّةً وَأَشْيَاءَ ثَمِينَةً كَثِيرَةً.",
        "en": "The door opened, so he went into the cave, and in it he found gold, silver and many precious things.",
        "tl": "infataḥa-l-bābu fa-dakhala-l-maghārata wa-wajada fīhā dhahaban wa-fiḍḍatan wa-ʾashyāʾa thamīnatan kathīra"
      },
      {
        "tr": "لَمْ يَأْخُذْ إِلَّا كِيسًا صَغِيرًا مِنَ الذَّهَبِ، ثُمَّ أَغْلَقَ الْبَابَ وَعَادَ إِلَى بَيْتِهِ.",
        "en": "He took only one small bag of gold, then closed the door and went back home.",
        "tl": "lam yaʾkhudh ʾillā kīsan ṣaghīran mina-dh-dhahabi thumma ʾaghlaqa-l-bāba wa-ʿāda ʾilā baytih"
      },
      {
        "tr": "فَرِحَتْ زَوْجَتُهُ كَثِيرًا، لَكِنَّ قَاسِمًا عَرَفَ السِّرَّ بَعْدَ أَيَّامٍ قَلِيلَةٍ.",
        "en": "His wife was overjoyed, but a few days later Qasim found out the secret.",
        "tl": "fariḥat zawjatuhu kathīran lākinna qāsiman ʿarafa-s-sirra baʿda ʾayyāmin qalīla"
      },
      {
        "tr": "قَالَ قَاسِمٌ لِأَخِيهِ: «أَخْبِرْنِي أَيْنَ وَجَدْتَ هَذَا الذَّهَبَ!» فَأَخْبَرَهُ عَلِي بَابَا بِكُلِّ شَيْءٍ.",
        "en": "Qasim said to his brother: “Tell me where you found this gold!” So Ali Baba told him everything.",
        "tl": "qāla qāsimun li-ʾakhīh ʾakhbirnī ʾayna wajadta hādhā-dh-dhahab fa-ʾakhbarahu ʿalī bābā bi-kulli shayʾ"
      },
      {
        "tr": "فِي الصَّبَاحِ ذَهَبَ قَاسِمٌ إِلَى الْمَغَارَةِ وَمَعَهُ عَشَرَةُ حَمِيرٍ، لِأَنَّهُ أَرَادَ أَنْ يَأْخُذَ كُلَّ الذَّهَبِ.",
        "en": "In the morning Qasim went to the cave with ten donkeys, because he wanted to take all the gold.",
        "tl": "fī-ṣ-ṣabāḥi dhahaba qāsimun ʾilā-l-maghārati wa-maʿahu ʿasharatu ḥamīrin li-ʾannahu ʾarāda ʾan yaʾkhudha kulla-dh-dhahab"
      },
      {
        "tr": "قَالَ: «اِفْتَحْ يَا سِمْسِمُ!» فَدَخَلَ وَمَلَأَ أَكْيَاسَهُ بِالذَّهَبِ وَهُوَ سَعِيدٌ جِدًّا.",
        "en": "He said: “Open, Sesame!” and went in, and he filled his sacks with gold, feeling very happy.",
        "tl": "qāl iftaḥ yā simsim fa-dakhala wa-malaʾa ʾakyāsahu bi-dh-dhahabi wa-huwa saʿīdun jiddan"
      },
      {
        "tr": "لَكِنَّهُ نَسِيَ الْكَلِمَةَ الصَّحِيحَةَ عِنْدَمَا أَرَادَ أَنْ يَخْرُجَ.",
        "en": "But he forgot the right word when he wanted to get out.",
        "tl": "lākinnahu nasiya-l-kalimata-ṣ-ṣaḥīḥata ʿindamā ʾarāda ʾan yakhruj"
      },
      {
        "tr": "صَاحَ: «اِفْتَحْ يَا قَمْحُ! اِفْتَحْ يَا شَعِيرُ!» لَكِنَّ الْبَابَ لَمْ يَنْفَتِحْ.",
        "en": "He shouted: “Open, Wheat! Open, Barley!” But the door did not open.",
        "tl": "ṣāḥ iftaḥ yā qamḥ iftaḥ yā shaʿīr lākinna-l-bāba lam yanfatiḥ"
      },
      {
        "tr": "بَقِيَ قَاسِمٌ خَائِفًا وَجَائِعًا فِي الْمَغَارَةِ الْمُظْلِمَةِ طُولَ اللَّيْلِ.",
        "en": "Qasim stayed in the dark cave all night long, frightened and hungry.",
        "tl": "baqiya qāsimun khāʾifan wa-jāʾiʿan fī-l-maghārati-l-muẓlimati ṭūla-l-layl"
      },
      {
        "tr": "فِي الْيَوْمِ التَّالِي بَحَثَ عَلِي بَابَا عَنْ أَخِيهِ، فَوَجَدَهُ فِي الْمَغَارَةِ وَأَخْرَجَهُ مِنْهَا.",
        "en": "The next day Ali Baba looked for his brother, found him in the cave and got him out of it.",
        "tl": "fī-l-yawmi-t-tālī baḥatha ʿalī bābā ʿan ʾakhīhi fa-wajadahu fī-l-maghārati wa-ʾakhrajahu minhā"
      },
      {
        "tr": "بَكَى قَاسِمٌ وَقَالَ: «سَامِحْنِي يَا أَخِي، لَقَدْ كُنْتُ طَمَّاعًا جِدًّا.»",
        "en": "Qasim wept and said: “Forgive me, my brother. I have been very greedy.”",
        "tl": "bakā qāsimun wa-qāl sāmiḥnī yā ʾakhī laqad kuntu ṭammāʿan jiddan"
      },
      {
        "tr": "ضَحِكَ عَلِي بَابَا وَقَالَ: «الْأَخُ أَغْلَى مِنَ الذَّهَبِ.»",
        "en": "Ali Baba laughed and said: “A brother is worth more than gold.”",
        "tl": "ḍaḥika ʿalī bābā wa-qāl al-ʾakhu ʾaghlā mina-dh-dhahab"
      },
      {
        "tr": "أَمَّا اللُّصُوصُ فَعَرَفُوا أَنَّ سِرَّهُمْ لَمْ يَعُدْ سِرًّا، فَتَرَكُوا تِلْكَ الْبِلَادَ وَلَمْ يَرْجِعُوا إِلَيْهَا أَبَدًا.",
        "en": "As for the thieves, they realised that their secret was a secret no longer, so they left that land and never came back.",
        "tl": "ʾammā-l-luṣūṣu fa-ʿarafū ʾanna sirrahum lam yaʿud sirran fa-tarakū tilka-l-bilāda wa-lam yarjiʿū ʾilayhā ʾabadan"
      },
      {
        "tr": "أَعْطَى عَلِي بَابَا الْفُقَرَاءَ كَثِيرًا مِنَ الذَّهَبِ، وَفَتَحَ دُكَّانًا صَغِيرًا فِي السُّوقِ.",
        "en": "Ali Baba gave much of the gold to the poor, and opened a small shop in the market.",
        "tl": "ʾaʿṭā ʿalī bābā-l-fuqarāʾa kathīran mina-dh-dhahabi wa-fataḥa dukkānan ṣaghīran fī-s-sūq"
      },
      {
        "tr": "وَمُنْذُ ذَلِكَ الْيَوْمِ عَاشَ الْأَخَوَانِ فِي سَعَادَةٍ وَسَلَامٍ.",
        "en": "And from that day on, the two brothers lived in happiness and peace.",
        "tl": "wa-mundhu dhālika-l-yawmi ʿāsha-l-ʾakhawāni fī saʿādatin wa-salām"
      }
    ],
    "glossary": [
      {
        "tr": "الْحَطَبَ",
        "en": "firewood",
        "tl": "al-ḥaṭab"
      },
      {
        "tr": "الْغَابَةِ",
        "en": "the forest",
        "tl": "al-ghāba"
      },
      {
        "tr": "تَاجِرًا",
        "en": "a merchant, a trader (تَاجِر)",
        "tl": "tājir"
      },
      {
        "tr": "خُيُولِهِمْ",
        "en": "their horses (خُيُول; one horse is حِصَان)",
        "tl": "khuyūlihim"
      },
      {
        "tr": "اخْتَبَأَ",
        "en": "he hid",
        "tl": "ikhtabaʾ"
      },
      {
        "tr": "أَغْصَانِهَا",
        "en": "its branches (singular غُصْن)",
        "tl": "ʾaghṣānihā"
      },
      {
        "tr": "صَخْرَةٍ",
        "en": "a rock",
        "tl": "ṣakhra"
      },
      {
        "tr": "لُصُوصًا",
        "en": "thieves (singular لِصّ)",
        "tl": "luṣūṣ"
      },
      {
        "tr": "رَئِيسُهُمْ",
        "en": "their leader, their chief",
        "tl": "raʾīsuhum"
      },
      {
        "tr": "اِفْتَحْ يَا سِمْسِمُ",
        "en": "“Open, Sesame!” (سِمْسِم is sesame)",
        "tl": "iftaḥ yā simsim"
      },
      {
        "tr": "الْمَغَارَةَ",
        "en": "the cave",
        "tl": "al-maghāra"
      },
      {
        "tr": "ثَمِينَةً",
        "en": "precious, valuable",
        "tl": "thamīna"
      },
      {
        "tr": "السِّرَّ",
        "en": "the secret",
        "tl": "as-sirr"
      },
      {
        "tr": "حَمِيرٍ",
        "en": "donkeys (singular حِمَار)",
        "tl": "ḥamīr"
      },
      {
        "tr": "نَسِيَ",
        "en": "he forgot",
        "tl": "nasiya"
      },
      {
        "tr": "الْمُظْلِمَةِ",
        "en": "dark",
        "tl": "al-muẓlima"
      },
      {
        "tr": "سَامِحْنِي",
        "en": "forgive me",
        "tl": "sāmiḥnī"
      },
      {
        "tr": "طَمَّاعًا",
        "en": "greedy",
        "tl": "ṭammāʿ"
      }
    ],
    "questions": [
      {
        "q": "How did Ali Baba earn his living?",
        "options": [
          "He was a rich merchant",
          "He cut firewood and sold it in the market",
          "He looked after horses",
          "He kept a small shop from the start"
        ],
        "answer": 1,
        "explain": "«كَانَ يَقْطَعُ الْحَطَبَ فِي الْغَابَةِ وَيَبِيعُهُ فِي السُّوقِ»."
      },
      {
        "q": "What did Ali Baba take from the cave the first time?",
        "options": [
          "Only one small bag of gold",
          "All the gold and silver",
          "Ten sacks of precious things",
          "Nothing at all"
        ],
        "answer": 0,
        "explain": "«لَمْ يَأْخُذْ إِلَّا كِيسًا صَغِيرًا مِنَ الذَّهَبِ»."
      },
      {
        "q": "Why could Qasim not get out of the cave?",
        "options": [
          "The thieves had locked the door",
          "His sacks were too heavy to carry",
          "His donkeys had run away",
          "He had forgotten the right word"
        ],
        "answer": 3,
        "explain": "«لَكِنَّهُ نَسِيَ الْكَلِمَةَ الصَّحِيحَةَ عِنْدَمَا أَرَادَ أَنْ يَخْرُجَ»."
      },
      {
        "q": "What did the thieves do in the end?",
        "options": [
          "They came back for their gold",
          "They made friends with Ali Baba",
          "They left that land and never returned",
          "They opened a shop in the market"
        ],
        "answer": 2,
        "explain": "«فَتَرَكُوا تِلْكَ الْبِلَادَ وَلَمْ يَرْجِعُوا إِلَيْهَا أَبَدًا»."
      }
    ]
  },
  {
    "id": "ar-viewing-a-flat",
    "kind": "dialogue",
    "level": "B1",
    "title": "Viewing a Flat",
    "titleNative": "زِيَارَةُ شَقَّةٍ لِلْإِيجَارِ",
    "summary": "Salma (a woman) is looking for a flat to rent, and Karim, an estate agent (a man), shows her round: the rooms, the rent, the deposit, the bills, the contract and when she could move in.",
    "register": "polite",
    "lines": [
      {
        "speaker": "Karim",
        "tr": "أَهْلًا وَسَهْلًا يَا سَيِّدَةُ سَلْمَى، تَفَضَّلِي بِالدُّخُولِ.",
        "en": "Welcome, Ms Salma. Please come in.",
        "tl": "ʾahlan wa-sahlan yā sayyidatu salmā tafaḍḍalī bi-d-dukhūl"
      },
      {
        "speaker": "Salma",
        "tr": "شُكْرًا لَكَ يَا سَيِّدُ كَرِيمُ. الْعِمَارَةُ هَادِئَةٌ، وَهَذَا يُعْجِبُنِي.",
        "en": "Thank you, Mr Karim. The building is quiet, and I like that.",
        "tl": "shukran laka yā sayyidu karīm al-ʿimāratu hādiʾatun wa-hādhā yuʿjibunī"
      },
      {
        "speaker": "Karim",
        "tr": "نَعَمْ، وَالشَّقَّةُ فِي الطَّابِقِ الثَّانِي، وَفِي الْعِمَارَةِ مِصْعَدٌ.",
        "en": "Yes, and the flat is on the second floor, and there is a lift in the building.",
        "tl": "naʿam wa-sh-shaqqatu fī-ṭ-ṭābiqi-th-thānī wa-fī-l-ʿimārati miṣʿad"
      },
      {
        "speaker": "Karim",
        "tr": "هَذِهِ غُرْفَةُ الْجُلُوسِ، وَهِيَ وَاسِعَةٌ وَفِيهَا نَافِذَتَانِ كَبِيرَتَانِ.",
        "en": "This is the living room. It is spacious and has two big windows.",
        "tl": "hādhihi ghurfatu-l-julūsi wa-hiya wāsiʿatun wa-fīhā nāfidhatāni kabīratān"
      },
      {
        "speaker": "Salma",
        "tr": "جَمِيلَةٌ وَمُشْمِسَةٌ! وَكَمْ غُرْفَةَ نَوْمٍ فِي الشَّقَّةِ؟",
        "en": "It’s lovely and sunny! And how many bedrooms are there in the flat?",
        "tl": "jamīlatun wa-mushmisa wa-kam ghurfata nawmin fī-sh-shaqqa"
      },
      {
        "speaker": "Karim",
        "tr": "فِيهَا غُرْفَتَانِ لِلنَّوْمِ: وَاحِدَةٌ كَبِيرَةٌ وَالْأُخْرَى صَغِيرَةٌ.",
        "en": "It has two bedrooms: one is large and the other is small.",
        "tl": "fīhā ghurfatāni li-n-nawm wāḥidatun kabīratun wa-l-ʾukhrā ṣaghīra"
      },
      {
        "speaker": "Salma",
        "tr": "هَلْ يُمْكِنُ أَنْ أَرَى الْمَطْبَخَ وَالْحَمَّامَ؟",
        "en": "Could I see the kitchen and the bathroom?",
        "tl": "hal yumkinu ʾan ʾarā-l-maṭbakha wa-l-ḥammām"
      },
      {
        "speaker": "Karim",
        "tr": "بِالتَّأْكِيدِ، الْمَطْبَخُ جَدِيدٌ، وَفِيهِ ثَلَّاجَةٌ وَفُرْنٌ وَغَسَّالَةٌ.",
        "en": "Certainly. The kitchen is new, and it has a fridge, an oven and a washing machine.",
        "tl": "bi-t-taʾkīd al-maṭbakhu jadīdun wa-fīhi thallājatun wa-furnun wa-ghassāla"
      },
      {
        "speaker": "Salma",
        "tr": "مُمْتَازٌ. وَكَمِ الْإِيجَارُ فِي الشَّهْرِ؟",
        "en": "Excellent. And how much is the rent per month?",
        "tl": "mumtāz wa-kami-l-ʾījāru fī-sh-shahr"
      },
      {
        "speaker": "Karim",
        "tr": "الْإِيجَارُ ثَلَاثُمِئَةِ دِينَارٍ فِي الشَّهْرِ، وَيُدْفَعُ فِي أَوَّلِ كُلِّ شَهْرٍ.",
        "en": "The rent is three hundred dinars a month, and it is paid at the beginning of each month.",
        "tl": "al-ʾījāru thalāthumiʾati dīnārin fī-sh-shahri wa-yudfaʿu fī ʾawwali kulli shahr"
      },
      {
        "speaker": "Salma",
        "tr": "وَهَلْ يَشْمَلُ هَذَا الْمَبْلَغُ فَوَاتِيرَ الْمَاءِ وَالْكَهْرَبَاءِ؟",
        "en": "And does that amount include the water and electricity bills?",
        "tl": "wa-hal yashmalu hādhā-l-mablaghu fawātīra-l-māʾi wa-l-kahrabāʾ"
      },
      {
        "speaker": "Karim",
        "tr": "يَشْمَلُ الْمَاءَ فَقَطْ، أَمَّا الْكَهْرَبَاءُ وَالْإِنْتَرْنِتُ فَعَلَى الْمُسْتَأْجِرِ.",
        "en": "It includes water only; the electricity and the internet are paid by the tenant.",
        "tl": "yashmalu-l-māʾa faqaṭ ʾammā-l-kahrabāʾu wa-l-ʾintarnitu fa-ʿalā-l-mustaʾjir"
      },
      {
        "speaker": "Salma",
        "tr": "فَهِمْتُ. وَهَلْ هُنَاكَ تَأْمِينٌ؟",
        "en": "I see. And is there a deposit?",
        "tl": "fahimt wa-hal hunāka taʾmīn"
      },
      {
        "speaker": "Karim",
        "tr": "نَعَمْ، التَّأْمِينُ إِيجَارُ شَهْرٍ وَاحِدٍ، وَيَعُودُ إِلَيْكِ عِنْدَ نِهَايَةِ الْعَقْدِ.",
        "en": "Yes, the deposit is one month’s rent, and it comes back to you at the end of the contract.",
        "tl": "naʿam at-taʾmīnu ʾījāru shahrin wāḥidin wa-yaʿūdu ʾilayki ʿinda nihāyati-l-ʿaqd"
      },
      {
        "speaker": "Salma",
        "tr": "وَمَا مُدَّةُ الْعَقْدِ؟",
        "en": "And how long is the contract?",
        "tl": "wa-mā muddatu-l-ʿaqd"
      },
      {
        "speaker": "Karim",
        "tr": "مُدَّةُ الْعَقْدِ سَنَةٌ وَاحِدَةٌ، وَيُمْكِنُ تَجْدِيدُهُ بَعْدَ ذَلِكَ.",
        "en": "The contract is for one year, and it can be renewed after that.",
        "tl": "muddatu-l-ʿaqdi sanatun wāḥidatun wa-yumkinu tajdīduhu baʿda dhālik"
      },
      {
        "speaker": "Salma",
        "tr": "وَكَيْفَ الْحَيُّ؟ هَلْ تُوجَدُ مَحَلَّاتٌ وَمُوَاصَلَاتٌ قَرِيبَةٌ؟",
        "en": "And what is the neighbourhood like? Are there shops and transport nearby?",
        "tl": "wa-kayfa-l-ḥayy hal tūjadu maḥallātun wa-muwāṣalātun qarība"
      },
      {
        "speaker": "Karim",
        "tr": "الْحَيُّ هَادِئٌ وَآمِنٌ، وَمَوْقِفُ الْحَافِلَاتِ عَلَى بُعْدِ خَمْسِ دَقَائِقَ مَشْيًا عَلَى الْأَقْدَامِ.",
        "en": "The neighbourhood is quiet and safe, and the bus stop is five minutes away on foot.",
        "tl": "al-ḥayyu hādiʾun wa-ʾāminun wa-mawqifu-l-ḥāfilāti ʿalā buʿdi khamsi daqāʾiqa mashyan ʿalā-l-ʾaqdām"
      },
      {
        "speaker": "Karim",
        "tr": "وَيُوجَدُ بِالْقُرْبِ مِنْ هُنَا سُوقٌ وَصَيْدَلِيَّةٌ وَمَخْبَزٌ.",
        "en": "And close by there is a market, a pharmacy and a bakery.",
        "tl": "wa-yūjadu bi-l-qurbi min hunā sūqun wa-ṣaydaliyyatun wa-makhbaz"
      },
      {
        "speaker": "Salma",
        "tr": "هَذَا مُنَاسِبٌ لِي، فَأَنَا أَعْمَلُ فِي مَدْرَسَةٍ قَرِيبَةٍ.",
        "en": "That suits me, as I work at a school nearby.",
        "tl": "hādhā munāsibun lī fa-ʾanā ʾaʿmalu fī madrasatin qarība"
      },
      {
        "speaker": "Salma",
        "tr": "مَتَى أَسْتَطِيعُ أَنْ أَنْتَقِلَ إِلَى الشَّقَّةِ؟",
        "en": "When can I move into the flat?",
        "tl": "matā ʾastaṭīʿu ʾan ʾantaqila ʾilā-sh-shaqqa"
      },
      {
        "speaker": "Karim",
        "tr": "الشَّقَّةُ الْآنَ فَارِغَةٌ، وَيُمْكِنُكِ أَنْ تَنْتَقِلِي فِي أَوَّلِ الشَّهْرِ الْقَادِمِ.",
        "en": "The flat is empty now, and you can move in at the beginning of next month.",
        "tl": "ash-shaqqatu-l-ʾāna fārighatun wa-yumkinuki ʾan tantaqilī fī ʾawwali-sh-shahri-l-qādim"
      },
      {
        "speaker": "Salma",
        "tr": "جَيِّدٌ جِدًّا. أُرِيدُ أَنْ أُفَكِّرَ قَلِيلًا، وَسَأَتَّصِلُ بِكَ غَدًا.",
        "en": "Very good. I’d like to think it over a little, and I’ll call you tomorrow.",
        "tl": "jayyidun jiddan ʾurīdu ʾan ʾufakkira qalīlan wa-sa-ʾattaṣilu bika ghadan"
      },
      {
        "speaker": "Karim",
        "tr": "خُذِي وَقْتَكِ، لَكِنْ هُنَاكَ شَخْصٌ آخَرُ سَيَرَى الشَّقَّةَ بَعْدَ غَدٍ.",
        "en": "Take your time — but there is someone else who will be seeing the flat the day after tomorrow.",
        "tl": "khudhī waqtaki lākin hunāka shakhṣun ʾākharu sa-yarā-sh-shaqqata baʿda ghad"
      },
      {
        "speaker": "Salma",
        "tr": "إِذَنْ سَأُخْبِرُكَ بِقَرَارِي غَدًا صَبَاحًا. شُكْرًا جَزِيلًا عَلَى وَقْتِكَ.",
        "en": "Then I’ll let you know my decision tomorrow morning. Thank you very much for your time.",
        "tl": "ʾidhan sa-ʾukhbiruka bi-qarārī ghadan ṣabāḥan shukran jazīlan ʿalā waqtik"
      },
      {
        "speaker": "Karim",
        "tr": "عَفْوًا، أَنَا فِي انْتِظَارِ اتِّصَالِكِ. مَعَ السَّلَامَةِ.",
        "en": "You’re welcome. I’ll be waiting for your call. Goodbye.",
        "tl": "ʿafwan ʾanā fī-ntiẓāri-ttiṣālik maʿa-s-salāma"
      }
    ],
    "glossary": [
      {
        "tr": "تَفَضَّلِي بِالدُّخُولِ",
        "en": "please come in (said to a woman)",
        "tl": "tafaḍḍalī bi-d-dukhūl"
      },
      {
        "tr": "الْعِمَارَةُ",
        "en": "the building, the block of flats",
        "tl": "al-ʿimāra"
      },
      {
        "tr": "الطَّابِقِ الثَّانِي",
        "en": "the second floor",
        "tl": "aṭ-ṭābiq ath-thānī"
      },
      {
        "tr": "مِصْعَدٌ",
        "en": "a lift, an elevator",
        "tl": "miṣʿad"
      },
      {
        "tr": "غُرْفَةُ الْجُلُوسِ",
        "en": "the living room",
        "tl": "ghurfat al-julūs"
      },
      {
        "tr": "وَاسِعَةٌ",
        "en": "spacious, roomy",
        "tl": "wāsiʿa"
      },
      {
        "tr": "مُشْمِسَةٌ",
        "en": "sunny",
        "tl": "mushmisa"
      },
      {
        "tr": "ثَلَّاجَةٌ",
        "en": "a fridge",
        "tl": "thallāja"
      },
      {
        "tr": "غَسَّالَةٌ",
        "en": "a washing machine",
        "tl": "ghassāla"
      },
      {
        "tr": "الْإِيجَارُ",
        "en": "the rent",
        "tl": "al-ʾījār"
      },
      {
        "tr": "الْمَبْلَغُ",
        "en": "the amount, the sum (of money)",
        "tl": "al-mablagh"
      },
      {
        "tr": "فَوَاتِيرَ",
        "en": "bills (singular فَاتُورَة)",
        "tl": "fawātīr"
      },
      {
        "tr": "الْمُسْتَأْجِرِ",
        "en": "the tenant",
        "tl": "al-mustaʾjir"
      },
      {
        "tr": "تَأْمِينٌ",
        "en": "a deposit",
        "tl": "taʾmīn"
      },
      {
        "tr": "مُدَّةُ الْعَقْدِ",
        "en": "the length of the contract",
        "tl": "muddat al-ʿaqd"
      },
      {
        "tr": "تَجْدِيدُهُ",
        "en": "renewing it (تَجْدِيد, renewal)",
        "tl": "tajdīduh"
      },
      {
        "tr": "مَوْقِفُ الْحَافِلَاتِ",
        "en": "the bus stop",
        "tl": "mawqif al-ḥāfilāt"
      },
      {
        "tr": "أَنْتَقِلَ",
        "en": "I move (house) — اِنْتَقَلَ إِلَى, to move to",
        "tl": "ʾantaqil"
      }
    ],
    "questions": [
      {
        "q": "Which floor is the flat on?",
        "options": [
          "The ground floor",
          "The first floor",
          "The second floor",
          "The fifth floor"
        ],
        "answer": 2,
        "explain": "«الشَّقَّةُ فِي الطَّابِقِ الثَّانِي»."
      },
      {
        "q": "Which bills are included in the rent?",
        "options": [
          "Water only",
          "Water and electricity",
          "Electricity and internet",
          "None of them"
        ],
        "answer": 0,
        "explain": "«يَشْمَلُ الْمَاءَ فَقَطْ، أَمَّا الْكَهْرَبَاءُ وَالْإِنْتَرْنِتُ فَعَلَى الْمُسْتَأْجِرِ»."
      },
      {
        "q": "How much is the deposit?",
        "options": [
          "Three months’ rent",
          "One month’s rent",
          "Half a month’s rent",
          "There is no deposit"
        ],
        "answer": 1,
        "explain": "«التَّأْمِينُ إِيجَارُ شَهْرٍ وَاحِدٍ»."
      },
      {
        "q": "Why might Salma want to decide quickly?",
        "options": [
          "The rent goes up next month",
          "Karim is going away tomorrow",
          "The contract is only for a month",
          "Someone else is viewing the flat the day after tomorrow"
        ],
        "answer": 3,
        "explain": "«هُنَاكَ شَخْصٌ آخَرُ سَيَرَى الشَّقَّةَ بَعْدَ غَدٍ»."
      }
    ]
  },
  {
    "id": "ar-hummus-talk",
    "kind": "speech",
    "level": "B1",
    "title": "An Arab Dish and How to Make It: Hummus",
    "titleNative": "طَبَقٌ عَرَبِيٌّ وَطَرِيقَةُ تَحْضِيرِهِ: الْحُمُّصُ",
    "summary": "A learner gives a short talk about hummus: what it is, when people eat it, what goes into it and the steps for making it, in order. Nothing in it depends on whether the speaker is a man or a woman, so it suits any speaker as it stands.",
    "register": "polite",
    "lines": [
      {
        "tr": "أَهْلًا بِكُمْ جَمِيعًا.",
        "en": "Hello and welcome, everyone.",
        "tl": "ʾahlan bikum jamīʿan"
      },
      {
        "tr": "الْيَوْمَ سَأُحَدِّثُكُمْ عَنْ طَبَقٍ عَرَبِيٍّ مَشْهُورٍ، وَهُوَ الْحُمُّصُ.",
        "en": "Today I am going to tell you about a famous Arab dish: hummus.",
        "tl": "al-yawma sa-ʾuḥaddithukum ʿan ṭabaqin ʿarabiyyin mashhūrin wa-huwa-l-ḥummuṣ"
      },
      {
        "tr": "الْحُمُّصُ طَبَقٌ بَارِدٌ وَنَاعِمٌ، يُصْنَعُ مِنْ حَبِّ الْحُمُّصِ وَالطَّحِينَةِ.",
        "en": "Hummus is a cold, smooth dish made from chickpeas and tahini.",
        "tl": "al-ḥummuṣu ṭabaqun bāridun wa-nāʿimun yuṣnaʿu min ḥabbi-l-ḥummuṣi wa-ṭ-ṭaḥīna"
      },
      {
        "tr": "يَأْكُلُهُ النَّاسُ فِي بِلَادِ الشَّامِ وَمِصْرَ وَفِي بِلَادٍ عَرَبِيَّةٍ أُخْرَى.",
        "en": "People eat it in the Levant, in Egypt and in other Arab countries.",
        "tl": "yaʾkuluhu-n-nāsu fī bilādi-sh-shāmi wa-miṣra wa-fī bilādin ʿarabiyyatin ʾukhrā"
      },
      {
        "tr": "فِي الصَّبَاحِ يَأْكُلُهُ كَثِيرٌ مِنَ النَّاسِ عَلَى الْفُطُورِ مَعَ الْخُبْزِ السَّاخِنِ.",
        "en": "In the morning many people eat it for breakfast with hot bread.",
        "tl": "fī-ṣ-ṣabāḥi yaʾkuluhu kathīrun mina-n-nāsi ʿalā-l-fuṭūri maʿa-l-khubzi-s-sākhin"
      },
      {
        "tr": "وَيُقَدَّمُ أَيْضًا فِي الْغَدَاءِ وَالْعَشَاءِ مَعَ الْمُقَبِّلَاتِ.",
        "en": "It is also served at lunch and dinner, with the starters.",
        "tl": "wa-yuqaddamu ʾayḍan fī-l-ghadāʾi wa-l-ʿashāʾi maʿa-l-muqabbilāt"
      },
      {
        "tr": "هُوَ طَعَامٌ صِحِّيٌّ وَرَخِيصٌ، وَتَحْضِيرُهُ سَهْلٌ جِدًّا.",
        "en": "It is healthy, cheap food, and it is very easy to make.",
        "tl": "huwa ṭaʿāmun ṣiḥḥiyyun wa-rakhīṣun wa-taḥḍīruhu sahlun jiddan"
      },
      {
        "tr": "لِتَحْضِيرِ الْحُمُّصِ نَحْتَاجُ إِلَى مُكَوِّنَاتٍ قَلِيلَةٍ.",
        "en": "To make hummus we need only a few ingredients.",
        "tl": "li-taḥḍīri-l-ḥummuṣi naḥtāju ʾilā mukawwinātin qalīla"
      },
      {
        "tr": "نَحْتَاجُ إِلَى كُوبَيْنِ مِنَ الْحُمُّصِ الْمَسْلُوقِ، وَثَلَاثِ مَلَاعِقَ مِنَ الطَّحِينَةِ.",
        "en": "We need two cups of boiled chickpeas and three spoonfuls of tahini.",
        "tl": "naḥtāju ʾilā kūbayni mina-l-ḥummuṣi-l-maslūqi wa-thalāthi malāʿiqa mina-ṭ-ṭaḥīna"
      },
      {
        "tr": "وَنَحْتَاجُ أَيْضًا إِلَى عَصِيرِ لَيْمُونَةٍ، وَفَصِّ ثُومٍ، وَقَلِيلٍ مِنَ الْمِلْحِ وَزَيْتِ الزَّيْتُونِ.",
        "en": "We also need the juice of a lemon, a clove of garlic, and a little salt and olive oil.",
        "tl": "wa-naḥtāju ʾayḍan ʾilā ʿaṣīri laymūnatin wa-faṣṣi thūmin wa-qalīlin mina-l-milḥi wa-zayti-z-zaytūn"
      },
      {
        "tr": "الطَّحِينَةُ مَعْجُونٌ مِنَ السِّمْسِمِ، وَتَجِدُونَهَا فِي كُلِّ مَتْجَرٍ عَرَبِيٍّ.",
        "en": "Tahini is a paste made from sesame, and you will find it in any Arab shop.",
        "tl": "aṭ-ṭaḥīnatu maʿjūnun mina-s-simsimi wa-tajidūnahā fī kulli matjarin ʿarabī"
      },
      {
        "tr": "إِذَا كَانَ الْحُمُّصُ جَافًّا، نَنْقَعُهُ فِي الْمَاءِ لَيْلَةً كَامِلَةً ثُمَّ نَسْلُقُهُ.",
        "en": "If the chickpeas are dried, we soak them in water for a whole night and then boil them.",
        "tl": "ʾidhā kāna-l-ḥummuṣu jāffan nanqaʿuhu fī-l-māʾi laylatan kāmilatan thumma nasluquh"
      },
      {
        "tr": "الطَّرِيقَةُ سَهْلَةٌ. أَوَّلًا، نَضَعُ الْحُمُّصَ الْمَسْلُوقَ فِي الْخَلَّاطِ.",
        "en": "The method is easy. First, we put the boiled chickpeas in the blender.",
        "tl": "aṭ-ṭarīqatu sahla ʾawwalan naḍaʿu-l-ḥummuṣa-l-maslūqa fī-l-khallāṭ"
      },
      {
        "tr": "ثَانِيًا، نُضِيفُ الطَّحِينَةَ وَعَصِيرَ اللَّيْمُونِ وَالثُّومَ وَالْمِلْحَ.",
        "en": "Second, we add the tahini, the lemon juice, the garlic and the salt.",
        "tl": "thāniyan nuḍīfu-ṭ-ṭaḥīnata wa-ʿaṣīra-l-laymūni wa-th-thūma wa-l-milḥ"
      },
      {
        "tr": "ثَالِثًا، نُضِيفُ قَلِيلًا مِنَ الْمَاءِ الْبَارِدِ، وَنَخْلِطُ كُلَّ شَيْءٍ حَتَّى يَصِيرَ نَاعِمًا تَمَامًا.",
        "en": "Third, we add a little cold water, and blend everything until it becomes completely smooth.",
        "tl": "thālithan nuḍīfu qalīlan mina-l-māʾi-l-bāridi wa-nakhliṭu kulla shayʾin ḥattā yaṣīra nāʿiman tamāman"
      },
      {
        "tr": "بَعْدَ ذَلِكَ نَذُوقُ الْحُمُّصَ، وَنُضِيفُ مِلْحًا أَوْ لَيْمُونًا إِذَا لَزِمَ الْأَمْرُ.",
        "en": "After that we taste the hummus, and add salt or lemon if necessary.",
        "tl": "baʿda dhālika nadhūqu-l-ḥummuṣa wa-nuḍīfu milḥan ʾaw laymūnan ʾidhā lazima-l-ʾamr"
      },
      {
        "tr": "ثُمَّ نَضَعُهُ فِي صَحْنٍ وَاسِعٍ، وَنَصُبُّ فَوْقَهُ قَلِيلًا مِنْ زَيْتِ الزَّيْتُونِ.",
        "en": "Then we put it in a wide dish and pour a little olive oil over it.",
        "tl": "thumma naḍaʿuhu fī ṣaḥnin wāsiʿin wa-naṣubbu fawqahu qalīlan min zayti-z-zaytūn"
      },
      {
        "tr": "وَيُمْكِنُ أَنْ نُزَيِّنَهُ بِحَبَّاتٍ مِنَ الْحُمُّصِ وَقَلِيلٍ مِنَ الْبَقْدُونِسِ.",
        "en": "And we can decorate it with a few whole chickpeas and a little parsley.",
        "tl": "wa-yumkinu ʾan nuzayyinahu bi-ḥabbātin mina-l-ḥummuṣi wa-qalīlin mina-l-baqdūnis"
      },
      {
        "tr": "نَأْكُلُ الْحُمُّصَ بِالْخُبْزِ الْعَرَبِيِّ، لَا بِالْمِلْعَقَةِ!",
        "en": "We eat hummus with Arab bread, not with a spoon!",
        "tl": "naʾkulu-l-ḥummuṣa bi-l-khubzi-l-ʿarabiyyi lā bi-l-milʿaqa"
      },
      {
        "tr": "ذُقْتُ الْحُمُّصَ لِأَوَّلِ مَرَّةٍ فِي مَطْعَمٍ صَغِيرٍ فِي بَيْرُوتَ.",
        "en": "I tasted hummus for the first time in a small restaurant in Beirut.",
        "tl": "dhuqtu-l-ḥummuṣa li-ʾawwali marratin fī maṭʿamin ṣaghīrin fī bayrūt"
      },
      {
        "tr": "مُنْذُ ذَلِكَ الْيَوْمِ أُحَضِّرُهُ فِي بَيْتِي كُلَّ أُسْبُوعٍ تَقْرِيبًا.",
        "en": "Since that day I have made it at home almost every week.",
        "tl": "mundhu dhālika-l-yawmi ʾuḥaḍḍiruhu fī baytī kulla ʾusbūʿin taqrīban"
      },
      {
        "tr": "جَرِّبُوا هَذِهِ الطَّرِيقَةَ فِي بُيُوتِكُمْ، وَسَتَرَوْنَ أَنَّهَا سَهْلَةٌ حَقًّا.",
        "en": "Try this method at home, and you will see that it really is easy.",
        "tl": "jarribū hādhihi-ṭ-ṭarīqata fī buyūtikum wa-sa-tarawna ʾannahā sahlatun ḥaqqan"
      },
      {
        "tr": "وَكَمَا يَقُولُ الْعَرَبُ قَبْلَ الطَّعَامِ: «بِالْهَنَاءِ وَالشِّفَاءِ!»",
        "en": "And as Arabs say before a meal: “Enjoy your food!”",
        "tl": "wa-kamā yaqūlu-l-ʿarabu qabla-ṭ-ṭaʿām bi-l-hanāʾi wa-sh-shifāʾ"
      },
      {
        "tr": "شُكْرًا لَكُمْ عَلَى حُسْنِ اسْتِمَاعِكُمْ.",
        "en": "Thank you for listening.",
        "tl": "shukran lakum ʿalā ḥusni-stimāʿikum"
      }
    ],
    "glossary": [
      {
        "tr": "طَبَقٍ عَرَبِيٍّ",
        "en": "an Arab dish",
        "tl": "ṭabaq ʿarabī"
      },
      {
        "tr": "حَبِّ الْحُمُّصِ",
        "en": "chickpeas (literally “grains of ḥummuṣ”)",
        "tl": "ḥabb al-ḥummuṣ"
      },
      {
        "tr": "الطَّحِينَةِ",
        "en": "tahini, sesame paste",
        "tl": "aṭ-ṭaḥīna"
      },
      {
        "tr": "بِلَادِ الشَّامِ",
        "en": "the Levant (Syria, Lebanon, Jordan and Palestine)",
        "tl": "bilād ash-shām"
      },
      {
        "tr": "الْفُطُورِ",
        "en": "breakfast",
        "tl": "al-fuṭūr"
      },
      {
        "tr": "الْمُقَبِّلَاتِ",
        "en": "starters, mezze",
        "tl": "al-muqabbilāt"
      },
      {
        "tr": "صِحِّيٌّ",
        "en": "healthy",
        "tl": "ṣiḥḥī"
      },
      {
        "tr": "مُكَوِّنَاتٍ",
        "en": "ingredients",
        "tl": "mukawwināt"
      },
      {
        "tr": "مَلَاعِقَ",
        "en": "spoons, spoonfuls (singular مِلْعَقَة)",
        "tl": "malāʿiq"
      },
      {
        "tr": "فَصِّ ثُومٍ",
        "en": "a clove of garlic",
        "tl": "faṣṣ thūm"
      },
      {
        "tr": "زَيْتِ الزَّيْتُونِ",
        "en": "olive oil",
        "tl": "zayt az-zaytūn"
      },
      {
        "tr": "السِّمْسِمِ",
        "en": "sesame",
        "tl": "as-simsim"
      },
      {
        "tr": "نَنْقَعُهُ",
        "en": "we soak it",
        "tl": "nanqaʿuh"
      },
      {
        "tr": "الْمَسْلُوقَ",
        "en": "boiled",
        "tl": "al-maslūq"
      },
      {
        "tr": "الْخَلَّاطِ",
        "en": "the blender",
        "tl": "al-khallāṭ"
      },
      {
        "tr": "نَخْلِطُ",
        "en": "we mix, we blend",
        "tl": "nakhliṭ"
      },
      {
        "tr": "نَذُوقُ",
        "en": "we taste",
        "tl": "nadhūq"
      },
      {
        "tr": "بِالْهَنَاءِ وَالشِّفَاءِ",
        "en": "enjoy your food! (literally “with pleasure and health”)",
        "tl": "bi-l-hanāʾ wa-sh-shifāʾ"
      }
    ],
    "questions": [
      {
        "q": "When do many people eat hummus with hot bread?",
        "options": [
          "Late at night",
          "At breakfast, in the morning",
          "Only at weddings",
          "Only in winter"
        ],
        "answer": 1,
        "explain": "«فِي الصَّبَاحِ يَأْكُلُهُ كَثِيرٌ مِنَ النَّاسِ عَلَى الْفُطُورِ مَعَ الْخُبْزِ السَّاخِنِ»."
      },
      {
        "q": "What is tahini made from?",
        "options": [
          "Chickpeas",
          "Olives",
          "Sesame",
          "Lemons"
        ],
        "answer": 2,
        "explain": "«الطَّحِينَةُ مَعْجُونٌ مِنَ السِّمْسِمِ»."
      },
      {
        "q": "What is the first step of the method?",
        "options": [
          "Putting the boiled chickpeas in the blender",
          "Pouring olive oil into a dish",
          "Adding cold water",
          "Tasting the hummus"
        ],
        "answer": 0,
        "explain": "«أَوَّلًا، نَضَعُ الْحُمُّصَ الْمَسْلُوقَ فِي الْخَلَّاطِ»."
      },
      {
        "q": "Where did the speaker taste hummus for the first time?",
        "options": [
          "At a friend’s home in Cairo",
          "In a market in Damascus",
          "In a school kitchen",
          "In a small restaurant in Beirut"
        ],
        "answer": 3,
        "explain": "«ذُقْتُ الْحُمُّصَ لِأَوَّلِ مَرَّةٍ فِي مَطْعَمٍ صَغِيرٍ فِي بَيْرُوتَ»."
      }
    ]
  },
  {
    "id": "ar-tongue-twisters",
    "kind": "twister",
    "level": "B1",
    "title": "Tongue Twisters",
    "titleNative": "عِبَارَاتٌ صَعْبَةُ النُّطْقِ",
    "summary": "Five well-known Arabic tongue twisters — three from everyday speech and two famous lines of classical Arabic. Say each one slowly first, then three times fast.",
    "lines": [
      {
        "tr": "خَيْطُ حَرِيرٍ عَلَى حَيْطِ خَلِيلٍ.",
        "en": "A silk thread on Khalil’s wall.",
        "tl": "khayṭu ḥarīrin ʿalā ḥayṭi khalīl",
        "note": "Trains خ (kh) against ح (ḥ). حيط is the everyday word for “wall” in the Levant (Standard Arabic: حائط)."
      },
      {
        "tr": "مِشْمِشْنَا مِشْ مِنْ مِشْمِشْكُمْ، وَمِشْمِشْكُمْ مِشْ مِنْ مِشْمِشْنَا.",
        "en": "Our apricots are not from your apricots, and your apricots are not from our apricots.",
        "tl": "mishmishnā mish min mishmishkum wa-mishmishkum mish min mishmishnā",
        "note": "Everyday Arabic: مش means “not”. Trains م and ش."
      },
      {
        "tr": "لُورِي وَرَا لُورِي.",
        "en": "A lorry behind a lorry.",
        "tl": "lūrī warā lūrī",
        "note": "From the Gulf: ورا is the everyday word for “behind” (Standard Arabic: وراء). Trains ل and ر — say it five times fast."
      },
      {
        "tr": "وَقَبْرُ حَرْبٍ بِمَكَانٍ قَفْرٍ، وَلَيْسَ قُرْبَ قَبْرِ حَرْبٍ قَبْرُ.",
        "en": "Harb’s grave lies in a desolate place, and near Harb’s grave there is no grave.",
        "tl": "wa-qabru ḥarbin bi-makānin qafrin wa-laysa qurba qabri ḥarbin qabr",
        "note": "A famous line of classical poetry, said to be impossible to recite three times in a row. Trains ق, ب and ر."
      },
      {
        "tr": "أَلَمٌ أَلَمَّ أَلَمْ أُلِمَّ بِدَائِهِ.",
        "en": "A pain has struck me — did I not come to know its illness?",
        "tl": "ʾalamun ʾalamma ʾalam ʾulimma bi-dāʾih",
        "note": "Classical word-play on look-alikes: أَلَمٌ “a pain”, أَلَمَّ “it struck”, أَلَمْ “did … not”. Trains the glottal stop ء and the doubled م."
      }
    ],
    "glossary": [
      {
        "tr": "خَيْطُ",
        "en": "a thread",
        "tl": "khayṭ"
      },
      {
        "tr": "حَرِيرٍ",
        "en": "silk",
        "tl": "ḥarīr"
      },
      {
        "tr": "مِشْ",
        "en": "not (everyday Arabic)",
        "tl": "mish"
      },
      {
        "tr": "وَرَا",
        "en": "behind (everyday Arabic)",
        "tl": "warā"
      },
      {
        "tr": "قَبْرُ",
        "en": "a grave",
        "tl": "qabr"
      },
      {
        "tr": "قَفْرٍ",
        "en": "desolate, empty",
        "tl": "qafr"
      },
      {
        "tr": "أَلَمٌ",
        "en": "a pain",
        "tl": "ʾalam"
      }
    ],
    "questions": [
      {
        "q": "Where is the silk thread?",
        "options": [
          "In a desolate place",
          "On Khalil’s wall",
          "Behind a lorry",
          "Among the apricots"
        ],
        "answer": 1,
        "explain": "«عَلَى حَيْطِ خَلِيلٍ» — on Khalil’s wall."
      },
      {
        "q": "What does «مِشْ» mean in everyday Arabic?",
        "options": [
          "from",
          "behind",
          "not",
          "our"
        ],
        "answer": 2,
        "explain": "«مِشْ مِنْ» — “not from”."
      },
      {
        "q": "What is there near Harb’s grave?",
        "options": [
          "No other grave",
          "A wall",
          "An apricot tree",
          "A lorry"
        ],
        "answer": 0,
        "explain": "«وَلَيْسَ قُرْبَ قَبْرِ حَرْبٍ قَبْرُ» — near Harb’s grave there is no grave."
      },
      {
        "q": "Which two sounds does the first twister train?",
        "options": [
          "م and ش",
          "ل and ر",
          "ق and ب",
          "خ (kh) and ح (ḥ)"
        ],
        "answer": 3,
        "explain": "خيط and خليل begin with خ; حرير and حيط begin with ح."
      }
    ]
  },
  {
    "id": "ar-proverbs",
    "kind": "saying",
    "level": "A2",
    "title": "Proverbs You Will Hear",
    "titleNative": "أَمْثَالٌ وَحِكَمٌ",
    "summary": "Thirteen proverbs and sayings known across the Arab world. The translation is word for word; the note under it says what people mean.",
    "lines": [
      {
        "tr": "الصَّبْرُ مِفْتَاحُ الْفَرَجِ.",
        "en": "Patience is the key to relief.",
        "tl": "aṣ-ṣabru miftāḥu-l-faraj",
        "note": "Be patient: things get better."
      },
      {
        "tr": "الْجَارُ قَبْلَ الدَّارِ.",
        "en": "The neighbour before the house.",
        "tl": "al-jāru qabla-d-dār",
        "note": "Find out about the neighbours before you choose a home — good neighbours matter most."
      },
      {
        "tr": "خَيْرُ الْكَلَامِ مَا قَلَّ وَدَلَّ.",
        "en": "The best speech is what is short and to the point.",
        "tl": "khayru-l-kalāmi mā qalla wa-dall",
        "note": "Keep it brief and meaningful."
      },
      {
        "tr": "مَنْ جَدَّ وَجَدَ.",
        "en": "Whoever works hard, finds.",
        "tl": "man jadda wajad",
        "note": "Hard work pays off."
      },
      {
        "tr": "الْعِلْمُ نُورٌ.",
        "en": "Knowledge is light.",
        "tl": "al-ʿilmu nūr",
        "note": "Said in praise of learning and education."
      },
      {
        "tr": "فِي التَّأَنِّي السَّلَامَةُ وَفِي الْعَجَلَةِ النَّدَامَةُ.",
        "en": "In taking your time there is safety, and in haste there is regret.",
        "tl": "fī-t-taʾannī-s-salāmatu wa-fī-l-ʿajalati-n-nadāma",
        "note": "Haste makes waste."
      },
      {
        "tr": "الصَّدِيقُ وَقْتَ الضِّيقِ.",
        "en": "The friend, at the time of hardship.",
        "tl": "aṣ-ṣadīqu waqta-ḍ-ḍīq",
        "note": "A friend in need is a friend indeed."
      },
      {
        "tr": "عُصْفُورٌ فِي الْيَدِ خَيْرٌ مِنْ عَشَرَةٍ عَلَى الشَّجَرَةِ.",
        "en": "A bird in the hand is better than ten in the tree.",
        "tl": "ʿuṣfūrun fī-l-yadi khayrun min ʿasharatin ʿalā-sh-shajara",
        "note": "Be glad of what you have for certain."
      },
      {
        "tr": "يَدٌ وَاحِدَةٌ لَا تُصَفِّقُ.",
        "en": "One hand does not clap.",
        "tl": "yadun wāḥidatun lā tuṣaffiq",
        "note": "Nothing gets done without working together."
      },
      {
        "tr": "اُطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ.",
        "en": "Seek knowledge from the cradle to the grave.",
        "tl": "uṭlubū-l-ʿilma mina-l-mahdi ʾilā-l-laḥd",
        "note": "Never stop learning."
      },
      {
        "tr": "لِكُلِّ مَقَامٍ مَقَالٌ.",
        "en": "For every occasion there is a way of speaking.",
        "tl": "li-kulli maqāmin maqāl",
        "note": "Suit your words to the situation."
      },
      {
        "tr": "الْقِرْدُ فِي عَيْنِ أُمِّهِ غَزَالٌ.",
        "en": "In his mother’s eye, the monkey is a gazelle.",
        "tl": "al-qirdu fī ʿayni ʾummihi ghazāl",
        "note": "Every mother thinks her child is beautiful."
      },
      {
        "tr": "الْوَقْتُ كَالسَّيْفِ، إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ.",
        "en": "Time is like a sword: if you do not cut it, it cuts you.",
        "tl": "al-waqtu ka-s-sayfi ʾin lam taqṭaʿhu qaṭaʿak",
        "note": "Use your time well, or it will be lost."
      }
    ],
    "glossary": [
      {
        "tr": "الصَّبْرُ",
        "en": "patience",
        "tl": "aṣ-ṣabr"
      },
      {
        "tr": "مِفْتَاحُ",
        "en": "a key",
        "tl": "miftāḥ"
      },
      {
        "tr": "الْجَارُ",
        "en": "the neighbour",
        "tl": "al-jār"
      },
      {
        "tr": "الْعِلْمُ",
        "en": "knowledge",
        "tl": "al-ʿilm"
      },
      {
        "tr": "الصَّدِيقُ",
        "en": "the friend",
        "tl": "aṣ-ṣadīq"
      },
      {
        "tr": "عُصْفُورٌ",
        "en": "a small bird, a sparrow",
        "tl": "ʿuṣfūr"
      },
      {
        "tr": "يَدٌ",
        "en": "a hand",
        "tl": "yad"
      },
      {
        "tr": "الْوَقْتُ",
        "en": "time",
        "tl": "al-waqt"
      }
    ],
    "questions": [
      {
        "q": "Which proverb tells you to keep what you say short?",
        "options": [
          "الْعِلْمُ نُورٌ.",
          "خَيْرُ الْكَلَامِ مَا قَلَّ وَدَلَّ.",
          "مَنْ جَدَّ وَجَدَ.",
          "الصَّبْرُ مِفْتَاحُ الْفَرَجِ."
        ],
        "answer": 1,
        "explain": "The best speech is what is short and to the point."
      },
      {
        "q": "What does «الْجَارُ قَبْلَ الدَّارِ» advise?",
        "options": [
          "Find out about the neighbours before you choose a home",
          "Visit your neighbours every day",
          "Build your house before winter",
          "Never lend things to neighbours"
        ],
        "answer": 0,
        "explain": "The neighbour before the house: who lives next door matters more than the house itself."
      },
      {
        "q": "In the proverb about the mother, what does the monkey look like to her?",
        "options": [
          "A bird",
          "A sword",
          "A key",
          "A gazelle"
        ],
        "answer": 3,
        "explain": "«الْقِرْدُ فِي عَيْنِ أُمِّهِ غَزَالٌ» — in his mother’s eye, the monkey is a gazelle."
      },
      {
        "q": "Which proverb means “hard work pays off”?",
        "options": [
          "يَدٌ وَاحِدَةٌ لَا تُصَفِّقُ.",
          "الصَّدِيقُ وَقْتَ الضِّيقِ.",
          "مَنْ جَدَّ وَجَدَ.",
          "لِكُلِّ مَقَامٍ مَقَالٌ."
        ],
        "answer": 2,
        "explain": "Whoever works hard, finds."
      }
    ]
  }
];
