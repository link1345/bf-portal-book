---
title: "付録C： modlib解説　SDKを少し使いやすくする補助ライブラリ"
free: true
---

# modlibとは何か

`modlib` は、BF6 Portal SDKに同梱されているTypeScript用の補助ライブラリです。
場所は `code/modlib/index.ts` です。

Portalの本体APIは `mod` namespaceにあります。
たとえば `mod.DisplayNotificationMessage`、`mod.GetObjId`、`mod.AllPlayers`、`mod.AddUIText` のような関数です。

一方で `modlib` は、`mod` を直接置き換えるものではありません。
`mod` の上に薄く乗って、よく書く処理を短くしたり、Portal特有の扱いづらさを少し隠したりするための「便利関数集」です。

本書では、基本方針として `modlib` を優先して使います。
通知、チーム内プレイヤー取得、Portal配列の変換、条件の一度だけ発火、UI生成など、`modlib` に用意されている処理は先に `modlib` を検討してください。
`modlib` にない機能や、挙動を細かく制御したい処理だけ `mod` を直接使います。

使うときは、スクリプトの先頭で読み込みます。

```ts
import * as modlib from "modlib";
```

そして、次のように呼びます。

```ts
export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.welcome), eventPlayer);
}
```

# modとmodlibの関係

`mod` はPortalの公式API本体です。
ゲーム内のイベント、プレイヤー操作、UI生成、音、車両、目標、座標計算など、実際にPortalへ命令を出す関数は基本的に `mod` にあります。

`modlib` は、その `mod` を使って作られた補助層です。
たとえば次のようなことをします。

| 種類 | modで直接書くと | modlibが助けること |
| --- | --- | --- |
| 通知表示 | 対象あり・なしで関数呼び分けが必要 | `ShowNotificationMessage` でまとめる |
| チーム内プレイヤー取得 | `AllPlayers` を回して `GetTeam` を比較 | `getPlayersInTeam` でまとめる |
| Portal配列処理 | `mod.Array` を `CountOf` / `ValueInArray` で読む | `ConvertArray` でJavaScript配列へ変換 |
| 条件の一度だけ発火 | 状態フラグを自前で持つ | `ConditionState` と `get...Condition` を使う |
| UI生成 | `AddUIText` や `AddUIContainer` の引数が長い | `ParseUI` でJSON風に書ける |

つまり、`modlib` は「Portalの標準APIを、TypeScriptらしく少し扱いやすくする道具箱」です。

# 使う順番の方針

本書のおすすめは、`modlib` を先に使い、必要になったところだけ `mod` を直接使う順番です。

理由は単純です。
`modlib` は、Portal制作でよく出る面倒な処理を短く、安全に書けるようにまとめています。
毎回 `AllPlayers` を走査したり、通知の対象あり・なしを呼び分けたり、UIの長い引数を並べたりするより、まず `modlib` の関数を使ったほうが読みやすくなります。

使い分けは次の通りです。

| 状況 | おすすめ |
| --- | --- |
| 通知、チーム取得、配列変換、条件管理、UI生成をしたい | まず `modlib` を使う |
| 通知表示を何度も書いている | `modlib.ShowNotificationMessage` などを使う |
| `mod.Array` の走査が増えた | `ConvertArray` や `FilteredArray` を使う |
| `Ongoing...` で条件がtrueになった瞬間だけ処理したい | `ConditionState` / `get...Condition` を使う |
| UIを大量に作る | `ParseUI` を検討する |
| `modlib` にないPortal APIを使いたい | `mod` を直接使う |
| 挙動が分からずデバッグしたい | `modlib` の中身を読み、必要なら `mod` 直接呼び出しに戻す |

ただし、`modlib` の中身は `mod` APIを呼ぶTypeScriptコードです。
`modlib` を優先して使う場合でも、詰まったときに `index.ts` を読めるようにしておくと強いです。
関数ごとの詳細は、この付録Cを辞書として参照してください。

# 全体構成

