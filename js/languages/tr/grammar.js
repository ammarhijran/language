// Grammar lessons (explanations, tables, examples, quiz). Written and proofread
// with AI assistance; not yet reviewed by native speakers. Edit freely.
export const lessons = [
  {
    "id": "vowel-harmony",
    "title": "Vowel harmony and plurals",
    "level": "A1",
    "summary": "Turkish endings change their vowel to match the last vowel of the word, and the plural -ler / -lar is the first place you will see it.",
    "sections": [
      {
        "heading": "Front and back vowels",
        "body": "Turkish has eight vowels. Four are made at the **back** of the mouth (a, ı, o, u) and four at the **front** (e, i, ö, ü). Four are **rounded**, said with your lips pushed forward (o, ö, u, ü), and four are not (a, e, ı, i).\n\nTurkish builds words by stacking endings (suffixes) onto a root, and almost every ending comes in several versions. You choose the version by looking at the **last vowel** of the word you are adding it to. This is **vowel harmony** (ünlü uyumu), and it is the most useful rule in Turkish grammar.",
        "table": {
          "head": [
            "",
            "Unrounded",
            "Rounded"
          ],
          "rows": [
            [
              "Back",
              "a, ı",
              "o, u"
            ],
            [
              "Front",
              "e, i",
              "ö, ü"
            ]
          ]
        }
      },
      {
        "heading": "Two-way harmony: e or a (plurals)",
        "body": "Some endings have just two forms, one with **e** and one with **a**. The plural ending is the classic example: **-ler** after a front vowel (e, i, ö, ü) and **-lar** after a back vowel (a, ı, o, u). However long the word is, only its last vowel matters.\n\nAfter a number, or after **çok** (many) and **kaç** (how many), the noun stays singular: **iki kedi** (two cats), never “iki kediler”.",
        "table": {
          "head": [
            "Last vowel",
            "Ending",
            "Examples"
          ],
          "rows": [
            [
              "e, i, ö, ü",
              "**-ler**",
              "ev → evler, kedi → kediler, göz → gözler, gün → günler"
            ],
            [
              "a, ı, o, u",
              "**-lar**",
              "masa → masalar, kız → kızlar, okul → okullar, kuş → kuşlar"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Çocuklar okulda.",
            "en": "The children are at school.",
            "note": "çocuk + -lar: the last vowel u is a back vowel."
          },
          {
            "tr": "Bu kitaplar çok pahalı.",
            "en": "These books are very expensive.",
            "note": "kitap + -lar. “These” is simply bu + a plural noun."
          },
          {
            "tr": "İki kedi ve üç köpek var.",
            "en": "There are two cats and three dogs.",
            "note": "No plural ending after a number."
          }
        ]
      },
      {
        "heading": "Four-way harmony: i, ı, u or ü",
        "body": "Many other endings have four forms: **i, ı, u, ü**. Ask two questions about the last vowel: is it front or back, and is it rounded? a or ı → **ı**; e or i → **i**; o or u → **u**; ö or ü → **ü**.\n\nYou will meet this pattern in the “to be” endings, possessives, the question word mi and the past tense. Learn this table once and it works everywhere.",
        "table": {
          "head": [
            "Last vowel",
            "Ending vowel",
            "Example with mi (question)"
          ],
          "rows": [
            [
              "a, ı",
              "**ı**",
              "Pahalı **mı**? (Is it expensive?)"
            ],
            [
              "e, i",
              "**i**",
              "Yeni **mi**? (Is it new?)"
            ],
            [
              "o, u",
              "**u**",
              "Soğuk **mu**? (Is it cold?)"
            ],
            [
              "ö, ü",
              "**ü**",
              "Türk **mü**? (Is he / she Turkish?)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Ev büyük mü?",
            "en": "Is the house big?",
            "note": "büyük ends in ü, so the question word is mü."
          },
          {
            "tr": "Okul uzak mı?",
            "en": "Is the school far?",
            "note": "uzak ends in a, so the question word is mı."
          }
        ]
      },
      {
        "heading": "Words that break the rule",
        "body": "A few endings never change: the **o** in **-yor** (the present continuous) is always o. Some borrowed words also take front-vowel endings even though their last vowel is a back vowel: **saat → saatler** (hours), **harf → harfler** (letters), **gol → goller** (goals). Learn these as you meet them."
      }
    ],
    "quiz": [
      {
        "q": "What is the plural of **göz** (eye)?",
        "options": [
          "gözlar",
          "gözler",
          "gözlür",
          "gözlor"
        ],
        "answer": 1,
        "explain": "The last vowel ö is a front vowel, so the plural ending is -ler."
      },
      {
        "q": "Which plural is correct?",
        "options": [
          "kitapler",
          "masaler",
          "kızler",
          "okullar"
        ],
        "answer": 3,
        "explain": "The last vowel of okul is u, a back vowel, so it takes -lar."
      },
      {
        "q": "Complete: Doktor ___? (Is he a doctor?)",
        "options": [
          "mi",
          "mı",
          "mu",
          "mü"
        ],
        "answer": 2,
        "explain": "The last vowel o is back and rounded, so the four-way ending uses u."
      },
      {
        "q": "How do you say “three books”?",
        "options": [
          "üç kitap",
          "üç kitaplar",
          "üçler kitap",
          "kitaplar üç"
        ],
        "answer": 0,
        "explain": "After a number the noun stays singular."
      }
    ]
  },
  {
    "id": "to-be",
    "title": "I am, you are: the “to be” endings",
    "level": "A1",
    "summary": "Turkish has no separate word for “am / is / are”; you add a small personal ending to the noun or adjective instead.",
    "sections": [
      {
        "heading": "Endings instead of a verb",
        "body": "To say “I am a teacher”, Turkish adds an ending to the word itself: **öğretmen** (teacher) → **öğretmenim** (I am a teacher). The endings follow four-way vowel harmony. When the word ends in a vowel, a **y** is slipped in before -ım and -ız so that two vowels don't meet: **hasta** → **hastayım** (I am ill).\n\nThe pronouns (ben, sen, o…) are usually left out, because the ending already shows who you mean. Use them only for emphasis or contrast.",
        "table": {
          "head": [
            "Person",
            "Ending",
            "öğretmen (teacher)",
            "hasta (ill)",
            "yorgun (tired)"
          ],
          "rows": [
            [
              "ben (I)",
              "-(y)ım, -(y)im, -(y)um, -(y)üm",
              "öğretmenim",
              "hastayım",
              "yorgunum"
            ],
            [
              "sen (you)",
              "-sın, -sin, -sun, -sün",
              "öğretmensin",
              "hastasın",
              "yorgunsun"
            ],
            [
              "o (he / she / it)",
              "(no ending)",
              "öğretmen",
              "hasta",
              "yorgun"
            ],
            [
              "biz (we)",
              "-(y)ız, -(y)iz, -(y)uz, -(y)üz",
              "öğretmeniz",
              "hastayız",
              "yorgunuz"
            ],
            [
              "siz (you, plural / polite)",
              "-sınız, -siniz, -sunuz, -sünüz",
              "öğretmensiniz",
              "hastasınız",
              "yorgunsunuz"
            ],
            [
              "onlar (they)",
              "-lar, -ler (often left out)",
              "öğretmenler",
              "hastalar",
              "yorgunlar"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Ben Kanadalıyım.",
            "en": "I'm Canadian.",
            "note": "Kanadalı ends in a vowel, so a y comes in: Kanadalı-y-ım."
          },
          {
            "tr": "Çok yorgunum.",
            "en": "I'm very tired.",
            "note": "yorgun + -um, because the last vowel is u."
          },
          {
            "tr": "Çok naziksiniz.",
            "en": "You are very kind.",
            "note": "nazik + -siniz: the polite “you”."
          },
          {
            "tr": "Onlar kardeş.",
            "en": "They are siblings.",
            "note": "With onlar, the plural ending is often dropped."
          }
        ]
      },
      {
        "heading": "Not: değil",
        "body": "To say “I am not”, put **değil** after the word and move the personal ending onto değil: **değilim, değilsin, değil, değiliz, değilsiniz, değiller**. Because değil always has the vowel i, these forms never change.",
        "table": {
          "head": [
            "Person",
            "Negative",
            "Example"
          ],
          "rows": [
            [
              "ben",
              "değilim",
              "Aç değilim. (I'm not hungry.)"
            ],
            [
              "sen",
              "değilsin",
              "Yalnız değilsin. (You're not alone.)"
            ],
            [
              "o",
              "değil",
              "Uzak değil. (It's not far.)"
            ],
            [
              "biz",
              "değiliz",
              "Evli değiliz. (We're not married.)"
            ],
            [
              "siz",
              "değilsiniz",
              "Haksız değilsiniz. (You're not wrong.)"
            ],
            [
              "onlar",
              "değil(ler)",
              "Evde değiller. (They're not at home.)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Bu kahve sıcak değil.",
            "en": "This coffee isn't hot.",
            "note": "değil comes after the adjective."
          },
          {
            "tr": "Biz turist değiliz.",
            "en": "We aren't tourists.",
            "note": "The ending -iz goes on değil, not on turist."
          }
        ]
      },
      {
        "heading": "-dir: “is” on signs, and “probably”",
        "body": "In writing you will often see **-dir / -dır / -dur / -dür** added to the he / she / it form (after ç, f, h, k, p, s, ş, t it becomes **-tir, -tır, -tur, -tür**). On signs, in news and in textbooks it sounds formal and certain.\n\nIn conversation, **-dir** after he / she / it usually means “probably” or “must be”: **Yorgundur.** = He must be tired.",
        "examples": [
          {
            "tr": "Sigara içmek yasaktır.",
            "en": "Smoking is forbidden.",
            "note": "yasak + -tır: formal, typical of signs."
          },
          {
            "tr": "Ali şimdi evdedir.",
            "en": "Ali is probably at home now.",
            "note": "In speech, -dir adds “probably”."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “I am tired”? (tired = yorgun)",
        "options": [
          "Ben yorgun.",
          "Yorgunım.",
          "Yorgunum.",
          "Yorgunyum."
        ],
        "answer": 2,
        "explain": "The last vowel is u, so the ending is -um, with no y after a consonant."
      },
      {
        "q": "Which means “You are a doctor” (polite)?",
        "options": [
          "Doktorsun.",
          "Doktorsunuz.",
          "Doktoruz.",
          "Doktorlar."
        ],
        "answer": 1,
        "explain": "-sunuz is the siz ending, used for the polite “you” and for several people."
      },
      {
        "q": "Make “I am ill” from **hasta**.",
        "options": [
          "Hastam.",
          "Hastaım.",
          "Hastasım.",
          "Hastayım."
        ],
        "answer": 3,
        "explain": "hasta ends in a vowel, so a buffer y comes before -ım (hastam means “my patient”)."
      },
      {
        "q": "How do you say “We are not ready”? (ready = hazır)",
        "options": [
          "Hazır değiliz.",
          "Hazırız değil.",
          "Değil hazırız.",
          "Hazır değilsiniz."
        ],
        "answer": 0,
        "explain": "değil comes after the word and carries the personal ending: değil + iz."
      }
    ]
  },
  {
    "id": "questions",
    "title": "Asking questions: mi and question words",
    "level": "A1",
    "summary": "Yes/no questions use the little word mi, which follows vowel harmony, and open questions use words like ne, nerede and kim.",
    "sections": [
      {
        "heading": "Yes/no questions with mi",
        "body": "To turn a statement into a yes/no question, put **mi** (or mı, mu, mü, by four-way harmony) right after the word you are asking about. It is written as a separate word but said together with the word before it, and the stress falls on the syllable just before it: has-TA mı?\n\nThe personal ending moves onto mi: **Hasta mısın?** (Are you ill?), **Hazır mıyız?** (Are we ready?).",
        "table": {
          "head": [
            "Person",
            "Question word",
            "Example"
          ],
          "rows": [
            [
              "ben",
              "mıyım, miyim, muyum, müyüm",
              "Haklı mıyım? (Am I right?)"
            ],
            [
              "sen",
              "mısın, misin, musun, müsün",
              "Hazır mısın? (Are you ready?)"
            ],
            [
              "o",
              "mı, mi, mu, mü",
              "Uzak mı? (Is it far?)"
            ],
            [
              "biz",
              "mıyız, miyiz, muyuz, müyüz",
              "Doğru yerde miyiz? (Are we in the right place?)"
            ],
            [
              "siz",
              "mısınız, misiniz, musunuz, müsünüz",
              "Türk müsünüz? (Are you Turkish?)"
            ],
            [
              "onlar",
              "-lar / -ler + mı / mi",
              "Hazırlar mı? (Are they ready?)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Hasta mısın?",
            "en": "Are you ill?",
            "note": "The ending -sın goes on mı, not on hasta."
          },
          {
            "tr": "Hava güzel, değil mi?",
            "en": "The weather is nice, isn't it?",
            "note": "değil mi? at the end works like “isn't it? / right?”."
          }
        ]
      },
      {
        "heading": "Move mi to change the focus",
        "body": "Because mi sits right after the word you are asking about, moving it changes the question. After the verb it gives a neutral question; after another word it asks about that word specifically.",
        "examples": [
          {
            "tr": "Ali yarın geliyor mu?",
            "en": "Is Ali coming tomorrow?",
            "note": "mu after the verb (geliyor = is coming): a neutral question."
          },
          {
            "tr": "Ali yarın mı geliyor?",
            "en": "Is Ali coming tomorrow (and not another day)?",
            "note": "mı after yarın: the question is about the day."
          },
          {
            "tr": "Yarın Ali mi geliyor?",
            "en": "Is it Ali who's coming tomorrow?",
            "note": "mi after Ali: the question is about the person."
          }
        ]
      },
      {
        "heading": "Question words",
        "body": "With a question word you do **not** add mi. The question word usually sits just before the verb, in the place where the answer would go.",
        "table": {
          "head": [
            "Word",
            "Meaning",
            "Example"
          ],
          "rows": [
            [
              "ne",
              "what",
              "Ne istiyorsun? (What do you want?)"
            ],
            [
              "kim",
              "who",
              "Kim o? (Who is it?)"
            ],
            [
              "nerede",
              "where (at)",
              "Tuvalet nerede? (Where is the toilet?)"
            ],
            [
              "nereye",
              "where (to)",
              "Nereye gidiyorsun? (Where are you going?)"
            ],
            [
              "nereden",
              "where from",
              "Nereden geliyorsun? (Where are you coming from?)"
            ],
            [
              "ne zaman",
              "when",
              "Tren ne zaman kalkıyor? (When does the train leave?)"
            ],
            [
              "neden / niye",
              "why",
              "Neden gülüyorsun? (Why are you laughing?)"
            ],
            [
              "nasıl",
              "how",
              "Oraya nasıl gidebilirim? (How can I get there?)"
            ],
            [
              "kaç",
              "how many",
              "Kaç kardeşin var? (How many siblings do you have?)"
            ],
            [
              "ne kadar",
              "how much",
              "Bilet ne kadar? (How much is the ticket?)"
            ],
            [
              "hangi",
              "which",
              "Hangi otobüs Taksim'e gidiyor? (Which bus goes to Taksim?)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Nerelisiniz? — İngiltereliyim.",
            "en": "Where are you from? — I'm from England.",
            "note": "nereli (from where) + -siniz; answer with -li: İngiltere-li-yim."
          },
          {
            "tr": "Bu akşam ne yapıyoruz?",
            "en": "What are we doing this evening?",
            "note": "No mi: the question word does the job."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "Complete: Öğrenci ___? (Are you a student? — polite)",
        "options": [
          "misiniz",
          "mısınız",
          "musunuz",
          "müsünüz"
        ],
        "answer": 0,
        "explain": "The last vowel i gives mi, plus the siz ending: misiniz."
      },
      {
        "q": "Which question is correct?",
        "options": [
          "Nerede mi banka?",
          "Banka nerede?",
          "Banka nerede mi?",
          "Mi banka nerede?"
        ],
        "answer": 1,
        "explain": "With a question word like nerede you don't add mi."
      },
      {
        "q": "In **Ali yarın mı geliyor?**, what is being asked about?",
        "options": [
          "Who is coming",
          "Whether anyone is coming",
          "When Ali is coming",
          "Where Ali is going"
        ],
        "answer": 2,
        "explain": "mı directly follows yarın (tomorrow), so the question is about the time."
      },
      {
        "q": "How do you ask “Are you ready?” (informal, ready = hazır)",
        "options": [
          "Hazırsın mı?",
          "Hazır misin?",
          "Mı hazırsın?",
          "Hazır mısın?"
        ],
        "answer": 3,
        "explain": "The personal ending goes on the question word: hazır + mı + sın."
      }
    ]
  },
  {
    "id": "possessives",
    "title": "My, your, his: possessive endings",
    "level": "A1",
    "summary": "Instead of words like “my” and “your”, Turkish adds an ending to the noun: ev → evim (my house).",
    "sections": [
      {
        "heading": "The endings",
        "body": "In the table, **i** stands for i, ı, u or ü (four-way harmony), and the part in brackets is dropped after a vowel: **ev → evim** (my house) but **araba → arabam** (my car). For his / her / its, the **s** of -(s)i appears only after a vowel: **evi** (his house), **arabası** (her car).",
        "table": {
          "head": [
            "Owner",
            "Ending",
            "ev (house)",
            "araba (car)",
            "okul (school)"
          ],
          "rows": [
            [
              "benim (my)",
              "-(i)m",
              "evim",
              "arabam",
              "okulum"
            ],
            [
              "senin (your)",
              "-(i)n",
              "evin",
              "araban",
              "okulun"
            ],
            [
              "onun (his / her / its)",
              "-(s)i",
              "evi",
              "arabası",
              "okulu"
            ],
            [
              "bizim (our)",
              "-(i)miz",
              "evimiz",
              "arabamız",
              "okulumuz"
            ],
            [
              "sizin (your, plural / polite)",
              "-(i)niz",
              "eviniz",
              "arabanız",
              "okulunuz"
            ],
            [
              "onların (their)",
              "-leri / -ları",
              "evleri",
              "arabaları",
              "okulları"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Annem öğretmen, babam doktor.",
            "en": "My mother is a teacher, my father is a doctor.",
            "note": "anne + -m, baba + -m: after a vowel, just -m."
          },
          {
            "tr": "Telefonun nerede?",
            "en": "Where is your phone?",
            "note": "telefon + -un, because the last vowel is o."
          },
          {
            "tr": "Evimiz çok küçük.",
            "en": "Our house is very small.",
            "note": "ev + -imiz."
          }
        ]
      },
      {
        "heading": "The owner words are optional",
        "body": "**benim, senin, onun, bizim, sizin, onların** are optional, because the ending already says who owns it. Use them for emphasis or contrast. **Benim adım Ayşe.** (My name is Ayşe.) is the usual way to introduce yourself, but **Adım Ayşe.** is just as correct.",
        "examples": [
          {
            "tr": "Benim adım Ayşe.",
            "en": "My name is Ayşe.",
            "note": "ad (name) + -ım = adım."
          },
          {
            "tr": "Bu senin çantan mı?",
            "en": "Is this your bag?",
            "note": "senin is added for emphasis; the ending -n is still needed."
          }
        ]
      },
      {
        "heading": "Sound changes: k → ğ, p → b",
        "body": "When an ending that starts with a vowel is added, many words ending in **k, p, ç** (and a few in **t**) soften their last consonant: **k → ğ**, **p → b**, **ç → c**, **t → d**. So **çocuk → çocuğum** (my child), **kitap → kitabım** (my book), **ilaç → ilacım** (my medicine), **kâğıt → kâğıdım** (my paper). After **n**, k becomes **g** instead: **renk → rengi** (its colour).\n\nMost one-syllable words keep their consonant: **saç → saçım** (my hair), **top → topu** (his ball). The same softening happens with every vowel-initial ending, so you will see it again with the case endings.",
        "examples": [
          {
            "tr": "Kitabım çantamda.",
            "en": "My book is in my bag.",
            "note": "kitap → kitab-ım: p softens to b before a vowel."
          },
          {
            "tr": "Çocuğum beş yaşında.",
            "en": "My child is five years old.",
            "note": "çocuk → çocuğ-um: k softens to ğ."
          }
        ]
      },
      {
        "heading": "Linking two nouns: Türk kahvesi, Ali'nin arabası",
        "body": "The he / she / it ending -(s)i also links two nouns, like an English compound noun. The first noun stays bare and the second takes -(s)i: **Türk kahvesi** (Turkish coffee), **mercimek çorbası** (lentil soup), **otobüs bileti** (bus ticket).\n\nWhen the first noun is a specific owner, it takes **-(n)in** (four-way harmony): **Ali'nin arabası** (Ali's car), **annemin evi** (my mother's house). Endings on names are separated by an apostrophe.",
        "examples": [
          {
            "tr": "Bir Türk kahvesi, lütfen.",
            "en": "A Turkish coffee, please.",
            "note": "kahve + -si links it to Türk."
          },
          {
            "tr": "Otobüs durağı nerede?",
            "en": "Where is the bus stop?",
            "note": "durak + -ı → durağı (k softens)."
          },
          {
            "tr": "Ali'nin arabası çok eski.",
            "en": "Ali's car is very old.",
            "note": "Owner + -nin, owned thing + -sı."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “my car”? (car = araba)",
        "options": [
          "arabaım",
          "arabam",
          "arabım",
          "benim araba"
        ],
        "answer": 1,
        "explain": "After a vowel the “my” ending is just -m."
      },
      {
        "q": "What does **evimiz** mean?",
        "options": [
          "my house",
          "your house",
          "our house",
          "their house"
        ],
        "answer": 2,
        "explain": "-imiz means “our”."
      },
      {
        "q": "“My book”, from **kitap**, is…",
        "options": [
          "kitapım",
          "kitapum",
          "kitabim",
          "kitabım"
        ],
        "answer": 3,
        "explain": "p softens to b before a vowel, and the last vowel a gives -ım."
      },
      {
        "q": "Which means “lentil soup”? (mercimek = lentil, çorba = soup)",
        "options": [
          "mercimek çorbası",
          "mercimek çorba",
          "mercimeğin çorba",
          "çorba mercimeği"
        ],
        "answer": 0,
        "explain": "In noun + noun compounds the second noun takes -(s)ı."
      }
    ]
  },
  {
    "id": "var-yok",
    "title": "There is, I have: var and yok",
    "level": "A1",
    "summary": "var (there is) and yok (there isn't) do the work of both “there is” and the verb “to have”.",
    "sections": [
      {
        "heading": "There is / there isn't",
        "body": "**var** means “there is / there are” and **yok** means “there isn't / there aren't”. They come at the end of the sentence, and the place usually comes first with the ending **-de / -da** (in, at, on): **Masada bir kitap var.** (There is a book on the table.)\n\nTo ask, add **mı**: **var mı?** (is there…?), **yok mu?** (isn't there…?).",
        "examples": [
          {
            "tr": "Bu otelde havuz var mı?",
            "en": "Is there a pool in this hotel?",
            "note": "var mı? = is there…?"
          },
          {
            "tr": "Buzdolabında süt yok.",
            "en": "There's no milk in the fridge.",
            "note": "The place comes first (buzdolabı-n-da, in the fridge), then the thing, then yok."
          }
        ]
      },
      {
        "heading": "“I have” = “my … exists”",
        "body": "Turkish has no verb “to have”. Instead you say that your thing exists: possessive ending + **var**. **Arabam var.** = I have a car (literally: my car exists). **Arabam yok.** = I don't have a car. Add **benim, senin…** only for emphasis.",
        "table": {
          "head": [
            "Person",
            "has a car",
            "has no car"
          ],
          "rows": [
            [
              "ben",
              "Arabam var.",
              "Arabam yok."
            ],
            [
              "sen",
              "Araban var.",
              "Araban yok."
            ],
            [
              "o",
              "Arabası var.",
              "Arabası yok."
            ],
            [
              "biz",
              "Arabamız var.",
              "Arabamız yok."
            ],
            [
              "siz",
              "Arabanız var.",
              "Arabanız yok."
            ],
            [
              "onlar",
              "Arabaları var.",
              "Arabaları yok."
            ]
          ]
        },
        "examples": [
          {
            "tr": "İki kardeşim var.",
            "en": "I have two siblings.",
            "note": "kardeş + -im + var; singular after a number."
          },
          {
            "tr": "Bugün hiç vaktim yok.",
            "en": "I have no time at all today.",
            "note": "vakit (time) drops its second vowel: vaktim."
          },
          {
            "tr": "Kalemin var mı?",
            "en": "Do you have a pen?",
            "note": "kalem + -in (your) + var mı."
          }
        ]
      },
      {
        "heading": "Past forms and set phrases",
        "body": "In the past, var and yok become **vardı** (there was / I had) and **yoktu** (there wasn't / I didn't have). Both words also appear in many everyday expressions.",
        "examples": [
          {
            "tr": "Çocukken bir köpeğim vardı.",
            "en": "I had a dog when I was a child.",
            "note": "çocukken = when I was a child; köpek → köpeğim + vardı."
          },
          {
            "tr": "Ne var ne yok?",
            "en": "What's new?",
            "note": "Literally “what is there, what isn't there?”"
          },
          {
            "tr": "Hiç fikrim yok.",
            "en": "I have no idea.",
            "note": "fikir (idea) drops a vowel: fikrim."
          },
          {
            "tr": "Yok artık!",
            "en": "No way! / You're kidding!",
            "note": "A very common exclamation of disbelief."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “I have a cat”?",
        "options": [
          "Ben kedi var.",
          "Kedi varım.",
          "Kedim var.",
          "Kedim yok."
        ],
        "answer": 2,
        "explain": "“My cat exists”: kedi + -m + var."
      },
      {
        "q": "What does **Vaktim yok** mean?",
        "options": [
          "I have time.",
          "I don't have time.",
          "There is no clock.",
          "Do you have time?"
        ],
        "answer": 1,
        "explain": "vaktim = my time, yok = doesn't exist."
      },
      {
        "q": "“Is there a pharmacy around here?”",
        "options": [
          "Buralarda eczane var mısın?",
          "Buralarda eczane var mı?",
          "Buralarda eczane mi var mı?",
          "Buralarda eczane yok var?"
        ],
        "answer": 1,
        "explain": "Add mı after var to ask “is there…?”."
      },
      {
        "q": "A friend greets you with **Ne var ne yok?** They mean…",
        "options": [
          "Where is it?",
          "What do you want?",
          "Is anything missing?",
          "What's new?"
        ],
        "answer": 3,
        "explain": "Ne var ne yok? is a casual “What's new?”."
      }
    ]
  },
  {
    "id": "place-endings",
    "title": "At, to, from: -de, -e, -den",
    "level": "A1",
    "summary": "Three endings show where something is (-de), where it is going (-e) and where it comes from (-den).",
    "sections": [
      {
        "heading": "The three place endings",
        "body": "**-de / -da** means in, at or on (location). **-e / -a** means to or towards (direction). **-den / -dan** means from or out of (origin). All three follow two-way vowel harmony. After a vowel, the direction ending becomes **-ye / -ya**: **Ankara'ya** (to Ankara).\n\nWith names of people and places, put an apostrophe before the ending: **İstanbul'da**, **İzmir'e**. The endings can also take “to be” endings: **Evdeyim.** (I'm at home.)",
        "table": {
          "head": [
            "Ending",
            "Meaning",
            "ev (house)",
            "okul (school)",
            "Ankara"
          ],
          "rows": [
            [
              "-de / -da",
              "in, at",
              "evde",
              "okulda",
              "Ankara'da"
            ],
            [
              "-e / -a (-ye / -ya)",
              "to",
              "eve",
              "okula",
              "Ankara'ya"
            ],
            [
              "-den / -dan",
              "from",
              "evden",
              "okuldan",
              "Ankara'dan"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Yarın İzmir'e gidiyorum.",
            "en": "I'm going to İzmir tomorrow.",
            "note": "İzmir + -e: direction."
          },
          {
            "tr": "Bu tren Ankara'dan geliyor.",
            "en": "This train is coming from Ankara.",
            "note": "Ankara + -dan: origin."
          },
          {
            "tr": "Evdeyim.",
            "en": "I'm at home.",
            "note": "ev + -de (at) + -yim (I am)."
          }
        ]
      },
      {
        "heading": "Hard consonants: d becomes t",
        "body": "After the “hard” consonants **ç, f, h, k, p, s, ş, t**, the d of -de and -den turns into **t**: **sokakta** (in the street), **Paris'ten** (from Paris). Turks remember these letters with the phrase **FıSTıKÇı ŞaHaP** (“Şahap the pistachio seller”).\n\nWith -e / -a, which starts with a vowel, many words ending in k soften instead, as with the possessive endings: **sokak → sokağa** (to the street). Most one-syllable words keep their k: **park → parka**.",
        "table": {
          "head": [
            "Word",
            "in / at",
            "to",
            "from"
          ],
          "rows": [
            [
              "sokak (street)",
              "sokakta",
              "sokağa",
              "sokaktan"
            ],
            [
              "park",
              "parkta",
              "parka",
              "parktan"
            ],
            [
              "iş (work)",
              "işte",
              "işe",
              "işten"
            ],
            [
              "Paris",
              "Paris'te",
              "Paris'e",
              "Paris'ten"
            ],
            [
              "masa (table)",
              "masada",
              "masaya",
              "masadan"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Annem mutfakta.",
            "en": "My mother is in the kitchen.",
            "note": "mutfak + -ta: after k, d becomes t."
          },
          {
            "tr": "Saat beşte işten çıkıyorum.",
            "en": "I leave work at five.",
            "note": "beş + -te, iş + -ten: after ş, d becomes t."
          }
        ]
      },
      {
        "heading": "More than places",
        "body": "These endings do more than English prepositions. **-e** marks the person you give or say something to; note the irregular **bana** (to me) and **sana** (to you). **-de** also gives clock times: **saat üçte** (at three o'clock). **-den** means “than” in comparisons and is used with verbs like “to be afraid of”.",
        "examples": [
          {
            "tr": "Bana bir çay verir misin?",
            "en": "Could you give me a tea?",
            "note": "ben → bana: “to me”."
          },
          {
            "tr": "Saat üçte buluşalım.",
            "en": "Let's meet at three o'clock.",
            "note": "üç + -te: time."
          },
          {
            "tr": "Ankara İstanbul'dan küçük.",
            "en": "Ankara is smaller than Istanbul.",
            "note": "-dan = than."
          },
          {
            "tr": "Köpeklerden korkuyorum.",
            "en": "I'm afraid of dogs.",
            "note": "korkmak (to fear) takes -den."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "How do you say “in the street”? (street = sokak)",
        "options": [
          "sokakda",
          "sokakta",
          "sokağda",
          "sokağa"
        ],
        "answer": 1,
        "explain": "After k, the d of -da becomes t."
      },
      {
        "q": "“I'm going to Ankara.”",
        "options": [
          "Ankara'ya gidiyorum.",
          "Ankara'da gidiyorum.",
          "Ankara'dan gidiyorum.",
          "Ankara'a gidiyorum."
        ],
        "answer": 0,
        "explain": "Direction takes -e / -a, which becomes -ya after a vowel."
      },
      {
        "q": "What does **evden** mean?",
        "options": [
          "at home",
          "to the house",
          "from the house",
          "my house"
        ],
        "answer": 2,
        "explain": "-den means “from”."
      },
      {
        "q": "“Tea is cheaper than coffee”: Çay ___ ucuz.",
        "options": [
          "kahvede",
          "kahveye",
          "kahvesi",
          "kahveden"
        ],
        "answer": 3,
        "explain": "-den is used for “than” in comparisons."
      }
    ]
  },
  {
    "id": "present-continuous",
    "title": "Present continuous: -iyor",
    "level": "A1",
    "summary": "The -iyor tense covers “I am doing” and much of what English says with “I do”.",
    "sections": [
      {
        "heading": "Building -iyor",
        "body": "Take the dictionary form, remove **-mek / -mak** to get the stem, add **-iyor** (four-way harmony: -iyor, -ıyor, -uyor, -üyor) and then a personal ending: **gel → geliyorum** (I'm coming), **gör → görüyorum** (I see). The **o** of -yor never changes, so the endings are always -um, -sun, -uz, -sunuz.\n\nIf the stem ends in a vowel, add -yor; a final e or a changes to the harmony vowel: **oku → okuyor**, **anla → anlıyor**, **bekle → bekliyor**. Watch out for **de- → diyor** (says), **ye- → yiyor** (eats), and **gitmek → gidiyor**, **etmek → ediyor**, where t softens to d.",
        "table": {
          "head": [
            "Person",
            "gelmek (come)",
            "yapmak (do)",
            "okumak (read)"
          ],
          "rows": [
            [
              "ben",
              "geliyorum",
              "yapıyorum",
              "okuyorum"
            ],
            [
              "sen",
              "geliyorsun",
              "yapıyorsun",
              "okuyorsun"
            ],
            [
              "o",
              "geliyor",
              "yapıyor",
              "okuyor"
            ],
            [
              "biz",
              "geliyoruz",
              "yapıyoruz",
              "okuyoruz"
            ],
            [
              "siz",
              "geliyorsunuz",
              "yapıyorsunuz",
              "okuyorsunuz"
            ],
            [
              "onlar",
              "geliyorlar",
              "yapıyorlar",
              "okuyorlar"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Şu anda kitap okuyorum.",
            "en": "I'm reading a book right now.",
            "note": "oku + -yor + -um."
          },
          {
            "tr": "Annem bir bankada çalışıyor.",
            "en": "My mother works at a bank.",
            "note": "-iyor also describes current situations, not just this moment."
          },
          {
            "tr": "Seni anlıyorum.",
            "en": "I understand you.",
            "note": "The final a of anla- changes to ı: anlı-yor-um."
          },
          {
            "tr": "Otobüs geliyor!",
            "en": "The bus is coming!",
            "note": "o form: no personal ending."
          }
        ]
      },
      {
        "heading": "Negative and questions",
        "body": "For the negative, add **-me / -ma** to the stem. Before -yor it becomes **-mi-, -mı-, -mu-, -mü-**: **gelmiyorum** (I'm not coming), **anlamıyorum** (I don't understand).\n\nFor a question, put **mu** after -yor, and the personal ending moves onto mu: **Geliyor musun?** (Are you coming?). Only with onlar does the ending stay on the verb: **Geliyorlar mı?**",
        "table": {
          "head": [
            "Person",
            "Positive",
            "Negative",
            "Question"
          ],
          "rows": [
            [
              "ben",
              "geliyorum",
              "gelmiyorum",
              "geliyor muyum?"
            ],
            [
              "sen",
              "geliyorsun",
              "gelmiyorsun",
              "geliyor musun?"
            ],
            [
              "o",
              "geliyor",
              "gelmiyor",
              "geliyor mu?"
            ],
            [
              "biz",
              "geliyoruz",
              "gelmiyoruz",
              "geliyor muyuz?"
            ],
            [
              "siz",
              "geliyorsunuz",
              "gelmiyorsunuz",
              "geliyor musunuz?"
            ],
            [
              "onlar",
              "geliyorlar",
              "gelmiyorlar",
              "geliyorlar mı?"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Sigara içmiyorum.",
            "en": "I don't smoke.",
            "note": "iç + -mi- + -yor + -um."
          },
          {
            "tr": "Beni duyuyor musun?",
            "en": "Can you hear me?",
            "note": "Literally “are you hearing me?”; -sun goes on mu."
          },
          {
            "tr": "Hiçbir şey anlamıyorum.",
            "en": "I don't understand anything.",
            "note": "Turkish uses double negatives: hiçbir şey + a negative verb."
          }
        ]
      },
      {
        "heading": "Plans and the bigger picture",
        "body": "As in English, -iyor can describe a fixed plan for the near future, usually with a time word.\n\nFor general facts, habits and offers, Turkish often uses another tense, the **aorist** (gelir, yapar), as in **Çay içer misin?** (Would you like some tea?). For now, -iyor is the safe choice for things happening now or these days.",
        "examples": [
          {
            "tr": "Bu akşam sinemaya gidiyoruz.",
            "en": "We're going to the cinema this evening.",
            "note": "git → gid-iyor: t softens to d."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "“I'm coming” is…",
        "options": [
          "gelirim",
          "geliyorum",
          "gelyorum",
          "geliyorım"
        ],
        "answer": 1,
        "explain": "gel + iyor + um: the o of -yor never changes, so the ending is always -um."
      },
      {
        "q": "Make **anlamak** negative: “I don't understand.”",
        "options": [
          "anlamıyorum",
          "anlamayorum",
          "anlıyormuyum",
          "anlamiyorum"
        ],
        "answer": 0,
        "explain": "-ma- becomes -mı- before -yor, following the vowel a."
      },
      {
        "q": "“Are you coming?” (informal)",
        "options": [
          "Geliyorsun mu?",
          "Geliyor misin?",
          "Geliyor musun?",
          "Mu geliyorsun?"
        ],
        "answer": 2,
        "explain": "The personal ending goes on mu, which harmonises with the o of -yor."
      },
      {
        "q": "“I'm going”, from **gitmek**, is…",
        "options": [
          "gitiyorum",
          "gidyorum",
          "gediyorum",
          "gidiyorum"
        ],
        "answer": 3,
        "explain": "gitmek softens t to d before a vowel: gid-iyor-um."
      }
    ]
  },
  {
    "id": "accusative",
    "title": "The object ending: -(y)i",
    "level": "A2",
    "summary": "Add -(y)i to a direct object when it is specific (the book, this book, my book), but not when it is general.",
    "sections": [
      {
        "heading": "Specific or general?",
        "body": "Turkish has no word for “the”. Instead, when the direct object of a verb is **specific** (a particular one both speakers know about), it takes the ending **-(y)ı, -(y)i, -(y)u, -(y)ü**. When the object is general or indefinite, it stays bare.\n\n**Kitap okuyorum.** = I'm reading (a book, or books in general). **Kitabı okuyorum.** = I'm reading the book (that particular one). After a vowel, a **y** comes in: **kapı → kapıyı** (the door).",
        "table": {
          "head": [
            "Word",
            "General (bare)",
            "Specific (+ -(y)i)"
          ],
          "rows": [
            [
              "ev (house)",
              "ev",
              "evi"
            ],
            [
              "kapı (door)",
              "kapı",
              "kapıyı"
            ],
            [
              "kitap (book)",
              "kitap",
              "kitabı"
            ],
            [
              "su (water)",
              "su",
              "suyu"
            ],
            [
              "çay (tea)",
              "çay",
              "çayı"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Çay içiyorum.",
            "en": "I'm drinking tea.",
            "note": "No ending: tea in general."
          },
          {
            "tr": "Kapıyı açar mısın?",
            "en": "Could you open the door?",
            "note": "kapı + y + ı: the door we can both see."
          },
          {
            "tr": "Çayını iç, soğuyor.",
            "en": "Drink your tea, it's getting cold.",
            "note": "çay + ın (your) + ı: a possessed object is always specific."
          }
        ]
      },
      {
        "heading": "When it is always needed",
        "body": "Use the object ending whenever the object is a **name** (**Ali'yi gördüm** — I saw Ali), a **pronoun**, a noun with **bu / şu / o** (**bu filmi** — this film), or a noun with a **possessive** (**anahtarımı** — my key).\n\nAfter the his / her / its ending -(s)ı, the object ending becomes **-nı, -ni, -nu, -nü**: **arabasını** (his car, as an object), **evini** (her house).",
        "table": {
          "head": [
            "Pronoun",
            "As object",
            "Example"
          ],
          "rows": [
            [
              "ben",
              "beni",
              "Beni dinle. (Listen to me.)"
            ],
            [
              "sen",
              "seni",
              "Seni özledim. (I missed you.)"
            ],
            [
              "o",
              "onu",
              "Onu tanıyor musun? (Do you know him / her?)"
            ],
            [
              "biz",
              "bizi",
              "Bizi bekle. (Wait for us.)"
            ],
            [
              "siz",
              "sizi",
              "Sizi yarın arayacağım. (I'll call you tomorrow.)"
            ],
            [
              "onlar",
              "onları",
              "Onları görüyorum. (I can see them.)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Bu filmi daha önce izledim.",
            "en": "I've watched this film before.",
            "note": "bu + noun: always specific, so film + -i."
          },
          {
            "tr": "Anahtarımı bulamıyorum.",
            "en": "I can't find my key.",
            "note": "anahtar + ım (my) + ı. bulamıyorum = I can't find (bul + a + mı + yor + um)."
          }
        ]
      },
      {
        "heading": "Word order",
        "body": "The basic order is **subject – object – verb**: **Ali kitabı okuyor.** (Ali is reading the book.) A bare, general object sits directly before the verb, almost as part of it. A specific object can move around more freely, and whatever stands right before the verb gets the focus: **Kitabı Ali okuyor.** (It's Ali who is reading the book.)",
        "examples": [
          {
            "tr": "Ayşe her sabah gazete okuyor.",
            "en": "Ayşe reads a newspaper every morning.",
            "note": "General object, placed right before the verb."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "“I'm drinking the water” (that specific water):",
        "options": [
          "Su içiyorum.",
          "Suyu içiyorum.",
          "Suyı içiyorum.",
          "Suya içiyorum."
        ],
        "answer": 1,
        "explain": "su ends in a vowel, so a y is added, and harmony gives u: su-y-u."
      },
      {
        "q": "Which sentence means “I'm reading a book” (in general)?",
        "options": [
          "Kitap okuyorum.",
          "Kitabı okuyorum.",
          "Kitapı okuyorum.",
          "Kitaba okuyorum."
        ],
        "answer": 0,
        "explain": "A general object stays bare."
      },
      {
        "q": "“I saw Ali” (gördüm = I saw):",
        "options": [
          "Ali gördüm.",
          "Ali'ye gördüm.",
          "Ali'de gördüm.",
          "Ali'yi gördüm."
        ],
        "answer": 3,
        "explain": "Names are always specific, so they take -(y)i."
      },
      {
        "q": "“Open the door, please.”",
        "options": [
          "Kapıya açın, lütfen.",
          "Kapıda açın, lütfen.",
          "Kapıyı açın, lütfen.",
          "Kapıdan açın, lütfen."
        ],
        "answer": 2,
        "explain": "The door is a specific direct object: kapı + y + ı."
      }
    ]
  },
  {
    "id": "past-tense",
    "title": "Past tense: -di and -miş",
    "level": "A2",
    "summary": "-di is for things you saw or know happened; -miş is for things you heard about, worked out or have just discovered.",
    "sections": [
      {
        "heading": "The -di past",
        "body": "Add **-di** to the stem (four-way harmony: -di, -dı, -du, -dü). After the hard consonants **ç, f, h, k, p, s, ş, t** it becomes **-ti, -tı, -tu, -tü**. The personal endings here are short: **-m, -n, (nothing), -k, -niz, -ler**, with -niz and -ler following vowel harmony.\n\nThe same ending works after nouns and adjectives for “was / were”: **yorgundum** (I was tired), **evdeydik** (we were at home). After a vowel a **y** comes in: **hastaydım** (I was ill).",
        "table": {
          "head": [
            "Person",
            "gelmek (come)",
            "almak (take, buy)",
            "konuşmak (speak)",
            "gitmek (go)"
          ],
          "rows": [
            [
              "ben",
              "geldim",
              "aldım",
              "konuştum",
              "gittim"
            ],
            [
              "sen",
              "geldin",
              "aldın",
              "konuştun",
              "gittin"
            ],
            [
              "o",
              "geldi",
              "aldı",
              "konuştu",
              "gitti"
            ],
            [
              "biz",
              "geldik",
              "aldık",
              "konuştuk",
              "gittik"
            ],
            [
              "siz",
              "geldiniz",
              "aldınız",
              "konuştunuz",
              "gittiniz"
            ],
            [
              "onlar",
              "geldiler",
              "aldılar",
              "konuştular",
              "gittiler"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Dün akşam çok güzel bir film izledim.",
            "en": "Last night I watched a really good film.",
            "note": "izle + di + m."
          },
          {
            "tr": "Geçen yıl Türkiye'ye gittik.",
            "en": "We went to Türkiye last year.",
            "note": "git + ti + k: after t, d becomes t."
          },
          {
            "tr": "Ne dedin?",
            "en": "What did you say?",
            "note": "demek (to say) has the stem de-: dedim, dedin, dedi."
          },
          {
            "tr": "Dün çok yorgundum.",
            "en": "I was very tired yesterday.",
            "note": "-du after an adjective means “was”."
          }
        ]
      },
      {
        "heading": "Negative and questions",
        "body": "Negative: **-me / -ma** goes before -di: **gelmedim** (I didn't come), **anlamadım** (I didn't understand).\n\nQuestions: unlike -iyor, the personal ending stays on the verb and **mi** comes last: **Geldin mi?** (Did you come?), **Yemek yediniz mi?** (Have you eaten?). The -di past also covers English “have done”.",
        "examples": [
          {
            "tr": "Anlamadım, tekrar eder misiniz?",
            "en": "I didn't understand — could you repeat that?",
            "note": "anla + ma + dı + m."
          },
          {
            "tr": "Kahvaltı yaptın mı?",
            "en": "Did you have breakfast?",
            "note": "Personal ending first, then mı: yaptın mı."
          },
          {
            "tr": "Hayır, henüz yemedim.",
            "en": "No, I haven't eaten yet.",
            "note": "-di is also used for “have done”."
          }
        ]
      },
      {
        "heading": "-miş: apparently, I hear",
        "body": "**-miş** (-miş, -mış, -muş, -müş) is also a past tense, but it says you did **not** witness the event: you heard about it, read it, or worked it out from the evidence. It also expresses surprise at something you have just noticed. Its endings are **-mişim, -mişsin, -miş, -mişiz, -mişsiniz, -mişler**.\n\nCompare: **Ali geldi.** (Ali came; I saw it or I'm sure.) **Ali gelmiş.** (Apparently Ali has come; maybe I see his shoes at the door.)",
        "examples": [
          {
            "tr": "Yağmur yağmış.",
            "en": "It must have rained.",
            "note": "You see the wet streets but didn't see the rain."
          },
          {
            "tr": "Duydun mu? Ayşe evlenmiş!",
            "en": "Did you hear? Ayşe got married!",
            "note": "-miş: news you heard from someone else."
          },
          {
            "tr": "Ne kadar büyümüşsün!",
            "en": "How you've grown!",
            "note": "Surprise at something you've just noticed."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "“I went”, from **gitmek**:",
        "options": [
          "gitdim",
          "gittim",
          "gidim",
          "gidtim"
        ],
        "answer": 1,
        "explain": "After t, the d of -di becomes t: git + ti + m."
      },
      {
        "q": "“Did you come?” (informal)",
        "options": [
          "Geldin mi?",
          "Geldi misin?",
          "Gel mi din?",
          "Geldiniz mı?"
        ],
        "answer": 0,
        "explain": "In the -di past, the personal ending comes before mi."
      },
      {
        "q": "You didn't see it rain, but the streets are wet. Which fits best?",
        "options": [
          "Yağmur yağdı.",
          "Yağmur yağacak.",
          "Yağmur yağmış.",
          "Yağmur yağıyor."
        ],
        "answer": 2,
        "explain": "-miş is used for events you infer from evidence but didn't witness."
      },
      {
        "q": "“I didn't understand”:",
        "options": [
          "Anladım değil.",
          "Anlamamış.",
          "Anlamıyorum.",
          "Anlamadım."
        ],
        "answer": 3,
        "explain": "-ma- before -dı makes the -di past negative."
      }
    ]
  },
  {
    "id": "future-tense",
    "title": "Future tense: -ecek, and negatives with -me",
    "level": "A2",
    "summary": "Add -ecek / -acak for “will” and “going to”, and use -me / -ma to make any verb negative.",
    "sections": [
      {
        "heading": "Building the future",
        "body": "Add **-ecek** or **-acak** (two-way harmony) to the stem, then a personal ending. After a stem ending in a vowel, a **y** comes in: **bekle → bekleyecek**, **oku → okuyacak**. As with -iyor, **gitmek → gidecek**, **etmek → edecek**, **de- → diyecek** (will say) and **ye- → yiyecek** (will eat).\n\nWhen the ending that follows starts with a vowel, the final **k** softens to **ğ**: **geleceğim** (I will come), **geleceğiz** (we will come). The other forms keep their k: **geleceksin, gelecek**.",
        "table": {
          "head": [
            "Person",
            "gelmek (come)",
            "yapmak (do)",
            "beklemek (wait)"
          ],
          "rows": [
            [
              "ben",
              "geleceğim",
              "yapacağım",
              "bekleyeceğim"
            ],
            [
              "sen",
              "geleceksin",
              "yapacaksın",
              "bekleyeceksin"
            ],
            [
              "o",
              "gelecek",
              "yapacak",
              "bekleyecek"
            ],
            [
              "biz",
              "geleceğiz",
              "yapacağız",
              "bekleyeceğiz"
            ],
            [
              "siz",
              "geleceksiniz",
              "yapacaksınız",
              "bekleyeceksiniz"
            ],
            [
              "onlar",
              "gelecekler",
              "yapacaklar",
              "bekleyecekler"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Yarın seni arayacağım.",
            "en": "I'll call you tomorrow.",
            "note": "ara + y + acağ + ım."
          },
          {
            "tr": "Hafta sonu ne yapacaksın?",
            "en": "What are you going to do at the weekend?",
            "note": "yap + acak + sın."
          },
          {
            "tr": "Akşam yağmur yağacak.",
            "en": "It's going to rain this evening.",
            "note": "o form: no personal ending."
          }
        ]
      },
      {
        "heading": "Negative and questions",
        "body": "Negative: **-me / -ma**, then **y**, then -ecek / -acak: **gelmeyeceğim** (I won't come), **yapmayacak** (he won't do it). Questions: the personal ending goes on mi, as with -iyor: **Gelecek misin?** (Will you come?).",
        "table": {
          "head": [
            "Person",
            "Positive",
            "Negative",
            "Question"
          ],
          "rows": [
            [
              "ben",
              "geleceğim",
              "gelmeyeceğim",
              "gelecek miyim?"
            ],
            [
              "sen",
              "geleceksin",
              "gelmeyeceksin",
              "gelecek misin?"
            ],
            [
              "o",
              "gelecek",
              "gelmeyecek",
              "gelecek mi?"
            ],
            [
              "biz",
              "geleceğiz",
              "gelmeyeceğiz",
              "gelecek miyiz?"
            ],
            [
              "siz",
              "geleceksiniz",
              "gelmeyeceksiniz",
              "gelecek misiniz?"
            ],
            [
              "onlar",
              "gelecekler",
              "gelmeyecekler",
              "gelecekler mi?"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Merak etme, kimseye söylemeyeceğim.",
            "en": "Don't worry, I won't tell anyone.",
            "note": "söyle + me + y + eceğ + im."
          },
          {
            "tr": "Partiye gelecek misin?",
            "en": "Are you coming to the party?",
            "note": "The ending -sin goes on mi."
          }
        ]
      },
      {
        "heading": "-me / -ma: one negative for every tense",
        "body": "Verbs are made negative with **-me / -ma** straight after the stem, whatever the tense. On its own it gives a negative command: **Gel!** (Come!) → **Gelme!** (Don't come!). The polite or plural version is **Gelmeyin!**\n\nRemember: **değil** makes nouns and adjectives negative (**Hasta değilim.**), while **-me / -ma** makes verbs negative.",
        "table": {
          "head": [
            "Form",
            "Positive",
            "Negative"
          ],
          "rows": [
            [
              "Command",
              "Gel! (Come!)",
              "Gelme! (Don't come!)"
            ],
            [
              "Present continuous",
              "geliyorum",
              "gelmiyorum"
            ],
            [
              "Past",
              "geldim",
              "gelmedim"
            ],
            [
              "Future",
              "geleceğim",
              "gelmeyeceğim"
            ],
            [
              "Dictionary form",
              "gelmek (to come)",
              "gelmemek (not to come)"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Lütfen geç kalma!",
            "en": "Please don't be late!",
            "note": "kal + ma: negative command to sen."
          },
          {
            "tr": "Merak etmeyin, her şey yolunda.",
            "en": "Don't worry, everything's fine.",
            "note": "et + me + y + in: polite negative command."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "“I will come”:",
        "options": [
          "gelecekim",
          "geleceğim",
          "gelaceğim",
          "gelceğim"
        ],
        "answer": 1,
        "explain": "The k of -ecek softens to ğ before the vowel of -im."
      },
      {
        "q": "“We will wait” (beklemek):",
        "options": [
          "bekleyeceğiz",
          "bekleceğiz",
          "beklayacağız",
          "bekleyeceğim"
        ],
        "answer": 0,
        "explain": "The stem ends in a vowel, so y is inserted, and e gives -ecek."
      },
      {
        "q": "“Don't touch!” (dokunmak = to touch)",
        "options": [
          "Dokunmak!",
          "Dokun değil!",
          "Dokunma!",
          "Dokunmadı!"
        ],
        "answer": 2,
        "explain": "-ma straight after the stem gives a negative command."
      },
      {
        "q": "“He won't do it”:",
        "options": [
          "Yapmıyor.",
          "Yapmadı.",
          "Yapacak mı?",
          "Yapmayacak."
        ],
        "answer": 3,
        "explain": "yap + ma + y + acak: the negative future."
      }
    ]
  },
  {
    "id": "politeness",
    "title": "Polite or casual: sen, siz and asking nicely",
    "level": "A2",
    "summary": "Choosing between sen and siz, and softening requests with -ebilir misiniz, lets you sound friendly but respectful.",
    "sections": [
      {
        "heading": "sen or siz?",
        "body": "**sen** is the informal “you”: for friends, family, children and people your own age in relaxed settings. **siz** is the plural “you” and also the polite singular “you”: for strangers, older people, shop staff, officials, teachers and colleagues you don't know well. When in doubt, start with **siz**; people will tell you if they'd like you to switch (**Bana “sen” diyebilirsin.** — You can call me “sen”).\n\nThe verb changes too: polite commands add **-in / -ın / -un / -ün** (**Gelin!**). On signs and in announcements you'll see the even more formal **-iniz**: **Lütfen bekleyiniz.** (Please wait.)",
        "table": {
          "head": [
            "Informal (sen)",
            "Polite (siz)",
            "Meaning"
          ],
          "rows": [
            [
              "Nasılsın?",
              "Nasılsınız?",
              "How are you?"
            ],
            [
              "Adın ne?",
              "Adınız ne?",
              "What's your name?"
            ],
            [
              "Gel!",
              "Gelin! / Buyurun!",
              "Come (in)!"
            ],
            [
              "Otur.",
              "Oturun. / Buyurun, oturun.",
              "Sit down."
            ],
            [
              "Hoş geldin!",
              "Hoş geldiniz!",
              "Welcome!"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Lütfen bekleyiniz.",
            "en": "Please wait.",
            "note": "-iniz: the very formal command form of signs and announcements."
          }
        ]
      },
      {
        "heading": "Titles: Bey, Hanım, abi, abla",
        "body": "Address adults politely with their **first name** + **Bey** (Mr) or **Hanım** (Ms): **Ahmet Bey**, **Ayşe Hanım**. On their own, **Beyefendi** (sir) and **Hanımefendi** (madam) are very polite.\n\nIn shops, cafés and on the street, people often use family words in a warm, friendly way: **abi / abla** (older brother / sister) for someone a bit older, **amca / teyze** (uncle / aunt) for older people.",
        "examples": [
          {
            "tr": "Mehmet Bey, toplantı saat kaçta?",
            "en": "Mr Mehmet, what time is the meeting?",
            "note": "Bey follows the first name."
          },
          {
            "tr": "Abi, bir çay alabilir miyim?",
            "en": "Excuse me, could I get a tea? (to a waiter)",
            "note": "abi (big brother) is a friendly way to address a man."
          },
          {
            "tr": "Teyze, yardım edeyim mi?",
            "en": "Shall I help you? (to an older woman)",
            "note": "teyze (auntie) is warm and respectful."
          }
        ]
      },
      {
        "heading": "Asking nicely: -ebilir misiniz?",
        "body": "To make a polite request, ask whether someone can do something with **-(y)ebilir / -(y)abilir** (can) + **misiniz**. To ask for something yourself, **-ebilir miyim?** (May I…? / Could I…?) is your best friend. The aorist question **-ir misiniz?** (Would you…?) is just as polite. Add **lütfen** for extra courtesy.",
        "table": {
          "head": [
            "Pattern",
            "Example",
            "Meaning"
          ],
          "rows": [
            [
              "-ebilir misiniz?",
              "Tekrar edebilir misiniz?",
              "Could you repeat that?"
            ],
            [
              "-ir misiniz?",
              "Biraz daha yavaş konuşur musunuz?",
              "Would you speak a bit more slowly?"
            ],
            [
              "-ebilir miyim / miyiz?",
              "Hesabı alabilir miyiz?",
              "Could we have the bill?"
            ],
            [
              "-mek istiyorum",
              "Bir oda ayırtmak istiyorum.",
              "I'd like to book a room."
            ]
          ]
        },
        "examples": [
          {
            "tr": "Affedersiniz, bana yardım edebilir misiniz?",
            "en": "Excuse me, could you help me?",
            "note": "et → ed-ebilir: t softens to d."
          },
          {
            "tr": "Bir fotoğrafımızı çekebilir misiniz?",
            "en": "Could you take a photo of us?",
            "note": "çek + ebilir + mi + siniz."
          },
          {
            "tr": "Çok teşekkürler! — Rica ederim.",
            "en": "Thanks a lot! — You're welcome.",
            "note": "Rica ederim is the polite reply to thanks."
          }
        ]
      },
      {
        "heading": "Courtesy phrases",
        "body": "Turkish has set phrases for many everyday situations, and using them makes a big impression. **Buyurun** means “here you are / please, go ahead / how can I help?”. **Geçmiş olsun** (may it be in the past) is said to anyone who is ill or has had bad luck. **Ellerinize sağlık** (health to your hands) thanks someone who has cooked or made something for you.",
        "examples": [
          {
            "tr": "Hoş geldiniz, buyurun.",
            "en": "Welcome, how can I help you?",
            "note": "What shop staff typically say as you walk in."
          },
          {
            "tr": "Geçmiş olsun!",
            "en": "Get well soon!",
            "note": "Literally “may it be in the past”."
          },
          {
            "tr": "Ellerinize sağlık, yemek çok güzeldi.",
            "en": "Thank you, the meal was delicious.",
            "note": "Literally “health to your hands”; said to the cook."
          }
        ]
      }
    ],
    "quiz": [
      {
        "q": "You meet your friend's grandmother. How do you ask how she is?",
        "options": [
          "Nasılsın?",
          "Nasılsınız?",
          "Ne haber?",
          "Naber?"
        ],
        "answer": 1,
        "explain": "Use siz forms with older people and strangers."
      },
      {
        "q": "How do you politely address a woman named Elif?",
        "options": [
          "Elif Bey",
          "Hanım Elif",
          "Elif Abi",
          "Elif Hanım"
        ],
        "answer": 3,
        "explain": "Hanım comes after the first name."
      },
      {
        "q": "“Could you repeat that?” (polite)",
        "options": [
          "Tekrar et!",
          "Tekrar edebilir miyim?",
          "Tekrar edebilir misiniz?",
          "Tekrar etme."
        ],
        "answer": 2,
        "explain": "-ebilir misiniz asks someone else (siz) if they can do something; -ebilir miyim asks about yourself."
      },
      {
        "q": "Someone thanks you. You reply:",
        "options": [
          "Rica ederim.",
          "Afiyet olsun.",
          "Geçmiş olsun.",
          "Kolay gelsin."
        ],
        "answer": 0,
        "explain": "Rica ederim means “you're welcome”."
      }
    ]
  },
  {
    "id": "spoken-turkish",
    "title": "Spoken Turkish: how people really talk",
    "level": "B1",
    "summary": "Everyday speech shortens and blurs many textbook forms, so learn to recognise them even if you write the standard ones.",
    "sections": [
      {
        "heading": "-iyor loses its r",
        "body": "In everyday speech the **r** of -yor is almost always dropped: **geliyor → geliyo**, **biliyor musun → biliyo musun**. In casual speech, especially among younger people and in Istanbul, the personal endings shrink too: **-yorum → -yom**, **-yorsun → -yosun / -yon**, **-yoruz → -yoz**. **ne** also merges with the verb: **ne yapıyorsun → napıyosun / napıyon**.",
        "table": {
          "head": [
            "Written",
            "Spoken",
            "Meaning"
          ],
          "rows": [
            [
              "Geliyorum.",
              "Geliyom.",
              "I'm coming."
            ],
            [
              "Ne yapıyorsun?",
              "Napıyosun? / Napıyon?",
              "What are you doing?"
            ],
            [
              "Biliyor musun?",
              "Biliyo musun?",
              "Do you know?"
            ],
            [
              "Gidiyoruz.",
              "Gidiyoz.",
              "We're going."
            ],
            [
              "Ne oluyor?",
              "Noluyo?",
              "What's going on?"
            ]
          ]
        },
        "examples": [
          {
            "tr": "Napıyosun? — Hiç, evdeyim.",
            "en": "What are you up to? — Nothing much, I'm at home.",
            "note": "Written: Ne yapıyorsun?"
          },
          {
            "tr": "Bi dakka, geliyom!",
            "en": "Just a minute, I'm coming!",
            "note": "Written: Bir dakika, geliyorum!"
          }
        ]
      },
      {
        "heading": "Squeezed words",
        "body": "Very common words get shortened: **ne** merges with a following vowel (**ne oldu → noldu**) and **ne haber** becomes **naber**. **bir** loses its r (**bi**), and a **ğ** between vowels is barely pronounced, so **sağ ol** sounds like “saol” and **değil mi** often becomes **di mi**. You'll also hear **yok** or a long **yoo** for “no” instead of the more formal **hayır**, and **bilmem** (dunno) instead of **bilmiyorum**.",
        "table": {
          "head": [
            "Written",
            "Spoken",
            "Meaning"
          ],
          "rows": [
            [
              "Ne haber?",
              "Naber?",
              "What's up?"
            ],
            [
              "Ne oldu?",
              "Noldu?",
              "What happened?"
            ],
            [
              "Bir dakika!",
              "Bi dakka!",
              "Just a minute!"
            ],
            [
              "…, değil mi?",
              "…, di mi?",
              "…, right?"
            ],
            [
              "Hayır.",
              "Yok. / Yoo.",
              "No."
            ],
            [
              "Bilmiyorum.",
              "Bilmem. / Bilmiyom.",
              "I don't know."
            ]
          ]
        },
        "examples": [
          {
            "tr": "Noldu? Niye ağlıyosun?",
            "en": "What happened? Why are you crying?",
            "note": "Written: Ne oldu? Niye ağlıyorsun?"
          },
          {
            "tr": "Çay ister misin? — Yok, sağ ol.",
            "en": "Would you like some tea? — No, thanks.",
            "note": "Casual “no thanks”: yok instead of hayır, and sağ ol sounds like “saol”."
          }
        ]
      },
      {
        "heading": "The future in speech",
        "body": "The future ending is shortened most of all. **-eceğim / -acağım** usually sounds like **-cem / -cam**, often with a raised vowel before it: **geleceğim → gelicem**, **yapacağım → yapıcam**, **ne yapacaksın → napıcan**, **yapacağız → yapıcaz**. You'll see these spellings in text messages and on social media, but never in formal writing.",
        "table": {
          "head": [
            "Written",
            "Spoken",
            "Meaning"
          ],
          "rows": [
            [
              "Geleceğim.",
              "Gelicem.",
              "I'll come."
            ],
            [
              "Ne yapacaksın?",
              "Napıcan?",
              "What are you going to do?"
            ],
            [
              "Yapacağız.",
              "Yapıcaz.",
              "We'll do it."
            ],
            [
              "Söyleyeceğim.",
              "Söylicem.",
              "I'll tell (you)."
            ]
          ]
        },
        "examples": [
          {
            "tr": "Yarın gelicen di mi?",
            "en": "You're coming tomorrow, right?",
            "note": "Written: Yarın geleceksin, değil mi?"
          },
          {
            "tr": "Akşam napıcaz?",
            "en": "What are we doing tonight?",
            "note": "Written: Akşam ne yapacağız?"
          }
        ]
      },
      {
        "heading": "Which one should you use?",
        "body": "Write the full forms in emails, forms and anything formal, and use them whenever you are unsure. You'll hear the short forms everywhere: from friends, in shops and in TV series. Saying **geliyom** or **napıyon** to a friend sounds natural; writing it in a work email would look sloppy, like “gonna” and “wanna” in English. A safe middle ground is to keep the standard forms but say **-yor** lightly, as most native speakers do.\n\nIn text messages you'll also see abbreviations such as **slm** (selam), **mrb** (merhaba), **nbr** (naber), **tmm** (tamam) and **tşk** (teşekkürler)."
      }
    ],
    "quiz": [
      {
        "q": "What is the written (standard) form of **geliyom**?",
        "options": [
          "gelirim",
          "geliyorum",
          "geleceğim",
          "geldim"
        ],
        "answer": 1,
        "explain": "geliyom is the casual spoken form of geliyorum."
      },
      {
        "q": "A friend texts you **Napıyon?** They mean…",
        "options": [
          "What are you doing?",
          "Where are you?",
          "What happened?",
          "What's your name?"
        ],
        "answer": 0,
        "explain": "Napıyon is a squeezed form of Ne yapıyorsun?"
      },
      {
        "q": "**Gelicem** is a spoken form of…",
        "options": [
          "geliyorum",
          "gelirim",
          "geleceğim",
          "gelmişim"
        ],
        "answer": 2,
        "explain": "In speech, -eceğim shrinks to -cem, often with a raised vowel: gelicem."
      },
      {
        "q": "Which is the best choice in a formal email?",
        "options": [
          "Yarın gelicem, di mi?",
          "Yarın geleceğim.",
          "Yarın geliyom.",
          "Bi dakka, geliyom."
        ],
        "answer": 1,
        "explain": "Formal writing always uses the full standard forms."
      }
    ]
  }
];
