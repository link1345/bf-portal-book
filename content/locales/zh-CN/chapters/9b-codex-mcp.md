---
title: "第9.5章　把状况和日志交给AI来编写Portal代码"
free: true
---

# 0　把状况和日志交给AI来编写Portal代码

> 人类负责告诉AI「想做什么」和「发生了什么」，代码和原因调查交给AI

用TypeScript编写Portal脚本时，实际写程序这件事很大一部分可以交给AI。
尤其是查找函数名、匹配类型、添加日志、缩小原因范围，这些工作AI很擅长。

相应地，也有一些信息必须由人类提供。

* 想做什么。
* 说的是哪张地图、哪个对象、哪个时机。
* 实机中发生了什么。
* 日志里出现了什么。

这些信息如果很含糊，AI即使写出看起来像样的代码，也容易不符合Portal现场的实际情况。
反过来，只要把现象和日志清楚交给AI，它就会成为相当可靠的伙伴。

本章以可以使用BF6 Portal TypeScript MCP的AI环境为例，整理一种不仅适用于Codex，也适用于其他AI的「编码对话」推进方式。

:::message alert
即使让AI写代码，也不能省略实机确认。
Portal的事件触发时机、士兵坐标确定时机、各地图的 `RuntimeSpawn_...` 差异，最后都必须用游戏画面和 `PortalLog.txt` 确认。
:::

# 1　与AI的分工

先把适合交给AI的事和人类应该观察的事分开。

| 角色 | 负责方 | 内容 |
| ---- | ---- | ---- |
| 决定目标 | 人类 | 例如「想在玩家面前生成Apple」 |
| 提供条件 | 人类 | 地图名、想使用的对象名、触发时机 |
| 编写代码 | AI | TypeScript实现、Portal API调用、添加日志 |
| 查询SDK | AI | 使用MCP或类型定义确认函数名、类型、enum候选 |
| 实机测试 | 人类 | 注册到Portal并在游戏内确认行为 |
| 阅读日志 | AI和人类 | 提供 `PortalLog.txt` 并缩小原因范围 |
| 修正代码 | AI | 根据日志提出假设并修改代码 |

人类不需要一开始就记住所有API。
但是，「想让什么发生」和「实际上发生了什么」必须由人类观察并交给AI。

程序可以让AI来写。
不过，如果交给AI的状况说明也很粗糙，对话就会开始迷路。
这里偷懒，之后反而更麻烦。

# 2　什么是BF6 Portal TypeScript MCP

BF6 Portal TypeScript MCP是一个MCP服务器，可以让AI开发环境查询Portal SDK的类型信息。

仓库在这里。

https://github.com/link1345/bf6-portal-typescript-mcp

如果告诉AI「不清楚的Portal API请先用MCP查询再写」，AI就可以一边参考SDK信息一边写代码，而不需要人类每次都去搜索 `index.d.ts`。

MCP就像交给AI的一本词典。
不过，仅靠MCP并不能知道实机中的行为。
游戏里变成了什么样、日志里出现了什么，仍然需要人类交给AI。

# 3　在Codex App中设置MCP服务器

这里是使用Codex App时的设置示例。
如果使用其他AI开发环境，请按该环境的MCP设置方法进行替换。

首先从Codex App左下角菜单打开设置。

![打开Codex App设置](/images/bf_portal_doc/d-codex-1.png)

打开设置画面后，在左侧菜单选择「MCP 服务器」，然后按「添加服务器」。

![Codex App的MCP服务器设置](/images/bf_portal_doc/d-codex-2.png)

在自定义MCP设置画面中，按如下方式输入。

| 项目 | 输入示例 |
| ---- | ---- |
| 名称 | `bf6-portal-typescript-mcp` |
| 类型 | `STDIO` |
| 启动命令 | `npx` |
| 参数1 | `bf6-portal-typescript-mcp@latest` |
| 参数2 | `mcp` |
| 参数3 | `--sdk_path` |
| 参数4 | `/path/to/bf6-portal-sdk` |

![Codex App中MCP服务器的设置方法](/images/bf_portal_doc/d-codex-3.png)

请把 `/path/to/bf6-portal-sdk` 替换成自己的Portal SDK位置。
大致来说，指定能看到 `code/types/mod/index.d.ts` 的位置。

设置后，如果Codex的工具列表中可以使用 `bf6_portal_typescript_mcp`，就准备完成了。

