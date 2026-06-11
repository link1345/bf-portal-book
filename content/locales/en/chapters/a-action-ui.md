---
title: "Appendix A-3: Actions and Value Retrieval (UI, References, and Values)"
free: true
---

# Actions and Value Retrieval (UI, References, and Values)

This appendix covers functions for UI, notifications, and scoreboards, frequently used types, implementation notes, and minimal templates. For basic operation functions, please refer to "Appendix A-2: Actions and Value Retrieval (Basic Operations)".

## UI / Notifications / Scoreboard

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `AddUIIcon` | Add UI Icon Widget to the object. You can limit the display to players or teams. 2 overloads. | parentObject: mod.Object, image: WorldIconImages, verticalOffset: number, iconColour: Vector, iconText: Message, visibility: Player \| Team | None | `mod.AddUIIcon(...);` |
| `ClearAllCustomNotificationMessages` | Clear all custom notification slots for the specified player. | target: Player | None | `mod.ClearAllCustomNotificationMessages(...);` |
| `ClearCustomNotificationMessage` | Hide custom notifications for the specified slot. You can also specify the target player or team. 3 overloads. | slot: CustomNotificationSlots | None | `mod.ClearCustomNotificationMessage(...);` |
| `DisplayCustomNotificationMessage` | Display a custom notification in the specified slot. You can also specify the target player or team. 3 overloads. | msg: Message, slot: CustomNotificationSlots, duration: number | None | `mod.DisplayCustomNotificationMessage(...);` |
| `DisplayHighlightedWorldLogMessage` | Displays an emphasized message on the world log on the minimap for about 6 seconds. If no target is specified, it will be displayed to everyone. 3 overloads. | message: Message | None | `mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.ok));` |
| `DisplayNotificationMessage` | Display a notification message at the top right of the screen for about 6 seconds. You can also specify the target player or team. 3 overloads. | message: Message | None | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.start), eventPlayer);` |
| `SendErrorReport` | Sends a message that is displayed as an error in the Admin menu. | message: Message | None | `mod.SendErrorReport(...);` |
| `SendPortalLogToAdmin` | Sends the current dedicated-server-hosted session's Portal log to the admin client. Does nothing when hosted locally or when no admin exists. | None | None | `mod.SendPortalLogToAdmin();` |
| `SetScoreboardColumnNames` | Set custom scoreboard column names. 5 overloads. | column1Name: Message, column2Name: Message, column3Name: Message, column4Name: Message, column5Name: Message | None | `mod.SetScoreboardColumnNames(...);` |
| `SetScoreboardColumnWidths` | Set column width ratio for custom scoreboard. 5 overloads. | column1Width: number, column2Width: number, column3Width: number, column4Width: number, column5Width: number | None | `mod.SetScoreboardColumnWidths(...);` |
| `SetScoreboardHeader` | Set the header name displayed at the top left of the scoreboard. 2 overloads. | team1Name: Message, team2Name: Message | None | `mod.SetScoreboardHeader(...);` |
| `SetScoreboardPlayerValues` | Set column values for each player on the custom scoreboard up to 5 columns. 5 overloads. | player: Player, column1Value: number, column2Value: number, column3Value: number, column4Value: number, column5Value: number | None | `mod.SetScoreboardPlayerValues(...);` |
| `SetScoreboardSorting` | Set the custom scoreboard sort column and reverse order specification. 2 overloads. | sortingColumn: number, reverseSorting: boolean | None | `mod.SetScoreboardSorting(...);` |
| `SetScoreboardType` | Change the scoreboard type to be used. | scoreboardType: ScoreboardType | None | `mod.SetScoreboardType(...);` |
| `AddUIButton` | Create a UI Button widget. 6 overloads. | name: string, position: Vector, size: Vector, anchor: UIAnchor | None | `mod.AddUIButton(...);` |
| `AddUIContainer` | Create a UI Container Widget. 6 overloads. | name: string, position: Vector, size: Vector, anchor: UIAnchor | None | `mod.AddUIContainer(...);` |
| `AddUIGadgetImage` | Create a UI Image Widget that displays the gadget image. 2 overloads. | name: string, position: Vector, size: Vector, anchor: UIAnchor, gadget: Gadgets, parent: UIWidget | None | `mod.AddUIGadgetImage(...);` |
| `AddUIImage` | Create a UI Image Widget. 6 overloads. | name: string, position: Vector, size: Vector, anchor: UIAnchor, imageType: UIImageType | None | `mod.AddUIImage(...);` |
| `AddUIText` | Create a UI Text Widget. 6 overloads. | name: string, position: Vector, size: Vector, anchor: UIAnchor, message: Message | None | `mod.AddUIText("timer", pos, size, mod.UIAnchor.Top, mod.Message(mod.stringkeys.timerZero));` |
| `AddUIWeaponImage` | Create a UI Image Widget that displays weapon images. 4 overloads. | name: string, position: Vector, size: Vector, anchor: UIAnchor, weapon: Weapons, parent: UIWidget | None | `mod.AddUIWeaponImage(...);` |
| `DeleteAllUIWidgets` | Delete all UI widgets. | None | None | `mod.DeleteAllUIWidgets(...);` |
| `DeleteUIWidget` | Delete the specified UI widget. | widget: UIWidget | None | `mod.DeleteUIWidget(...);` |
| `EnableUIButtonEvent` | Set whether the UI Button Widget sends button events. | widget: UIWidget, buttonEvent: UIButtonEvent, enabled: boolean | None | `mod.EnableUIButtonEvent(...);` |
| `EnableUIInputMode` | Enable or disable the input mode that allows you to operate the UI Button. You can also specify targets. 2 overloads. | enabled: boolean | None | `mod.EnableUIInputMode(...);` |
| `SetUIButtonAlphaBase` | Change the normal alpha value of UI Button. | widget: UIWidget, value: number | None | `mod.SetUIButtonAlphaBase(...);` |
| `SetUIButtonAlphaDisabled` | Change alpha value when UI Button is disabled. | widget: UIWidget, value: number | None | `mod.SetUIButtonAlphaDisabled(...);` |
| `SetUIButtonAlphaFocused` | Change the alpha value when the UI Button is focused. | widget: UIWidget, value: number | None | `mod.SetUIButtonAlphaFocused(...);` |
| `SetUIButtonAlphaHover` | Change the alpha value of UI Button when hovering. | widget: UIWidget, value: number | None | `mod.SetUIButtonAlphaHover(...);` |
| `SetUIButtonAlphaPressed` | Change the alpha value when pressing the UI Button. | widget: UIWidget, value: number | None | `mod.SetUIButtonAlphaPressed(...);` |
| `SetUIButtonColorBase` | Change the normal color of UI Button. | widget: UIWidget, value: Vector | None | `mod.SetUIButtonColorBase(...);` |
| `SetUIButtonColorDisabled` | Change the color of UI Button when disabled. | widget: UIWidget, value: Vector | None | `mod.SetUIButtonColorDisabled(...);` |
| `SetUIButtonColorFocused` | Change the color of the UI Button when it is focused. | widget: UIWidget, value: Vector | None | `mod.SetUIButtonColorFocused(...);` |
| `SetUIButtonColorHover` | Change the hover color of UI Button. | widget: UIWidget, value: Vector | None | `mod.SetUIButtonColorHover(...);` |
| `SetUIButtonColorPressed` | Change the color of the UI Button when pressed. | widget: UIWidget, value: Vector | None | `mod.SetUIButtonColorPressed(...);` |
| `SetUIButtonEnabled` | Enable or disable UI Button. | widget: UIWidget, enabled: boolean | None | `mod.SetUIButtonEnabled(...);` |
| `SetUIImageAlpha` | Change the alpha value of UI Image. | widget: UIWidget, value: number | None | `mod.SetUIImageAlpha(...);` |
| `SetUIImageColor` | Change the color of the UI Image. | widget: UIWidget, value: Vector | None | `mod.SetUIImageColor(...);` |
| `SetUIImageType` | Change the image type of UI Image. | widget: UIWidget, imageType: UIImageType | None | `mod.SetUIImageType(...);` |
| `SetUITextAlpha` | Change the alpha value of UI Text. | widget: UIWidget, value: number | None | `mod.SetUITextAlpha(...);` |
| `SetUITextAnchor` | Change the text anchor inside UI Text. | widget: UIWidget, anchor: UIAnchor | None | `mod.SetUITextAnchor(...);` |
| `SetUITextColor` | Change the UI Text text color. | widget: UIWidget, value: Vector | None | `mod.SetUITextColor(...);` |
| `SetUITextLabel` | Change the Message displayed in UI Text. Register display text in `Strings.json` before referencing it. | widget: UIWidget, message: Message | None | `mod.SetUITextLabel(widget, mod.Message(mod.stringkeys.updated));` |
| `SetUITextSize` | Change the font size of UI Text. | widget: UIWidget, value: number | None | `mod.SetUITextSize(...);` |
| `SetUIWidgetAnchor` | Change the anchor position of the UI widget. | widget: UIWidget, anchor: UIAnchor | None | `mod.SetUIWidgetAnchor(...);` |
| `SetUIWidgetBgAlpha` | Change the alpha value of the UI Widget background. | widget: UIWidget, value: number | None | `mod.SetUIWidgetBgAlpha(...);` |
| `SetUIWidgetBgColor` | Change the UI Widget background color. | widget: UIWidget, value: Vector | None | `mod.SetUIWidgetBgColor(...);` |
| `SetUIWidgetBgFill` | Change the drawing method of the UI Widget background. | widget: UIWidget, bgFill: UIBgFill | None | `mod.SetUIWidgetBgFill(...);` |
| `SetUIWidgetDepth` | Change the drawing order of UI widgets. | widget: UIWidget, depth: UIDepth | None | `mod.SetUIWidgetDepth(...);` |
| `SetUIWidgetName` | Change the UI widget name. | widget: UIWidget, name: string | None | `mod.SetUIWidgetName(...);` |
| `SetUIWidgetPadding` | Change padding of UI widget. | widget: UIWidget, value: number | None | `mod.SetUIWidgetPadding(...);` |
| `SetUIWidgetParent` | Change the parent widget of the UI widget. | widget: UIWidget, parent: UIWidget | None | `mod.SetUIWidgetParent(...);` |
| `SetUIWidgetPosition` | Change the position of the UI widget. | widget: UIWidget, value: Vector | None | `mod.SetUIWidgetPosition(...);` |
| `SetUIWidgetSize` | Change the size of the UI widget. | widget: UIWidget, value: Vector | None | `mod.SetUIWidgetSize(...);` |
| `SetUIWidgetVisible` | Show/hide UI widget. | widget: UIWidget, visible: boolean | None | `mod.SetUIWidgetVisible(widget, false);` |
| `FindUIWidgetWithName` | Find and retrieve the UI widget that matches the name. 2 overloads. | name: string, searchRoot: UIWidget | `UIWidget` | `const value = mod.FindUIWidgetWithName(...);` |
| `GetUIButtonAlphaBase` | Get UIButtonAlphaBase from number or target. | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaBase(...);` |
| `GetUIButtonAlphaDisabled` | Get UIButtonAlphaDisabled from number or target. | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaDisabled(...);` |
| `GetUIButtonAlphaFocused` | Get UIButtonAlphaFocused from number or target. | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaFocused(...);` |
| `GetUIButtonAlphaHover` | Get UIButtonAlphaHover from number or target. | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaHover(...);` |
| `GetUIButtonAlphaPressed` | Get UIButtonAlphaPressed from number or target. | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaPressed(...);` |
| `GetUIButtonColorBase` | Get UIButtonColorBase from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorBase(...);` |
| `GetUIButtonColorDisabled` | Get UIButtonColorDisabled from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorDisabled(...);` |
| `GetUIButtonColorFocused` | Get UIButtonColorFocused from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorFocused(...);` |
| `GetUIButtonColorHover` | Get UIButtonColorHover from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorHover(...);` |
| `GetUIButtonColorPressed` | Get UIButtonColorPressed from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorPressed(...);` |
| `GetUIButtonEnabled` | Get UIButtonEnabled from number or target. | widget: UIWidget | `boolean` | `const value = mod.GetUIButtonEnabled(...);` |
| `GetUIImageAlpha` | Get UIImageAlpha from number or target. | widget: UIWidget | `number` | `const value = mod.GetUIImageAlpha(...);` |
| `GetUIImageColor` | Get UIImageColor from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIImageColor(...);` |
| `GetUIImageType` | Get UIImageType from number or target. | widget: UIWidget | `UIImageType` | `const value = mod.GetUIImageType(...);` |
| `GetUIRoot` | Get UIRoot. | None | `UIWidget` | `const value = mod.GetUIRoot(...);` |
| `GetUITextAlpha` | Get UITextAlpha from number or target. | widget: UIWidget | `number` | `const value = mod.GetUITextAlpha(...);` |
| `GetUITextAnchor` | Get UITextAnchor from number or target. | widget: UIWidget | `UIAnchor` | `const value = mod.GetUITextAnchor(...);` |
| `GetUITextColor` | Get UITextColor from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUITextColor(...);` |
| `GetUITextSize` | Get UITextSize from number or target. | widget: UIWidget | `number` | `const value = mod.GetUITextSize(...);` |
| `GetUIWidgetAnchor` | Get UIWidgetAnchor from number or target. | widget: UIWidget | `UIAnchor` | `const value = mod.GetUIWidgetAnchor(...);` |
| `GetUIWidgetBgAlpha` | Get UIWidgetBgAlpha from number or target. | widget: UIWidget | `number` | `const value = mod.GetUIWidgetBgAlpha(...);` |
| `GetUIWidgetBgColor` | Get UIWidgetBgColor from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetBgColor(...);` |
| `GetUIWidgetBgFill` | Get UIWidgetBgFill from number or target. | widget: UIWidget | `UIBgFill` | `const value = mod.GetUIWidgetBgFill(...);` |
| `GetUIWidgetDepth` | Get UIWidgetDepth from number or target. | widget: UIWidget | `UIDepth` | `const value = mod.GetUIWidgetDepth(...);` |
| `GetUIWidgetName` | Get UIWidgetName from number or target. | widget: UIWidget | `string` | `const value = mod.GetUIWidgetName(...);` |
| `GetUIWidgetPadding` | Get UIWidgetPadding from number or target. | widget: UIWidget | `number` | `const value = mod.GetUIWidgetPadding(...);` |
| `GetUIWidgetParent` | Get UIWidgetParent from number or target. | widget: UIWidget | `UIWidget` | `const value = mod.GetUIWidgetParent(...);` |
| `GetUIWidgetPosition` | Get UIWidgetPosition from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetPosition(...);` |
| `GetUIWidgetSize` | Get UIWidgetSize from number or target. | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetSize(...);` |
| `GetUIWidgetVisible` | Get UIWidgetVisible from number or target. | widget: UIWidget | `boolean` | `const value = mod.GetUIWidgetVisible(...);` |
| `HasUIWidgetWithName` | Determine whether a UI widget that matches the name exists. 2 overloads. | name: string, searchRoot: UIWidget | `boolean` | `const value = mod.HasUIWidgetWithName(...);` |

