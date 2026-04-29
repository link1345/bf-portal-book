---
title: "付録A-2： アクション・値取得一覧（基本操作）"
free: true
---

# アクション・値取得一覧

ここでは `mod.` から呼び出す関数を、用途別に並べます。Portalのブロック名に近いものもありますが、TypeScriptでは型が厳しいため、`Player`、`Team`、`Vector`、`Message`、`UIWidget` などの型を合わせて渡す必要があります。

同じ名前で複数の引数パターンを持つ関数は1行にまとめ、機能・目的欄にオーバーロード数を書いています。詳しい全シグネチャは `index.d.ts` で関数名検索してください。

## 変数・待機・サブルーチン

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `Wait` | 指定秒数だけ待機する。非同期処理なので `await` と組み合わせる。 | n: number | `Promise<void>` | `await mod.Wait(1);` |
| `SetVariable` | 指定したVariableへ値を保存する。フェーズ、スコア、フラグ管理の基本。 | variable: Variable, value: Any | なし | `mod.SetVariable(mod.GlobalVariable(0), 1);` |
| `SetVariableAtIndex` | Variable内の配列を初期化または取得し、指定インデックスへ値を保存する。 | arrayVariable: Variable, arrayIndex: number, value: Any | なし | `mod.SetVariableAtIndex(mod.GlobalVariable(1), 0, eventPlayer);` |
| `ChaseVariableAtRate` | Variableの値を毎秒指定量ずつ限界値へ近づける。 | variable: Variable, limit: number, deltaPerSecond: number | なし | `mod.ChaseVariableAtRate(...);` |
| `ChaseVariableOverTime` | Variableの値を指定秒数で限界値へ近づける。 | variable: Variable, limit: number, durationSeconds: number | なし | `mod.ChaseVariableOverTime(...);` |
| `StopChasingVariable` | 進行中のVariable追従を止め、現在値で止める。 | variable: Variable | なし | `mod.StopChasingVariable(...);` |
| `GetArgument` | サブルーチン引数を番号で取得する。 | subroutineArgIndex: number | `Any` | `const value = mod.GetArgument(...);` |
| `GetVariable` | Variableに保存されている現在値を取得する。 | variable: Variable | `Any` | `const phase = mod.GetVariable(mod.GlobalVariable(0));` |
| `GlobalVariable` | 指定番号のグローバルVariableを取得する。 | variableIndex: number | `Variable` | `const phase = mod.GlobalVariable(0);` |
| `ObjectVariable` | 指定オブジェクトに紐づくVariableを取得する。 | ownerObject: mod.Object, variableIndex: number | `Variable` | `const flag = mod.ObjectVariable(eventPlayer, 0);` |

## AI制御

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `AIBattlefieldBehavior` | AI兵士を自律行動にし、目標達成や敵への射撃を任せる。AIプレイヤー専用。 | player: Player | なし | `mod.AIBattlefieldBehavior(...);` |
| `AIDefendPositionBehavior` | AI兵士に指定位置周辺を防衛させる。AIプレイヤー専用。 | player: Player, defendPosition: Vector, minDistance: number, maxDistance: number | なし | `mod.AIDefendPositionBehavior(...);` |
| `AIIdleBehavior` | AI兵士の現在位置を待機地点として設定する。AIプレイヤー専用。 | player: Player | なし | `mod.AIIdleBehavior(...);` |
| `AILOSMoveToBehavior` | AI兵士を、指定位置へ見通しを取りながら移動させる。AIプレイヤー専用。 | player: Player, position: Vector | なし | `mod.AILOSMoveToBehavior(...);` |
| `AIMoveToBehavior` | AI兵士に指定座標へ移動する目的地を与える。AIプレイヤー専用。 | player: Player, position: Vector | なし | `mod.AIMoveToBehavior(...);` |
| `AIParachuteBehavior` | AI兵士にパラシュート行動をさせる。AIプレイヤー専用。 | player: Player | なし | `mod.AIParachuteBehavior(...);` |
| `AIValidatedMoveToBehavior` | AI兵士をナビメッシュ上の有効な近接位置へ移動させる。AIプレイヤー専用。 | player: Player, position: Vector | なし | `mod.AIValidatedMoveToBehavior(...);` |
| `AIWaypointIdleBehavior` | AI兵士にWaypointPathを巡回させる。AIプレイヤー専用。 | player: Player, waypointPath: WaypointPath | なし | `mod.AIWaypointIdleBehavior(...);` |
| `SetAiInput` | AI兵士へ指定入力を一定時間だけ送る。最大3入力まで同時指定できる。 | player: Player, input: AiInput, duration: number | なし | `mod.SetAiInput(...);` |
| `AISetUnspawnOnDead` | Spawnerから出したAI兵士を死亡後に退場させるか設定する。 | spawner: Spawner, enableUnspawnOnDead: boolean | なし | `mod.AISetUnspawnOnDead(...);` |
| `SetUnspawnDelayInSeconds` | Spawnerから出したAI兵士が死亡後に退場するまでの秒数を設定する。 | spawner: Spawner, delay: number | なし | `mod.SetUnspawnDelayInSeconds(...);` |
| `SpawnAIFromAISpawner` | 指定したAI SpawnerからAI兵士を1体スポーンする。 オーバーロード8種。 | spawner: Spawner | なし | `mod.SpawnAIFromAISpawner(mod.GetSpawner(0));` |
| `UnspawnAllAIsFromAISpawner` | 指定AI Spawnerから出したAI兵士をすべて退場させる。 | spawner: Spawner | なし | `mod.UnspawnAllAIsFromAISpawner(...);` |
| `AIEnableShooting` | AI兵士の射撃可否を切り替える。AIプレイヤー専用。 オーバーロード2種。 | player: Player | なし | `mod.AIEnableShooting(...);` |
| `AIEnableTargeting` | AI兵士の索敵・ターゲット認識を切り替える。無効化すると射撃もしなくなる。 オーバーロード2種。 | player: Player | なし | `mod.AIEnableTargeting(...);` |
| `AIForceFire` | AI兵士に、手持ち武器やガジェットを指定時間だけ強制使用させる。 | player: Player, fireDuration: number | なし | `mod.AIForceFire(...);` |
| `AIGadgetSettings` | AI兵士のガジェット使用条件、クールダウン、精度補正を調整する。 | player: Player, applyUsageCriteria: boolean, applyCoolDownAfterUse: boolean, applyInaccuracy: boolean | なし | `mod.AIGadgetSettings(...);` |
| `AISetFocusPoint` | AI兵士の注視点を設定し、必要に応じてそこへ攻撃させる。 | player: Player, point: Vector, isTarget: boolean | なし | `mod.AISetFocusPoint(...);` |
| `AISetMoveSpeed` | AI兵士の移動行動で使う速度を設定する。 | player: Player, moveSpeed: MoveSpeed | なし | `mod.AISetMoveSpeed(...);` |
| `AISetStance` | AI兵士の姿勢を設定する。 | player: Player, stance: Stance | なし | `mod.AISetStance(...);` |
| `AISetTarget` | AI兵士の現在ターゲットを設定または解除する。 オーバーロード2種。 | aiPlayer: Player, targetPlayer: Player | なし | `mod.AISetTarget(...);` |
| `AIStartUsingGadget` | AI兵士に特定ガジェットを指定地点または指定プレイヤーへ使わせる。 オーバーロード2種。 | player: Player, gadget: Gadgets, targetPos: Vector | なし | `mod.AIStartUsingGadget(...);` |
| `AIStopUsingGadget` | AI兵士へ出しているガジェット使用指示を解除する。 | player: Player | なし | `mod.AIStopUsingGadget(...);` |
| `SetAIToHumanDamageModifier` | AIから人間プレイヤーへ与えるダメージ倍率を設定する。 | damageMultiplier: number | なし | `mod.SetAIToHumanDamageModifier(...);` |

