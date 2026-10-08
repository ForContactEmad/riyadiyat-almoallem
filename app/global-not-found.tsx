import type { Metadata } from "next";
import "./globals.css";
import { routes } from "@/lib/routes";
import { themeInitScript } from "@/lib/theme";

export const metadata: Metadata = { title: "404 | رياضيات المعلم", robots: { index: false } };

/**
 * صفحة 404 واحدة للّغتين لأنها خارج ‎app/[lang]‎ ولا تعرف لغة الزائر عند البناء.
 * السكربت يضبط اللغة من مسار الرابط، و CSS يُظهر النص المطابق لاتجاه الصفحة.
 */
const langFromPathScript = `(function(){if(location.pathname.indexOf("/en")===0){var d=document.documentElement;d.lang="en";d.dir="ltr"}})();`;

const MESSAGES = [
  {
    visibility: "ltr:hidden",
    title: "هذه الصفحة = ∅",
    text: "الصفحة التي تبحث عنها غير موجودة.",
    home: { href: routes.home("ar"), label: "العودة للرئيسية" },
  },
  {
    visibility: "rtl:hidden",
    title: "This page = ∅",
    text: "The page you are looking for does not exist.",
    home: { href: routes.home("en"), label: "Back to home" },
  },
];

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript + langFromPathScript }} />
      </head>
      <body className="grid-paper grid min-h-screen place-items-center px-4 text-center">
        <div>
          <p className="math text-7xl font-extrabold text-accent">404</p>
          {MESSAGES.map(({ visibility, title, text, home }) => (
            <div key={title} className={visibility}>
              <h1 className="mt-2 text-2xl font-extrabold">{title}</h1>
              <p className="text-muted">{text}</p>
              {/* رابط عادي: الصفحة خارج موجّه التطبيق */}
              <a
                href={home.href}
                className="mt-6 inline-block rounded-lg bg-board px-6 py-3 font-bold text-white"
              >
                {home.label}
              </a>
            </div>
          ))}
        </div>
      </body>
    </html>
  );
}
