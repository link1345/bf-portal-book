---
title: "附錄 B：範例程式說明「PortalPerformanceExample（效能測量）」"
free: true
---

# PortalPerformanceExample 要看什麼

`PortalPerformanceExample` 是確認 Portal 邏輯和伺服器端遊戲處理平均影格時間的範例。
可以學習如何把 SDK 1.3.3.0 新增的 Performance API 顯示到偵錯 HUD 或日誌中。

# 包含的主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `PortalPerformanceExample.ts` | 平均影格時間取得和顯示處理 |
| `PortalPerformanceExample.tscn` | 效能確認用配置範例 |
| `PortalPerformanceExample.strings.json` | HUD 和通知用文字 |
| `README_PortalPerformanceExample.md` | 數值閱讀方法和注意點 |

# 效能測量 API

| 名稱 | 作用 |
| ---- | ---- |
| `mod.GetPortalAverageFrameTime()` | 取得 Portal 邏輯的平均影格時間 |
| `mod.GetServerAverageFrameTime()` | 取得伺服器端遊戲處理的平均影格時間 |

兩者都是查看最近歷史平均值的函式。
它們不是每個影格的瞬間值，所以不要理解為加了一次處理後數字一定立刻跳變。

# 處理流程

範例以一定間隔讀取平均影格時間，並顯示到 UI 或通知中。
在加入較重處理前後比較數值，就容易區分是 Portal 邏輯較重，還是伺服器端遊戲處理較重。

測試 `OngoingGlobal`、`OngoingPlayer`、大量 `AllPlayers()` / `AllVehicles()`、大量 Spawn 時尤其適合使用。

# 注意點

效能測量本身不要每個影格重度執行。
顯示更新請間隔到 1 秒或數秒一次。

數字只是尋找原因的入口。
數值變差時，按順序檢查最近增加的 Ongoing、陣列迴圈、Spawn 和 UI 建立。

# 結論

`PortalPerformanceExample` 是避免製作過重 Portal 模式的計量範例。
一邊看平均影格時間，一邊及早判斷是否需要減少 Ongoing、重用 UI、避免一次生成太多物件。

