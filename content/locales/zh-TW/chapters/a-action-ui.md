---
title: "附錄 A-3：動作/值取得清單（UI/參考/值）"
free: true
---

# 動作與值取得清單（UI / 參照 / 值）

本附錄涵蓋了 UI、通知和計分板的功能、常用類型、實作說明和最小範本。基本操作功能請參閱「附錄 A-2：動作/值取得清單（基本操作）」。

## UI / 通知 / 計分板

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `AddUIIcon` | 將 UI 圖示 Widget加入物件。你可以將顯示限制為玩家或隊伍。 2 種重載。 | parentObject: mod.Object, image: WorldIconImages, verticalOffset: number, iconColour: Vector, iconText: Message, visibility: Player \| Team | 無 | `mod.AddUIIcon(...);` |
| `ClearAllCustomNotificationMessages` | 清除指定玩家的所有自訂通知槽。 | target: Player | 無 | `mod.ClearAllCustomNotificationMessages(...);` |
| `ClearCustomNotificationMessage` | 隱藏指定插槽的自訂通知。你也可以指定目標玩家或隊伍。 3 種重載。 | slot: CustomNotificationSlots | 無 | `mod.ClearCustomNotificationMessage(...);` |
| `DisplayCustomNotificationMessage` | 在指定插槽顯示自訂通知。你也可以指定目標玩家或隊伍。 3 種重載。 | msg: Message, slot: CustomNotificationSlots, duration: number | 無 | `mod.DisplayCustomNotificationMessage(...);` |
| `DisplayHighlightedWorldLogMessage` | 在小地圖上的世界日誌上顯示強調的訊息約 6 秒。如果沒有指定目標，則會向所有人顯示。 3 種重載。 | message: Message | 無 | `mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.ok));` |
| `DisplayNotificationMessage` | 在螢幕右上角顯示通知訊息約 6 秒。你也可以指定目標玩家或隊伍。 3 種重載。 | message: Message | 無 | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.start), eventPlayer);` |
| `SendErrorReport` | 傳送一條在管理選單中顯示為錯誤的訊息。 | message: Message | 無 | `mod.SendErrorReport(...);` |
| `SendPortalLogToAdmin` | 將專用伺服器託管的目前工作階段的 Portal 日誌傳送到管理員用戶端。本機託管或沒有管理員時不會發生任何事。 | 無 | 無 | `mod.SendPortalLogToAdmin();` |
| `SetScoreboardColumnNames` | 設定自訂計分板列名稱。 5 種重載。 | column1Name: Message, column2Name: Message, column3Name: Message, column4Name: Message, column5Name: Message | 無 | `mod.SetScoreboardColumnNames(...);` |
| `SetScoreboardColumnWidths` | 設定自訂計分板的列寬比例。 5 種重載。 | column1Width: number, column2Width: number, column3Width: number, column4Width: number, column5Width: number | 無 | `mod.SetScoreboardColumnWidths(...);` |
| `SetScoreboardHeader` | 設定計分板左上角顯示的標題名稱。 2 種重載。 | team1Name: Message, team2Name: Message | 無 | `mod.SetScoreboardHeader(...);` |
| `SetScoreboardPlayerValues` | 在自訂計分板上為每位玩家設定最多 5 列的欄位值。 5 種重載。 | player: Player, column1Value: number, column2Value: number, column3Value: number, column4Value: number, column5Value: number | 無 | `mod.SetScoreboardPlayerValues(...);` |
| `SetScoreboardSorting` | 設定自訂計分板排序列與倒序規格。 2 種重載。 | sortingColumn: number, reverseSorting: boolean | 無 | `mod.SetScoreboardSorting(...);` |
| `SetScoreboardType` | 更改要使用的計分板類型。 | scoreboardType: ScoreboardType | 無 | `mod.SetScoreboardType(...);` |
| `AddUIButton` | 建立 UI Button Widget。 6 種重載。 | name: string, position: Vector, size: Vector, anchor: UIAnchor | 無 | `mod.AddUIButton(...);` |
| `AddUIContainer` | 建立 UI Container Widget。 6 種重載。 | name: string, position: Vector, size: Vector, anchor: UIAnchor | 無 | `mod.AddUIContainer(...);` |
| `AddUIGadgetImage` | 建立一個顯示 Gadget 影像的 UI Image Widget。 2 種重載。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, gadget: Gadgets, parent: UIWidget | 無 | `mod.AddUIGadgetImage(...);` |
| `AddUIImage` | 建立 UI Image Widget。 6 種重載。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, imageType: UIImageType | 無 | `mod.AddUIImage(...);` |
| `AddUIText` | 建立 UI Text Widget。 6 種重載。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, message: Message | 無 | `mod.AddUIText("timer", pos, size, mod.UIAnchor.Top, mod.Message(mod.stringkeys.timerZero));` |
| `AddUIWeaponImage` | 建立一個顯示武器影像的 UI Image Widget。 4 種重載。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, weapon: Weapons, parent: UIWidget | 無 | `mod.AddUIWeaponImage(...);` |
| `DeleteAllUIWidgets` | 刪除所有 UI Widget。 | 無 | 無 | `mod.DeleteAllUIWidgets(...);` |
| `DeleteUIWidget` | 刪除指定的 UI Widget。 | widget: UIWidget | 無 | `mod.DeleteUIWidget(...);` |
| `EnableUIButtonEvent` | 設定UI Button Widget是否發送按鈕事件。 | widget: UIWidget, buttonEvent: UIButtonEvent, enabled: boolean | 無 | `mod.EnableUIButtonEvent(...);` |
| `EnableUIInputMode` | 啟用或停用可讓你動作 UI 按鈕的輸入模式。你也可以指定目標。 2 種重載。 | enabled: boolean | 無 | `mod.EnableUIInputMode(...);` |
| `SetUIButtonAlphaBase` | 更改 UI Button 的正常 alpha 值。 | widget: UIWidget, value: number | 無 | `mod.SetUIButtonAlphaBase(...);` |
| `SetUIButtonAlphaDisabled` | UI 按鈕停用時更改 alpha 值。 | widget: UIWidget, value: number | 無 | `mod.SetUIButtonAlphaDisabled(...);` |
| `SetUIButtonAlphaFocused` | UI 按鈕獲得焦點時更改 alpha 值。 | widget: UIWidget, value: number | 無 | `mod.SetUIButtonAlphaFocused(...);` |
| `SetUIButtonAlphaHover` | 更改懸停時 UI 按鈕的 alpha 值。 | widget: UIWidget, value: number | 無 | `mod.SetUIButtonAlphaHover(...);` |
| `SetUIButtonAlphaPressed` | 按下 UI 按鈕時更改 alpha 值。 | widget: UIWidget, value: number | 無 | `mod.SetUIButtonAlphaPressed(...);` |
| `SetUIButtonColorBase` | 更改 UI Button 的正常顏色。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIButtonColorBase(...);` |
| `SetUIButtonColorDisabled` | 停用時更改 UI 按鈕的顏色。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIButtonColorDisabled(...);` |
| `SetUIButtonColorFocused` | 更改 UI 按鈕對焦時的顏色。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIButtonColorFocused(...);` |
| `SetUIButtonColorHover` | 更改 UI 按鈕的懸停顏色。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIButtonColorHover(...);` |
| `SetUIButtonColorPressed` | 按下時更改 UI 按鈕的顏色。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIButtonColorPressed(...);` |
| `SetUIButtonEnabled` | 啟用或停用 UI 按鈕。 | widget: UIWidget, enabled: boolean | 無 | `mod.SetUIButtonEnabled(...);` |
| `SetUIImageAlpha` | 更改 UI 影像的 alpha 值。 | widget: UIWidget, value: number | 無 | `mod.SetUIImageAlpha(...);` |
| `SetUIImageColor` | 更改 UI 影像的顏色。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIImageColor(...);` |
| `SetUIImageType` | 更改 UI Image 的圖片類型。 | widget: UIWidget, imageType: UIImageType | 無 | `mod.SetUIImageType(...);` |
| `SetUITextAlpha` | 更改 UI 文字的 alpha 值。 | widget: UIWidget, value: number | 無 | `mod.SetUITextAlpha(...);` |
| `SetUITextAnchor` | 更改 UI 文字中的字元錨點。 | widget: UIWidget, anchor: UIAnchor | 無 | `mod.SetUITextAnchor(...);` |
| `SetUITextColor` | 更改 UI 文字文字顏色。 | widget: UIWidget, value: Vector | 無 | `mod.SetUITextColor(...);` |
| `SetUITextLabel` | 更改 UI 文字中顯示的訊息。顯示文字可以在 `Strings.json` 註冊後參考。 | widget: UIWidget, message: Message | 無 | `mod.SetUITextLabel(widget, mod.Message(mod.stringkeys.updated));` |
| `SetUITextSize` | 更改 UI 文字的字體大小。 | widget: UIWidget, value: number | 無 | `mod.SetUITextSize(...);` |
| `SetUIWidgetAnchor` | 更改 UI Widget的錨點位置。 | widget: UIWidget, anchor: UIAnchor | 無 | `mod.SetUIWidgetAnchor(...);` |
| `SetUIWidgetBgAlpha` | 更改 UI Widget 背景的 Alpha 值。 | widget: UIWidget, value: number | 無 | `mod.SetUIWidgetBgAlpha(...);` |
| `SetUIWidgetBgColor` | 更改 UI Widget背景顏色。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIWidgetBgColor(...);` |
| `SetUIWidgetBgFill` | 更改UI Widget背景的繪製方法。 | widget: UIWidget, bgFill: UIBgFill | 無 | `mod.SetUIWidgetBgFill(...);` |
| `SetUIWidgetDepth` | 更改 UI Widget的繪製順序。 | widget: UIWidget, depth: UIDepth | 無 | `mod.SetUIWidgetDepth(...);` |
| `SetUIWidgetName` | 更改 UI Widget名稱。 | widget: UIWidget, name: string | 無 | `mod.SetUIWidgetName(...);` |
| `SetUIWidgetPadding` | 更改 UI Widget的填滿。 | widget: UIWidget, value: number | 無 | `mod.SetUIWidgetPadding(...);` |
| `SetUIWidgetParent` | 更改 UI Widget的父Widget。 | widget: UIWidget, parent: UIWidget | 無 | `mod.SetUIWidgetParent(...);` |
| `SetUIWidgetPosition` | 更改 UI Widget的位置。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIWidgetPosition(...);` |
| `SetUIWidgetSize` | 更改 UI Widget的大小。 | widget: UIWidget, value: Vector | 無 | `mod.SetUIWidgetSize(...);` |
| `SetUIWidgetVisible` | 顯示/隱藏 UI Widget。 | widget: UIWidget, visible: boolean | 無 | `mod.SetUIWidgetVisible(widget, false);` |
| `FindUIWidgetWithName` | 尋找並擷取與名稱相符的 UI Widget。 2 種重載。 | name: string, searchRoot: UIWidget | `UIWidget` | `const value = mod.FindUIWidgetWithName(...);` |
| `GetUIButtonAlphaBase` | 從數字或目標取得 UIButtonAlphaBase。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaBase(...);` |
| `GetUIButtonAlphaDisabled` | 從數字或目標取得 UIButtonAlphaDisabled。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaDisabled(...);` |
| `GetUIButtonAlphaFocused` | 從數字或目標取得 UIButtonAlphaFocused。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaFocused(...);` |
| `GetUIButtonAlphaHover` | 從數字或目標取得 UIButtonAlphaHover。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaHover(...);` |
| `GetUIButtonAlphaPressed` | 從數字或目標取得 UIButtonAlphaPressed。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaPressed(...);` |
| `GetUIButtonColorBase` | 從數字或目標取得 UIButtonColorBase。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorBase(...);` |
| `GetUIButtonColorDisabled` | 從數字或目標取得 UIButtonColorDisabled。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorDisabled(...);` |
| `GetUIButtonColorFocused` | 從數字或目標取得 UIButtonColorFocused。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorFocused(...);` |
| `GetUIButtonColorHover` | 從數字或目標取得 UIButtonColorHover。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorHover(...);` |
| `GetUIButtonColorPressed` | 從數字或目標取得 UIButtonColorPressed。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorPressed(...);` |
| `GetUIButtonEnabled` | 從數字或目標取得 UIButtonEnabled。 | widget: UIWidget | `boolean` | `const value = mod.GetUIButtonEnabled(...);` |
| `GetUIImageAlpha` | 從數字或目標取得 UIImageAlpha。 | widget: UIWidget | `number` | `const value = mod.GetUIImageAlpha(...);` |
| `GetUIImageColor` | 從數字或目標取得 UIImageColor。 | widget: UIWidget | `Vector` | `const value = mod.GetUIImageColor(...);` |
| `GetUIImageType` | 從數字或目標取得 UIImageType。 | widget: UIWidget | `UIImageType` | `const value = mod.GetUIImageType(...);` |
| `GetUIRoot` | 從數字或目標取得 UIRoot。 | 無 | `UIWidget` | `const value = mod.GetUIRoot(...);` |
| `GetUITextAlpha` | 從數字或目標取得 UITextAlpha。 | widget: UIWidget | `number` | `const value = mod.GetUITextAlpha(...);` |
| `GetUITextAnchor` | 從數字或目標取得 UITextAnchor。 | widget: UIWidget | `UIAnchor` | `const value = mod.GetUITextAnchor(...);` |
| `GetUITextColor` | 從數字或目標取得 UITextColor。 | widget: UIWidget | `Vector` | `const value = mod.GetUITextColor(...);` |
| `GetUITextSize` | 從數字或目標取得 UITextSize。 | widget: UIWidget | `number` | `const value = mod.GetUITextSize(...);` |
| `GetUIWidgetAnchor` | 從數字或目標取得 UIWidgetAnchor。 | widget: UIWidget | `UIAnchor` | `const value = mod.GetUIWidgetAnchor(...);` |
| `GetUIWidgetBgAlpha` | 從數字或目標取得 UIWidgetBgAlpha。 | widget: UIWidget | `number` | `const value = mod.GetUIWidgetBgAlpha(...);` |
| `GetUIWidgetBgColor` | 從數字或目標取得 UIWidgetBgColor。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetBgColor(...);` |
| `GetUIWidgetBgFill` | 從數字或目標取得 UIWidgetBgFill。 | widget: UIWidget | `UIBgFill` | `const value = mod.GetUIWidgetBgFill(...);` |
| `GetUIWidgetDepth` | 從數字或目標取得 UIWidgetDepth。 | widget: UIWidget | `UIDepth` | `const value = mod.GetUIWidgetDepth(...);` |
| `GetUIWidgetName` | 從數字或目標取得 UIWidgetName。 | widget: UIWidget | `string` | `const value = mod.GetUIWidgetName(...);` |
| `GetUIWidgetPadding` | 從數字或目標取得 UIWidgetPadding。 | widget: UIWidget | `number` | `const value = mod.GetUIWidgetPadding(...);` |
| `GetUIWidgetParent` | 從數字或目標取得 UIWidgetParent。 | widget: UIWidget | `UIWidget` | `const value = mod.GetUIWidgetParent(...);` |
| `GetUIWidgetPosition` | 從數字或目標取得 UIWidgetPosition。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetPosition(...);` |
| `GetUIWidgetSize` | 從數字或目標取得 UIWidgetSize。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetSize(...);` |
| `GetUIWidgetVisible` | 從數字或目標取得 UIWidgetVisible。 | widget: UIWidget | `boolean` | `const value = mod.GetUIWidgetVisible(...);` |
| `HasUIWidgetWithName` | 決定是否存在與名稱相符的 UI Widget。 2 種重載。 | name: string, searchRoot: UIWidget | `boolean` | `const value = mod.HasUIWidgetWithName(...);` |

