---
title: "附錄 A-1：事件列表"
free: true
---

::::message
本附錄目前只是粗略的機器翻譯，文字可能非常不自然。我之後會認真修改，暫時請多包涵。
::::

# 如何閱讀本附錄

本附錄基於本地 SDK `books/bf_portal_doc/tmp/bf6-sdk/code/types/mod/index.d.ts` 的 `mod` 命名空間列出了 BF6 Portal TypeScript 中可用的事件和操作。參考 SDK 為 `1.2.3.0`、`sdk.version.json` 和 `index.d.ts`。請務必在實施前搜尋 `index.d.ts`，因為它可能會隨著 SDK 更新而增加或減少。

在 TypeScript 中，事件被寫為 `export function On...` 或 `export function Ongoing...`。使用 `mod.` 呼叫操作和值檢索，例如 `mod.Set...`、`mod.Get...`、`mod.Create...`。

要在螢幕上顯示的字元首先在 `Strings.json` 中註冊。

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

傳說是：

|項目 |意義|
| --- | --- |
|功能/目的|檢測什麼或做什麼 |
|主要論點|經常使用的參數。若超載，請張貼代表表格 |
|傳回值 | `void` 寫為「none」。值檢索函數寫入類型 |
|使用範例 |函數放置位置以及如何呼叫的最小範例 |

# 事件列表

事件是從 Portal 端呼叫的入口。這不是您自己所說的 `mod.OnPlayerJoinGame()` 之類的東西。如果函數名稱和參數格式與SDK匹配，則當相應事件發生時會自動執行。

由於 `Ongoing...` 系統持續運行，當您掃描所有玩家、重新產生 UI、大量計算和重複命中日誌時，它很快就會變得繁重。將其設計為僅在狀態需要改變時才執行。

## 連續執行事件

