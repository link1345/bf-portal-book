---
title: "附錄B：範例程式說明“直布羅陀大獎賽（地面賽）”"
free: true
---

# 遊戲概述

`GibraltarGrandprix` 是基於檢查點的地面競賽範例。
作為在直布羅陀設定的大獎賽格式，您可以檢查檢查站、車輛、排名 UI 和倒數計時。

# 主要內容

* 在 `RaceTrack` 和 `Checkpoint` 定義課程資料。
* 在 `TrackData` 管理整個競賽狀態。
* 在 `PlayerProfile` 上管理每位玩家的圈數、檢查點和排名。
* 在 `VehicleHandler` 管理車輛分配和車輛狀態。
* 管理下一個檢查點顯示，網址為 `HoH_CheckpointWorldIconsHolder`。
* 處理比賽中的事件：`OnVehicleSpawned`、`OnPlayerDeployed`、`OnPlayerDied` 等。
* 在 `OnPlayerUIButtonEvent` 接收車輛選擇等 UI 操作。

# 閱讀順序

## 1.查看課程定義

首先先來看看`RaceTrack`、`Checkpoint`、`tracks`的流程。

在賽車遊戲中，「如何將賽道儲存為數據」比邏輯更重要。請務必將檢查點的位置、方向、圈數轉換為資料。

## 2.查看軌跡數據

`TrackData` 是一個具有一個種族狀態的類別。

它將成為追蹤誰參加、比賽是否尚未開始、是否有獲勝者以及比賽是否正在倒數計時的焦點。

## 3.查看UI和車輛

在比賽中，您需要向玩家展示他們接下來在哪裡、現在在哪裡以及比賽何時開始。

檢查哪個類別負責 WorldIcon、記分板 UI、開始倒數計時和車輛選擇 UI。

# 提示

`GibraltarGrandprix` 是一個競賽樣本。

# 結論

`GibraltarGrandprix` 是檢查點遊戲的絕佳素材。

透過分別讀取賽道資料、參賽者管理、車輛管理、排名UI，還可以應用於比賽以外的「按目標排序模式」。
