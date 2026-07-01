---
title: "附录 A-2：动作/值获取列表（基本操作）"
free: true
---

# 动作与值获取列表

这里，从 `mod.` 调用的函数是按用途排列的。有些名称与 Portal 的块名称类似，但 TypeScript 有严格的类型，因此你需要传递 `Player`、`Team`、`Vector`、`Message`、`UIWidget` 等类型。

具有相同名称和多个参数模式的函数聚集在一行上，重载数量写在函数/用途列中。要获得完整的签名，请在 `index.d.ts` 中搜索函数名称。

## 变量 / 等待 / 子例程

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `Wait` | 等待指定的秒数。由于它是一个异步过程，因此将其与 `await` 结合起来。 | n: number | `Promise<void>` | `await mod.Wait(1);` |
| `SetVariable` | 将值保存到指定变量。阶段、分数和标志管理的基础知识。 | variable: Variable, value: Any | 无 | `mod.SetVariable(mod.GlobalVariable(0), 1);` |
| `SetVariableAtIndex` | 初始化或获取Variable中的数组并将值保存到指定索引。 | arrayVariable: Variable, arrayIndex: number, value: Any | 无 | `mod.SetVariableAtIndex(mod.GlobalVariable(1), 0, eventPlayer);` |
| `ChaseVariableAtRate` | 每秒将变量的值向极限值移动指定的量。 | variable: Variable, limit: number, deltaPerSecond: number | 无 | `mod.ChaseVariableAtRate(...);` |
| `ChaseVariableOverTime` | 在指定的秒数内使变量的值接近极限值。 | variable: Variable, limit: number, durationSeconds: number | 无 | `mod.ChaseVariableOverTime(...);` |
| `StopChasingVariable` | 停止正在进行的变量跟踪并停止在当前值。 | variable: Variable | 无 | `mod.StopChasingVariable(...);` |
| `GetArgument` | 按编号获取子例程参数。 | subroutineArgIndex: number | `Any` | `const value = mod.GetArgument(...);` |
| `GetVariable` | 获取存储在变量中的当前值。 | variable: Variable | `Any` | `const phase = mod.GetVariable(mod.GlobalVariable(0));` |
| `GlobalVariable` | 获取指定编号的全局变量。 | variableIndex: number | `Variable` | `const phase = mod.GlobalVariable(0);` |
| `ObjectVariable` | 获取与指定对象关联的变量。 | ownerObject: mod.Object, variableIndex: number | `Variable` | `const flag = mod.ObjectVariable(eventPlayer, 0);` |

## AI 控制

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `AIBattlefieldBehavior` | 让AI 士兵自主行动，让他们完成目标并向敌人射击。仅供AI玩家使用。 | player: Player | 无 | `mod.AIBattlefieldBehavior(...);` |
| `AIDefendPositionBehavior` | 让AI 士兵保卫指定位置周围的区域。仅供AI玩家使用。 | player: Player, defendPosition: Vector, minDistance: number, maxDistance: number | 无 | `mod.AIDefendPositionBehavior(...);` |
| `AIIdleBehavior` | 将AI 士兵当前所在位置设置为待命点。仅供AI玩家使用。 | player: Player | 无 | `mod.AIIdleBehavior(...);` |
| `AILOSMoveToBehavior` | 将AI 士兵移动到指定位置，同时保持视线。仅供AI玩家使用。 | player: Player, position: Vector | 无 | `mod.AILOSMoveToBehavior(...);` |
| `AIMoveToBehavior` | 给AI 士兵一个目的地，移动到指定的坐标。仅供AI玩家使用。 | player: Player, position: Vector | 无 | `mod.AIMoveToBehavior(...);` |
| `AIParachuteBehavior` | 让AI 士兵做一个跳伞动作。仅供AI玩家使用。 | player: Player | 无 | `mod.AIParachuteBehavior(...);` |
| `AIValidatedMoveToBehavior` | 将 AI 士兵移至导航网格上的有效邻近位置。仅供AI玩家使用。 | player: Player, position: Vector | 无 | `mod.AIValidatedMoveToBehavior(...);` |
| `AIWaypointIdleBehavior` | 让AI 士兵巡逻航点路径。仅供AI玩家使用。 | player: Player, waypointPath: WaypointPath | 无 | `mod.AIWaypointIdleBehavior(...);` |
| `SetAiInput` | 在一段时间内向 AI 士兵发送指定的输入。最多可同时指定 3 个输入。 | player: Player, input: AiInput, duration: number | 无 | `mod.SetAiInput(...);` |
| `AISetUnspawnOnDead` | 设置从Spawner 生成的AI 士兵死亡后是否离开。 | spawner: Spawner, enableUnspawnOnDead: boolean | 无 | `mod.AISetUnspawnOnDead(...);` |
| `SetUnspawnDelayInSeconds` | 设置从Spawner发送的AI 士兵死亡后退场的秒数。 | spawner: Spawner, delay: number | 无 | `mod.SetUnspawnDelayInSeconds(...);` |
| `SpawnAIFromAI Spawner` | 从指定的 AI Spawner中生成一名 AI 士兵。 8 种重载。 | spawner: Spawner | 无 | `mod.SpawnAIFromAI Spawner(mod.GetSpawner(0));` |
| `UnspawnAllAIsFromAI Spawner` | 移除指定 AI Spawner 生成的所有 AI 士兵。 | spawner: Spawner | 无 | `mod.UnspawnAllAIsFromAI Spawner(...);` |
| `AIEnableShooting` | 切换AI 士兵是否可以射击。仅供AI玩家使用。 2 种重载。 | player: Player | 无 | `mod.AIEnableShooting(...);` |
| `AIEnableTargeting` | 切换AI 士兵的索敌 / 目标识别。如果禁用它，它就不会再射击。 2 种重载。 | player: Player | 无 | `mod.AIEnableTargeting(...);` |
| `AIForceFire` | 强制AI 士兵在指定时间内使用手持武器和Gadget。 | player: Player, fireDuration: number | 无 | `mod.AIForceFire(...);` |
| `AIGadgetSettings` | 调整AI 士兵的Gadget使用条件、冷却时间和精度修正。 | player: Player, applyUsageCriteria: boolean, applyCoolDownAfterUse: boolean, applyInaccuracy: boolean | 无 | `mod.AIGadgetSettings(...);` |
| `AISetFocusPoint` | 设置AI 士兵的注视点，并在必要时让它攻击那里。 | player: Player, point: Vector, isTarget: boolean | 无 | `mod.AISetFocusPoint(...);` |
| `AISetMoveSpeed` | 设置AI 士兵的移动行为的速度。 | player: Player, moveSpeed: MoveSpeed | 无 | `mod.AISetMoveSpeed(...);` |
| `AISetStance` | 设置AI 士兵的姿势。 | player: Player, stance: Stance | 无 | `mod.AISetStance(...);` |
| `AISetTarget` | 设置或清除AI 士兵的当前目标。 2 种重载。 | aiPlayer: Player, targetPlayer: Player | 无 | `mod.AISetTarget(...);` |
| `AIStartUsingGadget` | 让AI 士兵在指定位置或指定玩家使用特定Gadget。 2 种重载。 | player: Player, gadget: Gadgets, targetPos: Vector | 无 | `mod.AIStartUsingGadget(...);` |
| `AIStopUsingGadget` | 取消给AI 士兵的Gadget使用说明。 | player: Player | 无 | `mod.AIStopUsingGadget(...);` |
| `SetAIToHumanDamageModifier` | 设置AI给予人类玩家的伤害倍数。 | damageMultiplier: number | 无 | `mod.SetAIToHumanDamageModifier(...);` |

