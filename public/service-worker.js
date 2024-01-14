const CACHE_NAME = 'webblog-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) =>
        cache.addAll([
          '/',
          '/index.html',
          '/main.js',
          '/manifest.json',
          '/banner-login.jpg',
        ])
      )
      .catch((error) => {
        console.error('Error durante la instalación del Service Worker:', error);
        throw error; 
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
        return fetch(event.request)
          .then((responseFromNetwork) => {
            if (responseFromNetwork && responseFromNetwork.status === 200) {
              return caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseFromNetwork.clone());
                  return responseFromNetwork;
                });
            }
            return caches.match('./offline.html');
          })
          .catch(() => {
            return caches.match('./offline.html');
          });
      })
  );
});

