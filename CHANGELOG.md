# Changelog

## Unreleased

### Added
- **Three new languages: Ukrainian 🇺🇦, Japanese 🇯🇵 and Arabic 🇸🇦**, alongside Turkish. Each has its own vocabulary in the same 12 topics, pronunciation breakdowns, alphabet or kana chart, sound guides and ear-training pairs.
  - **Ukrainian:** 188 words. Stress is marked on every word, since Ukrainian stress is free. Soft consonants, ь and the apostrophe are handled. Answers can be typed in Latin transliteration.
  - **Japanese:** 174 words. A kana reading and Hepburn rōmaji appear under the kanji. Words are split into beats (morae), and long vowels, っ and ん are handled. Answers can be typed in kanji, kana or rōmaji. Speech is matched against both kanji and kana.
  - **Arabic (Modern Standard):** 179 words with full vowel marks and transliteration. Syllables and stress follow standard MSA rules, and the script is shown right to left without flipping the rest of the layout. Answers can be typed with or without vowel marks, or in transliteration. Arabic-Indic digits are understood in speech.
- **Language switcher:** use the language pill in the top bar, the language step on the welcome screen, or Settings. Progress, streaks and daily goals are kept separately for each language, and the chosen voice is remembered per language.
- Shared language-pack builder (`makePack`) and tests that check every pack.
- **Already learned**: mark words you already know so lessons skip them.
  - On a new-word card in a lesson, tap **Already learned**; that word's quiz questions are skipped.
  - Tick words in bulk per topic on the *Already learned* screen (Learn page or Progress page). Unticking undoes it.
  - Toggle it on any word's page.
  - Already-learned words come back once for a quick check after about a month. Get one wrong and it returns to normal practice.
  - They have their own colour in the Progress mastery chart, and they don't count toward the daily goal.
- **Welcome screen** on first launch: pick a daily goal (Casual 10 · Regular 20 · Serious 40 · Intense 60 exercises), check that Turkish audio works, and learn how speaking practice uses the microphone.
- **Daily goal** ring on the home screen, a "goal reached" celebration, and a daily-goal setting.

### Fixed
- CSS custom properties passed through the DOM helper (`style: { '--pct': … }`) were silently ignored, so the pronunciation score ring never showed its fill.

## 1.0.0 — 2026-11-21
- First release: Turkish vocabulary & pronunciation web app, Android and iOS apps, store preparation.
