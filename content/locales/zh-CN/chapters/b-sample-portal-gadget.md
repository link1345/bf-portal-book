---
title: "附录 B：示例程序说明“PortalGadgetExample（专用 Gadget 输入）”"
free: true
---

# 游戏概述

`PortalGadgetExample` 是一个示例，允许玩家拥有 Portal Gadget，并使用脚本接收诸如瞄准、射击和激光切换等输入。

重点是，你可以用专用 Gadget 来接收玩家的意图，而不是用“蹲下就执行”这类替代操作。

# 主要内容

* 用 `mod.AddEquipment(player, mod.Gadgets.Misc_PortalGadget)` 添加 Portal Gadget。
* 在 `OnPortalGadgetFireStart`、`OnPortalGadgetFireStop` 接收开火输入。
* 在 `OnPortalGadgetAimStart`、`OnPortalGadgetAimStop` 接收瞄准输入。
* 使用 `OnPortalGadgetLaserToggle` 启用/禁用该模式。
* 通过 `RayCast`、`OnRayCastHit`、`OnRayCastMissed` 使用玩家注视方向。
* 使用 `InteractPoint` 在传送模式和对象生成模式之间切换。

# 阅读顺序

## 1. 查看装备授予

Portal Gadget 会在 `OnPlayerDeployed` 中分配。

玩家部署时发放装备的处理，在其他模式中也很容易复用。

## 2. 查看输入事件

Portal Gadget 输入是在与普通 `OnPlayerInteract` 不同的事件中接收的。

| 事件 | 作用 |
| ---- | ---- |
| `OnPortalGadgetFireStart` | 按下发射按钮 |
| `OnPortalGadgetFireStop` | 松开发射按钮 |
| `OnPortalGadgetAimStart` | 开始瞄准 |
| `OnPortalGadgetAimStop` | 停止瞄准 |
| `OnPortalGadgetLaserToggle` | 激光切换输入 |

## 3. 查看 RayCast

在此示例中，RayCast 会从玩家视线方向发射，传送到命中的点，并生成对象。

你应该看到的流程是 `GetRayCastVectors` → `mod.RayCast` → `OnRayCastHit` / `OnRayCastMissed`。

# 小技巧

它用数字表示当前模式，例如 `currentSwitchMode`。如果你自己编写，使用 `"Teleport"` 或 `"SpawnObject"` 这样的字符串类型会更容易阅读。

当 RayCast 失败时，查看 `DisplayHighlightedWorldLogMessage` 给出的原因也很有帮助。如果输入没有反应，玩家会觉得它“坏了”。

# 结论

Portal Gadget 是创建主动玩家输入的强大工具。

在此示例中，请重点关注 Gadget 发放、输入事件、RayCast、模式切换和失败消息的流程。
