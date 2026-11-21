// Language registry. To add a language, create a pack like ./tr/index.js
// (same shape: categories, words, analyze, normalize, …) and register it here.
import tr from './tr/index.js';

export const languages = { tr };
export const defaultLanguage = 'tr';
