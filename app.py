# ============================================================================
# Flask PWA 基礎應用程式
# ============================================================================
# 這個檔案是應用程式的主要入口點，設定了 Flask 伺服器和必要的路由。
# 包含了處理 PWA 關鍵檔案的特殊路由，如 service-worker.js 和 manifest.json。

from flask import Flask, render_template, send_from_directory, request, make_response
import os

# 初始化 Flask 應用程式
app = Flask(__name__)

# 首頁路由 - 提供主要 HTML 頁面
@app.route('/')
def home():
    # 渲染 index.html 模板
    return render_template('index.html')

# Service Worker 路由 - 處理 PWA 的核心功能
@app.route('/static/service-worker.js')
def service_worker():
    # 從 static 目錄提供 service-worker.js 檔案
    response = make_response(send_from_directory('static', 'service-worker.js'))
    
    # 添加關鍵標頭 'Service-Worker-Allowed'
    # 這允許 Service Worker 控制整個網站，而不只是 /static/ 路徑
    response.headers['Service-Worker-Allowed'] = '/'
    return response

# manifest.json 路由 - 提供 PWA 安裝資訊
@app.route('/static/manifest.json')
def manifest():
    # 從 static 目錄提供 manifest.json 檔案
    response = make_response(send_from_directory('static', 'manifest.json'))
    
    # 設定正確的 MIME 類型和字元編碼
    # 確保中文字能夠正確顯示
    response.headers['Content-Type'] = 'application/manifest+json; charset=utf-8'
    return response

# 通用靜態檔案處理
@app.route('/static/<path:path>')
def send_static(path):
    # 處理所有其他靜態檔案（圖示、樣式等）
    return send_from_directory('static', path)

# 應用程式入口點
if __name__ == '__main__':
    # 啟動開發伺服器
    # debug=True 提供自動重新載入功能
    # host='0.0.0.0' 允許從網路上的任何設備存取
    app.run(debug=True, host='0.0.0.0', port=5000)