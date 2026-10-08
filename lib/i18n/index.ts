import { ar, type Dictionary } from "./ar";
import { en } from "./en";
import type { Lang } from "./config";

export * from "./config";
export type { Dictionary };

const dictionaries: Record<Lang, Dictionary> = { ar, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function formatDate(isoDate: string, lang: Lang): string {
  const { dateLocale } = getDictionary(lang);
  return new Intl.DateTimeFormat(dateLocale, { dateStyle: "long" }).format(new Date(isoDate));
}