## 音・音楽・VO

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `LoadMusic` | 音楽パッケージを読み込み、`PlayMusic` で再生できるようにする。 | musicPackage: MusicPackages | なし | `mod.LoadMusic(...);` |
| `PlayMusic` | 音楽イベントを再生する。対象を全体、チーム、分隊、プレイヤーに絞れる。 オーバーロード4種。 | musicEvent: MusicEvents | なし | `mod.PlayMusic(...);` |
| `PlaySound` | SFXを再生する。対象や発生位置、減衰範囲を指定できる。 オーバーロード8種。 | sound: SFX, amplitude: number, team: Team | なし | `mod.PlaySound(mod.GetSFX(0), 1);` |
| `PlayVO` | VO音声イベントを再生する。対象を全体、チーム、分隊、プレイヤーに絞れる。 オーバーロード4種。 | voiceOver: VO, event: VoiceOverEvents2D, flag: VoiceOverFlags | なし | `mod.PlayVO(...);` |
| `SetMusicParam` | 読み込んだ音楽パッケージのパラメータ値を更新する。 オーバーロード4種。 | musicParam: MusicParams, paramValue: number | なし | `mod.SetMusicParam(...);` |
| `SetSoundAmplitude` | 指定したSFXの音量を変更する。対象を全体、チーム、分隊、プレイヤーに絞れる。 オーバーロード4種。 | sound: SFX, amplitude: number, team: Team | なし | `mod.SetSoundAmplitude(...);` |
| `StopSound` | 指定したSFXを停止する。対象を全体、チーム、分隊、プレイヤーに絞れる。 オーバーロード4種。 | sound: SFX, team: Team | なし | `mod.StopSound(...);` |
| `UnloadMusic` | 読み込み済みの音楽パッケージを解放する。 | musicPackage: MusicPackages | なし | `mod.UnloadMusic(...);` |

## カメラ・演出

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `SetCameraTypeForAll` | 全プレイヤーのカメラ種別を設定する。必要ならカメラインデックスも指定する。 オーバーロード2種。 | cameraType: Cameras | なし | `mod.SetCameraTypeForAll(...);` |
| `SetCameraTypeForPlayer` | 指定プレイヤーのカメラ種別を設定する。必要ならカメラインデックスも指定する。 オーバーロード2種。 | player: Player, cameraType: Cameras | なし | `mod.SetCameraTypeForPlayer(...);` |
| `SetSpectatingFiltersForAll` | 全プレイヤーの観戦対象フィルタを設定する。分隊内・チーム内だけに制限できる。 | group: SpectatingGroup, ownSquadOnly: boolean, ownTeamOnly: boolean | なし | `mod.SetSpectatingFiltersForAll(...);` |
| `SetSpectatingFiltersForPlayer` | 指定プレイヤーの観戦対象フィルタを設定する。分隊内・チーム内だけに制限できる。 | player: Player, group: SpectatingGroup, ownSquadOnly: boolean, ownTeamOnly: boolean | なし | `mod.SetSpectatingFiltersForPlayer(...);` |
| `EnableScreenEffect` | 指定プレイヤーの画面効果を有効または無効にする。 | player: Player, screenEffect: ScreenEffects, enable: boolean | なし | `mod.EnableScreenEffect(...);` |
| `EnableVFX` | 指定VFXの表示や動作を有効または無効にする。 | vfx: VFX, enable: boolean | なし | `mod.EnableVFX(...);` |
| `MoveVFX` | VFXを指定座標と回転へ移動する。通常は汎用の移動系関数も検討する。 | vfxID: VFX, position: Vector, rotation: Vector | なし | `mod.MoveVFX(...);` |
| `SetVFXColor` | VFXの色を変更する。 | vfxID: VFX, color: Vector | なし | `mod.SetVFXColor(...);` |
| `SetVFXScale` | VFXのスケールを変更する。 | vfxID: VFX, scale: number | なし | `mod.SetVFXScale(...);` |
| `SetVFXSpeed` | VFXの再生速度を変更する。 | vfxID: VFX, speed: number | なし | `mod.SetVFXSpeed(...);` |
| `GetFixedCamera` | FixedCameraを番号または対象から取得する。 | number: number | `FixedCamera` | `const value = mod.GetFixedCamera(...);` |

