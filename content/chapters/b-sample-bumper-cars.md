---
title: "付録B： サンプルプログラム解説「BumperCars（車両ミニゲーム）」"
free: true
---

# ゲーム概要

`BumperCars` は、車両を使った小規模ミニゲームのサンプルです。

プレイヤーの装備制限、車両管理、Ready Up、ゲーム状態、UI表示など、ミニゲームを作るときの基本要素がまとまっています。

# 主な内容

* `OnGameModeStarted` でゲーム初期化、AutoSpawn設定、InteractPoint制御。
* `OnPlayerDeployed` で武器を外し、射撃入力を制限。
* `OnVehicleSpawned` で出現車両をゲーム側の管理に追加。
* `OnPlayerInteract` でReady Upやデバッグ操作を受け取る。
* `GameState` と `HoH_GameHandler` で進行状態を管理。
* `PlayerProfile` でプレイヤーごとの状態を管理。
* UIクラスでカウントダウン、勝者表示、スコアボードを管理。

# 読む順番

## 1. 入口イベントを見る

最初に、ファイル先頭のイベント関数だけを読みます。

`OnGameModeStarted`、`OnPlayerDeployed`、`OnVehicleSpawned`、`OnPlayerInteract` が、ゲーム進行の入口です。

## 2. GameStateを見る

`GameState` は、このモードが今どの段階にいるかを表します。

Ready Up中なのか、開始カウント中なのか、試合中なのか。ここを見れば、イベントがどの状態で通るべきか分かります。

## 3. PlayerProfileを見る

プレイヤーごとの状態は `PlayerProfile` に寄せられています。

途中参加、離脱、死亡、再出撃があるゲームでは、プレイヤー情報を一箇所に集めると追いやすくなります。

# 小技

`OnPlayerDeployed` で武器を外し、射撃入力も制限している点が重要です。

車両ミニゲームでは、通常のFPS操作が残っているとゲーム性が壊れます。モードに不要な入力や装備は、最初に消す方が安全です。

# 結論

`BumperCars` は、ミニゲーム型Portalモードの骨格を見るサンプルです。

車両、Ready Up、状態管理、UI、プレイヤー管理をまとめて学びたいときに読むとよいです。
