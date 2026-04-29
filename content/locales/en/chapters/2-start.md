---
title: "Chapter 2 How to use Portal Builder and design thinking"
free: true
---

:::message alert

This document refers to it as "Portal Builder," but its official name is **``Battlefield Portal Experience Builder.''**

:::


> --- From creating your first game to customizing your game

In this chapter, I would like to be able to do the following.

* You can enter Portal Builder and create a new one.
* You can understand the difference between "Portal custom"/"Existing mode"** while using your hands.
* **Basic settings (mode, score conditions, equipment, map, HUD)** can be adjusted with minimal confusion.
* **You will be able to state the “core” of your mode (purpose, required time, recommended number of people)** in short sentences.
* You can run a small loop of test startup → modification → retest.

# 1 Entrance to Portal Builder

First, log in to Portal Builder and create a portal for use in the game.
Portal Builder operates in a browser. Let's start creating a new one right away.

## 1.1 New creation

https://portal.battlefield.com/bf6/ja-jp/experiences

Go to [Portal page](https://portal.battlefield.com/bf6/ja-jp/experiences) and click "Create new +".

![Portal page](/images/bf_portal_doc/2-start-1.png)
*Portal Builder Home*

## 1.2 Choices between “Portal custom” and “existing mode”

You can choose between "Portal Custom" and "Existing Mode".
For the difference between "Portal Custom" and "Existing Mode", please check **``Chapter 1: What is Battlefield Portal?'', **``A new unit called 'Community Experience'''**.

:::message
If you're confused: **Start with "Portal Custom"** You can learn up to the middle of the book (maps/rules) in one go.
:::

![Portal page](/images/bf_portal_doc/2-start-2.png)
*Portal Builder game mode selection screen*

# 2 Decide on the base mode (describe the “core” of play in one phrase)

The first step when creating a new game is to select the base mode. It is necessary to first decide on a purpose that can be expressed in one phrase.
As a game developer, it can be used as a guideline, but most of all, it poses a problem for the players: unless the game rules are easy to understand, they won't know what to do.

> What should I do? : So that you can immediately imagine what kind of game it is.

## Example: Common base mode
  "Zombie Game": You lose if all players on the defending side die.
  "Car race": Ride around checkpoints in a small vehicle

# 3 Foundation of basic rules (score conditions/victory conditions/time)

What should players do by clarifying the rules? What can you do? You will be able to understand. Difficult rules make a non-game object, appealing to developers but incomprehensible to players.
Even if you think it's interesting, it's a good idea to ask another person or AI to explain the rules you created.

*Round time: Aim for 10-15 minutes. If the game is too long, it will be boring or tiring for the players, and they won't last long.
* Victory conditions: Number of kills/points reached/ticket system/goal achieved...match the "goal of one verse". Without a clear goal, players won't know what to do.
*Score distribution: If one team's players have too much of an advantage, a phenomenon will occur where the A team will definitely lose, so they don't want to play the A team. Be creative with the points you are given and the placement of objects.

> Picture the “end” first: When will it end? What happens and ends? in one line.

## Example: "Zombie Game": You lose if all defending players die.

*Round time: 10 minutes
* Victory condition: **Survive for 10 minutes**
* Score distribution: Both sides can use weapons, and the zombie side's physical strength is low at the beginning, but increases in the latter half. Human players can set up their bases in advance. Reduce the number of human players from the beginning.

By creating an advantageous situation for the zombie side, the zombie player is no longer just a scarecrow to be defeated.
For the human players, as the game progresses towards the end, the game becomes more tense and less boring, and they begin to think about how to build their bases.

# 4 Equipment/weapons (eliminate confusing equipment)

* Weapons/gadgets: Remove equipment that does not match the intent of the mode. For beginners, reduce the number of weapons with strong quirks.
*Vehicles: Transportation is useful for creating conductors, and attack vehicles "seize the field," so limit the number.

> Think about fun: Avoid creating situations where one player has too much of an advantage when playing.

In addition, as a fundamental setting, you can restrict weapons etc. from the Portal Builder's weapon restriction menu as shown in the image below.

![Portal Builder Weapon Restrictions Menu](/images/bf_portal_doc/2-start-3.png)
*Portal Builder Weapon Restrictions Menu*



## Example: "Zombie Game": You lose if all defending players die.

* Weapons/gadgets: Make drones and other devices that have little purpose unusable.
*Vehicle: The human side will only be able to send out one attacking vehicle during the entire 10 minutes. The zombie side can't send out attack vehicles, but it will be able to send out anti-tank weapons.

The humans can build bases, so they need to make sure they don't let something come out that can change the course of the battle all at once.
Equipment and vehicles that break the gameplay will be made unusable in the game.

# 5　HUD/UI (preparing “words → landmarks → effects”)

If you do not keep the messages short, you may not be able to check them while you are busy playing.
Also, since you may not be able to catch up with your understanding, we will make sure that you can understand it the first time you see it.

Also, if you select **Message → Landmark → Performance, you will be able to understand the purpose of the landmark after understanding the command**.
If it is expressed in the opposite way, the player will not understand what the landmark is for.

* Message: A short message of 5 to 12 characters, just ``the next move (what you need to do next)''.
* Landmarks (WorldIcon): There are few, but icons and guidance messages are prepared according to the purpose. Too many landmarks can make it difficult to know which way to go.
* Production preparation: Think about the SFX/FX on the assumption that it will not be played too much. If it's too loud, you won't know why it's ringing.

:::message

At this point, all you have to do is "make some space with the intention of using the display". Detailed implementation will be introduced in Chapter 4, "Map Editor Practical Guide (Placement and Linking)".

:::

# 6　Test launch loop to confirm game performance (minimum PDCA)

1. Startup: Enter by one or two people.
2. Just see if you can get from start to entrance to destination without getting lost.
4. Fix → Restart: Fix only one item and try again.

Does it really work? Can you objectively understand the purpose of the game? You need to confirm that.
Additionally, rules, damage settings, etc. need to be adjusted so that the game doesn't clearly favor one team too much.
If you don't do these things, it will become a ``game where you don't know the rules'' or ``a game that's not fun''**. **Please check carefully. **

> Goal: 1 round trip in 10 minutes. Don't go too deep, make small adjustments and check.

# 7 Practical line of “Portal custom” and “existing mode”

* If you want to proceed with Portal customization: Connect the foundation decided in this chapter to **Chapter 4 (Placement and ID) → Chapter 5 (Rules) → Chapter 6 (Implementation). When published, a tag such as "custom logic"** may be added.
* If you want to play in the existing mode: You can reach a state where you can play the game with just the settings in this chapter. The trick is to "play while learning", focusing on adjusting equipment, AI, and maps.
* Attitude about XP: Please maintain a loose understanding that there may be restrictions depending on settings and publication format **(This book does not go into details)**.

# 8 Stumbling Q&A

* Q: I can't find the rule editor/map editor
  A: **Did you select an existing mode? ** Can be used if created with Portal custom.

* Q: No one moves even after starting
  A: There is a possibility that the player does not know the route from entrance to destination. Keep the HUD short text and one or two landmarks.

* Q: Noisy/many vehicles
  A: In this chapter, we will focus on reducing, and the density of the production will be designed using the visuals and production in Chapter 8.

# Conclusion

Chapter 2 is a guide for ``starting using Portal Builder without hesitation''**.

If you establish the purpose, time, and number of people here, and create a path from entrance to destination, you will be able to understand the work goals when creating a game.

---

📘 **Environment construction for the next chapter "Portal Custom"** Now, before we create the game we just thought of, we will prepare the environment for creating the game. By preparing it, you will be able to create a "Portal custom".
