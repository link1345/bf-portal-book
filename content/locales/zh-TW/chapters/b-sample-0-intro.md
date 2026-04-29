---
title: "附錄B：介紹如何閱讀正式範例"
free: true
---

# 0 按照特定順序閱讀官方樣本

SDK 包含官方範例。如果你突然讀到一個大樣本，UI、AI、車輛和狀態管理會同時出現，這可能會讓人感到困惑。

首先，按以下順序閱讀它們。

1. `docs/pages`
2. `code/types/mod/index.d.ts`
3. `GodotProject/mods/_StartHere_BasicTemplate`
4. 按用途分類的樣品

按照這個順序，您可以從官方文件中掌握概念，檢查類型定義中的 API 名稱，在最小模板中查看事件的形狀，然後轉到實際範例。

# 1 如何導航 SDK 資料夾

|地點 |看什麼 |如何閱讀 |
| ---- | ---- | ---- |
| `docs/pages/getting_started.html` | `docs/pages/getting_started.html` |啟動 Godot、入口網站設定與打開關卡的步驟 |確認環境建置 |
| `docs/pages/spatial_editor.html` | `docs/pages/spatial_editor.html` |空間編輯器操作、物件庫、匯出 |第 4 章的補充 |
| `docs/pages/gameplay_logic.html` | `docs/pages/gameplay_logic.html` | TypeScript、日誌、UI、AI、Spawn、ObjId 參考 |第 6 章的補充 |
| `docs/pages/tips_tricks.html` | `docs/pages/tips_tricks.html` |效能說明|第 8 章與第 9 章的補充 |
| `code/types/mod/index.d.ts` | `code/types/mod/index.d.ts` | `mod` 命名空間中的所有 API |搜尋函數名稱看看如何使用 |
| `GodotProject/mods` | `GodotProject/mods` |官方樣品|依目的閱讀 |

如果您遇到不知道的 API，請先在 `index.d.ts` 中搜尋函數名稱。 Portal 的 TypeScript 最終呼叫 `mod` 命名空間中的函數，所以這就是字典。

# 2 首先閱讀正式範例

|樣品|首先閱讀的理由 |
| ---- | ---- |
| `_StartHere_BasicTemplate` | `_StartHere_BasicTemplate` |事件函數等基本形式，`GetObjId`、`Message`、`CreateVector` 分組 |
| `PortalGadgetExample` | `PortalGadgetExample` |查看 Portal Gadget 輸入事件、RayCast 和單一玩家反應 |
| `FixedCameraExample` | `FixedCameraExample` |可以查看相機切換和UI按鈕事件的基礎知識 |
| `VL7Example` | `VL7Example` |可以查看特殊物件的進入/退出事件 |
| `BumperCars` | `BumperCars` |閱讀小遊戲循環、車輛和狀態管理的範例 |
| `GibraltarGrandprix` | `GibraltarGrandprix` |閱讀比賽、檢查站、排名 UI 和車輛選擇的範例 |

對於初學者來說，`_StartHere_BasicTemplate` 就足夠了。複雜的範例作為工作成品很有吸引力，但它們包含太多信息，初學者無法閱讀。

# 3 讀取樣本時的備忘表

|查看項目 |注意事項 |
| ---- | ---- |
|入學活動 | `OnGameModeStarted`、`OnPlayerDeployed`、`OnPlayerInteract` 等 |
|狀態管理| `phase`、`GameState`、`PlayerProfile` 等 |
|物件 ID 參考 |取得位置，如 `GetInteractPoint(500)` |
|使用者介面|在哪裡建立、更新和刪除 |
|等待處理| `mod.Wait` | 的期限和目的
|多次著火的對策| `isProcessing...`，冷卻時間，標誌 |

只需填寫此表即可查看樣品的完整圖片。首先閱讀結構而不是閱讀整個程式碼。這聽起來可能很花哨，但確實有效。

# 4 你想要從官方樣本融入的寫作風格

如果您閱讀一些官方範例，即使細節有所不同，您也會看到類似的方式。
這不僅僅是一種偏好，它是一種使更大的程式碼更容易閱讀、更容易修復以及更容易以後擴展的方法。

請注意，在 `unsupported` 下移動的範例包含一些看起來很方便的寫作風格。
但是，本文檔僅使用可從目前位於 `GodotProject/mods` 的支援範例中讀取的實務。

## 1 . 開始時收集設定值

將參與者數量、時間限制、調試標誌、候選車輛、檢查點定義、UI 名稱等放在文件頂部。

如果您直接在過程中間寫入 `10`、`500`、`true` 等值，那麼當您稍後嘗試調整它時，它將成為搜尋地獄。
如果你一開始就收集它們，你會決定在調整這個模式時要看哪裡。

```ts
const MIN_PLAYERS = 2;
const COUNTDOWN_SECONDS = 10;
const DEBUG = false;
const VEHICLE_POOL = [mod.VehicleList.Quadbike, mod.VehicleList.GolfCart];
```

第 7 章的 `ids.ts` 和 `config.ts` 也是這個想法的延伸。
透過簡單地將數字和設定更改為名稱，程式碼就變得更容易閱讀。

## 2 . 當孩子長大後，在課堂上劃分角色

在較大的範例中，例如 `BumperCars`、`GibraltarGrandprix` 和 `AcePursuit`，狀態管理、玩家管理和 UI 管理被分為不同的類別。

這並不意味著您應該將所有 Portal 程式碼變成一個類別。
首先，只要有功能就足夠了。然而，隨著每個玩家的狀態和 UI 數量的增加，如果您根據職責將它們分成不同的類，將會更容易閱讀。

|角色 |範例 |
| ---- | ---- |
|整個遊戲 | `GameState`，起始條件，獲勝者確定，結束過程 |
|每位玩家 | `PlayerProfile`，就緒狀態、車輛、分數、個人 UI |
|全程 | `TrackData`，檢查點，圈數，獲勝者 |
|使用者介面|建立、更新、關閉、刪除 |

分類中重要的不是增加「命名框」的數量，而是將因相同原因而變化的進程放置在同一個地方。
例如，如果改變玩家的Ready狀態、更新Ready顯示以及離開時關閉UI的過程是分散的，那麼以後肯定很難追蹤它們。

## 3 . UI 分離建立、更新和關閉

UI 是使用類別的特別有效的地方。
在大樣本中，建立widget的過程、更新顯示內容的過程、隱藏/刪除的過程是分開的。

當您想要更改顯示內容、修復忘記關閉畫面或更改每個玩家的顯示時，這可以讓您更輕鬆地知道觸摸哪裡。

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
透過簡單地分離“創建”、“更新”和“關閉”，以後添加效果和狀態變得更加容易。

# 結論

如果您按照正確的順序閱讀官方範例，它們將是一本強大的教材。

首先，將 `docs/pages` 和 `index.d.ts` 放入字典中，並用 `_StartHere_BasicTemplate` 記住事件形狀。然後閱讀 `GodotProject/mods` 下的專用範例。
然後，不要複製範例的全部內容，而是將設定值的聚合、使用類別的職責分離以及 UI 管理方式合併到您自己的程式碼中。本書的附錄 B 也僅涵蓋位於該資料夾中的範例。

---

📘 **在下一章「附錄B：範例程式說明'_StartHere_BasicTemplate'」**中，我們將解釋您應該先閱讀的基本範本。
