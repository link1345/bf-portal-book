---
title: "第8.5章　把 Checkpoint Rush 做到发布前"
free: true
---

到第8章为止，我们已经看过了配置、ID、规则设计、TypeScript、UI、SFX、FX 的基本思路。
不过，这些内容分散在不同章节里时，真正动手制作时的顺序仍然不容易看清。

本章会把前面反复使用的最小循环，整理成一个名为 **Checkpoint Rush** 的小模式。
这里不会增加新的机制，而是把第4章到第8章的部件，按发布前的制作顺序重新排列。

# 0　本章要制作的内容

Checkpoint Rush 是只有下面流程的小型体验。

1. 按下大厅中央的开始按钮。
2. 隐藏入口侧的 WorldIcon，显示目的地侧的 WorldIcon。
3. 进入目的地的 AreaTrigger。
4. 防守 10 秒。
5. 只显示一次成功消息、SFX 和 FX。

本章的完成条件不是按下发布按钮。
下面 5 项都准备好，并确认到可以注册到 Portal Web Builder 之前的状态，就算完成。

| 完成条件 | 要看什么 |
| ---- | ---- |
| 配置 ID | Godot 侧必要的 ObjId 已设置，并记录在台账中 |
| 代码 | `mods` 下的 ID、设置、显示、流程、事件已经分开 |
| 字符串 | 画面显示文案放在 `Strings.json` 中，没有直接写进代码 |
| 测试 | 按 `lint`、`test`、`build` 的顺序通过 |
| 注册前检查 | 确认 `dist/Script.ts` 和 `dist/Strings.json` 是注册对象 |

> 本章不是“总集篇”。它是用来固定动手顺序的实践篇。

# 1　先把设计整理成一张表

首先，要能用短句说明这个模式。

| 项目 | 内容 |
| ---- | ---- |
| 模式名 | Checkpoint Rush |
| 目标 | 按下中央终端，沿着标记前往目的地，并防守 10 秒 |
| 推荐人数 | 8〜16 人 |
| 所需时间 | 10〜15 分钟 |
| 第一个行动 | 按下大厅中央的终端 |

接着，把 Godot 侧放置的对象和 TypeScript 侧调用的对象放进同一张表。

| 用途 | ObjId | Godot 对象 | TypeScript 获取函数 | 初始状态 |
| ---- | ---- | ---- | ---- | ---- |
| 开始按钮 | 500 | InteractPoint | `mod.GetInteractPoint(500)` | 启用 |
| 入口引导 | 21 | WorldIcon | `mod.GetWorldIcon(21)` | 显示 |
| 目的地引导 | 22 | WorldIcon | `mod.GetWorldIcon(22)` | 隐藏 |
| 目的地判定 | 11 | AreaTrigger | `mod.GetAreaTrigger(11)` | 启用 |
| 成功 FX | 901 | FX / VFX | `mod.GetVFX(901)` | 隐藏 |
| 成功 SFX | 951 | SFX | `mod.PlaySound(951, 1)` | 未播放 |

如果没有这张表就开始制作，之后一定会迷惑“500 是什么”“21 和 22 哪个是入口”。
这里直接把第4章的台账当作制作检查表来使用。

# 2　在 Godot 侧放置对象

在 Godot 侧，先放置游戏流程需要的对象，再考虑细节装饰。

1. 在大厅中央放置 `InteractPoint`，ObjId 设为 `500`。
2. 在入口侧放置 `WorldIcon`，ObjId 设为 `21`。
3. 在目的地稍前方放置 `WorldIcon`，ObjId 设为 `22`。
4. 在目的地放置 `AreaTrigger`，ObjId 设为 `11`。
5. 在目的地放置成功用的 FX 和 SFX，ObjId 设为 `901` / `951`。

具体配置步骤请使用第4章的实务流程。
本章重要的是，放置完成后一定要更新台账中的“测试结果”。

| 用途 | ObjId | 测试前 | 测试后 |
| ---- | ---- | ---- | ---- |
| 开始按钮 | 500 | 未确认 | 能按下就是 OK |
| 入口引导 | 21 | 未确认 | 开始时可见就是 OK |
| 目的地引导 | 22 | 未确认 | 开始后可见就是 OK |
| 目的地判定 | 11 | 未确认 | 进入瞬间有反应就是 OK |
| 成功 FX/SFX | 901 / 951 | 未确认 | 只播放一次就是 OK |

`AreaTrigger` 很容易因为高度不足而失败。
请给它足够的厚度，让玩家跳跃或从斜坡进入时也能触发判定。

# 3　TypeScript 侧的最小结构

代码不要一开始就全部塞进巨大的 `Script.ts`。
按照第7章的思路，分成下面 5 个文件。

| 文件 | 作用 | 放什么 |
| ---- | ---- | ---- |
| `ids.ts` | ObjId | 500、21、22、11、901、951 |
| `config.ts` | 调整数值 | 防守秒数、消息显示秒数、SFX 冷却 |
| `ui.ts` | 表现层 | 消息、WorldIcon 切换、成功演出 |
| `game.ts` | 进度状态 | 已开始、已到达、防守中、单次触发 |
| `Script.ts` | 事件入口 | `OnGameModeStarted`、`OnPlayerInteract`、`OnPlayerEnterAreaTrigger` |

