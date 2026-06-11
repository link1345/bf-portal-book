---
title: "付録A-1： イベント一覧"
free: true
---

# この付録の読み方

この付録は、公式SDK `code/types/mod/index.d.ts` の `mod` namespaceをもとに、BF6 Portal TypeScriptで使えるイベントとアクションを一覧化したものです。基準SDKは `index.d.ts` に合わせて `1.3.2.0` です。SDK更新で増減する可能性があるので、実装前には必ず手元の `index.d.ts` を検索してください。

SDK 1.3.1.0では、文字列実体を参照する `mod.strings`、`MusicPackages.Radio` と `Radio_*` 系の音楽イベント・パラメータ、いくつかの武器・ガジェット定数が追加されています。特に `HybridExample` は `mod.strings[key]` を使って文字列JSONの値を直接読む例になっています。
SDK 1.3.2.0では、`MP_GolmudRailway` 向けに `OnGolmudTrainStopped`、`GolmudTrainSendMoveCommand`、`GetGolmudTrainLocation`、`GolmudTrainMoveCommands`、`GolmudTrainStopReason` が確認できます。具体例は付録Bの `GolmudTrainExample` を参照してください。

TypeScriptでは、イベントは `export function On...` または `export function Ongoing...` として書きます。アクションや値取得は `mod.Set...`、`mod.Get...`、`mod.Create...` のように `mod.` を付けて呼びます。

画面に出す文字は、先に `Strings.json` に登録します。

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

凡例は次のとおりです。

| 項目 | 意味 |
| --- | --- |
| 機能・目的 | 何を検知するか、または何を実行するか |
| 主な引数 | よく使う引数。オーバーロードがあるものは代表形を載せる |
| 戻り値 | `void` は「なし」と書く。値取得関数は型を書く |
| 使用例 | その関数を置く場所や呼び方の最小例 |

# イベント一覧

イベントはPortal側から呼ばれる入口です。自分で `mod.OnPlayerJoinGame()` のように呼ぶものではありません。関数名と引数の形がSDKと合っていれば、該当する出来事が起きたときに自動で実行されます。

`Ongoing...` 系は継続的に走るため、全プレイヤー走査、UI再生成、重い計算、ログ連打を入れるとすぐ重くなります。状態を変える必要があるときだけ実行する設計にしてください。

## 継続実行イベント

| イベント | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `OngoingGlobal` | Globalを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | なし | なし | `export function OngoingGlobal(): void { /* 処理 */ }` |
| `OngoingAreaTrigger` | AreaTriggerを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventAreaTrigger: mod.AreaTrigger | なし | `export function OngoingAreaTrigger(eventAreaTrigger): void { /* 処理 */ }` |
| `OngoingCapturePoint` | CapturePointを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventCapturePoint: mod.CapturePoint | なし | `export function OngoingCapturePoint(eventCapturePoint): void { /* 処理 */ }` |
| `OngoingEmplacementSpawner` | EmplacementSpawnerを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventEmplacementSpawner: mod.EmplacementSpawner | なし | `export function OngoingEmplacementSpawner(eventEmplacementSpawner): void { /* 処理 */ }` |
| `OngoingHQ` | HQを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventHQ: mod.HQ | なし | `export function OngoingHQ(eventHQ): void { /* 処理 */ }` |
| `OngoingInteractPoint` | InteractPointを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventInteractPoint: mod.InteractPoint | なし | `export function OngoingInteractPoint(eventInteractPoint): void { /* 処理 */ }` |
| `OngoingLootSpawner` | LootSpawnerを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventLootSpawner: mod.LootSpawner | なし | `export function OngoingLootSpawner(eventLootSpawner): void { /* 処理 */ }` |
| `OngoingMCOM` | MCOMを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventMCOM: mod.MCOM | なし | `export function OngoingMCOM(eventMCOM): void { /* 処理 */ }` |
| `OngoingPlayer` | Playerを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventPlayer: mod.Player | なし | `export function OngoingPlayer(eventPlayer): void { /* 処理 */ }` |
| `OngoingRingOfFire` | RingOfFireを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventRingOfFire: mod.RingOfFire | なし | `export function OngoingRingOfFire(eventRingOfFire): void { /* 処理 */ }` |
| `OngoingSector` | Sectorを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventSector: mod.Sector | なし | `export function OngoingSector(eventSector): void { /* 処理 */ }` |
| `OngoingSpawner` | Spawnerを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventSpawner: mod.Spawner | なし | `export function OngoingSpawner(eventSpawner): void { /* 処理 */ }` |
| `OngoingSpawnPoint` | SpawnPointを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventSpawnPoint: mod.SpawnPoint | なし | `export function OngoingSpawnPoint(eventSpawnPoint): void { /* 処理 */ }` |
| `OngoingTeam` | Teamを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventTeam: mod.Team | なし | `export function OngoingTeam(eventTeam): void { /* 処理 */ }` |
| `OngoingVehicle` | Vehicleを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventVehicle: mod.Vehicle | なし | `export function OngoingVehicle(eventVehicle): void { /* 処理 */ }` |
| `OngoingVehicleSpawner` | VehicleSpawnerを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventVehicleSpawner: mod.VehicleSpawner | なし | `export function OngoingVehicleSpawner(eventVehicleSpawner): void { /* 処理 */ }` |
| `OngoingWaypointPath` | WaypointPathを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventWaypointPath: mod.WaypointPath | なし | `export function OngoingWaypointPath(eventWaypointPath): void { /* 処理 */ }` |
| `OngoingWorldIcon` | WorldIconを対象に継続評価するイベント。毎回重い処理を入れず、状態変化だけを見る。 | eventWorldIcon: mod.WorldIcon | なし | `export function OngoingWorldIcon(eventWorldIcon): void { /* 処理 */ }` |

