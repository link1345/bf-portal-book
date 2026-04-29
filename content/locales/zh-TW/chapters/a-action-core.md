---
title: "附錄A-2：動作/值獲取清單（基本操作）"
free: true
---

# 動作/價值獲取列表

這裡，從 `mod.` 呼叫的函數是依照用途排列的。有些名稱與 Portal 的區塊名稱類似，但 TypeScript 有嚴格的類型，因此您需要傳遞 `Player`、`Team`、`Vector`、`Message`、`Vector`、`Message`、`UIWidget` 等類型。

具有相同名稱和多個參數模式的函數聚集在一行上，重載的數量寫在函數/用途列中。要獲得完整的簽名，請在 `index.d.ts` 中搜尋函數名稱。

## 變數/等待/子例程

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `Wait` | `Wait` |等待指定的秒數。由於它是一個非同步過程，因此將其與 `await` 結合。 | n：數字| `Promise<void>` | `await mod.Wait(1);` | `await mod.Wait(1);` |
| `SetVariable` | `SetVariable` |將值儲存到指定變數。階段、分數和標誌管理的基礎知識。 |變數：變量，值：任意 |無 | `mod.SetVariable(mod.GlobalVariable(0), 1);` | `mod.SetVariable(mod.GlobalVariable(0), 1);` |
| `SetVariableAtIndex` | `SetVariableAtIndex` |初始化或取得Variable中的陣列並將值儲存到指定索引。 | arrayVariable：變量，arrayIndex：數字，值：任意 |無 | `mod.SetVariableAtIndex(mod.GlobalVariable(1), 0, eventPlayer);` | `mod.SetVariableAtIndex(mod.GlobalVariable(1), 0, eventPlayer);` |
| `ChaseVariableAtRate` | `ChaseVariableAtRate` |每秒鐘將變數的值往極限值移動指定的量。 |變數：變量，限制：數字，deltaPerSecond：數字 |無 | `mod.ChaseVariableAtRate(...);` | `mod.ChaseVariableAtRate(...);` |
| `ChaseVariableOverTime` | `ChaseVariableOverTime` |在指定的秒數內使變數的值接近極限值。 |變數：變量，限制：數字，durationSeconds：數字 |無 | `mod.ChaseVariableOverTime(...);` | `mod.ChaseVariableOverTime(...);` |
| `StopChasingVariable` | `StopChasingVariable` |停止正在進行的變數追蹤並停止在目前值。 |變數：變數|無 | `mod.StopChasingVariable(...);` | `mod.StopChasingVariable(...);` |
| `GetArgument` | `GetArgument` |按編號取得子程式參數。 | subroutineArgIndex: 數字 | `Any` | `Any` | `const value = mod.GetArgument(...);` |
| `GetVariable` | `GetVariable` |取得儲存在變數中的目前值。 |變數：變數| `Any` | `Any` | `const phase = mod.GetVariable(mod.GlobalVariable(0));` |
| `GlobalVariable` | `GlobalVariable` |取得指定編號的全域變數。 |變數索引：數字 | `Variable` | `Variable` | `const phase = mod.GlobalVariable(0);` |
| `ObjectVariable` | `ObjectVariable` |取得與指定物件關聯的變數。 |擁有者物件：mod.Object，變數索引：數字 | `Variable` | `Variable` | `const flag = mod.ObjectVariable(eventPlayer, 0);` |

## 人工智慧控制

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `AIBattlefieldBehavior` | `AIBattlefieldBehavior` |讓AI士兵自主行動，讓他們完成目標並向敵人射擊。僅供AI玩家使用。 |玩家： 玩家 |無 | `mod.AIBattlefieldBehavior(...);` | `mod.AIBattlefieldBehavior(...);` |
| `AIDefendPositionBehavior` | `AIDefendPositionBehavior` |讓人工智慧士兵保衛指定位置周圍的區域。僅供AI玩家使用。 |玩家：玩家，防守位置：向量，minDistance：數字，maxDistance：數字 |無 | `mod.AIDefendPositionBehavior(...);` | `mod.AIDefendPositionBehavior(...);` |
| `AIIdleBehavior` | `AIIdleBehavior` |將AI士兵目前位置設定為待命點。僅供AI玩家使用。 |玩家： 玩家 |無 | `mod.AIIdleBehavior(...);` | `mod.AIIdleBehavior(...);` |
| `AILOSMoveToBehavior` | `AILOSMoveToBehavior` |將AI士兵移到指定位置，同時保持視線。僅供AI玩家使用。 | 球員： 球員，位置： 向量 |無 | `mod.AILOSMoveToBehavior(...);` | `mod.AILOSMoveToBehavior(...);` |
| `AIMoveToBehavior` | `AIMoveToBehavior` |給AI士兵一個目的地，移動到指定的座標。僅供AI玩家使用。 | 球員： 球員，位置： 向量 |無 | `mod.AIMoveToBehavior(...);` | `mod.AIMoveToBehavior(...);` |
| `AIParachuteBehavior` | `AIParachuteBehavior` |讓AI士兵做一個跳傘動作。僅供AI玩家使用。 |玩家： 玩家 |無 | `mod.AIParachuteBehavior(...);` | `mod.AIParachuteBehavior(...);` |
| `AIValidatedMoveToBehavior` | `AIValidatedMoveToBehavior` |將 AI 士兵移至導覽網格上的有效鄰近位置。僅供AI玩家使用。 | 球員： 球員，位置： 向量 |無 | `mod.AIValidatedMoveToBehavior(...);` | `mod.AIValidatedMoveToBehavior(...);` |
| `AIWaypointIdleBehavior` | `AIWaypointIdleBehavior` |讓人工智慧士兵巡邏航點路徑。僅供AI玩家使用。 |玩家：玩家，waypointPath：WaypointPath |無 | `mod.AIWaypointIdleBehavior(...);` | `mod.AIWaypointIdleBehavior(...);` |
| `SetAiInput` | `SetAiInput` |在一段時間內向 AI 士兵發送指定的輸入。最多可同時指定 3 個輸入。 |玩家：玩家，輸入：AiInput，持續時間：數字 |無 | `mod.SetAiInput(...);` | `mod.SetAiInput(...);` |
| `AISetUnspawnOnDead` | `AISetUnspawnOnDead` |設定從Spawner派出的AI士兵死亡後是否離開。 |產生器：生成器，enableUnspawnOnDead：布林值 |無 | `mod.AISetUnspawnOnDead(...);` | `mod.AISetUnspawnOnDead(...);` |
| `SetUnspawnDelayInSeconds` | `SetUnspawnDelayInSeconds` |設定從Spawner發送的AI士兵死亡後退出的秒數。 |產生器：產生器，延遲：數量 |無 | `mod.SetUnspawnDelayInSeconds(...);` | `mod.SetUnspawnDelayInSeconds(...);` |
| `SpawnAIFromAISpawner` | `SpawnAIFromAISpawner` |從指定的 AI 產生器產生一名 AI 士兵。 8種霸主。 |產生器： 生成器 | 無 | `mod.SpawnAIFromAISpawner(mod.GetSpawner(0));` | `mod.SpawnAIFromAISpawner(mod.GetSpawner(0));` |
| `UnspawnAllAIsFromAISpawner` | `UnspawnAllAIsFromAISpawner` |移除所有指定 AI 生成器派出的 AI 士兵。 |產生器： 生成器 | 無 | `mod.UnspawnAllAIsFromAISpawner(...);` | `mod.UnspawnAllAIsFromAISpawner(...);` |
| `AIEnableShooting` | `AIEnableShooting` |切換AI士兵是否可以射擊。僅供AI玩家使用。 2種類型的霸主。 |玩家： 玩家 |無 | `mod.AIEnableShooting(...);` | `mod.AIEnableShooting(...);` |
| `AIEnableTargeting` | `AIEnableTargeting` |切換AI士兵的敵人搜尋/目標識別。如果禁用它，它將不再觸發。 2種類型的霸主。 |玩家： 玩家 |無 | `mod.AIEnableTargeting(...);` | `mod.AIEnableTargeting(...);` |
| `AIForceFire` | `AIForceFire` |強制人工智慧士兵在指定時間內使用手持武器和小工具。 |玩家：玩家，開火持續時間：數字 |無 | `mod.AIForceFire(...);` | `mod.AIForceFire(...);` |
| `AIGadgetSettings` | `AIGadgetSettings` |調整人工智慧士兵的小工具使用條件、冷卻時間和精確度修正。 |玩家：玩家，applyUsageCriteria：布林值，applyCoolDownAfterUse：布林值，applyInaccuracy：布林值 |無 | `mod.AIGadgetSettings(...);` | `mod.AIGadgetSettings(...);` |
| `AISetFocusPoint` | `AISetFocusPoint` |設定人工智慧士兵的注視點，並在必要時讓它攻擊那裡。 |玩家：玩家，點：向量，isTarget：布林值 |無 | `mod.AISetFocusPoint(...);` | `mod.AISetFocusPoint(...);` |
| `AISetMoveSpeed` | `AISetMoveSpeed` |設定AI士兵的移動行為的速度。 |玩家：玩家，移動速度：移動速度 |無 | `mod.AISetMoveSpeed(...);` | `mod.AISetMoveSpeed(...);` |
| `AISetStance` | `AISetStance` |設定AI士兵的姿勢。 |球員：球員，位置：立場|無 | `mod.AISetStance(...);` | `mod.AISetStance(...);` |
| `AISetTarget` | `AISetTarget` |設定或清除人工智慧士兵的當前目標。 2種類型的霸主。 | aiPlayer：玩家，targetPlayer：玩家 |無 | `mod.AISetTarget(...);` | `mod.AISetTarget(...);` |
| `AIStartUsingGadget` | `AIStartUsingGadget` |讓人工智慧士兵在指定位置或指定玩家使用特定小工具。 2種類型的霸主。 |玩家：玩家，小工具：小工具，targetPos：向量 |無 | `mod.AIStartUsingGadget(...);` | `mod.AIStartUsingGadget(...);` |
| `AIStopUsingGadget` | `AIStopUsingGadget` |取消給AI士兵的小工具使用說明。 |玩家： 玩家 |無 | `mod.AIStopUsingGadget(...);` | `mod.AIStopUsingGadget(...);` |
| `SetAIToHumanDamageModifier` | `SetAIToHumanDamageModifier` |設定人工智慧給予人類玩家的傷害倍數。 |傷害倍數: 數字 |無 | `mod.SetAIToHumanDamageModifier(...);` | `mod.SetAIToHumanDamageModifier(...);` |