## 玩家 / 隊伍參照

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `SetTeam` | 更改指定玩家的隊伍。 | player: Player, team: Team | 無 | `mod.SetTeam(...);` |
| `IsFaction` | 判斷指定隊伍是否使用指定陣營。 | team: Team, factions: Factions | `boolean` | `const value = mod.IsFaction(...);` |
| `AllPlayers` | 取得遊戲中所有玩家的陣列。 | 無 | `Array` | `const players = mod.AllPlayers();` |
| `ClosestPlayerTo` | 取得距離指定座標最近的活著的玩家。你可以按隊伍縮小範圍。 2 種重載。 | vector: Vector | `Player` | `const value = mod.ClosestPlayerTo(...);` |
| `FarthestPlayerFrom` | 取得距離指定座標最遠的倖存玩家。你可以按隊伍縮小範圍。 2 種重載。 | vector: Vector | `Player` | `const value = mod.FarthestPlayerFrom(...);` |
| `GetPlayerDeaths` | 取得指定玩家的死亡人數。 | player: Player | `number` | `const value = mod.GetPlayerDeaths(...);` |
| `GetPlayerKills` | 取得指定玩家的擊殺數。 | player: Player | `number` | `const value = mod.GetPlayerKills(...);` |
| `GetSquad` | 取得指定玩家或隊伍/小隊號碼對應的隊伍。 2 種重載。 | player: Player | `Squad` | `const value = mod.GetSquad(...);` |
| `GetSquadName` | 取得字串形式的指定小隊的名稱。 | arg0: Squad | `string` | `const value = mod.GetSquadName(...);` |
| `GetTeam` | 取得指定玩家所在的隊伍或指定號碼對應的隊伍。 2 種重載。 | player: Player | `Team` | `const team = mod.GetTeam(eventPlayer);` |
| `IsPlayerValid` | 決定指定的 Player 引用是否有效。 | player: Player | `boolean` | `const value = mod.IsPlayerValid(...);` |
| `IsSquadLeader` | 判斷指定玩家是否為班長。 | player: Player | `boolean` | `const value = mod.IsSquadLeader(...);` |

