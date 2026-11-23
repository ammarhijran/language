// Browser smoke test: opens the real app in Chromium for every language and
// walks its screens — every topic, a word page per topic, the phrasebook,
// Read & Listen (a long text, its practice modes, filling the gaps, adding your own text),
// hands-free listening, dictation and a lesson — and fails on any script
// error, error screen or sideways scroll at phone width.
//
//   npm run smoke              # all four languages (about two minutes)
//   npm run smoke -- tr ja     # only these
//
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
// Speech is stubbed: a fake voice per language that "speaks" instantly.
const { spawn } = require('node:child_process');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.env.SMOKE_PORT) || 8177;
const BASE = `http://localhost:${PORT}/`;
const WIDTH = 360;
const SAMPLE = {
  tr: 'Merhaba! Benim adım Alex. Türkçe öğreniyorum.',
  uk: 'Добрий день! Мене звати Алекс. Я вчу українську.',
  ja: '皆さん、こんにちは。アレックスです。日本語を勉強しています。',
  ar: 'مرحبا! اسمي أليكس. أتعلم العربية.',
};

function stubs(lang) {
  if (location.protocol === 'about:') return;
  if (!localStorage.getItem('lisan:v1')) {
    localStorage.setItem('lisan:v1', JSON.stringify({ settings: { onboarded: true, autoplay: false, lang, gameOn: false }, progress: {}, game: {} }));
  }
  window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
  const voices = ['tr-TR', 'uk-UA', 'ja-JP', 'ar-SA', 'ar-EG', 'en-US'].map((l) => ({ name: `Test ${l}`, lang: l, localService: true, voiceURI: l }));
  speechSynthesis.getVoices = () => voices;
  speechSynthesis.speak = (u) => setTimeout(() => u.onend && u.onend(), 5);
  speechSynthesis.cancel = () => {};
}

async function serve() {
  const child = spawn(process.execPath, [path.join(ROOT, 'scripts', 'serve.js')], { env: { ...process.env, PORT: String(PORT) }, stdio: ['ignore', 'pipe', 'inherit'] });
  await new Promise((resolve, reject) => {
    child.stdout.on('data', (d) => { if (String(d).includes('running')) resolve(); });
    child.on('exit', (code) => reject(new Error(`server exited (${code}) — is port ${PORT} in use? Set SMOKE_PORT.`)));
    setTimeout(() => reject(new Error('server did not start')), 8000);
  });
  return child;
}