## Player / Team References

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `SetTeam` | Change the specified player's team. | player: Player, team: Team | None | `mod.SetTeam(...);` |
| `IsFaction` | Determine whether the specified team is using the specified faction. | team: Team, factions: Factions | `boolean` | `const value = mod.IsFaction(...);` |
| `AllPlayers` | Get the array of all players in the game. | None | `Array` | `const players = mod.AllPlayers();` |
| `ClosestPlayerTo` | Get the closest living player to the specified coordinates. You can narrow it down by team. 2 overloads. | vector: Vector | `Player` | `const value = mod.ClosestPlayerTo(...);` |
| `FarthestPlayerFrom` | Get the farthest surviving player from the specified coordinates. You can narrow it down by team. 2 overloads. | vector: Vector | `Player` | `const value = mod.FarthestPlayerFrom(...);` |
| `GetPlayerDeaths` | Get the number of deaths of the specified player. | player: Player | `number` | `const value = mod.GetPlayerDeaths(...);` |
| `GetPlayerKills` | Get the number of kills for the specified player. | player: Player | `number` | `const value = mod.GetPlayerKills(...);` |
| `GetSquad` | Get the squad corresponding to the specified player or team/squad number. 2 overloads. | player: Player | `Squad` | `const value = mod.GetSquad(...);` |
| `GetSquadName` | Get the name of the specified Squad as a string. | arg0: Squad | `string` | `const value = mod.GetSquadName(...);` |
| `GetTeam` | Get the team of the specified player or the team corresponding to the specified number. 2 overloads. | player: Player | `Team` | `const team = mod.GetTeam(eventPlayer);` |
| `IsPlayerValid` | Determine whether the specified Player reference is valid. | player: Player | `boolean` | `const value = mod.IsPlayerValid(...);` |
| `IsSquadLeader` | Determine whether the specified player is the squad leader. | player: Player | `boolean` | `const value = mod.IsSquadLeader(...);` |

