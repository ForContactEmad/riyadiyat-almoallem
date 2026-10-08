import Link from "next/link";
import { getDictionary, type Lang } from "@/lib/i18n";
import { routes } from "@/lib/routes";

const HERO_IMAGE = { src: "/hero.svg", width: 560, height: 420 };

export default function Hero({ lang }: { lang: Lang }) {
  const { home: text } = getDictionary(lang);

  return (
    <section className="board-grid bg-board text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-chalk">
            {text.badge}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            {text.h1a}
            <br />
            <span className="text-chalk">{text.h1b}</span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/80">{text.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={routes.lessons(lang)}
              className="rounded-lg bg-chalk px-6 py-3 font-bold text-board-deep transition hover:brightness-95"
            >
              {text.cta1}
            </Link>
            <Link
              href={routes.calculator(lang)}
              className="rounded-lg border border-white/30 px-6 py-3 font-bold transition hover:bg-white/10"
            >
              {text.cta2}
            </Link>
          </div>
        </div>

        {/* صورة الواجهة هي عنصر LCP، فتُجلب بأولوية عالية (Priority Hints) */}
        {/* eslint-disable-next-line @next/next/no-img-element -- موقع ثابت بلا مُحسِّن صور */}
        <img
          {...HERO_IMAGE}
          alt={text.heroAlt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="mx-auto w-full max-w-md"
        />
      </div>
    </section>
  );
}
