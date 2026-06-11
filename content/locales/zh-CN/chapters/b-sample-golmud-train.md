---
title: "附录 B：示例程序说明“GolmudTrainExample（列车控制）”"
free: true
---

# GolmudTrainExample 展示什么

`GolmudTrainExample` 是从 Portal 脚本控制 `Railway to Golmud` (`MP_GolmudRailway`) 列车的示例。
这不是普通的对象移动，而是学习 SDK 提供的列车专用事件和函数。

# 主要文件

| 文件 | 作用 |
| ---- | ---- |
| `GolmudTrainExample.ts` | 列车操作、InteractPoint、HUD、WorldIcon 更新的主体 |
| `GolmudTrainExample.tscn` | 放置 InteractPoint、WorldIcon、CapturePoint 等对象的 Spatial Editor 场景 |
| `GolmudTrainExample.strings.json` | 字符串键 |
| `README_GolmudTrainExample.ts` | 列车变体、事件、CapturePoint 联动的说明 |

# 列车 API

SDK 1.3.2.0 中可以确认以下列车 API 和事件。

| 名称 | 作用 |
| ---- | ---- |
| `mod.GolmudTrainSendMoveCommand(...)` | 向列车发送移动或停止命令 |
| `mod.GolmudTrainMoveCommands.MoveWest` | 向西移动 |
| `mod.GolmudTrainMoveCommands.Stop` | 停止 |
| `mod.GolmudTrainMoveCommands.MoveEast` | 向东移动 |
| `mod.GetGolmudTrainLocation()` | 以 `Vector` 取得当前列车位置 |
| `OnGolmudTrainStopped(...)` | 列车停止时调用的事件 |
| `mod.GolmudTrainStopReason.ReachedEastTerminal` | 到达东端 |
| `mod.GolmudTrainStopReason.ReachedWestTerminal` | 到达西端 |
| `mod.GolmudTrainStopReason.StoppedInTransit` | 中途停止 |

# 处理流程

这个示例通过 InteractPoint 向列车发送 `MoveWest`、`Stop`、`MoveEast`。
列车加速和减速大约需要 6 秒，因此示例会在这段时间禁用 InteractPoint，避免连续输入让命令重叠。

`UpdateTrainLocation` 会以较短周期读取 `mod.GetGolmudTrainLocation()`，并更新 WorldIcon 的位置和距离显示。
可以把它当作在游戏内 UI 中显示列车当前位置的示例来读。

# 移动的 CapturePoint

README 说明，如果在 CapturePoint 侧启用 `ConnectedToGolmudTrain`，该目标点会随列车一起移动。
Team 1 占领时列车向西，Team 2 占领时列车向东，变为中立时列车停止。

这和普通的 `MoveObject` 不同。
与列车联动的 CapturePoint，需要让场景侧的位置、尺寸、朝向和 ObjID 保持一致，才容易维护。

# 注意点

列车依赖 Portal Web 侧的设置，可以选择 Moving Train、两种 Static Train，或没有列车。
如果目标地图或列车设置不匹配，只放脚本也不会按预期运行。

列车也不会排队执行命令。
在加速或减速中发送下一条命令，并不会自动堆叠执行。请像示例一样加入约 6 秒的输入抑制。

# 结论

`GolmudTrainExample` 是 `MP_GolmudRailway` 专用功能的示例。
掌握读取列车位置、发送移动命令、在列车停止事件中更新 HUD、制作随列车移动的 CapturePoint 这四点即可。

