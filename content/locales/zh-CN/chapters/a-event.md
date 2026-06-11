---
title: "附录 A-1：事件列表"
free: true
---

# 如何阅读本附录

本附录基于官方 SDK `code/types/mod/index.d.ts` 的 `mod` 命名空间列出了 BF6 Portal TypeScript 中可用的事件和动作。参考 SDK 以 `index.d.ts` 为准，为 `1.3.2.0`。请务必在实现前搜索 `index.d.ts`，因为它可能会随着 SDK 更新而增加或减少。

SDK 1.3.1.0 追加了 `mod.strings`、`MusicPackages.Radio`、`Radio_*` 系音乐事件和参数，以及若干武器和 Gadget 常量。`HybridExample` 是通过 `mod.strings[key]` 直接读取字符串值的具体示例。
SDK 1.3.2.0 中可以确认 `MP_GolmudRailway` 使用的 `OnGolmudTrainStopped`、`GolmudTrainSendMoveCommand`、`GetGolmudTrainLocation`、`GolmudTrainMoveCommands`、`GolmudTrainStopReason`。具体示例请参见附录 B 的 `GolmudTrainExample`。

在 TypeScript 中，事件被编写为 `export function On...` 或 `export function Ongoing...`。使用 `mod.` 调用动作和值获取，例如 `mod.Set...`、`mod.Get...`、`mod.Create...`。

要在屏幕上显示的文字首先在 `Strings.json` 中注册。

```json
{
  "gameStart": "game start",
  "interactPoint": "InteractPoint:{}"
}
```

```ts
export function OnGameModeStarted(): void {
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.gameStart));
}

export function OnPlayerInteract(eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint): void {
  const id = mod.GetObjId(eventInteractPoint);
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.interactPoint, id), eventPlayer);
}
```

图例如下：

| 项目 | 含义 |
| --- | --- |
| 功能 / 目的 | 检测什么，或执行什么 |
| 主要参数 | 常用参数。有重载时列出代表形式 |
| 返回值 | `void` 写作“无”。值获取函数写出类型 |
| 使用示例 | 函数放置位置以及调用方式的最小示例 |

# 事件列表

事件是由 Portal 调用的入口。不是你自己调用 `mod.OnPlayerJoinGame()` 之类的东西。如果函数名和参数格式与SDK匹配，则当相应事件发生时会自动执行。

由于 `Ongoing...` 系列会持续运行，如果放入全玩家扫描、UI 重新生成、重计算或连续日志输出，很快就会变重。请设计成只有状态需要改变时才执行。

## 连续执行事件