## Array

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `AppendToArray` | Returns a copy with the value added to the end of the array. Arrays are concatenated. | array: Array, value: Any | `Array` | `const value = mod.AppendToArray(...);` |
| `ArraySlice` | Returns a copy of only the specified index range from the array. | array: Array, startIndex: number, endIndex: number | `Array` | `const value = mod.ArraySlice(...);` |
| `CountOf` | Get the number of elements in the array. | array: Array | `number` | `const value = mod.CountOf(...);` |
| `EmptyArray` | Create an empty array. | None | `Array` | `const value = mod.EmptyArray(...);` |
| `FirstOf` | Get the first value of the array. | array: Array | `Any` | `const value = mod.FirstOf(...);` |
| `LastOf` | Get the last value of the array. | array: Array | `Any` | `const value = mod.LastOf(...);` |
| `RandomValueInArray` | Get one random value from the array. | array: Array | `Any` | `const value = mod.RandomValueInArray(...);` |
| `RandomizedArray` | Returns a randomly rearranged copy of the array. | array: Array | `Array` | `const value = mod.RandomizedArray(...);` |
| `SortedArray` | Returns a copy of the array sorted in ascending order by the specified numerical criteria. | array: Array, index: number | `Array` | `const value = mod.SortedArray(...);` |
| `ValueInArray` | Get the value at the specified index of the array. | array: Array, index: number | `Any` | `const value = mod.ValueInArray(...);` |

