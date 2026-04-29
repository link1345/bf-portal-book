---
title: "附錄B：範例程式說明“FixedCameraExample（固定相機和UI按鈕）”"
free: true
---

# 遊戲概述

`FixedCameraExample` 是從 UI 按鈕切換放置在 Godot 中的固定相機的範例。

當您想要在活動開始前創建相機效果、類似觀眾的視角或亮點時，這非常有用。

# 主要內容

* 在 `OnGameModeStarted` 開始 UI 建立和相機移動過程。
* 確定按下了哪個 UI 按鈕 `OnPlayerUIButtonEvent`。
* 將玩家相機改為 `mod.SetCameraTypeForPlayer` 處的固定相機。
* 將相機移至 `mod.MoveObjectOverTime`、`mod.SetObjectTransformOverTime`。
* 使用 `AddUIContainer`、`AddUIButton`、`AddUIText` 組裝 UI。

# 閱讀順序

## 1.查看UI按鈕事件

`OnPlayerUIButtonEvent` 是按下 UI 按鈕時的入口點。

它取得在 `mod.GetUIWidgetName(eventUIWidget)` 處按下的按鈕的名稱，並分支到 `StreetButton`、`HQ1Button`、`ReturnButton` 等。

## 2.視圖相機切換

切換到固定攝影機採用以下形式：

```ts
mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.Fixed, 0);
```

最後一個數字對應於 Godot 端分配給固定相機的 ObjId。換句話說，相機也是使用第 4 章中的 ObjId 帳本進行管理的。

## 3.觀察攝影機運動

`StartFlyThroughCamera` 有一個隨時間移動的固定相機。

透過使用 `SetObjectTransformOverTime`，您可以建立一個緩慢移動的生產攝影機，而不僅僅是一個固定的視點。

# 提示

返回按鈕可帶您返回 `mod.Cameras.FirstPerson`。

使用固定攝影機時，請務必提供返回正常視點的方法。無法恢復的相機效果就等於玩家無法操作。

# 結論

`FixedCameraExample` 是一個範例，您可以在其中一次性了解 UI 按鈕、固定相機和時間移動。

當您有想要向玩家展示的場景（例如大廳演示、策略說明或勝利演示）時，值得一讀。
