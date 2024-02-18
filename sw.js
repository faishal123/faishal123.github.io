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
self.addEventListener('fetch', (event) => {
	console.log('Service Worker: Fetching', event.request.url);
	if (!(event.request.url.indexOf('http') === 0)) return;
	console.log(caches);
	event.respondWith(
		fetch(event.request)
			.then((res) => {
				// Make a copy/clone of the response
				const resClone = res.clone();
				// Open cache
				caches.open(cacheName).then((cache) => {
					// Add response to the cache
					cache.put(event.request, resClone).then(() => { console.log('cache put success') });
				});
				return res;
			})
			.catch((err) => {
				console.log('fetch failed', err);
				return caches.match(event.request).then((res) => res);
			}),
	);
});
