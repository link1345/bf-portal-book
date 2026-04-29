---
title: "附录A-2：动作/值获取列表（基本操作）"
free: true
---

::::message
本附录目前只是粗略的机器翻译，文字可能非常不自然。我之后会认真修改，暂时请多包涵。
::::

# 动作/价值获取列表

这里，从 `mod.` 调用的函数是按用途排列的。有些名称与 Portal 的块名称类似，但 TypeScript 有严格的类型，因此您需要传递 `Player`、`Team`、`Vector`、`Message`、`UIWidget` 等类型。

具有相同名称和多个参数模式的函数聚集在一行上，重载的数量写在函数/用途列中。要获得完整的签名，请在 `index.d.ts` 中搜索函数名称。

## 变量/等待/子例程

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `Wait` | `Wait` |等待指定的秒数。由于它是一个异步过程，因此将其与 `await` 结合起来。 | n：数字| `Promise<void>` | `await mod.Wait(1);` | `await mod.Wait(1);` |
| `SetVariable` | `SetVariable` |将值保存到指定变量。阶段、分数和标志管理的基础知识。 |变量：变量，值：任意 |无 | `mod.SetVariable(mod.GlobalVariable(0), 1);` | `mod.SetVariable(mod.GlobalVariable(0), 1);` |
| `SetVariableAtIndex` | `SetVariableAtIndex` |初始化或获取Variable中的数组并将值保存到指定索引。 | arrayVariable：变量，arrayIndex：数字，值：任意 |无 | `mod.SetVariableAtIndex(mod.GlobalVariable(1), 0, eventPlayer);` | `mod.SetVariableAtIndex(mod.GlobalVariable(1), 0, eventPlayer);` |
| `ChaseVariableAtRate` | `ChaseVariableAtRate` |每秒将变量的值向极限值移动指定的量。 |变量：变量，限制：数字，deltaPerSecond：数字 |无 | `mod.ChaseVariableAtRate(...);` | `mod.ChaseVariableAtRate(...);` |
| `ChaseVariableOverTime` | `ChaseVariableOverTime` |在指定的秒数内使变量的值接近极限值。 |变量：变量，限制：数字，durationSeconds：数字 |无 | `mod.ChaseVariableOverTime(...);` | `mod.ChaseVariableOverTime(...);` |
| `StopChasingVariable` | `StopChasingVariable` |停止正在进行的变量跟踪并停止在当前值。 |变量：变量|无 | `mod.StopChasingVariable(...);` | `mod.StopChasingVariable(...);` |
| `GetArgument` | `GetArgument` |按编号获取子例程参数。 | subroutineArgIndex: 数字 | `Any` | `Any` | `const value = mod.GetArgument(...);` |
| `GetVariable` | `GetVariable` |获取存储在变量中的当前值。 |变量：变量| `Any` | `Any` | `const phase = mod.GetVariable(mod.GlobalVariable(0));` |
| `GlobalVariable` | `GlobalVariable` |获取指定编号的全局变量。 |变量索引：数字 | `Variable` | `Variable` | `const phase = mod.GlobalVariable(0);` |
| `ObjectVariable` | `ObjectVariable` |获取与指定对象关联的变量。 |所有者对象：mod.Object，变量索引：数字 | `Variable` | `Variable` | `const flag = mod.ObjectVariable(eventPlayer, 0);` |

## 人工智能控制

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `AIBattlefieldBehavior` | `AIBattlefieldBehavior` |让AI士兵自主行动，让他们完成目标并向敌人射击。仅供AI玩家使用。 |玩家： 玩家 |无 | `mod.AIBattlefieldBehavior(...);` | `mod.AIBattlefieldBehavior(...);` |
| `AIDefendPositionBehavior` | `AIDefendPositionBehavior` |让人工智能士兵保卫指定位置周围的区域。仅供AI玩家使用。 |玩家：玩家，防守位置：向量，minDistance：数字，maxDistance：数字 |无 | `mod.AIDefendPositionBehavior(...);` | `mod.AIDefendPositionBehavior(...);` |
| `AIIdleBehavior` | `AIIdleBehavior` |将AI士兵当前所在位置设置为待命点。仅供AI玩家使用。 |玩家： 玩家 |无 | `mod.AIIdleBehavior(...);` | `mod.AIIdleBehavior(...);` |
| `AILOSMoveToBehavior` | `AILOSMoveToBehavior` |将AI士兵移动到指定位置，同时保持视线。仅供AI玩家使用。 |球员： 球员，位置： 矢量 |无 | `mod.AILOSMoveToBehavior(...);` | `mod.AILOSMoveToBehavior(...);` |
| `AIMoveToBehavior` | `AIMoveToBehavior` |给AI士兵一个目的地，移动到指定的坐标。仅供AI玩家使用。 |球员： 球员，位置： 矢量 |无 | `mod.AIMoveToBehavior(...);` | `mod.AIMoveToBehavior(...);` |
| `AIParachuteBehavior` | `AIParachuteBehavior` |让AI士兵做一个跳伞动作。仅供AI玩家使用。 |玩家： 玩家 |无 | `mod.AIParachuteBehavior(...);` | `mod.AIParachuteBehavior(...);` |
| `AIValidatedMoveToBehavior` | `AIValidatedMoveToBehavior` |将 AI 士兵移至导航网格上的有效邻近位置。仅供AI玩家使用。 |球员： 球员，位置： 矢量 |无 | `mod.AIValidatedMoveToBehavior(...);` | `mod.AIValidatedMoveToBehavior(...);` |
| `AIWaypointIdleBehavior` | `AIWaypointIdleBehavior` |让人工智能士兵巡逻航点路径。仅供AI玩家使用。 |玩家：玩家，waypointPath：WaypointPath |无 | `mod.AIWaypointIdleBehavior(...);` | `mod.AIWaypointIdleBehavior(...);` |
| `SetAiInput` | `SetAiInput` |在一段时间内向 AI 士兵发送指定的输入。最多可同时指定 3 个输入。 |玩家：玩家，输入：AiInput，持续时间：数字 |无 | `mod.SetAiInput(...);` | `mod.SetAiInput(...);` |
| `AISetUnspawnOnDead` | `AISetUnspawnOnDead` |设置从Spawner派出的AI士兵死亡后是否离开。 |生成器：生成器，enableUnspawnOnDead：布尔值 |无 | `mod.AISetUnspawnOnDead(...);` | `mod.AISetUnspawnOnDead(...);` |
| `SetUnspawnDelayInSeconds` | `SetUnspawnDelayInSeconds` |设置从Spawner发送的AI士兵死亡后退出的秒数。 |生成器：生成器，延迟：数量 |无 | `mod.SetUnspawnDelayInSeconds(...);` | `mod.SetUnspawnDelayInSeconds(...);` |
| `SpawnAIFromAISpawner` | `SpawnAIFromAISpawner` |从指定的 AI 生成器中生成一名 AI 士兵。 8种霸主。 |生成器： 生成器 |无 | `mod.SpawnAIFromAISpawner(mod.GetSpawner(0));` | `mod.SpawnAIFromAISpawner(mod.GetSpawner(0));` |
| `UnspawnAllAIsFromAISpawner` | `UnspawnAllAIsFromAISpawner` |移除指定 AI 生成器派出的所有 AI 士兵。 |生成器： 生成器 |无 | `mod.UnspawnAllAIsFromAISpawner(...);` | `mod.UnspawnAllAIsFromAISpawner(...);` |
| `AIEnableShooting` | `AIEnableShooting` |切换AI士兵是否可以射击。仅供AI玩家使用。 2种类型的霸主。 |玩家： 玩家 |无 | `mod.AIEnableShooting(...);` | `mod.AIEnableShooting(...);` |
| `AIEnableTargeting` | `AIEnableTargeting` |切换AI士兵的敌人搜索/目标识别。如果禁用它，它将不再触发。 2种类型的霸主。 |玩家： 玩家 |无 | `mod.AIEnableTargeting(...);` | `mod.AIEnableTargeting(...);` |
| `AIForceFire` | `AIForceFire` |强制人工智能士兵在指定时间内使用手持武器和小工具。 |玩家：玩家，开火持续时间：数字 |无 | `mod.AIForceFire(...);` | `mod.AIForceFire(...);` |
| `AIGadgetSettings` | `AIGadgetSettings` |调整人工智能士兵的小工具使用条件、冷却时间和精度修正。 |玩家：玩家，applyUsageCriteria：布尔值，applyCoolDownAfterUse：布尔值，applyInaccuracy：布尔值 |无 | `mod.AIGadgetSettings(...);` | `mod.AIGadgetSettings(...);` |
| `AISetFocusPoint` | `AISetFocusPoint` |设置人工​​智能士兵的注视点，并在必要时让它攻击那里。 |玩家：玩家，点：向量，isTarget：布尔值 |无 | `mod.AISetFocusPoint(...);` | `mod.AISetFocusPoint(...);` |
| `AISetMoveSpeed` | `AISetMoveSpeed` |设置AI士兵的移动行为的速度。 |玩家：玩家，移动速度：移动速度 |无 | `mod.AISetMoveSpeed(...);` | `mod.AISetMoveSpeed(...);` |
| `AISetStance` | `AISetStance` |设置AI士兵的姿势。 |球员：球员，立场：立场|无 | `mod.AISetStance(...);` | `mod.AISetStance(...);` |
| `AISetTarget` | `AISetTarget` |设置或清除人工智能士兵的当前目标。 2种类型的霸主。 | aiPlayer：玩家，targetPlayer：玩家 |无 | `mod.AISetTarget(...);` | `mod.AISetTarget(...);` |
| `AIStartUsingGadget` | `AIStartUsingGadget` |让人工智能士兵在指定位置或指定玩家使用特定小工具。 2种类型的霸主。 |玩家：玩家，小工具：小工具，targetPos：矢量 |无 | `mod.AIStartUsingGadget(...);` | `mod.AIStartUsingGadget(...);` |
| `AIStopUsingGadget` | `AIStopUsingGadget` |取消给AI士兵的小工具使用说明。 |玩家： 玩家 |无 | `mod.AIStopUsingGadget(...);` | `mod.AIStopUsingGadget(...);` |
| `SetAIToHumanDamageModifier` | `SetAIToHumanDamageModifier` |设置人工​​智能给予人类玩家的伤害倍数。 |伤害倍数: 数字 |无 | `mod.SetAIToHumanDamageModifier(...);` | `mod.SetAIToHumanDamageModifier(...);` |

