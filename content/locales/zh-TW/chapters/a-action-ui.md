---
title: "附錄 A-3：操作/值取得清單（UI/參考/值）"
free: true
---

# 動作/值取得清單（UI/參考/值）

本附錄涵蓋了 UI、通知和記分板的功能、常用類型、實作說明和最小模板。基本操作功能請參閱「附錄A-2：動作/值取得清單（基本操作）」。

## 使用者介面/通知/記分板

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `AddUIIcon` | `AddUIIcon` |將 UI 圖示小工具加入物件。您可以將顯示限制為球員或球隊。 2種類型的霸主。 | ParentObject：mod.Object，圖片：WorldIconImages，verticalOffset：數字，iconColour：Vector，iconText：訊息，可見性：Player \|團隊|無 | `mod.AddUIIcon(...);` | `mod.AddUIIcon(...);` |
| `ClearAllCustomNotificationMessages` | `ClearAllCustomNotificationMessages` |清除指定玩家的所有自訂通知槽。 | 目標：玩家 |無 | `mod.ClearAllCustomNotificationMessages(...);` | `mod.ClearAllCustomNotificationMessages(...);` |
| `ClearCustomNotificationMessage` | `ClearCustomNotificationMessage` |隱藏指定插槽的自訂通知。您也可以指定目標球員或球隊。 3種類型的霸主。 |插槽：CustomNotificationSlots |無 | `mod.ClearCustomNotificationMessage(...);` | `mod.ClearCustomNotificationMessage(...);` |
| `DisplayCustomNotificationMessage` | `DisplayCustomNotificationMessage` |在指定插槽顯示自訂通知。您也可以指定目標球員或球隊。 3種類型的霸主。 | msg：訊息，插槽：CustomNotificationSlots，持續時間：數字 |無 | `mod.DisplayCustomNotificationMessage(...);` | `mod.DisplayCustomNotificationMessage(...);` |
| `DisplayHighlightedWorldLogMessage` | `DisplayHighlightedWorldLogMessage` |在小地圖上的世界日誌上顯示強調的訊息約 6 秒。如果沒有指定目標，則會向所有人顯示。 3種類型的霸主。 |留言： 留言 |無 | `mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.ok));` | `mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.ok));` |
| `DisplayNotificationMessage` | `DisplayNotificationMessage` |在螢幕右上角顯示通知訊息約 6 秒。您也可以指定目標球員或球隊。 3種類型的霸主。 |留言： 留言 |無 | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.start), eventPlayer);` | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.start), eventPlayer);` |
| `SendErrorReport` | `SendErrorReport` |傳送一條在管理選單中顯示為錯誤的訊息。 |留言： 留言 |無 | `mod.SendErrorReport(...);` | `mod.SendErrorReport(...);` |
| `SetScoreboardColumnNames` | `SetScoreboardColumnNames` |設定自訂記分板列名稱。 5種霸主。 | 列 1 名稱：訊息，列 2 名稱：訊息，列 3 名稱：訊息，列 4 名稱：訊息，列 5 名稱：訊息 |無 | `mod.SetScoreboardColumnNames(...);` | `mod.SetScoreboardColumnNames(...);` |
| `SetScoreboardColumnWidths` | `SetScoreboardColumnWidths` |設定自訂記分板的列寬比例。 5種霸主。 | 列 1 寬度：數字，列 2 寬度：數字，列 3 寬度：數字，列 4 寬度：數字，列 5 寬度：數字 |無 | `mod.SetScoreboardColumnWidths(...);` | `mod.SetScoreboardColumnWidths(...);` |
| `SetScoreboardHeader` | `SetScoreboardHeader` |設定記分板左上角顯示的標題名稱。 2種類型的霸主。 | team1Name: 留言, team2Name: 留言 |無 | `mod.SetScoreboardHeader(...);` | `mod.SetScoreboardHeader(...);` |
| `SetScoreboardPlayerValues` | `SetScoreboardPlayerValues` |在自訂記分板上為每位玩家設定最多 5 列的欄位值。 5種霸主。 |玩家：玩家，column1Value：數字，column2Value：數字，column3Value：數字，column4Value：數字，column5Value：數字 |無 | `mod.SetScoreboardPlayerValues(...);` | `mod.SetScoreboardPlayerValues(...);` |
| `SetScoreboardSorting` | `SetScoreboardSorting` |設定自訂記分板排序列與倒序規格。 2種類型的霸主。 | sortingColumn：數字，反向排序：boolean |無 | `mod.SetScoreboardSorting(...);` | `mod.SetScoreboardSorting(...);` |
| `SetScoreboardType` | `SetScoreboardType` |更改要使用的記分板類型。 |記分板類型： 記分板類型 | 無 | `mod.SetScoreboardType(...);` | `mod.SetScoreboardType(...);` |
| `AddUIButton` | `AddUIButton` |建立 UI 按鈕小工具。 6種霸主。 |名稱：字串，位置：向量，大小：向量，錨點：UIAnchor |無 | `mod.AddUIButton(...);` | `mod.AddUIButton(...);` |
| `AddUIContainer` | `AddUIContainer` |建立 UI 容器小工具。 6種霸主。 |名稱：字串，位置：向量，大小：向量，錨點：UIAnchor |無 | `mod.AddUIContainer(...);` | `mod.AddUIContainer(...);` |
| `AddUIGadgetImage` | `AddUIGadgetImage` |建立一個顯示小工具影像的 UI 影像小工具。 2種類型的霸主。 |名稱：字串，位置：向量，大小：向量，錨點：UIAnchor，小工具：小工具，父級：UIWidget |無 | `mod.AddUIGadgetImage(...);` | `mod.AddUIGadgetImage(...);` |
| `AddUIImage` | `AddUIImage` |建立 UI 圖像小工具。 6種霸主。 |名稱：字串，位置：向量，大小：向量，錨點：UIAnchor，圖片類型：UIImageType |無 | `mod.AddUIImage(...);` | `mod.AddUIImage(...);` |
| `AddUIText` | `AddUIText` |建立 UI 文字小工具。 6種霸主。 |名稱：字串，位置：向量，大小：向量，錨點：UIAnchor，訊息：訊息 |無 | `mod.AddUIText("timer", pos, size, mod.UIAnchor.Top, mod.Message(mod.stringkeys.timerZero));` | `mod.AddUIText("timer", pos, size, mod.UIAnchor.Top, mod.Message(mod.stringkeys.timerZero));` |
| `AddUIWeaponImage` | `AddUIWeaponImage` |建立一個顯示武器影像的 UI 影像小工具。 4種類型的霸主。 |名稱：字串，位置：向量，大小：向量，錨點：UIAnchor，武器：武器，父級：UIWidget |無 | `mod.AddUIWeaponImage(...);` | `mod.AddUIWeaponImage(...);` |
| `DeleteAllUIWidgets` | `DeleteAllUIWidgets` |刪除所有 UI 小工具。 |無 |無 | `mod.DeleteAllUIWidgets(...);` | `mod.DeleteAllUIWidgets(...);` |
| `DeleteUIWidget` | `DeleteUIWidget` |刪除指定的 UI 小工具。 |小工具：UIWidget |無 | `mod.DeleteUIWidget(...);` | `mod.DeleteUIWidget(...);` |
| `EnableUIButtonEvent` | `EnableUIButtonEvent` |設定UI Button Widget是否發送按鈕事件。 |小工具：UIWidget，按鈕事件：UIButtonEvent，啟用：布林值 |無 | `mod.EnableUIButtonEvent(...);` | `mod.EnableUIButtonEvent(...);` |
| `EnableUIInputMode` | `EnableUIInputMode` |啟用或停用可讓您操作 UI 按鈕的輸入模式。您也可以指定目標。 2種類型的霸主。 |啟用：布林值|無 | `mod.EnableUIInputMode(...);` | `mod.EnableUIInputMode(...);` |
| `SetUIButtonAlphaBase` | `SetUIButtonAlphaBase` |更改 UI Button 的正常 alpha 值。 |小部件：UIWidget，值：數字 |無 | `mod.SetUIButtonAlphaBase(...);` | `mod.SetUIButtonAlphaBase(...);` |
| `SetUIButtonAlphaDisabled` | `SetUIButtonAlphaDisabled` | UI 按鈕停用時更改 alpha 值。 |小部件：UIWidget，值：數字 |無 | `mod.SetUIButtonAlphaDisabled(...);` | `mod.SetUIButtonAlphaDisabled(...);` |
| `SetUIButtonAlphaFocused` | `SetUIButtonAlphaFocused` | UI 按鈕獲得焦點時更改 alpha 值。 |小部件：UIWidget，值：數字 |無 | `mod.SetUIButtonAlphaFocused(...);` | `mod.SetUIButtonAlphaFocused(...);` |
| `SetUIButtonAlphaHover` | `SetUIButtonAlphaHover` |更改懸停時 UI 按鈕的 alpha 值。 |小部件：UIWidget，值：數字 |無 | `mod.SetUIButtonAlphaHover(...);` | `mod.SetUIButtonAlphaHover(...);` |
| `SetUIButtonAlphaPressed` | `SetUIButtonAlphaPressed` |按下 UI 按鈕時更改 alpha 值。 |小部件：UIWidget，值：數字 |無 | `mod.SetUIButtonAlphaPressed(...);` | `mod.SetUIButtonAlphaPressed(...);` |
| `SetUIButtonColorBase` | `SetUIButtonColorBase` |更改 UI Button 的正常顏色。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIButtonColorBase(...);` | `mod.SetUIButtonColorBase(...);` |
| `SetUIButtonColorDisabled` | `SetUIButtonColorDisabled` |停用時更改 UI 按鈕的顏色。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIButtonColorDisabled(...);` | `mod.SetUIButtonColorDisabled(...);` |
| `SetUIButtonColorFocused` | `SetUIButtonColorFocused` |更改 UI 按鈕對焦時的顏色。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIButtonColorFocused(...);` | `mod.SetUIButtonColorFocused(...);` |
| `SetUIButtonColorHover` | `SetUIButtonColorHover` |更改 UI 按鈕的懸停顏色。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIButtonColorHover(...);` | `mod.SetUIButtonColorHover(...);` |
| `SetUIButtonColorPressed` | `SetUIButtonColorPressed` |按下時更改 UI 按鈕的顏色。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIButtonColorPressed(...);` | `mod.SetUIButtonColorPressed(...);` |
| `SetUIButtonEnabled` | `SetUIButtonEnabled` |啟用或停用 UI 按鈕。 |小工具：UIWidget，啟用：布林值 |無 | `mod.SetUIButtonEnabled(...);` | `mod.SetUIButtonEnabled(...);` |
| `SetUIImageAlpha` | `SetUIImageAlpha` |更改 UI 影像的 alpha 值。 |小部件：UIWidget，值：數字 |無 | `mod.SetUIImageAlpha(...);` | `mod.SetUIImageAlpha(...);` |
| `SetUIImageColor` | `SetUIImageColor` |更改 UI 影像的顏色。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIImageColor(...);` | `mod.SetUIImageColor(...);` |
| `SetUIImageType` | `SetUIImageType` |更改 UI Image 的圖片類型。 |小工具：UIWidget，圖片類型：UIImageType |無 | `mod.SetUIImageType(...);` | `mod.SetUIImageType(...);` |
| `SetUITextAlpha` | `SetUITextAlpha` |更改 UI 文字的 alpha 值。 |小部件：UIWidget，值：數字 |無 | `mod.SetUITextAlpha(...);` | `mod.SetUITextAlpha(...);` |
| `SetUITextAnchor` | `SetUITextAnchor` |更改 UI 文字中的字元錨點。 |小工具：UIWidget，錨點：UIAnchor |無 | `mod.SetUITextAnchor(...);` | `mod.SetUITextAnchor(...);` |
| `SetUITextColor` | `SetUITextColor` |更改 UI 文字文字顏色。 |小部件：UIWidget，值：向量 |無 | `mod.SetUITextColor(...);` | `mod.SetUITextColor(...);` |
| `SetUITextLabel` | `SetUITextLabel` |更改 UI 文字中顯示的訊息。顯示文字可以在 `Strings.json` 註冊後參考。 |小部件：UIWidget，訊息：訊息 |無 | `mod.SetUITextLabel(widget, mod.Message(mod.stringkeys.updated));` |
| `SetUITextSize` | `SetUITextSize` |更改 UI 文字的字體大小。 |小部件：UIWidget，值：數字 |無 | `mod.SetUITextSize(...);` | `mod.SetUITextSize(...);` |
| `SetUIWidgetAnchor` | `SetUIWidgetAnchor` |更改 UI 小部件的錨點位置。 |小工具：UIWidget，錨點：UIAnchor |無 | `mod.SetUIWidgetAnchor(...);` | `mod.SetUIWidgetAnchor(...);` |
| `SetUIWidgetBgAlpha` | `SetUIWidgetBgAlpha` |更改 UI Widget 背景的 Alpha 值。 |小部件：UIWidget，值：數字 |無 | `mod.SetUIWidgetBgAlpha(...);` | `mod.SetUIWidgetBgAlpha(...);` |
| `SetUIWidgetBgColor` | `SetUIWidgetBgColor` |更改 UI 小工具背景顏色。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIWidgetBgColor(...);` | `mod.SetUIWidgetBgColor(...);` |
| `SetUIWidgetBgFill` | `SetUIWidgetBgFill` |更改UI Widget背景的繪製方法。 |小工具：UIWidget，bgFill：UIBgFill |無 | `mod.SetUIWidgetBgFill(...);` | `mod.SetUIWidgetBgFill(...);` |
| `SetUIWidgetDepth` | `SetUIWidgetDepth` |更改 UI 小部件的繪製順序。 |小工具：UIWidget，深度：UIDepth |無 | `mod.SetUIWidgetDepth(...);` | `mod.SetUIWidgetDepth(...);` |
| `SetUIWidgetName` | `SetUIWidgetName` |更改 UI 小工具名稱。 |小部件：UIWidget，名稱：字串 |無 | `mod.SetUIWidgetName(...);` | `mod.SetUIWidgetName(...);` |
| `SetUIWidgetPadding` | `SetUIWidgetPadding` |更改 UI 小工具的填滿。 |小部件：UIWidget，值：數字 |無 | `mod.SetUIWidgetPadding(...);` | `mod.SetUIWidgetPadding(...);` |
| `SetUIWidgetParent` | `SetUIWidgetParent` |更改 UI 小部件的父小部件。 |小部件：UIWidget，父級：UIWidget |無 | `mod.SetUIWidgetParent(...);` | `mod.SetUIWidgetParent(...);` |
| `SetUIWidgetPosition` | `SetUIWidgetPosition` |更改 UI 小工具的位置。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIWidgetPosition(...);` | `mod.SetUIWidgetPosition(...);` |
| `SetUIWidgetSize` | `SetUIWidgetSize` |更改 UI 小部件的大小。 |小部件：UIWidget，值：向量 |無 | `mod.SetUIWidgetSize(...);` | `mod.SetUIWidgetSize(...);` |
| `SetUIWidgetVisible` | `SetUIWidgetVisible` |顯示/隱藏 UI 小工具。 |小工具：UIWidget，可見：布林值 |無 | `mod.SetUIWidgetVisible(widget, false);` | `mod.SetUIWidgetVisible(widget, false);` |
| `FindUIWidgetWithName` | `FindUIWidgetWithName` |尋找並擷取與名稱相符的 UI 小工具。 2種類型的霸主。 |名稱：字串，搜尋根：UIWidget | `UIWidget` | `UIWidget` | `const value = mod.FindUIWidgetWithName(...);` |
| `GetUIButtonAlphaBase` | `GetUIButtonAlphaBase` |從數字或目標取得 UIButtonAlphaBase。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaBase(...);` |
| `GetUIButtonAlphaDisabled` | `GetUIButtonAlphaDisabled` |從數字或目標取得 UIButtonAlphaDisabled。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaDisabled(...);` |
| `GetUIButtonAlphaFocused` | `GetUIButtonAlphaFocused` |從數字或目標取得 UIButtonAlphaFocused。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaFocused(...);` |
| `GetUIButtonAlphaHover` | `GetUIButtonAlphaHover` |從數字或目標取得 UIButtonAlphaHover。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaHover(...);` |
| `GetUIButtonAlphaPressed` | `GetUIButtonAlphaPressed` |從數字或目標取得 UIButtonAlphaPressed。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaPressed(...);` |
| `GetUIButtonColorBase` | `GetUIButtonColorBase` |從數字或目標取得 UIButtonColorBase。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorBase(...);` |
| `GetUIButtonColorDisabled` | `GetUIButtonColorDisabled` |從數字或目標取得 UIButtonColorDisabled。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorDisabled(...);` |
| `GetUIButtonColorFocused` | `GetUIButtonColorFocused` |從數字或目標取得 UIButtonColorFocused。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorFocused(...);` |
| `GetUIButtonColorHover` | `GetUIButtonColorHover` |從數字或目標取得 UIButtonColorHover。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorHover(...);` |
| `GetUIButtonColorPressed` | `GetUIButtonColorPressed` |從數字或目標取得 UIButtonColorPressed。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorPressed(...);` |
| `GetUIButtonEnabled` | `GetUIButtonEnabled` |從數字或目標取得 UIButtonEnabled。 |小工具：UIWidget | `boolean` | `boolean` | `const value = mod.GetUIButtonEnabled(...);` |
| `GetUIImageAlpha` | `GetUIImageAlpha` |從數字或目標取得 UIImageAlpha。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUIImageAlpha(...);` |
| `GetUIImageColor` | `GetUIImageColor` |從數字或目標取得 UIImageColor。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIImageColor(...);` |
| `GetUIImageType` | `GetUIImageType` |從數字或目標取得 UIImageType。 |小工具：UIWidget | `UIImageType` | `UIImageType` | `const value = mod.GetUIImageType(...);` |
| `GetUIRoot` | `GetUIRoot` |從數字或目標取得 UIRoot。 |無 | `UIWidget` | `UIWidget` | `const value = mod.GetUIRoot(...);` |
| `GetUITextAlpha` | `GetUITextAlpha` |從數字或目標取得 UITextAlpha。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUITextAlpha(...);` |
| `GetUITextAnchor` | `GetUITextAnchor` |從數字或目標取得 UITextAnchor。 |小工具：UIWidget | `UIAnchor` | `UIAnchor` | `const value = mod.GetUITextAnchor(...);` |
| `GetUITextColor` | `GetUITextColor` |從數字或目標取得 UITextColor。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUITextColor(...);` |
| `GetUITextSize` | `GetUITextSize` |從數字或目標取得 UITextSize。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUITextSize(...);` |
| `GetUIWidgetAnchor` | `GetUIWidgetAnchor` |從數字或目標取得 UIWidgetAnchor。 |小工具：UIWidget | `UIAnchor` | `UIAnchor` | `const value = mod.GetUIWidgetAnchor(...);` |
| `GetUIWidgetBgAlpha` | `GetUIWidgetBgAlpha` |從數字或目標取得 UIWidgetBgAlpha。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUIWidgetBgAlpha(...);` |
| `GetUIWidgetBgColor` | `GetUIWidgetBgColor` |從數字或目標取得 UIWidgetBgColor。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIWidgetBgColor(...);` |
| `GetUIWidgetBgFill` | `GetUIWidgetBgFill` |從數字或目標取得 UIWidgetBgFill。 |小工具：UIWidget | `UIBgFill` | `UIBgFill` | `const value = mod.GetUIWidgetBgFill(...);` |
| `GetUIWidgetDepth` | `GetUIWidgetDepth` |從數字或目標取得 UIWidgetDepth。 |小工具：UIWidget | `UIDepth` | `UIDepth` | `const value = mod.GetUIWidgetDepth(...);` |
| `GetUIWidgetName` | `GetUIWidgetName` |從數字或目標取得 UIWidgetName。 |小工具：UIWidget | `string` | `string` | `const value = mod.GetUIWidgetName(...);` |
| `GetUIWidgetPadding` | `GetUIWidgetPadding` |從數字或目標取得 UIWidgetPadding。 |小工具：UIWidget | `number` | `number` | `const value = mod.GetUIWidgetPadding(...);` |
| `GetUIWidgetParent` | `GetUIWidgetParent` |從數字或目標取得 UIWidgetParent。 |小工具：UIWidget | `UIWidget` | `UIWidget` | `const value = mod.GetUIWidgetParent(...);` |
| `GetUIWidgetPosition` | `GetUIWidgetPosition` |從數字或目標取得 UIWidgetPosition。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIWidgetPosition(...);` |
| `GetUIWidgetSize` | `GetUIWidgetSize` |從數字或目標取得 UIWidgetSize。 |小工具：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIWidgetSize(...);` |
| `GetUIWidgetVisible` | `GetUIWidgetVisible` |從數字或目標取得 UIWidgetVisible。 |小工具：UIWidget | `boolean` | `boolean` | `const value = mod.GetUIWidgetVisible(...);` |
| `HasUIWidgetWithName` | `HasUIWidgetWithName` |決定是否存在與名稱相符的 UI 小部件。 2種類型的霸主。 |名稱：字串，搜尋根：UIWidget | `boolean` | `boolean` | `const value = mod.HasUIWidgetWithName(...);` |

## 球員/球隊參考

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `SetTeam` | `SetTeam` |更改指定玩家的隊伍。 | 球員： 球員，球隊： 球隊 |無 | `mod.SetTeam(...);` | `mod.SetTeam(...);` |
| `IsFaction` | `IsFaction` |判斷指定隊伍是否使用指定陣營。 |團隊： 團隊，派系： 派系 | `boolean` | `boolean` | `const value = mod.IsFaction(...);` |
| `AllPlayers` | `AllPlayers` |取得遊戲中所有玩家的陣列。 |無 | `Array` | `Array` | `const players = mod.AllPlayers();` |
| `ClosestPlayerTo` | `ClosestPlayerTo` |取得距離指定座標最近的活著的玩家。您可以按團隊縮小範圍。 2種類型的霸主。 | 向量：向量| `Player` | `Player` | `const value = mod.ClosestPlayerTo(...);` |
| `FarthestPlayerFrom` | `FarthestPlayerFrom` |取得距離指定座標最遠的倖存玩家。您可以按團隊縮小範圍。 2種類型的霸主。 | 向量：向量| `Player` | `Player` | `const value = mod.FarthestPlayerFrom(...);` |
| `GetPlayerDeaths` | `GetPlayerDeaths` |取得指定玩家的死亡人數。 |玩家： 玩家 | `number` | `number` | `const value = mod.GetPlayerDeaths(...);` |
| `GetPlayerKills` | `GetPlayerKills` |取得指定玩家的擊殺數。 |玩家： 玩家 | `number` | `number` | `const value = mod.GetPlayerKills(...);` |
| `GetSquad` | `GetSquad` |取得指定球員或球隊/小隊號碼對應的球隊。 2種類型的霸主。 |玩家： 玩家 | `Squad` | `Squad` | `const value = mod.GetSquad(...);` |
| `GetSquadName` | `GetSquadName` |取得字串形式的指定小隊的名稱。 | arg0：小隊 | `string` | `string` | `const value = mod.GetSquadName(...);` |
| `GetTeam` | `GetTeam` |取得指定玩家所在的隊伍或指定號碼對應的隊伍。 2種類型的霸主。 |玩家： 玩家 | `Team` | `Team` | `const team = mod.GetTeam(eventPlayer);` |
| `IsPlayerValid` | `IsPlayerValid` |決定指定的 Player 引用是否有效。 |玩家： 玩家 | `boolean` | `boolean` | `const value = mod.IsPlayerValid(...);` |
| `IsSquadLeader` | `IsSquadLeader` |判斷指定玩家是否為班長。 |玩家： 玩家 | `boolean` | `boolean` | `const value = mod.IsSquadLeader(...);` |

## 數組

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `AppendToArray` | `AppendToArray` |傳回副本，並將值加到陣列結尾。數組是串聯的。 |陣列：數組，值：任意 | `Array` | `Array` | `const value = mod.AppendToArray(...);` |
| `ArraySlice` | `ArraySlice` |僅傳回數組中指定索引範圍的副本。 |陣列：陣列，起始索引：數字，結束索引：數字 | `Array` | `Array` | `const value = mod.ArraySlice(...);` |
| `CountOf` | `CountOf` |取得陣列中的元素數量。 |陣列：陣列 | `number` | `number` | `const value = mod.CountOf(...);` |
| `EmptyArray` | `EmptyArray` |建立一個空數組。 |無 | `Array` | `Array` | `const value = mod.EmptyArray(...);` |
| `FirstOf` | `FirstOf` |取得陣列的第一個值。 |陣列：陣列 | `Any` | `Any` | `const value = mod.FirstOf(...);` |
| `LastOf` | `LastOf` |取得陣列的最後一個值。 |陣列：陣列 | `Any` | `Any` | `const value = mod.LastOf(...);` |
| `RandomValueInArray` | `RandomValueInArray` |從陣列中取得一個隨機值。 |陣列：陣列 | `Any` | `Any` | `const value = mod.RandomValueInArray(...);` |
| `RandomizedArray` | `RandomizedArray` |傳回陣列的隨機重新排列的副本。 |陣列：陣列 | `Array` | `Array` | `const value = mod.RandomizedArray(...);` |
| `SortedArray` | `SortedArray` |傳回依指定數字條件升序排序的陣列的副本。 |陣列：數組，索引：數字 | `Array` | `Array` | `const value = mod.SortedArray(...);` |
| `ValueInArray` | `ValueInArray` |取得陣列指定索引處的值。 |陣列：數組，索引：數字 | `Any` | `Any` | `const value = mod.ValueInArray(...);` |

## 取得物件ID

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `GetWaypointPath` | `GetWaypointPath` |從數字或目標取得 WaypointPath。 | waypointPathNumber: 數字 | `WaypointPath` | `WaypointPath` | `const value = mod.GetWaypointPath(...);` |
| `GetSFX` | `GetSFX` |從號碼或目標取得 SFX。 |數量： 數量 | `SFX` | `SFX` | `const value = mod.GetSFX(...);` |
| `GetVO` | `GetVO` |從號碼或目標取得 VO。 |數量： 數量 | `VO` | `VO` | `const value = mod.GetVO(...);` |
| `GetVFX` | `GetVFX` |從數字或目標取得視覺特效。 | vfxNumber: 數字 | `VFX` | `VFX` | `const value = mod.GetVFX(...);` |
| `GetSpawnPoint` | `GetSpawnPoint` |從數字或目標取得 SpawnPoint。 |數量： 數量 | `SpawnPoint` | `SpawnPoint` | `const value = mod.GetSpawnPoint(...);` |
| `GetSpawner` | `GetSpawner` |從號碼或目標取得 Spawner。 |數量： 數量 | `Spawner` | `Spawner` | `const value = mod.GetSpawner(...);` |
| `GetVL7Cloud` | `GetVL7Cloud` |從號碼或目標取得 VL7Cloud。 | vl7CloudId：編號 | `VL7Cloud` | `VL7Cloud` | `const value = mod.GetVL7Cloud(...);` |

## 邏輯/字串/擴展

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `JsAction` | `JsAction` |在 JavaScript 端呼叫獨特的動作。用於在模板側延伸。 | actionName：字串，actionArg0：任意，actionArg1：任意 |無 | `mod.JsAction("MyAction", eventPlayer, 0);` | `mod.JsAction("MyAction", eventPlayer, 0);` |
| `And` | `And` |判斷兩個真值是否都為真。 | boolean0：布林值，boolean1：布林值 | `boolean` | `boolean` | `const value = mod.And(...);` |
| `Equals` | `Equals` |決定兩個值是否相等。 |左：任意，右：任意 | `boolean` | `boolean` | `const value = mod.Equals(...);` |
| `GreaterThan` | `GreaterThan` |判斷左邊的數字是否大於右邊的數。 |數字 0：數字，數字 1：數字 | `boolean` | `boolean` | `const value = mod.GreaterThan(...);` |
| `GreaterThanEqualTo` | `GreaterThanEqualTo` |判斷左邊的數字是否大於或等於右邊的數。 |左：數字，右：數字 | `boolean` | `boolean` | `const value = mod.GreaterThanEqualTo(...);` |
| `IfThenElse` | `IfThenElse` |一個三元運算，如果條件為 true，則傳回第一個值；如果條件為 false，則傳回第二個值。 |條件：布林值，trueValue：任意，falseValue：任意 | `Any` | `Any` | `const value = mod.IfThenElse(...);` |
| `IsType` | `IsType` |判斷值是否與指定類型相符。 |值：任意，類型：類型 | `boolean` | `boolean` | `const value = mod.IsType(...);` |
| `JsValue` | `JsValue` |在 JavaScript 端呼叫唯一值函數。使用Portal端的回傳值。 | valueName：字串，valueArg0：任意，valueArg1：任意 | `Any` | `Any` | `const value = mod.JsValue("MyValue", eventPlayer, 0);` |
| `LessThan` | `LessThan` |判斷左邊的數字是否小於右邊的數。 |左：數字，右：數字 | `boolean` | `boolean` | `const value = mod.LessThan(...);` |
| `LessThanEqualTo` | `LessThanEqualTo` |判斷左邊的數是小於或等於右邊的數。 |左：數字，右：數字 | `boolean` | `boolean` | `const value = mod.LessThanEqualTo(...);` |
| `Not` | `Not` |反轉真值。 |布林值：布林值| `boolean` | `boolean` | `const value = mod.Not(...);` |
| `NotEqualTo` | `NotEqualTo` |判斷兩個值是否不相等。 |左：任意，右：任意 | `boolean` | `boolean` | `const value = mod.NotEqualTo(...);` |
| `Or` | `Or` |確定兩個真值之一是否為真。 | boolean0：布林值，boolean1：布林值 | `boolean` | `boolean` | `const value = mod.Or(...);` |
| `Xor` | `Xor` |決定兩個真值是否不同。 | boolean0：布林值，boolean1：布林值 | `boolean` | `boolean` | `const value = mod.Xor(...);` |
| `Concat` | `Concat` |連接兩個字串。 |字串0：字串，字串1：字串| `string` | `string` | `const value = mod.Concat(...);` |

## 數值/向量/座標

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `GetObjId` | `GetObjId` |取得放置的項目和物件的 ObjId。用於檢查 Godot 放置和代碼引用。 |物件：mod.Object | `number` | `number` | `const id = mod.GetObjId(eventInteractPoint);` |
| `IsCurrentMap` | `IsCurrentMap` |判斷目前地圖是否與指定地圖相符。 |地圖： 地圖 | `boolean` | `boolean` | `const value = mod.IsCurrentMap(...);` |
| `AbsoluteValue` | `AbsoluteValue` |取得數字的絕對值。 |數量： 數量 | `number` | `number` | `const value = mod.AbsoluteValue(...);` |
| `Add` | `Add` |新增數字或向量。 2種類型的霸主。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.Add(...);` |
| `AngleBetweenVectors` | `AngleBetweenVectors` |取得兩個向量之間的角度（以度為單位）。 |向量0：向量，向量1：向量| `number` | `number` | `const value = mod.AngleBetweenVectors(...);` |
| `AngleDifference` | `AngleDifference` |取得兩個角度之間的差值（以度為單位）。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.AngleDifference(...);` |
| `ArccosineInDegrees` | `ArccosineInDegrees` |取得數字的反餘弦（以度為單位）。 |數量： 數量 | `number` | `number` | `const value = mod.ArccosineInDegrees(...);` |
| `ArccosineInRadians` | `ArccosineInRadians` |取得以弧度為單位的數字的反餘弦。 |數量： 數量 | `number` | `number` | `const value = mod.ArccosineInRadians(...);` |
| `ArcsineInDegrees` | `ArcsineInDegrees` |取得以度為單位的數字的反正弦。 |數量： 數量 | `number` | `number` | `const value = mod.ArcsineInDegrees(...);` |
| `ArcsineInRadians` | `ArcsineInRadians` |取得以弧度為單位的數字的反正弦。 |數量： 數量 | `number` | `number` | `const value = mod.ArcsineInRadians(...);` |
| `ArctangentInDegrees` | `ArctangentInDegrees` |取得以度為單位的數字的反正切值。 |數量： 數量 | `number` | `number` | `const value = mod.ArctangentInDegrees(...);` |
| `ArctangentInRadians` | `ArctangentInRadians` |取得以弧度為單位的數字的反正切值。 |數量： 數量 | `number` | `number` | `const value = mod.ArctangentInRadians(...);` |
| `Ceiling` | `Ceiling` |透過向上捨入小數位將數字轉換為整數。 |數量： 數量 | `number` | `number` | `const value = mod.Ceiling(...);` |
| `CosineFromDegrees` | `CosineFromDegrees` |從度角取得餘弦。 |數量： 數量 | `number` | `number` | `const value = mod.CosineFromDegrees(...);` |
| `CosineFromRadians` | `CosineFromRadians` |從弧度角取得餘弦。 |數量： 數量 | `number` | `number` | `const value = mod.CosineFromRadians(...);` |
| `CreateTransform` | `CreateTransform` |從位置和旋轉向量建立變換。 | 位置：向量，旋轉：向量| `Transform` | `Transform` | `mod.CreateTransform(pos, rot);` |
| `CreateVector` | `CreateVector` |從 X、Y、Z 三個值建立一個向量。 X 為左和右，Y 為上和下，Z 為前後。 |數字 0：數字，數字 1：數字，數字 2：數字 | `Vector` | `Vector` | `mod.CreateVector(0, 2, 0);` |
| `CrossProduct` | `CrossProduct` |取得兩個向量的叉積。如果它們平行，則它變成零向量。 |向量0：向量，向量1：向量| `Vector` | `Vector` | `const value = mod.CrossProduct(...);` |
| `DegreesToRadians` | `DegreesToRadians` |將度數轉換為弧度。 |數量： 數量 | `number` | `number` | `const value = mod.DegreesToRadians(...);` |
| `DirectionFromAngles` | `DirectionFromAngles` |從偏航角和俯仰角取得方向向量。 |數字 0：數字，數字 1：數字 | `Vector` | `Vector` | `const value = mod.DirectionFromAngles(...);` |
| `DirectionTowards` | `DirectionTowards` |取得從起點到終點的歸一化方向向量。 |向量0：向量，向量1：向量| `Vector` | `Vector` | `const value = mod.DirectionTowards(...);` |
| `DistanceBetween` | `DistanceBetween` |取得兩個座標之間的距離。 |向量0：向量，向量1：向量| `number` | `number` | `const value = mod.DistanceBetween(...);` |
| `Divide` | `Divide` |透過除以數字或將 Vector 除以數字來傳回縮放後的 Vector。 2種類型的霸主。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.Divide(...);` |
| `DotProduct` | `DotProduct` |取得兩個向量的內積。如果它們正交，則為 0。向量0：向量，向量1：向量| `number` | `number` | `const value = mod.DotProduct(...);` |
| `Floor` | `Floor` |透過向下捨去小數位將數字轉換為整數。 |數量： 數量 | `number` | `number` | `const value = mod.Floor(...);` |
| `Max` | `Max` |傳回兩個數字中較大的一個。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.Max(...);` |
| `Modulo` | `Modulo` |傳回左邊的數字除以右邊的數字所得的餘數。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.Modulo(...);` |
| `Multiply` | `Multiply` |將數字相乘或透過將向量乘以數字來傳回縮放後的向量。 2種類型的霸主。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.Multiply(...);` |
| `Normalize` | `Normalize` |將向量歸一化為長度為 1 的單位向量。向量：向量| `Vector` | `Vector` | `const value = mod.Normalize(...);` |
| `Pi` | `Pi` |傳回 pi 的近似值。 |無 | `number` | `number` | `const value = mod.Pi(...);` |
| `RadiansToDegrees` | `RadiansToDegrees` |將弧度轉換為度數。 |數量： 數量 | `number` | `number` | `const value = mod.RadiansToDegrees(...);` |
| `RaiseToPower` | `RaiseToPower` |將左邊的數字求右邊數字的冪。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.RaiseToPower(...);` |
| `RandomReal` | `RandomReal` |傳回從指定最小值到最大值的隨機實數。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.RandomReal(...);` |
| `RoundToInteger` | `RoundToInteger` |將數字四捨五入為整數。 |數量： 數量 | `number` | `number` | `const value = mod.RoundToInteger(...);` |
| `SineFromDegrees` | `SineFromDegrees` |從度角取得正弦值。 |數量： 數量 | `number` | `number` | `const value = mod.SineFromDegrees(...);` |
| `SineFromRadians` | `SineFromRadians` |從弧度角取得正弦值。 |數量： 數量 | `number` | `number` | `const value = mod.SineFromRadians(...);` |
| `SquareRoot` | `SquareRoot` |求一個數的平方根。 |數量： 數量 | `number` | `number` | `const value = mod.SquareRoot(...);` |
| `Subtract` | `Subtract` |減去數字或向量。 2種類型的霸主。 |數字 0：數字，數字 1：數字 | `number` | `number` | `const value = mod.Subtract(...);` |
| `TangentFromDegrees` | `TangentFromDegrees` |从度角获取切线。 |數量： 數量 | `number` | `number` | `const value = mod.TangentFromDegrees(...);` |
| `TangentFromRadians` | `TangentFromRadians` |从弧度角获取切线。 |數量： 數量 | `number` | `number` | `const value = mod.TangentFromRadians(...);` |
| `BackwardVector` | `BackwardVector` |取得向後向量 `(0, 0, 1)`。 |无 | `Vector` | `const value = mod.BackwardVector(...);` | `const value = mod.BackwardVector(...);` |
| `DownVector` | `DownVector` |取得向下的 Vector `(0, -1, 0)`。 |無 | `Vector` | `const value = mod.DownVector(...);` | `const value = mod.DownVector(...);` |
| `ForwardVector` | `ForwardVector` |获取前向向量 `(0, 0, -1)`。 |无 | `Vector` | `const value = mod.ForwardVector(...);` | `const value = mod.ForwardVector(...);` |
| `LeftVector` | `LeftVector` |取得左側向量 `(-1, 0, 0)`。 |无 | `Vector` | `const value = mod.LeftVector(...);` | `const value = mod.LeftVector(...);` |
| `LocalPositionOf` | `LocalPositionOf` |根據指定玩家將世界座標轉換為本地座標。 | 向量：向量，玩家：玩家 | `Vector` | `Vector` | `const value = mod.LocalPositionOf(...);` |
| `LocalVectorOf` | `LocalVectorOf` |根據指定玩家將世界向量轉換為本地向量。 | 向量：向量，玩家：玩家 | `Vector` | `Vector` | `const value = mod.LocalVectorOf(...);` |
| `RightVector` | `RightVector` |取得正確的向量 `(1, 0, 0)`。 |无 | `Vector` | `const value = mod.RightVector(...);` | `const value = mod.RightVector(...);` |
| `UpVector` | `UpVector` |取得向上的 Vector `(0, 1, 0)`。 |無 | `Vector` | `const value = mod.UpVector(...);` | `const value = mod.UpVector(...);` |
| `VectorTowards` | `VectorTowards` |取得從起點到終點的位移向量。 |向量0：向量，向量1：向量| `Vector` | `Vector` | `const value = mod.VectorTowards(...);` |
| `WorldPositionOf` | `WorldPositionOf` |將基於指定玩家的本地座標轉換為世界座標。 | 向量：向量，玩家：玩家 | `Vector` | `Vector` | `const value = mod.WorldPositionOf(...);` |
| `WorldVectorOf` | `WorldVectorOf` |將基於指定玩家的本地向量轉換為世界向量。 | 向量：向量，玩家：玩家 | `Vector` | `Vector` | `const value = mod.WorldVectorOf(...);` |
| `XComponentOf` | `XComponentOf` |取得向量的 X 分量。 | 向量：向量| `number` | `number` | `const value = mod.XComponentOf(...);` |
| `YComponentOf` | `YComponentOf` |取得向量的 Y 分量。 | 向量：向量| `number` | `number` | `const value = mod.YComponentOf(...);` |
| `ZComponentOf` | `ZComponentOf` |取得向量的 Z 分量。 | 向量：向量| `number` | `number` | `const value = mod.ZComponentOf(...);` |
| `Message` | 建立傳遞給通知與 UI 的 Message。顯示文字註冊在 `Strings.json`，並傳遞 `mod.stringkeys.xxx`。`{}` 中放入其他引數。共有 4 種 overload。 | msg: string \| number \| Player, msgArg0: string \| number \| Player, msgArg1: string \| number \| Player, msgArg2: string \| number \| Player | `Message` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` |

