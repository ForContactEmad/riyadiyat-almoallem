import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import PageHeader from "@/components/layout/PageHeader";
import { getDictionary } from "@/lib/i18n";
import { buildPageMeta } from "@/lib/meta";
import { getPosts } from "@/lib/posts";
import { resolveLang, type LangParams } from "@/lib/routes";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { title, metaDesc } = getDictionary(lang).blog;
  return buildPageMeta({ lang, path: "/blog/", title, description: metaDesc });
}

export default async function BlogPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const { blog: text } = getDictionary(lang);

  return (
    <>
      <PageHeader title={text.title} lead={text.lead} />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
        {getPosts(lang).map((post) => (
          <PostCard key={post.slug} post={post} lang={lang} />
        ))}
      </div>
    </>
  );
}