## 声音/音乐/旁白

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `LoadMusic` | `LoadMusic` |加载音乐包并使其可在 `PlayMusic` 上播放。 |音乐包： 音乐包 |无 | `mod.LoadMusic(...);` |
| `PlayMusic` | `PlayMusic` |播放音乐活动。您可以针对整个球队、小队或球员。 4种类型的霸主。 |音乐活动： 音乐活动 |无 | `mod.PlayMusic(...);` | `mod.PlayMusic(...);` |
| `PlaySound` | `PlaySound` |播放音效。您可以指定目标、位置和衰减范围。 8种霸主。 |声音：SFX，振幅：数字，团队：团队 |无 | `mod.PlaySound(mod.GetSFX(0), 1);` | `mod.PlaySound(mod.GetSFX(0), 1);` |
| `PlayVO` | `PlayVO` |播放 VO 音频事件。您可以针对整个球队、小队或球员。 4种类型的霸主。 |旁白：VO，事件：VoiceOverEvents2D，标志：VoiceOverFlags |无 | `mod.PlayVO(...);` | `mod.PlayVO(...);` |
| `SetMusicParam` | `SetMusicParam` |更新加载的音乐包的参数值。 4种类型的霸主。 | musicParam：MusicParams，paramValue：数字 |无 | `mod.SetMusicParam(...);` | `mod.SetMusicParam(...);` |
| `SetSoundAmplitude` | `SetSoundAmplitude` |更改指定 SFX 的音量。您可以针对整个球队、小队或球员。 4种类型的霸主。 |声音：SFX，振幅：数字，团队：团队 |无 | `mod.SetSoundAmplitude(...);` | `mod.SetSoundAmplitude(...);` |
| `StopSound` | `StopSound` |停止指定的 SFX。您可以针对整个球队、小队或球员。 4种类型的霸主。 |声音：SFX，团队：Team |无 | `mod.StopSound(...);` | `mod.StopSound(...);` |
| `UnloadMusic` | `UnloadMusic` |释放加载的音乐包。 |音乐包： 音乐包 |无 | `mod.UnloadMusic(...);` | `mod.UnloadMusic(...);` |

## 相机/方向

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `SetCameraTypeForAll` | `SetCameraTypeForAll` |为所有玩家设置相机类型。如有必要，还需指定相机索引。 2种类型的霸主。 |相机类型： 相机 |无 | `mod.SetCameraTypeForAll(...);` | `mod.SetCameraTypeForAll(...);` |
| `SetCameraTypeForPlayer` | `SetCameraTypeForPlayer` |设置指定播放器的摄像头类型。如有必要，还需指定相机索引。 2种类型的霸主。 |播放器：播放器、相机类型：相机 |无 | `mod.SetCameraTypeForPlayer(...);` | `mod.SetCameraTypeForPlayer(...);` |
| `SetSpectatingFiltersForAll` | `SetSpectatingFiltersForAll` |为所有玩家设置观看过滤器。只能限制在小队/团队内。 |组：SpectatingGroup，ownSquadOnly：布尔值，ownTeamOnly：布尔值 |无 | `mod.SetSpectatingFiltersForAll(...);` | `mod.SetSpectatingFiltersForAll(...);` |
| `SetSpectatingFiltersForPlayer` | `SetSpectatingFiltersForPlayer` |设置观看指定玩家的过滤器。只能限制在小队/团队内。 |玩家：玩家，组：SpectatingGroup，ownSquadOnly：布尔值，ownTeamOnly：布尔值 |无 | `mod.SetSpectatingFiltersForPlayer(...);` | `mod.SetSpectatingFiltersForPlayer(...);` |
| `EnableScreenEffect` | `EnableScreenEffect` |启用或禁用指定播放器的屏幕效果。 |播放器：播放器，screenEffect：ScreenEffects，启用：布尔值 |无 | `mod.EnableScreenEffect(...);` | `mod.EnableScreenEffect(...);` |
| `EnableVFX` | `EnableVFX` |启用或禁用指定视觉特效的显示和操作。 | vfx：视觉特效，启用：布尔值 |无 | `mod.EnableVFX(...);` | `mod.EnableVFX(...);` |
| `MoveVFX` | `MoveVFX` |将 VFX 移动到指定的坐标和旋转。一般来说，通用的运动功能也会被考虑。 | vfxID：VFX，位置：矢量，旋转：矢量 |无 | `mod.MoveVFX(...);` | `mod.MoveVFX(...);` |
| `SetVFXColor` | `SetVFXColor` |更改视觉特效颜色。 | vfxID：视觉特效，颜色：矢量 |无 | `mod.SetVFXColor(...);` | `mod.SetVFXColor(...);` |
| `SetVFXScale` | `SetVFXScale` |更改视觉特效的比例。 | vfxID：视觉特效，比例：数字 |无 | `mod.SetVFXScale(...);` | `mod.SetVFXScale(...);` |
| `SetVFXSpeed` | `SetVFXSpeed` |更改 VFX 的播放速度。 | vfxID：视觉特效，速度：数字 |无 | `mod.SetVFXSpeed(...);` | `mod.SetVFXSpeed(...);` |
| `GetFixedCamera` | `GetFixedCamera` |从数字或目标获取固定相机。 |数量： 数量 | `FixedCamera` | `FixedCamera` | `const value = mod.GetFixedCamera(...);` |

