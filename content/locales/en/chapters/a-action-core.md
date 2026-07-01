---
title: "Appendix A-2: Actions and Value Retrieval (Basic Operations)"
free: true
---

# Actions and Value Retrieval

Here, the functions called from `mod.` are arranged by purpose. Some names are similar to Portal's block names, but TypeScript has strict types, so you need to pass types such as `Player`, `Team`, `Vector`, `Message`, `UIWidget`.

Functions with the same name and multiple argument patterns are grouped together on one line, and the number of overloads is written in the function/purpose column. For the complete signature, search for the function name at `index.d.ts`.

## Variables / Wait / Subroutines

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `Wait` | Wait for the specified number of seconds. Since it is an asynchronous process, combine it with `await`. | n: number | `Promise<void>` | `await mod.Wait(1);` |
| `SetVariable` | Save the value to the specified Variable. Basics of phase, score, and flag management. | variable: Variable, value: Any | None | `mod.SetVariable(mod.GlobalVariable(0), 1);` |
| `SetVariableAtIndex` | Initialize or get the array in Variable and save the value to the specified index. | arrayVariable: Variable, arrayIndex: number, value: Any | None | `mod.SetVariableAtIndex(mod.GlobalVariable(1), 0, eventPlayer);` |
| `ChaseVariableAtRate` | Move the value of Variable closer to the limit value by the specified amount every second. | variable: Variable, limit: number, deltaPerSecond: number | None | `mod.ChaseVariableAtRate(...);` |
| `ChaseVariableOverTime` | Bring the value of Variable closer to the limit value in the specified number of seconds. | variable: Variable, limit: number, durationSeconds: number | None | `mod.ChaseVariableOverTime(...);` |
| `StopChasingVariable` | Stops ongoing Variable tracking and stops at the current value. | variable: Variable | None | `mod.StopChasingVariable(...);` |
| `GetArgument` | Get subroutine arguments by number. | subroutineArgIndex: number | `Any` | `const value = mod.GetArgument(...);` |
| `GetVariable` | Get the current value stored in Variable. | variable: Variable | `Any` | `const phase = mod.GetVariable(mod.GlobalVariable(0));` |
| `GlobalVariable` | Get the global Variable of the specified number. | variableIndex: number | `Variable` | `const phase = mod.GlobalVariable(0);` |
| `ObjectVariable` | Get the Variable associated with the specified object. | ownerObject: mod.Object, variableIndex: number | `Variable` | `const flag = mod.ObjectVariable(eventPlayer, 0);` |

## AI Control

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `AIBattlefieldBehavior` | Make AI soldiers act autonomously and let them accomplish objectives and shoot at enemies. For AI players only. | player: Player | None | `mod.AIBattlefieldBehavior(...);` |
| `AIDefendPositionBehavior` | Have AI soldiers defend the area around the specified location. For AI players only. | player: Player, defendPosition: Vector, minDistance: number, maxDistance: number | None | `mod.AIDefendPositionBehavior(...);` |
| `AIIdleBehavior` | Set the AI soldier's current location as the standby point. For AI players only. | player: Player | None | `mod.AIIdleBehavior(...);` |
| `AILOSMoveToBehavior` | Move the AI soldier to the specified location while maintaining line-of-sight. For AI players only. | player: Player, position: Vector | None | `mod.AILOSMoveToBehavior(...);` |
| `AIMoveToBehavior` | Give the AI soldier a destination to move to the specified coordinates. For AI players only. | player: Player, position: Vector | None | `mod.AIMoveToBehavior(...);` |
| `AIParachuteBehavior` | Make the AI soldier do a parachute action. For AI players only. | player: Player | None | `mod.AIParachuteBehavior(...);` |
| `AIValidatedMoveToBehavior` | Move the AI soldier to a valid proximity position on the navmesh. For AI players only. | player: Player, position: Vector | None | `mod.AIValidatedMoveToBehavior(...);` |
| `AIWaypointIdleBehavior` | Have AI soldiers patrol the Waypoint Path. For AI players only. | player: Player, waypointPath: WaypointPath | None | `mod.AIWaypointIdleBehavior(...);` |
| `SetAiInput` | Send specified input to AI soldiers for a certain period of time. Up to 3 inputs can be specified simultaneously. | player: Player, input: AiInput, duration: number | None | `mod.SetAiInput(...);` |
| `AISetUnspawnOnDead` | Set whether AI soldiers sent from Spawner will leave after death. | spawner: Spawner, enableUnspawnOnDead: boolean | None | `mod.AISetUnspawnOnDead(...);` |
| `SetUnspawnDelayInSeconds` | Set the number of seconds for AI soldiers sent from Spawner to exit after dying. | spawner: Spawner, delay: number | None | `mod.SetUnspawnDelayInSeconds(...);` |
| `SpawnAIFromAISpawner` | Spawns an AI soldier from the specified AI Spawner. 8 overloads. | spawner: Spawner | None | `mod.SpawnAIFromAISpawner(mod.GetSpawner(0));` |
| `UnspawnAllAIsFromAISpawner` | Remove all AI soldiers sent from the designated AI Spawner. | spawner: Spawner | None | `mod.UnspawnAllAIsFromAISpawner(...);` |
| `AIEnableShooting` | Switch whether AI soldiers can shoot or not. For AI players only. 2 overloads. | player: Player | None | `mod.AIEnableShooting(...);` |
| `AIEnableTargeting` | Switch AI soldiers' enemy search/target recognition. If you disable it, it will no longer fire. 2 overloads. | player: Player | None | `mod.AIEnableTargeting(...);` |
| `AIForceFire` | Forces AI soldiers to use handheld weapons and gadgets for a specified time. | player: Player, fireDuration: number | None | `mod.AIForceFire(...);` |
| `AIGadgetSettings` | Adjust gadget usage conditions, cooldowns, and accuracy corrections for AI soldiers. | player: Player, applyUsageCriteria: boolean, applyCoolDownAfterUse: boolean, applyInaccuracy: boolean | None | `mod.AIGadgetSettings(...);` |
| `AISetFocusPoint` | Set the AI soldier's gaze point and have it attack there if necessary. | player: Player, point: Vector, isTarget: boolean | None | `mod.AISetFocusPoint(...);` |
| `AISetMoveSpeed` | Set the speed used for the movement behavior of AI soldiers. | player: Player, moveSpeed: MoveSpeed | None | `mod.AISetMoveSpeed(...);` |
| `AISetStance` | Set the posture of the AI soldier. | player: Player, stance: Stance | None | `mod.AISetStance(...);` |
| `AISetTarget` | Set or clear the current target for AI soldiers. 2 overloads. | aiPlayer: Player, targetPlayer: Player | None | `mod.AISetTarget(...);` |
| `AIStartUsingGadget` | Have an AI soldier use a specific gadget at a specified location or player. 2 overloads. | player: Player, gadget: Gadgets, targetPos: Vector | None | `mod.AIStartUsingGadget(...);` |
| `AIStopUsingGadget` | Cancel the gadget use instructions given to AI soldiers. | player: Player | None | `mod.AIStopUsingGadget(...);` |
| `SetAIToHumanDamageModifier` | Set the damage multiplier given to human players from AI. | damageMultiplier: number | None | `mod.SetAIToHumanDamageModifier(...);` |

