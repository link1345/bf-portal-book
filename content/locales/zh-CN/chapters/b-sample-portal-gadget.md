---
title: "附录B：示例程序说明“PortalGadgetExample（专用小工具输入）”"
free: true
---

::::message
本附录目前只是粗略的机器翻译，文字可能非常不自然。我之后会认真修改，暂时请多包涵。
::::

# 游戏概述

`PortalGadgetExample` 是一个示例，允许玩家拥有 Portal Gadget，并使用脚本接收诸如瞄准、射击和激光切换等输入。

主要的一点是，你可以使用特殊的小工具来接收玩家的意图，而不是使用“蹲下并执行”之类的替代操作。

# 主要内容

* 在 `mod.AddEquipment(player, mod.Gadgets.Misc_PortalGadget)` 添加了 Portal Gadget。
* 在 `OnPortalGadgetFireStart`、`OnPortalGadgetFireStop` 接收拍摄输入。
* 在 `OnPortalGadgetAimStart`、`OnPortalGadgetAimStop` 接收瞄准输入。
* 使用 `OnPortalGadgetLaserToggle` 启用/禁用该模式。
* 通过 `RayCast`、`OnRayCastHit`、`OnRayCastMissed` 使用玩家注视方向。
* 使用 `InteractPoint` 在传送模式和对象创建模式之间切换。

# 阅读顺序

## 1. 查看装备奖励

Portal Gadget 的分配地址为 `OnPlayerDeployed`。

玩家部署时移交装备的过程在其他模式中也很容易使用。

## 2. 查看输入事件

门户小工具输入是在与正常 `OnPlayerInteract` 不同的事件中接收的。

|活动 |角色 |
| ---- | ---- |
| `OnPortalGadgetFireStart` | `OnPortalGadgetFireStart` |按下点火按钮 |
| `OnPortalGadgetFireStop` | `OnPortalGadgetFireStop` |松开开火按钮 |
| `OnPortalGadgetAimStart` | `OnPortalGadgetAimStart` |开始瞄准 |
| `OnPortalGadgetAimStop` | `OnPortalGadgetAimStop` |停止瞄准 |
| `OnPortalGadgetLaserToggle` | `OnPortalGadgetLaserToggle` |激光开关输入|

## 3. 观看 RayCast

在此示例中，RayCast 从玩家的视线发射，传送到它击中的点，并创建一个对象。

您应该看到的流程是 `GetRayCastVectors` → `mod.RayCast` → `OnRayCastHit` / `OnRayCastMissed`。

# 提示

它以数字形式显示当前模式，例如 `currentSwitchMode`。如果您自己创建它，则使用 `"Teleport"` 或 `"SpawnObject"` 等字符串类型会更容易阅读。

当 RayCast 失败时，查看 `DisplayHighlightedWorldLogMessage` 给出的原因也很有帮助。如果它不响应输入，玩家就会感觉“损坏”。

# 结论

Portal Gadget 是一个用于创建活跃玩家输入的强大工具。

在此示例中，请重点关注小工具附件、输入事件、RayCast、模式切换和失败消息的流程。
