const CACHE_NAME = 'terracasa-v2.1';
const ASSETS = [
  './',
  './index.html',
  './테라까사-로고.png',
  './icon-192.png',
  './icon-512.png',
  './manifest.json',
  './quotation/index.html',
  './quotation/app.js',
  './quotation/styles.css',
  './quotation/images/거창석.png',
  './quotation/images/고흥석.png',
  './quotation/images/마천석.png',
  './quotation/images/그레이.png',
  './quotation/images/다크그레이.png',
  './quotation/images/아이보리.png',
  './quotation/images/베이지.png',
  './quotation/images/우드.png',
  './contract/index.html'
];

// 설치: 주요 파일 캐시
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 활성화: 이전 버전 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 요청 처리: 네트워크 우선, 실패 시 캐시
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
