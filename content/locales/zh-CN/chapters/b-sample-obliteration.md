---
title: "附录 B：示例程序说明“ObliterationExample（Bomb 和 M-COM）”"
free: true
---

# ObliterationExample 要看什么

`ObliterationExample` 是使用 Bomb 和 M-COM 制作 Obliteration 风格规则的示例。
可以集中确认 SDK 1.3.3.0 新增的 Bomb 类型、Bomb 事件和 M-COM 联动 API。

# 包含的主要文件

| 文件 | 作用 |
| ---- | ---- |
| `ObliterationExample.ts` | Bomb、M-COM、胜负处理的主体 |
| `ObliterationExample.tscn` | 与 Bomb 和 M-COM 相关的配置示例 |
| `ObliterationExample.strings.json` | 通知和 HUD 用文字 |
| `README_ObliterationExample.md` | Bomb 和 M-COM 设置说明 |

# Bomb 和 M-COM API

先阅读这些 API 和事件。

| 名称 | 作用 |
| ---- | ---- |
| `mod.GetBomb(...)` | 通过编号取得 Bomb 引用 |
| `mod.ForceBombSpawn(...)` | 强制生成 Bomb |
| `mod.ForceBombDrop(...)` | 强制让持有中的 Bomb 掉落 |
| `mod.ForceBombReset(...)` | 将 Bomb 重置到初始状态 |
| `mod.GiveBombToPlayer(...)` | 把 Bomb 交给指定玩家 |
| `mod.SetBombTeam(...)` | 设置 Bomb 所属队伍 |
| `mod.SetMCOMArmType(...)` | 设置 M-COM 的启动方式 |
| `OnBombPickedUp(...)` | Bomb 被拾取时调用 |
| `OnBombDropped(...)` | Bomb 掉落时调用 |
| `OnBombStateChanged(...)` | Bomb 状态变化时调用 |

# 处理流程

示例通过事件追踪 Bomb 的生成、拾取、掉落、重置和在 M-COM 上设置。
玩家是否持有 Bomb，也可以用 `GetSoldierState(..., mod.SoldierStateBool.HasBomb)` 确认。

M-COM 侧通过 `SetMCOMArmType` 配合 Bomb 启动。
不要把 Bomb 状态和 M-COM 状态分开死读，而是按“谁持有 Bomb、运到哪个 M-COM、什么时候转为胜负条件”的流程阅读。

# 注意点

Bomb 比普通对象引用更需要注意状态变化。
拾取后、掉落后、重置后的处理混在一起时，通知和胜负判定容易错位。

处理 Bomb 或 Player 引用前，先用 `IsValid` 和 `IsUndefined` 做检查。

# 结论

`ObliterationExample` 是以 Bomb 和 M-COM 为核心的目标运送规则教材。
阅读时把 Bomb 状态、持有玩家、M-COM 启动设置和胜负判定分开，就能扩展为自己的攻防规则。

