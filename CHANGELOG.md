# Changelog

## Unreleased

### Added
- **Sync between devices without storing any user data.**
  - **How it works:** a sync code (or file) is created on one device, carried by the learner (copy & paste, share sheet, or their own cloud drive) and merged on the other. There's no account, and Lisan never uploads anything.
  - **Encryption:** with a passphrase, the code is end-to-end encrypted (PBKDF2-SHA-256 210k iterations → AES-GCM-256).
  - **Merging:** a preview shows exactly what will change, and the merge never overwrites anything.
    - Each word keeps its most recent review, and day logs take the larger counts.
    - Achievements, letters and challenge progress are combined.
    - XP and counters are kept per device and added up, so nothing is double-counted.
  - **After a merge:** achievements earned by the combined progress unlock, and the app offers to send a code back for a two-way sync.
  - **Phone apps:** Share and Save as file use the system share sheet (`@capacitor/share`, `@capacitor/filesystem`).
  - **Where to find it:** Settings, and "I already use Lisan on another device" on the welcome screen.
- **Game mechanics, achievements and goals:**
  - **XP for every answer.** Combo bonuses for runs of right answers, plus bonuses for new words, finished and flawless sessions, the daily goal, speaking drills and ear training. Repeating the same word for points is capped at once per word per day.
  - **Levels and titles** (Beginner → Polyglot). The level card appears on the home screen and the Journey page.
  - **34 achievements** across words, mastery, topics, streaks, daily goals, challenges, pronunciation, ear training, the alphabet, combos, flawless sessions, levels and languages. Locked badges show progress, with accessible labels.
  - **Weekly challenges:** 3 per week from a pool of 8, the same for everyone that week, each worth +100 XP.
  - **Personal goals** per language, with an optional target date and a projection based on your last 14 days.
  - **Streak repair:** after missing one day, doing double the daily goal saves the streak.
  - **Celebrations:** confetti overlays that wait until a session ends and group simultaneous rewards on one card. They respect reduced-motion settings.
  - **In sessions:** a live XP chip and combo flame, and a rewards line on the summary screen.
  - **Journey page** (🏆 in the top bar, with a dot for new badges), plus a Settings switch to turn the game layer off.
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
