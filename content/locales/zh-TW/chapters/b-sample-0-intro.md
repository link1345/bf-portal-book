---
title: "附錄 B：導讀：官方範例的閱讀方法"
free: true
---

# 0 按照特定順序閱讀官方範例

SDK 包含官方範例。如果一上來就閱讀大型範例，UI、AI、車輛和狀態管理會同時出現，這可能會讓人感到困惑。

首先，按以下順序閱讀它們。

1. `docs/pages`
2. `code/types/mod/index.d.ts`
3. `GodotProject/mods/_StartHere_BasicTemplate`
4. 按目的分類的範例

按這個順序，你可以從官方文件中掌握概念，檢查類型定義中的 API 名稱，在最小模板中查看事件的形狀，然後進入實戰範例。

# 1 SDK 資料夾的閱讀方法

| 位置 | 看什麼 | 閱讀方式 |
| ---- | ---- | ---- |
| `docs/pages/getting_started.html` | 啟動 Godot、Portal Setup 與打開關卡的步驟 | 確認環境建置 |
| `docs/pages/spatial_editor.html` | Spatial Editor 操作、Object Library、匯出 | 第 4 章的補充 |
| `docs/pages/gameplay_logic.html` | TypeScript、日誌、UI、AI、Spawn、ObjId 參考 | 第 6 章的補充 |
| `docs/pages/tips_tricks.html` | 效能說明 | 第 8 章與第 9 章的補充 |
| `code/types/mod/index.d.ts` | `mod` 命名空間中的所有 API | 搜尋函式名稱確認用法 |
| `GodotProject/mods` | 官方範例 | 依目的閱讀 |

如果你遇到不知道的 API，請先在 `index.d.ts` 中搜尋函數名稱。 Portal 的 TypeScript 最終呼叫 `mod` 命名空間中的函數，所以這就是字典。

# 2 最先閱讀的官方範例

| 範例 | 首先閱讀的理由 |
| ---- | ---- |
| `_StartHere_BasicTemplate` | 事件函數等基本形式，`GetObjId`、`Message`、`CreateVector` 等基本形式集中在一起 |
| `PortalGadgetExample` | 查看 Portal Gadget 輸入事件、RayCast 和單一玩家反應 |
| `FixedCameraExample` | 可以查看相機切換和 UI 按鈕事件的基礎知識 |
| `VL7Example` | 可以查看特殊物件的進入 / 退出事件 |
| `BumperCars` | 閱讀小遊戲循環、車輛和狀態管理的範例 |
| `GibraltarGrandprix` | 閱讀比賽、檢查點、名次 UI 和車輛選擇的範例 |
| `AcePursuit` | 閱讀飛機競速、時間限制、狀態管理的範例 |
| `HybridExample` | 閱讀從 Portal 區塊呼叫 TypeScript，並把回傳值交給變數或 UI 的範例 |
| `NightModeExample` | 閱讀夜間畫面效果、NVG 裝備、SFX 切換、VFX 顏色變化的範例 |
| `GolmudTrainExample` | 閱讀 Railway to Golmud 列車控制、列車位置取得、移動目標點的範例 |
| `MovingPlatformExample` | 閱讀使用 `MoveObjectOverTime` 和 `OrbitObjectOverTime` 製作移動平台的範例 |
| `ObliterationExample` | 閱讀組合 Bomb、M-COM 和炸彈事件的 Obliteration 風格規則範例 |
| `PhysicsImpulse_Gym` | 閱讀透過 `ApplyImpulse` 和 `ApplyAreaImpulseAndDamage` 對載具施加衝量的範例 |
| `PortalPerformanceExample` | 閱讀確認 Portal 邏輯和伺服器平均影格時間的範例 |
| `CustomCQ` | 閱讀大型 Conquest 風格範本、ObjID 設計、多地圖支援的範例 |

對於初學者來說，`_StartHere_BasicTemplate` 就足夠了。複雜範例作為可執行的成品很有吸引力，但資訊量太大，不適合作為最開始的教材。

# 3 讀取範例時的備忘表

| 查看項目 | 注意事項 |
| ---- | ---- |
| 入口事件 | `OnGameModeStarted`、`OnPlayerDeployed`、`OnPlayerInteract` 等 |
| 狀態管理 | `phase`、`GameState`、`PlayerProfile` 等 |
| ObjId 參照 | 取得位置，如 `GetInteractPoint(500)` |
| UI | 在哪裡建立、更新和刪除 |
| 等待處理 | `mod.Wait` 的週期和目的 |
| 多重觸發對策 | `isProcessing...`，冷卻時間，標誌 |

