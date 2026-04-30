---
title: "附录 B：示例程序说明“FixedCameraExample（固定相机和 UI 按钮）”"
free: true
---

# 游戏概述

`FixedCameraExample` 是从 UI 按钮切换放置在 Godot 中的固定相机的示例。

当你想要在活动开始前创建镜头演出、类似观战者的视角或高光展示时，这非常有用。

# 主要内容

* 在 `OnGameModeStarted` 开始 UI 创建和相机移动过程。
* 在 `OnPlayerUIButtonEvent` 判断按下了哪个 UI 按钮。
* 用 `mod.SetCameraTypeForPlayer` 将玩家相机切换为固定相机。
* 用 `mod.MoveObjectOverTime`、`mod.SetObjectTransformOverTime` 移动相机。
* 使用 `AddUIContainer`、`AddUIButton`、`AddUIText` 组装 UI。

# 阅读顺序

## 1. 查看 UI 按钮事件

`OnPlayerUIButtonEvent` 是按下 UI 按钮时的入口点。

它会通过 `mod.GetUIWidgetName(eventUIWidget)` 取得被按下按钮的名称，并分支到 `StreetButton`、`HQ1Button`、`ReturnButton` 等处理。

## 2. 查看相机切换

切换到固定相机采用以下形式：

```ts
mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.Fixed, 0);
```

最后一个数字对应于 Godot 端分配给固定相机的 ObjId。换句话说，相机也是使用第 4 章中的 ObjId 账本进行管理的。

## 3. 观察相机运动

`StartFlyThroughCamera` 会让固定相机随着时间移动。

通过使用 `SetObjectTransformOverTime`，你可以创建一个缓慢移动的演出镜头，而不只是固定视点。

# 小技巧

返回按钮可带你返回 `mod.Cameras.FirstPerson`。

使用固定相机时，请务必提供返回正常视点的方法。无法恢复的相机效果就等同于玩家无法操作。

# 结论

`FixedCameraExample` 是一个示例，你可以在其中一次性了解 UI 按钮、固定相机和时间移动。

当你有想要向玩家展示的场景（例如大厅演示、策略说明或胜利演示）时，值得一读。
