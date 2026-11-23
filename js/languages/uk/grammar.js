// Grammar lessons (explanations, tables, examples, quiz). Written and proofread
// with AI assistance; not yet reviewed by native speakers. Edit freely.
export const lessons = [
  {
    "id": "sounds-and-spelling",
    "title": "Soft sign, apostrophe and sound changes",
    "level": "A1",
    "summary": "A quick recap of the spelling signs that matter for grammar, and the sound change you meet as soon as words take endings.",
    "sections": [
      {
        "heading": "The soft sign ь",
        "body": "The **soft sign ь** has no sound of its own. It softens the consonant in front of it: the middle of the tongue rises toward the roof of the mouth, as if a tiny “y” were starting. Softness can change meaning: **рис** is rice, **рись** is a lynx.\n\nFor grammar, ь is a signal. Nouns ending in a soft consonant take “soft” endings (**вчитель → вчителі**, **день → дні**), and the verb ending **-ть** always carries it: **він говорить**, **вони читають**.",
        "examples": [
          {
            "tr": "Який сьогодні день?",
            "en": "What day is it today?",
            "note": "In сьогодні and день, ь softens с and н but makes no sound of its own."
          },
          {
            "tr": "Передай, будь ласка, сіль.",
            "en": "Pass the salt, please.",
            "note": "будь and сіль both end in a soft consonant."
          }
        ]
      },
      {
        "heading": "я, ю, є, ї and the apostrophe",
        "body": "The letters **я, ю, є** have two jobs. After a consonant they soften it and add a vowel: **дякую** starts with a soft д + “a”. At the start of a word, after a vowel or after an apostrophe they give a real “y” sound: **яблуко** is “ya-bloo-ko”, **моя** is “mo-ya”. The letter **ї** is always “yi”.\n\nThe **apostrophe ’** comes before **я, ю, є, ї**: after **б, п, в, м, ф** (**п’ять**, **сім’я**; but not when a consonant other than **р** comes right before them in the same root: **свято**, **цвях**), after **р** at the end of a syllable (**пір’я**, feathers) and after prefixes such as **з-** (**з’їсти**, to eat up). It means: keep the consonant hard and say a separate “y”. So **п’ять** is “p-yat”, with a hard п. When typing, ' and ’ are both fine.",
        "table": {
          "head": [
            "Letter",
            "After a consonant",
            "Elsewhere"
          ],
          "rows": [
            [
              "я",
              "softens it: **дякую**, **земля**",
              "“ya”: **яблуко**, **моя**, **п’ять**"
            ],
            [
              "ю",
              "softens it: **люблю**",
              "“yu”: **юнак**, **дякую**"
            ],
            [
              "є",
              "softens it: **синє**",
              "“ye”: **Європа**, **моє**"
            ],
            [
              "ї",
              "never directly (only with ’ in between)",
              "“yi”: **їсти**, **Київ**, **з’їсти**"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Це моя сім’я.",
            "en": "This is my family.",
            "note": "сім’я: the apostrophe keeps м hard, so it’s “seem-ya”."
          },
          {
            "tr": "Ще п’ять хвилин!",
            "en": "Five more minutes!",
            "note": "п’ять: a hard п, then a clear “ya”."
          }
        ]
      },
      {
        "heading": "і that turns back into о or е",
        "body": "Many words have **і** in their last syllable only because a consonant closes that syllable. When an ending is added and the syllable opens up, the original **о** or **е** comes back: **кіт → кота**, **вечір → до вечора**. This explains many “surprising” forms in the lessons that follow.\n\nNot every word does it (**хліб → хліба**, **ліс → у лісі**), so when you meet a new noun with і, check its other forms in a dictionary.",
        "table": {
          "head": [
            "Basic form",
            "With an ending",
            "Meaning"
          ],
          "rows": [
            [
              "кіт",
              "коти, кота",
              "cat"
            ],
            [
              "стіл",
              "на столі",
              "table"
            ],
            [
              "вечір",
              "до вечора",
              "evening"
            ],
            [
              "рік",
              "два роки",
              "year"
            ],
            [
              "ніч",
              "дві ночі",
              "night"
            ],
            [
              "дім",
              "додому",
              "home"
            ],
            [
              "Львів",
              "у Львові",
              "Lviv"
            ],
            [
              "Київ",
              "у Києві (ї → є)",
              "Kyiv"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Кіт спить на столі.",
            "en": "The cat is sleeping on the table.",
            "note": "стіл → на столі: і becomes о once an ending is added."
          },
          {
            "tr": "Я йду додому.",
            "en": "I’m going home.",
            "note": "дім → додому."
          },
          {
            "tr": "Ми живемо у Львові.",
            "en": "We live in Lviv.",
            "note": "Львів → у Львові."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What sound does the soft sign **ь** make on its own?",
        "options": [
          "None: it only softens the consonant before it",
          "A short “i”",
          "A “y” sound",
          "It makes the vowel longer"
        ],
        "answer": 0,
        "explain": "ь is silent; it changes how the consonant in front of it is pronounced."
      },
      {
        "q": "Why is there an apostrophe in **п’ять** (five)?",
        "options": [
          "It marks the stress",
          "It keeps п hard and adds a separate “y”",
          "It shows a missing letter",
          "It makes п soft"
        ],
        "answer": 1,
        "explain": "The apostrophe stops п from softening, so я is read as a full “ya”."
      },
      {
        "q": "The word for cat is **кіт**. Which form would you expect when an ending is added?",
        "options": [
          "кіта",
          "кета",
          "кота",
          "кута"
        ],
        "answer": 2,
        "explain": "і in the last syllable often turns back into о: кіт → кота, коти."
      },
      {
        "q": "How is **я** pronounced in **моя** (my)?",
        "options": [
          "As “a”, softening the consonant before it",
          "As “ya”, because it follows a vowel",
          "As “ee”",
          "It is silent"
        ],
        "answer": 1,
        "explain": "After a vowel, я stands for two sounds: “y” + “a”."
      }
    ]
  },
  {
    "id": "noun-gender",
    "title": "Masculine, feminine, neuter",
    "level": "A1",
    "summary": "Every noun has a gender, you can usually tell it from the last letter, and adjectives and “my, your” have to match it.",
    "sections": [
      {
        "heading": "Look at the last letter",
        "body": "Every noun is **masculine**, **feminine** or **neuter**. For things, gender is purely grammatical (a table is masculine, a window is neuter), but the dictionary form usually gives it away.\n\nA few nouns break the pattern: words for men are masculine whatever their ending (**тато**, **дядько**, uncle); nouns in **-ь** can be either gender, so learn them with the word; and abstract nouns in **-ість** are feminine (**радість**, joy; but **гість**, guest, is masculine). Gender also decides the pronoun: a phone is **він**, a book is **вона**, a window is **воно**.",
        "table": {
          "head": [
            "Gender",
            "Usually ends in",
            "Examples"
          ],
          "rows": [
            [
              "Masculine",
              "a consonant or -й",
              "брат, стіл, телефон, чай"
            ],
            [
              "Feminine",
              "-а, -я",
              "мама, вода, кухня, Україна"
            ],
            [
              "Neuter",
              "-о, -е (and -я in words like життя)",
              "вікно, молоко, море, життя"
            ],
            [
              "Either",
              "-ь",
              "день, вчитель (m); сіль, осінь (f)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Де мій телефон? — Він на столі.",
            "en": "Where’s my phone? — It’s on the table.",
            "note": "телефон is masculine, so “it” is він."
          }
        ]
      },
      {
        "heading": "Adjectives agree",
        "body": "Adjectives take the gender of their noun. Most end in **-ий** (masculine), **-а** (feminine) and **-е** (neuter). A small group of “soft” adjectives, such as **синій** (blue), use **-ій, -я, -є** instead. Dictionaries list adjectives in the masculine form.",
        "table": {
          "head": [
            "",
            "Masculine",
            "Feminine",
            "Neuter"
          ],
          "rows": [
            [
              "new",
              "новий телефон",
              "нова книжка",
              "нове вікно"
            ],
            [
              "big",
              "великий дім",
              "велика кімната",
              "велике місто"
            ],
            [
              "blue",
              "синій автобус",
              "синя ручка",
              "синє море"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Кава гаряча, а вода холодна.",
            "en": "The coffee is hot, and the water is cold.",
            "note": "кава and вода are feminine, so the adjectives end in -а."
          },
          {
            "tr": "Яке гарне місто!",
            "en": "What a beautiful city!",
            "note": "місто is neuter: яке, гарне."
          }
        ]
      },
      {
        "heading": "My, your, our",
        "body": "Possessives agree with the **thing owned**, not with the owner. A man and a woman both say **моя сестра** (my sister), because сестра is feminine. **Його** (his) and **її** (her) never change.",
        "table": {
          "head": [
            "",
            "Masculine",
            "Feminine",
            "Neuter",
            "Plural"
          ],
          "rows": [
            [
              "my",
              "мій",
              "моя",
              "моє",
              "мої"
            ],
            [
              "your (ти)",
              "твій",
              "твоя",
              "твоє",
              "твої"
            ],
            [
              "his",
              "його",
              "його",
              "його",
              "його"
            ],
            [
              "her",
              "її",
              "її",
              "її",
              "її"
            ],
            [
              "our",
              "наш",
              "наша",
              "наше",
              "наші"
            ],
            [
              "your (ви)",
              "ваш",
              "ваша",
              "ваше",
              "ваші"
            ],
            [
              "their",
              "їхній",
              "їхня",
              "їхнє",
              "їхні"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Це мій брат, а це моя сестра.",
            "en": "This is my brother, and this is my sister.",
            "note": "брат is masculine → мій; сестра is feminine → моя."
          },
          {
            "tr": "Його мама — лікарка.",
            "en": "His mom is a doctor.",
            "note": "його stays the same whatever follows it."
          },
          {
            "tr": "Де ваша кімната?",
            "en": "Where is your room?",
            "note": "кімната is feminine → ваша."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What gender is **вікно** (window)?",
        "options": [
          "Masculine",
          "Feminine",
          "Neuter",
          "It has no gender"
        ],
        "answer": 2,
        "explain": "Nouns ending in -о are usually neuter."
      },
      {
        "q": "A man is talking about his sister. Which is correct?",
        "options": [
          "мій сестра",
          "моє сестра",
          "мої сестра",
          "моя сестра"
        ],
        "answer": 3,
        "explain": "Possessives agree with the noun (сестра is feminine), not with the speaker."
      },
      {
        "q": "Choose the right word: ___ море (the blue sea).",
        "options": [
          "синій",
          "синя",
          "синє",
          "сині"
        ],
        "answer": 2,
        "explain": "море is neuter, and синій is a soft adjective, so it becomes синє."
      },
      {
        "q": "Which word is masculine even though it ends in -о?",
        "options": [
          "вікно",
          "тато",
          "місто",
          "молоко"
        ],
        "answer": 1,
        "explain": "Words for male people, like тато (dad), are masculine whatever their ending."
      }
    ]
  },
  {
    "id": "plurals",
    "title": "Plural nouns",
    "level": "A1",
    "summary": "Most nouns make their plural with -и, -і or -а, and in the plural adjectives and possessives have just one form.",
    "sections": [
      {
        "heading": "Three endings: -и, -і, -а",
        "body": "Most masculine and feminine nouns take **-и** in the plural. For nouns ending in **-ь, -я, -й**, and for those whose stem ends in **ж, ч, ш, щ** (**ключ**, **груша**), the ending is **-і** (spelled **-ї** after a vowel). Neuter nouns take **-а**, or **-я** if they end in -е (but **-а** after ж, ч, ш, щ: **прізвище → прізвища**).",
        "table": {
          "head": [
            "Singular ends in",
            "Plural",
            "Examples"
          ],
          "rows": [
            [
              "a hard consonant (m)",
              "-и",
              "брат → брати, телефон → телефони"
            ],
            [
              "-а (f)",
              "-и",
              "мама → мами, школа → школи"
            ],
            [
              "-ь (m or f)",
              "-і",
              "вчитель → вчителі, день → дні"
            ],
            [
              "-й (m)",
              "-ї",
              "чай → чаї, музей → музеї"
            ],
            [
              "-я (f)",
              "-і",
              "вулиця → вулиці, кухня → кухні"
            ],
            [
              "ж, ч, ш, щ (m and f)",
              "-і",
              "ключ → ключі, груша → груші"
            ],
            [
              "-о (n)",
              "-а",
              "вікно → вікна, місто → міста"
            ],
            [
              "-е (n)",
              "-я",
              "море → моря, поле → поля"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Де мої ключі?",
            "en": "Where are my keys?",
            "note": "ключ ends in ч → ключі."
          },
          {
            "tr": "Тут гарні вулиці.",
            "en": "The streets here are beautiful.",
            "note": "вулиця → вулиці."
          }
        ]
      },
      {
        "heading": "Stem changes and irregulars",
        "body": "Remember the і → о change from the sounds lesson: **стіл → столи**, **кіт → коти**. Some nouns lose a vowel (**день → дні**), and a few everyday words are irregular. Several nouns exist **only in the plural**, even when they mean one thing: **двері** (door), **гроші** (money), **ліки** (medicine).",
        "table": {
          "head": [
            "Singular",
            "Plural",
            "Meaning"
          ],
          "rows": [
            [
              "стіл",
              "столи",
              "table → tables"
            ],
            [
              "кіт",
              "коти",
              "cat → cats"
            ],
            [
              "друг",
              "друзі",
              "friend → friends"
            ],
            [
              "людина",
              "люди",
              "person → people"
            ],
            [
              "дитина",
              "діти",
              "child → children"
            ],
            [
              "око",
              "очі",
              "eye → eyes"
            ],
            [
              "—",
              "двері, гроші, ліки",
              "door, money, medicine (plural only)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Діти вже сплять.",
            "en": "The children are already asleep.",
            "note": "дитина → діти."
          },
          {
            "tr": "Двері зачинені.",
            "en": "The door is closed.",
            "note": "двері is plural only, so its adjective is plural too."
          }
        ]
      },
      {
        "heading": "Adjectives and possessives: one plural form",
        "body": "In the plural, gender disappears. Adjectives end in **-і**, and possessives have a single form whatever the noun: **нові телефони**, **нові книжки**, **нові вікна**; **мої друзі**, **наші діти**.",
        "examples": [
          {
            "tr": "Мої друзі живуть у Києві.",
            "en": "My friends live in Kyiv.",
            "note": "друг → друзі, мій → мої."
          },
          {
            "tr": "У нас нові сусіди.",
            "en": "We have new neighbors.",
            "note": "новий → нові for every plural noun."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What is the plural of **книжка** (book)?",
        "options": [
          "книжки",
          "книжкі",
          "книжку",
          "книжко"
        ],
        "answer": 0,
        "explain": "Feminine -а after a hard consonant like к becomes -и."
      },
      {
        "q": "What is the plural of **вікно** (window)?",
        "options": [
          "вікни",
          "вікна",
          "вікні",
          "вікнами"
        ],
        "answer": 1,
        "explain": "Neuter -о becomes -а in the plural."
      },
      {
        "q": "What is the plural of **дитина** (child)?",
        "options": [
          "дитини",
          "дитині",
          "дитиня",
          "діти"
        ],
        "answer": 3,
        "explain": "дитина has an irregular plural: діти."
      },
      {
        "q": "Which phrase is correct for “my new friends”?",
        "options": [
          "мій нові друзі",
          "мої нові друзі",
          "моя нова друзі",
          "мої новий друзі"
        ],
        "answer": 1,
        "explain": "In the plural, possessives and adjectives have one form each: мої, нові."
      }
    ]
  },
  {
    "id": "present-tense",
    "title": "Pronouns and present-tense verbs",
    "level": "A1",
    "summary": "Personal pronouns, the missing “to be”, and the two families of present-tense endings.",
    "sections": [
      {
        "heading": "I, you, he, she: personal pronouns",
        "body": "Ukrainian has two words for “you”: **ти** for one person you know well, and **ви** for several people or for one person you address politely (more in the lesson on politeness). Things are **він, вона** or **воно** according to their gender.\n\nThere is **no “am / is / are”** in the present: **Я студент** means “I am a student”. And because the verb ending shows who is acting, the pronoun can be left out: **Живу в Києві** means “I live in Kyiv”.",
        "table": {
          "head": [
            "Pronoun",
            "Meaning"
          ],
          "rows": [
            [
              "я",
              "I"
            ],
            [
              "ти",
              "you (one person, informal)"
            ],
            [
              "він / вона / воно",
              "he / she / it"
            ],
            [
              "ми",
              "we"
            ],
            [
              "ви",
              "you (polite, or several people)"
            ],
            [
              "вони",
              "they"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Він лікар, а вона вчителька.",
            "en": "He’s a doctor, and she’s a teacher.",
            "note": "No verb for “is”."
          },
          {
            "tr": "Живу в Києві, працюю вдома.",
            "en": "I live in Kyiv and work from home.",
            "note": "The endings already say “I”, so я is dropped."
          }
        ]
      },
      {
        "heading": "Group I: endings with е / є",
        "body": "The **first conjugation** includes many verbs in **-ати** and all verbs in **-увати / -ювати**. Drop **-ти** and add the endings: after a vowel **-ю, -єш, -є, -ємо, -єте, -ють**, after a consonant **-у, -еш, -е, -емо, -ете, -уть**. In **-увати / -ювати** verbs, -ува- / -юва- shrinks to -у- / -ю-: купувати → **купую**, працювати → **працюю**. Some verbs change their stem, so learn the я form with the verb: жити → **живу**.\n\nOne present tense covers both “I read” and “I am reading”.",
        "table": {
          "head": [
            "",
            "читати (read)",
            "працювати (work)",
            "жити (live)"
          ],
          "rows": [
            [
              "я",
              "читаю",
              "працюю",
              "живу"
            ],
            [
              "ти",
              "читаєш",
              "працюєш",
              "живеш"
            ],
            [
              "він / вона",
              "читає",
              "працює",
              "живе"
            ],
            [
              "ми",
              "читаємо",
              "працюємо",
              "живемо"
            ],
            [
              "ви",
              "читаєте",
              "працюєте",
              "живете"
            ],
            [
              "вони",
              "читають",
              "працюють",
              "живуть"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я читаю книжку.",
            "en": "I’m reading a book.",
            "note": "The same form means “I read” and “I’m reading”."
          },
          {
            "tr": "Ми живемо поруч.",
            "en": "We live nearby.",
            "note": "жити: ми живемо."
          }
        ]
      },
      {
        "heading": "Group II: endings with и / ї",
        "body": "The **second conjugation** has **и** (or **ї** after a vowel) in its endings: **-у / -ю** for я, then **-иш, -ить, -имо, -ите**, and **-ать / -ять** for вони. Most verbs in **-ити** belong here.\n\nWatch the я and вони forms: after **б, п, в, м, ф** an extra **л** appears (**любити → люблю, люблять**), and **д, з, с, т** often change in the я form (**ходити → ходжу**, **просити → прошу**).",
        "table": {
          "head": [
            "",
            "говорити (speak)",
            "любити (love)",
            "бачити (see)"
          ],
          "rows": [
            [
              "я",
              "говорю",
              "люблю",
              "бачу"
            ],
            [
              "ти",
              "говориш",
              "любиш",
              "бачиш"
            ],
            [
              "він / вона",
              "говорить",
              "любить",
              "бачить"
            ],
            [
              "ми",
              "говоримо",
              "любимо",
              "бачимо"
            ],
            [
              "ви",
              "говорите",
              "любите",
              "бачите"
            ],
            [
              "вони",
              "говорять",
              "люблять",
              "бачать"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Ти говориш українською?",
            "en": "Do you speak Ukrainian?",
            "note": "говорити → ти говориш."
          },
          {
            "tr": "Я люблю каву.",
            "en": "I love coffee.",
            "note": "любити → я люблю: an extra л appears."
          }
        ]
      },
      {
        "heading": "Everyday irregulars",
        "body": "Learn these three by heart. **Хотіти** (to want) is Group I with т → ч; **їсти** (to eat) is irregular; **іти** (to go on foot) is also spelled **йти**, and you pick whichever is easier to say after the previous word.",
        "table": {
          "head": [
            "",
            "хотіти (want)",
            "їсти (eat)",
            "іти / йти (go)"
          ],
          "rows": [
            [
              "я",
              "хочу",
              "їм",
              "іду / йду"
            ],
            [
              "ти",
              "хочеш",
              "їси",
              "ідеш / йдеш"
            ],
            [
              "він / вона",
              "хоче",
              "їсть",
              "іде / йде"
            ],
            [
              "ми",
              "хочемо",
              "їмо",
              "ідемо / йдемо"
            ],
            [
              "ви",
              "хочете",
              "їсте",
              "ідете / йдете"
            ],
            [
              "вони",
              "хочуть",
              "їдять",
              "ідуть / йдуть"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я хочу їсти.",
            "en": "I’m hungry.",
            "note": "Literally “I want to eat”."
          },
          {
            "tr": "Куди ти йдеш?",
            "en": "Where are you going?",
            "note": "After a vowel, йдеш flows better than ідеш."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Ми ___ українську. (вчити, to learn)",
        "options": [
          "вчимо",
          "вчемо",
          "вчать",
          "вчу"
        ],
        "answer": 0,
        "explain": "вчити is Group II: я вчу, ти вчиш, ми вчимо."
      },
      {
        "q": "How do you say “I am a teacher” (said by a man)?",
        "options": [
          "Я є вчитель.",
          "Я буду вчитель.",
          "Я вчитель.",
          "Мене вчитель."
        ],
        "answer": 2,
        "explain": "In the present, “am / is / are” is simply left out."
      },
      {
        "q": "Which form of **читати** goes with **вони**?",
        "options": [
          "читає",
          "читаєте",
          "читаєш",
          "читають"
        ],
        "answer": 3,
        "explain": "Group I verbs end in -ють after a vowel for вони."
      },
      {
        "q": "Ти ___ каву? (хотіти, to want)",
        "options": [
          "хочу",
          "хочеш",
          "хотиш",
          "хоче"
        ],
        "answer": 1,
        "explain": "хотіти: я хочу, ти хочеш, він хоче."
      }
    ]
  },
  {
    "id": "questions-negation",
    "title": "Asking questions and saying “no”",
    "level": "A1",
    "summary": "Ask yes/no questions with your voice or with чи, use the right “where”, and negate with не, ні and немає.",
    "sections": [
      {
        "heading": "Yes/no questions",
        "body": "The easiest way to ask a yes/no question is to keep the normal word order and raise your voice on the key word: **Ти вдома?** (Are you at home?). You can also start with **чи**, a little word that simply marks a question; it is common in writing and in polite requests such as **Чи можна…?** (May I…?).\n\nIn the middle of a sentence, **чи** means “or”: **Кава чи чай?** Answer with **так** (yes) or **ні** (no).",
        "examples": [
          {
            "tr": "Кава чи чай?",
            "en": "Coffee or tea?",
            "note": "чи in the middle means “or”."
          },
          {
            "tr": "Чи можна тут сісти?",
            "en": "May I sit here?",
            "note": "In speech you can drop чи: Можна тут сісти?"
          }
        ]
      },
      {
        "heading": "Question words",
        "body": "Ukrainian has three different words for “where”: **де** (where at), **куди** (where to) and **звідки** (where from). The question word usually comes first.",
        "table": {
          "head": [
            "Word",
            "Meaning",
            "Example"
          ],
          "rows": [
            [
              "що",
              "what",
              "Що це?"
            ],
            [
              "хто",
              "who",
              "Хто там?"
            ],
            [
              "де",
              "where (at)",
              "Де ти?"
            ],
            [
              "куди",
              "where to",
              "Куди ви їдете?"
            ],
            [
              "звідки",
              "where from",
              "Звідки ти?"
            ],
            [
              "коли",
              "when",
              "Коли концерт?"
            ],
            [
              "чому",
              "why",
              "Чому ти не спиш?"
            ],
            [
              "як",
              "how",
              "Як справи?"
            ],
            [
              "скільки",
              "how much, how many",
              "Скільки тобі років?"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Звідки ви? — Я з Канади.",
            "en": "Where are you from? — I’m from Canada.",
            "note": "звідки asks “from where”; з Канади answers it."
          },
          {
            "tr": "Як це сказати українською?",
            "en": "How do you say this in Ukrainian?"
          }
        ]
      },
      {
        "heading": "Не, ні and немає",
        "body": "**Не** goes right before the word it negates, usually the verb: **Я не знаю** (I don’t know). **Ні** is “no”. Words like **ніхто** (nobody), **нічого** (nothing), **ніколи** (never) and **ніде** (nowhere) still need **не** before the verb: Ukrainian uses **double negatives**.\n\nTo say “there is no …” or “… isn’t here”, use **немає** (in speech often **нема**) with the genitive case, covered in the genitive lesson: **Мами немає вдома** (Mom isn’t home).",
        "table": {
          "head": [
            "Word",
            "Meaning",
            "Example"
          ],
          "rows": [
            [
              "не",
              "not",
              "Я не знаю."
            ],
            [
              "ні",
              "no",
              "Ні, дякую."
            ],
            [
              "ніхто",
              "nobody",
              "Ніхто не знає."
            ],
            [
              "нічого",
              "nothing",
              "Нічого не розумію."
            ],
            [
              "ніколи",
              "never",
              "Я ніколи не був у Львові."
            ],
            [
              "ніде",
              "nowhere",
              "Ключів ніде немає."
            ],
            [
              "немає",
              "there is no; isn’t here",
              "Мами немає вдома."
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я не п’ю каву.",
            "en": "I don’t drink coffee.",
            "note": "не goes right before the verb."
          },
          {
            "tr": "Я нічого не бачу.",
            "en": "I can’t see anything.",
            "note": "нічого + не: a double negative is normal."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which word means “where to”?",
        "options": [
          "де",
          "куди",
          "звідки",
          "коли"
        ],
        "answer": 1,
        "explain": "куди asks about direction: Куди ти йдеш?"
      },
      {
        "q": "Translate: “I never drink coffee.”",
        "options": [
          "Я ніколи п’ю каву.",
          "Я не ніколи п’ю каву.",
          "Я ніколи не п’ю каву.",
          "Я ні п’ю каву."
        ],
        "answer": 2,
        "explain": "Ukrainian needs both negatives: ніколи + не."
      },
      {
        "q": "How do you say “There’s no bread”?",
        "options": [
          "Немає хліба.",
          "Не хліб.",
          "Ні хліб.",
          "Немає хліб."
        ],
        "answer": 0,
        "explain": "немає takes the genitive: хліб → хліба."
      },
      {
        "q": "What does **чи** mean in **Чай чи кава?**",
        "options": [
          "and",
          "not",
          "or",
          "please"
        ],
        "answer": 2,
        "explain": "Between two options, чи means “or”."
      }
    ]
  },
  {
    "id": "cases-accusative",
    "title": "Cases and the accusative",
    "level": "A1",
    "summary": "Ukrainian nouns change their endings to show their job in the sentence; the accusative marks what you see, want or buy.",
    "sections": [
      {
        "heading": "Seven cases in a nutshell",
        "body": "English shows who does what with word order and little words like “of”, “to” and “with”. Ukrainian changes the **ending** of the noun instead, and each set of endings is called a **case**. There are **seven**. Six of them answer a question word (the vocative, used for calling someone, has none), which is how Ukrainian children learn them.\n\nDon’t try to memorize every table now. The accusative (this lesson), the locative and instrumental, and the genitive (the next two lessons) cover most everyday sentences.",
        "table": {
          "head": [
            "Case",
            "Answers",
            "Used for",
            "Example"
          ],
          "rows": [
            [
              "Nominative",
              "хто? що?",
              "the subject; dictionary form",
              "**Україна**"
            ],
            [
              "Genitive",
              "кого? чого?",
              "“of”, “from”, “no …”",
              "з **України** (from Ukraine)"
            ],
            [
              "Dative",
              "кому? чому?",
              "“to / for” someone",
              "Слава **Україні**! (Glory to Ukraine!)"
            ],
            [
              "Accusative",
              "кого? що?",
              "the direct object",
              "люблю **Україну** (I love Ukraine)"
            ],
            [
              "Instrumental",
              "ким? чим?",
              "“with”, “by”",
              "пишаюся **Україною** (I’m proud of Ukraine)"
            ],
            [
              "Locative",
              "на кому? на чому?",
              "“in, on, at”: always after a preposition",
              "в **Україні** (in Ukraine)"
            ],
            [
              "Vocative",
              "—",
              "calling someone",
              "**Мамо!** **Олено!**"
            ]
          ]
        }
      },
      {
        "heading": "Accusative: the direct object",
        "body": "The **accusative** marks the thing or person the action is done to: what you see, want, buy or love. Only some nouns change. Feminine **-а** becomes **-у**, and **-я** becomes **-ю**. Masculine nouns for **people and animals** take **-а / -я**. Masculine things, neuter nouns and feminine nouns ending in a consonant stay the same.",
        "table": {
          "head": [
            "Type of noun",
            "Dictionary form",
            "Accusative"
          ],
          "rows": [
            [
              "Feminine in -а",
              "кава",
              "**каву**"
            ],
            [
              "Feminine in -я",
              "пісня",
              "**пісню**"
            ],
            [
              "Feminine in a consonant",
              "сіль, ніч",
              "сіль, ніч"
            ],
            [
              "Masculine thing",
              "телефон, хліб",
              "телефон, хліб"
            ],
            [
              "Masculine person or animal",
              "брат, кіт",
              "**брата**, **кота**"
            ],
            [
              "Neuter",
              "молоко, вікно",
              "молоко, вікно"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я шукаю аптеку.",
            "en": "I’m looking for a pharmacy.",
            "note": "аптека → аптеку."
          },
          {
            "tr": "Ти бачиш кота?",
            "en": "Do you see the cat?",
            "note": "Animals take -а: кіт → кота."
          },
          {
            "tr": "Я купую хліб і молоко.",
            "en": "I’m buying bread and milk.",
            "note": "Masculine things and neuter nouns don’t change."
          }
        ]
      },
      {
        "heading": "Pronouns in the accusative",
        "body": "Pronouns have their own accusative forms, and in speech they often come **before** the verb: **Я тебе люблю**, **Я вас не чую**.",
        "table": {
          "head": [
            "Subject",
            "Object (accusative)"
          ],
          "rows": [
            [
              "я",
              "мене"
            ],
            [
              "ти",
              "тебе"
            ],
            [
              "він / воно",
              "його"
            ],
            [
              "вона",
              "її"
            ],
            [
              "ми",
              "нас"
            ],
            [
              "ви",
              "вас"
            ],
            [
              "вони",
              "їх"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Вибачте, я вас не чую.",
            "en": "Sorry, I can’t hear you.",
            "note": "ви → вас."
          },
          {
            "tr": "Ти мене розумієш?",
            "en": "Do you understand me?",
            "note": "я → мене."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Я люблю ___ (кава, coffee).",
        "options": [
          "кава",
          "каву",
          "кави",
          "кавою"
        ],
        "answer": 1,
        "explain": "Feminine -а becomes -у in the accusative."
      },
      {
        "q": "Я бачу ___ (брат, brother).",
        "options": [
          "брат",
          "брату",
          "братом",
          "брата"
        ],
        "answer": 3,
        "explain": "Masculine nouns for people and animals take -а in the accusative."
      },
      {
        "q": "Which sentence means “I’m buying a phone”?",
        "options": [
          "Я купую телефон.",
          "Я купую телефона.",
          "Я купую телефону.",
          "Я купую телефоні."
        ],
        "answer": 0,
        "explain": "Masculine nouns for things don’t change in the accusative."
      },
      {
        "q": "“Do you love me?” Ти ___ любиш?",
        "options": [
          "я",
          "мені",
          "мене",
          "мною"
        ],
        "answer": 2,
        "explain": "The accusative of я is мене."
      }
    ]
  },
  {
    "id": "locative-instrumental",
    "title": "Where and with whom: locative and instrumental",
    "level": "A2",
    "summary": "Use the locative after в / у and на to say where something is, and the instrumental after з to say “with”.",
    "sections": [
      {
        "heading": "в / у or на?",
        "body": "To say where something is, use **в / у** (in) or **на** (on, at) with the **locative** case. **В** and **у** mean the same thing; you pick the one that is easier to say. **На** is for surfaces and open spaces, and also for many places where English says “at”: **на роботі** (at work), **на вокзалі** (at the station), **на пошті** (at the post office), and even **на кухні** (in the kitchen). With Ukraine, the standard form is **в Україні**, never “на”.\n\nFor movement **to** a place, the same prepositions take the **accusative**: **Я йду на роботу** (I’m going to work), but **Я на роботі** (I’m at work).",
        "examples": [
          {
            "tr": "Я на роботі.",
            "en": "I’m at work.",
            "note": "на + locative: робота → на роботі."
          },
          {
            "tr": "Мама на кухні.",
            "en": "Mom is in the kitchen.",
            "note": "Ukrainian says на кухні, literally “on the kitchen”."
          },
          {
            "tr": "Ми живемо в Україні.",
            "en": "We live in Ukraine.",
            "note": "Always в Україні."
          }
        ]
      },
      {
        "heading": "Locative endings",
        "body": "Most nouns take **-і** in the locative. Before it, **к, г, х** change to **ц, з, с**: **аптека → в аптеці**, **нога → на нозі**. Many masculine nouns ending in **-к** take **-у** instead: **у парку**, **на ринку**. Learn **в аеропорту** (at the airport) as a one-off.",
        "table": {
          "head": [
            "Dictionary form",
            "Locative",
            "Meaning"
          ],
          "rows": [
            [
              "місто",
              "у місті",
              "in the city"
            ],
            [
              "кімната",
              "у кімнаті",
              "in the room"
            ],
            [
              "кухня",
              "на кухні",
              "in the kitchen"
            ],
            [
              "робота",
              "на роботі",
              "at work"
            ],
            [
              "аптека",
              "в аптеці",
              "at the pharmacy"
            ],
            [
              "парк",
              "у парку",
              "in the park"
            ],
            [
              "Київ",
              "у Києві",
              "in Kyiv"
            ],
            [
              "море",
              "на морі",
              "at the seaside"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Ми зараз у парку.",
            "en": "We’re in the park right now.",
            "note": "парк → у парку: -у, not -і."
          }
        ]
      },
      {
        "heading": "з + instrumental: “with”",
        "body": "**З** + the **instrumental** means “with”: together with someone, or containing something. Feminine nouns take **-ою**, masculine and neuter nouns take **-ом**; soft stems and stems in ж, ч, ш, щ use **-ею / -єю** and **-ем / -єм** instead (**з картоплею**, **з чаєм**). Before some consonant clusters з becomes **зі**: **зі мною** (with me).\n\nCareful: **з + genitive** means “from”: **з Києва** (from Kyiv), but **з мамою** means “with mom”.",
        "table": {
          "head": [
            "",
            "Dictionary form",
            "з + instrumental"
          ],
          "rows": [
            [
              "Feminine",
              "мама, кава",
              "з мамою, з кавою"
            ],
            [
              "Feminine (soft)",
              "картопля",
              "з картоплею"
            ],
            [
              "Masculine",
              "друг, сир",
              "з другом, з сиром"
            ],
            [
              "Masculine (soft)",
              "чай",
              "з чаєм"
            ],
            [
              "Neuter",
              "молоко, м’ясо",
              "з молоком, з м’ясом"
            ],
            [
              "Pronouns",
              "я, ти, ми, ви",
              "зі мною, з тобою, з нами, з вами"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Кава з молоком, будь ласка.",
            "en": "Coffee with milk, please.",
            "note": "молоко → з молоком."
          },
          {
            "tr": "Я живу з сестрою.",
            "en": "I live with my sister.",
            "note": "сестра → з сестрою."
          },
          {
            "tr": "Я люблю вареники з картоплею.",
            "en": "I love potato varenyky.",
            "note": "картопля → з картоплею."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “in Ukraine”?",
        "options": [
          "на Україні",
          "в Україні",
          "в Україна",
          "на Україну"
        ],
        "answer": 1,
        "explain": "The standard form is в + locative: в Україні."
      },
      {
        "q": "Я в ___ (аптека, pharmacy).",
        "options": [
          "аптеці",
          "аптекі",
          "аптеку",
          "аптекою"
        ],
        "answer": 0,
        "explain": "Before the locative -і, к changes to ц: в аптеці."
      },
      {
        "q": "How do you say “tea with sugar”?",
        "options": [
          "чай з цукор",
          "чай з цукру",
          "чай з цукром",
          "чай на цукрі"
        ],
        "answer": 2,
        "explain": "з + instrumental: цукор → з цукром (the о drops out)."
      },
      {
        "q": "How do you say “I’m going to work”?",
        "options": [
          "Я йду на роботі.",
          "Я йду з роботою.",
          "Я йду в роботі.",
          "Я йду на роботу."
        ],
        "answer": 3,
        "explain": "Movement to a place takes на + accusative: на роботу."
      }
    ]
  },
  {
    "id": "genitive-numbers",
    "title": "Genitive: having, not having, counting",
    "level": "A2",
    "summary": "The genitive appears in “I have” (у мене), after немає, and after numbers from five up.",
    "sections": [
      {
        "heading": "У мене є: “I have”",
        "body": "The everyday way to say “I have” is **у мене є**, literally “at me there is”. **У** takes the **genitive**, so the pronoun changes, while the thing you have stays in its dictionary form. In shops and cafés, **У вас є…?** means “Do you have…?”.\n\nThe verb **мати** (to have: **я маю**) is also correct and common, especially with abstract things: **Я маю питання** (I have a question).",
        "table": {
          "head": [
            "Pronoun",
            "у + genitive",
            "Meaning"
          ],
          "rows": [
            [
              "я",
              "у мене є",
              "I have"
            ],
            [
              "ти",
              "у тебе є",
              "you have"
            ],
            [
              "він",
              "у нього є",
              "he has"
            ],
            [
              "вона",
              "у неї є",
              "she has"
            ],
            [
              "ми",
              "у нас є",
              "we have"
            ],
            [
              "ви",
              "у вас є",
              "you have (polite / plural)"
            ],
            [
              "вони",
              "у них є",
              "they have"
            ]
          ]
        },
        "examples": [
          {
            "tr": "У тебе є ручка?",
            "en": "Do you have a pen?",
            "note": "у + тебе, the genitive of ти."
          },
          {
            "tr": "У вас є меню англійською?",
            "en": "Do you have a menu in English?",
            "note": "The standard question in a shop or café."
          }
        ]
      },
      {
        "heading": "Немає + genitive",
        "body": "To say you **don’t** have something, or that it isn’t there, swap **є** for **немає** and put the thing in the **genitive**. Feminine **-а** becomes **-и** (**-і** after ж, ч, ш, щ: **груша → груші**) and **-я** becomes **-і**; neuter **-о** becomes **-а**. Masculine nouns take **-а** (people, animals, many countable things and most city names: **брата**, **квитка**, **Львова**) or **-у** (substances, buildings and abstract ideas: **чаю**, **магазину**, **часу**); dictionaries show which.",
        "table": {
          "head": [
            "Dictionary form",
            "Genitive",
            "Example"
          ],
          "rows": [
            [
              "вода",
              "води",
              "Немає води. (There’s no water.)"
            ],
            [
              "лікарня",
              "лікарні",
              "Тут немає лікарні. (There’s no hospital here.)"
            ],
            [
              "квиток",
              "квитка",
              "У мене немає квитка. (I don’t have a ticket.)"
            ],
            [
              "час",
              "часу",
              "У мене немає часу. (I have no time.)"
            ],
            [
              "молоко",
              "молока",
              "Молока немає. (There’s no milk.)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Вибачте, у мене немає готівки.",
            "en": "Sorry, I don’t have any cash.",
            "note": "готівка → готівки."
          },
          {
            "tr": "Тут немає вільних місць.",
            "en": "There are no free seats here.",
            "note": "Genitive plural: вільні місця → вільних місць."
          }
        ]
      },
      {
        "heading": "Numbers and nouns",
        "body": "After numbers, nouns follow a **1 / 2–4 / 5+** pattern. **1** takes the singular, and один agrees in gender: **один, одна, одне**. **2, 3, 4** take the nominative plural, and 2 becomes **дві** with feminine nouns. **5 and up** take the **genitive plural**.\n\nThe last word of the number decides: **21** behaves like 1 (**двадцять один рік**), **22–24** like 2 (**двадцять два роки**), but **11–14** take the genitive plural (**одинадцять років**).",
        "table": {
          "head": [
            "Number",
            "квиток (ticket, m)",
            "гривня (hryvnia, f)",
            "яблуко (apple, n)"
          ],
          "rows": [
            [
              "1",
              "один квиток",
              "одна гривня",
              "одне яблуко"
            ],
            [
              "2",
              "два квитки",
              "дві гривні",
              "два яблука"
            ],
            [
              "3, 4",
              "три квитки",
              "три гривні",
              "чотири яблука"
            ],
            [
              "5 and up",
              "п’ять квитків",
              "п’ять гривень",
              "п’ять яблук"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Два квитки до Львова, будь ласка.",
            "en": "Two tickets to Lviv, please.",
            "note": "2 + nominative plural; до + genitive: Львів → Львова."
          },
          {
            "tr": "Мені двадцять два роки.",
            "en": "I’m twenty-two.",
            "note": "Age uses мені (to me); 22 ends in 2, so роки."
          },
          {
            "tr": "Кава коштує п’ятдесят гривень.",
            "en": "The coffee costs fifty hryvnias.",
            "note": "50 takes the genitive plural: гривень."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "“I don’t have time.” У мене немає ___ (час).",
        "options": [
          "час",
          "часу",
          "часа",
          "часом"
        ],
        "answer": 1,
        "explain": "немає takes the genitive, and abstract masculine nouns like час take -у."
      },
      {
        "q": "How do you say “five tickets”?",
        "options": [
          "п’ять квиток",
          "п’ять квитки",
          "п’ять квитка",
          "п’ять квитків"
        ],
        "answer": 3,
        "explain": "From 5 up, nouns take the genitive plural: квитків."
      },
      {
        "q": "How do you say “two coffees”?",
        "options": [
          "два кави",
          "дві кави",
          "дві кав",
          "два каву"
        ],
        "answer": 1,
        "explain": "кава is feminine, so 2 is дві, and 2–4 take the nominative plural."
      },
      {
        "q": "How do you say “she has”?",
        "options": [
          "у неї є",
          "у вона є",
          "у її є",
          "у ній є"
        ],
        "answer": 0,
        "explain": "After у, вона becomes неї: у неї є."
      }
    ]
  },
  {
    "id": "past-tense",
    "title": "Past tense: -в, -ла, -ло, -ли",
    "level": "A2",
    "summary": "The past tense doesn’t change for “I, you, he”: it changes for gender and number.",
    "sections": [
      {
        "heading": "One rule for almost every verb",
        "body": "Take the infinitive, drop **-ти**, and add **-в** (masculine), **-ла** (feminine), **-ло** (neuter) or **-ли** (plural). The ending agrees with the **gender of the subject**, so a woman says **я читала** and a man says **я читав**. Because the form doesn’t show the person, pronouns are usually kept.\n\n**Ви** always takes **-ли**, even when you are speaking politely to one person.",
        "table": {
          "head": [
            "Subject",
            "читати (read)",
            "говорити (speak)",
            "бути (be)"
          ],
          "rows": [
            [
              "я, ти, він (male)",
              "читав",
              "говорив",
              "був"
            ],
            [
              "я, ти, вона (female)",
              "читала",
              "говорила",
              "була"
            ],
            [
              "воно",
              "читало",
              "говорило",
              "було"
            ],
            [
              "ми, ви, вони",
              "читали",
              "говорили",
              "були"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я вчора багато працювала.",
            "en": "I worked a lot yesterday.",
            "note": "A woman speaking: -ла."
          },
          {
            "tr": "Що ти робив учора?",
            "en": "What did you do yesterday?",
            "note": "Asking a man: -в."
          }
        ]
      },
      {
        "heading": "A few irregular ones",
        "body": "**Іти** (to go) becomes **ішов / йшов**, and its relatives follow: **прийти → прийшов** (came). Verbs whose stem ends in a consonant drop the -в in the masculine: **могти → міг** (note і ↔ о again), **нести → ніс** (carried).",
        "table": {
          "head": [
            "Infinitive",
            "він",
            "вона",
            "вони"
          ],
          "rows": [
            [
              "іти / йти (go)",
              "ішов / йшов",
              "ішла / йшла",
              "ішли / йшли"
            ],
            [
              "прийти (come, arrive)",
              "прийшов",
              "прийшла",
              "прийшли"
            ],
            [
              "могти (can)",
              "міг",
              "могла",
              "могли"
            ],
            [
              "їсти (eat)",
              "їв",
              "їла",
              "їли"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Вона прийшла додому пізно.",
            "en": "She came home late.",
            "note": "прийти → прийшла."
          },
          {
            "tr": "Я не міг спати.",
            "en": "I couldn’t sleep.",
            "note": "могти → міг (a man speaking)."
          }
        ]
      },
      {
        "heading": "“Was”, “had” and “there wasn’t”",
        "body": "**Був / була / було / були** gives you “was / were”. “I had” is **у мене був / була / було / були** + noun, and the verb agrees with the **thing** you had. For “there wasn’t” or “I wasn’t there”, use **не було** + genitive, whatever the gender: **Мене не було вдома** (I wasn’t home).",
        "examples": [
          {
            "tr": "Ми були в Одесі.",
            "en": "We were in Odesa.",
            "note": "ми → були."
          },
          {
            "tr": "У мене був кіт.",
            "en": "I had a cat.",
            "note": "був agrees with кіт, not with the speaker."
          },
          {
            "tr": "Мене не було вдома.",
            "en": "I wasn’t home.",
            "note": "не було + genitive: я → мене."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "A woman says “I was tired”: Я ___ втомлена.",
        "options": [
          "був",
          "була",
          "було",
          "були"
        ],
        "answer": 1,
        "explain": "A female speaker uses the feminine -ла: була."
      },
      {
        "q": "Олег учора ___ книжку. (читати)",
        "options": [
          "читала",
          "читало",
          "читав",
          "читали"
        ],
        "answer": 2,
        "explain": "Олег is a man, so the past tense ends in -в."
      },
      {
        "q": "What is “he could” (from **могти**)?",
        "options": [
          "могв",
          "міг",
          "могів",
          "мог"
        ],
        "answer": 1,
        "explain": "The stem ends in г, so there is no -в, and о becomes і: міг."
      },
      {
        "q": "Speaking politely to one person: “Were you in Lviv?”",
        "options": [
          "Ви був у Львові?",
          "Ви була у Львові?",
          "Ви було у Львові?",
          "Ви були у Львові?"
        ],
        "answer": 3,
        "explain": "Ви always takes the plural ending -ли."
      }
    ]
  },
  {
    "id": "future-aspect",
    "title": "Future tense and aspect",
    "level": "A2",
    "summary": "Most verbs come in pairs, one for the process and one for the result, and that choice decides how you talk about the future.",
    "sections": [
      {
        "heading": "Two verbs for one action",
        "body": "Most verbs come in **aspect pairs**. The **imperfective** verb looks at an action as a process, a habit or something repeated. The **perfective** verb presents one complete action with a result. Perfectives are often made with a prefix, sometimes with a different suffix, and occasionally with a different word.\n\nThe choice matters in the past too: **я читав** (I was reading, I used to read) vs **я прочитав** (I read it, I finished it).",
        "table": {
          "head": [
            "Imperfective (process)",
            "Perfective (result)",
            "Meaning"
          ],
          "rows": [
            [
              "читати",
              "прочитати",
              "read"
            ],
            [
              "писати",
              "написати",
              "write"
            ],
            [
              "робити",
              "зробити",
              "do, make"
            ],
            [
              "пити",
              "випити",
              "drink"
            ],
            [
              "їсти",
              "з’їсти",
              "eat"
            ],
            [
              "купувати",
              "купити",
              "buy"
            ],
            [
              "казати",
              "сказати",
              "say"
            ],
            [
              "брати",
              "взяти",
              "take"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я читав книжку весь вечір.",
            "en": "I was reading a book all evening.",
            "note": "Imperfective: the process."
          },
          {
            "tr": "Я прочитав книжку за вечір.",
            "en": "I read the whole book in one evening.",
            "note": "Perfective: finished, with a result."
          }
        ]
      },
      {
        "heading": "Future of a process: буду + infinitive",
        "body": "For an ongoing or repeated future action, take an **imperfective** verb and use either **буду, будеш, буде, будемо, будете, будуть** + infinitive, or the one-word form: infinitive + **-му, -меш, -ме, -мемо, -мете, -муть**. Both are correct and mean the same; the буду form is the easier one to start with.",
        "table": {
          "head": [
            "",
            "буду + infinitive",
            "one-word form"
          ],
          "rows": [
            [
              "я",
              "буду читати",
              "читатиму"
            ],
            [
              "ти",
              "будеш читати",
              "читатимеш"
            ],
            [
              "він / вона",
              "буде читати",
              "читатиме"
            ],
            [
              "ми",
              "будемо читати",
              "читатимемо"
            ],
            [
              "ви",
              "будете читати",
              "читатимете"
            ],
            [
              "вони",
              "будуть читати",
              "читатимуть"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Завтра я буду працювати вдома.",
            "en": "Tomorrow I’ll be working from home.",
            "note": "буду + imperfective infinitive."
          },
          {
            "tr": "Що ти робитимеш у суботу?",
            "en": "What will you be doing on Saturday?",
            "note": "робити + -меш: the one-word future."
          },
          {
            "tr": "Що будете замовляти?",
            "en": "What would you like to order?",
            "note": "A waiter’s everyday question."
          }
        ]
      },
      {
        "heading": "Future of a result: the perfective",
        "body": "A **perfective** verb has **no present tense**: its present-looking forms already mean the future. **Я прочитаю** means “I will read it (to the end)”, **я зроблю** means “I’ll do it”. This is the natural form for promises, offers and ordering in a café.\n\nNever combine **буду** with a perfective verb: “буду прочитати” is a typical learner mistake.",
        "table": {
          "head": [
            "",
            "зробити (do)",
            "купити (buy)"
          ],
          "rows": [
            [
              "я",
              "зроблю",
              "куплю"
            ],
            [
              "ти",
              "зробиш",
              "купиш"
            ],
            [
              "він / вона",
              "зробить",
              "купить"
            ],
            [
              "ми",
              "зробимо",
              "купимо"
            ],
            [
              "ви",
              "зробите",
              "купите"
            ],
            [
              "вони",
              "зроблять",
              "куплять"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я зроблю це завтра.",
            "en": "I’ll do it tomorrow.",
            "note": "Perfective: one finished action."
          },
          {
            "tr": "Я тобі подзвоню.",
            "en": "I’ll call you.",
            "note": "подзвонити (perfective) → я подзвоню."
          },
          {
            "tr": "Я візьму борщ.",
            "en": "I’ll have the borscht.",
            "note": "взяти → я візьму: ordering food."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which verb is perfective?",
        "options": [
          "читати",
          "робити",
          "написати",
          "пити"
        ],
        "answer": 2,
        "explain": "написати is the perfective partner of писати."
      },
      {
        "q": "“I’ll call you tomorrow” (one call, a promise):",
        "options": [
          "Я подзвоню тобі завтра.",
          "Я буду подзвонити тобі завтра.",
          "Я дзвоню тобі вчора.",
          "Я подзвонив тобі завтра."
        ],
        "answer": 0,
        "explain": "A perfective verb in the present-style form means a single future action."
      },
      {
        "q": "Which means the same as **я буду працювати**?",
        "options": [
          "я працював",
          "я працюватиму",
          "я попрацював",
          "я працюю"
        ],
        "answer": 1,
        "explain": "The one-word future: працювати + -му = працюватиму."
      },
      {
        "q": "What’s wrong with “Я буду прочитати”?",
        "options": [
          "Nothing, it’s correct",
          "It should be “Я буде прочитати”",
          "буду can’t be used with a perfective verb",
          "прочитати is not a real verb"
        ],
        "answer": 2,
        "explain": "буду only goes with imperfective verbs; say я прочитаю or я буду читати."
      }
    ]
  },
  {
    "id": "polite-informal",
    "title": "Ти or ви? Polite and informal speech",
    "level": "A2",
    "summary": "Choosing between ти and ви changes your greetings, your requests and the way you address people.",
    "sections": [
      {
        "heading": "When to use ти and ви",
        "body": "**Ти** is for family, friends, children, animals and people your age in relaxed settings. **Ви** is for strangers, older people, shop and office staff, teachers and colleagues you don’t know well. When in doubt, start with ви: it is never rude.\n\nIn letters and emails, polite **Ви** is often capitalized when you write to one person. If someone says **Давай на «ти»**, they are inviting you to switch to ти.",
        "table": {
          "head": [
            "",
            "Informal (ти)",
            "Polite (ви)"
          ],
          "rows": [
            [
              "Hello",
              "Привіт!",
              "Добрий день!"
            ],
            [
              "How are you?",
              "Як ти? / Як справи?",
              "Як ви? / Як у вас справи?"
            ],
            [
              "What’s your name?",
              "Як тебе звати?",
              "Як вас звати?"
            ],
            [
              "Where are you from?",
              "Звідки ти?",
              "Звідки ви?"
            ],
            [
              "Bye",
              "Бувай!",
              "До побачення!"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Давай на «ти»!",
            "en": "Let’s drop the formalities!",
            "note": "Literally “let’s go over to ти”."
          },
          {
            "tr": "Вибачте, ви тут працюєте?",
            "en": "Excuse me, do you work here?",
            "note": "Polite ви with shop staff."
          }
        ]
      },
      {
        "heading": "Polite requests",
        "body": "Informal requests use forms like **скажи**, **дай**, **покажи**, **зачекай**. For **ви**, add **-те** (after -и it becomes **-іть**): **скажіть**, **дайте**, **покажіть**, **зачекайте**.\n\nSoften any request with **будь ласка**, ask permission with **Можна…?** (May I…?), or use **Не могли б ви…?** (Could you…?). **Перепрошую** is a polite “excuse me” for getting someone’s attention.",
        "table": {
          "head": [
            "Informal (ти)",
            "Polite (ви)",
            "Meaning"
          ],
          "rows": [
            [
              "скажи",
              "скажіть",
              "tell (me)"
            ],
            [
              "дай",
              "дайте",
              "give"
            ],
            [
              "покажи",
              "покажіть",
              "show"
            ],
            [
              "зачекай",
              "зачекайте",
              "wait"
            ],
            [
              "вибач",
              "вибачте",
              "sorry, excuse me"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Скажіть, будь ласка, де тут аптека?",
            "en": "Could you tell me where the pharmacy is?",
            "note": "скажіть: the polite request form."
          },
          {
            "tr": "Не могли б ви говорити повільніше?",
            "en": "Could you speak more slowly?"
          },
          {
            "tr": "Дай, будь ласка, ручку.",
            "en": "Pass me the pen, please.",
            "note": "To a friend: дай."
          },
          {
            "tr": "Перепрошую, ви не підкажете, котра година?",
            "en": "Excuse me, could you tell me the time?",
            "note": "A very polite way to ask a stranger."
          }
        ]
      },
      {
        "heading": "Calling people: the vocative, пане and пані",
        "body": "When you call someone by name, Ukrainian uses the **vocative** case, and it is very much alive in everyday speech. Feminine **-а** becomes **-о** and **-я** becomes **-ю** (but names in **-ія** take **-іє**: **Марія → Маріє**); masculine names usually take **-е** (**Іване**) or **-у / -ю** (**Олегу**, **Андрію**).\n\nPolite address is **пане** (to a man) or **пані** (to a woman) + first name in the vocative: **пане Іване**, **пані Олено**. Formal letters begin **Шановний пане…** or **Шановна пані…**.",
        "table": {
          "head": [
            "Name or word",
            "Calling someone"
          ],
          "rows": [
            [
              "Олена",
              "Олено!"
            ],
            [
              "Оля",
              "Олю!"
            ],
            [
              "Іван",
              "Іване!"
            ],
            [
              "Андрій",
              "Андрію!"
            ],
            [
              "пан / пані",
              "пане Іване / пані Олено"
            ],
            [
              "друг",
              "друже!"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Пані Олено, як ви?",
            "en": "How are you, Olena?",
            "note": "пані + vocative: polite but warm."
          },
          {
            "tr": "Тарасе, ходи сюди!",
            "en": "Taras, come here!",
            "note": "Тарас → Тарасе."
          },
          {
            "tr": "Шановний пане Іване!",
            "en": "Dear Mr. Ivan,",
            "note": "A formal letter opening; пане / пані go with the first name or the surname."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Which word would you use with an older stranger?",
        "options": [
          "ти",
          "ви",
          "він",
          "воно"
        ],
        "answer": 1,
        "explain": "Use polite ви with strangers and older people."
      },
      {
        "q": "What is the polite form of **скажи** (tell)?",
        "options": [
          "скажіть",
          "скажеш",
          "сказав",
          "сказати"
        ],
        "answer": 0,
        "explain": "The polite imperative adds -те; after -и it becomes -іть."
      },
      {
        "q": "How do you call out to Олена?",
        "options": [
          "Олена!",
          "Олену!",
          "Олено!",
          "Олені!"
        ],
        "answer": 2,
        "explain": "The vocative of feminine -а nouns ends in -о: Олено!"
      },
      {
        "q": "Which greeting is right for a bank clerk?",
        "options": [
          "Привіт!",
          "Бувай!",
          "Па-па!",
          "Добрий день!"
        ],
        "answer": 3,
        "explain": "Добрий день is the neutral, polite greeting."
      }
    ]
  },
  {
    "id": "dative",
    "title": "Dative: giving, liking, needing",
    "level": "A2",
    "summary": "The dative marks the person who receives something, and it is also how Ukrainian says “I like”, “I need”, “I’m cold” and “I’m twenty”.",
    "sections": [
      {
        "heading": "To whom? The dative of nouns",
        "body": "The **dative** answers **кому?** (to whom?). It marks the person who receives something or is told something, with no preposition where English uses “to” or “for”: **дати другові** (to give to a friend), **сказати мамі** (to tell mom). Typical verbs are **дати** (give), **сказати** (tell), **написати** (write), **подзвонити** (call), **показати** (show), **купити** (buy) and **допомогти** (help).\n\nFeminine nouns take **-і**, and before it **г, к, х** change to **з, ц, с**, exactly as in the locative: **подруга → подрузі**. Masculine nouns have two endings, both correct: **-ові** (soft stems: **-еві / -єві**) or **-у / -ю**. For people, the longer one is preferred: **братові**, **вчителеві**. The plural is **-ам / -ям** for every gender.",
        "table": {
          "head": [
            "Type of noun",
            "Dictionary form",
            "Dative"
          ],
          "rows": [
            [
              "Feminine in -а, -я",
              "мама, сестра, Оля",
              "мамі, сестрі, Олі"
            ],
            [
              "Feminine with г, к, х",
              "подруга, донька",
              "подрузі, доньці"
            ],
            [
              "Feminine in -ія",
              "Марія, Юлія",
              "Марії, Юлії"
            ],
            [
              "Masculine",
              "брат, друг, син",
              "братові, другові, синові (or брату, другу, сину)"
            ],
            [
              "Masculine (soft)",
              "вчитель, Андрій",
              "вчителеві, Андрієві (or вчителю, Андрію)"
            ],
            [
              "Neuter",
              "місто, море",
              "місту, морю"
            ],
            [
              "Plural",
              "друзі, батьки, діти",
              "друзям, батькам, дітям"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я дам другові твій номер.",
            "en": "I’ll give my friend your number.",
            "note": "друг → другові (другу is also correct)."
          },
          {
            "tr": "Я вже написала подрузі.",
            "en": "I’ve already written to my friend.",
            "note": "подруга → подрузі: г changes to з before -і."
          },
          {
            "tr": "Увечері я подзвоню мамі.",
            "en": "I’ll call mom this evening.",
            "note": "мама → мамі."
          },
          {
            "tr": "Ми купили дітям морозиво.",
            "en": "We bought the children ice cream.",
            "note": "діти → дітям: the plural ending -ям."
          }
        ]
      },
      {
        "heading": "Pronouns in the dative",
        "body": "Pronouns have their own dative forms. Like the accusative ones, they often come **before** the verb in speech: **Я тобі подзвоню** (I’ll call you). The question word **хто** becomes **кому**.\n\nNote that **дякувати** (to thank) takes the dative: **Дякую вам!** And don’t mix up **мені** (to me) with **мене** (me): **Він мене бачить** (He sees me), but **Він мені пише** (He writes to me).",
        "table": {
          "head": [
            "Subject",
            "Dative",
            "Meaning"
          ],
          "rows": [
            [
              "я",
              "мені",
              "to me"
            ],
            [
              "ти",
              "тобі",
              "to you"
            ],
            [
              "він / воно",
              "йому",
              "to him, to it"
            ],
            [
              "вона",
              "їй",
              "to her"
            ],
            [
              "ми",
              "нам",
              "to us"
            ],
            [
              "ви",
              "вам",
              "to you (polite / plural)"
            ],
            [
              "вони",
              "їм",
              "to them"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Покажіть мені, будь ласка, меню.",
            "en": "Could you show me the menu, please?",
            "note": "я → мені."
          },
          {
            "tr": "Я тобі допоможу.",
            "en": "I’ll help you.",
            "note": "допомогти takes the dative: ти → тобі."
          },
          {
            "tr": "Дякую вам за допомогу!",
            "en": "Thank you for your help!",
            "note": "дякувати + dative: ви → вам."
          },
          {
            "tr": "Кому ти пишеш? — Братові.",
            "en": "Who are you writing to? — My brother.",
            "note": "хто → кому; the answer is in the dative too."
          }
        ]
      },
      {
        "heading": "Мені подобається and мені … років",
        "body": "Ukrainian turns “I like” around. The thing you like is the subject, and the person goes into the dative: **Мені подобається це місто**, literally “This city is pleasing to me”. The verb agrees with the thing: **подобається** for one thing or for an activity (**Мені подобається готувати**, I like cooking), **подобаються** for several things. For something you tried and liked, use the past of **сподобатися**: **сподобався, сподобалася, сподобалося, сподобалися**.\n\nAge works the same way. The person is in the dative, and the number is followed by **рік, роки** or **років**, as in the genitive lesson: **Мені двадцять років** (I’m twenty), **Синові п’ять років** (My son is five).",
        "examples": [
          {
            "tr": "Мені дуже подобається Львів.",
            "en": "I really like Lviv.",
            "note": "Львів is the subject; мені is “to me”."
          },
          {
            "tr": "Тобі подобаються українські пісні?",
            "en": "Do you like Ukrainian songs?",
            "note": "Several things → подобаються."
          },
          {
            "tr": "Нам сподобався цей фільм.",
            "en": "We liked this film.",
            "note": "Past: сподобався agrees with фільм (masculine)."
          },
          {
            "tr": "Скільки вам років? — Мені тридцять чотири роки.",
            "en": "How old are you? — I’m thirty-four.",
            "note": "34 ends in 4, so роки."
          },
          {
            "tr": "Бабусі вісімдесят років.",
            "en": "My grandma is eighty.",
            "note": "бабуся → бабусі; 80 takes років."
          }
        ]
      },
      {
        "heading": "Мені треба, мені холодно",
        "body": "A group of words that never change take the person in the dative. **Треба** (or **потрібно**) + infinitive means “need to, have to”; **можна** means “may”, and **не можна** “must not”. To need a **thing**, use **потрібен, потрібна, потрібне, потрібні**, which agrees with the thing: **Мені потрібна допомога** (I need help).\n\nFeelings and states work the same way: **мені холодно** (I’m cold), **жарко** (hot), **добре** (fine), **погано** (unwell), **сумно** (sad), **нудно** (bored), **важко** (it’s hard for me). Don’t say “я холодний”: that means you are cold to the touch. For the past add **було**, for the future **буде**: **Мені було холодно**.",
        "examples": [
          {
            "tr": "Вибач, мені треба йти.",
            "en": "Sorry, I have to go.",
            "note": "мені треба + infinitive."
          },
          {
            "tr": "Тобі не холодно? — Ні, мені тепло.",
            "en": "Aren’t you cold? — No, I’m warm.",
            "note": "Literally “Is it not cold to you?”"
          },
          {
            "tr": "Мені потрібен новий телефон.",
            "en": "I need a new phone.",
            "note": "потрібен agrees with телефон (masculine)."
          },
          {
            "tr": "Дітям було нудно.",
            "en": "The children were bored.",
            "note": "Past: було; діти → дітям."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Я пишу ___ (подруга, a friend).",
        "options": [
          "подругі",
          "подрузі",
          "подругу",
          "подругою"
        ],
        "answer": 1,
        "explain": "Feminine nouns take -і in the dative, and г changes to з before it: подрузі."
      },
      {
        "q": "How do you say “I like this film”?",
        "options": [
          "Мені подобається цей фільм.",
          "Я подобаюся цей фільм.",
          "Мене подобається цей фільм.",
          "Мені подобаються цей фільм."
        ],
        "answer": 0,
        "explain": "The person is in the dative (мені), and the verb agrees with фільм, one thing: подобається."
      },
      {
        "q": "How do you say “She is cold” (she feels cold)?",
        "options": [
          "Вона холодно.",
          "Її холодно.",
          "Їй холодна.",
          "Їй холодно."
        ],
        "answer": 3,
        "explain": "Feelings take the person in the dative and a word that doesn’t change: їй холодно."
      },
      {
        "q": "Я дам книжку ___ (брат, brother).",
        "options": [
          "брата",
          "братом",
          "братові",
          "браті"
        ],
        "answer": 2,
        "explain": "Masculine nouns for people take -ові in the dative: братові (брату is also correct)."
      }
    ]
  },
  {
    "id": "verbs-of-motion",
    "title": "Verbs of motion: іти, їхати, ходити, їздити",
    "level": "A2",
    "summary": "“To go” is four verbs in Ukrainian: on foot or by transport, one trip or a habit. Prefixes then add “arrive”, “leave” and “drop in”.",
    "sections": [
      {
        "heading": "On foot or by transport?",
        "body": "English “go” covers everything. Ukrainian first asks **how** you move. **Іти / йти** means to go **on foot**. **Їхати** (я їду, ти їдеш) means to go **by transport**: car, bus, train, bike. A trip to another city or country is always **їхати** (or **летіти**, to fly).\n\nSay how you travel with the instrumental and no preposition (**автобусом**, **потягом**, **машиною**) or with **на** + locative (**на автобусі**, **на велосипеді**, **на метро**). “On foot” is **пішки**. Both verbs describe **one trip in one direction**, happening now or already planned: **Завтра я їду до Києва**. Each has a partner for habits, shown in the table and explained in the next section.",
        "table": {
          "head": [
            "",
            "One trip, one direction",
            "Habit, or there and back"
          ],
          "rows": [
            [
              "On foot",
              "іти / йти",
              "ходити"
            ],
            [
              "By transport",
              "їхати",
              "їздити"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Куди ти йдеш? — Я йду в аптеку.",
            "en": "Where are you going? — I’m going to the pharmacy.",
            "note": "On foot, one trip, right now: іти / йти."
          },
          {
            "tr": "Завтра ми їдемо до Львова.",
            "en": "We’re going to Lviv tomorrow.",
            "note": "Another city means transport: їхати. до + genitive: Львів → Львова."
          },
          {
            "tr": "Ти їдеш автобусом чи на метро?",
            "en": "Are you going by bus or by metro?",
            "note": "автобус → автобусом (instrumental); метро never changes."
          },
          {
            "tr": "Тут недалеко, ми йдемо пішки.",
            "en": "It’s not far, we’re walking.",
            "note": "пішки means “on foot”."
          }
        ]
      },
      {
        "heading": "One trip or a habit?",
        "body": "**Ходити** (on foot) and **їздити** (by transport) describe habits, repeated trips, trips there and back, and movement in general. Words like **щодня** (every day), **часто** (often) and **завжди** (always) are a signal to use them. Compare **Я йду на роботу** (I’m on my way to work now) and **Я щодня ходжу на роботу пішки** (I walk to work every day).\n\n**Ходити** also means “to attend”: **ходити до школи**, **ходити на курси**. Watch the я forms: **ходжу** and **їжджу**.",
        "table": {
          "head": [
            "",
            "їхати",
            "ходити",
            "їздити"
          ],
          "rows": [
            [
              "я",
              "їду",
              "ходжу",
              "їжджу"
            ],
            [
              "ти",
              "їдеш",
              "ходиш",
              "їздиш"
            ],
            [
              "він / вона",
              "їде",
              "ходить",
              "їздить"
            ],
            [
              "ми",
              "їдемо",
              "ходимо",
              "їздимо"
            ],
            [
              "ви",
              "їдете",
              "ходите",
              "їздите"
            ],
            [
              "вони",
              "їдуть",
              "ходять",
              "їздять"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Діти ходять до школи.",
            "en": "The children go to school.",
            "note": "A habit: ходити. до + genitive: школа → школи."
          },
          {
            "tr": "Ми часто їздимо до Львова.",
            "en": "We often go to Lviv.",
            "note": "часто + transport → їздити."
          },
          {
            "tr": "Я їжджу на роботу велосипедом.",
            "en": "I cycle to work.",
            "note": "їздити → я їжджу; велосипед → велосипедом."
          },
          {
            "tr": "Ти часто ходиш у кіно?",
            "en": "Do you often go to the cinema?",
            "note": "ходити → ти ходиш."
          }
        ]
      },
      {
        "heading": "The past: ішов, їхав, ходив, їздив",
        "body": "The past of **іти** is irregular, as you saw in the past-tense lesson: **ішов / йшов**, **ішла / йшла**, **ішли / йшли**. The other three are regular: **їхав, їхала, їхали**; **ходив, ходила, ходили**; **їздив, їздила, їздили**.\n\nThe meanings differ. **Ішов** and **їхав** show someone in the middle of one trip: **Я йшов додому** (I was walking home). **Ходив** and **їздив** mean a trip **there and back**: **Учора ми ходили в кіно** (We went to the cinema yesterday, and came back). For “set off” or “left”, you need a prefix: see the next section.",
        "table": {
          "head": [
            "Infinitive",
            "він",
            "вона",
            "вони"
          ],
          "rows": [
            [
              "іти / йти",
              "ішов / йшов",
              "ішла / йшла",
              "ішли / йшли"
            ],
            [
              "їхати",
              "їхав",
              "їхала",
              "їхали"
            ],
            [
              "ходити",
              "ходив",
              "ходила",
              "ходили"
            ],
            [
              "їздити",
              "їздив",
              "їздила",
              "їздили"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Я йшла додому, коли ти подзвонив.",
            "en": "I was walking home when you called.",
            "note": "One trip in progress; a woman speaking: йшла."
          },
          {
            "tr": "Ми їхали п’ять годин.",
            "en": "We were on the road for five hours.",
            "note": "їхати → їхали."
          },
          {
            "tr": "У суботу ми ходили в театр.",
            "en": "On Saturday we went to the theater.",
            "note": "A trip there and back: ходили."
          },
          {
            "tr": "Влітку я їздив до Одеси.",
            "en": "I went to Odesa in the summer.",
            "note": "There and back by transport: їздив. Одеса → до Одеси."
          }
        ]
      },
      {
        "heading": "Prefixes: при-, по-, ви-, за-",
        "body": "Add a prefix to **іти** or **їхати** and you get a new **perfective** verb: one complete movement. After a prefix, іти is written **-йти**: **прийти**, **вийти**, **зайти**; with по- it becomes **піти**. The past follows ішов: **прийшов, пішла, вийшли**. Because these verbs are perfective, their present-style forms mean the future: **я прийду** (I’ll come), **ми поїдемо** (we’ll go).\n\n**При-** is arriving, **по-** is setting off, **ви-** is going out, and **за-** is dropping in on the way.",
        "table": {
          "head": [
            "Prefix",
            "Idea",
            "On foot",
            "By transport"
          ],
          "rows": [
            [
              "при-",
              "come, arrive",
              "прийти → прийшов",
              "приїхати → приїхав"
            ],
            [
              "по-",
              "go, set off",
              "піти → пішов",
              "поїхати → поїхав"
            ],
            [
              "ви-",
              "go out, leave",
              "вийти → вийшов",
              "виїхати → виїхав"
            ],
            [
              "за-",
              "drop in",
              "зайти → зайшов",
              "заїхати → заїхав"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Коли ти прийдеш додому?",
            "en": "When will you come home?",
            "note": "прийти → ти прийдеш: perfective, so it means the future."
          },
          {
            "tr": "Олени немає, вона вже пішла.",
            "en": "Olena isn’t here, she has already left.",
            "note": "по- + іти → піти; past: пішов, пішла."
          },
          {
            "tr": "Ми приїхали до Києва вранці.",
            "en": "We arrived in Kyiv in the morning.",
            "note": "при- + їхати: arriving by transport."
          },
          {
            "tr": "Він вийшов з дому рано.",
            "en": "He left the house early.",
            "note": "ви- + іти → вийти; з + genitive: дім → з дому."
          },
          {
            "tr": "Я зайду до тебе після роботи.",
            "en": "I’ll drop by your place after work.",
            "note": "за- + іти → зайти: a short visit on the way."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Я щодня ___ на роботу пішки. (I walk to work every day.)",
        "options": [
          "іду",
          "їду",
          "ходжу",
          "їжджу"
        ],
        "answer": 2,
        "explain": "щодня is a habit and пішки is on foot: ходити → я ходжу."
      },
      {
        "q": "Завтра ми ___ до Львова потягом. (Tomorrow we’re going to Lviv by train.)",
        "options": [
          "їдемо",
          "йдемо",
          "ходимо",
          "їздимо"
        ],
        "answer": 0,
        "explain": "One planned trip by transport: їхати → ми їдемо."
      },
      {
        "q": "What is the past of **іти** for **вона**?",
        "options": [
          "ітила",
          "ішов",
          "іділа",
          "ішла"
        ],
        "answer": 3,
        "explain": "іти is irregular in the past: ішов, ішла, ішли. Ішов is the masculine form."
      },
      {
        "q": "Which verb means “arrived (by transport)”?",
        "options": [
          "поїхав",
          "приїхав",
          "виїхав",
          "прийшов"
        ],
        "answer": 1,
        "explain": "при- means arriving and їхати is by transport; прийшов is “arrived on foot”."
      }
    ]
  },
  {
    "id": "imperative",
    "title": "Imperative: commands and requests",
    "level": "A2",
    "summary": "How to ask, tell and invite: читай / читайте, скажи / скажіть, не for “don’t”, давай for “let’s” and хай for “let him”.",
    "sections": [
      {
        "heading": "The ти form: читай, скажи, будь",
        "body": "You already know a few request forms from the lesson on politeness. Here is how they are built. Take the **ти** form of the present (for a perfective verb, of the future), drop **-еш / -єш / -иш**, and look at what is left. If it ends in a **vowel**, add **-й**: чита-єш → **читай**. If it ends in a **consonant**, add **-и** when the я form is stressed on its ending (я скажу → **скажи**), and add nothing when the stress stays on the stem (я буду → **будь**). In that last type, **д, т, з, с, л, н** are written with **ь**. One exception: verbs with the prefix **ви-**, which always takes the stress, keep the ending of the verb without the prefix: **іди → вийди**, **бери → вибери**.\n\nA few are irregular: **їсти → їж**, **дати → дай**, **пити → пий**. Verbs in **-ся** keep it: **дивитися → дивись** (or **дивися**).\n\nFor one action with a result, use the **perfective** verb (**Прочитай це**); for a process, a habit or an invitation, the **imperfective** (**Читай щодня**, **Сідай**).",
        "table": {
          "head": [
            "Infinitive",
            "ти form",
            "Command",
            "Pattern"
          ],
          "rows": [
            [
              "читати (read)",
              "читаєш",
              "читай",
              "vowel + -й"
            ],
            [
              "працювати (work)",
              "працюєш",
              "працюй",
              "vowel + -й"
            ],
            [
              "сказати (say, tell)",
              "скажеш",
              "скажи",
              "consonant + -и"
            ],
            [
              "купити (buy)",
              "купиш",
              "купи",
              "consonant + -и"
            ],
            [
              "взяти (take)",
              "візьмеш",
              "візьми",
              "consonant + -и"
            ],
            [
              "бути (be)",
              "будеш",
              "будь",
              "no ending, ь"
            ],
            [
              "сісти (sit down)",
              "сядеш",
              "сядь",
              "no ending, ь"
            ],
            [
              "вибачити (forgive)",
              "вибачиш",
              "вибач",
              "no ending"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Слухай, у мене є ідея!",
            "en": "Listen, I have an idea!",
            "note": "слухати → слухаєш → слухай."
          },
          {
            "tr": "Візьми парасольку, буде дощ.",
            "en": "Take an umbrella, it’s going to rain.",
            "note": "взяти → візьмеш → візьми."
          },
          {
            "tr": "Андрію, купи, будь ласка, хліб.",
            "en": "Andrii, buy some bread, please.",
            "note": "купити → купиш → купи; Андрію is the vocative."
          },
          {
            "tr": "Будь обережний!",
            "en": "Be careful!",
            "note": "бути → будеш → будь. To a woman: Будь обережна!"
          }
        ]
      },
      {
        "heading": "The ви form and softeners",
        "body": "For **ви** (polite, or several people), add **-те** to the ти form: **читай → читайте**, **будь → будьте**. If the ти form ends in **-и**, that ending becomes **-іть**: **скажи → скажіть**, **візьми → візьміть**.\n\nA bare command can sound abrupt, so add **будь ласка**, usually right after the verb or at the end. In casual speech you will also hear the particle **-но** attached to a command (**скажи-но**, **іди-но сюди**). It is colloquial and you don’t need it: **будь ласка** does the job.",
        "table": {
          "head": [
            "ти",
            "ви",
            "Meaning"
          ],
          "rows": [
            [
              "читай",
              "читайте",
              "read"
            ],
            [
              "сідай",
              "сідайте",
              "sit down, take a seat"
            ],
            [
              "заходь",
              "заходьте",
              "come in"
            ],
            [
              "будь",
              "будьте",
              "be"
            ],
            [
              "іди / йди",
              "ідіть / йдіть",
              "go"
            ],
            [
              "візьми",
              "візьміть",
              "take"
            ],
            [
              "дивись",
              "дивіться",
              "look"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Заходьте, будь ласка!",
            "en": "Come in, please!",
            "note": "заходити → заходь + -те."
          },
          {
            "tr": "Сідайте, тут вільно.",
            "en": "Have a seat, this place is free.",
            "note": "сідати → сідай + -те; the imperfective, because it is an invitation."
          },
          {
            "tr": "Напишіть, будь ласка, ваше ім’я.",
            "en": "Please write your name.",
            "note": "напиши → напишіть: -и becomes -іть."
          },
          {
            "tr": "Пані Олено, зачекайте хвилинку!",
            "en": "Olena, wait a minute!",
            "note": "зачекай + -те; пані Олено is the polite vocative."
          }
        ]
      },
      {
        "heading": "Don’t! не + imperative",
        "body": "To tell someone **not** to do something, put **не** before the command. The important point is aspect: a negative command normally uses the **imperfective** verb, even where the positive one is perfective. So **Скажи!** but **Не кажи!**, **Візьми!** but **Не бери!**, **Зачекай!** but **Не чекай!**\n\n**Не** + a **perfective** command is kept for warnings about something that could happen by accident: **Не забудь!** (Don’t forget!), **Не впади!** (Don’t fall!).",
        "table": {
          "head": [
            "Do it! (perfective)",
            "Don’t! (imperfective)",
            "Meaning"
          ],
          "rows": [
            [
              "скажи",
              "не кажи",
              "say, tell"
            ],
            [
              "візьми",
              "не бери",
              "take"
            ],
            [
              "зроби",
              "не роби",
              "do"
            ],
            [
              "купи",
              "не купуй",
              "buy"
            ],
            [
              "зачекай",
              "не чекай",
              "wait"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Не кажи мамі, це сюрприз.",
            "en": "Don’t tell mom, it’s a surprise.",
            "note": "скажи → не кажи: the imperfective after не."
          },
          {
            "tr": "Не чекайте на мене, я прийду пізніше.",
            "en": "Don’t wait for me, I’ll come later.",
            "note": "зачекайте → не чекайте."
          },
          {
            "tr": "Не хвилюйся, все буде добре.",
            "en": "Don’t worry, everything will be fine.",
            "note": "хвилюватися → хвилюєшся → хвилюйся."
          },
          {
            "tr": "Не забудь подзвонити бабусі!",
            "en": "Don’t forget to call grandma!",
            "note": "A warning, so the perfective забути is used."
          }
        ]
      },
      {
        "heading": "Let’s and let him: давай, хай",
        "body": "For “let’s”, everyday speech uses **давай** (to one person you call ти) or **давайте** (to several people, or politely) + the **ми** form of a perfective verb: **Давай подивимося фільм**. There is also a one-word form in **-мо / -імо**, which is preferred in careful writing: **ходімо** (let’s go), **почнімо** (let’s begin).\n\n**Хай** or **нехай** + a verb in the він / вона / вони form means “let him, let her, let them”, or expresses a wish: **Хай він зачекає** (Let him wait). The two words mean the same; хай is shorter and more conversational.",
        "examples": [
          {
            "tr": "Давай подивимося фільм.",
            "en": "Let’s watch a film.",
            "note": "давай + the ми form of подивитися."
          },
          {
            "tr": "Давайте замовимо піцу.",
            "en": "Let’s order pizza.",
            "note": "давайте: to several people; замовити → замовимо."
          },
          {
            "tr": "Ходімо додому!",
            "en": "Let’s go home!",
            "note": "The one-word “let’s” form of ходити."
          },
          {
            "tr": "Хай він подзвонить мені завтра.",
            "en": "Have him call me tomorrow.",
            "note": "хай + the він form of подзвонити."
          },
          {
            "tr": "Хай щастить!",
            "en": "Good luck!",
            "note": "A wish with хай."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "What is the **ви** form of **візьми** (take)?",
        "options": [
          "візьмете",
          "візьміть",
          "візьмите",
          "візьмийте"
        ],
        "answer": 1,
        "explain": "A ти form in -и changes it to -іть: візьміть. Візьмете is the future, “you will take”."
      },
      {
        "q": "How do you say “Don’t wait for me” to a friend?",
        "options": [
          "Не чекай на мене.",
          "Не зачекай на мене.",
          "Ні чекай на мене.",
          "Не чекати на мене."
        ],
        "answer": 0,
        "explain": "не + the imperfective command: зачекай → не чекай."
      },
      {
        "q": "How do you say “Let’s watch a film”?",
        "options": [
          "Давай подивився фільм.",
          "Давай подивляться фільм.",
          "Давай подивимося фільм.",
          "Давай подивилися фільм."
        ],
        "answer": 2,
        "explain": "давай + the ми form of the perfective verb: подивимося."
      },
      {
        "q": "What does **Хай він зачекає** mean?",
        "options": [
          "He is waiting.",
          "Let’s wait for him.",
          "Don’t wait for him.",
          "Let him wait."
        ],
        "answer": 3,
        "explain": "хай + a він form means “let him …”."
      }
    ]
  },
  {
    "id": "adjectives-comparison",
    "title": "Comparing: bigger, better, the best",
    "level": "B1",
    "summary": "A one-table recap of adjective agreement, then the comparative (-іший, -ший), the superlative with най- and three ways to say “than”.",
    "sections": [
      {
        "heading": "Agreement recap: hard and soft adjectives",
        "body": "An adjective copies the gender and number of its noun. Most adjectives are **hard**: **-ий, -а, -е** and plural **-і**. A smaller **soft** group, almost all ending in **-ній**, uses **-ій, -я, -є, -і**: **синій** (blue), **останній** (last), **домашній** (home, homemade), **сьогоднішній** (today’s), **літній** (summer), **пізній** (late).\n\nThis matters here because every comparative and superlative below is an ordinary hard adjective: **новіший, новіша, новіше, новіші**.",
        "table": {
          "head": [
            "",
            "Masculine",
            "Feminine",
            "Neuter",
            "Plural"
          ],
          "rows": [
            [
              "Hard endings",
              "-ий",
              "-а",
              "-е",
              "-і"
            ],
            [
              "new",
              "новий",
              "нова",
              "нове",
              "нові"
            ],
            [
              "cheap",
              "дешевий",
              "дешева",
              "дешеве",
              "дешеві"
            ],
            [
              "Soft endings",
              "-ій",
              "-я",
              "-є",
              "-і"
            ],
            [
              "blue",
              "синій",
              "синя",
              "синє",
              "сині"
            ],
            [
              "last",
              "останній",
              "остання",
              "останнє",
              "останні"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Це дуже цікава книжка.",
            "en": "This is a very interesting book.",
            "note": "книжка is feminine → цікава."
          },
          {
            "tr": "Сьогодні останній день відпустки.",
            "en": "Today is the last day of my vacation.",
            "note": "A soft adjective, masculine: останній."
          },
          {
            "tr": "Домашня їжа завжди смачна.",
            "en": "Home-cooked food is always tasty.",
            "note": "їжа is feminine: soft домашня, hard смачна."
          },
          {
            "tr": "Ці черевики занадто великі.",
            "en": "These shoes are too big.",
            "note": "Plural: -і for every gender."
          }
        ]
      },
      {
        "heading": "Comparative: -іший and -ший",
        "body": "For most adjectives, drop the ending and add **-іший**: **новий → новіший**, **теплий → тепліший**. A number of common ones take the shorter **-ший** instead (**дешевий → дешевший**, **молодий → молодший**), often losing **-к-** or **-ок-** first: **легкий → легший**, **швидкий → швидший**, **широкий → ширший**. In a few, the sounds merge: **дорогий → дорожчий**, **високий → вищий**, **низький → нижчий**, **близький → ближчий**. Four everyday pairs are irregular: see the end of the table.\n\nUse **набагато** (much) or **трохи** (a little) to grade the difference: **набагато дешевший**. The neuter form also works as an adverb: **Говоріть повільніше** (Speak more slowly). You can also say **більш** + the plain adjective (**більш зручний**, more comfortable), but never both at once: not “більш зручніший”.",
        "table": {
          "head": [
            "Adjective",
            "Comparative",
            "Meaning"
          ],
          "rows": [
            [
              "новий",
              "новіший",
              "newer"
            ],
            [
              "теплий",
              "тепліший",
              "warmer"
            ],
            [
              "цікавий",
              "цікавіший",
              "more interesting"
            ],
            [
              "дешевий",
              "дешевший",
              "cheaper"
            ],
            [
              "молодий / старий",
              "молодший / старший",
              "younger / older"
            ],
            [
              "дорогий",
              "дорожчий",
              "more expensive"
            ],
            [
              "добрий, хороший",
              "кращий",
              "better"
            ],
            [
              "поганий",
              "гірший",
              "worse"
            ],
            [
              "великий",
              "більший",
              "bigger"
            ],
            [
              "малий, маленький",
              "менший",
              "smaller"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Цей телефон новіший, але дорожчий.",
            "en": "This phone is newer but more expensive.",
            "note": "новий → новіший; дорогий → дорожчий."
          },
          {
            "tr": "Ця кімната більша й світліша.",
            "en": "This room is bigger and brighter.",
            "note": "Feminine -а: великий → більша, світлий → світліша."
          },
          {
            "tr": "У вас є щось дешевше?",
            "en": "Do you have anything cheaper?",
            "note": "Neuter дешевше agrees with щось."
          },
          {
            "tr": "Моя сестра молодша, а брат старший.",
            "en": "My sister is younger, and my brother is older.",
            "note": "молодий → молодший, старий → старший."
          },
          {
            "tr": "Мені вже набагато краще.",
            "en": "I’m feeling much better now.",
            "note": "краще as an adverb, with мені in the dative."
          }
        ]
      },
      {
        "heading": "Than: ніж, за, від",
        "body": "There are three standard ways to say “than”. **Ніж** is followed by the same form you would use without it, usually the nominative, and it is the one to use before an adverb or a whole clause: **Сьогодні тепліше, ніж учора**. Write a comma before it.\n\nWith a noun or pronoun you can also use a preposition: **за** + accusative (**старший за брата**, **за мене**) or **від** + genitive (**старший від брата**, **від мене**). All three mean the same. After за and від, the pronouns він, вона, вони begin with н-: **за нього, за неї, за них**. To say by how much, add **на**: **на два роки старший**.",
        "table": {
          "head": [
            "",
            "Followed by",
            "Example"
          ],
          "rows": [
            [
              "ніж",
              "the same form (nominative)",
              "Київ більший, ніж Львів."
            ],
            [
              "за",
              "accusative",
              "Київ більший за Львів."
            ],
            [
              "від",
              "genitive",
              "Київ більший від Львова."
            ]
          ]
        },
        "examples": [
          {
            "tr": "Мій брат старший за мене на два роки.",
            "en": "My brother is two years older than me.",
            "note": "за + accusative: я → мене; на два роки gives the difference."
          },
          {
            "tr": "Чай дешевший від кави.",
            "en": "Tea is cheaper than coffee.",
            "note": "від + genitive: кава → кави."
          },
          {
            "tr": "Сьогодні холодніше, ніж учора.",
            "en": "It’s colder today than yesterday.",
            "note": "Before an adverb (учора), use ніж."
          },
          {
            "tr": "Потяг швидший за автобус.",
            "en": "The train is faster than the bus.",
            "note": "за + accusative: автобус is a thing, so it doesn’t change."
          }
        ]
      },
      {
        "heading": "Superlative: най-",
        "body": "For “the most”, put **най-** in front of the **comparative**, not the plain adjective: **новіший → найновіший**, **кращий → найкращий**, **більший → найбільший**. The result is again an ordinary adjective that agrees with its noun: **найкраща подруга**, **найкращі друзі**.\n\nSay where or among what with **в / у** + locative (**у світі**, in the world; **в Україні**) or **з** + genitive plural (**найкращий з усіх**, the best of all).",
        "examples": [
          {
            "tr": "Це найкраща кав’ярня в місті.",
            "en": "This is the best café in town.",
            "note": "кращий → найкраща (кав’ярня is feminine)."
          },
          {
            "tr": "Говерла — найвища гора в Україні.",
            "en": "Hoverla is the highest mountain in Ukraine.",
            "note": "високий → вищий → найвища."
          },
          {
            "tr": "Який квиток найдешевший?",
            "en": "Which ticket is the cheapest?",
            "note": "дешевший → найдешевший."
          },
          {
            "tr": "Моя наймолодша сестра ще ходить до школи.",
            "en": "My youngest sister still goes to school.",
            "note": "молодший → наймолодша."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Choose the right form: ___ їжа (home-cooked food).",
        "options": [
          "домашній",
          "домашнє",
          "домашна",
          "домашня"
        ],
        "answer": 3,
        "explain": "їжа is feminine and домашній is a soft adjective, so the ending is -я: домашня."
      },
      {
        "q": "What is the comparative of **теплий** (warm)?",
        "options": [
          "найтеплий",
          "теплший",
          "тепліший",
          "більш тепліший"
        ],
        "answer": 2,
        "explain": "Most adjectives add -іший: тепліший. Най- makes a superlative, and більш is never added to a comparative."
      },
      {
        "q": "Київ більший ___ Львів. (Kyiv is bigger than Lviv.)",
        "options": [
          "за",
          "від",
          "з",
          "на"
        ],
        "answer": 0,
        "explain": "за takes the accusative, and Львів doesn’t change. Від would need the genitive: від Львова."
      },
      {
        "q": "“This is the best café.” Це ___ кав’ярня.",
        "options": [
          "найкращий",
          "найкраща",
          "найдобра",
          "кращіша"
        ],
        "answer": 1,
        "explain": "най- + the comparative кращий, in the feminine to match кав’ярня: найкраща."
      }
    ]
  },
  {
    "id": "spoken-vs-written",
    "title": "Spoken vs written Ukrainian",
    "level": "B1",
    "summary": "How people really talk: sound-smoothing rules, shortened words and fillers, side by side with the careful written forms.",
    "sections": [
      {
        "heading": "Sound-smoothing: у / в, і / й, з / із / зі",
        "body": "Ukrainian dislikes piling up consonants or vowels, a quality called **милозвучність** (euphony). So several small words have two or three forms, chosen by the sounds around them: **у** or **в**, **і** or **й**, **з**, **із** or **зі**. Many common words follow suit: **вже / уже**, **вчора / учора**, **вдома / удома**, **іти / йти**.\n\nThe basic rule: after a **vowel**, use **в** and **й**; between **consonants**, use **у** and **і**. One exception: before **в, ф** and clusters such as **льв, св, хв**, always use **у**, even after a vowel: **Ми живемо у Львові**. In speech this happens naturally; careful writers follow it, while casual texts often ignore it.",
        "table": {
          "head": [
            "Rule",
            "Example"
          ],
          "rows": [
            [
              "**в** after a vowel",
              "Вона **в** школі. (She’s at school.)"
            ],
            [
              "**у** between consonants",
              "Брат **у** школі. (My brother’s at school.)"
            ],
            [
              "**й** after a vowel",
              "мама **й** тато (mom and dad)"
            ],
            [
              "**і** between consonants",
              "брат **і** сестра (brother and sister)"
            ],
            [
              "**зі** before some clusters",
              "**зі** мною (with me)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Мама й тато вдома.",
            "en": "Mom and dad are home.",
            "note": "й after the vowel at the end of мама."
          },
          {
            "tr": "Я вже вдома, а брат уже спить.",
            "en": "I’m already home, and my brother is already asleep.",
            "note": "вже after a vowel, уже after a consonant."
          }
        ]
      },
      {
        "heading": "Written vs spoken, side by side",
        "body": "In conversation people shorten words, drop pronouns and use little fillers. None of this is wrong in speech, but in writing, emails and formal situations stick to the left column.",
        "table": {
          "head": [
            "Written / careful",
            "Everyday speech",
            "Meaning"
          ],
          "rows": [
            [
              "що",
              "шо",
              "what, that"
            ],
            [
              "немає",
              "нема",
              "there isn’t"
            ],
            [
              "так",
              "ага, угу",
              "yes, uh-huh"
            ],
            [
              "добре",
              "окей, норм (slang)",
              "OK, fine"
            ],
            [
              "до побачення",
              "бувай, давай",
              "bye"
            ],
            [
              "Скільки коштують яблука?",
              "Почому яблука?",
              "How much are the apples?"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Шо робиш?",
            "en": "What are you up to?",
            "note": "Written: Що ти робиш?"
          },
          {
            "tr": "Мене нема вдома.",
            "en": "I’m not home.",
            "note": "Written: Мене немає вдома."
          }
        ]
      },
      {
        "heading": "Conversation in practice",
        "body": "Spoken Ukrainian is full of short reactions: **та** (“oh”, “come on”) softens an answer, **ну** (“well”) buys time, and **давай** works as “OK” or “bye”. In writing, **та** also simply means “and”.\n\nYou will also hear **суржик**, a mix of Ukrainian and Russian: for example **канєшно** instead of **звичайно** (of course). It is useful to recognize it, but aim for standard Ukrainian yourself.",
        "examples": [
          {
            "tr": "Та ні, все норм.",
            "en": "Nah, everything’s fine.",
            "note": "Written: Ні, усе добре."
          },
          {
            "tr": "Ну давай, до завтра!",
            "en": "OK then, see you tomorrow!",
            "note": "давай as a goodbye belongs to speech."
          },
          {
            "tr": "Ну, не знаю…",
            "en": "Well, I don’t know…",
            "note": "ну buys you a moment to think."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "In everyday speech, **шо** usually stands for…",
        "options": [
          "що (what)",
          "ще (still, more)",
          "шість (six)",
          "чи (or)"
        ],
        "answer": 0,
        "explain": "шо is the common spoken form of що."
      },
      {
        "q": "Which phrase follows the sound-smoothing rule?",
        "options": [
          "брат й сестра",
          "Вона у школі.",
          "мама й тато",
          "Він в школі."
        ],
        "answer": 2,
        "explain": "After a vowel (мама) use й; between consonants use і and у."
      },
      {
        "q": "A friend says **Давай!** as they leave. What does it mean here?",
        "options": [
          "Give it to me!",
          "Hurry up!",
          "Let’s start!",
          "Bye, see you!"
        ],
        "answer": 3,
        "explain": "In casual speech давай is a common way to say goodbye."
      },
      {
        "q": "What is the careful written form of **Нема хліба**?",
        "options": [
          "Немає хліба.",
          "Нема хліб.",
          "Не є хліба.",
          "Ні хліба."
        ],
        "answer": 0,
        "explain": "нема is the spoken short form of немає, which still takes the genitive."
      }
    ]
  }
];
