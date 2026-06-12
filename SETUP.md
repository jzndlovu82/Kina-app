# Kina — Setup Guide

## Step 1: Supabase Database

1. Go to your Supabase project → **SQL Editor**
2. Open and paste the contents of `supabase/schema.sql`
3. Click **Run** — this creates all tables, policies, and seed data

## Step 2: Set Your Environment Variables

1. Copy `.env.local.example` → `.env.local`
2. Fill in your Supabase values (find them in Supabase → Settings → API):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Install & Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Step 4: Make Yourself Admin

After signing up at /auth/signup, go to Supabase → SQL Editor and run:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
where email = 'info@arkina.store';
```

Then visit http://localhost:3000/admin to access the review queue.

## Step 5: Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Add your environment variables in Vercel's dashboard
4. Deploy — Vercel handles everything automatically

## Pages

| URL | Description |
|-----|-------------|
| `/` | Home — story feed |
| `/stories/[slug]` | Story reader |
| `/genre/[genre]` | Browse by genre |
| `/submit` | Story submission form |
| `/author/[id]` | Author profile |
| `/about` | About Kina |
| `/admin` | Review queue (admin only) |
| `/auth/login` | Sign in |
| `/auth/signup` | Create account |
