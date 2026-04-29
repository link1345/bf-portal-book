---
title: "Appendix B: Sample program explanation “BumperCars (vehicle mini game)”"
free: true
---

# Game overview

`BumperCars` is an example of a small mini-game using vehicles.

It contains the basic elements for creating mini-games, such as player equipment restrictions, vehicle management, Ready Up, game status, and UI display.

# Main contents

* Game initialization, AutoSpawn settings, and InteractPoint control at `OnGameModeStarted`.
* Remove weapon and limit fire input at `OnPlayerDeployed`.
* Added appearing vehicles to game management at `OnVehicleSpawned`.
* Receive Ready Up and debug operations at `OnPlayerInteract`.
* Track progress with `GameState` and `HoH_GameHandler`.
* Manage the state of each player at `PlayerProfile`.
* Manage countdown, winner display, and scoreboard in UI class.

# Reading order

## 1 . View entrance events

First, read only the event function at the beginning of the file.

`OnGameModeStarted`, `OnPlayerDeployed`, `OnVehicleSpawned`, `OnPlayerInteract` are the entrances to game progress.

## 2 . View GameState

`GameState` represents what stage this mode is currently in.

Is it during Ready Up, during the starting count, or during the match? If you look here, you can see in which state the event should pass.

## 3 . View PlayerProfile

The status of each player is posted at `PlayerProfile`.

In games where players join, leave, die, or respawn, collecting player information in one place makes it easier to track.

# Tips

Importantly, `OnPlayerDeployed` removes the weapon and limits fire input.

In vehicle mini-games, if normal FPS operations remain, the gameplay will be broken. It is safer to first erase inputs and equipment that are not needed for the mode.

# Conclusion

`BumperCars` is a sample that shows the skeleton of the mini-game Portal mode.

Good to read when you want to learn about vehicles, Ready Up, state management, UI, and player management all at once.
