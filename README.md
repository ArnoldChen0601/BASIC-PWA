# 基礎 PWA 範例專案

這是一個基於 Python Flask 開發的基礎漸進式網頁應用 (PWA) 範例專案，展示了 PWA 的核心功能與實現方式。

## 什麼是 PWA?

漸進式網頁應用（Progressive Web App, PWA）結合了網頁和原生應用程式的優點，提供：

- 💻 跨平台相容性（一次開發，處處運行）
- 🔌 離線工作能力
- 📱 可安裝到設備主螢幕
- 📨 推播通知功能
- 🚀 原生應用般的使用者體驗

## 專案架構

```
/BasicPWA-PythonFlask/
│
├── app.py                  # Flask 應用入口點
├── templates/
│   └── index.html          # 主頁面 HTML
├── static/
│   ├── style.css           # 樣式表
│   ├── service-worker.js   # Service Worker 實現
│   ├── manifest.json       # PWA 資訊清單
│   ├── icon.png            # 應用圖示 (192x192)
│   └── icon-512.png        # 應用圖示 (512x512)
```

## PWA 核心檔案詳解

### 1. index.html

`index.html` 是應用程式的入口點，包含了使網頁成為 PWA 所需的所有關鍵元素：

```html
<!-- PWA 必要連結 -->
<link rel="manifest" href="/static/manifest.json">
<meta name="theme-color" content="#4285f4">
<meta name="apple-mobile-web-app-capable" content="yes">
<!-- ... 其他 meta 標籤 ... -->
```

**關鍵部分解析：**

- **Viewport Meta Tag**：`<meta name="viewport" content="width=device-width, initial-scale=1.0">` 確保應用在行動裝置上正確顯示
- **Web App Manifest**：`<link rel="manifest" href="/static/manifest.json">` 連結到定義 PWA 安裝和顯示行為的 JSON 檔案
- **iOS 特定標籤**：使 PWA 能在 iOS 設備上提供更原生的體驗
- **Service Worker 註冊**：JavaScript 程式碼註冊 Service Worker，啟用離線功能
- **網路狀態監控**：偵測設備是否處於離線狀態，並相應更新 UI

### 2. service-worker.js

Service Worker 是 PWA 的核心，它作為網頁和網路之間的代理，使離線功能成為可能：

```javascript
// 定義快取的名稱 (修改此值可強制更新快取)
const CACHE_NAME = 'pwa-v1';

// 定義需要快取的資源 URL
const urlsToCache = [
  '/',  // 首頁
  '/static/style.css',  // 樣式表
  // ... 其他資源 ...
];
```

**Service Worker 生命週期與事件：**

1. **Install 事件**: 當 Service Worker 首次安裝時觸發
   - 預先快取關鍵資源（HTML、CSS、圖示等）
   - `self.skipWaiting()` 確保新版本立即激活

2. **Activate 事件**: 當 Service Worker 開始控制頁面時觸發
   - 清理舊版快取
   - 準備處理網路請求

3. **Fetch 事件**: 當頁面發出網路請求時觸發
   - 實現快取策略 (Cache-First Strategy)
   - 檢查快取中是否有請求的資源
   - 如果沒有，從網路獲取並添加到快取
   - 處理離線狀態下的請求

**快取策略說明：**

本專案使用「Cache First」策略，意味著優先從快取提供資源，僅在快取未命中時才從網路請求。這種策略提供了最佳的離線體驗和頁面加載速度。

### 3. manifest.json

Web App Manifest 是一個 JSON 檔案，提供瀏覽器關於 PWA 的重要資訊：

```json
{
    "name": "My Progressive Web App",     // 完整名稱
    "short_name": "MyPWA",                // 短名稱，用於主螢幕圖示下方顯示
    "description": "一個基於 Flask 的漸進式網頁應用",  // 應用程式描述
    "start_url": "/",                     // 啟動時載入的 URL
    // ... 其他設定 ...
}
```

**主要屬性詳解：**

| 屬性 | 說明 | 範例值 |
|------|------|--------|
| `name` | 應用程式的完整名稱 | "My Progressive Web App" |
| `short_name` | 空間有限時使用的縮寫名稱 | "MyPWA" |
| `description` | 應用程式的描述 | "一個基於 Flask 的漸進式網頁應用" |
| `start_url` | 應用啟動時開啟的 URL | "/" |
| `display` | 顯示模式 | "standalone"（隱藏瀏覽器 UI）、"fullscreen"、"minimal-ui" 或 "browser" |
| `background_color` | 啟動畫面的背景色 | "#ffffff" |
| `theme_color` | 工具列等 UI 元素的顏色 | "#4285f4" |
| `icons` | 不同大小的應用圖示 | 陣列，包含路徑、尺寸和類型 |
| `scope` | 定義應用的導航範圍 | "/" |
| `orientation` | 優先的螢幕方向 | "portrait" 或 "landscape" |

