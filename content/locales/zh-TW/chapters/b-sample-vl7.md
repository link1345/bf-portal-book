---
title: "附錄B：範例程式說明“VL7範例（氣體雲和螢幕效果）”"
free: true
---

# 遊戲概述

`VL7Example`是結合VL7Cloud、ScreenEffect、SoldierEffect、WorldIcon切換氣雲效果的範例。

您可以一次檢查區域入侵、視覺效果、裝備添加和世界圖示顏色變化。

# 主要內容

* 在 `OnPlayerDeployed` 提供玩家防毒面具。
* 在氣體雲幕效果、士兵效果和視覺效果之間切換，網址為 `mod.SetVL7CloudEffects`。
* 在 `mod.EnableScreenEffect` 上切換每位玩家的畫面效果。
* 透過 `mod.SetSoldierEffect` 切換士兵側的效果。
* 在 `OnPlayerEnterVL7Cloud` 和 `OnPlayerExitVL7Cloud` 取得入侵/退出日誌。
* 用 `WorldIcon` 的顏色和文字顯示目前的 ON/OFF。

# 閱讀順序

## 1.視圖初始化

`OnGameModeStarted` 初始化VL7Cloud的效果並設定WorldIcon的顏色和文字。

使用切換型設備時，首先要了解其目前是開啟還是關閉，這一點很重要。

## 2. 查看 InteractPoint 分支

在 `OnPlayerInteract` 中，要切換的目標會根據按下的 InteractPoint 的 ObjId 進行變更。

觀看流程為 `mod.GetObjId(interactPoint)` → 目標標誌反轉 → WorldIcon 更新 → 效果更新。

## 3.查看入侵/退出事件

當玩家進入或退出 VL7Cloud 時，會呼叫 `OnPlayerEnterVL7Cloud` 和 `OnPlayerExitVL7Cloud` 。

本範例僅輸出日誌，但在實際模式下您可以新增傷害、得分、警告顯示等。

# 提示

表示開/關的世界圖示顏色可用於調試和玩家指導。

然而，有些玩家如果僅僅依靠顏色就會錯過機會。對於公眾使用，包含簡短文字是安全的。

# 結論

`VL7Example` 是學習區域效果和玩家個人效果的範例。

當你想要創造一個進入時會發生某些事情的地方（例如毒氣、毒藥、輻射或特殊區域）時，這是一本值得首先閱讀的好書。