## 陣列

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `AppendToArray` | 傳回副本，並將值加到陣列結尾。陣列是串聯的。 | array: Array, value: Any | `Array` | `const value = mod.AppendToArray(...);` |
| `ArraySlice` | 僅傳回陣列中指定索引範圍的副本。 | array: Array, startIndex: number, endIndex: number | `Array` | `const value = mod.ArraySlice(...);` |
| `CountOf` | 取得陣列中的元素number。 | array: Array | `number` | `const value = mod.CountOf(...);` |
| `EmptyArray` | 建立一個空陣列。 | 無 | `Array` | `const value = mod.EmptyArray(...);` |
| `FirstOf` | 取得陣列的第一個值。 | array: Array | `Any` | `const value = mod.FirstOf(...);` |
| `LastOf` | 取得陣列的最後一個值。 | array: Array | `Any` | `const value = mod.LastOf(...);` |
| `RandomValueInArray` | 從陣列中取得一個隨機值。 | array: Array | `Any` | `const value = mod.RandomValueInArray(...);` |
| `RandomizedArray` | 傳回陣列的隨機重新排列的副本。 | array: Array | `Array` | `const value = mod.RandomizedArray(...);` |
| `SortedArray` | 傳回依指定數字條件升序排序的陣列的副本。 | array: Array, index: number | `Array` | `const value = mod.SortedArray(...);` |
| `ValueInArray` | 取得陣列指定索引處的值。 | array: Array, index: number | `Any` | `const value = mod.ValueInArray(...);` |

