// Generates App Store / Google Play screenshots and graphics into store/.
//
//   npm start                     # in one terminal (serves the app on :8000)
//   node scripts/store-screenshots.cjs
//
// Requires Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
// Speech APIs are mocked so the screens show audio, voices and a
// pronunciation score without a microphone.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.LISAN_URL || 'http://localhost:8000/';
const OUT = path.join(__dirname, '..', 'store');
// The id of the current “What’s new” list (js/news.js), so the seeded state has already seen it.
const NEWS_ID = (/id: '([^']+)'/.exec(fs.readFileSync(path.join(__dirname, '..', 'js', 'news.js'), 'utf8')) || [])[1] || '';

// The store set, in order. Most people see only the first three, so they carry
// the pitch: the promise, the main feature in use, what makes the app different.
// Headlines stay at six words or fewer (readable as a thumbnail); store text
// never has em or en dashes (tests/store-assets.test.js checks both). At most one dark shot.
const SHOTS = [
  { id: '01-home', lang: 'tr', title: 'Four languages, fully offline', sub: 'Turkish, Ukrainian, Japanese and Arabic. No account needed', go: '#/' },
  { id: '02-lesson', lang: 'ja', title: 'Hear it, read it, learn it', sub: 'Every word with its sound, reading and an example', go: 'lesson' },
  { id: '03-speak', lang: 'tr', title: 'See which sounds to fix', sub: 'Say a word and the letters to work on light up', go: 'speak' },
  { id: '04-busy', lang: 'tr', title: 'Practise anywhere, even in silence', sub: 'Listening only for busy places, speaking only on walks', go: '#/practice', settings: { studyMode: 'listen' } },
  { id: '05-phrasebook', lang: 'ar', title: 'Phrases for real situations', sub: 'Standard and Egyptian Arabic, polite and everyday', go: '#/phrases' },
  { id: '06-read', lang: 'uk', title: 'Read and listen, line by line', sub: 'Dialogues and stories with tap a word help', go: '#/read/uk-the-mitten-tale' },
  { id: '07-themes', lang: 'tr', title: 'Your colours, light or dark', sub: 'Eight ready-made themes, or make your own', go: '#/settings/display', settings: { theme: 'dark' }, dark: true },
  { id: '08-progress', lang: 'tr', title: 'Reviews come before you forget', sub: 'Spaced repetition, streaks and a daily goal', go: '#/progress' },
];

const TARGETS = [
  // App Store: 6.9" iPhone (1290×2796) and 13" iPad (2064×2752). Google Play: phone 1080×1920.
  { dir: 'ios-iphone-6.9', w: 1290, h: 2796, viewport: { width: 430, height: 932 }, scale: 3, frame: 0.8, title: 96, sub: 46 },
  { dir: 'ios-ipad-13', w: 2064, h: 2752, viewport: { width: 1032, height: 1376 }, scale: 2, frame: 0.8, title: 120, sub: 56 },
  { dir: 'android-phone', w: 1080, h: 1920, viewport: { width: 412, height: 870 }, scale: 2.625, frame: 0.66, title: 92, sub: 40 },
  // Google Play tablets: 7-inch (1200×1920) and 10-inch (1600×2560).
  { dir: 'android-tablet-7', w: 1200, h: 1920, viewport: { width: 600, height: 900 }, scale: 2, frame: 0.72, title: 96, sub: 42 },
  { dir: 'android-tablet-10', w: 1600, h: 2560, viewport: { width: 640, height: 1000 }, scale: 2.5, frame: 0.74, title: 124, sub: 54 },
];
// Store screenshots show a clean phone status bar: a fixed time, full signal and battery, no notifications.
const STATUS_TIME = '9:41';

function mocks(state) {
  if (location.protocol === 'about:') return;
  localStorage.setItem('lisan:v1', state);
  const s = window.speechSynthesis;
  const voices = [['Yelda', 'tr-TR'], ['Lesya', 'uk-UA'], ['Kyoko', 'ja-JP'], ['Maged', 'ar-SA'], ['Salma', 'ar-EG']]
    .map(([name, lang]) => ({ name, lang, voiceURI: name, localService: true, default: false }));
  window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
  s.getVoices = () => voices;
  s.speak = (u) => setTimeout(() => u.onend && u.onend(), 20);
  s.cancel = () => {};
  window.SpeechRecognition = class {
    start() { setTimeout(() => this.onresult({ results: [[{ transcript: window.__heard || '', confidence: 0.9 }]] }), 50); }
    stop() {} abort() {}
  };
}

