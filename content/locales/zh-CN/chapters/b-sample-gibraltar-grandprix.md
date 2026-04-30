---
title: "附录 B：示例程序说明“GibraltarGrandprix（地面赛）”"
free: true
---

# 游戏概述

`GibraltarGrandprix` 是基于检查点的地面竞速示例。
这个示例以 Gibraltar 为舞台，采用大奖赛形式，你可以检查检查点、车辆、名次 UI 和倒计时。

# 主要内容

* 在 `RaceTrack` 和 `Checkpoint` 定义赛道数据。
* 在 `TrackData` 管理整个竞速状态。
* 在 `PlayerProfile` 上管理每个玩家的圈数、检查点和排名。
* 在 `VehicleHandler` 管理车辆分配和车辆状态。
* 在 `HoH_CheckpointWorldIconsHolder` 管理下一个检查点的显示。
* 处理比赛中的事件：`OnVehicleSpawned`、`OnPlayerDeployed`、`OnPlayerDied` 等。
* 在 `OnPlayerUIButtonEvent` 接收车辆选择等 UI 操作。

# 阅读顺序

## 1. 查看路线定义

首先看一下 `RaceTrack`、`Checkpoint`、`tracks` 的流程。

在竞速游戏中，“如何将赛道存储为数据”比逻辑本身更重要。请确认检查点的位置、方向、圈数是如何转换为数据的。

## 2. 查看 TrackData

`TrackData` 是保存一场竞速状态的类。

它是追踪谁在参加、比赛是否已经开始、是否已有获胜者、是否正在倒计时的核心位置。

## 3. 查看 UI 和车辆

在比赛中，你需要向玩家展示他们接下来在哪里、现在在哪里以及比赛何时开始。

检查哪个类负责 WorldIcon、记分板 UI、开始倒计时和车辆选择 UI。

# 小技巧

`GibraltarGrandprix` 是一个竞速示例。

# 结论

`GibraltarGrandprix` 是检查点游戏的绝佳材料。

通过分别阅读赛道数据、参赛者管理、车辆管理、排名 UI，也可以把这种写法应用到竞速以外的“按顺序通过目标”的模式。
