# Lisan — vocabulary & pronunciation

A language-learning app focused on **vocabulary** and **pronunciation** in four languages: **Turkish 🇹🇷, Ukrainian 🇺🇦, Japanese 🇯🇵 and Arabic 🇸🇦**.

It runs as a website (works offline, installable as a PWA) and as native **Android** and **iOS** apps built from the same code with [Capacitor](https://capacitorjs.com). No account is needed and your progress stays on your device.

## Features

### Languages
| | Words | Pronunciation help | Typing accepts |
| --- | --- | --- | --- |
| 🇹🇷 Turkish | 306 | Syllables, stress, IPA, respelling (rule-based) | Turkish, with ç ğ ı ö ş ü keys |
| 🇺🇦 Ukrainian | 188 | Syllables, stress on every word, IPA, respelling | Cyrillic or Latin transliteration (`dyakuyu`) |
| 🇯🇵 Japanese | 174 | Morae (beats), IPA, Hepburn rōmaji, kana reading under kanji | Kanji, kana or rōmaji (`tōkyō` / `toukyou`) |
| 🇸🇦 Arabic (MSA) | 179 | Fully vowelled script, transliteration, syllables, MSA stress, IPA; right-to-left | Arabic with or without vowel marks, or transliteration (`shukran`) |

Each language has its own alphabet/kana chart, sound guides and minimal-pair ear training. Progress, streak and daily goal are kept separately for each language. Switch from the language pill in the top bar.

### Vocabulary
- **Turkish: 306 words and phrases** in 12 topics (every language uses the same 12): Essentials, Numbers, People & Family, Food & Drink, Time & Days, Colors & Descriptions, Places & Travel, Home & Things, Body & Health, Common Verbs, Questions & Little Words, Nature & Animals. Many have example sentences and usage notes.
- **Lessons** introduce 5 words at a time (you can change this). Each word comes with audio, a pronunciation breakdown and an example, then a quick quiz checks you remember them.
- **Already learned:** tick off words you already know, during a lesson, in bulk per topic, or on a word's page. Lessons skip them, and they come back once after about a month for a quick check.
- **Spaced-repetition reviews** (an SM-2-style scheduler, like Anki) bring each word back just before you're likely to forget it.
- **Exercises get harder as you learn:** listening → reading → choosing the Turkish → flashcards → typing → speaking. The typing exercise has buttons for ç ğ ı ö ş ü. If you only get a special letter wrong, you're told exactly which one.
- **Practice mode** gives you free rounds on any topic, in any mode. It doesn't change your review schedule.
- **Progress:** streak, a 14-day activity chart, mastery per topic, and a searchable word list.

### Game mechanics, achievements and goals
- **XP and levels**:
  - Every answer earns XP: 10 for right, 6 for "almost", 2 for trying.
  - A combo of 5+ right answers in a row adds a bonus.
  - Bonuses for new words, finished and flawless sessions, the daily goal, speaking drills and ear training.
  - Levels come with titles: Beginner → Explorer → Word Collector → … → Polyglot.
- **34 achievements** in four groups: Learning, Habits, Pronunciation and Skill. Locked ones show "X of Y" progress.
- **Goals**:
  - a daily goal
  - three weekly challenges, new every Monday, +100 XP each
  - a personal goal per language ("learn 100 words by …") with a projection from your recent pace
- **Streak repair:** missed a day? Do double your daily goal today to save the streak.
- **Celebrations** for level-ups, badges and goals. They wait until a session ends, and rewards that arrive together share one card.
- Everything is on the **Journey** page (the 🏆 in the top bar). Game features can be switched off in Settings; the daily goal, streaks and personal goals stay.

### Pronunciation
- **Native-voice audio** at normal and slow speed, using your device's Turkish text-to-speech voice.
- **Breakdown for every word:**
  - syllables, with the stressed syllable highlighted (tap any syllable to hear it alone)
  - IPA
  - an English-friendly "say it like" respelling (e.g. *merhaba* → `MEHR-hah-bah`)
  - tips on surprising letters (c, ç, ğ, ı, ö, ş, ü, j)
- **Speak & score:** say a word into the microphone. Speech recognition transcribes it, the app gives you a score, and the letters you missed are highlighted with tips.
- **Record yourself** and hear your attempt played straight after the native audio.
- **Pronunciation lab:**
  - **Alphabet:** all 29 letters with sounds and example words
  - **Sounds:** guides to ı, ö, ü, ğ, the tapped r, double consonants, word stress and vowel harmony
  - **Ear training:** minimal pairs such as *kır/kir*, *on/ön*, *cam/çam* and *eli/elli*, with a quiz
  - **Speaking drill**

## Running it

```bash
npm start        # serves the website at http://localhost:8000 (no install needed)
npm test         # unit tests (Node 22+)
npm run build    # copies the web app into www/ (used by the native apps)
```

Any static file server works too, e.g. `python3 -m http.server`.

**Deploying:** `.github/workflows/pages.yml` publishes the app to GitHub Pages on every push to `main`. Turn it on once under **Settings → Pages → Source: GitHub Actions**.

## Android & iOS apps

The `android/` and `ios/` folders are native projects that wrap the web app. They use the same screens and content, but swap the browser speech APIs, which phone WebViews don't provide, for native ones:

| | Website | Android & iOS apps |
| --- | --- | --- |
| Audio | Web Speech API | Native text-to-speech (`@capacitor-community/text-to-speech`) |
| Speaking scores | Web Speech API | Native speech recognition (`@capacitor-community/speech-recognition`) |
| Progress storage | localStorage | localStorage, mirrored to native storage (`@capacitor/preferences`) |

### Getting a build

- **Android:** every push publishes an installable APK on the **[Android test build](https://github.com/ammarhijran/language/releases/tag/android-test-build)** release. Open that page on your phone, download the `.apk` and open it. You may need to allow installs from your browser or file manager. Test builds share one signing key, so each new one installs over the last and keeps your progress.
- **iOS:** every push compiles the app for the iOS Simulator to prove it builds. To install on a real iPhone, use Xcode (below) or TestFlight (see [STORE.md](STORE.md)).

### Running on your phone yourself

```bash
npm install
npm run cap:sync          # copies the web app into android/ and ios/
npm run android:open      # opens Android Studio → press Run with your phone plugged in
npm run ios:open          # opens Xcode (Mac only) → pick your iPhone → Run
```

- **Android:** needs Android Studio and JDK 21.
- **iOS:** needs a Mac with Xcode and CocoaPods. In Xcode, open *Signing & Capabilities* and select your Apple ID as the team. A free Apple ID can install on your own iPhone, but the app expires after 7 days.

Run `npm run cap:sync` again after changing anything in `js/`, `css/` or `index.html`.

### Publishing to the stores

See **[STORE.md](STORE.md)**. It's a step-by-step checklist for Google Play and the App Store. The listing text, screenshots, graphics, privacy policy, signing setup and the questionnaire answers are already prepared in `store/`.

## Browser support

| Feature | Where it works |
| --- | --- |
| Lessons, reviews, typing, progress | All modern browsers |
| Audio (text-to-speech) | All modern browsers, **if a Turkish voice is installed**. iOS, macOS, Android and Windows all offer one, and Microsoft Edge has free online Turkish voices. If none is found, the app tells you how to install one. |
| Speaking scores (speech recognition) | Chrome, Edge and Safari. Not Firefox. Most browsers send the audio to an online service to transcribe it. |
| Record & compare | All modern browsers |

## Project layout

```
index.html, css/styles.css     app shell & styles
js/app.js                      router + app context
js/views/                      home, learn, review, practice, pronounce, progress, settings, word
js/exercises.js, session.js    exercise types and the session runner
js/components.js               pronunciation panel, speak-and-score, recorder
js/srs.js                      spaced-repetition scheduler
js/game.js, celebrate.js       XP, levels, achievements, challenges, goals · reward overlays
js/compare.js                  scoring for typed and spoken answers
js/speech.js                   text-to-speech, recognition, recording
js/store.js                    on-device persistence, export/import
js/native.js                   access to native plugins inside the Android/iOS apps
android/, ios/                 native app projects (Capacitor)
assets/                        source images for app icons and splash screens
js/languages/common.js         makePack(): shared defaults for language packs
js/languages/tr/ uk/ ja/ ar/   language packs: vocab, alphabet/sounds, phonetics
```

## Adding a language

Each language is a pack in `js/languages/<code>/`, built with `makePack()` from `js/languages/common.js`. The documentation is at the top of that file; register the pack in `js/languages/index.js`.

A pack provides:
- `categories` and `vocab`
- `analyze(word)`, which returns syllables (or morae), stress, IPA and a respelling
- `normalize` / `stripDiacritics` for checking answers
- an alphabet, sound tips and minimal pairs

Optional hooks cover:
- right-to-left scripts (`dir`)
- a reading line, such as kana or transliteration (`reading`)
- romanised typing (`acceptedAnswers`)
- several spoken forms, such as kanji and kana (`spokenTargets`)

Turkish and Ukrainian sounds are derived from spelling. Japanese is derived from kana. Arabic is derived from a stored transliteration, because short vowels aren't written in everyday Arabic. The test suite checks every pack: unique ids, script, analysis, accepted answers and alphabet.

## Notes on the Turkish content

- Stress is marked only where it is confidently known. That covers regular final stress, plus common exceptions: question words, many adverbs, place names, the days of the week, loanwords such as *lokanta* and *domates*, and the syllable before a negative suffix (*anlamıyorum*). Words whose stress is uncertain or varies are left unmarked rather than guessed.
- IPA is a broad transcription.