function seedState(lang, extra = {}) {
  const now = Date.now();
  const day = 864e5;
  const learned = ['merhaba', 'selam', 'günaydın', 'iyi-akşamlar', 'iyi-geceler', 'hoşça-kal', 'güle-güle', 'görüşürüz', 'nasılsın', 'iyiyim',
    'teşekkürler', 'lütfen', 'evet', 'hayır', 'tamam', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on',
    'su', 'ekmek', 'çay', 'kahve', 'süt', 'peynir', 'zeytin', 'anne', 'baba', 'kardeş', 'arkadaş', 'çocuk', 'aile'];
  const cards = {};
  learned.forEach((id, i) => {
    const interval = [1, 3, 8, 21, 34][i % 5];
    cards[id] = { ease: 2.5, interval, reps: 2 + (i % 4), lapses: 0, due: i % 6 === 0 ? now - 3600e3 : now + interval * day, added: now - 20 * day };
  });
  const days = {};
  for (let k = 0; k < 14; k++) {
    if (k === 9) continue;
    const d = new Date(now - k * day);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days[key] = { reviews: 8 + ((k * 7) % 13), learned: k % 3 ? 0 : 5, practiced: 4, correct: 8 };
  }
  // (newsSeen: the “New in …” card is not what a store screenshot should show)
  // (motion off: every screen is captured at rest, never half-way through an animation)
  return JSON.stringify({ settings: { autoplay: false, onboarded: true, lang, newsSeen: NEWS_ID, motion: 'off', ...extra }, progress: { tr: { cards, days } } });
}

async function capture(browser, t, shot, state) {
  const ctx = await browser.newContext({ viewport: t.viewport, deviceScaleFactor: t.scale, colorScheme: shot.dark ? 'dark' : 'light', serviceWorkers: 'block' });
  await ctx.addInitScript(mocks, state);
  const page = await ctx.newPage();
  if (shot.go === 'speak') {
    await page.goto(`${BASE}#/word/${encodeURIComponent('günaydın')}`);
    await page.waitForSelector('.word-detail');
    await page.evaluate(() => { window.__heard = 'günaydin'; });
    await page.click('.speak .mic-btn');
    await page.waitForSelector('.speak-result:not([hidden])');
  } else if (shot.go === 'lesson') {
    await page.goto(`${BASE}#/learn/essentials`);
    await page.waitForSelector('.intro');
  } else {
    await page.goto(BASE + shot.go);
    await page.waitForSelector('.tabbar');
    await page.waitForTimeout(600);
  }
  // The start screen hands over after about a second: wait until it has gone.
  await page.waitForFunction(() => !document.getElementById('boot'), null, { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500);
  // Achievement pop-ups (the seeded progress earns a few) would cover the screen.
  for (let i = 0; i < 8 && await page.$('.celebrate'); i++) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);
  }
  // Bring the interesting part of the screen just below the top bar.
  const focus = { speak: '.speak', '#/phrases': '.chip-scroll', '#/read/uk-the-mitten-tale': '.read-tr', '#/practice': '.study-mode' }[shot.go];
  if (focus) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const box = sel === '.speak' ? el.closest('section, .card') : sel === '.study-mode' ? (el.previousElementSibling || el) : el;
      // Below the top bar, and below the reader's sticky player bar where there is one.
      const bar = document.querySelector('.read-bar');
      const covered = document.querySelector('.topbar').offsetHeight + (bar ? bar.offsetHeight + 8 : 0);
      const top = box.getBoundingClientRect().top + window.scrollY - covered - 12;
      window.scrollTo(0, top);
    }, focus);
    await page.waitForTimeout(300);
  }
  const buf = await page.screenshot();
  await ctx.close();
  return buf;
}

/** Signal, Wi-Fi and a full battery, in the text colour. */
function statusIcons(px) {
  return `<span style="display:flex;gap:${Math.round(px * 0.35)}px;align-items:center">
    <svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2z"/></svg>
    <svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21 0 8a17 17 0 0 1 24 0z"/></svg>
    <svg width="${Math.round(px * 1.5)}" height="${px}" viewBox="0 0 36 24"><rect x="1" y="5" width="30" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="8" width="24" height="8" rx="1.5" fill="currentColor"/><rect x="32" y="9" width="3" height="6" rx="1" fill="currentColor"/></svg></span>`;
}

