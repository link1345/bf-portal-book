---
title: "附录B：介绍如何阅读官方示例"
free: true
---

::::message
本附录目前只是粗略的机器翻译，文字可能非常不自然。我之后会认真修改，暂时请多包涵。
::::

# 0 按照特定顺序阅读官方样本

SDK 包含官方示例。如果你突然读到一个大样本，UI、AI、车辆和状态管理会同时出现，这可能会让人感到困惑。

首先，按以下顺序阅读它们。

1. `docs/pages`
2. `code/types/mod/index.d.ts`
3. `GodotProject/mods/_StartHere_BasicTemplate`
4. 按用途分类的样品

按照这个顺序，您可以从官方文档中掌握概念，检查类型定义中的 API 名称，在最小模板中查看事件的形状，然后转到实际示例。

# 1 如何导航 SDK 文件夹

|地点 |看什么 |如何阅读 |
| ---- | ---- | ---- |
| `docs/pages/getting_started.html` | `docs/pages/getting_started.html` |启动 Godot、门户设置和打开关卡的步骤 |确认环境搭建 |
| `docs/pages/spatial_editor.html` | `docs/pages/spatial_editor.html` |空间编辑器操作、对象库、导出 |第 4 章的补充 |
| `docs/pages/gameplay_logic.html` | `docs/pages/gameplay_logic.html` | TypeScript、日志、UI、AI、Spawn、ObjId 参考 |第 6 章的补充 |
| `docs/pages/tips_tricks.html` | `docs/pages/tips_tricks.html` |性能说明|第 8 章和第 9 章的补充 |
| `code/types/mod/index.d.ts` | `code/types/mod/index.d.ts` | `mod` 命名空间中的所有 API |搜索函数名称看看如何使用 |
| `GodotProject/mods` | `GodotProject/mods` |官方样品|按目的阅读 |

如果您遇到不知道的 API，请首先在 `index.d.ts` 中搜索函数名称。 Portal 的 TypeScript 最终调用 `mod` 命名空间中的函数，所以这就是字典。

# 2 首先阅读官方示例

|样品|首先阅读的理由 |
| ---- | ---- |
| `_StartHere_BasicTemplate` | `_StartHere_BasicTemplate` |事件函数等基本形式，`GetObjId`、`Message`、`CreateVector` 分组 |
| `PortalGadgetExample` | `PortalGadgetExample` |查看 Portal Gadget 输入事件、RayCast 和单个玩家反应 |
| `FixedCameraExample` | `FixedCameraExample` |可以查看相机切换和UI按钮事件的基础知识 |
| `VL7Example` | `VL7Example` |可以查看特殊对象的进入/退出事件 |
| `BumperCars` | `BumperCars` |阅读小游戏循环、车辆和状态管理的示例 |
| `GibraltarGrandprix` | `GibraltarGrandprix` |阅读比赛、检查站、排名 UI 和车辆选择的示例 |

对于初学者来说，`_StartHere_BasicTemplate` 就足够了。复杂的示例作为工作成品很有吸引力，但它们包含太多信息，初学者无法阅读。

# 3 读取样本时的备忘表

|查看项目 |注意事项 |
| ---- | ---- |
|入学活动 | `OnGameModeStarted`、`OnPlayerDeployed`、`OnPlayerInteract` 等 |
|状态管理| `phase`、`GameState`、`PlayerProfile` 等 |
|对象 ID 参考 |获取位置，如 `GetInteractPoint(500)` |
|用户界面|在哪里创建、更新和删除 |
|等待处理| `mod.Wait` | 的期限和目的
|多次着火的对策| `isProcessing...`，冷却时间，标志 |

只需填写此表即可查看样品的完整图片。首先阅读结构而不是阅读整个代码。这听起来可能很花哨，但确实有效。

# 4 你想要从官方样本中融入的写作风格

如果您阅读一些官方示例，即使细节有所不同，您也会看到相似的方式。
这不仅仅是一种偏好，它是一种使更大的代码更容易阅读、更容易修复以及更容易以后扩展的方法。

请注意，在 `unsupported` 下移动的示例包含一些看起来很方便的写作风格。
但是，本文档仅使用可从当前位于 `GodotProject/mods` 的受支持示例中读取的实践。

## 1 . 开始时收集设置值

将参与者数量、时间限制、调试标志、候选车辆、检查点定义、UI 名称等放在文件顶部。

如果您直接在过程中间写入 `10`、`500`、`true` 等值，那么当您稍后尝试调整它时，它将成为搜索地狱。
如果你一开始就收集它们，你会决定在调整这个模式时看哪里。

```ts
const MIN_PLAYERS = 2;
const COUNTDOWN_SECONDS = 10;
const DEBUG = false;
const VEHICLE_POOL = [mod.VehicleList.Quadbike, mod.VehicleList.GolfCart];
```

第 7 章中的 `ids.ts` 和 `config.ts` 也是这个想法的延伸。
通过简单地将数字和设置更改为名称，代码就变得更容易阅读。

## 2 . 当孩子长大后，在课堂上划分角色

在较大的示例中，例如 `BumperCars`、`GibraltarGrandprix` 和 `AcePursuit`，状态管理、玩家管理和 UI 管理被分为不同的类。

这并不意味着您应该将所有 Portal 代码变成一个类。
首先，只要有功能就足够了。然而，随着每个玩家的状态和 UI 数量的增加，如果您根据职责将它们分成不同的类，将会更容易阅读。

|角色 |示例 |
| ---- | ---- |
|整个游戏 | `GameState`，起始条件，获胜者确定，结束过程 |
|每个玩家 | `PlayerProfile`，就绪状态、车辆、分数、个人 UI |
|全程 | `TrackData`，检查点，圈数，获胜者 |
|用户界面|创建、更新、关闭、删除 |

分类中重要的不是增加“命名框”的数量，而是将因相同原因而变化的进程放置在同一个地方。
例如，如果改变玩家的Ready状态、更新Ready显示以及离开时关闭UI的过程是分散的，那么以后肯定很难跟踪它们。

## 3 . UI 分离创建、更新和关闭

UI 是使用类的特别有效的地方。
在大样本中，创建widget的过程、更新显示内容的过程、隐藏/删除的过程是分开的。

当您想要更改显示内容、修复忘记关闭屏幕或更改每个玩家的显示时，这可以让您更轻松地知道触摸哪里。

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

乍一看似乎有点夸张，但 UI 越多，效果就越好。
通过简单地分离“创建”、“更新”和“关闭”，以后添加效果和状态变得更加容易。

# 结论

如果您按照正确的顺序阅读官方示例，它们将是一本强大的教材。

首先，将 `docs/pages` 和 `index.d.ts` 放入字典中，并用 `_StartHere_BasicTemplate` 记住事件形状。然后阅读 `GodotProject/mods` 下的专用示例。
然后，不要复制示例的全部内容，而是将设置值的聚合、使用类的职责分离以及 UI 管理方式合并到您自己的代码中。本书的附录 B 也仅涵盖位于该文件夹中的示例。

---

📘 **在下一章“附录B：示例程序说明'_StartHere_BasicTemplate'”**中，我们将解释您应该首先阅读的基本模板。
