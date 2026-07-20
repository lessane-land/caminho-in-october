MANAL & VANE - PORTO -> VIGO (PWA)
==================================

PUBLISH (pick one)
  A) Netlify Drop: drag this folder onto https://app.netlify.com/drop -> instant URL
  B) GitHub Pages: push files, Settings > Pages > deploy from branch

INSTALL ON IPHONE
  Open the URL in Safari > Share > Add to Home Screen.
  Visit once with internet so it caches for offline (Oia cliffs have no signal).

SHARED SYNC BETWEEN BOTH PHONES (optional, recommended)
  1. In a Supabase project, run this SQL (both tables):
       create table camino_shared (id text primary key, data jsonb);
       alter table camino_shared enable row level security;
       create policy "open" on camino_shared for all using (true) with check (true);
       create table camino_journal (id text primary key, data jsonb);
       alter table camino_journal enable row level security;
       create policy "open_j" on camino_journal for all using (true) with check (true);
     (If camino_shared already exists, just run the camino_journal lines.)
  2. Open config.js and paste your values:
       window.SUPA_URL = "";   <- your project URL (https://xxxx.supabase.co)
       window.SUPA_KEY = "";   <- the anon public key
     config.js is read by the app and is NOT touched by app updates:
     when a new version of the app arrives, replace index.html and sw.js
     but KEEP your config.js.
  3. Redeploy. Both phones now share stage progress and the boat booking.
  Note: with the open policy, anyone who has BOTH the app URL and reads the key
  could write to this table. For a two-person trip app this is acceptable;
  keep the app URL private.

SURGICAL GPS (optional) - two ways
  EASY WAY (recommended): download the GPX file(s) and drop them into THIS
  folder next to index.html, then redeploy:
    - one full-route file: name it        track.gpx
    - or stage files (e.g. Wikiloc 1..7): name them track1.gpx, track2.gpx, ...
      in walking order; the app stitches them together automatically.
  On next open with internet, BOTH phones pick the track up automatically.
  The chip in Etapas will read "Track: GPX".
  MANUAL WAY: Etapas > Load GPX and pick a file from the Files app
  (per phone).

FIXED FACTS BAKED IN
  Flight: Iberia MAD->OPO Sep 30 07:20 - Base: Almada Downtown 101
  Boots on: Oct 2 (editable) - Return: AVE Vigo-Urzaiz -> Madrid, Thu Oct 8, 17:25
