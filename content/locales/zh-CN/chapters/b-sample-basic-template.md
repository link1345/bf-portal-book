---
title: "附录B：示例程序说明“_StartHere_BasicTemplate（首先阅读的基本形式）”"
free: true
---

::::message
本附录目前只是粗略的机器翻译，文字可能非常不自然。我之后会认真修改，暂时请多包涵。
::::

# 游戏概述

`_StartHere_BasicTemplate` 是一个最小模板，总结了 Portal TypeScript 的入口。

这不是一个完整的游戏模式，而是一个示例，旨在了解有哪些事件函数以及如何调用哪些 API。这是您应该首先阅读的示例。

# 主要内容

* 与玩家相关的事件，例如 `OnPlayerJoinGame`、`OnPlayerLeaveGame`、`OnPlayerDeployed`。
* 适用于 Godot 放置的事件，例如 `OnPlayerInteract`、`OnPlayerEnterAreaTrigger`、`OnPlayerExitAreaTrigger`。
* 整个游戏模式的入口，如`OnGameModeStarted`、`OngoingGlobal`等
* 基本 API，例如 `GetObjId`、`GetTeam`、`Message`、`CreateVector`、`Wait`。

# 阅读顺序

## 1. 查看事件函数

以 `export function On...` 形式编写的函数是从 Portal 端调用的入口点。

首先，查看评论，看看什么时候会被调用。一旦理解了这一点，你就会知道该处理该写在哪里。

## 2 . 查看与 Godot 放置的联系

`OnPlayerInteract` 和 `OnPlayerEnterAreaTrigger` 连接到位于 Godot 中的 `InteractPoint` 和 `AreaTrigger`。

在 `mod.GetObjId(...)` 上检查按下的内容以及进入的区域。请务必将其与第 4 章中的 ObjId 分类帐一起查看。

## 3. 查看常用API

`OnGameModeStarted` 包含您想要首先学习的 API。

|应用程序接口 |如何使用 |
| ---- | ---- |
| `mod.EnableHQ` | `mod.EnableHQ` |启用/禁用总部 |
| `mod.EnableGameModeObjective` | `mod.EnableGameModeObjective` |启用/禁用目标 |
| `mod.GetObjId` | `mod.GetObjId` |检查已放置的物品和玩家 ID |
| `mod.CreateVector` | `mod.CreateVector` |创建坐标、颜色等三要素 |
| `mod.Message` | `mod.Message` |创建显示消息 |
| `mod.DisplayNotificationMessage` | `mod.DisplayNotificationMessage` |发出通知消息 |
| `mod.Wait` | `mod.Wait` |等待指定秒数 |
| `mod.Teleport` | `mod.Teleport` |移动播放器|
| `mod.GetSoldierState` | `mod.GetSoldierState` |获取玩家状态 |

# 提示

该模板不适合按原样使用。仅将必要的事件函数移至 `mods/Script.ts` 并调整 ObjId 和消息以适合您的模式。

通过练习仅使用 `OnGameModeStarted` 和 `OnPlayerInteract` 按下开始按钮来开始是安全的。

# 结论

`_StartHere_BasicTemplate` 是 Portal TypeScript 的类似字典的示例。

在创建游戏之前，请仅在此处检查事件函数、ObjId 引用、消息、坐标和等待处理表单。如果您阅读本文并继续阅读其他示例，您的前景会突然变得更好。
