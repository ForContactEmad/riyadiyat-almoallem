import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import type { Post } from "@/lib/posts";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/classNames";
import { interactiveCardClass } from "@/components/ui/Card";
import PostMeta from "./PostMeta";

type PostCardProps = {
  post: Post;
  lang: Lang;
  /** compact لشبكة الصفحة الرئيسية، و full لقائمة المدونة */
  size?: "compact" | "full";
};

export default function PostCard({ post, lang, size = "full" }: PostCardProps) {
  const isFull = size === "full";
  const Title = isFull ? "h2" : "h3";

  return (
    <Link
      href={routes.post(lang, post.slug)}
      className={cn(interactiveCardClass, "block", isFull ? "p-6" : "p-5")}
    >
      <PostMeta post={post} lang={lang} className="text-xs" />
      <Title className={cn("mt-2 font-bold", isFull && "text-xl")}>{post.title}</Title>
      <p className={cn("mt-1 text-muted", !isFull && "text-sm")}>{post.excerpt}</p>
    </Link>
  );
}
