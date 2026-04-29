---
title: "附录 A-1：事件列表"
free: true
---

::::message
本附录目前只是粗略的机器翻译，文字可能非常不自然。我之后会认真修改，暂时请多包涵。
::::

# 如何阅读本附录

本附录基于本地 SDK `books/bf_portal_doc/tmp/bf6-sdk/code/types/mod/index.d.ts` 的 `mod` 命名空间列出了 BF6 Portal TypeScript 中可用的事件和操作。参考 SDK 为 `1.2.3.0`、`sdk.version.json` 和 `index.d.ts`。请务必在实施前搜索 `index.d.ts`，因为它可能会随着 SDK 更新而增加或减少。

在 TypeScript 中，事件被编写为 `export function On...` 或 `export function Ongoing...`。使用 `mod.` 调用操作和值检索，例如 `mod.Set...`、`mod.Get...`、`mod.Create...`。

要在屏幕上显示的字符首先在 `Strings.json` 中注册。

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

传说是：

|项目 |意义|
| --- | --- |
|功能/目的|检测什么或做什么 |
|主要论点|经常使用的参数。如果超载，请张贴代表表格 |
|返回值 | `void` 写为“none”。值检索函数写入类型 |
|使用示例 |函数放置位置以及如何调用的最小示例 |

# 事件列表

事件是从 Portal 端调用的入口。这不是您自己所说的 `mod.OnPlayerJoinGame()` 之类的东西。如果函数名和参数格式与SDK匹配，则当相应事件发生时会自动执行。

由于 `Ongoing...` 系统持续运行，当您扫描所有玩家、重新生成 UI、大量计算和重复命中日志时，它很快就会变得繁重。将其设计为仅在状态需要改变时才执行。

## 连续执行事件

