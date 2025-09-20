const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/revision_temperatura.html',
  '/productos_sensitivos.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // Puedes agregar más archivos estáticos aquí si los tienes
];

// Instalar el Service Worker y almacenar en caché los archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las solicitudes de red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si el archivo está en caché, devolverlo
        if (response) {
          return response;
        }
        // Si no está en caché, solicitarlo de la red
        return fetch(event.request);
      })
  );
});

// Activar el Service Worker y eliminar cachés antiguas
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