## 固定武器生成器

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `ForceEmplacementSpawnerSpawn` | `ForceEmplacementSpawnerSpawn` |从固定武器生成器中强制生成当前设置的固定武器。 | emplacementSpawner： EmplacementSpawner |无 | `mod.ForceEmplacementSpawnerSpawn(...);` | `mod.ForceEmplacementSpawnerSpawn(...);` |
| `SetEmplacementSpawnerAbandonVehicleOutOfCombatArea` | `SetEmplacementSpawnerAbandonVehicleOutOfCombatArea` |设置是否销毁留在战斗区域外的固定武器。 | emplacementSpawner： EmplacementSpawner，启用：布尔值 |无 | `mod.SetEmplacementSpawnerAbandonVehicleOutOfCombatArea(...);` | `mod.SetEmplacementSpawnerAbandonVehicleOutOfCombatArea(...);` |
| `SetEmplacementSpawnerApplyDamageToAbandonVehicle` | `SetEmplacementSpawnerApplyDamageToAbandonVehicle` |设置是否对废弃的固定武器施加伤害。 | emplacementSpawner： EmplacementSpawner，启用：布尔值 |无 | `mod.SetEmplacementSpawnerApplyDamageToAbandonVehicle(...);` | `mod.SetEmplacementSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetEmplacementSpawnerAutoSpawn` | `SetEmplacementSpawnerAutoSpawn` |启用或禁用固定武器生成器的自动重生。 | emplacementSpawner： EmplacementSpawner，启用：布尔值 |无 | `mod.SetEmplacementSpawnerAutoSpawn(...);` | `mod.SetEmplacementSpawnerAutoSpawn(...);` |
| `SetEmplacementSpawnerKeepAliveAbandonRadius` | `SetEmplacementSpawnerKeepAliveAbandonRadius` |设置与最近玩家的距离，固定武器将被视为废弃。 | emplacementSpawner: EmplacementSpawner, keepAliveAbandonedRadius: 数字 |无 | `mod.SetEmplacementSpawnerKeepAliveAbandonRadius(...);` | `mod.SetEmplacementSpawnerKeepAliveAbandonRadius(...);` |
| `SetEmplacementSpawnerRespawnTime` | `SetEmplacementSpawnerRespawnTime` |设置固定武器被摧毁后自动重生的秒数。 | emplacementSpawner： EmplacementSpawner，重生时间：数字 |无 | `mod.SetEmplacementSpawnerRespawnTime(...);` | `mod.SetEmplacementSpawnerRespawnTime(...);` |
| `SetEmplacementSpawnerSpawnerRadius` | `SetEmplacementSpawnerSpawnerRadius` |设置固定武器被视为远离生成器的距离。 | emplacementSpawner: EmplacementSpawner, keepAliveSpawnerRadius: 数字 |无 | `mod.SetEmplacementSpawnerSpawnerRadius(...);` | `mod.SetEmplacementSpawnerSpawnerRadius(...);` |
| `SetEmplacementSpawnerTimeUntilAbandon` | `SetEmplacementSpawnerTimeUntilAbandon` |设置固定武器在被遗弃之前保持不使用状态的时间。 | `SetEmplacementSpawnerTimeUntilAbandon` | `SetEmplacementSpawnerTimeUntilAbandon` | | emplacementSpawner: EmplacementSpawner, timeUntilAbandon: 数字 |无 | `mod.SetEmplacementSpawnerTimeUntilAbandon(...);` | `mod.SetEmplacementSpawnerTimeUntilAbandon(...);` |
| `SetEmplacementSpawnerType` | `SetEmplacementSpawnerType` |设置从固定武器生成器发出的固定武器的类型。 | emplacementSpawner: EmplacementSpawner, emplacementType: StationaryEmplacements | emplacementSpawner无 | `mod.SetEmplacementSpawnerType(...);` | `mod.SetEmplacementSpawnerType(...);` |
| `GetEmplacementSpawner` | `GetEmplacementSpawner` |从数字或目标获取 EmplacementSpawner。 |数量： 数量 | `EmplacementSpawner` | `EmplacementSpawner` | `const value = mod.GetEmplacementSpawner(...);` |

## 出击/重生

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `DeployAllPlayers` | `DeployAllPlayers` |强制部署屏幕上的所有玩家出击。 |无 |无 | `mod.DeployAllPlayers(...);` | `mod.DeployAllPlayers(...);` |
| `EnableAllPlayerDeploy` | `EnableAllPlayerDeploy` |切换是否所有玩家都可以从部署屏幕进行部署。 |启用PlayerDeploy：布尔值|无 | `mod.EnableAllPlayerDeploy(...);` | `mod.EnableAllPlayerDeploy(...);` |
| `EnablePlayerDeploy` | `EnablePlayerDeploy` |切换指定玩家是否可以部署。 |玩家：玩家，部署允许：布尔值 |无 | `mod.EnablePlayerDeploy(...);` | `mod.EnablePlayerDeploy(...);` |
| `SetRedeployTime` | `SetRedeployTime` |覆盖指定玩家的重生时间，范围为 0 到 60 秒。 |玩家： 玩家，重新部署时间： number |无 | `mod.SetRedeployTime(...);` | `mod.SetRedeployTime(...);` |
| `UndeployAllPlayers` | `UndeployAllPlayers` |将战场上的所有玩家返回到部署屏幕。 |无 |无 | `mod.UndeployAllPlayers(...);` | `mod.UndeployAllPlayers(...);` |
| `UndeployPlayer` | `UndeployPlayer` |将指定玩家返回到部署屏幕。 |玩家： 玩家 |无 | `mod.UndeployPlayer(...);` | `mod.UndeployPlayer(...);` |
| `DeployPlayer` | `DeployPlayer` |强制指定玩家出击。 |玩家： 玩家 |无 | `mod.DeployPlayer(...);` | `mod.DeployPlayer(...);` |
| `SetSpawnMode` | `SetSpawnMode` |设置生成模式以确定是否自动生成玩家。 |生成模式： 生成模式 |无 | `mod.SetSpawnMode(...);` | `mod.SetSpawnMode(...);` |
| `SpawnPlayerFromSpawnPoint` | `SpawnPlayerFromSpawnPoint` |从指定的 SpawnPoint 出击指定的玩家。 2种类型的霸主。 |玩家：玩家，spawnPointId：数字 |无 | `mod.SpawnPlayerFromSpawnPoint(eventPlayer, mod.GetSpawnPoint(0));` | `mod.SpawnPlayerFromSpawnPoint(eventPlayer, mod.GetSpawnPoint(0));` |

