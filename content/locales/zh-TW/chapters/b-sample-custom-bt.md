---
title: "附錄 B：範例程式說明“CustomBT（自訂突破）”"
free: true
---

# CustomBT 展示什麼

`CustomBT` 是大型 Breakthrough 風格範本。進攻方依序占領區域，防守方則設法耗盡進攻方的增援數。SDK 1.4.1.0 以 Version 2.0 新增了此範本。

它不是單一 API 範例，而是展示如何把 Sector、CapturePoint、AreaTrigger、HQ、載具、AI、UI、VO、SFX、VFX、空域和隊伍切換組合成一個模式。

# 主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `modinfo.json` | workspace、字串、`base_skel`、遊戲模式和 5 張預先設定的地圖 |
| `custom_breakthrough_V2.0.blocks.json` | Portal 區塊側範本本體 |
| `custom_breakthrough_skel.json` | 匯入 Web Builder 的基礎設定 |
| `CustomBT.strings.json` | UI、VO 和設定使用的字串 |
| `README.txt` | 匯入步驟、ObjID 分配、AI 選擇、已知問題和更新記錄 |
| `MP_..._Breakthrough.tscn` | Godot 側預先設定的場景 |
| `MP_..._Breakthrough.spatial.json` | 上傳到 Portal Web Builder 的地圖資料 |

為了應對複製 Experience 後地圖或區塊沒有保留的情況，SDK 同時提供匯出的地圖 JSON 和區塊 JSON。

# 5 張預先設定的地圖

| Level | 檔案 stem |
| ---- | ---- |
| Manhattan Bridge (`MP_Dumbo`) | `MP_Dumbo_Breakthrough` |
| Golf Course (`MP_Granite_ClubHouse_Portal`) | `MP_Granite_ClubHouse_Breakthrough` |
| Downtown (`MP_Granite_MainStreet_Portal`) | `MP_Granite_MainStreet_Portal_Breakthrough` |
| Marina (`MP_Granite_Marina_Portal`) | `MP_Granite_Marina_Breakthrough` |
| Defense Nexus (`MP_Granite_TechCampus_Portal`) | `MP_Granite_TechCampus_Portal_CustomBreakthrough` |

Version 2.0 更新記錄把 Manhattan 說明為帶海灘登陸的新配置。這些檔案並沒有向 SDK 新增 Level ID，而是為 Custom Breakthrough 預先設定現有 Level。

# ObjID 設計

| ObjID | 用途 |
| ---- | ---- |
| `100` - `104` | Sector 0 到最終 Sector |
| `600` - `604` | 各 Sector 的 AreaTrigger |
| `1100` / `1200` / `1300` 區間 | Sector 1 / 2 / 3 的 Objective、載具和固定武器 |
| `301` - `303` / `401` - `403` | 各 Sector 的 Team 1 / Team 2 HQ |
| `998` / `999` | Team Switcher |
| `2000` - `2999` | 自動啟用的 VFX |
| `8000` | 啟用空戰的 Airspace AreaTrigger |

這些編號是與區塊邏輯之間的契約，不只是整理方式。移植到自製地圖時，應先按相同 ID 區間設計放置物，再連接範本。

# AI 與 Version 2.0

README 建議 Premium 地圖使用預設 backfill/static AI，RedSec 地圖使用能推進全部 Objective 的 Custom AI。Custom AI 會填補空位，使總參與者最多達到 100，但為了避免本地主機變慢，README 建議控制在約 60。

Version 2.0 新增空戰、Team Switcher、固定武器、玩家獨立 UI ID、占領 UI、VO、雪景與色彩濾鏡，以及 VFX 自動啟用。Season 2 重做也調整了倒地/復活時的占領判定、停用 Objective、Out of Bounds、CapturePoint 進度、Custom AI 和預設 AI 的部署時機。

# 注意事項

已知問題包括某些區域在 30 公尺以上高度無法正常造成傷害或投擲物消失、本地主機切換隊伍後計分板異常、載具不出現在部署選單、RedSec 上預設 AI 的限制，以及 VFX 只對開局時在場玩家顯示。

先讀 `README.txt`，再查看所選地圖的 `.tscn` / `.spatial.json`，最後追蹤區塊 JSON 中的區域推進和 UI。第一步就鑽進最大的 JSON，只會浪費時間。
