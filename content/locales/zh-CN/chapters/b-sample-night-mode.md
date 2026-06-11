---
title: "附录 B：示例程序说明“NightModeExample（夜间效果与 NVG）”"
free: true
---

# NightModeExample 展示什么

`NightModeExample` 会在玩家进入地图上的区域时切换夜间效果。
它同时使用 `ScreenEffects.Night`、NVG 装备、SFX 和 VFX，因此适合作为“通过事件切换视觉效果和装备”的教材。

# 主要文件

| 文件 | 作用 |
| ---- | ---- |
| `NightModeExample.ts` | 夜间切换、NVG 赋予、SFX 播放、VFX 更新的主体 |
| `NightModeExample.tscn` | 放置 AreaTrigger、VFX、SFX 的 Spatial Editor 场景 |
| `tsconfig.json` | TypeScript 设置 |

# 处理流程

这个示例在 `OnGameModeStarted` 中初始化 SFX 和 VFX，并在 `OngoingGlobal` 中持续更新 VFX 的位置和颜色。
玩家进入 AreaTrigger 时，`OnPlayerEnterAreaTrigger` 会切换夜间模式。

主要查看以下位置。

1. 用 `mod.GetSFX(200)` / `mod.GetSFX(201)` 引用白天和夜间音效。
2. 启用 `mod.GetVFX(100)`，并修改速度、缩放、颜色。
3. 用 `mod.EnableScreenEffect(player, mod.ScreenEffects.Night, ...)` 切换画面效果。
4. 用 `mod.AddEquipment(player, mod.Gadgets.Mask_NVG)` 和 `mod.RemoveEquipment(...)` 装上或移除 NVG。

# 阅读重点

`OnPlayerDeployed` 会在夜间模式开启时，为重新部署的玩家再次赋予 NVG。
重点不只是用事件切换状态，而是要把同一状态重新应用到中途加入或重新部署的玩家身上。

这个示例用全局变量 `nightModeEnabled` 管理夜间状态。
如果想让每个玩家拥有不同的夜间状态，不要直接沿用这种写法，请改成按玩家管理状态。

# 注意点

AreaTrigger、VFX、SFX 的 ObjID 必须与代码中的数字一致。
阅读时先确认 `.tscn` 侧的 `100`、`101`、`200`、`201` 分别对应哪个对象。

# 结论

`NightModeExample` 看起来是演出示例，但核心是“把一次状态变化同时反映到玩家、画面效果、声音和 VFX”。
制作夜战、毒气区、警报区、特殊场地时都可以套用这个思路。

