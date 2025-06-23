# NFC 讀卡機 📱

一個基於 Web NFC API 的 NFC 卡片掃描器，能夠讀取 NFC 卡片的 UID 資訊。

## ✨ 功能特色

- 🔍 **即時 NFC 掃描** - 自動檢測並讀取 NFC 卡片
- 📋 **卡片資訊顯示** - 顯示卡片 UID 和掃描時間
- 🧹 **記錄清除** - 一鍵清除掃描記錄
- 📱 **響應式設計** - 適配各種螢幕尺寸
- 🔧 **API 整合準備** - 內建 API 呼叫功能（可選擇性啟用）

## 🚀 快速開始

### 系統需求

- **Android 裝置** 配備 NFC 功能
- **Chrome 瀏覽器** (Android 版)
- NFC 必須開啟

### 安裝與使用

1. **下載專案**

   ```bash
   git clone https://github.com/tbdavid2019/nfc-scanner.git
   cd nfc-scanner
   ```

2. **啟動服務**
   
   使用 Live Server 或任何 HTTP 伺服器：

   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 或使用 Node.js
   npx http-server
   ```

3. **開啟應用程式**
   
   在 Android Chrome 瀏覽器中開啟 `http://localhost:8000`

4. **開始掃描**
   - 允許 NFC 權限
   - 將 NFC 卡片靠近裝置背面
   - 查看掃描結果

## 📂 專案結構

```text
nfc-scanner/
├── index.html      # 主頁面
├── script.js       # NFC 掃描邏輯
├── style.css       # 樣式設定
└── README.md       # 專案說明
```

## 🔧 配置選項

### API 整合

在 `script.js` 中可以啟用 API 功能：

```javascript
// 設定為 true 啟用 API 呼叫
const useApi = false;
```

當啟用時，系統會嘗試向 API 端點發送請求以獲取額外的卡片資訊。

### 自訂 API 端點

修改 `script.js` 中的 API URL：

```javascript
fetch(`https://your-api-endpoint.com/card-info?uid=${serialNumber}`)
```

## 🛠️ 技術規格

- **前端技術**: HTML5, CSS3, Vanilla JavaScript
- **API 標準**: Web NFC API
- **瀏覽器支援**: Chrome for Android (89+)
- **NFC 標準**: NDEF (NFC Data Exchange Format)

## 📱 瀏覽器支援

| 瀏覽器 | 平台 | 支援狀態 |
|--------|------|----------|
| Chrome | Android | ✅ 支援 |
| Firefox | Android | ❌ 不支援 |
| Safari | iOS | ❌ 不支援 |
| Edge | Windows | ❌ 不支援 |

## 🔒 隱私與安全

- 所有 NFC 資料僅在本地處理
- 不會儲存或傳輸敏感資訊
- 需要使用者明確授權 NFC 權限

## 🐛 常見問題

### 問題：顯示「您的瀏覽器不支援 Web NFC」

**解決方案**: 請使用 Android 版 Chrome 瀏覽器

### 問題：無法掃描 NFC 卡片

**解決方案**:

1. 確認裝置 NFC 功能已開啟
2. 確認已授權網站 NFC 權限
3. 將卡片靠近裝置 NFC 感應區域

### 問題：權限被拒絕

**解決方案**: 點擊頁面任何地方重新申請權限

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！


## 👨‍💻 作者

**DAVID** - [GitHub](https://github.com/tbdavid2019)

---

⭐ 如果這個專案對你有幫助，請給它一個星星！
