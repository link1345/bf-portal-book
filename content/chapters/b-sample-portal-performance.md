---
title: "付録B： サンプルプログラム解説「PortalPerformanceExample（性能計測）」"
free: true
---

# PortalPerformanceExampleは何を見るサンプルか

`PortalPerformanceExample` は、Portalロジックとサーバー側ゲーム処理の平均フレーム時間を確認するサンプルです。
SDK 1.3.3.0で追加されたPerformance系APIを、デバッグ用HUDやログに出す流れを確認できます。

# 含まれる主なファイル

| ファイル | 役割 |
| ---- | ---- |
| `PortalPerformanceExample.ts` | 平均フレーム時間の取得と表示処理 |
| `PortalPerformanceExample.tscn` | 性能確認用の配置例 |
| `PortalPerformanceExample.strings.json` | HUDや通知用の文字列 |
| `README_PortalPerformanceExample.md` | 数値の読み方と注意点 |

# 性能計測API

| 名前 | 役割 |
| ---- | ---- |
| `mod.GetPortalAverageFrameTime()` | Portalロジックの平均フレーム時間を取得する |
| `mod.GetServerAverageFrameTime()` | サーバー側ゲーム処理の平均フレーム時間を取得する |

どちらも直近の履歴平均を見るための値です。
毎フレームの瞬間値ではないので、処理を1回足した直後に必ず数字が跳ねる、という読み方はしません。

# 処理の流れ

サンプルは、一定間隔で平均フレーム時間を読み、UIや通知に出します。
重い処理を入れる前後で数値を見ると、Portalロジック側が重いのか、サーバー側ゲーム処理が重いのかを切り分けやすくなります。

特に `OngoingGlobal`、`OngoingPlayer`、大量の `AllPlayers()` / `AllVehicles()`、大量Spawnを試すときに使います。

# 注意点

性能計測そのものを毎フレーム重く回すと、本末転倒です。
表示更新は1秒ごと、数秒ごとなどに間引いてください。

数字は原因の候補を探すための入口です。
値が悪いときは、直前に増やしたOngoing、配列ループ、Spawn、UI作成を順番に疑います。

# 結論

`PortalPerformanceExample` は、重いPortalモードを作らないための計測サンプルです。
平均フレーム時間を見ながら、Ongoing処理を間引く、UIを作り直さない、まとめてSpawnしすぎない。この判断を早めにできるようになります。