## 固定兵器スポーナー

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `ForceEmplacementSpawnerSpawn` | 固定兵器スポーナーから現在設定されている固定兵器を強制スポーンする。 | emplacementSpawner: EmplacementSpawner | なし | `mod.ForceEmplacementSpawnerSpawn(...);` |
| `SetEmplacementSpawnerAbandonVehicleOutOfCombatArea` | 戦闘区域外に放置された固定兵器を破壊するか設定する。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | なし | `mod.SetEmplacementSpawnerAbandonVehicleOutOfCombatArea(...);` |
| `SetEmplacementSpawnerApplyDamageToAbandonVehicle` | 放置された固定兵器へダメージを適用するか設定する。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | なし | `mod.SetEmplacementSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetEmplacementSpawnerAutoSpawn` | 固定兵器スポーナーの自動リスポーンを有効または無効にする。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | なし | `mod.SetEmplacementSpawnerAutoSpawn(...);` |
| `SetEmplacementSpawnerKeepAliveAbandonRadius` | 固定兵器が放置扱いになる、最寄りプレイヤーからの距離を設定する。 | emplacementSpawner: EmplacementSpawner, keepAliveAbandonedRadius: number | なし | `mod.SetEmplacementSpawnerKeepAliveAbandonRadius(...);` |
| `SetEmplacementSpawnerRespawnTime` | 固定兵器が破壊されてから自動リスポーンするまでの秒数を設定する。 | emplacementSpawner: EmplacementSpawner, respawnTime: number | なし | `mod.SetEmplacementSpawnerRespawnTime(...);` |
| `SetEmplacementSpawnerSpawnerRadius` | 固定兵器がスポーナーから離れたと判定される距離を設定する。 | emplacementSpawner: EmplacementSpawner, keepAliveSpawnerRadius: number | なし | `mod.SetEmplacementSpawnerSpawnerRadius(...);` |
| `SetEmplacementSpawnerTimeUntilAbandon` | 固定兵器が未使用で放置扱いになるまでの時間を設定する。 | emplacementSpawner: EmplacementSpawner, timeUntilAbandon: number | なし | `mod.SetEmplacementSpawnerTimeUntilAbandon(...);` |
| `SetEmplacementSpawnerType` | 固定兵器スポーナーから出す固定兵器の種類を設定する。 | emplacementSpawner: EmplacementSpawner, emplacementType: StationaryEmplacements | なし | `mod.SetEmplacementSpawnerType(...);` |
| `GetEmplacementSpawner` | EmplacementSpawnerを番号または対象から取得する。 | number: number | `EmplacementSpawner` | `const value = mod.GetEmplacementSpawner(...);` |

## 出撃・リスポーン

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `DeployAllPlayers` | デプロイ画面にいる全プレイヤーを強制出撃させる。 | なし | なし | `mod.DeployAllPlayers(...);` |
| `EnableAllPlayerDeploy` | 全プレイヤーのデプロイ画面からの出撃可否を切り替える。 | enablePlayerDeploy: boolean | なし | `mod.EnableAllPlayerDeploy(...);` |
| `EnablePlayerDeploy` | 指定プレイヤーのデプロイ可否を切り替える。 | player: Player, deployAllowed: boolean | なし | `mod.EnablePlayerDeploy(...);` |
| `SetRedeployTime` | 指定プレイヤーの再出撃時間を0から60秒の範囲で上書きする。 | player: Player, redeployTime: number | なし | `mod.SetRedeployTime(...);` |
| `UndeployAllPlayers` | 戦場にいる全プレイヤーをデプロイ画面へ戻す。 | なし | なし | `mod.UndeployAllPlayers(...);` |
| `UndeployPlayer` | 指定プレイヤーをデプロイ画面へ戻す。 | player: Player | なし | `mod.UndeployPlayer(...);` |
| `DeployPlayer` | 指定プレイヤーを強制出撃させる。 | player: Player | なし | `mod.DeployPlayer(...);` |
| `SetSpawnMode` | プレイヤーを自動スポーンさせるかどうかのスポーンモードを設定する。 | spawnModes: SpawnModes | なし | `mod.SetSpawnMode(...);` |
| `SpawnPlayerFromSpawnPoint` | 指定プレイヤーを指定SpawnPointから出撃させる。 オーバーロード2種。 | player: Player, spawnPointId: number | なし | `mod.SpawnPlayerFromSpawnPoint(eventPlayer, mod.GetSpawnPoint(0));` |

