---
title: "附錄 C：modlib 說明：讓 SDK 更容易使用的輔助函式庫"
free: true
---

# 什麼是 modlib？

`modlib` 是 BF6 Portal SDK 隨附的 TypeScript 輔助函式庫。
位置是 `code/modlib/index.ts`。

Portal 的主要 API 位於 `mod` 命名空間。
例如 `mod.DisplayNotificationMessage`、`mod.GetObjId`、`mod.AllPlayers`、`mod.AddUIText` 等函數。

另一方面，`modlib` 並不是 `mod` 的直接替代方案。
它是建構在 `mod` 之上的便利函數集合，用來縮短經常編寫的處理，並稍微隱藏 Portal 特有的難用之處。

本書的基本方針是優先使用 `modlib`。
通知、取得隊伍內玩家、轉換 Portal 陣列、讓條件只觸發一次、生成 UI 等，如果 `modlib` 已經提供，請先考慮使用 `modlib`。
只有在 `modlib` 沒有對應功能，或需要細緻控制行為時，才直接使用 `mod`。

使用時，在腳本開頭載入。

```ts
import * as modlib from "modlib";
```

然後像這樣呼叫：

```ts
export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.welcome), eventPlayer);
}
```

# mod 和 modlib 的關係

`mod` 是 Portal 的官方 API 主體。
真正向 Portal 發出指令的函數，例如遊戲內事件、玩家操作、UI 生成、聲音、載具、目標、座標計算等，基本都位於 `mod`。

`modlib` 是使用 `mod` 建立的輔助層。
例如：

| 類型 | 直接用 mod 寫時 | modlib 的幫助 |
| --- | --- | --- |
| 通知顯示 | 需要根據有無對象分別呼叫函數 | 用 `ShowNotificationMessage` 統一處理 |
| 取得隊伍內玩家 | 遍歷 `AllPlayers` 並比較 `GetTeam` | 用 `getPlayersInTeam` 封裝 |
| Portal 陣列處理 | 用 `CountOf` / `ValueInArray` 讀取 `mod.Array` | 用 `ConvertArray` 轉換為 JavaScript 陣列 |
| 條件只觸發一次 | 自己保存狀態旗標 | 使用 `ConditionState` 和 `get...Condition` |
| UI 生成 | `AddUIText` 和 `AddUIContainer` 的參數很長 | 用 `ParseUI` 以 JSON 風格編寫 |

換句話說，`modlib` 是一個「讓 Portal 的標準 API 像 TypeScript 一樣更容易使用的工具箱」。

# 使用順序方針

本書建議先使用 `modlib`，只有必要時才直接使用 `mod`。

原因很簡單。
`modlib` 將 Portal 製作中經常出現的麻煩處理整理成較短、較安全的寫法。
與其每次都掃描 `AllPlayers`、根據通知對象分開呼叫函數、排列很長的 UI 參數，不如先使用 `modlib` 的函數，這樣更容易閱讀。

用法如下。

| 狀況 | 推薦 |
| --- | --- |
| 想要通知、隊伍取得、陣列轉換、條件管理、UI 生成 | 先使用 `modlib` |
| 多次編寫通知顯示 | 使用 `modlib.ShowNotificationMessage` 等 |
| `mod.Array` 的遍歷變多 | 使用 `ConvertArray` 或 `FilteredArray` |
| 只想在 `Ongoing...` 中條件變為 true 的瞬間處理 | 使用 `ConditionState` / `get...Condition` |
| 大量建立 UI | 考慮 `ParseUI` |
| 想使用 `modlib` 中沒有的 Portal API | 直接使用 `mod` |
| 不理解行為，想偵錯 | 閱讀 `modlib` 的內容，必要時回到直接呼叫 `mod` |

但是，`modlib` 的內容是呼叫 `mod` API 的 TypeScript 程式碼。
即使你喜歡使用 `modlib`，當你遇到困難時能夠閱讀 `index.ts` 也是一個好主意。
請把本附錄 C 當作按函數查閱的字典。

# 整體結構

`index.ts` 大致可以分成以下五個部分。

