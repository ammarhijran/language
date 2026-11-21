// Language registry. Each language is a pack built with makePack() (see
// ./common.js); to add one, create js/languages/<code>/ and register it here.
import tr from './tr/index.js';
import uk from './uk/index.js';
import ja from './ja/index.js';
import ar from './ar/index.js';

export const languages = { tr, uk, ja, ar };
export const defaultLanguage = 'tr';
