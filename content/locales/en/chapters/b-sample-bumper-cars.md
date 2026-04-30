---
title: "Appendix B: Sample Program Commentary “BumperCars (vehicle minigame)”"
free: true
---

# Game Overview

`BumperCars` is an example of a small mini-game using vehicles.

It contains the basic elements for creating mini-games, such as player equipment restrictions, vehicle management, Ready Up, game status, and UI display.

# Main Topics

* Game initialization, AutoSpawn settings, and InteractPoint control at `OnGameModeStarted`.
* Remove weapon and limit fire input at `OnPlayerDeployed`.
* Add spawned vehicles to game management at `OnVehicleSpawned`.
* Receive Ready Up and debug operations at `OnPlayerInteract`.
* Track progress with `GameState` and `HoH_GameHandler`.
* Manage the state of each player at `PlayerProfile`.
* Manage countdown, winner display, and scoreboard in UI class.

# Reading Order

## 1. Check entrance events

First, read only the event function at the beginning of the file.

`OnGameModeStarted`, `OnPlayerDeployed`, `OnVehicleSpawned`, `OnPlayerInteract` are the entrances to game progress.

## 2. Check GameState

`GameState` represents what stage this mode is currently in.

Is it during Ready Up, during the starting countdown, or during the match? Looking here tells you which state each event should be allowed to pass through.

## 3. Check PlayerProfile

Each player's state is collected in `PlayerProfile`.

In games where players join, leave, die, or respawn, collecting player information in one place makes it easier to track.

# Small Tips

Importantly, `OnPlayerDeployed` removes the weapon and limits fire input.

In vehicle mini-games, if normal FPS operations remain, the gameplay will be broken. It is safer to first erase inputs and equipment that are not needed for the mode.

# Conclusion

`BumperCars` is a sample that shows the skeleton of the mini-game Portal mode.

It is worth reading when you want to learn about vehicles, Ready Up, state management, UI, and player management all at once.
