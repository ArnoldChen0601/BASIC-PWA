# 基礎 PWA 範例專案

這是一個基礎的漸進式網頁應用 (PWA) 範例專案，展示了 PWA 的核心功能與實現方式。

## 什麼是 PWA?

漸進式網頁應用（Progressive Web App, PWA）結合了網頁和原生應用程式的優點，提供:

- 💻 跨平台相容性（一次開發，處處運行）
- 🔌 離線工作能力
- 📱 可安裝到設備主螢幕
- 📨 推播通知功能
- 🚀 原生應用般的使用者體驗

## 專案架構

```
/Basic-PWA/
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

## 核心技術

此專案展示了以下 PWA 核心技術：

1. **Service Worker** - 啟用離線功能和資源快取
2. **Web App Manifest** - 定義應用安裝行為和外觀
3. **響應式網頁設計** - 適應不同設備尺寸
4. **離線偵測** - 顯示網路狀態提示

## Manifest.json 解析

manifest.json 是 PWA 的關鍵組件，定義了應用程式的外觀和行為。以下是主要屬性解析：

```json
{
    "name": "My Progressive Web App",     // 完整名稱
    "short_name": "MyPWA",                  // 短名稱，用於主螢幕圖示下方顯示
    "description": "一個基於 Flask 的漸進式網頁應用",  // 應用程式描述
    "start_url": "/",                       // 啟動時載入的 URL
    "display": "standalone",                // 顯示模式 (隱藏額外瀏覽器UI)
    "background_color": "#ffffff",          // 啟動畫面背景顏色
    "theme_color": "#4285f4",               // 應用主題色彩 (影響工具列等)
    "orientation": "portrait",              // 優先螢幕方向
    "scope": "/",                           // 控制範圍
    "icons": [
        {
            "src": "/static/icon.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "/static/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
        }
    ]
}
```

這些設定使瀏覽器能夠將網頁應用當作原生應用來處理，提供更整合的使用者體驗。

## 如何運行

1. 確保已安裝 Python 和 Flask
2. 運行 `python app.py`
3. 在瀏覽器中訪問 `http://localhost:5000`

## 學習重點

- Service Worker 生命週期（安裝、啟用、提取）
- 快取策略和資源管理
- 如何配置正確的 manifest.json
- 處理在線/離線狀態轉換
- 使用適當的 HTTP 頭以確保正確功能運作

## 參考資料
- [工作室的 Web 進化升級成 PWA 感想 (無深入技術講述純分享)](https://medium.com/@zay800211/%E5%B7%A5%E4%BD%9C%E5%AE%A4%E7%9A%84-web-%E9%80%B2%E5%8C%96%E5%8D%87%E7%B4%9A%E6%88%90-pwa-%E6%84%9F%E6%83%B3-%E7%84%A1%E6%B7%B1%E5%85%A5%E6%8A%80%E8%A1%93%E8%AC%9B%E8%BF%B0%E7%B4%94%E5%88%86%E4%BA%AB-9327c47f8dd3)
- [PWA介紹 (Progressive Web App)，優、缺點及範例介紹](https://www.arshire.com/blog/pwa)
- [Learn PWA](https://web.dev/learn/pwa)
