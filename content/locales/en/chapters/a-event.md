---
title: "Appendix A-1: Event list"
free: true
---

::::message
This appendix is currently only a rough machine translation, so the wording may be very awkward. I will revise it properly later. Please bear with me for now.
::::

# How to read this appendix

This appendix lists the events and actions available in BF6 Portal TypeScript based on the `mod` namespace of the local SDK `books/bf_portal_doc/tmp/bf6-sdk/code/types/mod/index.d.ts`. The reference SDK is `1.2.3.0` along with `sdk.version.json` and `index.d.ts`. Please be sure to search for `index.d.ts` before implementation, as it may increase or decrease with SDK updates.

In TypeScript, events are written as `export function On...` or `export function Ongoing...`. Actions and value retrieval are called with `mod.`, such as `mod.Set...`, `mod.Get...`, `mod.Create...`.

The characters to be displayed on the screen are first registered in `Strings.json`.

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

The legend is:

| Item | Meaning |
| --- | --- |
| Function/Purpose | What to detect or do |
| Main arguments | Frequently used arguments. If there is an overload, post the representative form |
| Return value | `void` is written as "none". Value retrieval function writes type |
| Usage example | Minimum example of where to put the function and how to call it |

# Event list

An event is an entrance called from the Portal side. It's not something you call something like `mod.OnPlayerJoinGame()` yourself. If the function name and argument format match the SDK, it will be automatically executed when the corresponding event occurs.

Since the `Ongoing...` system runs continuously, it quickly becomes heavy when you include scanning all players, regenerating the UI, heavy calculations, and repeatedly hitting the log. Design it to be executed only when the state needs to change.

## Continuous execution event

| Event | Function/Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OngoingGlobal` | An event for continuous evaluation targeting Global. Don't do heavy processing every time, just look at state changes. | None | None | `export function OngoingGlobal(): void { /* 処理 */ }` |
| `OngoingAreaTrigger` | Event that continuously evaluates AreaTrigger. Don't do heavy processing every time, just look at state changes. | eventAreaTrigger: mod.AreaTrigger | None | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* 処理 */ }` |
| `OngoingCapturePoint` | Event that continuously evaluates CapturePoint. Don't do heavy processing every time, just look at state changes. | eventCapturePoint: mod.CapturePoint | None | `export function OngoingCapturePoint(eventCapturePoint): void { /* 処理 */ }` |
| `OngoingEmplacementSpawner` | Event that continuously evaluates EmplacementSpawner. Don't do heavy processing every time, just look at state changes. | eventEmplacementSpawner: mod.EmplacementSpawner | None | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* 処理 */ }` |
| `OngoingHQ` | Event that continuously evaluates HQ. Don't do heavy processing every time, just look at state changes. | eventHQ: mod.HQ | None | `export function OngoingHQ(eventHQ): void { /* 処理 */ }` |
| `OngoingInteractPoint` | Event that continuously evaluates InteractPoint. Don't do heavy processing every time, just look at state changes. | eventInteractPoint: mod.InteractPoint | None | `export function OngoingInteractPoint(eventInteractPoint): void { /* 処理 */ }` |
| `OngoingLootSpawner` | An event that continuously evaluates LootSpawner. Don't do heavy processing every time, just look at state changes. | eventLootSpawner: mod.LootSpawner | None | `export function OngoingLootSpawner(eventLootSpawner): void { /* 処理 */ }` |
| `OngoingMCOM` | Event to continuously evaluate MCOM. Don't do heavy processing every time, just look at state changes. | eventMCOM: mod.MCOM | None | `export function OngoingMCOM(eventMCOM): void { /* 処理 */ }` |
| `OngoingPlayer` | Event that continuously evaluates Player. Don't do heavy processing every time, just look at state changes. | eventPlayer: mod.Player | None | `export function OngoingPlayer(eventPlayer): void { /* 処理 */ }` |
| `OngoingRingOfFire` | Event that continuously evaluates RingOfFire. Don't do heavy processing every time, just look at state changes. | eventRingOfFire: mod.RingOfFire | None | `export function OngoingRingOfFire(eventRingOfFire): void { /* 処理 */ }` |
| `OngoingSector` | Event that continuously evaluates the sector. Don't do heavy processing every time, just look at state changes. | eventSector: mod.Sector | None | `export function OngoingSector(eventSector): void { /* 処理 */ }` |
| `OngoingSpawner` | Event that continuously evaluates Spawner. Don't do heavy processing every time, just look at state changes. | eventSpawner: mod.Spawner | None | `export function OngoingSpawner(eventSpawner): void { /* 処理 */ }` |
| `OngoingSpawnPoint` | Event that continuously evaluates SpawnPoint. Don't do heavy processing every time, just look at state changes. | eventSpawnPoint: mod.SpawnPoint | None | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* 処理 */ }` |
| `OngoingTeam` | An event for continuous evaluation of teams. Don't do heavy processing every time, just look at state changes. | eventTeam: mod.Team | None | `export function OngoingTeam(eventTeam): void { /* 処理 */ }` |
| `OngoingVehicle` | Event that continuously evaluates Vehicle. Don't do heavy processing every time, just look at state changes. | eventVehicle: mod.Vehicle | None | `export function OngoingVehicle(eventVehicle): void { /* 処理 */ }` |
| `OngoingVehicleSpawner` | Event that continuously evaluates VehicleSpawner. Don't do heavy processing every time, just look at state changes. | eventVehicleSpawner: mod.VehicleSpawner | None | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* 処理 */ }` |
| `OngoingWaypointPath` | Event that continuously evaluates WaypointPath. Don't do heavy processing every time, just look at state changes. | eventWaypointPath: mod.WaypointPath | None | `export function OngoingWaypointPath(eventWaypointPath): void { /* 処理 */ }` |
| `OngoingWorldIcon` | Event that continuously evaluates WorldIcon. Don't do heavy processing every time, just look at state changes. | eventWorldIcon: mod.WorldIcon | None | `export function OngoingWorldIcon(eventWorldIcon): void { /* 処理 */ }` |

