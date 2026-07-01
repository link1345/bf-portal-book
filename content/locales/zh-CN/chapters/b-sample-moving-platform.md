---
title: "附录 B：示例程序说明“MovingPlatformExample（移动平台）”"
free: true
---

# MovingPlatformExample 要看什么

`MovingPlatformExample` 是把 Spatial Editor 上的对象当作移动平台使用的示例。
在 SDK 1.3.3.0 中，它是确认 `MovingPlatform` 思路、`MoveObjectOverTime` 和 `OrbitObjectOverTime` 的示例。

# 包含的主要文件

| 文件 | 作用 |
| ---- | ---- |
| `MovingPlatformExample.ts` | 移动和旋转平台的主脚本 |
| `MovingPlatformExample.tscn` | 平台和路径的配置示例 |
| `MovingPlatformExample.strings.json` | 显示文字 |
| `README_MovingPlatformExample.md` | 使用对象和配置方式说明 |

# 移动平台的做法

这个示例使用 `BarrierStoneBlock_01_H_PortalPlatform` 作为平台。
可以同时确认两种方式：用 `SpawnObject` 从代码生成，或在 Godot 中放置后通过 ObjId 引用。

先阅读这些 API。

| 名称 | 作用 |
| ---- | ---- |
| `mod.MoveObjectOverTime(...)` | 用指定时间移动到目标坐标 |
| `mod.OrbitObjectOverTime(...)` | 沿中心或轴进行旋转移动 |
| `mod.SpawnObject(...)` | 从 RuntimeSpawn 生成平台对象 |
| `mod.UnspawnObject(...)` | 移除生成的对象 |

# 处理流程

示例先取得平台引用，然后用固定时间移动或旋转它。
这不是瞬间传送，而是带时间的移动，因此适合作为可乘坐平台、巡回地板、机关平台的基本写法。

使用已放置对象时，Godot 侧 ObjId 必须和 TypeScript 侧取得的编号一致。
如果没有移动，先用 `GetObjId()` 确认引用目标是否真的是平台。

# 注意点

移动平台不仅影响视觉，也会影响玩家移动体验。
时间太短、移动太急、平台太窄，都可能造成掉落或不适。

也不要在同一个对象上没有状态控制地叠加多个移动命令。
像示例一样，在发送下一次移动命令前放入等待时间或状态标志。

# 结论

`MovingPlatformExample` 是通过 Portal 逻辑移动生成对象或已放置对象的教材。
先看平台 ObjId、移动时间、下一条命令的时机，就能扩展为移动地板或巡回机关。