|活動 |功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `OngoingGlobal` | `OngoingGlobal` |全球的持續評估活動。不要每次都做繁重的處理，只看狀態變化。 |無 |無 | `export function OngoingGlobal(): void { /* 処理 */ }` | `export function OngoingGlobal(): void { /* 処理 */ }` |
| `OngoingAreaTrigger` | `OngoingAreaTrigger` |持續評估 AreaTrigger 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventAreaTrigger：mod.AreaTrigger |無 | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* 処理 */ }` | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* 処理 */ }` |
| `OngoingCapturePoint` | `OngoingCapturePoint` |持續評估 CapturePoint 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventCapturePoint：mod.CapturePoint |無 | `export function OngoingCapturePoint(eventCapturePoint): void { /* 処理 */ }` | `export function OngoingCapturePoint(eventCapturePoint): void { /* 処理 */ }` |
| `OngoingEmplacementSpawner` | `OngoingEmplacementSpawner` |持續評估 EmplacementSpawner 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventEmplacementSpawner：mod.EmplacementSpawner |無 | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* 処理 */ }` | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* 処理 */ }` |
| `OngoingHQ` | `OngoingHQ` |持續評估總部的事件。不要每次都做繁重的處理，只看狀態變化。 |事件總部：mod.HQ |無 | `export function OngoingHQ(eventHQ): void { /* 処理 */ }` | `export function OngoingHQ(eventHQ): void { /* 処理 */ }` |
| `OngoingInteractPoint` | `OngoingInteractPoint` |持續評估 InteractPoint 的事件。不要每次都做繁重的處理，只看狀態變化。 |事件互動點：mod.InteractPoint |無 | `export function OngoingInteractPoint(eventInteractPoint): void { /* 処理 */ }` | `export function OngoingInteractPoint(eventInteractPoint): void { /* 処理 */ }` |
| `OngoingLootSpawner` | `OngoingLootSpawner` |持續評估 LootSpawner 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventLootSpawner：mod.LootSpawner |無 | `export function OngoingLootSpawner(eventLootSpawner): void { /* 処理 */ }` | `export function OngoingLootSpawner(eventLootSpawner): void { /* 処理 */ }` |
| `OngoingMCOM` | `OngoingMCOM` |持續評估 MCOM 的活動。不要每次都做繁重的處理，只看狀態變化。 | eventMCOM：mod.MCOM |無 | `export function OngoingMCOM(eventMCOM): void { /* 処理 */ }` | `export function OngoingMCOM(eventMCOM): void { /* 処理 */ }` |
| `OngoingPlayer` | `OngoingPlayer` |持續評估玩家的事件。不要每次都做繁重的處理，只看狀態變化。 |事件播放器：mod.Player |無 | `export function OngoingPlayer(eventPlayer): void { /* 処理 */ }` | `export function OngoingPlayer(eventPlayer): void { /* 処理 */ }` |
| `OngoingRingOfFire` | `OngoingRingOfFire` |持續評估 RingOfFire 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventRingOfFire：mod.RingOfFire |無 | `export function OngoingRingOfFire(eventRingOfFire): void { /* 処理 */ }` | `export function OngoingRingOfFire(eventRingOfFire): void { /* 処理 */ }` |
| `OngoingSector` | `OngoingSector` |持續評估該產業的活動。不要每次都做繁重的處理，只看狀態變化。 | eventSector：mod.Sector |無 | `export function OngoingSector(eventSector): void { /* 処理 */ }` | `export function OngoingSector(eventSector): void { /* 処理 */ }` |
| `OngoingSpawner` | `OngoingSpawner` |持續評估 Spawner 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventSpawner：mod.Spawner |無 | `export function OngoingSpawner(eventSpawner): void { /* 処理 */ }` | `export function OngoingSpawner(eventSpawner): void { /* 処理 */ }` |
| `OngoingSpawnPoint` | `OngoingSpawnPoint` |持續評估 SpawnPoint 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventSpawnPoint：mod.SpawnPoint |無 | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* 処理 */ }` | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* 処理 */ }` |
| `OngoingTeam` | `OngoingTeam` |對團隊進行持續評估的活動。不要每次都做繁重的處理，只看狀態變化。 |事件團隊：mod.Team |無 | `export function OngoingTeam(eventTeam): void { /* 処理 */ }` | `export function OngoingTeam(eventTeam): void { /* 処理 */ }` |
| `OngoingVehicle` | `OngoingVehicle` |持續評估車輛的事件。不要每次都做繁重的處理，只看狀態變化。 |事件車輛：mod.Vehicle |無 | `export function OngoingVehicle(eventVehicle): void { /* 処理 */ }` | `export function OngoingVehicle(eventVehicle): void { /* 処理 */ }` |
| `OngoingVehicleSpawner` | `OngoingVehicleSpawner` |持續評估 VehicleSpawner 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventVehicleSpawner：mod.VehicleSpawner |無 | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* 処理 */ }` | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* 処理 */ }` |
| `OngoingWaypointPath` | `OngoingWaypointPath` |持續評估 WaypointPath 的事件。不要每次都做繁重的處理，只看狀態變化。 | eventWaypointPath：mod.WaypointPath |無 | `export function OngoingWaypointPath(eventWaypointPath): void { /* 処理 */ }` | `export function OngoingWaypointPath(eventWaypointPath): void { /* 処理 */ }` |
| `OngoingWorldIcon` | `OngoingWorldIcon` |持續評估 WorldIcon 的活動。不要每次都做繁重的處理，只看狀態變化。 |事件世界圖示：mod.WorldIcon |無 | `export function OngoingWorldIcon(eventWorldIcon): void { /* 処理 */ }` | `export function OngoingWorldIcon(eventWorldIcon): void { /* 処理 */ }` |

## 人工智慧事件

