---
title: "附錄 B：範例程式說明“PortalGadgetExample（專用 Gadget 輸入）”"
free: true
---

# 遊戲概述

`PortalGadgetExample` 是一個範例，讓玩家可以擁有 Portal Gadget，並使用腳本接收瞄準、射擊和雷射切換等輸入。

重點是，你可以用專用 Gadget 來接收玩家的意圖，而不是用「蹲下就執行」這類替代操作。

# 主要內容

* 用 `mod.AddEquipment(player, mod.Gadgets.Misc_PortalGadget)` 添加 Portal Gadget。
* 在 `OnPortalGadgetFireStart`、`OnPortalGadgetFireStop` 接收開火輸入。
* 在 `OnPortalGadgetAimStart`、`OnPortalGadgetAimStop` 接收瞄準輸入。
* 使用 `OnPortalGadgetLaserToggle` 啟用/停用該模式。
* 透過 `RayCast`、`OnRayCastHit`、`OnRayCastMissed` 使用玩家注視方向。
* 使用 `InteractPoint` 在傳送模式和物件生成模式之間切換。

# 閱讀順序

## 1. 查看裝備授予

Portal Gadget 會在 `OnPlayerDeployed` 中分配。

玩家部署時發放裝備的處理，在其他模式中也很容易複用。

## 2. 查看輸入事件

Portal Gadget 輸入是在與普通 `OnPlayerInteract` 不同的事件中接收的。

| 事件 | 作用 |
| ---- | ---- |
| `OnPortalGadgetFireStart` | 按下發射按鈕 |
| `OnPortalGadgetFireStop` | 放開開火按鈕 |
| `OnPortalGadgetAimStart` | 開始瞄準 |
| `OnPortalGadgetAimStop` | 停止瞄準 |
| `OnPortalGadgetLaserToggle` | 雷射切換輸入 |

## 3. 查看 RayCast

在此範例中，RayCast 會從玩家視線方向發射，傳送到命中的點，並生成物件。

你應該看到的流程是 `GetRayCastVectors` → `mod.RayCast` → `OnRayCastHit` / `OnRayCastMissed`。

# 小技巧

它用數字表示目前模式，例如 `currentSwitchMode`。如果你自己編寫，使用 `"Teleport"` 或 `"SpawnObject"` 這樣的字串類型會更容易閱讀。

當 RayCast 失敗時，查看 `DisplayHighlightedWorldLogMessage` 給出的原因也很有幫助。如果輸入沒有反應，玩家會覺得它「壞了」。

# 結論

Portal Gadget 是建立主動玩家輸入的強大工具。

在此範例中，請專注於 Gadget 發放、輸入事件、RayCast、模式切換和失敗訊息的流程。
