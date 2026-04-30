---
title: "附錄 B：範例程式說明“FixedCameraExample（固定相機和 UI 按鈕）”"
free: true
---

# 遊戲概述

`FixedCameraExample` 是從 UI 按鈕切換放置在 Godot 中的固定相機的範例。

當你想要在活動開始前建立鏡頭演出、類似觀戰者的視角或高光展示時，這非常有用。

# 主要內容

* 在 `OnGameModeStarted` 開始 UI 建立和相機移動過程。
* 在 `OnPlayerUIButtonEvent` 判斷按下了哪個 UI 按鈕。
* 用 `mod.SetCameraTypeForPlayer` 將玩家相機切換為固定相機。
* 用 `mod.MoveObjectOverTime`、`mod.SetObjectTransformOverTime` 移動相機。
* 使用 `AddUIContainer`、`AddUIButton`、`AddUIText` 組裝 UI。

# 閱讀順序

## 1. 查看 UI 按鈕事件

`OnPlayerUIButtonEvent` 是按下 UI 按鈕時的入口點。

它會透過 `mod.GetUIWidgetName(eventUIWidget)` 取得被按下按鈕的名稱，並分支到 `StreetButton`、`HQ1Button`、`ReturnButton` 等處理。

## 2. 查看相機切換

切換到固定相機採用以下形式：

```ts
mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.Fixed, 0);
```

最後一個數字對應於 Godot 端分配給固定相機的 ObjId。換句話說，相機也是使用第 4 章中的 ObjId 帳本進行管理的。

## 3. 觀察相機運動

`StartFlyThroughCamera` 會讓固定相機隨著時間移動。

透過使用 `SetObjectTransformOverTime`，你可以建立一個緩慢移動的演出鏡頭，而不只是固定視點。

# 小技巧

返回按鈕可帶你返回 `mod.Cameras.FirstPerson`。

使用固定相機時，請務必提供返回正常視點的方法。無法恢復的相機效果就等於玩家無法操作。

# 結論

`FixedCameraExample` 是一個範例，你可以在其中一次性了解 UI 按鈕、固定相機和時間移動。

當你有想要向玩家展示的場景（例如大廳演示、策略說明或勝利演示）時，值得一讀。