|活动 |功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `OngoingGlobal` | `OngoingGlobal` |面向全球的持续评估活动。不要每次都做繁重的处理，只看状态变化。 |无 |无 | `export function OngoingGlobal(): void { /* 処理 */ }` | `export function OngoingGlobal(): void { /* 処理 */ }` |
| `OngoingAreaTrigger` | `OngoingAreaTrigger` |持续评估 AreaTrigger 的事件。不要每次都做繁重的处理，只看状态变化。 | eventAreaTrigger：mod.AreaTrigger |无 | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* 処理 */ }` | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* 処理 */ }` |
| `OngoingCapturePoint` | `OngoingCapturePoint` |持续评估 CapturePoint 的事件。不要每次都做繁重的处理，只看状态变化。 | eventCapturePoint：mod.CapturePoint |无 | `export function OngoingCapturePoint(eventCapturePoint): void { /* 処理 */ }` | `export function OngoingCapturePoint(eventCapturePoint): void { /* 処理 */ }` |
| `OngoingEmplacementSpawner` | `OngoingEmplacementSpawner` |持续评估 EmplacementSpawner 的事件。不要每次都做繁重的处理，只看状态变化。 | eventEmplacementSpawner：mod.EmplacementSpawner |无 | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* 処理 */ }` | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* 処理 */ }` |
| `OngoingHQ` | `OngoingHQ` |持续评估总部的事件。不要每次都做繁重的处理，只看状态变化。 |事件总部：mod.HQ |无 | `export function OngoingHQ(eventHQ): void { /* 処理 */ }` | `export function OngoingHQ(eventHQ): void { /* 処理 */ }` |
| `OngoingInteractPoint` | `OngoingInteractPoint` |持续评估 InteractPoint 的事件。不要每次都做繁重的处理，只看状态变化。 |事件交互点：mod.InteractPoint |无 | `export function OngoingInteractPoint(eventInteractPoint): void { /* 処理 */ }` | `export function OngoingInteractPoint(eventInteractPoint): void { /* 処理 */ }` |
| `OngoingLootSpawner` | `OngoingLootSpawner` |持续评估 LootSpawner 的事件。不要每次都做繁重的处理，只看状态变化。 | eventLootSpawner：mod.LootSpawner |无 | `export function OngoingLootSpawner(eventLootSpawner): void { /* 処理 */ }` | `export function OngoingLootSpawner(eventLootSpawner): void { /* 処理 */ }` |
| `OngoingMCOM` | `OngoingMCOM` |持续评估 MCOM 的活动。不要每次都做繁重的处理，只看状态变化。 | eventMCOM：mod.MCOM |无 | `export function OngoingMCOM(eventMCOM): void { /* 処理 */ }` | `export function OngoingMCOM(eventMCOM): void { /* 処理 */ }` |
| `OngoingPlayer` | `OngoingPlayer` |持续评估玩家的事件。不要每次都做繁重的处理，只看状态变化。 |事件播放器：mod.Player |无 | `export function OngoingPlayer(eventPlayer): void { /* 処理 */ }` | `export function OngoingPlayer(eventPlayer): void { /* 処理 */ }` |
| `OngoingRingOfFire` | `OngoingRingOfFire` |持续评估 RingOfFire 的事件。不要每次都做繁重的处理，只看状态变化。 | eventRingOfFire：mod.RingOfFire |无 | `export function OngoingRingOfFire(eventRingOfFire): void { /* 処理 */ }` | `export function OngoingRingOfFire(eventRingOfFire): void { /* 処理 */ }` |
| `OngoingSector` | `OngoingSector` |持续评估该行业的活动。不要每次都做繁重的处理，只看状态变化。 | eventSector：mod.Sector |无 | `export function OngoingSector(eventSector): void { /* 処理 */ }` | `export function OngoingSector(eventSector): void { /* 処理 */ }` |
| `OngoingSpawner` | `OngoingSpawner` |持续评估 Spawner 的事件。不要每次都做繁重的处理，只看状态变化。 | eventSpawner：mod.Spawner |无 | `export function OngoingSpawner(eventSpawner): void { /* 処理 */ }` | `export function OngoingSpawner(eventSpawner): void { /* 処理 */ }` |
| `OngoingSpawnPoint` | `OngoingSpawnPoint` |持续评估 SpawnPoint 的事件。不要每次都做繁重的处理，只看状态变化。 | eventSpawnPoint：mod.SpawnPoint |无 | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* 処理 */ }` | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* 処理 */ }` |
| `OngoingTeam` | `OngoingTeam` |对团队进行持续评估的活动。不要每次都做繁重的处理，只看状态变化。 |事件团队：mod.Team |无 | `export function OngoingTeam(eventTeam): void { /* 処理 */ }` | `export function OngoingTeam(eventTeam): void { /* 処理 */ }` |
| `OngoingVehicle` | `OngoingVehicle` |持续评估车辆的事件。不要每次都做繁重的处理，只看状态变化。 |事件车辆：mod.Vehicle |无 | `export function OngoingVehicle(eventVehicle): void { /* 処理 */ }` | `export function OngoingVehicle(eventVehicle): void { /* 処理 */ }` |
| `OngoingVehicleSpawner` | `OngoingVehicleSpawner` |持续评估 VehicleSpawner 的事件。不要每次都做繁重的处理，只看状态变化。 | eventVehicleSpawner：mod.VehicleSpawner |无 | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* 処理 */ }` | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* 処理 */ }` |
| `OngoingWaypointPath` | `OngoingWaypointPath` |持续评估 WaypointPath 的事件。不要每次都做繁重的处理，只看状态变化。 | eventWaypointPath：mod.WaypointPath |无 | `export function OngoingWaypointPath(eventWaypointPath): void { /* 処理 */ }` | `export function OngoingWaypointPath(eventWaypointPath): void { /* 処理 */ }` |
| `OngoingWorldIcon` | `OngoingWorldIcon` |持续评估 WorldIcon 的活动。不要每次都做繁重的处理，只看状态变化。 |事件世界图标：mod.WorldIcon |无 | `export function OngoingWorldIcon(eventWorldIcon): void { /* 処理 */ }` | `export function OngoingWorldIcon(eventWorldIcon): void { /* 処理 */ }` |

## 人工智能事件

