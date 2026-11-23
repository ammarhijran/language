// "Practise this sound": for a sound tip (Speak → Sounds), the course's words
// that contain the sound, to say one after another in the speaking drill.
// Which words have a sound is read off their spelling (kana for Japanese),
// with one pattern per tip; tips about rhythm, stress or pitch have none.

const TR_CONSONANT = 'bcçdfgğhjklmnprsştvyz';
// Japanese: an i or u between voiceless consonants is whispered (すき, した, ひと).
// (は is left out of the second set: as a particle — こんにちは — it is “wa”.)
const JA_WHISPER = /[きしちひぴくすつふぷ][かきくけこさしすせそたちつてとひふへほぱぴぷぺぽっ]|(です|ます)$/;
// Japanese long vowels as kana write them (a final う on a verb is its ending, not length: see below).
const JA_LONG = /ー|[おこそとのほもよろごぞどぼぽょ][うお]|[うくすつぬふむゆるぐずづぶぷゅ]う|[あかさたなはまやらわ]あ|[いきしちにひみり]い|[えけせてねへめれ]い|ねえ/;

const PATTERNS = {
  tr: {
    'dotless-i': /ı/,
    'o-umlaut': /ö/,
    'u-umlaut': /ü/,
    'soft-g': /ğ/,
    consonants: /[cçşj]/,
    r: /r/,
    double: new RegExp(`([${TR_CONSONANT}])\\1`),
  },
  uk: {
    'y-vs-i': /и/,
    h: /[гґ]/,
    soft: /ь|[бвгґджзклмнпрстфхцчшщ][яює]/,
    apostrophe: /[’'ʼ]/,
    'v-w': /в(?![аеєиіїоуюя’'ʼ])/,
    voiced: /[бдгґзж](?=$|[\s,.!?])/,
    'r-shch': /[рщ]/,
  },
  ja: {
    long: JA_LONG,
    double: /っ/,
    r: /[らりるれろ]/,
    'shi-chi-tsu-fu': /[しちつふ]/,
    devoicing: JA_WHISPER,
  },
  ar: {
    emphatics: /[صضطظ]/,
    throat: /[عح]/,
    'kh-gh': /[خغ]/,
    'q-k': /ق/,
    'th-dh': /[ثذ]/,
    length: /َا|ِي|ُو|آ/,
    shadda: /ّ/,
    'sun-moon': /(^|\s)ال/,
  },
};

const toHiragana = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** The spelling a word's sounds are read from. */
function spelling(lang, w) {
  if (lang.code === 'ja') return toHiragana(String(w.kana || '').replace(/\s+/g, ''));
  return String(w.tr).toLocaleLowerCase(lang.code).normalize('NFC');
}

/** Does this word contain the sound a tip is about? */
export function hasSound(lang, tipId, w) {
  const re = PATTERNS[lang.code]?.[tipId];
  if (!re) return false;
  const s = spelling(lang, w);
  if (!s) return false;
  if (lang.code === 'ja' && tipId === 'long' && /^to /.test(w.en)) {
    // 思う, 吸う: the final う is the verb ending, a beat of its own.
    return re.test(s.replace(/う$/, ''));
  }
  return re.test(s);
}

/** Tips that can be drilled in a language. */
export const drillableTips = (lang) => Object.keys(PATTERNS[lang.code] || {});

/**
 * Up to `n` words for a tip's drill: single words of the word topics, the ones already learned first, then in course order.
 * `learned` is a predicate on a word; `random` only orders the learned ones
 * when there are more than fit.
 */
export function soundWords(lang, tipId, { learned = () => false, n = 8, random = Math.random } = {}) {
  const topics = new Set(lang.categories.filter((c) => (c.group || 'words') === 'words').map((c) => c.id));
  // One word at a time: the sound is easier to hear and to say (Japanese entries are counted by their reading).
  const single = (w) => !/\s/.test(String(lang.code === 'ja' ? w.kana || '' : w.tr).trim());
  const all = lang.words.filter((w) => topics.has(w.cat) && single(w) && hasSound(lang, tipId, w));
  const known = all.filter(learned);
  const mixed = [...known];
  for (let i = mixed.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
  }
  const rest = all.filter((w) => !learned(w));
  return [...mixed, ...rest].slice(0, n);
}
