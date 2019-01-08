
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/offline',
  '/static/img/cu.jpg',
  '/static/img/favicon.ico',
  '/static/img/logo.png',
  '/static/img/logo.svg',
  '/static/js/base.js',
  '/static/js/favorites.js',
  '/static/js/filter.js',
  '/static/js/search.js',
  '/static/js/stop.js',
  '/static/style.css'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log("loading cached item");
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
    .catch(function(error) {
      console.log('Request failed:', error);
      return caches.match('/offline');
    })
  );
});