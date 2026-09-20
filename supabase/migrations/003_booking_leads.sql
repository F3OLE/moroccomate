-- Booking / WhatsApp leads from travelers requesting a partner spot
-- Run in Supabase Dashboard → SQL Editor

create table if not exists public.booking_leads (
  id uuid primary key default gen_random_uuid(),
  place_id text,
  place_name text not null,
  city text,
  traveler_name text,
  traveler_phone text,
  traveler_email text,
  preferred_date text,
  message text,
  channel text not null default 'whatsapp',
  created_at timestamptz not null default now()
);

create index if not exists booking_leads_created_at_idx
  on public.booking_leads (created_at desc);
create index if not exists booking_leads_place_id_idx
  on public.booking_leads (place_id);

alter table public.booking_leads enable row level security;

-- Inserts go through the Next.js API with the service role key.
-- Optional anon insert (only if you skip service role):
-- create policy "Anyone can submit a booking lead"
--   on public.booking_leads for insert
--   to anon
--   with check (true);
