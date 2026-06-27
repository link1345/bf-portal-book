---
title: "Chapter 8.5: Building Checkpoint Rush Up to Pre-Publish"
free: true
---

By the end of Chapter 8, we have covered placement, IDs, rule design, TypeScript, UI, SFX, and FX.
But when those ideas are split across chapters, it can still be hard to see the actual order of work when making a mode.

This chapter bundles the minimum loop so far into a small mode called **Checkpoint Rush**.
We will not add new concepts. Instead, we will rearrange the pieces from Chapters 4 through 8 into the order used when preparing a mode just before publishing.

# 0. What We Will Build

Checkpoint Rush is a small experience with only this flow:

1. Press the start button in the center of the lobby.
2. Hide the entrance WorldIcon and show the target WorldIcon.
3. Enter the target AreaTrigger.
4. Defend for 10 seconds.
5. Show a success message, SFX, and FX once.

The goal of this chapter is not to press the publish button.
The chapter is complete when the following five items are ready and checked just before registration in Portal Web Builder.

| Completion item | What to check |
| ---- | ---- |
| Placement IDs | Required ObjIds are set in Godot and recorded in the ledger |
| Code | IDs, settings, display, progress, and events are separated under `mods` |
| Text | Display text is in `Strings.json`, not hard-coded in the script |
| Tests | `lint`, `test`, and `build` pass in that order |
| Pre-registration check | `dist/Script.ts` and `dist/Strings.json` are confirmed as registration targets |

> This chapter is not a recap. It is a practical chapter that fixes the order of work.

# 1. Put the Design on One Page First

First, make the mode explainable in a few words.

| Item | Content |
| ---- | ---- |
| Mode name | Checkpoint Rush |
| Objective | Press the center terminal, follow the marker, reach the target, and defend for 10 seconds |
| Recommended players | 8-16 players |
| Play time | 10-15 minutes |
| First action | Press the terminal in the center of the lobby |

Next, put the Godot placements and the TypeScript references in the same table.

| Purpose | ObjId | Godot object | TypeScript getter | Initial state |
| ---- | ---- | ---- | ---- | ---- |
| Start button | 500 | InteractPoint | `mod.GetInteractPoint(500)` | Enabled |
| Entrance guide | 21 | WorldIcon | `mod.GetWorldIcon(21)` | Visible |
| Target guide | 22 | WorldIcon | `mod.GetWorldIcon(22)` | Hidden |
| Target detector | 11 | AreaTrigger | `mod.GetAreaTrigger(11)` | Enabled |
| Success FX | 901 | FX / VFX | `mod.GetVFX(901)` | Hidden |
| Success SFX | 951 | SFX | `mod.PlaySound(951, 1)` | Not played |

If you start without this table, you will later wonder what `500` was or whether `21` or `22` was the entrance icon.
In this chapter, use the Chapter 4 ledger directly as the production checklist.

# 2. Place the Godot Objects

In Godot, place only the objects required for game progress before adding decoration.

1. Place an `InteractPoint` in the center of the lobby and set ObjId to `500`.
2. Place a `WorldIcon` near the entrance side and set ObjId to `21`.
3. Place a `WorldIcon` slightly before the target and set ObjId to `22`.
4. Place an `AreaTrigger` at the target and set ObjId to `11`.
5. Place success FX and SFX at the target and set ObjIds to `901` / `951`.

Use the practical flow from Chapter 4 for the placement work itself.
The important part in this chapter is updating the "test result" column in the ledger after placing the objects.

| Purpose | ObjId | Before test | After test |
| ---- | ---- | ---- | ---- |
| Start button | 500 | Unchecked | OK when it can be pressed |
| Entrance guide | 21 | Unchecked | OK when it is visible at start |
| Target guide | 22 | Unchecked | OK when it appears after start |
| Target detector | 11 | Unchecked | OK when it reacts on entry |
| Success FX/SFX | 901 / 951 | Unchecked | OK when they play once |

`AreaTrigger` often fails because it is not tall enough.
Make it thick enough to catch players even when they jump or enter from a slope.

# 3. Minimum TypeScript Structure

It is easier not to start with a huge `Script.ts`.
Following the structure from Chapter 7, split the code into these five files.

| File | Role | What goes here |
| ---- | ---- | ---- |
| `ids.ts` | ObjIds | 500, 21, 22, 11, 901, 951 |
| `config.ts` | Tunable values | Defend seconds, message duration, SFX cooldown |
| `ui.ts` | Presentation | Messages, WorldIcon switching, success effects |
| `game.ts` | Progress state | Started, reached, defending, one-shot gates |
| `Script.ts` | Event entrypoints | `OnGameModeStarted`, `OnPlayerInteract`, `OnPlayerEnterAreaTrigger` |

`ids.ts` only turns numbers into names.

```ts
export const IP_START = 500;
export const ICON_ENTRANCE = 21;
export const ICON_TARGET = 22;
export const AREA_TARGET = 11;
export const FX_GOAL = 901;
export const SFX_GOAL = 951;
```

`config.ts` collects values you may tune later.

```ts
export const DEFEND_SECONDS = 10;
export const MESSAGE_SECONDS = 2;
export const SFX_COOLDOWN_SECONDS = 2;
```

Put only display text in `Strings.json`.
Do not hard-code Japanese or other multibyte text in the script.

