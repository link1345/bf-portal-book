---
title: "附录C：modlib解释 使SDK更容易使用的辅助库"
free: true
---

# 什么是 modlib？

`modlib` 是 BF6 Portal SDK 附带的 TypeScript 辅助库。
位置是 `code/modlib/index.ts`。

Portal 的主要 API 位于 `mod` 命名空间中。
例如，类似 `mod.DisplayNotificationMessage`、`mod.GetObjId`、`mod.AllPlayers`、`mod.AddUIText` 的函数。

另一方面，`modlib` 并不是 `mod` 的直接替代。
这是一个构建在 `mod` 之上的“有用函数集合”，用于缩短频繁编写的流程并隐藏 Portal 的一些独特的处理困难。

在本文档中，我们将优先使用 `modlib` 作为基本策略。
`modlib`中提供的流程，如通知、获取队伍中的玩家、转换传送阵、触发条件一次、生成UI等，请先考虑`modlib`。
仅对于 `modlib` 中不可用的功能或您想要详细控制其行为的进程，直接使用 `mod` 。

使用时，在脚本开头加载。

```ts
import * as modlib from "modlib";
```

并这样称呼它：

```ts
export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.welcome), eventPlayer);
}
```

# mod和modlib之间的关系

`mod` 是 Portal 的官方 API 主体。
真正向Portal发出命令的功能，比如游戏内事件、玩家操作、UI生成、声音、载具、目标、坐标计算等，基本都位于`mod`。

`modlib` 是使用 `mod` 创建的辅助层。
例如：

|类型 |直接用mod写| modlib 可以提供哪些帮助 |
| --- | --- | --- |
|通知显示 |需要根据是否有目标来不同地调用函数 |摘要位于 `ShowNotificationMessage` |
|让球员加入球队|转动 `AllPlayers` 并比较 `GetTeam` |总结一下 `getPlayersInTeam` |
|门户阵列处理|阅读 `mod.Array` 和 `CountOf` / `ValueInArray` |使用 `ConvertArray` 转换为 JavaScript 数组 |
|仅触发一次条件 |拥有自己的国旗 |使用 `ConditionState` 和 `get...Condition` |
|用户界面生成 | `AddUIText` 和 `AddUIContainer` 的参数很长 |您可以使用 `ParseUI` | 以 JSON 风格编写

换句话说，`modlib` 是一个“让 Portal 的标准 API 像 TypeScript 一样更容易使用的工具箱”。

# 使用订单策略

本书中的建议是先使用`modlib`，只有必要时才直接使用`mod`。

原因很简单。
`modlib` 以简短且安全的方式总结了门户制作中经常出现的麻烦流程。
与其每次都扫描 `AllPlayers`，调用是否有通知目标，或者列出很长的 UI 参数，不如先使用 `modlib` 函数，这样会更容易阅读。

用法如下。

|状态 |推荐 |
| --- | --- |
|我想要执行通知、团队采集、数组转换、条件管理和 UI 生成 |首先，使用 `modlib` |
|多次写入通知显示|使用 `modlib.ShowNotificationMessage` 等 |
|增加了对 `mod.Array` 的扫描 |使用 `ConvertArray` 和 `FilteredArray` |
|我只想在 `Ongoing...` | 条件变为真时进行处理使用 `ConditionState` / `get...Condition` |
|创建大量UI |考虑 `ParseUI` |
|我想使用 `modlib` | 中不可用的 Portal API直接使用`mod` |
|我不理解这种行为并想调试它 |读取 `modlib` 的内容，并在必要时恢复直接调用 `mod` |

但是，`modlib` 的内容是调用 `mod` API 的 TypeScript 代码。
即使您更喜欢使用 `modlib`，当您遇到困难时能够阅读 `index.ts` 也是一个好主意。
请参阅本附录 C 作为逐个功能详细信息的字典。

# 整体配置

`index.ts`大致可以分为以下五个部分。

|范围 |内容 |
| --- | --- |
|字符串、条件和数组方面的帮助 | `Concat`、`And`、`ConvertArray`、`FilteredArray` 等 |
| ObjId 和条件状态 | `getPlayerId`、`ConditionState`、`getPlayerCondition` 等 |
|团队协助| `getPlayersInTeam` | `getPlayersInTeam` |
| JSON 风格的 UI 生成 | `ParseUI` 和内部 `__addUI...` 系统 |
|通知/消息显示 | `ShowNotificationMessage`、`ShowEventGameModeMessage`、`DisplayCustomNotificationMessage` 等 |

