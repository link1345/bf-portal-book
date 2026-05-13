---
title: "付録B： サンプルプログラム解説「HybridExample（ブロックとTypeScriptの混在）」"
free: true
---

# HybridExampleは何を見るサンプルか

`HybridExample` は、Portalのブロック側からTypeScript関数を呼び出す流れを確認するためのサンプルです。
通常のTypeScriptサンプルだけを読んでいると、すべてをコードで書く前提に寄りがちです。しかし実際のPortal制作では、既存のブロック資産を残しながら、一部だけTypeScriptに逃がす形も有効です。

このサンプルでは、`HybridExample.workspace.json` のブロックから `HybridExample.ts` 内の関数を呼びます。

# 読むポイント

| 見る場所 | 役割 |
| ---- | ---- |
| `HybridExample.workspace.json` | ブロックエディタ側のルール、変数、`JsAction` / `JsValue` 呼び出し |
| `HybridExample.ts` | ブロックから呼ばれるTypeScript関数 |
| `HybridExample.strings.json` | UIや文字列取得で使うキー |
| `MP_Granite_TechCampus_Portal_HybridExample.tscn` | このサンプル用のSpatial Editorシーン |

`JsAction` は戻り値を使わないTypeScript呼び出し、`JsValue` は戻り値をPortal変数などへ渡す呼び出しとして読めます。
たとえば `main.UniqueID1` や `main.SectorUI` はTypeScriptで配列を組み立て、その結果をブロック側の変数に入れる例です。

# TypeScript側の構造

`HybridExample.ts` には、次のような小さな関数がまとまっています。

| 関数 | 目的 |
| ---- | ---- |
| `Log` | ブロック側からログを出す |
| `LogArray` | Portal配列を走査してログ出力する |
| `InitUI` | `modlib.ParseUI` でText UIを作る |
| `UniqueID1` / `UniqueID2` | 連番文字列の配列を返す |
| `SectorUI` | A-Zのセクター文字配列を返す |
| `Atan2` | JavaScript標準関数をPortal側から使える形にする |
| `GetString` | `mod.strings[key]` から文字列実体を読む |
| `SplitString` | カンマ区切りなどの文字列をPortal配列へ変換する |

SDK 1.3.1.0で `mod.strings` が型定義に追加されました。
`mod.stringkeys` は `mod.Message(...)` に渡すキーとして使うのが基本ですが、`mod.strings[key]` は文字列JSONの中身を直接読む用途に使われています。

# 取り入れ方

既存のPortalブロックが大きくなりすぎたとき、すべてを一気にTypeScriptへ移す必要はありません。
まずは次のような処理だけをTypeScriptへ切り出すと効果が出ます。

* 長い配列を作る処理
* 文字列の分割や変換
* UI定義の組み立て
* 数学関数や小さなユーティリティ
* ログ出力の整形

ただし、ブロックから呼ぶ関数名は文字列で指定されます。
`main.FunctionName` の綴りを変えるとブロック側も壊れるので、関数名はむやみに変更しないでください。ここで油断すると、賢い俺でも探すのが面倒な壊れ方をします。

# 結論

`HybridExample` は、PortalブロックとTypeScriptを対立させずに併用するためのサンプルです。
ブロックでイベントの流れを保ち、TypeScriptで配列・文字列・UI生成のような面倒な処理を担当させる。この分担を覚えると、既存プロジェクトを壊さずに少しずつコード化できます。
