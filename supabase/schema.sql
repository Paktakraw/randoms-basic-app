-- Run this in Supabase SQL Editor (safe to re-run).
-- Each visitor signs in anonymously (Authentication > Sign In / Providers > "Allow anonymous sign-ins")
-- and can only see/change rows they own.

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

-- Owner column: filled automatically with the signed-in user's id.
-- Added as nullable first, because rows created before auth have no owner.
alter table groups add column if not exists user_id uuid default auth.uid() references auth.users(id) on delete cascade;
alter table items  add column if not exists user_id uuid default auth.uid() references auth.users(id) on delete cascade;

-- Old rows (created before auth) have no owner and nobody could see them under the new policies.
-- They are deleted here so the column can be NOT NULL. Items are removed too (cascade).
delete from items  where user_id is null;
delete from groups where user_id is null;

alter table groups alter column user_id set not null;
alter table items  alter column user_id set not null;

create index if not exists items_group_id_idx on items(group_id);
create index if not exists groups_user_id_idx on groups(user_id);
create index if not exists items_user_id_idx on items(user_id);

alter table groups enable row level security;
alter table items enable row level security;

-- Remove the old open-to-everyone policies
drop policy if exists "public access groups" on groups;
drop policy if exists "public access items" on items;
drop policy if exists "owner access groups" on groups;
drop policy if exists "owner access items" on items;

create policy "owner access groups" on groups
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "owner access items" on items
  for all to authenticated
  using (user_id = auth.uid())
  with check (
    user_id = auth.uid()
    and exists (select 1 from groups g where g.id = group_id and g.user_id = auth.uid())
  );
