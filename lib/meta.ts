import type { Metadata } from "next";
import { getDictionary, DEFAULT_LANG, LANGS, type Lang } from "./i18n";

const OG_IMAGE: Record<Lang, string> = { ar: "/og.png", en: "/og-en.png" };
const OG_IMAGE_SIZE = { width: 1200, height: 630 };

type PageMetaOptions = {
  lang: Lang;
  /** مسار الصفحة بدون بادئة اللغة، مثل ‎"/lessons/"‎ */
  path: string;
  title?: string;
  description?: string;
  /** للمقالات والدروس: يجعل نوع البطاقة article */
  article?: { publishedTime?: string };
};

/** بيانات وصفية موحّدة لكل صفحة: canonical و hreflang و Open Graph. */
export function buildPageMeta({
  lang,
  path,
  title,
  description,
  article,
}: PageMetaOptions): Metadata {
  const dictionary = getDictionary(lang);
  const url = `/${lang}${path}`;
  const shareTitle = title ?? dictionary.name;
  const shareDescription = description ?? dictionary.description;
  const image = OG_IMAGE[lang];

  return {
    title,
    description: shareDescription,
    alternates: { canonical: url, languages: buildLanguageAlternates(path) },
    openGraph: {
      type: article ? "article" : "website",
      locale: dictionary.ogLocale,
      siteName: dictionary.name,
      title: shareTitle,
      description: shareDescription,
      url,
      images: [{ url: image, ...OG_IMAGE_SIZE, alt: dictionary.name }],
      ...article,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [image],
    },
  };
}

function buildLanguageAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = { "x-default": `/${DEFAULT_LANG}${path}` };
  for (const lang of LANGS) alternates[lang] = `/${lang}${path}`;
  return alternates;
}
