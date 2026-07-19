// ===================================================================
// Service Worker - Alireza Apex PWA
// Version: 4.0.0
// Strategy: Network First with Cache Fallback
// ===================================================================

const CACHE_VERSION = 'v4';
const CACHE_NAME = `alireza-apex-${CACHE_VERSION}`;

// Only local assets - NO external fonts to prevent install failure
const APP_SHELL_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './1780913134571.webp'
];

const IGNORED_DOMAINS = [
    'google-analytics.com',
    'googletagmanager.com',
    'doubleclick.net',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
    console.log(`[SW ${CACHE_VERSION}] Installing...`);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(`[SW ${CACHE_VERSION}] Caching app shell assets`);
                return cache.addAll(APP_SHELL_ASSETS);
            })
            .then(() => {
                console.log(`[SW ${CACHE_VERSION}] Installation complete`);
                return self.skipWaiting();
            })
            .catch((err) => {
                console.warn(`[SW ${CACHE_VERSION}] Some assets failed to cache:`, err);
                // Don't fail installation if caching fails
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log(`[SW ${CACHE_VERSION}] Activating...`);
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('alireza-apex-') && name !== CACHE_NAME)
                        .map((name) => {
                            console.log(`[SW ${CACHE_VERSION}] Deleting old cache:`, name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log(`[SW ${CACHE_VERSION}] Activation complete`);
                return self.clients.claim();
            })
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    if (request.method !== 'GET') return;
    if (IGNORED_DOMAINS.some(domain => url.hostname.includes(domain))) return;
    
    const isSameOrigin = url.origin === self.location.origin;
    if (!isSameOrigin) return;

    event.respondWith(
        fetch(request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(request)
                    .then((cachedResponse) => {
                        if (cachedResponse) return cachedResponse;
                        if (request.headers.get('accept')?.includes('text/html')) {
                            return caches.match('./');
                        }
                        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
                    });
            })
    );
});

self.addEventListener('message', (event) => {
    if (!event.data) return;
    
    if (event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.filter(name => name.startsWith('alireza-apex-')).map(name => caches.delete(name))
                );
            }).then(() => event.source.postMessage({ type: 'CACHE_CLEARED' }))
        );
    }
    
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting().then(() => {
            return self.clients.matchAll({ type: 'window', includeUncontrolled: true });
        }).then((clients) => {
            clients.forEach((client) => {
                client.postMessage({ type: 'RELOAD_PAGE', version: CACHE_VERSION });
            });
        });
    }
    
    if (event.data.type === 'GET_VERSION') {
        event.source.postMessage({ type: 'VERSION', version: CACHE_VERSION });
    }
});

console.log(`[SW ${CACHE_VERSION}] Service Worker loaded successfully`);