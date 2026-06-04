-- ============================================================
-- Migration 001 — Schema + RLS
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Teams catalog (static, public)
create table if not exists teams (
  code  text primary key,
  name  text not null,
  grp   text not null,      -- 'Especiais' | 'A'–'L'
  total int  not null default 20,
  ord   int  not null        -- display order
);

-- Owned stickers (one row per sticker the user has)
create table if not exists owned (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  team_code  text        not null references teams(code),
  number     int         not null,
  created_at timestamptz not null default now(),
  primary key (user_id, team_code, number)
);

-- ── Row Level Security ─────────────────────────────────────────────────

alter table owned enable row level security;

create policy "own rows - select"
  on owned for select
  using (auth.uid() = user_id);

create policy "own rows - insert"
  on owned for insert
  with check (auth.uid() = user_id);

create policy "own rows - delete"
  on owned for delete
  using (auth.uid() = user_id);

-- teams is public read-only
alter table teams enable row level security;

create policy "teams read"
  on teams for select
  using (true);

-- ── Index for fast per-user queries ────────────────────────────────────
create index if not exists owned_user_idx on owned(user_id);