async function compose(browser, t, shot, png) {
  const page = await browser.newPage({ viewport: { width: t.w, height: t.h } });
  const frameW = Math.round(t.w * t.frame);
  const radius = Math.round(frameW * 0.075);
  const bar = Math.round(frameW * 0.075); // the status bar's height
  await page.setContent(`<!doctype html><html><body style="margin:0;width:${t.w}px;height:${t.h}px;overflow:hidden;
      background:radial-gradient(circle at 20% 0%, #9a4130 0%, #7A2F1F 45%, #5a2014 100%);
      font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;display:flex;flex-direction:column;align-items:center">
    <h1 style="color:#fff;font-size:${t.title}px;font-weight:800;line-height:1.08;text-align:center;text-wrap:balance;letter-spacing:-.01em;margin:${Math.round(t.h * 0.055)}px ${Math.round(t.w * 0.07)}px 0">${shot.title}</h1>
    <p style="color:rgba(255,255,255,.86);font-size:${t.sub}px;line-height:1.3;text-align:center;text-wrap:balance;margin:${Math.round(t.sub * 0.6)}px ${Math.round(t.w * 0.09)}px 0">${shot.sub}</p>
    <div style="margin-top:${Math.round(t.h * 0.045)}px;width:${frameW}px;border-radius:${radius}px;overflow:hidden;
      border:${Math.round(frameW * 0.022)}px solid #15110e;background:#15110e;box-shadow:0 40px 90px rgba(0,0,0,.35)">
      <div style="display:flex;align-items:center;justify-content:space-between;height:${bar}px;padding:0 ${Math.round(bar * 0.9)}px;
        background:${shot.dark ? '#121110' : '#faf7f2'};color:${shot.dark ? '#f3eee6' : '#1f1b16'};font-weight:600;font-size:${Math.round(bar * 0.5)}px;
        border-radius:${Math.round(radius * 0.8)}px ${Math.round(radius * 0.8)}px 0 0">
        <span>${STATUS_TIME}</span>${statusIcons(Math.round(bar * 0.48))}</div>
      <img src="data:image/png;base64,${png.toString('base64')}" style="display:block;width:100%">
    </div></body></html>`);
  const dir = path.join(OUT, 'screenshots', t.dir);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${shot.id}.png`) });
  await page.close();
}

// The name on the feature graphic.
const APP_NAME = 'Four Tongues';

async function graphics(browser) {
  const dir = path.join(OUT, 'graphics');
  fs.mkdirSync(dir, { recursive: true });
  // The app icon: a tea glass whose steam becomes a speech bubble, on terracotta (design/icons/, see its README).
  const logo = fs.readFileSync(path.join(__dirname, '..', 'design', 'icons', 'app-icon-512.svg'), 'utf8');
  const sized = (px) => logo.replace(/<svg ([^>]*?)width="\d+" height="\d+"/, `<svg $1width="${px}" height="${px}"`);

  // Google Play app icon: 512×512, full-bleed square (Play applies its own mask).
  let page = await browser.newPage({ viewport: { width: 512, height: 512 } });
  await page.setContent(`<body style="margin:0">${sized(512)}</body>`);
  await page.screenshot({ path: path.join(dir, 'play-icon-512.png') });
  await page.close();

  // App Store icon: 1024×1024, no transparency, no rounded corners.
  page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
  await page.setContent(`<body style="margin:0">${sized(1024)}</body>`);
  await page.screenshot({ path: path.join(dir, 'app-store-icon-1024.png') });
  await page.close();

  // Google Play feature graphic: 1024×500, on the icon's own terracotta.
  page = await browser.newPage({ viewport: { width: 1024, height: 500 } });
  await page.setContent(`<body style="margin:0;width:1024px;height:500px;overflow:hidden;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
      background:#7A2F1F;display:flex;align-items:center;gap:12px;padding:0 56px 0 20px;box-sizing:border-box">
    <div style="flex-shrink:0;width:360px;height:360px">${sized(360)}</div>
    <div style="color:#FBEFDC">
      <div style="font-size:84px;font-weight:800;letter-spacing:-.02em;line-height:1;white-space:nowrap">${APP_NAME}</div>
      <div style="font-size:29px;font-weight:600;margin-top:18px;white-space:nowrap">
        <span style="color:#F4958B">Turkish</span> · <span style="color:#8DBBEE">Ukrainian</span> · <span style="color:#F2B95E">Japanese</span> · <span style="color:#77CFAE">Arabic</span></div>
      <div style="font-size:25px;margin-top:18px;opacity:.85;white-space:nowrap">Merhaba · Привіт · こんにちは · مرحبا</div>
    </div></body>`);
  await page.screenshot({ path: path.join(dir, 'play-feature-graphic-1024x500.png') });
  await page.close();
}

(async () => {
  const browser = await chromium.launch();
  // `node scripts/store-screenshots.cjs graphics`: only the icon and the feature graphic.
  // STORE_ONLY=android-phone (a folder name, or several with commas) renders only those sets.
  const only = process.env.STORE_ONLY ? process.env.STORE_ONLY.split(',') : null;
  for (const t of process.argv[2] === 'graphics' ? [] : TARGETS.filter((x) => !only || only.includes(x.dir))) {
    // A fresh folder per target, so a shot that was dropped or renamed does not linger.
    fs.rmSync(path.join(OUT, 'screenshots', t.dir), { recursive: true, force: true });
    for (const shot of SHOTS) {
      const png = await capture(browser, t, shot, seedState(shot.lang, shot.settings));
      await compose(browser, t, shot, png);
      process.stdout.write('.');
    }
  }
  await graphics(browser);
  await browser.close();
  console.log(`\nWrote screenshots and graphics to ${OUT}`);
})().catch((e) => { console.error(e); process.exit(1); });
