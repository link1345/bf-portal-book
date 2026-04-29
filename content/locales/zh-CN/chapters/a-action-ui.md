---
title: "附录 A-3：操作/值获取列表（UI/参考/值）"
free: true
---

::::message
本附录目前只是粗略的机器翻译，文字可能非常不自然。我之后会认真修改，暂时请多包涵。
::::

# 动作/值获取列表（UI/参考/值）

本附录涵盖了 UI、通知和记分板的功能、常用类型、实现说明和最小模板。基本操作功能请参见“附录A-2：动作/值获取列表（基本操作）”。

## 用户界面/通知/记分板

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `AddUIIcon` | `AddUIIcon` |将 UI 图标小部件添加到对象中。您可以将显示限制为球员或球队。 2种类型的霸主。 | ParentObject：mod.Object，图像：WorldIconImages，verticalOffset：数字，iconColour：Vector，iconText：消息，可见性：Player \|团队|无 | `mod.AddUIIcon(...);` | `mod.AddUIIcon(...);` |
| `ClearAllCustomNotificationMessages` | `ClearAllCustomNotificationMessages` |清除指定玩家的所有自定义通知槽。 |目标： 玩家 |无 | `mod.ClearAllCustomNotificationMessages(...);` | `mod.ClearAllCustomNotificationMessages(...);` |
| `ClearCustomNotificationMessage` | `ClearCustomNotificationMessage` |隐藏指定插槽的自定义通知。您还可以指定目标球员或球队。 3种类型的霸主。 |插槽：CustomNotificationSlots |无 | `mod.ClearCustomNotificationMessage(...);` | `mod.ClearCustomNotificationMessage(...);` |
| `DisplayCustomNotificationMessage` | `DisplayCustomNotificationMessage` |在指定槽位显示自定义通知。您还可以指定目标球员或球队。 3种类型的霸主。 | msg：消息，槽：CustomNotificationSlots，持续时间：数字 |无 | `mod.DisplayCustomNotificationMessage(...);` | `mod.DisplayCustomNotificationMessage(...);` |
| `DisplayHighlightedWorldLogMessage` | `DisplayHighlightedWorldLogMessage` |在小地图上的世界日志上显示强调的消息约 6 秒。如果没有指定目标，则会向所有人显示。 3种类型的霸主。 |留言： 留言 |无 | `mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.ok));` | `mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.ok));` |
| `DisplayNotificationMessage` | `DisplayNotificationMessage` |在屏幕右上角显示通知消息约 6 秒。您还可以指定目标球员或球队。 3种类型的霸主。 |留言： 留言 |无 | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.start), eventPlayer);` | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.start), eventPlayer);` |
| `SendErrorReport` | `SendErrorReport` |发送一条在管理菜单中显示为错误的消息。 |留言： 留言 |无 | `mod.SendErrorReport(...);` | `mod.SendErrorReport(...);` |
| `SetScoreboardColumnNames` | `SetScoreboardColumnNames` |设置自定义记分板列名称。 5种霸主。 |列 1 名称：消息，列 2 名称：消息，列 3 名称：消息，列 4 名称：消息，列 5 名称：消息 |无 | `mod.SetScoreboardColumnNames(...);` | `mod.SetScoreboardColumnNames(...);` |
| `SetScoreboardColumnWidths` | `SetScoreboardColumnWidths` |设置自定义记分板的列宽比例。 5种霸主。 |列 1 宽度：数字，列 2 宽度：数字，列 3 宽度：数字，列 4 宽度：数字，列 5 宽度：数字 |无 | `mod.SetScoreboardColumnWidths(...);` | `mod.SetScoreboardColumnWidths(...);` |
| `SetScoreboardHeader` | `SetScoreboardHeader` |设置记分板左上角显示的标题名称。 2种类型的霸主。 | team1Name: 留言, team2Name: 留言 |无 | `mod.SetScoreboardHeader(...);` | `mod.SetScoreboardHeader(...);` |
| `SetScoreboardPlayerValues` | `SetScoreboardPlayerValues` |在自定义记分牌上为每个玩家设置最多 5 列的列值。 5种霸主。 |玩家：玩家，column1Value：数字，column2Value：数字，column3Value：数字，column4Value：数字，column5Value：数字 |无 | `mod.SetScoreboardPlayerValues(...);` | `mod.SetScoreboardPlayerValues(...);` |
| `SetScoreboardSorting` | `SetScoreboardSorting` |设置自定义记分板排序列和倒序规范。 2种类型的霸主。 | sortingColumn：数字，反向排序：boolean |无 | `mod.SetScoreboardSorting(...);` | `mod.SetScoreboardSorting(...);` |
| `SetScoreboardType` | `SetScoreboardType` |更改要使用的记分板类型。 |记分板类型： 记分板类型 |无 | `mod.SetScoreboardType(...);` | `mod.SetScoreboardType(...);` |
| `AddUIButton` | `AddUIButton` |创建一个 UI 按钮小部件。 6种霸主。 |名称：字符串，位置：向量，大小：向量，锚点：UIAnchor |无 | `mod.AddUIButton(...);` | `mod.AddUIButton(...);` |
| `AddUIContainer` | `AddUIContainer` |创建一个 UI 容器小部件。 6种霸主。 |名称：字符串，位置：向量，大小：向量，锚点：UIAnchor |无 | `mod.AddUIContainer(...);` | `mod.AddUIContainer(...);` |
| `AddUIGadgetImage` | `AddUIGadgetImage` |创建一个显示小工具图像的 UI 图像小部件。 2种类型的霸主。 |名称：字符串，位置：矢量，大小：矢量，锚点：UIAnchor，小工具：小工具，父级：UIWidget |无 | `mod.AddUIGadgetImage(...);` | `mod.AddUIGadgetImage(...);` |
| `AddUIImage` | `AddUIImage` |创建一个 UI 图像小部件。 6种霸主。 |名称：字符串，位置：向量，大小：向量，锚点：UIAnchor，图像类型：UIImageType |无 | `mod.AddUIImage(...);` | `mod.AddUIImage(...);` |
| `AddUIText` | `AddUIText` |创建一个 UI 文本小部件。 6种霸主。 |名称：字符串，位置：向量，大小：向量，锚点：UIAnchor，消息：消息 |无 | `mod.AddUIText("timer", pos, size, mod.UIAnchor.Top, mod.Message(mod.stringkeys.timerZero));` | `mod.AddUIText("timer", pos, size, mod.UIAnchor.Top, mod.Message(mod.stringkeys.timerZero));` |
| `AddUIWeaponImage` | `AddUIWeaponImage` |创建一个显示武器图像的 UI 图像小部件。 4种类型的霸主。 |名称：字符串，位置：矢量，大小：矢量，锚点：UIAnchor，武器：武器，父级：UIWidget |无 | `mod.AddUIWeaponImage(...);` | `mod.AddUIWeaponImage(...);` |
| `DeleteAllUIWidgets` | `DeleteAllUIWidgets` |删除所有 UI 小部件。 |无 |无 | `mod.DeleteAllUIWidgets(...);` | `mod.DeleteAllUIWidgets(...);` |
| `DeleteUIWidget` | `DeleteUIWidget` |删除指定的 UI 小部件。 |小部件：UIWidget |无 | `mod.DeleteUIWidget(...);` | `mod.DeleteUIWidget(...);` |
| `EnableUIButtonEvent` | `EnableUIButtonEvent` |设置UI Button Widget是否发送按钮事件。 |小部件：UIWidget，按钮事件：UIButtonEvent，启用：布尔值 |无 | `mod.EnableUIButtonEvent(...);` | `mod.EnableUIButtonEvent(...);` |
| `EnableUIInputMode` | `EnableUIInputMode` |启用或禁用允许您操作 UI 按钮的输入模式。您还可以指定目标。 2种类型的霸主。 |启用：布尔值|无 | `mod.EnableUIInputMode(...);` | `mod.EnableUIInputMode(...);` |
| `SetUIButtonAlphaBase` | `SetUIButtonAlphaBase` |更改 UI Button 的正常 alpha 值。 |小部件：UIWidget，值：数字 |无 | `mod.SetUIButtonAlphaBase(...);` | `mod.SetUIButtonAlphaBase(...);` |
| `SetUIButtonAlphaDisabled` | `SetUIButtonAlphaDisabled` |当 UI 按钮禁用时更改 alpha 值。 |小部件：UIWidget，值：数字 |无 | `mod.SetUIButtonAlphaDisabled(...);` | `mod.SetUIButtonAlphaDisabled(...);` |
| `SetUIButtonAlphaFocused` | `SetUIButtonAlphaFocused` |当 UI 按钮获得焦点时更改 alpha 值。 |小部件：UIWidget，值：数字 |无 | `mod.SetUIButtonAlphaFocused(...);` | `mod.SetUIButtonAlphaFocused(...);` |
| `SetUIButtonAlphaHover` | `SetUIButtonAlphaHover` |更改悬停时 UI 按钮的 alpha 值。 |小部件：UIWidget，值：数字 |无 | `mod.SetUIButtonAlphaHover(...);` | `mod.SetUIButtonAlphaHover(...);` |
| `SetUIButtonAlphaPressed` | `SetUIButtonAlphaPressed` |按下 UI 按钮时更改 alpha 值。 |小部件：UIWidget，值：数字 |无 | `mod.SetUIButtonAlphaPressed(...);` | `mod.SetUIButtonAlphaPressed(...);` |
| `SetUIButtonColorBase` | `SetUIButtonColorBase` |更改 UI Button 的正常颜色。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIButtonColorBase(...);` | `mod.SetUIButtonColorBase(...);` |
| `SetUIButtonColorDisabled` | `SetUIButtonColorDisabled` |禁用时更改 UI 按钮的颜色。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIButtonColorDisabled(...);` | `mod.SetUIButtonColorDisabled(...);` |
| `SetUIButtonColorFocused` | `SetUIButtonColorFocused` |更改 UI 按钮聚焦时的颜色。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIButtonColorFocused(...);` | `mod.SetUIButtonColorFocused(...);` |
| `SetUIButtonColorHover` | `SetUIButtonColorHover` |更改 UI 按钮的悬停颜色。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIButtonColorHover(...);` | `mod.SetUIButtonColorHover(...);` |
| `SetUIButtonColorPressed` | `SetUIButtonColorPressed` |按下时更改 UI 按钮的颜色。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIButtonColorPressed(...);` | `mod.SetUIButtonColorPressed(...);` |
| `SetUIButtonEnabled` | `SetUIButtonEnabled` |启用或禁用 UI 按钮。 |小部件：UIWidget，启用：布尔值 |无 | `mod.SetUIButtonEnabled(...);` | `mod.SetUIButtonEnabled(...);` |
| `SetUIImageAlpha` | `SetUIImageAlpha` |更改 UI 图像的 alpha 值。 |小部件：UIWidget，值：数字 |无 | `mod.SetUIImageAlpha(...);` | `mod.SetUIImageAlpha(...);` |
| `SetUIImageColor` | `SetUIImageColor` |更改 UI 图像的颜色。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIImageColor(...);` | `mod.SetUIImageColor(...);` |
| `SetUIImageType` | `SetUIImageType` |更改 UI Image 的图像类型。 |小部件：UIWidget，图像类型：UIImageType |无 | `mod.SetUIImageType(...);` | `mod.SetUIImageType(...);` |
| `SetUITextAlpha` | `SetUITextAlpha` |更改 UI 文本的 alpha 值。 |小部件：UIWidget，值：数字 |无 | `mod.SetUITextAlpha(...);` | `mod.SetUITextAlpha(...);` |
| `SetUITextAnchor` | `SetUITextAnchor` |更改 UI 文本中的字符锚点。 |小部件：UIWidget，锚点：UIAnchor |无 | `mod.SetUITextAnchor(...);` | `mod.SetUITextAnchor(...);` |
| `SetUITextColor` | `SetUITextColor` |更改 UI 文本文本颜色。 |小部件：UIWidget，值：向量 |无 | `mod.SetUITextColor(...);` | `mod.SetUITextColor(...);` |
| `SetUITextLabel` | `SetUITextLabel` |更改 UI 文本中显示的消息。显示文本可以在 `Strings.json` 注册后参考。 |小部件：UIWidget，消息：消息 |无 | `mod.SetUITextLabel(widget, mod.Message(mod.stringkeys.updated));` |
| `SetUITextSize` | `SetUITextSize` |更改 UI 文本的字体大小。 |小部件：UIWidget，值：数字 |无 | `mod.SetUITextSize(...);` | `mod.SetUITextSize(...);` |
| `SetUIWidgetAnchor` | `SetUIWidgetAnchor` |更改 UI 小部件的锚点位置。 |小部件：UIWidget，锚点：UIAnchor |无 | `mod.SetUIWidgetAnchor(...);` | `mod.SetUIWidgetAnchor(...);` |
| `SetUIWidgetBgAlpha` | `SetUIWidgetBgAlpha` |更改 UI Widget 背景的 Alpha 值。 |小部件：UIWidget，值：数字 |无 | `mod.SetUIWidgetBgAlpha(...);` | `mod.SetUIWidgetBgAlpha(...);` |
| `SetUIWidgetBgColor` | `SetUIWidgetBgColor` |更改 UI 小部件背景颜色。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIWidgetBgColor(...);` | `mod.SetUIWidgetBgColor(...);` |
| `SetUIWidgetBgFill` | `SetUIWidgetBgFill` |更改UI Widget背景的绘制方法。 |小部件：UIWidget，bgFill：UIBgFill |无 | `mod.SetUIWidgetBgFill(...);` | `mod.SetUIWidgetBgFill(...);` |
| `SetUIWidgetDepth` | `SetUIWidgetDepth` |更改 UI 小部件的绘制顺序。 |小部件：UIWidget，深度：UIDepth |无 | `mod.SetUIWidgetDepth(...);` | `mod.SetUIWidgetDepth(...);` |
| `SetUIWidgetName` | `SetUIWidgetName` |更改 UI 小部件名称。 |小部件：UIWidget，名称：字符串 |无 | `mod.SetUIWidgetName(...);` | `mod.SetUIWidgetName(...);` |
| `SetUIWidgetPadding` | `SetUIWidgetPadding` |更改 UI 小部件的填充。 |小部件：UIWidget，值：数字 |无 | `mod.SetUIWidgetPadding(...);` | `mod.SetUIWidgetPadding(...);` |
| `SetUIWidgetParent` | `SetUIWidgetParent` |更改 UI 小部件的父小部件。 |小部件：UIWidget，父级：UIWidget |无 | `mod.SetUIWidgetParent(...);` | `mod.SetUIWidgetParent(...);` |
| `SetUIWidgetPosition` | `SetUIWidgetPosition` |更改 UI 小部件的位置。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIWidgetPosition(...);` | `mod.SetUIWidgetPosition(...);` |
| `SetUIWidgetSize` | `SetUIWidgetSize` |更改 UI 小部件的大小。 |小部件：UIWidget，值：向量 |无 | `mod.SetUIWidgetSize(...);` | `mod.SetUIWidgetSize(...);` |
| `SetUIWidgetVisible` | `SetUIWidgetVisible` |显示/隐藏 UI 小部件。 |小部件：UIWidget，可见：布尔值 |无 | `mod.SetUIWidgetVisible(widget, false);` | `mod.SetUIWidgetVisible(widget, false);` |
| `FindUIWidgetWithName` | `FindUIWidgetWithName` |查找并检索与名称匹配的 UI 小部件。 2种类型的霸主。 |名称：字符串，搜索根：UIWidget | `UIWidget` | `UIWidget` | `const value = mod.FindUIWidgetWithName(...);` |
| `GetUIButtonAlphaBase` | `GetUIButtonAlphaBase` |从数字或目标获取 UIButtonAlphaBase。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaBase(...);` |
| `GetUIButtonAlphaDisabled` | `GetUIButtonAlphaDisabled` |从数字或目标获取 UIButtonAlphaDisabled。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaDisabled(...);` |
| `GetUIButtonAlphaFocused` | `GetUIButtonAlphaFocused` |从数字或目标获取 UIButtonAlphaFocused。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaFocused(...);` |
| `GetUIButtonAlphaHover` | `GetUIButtonAlphaHover` |从数字或目标获取 UIButtonAlphaHover。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaHover(...);` |
| `GetUIButtonAlphaPressed` | `GetUIButtonAlphaPressed` |从数字或目标获取 UIButtonAlphaPressed。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUIButtonAlphaPressed(...);` |
| `GetUIButtonColorBase` | `GetUIButtonColorBase` |从数字或目标获取 UIButtonColorBase。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorBase(...);` |
| `GetUIButtonColorDisabled` | `GetUIButtonColorDisabled` |从数字或目标获取 UIButtonColorDisabled。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorDisabled(...);` |
| `GetUIButtonColorFocused` | `GetUIButtonColorFocused` |从数字或目标获取 UIButtonColorFocused。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorFocused(...);` |
| `GetUIButtonColorHover` | `GetUIButtonColorHover` |从数字或目标获取 UIButtonColorHover。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorHover(...);` |
| `GetUIButtonColorPressed` | `GetUIButtonColorPressed` |从数字或目标获取 UIButtonColorPressed。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIButtonColorPressed(...);` |
| `GetUIButtonEnabled` | `GetUIButtonEnabled` |从数字或目标获取 UIButtonEnabled。 |小部件：UIWidget | `boolean` | `boolean` | `const value = mod.GetUIButtonEnabled(...);` |
| `GetUIImageAlpha` | `GetUIImageAlpha` |从数字或目标获取 UIImageAlpha。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUIImageAlpha(...);` |
| `GetUIImageColor` | `GetUIImageColor` |从数字或目标获取 UIImageColor。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIImageColor(...);` |
| `GetUIImageType` | `GetUIImageType` |从数字或目标获取 UIImageType。 |小部件：UIWidget | `UIImageType` | `UIImageType` | `const value = mod.GetUIImageType(...);` |
| `GetUIRoot` | `GetUIRoot` |从数字或目标获取 UIRoot。 |无 | `UIWidget` | `UIWidget` | `const value = mod.GetUIRoot(...);` |
| `GetUITextAlpha` | `GetUITextAlpha` |从数字或目标获取 UITextAlpha。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUITextAlpha(...);` |
| `GetUITextAnchor` | `GetUITextAnchor` |从数字或目标获取 UITextAnchor。 |小部件：UIWidget | `UIAnchor` | `UIAnchor` | `const value = mod.GetUITextAnchor(...);` |
| `GetUITextColor` | `GetUITextColor` |从数字或目标获取 UITextColor。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUITextColor(...);` |
| `GetUITextSize` | `GetUITextSize` |从数字或目标获取 UITextSize。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUITextSize(...);` |
| `GetUIWidgetAnchor` | `GetUIWidgetAnchor` |从数字或目标获取 UIWidgetAnchor。 |小部件：UIWidget | `UIAnchor` | `UIAnchor` | `const value = mod.GetUIWidgetAnchor(...);` |
| `GetUIWidgetBgAlpha` | `GetUIWidgetBgAlpha` |从数字或目标获取 UIWidgetBgAlpha。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUIWidgetBgAlpha(...);` |
| `GetUIWidgetBgColor` | `GetUIWidgetBgColor` |从数字或目标获取 UIWidgetBgColor。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIWidgetBgColor(...);` |
| `GetUIWidgetBgFill` | `GetUIWidgetBgFill` |从数字或目标获取 UIWidgetBgFill。 |小部件：UIWidget | `UIBgFill` | `UIBgFill` | `const value = mod.GetUIWidgetBgFill(...);` |
| `GetUIWidgetDepth` | `GetUIWidgetDepth` |从数字或目标获取 UIWidgetDepth。 |小部件：UIWidget | `UIDepth` | `UIDepth` | `const value = mod.GetUIWidgetDepth(...);` |
| `GetUIWidgetName` | `GetUIWidgetName` |从数字或目标获取 UIWidgetName。 |小部件：UIWidget | `string` | `string` | `const value = mod.GetUIWidgetName(...);` |
| `GetUIWidgetPadding` | `GetUIWidgetPadding` |从数字或目标获取 UIWidgetPadding。 |小部件：UIWidget | `number` | `number` | `const value = mod.GetUIWidgetPadding(...);` |
| `GetUIWidgetParent` | `GetUIWidgetParent` |从数字或目标获取 UIWidgetParent。 |小部件：UIWidget | `UIWidget` | `UIWidget` | `const value = mod.GetUIWidgetParent(...);` |
| `GetUIWidgetPosition` | `GetUIWidgetPosition` |从数字或目标获取 UIWidgetPosition。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIWidgetPosition(...);` |
| `GetUIWidgetSize` | `GetUIWidgetSize` |从数字或目标获取 UIWidgetSize。 |小部件：UIWidget | `Vector` | `Vector` | `const value = mod.GetUIWidgetSize(...);` |
| `GetUIWidgetVisible` | `GetUIWidgetVisible` |从数字或目标获取 UIWidgetVisible。 |小部件：UIWidget | `boolean` | `boolean` | `const value = mod.GetUIWidgetVisible(...);` |
| `HasUIWidgetWithName` | `HasUIWidgetWithName` |确定是否存在与名称匹配的 UI 小部件。 2种类型的霸主。 |名称：字符串，搜索根：UIWidget | `boolean` | `boolean` | `const value = mod.HasUIWidgetWithName(...);` |

