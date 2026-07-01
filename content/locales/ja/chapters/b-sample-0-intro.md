---
title: "付録B：はじめに　公式サンプルの読み方"
free: true
---

# 0　公式サンプルは、順番を決めて読む

SDKには公式サンプルが入っています。いきなり大きなサンプルを読むと、UI、AI、車両、状態管理が一気に出てきて混乱します。

まずは、次の順番で読んでください。

1. `docs/pages`
2. `code/types/mod/index.d.ts`
3. `GodotProject/mods/_StartHere_BasicTemplate`
4. 目的別サンプル

この順番なら、公式ドキュメントで概念をつかみ、型定義でAPI名を確認し、最小テンプレートでイベントの形を見てから、実戦サンプルへ進めます。

# 1　SDKフォルダの歩き方

| 場所 | 何を見るか | 読み方 |
| ---- | ---- | ---- |
| `docs/pages/getting_started.html` | Godot起動、Portal Setup、レベルを開く手順 | 環境構築の確認 |
| `docs/pages/spatial_editor.html` | Spatial Editorの操作、Object Library、Export | 4章の補足 |
| `docs/pages/gameplay_logic.html` | TypeScript、ログ、UI、AI、Spawn、ObjId参照 | 6章の補足 |
| `docs/pages/tips_tricks.html` | パフォーマンス注意点 | 8章・9章の補足 |
| `code/types/mod/index.d.ts` | `mod` namespaceの全API | 関数名を検索して使い方を確認 |
| `GodotProject/mods` | 公式サンプル | 目的別に読む |

分からないAPIが出たら、まず `index.d.ts` で関数名を検索します。PortalのTypeScriptは、最終的に `mod` namespaceの関数を呼ぶ形になるため、ここが辞書です。

# 2　最初に読む公式サンプル

| サンプル | 先に読む理由 |
| ---- | ---- |
| `_StartHere_BasicTemplate` | イベント関数、`GetObjId`、`Message`、`CreateVector` など基本形がまとまっている |
| `PortalGadgetExample` | Portal Gadgetの入力イベント、RayCast、プレイヤー個別の反応を見られる |
| `FixedCameraExample` | カメラ切替とUIボタンイベントの基本を確認できる |
| `VL7Example` | 特殊オブジェクトの侵入・退出イベントを確認できる |
| `BumperCars` | 小規模ゲームループ、車両、状態管理の例として読む |
| `GibraltarGrandprix` | レース、チェックポイント、順位UI、車両選択の例として読む |
| `AcePursuit` | 航空機レース、時間制限、状態管理の例として読む |
| `HybridExample` | PortalブロックからTypeScript関数を呼び、戻り値を変数やUIに渡す例として読む |
| `NightModeExample` | 夜間スクリーン効果、NVG付与、SFX切替、VFX色変更の例として読む |
| `GolmudTrainExample` | Railway to Golmudの列車制御、列車位置取得、移動する拠点の例として読む |
| `MovingPlatformExample` | `MoveObjectOverTime` と `OrbitObjectOverTime` による動く足場の例として読む |
| `ObliterationExample` | Bomb、M-COM、爆弾イベントを組み合わせるObliteration系ルールの例として読む |
| `PhysicsImpulse_Gym` | 車両へ衝撃を与える `ApplyImpulse` と `ApplyAreaImpulseAndDamage` の例として読む |
| `PortalPerformanceExample` | Portalロジックとサーバー処理の平均フレーム時間を確認する例として読む |
| `CustomCQ` | Conquest相当の大規模テンプレート、ObjId設計、複数マップ対応の例として読む |

初心者は `_StartHere_BasicTemplate` からで十分です。複雑なサンプルは、動く完成品としては魅力的ですが、初手で読む教材としては情報量が多すぎます。

# 3　サンプルを読むときのメモ表

| 見る項目 | メモする内容 |
| ---- | ---- |
| 入口イベント | `OnGameModeStarted`、`OnPlayerDeployed`、`OnPlayerInteract` など |
| 状態管理 | `phase`、`GameState`、`PlayerProfile` など |
| ObjId参照 | `GetInteractPoint(500)` のような取得箇所 |
| UI | 作成、更新、削除がどこにあるか |
| 待機処理 | `mod.Wait` の周期と目的 |
| 多重発火対策 | `isProcessing...`、クールダウン、フラグ |

