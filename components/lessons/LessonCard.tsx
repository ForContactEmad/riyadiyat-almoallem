import Link from "next/link";
import { MousePointerClick } from "lucide-react";
import { getDictionary, type Lang } from "@/lib/i18n";
import type { Lesson } from "@/lib/lessons";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/classNames";
import { interactiveCardClass } from "@/components/ui/Card";
import DirectionalArrow from "@/components/ui/DirectionalArrow";
import Duration from "./Duration";
import StageBadge from "./StageBadge";

export default function LessonCard({ lesson, lang }: { lesson: Lesson; lang: Lang }) {
  const { stages, lessons: text } = getDictionary(lang);

  return (
    <Link
      href={routes.lesson(lang, lesson.slug)}
      className={cn(interactiveCardClass, "group flex flex-col p-5 hover:-translate-y-0.5")}
    >
      <div className="flex items-center justify-between text-xs">
        <StageBadge label={stages[lesson.stage]} className="py-1" />
        <Duration minutes={lesson.minutes} unit={text.minutes} />
      </div>

      <h3 className="mt-3 text-lg font-bold">{lesson.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{lesson.summary}</p>
      {lesson.formula && (
        <p className="math mt-3 rounded-md bg-paper px-3 py-2 text-center text-sm">
          {lesson.formula}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between text-sm font-bold text-accent">
        <span className="flex items-center gap-1">
          {lesson.widget && (
            <>
              <MousePointerClick size={16} aria-hidden /> {text.interactive}
            </>
          )}
        </span>
        <span className="flex items-center gap-1">
          {text.start}
          <DirectionalArrow
            direction="forward"
            className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