## 取得物件ID

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `GetWaypointPath` | 從數字或目標取得 WaypointPath。 | waypointPathNumber: number | `WaypointPath` | `const value = mod.GetWaypointPath(...);` |
| `GetSFX` | 從編號或目標取得 SFX。 | number: number | `SFX` | `const value = mod.GetSFX(...);` |
| `GetVO` | 從編號或目標取得 VO。 | number: number | `VO` | `const value = mod.GetVO(...);` |
| `GetVFX` | 從數字或目標取得VFX。 | vfxNumber: number | `VFX` | `const value = mod.GetVFX(...);` |
| `GetSpawnPoint` | 從數字或目標取得 SpawnPoint。 | number: number | `SpawnPoint` | `const value = mod.GetSpawnPoint(...);` |
| `GetSpawner` | 從編號或目標取得 Spawner。 | number: number | `Spawner` | `const value = mod.GetSpawner(...);` |
| `GetVL7Cloud` | 從編號或目標取得 VL7Cloud。 | vl7CloudId: number | `VL7Cloud` | `const value = mod.GetVL7Cloud(...);` |

## 邏輯 / 字串 / 擴充

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `JsAction` | 在 JavaScript 端呼叫獨特的動作。用於在範本側延伸。 | actionName: string, actionArg0: Any, actionArg1: Any | 無 | `mod.JsAction("MyAction", eventPlayer, 0);` |
| `And` | 判斷兩個真值是否都為真。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.And(...);` |
| `Equals` | 決定兩個值是否相等。 | left: Any, right: Any | `boolean` | `const value = mod.Equals(...);` |
| `GreaterThan` | 判斷左邊的數字是否大於右邊的數。 | number0: number, number1: number | `boolean` | `const value = mod.GreaterThan(...);` |
| `GreaterThanEqualTo` | 判斷左邊的數字是否大於或等於右邊的數。 | left: number, right: number | `boolean` | `const value = mod.GreaterThanEqualTo(...);` |
| `IfThenElse` | 一個三元運算，如果條件為 true，則傳回第一個值；如果條件為 false，則傳回第二個值。 | condition: boolean, trueValue: Any, falseValue: Any | `Any` | `const value = mod.IfThenElse(...);` |
| `IsType` | 判斷值是否與指定類型相符。 | value: Any, type: Types | `boolean` | `const value = mod.IsType(...);` |
| `JsValue` | 在 JavaScript 端呼叫唯一值函數。使用Portal端的回傳值。 | valueName: string, valueArg0: Any, valueArg1: Any | `Any` | `const value = mod.JsValue("MyValue", eventPlayer, 0);` |
| `LessThan` | 判斷左邊的數字是否小於右邊的數。 | left: number, right: number | `boolean` | `const value = mod.LessThan(...);` |
| `LessThanEqualTo` | 判斷左邊的數是小於或等於右邊的數。 | left: number, right: number | `boolean` | `const value = mod.LessThanEqualTo(...);` |
| `Not` | 反轉真值。 | boolean: boolean | `boolean` | `const value = mod.Not(...);` |
| `NotEqualTo` | 判斷兩個值是否不相等。 | left: Any, right: Any | `boolean` | `const value = mod.NotEqualTo(...);` |
| `Or` | 確定兩個真值之一是否為真。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.Or(...);` |
| `Xor` | 決定兩個真值是否不同。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.Xor(...);` |
| `Concat` | 連接兩個字串。 | string0: string, string1: string | `string` | `const value = mod.Concat(...);` |

## 數值 / Vector / 座標

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `GetObjId` | 取得放置的項目和物件的 ObjId。用於檢查 Godot 放置和代碼引用。 | object: mod.Object | `number` | `const id = mod.GetObjId(eventInteractPoint);` |
| `IsCurrentMap` | 判斷目前地圖是否與指定地圖相符。 | maps: Maps | `boolean` | `const value = mod.IsCurrentMap(...);` |
| `AbsoluteValue` | 取得數字的絕對值。 | number: number | `number` | `const value = mod.AbsoluteValue(...);` |
| `Add` | 新增數字或Vector。 2 種重載。 | number0: number, number1: number | `number` | `const value = mod.Add(...);` |
| `AngleBetweenVectors` | 取得兩個Vector之間的角度（以度為單位）。 | vector0: Vector, vector1: Vector | `number` | `const value = mod.AngleBetweenVectors(...);` |
| `AngleDifference` | 取得兩個角度之間的差值（以度為單位）。 | number0: number, number1: number | `number` | `const value = mod.AngleDifference(...);` |
| `ArccosineInDegrees` | 取得數字的反餘弦（以度為單位）。 | number: number | `number` | `const value = mod.ArccosineInDegrees(...);` |
| `ArccosineInRadians` | 取得以弧度為單位的數字的反餘弦。 | number: number | `number` | `const value = mod.ArccosineInRadians(...);` |
| `ArcsineInDegrees` | 取得以度為單位的數字的反正弦。 | number: number | `number` | `const value = mod.ArcsineInDegrees(...);` |
| `ArcsineInRadians` | 取得以弧度為單位的數字的反正弦。 | number: number | `number` | `const value = mod.ArcsineInRadians(...);` |
| `ArctangentInDegrees` | 取得以度為單位的數字的反正切值。 | number: number | `number` | `const value = mod.ArctangentInDegrees(...);` |
| `ArctangentInRadians` | 取得以弧度為單位的數字的反正切值。 | number: number | `number` | `const value = mod.ArctangentInRadians(...);` |
| `Ceiling` | 透過向上捨入小數位將數字轉換為整數。 | number: number | `number` | `const value = mod.Ceiling(...);` |
| `CosineFromDegrees` | 從度角取得餘弦。 | number: number | `number` | `const value = mod.CosineFromDegrees(...);` |
| `CosineFromRadians` | 從弧度角取得餘弦。 | number: number | `number` | `const value = mod.CosineFromRadians(...);` |
| `CreateTransform` | 從位置和旋轉Vector建立變換。 | position: Vector, rotation: Vector | `Transform` | `mod.CreateTransform(pos, rot);` |
| `CreateVector` | 從 X、Y、Z 三個值建立一個Vector。 X 為左和右，Y 為上和下，Z 為前後。 | number0: number, number1: number, number2: number | `Vector` | `mod.CreateVector(0, 2, 0);` |
| `CrossProduct` | 取得兩個Vector的叉積。如果它們平行，則它變成零Vector。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.CrossProduct(...);` |
| `DegreesToRadians` | 將度數轉換為弧度。 | number: number | `number` | `const value = mod.DegreesToRadians(...);` |
| `DirectionFromAngles` | 從偏航角和俯仰角取得方向Vector。 | number0: number, number1: number | `Vector` | `const value = mod.DirectionFromAngles(...);` |
| `DirectionTowards` | 取得從起點到終點的歸一化方向Vector。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.DirectionTowards(...);` |
| `DistanceBetween` | 取得兩個座標之間的距離。 | vector0: Vector, vector1: Vector | `number` | `const value = mod.DistanceBetween(...);` |
| `Divide` | 透過除以數字或將 Vector 除以數字來傳回縮放後的 Vector。 2 種重載。 | number0: number, number1: number | `number` | `const value = mod.Divide(...);` |
| `DotProduct` | 取得兩個Vector的內積。如果它們正交，則為 0。Vector0：Vector，Vector1：Vector | vector0: Vector, vector1: Vector | `number` | `const value = mod.DotProduct(...);` |
| `Floor` | 透過向下捨去小數位將數字轉換為整數。 | number: number | `number` | `const value = mod.Floor(...);` |
| `Max` | 傳回兩個數字中較大的一個。 | number0: number, number1: number | `number` | `const value = mod.Max(...);` |
| `Modulo` | 傳回左邊的數字除以右邊的數字所得的餘數。 | number0: number, number1: number | `number` | `const value = mod.Modulo(...);` |
| `Multiply` | 將數字相乘或透過將Vector乘以數字來傳回縮放後的Vector。 2 種重載。 | number0: number, number1: number | `number` | `const value = mod.Multiply(...);` |
| `Normalize` | 將Vector歸一化為長度為 1 的單位Vector。Vector：Vector | vector: Vector | `Vector` | `const value = mod.Normalize(...);` |
| `Pi` | 傳回 pi 的近似值。 | 無 | `number` | `const value = mod.Pi(...);` |
| `RadiansToDegrees` | 將弧度轉換為度數。 | number: number | `number` | `const value = mod.RadiansToDegrees(...);` |
| `RaiseToPower` | 將左邊的數字求右邊數字的冪。 | number0: number, number1: number | `number` | `const value = mod.RaiseToPower(...);` |
| `RandomReal` | 傳回從指定最小值到最大值的隨機實數。 | number0: number, number1: number | `number` | `const value = mod.RandomReal(...);` |
| `RoundToInteger` | 將數字四捨五入為整數。 | number: number | `number` | `const value = mod.RoundToInteger(...);` |
| `SineFromDegrees` | 從度角取得正弦值。 | number: number | `number` | `const value = mod.SineFromDegrees(...);` |
| `SineFromRadians` | 從弧度角取得正弦值。 | number: number | `number` | `const value = mod.SineFromRadians(...);` |
| `SquareRoot` | 求一個數的平方根。 | number: number | `number` | `const value = mod.SquareRoot(...);` |
| `Subtract` | 減去數字或Vector。 2 種重載。 | number0: number, number1: number | `number` | `const value = mod.Subtract(...);` |
| `TangentFromDegrees` | 从度角获取切线。 | number: number | `number` | `const value = mod.TangentFromDegrees(...);` |
| `TangentFromRadians` | 从弧度角获取切线。 | number: number | `number` | `const value = mod.TangentFromRadians(...);` |
| `BackwardVector` | 取得向後Vector `(0, 0, 1)`。 | 無 | `Vector` | `const value = mod.BackwardVector(...);` |
| `DownVector` | 取得向下的 Vector `(0, -1, 0)`。 | 無 | `Vector` | `const value = mod.DownVector(...);` |
| `ForwardVector` | 获取前向Vector `(0, 0, -1)`。 | 無 | `Vector` | `const value = mod.ForwardVector(...);` |
| `LeftVector` | 取得左側Vector `(-1, 0, 0)`。 | 無 | `Vector` | `const value = mod.LeftVector(...);` |
| `LocalPositionOf` | 根據指定玩家將世界座標轉換為本地座標。 | vector: Vector, player: Player | `Vector` | `const value = mod.LocalPositionOf(...);` |
| `LocalVectorOf` | 根據指定玩家將世界Vector轉換為本地Vector。 | vector: Vector, player: Player | `Vector` | `const value = mod.LocalVectorOf(...);` |
| `RightVector` | 取得正確的Vector `(1, 0, 0)`。 | 無 | `Vector` | `const value = mod.RightVector(...);` |
| `UpVector` | 取得向上的 Vector `(0, 1, 0)`。 | 無 | `Vector` | `const value = mod.UpVector(...);` |
| `VectorTowards` | 取得從起點到終點的位移Vector。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.VectorTowards(...);` |
| `WorldPositionOf` | 將基於指定玩家的本地座標轉換為世界座標。 | vector: Vector, player: Player | `Vector` | `const value = mod.WorldPositionOf(...);` |
| `WorldVectorOf` | 將基於指定玩家的本地Vector轉換為世界Vector。 | vector: Vector, player: Player | `Vector` | `const value = mod.WorldVectorOf(...);` |
| `XComponentOf` | 取得Vector的 X 分量。 | vector: Vector | `number` | `const value = mod.XComponentOf(...);` |
| `YComponentOf` | 取得Vector的 Y 分量。 | vector: Vector | `number` | `const value = mod.YComponentOf(...);` |
| `ZComponentOf` | 取得Vector的 Z 分量。 | vector: Vector | `number` | `const value = mod.ZComponentOf(...);` |
| `Message` | 建立傳遞給通知與 UI 的 Message。顯示文字註冊在 `Strings.json`，並傳遞 `mod.stringkeys.xxx`。`{}` 中放入其他引數。共有 4 種 overload。 | msg: string \| number \| Player, msgArg0: string \| number \| Player, msgArg1: string \| number \| Player, msgArg2: string \| number \| Player | `Message` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` |

# 常用的類型以及如何取得它們

|模具|主要製作和服用方式|用途 |
| --- | --- | --- |
| `Player` | `Player` |事件參數，`AllPlayers()`，`ClosestPlayerTo()` |個人玩家處理、通知、裝備、健康、移動 |
| `Team` | `Team` | `GetTeam(player)`，`GetTeam(1)` | `GetTeam(player)`基於隊伍的勝負、通知、分數和隸屬關係變化 |
| `Vector` | `Vector` | `CreateVector(x, y, z)`，`GetObjectPosition(obj)` | `CreateVector(x, y, z)`座標、方向、顏色、UI位置等 |
| `Message` | `Message(mod.stringkeys.textKey)` | msg: string \| number \| Player, msgArg0: string \| number \| Player, msgArg1: string \| number \| Player, msgArg2: string \| number \| Player | `Message` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` |
| `UIWidget` | `UIWidget` | `AddUIText()`、`AddUIButton()`、`FindUIWidgetWithName()` | HUD、按鈕、圖片、容器 |
| `Variable` | `Variable` | `GlobalVariable(index)`，`ObjectVariable(obj, index)` | `GlobalVariable(index)`階段、計數器與狀態儲存 |
| `mod.Object` | `mod.Object` |共享類型，例如 `Player`、`Vehicle`、`SpatialObject` |移動、取得 Transform、檢查 ObjId |

