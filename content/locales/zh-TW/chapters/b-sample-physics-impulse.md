---
title: "附錄 B：範例程式說明「PhysicsImpulse_Gym（物理衝量）」"
free: true
---

# PhysicsImpulse_Gym 要看什麼

`PhysicsImpulse_Gym` 是對載具施加物理衝量的範例。
可以比較 SDK 1.3.3.0 新增的 `ApplyImpulse` 和 `ApplyAreaImpulseAndDamage` 的用法。

# 包含的主要檔案

| 檔案 | 作用 |
| ---- | ---- |
| `PhysicsImpulse_Gym.ts` | 衝量、範圍判定、偵錯顯示的主體 |
| `PhysicsImpulse_Gym.tscn` | 測試載具、按鈕、位置的配置範例 |
| `PhysicsImpulse_Gym.strings.json` | 顯示文字 |
| `README_PhysicsImpulse_Gym.md` | 物理衝量 API 說明 |

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

`PhysicsImpulse_Gym` 是學習推動載具、擊飛載具、讓載具對範圍做出反應的教材。
單一目標用 `ApplyImpulse`，範圍處理用 `ApplyAreaImpulseAndDamage`。只要先分清這一點，載具機關就好設計得多。

