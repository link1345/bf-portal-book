---
title: "附錄 A-2：動作/值取得清單（基本操作）"
free: true
---

# 動作與值取得列表

這裡，從 `mod.` 呼叫的函數是依照用途排列的。有些名稱與 Portal 的區塊名稱類似，但 TypeScript 有嚴格的類型，因此你需要傳遞 `Player`、`Team`、`Vector`、`Message`、`Vector`、`Message`、`UIWidget` 等類型。

具有相同名稱和多個參數模式的函數聚集在一行上，重載的number寫在函數/用途列中。要獲得完整的簽名，請在 `index.d.ts` 中搜尋函數名稱。

## 變數 / 等待 / 子例程

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `Wait` | 等待指定的秒數。由於它是一個非同步過程，因此將其與 `await` 結合。 | n: number | `Promise<void>` | `await mod.Wait(1);` |
| `SetVariable` | 將值儲存到指定變數。階段、分數和標誌管理的基礎知識。 | variable: Variable, value: Any | 無 | `mod.SetVariable(mod.GlobalVariable(0), 1);` |
| `SetVariableAtIndex` | 初始化或取得Variable中的陣列並將值儲存到指定索引。 | arrayVariable: Variable, arrayIndex: number, value: Any | 無 | `mod.SetVariableAtIndex(mod.GlobalVariable(1), 0, eventPlayer);` |
| `ChaseVariableAtRate` | 每秒鐘將變數的值往極限值移動指定的量。 | variable: Variable, limit: number, deltaPerSecond: number | 無 | `mod.ChaseVariableAtRate(...);` |
| `ChaseVariableOverTime` | 在指定的秒數內使變數的值接近極限值。 | variable: Variable, limit: number, durationSeconds: number | 無 | `mod.ChaseVariableOverTime(...);` |
| `StopChasingVariable` | 停止正在進行的變數追蹤並停止在目前值。 | variable: Variable | 無 | `mod.StopChasingVariable(...);` |
| `GetArgument` | 按編號取得子程式參數。 | subroutineArgIndex: number | `Any` | `const value = mod.GetArgument(...);` |
| `GetVariable` | 取得儲存在變數中的目前值。 | variable: Variable | `Any` | `const phase = mod.GetVariable(mod.GlobalVariable(0));` |
| `GlobalVariable` | 取得指定編號的全域變數。 | variableIndex: number | `Variable` | `const phase = mod.GlobalVariable(0);` |
| `ObjectVariable` | 取得與指定物件關聯的變數。 | ownerObject: mod.Object, variableIndex: number | `Variable` | `const flag = mod.ObjectVariable(eventPlayer, 0);` |

## AI 控制

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `AIBattlefieldBehavior` | 讓AI 士兵自主行動，讓他們完成目標並向敵人射擊。僅供AI玩家使用。 | player: Player | 無 | `mod.AIBattlefieldBehavior(...);` |
| `AIDefendPositionBehavior` | 讓AI 士兵保衛指定位置周圍的區域。僅供AI玩家使用。 | player: Player, defendPosition: Vector, minDistance: number, maxDistance: number | 無 | `mod.AIDefendPositionBehavior(...);` |
| `AIIdleBehavior` | 將AI 士兵目前位置設定為待命點。僅供AI玩家使用。 | player: Player | 無 | `mod.AIIdleBehavior(...);` |
| `AILOSMoveToBehavior` | 將AI 士兵移到指定位置，同時保持視線。僅供AI玩家使用。 | player: Player, position: Vector | 無 | `mod.AILOSMoveToBehavior(...);` |
| `AIMoveToBehavior` | 給AI 士兵一個目的地，移動到指定的座標。僅供AI玩家使用。 | player: Player, position: Vector | 無 | `mod.AIMoveToBehavior(...);` |
| `AIParachuteBehavior` | 讓AI 士兵做一個跳傘動作。僅供AI玩家使用。 | player: Player | 無 | `mod.AIParachuteBehavior(...);` |
| `AIValidatedMoveToBehavior` | 將 AI 士兵移至導覽網格上的有效鄰近位置。僅供AI玩家使用。 | player: Player, position: Vector | 無 | `mod.AIValidatedMoveToBehavior(...);` |
| `AIWaypointIdleBehavior` | 讓AI 士兵巡邏航點路徑。僅供AI玩家使用。 | player: Player, waypointPath: WaypointPath | 無 | `mod.AIWaypointIdleBehavior(...);` |
| `SetAiInput` | 在一段時間內向 AI 士兵發送指定的輸入。最多可同時指定 3 個輸入。 | player: Player, input: AiInput, duration: number | 無 | `mod.SetAiInput(...);` |
| `AISetUnspawnOnDead` | 設定從Spawner 生成的AI 士兵死亡後是否離開。 | spawner: Spawner, enableUnspawnOnDead: boolean | 無 | `mod.AISetUnspawnOnDead(...);` |
| `SetUnspawnDelayInSeconds` | 設定從Spawner發送的AI 士兵死亡後退場的秒數。 | spawner: Spawner, delay: number | 無 | `mod.SetUnspawnDelayInSeconds(...);` |
| `SpawnAIFromAI Spawner` | 從指定的 AI Spawner產生一名 AI 士兵。 8 種重載。 | spawner: Spawner | 無 | `mod.SpawnAIFromAI Spawner(mod.GetSpawner(0));` |
| `UnspawnAllAIsFromAI Spawner` | 移除所有指定 AI 生成器派出的 AI 士兵。 | spawner: Spawner | 無 | `mod.UnspawnAllAIsFromAI Spawner(...);` |
| `AIEnableShooting` | 切換AI 士兵是否可以射擊。僅供AI玩家使用。 2 種重載。 | player: Player | 無 | `mod.AIEnableShooting(...);` |
| `AIEnableTargeting` | 切換AI 士兵的索敵 / 目標識別。如果禁用它，它就不會再射擊。 2 種重載。 | player: Player | 無 | `mod.AIEnableTargeting(...);` |
| `AIForceFire` | 強制AI 士兵在指定時間內使用手持武器和Gadget。 | player: Player, fireDuration: number | 無 | `mod.AIForceFire(...);` |
| `AIGadgetSettings` | 調整AI 士兵的Gadget使用條件、冷卻時間和精確度修正。 | player: Player, applyUsageCriteria: boolean, applyCoolDownAfterUse: boolean, applyInaccuracy: boolean | 無 | `mod.AIGadgetSettings(...);` |
| `AISetFocusPoint` | 設定AI 士兵的注視點，並在必要時讓它攻擊那裡。 | player: Player, point: Vector, isTarget: boolean | 無 | `mod.AISetFocusPoint(...);` |
| `AISetMoveSpeed` | 設定AI 士兵的移動行為的速度。 | player: Player, moveSpeed: MoveSpeed | 無 | `mod.AISetMoveSpeed(...);` |
| `AISetStance` | 設定AI 士兵的姿勢。 | player: Player, stance: Stance | 無 | `mod.AISetStance(...);` |
| `AISetTarget` | 設定或清除AI 士兵的當前目標。 2 種重載。 | aiPlayer: Player, targetPlayer: Player | 無 | `mod.AISetTarget(...);` |
| `AIStartUsingGadget` | 讓AI 士兵在指定位置或指定玩家使用特定Gadget。 2 種重載。 | player: Player, gadget: Gadgets, targetPos: Vector | 無 | `mod.AIStartUsingGadget(...);` |
| `AIStopUsingGadget` | 取消給AI 士兵的Gadget使用說明。 | player: Player | 無 | `mod.AIStopUsingGadget(...);` |
| `SetAIToHumanDamageModifier` | 設定AI給予人類玩家的傷害倍數。 | damageMultiplier: number | 無 | `mod.SetAIToHumanDamageModifier(...);` |

