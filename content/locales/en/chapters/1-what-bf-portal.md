---
title: "Chapter 1: What is Battlefield Portal?"
free: true
---

# What is Battlefield Portal?

> An official "development kit for players"

When people hear the Battlefield series, many think of the realism of the war experience that runs throughout the series: massive battlefields, squad-based cooperation, and destructible environments.
Within that series, Battlefield Portal (Portal for short), which first appeared in 2021, is one of the most experimental and innovative systems in Battlefield history.

Portal is an official set of tools developed by DICE and Ripple Effect Studios that lets players create Battlefield rules for themselves.
In other words, Portal is not only a battlefield for playing, but also a battlefield for designing.

## Official Definition (from EA's official site)

> Battlefield Portal is a massive sandbox where creators and players can push Battlefield to its limits.
> Move, scale, and duplicate objects to control the environment more freely than ever before.
> Use NPC scripting and customizable UI to create completely unique game modes.
> Legendary Battlefield experiences are waiting to be created. Show what you are truly capable of.
>
> Think, create, and play:
> These custom experiences are called Community Experiences. You can recreate classic game modes such as horde modes, or create innovative experiences such as top-down 2D shooters.
>
> Powerful creator tools:
> Portal includes spatial editing (map/geography editing) and AI scripting for customizing AI combatant behavior. Portal Builder also supports custom UI scripting for building fully customizable user interfaces.
>
> Battlefield your way:
> With the web-based Portal tools, rich mutators, and ruleset options, you can experience Battlefield however you like. Hardcore mode, restricted weapon loadouts, and more. The possibilities are endless.
>
> (Source: EA official article "PC Power Fuses with Portal Possibilities")

## What That Definition Means

This official description shows that Portal is not merely a rule configuration tool. It is **a creative tool with a level of freedom close to a game development environment**. Three elements are especially important.

### Spatial Object Editing
* Terrain and baked-in assets included in the existing `Static` layer cannot be edited.
* Creators use the Spatial Editor to add assets that are available for the target Level, then move, rotate, and scale the placed objects to build the space.
  → In other words, Portal map editing is not about rewriting existing terrain. It is about adding available parts and assembling an experience.

### AI Scripts and Custom UI
* You can create behavior patterns for NPCs (AI soldiers) and build your own UI layout.
  → You can design the gameplay experience itself.

### Mutators and Rulesets
* You can use the GUI to easily configure rule variables such as infinite ammo, increased health, and weapon restrictions.
  → Portal supports everything from tweaking existing modes to rebuilding them.

In this way, Portal opens up Battlefield's core battlefield simulation as a field where players can extend their imagination.

## How It Differs from Earlier Titles

Past Battlefield titles such as BF3, BF4, and BFV also allowed a certain amount of customization through custom servers and server rules.
However, those changes were mostly limited to areas such as map rotation, weapon restrictions, and respawn settings.

Portal lets you rewrite those concepts at the structural level.
In other words, **players can work with the internal logic of game modes from almost the same perspective as developers**.

That is Portal's biggest difference, and its most revolutionary point.

## A New Unit Called a "Community Experience"

EA repeatedly uses the term "Community Experience" when describing Portal.
This means **one gameplay experience made by combining maps, rules, AI, and UI created by regular players**.

What used to be a server settings change is treated in Portal as a work of its own.
Other players can search for that work, play it, rate it, and leave comments.
It is a world where players upload and share experiences, almost like **a YouTube for game experiences**.

## Portal Is an Officially Recognized Place for Creation

Traditional Battlefield was a game where players received an experience. Portal is a game where players create an experience.

AI scripts, custom UI, spatial editing, and rule building. When these elements come together, the player is no longer just a soldier, but a creator designing their own world.

Portal can be defined as an official experimental space that removes the boundary between developers and players. For the current era, that is probably the most accurate way to describe it.

# The Difference Between "Portal Custom" and "Existing Modes"

When creating a new experience in Portal, the first choice is between **Portal Custom** and **Existing Mode**.
This choice affects which editors you can use afterward, how much freedom you have, what information is automatically shown when publishing, and how experience points (XP) are handled. The sections below explain the characteristics of each option.

## A. Portal Custom: Rebuilding Rules and Maps

### What You Can Do

* Rule Editor: Build game behavior with conditions, counters, triggers, and similar logic.
* Map Editor: Edit the space itself by placing, moving, scaling, and duplicating objects.
* UI and AI: Adjust screen displays (UI) and AI behavior with scripts, allowing you to significantly change how the mode feels to play.

### How It Appears When Published

* The experience details may show labels such as "Custom Logic". However, creators cannot freely attach their own tags.
* Search and join flow depends on the share code, title, description within 256 characters, thumbnail, and external announcements.

### Experience Points (XP)

* As a general rule, assume that XP restrictions may apply.
* Settings involving custom logic, custom AI, or extremely efficient score and kill farming are especially likely to be treated differently from normal progression rewards.
* Design for the experience or event itself rather than for XP, and check the latest official guidance before publishing.

### Best Suited For

* New creations that are not bound by existing frameworks, co-op experiments against AI, races, minigames, and event highlights.

## B. Existing Modes: Tuning Within the Standard Feature Set

#### What You Can Do

* **The Rule Editor and Map Editor cannot be used.**
* Instead, you can adjust a wide range of standard customization items, such as AI spawning, weapon and equipment restrictions, respawns, tickets, and objective counts.
* In practice, this feels close to carrying forward the BF2042-era Portal experience without rule editing.

### How It Appears When Published

* Because it feels close to the standard game, it is easier for first-time participants to join.
* If the title, description, and thumbnail clearly state the intent, such as hardcore, AI training, or beginner-friendly, first-time players can more easily judge what the experience is about.

### Experience Points (XP)

* XP may still be restricted depending on the settings and official operation.
* Extreme conditions, such as settings that make many kills possible in a short time, tend to be more likely to be restricted.

### Best Suited For

* Easy-to-join persistent servers based on existing rules, AI practice, weapon restrictions, hardcore settings, and similar use cases.

## Key Comparison

| Perspective | Portal Custom | Existing Mode |
| ---- | ---- | ---- |
| Editors | Rule / map editors available | None (adjust with standard items) |
| Freedom | High (redesign behavior and space) | Medium (within the standard feature set) |
| AI / weapon restrictions | Possible (including behavior tweaks) | Possible (through standard features) |
| UI / presentation | Custom UI and presentation can be added | Mostly standard displays |
| XP | May be restricted | May be restricted |
| Main uses | New creations, new experiences, events | Persistent operation, beginner-friendly modes, stable operation |

## Practical Tips: How to Choose

* If ease of participation matters most, first solidify the core gameplay with an Existing Mode.
* If originality matters most, once you can see the need clearly, finish the idea with Portal Custom.
* Write the description assuming a 256-character limit, and briefly include the purpose, recommended player count, and expected play time so first-time players can decide quickly.
* **Regular event scheduling (day and time) combined with community announcements (X, Discord, etc.) makes the experience easier to establish.**

---

📘 **In the next chapter, "Chapter 2: How to Use Portal Builder and Design Thinking,"** we will think about what kind of game to make and the basics of game design in BF Portal.
