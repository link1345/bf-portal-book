---
title: "附錄 B：範例程式說明“VL7Example（氣體雲和螢幕效果）”"
free: true
---

# 遊戲概述

`VL7Example` 是結合 VL7Cloud、ScreenEffect、SoldierEffect、WorldIcon 來切換氣體雲效果的範例。

你可以一次檢查區域進入、視覺效果、裝備發放和 WorldIcon 顏色變化。

# 主要內容

* 在 `OnPlayerDeployed` 提供玩家防毒面具。
* 用 `mod.SetVL7CloudEffects` 切換氣體雲的畫面效果、士兵效果和視覺效果。
* 用 `mod.EnableScreenEffect` 切換每位玩家的畫面效果。
* 透過 `mod.SetSoldierEffect` 切換士兵側的效果。
* 在 `OnPlayerEnterVL7Cloud` 和 `OnPlayerExitVL7Cloud` 取得進入 / 退出日誌。
* 用 `WorldIcon` 的顏色和文字顯示目前的 ON/OFF。

# 閱讀順序

## 1. 查看初始化

`OnGameModeStarted` 初始化 VL7Cloud 的效果，並設定 WorldIcon 的顏色和文字。

使用開關型裝置時，首先要讓目前是 ON 還是 OFF 變得可見，這一點很重要。

## 2. 查看 InteractPoint 分支

在 `OnPlayerInteract` 中，要切換的目標會根據按下的 InteractPoint 的 ObjId 進行變更。

查看流程為 `mod.GetObjId(interactPoint)` → 目標標誌反轉 → WorldIcon 更新 → 效果更新。

## 3. 查看進入 / 退出事件

當玩家進入或退出 VL7Cloud 時，會呼叫 `OnPlayerEnterVL7Cloud` 和 `OnPlayerExitVL7Cloud`。

本範例僅輸出日誌，但在實際模式下你可以新增傷害、得分、警告顯示等。

# 小技巧

表示 ON/OFF 的 WorldIcon 顏色可用於偵錯和玩家引導。

然而，只依靠顏色會讓部分玩家看漏。公開遊玩時，最好也加上簡短文字。

# 結論

`VL7Example` 是學習區域效果和玩家個人效果的範例。

當你想要建立「進入後會發生某些事情」的區域，例如毒氣、毒、輻射或特殊區域時，這是最先值得閱讀的範例。
