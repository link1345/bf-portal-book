---
title: "Appendix A-1: Event List"
free: true
---

# How to read this appendix

This appendix lists the events and actions available in BF6 Portal TypeScript based on the `mod` namespace of the official SDK `code/types/mod/index.d.ts`. The reference SDK is `1.3.3.0` according to `index.d.ts`. Please be sure to search for `index.d.ts` before implementation, as it may increase or decrease with SDK updates.

SDK 1.3.1.0 adds `mod.strings`, `MusicPackages.Radio`, `Radio_*` music events and parameters, and several weapon and gadget constants. `HybridExample` is a concrete example of reading raw string values through `mod.strings[key]`.
SDK 1.3.2.0 includes `OnGolmudTrainStopped`, `GolmudTrainSendMoveCommand`, `GetGolmudTrainLocation`, `GolmudTrainMoveCommands`, and `GolmudTrainStopReason` for `MP_GolmudRailway`. See Appendix B's `GolmudTrainExample` for a concrete sample.
SDK 1.3.3.0 adds the `Bomb` type, `OngoingBomb`, `OnBombPickedUp`, `OnBombDropped`, and `OnBombStateChanged` for Obliteration. See Appendix B's `ObliterationExample` for a concrete sample.

In TypeScript, events are written as `export function On...` or `export function Ongoing...`. Actions and value retrieval are called with `mod.`, such as `mod.Set...`, `mod.Get...`, `mod.Create...`.

Text displayed on screen is registered first in `Strings.json`.

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
| Function / Purpose | What to detect or do |
| Main arguments | Frequently used arguments. If there is an overload, show a representative form |
| Return value | `void` is written as "none". Value retrieval functions write the type |
| Usage example | Minimum example of where to put the function and how to call it |

# Event List

Events are entry points called by Portal. They are not functions you call yourself, such as `mod.OnPlayerJoinGame()`. If the function name and argument format match the SDK, it will be automatically executed when the corresponding event occurs.

Because `Ongoing...` events run continuously, it quickly becomes heavy when you include scanning all players, regenerating the UI, heavy calculations, and repeated log output. Design them to run only when state actually needs to change.

## Continuously Running Events

