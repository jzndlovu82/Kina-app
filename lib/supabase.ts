import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ─── STORY QUERIES ───────────────────────────────────────────

export async function getPublishedStories(limit = 20) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*, authors(*), genres(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getFeaturedStories(limit = 3) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*, authors(*), genres(*)")
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getStoryBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*, authors(*), genres(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) throw error;
  return data;
}

export async function getStoriesByGenre(genreSlug: string, limit = 20) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*, authors(*), genres!inner(*)")
    .eq("status", "published")
    .eq("genres.slug", genreSlug)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getAuthorStories(authorId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*, genres(*)")
    .eq("author_id", authorId)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getAuthorById(authorId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", authorId)
    .single();
  if (error) throw error;
  return data;
}

export async function getAllGenres() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("genres")
    .select("*")
    .order("name");
  if (error) throw error;
  return data;
}

export async function searchStories(query: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*, authors(*), genres(*)")
    .eq("status", "published")
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order("published_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data;
}

// ─── ADMIN QUERIES ───────────────────────────────────────────

export async function getPendingStories() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*, authors(*), genres(*)")
    .eq("status", "pending")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function updateStoryStatus(
  storyId: string,
  status: "published" | "rejected",
  reviewerNotes?: string
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("stories")
    .update({ status, reviewer_notes: reviewerNotes ?? null })
    .eq("id", storyId);
  if (error) throw error;
}

export async function toggleFeatured(storyId: string, featured: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from("stories")
    .update({ featured })
    .eq("id", storyId);
  if (error) throw error;
}

// ─── SUBMISSION ──────────────────────────────────────────────

export async function submitStory(payload: {
  title: string;
  body: string;
  genre_id: string;
  author_id: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stories")
    .insert({ ...payload, status: "pending", slug: "" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getOrCreateAuthorProfile(userId: string, displayName: string) {
  const supabase = createClient();
  // Try to get existing profile
  const { data: existing } = await supabase
    .from("authors")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (existing) return existing;
  // Create new profile
  const { data, error } = await supabase
    .from("authors")
    .insert({ user_id: userId, display_name: displayName })
    .select()
    .single();
  if (error) throw error;
  return data;
}
