---
title: "附錄 B：範例程式說明「ObliterationExample（Bomb 和 M-COM）」"
free: true
---

# ObliterationExample 要看什麼

`ObliterationExample` 是使用 Bomb 和 M-COM 製作 Obliteration 風格規則的範例。
可以集中確認 SDK 1.3.3.0 新增的 Bomb 類型、Bomb 事件和 M-COM 連動 API。

# 包含的主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `ObliterationExample.ts` | Bomb、M-COM、勝負處理的主體 |
| `ObliterationExample.tscn` | 與 Bomb 和 M-COM 相關的配置範例 |
| `ObliterationExample.strings.json` | 通知和 HUD 用文字 |
| `README_ObliterationExample.md` | Bomb 和 M-COM 設定說明 |

# Bomb 和 M-COM API

先閱讀這些 API 和事件。

| 名稱 | 作用 |
| ---- | ---- |
| `mod.GetBomb(...)` | 透過編號取得 Bomb 參照 |
| `mod.ForceBombSpawn(...)` | 強制生成 Bomb |
| `mod.ForceBombDrop(...)` | 強制讓持有中的 Bomb 掉落 |
| `mod.ForceBombReset(...)` | 將 Bomb 重置到初始狀態 |
| `mod.GiveBombToPlayer(...)` | 把 Bomb 交給指定玩家 |
| `mod.SetBombTeam(...)` | 設定 Bomb 所屬隊伍 |
| `mod.SetMCOMArmType(...)` | 設定 M-COM 的啟動方式 |
| `OnBombPickedUp(...)` | Bomb 被拾取時呼叫 |
| `OnBombDropped(...)` | Bomb 掉落時呼叫 |
| `OnBombStateChanged(...)` | Bomb 狀態變化時呼叫 |

# 處理流程

範例透過事件追蹤 Bomb 的生成、拾取、掉落、重置和在 M-COM 上設定。
玩家是否持有 Bomb，也可以用 `GetSoldierState(..., mod.SoldierStateBool.HasBomb)` 確認。

M-COM 側透過 `SetMCOMArmType` 配合 Bomb 啟動。
不要把 Bomb 狀態和 M-COM 狀態分開死讀，而是按「誰持有 Bomb、運到哪個 M-COM、什麼時候轉為勝負條件」的流程閱讀。

# 注意點

Bomb 比普通物件參照更需要注意狀態變化。
拾取後、掉落後、重置後的處理混在一起時，通知和勝負判定容易錯位。

處理 Bomb 或 Player 參照前，先用 `IsValid` 和 `IsUndefined` 做檢查。

# 結論

`ObliterationExample` 是以 Bomb 和 M-COM 為核心的目標運送規則教材。
閱讀時把 Bomb 狀態、持有玩家、M-COM 啟動設定和勝負判定分開，就能擴展為自己的攻防規則。

