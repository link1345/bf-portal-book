---
title: "附錄 B：範例程式說明“GibraltarGrandprix（地面賽）”"
free: true
---

# 遊戲概述

`GibraltarGrandprix` 是基於檢查點的地面競速範例。
這個範例以 Gibraltar 為舞台，採用大獎賽形式，你可以檢查檢查點、車輛、名次 UI 和倒數計時。

# 主要內容

* 在 `RaceTrack` 和 `Checkpoint` 定義賽道資料。
* 在 `TrackData` 管理整個競速狀態。
* 在 `PlayerProfile` 上管理每位玩家的圈數、檢查點和排名。
* 在 `VehicleHandler` 管理車輛分配和車輛狀態。
* 在 `HoH_CheckpointWorldIconsHolder` 管理下一個檢查點的顯示。
* 處理比賽中的事件：`OnVehicleSpawned`、`OnPlayerDeployed`、`OnPlayerDied` 等。
* 在 `OnPlayerUIButtonEvent` 接收車輛選擇等 UI 操作。

# 閱讀順序

## 1. 查看路線定義

首先看一下 `RaceTrack`、`Checkpoint`、`tracks` 的流程。

在競速遊戲中，「如何將賽道儲存為資料」比邏輯本身更重要。請確認檢查點的位置、方向、圈數是如何轉換為資料的。

## 2. 查看 TrackData

`TrackData` 是保存一場競速狀態的類別。

它是追蹤誰在參加、比賽是否已經開始、是否已有獲勝者、是否正在倒數計時的核心位置。

## 3. 查看 UI 和車輛

在比賽中，你需要向玩家展示他們接下來在哪裡、現在在哪裡以及比賽何時開始。

檢查哪個類別負責 WorldIcon、記分板 UI、開始倒數計時和車輛選擇 UI。

# 小技巧

`GibraltarGrandprix` 是一個競速範例。

# 結論

`GibraltarGrandprix` 是檢查點遊戲的絕佳素材。

透過分別閱讀賽道資料、參賽者管理、車輛管理、排名 UI，也可以把這種寫法應用到競速以外的「按順序通過目標」的模式。