## 声音 / 音乐 / VO

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `LoadMusic` | 加载音乐包并使其可在 `PlayMusic` 上播放。 | musicPackage: MusicPackages | 无 | `mod.LoadMusic(...);` |
| `PlayMusic` | 播放音乐事件。你可以指定全体、队伍、小队或玩家作为对象。 4 种重载。 | musicEvent: MusicEvents | 无 | `mod.PlayMusic(...);` |
| `PlaySound` | 播放音效。你可以指定目标、位置和衰减范围。 8 种重载。 | sound: SFX, amplitude: number, team: Team | 无 | `mod.PlaySound(mod.GetSFX(0), 1);` |
| `PlayVO` | 播放 VO 音频事件。你可以指定全体、队伍、小队或玩家作为对象。 4 种重载。 | voiceOver: VO, event: VoiceOverEvents2D, flag: VoiceOverFlags | 无 | `mod.PlayVO(...);` |
| `SetMusicParam` | 更新加载的音乐包的参数值。 4 种重载。 | musicParam: MusicParams, paramValue: number | 无 | `mod.SetMusicParam(...);` |
| `SetSoundAmplitude` | 更改指定 SFX 的音量。你可以指定全体、队伍、小队或玩家作为对象。 4 种重载。 | sound: SFX, amplitude: number, team: Team | 无 | `mod.SetSoundAmplitude(...);` |
| `StopSound` | 停止指定的 SFX。你可以指定全体、队伍、小队或玩家作为对象。 4 种重载。 | sound: SFX, team: Team | 无 | `mod.StopSound(...);` |
| `UnloadMusic` | 释放加载的音乐包。 | musicPackage: MusicPackages | 无 | `mod.UnloadMusic(...);` |

## 相机 / 演出

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `SetCameraTypeForAll` | 为所有玩家设置相机类型。如有必要，还需指定相机索引。 2 种重载。 | cameraType: Cameras | 无 | `mod.SetCameraTypeForAll(...);` |
| `SetCameraTypeForPlayer` | 设置指定玩家的摄像头类型。如有必要，还需指定相机索引。 2 种重载。 | player: Player, cameraType: Cameras | 无 | `mod.SetCameraTypeForPlayer(...);` |
| `SetFreeCameraCollisionForAll` | 启用或禁用所有玩家的 Free Camera 碰撞。 | enabled: boolean | 无 | `mod.SetFreeCameraCollisionForAll(true);` |
| `SetFreeCameraCollisionForPlayer` | 启用或禁用指定玩家的 Free Camera 碰撞。 | player: Player, enabled: boolean | 无 | `mod.SetFreeCameraCollisionForPlayer(player, true);` |
| `SetThirdPersonCameraPositionForAll` | 设置所有玩家的第三人称相机距离、高度和肩部偏移。 | followDistance: number, followHeight: number, shoulderOffset: number | 无 | `mod.SetThirdPersonCameraPositionForAll(2.5, 0.2, 0.6);` |
| `SetThirdPersonCameraPositionForPlayer` | 设置指定玩家的第三人称相机距离、高度和肩部偏移。 | player: Player, followDistance: number, followHeight: number, shoulderOffset: number | 无 | `mod.SetThirdPersonCameraPositionForPlayer(player, 2.5, 0.2, 0.6);` |
| `SetSpectatingFiltersForAll` | 为所有玩家设置观看过滤器。只能限制在小队 / 队伍内。 | group: SpectatingGroup, ownSquadOnly: boolean, ownTeamOnly: boolean | 无 | `mod.SetSpectatingFiltersForAll(...);` |
| `SetSpectatingFiltersForPlayer` | 设置观看指定玩家的过滤器。只能限制在小队 / 队伍内。 | player: Player, group: SpectatingGroup, ownSquadOnly: boolean, ownTeamOnly: boolean | 无 | `mod.SetSpectatingFiltersForPlayer(...);` |
| `EnableScreenEffect` | 启用或禁用指定玩家的屏幕效果。 | player: Player, screenEffect: ScreenEffects, enable: boolean | 无 | `mod.EnableScreenEffect(...);` |
| `EnableVFX` | 启用或禁用指定VFX的显示和动作。 | vfx: VFX, enable: boolean | 无 | `mod.EnableVFX(...);` |
| `MoveVFX` | 将 VFX 移动到指定的坐标和旋转。一般来说，通用的移动函数也会被考虑。 | vfxID: VFX, position: Vector, rotation: Vector | 无 | `mod.MoveVFX(...);` |
| `SetVFXColor` | 更改VFX颜色。 | vfxID: VFX, color: Vector | 无 | `mod.SetVFXColor(...);` |
| `SetVFXScale` | 更改VFX的比例。 | vfxID: VFX, scale: number | 无 | `mod.SetVFXScale(...);` |
| `SetVFXSpeed` | 更改 VFX 的播放速度。 | vfxID: VFX, speed: number | 无 | `mod.SetVFXSpeed(...);` |
| `GetFixedCamera` | 从数字或目标获取固定相机。 | number: number | `FixedCamera` | `const value = mod.GetFixedCamera(...);` |

