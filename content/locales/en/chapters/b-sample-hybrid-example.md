---
title: "Appendix B: Sample Program Commentary “HybridExample (mixing blocks and TypeScript)”"
free: true
---

# What HybridExample Shows

`HybridExample` shows how to call TypeScript functions from Portal blocks.
It is useful when you want to keep existing block logic but move only awkward parts, such as arrays, strings, math helpers, or UI construction, into TypeScript.

This sample calls functions in `HybridExample.ts` from blocks in `HybridExample.workspace.json`.

# Reading Points

| File | Role |
| ---- | ---- |
| `HybridExample.workspace.json` | Block-side rules, variables, and `JsAction` / `JsValue` calls |
| `HybridExample.ts` | TypeScript functions called from blocks |
| `HybridExample.strings.json` | Keys used by UI and string lookup |
| `MP_Granite_TechCampus_Portal_HybridExample.tscn` | Spatial Editor scene for the sample |

Read `JsAction` as a TypeScript call that does not use a return value.
Read `JsValue` as a TypeScript call that returns a value back to Portal variables or other block inputs.

# Key Functions

| Function | Purpose |
| ---- | ---- |
| `Log` | Write logs from block-side calls |
| `LogArray` | Iterate a Portal array and log its values |
| `InitUI` | Create a Text UI with `modlib.ParseUI` |
| `UniqueID1` / `UniqueID2` | Return arrays of sequential strings |
| `SectorUI` | Return sector letters A-Z |
| `Atan2` | Expose a JavaScript math function to Portal |
| `GetString` | Read a value through `mod.strings[key]` |
| `SplitString` | Convert a delimited string into a Portal array |

SDK 1.3.1.0 adds `mod.strings` to the type definition.
Use `mod.stringkeys` when you pass a key into `mod.Message(...)`; use `mod.strings[key]` when you need the raw string value.

# Conclusion

`HybridExample` is the sample to read when you want blocks and TypeScript to cooperate.
Keep event flow in blocks, and move tedious data shaping or utility logic into TypeScript.
