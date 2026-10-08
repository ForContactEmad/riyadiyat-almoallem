import Link from "next/link";
import { Mail } from "lucide-react";
import { getDictionary, type Lang } from "@/lib/i18n";
import { getNavItems } from "@/lib/routes";
import { site } from "@/lib/site";

export default function Footer({ lang }: { lang: Lang }) {
  const { name, description, ui } = getDictionary(lang);

  return (
    <footer className="mt-20 bg-board-deep text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-extrabold text-white">{name}</p>
          <p className="mt-1 max-w-md text-sm">{description}</p>
        </div>
        <nav aria-label={ui.footerNav} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {getNavItems(lang).map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-chalk">
              {label}
            </Link>
          ))}
        </nav>
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-2 text-sm hover:text-chalk"
        >
          <Mail size={16} aria-hidden /> <span dir="ltr">{site.email}</span>
        </a>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} {name}. {ui.rights}
      </p>
    </footer>
  );
}
