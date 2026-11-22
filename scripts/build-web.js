// Copies the static web app into www/ — the folder the native apps (Capacitor)
// and the GitHub Pages deploy are built from. No bundling: the app is plain
// ES modules.
import { cp, rm, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = resolve(root, process.argv[2] || 'www');
const FILES = ['index.html', 'privacy.html', 'manifest.webmanifest', 'sw.js', 'css', 'js', 'icons'];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const f of FILES) await cp(join(root, f), join(out, f), { recursive: true });

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

console.log(`Web app copied to ${out} (offline version ${version})`);