`ids.ts` 只是把数字换成名字。

```ts
export const IP_START = 500;
export const ICON_ENTRANCE = 21;
export const ICON_TARGET = 22;
export const AREA_TARGET = 11;
export const FX_GOAL = 901;
export const SFX_GOAL = 951;
```

`config.ts` 收集之后可能调整的数字。

```ts
export const DEFEND_SECONDS = 10;
export const MESSAGE_SECONDS = 2;
export const SFX_COOLDOWN_SECONDS = 2;
```

`Strings.json` 只放画面上显示的文案。
不要把日语、中文等多字节文字直接写进代码。

```json
{
  "start": "Go to the checkpoint.",
  "defend": "Defend for {} seconds.",
  "success": "Checkpoint secured."
}
```

`Script.ts` 只保留容易阅读的事件入口。

:::message alert
下面的代码是示例程序的一部分摘录，单独使用时并不能实际运行。
这里省略了 `import`、`ids.ts` / `config.ts` / `ui.ts` / `game.ts` 的实现、`modlib.ConditionState`、SFX 冷却、日志输出等辅助代码。
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

这段代码只是摘录出各文件职责的核心形状。
如果直接把它贴进 `Script.ts`，会因为缺少必要的 `import` 和辅助函数而无法运行。
放入实际模板时，请按照第6章和第7章的形式补上 `import`、`modlib.ConditionState`、SFX 冷却和日志输出。

# 4　分阶段确认动作

不要一口气检查到最后，那样反而慢。
Checkpoint Rush 按下面 3 个阶段确认。

## 4.1 按下按钮后 WorldIcon 会切换

只看两点。

* 开始时能看到 `WorldIcon 21`。
* 按下 `InteractPoint 500` 后，`21` 消失，`22` 出现。

如果这里失败，就不用看 FX 或防守秒数。
请先修正 ObjId、初始显示、`OnPlayerInteract` 的判定。

## 4.2 AreaTrigger 只触发一次 FX/SFX

接着进入目的地。

* 进入 `AreaTrigger 11` 的瞬间才有反应。
* `SFX 951` 不会被连续触发。
* `FX 901` 会作为成功演出出现。
* 如果使用循环 FX，必要时在退出时停止。

如果这里失败，请检查 `AreaTrigger` 的高度、ObjId，以及 `ConditionState` 的使用方式。

## 4.3 确认 10 秒防守和日志

最后确认防守计时和日志。

```text
checkpoint:start
checkpoint:defend
checkpoint:success
```

如果 `PortalLog.txt` 中按这个顺序出现，就能读出事件流程。
如果同一行出现很多次，说明还没有阻止重复触发。
请确认应该用 `startGate`、`targetGate`、`game.started`、`game.reached` 中的哪一个来挡住。

# 5　注册前检查

注册到 Portal Web Builder 前，请按下面顺序在本地执行。

| 顺序 | 命令 | 要看什么 |
| ---- | ---- | ---- |
| 1 | `npm run lint` | 语法和写法没有可疑之处 |
| 2 | `npm run test` | ID 和小型条件函数没有损坏 |
| 3 | `npm run build` | 生成 `dist/Script.ts` 和 `dist/Strings.json` |

注册的不是开发中的 `mods/Script.ts`。
交给 Portal Web Builder 的是构建后的 **`dist/Script.ts`** 和 **`dist/Strings.json`**。

进入第9章之前，至少确认下面这些内容。

| 确认项 | 合格线 |
| ---- | ---- |
| 单人测试 | 从开始、移动、防守到成功都能走通 |
| 双人测试 | 一个人按下按钮后，两个人都能理解下一步行动 |
| 重新部署 | 死亡后或重新出击后，WorldIcon 和 UI 不会崩坏 |
| 中途加入 | 中途加入的玩家不会迷路 |
| 日志 | 没有意外的连续触发或错误 |

这张表填完后，就可以进入发布和运营的话题。

# 6　本章不添加的内容

如果 Checkpoint Rush 变得太大，这个实践章的作用就会变模糊。
本章不处理下面这些话题。

* 大规模招募玩家、缩略图、公告、运营日志：第9章处理。
* 官方示例的详细阅读：附录B处理。
* modlib 的函数列表和细节用法：附录C处理。

这里制作的不是华丽的成品，而是不容易坏的小型项目。
先把小循环跑通，看日志，通过注册前检查。
然后再进入第9章的发布、托管、运营。

# 结论

* Checkpoint Rush 是把第4〜8章的部件按制作顺序排列的小型实践项目。
* 先准备设计表和 ObjId 台账，Godot 侧和 TypeScript 侧的对应关系就不容易崩。
* 分成 `ids.ts`、`config.ts`、`ui.ts`、`game.ts`、`Script.ts` 后，发布前修正会轻松很多。
* `lint`、`test`、`build`、单人 / 双人 / 重新部署 / 中途加入检查完成后，就可以进入第9章的发布准备。

---

📘 **下一章《发布、托管、运营》** 会整理说明文、缩略图、测试会、更新步骤，让这个小模式变成可以给别人游玩的状态。