## 聲音 / 音樂 / VO

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `LoadMusic` | 載入音樂包並使其可在 `PlayMusic` 上播放。 | musicPackage: MusicPackages | 無 | `mod.LoadMusic(...);` |
| `PlayMusic` | 播放音樂事件。你可以指定全體、隊伍、小隊或玩家作為對象。 4 種重載。 | musicEvent: MusicEvents | 無 | `mod.PlayMusic(...);` |
| `PlaySound` | 播放音效。你可以指定目標、位置和衰減範圍。 8 種重載。 | sound: SFX, amplitude: number, team: Team | 無 | `mod.PlaySound(mod.GetSFX(0), 1);` |
| `PlayVO` | 播放 VO 音訊事件。你可以指定全體、隊伍、小隊或玩家作為對象。 4 種重載。 | voiceOver: VO, event: VoiceOverEvents2D, flag: VoiceOverFlags | 無 | `mod.PlayVO(...);` |
| `SetMusicParam` | 更新載入的音樂包的參數值。 4 種重載。 | musicParam: MusicParams, paramValue: number | 無 | `mod.SetMusicParam(...);` |
| `SetSoundAmplitude` | 變更指定 SFX 的音量。你可以指定全體、隊伍、小隊或玩家作為對象。 4 種重載。 | sound: SFX, amplitude: number, team: Team | 無 | `mod.SetSoundAmplitude(...);` |
| `StopSound` | 停止指定的 SFX。你可以指定全體、隊伍、小隊或玩家作為對象。 4 種重載。 | sound: SFX, team: Team | 無 | `mod.StopSound(...);` |
| `UnloadMusic` | 釋放載入的音樂包。 | musicPackage: MusicPackages | 無 | `mod.UnloadMusic(...);` |

## 相機 / 演出

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `SetCameraTypeForAll` | 為所有玩家設定相機類型。如有必要，還需指定相機索引。 2 種重載。 | cameraType: Cameras | 無 | `mod.SetCameraTypeForAll(...);` |
| `SetCameraTypeForPlayer` | 設定指定玩家的相機類型。如有必要，還需指定相機索引。 2 種重載。 | player: Player, cameraType: Cameras | 無 | `mod.SetCameraTypeForPlayer(...);` |
| `SetFreeCameraCollisionForAll` | 啟用或停用所有玩家的 Free Camera 碰撞。 | enabled: boolean | 無 | `mod.SetFreeCameraCollisionForAll(true);` |
| `SetFreeCameraCollisionForPlayer` | 啟用或停用指定玩家的 Free Camera 碰撞。 | player: Player, enabled: boolean | 無 | `mod.SetFreeCameraCollisionForPlayer(player, true);` |
| `SetThirdPersonCameraPositionForAll` | 設定所有玩家的第三人稱相機距離、高度和肩部偏移。 | followDistance: number, followHeight: number, shoulderOffset: number | 無 | `mod.SetThirdPersonCameraPositionForAll(2.5, 0.2, 0.6);` |
| `SetThirdPersonCameraPositionForPlayer` | 設定指定玩家的第三人稱相機距離、高度和肩部偏移。 | player: Player, followDistance: number, followHeight: number, shoulderOffset: number | 無 | `mod.SetThirdPersonCameraPositionForPlayer(player, 2.5, 0.2, 0.6);` |
| `SetSpectatingFiltersForAll` | 為所有玩家設定觀看濾鏡。只能限制在小隊 / 隊伍內。 | group: SpectatingGroup, ownSquadOnly: boolean, ownTeamOnly: boolean | 無 | `mod.SetSpectatingFiltersForAll(...);` |
| `SetSpectatingFiltersForPlayer` | 設定觀看指定玩家的篩選器。只能限制在小隊 / 隊伍內。 | player: Player, group: SpectatingGroup, ownSquadOnly: boolean, ownTeamOnly: boolean | 無 | `mod.SetSpectatingFiltersForPlayer(...);` |
| `EnableScreenEffect` | 啟用或停用指定玩家的畫面效果。 | player: Player, screenEffect: ScreenEffects, enable: boolean | 無 | `mod.EnableScreenEffect(...);` |
| `EnableVFX` | 啟用或停用指定VFX的顯示與動作。 | vfx: VFX, enable: boolean | 無 | `mod.EnableVFX(...);` |
| `MoveVFX` | 將 VFX 移到指定的座標和旋轉。一般來說，通用的移動函式也會被考慮。 | vfxID: VFX, position: Vector, rotation: Vector | 無 | `mod.MoveVFX(...);` |
| `SetVFXColor` | 改變VFX色彩。 | vfxID: VFX, color: Vector | 無 | `mod.SetVFXColor(...);` |
| `SetVFXScale` | 更改VFX的比例。 | vfxID: VFX, scale: number | 無 | `mod.SetVFXScale(...);` |
| `SetVFXSpeed` | 改變 VFX 的播放速度。 | vfxID: VFX, speed: number | 無 | `mod.SetVFXSpeed(...);` |
| `GetFixedCamera` | 從數字或目標取得固定相機。 | number: number | `FixedCamera` | `const value = mod.GetFixedCamera(...);` |

