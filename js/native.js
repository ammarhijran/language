// Access to native (Capacitor) plugins without a bundler.
//
// In the Android/iOS apps, Capacitor's native bridge injects `window.Capacitor`
// before any page script runs. It exposes `nativePromise(plugin, method, options)`,
// `addListener(plugin, event, callback)` and `PluginHeaders` (the list of
// installed native plugins). In a normal browser none of this exists and every
// helper here reports "web".

const cap = typeof window !== 'undefined' ? window.Capacitor : undefined;

export const isNative = () => !!cap?.isNativePlatform?.();

/** 'android' | 'ios' | 'web' */
export const nativePlatform = () => (isNative() ? cap.getPlatform() : 'web');

export const hasPlugin = (name) =>
  isNative() && !!cap.PluginHeaders?.some((h) => h.name === name);

/**
 * A proxy where plugin.method(options) calls the native method and returns a promise.
 * plugin.addListener(event, fn) subscribes to the plugin's events and resolves
 * to { remove() }: events can fire many times, so they use a callback instead.
 */
export function plugin(name) {
  return new Proxy({}, {
    get: (_, method) => {
      if (method === 'addListener') {
        return (eventName, fn) => {
          if (!hasPlugin(name) || !cap.addListener) return Promise.reject(new Error(`${name} plugin is not available`));
          return Promise.resolve(cap.addListener(name, eventName, fn));
        };
      }
      return (options = {}) => {
        if (!hasPlugin(name)) return Promise.reject(new Error(`${name} plugin is not available`));
        return cap.nativePromise(name, String(method), options);
      };
    },
  });
}

/**
 * Hand a text file to the learner: in the apps through the share sheet (save
 * to Files or Drive, send to oneself) — a WebView has no downloads — and on
 * the web as a download.
 */
export async function saveTextFile(name, text, { type = 'text/plain', dialogTitle = 'Save the file' } = {}) {
  if (hasPlugin('Filesystem') && hasPlugin('Share')) {
    const { uri } = await plugin('Filesystem').writeFile({ path: name, data: text, directory: 'CACHE', encoding: 'utf8' });
    return plugin('Share').share({ title: name, files: [uri], dialogTitle });
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  return undefined;
}

/**
 * Put text on the clipboard. Resolves to whether it worked: the Clipboard API
 * where there is one, else the old select-and-copy through a hidden field.
 */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch { /* no permission or no Clipboard API: try the old way */ }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return !!ok;
  } catch { return false; }
}

/** Whether text can be handed to the system's share sheet here. */
export const canShareText = () => hasPlugin('Share') || (typeof navigator !== 'undefined' && typeof navigator.share === 'function');

/**
 * Hand text to the share sheet (a chat, mail, notes…). Resolves to 'shared',
 * 'cancelled' (the learner closed the sheet) or 'failed'. It never throws.
 */
export async function shareText(text, { title = 'Four Tongues', dialogTitle = 'Share' } = {}) {
  try {
    if (hasPlugin('Share')) await plugin('Share').share({ title, text, dialogTitle });
    else if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') await navigator.share({ title, text });
    else return 'failed';
    return 'shared';
  } catch (e) {
    return /cancel|abort/i.test(String(e?.name || '') + String(e?.message || e)) ? 'cancelled' : 'failed';
  }
}

let webLock = null;
/**
 * Keep the screen on while something plays by itself (hands-free listening,
 * Play all, shadowing): the KeepAwake plugin in the apps, the Screen Wake
 * Lock API on the web. It never throws — at worst the screen dims as usual.
 */
export async function keepScreenOn(on) {
  try {
    if (hasPlugin('KeepAwake')) {
      await (on ? plugin('KeepAwake').keepAwake() : plugin('KeepAwake').allowSleep());
      return;
    }
    const nav = typeof navigator !== 'undefined' ? navigator : null;
    if (on && !webLock && nav?.wakeLock) webLock = await nav.wakeLock.request('screen');
    if (!on && webLock) { const lock = webLock; webLock = null; await lock.release(); }
  } catch { webLock = null; }
}

let barsStyle = 'DEFAULT'; // what the bars are set to: the device's own style until the app says otherwise
/**
 * Match the system bars (clock and battery icons, the gesture bar) to the app
 * when Settings → Display → Theme is Light or Dark while the phone is the
 * other way round — otherwise the icons would be dark on a dark page, or
 * light on a light one. 'system' hands them back to the device.
 *
 * Capacitor's own SystemBars plugin does it. On Android the page is only
 * drawn under the bars from WebView 140 on; in older WebViews the strip
 * behind the icons keeps the phone's own colour, so the icons are left alone.
 * It never throws. Resolves to the style that was set, or null.
 */
export async function systemBars(theme, userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '') {
  const style = theme === 'dark' ? 'DARK' : theme === 'light' ? 'LIGHT' : 'DEFAULT';
  try {
    if (!hasPlugin('SystemBars')) return null;
    if (nativePlatform() === 'android' && Number(/Chrome\/(\d+)/.exec(userAgent || '')?.[1] || 0) < 140) return null;
    if (style === barsStyle) return null;
    barsStyle = style;
    await plugin('SystemBars').setStyle({ style });
    return style;
  } catch { barsStyle = null; return null; } // unknown now: the next call sets it again
}

const App = plugin('App');

/**
 * What the Android back button or gesture should do:
 * close an open dialog first, leave the app only from a top-level screen,
 * otherwise go back a screen (or to the home screen if there's no history,
 * e.g. when the app was opened on an inner screen).
 * @returns {'close-dialog' | 'exit' | 'back' | 'home'}
 */
export function backAction({ dialogOpen, atRoot, canGoBack }) {
  if (dialogOpen) return 'close-dialog';
  if (atRoot) return 'exit';
  return canGoBack ? 'back' : 'home';
}

/**
 * Handle the Android back button / gesture with fn({ canGoBack }). Needs
 * @capacitor/app: once a listener is registered, the plugin stops going back
 * in the WebView by itself and leaves it to fn. Does nothing in a browser or
 * on iOS (no back button).
 */
export function onBackButton(fn) {
  if (!hasPlugin('App') || nativePlatform() !== 'android') return;
  // The bridge calls back with (null, error) if subscribing failed: ignore that.
  App.addListener('backButton', (data) => { if (data) fn(data); }).catch(() => {});
}

/**
 * Run fn when the app goes to the background (the App plugin's 'pause'
 * event), e.g. to save before the OS may stop it. Does nothing in a browser:
 * there, use visibilitychange and pagehide.
 */
export function onAppPause(fn) {
  if (!hasPlugin('App')) return;
  App.addListener('pause', () => fn()).catch(() => {});
}

/**
 * Leave the app from its home screen. Like Android 12+ does by itself, this
 * moves the app to the background instead of closing it, so it reopens
 * where the learner left it.
 */
export const leaveApp = () => App.minimizeApp().catch(() => App.exitApp()).catch(() => {});
