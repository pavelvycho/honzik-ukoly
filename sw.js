/*
  Service worker pro Honzíkovy úkoly.

  Stránku samotnou bere nejdřív ze sítě, a když není signál, vytáhne ji
  z paměti. Díky tomu se nová verze objeví hned po nahrání na GitHub a
  zároveň appka funguje i bez připojení.

  Ikony a manifest bere rovnou z paměti, ty se nemění.
*/

const CACHE = "honzik-ukoly-v2";

const ZAKLAD = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./ikona-192.png",
  "./ikona-512.png",
  "./ikona-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ZAKLAD))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const jeStranka = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (jeStranka) {
    // nejdřív síť, ať se nová verze projeví sama; bez signálu z paměti
    e.respondWith(
      fetch(req)
        .then(odpoved => {
          const kopie = odpoved.clone();
          caches.open(CACHE).then(c => c.put("./index.html", kopie));
          return odpoved;
        })
        .catch(() => caches.match("./index.html").then(x => x || caches.match("./")))
    );
    return;
  }

  // ostatní soubory: nejdřív paměť, pak síť
  e.respondWith(
    caches.match(req).then(x => x || fetch(req).then(odpoved => {
      const kopie = odpoved.clone();
      caches.open(CACHE).then(c => c.put(req, kopie));
      return odpoved;
    }))
  );
});
