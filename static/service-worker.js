// ============================================================================
// PWA Service Worker
// ============================================================================
// 這個檔案實現了 PWA 的離線功能，通過快取關鍵資源並在離線時提供它們。
// Service Worker 作為代理伺服器運作在瀏覽器與網路之間。

// 定義快取的名稱 (修改此值可強制更新快取)
const CACHE_NAME = 'pwa-v1';

// 定義需要快取的資源 URL
const urlsToCache = [
  '/',  // 首頁
  '/static/style.css',  // 樣式表
  '/static/icon.png',  // 應用圖示
  '/static/manifest.json'  // PWA 配置檔案
];

// ============================================================================
// 安裝事件 - 當 Service Worker 首次註冊時觸發
// ============================================================================
self.addEventListener('install', function(event) {
  // 強制新版本的 Service Worker 立即啟用，不等待現有頁面關閉
  self.skipWaiting();
  
  // waitUntil() 延長事件的壽命，直到裡面的 Promise 解析完成
  event.waitUntil(
    // 開啟命名的快取空間
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('已開啟快取');
      // 添加所有指定資源到快取
      return cache.addAll(urlsToCache);
    })
  );
});

// ============================================================================
// 啟用事件 - 當 Service Worker 開始控制頁面時觸發
// ============================================================================
self.addEventListener('activate', function(event) {
  event.waitUntil(
    // 取得所有已存在的快取名稱
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        // 過濾出不是當前版本的快取
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          // 刪除舊版本的快取
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// ============================================================================
// 網路請求攔截事件 - 當頁面發出網路請求時觸發
// ============================================================================
self.addEventListener('fetch', function(event) {
  // 檢查請求的 URL 是否可以快取（僅支援 http/https 協議）
  const requestUrl = new URL(event.request.url);
  if (requestUrl.protocol !== 'http:' && requestUrl.protocol !== 'https:') {
    return; // 跳過不支援的協議（如 chrome-extension://）
  }
  
  // 提供自訂回應
  event.respondWith(
    // 嘗試從快取匹配請求
    caches.match(event.request)
      .then(function(response) {
        // 快取命中 - 返回快取的回應
        if (response) {
          return response;
        }
        
        // 快取未命中 - 從網路獲取
        return fetch(event.request).then(
          function(response) {
            // 檢查是否是有效回應
            // 只快取成功的基本請求（狀態碼 200）
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 複製回應，因為回應是流，只能消費一次
            var responseToCache = response.clone();
            
            // 將網路回應添加到快取
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            // 返回原始回應給頁面
            return response;
          }
        );
      })
  );
});