## 固定武器 Spawner

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `ForceEmplacementSpawnerSpawn` | 從固定武器 Spawner強制產生目前設定的固定武器。 | emplacementSpawner: EmplacementSpawner | 無 | `mod.ForceEmplacementSpawnerSpawn(...);` |
| `SetEmplacementSpawnerAbandonVehicleOutOfCombatArea` | 設定是否銷毀留在戰鬥區域外的固定武器。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | 無 | `mod.SetEmplacementSpawnerAbandonVehicleOutOfCombatArea(...);` |
| `SetEmplacementSpawnerApplyDamageToAbandonVehicle` | 設定是否會對廢棄的固定武器施加傷害。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | 無 | `mod.SetEmplacementSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetEmplacementSpawnerAutoSpawn` | 啟用或停用固定武器 Spawner的自動重生。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | 無 | `mod.SetEmplacementSpawnerAutoSpawn(...);` |
| `SetEmplacementSpawnerKeepAliveAbandonRadius` | 設定與最近玩家的距離，固定武器將被視為廢棄。 | emplacementSpawner: EmplacementSpawner, keepAliveAbandonedRadius: number | 無 | `mod.SetEmplacementSpawnerKeepAliveAbandonRadius(...);` |
| `SetEmplacementSpawnerRespawnTime` | 設定固定武器被摧毀後自動重生的秒數。 | emplacementSpawner: EmplacementSpawner, respawnTime: number | 無 | `mod.SetEmplacementSpawnerRespawnTime(...);` |
| `SetEmplacementSpawnerSpawnerRadius` | 設定固定武器被視為遠離生成器的距離。 | emplacementSpawner: EmplacementSpawner, keepAliveSpawnerRadius: number | 無 | `mod.SetEmplacementSpawnerSpawnerRadius(...);` |
| `SetEmplacementSpawnerTimeUntilAbandon` | 設定固定武器在被遺棄之前保持不使用狀態的時間。 | emplacementSpawner: EmplacementSpawner, timeUntilAbandon: number | 無 | `mod.SetEmplacementSpawnerTimeUntilAbandon(...);` |
| `SetEmplacementSpawnerType` | 設定從固定武器 Spawner發出的固定武器的類型。 | emplacementSpawner: EmplacementSpawner, emplacementType: StationaryEmplacements | 無 | `mod.SetEmplacementSpawnerType(...);` |
| `GetEmplacementSpawner` | 從數字或目標取得 EmplacementSpawner。 | number: number | `EmplacementSpawner` | `const value = mod.GetEmplacementSpawner(...);` |

## 出擊/重生

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `DeployAllPlayers` | 強制部署畫面上的所有玩家出擊。 | 無 | 無 | `mod.DeployAllPlayers(...);` |
| `EnableAllPlayerDeploy` | 切換是否所有玩家都可以從部署畫面進行部署。 | enablePlayerDeploy: boolean | 無 | `mod.EnableAllPlayerDeploy(...);` |
| `EnablePlayerDeploy` | 切換指定玩家是否可以部署。 | player: Player, deployAllowed: boolean | 無 | `mod.EnablePlayerDeploy(...);` |
| `SetRedeployTime` | 涵蓋指定玩家的重生時間，範圍為 0 到 60 秒。 | player: Player, redeployTime: number | 無 | `mod.SetRedeployTime(...);` |
| `UndeployAllPlayers` | 將戰場上的所有玩家放回部署畫面。 | 無 | 無 | `mod.UndeployAllPlayers(...);` |
| `UndeployPlayer` | 將指定玩家回到部署畫面。 | player: Player | 無 | `mod.UndeployPlayer(...);` |
| `DeployPlayer` | 強制指定玩家出擊。 | player: Player | 無 | `mod.DeployPlayer(...);` |
| `SetSpawnMode` | 設定產生模式以決定是否自動產生玩家。 | spawnModes: SpawnModes | 無 | `mod.SetSpawnMode(...);` |
| `SpawnPlayerFromSpawnPoint` | 從指定的 SpawnPoint 出擊指定的玩家。 2 種重載。 | player: Player, spawnPointId: number | 無 | `mod.SpawnPlayerFromSpawnPoint(eventPlayer, mod.GetSpawnPoint(0));` |