## 聲音/音樂/旁白

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `LoadMusic` | `LoadMusic` |載入音樂包並使其可在 `PlayMusic` 上播放。 |音樂包： 音樂包 | 無 | `mod.LoadMusic(...);` |
| `PlayMusic` | `PlayMusic` |播放音樂活動。您可以針對整個球隊、小隊或球員。 4種類型的霸主。 |音樂活動： 音樂活動 | 無 | `mod.PlayMusic(...);` | `mod.PlayMusic(...);` |
| `PlaySound` | `PlaySound` |播放音效。您可以指定目標、位置和衰減範圍。 8種霸主。 |聲音：SFX，振幅：數字，團隊：團隊 |無 | `mod.PlaySound(mod.GetSFX(0), 1);` | `mod.PlaySound(mod.GetSFX(0), 1);` |
| `PlayVO` | `PlayVO` |播放 VO 音訊事件。您可以針對整個球隊、小隊或球員。 4種類型的霸主。 |旁白：VO，事件：VoiceOverEvents2D，標誌：VoiceOverFlags |無 | `mod.PlayVO(...);` | `mod.PlayVO(...);` |
| `SetMusicParam` | `SetMusicParam` |更新載入的音樂包的參數值。 4種類型的霸主。 | musicParam：MusicParams，paramValue：數字 |無 | `mod.SetMusicParam(...);` | `mod.SetMusicParam(...);` |
| `SetSoundAmplitude` | `SetSoundAmplitude` |變更指定 SFX 的音量。您可以針對整個球隊、小隊或球員。 4種類型的霸主。 |聲音：SFX，振幅：數字，團隊：團隊 |無 | `mod.SetSoundAmplitude(...);` | `mod.SetSoundAmplitude(...);` |
| `StopSound` | `StopSound` |停止指定的 SFX。您可以針對整個球隊、小隊或球員。 4種類型的霸主。 | 聲音：SFX，團隊：Team |無 | `mod.StopSound(...);` | `mod.StopSound(...);` |
| `UnloadMusic` | `UnloadMusic` |釋放載入的音樂包。 |音樂包： 音樂包 | 無 | `mod.UnloadMusic(...);` | `mod.UnloadMusic(...);` |

## 相機/方向

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `SetCameraTypeForAll` | `SetCameraTypeForAll` |為所有玩家設定相機類型。如有必要，還需指定相機索引。 2種類型的霸主。 |相機類型： 相機 |無 | `mod.SetCameraTypeForAll(...);` | `mod.SetCameraTypeForAll(...);` |
| `SetCameraTypeForPlayer` | `SetCameraTypeForPlayer` |設定指定播放器的相機類型。如有必要，還需指定相機索引。 2種類型的霸主。 |播放器：播放器、相機類型：相機 |無 | `mod.SetCameraTypeForPlayer(...);` | `mod.SetCameraTypeForPlayer(...);` |
| `SetSpectatingFiltersForAll` | `SetSpectatingFiltersForAll` |為所有玩家設定觀看濾鏡。只能限制在小隊/團隊內。 |群組：SpectatingGroup，ownSquadOnly：布林值，ownTeamOnly：布林值 |無 | `mod.SetSpectatingFiltersForAll(...);` | `mod.SetSpectatingFiltersForAll(...);` |
| `SetSpectatingFiltersForPlayer` | `SetSpectatingFiltersForPlayer` |設定觀看指定玩家的篩選器。只能限制在小隊/團隊內。 |玩家：玩家，組：SpectatingGroup，ownSquadOnly：布林值，ownTeamOnly：布林值 |無 | `mod.SetSpectatingFiltersForPlayer(...);` | `mod.SetSpectatingFiltersForPlayer(...);` |
| `EnableScreenEffect` | `EnableScreenEffect` |啟用或停用指定播放器的畫面效果。 |播放器：播放器，screenEffect：ScreenEffects，啟用：布林值 |無 | `mod.EnableScreenEffect(...);` | `mod.EnableScreenEffect(...);` |
| `EnableVFX` | `EnableVFX` |啟用或停用指定視覺特效的顯示與操作。 | vfx：視覺特效，啟用：布林值 |無 | `mod.EnableVFX(...);` | `mod.EnableVFX(...);` |
| `MoveVFX` | `MoveVFX` |將 VFX 移到指定的座標和旋轉。一般來說，通用的運動功能也會被考慮。 | vfxID：VFX，位置：向量，旋轉：向量 |無 | `mod.MoveVFX(...);` | `mod.MoveVFX(...);` |
| `SetVFXColor` | `SetVFXColor` |改變視覺特效色彩。 | vfxID：視覺特效，顏色：向量 |無 | `mod.SetVFXColor(...);` | `mod.SetVFXColor(...);` |
| `SetVFXScale` | `SetVFXScale` |更改視覺特效的比例。 | vfxID：視覺特效，比例：數字 |無 | `mod.SetVFXScale(...);` | `mod.SetVFXScale(...);` |
| `SetVFXSpeed` | `SetVFXSpeed` |改變 VFX 的播放速度。 | vfxID：視覺特效，速度：數字 |無 | `mod.SetVFXSpeed(...);` | `mod.SetVFXSpeed(...);` |
| `GetFixedCamera` | `GetFixedCamera` |從數字或目標取得固定相機。 |數量： 數量 | `FixedCamera` | `FixedCamera` | `const value = mod.GetFixedCamera(...);` |

