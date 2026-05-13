---
title: "付録B： サンプルプログラム解説「CustomCQ（カスタムコンクエスト）」"
free: true
---

# CustomCQは何を見るサンプルか

`CustomCQ` は、Conquest相当の大規模テンプレートをPortalで作るためのサンプルです。
単体の小さなAPI確認ではなく、複数マップ、CapturePoint、AreaTrigger、AI、車両、UI、スコアボード、音楽・VOまで含む「完成モード寄り」の教材として読みます。

SDK 1.3.1.0で追加されたフォルダには、テンプレート本体、文字列、アイコン、複数マップ用の `.tscn` と `.spatial.json` が入っています。
丸写しする対象ではなく、大きいモードをどう分割し、どのID帯に何を割り当てるかを見る対象です。

# 含まれる主なファイル

| ファイル | 役割 |
| ---- | ---- |
| `modinfo.json` | サンプル名、説明、読み込むworkspaceと文字列ファイル |
| `custom_conquest_template_V9.5.json` | Portalブロック側のテンプレート本体 |
| `CustomCQ.strings.json` | UI、VO、スコア、設定名などの文字列キー |
| `README.txt` | 導入手順、ObjID割り当て、既知問題、更新履歴 |
| `MP_..._Conquest.tscn` | Godot側のレベルシーン |
| `MP_..._Conquest.spatial.json` | Portal Web Builderへアップロードするマップデータ |

`modinfo.json` の説明にもある通り、既成のレベルを使う場合はインポート後すぐ動くように事前設定されています。
自作レベルを使う場合は、GodotでExportした `.spatial.json` をPortal Web Builder側へ別途アップロードします。

# 追加・同梱されているマップ

`CustomCQ` には、次のようなConquest向けマップデータが含まれています。

| 表示上の呼び方 | Map ID / ファイル例 |
| ---- | ---- |
| Siege of Cairo | `MP_Abbasid_CustomConquest` |
| Empire State | `MP_Aftermath_Conquest` |
| Iberian Offensive | `MP_Battery_CustomConquest` |
| Liberation Peak | `MP_Capstone_Conquest` / Winter版 |
| Contaminated | `MP_Contaminated_Conquest` / Winter版 |
| Manhattan Bridge | `MP_Dumbo_CustomConquest` |
| Operation Firestorm | `MP_FireStorm_Conquest` |
| Golf Course | `MP_Granite_ClubHouse_Portal_CustomConquest` |
| Area 22B | `MP_Granite_MilitaryRnD_Portal_Conquest` |
| Redline Storage | `MP_Granite_MilitaryStorage_Portal_Conquest` |
| Defense Nexus | `MP_Granite_TechCampus_Portal_CustomConquest` |

READMEの更新履歴では、直近でContaminatedとManhattan Bridgeが追加対象として扱われています。
ただし手元SDK全体の `GodotProject/levels` には既に多くのLevelが含まれているため、「SDK全体に新規Levelファイルが増えた」というより、「`CustomCQ` 用に事前構成済みのConquestマップが追加された」と理解する方が正確です。

# ObjID設計

このサンプルで一番重要なのはObjIDの帯設計です。
READMEでは、次のような範囲が決められています。

| ObjID範囲 | 用途 |
| ---- | ---- |
| `200` - `226` | CapturePoint。A拠点を200から始める |
| `600` - `699` | CapturePointごとの車両Spawner帯。A=600-609、B=610-619のように割り当てる |
| `901` / `902` | Team 1 / Team 2 のAI Spawner |
| `998` / `999` | Team Switcher |
| `1100` - `1199` | Team 1 Spawn Protection用AreaTrigger |
| `1200` - `1299` | Team 2 Spawn Protection用AreaTrigger |
| `1300` - `1399` | 全員向けOut of Bounds用AreaTrigger |
| `1400` | Infantry Combat Area用AreaTrigger |
| `700` - `749` | Repel Trigger |
| `750` - `799` | Repel Target |

小さいモードではObjIDを適当に振っても動いてしまいます。
しかし、`CustomCQ` くらいの規模になると、ID帯そのものが仕様です。ここを崩すと、拠点、車両、AI、境界判定が一気に読めなくなります。

# 読み方

最初から `custom_conquest_template_V9.5.json` を全部読む必要はありません。
まずREADMEでID帯を確認し、次に `.tscn` / `.spatial.json` で拠点・AreaTrigger・SpawnerがそのID帯に沿って置かれているかを見ます。
その後で、ブロック側の処理がどのID帯を前提に走っているかを追ってください。

見る順番は次で十分です。

1. `README.txt` でObjID割り当てと既知問題を読む。
2. 使いたいマップの `.tscn` と `.spatial.json` を開き、CapturePointとAreaTriggerのIDを見る。
3. `CustomCQ.strings.json` でUIやVOのキーを確認する。
4. `custom_conquest_template_V9.5.json` は、スコア、拠点、AI、UIの塊ごとに読む。

# 注意点

READMEには、ローカルホスト時のスコアボード、AIの経路探索、車両の扱いなど、既知問題も書かれています。
特にAIは、サーバーホストとローカルホストで挙動が変わる前提で読んでください。

また、車両SpawnerまわりはSDK 1.3.1.0で `EnableRespawn` 表記に変わっています。
古い資料の `DisableRespawn` と混ぜると意味が逆になるので、現行SDKのプロパティ名を優先してください。

# 結論

`CustomCQ` は、APIの小技を見るサンプルではありません。
大規模なPortalモードで、マップ側のObjID、ブロック側の前提、UI文字列、AI、車両、境界判定をどう束ねるかを見るサンプルです。
自作モードへ取り入れるなら、まずID帯設計とマップごとの `.spatial.json` 管理だけ盗めば十分です。全部を一気に理解しようとするのは、さすがに非効率です。
