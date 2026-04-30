---
title: "Appendix B: Sample Program Commentary “AcePursuit (Race/Time Survival)”"
free: true
---

# Game Overview

`AcePursuit` is a sample of race/time survival using aircraft.

It has all the elements necessary for a larger game mode, such as checkpoints, laps, vehicle selection, ranking UI, start/end countdown, etc.

# Main Topics

* Define course data at `RaceTrack`, `Checkpoint`, `Vector3`.
* Switch between race and time survival at `GameType`.
* Manage overall race status, participants, winners, and countdown at `TrackData`.
* Manage vehicles, laps, times, and UI status for each player at `PlayerProfile`.
* Display vehicle selection, ranking, number of laps, and remaining time in UI class.
* Show checkpoint passage and state changes using SFX and WorldIcon.
* Check players who left or became invalid, then clean up UI and vehicles.

# Reading Order

## 1. Check course definition

First, look at the flow of `RaceTrack`, `Checkpoint`, and `tracks`.

In aircraft racing, the first thing that matters is where to go, in what order, and how many laps. Please make sure that you have the checkpoint position, orientation, and correction flag as data.

## 2. Check TrackData

`TrackData` is the core class with one race's worth of state.

Participants, winners, starting count, ending count, game type, selectable aircraft, etc. are gathered here. If you want to know where the race is right now, start by following `TrackData`.

## 3. Check PlayerProfile and UI

Each player's state is collected in `PlayerProfile`.

Vehicle selection, driving time, laps, ranking, and scoreboard display change for each player. It's hard to get lost if you read `TrackData` for the whole, `PlayerProfile` for individuals, and UI classes for presentation.

## 4. Check end processing and leave handling

`Winner`, `PlayerCompletedTrack`, `PlayerLeftGame`, etc. are important processes that determine how the race ends.

For larger modes, the end processing is more fragile than the start process. Please check the order in which winners are determined, everyone completes the race, mid-race leaving, closing the UI, and removing vehicles.

# Small Tips

`AcePursuit` has constants grouped near the beginning.

By placing adjustment values such as `VERSION`, `debugPlayer`, `MinimumPlayerToStart`, `MapPlayers` and various countdown values at the top, it will be easier to distinguish between test builds and adjust the balance.

It is also helpful to note that race and time survival are separated by `GameType`. When the number of game types increases, instead of writing conditional branches here and there, it will be easier to read if you fix the values that represent the state and type.

# Conclusion

`AcePursuit` is an example for reading a larger game mode with state.

Don't get into the details of the UI from the beginning, just follow the course definition, `TrackData`, `PlayerProfile`, winner determination, and leave handling. It can also be applied to modes other than races, such as modes in which goals are passed in sequence, or modes in which each participant has progress.
