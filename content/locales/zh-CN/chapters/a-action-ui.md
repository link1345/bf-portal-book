---
title: "附录 A-3：动作/值获取列表（UI/参考/值）"
free: true
---

# 动作与值获取列表（UI / 参照 / 值）

本附录涵盖了 UI、通知和计分板的功能、常用类型、实现说明和最小模板。基本操作功能请参见“附录 A-2：动作/值获取列表（基本操作）”。

## UI / 通知 / 计分板

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `AddUIIcon` | 将 UI 图标Widget添加到对象中。你可以将显示限制为玩家或队伍。 2 种重载。 | parentObject: mod.Object, image: WorldIconImages, verticalOffset: number, iconColour: Vector, iconText: Message, visibility: Player \| Team | 无 | `mod.AddUIIcon(...);` |
| `ClearAllCustomNotificationMessages` | 清除指定玩家的所有自定义通知槽。 | target: Player | 无 | `mod.ClearAllCustomNotificationMessages(...);` |
| `ClearCustomNotificationMessage` | 隐藏指定插槽的自定义通知。你还可以指定目标玩家或队伍。 3 种重载。 | slot: CustomNotificationSlots | 无 | `mod.ClearCustomNotificationMessage(...);` |
| `DisplayCustomNotificationMessage` | 在指定槽位显示自定义通知。你还可以指定目标玩家或队伍。 3 种重载。 | msg: Message, slot: CustomNotificationSlots, duration: number | 无 | `mod.DisplayCustomNotificationMessage(...);` |
| `DisplayHighlightedWorldLogMessage` | 在小地图上的世界日志上显示强调的消息约 6 秒。如果没有指定目标，则会向所有人显示。 3 种重载。 | message: Message | 无 | `mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.ok));` |
| `DisplayNotificationMessage` | 在屏幕右上角显示通知消息约 6 秒。你还可以指定目标玩家或队伍。 3 种重载。 | message: Message | 无 | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.start), eventPlayer);` |
| `SendErrorReport` | 发送一条在管理菜单中显示为错误的消息。 | message: Message | 无 | `mod.SendErrorReport(...);` |
| `SendPortalLogToAdmin` | 将专用服务器托管的当前会话的 Portal 日志发送到管理员客户端。本地托管或没有管理员时不会发生任何事。 | 无 | 无 | `mod.SendPortalLogToAdmin();` |
| `SetScoreboardColumnNames` | 设置自定义计分板列名称。 5 种重载。 | column1Name: Message, column2Name: Message, column3Name: Message, column4Name: Message, column5Name: Message | 无 | `mod.SetScoreboardColumnNames(...);` |
| `SetScoreboardColumnWidths` | 设置自定义计分板的列宽比例。 5 种重载。 | column1Width: number, column2Width: number, column3Width: number, column4Width: number, column5Width: number | 无 | `mod.SetScoreboardColumnWidths(...);` |
| `SetScoreboardHeader` | 设置计分板左上角显示的标题名称。 2 种重载。 | team1Name: Message, team2Name: Message | 无 | `mod.SetScoreboardHeader(...);` |
| `SetScoreboardPlayerValues` | 在自定义记分牌上为每个玩家设置最多 5 列的列值。 5 种重载。 | player: Player, column1Value: number, column2Value: number, column3Value: number, column4Value: number, column5Value: number | 无 | `mod.SetScoreboardPlayerValues(...);` |
| `SetScoreboardSorting` | 设置自定义计分板排序列和倒序规范。 2 种重载。 | sortingColumn: number, reverseSorting: boolean | 无 | `mod.SetScoreboardSorting(...);` |
| `SetScoreboardType` | 更改要使用的计分板类型。 | scoreboardType: ScoreboardType | 无 | `mod.SetScoreboardType(...);` |
| `AddUIButton` | 创建一个 UI 按钮Widget。 6 种重载。 | name: string, position: Vector, size: Vector, anchor: UIAnchor | 无 | `mod.AddUIButton(...);` |
| `AddUIContainer` | 创建一个 UI 容器Widget。 6 种重载。 | name: string, position: Vector, size: Vector, anchor: UIAnchor | 无 | `mod.AddUIContainer(...);` |
| `AddUIGadgetImage` | 创建一个显示 Gadget 图像的 UI 图像Widget。 2 种重载。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, gadget: Gadgets, parent: UIWidget | 无 | `mod.AddUIGadgetImage(...);` |
| `AddUIImage` | 创建一个 UI 图像Widget。 6 种重载。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, imageType: UIImageType | 无 | `mod.AddUIImage(...);` |
| `AddUIText` | 创建一个 UI 文本Widget。 6 种重载。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, message: Message | 无 | `mod.AddUIText("timer", pos, size, mod.UIAnchor.Top, mod.Message(mod.stringkeys.timerZero));` |
| `AddUIWeaponImage` | 创建一个显示武器图像的 UI 图像Widget。 4 种重载。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, weapon: Weapons, parent: UIWidget | 无 | `mod.AddUIWeaponImage(...);` |
| `DeleteAllUIWidgets` | 删除所有 UI Widget。 | 无 | 无 | `mod.DeleteAllUIWidgets(...);` |
| `DeleteUIWidget` | 删除指定的 UI Widget。 | widget: UIWidget | 无 | `mod.DeleteUIWidget(...);` |
| `EnableUIButtonEvent` | 设置UI Button Widget是否发送按钮事件。 | widget: UIWidget, buttonEvent: UIButtonEvent, enabled: boolean | 无 | `mod.EnableUIButtonEvent(...);` |
| `EnableUIInputMode` | 启用或禁用允许你动作 UI 按钮的输入模式。你还可以指定目标。 2 种重载。 | enabled: boolean | 无 | `mod.EnableUIInputMode(...);` |
| `SetUIButtonAlphaBase` | 更改 UI Button 的正常 alpha 值。 | widget: UIWidget, value: number | 无 | `mod.SetUIButtonAlphaBase(...);` |
| `SetUIButtonAlphaDisabled` | 当 UI 按钮禁用时更改 alpha 值。 | widget: UIWidget, value: number | 无 | `mod.SetUIButtonAlphaDisabled(...);` |
| `SetUIButtonAlphaFocused` | 当 UI 按钮获得焦点时更改 alpha 值。 | widget: UIWidget, value: number | 无 | `mod.SetUIButtonAlphaFocused(...);` |
| `SetUIButtonAlphaHover` | 更改悬停时 UI 按钮的 alpha 值。 | widget: UIWidget, value: number | 无 | `mod.SetUIButtonAlphaHover(...);` |
| `SetUIButtonAlphaPressed` | 按下 UI 按钮时更改 alpha 值。 | widget: UIWidget, value: number | 无 | `mod.SetUIButtonAlphaPressed(...);` |
| `SetUIButtonColorBase` | 更改 UI Button 的正常颜色。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIButtonColorBase(...);` |
| `SetUIButtonColorDisabled` | 禁用时更改 UI 按钮的颜色。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIButtonColorDisabled(...);` |
| `SetUIButtonColorFocused` | 更改 UI 按钮聚焦时的颜色。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIButtonColorFocused(...);` |
| `SetUIButtonColorHover` | 更改 UI 按钮的悬停颜色。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIButtonColorHover(...);` |
| `SetUIButtonColorPressed` | 按下时更改 UI 按钮的颜色。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIButtonColorPressed(...);` |
| `SetUIButtonEnabled` | 启用或禁用 UI 按钮。 | widget: UIWidget, enabled: boolean | 无 | `mod.SetUIButtonEnabled(...);` |
| `SetUIImageAlpha` | 更改 UI 图像的 alpha 值。 | widget: UIWidget, value: number | 无 | `mod.SetUIImageAlpha(...);` |
| `SetUIImageColor` | 更改 UI 图像的颜色。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIImageColor(...);` |
| `SetUIImageType` | 更改 UI Image 的图像类型。 | widget: UIWidget, imageType: UIImageType | 无 | `mod.SetUIImageType(...);` |
| `SetUITextAlpha` | 更改 UI 文本的 alpha 值。 | widget: UIWidget, value: number | 无 | `mod.SetUITextAlpha(...);` |
| `SetUITextAnchor` | 更改 UI 文本中的文字锚点。 | widget: UIWidget, anchor: UIAnchor | 无 | `mod.SetUITextAnchor(...);` |
| `SetUITextColor` | 更改 UI 文本文本颜色。 | widget: UIWidget, value: Vector | 无 | `mod.SetUITextColor(...);` |
| `SetUITextLabel` | 更改 UI 文本中显示的消息。显示文本可以在 `Strings.json` 注册后参考。 | widget: UIWidget, message: Message | 无 | `mod.SetUITextLabel(widget, mod.Message(mod.stringkeys.updated));` |
| `SetUITextSize` | 更改 UI 文本的字体大小。 | widget: UIWidget, value: number | 无 | `mod.SetUITextSize(...);` |
| `SetUIWidgetAnchor` | 更改 UI Widget的锚点位置。 | widget: UIWidget, anchor: UIAnchor | 无 | `mod.SetUIWidgetAnchor(...);` |
| `SetUIWidgetBgAlpha` | 更改 UI Widget 背景的 Alpha 值。 | widget: UIWidget, value: number | 无 | `mod.SetUIWidgetBgAlpha(...);` |
| `SetUIWidgetBgColor` | 更改 UI Widget背景颜色。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIWidgetBgColor(...);` |
| `SetUIWidgetBgFill` | 更改UI Widget背景的绘制方法。 | widget: UIWidget, bgFill: UIBgFill | 无 | `mod.SetUIWidgetBgFill(...);` |
| `SetUIWidgetDepth` | 更改 UI Widget的绘制顺序。 | widget: UIWidget, depth: UIDepth | 无 | `mod.SetUIWidgetDepth(...);` |
| `SetUIWidgetName` | 更改 UI Widget名称。 | widget: UIWidget, name: string | 无 | `mod.SetUIWidgetName(...);` |
| `SetUIWidgetPadding` | 更改 UI Widget的填充。 | widget: UIWidget, value: number | 无 | `mod.SetUIWidgetPadding(...);` |
| `SetUIWidgetParent` | 更改 UI Widget的父Widget。 | widget: UIWidget, parent: UIWidget | 无 | `mod.SetUIWidgetParent(...);` |
| `SetUIWidgetPosition` | 更改 UI Widget的位置。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIWidgetPosition(...);` |
| `SetUIWidgetSize` | 更改 UI Widget的大小。 | widget: UIWidget, value: Vector | 无 | `mod.SetUIWidgetSize(...);` |
| `SetUIWidgetVisible` | 显示/隐藏 UI Widget。 | widget: UIWidget, visible: boolean | 无 | `mod.SetUIWidgetVisible(widget, false);` |
| `FindUIWidgetWithName` | 查找并获取与名称匹配的 UI Widget。 2 种重载。 | name: string, searchRoot: UIWidget | `UIWidget` | `const value = mod.FindUIWidgetWithName(...);` |
| `GetUIButtonAlphaBase` | 从数字或目标获取 UIButtonAlphaBase。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaBase(...);` |
| `GetUIButtonAlphaDisabled` | 从数字或目标获取 UIButtonAlphaDisabled。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaDisabled(...);` |
| `GetUIButtonAlphaFocused` | 从数字或目标获取 UIButtonAlphaFocused。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaFocused(...);` |
| `GetUIButtonAlphaHover` | 从数字或目标获取 UIButtonAlphaHover。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaHover(...);` |
| `GetUIButtonAlphaPressed` | 从数字或目标获取 UIButtonAlphaPressed。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaPressed(...);` |
| `GetUIButtonColorBase` | 从数字或目标获取 UIButtonColorBase。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorBase(...);` |
| `GetUIButtonColorDisabled` | 从数字或目标获取 UIButtonColorDisabled。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorDisabled(...);` |
| `GetUIButtonColorFocused` | 从数字或目标获取 UIButtonColorFocused。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorFocused(...);` |
| `GetUIButtonColorHover` | 从数字或目标获取 UIButtonColorHover。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorHover(...);` |
| `GetUIButtonColorPressed` | 从数字或目标获取 UIButtonColorPressed。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorPressed(...);` |
| `GetUIButtonEnabled` | 从数字或目标获取 UIButtonEnabled。 | widget: UIWidget | `boolean` | `const value = mod.GetUIButtonEnabled(...);` |
| `GetUIImageAlpha` | 从数字或目标获取 UIImageAlpha。 | widget: UIWidget | `number` | `const value = mod.GetUIImageAlpha(...);` |
| `GetUIImageColor` | 从数字或目标获取 UIImageColor。 | widget: UIWidget | `Vector` | `const value = mod.GetUIImageColor(...);` |
| `GetUIImageType` | 从数字或目标获取 UIImageType。 | widget: UIWidget | `UIImageType` | `const value = mod.GetUIImageType(...);` |
| `GetUIRoot` | 从数字或目标获取 UIRoot。 | 无 | `UIWidget` | `const value = mod.GetUIRoot(...);` |
| `GetUITextAlpha` | 从数字或目标获取 UITextAlpha。 | widget: UIWidget | `number` | `const value = mod.GetUITextAlpha(...);` |
| `GetUITextAnchor` | 从数字或目标获取 UITextAnchor。 | widget: UIWidget | `UIAnchor` | `const value = mod.GetUITextAnchor(...);` |
| `GetUITextColor` | 从数字或目标获取 UITextColor。 | widget: UIWidget | `Vector` | `const value = mod.GetUITextColor(...);` |
| `GetUITextSize` | 从数字或目标获取 UITextSize。 | widget: UIWidget | `number` | `const value = mod.GetUITextSize(...);` |
| `GetUIWidgetAnchor` | 从数字或目标获取 UIWidgetAnchor。 | widget: UIWidget | `UIAnchor` | `const value = mod.GetUIWidgetAnchor(...);` |
| `GetUIWidgetBgAlpha` | 从数字或目标获取 UIWidgetBgAlpha。 | widget: UIWidget | `number` | `const value = mod.GetUIWidgetBgAlpha(...);` |
| `GetUIWidgetBgColor` | 从数字或目标获取 UIWidgetBgColor。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetBgColor(...);` |
| `GetUIWidgetBgFill` | 从数字或目标获取 UIWidgetBgFill。 | widget: UIWidget | `UIBgFill` | `const value = mod.GetUIWidgetBgFill(...);` |
| `GetUIWidgetDepth` | 从数字或目标获取 UIWidgetDepth。 | widget: UIWidget | `UIDepth` | `const value = mod.GetUIWidgetDepth(...);` |
| `GetUIWidgetName` | 从数字或目标获取 UIWidgetName。 | widget: UIWidget | `string` | `const value = mod.GetUIWidgetName(...);` |
| `GetUIWidgetPadding` | 从数字或目标获取 UIWidgetPadding。 | widget: UIWidget | `number` | `const value = mod.GetUIWidgetPadding(...);` |
| `GetUIWidgetParent` | 从数字或目标获取 UIWidgetParent。 | widget: UIWidget | `UIWidget` | `const value = mod.GetUIWidgetParent(...);` |
| `GetUIWidgetPosition` | 从数字或目标获取 UIWidgetPosition。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetPosition(...);` |
| `GetUIWidgetSize` | 从数字或目标获取 UIWidgetSize。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetSize(...);` |
| `GetUIWidgetVisible` | 从数字或目标获取 UIWidgetVisible。 | widget: UIWidget | `boolean` | `const value = mod.GetUIWidgetVisible(...);` |
| `HasUIWidgetWithName` | 确定是否存在与名称匹配的 UI Widget。 2 种重载。 | name: string, searchRoot: UIWidget | `boolean` | `const value = mod.HasUIWidgetWithName(...);` |