## 固定武器 Spawner

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `ForceEmplacementSpawnerSpawn` | 从固定武器 Spawner中强制生成当前设置的固定武器。 | emplacementSpawner: EmplacementSpawner | 无 | `mod.ForceEmplacementSpawnerSpawn(...);` |
| `SetEmplacementSpawnerAbandonVehicleOutOfCombatArea` | 设置是否销毁留在战斗区域外的固定武器。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | 无 | `mod.SetEmplacementSpawnerAbandonVehicleOutOfCombatArea(...);` |
| `SetEmplacementSpawnerApplyDamageToAbandonVehicle` | 设置是否对废弃的固定武器施加伤害。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | 无 | `mod.SetEmplacementSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetEmplacementSpawnerAutoSpawn` | 启用或禁用固定武器 Spawner的自动重生。 | emplacementSpawner: EmplacementSpawner, enabled: boolean | 无 | `mod.SetEmplacementSpawnerAutoSpawn(...);` |
| `SetEmplacementSpawnerKeepAliveAbandonRadius` | 设置与最近玩家的距离，固定武器将被视为废弃。 | emplacementSpawner: EmplacementSpawner, keepAliveAbandonedRadius: number | 无 | `mod.SetEmplacementSpawnerKeepAliveAbandonRadius(...);` |
| `SetEmplacementSpawnerRespawnTime` | 设置固定武器被摧毁后自动重生的秒数。 | emplacementSpawner: EmplacementSpawner, respawnTime: number | 无 | `mod.SetEmplacementSpawnerRespawnTime(...);` |
| `SetEmplacementSpawnerSpawnerRadius` | 设置固定武器被视为远离Spawner的距离。 | emplacementSpawner: EmplacementSpawner, keepAliveSpawnerRadius: number | 无 | `mod.SetEmplacementSpawnerSpawnerRadius(...);` |
| `SetEmplacementSpawnerTimeUntilAbandon` | 设置固定武器在被遗弃之前保持不使用状态的时间。 | emplacementSpawner: EmplacementSpawner, timeUntilAbandon: number | 无 | `mod.SetEmplacementSpawnerTimeUntilAbandon(...);` |
| `SetEmplacementSpawnerType` | 设置从固定武器 Spawner发出的固定武器的类型。 | emplacementSpawner: EmplacementSpawner, emplacementType: StationaryEmplacements | 无 | `mod.SetEmplacementSpawnerType(...);` |
| `GetEmplacementSpawner` | 从数字或目标获取 EmplacementSpawner。 | number: number | `EmplacementSpawner` | `const value = mod.GetEmplacementSpawner(...);` |

## 出击/重生

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `DeployAllPlayers` | 强制部署屏幕上的所有玩家出击。 | 无 | 无 | `mod.DeployAllPlayers(...);` |
| `EnableAllPlayerDeploy` | 切换是否所有玩家都可以从部署屏幕进行部署。 | enablePlayerDeploy: boolean | 无 | `mod.EnableAllPlayerDeploy(...);` |
| `EnablePlayerDeploy` | 切换指定玩家是否可以部署。 | player: Player, deployAllowed: boolean | 无 | `mod.EnablePlayerDeploy(...);` |
| `SetRedeployTime` | 覆盖指定玩家的重生时间，范围为 0 到 60 秒。 | player: Player, redeployTime: number | 无 | `mod.SetRedeployTime(...);` |
| `UndeployAllPlayers` | 将战场上的所有玩家返回到部署屏幕。 | 无 | 无 | `mod.UndeployAllPlayers(...);` |
| `UndeployPlayer` | 将指定玩家返回到部署屏幕。 | player: Player | 无 | `mod.UndeployPlayer(...);` |
| `DeployPlayer` | 强制指定玩家出击。 | player: Player | 无 | `mod.DeployPlayer(...);` |
| `SetSpawnMode` | 设置生成模式以确定是否自动生成玩家。 | spawnModes: SpawnModes | 无 | `mod.SetSpawnMode(...);` |
| `SpawnPlayerFromSpawnPoint` | 从指定的 SpawnPoint 出击指定的玩家。 2 种重载。 | player: Player, spawnPointId: number | 无 | `mod.SpawnPlayerFromSpawnPoint(eventPlayer, mod.GetSpawnPoint(0));` |

