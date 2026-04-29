---
title: "附錄C：modlib解釋 使SDK更容易使用的輔助函式庫"
free: true
---

::::message
本附錄目前只是粗略的機器翻譯，文字可能非常不自然。我之後會認真修改，暫時請多包涵。
::::

# 什麼是 modlib？

`modlib` 是 BF6 Portal SDK 隨附的 TypeScript 輔助函式庫。
位置是 `code/modlib/index.ts`。

Portal 的主要 API 位於 `mod` 命名空間。
例如，類似 `mod.DisplayNotificationMessage`、`mod.GetObjId`、`mod.AllPlayers`、`mod.AddUIText` 的函數。

另一方面，`modlib` 並不是 `mod` 的直接替代方案。
這是一個構建在 `mod` 之上的“有用函數集合”，用於縮短頻繁編寫的流程並隱藏 Portal 的一些獨特的處理困難。

在本文檔中，我們將優先使用 `modlib` 作為基本策略。
`modlib`中提供的流程，例如通知、取得隊伍中的玩家、轉換傳送陣、觸發條件一次、生成UI等，請先考慮`modlib`。
僅適用於 `modlib` 中不可用的功能或您想要詳細控制其行為的進程，直接使用 `mod` 。

使用時，在腳本開頭載入。

```ts
import * as modlib from "modlib";
```

並這樣稱呼它：

```ts
export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.welcome), eventPlayer);
}
```

# mod和modlib之間的關係

`mod` 是 Portal 的官方 API 主體。
真正對Portal發出指令的功能，例如遊戲內事件、玩家操作、UI產生、聲音、載具、目標、座標計算等，基本上都位於`mod`。

`modlib` 是使用 `mod` 建立的輔助層。
例如：

|類型 |直接用mod寫成| modlib 可以提供哪些幫助 |
| --- | --- | --- |
|通知顯示 |需要根據是否有目標來不同地呼叫函數 |摘要位於 `ShowNotificationMessage` |
|讓球員加入球隊|轉動 `AllPlayers` 並比較 `GetTeam` |總結 `getPlayersInTeam` |
|入口網站陣列處理|閱讀 `mod.Array` 和 `CountOf` / `ValueInArray` |使用 `ConvertArray` 轉換為 JavaScript 陣列 |
|只觸發一次條件 |擁有自己的國旗 |使用 `ConditionState` 和 `get...Condition` |
|使用者介面產生 | `AddUIText` 和 `AddUIContainer` 的參數很長 |您可以使用 `ParseUI` | 以 JSON 風格撰寫

換句話說，`modlib` 是一個「讓 Portal 的標準 API 像 TypeScript 一樣更容易使用的工具箱」。

# 使用訂單策略

本書的建議是先使用`modlib`，只有必要時才直接使用`mod`。

原因很簡單。
`modlib` 以簡短且安全的方式總結了門戶製作中經常出現的麻煩流程。
與其每次都掃描 `AllPlayers`，呼叫是否有通知目標，或列出很長的 UI 參數，不如先使用 `modlib` 函數，這樣會比較容易讀取。

用法如下。

|狀態 |推薦 |
| --- | --- |
|我想要執行通知、團隊採集、陣列轉換、條件管理和 UI 產生 |首先，使用 `modlib` |
|多次寫入通知顯示|使用 `modlib.ShowNotificationMessage` 等 |
|增加了對 `mod.Array` 的掃描 |使用 `ConvertArray` 和 `FilteredArray` |
|我只想在 `Ongoing...` | 條件變成真時進行處理使用 `ConditionState` / `get...Condition` |
|創建大量UI |考慮 `ParseUI` |
|我想使用 `modlib` | 中不可用的 Portal API直接使用`mod` |
|我不理解這種行為並想調試它 |讀取 `modlib` 的內容，並在必要時恢復直接調用 `mod` |

但是，`modlib` 的內容是呼叫 `mod` API 的 TypeScript 程式碼。
即使您喜歡使用 `modlib`，當您遇到困難時能夠閱讀 `index.ts` 也是一個好主意。
請參閱本附錄 C 作為逐個功能詳細資訊的字典。

# 整體配置

`index.ts`大致可以分成以下五個部分。

