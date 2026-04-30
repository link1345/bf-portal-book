---
title: "Appendix C: modlib Guide: Helper Library for Making the SDK Easier to Use"
free: true
---


# What is modlib?

`modlib` is an auxiliary library for TypeScript shipped with the BF6 Portal SDK.
The location is `code/modlib/index.ts`.

Portal's main API lives in the `mod` namespace.
For example, it includes functions such as `mod.DisplayNotificationMessage`, `mod.GetObjId`, `mod.AllPlayers`, and `mod.AddUIText`.

On the other hand, `modlib` is not a direct replacement for `mod`.
It is a collection of helper functions that sits on top of `mod`, shortens common code, and hides some of Portal's awkward parts.

As a basic rule, this book uses `modlib` first.
For notifications, getting players on a team, converting Portal arrays, firing a condition only once, UI generation, and other helpers that `modlib` provides, consider `modlib` first.
Use `mod` directly only when `modlib` does not provide the feature, or when you need fine control over behavior.

When using it, load it at the beginning of the script.

```ts
import * as modlib from "modlib";
```

And call it like this:

```ts
export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.welcome), eventPlayer);
}
```

# Relationship Between mod and modlib

`mod` is Portal's official API itself.
Functions that actually issue commands to Portal, such as in-game events, player operations, UI generation, sounds, vehicles, objectives, and coordinate calculations, are basically in `mod`.

`modlib` is an auxiliary layer created using `mod`.
For example:

| Type | When writing directly with mod | How modlib helps |
| --- | --- | --- |
| Notification display | You need to choose different calls depending on whether there is a target | `ShowNotificationMessage` wraps that difference |
| Get players on a team | Loop over `AllPlayers` and compare `GetTeam` | `getPlayersInTeam` wraps it |
| Portal array processing | Read `mod.Array` with `CountOf` / `ValueInArray` | Convert to JavaScript array with `ConvertArray` |
| Fire a condition only once | Keep your own state flag | Use `ConditionState` and `get...Condition` |
| UI generation | The arguments for `AddUIText` and `AddUIContainer` are long | You can write in JSON style with `ParseUI` |

In other words, `modlib` is a toolbox that makes Portal's standard API feel a little more like ordinary TypeScript.

# Usage Policy

This book recommends using `modlib` first, then using `mod` directly only where necessary.

The reason is simple.
`modlib` wraps annoying tasks that often appear in Portal creation so they can be written more briefly and safely.
Instead of scanning `AllPlayers` every time, branching notification calls by target, or lining up long UI arguments, code is easier to read if you use `modlib` first.

The usage is as follows.

| Situation | Recommendation |
| --- | --- |
| You want notifications, team lookup, array conversion, condition management, or UI generation | Use `modlib` first |
| You write notification display code repeatedly | Use `modlib.ShowNotificationMessage` and related helpers |
| `mod.Array` traversal is increasing | Use `ConvertArray` or `FilteredArray` |
| I want to process only the moment the condition becomes true with `Ongoing...` | Use `ConditionState` / `get...Condition` |
| You create a lot of UI | Consider `ParseUI` |
| I want to use Portal API that is not available in `modlib` | Use `mod` directly |
| I don't understand the behavior and want to debug it | Read the contents of `modlib` and revert to calling `mod` directly if necessary |

However, the content of `modlib` is TypeScript code that calls the `mod` API.
Even if you prefer to use `modlib`, it is a good idea to be able to read `index.ts` when you get stuck.
Please refer to this Appendix C as a dictionary for function-by-function details.

# Overall Structure

`index.ts` can be roughly divided into the following five parts.

| Area | Contents |
| --- | --- |
| String, condition, and array helpers | `Concat`, `And`, `ConvertArray`, `FilteredArray`, etc. |
| ObjId and condition state | `getPlayerId`, `ConditionState`, `getPlayerCondition`, etc. |
| Team helpers | `getPlayersInTeam` |
| JSON-like UI generation | `ParseUI` and internal `__addUI...` helpers |
| Notification/Message display | `ShowNotificationMessage`, `ShowEventGameModeMessage`, `DisplayCustomNotificationMessage`, etc. |

There are also functions in the file that start with `__`, such as `__asModVector`, `__addUIText`, and so on.
These are for internal implementation.
Basically, instead of calling it directly from the outside, use the public `export function`.

# Basic Syntax Helpers

## Concat

```ts
modlib.Concat("A", "B");
```

Concatenates two strings.
Portal API also has `mod.Concat`, but `modlib.Concat` simply joins ordinary TypeScript strings with `+`.