## 游戏进度/团队

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `EndGameMode` | `EndGameMode` |结束游戏模式并使指定的玩家或团队获胜。 0队打平。 2种类型的霸主。 |玩家： 玩家 |无 | `mod.EndGameMode(mod.GetTeam(1));` | `mod.EndGameMode(mod.GetTeam(1));` |
| `PauseGameModeTime` | `PauseGameModeTime` |暂停或恢复游戏模式计时器。 |暂停定时器：布尔值 |无 | `mod.PauseGameModeTime(...);` | `mod.PauseGameModeTime(...);` |
| `ResetGameModeTime` | `ResetGameModeTime` |将游戏模式时间返回到起始值。 |无 |无 | `mod.ResetGameModeTime(...);` | `mod.ResetGameModeTime(...);` |
| `SetFriendlyFire` | `SetFriendlyFire` |启用或禁用友军火力。 |启用FriendlyFire：布尔值|无 | `mod.SetFriendlyFire(...);` | `mod.SetFriendlyFire(...);` |
| `SetGameModeScore` | `SetGameModeScore` |设置指定玩家或球队的游戏模式得分。 2种类型的霸主。 |团队： 团队，新得分： 数量 |无 | `mod.SetGameModeScore(mod.GetTeam(1), 10);` | `mod.SetGameModeScore(mod.GetTeam(1), 10);` |
| `SetGameModeTargetScore` | `SetGameModeTargetScore` |设置用于确定胜利的目标分数。 |新分数： 数字 |无 | `mod.SetGameModeTargetScore(...);` | `mod.SetGameModeTargetScore(...);` |
| `SetGameModeTimeLimit` | `SetGameModeTimeLimit` |设置游戏模式时间限制（以秒为单位）。 | newTimeLimit: 数字 |无 | `mod.SetGameModeTimeLimit(...);` | `mod.SetGameModeTimeLimit(...);` |
| `AutoBalanceTeams` | `AutoBalanceTeams` |自动调整团队成员数量。团队/小队的能力必须匹配。 |无 |无 | `mod.AutoBalanceTeams(...);` | `mod.AutoBalanceTeams(...);` |
| `DisablePlayerJoin` | `DisablePlayerJoin` |停止新加入服务器。根据SDK注释，没有办法恢复，所以使用时要小心。 |无 |无 | `mod.DisablePlayerJoin(...);` | `mod.DisablePlayerJoin(...);` |
| `SwitchTeams` | `SwitchTeams` |交换TeamA 和TeamB 的球员。两队必须拥有相同数量的人类和机器人。 |团队A：团队，团队B：团队|无 | `mod.SwitchTeams(...);` | `mod.SwitchTeams(...);` |
| `GetGameModeScore` | `GetGameModeScore` |获取指定玩家或球队的游戏模式得分。 2种类型的霸主。 |玩家： 玩家 | `number` | `number` | `const value = mod.GetGameModeScore(...);` |
| `GetMatchTimeElapsed` | `GetMatchTimeElapsed` |获取当前游戏模式已经过去的秒数。 |无 | `number` | `number` | `const value = mod.GetMatchTimeElapsed(...);` |
| `GetMatchTimeRemaining` | `GetMatchTimeRemaining` |获取当前游戏模式剩余的秒数。 |无 | `number` | `number` | `const value = mod.GetMatchTimeRemaining(...);` |
| `GetRoundTime` | `GetRoundTime` |获取游戏模式中设置的时间限制（以秒为单位）。 |无 | `number` | `number` | `const value = mod.GetRoundTime(...);` |
| `GetTargetScore` | `GetTargetScore` |获得获胜所需的目标分数。 |无 | `number` | `number` | `const value = mod.GetTargetScore(...);` |

## 目标/游戏模式对象

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `RingOfFireStart` | `RingOfFireStart` |通知RingOfFire开始收缩。 |火环： 火环 |无 | `mod.RingOfFireStart(...);` | `mod.RingOfFireStart(...);` |
| `SetHQTeam` | `SetHQTeam` |设置总部所属队伍。 |总部：总部，团队 ID：团队 |无 | `mod.SetHQTeam(...);` | `mod.SetHQTeam(...);` |
| `SetRingOfFireDamageAmount` | `SetRingOfFireDamageAmount` |设置对陷入火环的玩家造成的伤害量。 | ringOfFireId：RingOfFire，ringOfFireDamageAmount：数字 |无 | `mod.SetRingOfFireDamageAmount(...);` | `mod.SetRingOfFireDamageAmount(...);` |
| `SetRingOfFireStableTime` | `SetRingOfFireStableTime` |设置 RingOfFire 在收缩之前保持稳定的时间。 | ringOfFireId：RingOfFire，ringOfFireStableTime：数字 |无 | `mod.SetRingOfFireStableTime(...);` | `mod.SetRingOfFireStableTime(...);` |
| `EnableCapturePointDeploying` | `EnableCapturePointDeploying` |切换 CapturePoint 所属团队是否可以从那里进行部署。 | capturePoint：CapturePoint，enableDeploying：布尔值|无 | `mod.EnableCapturePointDeploying(...);` | `mod.EnableCapturePointDeploying(...);` |
| `SetCapturePointCapturingTime` | `SetCapturePointCapturingTime` |设置占用CapturePoint 所需的时间。 | capturePoint：捕获点， captureTime：数字 |无 | `mod.SetCapturePointCapturingTime(...);` | `mod.SetCapturePointCapturingTime(...);` |
| `SetCapturePointNeutralizationTime` | `SetCapturePointNeutralizationTime` |设置中和 CapturePoint 所需的时间。 |捕获点：捕获点，中和时间：数字|无 | `mod.SetCapturePointNeutralizationTime(...);` | `mod.SetCapturePointNeutralizationTime(...);` |
| `SetCapturePointOwner` | `SetCapturePointOwner` |更改控制 CapturePoint 的团队。 | capturePoint：CapturePoint，团队：团队 |无 | `mod.SetCapturePointOwner(...);` | `mod.SetCapturePointOwner(...);` |
| `SetMaxCaptureMultiplier` | `SetMaxCaptureMultiplier` |设置CapturePoint占领速度倍增的上限。 | capturePoint：捕获点，乘数：数字 |无 | `mod.SetMaxCaptureMultiplier(...);` | `mod.SetMaxCaptureMultiplier(...);` |
| `EnableHQ` | `EnableHQ` |启用或禁用总部。 | hq：总部，启用：布尔值 |无 | `mod.EnableHQ(...);` | `mod.EnableHQ(...);` |
| `EnableGameModeObjective` | `EnableGameModeObjective` |启用或禁用诸如 CapturePoint、HQ、Sector、MCOM 等目标。目标：CapturePoint \|总部\|扇区\| MCOM，启用：布尔值 |无 | `mod.EnableGameModeObjective(...);` | `mod.EnableGameModeObjective(...);` |
| `SetMCOMFuseTime` | `SetMCOMFuseTime` |设置点火时间直至 MCOM 爆炸。 | mCOM：MCOM，fuseTime：数字 |无 | `mod.SetMCOMFuseTime(...);` | `mod.SetMCOMFuseTime(...);` |
| `SetMCOMOwner` | `SetMCOMOwner` |设置 MCOM 所有权团队。可以安装和删除它的团队将会发生变化。 | mcom：MCOM，teamid：团队 |无 | `mod.SetMCOMOwner(...);` | `mod.SetMCOMOwner(...);` |
| `GetRingOfFire` | `GetRingOfFire` |从号码或目标获取 RingOfFire。 |数量： 数量 | `RingOfFire` | `RingOfFire` | `const value = mod.GetRingOfFire(...);` |
| `AllCapturePoints` | `AllCapturePoints` |以数组形式获取游戏中存在的所有 CapturePoint。 |无 | `Array` | `Array` | `const value = mod.AllCapturePoints(...);` |
| `GetCapturePoint` | `GetCapturePoint` |从数字或目标获取 CapturePoint。 | id: 号码 | `CapturePoint` | `CapturePoint` | `const value = mod.GetCapturePoint(...);` |
| `GetCaptureProgress` | `GetCaptureProgress` |获取指定 CapturePoint 的占领进度，值为 0 到 1 之间的值。捕获点：捕获点 | `number` | `number` | `const value = mod.GetCaptureProgress(...);` |
| `GetCurrentOwnerTeam` | `GetCurrentOwnerTeam` |获取当前拥有指定 CapturePoint 的团队。 |捕获点：捕获点 | `Team` | `Team` | `const value = mod.GetCurrentOwnerTeam(...);` |
| `GetOwnerProgressTeam` | `GetOwnerProgressTeam` |获取当前试图占领指定占领点的队伍。 |捕获点：捕获点 | `Team` | `Team` | `const value = mod.GetOwnerProgressTeam(...);` |
| `GetPlayersOnPoint` | `GetPlayersOnPoint` |获取指定CapturePoint范围内的玩家数组。 |捕获点：捕获点 | `Array` | `Array` | `const value = mod.GetPlayersOnPoint(...);` |
| `GetPreviousOwnerTeam` | `GetPreviousOwnerTeam` |获取指定 CapturePoint 的先前所有权团队。 |捕获点：捕获点 | `Team` | `Team` | `const value = mod.GetPreviousOwnerTeam(...);` |
| `GetHQ` | `GetHQ` |从号码或目标获取总部。 |数量： 数量 | `HQ` | `HQ` | `const value = mod.GetHQ(...);` |
| `GetMCOM` | `GetMCOM` |从号码或目标获取 MCOM。 |数量： 数量 | `MCOM` | `MCOM` | `const value = mod.GetMCOM(...);` |
| `GetSector` | `GetSector` |从数字或目标获取扇区。 |数量： 数量 | `Sector` | `Sector` | `const value = mod.GetSector(...);` |