|範圍 |內容 |
| --- | --- |
|字串、條件和陣列的幫助 | `Concat`、`And`、`ConvertArray`、`FilteredArray` 等 |
| ObjId 與條件狀態 | `getPlayerId`、`ConditionState`、`getPlayerCondition` 等 |
|團隊協助| `getPlayersInTeam` | `getPlayersInTeam` |
| JSON 風格的 UI 產生 | `ParseUI` 和內部 `__addUI...` 系統 |
|通知/訊息顯示 | `ShowNotificationMessage`、`ShowEventGameModeMessage`、`DisplayCustomNotificationMessage` 等 |

文件中也有以 `__` 開頭的函數，例如 `__asModVector`、`__addUIText` 等。
這些是供內部實施的。
基本上，不要直接從外部呼叫它，而是使用公共 `export function`。

# 基本語法幫助

## 連接

```ts
modlib.Concat("A", "B");
```

連接兩個字串。
Portal API 端也有 `mod.Concat`，但 `modlib.Concat` 只是將普通 TypeScript 字串與 `+` 組合在一起。

申請很簡單。
當您想要組裝字串時可以使用它。
然而，在 TypeScript 中，模板字串通常更容易閱讀。

```ts
const name = "Alpha";
const label = `Team ${name}`;
```

## 並且

```ts
if (modlib.And(isReady, hasPlayer, !isLocked)) {
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.ready));
}
```

依序查看多個布林值，如果全部都是 `true`，則回傳 `true`。
如果有一個 `false` ，它就會停在那裡。

`mod.And` 有兩個參數，但 `modlib.And` 有可變長度。
當存在三個或更多條件時，它會變得更容易閱讀。

## 和Fn

```ts
if (modlib.AndFn(
  () => canStart(),
  () => mod.CountOf(mod.AllPlayers()) > 0,
  () => !isLocked
)) {
  startGame();
}
```

`AndFn` 接收多個「傳回布林值的函數」而不是布林值本身。
由左開始依序執行，中間如果到達`false`，則其餘的不執行。

透過放置較重的條件或稍後想要避免副作用的條件，可以減少不必要的處理。

## 如果那麼其他

```ts
const label = modlib.IfThenElse(
  isAttackTeam,
  () => "攻撃",
  () => "防衛"
);
```

若條件為`true`，則回傳`ifTrue()`的結果，若條件為`false`，則傳回`ifFalse()`的結果。

它與 `mod.IfThenElse` 類似，但 `modlib.IfThenElse` 是傳遞函數的一種形式。
當您只想評估必要的一面時，可以使用此方法。

## 等於

```ts
if (modlib.Equals(mod.GetTeam(player), mod.GetTeam(1))) {
  // Team 1
}
```

它在內部呼叫 `mod.Equals(a, b)`。
但是，如果其中一個是 `null`，則包含 `debugger`。

這是一個旨在「更容易注意到空比較」的實現，但請在發布之前小心程式碼。
儘管這對於調查原因很有用，但它可能會導致偵錯器意外停止。

# 幫助處理 Portal 數組

Portal SDK 中的 `mod.Array` 不是普通的 JavaScript 陣列。
您應該閱讀 `mod.CountOf` 和 `mod.ValueInArray` 而不是 `for ... of` 和 `array.length`。

`modlib` 有一個函數可以填補這個差異。

## 轉換數組

```ts
const players = modlib.ConvertArray(mod.AllPlayers()) as mod.Player[];
```

將 `mod.Array` 轉換為 JavaScript 陣列。

在內部，流程如下。

1.使用`mod.CountOf(array)`取得元素數量
2、一一唸`mod.ValueInArray(array, i)`
3. `push` 到 JavaScript 陣列

當您想要像 TypeScript 一樣處理 `AllPlayers()` 或 `GetPlayersOnPoint()` 的結果時，這非常有用。

## 過濾數組

