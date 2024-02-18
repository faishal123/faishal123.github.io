// sw.js
// Caching
const cacheName = 'v1';
// const cacheAssets = ['index.html', 'about.html', 'main.js'];
// Call install event
self.addEventListener('install', (e) => {
	console.log('Service Worker is installed!');
	// e.waitUntil(
	// 	caches.open(cacheName).then((cache) => {
	// 		cache.addAll(cacheAssets);
	// 	}),
	// );
});
// Call activate event
self.addEventListener('activate', (e) => {
	console.log('Service Worker is activated!');
	// Remove unwanted caches
	e.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((c) => {
					if (c !== cacheName) {
						console.log('Service Worker: Clean old cache');
						return caches.delete(c);
					}
				}),
			);
		}),
	);
});

// Call Fetch Event
// self.addEventListener('fetch', (e) => {
// 	console.log('handling fetch');
// 	e.respondWith(
// 		fetch(e.request).catch(() => {
// 			console.log('request error', caches);
// 			return caches.match(e.request);
// 		}),
// 	);
// });
self.addEventListener('fetch', (e) => {
	console.log('Service Worker: Fetching', e.request.url);
	e.respondWith(
		fetch(e.request)
			.then((res) => {
				// Make a copy/clone of the response
				const resClone = res.clone();
				// Open cache
				caches.open(cacheName).then((cache) => {
					// Add response to the cache
					cache.put(e.request, resClone);
				});
				return res;
			})
			.catch((e) => {
				return caches.match(e.request).then((res) => res);
			}),
	);
});
