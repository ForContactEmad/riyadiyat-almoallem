import { notFound } from "next/navigation";
import { getDictionary, isLang, LANGS, type Lang } from "./i18n";

/** كل روابط الموقع في مكان واحد، حتى لا تُبنى المسارات يدويًا داخل المكونات. */
export const routes = {
  home: (lang: Lang) => `/${lang}/`,
  lessons: (lang: Lang) => `/${lang}/lessons/`,
  lesson: (lang: Lang, slug: string) => `/${lang}/lessons/${slug}/`,
  calculator: (lang: Lang) => `/${lang}/calculator/`,
  blog: (lang: Lang) => `/${lang}/blog/`,
  post: (lang: Lang, slug: string) => `/${lang}/blog/${slug}/`,
  contact: (lang: Lang) => `/${lang}/contact/`,
};

export type NavItem = { href: string; label: string };

export function getNavItems(lang: Lang): NavItem[] {
  const { nav } = getDictionary(lang);
  return [
    { href: routes.home(lang), label: nav.home },
    { href: routes.lessons(lang), label: nav.lessons },
    { href: routes.calculator(lang), label: nav.calculator },
    { href: routes.blog(lang), label: nav.blog },
    { href: routes.contact(lang), label: nav.contact },
  ];
}

/** يستبدل بادئة اللغة في المسار الحالي: ‎/ar/blog/ ← ‎/en/blog/ */
export function switchLangInPath(pathname: string, from: Lang, to: Lang): string {
  return pathname.replace(new RegExp(`^/${from}(?=/|$)`), `/${to}`);
}

// ----- معاملات الصفحات (Next.js يمرّرها كـ Promise) -----

export type LangParams = { params: Promise<{ lang: string }> };
export type SlugParams = { params: Promise<{ lang: string; slug: string }> };

export const generateLangParams = () => LANGS.map((lang) => ({ lang }));

export const generateLangSlugParams = (slugs: readonly string[]) =>
  LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));

/** يتحقق من اللغة القادمة من الرابط ويعرض 404 إن لم تكن مدعومة. */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}
