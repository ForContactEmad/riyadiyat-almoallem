import { formatDate, type Lang } from "@/lib/i18n";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/classNames";

type PostMetaProps = { post: Post; lang: Lang; className?: string };

/** سطر التاريخ والتصنيف أعلى المقال. */
export default function PostMeta({ post, lang, className }: PostMetaProps) {
  return (
    <p className={cn("text-muted", className)}>
      <time dateTime={post.date}>{formatDate(post.date, lang)}</time> · {post.tag}
    </p>
  );
}
