/* Generated at build time. Offline cache for Thought Tree. */
const CACHE = 'thought-tree-54ee23e0274d'
const FILES = ["./","./assets/embed.worker-CUneVrv8.js","./assets/index-Dn4fipL6.js","./assets/index-sqncRQjE.css","./assets/sample-events-CyF3k7SX.js","./assets/supabase-backend-6_3Tgf3c.js","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./index.html","./manifest.webmanifest","./models/Xenova/gte-small/config.json","./models/Xenova/gte-small/onnx/model_quantized.onnx","./models/Xenova/gte-small/special_tokens_map.json","./models/Xenova/gte-small/tokenizer.json","./models/Xenova/gte-small/tokenizer_config.json","./ort/ort-wasm-simd-threaded.asyncify.mjs","./ort/ort-wasm-simd-threaded.asyncify.wasm"]
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
