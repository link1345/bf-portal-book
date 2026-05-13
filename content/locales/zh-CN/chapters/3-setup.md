---
title: "第 3 章 “Portal Custom”的环境构建"
free: true
---

> 为了开始制作，先准备开发环境。

本章会准备进入后续章节所需的工具。
如果不完成这些步骤，就无法开发“Portal Custom”，请务必注意。

# 下载 BF 官方 SDK

https://portal.battlefield.com/

访问上面的 URL 后，会询问你选择 Battlefield 2042 还是 Battlefield 6。请选择 Battlefield 6，然后点击“START CREATING”。

![start](/images/bf_portal_doc/3-setup-init-0.png)

页面顶部有“Download SDK”按钮，点击它下载 SDK 的 zip 文件。

![download](/images/bf_portal_doc/3-setup-init-1.png)

如果过程中提示需要登录，请使用 EA 账户登录。

下载完成后，请解压 zip 文件。解压的方法是右键点击下载好的文件，选择“全部解压...”，即可解压 zip 文件。

# 准备地图编辑器

只要把下载好的 SDK zip 文件解压，地图编辑器就可以马上使用。

按照官方 SDK 的步骤，需要在 Godot 侧进行以下准备。

1. 启动 SDK 中包含的 Godot 可执行文件。
2. 打开“Project Selection”画面后，把 SDK 内的 `GodotProject` 文件夹拖进去读取。如果手动操作，则从“Import”中选择 `GodotProject`。
3. 打开 Battlefield 6 Portal Project。首次启动可能需要几分钟。
4. 点击 Godot 右侧 `BFPortal` 标签中的 `Portal Setup`，等待设置完成。
5. 从 `Scene` 菜单选择 `Open Scene`，打开 `levels` 目录中想要编辑的关卡。

如果找不到关卡地形，它可能位于相机位置的上方。请先向上看，确认地形是否已经读取。

## 地图编辑器的基本操作

官方 SDK docs 中，将以下操作作为 Spatial Editor 的基本操作。

| 操作 | 内容 |
| ---- | ---- |
| 从 Object Library 拖动 | 将想使用的对象放置到 3D Scene 或 Scene Outliner 中 |
| 选中时按 `W` | Move mode。移动已放置的对象 |
| 选中时按 `E` | Rotate mode。旋转已放置的对象 |
| 选中时按 `R` | Scale mode。缩放已放置的对象 |

3D 视图中的视角移动是 Godot 的标准操作，可以通过鼠标操作或 WASD 移动来确认位置。
操作已放置对象时，请记住先选中对象，再用 `W` / `E` / `R` 切换移动、旋转、缩放。这样比较不容易迷路。

缩放原则上请使用统一缩放。
分别拉伸 X/Y/Z 的非统一缩放并未得到官方支持，可能会导致游戏中的外观或碰撞判定出问题。

# 准备 TypeScript

本书不会详细讲解可视化编辑器或块式可视化编程。
从这里开始，我们会准备使用 TypeScript SDK 和模板仓库进行开发。

## 1. 创建 GitHub 账户

https://github.com/

访问 GitHub，创建自己的账户。

## 2. 创建仓库（项目）

https://github.com/link1345/Battlefield6-SampleTemplate

打开上面的页面后，可以看到下图中的“Use this template”按钮。点击它，然后点击其中的“Create a new repository”。

![use this template](/images/bf_portal_doc/3-setup-1.png)


随后会打开“Create a new repository”页面。请按照下图的指示填写。
“Repository name”是项目名称。请使用符合用途的名称。
“Description”是项目说明，可以不填写。
“Choose visibility”可以选择项目是“private”还是“public”。如果没有公开给他人的计划，选择 private 即可。

![Create a new repository](/images/bf_portal_doc/3-setup-1.png)

仓库（项目）正常创建后，会显示成下图这样。

![仓库](/images/bf_portal_doc/3-setup-3.png)

## 3. 让源代码可以编辑

虽然现在就想开始改源代码，但这次为了简单搭建环境，我们会使用“Codespaces”。

:::message alert

这次为了简化环境构建，使用 **Codespaces**。

由于 Portal 的 TypeScript 注册规格限制，这不会变成需要占用好几 GB 的大型程序，所以免费额度应该足够使用。
如果要在 **本地环境** 中进行，就需要在自己的电脑上安装 VSCode，从仓库用 git Clone，并完成各种准备工作。

