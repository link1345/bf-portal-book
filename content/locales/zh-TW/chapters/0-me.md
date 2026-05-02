---
title: "第 0 章 關於本書"
free: true
---

## 本書的目的

本書面向「想在 Battlefield 6 Portal 裡親手做點有趣內容」的讀者，目標是從基礎的編輯器用法開始，學習 Portal 獨有的機制。
本書也會介紹為了長期營運 Portal 伺服器而需要的程式改進，目標是掌握 Portal 的腳本功能和地圖編輯器。
需要說明的是，本書不講解積木式視覺化程式設計，而是以 TypeScript 實作為中心。

### 關於視覺化程式設計和地圖編輯器

關於視覺化程式設計和地圖編輯器，[「BF Portal BF6 備忘錄 by TOKAI_Server_JPN」](https://w.atwiki.jp/tokaiserver/pages/1.html) 中有更詳細的說明。

## 目標受眾

簡單來說，本書面向「程式設計初學者」等級的讀者。具體來說，假設讀者符合以下情況。

* 學過一點程式設計（大致相當於 2025 年日本國中課程中學過的程度）
* 用其他語言寫過程式，但還沒有深入學習過

這裡所說的 2025 年日本國中課程程度，大致是「理解測量與控制系統的機制，並能製作安全、合適的程式」。

> 教育資訊化指南 - 追補版 - （2020 年 6 月）第 3 章（文部科學省）：https://www.mext.go.jp/content/20200608-mxt_jogai01-000003284_004.pdf

因此，**本書不是程式設計入門書，也不是語法入門書**。
如果想學習 TypeScript 語法，推薦閱讀《[サバイバルTypeScript](https://typescriptbook.jp/)》等入門資料。
如果想學習 Godot 的用法，推薦閱讀「[Godot Engine 官方文件](https://docs.godotengine.org/ja/4.x/)」。

### 附錄的目標受眾

* 能像呼吸一樣自然地寫程式的人

附錄是一本**面向已經會程式設計、但第一次接觸 Portal 的 TypeScript API 的讀者的手冊**。


## 致謝

本書的審閱與修訂得到了以下各位的協助。謹藉此機會致上誠摯感謝。

* [fuji](https://x.com/fuji_nice)，[Clan Vol](https://team-vol.com/) 代表
* [Lab_WLM](https://x.com/Lab_WLM)


## 變更日誌

2026-04-30：初稿
2026-05-01：新增關於 BF6 Portal TypeScript MCP 伺服器，以及把狀況和日誌交給 AI 來撰寫 Portal 程式碼的章節
2026-05-02：補充關於 Codex App 中 MCP 設定、向 AI 提問的方法，以及 Rate limit 的說明
