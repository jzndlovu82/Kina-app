"use client";
import { useEffect, useState } from "react";
import { getPendingStories, updateStoryStatus, toggleFeatured, createClient } from "@/lib/supabase";
import { Story } from "@/lib/types";
import { CheckCircle, XCircle, Star, StarOff, Clock, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [stories, setStories]       = useState<Story[]>([]);
  const [loading, setLoading]       = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [notes, setNotes]           = useState<Record<string, string>>({});
  const [activeStory, setActiveStory] = useState<string | null>(null);

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const role = data?.user?.app_metadata?.role;
      if (role === "admin") {
        setAuthorized(true);
        await loadPending();
      }
      setLoading(false);
    }
    check();
  }, []);

  async function loadPending() {
    const data = await getPendingStories();
    setStories(data || []);
  }

  async function handleApprove(storyId: string) {
    await updateStoryStatus(storyId, "published", notes[storyId]);
    setStories((prev) => prev.filter((s) => s.id !== storyId));
  }

  async function handleReject(storyId: string) {
    await updateStoryStatus(storyId, "rejected", notes[storyId]);
    setStories((prev) => prev.filter((s) => s.id !== storyId));
  }

  if (loading) return <div className="p-8 text-center text-gray-400">Checking access…</div>;

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0EB]">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-[#1A1A2E] mb-2">Access Denied</h1>
          <p className="text-gray-500">Admin access required.</p>
          <Link href="/auth/login" className="text-[#E94560] text-sm mt-4 block hover:underline">Sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0EB] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#1A1A2E]">Review Queue</h1>
            <p className="text-gray-500 text-sm mt-1">{stories.length} pending submission{stories.length !== 1 ? "s" : ""}</p>
          </div>
          <Link href="/" className="text-sm text-[#E94560] hover:underline">← Back to site</Link>
        </div>

        {stories.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
            <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-3" />
            <p className="font-display text-xl text-[#1A1A2E] mb-1">All caught up!</p>
            <p className="text-sm">No pending submissions right now.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {/* Story header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {story.genres && (
                          <span className="text-xs font-bold text-[#E94560] uppercase tracking-wider">
                            {story.genres.name}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={11} /> {story.read_time_minutes} min read
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-[#1A1A2E] leading-tight">
                        {story.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        by <strong>{story.authors?.display_name}</strong> · submitted {new Date(story.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
                      className="text-xs flex items-center gap-1 text-gray-400 hover:text-[#1A1A2E] border border-gray-200 rounded-full px-3 py-1 transition-colors flex-shrink-0"
                    >
                      <Eye size={12} />
                      {activeStory === story.id ? "Hide" : "Read"}
                    </button>
                  </div>

                  {/* Story excerpt or full body */}
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {activeStory === story.id ? (
                      <div className="bg-[#F5F0EB] rounded-xl p-4 mt-2 max-h-80 overflow-y-auto story-body text-sm">
                        {story.body.split("\n").map((p, i) => p ? <p key={i}>{p}</p> : <br key={i} />)}
                      </div>
                    ) : (
                      <p className="line-clamp-2 text-gray-500 italic">{story.excerpt}</p>
                    )}
                  </div>
                </div>

                {/* Reviewer notes + actions */}
                <div className="px-6 pb-6 border-t border-gray-50 pt-4">
                  <textarea
                    value={notes[story.id] || ""}
                    onChange={(e) => setNotes((n) => ({ ...n, [story.id]: e.target.value }))}
                    placeholder="Reviewer notes (optional — sent to author on rejection)"
                    rows={2}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#E94560] resize-none mb-3"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(story.id)}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors"
                    >
                      <CheckCircle size={15} /> Publish
                    </button>
                    <button
                      onClick={() => handleReject(story.id)}
                      className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                    >
                      <XCircle size={15} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
