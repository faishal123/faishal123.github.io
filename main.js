// main.js
if ('serviceWorker' in navigator) {
  console.log('Service Worker supported')
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered!', reg))
    .catch(err => console.log('Boo  !', err));
} else {
  console.error('Service Worker is not supported')
}