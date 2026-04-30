---
title: "附录 B：示例程序说明“_StartHere_BasicTemplate（最先阅读的基本形）”"
free: true
---

# 游戏概述

`_StartHere_BasicTemplate` 是一个最小模板，总结了 Portal TypeScript 的入口。

这不是一个完整的游戏模式，而是用来了解有哪些事件函数、基本 API 如何调用的示例。它是你应该最先阅读的示例。

# 主要内容

* 与玩家相关的事件，例如 `OnPlayerJoinGame`、`OnPlayerLeaveGame`、`OnPlayerDeployed`。
* 适用于 Godot 放置的事件，例如 `OnPlayerInteract`、`OnPlayerEnterAreaTrigger`、`OnPlayerExitAreaTrigger`。
* 整个游戏模式的入口，如 `OnGameModeStarted`、`OngoingGlobal` 等。
* 基本 API，例如 `GetObjId`、`GetTeam`、`Message`、`CreateVector`、`Wait`。

# 阅读顺序

## 1. 查看事件函数

以 `export function On...` 形式编写的函数，是从 Portal 端调用的入口点。

首先，查看注释，确认它们会在什么时机被调用。理解这里之后，就能知道处理应该写在哪里。

## 2. 查看与 Godot 放置的联系

`OnPlayerInteract` 和 `OnPlayerEnterAreaTrigger` 连接到在 Godot 中配置的 `InteractPoint` 和 `AreaTrigger`。

被按下的对象、进入的区域是哪一个，要用 `mod.GetObjId(...)` 确认。请务必和第 4 章的 ObjId 台账一起阅读。

## 3. 查看常用API

`OnGameModeStarted` 包含你想要首先学习的 API。

| API | 如何使用 |
| ---- | ---- |
| `mod.EnableHQ` | 启用 / 禁用 HQ |
| `mod.EnableGameModeObjective` | 启用 / 禁用目标 |
| `mod.GetObjId` | 检查已放置的物品和玩家 ID |
| `mod.CreateVector` | 创建坐标、颜色等三要素 |
| `mod.Message` | 创建显示用消息 |
| `mod.DisplayNotificationMessage` | 显示通知消息 |
| `mod.Wait` | 等待指定秒数 |
| `mod.Teleport` | 移动玩家 |
| `mod.GetSoldierState` | 获取玩家状态 |

# 小技巧

这个模板不是要全部照搬使用。仅将必要的事件函数移至 `mods/Script.ts` 并调整 ObjId 和消息以适合你的模式。

通过练习仅使用 `OnGameModeStarted` 和 `OnPlayerInteract` 按下开始按钮来开始是安全的。

# 结论

`_StartHere_BasicTemplate` 是 Portal TypeScript 的类似字典的示例。

在创建游戏之前，请先在这里确认事件函数、ObjId 参照、消息、坐标和等待处理的形式。读完这个再继续阅读其他示例，整体结构会清晰很多。
