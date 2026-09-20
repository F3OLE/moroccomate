-- Optional: allow anon inserts if you are not using SUPABASE_SERVICE_ROLE_KEY
-- Run only if booking leads fail with RLS errors when using the anon key.

create policy "Anyone can submit a booking lead"
  on public.booking_leads for insert
  to anon, authenticated
  with check (true);
