// What the voice should read for an entry, when it differs from the text as
// written (never shown). Keyed by word id; a string is for the headword, or
// { tr, ex, pair } for the headword, its example sentence and its
// other-register form. See js/languages/common.js (pack.speech).
//
// Most Arabic needs nothing here: the pack already reads every entry in the
// pausal form its transliteration shows (أَفْهَمُ → أَفْهَمْ) and sends
// Egyptian entries to an Egyptian voice, or respells them (قَوِي → أَوِي) for
// a Standard Arabic one. Add an entry only for a word a voice still gets wrong.
export const say = {};
