---
title: "附錄 B：範例程式說明“CustomCQ（自訂征服）”"
free: true
---

# CustomCQ 展示什麼

`CustomCQ` 是一個大型 Conquest 風格的 Portal 範本。
它不是用來確認單一小 API 的範例，而是接近完整模式的教材，包含地圖、CapturePoint、AreaTrigger、AI、載具、UI、計分板、音樂和 VO。

SDK 1.3.2.0 中確認到的 CustomCQ 是 Version 10.0。資料夾中包含範本本體、字串、圖示，以及多個地圖用的 `.tscn` 和 `.spatial.json`。
不要一開始就照搬全部內容。應該閱讀它如何分配 ObjID 區間，以及如何讓地圖資料和區塊邏輯保持一致。

# 主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `modinfo.json` | 範例名稱、說明、workspace 和字串檔 |
| `custom_conquest_template_10.0.json` | Portal 區塊側範本本體 |
| `CustomCQ.strings.json` | UI、VO、分數、設定名等字串鍵 |
| `README.txt` | 匯入步驟、ObjID 分配、已知問題、更新記錄 |
| `MP_..._Conquest.tscn` | Godot 側關卡場景 |
| `MP_..._Conquest.spatial.json` | 上傳到 Portal Web Builder 的地圖資料 |

# 包含的地圖資料

| 顯示名稱 | Map ID / 檔案例 |
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

README 的 V10.0 更新記錄把 Hagental Base 和 Complex 3 作為新增地圖處理。
在本倉庫中，更準確的理解是：為 `CustomCQ` 追加了預先設定的 Conquest 地圖檔，而不是整個 SDK 新增了全新的基礎關卡檔。

# ObjID 設計

| ObjID 範圍 | 用途 |
| ---- | ---- |
| `200` - `226` | CapturePoint，A 點從 200 開始 |
| `600` - `699` | 每個 CapturePoint 對應的載具 Spawner 區間 |
| `901` / `902` | Team 1 / Team 2 的 AI Spawner |
| `998` / `999` | Team Switcher |
| `1100` - `1199` | Team 1 Spawn Protection 用 AreaTrigger |
| `1200` - `1299` | Team 2 Spawn Protection 用 AreaTrigger |
| `1300` - `1399` | 所有人用 Out of Bounds AreaTrigger |
| `1400` | Infantry Combat Area 用 AreaTrigger |
| `700` - `749` | Repel Trigger |
| `750` - `799` | Repel Target |
| `2000` - `2999` | VFX |

對於這種規模的模式，ObjID 區間本身就是規格。
如果隨意修改，目標、載具、AI 和邊界判定會立刻變得難以理解。

# 閱讀順序

1. 閱讀 `README.txt`，確認 ObjID 分配和已知問題。
2. 開啟目標地圖的 `.tscn` 和 `.spatial.json`，查看 CapturePoint、AreaTrigger、Spawner 的 ID。
3. 查看 `CustomCQ.strings.json` 中的 UI 和 VO 鍵。
4. 按分數、目標、AI、UI 等功能區塊閱讀 `custom_conquest_template_10.0.json`。

# Version 10.0 的更新點

V10.0 更新為使用官方的 Combat Area、Surrounding Combat Area 和 Exclusive HQ areas。
同時追加了 NVG 賦予開關、Conquest Assault 開關，以及 Conquest Assault 的隊伍初始票數設定。

閱讀舊 CustomCQ 資料時，要注意其中可能預設空域和邊界判定只由自訂邏輯處理。
V10.0 仍為了向後相容保留 Custom OOB logic，但基本閱讀時應優先把官方 Combat Area 系物件當作主結構。

載具 Spawner 相關屬性在 SDK 1.3.1.0 中變為 `EnableRespawn`。
如果舊資料寫著 `DisableRespawn`，請優先採用目前 SDK 的名稱和含義。

# 結論

`CustomCQ` 不是小 API 範例。
它適合用來學習大型 Portal 模式如何連接地圖側 ObjID、區塊側前提、字串、AI、載具和邊界邏輯。