この表を埋めるだけで、サンプルの全体像が見えます。コードを全部読むより、構造を先に読め。えらそうに聞こえるだろうが、これは本当に効きます。

# 4　公式サンプルから取り入れたい書き方

公式サンプルをいくつか読むと、細部は違っても似た作法が見えてきます。
これは単なる好みではなく、大きくなったコードを読みやすく、直しやすく、後から拡張しやすくするための形です。

なお、`unsupported` 配下に移されたサンプルには、便利そうに見える書き方も混ざっています。
ただし本書では、現在 `GodotProject/mods` にあるサポート対象サンプルから読み取れる作法だけを採用します。

## 1. 設定値は先頭に集める

参加人数、制限時間、デバッグフラグ、車両候補、チェックポイント定義、UI名などは、ファイルの上の方にまとめて置きます。

途中の処理に直接 `10`、`500`、`true` のような値を書き散らすと、あとで調整するときに検索地獄になります。
先頭に集めておけば、「このモードを調整するときに見る場所」が決まります。

```ts
const MIN_PLAYERS = 2;
const COUNTDOWN_SECONDS = 10;
const DEBUG = false;
const VEHICLE_POOL = [mod.VehicleList.Quadbike, mod.VehicleList.GolfCart];
```

第7章の `ids.ts` や `config.ts` も、この考え方の延長です。
数字や設定値を名前に変えるだけで、コードはかなり読みやすくなります。

## 2. 大きくなったらクラスで役割を分ける

`BumperCars`、`GibraltarGrandprix`、`AcePursuit`、`CustomCQ` のような大きいサンプルでは、状態管理、プレイヤー管理、UI管理がクラスやまとまったルール群に分かれています。

これは、Portalのコードを何でもクラスにしろ、という意味ではありません。
最初は関数だけで十分です。ただ、プレイヤーごとの状態やUIが増えてきたら、責務ごとにクラスへ分けると読みやすくなります。

| 役割 | 例 |
| ---- | ---- |
| ゲーム全体 | `GameState`、開始条件、勝者判定、終了処理 |
| プレイヤーごと | `PlayerProfile`、Ready状態、車両、スコア、個別UI |
| レース全体 | `TrackData`、チェックポイント、ラップ、勝者 |
| UI | 作成、更新、閉じる、削除 |

クラス化で大切なのは、「名前を付けた箱」を増やすことではなく、同じ理由で変わる処理を同じ場所に置くことです。
たとえば、プレイヤーのReady状態を変える処理、Ready表示を更新する処理、離脱時にUIを閉じる処理が散らばっていると、あとで必ず追いづらくなります。

## 3. UIは作成、更新、閉じるを分ける

UIは、特にクラス化の効果が出やすい場所です。
大きいサンプルでは、Widgetを作る処理、表示内容を更新する処理、非表示・削除する処理が分かれています。

この形にすると、「表示内容を変えたい」「閉じ忘れを直したい」「プレイヤーごとに表示を変えたい」ときに、触る場所が分かりやすくなります。

```ts
class ReadyUpUI {
  constructor(private player: mod.Player) {}

  update(): void {
    // Update text and visibility.
  }

  close(): void {
    // Hide or delete widgets.
  }
}
```

最初は大げさに見えますが、UIが増えるほど効きます。
「作る」「更新する」「閉じる」を分けるだけで、後から演出や状態を足しやすくなります。

# 結論

公式サンプルは、読む順番を間違えなければ強い教材です。

まず `docs/pages` と `index.d.ts` を辞書にし、`_StartHere_BasicTemplate` でイベントの形を覚えます。その後で `GodotProject/mods` 配下の目的別サンプルを読んでください。SDK 1.3.2.0では `NightModeExample` と `GolmudTrainExample`、SDK 1.3.3.0では `MovingPlatformExample`、`ObliterationExample`、`PhysicsImpulse_Gym`、`PortalPerformanceExample` も確認対象に加わりました。夜間演出、列車制御、動く足場、Bomb/M-COM、物理インパルス、性能計測という読みどころが増えています。
そして、サンプルの中身を丸写しするのではなく、設定値の集約、クラスによる責務分離、UI管理の作法を自分のコードへ取り入れてください。本書の付録Bでも、このフォルダにあるサンプルだけを扱います。

---

📘 **次章「付録B：サンプルプログラム解説『_StartHere_BasicTemplate』」** では、最初に読むべき基本テンプレートを解説します。
