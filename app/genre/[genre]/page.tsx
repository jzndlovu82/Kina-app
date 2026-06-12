"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getStoriesByGenre } from "@/lib/supabase";
import { Story } from "@/lib/types";
import StoryCard from "@/components/StoryCard";
import Link from "next/link";

const GENRE_META: Record<string, { name: string; description: string; emoji: string }> = {
  "fiction":        { name: "Fiction",         description: "Short stories, novellas, and narrative fiction",              emoji: "📖" },
  "poetry":         { name: "Poetry",          description: "Poems, spoken word, and lyrical writing",                    emoji: "🌿" },
  "personal-essay": { name: "Personal Essays", description: "Memoirs, personal narratives, and creative non-fiction",     emoji: "✍️" },
  "folklore":       { name: "Folklore",        description: "Traditional tales, myths, and cultural stories",             emoji: "🌍" },
  "flash-fiction":  { name: "Flash Fiction",   description: "Ultra-short fiction under 1,000 words",                     emoji: "⚡" },
  "drama":          { name: "Drama",           description: "Plays, scripts, and dramatic writing",                      emoji: "🎭" },
  "memoir":         { name: "Memoir",          description: "Long-form personal narrative and memory",                   emoji: "🕯️" },
};

export default function GenrePage() {
  const params = useParams();
  const genreSlug = params.genre as string;
  const meta = GENRE_META[genreSlug] || { name: genreSlug, description: "", emoji: "📚" };
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (genreSlug) {
      getStoriesByGenre(genreSlug)
        .then((data) => setStories(data || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [genreSlug]);

  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Genre header */}
      <div className="bg-[#1A1A2E] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors mb-4 block">← All stories</Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{meta.emoji}</span>
            <div>
              <h1 className="font-display text-4xl font-bold">{meta.name}</h1>
              <p className="text-gray-400 mt-1">{meta.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-xl text-[#1A1A2E] mb-2">No {meta.name.toLowerCase()} yet</p>
            <p className="text-gray-400 text-sm mb-6">Be the first to publish in this genre.</p>
            <Link href="/submit" className="bg-[#E94560] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#d13a52] transition-colors">
              Submit a {meta.name} piece
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