| 事件 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `OngoingGlobal` | 面向全球的持续评估事件。不要每次都做繁重的处理，只看状态变化。 | 无 | 无 | `export function OngoingGlobal(): void { /* 处理 */ }` |
| `OngoingAreaTrigger` | 持续评估 AreaTrigger 的事件。不要每次都做繁重的处理，只看状态变化。 | eventAreaTrigger: mod.AreaTrigger | 无 | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* 处理 */ }` |
| `OngoingCapturePoint` | 持续评估 CapturePoint 的事件。不要每次都做繁重的处理，只看状态变化。 | eventCapturePoint: mod.CapturePoint | 无 | `export function OngoingCapturePoint(eventCapturePoint): void { /* 处理 */ }` |
| `OngoingEmplacementSpawner` | 持续评估 EmplacementSpawner 的事件。不要每次都做繁重的处理，只看状态变化。 | eventEmplacementSpawner: mod.EmplacementSpawner | 无 | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* 处理 */ }` |
| `OngoingHQ` | 持续评估HQ的事件。不要每次都做繁重的处理，只看状态变化。 | eventHQ: mod.HQ | 无 | `export function OngoingHQ(eventHQ): void { /* 处理 */ }` |
| `OngoingInteractPoint` | 持续评估 InteractPoint 的事件。不要每次都做繁重的处理，只看状态变化。 | eventInteractPoint: mod.InteractPoint | 无 | `export function OngoingInteractPoint(eventInteractPoint): void { /* 处理 */ }` |
| `OngoingLootSpawner` | 持续评估 LootSpawner 的事件。不要每次都做繁重的处理，只看状态变化。 | eventLootSpawner: mod.LootSpawner | 无 | `export function OngoingLootSpawner(eventLootSpawner): void { /* 处理 */ }` |
| `OngoingMCOM` | 持续评估 MCOM 的事件。不要每次都做繁重的处理，只看状态变化。 | eventMCOM: mod.MCOM | 无 | `export function OngoingMCOM(eventMCOM): void { /* 处理 */ }` |
| `OngoingPlayer` | 持续评估玩家的事件。不要每次都做繁重的处理，只看状态变化。 | eventPlayer: mod.Player | 无 | `export function OngoingPlayer(eventPlayer): void { /* 处理 */ }` |
| `OngoingRingOfFire` | 持续评估 RingOfFire 的事件。不要每次都做繁重的处理，只看状态变化。 | eventRingOfFire: mod.RingOfFire | 无 | `export function OngoingRingOfFire(eventRingOfFire): void { /* 处理 */ }` |
| `OngoingSector` | 持续评估Sector的事件。不要每次都做繁重的处理，只看状态变化。 | eventSector: mod.Sector | 无 | `export function OngoingSector(eventSector): void { /* 处理 */ }` |
| `OngoingSpawner` | 持续评估 Spawner 的事件。不要每次都做繁重的处理，只看状态变化。 | eventSpawner: mod.Spawner | 无 | `export function OngoingSpawner(eventSpawner): void { /* 处理 */ }` |
| `OngoingSpawnPoint` | 持续评估 SpawnPoint 的事件。不要每次都做繁重的处理，只看状态变化。 | eventSpawnPoint: mod.SpawnPoint | 无 | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* 处理 */ }` |
| `OngoingTeam` | 对队伍进行持续评估的事件。不要每次都做繁重的处理，只看状态变化。 | eventTeam: mod.Team | 无 | `export function OngoingTeam(eventTeam): void { /* 处理 */ }` |
| `OngoingVehicle` | 持续评估车辆的事件。不要每次都做繁重的处理，只看状态变化。 | eventVehicle: mod.Vehicle | 无 | `export function OngoingVehicle(eventVehicle): void { /* 处理 */ }` |
| `OngoingVehicleSpawner` | 持续评估 VehicleSpawner 的事件。不要每次都做繁重的处理，只看状态变化。 | eventVehicleSpawner: mod.VehicleSpawner | 无 | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* 处理 */ }` |
| `OngoingWaypointPath` | 持续评估 WaypointPath 的事件。不要每次都做繁重的处理，只看状态变化。 | eventWaypointPath: mod.WaypointPath | 无 | `export function OngoingWaypointPath(eventWaypointPath): void { /* 处理 */ }` |
| `OngoingWorldIcon` | 持续评估 WorldIcon 的事件。不要每次都做繁重的处理，只看状态变化。 | eventWorldIcon: mod.WorldIcon | 无 | `export function OngoingWorldIcon(eventWorldIcon): void { /* 处理 */ }` |

## AI事件

| 事件 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `OnAIMoveToFailed` | 当AI 士兵中断或未能移动到目的地时。 | eventPlayer: mod.Player | 无 | `export function OnAIMoveToFailed(eventPlayer): void { /* 处理 */ }` |
| `OnAIMoveToRunning` | 当AI 士兵开始移动到目标位置时。 | eventPlayer: mod.Player | 无 | `export function OnAIMoveToRunning(eventPlayer): void { /* 处理 */ }` |
| `OnAIMoveToSucceeded` | 当AI 士兵到达目标点时。 | eventPlayer: mod.Player | 无 | `export function OnAIMoveToSucceeded(eventPlayer): void { /* 处理 */ }` |
| `OnAIParachuteRunning` | 当AI 士兵进行跳伞动作时。 | eventPlayer: mod.Player | 无 | `export function OnAIParachuteRunning(eventPlayer): void { /* 处理 */ }` |
| `OnAIParachuteSucceeded` | 当AI 士兵的跳伞动作完成时。 | eventPlayer: mod.Player | 无 | `export function OnAIParachuteSucceeded(eventPlayer): void { /* 处理 */ }` |
| `OnAIWaypointIdleFailed` | 当AI 士兵停止或未能巡逻Waypoint时。 | eventPlayer: mod.Player | 无 | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* 处理 */ }` |
| `OnAIWaypointIdleRunning` | 当AI 士兵开始巡逻Waypoint时。 | eventPlayer: mod.Player | 无 | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* 处理 */ }` |
| `OnAIWaypointIdleSucceeded` | 当AI 士兵完成Waypoint巡逻时。 | eventPlayer: mod.Player | 无 | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* 处理 */ }` |
| `OnSpawnerSpawned` | 当AI 士兵从AI Spawner中出现时。 | eventPlayer: mod.Player, eventSpawner: mod.Spawner | 无 | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* 处理 */ }` |

