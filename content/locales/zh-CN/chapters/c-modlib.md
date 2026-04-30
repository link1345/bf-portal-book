---
title: "附录 C：modlib 说明：让 SDK 更容易使用的辅助库"
free: true
---

# 什么是 modlib？

`modlib` 是 BF6 Portal SDK 附带的 TypeScript 辅助库。
位置是 `code/modlib/index.ts`。

Portal 的主要 API 位于 `mod` 命名空间中。
例如 `mod.DisplayNotificationMessage`、`mod.GetObjId`、`mod.AllPlayers`、`mod.AddUIText` 等函数。

另一方面，`modlib` 并不是 `mod` 的直接替代。
它是构建在 `mod` 之上的便利函数集合，用来缩短经常编写的处理，并稍微隐藏 Portal 特有的难用之处。

本书的基本方针是优先使用 `modlib`。
通知、获取队伍内玩家、转换 Portal 数组、让条件只触发一次、生成 UI 等，如果 `modlib` 已经提供，请先考虑使用 `modlib`。
只有在 `modlib` 没有对应功能，或需要细致控制行为时，才直接使用 `mod`。

使用时，在脚本开头加载。

```ts
import * as modlib from "modlib";
```

然后像这样调用：

```ts
export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.welcome), eventPlayer);
}
```

# mod 和 modlib 的关系

`mod` 是 Portal 的官方 API 主体。
真正向 Portal 发出命令的函数，例如游戏内事件、玩家操作、UI 生成、声音、载具、目标、坐标计算等，基本都位于 `mod`。

`modlib` 是使用 `mod` 创建的辅助层。
例如：

| 类型 | 直接用 mod 写时 | modlib 的帮助 |
| --- | --- | --- |
| 通知显示 | 需要根据有无对象分别调用函数 | 用 `ShowNotificationMessage` 统一处理 |
| 获取队伍内玩家 | 遍历 `AllPlayers` 并比较 `GetTeam` | 用 `getPlayersInTeam` 封装 |
| Portal 数组处理 | 用 `CountOf` / `ValueInArray` 读取 `mod.Array` | 用 `ConvertArray` 转换为 JavaScript 数组 |
| 条件只触发一次 | 自己保存状态标志 | 使用 `ConditionState` 和 `get...Condition` |
| UI 生成 | `AddUIText` 和 `AddUIContainer` 的参数很长 | 用 `ParseUI` 以 JSON 风格编写 |

换句话说，`modlib` 是一个“让 Portal 的标准 API 像 TypeScript 一样更容易使用的工具箱”。

# 使用顺序方针

本书建议先使用 `modlib`，只有必要时才直接使用 `mod`。

原因很简单。
`modlib` 将 Portal 制作中经常出现的麻烦处理整理成较短、较安全的写法。
与其每次都扫描 `AllPlayers`、根据通知对象分开调用函数、排列很长的 UI 参数，不如先使用 `modlib` 的函数，这样更容易阅读。

用法如下。

| 状况 | 推荐 |
| --- | --- |
| 想要通知、队伍获取、数组转换、条件管理、UI 生成 | 先使用 `modlib` |
| 多次编写通知显示 | 使用 `modlib.ShowNotificationMessage` 等 |
| `mod.Array` 的遍历变多 | 使用 `ConvertArray` 或 `FilteredArray` |
| 只想在 `Ongoing...` 中条件变为 true 的瞬间处理 | 使用 `ConditionState` / `get...Condition` |
| 大量创建 UI | 考虑 `ParseUI` |
| 想使用 `modlib` 中没有的 Portal API | 直接使用 `mod` |
| 不理解行为，想调试 | 阅读 `modlib` 的内容，必要时回到直接调用 `mod` |

但是，`modlib` 的内容是调用 `mod` API 的 TypeScript 代码。
即使你更喜欢使用 `modlib`，当你遇到困难时能够阅读 `index.ts` 也是一个好主意。
请把本附录 C 当作按函数查阅的字典。

# 整体结构

`index.ts` 大致可以分为以下五个部分。

