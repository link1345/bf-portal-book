---
title: "付録B： サンプルプログラム解説「NightModeExample（夜間演出とNVG）」"
free: true
---

# NightModeExampleは何を見るサンプルか

`NightModeExample` は、マップ上のエリアに入ったプレイヤーへ夜間演出を切り替えるサンプルです。
`ScreenEffects.Night`、NVG装備、SFX、VFXをまとめて扱うので、「見た目と装備をイベントで切り替える」流れを読む教材として使います。

# 含まれる主なファイル

| ファイル | 役割 |
| ---- | ---- |
| `NightModeExample.ts` | 夜間切替、NVG付与、SFX再生、VFX更新の本体 |
| `NightModeExample.tscn` | AreaTrigger、VFX、SFXなどを置いたSpatial Editorシーン |
| `tsconfig.json` | TypeScript用設定 |

# 処理の流れ

このサンプルでは、`OnGameModeStarted` でSFXとVFXを初期化し、`OngoingGlobal` でVFX位置と色を継続更新します。
プレイヤーがAreaTriggerに入ると、`OnPlayerEnterAreaTrigger` で夜間モードを切り替えます。

主に見る場所は次です。

1. `mod.GetSFX(200)` / `mod.GetSFX(201)` で昼夜の音を参照する。
2. `mod.GetVFX(100)` を有効化し、速度・スケール・色を変える。
3. `mod.EnableScreenEffect(player, mod.ScreenEffects.Night, ...)` で画面効果を切り替える。
4. `mod.AddEquipment(player, mod.Gadgets.Mask_NVG)` と `mod.RemoveEquipment(...)` でNVGを付け外しする。

# 読みどころ

`OnPlayerDeployed` では、夜間モード中に出撃したプレイヤーへNVGを付与し直しています。
イベントで状態を切り替えるだけでなく、「途中参加・再出撃したプレイヤーにも同じ状態を再適用する」発想が重要です。

また、このサンプルの夜間状態はグローバルな `nightModeEnabled` で管理されています。
プレイヤーごとに違う夜間状態を持たせたい場合は、この形をそのまま使わず、プレイヤー別の状態管理に分けてください。

# 注意点

AreaTriggerのObjID、VFXのObjID、SFXのObjIDがコード内の数字と一致していないと動きません。
読むときは `100`、`101`、`200`、`201` が `.tscn` 側のどのオブジェクトに対応しているかを先に確認してください。

# 結論

`NightModeExample` は、派手な演出サンプルに見えますが、本質は「状態変更をプレイヤー・画面効果・音・VFXへまとめて反映する」練習です。
夜戦、毒ガス、警報エリア、特殊フィールドのような演出を作るときに応用できます。

