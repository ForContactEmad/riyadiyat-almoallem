"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/classNames";
import type { NavItem } from "@/lib/routes";

type NavLinksProps = {
  items: NavItem[];
  /** رابط الرئيسية يُعدّ نشطًا بالتطابق التام فقط، وإلا لكان نشطًا في كل الصفحات */
  homeHref: string;
  label: string;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

const navClass = {
  desktop: "hidden gap-1 lg:flex",
  mobile: "border-t border-line px-4 py-2 lg:hidden",
};
const linkClass = {
  desktop: "rounded-md px-3 py-2 text-sm font-medium transition-colors",
  mobile: "block rounded-md px-3 py-3 font-medium",
};

function isActive(href: string, pathname: string, homeHref: string): boolean {
  return href === homeHref ? pathname === href : pathname.startsWith(href);
}

export default function NavLinks({ items, homeHref, label, variant, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={navClass[variant]}>
      {items.map(({ href, label: text }) => {
        const active = isActive(href, pathname, homeHref);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              linkClass[variant],
              active ? "bg-board text-white" : variant === "desktop" && "hover:bg-line/60",
            )}
          >
            {text}
          </Link>
        );
      })}
    </nav>
  );
}