## 球员/球队参考

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `SetTeam` | `SetTeam` |更改指定玩家的队伍。 |球员： 球员，球队： 球队 |无 | `mod.SetTeam(...);` | `mod.SetTeam(...);` |
| `IsFaction` | `IsFaction` |判断指定队伍是否使用指定阵营。 |团队： 团队，派系： 派系 | `boolean` | `boolean` | `const value = mod.IsFaction(...);` |
| `AllPlayers` | `AllPlayers` |获取游戏中所有玩家的数组。 |无 | `Array` | `Array` | `const players = mod.AllPlayers();` |
| `ClosestPlayerTo` | `ClosestPlayerTo` |获取距离指定坐标最近的活着的玩家。您可以按团队缩小范围。 2种类型的霸主。 |矢量：矢量| `Player` | `Player` | `const value = mod.ClosestPlayerTo(...);` |
| `FarthestPlayerFrom` | `FarthestPlayerFrom` |获取距指定坐标最远的幸存玩家。您可以按团队缩小范围。 2种类型的霸主。 |矢量：矢量| `Player` | `Player` | `const value = mod.FarthestPlayerFrom(...);` |
| `GetPlayerDeaths` | `GetPlayerDeaths` |获取指定玩家的死亡人数。 |玩家： 玩家 | `number` | `number` | `const value = mod.GetPlayerDeaths(...);` |
| `GetPlayerKills` | `GetPlayerKills` |获取指定玩家的击杀数。 |玩家： 玩家 | `number` | `number` | `const value = mod.GetPlayerKills(...);` |
| `GetSquad` | `GetSquad` |获取指定球员或球队/小队号码对应的球队。 2种类型的霸主。 |玩家： 玩家 | `Squad` | `Squad` | `const value = mod.GetSquad(...);` |
| `GetSquadName` | `GetSquadName` |获取字符串形式的指定小队的名称。 | arg0：小队 | `string` | `string` | `const value = mod.GetSquadName(...);` |
| `GetTeam` | `GetTeam` |获取指定玩家所在的队伍或者指定号码对应的队伍。 2种类型的霸主。 |玩家： 玩家 | `Team` | `Team` | `const team = mod.GetTeam(eventPlayer);` |
| `IsPlayerValid` | `IsPlayerValid` |确定指定的 Player 引用是否有效。 |玩家： 玩家 | `boolean` | `boolean` | `const value = mod.IsPlayerValid(...);` |
| `IsSquadLeader` | `IsSquadLeader` |判断指定玩家是否为班长。 |玩家： 玩家 | `boolean` | `boolean` | `const value = mod.IsSquadLeader(...);` |

