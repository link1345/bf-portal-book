---
title: "附錄 A-1：事件列表"
free: true
---

# 如何閱讀本附錄

本附錄基於官方 SDK `code/types/mod/index.d.ts` 的 `mod` 命名空間列出了 BF6 Portal TypeScript 中可用的事件和動作。參考 SDK 以 `index.d.ts` 為準，為 `1.3.3.0`。請務必在實作前搜尋 `index.d.ts`，因為它可能會隨著 SDK 更新而增加或減少。

SDK 1.3.1.0 追加了 `mod.strings`、`MusicPackages.Radio`、`Radio_*` 系音樂事件和參數，以及若干武器和 Gadget 常數。`HybridExample` 是透過 `mod.strings[key]` 直接讀取字串值的具體範例。
SDK 1.3.2.0 中可以確認 `MP_GolmudRailway` 使用的 `OnGolmudTrainStopped`、`GolmudTrainSendMoveCommand`、`GetGolmudTrainLocation`、`GolmudTrainMoveCommands`、`GolmudTrainStopReason`。具體範例請參見附錄 B 的 `GolmudTrainExample`。
SDK 1.3.3.0 為 Obliteration 新增了 `Bomb` 型別、`OngoingBomb`、`OnBombPickedUp`、`OnBombDropped`、`OnBombStateChanged`。具體範例請參見附錄 B 的 `ObliterationExample`。

在 TypeScript 中，事件被寫為 `export function On...` 或 `export function Ongoing...`。使用 `mod.` 呼叫動作和值取得，例如 `mod.Set...`、`mod.Get...`、`mod.Create...`。

要在螢幕上顯示的文字先在 `Strings.json` 中註冊。

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

圖例如下：

| 項目 | 含義 |
| --- | --- |
| 功能 / 目的 | 檢測什麼，或執行什麼 |
| 主要參數 | 常用參數。有重載時列出代表形式 |
| 回傳值 | `void` 寫作「無」。值取得函式寫出型別 |
| 使用範例 | 函式放置位置以及呼叫方式的最小範例 |

# 事件列表

事件是由 Portal 呼叫的入口。不是你自己呼叫 `mod.OnPlayerJoinGame()` 之類的東西。如果函數名稱和參數格式與SDK匹配，則當相應事件發生時會自動執行。

由於 `Ongoing...` 系列會持續運行，如果放入全玩家掃描、UI 重新生成、重計算或連續日誌輸出，很快就會變重。請設計成只有狀態需要改變時才執行。

## 連續執行事件

