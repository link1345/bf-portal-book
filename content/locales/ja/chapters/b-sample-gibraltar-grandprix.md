---
title: "付録B： サンプルプログラム解説「GibraltarGrandprix（地上レース）」"
free: true
---

# ゲーム概要

`GibraltarGrandprix` は、チェックポイント制の地上レースサンプルです。
Gibraltarを舞台にしたグランプリ形式として、チェックポイント、車両、順位UI、カウントダウンを確認できます。

# 主な内容

* `RaceTrack` と `Checkpoint` でコースデータを定義。
* `TrackData` でレース全体の状態を管理。
* `PlayerProfile` でプレイヤーごとのラップ、チェックポイント、順位を管理。
* `VehicleHandler` で車両割当や車両状態を管理。
* `HoH_CheckpointWorldIconsHolder` で次のチェックポイント表示を管理。
* `OnVehicleSpawned`、`OnPlayerDeployed`、`OnPlayerDied` などでレース中のイベントを処理。
* `OnPlayerUIButtonEvent` で車両選択などのUI操作を受け取る。

# 読む順番

## 1. コース定義を見る

最初に `RaceTrack`、`Checkpoint`、`tracks` の流れを見ます。

レースゲームでは、ロジックより先に「コースをどうデータとして持つか」が重要です。チェックポイントの位置、向き、周回数をデータ化している点を確認してください。

## 2. TrackDataを見る

`TrackData` は、レース1本分の状態を持つクラスです。

誰が参加しているか、レースが開始前か、勝者が出たか、終了カウント中かを追う中心になります。

## 3. UIと車両を見る

レースでは、プレイヤーに「次はどこか」「今何位か」「いつ始まるか」を見せる必要があります。

WorldIcon、Scoreboard UI、Start Countdown、Vehicle Select UIを、どのクラスが担当しているか確認してください。

# 小技

`GibraltarGrandprix` はレース系サンプルです。

# 結論

`GibraltarGrandprix` は、チェックポイント型ゲームの教材として優秀です。

コースデータ、参加者管理、車両管理、順位UIを分けて読むことで、レース以外の「順番に目標を巡るモード」にも応用できます。