`index.ts` は大きく分けると、次の5つでできています。

| 範囲 | 内容 |
| --- | --- |
| 文字列・条件・配列の補助 | `Concat`、`And`、`ConvertArray`、`FilteredArray` など |
| ObjIdと条件状態 | `getPlayerId`、`ConditionState`、`getPlayerCondition` など |
| チーム補助 | `getPlayersInTeam` |
| JSON風UI生成 | `ParseUI` と内部の `__addUI...` 系 |
| 通知・メッセージ表示 | `ShowNotificationMessage`、`ShowEventGameModeMessage`、`DisplayCustomNotificationMessage` など |

ファイル内には `__asModVector`、`__addUIText` のような `__` から始まる関数もあります。
これらは内部実装用です。
基本的に外から直接呼ぶものではなく、公開されている `export function` を使います。

# 基本文法補助

## Concat

```ts
modlib.Concat("A", "B");
```

2つの文字列を連結します。
Portal API側にも `mod.Concat` がありますが、`modlib.Concat` は普通のTypeScript文字列をそのまま `+` で結合するだけです。

用途は単純です。
文字列を組み立てたいときに使えます。
ただしTypeScriptなら、テンプレート文字列のほうが読みやすい場面も多いです。

```ts
const name = "Alpha";
const label = `Team ${name}`;
```

## And

```ts
if (modlib.And(isReady, hasPlayer, !isLocked)) {
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.ready));
}
```

複数の真偽値を順番に見て、すべて `true` なら `true` を返します。
1つでも `false` があればそこで止まります。

`mod.And` は2引数ですが、`modlib.And` は可変長です。
条件が3つ以上あるときに読みやすくなります。

## AndFn

```ts
if (modlib.AndFn(
  () => canStart(),
  () => mod.CountOf(mod.AllPlayers()) > 0,
  () => !isLocked
)) {
  startGame();
}
```

`AndFn` は、真偽値そのものではなく「真偽値を返す関数」を複数受け取ります。
左から順番に実行し、途中で `false` になったら残りを実行しません。

重い条件や、副作用を避けたい条件を後ろに置くと、無駄な処理を減らせます。

## IfThenElse

```ts
const label = modlib.IfThenElse(
  isAttackTeam,
  () => "攻撃",
  () => "防衛"
);
```

条件が `true` なら `ifTrue()`、`false` なら `ifFalse()` の結果を返します。

`mod.IfThenElse` に似ていますが、`modlib.IfThenElse` は関数を渡す形です。
必要な側だけを評価したいときに使えます。

## Equals

```ts
if (modlib.Equals(mod.GetTeam(player), mod.GetTeam(1))) {
  // Team 1
}
```

内部では `mod.Equals(a, b)` を呼びます。
ただし、どちらかが `null` の場合に `debugger` が入っています。

これは「null比較に気づきやすくする」意図の実装ですが、公開前のコードでは注意してください。
原因調査用には便利ですが、意図せずデバッガ停止を誘発する可能性があります。

# Portal配列を扱う補助

Portal SDKの `mod.Array` は、普通のJavaScript配列ではありません。
`for ... of` や `array.length` ではなく、`mod.CountOf` と `mod.ValueInArray` で読む必要があります。

`modlib` には、この差を埋める関数があります。

## ConvertArray

```ts
const players = modlib.ConvertArray(mod.AllPlayers()) as mod.Player[];
```

`mod.Array` をJavaScript配列へ変換します。

内部では次の流れをしています。

1. `mod.CountOf(array)` で要素数を取得する
2. `mod.ValueInArray(array, i)` で1つずつ読む
3. JavaScript配列へ `push` する

`AllPlayers()` や `GetPlayersOnPoint()` の結果をTypeScriptらしく扱いたいときに便利です。

## FilteredArray