|活动 |功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `OnAIMoveToFailed` | `OnAIMoveToFailed` |当AI士兵中断或未能移动到目的地时。 |事件播放器：mod.Player |无 | `export function OnAIMoveToFailed(eventPlayer): void { /* 処理 */ }` | `export function OnAIMoveToFailed(eventPlayer): void { /* 処理 */ }` |
| `OnAIMoveToRunning` | `OnAIMoveToRunning` |当AI士兵开始移动到目标位置时。 |事件播放器：mod.Player |无 | `export function OnAIMoveToRunning(eventPlayer): void { /* 処理 */ }` | `export function OnAIMoveToRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIMoveToSucceeded` | `OnAIMoveToSucceeded` |当AI士兵到达目标点时。 |事件播放器：mod.Player |无 | `export function OnAIMoveToSucceeded(eventPlayer): void { /* 処理 */ }` | `export function OnAIMoveToSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnAIParachuteRunning` | `OnAIParachuteRunning` |当AI士兵进行跳伞操作时。 |事件播放器：mod.Player |无 | `export function OnAIParachuteRunning(eventPlayer): void { /* 処理 */ }` | `export function OnAIParachuteRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIParachuteSucceeded` | `OnAIParachuteSucceeded` |当AI士兵的跳伞动作完成时。 |事件播放器：mod.Player |无 | `export function OnAIParachuteSucceeded(eventPlayer): void { /* 処理 */ }` | `export function OnAIParachuteSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleFailed` | `OnAIWaypointIdleFailed` |当AI士兵停止或未能巡逻航路点时。 |事件播放器：mod.Player |无 | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* 処理 */ }` | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleRunning` | `OnAIWaypointIdleRunning` |当人工智能士兵开始巡逻航路点时。 |事件播放器：mod.Player |无 | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* 処理 */ }` | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleSucceeded` | `OnAIWaypointIdleSucceeded` |当人工智能士兵完成航路点巡逻时。 |事件播放器：mod.Player |无 | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* 処理 */ }` | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnSpawnerSpawned` | `OnSpawnerSpawned` |当AI士兵从AISpawner中出现时。 | eventPlayer: mod.Player, eventSpawner: mod.Spawner |无 | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* 処理 */ }` | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* 処理 */ }` |

## 游戏进度/目标事件

|活动 |功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `OnCapturePointCaptured` | `OnCapturePointCaptured` |当团队占领占领点时。 | eventCapturePoint：mod.CapturePoint |无 | `export function OnCapturePointCaptured(eventCapturePoint): void { /* 処理 */ }` | `export function OnCapturePointCaptured(eventCapturePoint): void { /* 処理 */ }` |
| `OnCapturePointCapturing` | `OnCapturePointCapturing` |当团队开始捕获 CapturePoint 时。 | eventCapturePoint：mod.CapturePoint |无 | `export function OnCapturePointCapturing(eventCapturePoint): void { /* 処理 */ }` | `export function OnCapturePointCapturing(eventCapturePoint): void { /* 処理 */ }` |
| `OnCapturePointLost` | `OnCapturePointLost` |当团队失去对 CapturePoint 的控制时。 | eventCapturePoint：mod.CapturePoint |无 | `export function OnCapturePointLost(eventCapturePoint): void { /* 処理 */ }` | `export function OnCapturePointLost(eventCapturePoint): void { /* 処理 */ }` |
| `OnGameModeEnding` | `OnGameModeEnding` |当游戏模式结束时。 |无 |无 | `export function OnGameModeEnding(): void { /* 処理 */ }` | `export function OnGameModeEnding(): void { /* 処理 */ }` |
| `OnGameModeStarted` | `OnGameModeStarted` |启动游戏模式时。用作初始化的基点。 |无 |无 | `export function OnGameModeStarted(): void { /* 処理 */ }` | `export function OnGameModeStarted(): void { /* 処理 */ }` |
| `OnMCOMArmed` | `OnMCOMArmed` |当 MCOM 布防时。 | eventMCOM：mod.MCOM |无 | `export function OnMCOMArmed(eventMCOM): void { /* 処理 */ }` | `export function OnMCOMArmed(eventMCOM): void { /* 処理 */ }` |
| `OnMCOMDefused` | `OnMCOMDefused` |当MCOM发布时。 | eventMCOM：mod.MCOM |无 | `export function OnMCOMDefused(eventMCOM): void { /* 処理 */ }` | `export function OnMCOMDefused(eventMCOM): void { /* 処理 */ }` |
| `OnMCOMDestroyed` | `OnMCOMDestroyed` |当MCOM爆炸并被摧毁时。 | eventMCOM：mod.MCOM |无 | `export function OnMCOMDestroyed(eventMCOM): void { /* 処理 */ }` | `export function OnMCOMDestroyed(eventMCOM): void { /* 処理 */ }` |
| `OnRingOfFireZoneSizeChange` | `OnRingOfFireZoneSizeChange` |当 RingOfFire 的大小发生变化时。 | eventRingOfFire: mod.RingOfFire, eventNumber: 数字 |无 | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* 処理 */ }` | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* 処理 */ }` |
| `OnTimeLimitReached` | `OnTimeLimitReached` |当达到游戏模式时间限制时。 |无 |无 | `export function OnTimeLimitReached(): void { /* 処理 */ }` | `export function OnTimeLimitReached(): void { /* 処理 */ }` |

