// Build-time only. No user content or runtime response caching.
export function serviceWorker(assets: string[], version: string) {
  return `const CACHE = ${JSON.stringify('guardjwt-static-' + version)};
const ASSETS = ${JSON.stringify(assets)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(path => new Request(path, {credentials: 'omit', cache: 'reload'})))));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('guardjwt-static-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.search) return;
  const route = url.pathname.replace(/\\/+$/, '') || '/';
  const shell = request.mode === 'navigate' && ['/', '/index.html', '/privacy', '/workbench', '/docs', '/security', '/about'].includes(route);
  if (!shell && !ASSETS.includes(url.pathname)) return;
  const routeAsset = route === '/' || route === '/index.html' ? '/index.html' : route + '/index.html';
  event.respondWith(caches.open(CACHE).then(cache => cache.match(shell ? (ASSETS.includes(routeAsset) ? routeAsset : '/index.html') : url.pathname)).then(response => response || fetch(request)));
});`;
}
