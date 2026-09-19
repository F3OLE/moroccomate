-- Allow form submissions with the publishable / anon key (insert only, no public reads)

drop policy if exists "Anyone can submit a lead" on public.leads;

create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