## 数组

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `AppendToArray` | `AppendToArray` |返回一个副本，并将值添加到数组末尾。数组是串联的。 |数组：数组，值：任意 | `Array` | `Array` | `const value = mod.AppendToArray(...);` |
| `ArraySlice` | `ArraySlice` |仅返回数组中指定索引范围的副本。 |数组：数组，起始索引：数字，结束索引：数字 | `Array` | `Array` | `const value = mod.ArraySlice(...);` |
| `CountOf` | `CountOf` |获取数组中的元素数量。 |数组：数组 | `number` | `number` | `const value = mod.CountOf(...);` |
| `EmptyArray` | `EmptyArray` |创建一个空数组。 |无 | `Array` | `Array` | `const value = mod.EmptyArray(...);` |
| `FirstOf` | `FirstOf` |获取数组的第一个值。 |数组：数组 | `Any` | `Any` | `const value = mod.FirstOf(...);` |
| `LastOf` | `LastOf` |获取数组的最后一个值。 |数组：数组 | `Any` | `Any` | `const value = mod.LastOf(...);` |
| `RandomValueInArray` | `RandomValueInArray` |从数组中获取一个随机值。 |数组：数组 | `Any` | `Any` | `const value = mod.RandomValueInArray(...);` |
| `RandomizedArray` | `RandomizedArray` |返回数组的随机重新排列的副本。 |数组：数组 | `Array` | `Array` | `const value = mod.RandomizedArray(...);` |
| `SortedArray` | `SortedArray` |返回按指定数字条件按升序排序的数组的副本。 |数组：数组，索引：数字 | `Array` | `Array` | `const value = mod.SortedArray(...);` |
| `ValueInArray` | `ValueInArray` |获取数组指定索引处的值。 |数组：数组，索引：数字 | `Any` | `Any` | `const value = mod.ValueInArray(...);` |

