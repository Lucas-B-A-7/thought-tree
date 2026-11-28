/* Generated at build time. Offline cache for Thought Tree. */
const CACHE = 'thought-tree-393cd6a43839'
const FILES = ["./","./assets/embed.worker-CUneVrv8.js","./assets/index-C-aCHFz_.js","./assets/index-svO2JGYU.css","./assets/learn.worker-NSbrNlFc.js","./assets/sample-events-Iwz5lY_u.js","./assets/supabase-backend-CkE9Uxa0.js","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./index.html","./manifest.webmanifest","./models/Xenova/gte-small/config.json","./models/Xenova/gte-small/onnx/model_quantized.onnx","./models/Xenova/gte-small/special_tokens_map.json","./models/Xenova/gte-small/tokenizer.json","./models/Xenova/gte-small/tokenizer_config.json","./ort/ort-wasm-simd-threaded.asyncify.mjs","./ort/ort-wasm-simd-threaded.asyncify.wasm"]
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES.map((f) => new URL(f, self.registration.scope).href))))
  self.skipWaiting()
})
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('thought-tree-') && k !== CACHE).map((k) => caches.delete(k)))))
  self.clients.claim()
})
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(
      (hit) => hit || fetch(event.request).catch(() => caches.match(new URL('./index.html', self.registration.scope).href))
    )
  )
})
// Owner, 2026-11-27: "Ponder later". The push carries only a reminder id; the title and note come from the
// copy the app keeps on this phone (ponder-map), so the server never sees them.
self.addEventListener('push', (event) => {
  let data = {}
  try { data = event.data ? event.data.json() : {} } catch (e) {}
  event.waitUntil((async () => {
    let entry
    try {
      const hit = await caches.match(new URL('./ponder-map.json', self.registration.scope).href, { cacheName: 'ponder-map' })
      if (hit) entry = (await hit.json())[data.reminderId]
    } catch (e) {}
    const title = entry ? 'Ponder later: ' + entry.title : 'Ponder later'
    const body = entry ? (entry.note || 'Tap to open it.') : 'A thought you wanted to come back to. Tap to open SecondBrain.'
    await self.registration.showNotification(title, { body, tag: data.reminderId || 'ponder', data: { itemId: entry ? entry.itemId : null }, icon: './icons/icon-192.png', badge: './icons/icon-192.png' })
  })())
})
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const itemId = event.notification.data && event.notification.data.itemId
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    for (const client of windows) {
      await client.focus()
      if (itemId) client.postMessage({ type: 'ponder-open', itemId })
      return
    }
    await self.clients.openWindow(new URL(itemId ? './?open=' + encodeURIComponent(itemId) : './', self.registration.scope).href)
  })())
})