Its use is simple.
Use it when you want to assemble strings.
However, in TypeScript, template strings are often easier to read.

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

Looks at multiple boolean values in order and returns `true` if all are `true`.
If there is even one `false`, it will stop there.

`mod.And` has two arguments, but `modlib.And` has variable length.
It becomes easier to read when there are three or more conditions.

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

`AndFn` receives multiple functions that return boolean values, rather than boolean values themselves.
It executes them from left to right, and if one returns `false`, the remaining functions are not executed.

By placing heavy conditions or conditions for which you want to avoid side effects later, you can reduce unnecessary processing.

## IfThenElse

```ts
const label = modlib.IfThenElse(
  isAttackTeam,
  () => "攻撃",
  () => "防衛"
);
```

If the condition is `true`, it will return the result of `ifTrue()`, and if the condition is `false`, it will return the result of `ifFalse()`.

It is similar to `mod.IfThenElse`, but `modlib.IfThenElse` is a form of passing a function.
Use this when you want to evaluate only the side that is needed.

## Equals

```ts
if (modlib.Equals(mod.GetTeam(player), mod.GetTeam(1))) {
  // Team 1
}
```

Internally it calls `mod.Equals(a, b)`.
However, if either is `null`, then `debugger` is included.

This is an implementation intended to "make it easier to notice null comparisons," but please be careful in code before publication.
This is useful while investigating a cause, but it can also stop the debugger unexpectedly.

# Helpers for Handling Portal Arrays

`mod.Array` in the Portal SDK is not a normal JavaScript array.
You should read `mod.CountOf` and `mod.ValueInArray` instead of `for ... of` and `array.length`.

`modlib` provides functions that bridge this gap.

## ConvertArray

```ts
const players = modlib.ConvertArray(mod.AllPlayers()) as mod.Player[];
```

Converts `mod.Array` to a JavaScript array.

Internally, the flow is as follows.

1. Get the number of elements with `mod.CountOf(array)`
2. Read each item with `mod.ValueInArray(array, i)`
3. `push` to JavaScript array

This is useful when you want to handle the result of `AllPlayers()` or `GetPlayersOnPoint()` like an ordinary TypeScript array.

## FilteredArray

