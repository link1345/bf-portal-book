---
title: "附录 B：示例程序说明“VL7Example（气体云和屏幕效果）”"
free: true
---

# 游戏概述

`VL7Example` 是结合 VL7Cloud、ScreenEffect、SoldierEffect、WorldIcon 来切换气体云效果的示例。

你可以一次性检查区域进入、视觉效果、装备发放和 WorldIcon 颜色变化。

# 主要内容

* 在 `OnPlayerDeployed` 向玩家提供防毒面具。
* 用 `mod.SetVL7CloudEffects` 切换气体云的屏幕效果、士兵效果和视觉效果。
* 用 `mod.EnableScreenEffect` 切换每个玩家的屏幕效果。
* 通过 `mod.SetSoldierEffect` 切换士兵侧的效果。
* 在 `OnPlayerEnterVL7Cloud` 和 `OnPlayerExitVL7Cloud` 获取进入 / 退出日志。
* 用 `WorldIcon` 的颜色和文本显示当前的 ON/OFF。

# 阅读顺序

## 1. 查看初始化

`OnGameModeStarted` 初始化 VL7Cloud 的效果，并设置 WorldIcon 的颜色和文字。

使用开关型装置时，首先要让当前是 ON 还是 OFF 变得可见，这一点很重要。

## 2. 查看 InteractPoint 分支

在 `OnPlayerInteract` 中，要切换的目标根据按下的 InteractPoint 的 ObjId 进行更改。

查看流程为 `mod.GetObjId(interactPoint)` → 目标标志反转 → WorldIcon 更新 → 效果更新。

## 3. 查看进入 / 退出事件

当玩家进入或退出 VL7Cloud 时，会调用 `OnPlayerEnterVL7Cloud` 和 `OnPlayerExitVL7Cloud`。

本示例仅输出日志，但在实际模式下你可以添加伤害、得分、警告显示等。

# 小技巧

表示开/关的世界图标颜色可用于调试和玩家指导。

然而，只依靠颜色会让部分玩家看漏。公开游玩时，最好也加上简短文本。

# 结论

`VL7Example` 是学习区域效果和玩家个人效果的示例。

当你想要创建“进入后会发生某些事情”的区域，例如毒气、毒、辐射或特殊区域时，这是最先值得阅读的示例。
