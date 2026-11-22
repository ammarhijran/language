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