只需填寫此表即可查看範例的整體圖。先讀結構，而不是一上來讀完整程式碼。這聽起來可能很誇張，但確實有用。

# 4 你想要從官方範例融入的寫作風格

如果你閱讀一些官方範例，即使細節有所不同，你也會看到類似的方式。
這不僅僅是一種偏好，它是一種使更大的程式碼更容易閱讀、更容易修復以及更容易以後擴展的方法。

請注意，在 `unsupported` 下移動的範例包含一些看起來很方便的寫作風格。
但是，本文檔只採用目前位於 `GodotProject/mods` 的支援範例中可以讀到的做法。

## 1. 把設定值集中到開頭

將參與者數量、時間限制、偵錯旗標、候選車輛、檢查點定義、UI 名稱等放在檔案頂部。

如果你直接在過程中間寫入 `10`、`500`、`true` 等值，那麼當你稍後嘗試調整它時，它將成為搜尋噩夢。
如果你一開始就收集它們，你會決定在調整這個模式時要看哪裡。

```ts
const MIN_PLAYERS = 2;
const COUNTDOWN_SECONDS = 10;
const DEBUG = false;
const VEHICLE_POOL = [mod.VehicleList.Quadbike, mod.VehicleList.GolfCart];
```

第 7 章的 `ids.ts` 和 `config.ts` 也是這個想法的延伸。
透過簡單地將數字和設定更改為名稱，程式碼就變得更容易閱讀。

## 2. 當程式碼變大後，用類別劃分職責

在較大的範例中，例如 `BumperCars`、`GibraltarGrandprix`、`AcePursuit` 和 `CustomCQ`，狀態管理、玩家管理和 UI 管理被分為不同的類別或規則區塊。

這並不意味著你應該將所有 Portal 程式碼變成一個類別。
一開始只用函式就足夠了。然而，隨著每個玩家的狀態和 UI 數量的增加，如果你根據職責將它們分成不同的類，將會更容易閱讀。

| 角色 | 範例 |
| ---- | ---- |
| 遊戲整體 | `GameState`，開始條件，勝者判定，結束處理 |
| 每位玩家 | `PlayerProfile`，Ready 狀態、車輛、分數、個人 UI |
| 整個比賽 | `TrackData`，檢查點，圈數，獲勝者 |
| UI | 建立、更新、關閉、刪除 |

使用類別時重要的不是增加「有名字的箱子」，而是把會因為同一個理由一起變化的處理放在同一個地方。
例如，如果改變玩家的 Ready 狀態、更新 Ready 顯示以及離開時關閉 UI 的處理分散在各處，之後肯定很難追蹤。

## 3. UI 分離建立、更新和關閉

UI 是使用類別的特別有效的地方。
在大型範例中，建立 widget、更新顯示內容、隱藏 / 刪除的處理是分開的。

當你想要更改顯示內容、修復忘記關閉畫面或更改每個玩家的顯示時，這可以讓你更輕鬆地知道該改哪裡。

```ts
class ReadyUpUI {
  constructor(private player: mod.Player) {}

  update(): void {
    // Update text and visibility.
  }

  close(): void {
    // Hide or delete widgets.
  }
}
```

乍看之下似乎有點誇張，但 UI 越多，效果越好。
只要分離「建立」、「更新」和「關閉」，之後添加表現效果和狀態就會更容易。

# 結論

只要按正確順序閱讀，官方範例就是很強的學習材料。

首先，把 `docs/pages` 和 `index.d.ts` 當作字典，並用 `_StartHere_BasicTemplate` 掌握事件的形狀。然後閱讀 `GodotProject/mods` 下依目的分類的範例。SDK 1.3.2.0 把 `NightModeExample` 和 `GolmudTrainExample` 加入閱讀對象，SDK 1.3.3.0 又加入了 `MovingPlatformExample`、`ObliterationExample`、`PhysicsImpulse_Gym`、`PortalPerformanceExample`。現在可以學習夜間效果、列車控制、移動平台、Bomb/M-COM、物理衝量和效能測量。
接著，不要照搬範例的全部內容，而是把設定值集中管理、用類別分離職責、UI 管理方式這些寫法吸收到自己的程式碼中。本書的附錄 B 也只介紹這個資料夾中的範例。

---

📘 **在下一章「附錄 B：範例程式說明'_StartHere_BasicTemplate'」**中，我們將解釋你應該先閱讀的基本範本。