## Sound / Music / VO

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `LoadMusic` | Load the music package and make it playable at `PlayMusic`. | musicPackage: MusicPackages | None | `mod.LoadMusic(...);` |
| `PlayMusic` | Play music events. You can target the entire team, squad, or players. 4 overloads. | musicEvent: MusicEvents | None | `mod.PlayMusic(...);` |
| `PlaySound` | Play SFX. You can specify the target, location, and attenuation range. 8 overloads. | sound: SFX, amplitude: number, team: Team | None | `mod.PlaySound(mod.GetSFX(0), 1);` |
| `PlayVO` | Play VO audio events. You can target the entire team, squad, or players. 4 overloads. | voiceOver: VO, event: VoiceOverEvents2D, flag: VoiceOverFlags | None | `mod.PlayVO(...);` |
| `SetMusicParam` | Update the parameter values of the loaded music package. 4 overloads. | musicParam: MusicParams, paramValue: number | None | `mod.SetMusicParam(...);` |
| `SetSoundAmplitude` | Change the volume of the specified SFX. You can target the entire team, squad, or players. 4 overloads. | sound: SFX, amplitude: number, team: Team | None | `mod.SetSoundAmplitude(...);` |
| `StopSound` | Stop the specified SFX. You can target the entire team, squad, or players. 4 overloads. | sound: SFX, team: Team | None | `mod.StopSound(...);` |
| `UnloadMusic` | Release loaded music packages. | musicPackage: MusicPackages | None | `mod.UnloadMusic(...);` |

## Camera and Presentation

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `SetCameraTypeForAll` | Set the camera type for all players. If necessary, also specify the camera index. 2 overloads. | cameraType: Cameras | None | `mod.SetCameraTypeForAll(...);` |
| `SetCameraTypeForPlayer` | Set the camera type of the specified player. If necessary, also specify the camera index. 2 overloads. | player: Player, cameraType: Cameras | None | `mod.SetCameraTypeForPlayer(...);` |
| `SetFreeCameraCollisionForAll` | Enable or disable Free Camera collision for all players. | enabled: boolean | None | `mod.SetFreeCameraCollisionForAll(true);` |
| `SetFreeCameraCollisionForPlayer` | Enable or disable Free Camera collision for a player. | player: Player, enabled: boolean | None | `mod.SetFreeCameraCollisionForPlayer(player, true);` |
| `SetThirdPersonCameraPositionForAll` | Set third-person follow distance, height, and shoulder offset for all players. | followDistance: number, followHeight: number, shoulderOffset: number | None | `mod.SetThirdPersonCameraPositionForAll(2.5, 0.2, 0.6);` |
| `SetThirdPersonCameraPositionForPlayer` | Set third-person follow distance, height, and shoulder offset for a player. | player: Player, followDistance: number, followHeight: number, shoulderOffset: number | None | `mod.SetThirdPersonCameraPositionForPlayer(player, 2.5, 0.2, 0.6);` |
| `SetSpectatingFiltersForAll` | Set the viewing filter for all players. Can be restricted to only within the squad/team. | group: SpectatingGroup, ownSquadOnly: boolean, ownTeamOnly: boolean | None | `mod.SetSpectatingFiltersForAll(...);` |
| `SetSpectatingFiltersForPlayer` | Set the filter for watching the specified player. Can be restricted to only within the squad/team. | player: Player, group: SpectatingGroup, ownSquadOnly: boolean, ownTeamOnly: boolean | None | `mod.SetSpectatingFiltersForPlayer(...);` |
| `EnableScreenEffect` | Enable or disable screen effects for the specified player. | player: Player, screenEffect: ScreenEffects, enable: boolean | None | `mod.EnableScreenEffect(...);` |
| `EnableVFX` | Enable or disable the display and operation of the specified VFX. | vfx: VFX, enable: boolean | None | `mod.EnableVFX(...);` |
| `MoveVFX` | Move VFX to specified coordinates and rotation. Generally, general-purpose movement functions are also considered. | vfxID: VFX, position: Vector, rotation: Vector | None | `mod.MoveVFX(...);` |
| `SetVFXColor` | Change VFX color. | vfxID: VFX, color: Vector | None | `mod.SetVFXColor(...);` |
| `SetVFXScale` | Change the scale of VFX. | vfxID: VFX, scale: number | None | `mod.SetVFXScale(...);` |
| `SetVFXSpeed` | Change the playback speed of VFX. | vfxID: VFX, speed: number | None | `mod.SetVFXSpeed(...);` |
| `GetFixedCamera` | Get FixedCamera from number or target. | number: number | `FixedCamera` | `const value = mod.GetFixedCamera(...);` |

