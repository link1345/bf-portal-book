---
title: "Appendix B: Introduction: How to Read the Official Samples"
free: true
---

# 0 Read the Official Samples in Order

The SDK includes official samples. If you start by reading a large sample, the UI, AI, vehicles, and state management will appear all at once, which can be confusing.

First, read them in the following order.

1. `docs/pages`
2. `code/types/mod/index.d.ts`
3. `GodotProject/mods/_StartHere_BasicTemplate`
4. Samples by purpose

In this order, you can grasp the concept from the official documentation, check the API name in the type definition, see the shape of the event in the minimal template, and then move on to the practical samples.

# 1 How to navigate the SDK folder

| Location | What to see | How to read |
| ---- | ---- | ---- |
| `docs/pages/getting_started.html` | Steps to start Godot, Portal Setup, and open a level | Check environment setup |
| `docs/pages/spatial_editor.html` | Spatial Editor operations, Object Library, Export | Supplement to Chapter 4 |
| `docs/pages/gameplay_logic.html` | TypeScript, logs, UI, AI, Spawn, ObjId references | Supplement to Chapter 6 |
| `docs/pages/tips_tricks.html` | Performance notes | Supplement to Chapters 8 and 9 |
| `code/types/mod/index.d.ts` | All APIs in the `mod` namespace | Search function name to see how to use it |
| `GodotProject/mods` | Official Samples | Read by purpose |

If you come across an API you don't know, first search for the function name at `index.d.ts`. Portal's TypeScript ends up calling a function in the `mod` namespace, so this is the dictionary.

# 2 Official Samples to Read First

| Sample | Reason to read first |
| ---- | ---- |
| `_StartHere_BasicTemplate` | Basic forms such as event functions, `GetObjId`, `Message`, `CreateVector` are grouped |
| `PortalGadgetExample` | Check Portal Gadget input events, RayCast, and individual player reactions |
| `FixedCameraExample` | You can check the basics of camera switching and UI button events |
| `VL7Example` | You can check entry/exit events of special objects |
| `BumperCars` | Read as an example of small game loops, vehicles, and state management |
| `GibraltarGrandprix` | Read as an example of races, checkpoints, ranking UI, and vehicle selection |

For beginners, `_StartHere_BasicTemplate` is enough. Larger samples are appealing because they already work, but they contain too much information to use as a first lesson.

# 3 Memo table when reading samples

| What to Look At | What to Note |
| ---- | ---- |
| Entry events | `OnGameModeStarted`, `OnPlayerDeployed`, `OnPlayerInteract`, etc. |
| State management | `phase`, `GameState`, `PlayerProfile`, etc. |
| ObjId references | Places that retrieve objects, such as `GetInteractPoint(500)` |
| UI | Where to create, update, and delete |
| Wait processing | Period and purpose of `mod.Wait` |
| Protection against repeated firing | `isProcessing...`, cooldown, flag |

Just fill out this table to see the overall picture of the sample. Read the structure first rather than reading the entire code. It may sound bossy, but it really helps.

# 4 Writing Patterns to Borrow from the Official Samples

If you read some of the official samples, you will see similar patterns even if the details are different.
This is not just a matter of taste, it's a way to make larger code easier to read, easier to fix, and easier to extend later.

Note that the samples moved under `unsupported` include some writing styles that seem convenient.
However, this document only uses practices that can be read from the supported samples currently located at `GodotProject/mods`.

## 1. Collect setting values at the top

Place the number of participants, time limit, debug flag, vehicle candidates, checkpoint definition, UI name, etc. at the top of the file.

If you write values like `10`, `500`, `true` directly in the middle of the process, it will become a search nightmare when you try to adjust it later.
If you collect them at the beginning, you will decide where to look when adjusting this mode.

```ts
const MIN_PLAYERS = 2;
const COUNTDOWN_SECONDS = 10;
const DEBUG = false;
const VEHICLE_POOL = [mod.VehicleList.Quadbike, mod.VehicleList.GolfCart];
```

`ids.ts` and `config.ts` in Chapter 7 are also an extension of this idea.
By simply changing numbers and settings to names, the code becomes much easier to read.

## 2. Split responsibilities into classes once the code grows

In larger samples like `BumperCars`, `GibraltarGrandprix`, and `AcePursuit`, state management, player management, and UI management are separated into classes.

This doesn't mean that you should turn all your Portal code into a class.
At first, just the functions are sufficient. However, as the number of states and UI for each player increases, it will be easier to read if you separate them into classes based on their responsibilities.

| Role | Examples |
| ---- | ---- |
| Entire game | `GameState`, starting conditions, winner determination, end processing |
| Per player | `PlayerProfile`, Ready state, vehicle, score, individual UI |
| Whole race | `TrackData`, Checkpoints, Laps, Winners |
| UI | Create, update, close, delete |

The point of using classes is not to create more "named boxes." It is to keep processes that change for the same reason in the same place.
For example, if the process of changing the player's Ready state, updating the Ready display, and closing the UI when leaving are scattered, it will definitely be difficult to keep track of them later.

## 3. Separate UI creation, updates, and closing

The UI is a particularly effective place to use classes.
In larger samples, widget creation, display updates, and hiding/deleting are separated.

This makes it easier to know where to touch when you want to change the displayed content, fix forgetting to close the screen, or change the display for each player.

```ts
class ReadyUpUI {
  constructor(private player: mod.Player) {}

  update(): void {
    // Update text and visibility.
  }

  close(): void {
    // Hide or delete widgets.
  }
}
```

It may look excessive at first, but the more UI you have, the more it pays off.
By simply separating "create," "update," and "close," it becomes easier to add presentation effects and states later.

# Conclusion

Official samples are strong learning material if you read them in the correct order.

First, treat `docs/pages` and `index.d.ts` as dictionaries, and learn the event shape with `_StartHere_BasicTemplate`. Then read the purpose-built samples under `GodotProject/mods`.
Then, rather than copying the entire contents of the sample, please incorporate the grouping of setting values, separation of responsibilities using classes, and UI management patterns into your own code. Appendix B of this book also covers only the samples located in this folder.

---

📘 **In the next chapter, "Appendix B: Sample Program Commentary '_StartHere_BasicTemplate'"**, we will explain the basic template that you should read first.