async function walk(browser, lang, pack, texts) {
  const problems = [];
  const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 780 }, serviceWorkers: 'block' });
  await ctx.addInitScript(stubs, lang);
  const page = await ctx.newPage();
  const where = () => decodeURIComponent(page.url().split('#')[1] || '/');
  page.on('pageerror', (e) => problems.push(`${lang} ${where()}: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`${lang} ${where()}: ${m.text()}`); });
  page.on('dialog', (d) => d.accept());

  let pages = 0;
  const open = async (route, { wait = 160, selector = null } = {}) => {
    await page.goto(`${BASE}#/${route}`);
    if (selector) await page.waitForSelector(selector, { timeout: 8000 }).catch(() => problems.push(`${lang} /${route}: “${selector}” never appeared`));
    else await page.waitForTimeout(wait);
    pages++;
    const text = await page.$eval('#view', (v) => v.innerText.slice(0, 80)).catch(() => 'NO VIEW');
    if (/went wrong|NO VIEW|not found/i.test(text)) problems.push(`${lang} /${route}: ${text.replace(/\n+/g, ' ')}`);
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) problems.push(`${lang} /${route}: scrolls sideways at ${WIDTH}px`);
  };
  const enc = encodeURIComponent;

  // The main screens.
  for (const r of ['', 'learn', 'learn/g/phrases', 'learn/g/talk', 'learn/g/grammar', 'learn/g/read', 'review', 'practice', 'phrases', 'phrases/kit', 'me',
    'progress', 'journey', 'settings', 'sync', 'search', 'known', 'speak', 'speak/drill', 'speak/ear', 'speak/alphabet', 'speak/sounds', 'grammar', 'read']) await open(r, { wait: 220 });

  // Speak → Sounds: "Practise this sound" opens the speaking drill with its words.
  await open('speak/sounds', { selector: '.tip-drill' });
  await page.click('.tip-drill');
  await page.waitForSelector('.drill-card', { timeout: 8000 }).catch(() => problems.push(`${lang}: the sound drill did not open`));

  // Every topic: its page, the first and last entry, and the phrasebook page of phrase topics.
  for (const c of pack.categories) {
    const words = pack.wordsIn(c.id);
    await open(`topic/${enc(c.id)}`);
    if (!(await page.evaluate((en) => document.body.innerText.includes(en), words[0].en))) problems.push(`${lang} topic ${c.id}: its first entry is not shown`);
    for (const w of [words[0], words[words.length - 1]]) await open(`word/${enc(w.id)}`, { wait: 110 });
    if ((c.group || 'words') !== 'words') await open(`phrases/${enc(c.id)}`);
  }

  // Grammar lessons.
  for (const l of pack.grammar || []) await open(`grammar/${enc(l.id)}`, { wait: 140 });

  // Read & Listen: every text opens; a long speech in every practice mode; a dialogue's role-play.
  for (const t of texts) await open(`read/${enc(t.id)}`, { wait: 140 });
  const speech = texts.filter((t) => t.kind === 'speech').sort((a, b) => b.lines.length - a.lines.length)[0];
  if (speech) for (const m of ['repeat', 'shadow', 'record']) await open(`read/${enc(speech.id)}/practice/${m}`, { wait: 300 });
  for (const t of texts.filter((x) => x.kind === 'twister' || x.kind === 'saying')) await open(`read/${enc(t.id)}/practice/repeat`, { wait: 300 });
  // Fill the gaps: the first text, answered to the end.
  await open(`read/${enc(texts[0].id)}/gaps`, { selector: '.read-gaps .option' });
  for (let k = 0; k < 12 && await page.$('.read-gaps .option'); k++) {
    await page.locator('.read-gaps .option').first().click();
    await page.locator('.read-gaps > .btn.primary').click();
  }
  if (!(await page.$('.read-summary-box'))) problems.push(`${lang}: the gap exercise did not finish`);
  const dialogue = texts.find((t) => t.kind === 'dialogue');
  if (dialogue) await open(`read/${enc(dialogue.id)}/roleplay/0`, { wait: 300 });

  // My texts: add, open, edit, delete.
  await open('read/new', { selector: '#own-body' });
  await page.fill('#own-body', SAMPLE[lang]);
  await page.click('.btn.primary:has-text("Save")');
  await page.waitForSelector('.read-tr', { timeout: 8000 }).catch(() => problems.push(`${lang}: saving my own text did not open it`));
  const own = where();
  if (await page.$$eval('.read-tr', (e) => e.length) !== 3) problems.push(`${lang}: my text should have 3 lines`);
  await open(`${own.slice(1)}/practice/repeat`, { wait: 300 });
  await open(`${own.slice(1)}/edit`, { selector: '#own-body' });
  await page.click('.btn.danger');
  await page.waitForTimeout(300);
  if (await page.$$eval('.read-own .read-card', (e) => e.length)) problems.push(`${lang}: my text was not deleted`);

  // Practice modes start; a lesson starts; the trip-essentials course starts.
  for (const m of ['mixed', 'listen', 'meaning', 'type', 'flashcard', 'build', 'dictation', 'script']) await open(`practice/${m}/all`, { wait: 350 });
  await open('practice/handsfree/all', { selector: '.hf-card' });
  await page.click('.hf-play');
  await page.waitForTimeout(400);
  await page.click('.hf-play');
  await open(`learn/${enc(pack.categories[0].id)}`, { selector: '.intro' });
  await open('learn/kit', { selector: '.intro' });
  await open('numbers', { selector: '.choice' });
  await open('placement', { selector: 'a[href="#/placement/go"]' });
  await open('placement/go', { selector: '.exercise' });
  await open('numbers/100', { selector: '#number-answer' });

  await ctx.close();
  return { pages, problems };
}

(async () => {
  let chromium;
  try { ({ chromium } = require('playwright')); } catch { console.error('Playwright is not installed: npm i -D playwright && npx playwright install chromium'); process.exit(2); }
  const { languages } = await import(path.join(ROOT, 'tests', 'all-languages.js'));
  const { loadTexts } = await import(path.join(ROOT, 'js', 'reader.js'));
  const wanted = process.argv.slice(2).filter((a) => languages[a]);
  const codes = wanted.length ? wanted : Object.keys(languages);
  const server = await serve();
  const browser = await chromium.launch();
  const all = [];
  try {
    for (const code of codes) {
      const started = Date.now();
      const { pages, problems } = await walk(browser, code, languages[code], await loadTexts(code));
      console.log(`${code}: ${pages} screens in ${Math.round((Date.now() - started) / 1000)} s — ${problems.length ? `${problems.length} problem(s)` : 'ok'}`);
      all.push(...problems);
    }
  } finally {
    await browser.close();
    server.kill();
  }
  if (all.length) {
    console.error(`\n${all.length} problem(s):\n${[...new Set(all)].slice(0, 60).join('\n')}`);
    process.exit(1);
  }
  console.log('Smoke test passed.');
})().catch((e) => { console.error(e); process.exit(1); });
