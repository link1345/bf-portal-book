---
title: "附錄 B：範例程式說明「MovingPlatformExample（移動平台）」"
free: true
---

# MovingPlatformExample 要看什麼

`MovingPlatformExample` 是把 Spatial Editor 上的物件當作移動平台使用的範例。
在 SDK 1.3.3.0 中，它是確認 `MovingPlatform` 思路、`MoveObjectOverTime` 和 `OrbitObjectOverTime` 的範例。

# 包含的主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `MovingPlatformExample.ts` | 移動和旋轉平台的主腳本 |
| `MovingPlatformExample.tscn` | 平台和路徑的配置範例 |
| `MovingPlatformExample.strings.json` | 顯示文字 |
| `README_MovingPlatformExample.md` | 使用物件和配置方式說明 |

# 移動平台的做法

這個範例使用 `BarrierStoneBlock_01_H_PortalPlatform` 作為平台。
可以同時確認兩種方式：用 `SpawnObject` 從程式碼生成，或在 Godot 中放置後透過 ObjId 參照。

先閱讀這些 API。

| 名稱 | 作用 |
| ---- | ---- |
| `mod.MoveObjectOverTime(...)` | 用指定時間移動到目標座標 |
| `mod.OrbitObjectOverTime(...)` | 沿中心或軸進行旋轉移動 |
| `mod.SpawnObject(...)` | 從 RuntimeSpawn 生成平台物件 |
| `mod.UnspawnObject(...)` | 移除生成的物件 |

# 處理流程

範例先取得平台參照，然後用固定時間移動或旋轉它。
這不是瞬間傳送，而是帶時間的移動，因此適合作為可乘坐平台、巡迴地板、機關平台的基本寫法。

使用已放置物件時，Godot 側 ObjId 必須和 TypeScript 側取得的編號一致。
如果沒有移動，先用 `GetObjId()` 確認參照目標是否真的是平台。

# 注意點

移動平台不只影響視覺，也會影響玩家移動體驗。
時間太短、移動太急、平台太窄，都可能造成掉落或不適。

也不要在同一個物件上沒有狀態控制地疊加多個移動命令。
像範例一樣，在送出下一次移動命令前放入等待時間或狀態標誌。

# 結論

`MovingPlatformExample` 是透過 Portal 邏輯移動生成物件或已放置物件的教材。
先看平台 ObjId、移動時間、下一條命令的時機，就能擴展為移動地板或巡迴機關。