## 排列/空间对象

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `EnableAreaTrigger` | `EnableAreaTrigger` |启用或禁用区域触发。禁用时，不会触发相应的事件。 | areaTrigger：区域触发器，启用：布尔值 |无 | `mod.EnableAreaTrigger(...);` | `mod.EnableAreaTrigger(...);` |
| `EnableInteractPoint` | `EnableInteractPoint` |启用或禁用 InteractPoint。 |交互点：交互点，启用：布尔值 |无 | `mod.EnableInteractPoint(mod.GetInteractPoint(0), false);` | `mod.EnableInteractPoint(mod.GetInteractPoint(0), false);` |
| `EnableSpatialObject` | `EnableSpatialObject` |启用或禁用 SpatialObject。 |空间对象：空间对象，启用：布尔值 |无 | `mod.EnableSpatialObject(...);` | `mod.EnableSpatialObject(...);` |
| `RayCast` | `RayCast` |请求两点之间的直线判断。在 `OnRayCastHit` / `OnRayCastMissed` 接收结果。 2种类型的霸主。 |玩家：玩家，开始：矢量，停止：矢量 |无 | `mod.RayCast(eventPlayer, start, stop);` | `mod.RayCast(eventPlayer, start, stop);` |
| `SetVL7CloudEffects` | `SetVL7CloudEffects` |单独启用或禁用 VL7Cloud 的屏幕效果、士兵效果和 VFX。 | vl7Cloud：VL7Cloud，screenEffect：布尔值，soldierEffect：布尔值，visualEffect：布尔值 |无 | `mod.SetVL7CloudEffects(...);` | `mod.SetVL7CloudEffects(...);` |
| `UnspawnObject` | `UnspawnObject` |清除使用 `SpawnObject` 创建的对象。 | obj：mod.Object |无 | `mod.UnspawnObject(...);` |
| `MoveObject` | `MoveObject` |通过位置差异和旋转差异（如果需要）移动指定对象。 2种类型的霸主。 |对象：mod.Object，positionDelta：向量 |无 | `mod.MoveObject(...);` | `mod.MoveObject(...);` |
| `MoveObjectOverTime` | `MoveObjectOverTime` |随着时间的推移，将指定对象移动位置/旋转差。您还可以指定循环和反转。 |对象：mod.Object，positionDelta：向量，rotationDelta：向量，timeInSeconds：数字，shouldLoop：布尔值，shouldReverse：布尔值 |无 | `mod.MoveObjectOverTime(...);` | `mod.MoveObjectOverTime(...);` |
| `OrbitObjectOverTime` | `OrbitObjectOverTime` |随着时间的推移围绕变换旋转指定对象。 2种类型的霸主。 |对象：mod.Object，orbitTransform：变换，timeInSeconds：数字，半径：数字，shouldLoop：布尔值，shouldReverse：布尔值，顺时针：布尔值|无 | `mod.OrbitObjectOverTime(...);` | `mod.OrbitObjectOverTime(...);` |
| `RotateObject` | `RotateObject` |将指定对象旋转欧拉角差。 |对象：mod.Object，rotationDelta：向量|无 | `mod.RotateObject(...);` | `mod.RotateObject(...);` |
| `SetObjectTransform` | `SetObjectTransform` |设置指定对象的Transform。 |对象：mod.Object，变换：变换 |无 | `mod.SetObjectTransform(...);` | `mod.SetObjectTransform(...);` |
| `SetObjectTransformOverTime` | `SetObjectTransformOverTime` |随着时间的推移，将指定的对象移动并旋转到指定的变换。 |对象：mod.Object，变换：变换，timeInSeconds：数字，shouldLoop：布尔值，shouldReverse：布尔值 |无 | `mod.SetObjectTransformOverTime(...);` | `mod.SetObjectTransformOverTime(...);` |
| `StopActiveMovementForObject` | `StopActiveMovementForObject` |停止指定对象上正在进行的时间移动。 |对象：mod.Object |无 | `mod.StopActiveMovementForObject(...);` | `mod.StopActiveMovementForObject(...);` |
| `GetAreaTrigger` | `GetAreaTrigger` |从数字或目标获取区域触发器。 |区域触发编号: 数字 | `AreaTrigger` | `AreaTrigger` | `const area = mod.GetAreaTrigger(0);` |
| `GetInteractPoint` | `GetInteractPoint` |从数字或目标获取 InteractPoint。 |交互点编号：数字 | `InteractPoint` | `InteractPoint` | `const point = mod.GetInteractPoint(0);` |
| `GetSpatialObject` | `GetSpatialObject` |从数字或目标获取 SpatialObject。 |空间对象编号： 数字 | `SpatialObject` | `SpatialObject` | `const value = mod.GetSpatialObject(...);` |
| `SpawnObject` | `SpawnObject` |在指定坐标处生成运行时生成预制件。不受支持的对象的返回值可能为 `-1`。 2种类型的霸主。 |预制枚举：\| RuntimeSpawn_Common \| RuntimeSpawn_Abbasid \| RuntimeSpawn_Aftermath \| RuntimeSpawn_Badlands \| RuntimeSpawn_Battery \| RuntimeSpawn_Capstone \| RuntimeSpawn_Contaminate \| RuntimeSpawn_Dumbo \| RuntimeSpawn_Eastwood \| RuntimeSpawn_FireStorm \| RuntimeSpawn_Limestone \| RuntimeSpawn_Outskirts \| RuntimeSpawn_Subsurface \| RuntimeSpawn_Tungsten \| RuntimeSpawn_Granite_Downtown \| RuntimeSpawn_Granite_Marina \| RuntimeSpawn_Granite_MilitaryRnD \| RuntimeSpawn_Granite_MilitaryStorage \| RuntimeSpawn_Granite_ResidentialNorth \| RuntimeSpawn_Granite_TechCenter \| RuntimeSpawn_Granite_Underground \| RuntimeSpawn_Sand，位置：矢量，旋转：矢量，比例：矢量 | `Any` | `const obj = mod.SpawnObject(prefab, pos, rot, scale);` | `const obj = mod.SpawnObject(prefab, pos, rot, scale);` |
| `GetObjectPosition` | `GetObjectPosition` |以 Vector 形式获取指定对象的当前位置。 |对象：mod.Object | `Vector` | `Vector` | `const value = mod.GetObjectPosition(...);` |
| `GetObjectRotation` | `GetObjectRotation` |以向量形式获取指定对象的当前旋转。 |对象：mod.Object | `Vector` | `Vector` | `const value = mod.GetObjectRotation(...);` |
| `GetObjectTransform` | `GetObjectTransform` |获取包含指定对象的位置和旋转的 Transform。 |对象：mod.Object | `Transform` | `Transform` | `const value = mod.GetObjectTransform(...);` |
| `GetTransformPosition` | `GetTransformPosition` |从变换中提取位置向量。 |变换：变换| `Vector` | `Vector` | `const value = mod.GetTransformPosition(...);` |
| `GetTransformRotation` | `GetTransformRotation` |从变换中提取旋转向量。 |变换：变换| `Vector` | `Vector` | `const value = mod.GetTransformRotation(...);` |