## 固定武器產生器

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `ForceEmplacementSpawnerSpawn` | `ForceEmplacementSpawnerSpawn` |從固定武器產生器強制產生目前設定的固定武器。 | emplacementSpawner： EmplacementSpawner |無 | `mod.ForceEmplacementSpawnerSpawn(...);` | `mod.ForceEmplacementSpawnerSpawn(...);` |
| `SetEmplacementSpawnerAbandonVehicleOutOfCombatArea` | `SetEmplacementSpawnerAbandonVehicleOutOfCombatArea` |設定是否銷毀留在戰鬥區域外的固定武器。 | emplacementSpawner： EmplacementSpawner，啟用：布林值 |無 | `mod.SetEmplacementSpawnerAbandonVehicleOutOfCombatArea(...);` | `mod.SetEmplacementSpawnerAbandonVehicleOutOfCombatArea(...);` |
| `SetEmplacementSpawnerApplyDamageToAbandonVehicle` | `SetEmplacementSpawnerApplyDamageToAbandonVehicle` |設定是否會對廢棄的固定武器施加傷害。 | emplacementSpawner： EmplacementSpawner，啟用：布林值 |無 | `mod.SetEmplacementSpawnerApplyDamageToAbandonVehicle(...);` | `mod.SetEmplacementSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetEmplacementSpawnerAutoSpawn` | `SetEmplacementSpawnerAutoSpawn` |啟用或停用固定武器產生器的自動重生。 | emplacementSpawner： EmplacementSpawner，啟用：布林值 |無 | `mod.SetEmplacementSpawnerAutoSpawn(...);` | `mod.SetEmplacementSpawnerAutoSpawn(...);` |
| `SetEmplacementSpawnerKeepAliveAbandonRadius` | `SetEmplacementSpawnerKeepAliveAbandonRadius` |設定與最近玩家的距離，固定武器將被視為廢棄。 | emplacementSpawner: EmplacementSpawner, keepAliveAbandonedRadius: 數字 |無 | `mod.SetEmplacementSpawnerKeepAliveAbandonRadius(...);` | `mod.SetEmplacementSpawnerKeepAliveAbandonRadius(...);` |
| `SetEmplacementSpawnerRespawnTime` | `SetEmplacementSpawnerRespawnTime` |設定固定武器被摧毀後自動重生的秒數。 | emplacementSpawner： EmplacementSpawner，重生時間：數字 |無 | `mod.SetEmplacementSpawnerRespawnTime(...);` | `mod.SetEmplacementSpawnerRespawnTime(...);` |
| `SetEmplacementSpawnerSpawnerRadius` | `SetEmplacementSpawnerSpawnerRadius` |設定固定武器被視為遠離生成器的距離。 | emplacementSpawner: EmplacementSpawner, keepAliveSpawnerRadius: 數字 |無 | `mod.SetEmplacementSpawnerSpawnerRadius(...);` | `mod.SetEmplacementSpawnerSpawnerRadius(...);` |
| `SetEmplacementSpawnerTimeUntilAbandon` | `SetEmplacementSpawnerTimeUntilAbandon` |設定固定武器在被遺棄之前保持不使用狀態的時間。 | `SetEmplacementSpawnerTimeUntilAbandon` | `SetEmplacementSpawnerTimeUntilAbandon` | | emplacementSpawner: EmplacementSpawner, timeUntilAbandon: 數字 |無 | `mod.SetEmplacementSpawnerTimeUntilAbandon(...);` | `mod.SetEmplacementSpawnerTimeUntilAbandon(...);` |
| `SetEmplacementSpawnerType` | `SetEmplacementSpawnerType` |設定從固定武器產生器發出的固定武器的類型。 | emplacementSpawner: EmplacementSpawner, emplacementType: StationaryEmplacements | emplacementSpawner無 | `mod.SetEmplacementSpawnerType(...);` | `mod.SetEmplacementSpawnerType(...);` |
| `GetEmplacementSpawner` | `GetEmplacementSpawner` |從數字或目標取得 EmplacementSpawner。 |數量： 數量 | `EmplacementSpawner` | `EmplacementSpawner` | `const value = mod.GetEmplacementSpawner(...);` |

## 出擊/重生

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `DeployAllPlayers` | `DeployAllPlayers` |強制部署畫面上的所有玩家出擊。 |無 |無 | `mod.DeployAllPlayers(...);` | `mod.DeployAllPlayers(...);` |
| `EnableAllPlayerDeploy` | `EnableAllPlayerDeploy` |切換是否所有玩家都可以從部署畫面進行部署。 |啟用PlayerDeploy：布林值|無 | `mod.EnableAllPlayerDeploy(...);` | `mod.EnableAllPlayerDeploy(...);` |
| `EnablePlayerDeploy` | `EnablePlayerDeploy` |切換指定玩家是否可以部署。 |玩家：玩家，部署允許：布林值 |無 | `mod.EnablePlayerDeploy(...);` | `mod.EnablePlayerDeploy(...);` |
| `SetRedeployTime` | `SetRedeployTime` |涵蓋指定玩家的重生時間，範圍為 0 到 60 秒。 |玩家： 玩家，重新部署時間： number |無 | `mod.SetRedeployTime(...);` | `mod.SetRedeployTime(...);` |
| `UndeployAllPlayers` | `UndeployAllPlayers` |將戰場上的所有玩家放回部署畫面。 |無 |無 | `mod.UndeployAllPlayers(...);` | `mod.UndeployAllPlayers(...);` |
| `UndeployPlayer` | `UndeployPlayer` |將指定玩家回到部署畫面。 |玩家： 玩家 |無 | `mod.UndeployPlayer(...);` | `mod.UndeployPlayer(...);` |
| `DeployPlayer` | `DeployPlayer` |強制指定玩家出擊。 |玩家： 玩家 |無 | `mod.DeployPlayer(...);` | `mod.DeployPlayer(...);` |
| `SetSpawnMode` | `SetSpawnMode` |設定產生模式以決定是否自動產生玩家。 |產生模式： 生成模式 |無 | `mod.SetSpawnMode(...);` | `mod.SetSpawnMode(...);` |
| `SpawnPlayerFromSpawnPoint` | `SpawnPlayerFromSpawnPoint` |從指定的 SpawnPoint 出擊指定的玩家。 2種類型的霸主。 |玩家：玩家，spawnPointId：數字 |無 | `mod.SpawnPlayerFromSpawnPoint(eventPlayer, mod.GetSpawnPoint(0));` | `mod.SpawnPlayerFromSpawnPoint(eventPlayer, mod.GetSpawnPoint(0));` |

