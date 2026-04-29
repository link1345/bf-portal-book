---
title: "Appendix B: Sample program explanation “VL7Example (Gas cloud and screen effect)”"
free: true
---

::::message
This appendix is currently only a rough machine translation, so the wording may be very awkward. I will revise it properly later. Please bear with me for now.
::::

# Game overview

`VL7Example` is a sample that combines VL7Cloud, ScreenEffect, SoldierEffect, and WorldIcon to switch the gas cloud effect.

You can check area invasions, visual effects, equipment additions, and WorldIcon color changes all at once.

# Main contents

* Give gas mask to player at `OnPlayerDeployed`.
* Switch between gas cloud screen effects, soldier effects, and visual effects at `mod.SetVL7CloudEffects`.
* Switch the screen effect for each player at `mod.EnableScreenEffect`.
* Switch the effect on the soldier side with `mod.SetSoldierEffect`.
* Take intrusion/exit logs at `OnPlayerEnterVL7Cloud` and `OnPlayerExitVL7Cloud`.
* Show current ON/OFF with color and text of `WorldIcon`.

# Reading order

## 1 . View initialization

`OnGameModeStarted` initializes the effect of VL7Cloud and sets the color and wording of WorldIcon.

When using a toggle type device, it is important to first be able to see whether it is currently ON or OFF.

## 2 . View InteractPoint branches

In `OnPlayerInteract`, the target to be switched is changed depending on the ObjId of the pressed InteractPoint.

The flow to watch is `mod.GetObjId(interactPoint)` → target flag inversion → WorldIcon update → effect update.

## 3 . View intrusion/exit events

`OnPlayerEnterVL7Cloud` and `OnPlayerExitVL7Cloud` are called when the player enters or exits VL7Cloud.

This sample only outputs logs, but in actual mode you can add damage, score, warning display, etc.

# Tips

The WorldIcon color to indicate ON/OFF can be used for debugging and player guidance.

However, some players will miss out if they rely solely on color. For public use, it is safe to include a short text.

# Conclusion

`VL7Example` is a sample to learn area effects and player individual effects.

This is a good book to read first when you want to create a place where something happens when you enter, such as gas, poison, radiation, or special areas.