## 路线/补给品

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `SpawnLoot` | `SpawnLoot` |在 LootSpawner 中生成弹药、武器、小工具和盔甲。 4种类型的霸主。 | lootSpawner：LootSpawner，弹药：AmmoTypes |无 | `mod.SpawnLoot(...);` | `mod.SpawnLoot(...);` |
| `UnspawnAllLoot` | `UnspawnAllLoot` |删除世界上现有的所有路线。 |无 |无 | `mod.UnspawnAllLoot(...);` | `mod.UnspawnAllLoot(...);` |
| `GetLootSpawner` | `GetLootSpawner` |从号码或目标中获取 LootSpawner。 |数量： 数量 | `LootSpawner` | `LootSpawner` | `const value = mod.GetLootSpawner(...);` |

## 健康/伤害/状态

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `DealDamage` | `DealDamage` |对指定玩家或车辆造成损坏。如有必要，您还可以指定造成伤害的玩家。 3种类型的霸主。 |玩家：玩家，伤害金额：数量 |无 | `mod.DealDamage(...);` | `mod.DealDamage(...);` |
| `ForceRevive` | `ForceRevive` |强行复活倒地的玩家。 |玩家： 玩家 |无 | `mod.ForceRevive(...);` | `mod.ForceRevive(...);` |
| `Heal` | `Heal` |治愈或修理指定的玩家或车辆。如有必要，您还可以指定治疗师。 3种类型的霸主。 |玩家：玩家，治愈量：数量 |无 | `mod.Heal(...);` | `mod.Heal(...);` |
| `Kill` | `Kill` |立即杀死指定的玩家或车辆。玩家跳过状态。 2种类型的霸主。 |玩家： 玩家 |无 | `mod.Kill(...);` | `mod.Kill(...);` |
| `SetSoldierEffect` | `SetSoldierEffect` |启用或禁用指定玩家的士兵效果。 |玩家：玩家，士兵效果：SoldierEffects，isEnabled：boolean |无 | `mod.SetSoldierEffect(...);` | `mod.SetSoldierEffect(...);` |
| `SpotTarget` | `SpotTarget` |发现指定的玩家。您可以指定显示时间、地点状态和地点。 5种霸主。 | targetplayer：玩家，持续时间：数字，spotStatus：SpotStatus |无 | `mod.SpotTarget(...);` | `mod.SpotTarget(...);` |
| `SetPlayerIncomingDamageFactor` | `SetPlayerIncomingDamageFactor` |设置指定玩家受到的伤害倍数。值四舍五入到最接近的 5%，并限制在 0 到 200%。 |玩家： 玩家，金额： 数量 |无 | `mod.SetPlayerIncomingDamageFactor(...);` | `mod.SetPlayerIncomingDamageFactor(...);` |
| `ForceManDown` | `ForceManDown` |放下指定的玩家。如果禁用了 down，则不适用。 |玩家： 玩家 |无 | `mod.ForceManDown(...);` | `mod.ForceManDown(...);` |
| `SetPlayerMaxHealth` | `SetPlayerMaxHealth` |设置指定玩家的最大生命值，范围为1到500。最大体力倍数也会反映出来。 |玩家：玩家，最大生命值：数字 |无 | `mod.SetPlayerMaxHealth(...);` | `mod.SetPlayerMaxHealth(...);` |
| `SetPlayerMovementSpeedMultiplier` | `SetPlayerMovementSpeedMultiplier` |设置指定玩家的移动速度倍数。 |玩家：玩家，乘数：数量 |无 | `mod.SetPlayerMovementSpeedMultiplier(...);` | `mod.SetPlayerMovementSpeedMultiplier(...);` |
| `SkipManDown` | `SkipManDown` |设置指定玩家死亡时是否不经过down状态返回部署界面。 |玩家：玩家，skipManDown：boolean |无 | `mod.SkipManDown(...);` | `mod.SkipManDown(...);` |

