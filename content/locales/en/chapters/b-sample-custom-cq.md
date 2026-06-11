---
title: "Appendix B: Sample Program Commentary “CustomCQ (Custom Conquest)”"
free: true
---

# What CustomCQ Shows

`CustomCQ` is a large Conquest-style Portal template.
Read it as a near-complete mode that combines maps, CapturePoints, AreaTriggers, AI, vehicles, UI, scoreboard logic, music, and VO.

The CustomCQ folder available in SDK 1.3.2.0 is Version 10.0. It includes the template workspace, strings, icon, and preconfigured `.tscn` / `.spatial.json` files for multiple maps.
Do not start by copying everything. Read it to learn how a large mode assigns ObjID ranges and keeps map data aligned with block logic.

# Main Files

| File | Role |
| ---- | ---- |
| `modinfo.json` | Sample name, description, workspace, and strings file |
| `custom_conquest_template_10.0.json` | Main Portal block template |
| `CustomCQ.strings.json` | String keys for UI, VO, score, and settings |
| `README.txt` | Setup notes, ObjID assignments, known issues, changelog |
| `MP_..._Conquest.tscn` | Godot level scenes |
| `MP_..._Conquest.spatial.json` | Map data to upload to Portal Web Builder |

# Included Map Data

`CustomCQ` includes preconfigured Conquest map data such as:

| Display name | Map ID / file example |
| ---- | ---- |
| Siege of Cairo | `MP_Abbasid_CustomConquest` |
| Empire State | `MP_Aftermath_Conquest` |
| Iberian Offensive | `MP_Battery_CustomConquest` |
| Liberation Peak | `MP_Capstone_Conquest` / winter variant |
| Contaminated | `MP_Contaminated_Conquest` / winter variant |
| Manhattan Bridge | `MP_Dumbo_CustomConquest` |
| Operation Firestorm | `MP_FireStorm_Conquest` |
| Golf Course | `MP_Granite_ClubHouse_Portal_CustomConquest` |
| Area 22B | `MP_Granite_MilitaryRnD_Portal_Conquest` |
| Redline Storage | `MP_Granite_MilitaryStorage_Portal_Conquest` |
| Defense Nexus | `MP_Granite_TechCampus_Portal_CustomConquest` |
| Complex 3 | `MP_Granite_Underground_Portal_Conquest` / Mancour version |
| Hagental Base | `MP_Subsurface_Conquest` |

The V10.0 changelog treats Hagental Base and Complex 3 as new maps.
In this repository, it is more precise to say that preconfigured Conquest map files were added for `CustomCQ`, rather than that the whole SDK gained brand-new base level files.

# ObjID Design

| ObjID range | Purpose |
| ---- | ---- |
| `200` - `226` | CapturePoints, with point A starting at 200 |
| `600` - `699` | Vehicle spawner ranges per CapturePoint |
| `901` / `902` | Team 1 / Team 2 AI Spawners |
| `998` / `999` | Team Switchers |
| `1100` - `1199` | Team 1 spawn protection AreaTriggers |
| `1200` - `1299` | Team 2 spawn protection AreaTriggers |
| `1300` - `1399` | Out of bounds AreaTriggers for everyone |
| `1400` | Infantry combat area AreaTrigger |
| `700` - `749` | Repel Trigger |
| `750` - `799` | Repel Target |
| `2000` - `2999` | VFX |

For a mode this large, ObjID ranges are part of the specification.
If you change them casually, objectives, vehicles, AI, and boundary checks become difficult to reason about.

# How to Read It

1. Read `README.txt` for ObjID assignments and known issues.
2. Open the `.tscn` and `.spatial.json` for the map you care about and inspect CapturePoint, AreaTrigger, and Spawner IDs.
3. Check `CustomCQ.strings.json` for UI and VO keys.
4. Read `custom_conquest_template_10.0.json` by feature area: score, objectives, AI, and UI.

# Version 10.0 Updates

V10.0 updates the sample to use the official Combat Area, Surrounding Combat Area, and Exclusive HQ areas.
It also adds an NVG toggle, a Conquest Assault toggle, and starting-ticket settings for Conquest Assault.

When reading older CustomCQ notes, watch for assumptions that airspace and boundary checks are handled only by custom logic.
V10.0 still keeps Custom OOB logic for backward compatibility, but the safer reading path is to treat the official Combat Area objects as the primary structure.

Vehicle spawner properties changed to `EnableRespawn` in SDK 1.3.1.0.
If older notes mention `DisableRespawn`, use the current SDK name and meaning.

# Conclusion

`CustomCQ` is not a small API sample.
It is a sample for studying how a large Portal mode connects map-side ObjIDs, block assumptions, strings, AI, vehicles, and boundary logic.