```ts
const team1Players = modlib.FilteredArray(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

過濾 `mod.Array` 並將其作為新的 `mod.Array` 返回。
請注意，傳回值是 `mod.Array` 而不是 JavaScript 陣列。

內部使用 `ConvertArray` 轉換為 JavaScript 數組，只有符合條件的元素才會使用 `mod.AppendToArray` 返回 Portal 數組。

## IndexOfFirstTrue

```ts
const index = modlib.IndexOfFirstTrue(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.IsPlayerValid(player);
});
```

回傳條件首先變成 `true` 的元素的索引。
如果未找到，請使用 `-1`。

它可以用於“搜尋第一個有效玩家”和“搜尋第一個符合條件的車輛”等目的。

## 對所有人來說都是真實的

```ts
const allReady = modlib.IsTrueForAll(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return isPlayerReady(player);
});
```

判斷`mod.Array`的所有元素是否符合條件。
如果至少有一個是 `false`，那它是 `false`。

## 對任何人來說都是真實的

```ts
const hasAttacker = modlib.IsTrueForAny(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

判斷 `mod.Array` 中是否有一個符合條件。

## 排序數組

```ts
const sorted = modlib.SortedArray(players, (a, b) => {
  return mod.GetPlayerKills(b) - mod.GetPlayerKills(a);
});
```

複製 JavaScript 陣列並傳回按比較函數排序的新陣列。
您在這裡收到的是 `any[]` 而不是 `mod.Array`。

假設用`ConvertArray`轉換後使用。

# 協助取得ObjId

## 取得玩家ID

```ts
const id = modlib.getPlayerId(eventPlayer);
```

它在內部呼叫 `mod.GetObjId(player)`。
取得玩家的 ObjId 作為數字。

## 取得團隊ID

```ts
const teamId = modlib.getTeamId(mod.GetTeam(eventPlayer));
```

它在內部呼叫 `mod.GetObjId(team)`。
當您想要將團隊作為數字 ID 進行比較時，請使用此選項。

它也用在正文的第 6b 章中，以使團隊比較更易於閱讀。

```ts
const eventTeamId = modlib.getTeamId(eventTeam);
const teamId = modlib.getTeamId(team);
```

# 處理條件的“上升”

Portal中持續呼叫`Ongoing...`系列事件。
如果在條件為真時運行該進程，則將一遍又一遍地執行相同的通知、相同的分數添加和相同的生成。

因此，`modlib` 具有「僅在從 false 變成 true 時才通過」的狀態管理。

## 條件狀態

```ts
const enoughPlayersState = new modlib.ConditionState();

/**
 * Returns true when there are enough players to start.
 */
function hasEnoughPlayersToStart(): boolean {
  return mod.CountOf(mod.AllPlayers()) >= 2;
}

export function OngoingGlobal(): void {
  if (enoughPlayersState.update(hasEnoughPlayersToStart())) {
    mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.readyPlayers));
  }
}
```

`ConditionState` 是一個記住先前狀態的小類。

`update(newState)` 的工作原理如下：

|上一頁 |這次|回傳值 |意義|
| --- | --- | --- | --- |
|假 |假 |假 |尚未符合條件 |
|假 |真 |真 |條件滿足的那一刻 |
|真 |真 |假 |已成立，但將不再被接受|
|真 |假 |假 |重置|

換句話說，當 `true` 繼續時，它只會傳遞一次。
一旦回到`false`，就會再次經過下一個`true`。

我們建議您不要直接在 `update()` 中寫長條件表達式。
如果將其分為 `hasEnoughPlayersToStart()`、`isStartInteract()`、`canReachTarget()` 等決策函數，則可以透過名稱讀取「它在等待什麼」。
請用簡短的英文對入口網站上發布的程式碼進行註釋，以避免使用多位元組字元。

## 取得全域條件

```ts
/**
 * Returns true when the match can start.
 */
function canStartMatch(): boolean {
  return mod.CountOf(mod.AllPlayers()) >= 2;
}

export function OngoingGlobal(): void {
  const condition = modlib.getGlobalCondition(0);

  if (condition.update(canStartMatch())) {
    modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.ready));
  }
}
```

按數字取得全域條件狀態。
透過劃分 `0`、`1`、`2` 等數字，您可以分別管理多個條件。

## 取得玩家條件

```ts
/**
 * Returns true when the player needs a warning.
 */
function isLowHealth(player: mod.Player): boolean {
  return mod.GetSoldierState(player, mod.SoldierStateNumber.Health) < 30;
}

export function OngoingPlayer(eventPlayer: mod.Player): void {
  const condition = modlib.getPlayerCondition(eventPlayer, 0);

  if (condition.update(isLowHealth(eventPlayer))) {
    modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.lowHealth), eventPlayer);
  }
}
```

每個玩家都有一個條件狀態。
即使條件編號相同，每個玩家也會有不同的條件。

## 取得團隊條件

```ts
const condition = modlib.getTeamCondition(mod.GetTeam(1), 0);
```

每個團隊都有一個條件狀態。
可用於實現團隊目標、達到分數、人數條件等。

## 依物件條件

以下函數對每個物件都有一個條件狀態。

|功能|目標|何時使用 |
| --- | --- | --- |
| `getCapturePointCondition` | `getCapturePointCondition` | `mod.CapturePoint` | `mod.CapturePoint` |職業開始、職業完成、人數變化|
| `getMCOMCondition` | `getMCOMCondition` | `mod.MCOM` | `mod.MCOM` |布防狀態、釋放狀態、破壞狀態|
| `getVehicleCondition` | `getVehicleCondition` | `mod.Vehicle` | `mod.Vehicle` |登機、破壞和速度狀況|
| `getHQCondition` | `getHQCondition` | `mod.HQ` | `mod.HQ` |總部啟用，所有權團隊變更 |
| `getSectorCondition` | `getSectorCondition` | `mod.Sector` | `mod.Sector` |產業進展狀況 |
| `getVehicleSpawnerCondition` | `getVehicleSpawnerCondition` | `mod.VehicleSpawner` | `mod.VehicleSpawner` |車輛產生能力、冷卻時間 |

在內部，`mod.GetObjId(obj)` 用於指派每個 ObjId 的狀態陣列。

# 取得團隊中的玩家

## 取得團隊中的玩家

```ts
const team1Players = modlib.getPlayersInTeam(mod.GetTeam(1));
```

以 JavaScript 陣列的形式傳回屬於指定球隊的球員。

內部流程如下。

1. 取得所有玩家 `mod.AllPlayers()`
2.一一唸`mod.CountOf`和`mod.ValueInArray`
3.對比`mod.GetTeam(player)`的ObjId和目標團隊的ObjId
4. 將符合的玩家放入 JavaScript 陣列中

它可用於基於團隊的通知、特定於團隊的 UI 以及所有團隊的狀態重置。

```ts
for (const player of modlib.getPlayersInTeam(mod.GetTeam(1))) {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.attackTeam), player);
}
```

# 以 JSON 風格 ParseUI 建立 UI

`ParseUI` 是一個函數，可讓您將 `AddUIContainer`、`AddUIText`、`AddUIImage` 和 `AddUIButton` 的長參數寫成類似 JSON 的物件。

```ts
const root = modlib.ParseUI({
  name: "RootPanel",
  type: "Container",
  position: [40, 40],
  size: [360, 120],
  anchor: mod.UIAnchor.TopLeft,
  bgColor: [0, 0, 0],
  bgAlpha: 0.45,
  children: [
    {
      name: "TimerText",
      type: "Text",
      position: [12, 12],
      size: [320, 40],
      textLabel: mod.Message(mod.stringkeys.timeLeft),
      textSize: 24,
      textColor: [1, 1, 1],
    },
  ],
});
```

## 對應類型

|類型 |內部呼叫的函數 |它創造了什麼|
| --- | --- | --- |
| `Container` | `Container` | `mod.AddUIContainer` | `mod.AddUIContainer` | UI父框架|
| `Text` | `Text` | `mod.AddUIText` | `mod.AddUIText` |字元顯示|
| `Image` | `Image` | `mod.AddUIImage` | `mod.AddUIImage` |圖片展示|
| `Button` | `Button` | `mod.AddUIButton` | `mod.AddUIButton` |使用者介面按鈕 |

透過使用 `children`，您可以將文字和按鈕掛在容器下。

## 座標和顏色也可以寫成數組

`ParseUI` 在內部，使用 `__asModVector` 將 `number[]` 轉換為 `mod.Vector`。

```ts
position: [50, 100]
size: [300, 80]
bgColor: [0.2, 0.2, 0.2]
```

對於 2 元素數組，Z 被視為 0。
如果有 3 個元素，則為 X/Y/Z。

## 關於 textLabel 和 Message 的註釋

如果文字 `textLabel` 是字串，則會在內部轉換為 `mod.Message(textLabel)`。
然而，在 `Strings.json` 上預先註冊播放器畫面上顯示的字元是基本的。
對於螢幕上出現的字符，請使用 `Strings.json` 鍵，例如 `textLabel`、通知、WorldIcon 文字、`SetUITextLabel` 等。

```ts
textLabel: mod.Message(mod.stringkeys.start)
```

如果要插入變量，請將 `{}` 放在 `Strings.json` 一側，並將值傳遞給 `mod.Message` 的第二個參數。

```json
{
  "testName": "test name:{}",
  "defendSeconds": "defend:{}s"
}
```

```ts
textLabel: mod.Message(mod.stringkeys.testName, "player1")
```

在這種情況下，螢幕將顯示類似 `test name:player1` 的內容。
對於 `mod.Message`，您最多可以使用 3 個附加參數。

## 可以縮小顯示目標

透過指定 `teamId` 或 `playerId`，您可以縮小 UI 中顯示的內容範圍。

```ts
modlib.ParseUI({
  name: "OnlyPlayer",
  type: "Text",
  position: [0, 120],
  size: [400, 60],
  anchor: mod.UIAnchor.TopCenter,
  textLabel: mod.Message(mod.stringkeys.onlyYou),
  playerId: eventPlayer,
});
```

它的名稱是 `playerId`，但其類型是 `mod.Player`。
它不是數字 ID。

## ParseUI 的註釋

`ParseUI` 很有用，但它不會每幀都重新建立它。

由於 UI 的產生成本往往很高，因此基本策略如下。

1.開始或加入遊戲時創建
2. 從 `FindUIWidgetWithName` 取得
3. 使用 `SetUITextLabel` 或 `SetUIWidgetVisible` 進行更新
4. 當不再需要時，使用 `DeleteUIWidget` 刪除它

特別是避免在 `Ongoing...` 系列中連續呼叫 `ParseUI` 。

# 通知/訊息顯示輔助

## 顯示通知訊息

```ts
modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.goEntrance), eventPlayer);
```

顯示右上角的通知。
如果省略目標，則會向所有人顯示，如果傳遞 `Player`，則會單獨顯示。

它在內部呼叫 `mod.DisplayNotificationMessage`。

## 顯示突出顯示的遊戲模式訊息

```ts
modlib.ShowHighlightedGameModeMessage(mod.Message(mod.stringkeys.targetCaptured));
```

在小地圖上的世界日誌上顯示突出顯示的訊息。
它在內部呼叫 `mod.DisplayHighlightedWorldLogMessage`。

## 顯示事件遊戲模式訊息

```ts
modlib.ShowEventGameModeMessage(mod.Message(mod.stringkeys.roundStart));
```

在螢幕頂部顯示大型遊戲模式訊息樣式 UI。

請參閱 `index.ts` 中的註釋，它是作為替代實作創建的，直到原始的 `DisplayGameModeMessage` 被修復。
在內部，使用 `AddUIText` 建立臨時 UI，等待 6 秒，然後使用 `DeleteUIWidget` 將其刪除。

換句話說，這不是一個純粹的Portal標準訊息，而是「在UI中創建的替代顯示」。
它對於短期引導很有用，但如果重複按下它，很可能會導致衝突並顯示覆蓋同名的小部件，因此請避免頻繁地呼叫它。

## 顯示自訂通知訊息

```ts
modlib.DisplayCustomNotificationMessage(
  mod.Message(mod.stringkeys.defending),
  mod.CustomNotificationSlots.MessageText1,
  5,
  eventPlayer
);
```

顯示類似自訂通知槽的 UI。
您可以省略目標或指定 `Player` 或 `Team`。

如果您傳遞 `Team`，請使用 `getPlayersInTeam` 來取得團隊成員，並為每位玩家建立單獨的 UI。

對於 `duration > 0`，會在指定秒數後自動刪除。
如果 `duration` 設定為 0 或更少，則不會自動刪除，因此我們將設計稍後呼叫 `ClearCustomNotificationMessage`。

## 清除自訂通知訊息

```ts
modlib.ClearCustomNotificationMessage(
  mod.CustomNotificationSlots.MessageText1,
  eventPlayer
);
```

刪除指定插槽的自訂通知 UI。
如果沒有目標，則會從所有玩家中刪除，如果是 `Player` 則會從個人中刪除，如果是 `Team` 則會從整個團隊中刪除。

在內部，使用 `FindUIWidgetWithName` 和 `DeleteUIWidget`。
包裝在 `try/catch` 中，以防發現沒有任何內容被刪除。

## 清除所有自訂通知訊息

```ts
modlib.ClearAllCustomNotificationMessages(eventPlayer);
```

一次清除指定玩家的自訂通知槽。
目標僅為 `Player`。

依序刪除 HeaderText、MessageText1、MessageText2、MessageText3 和 MessageText4。

# 公用函數列表

## 基礎知識/條件/數組

|功能|目的|傳回值 |
| --- | --- | --- |
| `Concat(s1, s2)` | `Concat(s1, s2)` |連接字串 | `string` | `string` |
| `And(...rest)` | `And(...rest)` |判斷多個布林值是否皆為true | `boolean` | `boolean` |
| `AndFn(...rest)` | `AndFn(...rest)` |判斷所有多個條件函數是否為 true | `boolean` | `boolean` |
| `IfThenElse(condition, ifTrue, ifFalse)` | `IfThenElse(condition, ifTrue, ifFalse)` |只根據條件評估並傳回一個函數 | `T` | `T` |
| `Equals(a, b)` | `Equals(a, b)` | `mod.Equals` 比較兩個值 | `boolean` |
| `WaitUntil(delay, cond)` | `WaitUntil(delay, cond)` |等待指定的秒數，或者如果中途條件變為真則退出 | `Promise<void>` | `Promise<void>` |
| `ConvertArray(array)` | `ConvertArray(array)` |將 `mod.Array` 轉換為 JavaScript 陣列 | `any[]` |
| `FilteredArray(array, cond)` | `FilteredArray(array, cond)` |按條件過濾 `mod.Array` | `mod.Array` |
| `IndexOfFirstTrue(array, cond, arg)` | `IndexOfFirstTrue(array, cond, arg)` |回傳符合條件 | 的第一個元素編號`number` | `number` |
| `IsTrueForAll(array, condition, arg)` | `IsTrueForAll(array, condition, arg)` |判斷所有元素是否符合條件 | `boolean` | `boolean` |
| `IsTrueForAny(array, condition, arg)` | `IsTrueForAny(array, condition, arg)` |判斷是否有任一元素符合條件 | `boolean` | `boolean` |
| `SortedArray(array, compare)` | `SortedArray(array, compare)` |傳回 JavaScript 陣列的排序副本 | `any[]` | `any[]` |

## ObjId/條件狀態

|函數/類別 |目的|
| --- | --- |
| `getPlayerId(player)` | `getPlayerId(player)` |取得玩家的 ObjId |
| `getTeamId(team)` | `getTeamId(team)` |取得團隊的 ObjId |
| `ConditionState` | `ConditionState` |僅在從 false 變成 true 時才傳遞的狀態類別 |
| `getGlobalCondition(n)` | `getGlobalCondition(n)` |取得全域條件狀態 |
| `getPlayerCondition(obj, n)` | `getPlayerCondition(obj, n)` |取得玩家的狀況狀態 |
| `getTeamCondition(team, n)` | `getTeamCondition(team, n)` |依隊伍取得狀況狀態 |
| `getCapturePointCondition(obj, n)` | `getCapturePointCondition(obj, n)` |透過 CapturePoint 取得條件狀態 |
| `getMCOMCondition(obj, n)` | `getMCOMCondition(obj, n)` |透過 MCOM 取得狀況狀態 |
| `getVehicleCondition(obj, n)` | `getVehicleCondition(obj, n)` |依車輛取得車況狀態 |
| `getHQCondition(obj, n)` | `getHQCondition(obj, n)` |透過總部取得狀況狀態 |
| `getSectorCondition(obj, n)` | `getSectorCondition(obj, n)` |依部門取得狀況狀態 |
| `getVehicleSpawnerCondition(obj, n)` | `getVehicleSpawnerCondition(obj, n)` |透過VehicleSpawner取得條件狀態 |

## 團隊/UI/通知

|功能|目的|
| --- | --- |
| `getPlayersInTeam(teamObj)` | `getPlayersInTeam(teamObj)` |傳回屬於指定球隊的球員陣列 |
| `ParseUI(...params)` | `ParseUI(...params)` |從類似 JSON 的參數建立 UI 小工具 |
| `DisplayCustomNotificationMessage(msg, custom, duration, target)` | `DisplayCustomNotificationMessage(msg, custom, duration, target)` |顯示自訂通知 UI |
| `ShowEventGameModeMessage(event, target)` | `ShowEventGameModeMessage(event, target)` |顯示遊戲模式訊息風格UI |
| `ShowHighlightedGameModeMessage(event, target)` | `ShowHighlightedGameModeMessage(event, target)` |顯示突出顯示的世界日誌訊息 |
| `ShowNotificationMessage(msg, target)` | `ShowNotificationMessage(msg, target)` |顯示右上角通知 |
| `ClearAllCustomNotificationMessages(target)` | `ClearAllCustomNotificationMessages(target)` |刪除所有指定玩家的自訂通知 |
| `ClearCustomNotificationMessage(custom, target)` | `ClearCustomNotificationMessage(custom, target)` |刪除指定的自訂通知槽 |

# 實踐中需要注意的地方

## 基本上優先考慮 modlib 並在必要時才使用 mods

在本文檔中，我們將在實作過程中優先使用 `modlib`。
請先使用`modlib`中提供的，例如`ShowNotificationMessage`、`getTeamId`、`ConvertArray`、`ConditionState`、`ParseUI`。

然後，僅對 `modlib` 中不可用的函數或要直接控制 `mod` 的詳細參數的進程使用 `mod`。
如果不起作用，請檢查 `modlib` 中呼叫了哪個 `mod` 函數。
例如，如果 `ShowNotificationMessage` 的行為很奇怪，請查看 `mod.DisplayNotificationMessage` 最終是如何被呼叫的。

## 不要使用 Ongoing 來進行繁重的處理

`ConvertArray(mod.AllPlayers())`、`getPlayersInTeam` 和 `ParseUI` 很有用，但每個畫面呼叫它們都會變得昂貴。

這是我特別想避免的例子。

```ts
export function OngoingGlobal(): void {
  modlib.ParseUI({ name: "Debug", type: "Text", textLabel: mod.Message(mod.stringkeys.debug) });
}
```

建立一次 UI，僅更新顯示的內容。

## WaitUntil 不是通用計時器

在 `WaitUntil` 上，有來自 SDK 方面的註釋，指出「等待時間可能太長」。
在內部，每 0.2 秒檢查一次條件。

對於需要嚴格計時的流程，請優先考慮專用狀態管理和事件。

## 建立條件編號的分類帳

數字 `getGlobalCondition(0)` 和 `getPlayerCondition(player, 2)` 隨著它們的增加而變得毫無意義。

保持不變是安全的。

```ts
const CONDITION_READY = 0;
const CONDITION_LOW_HEALTH = 1;

const readyState = modlib.getGlobalCondition(CONDITION_READY);
```

請依照與 ObjId 帳本相同的方式為 Condition 編號建立帳本。

## 不要讓 UI 名稱發生衝突

`ParseUI` 和通知系統使用 `FindUIWidgetWithName` 和 `DeleteUIWidget`。
如果您建立多個具有相同名稱的 UI，則可能會取得或刪除意外的小工具。

如果你有一個基於玩家的 UI，在名稱中包含 ObjId 會減少意外。

```ts
const name = `Timer_${mod.GetObjId(eventPlayer)}`;
```

# 首先要記住這 5 件事

你不需要一次記住所有內容。
最初，以下五個就足夠了。

|功能|原因 |
| --- | --- |
| `ShowNotificationMessage` | `ShowNotificationMessage` |您可以在右上角寫簡短的通知 |
| `getTeamId` | `getTeamId` |團隊比較容易閱讀 |
| `ConvertArray` | `ConvertArray` | `mod.Array` 可以視為普通陣列 |
| `ConditionState` / `getGlobalCondition` | `ConditionState` / `getGlobalCondition` |防止多次點火 |
| `ParseUI` | `ParseUI` |立即建立複雜的 UI |

# 總結

`modlib`是一個方便使用BF6 Portal SDK的輔助函式庫。

然而，它不是一個魔法圖書館。
裡面是呼叫 `mod` API 的 TypeScript 程式碼。
這就是為什麼當你遇到麻煩時，你可以透過閱讀 `index.ts` 來遵循這個機制。

在本書中，我們建議先使用 `modlib`，然後在必要時才直接使用 `mod`。
如果您對詳細用法感到困惑，請傳回附錄C中的函數清單和註解。
