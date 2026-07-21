# Graph Report - .  (2026-07-21)

## Corpus Check
- 2 files · ~10,938 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 79 nodes · 88 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.85)
- Token cost: 44,573 input · 0 output

## Community Hubs (Navigation)
- Two-Phone Sync & Boat Booking
- Web App Manifest
- Route Planning & Map
- GPX Track & Positioning
- Live Dashboard, GPS & Weather
- Stage Rendering & Bed Booking
- Journal, Packing & Expenses
- App Shell & Deployment
- Camino Waymark Iconography
- Elevation Profiles
- App Icon Motif
- Service Worker Cache

## God Nodes (most connected - your core abstractions)
1. `render (stage cards, done state, anniversary mark)` - 9 edges
2. `buildTrack (downsample, cumulative km, anchor overnight stops)` - 6 edges
3. `initBoat (boat booking form, persists camino-boat)` - 5 edges
4. `Camino Porto→Vigo Companion PWA (app shell)` - 4 edges
5. `Miño Boat Crossing (Caminha → A Guarda)` - 4 edges
6. `stageDetail (real GPX terrain sampling, waypoint fallback)` - 4 edges
7. `locateOnRoute (GPX track if available, else waypoints)` - 4 edges
8. `Supabase Shared Sync Setup (camino_shared / camino_journal)` - 3 edges
9. `Camino de Santiago Pilgrimage` - 3 edges
10. `WPTS Master Route Waypoints (160.5 km, km/lat/lon/alt/sleep/poi)` - 3 edges

## Surprising Connections (you probably didn't know these)
- `updateCountdown (days to flight / walk-day pill)` --references--> `Fixed Trip Facts (flight, base, boots-on, return train)`  [INFERRED]
  index.html → README.txt
- `App Icon (512px) - Camino Waymark` --conceptually_related_to--> `Camino de Santiago Pilgrimage`  [INFERRED]
  icon-512.png → icon-192.png
- `Deployment Guide (Netlify Drop / GitHub Pages)` --references--> `Camino Porto→Vigo Companion PWA (app shell)`  [EXTRACTED]
  README.txt → index.html
- `iPhone PWA Install & Offline Caching` --conceptually_related_to--> `Camino Porto→Vigo Companion PWA (app shell)`  [EXTRACTED]
  README.txt → index.html
- `pullJournal (merge remote camino_journal rows by id)` --implements--> `Supabase Shared Sync Setup (camino_shared / camino_journal)`  [EXTRACTED]
  index.html → README.txt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Booking.com deep-link generation with prefilled stage dates** — index_bookingurl, index_bedlink, index_bookall, index_stageisoplus, index_render [INFERRED 0.85]
- **Live hiking dashboard: climb-left, ETA and measured pace** — index_remainingupdown, index_notepace, index_livepace, index_setbigstats [INFERRED 0.85]

## Communities (13 total, 1 thin omitted)

### Community 0 - "Two-Phone Sync & Boat Booking"
Cohesion: 0.21
Nodes (12): collectShared (harvest camino-done-* + boat booking), ferryHTML (ferry aside card with booking state), initBoat (boat booking form, persists camino-boat), mergeShared (union done sets, last-write-wins boat), Miño Boat Crossing (Caminha → A Guarda), pullJournal (merge remote camino_journal rows by id), pullShared (Supabase REST GET camino_shared), pushShared (Supabase REST upsert camino_shared) (+4 more)

### Community 1 - "Web App Manifest"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, id, name, scope, short_name (+2 more)

### Community 2 - "Route Planning & Map"
Cohesion: 0.22
Nodes (9): buildStages (derive stages from chosen overnight stops), drawRoute (route polyline from GPX or waypoints + boat leg), initMap (Leaflet dark map with locate control, SVG fallback), Ten-Year Anniversary Arrival (Oct 8, 2026), locateOnWaypoints (segment projection fallback), PLANS Stage Presets + Custom Stop Picker, projSeg (point-to-segment projection in lat/lon space), renderPlans (plan chips, totals, late-arrival warning) (+1 more)

