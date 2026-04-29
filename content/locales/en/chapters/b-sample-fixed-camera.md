---
title: "Appendix B: Sample program explanation “FixedCameraExample (Fixed camera and UI button)”"
free: true
---

::::message
This appendix is currently only a rough machine translation, so the wording may be very awkward. I will revise it properly later. Please bear with me for now.
::::

# Game overview

`FixedCameraExample` is a sample that switches FixedCamera placed in Godot from the UI button.

This is useful when you want to create a camera effect, a spectator-like perspective, or a highlight before the event starts.

# Main contents

* Started UI creation and camera movement process at `OnGameModeStarted`.
* Determine which UI button was pressed at `OnPlayerUIButtonEvent`.
* Changed player camera to fixed camera at `mod.SetCameraTypeForPlayer`.
* Moved camera at `mod.MoveObjectOverTime`, `mod.SetObjectTransformOverTime`.
* Assemble the UI with `AddUIContainer`, `AddUIButton`, `AddUIText`.

# Reading order

## 1 . View UI button events

`OnPlayerUIButtonEvent` is the entry point when the UI button is pressed.

It takes the name of the button pressed at `mod.GetUIWidgetName(eventUIWidget)` and branches to `StreetButton`, `HQ1Button`, `ReturnButton`, etc.

## 2 . View camera switching

Switching to a fixed camera takes the following form:

```ts
mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.Fixed, 0);
```

The last number corresponds to the ObjId assigned to FixedCamera on the Godot side. In other words, cameras are also managed using the ObjId ledger in Chapter 4.

## 3 . Watch camera movement

`StartFlyThroughCamera` has a fixed camera that moves over time.

By using `SetObjectTransformOverTime`, you can create a slow-moving production camera instead of just a fixed viewpoint.

# Tips

The back button takes you back to `mod.Cameras.FirstPerson`.

When using a fixed camera, be sure to provide a way to return to the normal viewpoint. Camera effects that cannot be restored are the same as being inoperable for the player.

# Conclusion

`FixedCameraExample` is a sample where you can learn about UI buttons, fixed cameras, and time movement all at once.

It's worth reading when you have a scene you want to show to the players, such as a lobby presentation, strategy explanation, or victory presentation.