| 範圍 | 內容 |
| --- | --- |
| 字串、條件、陣列輔助 | `Concat`、`And`、`ConvertArray`、`FilteredArray` 等 |
| ObjId 與條件狀態 | `getPlayerId`、`ConditionState`、`getPlayerCondition` 等 |
| 隊伍輔助 | `getPlayersInTeam` |
| JSON 風格 UI 生成 | `ParseUI` 和內部的 `__addUI...` 系列 |
| 通知 / 訊息顯示 | `ShowNotificationMessage`、`ShowEventGameModeMessage`、`DisplayCustomNotificationMessage` 等 |

文件中也有以 `__` 開頭的函數，例如 `__asModVector`、`__addUIText` 等。
這些是供內部實作使用的。
基本上，不要直接從外部呼叫它，而是使用公開的 `export function`。

# 基本語法輔助

## Concat

```ts
modlib.Concat("A", "B");
```

連接兩個字串。
Portal API 端也有 `mod.Concat`，但 `modlib.Concat` 只是將普通 TypeScript 字串與 `+` 組合在一起。

用途很簡單。
想組裝字串時可以使用它。
不過在 TypeScript 中，模板字串通常更容易閱讀。

```ts
const name = "Alpha";
const label = `Team ${name}`;
```

## And

```ts
if (modlib.And(isReady, hasPlayer, !isLocked)) {
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.ready));
}
```

依序查看多個真偽值，如果全部都是 `true`，則回傳 `true`。
如果有一個 `false`，它就會停在那裡。

`mod.And` 有兩個參數，但 `modlib.And` 有可變長度。
當存在三個或更多條件時，它會變得更容易閱讀。

## AndFn

```ts
if (modlib.AndFn(
  () => canStart(),
  () => mod.CountOf(mod.AllPlayers()) > 0,
  () => !isLocked
)) {
  startGame();
}
```

`AndFn` 接收多個「回傳 boolean 的函數」而不是boolean 值本身。
從左到右依序執行，中途變為 `false` 時，後面的函數不會執行。

透過放置較重的條件或稍後想要避免副作用的條件，可以減少不必要的處理。

## IfThenElse

```ts
const label = modlib.IfThenElse(
  isAttackTeam,
  () => "攻撃",
  () => "防衛"
);
```

若條件為`true`，則回傳`ifTrue()`的結果，若條件為`false`，則傳回`ifFalse()`的結果。

它與 `mod.IfThenElse` 類似，但 `modlib.IfThenElse` 是傳遞函數的一種形式。
當你只想評估必要的一側時，可以使用它。

## Equals

```ts
if (modlib.Equals(mod.GetTeam(player), mod.GetTeam(1))) {
  // Team 1
}
```

內部會呼叫 `mod.Equals(a, b)`。
但是，如果其中一個是 `null`，則包含 `debugger`。

這是一個旨在「更容易注意到空比較」的實現，但請在發布前的程式碼中注意這一點。
儘管這對於調查原因很有用，但它可能會導致偵錯器意外停止。

# Portal 陣列輔助

Portal SDK 中的 `mod.Array` 不是普通的 JavaScript 陣列。
需要用 `mod.CountOf` 和 `mod.ValueInArray` 讀取，而不是 `for ... of` 或 `array.length`。

`modlib` 有一個函數可以填補這個差異。

## ConvertArray

```ts
const players = modlib.ConvertArray(mod.AllPlayers()) as mod.Player[];
```

將 `mod.Array` 轉換為 JavaScript 陣列。

在內部，流程如下。

1. 使用 `mod.CountOf(array)` 取得元素數量
2. 用 `mod.ValueInArray(array, i)` 逐個讀取
3. `push` 到 JavaScript 陣列

當你想像普通 TypeScript 陣列一樣處理 `AllPlayers()` 或 `GetPlayersOnPoint()` 的結果時，這很有用。

## FilteredArray

