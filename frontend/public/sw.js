/**
 * Service Worker — Parc Urbain Bangr-Weoogo (BF-NATURE)
 * Version: bfn-v1
 * Optimisé pour connectivité mobile 3G/4G, résilience hors-connexion et anti cold-start
 */

const VERSION = 'v1';
const CACHE_PREFIX = 'bfn';
const STATIC_CACHE = `${CACHE_PREFIX}-static-${VERSION}`;
const PAGES_CACHE = `${CACHE_PREFIX}-pages-${VERSION}`;
const IMAGES_CACHE = `${CACHE_PREFIX}-images-${VERSION}`;
const API_CACHE = `${CACHE_PREFIX}-api-${VERSION}`;

const CURRENT_CACHES = [STATIC_CACHE, PAGES_CACHE, IMAGES_CACHE, API_CACHE];
const MAX_IMAGE_ENTRIES = 60;

// Ressources essentielles pré-mises en cache à l'installation
const PRECACHE_RESOURCES = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
];

// 1. Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_RESOURCES))
      .catch((err) => {
        console.warn('[SW] Erreur lors du pré-cache :', err);
      })
  );
});

// 2. Activation & Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name.startsWith(CACHE_PREFIX) && !CURRENT_CACHES.includes(name)) {
              console.log('[SW] Suppression ancien cache :', name);
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 3. Réception de messages (Mise à jour fluide SKIP_WAITING)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Utilitaire de purge LRU du cache d'images
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      await cache.delete(keys[0]);
      trimCache(cacheName, maxItems);
    }
  } catch (err) {
    // Éviction silencieuse
  }
}

// 4. Interception des requêtes (Fetch)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer requêtes non-GET et protocoles non-HTTP
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Ne jamais intercepter les requêtes internes Next.js RSC / Prefetch pour préserver le routeur client
  const isRsc = url.searchParams.has('_rsc') || request.headers.get('RSC') === '1';
  const isPrefetch = request.headers.get('Purpose') === 'prefetch' || request.headers.get('Sec-Purpose') === 'prefetch';
  if (isRsc || isPrefetch) {
    return;
  }

  // A. Requêtes API GET (/api/backend/... ou endpoints de données)
  const isApiRequest =
    url.pathname.startsWith('/api/backend') ||
    url.pathname.startsWith('/api/sites') ||
    url.pathname.startsWith('/api/contenus') ||
    url.pathname.includes('/sites/') ||
    url.pathname.includes('/contenus');

  const isExcludedApi =
    url.pathname.includes('/auth/') ||
    url.pathname.includes('/admin/') ||
    url.pathname.includes('/reservations') ||
    url.pathname.includes('/locations');

  if (isApiRequest && !isExcludedApi) {
    event.respondWith(handleApiGet(request));
    return;
  }

  // B. Navigations HTML complètes (request.mode === 'navigate')
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  // C. Fichiers statiques Next.js et Polices
  const isStatic =
    url.pathname.startsWith('/_next/static/') ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com';

  if (isStatic) {
    event.respondWith(handleCacheFirst(request, STATIC_CACHE));
    return;
  }

  // D. Images (locales ou distantes)
  const isImage =
    request.destination === 'image' ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/icons/') ||
    url.hostname === 'images.unsplash.com';

  if (isImage) {
    event.respondWith(handleImage(request));
    return;
  }
});

// Stratégie Navigation : Network-First avec fallback cache & page offline
async function handleNavigation(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const copy = networkResponse.clone();
      caches.open(PAGES_CACHE).then((cache) => cache.put(request, copy));
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    const offlineFallback = await caches.match('/offline');
    if (offlineFallback) {
      return offlineFallback;
    }
    return new Response('Hors connexion — Bangr-Weoogo', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

// Stratégie Statique : Cache-First
async function handleCacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const copy = networkResponse.clone();
      caches.open(cacheName).then((cache) => cache.put(request, copy));
    }
    return networkResponse;
  } catch (error) {
    return new Response(null, { status: 404 });
  }
}

// Stratégie Images : Stale-While-Revalidate avec limite LRU
async function handleImage(request) {
  const cache = await caches.open(IMAGES_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
        trimCache(IMAGES_CACHE, MAX_IMAGE_ENTRIES);
      }
      return networkResponse;
    })
    .catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Stratégie API GET : Stale-While-Revalidate avec timeout court (2.5s) anti-démarrage à froid
async function handleApiGet(request) {
  const cache = await caches.open(API_CACHE);
  const cachedResponse = await cache.match(request);

  // Promesse réseau avec mise en cache sécurisée CORS
  const networkFetch = fetch(request.clone())
    .then((networkResponse) => {
      // Ne mettre en cache que les réponses 200 OK valides
      if (
        networkResponse &&
        networkResponse.status === 200 &&
        (networkResponse.type === 'basic' || networkResponse.type === 'cors')
      ) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    });

  // Si on a déjà du contenu en cache, on applique un timeout réseau de 2500ms
  // pour ne pas bloquer l'utilisateur si le serveur démarre à froid
  if (cachedResponse) {
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve(null), 2500);
    });

    try {
      const fastResponse = await Promise.race([networkFetch, timeoutPromise]);
      if (fastResponse) {
        return fastResponse;
      }
    } catch (err) {
      // Erreur réseau : retour immédiat du cache
      return cachedResponse;
    }
    // Timeout écoulé (> 2.5s) : on sert immédiatement le cache sans bloquer
    return cachedResponse;
  }

  // Si pas de cache, on attend la réponse réseau normale (ou fallback d'erreur)
  try {
    return await networkFetch;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Réseau indisponible, données hors connexion non trouvées.' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
