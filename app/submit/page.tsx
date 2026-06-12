"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createClient, getAllGenres, submitStory, getOrCreateAuthorProfile } from "@/lib/supabase";
import { Genre } from "@/lib/types";
import { Feather, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  title: string;
  body: string;
  genre_id: string;
  display_name: string;
  bio: string;
}

export default function SubmitPage() {
  const [genres, setGenres]       = useState<Genre[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [user, setUser]           = useState<any>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const bodyText = watch("body", "");
  const wordCount = bodyText.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  useEffect(() => {
    getAllGenres().then(setGenres).catch(console.error);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      let authorId: string;

      if (user) {
        const profile = await getOrCreateAuthorProfile(user.id, data.display_name);
        authorId = profile.id;
      } else {
        setError("Please create an account to submit your story. It only takes a minute!");
        setLoading(false);
        return;
      }

      await submitStory({
        title: data.title,
        body: data.body,
        genre_id: data.genre_id,
        author_id: authorId,
      });

      setSubmitted(true);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-[#C9A84C] mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-white mb-3">Story Submitted!</h1>
          <p className="text-[#888888] leading-relaxed mb-8">
            Thank you for sharing your work with Kina. We'll review your submission and you'll hear back from us within a few days.
          </p>
          <a href="/" className="bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] px-6 py-2 rounded-full font-bold transition-colors inline-block tracking-wide">
            Back to Stories
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-14 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#C9A84C]/15 border border-[#C9A84C]/30 rounded-full mb-4">
            <Feather className="text-[#C9A84C]" size={22} />
          </div>
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Your Voice</p>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Submit Your Story</h1>
          <p className="text-[#888888] max-w-md mx-auto">
            Kina welcomes all genres and voices. We read every submission carefully.
          </p>
        </div>

        {!user && (
          <div className="bg-[#1C1C1C] border border-[#C9A84C]/20 rounded-xl p-4 mb-6 text-sm text-[#888888] text-center">
            <a href="/auth/signup" className="font-semibold text-[#C9A84C] hover:text-[#E5C97A] transition-colors">Create a free account</a> or{" "}
            <a href="/auth/login" className="font-semibold text-[#C9A84C] hover:text-[#E5C97A] transition-colors">sign in</a> to submit your story.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Author name */}
          <div>
            <label className="block text-sm font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider text-xs">Your Name *</label>
            <input
              {...register("display_name", { required: "Name is required" })}
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#141414] text-white placeholder-[#444444]"
              placeholder="The name that will appear on Kina"
            />
            {errors.display_name && <p className="text-red-400 text-xs mt-1">{errors.display_name.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider text-xs">Story Title *</label>
            <input
              {...register("title", { required: "Title is required", maxLength: { value: 120, message: "Title must be under 120 characters" } })}
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#141414] text-white placeholder-[#444444] font-display text-lg"
              placeholder="Give your story a title"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider text-xs">Genre *</label>
            <select
              {...register("genre_id", { required: "Please select a genre" })}
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#141414] text-[#888888]"
            >
              <option value="">Select a genre…</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            {errors.genre_id && <p className="text-red-400 text-xs mt-1">{errors.genre_id.message}</p>}
          </div>

          {/* Story body */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">Your Story *</label>
              <span className="text-xs text-[#555555]">{wordCount} words · ~{readTime} min read</span>
            </div>
            <textarea
              {...register("body", {
                required: "Story content is required",
                minLength: { value: 50, message: "Story must be at least 50 words" },
              })}
              rows={18}
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#141414] text-white placeholder-[#444444] font-display leading-loose resize-none"
              placeholder="Begin your story here…"
            />
            {errors.body && <p className="text-red-400 text-xs mt-1">{errors.body.message}</p>}
          </div>

          {/* Author bio */}
          <div>
            <label className="block text-xs font-semibold text-[#C9A84C] mb-2 uppercase tracking-wider">Short Bio <span className="font-normal text-[#555555] normal-case">(optional)</span></label>
            <textarea
              {...register("bio")}
              rows={3}
              className="w-full border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] bg-[#141414] text-white placeholder-[#444444] resize-none"
              placeholder="A sentence or two about you — who you are, where you're from…"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-sm text-red-400">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-bold py-4 rounded-xl transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed tracking-wide"
          >
            {loading ? "Submitting…" : "Submit Story for Review"}
          </button>

          <p className="text-xs text-center text-[#444444]">
            By submitting, you confirm this is your original work. Kina reviews all submissions before publishing.
          </p>
        </form>
      </div>
    </div>
  );
}
