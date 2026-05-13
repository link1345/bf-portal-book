---
title: "第 0 章 关于本书"
free: true
---

## 本书的目的

本书面向“想在 Battlefield 6 Portal 里亲手做点有趣内容”的读者，目标是从基础的编辑器用法开始，学习 Portal 独有的机制。
本书也会介绍为了长期运营 Portal 服务器而需要的程序改进，目标是掌握 Portal 的脚本功能和地图编辑器。
需要说明的是，本书不讲解积木式可视化编程，而是以 TypeScript 实现为中心。

### 关于可视化编程和地图编辑器

关于可视化编程和地图编辑器，[“BF Portal BF6 备忘录 by TOKAI_Server_JPN”](https://w.atwiki.jp/tokaiserver/pages/1.html) 中有更详细的说明。

## 目标受众

简单来说，本书面向“编程初学者”级别的读者。具体来说，假设读者符合以下情况。

* 学过一点编程（大致相当于 2025 年日本初中课程中学习过的水平）
* 用其他语言写过程序，但还没有深入学习过

这里所说的 2025 年日本初中课程水平，大致是“理解测量与控制系统的机制，并能制作安全、合适的程序”。

> 教育信息化指南 - 追补版 - （2020 年 6 月）第 3 章（文部科学省）：https://www.mext.go.jp/content/20200608-mxt_jogai01-000003284_004.pdf

因此，**本书不是编程入门书，也不是语法入门书**。
如果想学习 TypeScript 语法，推荐阅读《[サバイバルTypeScript](https://typescriptbook.jp/)》等入门资料。
如果想学习 Godot 的用法，推荐阅读“[Godot Engine 官方文档](https://docs.godotengine.org/ja/4.x/)”。

### 附录的目标受众

* 能像呼吸一样自然地写程序的人

附录是一本**面向已经会编程、但第一次接触 Portal 的 TypeScript API 的读者的手册**。


## 致谢

本书的审阅和修订得到了以下各位的协助。借此机会表示诚挚感谢。

* [fuji](https://x.com/fuji_nice)，[Clan Vol](https://team-vol.com/) 代表
* [Lab_WLM](https://x.com/Lab_WLM)


## 变更日志

2026-04-30：初稿
2026-05-01：新增关于 BF6 Portal TypeScript MCP 服务器，以及把状况和日志交给 AI 来编写 Portal 代码的章节
2026-05-02：补充关于 Codex App 中 MCP 设置、向 AI 提问的方法，以及 Rate limit 的说明
2026-05-13：对应官方 SDK v1.3.1.0。补充 `HybridExample`、`CustomCQ`、`mod.strings`、Radio 系 Music 常量、新增装备常量，以及 `VehicleSpawner` 的 `EnableRespawn` 变更说明