## 遊戲進度/團隊

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `EndGameMode` | `EndGameMode` |結束遊戲模式並使指定的玩家或球隊獲勝。 0隊打平。 2種類型的霸主。 |玩家： 玩家 |無 | `mod.EndGameMode(mod.GetTeam(1));` | `mod.EndGameMode(mod.GetTeam(1));` |
| `PauseGameModeTime` | `PauseGameModeTime` |暫停或恢復遊戲模式計時器。 |暫停定時器：布林值 |無 | `mod.PauseGameModeTime(...);` | `mod.PauseGameModeTime(...);` |
| `ResetGameModeTime` | `ResetGameModeTime` |將遊戲模式時間回到起始值。 |無 |無 | `mod.ResetGameModeTime(...);` | `mod.ResetGameModeTime(...);` |
| `SetFriendlyFire` | `SetFriendlyFire` |啟用或停用友軍火力。 |啟用FriendlyFire：布林值|無 | `mod.SetFriendlyFire(...);` | `mod.SetFriendlyFire(...);` |
| `SetGameModeScore` | `SetGameModeScore` |設定指定玩家或球隊的遊戲模式分數。 2種類型的霸主。 | 團隊： 團隊，新得分： 數量 |無 | `mod.SetGameModeScore(mod.GetTeam(1), 10);` | `mod.SetGameModeScore(mod.GetTeam(1), 10);` |
| `SetGameModeTargetScore` | `SetGameModeTargetScore` |設定用於決定勝利的目標分數。 | 新分數：數字 |無 | `mod.SetGameModeTargetScore(...);` | `mod.SetGameModeTargetScore(...);` |
| `SetGameModeTimeLimit` | `SetGameModeTimeLimit` |設定遊戲模式時間限制（以秒為單位）。 | newTimeLimit: 數字 |無 | `mod.SetGameModeTimeLimit(...);` | `mod.SetGameModeTimeLimit(...);` |
| `AutoBalanceTeams` | `AutoBalanceTeams` |自動調整團隊成員數量。團隊/小隊的能力必須匹配。 |無 |無 | `mod.AutoBalanceTeams(...);` | `mod.AutoBalanceTeams(...);` |
| `DisablePlayerJoin` | `DisablePlayerJoin` |停止新加入伺服器。根據SDK註釋，沒有辦法恢復，所以使用時要小心。 |無 |無 | `mod.DisablePlayerJoin(...);` | `mod.DisablePlayerJoin(...);` |
| `SwitchTeams` | `SwitchTeams` |交換TeamA 和TeamB 的球員。兩隊必須擁有相同數量的人類和機器人。 |團隊A：團隊，團隊B：團隊|沒有 | `mod.SwitchTeams(...);` | `mod.SwitchTeams(...);` |
| `GetGameModeScore` | `GetGameModeScore` |取得指定玩家或球隊的遊戲模式分數。 2種類型的霸主。 |玩家： 玩家 | `number` | `number` | `const value = mod.GetGameModeScore(...);` |
| `GetMatchTimeElapsed` | `GetMatchTimeElapsed` |取得目前遊戲模式已經過去的秒數。 |無 | `number` | `number` | `const value = mod.GetMatchTimeElapsed(...);` |
| `GetMatchTimeRemaining` | `GetMatchTimeRemaining` |取得目前遊戲模式剩餘的秒數。 |無 | `number` | `number` | `const value = mod.GetMatchTimeRemaining(...);` |
| `GetRoundTime` | `GetRoundTime` |取得遊戲模式中設定的時間限制（以秒為單位）。 |無 | `number` | `number` | `const value = mod.GetRoundTime(...);` |
| `GetTargetScore` | `GetTargetScore` |獲得獲勝所需的目標分數。 |無 | `number` | `number` | `const value = mod.GetTargetScore(...);` |

## 目標/遊戲模式對象

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `RingOfFireStart` | `RingOfFireStart` |通知RingOfFire開始縮小。 | 火環：火環 |無 | `mod.RingOfFireStart(...);` | `mod.RingOfFireStart(...);` |
| `SetHQTeam` | `SetHQTeam` |設定總部所屬隊伍。 |總部：總部，團隊 ID：團隊 |無 | `mod.SetHQTeam(...);` | `mod.SetHQTeam(...);` |
| `SetRingOfFireDamageAmount` | `SetRingOfFireDamageAmount` |設定對陷入火環的玩家造成的傷害量。 | ringOfFireId：RingOfFire，ringOfFireDamageAmount：數字 |無 | `mod.SetRingOfFireDamageAmount(...);` | `mod.SetRingOfFireDamageAmount(...);` |
| `SetRingOfFireStableTime` | `SetRingOfFireStableTime` |設定 RingOfFire 在縮小之前保持穩定的時間。 | ringOfFireId：RingOfFire，ringOfFireStableTime：數字 |無 | `mod.SetRingOfFireStableTime(...);` | `mod.SetRingOfFireStableTime(...);` |
| `EnableCapturePointDeploying` | `EnableCapturePointDeploying` |切換 CapturePoint 所屬團隊是否可以從那裡部署。 | capturePoint：CapturePoint，enableDeploying：布林值|無 | `mod.EnableCapturePointDeploying(...);` | `mod.EnableCapturePointDeploying(...);` |
| `SetCapturePointCapturingTime` | `SetCapturePointCapturingTime` |設定佔用CapturePoint 所需的時間。 | capturePoint：捕獲點， captureTime：數字 |無 | `mod.SetCapturePointCapturingTime(...);` | `mod.SetCapturePointCapturingTime(...);` |
| `SetCapturePointNeutralizationTime` | `SetCapturePointNeutralizationTime` |設定中和 CapturePoint 所需的時間。 |捕獲點：捕獲點，中和時間：數字|無 | `mod.SetCapturePointNeutralizationTime(...);` | `mod.SetCapturePointNeutralizationTime(...);` |
| `SetCapturePointOwner` | `SetCapturePointOwner` |更改控制 CapturePoint 的團隊。 | capturePoint：CapturePoint，團隊：團隊 |無 | `mod.SetCapturePointOwner(...);` | `mod.SetCapturePointOwner(...);` |
| `SetMaxCaptureMultiplier` | `SetMaxCaptureMultiplier` |設定CapturePoint佔領速度倍增的上限。 | capturePoint：捕獲點，乘數：數字 |無 | `mod.SetMaxCaptureMultiplier(...);` | `mod.SetMaxCaptureMultiplier(...);` |
| `EnableHQ` | `EnableHQ` |啟用或停用總部。 | hq：總部，啟用：布林值 |無 | `mod.EnableHQ(...);` | `mod.EnableHQ(...);` |
| `EnableGameModeObjective` | `EnableGameModeObjective` |啟用或停用諸如 CapturePoint、HQ、Sector、MCOM 等目標。目標：CapturePoint \|總部\|磁區\| MCOM，啟用：布林值 |無 | `mod.EnableGameModeObjective(...);` | `mod.EnableGameModeObjective(...);` |
| `SetMCOMFuseTime` | `SetMCOMFuseTime` |設定點火時間直到 MCOM 爆炸。 | mCOM：MCOM，fuseTime：數字 |無 | `mod.SetMCOMFuseTime(...);` | `mod.SetMCOMFuseTime(...);` |
| `SetMCOMOwner` | `SetMCOMOwner` |設定 MCOM 所有權團隊。可以安裝和刪除它的團隊將會發生變化。 | mcom：MCOM，teamid：團隊 |無 | `mod.SetMCOMOwner(...);` | `mod.SetMCOMOwner(...);` |
| `GetRingOfFire` | `GetRingOfFire` |從號碼或目標取得 RingOfFire。 |數量： 數量 | `RingOfFire` | `RingOfFire` | `const value = mod.GetRingOfFire(...);` |
| `AllCapturePoints` | `AllCapturePoints` |以陣列形式取得遊戲中存在的所有 CapturePoint。 |無 | `Array` | `Array` | `const value = mod.AllCapturePoints(...);` |
| `GetCapturePoint` | `GetCapturePoint` |從數字或目標取得 CapturePoint。 | id: 號碼 | `CapturePoint` | `CapturePoint` | `const value = mod.GetCapturePoint(...);` |
| `GetCaptureProgress` | `GetCaptureProgress` |取得指定 CapturePoint 的佔領進度，值為 0 到 1 之間的數值。捕獲點：捕獲點 | `number` | `number` | `const value = mod.GetCaptureProgress(...);` |
| `GetCurrentOwnerTeam` | `GetCurrentOwnerTeam` |取得目前擁有指定 CapturePoint 的團隊。 |捕獲點：捕獲點 | `Team` | `Team` | `const value = mod.GetCurrentOwnerTeam(...);` |
| `GetOwnerProgressTeam` | `GetOwnerProgressTeam` |取得目前試圖佔領指定佔領點的隊伍。 |捕獲點：捕獲點 | `Team` | `Team` | `const value = mod.GetOwnerProgressTeam(...);` |
| `GetPlayersOnPoint` | `GetPlayersOnPoint` |取得指定CapturePoint範圍內的玩家陣列。 |捕獲點：捕獲點 | `Array` | `Array` | `const value = mod.GetPlayersOnPoint(...);` |
| `GetPreviousOwnerTeam` | `GetPreviousOwnerTeam` |取得指定 CapturePoint 的先前所有權團隊。 |捕獲點：捕獲點 | `Team` | `Team` | `const value = mod.GetPreviousOwnerTeam(...);` |
| `GetHQ` | `GetHQ` |從號碼或目標取得總部。 |數量： 數量 | `HQ` | `HQ` | `const value = mod.GetHQ(...);` |
| `GetMCOM` | `GetMCOM` |從號碼或目標取得 MCOM。 |數量： 數量 | `MCOM` | `MCOM` | `const value = mod.GetMCOM(...);` |
| `GetSector` | `GetSector` |從數字或目標取得磁區。 |數量： 數量 | `Sector` | `Sector` | `const value = mod.GetSector(...);` |

