---
title: "附录B：示例程序说明“VL7示例（气体云和屏幕效果）”"
free: true
---

# 游戏概述

`VL7Example`是结合VL7Cloud、ScreenEffect、SoldierEffect、WorldIcon切换气云效果的示例。

您可以一次性检查区域入侵、视觉效果、装备添加和世界图标颜色变化。

# 主要内容

* 在 `OnPlayerDeployed` 向玩家提供防毒面具。
* 在气体云幕效果、士兵效果和视觉效果之间切换，网址为 `mod.SetVL7CloudEffects`。
* 在 `mod.EnableScreenEffect` 上切换每个玩家的屏幕效果。
* 通过 `mod.SetSoldierEffect` 切换士兵侧的效果。
* 在 `OnPlayerEnterVL7Cloud` 和 `OnPlayerExitVL7Cloud` 获取入侵/退出日志。
* 用 `WorldIcon` 的颜色和文本显示当前的 ON/OFF。

# 阅读顺序

## 1. 视图初始化

`OnGameModeStarted` 初始化VL7Cloud的效果并设置WorldIcon的颜色和文字。

使用切换型设备时，首先要了解其当前是打开还是关闭，这一点很重要。

## 2 . 查看 InteractPoint 分支

在 `OnPlayerInteract` 中，要切换的目标根据按下的 InteractPoint 的 ObjId 进行更改。

观看流程为 `mod.GetObjId(interactPoint)` → 目标标志反转 → WorldIcon 更新 → 效果更新。

## 3. 查看入侵/退出事件

当玩家进入或退出 VL7Cloud 时，会调用 `OnPlayerEnterVL7Cloud` 和 `OnPlayerExitVL7Cloud` 。

本示例仅输出日志，但在实际模式下您可以添加伤害、得分、警告显示等。

# 提示

表示开/关的世界图标颜色可用于调试和玩家指导。

然而，有些玩家如果仅仅依靠颜色就会错过机会。对于公众使用，包含简短文本是安全的。

# 结论

`VL7Example` 是学习区域效果和玩家个人效果的示例。

当你想要创建一个进入时会发生某些事情的地方（例如毒气、毒药、辐射或特殊区域）时，这是一本值得首先阅读的好书。
