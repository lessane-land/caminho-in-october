const CACHE = "camino-v21";
const ASSETS = ["./", "./index.html", "./manifest.json", "./config.js", "./icon-192.png", "./icon-512.png", "./icon-180.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Live data (sync + weather) must never be served from cache: the app has its
// own localStorage fallbacks for offline. Everything else is offline-first.
function isLiveApi(url) {
  return url.hostname.endsWith(".supabase.co") || url.hostname === "api.open-meteo.com";
}

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;            // let POST/DELETE (Supabase writes) pass through
  const url = new URL(e.request.url);
  if (isLiveApi(url)) return;                        // network only, no caching

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

  // App shell navigations: serve cached instantly, refresh cache in the background
  // so the next open gets a new index.html without needing a cache-version bump
  if (e.request.mode === "navigate") {
    e.respondWith(
      caches.match("./index.html").then(hit => {
        const net = fetch(e.request).then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(() => {}); }
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // Everything else (icons, fonts, Leaflet, map tiles): cache-first; only cache good responses
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {}); }
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