## Stationary Weapon Spawner

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `ForceEmplacementSpawnerSpawn` | Forcibly spawn the currently set fixed weapon from the fixed weapon spawner. | emplacementSpawner: EmplacementSpawner | None | `mod.ForceEmplacementSpawnerSpawn(...);` |
| `SetEmplacementSpawnerAbandonVehicleOutOfCombatArea` | Set whether to destroy stationary weapons left outside the combat zone. | emplacementSpawner: EmplacementSpawner, enabled: boolean | None | `mod.SetEmplacementSpawnerAbandonVehicleOutOfCombatArea(...);` |
| `SetEmplacementSpawnerApplyDamageToAbandonVehicle` | Set whether to apply damage to abandoned stationary weapons. | emplacementSpawner: EmplacementSpawner, enabled: boolean | None | `mod.SetEmplacementSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetEmplacementSpawnerAutoSpawn` | Enable or disable automatic respawning of stationary weapon spawners. | emplacementSpawner: EmplacementSpawner, enabled: boolean | None | `mod.SetEmplacementSpawnerAutoSpawn(...);` |
| `SetEmplacementSpawnerKeepAliveAbandonRadius` | Set the distance from the nearest player at which fixed weapons will be treated as abandoned. | emplacementSpawner: EmplacementSpawner, keepAliveAbandonedRadius: number | None | `mod.SetEmplacementSpawnerKeepAliveAbandonRadius(...);` |
| `SetEmplacementSpawnerRespawnTime` | Sets the number of seconds for fixed weapons to auto-respawn after being destroyed. | emplacementSpawner: EmplacementSpawner, respawnTime: number | None | `mod.SetEmplacementSpawnerRespawnTime(...);` |
| `SetEmplacementSpawnerSpawnerRadius` | Sets the distance at which fixed weapons are considered to be away from the spawner. | emplacementSpawner: EmplacementSpawner, keepAliveSpawnerRadius: number | None | `mod.SetEmplacementSpawnerSpawnerRadius(...);` |
| `SetEmplacementSpawnerTimeUntilAbandon` | Sets the amount of time a stationary weapon remains unused until it becomes abandoned. | emplacementSpawner: EmplacementSpawner, timeUntilAbandon: number | None | `mod.SetEmplacementSpawnerTimeUntilAbandon(...);` |
| `SetEmplacementSpawnerType` | Set the type of fixed weapon issued from the fixed weapon spawner. | emplacementSpawner: EmplacementSpawner, emplacementType: StationaryEmplacements | None | `mod.SetEmplacementSpawnerType(...);` |
| `GetEmplacementSpawner` | Get EmplacementSpawner from number or target. | number: number | `EmplacementSpawner` | `const value = mod.GetEmplacementSpawner(...);` |

## Deploy and Respawn

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `DeployAllPlayers` | Force all players on the deployment screen to sortie. | None | None | `mod.DeployAllPlayers(...);` |
| `EnableAllPlayerDeploy` | Switch whether all players can deploy from the deployment screen. | enablePlayerDeploy: boolean | None | `mod.EnableAllPlayerDeploy(...);` |
| `EnablePlayerDeploy` | Switch whether or not the specified player can be deployed. | player: Player, deployAllowed: boolean | None | `mod.EnablePlayerDeploy(...);` |
| `SetRedeployTime` | Overwrite the specified player's respawn time in the range of 0 to 60 seconds. | player: Player, redeployTime: number | None | `mod.SetRedeployTime(...);` |
| `UndeployAllPlayers` | Return all players on the battlefield to the deployment screen. | None | None | `mod.UndeployAllPlayers(...);` |
| `UndeployPlayer` | Return the specified player to the deployment screen. | player: Player | None | `mod.UndeployPlayer(...);` |
| `DeployPlayer` | Force the specified player to sortie. | player: Player | None | `mod.DeployPlayer(...);` |
| `SetSpawnMode` | Set the spawn mode to determine whether to automatically spawn the player. | spawnModes: SpawnModes | None | `mod.SetSpawnMode(...);` |
| `SpawnPlayerFromSpawnPoint` | Sortie the specified player from the specified SpawnPoint. 2 overloads. | player: Player, spawnPointId: number | None | `mod.SpawnPlayerFromSpawnPoint(eventPlayer, mod.GetSpawnPoint(0));` |

