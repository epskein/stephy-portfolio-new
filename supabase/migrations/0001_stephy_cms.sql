-- ============================================================================
-- Stephy Longueira portfolio CMS  ·  lives in the shared "Central" Supabase.
-- Namespaced with a stephy_ prefix in the public schema so it never collides
-- with the Central app's own tables and needs no PostgREST config change.
-- RLS is on from day one: anyone may READ (the content is public anyway),
-- only the two allow-listed editors may WRITE.
-- Idempotent — safe to re-run.
-- ============================================================================

-- Who is allowed to edit. Email comes from the signed-in user's JWT.
create or replace function public.stephy_is_editor()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() ->> 'email') in (
      'stephylongueira@gmail.com',
      'epskein.es@gmail.com'
    ),
    false
  );
$$;

-- ---------------------------------------------------------------- shows -----
create table if not exists public.stephy_shows (
  id          uuid primary key default gen_random_uuid(),
  venue       text not null,
  start_date  date not null,
  end_date    date,
  location    text not null default '',
  flag        text not null default '🇿🇦',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- --------------------------------------------------------------- gallery ----
create table if not exists public.stephy_gallery (
  id               uuid primary key default gen_random_uuid(),
  storage_path     text not null,
  category         text not null default 'live',   -- 'live' | 'portraits'
  featured_on_home boolean not null default false,
  sort_order       int  not null default 0,
  width            int,
  height           int,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ----------------------------------------------------------------- music ----
create table if not exists public.stephy_music (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  release_type  text not null default 'Single',    -- Single | EP | Album | Remix | Mix
  year          text,
  cover_path    text,
  link          text,
  sort_order    int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- --------------------------------------------------------------- socials ----
create table if not exists public.stephy_socials (
  id          uuid primary key default gen_random_uuid(),
  platform    text not null,
  url         text not null,
  handle      text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- --------------------------------------------------------------- venues -----
create table if not exists public.stephy_venues (
  id          uuid primary key default gen_random_uuid(),
  name        text not null default '',
  logo_path   text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------- about -----
-- Single row (id = 1).
create table if not exists public.stephy_about (
  id                int primary key default 1,
  profile_path      text,
  bio               jsonb not null default '[]'::jsonb,   -- string[]
  stats             jsonb not null default '[]'::jsonb,   -- {value,label}[]
  journey           jsonb not null default '[]'::jsonb,   -- {year,title,description}[]
  style_description text,
  genres            jsonb not null default '[]'::jsonb,   -- string[]
  updated_at        timestamptz not null default now(),
  constraint stephy_about_singleton check (id = 1)
);

-- ----------------------------------------------------------- page text ------
-- Editable headings / copy across pages, keyed by (page, slot).
create table if not exists public.stephy_text (
  id          uuid primary key default gen_random_uuid(),
  page        text not null,           -- home | about | gallery | music | venues | contact | global
  slot        text not null,           -- e.g. hero_kicker, gallery_subtitle
  value       text not null default '',
  label       text,                    -- human label shown in the admin
  multiline   boolean not null default false,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now(),
  unique (page, slot)
);

-- ============================================================ RLS ============
alter table public.stephy_shows   enable row level security;
alter table public.stephy_gallery enable row level security;
alter table public.stephy_music   enable row level security;
alter table public.stephy_socials enable row level security;
alter table public.stephy_venues  enable row level security;
alter table public.stephy_about   enable row level security;
alter table public.stephy_text    enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'stephy_shows','stephy_gallery','stephy_music','stephy_socials',
    'stephy_venues','stephy_about','stephy_text'
  ]
  loop
    execute format('drop policy if exists %I on public.%I', t||'_read', t);
    execute format('drop policy if exists %I on public.%I', t||'_write', t);
    -- public read
    execute format(
      'create policy %I on public.%I for select using (true)', t||'_read', t);
    -- editor-only write (insert/update/delete)
    execute format(
      'create policy %I on public.%I for all using (public.stephy_is_editor()) with check (public.stephy_is_editor())',
      t||'_write', t);
  end loop;
end $$;

-- ======================================================== storage ===========
insert into storage.buckets (id, name, public)
values ('stephy-media', 'stephy-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists stephy_media_read   on storage.objects;
drop policy if exists stephy_media_insert on storage.objects;
drop policy if exists stephy_media_update on storage.objects;
drop policy if exists stephy_media_delete on storage.objects;

create policy stephy_media_read on storage.objects
  for select using (bucket_id = 'stephy-media');
create policy stephy_media_insert on storage.objects
  for insert with check (bucket_id = 'stephy-media' and public.stephy_is_editor());
create policy stephy_media_update on storage.objects
  for update using (bucket_id = 'stephy-media' and public.stephy_is_editor());
create policy stephy_media_delete on storage.objects
  for delete using (bucket_id = 'stephy-media' and public.stephy_is_editor());

-- Seed the About singleton so there is always exactly one row to edit.
insert into public.stephy_about (id) values (1) on conflict (id) do nothing;
