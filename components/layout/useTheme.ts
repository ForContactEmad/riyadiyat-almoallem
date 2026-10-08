"use client";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { applyTheme, getAppliedTheme, getPreferredTheme, saveTheme, type Theme } from "@/lib/theme";

const SERVER_THEME: Theme = "light";

/** يراقب السمة ‎data-theme‎ على ‎<html>‎، وهي مصدر الحقيقة الوحيد للوضع الحالي. */
function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const readTheme = (): Theme => getAppliedTheme() ?? SERVER_THEME;

/**
 * السمة الفعلية يضبطها سكربت ‎<head>‎ قبل الرسم؛ هذا الـ hook يقرؤها ويبدّلها.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, () => SERVER_THEME);
  const pathname = usePathname();

  // احتياط مع كل تنقّل: لو فُقدت السمة عن <html> نعيدها من اختيار الزائر
  useEffect(() => {
    if (!getAppliedTheme()) applyTheme(getPreferredTheme());
  }, [pathname]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
  }

  return { theme, toggleTheme };
}
