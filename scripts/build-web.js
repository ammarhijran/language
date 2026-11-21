// Copies the static web app into www/ — the folder the native apps (Capacitor)
// and the GitHub Pages deploy are built from. No bundling: the app is plain
// ES modules.
import { cp, rm, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, process.argv[2] || 'www');
const FILES = ['index.html', 'privacy.html', 'manifest.webmanifest', 'sw.js', 'css', 'js', 'icons'];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const f of FILES) await cp(join(root, f), join(out, f), { recursive: true });
console.log(`Web app copied to ${out}`);