## AIイベント

| イベント | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `OnAIMoveToFailed` | AI兵士が目的地への移動を中断・失敗したとき。 | eventPlayer: mod.Player | なし | `export function OnAIMoveToFailed(eventPlayer): void { /* 処理 */ }` |
| `OnAIMoveToRunning` | AI兵士が目標地点へ移動を始めたとき。 | eventPlayer: mod.Player | なし | `export function OnAIMoveToRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIMoveToSucceeded` | AI兵士が目標地点へ到達したとき。 | eventPlayer: mod.Player | なし | `export function OnAIMoveToSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnAIParachuteRunning` | AI兵士のパラシュート動作が進行中のとき。 | eventPlayer: mod.Player | なし | `export function OnAIParachuteRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIParachuteSucceeded` | AI兵士のパラシュート動作が完了したとき。 | eventPlayer: mod.Player | なし | `export function OnAIParachuteSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleFailed` | AI兵士がウェイポイント巡回を停止・失敗したとき。 | eventPlayer: mod.Player | なし | `export function OnAIWaypointIdleFailed(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleRunning` | AI兵士がウェイポイント巡回を開始したとき。 | eventPlayer: mod.Player | なし | `export function OnAIWaypointIdleRunning(eventPlayer): void { /* 処理 */ }` |
| `OnAIWaypointIdleSucceeded` | AI兵士がウェイポイント巡回を完了したとき。 | eventPlayer: mod.Player | なし | `export function OnAIWaypointIdleSucceeded(eventPlayer): void { /* 処理 */ }` |
| `OnSpawnerSpawned` | AISpawnerからAI兵士が出現したとき。 | eventPlayer: mod.Player, eventSpawner: mod.Spawner | なし | `export function OnSpawnerSpawned(eventPlayer, eventSpawner): void { /* 処理 */ }` |

## ゲーム進行・目標イベント

