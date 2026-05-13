---
title: "附录 B：示例程序说明“HybridExample（混合使用区块和 TypeScript）”"
free: true
---

# HybridExample 展示什么

`HybridExample` 展示如何从 Portal 区块调用 TypeScript 函数。
当你想保留已有区块逻辑，只把数组、字符串、数学函数、UI 生成等麻烦部分移到 TypeScript 时，这个示例很有用。

这个示例会从 `HybridExample.workspace.json` 的区块调用 `HybridExample.ts` 中的函数。

# 阅读要点

| 文件 | 作用 |
| ---- | ---- |
| `HybridExample.workspace.json` | 区块侧规则、变量、`JsAction` / `JsValue` 调用 |
| `HybridExample.ts` | 从区块调用的 TypeScript 函数 |
| `HybridExample.strings.json` | UI 和字符串读取使用的键 |
| `MP_Granite_TechCampus_Portal_HybridExample.tscn` | 该示例的 Spatial Editor 场景 |

`JsAction` 可理解为不使用返回值的 TypeScript 调用。
`JsValue` 可理解为把 TypeScript 返回值交回 Portal 变量或区块输入的调用。

# 关键函数

| 函数 | 目的 |
| ---- | ---- |
| `Log` | 从区块侧输出日志 |
| `LogArray` | 遍历 Portal 数组并输出日志 |
| `InitUI` | 用 `modlib.ParseUI` 创建 Text UI |
| `UniqueID1` / `UniqueID2` | 返回连续编号字符串数组 |
| `SectorUI` | 返回 A-Z 的区域字母 |
| `Atan2` | 让 Portal 侧使用 JavaScript 数学函数 |
| `GetString` | 通过 `mod.strings[key]` 读取字符串值 |
| `SplitString` | 将分隔字符串转换为 Portal 数组 |

SDK 1.3.1.0 在类型定义中追加了 `mod.strings`。
传给 `mod.Message(...)` 时使用 `mod.stringkeys`；需要字符串原始值时使用 `mod.strings[key]`。

# 结论

`HybridExample` 是学习区块和 TypeScript 协作的示例。
把事件流程留在区块中，把繁琐的数据整理和工具逻辑交给 TypeScript。
