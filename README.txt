MANAL & VANE - PORTO -> VIGO (PWA)
==================================

PUBLISH (pick one)
  A) Netlify Drop: drag this folder onto https://app.netlify.com/drop -> instant URL
  B) GitHub Pages: push files, Settings > Pages > deploy from branch

INSTALL ON IPHONE
  Open the URL in Safari > Share > Add to Home Screen.
  Visit once with internet so it caches for offline (Oia cliffs have no signal).

SHARED SYNC BETWEEN BOTH PHONES (optional, recommended)
  1. In a Supabase project, run this SQL:
       create table camino_shared (id text primary key, data jsonb);
       alter table camino_shared enable row level security;
       create policy "open" on camino_shared for all using (true) with check (true);
  2. In index.html, near the bottom, paste your values into:
       const SUPA_URL="";   <- your project URL (https://xxxx.supabase.co)
       const SUPA_KEY="";   <- the anon public key
  3. Redeploy. Both phones now share stage progress and the boat booking.
  Note: with the open policy, anyone who has BOTH the app URL and reads the key
  could write to this table. For a two-person trip app this is acceptable;
  keep the app URL private.

SURGICAL GPS (optional)
  Download a GPX of the Camino Portugues da Costa (Gronze / Wikiloc / Buen Camino
  export), then in the app: Etapas > Load GPX. The locate features switch from
  waypoint precision (+-0.5 km) to track precision.

FIXED FACTS BAKED IN
  Flight: Iberia MAD->OPO Sep 30 07:20 - Base: Almada Downtown 101
  Boots on: Oct 2 (editable) - Return: AVE Vigo-Urzaiz -> Madrid, Thu Oct 8, 17:25
