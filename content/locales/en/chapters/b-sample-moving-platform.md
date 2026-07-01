---
title: "Appendix B: Sample Program Commentary “MovingPlatformExample (moving platforms)”"
free: true
---

# What to Read in MovingPlatformExample

`MovingPlatformExample` shows how to treat Spatial Editor objects as moving platforms.
With SDK 1.3.3.0, it is the sample to read for the `MovingPlatform` idea, `MoveObjectOverTime`, and `OrbitObjectOverTime`.

# Main Included Files

| File | Role |
| ---- | ---- |
| `MovingPlatformExample.ts` | Main script that moves and rotates platforms |
| `MovingPlatformExample.tscn` | Placement example for platforms and paths |
| `MovingPlatformExample.strings.json` | Display strings |
| `README_MovingPlatformExample.md` | Explanation of the object and placement patterns |

# How the Moving Platform Works

This sample uses `BarrierStoneBlock_01_H_PortalPlatform` as the platform.
You can check both patterns: spawning it from code with `SpawnObject`, or placing it in Godot and referring to it by ObjId.

Read these APIs first.

| Name | Role |
| ---- | ---- |
| `mod.MoveObjectOverTime(...)` | Move an object to a target position over time |
| `mod.OrbitObjectOverTime(...)` | Move an object around a center or axis over time |
| `mod.SpawnObject(...)` | Spawn a platform object from RuntimeSpawn |
| `mod.UnspawnObject(...)` | Remove the spawned object |

# Flow

The sample gets a reference to the platform, then moves or rotates it over a fixed amount of time.
Because this is timed movement rather than teleporting, it is the basic pattern for rideable platforms, patrolling floors, and moving gimmicks.

When using placed objects, the ObjId in Godot must match the number retrieved in TypeScript.
If the object does not move, first use `GetObjId()` to confirm that the referenced target is really the platform.

# Notes

Moving platforms affect not only visuals but also player movement.
Too short a duration, too sudden a movement, or too narrow a platform can make players fall or feel uncomfortable.

Also avoid stacking multiple movement commands on the same object without state control.
Like the sample, put wait time or a state flag before sending the next movement command.

# Conclusion

`MovingPlatformExample` is the sample for moving spawned or pre-placed objects through Portal logic.
Read the platform ObjId, movement duration, and timing for the next command first. From there, it is easy to adapt into moving floors and patrol gimmicks.