**圖示屬性說明：**
- `purpose: "any maskable"` - 允許在不同設備上適應不同形狀（如圓形圖示在某些 Android 設備上）
- 至少要包含 192x192 和 512x512 兩個大小的圖示，以確保在不同設備上正確顯示

## 如何運行

1. 確保已安裝 Python 和 Flask
   ```bash
   pip install flask
   ```

2. 運行 Flask 應用
   ```bash
   python app.py
   ```

3. 在瀏覽器中訪問 `http://localhost:5000`

4. 若要測試離線功能：
   - 打開開發者工具 (F12)
   - 切換到「應用程式」或「Application」選項卡
   - 在「Service Workers」部分啟用離線模式
   - 重新載入頁面以確認離線功能正常

## PWA 安裝流程

最新的瀏覽器會自動識別符合 PWA 標準的應用程式，並提示用戶安裝：

1. 在 Chrome 或 Edge 中，地址欄右側會出現「安裝」圖示
2. 在移動設備上，提示可能顯示為「添加到主畫面」
3. 安裝後，PWA 會在應用程式啟動器或開始選單中出現，就像本機應用一樣

## PWA 檢查清單

為確保您的 PWA 符合標準並達到最佳效果，請檢查：

- [x] 具備有效的 Web App Manifest
- [x] 使用 HTTPS（生產環境中必須）
- [x] 註冊 Service Worker 處理離線功能
- [x] 包含適當大小的圖示
- [x] 頁面具有回應式設計，適應不同螢幕尺寸
- [x] 所有應用程式路由都在 Service Worker 範圍內
- [ ] 實現網頁推播通知 (本範例尚未實現)
- [ ] 添加安裝事件處理 (本範例使用瀏覽器預設行為)

## 檢測與除錯工具

開發 PWA 時，以下工具非常有用：

1. **Lighthouse** - Chrome DevTools 內建工具，可評估 PWA 評分
2. **Application Panel** - Chrome DevTools 中用於檢查 Service Worker、Storage 和 Manifest
3. **PWA Builder** - 幫助增強現有網站成為 PWA (https://www.pwabuilder.com/)

## 學習重點

- Service Worker 生命週期（安裝、啟用、提取）
- 快取策略和資源管理
- 如何配置正確的 manifest.json
- 處理在線/離線狀態轉換
- 使用適當的 HTTP 頭以確保正確功能運作

## 進階功能（未來擴展方向）

本範例專案展示了 PWA 的基礎功能，但仍有許多進階功能可以實現：

1. **推播通知** - 使用 Push API 實現訊息推送
2. **後台同步** - 當網路恢復時同步資料
3. **分享整合** - 使用 Web Share API
4. **裝置功能訪問** - 相機、地理位置等
5. **應用程式更新流程** - 通知用戶新版本可用

## 參考資料
- [工作室的 Web 進化升級成 PWA 感想 (無深入技術講述純分享)](https://medium.com/@zay800211/%E5%B7%A5%E4%BD%9C%E5%AE%A4%E7%9A%84-web-%E9%80%B2%E5%8C%96%E5%8D%87%E7%B4%9A%E6%88%90-pwa-%E6%84%9F%E6%83%B3-%E7%84%A1%E6%B7%B1%E5%85%A5%E6%8A%80%E8%A1%93%E8%AC%9B%E8%BF%B0%E7%B4%94%E5%88%86%E4%BA%AB-9327c47f8dd3)
- [PWA介紹 (Progressive Web App)，優、缺點及範例介紹](https://www.arshire.com/blog/pwa)
- [Learn PWA](https://web.dev/learn/pwa)
- [漸進式網路應用程式 | MDN](https://developer.mozilla.org/zh-TW/docs/Web/Progressive_web_apps)
- [Service Worker 總覽 | Workbox | Chrome for Developers](https://developers.google.com/web/fundamentals/primers/service-workers?hl=zh-tw)
- [Web 應用程式清單 - 漸進式網路應用程式 | MDN](https://developer.mozilla.org/zh-TW/docs/Web/Manifest)
