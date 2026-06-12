import Link from "next/link";
import { Story } from "@/lib/types";
import { Clock } from "lucide-react";

interface StoryCardProps {
  story: Story;
  variant?: "default" | "featured" | "compact";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function StoryCard({ story, variant = "default" }: StoryCardProps) {
  const author = story.authors;
  const genre = story.genres;

  if (variant === "featured") {
    return (
      <Link href={`/stories/${story.slug}`} className="group block">
        <article className="bg-[#141414] border border-[#C9A84C]/15 text-white rounded-2xl overflow-hidden hover:border-[#C9A84C]/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-300 h-full">
          {story.cover_image_url && (
            <div className="aspect-video overflow-hidden">
              <img
                src={story.cover_image_url}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
            </div>
          )}
          <div className="p-6">
            {genre && (
              <span className="inline-block text-xs font-semibold text-[#C9A84C] uppercase tracking-[0.2em] mb-3">
                {genre.name}
              </span>
            )}
            <h2 className="font-display text-xl font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-snug mb-3">
              {story.title}
            </h2>
            <p className="text-[#888888] text-sm leading-relaxed line-clamp-2 mb-5">
              {story.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-[#555555]">
              <span className="text-[#888888]">{author?.display_name}</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {story.read_time_minutes} min read
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/stories/${story.slug}`} className="group flex gap-4 items-start py-3 border-b border-[#C9A84C]/10 last:border-0">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-white group-hover:text-[#C9A84C] transition-colors text-sm leading-snug truncate">
            {story.title}
          </h3>
          <p className="text-xs text-[#555555] mt-1">{author?.display_name} · {story.read_time_minutes} min</p>
        </div>
        {genre && (
          <span className="text-xs bg-[#1C1C1C] border border-[#C9A84C]/20 text-[#C9A84C] px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
            {genre.name}
          </span>
        )}
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <article className="bg-[#141414] rounded-xl overflow-hidden border border-[#C9A84C]/10 hover:border-[#C9A84C]/35 hover:shadow-[0_0_25px_rgba(201,168,76,0.07)] transition-all duration-200 h-full flex flex-col">
        {story.cover_image_url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={story.cover_image_url}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          {genre && (
            <span className="inline-block text-xs font-semibold text-[#C9A84C] uppercase tracking-[0.2em] mb-2">
              {genre.name}
            </span>
          )}
          <h2 className="font-display text-lg font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-snug mb-2">
            {story.title}
          </h2>
          <p className="text-[#888888] text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
            {story.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-[#555555] border-t border-[#C9A84C]/10 pt-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-xs font-bold">
                {author?.display_name?.[0]?.toUpperCase()}
              </div>
              <span className="text-[#888888]">{author?.display_name}</span>
            </div>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {story.read_time_minutes} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