```json
{
  "start": "Go to the checkpoint.",
  "defend": "Defend for {} seconds.",
  "success": "Checkpoint secured."
}
```

In `Script.ts`, keep only the event entrypoints easy to read.

:::message alert
The following code is an excerpt from a sample program. It will not run by itself.
It omits the `import` lines, the implementations of `ids.ts` / `config.ts` / `ui.ts` / `game.ts`, `modlib.ConditionState`, SFX cooldowns, logging, and other supporting code.
:::

```ts
export function OnGameModeStarted(): void {
  game.reset();
  ui.guide(undefined, ICON_ENTRANCE);
}

export function OnPlayerInteract(player: mod.Player, interactPoint: mod.InteractPoint): void {
  const objectId = mod.GetObjId(interactPoint);

  if (game.startGate.update(game.canStart(objectId))) {
    game.markStarted();
    mod.EnableInteractPoint(interactPoint, false);
    ui.say(mod.Message(mod.stringkeys.start));
    ui.guide(ICON_ENTRANCE, ICON_TARGET);
  }
}

export async function OnPlayerEnterAreaTrigger(player: mod.Player, area: mod.AreaTrigger): Promise<void> {
  const objectId = mod.GetObjId(area);

  if (game.targetGate.update(game.canReachTarget(objectId))) {
    game.markDefending();
    ui.say(mod.Message(mod.stringkeys.defend, DEFEND_SECONDS));
    await mod.Wait(DEFEND_SECONDS);
    game.markReached();
    ui.guide(ICON_TARGET, undefined);
    ui.celebrate(FX_GOAL, SFX_GOAL);
    ui.say(mod.Message(mod.stringkeys.success));
  }
}
```

This code is only an excerpt that shows the core shape of each file's role.
If you paste it into `Script.ts` as-is, it will not run because the required `import` lines and helper functions are missing.
When putting it into the real template, add `import` lines, `modlib.ConditionState`, SFX cooldowns, and logging in the style from Chapters 6 and 7.

# 4. Check Behavior in Stages

It is faster not to test everything at once.
For Checkpoint Rush, check these three stages.

## 4.1 Pressing the Button Switches the WorldIcon

Only check two things:

* `WorldIcon 21` is visible at the start.
* Pressing `InteractPoint 500` hides `21` and shows `22`.

If this fails, do not look at FX or defend seconds yet.
Fix the ObjIds, initial visibility, and the `OnPlayerInteract` condition.

## 4.2 AreaTrigger Plays FX/SFX Once

Next, enter the target.

* `AreaTrigger 11` reacts only at the moment of entry.
* `SFX 951` is not repeatedly triggered.
* `FX 901` appears as the success effect.
* If you use looped FX, stop it on exit when needed.

If this fails, check the `AreaTrigger` height, ObjId, and how `ConditionState` is used.

## 4.3 Confirm the 10-Second Defense and Logs

Finally, check the defense countdown and logs.

```text
checkpoint:start
checkpoint:defend
checkpoint:success
```

If `PortalLog.txt` shows these lines in this order, the event flow is readable.
If the same line appears many times, repeated triggering is not blocked.
Check whether `startGate`, `targetGate`, `game.started`, or `game.reached` should stop it.

# 5. Pre-Registration Check

Before registering in Portal Web Builder, run these commands in this order.

| Order | Command | What to check |
| ---- | ---- | ---- |
| 1 | `npm run lint` | Syntax and style are not suspicious |
| 2 | `npm run test` | IDs and small condition functions are not broken |
| 3 | `npm run build` | `dist/Script.ts` and `dist/Strings.json` are generated |

Do not register the development `mods/Script.ts`.
The files to pass to Portal Web Builder are the built **`dist/Script.ts`** and **`dist/Strings.json`**.

Before moving to Chapter 9, check at least these items.

| Check | Passing line |
| ---- | ---- |
| Solo test | Start, move, defend, and success all work |
| Two-player test | When one player presses the button, both players understand the next action |
| Redeploy | WorldIcon and UI do not break after death or redeploy |
| Mid-round join | A player joining mid-flow is not lost |
| Logs | No unexpected repeated triggers or errors appear |

When this table is filled, you can move on to publishing and operations.

# 6. What This Chapter Does Not Add

If Checkpoint Rush gets too large, this chapter loses its purpose.
This chapter does not cover these topics:

* Large-scale promotion, thumbnails, announcements, and operation logs: covered in Chapter 9.
* Detailed official sample reading: covered in Appendix B.
* The full modlib function list and detailed usage: covered in Appendix C.

What we build here is not a flashy finished product. It is a small project that is hard to break.
First pass the small loop, read the logs, and finish the pre-registration checks.
Then move on to Chapter 9 for publishing, hosting, and operations.

# Conclusion

* Checkpoint Rush is a small practical project that arranges the parts from Chapters 4-8 in production order.
* Preparing the design table and ObjId ledger first keeps Godot and TypeScript aligned.
* Splitting into `ids.ts`, `config.ts`, `ui.ts`, `game.ts`, and `Script.ts` makes pre-publish fixes less scary.
* Once `lint`, `test`, `build`, and solo / two-player / redeploy / mid-round join checks are done, move on to publishing preparation in Chapter 9.

---

📘 **Next chapter: "Publishing, Hosting, and Operations"** covers descriptions, thumbnails, test sessions, and update procedures to make this small mode playable by others.
