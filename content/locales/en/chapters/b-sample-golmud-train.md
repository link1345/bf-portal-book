---
title: "Appendix B: Sample Program Commentary “GolmudTrainExample (train control)”"
free: true
---

# What GolmudTrainExample Shows

`GolmudTrainExample` controls the train on `Railway to Golmud` (`MP_GolmudRailway`) from Portal script.
This is not ordinary object movement. Read it as an example of SDK-provided train-specific events and functions.

# Main Files

| File | Role |
| ---- | ---- |
| `GolmudTrainExample.ts` | Main logic for train commands, InteractPoints, HUD, and WorldIcon updates |
| `GolmudTrainExample.tscn` | Spatial Editor scene containing InteractPoints, WorldIcons, CapturePoint, and related objects |
| `GolmudTrainExample.strings.json` | String keys |
| `README_GolmudTrainExample.ts` | Notes on train variants, events, and CapturePoint linkage |

# Train APIs

In SDK 1.3.2.0, these train APIs and events are available.

| Name | Role |
| ---- | ---- |
| `mod.GolmudTrainSendMoveCommand(...)` | Sends a move or stop command to the train |
| `mod.GolmudTrainMoveCommands.MoveWest` | Move west |
| `mod.GolmudTrainMoveCommands.Stop` | Stop |
| `mod.GolmudTrainMoveCommands.MoveEast` | Move east |
| `mod.GetGolmudTrainLocation()` | Returns the current train location as a `Vector` |
| `OnGolmudTrainStopped(...)` | Event called when the train stops |
| `mod.GolmudTrainStopReason.ReachedEastTerminal` | Reached the eastern terminal |
| `mod.GolmudTrainStopReason.ReachedWestTerminal` | Reached the western terminal |
| `mod.GolmudTrainStopReason.StoppedInTransit` | Stopped in transit |

# Flow

The sample uses InteractPoints to send `MoveWest`, `Stop`, and `MoveEast` to the train.
Because the train takes about 6 seconds to accelerate or decelerate, the sample disables InteractPoints during that period so commands do not overlap.

`UpdateTrainLocation` polls `mod.GetGolmudTrainLocation()` on a short interval and updates the WorldIcon position and distance text.
Read it as an example of exposing train position through in-game UI.

# Moving CapturePoint

The README explains that enabling `ConnectedToGolmudTrain` on a CapturePoint makes that objective move with the train.
Team 1 capturing the point moves the train west, Team 2 capturing it moves the train east, and neutralizing it stops the train.

This is different from ordinary `MoveObject` usage.
A train-linked CapturePoint only stays readable when the scene placement, size, rotation, and ObjID are kept aligned.

# Cautions

The train depends on the Portal Web setting: Moving Train, one of two Static Train configurations, or no train.
Script alone is not enough if the map or train setting does not match.

The train also does not queue commands.
If you send another command while it is accelerating or decelerating, it will not simply stack up. Keep an input lockout like the sample's roughly 6-second delay.

# Conclusion

`GolmudTrainExample` is specific to `MP_GolmudRailway`.
The useful parts are reading train position, sending train movement commands, updating HUD on train-stop events, and building CapturePoints that move with the train.

