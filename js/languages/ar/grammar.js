// Grammar lessons (explanations, tables, examples, quiz). Written and proofread
// with AI assistance; not yet reviewed by native speakers. Edit freely.
export const lessons = [
  {
    "id": "vowels-and-the-article",
    "title": "Vowel marks & the article al-",
    "level": "A1",
    "summary": "How Arabic letters join, what the little vowel marks mean, and how “the” (al-) changes before sun letters.",
    "sections": [
      {
        "heading": "Letters that join",
        "body": "Arabic is written and read **right to left**, and the letters of a word are joined, like handwriting. Most letters connect on both sides, but six — **ا د ذ ر ز و** — never join to the letter after them, which leaves small gaps inside words: in **وَرْدَة** (warda, rose) no two letters are joined at all. A letter can have up to four shapes (alone, at the start, in the middle, at the end of a word), but its core shape stays recognisable.\n\nIn newspapers, signs and text messages the short vowels are left out — readers simply know the words. Lisan shows them everywhere so you can pronounce everything you read."
      },
      {
        "heading": "Short vowels and other marks",
        "body": "Short vowels are small marks written above or below a consonant. Long vowels are written with full letters: **ا** (ā), **ي** (ī) and **و** (ū).",
        "table": {
          "head": [
            "Mark",
            "Name",
            "Sound",
            "Example word"
          ],
          "rows": [
            [
              "بَ",
              "**fatḥa** (stroke above)",
              "ba",
              "قَلَم — qalam, pen"
            ],
            [
              "بِ",
              "**kasra** (stroke below)",
              "bi",
              "بِنْت — bint, girl"
            ],
            [
              "بُ",
              "**ḍamma** (little و above)",
              "bu",
              "خُبْز — khubz, bread"
            ],
            [
              "بْ",
              "**sukūn** (small circle)",
              "b with no vowel",
              "شَمْس — shams, sun"
            ],
            [
              "بَّ",
              "**shadda** (small w shape)",
              "bba: the consonant is doubled",
              "سُكَّر — sukkar, sugar"
            ],
            [
              "بٌ بًا بٍ",
              "**tanwīn** (doubled vowel mark)",
              "bun, ban, bin",
              "شُكْرًا — shukran, thanks"
            ],
            [
              "بَا بِي بُو",
              "**long vowels**",
              "bā, bī, bū",
              "كَبِير — kabīr, big"
            ]
          ]
        }
      },
      {
        "heading": "The article al- and sun letters",
        "body": "Arabic has one word for “the”: **الـ (al-)**, written joined to the front of the noun. There is no word for “a/an” — a noun on its own is indefinite, and in careful Arabic it usually ends in **tanwīn**: كِتَابٌ (kitābun) = a book, الْكِتَابُ (al-kitābu) = the book. Some words never take tanwīn: many names (أَحْمَدُ, سَارَةُ) and some plurals and adjectives, such as شَوَارِعُ (streets) and أَزْرَقُ (blue).\n\nThe l of al- is pronounced only before the 14 **moon letters**. Before the 14 **sun letters** — the ones made with the tip of the tongue — the l is silent and the next consonant is doubled instead, so it carries a shadda: الشَّمْس is **ash-shams**, not al-shams. The l is still written.",
        "table": {
          "head": [
            "Group",
            "Letters",
            "Example"
          ],
          "rows": [
            [
              "**Moon letters** (l is pronounced)",
              "ا ب ج ح خ ع غ ف ق ك م ه و ي",
              "الْقَمَر — al-qamar, the moon"
            ],
            [
              "**Sun letters** (l assimilates)",
              "ت ث د ذ ر ز س ش ص ض ط ظ ل ن",
              "الشَّمْس — ash-shams, the sun"
            ]
          ]
        },
        "examples": [
          {
            "tr": "الْقَمَرُ جَمِيلٌ.",
            "en": "The moon is beautiful.",
            "tl": "al-qamaru jamīl",
            "note": "ق is a moon letter, so the l of al- is pronounced."
          },
          {
            "tr": "الشَّمْسُ حَارَّةٌ.",
            "en": "The sun is hot.",
            "tl": "ash-shamsu ḥārra",
            "note": "ش is a sun letter: the l is written but you say ash-shams."
          },
          {
            "tr": "السَّيَّارَةُ جَدِيدَةٌ.",
            "en": "The car is new.",
            "tl": "as-sayyāratu jadīda",
            "note": "Another sun letter: al- + sayyāra = as-sayyāra."
          }
        ]
      },
      {
        "heading": "Linking words together",
        "body": "Two things happen when words are linked in a sentence. First, the **a of al- drops after a vowel**: فِي + الْبَيْت is said **fī l-bayt** (sounds like “fil-bayt”). Second, nouns carry short **case endings** (-u, -a, -i, or -un, -an, -in with tanwīn) that change with their role in the sentence.\n\nLisan’s transliterations pronounce these endings inside a sentence and drop them on the last word, which is how Arabic is read aloud (the **pausal form**). In everyday speech they are dropped altogether, so you don’t need to master them yet.",
        "examples": [
          {
            "tr": "الْكِتَابُ فِي الْبَيْتِ.",
            "en": "The book is in the house.",
            "tl": "al-kitābu fī l-bayt",
            "note": "After fī the a of al- drops: fī l-bayt. The final -i of al-bayti is not pronounced at the end."
          },
          {
            "tr": "الْمِفْتَاحُ عَلَى الطَّاوِلَةِ.",
            "en": "The key is on the table.",
            "tl": "al-miftāḥu ʿalā ṭ-ṭāwila",
            "note": "Both rules at once: the a drops after ʿalā, and ط is a sun letter."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which of these letters never joins to the letter after it?",
        "options": [
          "ب",
          "م",
          "د",
          "س"
        ],
        "answer": 2,
        "explain": "د is one of the six non-joining letters: ا د ذ ر ز و."
      },
      {
        "q": "Which mark doubles a consonant?",
        "options": [
          "shadda",
          "sukūn",
          "fatḥa",
          "kasra"
        ],
        "answer": 0,
        "explain": "Shadda (ّ) doubles the letter it sits on, as in سُكَّر (sukkar)."
      },
      {
        "q": "How is الشَّمْس (the sun) pronounced?",
        "options": [
          "al-shams",
          "al-sams",
          "il-shams",
          "ash-shams"
        ],
        "answer": 3,
        "explain": "ش is a sun letter, so the l of al- assimilates: ash-shams."
      },
      {
        "q": "What does the tanwīn ending of كِتَابٌ (kitābun) tell you?",
        "options": [
          "The noun is plural.",
          "The noun is indefinite: “a book”.",
          "The noun is feminine.",
          "The word is a verb."
        ],
        "answer": 1,
        "explain": "Tanwīn marks an indefinite noun; with al- it disappears: الْكِتَابُ, the book."
      }
    ]
  },
  {
    "id": "gender-and-adjectives",
    "title": "Masculine, feminine & adjectives",
    "level": "A1",
    "summary": "Every noun is masculine or feminine, and adjectives come after the noun, copying its gender and its “the”.",
    "sections": [
      {
        "heading": "Spotting feminine nouns",
        "body": "Arabic nouns are either **masculine** or **feminine** — there is no neuter “it”. Most feminine nouns end in **ة (tā marbūṭa)**, a “tied t” that is pronounced -a at the end of a phrase: مَدْرَسَة (madrasa, school), سَيَّارَة (sayyāra, car).\n\nA few feminine nouns have no ة: words for female people (أُمّ, mother; بِنْت, girl), most countries and cities (مِصْر, Egypt), and some everyday words such as شَمْس (sun), يَد (hand) and عَيْن (eye). Many words for people, and most adjectives, form the feminine just by adding ة:",
        "table": {
          "head": [
            "Masculine",
            "Feminine",
            "Meaning"
          ],
          "rows": [
            [
              "طَالِب — ṭālib",
              "طَالِبَة — ṭāliba",
              "student"
            ],
            [
              "مُعَلِّم — muʿallim",
              "مُعَلِّمَة — muʿallima",
              "teacher"
            ],
            [
              "صَدِيق — ṣadīq",
              "صَدِيقَة — ṣadīqa",
              "friend"
            ],
            [
              "كَبِير — kabīr",
              "كَبِيرَة — kabīra",
              "big"
            ],
            [
              "جَدِيد — jadīd",
              "جَدِيدَة — jadīda",
              "new"
            ]
          ]
        }
      },
      {
        "heading": "Adjectives follow the noun",
        "body": "An adjective comes **after** its noun and **agrees** with it: a feminine noun takes a feminine adjective (add ة). It also copies the article: if the noun has al-, so does the adjective. **بَيْتٌ كَبِيرٌ** = a big house; **الْبَيْتُ الْكَبِيرُ** = the big house.\n\nIf only the noun has al-, you get a full sentence instead: الْبَيْتُ كَبِيرٌ = “the house is big” (more on this in the next lesson).",
        "examples": [
          {
            "tr": "هَذَا بَيْتٌ كَبِيرٌ.",
            "en": "This is a big house.",
            "tl": "hādhā baytun kabīr",
            "note": "No article on either word: “a big house”."
          },
          {
            "tr": "الْبَيْتُ الْكَبِيرُ قَدِيمٌ.",
            "en": "The big house is old.",
            "tl": "al-baytu l-kabīru qadīm",
            "note": "al- on both noun and adjective = “the big house”."
          },
          {
            "tr": "هَذِهِ سَيَّارَةٌ جَدِيدَةٌ.",
            "en": "This is a new car.",
            "tl": "hādhihi sayyāratun jadīda",
            "note": "سَيَّارَة is feminine, so the adjective is too: jadīda."
          },
          {
            "tr": "سَارَةُ طَالِبَةٌ ذَكِيَّةٌ.",
            "en": "Sara is a clever student.",
            "tl": "sāratu ṭālibatun dhakiyya",
            "note": "A female student, so both words end in ة."
          },
          {
            "tr": "أَسْكُنُ فِي مَدِينَةٍ صَغِيرَةٍ.",
            "en": "I live in a small town.",
            "tl": "ʾaskunu fī madīnatin ṣaghīra",
            "note": "The case ending changes after fī (-in), but the agreement stays the same."
          }
        ]
      },
      {
        "heading": "Where are you from? Adjectives in -ī",
        "body": "Adjectives of nationality and origin end in **-ī (ـِيّ)** for a man and **-iyya (ـِيَّة)** for a woman: عَرَبِيّ / عَرَبِيَّة (Arab, Arabic), مِصْرِيّ / مِصْرِيَّة (Egyptian), أَمْرِيكِيّ / أَمْرِيكِيَّة (American). The word for a language is feminine: **اللُّغَةُ الْعَرَبِيَّةُ** (the Arabic language), or simply الْعَرَبِيَّة.",
        "examples": [
          {
            "tr": "أَنَا أَمْرِيكِيٌّ.",
            "en": "I’m American. (man speaking)",
            "tl": "ʾanā ʾamrīkī",
            "note": "A woman says أَنَا أَمْرِيكِيَّةٌ (ʾanā ʾamrīkiyya)."
          },
          {
            "tr": "هِيَ مِصْرِيَّةٌ.",
            "en": "She is Egyptian.",
            "tl": "hiya miṣriyya",
            "note": "-iyya is the feminine of -ī."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which of these nouns is feminine?",
        "options": [
          "كِتَاب",
          "قَلَم",
          "بَيْت",
          "مَدْرَسَة"
        ],
        "answer": 3,
        "explain": "مَدْرَسَة ends in ة (tā marbūṭa), the usual feminine ending."
      },
      {
        "q": "How do you say “the new car”?",
        "options": [
          "سَيَّارَةٌ جَدِيدَةٌ",
          "السَّيَّارَةُ الْجَدِيدَةُ",
          "السَّيَّارَةُ جَدِيدَةٌ",
          "الْجَدِيدَةُ السَّيَّارَةُ"
        ],
        "answer": 1,
        "explain": "The adjective comes after the noun and copies both its gender and its al-."
      },
      {
        "q": "What does السَّيَّارَةُ جَدِيدَةٌ mean?",
        "options": [
          "The car is new.",
          "the new car",
          "a new car",
          "new cars"
        ],
        "answer": 0,
        "explain": "Only the noun has al-, so this is a full sentence: “The car is new.”"
      },
      {
        "q": "A woman from Egypt says “I’m Egyptian.” Which is right?",
        "options": [
          "أَنَا مِصْرِيٌّ",
          "أَنَا مِصْرُ",
          "أَنَا مِصْرِيَّةٌ",
          "أَنَا الْمِصْرِيُّ"
        ],
        "answer": 2,
        "explain": "A woman uses the feminine form in -iyya: miṣriyya."
      }
    ]
  },
  {
    "id": "pronouns-and-sentences",
    "title": "Pronouns & sentences without “is”",
    "level": "A1",
    "summary": "Learn the words for I, you, he and she, and build sentences like “I am a student” — Arabic needs no “am / is / are” in the present.",
    "sections": [
      {
        "heading": "Personal pronouns",
        "body": "Arabic “you” changes with the person you talk to: **أَنْتَ (ʾanta)** to a man, **أَنْتِ (ʾanti)** to a woman, **أَنْتُمْ (ʾantum)** to a group. There is no separate “it”: a thing is **هُوَ (he)** or **هِيَ (she)** according to its gender. Arabic also has forms for exactly two people (the **dual**) and for groups of women; you’ll mostly meet these in writing.",
        "table": {
          "head": [
            "English",
            "Arabic",
            "Transliteration"
          ],
          "rows": [
            [
              "I",
              "أَنَا",
              "ʾanā"
            ],
            [
              "you (man)",
              "أَنْتَ",
              "ʾanta"
            ],
            [
              "you (woman)",
              "أَنْتِ",
              "ʾanti"
            ],
            [
              "he / it",
              "هُوَ",
              "huwa"
            ],
            [
              "she / it",
              "هِيَ",
              "hiya"
            ],
            [
              "we",
              "نَحْنُ",
              "naḥnu"
            ],
            [
              "you (plural)",
              "أَنْتُمْ",
              "ʾantum"
            ],
            [
              "they",
              "هُمْ",
              "hum"
            ],
            [
              "you two",
              "أَنْتُمَا",
              "ʾantumā"
            ],
            [
              "they two",
              "هُمَا",
              "humā"
            ],
            [
              "you (women)",
              "أَنْتُنَّ",
              "ʾantunna"
            ],
            [
              "they (women)",
              "هُنَّ",
              "hunna"
            ]
          ]
        }
      },
      {
        "heading": "No “is” in the present",
        "body": "To say “X is Y” in the present, just put the two side by side: **أَنَا طَالِبٌ** = “I (am) a student”. This is a **nominal sentence** — a sentence with no verb. The subject usually comes first and is definite (a pronoun, a name or a noun with al-); the description after it has **no al-**. That is the whole difference between الْبَيْتُ كَبِيرٌ (the house is big) and الْبَيْتُ الْكَبِيرُ (the big house). The description still agrees in gender: الْغُرْفَةُ كَبِيرَةٌ.\n\nThe past does need a verb — كَانَ (was) — which you’ll meet in the past tense lesson.",
        "examples": [
          {
            "tr": "أَنَا طَالِبٌ فِي الْجَامِعَةِ.",
            "en": "I’m a student at the university. (man speaking)",
            "tl": "ʾanā ṭālibun fī l-jāmiʿa",
            "note": "No word for “am”: I + student."
          },
          {
            "tr": "هِيَ طَبِيبَةٌ.",
            "en": "She is a doctor.",
            "tl": "hiya ṭabība",
            "note": "ṭabīb + ة for a woman."
          },
          {
            "tr": "هَلْ أَنْتِ مُعَلِّمَةٌ؟",
            "en": "Are you a teacher? (to a woman)",
            "tl": "hal ʾanti muʿallima",
            "note": "ʾanti for a woman; هَلْ turns a statement into a yes/no question."
          },
          {
            "tr": "الْغُرْفَةُ كَبِيرَةٌ.",
            "en": "The room is big.",
            "tl": "al-ghurfatu kabīra",
            "note": "Subject with al-, description without: a full sentence."
          },
          {
            "tr": "نَحْنُ مِنْ لُبْنَانَ.",
            "en": "We are from Lebanon.",
            "tl": "naḥnu min lubnān",
            "note": "Again no verb: we + from Lebanon."
          }
        ]
      },
      {
        "heading": "This and that",
        "body": "**هَذَا (hādhā)** “this” goes with masculine nouns and **هَذِهِ (hādhihi)** with feminine ones; “that” is **ذَلِكَ (dhālika)** / **تِلْكَ (tilka)**. Like any subject they need no “is”: هَذَا كِتَابٌ = this is a book. Put a noun with al- straight after them to say “this book”, “that man”. Note that هَذَا, هَذِهِ and ذَلِكَ contain a long ā that is not written with an alif.",
        "examples": [
          {
            "tr": "هَذِهِ أُمِّي.",
            "en": "This is my mother.",
            "tl": "hādhihi ʾummī",
            "note": "أُمّ is feminine, so هَذِهِ."
          },
          {
            "tr": "ذَلِكَ الرَّجُلُ مُهَنْدِسٌ.",
            "en": "That man is an engineer.",
            "tl": "dhālika r-rajulu muhandis",
            "note": "ذَلِكَ + noun with al- = “that man”."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "You’re asking a woman “Are you a student?” Which “you” do you use?",
        "options": [
          "أَنْتَ",
          "أَنْتِ",
          "أَنْتُمْ",
          "هِيَ"
        ],
        "answer": 1,
        "explain": "أَنْتِ (ʾanti) is “you” to one woman; أَنْتَ (ʾanta) is to a man."
      },
      {
        "q": "How do you say “The book is new”?",
        "options": [
          "الْكِتَابُ الْجَدِيدُ",
          "جَدِيدٌ كِتَابٌ",
          "كِتَابٌ جَدِيدٌ",
          "الْكِتَابُ جَدِيدٌ"
        ],
        "answer": 3,
        "explain": "The subject has al-, the description doesn’t, and no word for “is” is needed."
      },
      {
        "q": "Talking about a car (سَيَّارَة), which pronoun means “it”?",
        "options": [
          "هِيَ",
          "هُوَ",
          "هُمْ",
          "أَنْتَ"
        ],
        "answer": 0,
        "explain": "Things are “he” or “she” by gender, and سَيَّارَة is feminine."
      },
      {
        "q": "Which word means “this” with a feminine noun?",
        "options": [
          "هَذَا",
          "ذَلِكَ",
          "هَذِهِ",
          "هُوَ"
        ],
        "answer": 2,
        "explain": "هَذِهِ (hādhihi) goes with feminine nouns: هَذِهِ سَيَّارَةٌ."
      }
    ]
  },
  {
    "id": "attached-pronouns",
    "title": "My, your, his: attached pronouns",
    "level": "A1",
    "summary": "“My”, “your” and “his” are endings glued to the noun — and the same endings on a preposition give you “I have”.",
    "sections": [
      {
        "heading": "Possessive endings",
        "body": "Instead of a separate word for “my”, Arabic adds an ending to the noun: كِتَاب (book) → **كِتَابِي** (kitābī, my book). A noun with an ending counts as definite, so it **never takes al-**. Like “you”, “your” has different endings for a man (**-ka**) and a woman (**-ki**).\n\nIn careful Arabic a short vowel (usually u) comes before the ending: kitābu-ka. At the end of a sentence -ka and -hu shorten to -k and -h: kitābuk, kitābuh. After an i sound, -hu and -hum become -hi and -him: فِي بَيْتِهِ (fī baytih, in his house).",
        "table": {
          "head": [
            "English",
            "Ending",
            "Example",
            "Transliteration"
          ],
          "rows": [
            [
              "my",
              "ـِي",
              "كِتَابِي",
              "kitābī"
            ],
            [
              "your (man)",
              "ـكَ",
              "كِتَابُكَ",
              "kitābuka"
            ],
            [
              "your (woman)",
              "ـكِ",
              "كِتَابُكِ",
              "kitābuki"
            ],
            [
              "his",
              "ـهُ",
              "كِتَابُهُ",
              "kitābuhu"
            ],
            [
              "her",
              "ـهَا",
              "كِتَابُهَا",
              "kitābuhā"
            ],
            [
              "our",
              "ـنَا",
              "كِتَابُنَا",
              "kitābunā"
            ],
            [
              "your (plural)",
              "ـكُمْ",
              "كِتَابُكُمْ",
              "kitābukum"
            ],
            [
              "their",
              "ـهُمْ",
              "كِتَابُهُمْ",
              "kitābuhum"
            ]
          ]
        }
      },
      {
        "heading": "ة turns into t",
        "body": "When a noun ends in **ة**, it is pronounced **t** before an ending and written as an ordinary **ت**: سَيَّارَة (sayyāra) → **سَيَّارَتِي** (sayyāratī, my car); مَدْرَسَة (madrasa) → **مَدْرَسَتُهُمْ** (madrasatuhum, their school).",
        "examples": [
          {
            "tr": "اِسْمِي أَحْمَدُ.",
            "en": "My name is Ahmed.",
            "tl": "ismī ʾaḥmad",
            "note": "ism (name) + -ī (my)."
          },
          {
            "tr": "مَا اسْمُكَ؟",
            "en": "What’s your name? (to a man)",
            "tl": "mā smuk",
            "note": "To a woman: مَا اسْمُكِ؟ (mā smuki). The i of ism drops after a vowel."
          },
          {
            "tr": "سَيَّارَتُهَا جَدِيدَةٌ.",
            "en": "Her car is new.",
            "tl": "sayyāratuhā jadīda",
            "note": "sayyāra + -hā: the ة becomes ت."
          },
          {
            "tr": "بَيْتُنَا قَرِيبٌ مِنَ الْبَحْرِ.",
            "en": "Our house is near the sea.",
            "tl": "baytunā qarībun mina l-baḥr",
            "note": "bayt + -nā = our house."
          }
        ]
      },
      {
        "heading": "“I have”: عِنْدِي",
        "body": "Arabic has no verb “to have”. Instead it says “at me (there is)”: the preposition **عِنْدَ (ʿinda, at)** plus an ending — **عِنْدِي** (I have), **عِنْدَكَ / عِنْدَكِ** (you have), **عِنْدَهُ** (he has), **عِنْدَهَا** (she has), **عِنْدَنَا** (we have). The same endings attach to other prepositions: **لِي** (for me, mine), **مَعِي** (with me), **مِنْكَ** (from you).",
        "examples": [
          {
            "tr": "عِنْدِي فِكْرَةٌ.",
            "en": "I have an idea.",
            "tl": "ʿindī fikra",
            "note": "Literally “at me (is) an idea”."
          },
          {
            "tr": "هَلْ عِنْدَكَ أَخٌ؟",
            "en": "Do you have a brother? (to a man)",
            "tl": "hal ʿindaka ʾakh",
            "note": "ʿinda + -ka = you have."
          },
          {
            "tr": "عِنْدَهَا قِطَّةٌ صَغِيرَةٌ.",
            "en": "She has a small cat.",
            "tl": "ʿindahā qiṭṭatun ṣaghīra",
            "note": "ʿinda + -hā = she has."
          },
          {
            "tr": "هَذَا الْكِتَابُ لِي.",
            "en": "This book is mine.",
            "tl": "hādhā l-kitābu lī",
            "note": "li- (for, belonging to) + -ī."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “my car”?",
        "options": [
          "سَيَّارَتِي",
          "السَّيَّارَتِي",
          "سَيَّارَةِي",
          "سَيَّارَتُكَ"
        ],
        "answer": 0,
        "explain": "ة becomes ت before an ending, and a noun with an ending never takes al-."
      },
      {
        "q": "Which ending means “her”?",
        "options": [
          "ـهُ",
          "ـكِ",
          "ـهَا",
          "ـهُمْ"
        ],
        "answer": 2,
        "explain": "-hā means “her”; -hu means “his”."
      },
      {
        "q": "You ask a woman “What’s your name?” Which is right?",
        "options": [
          "مَا اسْمُكَ؟",
          "مَا اسْمِي؟",
          "مَا اسْمُهُ؟",
          "مَا اسْمُكِ؟"
        ],
        "answer": 3,
        "explain": "-ki is “your” when you speak to a woman."
      },
      {
        "q": "What does عِنْدَنَا بَيْتٌ كَبِيرٌ mean?",
        "options": [
          "our big house",
          "We have a big house.",
          "We are in a big house.",
          "They have a big house."
        ],
        "answer": 1,
        "explain": "عِنْدَ + نَا (us) = “we have”; Arabic has no verb “to have”."
      }
    ]
  },
  {
    "id": "present-tense",
    "title": "Present tense: verb prefixes",
    "level": "A1",
    "summary": "Present-tense verbs change mainly at the front — أَ for I, تَ for you, يَ for he, نَ for we — and سَـ makes the future.",
    "sections": [
      {
        "heading": "The prefixes أ ت ي ن",
        "body": "In the present tense the person is shown mainly by a **prefix**: **أَ (ʾa-)** I, **تَ (ta-)** you or she, **يَ (ya-)** he or they, **نَ (na-)** we. Three forms also add an ending: **-īna** for “you” to a woman and **-ūna** for plural “you” and “they”. Because the verb already shows who is acting, the pronoun is usually left out: أَكْتُبُ = I write. Note that “you (man)” and “she” look the same: تَكْتُبُ.",
        "table": {
          "head": [
            "Person",
            "Arabic",
            "Transliteration"
          ],
          "rows": [
            [
              "I write",
              "أَكْتُبُ",
              "ʾaktubu"
            ],
            [
              "you write (man)",
              "تَكْتُبُ",
              "taktubu"
            ],
            [
              "you write (woman)",
              "تَكْتُبِينَ",
              "taktubīna"
            ],
            [
              "he writes",
              "يَكْتُبُ",
              "yaktubu"
            ],
            [
              "she writes",
              "تَكْتُبُ",
              "taktubu"
            ],
            [
              "we write",
              "نَكْتُبُ",
              "naktubu"
            ],
            [
              "you write (plural)",
              "تَكْتُبُونَ",
              "taktubūna"
            ],
            [
              "they write",
              "يَكْتُبُونَ",
              "yaktubūna"
            ]
          ]
        }
      },
      {
        "heading": "The vowel inside varies",
        "body": "The prefixes and endings are the same for every verb, but the vowel in the middle (u, a or i) varies and is best learned with each verb: يَكْتُبُ (yaktubu, he writes), يَذْهَبُ (yadhhabu, he goes), يَجْلِسُ (yajlisu, he sits). Some common verbs have **u** in the prefix instead of a: أُرِيدُ (ʾurīdu, I want), تُحِبُّ (tuḥibbu, you like), يُسَافِرُ (yusāfiru, he travels). One present form covers both “I write” and “I’m writing”.",
        "examples": [
          {
            "tr": "أَشْرَبُ الْقَهْوَةَ كُلَّ صَبَاحٍ.",
            "en": "I drink coffee every morning.",
            "tl": "ʾashrabu l-qahwata kulla ṣabāḥ",
            "note": "ʾa- = I. Arabic says “the coffee” for coffee in general."
          },
          {
            "tr": "هَلْ تُحِبُّ الشَّايَ؟",
            "en": "Do you like tea? (to a man)",
            "tl": "hal tuḥibbu sh-shāy",
            "note": "tu-, not ta-: one of the verbs with u in the prefix. To a woman: هَلْ تُحِبِّينَ الشَّايَ؟ (hal tuḥibbīna sh-shāy)."
          },
          {
            "tr": "هِيَ تَعْمَلُ فِي مُسْتَشْفًى.",
            "en": "She works in a hospital.",
            "tl": "hiya taʿmalu fī mustashfā",
            "note": "ta- also means “she”."
          },
          {
            "tr": "نَسْكُنُ فِي الْقَاهِرَةِ.",
            "en": "We live in Cairo.",
            "tl": "naskunu fī l-qāhira",
            "note": "na- = we."
          },
          {
            "tr": "هَلْ تَتَكَلَّمِينَ الْعَرَبِيَّةَ؟",
            "en": "Do you speak Arabic? (to a woman)",
            "tl": "hal tatakallamīna l-ʿarabiyya",
            "note": "ta- + -īna for a woman."
          },
          {
            "tr": "يَدْرُسُونَ فِي الْجَامِعَةِ.",
            "en": "They study at the university.",
            "tl": "yadrusūna fī l-jāmiʿa",
            "note": "ya- + -ūna = they."
          }
        ]
      },
      {
        "heading": "The future with سَـ",
        "body": "For the future, put **سَـ (sa-)** in front of the present tense, written joined to it: سَأَكْتُبُ (sa-ʾaktubu, I will write). The separate word **سَوْفَ (sawfa)** means the same and sounds a little more formal or emphatic.",
        "examples": [
          {
            "tr": "سَنَزُورُ جَدَّتِي يَوْمَ الْجُمُعَةِ.",
            "en": "We’ll visit my grandmother on Friday.",
            "tl": "sa-nazūru jaddatī yawma l-jumuʿa",
            "note": "sa- + nazūru (we visit)."
          },
          {
            "tr": "سَوْفَ يَصِلُ الْقِطَارُ بَعْدَ سَاعَةٍ.",
            "en": "The train will arrive in an hour.",
            "tl": "sawfa yaṣilu l-qiṭāru baʿda sāʿa",
            "note": "sawfa + present = will."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which prefix means “we” in the present tense?",
        "options": [
          "أَ",
          "تَ",
          "يَ",
          "نَ"
        ],
        "answer": 3,
        "explain": "نَ (na-) = we: نَكْتُبُ, we write."
      },
      {
        "q": "تَكْتُبُ can mean…",
        "options": [
          "I write / he writes",
          "you (man) write / she writes",
          "we write",
          "they write"
        ],
        "answer": 1,
        "explain": "The ta- prefix is shared by “you” (man) and “she”; context tells them apart."
      },
      {
        "q": "How do you ask a woman “Do you speak Arabic?”",
        "options": [
          "هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟",
          "هَلْ يَتَكَلَّمُ الْعَرَبِيَّةَ؟",
          "هَلْ تَتَكَلَّمِينَ الْعَرَبِيَّةَ؟",
          "هَلْ أَتَكَلَّمُ الْعَرَبِيَّةَ؟"
        ],
        "answer": 2,
        "explain": "Speaking to a woman, the verb adds -īna: tatakallamīna."
      },
      {
        "q": "What does سَأَذْهَبُ mean?",
        "options": [
          "I will go",
          "I go",
          "I went",
          "Go!"
        ],
        "answer": 0,
        "explain": "sa- in front of the present tense makes the future."
      }
    ]
  },
  {
    "id": "questions",
    "title": "Asking questions",
    "level": "A1",
    "summary": "Make yes/no questions with هَلْ and ask what, who, where, when, why, how and how many.",
    "sections": [
      {
        "heading": "Yes/no questions with هَلْ",
        "body": "To make a yes/no question, put **هَلْ (hal)** in front of a statement — nothing else changes. In speech, a rising voice alone also works. Answer with **نَعَمْ (naʿam, yes)** or **لَا (lā, no)**.",
        "examples": [
          {
            "tr": "هَلْ أَنْتَ مِنْ مِصْرَ؟",
            "en": "Are you from Egypt? (to a man)",
            "tl": "hal ʾanta min miṣr",
            "note": "hal + statement = yes/no question."
          },
          {
            "tr": "هَلْ يُوجَدُ مَطْعَمٌ قَرِيبٌ مِنْ هُنَا؟",
            "en": "Is there a restaurant near here?",
            "tl": "hal yūjadu maṭʿamun qarībun min hunā",
            "note": "يُوجَدُ (yūjadu) = there is."
          }
        ]
      },
      {
        "heading": "Question words",
        "body": "Question words go at the **start** of the sentence. Use **مَا** before nouns and pronouns (مَا هَذَا؟ what is this?) and **مَاذَا** before verbs. After **كَمْ (how many)** the noun is **singular** and ends in -an: كَمْ سَاعَةً؟ (how many hours?). To ask a price, say **بِكَمْ؟** (for how much?). **أَيّ (which)** is followed by a singular noun without al-.",
        "table": {
          "head": [
            "English",
            "Arabic",
            "Transliteration"
          ],
          "rows": [
            [
              "what? (before a noun)",
              "مَا",
              "mā"
            ],
            [
              "what? (before a verb)",
              "مَاذَا",
              "mādhā"
            ],
            [
              "who?",
              "مَنْ",
              "man"
            ],
            [
              "where?",
              "أَيْنَ",
              "ʾayna"
            ],
            [
              "where from?",
              "مِنْ أَيْنَ",
              "min ʾayna"
            ],
            [
              "when?",
              "مَتَى",
              "matā"
            ],
            [
              "why?",
              "لِمَاذَا",
              "limādhā"
            ],
            [
              "how?",
              "كَيْفَ",
              "kayfa"
            ],
            [
              "how many? how much?",
              "كَمْ",
              "kam"
            ],
            [
              "how much? (price)",
              "بِكَمْ",
              "bikam"
            ],
            [
              "which?",
              "أَيّ",
              "ʾayy"
            ]
          ]
        },
        "examples": [
          {
            "tr": "مِنْ أَيْنَ أَنْتِ؟",
            "en": "Where are you from? (to a woman)",
            "tl": "min ʾayna ʾanti",
            "note": "min (from) + ʾayna (where)."
          },
          {
            "tr": "مَاذَا تَشْرَبُ؟",
            "en": "What will you have to drink? (to a man)",
            "tl": "mādhā tashrab",
            "note": "mādhā before a verb."
          },
          {
            "tr": "مَتَى يَبْدَأُ الدَّرْسُ؟",
            "en": "When does the lesson start?",
            "tl": "matā yabdaʾu d-dars",
            "note": "After a question word the verb usually comes before its subject."
          },
          {
            "tr": "لِمَاذَا تَدْرُسِينَ الْعَرَبِيَّةَ؟",
            "en": "Why are you studying Arabic? (to a woman)",
            "tl": "limādhā tadrusīna l-ʿarabiyya",
            "note": "limādhā = why."
          },
          {
            "tr": "كَمْ أَخًا عِنْدَكَ؟",
            "en": "How many brothers do you have? (to a man)",
            "tl": "kam ʾakhan ʿindak",
            "note": "After kam: a singular noun ending in -an."
          },
          {
            "tr": "كَمْ عُمْرُكَ؟",
            "en": "How old are you? (to a man)",
            "tl": "kam ʿumruk",
            "note": "Literally “how much is your age?”"
          },
          {
            "tr": "بِكَمْ هَذَا الْقَمِيصُ؟",
            "en": "How much is this shirt?",
            "tl": "bikam hādhā l-qamīṣ",
            "note": "bikam = for how much."
          },
          {
            "tr": "أَيَّ لَوْنٍ تُحِبُّ؟",
            "en": "Which colour do you like? (to a man)",
            "tl": "ʾayya lawnin tuḥibb",
            "note": "ʾayy + singular noun = which."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which word turns a statement into a yes/no question?",
        "options": [
          "مَنْ",
          "هَلْ",
          "كَمْ",
          "مَا"
        ],
        "answer": 1,
        "explain": "هَلْ goes at the start: هَلْ أَنْتَ طَالِبٌ؟ (Are you a student?)"
      },
      {
        "q": "“What do you want?” — which word for “what” goes before the verb تُرِيدُ?",
        "options": [
          "مَاذَا",
          "مَتَى",
          "مَنْ",
          "أَيْنَ"
        ],
        "answer": 0,
        "explain": "Before a verb, “what” is مَاذَا: مَاذَا تُرِيدُ؟"
      },
      {
        "q": "What does مَتَى mean?",
        "options": [
          "where",
          "why",
          "how",
          "when"
        ],
        "answer": 3,
        "explain": "مَتَى (matā) = when."
      },
      {
        "q": "Which is correct for “How many books?”",
        "options": [
          "كَمْ كُتُبٌ؟",
          "كَمْ الْكِتَابُ؟",
          "كَمْ كِتَابًا؟",
          "كَمْ كِتَابَانِ؟"
        ],
        "answer": 2,
        "explain": "After كَمْ the noun is singular and ends in -an: kam kitāban?"
      }
    ]
  },
  {
    "id": "idafa",
    "title": "“The X of Y”: the iḍāfa",
    "level": "A2",
    "summary": "Put two nouns side by side to say “the door of the house” or “a cup of coffee” — the possessive construction called iḍāfa.",
    "sections": [
      {
        "heading": "Two nouns side by side",
        "body": "To say “the X of Y” or “Y’s X”, Arabic simply puts the two nouns together: **بَابُ الْبَيْتِ** (bābu l-bayt) = the door of the house. This is the **iḍāfa** (“addition”). The key rule: the **first noun never takes al-** (and no tanwīn). The second noun takes the genitive ending -i.\n\nIf the second noun is definite (with al-, a name, or a possessive ending), the whole phrase is definite: “**the** door of the house”. If it is indefinite, so is the phrase: فِنْجَانُ قَهْوَةٍ = a cup of coffee.",
        "examples": [
          {
            "tr": "بَابُ الْبَيْتِ مَفْتُوحٌ.",
            "en": "The door of the house is open.",
            "tl": "bābu l-bayti maftūḥ",
            "note": "No al- on bāb, even though it means “the door”."
          },
          {
            "tr": "هَذَا كِتَابُ الْمُعَلِّمِ.",
            "en": "This is the teacher’s book.",
            "tl": "hādhā kitābu l-muʿallim",
            "note": "book + the teacher = the teacher’s book."
          },
          {
            "tr": "أُرِيدُ فِنْجَانَ قَهْوَةٍ، مِنْ فَضْلِكَ.",
            "en": "I’d like a cup of coffee, please.",
            "tl": "ʾurīdu finjāna qahwa min faḍlik",
            "note": "An indefinite second noun gives “a cup of coffee”."
          }
        ]
      },
      {
        "heading": "ة is pronounced t",
        "body": "When the first noun ends in **ة**, you pronounce the **t**: مَدِينَة (madīna), but **مَدِينَةُ الرِّيَاضِ** (madīnatu r-riyāḍ, the city of Riyadh). The second noun can also carry a possessive ending: **بَابُ بَيْتِي** (bābu baytī, the door of my house).\n\nNothing can come between the two nouns, so an adjective describing the first noun goes **after the whole phrase**: سَيَّارَةُ أَبِي الْجَدِيدَةُ = my father’s new car.",
        "examples": [
          {
            "tr": "مَدِينَةُ الرِّيَاضِ كَبِيرَةٌ جِدًّا.",
            "en": "The city of Riyadh is very big.",
            "tl": "madīnatu r-riyāḍi kabīratun jiddan",
            "note": "madīna → madīnatu: the ة is pronounced t."
          },
          {
            "tr": "جَامِعَةُ الْقَاهِرَةِ قَدِيمَةٌ.",
            "en": "Cairo University is old.",
            "tl": "jāmiʿatu l-qāhirati qadīma",
            "note": "Arabic says “the university of Cairo”."
          },
          {
            "tr": "بَابُ بَيْتِي أَزْرَقُ.",
            "en": "The door of my house is blue.",
            "tl": "bābu baytī ʾazraq",
            "note": "The second noun has a possessive ending: baytī."
          },
          {
            "tr": "سَيَّارَةُ أَبِي الْجَدِيدَةُ حَمْرَاءُ.",
            "en": "My father’s new car is red.",
            "tl": "sayyāratu ʾabī l-jadīdatu ḥamrāʾ",
            "note": "The adjective follows the whole phrase and agrees with سَيَّارَة (feminine)."
          }
        ]
      },
      {
        "heading": "Everyday iḍāfas",
        "body": "Many everyday expressions are iḍāfas — including one you already know, صَبَاحُ الْخَيْرِ.",
        "table": {
          "head": [
            "Arabic",
            "Transliteration",
            "Literally",
            "Meaning"
          ],
          "rows": [
            [
              "صَبَاحُ الْخَيْرِ",
              "ṣabāḥu l-khayr",
              "morning of goodness",
              "good morning"
            ],
            [
              "غُرْفَةُ النَّوْمِ",
              "ghurfatu n-nawm",
              "room of sleep",
              "bedroom"
            ],
            [
              "يَوْمُ الْجُمُعَةِ",
              "yawmu l-jumuʿa",
              "day of the gathering",
              "Friday"
            ],
            [
              "رَقْمُ الْهَاتِفِ",
              "raqmu l-hātif",
              "number of the phone",
              "phone number"
            ],
            [
              "مَحَطَّةُ الْقِطَارِ",
              "maḥaṭṭatu l-qiṭār",
              "station of the train",
              "train station"
            ],
            [
              "عِيدُ مِيلَادِي",
              "ʿīdu mīlādī",
              "feast of my birth",
              "my birthday"
            ]
          ]
        }
      }
    ],
    "quiz": [
      {
        "q": "How do you say “the door of the house”?",
        "options": [
          "الْبَابُ الْبَيْتِ",
          "الْبَيْتُ بَابٌ",
          "بَابُ الْبَيْتِ",
          "بَابٌ بَيْتٌ"
        ],
        "answer": 2,
        "explain": "The first noun of an iḍāfa never takes al-."
      },
      {
        "q": "In مَدِينَةُ الرِّيَاضِ, how is the ة pronounced?",
        "options": [
          "It is silent.",
          "as -a",
          "as h",
          "as t: madīnatu"
        ],
        "answer": 3,
        "explain": "The first noun of an iḍāfa pronounces its ة as t."
      },
      {
        "q": "What does فِنْجَانُ قَهْوَةٍ mean?",
        "options": [
          "the coffee’s cup",
          "a cup of coffee",
          "The coffee is in the cup.",
          "coffee cups"
        ],
        "answer": 1,
        "explain": "With an indefinite second noun the phrase is indefinite: “a cup of coffee”."
      },
      {
        "q": "Which phrase means “my father’s car”?",
        "options": [
          "سَيَّارَةُ أَبِي",
          "السَّيَّارَةُ أَبِي",
          "أَبِي سَيَّارَةٌ",
          "سَيَّارَتِي أَبٌ"
        ],
        "answer": 0,
        "explain": "car + my father, with no al- on the first noun."
      }
    ]
  },
  {
    "id": "dual-and-plurals",
    "title": "Two and more: dual & plurals",
    "level": "A2",
    "summary": "Arabic has a special form for exactly two, regular plural endings for people and many feminine nouns, and “broken” plurals that change the inside of the word.",
    "sections": [
      {
        "heading": "The dual: exactly two",
        "body": "For exactly two of something, add **-āni (ـَانِ)** to the noun, or **-ayni (ـَيْنِ)** after a preposition and as an object. No word for “two” is needed: كِتَاب → **كِتَابَانِ** (kitābān, two books). A ة turns into t: سَيَّارَة → **سَيَّارَتَانِ** (sayyāratān, two cars). In everyday speech you’ll mostly hear the -ayn form.",
        "examples": [
          {
            "tr": "عِنْدِي وَلَدَانِ.",
            "en": "I have two sons.",
            "tl": "ʿindī waladān",
            "note": "walad + -āni = two boys / two sons."
          },
          {
            "tr": "سَأَبْقَى فِي الْفُنْدُقِ لَيْلَتَيْنِ.",
            "en": "I’ll stay at the hotel for two nights.",
            "tl": "sa-ʾabqā fī l-funduqi laylatayn",
            "note": "-ayni here because it is not the subject; layla → laylatayn."
          }
        ]
      },
      {
        "heading": "Sound plurals: -ūn and -āt",
        "body": "Words for male people (and mixed groups) often take **-ūna (ـُونَ)**, or **-īna (ـِينَ)** after prepositions and as objects: مُعَلِّم → **مُعَلِّمُونَ** (teachers). Words for female people, and many other feminine nouns in ة, take **-āt (ـَات)** in place of the ة: مُعَلِّمَة → **مُعَلِّمَات**, سَيَّارَة → **سَيَّارَات**. Not all of them do: مَدِينَة → مُدُن (cities), مَدْرَسَة → مَدَارِس (schools).",
        "table": {
          "head": [
            "Singular",
            "Dual",
            "Plural"
          ],
          "rows": [
            [
              "مُعَلِّم — muʿallim (male teacher)",
              "مُعَلِّمَانِ — muʿallimān",
              "مُعَلِّمُونَ — muʿallimūn"
            ],
            [
              "مُهَنْدِس — muhandis (engineer)",
              "مُهَنْدِسَانِ — muhandisān",
              "مُهَنْدِسُونَ — muhandisūn"
            ],
            [
              "مُعَلِّمَة — muʿallima (female teacher)",
              "مُعَلِّمَتَانِ — muʿallimatān",
              "مُعَلِّمَات — muʿallimāt"
            ],
            [
              "سَيَّارَة — sayyāra (car)",
              "سَيَّارَتَانِ — sayyāratān",
              "سَيَّارَات — sayyārāt"
            ]
          ]
        },
        "examples": [
          {
            "tr": "الْمُعَلِّمُونَ فِي الْمَدْرَسَةِ.",
            "en": "The teachers are at the school.",
            "tl": "al-muʿallimūna fī l-madrasa",
            "note": "Sound masculine plural: -ūna."
          },
          {
            "tr": "الطَّالِبَاتُ فِي الْمَكْتَبَةِ.",
            "en": "The (female) students are in the library.",
            "tl": "aṭ-ṭālibātu fī l-maktaba",
            "note": "Sound feminine plural: ṭāliba → ṭālibāt."
          }
        ]
      },
      {
        "heading": "Broken plurals",
        "body": "Most other nouns — including most words for things — have a **broken plural**: the root consonants stay, but the vowels around them change, a bit like English man → men. There are common patterns, but at first it’s best to learn each plural with its word.\n\nOne important rule: plurals of **things and animals** are treated as **feminine singular** — they take هِيَ, هَذِهِ and a feminine singular adjective: هَذِهِ الْكُتُبُ جَدِيدَةٌ. Plurals of people take plural agreement.",
        "table": {
          "head": [
            "Singular",
            "Plural",
            "Meaning"
          ],
          "rows": [
            [
              "كِتَاب — kitāb",
              "كُتُب — kutub",
              "book → books"
            ],
            [
              "بَيْت — bayt",
              "بُيُوت — buyūt",
              "house → houses"
            ],
            [
              "وَلَد — walad",
              "أَوْلَاد — ʾawlād",
              "boy → boys, children"
            ],
            [
              "رَجُل — rajul",
              "رِجَال — rijāl",
              "man → men"
            ],
            [
              "قَلَم — qalam",
              "أَقْلَام — ʾaqlām",
              "pen → pens"
            ],
            [
              "صَدِيق — ṣadīq",
              "أَصْدِقَاء — ʾaṣdiqāʾ",
              "friend → friends"
            ],
            [
              "مَدِينَة — madīna",
              "مُدُن — mudun",
              "city → cities"
            ],
            [
              "شَارِع — shāriʿ",
              "شَوَارِع — shawāriʿ",
              "street → streets"
            ]
          ]
        },
        "examples": [
          {
            "tr": "هَذِهِ الْكُتُبُ جَدِيدَةٌ.",
            "en": "These books are new.",
            "tl": "hādhihi l-kutubu jadīda",
            "note": "Plural of things → هَذِهِ and a feminine singular adjective."
          },
          {
            "tr": "فِي الْمَدِينَةِ شَوَارِعُ جَمِيلَةٌ.",
            "en": "The city has beautiful streets.",
            "tl": "fī l-madīnati shawāriʿu jamīla",
            "note": "Literally “in the city (are) beautiful streets”: jamīla is feminine singular."
          },
          {
            "tr": "عِنْدِي أَصْدِقَاءُ كَثِيرُونَ.",
            "en": "I have a lot of friends.",
            "tl": "ʿindī ʾaṣdiqāʾu kathīrūn",
            "note": "Plural of people → plural adjective: kathīrūn."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What does كِتَابَانِ mean?",
        "options": [
          "two books",
          "books",
          "the book",
          "a book"
        ],
        "answer": 0,
        "explain": "-āni is the dual ending: exactly two."
      },
      {
        "q": "What is the plural of سَيَّارَة (car)?",
        "options": [
          "سَيَّارُونَ",
          "أَسْيَار",
          "سَيَّارَات",
          "سَيَّارَتَانِ"
        ],
        "answer": 2,
        "explain": "سَيَّارَة takes -āt, like many feminine nouns in ة; سَيَّارَتَانِ is the dual."
      },
      {
        "q": "Which is the plural of بَيْت (house)?",
        "options": [
          "بَيْتُونَ",
          "بَيْتَات",
          "بَيْتَانِ",
          "بُيُوت"
        ],
        "answer": 3,
        "explain": "بَيْت has a broken plural: بُيُوت (buyūt)."
      },
      {
        "q": "Complete “These houses are big”: هَذِهِ الْبُيُوتُ ___",
        "options": [
          "كَبِيرٌ",
          "كَبِيرَةٌ",
          "كَبِيرُونَ",
          "الْكَبِيرَةُ"
        ],
        "answer": 1,
        "explain": "Plurals of things take a feminine singular adjective."
      }
    ]
  },
  {
    "id": "past-tense",
    "title": "Past tense: endings",
    "level": "A2",
    "summary": "The past tense works the other way round from the present: the person is shown by an ending added to the verb.",
    "sections": [
      {
        "heading": "Past tense endings",
        "body": "The basic past form is the **he** form, such as **كَتَبَ (kataba, he wrote)** — this is also how Arabic dictionaries list verbs. For the other persons you add an **ending**; there are no prefixes. Watch the small differences at the end: katabtu (I), katabta (you, man), katabti (you, woman). The alif at the end of كَتَبُوا (they wrote) is silent.",
        "table": {
          "head": [
            "Person",
            "Arabic",
            "Transliteration"
          ],
          "rows": [
            [
              "I wrote",
              "كَتَبْتُ",
              "katabtu"
            ],
            [
              "you wrote (man)",
              "كَتَبْتَ",
              "katabta"
            ],
            [
              "you wrote (woman)",
              "كَتَبْتِ",
              "katabti"
            ],
            [
              "he wrote",
              "كَتَبَ",
              "kataba"
            ],
            [
              "she wrote",
              "كَتَبَتْ",
              "katabat"
            ],
            [
              "we wrote",
              "كَتَبْنَا",
              "katabnā"
            ],
            [
              "you wrote (plural)",
              "كَتَبْتُمْ",
              "katabtum"
            ],
            [
              "they wrote",
              "كَتَبُوا",
              "katabū"
            ]
          ]
        },
        "examples": [
          {
            "tr": "ذَهَبْتُ إِلَى السُّوقِ أَمْسِ.",
            "en": "I went to the market yesterday.",
            "tl": "dhahabtu ʾilā s-sūqi ʾams",
            "note": "dhahab + -tu = I went."
          },
          {
            "tr": "هَلْ أَكَلْتِ الْفُطُورَ؟",
            "en": "Have you had breakfast? (to a woman)",
            "tl": "hal ʾakalti l-fuṭūr",
            "note": "-ti = you (woman)."
          },
          {
            "tr": "وَصَلَتْ أُخْتِي مِنَ الْمَطَارِ.",
            "en": "My sister has arrived from the airport.",
            "tl": "waṣalat ʾukhtī mina l-maṭār",
            "note": "-at = she."
          },
          {
            "tr": "دَرَسْنَا الْعَرَبِيَّةَ فِي الْجَامِعَةِ.",
            "en": "We studied Arabic at university.",
            "tl": "darasnā l-ʿarabiyyata fī l-jāmiʿa",
            "note": "-nā = we."
          }
        ]
      },
      {
        "heading": "Using the past",
        "body": "The past tense covers “I wrote”, “I have written” and “I did write”. The verb often comes **first** in the sentence: ذَهَبَ أَحْمَدُ إِلَى السُّوقِ (Ahmed went to the market). When the verb comes before a plural subject, it stays **singular**: وَصَلَ الضُّيُوفُ (the guests have arrived).\n\nTo say “was / were”, use **كَانَ (kāna)**, which changes its vowel: **كُنْتُ** (I was), **كَانَ** (he was), **كَانَتْ** (she was), **كُنَّا** (we were). The description after it takes the ending -an: كُنْتُ مَرِيضًا (I was ill).",
        "examples": [
          {
            "tr": "وَصَلَ الضُّيُوفُ.",
            "en": "The guests have arrived.",
            "tl": "waṣala ḍ-ḍuyūf",
            "note": "Verb first, so it stays singular before a plural subject."
          },
          {
            "tr": "كُنْتُ مَرِيضًا أَمْسِ.",
            "en": "I was ill yesterday. (man speaking)",
            "tl": "kuntu marīḍan ʾams",
            "note": "A woman says كُنْتُ مَرِيضَةً أَمْسِ (kuntu marīḍatan ʾams)."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What does كَتَبْنَا mean?",
        "options": [
          "we write",
          "I wrote",
          "they wrote",
          "we wrote"
        ],
        "answer": 3,
        "explain": "-nā on a past verb = we."
      },
      {
        "q": "How do you say “she went”?",
        "options": [
          "ذَهَبَتْ",
          "ذَهَبْتُ",
          "ذَهَبَ",
          "تَذْهَبُ"
        ],
        "answer": 0,
        "explain": "-at = she in the past; تَذْهَبُ is the present."
      },
      {
        "q": "Which verb means “was / were”?",
        "options": [
          "لَيْسَ",
          "كَانَ",
          "عِنْدَ",
          "هَلْ"
        ],
        "answer": 1,
        "explain": "كَانَ (kāna) = he was; كُنْتُ = I was."
      },
      {
        "q": "Why is the verb singular in وَصَلَ الضُّيُوفُ (the guests have arrived)?",
        "options": [
          "Because guests count as things.",
          "Because it is the future.",
          "Because a verb that comes before its subject stays singular.",
          "It’s a mistake."
        ],
        "answer": 2,
        "explain": "In verb-first sentences the verb does not take the plural ending."
      }
    ]
  },
  {
    "id": "negation",
    "title": "Saying “not”: لا، لم، لن، ليس",
    "level": "A2",
    "summary": "Arabic has several words for “not” — which one you need depends on the tense and on whether the sentence has a verb.",
    "sections": [
      {
        "heading": "Which “not” when?",
        "body": "**لَا** negates the present: لَا أَعْرِفُ (I don’t know). For the past, standard Arabic uses **لَمْ** + the present form with its final vowel dropped: لَمْ أَذْهَبْ (I didn’t go); the endings -īna and -ūna lose their -na: لَمْ يَذْهَبُوا (they didn’t go). **مَا** + the past form means the same and is common in speech and stories. **لَنْ** + the present form ending in -a negates the future.",
        "table": {
          "head": [
            "Word",
            "Use it for",
            "Example",
            "Meaning"
          ],
          "rows": [
            [
              "**لَا** — lā",
              "the present",
              "لَا أَعْرِفُ",
              "I don’t know"
            ],
            [
              "**لَمْ** — lam",
              "the past (+ present form, final vowel dropped)",
              "لَمْ أَذْهَبْ",
              "I didn’t go"
            ],
            [
              "**مَا** — mā",
              "the past (+ past form)",
              "مَا ذَهَبْتُ",
              "I didn’t go"
            ],
            [
              "**لَنْ** — lan",
              "the future (+ present form ending in -a)",
              "لَنْ أَذْهَبَ",
              "I won’t go"
            ],
            [
              "**لَا** — lā",
              "“don’t!” (+ present form, final vowel dropped)",
              "لَا تَذْهَبْ",
              "Don’t go! (to a man)"
            ],
            [
              "**لَيْسَ** — laysa",
              "sentences with no verb",
              "لَيْسَ هُنَا",
              "He isn’t here"
            ]
          ]
        },
        "examples": [
          {
            "tr": "لَا أَتَكَلَّمُ الْعَرَبِيَّةَ جَيِّدًا.",
            "en": "I don’t speak Arabic well.",
            "tl": "lā ʾatakallamu l-ʿarabiyyata jayyidan",
            "note": "lā + present."
          },
          {
            "tr": "لَمْ أَذْهَبْ إِلَى الْعَمَلِ أَمْسِ.",
            "en": "I didn’t go to work yesterday.",
            "tl": "lam ʾadhhab ʾilā l-ʿamali ʾams",
            "note": "lam + ʾadhhab (no final vowel) = didn’t go."
          },
          {
            "tr": "مَا رَأَيْتُهُ الْيَوْمَ.",
            "en": "I haven’t seen him today.",
            "tl": "mā raʾaytuhu l-yawm",
            "note": "mā + past verb."
          },
          {
            "tr": "لَنْ أَنْسَاكَ.",
            "en": "I won’t forget you. (to a man)",
            "tl": "lan ʾansāk",
            "note": "lan = will not."
          }
        ]
      },
      {
        "heading": "لَيْسَ — “is not”",
        "body": "Sentences without a verb (“I am a student”) are negated with **لَيْسَ**. It means “is not” in the present, but it takes endings like a past-tense verb. A description after it usually takes the ending -an: لَسْتُ طَالِبًا (I’m not a student). In everyday speech many Arabs use a different word altogether — see the lesson on spoken Arabic.",
        "table": {
          "head": [
            "Person",
            "Arabic",
            "Transliteration"
          ],
          "rows": [
            [
              "I am not",
              "لَسْتُ",
              "lastu"
            ],
            [
              "you are not (man)",
              "لَسْتَ",
              "lasta"
            ],
            [
              "you are not (woman)",
              "لَسْتِ",
              "lasti"
            ],
            [
              "he is not",
              "لَيْسَ",
              "laysa"
            ],
            [
              "she is not",
              "لَيْسَتْ",
              "laysat"
            ],
            [
              "we are not",
              "لَسْنَا",
              "lasnā"
            ],
            [
              "they are not",
              "لَيْسُوا",
              "laysū"
            ]
          ]
        },
        "examples": [
          {
            "tr": "هُوَ لَيْسَ فِي الْبَيْتِ.",
            "en": "He isn’t at home.",
            "tl": "huwa laysa fī l-bayt",
            "note": "laysa negates a sentence without a verb."
          },
          {
            "tr": "لَسْتُ مِنْ هُنَا.",
            "en": "I’m not from here.",
            "tl": "lastu min hunā",
            "note": "lastu = I am not."
          },
          {
            "tr": "هِيَ لَيْسَتْ مُعَلِّمَةً، هِيَ طَبِيبَةٌ.",
            "en": "She isn’t a teacher, she’s a doctor.",
            "tl": "hiya laysat muʿallima hiya ṭabība",
            "note": "After laysa the description ends in -an (muʿallimatan), dropped here before the pause."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “I don’t understand”?",
        "options": [
          "لَمْ أَفْهَمُ",
          "لَا أَفْهَمُ",
          "لَيْسَ أَفْهَمُ",
          "لَنْ فَهِمْتُ"
        ],
        "answer": 1,
        "explain": "لَا negates a present-tense verb."
      },
      {
        "q": "Which word negates a sentence with no verb, like “He is not here”?",
        "options": [
          "لَا",
          "لَمْ",
          "لَنْ",
          "لَيْسَ"
        ],
        "answer": 3,
        "explain": "لَيْسَ means “is not”: لَيْسَ هُنَا."
      },
      {
        "q": "What does لَمْ أَذْهَبْ mean?",
        "options": [
          "I don’t go",
          "I won’t go",
          "I didn’t go",
          "Don’t go!"
        ],
        "answer": 2,
        "explain": "لَمْ + present form with no final vowel refers to the past."
      },
      {
        "q": "Which word means “will not”?",
        "options": [
          "لَنْ",
          "مَا",
          "لَيْسَ",
          "لَا"
        ],
        "answer": 0,
        "explain": "لَنْ + present form negates the future: لَنْ أَنْسَاكَ."
      }
    ]
  },
  {
    "id": "polite-and-formal",
    "title": "Polite & formal Arabic",
    "level": "A2",
    "summary": "Greetings, thanks and requests that fit the situation — and how Arabic shows respect without a special polite “you”.",
    "sections": [
      {
        "heading": "Respect without a polite “you”",
        "body": "Arabic has no formal “you” like French vous: **أَنْتَ / أَنْتِ** is used with everyone, from a child to a minister. Respect is shown in other ways: with titles such as **أُسْتَاذ** (ʾustādh, literally “professor”, a polite “sir”) and **السَّيِّد / السَّيِّدَة** (Mr / Mrs) before a name; with **حَضْرَتُكَ / حَضْرَتُكِ** (ḥaḍratuka / ḥaḍratuki, “your presence”), a very respectful “you”; and with more formal words. In formal letters and speeches the plural (أَنْتُمْ, ـكُمْ) is sometimes used to address one important person. The word **يَا** comes before the name or title of the person you are speaking to.",
        "table": {
          "head": [
            "",
            "More formal",
            "Everyday"
          ],
          "rows": [
            [
              "hello",
              "السَّلَامُ عَلَيْكُمْ — as-salāmu ʿalaykum",
              "أَهْلًا — ʾahlan"
            ],
            [
              "how are you?",
              "كَيْفَ حَالُ حَضْرَتِكَ؟ — kayfa ḥālu ḥaḍratik",
              "كَيْفَ الْحَالُ؟ — kayfa l-ḥāl"
            ],
            [
              "I’d like…",
              "أَوَدُّ… — ʾawaddu",
              "أُرِيدُ… — ʾurīdu"
            ],
            [
              "thank you",
              "أَشْكُرُكَ جَزِيلَ الشُّكْرِ — ʾashkuruka jazīla sh-shukr",
              "شُكْرًا — shukran"
            ],
            [
              "sorry",
              "أَعْتَذِرُ — ʾaʿtadhir (I apologise)",
              "آسِف / آسِفَة — ʾāsif / ʾāsifa"
            ],
            [
              "goodbye",
              "إِلَى اللِّقَاءِ — ʾilā l-liqāʾ",
              "مَعَ السَّلَامَةِ — maʿa s-salāma"
            ]
          ]
        },
        "examples": [
          {
            "tr": "كَيْفَ حَالُ حَضْرَتِكَ؟",
            "en": "How are you, sir? (very respectful)",
            "tl": "kayfa ḥālu ḥaḍratik",
            "note": "ḥaḍratuka replaces a plain “you” with someone senior; to a woman: حَضْرَتِكِ."
          },
          {
            "tr": "شُكْرًا يَا أُسْتَاذُ.",
            "en": "Thank you, sir.",
            "tl": "shukran yā ʾustādh",
            "note": "يَا + title = addressing someone directly."
          }
        ]
      },
      {
        "heading": "Polite requests",
        "body": "Soften a request with **مِنْ فَضْلِكَ / مِنْ فَضْلِكِ** (please, to a man / woman) or **لَوْ سَمَحْتَ / لَوْ سَمَحْتِ** (“if you allow”, also used for “excuse me” to get attention). **هَلْ يُمْكِنُكَ أَنْ…؟** (could you…?) and **أَوَدُّ أَنْ…** (I would like to…) are more polite than a bare أُرِيدُ (I want). When offering something, inviting someone in or asking them to sit, say **تَفَضَّلْ** to a man and **تَفَضَّلِي** to a woman: “please, go ahead / here you are / come in”.",
        "examples": [
          {
            "tr": "لَوْ سَمَحْتَ، أَيْنَ الْمَحَطَّةُ؟",
            "en": "Excuse me, where is the station? (to a man)",
            "tl": "law samaḥt ʾayna l-maḥaṭṭa",
            "note": "To a woman: لَوْ سَمَحْتِ (law samaḥti)."
          },
          {
            "tr": "هَلْ يُمْكِنُكَ أَنْ تُسَاعِدَنِي؟",
            "en": "Could you help me? (to a man)",
            "tl": "hal yumkinuka ʾan tusāʿidanī",
            "note": "Literally “is it possible for you to help me?”"
          },
          {
            "tr": "أَوَدُّ أَنْ أَحْجِزَ غُرْفَةً، مِنْ فَضْلِكَ.",
            "en": "I would like to book a room, please.",
            "tl": "ʾawaddu ʾan ʾaḥjiza ghurfa min faḍlik",
            "note": "ʾawaddu ʾan… = I would like to…"
          },
          {
            "tr": "تَفَضَّلِي، اِجْلِسِي.",
            "en": "Please, have a seat. (to a woman)",
            "tl": "tafaḍḍalī ijlisī",
            "note": "To a man: تَفَضَّلْ، اِجْلِسْ (tafaḍḍal ijlis)."
          }
        ]
      },
      {
        "heading": "Set phrases and their replies",
        "body": "Social life in Arabic runs on fixed formulas, many with a fixed reply. Using them is the easiest way to sound polite. Phrases with **اللَّه** (God) are used by almost everyone, Muslim or Christian, religious or not.",
        "table": {
          "head": [
            "Phrase",
            "Meaning / when",
            "Reply"
          ],
          "rows": [
            [
              "السَّلَامُ عَلَيْكُمْ — as-salāmu ʿalaykum",
              "peace be upon you (greeting)",
              "وَعَلَيْكُمُ السَّلَامُ — wa-ʿalaykumu s-salām"
            ],
            [
              "صَبَاحُ الْخَيْرِ — ṣabāḥu l-khayr",
              "good morning",
              "صَبَاحُ النُّورِ — ṣabāḥu n-nūr"
            ],
            [
              "شُكْرًا — shukran",
              "thank you",
              "عَفْوًا — ʿafwan"
            ],
            [
              "تَشَرَّفْنَا — tasharrafnā",
              "nice to meet you",
              "الشَّرَفُ لِي — ash-sharafu lī (the honour is mine)"
            ],
            [
              "مَعَ السَّلَامَةِ — maʿa s-salāma",
              "goodbye",
              "فِي أَمَانِ اللَّهِ — fī ʾamāni llāh"
            ],
            [
              "إِنْ شَاءَ اللَّهُ — ʾin shāʾa llāh",
              "God willing: said about any future plan",
              "—"
            ],
            [
              "الْحَمْدُ لِلَّهِ — al-ḥamdu lillāh",
              "thank God: “I’m fine”, or after a meal",
              "—"
            ]
          ]
        }
      }
    ],
    "quiz": [
      {
        "q": "Does Arabic have a special polite “you”, like French vous?",
        "options": [
          "Yes: أَنْتِ",
          "Yes: هُوَ",
          "No — respect is shown with titles like حَضْرَتُكَ and polite phrases.",
          "Only in writing"
        ],
        "answer": 2,
        "explain": "أَنْتَ / أَنْتِ is used with everyone; titles and set phrases carry the politeness."
      },
      {
        "q": "What is the reply to صَبَاحُ الْخَيْرِ?",
        "options": [
          "صَبَاحُ النُّورِ",
          "مَعَ السَّلَامَةِ",
          "عَفْوًا",
          "إِنْ شَاءَ اللَّهُ"
        ],
        "answer": 0,
        "explain": "“Morning of goodness” is answered with “morning of light”: صَبَاحُ النُّورِ."
      },
      {
        "q": "Which is the most polite way to ask for a room at a hotel?",
        "options": [
          "أُرِيدُ غُرْفَةً.",
          "أَوَدُّ أَنْ أَحْجِزَ غُرْفَةً، مِنْ فَضْلِكَ.",
          "غُرْفَةً!",
          "أَحْجِزُ غُرْفَةً."
        ],
        "answer": 1,
        "explain": "أَوَدُّ أَنْ… (I would like to…) plus مِنْ فَضْلِكَ is the politest choice."
      },
      {
        "q": "You invite a woman to come in. What do you say?",
        "options": [
          "تَفَضَّلْ",
          "عَفْوًا",
          "لَا، شُكْرًا",
          "تَفَضَّلِي"
        ],
        "answer": 3,
        "explain": "تَفَضَّلِي is the form for a woman; تَفَضَّلْ is for a man."
      }
    ]
  },
  {
    "id": "future-and-wanting",
    "title": "The future & “want to, must, can”",
    "level": "A2",
    "summary": "Say what you will do with سَـ or سَوْفَ, and what you want to, have to or can do with أَنْ + the present tense.",
    "sections": [
      {
        "heading": "The future: سَـ and سَوْفَ",
        "body": "You have already met the future: **سَـ (sa-)** is written joined to a present-tense verb, and **سَوْفَ (sawfa)** is a separate word in front of it. Both mean “will” or “going to”: سَأُسَافِرُ = سَوْفَ أُسَافِرُ (I will travel). The verb itself stays exactly as in the present.\n\nThe negative does **not** use سَـ. “Will not” is **لَنْ (lan)** on its own, and the verb after it ends in **-a** instead of -u: سَأَذْهَبُ (I will go) → **لَنْ أَذْهَبَ** (I won’t go). People often add **إِنْ شَاءَ اللَّهُ** (God willing) when they talk about plans.",
        "examples": [
          {
            "tr": "سَأُسَافِرُ إِلَى مِصْرَ فِي الصَّيْفِ.",
            "tl": "sa-ʾusāfiru ʾilā miṣra fī ṣ-ṣayf",
            "en": "I’ll travel to Egypt in the summer.",
            "note": "sa- + ʾusāfiru (I travel)."
          },
          {
            "tr": "مَاذَا سَتَفْعَلُ غَدًا؟",
            "tl": "mādhā sa-tafʿalu ghadan",
            "en": "What will you do tomorrow? (to a man)",
            "note": "sa- + tafʿalu (you do); ghadan = tomorrow."
          },
          {
            "tr": "سَوْفَ أَتَّصِلُ بِكَ فِي الْمَسَاءِ.",
            "tl": "sawfa ʾattaṣilu bika fī l-masāʾ",
            "en": "I’ll call you in the evening. (to a man)",
            "note": "sawfa is a separate word; the verb is the ordinary present."
          },
          {
            "tr": "لَنْ أَتَأَخَّرَ غَدًا، إِنْ شَاءَ اللَّهُ.",
            "tl": "lan ʾataʾakhkhara ghadan ʾin shāʾa llāh",
            "en": "I won’t be late tomorrow, God willing.",
            "note": "lan + ʾataʾakhkhara: the verb ends in -a, and there is no sa-."
          }
        ]
      },
      {
        "heading": "“I want to…”: أُرِيدُ أَنْ",
        "body": "Arabic does not use a form like “to go” after “want”. It says “I want **that I go**”: **أُرِيدُ أَنْ أَذْهَبَ** (ʾurīdu ʾan ʾadhhaba). The little word **أَنْ (ʾan)** is followed by a present-tense verb with its own prefix, so both verbs show the person: تُرِيدُ أَنْ تَذْهَبَ (you want to go).\n\nAfter أَنْ the verb changes its ending slightly, just as after لَنْ: the final **-u becomes -a**, and -īna / -ūna lose their -na (تَذْهَبِينَ → تَذْهَبِي, يَذْهَبُونَ → يَذْهَبُوا, with a silent alif). Grammars call this form the **subjunctive**. The two verbs can have different subjects: أُرِيدُ أَنْ تَذْهَبَ مَعِي = I want you to go with me.",
        "table": {
          "head": [
            "Person",
            "Arabic",
            "Transliteration"
          ],
          "rows": [
            [
              "I want to go",
              "أُرِيدُ أَنْ أَذْهَبَ",
              "ʾurīdu ʾan ʾadhhaba"
            ],
            [
              "you want to go (man)",
              "تُرِيدُ أَنْ تَذْهَبَ",
              "turīdu ʾan tadhhaba"
            ],
            [
              "you want to go (woman)",
              "تُرِيدِينَ أَنْ تَذْهَبِي",
              "turīdīna ʾan tadhhabī"
            ],
            [
              "he wants to go",
              "يُرِيدُ أَنْ يَذْهَبَ",
              "yurīdu ʾan yadhhaba"
            ],
            [
              "we want to go",
              "نُرِيدُ أَنْ نَذْهَبَ",
              "nurīdu ʾan nadhhaba"
            ],
            [
              "they want to go",
              "يُرِيدُونَ أَنْ يَذْهَبُوا",
              "yurīdūna ʾan yadhhabū"
            ]
          ]
        },
        "examples": [
          {
            "tr": "أُرِيدُ أَنْ أَتَعَلَّمَ الْعَرَبِيَّةَ.",
            "tl": "ʾurīdu ʾan ʾataʿallama l-ʿarabiyya",
            "en": "I want to learn Arabic.",
            "note": "ʾataʿallamu → ʾataʿallama after ʾan."
          },
          {
            "tr": "هَلْ تُرِيدِينَ أَنْ تَشْرَبِي شَيْئًا؟",
            "tl": "hal turīdīna ʾan tashrabī shayʾan",
            "en": "Would you like something to drink? (to a woman)",
            "note": "tashrabīna loses its -na after ʾan: tashrabī."
          },
          {
            "tr": "نُرِيدُ أَنْ نَزُورَ الْأَهْرَامَ.",
            "tl": "nurīdu ʾan nazūra l-ʾahrām",
            "en": "We want to visit the pyramids.",
            "note": "Both verbs carry na- (we)."
          },
          {
            "tr": "لَا أُرِيدُ أَنْ أَذْهَبَ إِلَى الْعَمَلِ الْيَوْمَ.",
            "tl": "lā ʾurīdu ʾan ʾadhhaba ʾilā l-ʿamali l-yawm",
            "en": "I don’t want to go to work today.",
            "note": "lā negates ʾurīdu; the verb after ʾan stays as it is."
          }
        ]
      },
      {
        "heading": "Must and can: يَجِبُ أَنْ، يُمْكِنُ أَنْ",
        "body": "Two more words work with أَنْ. **يَجِبُ أَنْ (yajibu ʾan)** means “it is necessary that…” — must, have to. **يُمْكِنُ أَنْ (yumkinu ʾan)** means “it is possible that…” — can, may. Both keep this one form whoever you are talking about; only the verb after أَنْ changes: يَجِبُ أَنْ أَذْهَبَ (I must go), يَجِبُ أَنْ نَذْهَبَ (we must go).\n\nTo make clear who “can”, add an attached pronoun to يُمْكِنُ: **يُمْكِنُنِي** (yumkinunī, I can), **يُمْكِنُكَ / يُمْكِنُكِ** (you can), **يُمْكِنُنَا** (we can). “Can’t” is simply لَا يُمْكِنُ.",
        "examples": [
          {
            "tr": "يَجِبُ أَنْ أَذْهَبَ الْآنَ.",
            "tl": "yajibu ʾan ʾadhhaba l-ʾān",
            "en": "I have to go now.",
            "note": "yajibu never changes; ʾadhhaba shows that it is “I”."
          },
          {
            "tr": "يَجِبُ أَنْ تَشْرَبِي مَاءً كَثِيرًا.",
            "tl": "yajibu ʾan tashrabī māʾan kathīran",
            "en": "You must drink a lot of water. (to a woman)",
            "note": "The same yajibu; tashrabī is “you” to a woman."
          },
          {
            "tr": "هَلْ يُمْكِنُ أَنْ نَجْلِسَ هُنَا؟",
            "tl": "hal yumkinu ʾan najlisa hunā",
            "en": "Can we sit here?",
            "note": "Literally “is it possible that we sit here?”"
          },
          {
            "tr": "يُمْكِنُكَ أَنْ تَدْفَعَ بِالْبِطَاقَةِ.",
            "tl": "yumkinuka ʾan tadfaʿa bi-l-biṭāqa",
            "en": "You can pay by card. (to a man)",
            "note": "yumkinu + -ka = you can."
          },
          {
            "tr": "لَا يُمْكِنُنِي أَنْ أَنَامَ.",
            "tl": "lā yumkinunī ʾan ʾanām",
            "en": "I can’t sleep.",
            "note": "lā yumkinu = it isn’t possible; -nī = for me."
          }
        ]
      },
      {
        "heading": "In everyday Egyptian",
        "body": "Spoken Egyptian is simpler here: there is no أَنْ and no change of ending — the second verb is just the bare present. The future prefix is **هَـ (ha-)**, which you will also hear and see as حَـ (ḥa-): هَسَافِر (hasāfir, I’ll travel). “Want” is not a verb but a describing word that agrees, like an adjective, with the person who wants: **عَايِز** (ʿāyiz, a man), **عَايْزَة** (ʿayza, a woman), **عَايْزِين** (ʿayzīn, several people). “Must” is **لَازِم (lāzim)** and “can / may” is **مُمْكِن (mumkin)**; neither ever changes.",
        "examples": [
          {
            "tr": "هَشُوفَكْ بُكْرَة.",
            "tl": "hashūfak bukra",
            "en": "I’ll see you tomorrow. (to a man)",
            "note": "Egyptian: ha- + ʾashūf (I see) + -ak (you); bukra = tomorrow.",
            "dialect": "Egyptian"
          },
          {
            "tr": "عَايِزْ أَشْرَبْ شَايْ.",
            "tl": "ʿāyiz ʾashrab shāy",
            "en": "I want to drink tea. (man speaking)",
            "note": "Egyptian: nothing between the two words. A woman says عَايْزَة أَشْرَبْ شَايْ (ʿayza ʾashrab shāy).",
            "dialect": "Egyptian"
          },
          {
            "tr": "لَازِمْ أَمْشِي دِلْوَقْتِي.",
            "tl": "lāzim ʾamshi dilwaʾti",
            "en": "I have to go now.",
            "note": "Egyptian: lāzim + bare verb; ʾamshi = I go, I leave.",
            "dialect": "Egyptian"
          },
          {
            "tr": "مُمْكِنْ تِسَاعِدْنِي؟",
            "tl": "mumkin tisāʿidni",
            "en": "Can you help me? (to a man)",
            "note": "Egyptian: mumkin + bare verb also makes a polite request.",
            "dialect": "Egyptian"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “I want to go”?",
        "options": [
          "أُرِيدُ ذَهَبْتُ",
          "أُرِيدُ سَأَذْهَبُ",
          "أُرِيدُ أَنْ أَذْهَبَ",
          "أَنْ أُرِيدَ أَذْهَبُ"
        ],
        "answer": 2,
        "explain": "“Want” is followed by أَنْ + a present-tense verb ending in -a."
      },
      {
        "q": "What is the negative of سَأَذْهَبُ (I will go)?",
        "options": [
          "لَنْ أَذْهَبَ",
          "لَا سَأَذْهَبُ",
          "لَمْ أَذْهَبْ",
          "لَيْسَ أَذْهَبُ"
        ],
        "answer": 0,
        "explain": "“Will not” is لَنْ + a verb ending in -a, without سَـ. لَمْ أَذْهَبْ means “I didn’t go”."
      },
      {
        "q": "What does يَجِبُ أَنْ نَذْهَبَ mean?",
        "options": [
          "We can go.",
          "We want to go.",
          "We will go.",
          "We must go."
        ],
        "answer": 3,
        "explain": "يَجِبُ أَنْ = must; نَذْهَبَ shows that it is “we”."
      },
      {
        "q": "In Egyptian, which word means “must / have to”?",
        "options": [
          "عَايِز",
          "لَازِم",
          "مُمْكِن",
          "بُكْرَة"
        ],
        "answer": 1,
        "explain": "لَازِم (lāzim) = must; عَايِز = wanting, مُمْكِن = can / may, بُكْرَة = tomorrow."
      }
    ]
  },
  {
    "id": "commands-and-requests",
    "title": "Commands & requests",
    "level": "A2",
    "summary": "Tell someone to do something — or not to — with the right form for a man, a woman or a group, and soften it with “please”.",
    "sections": [
      {
        "heading": "Forming the command",
        "body": "A command is made from the “you” form of the present tense. Take off the prefix تَـ and the final vowel: تَكْتُبُ → كْتُب. An Arabic word can’t begin with two consonants, so a helping **alif** is added in front. It is read **u** if the vowel inside the verb is u — **اُكْتُبْ** (uktub, write!) — and **i** otherwise: **اِجْلِسْ** (ijlis, sit!), **اِذْهَبْ** (idhhab, go!). To a woman add **-ī**, to a group **-ū** (written with a silent alif).\n\nIf what is left already starts with a consonant and a vowel, no alif is needed: تَتَكَلَّمُ → **تَكَلَّمْ** (takallam, speak!), تَتَفَضَّلُ → **تَفَضَّلْ** (tafaḍḍal).",
        "table": {
          "head": [
            "Meaning",
            "To a man",
            "To a woman",
            "To a group"
          ],
          "rows": [
            [
              "write!",
              "اُكْتُبْ — uktub",
              "اُكْتُبِي — uktubī",
              "اُكْتُبُوا — uktubū"
            ],
            [
              "sit!",
              "اِجْلِسْ — ijlis",
              "اِجْلِسِي — ijlisī",
              "اِجْلِسُوا — ijlisū"
            ],
            [
              "go!",
              "اِذْهَبْ — idhhab",
              "اِذْهَبِي — idhhabī",
              "اِذْهَبُوا — idhhabū"
            ],
            [
              "go ahead, here you are",
              "تَفَضَّلْ — tafaḍḍal",
              "تَفَضَّلِي — tafaḍḍalī",
              "تَفَضَّلُوا — tafaḍḍalū"
            ]
          ]
        },
        "examples": [
          {
            "tr": "اُكْتُبْ عُنْوَانَكَ هُنَا.",
            "tl": "uktub ʿunwānaka hunā",
            "en": "Write your address here. (to a man)",
            "note": "taktubu → uktub: the vowel inside is u, so the helping alif is u too."
          },
          {
            "tr": "اِفْتَحِي الْبَابَ يَا سَارَةُ.",
            "tl": "iftaḥī l-bāba yā sāra",
            "en": "Open the door, Sara.",
            "note": "taftaḥu → iftaḥ, + -ī for a woman."
          },
          {
            "tr": "اِجْلِسُوا هُنَا.",
            "tl": "ijlisū hunā",
            "en": "Sit here. (to a group)",
            "note": "ijlis + -ū for several people."
          },
          {
            "tr": "تَكَلَّمْ بِبُطْءٍ، مِنْ فَضْلِكَ.",
            "tl": "takallam bi-buṭʾ min faḍlik",
            "en": "Speak slowly, please. (to a man)",
            "note": "tatakallamu → takallam: no helping alif is needed."
          },
          {
            "tr": "تَفَضَّلُوا، الْعَشَاءُ جَاهِزٌ.",
            "tl": "tafaḍḍalū al-ʿashāʾu jāhiz",
            "en": "Please come, dinner is ready. (to a group)",
            "note": "tafaḍḍal + -ū: the polite way to invite people in or to the table."
          }
        ]
      },
      {
        "heading": "Three short ones: خُذْ، كُلْ، تَعَالَ",
        "body": "A few of the most common commands are irregular. **أَخَذَ** (to take) and **أَكَلَ** (to eat) lose their first letter: **خُذْ** (khudh, take!) and **كُلْ** (kul, eat!). “Come!” is **تَعَالَ** (taʿāla), a word that is only used as a command. Watch its endings: the form for a woman ends in **-ay** and the form for a group in **-aw**.",
        "table": {
          "head": [
            "Meaning",
            "To a man",
            "To a woman",
            "To a group"
          ],
          "rows": [
            [
              "take!",
              "خُذْ — khudh",
              "خُذِي — khudhī",
              "خُذُوا — khudhū"
            ],
            [
              "eat!",
              "كُلْ — kul",
              "كُلِي — kulī",
              "كُلُوا — kulū"
            ],
            [
              "come!",
              "تَعَالَ — taʿāla",
              "تَعَالَيْ — taʿālay",
              "تَعَالَوْا — taʿālaw"
            ]
          ]
        },
        "examples": [
          {
            "tr": "خُذْ هَذَا الْكِتَابَ.",
            "tl": "khudh hādhā l-kitāb",
            "en": "Take this book. (to a man)",
            "note": "From ʾakhadha (to take): the first letter is dropped."
          },
          {
            "tr": "كُلِي شَيْئًا قَبْلَ الْمَدْرَسَةِ.",
            "tl": "kulī shayʾan qabla l-madrasa",
            "en": "Eat something before school. (to a girl or woman)",
            "note": "kul + -ī. Don’t confuse كُلْ (kul, eat!) with كُلّ (kull, every)."
          },
          {
            "tr": "تَعَالَ مَعَنَا إِلَى السُّوقِ.",
            "tl": "taʿāla maʿanā ʾilā s-sūq",
            "en": "Come with us to the market. (to a man)",
            "note": "taʿāla ends in -a even though it is a command."
          },
          {
            "tr": "تَعَالَوْا إِلَى هُنَا.",
            "tl": "taʿālaw ʾilā hunā",
            "en": "Come here. (to a group)",
            "note": "The group form ends in -aw; to a woman: تَعَالَيْ (taʿālay)."
          }
        ]
      },
      {
        "heading": "“Don’t!” and “please”",
        "body": "For “don’t”, Arabic does not use the command form. It uses **لَا** + the “you” form of the present with its **final vowel dropped** — the short form you met after لَمْ, which grammars call the **jussive**: **لَا تَذْهَبْ** (to a man), **لَا تَذْهَبِي** (to a woman), **لَا تَذْهَبُوا** (to a group). The prefix تَـ stays.\n\nA bare command can sound abrupt, so add a softener. Like the command, it changes with the person: **مِنْ فَضْلِكَ / مِنْ فَضْلِكِ / مِنْ فَضْلِكُمْ** (min faḍlika / faḍliki / faḍlikum, please) or **لَوْ سَمَحْتَ / لَوْ سَمَحْتِ / لَوْ سَمَحْتُمْ** (law samaḥta / samaḥti / samaḥtum, if you allow).",
        "examples": [
          {
            "tr": "لَا تَشْرَبْ هَذَا الْمَاءَ.",
            "tl": "lā tashrab hādhā l-māʾ",
            "en": "Don’t drink this water. (to a man)",
            "note": "lā + tashrab, with no final vowel. Compare لَا تَشْرَبُ (lā tashrabu), “you don’t drink”."
          },
          {
            "tr": "لَا تَتَأَخَّرِي يَا لَيْلَى.",
            "tl": "lā tataʾakhkharī yā laylā",
            "en": "Don’t be late, Layla.",
            "note": "To a woman: tataʾakhkharīna loses its -na."
          },
          {
            "tr": "لَا تَجْلِسُوا هُنَا، لَوْ سَمَحْتُمْ.",
            "tl": "lā tajlisū hunā law samaḥtum",
            "en": "Please don’t sit here. (to a group)",
            "note": "Both the verb and the softener are in the group form."
          },
          {
            "tr": "لَوْ سَمَحْتَ، اِنْتَظِرْ دَقِيقَةً.",
            "tl": "law samaḥt intaẓir daqīqa",
            "en": "Wait a minute, please. (to a man)",
            "note": "tantaẓiru → intaẓir (wait!). The softener can come first or last."
          }
        ]
      },
      {
        "heading": "Everyday Egyptian commands",
        "body": "Egyptian commands are built the same way, without the final vowels of careful Arabic, and some everyday ones sound a little different: **خُد** (khud, take), **تَعَالَى** (taʿāla, come; to a woman تَعَالِي, taʿāli), **اِسْتَنَّى** (istanna, wait), **اِتْفَضَّل** (itfaḍḍal, go ahead / here you are). “Don’t” wraps the “you” form in **ma-…-sh**: **مَتِقْلَقْش** (matiʾlaʾsh, don’t worry).",
        "examples": [
          {
            "tr": "تَعَالَى هِنَا.",
            "tl": "taʿāla hina",
            "en": "Come here. (to a man)",
            "note": "Egyptian: hina = here. To a woman: تَعَالِي هِنَا (taʿāli hina).",
            "dialect": "Egyptian"
          },
          {
            "tr": "خُدْ بَالَكْ.",
            "tl": "khud bālak",
            "en": "Be careful! / Watch out! (to a man)",
            "note": "Egyptian: literally “take your mind”; ذ is said d.",
            "dialect": "Egyptian"
          },
          {
            "tr": "اِسْتَنَّى شْوَيَّة.",
            "tl": "istanna shwayya",
            "en": "Wait a moment. (to a man)",
            "note": "Egyptian: shwayya = a little.",
            "dialect": "Egyptian"
          },
          {
            "tr": "مَتِقْلَقْشْ.",
            "tl": "matiʾlaʾsh",
            "en": "Don’t worry. (to a man)",
            "note": "Egyptian: ma- + tiʾlaʾ (you worry) + -sh.",
            "dialect": "Egyptian"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "You ask a woman to write something down. Which command do you use?",
        "options": [
          "اُكْتُبْ",
          "اُكْتُبُوا",
          "تَكْتُبِينَ",
          "اُكْتُبِي"
        ],
        "answer": 3,
        "explain": "The command to a woman adds -ī: uktubī. اُكْتُبْ is for a man, اُكْتُبُوا for a group."
      },
      {
        "q": "How do you tell a man “Don’t sit here”?",
        "options": [
          "لَا اِجْلِسْ هُنَا",
          "لَمْ تَجْلِسْ هُنَا",
          "لَا تَجْلِسْ هُنَا",
          "لَنْ تَجْلِسَ هُنَا"
        ],
        "answer": 2,
        "explain": "“Don’t” is لَا + the “you” form with no final vowel, never لَا + the command. لَمْ تَجْلِسْ = you didn’t sit; لَنْ تَجْلِسَ = you won’t sit."
      },
      {
        "q": "What does خُذْ mean?",
        "options": [
          "Take!",
          "Eat!",
          "Come!",
          "Sit!"
        ],
        "answer": 0,
        "explain": "خُذْ (khudh) is the short command of أَخَذَ, to take. “Eat!” is كُلْ."
      },
      {
        "q": "You call a group of friends over. What do you say?",
        "options": [
          "تَعَالَ",
          "تَعَالَوْا",
          "تَعَالَيْ",
          "تَفَضَّلِي"
        ],
        "answer": 1,
        "explain": "تَعَالَوْا (taʿālaw) is “come!” to a group; تَعَالَ is to a man and تَعَالَيْ to a woman."
      }
    ]
  },
  {
    "id": "was-and-had",
    "title": "Was, had & used to: كَانَ",
    "level": "A2",
    "summary": "Use كَانَ to say “was / were”, “I had” and “I used to” — and see why the word after it ends in -an.",
    "sections": [
      {
        "heading": "كَانَ — was / were",
        "body": "The present needs no “is”, but the past does: the verb **كَانَ (kāna)**. It takes the normal past endings, with one twist: before an ending that starts with a consonant, the long ā shrinks to a short **u** — **كُنْتُ** (kuntu, I was), not “kāntu”.\n\nA noun or adjective that describes the subject after كَانَ takes the ending **-an** (or -a with al-), exactly as after لَيْسَ: الْجَوُّ جَمِيلٌ (the weather is beautiful) → كَانَ الْجَوُّ **جَمِيلًا** (the weather was beautiful). Grammars call this the **accusative**. On a word ending in ة it is written ةً, with no extra alif. A phrase with a preposition doesn’t change: كُنْتُ فِي الْبَيْتِ (I was at home). For “was not”, put **مَا** in front: مَا كُنْتُ…",
        "table": {
          "head": [
            "Person",
            "Arabic",
            "Transliteration"
          ],
          "rows": [
            [
              "I was",
              "كُنْتُ",
              "kuntu"
            ],
            [
              "you were (man)",
              "كُنْتَ",
              "kunta"
            ],
            [
              "you were (woman)",
              "كُنْتِ",
              "kunti"
            ],
            [
              "he was",
              "كَانَ",
              "kāna"
            ],
            [
              "she was",
              "كَانَتْ",
              "kānat"
            ],
            [
              "we were",
              "كُنَّا",
              "kunnā"
            ],
            [
              "you were (plural)",
              "كُنْتُمْ",
              "kuntum"
            ],
            [
              "they were",
              "كَانُوا",
              "kānū"
            ]
          ]
        },
        "examples": [
          {
            "tr": "كَانَ الْجَوُّ جَمِيلًا أَمْسِ.",
            "tl": "kāna l-jawwu jamīlan ʾams",
            "en": "The weather was beautiful yesterday.",
            "note": "jamīlun → jamīlan after kāna."
          },
          {
            "tr": "كَانَتْ أُمِّي مُعَلِّمَةً فِي الْقَاهِرَةِ.",
            "tl": "kānat ʾummī muʿallimatan fī l-qāhira",
            "en": "My mother was a teacher in Cairo.",
            "note": "A feminine subject takes kānat; muʿallimatan is written with ةً."
          },
          {
            "tr": "أَيْنَ كُنْتَ أَمْسِ؟",
            "tl": "ʾayna kunta ʾams",
            "en": "Where were you yesterday? (to a man)",
            "note": "kunta = you were; to a woman: كُنْتِ (kunti)."
          },
          {
            "tr": "كَانُوا مَشْغُولِينَ جِدًّا.",
            "tl": "kānū mashghūlīna jiddan",
            "en": "They were very busy.",
            "note": "The plural ending -ūna becomes -īna after kāna."
          },
          {
            "tr": "مَا كُنْتُ فِي الْبَيْتِ.",
            "tl": "mā kuntu fī l-bayt",
            "en": "I wasn’t at home.",
            "note": "mā + past verb = was not; fī l-bayti does not change."
          }
        ]
      },
      {
        "heading": "“I had”: كَانَ عِنْدِي",
        "body": "“I have” is عِنْدِي — “at me (there is)”. For “I had”, simply put كَانَ in front: **كَانَ عِنْدِي** (kāna ʿindī), literally “there was at me”. To change the person, change the ending on عِنْدَ, not the verb: كَانَ عِنْدَكَ (you had), كَانَ عِنْدَهَا (she had), كَانَ عِنْدَنَا (we had).\n\nThe thing you had is the subject of كَانَ, so it keeps its ordinary ending **-un** — and when it is feminine, كَانَ usually becomes **كَانَتْ**: كَانَتْ عِنْدِي سَيَّارَةٌ (I had a car).",
        "examples": [
          {
            "tr": "كَانَ عِنْدِي كَلْبٌ صَغِيرٌ.",
            "tl": "kāna ʿindī kalbun ṣaghīr",
            "en": "I had a small dog.",
            "note": "kāna + ʿindī; kalbun keeps -un because it is the subject."
          },
          {
            "tr": "كَانَتْ عِنْدَنَا سَيَّارَةٌ قَدِيمَةٌ.",
            "tl": "kānat ʿindanā sayyāratun qadīma",
            "en": "We had an old car.",
            "note": "sayyāra is feminine, so kānat; -nā = we."
          },
          {
            "tr": "هَلْ كَانَ عِنْدَكَ وَقْتٌ أَمْسِ؟",
            "tl": "hal kāna ʿindaka waqtun ʾams",
            "en": "Did you have time yesterday? (to a man)",
            "note": "Only the ending on ʿinda shows who had it."
          },
          {
            "tr": "مَا كَانَ عِنْدَهَا هَاتِفٌ.",
            "tl": "mā kāna ʿindahā hātif",
            "en": "She didn’t have a phone.",
            "note": "mā kāna ʿinda… = didn’t have."
          }
        ]
      },
      {
        "heading": "“Used to” and “was doing”: كَانَ + present",
        "body": "Put كَانَ in front of a **present-tense** verb to describe something that went on for a while or happened regularly in the past: **كُنْتُ أَسْكُنُ** (kuntu ʾaskunu) = “I used to live” or “I was living”. Both verbs show the same person: كُنْتُ أَعْمَلُ (I used to work), كَانَ يَعْمَلُ (he used to work), كُنَّا نَعْمَلُ (we used to work). The present verb keeps its normal ending.\n\nCompare the plain past, which reports one finished event: سَكَنْتُ هُنَاكَ سَنَةً (I lived there for a year).",
        "examples": [
          {
            "tr": "كُنْتُ أَسْكُنُ فِي بَيْرُوتَ.",
            "tl": "kuntu ʾaskunu fī bayrūt",
            "en": "I used to live in Beirut.",
            "note": "kuntu + ʾaskunu, both in the “I” form."
          },
          {
            "tr": "كَانَ أَبِي يَعْمَلُ فِي بَنْكٍ.",
            "tl": "kāna ʾabī yaʿmalu fī bank",
            "en": "My father used to work in a bank.",
            "note": "kāna + yaʿmalu (he works)."
          },
          {
            "tr": "كُنَّا نَلْعَبُ كُرَةَ الْقَدَمِ كُلَّ يَوْمٍ.",
            "tl": "kunnā nalʿabu kurata l-qadami kulla yawm",
            "en": "We used to play football every day.",
            "note": "A regular habit in the past."
          },
          {
            "tr": "مَاذَا كُنْتِ تَفْعَلِينَ؟",
            "tl": "mādhā kunti tafʿalīn",
            "en": "What were you doing? (to a woman)",
            "note": "kunti + tafʿalīna: something in progress."
          },
          {
            "tr": "كَانَتْ تَدْرُسُ عِنْدَمَا وَصَلْتُ.",
            "tl": "kānat tadrusu ʿindamā waṣalt",
            "en": "She was studying when I arrived.",
            "note": "kānat tadrusu = was studying; waṣaltu (plain past) = one finished event."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “I was”?",
        "options": [
          "كَانَ",
          "كُنَّا",
          "كَانَتْ",
          "كُنْتُ"
        ],
        "answer": 3,
        "explain": "With the ending -tu the long ā of كَانَ becomes u: kuntu. كُنَّا is “we were”."
      },
      {
        "q": "Complete “The weather was cold”: كَانَ الْجَوُّ ___",
        "options": [
          "بَارِدًا",
          "بَارِدٌ",
          "بَارِدٍ",
          "الْبَارِدُ"
        ],
        "answer": 0,
        "explain": "A description after كَانَ takes the ending -an: bāridan."
      },
      {
        "q": "How do you say “We had a house”?",
        "options": [
          "عِنْدَنَا بَيْتٌ",
          "كَانَ عِنْدَنَا بَيْتٌ",
          "كُنَّا بَيْتًا",
          "كَانَ عِنْدِي بَيْتٌ"
        ],
        "answer": 1,
        "explain": "كَانَ + عِنْدَنَا = we had. Without كَانَ it means “we have”, and كُنَّا بَيْتًا would be “we were a house”."
      },
      {
        "q": "What does كُنْتُ أَعْمَلُ فِي مَطْعَمٍ mean?",
        "options": [
          "I work in a restaurant.",
          "I will work in a restaurant.",
          "I used to work in a restaurant.",
          "I want to work in a restaurant."
        ],
        "answer": 2,
        "explain": "كَانَ + a present-tense verb describes a habit or an ongoing action in the past."
      }
    ]
  },
  {
    "id": "comparing",
    "title": "Comparing: bigger, biggest, more",
    "level": "B1",
    "summary": "Turn كَبِير into أَكْبَر to say “bigger than” and “the biggest”, and use أَكْثَر and أَقَلّ for “more” and “less”.",
    "sections": [
      {
        "heading": "Bigger than: the pattern أَفْعَل",
        "body": "To compare, Arabic recasts the adjective in the pattern **أَفْعَل (ʾafʿal)**: put **أَ** in front of its three root consonants and an **a** before the last one — كَبِير (k-b-r) → **أَكْبَر** (ʾakbar, bigger). “Than” is **مِنْ**. This form stays the same for masculine, feminine and plural, and it never takes tanwīn: أَكْبَرُ, not “ʾakbarun”.\n\nTwo small variations: when the last two consonants are the same they merge, as in قَلِيل → **أَقَلّ** (ʾaqall, less); and adjectives ending in a weak letter end in -ā, as in غَالٍ (expensive) → **أَغْلَى** (ʾaghlā). “Better” is **أَحْسَن** (ʾaḥsan) or **أَفْضَل** (ʾafḍal).",
        "table": {
          "head": [
            "Adjective",
            "Comparative",
            "Meaning"
          ],
          "rows": [
            [
              "كَبِير — kabīr",
              "أَكْبَر — ʾakbar",
              "bigger, older"
            ],
            [
              "صَغِير — ṣaghīr",
              "أَصْغَر — ʾaṣghar",
              "smaller, younger"
            ],
            [
              "جَمِيل — jamīl",
              "أَجْمَل — ʾajmal",
              "more beautiful"
            ],
            [
              "طَوِيل — ṭawīl",
              "أَطْوَل — ʾaṭwal",
              "longer, taller"
            ],
            [
              "قَرِيب — qarīb",
              "أَقْرَب — ʾaqrab",
              "nearer"
            ],
            [
              "كَثِير — kathīr",
              "أَكْثَر — ʾakthar",
              "more"
            ],
            [
              "قَلِيل — qalīl",
              "أَقَلّ — ʾaqall",
              "less, fewer"
            ]
          ]
        },
        "examples": [
          {
            "tr": "الْقَاهِرَةُ أَكْبَرُ مِنَ الْإِسْكَنْدَرِيَّةِ.",
            "tl": "al-qāhiratu ʾakbaru mina l-ʾiskandariyya",
            "en": "Cairo is bigger than Alexandria.",
            "note": "ʾakbar + min (than); no feminine ending, although Cairo is feminine."
          },
          {
            "tr": "أَخِي أَصْغَرُ مِنِّي.",
            "tl": "ʾakhī ʾaṣgharu minnī",
            "en": "My brother is younger than me.",
            "note": "min + -ī = minnī (than me)."
          },
          {
            "tr": "أُخْتِي أَطْوَلُ مِنْ أُمِّي.",
            "tl": "ʾukhtī ʾaṭwalu min ʾummī",
            "en": "My sister is taller than my mother.",
            "note": "ṭawīl → ʾaṭwal, the same form for a woman."
          },
          {
            "tr": "الْقِطَارُ أَسْرَعُ مِنَ الْحَافِلَةِ.",
            "tl": "al-qiṭāru ʾasraʿu mina l-ḥāfila",
            "en": "The train is faster than the bus.",
            "note": "sarīʿ (fast) → ʾasraʿ."
          },
          {
            "tr": "هَذَا الْفُنْدُقُ أَحْسَنُ مِنْ ذَلِكَ.",
            "tl": "hādhā l-funduqu ʾaḥsanu min dhālik",
            "en": "This hotel is better than that one.",
            "note": "ʾaḥsan = better."
          }
        ]
      },
      {
        "heading": "The biggest: superlatives",
        "body": "The same word also means “the biggest”. The usual way is to put it **in front of a singular noun with no al-**, as an iḍāfa: **أَكْبَرُ مَدِينَةٍ** (ʾakbaru madīna) = the biggest city. The noun takes the ending -in, and although nothing has al-, the meaning is definite. Before a plural noun with al- it means “the biggest of…”: أَكْبَرُ الْمُدُنِ (the biggest of the cities).\n\nWith al-, **الْأَكْبَر** follows a definite noun like an ordinary adjective, or stands alone: أَخِي الْأَكْبَرُ (my eldest brother), هُوَ الْأَكْبَرُ (he is the biggest / the eldest). In this use a few common words have a feminine form — **الْكُبْرَى** (al-kubrā) and **الصُّغْرَى** (aṣ-ṣughrā): أُخْتِي الْكُبْرَى (my eldest sister).",
        "examples": [
          {
            "tr": "الْقَاهِرَةُ أَكْبَرُ مَدِينَةٍ فِي مِصْرَ.",
            "tl": "al-qāhiratu ʾakbaru madīnatin fī miṣr",
            "en": "Cairo is the biggest city in Egypt.",
            "note": "ʾakbaru + madīnatin (singular, no al-) = the biggest city."
          },
          {
            "tr": "هَذَا أَجْمَلُ مَكَانٍ فِي الْعَالَمِ.",
            "tl": "hādhā ʾajmalu makānin fī l-ʿālam",
            "en": "This is the most beautiful place in the world.",
            "note": "jamīl → ʾajmal; fī l-ʿālam = in the world."
          },
          {
            "tr": "أَيْنَ أَقْرَبُ صَيْدَلِيَّةٍ؟",
            "tl": "ʾayna ʾaqrabu ṣaydaliyya",
            "en": "Where is the nearest pharmacy?",
            "note": "qarīb → ʾaqrab; ʾaqrabu ṣaydaliyyatin = the nearest pharmacy."
          },
          {
            "tr": "أَخِي الْأَكْبَرُ يَسْكُنُ فِي عَمَّانَ.",
            "tl": "ʾakhī l-ʾakbaru yaskunu fī ʿammān",
            "en": "My eldest brother lives in Amman.",
            "note": "With al-, after the noun, like an ordinary adjective."
          },
          {
            "tr": "أُخْتِي الصُّغْرَى طَالِبَةٌ.",
            "tl": "ʾukhtī ṣ-ṣughrā ṭāliba",
            "en": "My youngest sister is a student.",
            "note": "aṣ-ṣughrā is the feminine of al-ʾaṣghar."
          }
        ]
      },
      {
        "heading": "More and less: أَكْثَر، أَقَلّ",
        "body": "Not every adjective fits the pattern — long ones such as مُفِيد (useful) or مُزْدَحِم (crowded) don’t — and the pattern cannot say “less”. Instead, use **أَكْثَر** (more) or **أَقَلّ** (less) followed by a noun for the quality, ending in **-an**: **أَكْثَرُ فَائِدَةً** (ʾaktharu fāʾidatan, “more in usefulness” = more useful), **أَقَلُّ أَهَمِّيَّةً** (ʾaqallu ʾahammiyyatan, less important).\n\nFor more or less **of something**, put أَكْثَر / أَقَلّ after the noun, like an adjective: وَقْتٌ أَكْثَرُ (more time), سُكَّرٌ أَقَلُّ (less sugar). Before a number or an amount, say **أَكْثَرُ مِنْ** (more than) or **أَقَلُّ مِنْ** (less than).",
        "examples": [
          {
            "tr": "الْقَرْيَةُ أَكْثَرُ هُدُوءًا مِنَ الْمَدِينَةِ.",
            "tl": "al-qaryatu ʾaktharu hudūʾan mina l-madīna",
            "en": "The village is quieter than the city.",
            "note": "ʾakthar + hudūʾan (calm): “more in calm”."
          },
          {
            "tr": "الْمَالُ أَقَلُّ أَهَمِّيَّةً مِنَ الصِّحَّةِ.",
            "tl": "al-mālu ʾaqallu ʾahammiyyatan mina ṣ-ṣiḥḥa",
            "en": "Money is less important than health.",
            "note": "ʾaqall + ʾahammiyyatan (importance) = less important."
          },
          {
            "tr": "عِنْدِي الْيَوْمَ وَقْتٌ أَكْثَرُ.",
            "tl": "ʿindī l-yawma waqtun ʾakthar",
            "en": "I have more time today.",
            "note": "ʾakthar follows the noun: waqtun ʾaktharu = more time."
          },
          {
            "tr": "أُرِيدُ سُكَّرًا أَقَلَّ، مِنْ فَضْلِكَ.",
            "tl": "ʾurīdu sukkaran ʾaqall min faḍlik",
            "en": "I’d like less sugar, please.",
            "note": "sukkaran ʾaqalla = less sugar."
          },
          {
            "tr": "اِنْتَظَرْنَا أَكْثَرَ مِنْ سَاعَةٍ.",
            "tl": "intaẓarnā ʾakthara min sāʿa",
            "en": "We waited for more than an hour.",
            "note": "ʾakthar min + an amount = more than."
          }
        ]
      },
      {
        "heading": "In everyday Egyptian",
        "body": "Egyptians compare in the same way, minus the endings: **أَكْبَر مِنْ** (ʾakbar min, bigger than), **أَحْسَن** (ʾaḥsan, the everyday word for “better” and “best”). Because ث is said t and ق is a glottal stop, “more” is **أَكْتَر (ʾaktar)** and “less” is **أَقَلّ (ʾaʾall)**. With long adjectives, Egyptians simply put أَكْتَر after the adjective: **مُهِمّ أَكْتَر** (muhimm ʾaktar, more important).",
        "examples": [
          {
            "tr": "أَنَا أَكْبَرْ مِنَّكْ.",
            "tl": "ʾana ʾakbar minnak",
            "en": "I’m older than you. (to a man)",
            "note": "Egyptian: minnak = than you; no case endings.",
            "dialect": "Egyptian"
          },
          {
            "tr": "دَه أَحْسَنْ مَطْعَمْ هِنَا.",
            "tl": "da ʾaḥsan maṭʿam hina",
            "en": "This is the best restaurant here.",
            "note": "Egyptian: da = this; ʾaḥsan + noun = the best.",
            "dialect": "Egyptian"
          },
          {
            "tr": "عَايِزْ وَقْتْ أَكْتَرْ.",
            "tl": "ʿāyiz waʾt ʾaktar",
            "en": "I want more time. (man speaking)",
            "note": "Egyptian: waʾt = MSA waqt; ʾaktar = MSA ʾakthar.",
            "dialect": "Egyptian"
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which word means “bigger”?",
        "options": [
          "كَبِيرَة",
          "أَكْثَر",
          "كَبِيرٌ جِدًّا",
          "أَكْبَر"
        ],
        "answer": 3,
        "explain": "كَبِير → أَكْبَر on the pattern أَفْعَل. أَكْثَر means “more”, and كَبِيرٌ جِدًّا is “very big”."
      },
      {
        "q": "How do you say “My sister is taller than me”?",
        "options": [
          "أُخْتِي أَطْوَلُ مِنِّي",
          "أُخْتِي أَطْوَلَةٌ مِنِّي",
          "أُخْتِي أَطْوَلُ أَنَا",
          "أُخْتِي طَوِيلَةٌ جِدًّا"
        ],
        "answer": 0,
        "explain": "The comparative takes no ة for a woman, and “than” is مِنْ: ʾaṭwalu minnī."
      },
      {
        "q": "What does أَكْبَرُ مَدِينَةٍ فِي الْعَالَمِ mean?",
        "options": [
          "a city bigger than the world",
          "the biggest city in the world",
          "The city is big in the world.",
          "the big cities of the world"
        ],
        "answer": 1,
        "explain": "أَفْعَل in front of a singular noun without al- is the superlative: “the biggest city”."
      },
      {
        "q": "What does أَقَلُّ أَهَمِّيَّةً mean?",
        "options": [
          "more important",
          "the most important",
          "less important",
          "not important"
        ],
        "answer": 2,
        "explain": "أَقَلّ (less) + a noun in -an: “less in importance”."
      }
    ]
  },
  {
    "id": "msa-vs-egyptian",
    "title": "Spoken Arabic: MSA vs Egyptian",
    "level": "B1",
    "summary": "What you hear on the street in Cairo differs from the written standard — here are the key differences, side by side.",
    "sections": [
      {
        "heading": "Standard and spoken Arabic",
        "body": "Arabs read, write and hear the news in **Modern Standard Arabic (MSA, fuṣḥā)** — the Arabic of this course. At home and on the street everyone speaks a local **dialect** (ʿāmmiyya). **Egyptian Arabic** is the most widely understood, thanks to Egyptian films, TV and music. Dialects drop the case endings, simplify the grammar and use some different everyday words — but MSA is understood everywhere.\n\nIn Cairo **ق** is usually a glottal stop (قَلْب qalb → **ʾalb**, heart), **ج** is a hard g (جَمِيل jamīl → **gamīl**, beautiful), and **ث** often becomes t (ثَلَاثَة thalātha → **talāta**, three). The article is pronounced **il-**: il-bēt, the house.",
        "table": {
          "head": [
            "English",
            "MSA",
            "Egyptian"
          ],
          "rows": [
            [
              "I",
              "أَنَا — ʾanā",
              "أَنَا — ʾana"
            ],
            [
              "you (man)",
              "أَنْتَ — ʾanta",
              "إِنْتَ — ʾinta"
            ],
            [
              "you (woman)",
              "أَنْتِ — ʾanti",
              "إِنْتِي — ʾinti"
            ],
            [
              "he",
              "هُوَ — huwa",
              "هُوَّ — huwwa"
            ],
            [
              "she",
              "هِيَ — hiya",
              "هِيَّ — hiyya"
            ],
            [
              "we",
              "نَحْنُ — naḥnu",
              "إِحْنَا — ʾiḥna"
            ],
            [
              "you (plural)",
              "أَنْتُمْ — ʾantum",
              "إِنْتُوا — ʾintu"
            ],
            [
              "they",
              "هُمْ — hum",
              "هُمَّ — humma"
            ]
          ]
        },
        "examples": [
          {
            "tr": "كَيْفَ الْحَالُ؟",
            "en": "How are you? / How’s it going?",
            "tl": "kayfa l-ḥāl",
            "note": "MSA: literally “how is the state?”, so it suits anyone."
          },
          {
            "tr": "إِزَّيّ الْحَالْ؟",
            "en": "How are you? / How’s it going?",
            "tl": "ʾizzayy il-ḥāl",
            "note": "Egyptian. To one person: إِزَّيَّكْ؟ (ʾizzayyak) to a man, إِزَّيِّكْ؟ (ʾizzayyik) to a woman."
          }
        ]
      },
      {
        "heading": "Question words — often at the end",
        "body": "Egyptian question words are different, and they often sit at the **end** of the sentence, where the answer would go: “the station where?”, “you want what?”. Egyptians also say **عَايِز / عَايْزَة** (ʿāyiz / ʿayza, wanting, for a man / woman) instead of a verb for “want”.",
        "table": {
          "head": [
            "English",
            "MSA",
            "Egyptian"
          ],
          "rows": [
            [
              "what?",
              "مَاذَا / مَا — mādhā / mā",
              "إِيه — ʾēh"
            ],
            [
              "how?",
              "كَيْفَ — kayfa",
              "إِزَّاي — ʾizzāy"
            ],
            [
              "where?",
              "أَيْنَ — ʾayna",
              "فِين — fēn"
            ],
            [
              "when?",
              "مَتَى — matā",
              "إِمْتَى — ʾimta"
            ],
            [
              "why?",
              "لِمَاذَا — limādhā",
              "لِيه — lēh"
            ],
            [
              "who?",
              "مَنْ — man",
              "مِين — mīn"
            ],
            [
              "how much? (price)",
              "بِكَمْ — bikam",
              "بِكَام — bikām"
            ],
            [
              "now",
              "الْآنَ — al-ʾān",
              "دِلْوَقْتِي — dilwaʾti"
            ],
            [
              "there is",
              "يُوجَدُ — yūjad",
              "فِيه — fīh"
            ]
          ]
        },
        "examples": [
          {
            "tr": "أَيْنَ الْمَحَطَّةُ؟",
            "en": "Where is the station?",
            "tl": "ʾayna l-maḥaṭṭa",
            "note": "MSA: question word first."
          },
          {
            "tr": "الْمَحَطَّة فِينْ؟",
            "en": "Where is the station?",
            "tl": "il-maḥaṭṭa fēn",
            "note": "Egyptian: article il-, question word at the end."
          },
          {
            "tr": "مَاذَا تُرِيدُ؟",
            "en": "What do you want? (to a man)",
            "tl": "mādhā turīd",
            "note": "MSA."
          },
          {
            "tr": "إِنْتَ عَايِزْ إِيهْ؟",
            "en": "What do you want? (to a man)",
            "tl": "ʾinta ʿāyiz ʾēh",
            "note": "Egyptian: literally “you wanting what?”"
          }
        ]
      },
      {
        "heading": "Verbs: b- for now, ḥa- for later",
        "body": "Egyptian verbs drop the final short vowel of MSA, shorten -īna / -ūna to -i / -u (tiktibi, you write, to a woman; yiktibu, they write), and often use i instead of a in the prefix (yiktib for yaktubu). For something happening now or regularly, add **b-**: **baktib**, I write / I’m writing. For the future, add **ḥa-** instead of sa-: **ḥaktib**, I’ll write — it is also said and written **ha-** (هـ). Without b- or ḥa-, the plain verb follows words like “want”: ʿāyiz ʾaktib, I want to write.",
        "table": {
          "head": [
            "English",
            "MSA",
            "Egyptian"
          ],
          "rows": [
            [
              "I write",
              "أَكْتُبُ — ʾaktubu",
              "بَكْتِبْ — baktib"
            ],
            [
              "you write (man)",
              "تَكْتُبُ — taktubu",
              "بِتِكْتِبْ — bitiktib"
            ],
            [
              "he writes",
              "يَكْتُبُ — yaktubu",
              "بِيِكْتِبْ — biyiktib"
            ],
            [
              "we write",
              "نَكْتُبُ — naktubu",
              "بِنِكْتِبْ — biniktib"
            ],
            [
              "I will write",
              "سَأَكْتُبُ — sa-ʾaktubu",
              "حَكْتِبْ — ḥaktib"
            ]
          ]
        },
        "examples": [
          {
            "tr": "أَعْمَلُ فِي بَنْكٍ.",
            "en": "I work in a bank.",
            "tl": "ʾaʿmalu fī bank",
            "note": "MSA."
          },
          {
            "tr": "بَشْتَغَلْ فِي بَنْكْ.",
            "en": "I work in a bank.",
            "tl": "bashtaghal fi bank",
            "note": "Egyptian: b- + ʾashtaghal (I work)."
          },
          {
            "tr": "سَأُسَافِرُ غَدًا.",
            "en": "I’ll travel tomorrow.",
            "tl": "sa-ʾusāfiru ghadan",
            "note": "MSA."
          },
          {
            "tr": "حَسَافِرْ بُكْرَة.",
            "en": "I’ll travel tomorrow.",
            "tl": "ḥasāfir bukra",
            "note": "Egyptian: ḥa- = will; bukra = tomorrow."
          }
        ]
      },
      {
        "heading": "“Not”: mish and ma-…-sh",
        "body": "Egyptian replaces لَا، لَمْ، لَنْ and لَيْسَ with two patterns. **مِشْ (mish)** goes before adjectives, nouns, participles and the future: **mish fāhim** (I don’t understand — literally “not understanding”), **mish ḥaʾdar** (I won’t be able to). Ordinary present and past verbs are wrapped in **ma-…-sh**: **maʿrafsh** (I don’t know), **mafhimtish** (I didn’t understand).",
        "examples": [
          {
            "tr": "لَا أَفْهَمُ السُّؤَالَ.",
            "en": "I don’t understand the question.",
            "tl": "lā ʾafhamu s-suʾāl",
            "note": "MSA."
          },
          {
            "tr": "مِشْ فَاهِمْ السُّؤَالْ.",
            "en": "I don’t understand the question. (man speaking)",
            "tl": "mish fāhim is-suʾāl",
            "note": "Egyptian: mish + participle. A woman says مِشْ فَاهْمَة السُّؤَالْ (mish fahma s-suʾāl)."
          },
          {
            "tr": "لَا أَعْرِفُ.",
            "en": "I don’t know.",
            "tl": "lā ʾaʿrif",
            "note": "MSA."
          },
          {
            "tr": "مَعْرَفْشْ.",
            "en": "I don’t know.",
            "tl": "maʿrafsh",
            "note": "Egyptian: ma- + ʾaʿraf (I know) + -sh."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do Egyptians usually say “where?”",
        "options": [
          "أَيْنَ",
          "فِين",
          "إِمْتَى",
          "لِيه"
        ],
        "answer": 1,
        "explain": "Egyptian فِين (fēn) = MSA أَيْنَ (ʾayna)."
      },
      {
        "q": "In Egyptian بِيِكْتِبْ (biyiktib), what does the b- show?",
        "options": [
          "the past",
          "the future",
          "a question",
          "something happening now or regularly"
        ],
        "answer": 3,
        "explain": "b- marks the ongoing or habitual present; ḥa- marks the future."
      },
      {
        "q": "Which is Egyptian for “I don’t understand” (man speaking)?",
        "options": [
          "مِشْ فَاهِمْ",
          "لَا أَفْهَمُ",
          "لَمْ أَفْهَمْ",
          "لَسْتُ فَاهِمًا"
        ],
        "answer": 0,
        "explain": "Egyptian uses مِشْ (mish) before participles like fāhim."
      },
      {
        "q": "How is قَلْب (heart) usually pronounced in Cairo?",
        "options": [
          "qalb",
          "galb",
          "ʾalb",
          "kalb"
        ],
        "answer": 2,
        "explain": "Cairenes pronounce ق as a glottal stop: ʾalb."
      }
    ]
  }
];
