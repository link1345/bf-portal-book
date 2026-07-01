---
title: "付録B： サンプルプログラム解説「MovingPlatformExample（動く足場）」"
free: true
---

# MovingPlatformExampleは何を見るサンプルか

`MovingPlatformExample` は、Spatial Editor上のオブジェクトを動く足場として扱うサンプルです。
SDK 1.3.3.0で追加された `MovingPlatform` の考え方を、`MoveObjectOverTime` と `OrbitObjectOverTime` で確認できます。

# 含まれる主なファイル

| ファイル | 役割 |
| ---- | ---- |
| `MovingPlatformExample.ts` | 足場を移動・回転させるスクリプト本体 |
| `MovingPlatformExample.tscn` | 足場や経路の配置例 |
| `MovingPlatformExample.strings.json` | 表示文字列 |
| `README_MovingPlatformExample.md` | 使うオブジェクトと配置方法の説明 |

# 動く足場の作り方

このサンプルでは、`BarrierStoneBlock_01_H_PortalPlatform` を足場として使います。
コードから `SpawnObject` で生成する方法と、Godot上に置いてObjIdで参照する方法の両方を確認できます。

足場の移動は、主に次のAPIで読みます。

| 名前 | 役割 |
| ---- | ---- |
| `mod.MoveObjectOverTime(...)` | 指定した座標へ時間をかけて移動する |
| `mod.OrbitObjectOverTime(...)` | 指定した中心や軸に沿って回転移動する |
| `mod.SpawnObject(...)` | RuntimeSpawnから足場オブジェクトを生成する |
| `mod.UnspawnObject(...)` | 生成したオブジェクトを消す |

# 処理の流れ

サンプルは、足場の参照を取得してから、一定時間で移動または回転させます。
通常のTeleportではなく時間つきの移動なので、プレイヤーが乗る足場、巡回する床、ギミックの足場を作るときの基本形になります。

配置済みオブジェクトを使う場合は、Godot側のObjIdとTypeScript側の取得番号を合わせる必要があります。
動かなければ、まず `GetObjId()` で参照している対象が本当に足場か確認してください。

# 注意点

動く足場は、見た目だけでなくプレイヤーの移動体験にも影響します。
短すぎる時間、急すぎる移動、狭すぎる足場は落下や酔いやすさにつながります。

また、同じオブジェクトへ複数の移動命令を重ねると、意図した経路にならないことがあります。
サンプルのように、次の移動へ進む前に待機時間や状態フラグを置いてください。

# 結論

`MovingPlatformExample` は、Spawnしたオブジェクトや配置済みオブジェクトを、Portalロジックで動かす教材です。
足場のObjId、移動時間、次の命令を出すタイミング。この3点を先に読めば、動く床や巡回ギミックへ応用できます。

