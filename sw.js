// ===================================================================
// Service Worker - Alireza Apex PWA
// Version: 2.0.0
// Strategy: Network First with Cache Fallback
// ===================================================================

const CACHE_VERSION = 'v2';
const CACHE_NAME = `alireza-apex-${CACHE_VERSION}`;

const APP_SHELL_ASSETS = [
    './',
    './index.html',
    './1780913134571.webp'
];

const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;800&display=swap'
];

const ASSETS_TO_CACHE = [...APP_SHELL_ASSETS, ...EXTERNAL_ASSETS];

const IGNORED_DOMAINS = [
    'google-analytics.com',
    'googletagmanager.com',
    'doubleclick.net'
];

self.addEventListener('install', (event) => {
    console.log(`[SW ${CACHE_VERSION}] Installing...`);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(`[SW ${CACHE_VERSION}] Caching app shell assets`);
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => console.log(`[SW ${CACHE_VERSION}] Installation complete`))
            .catch((err) => {
                console.warn(`[SW ${CACHE_VERSION}] Some assets failed to cache:`, err);
                return caches.open(CACHE_NAME).then(cache => cache.add('./'));
            })
    );
    self.skipWaiting();
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
                return self.clients.matchAll({ type: 'window', includeUncontrolled: true });
            })
            .then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({ type: 'SW_ACTIVATED', version: CACHE_VERSION });
                });
            })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    if (request.method !== 'GET') return;
    if (IGNORED_DOMAINS.some(domain => url.hostname.includes(domain))) return;
    const isSameOrigin = url.origin === self.location.origin;
    const isTrustedExternal = EXTERNAL_ASSETS.some(ext => request.url.startsWith(ext));
    if (!isSameOrigin && !isTrustedExternal) return;
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
    if (event.data.type === 'GET_CACHE_STATUS') {
        caches.open(CACHE_NAME).then(cache => {
            cache.keys().then(keys => {
                event.source.postMessage({ type: 'CACHE_STATUS', count: keys.length, version: CACHE_VERSION });
            });
        });
    }
    if (event.data.type === 'GET_VERSION') {
        event.source.postMessage({ type: 'VERSION', version: CACHE_VERSION });
    }
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-contact-form') {
        console.log(`[SW ${CACHE_VERSION}] Background sync for contact form`);
    }
});

self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'پیام جدید از Alireza Apex',
            icon: './1780913134571.webp',
            badge: './1780913134571.webp',
            vibrate: [200, 100, 200],
            data: { url: data.url || './' }
        };
        event.waitUntil(self.registration.showNotification(data.title || 'Alireza Apex', options));
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || './';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                for (let client of windowClients) {
                    if (client.url.includes(urlToOpen) && 'focus' in client) return client.focus();
                }
                if (clients.openWindow) return clients.openWindow(urlToOpen);
            })
    );
});

console.log(`[SW ${CACHE_VERSION}] Service Worker loaded successfully`);