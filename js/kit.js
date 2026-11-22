// Trip essentials: the things to be able to say first, gathered from all
// topics by what they mean (every pack glosses its entries in English), in the
// order a traveller meets them. A pack that has no entry for one simply
// leaves it out.
const WANTED = [
  /^hello\b(?!\?)|; hello\b/i, /^good morning/i, /^good evening/i, /^good night/i, /^goodbye|^bye\b/i, /^see you/i,
  /^yes\b/i, /^no\b/i, /^please\b/i, /^thank you\b|^thanks\b/i, /you.?re welcome/i, /^excuse me/i, /^sorry\b|^i.?m sorry/i,
  /don.?t understand/i, /speak english/i, /slower|more slowly|speak slowly/i, /how do you say/i,
  /what.?s your name/i, /my name is/i, /nice to meet|pleased to meet/i, /how are you/i, /where are you from/i,
  /where is the toilet/i, /where.?s the .*(station|metro)|where is the .*(station|metro)/i, /how (can|do) i get to/i,
  /how much (is|does)/i, /i.?d like|i would like/i, /do you have/i, /a table for/i, /the bill/i, /^water\b/i, /pay by card/i,
  /ticket/i, /what time/i, /wi-?fi/i, /allerg/i,
  /^help\b|i need help/i, /i.?m lost/i, /need a doctor/i, /call (an ambulance|the police)/i,
  /enjoy your meal|bon app/i,
];
const cache = new Map();

/** The pack's entries for the trip essentials, in order, each at most once. */
export function tripKit(lang) {
  if (cache.has(lang.code) && cache.get(lang.code).speaker === lang.speaker) return cache.get(lang.code).list;
  const used = new Set();
  const list = [];
  for (const re of WANTED) {
    const hits = lang.words.filter((w) => !used.has(w.id) && re.test(w.en) && [...w.tr].length <= 45);
    // A polite or neutral form before a casual one: these are for talking to strangers.
    const pick = hits.find((w) => !['casual', 'slang'].includes(w.reg)) || hits[0];
    if (pick) { used.add(pick.id); list.push(pick); }
  }
  cache.set(lang.code, { speaker: lang.speaker, list });
  return list;
}