## Game Progress and Teams

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `EndGameMode` | Ends the game mode and makes the specified player or team the winner. Team 0 is a draw. 2 overloads. | player: Player | None | `mod.EndGameMode(mod.GetTeam(1));` |
| `PauseGameModeTime` | Pause or resume game mode timer. | pauseTimer: boolean | None | `mod.PauseGameModeTime(...);` |
| `ResetGameModeTime` | Return the game mode time to the starting value. | None | None | `mod.ResetGameModeTime(...);` |
| `SetFriendlyFire` | Enable or disable friendly fire. | enableFriendlyFire: boolean | None | `mod.SetFriendlyFire(...);` |
| `SetGameModeCriteria` | Set the score criterion used for win checks. | criteria: ScoreCriteria | None | `mod.SetGameModeCriteria(mod.ScoreCriteria.HighestProgress);` |
| `SetGameModeInitialScore` | Set the initial game mode score for a team. | team: Team, initialscore: number | None | `mod.SetGameModeInitialScore(mod.GetTeam(1), 0);` |
| `SetGameModeScore` | Set the game mode score for a specified player or team. 2 overloads. | team: Team, newScore: number | None | `mod.SetGameModeScore(mod.GetTeam(1), 10);` |
| `SetGameModeTargetScore` | Set the target score used to determine victory. | newScore: number | None | `mod.SetGameModeTargetScore(...);` |
| `SetGameModeTimeLimit` | Set the game mode time limit in seconds. | newTimeLimit: number | None | `mod.SetGameModeTimeLimit(...);` |
| `AutoBalanceTeams` | Automatically adjust the number of team members. Team/squad capacity must match. | None | None | `mod.AutoBalanceTeams(...);` |
| `DisablePlayerJoin` | Stop new joins to the server. According to the SDK comment, there is no way to restore it, so be careful when using it. | None | None | `mod.DisablePlayerJoin(...);` |
| `SwitchTeams` | Swap the players of TeamA and TeamB. Both teams must have the same number of humans and bots. | teamA: Team, teamB: Team | None | `mod.SwitchTeams(...);` |
| `GetGameModeScore` | Get the game mode score for a specified player or team. 2 overloads. | player: Player | `number` | `const value = mod.GetGameModeScore(...);` |
| `GetMatchTimeElapsed` | Get the number of seconds that have passed in the current game mode. | None | `number` | `const value = mod.GetMatchTimeElapsed(...);` |
| `GetMatchTimeRemaining` | Get the number of seconds remaining in the current game mode. | None | `number` | `const value = mod.GetMatchTimeRemaining(...);` |
| `GetRoundTime` | Get the time limit set in the game mode in seconds. | None | `number` | `const value = mod.GetRoundTime(...);` |
| `GetTargetScore` | Get the target score needed to win. | None | `number` | `const value = mod.GetTargetScore(...);` |

## Objectives / Game Mode Objects

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `RingOfFireStart` | Notify RingOfFire to start shrinking. | ringOfFire: RingOfFire | None | `mod.RingOfFireStart(...);` |
| `SetHQTeam` | Set the team to which HQ belongs. | hq: HQ, teamID: Team | None | `mod.SetHQTeam(...);` |
| `SetRingOfFireDamageAmount` | Set the amount of damage dealt to players caught in RingOfFire. | ringOfFireId: RingOfFire, ringOfFireDamageAmount: number | None | `mod.SetRingOfFireDamageAmount(...);` |
| `SetRingOfFireStableTime` | Sets the amount of time RingOfFire remains stable before shrinking. | ringOfFireId: RingOfFire, ringOfFireStableTime: number | None | `mod.SetRingOfFireStableTime(...);` |
| `EnableCapturePointDeploying` | Toggle whether CapturePoint owning team can deploy from there. | capturePoint: CapturePoint, enableDeploying: boolean | None | `mod.EnableCapturePointDeploying(...);` |
| `SetCapturePointCapturingTime` | Set the time required to occupy CapturePoint. | capturePoint: CapturePoint, capturingTime: number | None | `mod.SetCapturePointCapturingTime(...);` |
| `SetCapturePointNeutralizationTime` | Set the time required to neutralize CapturePoint. | capturePoint: CapturePoint, neutralizationTime: number | None | `mod.SetCapturePointNeutralizationTime(...);` |
| `SetCapturePointOwner` | Change the team controlling CapturePoint. | capturePoint: CapturePoint, team: Team | None | `mod.SetCapturePointOwner(...);` |
| `SetMaxCaptureMultiplier` | Set the upper limit of CapturePoint's occupation speed multiplier. | capturePoint: CapturePoint, multiplier: number | None | `mod.SetMaxCaptureMultiplier(...);` |
| `EnableHQ` | Enable or disable HQ. | hq: HQ, enable: boolean | None | `mod.EnableHQ(...);` |
| `EnableGameModeObjective` | Enable or disable objectives such as CapturePoint, HQ, Sector, MCOM, etc. | objective: CapturePoint \| HQ \| Sector \| MCOM, enable: boolean | None | `mod.EnableGameModeObjective(...);` |
| `SetMCOMFuseTime` | Set the ignition time until MCOM explodes. | mCOM: MCOM, fuseTime: number | None | `mod.SetMCOMFuseTime(...);` |
| `SetMCOMArmType` | Choose default M-COM arming or bomb-carrier-only arming. | mcom: MCOM, mcomarmtype: MCOMArmType | None | `mod.SetMCOMArmType(mod.GetMCOM(1), mod.MCOMArmType.Bomb);` |
| `SetMCOMOwner` | Set the MCOM ownership team. The team that can install and remove it will change. | mcom: MCOM, teamid: Team | None | `mod.SetMCOMOwner(...);` |
| `ForceBombDrop` | Force the Bomb to drop from its carrier. | bomb: Bomb | None | `mod.ForceBombDrop(mod.GetBomb(1));` |
| `ForceBombReset` | Force the Bomb back to its initial location. | bomb: Bomb | None | `mod.ForceBombReset(mod.GetBomb(1));` |
| `ForceBombSpawn` | Force the Bomb to spawn at its original location. | bomb: Bomb | None | `mod.ForceBombSpawn(mod.GetBomb(1));` |
| `ForceBombUnspawn` | Force the Bomb to unspawn. | bomb: Bomb | None | `mod.ForceBombUnspawn(mod.GetBomb(1));` |
| `GiveBombToPlayer` | Give the Bomb to a player. | player: Player, bomb: Bomb | None | `mod.GiveBombToPlayer(player, mod.GetBomb(1));` |
| `SetBombDropFuseTime` | Set the time from Bomb drop to explosion. | bomb: Bomb, dropfusetime: number | None | `mod.SetBombDropFuseTime(mod.GetBomb(1), 10);` |
| `SetBombTeam` | Change which team can pick up the Bomb. | bomb: Bomb, team: Team | None | `mod.SetBombTeam(mod.GetBomb(1), mod.GetTeam(2));` |
| `SetBombWorldIconGlobalVisibility` | Make the Bomb carrier WorldIcon visible to all teams or only the attacking team. | bomb: Bomb, enabled: boolean | None | `mod.SetBombWorldIconGlobalVisibility(mod.GetBomb(1), false);` |
| `GetRingOfFire` | Get RingOfFire from number or target. | number: number | `RingOfFire` | `const value = mod.GetRingOfFire(...);` |
| `AllCapturePoints` | Get all CapturePoints existing in the game as an array. | None | `Array` | `const value = mod.AllCapturePoints(...);` |
| `GetCapturePoint` | Get CapturePoint from number or target. | id: number | `CapturePoint` | `const value = mod.GetCapturePoint(...);` |
| `GetCaptureProgress` | Get the occupation progress of the specified CapturePoint as a value from 0 to 1. | capturePoint: CapturePoint | `number` | `const value = mod.GetCaptureProgress(...);` |
| `GetCurrentOwnerTeam` | Get the team that currently owns the specified CapturePoint. | capturePoint: CapturePoint | `Team` | `const value = mod.GetCurrentOwnerTeam(...);` |
| `GetOwnerProgressTeam` | Get the team currently trying to occupy the specified CapturePoint. | capturePoint: CapturePoint | `Team` | `const value = mod.GetOwnerProgressTeam(...);` |
| `GetPlayersOnPoint` | Get the array of players within the range of the specified CapturePoint. | capturePoint: CapturePoint | `Array` | `const value = mod.GetPlayersOnPoint(...);` |
| `GetPreviousOwnerTeam` | Get the previous ownership team of the specified CapturePoint. | capturePoint: CapturePoint | `Team` | `const value = mod.GetPreviousOwnerTeam(...);` |
| `GetHQ` | Get HQ from number or target. | number: number | `HQ` | `const value = mod.GetHQ(...);` |
| `GetBomb` | Get Bomb from number or target. | number: number | `Bomb` | `const bomb = mod.GetBomb(1);` |
| `GetMCOM` | Get MCOM from number or target. | number: number | `MCOM` | `const value = mod.GetMCOM(...);` |
| `GetSector` | Get Sector from number or target. | number: number | `Sector` | `const value = mod.GetSector(...);` |

