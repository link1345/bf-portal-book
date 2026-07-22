---
title: "付録B： サンプルプログラム解説「PhysicsImpulseExample（物理インパルス）」"
free: true
---

# PhysicsImpulseExampleは何を見るサンプルか

`PhysicsImpulseExample` は、車両へ物理的な衝撃を与えるサンプルです。SDK 1.3.3.0では `PhysicsImpulse_Gym` というフォルダ名でしたが、SDK 1.4.1.0で現在の名前へ変更されました。
SDK 1.3.3.0で追加された `ApplyImpulse` と `ApplyAreaImpulseAndDamage` の使い分けを確認できます。

# 含まれる主なファイル

| ファイル | 役割 |
| ---- | ---- |
| `PhysicsImpulseExample.ts` | 衝撃付与、範囲判定、デバッグ表示の本体 |
| `PhysicsImpulseExample.tscn` | 試験用の車両、ボタン、位置の配置例 |
| `README_PhysicsImpulse.ts` | 物理インパルスAPIの説明 |
| `tsconfig.json` | サンプルのTypeScript設定 |

# 物理インパルスのAPI

| 名前 | 役割 |
| ---- | ---- |
| `mod.ApplyImpulse(...)` | 指定した1台の車両へ、位置・方向・強さを指定して衝撃を与える |
| `mod.ApplyAreaImpulseAndDamage(...)` | 指定範囲内の車両へ衝撃を与え、必要ならダメージも加える |

`ApplyImpulse` は、対象車両が決まっているときに使います。
`ApplyAreaImpulseAndDamage` は、爆発、押し出し、範囲ギミックのように、中心点と半径でまとめて処理したいときに使います。

# 処理の流れ

サンプルは、ボタンや入力をきっかけに車両へ衝撃を加えます。
単体の車両を押す処理と、範囲内の車両をまとめて吹き飛ばす処理を比べると、引数の考え方が見えます。

方向は `CreateVector` や `DirectionTowards` と組み合わせて決めます。
強さは小さく始め、車両が跳ねすぎない範囲で調整してください。

# 注意点

範囲インパルスは便利ですが、半径を大きくしすぎると多くの車両へ一度に処理が走ります。
頻繁なOngoing処理で連打すると負荷とゲーム体験の両方が荒れます。

デバッグ中は、範囲、強さ、ダメージ量を定数にして、少しずつ上げてください。

# 結論

`PhysicsImpulseExample` は、車両を押す、飛ばす、範囲で反応させる処理の教材です。
対象が1台なら `ApplyImpulse`、範囲内まとめてなら `ApplyAreaImpulseAndDamage`。この切り分けだけでも、車両ギミックの設計がかなり楽になります。
