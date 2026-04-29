---
title: "Appendix B: Sample program explanation “Gibraltar Grandprix (ground race)”"
free: true
---

# Game overview

`GibraltarGrandprix` is a checkpoint based ground race sample.
As a Grand Prix format set in Gibraltar, you can check checkpoints, vehicles, ranking UI, and countdown.

# Main contents

* Define course data at `RaceTrack` and `Checkpoint`.
* Manage the entire race state at `TrackData`.
* Manage laps, checkpoints, and rankings for each player at `PlayerProfile`.
* Manage vehicle allocation and vehicle status at `VehicleHandler`.
* Manage next checkpoint display at `HoH_CheckpointWorldIconsHolder`.
* Handle in-race events at `OnVehicleSpawned`, `OnPlayerDeployed`, `OnPlayerDied`, etc.
* Receive UI operations such as vehicle selection at `OnPlayerUIButtonEvent`.

# Reading order

## 1. View course definition

First, look at the flow of `RaceTrack`, `Checkpoint`, and `tracks`.

In a racing game, ``how to store the course as data'' is more important than logic. Please make sure that the location, direction, and number of laps of the checkpoint are converted into data.

## 2. View TrackData

`TrackData` is a class that has the state of one race.

It will be the focal point for tracking who is participating, whether the race has yet to start, if there is a winner, and if the race is counting down.

## 3. View the UI and vehicles

In a race, you need to show players where they are next, where they are now, and when it will start.

Check which class is responsible for WorldIcon, Scoreboard UI, Start Countdown, and Vehicle Select UI.

# Tips

`GibraltarGrandprix` is a race sample.

# Conclusion

`GibraltarGrandprix` is an excellent material for checkpoint games.

By reading the course data, participant management, vehicle management, and ranking UI separately, it can also be applied to "order-by-goal mode" other than races.