|活動 |功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `OnAIMoveToFailed` | `OnAIMoveToFailed` |當AI士兵中斷或未能移動到目的地。 |事件播放器：mod.Player |無 | `export function OnAIMoveToFailed(eventPlayer): void { /* 処理 */ }` | `export function OnAIMoveToFailed(eventPlayer): void { /* 処理 */ }` |
| `OnAIMoveToRunning` | `OnAIMoveToRunning` |當AI士兵開始移動到目標位置。 |事件播放器：mod.Player |無 | `export function OnAIMoveToRunning(eventPlayer): void { /* 処理 */ }` | `export function OnAIMoveToRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIMoveToSucceeded` | `OnAIMoveToSucceeded` |當AI士兵到達目標點。 |事件播放器：mod.Player |無 | `export function OnAIMoveToSucceeded(eventPlayer): void { /* 処理 */ }` | `export function OnAIMoveToSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnAIParachuteRunning` | `OnAIParachuteRunning` |當AI士兵進行跳傘操作時。 |事件播放器：mod.Player |無 | `export function OnAIParachuteRunning(eventPlayer): void { /* 処理 */ }` | `export function OnAIParachuteRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIParachuteSucceeded` | `OnAIParachuteSucceeded` |當AI士兵的跳傘動作完成時。 |事件播放器：mod.Player |無 | `export function OnAIParachuteSucceeded(eventPlayer): void { /* 処理 */ }` | `export function OnAIParachuteSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleFailed` | `OnAIWaypointIdleFailed` |當AI士兵停止或未能巡邏航路點時。 |事件播放器：mod.Player |無 | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* 処理 */ }` | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleRunning` | `OnAIWaypointIdleRunning` |當人工智慧士兵開始巡邏航路點時。 |事件播放器：mod.Player |無 | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* 処理 */ }` | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleSucceeded` | `OnAIWaypointIdleSucceeded` |當人工智慧士兵完成航路點巡邏。 |事件播放器：mod.Player |無 | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* 処理 */ }` | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnSpawnerSpawned` | `OnSpawnerSpawned` |當AI士兵從AISpawner出現。 | eventPlayer: mod.Player, eventSpawner: mod.Spawner |無 | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* 処理 */ }` | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* 処理 */ }` |

## 遊戲進度/目標事件

|活動 |功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `OnCapturePointCaptured` | `OnCapturePointCaptured` |當團隊佔領佔領點。 | eventCapturePoint：mod.CapturePoint |無 | `export function OnCapturePointCaptured(eventCapturePoint): void { /* 処理 */ }` | `export function OnCapturePointCaptured(eventCapturePoint): void { /* 処理 */ }` |
| `OnCapturePointCapturing` | `OnCapturePointCapturing` |當團隊開始捕捉 CapturePoint 時。 | eventCapturePoint：mod.CapturePoint |無 | `export function OnCapturePointCapturing(eventCapturePoint): void { /* 処理 */ }` | `export function OnCapturePointCapturing(eventCapturePoint): void { /* 処理 */ }` |
| `OnCapturePointLost` | `OnCapturePointLost` |當團隊失去對 CapturePoint 的控制權。 | eventCapturePoint：mod.CapturePoint |無 | `export function OnCapturePointLost(eventCapturePoint): void { /* 処理 */ }` | `export function OnCapturePointLost(eventCapturePoint): void { /* 処理 */ }` |
| `OnGameModeEnding` | `OnGameModeEnding` |遊戲模式結束時。 |無 |無 | `export function OnGameModeEnding(): void { /* 処理 */ }` | `export function OnGameModeEnding(): void { /* 処理 */ }` |
| `OnGameModeStarted` | `OnGameModeStarted` |啟動遊戲模式時。用作初始化的基點。 |無 |無 | `export function OnGameModeStarted(): void { /* 処理 */ }` | `export function OnGameModeStarted(): void { /* 処理 */ }` |
| `OnMCOMArmed` | `OnMCOMArmed` |當 MCOM 布防時。 | eventMCOM：mod.MCOM |無 | `export function OnMCOMArmed(eventMCOM): void { /* 処理 */ }` | `export function OnMCOMArmed(eventMCOM): void { /* 処理 */ }` |
| `OnMCOMDefused` | `OnMCOMDefused` |MCOM發佈時。 | eventMCOM：mod.MCOM |無 | `export function OnMCOMDefused(eventMCOM): void { /* 処理 */ }` | `export function OnMCOMDefused(eventMCOM): void { /* 処理 */ }` |
| `OnMCOMDestroyed` | `OnMCOMDestroyed` |MCOM爆炸並被摧毀時。 | eventMCOM：mod.MCOM |無 | `export function OnMCOMDestroyed(eventMCOM): void { /* 処理 */ }` | `export function OnMCOMDestroyed(eventMCOM): void { /* 処理 */ }` |
| `OnRingOfFireZoneSizeChange` | `OnRingOfFireZoneSizeChange` |當 RingOfFire 的大小改變時。 | eventRingOfFire: mod.RingOfFire, eventNumber: 數字 |無 | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* 処理 */ }` | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* 処理 */ }` |
| `OnTimeLimitReached` | `OnTimeLimitReached` |當達到遊戲模式時間限制時。 |無 |無 | `export function OnTimeLimitReached(): void { /* 処理 */ }` | `export function OnTimeLimitReached(): void { /* 処理 */ }` |

