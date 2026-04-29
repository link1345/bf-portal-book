---
title: "第三章 “门户定制”环境搭建"
free: true
---

> --- 为了创建它，让我们准备一个开发环境。

本章为您提供了开始后续章节所需的工具。
请注意，如果不做这些事情，你绝对无法开发“门户定制”。

# 下载BF官方SDK

https://portal.battlefield.com/

当您访问上述网址时，系统会询问您是“战地 2042”还是“战地 6”，因此选择“战地 6”并单击“开始创建”。

![开始](/images/bf_portal_doc/3-setup-init-0.png)

顶部有一个“下载 SDK”按钮，单击它可以下载 SDK zip 文件。

![下载](/images/bf_portal_doc/3-setup-init-1.png)

如果在这些步骤中提示您登录，请使用您的 EA 帐户登录。

另外，下载完成后，解压 zip 文件。要解压缩文件，请右键单击下载的文件，然后会出现一列“提取全部...”，单击该列以解压缩 zip 文件。

# 准备地图编辑器

解压下载的 SDK zip 文件后，您可以立即使用地图编辑器。

在官方的SDK说明中，Godot端做了以下准备工作。

1. 启动 SDK 中包含的 Godot 可执行文件。
2. 当“项目选择”屏幕打开时，拖动并加载 SDK 中的 `GodotProject` 文件夹。如果您想手动执行此操作，请从“导入”中选择 `GodotProject`。
3. 打开战地 6 门户项目。首次启动可能需要几分钟。
4. 在Godot右侧的`BFPortal`选项卡上按`Portal Setup`，等待设置完成。
5. 从 `Scene` 菜单中选择 `Open Scene`，然后在 `levels` 目录中打开要编辑的级别。

如果您在关卡中看不到地形，则它可能位于您的相机位置上方。首先，查看上方并确保地形已加载。

## 地图编辑器的基本操作

在官方SDK文档中，描述了以下操作作为空间编辑器的基本操作。

|运营|内容 |
| ---- | ---- |
|从对象库拖动 |将要使用的对象放入 3D 场景或场景大纲 |
|选择 `W` | 时移动模式。移动放置的物体 |
|选择 `E` | 时旋转模式。旋转放置的对象 |
|选择 `R` | 时缩放模式。缩放放置的对象 |

在 3D 视图中移动视点是标准的 Godot 操作，因此请使用鼠标或 WASD 移动来检查位置。
当触摸放置的对象时，请记住先选择它，然后使用 `W` / `E` / `R` 来移动、旋转和缩放它，这样你就不会迷路。

基本上，比例应该是统一的。
单独拉伸 X/Y/Z 的非均匀缩放不受官方支持，并且会导致游戏内外观和命中检测损坏。

# 准备打字稿

本书不详细介绍可视化编辑器或块可视化编程。
从现在开始，我们将准备使用 TypeScript SDK 和模板存储库进行开发。

## 1. 创建github账户

https://github.com/

访问 github 并创建您自己的帐户。

## 2. 创建存储库（项目）

https://github.com/link1345/Battlefield6-SampleTemplate

在上面的页面上，有一个名为“使用此模板”的按钮，如下图所示，因此单击它，然后单击“创建新存储库”。

![使用这个模板](/images/bf_portal_doc/3-setup-1.png)


然后，将打开一个名为“创建新存储库”的页面，因此请按照说明操作并填写如下图所示的信息。
“存储库名称”是您的项目的名称。请选择一个适合您目的的名称。
“描述”是对项目的描述。你不必写任何东西。
“选择可见性”允许您选择项目是“私有”还是“公共”。如果您不打算向任何人公开，那么私有也可以。

![创建一个新的存储库](/images/bf_portal_doc/3-setup-1.png)

如果存储库（项目）创建成功，将显示如下图所示。

![存储库](/images/bf_portal_doc/3-setup-3.png)

## 3 . 使源代码可访问

我想立即接触源代码，但这次我想轻松创建一个环境，所以我想使用“Codespaces”。

:::message alert

这次，我们使用**Codespaces**来轻松构建环境。

由于Portal的TypeScript注册规范，它不会是一个使用很多GB的大型程序，所以我认为免费层就足够了。
如果你想在本地环境中执行此操作，则需要在计算机上安装 VSCode，使用 git 克隆存储库，并做很多工作。 **