## 玩家 / 队伍参照

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `SetTeam` | 更改指定玩家的队伍。 | player: Player, team: Team | 无 | `mod.SetTeam(...);` |
| `IsFaction` | 判断指定队伍是否使用指定阵营。 | team: Team, factions: Factions | `boolean` | `const value = mod.IsFaction(...);` |
| `AllPlayers` | 获取游戏中所有玩家的数组。 | 无 | `Array` | `const players = mod.AllPlayers();` |
| `ClosestPlayerTo` | 获取距离指定坐标最近的活着的玩家。你可以按队伍缩小范围。 2 种重载。 | vector: Vector | `Player` | `const value = mod.ClosestPlayerTo(...);` |
| `FarthestPlayerFrom` | 获取距指定坐标最远的幸存玩家。你可以按队伍缩小范围。 2 种重载。 | vector: Vector | `Player` | `const value = mod.FarthestPlayerFrom(...);` |
| `GetPlayerDeaths` | 获取指定玩家的死亡人数。 | player: Player | `number` | `const value = mod.GetPlayerDeaths(...);` |
| `GetPlayerKills` | 获取指定玩家的击杀数。 | player: Player | `number` | `const value = mod.GetPlayerKills(...);` |
| `GetSquad` | 获取指定玩家或队伍/小队号码对应的队伍。 2 种重载。 | player: Player | `Squad` | `const value = mod.GetSquad(...);` |
| `GetSquadName` | 获取字符串形式的指定小队的名称。 | arg0: Squad | `string` | `const value = mod.GetSquadName(...);` |
| `GetTeam` | 获取指定玩家所在的队伍或者指定号码对应的队伍。 2 种重载。 | player: Player | `Team` | `const team = mod.GetTeam(eventPlayer);` |
| `IsPlayerValid` | 确定指定的 Player 引用是否有效。 | player: Player | `boolean` | `const value = mod.IsPlayerValid(...);` |
| `IsSquadLeader` | 判断指定玩家是否为班长。 | player: Player | `boolean` | `const value = mod.IsSquadLeader(...);` |

