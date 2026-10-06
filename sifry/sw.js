/*
  Service worker pro Tajné písmo. Stránku bere nejdřív ze sítě, aby se nová
  verze projevila sama; bez signálu ji vytáhne z paměti.
  Při změně ikon nebo manifestu zvyš číslo v CACHE.
*/
const CACHE = "klarka-v2";
const ZAKLAD = ["./", "./index.html", "./manifest.webmanifest",
  "./ikona-192.png", "./ikona-512.png", "./ikona-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ZAKLAD))
    .then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const jeStranka = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");
  if (jeStranka) {
    e.respondWith(fetch(req).then(o => {
      const k = o.clone();
      caches.open(CACHE).then(c => c.put("./index.html", k));
      return o;
    }).catch(() => caches.match("./index.html").then(x => x || caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(req).then(x => x || fetch(req).then(o => {
    const k = o.clone();
    caches.open(CACHE).then(c => c.put(req, k));
    return o;
  })));
});
