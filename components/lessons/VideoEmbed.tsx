"use client";
import { useState } from "react";
import { Play, Video } from "lucide-react";
import { getDictionary, type Lang } from "@/lib/i18n";

type VideoEmbedProps = { videoId?: string; title: string; lang: Lang };

const playerUrl = (videoId: string) =>
  `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
const thumbnailUrl = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

/**
 * فيديو «خفيف»: لا يُحمَّل مشغّل يوتيوب إلا عند الضغط،
 * والصورة المصغّرة تُجلب بأولوية منخفضة (Priority Hints).
 */
export default function VideoEmbed({ videoId, title, lang }: VideoEmbedProps) {
  const [isPlaying, setPlaying] = useState(false);
  const { widgets: text } = getDictionary(lang);

  if (!videoId) {
    return <VideoPlaceholder title={text.videoSoon} description={text.videoSoonText} />;
  }

  if (isPlaying) {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={playerUrl(videoId)}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-board"
      aria-label={`${text.play} ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- صورة خارجية في موقع ثابت */}
      <img
        src={thumbnailUrl(videoId)}
        alt=""
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="size-full object-cover opacity-80 transition group-hover:opacity-100"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-16 place-items-center rounded-full bg-chalk text-board-deep shadow-lg">
          <Play fill="currentColor" aria-hidden />
        </span>
      </span>
    </button>
  );
}

function VideoPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="board-grid grid aspect-video place-items-center rounded-xl bg-board text-center text-white/80">
      <div>
        <Video className="mx-auto mb-2 text-chalk" size={36} aria-hidden />
        <p className="font-bold text-white">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
