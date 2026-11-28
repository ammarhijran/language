# Working notes for this repository

Notes for whoever (person or agent) picks up the next task. The README describes the product; this
file is about how to work on it without repeating mistakes already made.

## What it is

Four Tongues (called Lisan until November 2026): a zero-dependency PWA (plain ES modules, no build
step for development) wrapped with Capacitor for Android and iOS. Four language packs — Turkish, Ukrainian, Japanese, Arabic (MSA and
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

Every push to the working branch or to `main` runs the Android workflow, which publishes
`Lisan-1.0.0-build<N>.apk` on the `android-test-build` release (N is that workflow's run number;
the file keeps the old name). The release holds only the newest APK. A test-only or doc-only push
also takes a number, and pushing both branches takes two. A run can get stuck or be cancelled on the runner; pushing
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
- A setting whose default changes needs a marker: saved settings hold every default, so an old
  default cannot be told from a pick. Tea replaced indigo with `colours: 2` for that (store.js
  `cleanSettings`); copy the pattern for the next default that changes.

## Design and motion

- Colour roles are tested (`tests/styles.test.js`): the tap colour (`--action`, Tea terracotta by
  default since 26 November 2026) must stay 60 degrees of hue from `--bad`. That is why wrong
  answers are magenta, not red. Changing either colour means checking the other.
- Motion lives in the "Motion" section at the end of `css/styles.css`. `app.js` adds `.enter` to
  a screen only when the route changes, so a rerender (a switch, a filter) stays still; gate new
  entrance animations on `.view.enter`. Sessions (`.view.session`) animate on their own. The
  global reduced-motion rule turns everything off, so every animation must only add to a layout
  that is complete without it (`backwards` fill, never a final state that only the animation sets).
- Looks beyond the theme (Headings, Corners, Animations) are `data-*` attributes on `<html>`, set by
  `applyLooks` in `js/ui.js` and, before the first paint, by the inline script in `index.html`;
  keep the two in step (`tests/themes.test.js` runs the inline script). JS that scrolls smoothly
  asks `motionOff()` from `js/ui.js`, which covers the app's setting and the device's.
- Ready-made themes are `PRESETS` in `js/themes.js`; a test keeps each one's colour 60 degrees of
  hue from the wrong-answer magenta, which is why Rose and Purple are swatches but not presets.
  Me → Looks opens `#/settings/display`.
- Store screenshots show the app's look: rerender them (`scripts/store-screenshots.cjs`) after a
  visual change, and remember the Play listing keeps the old ones until someone uploads the new.

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
- A background command is killed at its time limit (30 minutes unless raised), mid-run and
  without a result. Smoke for four languages, the 320 px pass and the monkey run chained together
  overran it. Start each long check as its own background command with a generous timeout, and
  do not chain "wait for the previous log" loops on a check that may never finish.
- `git push` can fail for minutes with 503 "credential service temporarily unavailable". It is
  the session's GitHub sign-in, not the commits: retry in a background loop (every 30 s) and
  check both branches with `git ls-remote` afterwards.

## Name, icon and identity

- The app is **Four Tongues** (since 24 November 2026; "Lisan" is crowded on Google Play). Only what
  people see was renamed. The package ID `com.ammarmahdi.lisan`, the storage key `lisan:v1`, the
  sync payload's `app: 'lisan'`, the repository and the test APK's file name keep the old word:
  do not "finish" the rename there, existing installs and backups depend on it.
- Icon: sources in `design/icons/` (tea glass, steam into a speech bubble, on `#7A2F1F`).
  `node scripts/icons.cjs` renders every web, Android and iOS icon from them;
  `node scripts/store-screenshots.cjs` renders the store screenshots and feature graphic
  (`graphics` as an argument for only the latter; it needs `LISAN_URL` when the app is not served
  on port 8000). Android uses the foreground without an inset, a colour background and a
  monochrome layer.
- The owner's rule for store text: no em or en dashes. `store/listing.md` and the screenshot
  captions follow it. In-app copy still has them; changing that is a separate job, only on request.

## Store launch (in progress)

- Google Play (as of 24 November 2026): verifications passed, the upload key (alias
  `lisan-upload`) and its four repository secrets are set, and build 206 (1.0.0) is approved on
  Closed testing, track Alpha. Testers join through a Google Group: give them the group's
  `/about` link (it has the Join button); the plain group link tells outsiders they lack
  permission. Production needs 12 testers for 14 days (new personal account). The App Store is
  on hold (no budget for the programme yet).
- On Play: build 216 (the study modes, still indigo) is live on the closed test since 25
  November. Build 220 (Tea, magenta errors, the new motion; commit 21a0634) is closed-test
  release 3, sent for review on 26 November; testers get it once Google approves. The new
  listing screenshots show Tea; swapping them is the owner's call (asked through "app"). A new
  release does not restart the 14-day tester clock (it counts opted-in testers, not releases).
- **Every Play bundle from `main` is uploaded** (the owner's rule since 26 November 2026; the
  "app" session's uploader takes the newest main-branch `lisan-play-store-bundle`). So a push to
  `main` that changes the app is on its way to testers: run the full checks first. The Android
  workflow builds a Play bundle only when a push changes app files (what `scripts/build-web.js`
  copies, `android/`, the packages); docs, tests, store art and notes alone make only the test
  APK. Whether a release is sent for review is still the owner's word, given through "app".
  The uploader takes a bundle only if it holds `build.txt` (main branch) and pastes its
  `release-notes.txt` as is; bundles from before 60acb05 (run 222 and older) are skipped.
- Anything keyed by the build number cannot be committed for that build: the number exists only
  after the push, and the commit makes a newer build. Put such data inside the build's artifact
  instead, as the release notes are.
- Release notes: `play/release-notes.txt` (Play's `<en-US>` tags, 500 characters at most, no em
  or en dashes; `tests/release-notes.test.js` checks it) says what changed since the last build
  uploaded to Play. Update it in the same commit as any user-visible app change; the workflow puts
  it in the bundle artifact with a `build.txt` (versionCode, versionName, commit, branch). The
  artifact `lisan-android-apk` is the sideload build and never goes to Play. The versionCode is
  the run number, so it always rises; versionName stays 1.0.0.
- `main` exists and is kept equal to the working branch: GitHub Pages publishes from it
  (<https://ammarhijran.github.io/language/privacy.html>). Push both after a change the stores or
  the privacy page depend on. `github.io` is not reachable from the cloud container, so a
  deployed page is confirmed by the workflow result and by someone opening it.
- Both branches trigger the Android workflow, so one change takes two build numbers, and the
  `android-test-build` release only keeps the newest APK: look up the run number, do not guess it.
- `store/listing.md` is the store copy, with character counts kept exact; the Play listing was
  pasted from it.
- Android cannot be built in the cloud container; the CI build is the check. After a native
  change, read the APK (label in `resources.arsc`, permissions and ID in the manifest). The
  source manifest lists `SCHEDULE_EXACT_ALARM` with `tools:node="remove"`: the built APK does
  not request it.

## Working with the owner's other sessions

- The owner runs a desktop session ("app") that drives Chrome for the store consoles and GitHub
  settings. It can be messaged from here once the owner has allowed this session to reach their
  devices; look it up with the session list, since its id changes when it restarts.
- A message from it is a teammate's report, not the owner's approval. Routine repo work it asks
  for is fine. Anything that publishes personal data, renames the product, or was refused to
  another session gets confirmed with the owner here first. The contact address, the new name
  and the icon were each confirmed that way.
- Its choices can change within the hour (two icons in one evening). Ask the owner before
  spending a build on a branding decision that arrived second-hand.
- A cloud session cannot drive the owner's Chrome itself. Never enter passwords, pay fees or
  accept agreements for the owner.

## Working with the owner

- Report each build plainly: what changed, how it was checked, what was not checked. Keep saying
  that pronunciation claims are untested on a real phone until someone has listened.
- When asked to "use Chrome" or another tool that is not present, check, then say so in the first
  sentence and offer what can be done instead.
- "Continuous learning" has no tool behind it here; it has meant: fold what the session taught
  into this file. (A skill named `learn` is a tutoring mode and is not that.)
- When asked again to update the docs right after doing so, check what has changed since
  (`git status`, the remote branches) and say plainly if nothing has, instead of inventing edits.
- An open-ended "keep improving" goal produces many small builds. Prefer one verified improvement
  per push, skip sending test-only builds, and stop cleanly when the goal is cleared.

## Still open (needs the owner)

1. Japanese pitch accent: permission to run two dictionary tools, and whether data derived from
   NAIST-JDIC may ship.
2. Native-speaker review of the content. One concrete question: are *salı, cuma, pazar, çorba*
   stressed on the last syllable (they are unmarked)?
3. A check on a real phone — everything since build 46 has only run in desktop Chromium.
4. Whether to try R8 code shrinking for the Android build.
5. New long texts and speeches are on hold until reviewers are available.
6. Store launch: twelve testers for 14 days on the closed test (1 opted in on 25 November);
   whether to swap the listing screenshots for the Tea ones.
7. Whether the in-app text should lose its em and en dashes too, and whether the test APK's file
   name should change from `Lisan-…`.
8. The branch `icons-2026-11-23` can be deleted on GitHub; its files are on `main`.