| 事件 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `OngoingGlobal` | 全球的持續評估事件。不要每次都做繁重的處理，只看狀態變化。 | 無 | 無 | `export function OngoingGlobal(): void { /* 處理 */ }` |
| `OngoingAreaTrigger` | 持續評估 AreaTrigger 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventAreaTrigger: mod.AreaTrigger | 無 | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* 處理 */ }` |
| `OngoingBomb` | 持續評估 Bomb 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventBomb: mod.Bomb | 無 | `export function OngoingBomb(eventBomb): void { /* 處理 */ }` |
| `OngoingCapturePoint` | 持續評估 CapturePoint 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventCapturePoint: mod.CapturePoint | 無 | `export function OngoingCapturePoint(eventCapturePoint): void { /* 處理 */ }` |
| `OngoingEmplacementSpawner` | 持續評估 EmplacementSpawner 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventEmplacementSpawner: mod.EmplacementSpawner | 無 | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* 處理 */ }` |
| `OngoingHQ` | 持續評估HQ的事件。不要每次都做繁重的處理，只看狀態變化。 | eventHQ: mod.HQ | 無 | `export function OngoingHQ(eventHQ): void { /* 處理 */ }` |
| `OngoingInteractPoint` | 持續評估 InteractPoint 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventInteractPoint: mod.InteractPoint | 無 | `export function OngoingInteractPoint(eventInteractPoint): void { /* 處理 */ }` |
| `OngoingLootSpawner` | 持續評估 LootSpawner 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventLootSpawner: mod.LootSpawner | 無 | `export function OngoingLootSpawner(eventLootSpawner): void { /* 處理 */ }` |
| `OngoingMCOM` | 持續評估 MCOM 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventMCOM: mod.MCOM | 無 | `export function OngoingMCOM(eventMCOM): void { /* 處理 */ }` |
| `OngoingPlayer` | 持續評估玩家的事件。不要每次都做繁重的處理，只看狀態變化。 | eventPlayer: mod.Player | 無 | `export function OngoingPlayer(eventPlayer): void { /* 處理 */ }` |
| `OngoingRingOfFire` | 持續評估 RingOfFire 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventRingOfFire: mod.RingOfFire | 無 | `export function OngoingRingOfFire(eventRingOfFire): void { /* 處理 */ }` |
| `OngoingSector` | 持續評估Sector的事件。不要每次都做繁重的處理，只看狀態變化。 | eventSector: mod.Sector | 無 | `export function OngoingSector(eventSector): void { /* 處理 */ }` |
| `OngoingSpawner` | 持續評估 Spawner 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventSpawner: mod.Spawner | 無 | `export function OngoingSpawner(eventSpawner): void { /* 處理 */ }` |
| `OngoingSpawnPoint` | 持續評估 SpawnPoint 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventSpawnPoint: mod.SpawnPoint | 無 | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* 處理 */ }` |
| `OngoingTeam` | 對隊伍進行持續評估的事件。不要每次都做繁重的處理，只看狀態變化。 | eventTeam: mod.Team | 無 | `export function OngoingTeam(eventTeam): void { /* 處理 */ }` |
| `OngoingVehicle` | 持續評估車輛的事件。不要每次都做繁重的處理，只看狀態變化。 | eventVehicle: mod.Vehicle | 無 | `export function OngoingVehicle(eventVehicle): void { /* 處理 */ }` |
| `OngoingVehicleSpawner` | 持續評估 VehicleSpawner 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventVehicleSpawner: mod.VehicleSpawner | 無 | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* 處理 */ }` |
| `OngoingWaypointPath` | 持續評估 WaypointPath 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventWaypointPath: mod.WaypointPath | 無 | `export function OngoingWaypointPath(eventWaypointPath): void { /* 處理 */ }` |
| `OngoingWorldIcon` | 持續評估 WorldIcon 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventWorldIcon: mod.WorldIcon | 無 | `export function OngoingWorldIcon(eventWorldIcon): void { /* 處理 */ }` |

## AI事件

| 事件 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `OnAIMoveToFailed` | 當AI 士兵中斷或未能移動到目的地。 | eventPlayer: mod.Player | 無 | `export function OnAIMoveToFailed(eventPlayer): void { /* 處理 */ }` |
| `OnAIMoveToRunning` | 當AI 士兵開始移動到目標位置。 | eventPlayer: mod.Player | 無 | `export function OnAIMoveToRunning(eventPlayer): void { /* 處理 */ }` |
| `OnAIMoveToSucceeded` | 當AI 士兵到達目標點。 | eventPlayer: mod.Player | 無 | `export function OnAIMoveToSucceeded(eventPlayer): void { /* 處理 */ }` |
| `OnAIParachuteRunning` | 當AI 士兵進行跳傘動作時。 | eventPlayer: mod.Player | 無 | `export function OnAIParachuteRunning(eventPlayer): void { /* 處理 */ }` |
| `OnAIParachuteSucceeded` | 當AI 士兵的跳傘動作完成時。 | eventPlayer: mod.Player | 無 | `export function OnAIParachuteSucceeded(eventPlayer): void { /* 處理 */ }` |
| `OnAIWaypointIdleFailed` | 當AI 士兵停止或未能巡邏Waypoint時。 | eventPlayer: mod.Player | 無 | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* 處理 */ }` |
| `OnAIWaypointIdleRunning` | 當AI 士兵開始巡邏Waypoint時。 | eventPlayer: mod.Player | 無 | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* 處理 */ }` |
| `OnAIWaypointIdleSucceeded` | 當AI 士兵完成Waypoint巡邏。 | eventPlayer: mod.Player | 無 | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* 處理 */ }` |
| `OnSpawnerSpawned` | 當AI 士兵從AI Spawner出現。 | eventPlayer: mod.Player, eventSpawner: mod.Spawner | 無 | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* 處理 */ }` |

## 遊戲進度/目標事件

