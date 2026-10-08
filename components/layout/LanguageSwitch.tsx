"use client";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { getDictionary, LANG_STORAGE_KEY, otherLang, type Lang } from "@/lib/i18n";
import { switchLangInPath } from "@/lib/routes";
import { writeStorage } from "@/lib/storage";

/** ينقل الزائر إلى الصفحة نفسها باللغة الأخرى ويحفظ اختياره. */
export default function LanguageSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const { ui } = getDictionary(lang);
  const target = otherLang(lang);

  // رابط عادي (تحميل كامل) وليس <Link>: تغيير اللغة يعيد بناء عنصر <html>،
  // والتحميل الكامل يضمن تشغيل سكربت السمة فيبقى الوضع الداكن كما هو.
  return (
    <a
      href={switchLangInPath(pathname, lang, target)}
      onClick={() => writeStorage(LANG_STORAGE_KEY, target)}
      hrefLang={target}
      lang={target}
      aria-label={ui.switchLangLabel}
      className="flex h-10 items-center gap-1.5 rounded-md px-2.5 text-sm font-bold hover:bg-line/60"
    >
      <Languages size={18} aria-hidden /> {ui.switchLang}
    </a>
  );
}