## 玩家事件

|活動 |功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `OnMandown` | `OnMandown` |當玩家進入down狀態時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player |無 | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |
| `OnPlayerDamaged` | `OnPlayerDamaged` |當玩家受傷時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock |無 | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* 処理 */ }` | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerDeployed` | `OnPlayerDeployed` |玩家出現時。 |事件播放器：mod.Player |無 | `export function OnPlayerDeployed(eventPlayer): void { /* 処理 */ }` | `export function OnPlayerDeployed(eventPlayer): void { /* 処理 */ }` |
| `OnPlayerDied` | `OnPlayerDied` |當玩家死亡時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock |無 | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerEarnedKill` | `OnPlayerEarnedKill` |當玩家殺死對手時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock |無 | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerEarnedKillAssist` | `OnPlayerEarnedKillAssist` |當玩家收到擊殺助攻時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player |無 | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |
| `OnPlayerEnterAreaTrigger` | `OnPlayerEnterAreaTrigger` |當玩家進入AreaTrigger。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger |無 | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` |
| `OnPlayerEnterCapturePoint` | `OnPlayerEnterCapturePoint` |當玩家進入佔領點的佔領範圍。 | `OnPlayerEnterCapturePoint` | `OnPlayerEnterCapturePoint` | | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint |無 | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` |
| `OnPlayerEnterVehicle` | `OnPlayerEnterVehicle` |當玩家進入車輛或座位時。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle |無 | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` |
| `OnPlayerEnterVehicleSeat` | `OnPlayerEnterVehicleSeat` |當玩家進入車輛或座位時。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object |無 | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` |
| `OnPlayerEnterVL7Cloud` | `OnPlayerEnterVL7Cloud` |當玩家進入VL7Cloud的範圍時。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud |無 | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` |
| `OnPlayerExitAreaTrigger` | `OnPlayerExitAreaTrigger` |當玩家退出區域時觸發。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger |無 | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` |
| `OnPlayerExitCapturePoint` | `OnPlayerExitCapturePoint` |當玩家離開佔領點的佔領範圍。 | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint |無 | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` |
| `OnPlayerExitVehicle` | `OnPlayerExitVehicle` |當玩家離開車輛時。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle |無 | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` |
| `OnPlayerExitVehicleSeat` | `OnPlayerExitVehicleSeat` |當玩家離開車輛座椅時。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object |無 | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` |
| `OnPlayerExitVL7Cloud` | `OnPlayerExitVL7Cloud` |當玩家離開VL7Cloud的範圍時。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud |無 | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` |
| `OnPlayerInteract` | `OnPlayerInteract` |當玩家與 InteractPoint 互動時。 | eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint |無 | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* 処理 */ }` | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* 処理 */ }` |
| `OnPlayerJoinGame` | `OnPlayerJoinGame` |當玩家加入遊戲時。 |事件播放器：mod.Player |無 | `export function OnPlayerJoinGame(eventPlayer): void { /* 処理 */ }` | `export function OnPlayerJoinGame(eventPlayer): void { /* 処理 */ }` |
| `OnPlayerLeaveGame` | `OnPlayerLeaveGame` |當玩家離開遊戲時。參數是一個數字，而不是一個玩家。 |事件編號： 數量 |無 | `export function OnPlayerLeaveGame(eventNumber): void { /* 処理 */ }` | `export function OnPlayerLeaveGame(eventNumber): void { /* 処理 */ }` |
| `OnPlayerSwitchTeam` | `OnPlayerSwitchTeam` |當球員更換球隊。 | eventPlayer: mod.Player, eventTeam: mod.Team |無 | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* 処理 */ }` | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* 処理 */ }` |
| `OnPlayerUIButtonEvent` | `OnPlayerUIButtonEvent` |當玩家操作 UI 按鈕。 | eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent |無 | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* 処理 */ }` | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* 処理 */ }` |
| `OnPlayerUndeploy` | `OnPlayerUndeploy` |當玩家從戰場返回並返回部署畫面。 |事件播放器：mod.Player |無 | `export function OnPlayerUndeploy(eventPlayer): void { /* 処理 */ }` | `export function OnPlayerUndeploy(eventPlayer): void { /* 処理 */ }` |
| `OnRevived` | `OnRevived` |當一名玩家被另一名玩家復活時。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player |無 | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |

