// Copies the static web app into www/ — the folder the native apps (Capacitor)
// and the GitHub Pages deploy are built from. No bundling: the app is plain
// ES modules. The only change to the files is that the language packs' data
// files are written compactly (see below).
import { cp, rm, mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = resolve(root, process.argv[2] || 'www');
const FILES = ['index.html', 'privacy.html', 'manifest.webmanifest', 'sw.js', 'css', 'js', 'icons'];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const f of FILES) await cp(join(root, f), join(out, f), { recursive: true });

// The language packs' data files (word lists, lessons, texts, readings) are
// kept readable in the repository: indented JSON after `export const … =`.
// In the build they are written compactly — the same values, about a third
// smaller, so they download and parse faster. Only files that are pure data
// are touched: no imports, and every export survives JSON unchanged.
let saved = 0;
for (const code of await readdir(join(out, 'js', 'languages'), { withFileTypes: true })) {
  if (!code.isDirectory()) continue;
  const dir = join(out, 'js', 'languages', code.name);
  for (const name of await readdir(dir)) {
    if (!name.endsWith('.js')) continue;
    const file = join(dir, name);
    const src = await readFile(file, 'utf8');
    if (/^\s*import\s/m.test(src) || /\bimport\(/.test(src)) continue;
    const mod = await import(`${pathToFileURL(file).href}?build=${Date.now()}`);
    const names = Object.keys(mod);
    if (!names.length || !names.every((k) => mod[k] !== null && typeof mod[k] === 'object' && isDeepStrictEqual(JSON.parse(JSON.stringify(mod[k])), mod[k]))) continue;
    // The file's opening comment (what it is, how it was made) stays.
    const head = src.match(/^(?:\/\/[^\n]*\n)+/)?.[0] || '';
    const compact = `${head}${names.map((k) => `export const ${k} = ${JSON.stringify(mod[k])};`).join('\n')}\n`;
    if (compact.length >= src.length) continue;
    await writeFile(file, compact);
    const again = await import(`${pathToFileURL(file).href}?check=${Date.now()}`);
    for (const k of names) if (!isDeepStrictEqual(again[k], mod[k])) throw new Error(`${file}: compacting changed export ${k}`);
    if (Object.keys(again).length !== names.length) throw new Error(`${file}: compacting changed the exports`);
    saved += src.length - compact.length;
  }
}

// Preload the app's own modules: without hints the browser discovers them one
// import level at a time (a 4-deep waterfall on a slow connection). Language
// packs are left out; index.html preloads the one being learned.
const graph = new Set();
async function walk(file) {
  if (graph.has(file) || file.startsWith('js/languages/') && !/^js\/languages\/(index|meta|common)\.js$/.test(file)) return;
  graph.add(file);
  const src = await readFile(join(out, file), 'utf8');
  for (const [, spec] of src.matchAll(/^\s*(?:import|export)\s[^'"]*?from\s+['"](\.[^'"]+)['"]/gm)) {
    await walk(join(file, '..', spec).split('\\').join('/'));
  }
  for (const [, spec] of src.matchAll(/^\s*import\s+['"](\.[^'"]+)['"]/gm)) await walk(join(file, '..', spec).split('\\').join('/'));
}
await walk('js/app.js');
const htmlPath = join(out, 'index.html');
const html = await readFile(htmlPath, 'utf8');
const MARK = '<!-- modulepreload:app (filled in by scripts/build-web.js) -->';
if (!html.includes(MARK)) throw new Error('index.html: modulepreload marker not found');
const links = [...graph].filter((f) => f !== 'js/app.js').sort().map((f) => `<link rel="modulepreload" href="${f}">`).join('\n  ');
await writeFile(htmlPath, html.replace(MARK, links));

// Stamp the service worker with this build's version: a hash of every file it
// caches. Each deploy that changes a file is then a new offline version, and
// the worker can check that it downloaded exactly these files.
const swPath = join(out, 'sw.js');
const sw = await readFile(swPath, 'utf8');
const list = sw.match(/const ASSETS = \[([\s\S]*?)\];/);
if (!list) throw new Error('sw.js: ASSETS list not found');
const hashes = {};
for (const [, url] of list[1].matchAll(/'([^']+)'/g)) {
  const file = url === './' ? 'index.html' : url;
  hashes[file] = createHash('sha256').update(await readFile(join(out, file))).digest('hex').slice(0, 16);
}
const version = createHash('sha256').update(sw).update(JSON.stringify(hashes)).digest('hex').slice(0, 12);
const stamped = sw
  .replace("const VERSION = 'dev';", `const VERSION = '${version}';`)
  .replace('const HASHES = null;', `const HASHES = ${JSON.stringify(hashes)};`);
if (!stamped.includes(`'${version}'`) || stamped.includes('const HASHES = null;')) throw new Error('sw.js: VERSION or HASHES line not found');
await writeFile(swPath, stamped);

console.log(`Web app copied to ${out} (offline version ${version}, ${graph.size - 1} modules preloaded, data files ${Math.round(saved / 1024)} kB smaller)`);