## 排列/空間對象

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `EnableAreaTrigger` | `EnableAreaTrigger` |啟用或停用區域觸發。停用時，不會觸發對應的事件。 | areaTrigger：區域觸發器，啟用：布林值 |無 | `mod.EnableAreaTrigger(...);` | `mod.EnableAreaTrigger(...);` |
| `EnableInteractPoint` | `EnableInteractPoint` |啟用或停用 InteractPoint。 |交互點：交互點，啟用：布林值 |無 | `mod.EnableInteractPoint(mod.GetInteractPoint(0), false);` | `mod.EnableInteractPoint(mod.GetInteractPoint(0), false);` |
| `EnableSpatialObject` | `EnableSpatialObject` |啟用或停用 SpatialObject。 |空間對象：空間對象，啟用：布林值 |無 | `mod.EnableSpatialObject(...);` | `mod.EnableSpatialObject(...);` |
| `RayCast` | `RayCast` |請求兩點之間的直線判斷。在 `OnRayCastHit` / `OnRayCastMissed` 接收結果。 2種類型的霸主。 |玩家：玩家，開始：向量，停止：向量 |無 | `mod.RayCast(eventPlayer, start, stop);` | `mod.RayCast(eventPlayer, start, stop);` |
| `SetVL7CloudEffects` | `SetVL7CloudEffects` |單獨啟用或停用 VL7Cloud 的螢幕效果、士兵效果和 VFX。 | vl7Cloud：VL7Cloud，screenEffect：布林值，soldierEffect：布林值，visualEffect：布林值 |無 | `mod.SetVL7CloudEffects(...);` | `mod.SetVL7CloudEffects(...);` |
| `UnspawnObject` | `UnspawnObject` |清除使用 `SpawnObject` 建立的物件。 | obj：mod.Object |無 | `mod.UnspawnObject(...);` |
| `MoveObject` | `MoveObject` |透過位置差異和旋轉差異（如果需要）移動指定物件。 2種類型的霸主。 |物件：mod.Object，positionDelta：向量 |無 | `mod.MoveObject(...);` | `mod.MoveObject(...);` |
| `MoveObjectOverTime` | `MoveObjectOverTime` |隨著時間的推移，將指定物件移動位置/旋轉差。您也可以指定循環和反轉。 |物件：mod.Object，positionDelta：向量，rotationDelta：向量，timeInSeconds：數字，shouldLoop：布林值，shouldReverse：布林值 |無 | `mod.MoveObjectOverTime(...);` | `mod.MoveObjectOverTime(...);` |
| `OrbitObjectOverTime` | `OrbitObjectOverTime` |隨著時間的推移圍繞變換旋轉指定物件。 2種類型的霸主。 |物件：mod.Object，orbitTransform：變換，timeInSeconds：數字，半徑：數字，shouldLoop：布林值，shouldReverse：布林值，順時針：布林值|無 | `mod.OrbitObjectOverTime(...);` | `mod.OrbitObjectOverTime(...);` |
| `RotateObject` | `RotateObject` |將指定物件旋轉歐拉角差。 |物件：mod.Object，rotationDelta：向量|無 | `mod.RotateObject(...);` | `mod.RotateObject(...);` |
| `SetObjectTransform` | `SetObjectTransform` |設定指定物件的Transform。 |物件：mod.Object，變換：變換 |無 | `mod.SetObjectTransform(...);` | `mod.SetObjectTransform(...);` |
| `SetObjectTransformOverTime` | `SetObjectTransformOverTime` |隨著時間的推移，將指定的物件移動並旋轉到指定的變換。 |物件：mod.Object，變換：變換，timeInSeconds：數字，shouldLoop：布林值，shouldReverse：布林值 |無 | `mod.SetObjectTransformOverTime(...);` | `mod.SetObjectTransformOverTime(...);` |
| `StopActiveMovementForObject` | `StopActiveMovementForObject` |停止指定物件上正在進行的時間移動。 |物件：mod.Object |無 | `mod.StopActiveMovementForObject(...);` | `mod.StopActiveMovementForObject(...);` |
| `GetAreaTrigger` | `GetAreaTrigger` |從數字或目標取得區域觸發器。 |區域觸發編號: 數字 | `AreaTrigger` | `AreaTrigger` | `const area = mod.GetAreaTrigger(0);` |
| `GetInteractPoint` | `GetInteractPoint` |從數字或目標取得 InteractPoint。 |交互點編號：數字 | `InteractPoint` | `InteractPoint` | `const point = mod.GetInteractPoint(0);` |
| `GetSpatialObject` | `GetSpatialObject` |從數字或目標取得 SpatialObject。 | 空間物件編號：數字 | `SpatialObject` | `SpatialObject` | `const value = mod.GetSpatialObject(...);` |
| `SpawnObject` | `SpawnObject` |在指定座標處產生執行階段產生預製件。不受支援的物件的回傳值可能為 `-1`。 2種類型的霸主。預製枚舉：\| RuntimeSpawn_Common \| RuntimeSpawn_Abbasid \| RuntimeSpawn_Aftermath \| RuntimeSpawn_Badlands \| RuntimeSpawn_Battery \| RuntimeSpawn_Capstone \| RuntimeSpawn_Contaminate \| Runtimeawn_D.Damion Runtime]Lableneami​​lenceaminate \| Runtimeawn_DMumneama​​nabled.Dumium \Sawntime]Sptimei_Firenes_Dumsneami​​做什麼\| RuntimeSpawn_Outskirts \| RuntimeSpawn_Subsurface \| RuntimeSpawn_Tungsten \| RuntimeSpawn_Granite_Downtown \| RuntimeSpawn_Granite_Marina \| RuntimeSpawn_Granite_MilitaryRnD \|Gratimes_Techs_Re 是\| RuntimeSpawn_Granite_Underground \| RuntimeSpawn_Sand，位置：向量，旋轉：向量，比例：向量 | `Any` | `const obj = mod.SpawnObject(prefab, pos, rot, scale);` | `const obj = mod.SpawnObject(prefab, pos, rot, scale);` |
| `GetObjectPosition` | `GetObjectPosition` |以 Vector 形式取得指定物件目前的位置。 |物件：mod.Object | `Vector` | `Vector` | `const value = mod.GetObjectPosition(...);` |
| `GetObjectRotation` | `GetObjectRotation` |以向量形式取得指定物件的目前旋轉。 |物件：mod.Object | `Vector` | `Vector` | `const value = mod.GetObjectRotation(...);` |
| `GetObjectTransform` | `GetObjectTransform` |取得包含指定物件的位置和旋轉的 Transform。 |物件：mod.Object | `Transform` | `Transform` | `const value = mod.GetObjectTransform(...);` |
| `GetTransformPosition` | `GetTransformPosition` |從變換中擷取位置向量。 |變換：變換| `Vector` | `Vector` | `const value = mod.GetTransformPosition(...);` |
| `GetTransformRotation` | `GetTransformRotation` |從變換中擷取旋轉向量。 |變換：變換| `Vector` | `Vector` | `const value = mod.GetTransformRotation(...);` |

