"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import { getPublishedStories, getFeaturedStories } from "@/lib/supabase";
import { Story } from "@/lib/types";
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
  const [featured, setFeatured] = useState<Story[]>([]);
  const [stories, setStories]   = useState<Story[]>([]);
  const [loading, setLoading]   = useState(true);

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
    <div className="bg-[#0D0D0D]">
      {/* ── HERO ── */}
      <section className="relative bg-[#0D0D0D] text-white py-24 px-4 overflow-hidden">
        {/* Subtle gold radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)"
        }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em] mb-6">
            An Arkina Studios Platform
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Where Stories
            <span className="text-[#C9A84C]"> Live.</span>
          </h1>
          <div className="gold-line max-w-xs mx-auto mb-8" />
          <p className="text-[#888888] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Kina is a home for powerful writing — fiction, poetry, personal essays, folklore, and more. Read stories worth telling. Share yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#stories"
              className="bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-bold px-8 py-3 rounded-full text-lg transition-colors tracking-wide"
            >
              Read Stories
            </Link>
            <Link
              href="/submit"
              className="border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#C9A84C] hover:text-[#E5C97A] font-semibold px-8 py-3 rounded-full text-lg transition-colors flex items-center gap-2 justify-center"
            >
              <Feather size={18} />
              Submit Your Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── GENRES ── */}
      <section className="border-y border-[#C9A84C]/15 py-6 px-4 overflow-x-auto bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto flex gap-3 min-w-max md:min-w-0 md:flex-wrap justify-start md:justify-center">
          {GENRES.map((g) => (
            <Link
              key={g.slug}
              href={`/genre/${g.slug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#444444] hover:border-[#C9A84C] hover:text-[#C9A84C] text-sm font-medium text-[#888888] transition-colors whitespace-nowrap"
            >
              <span>{g.emoji}</span>
              {g.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED ── */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Featured Stories</h2>
              <div className="gold-line mt-2 w-16" style={{ background: "linear-gradient(to right, #C9A84C, transparent)", opacity: 0.6 }} />
            </div>
            <Link href="/?filter=featured" className="text-[#C9A84C] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all hover:text-[#E5C97A]">
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
      <section id="stories" className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Latest Stories</h2>
            <div className="gold-line mt-2 w-16" style={{ background: "linear-gradient(to right, #C9A84C, transparent)", opacity: 0.6 }} />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#141414] rounded-xl h-64 animate-pulse border border-[#C9A84C]/10" />
            ))}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-24 text-[#888888]">
            <p className="font-display text-xl mb-2 text-white">Stories are coming soon.</p>
            <p className="text-sm mb-8 text-[#888888]">Be among the first to submit your work.</p>
            <Link href="/submit" className="bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] px-6 py-2 rounded-full font-bold text-sm transition-colors tracking-wide">
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
      <section className="relative py-20 px-4 mt-4 overflow-hidden" style={{ background: "#111111" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 70%)"
        }} />
        <div className="gold-line mb-0" />
        <div className="max-w-2xl mx-auto text-center relative z-10 pt-16 pb-4">
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Your Voice Matters
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 text-white">Have a story to tell?</h2>
          <p className="text-[#888888] mb-10 leading-relaxed">
            Kina is open to writers of all backgrounds. Submit your fiction, poetry, essay, or any form that moves you. Every voice matters here.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-bold px-8 py-3 rounded-full transition-colors text-lg tracking-wide"
          >
            <Feather size={18} />
            Submit Your Story
          </Link>
        </div>
      </section>
    </div>
  );
}