## 获取对象ID

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `GetWaypointPath` | `GetWaypointPath` |从数字或目标获取 WaypointPath。 | waypointPathNumber: 数字 | `WaypointPath` | `WaypointPath` | `const value = mod.GetWaypointPath(...);` |
| `GetSFX` | `GetSFX` |从号码或目标获取 SFX。 |数量： 数量 | `SFX` | `SFX` | `const value = mod.GetSFX(...);` |
| `GetVO` | `GetVO` |从号码或目标获取 VO。 |数量： 数量 | `VO` | `VO` | `const value = mod.GetVO(...);` |
| `GetVFX` | `GetVFX` |从数字或目标获取视觉特效。 | vfxNumber: 数字 | `VFX` | `VFX` | `const value = mod.GetVFX(...);` |
| `GetSpawnPoint` | `GetSpawnPoint` |从数字或目标获取 SpawnPoint。 |数量： 数量 | `SpawnPoint` | `SpawnPoint` | `const value = mod.GetSpawnPoint(...);` |
| `GetSpawner` | `GetSpawner` |从号码或目标中获取 Spawner。 |数量： 数量 | `Spawner` | `Spawner` | `const value = mod.GetSpawner(...);` |
| `GetVL7Cloud` | `GetVL7Cloud` |从号码或目标获取 VL7Cloud。 | vl7CloudId：编号 | `VL7Cloud` | `VL7Cloud` | `const value = mod.GetVL7Cloud(...);` |

