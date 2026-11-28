// Renders every app icon from the sources in design/icons/ (see its README):
//   node scripts/icons.cjs
// - the web app's icons (icons/), including a maskable one
// - Android launcher icons (adaptive foreground and themed monochrome at 108 dp, legacy and round at 48 dp)
// - the sources Capacitor's asset tool reads (assets/icon-*.png) and the iOS app icon
// - the start screen's mark (icons/splash-mark.svg) and Android's launch splash for
//   versions before 12 (every res/drawable*/splash.png, at its own size): the tea glass
//   at 288 dp on terracotta, where Android 12's system splash and index.html put it
// The store graphics (Play icon, feature graphic) are made by scripts/store-screenshots.cjs.
// Needs Playwright (the SVGs are plain paths, so no fonts are involved).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'design', 'icons');
const BACKGROUND = '#7A2F1F';
const read = (name) => fs.readFileSync(path.join(SRC, name), 'utf8');
// An SVG at a given pixel size (its own width/height attributes are replaced).
const sized = (svg, px) => svg.replace(/<svg ([^>]*?)width="\d+" height="\d+"/, `<svg $1width="${px}" height="${px}"`);

(async () => {
  const full = read('app-icon-512.svg'); // the whole square, on its background colour
  const foreground = read('app-adaptive-foreground.svg'); // transparent, content inside the safe zone
  const monochrome = read('app-monochrome.svg');
  const browser = await chromium.launch();

  /** Write `svg` as a `px`-square PNG. `background`: a colour, or null for transparent. `round`: clipped to a circle. */
  async function render(file, svg, px, { background = null, round = false } = {}) {
    const page = await browser.newPage({ viewport: { width: px, height: px } });
    await page.setContent(`<body style="margin:0;background:transparent"><div style="width:${px}px;height:${px}px;overflow:hidden;`
      + `${background ? `background:${background};` : ''}${round ? 'border-radius:50%;' : ''}">${sized(svg, px)}</div></body>`);
    fs.mkdirSync(path.dirname(path.join(ROOT, file)), { recursive: true });
    await page.screenshot({ path: path.join(ROOT, file), omitBackground: !background || round });
    await page.close();
  }

  // Web app
  fs.writeFileSync(path.join(ROOT, 'icons', 'icon.svg'), full);
  await render('icons/icon-192.png', full, 192, { background: BACKGROUND });
  await render('icons/icon-512.png', full, 512, { background: BACKGROUND });
  // Maskable: the launcher may crop to a circle, so the drawing sits inside the safe zone.
  await render('icons/icon-maskable-512.png', foreground, 512, { background: BACKGROUND });

  // Android
  const res = 'android/app/src/main/res';
  for (const [density, scale] of [['ldpi', 0.75], ['mdpi', 1], ['hdpi', 1.5], ['xhdpi', 2], ['xxhdpi', 3], ['xxxhdpi', 4]]) {
    const dir = `${res}/mipmap-${density}`;
    await render(`${dir}/ic_launcher_foreground.png`, foreground, Math.round(108 * scale));
    await render(`${dir}/ic_launcher_monochrome.png`, monochrome, Math.round(108 * scale));
    // Before Android 8 (and where a launcher asks for it): a plain square and a round icon.
    await render(`${dir}/ic_launcher.png`, full, Math.round(48 * scale), { background: BACKGROUND });
    await render(`${dir}/ic_launcher_round.png`, foreground.replace('scale(0.76)', 'scale(0.9)'), Math.round(48 * scale), { background: BACKGROUND, round: true });
  }

  // The start screen (index.html) and the launch splash before Android 12.
  fs.writeFileSync(path.join(ROOT, 'icons', 'splash-mark.svg'), foreground);
  const DENSITY = { ldpi: 0.75, mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
  for (const dir of fs.readdirSync(path.join(ROOT, res)).filter((d) => d.startsWith('drawable'))) {
    const file = path.join(ROOT, res, dir, 'splash.png');
    if (!fs.existsSync(file)) continue;
    const png = fs.readFileSync(file);
    const [w, h] = [png.readUInt32BE(16), png.readUInt32BE(20)];
    const scale = DENSITY[(dir.match(/(l|m|h|xh|xxh|xxxh)dpi/) || [])[0]?.replace('dpi', '') + 'dpi'] || 1;
    const mark = Math.round(288 * scale);
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.setContent(`<body style="margin:0;width:${w}px;height:${h}px;background:${BACKGROUND};display:grid;place-items:center">${sized(foreground, mark)}</body>`);
    await page.screenshot({ path: file });
    await page.close();
  }

  // Sources for Capacitor's asset tool, and the iOS icon (no transparency)
  await render('assets/icon-only.png', full, 1024, { background: BACKGROUND });
  await render('assets/icon-foreground.png', foreground, 1024);
  await render('assets/icon-background.png', '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>', 1024, { background: BACKGROUND });
  await render('ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png', full, 1024, { background: BACKGROUND });

  await browser.close();
  console.log('Icons written.');
})().catch((e) => { console.error(e); process.exit(1); });