## Placed and Spatial Objects

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `EnableAreaTrigger` | Enable or disable AreaTrigger. When disabled, the corresponding event will not fire. | areaTrigger: AreaTrigger, enable: boolean | None | `mod.EnableAreaTrigger(...);` |
| `EnableInteractPoint` | Enable or disable InteractPoint. | interactPoint: InteractPoint, enable: boolean | None | `mod.EnableInteractPoint(mod.GetInteractPoint(0), false);` |
| `EnableSpatialObject` | Enable or disable SpatialObject. | spatialObject: SpatialObject, enable: boolean | None | `mod.EnableSpatialObject(...);` |
| `RayCast` | Request straight line judgment between two points. Receive the results at `OnRayCastHit` / `OnRayCastMissed`. 2 overloads. | player: Player, start: Vector, stop: Vector | None | `mod.RayCast(eventPlayer, start, stop);` |
| `SetVL7CloudEffects` | Enable or disable VL7Cloud's screen effects, soldier effects, and VFX individually. | vl7Cloud: VL7Cloud, screenEffect: boolean, soldierEffect: boolean, visualEffect: boolean | None | `mod.SetVL7CloudEffects(...);` |
| `UnspawnObject` | Clear the object created with `SpawnObject`. | obj: mod.Object | None | `mod.UnspawnObject(...);` |
| `MoveObject` | Moves the specified object by position difference, and rotation difference if necessary. 2 overloads. | object: mod.Object, positionDelta: Vector | None | `mod.MoveObject(...);` |
| `MoveObjectOverTime` | Move the specified object by the position/rotation difference over time. You can also specify loops and inversions. | object: mod.Object, positionDelta: Vector, rotationDelta: Vector, timeInSeconds: number, shouldLoop: boolean, shouldReverse: boolean | None | `mod.MoveObjectOverTime(...);` |
| `OrbitObjectOverTime` | Rotates the specified object around the Transform over time. 2 overloads. | object: mod.Object, orbitTransform: Transform, timeInSeconds: number, radius: number, shouldLoop: boolean, shouldReverse: boolean, clockwise: boolean | None | `mod.OrbitObjectOverTime(...);` |
| `RotateObject` | Rotate the specified object by Euler angle difference. | object: mod.Object, rotationDelta: Vector | None | `mod.RotateObject(...);` |
| `SetObjectTransform` | Set the Transform of the specified object. | object: mod.Object, transform: Transform | None | `mod.SetObjectTransform(...);` |
| `SetObjectTransformOverTime` | Move and rotate the specified object to the specified Transform over time. | object: mod.Object, transform: Transform, timeInSeconds: number, shouldLoop: boolean, shouldReverse: boolean | None | `mod.SetObjectTransformOverTime(...);` |
| `StopActiveMovementForObject` | Stops ongoing time movement on the specified object. | object: mod.Object | None | `mod.StopActiveMovementForObject(...);` |
| `GetAreaTrigger` | Get AreaTrigger from number or target. | areaTriggerNumber: number | `AreaTrigger` | `const area = mod.GetAreaTrigger(0);` |
| `GetInteractPoint` | Get InteractPoint from number or target. | interactPointNumber: number | `InteractPoint` | `const point = mod.GetInteractPoint(0);` |
| `GetSpatialObject` | Get SpatialObject from number or target. | spatialObjectNumber: number | `SpatialObject` | `const value = mod.GetSpatialObject(...);` |
| `SpawnObject` | Generate a runtime spawn Prefab at the specified coordinates. Unsupported objects may have a return value of `-1`. 2 overloads. | prefabEnum: `RuntimeSpawn_Common` and map-specific RuntimeSpawn enums including `RuntimeSpawn_Plaza`, position: Vector, rotation: Vector, scale: Vector | `Any` | `const obj = mod.SpawnObject(prefab, pos, rot, scale);` |
| `GetObjectPosition` | Get the current position of the specified object as a Vector. | object: mod.Object | `Vector` | `const value = mod.GetObjectPosition(...);` |
| `GetObjectRotation` | Get the current rotation of the specified object as a Vector. | object: mod.Object | `Vector` | `const value = mod.GetObjectRotation(...);` |
| `GetObjectTransform` | Get the Transform that includes the position and rotation of the specified object. | object: mod.Object | `Transform` | `const value = mod.GetObjectTransform(...);` |
| `GetTransformPosition` | Extract the position Vector from Transform. | transform: Transform | `Vector` | `const value = mod.GetTransformPosition(...);` |
| `GetTransformRotation` | Extract the rotation Vector from Transform. | transform: Transform | `Vector` | `const value = mod.GetTransformRotation(...);` |

