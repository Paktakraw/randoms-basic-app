-- Run this in Supabase SQL Editor
create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create index if not exists items_group_id_idx on items(group_id);

-- No auth in this version: allow anonymous access.
-- Tighten these policies if you add login later.
alter table groups enable row level security;
alter table items enable row level security;

create policy "public access groups" on groups for all using (true) with check (true);
create policy "public access items" on items for all using (true) with check (true);
