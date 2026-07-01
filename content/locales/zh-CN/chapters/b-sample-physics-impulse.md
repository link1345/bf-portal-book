---
title: "附录 B：示例程序说明“PhysicsImpulse_Gym（物理冲量）”"
free: true
---

# PhysicsImpulse_Gym 要看什么

`PhysicsImpulse_Gym` 是对车辆施加物理冲量的示例。
可以比较 SDK 1.3.3.0 新增的 `ApplyImpulse` 和 `ApplyAreaImpulseAndDamage` 的用法。

# 包含的主要文件

| 文件 | 作用 |
| ---- | ---- |
| `PhysicsImpulse_Gym.ts` | 冲量、范围判定、调试显示的主体 |
| `PhysicsImpulse_Gym.tscn` | 测试车辆、按钮、位置的配置示例 |
| `PhysicsImpulse_Gym.strings.json` | 显示文字 |
| `README_PhysicsImpulse_Gym.md` | 物理冲量 API 说明 |

# 物理冲量 API

| 名称 | 作用 |
| ---- | ---- |
| `mod.ApplyImpulse(...)` | 对指定一辆车，以位置、方向、强度施加冲量 |
| `mod.ApplyAreaImpulseAndDamage(...)` | 对指定范围内车辆施加冲量，并可附加伤害 |

目标车辆已经确定时使用 `ApplyImpulse`。
爆炸、推开区域、范围机关等需要中心点和半径的处理，则使用 `ApplyAreaImpulseAndDamage`。

# 处理流程

示例用按钮或输入作为触发，对车辆施加冲量。
对比单车推动和范围冲量，就能看出参数的思路。

方向通常与 `CreateVector` 或 `DirectionTowards` 组合决定。
强度从小值开始，只增加到车辆按预期反应为止。

# 注意点

范围冲量很方便，但半径太大时会一次影响很多车辆。
如果在高频 Ongoing 中反复执行，性能和游戏体验都会变差。

调试时，把半径、强度、伤害量设为常量，再逐步提高。

# 结论

`PhysicsImpulse_Gym` 是学习推动车辆、击飞车辆、让车辆对范围做出反应的教材。
单一目标用 `ApplyImpulse`，范围处理用 `ApplyAreaImpulseAndDamage`。只要先分清这一点，车辆机关就好设计得多。

