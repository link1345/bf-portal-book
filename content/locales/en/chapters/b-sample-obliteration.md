---
title: "Appendix B: Sample Program Commentary “ObliterationExample (Bomb and M-COM)”"
free: true
---

# What to Read in ObliterationExample

`ObliterationExample` shows how to build Obliteration-style rules with Bomb and M-COM.
It is the place to check the Bomb type, Bomb events, and M-COM linkage APIs added in SDK 1.3.3.0.

# Main Included Files

| File | Role |
| ---- | ---- |
| `ObliterationExample.ts` | Main Bomb, M-COM, and win/loss logic |
| `ObliterationExample.tscn` | Placement example related to Bomb and M-COM |
| `ObliterationExample.strings.json` | Notification and HUD strings |
| `README_ObliterationExample.md` | Explanation of Bomb and M-COM setup |

# Bomb and M-COM APIs

Read these APIs and events first.

| Name | Role |
| ---- | ---- |
| `mod.GetBomb(...)` | Get a Bomb reference by number |
| `mod.ForceBombSpawn(...)` | Force the Bomb to spawn |
| `mod.ForceBombDrop(...)` | Force the carried Bomb to drop |
| `mod.ForceBombReset(...)` | Reset the Bomb to its initial state |
| `mod.GiveBombToPlayer(...)` | Give the Bomb to a specified player |
| `mod.SetBombTeam(...)` | Set the Bomb team |
| `mod.SetMCOMArmType(...)` | Set the M-COM arming type |
| `OnBombPickedUp(...)` | Called when the Bomb is picked up |
| `OnBombDropped(...)` | Called when the Bomb is dropped |
| `OnBombStateChanged(...)` | Called when the Bomb state changes |

# Flow

The sample follows Bomb spawning, pickup, drop, reset, and placement at M-COM through events.
You can also check whether a player has the Bomb with `GetSoldierState(..., mod.SoldierStateBool.HasBomb)`.

The M-COM side is matched to Bomb arming through `SetMCOMArmType`.
Instead of reading Bomb state and M-COM state as separate topics, read the flow as: who has the Bomb, which M-COM they carry it to, and when that becomes a win/loss condition.

# Notes

Bomb handling requires more attention to state transitions than ordinary object references.
If you mix logic for immediately after pickup, drop, and reset, notifications and win/loss checks can drift.

Use `IsValid` and `IsUndefined` before handling Bomb or Player references.

# Conclusion

`ObliterationExample` is the sample for objective-carry rules built around Bomb and M-COM.
Keep Bomb state, carrier, M-COM arming, and win/loss checks separate while reading it. That is the base for custom attack/defense rules.

