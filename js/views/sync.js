// Sync between devices: no account, no server. A sync code (or a file holding
// one) is created on one device, carried to the other by the learner, and
// merged there. See js/sync.js for the format and merge rules.
import { h, icon, set } from '../ui.js';
import { encode, decode, isEncrypted, mergeAll, SyncError } from '../sync.js';
import { languages } from '../languages/index.js';
import { levelFromXp } from '../game.js';
import { hasPlugin, plugin } from '../native.js';

const kb = (s) => `${(s.length / 1024).toFixed(s.length < 10240 ? 1 : 0)} kB`;
const when = (t) => new Date(t).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
const fileName = () => `Lisan sync ${new Date().toISOString().slice(0, 10)}.txt`;

const canShare = () => hasPlugin('Share') || typeof navigator.share === 'function';

async function shareText(text) {
  if (hasPlugin('Share')) return plugin('Share').share({ title: 'Lisan sync code', text, dialogTitle: 'Send your Lisan sync code' });
  return navigator.share({ title: 'Lisan sync code', text });
}

async function saveFile(text) {
  const name = fileName();
  if (hasPlugin('Filesystem') && hasPlugin('Share')) {
    const { uri } = await plugin('Filesystem').writeFile({ path: name, data: text, directory: 'CACHE', encoding: 'utf8' });
    return plugin('Share').share({ title: name, files: [uri], dialogTitle: 'Save your Lisan sync file' });
  }
  const a = h('a', { href: URL.createObjectURL(new Blob([text], { type: 'text/plain' })), download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

async function copy(text, fallbackEl) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    fallbackEl.select();
    document.execCommand('copy');
  }
}

const sumXp = (game) => Object.values(game?.dev || {}).reduce((s, d) => s + (d.xp || 0), 0);
const cancelled = (e) => /cancel|abort/i.test(`${e?.name} ${e?.message}`);

function passField(id, label) {
  const input = h('input', { id, type: 'password', class: 'select', autocomplete: 'new-password', placeholder: 'Optional', spellcheck: 'false' });
  const toggle = h('button', {
    type: 'button', class: 'btn small ghost', 'aria-pressed': 'false',
    onclick: () => { const show = input.type === 'password'; input.type = show ? 'text' : 'password'; toggle.textContent = show ? 'Hide' : 'Show'; toggle.setAttribute('aria-pressed', String(show)); },
  }, 'Show');
  return { input, el: h('label', { class: 'field', for: id }, h('span', null, label), h('span', { class: 'pass-row' }, input, toggle)) };
}

export default function sync(ctx) {
  const { store } = ctx;

  // ---------- Send ----------
  const sendPass = passField('send-pass', 'Passphrase');
  const sendOut = h('div', { class: 'sync-out', hidden: true });
  const createBtn = h('button', { type: 'button', class: 'btn primary wide', onclick: create }, icon('repeat', 18), 'Create sync code');

  async function create() {
    createBtn.disabled = true;
    set(createBtn, 'Packing your progress…');
    try {
      const passphrase = sendPass.input.value;
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
    const local = store.syncData();
    const merged = mergeAll(local, payload);
    const sameDevice = payload.device === store.deviceId();
    const lvBefore = levelFromXp(sumXp(local.game)).level;
    const lvAfter = levelFromXp(sumXp(merged.game)).level;
    const rows = merged.summary.langs.filter((l) => languages[l.code] && l.remoteWords > 0);
    const nothing = rows.every((l) => !l.added && !l.updated) && sumXp(merged.game) === sumXp(local.game);
    set(preview,
      h('div', { class: 'card sync-summary' },
        h('p', { class: 'kicker' }, sameDevice ? 'Code from this device' : 'Code from another device', payload.at ? ` · created ${when(payload.at)}` : ''),
        rows.length
          ? h('ul', { class: 'sync-langs' }, rows.map((l) => h('li', null,
            h('span', null, languages[l.code].flag, ' ', languages[l.code].name),
            h('span', { class: 'muted small' }, `${l.remoteWords} words · `, h('b', null, `${l.added} new`), ` · ${l.updated} updated`))))
          : h('p', { class: 'hint' }, 'No words in this code yet.'),
        lvAfter > lvBefore ? h('p', null, `⭐ You’ll go from level ${lvBefore} to level ${lvAfter}.`) : null,
        nothing ? h('p', { class: 'hint' }, 'Nothing new — this device already has everything in this code.') : null,
        h('div', { class: 'button-row' },
          h('button', {
            type: 'button', class: 'btn primary', disabled: nothing,
            onclick: () => {
              store.applySync(merged);
              ctx.game.refresh(ctx.lang.code); // combined progress may unlock achievements
              store.syncLog({ kind: 'merged', from: payload.device });
              const added = rows.reduce((s, l) => s + l.added, 0);
              const updated = rows.reduce((s, l) => s + l.updated, 0);
              paste.value = '';
              set(preview, h('div', { class: 'banner sync-done' },
                h('b', null, '✅ Merged! '), `${added} new and ${updated} updated words. `,
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
    h('p', { class: 'hint' }, 'A passphrase encrypts the code so a chat app or cloud drive can’t read it. Use the same one on the other device.'),
    createBtn,
    sendOut);

  return h('div', { class: 'view sync' },
    h('a', { href: '#/settings', class: 'back-link' }, icon('back', 16), 'Settings'),
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