## 路線/補給品

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `SpawnLoot` | `SpawnLoot` |在 LootSpawner 中產生彈藥、武器、小工具和盔甲。 4種類型的霸主。 | lootSpawner：LootSpawner，彈藥：AmmoTypes |無 | `mod.SpawnLoot(...);` | `mod.SpawnLoot(...);` |
| `UnspawnAllLoot` | `UnspawnAllLoot` |刪除世界上所有現有的路線。 |無 |無 | `mod.UnspawnAllLoot(...);` | `mod.UnspawnAllLoot(...);` |
| `GetLootSpawner` | `GetLootSpawner` |從號碼或目標取得 LootSpawner。 |數量： 數量 | `LootSpawner` | `LootSpawner` | `const value = mod.GetLootSpawner(...);` |

## 健康/傷害/狀態

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `DealDamage` | `DealDamage` |對指定玩家或車輛造成損壞。如有必要，您也可以指定造成傷害的玩家。 3種類型的霸主。 |玩家：玩家，傷害金額：數量 |無 | `mod.DealDamage(...);` | `mod.DealDamage(...);` |
| `ForceRevive` | `ForceRevive` |強行復活倒地的玩家。 |玩家： 玩家 |無 | `mod.ForceRevive(...);` | `mod.ForceRevive(...);` |
| `Heal` | `Heal` |治癒或修復指定的玩家或車輛。如有需要，您也可以指定治療師。 3種類型的霸主。 |玩家：玩家，治癒量：數量 |無 | `mod.Heal(...);` | `mod.Heal(...);` |
| `Kill` | `Kill` |立即殺死指定的玩家或車輛。玩家跳過狀態。 2種類型的霸主。 |玩家： 玩家 |無 | `mod.Kill(...);` | `mod.Kill(...);` |
| `SetSoldierEffect` | `SetSoldierEffect` |啟用或停用指定玩家的士兵效果。 |玩家：玩家，士兵效果：SoldierEffects，isEnabled：boolean |無 | `mod.SetSoldierEffect(...);` | `mod.SetSoldierEffect(...);` |
| `SpotTarget` | `SpotTarget` |發現指定的玩家。您可以指定顯示時間、地點狀態和地點。 5種霸主。 | targetplayer：玩家，持續時間：數字，spotStatus：SpotStatus |無 | `mod.SpotTarget(...);` | `mod.SpotTarget(...);` |
| `SetPlayerIncomingDamageFactor` | `SetPlayerIncomingDamageFactor` |設定指定玩家受到的傷害倍數。值四捨五入到最接近的 5%，並限制在 0 到 200%。 |玩家： 玩家，金額： 數量 |無 | `mod.SetPlayerIncomingDamageFactor(...);` | `mod.SetPlayerIncomingDamageFactor(...);` |
| `ForceManDown` | `ForceManDown` |放下指定的玩家。如果停用了 down，則不適用。 |玩家： 玩家 |無 | `mod.ForceManDown(...);` | `mod.ForceManDown(...);` |
| `SetPlayerMaxHealth` | `SetPlayerMaxHealth` |設定指定玩家的最大生命值，範圍為1到500。最大體力倍數也會反映出來。 |玩家：玩家，最大生命值：數字 |無 | `mod.SetPlayerMaxHealth(...);` | `mod.SetPlayerMaxHealth(...);` |
| `SetPlayerMovementSpeedMultiplier` | `SetPlayerMovementSpeedMultiplier` |設定指定玩家的移動速度倍數。 |玩家：玩家，乘數：數量 |無 | `mod.SetPlayerMovementSpeedMultiplier(...);` | `mod.SetPlayerMovementSpeedMultiplier(...);` |
| `SkipManDown` | `SkipManDown` |設定指定玩家死亡時是否不經過down狀態返回部署介面。 |玩家：玩家，skipManDown：boolean |無 | `mod.SkipManDown(...);` | `mod.SkipManDown(...);` |