## ゲーム進行・チーム

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `EndGameMode` | ゲームモードを終了し、指定したプレイヤーまたはチームを勝者にする。Team 0は引き分け。 オーバーロード2種。 | player: Player | なし | `mod.EndGameMode(mod.GetTeam(1));` |
| `PauseGameModeTime` | ゲームモードタイマーを一時停止または再開する。 | pauseTimer: boolean | なし | `mod.PauseGameModeTime(...);` |
| `ResetGameModeTime` | ゲームモード時間を開始時の値へ戻す。 | なし | なし | `mod.ResetGameModeTime(...);` |
| `SetFriendlyFire` | フレンドリーファイアを有効または無効にする。 | enableFriendlyFire: boolean | なし | `mod.SetFriendlyFire(...);` |
| `SetGameModeScore` | 指定プレイヤーまたはチームのゲームモードスコアを設定する。 オーバーロード2種。 | team: Team, newScore: number | なし | `mod.SetGameModeScore(mod.GetTeam(1), 10);` |
| `SetGameModeTargetScore` | 勝利判定に使う目標スコアを設定する。 | newScore: number | なし | `mod.SetGameModeTargetScore(...);` |
| `SetGameModeTimeLimit` | ゲームモードの制限時間を秒数で設定する。 | newTimeLimit: number | なし | `mod.SetGameModeTimeLimit(...);` |
| `AutoBalanceTeams` | チーム人数を自動調整する。チーム・分隊容量が合っている必要がある。 | なし | なし | `mod.AutoBalanceTeams(...);` |
| `DisablePlayerJoin` | サーバーへの新規参加を止める。SDKコメント上、戻す方法がないため運用注意。 | なし | なし | `mod.DisablePlayerJoin(...);` |
| `SwitchTeams` | TeamAとTeamBのプレイヤーを入れ替える。人間とBotの数が両チームで一致している必要がある。 | teamA: Team, teamB: Team | なし | `mod.SwitchTeams(...);` |
| `GetGameModeScore` | 指定プレイヤーまたはチームのゲームモードスコアを取得する。 オーバーロード2種。 | player: Player | `number` | `const value = mod.GetGameModeScore(...);` |
| `GetMatchTimeElapsed` | 現在のゲームモードで経過した秒数を取得する。 | なし | `number` | `const value = mod.GetMatchTimeElapsed(...);` |
| `GetMatchTimeRemaining` | 現在のゲームモードの残り秒数を取得する。 | なし | `number` | `const value = mod.GetMatchTimeRemaining(...);` |
| `GetRoundTime` | ゲームモードに設定されている制限時間を秒数で取得する。 | なし | `number` | `const value = mod.GetRoundTime(...);` |
| `GetTargetScore` | 勝利に必要な目標スコアを取得する。 | なし | `number` | `const value = mod.GetTargetScore(...);` |