## Loot and Supplies

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `SpawnLoot` | Spawn ammo, weapons, gadgets, and armor in LootSpawner. 4 overloads. | lootSpawner: LootSpawner, ammo: AmmoTypes | None | `mod.SpawnLoot(...);` |
| `UnspawnAllLoot` | Delete all routes existing on the world. | None | None | `mod.UnspawnAllLoot(...);` |
| `GetLootSpawner` | Get LootSpawner from number or target. | number: number | `LootSpawner` | `const value = mod.GetLootSpawner(...);` |

## Health / Damage / State

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `DealDamage` | Cause damage to the designated player or vehicle. If necessary, you can also specify the player who caused the damage. 3 overloads. | player: Player, damageAmount: number | None | `mod.DealDamage(...);` |
| `ForceRevive` | Forcibly revive a downed player. | player: Player | None | `mod.ForceRevive(...);` |
| `Heal` | Heal or repair the designated player or vehicle. If necessary, you can also specify a healer. 3 overloads. | player: Player, healAmount: number | None | `mod.Heal(...);` |
| `Kill` | Instantly kill the designated player or vehicle. Player skips down state. 2 overloads. | player: Player | None | `mod.Kill(...);` |
| `SetSoldierEffect` | Enable or disable the specified player's soldier effect. | player: Player, soldierEffects: SoldierEffects, isEnabled: boolean | None | `mod.SetSoldierEffect(...);` |
| `SpotTarget` | Spot the specified player. You can specify the display time, spot status, and spotter. 5 overloads. | targetplayer: Player, duration: number, spotStatus: SpotStatus | None | `mod.SpotTarget(...);` |
| `SetPlayerIncomingDamageFactor` | Set the damage multiplier that the specified player receives. Values ​​are rounded to the nearest 5% and limited to 0 to 200%. | player: Player, amount: number | None | `mod.SetPlayerIncomingDamageFactor(...);` |
| `ForceManDown` | Puts the specified player down. Does not apply if down is disabled. | player: Player | None | `mod.ForceManDown(...);` |
| `SetPlayerMaxHealth` | Set the maximum health of the specified player in the range of 1 to 500. The maximum physical strength multiplier is also reflected. | player: Player, maxHealth: number | None | `mod.SetPlayerMaxHealth(...);` |
| `SetPlayerMovementSpeedMultiplier` | Set the movement speed multiplier of the specified player. | player: Player, multiplier: number | None | `mod.SetPlayerMovementSpeedMultiplier(...);` |
| `SkipManDown` | Set whether to return to the deployment screen without going through the down state when the specified player dies. | player: Player, skipManDown: boolean | None | `mod.SkipManDown(...);` |