[模板“link1345/Battlefield6-SampleTemplate”](https://github.com/link1345/Battlefield6-SampleTemplate)在README.md（英语）和README-JP.md（日语）中有说明，所以请检查那里。

:::

当您访问您构建的存储库的页面并按标有“代码”的绿色按钮时，您将看到“本地”和“代码空间”选项。
这次，单击“Codespaces”并按“Create codespace on main”按钮。

![代码空间顶部](/images/bf_portal_doc/3-setup-5.png)


片刻之后，VSCode 将在新的浏览器选项卡中打开，并且将出现一个指南，如下图所示。

![vscode 顶部](/images/bf_portal_doc/3-setup-6.png)

底部有一个名为“Terminal”的选项卡，因此单击它，切换到“Terminal”选项卡，然后输入“`npm install`”。
特别是如果没有出现`Error`这句话，就没有问题。

![vscode 顶部](/images/bf_portal_doc/3-setup-7.png)

接下来，查看VSCode的资源管理器，将第一次从BF官方下载并解压的SDK所在的`code`文件夹中的内容放入`code`文件夹中。
如果按照下图插入就没有问题了。

![SDK设置](/images/bf_portal_doc/3-setup-8.png)

## 4 . 模板可以让什么变得更简单？

在本书中，我们使用 [link1345/Battlefield6-SampleTemplate](https://github.com/link1345/Battlefield6-SampleTemplate) 进行 TypeScript 开发。

如果直接在Portal Web Builder的Script字段中写代码的话，是可以的，但是如果写大一点的话，就会出现下面的问题。

* 1 个文件变得很长，我不记得我在哪里写了什么。
* 直到开始游戏我才注意到一个小语法错误。
* 每次重新测试同一流程时，手动工作都会增加。
* Portal Web Builder 的 Script 字段最终接收的是一个 TypeScript 文件，因此需要手动将已经拆分成文件的代码拼凑在一起。

该模板可以轻松实现：

|命令 |你能做什么|
| ---- | ---- |
| `npm run lint` | `npm run lint` |使用 ESLint 检查语法和写作风格 |
| `npm run lint:fix` | `npm run lint:fix` |自动修复可以使用 ESLint 修复的问题 |
| `npm run build` | `npm run build` |将 `mods` 下的多个 `.ts` 文件合并到 `dist/Script.ts` |
| `npm run test` | `npm run test` |使用 Vitest 运行测试 |

当您推送到 GitHub 时，模板中包含的 GitHub Actions 将执行 `npm run lint`。换句话说，您可以在发布之前快速阻止“一开始就可疑”的代码。

## 5 . 模板文件夹结构

前四个要查看的地方是：

|地点 |角色 |
| ---- | ---- |
| `mods/` | `mods/` |您编写的 TypeScript 代码 |
| `code/` | `code/` | 《战地 6》SDK 的 `code` 文件夹放置在哪里？
| `dist/Script.ts` | `dist/Script.ts` | `npm run build` 要在 Portal 中注册的 TypeScript |
| `dist/Strings.json` | `dist/Strings.json` | Portal | 要注册的字符串定义
| `test/` | `test/` |维测试测试存储|

在开发过程中，多个文件被写入`mods`。完成后，运行 `npm run build` 并将生成的 `dist/Script.ts` 和 `dist/Strings.json` 注册到 Portal Web Builder 的 Script 字段中。

:::message alert

在README中，有些地方字符串文件写为`String.json`，但模板中的实际文件是`dist/Strings.json`。本书中写为`dist/Strings.json`。

:::

使用 TypeScript 创建 Portal 脚本的步骤到此结束。

# 如何导航 SDK 文件夹

SDK 很大，因此您无需从头阅读所有内容。请先按以下顺序观看。

|去哪里看|看什么 |
| ---- | ---- |
| `docs/pages/getting_started.html` | `docs/pages/getting_started.html` |启动Godot、导入`GodotProject`、`Portal Setup`的流程 |
| `docs/pages/spatial_editor.html` | `docs/pages/spatial_editor.html` |地图编辑、对象库、导出 `.spatial.json` |
| `docs/pages/gameplay_logic.html` | `docs/pages/gameplay_logic.html` | TypeScript、自定义 UI、AI、ObjId 参考、日志确认 |
| `docs/pages/tips_tricks.html` | `docs/pages/tips_tricks.html` |车辆数量、玩家扫描、UI widget 管理等负载对策 |
| `code/types/mod/index.d.ts` | `code/types/mod/index.d.ts` | Portal TypeScript API 函数和类型列表 |
| `GodotProject/mods/_StartHere_BasicTemplate` | `GodotProject/mods/_StartHere_BasicTemplate` |首先阅读官方 TypeScript 模板 |

其中本地 SDK 为 `sdk.version.json` ，参考 SDK 为 `1.2.3.0` 。 SDK 的内容会随着更新而变化，因此，如果本文档中的步骤与屏幕不同，请先检查 `sdk.version.json` 和 `docs/pages`。

# 结论

我们准备了使用“Portal Custom”创建游戏的环境。
现在您可以在接下来的章节中顺利地编程和创建游戏。

---

📘 **在下一章《地图编辑器实用指南（实用放置与链接）》**中，我们将利用已经准备好的环境来进行“可以放置什么”、“放置在哪里”、“如何分配ID”**。共享是试用设置→警告标记确认，ID为-1禁止&分类帐。使用这两个作为密码，继续下一步。
