import type { Lang } from "./i18n";

/** محتوى له حقول مشتركة ونصّان مترجمان (ar و en). */
export type Localized<Shared, Text> = Shared & Record<Lang, Text>;

/** يدمج الحقول المشتركة مع نص اللغة المطلوبة في كائن واحد مسطّح. */
export function localize<Shared extends object, Text extends object>(
  entry: Localized<Shared, Text>,
  lang: Lang,
): Shared & Text {
  const { ar, en, ...shared } = entry;
  return { ...(shared as unknown as Shared), ...(lang === "ar" ? ar : en) };
}
