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

const SHOTS = [
  { id: '01-home', lang: 'tr', title: 'Turkish, Ukrainian, Japanese or Arabic', sub: 'Words, phrases, grammar and pronunciation — works offline', go: '#/' },
  { id: '02-lesson', lang: 'ja', title: 'Every word with its sound and reading', sub: 'Kana, rōmaji, syllables and an example sentence', go: 'lesson' },
  { id: '03-speak', lang: 'tr', title: 'Say it — and see what to fix', sub: 'Pronunciation scores show which letters to work on', go: 'speak' },
  { id: '04-phrasebook', lang: 'ar', title: 'A phrasebook for real situations', sub: 'Polite and everyday forms — Standard and Egyptian Arabic', go: '#/phrases' },
  { id: '05-read', lang: 'uk', title: 'Read and listen, line by line', sub: 'Dialogues, stories and speeches with a tap-a-word glossary', go: '#/read/uk-the-mitten-tale' },
  { id: '06-progress', lang: 'tr', title: 'Reviews arrive right before you’d forget', sub: 'Spaced repetition, streaks and daily goals', go: '#/progress' },
];

const TARGETS = [
  // App Store: 6.9" iPhone (1290×2796) and 13" iPad (2064×2752). Google Play: phone 1080×1920.
  { dir: 'ios-iphone-6.9', w: 1290, h: 2796, viewport: { width: 430, height: 932 }, scale: 3, frame: 0.8, title: 96, sub: 46 },
  { dir: 'ios-ipad-13', w: 2064, h: 2752, viewport: { width: 1032, height: 1376 }, scale: 2, frame: 0.8, title: 120, sub: 56 },
  { dir: 'android-phone', w: 1080, h: 1920, viewport: { width: 412, height: 870 }, scale: 2.625, frame: 0.68, title: 70, sub: 34 },
];

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

function seedState(lang) {
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
  return JSON.stringify({ settings: { autoplay: false, onboarded: true, lang }, progress: { tr: { cards, days } } });
}

async function capture(browser, t, shot, state) {
  const ctx = await browser.newContext({ viewport: t.viewport, deviceScaleFactor: t.scale, colorScheme: 'light', serviceWorkers: 'block' });
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
  await page.waitForTimeout(500);
  // Achievement pop-ups (the seeded progress earns a few) would cover the screen.
  for (let i = 0; i < 8 && await page.$('.celebrate'); i++) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);
  }
  // Bring the interesting part of the screen just below the top bar.
  const focus = { speak: '.speak', '#/phrases': '.chip-scroll', '#/read/uk-the-mitten-tale': '.read-tr' }[shot.go];
  if (focus) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const box = sel === '.speak' ? el.closest('.card') : el;
      const top = box.getBoundingClientRect().top + window.scrollY - document.querySelector('.topbar').offsetHeight - 12;
      window.scrollTo(0, top);
    }, focus);
    await page.waitForTimeout(300);
  }
  const buf = await page.screenshot();
  await ctx.close();
  return buf;
}

async function compose(browser, t, shot, png) {
  const page = await browser.newPage({ viewport: { width: t.w, height: t.h } });
  const frameW = Math.round(t.w * t.frame);
  const radius = Math.round(frameW * 0.075);
  await page.setContent(`<!doctype html><html><body style="margin:0;width:${t.w}px;height:${t.h}px;overflow:hidden;
      background:radial-gradient(circle at 20% 0%, #e0283f 0%, #c8102e 45%, #8f0b21 100%);
      font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;display:flex;flex-direction:column;align-items:center">
    <h1 style="color:#fff;font-size:${t.title}px;font-weight:800;line-height:1.08;text-align:center;letter-spacing:-.01em;margin:${Math.round(t.h * 0.055)}px ${Math.round(t.w * 0.07)}px 0">${shot.title}</h1>
    <p style="color:rgba(255,255,255,.86);font-size:${t.sub}px;line-height:1.3;text-align:center;margin:${Math.round(t.sub * 0.6)}px ${Math.round(t.w * 0.09)}px 0">${shot.sub}</p>
    <div style="margin-top:${Math.round(t.h * 0.045)}px;width:${frameW}px;border-radius:${radius}px;overflow:hidden;
      border:${Math.round(frameW * 0.022)}px solid #15110e;background:#15110e;box-shadow:0 40px 90px rgba(0,0,0,.35)">
      <img src="data:image/png;base64,${png.toString('base64')}" style="display:block;width:100%;border-radius:${Math.round(radius * 0.8)}px">
    </div></body></html>`);
  const dir = path.join(OUT, 'screenshots', t.dir);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${shot.id}.png`) });
  await page.close();
}

// The name on the feature graphic.
const APP_NAME = 'Lisan';

async function graphics(browser) {
  const dir = path.join(OUT, 'graphics');
  fs.mkdirSync(dir, { recursive: true });
  // The app icon: four tiles, one per language, on cream (design/icons/, see its README).
  const logo = fs.readFileSync(path.join(__dirname, '..', 'design', 'icons', 'lisan-icon-512.svg'), 'utf8');
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

  // Google Play feature graphic: 1024×500, in the icon's own colours.
  page = await browser.newPage({ viewport: { width: 1024, height: 500 } });
  await page.setContent(`<body style="margin:0;width:1024px;height:500px;overflow:hidden;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
      background:#F6F1E7;display:flex;align-items:center;gap:40px;padding:0 64px;box-sizing:border-box">
    <div style="flex-shrink:0;width:300px;height:300px;margin-left:-40px">${sized(300)}</div>
    <div style="color:#2A2520">
      <div style="font-size:92px;font-weight:800;letter-spacing:-.02em;line-height:1">${APP_NAME}</div>
      <div style="font-size:30px;font-weight:600;margin-top:16px;white-space:nowrap">
        <span style="color:#C4432F">Turkish</span> · <span style="color:#2F6FB3">Ukrainian</span> · <span style="color:#A86A0B">Japanese</span> · <span style="color:#2E8B6E">Arabic</span></div>
      <div style="font-size:26px;margin-top:18px;color:#5F574D">Merhaba · Привіт · こんにちは · مرحبا</div>
    </div></body>`);
  await page.screenshot({ path: path.join(dir, 'play-feature-graphic-1024x500.png') });
  await page.close();
}

(async () => {
  const browser = await chromium.launch();
  // `node scripts/store-screenshots.cjs graphics`: only the icon and the feature graphic.
  for (const t of process.argv[2] === 'graphics' ? [] : TARGETS) {
    for (const shot of SHOTS) {
      const png = await capture(browser, t, shot, seedState(shot.lang));
      await compose(browser, t, shot, png);
      process.stdout.write('.');
    }
  }
  await graphics(browser);
  await browser.close();
  console.log(`\nWrote screenshots and graphics to ${OUT}`);
})().catch((e) => { console.error(e); process.exit(1); });