## 游戏进度 / 队伍

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `EndGameMode` | 结束游戏模式并使指定的玩家或队伍获胜。 Team 0 表示平局。 2 种重载。 | player: Player | 无 | `mod.EndGameMode(mod.GetTeam(1));` |
| `PauseGameModeTime` | 暂停或恢复游戏模式计时器。 | pauseTimer: boolean | 无 | `mod.PauseGameModeTime(...);` |
| `ResetGameModeTime` | 将游戏模式时间返回到起始值。 | 无 | 无 | `mod.ResetGameModeTime(...);` |
| `SetFriendlyFire` | 启用或禁用友军火力。 | enableFriendlyFire: boolean | 无 | `mod.SetFriendlyFire(...);` |
| `SetGameModeCriteria` | 设置用于胜负判定的分数标准。 | criteria: ScoreCriteria | 无 | `mod.SetGameModeCriteria(mod.ScoreCriteria.HighestProgress);` |
| `SetGameModeInitialScore` | 设置指定队伍的初始游戏模式分数。 | team: Team, initialscore: number | 无 | `mod.SetGameModeInitialScore(mod.GetTeam(1), 0);` |
| `SetGameModeScore` | 设置指定玩家或队伍的游戏模式得分。 2 种重载。 | team: Team, newScore: number | 无 | `mod.SetGameModeScore(mod.GetTeam(1), 10);` |
| `SetGameModeTargetScore` | 设置用于确定胜利的目标分数。 | newScore: number | 无 | `mod.SetGameModeTargetScore(...);` |
| `SetGameModeTimeLimit` | 设置游戏模式时间限制（以秒为单位）。 | newTimeLimit: number | 无 | `mod.SetGameModeTimeLimit(...);` |
| `AutoBalanceTeams` | 自动调整队伍人数。队伍/小队的能力必须匹配。 | 无 | 无 | `mod.AutoBalanceTeams(...);` |
| `DisablePlayerJoin` | 停止新加入服务器。根据SDK注释，没有办法恢复，所以使用时要小心。 | 无 | 无 | `mod.DisablePlayerJoin(...);` |
| `SwitchTeams` | 交换TeamA 和TeamB 的玩家。两队必须拥有相同数量的人类和机器人。 | teamA: Team, teamB: Team | 无 | `mod.SwitchTeams(...);` |
| `GetGameModeScore` | 获取指定玩家或队伍的游戏模式得分。 2 种重载。 | player: Player | `number` | `const value = mod.GetGameModeScore(...);` |
| `GetMatchTimeElapsed` | 获取当前游戏模式已经过去的秒数。 | 无 | `number` | `const value = mod.GetMatchTimeElapsed(...);` |
| `GetMatchTimeRemaining` | 获取当前游戏模式剩余的秒数。 | 无 | `number` | `const value = mod.GetMatchTimeRemaining(...);` |
| `GetRoundTime` | 获取游戏模式中设置的时间限制（以秒为单位）。 | 无 | `number` | `const value = mod.GetRoundTime(...);` |
| `GetTargetScore` | 获取获胜所需的目标分数。 | 无 | `number` | `const value = mod.GetTargetScore(...);` |

## 目标 / 游戏模式对象

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `RingOfFireStart` | 通知RingOfFire开始收缩。 | ringOfFire: RingOfFire | 无 | `mod.RingOfFireStart(...);` |
| `SetHQTeam` | 设置HQ所属队伍。 | hq: HQ, teamID: Team | 无 | `mod.SetHQTeam(...);` |
| `SetRingOfFireDamageAmount` | 设置对陷入火环的玩家造成的伤害量。 | ringOfFireId: RingOfFire, ringOfFireDamageAmount: number | 无 | `mod.SetRingOfFireDamageAmount(...);` |
| `SetRingOfFireStableTime` | 设置 RingOfFire 在收缩之前保持稳定的时间。 | ringOfFireId: RingOfFire, ringOfFireStableTime: number | 无 | `mod.SetRingOfFireStableTime(...);` |
| `EnableCapturePointDeploying` | 切换 CapturePoint 所属队伍是否可以从那里进行部署。 | capturePoint: CapturePoint, enableDeploying: boolean | 无 | `mod.EnableCapturePointDeploying(...);` |
| `SetCapturePointCapturingTime` | 设置占领 CapturePoint 所需的时间。 | capturePoint: CapturePoint, capturingTime: number | 无 | `mod.SetCapturePointCapturingTime(...);` |
| `SetCapturePointNeutralizationTime` | 设置中立化 CapturePoint 所需的时间。 | capturePoint: CapturePoint, neutralizationTime: number | 无 | `mod.SetCapturePointNeutralizationTime(...);` |
| `SetCapturePointOwner` | 更改控制 CapturePoint 的队伍。 | capturePoint: CapturePoint, team: Team | 无 | `mod.SetCapturePointOwner(...);` |
| `SetMaxCaptureMultiplier` | 设置CapturePoint占领速度倍增的上限。 | capturePoint: CapturePoint, multiplier: number | 无 | `mod.SetMaxCaptureMultiplier(...);` |
| `EnableHQ` | 启用或禁用HQ。 | hq: HQ, enable: boolean | 无 | `mod.EnableHQ(...);` |
| `EnableGameModeObjective` | 启用或禁用诸如 CapturePoint、HQ、Sector、MCOM 等目标。目标：CapturePoint \|HQ\|Sector\| MCOM，启用：boolean | objective: CapturePoint \| HQ \| Sector \| MCOM, enable: boolean | 无 | `mod.EnableGameModeObjective(...);` |
| `SetMCOMFuseTime` | 设置点火时间直至 MCOM 爆炸。 | mCOM: MCOM, fuseTime: number | 无 | `mod.SetMCOMFuseTime(...);` |
| `SetMCOMArmType` | 设置 MCOM 是普通安装，还是只有 Bomb 携带者才能安装。 | mcom: MCOM, mcomarmtype: MCOMArmType | 无 | `mod.SetMCOMArmType(mod.GetMCOM(1), mod.MCOMArmType.Bomb);` |
| `SetMCOMOwner` | 设置 MCOM 所有权队伍。可以安装和删除它的队伍将会发生变化。 | mcom: MCOM, teamid: Team | 无 | `mod.SetMCOMOwner(...);` |
| `ForceBombDrop` | 强制 Bomb 从携带者身上掉落。 | bomb: Bomb | 无 | `mod.ForceBombDrop(mod.GetBomb(1));` |
| `ForceBombReset` | 强制把 Bomb 重置到初始位置。 | bomb: Bomb | 无 | `mod.ForceBombReset(mod.GetBomb(1));` |
| `ForceBombSpawn` | 强制 Bomb 在原始位置生成。 | bomb: Bomb | 无 | `mod.ForceBombSpawn(mod.GetBomb(1));` |
| `ForceBombUnspawn` | 强制移除 Bomb。 | bomb: Bomb | 无 | `mod.ForceBombUnspawn(mod.GetBomb(1));` |
| `GiveBombToPlayer` | 把 Bomb 交给指定玩家。 | player: Player, bomb: Bomb | 无 | `mod.GiveBombToPlayer(player, mod.GetBomb(1));` |
| `SetBombDropFuseTime` | 设置 Bomb 掉到地面后到爆炸为止的时间。 | bomb: Bomb, dropfusetime: number | 无 | `mod.SetBombDropFuseTime(mod.GetBomb(1), 10);` |
| `SetBombTeam` | 更改可以拾取 Bomb 的队伍。 | bomb: Bomb, team: Team | 无 | `mod.SetBombTeam(mod.GetBomb(1), mod.GetTeam(2));` |
| `SetBombWorldIconGlobalVisibility` | 设置 Bomb 携带者 WorldIcon 是对所有队伍可见，还是只对进攻方可见。 | bomb: Bomb, enabled: boolean | 无 | `mod.SetBombWorldIconGlobalVisibility(mod.GetBomb(1), false);` |
| `GetRingOfFire` | 从编号或目标获取 RingOfFire。 | number: number | `RingOfFire` | `const value = mod.GetRingOfFire(...);` |
| `AllCapturePoints` | 以数组形式获取游戏中存在的所有 CapturePoint。 | 无 | `Array` | `const value = mod.AllCapturePoints(...);` |
| `GetCapturePoint` | 从数字或目标获取 CapturePoint。 | id: number | `CapturePoint` | `const value = mod.GetCapturePoint(...);` |
| `GetCaptureProgress` | 获取指定 CapturePoint 的占领进度，值为 0 到 1 之间的值。捕获点：捕获点 | capturePoint: CapturePoint | `number` | `const value = mod.GetCaptureProgress(...);` |
| `GetCurrentOwnerTeam` | 获取当前拥有指定 CapturePoint 的队伍。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetCurrentOwnerTeam(...);` |
| `GetOwnerProgressTeam` | 获取当前试图占领指定占领点的队伍。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetOwnerProgressTeam(...);` |
| `GetPlayersOnPoint` | 获取指定CapturePoint范围内的玩家数组。 | capturePoint: CapturePoint | `Array` | `const value = mod.GetPlayersOnPoint(...);` |
| `GetPreviousOwnerTeam` | 获取指定 CapturePoint 的先前所有权队伍。 | capturePoint: CapturePoint | `Team` | `const value = mod.GetPreviousOwnerTeam(...);` |
| `GetHQ` | 从编号或目标获取HQ。 | number: number | `HQ` | `const value = mod.GetHQ(...);` |
| `GetBomb` | 从编号或目标获取 Bomb。 | number: number | `Bomb` | `const bomb = mod.GetBomb(1);` |
| `GetMCOM` | 从编号或目标获取 MCOM。 | number: number | `MCOM` | `const value = mod.GetMCOM(...);` |
| `GetSector` | 从数字或目标获取Sector。 | number: number | `Sector` | `const value = mod.GetSector(...);` |

