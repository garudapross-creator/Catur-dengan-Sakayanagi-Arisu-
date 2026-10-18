const C='arisu-v1',A=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png'],X=['https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(A);for(const u of X){try{await c.put(u,await fetch(u,{mode:'no-cors'}))}catch(_){}}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('index.html'))))});
