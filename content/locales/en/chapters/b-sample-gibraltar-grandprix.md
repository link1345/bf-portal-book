---
title: "Appendix B: Sample Program Commentary “Gibraltar Grandprix (ground race)”"
free: true
---

# Game Overview

`GibraltarGrandprix` is a checkpoint-based ground race sample.
As a Grand Prix format set in Gibraltar, you can check checkpoints, vehicles, ranking UI, and countdown.

# Main Topics

* Define course data at `RaceTrack` and `Checkpoint`.
* Manage the entire race state at `TrackData`.
* Manage laps, checkpoints, and rankings for each player at `PlayerProfile`.
* Manage vehicle allocation and vehicle status at `VehicleHandler`.
* Manage next checkpoint display at `HoH_CheckpointWorldIconsHolder`.
* Handle in-race events at `OnVehicleSpawned`, `OnPlayerDeployed`, `OnPlayerDied`, etc.
* Receive UI operations such as vehicle selection at `OnPlayerUIButtonEvent`.

# Reading Order

## 1. Check course definition

First, look at the flow of `RaceTrack`, `Checkpoint`, and `tracks`.

In a racing game, "how to store the course as data" is more important than the logic itself. Check how checkpoint positions, directions, and lap counts are converted into data.

## 2. Check TrackData

`TrackData` is a class that has the state of one race.

It is the central place for tracking who is participating, whether the race has started, whether there is a winner, and whether the race is counting down.

## 3. Check the UI and vehicles

In a race, you need to show players where they are next, where they are now, and when it will start.

Check which class is responsible for WorldIcon, Scoreboard UI, Start Countdown, and Vehicle Select UI.

# Small Tips

`GibraltarGrandprix` is a race sample.

# Conclusion

`GibraltarGrandprix` is an excellent material for checkpoint games.

If you read the course data, participant management, vehicle management, and ranking UI separately, you can also apply the pattern to non-race modes where players pass goals in order.