## 配置物 / 空间对象

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `EnableAreaTrigger` | 启用或禁用AreaTrigger。禁用时，不会触发相应的事件。 | areaTrigger: AreaTrigger, enable: boolean | 无 | `mod.EnableAreaTrigger(...);` |
| `EnableInteractPoint` | 启用或禁用 InteractPoint。 | interactPoint: InteractPoint, enable: boolean | 无 | `mod.EnableInteractPoint(mod.GetInteractPoint(0), false);` |
| `EnableSpatialObject` | 启用或禁用 SpatialObject。 | spatialObject: SpatialObject, enable: boolean | 无 | `mod.EnableSpatialObject(...);` |
| `RayCast` | 请求两点之间的直线判断。在 `OnRayCastHit` / `OnRayCastMissed` 接收结果。 2 种重载。 | player: Player, start: Vector, stop: Vector | 无 | `mod.RayCast(eventPlayer, start, stop);` |
| `SetVL7CloudEffects` | 单独启用或禁用 VL7Cloud 的屏幕效果、士兵效果和 VFX。 | vl7Cloud: VL7Cloud, screenEffect: boolean, soldierEffect: boolean, visualEffect: boolean | 无 | `mod.SetVL7CloudEffects(...);` |
| `UnspawnObject` | 清除使用 `SpawnObject` 创建的对象。 | obj: mod.Object | 无 | `mod.UnspawnObject(...);` |
| `MoveObject` | 通过位置差异和旋转差异（如果需要）移动指定对象。 2 种重载。 | object: mod.Object, positionDelta: Vector | 无 | `mod.MoveObject(...);` |
| `MoveObjectOverTime` | 随着时间的推移，将指定对象移动位置/旋转差。你还可以指定循环和反转。 | object: mod.Object, positionDelta: Vector, rotationDelta: Vector, timeInSeconds: number, shouldLoop: boolean, shouldReverse: boolean | 无 | `mod.MoveObjectOverTime(...);` |
| `OrbitObjectOverTime` | 随着时间的推移围绕变换旋转指定对象。 2 种重载。 | object: mod.Object, orbitTransform: Transform, timeInSeconds: number, radius: number, shouldLoop: boolean, shouldReverse: boolean, clockwise: boolean | 无 | `mod.OrbitObjectOverTime(...);` |
| `RotateObject` | 将指定对象旋转欧拉角差。 | object: mod.Object, rotationDelta: Vector | 无 | `mod.RotateObject(...);` |
| `SetObjectTransform` | 设置指定对象的Transform。 | object: mod.Object, transform: Transform | 无 | `mod.SetObjectTransform(...);` |
| `SetObjectTransformOverTime` | 随着时间的推移，将指定的对象移动并旋转到指定的变换。 | object: mod.Object, transform: Transform, timeInSeconds: number, shouldLoop: boolean, shouldReverse: boolean | 无 | `mod.SetObjectTransformOverTime(...);` |
| `StopActiveMovementForObject` | 停止指定对象上正在进行的时间移动。 | object: mod.Object | 无 | `mod.StopActiveMovementForObject(...);` |
| `GetAreaTrigger` | 从数字或目标获取AreaTrigger。 | areaTriggerNumber: number | `AreaTrigger` | `const area = mod.GetAreaTrigger(0);` |
| `GetInteractPoint` | 从数字或目标获取 InteractPoint。 | interactPointNumber: number | `InteractPoint` | `const point = mod.GetInteractPoint(0);` |
| `GetSpatialObject` | 从数字或目标获取 SpatialObject。 | spatialObjectNumber: number | `SpatialObject` | `const value = mod.GetSpatialObject(...);` |
| `SpawnObject` | 在指定坐标处生成运行时 Prefab。不受支持的对象的返回值可能为 `-1`。2 种重载。 | prefabEnum: `RuntimeSpawn_Common` 和包含 `RuntimeSpawn_Plaza` 的各地图 RuntimeSpawn, position: Vector, rotation: Vector, scale: Vector | `Any` | `const obj = mod.SpawnObject(prefab, pos, rot, scale);` |
| `GetObjectPosition` | 以 Vector 形式获取指定对象的当前位置。 | object: mod.Object | `Vector` | `const value = mod.GetObjectPosition(...);` |
| `GetObjectRotation` | 以Vector形式获取指定对象的当前旋转。 | object: mod.Object | `Vector` | `const value = mod.GetObjectRotation(...);` |
| `GetObjectTransform` | 获取包含指定对象的位置和旋转的 Transform。 | object: mod.Object | `Transform` | `const value = mod.GetObjectTransform(...);` |
| `GetTransformPosition` | 从变换中提取位置Vector。 | transform: Transform | `Vector` | `const value = mod.GetTransformPosition(...);` |
| `GetTransformRotation` | 从变换中提取旋转Vector。 | transform: Transform | `Vector` | `const value = mod.GetTransformRotation(...);` |

