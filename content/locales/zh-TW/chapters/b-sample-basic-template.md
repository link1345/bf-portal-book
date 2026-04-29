---
title: "附錄B：範例程式說明“_StartHere_BasicTemplate（首先閱讀的基本形式）”"
free: true
---

# 遊戲概述

`_StartHere_BasicTemplate` 是一個最小模板，總結了 Portal TypeScript 的入口。

這不是一個完整的遊戲模式，而是一個範例，旨在了解有哪些事件函數以及如何呼叫哪些 API。這是您應該首先閱讀的範例。

# 主要內容

* 與玩家相關的事件，例如 `OnPlayerJoinGame`、`OnPlayerLeaveGame`、`OnPlayerDeployed`。
* 適用於 Godot 放置的事件，例如 `OnPlayerInteract`、`OnPlayerEnterAreaTrigger`、`OnPlayerExitAreaTrigger`。
* 整個遊戲模式的入口，如`OnGameModeStarted`、`OngoingGlobal`等
* 基本 API，例如 `GetObjId`、`GetTeam`、`Message`、`CreateVector`、`Wait`。

# 閱讀順序

## 1.查看事件函數

以 `export function On...` 形式編寫的函數是從 Portal 端呼叫的入口點。

首先，查看評論，看看什麼時候會被調用。一旦理解了這一點，你就會知道該處理該寫在哪裡。

## 2. 查看與 Godot 放置的聯繫

`OnPlayerInteract` 和 `OnPlayerEnterAreaTrigger` 連接到 Godot 中的 `InteractPoint` 和 `AreaTrigger`。

在 `mod.GetObjId(...)` 上檢查按下的內容以及進入的區域。請務必將其與第 4 章中的 ObjId 分類帳一起檢視。

## 3.查看常用API

`OnGameModeStarted` 包含您想要先學習的 API。

|應用程式介面 |如何使用 |
| ---- | ---- |
| `mod.EnableHQ` | `mod.EnableHQ` |啟用/停用總部 |
| `mod.EnableGameModeObjective` | `mod.EnableGameModeObjective` |啟用/停用目標 |
| `mod.GetObjId` | `mod.GetObjId` |檢查已放置的物品和玩家 ID |
| `mod.CreateVector` | `mod.CreateVector` |建立座標、顏色等三要素 |
| `mod.Message` | `mod.Message` |建立顯示訊息 |
| `mod.DisplayNotificationMessage` | `mod.DisplayNotificationMessage` |發出通知訊息 |
| `mod.Wait` | `mod.Wait` |等待指定秒數 |
| `mod.Teleport` | `mod.Teleport` |移動播放器|
| `mod.GetSoldierState` | `mod.GetSoldierState` |取得玩家狀態 |

# 提示

此模板不適合原樣使用。僅將必要的事件函數移至 `mods/Script.ts` 並調整 ObjId 和訊息以適合您的模式。

透過練習僅使用 `OnGameModeStarted` 和 `OnPlayerInteract` 按下開始按鈕來開始是安全的。

# 結論

`_StartHere_BasicTemplate` 是 Portal TypeScript 的類似字典的範例。

在建立遊戲之前，請僅在此處檢查事件函數、ObjId 引用、訊息、座標和等待處理表單。如果您閱讀本文並繼續閱讀其他範例，您的前景會突然變得更好。
