---
title: "付録B： サンプルプログラム解説「ObliterationExample（BombとM-COM）」"
free: true
---

# ObliterationExampleは何を見るサンプルか

`ObliterationExample` は、BombとM-COMを使ってObliteration系のルールを作るサンプルです。
SDK 1.3.3.0で追加されたBomb型、Bombイベント、M-COM連動APIをまとめて確認できます。

# 含まれる主なファイル

| ファイル | 役割 |
| ---- | ---- |
| `ObliterationExample.ts` | Bomb、M-COM、勝敗処理の本体 |
| `ObliterationExample.tscn` | BombやM-COMに関係する配置例 |
| `ObliterationExample.strings.json` | 通知やHUD用の文字列 |
| `README_ObliterationExample.md` | BombとM-COMの設定説明 |

# BombとM-COMを扱うAPI

このサンプルでは、次のようなAPIとイベントを中心に読みます。

| 名前 | 役割 |
| ---- | ---- |
| `mod.GetBomb(...)` | 番号からBomb参照を取得する |
| `mod.ForceBombSpawn(...)` | Bombを強制的に出現させる |
| `mod.ForceBombDrop(...)` | 所持中のBombを落とす |
| `mod.ForceBombReset(...)` | Bombを初期状態へ戻す |
| `mod.GiveBombToPlayer(...)` | 指定プレイヤーへBombを渡す |
| `mod.SetBombTeam(...)` | Bombの所属チームを設定する |
| `mod.SetMCOMArmType(...)` | M-COMの起爆方式を設定する |
| `OnBombPickedUp(...)` | Bombが拾われたときに呼ばれる |
| `OnBombDropped(...)` | Bombが落とされたときに呼ばれる |
| `OnBombStateChanged(...)` | Bombの状態が変わったときに呼ばれる |

# 処理の流れ

サンプルは、Bombの出現、拾得、ドロップ、リセット、M-COMへの設置をイベントで追います。
プレイヤーがBombを持っているかは、`GetSoldierState(..., mod.SoldierStateBool.HasBomb)` でも確認できます。

M-COM側は `SetMCOMArmType` でBomb起爆に合わせます。
Bombの状態とM-COMの状態を別々に見るのではなく、「Bombを誰が持ち、どのM-COMへ運び、いつ勝敗に結びつけるか」という流れで読むと分かりやすくなります。

# 注意点

Bombは通常のオブジェクト参照より、状態遷移を強く意識する必要があります。
拾った直後、落とした直後、リセット直後で処理を混ぜると、通知や勝敗判定がずれます。

`IsValid` や `IsUndefined` を使い、Bomb参照やプレイヤー参照が有効か確認してから処理してください。

# 結論

`ObliterationExample` は、BombとM-COMを軸にした目標運搬ルールの教材です。
Bombの状態、所持プレイヤー、M-COMの起爆設定、勝敗判定。この4つを分けて読めば、独自の攻防ルールへ展開できます。

