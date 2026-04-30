---
title: "附錄 B：範例程式說明“BumperCars（車輛小遊戲）”"
free: true
---

# 遊戲概述

`BumperCars` 是使用車輛的小型迷你遊戲的範例。

它包含了製作小遊戲的基本要素，例如玩家裝備限制、車輛管理、Ready Up、遊戲狀態、UI顯示等。

# 主要內容

* 遊戲初始化、AutoSpawn 設定和 InteractPoint 控制位於 `OnGameModeStarted`。
* 在 `OnPlayerDeployed` 移除武器並限制開火輸入。
* 在 `OnVehicleSpawned` 將生成的車輛加入遊戲管理。
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

是在 Ready Up 階段、開始倒數階段，還是比賽中？看這裡就能知道事件應該在哪種狀態下通過。

## 3. 查看玩家資料

每位玩家的狀態都集中在 `PlayerProfile` 中。

在玩家加入、離開、死亡或重生的遊戲中，將玩家資訊收集在一處可以更輕鬆地進行追蹤。

# 小技巧

重要的是，`OnPlayerDeployed` 刪除了武器並限制了火力輸入。

在載具小遊戲中，如果保留普通 FPS 操作，遊戲玩法就會被破壞。先移除這個模式不需要的輸入和裝備會更安全。

# 結論

`BumperCars` 是一個範例，展示了迷你遊戲 Portal 模式的框架。

當你想同時了解車輛、Ready Up、狀態管理、UI 和玩家管理時，值得一讀。