```ts
const team1Players = modlib.FilteredArray(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

`mod.Array` を条件で絞り込み、新しい `mod.Array` として返します。
戻り値がJavaScript配列ではなく `mod.Array` である点に注意してください。

内部では一度 `ConvertArray` でJavaScript配列に変換し、条件に合う要素だけを `mod.AppendToArray` でPortal配列へ戻しています。

## IndexOfFirstTrue

```ts
const index = modlib.IndexOfFirstTrue(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.IsPlayerValid(player);
});
```

条件が最初に `true` になった要素のインデックスを返します。
見つからなければ `-1` です。

「最初の有効プレイヤーを探す」「最初に条件を満たした車両を探す」ような用途に使えます。

## IsTrueForAll

```ts
const allReady = modlib.IsTrueForAll(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return isPlayerReady(player);
});
```

`mod.Array` の全要素が条件を満たすか判定します。
1つでも `false` なら `false` です。

## IsTrueForAny

```ts
const hasAttacker = modlib.IsTrueForAny(mod.AllPlayers(), (element) => {
  const player = element as mod.Player;
  return mod.Equals(mod.GetTeam(player), mod.GetTeam(1));
});
```

`mod.Array` のどれか1つでも条件を満たすか判定します。

## SortedArray

```ts
const sorted = modlib.SortedArray(players, (a, b) => {
  return mod.GetPlayerKills(b) - mod.GetPlayerKills(a);
});
```

JavaScript配列をコピーして、比較関数でソートした新しい配列を返します。
ここで受け取るのは `mod.Array` ではなく `any[]` です。

`ConvertArray` で変換してから使う想定です。

# ObjId取得の補助

## getPlayerId

```ts
const id = modlib.getPlayerId(eventPlayer);
```

内部では `mod.GetObjId(player)` を呼びます。
プレイヤーのObjIdを数値で取得します。

## getTeamId

```ts
const teamId = modlib.getTeamId(mod.GetTeam(eventPlayer));
```

内部では `mod.GetObjId(team)` を呼びます。
Teamを数値IDとして比較したいときに使います。

本文の6b章でも、チーム比較を読みやすくするために使っています。

```ts
const eventTeamId = modlib.getTeamId(eventTeam);
const teamId = modlib.getTeamId(team);
```

# 条件の「立ち上がり」を扱う

Portalでは `Ongoing...` 系イベントが継続的に呼ばれます。
その中で条件がtrueの間ずっと処理を走らせると、同じ通知、同じスコア加算、同じスポーンが何度も実行されます。

そこで `modlib` には「falseからtrueへ変わった瞬間だけ通す」ための状態管理があります。

## ConditionState

```ts
const enoughPlayersState = new modlib.ConditionState();

/**
 * Returns true when there are enough players to start.
 */
function hasEnoughPlayersToStart(): boolean {
  return mod.CountOf(mod.AllPlayers()) >= 2;
}

export function OngoingGlobal(): void {
  if (enoughPlayersState.update(hasEnoughPlayersToStart())) {
    mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.readyPlayers));
  }
}
```

`ConditionState` は、前回の状態を覚える小さなクラスです。

`update(newState)` は次のように動きます。

| 前回 | 今回 | 戻り値 | 意味 |
| --- | --- | --- | --- |
| false | false | false | まだ条件未成立 |
| false | true | true | 条件が成立した瞬間 |
| true | true | false | 成立中だが、もう通さない |
| true | false | false | リセット |

つまり、`true` が続いている間は1回しか通りません。
いったん `false` に戻ると、次の `true` でまた1回通ります。

おすすめは、`update()` の中に長い条件式を直接書かないことです。
`hasEnoughPlayersToStart()`、`isStartInteract()`、`canReachTarget()` のような判定関数へ分けると、「何を待っている状態なのか」が名前で読めます。
Portalに貼るコードのコメントは、マルチバイト文字を避けるため短い英語で書いてください。

## getGlobalCondition

```ts
/**
 * Returns true when the match can start.
 */
function canStartMatch(): boolean {
  return mod.CountOf(mod.AllPlayers()) >= 2;
}

