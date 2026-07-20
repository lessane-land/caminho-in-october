# Graph Report - .  (2026-07-20)

## Corpus Check
- Corpus is ~10,436 words - fits in a single context window. You may not need a graph.

## Summary
- 70 nodes · 75 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.86)
- Token cost: 178,430 input · 0 output

## Community Hubs (Navigation)
- Two-Phone Sync & Boat Booking
- Web App Manifest
- GPX Track & Leaflet Map
- Elevation Profiles & Stage Rendering
- Route Planning & Stage Presets
- GPS Location & Weather
- Journal, Packing & Expenses
- App Shell & Deployment
- Camino Waymark Iconography
- App Icon Motif
- Service Worker Cache

## God Nodes (most connected - your core abstractions)
1. `buildTrack (downsample, cumulative km, anchor overnight stops)` - 6 edges
2. `render (stage cards, done state, anniversary mark)` - 5 edges
3. `initBoat (boat booking form, persists camino-boat)` - 5 edges
4. `Camino Porto→Vigo Companion PWA (app shell)` - 4 edges
5. `Miño Boat Crossing (Caminha → A Guarda)` - 4 edges
6. `locateOnRoute (GPX track if available, else waypoints)` - 4 edges
7. `Supabase Shared Sync Setup (camino_shared / camino_journal)` - 3 edges
8. `WPTS Master Route Waypoints (160.5 km, km/lat/lon/alt/sleep/poi)` - 3 edges
9. `profileSVG (mini elevation profile)` - 3 edges
10. `stageDetail (real GPX terrain sampling, waypoint fallback)` - 3 edges

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
- **GPX Track Pipeline (load → parse → build → consume via camino-gpx)** — index_autoloadbundled, index_loadgpxfile, index_parsegpxtext, index_buildtrack, index_stagedetail, index_locateontrack, index_drawroute [EXTRACTED 1.00]
- **Two-Phone Supabase Sync (progress, boat booking, journal)** — readme_supabase_sync_setup, index_collectshared, index_mergeshared, index_pullshared, index_pushshared, index_pulljournal, index_pushjournalentry [EXTRACTED 1.00]
- **Dynamic Stage Planning System (presets/custom stops rebuild every card)** — index_plans, index_buildstages, index_wpts, index_render, index_updateprogress [EXTRACTED 1.00]

## Communities (12 total, 1 thin omitted)

### Community 0 - "Two-Phone Sync & Boat Booking"
Cohesion: 0.21
Nodes (12): collectShared (harvest camino-done-* + boat booking), ferryHTML (ferry aside card with booking state), initBoat (boat booking form, persists camino-boat), mergeShared (union done sets, last-write-wins boat), Miño Boat Crossing (Caminha → A Guarda), pullJournal (merge remote camino_journal rows by id), pullShared (Supabase REST GET camino_shared), pushShared (Supabase REST upsert camino_shared) (+4 more)

### Community 1 - "Web App Manifest"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, scope, short_name, start_url (+1 more)

### Community 2 - "GPX Track & Leaflet Map"
Cohesion: 0.38
Nodes (7): autoLoadBundled (fetch track.gpx / track1..9.gpx and stitch), buildTrack (downsample, cumulative km, anchor overnight stops), drawRoute (route polyline from GPX or waypoints + boat leg), initMap (Leaflet dark map with locate control, SVG fallback), loadGpxFile (manual GPX load from Files app), parseGpxText (trkpt/rtept extraction), Surgical GPS / Bundled GPX Track Setup

### Community 3 - "Elevation Profiles & Stage Rendering"
Cohesion: 0.38
Nodes (7): bigProfileSVG (big live elevation ribbon), profileSVG (mini elevation profile), render (stage cards, done state, anniversary mark), smoothPath (Catmull-Rom-style SVG smoothing), stageDetail (real GPX terrain sampling, waypoint fallback), store (localStorage JSON wrapper), updateProgress (walked km bar, stage ticks, finish state)

### Community 4 - "Route Planning & Stage Presets"
Cohesion: 0.29
Nodes (7): buildStages (derive stages from chosen overnight stops), Ten-Year Anniversary Arrival (Oct 8, 2026), locateOnWaypoints (segment projection fallback), PLANS Stage Presets + Custom Stop Picker, projSeg (point-to-segment projection in lat/lon space), renderPlans (plan chips, totals, late-arrival warning), WPTS Master Route Waypoints (160.5 km, km/lat/lon/alt/sleep/poi)

### Community 5 - "GPS Location & Weather"
Cohesion: 0.29
Nodes (7): hav (haversine distance), loadWeather (Open-Meteo 2-day forecast per stage, cached), locateOnRoute (GPX track if available, else waypoints), locateOnTrack (nearest GPX point → route km + altitude), openToday (auto-open today's stage on boot), showGps ('Where are we?' locate-and-open-stage flow), sunsetLabel (analytic sunset approximation, PT/ES timezone aware)

### Community 6 - "Journal, Packing & Expenses"
Cohesion: 0.40
Nodes (5): buildPacking (checklist grid with per-category progress), Costa Brava Packing/Budget/Expenses/Journal System (reused), initJournal (modal, photo resize to 800px JPEG, save), pushJournalEntry (Supabase upsert single memory), renderJournal (memory grid with photos)

### Community 7 - "App Shell & Deployment"
Cohesion: 0.40
Nodes (5): Camino Porto→Vigo Companion PWA (app shell), Bilingual Phrasebook (PT/Galego phrases + Web Speech playback), config.js Credential Separation Convention, Deployment Guide (Netlify Drop / GitHub Pages), iPhone PWA Install & Offline Caching

### Community 8 - "Camino Waymark Iconography"
Cohesion: 0.67
Nodes (4): Camino de Santiago Pilgrimage, Camino Yellow Arrow Waymarker, App Icon 192px (Yellow Camino Arrow), App Icon (512px) - Camino Waymark

### Community 9 - "App Icon Motif"
Cohesion: 1.00
Nodes (3): Caminho in October App, App Icon (180px) - Yellow Arrow Waymark, Yellow Arrow (Camino de Santiago Waymark Motif)

## Knowledge Gaps
- **21 isolated node(s):** `name`, `short_name`, `description`, `start_url`, `scope` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `render (stage cards, done state, anniversary mark)` connect `Elevation Profiles & Stage Rendering` to `Two-Phone Sync & Boat Booking`, `Route Planning & Stage Presets`?**
  _High betweenness centrality (0.229) - this node is a cross-community bridge._
- **Why does `buildTrack (downsample, cumulative km, anchor overnight stops)` connect `GPX Track & Leaflet Map` to `Elevation Profiles & Stage Rendering`, `GPS Location & Weather`?**
  _High betweenness centrality (0.201) - this node is a cross-community bridge._
- **Why does `collectShared (harvest camino-done-* + boat booking)` connect `Two-Phone Sync & Boat Booking` to `Elevation Profiles & Stage Rendering`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **What connects `name`, `short_name`, `description` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._