---
title: "付録B： サンプルプログラム解説「PortalGadgetExample（専用ガジェット入力）」"
free: true
---

# ゲーム概要

`PortalGadgetExample` は、Portal Gadgetをプレイヤーに持たせ、照準・射撃・レーザー切替などの入力をスクリプトで受け取るサンプルです。

「しゃがむと実行」のような代用操作ではなく、専用ガジェットを使ってプレイヤーの意思を受け取れるのが大きなポイントです。

# 主な内容

* `mod.AddEquipment(player, mod.Gadgets.Misc_PortalGadget)` でPortal Gadgetを付与。
* `OnPortalGadgetFireStart`、`OnPortalGadgetFireStop` で射撃入力を受け取る。
* `OnPortalGadgetAimStart`、`OnPortalGadgetAimStop` で照準入力を受け取る。
* `OnPortalGadgetLaserToggle` でモードの有効・無効を切り替える。
* `RayCast`、`OnRayCastHit`、`OnRayCastMissed` でプレイヤーの視線方向を使う。
* `InteractPoint` でテレポートモードとオブジェクト生成モードを切り替える。

# 読む順番

## 1. 装備付与を見る

`OnPlayerDeployed` でPortal Gadgetを付与しています。

プレイヤーが出撃したタイミングで装備を渡す処理は、他のモードでも使いやすい形です。

## 2. 入力イベントを見る

Portal Gadgetの入力は、通常の `OnPlayerInteract` とは別のイベントで受け取ります。

| イベント | 役割 |
| ---- | ---- |
| `OnPortalGadgetFireStart` | 発射ボタンを押した |
| `OnPortalGadgetFireStop` | 発射ボタンを離した |
| `OnPortalGadgetAimStart` | 照準を開始した |
| `OnPortalGadgetAimStop` | 照準をやめた |
| `OnPortalGadgetLaserToggle` | レーザー切替入力 |

## 3. RayCastを見る

このサンプルでは、プレイヤーの目線方向からRayCastを飛ばし、当たった地点へテレポートしたり、オブジェクトを生成したりします。

見るべき流れは、`GetRayCastVectors` → `mod.RayCast` → `OnRayCastHit` / `OnRayCastMissed` です。

# 小技

`currentSwitchMode` のように、現在のモードを数値で持っています。自分で作る場合は、`"Teleport"` や `"SpawnObject"` のような文字列型にすると読みやすくなります。

また、RayCastの失敗時に `DisplayHighlightedWorldLogMessage` で理由を出している点も参考になります。入力に反応しないと、プレイヤーは「壊れている」と感じます。

# 結論

Portal Gadgetは、プレイヤーの能動的な入力を作るための強い道具です。

このサンプルでは、ガジェット付与、入力イベント、RayCast、モード切替、失敗時メッセージの流れを重点的に読んでください。