## 遊戲進度 / 隊伍

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `EndGameMode` | 結束遊戲模式並使指定的玩家或隊伍獲勝。 Team 0 表示平手。 2 種重載。 | player: Player | 無 | `mod.EndGameMode(mod.GetTeam(1));` |
| `PauseGameModeTime` | 暫停或恢復遊戲模式計時器。 | pauseTimer: boolean | 無 | `mod.PauseGameModeTime(...);` |
| `ResetGameModeTime` | 將遊戲模式時間回到起始值。 | 無 | 無 | `mod.ResetGameModeTime(...);` |
| `SetFriendlyFire` | 啟用或停用友軍火力。 | enableFriendlyFire: boolean | 無 | `mod.SetFriendlyFire(...);` |
| `SetGameModeCriteria` | 設定用於勝負判定的分數標準。 | criteria: ScoreCriteria | 無 | `mod.SetGameModeCriteria(mod.ScoreCriteria.HighestProgress);` |
| `SetGameModeInitialScore` | 設定指定隊伍的初始遊戲模式分數。 | team: Team, initialscore: number | 無 | `mod.SetGameModeInitialScore(mod.GetTeam(1), 0);` |
| `SetGameModeScore` | 設定指定玩家或隊伍的遊戲模式分數。 2 種重載。 | team: Team, newScore: number | 無 | `mod.SetGameModeScore(mod.GetTeam(1), 10);` |
| `SetGameModeTargetScore` | 設定用於決定勝利的目標分數。 | newScore: number | 無 | `mod.SetGameModeTargetScore(...);` |
| `SetGameModeTimeLimit` | 設定遊戲模式時間限制（以秒為單位）。 | newTimeLimit: number | 無 | `mod.SetGameModeTimeLimit(...);` |
| `AutoBalanceTeams` | 自動調整隊伍人數。隊伍/小隊的能力必須匹配。 | 無 | 無 | `mod.AutoBalanceTeams(...);` |
| `DisablePlayerJoin` | 停止新加入伺服器。根據SDK註釋，沒有辦法恢復，所以使用時要小心。 | 無 | 無 | `mod.DisablePlayerJoin(...);` |
| `SwitchTeams` | 交換TeamA 和TeamB 的玩家。兩隊必須擁有相同數量的人類和機器人。 | teamA: Team, teamB: Team | 無 | `mod.SwitchTeams(...);` |
| `GetGameModeScore` | 取得指定玩家或隊伍的遊戲模式分數。 2 種重載。 | player: Player | `number` | `const value = mod.GetGameModeScore(...);` |
| `GetMatchTimeElapsed` | 取得目前遊戲模式已經過去的秒數。 | 無 | `number` | `const value = mod.GetMatchTimeElapsed(...);` |
| `GetMatchTimeRemaining` | 取得目前遊戲模式剩餘的秒數。 | 無 | `number` | `const value = mod.GetMatchTimeRemaining(...);` |
| `GetRoundTime` | 取得遊戲模式中設定的時間限制（以秒為單位）。 | 無 | `number` | `const value = mod.GetRoundTime(...);` |
| `GetTargetScore` | 取得獲勝所需的目標分數。 | 無 | `number` | `const value = mod.GetTargetScore(...);` |