## Equipment / Input / Player Control

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `Teleport` | Move the specified player or vehicle to valid coordinates with orientation. Specify the direction in radians. 2 overloads. | player: Player, destination: Vector, orientation: number | None | `mod.Teleport(eventPlayer, destination, 0);` |
| `EnableAllInputRestrictions` | Switch all input restrictions such as movement, shooting, and viewpoint operation for the specified player. | player: Player, restrictInput: boolean | None | `mod.EnableAllInputRestrictions(...);` |
| `EnableInputRestriction` | Restrict or cancel specific inputs for specified players. | player: Player, inputRestriction: RestrictedInputs, restrictInput: boolean | None | `mod.EnableInputRestriction(...);` |
| `AddAttachmentToWeaponPackage` | Add attachment to WeaponPackage. Existing attachments of the same type will be replaced. | attachment: WeaponAttachments, weaponPackage: WeaponPackage | None | `mod.AddAttachmentToWeaponPackage(...);` |
| `AddEquipment` | Add weapons, gadgets, and armor to the player's loadout. 7 types of overloads. | player: Player, weapon: Weapons | None | `mod.AddEquipment(...);` |
| `ForceSwitchInventory` | Force the specified player to switch to the specified inventory slot. | player: Player, inventorySlot: InventorySlots | None | `mod.ForceSwitchInventory(...);` |
| `RemoveEquipment` | Removes the specified slot, weapon, or gadget from the player's loadout. 3 overloads. | player: Player, inventorySlot: InventorySlots | None | `mod.RemoveEquipment(...);` |
| `SetInventoryAmmo` | Set the number of bullets in the specified inventory slot. | player: Player, inventorySlots: InventorySlots, ammo: number | None | `mod.SetInventoryAmmo(...);` |
| `SetInventoryMagazineAmmo` | Set the number of bullets in the magazine for the specified inventory slot. | player: Player, inventorySlots: InventorySlots, magAmmo: number | None | `mod.SetInventoryMagazineAmmo(...);` |
| `Resupply` | Supply the player with the specified supply type. | player: Player, ressuplyType: ResupplyTypes | None | `mod.Resupply(...);` |
| `CreateNewWeaponPackage` | Create a new WeaponPackage. | None | `WeaponPackage` | `const value = mod.CreateNewWeaponPackage(...);` |
| `EventDamageTypeCompare` | Determine whether the DamageType passed in the event matches the specified damage type. | damageType: DamageType, playerDamageTypes: PlayerDamageTypes | `boolean` | `const value = mod.EventDamageTypeCompare(...);` |
| `EventDeathTypeCompare` | Determine whether the DeathType passed in the event matches the specified death type. | deathType: DeathType, playerDeathTypes: PlayerDeathTypes | `boolean` | `const value = mod.EventDeathTypeCompare(...);` |
| `EventWeaponCompare` | Determine whether the weapons and gadgets given in the event match the specified equipment. 2 overloads. | eventWeapon: WeaponUnlock, weapon: Weapons | `boolean` | `if (mod.EventWeaponCompare(eventWeaponUnlock, mod.Weapons.AK24)) {}` |
| `GetInventoryAmmo` | Get the number of bullets in the specified slot of the specified player. | player: Player, inventorySlots: InventorySlots | `number` | `const value = mod.GetInventoryAmmo(...);` |
| `GetInventoryMagazineAmmo` | Get the number of bullets in the magazine in the specified slot of the specified player. | player: Player, inventorySlots: InventorySlots | `number` | `const value = mod.GetInventoryMagazineAmmo(...);` |
| `GetSoldierState` | Obtain the specified player's soldier status as a numerical value, boolean value, or Vector. 3 overloads. | player: Player, soldierStateNumber: SoldierStateNumber | `number` | `const value = mod.GetSoldierState(...);` |
| `HasEquipment` | Determine whether the specified player has the specified weapon or gadget. 2 overloads. | player: Player, weapon: Weapons | `boolean` | `if (mod.HasEquipment(eventPlayer, mod.Weapons.AK24)) {}` |
| `IsInventorySlotActive` | Determine whether the specified player is using the specified inventory slot. | player: Player, inventorySlots: InventorySlots | `boolean` | `const value = mod.IsInventorySlotActive(...);` |
| `IsSoldierClass` | Determine whether the specified player is a specified military class. | player: Player, soldierClass: SoldierClass | `boolean` | `const value = mod.IsSoldierClass(...);` |

## Vehicle

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `ForceVehicleSpawnerSpawn` | Forcibly spawn the currently configured vehicle from VehicleSpawner. | vehicleSpawner: VehicleSpawner | None | `mod.ForceVehicleSpawnerSpawn(mod.GetVehicleSpawner(0));` |
| `SetAllVehiclesAllowedInSurroundingArea` | Set whether to allow all vehicles in the surrounding area. | allowed: boolean | None | `mod.SetAllVehiclesAllowedInSurroundingArea(...);` |
| `SetMaxVehicleHeightLimitScale` | Sets the altitude limit multiplier at which the vehicle engine loses upward thrust. | heightScale: number | None | `mod.SetMaxVehicleHeightLimitScale(...);` |
| `SetVehicleAllowedInSurroundingArea` | Set whether to allow specified vehicles in the surrounding area. | vehicle: VehicleList, allowed: boolean | None | `mod.SetVehicleAllowedInSurroundingArea(...);` |
| `SetVehicleCategoryAllowedInSurroundingArea` | Set whether to allow specified vehicle categories in the surrounding area. | vehicleCategory: VehicleCategories, allowed: boolean | None | `mod.SetVehicleCategoryAllowedInSurroundingArea(...);` |
| `SetVehicleSpawnerAbandonVehiclesOutOfCombatArea` | Set whether to destroy vehicles left outside the combat zone. | vehicleSpawner: VehicleSpawner, enabled: boolean | None | `mod.SetVehicleSpawnerAbandonVehiclesOutOfCombatArea(...);` |
| `SetVehicleSpawnerApplyDamageToAbandonVehicle` | Set whether to apply damage to abandoned vehicles. | vehicleSpawner: VehicleSpawner, enabled: boolean | None | `mod.SetVehicleSpawnerApplyDamageToAbandonVehicle(...);` |
| `SetVehicleSpawnerAutoSpawn` | Enable or disable automatic respawning of VehicleSpawner. | vehicleSpawner: VehicleSpawner, enabled: boolean | None | `mod.SetVehicleSpawnerAutoSpawn(...);` |
| `SetVehicleSpawnerKeepAliveAbandonRadius` | Set the distance from the nearest player at which the vehicle will be treated as abandoned. | vehicleSpawner: VehicleSpawner, keepAliveAbandonedRadius: number | None | `mod.SetVehicleSpawnerKeepAliveAbandonRadius(...);` |
| `SetVehicleSpawnerKeepAliveSpawnerRadius` | Set the distance at which the vehicle is considered to be away from the spawner. | vehicleSpawner: VehicleSpawner, keepAliveSpawnerRadius: number | None | `mod.SetVehicleSpawnerKeepAliveSpawnerRadius(...);` |
| `SetVehicleSpawnerRespawnTime` | Set the number of seconds after the vehicle is destroyed until it automatically respawns. | vehicleSpawner: VehicleSpawner, respawnTime: number | None | `mod.SetVehicleSpawnerRespawnTime(...);` |
| `SetVehicleSpawnerTimeUntilAbandon` | Set the amount of time a vehicle remains unused until it is considered abandoned. | vehicleSpawner: VehicleSpawner, timeUntilAbandon: number | None | `mod.SetVehicleSpawnerTimeUntilAbandon(...);` |
| `SetVehicleSpawnerVehicleType` | Set the type of vehicle issued from VehicleSpawner. | vehicleSpawner: VehicleSpawner, vehicleType: VehicleList | None | `mod.SetVehicleSpawnerVehicleType(...);` |
| `SetVehicleMaxHealthMultiplier` | Set the maximum durability multiplier of the specified vehicle to a value greater than 0 and less than or equal to 4. | vehicle: Vehicle, maxHealthMultiplier: number | None | `mod.SetVehicleMaxHealthMultiplier(...);` |
| `ForcePlayerExitVehicle` | Forcibly remove the designated player from the vehicle. | player: Player, vehicle: Vehicle | None | `mod.ForcePlayerExitVehicle(...);` |
| `ForcePlayerToSeat` | Force the designated player to sit in the designated vehicle seat. | player: Player, vehicle: Vehicle, seatNumber: number | None | `mod.ForcePlayerToSeat(...);` |
| `GetVehicleSpawner` | Get VehicleSpawner from number or target. | number: number | `VehicleSpawner` | `const value = mod.GetVehicleSpawner(...);` |
| `AllVehicles` | Get all vehicles in the game as an array. | None | `Array` | `const vehicles = mod.AllVehicles();` |
| `CompareVehicleName` | Determine whether the specified vehicle is the same type as the specified VehicleList. | vehicle: Vehicle, vehicleList: VehicleList | `boolean` | `const value = mod.CompareVehicleName(...);` |
| `GetVehicleFromPlayer` | Get the vehicle that the specified player is riding. | player: Player | `Vehicle` | `const vehicle = mod.GetVehicleFromPlayer(eventPlayer);` |
| `GetVehicleSeatCount` | Get the number of seats in the specified vehicle. | vehicle: Vehicle | `number` | `const value = mod.GetVehicleSeatCount(...);` |
| `GetVehicleState` | Obtain the status Vector of the specified vehicle. | vehicle: Vehicle, vehicleStateVector: VehicleStateVector | `Vector` | `const value = mod.GetVehicleState(...);` |
| `GetVehicleTeam` | Get the team to which the specified vehicle belongs. Unoccupied vehicles will be treated as neutral. | vehicle: Vehicle | `Team` | `const value = mod.GetVehicleTeam(...);` |
| `IsVehicleOccupied` | Determine whether the player is riding in the specified vehicle. | vehicle: Vehicle | `boolean` | `const value = mod.IsVehicleOccupied(...);` |
| `IsVehicleSeatOccupied` | Determine whether the reserved seat of the designated vehicle is in use. | vehicle: Vehicle, number: number | `boolean` | `const value = mod.IsVehicleSeatOccupied(...);` |
| `GetAllPlayersInVehicle` | Get all players in the specified vehicle as an array. | vehicle: Vehicle | `Array` | `const value = mod.GetAllPlayersInVehicle(...);` |
| `GetPlayerFromVehicleSeat` | Get the player in the designated seat of the designated vehicle. If the seat is empty, it becomes an invalid Player. | vehicle: Vehicle, number: number | `Player` | `const value = mod.GetPlayerFromVehicleSeat(...);` |
| `GetPlayerVehicleSeat` | Get the vehicle seat number of the designated player. -1 if outside the vehicle. | player: Player | `number` | `const value = mod.GetPlayerVehicleSeat(...);` |