## 逻辑/字符串/扩展

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `JsAction` | `JsAction` |在 JavaScript 端调用独特的操作。用于在模板侧延伸。 | actionName：字符串，actionArg0：任意，actionArg1：任意 |无 | `mod.JsAction("MyAction", eventPlayer, 0);` | `mod.JsAction("MyAction", eventPlayer, 0);` |
| `And` | `And` |确定两个真值是否都为真。 | boolean0：布尔值，boolean1：布尔值 | `boolean` | `boolean` | `const value = mod.And(...);` |
| `Equals` | `Equals` |确定两个值是否相等。 |左：任意，右：任意 | `boolean` | `boolean` | `const value = mod.Equals(...);` |
| `GreaterThan` | `GreaterThan` |判断左边的数是否大于右边的数。 |数字 0：数字，数字 1：数字 | `boolean` | `boolean` | `const value = mod.GreaterThan(...);` |
| `GreaterThanEqualTo` | `GreaterThanEqualTo` |判断左边的数是否大于或等于右边的数。 |左：数字，右：数字 | `boolean` | `boolean` | `const value = mod.GreaterThanEqualTo(...);` |
| `IfThenElse` | `IfThenElse` |一个三元运算，如果条件为 true，则返回第一个值；如果条件为 false，则返回第二个值。 |条件：布尔值，trueValue：任意，falseValue：任意 | `Any` | `Any` | `const value = mod.IfThenElse(...);` |
| `IsType` | `IsType` |判断值是否与指定类型匹配。 |值：任意，类型：类型 | `boolean` | `boolean` | `const value = mod.IsType(...);` |
| `JsValue` | `JsValue` |在 JavaScript 端调用唯一值函数。使用Portal端的返回值。 | valueName：字符串，valueArg0：任意，valueArg1：任意 | `Any` | `Any` | `const value = mod.JsValue("MyValue", eventPlayer, 0);` |
| `LessThan` | `LessThan` |判断左边的数是否小于右边的数。 |左：数字，右：数字 | `boolean` | `boolean` | `const value = mod.LessThan(...);` |
| `LessThanEqualTo` | `LessThanEqualTo` |判断左边的数是否小于或等于右边的数。 |左：数字，右：数字 | `boolean` | `boolean` | `const value = mod.LessThanEqualTo(...);` |
| `Not` | `Not` |反转真值。 |布尔值：布尔值| `boolean` | `boolean` | `const value = mod.Not(...);` |
| `NotEqualTo` | `NotEqualTo` |确定两个值是否不相等。 |左：任意，右：任意 | `boolean` | `boolean` | `const value = mod.NotEqualTo(...);` |
| `Or` | `Or` |确定两个真值之一是否为真。 | boolean0：布尔值，boolean1：布尔值 | `boolean` | `boolean` | `const value = mod.Or(...);` |
| `Xor` | `Xor` |确定两个真值是否不同。 | boolean0：布尔值，boolean1：布尔值 | `boolean` | `boolean` | `const value = mod.Xor(...);` |
| `Concat` | `Concat` |连接两个字符串。 |字符串0：字符串，字符串1：字符串| `string` | `string` | `const value = mod.Concat(...);` |

