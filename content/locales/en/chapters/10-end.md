---
title: "Chapter 10 Future Portal: The future of BF series creativity"
free: true
---

# 0 Future Portal: The future of BF series creativity

> ―― Unbreakable thinking created with the premise of change

* How we do things changes: As tool specifications, AI behavior, and UI standards change, so do best practices. If you memorize the current “correct answer” as a “fixed correct answer,” you will have to rework it every time there is a change.
* Change is an opportunity: The more features the rule editor and map editor have, the more possibilities there are to make them safer with less code.
* Anxiety disappears when you learn how to keep an eye on things: What is likely to change, and where to review if things change - If you have monitoring points and a replacement procedure, updates won't be scary.

> This chapter does not try to predict the future, but rather summarizes ways of thinking to avoid getting lost when the future arrives.

# 1 Things that are easy to change and things that are difficult to change

First of all, organize it. Easily changeable = reviewed each time; Difficult to change = reused for a long time.

## Changeable

* UI etiquette (how to display messages, HUD standards)
* “How to play” SFX/FX (recommended cool down and congestion measures)
* Handling of XP and publishing (always be aware of the possibility of restrictions depending on the situation)

## Hard to change

* **Order of “words → landmarks → effects”** (basic way of communicating)
* Manage IDs by name (ids.ts)
* Specify the state and create a path that can only be taken once (Phase and onceIn)
* Three boxes of boundary/state/presentation (Chapter 7 divisional design)

> Adapting to the future is a “method”. What we continue to protect is our “way of thinking.”
> Once you can make this distinction, changes will go from being a ``trouble'' to a ``fun adjustment.''

# 2 “Rereading” in line with the evolution of tools
## 2.1 The number of rule editors increases/changes

* Replacement: When new events and new actions increase, instead of calling them directly from here and there, first create your own calling function in `api.ts` or `ui.ts`. Do not increase the number of locations that can be accessed directly from `main` or `Script.ts`.
* Check: Is it compatible with the existing onceIn (single pass)? Replace with a structure that prevents multiple firings.

In programming, such a thin calling function is sometimes called a "wrapper."
The important thing here is not the terminology, but to have one place to fix it even if the name of the Portal API changes.

## 2.2 Objects in map editor increase

* Interpretation: As per the rules in Chapter 4, just do not duplicate IDs/increase the number of series.
* Check: Be careful of basemap compatibility for Shared systems. Just look “as usual” to see if the warning mark appears (following the habits in Chapter 4).

## 2.3 Changes in UI standards (notifications, pins, icons)

* Replacement: ui.say can now be replaced in one place (Chapters 7 and 8).
* Check: Don't violate the "one thing at a time" principle. Even if a new UI comes, don't use multiple at the same time.
* Effect: Even if the standards for the "noisiness" of the production change over time, if the design is not too loud, it will remain the same.

# 3 Relationship between AI and scripts (prepare for future growth)

AI is an area where advances will greatly benefit.

* Current practice: Use AI_Spawner and AI_WaypointPath to ensure space in front of the spring and loose corners (Chapter 4).
* Potential for growth: If the number of AI behavior APIs increases, it will be divided into **``Actions are data, and start signals are events.''**
  * Example) Define **Action Recipe** as a fixed value, and only call it **"Start Recipe A"** from the rules.
* Reason: AI's detailed instructions are easy to change. **The skeleton of the signal (push → guidance → reach → performance)** is difficult to change.
* Implementation note: Starting now, it will be easier to replace AI-related programs in the future by storing them as a group of programs in a dedicated location.

# 4 Performance and scale (proactive habits)

In the future, when larger maps and denser battles become the norm, having a heavy-weight build will come in handy.

* Avoid processing every frame (Chapter 8, 9): distance updates and guidance once every 0.5 to 1 second is sufficient.
* Determine the upper limit for simultaneous playback yourself (for example, "upper limit 3" for SFX/FX).
* “Designed to cut”: Does not produce effects at long distances. Add a distance filter to ui.
* Testing habits: Operation of inserting one full test (Chapter 9).
  * → The same procedure can be used to verify future “scenes that tend to become difficult”.

# 5 How to grow in a small group after publication

Modes only grow when they are played with.
However, it is not easy to gather people just by natural flow into anonymous personal mode in Portal.
If there is no lead line from a major distributor or existing community, it is safer not to design too much with the assumption that a large number of people will continue to gather.

This book does not aim at attracting customers per se.
What we need to see after the release is whether a small number of people can start without hesitation, whether they can't progress, and whether they can figure out where to fix it next.

* Make short sentence templates (chapter 9) of 256 characters or less a habit: purpose/number of people/requirements/first action.
* Do not assume that it will be supplemented with tags: Assuming that there are no tags that the creator can freely add, communicate this in the title, description, thumbnail, and external announcement.
* Small improvements → Immediate release: Based on the impressions of a small number of people, correct places that were unclear or scenes that were too long.
* Don't force external announcements: Decide on one place where you can easily continue posting, such as X, Discord, Blog, Note, etc.

# 6 “Future Resistance” Checklist (every six months)

It is enough to review the following once every six months.

1. ids.ts: Check for -1, duplicate, and unknown IDs with Vitest. Check the placement ID on Godot side with ObjIdManager or the ledger in Chapter 4.
2. ui.ts: order/frequency of say/guide/celebrate (not noisy).
3. config.ts: The values for defense seconds/cooldown/recommended number of players are appropriate for the current environment.
4. flow (transition table): There are not too many branches (unnecessary branches are folded).
5. Performance: Only one load test with full capacity.
6. Explanation: Does not deviate from reality. Understand the purpose, number of people, requirements, and first action within 256 characters.

# 7 Turn “today’s correct answer” into “tomorrow’s material”

It would be a waste to just make it, publish it, and call it a day.

* Reuse: Copy and paste the 4-piece set of ui, api, game, and ids as a template to the next mode.
* Start small: When a new feature comes out, try it out on a small scale and incorporate it into the template.
* Courage to throw away: You can't use tricks that have become too heavy from the first move in the next mode. In the past it was a library, and now it is a field site.

# 8 The future of creativity (creator's perspective)

* “Fear correctly” protects creativity: Based on the premise of change, only solidify the unbreakable core (ID, status, order).
* “Minimum loop” becomes a culture: If you can share the flow of pushing → guiding → reaching → directing, multiple people can create it quickly.
* “Visualization” leads to invention: When numerical values and status are visible on the debug HUD, the speed of experimentation → learning → improvement increases.

> The future is not just about "more new weapons".
> “Rules for communicating” will be updated. You just need to rewrite it **slightly** each time.

# Conclusion

* Chapter 10 is not a chapter that predicts the future, but a chapter that establishes how to make things that will not be compromised by the future.
* What to protect is ID naming / status and single passage / words → landmarks → effects / three-box division.
* What changes is how APIs are called, UI etiquette, and detailed AI movements. All you have to do is fix one part of the API or UI.
* Extend your mode's lifespan with semi-annual Future Resistance checks.

# Appendix/Next Guide

* Appendix A: List of major events and actions
* Appendix B: Official sample program explanation
* Appendix C: modlib explanation


> This chapter is not a **final philosophy**, but a **toolbox that you can use tomorrow**. If you follow the steps laid out in Chapters 3-8 and follow the rules in this chapter, your creation will continue no matter how your Portal evolves.
