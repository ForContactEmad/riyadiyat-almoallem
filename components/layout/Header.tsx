"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, Sigma, X } from "lucide-react";
import { getDictionary, type Lang } from "@/lib/i18n";
import { getNavItems, routes } from "@/lib/routes";
import { cn } from "@/lib/classNames";
import LanguageSwitch from "./LanguageSwitch";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { iconButtonClass } from "./styles";

export default function Header({ lang }: { lang: Lang }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { name, ui } = getDictionary(lang);
  const navItems = getNavItems(lang);
  const homeHref = routes.home(lang);
  const MenuIcon = isMenuOpen ? X : Menu;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <Link href={homeHref} className="flex items-center gap-2 text-lg font-extrabold">
          <span className="grid size-9 place-items-center rounded-lg bg-board text-chalk">
            <Sigma size={20} aria-hidden />
          </span>
          {name}
        </Link>

        <NavLinks items={navItems} homeHref={homeHref} label={ui.mainNav} variant="desktop" />

        <div className="flex items-center gap-1">
          <LanguageSwitch lang={lang} />
          <ThemeToggle toDarkLabel={ui.toDark} toLightLabel={ui.toLight} />
          <button
            className={cn(iconButtonClass, "lg:hidden")}
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? ui.closeMenu : ui.openMenu}
          >
            <MenuIcon aria-hidden />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <NavLinks
          items={navItems}
          homeHref={homeHref}
          label={ui.mobileNav}
          variant="mobile"
          onNavigate={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
