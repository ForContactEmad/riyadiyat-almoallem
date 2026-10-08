import type { Metadata } from "next";
import Calculator from "@/components/calculator/Calculator";
import PageHeader from "@/components/layout/PageHeader";
import { getDictionary } from "@/lib/i18n";
import { buildPageMeta } from "@/lib/meta";
import { resolveLang, type LangParams } from "@/lib/routes";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { title, metaDesc } = getDictionary(lang).calculator;
  return buildPageMeta({ lang, path: "/calculator/", title, description: metaDesc });
}

export default async function CalculatorPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { calculator: text } = getDictionary(lang);

  return (
    <>
      <PageHeader title={text.title} lead={text.lead} />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Calculator lang={lang} />
      </div>
    </>
  );
}