export function OngoingGlobal(): void {
  const condition = modlib.getGlobalCondition(0);

  if (condition.update(canStartMatch())) {
    modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.ready));
  }
}
```

グローバルな条件状態を番号で取得します。
`0`、`1`、`2` のように番号を分けることで、複数の条件を別々に管理できます。

## getPlayerCondition

```ts
/**
 * Returns true when the player needs a warning.
 */
function isLowHealth(player: mod.Player): boolean {
  return mod.GetSoldierState(player, mod.SoldierStateNumber.Health) < 30;
}

export function OngoingPlayer(eventPlayer: mod.Player): void {
  const condition = modlib.getPlayerCondition(eventPlayer, 0);

  if (condition.update(isLowHealth(eventPlayer))) {
    modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.lowHealth), eventPlayer);
  }
}
```

プレイヤーごとに条件状態を持ちます。
同じ条件番号でも、プレイヤーごとに別状態になります。

## getTeamCondition

```ts
const condition = modlib.getTeamCondition(mod.GetTeam(1), 0);
```

チームごとに条件状態を持ちます。
チーム単位の目標達成、スコア到達、人数条件などに使えます。

## オブジェクト別のCondition

次の関数は、各オブジェクトごとに条件状態を持ちます。

| 関数 | 対象 | 使いどころ |
| --- | --- | --- |
| `getCapturePointCondition` | `mod.CapturePoint` | 占領開始、占領完了、人数変化 |
| `getMCOMCondition` | `mod.MCOM` | アーム状態、解除状態、破壊状態 |
| `getVehicleCondition` | `mod.Vehicle` | 搭乗、破壊、速度条件 |
| `getHQCondition` | `mod.HQ` | HQ有効化、所有チーム変更 |
| `getSectorCondition` | `mod.Sector` | セクター進行状態 |
| `getVehicleSpawnerCondition` | `mod.VehicleSpawner` | 車両スポーン可否、クールダウン |

内部では `mod.GetObjId(obj)` を使って、ObjIdごとの状態配列へ振り分けています。

# チーム内プレイヤー取得

## getPlayersInTeam

```ts
const team1Players = modlib.getPlayersInTeam(mod.GetTeam(1));
```

指定チームに所属するプレイヤーをJavaScript配列で返します。

内部の流れは次の通りです。

1. `mod.AllPlayers()` で全プレイヤーを取得
2. `mod.CountOf` と `mod.ValueInArray` で1人ずつ読む
3. `mod.GetTeam(player)` のObjIdと対象チームのObjIdを比較
4. 一致したプレイヤーをJavaScript配列へ入れる

チーム単位の通知、チーム別UI、チーム全員の状態リセットなどで使えます。

```ts
for (const player of modlib.getPlayersInTeam(mod.GetTeam(1))) {
  modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.attackTeam), player);
}
```

# UIをJSON風に作る ParseUI

`ParseUI` は、`AddUIContainer`、`AddUIText`、`AddUIImage`、`AddUIButton` の長い引数を、JSON風のオブジェクトで書けるようにする関数です。

```ts
const root = modlib.ParseUI({
  name: "RootPanel",
  type: "Container",
  position: [40, 40],
  size: [360, 120],
  anchor: mod.UIAnchor.TopLeft,
  bgColor: [0, 0, 0],
  bgAlpha: 0.45,
  children: [
    {
      name: "TimerText",
      type: "Text",
      position: [12, 12],
      size: [320, 40],
      textLabel: mod.Message(mod.stringkeys.timeLeft),
      textSize: 24,
      textColor: [1, 1, 1],
    },
  ],
});
```

## 対応するtype

| type | 内部で呼ぶ関数 | 作るもの |
| --- | --- | --- |
| `Container` | `mod.AddUIContainer` | UIの親枠 |
| `Text` | `mod.AddUIText` | 文字表示 |
| `Image` | `mod.AddUIImage` | 画像表示 |
| `Button` | `mod.AddUIButton` | UIボタン |

`children` を使うと、Containerの下にTextやButtonをぶら下げられます。

## 座標と色は配列でも書ける

`ParseUI` 内部では、`number[]` を `mod.Vector` に変換する `__asModVector` が使われています。

```ts
position: [50, 100]
size: [300, 80]
bgColor: [0.2, 0.2, 0.2]
```

2要素の配列ならZは0扱いです。
3要素ならそのままX/Y/Zになります。

## textLabelとMessageの注意

Textの `textLabel` は、文字列なら内部で `mod.Message(textLabel)` に変換されます。
ただし、プレイヤーの画面に見せる文字は `Strings.json` に事前登録しておくのが基本です。
`textLabel`、通知、WorldIconテキスト、`SetUITextLabel` など、画面に出る文字は `Strings.json` のキーを使うようにしてください。

```ts
textLabel: mod.Message(mod.stringkeys.start)
```

変数を差し込みたい場合は、`Strings.json` 側に `{}` を置き、`mod.Message` の第二引数以降へ値を渡します。

```json
{
  "testName": "test name:{}",
  "defendSeconds": "defend:{}s"
}
```

```ts
textLabel: mod.Message(mod.stringkeys.testName, "player1")
```

この場合、画面には `test name:player1` のように表示されます。
`mod.Message` の追加引数は最大3つまで使えます。

## 表示対象を絞れる

`teamId` または `playerId` を指定すると、UIの表示対象を絞れます。

```ts
modlib.ParseUI({
  name: "OnlyPlayer",
  type: "Text",
  position: [0, 120],
  size: [400, 60],
  anchor: mod.UIAnchor.TopCenter,
  textLabel: mod.Message(mod.stringkeys.onlyYou),
  playerId: eventPlayer,
});
```

この名前は `playerId` ですが、型は `mod.Player` です。
数値IDではありません。

## ParseUIの注意点

`ParseUI` は便利ですが、毎フレーム作り直すものではありません。

UIは生成コストが高くなりやすいので、基本は次の方針にします。

1. ゲーム開始時や参加時に作る
2. `FindUIWidgetWithName` で取得する
3. `SetUITextLabel` や `SetUIWidgetVisible` で更新する
4. 不要になったら `DeleteUIWidget` で消す

特に `Ongoing...` 系で `ParseUI` を呼び続けるのは避けてください。

# 通知・メッセージ表示の補助

## ShowNotificationMessage

```ts
modlib.ShowNotificationMessage(mod.Message(mod.stringkeys.goEntrance), eventPlayer);
```

右上通知を表示します。
対象を省略すると全員に表示し、`Player` を渡すと個別表示になります。

内部では `mod.DisplayNotificationMessage` を呼びます。

## ShowHighlightedGameModeMessage

```ts
modlib.ShowHighlightedGameModeMessage(mod.Message(mod.stringkeys.targetCaptured));
```

ミニマップ上のワールドログへ強調メッセージを表示します。
内部では `mod.DisplayHighlightedWorldLogMessage` を呼びます。

## ShowEventGameModeMessage

```ts
modlib.ShowEventGameModeMessage(mod.Message(mod.stringkeys.roundStart));
```

画面上部に大きめのゲームモードメッセージ風UIを表示します。

`index.ts` 内のコメントを見ると、本来の `DisplayGameModeMessage` が修正されるまでの代替実装として作られています。
内部では `AddUIText` で一時UIを作り、6秒待ってから `DeleteUIWidget` で消します。

つまり、これは純粋なPortal標準メッセージではなく「UIで作った代替表示」です。
短時間の案内には便利ですが、連打すると同名Widgetの衝突や表示上書きが起きやすいので、頻繁に呼ばないようにします。

## DisplayCustomNotificationMessage

```ts
modlib.DisplayCustomNotificationMessage(
  mod.Message(mod.stringkeys.defending),
  mod.CustomNotificationSlots.MessageText1,
  5,
  eventPlayer
);
```

カスタム通知スロット風のUIを表示します。
対象は省略、`Player`、`Team` を指定できます。

`Team` を渡した場合は、`getPlayersInTeam` でチームメンバーを取得し、各プレイヤーへ個別にUIを作ります。

`duration > 0` の場合、指定秒数後に自動で削除されます。
`duration` を0以下にすると自動削除されないため、あとで `ClearCustomNotificationMessage` を呼ぶ設計にします。

## ClearCustomNotificationMessage

```ts
modlib.ClearCustomNotificationMessage(
  mod.CustomNotificationSlots.MessageText1,
  eventPlayer
);
```

指定スロットのカスタム通知UIを削除します。
対象なしなら全プレイヤー、`Player` なら個人、`Team` ならチーム全員から消します。

内部では `FindUIWidgetWithName` と `DeleteUIWidget` を使っています。
削除対象が見つからない場合に備えて `try/catch` で包まれています。

## ClearAllCustomNotificationMessages

```ts
modlib.ClearAllCustomNotificationMessages(eventPlayer);
```

指定プレイヤーのカスタム通知スロットをまとめて消します。
対象は `Player` のみです。

HeaderText、MessageText1、MessageText2、MessageText3、MessageText4 を順番に消します。

# 公開関数一覧

## 基本・条件・配列

| 関数 | 目的 | 戻り値 |
| --- | --- | --- |
| `Concat(s1, s2)` | 文字列を連結する | `string` |
| `And(...rest)` | 複数の真偽値がすべてtrueか判定する | `boolean` |
| `AndFn(...rest)` | 複数の条件関数がすべてtrueか判定する | `boolean` |
| `IfThenElse(condition, ifTrue, ifFalse)` | 条件に応じて片方の関数だけを評価して返す | `T` |
| `Equals(a, b)` | `mod.Equals` で2値を比較する | `boolean` |
| `WaitUntil(delay, cond)` | 指定秒数待つか、途中で条件がtrueになったら抜ける | `Promise<void>` |
| `ConvertArray(array)` | `mod.Array` をJavaScript配列へ変換する | `any[]` |
| `FilteredArray(array, cond)` | `mod.Array` を条件で絞り込む | `mod.Array` |
| `IndexOfFirstTrue(array, cond, arg)` | 最初に条件を満たす要素番号を返す | `number` |
| `IsTrueForAll(array, condition, arg)` | 全要素が条件を満たすか判定する | `boolean` |
| `IsTrueForAny(array, condition, arg)` | どれか1要素が条件を満たすか判定する | `boolean` |
| `SortedArray(array, compare)` | JavaScript配列をソートしたコピーを返す | `any[]` |

## ObjId・条件状態

| 関数・クラス | 目的 |
| --- | --- |
| `getPlayerId(player)` | PlayerのObjIdを取得する |
| `getTeamId(team)` | TeamのObjIdを取得する |
| `ConditionState` | falseからtrueへ変わった瞬間だけ通す状態クラス |
| `getGlobalCondition(n)` | グローバル条件状態を取得する |
| `getPlayerCondition(obj, n)` | Player別の条件状態を取得する |
| `getTeamCondition(team, n)` | Team別の条件状態を取得する |
| `getCapturePointCondition(obj, n)` | CapturePoint別の条件状態を取得する |
| `getMCOMCondition(obj, n)` | MCOM別の条件状態を取得する |
| `getVehicleCondition(obj, n)` | Vehicle別の条件状態を取得する |
| `getHQCondition(obj, n)` | HQ別の条件状態を取得する |
| `getSectorCondition(obj, n)` | Sector別の条件状態を取得する |
| `getVehicleSpawnerCondition(obj, n)` | VehicleSpawner別の条件状態を取得する |

## チーム・UI・通知

| 関数 | 目的 |
| --- | --- |
| `getPlayersInTeam(teamObj)` | 指定Teamに所属するプレイヤー配列を返す |
| `ParseUI(...params)` | JSON風パラメータからUI Widgetを作成する |
| `DisplayCustomNotificationMessage(msg, custom, duration, target)` | カスタム通知UIを表示する |
| `ShowEventGameModeMessage(event, target)` | ゲームモードメッセージ風UIを表示する |
| `ShowHighlightedGameModeMessage(event, target)` | 強調ワールドログメッセージを表示する |
| `ShowNotificationMessage(msg, target)` | 右上通知を表示する |
| `ClearAllCustomNotificationMessages(target)` | 指定プレイヤーの全カスタム通知を消す |
| `ClearCustomNotificationMessage(custom, target)` | 指定カスタム通知スロットを消す |

# 実務での注意点

## 基本はmodlibを優先し、必要なところだけmodを使う

本書では、実装時に `modlib` を優先して使う方針にします。
`ShowNotificationMessage`、`getTeamId`、`ConvertArray`、`ConditionState`、`ParseUI` のように、`modlib` に用意されているものは先に使ってください。

そのうえで、`modlib` にない機能や、`mod` の細かい引数を直接制御したい処理だけ `mod` を使います。
うまく動かないときは、`modlib` の中でどの `mod` 関数を呼んでいるか確認してください。
たとえば `ShowNotificationMessage` の挙動がおかしいときは、最終的に `mod.DisplayNotificationMessage` がどう呼ばれているかを見ます。

## Ongoingで重い処理をしない

`ConvertArray(mod.AllPlayers())`、`getPlayersInTeam`、`ParseUI` は便利ですが、毎フレーム呼ぶと重くなります。

特に避けたい例です。

```ts
export function OngoingGlobal(): void {
  modlib.ParseUI({ name: "Debug", type: "Text", textLabel: mod.Message(mod.stringkeys.debug) });
}
```

UIは一度作り、表示内容だけ更新します。

## WaitUntilは万能タイマーではない

`WaitUntil` には、SDK側コメントとして「長く待ちすぎる可能性がある」という趣旨のメモがあります。
内部では0.2秒ごとに条件を確認します。

厳密なタイミングが必要な処理では、専用の状態管理やイベントを優先してください。

## Condition番号を台帳化する

`getGlobalCondition(0)` や `getPlayerCondition(player, 2)` の番号は、増えると意味が分からなくなります。

定数化しておくと安全です。

```ts
const CONDITION_READY = 0;
const CONDITION_LOW_HEALTH = 1;

