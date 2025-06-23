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
    // 建立 NDEFReader 實例並自動開始掃描
    const ndef = new NDEFReader();
    
    // 頁面載入後自動初始化掃描
    initNFCScanning();

    resetButton.addEventListener('click', () => {
        log.textContent = '';
        resetButton.style.display = 'none';
    });

    async function initNFCScanning() {
        try {
            status.textContent = '正在啟動 NFC 掃描器...';
            status.style.color = 'orange';
            
            await ndef.scan();
            status.textContent = '請將 NFC 卡片靠近您的裝置';
            status.style.color = 'green';

            ndef.onreadingerror = () => {
                status.textContent = '讀取 NFC 卡片時發生錯誤，請重新嘗試';
                status.style.color = 'red';
                setTimeout(() => {
                    status.textContent = '請將 NFC 卡片靠近您的裝置';
                    status.style.color = 'green';
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
                            log.textContent = output + log.textContent; // 新記錄顯示在最上方
                        })
                        .catch(error => {
                            console.error('API 錯誤:', error);
                            output += '> 無法從 API 獲取額外資訊。\n';
                            output += '─'.repeat(40) + '\n';
                            log.textContent = output + log.textContent; // 新記錄顯示在最上方
                        });
                } else {
                    // 當 useApi 為 false 時，只顯示 UID
                    output += '─'.repeat(40) + '\n';
                    log.textContent = output + log.textContent; // 新記錄顯示在最上方
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
            status.textContent = `錯誤: ${error}`;
            status.style.color = 'red';
        }
    }
}
