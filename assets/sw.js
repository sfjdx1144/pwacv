var CACHE_NAME = "cacheName";
var CACHE_URLS = [
  "/",

];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS);
    })
  )
});

// 监听fetch事件
self.addEventListener("fetch", function(e) {
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request).then(function(response) {
        if (response) {
          return response;
        } else if (e.request.headers.get("accept").includes("text/html")) {
          return caches.match("/");
        }
      })
    })
  )
});