## 装备/输入/玩家操作

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `Teleport` | `Teleport` |将指定的玩家或车辆移动到具有方向的有效坐标。以弧度指定方向。 2种类型的霸主。 |玩家：玩家，目的地：矢量，方向：数字|无 | `mod.Teleport(eventPlayer, destination, 0);` | `mod.Teleport(eventPlayer, destination, 0);` |
| `EnableAllInputRestrictions` | `EnableAllInputRestrictions` |切换指定玩家的移动、拍摄、视点操作等所有输入限制。 |玩家：玩家，限制输入：boolean |无 | `mod.EnableAllInputRestrictions(...);` | `mod.EnableAllInputRestrictions(...);` |
| `EnableInputRestriction` | `EnableInputRestriction` |限制或取消特定玩家的特定输入。 |玩家：玩家，输入限制：RestrictedInputs，restrictInput：boolean |无 | `mod.EnableInputRestriction(...);` | `mod.EnableInputRestriction(...);` |
| `AddAttachmentToWeaponPackage` | `AddAttachmentToWeaponPackage` |将附件添加到 WeaponPackage。现有的同类型附件将被替换。 |附件：WeaponAttachments、 WeaponPackage：WeaponPackage |无 | `mod.AddAttachmentToWeaponPackage(...);` | `mod.AddAttachmentToWeaponPackage(...);` |
| `AddEquipment` | `AddEquipment` |将武器、小工具和盔甲添加到玩家的装备中。 7种霸主。 |玩家：玩家，武器：武器 |无 | `mod.AddEquipment(...);` | `mod.AddEquipment(...);` |
| `ForceSwitchInventory` | `ForceSwitchInventory` |强制指定玩家切换到指定的物品栏位置。 |玩家：玩家，库存槽位：库存槽位 |无 | `mod.ForceSwitchInventory(...);` | `mod.ForceSwitchInventory(...);` |
| `RemoveEquipment` | `RemoveEquipment` |从玩家的装备中移除指定的插槽、武器或小工具。 3种类型的霸主。 |玩家：玩家，库存槽位：库存槽位 |无 | `mod.RemoveEquipment(...);` | `mod.RemoveEquipment(...);` |
| `SetInventoryAmmo` | `SetInventoryAmmo` |设置指定库存槽中的子弹数量。 |玩家：玩家，库存槽位：库存槽位，弹药：数量 |无 | `mod.SetInventoryAmmo(...);` | `mod.SetInventoryAmmo(...);` |
| `SetInventoryMagazineAmmo` | `SetInventoryMagazineAmmo` |设置指定库存槽位的弹匣中的子弹数量。 |玩家：玩家，inventorySlots：InventorySlots，magAmmo：数量 |无 | `mod.SetInventoryMagazineAmmo(...);` | `mod.SetInventoryMagazineAmmo(...);` |
| `Resupply` | `Resupply` |为玩家提供指定的供给类型。 |玩家：玩家，补给类型：补给类型 |无 | `mod.Resupply(...);` | `mod.Resupply(...);` |
| `CreateNewWeaponPackage` | `CreateNewWeaponPackage` |创建一个新的武器包。 |无 | `WeaponPackage` | `WeaponPackage` | `const value = mod.CreateNewWeaponPackage(...);` |
| `EventDamageTypeCompare` | `EventDamageTypeCompare` |判断事件中传入的DamageType是否与指定的损坏类型匹配。 | DamageType：DamageType，playerDamageTypes：PlayerDamageTypes | `boolean` | `boolean` | `const value = mod.EventDamageTypeCompare(...);` |
| `EventDeathTypeCompare` | `EventDeathTypeCompare` |判断事件中传入的DeathType是否与指定的死亡类型匹配。 | DeathType：DeathType，playerDeathTypes：PlayerDeathTypes | `boolean` | `boolean` | `const value = mod.EventDeathTypeCompare(...);` |
| `EventWeaponCompare` | `EventWeaponCompare` |判断活动中给出的武器和小玩意是否与指定装备相符。 2种类型的霸主。 |事件武器：武器解锁，武器：武器 | `boolean` | `boolean` | `if (mod.EventWeaponCompare(eventWeaponUnlock, mod.Weapons.AK24)) {}` |
| `GetInventoryAmmo` | `GetInventoryAmmo` |获取指定玩家指定槽位内的子弹数量。 |玩家：玩家、库存插槽：库存插槽 | `number` | `number` | `const value = mod.GetInventoryAmmo(...);` |
| `GetInventoryMagazineAmmo` | `GetInventoryMagazineAmmo` |获取指定玩家指定槽位弹匣内的子弹数量。 |玩家：玩家、库存插槽：库存插槽 | `number` | `number` | `const value = mod.GetInventoryMagazineAmmo(...);` |
| `GetSoldierState` | `GetSoldierState` |获取指定玩家的士兵状态，为数值、布尔值或向量。 3种类型的霸主。 |玩家：玩家，士兵状态编号：士兵状态编号 | `number` | `number` | `const value = mod.GetSoldierState(...);` |
| `HasEquipment` | `HasEquipment` |确定指定玩家是否拥有指定的武器或小工具。 2种类型的霸主。 |玩家：玩家，武器：武器 | `boolean` | `boolean` | `if (mod.HasEquipment(eventPlayer, mod.Weapons.AK24)) {}` |
| `IsInventorySlotActive` | `IsInventorySlotActive` |确定指定玩家是否正在使用指定的物品栏位。 |玩家：玩家、库存插槽：库存插槽 | `boolean` | `boolean` | `const value = mod.IsInventorySlotActive(...);` |
| `IsSoldierClass` | `IsSoldierClass` |判断指定玩家是否为指定军种。 |玩家：玩家、士兵类别：士兵类别| `boolean` | `boolean` | `const value = mod.IsSoldierClass(...);` |