文件中还有以 `__` 开头的函数，例如 `__asModVector`、`__addUIText` 等。
这些是供内部实施的。
基本上，不要直接从外部调用它，而是使用公共 `export function`。

# 基本语法帮助

## 连接

```ts
modlib.Concat("A", "B");
```

连接两个字符串。
Portal API 端也有 `mod.Concat`，但 `modlib.Concat` 只是将普通 TypeScript 字符串与 `+` 组合在一起。

申请很简单。
当您想要组装字符串时可以使用它。
然而，在 TypeScript 中，模板字符串通常更容易阅读。

```ts
const name = "Alpha";
const label = `Team ${name}`;
```

## 并且

```ts
if (modlib.And(isReady, hasPlayer, !isLocked)) {
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.ready));
}
```

按顺序查看多个布尔值，如果全部都是 `true`，则返回 `true`。
如果有一个 `false` ，它就会停在那里。

`mod.And` 有两个参数，但 `modlib.And` 具有可变长度。
当存在三个或更多条件时，它会变得更容易阅读。

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

`AndFn` 接收多个“返回布尔值的函数”而不是布尔值本身。
从左开始依次执行，中间如果到达`false`，则其余的不执行。

通过放置较重的条件或稍后想要避免副作用的条件，可以减少不必要的处理。

## 如果那么其他

```ts
const label = modlib.IfThenElse(
  isAttackTeam,
  () => "攻撃",
  () => "防衛"
);
```

如果条件为`true`，则返回`ifTrue()`的结果，如果条件为`false`，则返回`ifFalse()`的结果。

它与 `mod.IfThenElse` 类似，但 `modlib.IfThenElse` 是传递函数的一种形式。
当您只想评估必要的一面时，可以使用此方法。

## 等于

```ts
if (modlib.Equals(mod.GetTeam(player), mod.GetTeam(1))) {
  // Team 1
}
```

它在内部调用 `mod.Equals(a, b)`。
但是，如果其中一个是 `null`，则包含 `debugger`。

这是一个旨在“更容易注意到空比较”的实现，但请在发布之前小心代码。
尽管这对于调查原因很有用，但它可能会导致调试器意外停止。

# 帮助处理 Portal 数组

Portal SDK 中的 `mod.Array` 不是普通的 JavaScript 数组。
您应该阅读 `mod.CountOf` 和 `mod.ValueInArray` 而不是 `for ... of` 和 `array.length`。

`modlib` 有一个函数可以填补这个差异。

## 转换数组

```ts
const players = modlib.ConvertArray(mod.AllPlayers()) as mod.Player[];
```

将 `mod.Array` 转换为 JavaScript 数组。

在内部，流程如下。

1.使用`mod.CountOf(array)`获取元素数量
2、一一阅读`mod.ValueInArray(array, i)`
3. `push` 到 JavaScript 数组

当您想要像 TypeScript 一样处理 `AllPlayers()` 或 `GetPlayersOnPoint()` 的结果时，这非常有用。

## 过滤数组

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

## 对所有人来说都是真实的

```ts
const allReady = modlib.IsTrueForAll(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return isPlayerReady(player);
});
```

判断`mod.Array`的所有元素是否满足条件。
如果至少有一个是 `false`，则它是 `false`。

## 对于任何人都是真实的

