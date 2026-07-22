---
title: "第8.5章　Checkpoint Rushを公開直前まで作る"
free: true
---

第8章までで、配置、ID、ルール設計、TypeScript、UI、SFX、FXの考え方をひと通り見てきました。
ただし、章ごとに分けて学んだ内容は、そのままだと「実際に作るとき、どの順番で手を動かすのか」が見えにくくなります。

本章では、これまでの最小ループを **Checkpoint Rush** という小さなモードとしてまとめます。
新しい仕組みを増やすのではなく、第4章から第8章で作った部品を、公開直前までの制作順に並べ直します。

# 0　この章で作るもの

Checkpoint Rushは、次の流れだけを持つ小さな体験です。

1. ロビー中央の開始ボタンを押す。
2. 入口側のWorldIconを消し、目的地側のWorldIconを表示する。
3. 目的地のAreaTriggerに入る。
4. 10秒防衛する。
5. 成功メッセージ、SFX、FXを一度だけ出す。

この章の完成条件は、公開ボタンを押すことではありません。
次の5つがそろい、Portal Web Builderへ登録する直前まで確認できた状態を完成とします。

| 完成条件 | 見ること |
| ---- | ---- |
| 配置ID | Godot側で必要なObjIdが入り、台帳に残っている |
| コード | `mods` 配下でID、設定、表示、進行、イベントが分かれている |
| 文字列 | 画面表示文が `Strings.json` に入り、コードへ直書きされていない |
| テスト | `lint`、`test`、`build` の順で通す |
| 登録前チェック | `dist/Script.ts` と `dist/Strings.json` を登録対象として確認する |

> この章は「総集編」ではありません。手を動かす順番を固定するための実践編です。

# 1　先に設計を1枚にまとめる

最初に、作るモードを短く言えるようにします。

| 項目 | 内容 |
| ---- | ---- |
| モード名 | Checkpoint Rush |
| 目的 | 中央端末を押し、目印に沿って目的地へ進み、10秒防衛する |
| 推奨人数 | 8〜16人 |
| 所要時間 | 10〜15分 |
| 最初の行動 | ロビー中央の端末を押す |

次に、Godot側で置くものとTypeScript側で呼ぶものを同じ表にします。

| 用途 | ObjId | Godotオブジェクト | TypeScript取得関数 | 初期状態 |
| ---- | ---- | ---- | ---- | ---- |
| 開始ボタン | 500 | InteractPoint | `mod.GetInteractPoint(500)` | 有効 |
| 入口案内 | 21 | WorldIcon | `mod.GetWorldIcon(21)` | 表示 |
| 目的地案内 | 22 | WorldIcon | `mod.GetWorldIcon(22)` | 非表示 |
| 目的地判定 | 11 | AreaTrigger | `mod.GetAreaTrigger(11)` | 有効 |
| 成功FX | 901 | FX / VFX | `mod.GetVFX(901)` | 非表示 |
| 成功SFX | 951 | SFX | `mod.PlaySound(951, 1)` | 未再生 |

この表がないまま作り始めると、あとで「500は何だっけ」「21と22はどちらが入口だっけ」と迷います。
第4章の台帳を、ここではそのまま制作チェックリストとして使います。

# 2　Godot側で置くもの

Godot側では、細かい装飾よりも先に、ゲーム進行に必要なものだけを置きます。

1. ロビー中央に `InteractPoint` を置き、ObjIdを `500` にする。
2. 入口側に `WorldIcon` を置き、ObjIdを `21` にする。
3. 目的地の少し手前に `WorldIcon` を置き、ObjIdを `22` にする。
4. 目的地に `AreaTrigger` を置き、ObjIdを `11` にする。
5. 目的地に成功用のFXとSFXを置き、ObjIdを `901` / `951` にする。

配置手順そのものは第4章の実務フローを使ってください。
この章で大事なのは、配置したあとに必ず台帳の「テスト結果」を更新することです。