## 游戏进度/目标事件

| 事件 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `OnCapturePointCaptured` | 当队伍占领 CapturePoint 时。 | eventCapturePoint: mod.CapturePoint | 无 | `export function OnCapturePointCaptured(eventCapturePoint): void { /* 处理 */ }` |
| `OnCapturePointCapturing` | 当队伍开始占领 CapturePoint 时。 | eventCapturePoint: mod.CapturePoint | 无 | `export function OnCapturePointCapturing(eventCapturePoint): void { /* 处理 */ }` |
| `OnCapturePointLost` | 当队伍失去 CapturePoint 的控制权时。 | eventCapturePoint: mod.CapturePoint | 无 | `export function OnCapturePointLost(eventCapturePoint): void { /* 处理 */ }` |
| `OnGameModeEnding` | 当游戏模式结束时。 | 无 | 无 | `export function OnGameModeEnding(): void { /* 处理 */ }` |
| `OnGameModeStarted` | 启动游戏模式时。用作初始化的基点。 | 无 | 无 | `export function OnGameModeStarted(): void { /* 处理 */ }` |
| `OnMCOMArmed` | 当 MCOM 被装设时。 | eventMCOM: mod.MCOM | 无 | `export function OnMCOMArmed(eventMCOM): void { /* 处理 */ }` |
| `OnMCOMDefused` | 当 MCOM 被解除时。 | eventMCOM: mod.MCOM | 无 | `export function OnMCOMDefused(eventMCOM): void { /* 处理 */ }` |
| `OnMCOMDestroyed` | 当MCOM爆炸并被摧毁时。 | eventMCOM: mod.MCOM | 无 | `export function OnMCOMDestroyed(eventMCOM): void { /* 处理 */ }` |
| `OnRingOfFireZoneSizeChange` | 当 RingOfFire 的大小发生变化时。 | eventRingOfFire: mod.RingOfFire, eventNumber: number | 无 | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* 处理 */ }` |
| `OnTimeLimitReached` | 当达到游戏模式时间限制时。 | 无 | 无 | `export function OnTimeLimitReached(): void { /* 处理 */ }` |

## 玩家事件

| 事件 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `OnMandown` | 当玩家进入down状态时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | 无 | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* 处理 */ }` |
| `OnPlayerDamaged` | 当玩家受到伤害时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock | 无 | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* 处理 */ }` |
| `OnPlayerDeployed` | 当玩家出击时。 | eventPlayer: mod.Player | 无 | `export function OnPlayerDeployed(eventPlayer): void { /* 处理 */ }` |
| `OnPlayerDied` | 当玩家死亡时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | 无 | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 处理 */ }` |
| `OnPlayerEarnedKill` | 当玩家击杀对手时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | 无 | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 处理 */ }` |
| `OnPlayerEarnedKillAssist` | 当玩家收到击杀助攻时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | 无 | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* 处理 */ }` |
| `OnPlayerEnterAreaTrigger` | 当玩家进入AreaTrigger时。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | 无 | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 处理 */ }` |
| `OnPlayerEnterCapturePoint` | 当玩家进入占领点的占领范围时。 | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | 无 | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* 处理 */ }` |
| `OnPlayerEnterVehicle` | 当玩家进入车辆或座位时。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | 无 | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* 处理 */ }` |
| `OnPlayerEnterVehicleSeat` | 当玩家进入车辆或座位时。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | 无 | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 处理 */ }` |
| `OnPlayerEnterVL7Cloud` | 当玩家进入VL7Cloud的范围时。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | 无 | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 处理 */ }` |
| `OnPlayerExitAreaTrigger` | 当玩家离开 AreaTrigger 时。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | 无 | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 处理 */ }` |
| `OnPlayerExitCapturePoint` | 当玩家离开占领点的占领范围时。 | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | 无 | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* 处理 */ }` |
| `OnPlayerExitVehicle` | 当玩家离开车辆时。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | 无 | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* 处理 */ }` |
| `OnPlayerExitVehicleSeat` | 当玩家离开车辆座椅时。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | 无 | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 处理 */ }` |
| `OnPlayerExitVL7Cloud` | 当玩家离开VL7Cloud的范围时。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | 无 | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 处理 */ }` |
| `OnPlayerInteract` | 当玩家与 InteractPoint 交互时。 | eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint | 无 | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* 处理 */ }` |
| `OnPlayerJoinGame` | 当玩家加入游戏时。 | eventPlayer: mod.Player | 无 | `export function OnPlayerJoinGame(eventPlayer): void { /* 处理 */ }` |
| `OnPlayerLeaveGame` | 当玩家离开游戏时。参数是一个数字，而不是一个玩家。 | eventNumber: number | 无 | `export function OnPlayerLeaveGame(eventNumber): void { /* 处理 */ }` |
| `OnPlayerSwitchTeam` | 当一名玩家更换队伍时。 | eventPlayer: mod.Player, eventTeam: mod.Team | 无 | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* 处理 */ }` |
| `OnPlayerUIButtonEvent` | 当玩家操作 UI 按钮时。 | eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent | 无 | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* 处理 */ }` |
| `OnPlayerUndeploy` | 当玩家从战场返回并返回部署画面时。 | eventPlayer: mod.Player | 无 | `export function OnPlayerUndeploy(eventPlayer): void { /* 处理 */ }` |
| `OnRevived` | 当一名玩家被另一名玩家复活时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | 无 | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* 处理 */ }` |

