import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import LessonCard from "@/components/lessons/LessonCard";
import { getDictionary, STAGES } from "@/lib/i18n";
import { getLessons } from "@/lib/lessons";
import { buildPageMeta } from "@/lib/meta";
import { resolveLang, type LangParams } from "@/lib/routes";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { title, metaDesc } = getDictionary(lang).lessons;
  return buildPageMeta({ lang, path: "/lessons/", title, description: metaDesc });
}

export default async function LessonsPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { lessons: text, stages } = getDictionary(lang);
  const lessons = getLessons(lang);

  return (
    <>
      <PageHeader title={text.title} lead={text.lead} />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        {STAGES.map((stage) => (
          <section key={stage} aria-labelledby={`stage-${stage}`}>
            <h2
              id={`stage-${stage}`}
              className="mb-4 border-s-4 border-chalk ps-3 text-xl font-extrabold"
            >
              {text.stage} {stages[stage]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lessons
                .filter((lesson) => lesson.stage === stage)
                .map((lesson) => (
                  <LessonCard key={lesson.slug} lesson={lesson} lang={lang} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
