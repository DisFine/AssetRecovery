self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .catch(() => {
        return caches.match(e.request);
      })
      .then((response) => {
        return response || new Response("Offline and resource not cached", {
          status: 503,
          statusText: "Service Unavailable",
        });
      })
  );
});

