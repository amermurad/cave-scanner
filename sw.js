/* network-first: يجلب أحدث نسخة من الإنترنت دائماً، ويستعمل المخزَّن فقط عند انقطاع الاتصال */
const CACHE='cave-app-v3';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(ch=>ch.put(e.request,c)).catch(()=>{});return r}).catch(()=>caches.match(e.request)));
});
