---
title: "附錄 B：範例程式說明“HybridExample（混合使用區塊和 TypeScript）”"
free: true
---

# HybridExample 展示什麼

`HybridExample` 展示如何從 Portal 區塊呼叫 TypeScript 函式。
當你想保留既有區塊邏輯，只把陣列、字串、數學函式、UI 生成等麻煩部分移到 TypeScript 時，這個範例很有用。

這個範例會從 `HybridExample.workspace.json` 的區塊呼叫 `HybridExample.ts` 中的函式。

# 閱讀要點

| 檔案 | 作用 |
| ---- | ---- |
| `HybridExample.workspace.json` | 區塊側規則、變數、`JsAction` / `JsValue` 呼叫 |
| `HybridExample.ts` | 從區塊呼叫的 TypeScript 函式 |
| `HybridExample.strings.json` | UI 和字串讀取使用的鍵 |
| `MP_Granite_TechCampus_Portal_HybridExample.tscn` | 該範例的 Spatial Editor 場景 |

`JsAction` 可理解為不使用回傳值的 TypeScript 呼叫。
`JsValue` 可理解為把 TypeScript 回傳值交回 Portal 變數或區塊輸入的呼叫。

# 關鍵函式

| 函式 | 目的 |
| ---- | ---- |
| `Log` | 從區塊側輸出日誌 |
| `LogArray` | 走訪 Portal 陣列並輸出日誌 |
| `InitUI` | 用 `modlib.ParseUI` 建立 Text UI |
| `UniqueID1` / `UniqueID2` | 回傳連續編號字串陣列 |
| `SectorUI` | 回傳 A-Z 的區域字母 |
| `Atan2` | 讓 Portal 側使用 JavaScript 數學函式 |
| `GetString` | 透過 `mod.strings[key]` 讀取字串值 |
| `SplitString` | 將分隔字串轉換為 Portal 陣列 |

SDK 1.3.1.0 在型別定義中追加了 `mod.strings`。
傳給 `mod.Message(...)` 時使用 `mod.stringkeys`；需要字串原始值時使用 `mod.strings[key]`。

# 結論

`HybridExample` 是學習區塊和 TypeScript 協作的範例。
把事件流程留在區塊中，把繁瑣的資料整理和工具邏輯交給 TypeScript。