| 范围 | 内容 |
| --- | --- |
| 字符串、条件、数组辅助 | `Concat`、`And`、`ConvertArray`、`FilteredArray` 等 |
| ObjId 和条件状态 | `getPlayerId`、`ConditionState`、`getPlayerCondition` 等 |
| 队伍辅助 | `getPlayersInTeam` |
| JSON 风格 UI 生成 | `ParseUI` 和内部的 `__addUI...` 系列 |
| 通知 / 消息显示 | `ShowNotificationMessage`、`ShowEventGameModeMessage`、`DisplayCustomNotificationMessage` 等 |

文件中还有以 `__` 开头的函数，例如 `__asModVector`、`__addUIText` 等。
这些是供内部实现使用的。
基本上，不要直接从外部调用它，而是使用公开的 `export function`。

# 基本语法辅助

## Concat

```ts
modlib.Concat("A", "B");
```

连接两个字符串。
Portal API 端也有 `mod.Concat`，但 `modlib.Concat` 只是将普通 TypeScript 字符串与 `+` 组合在一起。

用途很简单。
想组装字符串时可以使用它。
不过在 TypeScript 中，模板字符串通常更容易阅读。

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

按顺序查看多个真伪值，如果全部都是 `true`，则返回 `true`。
如果有一个 `false`，它就会停在那里。

`mod.And` 有两个参数，但 `modlib.And` 具有可变长度。
当存在三个或更多条件时，它会变得更容易阅读。

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

`AndFn` 接收多个“返回 boolean 的函数”而不是boolean 值本身。
从左到右依次执行，中途变为 `false` 时，后面的函数不会执行。

通过放置较重的条件或稍后想要避免副作用的条件，可以减少不必要的处理。

## IfThenElse

```ts
const label = modlib.IfThenElse(
  isAttackTeam,
  () => "攻撃",
  () => "防衛"
);
```

如果条件为`true`，则返回`ifTrue()`的结果，如果条件为`false`，则返回`ifFalse()`的结果。

它与 `mod.IfThenElse` 类似，但 `modlib.IfThenElse` 是传递函数的一种形式。
当你只想评估必要的一侧时，可以使用它。

## Equals

```ts
if (modlib.Equals(mod.GetTeam(player), mod.GetTeam(1))) {
  // Team 1
}
```

内部会调用 `mod.Equals(a, b)`。
但是，如果其中一个是 `null`，则包含 `debugger`。

这是一个旨在“更容易注意到空比较”的实现，但请在发布前的代码中注意这一点。
尽管这对于调查原因很有用，但它可能会导致调试器意外停止。

# Portal 数组辅助

Portal SDK 中的 `mod.Array` 不是普通的 JavaScript 数组。
需要用 `mod.CountOf` 和 `mod.ValueInArray` 读取，而不是 `for ... of` 或 `array.length`。

`modlib` 有一个函数可以填补这个差异。

## ConvertArray

```ts
const players = modlib.ConvertArray(mod.AllPlayers()) as mod.Player[];
```

将 `mod.Array` 转换为 JavaScript 数组。

在内部，流程如下。

1. 使用 `mod.CountOf(array)` 获取元素数量
2. 用 `mod.ValueInArray(array, i)` 逐个读取
3. `push` 到 JavaScript 数组

当你想像普通 TypeScript 数组一样处理 `AllPlayers()` 或 `GetPlayersOnPoint()` 的结果时，这很有用。

## FilteredArray

