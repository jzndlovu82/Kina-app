"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getStoryBySlug } from "@/lib/supabase";
import { Story } from "@/lib/types";
import { Clock, ArrowLeft, Twitter, Share2 } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function StoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getStoryBySlug(slug);
        setStory(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (slug) load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
        <div className="h-4 bg-gray-100 rounded mb-8 w-1/3" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded mb-3 w-full" />
        ))}
      </div>
    );
  }

  if (notFound || !story) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-[#1A1A2E] mb-4">Story not found</h1>
        <p className="text-gray-500 mb-8">This story may have been removed or the link is incorrect.</p>
        <Link href="/" className="text-[#E94560] font-semibold hover:underline">← Back to stories</Link>
      </div>
    );
  }

  const author = story.authors;
  const genre = story.genres;
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/stories/${story.slug}`;

  return (
    <div className="bg-[#F5F0EB] min-h-screen">
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E94560] transition-colors">
          <ArrowLeft size={14} /> All stories
        </Link>
      </div>

      {/* Story header */}
      <header className="max-w-2xl mx-auto px-4 pt-6 pb-8">
        {genre && (
          <Link
            href={`/genre/${genre.slug}`}
            className="inline-block text-xs font-bold uppercase tracking-widest text-[#E94560] mb-3 hover:text-[#1A1A2E] transition-colors"
          >
            {genre.name}
          </Link>
        )}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A2E] leading-tight mb-4">
          {story.title}
        </h1>
        <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
          <div className="flex items-center gap-3">
            <Link href={`/author/${story.author_id}`}>
              <div className="w-9 h-9 rounded-full bg-[#1A1A2E] flex items-center justify-center text-white font-bold text-sm">
                {author?.display_name?.[0]?.toUpperCase()}
              </div>
            </Link>
            <div>
              <Link href={`/author/${story.author_id}`} className="text-sm font-semibold text-[#1A1A2E] hover:text-[#E94560] transition-colors block">
                {author?.display_name}
              </Link>
              <p className="text-xs text-gray-400">
                {story.published_at ? formatDate(story.published_at) : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {story.read_time_minutes} min read
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-[#E94560] transition-colors"
            >
              <Share2 size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Cover image */}
      {story.cover_image_url && (
        <div className="max-w-3xl mx-auto px-4 mb-8">
          <img src={story.cover_image_url} alt={story.title} className="w-full rounded-xl shadow-md" />
        </div>
      )}

      {/* Story body */}
      <article className="max-w-2xl mx-auto px-4 pb-16">
        <div
          className="story-body"
          dangerouslySetInnerHTML={{
            __html: story.body.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>"),
          }}
        />
      </article>

      {/* Author bio */}
      {author && (
        <div className="max-w-2xl mx-auto px-4 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <Link href={`/author/${story.author_id}`} className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#1A1A2E] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {author.display_name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Written by</p>
                <h3 className="font-semibold text-[#1A1A2E] group-hover:text-[#E94560] transition-colors">
                  {author.display_name}
                </h3>
                {author.bio && <p className="text-sm text-gray-500 mt-1 leading-relaxed">{author.bio}</p>}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
