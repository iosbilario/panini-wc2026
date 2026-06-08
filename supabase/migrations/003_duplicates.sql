-- ============================================================
-- Migration 003 — Repetidas (troca) + seções especiais + hardening
-- Run this in: Supabase Dashboard → SQL Editor
-- Safe to re-run (idempotent).
-- ============================================================

-- ── New special sections referenced by the catalog ─────────────────────
-- owned/duplicates have a FK to teams(code), so these MUST exist before
-- anyone can mark an Estádios / Coca-Cola sticker.
insert into teams (code, name, grp, total, ord) values
  ('EST', 'Estádios-sede', 'Estádios',  16, 49),
  ('COK', 'Coca-Cola',     'Coca-Cola', 14, 50)
on conflict (code) do update
  set name  = excluded.name,
      grp   = excluded.grp,
      total = excluded.total,
      ord   = excluded.ord;

-- ── Duplicates: repeated stickers a user has available for trade ───────
create table if not exists duplicates (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  team_code  text        not null references teams(code),
  number     int         not null,
  qty        int         not null default 1 check (qty >= 1 and qty <= 99),
  created_at timestamptz not null default now(),
  primary key (user_id, team_code, number)
);

alter table duplicates enable row level security;

drop policy if exists "own dups - select" on duplicates;
create policy "own dups - select"
  on duplicates for select
  using (auth.uid() = user_id);

drop policy if exists "own dups - insert" on duplicates;
create policy "own dups - insert"
  on duplicates for insert
  with check (auth.uid() = user_id);

-- update is needed because the app upserts the quantity
drop policy if exists "own dups - update" on duplicates;
create policy "own dups - update"
  on duplicates for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "own dups - delete" on duplicates;
create policy "own dups - delete"
  on duplicates for delete
  using (auth.uid() = user_id);

create index if not exists duplicates_user_idx on duplicates(user_id);

-- ── Hardening: bound sticker numbers to a sane range ───────────────────
-- Prevents a user from polluting their own rows with absurd numbers.
-- (RLS already prevents touching other users' rows.)
alter table owned      drop constraint if exists owned_number_range;
alter table owned      add  constraint owned_number_range
  check (number >= 1 and number <= 50);

alter table duplicates drop constraint if exists duplicates_number_range;
alter table duplicates add  constraint duplicates_number_range
  check (number >= 1 and number <= 50);
