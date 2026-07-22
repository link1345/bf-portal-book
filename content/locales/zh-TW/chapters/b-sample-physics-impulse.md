---
title: "附錄 B：範例程式說明「PhysicsImpulseExample（物理衝量）」"
free: true
---

# PhysicsImpulseExample 要看什麼

`PhysicsImpulseExample` 是對載具施加物理衝量的範例。SDK 1.3.3.0 中的資料夾名稱為 `PhysicsImpulse_Gym`，SDK 1.4.1.0 將其改為目前的名稱。
可以比較 SDK 1.3.3.0 新增的 `ApplyImpulse` 和 `ApplyAreaImpulseAndDamage` 的用法。

# 包含的主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `PhysicsImpulseExample.ts` | 衝量、範圍判定、偵錯顯示的主體 |
| `PhysicsImpulseExample.tscn` | 測試載具、按鈕、位置的配置範例 |
| `README_PhysicsImpulse.ts` | 物理衝量 API 說明 |
| `tsconfig.json` | 範例的 TypeScript 設定 |

# 物理衝量 API

| 名稱 | 作用 |
| ---- | ---- |
| `mod.ApplyImpulse(...)` | 對指定一台載具，以位置、方向、強度施加衝量 |
| `mod.ApplyAreaImpulseAndDamage(...)` | 對指定範圍內載具施加衝量，並可附加傷害 |

目標載具已經確定時使用 `ApplyImpulse`。
爆炸、推開區域、範圍機關等需要中心點和半徑的處理，則使用 `ApplyAreaImpulseAndDamage`。

# 處理流程

範例用按鈕或輸入作為觸發，對載具施加衝量。
對比單車推動和範圍衝量，就能看出參數的思路。

方向通常與 `CreateVector` 或 `DirectionTowards` 組合決定。
強度從小值開始，只增加到載具按預期反應為止。

# 注意點

範圍衝量很方便，但半徑太大時會一次影響很多載具。
如果在高頻 Ongoing 中反覆執行，效能和遊戲體驗都會變差。

偵錯時，把半徑、強度、傷害量設為常數，再逐步提高。

# 結論

`PhysicsImpulseExample` 是學習推動載具、擊飛載具、讓載具對範圍做出反應的教材。
單一目標用 `ApplyImpulse`，範圍處理用 `ApplyAreaImpulseAndDamage`。只要先分清這一點，載具機關就好設計得多。
