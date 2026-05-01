---
title: "第9.5章　AIに状況とログを渡してPortalコードを作る"
free: true
---

# 0　AIに状況とログを渡してPortalコードを作る

> ―― 人間は「何をしたいか」と「何が起きたか」を渡し、AIにコードと原因調査を任せる

TypeScriptでPortalのスクリプトを書くとき、プログラムそのものを書く作業はAIにかなり任せられます。
特に、関数名を調べる、型に合わせる、ログを増やす、原因を絞り込む、といった作業はAIが得意です。

その代わり、人間が渡すべき情報があります。

* 何をしたいのか。
* どのマップ、どのオブジェクト、どのタイミングの話なのか。
* 実機では何が起きたのか。
* ログには何が出ているのか。

ここが雑だと、AIはそれっぽいコードを出せても、Portalの現場に合わない修正をしがちです。
逆に、現象とログをきちんと渡せば、AIはかなり頼れる相棒になります。

この章では、BF6 Portal TypeScript MCPを使えるAI環境を例にしつつ、Codexに限らず、ほかのAIでも使える「コーディング会話の進め方」をまとめます。

:::message alert
AIにコードを書かせても、実機確認は省略できません。
Portalのイベント発火タイミング、兵士座標の確定タイミング、マップごとの `RuntimeSpawn_...` の違いは、最後はゲーム画面と `PortalLog.txt` で確認します。
:::

# 1　AIとの役割分担

AIに任せやすいことと、人間が見るべきことを分けます。

| 役割 | 担当 | 内容 |
| ---- | ---- | ---- |
| 目的を決める | 人間 | 「プレイヤーの目の前にAppleを出したい」など |
| 条件を伝える | 人間 | マップ名、使いたいオブジェクト名、発火タイミング |
| コードを書く | AI | TypeScriptの実装、Portal APIの呼び出し、ログ追加 |
| SDKを調べる | AI | MCPや型定義を使って関数名、型、enum候補を確認 |
| 実機で試す | 人間 | Portalへ登録してゲーム内で動作確認 |
| ログを読む | AIと人間 | `PortalLog.txt` を渡して原因を絞る |
| 修正する | AI | ログから仮説を立ててコードを直す |

人間が最初から全部のAPIを暗記する必要はありません。
ただし、「何を起こしたいのか」と「実際に何が起きたのか」は、人間が見てAIへ渡す必要があります。

プログラムはAIに書かせて構いません。しかし、AIに渡す状況説明まで雑にすると、ヘッポコな迷走が始まります。そこだけは横着しない方が安いです。

# 2　BF6 Portal TypeScript MCPとは

BF6 Portal TypeScript MCPは、AI開発環境からPortal SDKの型情報を調べられるようにするMCPサーバーです。

リポジトリはこちらです。

https://github.com/link1345/bf6-portal-typescript-mcp

AIに「分からないPortal APIはMCPで調べてから書いてください」と伝えると、`index.d.ts` を人間が毎回検索しなくても、AI側がSDKの情報を見ながらコードを書けます。

MCPは、AIに渡す辞書のようなものです。ただし、MCPだけで実機の挙動までは分かりません。ゲーム内でどうなったか、ログに何が出たかは、人間がAIに渡します。

# 3　Codex AppでMCPサーバーを設定する

ここはCodex Appを使う場合の設定例です。ほかのAI開発環境を使う場合は、その環境のMCP設定方法に読み替えてください。

まずCodex Appの左下メニューから設定を開きます。

![Codex Appの設定を開く](/images/bf_portal_doc/d-codex-1.png)

設定画面を開いたら、左メニューの「MCP サーバー」を選び、「サーバーを追加する」を押します。

![Codex AppのMCPサーバー設定](/images/bf_portal_doc/d-codex-2.png)

カスタムMCPの設定画面では、次のように入力します。

| 項目 | 入力例 |
| ---- | ---- |
| 名前 | `bf6-portal-typescript-mcp` |
| 種類 | `STDIO` |
| 起動用コマンド | `npx` |
| 引数1 | `bf6-portal-typescript-mcp@latest` |
| 引数2 | `mcp` |
| 引数3 | `--sdk_path` |
| 引数4 | `/path/to/bf6-portal-sdk` |

![Codex AppのMCPサーバー設定方法](/images/bf_portal_doc/d-codex-3.png)

`/path/to/bf6-portal-sdk` は、自分のPortal SDKの場所に置き換えてください。
目安として、その中に `code/types/mod/index.d.ts` が見える場所を指定します。

設定後、Codexのツール一覧で `bf6_portal_typescript_mcp` が使える状態になっていれば準備完了です。