## Portal Gadget・RayCast 事件

| 事件 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `OnPortalGadgetAimStart` | 使用 Portal Gadget 时按下缩放按钮时。 | eventPlayer: mod.Player | 无 | `export function OnPortalGadgetAimStart(eventPlayer): void { /* 处理 */ }` |
| `OnPortalGadgetAimStop` | 当你在使用 Portal Gadget 时释放缩放按钮时。 | eventPlayer: mod.Player | 无 | `export function OnPortalGadgetAimStop(eventPlayer): void { /* 处理 */ }` |
| `OnPortalGadgetFireStart` | 当你在使用 Portal Gadget 时按下启动按钮时。 | eventPlayer: mod.Player | 无 | `export function OnPortalGadgetFireStart(eventPlayer): void { /* 处理 */ }` |
| `OnPortalGadgetFireStop` | 当你在使用 Portal Gadget 时释放开火按钮时。 | eventPlayer: mod.Player | 无 | `export function OnPortalGadgetFireStop(eventPlayer): void { /* 处理 */ }` |
| `OnPortalGadgetLaserToggle` | 使用 Portal Gadget 时切换战术设备输入时。 | eventPlayer: mod.Player, eventBoolean: boolean | 无 | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* 处理 */ }` |
| `OnRayCastHit` | 当 RayCast 击中某物时。 | eventPlayer: mod.Player, eventPoint: mod.Vector, eventNormal: mod.Vector | 无 | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* 处理 */ }` |
| `OnRayCastMissed` | 当 RayCast 没有击中任何东西时。 | eventPlayer: mod.Player | 无 | `export function OnRayCastMissed(eventPlayer): void { /* 处理 */ }` |

## 车辆事件

| 事件 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `OnVehicleDestroyed` | 当车辆被毁坏时。 | eventVehicle: mod.Vehicle | 无 | `export function OnVehicleDestroyed(eventVehicle): void { /* 处理 */ }` |
| `OnVehicleSpawned` | 当车辆在地图上生成时。 | eventVehicle: mod.Vehicle | 无 | `export function OnVehicleSpawned(eventVehicle): void { /* 处理 */ }` |

## Golmud 列车事件

| 事件 | 功能 / 目的 | 主要参数 | 返回值 | 示例 |
| --- | --- | --- | --- | --- |
| `OnGolmudTrainStopped` | Railway to Golmud 的列车在东端、西端或中途停止时调用。 | eventGolmudTrainStopReason: mod.GolmudTrainStopReason | 无 | `export function OnGolmudTrainStopped(reason): void { /* 处理 */ }` |

控制列车时使用 `mod.GolmudTrainSendMoveCommand(mod.GolmudTrainMoveCommands.MoveWest)`、`Stop`、`MoveEast`。
当前位置可以通过 `mod.GetGolmudTrainLocation()` 取得。

# 接下来阅读的附录

动作和值获取的函数列表分为以下“附录 A-2：动作和值获取列表（基本操作）”。