## 数值/向量/坐标

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `GetObjId` | `GetObjId` |获取放置的项目和对象的 ObjId。用于检查 Godot 放置和代码引用。 |对象：mod.Object | `number` | `number` | `const id = mod.GetObjId(eventInteractPoint);` |
| `IsCurrentMap` | `IsCurrentMap` |判断当前地图是否与指定地图匹配。 |地图： 地图 | `boolean` | `boolean` | `const value = mod.IsCurrentMap(...);` |
| `AbsoluteValue` | `AbsoluteValue` |获取数字的绝对值。 |数量： 数量 | `number` | `number` | `const value = mod.AbsoluteValue(...);` |
| `Add` | `Add` |添加数字或向量。 2种类型的霸主。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.Add(...);` |
| `AngleBetweenVectors` | `AngleBetweenVectors` |获取两个向量之间的角度（以度为单位）。 |矢量0：矢量，矢量1：矢量| `number` | `number` | `const value = mod.AngleBetweenVectors(...);` |
| `AngleDifference` | `AngleDifference` |获取两个角度之间的差值（以度为单位）。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.AngleDifference(...);` |
| `ArccosineInDegrees` | `ArccosineInDegrees` |获取数字的反余弦（以度为单位）。 |数量： 数量 | `number` | `number` | `const value = mod.ArccosineInDegrees(...);` |
| `ArccosineInRadians` | `ArccosineInRadians` |获取以弧度为单位的数字的反余弦。 |数量： 数量 | `number` | `number` | `const value = mod.ArccosineInRadians(...);` |
| `ArcsineInDegrees` | `ArcsineInDegrees` |获取以度为单位的数字的反正弦。 |数量： 数量 | `number` | `number` | `const value = mod.ArcsineInDegrees(...);` |
| `ArcsineInRadians` | `ArcsineInRadians` |获取以弧度为单位的数字的反正弦。 |数量： 数量 | `number` | `number` | `const value = mod.ArcsineInRadians(...);` |
| `ArctangentInDegrees` | `ArctangentInDegrees` |获取以度为单位的数字的反正切值。 |数量： 数量 | `number` | `number` | `const value = mod.ArctangentInDegrees(...);` |
| `ArctangentInRadians` | `ArctangentInRadians` |获取以弧度为单位的数字的反正切值。 |数量： 数量 | `number` | `number` | `const value = mod.ArctangentInRadians(...);` |
| `Ceiling` | `Ceiling` |通过向上舍入小数位将数字转换为整数。 |数量： 数量 | `number` | `number` | `const value = mod.Ceiling(...);` |
| `CosineFromDegrees` | `CosineFromDegrees` |从度角获取余弦。 |数量： 数量 | `number` | `number` | `const value = mod.CosineFromDegrees(...);` |
| `CosineFromRadians` | `CosineFromRadians` |从弧度角获取余弦。 |数量： 数量 | `number` | `number` | `const value = mod.CosineFromRadians(...);` |
| `CreateTransform` | `CreateTransform` |从位置和旋转向量创建变换。 |位置：向量，旋转：向量| `Transform` | `Transform` | `mod.CreateTransform(pos, rot);` |
| `CreateVector` | `CreateVector` |从 X、Y、Z 三个值创建一个向量。X 为左和右，Y 为上和下，Z 为前后。 |数字 0：数字，数字 1：数字，数字 2：数字 | `Vector` | `Vector` | `mod.CreateVector(0, 2, 0);` |
| `CrossProduct` | `CrossProduct` |获取两个向量的叉积。如果它们平行，则它变成零向量。 |矢量0：矢量，矢量1：矢量| `Vector` | `Vector` | `const value = mod.CrossProduct(...);` |
| `DegreesToRadians` | `DegreesToRadians` |将度数转换为弧度。 |数量： 数量 | `number` | `number` | `const value = mod.DegreesToRadians(...);` |
| `DirectionFromAngles` | `DirectionFromAngles` |从偏航角和俯仰角获取方向向量。 |数字 0：数字，数字 1：数字 | `Vector` | `Vector` | `const value = mod.DirectionFromAngles(...);` |
| `DirectionTowards` | `DirectionTowards` |获取从起点到终点的归一化方向向量。 |矢量0：矢量，矢量1：矢量| `Vector` | `Vector` | `const value = mod.DirectionTowards(...);` |
| `DistanceBetween` | `DistanceBetween` |获取两个坐标之间的距离。 |矢量0：矢量，矢量1：矢量| `number` | `number` | `const value = mod.DistanceBetween(...);` |
| `Divide` | `Divide` |通过除以数字或将 Vector 除以数字来返回缩放后的 Vector。 2种类型的霸主。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.Divide(...);` |
| `DotProduct` | `DotProduct` |获取两个向量的内积。如果它们正交，则为 0。矢量0：矢量，矢量1：矢量| `number` | `number` | `const value = mod.DotProduct(...);` |
| `Floor` | `Floor` |通过向下舍入小数位将数字转换为整数。 |数量： 数量 | `number` | `number` | `const value = mod.Floor(...);` |
| `Max` | `Max` |返回两个数字中较大的一个。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.Max(...);` |
| `Modulo` | `Modulo` |返回左边的数字除以右边的数字所得的余数。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.Modulo(...);` |
| `Multiply` | `Multiply` |将数字相乘或通过将向量乘以数字来返回缩放后的向量。 2种类型的霸主。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.Multiply(...);` |
| `Normalize` | `Normalize` |将向量归一化为长度为 1 的单位向量。矢量：矢量| `Vector` | `Vector` | `const value = mod.Normalize(...);` |
| `Pi` | `Pi` |返回 pi 的近似值。 |无 | `number` | `number` | `const value = mod.Pi(...);` |
| `RadiansToDegrees` | `RadiansToDegrees` |将弧度转换为度数。 |数量： 数量 | `number` | `number` | `const value = mod.RadiansToDegrees(...);` |
| `RaiseToPower` | `RaiseToPower` |将左侧的数字求右侧数字的幂。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.RaiseToPower(...);` |
| `RandomReal` | `RandomReal` |返回从指定最小值到最大值的随机实数。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.RandomReal(...);` |
| `RoundToInteger` | `RoundToInteger` |将数字四舍五入为整数。 |数量： 数量 | `number` | `number` | `const value = mod.RoundToInteger(...);` |
| `SineFromDegrees` | `SineFromDegrees` |从度角获取正弦值。 |数量： 数量 | `number` | `number` | `const value = mod.SineFromDegrees(...);` |
| `SineFromRadians` | `SineFromRadians` |从弧度角获取正弦值。 |数量： 数量 | `number` | `number` | `const value = mod.SineFromRadians(...);` |
| `SquareRoot` | `SquareRoot` |求一个数的平方根。 |数量： 数量 | `number` | `number` | `const value = mod.SquareRoot(...);` |
| `Subtract` | `Subtract` |减去数字或向量。 2种类型的霸主。 |数字 0：数字，数字 1：数字 | `number` | `number` | `const value = mod.Subtract(...);` |
| `TangentFromDegrees` | `TangentFromDegrees` |从度角获取切线。 |数量： 数量 | `number` | `number` | `const value = mod.TangentFromDegrees(...);` |
| `TangentFromRadians` | `TangentFromRadians` |从弧度角获取切线。 |数量： 数量 | `number` | `number` | `const value = mod.TangentFromRadians(...);` |
| `BackwardVector` | `BackwardVector` |获取向后向量 `(0, 0, 1)`。 |无 | `Vector` | `const value = mod.BackwardVector(...);` | `const value = mod.BackwardVector(...);` |
| `DownVector` | `DownVector` |获取向下的 Vector `(0, -1, 0)`。 |无 | `Vector` | `const value = mod.DownVector(...);` | `const value = mod.DownVector(...);` |
| `ForwardVector` | `ForwardVector` |获取前向向量 `(0, 0, -1)`。 |无 | `Vector` | `const value = mod.ForwardVector(...);` | `const value = mod.ForwardVector(...);` |
| `LeftVector` | `LeftVector` |获取左侧向量 `(-1, 0, 0)`。 |无 | `Vector` | `const value = mod.LeftVector(...);` | `const value = mod.LeftVector(...);` |
| `LocalPositionOf` | `LocalPositionOf` |根据指定玩家将世界坐标转换为本地坐标。 |矢量：矢量，玩家：玩家 | `Vector` | `Vector` | `const value = mod.LocalPositionOf(...);` |
| `LocalVectorOf` | `LocalVectorOf` |根据指定玩家将世界向量转换为本地向量。 |矢量：矢量，玩家：玩家 | `Vector` | `Vector` | `const value = mod.LocalVectorOf(...);` |
| `RightVector` | `RightVector` |获取正确的向量 `(1, 0, 0)`。 |无 | `Vector` | `const value = mod.RightVector(...);` | `const value = mod.RightVector(...);` |
| `UpVector` | `UpVector` |获取向上的 Vector `(0, 1, 0)`。 |无 | `Vector` | `const value = mod.UpVector(...);` | `const value = mod.UpVector(...);` |
| `VectorTowards` | `VectorTowards` |获取从起点到终点的位移向量。 |矢量0：矢量，矢量1：矢量| `Vector` | `Vector` | `const value = mod.VectorTowards(...);` |
| `WorldPositionOf` | `WorldPositionOf` |将基于指定玩家的本地坐标转换为世界坐标。 |矢量：矢量，玩家：玩家 | `Vector` | `Vector` | `const value = mod.WorldPositionOf(...);` |
| `WorldVectorOf` | `WorldVectorOf` |将基于指定玩家的本地向量转换为世界向量。 |矢量：矢量，玩家：玩家 | `Vector` | `Vector` | `const value = mod.WorldVectorOf(...);` |
| `XComponentOf` | `XComponentOf` |获取向量的 X 分量。 |矢量：矢量| `number` | `number` | `const value = mod.XComponentOf(...);` |
| `YComponentOf` | `YComponentOf` |获取向量的 Y 分量。 |矢量：矢量| `number` | `number` | `const value = mod.YComponentOf(...);` |
| `ZComponentOf` | `ZComponentOf` |获取向量的 Z 分量。 |矢量：矢量| `number` | `number` | `const value = mod.ZComponentOf(...);` |
| `Message` | `Message` |创建要传递到通知和 UI 的消息。在 `Strings.json` 中注册显示语句并传递 `mod.stringkeys.xxx`。 `{}` 包含其他参数。 4种类型的霸主。 |味精：字符串\|数字\|玩家，msgArg0：字符串\|数字\|玩家，msgArg1：字符串\|数字\|玩家，msgArg2：字符串\|数字\|玩家| `Message` | `Message` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` |

# 常用的类型以及如何获取它们

|模具|主要制作和服用方式|用途 |
| --- | --- | --- |
| `Player` | `Player` |事件参数，`AllPlayers()`，`ClosestPlayerTo()` |个人玩家处理、通知、装备、健康、移动 |
| `Team` | `Team` | `GetTeam(player)`，`GetTeam(1)` | `GetTeam(player)`基于团队的胜负、通知、分数和隶属关系变化 |
| `Vector` | `Vector` | `CreateVector(x, y, z)`，`GetObjectPosition(obj)` | `CreateVector(x, y, z)`坐标、方向、颜色、UI位置等 |
| `Message` | `Message` | `Message(mod.stringkeys.textKey)` | `Message(mod.stringkeys.textKey)` |通知、WorldIcon 文本、记分板标题 |
| `UIWidget` | `UIWidget` | `AddUIText()`、`AddUIButton()`、`FindUIWidgetWithName()` | HUD、按钮、图像、容器 |
| `Variable` | `Variable` | `GlobalVariable(index)`，`ObjectVariable(obj, index)` | `GlobalVariable(index)`阶段、计数器和状态保存 |
| `mod.Object` | `mod.Object` |共享类型，例如 `Player`、`Vehicle`、`SpatialObject` |移动、获取 Transform、检查 ObjId |

# 实施注意事项

- `OnPlayerLeaveGame(eventNumber: number)` 接收号码而不是 `Player`。玩家引用很可能在离开后变得无效，因此在加入变量时保存必要的信息。
- 返回值中不返回 `RayCast()` 的结果。通过 `OnRayCastHit` 或 `OnRayCastMissed` 接收。
- `DisablePlayerJoin()` 在 SDK 注释中据说“无法返回”。当公开使用它时，只有在真正的截止日期时才使用它。
- 如果`AddUI...`系列重写太多，就会变得沉重。基本上，首先创建它并在 `SetUIWidgetVisible`、`SetUITextLabel`、`SetUIWidgetPosition` 更新它。
- 避免在 `Ongoing...` 系列中重复运行 `AllPlayers()` 或 `AllVehicles()` 。如有必要，可减少到每隔几秒一次。
- `GetObjId()` 是最重要的调试函数，用于检查放置在 Godot 中的对象与 TypeScript 端的引用是否匹配。

# 最小模板

要在屏幕上显示的字符首先在 `Strings.json` 中注册。

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
