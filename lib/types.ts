// ─── KINA TYPE DEFINITIONS ───────────────────────────────────

export type StoryStatus = "draft" | "pending" | "published" | "rejected";

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export interface Author {
  id: string;
  user_id: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  website: string | null;
  instagram: string | null;
  twitter: string | null;
  location: string | null;
  created_at: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author_id: string;
  genre_id: string | null;
  status: StoryStatus;
  featured: boolean;
  read_time_minutes: number | null;
  reviewer_notes: string | null;
  created_at: string;
  published_at: string | null;
  view_count: number;
  // Joined
  authors?: Author;
  genres?: Genre;
}

export interface StorySubmission {
  title: string;
  body: string;
  genre_id: string;
  cover_image_url?: string;
}
