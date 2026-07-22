---
title: "付録B： サンプルプログラム解説「CustomBT（カスタムブレイクスルー）」"
free: true
---

# CustomBTは何を見るサンプルか

`CustomBT` は、攻撃側がセクターを順番に制圧し、防衛側がチケットを削り切るBreakthrough相当の大規模テンプレートです。SDK 1.4.1.0にはVersion 2.0として追加されています。

単一APIの見本ではありません。Sector、CapturePoint、AreaTrigger、HQ、車両、AI、UI、VO、SFX、VFX、空域、チーム切替をひとつのモードへ束ねる方法を読むサンプルです。

# 含まれる主なファイル

| ファイル | 役割 |
| ---- | ---- |
| `modinfo.json` | workspace、文字列、`base_skel`、ゲームモード、5つの構成済みマップ |
| `custom_breakthrough_V2.0.blocks.json` | Portalブロック側のテンプレート本体 |
| `custom_breakthrough_skel.json` | Web Builderへ読み込むベース構成 |
| `CustomBT.strings.json` | UI、VO、設定名などの文字列 |
| `README.txt` | 導入手順、ObjID割り当て、AIの選択、既知問題、更新履歴 |
| `MP_..._Breakthrough.tscn` | Godot側の構成済みシーン |
| `MP_..._Breakthrough.spatial.json` | Portal Web Builderへアップロードするマップデータ |

Experienceをコピーしたときにマップやブロックが付かない場合に備え、SDKにはexport済みマップJSONとブロックJSONの両方が入っています。

# 構成済みの5マップ

| Level | ファイルstem |
| ---- | ---- |
| Manhattan Bridge (`MP_Dumbo`) | `MP_Dumbo_Breakthrough` |
| Golf Course (`MP_Granite_ClubHouse_Portal`) | `MP_Granite_ClubHouse_Breakthrough` |
| Downtown (`MP_Granite_MainStreet_Portal`) | `MP_Granite_MainStreet_Portal_Breakthrough` |
| Marina (`MP_Granite_Marina_Portal`) | `MP_Granite_Marina_Breakthrough` |
| Defense Nexus (`MP_Granite_TechCampus_Portal`) | `MP_Granite_TechCampus_Portal_CustomBreakthrough` |

READMEのVersion 2.0更新履歴では、Manhattanをビーチ上陸付きの新レイアウトとして扱っています。これらはSDK全体へ新しいLevel IDを追加したものではなく、既存LevelをCustom Breakthroughですぐ試せるように事前構成したデータです。

# ObjID設計

| ObjID | 用途 |
| ---- | ---- |
| `100` - `104` | Sector 0から最終Sector |
| `600` - `604` | 各SectorのAreaTrigger |
| `1100` / `1200` / `1300` 帯 | Sector 1 / 2 / 3のObjectiveと車両・固定兵器 |
| `301` - `303` / `401` - `403` | 各SectorのTeam 1 / Team 2 HQ |
| `998` / `999` | Team Switcher |
| `2000` - `2999` | 自動有効化するVFX |
| `8000` | 空戦を有効にするAirspace用AreaTrigger |

番号は単なる整理ではなく、ブロック側ロジックとの契約です。自作マップへ移植するときは、先に同じID帯で配置物を設計してからテンプレートを接続してください。

# AIとVersion 2.0の読みどころ

Premiumマップでは既定のbackfill/static AI、RedSecマップでは全Objectiveを進行できるCustom AIが推奨されています。Custom AIは空き枠を最大100人まで補う設計ですが、ローカルホストで増やしすぎると重くなるため、READMEは60程度を目安にしています。

Version 2.0では、空戦ロジック、Team Switcher、固定兵器、プレイヤー固有UI ID、占領UI、VO、雪・カラーフィルター、VFX自動有効化が追加されています。Season 2向けの再設計では、ダウン・蘇生時の占領判定、無効Objective、Out of Bounds、CapturePoint進捗、Custom AI、デフォルトAIの出撃時期も見直されています。

# 注意点

READMEには、高所でダメージや投擲物が正しく動かないSector、ローカルホストでのチーム変更時のスコアボード、spawn menuに出ない車両、RedSecでの既定AI、ゲーム開始時にしか描画されないVFXが既知問題として記載されています。

まず `README.txt` でID帯とAI方式を選び、次に使うマップの `.tscn` / `.spatial.json`、最後にブロックJSONのSector進行とUIを追ってください。最初から巨大なブロックJSONを読み始めるのではなく、この順番で構造を確認すると効率的です。