## 目標・ゲームモードオブジェクト

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `RingOfFireStart` | RingOfFireに縮小開始を通知する。 | ringOfFire: RingOfFire | なし | `mod.RingOfFireStart(...);` |
| `SetHQTeam` | HQの所属チームを設定する。 | hq: HQ, teamID: Team | なし | `mod.SetHQTeam(...);` |
| `SetRingOfFireDamageAmount` | RingOfFire内に捕まったプレイヤーへ与えるダメージ量を設定する。 | ringOfFireId: RingOfFire, ringOfFireDamageAmount: number | なし | `mod.SetRingOfFireDamageAmount(...);` |
| `SetRingOfFireStableTime` | RingOfFireが次に縮小するまで安定している時間を設定する。 | ringOfFireId: RingOfFire, ringOfFireStableTime: number | なし | `mod.SetRingOfFireStableTime(...);` |
| `EnableCapturePointDeploying` | CapturePoint所有チームがそこからデプロイできるか切り替える。 | capturePoint: CapturePoint, enableDeploying: boolean | なし | `mod.EnableCapturePointDeploying(...);` |
| `SetCapturePointCapturingTime` | CapturePointの占領に必要な時間を設定する。 | capturePoint: CapturePoint, capturingTime: number | なし | `mod.SetCapturePointCapturingTime(...);` |
| `SetCapturePointNeutralizationTime` | CapturePointの中立化に必要な時間を設定する。 | capturePoint: CapturePoint, neutralizationTime: number | なし | `mod.SetCapturePointNeutralizationTime(...);` |
| `SetCapturePointOwner` | CapturePointを支配しているチームを変更する。 | capturePoint: CapturePoint, team: Team | なし | `mod.SetCapturePointOwner(...);` |
| `SetMaxCaptureMultiplier` | CapturePointの占領速度倍率の上限を設定する。 | capturePoint: CapturePoint, multiplier: number | なし | `mod.SetMaxCaptureMultiplier(...);` |
| `EnableHQ` | HQを有効または無効にする。 | hq: HQ, enable: boolean | なし | `mod.EnableHQ(...);` |
| `EnableGameModeObjective` | CapturePoint、HQ、Sector、MCOMなどの目標を有効または無効にする。 | objective: CapturePoint \| HQ \| Sector \| MCOM, enable: boolean | なし | `mod.EnableGameModeObjective(...);` |
| `SetMCOMFuseTime` | MCOMが爆発するまでの導火時間を設定する。 | mCOM: MCOM, fuseTime: number | なし | `mod.SetMCOMFuseTime(...);` |
| `SetMCOMOwner` | MCOMの所有チームを設定する。設置・解除できるチームが切り替わる。 | mcom: MCOM, teamid: Team | なし | `mod.SetMCOMOwner(...);` |
| `GetRingOfFire` | RingOfFireを番号または対象から取得する。 | number: number | `RingOfFire` | `const value = mod.GetRingOfFire(...);` |
| `AllCapturePoints` | ゲーム内に存在する全CapturePointを配列で取得する。 | なし | `Array` | `const value = mod.AllCapturePoints(...);` |
| `GetCapturePoint` | CapturePointを番号または対象から取得する。 | id: number | `CapturePoint` | `const value = mod.GetCapturePoint(...);` |
| `GetCaptureProgress` | 指定CapturePointの占領進行度を0から1の数値で取得する。 | capturePoint: CapturePoint | `number` | `const value = mod.GetCaptureProgress(...);` |
| `GetCurrentOwnerTeam` | 指定CapturePointを現在所有しているチームを取得する。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetCurrentOwnerTeam(...);` |
| `GetOwnerProgressTeam` | 指定CapturePointを現在占領しようとしているチームを取得する。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetOwnerProgressTeam(...);` |
| `GetPlayersOnPoint` | 指定CapturePointの範囲内にいるプレイヤー配列を取得する。 | capturePoint: CapturePoint | `Array` | `const value = mod.GetPlayersOnPoint(...);` |
| `GetPreviousOwnerTeam` | 指定CapturePointの直前の所有チームを取得する。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetPreviousOwnerTeam(...);` |
| `GetHQ` | HQを番号または対象から取得する。 | number: number | `HQ` | `const value = mod.GetHQ(...);` |
| `GetMCOM` | MCOMを番号または対象から取得する。 | number: number | `MCOM` | `const value = mod.GetMCOM(...);` |
| `GetSector` | Sectorを番号または対象から取得する。 | number: number | `Sector` | `const value = mod.GetSector(...);` |

## 配置物・空間オブジェクト

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `EnableAreaTrigger` | AreaTriggerを有効または無効にする。無効時は対応イベントが発火しない。 | areaTrigger: AreaTrigger, enable: boolean | なし | `mod.EnableAreaTrigger(...);` |
| `EnableInteractPoint` | InteractPointを有効または無効にする。 | interactPoint: InteractPoint, enable: boolean | なし | `mod.EnableInteractPoint(mod.GetInteractPoint(0), false);` |
| `EnableSpatialObject` | SpatialObjectを有効または無効にする。 | spatialObject: SpatialObject, enable: boolean | なし | `mod.EnableSpatialObject(...);` |
| `RayCast` | 2点間の直線判定を要求する。結果は `OnRayCastHit` / `OnRayCastMissed` で受ける。 オーバーロード2種。 | player: Player, start: Vector, stop: Vector | なし | `mod.RayCast(eventPlayer, start, stop);` |
| `SetVL7CloudEffects` | VL7Cloudの画面効果、兵士効果、VFXを個別に有効または無効にする。 | vl7Cloud: VL7Cloud, screenEffect: boolean, soldierEffect: boolean, visualEffect: boolean | なし | `mod.SetVL7CloudEffects(...);` |
| `UnspawnObject` | `SpawnObject` で生成したオブジェクトを消去する。 | obj: mod.Object | なし | `mod.UnspawnObject(...);` |
| `MoveObject` | 指定オブジェクトを位置差分、必要なら回転差分で移動する。 オーバーロード2種。 | object: mod.Object, positionDelta: Vector | なし | `mod.MoveObject(...);` |
| `MoveObjectOverTime` | 指定オブジェクトを時間をかけて位置・回転差分ぶん動かす。ループや反転も指定できる。 | object: mod.Object, positionDelta: Vector, rotationDelta: Vector, timeInSeconds: number, shouldLoop: boolean, shouldReverse: boolean | なし | `mod.MoveObjectOverTime(...);` |
| `OrbitObjectOverTime` | 指定オブジェクトをTransformの周囲に時間をかけて公転させる。 オーバーロード2種。 | object: mod.Object, orbitTransform: Transform, timeInSeconds: number, radius: number, shouldLoop: boolean, shouldReverse: boolean, clockwise: boolean | なし | `mod.OrbitObjectOverTime(...);` |
| `RotateObject` | 指定オブジェクトをEuler角の差分で回転する。 | object: mod.Object, rotationDelta: Vector | なし | `mod.RotateObject(...);` |
| `SetObjectTransform` | 指定オブジェクトのTransformを設定する。 | object: mod.Object, transform: Transform | なし | `mod.SetObjectTransform(...);` |
| `SetObjectTransformOverTime` | 指定オブジェクトを時間をかけて指定Transformへ移動・回転させる。 | object: mod.Object, transform: Transform, timeInSeconds: number, shouldLoop: boolean, shouldReverse: boolean | なし | `mod.SetObjectTransformOverTime(...);` |
| `StopActiveMovementForObject` | 指定オブジェクトで進行中の時間移動を停止する。 | object: mod.Object | なし | `mod.StopActiveMovementForObject(...);` |
| `GetAreaTrigger` | AreaTriggerを番号または対象から取得する。 | areaTriggerNumber: number | `AreaTrigger` | `const area = mod.GetAreaTrigger(0);` |
| `GetInteractPoint` | InteractPointを番号または対象から取得する。 | interactPointNumber: number | `InteractPoint` | `const point = mod.GetInteractPoint(0);` |
| `GetSpatialObject` | SpatialObjectを番号または対象から取得する。 | spatialObjectNumber: number | `SpatialObject` | `const value = mod.GetSpatialObject(...);` |
| `SpawnObject` | ランタイムスポーン用Prefabを指定座標へ生成する。対応しないオブジェクトは戻り値が `-1` になることがある。 オーバーロード2種。 | prefabEnum: \| RuntimeSpawn_Common \| RuntimeSpawn_Abbasid \| RuntimeSpawn_Aftermath \| RuntimeSpawn_Badlands \| RuntimeSpawn_Battery \| RuntimeSpawn_Capstone \| RuntimeSpawn_Contaminated \| RuntimeSpawn_Dumbo \| RuntimeSpawn_Eastwood \| RuntimeSpawn_FireStorm \| RuntimeSpawn_Limestone \| RuntimeSpawn_Outskirts \| RuntimeSpawn_Subsurface \| RuntimeSpawn_Tungsten \| RuntimeSpawn_Granite_Downtown \| RuntimeSpawn_Granite_Marina \| RuntimeSpawn_Granite_MilitaryRnD \| RuntimeSpawn_Granite_MilitaryStorage \| RuntimeSpawn_Granite_ResidentialNorth \| RuntimeSpawn_Granite_TechCenter \| RuntimeSpawn_Granite_Underground \| RuntimeSpawn_Sand, position: Vector, rotation: Vector, scale: Vector | `Any` | `const obj = mod.SpawnObject(prefab, pos, rot, scale);` |
| `GetObjectPosition` | 指定オブジェクトの現在位置をVectorで取得する。 | object: mod.Object | `Vector` | `const value = mod.GetObjectPosition(...);` |
| `GetObjectRotation` | 指定オブジェクトの現在回転をVectorで取得する。 | object: mod.Object | `Vector` | `const value = mod.GetObjectRotation(...);` |
| `GetObjectTransform` | 指定オブジェクトの位置と回転を含むTransformを取得する。 | object: mod.Object | `Transform` | `const value = mod.GetObjectTransform(...);` |
| `GetTransformPosition` | Transformから位置Vectorを取り出す。 | transform: Transform | `Vector` | `const value = mod.GetTransformPosition(...);` |
| `GetTransformRotation` | Transformから回転Vectorを取り出す。 | transform: Transform | `Vector` | `const value = mod.GetTransformRotation(...);` |

## ルート・補給物資

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `SpawnLoot` | LootSpawnerに弾薬、武器、ガジェット、アーマーをスポーンする。 オーバーロード4種。 | lootSpawner: LootSpawner, ammo: AmmoTypes | なし | `mod.SpawnLoot(...);` |
| `UnspawnAllLoot` | ワールド上に存在するルートをすべて消去する。 | なし | なし | `mod.UnspawnAllLoot(...);` |
| `GetLootSpawner` | LootSpawnerを番号または対象から取得する。 | number: number | `LootSpawner` | `const value = mod.GetLootSpawner(...);` |

## 体力・ダメージ・状態

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `DealDamage` | 指定プレイヤーまたは車両へダメージを与える。必要ならダメージを与えたプレイヤーも指定できる。 オーバーロード3種。 | player: Player, damageAmount: number | なし | `mod.DealDamage(...);` |
| `ForceRevive` | ダウン状態のプレイヤーを強制蘇生する。 | player: Player | なし | `mod.ForceRevive(...);` |
| `Heal` | 指定プレイヤーまたは車両を回復・修理する。必要なら回復者も指定できる。 オーバーロード3種。 | player: Player, healAmount: number | なし | `mod.Heal(...);` |
| `Kill` | 指定プレイヤーまたは車両を即座に倒す。プレイヤーはダウン状態を飛ばす。 オーバーロード2種。 | player: Player | なし | `mod.Kill(...);` |
| `SetSoldierEffect` | 指定プレイヤーの兵士効果を有効または無効にする。 | player: Player, soldierEffects: SoldierEffects, isEnabled: boolean | なし | `mod.SetSoldierEffect(...);` |
| `SpotTarget` | 指定プレイヤーをスポットする。表示時間やスポット状態、スポッターを指定できる。 オーバーロード5種。 | targetplayer: Player, duration: number, spotStatus: SpotStatus | なし | `mod.SpotTarget(...);` |
| `SetPlayerIncomingDamageFactor` | 指定プレイヤーが受けるダメージ倍率を設定する。値は5%単位に丸められ、0から200%に制限される。 | player: Player, amount: number | なし | `mod.SetPlayerIncomingDamageFactor(...);` |
| `ForceManDown` | 指定プレイヤーをダウン状態にする。ダウンが無効なら適用されない。 | player: Player | なし | `mod.ForceManDown(...);` |
| `SetPlayerMaxHealth` | 指定プレイヤーの最大体力を1から500の範囲で設定する。最大体力倍率も反映される。 | player: Player, maxHealth: number | なし | `mod.SetPlayerMaxHealth(...);` |
| `SetPlayerMovementSpeedMultiplier` | 指定プレイヤーの移動速度倍率を設定する。 | player: Player, multiplier: number | なし | `mod.SetPlayerMovementSpeedMultiplier(...);` |
| `SkipManDown` | 指定プレイヤーが死亡時にダウン状態を経由せずデプロイ画面へ戻るか設定する。 | player: Player, skipManDown: boolean | なし | `mod.SkipManDown(...);` |

## 装備・入力・プレイヤー操作

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `Teleport` | 指定プレイヤーまたは車両を有効な座標へ向き付きで移動する。向きはラジアンで指定する。 オーバーロード2種。 | player: Player, destination: Vector, orientation: number | なし | `mod.Teleport(eventPlayer, destination, 0);` |
| `EnableAllInputRestrictions` | 指定プレイヤーの移動、射撃、視点操作など全入力制限を切り替える。 | player: Player, restrictInput: boolean | なし | `mod.EnableAllInputRestrictions(...);` |
| `EnableInputRestriction` | 指定プレイヤーの特定入力だけを制限または解除する。 | player: Player, inputRestriction: RestrictedInputs, restrictInput: boolean | なし | `mod.EnableInputRestriction(...);` |
| `AddAttachmentToWeaponPackage` | WeaponPackageへアタッチメントを追加する。同じ種類の既存アタッチメントは置き換わる。 | attachment: WeaponAttachments, weaponPackage: WeaponPackage | なし | `mod.AddAttachmentToWeaponPackage(...);` |
| `AddEquipment` | プレイヤーのロードアウトへ武器、ガジェット、アーマーを追加する。 オーバーロード7種。 | player: Player, weapon: Weapons | なし | `mod.AddEquipment(...);` |
| `ForceSwitchInventory` | 指定プレイヤーに指定インベントリスロットへ強制持ち替えさせる。 | player: Player, inventorySlot: InventorySlots | なし | `mod.ForceSwitchInventory(...);` |
| `RemoveEquipment` | プレイヤーのロードアウトから指定スロット、武器、ガジェットを削除する。 オーバーロード3種。 | player: Player, inventorySlot: InventorySlots | なし | `mod.RemoveEquipment(...);` |
| `SetInventoryAmmo` | 指定インベントリスロットの所持弾数を設定する。 | player: Player, inventorySlots: InventorySlots, ammo: number | なし | `mod.SetInventoryAmmo(...);` |
| `SetInventoryMagazineAmmo` | 指定インベントリスロットのマガジン内弾数を設定する。 | player: Player, inventorySlots: InventorySlots, magAmmo: number | なし | `mod.SetInventoryMagazineAmmo(...);` |
| `Resupply` | 指定補給タイプでプレイヤーへ補給する。 | player: Player, ressuplyType: ResupplyTypes | なし | `mod.Resupply(...);` |
| `CreateNewWeaponPackage` | 新しいWeaponPackageを作成する。 | なし | `WeaponPackage` | `const value = mod.CreateNewWeaponPackage(...);` |
| `EventDamageTypeCompare` | イベントで渡されたDamageTypeが指定ダメージ種別と一致するか判定する。 | damageType: DamageType, playerDamageTypes: PlayerDamageTypes | `boolean` | `const value = mod.EventDamageTypeCompare(...);` |
| `EventDeathTypeCompare` | イベントで渡されたDeathTypeが指定死亡種別と一致するか判定する。 | deathType: DeathType, playerDeathTypes: PlayerDeathTypes | `boolean` | `const value = mod.EventDeathTypeCompare(...);` |
| `EventWeaponCompare` | イベントで渡された武器・ガジェットが指定装備と一致するか判定する。 オーバーロード2種。 | eventWeapon: WeaponUnlock, weapon: Weapons | `boolean` | `if (mod.EventWeaponCompare(eventWeaponUnlock, mod.Weapons.AK24)) {}` |
| `GetInventoryAmmo` | 指定プレイヤーの指定スロットにある所持弾数を取得する。 | player: Player, inventorySlots: InventorySlots | `number` | `const value = mod.GetInventoryAmmo(...);` |
| `GetInventoryMagazineAmmo` | 指定プレイヤーの指定スロットにあるマガジン内弾数を取得する。 | player: Player, inventorySlots: InventorySlots | `number` | `const value = mod.GetInventoryMagazineAmmo(...);` |
| `GetSoldierState` | 指定プレイヤーの兵士状態を、数値・真偽値・Vectorのいずれかで取得する。 オーバーロード3種。 | player: Player, soldierStateNumber: SoldierStateNumber | `number` | `const value = mod.GetSoldierState(...);` |
| `HasEquipment` | 指定プレイヤーが指定武器またはガジェットを持っているか判定する。 オーバーロード2種。 | player: Player, weapon: Weapons | `boolean` | `if (mod.HasEquipment(eventPlayer, mod.Weapons.AK24)) {}` |
| `IsInventorySlotActive` | 指定プレイヤーが指定インベントリスロットを使用中か判定する。 | player: Player, inventorySlots: InventorySlots | `boolean` | `const value = mod.IsInventorySlotActive(...);` |
| `IsSoldierClass` | 指定プレイヤーが指定兵科か判定する。 | player: Player, soldierClass: SoldierClass | `boolean` | `const value = mod.IsSoldierClass(...);` |

## 車両

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `ForceVehicleSpawnerSpawn` | VehicleSpawnerから現在設定されている車両を強制スポーンする。 | vehicleSpawner: VehicleSpawner | なし | `mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(0));` |
| `SetAllVehiclesAllowedInSurroundingArea` | 周辺エリアで全車両を許可するか設定する。 | allowed: boolean | なし | `mod.SetAllVehiclesAllowedInSurroundingArea(...);` |
| `SetMaxVehicleHeightLimitScale` | 車両エンジンが上向き推力を失う高度制限の倍率を設定する。 | heightScale: number | なし | `mod.SetMaxVehicleHeightLimitScale(...);` |
| `SetVehicleAllowedInSurroundingArea` | 周辺エリアで指定車両を許可するか設定する。 | vehicle: VehicleList, allowed: boolean | なし | `mod.SetVehicleAllowedInSurroundingArea(...);` |
| `SetVehicleCategoryAllowedInSurroundingArea` | 周辺エリアで指定車両カテゴリを許可するか設定する。 | vehicleCategory: VehicleCategories, allowed: boolean | なし | `mod.SetVehicleCategoryAllowedInSurroundingArea(...);` |
| `SetVehicleSpawnerAbandonVehiclesOutOfCombatArea` | 戦闘区域外に放置された車両を破壊するか設定する。 | vehicleSpawner: VehicleSpawner, enabled: boolean | なし | `mod.SetVehicleSpawnerAbandonVehiclesOutOfCombatArea(...);` |
| `SetVehicleSpawnerApplyDamageToAbandonVehicle` | 放置車両へダメージを適用するか設定する。 | vehicleSpawner: VehicleSpawner, enabled: boolean | なし | `mod.SetVehicleSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetVehicleSpawnerAutoSpawn` | VehicleSpawnerの自動リスポーンを有効または無効にする。 | vehicleSpawner: VehicleSpawner, enabled: boolean | なし | `mod.SetVehicleSpawnerAutoSpawn(...);` |
| `SetVehicleSpawnerKeepAliveAbandonRadius` | 車両が放置扱いになる、最寄りプレイヤーからの距離を設定する。 | vehicleSpawner: VehicleSpawner, keepAliveAbandonedRadius: number | なし | `mod.SetVehicleSpawnerKeepAliveAbandonRadius(...);` |
| `SetVehicleSpawnerKeepAliveSpawnerRadius` | 車両がスポーナーから離れたと判定される距離を設定する。 | vehicleSpawner: VehicleSpawner, keepAliveSpawnerRadius: number | なし | `mod.SetVehicleSpawnerKeepAliveSpawnerRadius(...);` |
| `SetVehicleSpawnerRespawnTime` | 車両が破壊されてから自動リスポーンするまでの秒数を設定する。 | vehicleSpawner: VehicleSpawner, respawnTime: number | なし | `mod.SetVehicleSpawnerRespawnTime(...);` |
| `SetVehicleSpawnerTimeUntilAbandon` | 車両が未使用で放置扱いになるまでの時間を設定する。 | vehicleSpawner: VehicleSpawner, timeUntilAbandon: number | なし | `mod.SetVehicleSpawnerTimeUntilAbandon(...);` |
| `SetVehicleSpawnerVehicleType` | VehicleSpawnerから出す車両の種類を設定する。 | vehicleSpawner: VehicleSpawner, vehicleType: VehicleList | なし | `mod.SetVehicleSpawnerVehicleType(...);` |
| `SetVehicleMaxHealthMultiplier` | 指定車両の最大耐久値倍率を0より大きく4以下の値で設定する。 | vehicle: Vehicle, maxHealthMultiplier: number | なし | `mod.SetVehicleMaxHealthMultiplier(...);` |
| `ForcePlayerExitVehicle` | 指定プレイヤーを車両から強制的に降ろす。 オーバーロード3種。 | player: Player, vehicle: Vehicle | なし | `mod.ForcePlayerExitVehicle(...);` |
| `ForcePlayerToSeat` | 指定プレイヤーを指定車両の座席へ強制的に乗せる。座席番号-1なら空席を使う。 | player: Player, vehicle: Vehicle, seatNumber: number | なし | `mod.ForcePlayerToSeat(...);` |
| `GetVehicleSpawner` | VehicleSpawnerを番号または対象から取得する。 | number: number | `VehicleSpawner` | `const value = mod.GetVehicleSpawner(...);` |
| `AllVehicles` | ゲーム内に存在する全車両を配列で取得する。 | なし | `Array` | `const vehicles = mod.AllVehicles();` |
| `CompareVehicleName` | 指定車両が指定VehicleListと同じ種類か判定する。 | vehicle: Vehicle, vehicleList: VehicleList | `boolean` | `const value = mod.CompareVehicleName(...);` |
| `GetVehicleFromPlayer` | 指定プレイヤーが乗っている車両を取得する。 | player: Player | `Vehicle` | `const vehicle = mod.GetVehicleFromPlayer(eventPlayer);` |
| `GetVehicleSeatCount` | 指定車両の座席数を取得する。 | vehicle: Vehicle | `number` | `const value = mod.GetVehicleSeatCount(...);` |
| `GetVehicleState` | 指定車両の状態Vectorを取得する。 | vehicle: Vehicle, vehicleStateVector: VehicleStateVector | `Vector` | `const value = mod.GetVehicleState(...);` |
| `GetVehicleTeam` | 指定車両の所属チームを取得する。未搭乗車両はニュートラル扱いになる。 | vehicle: Vehicle | `Team` | `const value = mod.GetVehicleTeam(...);` |
| `IsVehicleOccupied` | 指定車両にプレイヤーが乗っているか判定する。 | vehicle: Vehicle | `boolean` | `const value = mod.IsVehicleOccupied(...);` |
| `IsVehicleSeatOccupied` | 指定車両の指定座席が使用中か判定する。 | vehicle: Vehicle, number: number | `boolean` | `const value = mod.IsVehicleSeatOccupied(...);` |
| `GetAllPlayersInVehicle` | 指定車両に乗っている全プレイヤーを配列で取得する。 | vehicle: Vehicle | `Array` | `const value = mod.GetAllPlayersInVehicle(...);` |
| `GetPlayerFromVehicleSeat` | 指定車両の指定座席に乗っているプレイヤーを取得する。空席なら無効なPlayerになる。 | vehicle: Vehicle, number: number | `Player` | `const value = mod.GetPlayerFromVehicleSeat(...);` |
| `GetPlayerVehicleSeat` | 指定プレイヤーが乗っている車両座席番号を取得する。車両外なら-1。 | player: Player | `number` | `const value = mod.GetPlayerVehicleSeat(...);` |

## ワールドアイコン

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `EnableWorldIconImage` | WorldIconの画像表示を有効または無効にする。 | worldIcon: WorldIcon, enableImage: boolean | なし | `mod.EnableWorldIconImage(...);` |
| `EnableWorldIconText` | WorldIcon上のテキスト表示を有効または無効にする。 | worldIcon: WorldIcon, enableText: boolean | なし | `mod.EnableWorldIconText(...);` |
| `RemoveUIIcon` | オブジェクトに付いたUI Icon Widgetを削除する。対象プレイヤーやチームも指定できる。 オーバーロード2種。 | objectWithIcon: mod.Object | なし | `mod.RemoveUIIcon(...);` |
| `SetWorldIconColor` | WorldIconの色を変更する。 | worldIcon: WorldIcon, newColor: Vector | なし | `mod.SetWorldIconColor(...);` |
| `SetWorldIconImage` | WorldIconの画像種別を変更する。 | worldIcon: WorldIcon, newImage: WorldIconImages | なし | `mod.SetWorldIconImage(...);` |
| `SetWorldIconOwner` | WorldIconを特定チームまたはプレイヤーだけに見えるよう制限する。 オーバーロード2種。 | worldIcon: WorldIcon, newTeamOwner: Team | なし | `mod.SetWorldIconOwner(...);` |
| `SetWorldIconPosition` | WorldIconの表示位置を変更する。 | worldIcon: WorldIcon, newPosition: Vector | なし | `mod.SetWorldIconPosition(...);` |
| `SetWorldIconText` | WorldIcon上のテキストを変更する。表示文は `Strings.json` に登録してから `mod.stringkeys` で参照する。 | worldIcon: WorldIcon, newText: Message | なし | `mod.SetWorldIconText(icon, mod.Message(mod.stringkeys.pointA));` |
| `GetWorldIcon` | WorldIconを番号または対象から取得する。 | worldIconNumber: number | `WorldIcon` | `const icon = mod.GetWorldIcon(0);` |

# 次に読む付録

UI、通知、プレイヤー参照、配列、ObjId、数値、型、最小テンプレートは、次の「付録A-3：アクション・値取得一覧（UI・参照・値）」へ分けています。