## 玩家事件

|活动 |功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `OnMandown` | `OnMandown` |当玩家进入down状态时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player |无 | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |
| `OnPlayerDamaged` | `OnPlayerDamaged` |当玩家受到伤害时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock |无 | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* 処理 */ }` | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerDeployed` | `OnPlayerDeployed` |当玩家出现时。 |事件播放器：mod.Player |无 | `export function OnPlayerDeployed(eventPlayer): void { /* 処理 */ }` | `export function OnPlayerDeployed(eventPlayer): void { /* 処理 */ }` |
| `OnPlayerDied` | `OnPlayerDied` |当玩家死亡时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock |无 | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerEarnedKill` | `OnPlayerEarnedKill` |当玩家击杀对手时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock |无 | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerEarnedKillAssist` | `OnPlayerEarnedKillAssist` |当玩家收到击杀助攻时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player |无 | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |
| `OnPlayerEnterAreaTrigger` | `OnPlayerEnterAreaTrigger` |当玩家进入AreaTrigger时。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger |无 | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` |
| `OnPlayerEnterCapturePoint` | `OnPlayerEnterCapturePoint` |当玩家进入占领点的占领范围时。 | `OnPlayerEnterCapturePoint` | `OnPlayerEnterCapturePoint` | | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint |无 | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` |
| `OnPlayerEnterVehicle` | `OnPlayerEnterVehicle` |当玩家进入车辆或座位时。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle |无 | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` |
| `OnPlayerEnterVehicleSeat` | `OnPlayerEnterVehicleSeat` |当玩家进入车辆或座位时。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object |无 | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` |
| `OnPlayerEnterVL7Cloud` | `OnPlayerEnterVL7Cloud` |当玩家进入VL7Cloud的范围时。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud |无 | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` |
| `OnPlayerExitAreaTrigger` | `OnPlayerExitAreaTrigger` |当玩家退出区域时触发。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger |无 | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` |
| `OnPlayerExitCapturePoint` | `OnPlayerExitCapturePoint` |当玩家离开占领点的占领范围时。 | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint |无 | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` |
| `OnPlayerExitVehicle` | `OnPlayerExitVehicle` |当玩家离开车辆时。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle |无 | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` |
| `OnPlayerExitVehicleSeat` | `OnPlayerExitVehicleSeat` |当玩家离开车辆座椅时。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object |无 | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` |
| `OnPlayerExitVL7Cloud` | `OnPlayerExitVL7Cloud` |当玩家离开VL7Cloud的范围时。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud |无 | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` |
| `OnPlayerInteract` | `OnPlayerInteract` |当玩家与 InteractPoint 交互时。 | eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint |无 | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* 処理 */ }` | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* 処理 */ }` |
| `OnPlayerJoinGame` | `OnPlayerJoinGame` |当玩家加入游戏时。 |事件播放器：mod.Player |无 | `export function OnPlayerJoinGame(eventPlayer): void { /* 処理 */ }` | `export function OnPlayerJoinGame(eventPlayer): void { /* 処理 */ }` |
| `OnPlayerLeaveGame` | `OnPlayerLeaveGame` |当玩家离开游戏时。参数是一个数字，而不是一个玩家。 |事件编号： 数量 |无 | `export function OnPlayerLeaveGame(eventNumber): void { /* 処理 */ }` | `export function OnPlayerLeaveGame(eventNumber): void { /* 処理 */ }` |
| `OnPlayerSwitchTeam` | `OnPlayerSwitchTeam` |当一名球员更换球队时。 | eventPlayer: mod.Player, eventTeam: mod.Team |无 | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* 処理 */ }` | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* 処理 */ }` |
| `OnPlayerUIButtonEvent` | `OnPlayerUIButtonEvent` |当玩家操作 UI 按钮时。 | eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent |无 | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* 処理 */ }` | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* 処理 */ }` |
| `OnPlayerUndeploy` | `OnPlayerUndeploy` |当玩家从战场返回并返回部署画面时。 |事件播放器：mod.Player |无 | `export function OnPlayerUndeploy(eventPlayer): void { /* 処理 */ }` | `export function OnPlayerUndeploy(eventPlayer): void { /* 処理 */ }` |
| `OnRevived` | `OnRevived` |当一名玩家被另一名玩家复活时。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player |无 | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |

