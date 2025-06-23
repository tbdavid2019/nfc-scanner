const resetButton = document.getElementById('resetButton');
const log = document.getElementById('log');
const status = document.getElementById('status');

// 功能開關：是否呼叫 API 獲取額外資訊
const useApi = false;

// 檢查瀏覽器是否支援 Web NFC
if (!('NDEFReader' in window)) {
    status.textContent = '您的瀏覽器不支援 Web NFC。請在 Android 版 Chrome 中嘗試。';
    status.style.color = 'red';
} else {
    // 建立 NDEFReader 實例
    const ndef = new NDEFReader();
    let isScanning = false;

    // 頁面載入後自動嘗試初始化
    initNFC();

    resetButton.addEventListener('click', () => {
        log.textContent = '';
        resetButton.style.display = 'none';
    });

    // 如果權限被拒絕，讓用戶點擊頁面任何地方重新嘗試
    document.body.addEventListener('click', () => {
        if (!isScanning) {
            initNFC();
        }
    });

    async function initNFC() {
        if (isScanning) return;

        try {
            status.textContent = '正在啟動 NFC 掃描...';
            status.style.color = 'orange';
            
            await ndef.scan();
            
            // 成功啟動掃描
            isScanning = true;
            status.textContent = '請將 NFC 卡片靠近您的裝置';
            status.style.color = 'green';
            document.body.style.cursor = 'default';

            ndef.onreadingerror = () => {
                status.textContent = '讀取 NFC 卡片時發生錯誤，請重新嘗試';
                status.style.color = 'red';
                setTimeout(() => {
                    if (isScanning) {
                        status.textContent = '請將 NFC 卡片靠近您的裝置';
                        status.style.color = 'green';
                    }
                }, 3000);
            };

            ndef.onreading = ({ message, serialNumber }) => {
                resetButton.style.display = 'inline-block';
                
                let output = `> 掃描時間: ${new Date().toLocaleString()}\n`;
                output += `> 卡片 UID: ${serialNumber}\n`;

                if (useApi) {
                    // 當 useApi 為 true 時，執行這段邏輯
                    fetch(`https://api.example.com/card-info?uid=${serialNumber}`)
                        .then(response => response.json())
                        .then(data => {
                            output += `> 持卡人: ${data.holderName}\n`;
                            output += `> 其他資訊: ${data.otherInfo}\n`;
                            output += '─'.repeat(40) + '\n';
                            log.textContent = output + log.textContent;
                        })
                        .catch(error => {
                            console.error('API 錯誤:', error);
                            output += '> 無法從 API 獲取額外資訊。\n';
                            output += '─'.repeat(40) + '\n';
                            log.textContent = output + log.textContent;
                        });
                } else {
                    // 當 useApi 為 false 時，只顯示 UID
                    output += '─'.repeat(40) + '\n';
                    log.textContent = output + log.textContent;
                }
                
                // 短暫顯示掃描成功狀態
                const originalStatus = status.textContent;
                const originalColor = status.style.color;
                status.textContent = '✓ 卡片掃描成功！';
                status.style.color = 'blue';
                setTimeout(() => {
                    status.textContent = originalStatus;
                    status.style.color = originalColor;
                }, 2000);
            };
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                status.textContent = '⚠️ 需要 NFC 權限才能使用，請點擊頁面任何地方授權';
                status.style.color = 'orange';
                document.body.style.cursor = 'pointer';
            } else {
                status.textContent = `錯誤: ${error.message}`;
                status.style.color = 'red';
            }
        }
    }
}