## Portal Gadget・RayCast 活動

|活動 |功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `OnPortalGadgetAimStart` | `OnPortalGadgetAimStart` |使用 Portal Gadget 時按下縮放按鈕。 |事件播放器：mod.Player |無 | `export function OnPortalGadgetAimStart(eventPlayer): void { /* 処理 */ }` | `export function OnPortalGadgetAimStart(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetAimStop` | `OnPortalGadgetAimStop` |當您在使用 Portal Gadget 時釋放縮放按鈕。 |事件播放器：mod.Player |無 | `export function OnPortalGadgetAimStop(eventPlayer): void { /* 処理 */ }` | `export function OnPortalGadgetAimStop(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetFireStart` | `OnPortalGadgetFireStart` |當您在使用 Portal Gadget 時按下啟動按鈕。 |事件播放器：mod.Player |無 | `export function OnPortalGadgetFireStart(eventPlayer): void { /* 処理 */ }` | `export function OnPortalGadgetFireStart(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetFireStop` | `OnPortalGadgetFireStop` |當您在使用 Portal Gadget 時釋放開火按鈕時。 |事件播放器：mod.Player |無 | `export function OnPortalGadgetFireStop(eventPlayer): void { /* 処理 */ }` | `export function OnPortalGadgetFireStop(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetLaserToggle` | `OnPortalGadgetLaserToggle` |使用 Portal Gadget 時切換戰術裝備輸入時。 | eventPlayer: mod.Player, eventBoolean: 布林 |無 | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* 処理 */ }` | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* 処理 */ }` |
| `OnRayCastHit` | `OnRayCastHit` |當 RayCast 擊中某物時。 | eventPlayer：mod.Player，eventPoint：mod.Vector，eventNormal：mod.Vector |無 | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* 処理 */ }` | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* 処理 */ }` |
| `OnRayCastMissed` | `OnRayCastMissed` |當 RayCast 沒有擊中任何東西時。 |事件播放器：mod.Player |無 | `export function OnRayCastMissed(eventPlayer): void { /* 処理 */ }` | `export function OnRayCastMissed(eventPlayer): void { /* 処理 */ }` |

## 車輛事件

|活動 |功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `OnVehicleDestroyed` | `OnVehicleDestroyed` |當車輛被破壞時。 |事件車輛：mod.Vehicle |無 | `export function OnVehicleDestroyed(eventVehicle): void { /* 処理 */ }` | `export function OnVehicleDestroyed(eventVehicle): void { /* 処理 */ }` |
| `OnVehicleSpawned` | `OnVehicleSpawned` |當車輛在地圖上產生時。 |事件車輛：mod.Vehicle |無 | `export function OnVehicleSpawned(eventVehicle): void { /* 処理 */ }` | `export function OnVehicleSpawned(eventVehicle): void { /* 処理 */ }` |

# 下一個要閱讀的附錄

動作和值取得的函數清單分為以下「附錄A-2：動作和值獲取清單（基本操作）」。
