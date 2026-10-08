import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import PostCard from "@/components/blog/PostCard";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import LessonCard from "@/components/lessons/LessonCard";
import PythagorasExplorer from "@/components/lessons/widgets/PythagorasExplorer";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { getDictionary } from "@/lib/i18n";
import { getLessons } from "@/lib/lessons";
import { buildPageMeta } from "@/lib/meta";
import { getPosts } from "@/lib/posts";
import { resolveLang, routes, type LangParams } from "@/lib/routes";

/** الدروس المعروضة في الرئيسية: واحد من كل نوع تفاعلي (خطي، فيثاغورس، تربيعي). */
const FEATURED_LESSON_SLUGS = ["linear-equations", "pythagoras", "quadratic-equations"];
const LATEST_POSTS_COUNT = 3;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  return buildPageMeta({ lang: await resolveLang(params), path: "/" });
}

export default async function HomePage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { home: text } = getDictionary(lang);
  const featuredLessons = getLessons(lang).filter((lesson) =>
    FEATURED_LESSON_SLUGS.includes(lesson.slug),
  );
  const latestPosts = getPosts(lang).slice(0, LATEST_POSTS_COUNT);

  return (
    <>
      <Hero lang={lang} />
      <Features lang={lang} />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <SectionHeader
          title={text.latest}
          link={{ href: routes.lessons(lang), label: text.allLessons }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLessons.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} lang={lang} />
          ))}
        </div>
      </section>

      <section className="grid-paper my-12 border-y border-line">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-2xl font-extrabold">{text.tryTitle}</h2>
          <p className="mb-6 text-muted">{text.tryLead}</p>
          <Card className="rounded-2xl p-5 md:p-8">
            <PythagorasExplorer lang={lang} />
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <SectionHeader
          title={
            <>
              <Newspaper aria-hidden /> {text.fromBlog}
            </>
          }
          link={{ href: routes.blog(lang), label: text.allPosts }}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} size="compact" />
          ))}
        </div>
      </section>
    </>
  );
}