| 事件 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `OnCapturePointCaptured` | 當隊伍佔領 CapturePoint。 | eventCapturePoint: mod.CapturePoint | 無 | `export function OnCapturePointCaptured(eventCapturePoint): void { /* 處理 */ }` |
| `OnCapturePointCapturing` | 當隊伍開始佔領 CapturePoint 時。 | eventCapturePoint: mod.CapturePoint | 無 | `export function OnCapturePointCapturing(eventCapturePoint): void { /* 處理 */ }` |
| `OnCapturePointLost` | 當隊伍失去 CapturePoint 的控制權。 | eventCapturePoint: mod.CapturePoint | 無 | `export function OnCapturePointLost(eventCapturePoint): void { /* 處理 */ }` |
| `OnBombPickedUp` | 玩家拾起 Bomb 時。 | eventBomb: mod.Bomb, eventPlayer: mod.Player | 無 | `export function OnBombPickedUp(eventBomb, eventPlayer): void { /* 處理 */ }` |
| `OnBombDropped` | 玩家丟下 Bomb 時。 | eventBomb: mod.Bomb, eventPlayer: mod.Player | 無 | `export function OnBombDropped(eventBomb, eventPlayer): void { /* 處理 */ }` |
| `OnBombStateChanged` | Bomb 狀態變化時。 | eventBomb: mod.Bomb, eventBombState: mod.BombState | 無 | `export function OnBombStateChanged(eventBomb, eventBombState): void { /* 處理 */ }` |
| `OnGameModeEnding` | 遊戲模式結束時。 | 無 | 無 | `export function OnGameModeEnding(): void { /* 處理 */ }` |
| `OnGameModeStarted` | 啟動遊戲模式時。用作初始化的基點。 | 無 | 無 | `export function OnGameModeStarted(): void { /* 處理 */ }` |
| `OnMCOMArmed` | 當 MCOM 被裝設時。 | eventMCOM: mod.MCOM | 無 | `export function OnMCOMArmed(eventMCOM): void { /* 處理 */ }` |
| `OnMCOMDefused` | MCOM 被解除時。 | eventMCOM: mod.MCOM | 無 | `export function OnMCOMDefused(eventMCOM): void { /* 處理 */ }` |
| `OnMCOMDestroyed` | MCOM爆炸並被摧毀時。 | eventMCOM: mod.MCOM | 無 | `export function OnMCOMDestroyed(eventMCOM): void { /* 處理 */ }` |
| `OnRingOfFireZoneSizeChange` | 當 RingOfFire 的大小改變時。 | eventRingOfFire: mod.RingOfFire, eventNumber: number | 無 | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* 處理 */ }` |
| `OnTimeLimitReached` | 當達到遊戲模式時間限制時。 | 無 | 無 | `export function OnTimeLimitReached(): void { /* 處理 */ }` |

## 玩家事件

| 事件 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `OnMandown` | 當玩家進入down狀態時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | 無 | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* 處理 */ }` |
| `OnPlayerDamaged` | 當玩家受傷時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock | 無 | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* 處理 */ }` |
| `OnPlayerDeployed` | 玩家出擊時。 | eventPlayer: mod.Player | 無 | `export function OnPlayerDeployed(eventPlayer): void { /* 處理 */ }` |
| `OnPlayerDied` | 當玩家死亡時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | 無 | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 處理 */ }` |
| `OnPlayerEarnedKill` | 當玩家殺死對手時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | 無 | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 處理 */ }` |
| `OnPlayerEarnedKillAssist` | 當玩家收到擊殺助攻時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | 無 | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* 處理 */ }` |
| `OnPlayerEnterAreaTrigger` | 當玩家進入AreaTrigger。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | 無 | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 處理 */ }` |
| `OnPlayerEnterCapturePoint` | 當玩家進入佔領點的佔領範圍。 | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | 無 | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* 處理 */ }` |
| `OnPlayerEnterVehicle` | 當玩家進入車輛或座位時。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | 無 | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* 處理 */ }` |
| `OnPlayerEnterVehicleSeat` | 當玩家進入車輛或座位時。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | 無 | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 處理 */ }` |
| `OnPlayerEnterVL7Cloud` | 當玩家進入VL7Cloud的範圍時。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | 無 | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 處理 */ }` |
| `OnPlayerExitAreaTrigger` | 當玩家離開 AreaTrigger 時。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | 無 | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 處理 */ }` |
| `OnPlayerExitCapturePoint` | 當玩家離開佔領點的佔領範圍。 | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | 無 | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* 處理 */ }` |
| `OnPlayerExitVehicle` | 當玩家離開車輛時。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | 無 | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* 處理 */ }` |
| `OnPlayerExitVehicleSeat` | 當玩家離開車輛座椅時。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | 無 | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 處理 */ }` |
| `OnPlayerExitVL7Cloud` | 當玩家離開VL7Cloud的範圍時。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | 無 | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 處理 */ }` |
| `OnPlayerInteract` | 當玩家與 InteractPoint 互動時。 | eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint | 無 | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* 處理 */ }` |
| `OnPlayerJoinGame` | 當玩家加入遊戲時。 | eventPlayer: mod.Player | 無 | `export function OnPlayerJoinGame(eventPlayer): void { /* 處理 */ }` |
| `OnPlayerLeaveGame` | 當玩家離開遊戲時。參數是一個數字，而不是一個玩家。 | eventNumber: number | 無 | `export function OnPlayerLeaveGame(eventNumber): void { /* 處理 */ }` |
| `OnPlayerSwitchTeam` | 當玩家更換隊伍。 | eventPlayer: mod.Player, eventTeam: mod.Team | 無 | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* 處理 */ }` |
| `OnPlayerUIButtonEvent` | 當玩家操作 UI 按鈕。 | eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent | 無 | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* 處理 */ }` |
| `OnPlayerUndeploy` | 當玩家從戰場返回並返回部署畫面。 | eventPlayer: mod.Player | 無 | `export function OnPlayerUndeploy(eventPlayer): void { /* 處理 */ }` |
| `OnRevived` | 當一名玩家被另一名玩家復活時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | 無 | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* 處理 */ }` |

