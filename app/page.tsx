"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import { getPublishedStories, getFeaturedStories, getAllGenres } from "@/lib/supabase";
import { Story, Genre } from "@/lib/types";
import { ArrowRight, Feather } from "lucide-react";

const GENRES = [
  { name: "Fiction",        slug: "fiction",        emoji: "📖" },
  { name: "Poetry",         slug: "poetry",         emoji: "🌿" },
  { name: "Personal Essay", slug: "personal-essay", emoji: "✍️" },
  { name: "Folklore",       slug: "folklore",       emoji: "🌍" },
  { name: "Flash Fiction",  slug: "flash-fiction",  emoji: "⚡" },
  { name: "Drama",          slug: "drama",          emoji: "🎭" },
];

export default function HomePage() {
  const [featured, setFeatured]   = useState<Story[]>([]);
  const [stories, setStories]     = useState<Story[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [feat, all] = await Promise.all([
          getFeaturedStories(3),
          getPublishedStories(12),
        ]);
        setFeatured(feat || []);
        setStories(all || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="bg-[#1A1A2E] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-4">
            An Arkina Studios Platform
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Where Stories
            <span className="text-[#E94560]"> Live.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Kina is a home for powerful writing — fiction, poetry, personal essays, folklore, and more. Read stories worth telling. Share yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#stories"
              className="bg-[#E94560] hover:bg-[#d13a52] text-white font-bold px-8 py-3 rounded-full text-lg transition-colors"
            >
              Read Stories
            </Link>
            <Link
              href="/submit"
              className="border border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors flex items-center gap-2 justify-center"
            >
              <Feather size={18} />
              Submit Your Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── GENRES ── */}
      <section className="bg-white border-b border-gray-100 py-6 px-4 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex gap-3 min-w-max md:min-w-0 md:flex-wrap justify-start md:justify-center">
          {GENRES.map((g) => (
            <Link
              key={g.slug}
              href={`/genre/${g.slug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-[#E94560] hover:text-[#E94560] text-sm font-medium text-gray-600 transition-colors whitespace-nowrap"
            >
              <span>{g.emoji}</span>
              {g.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED ── */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-[#1A1A2E]">Featured Stories</h2>
            <Link href="/?filter=featured" className="text-[#E94560] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((story) => (
              <StoryCard key={story.id} story={story} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* ── ALL STORIES ── */}
      <section id="stories" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-[#1A1A2E]">Latest Stories</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="font-display text-xl mb-2">Stories are coming soon.</p>
            <p className="text-sm mb-6">Be among the first to submit your work.</p>
            <Link href="/submit" className="bg-[#E94560] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#d13a52] transition-colors">
              Submit a Story
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1A1A2E] text-white py-16 px-4 mt-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Have a story to tell?</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Kina is open to writers of all backgrounds. Submit your fiction, poetry, essay, or any form that moves you. Every voice matters here.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-[#E94560] hover:bg-[#d13a52] text-white font-bold px-8 py-3 rounded-full transition-colors text-lg"
          >
            <Feather size={18} />
            Submit Your Story
          </Link>
        </div>
      </section>
    </div>
  );
}