## 裝備/輸入/玩家操作

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `Teleport` | `Teleport` |將指定的玩家或車輛移動到具有方向的有效座標。以弧度指定方向。 2種類型的霸主。 |玩家：玩家，目的地：向量，方向：數字|無 | `mod.Teleport(eventPlayer, destination, 0);` | `mod.Teleport(eventPlayer, destination, 0);` |
| `EnableAllInputRestrictions` | `EnableAllInputRestrictions` |切換指定玩家的移動、拍攝、視點操作等所有輸入限制。 |玩家：玩家，限制輸入：boolean |無 | `mod.EnableAllInputRestrictions(...);` | `mod.EnableAllInputRestrictions(...);` |
| `EnableInputRestriction` | `EnableInputRestriction` |限製或取消特定玩家的特定輸入。 |玩家：玩家，輸入限制：RestrictedInputs，restrictInput：boolean |無 | `mod.EnableInputRestriction(...);` | `mod.EnableInputRestriction(...);` |
| `AddAttachmentToWeaponPackage` | `AddAttachmentToWeaponPackage` |將附件新增至 WeaponPackage。現有的同類型附件將被替換。 |附件：WeaponAttachments、 WeaponPackage：WeaponPackage |無 | `mod.AddAttachmentToWeaponPackage(...);` | `mod.AddAttachmentToWeaponPackage(...);` |
| `AddEquipment` | `AddEquipment` |將武器、小工具和盔甲加入玩家的裝備中。 7種霸主。 |玩家：玩家，武器：武器 |無 | `mod.AddEquipment(...);` | `mod.AddEquipment(...);` |
| `ForceSwitchInventory` | `ForceSwitchInventory` |強制指定玩家切換到指定的物品欄位置。 |玩家：玩家，庫存槽位：庫存槽位 |無 | `mod.ForceSwitchInventory(...);` | `mod.ForceSwitchInventory(...);` |
| `RemoveEquipment` | `RemoveEquipment` |從玩家的裝備中移除指定的插槽、武器或小工具。 3種類型的霸主。 |玩家：玩家，庫存槽位：庫存槽位 |無 | `mod.RemoveEquipment(...);` | `mod.RemoveEquipment(...);` |
| `SetInventoryAmmo` | `SetInventoryAmmo` |設定指定庫存槽的子彈數量。 |玩家：玩家，庫存槽位：庫存槽位，彈藥：數量 |無 | `mod.SetInventoryAmmo(...);` | `mod.SetInventoryAmmo(...);` |
| `SetInventoryMagazineAmmo` | `SetInventoryMagazineAmmo` |設定指定庫存插槽的彈匣中的子彈數量。 |玩家：玩家，inventorySlots：InventorySlots，magAmmo：數量 |無 | `mod.SetInventoryMagazineAmmo(...);` | `mod.SetInventoryMagazineAmmo(...);` |
| `Resupply` | `Resupply` |提供玩家指定的供給類型。 |玩家：玩家，補給類型：補給類型 |無 | `mod.Resupply(...);` | `mod.Resupply(...);` |
| `CreateNewWeaponPackage` | `CreateNewWeaponPackage` |建立一個新的武器包。 |無 | `WeaponPackage` | `WeaponPackage` | `const value = mod.CreateNewWeaponPackage(...);` |
| `EventDamageTypeCompare` | `EventDamageTypeCompare` |判斷事件中傳入的DamageType是否與指定的損壞類型相符。 | DamageType：DamageType，playerDamageTypes：PlayerDamageTypes | `boolean` | `boolean` | `const value = mod.EventDamageTypeCompare(...);` |
| `EventDeathTypeCompare` | `EventDeathTypeCompare` |判斷事件中傳入的DeathType是否與指定的死亡類型相符。 | DeathType：DeathType，playerDeathTypes：PlayerDeathTypes | `boolean` | `boolean` | `const value = mod.EventDeathTypeCompare(...);` |
| `EventWeaponCompare` | `EventWeaponCompare` |判斷活動中給予的武器和小玩意是否與指定裝備相符。 2種類型的霸主。 |事件武器：武器解鎖，武器：武器 | `boolean` | `boolean` | `if (mod.EventWeaponCompare(eventWeaponUnlock, mod.Weapons.AK24)) {}` |
| `GetInventoryAmmo` | `GetInventoryAmmo` |取得指定玩家指定插槽內的子彈數量。 |玩家：玩家、庫存插槽：庫存插槽 | `number` | `number` | `const value = mod.GetInventoryAmmo(...);` |
| `GetInventoryMagazineAmmo` | `GetInventoryMagazineAmmo` |取得指定玩家指定插槽彈匣內的子彈數量。 |玩家：玩家、庫存插槽：庫存插槽 | `number` | `number` | `const value = mod.GetInventoryMagazineAmmo(...);` |
| `GetSoldierState` | `GetSoldierState` |取得指定玩家的士兵狀態，為數值、布林值或向量。 3種類型的霸主。 |玩家：玩家，士兵狀態編號：士兵狀態編號 | `number` | `number` | `const value = mod.GetSoldierState(...);` |
| `HasEquipment` | `HasEquipment` |決定指定玩家是否擁有指定的武器或小工具。 2種類型的霸主。 |玩家：玩家，武器：武器 | `boolean` | `boolean` | `if (mod.HasEquipment(eventPlayer, mod.Weapons.AK24)) {}` |
| `IsInventorySlotActive` | `IsInventorySlotActive` |決定指定玩家是否正在使用指定的物品欄位。 |玩家：玩家、庫存插槽：庫存插槽 | `boolean` | `boolean` | `const value = mod.IsInventorySlotActive(...);` |
| `IsSoldierClass` | `IsSoldierClass` |判斷指定玩家是否為指定軍種。 |玩家：玩家、士兵類別：士兵類別| `boolean` | `boolean` | `const value = mod.IsSoldierClass(...);` |