| イベント | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `OnCapturePointCaptured` | チームがCapturePointを占領したとき。 | eventCapturePoint: mod.CapturePoint | なし | `export function OnCapturePointCaptured(eventCapturePoint): void { /* 処理 */ }` |
| `OnCapturePointCapturing` | チームがCapturePointの占領を開始したとき。 | eventCapturePoint: mod.CapturePoint | なし | `export function OnCapturePointCapturing(eventCapturePoint): void { /* 処理 */ }` |
| `OnCapturePointLost` | チームがCapturePointの支配を失ったとき。 | eventCapturePoint: mod.CapturePoint | なし | `export function OnCapturePointLost(eventCapturePoint): void { /* 処理 */ }` |
| `OnGameModeEnding` | ゲームモードが終了するとき。 | なし | なし | `export function OnGameModeEnding(): void { /* 処理 */ }` |
| `OnGameModeStarted` | ゲームモード開始時。初期化の基点にする。 | なし | なし | `export function OnGameModeStarted(): void { /* 処理 */ }` |
| `OnMCOMArmed` | MCOMがアームされたとき。 | eventMCOM: mod.MCOM | なし | `export function OnMCOMArmed(eventMCOM): void { /* 処理 */ }` |
| `OnMCOMDefused` | MCOMが解除されたとき。 | eventMCOM: mod.MCOM | なし | `export function OnMCOMDefused(eventMCOM): void { /* 処理 */ }` |
| `OnMCOMDestroyed` | MCOMが爆発・破壊されたとき。 | eventMCOM: mod.MCOM | なし | `export function OnMCOMDestroyed(eventMCOM): void { /* 処理 */ }` |
| `OnRingOfFireZoneSizeChange` | RingOfFireのサイズが変化したとき。 | eventRingOfFire: mod.RingOfFire, eventNumber: number | なし | `export function OnRingOfFireZoneSizeChange(eventRingOfFire, eventNumber): void { /* 処理 */ }` |
| `OnTimeLimitReached` | ゲームモードの制限時間に到達したとき。 | なし | なし | `export function OnTimeLimitReached(): void { /* 処理 */ }` |

## プレイヤーイベント