| Event | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OngoingGlobal` | An event for continuous evaluation targeting Global. Do not run heavy processing every time; only watch for state changes. | None | None | `export function OngoingGlobal(): void { /* code */ }` |
| `OngoingAreaTrigger` | Event that continuously evaluates AreaTrigger. Do not run heavy processing every time; only watch for state changes. | eventAreaTrigger: mod.AreaTrigger | None | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* code */ }` |
| `OngoingBomb` | Event that continuously evaluates Bomb. Do not run heavy processing every time; only watch for state changes. | eventBomb: mod.Bomb | None | `export function OngoingBomb(eventBomb): void { /* code */ }` |
| `OngoingCapturePoint` | Event that continuously evaluates CapturePoint. Do not run heavy processing every time; only watch for state changes. | eventCapturePoint: mod.CapturePoint | None | `export function OngoingCapturePoint(eventCapturePoint): void { /* code */ }` |
| `OngoingEmplacementSpawner` | Event that continuously evaluates EmplacementSpawner. Do not run heavy processing every time; only watch for state changes. | eventEmplacementSpawner: mod.EmplacementSpawner | None | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* code */ }` |
| `OngoingHQ` | Event that continuously evaluates HQ. Do not run heavy processing every time; only watch for state changes. | eventHQ: mod.HQ | None | `export function OngoingHQ(eventHQ): void { /* code */ }` |
| `OngoingInteractPoint` | Event that continuously evaluates InteractPoint. Do not run heavy processing every time; only watch for state changes. | eventInteractPoint: mod.InteractPoint | None | `export function OngoingInteractPoint(eventInteractPoint): void { /* code */ }` |
| `OngoingLootSpawner` | An event that continuously evaluates LootSpawner. Do not run heavy processing every time; only watch for state changes. | eventLootSpawner: mod.LootSpawner | None | `export function OngoingLootSpawner(eventLootSpawner): void { /* code */ }` |
| `OngoingMCOM` | Event to continuously evaluate MCOM. Do not run heavy processing every time; only watch for state changes. | eventMCOM: mod.MCOM | None | `export function OngoingMCOM(eventMCOM): void { /* code */ }` |
| `OngoingPlayer` | Event that continuously evaluates Player. Do not run heavy processing every time; only watch for state changes. | eventPlayer: mod.Player | None | `export function OngoingPlayer(eventPlayer): void { /* code */ }` |
| `OngoingRingOfFire` | Event that continuously evaluates RingOfFire. Do not run heavy processing every time; only watch for state changes. | eventRingOfFire: mod.RingOfFire | None | `export function OngoingRingOfFire(eventRingOfFire): void { /* code */ }` |
| `OngoingSector` | Event that continuously evaluates the sector. Do not run heavy processing every time; only watch for state changes. | eventSector: mod.Sector | None | `export function OngoingSector(eventSector): void { /* code */ }` |
| `OngoingSpawner` | Event that continuously evaluates Spawner. Do not run heavy processing every time; only watch for state changes. | eventSpawner: mod.Spawner | None | `export function OngoingSpawner(eventSpawner): void { /* code */ }` |
| `OngoingSpawnPoint` | Event that continuously evaluates SpawnPoint. Do not run heavy processing every time; only watch for state changes. | eventSpawnPoint: mod.SpawnPoint | None | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* code */ }` |
| `OngoingTeam` | An event for continuous evaluation of teams. Do not run heavy processing every time; only watch for state changes. | eventTeam: mod.Team | None | `export function OngoingTeam(eventTeam): void { /* code */ }` |
| `OngoingVehicle` | Event that continuously evaluates Vehicle. Do not run heavy processing every time; only watch for state changes. | eventVehicle: mod.Vehicle | None | `export function OngoingVehicle(eventVehicle): void { /* code */ }` |
| `OngoingVehicleSpawner` | Event that continuously evaluates VehicleSpawner. Do not run heavy processing every time; only watch for state changes. | eventVehicleSpawner: mod.VehicleSpawner | None | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* code */ }` |
| `OngoingWaypointPath` | Event that continuously evaluates WaypointPath. Do not run heavy processing every time; only watch for state changes. | eventWaypointPath: mod.WaypointPath | None | `export function OngoingWaypointPath(eventWaypointPath): void { /* code */ }` |
| `OngoingWorldIcon` | Event that continuously evaluates WorldIcon. Do not run heavy processing every time; only watch for state changes. | eventWorldIcon: mod.WorldIcon | None | `export function OngoingWorldIcon(eventWorldIcon): void { /* code */ }` |

## AI Events

| Event | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnAIMoveToFailed` | When the AI soldier interrupts or fails to move to the destination. | eventPlayer: mod.Player | None | `export function OnAIMoveToFailed(eventPlayer): void { /* code */ }` |
| `OnAIMoveToRunning` | When the AI soldier starts moving to the target location. | eventPlayer: mod.Player | None | `export function OnAIMoveToRunning(eventPlayer): void { /* code */ }` |
| `OnAIMoveToSucceeded` | When the AI soldier reaches the target point. | eventPlayer: mod.Player | None | `export function OnAIMoveToSucceeded(eventPlayer): void { /* code */ }` |
| `OnAIParachuteRunning` | When an AI soldier is performing the parachute action. | eventPlayer: mod.Player | None | `export function OnAIParachuteRunning(eventPlayer): void { /* code */ }` |
| `OnAIParachuteSucceeded` | When the AI soldier completes the parachute action. | eventPlayer: mod.Player | None | `export function OnAIParachuteSucceeded(eventPlayer): void { /* code */ }` |
| `OnAIWaypointIdleFailed` | When the AI soldier stops or fails to patrol the waypoint. | eventPlayer: mod.Player | None | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* code */ }` |
| `OnAIWaypointIdleRunning` | When an AI soldier starts patrolling waypoints. | eventPlayer: mod.Player | None | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* code */ }` |
| `OnAIWaypointIdleSucceeded` | When an AI soldier completes a waypoint patrol. | eventPlayer: mod.Player | None | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* code */ }` |
| `OnSpawnerSpawned` | When an AI soldier appears from AISpawner. | eventPlayer: mod.Player, eventSpawner: mod.Spawner | None | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* code */ }` |