| 用途 | ObjId | テスト前 | テスト後 |
| ---- | ---- | ---- | ---- |
| 開始ボタン | 500 | 未確認 | 押せたらOK |
| 入口案内 | 21 | 未確認 | 最初に見えたらOK |
| 目的地案内 | 22 | 未確認 | 開始後に見えたらOK |
| 目的地判定 | 11 | 未確認 | 入った瞬間に反応したらOK |
| 成功FX/SFX | 901 / 951 | 未確認 | 一度だけ出たらOK |

`AreaTrigger` は高さ不足で失敗しやすいです。
プレイヤーがジャンプしたり、斜面から入ったりしても判定に入る厚みにしてください。

# 3　TypeScript側の最小構成

コードは、最初から巨大な `Script.ts` にしない方が楽です。
第7章の考え方どおり、次の5つに分けます。

| ファイル | 役割 | ここに置くもの |
| ---- | ---- | ---- |
| `ids.ts` | ObjId | 500、21、22、11、901、951 |
| `config.ts` | 調整値 | 防衛秒、メッセージ表示秒、SFXクールダウン |
| `ui.ts` | 見せ方 | メッセージ、WorldIcon切替、成功演出 |
| `game.ts` | 進行状態 | 開始済み、到達済み、防衛中、単一通行 |
| `Script.ts` | イベント入口 | `OnGameModeStarted`、`OnPlayerInteract`、`OnPlayerEnterAreaTrigger` |

`ids.ts` は数字を名前に変えるだけです。

```ts
export const IP_START = 500;
export const ICON_ENTRANCE = 21;
export const ICON_TARGET = 22;
export const AREA_TARGET = 11;
export const FX_GOAL = 901;
export const SFX_GOAL = 951;
```

`config.ts` はあとで調整する数字を集めます。

```ts
export const DEFEND_SECONDS = 10;
export const MESSAGE_SECONDS = 2;
export const SFX_COOLDOWN_SECONDS = 2;
```

`Strings.json` には、画面に出す文だけを置きます。
コードへ日本語やマルチバイト文字を直書きしないでください。

```json
{
  "start": "Go to the checkpoint.",
  "defend": "Defend for {} seconds.",
  "success": "Checkpoint secured."
}
```

`Script.ts` では、イベントの入口だけを読みやすく保ちます。

:::message alert
次のコードは、サンプルプログラムの一部抜粋です。これだけでは実際に動作しません。
`import`、`ids.ts` / `config.ts` / `ui.ts` / `game.ts` の実装、`modlib.ConditionState`、SFXクールダウン、ログ出力などは省略しています。
:::

```ts
export function OnGameModeStarted(): void {
  game.reset();
  ui.guide(undefined, ICON_ENTRANCE);
}

export function OnPlayerInteract(player: mod.Player, interactPoint: mod.InteractPoint): void {
  const objectId = mod.GetObjId(interactPoint);

  if (game.startGate.update(game.canStart(objectId))) {
    game.markStarted();
    mod.EnableInteractPoint(interactPoint, false);
    ui.say(mod.Message(mod.stringkeys.start));
    ui.guide(ICON_ENTRANCE, ICON_TARGET);
  }
}

export async function OnPlayerEnterAreaTrigger(player: mod.Player, area: mod.AreaTrigger): Promise<void> {
  const objectId = mod.GetObjId(area);

  if (game.targetGate.update(game.canReachTarget(objectId))) {
    game.markDefending();
    ui.say(mod.Message(mod.stringkeys.defend, DEFEND_SECONDS));
    await mod.Wait(DEFEND_SECONDS);
    game.markReached();
    ui.guide(ICON_TARGET, undefined);
    ui.celebrate(FX_GOAL, SFX_GOAL);
    ui.say(mod.Message(mod.stringkeys.success));
  }
}
```

このコードは、各ファイルの役割を示すための核だけを抜き出したサンプルです。
このまま `Script.ts` に貼り付けても、必要な `import` や補助関数が足りないため動作しません。
実際のテンプレートへ入れるときは、第6章と第7章の形に合わせて `import`、`modlib.ConditionState`、SFXクールダウン、ログ出力を足してください。

