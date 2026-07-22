---
title: "Appendix B: Sample Program Guide “CustomBT (Custom Breakthrough)”"
free: true
---

# What CustomBT Shows

`CustomBT` is a large Breakthrough-style template in which attackers capture sectors in order while defenders try to exhaust the attackers' reinforcements. It is added as Version 2.0 in SDK 1.4.1.0.

This is not a single-API example. It shows how Sector, CapturePoint, AreaTrigger, HQ, vehicles, AI, UI, VO, SFX, VFX, airspace, and team switching fit into one mode.

# Main Files

| File | Role |
| ---- | ---- |
| `modinfo.json` | Workspace, strings, `base_skel`, game mode, and five preconfigured maps |
| `custom_breakthrough_V2.0.blocks.json` | Main Portal block template |
| `custom_breakthrough_skel.json` | Base configuration imported into Web Builder |
| `CustomBT.strings.json` | Strings for UI, VO, and settings |
| `README.txt` | Setup, ObjID assignments, AI selection, known issues, and changelog |
| `MP_..._Breakthrough.tscn` | Preconfigured Godot scenes |
| `MP_..._Breakthrough.spatial.json` | Map data uploaded to Portal Web Builder |

The SDK includes both exported map JSON and block JSON for cases where copying an Experience does not retain the map or blocks.

# Five Preconfigured Maps

| Level | File stem |
| ---- | ---- |
| Manhattan Bridge (`MP_Dumbo`) | `MP_Dumbo_Breakthrough` |
| Golf Course (`MP_Granite_ClubHouse_Portal`) | `MP_Granite_ClubHouse_Breakthrough` |
| Downtown (`MP_Granite_MainStreet_Portal`) | `MP_Granite_MainStreet_Portal_Breakthrough` |
| Marina (`MP_Granite_Marina_Portal`) | `MP_Granite_Marina_Breakthrough` |
| Defense Nexus (`MP_Granite_TechCampus_Portal`) | `MP_Granite_TechCampus_Portal_CustomBreakthrough` |

The Version 2.0 changelog describes Manhattan as a new layout with a beach landing. These files do not add new Level IDs to the SDK. They preconfigure existing Levels for Custom Breakthrough.

# ObjID Design

| ObjID | Purpose |
| ---- | ---- |
| `100` - `104` | Sector 0 through the final Sector |
| `600` - `604` | AreaTrigger for each Sector |
| `1100` / `1200` / `1300` ranges | Objectives, vehicles, and stationaries for Sectors 1 / 2 / 3 |
| `301` - `303` / `401` - `403` | Team 1 / Team 2 HQs by Sector |
| `998` / `999` | Team Switcher |
| `2000` - `2999` | Automatically enabled VFX |
| `8000` | Airspace AreaTrigger that enables air combat |

These numbers are a contract with the block logic, not mere organization. When adapting the template, design your placed objects around the same ID ranges before connecting the blocks.

# AI and Version 2.0

The README recommends default backfill/static AI on Premium maps and Custom AI on RedSec maps, where default bots may not play every Objective. Custom AI can fill open slots up to 100 total participants, but the README recommends around 60 for local hosting to avoid slowdown.

Version 2.0 adds air combat, Team Switcher, stationaries, unique player UI IDs, capture UI, VO, snow and color filters, and automatic VFX enablement. The Season 2 rework also revises downed/revived capture handling, disabled Objectives, Out of Bounds, CapturePoint progress, Custom AI, and default AI deployment timing.

# Caveats

Known issues include sectors where damage and throwables fail above 30 meters, scoreboard problems after local team changes, vehicles absent from the spawn menu, default AI limitations on RedSec maps, and VFX that render only for players present at game start.

Read `README.txt` first, then inspect the chosen map's `.tscn` / `.spatial.json`, and only then trace sector progression and UI in the block JSON. Diving into the largest JSON first is simply inefficient.
