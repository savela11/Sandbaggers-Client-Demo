importScripts("/precache-manifest.984cd5827c5ad75db706eaa2395e92f2.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

﻿// custom service-worker.js
if (workbox) {
  // adjust log level for displaying workbox logs

  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can
  // precache this. This is all we need for precaching
  workbox.precaching.precacheAndRoute(self.__precacheManifest)

  // Make sure to return a specific response for all navigation requests.
  // Since we have a SPA here, this should be index.html always.
  // https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
  workbox.routing.registerNavigationRoute('/index.html')

  // Setup cache strategy for Google Fonts. They consist of two parts, a static one
  // coming from fonts.gstatic.com (strategy CacheFirst) and a more ferquently updated on
  // from fonts.googleapis.com. Hence, split in two registerroutes
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  )

  workbox.core.skipWaiting()
  workbox.core.clientsClaim()

  // workbox.routing.registerRoute(
  //   /^https:\/\/fonts\.gstatic\.com/,
  //   new workbox.strategies.CacheFirst({
  //     cacheName: "google-fonts-webfonts",
  //     plugins: [
  //       new workbox.cacheableResponse.Plugin({
  //         statuses: [0, 200]
  //       }),
  //       new workbox.expiration.Plugin({
  //         maxAgeSeconds: 60 * 60 * 24 * 365,
  //         maxEntries: 30
  //       })
  //     ]
  //   })
  // );
}

// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  if (!e.data) {
    return
  }

  if (e.data.action === 'SKIP_WAITING') {
    self.skipWaiting()
  } else {
    console.log('no skip')
  }
})

// Listen to Push
self.addEventListener('push', (e) => {
  let data
  if (e.data) {
    data = e.data.json()
  }

  const options = {
    body: data.body,
    icon: '/img/icons/android-chrome-192x192.png',
    image: '/img/autumn-forest.png',
    vibrate: [300, 200, 300],
    badge: '/img/icons/plint-badge-96x96.png',
  }

  e.waitUntil(self.registration.showNotification(data.title, options))
})

