---
title: "Appendix B: Sample Program Commentary “PhysicsImpulse_Gym (physics impulse)”"
free: true
---

# What to Read in PhysicsImpulse_Gym

`PhysicsImpulse_Gym` shows how to apply physical impulse to vehicles.
It is the sample for comparing `ApplyImpulse` and `ApplyAreaImpulseAndDamage`, both added in SDK 1.3.3.0.

# Main Included Files

| File | Role |
| ---- | ---- |
| `PhysicsImpulse_Gym.ts` | Main impulse, area check, and debug display logic |
| `PhysicsImpulse_Gym.tscn` | Placement example for test vehicles, buttons, and positions |
| `PhysicsImpulse_Gym.strings.json` | Display strings |
| `README_PhysicsImpulse_Gym.md` | Explanation of the physics impulse APIs |

# Physics Impulse APIs

| Name | Role |
| ---- | ---- |
| `mod.ApplyImpulse(...)` | Apply impulse to one specified vehicle with position, direction, and magnitude |
| `mod.ApplyAreaImpulseAndDamage(...)` | Apply impulse, and optional damage, to vehicles inside an area |

Use `ApplyImpulse` when the target vehicle is already known.
Use `ApplyAreaImpulseAndDamage` for explosions, push zones, and area gimmicks based on a center point and radius.

# Flow

The sample applies impulse to vehicles from a button or input.
Compare the single-vehicle push and the area impulse to understand the arguments.

Direction is usually built with `CreateVector` or `DirectionTowards`.
Start with a low magnitude and increase it only until the vehicle reacts as intended.

# Notes

Area impulse is useful, but a large radius can affect many vehicles at once.
If you run it repeatedly from frequent Ongoing logic, both performance and play feel can get rough.

During debugging, keep radius, magnitude, and damage as constants and raise them gradually.

# Conclusion

`PhysicsImpulse_Gym` is the sample for pushing, launching, and reacting to vehicles through physics.
Use `ApplyImpulse` for one target and `ApplyAreaImpulseAndDamage` for an area. That split alone makes vehicle gimmicks much easier to design.