# 4　動作を段階確認する

確認は、一気に最後まで見ようとしない方が早いです。
Checkpoint Rushでは、次の3段階で見ます。

## 4.1 押したらWorldIconが切り替わる

見ることは2つだけです。

* 開始時に `WorldIcon 21` が見えている。
* `InteractPoint 500` を押すと、`21` が消えて `22` が見える。

ここで失敗するなら、FXや防衛秒を見る必要はありません。
ObjId、初期表示、`OnPlayerInteract` の判定を直します。

## 4.2 AreaTriggerでFX/SFXが一度だけ出る

次に、目的地へ入ります。

* `AreaTrigger 11` に入った瞬間だけ反応する。
* `SFX 951` が何度も連打されない。
* `FX 901` が成功演出として出る。
* 必要ならループFXは退出時に止める。

ここで失敗するなら、`AreaTrigger` の高さ、ObjId、`ConditionState` の通し方を見ます。

## 4.3 10秒防衛とログを確認する

最後に、防衛カウントとログを見ます。

```text
checkpoint:start
checkpoint:defend
checkpoint:success
```

`PortalLog.txt` にこの順番で出れば、イベントの流れは読めます。
同じ行が何度も出る場合は、多重発火を止められていません。
`startGate`、`targetGate`、`game.started`、`game.reached` のどれで止めるかを確認してください。

# 5　登録前チェック

Portal Web Builderへ登録する前に、手元で次の順に通します。

| 順番 | コマンド | 見ること |
| ---- | ---- | ---- |
| 1 | `npm run lint` | 文法や書き方が怪しくない |
| 2 | `npm run test` | IDや小さな条件関数が壊れていない |
| 3 | `npm run build` | `dist/Script.ts` と `dist/Strings.json` が生成される |

登録するのは、開発中の `mods/Script.ts` ではありません。
Portal Web Builderへ渡すのは、ビルド後の **`dist/Script.ts`** と **`dist/Strings.json`** です。

第9章へ進む前に、最低限これだけ確認してください。

| 確認 | 合格ライン |
| ---- | ---- |
| 1人テスト | 開始、移動、防衛、成功まで通る |
| 2人テスト | 片方が押しても両方が次にやることを理解できる |
| 再デプロイ | 死亡後や再出撃後にWorldIconとUIが破綻しない |
| 途中参加 | 途中から入った人が迷わない |
| ログ | 想定外の連打やエラーが出ていない |

この表が埋まれば、次は公開と運営の話に進めます。

# 6　この章で足さないもの

Checkpoint Rushを大きくしすぎると、通し章の役目がぼやけます。
この章では、次の話題は扱いません。

* 大規模集客、サムネ、告知、運営ログ：第9章で扱う。
* 公式サンプルの詳しい読み解き：付録Bで扱う。
* modlibの関数一覧や細かい使い方：付録Cで扱う。

ここで作るのは、派手な完成品ではなく、壊れにくい最小プロジェクトです。
まずは小さく通し、ログを見て、登録前チェックを通す。
そのあとで第9章の公開・ホスティング・運営へ進んでください。

# 結論

* Checkpoint Rushは、第4〜8章の部品を制作順に並べた小さな実践プロジェクトです。
* 先に設計表とObjId台帳を作ると、Godot側とTypeScript側の対応が崩れません。
* `ids.ts`、`config.ts`、`ui.ts`、`game.ts`、`Script.ts` に分けると、公開前の修正が怖くなりません。
* `lint`、`test`、`build`、1人/2人/再デプロイ/途中参加チェックまで終われば、第9章の公開準備へ進めます。

---

📘 **次章「公開・ホスティング・運営」** では、この小さなモードを人に遊んでもらえる状態へ持っていくため、説明文、サムネ、テスト会、更新手順を整理します。
