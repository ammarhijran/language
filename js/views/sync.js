// Sync between devices: no account, no server. A sync code (or a file holding
// one) is created on one device, carried to the other by the learner, and
// merged there. See js/sync.js for the format and merge rules.
import { h, icon, set } from '../ui.js';
import { encode, decode, isEncrypted, mergeAll, passphraseOk, MIN_PASSPHRASE, SyncError } from '../sync.js';
import { meta } from '../languages/index.js';
import { levelFromXp } from '../game.js';
import { hasPlugin, plugin, saveTextFile } from '../native.js';
import { backLink } from '../components.js';

const kb = (s) => `${(s.length / 1024).toFixed(s.length < 10240 ? 1 : 0)} kB`;
const when = (t) => new Date(t).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
const fileName = () => `Lisan sync ${new Date().toISOString().slice(0, 10)}.txt`;

const canShare = () => hasPlugin('Share') || typeof navigator.share === 'function';

async function shareText(text) {
  if (hasPlugin('Share')) return plugin('Share').share({ title: 'Lisan sync code', text, dialogTitle: 'Send your Lisan sync code' });
  return navigator.share({ title: 'Lisan sync code', text });
}

const saveFile = (text) => saveTextFile(fileName(), text, { dialogTitle: 'Save your Lisan sync file' });

async function copy(text, fallbackEl) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    fallbackEl.select();
    document.execCommand('copy');
  }
}

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** What merging changes in one language: its words, then its ★ saved entries (only the parts that apply). */
export function langChanges(l) {
  const parts = [];
  const words = l.remoteWords > 0 || l.added || l.updated || l.removed;
  if (words) {
    parts.push(`${plural(l.remoteWords, 'word')} · `, h('b', null, `${l.added} new`), ` · ${l.updated} updated`);
    if (l.removed) parts.push(` · ${l.removed} removed`);
    if (l.skipped) parts.push(` · ${l.skipped} from before your reset left out`);
  }
  if (l.savedAdded || l.savedRemoved) {
    if (parts.length) parts.push(' · ');
    if (l.savedAdded) parts.push(h('b', null, `★ ${l.savedAdded} saved`));
    if (l.savedAdded && l.savedRemoved) parts.push(', ');
    if (l.savedRemoved) parts.push(`${l.savedRemoved} unsaved`);
  }
  return parts;
}

/** The sentence after a merge: words first, then saved entries; never "0 new, 0 updated" for a code that only changes ★. */
export function mergedText(rows) {
  const sum = (k) => rows.reduce((s, l) => s + (l[k] || 0), 0);
  const [added, updated, removed, savedAdded, savedRemoved] = ['added', 'updated', 'removed', 'savedAdded', 'savedRemoved'].map(sum);
  const out = [];
  if (added || updated || removed) out.push(`${added} new and ${updated} updated words${removed ? `, ${removed} removed` : ''}`);
  if (savedAdded) out.push(`${plural(savedAdded, 'entry', 'entries')} added to your saved phrases`);
  if (savedRemoved) out.push(`${plural(savedRemoved, 'entry', 'entries')} removed from them`);
  if (!out.length) return 'Progress combined. ';
  const text = out.length > 1 ? `${out.slice(0, -1).join(', ')} and ${out[out.length - 1]}` : out[0];
  return `${text[0].toUpperCase()}${text.slice(1)}. `;
}

const sumXp = (game) => Object.values(game?.dev || {}).reduce((s, d) => s + (d.xp || 0), 0);
const cancelled = (e) => /cancel|abort/i.test(`${e?.name} ${e?.message}`);

function passField(id, label, placeholder = 'Optional') {
  const input = h('input', { id, type: 'password', class: 'select', autocomplete: 'new-password', placeholder, spellcheck: 'false' });
  const toggle = h('button', {
    type: 'button', class: 'btn small ghost', 'aria-pressed': 'false',
    onclick: () => { const show = input.type === 'password'; input.type = show ? 'text' : 'password'; toggle.textContent = show ? 'Hide' : 'Show'; toggle.setAttribute('aria-pressed', String(show)); },
  }, 'Show');
  return { input, el: h('label', { class: 'field', for: id }, h('span', null, label), h('span', { class: 'pass-row' }, input, toggle)) };
}

