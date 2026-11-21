# Changelog

## Unreleased

### Added
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