## Portal Gadget・RayCast 事件

| 事件 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `OnPortalGadgetAimStart` | 使用 Portal Gadget 時按下縮放按鈕。 | eventPlayer: mod.Player | 無 | `export function OnPortalGadgetAimStart(eventPlayer): void { /* 處理 */ }` |
| `OnPortalGadgetAimStop` | 當你在使用 Portal Gadget 時釋放縮放按鈕。 | eventPlayer: mod.Player | 無 | `export function OnPortalGadgetAimStop(eventPlayer): void { /* 處理 */ }` |
| `OnPortalGadgetFireStart` | 當你在使用 Portal Gadget 時按下啟動按鈕。 | eventPlayer: mod.Player | 無 | `export function OnPortalGadgetFireStart(eventPlayer): void { /* 處理 */ }` |
| `OnPortalGadgetFireStop` | 當你在使用 Portal Gadget 時釋放開火按鈕時。 | eventPlayer: mod.Player | 無 | `export function OnPortalGadgetFireStop(eventPlayer): void { /* 處理 */ }` |
| `OnPortalGadgetLaserToggle` | 使用 Portal Gadget 時切換戰術裝備輸入時。 | eventPlayer: mod.Player, eventBoolean: boolean | 無 | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* 處理 */ }` |
| `OnRayCastHit` | 當 RayCast 擊中某物時。 | eventPlayer: mod.Player, eventPoint: mod.Vector, eventNormal: mod.Vector | 無 | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* 處理 */ }` |
| `OnRayCastMissed` | 當 RayCast 沒有擊中任何東西時。 | eventPlayer: mod.Player | 無 | `export function OnRayCastMissed(eventPlayer): void { /* 處理 */ }` |

## 車輛事件

| 事件 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `OnVehicleDestroyed` | 當車輛被破壞時。 | eventVehicle: mod.Vehicle | 無 | `export function OnVehicleDestroyed(eventVehicle): void { /* 處理 */ }` |
| `OnVehicleSpawned` | 當車輛在地圖上產生時。 | eventVehicle: mod.Vehicle | 無 | `export function OnVehicleSpawned(eventVehicle): void { /* 處理 */ }` |

## Golmud 列車事件

| 事件 | 功能 / 目的 | 主要參數 | 返回值 | 範例 |
| --- | --- | --- | --- | --- |
| `OnGolmudTrainStopped` | Railway to Golmud 的列車在東端、西端或中途停止時呼叫。 | eventGolmudTrainStopReason: mod.GolmudTrainStopReason | 無 | `export function OnGolmudTrainStopped(reason): void { /* 處理 */ }` |

控制列車時使用 `mod.GolmudTrainSendMoveCommand(mod.GolmudTrainMoveCommands.MoveWest)`、`Stop`、`MoveEast`。
目前位置可以透過 `mod.GetGolmudTrainLocation()` 取得。

# 接下來閱讀的附錄

動作和值取得的函數清單分為以下「附錄 A-2：動作和值取得清單（基本操作）」。
