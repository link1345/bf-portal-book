---
title: "附录 B：示例程序说明“AcePursuit（竞速/时间生存）”"
free: true
---

# 游戏概述

`AcePursuit` 是使用飞机进行竞速/时间生存的示例。

它拥有大型游戏模式所需的所有元素，例如检查点、圈数、车辆选择、名次 UI、开始/结束倒计时等。

# 主要内容

* 在 `RaceTrack`、`Checkpoint`、`Vector3` 定义赛道数据。
* 在 `GameType` 上切换竞速和时间生存。
* 在 `TrackData` 管理整体比赛状态、参与者、获胜者和倒计时。
* 在 `PlayerProfile` 上管理每个玩家的车辆、圈数、时间和 UI 状态。
* 在 UI 类中显示车辆选择、排名、圈数和剩余时间。
* 使用 SFX 和 WorldIcon 显示检查点通过和状态变化。
* 检查离开或失效的玩家，并清理 UI 和车辆。

# 阅读顺序

## 1. 查看路线定义

首先看一下 `RaceTrack`、`Checkpoint`、`tracks` 的流程。

在飞机比赛中，首先重要的是去哪里、按什么顺序以及跑多少圈。请确保你有检查点位置、方向和校正标志作为数据。

## 2. 查看 TrackData

`TrackData` 是保存一场竞速状态的核心类。

参赛者、获胜者、开始倒计时、结束倒计时、游戏类型、可选择的飞机等都集中在这里。如果你想知道比赛当前处于什么状态，请从 `TrackData` 开始追。

## 3. 查看 PlayerProfile 和 UI

每个玩家的状态都集中在 `PlayerProfile` 中。

每个玩家的车辆选择、驾驶时间、圈数、排名和记分板显示都会变化。按 `TrackData` 看整体、`PlayerProfile` 看个人、UI 类看显示，就不容易迷路。

## 4. 查看结束处理和离开处理

`Winner`、`PlayerCompletedTrack`、`PlayerLeftGame` 等是决定比赛如何结束的重要处理。

对于较大的模式，结束处理比启动处理更容易出问题。请检查获胜者确定、所有人完成比赛、中途离开、关闭 UI、移除车辆的顺序。

# 小技巧

`AcePursuit` 在开头附近分组了常量。

通过将 `VERSION`、`debugPlayer`、`MinimumPlayerToStart`、`MapPlayers` 等调整值以及各种倒计时值放在顶部，将更容易区分测试版本并调整平衡。

还值得注意的是，竞速和时间生存是通过 `GameType` 区分的。游戏类型增加时，与其到处写条件分支，不如先固定表示状态和类型的值，这样会更容易阅读。

# 结论

`AcePursuit` 是读取带有状态的较大游戏模式的示例。

不要一开始就钻进 UI 细节里，先按路线定义、`TrackData`、`PlayerProfile`、获胜者判定和离开处理的顺序阅读即可。它也可以应用到竞速以外的模式，例如按顺序通过目标的模式，或每个参与者都有进度的模式。
