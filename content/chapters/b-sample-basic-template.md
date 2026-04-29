---
title: "付録B： サンプルプログラム解説「_StartHere_BasicTemplate（最初に読む基本形）」"
free: true
---

# ゲーム概要

`_StartHere_BasicTemplate` は、Portal TypeScriptの入口をまとめた最小テンプレートです。

完成したゲームモードというより、 **どんなイベント関数があり、どのAPIをどう呼ぶのかを確認するための見本** です。最初に読むべきサンプルはこれです。

# 主な内容

* `OnPlayerJoinGame`、`OnPlayerLeaveGame`、`OnPlayerDeployed` など、プレイヤー関連イベント。
* `OnPlayerInteract`、`OnPlayerEnterAreaTrigger`、`OnPlayerExitAreaTrigger` など、Godot配置物と連動するイベント。
* `OnGameModeStarted`、`OngoingGlobal` など、ゲームモード全体の入口。
* `GetObjId`、`GetTeam`、`Message`、`CreateVector`、`Wait` などの基本API。

# 読む順番

## 1. イベント関数を見る

`export function On...` の形で書かれている関数は、Portal側から呼ばれる入口です。

まずは、どんなタイミングで呼ばれるのかをコメントから確認してください。ここが分かると、「どこに処理を書けばいいのか」が分かります。

## 2. Godot配置物とのつながりを見る

`OnPlayerInteract` や `OnPlayerEnterAreaTrigger` は、Godotで配置した `InteractPoint` や `AreaTrigger` とつながります。

押されたもの、入ったエリアがどれなのかは、`mod.GetObjId(...)` で確認します。第4章のObjId台帳と必ずセットで見てください。

## 3. よく使うAPIを見る

`OnGameModeStarted` の中には、最初に覚えたいAPIがまとまっています。

| API | 使い道 |
| ---- | ---- |
| `mod.EnableHQ` | HQを有効化・無効化する |
| `mod.EnableGameModeObjective` | 目標を有効化・無効化する |
| `mod.GetObjId` | 配置物やプレイヤーのIDを確認する |
| `mod.CreateVector` | 座標や色などの3要素を作る |
| `mod.Message` | 表示用メッセージを作る |
| `mod.DisplayNotificationMessage` | 通知メッセージを出す |
| `mod.Wait` | 指定秒数だけ待つ |
| `mod.Teleport` | プレイヤーを移動させる |
| `mod.GetSoldierState` | プレイヤーの状態を取得する |

# 小技

このテンプレートは「全部をそのまま使う」ものではありません。必要なイベント関数だけを自分の `mods/Script.ts` に移し、ObjIdやメッセージを自分のモードに合わせます。

最初は、`OnGameModeStarted` と `OnPlayerInteract` だけを使って、開始ボタンを押す練習から始めると安全です。

# 結論

`_StartHere_BasicTemplate` は、Portal TypeScriptの辞書のようなサンプルです。

ゲームを作る前に、イベント関数、ObjId参照、メッセージ、座標、待機処理の形だけをここで確認してください。これを読んでから他のサンプルに進むと、急に見通しが良くなります。