## Physics Impulse

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `ApplyAreaImpulseAndDamage` | Apply area impulse and optional damage to vehicles within a center and radius. 2 overloads with or without direction override. | center: Vector, radius: number, impulseStrength: number, damageAmount: number | None | `mod.ApplyAreaImpulseAndDamage(center, 5, 1000, 0);` |
| `ApplyImpulse` | Apply impulse to one vehicle with world position, direction, and magnitude. | vehicle: Vehicle, worldPosition: Vector, direction: Vector, magnitude: number | None | `mod.ApplyImpulse(vehicle, pos, mod.ForwardVector(), 500);` |

## WorldIcon

| Function | Function / Purpose | Main arguments | Return value | Usage example |
| --- | --- | --- | --- | --- |
| `EnableWorldIconImage` | Enable or disable WorldIcon image display. | worldIcon: WorldIcon, enableImage: boolean | None | `mod.EnableWorldIconImage(...);` |
| `EnableWorldIconText` | Enable or disable text display on WorldIcon. | worldIcon: WorldIcon, enableText: boolean | None | `mod.EnableWorldIconText(...);` |
| `RemoveUIIcon` | Delete the UI Icon Widget attached to the object. You can also specify the target player or team. 2 overloads. | objectWithIcon: mod.Object | None | `mod.RemoveUIIcon(...);` |
| `SetWorldIconColor` | Change the color of WorldIcon. | worldIcon: WorldIcon, newColor: Vector | None | `mod.SetWorldIconColor(...);` |
| `SetWorldIconImage` | Change the image type of WorldIcon. | worldIcon: WorldIcon, newImage: WorldIconImages | None | `mod.SetWorldIconImage(...);` |
| `SetWorldIconOwner` | Restrict WorldIcon to be visible only to specific teams or players. 2 overloads. | worldIcon: WorldIcon, newTeamOwner: Team | None | `mod.SetWorldIconOwner(...);` |
| `SetWorldIconPosition` | Change the display position of WorldIcon. | worldIcon: WorldIcon, newPosition: Vector | None | `mod.SetWorldIconPosition(...);` |
| `SetWorldIconText` | Change the text on WorldIcon. The display text is registered at `Strings.json` and then referenced at `mod.stringkeys`. | worldIcon: WorldIcon, newText: Message | None | `mod.SetWorldIconText(icon, mod.Message(mod.stringkeys.pointA));` |
| `GetWorldIcon` | Get WorldIcon from number or target. | worldIconNumber: number | `WorldIcon` | `const icon = mod.GetWorldIcon(0);` |

# Next appendix to read

UI, notifications, player references, arrays, ObjId, numbers, types, and minimum templates are divided into the following "Appendix A-3: List of actions/value retrieval (UI/references/values)".