## Portal Gadget・RayCast 活动

|活动 |功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `OnPortalGadgetAimStart` | `OnPortalGadgetAimStart` |使用 Portal Gadget 时按下缩放按钮时。 |事件播放器：mod.Player |无 | `export function OnPortalGadgetAimStart(eventPlayer): void { /* 処理 */ }` | `export function OnPortalGadgetAimStart(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetAimStop` | `OnPortalGadgetAimStop` |当您在使用 Portal Gadget 时释放缩放按钮时。 |事件播放器：mod.Player |无 | `export function OnPortalGadgetAimStop(eventPlayer): void { /* 処理 */ }` | `export function OnPortalGadgetAimStop(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetFireStart` | `OnPortalGadgetFireStart` |当您在使用 Portal Gadget 时按下启动按钮时。 |事件播放器：mod.Player |无 | `export function OnPortalGadgetFireStart(eventPlayer): void { /* 処理 */ }` | `export function OnPortalGadgetFireStart(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetFireStop` | `OnPortalGadgetFireStop` |当您在使用 Portal Gadget 时释放开火按钮时。 |事件播放器：mod.Player |无 | `export function OnPortalGadgetFireStop(eventPlayer): void { /* 処理 */ }` | `export function OnPortalGadgetFireStop(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetLaserToggle` | `OnPortalGadgetLaserToggle` |使用 Portal Gadget 时切换战术设备输入时。 | eventPlayer: mod.Player, eventBoolean: 布尔 |无 | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* 処理 */ }` | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* 処理 */ }` |
| `OnRayCastHit` | `OnRayCastHit` |当 RayCast 击中某物时。 | eventPlayer：mod.Player，eventPoint：mod.Vector，eventNormal：mod.Vector |无 | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* 処理 */ }` | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* 処理 */ }` |
| `OnRayCastMissed` | `OnRayCastMissed` |当 RayCast 没有击中任何东西时。 |事件播放器：mod.Player |无 | `export function OnRayCastMissed(eventPlayer): void { /* 処理 */ }` | `export function OnRayCastMissed(eventPlayer): void { /* 処理 */ }` |

## 车辆事件

|活动 |功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `OnVehicleDestroyed` | `OnVehicleDestroyed` |当车辆被毁坏时。 |事件车辆：mod.Vehicle |无 | `export function OnVehicleDestroyed(eventVehicle): void { /* 処理 */ }` | `export function OnVehicleDestroyed(eventVehicle): void { /* 処理 */ }` |
| `OnVehicleSpawned` | `OnVehicleSpawned` |当车辆在地图上生成时。 |事件车辆：mod.Vehicle |无 | `export function OnVehicleSpawned(eventVehicle): void { /* 処理 */ }` | `export function OnVehicleSpawned(eventVehicle): void { /* 処理 */ }` |

# 下一个要阅读的附录

动作和值获取的函数列表分为以下“附录A-2：动作和值获取列表（基本操作）”。