# 4　最初にAIへ渡す依頼文

最初の依頼では、作りたい現象を具体的に書きます。コードの細部はAIに任せて構いませんが、目的、条件、使える道具は渡します。

```text
スポーンしたプレイヤーの目の前に、「Apple_01」オブジェクトをスポーンさせるBF6 PortalのTypeScriptプログラムを書いてください。
なお、bf6_portal_typescript_mcpサーバーが使えるので、Portalで分からないことがあれば、そのMCPサーバーを使って調べてください。
```

この依頼で渡している情報は、次の3つです。

* やりたいこと：スポーンしたプレイヤーの目の前にオブジェクトを出す。
* 使いたいもの：`Apple_01`。
* 調べ方：Portal APIで不明点があればMCPを使う。

さらに分かっているなら、マップ名も最初から入れます。

```text
マップはミラクバレーです。
Apple_01のRuntimeSpawn候補がマップごとに違う場合は、MCPで確認してから選んでください。
```

AIにコードを書かせるときは、「コードを書いてください」だけでなく、「分からないPortal APIは調べてください」まで言うのがコツです。

# 5　一発で完成しなくても失敗ではない

AIが最初に出したコードでAppleが見えないことがあります。これは、AIが完全に間違っている場合もありますが、Portal側の読み込みや実機タイミングの情報が足りないだけの場合もあります。

ここで大事なのは、「見えません」だけで終わらせないことです。AIに次の確認用コードを入れさせます。

* `OnGameModeStarted` に `console.log` を入れる。
* 画面右上に通知を出す。
* `OnPlayerDeployed` に `console.log` を入れる。
* スポーン座標をログに出す。

たとえば、`OnGameModeStarted` には次のような確認を入れます。

```ts
export function OnGameModeStarted(): void {
    console.log("AppleInFront: OnGameModeStarted");
    mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
    mod.DisplayNotificationMessage(mod.Message("AppleInFront loaded"));
}
```

画面右上に `AppleInFront loaded` が出れば、そのコードはPortalで読み込まれています。
出ないなら、Appleの座標以前に、登録している `Script.ts` やビルド後の `dist/Script.ts` を疑います。

# 6　ログをAIに渡して解決を仰ぐ

Portalのログは、次のような場所に出ます。

```text
%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt
```

動かなかったときは、このログをAIへ渡します。感想だけではなく、ログの実物を渡すのが重要です。

悪い渡し方です。

```text
Appleが表示されません。直してください。
```

これでは、読み込み失敗なのか、イベント未発火なのか、座標ミスなのか、Prefab違いなのかが分かりません。

良い渡し方です。

```text
Appleが表示されません。
`%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` には、次のログしかありません。

[UTC 2026-04-30 23:38:28] Mod started

Portalでコードが読み込まれているか、イベントが発火しているかを確認できるように修正してください。
必要ならbf6_portal_typescript_mcpでPortal APIを調べてください。
```

この情報があれば、AIは「まずコードが読み込まれているか確認するべき」と判断できます。

# 7　状態と現象を一緒に渡す

次のように、コードは読み込まれているがAppleが見えない場合もあります。

```text
ミラクバレーなので、Tungstenであっているはずです。
で、ログは次の通りでした。
個人的には、ログの「0, -0.3499999940395355, 2」が気になります。
これ、グローバル座標ではない気がします。

[UTC 2026-04-30 23:47:31] Mod started
[UTC 2026-04-30 23:47:48] QuickJS: console.log: AppleInFront: OnGameModeStarted
[UTC 2026-04-30 23:47:48] QuickJS: console.log: AppleInFront: OnPlayerDeployed
[UTC 2026-04-30 23:47:48] QuickJS: console.log: Apple spawn position: 0, -0.3499999940395355, 2
```

この渡し方はかなり良いです。
AIは次のように状況を分けて考えられます。

* `OnGameModeStarted` は動いている。
* `OnPlayerDeployed` も動いている。
* `Apple spawn position` は出ている。
* しかし座標が原点付近に見える。
* 出撃直後で兵士座標や向きがまだ確定していない可能性がある。

この場合、AIには次のような修正を任せます。

* `OnPlayerDeployed` を `async` にする。
* `await mod.Wait(...)` で少し待ってから兵士状態を読む。
* `EyePosition` ではなく `GetPosition` を基準にする。
* `Player position`、`Player eye position`、`Player facing direction`、`Apple spawn position` をログに出す。
* 待ち時間を変えやすい定数にする。

人間が原因を完全に言い当てる必要はありません。「この値が怪しい」「グローバル座標ではなさそう」といった観察を渡すだけでも、AIは調査の方向を立てやすくなります。