const readyState = modlib.getGlobalCondition(CONDITION_READY);
```

ObjId台帳と同じように、Condition番号も台帳化してください。

## UI名は衝突させない

`ParseUI` や通知系は、`FindUIWidgetWithName` と `DeleteUIWidget` を使います。
同じ名前のUIを複数作ると、意図しないWidgetを取得・削除する可能性があります。

プレイヤー別UIなら、名前にObjIdを含めると事故が減ります。

```ts
const name = `Timer_${mod.GetObjId(eventPlayer)}`;
```

# 最初に覚えるならこの5つ

全部を一度に覚える必要はありません。
最初は次の5つだけで十分です。

| 関数 | 理由 |
| --- | --- |
| `ShowNotificationMessage` | 右上通知を短く書ける |
| `getTeamId` | チーム比較が読みやすくなる |
| `ConvertArray` | `mod.Array` を普通の配列として扱える |
| `ConditionState` / `getGlobalCondition` | 多重発火を防げる |
| `ParseUI` | 複雑なUIをまとめて作れる |

# まとめ

`modlib` は、BF6 Portal SDKを楽に使うための補助ライブラリです。

ただし、魔法のライブラリではありません。
中身は `mod` APIを呼ぶTypeScriptコードです。
だからこそ、困ったときは `index.ts` を読めば仕組みを追えます。

本書では、まず `modlib` を優先して使い、必要なところだけ `mod` を直接使う、という順番をおすすめします。
詳しい使い方に迷ったら、この付録Cの関数一覧と注意点へ戻ってください。
