// Every language pack, loaded eagerly and registered. The app itself loads
// only the pack being learned (js/languages/index.js); this module is for
// tests and dev scripts, so it is not shipped.
import { register } from '../js/languages/index.js';
import tr from '../js/languages/tr/index.js';
import uk from '../js/languages/uk/index.js';
import ja from '../js/languages/ja/index.js';
import ar from '../js/languages/ar/index.js';

export const languages = { tr, uk, ja, ar };
Object.values(languages).forEach(register);
