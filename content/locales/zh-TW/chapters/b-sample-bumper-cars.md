---
title: "附錄B：範例程式說明“BumperCars（車輛小遊戲）”"
free: true
---

# 遊戲概述

`BumperCars` 是使用車輛的小型迷你遊戲的範例。

它包含了製作小遊戲的基本要素，例如玩家裝備限制、車輛管理、Ready Up、遊戲狀態、UI顯示等。

# 主要內容

* 遊戲初始化、AutoSpawn 設定和 InteractPoint 控制位於 `OnGameModeStarted`。
* 刪除武器並限制火力輸入 `OnPlayerDeployed`。
* 在 `OnVehicleSpawned` 的遊戲管理中新增了出現的車輛。
* 在 `OnPlayerInteract` 接收 Ready Up 和偵錯操作。
* 使用 `GameState` 和 `HoH_GameHandler` 追蹤進度。
* 在 `PlayerProfile` 管理每位玩家的狀態。
* 在 UI 類別中管理倒數計時、獲勝者顯示和記分板。

# 閱讀順序

## 1. 查看入口事件

首先，只讀取檔案開頭的事件函數。

`OnGameModeStarted`、`OnPlayerDeployed`、`OnVehicleSpawned`、`OnPlayerInteract` 是遊戲進度的入口。

## 2. 查看遊戲狀態

`GameState` 表示該模式目前處於哪個階段。

是在準備期間、開始計數期間還是在比賽期間？如果您查看此處，您可以看到事件應在哪種狀態下傳遞。

## 3 . 查看玩家資料

每位玩家的狀態都發佈在 `PlayerProfile` 上。

在玩家加入、離開、死亡或重生的遊戲中，將玩家資訊收集在一處可以更輕鬆地進行追蹤。

# 提示

重要的是，`OnPlayerDeployed` 刪除了武器並限制了火力輸入。

在載具小遊戲中，如果繼續正常的FPS操作，遊戲玩法就會被破壞。首先擦除該模式不需要的輸入和裝置會更安全。

# 結論

`BumperCars` 是一個範例，展示了迷你遊戲 Portal 模式的框架。

當您想同時了解車輛、Ready Up、狀態管理、UI 和玩家管理時，值得一讀。