## 战利品 / 补给物资

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `SpawnLoot` | 在 LootSpawner 中生成弹药、武器、Gadget和盔甲。 4 种重载。 | lootSpawner: LootSpawner, ammo: AmmoTypes | 无 | `mod.SpawnLoot(...);` |
| `UnspawnAllLoot` | 删除世界上现有的所有路线。 | 无 | 无 | `mod.UnspawnAllLoot(...);` |
| `GetLootSpawner` | 从编号或目标中获取 LootSpawner。 | number: number | `LootSpawner` | `const value = mod.GetLootSpawner(...);` |

## 体力 / 伤害 / 状态

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `DealDamage` | 对指定玩家或车辆造成损坏。如有必要，你还可以指定造成伤害的玩家。 3 种重载。 | player: Player, damageAmount: number | 无 | `mod.DealDamage(...);` |
| `ForceRevive` | 强行复活倒地的玩家。 | player: Player | 无 | `mod.ForceRevive(...);` |
| `Heal` | 治愈或修理指定的玩家或车辆。如有必要，你还可以指定治疗师。 3 种重载。 | player: Player, healAmount: number | 无 | `mod.Heal(...);` |
| `Kill` | 立即杀死指定的玩家或车辆。玩家跳过状态。 2 种重载。 | player: Player | 无 | `mod.Kill(...);` |
| `SetSoldierEffect` | 启用或禁用指定玩家的士兵效果。 | player: Player, soldierEffects: SoldierEffects, isEnabled: boolean | 无 | `mod.SetSoldierEffect(...);` |
| `SpotTarget` | 发现指定的玩家。你可以指定显示时间、地点状态和地点。 5 种重载。 | targetplayer: Player, duration: number, spotStatus: SpotStatus | 无 | `mod.SpotTarget(...);` |
| `SetPlayerIncomingDamageFactor` | 设置指定玩家受到的伤害倍数。值四舍五入到最接近的 5%，并限制在 0 到 200%。 | player: Player, amount: number | 无 | `mod.SetPlayerIncomingDamageFactor(...);` |
| `ForceManDown` | 放下指定的玩家。如果禁用了 down，则不适用。 | player: Player | 无 | `mod.ForceManDown(...);` |
| `SetPlayerMaxHealth` | 设置指定玩家的最大生命值，范围为1到500。最大体力倍数也会反映出来。 | player: Player, maxHealth: number | 无 | `mod.SetPlayerMaxHealth(...);` |
| `SetPlayerMovementSpeedMultiplier` | 设置指定玩家的移动速度倍数。 | player: Player, multiplier: number | 无 | `mod.SetPlayerMovementSpeedMultiplier(...);` |
| `SkipManDown` | 设置指定玩家死亡时是否不经过down状态返回部署界面。 | player: Player, skipManDown: boolean | 无 | `mod.SkipManDown(...);` |