# 8　完成例：プレイヤーの目の前にAppleを出す

ミラクバレーで `Apple_01` を出す場合、完成形は次のようになります。出撃から3秒待ってからプレイヤーの位置と向きを読み、前方2mに少し大きめのAppleをスポーンします。

```ts
const APPLE_DISTANCE_METERS = 2.0;
const APPLE_VERTICAL_OFFSET_METERS = 0.2;
const APPLE_SCALE = mod.CreateVector(3, 3, 3);
const APPLE_ROTATION = mod.CreateVector(0, 0, 0);
const SOLDIER_STATE_DELAY_SECONDS = 3.0;

function getAppleSpawnPosition(player: mod.Player): mod.Vector {
    const playerPosition = mod.GetSoldierState(player, mod.SoldierStateVector.GetPosition);
    const facingDirection = mod.Normalize(mod.GetSoldierState(player, mod.SoldierStateVector.GetFacingDirection));

    return mod.Add(
        mod.Add(playerPosition, mod.Multiply(facingDirection, APPLE_DISTANCE_METERS)),
        mod.CreateVector(0, APPLE_VERTICAL_OFFSET_METERS, 0)
    );
}

function logVector(label: string, vector: mod.Vector): void {
    console.log(`${label}: ${mod.XComponentOf(vector)}, ${mod.YComponentOf(vector)}, ${mod.ZComponentOf(vector)}`);
}

export function OnGameModeStarted(): void {
    console.log("AppleInFront: OnGameModeStarted");
    mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
    mod.DisplayNotificationMessage(mod.Message("AppleInFront loaded"));
}

export async function OnPlayerDeployed(eventPlayer: mod.Player): Promise<void> {
    console.log("AppleInFront: OnPlayerDeployed");

    await mod.Wait(SOLDIER_STATE_DELAY_SECONDS);

    logVector("Player position", mod.GetSoldierState(eventPlayer, mod.SoldierStateVector.GetPosition));
    logVector("Player eye position", mod.GetSoldierState(eventPlayer, mod.SoldierStateVector.EyePosition));
    logVector("Player facing direction", mod.GetSoldierState(eventPlayer, mod.SoldierStateVector.GetFacingDirection));

    const spawnPosition = getAppleSpawnPosition(eventPlayer);
    logVector("Apple spawn position", spawnPosition);

    mod.SpawnObject(
        mod.RuntimeSpawn_Tungsten.Apple_01,
        spawnPosition,
        APPLE_ROTATION,
        APPLE_SCALE
    );

    mod.DisplayNotificationMessage(mod.Message("Apple spawned"), eventPlayer);
}
```

成功すると、出撃したプレイヤーの前にAppleが表示されます。

![完成したAppleスポーンの画面](/images/bf_portal_doc/d-codex-4.png)

# 9　AIへ渡す情報テンプレート

PortalのコードをAIに直してもらうときは、次の形で渡すと話が早くなります。

```text
やりたいこと:
スポーンしたプレイヤーの目の前にApple_01を出したい。

環境:
マップはミラクバレー。
bf6_portal_typescript_mcpが使えるので、Portal APIで不明点があれば調べてください。

現在の状態:
コードはPortalに登録済み。
ゲーム内ではAppleが見えない。

ログ:
`%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` の内容は次の通りです。

...

気になっている点:
スポーン座標が `0, -0.3499999940395355, 2` になっていて、グローバル座標ではなさそうです。

お願い:
原因を切り分けるためのログ追加と、必要なコード修正をしてください。
```

この形なら、Codexでも、ほかのAIでも使えます。AIに渡すべきなのは、完璧な推理ではありません。目的、状態、ログ、気になる点です。

# 10　この進め方の注意点

* AIにコードを書かせる前提でよい。
* 人間は「目的」と「現象」と「ログ」を渡す。
* ログは `%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` から取る。
* MCPが使える環境では、Portal APIの不明点をAIに調べさせる。
* MCPが使えないAIでも、ログと現象を渡す会話の形は同じ。
* 動かなければ、読み込み、イベント発火、座標、Prefabの順に切り分ける。
* 実機で見えた結果が最終判定。AIの説明だけで完成扱いにしない。

# 結論

* PortalのTypeScriptコードは、AIにかなり任せられる。
* 人間の仕事は、何をしたいのか、何が起きたのか、ログに何が出たのかを渡すこと。
* BF6 Portal TypeScript MCPは、AIにPortal SDKを調べさせるための辞書として使える。
* Codex Appの設定はMCPを使う一例であり、コーディング会話の基本はほかのAIでも同じ。
* 目的、状態、ログ、気になる点を渡せば、AIとの修正ループはかなり速くなる。