## 車輛

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `ForceVehicleSpawnerSpawn` | `ForceVehicleSpawnerSpawn` |從 VehicleSpawner 強制產生目前配置的車輛。 |車輛Spawner：車輛Spawner |無 | `mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(0));` | `mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(0));` |
| `SetAllVehiclesAllowedInSurroundingArea` | `SetAllVehiclesAllowedInSurroundingArea` |設定是否允許週邊所有車輛通行。 |允許：布林值 |無 | `mod.SetAllVehiclesAllowedInSurroundingArea(...);` | `mod.SetAllVehiclesAllowedInSurroundingArea(...);` |
| `SetMaxVehicleHeightLimitScale` | `SetMaxVehicleHeightLimitScale` |設定車輛引擎失去向上推力的高度限制乘數。 | heightScale: 數字 |無 | `mod.SetMaxVehicleHeightLimitScale(...);` | `mod.SetMaxVehicleHeightLimitScale(...);` |
| `SetVehicleAllowedInSurroundingArea` | `SetVehicleAllowedInSurroundingArea` |設定是否允許指定車輛在周邊區域行駛。 |車輛：VehicleList，允許：boolean |無 | `mod.SetVehicleAllowedInSurroundingArea(...);` | `mod.SetVehicleAllowedInSurroundingArea(...);` |
| `SetVehicleCategoryAllowedInSurroundingArea` | `SetVehicleCategoryAllowedInSurroundingArea` |設定是否允許指定車輛類別進入周邊區域。 |車輛類別：車輛類別，允許：布林值 |無 | `mod.SetVehicleCategoryAllowedInSurroundingArea(...);` | `mod.SetVehicleCategoryAllowedInSurroundingArea(...);` |
| `SetVehicleSpawnerAbandonVehiclesOutOfCombatArea` | `SetVehicleSpawnerAbandonVehiclesOutOfCombatArea` |設定是否摧毀留在戰鬥區域外的車輛。 | VehicleSpawner：VehicleSpawner，啟用：布林值|無 | `mod.SetVehicleSpawnerAbandonVehiclesOutOfCombatArea(...);` | `mod.SetVehicleSpawnerAbandonVehiclesOutOfCombatArea(...);` |
| `SetVehicleSpawnerApplyDamageToAbandonVehicle` | `SetVehicleSpawnerApplyDamageToAbandonVehicle` |設定是否會對廢棄車輛施加傷害。 | VehicleSpawner：VehicleSpawner，啟用：布林值|無 | `mod.SetVehicleSpawnerApplyDamageToAbandonVehicle(...);` | `mod.SetVehicleSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetVehicleSpawnerAutoSpawn` | `SetVehicleSpawnerAutoSpawn` |啟用或停用 VehicleSpawner 的自動重生。 | VehicleSpawner：VehicleSpawner，啟用：布林值|無 | `mod.SetVehicleSpawnerAutoSpawn(...);` | `mod.SetVehicleSpawnerAutoSpawn(...);` |
| `SetVehicleSpawnerKeepAliveAbandonRadius` | `SetVehicleSpawnerKeepAliveAbandonRadius` |設定最近玩家的距離，達到該距離車輛將被視為廢棄。 | VehicleSpawner：VehicleSpawner，keepAliveAbandonedRadius：數量|無 | `mod.SetVehicleSpawnerKeepAliveAbandonRadius(...);` | `mod.SetVehicleSpawnerKeepAliveAbandonRadius(...);` |
| `SetVehicleSpawnerKeepAliveSpawnerRadius` | `SetVehicleSpawnerKeepAliveSpawnerRadius` |設定車輛被視為遠離生成器的距離。 |車輛Spawner：車輛Spawner，keepAliveSpawnerRadius：數字|無 | `mod.SetVehicleSpawnerKeepAliveSpawnerRadius(...);` | `mod.SetVehicleSpawnerKeepAliveSpawnerRadius(...);` |
| `SetVehicleSpawnerRespawnTime` | `SetVehicleSpawnerRespawnTime` |設定車輛被摧毀後直到自動重生的秒數。 | VehicleSpawner：VehicleSpawner，重生時間：數字 |無 | `mod.SetVehicleSpawnerRespawnTime(...);` | `mod.SetVehicleSpawnerRespawnTime(...);` |
| `SetVehicleSpawnerTimeUntilAbandon` | `SetVehicleSpawnerTimeUntilAbandon` |設定車輛在被視為廢棄之前保持未使用狀態的時間。 | VehicleSpawner：VehicleSpawner，timeUntilAbandon：數字 |無 | `mod.SetVehicleSpawnerTimeUntilAbandon(...);` | `mod.SetVehicleSpawnerTimeUntilAbandon(...);` |
| `SetVehicleSpawnerVehicleType` | `SetVehicleSpawnerVehicleType` |設定從 VehicleSpawner 發出的車輛類型。 | VehicleSpawner：VehicleSpawner，車輛類型：VehicleList |無 | `mod.SetVehicleSpawnerVehicleType(...);` | `mod.SetVehicleSpawnerVehicleType(...);` |
| `SetVehicleMaxHealthMultiplier` | `SetVehicleMaxHealthMultiplier` |將指定車輛的最大耐久性乘數設定為大於 0 且小於或等於 4 的值。 |車輛：車輛，maxHealthMultiplier：數字 |無 | `mod.SetVehicleMaxHealthMultiplier(...);` | `mod.SetVehicleMaxHealthMultiplier(...);` |
| `ForcePlayerExitVehicle` | `ForcePlayerExitVehicle` |將指定玩家強行從車輛移走。 | `ForcePlayerExitVehicle` | `ForcePlayerExitVehicle` | 3種類型的霸主。 |玩家：玩家，車輛：車輛 |無 | `mod.ForcePlayerExitVehicle(...);` | `mod.ForcePlayerExitVehicle(...);` |
| `ForcePlayerToSeat` | `ForcePlayerToSeat` |強制指定玩家坐在指定車輛座位上。 | `ForcePlayerToSeat` | `ForcePlayerToSeat` |如果座位號碼為-1，則使用空位。 |玩家：玩家，車輛：車輛，座位編號：數量 |無 | `mod.ForcePlayerToSeat(...);` | `mod.ForcePlayerToSeat(...);` |
| `GetVehicleSpawner` | `GetVehicleSpawner` |從數字或目標取得VehicleSpawner。 |數量： 數量 | `VehicleSpawner` | `VehicleSpawner` | `const value = mod.GetVehicleSpawner(...);` |
| `AllVehicles` | `AllVehicles` |將遊戲中的所有車輛作為陣列取得。 |無 | `Array` | `Array` | `const vehicles = mod.AllVehicles();` |
| `CompareVehicleName` | `CompareVehicleName` |判斷指定的車輛是否與指定的VehicleList類型相同。 |車輛：車輛，車輛清單：車輛清單 | `boolean` | `boolean` | `const value = mod.CompareVehicleName(...);` |
| `GetVehicleFromPlayer` | `GetVehicleFromPlayer` |取得指定玩家所搭乘的車輛。 |玩家： 玩家 | `Vehicle` | `Vehicle` | `const vehicle = mod.GetVehicleFromPlayer(eventPlayer);` |
| `GetVehicleSeatCount` | `GetVehicleSeatCount` |取得指定車輛的座位數。 |車輛： 車輛 | `number` | `number` | `const value = mod.GetVehicleSeatCount(...);` |
| `GetVehicleState` | `GetVehicleState` |取得指定車輛的狀態向量。 |車輛：車輛，車輛狀態向量：車輛狀態向量 | `Vector` | `Vector` | `const value = mod.GetVehicleState(...);` |
| `GetVehicleTeam` | `GetVehicleTeam` |取得指定車輛所屬的車隊。無人車輛將被視為中立車輛。 |車輛： 車輛 | `Team` | `Team` | `const value = mod.GetVehicleTeam(...);` |
| `IsVehicleOccupied` | `IsVehicleOccupied` |判斷玩家是否搭乘指定車輛。 |車輛： 車輛 | `boolean` | `boolean` | `const value = mod.IsVehicleOccupied(...);` |
| `IsVehicleSeatOccupied` | `IsVehicleSeatOccupied` |判斷指定車輛的預約座位是否正在使用。 | 車輛： 車輛，數量： 數量 | `boolean` | `boolean` | `const value = mod.IsVehicleSeatOccupied(...);` |
| `GetAllPlayersInVehicle` | `GetAllPlayersInVehicle` |取得指定車輛中的所有玩家作為陣列。 |車輛： 車輛 | `Array` | `Array` | `const value = mod.GetAllPlayersInVehicle(...);` |
| `GetPlayerFromVehicleSeat` | `GetPlayerFromVehicleSeat` |讓玩家坐在指定車輛的指定座位上。如果座位是空的，則成為無效玩家。 | 車輛： 車輛，數量： 數量 | `Player` | `Player` | `const value = mod.GetPlayerFromVehicleSeat(...);` |
| `GetPlayerVehicleSeat` | `GetPlayerVehicleSeat` |取得指定玩家的車輛座位號碼。如果在車外，則為 -1。 |玩家： 玩家 | `number` | `number` | `const value = mod.GetPlayerVehicleSeat(...);` |

## 世界圖標

|功能|功能/目的|主要論點|傳回值 |使用範例 |
| --- | --- | --- | --- | --- |
| `EnableWorldIconImage` | `EnableWorldIconImage` |啟用或停用 WorldIcon 影像顯示。 | worldIcon：世界圖標，enableImage：布林值 |無 | `mod.EnableWorldIconImage(...);` | `mod.EnableWorldIconImage(...);` |
| `EnableWorldIconText` | `EnableWorldIconText` |啟用或停用 WorldIcon 上的文字顯示。 | worldIcon：世界圖標，enableText：布林值 |無 | `mod.EnableWorldIconText(...);` | `mod.EnableWorldIconText(...);` |
| `RemoveUIIcon` | `RemoveUIIcon` |刪除附加到該物件的 UI 圖示小工具。您也可以指定目標球員或球隊。 2種類型的霸主。 | objectWithIcon：mod.Object |無 | `mod.RemoveUIIcon(...);` | `mod.RemoveUIIcon(...);` |
| `SetWorldIconColor` | `SetWorldIconColor` |更改世界圖示的顏色。 | worldIcon：世界圖標，新顏色：向量 |無 | `mod.SetWorldIconColor(...);` | `mod.SetWorldIconColor(...);` |
| `SetWorldIconImage` | `SetWorldIconImage` |更改 WorldIcon 的圖片類型。 | worldIcon：WorldIcon，newImage：WorldIconImages |無 | `mod.SetWorldIconImage(...);` | `mod.SetWorldIconImage(...);` |
| `SetWorldIconOwner` | `SetWorldIconOwner` |限制 WorldIcon 僅對特定團隊或玩家可見。 2種類型的霸主。 | worldIcon：WorldIcon，newTeamOwner：團隊| 無 | `mod.SetWorldIconOwner(...);` | `mod.SetWorldIconOwner(...);` |
| `SetWorldIconPosition` | `SetWorldIconPosition` |更改 WorldIcon 的顯示位置。 | worldIcon：世界圖標，newPosition：向量 |無 | `mod.SetWorldIconPosition(...);` | `mod.SetWorldIconPosition(...);` |
| `SetWorldIconText` | `SetWorldIconText` |更改 WorldIcon 上的文字。顯示文字在 `Strings.json` 註冊，然後在 `mod.stringkeys` 引用。 | worldIcon：世界圖標，newText：訊息 |無 | `mod.SetWorldIconText(icon, mod.Message(mod.stringkeys.pointA));` | `mod.SetWorldIconText(icon, mod.Message(mod.stringkeys.pointA));` |
| `GetWorldIcon` | `GetWorldIcon` |從數字或目標取得 WorldIcon。 | worldIconNumber: 數字 | `WorldIcon` | `WorldIcon` | `const icon = mod.GetWorldIcon(0);` |

# 下一個要閱讀的附錄

UI、通知、玩家引用、陣列、ObjId、數字、類型和最小模板分為以下「附錄 A-3：操作/值獲取清單（UI/引用/值）」。