## ObjId Retrieval

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `GetWaypointPath` | Get WaypointPath from number or target. | waypointPathNumber: number | `WaypointPath` | `const value = mod.GetWaypointPath(...);` |
| `GetSFX` | Get SFX from number or target. | number: number | `SFX` | `const value = mod.GetSFX(...);` |
| `GetVO` | Get VO from number or target. | number: number | `VO` | `const value = mod.GetVO(...);` |
| `GetVFX` | Get VFX from number or target. | vfxNumber: number | `VFX` | `const value = mod.GetVFX(...);` |
| `GetSpawnPoint` | Get SpawnPoint from number or target. | number: number | `SpawnPoint` | `const value = mod.GetSpawnPoint(...);` |
| `GetSpawner` | Get Spawner from number or target. | number: number | `Spawner` | `const value = mod.GetSpawner(...);` |
| `GetVL7Cloud` | Get VL7Cloud from number or target. | vl7CloudId: number | `VL7Cloud` | `const value = mod.GetVL7Cloud(...);` |

## Logical/String/Extension

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `JsAction` | Call a unique action on the JavaScript side. For extending on the template side. | actionName: string, actionArg0: Any, actionArg1: Any | None | `mod.JsAction("MyAction", eventPlayer, 0);` |
| `And` | Determine whether two truth values are both true. | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.And(...);` |
| `Equals` | Determine whether two values are equal. | left: Any, right: Any | `boolean` | `const value = mod.Equals(...);` |
| `GreaterThan` | Determine whether the number on the left is greater than the number on the right. | number0: number, number1: number | `boolean` | `const value = mod.GreaterThan(...);` |
| `GreaterThanEqualTo` | Determine whether the number on the left is greater than or equal to the number on the right. | left: number, right: number | `boolean` | `const value = mod.GreaterThanEqualTo(...);` |
| `IfThenElse` | A ternary operation that returns the first value if the condition is true, and the second value if it is false. | condition: boolean, trueValue: Any, falseValue: Any | `Any` | `const value = mod.IfThenElse(...);` |
| `IsType` | Determine whether the value matches the specified type. | value: Any, type: Types | `boolean` | `const value = mod.IsType(...);` |
| `JsValue` | Call the unique value function on the JavaScript side. Use the return value on the Portal side. | valueName: string, valueArg0: Any, valueArg1: Any | `Any` | `const value = mod.JsValue("MyValue", eventPlayer, 0);` |
| `LessThan` | Determine whether the number on the left is smaller than the number on the right. | left: number, right: number | `boolean` | `const value = mod.LessThan(...);` |
| `LessThanEqualTo` | Determine whether the number on the left is less than or equal to the number on the right. | left: number, right: number | `boolean` | `const value = mod.LessThanEqualTo(...);` |
| `Not` | Invert the truth value. | boolean: boolean | `boolean` | `const value = mod.Not(...);` |
| `NotEqualTo` | Determine whether two values are not equal. | left: Any, right: Any | `boolean` | `const value = mod.NotEqualTo(...);` |
| `Or` | Determine whether one of the two truth values is true. | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.Or(...);` |
| `Xor` | Determine whether two truth values are different. | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.Xor(...);` |
| `Concat` | Concatenate two strings. | string0: string, string1: string | `string` | `const value = mod.Concat(...);` |

## Numbers / Vectors / Coordinates

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `GetObjId` | Get the ObjId of placed items and objects. Used to check Godot placement and code references. | object: mod.Object | `number` | `const id = mod.GetObjId(eventInteractPoint);` |
| `IsCurrentMap` | Determine whether the current map matches the specified map. | maps: Maps | `boolean` | `const value = mod.IsCurrentMap(...);` |
| `AbsoluteValue` | Get the absolute value of a number. | number: number | `number` | `const value = mod.AbsoluteValue(...);` |
| `Add` | Add numbers or Vectors. 2 overloads. | number0: number, number1: number | `number` | `const value = mod.Add(...);` |
| `AngleBetweenVectors` | Get the angle between two Vectors in degrees. | vector0: Vector, vector1: Vector | `number` | `const value = mod.AngleBetweenVectors(...);` |
| `AngleDifference` | Get the difference between two angles in degrees. | number0: number, number1: number | `number` | `const value = mod.AngleDifference(...);` |
| `ArccosineInDegrees` | Get the arc cosine of a number in degrees. | number: number | `number` | `const value = mod.ArccosineInDegrees(...);` |
| `ArccosineInRadians` | Get the arc cosine of a number in radians. | number: number | `number` | `const value = mod.ArccosineInRadians(...);` |
| `ArcsineInDegrees` | Get the inverse sine of a number in degrees. | number: number | `number` | `const value = mod.ArcsineInDegrees(...);` |
| `ArcsineInRadians` | Get the inverse sine of a number in radians. | number: number | `number` | `const value = mod.ArcsineInRadians(...);` |
| `ArctangentInDegrees` | Get the arctangent of a number in degrees. | number: number | `number` | `const value = mod.ArctangentInDegrees(...);` |
| `ArctangentInRadians` | Get the arctangent of a number in radians. | number: number | `number` | `const value = mod.ArctangentInRadians(...);` |
| `Ceiling` | Convert a number to an integer by rounding up the decimal place. | number: number | `number` | `const value = mod.Ceiling(...);` |
| `CosineFromDegrees` | Get cosine from degree angle. | number: number | `number` | `const value = mod.CosineFromDegrees(...);` |
| `CosineFromRadians` | Get cosine from radian angle. | number: number | `number` | `const value = mod.CosineFromRadians(...);` |
| `CreateTransform` | Create a Transform from the Position and Rotation Vector. | position: Vector, rotation: Vector | `Transform` | `mod.CreateTransform(pos, rot);` |
| `CreateVector` | Create a Vector from the three values of X, Y, and Z. X is left and right, Y is up and down, and Z is front and back. | number0: number, number1: number, number2: number | `Vector` | `mod.CreateVector(0, 2, 0);` |
| `CrossProduct` | Get the cross product of two Vectors. If they are parallel, it becomes a zero Vector. | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.CrossProduct(...);` |
| `DegreesToRadians` | Convert degrees to radians. | number: number | `number` | `const value = mod.DegreesToRadians(...);` |
| `DirectionFromAngles` | Get the direction Vector from the Yaw and Pitch angles. | number0: number, number1: number | `Vector` | `const value = mod.DirectionFromAngles(...);` |
| `DirectionTowards` | Obtain the normalized direction Vector from the start point to the end point. | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.DirectionTowards(...);` |
| `DistanceBetween` | Get the distance between two coordinates. | vector0: Vector, vector1: Vector | `number` | `const value = mod.DistanceBetween(...);` |
| `Divide` | Returns a scaled Vector by dividing numbers or by dividing a Vector by a number. 2 overloads. | number0: number, number1: number | `number` | `const value = mod.Divide(...);` |
| `DotProduct` | Get the inner product of two Vectors. If they are orthogonal, it will be 0. | vector0: Vector, vector1: Vector | `number` | `const value = mod.DotProduct(...);` |
| `Floor` | Convert a number to an integer by rounding down the decimal places. | number: number | `number` | `const value = mod.Floor(...);` |
| `Max` | Returns the larger of two numbers. | number0: number, number1: number | `number` | `const value = mod.Max(...);` |
| `Modulo` | Returns the remainder when the number on the left is divided by the number on the right. | number0: number, number1: number | `number` | `const value = mod.Modulo(...);` |
| `Multiply` | Multiply numbers or return a scaled Vector by multiplying a Vector by a number. 2 overloads. | number0: number, number1: number | `number` | `const value = mod.Multiply(...);` |
| `Normalize` | Normalize Vector to unit Vector of length 1. | vector: Vector | `Vector` | `const value = mod.Normalize(...);` |
| `Pi` | Returns the approximate value of pi. | None | `number` | `const value = mod.Pi(...);` |
| `RadiansToDegrees` | Convert radians to degrees. | number: number | `number` | `const value = mod.RadiansToDegrees(...);` |
| `RaiseToPower` | Raise the number on the left to the power of the number on the right. | number0: number, number1: number | `number` | `const value = mod.RaiseToPower(...);` |
| `RandomReal` | Returns a random real number from the specified minimum value to the maximum value. | number0: number, number1: number | `number` | `const value = mod.RandomReal(...);` |
| `RoundToInteger` | Round the number to an integer. | number: number | `number` | `const value = mod.RoundToInteger(...);` |
| `SineFromDegrees` | Get sine from degree angle. | number: number | `number` | `const value = mod.SineFromDegrees(...);` |
| `SineFromRadians` | Get sine from radian angle. | number: number | `number` | `const value = mod.SineFromRadians(...);` |
| `SquareRoot` | Get the square root of a number. | number: number | `number` | `const value = mod.SquareRoot(...);` |
| `Subtract` | Subtract numbers or Vectors. 2 overloads. | number0: number, number1: number | `number` | `const value = mod.Subtract(...);` |
| `TangentFromDegrees` | Get tangent from degree angle. | number: number | `number` | `const value = mod.TangentFromDegrees(...);` |
| `TangentFromRadians` | Get tangent from radian angle. | number: number | `number` | `const value = mod.TangentFromRadians(...);` |
| `BackwardVector` | Get backward Vector `(0, 0, 1)`. | None | `Vector` | `const value = mod.BackwardVector(...);` |
| `DownVector` | Get the downward Vector `(0, -1, 0)`. | None | `Vector` | `const value = mod.DownVector(...);` |
| `ForwardVector` | Get the forward Vector `(0, 0, -1)`. | None | `Vector` | `const value = mod.ForwardVector(...);` |
| `LeftVector` | Get the left Vector `(-1, 0, 0)`. | None | `Vector` | `const value = mod.LeftVector(...);` |
| `LocalPositionOf` | Convert world coordinates to local coordinates based on the specified player. | vector: Vector, player: Player | `Vector` | `const value = mod.LocalPositionOf(...);` |
| `LocalVectorOf` | Convert the world Vector to a local Vector based on the specified player. | vector: Vector, player: Player | `Vector` | `const value = mod.LocalVectorOf(...);` |
| `RightVector` | Get the right Vector `(1, 0, 0)`. | None | `Vector` | `const value = mod.RightVector(...);` |
| `UpVector` | Get the upward Vector `(0, 1, 0)`. | None | `Vector` | `const value = mod.UpVector(...);` |
| `VectorTowards` | Get the displacement Vector from the start point to the end point. | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.VectorTowards(...);` |
| `WorldPositionOf` | Convert local coordinates based on the specified player to world coordinates. | vector: Vector, player: Player | `Vector` | `const value = mod.WorldPositionOf(...);` |
| `WorldVectorOf` | Convert local Vector based on specified player to world Vector. | vector: Vector, player: Player | `Vector` | `const value = mod.WorldVectorOf(...);` |
| `XComponentOf` | Get the X component of Vector. | vector: Vector | `number` | `const value = mod.XComponentOf(...);` |
| `YComponentOf` | Get the Y component of Vector. | vector: Vector | `number` | `const value = mod.YComponentOf(...);` |
| `ZComponentOf` | Get the Z component of Vector. | vector: Vector | `number` | `const value = mod.ZComponentOf(...);` |
| `Message` | Create a message to be passed to notifications and UI. Register the display statement in `Strings.json` and pass `mod.stringkeys.xxx`. `{}` contains additional arguments. 4 overloads. | msg: string \| number \| Player, msgArg0: string \| number \| Player, msgArg1: string \| number \| Player, msgArg2: string \| number \| Player | `Message` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` |

# Frequently Used Types and How to Get Them

| Mold | Main ways to make and take | Uses |
| --- | --- | --- |
| `Player` | Event arguments, `AllPlayers()`, `ClosestPlayerTo()` | Individual player processing, notifications, equipment, health, movement |
| `Team` | `GetTeam(player)`, `GetTeam(1)` | Team-based wins and losses, notifications, scores, and affiliation changes |
| `Vector` | `CreateVector(x, y, z)`, `GetObjectPosition(obj)` | Coordinates, direction, color, UI position, etc. |
| `Message` | `Message(mod.stringkeys.textKey)` | Notifications, WorldIcon text, scoreboard headings |
| `UIWidget` | `AddUIText()`, `AddUIButton()`, `FindUIWidgetWithName()` | HUD, buttons, images, containers |
| `Variable` | `GlobalVariable(index)`, `ObjectVariable(obj, index)` | Phases, counters, and state preservation |
| `mod.Object` | Shared types such as `Player`, `Vehicle`, `SpatialObject` | Move, get Transform, check ObjId |

# Implementation Notes

- `OnPlayerLeaveGame(eventNumber: number)` receives the number instead of `Player`. Player references are likely to become invalid after leaving, so save the information necessary when joining in variables.
- The result of `RayCast()` is not returned in the return value. Receive it at `OnRayCastHit` or `OnRayCastMissed`.
- `DisablePlayerJoin()` is said to have "no way to return" in the SDK comment. When using it publicly, only use it when there is a real deadline.
- If the `AddUI...` series is rewritten too much, it will become heavy. Basically, create it first and update it at `SetUIWidgetVisible`, `SetUITextLabel`, `SetUIWidgetPosition`.
- Avoid repeatedly running `AllPlayers()` or `AllVehicles()` in the `Ongoing...` series. If necessary, thin out to every few seconds.
- `GetObjId()` is the most important debug function that checks whether the object placed in Godot and the reference on the TypeScript side match.

# Minimal Template

Text displayed on screen is registered first in `Strings.json`.

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
