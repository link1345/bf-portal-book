---
title: "附錄 B：範例程式說明“GolmudTrainExample（列車控制）”"
free: true
---

# GolmudTrainExample 展示什麼

`GolmudTrainExample` 是從 Portal 腳本控制 `Railway to Golmud` (`MP_GolmudRailway`) 列車的範例。
這不是普通的物件移動，而是學習 SDK 提供的列車專用事件和函式。

# 主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `GolmudTrainExample.ts` | 列車操作、InteractPoint、HUD、WorldIcon 更新的主體 |
| `GolmudTrainExample.tscn` | 放置 InteractPoint、WorldIcon、CapturePoint 等物件的 Spatial Editor 場景 |
| `GolmudTrainExample.strings.json` | 字串鍵 |
| `README_GolmudTrainExample.ts` | 列車變體、事件、CapturePoint 連動的說明 |

# 列車 API

SDK 1.3.2.0 中可以確認以下列車 API 和事件。

| 名稱 | 作用 |
| ---- | ---- |
| `mod.GolmudTrainSendMoveCommand(...)` | 向列車傳送移動或停止命令 |
| `mod.GolmudTrainMoveCommands.MoveWest` | 向西移動 |
| `mod.GolmudTrainMoveCommands.Stop` | 停止 |
| `mod.GolmudTrainMoveCommands.MoveEast` | 向東移動 |
| `mod.GetGolmudTrainLocation()` | 以 `Vector` 取得目前列車位置 |
| `OnGolmudTrainStopped(...)` | 列車停止時呼叫的事件 |
| `mod.GolmudTrainStopReason.ReachedEastTerminal` | 到達東端 |
| `mod.GolmudTrainStopReason.ReachedWestTerminal` | 到達西端 |
| `mod.GolmudTrainStopReason.StoppedInTransit` | 中途停止 |

# 處理流程

這個範例透過 InteractPoint 向列車傳送 `MoveWest`、`Stop`、`MoveEast`。
列車加速和減速大約需要 6 秒，因此範例會在這段時間停用 InteractPoint，避免連續輸入讓命令重疊。

`UpdateTrainLocation` 會以較短週期讀取 `mod.GetGolmudTrainLocation()`，並更新 WorldIcon 的位置和距離顯示。
可以把它當作在遊戲內 UI 中顯示列車目前位置的範例來讀。

# 移動的 CapturePoint

README 說明，如果在 CapturePoint 側啟用 `ConnectedToGolmudTrain`，該目標點會隨列車一起移動。
Team 1 佔領時列車向西，Team 2 佔領時列車向東，變為中立時列車停止。

這和普通的 `MoveObject` 不同。
與列車連動的 CapturePoint，需要讓場景側的位置、尺寸、朝向和 ObjID 保持一致，才容易維護。

# 注意點

列車依賴 Portal Web 側的設定，可以選擇 Moving Train、兩種 Static Train，或沒有列車。
如果目標地圖或列車設定不匹配，只放腳本也不會按預期運行。

列車也不會排隊執行命令。
在加速或減速中傳送下一條命令，並不會自動堆疊執行。請像範例一樣加入約 6 秒的輸入抑制。

# 結論

`GolmudTrainExample` 是 `MP_GolmudRailway` 專用功能的範例。
掌握讀取列車位置、傳送移動命令、在列車停止事件中更新 HUD、製作隨列車移動的 CapturePoint 這四點即可。

