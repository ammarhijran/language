// Language registry. Each language is a pack built with makePack() (see
// ./common.js) in js/languages/<code>/. Packs are big, so the app loads only
// the one being learned; what it needs to know about the others (name, flag,
// counts) is in ./meta.js. To add a language: create its folder, add it to
// tests/all-languages.js, and run `node scripts/lang-meta.mjs`.
import { meta } from './meta.js';

export { meta };
export const defaultLanguage = 'tr';

const packs = new Map();

/** Make a loaded pack available to loaded() (used by loadLanguage and all.js). */
export function register(pack) {
  packs.set(pack.code, pack);
  return pack;
}

/** The pack if it has been loaded, else undefined. */
export const loaded = (code) => packs.get(code);

/** Load a language pack (once). Unknown codes give the default language. */
export function loadLanguage(code) {
  const c = Object.hasOwn(meta, code) ? code : defaultLanguage;
  if (packs.has(c)) return Promise.resolve(packs.get(c));
  return import(`./${c}/index.js`).then((m) => register(m.default));
}