# 4　最开始交给AI的请求

第一次请求时，要具体写出想创建的现象。
代码细节可以交给AI，但目标、条件、可用工具要提供。

```text
请编写一个BF6 Portal的TypeScript程序，在玩家生成时，在玩家面前生成「Apple_01」对象。
可以使用bf6_portal_typescript_mcp服务器，所以如果有不清楚的Portal内容，请使用该MCP服务器查询。
```

这个请求提供了三类信息。

* 想做的事：在生成的玩家面前生成对象。
* 想使用的东西：`Apple_01`。
* 调查方式：Portal API有不清楚的地方就使用MCP。

如果已经知道地图，也从一开始就写进去。

```text
地图是Mirak Valley。
如果Apple_01的RuntimeSpawn候选会因地图而不同，请先用MCP确认后再选择。
```

让AI写代码时，不要只说「请写代码」。
把「不清楚的Portal API请查询」也一起说出来，这是诀窍。

# 5　第一次没有完成也不是失败

AI最初写出的代码中，Apple有时不会显示。
这可能是AI完全写错了，也可能只是缺少Portal侧的加载信息或实机时机信息。

这里重要的是，不要停在「看不见」。
让AI加入下面这样的确认用代码。

* 在 `OnGameModeStarted` 中加入 `console.log`。
* 在画面右上角显示通知。
* 在 `OnPlayerDeployed` 中加入 `console.log`。
* 把生成坐标输出到日志。

例如，在 `OnGameModeStarted` 中加入这样的确认。

```ts
export function OnGameModeStarted(): void {
    console.log("AppleInFront: OnGameModeStarted");
    mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
    mod.DisplayNotificationMessage(mod.Message("AppleInFront loaded"));
}
```

如果画面右上角出现 `AppleInFront loaded`，说明该代码已经被Portal读取。
如果没有出现，在怀疑Apple坐标之前，先怀疑注册的 `Script.ts` 或构建后的 `dist/Script.ts`。

# 6　把日志交给AI并请求解决

Portal日志会输出到如下位置。

```text
%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt
```

无法运行时，把这个日志交给AI。
重要的不是感想，而是日志本身。

不好的交法如下。

```text
Apple没有显示。请修复。
```

这样无法判断是加载失败、事件未触发、坐标错误，还是Prefab不匹配。

好的交法如下。

```text
Apple没有显示。
`%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` 中只有下面这条日志。

[UTC 2026-04-30 23:38:28] Mod started

请修改代码，让我们能够确认Portal是否读取了代码、事件是否触发。
必要时请用bf6_portal_typescript_mcp查询Portal API。
```

有了这些信息，AI就能判断「首先应该确认代码是否被读取」。

# 7　把状态和现象一起交给AI

有时，代码已经被读取，但Apple仍然看不见。

```text
地图是Mirak Valley，所以Tungsten应该是正确的。
日志如下。
我个人比较在意日志里的「0, -0.3499999940395355, 2」。
这看起来不像全局坐标。

[UTC 2026-04-30 23:47:31] Mod started
[UTC 2026-04-30 23:47:48] QuickJS: console.log: AppleInFront: OnGameModeStarted
[UTC 2026-04-30 23:47:48] QuickJS: console.log: AppleInFront: OnPlayerDeployed
[UTC 2026-04-30 23:47:48] QuickJS: console.log: Apple spawn position: 0, -0.3499999940395355, 2
```

这种交法相当好。
AI可以把状况拆开来思考。

* `OnGameModeStarted` 正在运行。
* `OnPlayerDeployed` 也正在运行。
* `Apple spawn position` 已经输出。
* 但是坐标看起来接近原点。
* 可能是在出击后立刻读取时，士兵坐标或朝向还没有确定。

这种情况下，把下面的修正交给AI处理。

* 把 `OnPlayerDeployed` 改成 `async`。
* 在读取士兵状态前使用 `await mod.Wait(...)` 稍等。
* 不以 `EyePosition` 为基准，而以 `GetPosition` 为基准。
* 输出 `Player position`、`Player eye position`、`Player facing direction`、`Apple spawn position`。
* 把等待时间做成容易修改的常量。

人类不需要完全猜中原因。
只要把「这个值可疑」「看起来不像全局坐标」这样的观察交出去，AI就更容易确定调查方向。

# 8　完成例：在玩家面前生成Apple