## 数组

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `AppendToArray` | 返回一个副本，并将值添加到数组末尾。数组是串联的。 | array: Array, value: Any | `Array` | `const value = mod.AppendToArray(...);` |
| `ArraySlice` | 仅返回数组中指定索引范围的副本。 | array: Array, startIndex: number, endIndex: number | `Array` | `const value = mod.ArraySlice(...);` |
| `CountOf` | 获取数组中的元素number。 | array: Array | `number` | `const value = mod.CountOf(...);` |
| `EmptyArray` | 创建一个空数组。 | 无 | `Array` | `const value = mod.EmptyArray(...);` |
| `FirstOf` | 获取数组的第一个值。 | array: Array | `Any` | `const value = mod.FirstOf(...);` |
| `LastOf` | 获取数组的最后一个值。 | array: Array | `Any` | `const value = mod.LastOf(...);` |
| `RandomValueInArray` | 从数组中获取一个随机值。 | array: Array | `Any` | `const value = mod.RandomValueInArray(...);` |
| `RandomizedArray` | 返回数组的随机重新排列的副本。 | array: Array | `Array` | `const value = mod.RandomizedArray(...);` |
| `SortedArray` | 返回按指定数字条件按升序排序的数组的副本。 | array: Array, index: number | `Array` | `const value = mod.SortedArray(...);` |
| `ValueInArray` | 获取数组指定索引处的值。 | array: Array, index: number | `Any` | `const value = mod.ValueInArray(...);` |

