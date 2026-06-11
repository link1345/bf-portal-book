---
title: "付録B： サンプルプログラム解説「GolmudTrainExample（列車制御）」"
free: true
---

# GolmudTrainExampleは何を見るサンプルか

`GolmudTrainExample` は、`Railway to Golmud` (`MP_GolmudRailway`) の列車をPortalスクリプトから扱うサンプルです。
通常のオブジェクト移動ではなく、SDKが用意した列車専用イベントと専用関数を読む教材です。

# 含まれる主なファイル

| ファイル | 役割 |
| ---- | ---- |
| `GolmudTrainExample.ts` | 列車操作、InteractPoint、HUD、WorldIcon更新の本体 |
| `GolmudTrainExample.tscn` | InteractPoint、WorldIcon、CapturePointなどを置いたSpatial Editorシーン |
| `GolmudTrainExample.strings.json` | 文字列キー |
| `README_GolmudTrainExample.ts` | 列車バリアント、イベント、CapturePoint連動の説明 |

# 列車を扱うAPI

SDK 1.3.2.0では、列車用に次のAPIとイベントが確認できます。

| 名前 | 役割 |
| ---- | ---- |
| `mod.GolmudTrainSendMoveCommand(...)` | 列車へ移動・停止コマンドを送る |
| `mod.GolmudTrainMoveCommands.MoveWest` | 西へ移動 |
| `mod.GolmudTrainMoveCommands.Stop` | 停止 |
| `mod.GolmudTrainMoveCommands.MoveEast` | 東へ移動 |
| `mod.GetGolmudTrainLocation()` | 現在の列車位置を `Vector` で取得 |
| `OnGolmudTrainStopped(...)` | 列車が停止したときに呼ばれるイベント |
| `mod.GolmudTrainStopReason.ReachedEastTerminal` | 東端に到達 |
| `mod.GolmudTrainStopReason.ReachedWestTerminal` | 西端に到達 |
| `mod.GolmudTrainStopReason.StoppedInTransit` | 途中停止 |

# 処理の流れ

このサンプルは、InteractPointで列車へ `MoveWest`、`Stop`、`MoveEast` を送ります。
列車は加速・減速に約6秒かかるため、その間はInteractPointを無効化し、連打で命令が重ならないようにしています。

`UpdateTrainLocation` では、`mod.GetGolmudTrainLocation()` を短い周期で読み、WorldIconの位置と距離表示を更新します。
列車の現在地をゲーム内UIへ出す例として読んでください。

# 移動するCapturePoint

READMEには、CapturePoint側の `ConnectedToGolmudTrain` を有効にすると、列車と一緒に拠点が動く説明があります。
Team 1が拠点を取ると西へ、Team 2が取ると東へ、ニュートラルになると停止する、という制御です。

この仕組みは通常の `MoveObject` とは違います。
列車に紐づくCapturePointは、シーン側の配置、サイズ、向き、ObjIDを合わせて初めて読みやすくなります。

# 注意点

列車は、Portal Web側の設定でMoving Train、2種類のStatic Train、または列車なしを選ぶ前提です。
スクリプトだけ置いても、対象マップや列車設定が合っていなければ期待通りには動きません。

また、列車はコマンドをキューしません。
加速中・減速中に次の命令を送っても素直に積まれるわけではないので、サンプルのように6秒程度の入力抑制を入れてください。

# 結論

`GolmudTrainExample` は、`MP_GolmudRailway` 固有機能を扱うサンプルです。
列車位置を読む、列車へ移動命令を送る、列車停止イベントでHUDを更新する、列車に連動するCapturePointを作る。この4点を押さえれば十分です。