## Game Progress and Objective Events

| Event | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnCapturePointCaptured` | When a team captures CapturePoint. | eventCapturePoint: mod.CapturePoint | None | `export function OnCapturePointCaptured(eventCapturePoint): void { /* code */ }` |
| `OnCapturePointCapturing` | When the team begins capturing CapturePoint. | eventCapturePoint: mod.CapturePoint | None | `export function OnCapturePointCapturing(eventCapturePoint): void { /* code */ }` |
| `OnCapturePointLost` | When a team loses control of CapturePoint. | eventCapturePoint: mod.CapturePoint | None | `export function OnCapturePointLost(eventCapturePoint): void { /* code */ }` |
| `OnBombPickedUp` | When a player picks up a Bomb. | eventBomb: mod.Bomb, eventPlayer: mod.Player | None | `export function OnBombPickedUp(eventBomb, eventPlayer): void { /* code */ }` |
| `OnBombDropped` | When a player drops a Bomb. | eventBomb: mod.Bomb, eventPlayer: mod.Player | None | `export function OnBombDropped(eventBomb, eventPlayer): void { /* code */ }` |
| `OnBombStateChanged` | When a Bomb changes state. | eventBomb: mod.Bomb, eventBombState: mod.BombState | None | `export function OnBombStateChanged(eventBomb, eventBombState): void { /* code */ }` |
| `OnGameModeEnding` | When game mode ends. | None | None | `export function OnGameModeEnding(): void { /* code */ }` |
| `OnGameModeStarted` | When starting game mode. Use as the base point for initialization. | None | None | `export function OnGameModeStarted(): void { /* code */ }` |
| `OnMCOMArmed` | When MCOM is armed. | eventMCOM: mod.MCOM | None | `export function OnMCOMArmed(eventMCOM): void { /* code */ }` |
| `OnMCOMDefused` | When MCOM is defused. | eventMCOM: mod.MCOM | None | `export function OnMCOMDefused(eventMCOM): void { /* code */ }` |
| `OnMCOMDestroyed` | When MCOM explodes and is destroyed. | eventMCOM: mod.MCOM | None | `export function OnMCOMDestroyed(eventMCOM): void { /* code */ }` |
| `OnRingOfFireZoneSizeChange` | When the size of RingOfFire changes. | eventRingOfFire: mod.RingOfFire, eventNumber: number | None | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* code */ }` |
| `OnTimeLimitReached` | When the game mode time limit is reached. | None | None | `export function OnTimeLimitReached(): void { /* code */ }` |

## Player Events

