// Letter quiz: see a letter and pick how it is read, or see the reading and
// pick the letter. For the scripts that are new to the learner — kana, the
// Arabic and the Ukrainian alphabet. A pack takes part by naming its letters
// (pack.letterName); Turkish, written in Latin letters, has Tricky letters instead.

const mix = (list, random) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * What can be quizzed: [{ id, name, items: [{ letter, glyph, label }] }].
 * `glyph` is what is shown in the script, `label` how it is read (rōmaji, a
 * letter's name, a transliteration). One set per pack.letterSets entry
 * ({ id, name, glyph(letter) } — hiragana and katakana), else one set of
 * all letters. A set may bring letters of its own (`letters`: the voiced kana,
 * which the chart does not list). Letters the pack gives no name (っ, ー) are left out.
 */
export function letterSets(lang) {
  if (typeof lang?.letterName !== 'function' || !Array.isArray(lang.alphabet)) return [];
  const defs = lang.letterSets || [{ id: 'letters', name: 'Letters', glyph: (l) => l.upper }];
  return defs.map((d) => ({
    id: d.id,
    name: d.name,
    // A set that pairs two scripts (katakana with hiragana) says so: its "readings" are in the script too.
    native: !!d.label,
    asks: d.asks || null,
    items: (d.letters || lang.alphabet)
      .map((letter) => ({ letter, glyph: d.glyph(letter), label: d.label ? d.label(letter) : lang.letterName(letter) }))
      // (a set's own label still needs the letter to have a name: っ and ー stay out)
      .filter((x) => x.glyph && x.label && x.glyph !== x.label && lang.letterName(x.letter)),
  })).filter((set) => set.items.length >= 8);
}

// Readings that share their first or last letter (ka / ki, ka / sa; bāʾ / tāʾ) are the ones mixed up.
const close = (a, b) => a.label[0] === b.label[0] || a.label.at(-1) === b.label.at(-1);

/**
 * A round: `count` different letters of a set, each as
 * { item, dir, options } — dir 'read' (the letter is shown, pick its
 * reading) or 'find' (the reading is shown, pick the letter); four options
 * in random order, one of them `item`. No two options share a reading or a
 * glyph, and up to two of the wrong ones are close to the right one.
 * Letters whose glyph is in `first` are asked for certain.
 */
export function letterQuestions(set, count = 10, random = Math.random, first = []) {
  // `first`: glyphs missed last time — they are in this round (in random places), the rest is drawn.
  const again = mix(set.items.filter((x) => first.includes(x.glyph)), random).slice(0, count);
  const rest = mix(set.items.filter((x) => !again.includes(x)), random).slice(0, count - again.length);
  return mix([...again, ...rest], random).map((item) => {
    const others = mix(set.items.filter((x) => x !== item), random);
    const picked = [];
    const fits = (x) => ![item, ...picked].some((p) => p.label === x.label || p.glyph === x.glyph);
    for (const x of others.filter((o) => close(o, item))) {
      if (picked.length >= 2) break;
      if (fits(x)) picked.push(x);
    }
    for (const x of others) {
      if (picked.length >= 3) break;
      if (fits(x)) picked.push(x);
    }
    return { item, dir: random() < 0.5 ? 'read' : 'find', options: mix([item, ...picked], random) };
  });
}