作为模板使用的 [link1345/Battlefield6-SampleTemplate](https://github.com/link1345/Battlefield6-SampleTemplate) 中，README.md（英语）和 README-JP.md（日语）都有说明，请根据需要查看。

:::

访问自己创建的仓库页面，点击绿色的“Code”按钮后，会出现 Local 和 Codespaces 两个选项。
这次点击“Codespaces”，然后点击“Create codespace on main”按钮。

![codespaces top](/images/bf_portal_doc/3-setup-5.png)


稍等片刻后，VSCode 会在新的浏览器标签页中打开，并显示如下图所示的引导。

![vscode top](/images/bf_portal_doc/3-setup-6.png)

下面有一个“Terminal”标签，点击它切换到“Terminal”标签，然后输入 `npm install`。
如果没有出现 `Error` 这个字样，就没有问题。

![vscode top](/images/bf_portal_doc/3-setup-7.png)

接着，在 VSCode 的资源管理器中查看 `code` 文件夹。把最开始从 BF 官方下载并解压的 SDK 中，`code` 文件夹里的内容放进去。
如果像下图这样放入，就没有问题。

![sdk setup](/images/bf_portal_doc/3-setup-8.png)

## 4. 模板能让哪些事情变轻松

本书使用 [link1345/Battlefield6-SampleTemplate](https://github.com/link1345/Battlefield6-SampleTemplate) 进行 TypeScript 开发。

即使直接在 Portal Web Builder 的 Script 栏中写代码也能运行，但代码稍微变大后，就会出现以下问题。

* 单个文件变得很长，分不清哪里写了什么。
* 细小的语法错误，要到启动游戏后才会发现。
* 每次重新测试同一段处理，手动操作都会增加。
* Portal Web Builder 的 Script 栏最终只接收一个 TypeScript 文件，因此需要手动把拆分后的代码合并起来。

使用这个模板后，下面的工作会变得更简单。

| 命令 | 可以做什么 |
| ---- | ---- |
| `npm run lint` | 用 ESLint 检查语法和写法 |
| `npm run lint:fix` | 自动修正 ESLint 可以修正的问题 |
| `npm run build` | 将 `mods` 下的多个 `.ts` 文件合并到 `dist/Script.ts` |
| `npm run test` | 用 Vitest 执行测试 |

推送到 GitHub 时，模板内包含的 GitHub Actions 也会执行 `npm run lint`。也就是说，在发布前就能尽早拦下“作为代码本身就可疑”的内容。

## 5. 模板的文件夹结构

最先看的地方如下。

| 位置 | 作用 |
| ---- | ---- |
| `mods/` | 放置自己编写的 TypeScript 代码 |
| `code/` | 放置 Battlefield 6 SDK 的 `code` 文件夹 |
| `dist/Script.ts` | 由 `npm run build` 生成，并注册到 Portal 的 TypeScript |
| `dist/Strings.json` | 注册到 Portal 的字符串定义 |
| `test/` | 放置 Vitest 测试 |

开发中会在 `mods` 中分成多个文件编写。完成后执行 `npm run build`，再把生成的 `dist/Script.ts` 和 `dist/Strings.json` 注册到 Portal Web Builder 的 Script 栏。

:::message alert

README 中有些地方把字符串文件写成 `String.json`，但模板内实际文件是 `dist/Strings.json`。本书统一写作 `dist/Strings.json`。

:::

至此，使用 TypeScript 制作 Portal 脚本的步骤就结束了。

# SDK 文件夹的阅读方式

SDK 很大，不需要一开始就全部阅读。请先按下面的顺序查看。

| 查看位置 | 可以了解什么 |
| ---- | ---- |
| `docs/pages/getting_started.html` | Godot 启动、`GodotProject` 的 Import、`Portal Setup` 的流程 |
| `docs/pages/spatial_editor.html` | 地图编辑、Object Library、`.spatial.json` 的 Export |
| `docs/pages/gameplay_logic.html` | TypeScript、Custom UI、AI、ObjId 引用、日志确认 |
| `docs/pages/tips_tricks.html` | 载具数量、Player 扫描、UI Widget 管理等负载对策 |
| `code/types/mod/index.d.ts` | Portal TypeScript API 的函数和类型列表 |
| `GodotProject/mods/_StartHere_BasicTemplate` | 最先阅读的官方 TypeScript 模板 |

本地 SDK 的 `sdk.version.json` 中，基准 SDK 是 `1.3.1.0`。SDK 会随着更新而改变内容，如果本书步骤和你的画面不同，请先确认 `sdk.version.json` 和 `docs/pages`。

# 结论

我们已经准备好了使用“Portal Custom”制作游戏的环境。
这样，在后续章节中就可以更顺利地把想法写成程序，并制作成游戏。

---

📘 **下一章“地图编辑器实务指南（放置与关联）”** 会使用准备好的环境，实际推进 **“可以放什么”“放在哪里”“如何赋予 ID”**。Shared 要先试放并确认警告标记，ID 禁止使用 -1，并整理成台账。记住这两点，进入下一步。
