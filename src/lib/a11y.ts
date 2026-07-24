export type Theme = "light" | "dark" | "system";
export type TextSize = "normal" | "large" | "xl";

export interface A11ySettings {
  theme: Theme;
  textSize: TextSize;
  reduceMotion: boolean;
  highContrast: boolean;
}

export const DEFAULT_A11Y_SETTINGS: A11ySettings = {
  theme: "system",
  textSize: "normal",
  reduceMotion: false,
  highContrast: false,
};

const STORAGE_KEY = "fixit-a11y";

export function loadA11ySettings(): A11ySettings {
  if (typeof window === "undefined") return DEFAULT_A11Y_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_A11Y_SETTINGS;
    return { ...DEFAULT_A11Y_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_A11Y_SETTINGS;
  }
}

export function saveA11ySettings(settings: A11ySettings) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // storage unavailable (private browsing, quota) — settings just won't persist
  }
}

/** Applies settings to <html> — the single place that touches these classes. */
export function applyA11ySettings(settings: A11ySettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  const isDark =
    settings.theme === "dark" ||
    (settings.theme === "system" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", !!isDark);
  root.classList.toggle("light", settings.theme === "light");

  root.classList.remove("text-large", "text-xl");
  if (settings.textSize === "large") root.classList.add("text-large");
  if (settings.textSize === "xl") root.classList.add("text-xl");

  root.classList.toggle("reduce-motion", settings.reduceMotion);
  root.classList.toggle("high-contrast", settings.highContrast);
}

/**
 * Inline script source (plain JS string, not TS) run in <head> before first
 * paint, so the correct theme/text-size/etc. classes are already on <html>
 * before any content renders — no flash of the wrong theme. Mirrors
 * loadA11ySettings + applyA11ySettings above; kept as a plain string because
 * it has to run standalone, before React or any module graph is available.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var raw = window.localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var s = raw ? JSON.parse(raw) : {};
    var theme = s.theme || "system";
    var textSize = s.textSize || "normal";
    var root = document.documentElement;
    var isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) root.classList.add("dark");
    if (theme === "light") root.classList.add("light");
    if (textSize === "large") root.classList.add("text-large");
    if (textSize === "xl") root.classList.add("text-xl");
    if (s.reduceMotion) root.classList.add("reduce-motion");
    if (s.highContrast) root.classList.add("high-contrast");
  } catch (e) {}
})();
`;