| Event | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnMandown` | When a player enters a down state. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | None | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* code */ }` |
| `OnPlayerDamaged` | When the player takes damage. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock | None | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* code */ }` |
| `OnPlayerDeployed` | When the player spawns. | eventPlayer: mod.Player | None | `export function OnPlayerDeployed(eventPlayer): void { /* code */ }` |
| `OnPlayerDied` | When the player dies. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | None | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* code */ }` |
| `OnPlayerEarnedKill` | When a player gets a kill. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | None | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* code */ }` |
| `OnPlayerEarnedKillAssist` | When a player earns a kill assist. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | None | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* code */ }` |
| `OnPlayerEnterAreaTrigger` | When the player enters AreaTrigger. | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | None | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* code */ }` |
| `OnPlayerEnterCapturePoint` | When the player enters the Capture Point's capture range. | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | None | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* code */ }` |
| `OnPlayerEnterVehicle` | When a player enters a vehicle or seat. | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | None | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* code */ }` |
| `OnPlayerEnterVehicleSeat` | When a player enters a vehicle or seat. | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | None | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* code */ }` |
| `OnPlayerEnterVL7Cloud` | When the player enters the range of VL7Cloud. | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | None | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* code */ }` |
| `OnPlayerExitAreaTrigger` | When the player exits the AreaTrigger. | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | None | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* code */ }` |
| `OnPlayerExitCapturePoint` | When the player leaves the Capture Point's capture range. | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | None | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* code */ }` |
| `OnPlayerExitVehicle` | When the player exits the vehicle. | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | None | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* code */ }` |
| `OnPlayerExitVehicleSeat` | When the player exits the vehicle seat. | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | None | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* code */ }` |
| `OnPlayerExitVL7Cloud` | When the player leaves the range of VL7Cloud. | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | None | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* code */ }` |
| `OnPlayerInteract` | When the player interacts with the InteractPoint. | eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint | None | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* code */ }` |
| `OnPlayerJoinGame` | When a player joins the game. | eventPlayer: mod.Player | None | `export function OnPlayerJoinGame(eventPlayer): void { /* code */ }` |
| `OnPlayerLeaveGame` | When a player leaves the game. The argument is a number, not a player. | eventNumber: number | None | `export function OnPlayerLeaveGame(eventNumber): void { /* code */ }` |
| `OnPlayerSwitchTeam` | When a player changes teams. | eventPlayer: mod.Player, eventTeam: mod.Team | None | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* code */ }` |
| `OnPlayerUIButtonEvent` | When the player operates a UI button. | eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent | None | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* code */ }` |
| `OnPlayerUndeploy` | When the player returns from the battlefield and returns to the deployment screen. | eventPlayer: mod.Player | None | `export function OnPlayerUndeploy(eventPlayer): void { /* code */ }` |
| `OnRevived` | When a player is revived by another player. | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | None | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* code */ }` |

## Portal Gadget and RayCast Events

| Event | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnPortalGadgetAimStart` | When the zoom button is pressed while using Portal Gadget. | eventPlayer: mod.Player | None | `export function OnPortalGadgetAimStart(eventPlayer): void { /* code */ }` |
| `OnPortalGadgetAimStop` | When the zoom button is released while using Portal Gadget. | eventPlayer: mod.Player | None | `export function OnPortalGadgetAimStop(eventPlayer): void { /* code */ }` |
| `OnPortalGadgetFireStart` | When the fire button is pressed while using Portal Gadget. | eventPlayer: mod.Player | None | `export function OnPortalGadgetFireStart(eventPlayer): void { /* code */ }` |
| `OnPortalGadgetFireStop` | When the fire button is released while using Portal Gadget. | eventPlayer: mod.Player | None | `export function OnPortalGadgetFireStop(eventPlayer): void { /* code */ }` |
| `OnPortalGadgetLaserToggle` | When switching tactical device input while using Portal Gadget. | eventPlayer: mod.Player, eventBoolean: boolean | None | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* code */ }` |
| `OnRayCastHit` | When RayCast hits something. | eventPlayer: mod.Player, eventPoint: mod.Vector, eventNormal: mod.Vector | None | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* code */ }` |
| `OnRayCastMissed` | When RayCast doesn't hit anything. | eventPlayer: mod.Player | None | `export function OnRayCastMissed(eventPlayer): void { /* code */ }` |

## Vehicle Events

| Event | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `OnVehicleDestroyed` | When the vehicle is destroyed. | eventVehicle: mod.Vehicle | None | `export function OnVehicleDestroyed(eventVehicle): void { /* code */ }` |
| `OnVehicleSpawned` | When a vehicle spawns on the map. | eventVehicle: mod.Vehicle | None | `export function OnVehicleSpawned(eventVehicle): void { /* code */ }` |

## Golmud Train Events

| Event | Purpose | Main arguments | Return value | Example |
| --- | --- | --- | --- | --- |
| `OnGolmudTrainStopped` | Called when the Railway to Golmud train stops at the east terminal, west terminal, or in transit. | eventGolmudTrainStopReason: mod.GolmudTrainStopReason | None | `export function OnGolmudTrainStopped(reason): void { /* code */ }` |

Use `mod.GolmudTrainSendMoveCommand(mod.GolmudTrainMoveCommands.MoveWest)`, `Stop`, or `MoveEast` to command the train.
Use `mod.GetGolmudTrainLocation()` to read its current position.

# Next appendix to read

The list of functions for actions and value retrieval is divided into Appendix A-2: Actions and Value Retrieval (Basic Operations).
