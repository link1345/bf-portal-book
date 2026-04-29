---
title: "Appendix B: Sample program explanation “_StartHere_BasicTemplate (basic form to read first)”"
free: true
---

# Game overview

`_StartHere_BasicTemplate` is a minimal template that summarizes the entrance to Portal TypeScript.

Rather than a complete game mode, this is a sample to see what event functions there are and how to call which API. This is the sample you should read first.

# Main contents

* Player-related events such as `OnPlayerJoinGame`, `OnPlayerLeaveGame`, `OnPlayerDeployed`.
* Events that work with Godot placements, such as `OnPlayerInteract`, `OnPlayerEnterAreaTrigger`, `OnPlayerExitAreaTrigger`.
* Entrance to entire game modes, such as `OnGameModeStarted`, `OngoingGlobal`, etc.
* Basic APIs such as `GetObjId`, `GetTeam`, `Message`, `CreateVector`, `Wait`.

# Reading order

## 1 . View event functions

The functions written in the form `export function On...` are the entry points that are called from the Portal side.

First, check the comments to see when it will be called. Once you understand this, you will know where to write the processing.

## 2 . See the connection with Godot placements

`OnPlayerInteract` and `OnPlayerEnterAreaTrigger` are connected to `InteractPoint` and `AreaTrigger` placed in Godot.

Check what was pressed and what area it entered at `mod.GetObjId(...)`. Be sure to view this together with the ObjId ledger in Chapter 4.

## 3 . View frequently used APIs

`OnGameModeStarted` contains the APIs you want to learn first.

| API | How to use |
| ---- | ---- |
| `mod.EnableHQ` | Enabling/disabling HQ |
| `mod.EnableGameModeObjective` | Enable/disable goals |
| `mod.GetObjId` | Check placed items and player IDs |
| `mod.CreateVector` | Create three elements such as coordinates and color |
| `mod.Message` | Create display message |
| `mod.DisplayNotificationMessage` | Issue notification message |
| `mod.Wait` | Wait for specified number of seconds |
| `mod.Teleport` | Move the player |
| `mod.GetSoldierState` | Get player state |

# Tips

This template is not intended to be used as is. Move only the necessary event functions to your `mods/Script.ts` and adjust the ObjId and message to suit your mode.

It is safe to start by practicing pressing the start button using only `OnGameModeStarted` and `OnPlayerInteract`.

# Conclusion

`_StartHere_BasicTemplate` is a dictionary-like sample of Portal TypeScript.

Before creating a game, please check only the event function, ObjId reference, message, coordinates, and wait processing form here. If you read this and move on to other samples, your outlook will suddenly become better.
