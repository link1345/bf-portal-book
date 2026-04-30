---
title: "附錄 B：範例程式說明“_StartHere_BasicTemplate（最先閱讀的基本形）”"
free: true
---

# 遊戲概述

`_StartHere_BasicTemplate` 是一個最小模板，總結了 Portal TypeScript 的入口。

這不是一個完整的遊戲模式，而是用來了解有哪些事件函數、基本 API 如何呼叫的範例。它是你應該最先閱讀的範例。

# 主要內容

* 與玩家相關的事件，例如 `OnPlayerJoinGame`、`OnPlayerLeaveGame`、`OnPlayerDeployed`。
* 適用於 Godot 放置的事件，例如 `OnPlayerInteract`、`OnPlayerEnterAreaTrigger`、`OnPlayerExitAreaTrigger`。
* 整個遊戲模式的入口，如 `OnGameModeStarted`、`OngoingGlobal` 等。
* 基本 API，例如 `GetObjId`、`GetTeam`、`Message`、`CreateVector`、`Wait`。

# 閱讀順序

## 1. 查看事件函數

以 `export function On...` 形式編寫的函數，是從 Portal 端呼叫的入口點。

首先，查看註解，確認它們會在什麼時機被呼叫。理解這裡之後，就能知道處理應該寫在哪裡。

## 2. 查看與 Godot 配置物的連結

`OnPlayerInteract` 和 `OnPlayerEnterAreaTrigger` 連接到 Godot 中的 `InteractPoint` 和 `AreaTrigger`。

被按下的物件、進入的區域是哪一個，要用 `mod.GetObjId(...)` 確認。請務必和第 4 章的 ObjId 台帳一起閱讀。

## 3. 查看常用API

`OnGameModeStarted` 包含你想要先學習的 API。

| API | 如何使用 |
| ---- | ---- |
| `mod.EnableHQ` | 啟用 / 停用 HQ |
| `mod.EnableGameModeObjective` | 啟用 / 停用目標 |
| `mod.GetObjId` | 檢查已放置的物品和玩家 ID |
| `mod.CreateVector` | 建立座標、顏色等三要素 |
| `mod.Message` | 建立顯示用訊息 |
| `mod.DisplayNotificationMessage` | 顯示通知訊息 |
| `mod.Wait` | 等待指定秒數 |
| `mod.Teleport` | 移動玩家 |
| `mod.GetSoldierState` | 取得玩家狀態 |

# 小技巧

這個範本不是要全部照搬使用。僅將必要的事件函數移至 `mods/Script.ts` 並調整 ObjId 和訊息以適合你的模式。

透過練習僅使用 `OnGameModeStarted` 和 `OnPlayerInteract` 按下開始按鈕來開始是安全的。

# 結論

`_StartHere_BasicTemplate` 是 Portal TypeScript 的類似字典的範例。

在建立遊戲之前，請先在這裡確認事件函數、ObjId 參照、訊息、座標和等待處理的形式。讀完這個再繼續閱讀其他範例，整體結構會清楚很多。
