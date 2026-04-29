---
title: "Appendix B: Sample program explanation “PortalGadgetExample (dedicated gadget input)”"
free: true
---

# Game overview

`PortalGadgetExample` is a sample that allows the player to have a Portal Gadget and receives input such as aiming, shooting, and laser switching using a script.

The main point is that you can receive the player's intentions using special gadgets, rather than using substitute operations such as "crouch and execute".

# Main contents

* Added Portal Gadget at `mod.AddEquipment(player, mod.Gadgets.Misc_PortalGadget)`.
* Receive shooting input at `OnPortalGadgetFireStart`, `OnPortalGadgetFireStop`.
* Receive aiming input at `OnPortalGadgetAimStart`, `OnPortalGadgetAimStop`.
* Enable/disable the mode with `OnPortalGadgetLaserToggle`.
* Use player gaze direction with `RayCast`, `OnRayCastHit`, `OnRayCastMissed`.
* Switch between teleport mode and object creation mode with `InteractPoint`.

# Reading order

## 1 . View equipment grants

Portal Gadget is assigned at `OnPlayerDeployed`.

The process of handing over equipment when the player deploys is easy to use in other modes as well.

## 2 . View input events

Portal Gadget input is received in a separate event from the normal `OnPlayerInteract`.

| Event | Role |
| ---- | ---- |
| `OnPortalGadgetFireStart` | Pressed the fire button |
| `OnPortalGadgetFireStop` | Released the fire button |
| `OnPortalGadgetAimStart` | Started aiming |
| `OnPortalGadgetAimStop` | Stopped aiming |
| `OnPortalGadgetLaserToggle` | Laser switching input |

## 3 . Watch RayCast

In this sample, a RayCast is launched from the player's line of sight, teleporting to the point it hits, and creating an object.

The flow you should see is `GetRayCastVectors` → `mod.RayCast` → `OnRayCastHit` / `OnRayCastMissed`.

# Tips

It has the current mode as a number, like `currentSwitchMode`. If you create it yourself, it will be easier to read if you use a string type like `"Teleport"` or `"SpawnObject"`.

It is also helpful to see the reason given at `DisplayHighlightedWorldLogMessage` when RayCast fails. If it doesn't respond to input, it feels "broken" to the player.

# Conclusion

Portal Gadget is a powerful tool for creating active player input.

In this sample, please focus on the flow of gadget attachment, input events, RayCast, mode switching, and failure messages.