```ts
const hasAttacker = modlib.IsTrueForAny(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

判断 `mod.Array` 中是否有一个满足条件。

## 排序数组

```ts
const sorted = modlib.SortedArray(players, (a, b) => {
  return mod.GetPlayerKills(b) - mod.GetPlayerKills(a);
});
```

复制 JavaScript 数组并返回按比较函数排序的新数组。
您在这里收到的是 `any[]` 而不是 `mod.Array`。

假设用`ConvertArray`转换后使用。

# 协助获取ObjId

## 获取玩家ID

```ts
const id = modlib.getPlayerId(eventPlayer);
```

它在内部调用 `mod.GetObjId(player)`。
获取玩家的 ObjId 作为数字。

## 获取团队ID

```ts
const teamId = modlib.getTeamId(mod.GetTeam(eventPlayer));
```

它在内部调用 `mod.GetObjId(team)`。
当您想要将团队作为数字 ID 进行比较时，请使用此选项。

它也用在正文的第 6b 章中，以使团队比较更易于阅读。

```ts
const eventTeamId = modlib.getTeamId(eventTeam);
const teamId = modlib.getTeamId(team);
```

# 处理条件的“上升”

Portal中持续调用`Ongoing...`系列事件。
如果在条件为真时运行该进程，则将一遍又一遍地执行相同的通知、相同的分数添加和相同的生成。

因此，`modlib` 具有“仅在从 false 变为 true 时才通过”的状态管理。

## 条件状态

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

|上一页 |这次|返回值 |意义|
| --- | --- | --- | --- |
|假 |假 |假 |尚未满足条件 |
|假 |真实 |真实 |条件满足的那一刻 |
|真实 |真实 |假 |已成立，但将不再被接受|
|真实 |假 |假 |重置|

换句话说，当 `true` 继续时，它只会传递一次。
一旦返回到`false`，就会再次经过下一个`true`。

我们建议您不要直接在 `update()` 中编写长条件表达式。
如果将其分为 `hasEnoughPlayersToStart()`、`isStartInteract()`、`canReachTarget()` 等决策函数，则可以通过名称读取“它在等待什么”。
请用简短的英文对门户上发布的代码进行注释，以避免使用多字节字符。

## 获取全局条件

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
通过划分 `0`、`1`、`2` 等数字，您可以分别管理多个条件。

## 获取玩家条件

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
即使条件编号相同，每个玩家也会有不同的条件。

## 获取团队条件

```ts
const condition = modlib.getTeamCondition(mod.GetTeam(1), 0);
```

每个团队都有一个条件状态。
可用于实现团队目标、达到分数、人数条件等。

## 按对象条件

以下函数对每个对象都有一个条件状态。

|功能|目标|何时使用 |
| --- | --- | --- |
| `getCapturePointCondition` | `getCapturePointCondition` | `mod.CapturePoint` | `mod.CapturePoint` |职业开始、职业完成、人数变化|
| `getMCOMCondition` | `getMCOMCondition` | `mod.MCOM` | `mod.MCOM` |布防状态、释放状态、破坏状态|
| `getVehicleCondition` | `getVehicleCondition` | `mod.Vehicle` | `mod.Vehicle` |登机、破坏和速度状况|
| `getHQCondition` | `getHQCondition` | `mod.HQ` | `mod.HQ` |总部启用，所有权团队变更 |
| `getSectorCondition` | `getSectorCondition` | `mod.Sector` | `mod.Sector` |行业进展状况 |
| `getVehicleSpawnerCondition` | `getVehicleSpawnerCondition` | `mod.VehicleSpawner` | `mod.VehicleSpawner` |车辆生成能力、冷却时间 |

在内部，`mod.GetObjId(obj)` 用于分配每个 ObjId 的状态数组。

# 获取团队中的玩家

## 获取团队中的玩家

```ts
const team1Players = modlib.getPlayersInTeam(mod.GetTeam(1));
```

以 JavaScript 数组的形式返回属于指定球队的球员。

内部流程如下。

1. 获取所有玩家 `mod.AllPlayers()`
2、一一阅读`mod.CountOf`和`mod.ValueInArray`
3、对比`mod.GetTeam(player)`的ObjId和目标团队的ObjId
4. 将匹配的玩家放入 JavaScript 数组中

它可用于基于团队的通知、特定于团队的 UI 以及所有团队的状态重置。

```ts
for (const player of modlib.getPlayersInTeam(mod.GetTeam(1))) {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.attackTeam), player);
}
```

# 以 JSON 风格 ParseUI 创建 UI

`ParseUI` 是一个函数，允许您将 `AddUIContainer`、`AddUIText`、`AddUIImage` 和 `AddUIButton` 的长参数编写为类似 JSON 的对象。

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

|类型 |内部调用的函数 |它创造了什么|
| --- | --- | --- |
| `Container` | `Container` | `mod.AddUIContainer` | `mod.AddUIContainer` | UI父框架|
| `Text` | `Text` | `mod.AddUIText` | `mod.AddUIText` |字符显示|
| `Image` | `Image` | `mod.AddUIImage` | `mod.AddUIImage` |图片展示|
| `Button` | `Button` | `mod.AddUIButton` | `mod.AddUIButton` |用户界面按钮 |

通过使用 `children`，您可以将文本和按钮挂在容器下。

## 坐标和颜色也可以写成数组

`ParseUI` 在内部，使用 `__asModVector` 将 `number[]` 转换为 `mod.Vector`。

```ts
position: [50, 100]
size: [300, 80]
bgColor: [0.2, 0.2, 0.2]
```

对于 2 元素数组，Z 被视为 0。
如果有 3 个元素，则为 X/Y/Z。

## 关于 textLabel 和 Message 的注释

如果文本 `textLabel` 是字符串，则会在内部转换为 `mod.Message(textLabel)`。
然而，在 `Strings.json` 上预先注册播放器屏幕上显示的字符是基本的。
对于屏幕上出现的字符，请使用 `Strings.json` 键，例如 `textLabel`、通知、WorldIcon 文本、`SetUITextLabel` 等。

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
对于 `mod.Message`，您最多可以使用 3 个附加参数。

## 可以缩小显示目标

通过指定 `teamId` 或 `playerId`，您可以缩小 UI 中显示的内容范围。

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

## ParseUI 的注释

`ParseUI` 很有用，但它不会每帧都重新创建它。

由于 UI 的生成成本往往很高，因此基本策略如下。

1.开始或加入游戏时创建
2. 从 `FindUIWidgetWithName` 获取
3. 使用 `SetUITextLabel` 或 `SetUIWidgetVisible` 进行更新
4. 当不再需要时，使用 `DeleteUIWidget` 删除它

特别是避免在 `Ongoing...` 系列中连续调用 `ParseUI` 。

# 通知/消息显示辅助

## 显示通知消息

```ts
modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.goEntrance), eventPlayer);
```

显示右上角的通知。
如果省略目标，则会向所有人显示，如果传递 `Player`，则会单独显示。

它在内部调用 `mod.DisplayNotificationMessage`。

## 显示突出显示的游戏模式消息

```ts
modlib.ShowHighlightedGameModeMessage(mod.Message(mod.stringkeys.targetCaptured));
```

在小地图上的世界日志上显示突出显示的消息。
它在内部调用 `mod.DisplayHighlightedWorldLogMessage`。

## 显示事件游戏模式消息

```ts
modlib.ShowEventGameModeMessage(mod.Message(mod.stringkeys.roundStart));
```

在屏幕顶部显示大型游戏模式消息样式 UI。

查看 `index.ts` 中的注释，它是作为替代实现创建的，直到原始的 `DisplayGameModeMessage` 被修复。
在内部，使用 `AddUIText` 创建临时 UI，等待 6 秒，然后使用 `DeleteUIWidget` 将其删除。

换句话说，这不是一个纯粹的Portal标准消息，而是“在UI中创建的替代显示”。
它对于短期引导很有用，但如果重复按下它，很可能会导致冲突并显示覆盖同名的小部件，因此请避免频繁调用它。

## 显示自定义通知消息

```ts
modlib.DisplayCustomNotificationMessage(
  mod.Message(mod.stringkeys.defending),
  mod.CustomNotificationSlots.MessageText1,
  5,
  eventPlayer
);
```

显示类似自定义通知槽的 UI。
您可以省略目标或指定 `Player` 或 `Team`。

如果您传递 `Team`，请使用 `getPlayersInTeam` 获取团队成员，并为每个玩家创建单独的 UI。

对于 `duration > 0`，会在指定秒数后自动删除。
如果 `duration` 设置为 0 或更少，则不会自动删除，因此我们将设计稍后调用 `ClearCustomNotificationMessage`。

## 清除自定义通知消息

```ts
modlib.ClearCustomNotificationMessage(
  mod.CustomNotificationSlots.MessageText1,
  eventPlayer
);
```

删除指定槽位的自定义通知 UI。
如果没有目标，则会从所有玩家中删除，如果是 `Player` 则会从个人中删除，如果是 `Team` 则会从整个团队中删除。

在内部，使用 `FindUIWidgetWithName` 和 `DeleteUIWidget`。
包装在 `try/catch` 中，以防发现没有任何内容被删除。

## 清除所有自定义通知消息

```ts
modlib.ClearAllCustomNotificationMessages(eventPlayer);
```

一次性清除指定玩家的自定义通知槽。
目标仅为 `Player`。

按顺序删除 HeaderText、MessageText1、MessageText2、MessageText3 和 MessageText4。

# 公共函数列表

## 基础知识/条件/数组

|功能|目的|返回值 |
| --- | --- | --- |
| `Concat(s1, s2)` | `Concat(s1, s2)` |连接字符串 | `string` | `string` |
| `And(...rest)` | `And(...rest)` |判断多个布尔值是否都为true | `boolean` | `boolean` |
| `AndFn(...rest)` | `AndFn(...rest)` |判断所有多个条件函数是否都为 true | `boolean` | `boolean` |
| `IfThenElse(condition, ifTrue, ifFalse)` | `IfThenElse(condition, ifTrue, ifFalse)` |根据条件仅评估并返回一个函数 | `T` | `T` |
| `Equals(a, b)` | `Equals(a, b)` | `mod.Equals` 比较两个值 | `boolean` |
| `WaitUntil(delay, cond)` | `WaitUntil(delay, cond)` |等待指定的秒数，或者如果中途条件变为真则退出 | `Promise<void>` | `Promise<void>` |
| `ConvertArray(array)` | `ConvertArray(array)` |将 `mod.Array` 转换为 JavaScript 数组 | `any[]` |
| `FilteredArray(array, cond)` | `FilteredArray(array, cond)` |按条件过滤 `mod.Array` | `mod.Array` |
| `IndexOfFirstTrue(array, cond, arg)` | `IndexOfFirstTrue(array, cond, arg)` |返回满足条件 | 的第一个元素编号`number` | `number` |
| `IsTrueForAll(array, condition, arg)` | `IsTrueForAll(array, condition, arg)` |判断所有元素是否满足条件 | `boolean` | `boolean` |
| `IsTrueForAny(array, condition, arg)` | `IsTrueForAny(array, condition, arg)` |判断是否有任一元素满足条件 | `boolean` | `boolean` |
| `SortedArray(array, compare)` | `SortedArray(array, compare)` |返回 JavaScript 数组的排序副本 | `any[]` | `any[]` |

## ObjId/条件状态

|函数/类 |目的|
| --- | --- |
| `getPlayerId(player)` | `getPlayerId(player)` |获取玩家的 ObjId |
| `getTeamId(team)` | `getTeamId(team)` |获取团队的 ObjId |
| `ConditionState` | `ConditionState` |仅在从 false 变为 true 时才传递的状态类 |
| `getGlobalCondition(n)` | `getGlobalCondition(n)` |获取全局条件状态 |
| `getPlayerCondition(obj, n)` | `getPlayerCondition(obj, n)` |获取玩家的状况状态 |
| `getTeamCondition(team, n)` | `getTeamCondition(team, n)` |按团队获取状况状态 |
| `getCapturePointCondition(obj, n)` | `getCapturePointCondition(obj, n)` |通过 CapturePoint 获取条件状态 |
| `getMCOMCondition(obj, n)` | `getMCOMCondition(obj, n)` |通过 MCOM 获取状况状态 |
| `getVehicleCondition(obj, n)` | `getVehicleCondition(obj, n)` |按车辆获取车况状态 |
| `getHQCondition(obj, n)` | `getHQCondition(obj, n)` |通过总部获取状况状态 |
| `getSectorCondition(obj, n)` | `getSectorCondition(obj, n)` |按部门获取状况状态 |
| `getVehicleSpawnerCondition(obj, n)` | `getVehicleSpawnerCondition(obj, n)` |通过VehicleSpawner获取条件状态 |

## 团队/UI/通知

|功能|目的|
| --- | --- |
| `getPlayersInTeam(teamObj)` | `getPlayersInTeam(teamObj)` |返回属于指定球队的球员数组 |
| `ParseUI(...params)` | `ParseUI(...params)` |从类似 JSON 的参数创建 UI 小部件 |
| `DisplayCustomNotificationMessage(msg, custom, duration, target)` | `DisplayCustomNotificationMessage(msg, custom, duration, target)` |显示自定义通知 UI |
| `ShowEventGameModeMessage(event, target)` | `ShowEventGameModeMessage(event, target)` |显示游戏模式消息风格UI |
| `ShowHighlightedGameModeMessage(event, target)` | `ShowHighlightedGameModeMessage(event, target)` |显示突出显示的世界日志消息 |
| `ShowNotificationMessage(msg, target)` | `ShowNotificationMessage(msg, target)` |显示右上角通知 |
| `ClearAllCustomNotificationMessages(target)` | `ClearAllCustomNotificationMessages(target)` |删除指定玩家的所有自定义通知 |
| `ClearCustomNotificationMessage(custom, target)` | `ClearCustomNotificationMessage(custom, target)` |删除指定的自定义通知槽 |

# 实践中需要注意的地方

## 基本上优先考虑 modlib 并仅在必要时使用 mods

在本文档中，我们将在实施过程中优先使用 `modlib`。
请先使用`modlib`中提供的，例如`ShowNotificationMessage`、`getTeamId`、`ConvertArray`、`ConditionState`、`ParseUI`。

然后，仅对 `modlib` 中不可用的函数或要直接控制 `mod` 的详细参数的进程使用 `mod`。
如果不起作用，请检查 `modlib` 中调用了哪个 `mod` 函数。
例如，如果 `ShowNotificationMessage` 的行为很奇怪，请查看 `mod.DisplayNotificationMessage` 最终是如何调用的。

## 不要使用 Ongoing 进行繁重的处理

`ConvertArray(mod.AllPlayers())`、`getPlayersInTeam` 和 `ParseUI` 很有用，但每帧调用它们都会变得昂贵。

这是我特别想避免的一个例子。

```ts
export function OngoingGlobal(): void {
  modlib.ParseUI({ name: "Debug", type: "Text", textLabel: mod.Message(mod.stringkeys.debug) });
}
```

创建一次 UI，仅更新显示的内容。

## WaitUntil 不是通用计时器

在 `WaitUntil` 上，有来自 SDK 方面的注释，指出“等待时间可能太长”。
在内部，每 0.2 秒检查一次条件。

对于需要严格计时的流程，请优先考虑专用状态管理和事件。

## 创建条件编号的分类帐

数字 `getGlobalCondition(0)` 和 `getPlayerCondition(player, 2)` 随着它们的增加而变得毫无意义。

保持不变是安全的。

```ts
const CONDITION_READY = 0;
const CONDITION_LOW_HEALTH = 1;

