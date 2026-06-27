// ===================================================================
// Service Worker - Alireza Apex PWA
// Version: 2.0.0
// Strategy: Network First with Cache Fallback
// Update: Added auto-reload notification for clients
// ===================================================================

const CACHE_VERSION = 'v2';
const CACHE_NAME = `alireza-apex-${CACHE_VERSION}`;

// فایل‌هایی که باید در اولین نصب کش شوند (App Shell)
const APP_SHELL_ASSETS = [
    './',
    './index.html',
    './1780913134571.webp'
];

// دامنه‌های خارجی که باید کش شوند (مثل فونت‌ها)
const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;800&display=swap'
];

// ترکیب همه فایل‌ها برای کش اولیه
const ASSETS_TO_CACHE = [...APP_SHELL_ASSETS, ...EXTERNAL_ASSETS];

// دامنه‌هایی که نباید کش شوند (مثل analytics)
const IGNORED_DOMAINS = [
    'google-analytics.com',
    'googletagmanager.com',
    'doubleclick.net'
];

// ===================================================================
// INSTALL EVENT - کش کردن فایل‌های اولیه
// ===================================================================
self.addEventListener('install', (event) => {
    console.log(`[SW ${CACHE_VERSION}] Installing...`);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(`[SW ${CACHE_VERSION}] Caching app shell assets`);
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log(`[SW ${CACHE_VERSION}] Installation complete`);
            })
            .catch((err) => {
                console.warn(`[SW ${CACHE_VERSION}] Some assets failed to cache:`, err);
                // حتی اگر بعضی فایل‌ها کش نشدند، نصب ادامه پیدا کند
                return caches.open(CACHE_NAME).then(cache => cache.add('./'));
            })
    );
    
    // فعال‌سازی فوری بدون انتظار برای بستن تب‌های قدیمی
    self.skipWaiting();
});

// ===================================================================
// ACTIVATE EVENT - پاکسازی کش‌های قدیمی و اطلاع‌رسانی به کلاینت‌ها
// ===================================================================
self.addEventListener('activate', (event) => {
    console.log(`[SW ${CACHE_VERSION}] Activating...`);
    
    event.waitUntil(
        // پاکسازی کش‌های قدیمی
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
                // اطلاع‌رسانی به همه کلاینت‌ها که نسخه جدید فعال شد
                return self.clients.matchAll({ type: 'window', includeUncontrolled: true });
            })
            .then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({
                        type: 'SW_ACTIVATED',
                        version: CACHE_VERSION
                    });
                });
            })
    );
    
    // کنترل فوری همه کلاینت‌ها
    self.clients.claim();
});

// ===================================================================
// FETCH EVENT - استراتژی Network First با Cache Fallback
// ===================================================================
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // فقط درخواست‌های GET را مدیریت کن
    if (request.method !== 'GET') return;
    
    // درخواست‌های دامنه‌های نادیده را رد کن
    if (IGNORED_DOMAINS.some(domain => url.hostname.includes(domain))) {
        return;
    }
    
    // فقط درخواست‌های same-origin و دامنه‌های شناخته شده را کش کن
    const isSameOrigin = url.origin === self.location.origin;
    const isTrustedExternal = EXTERNAL_ASSETS.some(ext => request.url.startsWith(ext));
    
    if (!isSameOrigin && !isTrustedExternal) return;
    
    // استراتژی: Network First (اول اینترنت، اگر نبود از کش)
    event.respondWith(
        fetch(request)
            .then((networkResponse) => {
                // اگر پاسخ موفق بود، در کش ذخیره کن
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // اگر اینترنت نبود، از کش بخوان
                return caches.match(request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        
                        // اگر درخواست صفحه HTML بود، صفحه اصلی را برگردان
                        if (request.headers.get('accept')?.includes('text/html')) {
                            return caches.match('./');
                        }
                        
                        // در غیر این صورت پاسخ خالی
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// ===================================================================
// MESSAGE EVENT - ارتباط با صفحه اصلی
// ===================================================================
self.addEventListener('message', (event) => {
    if (!event.data) return;
    
    // دستور پاکسازی کامل کش
    if (event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter(name => name.startsWith('alireza-apex-'))
                        .map(name => caches.delete(name))
                );
            }).then(() => {
                event.source.postMessage({ type: 'CACHE_CLEARED' });
            })
        );
    }
    
    // دستور به‌روزرسانی فوری - وقتی کاربر روی دکمه "به‌روزرسانی" کلیک می‌کند
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting().then(() => {
            // بعد از skipWaiting، به کلاینت‌ها پیام بفرست که صفحه را reload کنند
            return self.clients.matchAll({ type: 'window', includeUncontrolled: true });
        }).then((clients) => {
            clients.forEach((client) => {
                client.postMessage({
                    type: 'RELOAD_PAGE',
                    version: CACHE_VERSION
                });
            });
        });
    }
    
    // درخواست وضعیت کش
    if (event.data.type === 'GET_CACHE_STATUS') {
        caches.open(CACHE_NAME).then(cache => {
            cache.keys().then(keys => {
                event.source.postMessage({
                    type: 'CACHE_STATUS',
                    count: keys.length,
                    version: CACHE_VERSION
                });
            });
        });
    }
    
    // درخواست نسخه فعلی
    if (event.data.type === 'GET_VERSION') {
        event.source.postMessage({
            type: 'VERSION',
            version: CACHE_VERSION
        });
    }
});

// ===================================================================
// BACKGROUND SYNC (اختیاری - برای فرم تماس)
// ===================================================================
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-contact-form') {
        console.log(`[SW ${CACHE_VERSION}] Background sync for contact form`);
        // اینجا می‌توانی پیام‌های ذخیره شده را ارسال کنی
    }
});

// ===================================================================
// PUSH NOTIFICATIONS (اختیاری - برای آینده)
// ===================================================================
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'پیام جدید از Alireza Apex',
            icon: './1780913134571.webp',
            badge: './1780913134571.webp',
            vibrate: [200, 100, 200],
            data: {
                url: data.url || './'
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'Alireza Apex', options)
        );
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || './';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                for (let client of windowClients) {
                    if (client.url.includes(urlToOpen) && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

console.log(`[SW ${CACHE_VERSION}] Service Worker loaded successfully`);