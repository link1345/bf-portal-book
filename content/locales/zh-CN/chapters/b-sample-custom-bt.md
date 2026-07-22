---
title: "附录 B：示例程序说明“CustomBT（自定义突破）”"
free: true
---

# CustomBT 展示什么

`CustomBT` 是大型 Breakthrough 风格模板。进攻方依次占领扇区，防守方则设法耗尽进攻方的增援数。SDK 1.4.1.0 以 Version 2.0 新增了此模板。

它不是单一 API 示例，而是展示如何把 Sector、CapturePoint、AreaTrigger、HQ、车辆、AI、UI、VO、SFX、VFX、空域和队伍切换组合成一个模式。

# 主要文件

| 文件 | 作用 |
| ---- | ---- |
| `modinfo.json` | workspace、字符串、`base_skel`、游戏模式和 5 张预配置地图 |
| `custom_breakthrough_V2.0.blocks.json` | Portal 区块侧模板本体 |
| `custom_breakthrough_skel.json` | 导入 Web Builder 的基础配置 |
| `CustomBT.strings.json` | UI、VO 和设置使用的字符串 |
| `README.txt` | 导入步骤、ObjID 分配、AI 选择、已知问题和更新记录 |
| `MP_..._Breakthrough.tscn` | Godot 侧预配置场景 |
| `MP_..._Breakthrough.spatial.json` | 上传到 Portal Web Builder 的地图数据 |

为应对复制 Experience 后地图或区块没有保留的情况，SDK 同时提供了导出的地图 JSON 和区块 JSON。

# 5 张预配置地图

| Level | 文件 stem |
| ---- | ---- |
| Manhattan Bridge (`MP_Dumbo`) | `MP_Dumbo_Breakthrough` |
| Golf Course (`MP_Granite_ClubHouse_Portal`) | `MP_Granite_ClubHouse_Breakthrough` |
| Downtown (`MP_Granite_MainStreet_Portal`) | `MP_Granite_MainStreet_Portal_Breakthrough` |
| Marina (`MP_Granite_Marina_Portal`) | `MP_Granite_Marina_Breakthrough` |
| Defense Nexus (`MP_Granite_TechCampus_Portal`) | `MP_Granite_TechCampus_Portal_CustomBreakthrough` |

Version 2.0 更新记录把 Manhattan 说明为带海滩登陆的新布局。这些文件并没有向 SDK 增加新的 Level ID，而是为 Custom Breakthrough 预配置了现有 Level。

# ObjID 设计

| ObjID | 用途 |
| ---- | ---- |
| `100` - `104` | Sector 0 到最终 Sector |
| `600` - `604` | 各 Sector 的 AreaTrigger |
| `1100` / `1200` / `1300` 区间 | Sector 1 / 2 / 3 的 Objective、车辆和固定武器 |
| `301` - `303` / `401` - `403` | 各 Sector 的 Team 1 / Team 2 HQ |
| `998` / `999` | Team Switcher |
| `2000` - `2999` | 自动启用的 VFX |
| `8000` | 启用空战的 Airspace AreaTrigger |

这些编号是与区块逻辑之间的契约，不只是整理方式。移植到自制地图时，应先按相同 ID 区间设计放置物，再连接模板。

# AI 与 Version 2.0

README 建议 Premium 地图使用默认 backfill/static AI，RedSec 地图使用能够推进全部 Objective 的 Custom AI。Custom AI 会填补空位，使总参与者最多达到 100，但为了避免本地主机变慢，README 建议控制在约 60。

Version 2.0 增加了空战、Team Switcher、固定武器、玩家独立 UI ID、占领 UI、VO、雪景与色彩滤镜，以及 VFX 自动启用。Season 2 重做还调整了倒地/复活时的占领判定、禁用 Objective、Out of Bounds、CapturePoint 进度、Custom AI 和默认 AI 的部署时机。

# 注意事项

已知问题包括某些扇区在 30 米以上高度无法正常造成伤害或投掷物消失、本地主机切换队伍后计分板异常、车辆不出现在部署菜单、RedSec 上默认 AI 的限制，以及 VFX 只对开局时在场玩家渲染。

先读 `README.txt`，再查看所选地图的 `.tscn` / `.spatial.json`，最后追踪区块 JSON 中的扇区推进和 UI。第一步就钻进最大的 JSON，只会浪费时间。