const readyState = modlib.getGlobalCondition(CONDITION_READY);
```

请按照与 ObjId 账本相同的方式为 Condition 编号创建账本。

## 不要让 UI 名称发生冲突

`ParseUI` 和通知系统使用 `FindUIWidgetWithName` 和 `DeleteUIWidget`。
如果您创建多个具有相同名称的 UI，则可能会获取或删除意外的小部件。

如果你有一个基于玩家的 UI，在名称中包含 ObjId 会减少意外。

```ts
const name = `Timer_${mod.GetObjId(eventPlayer)}`;
```

# 首先要记住这 5 件事

你不需要一次性记住所有内容。
最初，以下五个就足够了。

|功能|原因 |
| --- | --- |
| `ShowNotificationMessage` | `ShowNotificationMessage` |您可以在右上角写简短的通知 |
| `getTeamId` | `getTeamId` |团队比较更容易阅读 |
| `ConvertArray` | `ConvertArray` | `mod.Array` 可以视为普通数组 |
| `ConditionState` / `getGlobalCondition` | `ConditionState` / `getGlobalCondition` |防止多次点火 |
| `ParseUI` | `ParseUI` |立即创建复杂的 UI |

# 总结

`modlib`是一个方便使用BF6 Portal SDK的辅助库。

然而，它不是一个魔法图书馆。
里面是调用 `mod` API 的 TypeScript 代码。
这就是为什么当你遇到麻烦时，你可以通过阅读 `index.ts` 来遵循该机制。

在本书中，我们建议首先使用 `modlib`，然后仅在必要时直接使用 `mod`。
如果您对详细用法感到困惑，请返回附录C中的函数列表和注释。
