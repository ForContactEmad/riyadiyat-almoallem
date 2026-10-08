import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostMeta from "@/components/blog/PostMeta";
import BackLink from "@/components/ui/BackLink";
import { getDictionary } from "@/lib/i18n";
import { buildPageMeta } from "@/lib/meta";
import { getPost, postSlugs } from "@/lib/posts";
import { generateLangSlugParams, resolveLang, routes, type SlugParams } from "@/lib/routes";

export const dynamicParams = false;
export const generateStaticParams = () => generateLangSlugParams(postSlugs);

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const post = getPost(lang, slug);
  if (!post) return {};

  return buildPageMeta({
    lang,
    path: `/blog/${slug}/`,
    title: post.title,
    description: post.excerpt,
    article: { publishedTime: post.date },
  });
}

export default async function PostPage({ params }: SlugParams) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const post = getPost(lang, slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <BackLink href={routes.blog(lang)}>{getDictionary(lang).blog.title}</BackLink>
      <PostMeta post={post} lang={lang} className="mt-4 text-sm" />
      <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">{post.title}</h1>

      <div className="mt-6 space-y-5 text-lg">
        {post.body.map((block) => (
          <section key={block.text}>
            {block.heading && <h2 className="mb-1 text-xl font-extrabold">{block.heading}</h2>}
            <p>{block.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