# 實作注意事項

- `OnPlayerLeaveGame(eventNumber: number)` 接收號碼而不是 `Player`。玩家引用很可能在離開後變得無效，因此在加入變數時保存必要的資訊。
- 回傳值中不傳回 `RayCast()` 的結果。透過 `OnRayCastHit` 或 `OnRayCastMissed` 接收。
- `DisablePlayerJoin()` 在 SDK 註解中據說「無法返回」。當公開使用它時，只有在真正的截止日期時才使用它。
- 如果`AddUI...`系列重寫太多，就會變得沉重。基本上，首先創建它並在 `SetUIWidgetVisible`、`SetUITextLabel`、`SetUIWidgetPosition` 更新它。
- 避免在 `Ongoing...` 系列中重複執行 `AllPlayers()` 或 `AllVehicles()` 。如有必要，可減少到每隔幾秒鐘一次。
- `GetObjId()` 是最重要的偵錯函數，用於檢查放置在 Godot 中的物件與 TypeScript 端的參考是否相符。

# 最小範本

要在螢幕上顯示的文字先在 `Strings.json` 中註冊。

```json
{
  "ready": "ready",
  "welcome": "welcome",
  "interactId": "Interact ID:{}"
}
```

```ts
const PHASE = mod.GlobalVariable(0);

export function OnGameModeStarted(): void {
  mod.SetVariable(PHASE, 0);
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.ready));
}

export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.welcome), eventPlayer);
}

export function OnPlayerInteract(eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint): void {
  const id = mod.GetObjId(eventInteractPoint);
  mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.interactId, id), eventPlayer);
}
```