```ts
const team1Players = modlib.FilteredArray(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

過濾 `mod.Array` 並將其作為新的 `mod.Array` 返回。
請注意，傳回值是 `mod.Array` 而不是 JavaScript 陣列。

內部使用 `ConvertArray` 轉換為 JavaScript 陣列，只有符合條件的元素才會使用 `mod.AppendToArray` 返回 Portal 陣列。

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

## IsTrueForAll

```ts
const allReady = modlib.IsTrueForAll(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return isPlayerReady(player);
});
```

判斷`mod.Array`的所有元素是否符合條件。
如果至少有一個是 `false`，那它是 `false`。

## IsTrueForAny

```ts
const hasAttacker = modlib.IsTrueForAny(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

判斷 `mod.Array` 中是否有一個符合條件。

## SortedArray

```ts
const sorted = modlib.SortedArray(players, (a, b) => {
  return mod.GetPlayerKills(b) - mod.GetPlayerKills(a);
});
```

複製 JavaScript 陣列並傳回按比較函數排序的新陣列。
這裡得到的是 `any[]`，不是 `mod.Array`。

它假定先用 `ConvertArray` 轉換後再使用。

# ObjId 取得輔助

## getPlayerId

```ts
const id = modlib.getPlayerId(eventPlayer);
```

內部會呼叫 `mod.GetObjId(player)`。
取得玩家的 ObjId 作為數字。

## getTeamId

```ts
const teamId = modlib.getTeamId(mod.GetTeam(eventPlayer));
```

內部會呼叫 `mod.GetObjId(team)`。
當你想要將隊伍作為數字 ID 進行比較時，請使用此選項。

它也用在正文的第 6b 章中，以使隊伍比較更易於閱讀。

```ts
const eventTeamId = modlib.getTeamId(eventTeam);
const teamId = modlib.getTeamId(team);
```

# 處理條件的「上升沿」

Portal 中會持續呼叫 `Ongoing...` 系列事件。
如果在條件為 true 的整段時間都執行處理，同一個通知、同一次加分、同一個生成就會反覆執行。

因此，`modlib` 具有「僅在從 false 變成 true 時才通過」的狀態管理。

## ConditionState

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

| 上一次 | 這一次 | 回傳值 | 含義 |
| --- | --- | --- | --- |
|假 |假 |假 |尚未符合條件 |
|假 |真 |真 |條件滿足的那一刻 |
|真 |真 |假 |已成立，但將不再被接受|
|真 |假 |假 |重置|

換句話說，當 `true` 繼續時，它只會傳遞一次。
一旦回到`false`，就會再次經過下一個`true`。

建議不要在 `update()` 中直接寫很長的條件式。
如果將其分為 `hasEnoughPlayersToStart()`、`isStartInteract()`、`canReachTarget()` 等決策函數，就可以透過名稱讀出「正在等待什麼」。
Portal 中貼上的程式碼註解請使用簡短英文，以避免多位元組字元。

## getGlobalCondition

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
透過劃分 `0`、`1`、`2` 等數字，你可以分別管理多個條件。

## getPlayerCondition

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
即使 Condition 編號相同，每個玩家也會有不同的條件。

## getTeamCondition

```ts
const condition = modlib.getTeamCondition(mod.GetTeam(1), 0);
```

每個隊伍都有一個條件狀態。
可用於實現隊伍目標、達到分數、人數條件等。

## 依物件條件

以下函數對每個物件都有一個條件狀態。

| 函數 | 對象 | 使用場景 |
| --- | --- | --- |
| `getCapturePointCondition` | `mod.CapturePoint` | 占領開始、占領完成、人數變化 |
| `getMCOMCondition` | `mod.MCOM` | 裝設狀態、解除狀態、破壞狀態 |
| `getVehicleCondition` | `mod.Vehicle` | 乘坐、破壞、速度條件 |
| `getHQCondition` | `mod.HQ` | HQ 啟用、所屬隊伍變化 |
| `getSectorCondition` | `mod.Sector` | Sector 推進狀態 |
| `getVehicleSpawnerCondition` | `mod.VehicleSpawner` | 車輛能否生成、冷卻時間 |

在內部，`mod.GetObjId(obj)` 用於指派每個 ObjId 的狀態陣列。

# 取得隊伍內玩家

## getPlayersInTeam

```ts
const team1Players = modlib.getPlayersInTeam(mod.GetTeam(1));
```

以 JavaScript 陣列的形式傳回屬於指定隊伍的玩家。

內部流程如下。

1. 取得所有玩家 `mod.AllPlayers()`
2.一一唸`mod.CountOf`和`mod.ValueInArray`
3.對比`mod.GetTeam(player)`的ObjId和目標隊伍的ObjId
4. 將符合的玩家放入 JavaScript 陣列中

它可用於基於隊伍的通知、特定於隊伍的 UI 以及所有隊伍的狀態重置。

```ts
for (const player of modlib.getPlayersInTeam(mod.GetTeam(1))) {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.attackTeam), player);
}
```

# 用 ParseUI 以 JSON 風格建立 UI

`ParseUI` 是一個函數，可讓你將 `AddUIContainer`、`AddUIText`、`AddUIImage` 和 `AddUIButton` 的長參數寫成JSON 風格的物件。

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

| type | 內部呼叫的函數 | 建立的內容 |
| --- | --- | --- |
| `Container` | `mod.AddUIContainer` | UI 的父框 |
| `Text` | `mod.AddUIText` | 文字顯示 |
| `Image` | `mod.AddUIImage` | 圖像顯示 |
| `Button` | `mod.AddUIButton` | UI 按鈕 |

使用 `children` 可以把 Text 或 Button 掛在 Container 下。

## 座標和顏色也可以寫成陣列

`ParseUI` 在內部，會使用 `__asModVector` 將 `number[]` 轉換為 `mod.Vector`。

```ts
position: [50, 100]
size: [300, 80]
bgColor: [0.2, 0.2, 0.2]
```

對於 2 個元素的陣列，Z 被視為 0。
如果有 3 個元素，則為 X/Y/Z。

## 關於 textLabel 和 Message 的註解

如果文字 `textLabel` 是字串，則會在內部轉換為 `mod.Message(textLabel)`。
然而，在 `Strings.json` 上預先註冊玩家畫面上顯示的字元是基本的。
對於螢幕上出現的字符，請使用 `Strings.json` 鍵，例如 `textLabel`、通知、WorldIcon 文字、`SetUITextLabel` 等。

```ts
textLabel: mod.Message(mod.stringkeys.start)
```

如果要插入變數，請將 `{}` 放在 `Strings.json` 一側，並將值傳遞給 `mod.Message` 的第二個參數。

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
`mod.Message` 最多可以使用 3 個追加參數。

## 可以縮小顯示目標

指定 `teamId` 或 `playerId` 可以縮小 UI 的顯示對象。

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

## ParseUI 的注意點

`ParseUI` 很有用，但它不會每幀都重新建立它。

由於 UI 的生成成本較高，因此基本策略如下。

1. 在遊戲開始時或玩家加入時建立
2. 從 `FindUIWidgetWithName` 取得
3. 使用 `SetUITextLabel` 或 `SetUIWidgetVisible` 進行更新
4. 當不再需要時，使用 `DeleteUIWidget` 刪除它

特別是避免在 `Ongoing...` 系列中連續呼叫 `ParseUI` 。

# 通知 / 訊息顯示輔助

## ShowNotificationMessage

```ts
modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.goEntrance), eventPlayer);
```

顯示右上角的通知。
如果省略目標，則會向所有人顯示，如果傳遞 `Player`，則會單獨顯示。

內部會呼叫 `mod.DisplayNotificationMessage`。

## ShowHighlightedGameModeMessage

```ts
modlib.ShowHighlightedGameModeMessage(mod.Message(mod.stringkeys.targetCaptured));
```

在小地圖上的 World Log 中顯示強調訊息。
內部會呼叫 `mod.DisplayHighlightedWorldLogMessage`。

## ShowEventGameModeMessage

```ts
modlib.ShowEventGameModeMessage(mod.Message(mod.stringkeys.roundStart));
```

在畫面頂部顯示較大的遊戲模式訊息風格 UI。

請參閱 `index.ts` 中的註解，它是作為替代實作建立的，直到原本的 `DisplayGameModeMessage` 被修復。
在內部，使用 `AddUIText` 建立臨時 UI，等待 6 秒，然後使用 `DeleteUIWidget` 將其刪除。

換句話說，這不是純粹的 Portal 標準訊息，而是「用 UI 做出的替代顯示」。
它適合短時間引導，但如果反覆呼叫，同名 Widget 容易衝突或被覆蓋，所以請避免頻繁呼叫。

## DisplayCustomNotificationMessage

```ts
modlib.DisplayCustomNotificationMessage(
  mod.Message(mod.stringkeys.defending),
  mod.CustomNotificationSlots.MessageText1,
  5,
  eventPlayer
);
```

顯示類似自訂通知槽的 UI。
對象可以省略，也可以指定 `Player` 或 `Team`。

如果傳入 `Team`，會使用 `getPlayersInTeam` 來取得隊伍成員，並為每位玩家分別建立 UI。

`duration > 0` 時，會在指定秒數後自動刪除。
如果 `duration` 設定為 0 以下，則不會自動刪除，因此應設計為稍後呼叫 `ClearCustomNotificationMessage`。

## ClearCustomNotificationMessage

```ts
modlib.ClearCustomNotificationMessage(
  mod.CustomNotificationSlots.MessageText1,
  eventPlayer
);
```

刪除指定插槽的自訂通知 UI。
如果沒有目標，則會從所有玩家中刪除，如果是 `Player` 則會從個人中刪除，如果是 `Team` 則會從整個隊伍中刪除。

在內部，使用 `FindUIWidgetWithName` 和 `DeleteUIWidget`。
為防止找不到刪除對象，內部用 `try/catch` 包住了處理。

## ClearAllCustomNotificationMessages

```ts
modlib.ClearAllCustomNotificationMessages(eventPlayer);
```

一次清除指定玩家的自訂通知槽。
目標僅為 `Player`。

會依序刪除 HeaderText、MessageText1、MessageText2、MessageText3 和 MessageText4。

# 公開函數列表

## 基本 / 條件 / 陣列

| 函數 | 目的 | 回傳值 |
| --- | --- | --- |
| `Concat(s1, s2)` | 連接字串 | `string` |
| `And(...rest)` | 判斷多個真偽值是否全部為 true | `boolean` |
| `AndFn(...rest)` | 判斷多個條件函數是否全部為 true | `boolean` |
| `IfThenElse(condition, ifTrue, ifFalse)` | 根據條件只評估其中一個函數並回傳結果 | `T` |
| `Equals(a, b)` | 用 `mod.Equals` 比較兩個值 | `boolean` |
| `WaitUntil(delay, cond)` | 等待指定秒數，或中途條件變為 true 時退出 | `Promise<void>` |
| `ConvertArray(array)` | 將 `mod.Array` 轉換為 JavaScript 陣列 | `any[]` |
| `FilteredArray(array, cond)` | 按條件篩選 `mod.Array` | `mod.Array` |
| `IndexOfFirstTrue(array, cond, arg)` | 回傳最先滿足條件的元素編號 | `number` |
| `IsTrueForAll(array, condition, arg)` | 判斷所有元素是否滿足條件 | `boolean` |
| `IsTrueForAny(array, condition, arg)` | 判斷是否有任意一個元素滿足條件 | `boolean` |
| `SortedArray(array, compare)` | 回傳 JavaScript 陣列排序後的副本 | `any[]` |

## ObjId / 條件狀態

| 函數 / 類別 | 目的 |
| --- | --- |
| `getPlayerId(player)` | 取得 Player 的 ObjId |
| `getTeamId(team)` | 取得 Team 的 ObjId |
| `ConditionState` | 只在 false 變為 true 的瞬間通過的狀態類別 |
| `getGlobalCondition(n)` | 取得全域條件狀態 |
| `getPlayerCondition(obj, n)` | 取得 Player 別的條件狀態 |
| `getTeamCondition(team, n)` | 取得 Team 別的條件狀態 |
| `getCapturePointCondition(obj, n)` | 取得 CapturePoint 別的條件狀態 |
| `getMCOMCondition(obj, n)` | 取得 MCOM 別的條件狀態 |
| `getVehicleCondition(obj, n)` | 取得 Vehicle 別的條件狀態 |
| `getHQCondition(obj, n)` | 取得 HQ 別的條件狀態 |
| `getSectorCondition(obj, n)` | 取得 Sector 別的條件狀態 |
| `getVehicleSpawnerCondition(obj, n)` | 取得 VehicleSpawner 別的條件狀態 |

## 隊伍 / UI / 通知

| 函數 | 目的 |
| --- | --- |
| `getPlayersInTeam(teamObj)` | 回傳屬於指定 Team 的玩家陣列 |
| `ParseUI(...params)` | 根據 JSON 風格參數建立 UI Widget |
| `DisplayCustomNotificationMessage(msg, custom, duration, target)` | 顯示自訂通知 UI |
| `ShowEventGameModeMessage(event, target)` | 顯示遊戲模式訊息風格 UI |
| `ShowHighlightedGameModeMessage(event, target)` | 顯示強調的 World Log 訊息 |
| `ShowNotificationMessage(msg, target)` | 顯示右上通知 |
| `ClearAllCustomNotificationMessages(target)` | 刪除指定玩家的所有自訂通知 |
| `ClearCustomNotificationMessage(custom, target)` | 刪除指定自訂通知槽 |

# 實踐中需要注意的地方

## 基本優先使用 modlib，只在必要處使用 mod

本書在實作時優先使用 `modlib`。
`ShowNotificationMessage`、`getTeamId`、`ConvertArray`、`ConditionState`、`ParseUI` 等，`modlib` 已經提供的東西請先使用。

然後，只有 `modlib` 中沒有的功能，或需要直接控制 `mod` 詳細參數的處理，才使用 `mod`。
如果不起作用，請檢查 `modlib` 中呼叫了哪個 `mod` 函數。
例如，如果 `ShowNotificationMessage` 的行為很奇怪，請查看 `mod.DisplayNotificationMessage` 最終是如何被呼叫的。

## 不要使用 Ongoing 來進行繁重的處理

`ConvertArray(mod.AllPlayers())`、`getPlayersInTeam` 和 `ParseUI` 很有用，但每幀呼叫都會變重。

下面是特別應該避免的例子。

```ts
export function OngoingGlobal(): void {
  modlib.ParseUI({ name: "Debug", type: "Text", textLabel: mod.Message(mod.stringkeys.debug) });
}
```

建立一次 UI，僅更新顯示的內容。

## WaitUntil 不是通用計時器

`WaitUntil` 的 SDK 側註解中有「可能等待過長」。
在內部，每 0.2 秒檢查一次條件。

對於需要嚴格計時的流程，請優先考慮專用狀態管理和事件。

## 將 Condition 編號台帳化

數字 `getGlobalCondition(0)` 和 `getPlayerCondition(player, 2)` 隨著它們的增加而變得毫無意義。

將它們定義為常數會更安全。

```ts
const CONDITION_READY = 0;
const CONDITION_LOW_HEALTH = 1;

const readyState = modlib.getGlobalCondition(CONDITION_READY);
```

請依照與 ObjId 帳本相同的方式為 Condition 編號建立帳本。

## 不要讓 UI 名稱發生衝突

`ParseUI` 和通知系統使用 `FindUIWidgetWithName` 和 `DeleteUIWidget`。
如果你建立多個具有相同名稱的 UI，則可能會取得或刪除意外的 Widget。

如果你有一個基於玩家的 UI，在名稱中包含 ObjId 會減少意外。

```ts
const name = `Timer_${mod.GetObjId(eventPlayer)}`;
```

# 首先要記住這 5 件事

你不需要一次記住所有內容。
最初，以下五個就足夠了。

| 函數 | 理由 |
| --- | --- |
| `ShowNotificationMessage` | 可以簡短地寫出右上通知 |
| `getTeamId` | 隊伍比較更容易閱讀 |
| `ConvertArray` | 可以把 `mod.Array` 當作普通陣列處理 |
| `ConditionState` / `getGlobalCondition` | 可以防止多重觸發 |
| `ParseUI` | 可以集中建立複雜 UI |

# 總結

`modlib` 是一個讓 BF6 Portal SDK 更容易使用的輔助函式庫。

然而，不過，它不是魔法庫。
裡面是呼叫 `mod` API 的 TypeScript 程式碼。
這就是為什麼當你遇到麻煩時，你可以透過閱讀 `index.ts` 來遵循這個機制。

在本書中，我們建議先使用 `modlib`，然後在必要時才直接使用 `mod`。
如果你對詳細用法感到困惑，請回到附錄 C 的函數列表和注意點。
