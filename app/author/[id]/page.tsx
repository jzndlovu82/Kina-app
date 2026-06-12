"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAuthorById, getAuthorStories } from "@/lib/supabase";
import { Author, Story } from "@/lib/types";
import StoryCard from "@/components/StoryCard";
import { Globe, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function AuthorPage() {
  const params = useParams();
  const authorId = params.id as string;
  const [author, setAuthor]   = useState<Author | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authorId) {
      Promise.all([getAuthorById(authorId), getAuthorStories(authorId)])
        .then(([a, s]) => { setAuthor(a); setStories(s || []); })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [authorId]);

  if (loading) return <div className="p-12 text-center text-gray-400 animate-pulse">Loading…</div>;
  if (!author) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-[#1A1A2E] mb-2">Author not found</h1>
        <Link href="/" className="text-[#E94560] hover:underline text-sm">← Back to stories</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Author header */}
      <div className="bg-[#1A1A2E] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-[#E94560] flex items-center justify-center text-white font-display font-bold text-3xl flex-shrink-0">
            {author.display_name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">{author.display_name}</h1>
            {author.location && <p className="text-gray-400 text-sm mt-0.5">{author.location}</p>}
            {author.bio && <p className="text-gray-300 mt-3 leading-relaxed max-w-xl text-sm">{author.bio}</p>}
            <div className="flex gap-4 mt-4">
              {author.website && (
                <a href={author.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Globe size={16} />
                </a>
              )}
              {author.instagram && (
                <a href={`https://instagram.com/${author.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={16} />
                </a>
              )}
              {author.twitter && (
                <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold text-[#1A1A2E] mb-6">
          Stories by {author.display_name}
          <span className="text-sm font-normal text-gray-400 ml-2">({stories.length})</span>
        </h2>
        {stories.length === 0 ? (
          <p className="text-gray-400 text-sm">No published stories yet.</p>
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
