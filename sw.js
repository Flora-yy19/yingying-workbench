/* 影影的工作台 sw.js — 自毁版：不缓存，永远走网络最新版 */
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); self.registration.unregister(); });
self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request).catch(function () { return new Response('', { status: 504 }); }));
});
