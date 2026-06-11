---
title: "附录 B：示例程序说明“CustomCQ（自定义征服）”"
free: true
---

# CustomCQ 展示什么

`CustomCQ` 是一个大型 Conquest 风格的 Portal 模板。
它不是用来确认单个小 API 的示例，而是接近完整模式的教材，包含地图、CapturePoint、AreaTrigger、AI、车辆、UI、计分板、音乐和 VO。

SDK 1.3.2.0 中确认到的 CustomCQ 是 Version 10.0。文件夹中包含模板本体、字符串、图标，以及多个地图用的 `.tscn` 和 `.spatial.json`。
不要一开始就照搬全部内容。应该阅读它如何分配 ObjID 区间，以及如何让地图数据和区块逻辑保持一致。

# 主要文件

| 文件 | 作用 |
| ---- | ---- |
| `modinfo.json` | 示例名称、说明、workspace 和字符串文件 |
| `custom_conquest_template_10.0.json` | Portal 区块侧模板本体 |
| `CustomCQ.strings.json` | UI、VO、分数、设置名等字符串键 |
| `README.txt` | 导入步骤、ObjID 分配、已知问题、更新记录 |
| `MP_..._Conquest.tscn` | Godot 侧关卡场景 |
| `MP_..._Conquest.spatial.json` | 上传到 Portal Web Builder 的地图数据 |

# 包含的地图数据

| 显示名称 | Map ID / 文件示例 |
| ---- | ---- |
| Siege of Cairo | `MP_Abbasid_CustomConquest` |
| Empire State | `MP_Aftermath_Conquest` |
| Iberian Offensive | `MP_Battery_CustomConquest` |
| Liberation Peak | `MP_Capstone_Conquest` / Winter 版本 |
| Contaminated | `MP_Contaminated_Conquest` / Winter 版本 |
| Manhattan Bridge | `MP_Dumbo_CustomConquest` |
| Operation Firestorm | `MP_FireStorm_Conquest` |
| Golf Course | `MP_Granite_ClubHouse_Portal_CustomConquest` |
| Area 22B | `MP_Granite_MilitaryRnD_Portal_Conquest` |
| Redline Storage | `MP_Granite_MilitaryStorage_Portal_Conquest` |
| Defense Nexus | `MP_Granite_TechCampus_Portal_CustomConquest` |
| Complex 3 | `MP_Granite_Underground_Portal_Conquest` / Mancour 版 |
| Hagental Base | `MP_Subsurface_Conquest` |

README 的 V10.0 更新记录把 Hagental Base 和 Complex 3 作为新增地图处理。
在本仓库中，更准确的理解是：为 `CustomCQ` 追加了预配置的 Conquest 地图文件，而不是整个 SDK 新增了全新的基础关卡文件。

# ObjID 设计

| ObjID 范围 | 用途 |
| ---- | ---- |
| `200` - `226` | CapturePoint，A 点从 200 开始 |
| `600` - `699` | 每个 CapturePoint 对应的车辆 Spawner 区间 |
| `901` / `902` | Team 1 / Team 2 的 AI Spawner |
| `998` / `999` | Team Switcher |
| `1100` - `1199` | Team 1 Spawn Protection 用 AreaTrigger |
| `1200` - `1299` | Team 2 Spawn Protection 用 AreaTrigger |
| `1300` - `1399` | 所有人用 Out of Bounds AreaTrigger |
| `1400` | Infantry Combat Area 用 AreaTrigger |
| `700` - `749` | Repel Trigger |
| `750` - `799` | Repel Target |
| `2000` - `2999` | VFX |

对于这种规模的模式，ObjID 区间本身就是规格。
如果随意修改，目标、车辆、AI 和边界判定会立刻变得难以理解。

# 阅读顺序

1. 阅读 `README.txt`，确认 ObjID 分配和已知问题。
2. 打开目标地图的 `.tscn` 和 `.spatial.json`，查看 CapturePoint、AreaTrigger、Spawner 的 ID。
3. 查看 `CustomCQ.strings.json` 中的 UI 和 VO 键。
4. 按分数、目标、AI、UI 等功能块阅读 `custom_conquest_template_10.0.json`。

# Version 10.0 的更新点

V10.0 更新为使用官方的 Combat Area、Surrounding Combat Area 和 Exclusive HQ areas。
同时追加了 NVG 赋予开关、Conquest Assault 开关，以及 Conquest Assault 的队伍初始票数设置。

阅读旧 CustomCQ 资料时，要注意其中可能默认空域和边界判定只由自定义逻辑处理。
V10.0 仍为了向后兼容保留 Custom OOB logic，但基本阅读时应优先把官方 Combat Area 系对象当作主结构。

车辆 Spawner 相关属性在 SDK 1.3.1.0 中变为 `EnableRespawn`。
如果旧资料写着 `DisableRespawn`，请优先采用当前 SDK 的名称和含义。

# 结论

`CustomCQ` 不是小 API 示例。
它适合用来学习大型 Portal 模式如何连接地图侧 ObjID、区块侧前提、字符串、AI、车辆和边界逻辑。
