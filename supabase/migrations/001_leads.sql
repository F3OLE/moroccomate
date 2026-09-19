-- MoroccoMate lead capture (early access + business partners)
-- Run this in Supabase Dashboard → SQL Editor → New query → Run

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('early-access', 'partner')),
  name text,
  email text not null,
  phone text,
  city text,
  business_name text,
  business_type text,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists leads_type_idx on public.leads (type);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

-- No public policies: inserts go through the Next.js API with the service role key.
-- Optional: allow anon insert if you ever post from the browser directly:
-- create policy "Anyone can submit a lead"
--   on public.leads for insert
--   to anon
--   with check (true);