## AI event

| Event | Function/Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnAIMoveToFailed` | When the AI soldier interrupts or fails to move to the destination. | eventPlayer: mod.Player | None | `export function OnAIMoveToFailed(eventPlayer): void { /* 処理 */ }` |
| `OnAIMoveToRunning` | When the AI soldier starts moving to the target location. | eventPlayer: mod.Player | None | `export function OnAIMoveToRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIMoveToSucceeded` | When the AI ​​soldier reaches the target point. | eventPlayer: mod.Player | None | `export function OnAIMoveToSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnAIParachuteRunning` | When an AI soldier's parachute operation is in progress. | eventPlayer: mod.Player | None | `export function OnAIParachuteRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIParachuteSucceeded` | When the AI soldier's parachute movement is completed. | eventPlayer: mod.Player | None | `export function OnAIParachuteSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleFailed` | When the AI soldier stops or fails to patrol the waypoint. | eventPlayer: mod.Player | None | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleRunning` | When an AI soldier starts patrolling waypoints. | eventPlayer: mod.Player | None | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleSucceeded` | When an AI soldier completes a waypoint patrol. | eventPlayer: mod.Player | None | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnSpawnerSpawned` | When an AI soldier appears from AISpawner. | eventPlayer: mod.Player, eventSpawner: mod.Spawner | None | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* 処理 */ }` |

## Game progress/goal event

| Event | Function/Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnCapturePointCaptured` | When a team captures CapturePoint. | eventCapturePoint: mod.CapturePoint | None | `export function OnCapturePointCaptured(eventCapturePoint): void { /* 処理 */ }` |
| `OnCapturePointCapturing` | When the team begins capturing CapturePoint. | eventCapturePoint: mod.CapturePoint | None | `export function OnCapturePointCapturing(eventCapturePoint): void { /* 処理 */ }` |
| `OnCapturePointLost` | When a team loses control of CapturePoint. | eventCapturePoint: mod.CapturePoint | None | `export function OnCapturePointLost(eventCapturePoint): void { /* 処理 */ }` |
| `OnGameModeEnding` | When game mode ends. | None | None | `export function OnGameModeEnding(): void { /* 処理 */ }` |
| `OnGameModeStarted` | When starting game mode. Use as the base point for initialization. | None | None | `export function OnGameModeStarted(): void { /* 処理 */ }` |
| `OnMCOMArmed` | When MCOM is armed. | eventMCOM: mod.MCOM | None | `export function OnMCOMArmed(eventMCOM): void { /* 処理 */ }` |
| `OnMCOMDefused` | When MCOM is released. | eventMCOM: mod.MCOM | None | `export function OnMCOMDefused(eventMCOM): void { /* 処理 */ }` |
| `OnMCOMDestroyed` | When MCOM explodes and is destroyed. | eventMCOM: mod.MCOM | None | `export function OnMCOMDestroyed(eventMCOM): void { /* 処理 */ }` |
| `OnRingOfFireZoneSizeChange` | When the size of RingOfFire changes. | eventRingOfFire: mod.RingOfFire, eventNumber: number | None | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* 処理 */ }` |
| `OnTimeLimitReached` | When the game mode time limit is reached. | None | None | `export function OnTimeLimitReached(): void { /* 処理 */ }` |

## Player Event

| Event | Function/Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnMandown` | When a player enters a down state. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | None | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |
| `OnPlayerDamaged` | When the player takes damage. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock | None | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerDeployed` | When the player spawns. | eventPlayer: mod.Player | None | `export function OnPlayerDeployed(eventPlayer): void { /* 処理 */ }` |
| `OnPlayerDied` | When the player dies. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | None | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerEarnedKill` | When a player gets a kill. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | None | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerEarnedKillAssist` | When a player receives a kill assist. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | None | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |
| `OnPlayerEnterAreaTrigger` | When the player enters AreaTrigger. | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | None | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` |
| `OnPlayerEnterCapturePoint` | When the player enters the Capture Point's capture range. | `OnPlayerEnterCapturePoint` | | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | None | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` |
| `OnPlayerEnterVehicle` | When a player enters a vehicle or seat. | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | None | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` |
| `OnPlayerEnterVehicleSeat` | When a player enters a vehicle or seat. | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | None | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` |
| `OnPlayerEnterVL7Cloud` | When the player enters the range of VL7Cloud. | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | None | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` |
| `OnPlayerExitAreaTrigger` | When the player exits the AreaTrigger. | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | None | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` |
| `OnPlayerExitCapturePoint` | When the player leaves the Capture Point's capture range. | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | None | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` |
| `OnPlayerExitVehicle` | When the player exits the vehicle. | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | None | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` |
| `OnPlayerExitVehicleSeat` | When the player exits the vehicle seat. | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | None | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` |
| `OnPlayerExitVL7Cloud` | When the player leaves the range of VL7Cloud. | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | None | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` |
| `OnPlayerInteract` | When the player interacts with the InteractPoint. | eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint | None | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* 処理 */ }` |
| `OnPlayerJoinGame` | When a player joins the game. | eventPlayer: mod.Player | None | `export function OnPlayerJoinGame(eventPlayer): void { /* 処理 */ }` |
| `OnPlayerLeaveGame` | When a player leaves the game. The argument is a number, not a player. | eventNumber: number | None | `export function OnPlayerLeaveGame(eventNumber): void { /* 処理 */ }` |
| `OnPlayerSwitchTeam` | When a player changes teams. | eventPlayer: mod.Player, eventTeam: mod.Team | None | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* 処理 */ }` |
| `OnPlayerUIButtonEvent` | When the player operates a UI button. | eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent | None | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* 処理 */ }` |
| `OnPlayerUndeploy` | When the player returns from the battlefield and returns to the deployment screen. | eventPlayer: mod.Player | None | `export function OnPlayerUndeploy(eventPlayer): void { /* 処理 */ }` |
| `OnRevived` | When a player is revived by another player. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | None | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |

