---
title: "附录B：示例程序说明“BumperCars（车辆小游戏）”"
free: true
---

::::message
本附录目前只是粗略的机器翻译，文字可能非常不自然。我之后会认真修改，暂时请多包涵。
::::

# 游戏概述

`BumperCars` 是使用车辆的小型迷你游戏的示例。

它包含了制作小游戏的基本要素，如玩家装备限制、车辆管理、Ready Up、游戏状态、UI显示等。

# 主要内容

* 游戏初始化、AutoSpawn 设置和 InteractPoint 控制位于 `OnGameModeStarted`。
* 删除武器并限制火力输入 `OnPlayerDeployed`。
* 在 `OnVehicleSpawned` 的游戏管理中添加了出现的车辆。
* 在 `OnPlayerInteract` 接收 Ready Up 和调试操作。
* 使用 `GameState` 和 `HoH_GameHandler` 跟踪进度。
* 在 `PlayerProfile` 管理每个玩家的状态。
* 在 UI 类中管理倒计时、获胜者显示和记分板。

# 阅读顺序

## 1. 查看入口事件

首先，只读取文件开头的事件函数。

`OnGameModeStarted`、`OnPlayerDeployed`、`OnVehicleSpawned`、`OnPlayerInteract` 是游戏进度的入口。

## 2. 查看游戏状态

`GameState` 表示该模式当前处于哪个阶段。

是在准备期间、在开始计数期间还是在比赛期间？如果您查看此处，您可以看到事件应在哪种状态下传递。

## 3 . 查看玩家资料

每个玩家的状态都发布在 `PlayerProfile` 上。

在玩家加入、离开、死亡或重生的游戏中，将玩家信息收集在一处可以更轻松地进行跟踪。

# 提示

重要的是，`OnPlayerDeployed` 删除了武器并限制了火力输入。

在载具小游戏中，如果继续正常的FPS操作，游戏玩法就会被破坏。首先擦除该模式不需要的输入和设备会更安全。

# 结论

`BumperCars` 是一个示例，展示了迷你游戏 Portal 模式的框架。

当您想同时了解车辆、Ready Up、状态管理、UI 和玩家管理时，值得一读。
