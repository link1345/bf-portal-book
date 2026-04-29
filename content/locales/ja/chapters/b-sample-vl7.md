---
title: "付録B： サンプルプログラム解説「VL7Example（ガス雲と画面効果）」"
free: true
---

# ゲーム概要

`VL7Example` は、VL7Cloud、ScreenEffect、SoldierEffect、WorldIconを組み合わせて、ガス雲の効果を切り替えるサンプルです。

エリア侵入、視覚効果、装備付与、WorldIconの色変更をまとめて確認できます。

# 主な内容

* `OnPlayerDeployed` でプレイヤーにガスマスクを付与。
* `mod.SetVL7CloudEffects` でガス雲の画面効果・兵士効果・視覚効果を切り替える。
* `mod.EnableScreenEffect` でプレイヤー個別の画面効果を切り替える。
* `mod.SetSoldierEffect` で兵士側の効果を切り替える。
* `OnPlayerEnterVL7Cloud`、`OnPlayerExitVL7Cloud` で侵入・退出ログを取る。
* `WorldIcon` の色とテキストで現在のON/OFFを見せる。

# 読む順番

## 1. 初期化を見る

`OnGameModeStarted` では、VL7Cloudの効果を初期設定し、WorldIconの色と文言を設定しています。

トグル式の仕掛けでは、最初に「今ONなのかOFFなのか」を見えるようにしておくのが大切です。

## 2. InteractPointの分岐を見る

`OnPlayerInteract` では、押されたInteractPointのObjIdによって切り替える対象を変えています。

見るべき流れは、`mod.GetObjId(interactPoint)` → 対象フラグ反転 → WorldIcon更新 → 効果更新です。

## 3. 侵入・退出イベントを見る

`OnPlayerEnterVL7Cloud` と `OnPlayerExitVL7Cloud` は、プレイヤーがVL7Cloudに入った・出たタイミングで呼ばれます。

このサンプルではログ出力だけですが、実際のモードではダメージ、スコア、警告表示などを追加できます。

# 小技

WorldIconの色でON/OFFを表す作りは、デバッグにもプレイヤー案内にも使えます。

ただし、色だけに頼ると見落とすプレイヤーもいます。公開用では、短いテキストも合わせて出すのが安全です。

# 結論

`VL7Example` は、エリア効果とプレイヤー個別効果を学ぶサンプルです。

ガス、毒、放射線、特殊区域のような「入ったら何かが起きる場所」を作りたいときに、まず読むとよいです。
