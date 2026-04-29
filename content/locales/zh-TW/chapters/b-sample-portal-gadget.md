---
title: "附錄B：範例程式說明“PortalGadgetExample（專用小工具輸入）”"
free: true
---

::::message
本附錄目前只是粗略的機器翻譯，文字可能非常不自然。我之後會認真修改，暫時請多包涵。
::::

# 遊戲概述

`PortalGadgetExample` 是一個範例，讓玩家可以擁有 Portal Gadget，並使用腳本接收瞄準、射擊和雷射切換等輸入。

主要的一點是，你可以使用特殊的小工具來接收玩家的意圖，而不是使用「蹲下並執行」之類的替代操作。

# 主要內容

* 在 `mod.AddEquipment(player, mod.Gadgets.Misc_PortalGadget)` 新增了 Portal Gadget。
* 在 `OnPortalGadgetFireStart`、`OnPortalGadgetFireStop` 接收拍攝輸入。
* 在 `OnPortalGadgetAimStart`、`OnPortalGadgetAimStop` 接收瞄準輸入。
* 使用 `OnPortalGadgetLaserToggle` 啟用/停用該模式。
* 透過 `RayCast`、`OnRayCastHit`、`OnRayCastMissed` 使用玩家注視方向。
* 使用 `InteractPoint` 在傳送模式和物件建立模式之間切換。

# 閱讀順序

## 1. 查看裝備獎勵

Portal Gadget 的分配位址為 `OnPlayerDeployed`。

玩家部署時移交裝備的過程在其他模式中也很容易使用。

## 2. 查看輸入事件

門戶小工具輸入是在與正常 `OnPlayerInteract` 不同的事件中接收的。

|活動 |角色 |
| ---- | ---- |
| `OnPortalGadgetFireStart` | `OnPortalGadgetFireStart` |按下點火按鈕 |
| `OnPortalGadgetFireStop` | `OnPortalGadgetFireStop` |放開開火按鈕 |
| `OnPortalGadgetAimStart` | `OnPortalGadgetAimStart` |開始瞄準 |
| `OnPortalGadgetAimStop` | `OnPortalGadgetAimStop` |停止瞄準 |
| `OnPortalGadgetLaserToggle` | `OnPortalGadgetLaserToggle` |雷射開關輸入|

## 3. 觀看 RayCast

在此範例中，RayCast 從玩家的視線發射，傳送到它擊中的點，並建立一個物件。

您應該看到的流程是 `GetRayCastVectors` → `mod.RayCast` → `OnRayCastHit` / `OnRayCastMissed`。

# 提示

它以數字顯示當前模式，例如 `currentSwitchMode`。如果您自己建立它，則使用 `"Teleport"` 或 `"SpawnObject"` 等字串類型會更容易閱讀。

當 RayCast 失敗時，查看 `DisplayHighlightedWorldLogMessage` 給出的原因也很有幫助。如果它不響應輸入，玩家就會感覺「損壞」。

# 結論

Portal Gadget 是一個用於創建活躍玩家輸入的強大工具。

在此範例中，請專注於小工具附件、輸入事件、RayCast、模式切換和失敗訊息的流程。