| イベント | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `OnMandown` | プレイヤーがダウン状態に入ったとき。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | なし | `export function OnMandown(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |
| `OnPlayerDamaged` | プレイヤーがダメージを受けたとき。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock | なし | `export function OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerDeployed` | プレイヤーが出撃したとき。 | eventPlayer: mod.Player | なし | `export function OnPlayerDeployed(eventPlayer): void { /* 処理 */ }` |
| `OnPlayerDied` | プレイヤーが死亡したとき。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | なし | `export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerEarnedKill` | プレイヤーがキルを獲得したとき。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock | なし | `export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock): void { /* 処理 */ }` |
| `OnPlayerEarnedKillAssist` | プレイヤーがキルアシストを獲得したとき。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | なし | `export function OnPlayerEarnedKillAssist(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |
| `OnPlayerEnterAreaTrigger` | プレイヤーがAreaTriggerへ入ったとき。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | なし | `export function OnPlayerEnterAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` |
| `OnPlayerEnterCapturePoint` | プレイヤーがCapturePointの占領範囲へ入ったとき。 | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | なし | `export function OnPlayerEnterCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` |
| `OnPlayerEnterVehicle` | プレイヤーが車両または座席へ乗ったとき。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | なし | `export function OnPlayerEnterVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` |
| `OnPlayerEnterVehicleSeat` | プレイヤーが車両または座席へ乗ったとき。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | なし | `export function OnPlayerEnterVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` |
| `OnPlayerEnterVL7Cloud` | プレイヤーがVL7Cloudの範囲へ入ったとき。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | なし | `export function OnPlayerEnterVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` |
| `OnPlayerExitAreaTrigger` | プレイヤーがAreaTriggerから出たとき。 | eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger | なし | `export function OnPlayerExitAreaTrigger(eventPlayer, eventAreaTrigger): void { /* 処理 */ }` |
| `OnPlayerExitCapturePoint` | プレイヤーがCapturePointの占領範囲から出たとき。 | eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint | なし | `export function OnPlayerExitCapturePoint(eventPlayer, eventCapturePoint): void { /* 処理 */ }` |
| `OnPlayerExitVehicle` | プレイヤーが車両から降りたとき。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle | なし | `export function OnPlayerExitVehicle(eventPlayer, eventVehicle): void { /* 処理 */ }` |
| `OnPlayerExitVehicleSeat` | プレイヤーが車両座席から降りたとき。 | eventPlayer: mod.Player, eventVehicle: mod.Vehicle, eventSeat: mod.Object | なし | `export function OnPlayerExitVehicleSeat(eventPlayer, eventVehicle, eventSeat): void { /* 処理 */ }` |
| `OnPlayerExitVL7Cloud` | プレイヤーがVL7Cloudの範囲から出たとき。 | eventPlayer: mod.Player, eventVL7Cloud: mod.VL7Cloud | なし | `export function OnPlayerExitVL7Cloud(eventPlayer, eventVL7Cloud): void { /* 処理 */ }` |
| `OnPlayerInteract` | プレイヤーがInteractPointを操作したとき。 | eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint | なし | `export function OnPlayerInteract(eventPlayer, eventInteractPoint): void { /* 処理 */ }` |
| `OnPlayerJoinGame` | プレイヤーがゲームへ参加したとき。 | eventPlayer: mod.Player | なし | `export function OnPlayerJoinGame(eventPlayer): void { /* 処理 */ }` |
| `OnPlayerLeaveGame` | プレイヤーがゲームから離脱したとき。引数はPlayerではなく番号。 | eventNumber: number | なし | `export function OnPlayerLeaveGame(eventNumber): void { /* 処理 */ }` |
| `OnPlayerSwitchTeam` | プレイヤーがチームを変更したとき。 | eventPlayer: mod.Player, eventTeam: mod.Team | なし | `export function OnPlayerSwitchTeam(eventPlayer, eventTeam): void { /* 処理 */ }` |
| `OnPlayerUIButtonEvent` | プレイヤーがUIボタンを操作したとき。 | eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent | なし | `export function OnPlayerUIButtonEvent(eventPlayer, eventUIWidget, eventUIButtonEvent): void { /* 処理 */ }` |
| `OnPlayerUndeploy` | プレイヤーが戦場から戻りデプロイ画面へ戻ったとき。 | eventPlayer: mod.Player | なし | `export function OnPlayerUndeploy(eventPlayer): void { /* 処理 */ }` |
| `OnRevived` | プレイヤーが他プレイヤーに蘇生されたとき。 | eventPlayer: mod.Player, eventOtherPlayer: mod.Player | なし | `export function OnRevived(eventPlayer, eventOtherPlayer): void { /* 処理 */ }` |

## Portal Gadget・RayCastイベント

| イベント | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `OnPortalGadgetAimStart` | Portal Gadget使用中にズームボタンを押したとき。 | eventPlayer: mod.Player | なし | `export function OnPortalGadgetAimStart(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetAimStop` | Portal Gadget使用中にズームボタンを離したとき。 | eventPlayer: mod.Player | なし | `export function OnPortalGadgetAimStop(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetFireStart` | Portal Gadget使用中に射撃ボタンを押したとき。 | eventPlayer: mod.Player | なし | `export function OnPortalGadgetFireStart(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetFireStop` | Portal Gadget使用中に射撃ボタンを離したとき。 | eventPlayer: mod.Player | なし | `export function OnPortalGadgetFireStop(eventPlayer): void { /* 処理 */ }` |
| `OnPortalGadgetLaserToggle` | Portal Gadget使用中にタクティカルデバイス入力を切り替えたとき。 | eventPlayer: mod.Player, eventBoolean: boolean | なし | `export function OnPortalGadgetLaserToggle(eventPlayer, eventBoolean): void { /* 処理 */ }` |
| `OnRayCastHit` | RayCastが何かに命中したとき。 | eventPlayer: mod.Player, eventPoint: mod.Vector, eventNormal: mod.Vector | なし | `export function OnRayCastHit(eventPlayer, eventPoint, eventNormal): void { /* 処理 */ }` |
| `OnRayCastMissed` | RayCastが何にも命中しなかったとき。 | eventPlayer: mod.Player | なし | `export function OnRayCastMissed(eventPlayer): void { /* 処理 */ }` |

## 車両イベント

| イベント | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `OnVehicleDestroyed` | 車両が破壊されたとき。 | eventVehicle: mod.Vehicle | なし | `export function OnVehicleDestroyed(eventVehicle): void { /* 処理 */ }` |
| `OnVehicleSpawned` | 車両がマップへスポーンしたとき。 | eventVehicle: mod.Vehicle | なし | `export function OnVehicleSpawned(eventVehicle): void { /* 処理 */ }` |

## Golmud列車イベント

| イベント | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `OnGolmudTrainStopped` | Railway to Golmudの列車が東端・西端・途中停止のいずれかで停止したとき。 | eventGolmudTrainStopReason: mod.GolmudTrainStopReason | なし | `export function OnGolmudTrainStopped(reason): void { /* 処理 */ }` |

列車を動かす側は `mod.GolmudTrainSendMoveCommand(mod.GolmudTrainMoveCommands.MoveWest)`、`Stop`、`MoveEast` を使います。
現在位置は `mod.GetGolmudTrainLocation()` で取得できます。

# 次に読む付録

アクションや値取得の関数一覧は、次の「付録A-2：アクション・値取得一覧（基本操作）」へ分けています。
