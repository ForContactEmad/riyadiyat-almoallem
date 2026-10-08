import { readStorage, writeStorage } from "./storage";

/** منطق الوضع الداكن/الفاتح. السمة تُكتب على ‎<html data-theme="…">‎ وتقرؤها متغيرات CSS. */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_COLORS: Record<Theme, string> = { light: "#faf7ef", dark: "#0e1918" };

const DARK_QUERY = "(prefers-color-scheme: dark)";

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

/** اختيار الزائر المحفوظ، وإلا إعداد جهازه. */
export function getPreferredTheme(): Theme {
  const stored = readStorage(THEME_STORAGE_KEY);
  if (isTheme(stored)) return stored;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

export function getAppliedTheme(): Theme | null {
  const applied = document.documentElement.dataset.theme;
  return isTheme(applied) ? applied : null;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function saveTheme(theme: Theme): void {
  writeStorage(THEME_STORAGE_KEY, theme);
}

/**
 * سكربت يُحقن في ‎<head>‎ ويُنفَّذ قبل الرسم، حتى لا يومض الوضع الفاتح
 * عند من اختار الداكن. مكتوب كنص لأنه يعمل قبل تحميل React.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="dark"&&t!=="light")t=matchMedia("${DARK_QUERY}").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})();`;
