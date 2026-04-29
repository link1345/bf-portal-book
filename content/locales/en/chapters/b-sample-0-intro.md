---
title: "Appendix B: Introduction How to read the official sample"
free: true
---

# 0　Read the official samples in a specific order

The SDK includes official samples. If you suddenly read a large sample, the UI, AI, vehicles, and state management will appear all at once, which can be confusing.

First, read them in the following order.

1. `docs/pages`
2. `code/types/mod/index.d.ts`
3. `GodotProject/mods/_StartHere_BasicTemplate`
4. Samples by purpose

In this order, you can grasp the concept from the official documentation, check the API name in the type definition, see the shape of the event in the minimal template, and then move on to the actual sample.

# 1 How to navigate the SDK folder

| Location | What to see | How to read |
| ---- | ---- | ---- |
| `docs/pages/getting_started.html` | Steps to start Godot, Portal Setup, and open a level | Confirm environment construction |
| `docs/pages/spatial_editor.html` | Spatial Editor operations, Object Library, Export | Supplement to Chapter 4 |
| `docs/pages/gameplay_logic.html` | TypeScript, logs, UI, AI, Spawn, ObjId reference | Supplement to Chapter 6 |
| `docs/pages/tips_tricks.html` | Performance notes | Supplement to Chapters 8 and 9 |
| `code/types/mod/index.d.ts` | `mod` All APIs in namespace | Search function name to see how to use it |
| `GodotProject/mods` | Official sample | Read by purpose |

If you come across an API you don't know, first search for the function name at `index.d.ts`. Portal's TypeScript ends up calling a function in the `mod` namespace, so this is the dictionary.

# 2 Official sample to read first

| Sample | Reason to read first |
| ---- | ---- |
| `_StartHere_BasicTemplate` | Basic forms such as event functions, `GetObjId`, `Message`, `CreateVector` are grouped |
| `PortalGadgetExample` | View Portal Gadget input events, RayCast, and individual player reactions |
| `FixedCameraExample` | You can check the basics of camera switching and UI button events |
| `VL7Example` | You can check entry/exit events of special objects |
| `BumperCars` | Read as an example of small game loops, vehicles, and state management |
| `GibraltarGrandprix` | Read as an example of races, checkpoints, ranking UI, and vehicle selection |

For beginners, `_StartHere_BasicTemplate` is sufficient. Complex samples are attractive as working finished products, but they contain too much information for beginners to read.

# 3 Memo table when reading samples

| Items to view | Contents to note |
| ---- | ---- |
| Entrance events | `OnGameModeStarted`, `OnPlayerDeployed`, `OnPlayerInteract`, etc. |
| State management | `phase`, `GameState`, `PlayerProfile`, etc. |
| ObjId reference | Obtaining location like `GetInteractPoint(500)` |
| UI | Where to create, update, and delete |
| Wait processing | Period and purpose of `mod.Wait` |
| Countermeasures against multiple ignitions | `isProcessing...`, cooldown, flag |

Just fill out this table to see the complete picture of your sample. Read the structure first rather than reading the entire code. It may sound fancy, but it really works.

# 4 Writing style you want to incorporate from the official sample

If you read some of the official samples, you will see similar manners even if the details are different.
This isn't just a preference, it's a way to make larger code easier to read, easier to fix, and easier to extend later.

Note that the samples moved under `unsupported` include some writing styles that seem convenient.
However, this document only uses practices that can be read from the supported samples currently located at `GodotProject/mods`.

## 1. Collect setting values at the beginning

Place the number of participants, time limit, debug flag, vehicle candidates, checkpoint definition, UI name, etc. at the top of the file.

If you write values like `10`, `500`, `true` directly in the middle of the process, it will become a search hell when you try to adjust it later.
If you collect them at the beginning, you will decide where to look when adjusting this mode.

```ts
const MIN_PLAYERS = 2;
const COUNTDOWN_SECONDS = 10;
const DEBUG = false;
const VEHICLE_POOL = [mod.VehicleList.Quadbike, mod.VehicleList.GolfCart];
```

`ids.ts` and `config.ts` in Chapter 7 are also an extension of this idea.
By simply changing numbers and settings to names, the code becomes much easier to read.

## 2. Divide roles in class when children get older

In larger samples like `BumperCars`, `GibraltarGrandprix`, and `AcePursuit`, state management, player management, and UI management are separated into classes.

This doesn't mean that you should turn all your Portal code into a class.
At first, just the functions are sufficient. However, as the number of states and UI for each player increases, it will be easier to read if you separate them into classes based on their responsibilities.

| Role | Examples |
| ---- | ---- |
| Entire game | `GameState`, starting conditions, winner determination, ending process |
| Per player | `PlayerProfile`, Ready state, vehicle, score, individual UI |
| Whole Race | `TrackData`, Checkpoints, Laps, Winners |
| UI | Create, update, close, delete |

The important thing in classing is not to increase the number of "named boxes" but to place processes that change for the same reason in the same place.
For example, if the process of changing the player's Ready state, updating the Ready display, and closing the UI when leaving are scattered, it will definitely be difficult to keep track of them later.

## 3. UI separates create, update, and close

The UI is a particularly effective place to use classes.
In the large sample, the process of creating a widget, the process of updating the display content, and the process of hiding/deleting are separated.

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

It seems like an exaggeration at first, but the more UI you have, the better it becomes.
By simply separating "create," "update," and "close," it becomes easier to add effects and states later.

# Conclusion

Official samples are a powerful teaching material if you read them in the correct order.

First, make `docs/pages` and `index.d.ts` into dictionaries, and memorize the event shape with `_StartHere_BasicTemplate`. Then read the purpose-built samples under `GodotProject/mods`.
Then, rather than copying the entire contents of the sample, please incorporate the aggregation of setting values, separation of responsibilities using classes, and UI management manners into your own code. Appendix B of this book also covers only the samples located in this folder.

---

📘 **In the next chapter, "Appendix B: Sample program explanation '_StartHere_BasicTemplate'"**, we will explain the basic template that you should read first.
