import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lightbulb, MousePointerClick, PlayCircle, type LucideIcon } from "lucide-react";
import Duration from "@/components/lessons/Duration";
import LessonWidget from "@/components/lessons/LessonWidget";
import StageBadge from "@/components/lessons/StageBadge";
import VideoEmbed from "@/components/lessons/VideoEmbed";
import BackLink from "@/components/ui/BackLink";
import Card, { interactiveCardClass } from "@/components/ui/Card";
import { cn } from "@/lib/classNames";
import { getDictionary, type Dictionary } from "@/lib/i18n";
import { getLesson, getNextLesson, lessonSlugs, type Lesson } from "@/lib/lessons";
import { buildPageMeta } from "@/lib/meta";
import { generateLangSlugParams, resolveLang, routes, type SlugParams } from "@/lib/routes";

type LessonText = Dictionary["lessons"];

export const dynamicParams = false;
export const generateStaticParams = () => generateLangSlugParams(lessonSlugs);

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const lesson = getLesson(lang, slug);
  if (!lesson) return {};

  return buildPageMeta({
    lang,
    path: `/lessons/${slug}/`,
    title: lesson.title,
    description: lesson.summary,
    article: {},
  });
}

export default async function LessonPage({ params }: SlugParams) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const lesson = getLesson(lang, slug);
  if (!lesson) notFound();

  const { lessons: text, stages, home } = getDictionary(lang);
  const nextLesson = getNextLesson(lang, slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <BackLink href={routes.lessons(lang)}>{home.allLessons}</BackLink>

      <header className="mt-4">
        <p className="flex items-center gap-3 text-sm">
          <StageBadge label={stages[lesson.stage]} />
          <Duration minutes={lesson.minutes} unit={text.minutes} />
        </p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{lesson.title}</h1>
        <p className="mt-2 text-lg text-muted">{lesson.summary}</p>
      </header>

      {lesson.formula && (
        <p className="math board-grid my-8 rounded-xl bg-board px-4 py-6 text-center text-2xl text-chalk">
          {lesson.formula}
        </p>
      )}

      {lesson.sections.map((section) => (
        <section key={section.heading} className="mt-8">
          <h2 className="text-xl font-extrabold">{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mt-2">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {lesson.widget && (
        <LessonSection icon={MousePointerClick} title={text.tryIt}>
          <Card className="rounded-2xl p-5 md:p-6">
            <LessonWidget widget={lesson.widget} lang={lang} />
          </Card>
        </LessonSection>
      )}

      <WorkedExample example={lesson.example} text={text} />

      <LessonSection icon={PlayCircle} title={text.video}>
        <VideoEmbed videoId={lesson.videoId} title={lesson.title} lang={lang} />
      </LessonSection>

      {nextLesson && (
        <Link
          href={routes.lesson(lang, nextLesson.slug)}
          className={cn(interactiveCardClass, "mt-10 block p-5 hover:shadow-none")}
        >
          <span className="text-sm text-muted">{text.next}</span>
          <span className="block text-lg font-bold">{nextLesson.title}</span>
        </Link>
      )}
    </article>
  );
}

type LessonSectionProps = { icon: LucideIcon; title: string; children: React.ReactNode };

function LessonSection({ icon: Icon, title, children }: LessonSectionProps) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 flex items-center gap-2 text-xl font-extrabold">
        <Icon className="text-accent" aria-hidden /> {title}
      </h2>
      {children}
    </section>
  );
}

/** <bdi> يعزل اتجاه كل خطوة، فلا تتبعثر الرموز الرياضية داخل النص العربي. */
function WorkedExample({ example, text }: { example: Lesson["example"]; text: LessonText }) {
  return (
    <section className="mt-10 rounded-2xl border border-chalk bg-chalk/15 p-5">
      <h2 className="flex items-center gap-2 text-xl font-extrabold">
        <Lightbulb aria-hidden /> {text.example}
      </h2>
      <p className="mt-2 font-bold">{example.question}</p>
      <ol className="mt-2 list-inside list-decimal space-y-1">
        {example.steps.map((step) => (
          <li key={step}>
            <bdi>{step}</bdi>
          </li>
        ))}
      </ol>
      <p className="mt-3 rounded-lg bg-card px-3 py-2 font-bold">
        {text.answer} <bdi>{example.answer}</bdi>
      </p>
    </section>
  );
}
