# Working notes for this repository

Notes for whoever (person or agent) picks up the next task. The README describes the product; this
file is about how to work on it without repeating mistakes already made.

## What it is

Lisan: a zero-dependency PWA (plain ES modules, no build step for development) wrapped with
Capacitor for Android and iOS. Four language packs — Turkish, Ukrainian, Japanese, Arabic (MSA and
Egyptian) — under `js/languages/<code>/`, built with `makePack()` in `js/languages/common.js`.

## Checks before every commit

- `npm test` — must be all green. Several tests are content guards (see below); a failure there is
  usually real.
- `npm run smoke` — every screen in all four languages (about a minute each). For layout changes
  also `SMOKE_WIDTH=320 SMOKE_TEXT=xl npm run smoke <code>`.
- `npm run monkey` — random clicking; worth running after a batch of features.
- A new file under `js/` or `css/` must be listed in `sw.js` (a test enforces it).
- A new exercise type must be mapped to a skill in `js/skills.js` (a test enforces it).
- A new achievement changes the count asserted in `tests/game.test.js` and quoted in the README.
- User-visible changes get a line in `CHANGELOG.md`; features worth finding get an entry in
  `js/views/help.js` (Tips) and, sparingly, in `js/news.js` (bump its `id`).

## How changes are verified

Unit tests cover the pure logic. Behaviour is checked with short Playwright scripts against
`npm start` (speech synthesis stubbed, `serviceWorkers: 'block'`, state seeded in
`localStorage['lisan:v1']`). That proves the right text reaches the voice and the screens work; it
does not prove how a real phone voice sounds. Say so when reporting anything about pronunciation.

Emulating a touch phone (`isMobile`, `hasTouch`, 320 px, text size `xl`) has found layout bugs the
desktop viewport missed. Use it for anything with wide content in narrow columns.

## Builds

Every push to the working branch runs the Android workflow, which publishes
`Lisan-1.0.0-build<N>.apk` on the `android-test-build` release (N is that workflow's run number).
A test-only push also takes a number. A run can get stuck or be cancelled on the runner; pushing
the next commit is the way forward (a stuck run cannot be re-run while it shows as running).

## Content rules

- All course content is AI-written and AI-checked, not yet reviewed by native speakers. Do not add
  long texts, speeches or large vocabulary batches without an independent review pass.
- Prefer features that reuse reviewed content or apply rules without exceptions. The rule quizzes
  (vowel harmony, я ю є, は/へ, sun and moon letters) are built that way, and each has a test that
  cross-checks it against the course data.
- Content guards in the test suite: Arabic transliteration follows the sun-and-moon rule for every
  word with the article; Turkish plurals and question words follow vowel harmony (known loanword
  exceptions are listed in the test); no wrong-script letters inside words in any language.
  If one fails on new content, first decide whether the content or the allow-list is wrong.
- Hand-picked word lists (for example `HARMONY_WORDS`) must stay on words that follow the rule;
  borrowed words such as *saat* are deliberately excluded.

## Where state lives

- `store.js` state: `settings`, `progress` (cards, days, favourites, notes), `game`, `words` (My
  words), `mine` (My texts), `say` (voice respellings), `skills` (recent answers per skill).
- Sync codes carry progress, game, notes and My words. They do not carry settings, My texts, voice
  respellings or skills — those are device-local and in backup files only. Keep `privacy.html` in
  step when that changes.
- Small per-device conveniences (reader position, last missed words, quiz misses) use
  `devicePref` / `setDevicePref` in `js/components.js`.
- Voice respellings are keyed by entry id, or by `text:<sentence>` for sentences without an id.

## Pitfalls already hit

- Object literals in a pack: a later `speech()` method silently overrides an earlier `speech:`
  property. Search the file before adding a key.
- Look-ups on plain objects keyed by user data need `Object.hasOwn` (`constructor`, `toString`).
- A bottom sheet stops key events in the capture phase, so key handlers on inputs inside it never
  fire; use a `<form>` and its submit instead.
- `flex-shrink: 0` on a button in the reader's player bar overflows at 320 px with large text
  unless the row can wrap.
- Two-glyph options (きゃ キャ) do not fit two columns on a narrow phone; use one column.
- An inline button with a minimum tap height inside a paragraph breaks the line spacing; put it on
  its own line.
- In Playwright, a slow tail of output (`| tail`) hides progress of long runs; background them.

## Still open (needs the owner)

1. Japanese pitch accent: permission to run two dictionary tools, and whether data derived from
   NAIST-JDIC may ship.
2. Native-speaker review of the content. One concrete question: are *salı, cuma, pazar, çorba*
   stressed on the last syllable (they are unmarked)?
3. A check on a real phone — everything since build 46 has only run in desktop Chromium.
4. Whether to try R8 code shrinking for the Android build.
5. New long texts and speeches are on hold until reviewers are available.
