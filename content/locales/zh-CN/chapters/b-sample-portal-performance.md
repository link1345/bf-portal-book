---
title: "附录 B：示例程序说明“PortalPerformanceExample（性能测量）”"
free: true
---

# PortalPerformanceExample 要看什么

`PortalPerformanceExample` 是确认 Portal 逻辑和服务器端游戏处理平均帧时间的示例。
可以学习如何把 SDK 1.3.3.0 新增的 Performance API 显示到调试 HUD 或日志中。

# 包含的主要文件

| 文件 | 作用 |
| ---- | ---- |
| `PortalPerformanceExample.ts` | 平均帧时间取得和显示处理 |
| `PortalPerformanceExample.tscn` | 性能确认用配置示例 |
| `PortalPerformanceExample.strings.json` | HUD 和通知用文字 |
| `README_PortalPerformanceExample.md` | 数值阅读方法和注意点 |

# 性能测量 API

| 名称 | 作用 |
| ---- | ---- |
| `mod.GetPortalAverageFrameTime()` | 取得 Portal 逻辑的平均帧时间 |
| `mod.GetServerAverageFrameTime()` | 取得服务器端游戏处理的平均帧时间 |

两者都是查看最近历史平均值的函数。
它们不是每帧瞬间值，所以不要理解为加了一次处理后数字一定立刻跳变。

# 处理流程

示例以一定间隔读取平均帧时间，并显示到 UI 或通知中。
在加入较重处理前后比较数值，就容易区分是 Portal 逻辑较重，还是服务器端游戏处理较重。

测试 `OngoingGlobal`、`OngoingPlayer`、大量 `AllPlayers()` / `AllVehicles()`、大量 Spawn 时尤其适合使用。

# 注意点

性能测量本身不要每帧重度运行。
显示更新请间隔到 1 秒或数秒一次。

数字只是寻找原因的入口。
数值变差时，按顺序检查最近增加的 Ongoing、数组循环、Spawn 和 UI 创建。

# 结论

`PortalPerformanceExample` 是避免制作过重 Portal 模式的计量示例。
一边看平均帧时间，一边及早判断是否需要减少 Ongoing、复用 UI、避免一次生成太多对象。

