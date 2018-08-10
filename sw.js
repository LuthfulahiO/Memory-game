let cache = "MEMORY-GAME";
let version = "1.1.0";
let cacheName = `${cache}_${version}`;
let filesToCache = [
    "/Memory-Game-fend/",
    "/Memory-Game-fend/index.html",
    "./manifest.json",
    "./img/lg.png",
    "./img/lg-192.png",
    "./css/app.css",
    "./js/app.js",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
];



self.addEventListener("install", event => {
    console.log("[Service Worker] installing ");

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log("[Service Worker] caching all files");
            cache.addAll(filesToCache);
        }).then(() => self.skipWaiting()).catch(err => console.log("error occured in caching files ==> ", err))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            Promise.all(
                keyList.map(key => {
                    if (key !== cacheName) {
                        caches.delete(key);
                        console.log(`deleted ${key}`)
                    }
                })
            );
        })
    );
});