# 常用的類型以及如何取得它們

|模具|主要製作和服用方式|用途 |
| --- | --- | --- |
| `Player` | `Player` |事件參數，`AllPlayers()`，`ClosestPlayerTo()` |個人玩家處理、通知、裝備、健康、移動 |
| `Team` | `Team` | `GetTeam(player)`，`GetTeam(1)` | `GetTeam(player)`基於團隊的勝負、通知、分數和隸屬關係變化 |
| `Vector` | `Vector` | `CreateVector(x, y, z)`，`GetObjectPosition(obj)` | `CreateVector(x, y, z)`座標、方向、顏色、UI位置等 |
| `Message` | `Message` | `Message(mod.stringkeys.textKey)` | `Message(mod.stringkeys.textKey)` |通知、WorldIcon 文字、記分板標題 |
| `UIWidget` | `UIWidget` | `AddUIText()`、`AddUIButton()`、`FindUIWidgetWithName()` | HUD、按鈕、圖片、容器 |
| `Variable` | `Variable` | `GlobalVariable(index)`，`ObjectVariable(obj, index)` | `GlobalVariable(index)`階段、計數器與狀態儲存 |
| `mod.Object` | `mod.Object` |共享類型，例如 `Player`、`Vehicle`、`SpatialObject` |移動、取得 Transform、檢查 ObjId |

# 實施注意事項

- `OnPlayerLeaveGame(eventNumber: number)` 接收號碼而不是 `Player`。玩家引用很可能在離開後變得無效，因此在加入變數時保存必要的資訊。
- 傳回值中不傳回 `RayCast()` 的結果。透過 `OnRayCastHit` 或 `OnRayCastMissed` 接收。
- `DisablePlayerJoin()` 在 SDK 註解中據說「無法返回」。當公開使用它時，只有在真正的截止日期時才使用它。
- 如果`AddUI...`系列重寫太多，就會變得沉重。基本上，首先創建它並在 `SetUIWidgetVisible`、`SetUITextLabel`、`SetUIWidgetPosition` 更新它。
- 避免在 `Ongoing...` 系列中重複執行 `AllPlayers()` 或 `AllVehicles()` 。如有必要，可減少到每隔幾秒鐘一次。
- `GetObjId()` 是最重要的偵錯函數，用於檢查放置在 Godot 中的物件與 TypeScript 端的參考是否相符。

# 最小模板

要在螢幕上顯示的字元首先在 `Strings.json` 中註冊。

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
