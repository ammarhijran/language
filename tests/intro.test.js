// The start screen (index.html + js/boot.js) and the settings panel's wiring.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { introWait, isDeepLink, INTRO_MS, INTRO_BEAT_MS } from '../js/boot.js';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

test('the start screen: about a second, a short beat after a slow start, none for a deep link or a tap', () => {
  assert.ok(INTRO_MS <= 1000, 'about a second at most');
  assert.equal(introWait(200), INTRO_MS - 200, 'a fast start still shows the whole entrance');
  assert.equal(introWait(3000), INTRO_BEAT_MS, 'a slow start only adds a short beat');
  assert.equal(introWait(200, { deepLink: true }), 0, 'a reminder or shortcut goes straight to its screen');
  assert.equal(introWait(200, { skipped: true }), 0, 'a tap skips it');
  for (const h of ['', '#', '#/', '#/welcome']) assert.equal(isDeepLink(h), false, h);
  for (const h of ['#/review', '#/word/su', '#/settings']) assert.equal(isDeepLink(h), true, h);
});

test('the start screen and the Android splash show the same picture', () => {
  const html = read('index.html');
  assert.match(html, /<div id="boot" class="boot intro"/, 'the loading screen starts as the intro');
  assert.match(html, /\.boot\.intro \{ background: #7A2F1F;/, 'on the icon’s terracotta');
  assert.match(html, /\.boot\.intro \.boot-mark \{[^}]*width: 288px; height: 288px/, 'the mark at the size Android 12 draws it');
  assert.match(html, /nativePromise\('SplashScreen', 'hide'/, 'the system splash goes once the page has painted');
  const styles = read('android/app/src/main/res/values/styles.xml');
  assert.match(styles, /windowSplashScreenBackground">@color\/splash_background/);
  assert.match(styles, /windowSplashScreenAnimatedIcon">@mipmap\/ic_launcher_foreground/);
  assert.match(read('android/app/src/main/res/values/splash_colors.xml'), /#7A2F1F/);
  const cap = JSON.parse(read('capacitor.config.json'));
  assert.equal(cap.plugins.SplashScreen.backgroundColor, '#7A2F1F');
  assert.ok(cap.plugins.SplashScreen.launchShowDuration <= 3000, 'a safety limit, not a delay: the page hides it sooner');
  assert.equal(read('icons/splash-mark.svg'), read('design/icons/app-adaptive-foreground.svg'), 'the mark is the icon’s own foreground');
});

test('settings open as a side panel from the top bar; Me keeps progress and profile', () => {
  const app = read('js/app.js');
  assert.match(app, /class: 'icon-btn top-settings', 'aria-label': 'Settings'/, 'a Settings button in the top bar');
  assert.match(app, /if \(name === 'settings'\) \{/, '#/settings opens the panel instead of a page');
  const me = read('js/views/me.js');
  assert.doesNotMatch(me, /'#\/settings'|'#\/settings\/display'/, 'no Settings or Looks rows on Me');
  const panel = read('js/panel.js');
  assert.match(panel, /role: 'dialog', 'aria-modal': 'true'/);
  const css = read('css/styles.css');
  assert.match(css, /\.panel \{[^}]*inset-inline-end: 0; width: min\(420px, 88vw\)/, 'from the end side, never the whole width');
  assert.match(css, /\[dir="rtl"\] \.panel \{ animation-name: panel-in-rtl; \}/, 'mirrored for a right-to-left page');
});