## Portal Gadget・RayCast Event

| Event | Function/Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnPortalGadgetAimStart` | When you press the zoom button while using Portal Gadget. | eventPlayer: mod.Player | None | `export function OnPortalGadgetAimStart(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetAimStop` | When you release the zoom button while using Portal Gadget. | eventPlayer: mod.Player | None | `export function OnPortalGadgetAimStop(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetFireStart` | When you press the fire button while using Portal Gadget. | eventPlayer: mod.Player | None | `export function OnPortalGadgetFireStart(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetFireStop` | When you release the fire button while using Portal Gadget. | eventPlayer: mod.Player | None | `export function OnPortalGadgetFireStop(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetLaserToggle` | When switching tactical device input while using Portal Gadget. | eventPlayer: mod.Player, eventBoolean: boolean | None | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* 処理 */ }` |
| `OnRayCastHit` | When RayCast hits something. | eventPlayer: mod.Player, eventPoint: mod.Vector, eventNormal: mod.Vector | None | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* 処理 */ }` |
| `OnRayCastMissed` | When RayCast doesn't hit anything. | eventPlayer: mod.Player | None | `export function OnRayCastMissed(eventPlayer): void { /* 処理 */ }` |

## Vehicle events

| Event | Function/Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnVehicleDestroyed` | When the vehicle is destroyed. | eventVehicle: mod.Vehicle | None | `export function OnVehicleDestroyed(eventVehicle): void { /* 処理 */ }` |
| `OnVehicleSpawned` | When a vehicle spawns on the map. | eventVehicle: mod.Vehicle | None | `export function OnVehicleSpawned(eventVehicle): void { /* 処理 */ }` |

# Next appendix to read

The list of functions for actions and value acquisition is divided into the following "Appendix A-2: List of actions and value acquisition (basic operations)".