### Community 3 - "GPX Track & Positioning"
Cohesion: 0.36
Nodes (8): autoLoadBundled (fetch track.gpx / track1..9.gpx and stitch), buildTrack (downsample, cumulative km, anchor overnight stops), hav (haversine distance), loadGpxFile (manual GPX load from Files app), locateOnRoute (GPX track if available, else waypoints), locateOnTrack (nearest GPX point → route km + altitude), parseGpxText (trkpt/rtept extraction), Surgical GPS / Bundled GPX Track Setup

### Community 4 - "Live Dashboard, GPS & Weather"
Cohesion: 0.25
Nodes (8): livePace (measured speed over last 20 min), loadWeather (Open-Meteo 2-day forecast per stage, cached), notePace (record GPS fix into pace buffer), openToday (auto-open today's stage on boot), remainingUpDown (remaining ascent/descent from km), setBigStats (live dashboard stat tiles), showGps ('Where are we?' locate-and-open-stage flow), sunsetLabel (analytic sunset approximation, PT/ES timezone aware)

### Community 5 - "Stage Rendering & Bed Booking"
Cohesion: 0.48
Nodes (7): bedLink (per-bed book/info link), bookAll (all-beds-in-town booking link), bookingUrl (Booking.com deep-link builder), render (stage cards, done state, anniversary mark), stageISOPlus (stage date + N days ISO), store (localStorage JSON wrapper), updateProgress (walked km bar, stage ticks, finish state)

### Community 6 - "Journal, Packing & Expenses"
Cohesion: 0.40
Nodes (5): buildPacking (checklist grid with per-category progress), Costa Brava Packing/Budget/Expenses/Journal System (reused), initJournal (modal, photo resize to 800px JPEG, save), pushJournalEntry (Supabase upsert single memory), renderJournal (memory grid with photos)

### Community 7 - "App Shell & Deployment"
Cohesion: 0.40
Nodes (5): Camino Porto→Vigo Companion PWA (app shell), Bilingual Phrasebook (PT/Galego phrases + Web Speech playback), config.js Credential Separation Convention, Deployment Guide (Netlify Drop / GitHub Pages), iPhone PWA Install & Offline Caching

### Community 8 - "Camino Waymark Iconography"
Cohesion: 0.67
Nodes (4): Camino de Santiago Pilgrimage, Camino Yellow Arrow Waymarker, App Icon 192px (Yellow Camino Arrow), App Icon (512px) - Camino Waymark

### Community 9 - "Elevation Profiles"
Cohesion: 0.67
Nodes (4): bigProfileSVG (big live elevation ribbon), profileSVG (mini elevation profile), smoothPath (Catmull-Rom-style SVG smoothing), stageDetail (real GPX terrain sampling, waypoint fallback)

### Community 10 - "App Icon Motif"
Cohesion: 1.00
Nodes (3): Caminho in October App, App Icon (180px) - Yellow Arrow Waymark, Yellow Arrow (Camino de Santiago Waymark Motif)

## Knowledge Gaps
- **23 isolated node(s):** `ASSETS`, `Deployment Guide (Netlify Drop / GitHub Pages)`, `iPhone PWA Install & Offline Caching`, `App Icon (512px) - Camino Waymark`, `projSeg (point-to-segment projection in lat/lon space)` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `render (stage cards, done state, anniversary mark)` connect `Stage Rendering & Bed Booking` to `Two-Phone Sync & Boat Booking`, `Elevation Profiles`, `Route Planning & Map`?**
  _High betweenness centrality (0.273) - this node is a cross-community bridge._
- **Why does `stageDetail (real GPX terrain sampling, waypoint fallback)` connect `Elevation Profiles` to `GPX Track & Positioning`, `Live Dashboard, GPS & Weather`?**
  _High betweenness centrality (0.218) - this node is a cross-community bridge._
- **Why does `profileSVG (mini elevation profile)` connect `Elevation Profiles` to `Stage Rendering & Bed Booking`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **What connects `ASSETS`, `Deployment Guide (Netlify Drop / GitHub Pages)`, `iPhone PWA Install & Offline Caching` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._