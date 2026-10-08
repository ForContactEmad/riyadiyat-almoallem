import type { Metadata } from "next";
import { Mail, MessageCircleQuestion, type LucideIcon } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import { getDictionary } from "@/lib/i18n";
import { buildPageMeta } from "@/lib/meta";
import { resolveLang, type LangParams } from "@/lib/routes";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { title, metaDesc } = getDictionary(lang).contact;
  return buildPageMeta({ lang, path: "/contact/", title, description: metaDesc });
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { contact: text } = getDictionary(lang);

  return (
    <>
      <PageHeader title={text.title} lead={text.lead} />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[1fr_18rem]">
        <Card className="rounded-2xl p-6">
          <ContactForm lang={lang} />
        </Card>
        <aside className="space-y-4">
          <InfoCard icon={Mail} title={text.emailCard}>
            <a href={`mailto:${site.email}`} className="text-accent underline">
              <bdi dir="ltr">{site.email}</bdi>
            </a>
          </InfoCard>
          <InfoCard icon={MessageCircleQuestion} title={text.tipTitle}>
            <p className="text-muted">{text.tipText}</p>
          </InfoCard>
        </aside>
      </div>
    </>
  );
}

type InfoCardProps = { icon: LucideIcon; title: string; children: React.ReactNode };

function InfoCard({ icon: Icon, title, children }: InfoCardProps) {
  return (
    <Card className="p-5 text-sm">
      <Icon className="text-accent" aria-hidden />
      <h2 className="mt-2 text-base font-bold">{title}</h2>
      {children}
    </Card>
  );
}
