---
title: "Appendix B: Sample Program Commentary “PortalPerformanceExample (performance measurement)”"
free: true
---

# What to Read in PortalPerformanceExample

`PortalPerformanceExample` shows how to check the average frame time for Portal logic and server-side game processing.
It is the sample for displaying the Performance APIs added in SDK 1.3.3.0 through a debug HUD or logs.

# Main Included Files

| File | Role |
| ---- | ---- |
| `PortalPerformanceExample.ts` | Average frame time retrieval and display logic |
| `PortalPerformanceExample.tscn` | Placement example for performance checks |
| `PortalPerformanceExample.strings.json` | HUD and notification strings |
| `README_PortalPerformanceExample.md` | Explanation of how to read the values |

# Performance APIs

| Name | Role |
| ---- | ---- |
| `mod.GetPortalAverageFrameTime()` | Get average frame time for Portal logic |
| `mod.GetServerAverageFrameTime()` | Get average frame time for server-side game processing |

Both values are recent historical averages.
They are not instant per-frame values, so do not expect the number to jump immediately after a single added operation.

# Flow

The sample reads average frame time at intervals and displays it through UI or notifications.
Checking the values before and after adding heavy logic helps separate Portal logic cost from server-side game processing cost.

Use it especially when testing `OngoingGlobal`, `OngoingPlayer`, large `AllPlayers()` / `AllVehicles()` loops, or mass spawning.

# Notes

Do not make the measurement display itself run heavily every frame.
Update it every second or every few seconds.

The number is an entry point for finding likely causes.
When it looks bad, inspect recently added Ongoing logic, array loops, Spawn calls, and UI creation in that order.

# Conclusion

`PortalPerformanceExample` is the sample for avoiding heavy Portal modes.
By watching average frame time, you can decide early when to thin Ongoing logic, reuse UI instead of recreating it, and avoid spawning too much at once.

