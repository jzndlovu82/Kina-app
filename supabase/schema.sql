-- ============================================================
-- KINA — Story Platform
-- Supabase Database Schema
-- Arkina Studios · Arkina Holdings Limited
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── GENRES ─────────────────────────────────────────────────
create table if not exists genres (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default now()
);

-- ─── AUTHORS ────────────────────────────────────────────────
-- Extends Supabase auth.users
create table if not exists authors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade unique,
  display_name text not null,
  bio text,
  avatar_url text,
  website text,
  instagram text,
  twitter text,
  location text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ─── STORIES ────────────────────────────────────────────────
create table if not exists stories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  body text not null,
  excerpt text,                  -- auto-generated or submitted
  cover_image_url text,
  author_id uuid references authors(id) on delete cascade not null,
  genre_id uuid references genres(id),
  status text not null default 'pending'
    check (status in ('draft', 'pending', 'published', 'rejected')),
  featured boolean default false,
  read_time_minutes integer,     -- auto-calculated
  reviewer_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  published_at timestamp with time zone,
  view_count integer default 0
);

-- ─── SEED: DEFAULT GENRES ────────────────────────────────────
insert into genres (name, slug, description) values
  ('Fiction',       'fiction',       'Short stories, novellas, and narrative fiction'),
  ('Poetry',        'poetry',        'Poems, spoken word, and lyrical writing'),
  ('Personal Essay','personal-essay','Memoirs, personal narratives, and creative non-fiction'),
  ('Flash Fiction', 'flash-fiction', 'Ultra-short fiction under 1,000 words'),
  ('Folklore',      'folklore',      'Traditional tales, myths, and cultural stories'),
  ('Drama',         'drama',         'Plays, scripts, and dramatic writing'),
  ('Memoir',        'memoir',        'Long-form personal narrative and memory')
on conflict (slug) do nothing;

-- ─── ROW-LEVEL SECURITY ──────────────────────────────────────
alter table stories enable row level security;
alter table authors enable row level security;
alter table genres  enable row level security;

-- Genres: public read
create policy "Genres are public" on genres
  for select using (true);

-- Stories: anyone can read published
create policy "Published stories are publicly readable" on stories
  for select using (status = 'published');

-- Stories: authors can read their own (all statuses)
create policy "Authors can read own stories" on stories
  for select using (
    auth.uid() = (select user_id from authors where id = author_id)
  );

-- Stories: authors can submit
create policy "Authors can submit stories" on stories
  for insert with check (
    auth.uid() = (select user_id from authors where id = author_id)
  );

-- Stories: authors can update their own drafts
create policy "Authors can update own drafts" on stories
  for update using (
    auth.uid() = (select user_id from authors where id = author_id)
    and status = 'draft'
  );

-- Authors: profiles are public
create policy "Author profiles are public" on authors
  for select using (true);

-- Authors: create own profile
create policy "Users can create own author profile" on authors
  for insert with check (auth.uid() = user_id);

-- Authors: update own profile
create policy "Users can update own author profile" on authors
  for update using (auth.uid() = user_id);

-- ─── ADMIN HELPERS ───────────────────────────────────────────
-- Run this to grant yourself admin rights (replace with your user ID)
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
-- where email = 'info@arkina.store';

-- ─── FUNCTIONS ───────────────────────────────────────────────

-- Auto-generate slug from title
create or replace function generate_slug(title text)
returns text as $$
  select lower(regexp_replace(regexp_replace(trim($1), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
$$ language sql immutable;

-- Auto-calculate read time (avg 200 words/min)
create or replace function calculate_read_time(body text)
returns integer as $$
  select greatest(1, round(array_length(string_to_array(trim($1), ' '), 1)::numeric / 200))::integer;
$$ language sql immutable;

-- Auto-generate excerpt (first 200 chars)
create or replace function generate_excerpt(body text)
returns text as $$
  select case
    when length(trim($1)) <= 200 then trim($1)
    else left(trim($1), 200) || '...'
  end;
$$ language sql immutable;

-- Trigger: auto-populate read_time and excerpt on insert/update
create or replace function stories_auto_fields()
returns trigger as $$
begin
  if new.read_time_minutes is null then
    new.read_time_minutes := calculate_read_time(new.body);
  end if;
  if new.excerpt is null then
    new.excerpt := generate_excerpt(new.body);
  end if;
  if new.slug is null or new.slug = '' then
    new.slug := generate_slug(new.title) || '-' || substr(gen_random_uuid()::text, 1, 6);
  end if;
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

create trigger stories_auto_fields_trigger
  before insert or update on stories
  for each row execute function stories_auto_fields();

-- Trigger: auto-set published_at when status → published
create or replace function stories_set_published_at()
returns trigger as $$
begin
  if new.status = 'published' and old.status != 'published' then
    new.published_at := now();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger stories_published_at_trigger
  before update on stories
  for each row execute function stories_set_published_at();