export default function sync(ctx) {
  const { store } = ctx;

  // ---------- Send ----------
  const sendPass = passField('send-pass', 'Passphrase', `Optional — at least ${MIN_PASSPHRASE} characters`);
  const passHint = h('p', { class: 'hint', id: 'send-pass-hint', 'aria-live': 'polite' });
  sendPass.input.setAttribute('aria-describedby', 'send-pass-hint');
  const sendOut = h('div', { class: 'sync-out', hidden: true });
  const createBtn = h('button', { type: 'button', class: 'btn primary wide', onclick: create }, icon('repeat', 18), 'Create sync code');

  // A short passphrase is easy to guess offline, so it can't make a code "encrypted".
  const HINT = `A passphrase encrypts the code so a chat app or cloud drive can’t read it. Use at least ${MIN_PASSPHRASE} characters — a few unrelated words work well — and the same one on the other device.`;
  function showPassHint(error = false) {
    const p = sendPass.input.value;
    const left = MIN_PASSPHRASE - [...p.trim()].length;
    passHint.classList.toggle('sync-error', error);
    set(passHint, p && left > 0
      ? `${error ? 'Too short to encrypt with. ' : ''}${left} more character${left === 1 ? '' : 's'} needed for a passphrase (or leave it empty for an unencrypted code).`
      : HINT);
  }
  sendPass.input.addEventListener('input', () => showPassHint());
  showPassHint();

  async function create() {
    const passphrase = sendPass.input.value;
    const weak = !!passphrase && !passphraseOk(passphrase);
    showPassHint(weak);
    if (weak) {
      sendPass.input.focus();
      return;
    }
    createBtn.disabled = true;
    set(createBtn, 'Packing your progress…');
    try {
      const code = await encode({ device: store.deviceId(), at: Date.now(), ...store.syncData() }, { passphrase });
      const box = h('textarea', { class: 'code-box', readonly: true, rows: 4, 'aria-label': 'Your sync code', onfocus: (e) => e.target.select() }, code);
      const status = h('p', { class: 'hint', 'aria-live': 'polite' },
        `${kb(code)} · `, passphrase ? h('b', null, '🔒 encrypted') : 'not encrypted — anyone who sees it can read your progress');
      set(sendOut,
        box, status,
        h('div', { class: 'button-row' },
          h('button', { type: 'button', class: 'btn primary', onclick: async () => { await copy(code, box); ctx.toast('Sync code copied'); } }, 'Copy'),
          canShare() ? h('button', {
            type: 'button', class: 'btn',
            onclick: () => shareText(code).catch((e) => { if (!cancelled(e)) ctx.toast('Couldn’t open the share sheet — use Copy instead.'); }),
          }, 'Share…') : null,
          h('button', {
            type: 'button', class: 'btn',
            onclick: () => saveFile(code).catch((e) => { if (!cancelled(e)) ctx.toast('Couldn’t save the file — use Copy instead.'); }),
          }, 'Save as file')),
        h('p', { class: 'hint' }, 'Next: on your other device open ', h('b', null, 'Settings → Sync between devices'), ', paste this code (or open the file) and merge.'));
      sendOut.hidden = false;
      store.syncLog({ kind: 'sent', encrypted: !!passphrase });
      refreshLog();
    } catch (e) {
      ctx.toast(e?.message || 'Couldn’t create a sync code.');
    } finally {
      createBtn.disabled = false;
      set(createBtn, icon('repeat', 18), 'Create a new code');
    }
  }

  // ---------- Receive ----------
  const recvPass = passField('recv-pass', 'Passphrase for this code');
  recvPass.el.hidden = true;
  const paste = h('textarea', {
    class: 'code-box', rows: 4, placeholder: 'Paste a sync code here (LISAN1.…)', 'aria-label': 'Sync code from your other device', spellcheck: 'false',
    oninput: () => { recvPass.el.hidden = !isEncrypted(paste.value); set(preview); },
  });
  const fileInput = h('input', {
    type: 'file', hidden: true,
    onchange: async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      paste.value = await f.text();
      paste.dispatchEvent(new Event('input'));
      e.target.value = '';
    },
  });
  const preview = h('div', { class: 'sync-preview', 'aria-live': 'polite' });

  async function check() {
    set(preview, h('p', { class: 'hint' }, 'Reading the code…'));
    let payload;
    try {
      payload = await decode(paste.value, { passphrase: recvPass.input.value });
    } catch (e) {
      if (e instanceof SyncError && e.code === 'needs-passphrase') { recvPass.el.hidden = false; recvPass.input.focus(); }
      set(preview, h('p', { class: 'sync-error' }, e.message || 'Couldn’t read that code.'));
      return;
    }
    let local;
    let merged;
    try {
      local = store.syncData();
      merged = mergeAll(local, payload, { device: store.deviceId() });
    } catch {
      set(preview, h('p', { class: 'sync-error' }, 'Couldn’t read that code.'));
      return;
    }
    const sameDevice = payload.device === store.deviceId();
    const lvBefore = levelFromXp(sumXp(local.game)).level;
    const lvAfter = levelFromXp(sumXp(merged.game)).level;
    const rows = merged.summary.langs.filter((l) => meta[l.code] && (l.remoteWords > 0 || l.added || l.updated || l.removed || l.savedAdded || l.savedRemoved));
    const nothing = !merged.summary.changed;
    // Words from before "Reset progress" on this device are left out on purpose: say so.
    const skipped = rows.some((l) => l.skipped);
    set(preview,
      h('div', { class: 'card sync-summary' },
        h('p', { class: 'kicker' }, sameDevice ? 'Code from this device' : 'Code from another device', payload.at ? ` · created ${when(payload.at)}` : ''),
        rows.length
          ? h('ul', { class: 'sync-langs' }, rows.map((l) => h('li', null,
            h('span', null, meta[l.code].flag, ' ', meta[l.code].name),
            h('span', { class: 'muted small' }, langChanges(l)))))
          : h('p', { class: 'hint' }, 'No words in this code yet.'),
        lvAfter > lvBefore ? h('p', null, `⭐ You’ll go from level ${lvBefore} to level ${lvAfter}.`) : null,
        nothing ? h('p', { class: 'hint' }, skipped
          ? 'Nothing new — the rest of this code is from before you reset progress on this device.'
          : 'Nothing new — this device already has everything in this code.') : null,
        h('div', { class: 'button-row' },
          h('button', {
            type: 'button', class: 'btn primary', disabled: nothing,
            onclick: () => {
              store.applySync(merged);
              ctx.applyDisplaySettings?.();
              try {
                ctx.game.refresh(ctx.lang.code); // combined progress may unlock achievements
              } catch (e) {
                console.error(e); // the merge itself is saved; rewards are re-checked on the next answer
              }
              // Other languages' topic counts need their packs: load them and check again.
              ctx.summariseLanguages?.({ fresh: true });
              store.syncLog({ kind: 'merged', from: payload.device });
              paste.value = '';
              set(preview, h('div', { class: 'banner sync-done' },
                h('b', null, '✅ Merged! '), mergedText(rows),
                h('p', { class: 'hint' }, 'To finish a two-way sync, send this device’s progress back:'),
                h('button', { type: 'button', class: 'btn small primary', onclick: () => { sendPass.input.value = recvPass.input.value; create(); sendCard.scrollIntoView({ behavior: 'smooth' }); } }, 'Create a code for the other device')));
              refreshLog();
            },
          }, 'Merge into this device'),
          h('button', { type: 'button', class: 'btn ghost', onclick: () => set(preview) }, 'Cancel'))));
  }

  // ---------- Log ----------
  const logEl = h('p', { class: 'hint center' });
  function refreshLog() {
    const last = store.syncLog()[0];
    set(logEl, last ? `Last sync on this device: ${last.kind === 'sent' ? 'code created' : 'merged a code'} · ${when(last.at)}` : 'This device hasn’t synced yet.');
  }
  refreshLog();

  const sendCard = h('section', { class: 'card form' },
    h('h2', { class: 'card-title' }, '⬆️ Send this device’s progress'),
    h('p', { class: 'hint' }, 'Creates a code containing your words, review schedule, streaks, XP and achievements (not your settings).'),
    sendPass.el,
    passHint,
    createBtn,
    sendOut);

  return h('div', { class: 'view sync' },
    backLink(ctx, '#/me', 'Me'),
    h('h1', null, 'Sync between devices'),
    h('section', { class: 'card how' },
      h('ol', { class: 'steps' },
        h('li', null, h('b', null, 'Create a code'), ' on the device with the progress you want to copy.'),
        h('li', null, h('b', null, 'Move it yourself'), ' — copy & paste, AirDrop, Nearby Share, a note or message to yourself, or save the file to your own iCloud Drive / Google Drive.'),
        h('li', null, h('b', null, 'Paste it and merge'), ' on the other device. Progress from both is combined — nothing is overwritten.')),
      h('p', { class: 'privacy-note' }, '🔒 No account and no server: Lisan never uploads your progress. The code only exists where you put it.')),
    sendCard,
    h('section', { class: 'card form' },
      h('h2', { class: 'card-title' }, '⬇️ Receive progress from another device'),
      paste,
      h('div', { class: 'button-row' },
        h('button', { type: 'button', class: 'btn', onclick: () => fileInput.click() }, 'Open a sync file'),
        h('button', { type: 'button', class: 'btn primary', onclick: check }, 'Check code')),
      fileInput,
      recvPass.el,
      preview),
    logEl,
  );
}
