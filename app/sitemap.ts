import type { MetadataRoute } from "next";
import { LANGS } from "@/lib/i18n";
import { lessonSlugs } from "@/lib/lessons";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

type SitemapPage = { path: string; lastModified?: string };

const STATIC_PATHS = ["/", "/lessons/", "/calculator/", "/blog/", "/contact/"];

/** كل الصفحات بمسارها دون بادئة اللغة. */
function listPages(): SitemapPage[] {
  return [
    ...STATIC_PATHS.map((path) => ({ path })),
    ...lessonSlugs.map((slug) => ({ path: `/lessons/${slug}/` })),
    ...getPosts("ar").map((post) => ({ path: `/blog/${post.slug}/`, lastModified: post.date })),
  ];
}

const absoluteUrl = (lang: string, path: string) => `${site.url}/${lang}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return listPages().flatMap(({ path, lastModified }) =>
    LANGS.map((lang) => ({
      url: absoluteUrl(lang, path),
      lastModified,
      alternates: {
        languages: Object.fromEntries(LANGS.map((other) => [other, absoluteUrl(other, path)])),
      },
    })),
  );
}
