---
title: "Chapter 10: The Future of Portal: Where Battlefield Creativity Goes Next"
free: true
---

# 0 The Future of Portal: Where Battlefield Creativity Goes Next

> Build with change in mind, and your thinking will be harder to break

* How we build will change: as tool specs, AI behavior, and UI standards change, best practices will change too. If you memorize today's "right answer" as a fixed answer, every change will force you to rebuild your thinking.
* Change is opportunity: as the rule editor and map editor gain more features, you may be able to build more safely with less code.
* Learn what to watch, and the anxiety fades: if you know what tends to change, where to review when it changes, and how to reinterpret your setup, updates stop being scary.

> This chapter does not try to predict the future. It collects ways of thinking that will help you avoid getting lost when the future arrives.

# 1 What Changes Easily and What Does Not

First, sort things out. Things that change easily should be reviewed each time. Things that do not change easily can be reused for a long time.

## Things That Change Easily

* UI conventions, such as how messages are shown and what the HUD standard looks like
* How SFX/FX are played, including recommended cooldowns and congestion control
* Handling around XP and publishing, where you should always keep the possibility of restrictions in mind

## Things That Do Not Change Easily

* The **words → markers → effects** order, which is the basic shape of communication
* Managing IDs by name in ids.ts
* Making state explicit, and creating paths that can only be passed once with Phase and onceIn
* The three boxes of boundary / state / presentation from the Chapter 7 split design

> What you adapt for the future is the method. What you keep protecting is the way of thinking.
> Once you can separate those two, change stops being "a hassle" and becomes "a fun adjustment".

# 2 Reinterpreting Your Work as Tools Evolve
## 2.1 When the Rule Editor Grows or Changes

* Reinterpretation: when new events or actions are added, do not call them directly from everywhere. First, create one calling function of your own in `api.ts` or `ui.ts`. Do not increase the number of places where `main` or `Script.ts` hits the API directly.
* Check: make sure the new feature still works well with your existing onceIn single-pass structure. Replace it in a way that still prevents repeated firing.

In programming, a thin calling function like this is sometimes called a wrapper.
The term itself is not the important part. What matters is collecting the place you fix into one location, even if the way Portal APIs are called changes.

## 2.2 When Map Editor Objects Increase

* Reinterpretation: follow the Chapter 4 rule. Do not duplicate IDs; simply add more series when needed.
* Check: pay attention to base-map compatibility for Shared objects. Keep the Chapter 4 habit of checking whether warning marks appear.

## 2.3 Changes in UI Standards: Notifications, Pins, Icons

* Reinterpretation: make `ui.say` replaceable in one place, as discussed in Chapters 7 and 8.
* Check: do not break the "one thing at a time" principle. Even when a new UI arrives, do not show several things at once.
* Effect: the standard for what feels "too noisy" may change over time, but a design that avoids overplaying effects will age well.

# 3 AI and Scripts: Preparing for Future Growth

AI-related systems are likely to benefit a lot from future improvements.

* Current practice: use AI_Spawner and AI_WaypointPath, and secure open space in front of the spawn plus gentle corners along the path, as covered in Chapter 4.
* Room to grow: if AI behavior APIs increase, separate **behavior as data** from **the start signal as an event**.
  * Example: define an **action recipe** as fixed data, and let the rules only call **start Recipe A**.
* Reason: detailed AI commands are likely to change. The **signal skeleton: press → guide → arrive → presentation** is less likely to change.
* Implementation note: even now, keep AI-related code grouped in a dedicated location. Future replacement becomes much easier.

# 4 Performance and Scale: Build the Habit Early

If larger maps and denser battles become normal in the future, a design that resists heaviness will keep paying off.

* Avoid per-frame processing, as in Chapter 8 section 9: distance updates and guidance are usually enough once every 0.5-1 second.
* Decide your own limit for simultaneous playback, such as "up to 3" for SFX/FX.
* Design things so they can be cut off: do not show effects at long range. Put a distance filter in ui.
* Testing habit: include one full-capacity test in operations, as covered in Chapter 9.
  * This lets you use the same procedure even for future scenes that tend to get heavy.

# 5 Growing a Mode with a Small Group After Publishing

A mode only grows after people play it.
However, in Portal, it is not easy for an unknown personal mode to gather players through organic traffic alone.
If you do not have a route through a major streamer or an existing community, it is safer not to overdesign around the assumption that many people will keep gathering.

This book does not make audience growth itself the goal.
After publishing, what you should watch is whether the small number of people who came can start without getting lost, whether progression ever becomes impossible, and whether you know what to fix next.

* Make the short 256-character template from Chapter 9 a habit: goal / players / time / first action.
* Do not assume tags will fill in the gaps: treat creator-defined tags as unavailable, and communicate through the title, description, thumbnail, and external announcement.
* Improve small, publish quickly: use feedback from a small group to fix confusing places or scenes that felt too long.
* Do not spread external announcements too thin: choose one place you can keep using, such as X, Discord, a blog, or Note.

# 6 Future-Proofing Checklist (Every Six Months)

Reviewing only the following once every six months is enough.

1. ids.ts: use Vitest to check for -1, duplicates, and IDs with unclear purposes. Confirm placement IDs on the Godot side with ObjIdManager or the Chapter 4 ledger.
2. ui.ts: check the order and frequency of say / guide / celebrate, and make sure it has not become noisy.
3. config.ts: make sure defense seconds, cooldowns, and recommended player counts still fit the current environment.
4. flow, the transition table: make sure branches have not grown too much. Fold unnecessary branches.
5. Performance: run one load test at full capacity.
6. Description: make sure it still matches reality. Within 256 characters, players should understand the goal, player count, time, and first action.

# 7 Turn Today's Right Answer into Tomorrow's Material

Building, publishing, and stopping there would be a waste.

* Reuse: copy the four-piece set of ui, api, game, and ids as a template for the next mode.
* Start lightly: when a new feature arrives, first test it small, then fold it lightly into the template.
* Have the courage to throw things away: if a small trick has become heavy, do not put it into the next mode from the start. The past is a library; the present is the work site.

# 8 Where Creativity Goes: The Creator's View

* "Fear correctly" protects creativity: assume change, and harden only the core that should not break: IDs, state, and order.
* The "minimum loop" becomes a shared culture: if the flow of press → guide → arrive → presentation is shared, multiple people can build quickly.
* Visualization invites invention: when numbers and state are visible in a debug HUD, experiment → learn → improve becomes faster.

> The future is not just "more new weapons".
> The rules for communication will be updated. Each time, you only need to rewrite **a little**.

# Conclusion

* Chapter 10 is not about predicting the future. It is about making a way of building that does not snap when the future changes.
* Protect named IDs / state and single-pass paths / words → markers → effects / the three-box split.
* What changes is how APIs are called, UI conventions, and the fine details of AI movement. For those, you should only need to fix api or ui in one place.
* With a future-proofing check every six months, your mode can live longer.

# Appendices / Where to Go Next

* Appendix A: Major Events and Actions
* Appendix B: Official Sample Program Commentary
* Appendix C: modlib Commentary


> This chapter is not the **final philosophy**. It is a **toolbox for building again tomorrow**. Add the watchpoints from this chapter to the procedures built in Chapters 3-8, and your creation can continue no matter how Portal evolves.
