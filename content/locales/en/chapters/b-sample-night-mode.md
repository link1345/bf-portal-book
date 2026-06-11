---
title: "Appendix B: Sample Program Commentary “NightModeExample (night effects and NVG)”"
free: true
---

# What NightModeExample Shows

`NightModeExample` switches a night-time presentation for players who enter an area on the map.
It combines `ScreenEffects.Night`, NVG equipment, SFX, and VFX, so read it as a compact example of changing visuals and equipment from an event.

# Main Files

| File | Role |
| ---- | ---- |
| `NightModeExample.ts` | Main logic for night toggling, NVG, SFX playback, and VFX updates |
| `NightModeExample.tscn` | Spatial Editor scene containing the AreaTrigger, VFX, and SFX objects |
| `tsconfig.json` | TypeScript configuration |

# Flow

The sample initializes SFX and VFX in `OnGameModeStarted`, then continuously updates the VFX position and color in `OngoingGlobal`.
When a player enters the AreaTrigger, `OnPlayerEnterAreaTrigger` toggles night mode.

Focus on these points:

1. Use `mod.GetSFX(200)` / `mod.GetSFX(201)` to reference day and night sounds.
2. Enable `mod.GetVFX(100)` and change its speed, scale, and color.
3. Toggle the screen effect with `mod.EnableScreenEffect(player, mod.ScreenEffects.Night, ...)`.
4. Add and remove NVG with `mod.AddEquipment(player, mod.Gadgets.Mask_NVG)` and `mod.RemoveEquipment(...)`.

# Reading Notes

`OnPlayerDeployed` reapplies NVG to players who deploy while night mode is enabled.
The important pattern is not only toggling state from an event, but also reapplying that state to players who join or redeploy later.

The sample stores night state in the global `nightModeEnabled` variable.
If each player needs a different night state, do not reuse this shape directly; split the state by player.

# Cautions

The AreaTrigger, VFX, and SFX ObjIDs must match the numeric IDs in the code.
Before changing the code, check what objects `100`, `101`, `200`, and `201` refer to in the `.tscn`.

# Conclusion

`NightModeExample` looks like a visual-effects sample, but its core lesson is applying one state change to the player, screen effect, sound, and VFX together.
You can reuse the pattern for night battles, gas zones, alert areas, and special fields.

