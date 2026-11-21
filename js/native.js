// Access to native (Capacitor) plugins without a bundler.
//
// In the Android/iOS apps, Capacitor's native bridge injects `window.Capacitor`
// before any page script runs. It exposes `nativePromise(plugin, method, options)`
// and `PluginHeaders` (the list of installed native plugins). In a normal
// browser none of this exists and every helper here reports "web".

const cap = typeof window !== 'undefined' ? window.Capacitor : undefined;

export const isNative = () => !!cap?.isNativePlatform?.();

/** 'android' | 'ios' | 'web' */
export const nativePlatform = () => (isNative() ? cap.getPlatform() : 'web');

export const hasPlugin = (name) =>
  isNative() && !!cap.PluginHeaders?.some((h) => h.name === name);

/** A proxy where plugin.method(options) calls the native method and returns a promise. */
export function plugin(name) {
  return new Proxy({}, {
    get: (_, method) => (options = {}) => {
      if (!hasPlugin(name)) return Promise.reject(new Error(`${name} plugin is not available`));
      return cap.nativePromise(name, String(method), options);
    },
  });
}
