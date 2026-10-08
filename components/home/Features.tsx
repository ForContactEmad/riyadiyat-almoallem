import { BookOpen, Calculator, MousePointerClick, type LucideIcon } from "lucide-react";
import { getDictionary, type Lang } from "@/lib/i18n";
import Card from "@/components/ui/Card";

/** أيقونة لكل ميزة، بترتيب home.features نفسه في القاموس. */
const FEATURE_ICONS: LucideIcon[] = [BookOpen, MousePointerClick, Calculator];

export default function Features({ lang }: { lang: Lang }) {
  const { features } = getDictionary(lang).home;

  return (
    <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3">
      {features.map(({ title, text }, index) => {
        const Icon = FEATURE_ICONS[index];
        return (
          <Card key={title} className="p-5">
            <Icon className="text-accent" aria-hidden />
            <h2 className="mt-3 font-bold">{title}</h2>
            <p className="text-sm text-muted">{text}</p>
          </Card>
        );
      })}
    </section>
  );
}
