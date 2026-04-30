---
title: "附錄 B：範例程式說明“AcePursuit（競速/時間生存）”"
free: true
---

# 遊戲概述

`AcePursuit` 是使用飛機進行競速/時間生存的範例。

它擁有大型遊戲模式所需的所有元素，例如檢查點、圈數、車輛選擇、名次 UI、開始/結束倒數計時等。

# 主要內容

* 在 `RaceTrack`、`Checkpoint`、`Vector3` 定義賽道資料。
* 在 `GameType` 上切換競速和時間生存。
* 在 `TrackData` 管理整體比賽狀態、參與者、獲勝者和倒數計時。
* 在 `PlayerProfile` 上管理每位玩家的車輛、圈數、時間和 UI 狀態。
* 在 UI 類別中顯示車輛選擇、排名、圈數和剩餘時間。
* 使用 SFX 和 WorldIcon 顯示檢查點通過和狀態變化。
* 檢查離開或失效的玩家，並清理 UI 和車輛。

# 閱讀順序

## 1. 查看路線定義

首先看一下 `RaceTrack`、`Checkpoint`、`tracks` 的流程。

在飛機比賽中，首先重要的是要去哪裡、按什麼順序、跑多少圈。請確保你有檢查點位置、方向和校正標誌作為資料。

## 2. 查看 TrackData

`TrackData` 是保存一場競速狀態的核心類別。

參賽者、獲勝者、開始倒數、結束倒數、遊戲類型、可選擇的飛機等都集中在這裡。如果你想知道比賽目前處於什麼狀態，請從 `TrackData` 開始追。

## 3. 查看 PlayerProfile 和 UI

每位玩家的狀態都集中在 `PlayerProfile` 中。

每位玩家的車輛選擇、駕駛時間、圈數、排名和記分板顯示都會變化。按 `TrackData` 看整體、`PlayerProfile` 看個人、UI 類別看顯示，就不容易迷路。

## 4. 查看結束處理和離開處理

`Winner`、`PlayerCompletedTrack`、`PlayerLeftGame` 等是決定比賽如何結束的重要處理。

對於較大的模式，結束處理比啟動處理更容易出問題。請檢查獲勝者確定、所有人完成比賽、中途離開、關閉 UI、移除車輛的順序。

# 小技巧

`AcePursuit` 在開頭附近分組了常數。

將 `VERSION`、`debugPlayer`、`MinimumPlayerToStart`、`MapPlayers` 等調整值以及各種倒數值放在頂部，將更容易區分測試版本並調整平衡。

還值得注意的是，競速和時間生存是透過 `GameType` 區分的。遊戲類型增加時，與其到處寫條件分支，不如先固定表示狀態和類型的值，這樣會更容易閱讀。

# 結論

`AcePursuit` 是讀取具有狀態的較大遊戲模式的範例。

不要一開始就鑽進 UI 細節裡，先按路線定義、`TrackData`、`PlayerProfile`、獲勝者判定和離開處理的順序閱讀即可。它也可以應用到競速以外的模式，例如按順序通過目標的模式，或每位參與者都有進度的模式。
