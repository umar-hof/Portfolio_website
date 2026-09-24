-- ===========================================================================
-- Umar_AI_Devs — lead capture schema
--
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- Safe to re-run: every statement is idempotent.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- Lifecycle of a lead, from first touch to closed deal.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type public.lead_status as enum (
      'new',
      'contacted',
      'qualified',
      'proposal',
      'won',
      'lost'
    );
  end if;
end
$$;

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),

  -- Contact details
  name          text        not null,
  email         text        not null,
  company       text,

  -- What they want built
  project_type  text        not null,
  budget        text,
  timeline      text,
  message       text        not null,

  -- Attribution: utm_* parameters captured from the landing URL
  source        text,
  medium        text,
  campaign      text,
  content       text,
  term          text,
  landing_page  text,
  referrer      text,

  -- Pipeline
  status        public.lead_status not null default 'new',
  created_at    timestamptz not null default now()
);

-- Helpful for triaging the pipeline later.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- The public form only ever needs to INSERT. Enabling RLS with an insert-only
-- policy means that even if the anon key leaked, nobody could read, edit or
-- delete the leads. Only the service role key (kept server-side) can do that.
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists "public can submit a lead" on public.leads;

create policy "public can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Deliberately no SELECT / UPDATE / DELETE policy: those are service-role only.
