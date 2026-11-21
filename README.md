# Lisan — vocabulary & pronunciation

A language-learning web app focused on **vocabulary** and **pronunciation**. The first language is **Turkish 🇹🇷**.

It runs as a website (works offline, installable as a PWA) and as native **Android** and **iOS** apps built from the same code with [Capacitor](https://capacitorjs.com). No account is needed and your progress stays on your device.

## Features

### Vocabulary
- **306 Turkish words and phrases** in 12 topics: Essentials, Numbers, People & Family, Food & Drink, Time & Days, Colors & Descriptions, Places & Travel, Home & Things, Body & Health, Common Verbs, Questions & Little Words, Nature & Animals. Many have example sentences and usage notes.
- **Lessons** introduce 5 words at a time (you can change this). Each word comes with audio, a pronunciation breakdown and an example, then a quick quiz checks you remember them.
- **Spaced-repetition reviews** (an SM-2-style scheduler, like Anki) bring each word back just before you're likely to forget it.
- **Exercises get harder as you learn:** listening → reading → choosing the Turkish → flashcards → typing → speaking. The typing exercise has buttons for ç ğ ı ö ş ü. If you only get a special letter wrong, you're told exactly which one.
- **Practice mode** gives you free rounds on any topic, in any mode. It doesn't change your review schedule.
- **Progress:** streak, a 14-day activity chart, mastery per topic, and a searchable word list.

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

Every push builds both apps on GitHub Actions (**Actions** tab):

- **Android app**: download the `lisan-android-debug-apk` artifact, unzip it, and open `app-debug.apk` on an Android phone to install it. You may need to allow installs from unknown sources.
- **iOS app**: this compiles the app for the iOS Simulator to prove it builds. A real iPhone needs Xcode (below).

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

### Publishing

- **Google Play:** create an upload keystore (`keytool -genkey -v -keystore lisan.keystore -alias lisan -keyalg RSA -keysize 2048 -validity 10000`). Add these repository secrets:
  - `ANDROID_KEYSTORE_BASE64` (output of `base64 -w0 lisan.keystore`)
  - `ANDROID_KEYSTORE_PASSWORD`
  - `ANDROID_KEY_ALIAS`
  - `ANDROID_KEY_PASSWORD`

  The Android workflow then also builds a signed `.aab` to upload in the Play Console. A Google Play developer account costs a one-time $25.
- **App Store:** needs an Apple Developer Program membership ($99/year). In Xcode choose *Product → Archive*, then *Distribute App → App Store Connect*.
- **App ID:** `app.lisan.turkish`, set in `capacitor.config.json`, `android/app/build.gradle` and the Xcode project. Change it before your first store upload, because it can't be changed afterwards.
- **Icons and splash screens** are generated from `assets/` with `npx capacitor-assets generate`.

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
js/compare.js                  scoring for typed and spoken answers
js/speech.js                   text-to-speech, recognition, recording
js/store.js                    on-device persistence, export/import
js/native.js                   access to native plugins inside the Android/iOS apps
android/, ios/                 native app projects (Capacitor)
assets/                        source images for app icons and splash screens
js/languages/tr/               Turkish pack: vocab, alphabet/sounds, phonetics
```

## Adding a language

Each language is a self-contained pack in `js/languages/<code>/`. To add one, copy the shape of `js/languages/tr/index.js`; register it in `js/languages/index.js`.

A pack provides:
- `categories` and `words`
- `analyze()`, which returns syllables, stress, IPA and a respelling
- normalisation helpers for checking answers
- an alphabet, sound tips and minimal pairs

Turkish spelling is almost perfectly phonemic, so its syllables, IPA and respellings are generated by rules (`phonetics.js`). Only stress exceptions are marked by hand in `vocab.js`.

## Notes on the Turkish content

- Stress is marked only where it is confidently known. That covers regular final stress, plus common exceptions: question words, many adverbs, place names, the days of the week, loanwords such as *lokanta* and *domates*, and the syllable before a negative suffix (*anlamıyorum*). Words whose stress is uncertain or varies are left unmarked rather than guessed.
- IPA is a broad transcription.
