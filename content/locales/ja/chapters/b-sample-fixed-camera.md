---
title: "付録B： サンプルプログラム解説「FixedCameraExample（固定カメラとUIボタン）」"
free: true
---

# ゲーム概要

`FixedCameraExample` は、Godotに配置したFixedCameraを、UIボタンから切り替えるサンプルです。

カメラ演出、観戦風の視点、イベント開始前の見せ場を作りたい場合に役立ちます。

# 主な内容

* `OnGameModeStarted` でUI作成とカメラ移動処理を開始。
* `OnPlayerUIButtonEvent` で押されたUIボタンを判定。
* `mod.SetCameraTypeForPlayer` でプレイヤーのカメラを固定カメラへ変更。
* `mod.MoveObjectOverTime`、`mod.SetObjectTransformOverTime` でカメラを移動。
* `AddUIContainer`、`AddUIButton`、`AddUIText` でUIを組む。

# 読む順番

## 1. UIボタンイベントを見る

`OnPlayerUIButtonEvent` は、UIボタンが押されたときの入口です。

`mod.GetUIWidgetName(eventUIWidget)` で押されたボタン名を取り、`StreetButton`、`HQ1Button`、`ReturnButton` のように分岐しています。

## 2. カメラ切替を見る

固定カメラへの切替は、次の形です。

```ts
mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.Fixed, 0);
```

最後の数値は、Godot側でFixedCameraに付けたObjIdに対応します。つまり、カメラも第4章のObjId台帳で管理する対象です。

## 3. カメラ移動を見る

`StartFlyThroughCamera` では、固定カメラを時間をかけて移動させています。

`SetObjectTransformOverTime` を使うと、単なる固定視点ではなく、ゆっくり動く演出カメラを作れます。

# 小技

戻るボタンでは、`mod.Cameras.FirstPerson` に戻しています。

固定カメラを使うときは、必ず「通常視点へ戻す道」を用意してください。戻せないカメラ演出は、プレイヤーにとって操作不能と同じです。

# 結論

`FixedCameraExample` は、UIボタン、固定カメラ、時間移動をまとめて学べるサンプルです。

ロビー演出、作戦説明、勝利演出など、プレイヤーに見せたい場面があるときに読む価値があります。
