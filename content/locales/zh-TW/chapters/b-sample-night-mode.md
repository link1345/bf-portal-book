---
title: "附錄 B：範例程式說明“NightModeExample（夜間效果與 NVG）”"
free: true
---

# NightModeExample 展示什麼

`NightModeExample` 會在玩家進入地圖上的區域時切換夜間效果。
它同時使用 `ScreenEffects.Night`、NVG 裝備、SFX 和 VFX，因此適合作為「透過事件切換視覺效果和裝備」的教材。

# 主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `NightModeExample.ts` | 夜間切換、NVG 賦予、SFX 播放、VFX 更新的主體 |
| `NightModeExample.tscn` | 放置 AreaTrigger、VFX、SFX 的 Spatial Editor 場景 |
| `tsconfig.json` | TypeScript 設定 |

# 處理流程

這個範例在 `OnGameModeStarted` 中初始化 SFX 和 VFX，並在 `OngoingGlobal` 中持續更新 VFX 的位置和顏色。
玩家進入 AreaTrigger 時，`OnPlayerEnterAreaTrigger` 會切換夜間模式。

主要查看以下位置。

1. 用 `mod.GetSFX(200)` / `mod.GetSFX(201)` 引用白天和夜間音效。
2. 啟用 `mod.GetVFX(100)`，並修改速度、縮放、顏色。
3. 用 `mod.EnableScreenEffect(player, mod.ScreenEffects.Night, ...)` 切換畫面效果。
4. 用 `mod.AddEquipment(player, mod.Gadgets.Mask_NVG)` 和 `mod.RemoveEquipment(...)` 裝上或移除 NVG。

# 閱讀重點

`OnPlayerDeployed` 會在夜間模式開啟時，為重新部署的玩家再次賦予 NVG。
重點不只是用事件切換狀態，而是要把同一狀態重新套用到中途加入或重新部署的玩家身上。

這個範例用全域變數 `nightModeEnabled` 管理夜間狀態。
如果想讓每個玩家擁有不同的夜間狀態，不要直接沿用這種寫法，請改成依玩家管理狀態。

# 注意點

AreaTrigger、VFX、SFX 的 ObjID 必須與程式碼中的數字一致。
閱讀時先確認 `.tscn` 側的 `100`、`101`、`200`、`201` 分別對應哪個物件。

# 結論

`NightModeExample` 看起來是演出範例，但核心是「把一次狀態變化同時反映到玩家、畫面效果、聲音和 VFX」。
製作夜戰、毒氣區、警報區、特殊場地時都可以套用這個思路。

