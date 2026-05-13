---
title: "附录 B：导读：官方示例的阅读方法"
free: true
---

# 0 按照特定顺序阅读官方示例

SDK 包含官方示例。如果一上来就阅读大型示例，UI、AI、车辆和状态管理会同时出现，这可能会让人感到困惑。

首先，按以下顺序阅读它们。

1. `docs/pages`
2. `code/types/mod/index.d.ts`
3. `GodotProject/mods/_StartHere_BasicTemplate`
4. 按目的分类的示例

按这个顺序，你可以从官方文档中掌握概念，检查类型定义中的 API 名称，在最小模板中查看事件的形状，然后进入实战示例。

# 1 SDK 文件夹的阅读方法

| 位置 | 看什么 | 阅读方式 |
| ---- | ---- | ---- |
| `docs/pages/getting_started.html` | 启动 Godot、Portal Setup 和打开关卡的步骤 | 确认环境构建 |
| `docs/pages/spatial_editor.html` | Spatial Editor 操作、Object Library、导出 | 第 4 章的补充 |
| `docs/pages/gameplay_logic.html` | TypeScript、日志、UI、AI、Spawn、ObjId 参考 | 第 6 章的补充 |
| `docs/pages/tips_tricks.html` | 性能说明 | 第 8 章和第 9 章的补充 |
| `code/types/mod/index.d.ts` | `mod` 命名空间中的所有 API | 搜索函数名确认用法 |
| `GodotProject/mods` | 官方示例 | 按目的阅读 |

如果你遇到不知道的 API，请先在 `index.d.ts` 中搜索函数名。Portal 的 TypeScript 最终会调用 `mod` 命名空间中的函数，所以这里就是字典。

# 2 最先阅读的官方示例

| 示例 | 首先阅读的理由 |
| ---- | ---- |
| `_StartHere_BasicTemplate` | 汇集了事件函数、`GetObjId`、`Message`、`CreateVector` 等基本写法 |
| `PortalGadgetExample` | 查看 Portal Gadget 输入事件、RayCast 和单个玩家反应 |
| `FixedCameraExample` | 可以查看相机切换和 UI 按钮事件的基础知识 |
| `VL7Example` | 可以查看特殊对象的进入 / 退出事件 |
| `BumperCars` | 阅读小游戏循环、车辆和状态管理的示例 |
| `GibraltarGrandprix` | 阅读比赛、检查点、名次 UI 和车辆选择的示例 |
| `AcePursuit` | 阅读飞机竞速、时间限制、状态管理的示例 |
| `HybridExample` | 阅读从 Portal 区块调用 TypeScript，并把返回值交给变量或 UI 的示例 |
| `CustomCQ` | 阅读大型 Conquest 风格模板、ObjID 设计、多地图支持的示例 |

对于初学者来说，`_StartHere_BasicTemplate` 就足够了。复杂示例作为可运行的成品很有吸引力，但信息量太大，不适合作为最开始的教材。

# 3 读取示例时的备忘表

| 查看项目 | 注意事项 |
| ---- | ---- |
| 入口事件 | `OnGameModeStarted`、`OnPlayerDeployed`、`OnPlayerInteract` 等 |
| 状态管理 | `phase`、`GameState`、`PlayerProfile` 等 |
| ObjId 参照 | 获取位置，如 `GetInteractPoint(500)` |
| UI | 在哪里创建、更新和删除 |
| 等待处理 | `mod.Wait` 的周期和目的 |
| 多重触发对策 | `isProcessing...`，冷却时间，标志 |

只需填写此表即可查看示例的整体图。先读结构，而不是一上来读完整代码。这听起来可能很夸张，但确实有用。

# 4 想从官方示例中吸收的写法

如果你阅读一些官方示例，即使细节有所不同，你也会看到相似的方式。
这不仅仅是一种偏好，它是一种使更大的代码更容易阅读、更容易修复以及更容易以后扩展的方法。

请注意，移到 `unsupported` 下的示例中也有一些看起来很方便的写法。
但是，本文档只采用目前位于 `GodotProject/mods` 的受支持示例中可以读到的做法。

## 1. 把设置值集中到开头

将参与者数量、时间限制、调试标志、候选车辆、检查点定义、UI 名称等放在文件顶部。

如果你直接在处理中间写入 `10`、`500`、`true` 等值，之后调整时就会变成搜索噩梦。
如果一开始就把它们集中起来，调整这个模式时就知道该看哪里。

```ts
const MIN_PLAYERS = 2;
const COUNTDOWN_SECONDS = 10;
const DEBUG = false;
const VEHICLE_POOL = [mod.VehicleList.Quadbike, mod.VehicleList.GolfCart];
```

第 7 章中的 `ids.ts` 和 `config.ts` 也是这个想法的延伸。
只要将数字和设置更改为名称，代码就变得更容易阅读。

## 2. 当代码变大后，用类划分职责

在较大的示例中，例如 `BumperCars`、`GibraltarGrandprix`、`AcePursuit` 和 `CustomCQ`，状态管理、玩家管理和 UI 管理被分为不同的类或规则块。

这并不意味着你应该将所有 Portal 代码变成一个类。
一开始只用函数就足够了。然而，随着每个玩家的状态和 UI 数量的增加，如果你根据职责将它们分成不同的类，将会更容易阅读。

| 角色 | 示例 |
| ---- | ---- |
| 游戏整体 | `GameState`，开始条件，胜者判定，结束处理 |
| 每个玩家 | `PlayerProfile`，Ready 状态、车辆、分数、个人 UI |
| 整个比赛 | `TrackData`，检查点，圈数，获胜者 |
| UI | 创建、更新、关闭、删除 |

使用类时重要的不是增加“有名字的箱子”，而是把会因为同一个理由一起变化的处理放在同一个地方。
例如，如果改变玩家的 Ready 状态、更新 Ready 显示以及离开时关闭 UI 的处理分散在各处，之后肯定很难追踪。

## 3. UI 要分开创建、更新和关闭

UI 是特别容易发挥类化效果的地方。
在大型示例中，创建 widget、更新显示内容、隐藏 / 删除的处理是分开的。

当你想要更改显示内容、修复忘记关闭屏幕或更改每个玩家的显示时，这可以让你更轻松地知道该改哪里。

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
只要分离“创建”、“更新”和“关闭”，以后添加表现效果和状态就会更容易。

# 结论

只要按正确顺序阅读，官方示例就是很强的学习材料。

首先，把 `docs/pages` 和 `index.d.ts` 当作字典，并用 `_StartHere_BasicTemplate` 掌握事件的形状。然后阅读 `GodotProject/mods` 下按目的划分的示例。SDK 1.3.1.0 追加了 `HybridExample` 和 `CustomCQ`，可以学习区块与 TypeScript 混合使用，以及完整规模的模式模板。
接着，不要照搬示例的全部内容，而是把设置值集中管理、用类分离职责、UI 管理方式这些写法吸收到自己的代码中。本书的附录 B 也只介绍这个文件夹中的示例。

---

📘 **在下一章“附录 B：示例程序说明'_StartHere_BasicTemplate'”**中，我们将解释你应该首先阅读的基本模板。
