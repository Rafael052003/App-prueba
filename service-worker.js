const CACHE_NAME = 'chitre-selecto-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierta');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Todos los recursos se han precargado y cacheado.');
      })
      .catch((error) => {
        console.error('Fallo en el precargado de recursos:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
