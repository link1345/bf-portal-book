---
title: "附录B：示例程序说明“直布罗陀大奖赛（地面赛）”"
free: true
---

::::message
本附录目前只是粗略的机器翻译，文字可能非常不自然。我之后会认真修改，暂时请多包涵。
::::

# 游戏概述

`GibraltarGrandprix` 是基于检查点的地面竞赛示例。
作为在直布罗陀设置的大奖赛格式，您可以检查检查站、车辆、排名 UI 和倒计时。

# 主要内容

* 在 `RaceTrack` 和 `Checkpoint` 定义课程数据。
* 在 `TrackData` 管理整个竞赛状态。
* 在 `PlayerProfile` 上管理每个玩家的圈数、检查点和排名。
* 在 `VehicleHandler` 管理车辆分配和车辆状态。
* 管理下一个检查点显示，网址为 `HoH_CheckpointWorldIconsHolder`。
* 处理比赛中的事件：`OnVehicleSpawned`、`OnPlayerDeployed`、`OnPlayerDied` 等。
* 在 `OnPlayerUIButtonEvent` 接收车辆选择等 UI 操作。

# 阅读顺序

## 1. 查看课程定义

首先看一下`RaceTrack`、`Checkpoint`、`tracks`的流程。

在赛车游戏中，“如何将赛道存储为数据”比逻辑更重要。请务必将检查点的位置、方向、圈数转换为数据。

## 2. 查看轨迹数据

`TrackData` 是一个具有一个种族状态的类。

它将成为跟踪谁参加、比赛是否尚未开始、是否有获胜者以及比赛是否正在倒计时的焦点。

## 3. 查看UI和车辆

在比赛中，您需要向玩家展示他们接下来在哪里、现在在哪里以及比赛何时开始。

检查哪个类负责 WorldIcon、记分板 UI、开始倒计时和车辆选择 UI。

# 提示

`GibraltarGrandprix` 是一个竞赛样本。

# 结论

`GibraltarGrandprix` 是检查点游戏的绝佳材料。

通过分别读取赛道数据、参赛者管理、车辆管理、排名UI，还可以应用于比赛以外的“按目标排序模式”。
