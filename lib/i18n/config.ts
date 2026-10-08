/** إعدادات اللغات: القائمة المدعومة، الاتجاه، ومفتاح حفظ اختيار الزائر. */

export const LANGS = ["ar", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "ar";

/** المفتاح نفسه مستخدم في public/index.html لتحويل الرابط الجذري. */
export const LANG_STORAGE_KEY = "lang";

export type Stage = "primary" | "middle" | "high";
export const STAGES: readonly Stage[] = ["primary", "middle", "high"];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export function directionOf(lang: Lang): "rtl" | "ltr" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function otherLang(lang: Lang): Lang {
  return lang === "ar" ? "en" : "ar";
}
