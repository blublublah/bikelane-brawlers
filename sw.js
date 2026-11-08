// Bump VERSION on every deploy. Changing this file is what tells installed apps there's an update.
const VERSION = 'v1';
const CACHE = 'bikelane-brawlers-' + VERSION;
const FILES = [
  './',
  'index.html',
  'three.min.js',
  'manifest.webmanifest',
  'fonts/bungee-latin-400-normal.woff2',
  'fonts/chakra-petch-latin-500-normal.woff2',
  'fonts/chakra-petch-latin-700-normal.woff2',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('bikelane-brawlers-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => { if(e.data === 'skipWaiting') self.skipWaiting(); });

// Cache first: the game launches instantly and works with no signal. New versions arrive through the update toast.
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).catch(() =>
      req.mode === 'navigate' ? caches.match('index.html') : Response.error()))
  );
});
