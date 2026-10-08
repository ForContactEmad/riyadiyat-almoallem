import type { Metadata, Viewport } from "next";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { directionOf, getDictionary } from "@/lib/i18n";
import { generateLangParams, resolveLang, type LangParams } from "@/lib/routes";
import { site } from "@/lib/site";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";

export const dynamicParams = false;
export const generateStaticParams = generateLangParams;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { name, tagline } = getDictionary(await resolveLang(params));
  return {
    metadataBase: new URL(site.url),
    title: { default: `${name} | ${tagline}`, template: `%s | ${name}` },
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export default async function RootLayout({
  params,
  children,
}: LangParams & { children: React.ReactNode }) {
  const lang = await resolveLang(params);
  const { ui } = getDictionary(lang);

  return (
    // suppressHydrationWarning: سكربت السمة يضيف data-theme قبل أن يبدأ React
    <html
      lang={lang}
      dir={directionOf(lang)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-chalk focus:p-3 focus:text-board-deep"
        >
          {ui.skip}
        </a>
        <Header lang={lang} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
