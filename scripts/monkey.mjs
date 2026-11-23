// A "monkey" run for developers: `npm run monkey [codes] [-- --clicks 400 --seed 7]`.
// Opens the real app in Chromium for each language with some progress and a
// word of the learner's own, then presses buttons, links, options and tiles at
// random — a few hundred times — and fails on any script error or console
// error. It never presses what wipes data or opens a system dialog. Where the
// smoke test (scripts/smoke.cjs) walks every screen once, this one gets into
// the states in between: sessions left half-way, dialogs, back navigation.
// Needs Playwright with Chromium (not a dependency of the app).
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadLanguage } from '../js/languages/index.js';

const { chromium } = createRequire(import.meta.url)('playwright');
const args = process.argv.slice(2);
const flag = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? Number(args[i + 1]) || fallback : fallback; };
const CLICKS = flag('clicks', 400);
const picked = args.filter((a, i) => /^[a-z]{2}$/.test(a) && !/^--/.test(args[i - 1] || ''));
const codes = picked.length ? picked : ['tr', 'uk', 'ja', 'ar'];
const PORT = Number(process.env.MONKEY_PORT) || 8178;
const BASE = `http://localhost:${PORT}/`;

const server = spawn(process.execPath, [fileURLToPath(new URL('./serve.js', import.meta.url))], { env: { ...process.env, PORT: String(PORT) }, stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => { if (String(d).includes('running')) resolve(); });
  server.on('exit', (code) => reject(new Error(`server exited (${code}) — is port ${PORT} in use? Set MONKEY_PORT.`)));
  setTimeout(() => reject(new Error('server did not start')), 8000);
});
const browser = await chromium.launch();
let failed = 0;
let seed = flag('seed', 12345);
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
// Buttons the run never presses: they wipe data or open the system's file and share dialogs.
const SKIP = /all my data|reset progress|import progress|export|share|save as file|open a sync file/i;

for (const code of codes) {
  const L = await loadLanguage(code);
  const now = Date.now();
  const cards = Object.fromEntries(L.words.slice(0, 80).map((w, i) => [w.id, { ease: 2.5, interval: 5, reps: 1 + (i % 6), lapses: 0, due: now + ((i % 9) - 3) * 864e5, added: now - 864e6 }]));
  const context = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 360, height: 760 } });
  await context.addInitScript(([lang, seeded]) => {
    if (location.protocol === 'about:') return;
    if (!localStorage.getItem('lisan:v1')) {
      const own = { ja: '図書館員', ar: 'فراشة', uk: 'метелик', tr: 'uğur böceği' }[lang];
      localStorage.setItem('lisan:v1', JSON.stringify({
        settings: { onboarded: true, lang, newsSeen: '2026-11-l', autoplay: true, gameOn: true },
        progress: { [lang]: { cards: seeded, days: {} } },
        words: { [lang]: [{ id: 'mw-a1', tr: own, en: 'made up', read: '', note: '', at: 1, last: 1 }] },
      }));
    }
    window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
    const voices = ['tr-TR', 'uk-UA', 'ja-JP', 'ar-SA', 'ar-EG', 'en-US'].map((l) => ({ name: `Test ${l}`, lang: l, localService: true, voiceURI: l }));
    try {
      speechSynthesis.getVoices = () => voices;
      speechSynthesis.speak = (u) => setTimeout(() => u.onend && u.onend(), 5);
      speechSynthesis.cancel = () => {};
    } catch { /* no speech synthesis here */ }
  }, [code, cards]);
  const page = await context.newPage();
  const errors = new Map();
  const note = (msg) => {
    const where = decodeURIComponent(page.url().split('#')[1] || '/');
    const key = msg.slice(0, 160);
    if (!errors.has(key)) errors.set(key, where);
  };
  page.on('pageerror', (e) => note(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') note(`console: ${m.text()}`); });
  page.on('dialog', (d) => (rnd() < 0.5 ? d.accept() : d.dismiss()).catch(() => {}));
  await page.goto(`${BASE}#/`);
  await page.waitForSelector('.view');
  const starts = ['', 'learn', 'practice', 'phrases', 'me', 'review', 'read', 'settings', 'mywords', 'progress', 'speak', 'search/a', 'grammar', 'sync', 'journey'];
  let clicks = 0;
  for (let step = 0; step < CLICKS; step++) {
    if (step % 30 === 0) {
      await page.goto(`${BASE}#/${starts[Math.floor(rnd() * starts.length)]}`).catch(() => {});
      await page.waitForTimeout(150);
    }
    const handles = await page.$$('button:not([disabled]), a[href^="#/"], input[type=checkbox], select, .option, .tile');
    const visible = [];
    for (const handle of handles.slice(0, 120)) {
      if (await handle.isVisible().catch(() => false)) visible.push(handle);
    }
    if (!visible.length) { await page.goBack().catch(() => {}); continue; }
    const el = visible[Math.floor(rnd() * visible.length)];
    const label = await el.evaluate((e) => (e.innerText || e.getAttribute('aria-label') || '').slice(0, 30)).catch(() => '');
    if (SKIP.test(label)) continue;
    const tag = await el.evaluate((e) => e.tagName).catch(() => '');
    try {
      if (tag === 'SELECT') {
        const n = await el.evaluate((e) => e.options.length);
        await el.selectOption({ index: Math.floor(rnd() * n) }, { timeout: 800 });
      } else {
        await el.click({ timeout: 800 });
      }
      clicks++;
    } catch { /* covered or gone: try something else */ }
    if (rnd() < 0.06) await page.goBack().catch(() => {});
    if (rnd() < 0.05) {
      const input = await page.$('input[type=text]:visible, input[type=search]:visible, textarea:visible');
      if (input) await input.fill(['a', 'ev', 'merhaba', 'x = y', '   '][Math.floor(rnd() * 5)]).catch(() => {});
    }
    await page.waitForTimeout(40);
  }
  console.log(`${code}: ${clicks} clicks — ${errors.size ? `${errors.size} error${errors.size === 1 ? '' : 's'}` : 'ok'}`);
  for (const [key, where] of errors) console.log(`  /${where} → ${key}`);
  failed += errors.size;
  await context.close();
}
await browser.close();
server.kill();
console.log(failed ? `Monkey run found ${failed} error${failed === 1 ? '' : 's'}.` : 'Monkey run passed.');
process.exit(failed ? 1 : 0);
