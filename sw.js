const CACHE = "camino-v32";
const TILE_CACHE = "camino-tiles";   // offline map tiles; persists across app updates, only cleared on demand
const ASSETS = ["./", "./index.html", "./manifest.json", "./config.js", "./icon-192.png", "./icon-512.png", "./icon-180.png"];

self.addEventListener("install", e => {
  // No skipWaiting here: a new version waits until the user taps "Refresh" in the
  // in-app banner (page posts "skip-waiting"), so updates never swap assets mid-use.
  // A first-ever install still activates immediately (nothing is controlling the page yet).
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener("activate", e => {
  // Keep the current app cache AND the downloaded map tiles; drop only stale app caches.
  // Wiping TILE_CACHE on every version bump would throw away the ~30 MB the user
  // deliberately saved for the no-signal cliffs.
  const keep = new Set([CACHE, TILE_CACHE]);
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => !keep.has(k)).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Live data (sync + weather) must never be served from cache: the app has its
// own localStorage fallbacks for offline. Everything else is offline-first.
function isLiveApi(url) {
  return url.hostname.endsWith(".supabase.co") || url.hostname === "api.open-meteo.com";
}
function isMapTile(url) {
  return url.hostname.endsWith(".basemaps.cartocdn.com");
}

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;            // let POST/DELETE (Supabase writes) pass through
  const url = new URL(e.request.url);
  if (isLiveApi(url)) return;                        // network only, no caching

  // Map tiles: cache-first from the persistent tile cache, so a pre-downloaded
  // route renders with zero signal. New tiles fetched while panning online are
  // saved too, growing the offline map for free.
  if (isMapTile(url)) {
    e.respondWith(
      caches.open(TILE_CACHE).then(c => c.match(e.request).then(hit =>
        hit || fetch(e.request).then(res => {
          if (res.ok || res.type === "opaque") c.put(e.request, res.clone()).catch(() => {});
          return res;
        }).catch(() => hit)
      ))
    );
    return;
  }

  // GPX tracks: network-first so replaced/added files are picked up, cache fallback offline
  if (url.pathname.endsWith(".gpx")) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {}); }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // App shell navigations: NETWORK-FIRST. Every online open gets the freshest
  // index.html (so a redeploy shows up immediately, no "one version behind"),
  // and falls back to the cached page only when the network is unreachable.
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(() => {}); }
        return res;
      }).catch(() => caches.match("./index.html").then(hit => hit || caches.match("./")))
    );
    return;
  }

  // Everything else (icons, fonts, Leaflet): cache-first; only cache good responses.
  // On a cache miss that also fails offline, return a clean 504, NOT index.html,
  // which would be parsed as JS/CSS for a missing script or stylesheet.
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {}); }
      return res;
    }).catch(() => new Response("", { status: 504, statusText: "offline" })))
  );
});

self.addEventListener("message", e => {
  // "Refresh" in the update banner: activate this waiting SW now, which fires
  // controllerchange in the page and reloads it into the new version.
  if (e.data === "skip-waiting") self.skipWaiting();
  // Let the page clear downloaded tiles (Settings → free space) without unregistering the SW.
  if (e.data === "clear-tiles") {
    e.waitUntil(caches.delete(TILE_CACHE).then(ok => {
      if (e.source) e.source.postMessage({ tilesCleared: ok });
    }));
  }
});