## 目標 / 遊戲模式物件

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `RingOfFireStart` | 通知RingOfFire開始縮小。 | ringOfFire: RingOfFire | 無 | `mod.RingOfFireStart(...);` |
| `SetHQTeam` | 設定HQ所屬隊伍。 | hq: HQ, teamID: Team | 無 | `mod.SetHQTeam(...);` |
| `SetRingOfFireDamageAmount` | 設定對陷入火環的玩家造成的傷害量。 | ringOfFireId: RingOfFire, ringOfFireDamageAmount: number | 無 | `mod.SetRingOfFireDamageAmount(...);` |
| `SetRingOfFireStableTime` | 設定 RingOfFire 在縮小之前保持穩定的時間。 | ringOfFireId: RingOfFire, ringOfFireStableTime: number | 無 | `mod.SetRingOfFireStableTime(...);` |
| `EnableCapturePointDeploying` | 切換 CapturePoint 所屬隊伍是否可以從那裡部署。 | capturePoint: CapturePoint, enableDeploying: boolean | 無 | `mod.EnableCapturePointDeploying(...);` |
| `SetCapturePointCapturingTime` | 設定佔領 CapturePoint 所需的時間。 | capturePoint: CapturePoint, capturingTime: number | 無 | `mod.SetCapturePointCapturingTime(...);` |
| `SetCapturePointNeutralizationTime` | 設定中立化 CapturePoint 所需的時間。 | capturePoint: CapturePoint, neutralizationTime: number | 無 | `mod.SetCapturePointNeutralizationTime(...);` |
| `SetCapturePointOwner` | 更改控制 CapturePoint 的隊伍。 | capturePoint: CapturePoint, team: Team | 無 | `mod.SetCapturePointOwner(...);` |
| `SetMaxCaptureMultiplier` | 設定CapturePoint佔領速度倍增的上限。 | capturePoint: CapturePoint, multiplier: number | 無 | `mod.SetMaxCaptureMultiplier(...);` |
| `EnableHQ` | 啟用或停用HQ。 | hq: HQ, enable: boolean | 無 | `mod.EnableHQ(...);` |
| `EnableGameModeObjective` | 啟用或停用諸如 CapturePoint、HQ、Sector、MCOM 等目標。目標：CapturePoint \|HQ\|磁區\| MCOM，啟用：boolean | objective: CapturePoint \| HQ \| Sector \| MCOM, enable: boolean | 無 | `mod.EnableGameModeObjective(...);` |
| `SetMCOMFuseTime` | 設定點火時間直到 MCOM 爆炸。 | mCOM: MCOM, fuseTime: number | 無 | `mod.SetMCOMFuseTime(...);` |
| `SetMCOMArmType` | 設定 MCOM 是普通安裝，還是只有 Bomb 攜帶者才能安裝。 | mcom: MCOM, mcomarmtype: MCOMArmType | 無 | `mod.SetMCOMArmType(mod.GetMCOM(1), mod.MCOMArmType.Bomb);` |
| `SetMCOMOwner` | 設定 MCOM 所有隊伍。可以安裝和刪除它的隊伍將會發生變化。 | mcom: MCOM, teamid: Team | 無 | `mod.SetMCOMOwner(...);` |
| `ForceBombDrop` | 強制 Bomb 從攜帶者身上掉落。 | bomb: Bomb | 無 | `mod.ForceBombDrop(mod.GetBomb(1));` |
| `ForceBombReset` | 強制把 Bomb 重置到初始位置。 | bomb: Bomb | 無 | `mod.ForceBombReset(mod.GetBomb(1));` |
| `ForceBombSpawn` | 強制 Bomb 在原始位置生成。 | bomb: Bomb | 無 | `mod.ForceBombSpawn(mod.GetBomb(1));` |
| `ForceBombUnspawn` | 強制移除 Bomb。 | bomb: Bomb | 無 | `mod.ForceBombUnspawn(mod.GetBomb(1));` |
| `GiveBombToPlayer` | 把 Bomb 交給指定玩家。 | player: Player, bomb: Bomb | 無 | `mod.GiveBombToPlayer(player, mod.GetBomb(1));` |
| `SetBombDropFuseTime` | 設定 Bomb 掉到地面後到爆炸為止的時間。 | bomb: Bomb, dropfusetime: number | 無 | `mod.SetBombDropFuseTime(mod.GetBomb(1), 10);` |
| `SetBombTeam` | 更改可以拾取 Bomb 的隊伍。 | bomb: Bomb, team: Team | 無 | `mod.SetBombTeam(mod.GetBomb(1), mod.GetTeam(2));` |
| `SetBombWorldIconGlobalVisibility` | 設定 Bomb 攜帶者 WorldIcon 是對所有隊伍可見，還是只對進攻方可見。 | bomb: Bomb, enabled: boolean | 無 | `mod.SetBombWorldIconGlobalVisibility(mod.GetBomb(1), false);` |
| `GetRingOfFire` | 從編號或目標取得 RingOfFire。 | number: number | `RingOfFire` | `const value = mod.GetRingOfFire(...);` |
| `AllCapturePoints` | 以陣列形式取得遊戲中存在的所有 CapturePoint。 | 無 | `Array` | `const value = mod.AllCapturePoints(...);` |
| `GetCapturePoint` | 從數字或目標取得 CapturePoint。 | id: number | `CapturePoint` | `const value = mod.GetCapturePoint(...);` |
| `GetCaptureProgress` | 取得指定 CapturePoint 的佔領進度，值為 0 到 1 之間的數值。捕獲點：捕獲點 | capturePoint: CapturePoint | `number` | `const value = mod.GetCaptureProgress(...);` |
| `GetCurrentOwnerTeam` | 取得目前擁有指定 CapturePoint 的隊伍。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetCurrentOwnerTeam(...);` |
| `GetOwnerProgressTeam` | 取得目前試圖佔領指定佔領點的隊伍。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetOwnerProgressTeam(...);` |
| `GetPlayersOnPoint` | 取得指定CapturePoint範圍內的玩家陣列。 | capturePoint: CapturePoint | `Array` | `const value = mod.GetPlayersOnPoint(...);` |
| `GetPreviousOwnerTeam` | 取得指定 CapturePoint 的先前所有隊伍。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetPreviousOwnerTeam(...);` |
| `GetHQ` | 從編號或目標取得HQ。 | number: number | `HQ` | `const value = mod.GetHQ(...);` |
| `GetBomb` | 從編號或目標取得 Bomb。 | number: number | `Bomb` | `const bomb = mod.GetBomb(1);` |
| `GetMCOM` | 從編號或目標取得 MCOM。 | number: number | `MCOM` | `const value = mod.GetMCOM(...);` |
| `GetSector` | 從數字或目標取得磁區。 | number: number | `Sector` | `const value = mod.GetSector(...);` |

## 配置物 / 空間物件

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `EnableAreaTrigger` | 啟用或停用AreaTrigger。停用時，不會觸發對應的事件。 | areaTrigger: AreaTrigger, enable: boolean | 無 | `mod.EnableAreaTrigger(...);` |
| `EnableInteractPoint` | 啟用或停用 InteractPoint。 | interactPoint: InteractPoint, enable: boolean | 無 | `mod.EnableInteractPoint(mod.GetInteractPoint(0), false);` |
| `EnableSpatialObject` | 啟用或停用 SpatialObject。 | spatialObject: SpatialObject, enable: boolean | 無 | `mod.EnableSpatialObject(...);` |
| `RayCast` | 請求兩點之間的直線判斷。在 `OnRayCastHit` / `OnRayCastMissed` 接收結果。 2 種重載。 | player: Player, start: Vector, stop: Vector | 無 | `mod.RayCast(eventPlayer, start, stop);` |
| `SetVL7CloudEffects` | 單獨啟用或停用 VL7Cloud 的螢幕效果、士兵效果和 VFX。 | vl7Cloud: VL7Cloud, screenEffect: boolean, soldierEffect: boolean, visualEffect: boolean | 無 | `mod.SetVL7CloudEffects(...);` |
| `UnspawnObject` | 清除使用 `SpawnObject` 建立的物件。 | obj: mod.Object | 無 | `mod.UnspawnObject(...);` |
| `MoveObject` | 透過位置差異和旋轉差異（如果需要）移動指定物件。 2 種重載。 | object: mod.Object, positionDelta: Vector | 無 | `mod.MoveObject(...);` |
| `MoveObjectOverTime` | 隨著時間的推移，將指定物件移動位置/旋轉差。你也可以指定循環和反轉。 | object: mod.Object, positionDelta: Vector, rotationDelta: Vector, timeInSeconds: number, shouldLoop: boolean, shouldReverse: boolean | 無 | `mod.MoveObjectOverTime(...);` |
| `OrbitObjectOverTime` | 隨著時間的推移圍繞變換旋轉指定物件。 2 種重載。 | object: mod.Object, orbitTransform: Transform, timeInSeconds: number, radius: number, shouldLoop: boolean, shouldReverse: boolean, clockwise: boolean | 無 | `mod.OrbitObjectOverTime(...);` |
| `RotateObject` | 將指定物件旋轉歐拉角差。 | object: mod.Object, rotationDelta: Vector | 無 | `mod.RotateObject(...);` |
| `SetObjectTransform` | 設定指定物件的Transform。 | object: mod.Object, transform: Transform | 無 | `mod.SetObjectTransform(...);` |
| `SetObjectTransformOverTime` | 隨著時間的推移，將指定的物件移動並旋轉到指定的變換。 | object: mod.Object, transform: Transform, timeInSeconds: number, shouldLoop: boolean, shouldReverse: boolean | 無 | `mod.SetObjectTransformOverTime(...);` |
| `StopActiveMovementForObject` | 停止指定物件上正在進行的時間移動。 | object: mod.Object | 無 | `mod.StopActiveMovementForObject(...);` |
| `GetAreaTrigger` | 從數字或目標取得AreaTrigger。 | areaTriggerNumber: number | `AreaTrigger` | `const area = mod.GetAreaTrigger(0);` |
| `GetInteractPoint` | 從數字或目標取得 InteractPoint。 | interactPointNumber: number | `InteractPoint` | `const point = mod.GetInteractPoint(0);` |
| `GetSpatialObject` | 從數字或目標取得 SpatialObject。 | spatialObjectNumber: number | `SpatialObject` | `const value = mod.GetSpatialObject(...);` |
| `SpawnObject` | 在指定座標處生成執行時 Prefab。不受支援的物件的回傳值可能為 `-1`。2 種重載。 | prefabEnum: `RuntimeSpawn_Common` 和包含 `RuntimeSpawn_Plaza` 的各地圖 RuntimeSpawn, position: Vector, rotation: Vector, scale: Vector | `Any` | `const obj = mod.SpawnObject(prefab, pos, rot, scale);` |
| `GetObjectPosition` | 以 Vector 形式取得指定物件目前的位置。 | object: mod.Object | `Vector` | `const value = mod.GetObjectPosition(...);` |
| `GetObjectRotation` | 以Vector形式取得指定物件的目前旋轉。 | object: mod.Object | `Vector` | `const value = mod.GetObjectRotation(...);` |
| `GetObjectTransform` | 取得包含指定物件的位置和旋轉的 Transform。 | object: mod.Object | `Transform` | `const value = mod.GetObjectTransform(...);` |
| `GetTransformPosition` | 從變換中擷取位置Vector。 | transform: Transform | `Vector` | `const value = mod.GetTransformPosition(...);` |
| `GetTransformRotation` | 從變換中擷取旋轉Vector。 | transform: Transform | `Vector` | `const value = mod.GetTransformRotation(...);` |

## 戰利品 / 補給物資

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `SpawnLoot` | 在 LootSpawner 中產生彈藥、武器、Gadget和盔甲。 4 種重載。 | lootSpawner: LootSpawner, ammo: AmmoTypes | 無 | `mod.SpawnLoot(...);` |
| `UnspawnAllLoot` | 刪除世界上所有現有的路線。 | 無 | 無 | `mod.UnspawnAllLoot(...);` |
| `GetLootSpawner` | 從編號或目標取得 LootSpawner。 | number: number | `LootSpawner` | `const value = mod.GetLootSpawner(...);` |

## 體力 / 傷害 / 狀態

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `DealDamage` | 對指定玩家或車輛造成損壞。如有必要，你也可以指定造成傷害的玩家。 3 種重載。 | player: Player, damageAmount: number | 無 | `mod.DealDamage(...);` |
| `ForceRevive` | 強行復活倒地的玩家。 | player: Player | 無 | `mod.ForceRevive(...);` |
| `Heal` | 治癒或修復指定的玩家或車輛。如有需要，你也可以指定治療師。 3 種重載。 | player: Player, healAmount: number | 無 | `mod.Heal(...);` |
| `Kill` | 立即殺死指定的玩家或車輛。玩家跳過狀態。 2 種重載。 | player: Player | 無 | `mod.Kill(...);` |
| `SetSoldierEffect` | 啟用或停用指定玩家的士兵效果。 | player: Player, soldierEffects: SoldierEffects, isEnabled: boolean | 無 | `mod.SetSoldierEffect(...);` |
| `SpotTarget` | 發現指定的玩家。你可以指定顯示時間、地點狀態和地點。 5 種重載。 | targetplayer: Player, duration: number, spotStatus: SpotStatus | 無 | `mod.SpotTarget(...);` |
| `SetPlayerIncomingDamageFactor` | 設定指定玩家受到的傷害倍數。值四捨五入到最接近的 5%，並限制在 0 到 200%。 | player: Player, amount: number | 無 | `mod.SetPlayerIncomingDamageFactor(...);` |
| `ForceManDown` | 放下指定的玩家。如果停用了 down，則不適用。 | player: Player | 無 | `mod.ForceManDown(...);` |
| `SetPlayerMaxHealth` | 設定指定玩家的最大生命值，範圍為1到500。最大體力倍數也會反映出來。 | player: Player, maxHealth: number | 無 | `mod.SetPlayerMaxHealth(...);` |
| `SetPlayerMovementSpeedMultiplier` | 設定指定玩家的移動速度倍數。 | player: Player, multiplier: number | 無 | `mod.SetPlayerMovementSpeedMultiplier(...);` |
| `SkipManDown` | 設定指定玩家死亡時是否不經過down狀態返回部署介面。 | player: Player, skipManDown: boolean | 無 | `mod.SkipManDown(...);` |

## 裝備 / 輸入 / 玩家操作

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `Teleport` | 將指定的玩家或車輛移動到具有方向的有效座標。以弧度指定方向。 2 種重載。 | player: Player, destination: Vector, orientation: number | 無 | `mod.Teleport(eventPlayer, destination, 0);` |
| `EnableAllInputRestrictions` | 切換指定玩家的移動、拍攝、視點動作等所有輸入限制。 | player: Player, restrictInput: boolean | 無 | `mod.EnableAllInputRestrictions(...);` |
| `EnableInputRestriction` | 限製或取消特定玩家的特定輸入。 | player: Player, inputRestriction: RestrictedInputs, restrictInput: boolean | 無 | `mod.EnableInputRestriction(...);` |
| `AddAttachmentToWeaponPackage` | 將附件新增至 WeaponPackage。現有的同類型附件將被替換。 | attachment: WeaponAttachments, weaponPackage: WeaponPackage | 無 | `mod.AddAttachmentToWeaponPackage(...);` |
| `AddEquipment` | 將武器、Gadget和盔甲加入玩家的裝備中。 7種重載。 | player: Player, weapon: Weapons | 無 | `mod.AddEquipment(...);` |
| `ForceSwitchInventory` | 強制指定玩家切換到指定的物品欄位置。 | player: Player, inventorySlot: InventorySlots | 無 | `mod.ForceSwitchInventory(...);` |
| `RemoveEquipment` | 從玩家的裝備中移除指定的插槽、武器或Gadget。 3 種重載。 | player: Player, inventorySlot: InventorySlots | 無 | `mod.RemoveEquipment(...);` |
| `SetInventoryAmmo` | 設定指定庫存槽的子彈number。 | player: Player, inventorySlots: InventorySlots, ammo: number | 無 | `mod.SetInventoryAmmo(...);` |
| `SetInventoryMagazineAmmo` | 設定指定庫存插槽的彈匣中的子彈number。 | player: Player, inventorySlots: InventorySlots, magAmmo: number | 無 | `mod.SetInventoryMagazineAmmo(...);` |
| `Resupply` | 提供玩家指定的供給類型。 | player: Player, ressuplyType: ResupplyTypes | 無 | `mod.Resupply(...);` |
| `CreateNewWeaponPackage` | 建立一個新的武器包。 | 無 | `WeaponPackage` | `const value = mod.CreateNewWeaponPackage(...);` |
| `EventDamageTypeCompare` | 判斷事件中傳入的DamageType是否與指定的損壞類型相符。 | damageType: DamageType, playerDamageTypes: PlayerDamageTypes | `boolean` | `const value = mod.EventDamageTypeCompare(...);` |
| `EventDeathTypeCompare` | 判斷事件中傳入的DeathType是否與指定的死亡類型相符。 | deathType: DeathType, playerDeathTypes: PlayerDeathTypes | `boolean` | `const value = mod.EventDeathTypeCompare(...);` |
| `EventWeaponCompare` | 判斷事件中給予的武器和小玩意是否與指定裝備相符。 2 種重載。 | eventWeapon: WeaponUnlock, weapon: Weapons | `boolean` | `if (mod.EventWeaponCompare(eventWeaponUnlock, mod.Weapons.AK24)) {}` |
| `GetInventoryAmmo` | 取得指定玩家指定插槽內的子彈number。 | player: Player, inventorySlots: InventorySlots | `number` | `const value = mod.GetInventoryAmmo(...);` |
| `GetInventoryMagazineAmmo` | 取得指定玩家指定插槽彈匣內的子彈number。 | player: Player, inventorySlots: InventorySlots | `number` | `const value = mod.GetInventoryMagazineAmmo(...);` |
| `GetSoldierState` | 取得指定玩家的士兵狀態，為數值、boolean或Vector。 3 種重載。 | player: Player, soldierStateNumber: SoldierStateNumber | `number` | `const value = mod.GetSoldierState(...);` |
| `HasEquipment` | 決定指定玩家是否擁有指定的武器或Gadget。 2 種重載。 | player: Player, weapon: Weapons | `boolean` | `if (mod.HasEquipment(eventPlayer, mod.Weapons.AK24)) {}` |
| `IsInventorySlotActive` | 決定指定玩家是否正在使用指定的物品欄位。 | player: Player, inventorySlots: InventorySlots | `boolean` | `const value = mod.IsInventorySlotActive(...);` |
| `IsSoldierClass` | 判斷指定玩家是否為指定軍種。 | player: Player, soldierClass: SoldierClass | `boolean` | `const value = mod.IsSoldierClass(...);` |

## 車輛

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `ForceVehicleSpawnerSpawn` | 從 VehicleSpawner 強制產生目前配置的車輛。 | vehicleSpawner: VehicleSpawner | 無 | `mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(0));` |
| `SetAllVehiclesAllowedInSurroundingArea` | 設定是否允許週邊所有車輛通行。 | allowed: boolean | 無 | `mod.SetAllVehiclesAllowedInSurroundingArea(...);` |
| `SetMaxVehicleHeightLimitScale` | 設定車輛引擎失去向上推力的高度限制乘數。 | heightScale: number | 無 | `mod.SetMaxVehicleHeightLimitScale(...);` |
| `SetVehicleAllowedInSurroundingArea` | 設定是否允許指定車輛在周邊區域行駛。 | vehicle: VehicleList, allowed: boolean | 無 | `mod.SetVehicleAllowedInSurroundingArea(...);` |
| `SetVehicleCategoryAllowedInSurroundingArea` | 設定是否允許指定車輛類別進入周邊區域。 | vehicleCategory: VehicleCategories, allowed: boolean | 無 | `mod.SetVehicleCategoryAllowedInSurroundingArea(...);` |
| `SetVehicleSpawnerAbandonVehiclesOutOfCombatArea` | 設定是否摧毀留在戰鬥區域外的車輛。 | vehicleSpawner: VehicleSpawner, enabled: boolean | 無 | `mod.SetVehicleSpawnerAbandonVehiclesOutOfCombatArea(...);` |
| `SetVehicleSpawnerApplyDamageToAbandonVehicle` | 設定是否會對廢棄車輛施加傷害。 | vehicleSpawner: VehicleSpawner, enabled: boolean | 無 | `mod.SetVehicleSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetVehicleSpawnerAutoSpawn` | 啟用或停用 VehicleSpawner 的自動重生。 | vehicleSpawner: VehicleSpawner, enabled: boolean | 無 | `mod.SetVehicleSpawnerAutoSpawn(...);` |
| `SetVehicleSpawnerKeepAliveAbandonRadius` | 設定最近玩家的距離，達到該距離車輛將被視為廢棄。 | vehicleSpawner: VehicleSpawner, keepAliveAbandonedRadius: number | 無 | `mod.SetVehicleSpawnerKeepAliveAbandonRadius(...);` |
| `SetVehicleSpawnerKeepAliveSpawnerRadius` | 設定車輛被視為遠離生成器的距離。 | vehicleSpawner: VehicleSpawner, keepAliveSpawnerRadius: number | 無 | `mod.SetVehicleSpawnerKeepAliveSpawnerRadius(...);` |
| `SetVehicleSpawnerRespawnTime` | 設定車輛被摧毀後直到自動重生的秒數。 | vehicleSpawner: VehicleSpawner, respawnTime: number | 無 | `mod.SetVehicleSpawnerRespawnTime(...);` |
| `SetVehicleSpawnerTimeUntilAbandon` | 設定車輛在被視為廢棄之前保持未使用狀態的時間。 | vehicleSpawner: VehicleSpawner, timeUntilAbandon: number | 無 | `mod.SetVehicleSpawnerTimeUntilAbandon(...);` |
| `SetVehicleSpawnerVehicleType` | 設定從 VehicleSpawner 發出的車輛類型。 | vehicleSpawner: VehicleSpawner, vehicleType: VehicleList | 無 | `mod.SetVehicleSpawnerVehicleType(...);` |
| `SetVehicleMaxHealthMultiplier` | 將指定車輛的最大耐久性乘數設定為大於 0 且小於或等於 4 的值。 | vehicle: Vehicle, maxHealthMultiplier: number | 無 | `mod.SetVehicleMaxHealthMultiplier(...);` |
| `ForcePlayerExitVehicle` | 將指定玩家強行從車輛移走。 | player: Player, vehicle: Vehicle | 無 | `mod.ForcePlayerExitVehicle(...);` |
| `ForcePlayerToSeat` | 強制指定玩家坐在指定車輛座位上。 | player: Player, vehicle: Vehicle, seatNumber: number | 無 | `mod.ForcePlayerToSeat(...);` |
| `GetVehicleSpawner` | 從數字或目標取得VehicleSpawner。 | number: number | `VehicleSpawner` | `const value = mod.GetVehicleSpawner(...);` |
| `AllVehicles` | 將遊戲中的所有車輛作為陣列取得。 | 無 | `Array` | `const vehicles = mod.AllVehicles();` |
| `CompareVehicleName` | 判斷指定的車輛是否與指定的VehicleList類型相同。 | vehicle: Vehicle, vehicleList: VehicleList | `boolean` | `const value = mod.CompareVehicleName(...);` |
| `GetVehicleFromPlayer` | 取得指定玩家所搭乘的車輛。 | player: Player | `Vehicle` | `const vehicle = mod.GetVehicleFromPlayer(eventPlayer);` |
| `GetVehicleSeatCount` | 取得指定車輛的座位數。 | vehicle: Vehicle | `number` | `const value = mod.GetVehicleSeatCount(...);` |
| `GetVehicleState` | 取得指定車輛的狀態Vector。 | vehicle: Vehicle, vehicleStateVector: VehicleStateVector | `Vector` | `const value = mod.GetVehicleState(...);` |
| `GetVehicleTeam` | 取得指定車輛所屬的車隊。無人車輛將被視為中立車輛。 | vehicle: Vehicle | `Team` | `const value = mod.GetVehicleTeam(...);` |
| `IsVehicleOccupied` | 判斷玩家是否搭乘指定車輛。 | vehicle: Vehicle | `boolean` | `const value = mod.IsVehicleOccupied(...);` |
| `IsVehicleSeatOccupied` | 判斷指定車輛的預約座位是否正在使用。 | vehicle: Vehicle, number: number | `boolean` | `const value = mod.IsVehicleSeatOccupied(...);` |
| `GetAllPlayersInVehicle` | 取得指定車輛中的所有玩家作為陣列。 | vehicle: Vehicle | `Array` | `const value = mod.GetAllPlayersInVehicle(...);` |
| `GetPlayerFromVehicleSeat` | 讓玩家坐在指定車輛的指定座位上。如果座位是空的，則成為無效玩家。 | vehicle: Vehicle, number: number | `Player` | `const value = mod.GetPlayerFromVehicleSeat(...);` |
| `GetPlayerVehicleSeat` | 取得指定玩家的車輛座位號碼。如果在車外，則為 -1。 | player: Player | `number` | `const value = mod.GetPlayerVehicleSeat(...);` |

## 物理衝量

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `ApplyAreaImpulseAndDamage` | 對指定中心和半徑內的載具套用範圍衝量和可選傷害。支援帶方向覆寫和不帶方向覆寫的 2 種重載。 | center: Vector, radius: number, impulseStrength: number, damageAmount: number | 無 | `mod.ApplyAreaImpulseAndDamage(center, 5, 1000, 0);` |
| `ApplyImpulse` | 對單台載具按世界位置、方向和強度施加衝量。 | vehicle: Vehicle, worldPosition: Vector, direction: Vector, magnitude: number | 無 | `mod.ApplyImpulse(vehicle, pos, mod.ForwardVector(), 500);` |

## WorldIcon

| 函式 | 功能 / 目的 | 主要參數 | 回傳值 | 使用範例 |
| --- | --- | --- | --- | --- |
| `EnableWorldIconImage` | 啟用或停用 WorldIcon 影像顯示。 | worldIcon: WorldIcon, enableImage: boolean | 無 | `mod.EnableWorldIconImage(...);` |
| `EnableWorldIconText` | 啟用或停用 WorldIcon 上的文字顯示。 | worldIcon: WorldIcon, enableText: boolean | 無 | `mod.EnableWorldIconText(...);` |
| `RemoveUIIcon` | 刪除附加到該物件的 UI 圖示 Widget。你也可以指定目標玩家或隊伍。 2 種重載。 | objectWithIcon: mod.Object | 無 | `mod.RemoveUIIcon(...);` |
| `SetWorldIconColor` | 更改世界圖示的顏色。 | worldIcon: WorldIcon, newColor: Vector | 無 | `mod.SetWorldIconColor(...);` |
| `SetWorldIconImage` | 更改 WorldIcon 的圖片類型。 | worldIcon: WorldIcon, newImage: WorldIconImages | 無 | `mod.SetWorldIconImage(...);` |
| `SetWorldIconOwner` | 限制 WorldIcon 僅對特定隊伍或玩家可見。 2 種重載。 | worldIcon: WorldIcon, newTeamOwner: Team | 無 | `mod.SetWorldIconOwner(...);` |
| `SetWorldIconPosition` | 更改 WorldIcon 的顯示位置。 | worldIcon: WorldIcon, newPosition: Vector | 無 | `mod.SetWorldIconPosition(...);` |
| `SetWorldIconText` | 更改 WorldIcon 上的文字。顯示文字在 `Strings.json` 註冊，然後在 `mod.stringkeys` 引用。 | worldIcon: WorldIcon, newText: Message | 無 | `mod.SetWorldIconText(icon, mod.Message(mod.stringkeys.pointA));` |
| `GetWorldIcon` | 從數字或目標取得 WorldIcon。 | worldIconNumber: number | `WorldIcon` | `const icon = mod.GetWorldIcon(0);` |

# 接下來閱讀的附錄

UI、通知、玩家引用、陣列、ObjId、數字、類型和最小範本分為以下「附錄 A-3：動作/值取得清單（UI/引用/值）」。
