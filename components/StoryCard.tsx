import Link from "next/link";
import { Story } from "@/lib/types";
import { Clock, BookOpen } from "lucide-react";

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
        <article className="bg-[#1A1A2E] text-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full">
          {story.cover_image_url && (
            <div className="aspect-video overflow-hidden">
              <img
                src={story.cover_image_url}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-6">
            {genre && (
              <span className="inline-block text-xs font-semibold text-[#C9A84C] uppercase tracking-wider mb-2">
                {genre.name}
              </span>
            )}
            <h2 className="font-display text-xl font-bold text-white group-hover:text-[#E94560] transition-colors leading-snug mb-2">
              {story.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
              {story.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{author?.display_name}</span>
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
      <Link href={`/stories/${story.slug}`} className="group flex gap-4 items-start py-3 border-b border-gray-200 last:border-0">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-[#1A1A2E] group-hover:text-[#E94560] transition-colors text-sm leading-snug truncate">
            {story.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{author?.display_name} · {story.read_time_minutes} min</p>
        </div>
        {genre && (
          <span className="text-xs bg-[#F5F0EB] border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
            {genre.name}
          </span>
        )}
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-[#E94560]/20 transition-all duration-200 h-full flex flex-col">
        {story.cover_image_url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={story.cover_image_url}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          {genre && (
            <span className="inline-block text-xs font-semibold text-[#E94560] uppercase tracking-wider mb-2">
              {genre.name}
            </span>
          )}
          <h2 className="font-display text-lg font-bold text-[#1A1A2E] group-hover:text-[#E94560] transition-colors leading-snug mb-2">
            {story.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
            {story.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#1A1A2E] flex items-center justify-center text-white text-xs font-bold">
                {author?.display_name?.[0]?.toUpperCase()}
              </div>
              <span>{author?.display_name}</span>
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