## 车辆

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `ForceVehicleSpawnerSpawn` | `ForceVehicleSpawnerSpawn` |从 VehicleSpawner 强制生成当前配置的车辆。 |车辆Spawner：车辆Spawner |无 | `mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(0));` | `mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(0));` |
| `SetAllVehiclesAllowedInSurroundingArea` | `SetAllVehiclesAllowedInSurroundingArea` |设置是否允许周边所有车辆通行。 |允许：布尔值 |无 | `mod.SetAllVehiclesAllowedInSurroundingArea(...);` | `mod.SetAllVehiclesAllowedInSurroundingArea(...);` |
| `SetMaxVehicleHeightLimitScale` | `SetMaxVehicleHeightLimitScale` |设置车辆发动机失去向上推力的高度限制乘数。 | heightScale: 数字 |无 | `mod.SetMaxVehicleHeightLimitScale(...);` | `mod.SetMaxVehicleHeightLimitScale(...);` |
| `SetVehicleAllowedInSurroundingArea` | `SetVehicleAllowedInSurroundingArea` |设置是否允许指定车辆在周边区域行驶。 |车辆：VehicleList，允许：boolean |无 | `mod.SetVehicleAllowedInSurroundingArea(...);` | `mod.SetVehicleAllowedInSurroundingArea(...);` |
| `SetVehicleCategoryAllowedInSurroundingArea` | `SetVehicleCategoryAllowedInSurroundingArea` |设置是否允许指定车辆类别进入周边区域。 |车辆类别：车辆类别，允许：布尔值 |无 | `mod.SetVehicleCategoryAllowedInSurroundingArea(...);` | `mod.SetVehicleCategoryAllowedInSurroundingArea(...);` |
| `SetVehicleSpawnerAbandonVehiclesOutOfCombatArea` | `SetVehicleSpawnerAbandonVehiclesOutOfCombatArea` |设置是否摧毁留在战斗区域外的车辆。 | VehicleSpawner：VehicleSpawner，启用：布尔值|无 | `mod.SetVehicleSpawnerAbandonVehiclesOutOfCombatArea(...);` | `mod.SetVehicleSpawnerAbandonVehiclesOutOfCombatArea(...);` |
| `SetVehicleSpawnerApplyDamageToAbandonVehicle` | `SetVehicleSpawnerApplyDamageToAbandonVehicle` |设置是否对废弃车辆施加伤害。 | VehicleSpawner：VehicleSpawner，启用：布尔值|无 | `mod.SetVehicleSpawnerApplyDamageToAbandonVehicle(...);` | `mod.SetVehicleSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetVehicleSpawnerAutoSpawn` | `SetVehicleSpawnerAutoSpawn` |启用或禁用 VehicleSpawner 的自动重生。 | VehicleSpawner：VehicleSpawner，启用：布尔值|无 | `mod.SetVehicleSpawnerAutoSpawn(...);` | `mod.SetVehicleSpawnerAutoSpawn(...);` |
| `SetVehicleSpawnerKeepAliveAbandonRadius` | `SetVehicleSpawnerKeepAliveAbandonRadius` |设置距最近玩家的距离，达到该距离车辆将被视为废弃。 | VehicleSpawner：VehicleSpawner，keepAliveAbandonedRadius：数量|无 | `mod.SetVehicleSpawnerKeepAliveAbandonRadius(...);` | `mod.SetVehicleSpawnerKeepAliveAbandonRadius(...);` |
| `SetVehicleSpawnerKeepAliveSpawnerRadius` | `SetVehicleSpawnerKeepAliveSpawnerRadius` |设置车辆被视为远离生成器的距离。 |车辆Spawner：车辆Spawner，keepAliveSpawnerRadius：数字|无 | `mod.SetVehicleSpawnerKeepAliveSpawnerRadius(...);` | `mod.SetVehicleSpawnerKeepAliveSpawnerRadius(...);` |
| `SetVehicleSpawnerRespawnTime` | `SetVehicleSpawnerRespawnTime` |设置车辆被摧毁后直到自动重生的秒数。 | VehicleSpawner：VehicleSpawner，重生时间：数字 |无 | `mod.SetVehicleSpawnerRespawnTime(...);` | `mod.SetVehicleSpawnerRespawnTime(...);` |
| `SetVehicleSpawnerTimeUntilAbandon` | `SetVehicleSpawnerTimeUntilAbandon` |设置车辆在被视为废弃之前保持未使用状态的时间。 | VehicleSpawner：VehicleSpawner，timeUntilAbandon：数字 |无 | `mod.SetVehicleSpawnerTimeUntilAbandon(...);` | `mod.SetVehicleSpawnerTimeUntilAbandon(...);` |
| `SetVehicleSpawnerVehicleType` | `SetVehicleSpawnerVehicleType` |设置从 VehicleSpawner 发出的车辆类型。 | VehicleSpawner：VehicleSpawner，车辆类型：VehicleList |无 | `mod.SetVehicleSpawnerVehicleType(...);` | `mod.SetVehicleSpawnerVehicleType(...);` |
| `SetVehicleMaxHealthMultiplier` | `SetVehicleMaxHealthMultiplier` |将指定车辆的最大耐久性乘数设置为大于 0 且小于或等于 4 的值。 |车辆：车辆，maxHealthMultiplier：数字 |无 | `mod.SetVehicleMaxHealthMultiplier(...);` | `mod.SetVehicleMaxHealthMultiplier(...);` |
| `ForcePlayerExitVehicle` | `ForcePlayerExitVehicle` |将指定玩家强行从车辆上移走。 | `ForcePlayerExitVehicle` | `ForcePlayerExitVehicle` | 3种类型的霸主。 |玩家：玩家，车辆：车辆 |无 | `mod.ForcePlayerExitVehicle(...);` | `mod.ForcePlayerExitVehicle(...);` |
| `ForcePlayerToSeat` | `ForcePlayerToSeat` |强制指定玩家坐在指定车辆座位上。 | `ForcePlayerToSeat` | `ForcePlayerToSeat` |如果座位号为-1，则使用空座位。 |玩家：玩家，车辆：车辆，座位编号：数量 |无 | `mod.ForcePlayerToSeat(...);` | `mod.ForcePlayerToSeat(...);` |
| `GetVehicleSpawner` | `GetVehicleSpawner` |从数字或目标中获取VehicleSpawner。 |数量： 数量 | `VehicleSpawner` | `VehicleSpawner` | `const value = mod.GetVehicleSpawner(...);` |
| `AllVehicles` | `AllVehicles` |将游戏中的所有车辆作为数组获取。 |无 | `Array` | `Array` | `const vehicles = mod.AllVehicles();` |
| `CompareVehicleName` | `CompareVehicleName` |判断指定的车辆是否与指定的VehicleList类型相同。 |车辆：车辆，车辆列表：车辆列表 | `boolean` | `boolean` | `const value = mod.CompareVehicleName(...);` |
| `GetVehicleFromPlayer` | `GetVehicleFromPlayer` |获取指定玩家所乘坐的车辆。 |玩家： 玩家 | `Vehicle` | `Vehicle` | `const vehicle = mod.GetVehicleFromPlayer(eventPlayer);` |
| `GetVehicleSeatCount` | `GetVehicleSeatCount` |获取指定车辆的座位数。 |车辆： 车辆 | `number` | `number` | `const value = mod.GetVehicleSeatCount(...);` |
| `GetVehicleState` | `GetVehicleState` |获取指定车辆的状态向量。 |车辆：车辆，车辆状态向量：车辆状态向量 | `Vector` | `Vector` | `const value = mod.GetVehicleState(...);` |
| `GetVehicleTeam` | `GetVehicleTeam` |获取指定车辆所属的车队。无人车辆将被视为中立车辆。 |车辆： 车辆 | `Team` | `Team` | `const value = mod.GetVehicleTeam(...);` |
| `IsVehicleOccupied` | `IsVehicleOccupied` |判断玩家是否乘坐指定车辆。 |车辆： 车辆 | `boolean` | `boolean` | `const value = mod.IsVehicleOccupied(...);` |
| `IsVehicleSeatOccupied` | `IsVehicleSeatOccupied` |判断指定车辆的预留座位是否正在使用。 |车辆： 车辆，数量： 数量 | `boolean` | `boolean` | `const value = mod.IsVehicleSeatOccupied(...);` |
| `GetAllPlayersInVehicle` | `GetAllPlayersInVehicle` |获取指定车辆中的所有玩家作为数组。 |车辆： 车辆 | `Array` | `Array` | `const value = mod.GetAllPlayersInVehicle(...);` |
| `GetPlayerFromVehicleSeat` | `GetPlayerFromVehicleSeat` |让玩家坐在指定车辆的指定座位上。如果座位是空的，则成为无效玩家。 |车辆： 车辆，数量： 数量 | `Player` | `Player` | `const value = mod.GetPlayerFromVehicleSeat(...);` |
| `GetPlayerVehicleSeat` | `GetPlayerVehicleSeat` |获取指定玩家的车辆座位号。如果在车外，则为 -1。 |玩家： 玩家 | `number` | `number` | `const value = mod.GetPlayerVehicleSeat(...);` |

## 世界图标

|功能|功能/目的|主要论点|返回值 |使用示例 |
| --- | --- | --- | --- | --- |
| `EnableWorldIconImage` | `EnableWorldIconImage` |启用或禁用 WorldIcon 图像显示。 | worldIcon：世界图标，enableImage：布尔值 |无 | `mod.EnableWorldIconImage(...);` | `mod.EnableWorldIconImage(...);` |
| `EnableWorldIconText` | `EnableWorldIconText` |启用或禁用 WorldIcon 上的文本显示。 | worldIcon：世界图标，enableText：布尔值 |无 | `mod.EnableWorldIconText(...);` | `mod.EnableWorldIconText(...);` |
| `RemoveUIIcon` | `RemoveUIIcon` |删除附加到该对象的 UI 图标小部件。您还可以指定目标球员或球队。 2种类型的霸主。 | objectWithIcon：mod.Object |无 | `mod.RemoveUIIcon(...);` | `mod.RemoveUIIcon(...);` |
| `SetWorldIconColor` | `SetWorldIconColor` |更改世界图标的颜色。 | worldIcon：世界图标，新颜色：矢量 |无 | `mod.SetWorldIconColor(...);` | `mod.SetWorldIconColor(...);` |
| `SetWorldIconImage` | `SetWorldIconImage` |更改 WorldIcon 的图像类型。 | worldIcon：WorldIcon，newImage：WorldIconImages |无 | `mod.SetWorldIconImage(...);` | `mod.SetWorldIconImage(...);` |
| `SetWorldIconOwner` | `SetWorldIconOwner` |限制 WorldIcon 仅对特定团队或玩家可见。 2种类型的霸主。 | worldIcon：WorldIcon，newTeamOwner：团队|无 | `mod.SetWorldIconOwner(...);` | `mod.SetWorldIconOwner(...);` |
| `SetWorldIconPosition` | `SetWorldIconPosition` |更改 WorldIcon 的显示位置。 | worldIcon：世界图标，newPosition：矢量 |无 | `mod.SetWorldIconPosition(...);` | `mod.SetWorldIconPosition(...);` |
| `SetWorldIconText` | `SetWorldIconText` |更改 WorldIcon 上的文本。显示文本在 `Strings.json` 注册，然后在 `mod.stringkeys` 引用。 | worldIcon：世界图标，newText：消息 |无 | `mod.SetWorldIconText(icon, mod.Message(mod.stringkeys.pointA));` | `mod.SetWorldIconText(icon, mod.Message(mod.stringkeys.pointA));` |
| `GetWorldIcon` | `GetWorldIcon` |从数字或目标获取 WorldIcon。 | worldIconNumber: 数字 | `WorldIcon` | `WorldIcon` | `const icon = mod.GetWorldIcon(0);` |

# 下一个要阅读的附录

UI、通知、玩家引用、数组、ObjId、数字、类型和最小模板分为以下“附录 A-3：操作/值获取列表（UI/引用/值）”。