在Mirak Valley生成 `Apple_01` 时，完成形如下。
它会在出击后等待3秒，读取玩家的位置和朝向，然后在前方2米处生成稍大的Apple。

```ts
const APPLE_DISTANCE_METERS = 2.0;
const APPLE_VERTICAL_OFFSET_METERS = 0.2;
const APPLE_SCALE = mod.CreateVector(3, 3, 3);
const APPLE_ROTATION = mod.CreateVector(0, 0, 0);
const SOLDIER_STATE_DELAY_SECONDS = 3.0;

function getAppleSpawnPosition(player: mod.Player): mod.Vector {
    const playerPosition = mod.GetSoldierState(player, mod.SoldierStateVector.GetPosition);
    const facingDirection = mod.Normalize(mod.GetSoldierState(player, mod.SoldierStateVector.GetFacingDirection));

    return mod.Add(
        mod.Add(playerPosition, mod.Multiply(facingDirection, APPLE_DISTANCE_METERS)),
        mod.CreateVector(0, APPLE_VERTICAL_OFFSET_METERS, 0)
    );
}

function logVector(label: string, vector: mod.Vector): void {
    console.log(`${label}: ${mod.XComponentOf(vector)}, ${mod.YComponentOf(vector)}, ${mod.ZComponentOf(vector)}`);
}

export function OnGameModeStarted(): void {
    console.log("AppleInFront: OnGameModeStarted");
    mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
    mod.DisplayNotificationMessage(mod.Message("AppleInFront loaded"));
}

export async function OnPlayerDeployed(eventPlayer: mod.Player): Promise<void> {
    console.log("AppleInFront: OnPlayerDeployed");

    await mod.Wait(SOLDIER_STATE_DELAY_SECONDS);

    logVector("Player position", mod.GetSoldierState(eventPlayer, mod.SoldierStateVector.GetPosition));
    logVector("Player eye position", mod.GetSoldierState(eventPlayer, mod.SoldierStateVector.EyePosition));
    logVector("Player facing direction", mod.GetSoldierState(eventPlayer, mod.SoldierStateVector.GetFacingDirection));

    const spawnPosition = getAppleSpawnPosition(eventPlayer);
    logVector("Apple spawn position", spawnPosition);

    mod.SpawnObject(
        mod.RuntimeSpawn_Tungsten.Apple_01,
        spawnPosition,
        APPLE_ROTATION,
        APPLE_SCALE
    );

    mod.DisplayNotificationMessage(mod.Message("Apple spawned"), eventPlayer);
}
```

成功后，Apple会显示在出击玩家的面前。

![完成后的Apple生成画面](/images/bf_portal_doc/d-codex-4.png)

# 9　交给AI的信息模板

想让AI修正Portal代码时，按下面的形式交给它，对话会更快。

```text
想做的事:
想在生成的玩家面前生成Apple_01。

环境:
地图是Mirak Valley。
可以使用bf6_portal_typescript_mcp，所以Portal API有不清楚的地方请查询。

当前状态:
代码已经注册到Portal。
游戏内看不到Apple。

日志:
`%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` 的内容如下。

...

在意的点:
生成坐标是 `0, -0.3499999940395355, 2`，看起来不像全局坐标。

请求:
请添加用于切分原因的日志，并进行必要的代码修正。
```

这种形式既适用于Codex，也适用于其他AI。
交给AI的不需要是完美推理。
目标、状态、日志、在意的点就够了。

# 10　这种推进方式的注意点

* 可以以前提「让AI写代码」来推进。
* 人类交出「目标」「现象」「日志」。
* 日志从 `%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` 获取。
* 在能使用MCP的环境中，让AI查询不清楚的Portal API。
* 即使AI不能使用MCP，交出日志和现象的会话形式也一样。
* 如果不能运行，按读取、事件触发、坐标、Prefab的顺序切分。
* 实机看到的结果才是最终判断。不要只凭AI的说明就当作完成。

# 结论

* Portal的TypeScript代码，很大程度上可以交给AI。
* 人类的工作是交出想做什么、发生了什么、日志里出现了什么。
* BF6 Portal TypeScript MCP可以作为让AI查询Portal SDK的词典。
* Codex App的设置只是使用MCP的一例，编码对话的基本方式在其他AI中也一样。
* 只要交出目标、状态、日志、在意的点，和AI的修正循环就会快很多。