```ts
const team1Players = modlib.FilteredArray(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

过滤 `mod.Array` 并将其作为新的 `mod.Array` 返回。
请注意，返回值是 `mod.Array` 而不是 JavaScript 数组。

内部使用 `ConvertArray` 转换为 JavaScript 数组，只有满足条件的元素才会使用 `mod.AppendToArray` 返回到 Portal 数组中。

## IndexOfFirstTrue

```ts
const index = modlib.IndexOfFirstTrue(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.IsPlayerValid(player);
});
```

返回条件首先变为 `true` 的元素的索引。
如果未找到，请使用 `-1`。

它可以用于“搜索第一个有效玩家”和“搜索第一个符合条件的车辆”等目的。

## IsTrueForAll

```ts
const allReady = modlib.IsTrueForAll(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return isPlayerReady(player);
});
```

判断`mod.Array`的所有元素是否满足条件。
如果至少有一个是 `false`，则它是 `false`。

## IsTrueForAny

```ts
const hasAttacker = modlib.IsTrueForAny(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

判断 `mod.Array` 中是否有一个满足条件。

## SortedArray

```ts
const sorted = modlib.SortedArray(players, (a, b) => {
  return mod.GetPlayerKills(b) - mod.GetPlayerKills(a);
});
```

复制 JavaScript 数组并返回按比较函数排序的新数组。
这里得到的是 `any[]`，不是 `mod.Array`。

它假定先用 `ConvertArray` 转换后再使用。

# ObjId 获取辅助

## getPlayerId

```ts
const id = modlib.getPlayerId(eventPlayer);
```

内部会调用 `mod.GetObjId(player)`。
获取玩家的 ObjId 作为数字。

## getTeamId

```ts
const teamId = modlib.getTeamId(mod.GetTeam(eventPlayer));
```

内部会调用 `mod.GetObjId(team)`。
当你想要将队伍作为数字 ID 进行比较时，请使用此选项。

它也用在正文的第 6b 章中，以使队伍比较更易于阅读。

```ts
const eventTeamId = modlib.getTeamId(eventTeam);
const teamId = modlib.getTeamId(team);
```

# 处理条件的“上升沿”

Portal 中会持续调用 `Ongoing...` 系列事件。
如果在条件为 true 的整段时间都运行处理，同一个通知、同一次加分、同一个生成就会反复执行。

因此，`modlib` 具有“仅在从 false 变为 true 时才通过”的状态管理。

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

`ConditionState` 是一个记住先前状态的小类。

`update(newState)` 的工作原理如下：

| 上一次 | 这一次 | 返回值 | 含义 |
| --- | --- | --- | --- |
| false | false | false | 条件尚未成立 |
| false | true | true | 条件成立的瞬间 |
| true | true | false | 条件仍成立，但不再通过 |
| true | false | false | 重置 |

换句话说，当 `true` 继续时，它只会传递一次。
一旦返回到`false`，就会再次经过下一个`true`。

建议不要在 `update()` 中直接写很长的条件式。
如果将其分为 `hasEnoughPlayersToStart()`、`isStartInteract()`、`canReachTarget()` 等决策函数，就可以通过名称读出“正在等待什么”。
Portal 中粘贴的代码注释请使用简短英文，以避免多字节字符。

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

按数字获取全局条件状态。
通过划分 `0`、`1`、`2` 等数字，你可以分别管理多个条件。

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

每个玩家都有一个条件状态。
即使 Condition 编号相同，每个玩家也会有不同的条件。

## getTeamCondition

```ts
const condition = modlib.getTeamCondition(mod.GetTeam(1), 0);
```

每个队伍都有一个条件状态。
可用于实现队伍目标、达到分数、人数条件等。

## 按对象区分的 Condition

以下函数对每个对象都有一个条件状态。

| 函数 | 对象 | 使用场景 |
| --- | --- | --- |
| `getCapturePointCondition` | `mod.CapturePoint` | 占领开始、占领完成、人数变化 |
| `getMCOMCondition` | `mod.MCOM` | 装设状态、解除状态、破坏状态 |
| `getVehicleCondition` | `mod.Vehicle` | 乘坐、破坏、速度条件 |
| `getHQCondition` | `mod.HQ` | HQ 启用、所属队伍变化 |
| `getSectorCondition` | `mod.Sector` | Sector 推进状态 |
| `getVehicleSpawnerCondition` | `mod.VehicleSpawner` | 车辆能否生成、冷却时间 |

在内部，`mod.GetObjId(obj)` 用于分配每个 ObjId 的状态数组。

# 获取队伍内玩家

## getPlayersInTeam

```ts
const team1Players = modlib.getPlayersInTeam(mod.GetTeam(1));
```

以 JavaScript 数组返回属于指定队伍的玩家。

内部流程如下。

1. 获取所有玩家 `mod.AllPlayers()`
2. 用 `mod.CountOf` 和 `mod.ValueInArray` 逐个读取
3. 比较 `mod.GetTeam(player)` 的 ObjId 和目标队伍的 ObjId
4. 将匹配的玩家放入 JavaScript 数组中

它可用于基于队伍的通知、特定于队伍的 UI 以及所有队伍的状态重置。

```ts
for (const player of modlib.getPlayersInTeam(mod.GetTeam(1))) {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.attackTeam), player);
}
```

# 用 ParseUI 以 JSON 风格创建 UI

`ParseUI` 是一个函数，允许你将 `AddUIContainer`、`AddUIText`、`AddUIImage` 和 `AddUIButton` 的长参数编写为JSON 风格的对象。

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

## 对应类型

| type | 内部调用的函数 | 创建的内容 |
| --- | --- | --- |
| `Container` | `mod.AddUIContainer` | UI 的父框 |
| `Text` | `mod.AddUIText` | 文本显示 |
| `Image` | `mod.AddUIImage` | 图像显示 |
| `Button` | `mod.AddUIButton` | UI 按钮 |

使用 `children` 可以把 Text 或 Button 挂在 Container 下。

## 坐标和颜色也可以写成数组

`ParseUI` 在内部，会使用 `__asModVector` 将 `number[]` 转换为 `mod.Vector`。

```ts
position: [50, 100]
size: [300, 80]
bgColor: [0.2, 0.2, 0.2]
```

对于 2 个元素的数组，Z 被视为 0。
如果有 3 个元素，则为 X/Y/Z。

## 关于 textLabel 和 Message 的注释

Text 的 `textLabel` 如果是字符串，会在内部转换为 `mod.Message(textLabel)`。
不过，显示在玩家画面上的文字，原则上应事先注册到 `Strings.json`。
`textLabel`、通知、WorldIcon 文本、`SetUITextLabel` 等显示在画面上的文字，请使用 `Strings.json` 的键。

```ts
textLabel: mod.Message(mod.stringkeys.start)
```

如果要插入变量，请将 `{}` 放在 `Strings.json` 一侧，并将值传递给 `mod.Message` 的第二个参数。

```json
{
  "testName": "test name:{}",
  "defendSeconds": "defend:{}s"
}
```

```ts
textLabel: mod.Message(mod.stringkeys.testName, "player1")
```

在这种情况下，屏幕将显示类似 `test name:player1` 的内容。
`mod.Message` 最多可以使用 3 个追加参数。

## 可以缩小显示目标

指定 `teamId` 或 `playerId` 可以缩小 UI 的显示对象。

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

它的名称是 `playerId`，但其类型是 `mod.Player`。
它不是数字 ID。

## ParseUI 的注意点

`ParseUI` 很有用，但它不会每帧都重新创建它。

由于 UI 的生成成本较高，因此基本策略如下。

1. 在游戏开始时或玩家加入时创建
2. 从 `FindUIWidgetWithName` 获取
3. 使用 `SetUITextLabel` 或 `SetUIWidgetVisible` 进行更新
4. 当不再需要时，使用 `DeleteUIWidget` 删除它

特别是避免在 `Ongoing...` 系列中连续调用 `ParseUI` 。

# 通知 / 消息显示辅助

## ShowNotificationMessage

```ts
modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.goEntrance), eventPlayer);
```

显示右上角的通知。
如果省略目标，则会向所有人显示，如果传递 `Player`，则会单独显示。

内部会调用 `mod.DisplayNotificationMessage`。

## ShowHighlightedGameModeMessage

```ts
modlib.ShowHighlightedGameModeMessage(mod.Message(mod.stringkeys.targetCaptured));
```

在小地图上的 World Log 中显示强调消息。
内部会调用 `mod.DisplayHighlightedWorldLogMessage`。

## ShowEventGameModeMessage

```ts
modlib.ShowEventGameModeMessage(mod.Message(mod.stringkeys.roundStart));
```

在画面顶部显示较大的游戏模式消息风格 UI。

查看 `index.ts` 中的注释，它是作为替代实现创建的，直到原本的 `DisplayGameModeMessage` 被修复。
在内部，使用 `AddUIText` 建立临时 UI，等待 6 秒，然后使用 `DeleteUIWidget` 将其删除。

换句话说，这不是纯粹的 Portal 标准消息，而是“用 UI 做出的替代显示”。
它对于短期引导很有用，但如果重复按下它，很可能会导致冲突并显示覆盖同名的Widget，因此请避免频繁调用它。

## DisplayCustomNotificationMessage

```ts
modlib.DisplayCustomNotificationMessage(
  mod.Message(mod.stringkeys.defending),
  mod.CustomNotificationSlots.MessageText1,
  5,
  eventPlayer
);
```

显示类似自定义通知槽的 UI。
对象可以省略，也可以指定 `Player` 或 `Team`。

如果传入 `Team`，会使用 `getPlayersInTeam` 获取队伍成员，并为每个玩家分别创建 UI。

`duration > 0` 时，会在指定秒数后自动删除。
如果 `duration` 设置为 0 以下，则不会自动删除，因此应设计为稍后调用 `ClearCustomNotificationMessage`。

## ClearCustomNotificationMessage

```ts
modlib.ClearCustomNotificationMessage(
  mod.CustomNotificationSlots.MessageText1,
  eventPlayer
);
```

删除指定槽位的自定义通知 UI。
如果没有目标，则会从所有玩家中删除，如果是 `Player` 则会从个人中删除，如果是 `Team` 则会从整个队伍中删除。

在内部，使用 `FindUIWidgetWithName` 和 `DeleteUIWidget`。
为防止找不到删除对象，内部用 `try/catch` 包住了处理。

## ClearAllCustomNotificationMessages

```ts
modlib.ClearAllCustomNotificationMessages(eventPlayer);
```

一次性清除指定玩家的自定义通知槽。
目标仅为 `Player`。

会按顺序删除 HeaderText、MessageText1、MessageText2、MessageText3 和 MessageText4。

# 公开函数列表

## 基础知识/条件/数组

| 函数 | 目的 | 返回值 |
| --- | --- | --- |
| `Concat(s1, s2)` | 连接字符串 | `string` |
| `And(...rest)` | 判断多个真伪值是否全部为 true | `boolean` |
| `AndFn(...rest)` | 判断多个条件函数是否全部为 true | `boolean` |
| `IfThenElse(condition, ifTrue, ifFalse)` | 根据条件只评估其中一个函数并返回结果 | `T` |
| `Equals(a, b)` | 用 `mod.Equals` 比较两个值 | `boolean` |
| `WaitUntil(delay, cond)` | 等待指定秒数，或中途条件变为 true 时退出 | `Promise<void>` |
| `ConvertArray(array)` | 将 `mod.Array` 转换为 JavaScript 数组 | `any[]` |
| `FilteredArray(array, cond)` | 按条件筛选 `mod.Array` | `mod.Array` |
| `IndexOfFirstTrue(array, cond, arg)` | 返回最先满足条件的元素编号 | `number` |
| `IsTrueForAll(array, condition, arg)` | 判断所有元素是否满足条件 | `boolean` |
| `IsTrueForAny(array, condition, arg)` | 判断是否有任意一个元素满足条件 | `boolean` |
| `SortedArray(array, compare)` | 返回 JavaScript 数组排序后的副本 | `any[]` |

## ObjId/条件状态

| 函数 / 类 | 目的 |
| --- | --- |
| `getPlayerId(player)` | 获取 Player 的 ObjId |
| `getTeamId(team)` | 获取 Team 的 ObjId |
| `ConditionState` | 只在 false 变为 true 的瞬间通过的状态类 |
| `getGlobalCondition(n)` | 获取全局条件状态 |
| `getPlayerCondition(obj, n)` | 获取 Player 别的条件状态 |
| `getTeamCondition(team, n)` | 获取 Team 别的条件状态 |
| `getCapturePointCondition(obj, n)` | 获取 CapturePoint 别的条件状态 |
| `getMCOMCondition(obj, n)` | 获取 MCOM 别的条件状态 |
| `getVehicleCondition(obj, n)` | 获取 Vehicle 别的条件状态 |
| `getHQCondition(obj, n)` | 获取 HQ 别的条件状态 |
| `getSectorCondition(obj, n)` | 获取 Sector 别的条件状态 |
| `getVehicleSpawnerCondition(obj, n)` | 获取 VehicleSpawner 别的条件状态 |

## 队伍/UI/通知

| 函数 | 目的 |
| --- | --- |
| `getPlayersInTeam(teamObj)` | 返回属于指定 Team 的玩家数组 |
| `ParseUI(...params)` | 根据 JSON 风格参数创建 UI Widget |
| `DisplayCustomNotificationMessage(msg, custom, duration, target)` | 显示自定义通知 UI |
| `ShowEventGameModeMessage(event, target)` | 显示游戏模式消息风格 UI |
| `ShowHighlightedGameModeMessage(event, target)` | 显示强调的 World Log 消息 |
| `ShowNotificationMessage(msg, target)` | 显示右上通知 |
| `ClearAllCustomNotificationMessages(target)` | 删除指定玩家的所有自定义通知 |
| `ClearCustomNotificationMessage(custom, target)` | 删除指定自定义通知槽 |

# 实践中需要注意的地方

## 基本优先使用 modlib，只在必要处使用 mod

本书在实现时优先使用 `modlib`。
`ShowNotificationMessage`、`getTeamId`、`ConvertArray`、`ConditionState`、`ParseUI` 等，`modlib` 已经提供的东西请先使用。

然后，只有 `modlib` 中没有的功能，或需要直接控制 `mod` 详细参数的处理，才使用 `mod`。
如果不起作用，请检查 `modlib` 中调用了哪个 `mod` 函数。
例如，如果 `ShowNotificationMessage` 的行为很奇怪，请查看 `mod.DisplayNotificationMessage` 最终是如何调用的。

## 不要使用 Ongoing 进行繁重的处理

`ConvertArray(mod.AllPlayers())`、`getPlayersInTeam` 和 `ParseUI` 很有用，但每帧调用都会变重。

下面是特别应该避免的例子。

```ts
export function OngoingGlobal(): void {
  modlib.ParseUI({ name: "Debug", type: "Text", textLabel: mod.Message(mod.stringkeys.debug) });
}
```

创建一次 UI，仅更新显示的内容。

## WaitUntil 不是通用计时器

`WaitUntil` 的 SDK 侧注释中有“可能等待过长”。
在内部，每 0.2 秒检查一次条件。

对于需要严格计时的流程，请优先考虑专用状态管理和事件。

## 将 Condition 编号台账化

数字 `getGlobalCondition(0)` 和 `getPlayerCondition(player, 2)` 随着它们的增加而变得毫无意义。

将它们定义为常量会更安全。

```ts
const CONDITION_READY = 0;
const CONDITION_LOW_HEALTH = 1;

const readyState = modlib.getGlobalCondition(CONDITION_READY);
```

请像 ObjId 台账一样，也为 Condition 编号建立台账。

## 不要让 UI 名称发生冲突

`ParseUI` 和通知系统使用 `FindUIWidgetWithName` 和 `DeleteUIWidget`。
如果你创建多个具有相同名称的 UI，则可能会获取或删除意外的 Widget。

如果你有一个基于玩家的 UI，在名称中包含 ObjId 会减少意外。

```ts
const name = `Timer_${mod.GetObjId(eventPlayer)}`;
```

# 首先要记住这 5 件事

你不需要一次性记住所有内容。
最初，以下五个就足够了。

| 函数 | 理由 |
| --- | --- |
| `ShowNotificationMessage` | 可以简短地写出右上通知 |
| `getTeamId` | 队伍比较更容易阅读 |
| `ConvertArray` | 可以把 `mod.Array` 当作普通数组处理 |
| `ConditionState` / `getGlobalCondition` | 可以防止多重触发 |
| `ParseUI` | 可以集中创建复杂 UI |

# 总结

`modlib` 是一个让 BF6 Portal SDK 更容易使用的辅助库。

然而，不过，它不是魔法库。
里面是调用 `mod` API 的 TypeScript 代码。
这就是为什么当你遇到麻烦时，你可以通过阅读 `index.ts` 来遵循该机制。

在本书中，我们建议首先使用 `modlib`，然后仅在必要时直接使用 `mod`。
如果你对详细用法感到困惑，请回到附录 C 的函数列表和注意点。