## 装备 / 输入 / 玩家操作

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `Teleport` | 将指定的玩家或车辆移动到具有方向的有效坐标。以弧度指定方向。 2 种重载。 | player: Player, destination: Vector, orientation: number | 无 | `mod.Teleport(eventPlayer, destination, 0);` |
| `EnableAllInputRestrictions` | 切换指定玩家的移动、拍摄、视点动作等所有输入限制。 | player: Player, restrictInput: boolean | 无 | `mod.EnableAllInputRestrictions(...);` |
| `EnableInputRestriction` | 限制或取消特定玩家的特定输入。 | player: Player, inputRestriction: RestrictedInputs, restrictInput: boolean | 无 | `mod.EnableInputRestriction(...);` |
| `AddAttachmentToWeaponPackage` | 将附件添加到 WeaponPackage。现有的同类型附件将被替换。 | attachment: WeaponAttachments, weaponPackage: WeaponPackage | 无 | `mod.AddAttachmentToWeaponPackage(...);` |
| `AddEquipment` | 将武器、Gadget和盔甲添加到玩家的装备中。 7种重载。 | player: Player, weapon: Weapons | 无 | `mod.AddEquipment(...);` |
| `ForceSwitchInventory` | 强制指定玩家切换到指定的物品栏位置。 | player: Player, inventorySlot: InventorySlots | 无 | `mod.ForceSwitchInventory(...);` |
| `RemoveEquipment` | 从玩家的装备中移除指定的插槽、武器或Gadget。 3 种重载。 | player: Player, inventorySlot: InventorySlots | 无 | `mod.RemoveEquipment(...);` |
| `SetInventoryAmmo` | 设置指定库存槽中的子弹number。 | player: Player, inventorySlots: InventorySlots, ammo: number | 无 | `mod.SetInventoryAmmo(...);` |
| `SetInventoryMagazineAmmo` | 设置指定库存槽位的弹匣中的子弹number。 | player: Player, inventorySlots: InventorySlots, magAmmo: number | 无 | `mod.SetInventoryMagazineAmmo(...);` |
| `Resupply` | 为玩家提供指定的供给类型。 | player: Player, ressuplyType: ResupplyTypes | 无 | `mod.Resupply(...);` |
| `CreateNewWeaponPackage` | 创建一个新的武器包。 | 无 | `WeaponPackage` | `const value = mod.CreateNewWeaponPackage(...);` |
| `EventDamageTypeCompare` | 判断事件中传入的DamageType是否与指定的损坏类型匹配。 | damageType: DamageType, playerDamageTypes: PlayerDamageTypes | `boolean` | `const value = mod.EventDamageTypeCompare(...);` |
| `EventDeathTypeCompare` | 判断事件中传入的DeathType是否与指定的死亡类型匹配。 | deathType: DeathType, playerDeathTypes: PlayerDeathTypes | `boolean` | `const value = mod.EventDeathTypeCompare(...);` |
| `EventWeaponCompare` | 判断事件中给出的武器和小玩意是否与指定装备相符。 2 种重载。 | eventWeapon: WeaponUnlock, weapon: Weapons | `boolean` | `if (mod.EventWeaponCompare(eventWeaponUnlock, mod.Weapons.AK24)) {}` |
| `GetInventoryAmmo` | 获取指定玩家指定槽位内的子弹number。 | player: Player, inventorySlots: InventorySlots | `number` | `const value = mod.GetInventoryAmmo(...);` |
| `GetInventoryMagazineAmmo` | 获取指定玩家指定槽位弹匣内的子弹number。 | player: Player, inventorySlots: InventorySlots | `number` | `const value = mod.GetInventoryMagazineAmmo(...);` |
| `GetSoldierState` | 获取指定玩家的士兵状态，为数值、boolean或Vector。 3 种重载。 | player: Player, soldierStateNumber: SoldierStateNumber | `number` | `const value = mod.GetSoldierState(...);` |
| `HasEquipment` | 确定指定玩家是否拥有指定的武器或Gadget。 2 种重载。 | player: Player, weapon: Weapons | `boolean` | `if (mod.HasEquipment(eventPlayer, mod.Weapons.AK24)) {}` |
| `IsInventorySlotActive` | 确定指定玩家是否正在使用指定的物品栏位。 | player: Player, inventorySlots: InventorySlots | `boolean` | `const value = mod.IsInventorySlotActive(...);` |
| `IsSoldierClass` | 判断指定玩家是否为指定军种。 | player: Player, soldierClass: SoldierClass | `boolean` | `const value = mod.IsSoldierClass(...);` |

## 车辆

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `ForceVehicleSpawnerSpawn` | 从 VehicleSpawner 强制生成当前配置的车辆。 | vehicleSpawner: VehicleSpawner | 无 | `mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(0));` |
| `SetAllVehiclesAllowedInSurroundingArea` | 设置是否允许周边所有车辆通行。 | allowed: boolean | 无 | `mod.SetAllVehiclesAllowedInSurroundingArea(...);` |
| `SetMaxVehicleHeightLimitScale` | 设置车辆触发机失去向上推力的高度限制乘数。 | heightScale: number | 无 | `mod.SetMaxVehicleHeightLimitScale(...);` |
| `SetVehicleAllowedInSurroundingArea` | 设置是否允许指定车辆在周边区域行驶。 | vehicle: VehicleList, allowed: boolean | 无 | `mod.SetVehicleAllowedInSurroundingArea(...);` |
| `SetVehicleCategoryAllowedInSurroundingArea` | 设置是否允许指定车辆类别进入周边区域。 | vehicleCategory: VehicleCategories, allowed: boolean | 无 | `mod.SetVehicleCategoryAllowedInSurroundingArea(...);` |
| `SetVehicleSpawnerAbandonVehiclesOutOfCombatArea` | 设置是否摧毁留在战斗区域外的车辆。 | vehicleSpawner: VehicleSpawner, enabled: boolean | 无 | `mod.SetVehicleSpawnerAbandonVehiclesOutOfCombatArea(...);` |
| `SetVehicleSpawnerApplyDamageToAbandonVehicle` | 设置是否对废弃车辆施加伤害。 | vehicleSpawner: VehicleSpawner, enabled: boolean | 无 | `mod.SetVehicleSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetVehicleSpawnerAutoSpawn` | 启用或禁用 VehicleSpawner 的自动重生。 | vehicleSpawner: VehicleSpawner, enabled: boolean | 无 | `mod.SetVehicleSpawnerAutoSpawn(...);` |
| `SetVehicleSpawnerKeepAliveAbandonRadius` | 设置距最近玩家的距离，达到该距离车辆将被视为废弃。 | vehicleSpawner: VehicleSpawner, keepAliveAbandonedRadius: number | 无 | `mod.SetVehicleSpawnerKeepAliveAbandonRadius(...);` |
| `SetVehicleSpawnerKeepAliveSpawnerRadius` | 设置车辆被视为远离Spawner的距离。 | vehicleSpawner: VehicleSpawner, keepAliveSpawnerRadius: number | 无 | `mod.SetVehicleSpawnerKeepAliveSpawnerRadius(...);` |
| `SetVehicleSpawnerRespawnTime` | 设置车辆被摧毁后直到自动重生的秒数。 | vehicleSpawner: VehicleSpawner, respawnTime: number | 无 | `mod.SetVehicleSpawnerRespawnTime(...);` |
| `SetVehicleSpawnerTimeUntilAbandon` | 设置车辆在被视为废弃之前保持未使用状态的时间。 | vehicleSpawner: VehicleSpawner, timeUntilAbandon: number | 无 | `mod.SetVehicleSpawnerTimeUntilAbandon(...);` |
| `SetVehicleSpawnerVehicleType` | 设置从 VehicleSpawner 发出的车辆类型。 | vehicleSpawner: VehicleSpawner, vehicleType: VehicleList | 无 | `mod.SetVehicleSpawnerVehicleType(...);` |
| `SetVehicleMaxHealthMultiplier` | 将指定车辆的最大耐久性乘数设置为大于 0 且小于或等于 4 的值。 | vehicle: Vehicle, maxHealthMultiplier: number | 无 | `mod.SetVehicleMaxHealthMultiplier(...);` |
| `ForcePlayerExitVehicle` | 将指定玩家强行从车辆上移走。 | player: Player, vehicle: Vehicle | 无 | `mod.ForcePlayerExitVehicle(...);` |
| `ForcePlayerToSeat` | 强制指定玩家坐在指定车辆座位上。 | player: Player, vehicle: Vehicle, seatNumber: number | 无 | `mod.ForcePlayerToSeat(...);` |
| `GetVehicleSpawner` | 从数字或目标中获取VehicleSpawner。 | number: number | `VehicleSpawner` | `const value = mod.GetVehicleSpawner(...);` |
| `AllVehicles` | 将游戏中的所有车辆作为数组获取。 | 无 | `Array` | `const vehicles = mod.AllVehicles();` |
| `CompareVehicleName` | 判断指定的车辆是否与指定的VehicleList类型相同。 | vehicle: Vehicle, vehicleList: VehicleList | `boolean` | `const value = mod.CompareVehicleName(...);` |
| `GetVehicleFromPlayer` | 获取指定玩家所乘坐的车辆。 | player: Player | `Vehicle` | `const vehicle = mod.GetVehicleFromPlayer(eventPlayer);` |
| `GetVehicleSeatCount` | 获取指定车辆的座位数。 | vehicle: Vehicle | `number` | `const value = mod.GetVehicleSeatCount(...);` |
| `GetVehicleState` | 获取指定车辆的状态Vector。 | vehicle: Vehicle, vehicleStateVector: VehicleStateVector | `Vector` | `const value = mod.GetVehicleState(...);` |
| `GetVehicleTeam` | 获取指定车辆所属的车队。无人车辆将被视为中立车辆。 | vehicle: Vehicle | `Team` | `const value = mod.GetVehicleTeam(...);` |
| `IsVehicleOccupied` | 判断玩家是否乘坐指定车辆。 | vehicle: Vehicle | `boolean` | `const value = mod.IsVehicleOccupied(...);` |
| `IsVehicleSeatOccupied` | 判断指定车辆的预留座位是否正在使用。 | vehicle: Vehicle, number: number | `boolean` | `const value = mod.IsVehicleSeatOccupied(...);` |
| `GetAllPlayersInVehicle` | 获取指定车辆中的所有玩家作为数组。 | vehicle: Vehicle | `Array` | `const value = mod.GetAllPlayersInVehicle(...);` |
| `GetPlayerFromVehicleSeat` | 让玩家坐在指定车辆的指定座位上。如果座位是空的，则成为无效玩家。 | vehicle: Vehicle, number: number | `Player` | `const value = mod.GetPlayerFromVehicleSeat(...);` |
| `GetPlayerVehicleSeat` | 获取指定玩家的车辆座位号。如果在车外，则为 -1。 | player: Player | `number` | `const value = mod.GetPlayerVehicleSeat(...);` |

