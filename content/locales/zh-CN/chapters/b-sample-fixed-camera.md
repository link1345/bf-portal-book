---
title: "附录B：示例程序说明“FixedCameraExample（固定相机和UI按钮）”"
free: true
---

# 游戏概述

`FixedCameraExample` 是从 UI 按钮切换放置在 Godot 中的固定相机的示例。

当您想要在活动开始前创建相机效果、类似观众的视角或亮点时，这非常有用。

# 主要内容

* 在 `OnGameModeStarted` 开始 UI 创建和相机移动过程。
* 确定按下了哪个 UI 按钮 `OnPlayerUIButtonEvent`。
* 将玩家相机更改为 `mod.SetCameraTypeForPlayer` 处的固定相机。
* 将相机移至 `mod.MoveObjectOverTime`、`mod.SetObjectTransformOverTime`。
* 使用 `AddUIContainer`、`AddUIButton`、`AddUIText` 组装 UI。

# 阅读顺序

## 1.查看UI按钮事件

`OnPlayerUIButtonEvent` 是按下 UI 按钮时的入口点。

它获取在 `mod.GetUIWidgetName(eventUIWidget)` 处按下的按钮的名称，并分支到 `StreetButton`、`HQ1Button`、`ReturnButton` 等。

## 2.视图相机切换

切换到固定摄像机采用以下形式：

```ts
mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.Fixed, 0);
```

最后一个数字对应于 Godot 端分配给固定相机的 ObjId。换句话说，相机也是使用第 4 章中的 ObjId 账本进行管理的。

## 3.观察摄像机运动

`StartFlyThroughCamera` 有一个随时间移动的固定摄像头。

通过使用 `SetObjectTransformOverTime`，您可以创建一个缓慢移动的生产摄像机，而不仅仅是一个固定的视点。

# 提示

返回按钮可带您返回 `mod.Cameras.FirstPerson`。

使用固定摄像机时，请务必提供返回正常视点的方法。无法恢复的相机效果就等同于玩家无法操作。

# 结论

`FixedCameraExample` 是一个示例，您可以在其中一次性了解 UI 按钮、固定摄像头和时间移动。

当您有想要向玩家展示的场景（例如大厅演示、策略说明或胜利演示）时，值得一读。