```ts
const team1Players = modlib.FilteredArray(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

Filters `mod.Array` and returns it as new `mod.Array`.
Note that the return value is `mod.Array` and not a JavaScript array.

Internally, it is converted to a JavaScript array using `ConvertArray`, and only elements that meet the conditions are returned to the Portal array using `mod.AppendToArray`.

## IndexOfFirstTrue

```ts
const index = modlib.IndexOfFirstTrue(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.IsPlayerValid(player);
});
```

Returns the index of the element where the condition first becomes `true`.
If not found, use `-1`.

It can be used for purposes such as ``searching for the first valid player'' and ``searching for the first vehicle that meets the conditions.''

## IsTrueForAll

```ts
const allReady = modlib.IsTrueForAll(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return isPlayerReady(player);
});
```

Determine whether all elements of `mod.Array` satisfy the condition.
If at least one is `false`, then it is `false`.

## IsTrueForAny

```ts
const hasAttacker = modlib.IsTrueForAny(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

Determine whether any one of `mod.Array` satisfies the condition.

## SortedArray

```ts
const sorted = modlib.SortedArray(players, (a, b) => {
  return mod.GetPlayerKills(b) - mod.GetPlayerKills(a);
});
```

Copies a JavaScript array and returns a new array sorted by a comparison function.
What you receive here is `any[]` instead of `mod.Array`.

It is assumed that it will be used after converting with `ConvertArray`.

# ObjId Helpers

## getPlayerId

```ts
const id = modlib.getPlayerId(eventPlayer);
```

Internally it calls `mod.GetObjId(player)`.
Gets the player's ObjId as a number.

## getTeamId

```ts
const teamId = modlib.getTeamId(mod.GetTeam(eventPlayer));
```

Internally it calls `mod.GetObjId(team)`.
Use this when you want to compare teams as numerical IDs.

It is also used in Chapter 6b of the main text to make team comparisons easier to read.

```ts
const eventTeamId = modlib.getTeamId(eventTeam);
const teamId = modlib.getTeamId(team);
```

# Handling the Rising Edge of Conditions

In Portal, `Ongoing...` series events are called continuously.
If you run processing for the entire time a condition is true, the same notification, score addition, or spawn can execute again and again.

For this, `modlib` provides state management that lets processing pass only at the moment a value changes from false to true.

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

`ConditionState` is a small class that remembers the previous state.

`update(newState)` works like this:

| Previous | This time | Return value | Meaning |
| --- | --- | --- | --- |
| false | false | false | Condition not met yet |
| false | true | true | The moment the condition is met |
| true | true | false | Still true, but do not pass again |
| true | false | false | Reset |

In other words, it will only pass once while `true` continues.
Once you return to `false`, it will pass through the next `true` once again.

We recommend that you do not write long conditional expressions directly in `update()`.
If you divide it into decision functions like `hasEnoughPlayersToStart()`, `isStartInteract()`, `canReachTarget()`, you can read "what it is waiting for" by the name.
For code pasted into Portal, write comments in short English to avoid multibyte characters.

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

Gets the global condition state by number.
By dividing the numbers like `0`, `1`, `2`, you can manage multiple conditions separately.

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

Each player has a conditional state.
Even if the condition number is the same, each player will have a different condition.

## getTeamCondition

```ts
const condition = modlib.getTeamCondition(mod.GetTeam(1), 0);
```

Each team has a conditional state.
It can be used for achieving team goals, achieving scores, number of people conditions, etc.

## Condition by object

The following function has a conditional state for each object.

| Function | Target | When to use |
| --- | --- | --- |
| `getCapturePointCondition` | `mod.CapturePoint` | Occupation start, occupation complete, change in number of people |
| `getMCOMCondition` | `mod.MCOM` | Arm state, release state, destroyed state |
| `getVehicleCondition` | `mod.Vehicle` | Boarding, destruction, and speed conditions |
| `getHQCondition` | `mod.HQ` | HQ activation, ownership team change |
| `getSectorCondition` | `mod.Sector` | Sector progress status |
| `getVehicleSpawnerCondition` | `mod.VehicleSpawner` | Vehicle spawnability, cooldown |

Internally, `mod.GetObjId(obj)` is used to distribute the state array for each ObjId.

# Get Players on a Team

## getPlayersInTeam

```ts
const team1Players = modlib.getPlayersInTeam(mod.GetTeam(1));
```

Returns the players belonging to the specified team as a JavaScript array.

The internal flow is as follows.

1. Get all players at `mod.AllPlayers()`
2. Read one by one at `mod.CountOf` and `mod.ValueInArray`
3. Compare the ObjId of `mod.GetTeam(player)` and the ObjId of the target team
4. Put the matched players into a JavaScript array

It can be used for team-based notifications, team-specific UI, and status resets for all teams.

```ts
for (const player of modlib.getPlayersInTeam(mod.GetTeam(1))) {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.attackTeam), player);
}
```

# Create UI in JSON-like Style with ParseUI

`ParseUI` is a function that allows you to write long arguments for `AddUIContainer`, `AddUIText`, `AddUIImage`, and `AddUIButton` as JSON-like objects.

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

## Corresponding type

| type | Function called internally | What it creates |
| --- | --- | --- |
| `Container` | `mod.AddUIContainer` | UI parent frame |
| `Text` | `mod.AddUIText` | Text display |
| `Image` | `mod.AddUIImage` | Image display |
| `Button` | `mod.AddUIButton` | UI button |

With `children`, you can attach Text and Button widgets under a Container.

## Coordinates and colors can also be written as arrays

Inside `ParseUI`, `__asModVector` converts `number[]` to `mod.Vector`.

```ts
position: [50, 100]
size: [300, 80]
bgColor: [0.2, 0.2, 0.2]
```

For a 2-element array, Z is treated as 0.
If there are 3 elements, it will be X/Y/Z.

## Notes on textLabel and Message

Text `textLabel` is internally converted to `mod.Message(textLabel)` if it is a string.
As a rule, text shown on the player's screen should be registered in `Strings.json` in advance.
For text that appears on screen, such as `textLabel`, notifications, WorldIcon text, and `SetUITextLabel`, use keys from `Strings.json`.

```ts
textLabel: mod.Message(mod.stringkeys.start)
```

If you want to insert a variable, place `{}` on the `Strings.json` side and pass the value to the second argument of `mod.Message`.

```json
{
  "testName": "test name:{}",
  "defendSeconds": "defend:{}s"
}
```

```ts
textLabel: mod.Message(mod.stringkeys.testName, "player1")
```

In this case, the screen will display something like `test name:player1`.
You can use up to 3 additional arguments for `mod.Message`.

## You can narrow down the display target

By specifying `teamId` or `playerId`, you can narrow down what is displayed in the UI.

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

Its name is `playerId`, but its type is `mod.Player`.
It's not a numeric ID.

## Notes on ParseUI

`ParseUI` is useful, but it does not recreate it every frame.

Since UI tends to be expensive to generate, the basic policy is as follows.

1. Create when starting or joining the game
2. Get it at `FindUIWidgetWithName`
3. Update with `SetUITextLabel` or `SetUIWidgetVisible`
4. When it is no longer needed, delete it with `DeleteUIWidget`

In particular, avoid continuously calling `ParseUI` in the `Ongoing...` series.

# Notification and Message Display Helpers

## ShowNotificationMessage

```ts
modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.goEntrance), eventPlayer);
```

Display the upper right notification.
If you omit the target, it will be displayed to everyone, and if you pass `Player`, it will be displayed individually.

Internally it calls `mod.DisplayNotificationMessage`.

## ShowHighlightedGameModeMessage

```ts
modlib.ShowHighlightedGameModeMessage(mod.Message(mod.stringkeys.targetCaptured));
```

Displays a highlighted message on the world log on the minimap.
Internally it calls `mod.DisplayHighlightedWorldLogMessage`.

## ShowEventGameModeMessage

```ts
modlib.ShowEventGameModeMessage(mod.Message(mod.stringkeys.roundStart));
```

Displays a large game mode message style UI at the top of the screen.

Looking at the comments in `index.ts`, it is created as an alternative implementation until the original `DisplayGameModeMessage` is fixed.
Internally, create a temporary UI with `AddUIText`, wait 6 seconds, and then delete it with `DeleteUIWidget`.

In other words, this is not a pure Portal standard message, but an "alternative display created in the UI."
It is useful for short-term guidance, but if you press it repeatedly, it is likely to cause collisions and display overwriting of widgets with the same name, so avoid calling it frequently.

## DisplayCustomNotificationMessage

```ts
modlib.DisplayCustomNotificationMessage(
  mod.Message(mod.stringkeys.defending),
  mod.CustomNotificationSlots.MessageText1,
  5,
  eventPlayer
);
```

Displays a custom notification slot-like UI.
You can omit the target or specify `Player` or `Team`.

If you pass `Team`, get the team members with `getPlayersInTeam` and create a separate UI for each player.

For `duration > 0`, it will be automatically deleted after the specified number of seconds.
If `duration` is set to 0 or less, it will not be automatically deleted, so we will design to call `ClearCustomNotificationMessage` later.

## ClearCustomNotificationMessage

```ts
modlib.ClearCustomNotificationMessage(
  mod.CustomNotificationSlots.MessageText1,
  eventPlayer
);
```

Delete the custom notification UI for the specified slot.
If there is no target, it is deleted for all players. If the target is `Player`, it is deleted for that player. If the target is `Team`, it is deleted for every player on that team.

Internally, `FindUIWidgetWithName` and `DeleteUIWidget` are used.
It is wrapped in `try/catch` in case the target to delete is not found.

## ClearAllCustomNotificationMessages

```ts
modlib.ClearAllCustomNotificationMessages(eventPlayer);
```

Clears custom notification slots for specified players all at once.
Target is only `Player`.

Delete HeaderText, MessageText1, MessageText2, MessageText3, and MessageText4 in order.

# List of public functions

## Basics/Conditions/Arrays

| Function | Purpose | Return value |
| --- | --- | --- |
| `Concat(s1, s2)` | Concatenate strings | `string` |
| `And(...rest)` | Determine whether multiple boolean values are all true | `boolean` |
| `AndFn(...rest)` | Determine whether all multiple conditional functions are true | `boolean` |
| `IfThenElse(condition, ifTrue, ifFalse)` | Evaluate and return only one function depending on the condition | `T` |
| `Equals(a, b)` | `mod.Equals` to compare two values | `boolean` |
| `WaitUntil(delay, cond)` | Wait the specified number of seconds or exit if the condition becomes true midway | `Promise<void>` |
| `ConvertArray(array)` | Convert `mod.Array` to JavaScript array | `any[]` |
| `FilteredArray(array, cond)` | Filter by conditions on `mod.Array` | `mod.Array` |
| `IndexOfFirstTrue(array, cond, arg)` | Returns the first element number that satisfies the condition | `number` |
| `IsTrueForAll(array, condition, arg)` | Determine if all elements satisfy the condition | `boolean` |
| `IsTrueForAny(array, condition, arg)` | Determine whether any one element satisfies the condition | `boolean` |
| `SortedArray(array, compare)` | Returns a sorted copy of a JavaScript array | `any[]` |

## ObjId/condition status

| Functions/Classes | Purpose |
| --- | --- |
| `getPlayerId(player)` | Get ObjId of Player |
| `getTeamId(team)` | Get ObjId of Team |
| `ConditionState` | State class that passes only the moment it changes from false to true |
| `getGlobalCondition(n)` | Get global condition state |
| `getPlayerCondition(obj, n)` | Get condition status by Player |
| `getTeamCondition(team, n)` | Get condition status by Team |
| `getCapturePointCondition(obj, n)` | Get condition status by CapturePoint |
| `getMCOMCondition(obj, n)` | Get condition status by MCOM |
| `getVehicleCondition(obj, n)` | Get condition status by Vehicle |
| `getHQCondition(obj, n)` | Get condition status by HQ |
| `getSectorCondition(obj, n)` | Get condition status by sector |
| `getVehicleSpawnerCondition(obj, n)` | Get condition state by VehicleSpawner |

## Team/UI/Notifications

| Function | Purpose |
| --- | --- |
| `getPlayersInTeam(teamObj)` | Returns an array of players belonging to the specified team |
| `ParseUI(...params)` | Create UI widget from JSON-like parameters |
| `DisplayCustomNotificationMessage(msg, custom, duration, target)` | Show custom notification UI |
| `ShowEventGameModeMessage(event, target)` | Display game mode message style UI |
| `ShowHighlightedGameModeMessage(event, target)` | Show highlighted world log messages |
| `ShowNotificationMessage(msg, target)` | Display top right notification |
| `ClearAllCustomNotificationMessages(target)` | Delete all custom notifications for the specified player |
| `ClearCustomNotificationMessage(custom, target)` | Delete specified custom notification slot |

# Practical Notes

## Prefer modlib by Default, and Use mod Only Where Needed

In this book, implementation uses `modlib` first.
Use what `modlib` already provides first, such as `ShowNotificationMessage`, `getTeamId`, `ConvertArray`, `ConditionState`, and `ParseUI`.

Then use `mod` only for features that are not available in `modlib`, or for code where you need direct control over detailed `mod` arguments.
If it doesn't work, check which `mod` function is called within `modlib`.
For example, if `ShowNotificationMessage` is behaving strangely, look at how `mod.DisplayNotificationMessage` is finally called.

## Don't do heavy processing with Ongoing

`ConvertArray(mod.AllPlayers())`, `getPlayersInTeam`, and `ParseUI` are useful, but calling them every frame becomes expensive.

Here is an example to avoid in particular.

```ts
export function OngoingGlobal(): void {
  modlib.ParseUI({ name: "Debug", type: "Text", textLabel: mod.Message(mod.stringkeys.debug) });
}
```

Create the UI once and update only the displayed content.

## WaitUntil is not a universal timer

At `WaitUntil`, there is a note from the SDK side stating that "it may be too long to wait."
Internally, conditions are checked every 0.2 seconds.

For processes that require strict timing, prioritize dedicated state management and events.

## Keep a Ledger of Condition Numbers

The numbers `getGlobalCondition(0)` and `getPlayerCondition(player, 2)` become meaningless as they increase.

It is safer to define constants.

```ts
const CONDITION_READY = 0;
const CONDITION_LOW_HEALTH = 1;

const readyState = modlib.getGlobalCondition(CONDITION_READY);
```

Keep a ledger for Condition numbers just like the ObjId ledger.

## Don't let UI names collide

`ParseUI` and notification system use `FindUIWidgetWithName` and `DeleteUIWidget`.
If you create multiple UIs with the same name, you may get or delete unintended widgets.

If you have a player-based UI, including ObjId in the name will reduce accidents.

```ts
const name = `Timer_${mod.GetObjId(eventPlayer)}`;
```

# The First 5 Things to Remember

You don't need to memorize everything at once.
Initially, the following five are sufficient.

| Function | Reason |
| --- | --- |
| `ShowNotificationMessage` | You can write short notifications in the upper right |
| `getTeamId` | Team comparisons are easier to read |
| `ConvertArray` | `mod.Array` can be treated as a normal array |
| `ConditionState` / `getGlobalCondition` | Prevents repeated firing |
| `ParseUI` | Create complex UIs at once |

# Summary

`modlib` is a helper library for using the BF6 Portal SDK more easily.

However, it is not a magic library.
Inside, it is TypeScript code that calls the `mod` API.
That's why when you have trouble, you can follow the mechanism by reading `index.ts`.

In this book, we recommend using `modlib` first, and then directly using `mod` only where necessary.
If you are confused about detailed usage, please return to the list of functions and notes in Appendix C.