## 获取对象ID

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `GetWaypointPath` | 从数字或目标获取 WaypointPath。 | waypointPathNumber: number | `WaypointPath` | `const value = mod.GetWaypointPath(...);` |
| `GetSFX` | 从编号或目标获取 SFX。 | number: number | `SFX` | `const value = mod.GetSFX(...);` |
| `GetVO` | 从编号或目标获取 VO。 | number: number | `VO` | `const value = mod.GetVO(...);` |
| `GetVFX` | 从数字或目标获取VFX。 | vfxNumber: number | `VFX` | `const value = mod.GetVFX(...);` |
| `GetSpawnPoint` | 从数字或目标获取 SpawnPoint。 | number: number | `SpawnPoint` | `const value = mod.GetSpawnPoint(...);` |
| `GetSpawner` | 从编号或目标中获取 Spawner。 | number: number | `Spawner` | `const value = mod.GetSpawner(...);` |
| `GetVL7Cloud` | 从编号或目标获取 VL7Cloud。 | vl7CloudId: number | `VL7Cloud` | `const value = mod.GetVL7Cloud(...);` |

## 逻辑 / 字符串 / 扩展

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `JsAction` | 在 JavaScript 端调用独特的动作。用于在模板侧延伸。 | actionName: string, actionArg0: Any, actionArg1: Any | 无 | `mod.JsAction("MyAction", eventPlayer, 0);` |
| `And` | 确定两个真值是否都为真。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.And(...);` |
| `Equals` | 确定两个值是否相等。 | left: Any, right: Any | `boolean` | `const value = mod.Equals(...);` |
| `GreaterThan` | 判断左边的数是否大于右边的数。 | number0: number, number1: number | `boolean` | `const value = mod.GreaterThan(...);` |
| `GreaterThanEqualTo` | 判断左边的数是否大于或等于右边的数。 | left: number, right: number | `boolean` | `const value = mod.GreaterThanEqualTo(...);` |
| `IfThenElse` | 一个三元运算，如果条件为 true，则返回第一个值；如果条件为 false，则返回第二个值。 | condition: boolean, trueValue: Any, falseValue: Any | `Any` | `const value = mod.IfThenElse(...);` |
| `IsType` | 判断值是否与指定类型匹配。 | value: Any, type: Types | `boolean` | `const value = mod.IsType(...);` |
| `JsValue` | 在 JavaScript 端调用唯一值函数。使用Portal端的返回值。 | valueName: string, valueArg0: Any, valueArg1: Any | `Any` | `const value = mod.JsValue("MyValue", eventPlayer, 0);` |
| `LessThan` | 判断左边的数是否小于右边的数。 | left: number, right: number | `boolean` | `const value = mod.LessThan(...);` |
| `LessThanEqualTo` | 判断左边的数是否小于或等于右边的数。 | left: number, right: number | `boolean` | `const value = mod.LessThanEqualTo(...);` |
| `Not` | 反转真值。 | boolean: boolean | `boolean` | `const value = mod.Not(...);` |
| `NotEqualTo` | 确定两个值是否不相等。 | left: Any, right: Any | `boolean` | `const value = mod.NotEqualTo(...);` |
| `Or` | 确定两个真值之一是否为真。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.Or(...);` |
| `Xor` | 确定两个真值是否不同。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.Xor(...);` |
| `Concat` | 连接两个字符串。 | string0: string, string1: string | `string` | `const value = mod.Concat(...);` |

## 数值 / Vector / 坐标

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `GetObjId` | 获取放置的项目和对象的 ObjId。用于检查 Godot 放置和代码引用。 | object: mod.Object | `number` | `const id = mod.GetObjId(eventInteractPoint);` |
| `IsCurrentMap` | 判断当前地图是否与指定地图匹配。 | maps: Maps | `boolean` | `const value = mod.IsCurrentMap(...);` |
| `AbsoluteValue` | 获取数字的绝对值。 | number: number | `number` | `const value = mod.AbsoluteValue(...);` |
| `Add` | 添加数字或Vector。 2 种重载。 | number0: number, number1: number | `number` | `const value = mod.Add(...);` |
| `AngleBetweenVectors` | 获取两个Vector之间的角度（以度为单位）。 | vector0: Vector, vector1: Vector | `number` | `const value = mod.AngleBetweenVectors(...);` |
| `AngleDifference` | 获取两个角度之间的差值（以度为单位）。 | number0: number, number1: number | `number` | `const value = mod.AngleDifference(...);` |
| `ArccosineInDegrees` | 获取数字的反余弦（以度为单位）。 | number: number | `number` | `const value = mod.ArccosineInDegrees(...);` |
| `ArccosineInRadians` | 获取以弧度为单位的数字的反余弦。 | number: number | `number` | `const value = mod.ArccosineInRadians(...);` |
| `ArcsineInDegrees` | 获取以度为单位的数字的反正弦。 | number: number | `number` | `const value = mod.ArcsineInDegrees(...);` |
| `ArcsineInRadians` | 获取以弧度为单位的数字的反正弦。 | number: number | `number` | `const value = mod.ArcsineInRadians(...);` |
| `ArctangentInDegrees` | 获取以度为单位的数字的反正切值。 | number: number | `number` | `const value = mod.ArctangentInDegrees(...);` |
| `ArctangentInRadians` | 获取以弧度为单位的数字的反正切值。 | number: number | `number` | `const value = mod.ArctangentInRadians(...);` |
| `Ceiling` | 通过向上舍入小数位将数字转换为整数。 | number: number | `number` | `const value = mod.Ceiling(...);` |
| `CosineFromDegrees` | 从度角获取余弦。 | number: number | `number` | `const value = mod.CosineFromDegrees(...);` |
| `CosineFromRadians` | 从弧度角获取余弦。 | number: number | `number` | `const value = mod.CosineFromRadians(...);` |
| `CreateTransform` | 从位置和旋转Vector创建变换。 | position: Vector, rotation: Vector | `Transform` | `mod.CreateTransform(pos, rot);` |
| `CreateVector` | 从 X、Y、Z 三个值创建一个Vector。X 为左和右，Y 为上和下，Z 为前后。 | number0: number, number1: number, number2: number | `Vector` | `mod.CreateVector(0, 2, 0);` |
| `CrossProduct` | 获取两个Vector的叉积。如果它们平行，则它变成零Vector。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.CrossProduct(...);` |
| `DegreesToRadians` | 将度数转换为弧度。 | number: number | `number` | `const value = mod.DegreesToRadians(...);` |
| `DirectionFromAngles` | 从偏航角和俯仰角获取方向Vector。 | number0: number, number1: number | `Vector` | `const value = mod.DirectionFromAngles(...);` |
| `DirectionTowards` | 获取从起点到终点的归一化方向Vector。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.DirectionTowards(...);` |
| `DistanceBetween` | 获取两个坐标之间的距离。 | vector0: Vector, vector1: Vector | `number` | `const value = mod.DistanceBetween(...);` |
| `Divide` | 通过除以数字或将 Vector 除以数字来返回缩放后的 Vector。 2 种重载。 | number0: number, number1: number | `number` | `const value = mod.Divide(...);` |
| `DotProduct` | 获取两个Vector的内积。如果它们正交，则为 0。Vector0：Vector，Vector1：Vector | vector0: Vector, vector1: Vector | `number` | `const value = mod.DotProduct(...);` |
| `Floor` | 通过向下舍入小数位将数字转换为整数。 | number: number | `number` | `const value = mod.Floor(...);` |
| `Max` | 返回两个数字中较大的一个。 | number0: number, number1: number | `number` | `const value = mod.Max(...);` |
| `Modulo` | 返回左边的数字除以右边的数字所得的余数。 | number0: number, number1: number | `number` | `const value = mod.Modulo(...);` |
| `Multiply` | 将数字相乘或通过将Vector乘以数字来返回缩放后的Vector。 2 种重载。 | number0: number, number1: number | `number` | `const value = mod.Multiply(...);` |
| `Normalize` | 将Vector归一化为长度为 1 的单位Vector。Vector：Vector | vector: Vector | `Vector` | `const value = mod.Normalize(...);` |
| `Pi` | 返回 pi 的近似值。 | 无 | `number` | `const value = mod.Pi(...);` |
| `RadiansToDegrees` | 将弧度转换为度数。 | number: number | `number` | `const value = mod.RadiansToDegrees(...);` |
| `RaiseToPower` | 将左侧的数字求右侧数字的幂。 | number0: number, number1: number | `number` | `const value = mod.RaiseToPower(...);` |
| `RandomReal` | 返回从指定最小值到最大值的随机实数。 | number0: number, number1: number | `number` | `const value = mod.RandomReal(...);` |
| `RoundToInteger` | 将数字四舍五入为整数。 | number: number | `number` | `const value = mod.RoundToInteger(...);` |
| `SineFromDegrees` | 从度角获取正弦值。 | number: number | `number` | `const value = mod.SineFromDegrees(...);` |
| `SineFromRadians` | 从弧度角获取正弦值。 | number: number | `number` | `const value = mod.SineFromRadians(...);` |
| `SquareRoot` | 求一个数的平方根。 | number: number | `number` | `const value = mod.SquareRoot(...);` |
| `Subtract` | 减去数字或Vector。 2 种重载。 | number0: number, number1: number | `number` | `const value = mod.Subtract(...);` |
| `TangentFromDegrees` | 从度角获取切线。 | number: number | `number` | `const value = mod.TangentFromDegrees(...);` |
| `TangentFromRadians` | 从弧度角获取切线。 | number: number | `number` | `const value = mod.TangentFromRadians(...);` |
| `BackwardVector` | 获取向后Vector `(0, 0, 1)`。 | 无 | `Vector` | `const value = mod.BackwardVector(...);` |
| `DownVector` | 获取向下的 Vector `(0, -1, 0)`。 | 无 | `Vector` | `const value = mod.DownVector(...);` |
| `ForwardVector` | 获取前向Vector `(0, 0, -1)`。 | 无 | `Vector` | `const value = mod.ForwardVector(...);` |
| `LeftVector` | 获取左侧Vector `(-1, 0, 0)`。 | 无 | `Vector` | `const value = mod.LeftVector(...);` |
| `LocalPositionOf` | 根据指定玩家将世界坐标转换为本地坐标。 | vector: Vector, player: Player | `Vector` | `const value = mod.LocalPositionOf(...);` |
| `LocalVectorOf` | 根据指定玩家将世界Vector转换为本地Vector。 | vector: Vector, player: Player | `Vector` | `const value = mod.LocalVectorOf(...);` |
| `RightVector` | 获取正确的Vector `(1, 0, 0)`。 | 无 | `Vector` | `const value = mod.RightVector(...);` |
| `UpVector` | 获取向上的 Vector `(0, 1, 0)`。 | 无 | `Vector` | `const value = mod.UpVector(...);` |
| `VectorTowards` | 获取从起点到终点的位移Vector。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.VectorTowards(...);` |
| `WorldPositionOf` | 将基于指定玩家的本地坐标转换为世界坐标。 | vector: Vector, player: Player | `Vector` | `const value = mod.WorldPositionOf(...);` |
| `WorldVectorOf` | 将基于指定玩家的本地Vector转换为世界Vector。 | vector: Vector, player: Player | `Vector` | `const value = mod.WorldVectorOf(...);` |
| `XComponentOf` | 获取Vector的 X 分量。 | vector: Vector | `number` | `const value = mod.XComponentOf(...);` |
| `YComponentOf` | 获取Vector的 Y 分量。 | vector: Vector | `number` | `const value = mod.YComponentOf(...);` |
| `ZComponentOf` | 获取Vector的 Z 分量。 | vector: Vector | `number` | `const value = mod.ZComponentOf(...);` |
| `Message` | 创建要传递到通知和 UI 的消息。在 `Strings.json` 中注册显示语句并传递 `mod.stringkeys.xxx`。 `{}` 包含其他参数。 4 种重载。 | msg: string \| number \| Player, msgArg0: string \| number \| Player, msgArg1: string \| number \| Player, msgArg2: string \| number \| Player | `Message` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` |

# 常用的类型以及如何获取它们

|模具|主要制作和服用方式|用途 |
| --- | --- | --- |
| `Player` | `Player` |事件参数，`AllPlayers()`，`ClosestPlayerTo()` |个人玩家处理、通知、装备、健康、移动 |
| `Team` | `Team` | `GetTeam(player)`，`GetTeam(1)` | `GetTeam(player)`基于队伍的胜负、通知、分数和隶属关系变化 |
| `Vector` | `Vector` | `CreateVector(x, y, z)`，`GetObjectPosition(obj)` | `CreateVector(x, y, z)`坐标、方向、颜色、UI位置等 |
| `Message` | `Message(mod.stringkeys.textKey)` | msg: string \| number \| Player, msgArg0: string \| number \| Player, msgArg1: string \| number \| Player, msgArg2: string \| number \| Player | `Message` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` |
| `UIWidget` | `UIWidget` | `AddUIText()`、`AddUIButton()`、`FindUIWidgetWithName()` | HUD、按钮、图像、容器 |
| `Variable` | `Variable` | `GlobalVariable(index)`，`ObjectVariable(obj, index)` | `GlobalVariable(index)`阶段、计数器和状态保存 |
| `mod.Object` | `mod.Object` |共享类型，例如 `Player`、`Vehicle`、`SpatialObject` |移动、获取 Transform、检查 ObjId |

# 实现注意事项

- `OnPlayerLeaveGame(eventNumber: number)` 接收号码而不是 `Player`。玩家引用很可能在离开后变得无效，因此在加入变量时保存必要的信息。
- 返回值中不返回 `RayCast()` 的结果。通过 `OnRayCastHit` 或 `OnRayCastMissed` 接收。
- `DisablePlayerJoin()` 在 SDK 注释中据说“无法返回”。当公开使用它时，只有在真正的截止日期时才使用它。
- 如果`AddUI...`系列重写太多，就会变得沉重。基本上，首先创建它并在 `SetUIWidgetVisible`、`SetUITextLabel`、`SetUIWidgetPosition` 更新它。
- 避免在 `Ongoing...` 系列中重复运行 `AllPlayers()` 或 `AllVehicles()` 。如有必要，可减少到每隔几秒一次。
- `GetObjId()` 是最重要的调试函数，用于检查放置在 Godot 中的对象与 TypeScript 端的引用是否匹配。

# 最小模板

要在屏幕上显示的文字首先在 `Strings.json` 中注册。

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
