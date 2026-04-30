---
title: "Appendix B: Sample Program Commentary “_StartHere_BasicTemplate (basic form to read first)”"
free: true
---

# Game Overview

`_StartHere_BasicTemplate` is a minimal template that shows the entry points of Portal TypeScript.

Rather than a complete game mode, this sample shows what event functions exist and how the basic APIs are called. It is the first sample you should read.

# Main Topics

* Player-related events such as `OnPlayerJoinGame`, `OnPlayerLeaveGame`, `OnPlayerDeployed`.
* Events that work with Godot placements, such as `OnPlayerInteract`, `OnPlayerEnterAreaTrigger`, `OnPlayerExitAreaTrigger`.
* Entry points for the whole game mode, such as `OnGameModeStarted`, `OngoingGlobal`, etc.
* Basic APIs such as `GetObjId`, `GetTeam`, `Message`, `CreateVector`, `Wait`.

# Reading Order

## 1. Check event functions

The functions written in the form `export function On...` are the entry points that are called from the Portal side.

First, check the comments to see when each function is called. Once you understand that, you will know where each piece of processing belongs.

## 2. See the connection with Godot placements

`OnPlayerInteract` and `OnPlayerEnterAreaTrigger` are connected to `InteractPoint` and `AreaTrigger` placed in Godot.

Use `mod.GetObjId(...)` to check which object was pressed or which area was entered. Be sure to read this together with the ObjId ledger from Chapter 4.

## 3. Check frequently used APIs

`OnGameModeStarted` contains the APIs you want to learn first.

| API | How to use |
| ---- | ---- |
| `mod.EnableHQ` | Enabling/disabling HQ |
| `mod.EnableGameModeObjective` | Enable or disable objectives |
| `mod.GetObjId` | Check placed objects and player IDs |
| `mod.CreateVector` | Create three elements such as coordinates and color |
| `mod.Message` | Create display message |
| `mod.DisplayNotificationMessage` | Show a notification message |
| `mod.Wait` | Wait for specified number of seconds |
| `mod.Teleport` | Move the player |
| `mod.GetSoldierState` | Get player state |

# Small Tips

This template is not intended to be used as is. Move only the necessary event functions to your `mods/Script.ts` and adjust the ObjId and message to suit your mode.

It is safe to start by practicing pressing the start button using only `OnGameModeStarted` and `OnPlayerInteract`.

# Conclusion

`_StartHere_BasicTemplate` is a dictionary-like sample of Portal TypeScript.

Before creating a game, use this file to check only the shapes of event functions, ObjId references, messages, coordinates, and wait processing. If you read this before moving on to other samples, the overall picture becomes much clearer.