## 物理冲量

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `ApplyAreaImpulseAndDamage` | 对指定中心和半径内的载具应用范围冲量和可选伤害。支持带方向覆盖和不带方向覆盖的 2 种重载。 | center: Vector, radius: number, impulseStrength: number, damageAmount: number | 无 | `mod.ApplyAreaImpulseAndDamage(center, 5, 1000, 0);` |
| `ApplyImpulse` | 对单台载具按世界位置、方向和强度施加冲量。 | vehicle: Vehicle, worldPosition: Vector, direction: Vector, magnitude: number | 无 | `mod.ApplyImpulse(vehicle, pos, mod.ForwardVector(), 500);` |

## WorldIcon

| 函数 | 功能 / 目的 | 主要参数 | 返回值 | 使用示例 |
| --- | --- | --- | --- | --- |
| `EnableWorldIconImage` | 启用或禁用 WorldIcon 图像显示。 | worldIcon: WorldIcon, enableImage: boolean | 无 | `mod.EnableWorldIconImage(...);` |
| `EnableWorldIconText` | 启用或禁用 WorldIcon 上的文本显示。 | worldIcon: WorldIcon, enableText: boolean | 无 | `mod.EnableWorldIconText(...);` |
| `RemoveUIIcon` | 删除附加到该对象的 UI 图标Widget。你还可以指定目标玩家或队伍。 2 种重载。 | objectWithIcon: mod.Object | 无 | `mod.RemoveUIIcon(...);` |
| `SetWorldIconColor` | 更改WorldIcon的颜色。 | worldIcon: WorldIcon, newColor: Vector | 无 | `mod.SetWorldIconColor(...);` |
| `SetWorldIconImage` | 更改 WorldIcon 的图像类型。 | worldIcon: WorldIcon, newImage: WorldIconImages | 无 | `mod.SetWorldIconImage(...);` |
| `SetWorldIconOwner` | 限制 WorldIcon 仅对特定队伍或玩家可见。 2 种重载。 | worldIcon: WorldIcon, newTeamOwner: Team | 无 | `mod.SetWorldIconOwner(...);` |
| `SetWorldIconPosition` | 更改 WorldIcon 的显示位置。 | worldIcon: WorldIcon, newPosition: Vector | 无 | `mod.SetWorldIconPosition(...);` |
| `SetWorldIconText` | 更改 WorldIcon 上的文本。显示文本在 `Strings.json` 注册，然后在 `mod.stringkeys` 引用。 | worldIcon: WorldIcon, newText: Message | 无 | `mod.SetWorldIconText(icon, mod.Message(mod.stringkeys.pointA));` |
| `GetWorldIcon` | 从数字或目标获取 WorldIcon。 | worldIconNumber: number | `WorldIcon` | `const icon = mod.GetWorldIcon(0);` |

# 接下来阅读的附录

UI、通知、玩家引用、数组、ObjId、数字、类型和最小模板分为以下“附录 A-3：动作/值获取列表（UI/引用/值）”。
