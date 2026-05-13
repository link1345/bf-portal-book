---
title: "第3章　「Portalカスタム」のための環境構築"
free: true
---

> ―― 作るためには、開発環境を用意しよう。

本章では、ここから先の章に入るために必要なツールを用意します。
これらを行わないと、絶対に「Portalカスタム」の開発を行うことはできませんので、注意してください。

# BF公式SDKをダウンロード

https://portal.battlefield.com/

上記URLにアクセスするとBattlefield 2042かBattlefield 6かを聞かれるので、Battlefield 6を選択し「START CREATING」をクリックします。

![start](/images/bf_portal_doc/3-setup-init-0.png)

トップに「SDKをダウンロード」ボタンがあるので、クリックしSDKのzipファイルをダウンロードします。

![download](/images/bf_portal_doc/3-setup-init-1.png)

なお、この流れでログインが必要と言われたら、EAアカウントでログインしてください。

また、ダウンロードが終わったらzipを解凍してください。解凍方法は、ダウンロードしたファイルに右クリックすると「すべて展開...」という欄があるので、それをクリックするとzipを解凍できます。

# マップエディタの準備

マップエディタはダウンロードしたSDKのzipファイルを解凍してあれば直ぐに使えます。

公式SDKの手順では、Godot側で次の準備を行います。

1. SDKに含まれているGodot実行ファイルを起動する。
2. 「Project Selection」画面が開いたら、SDK内の `GodotProject` フォルダをドラッグして読み込む。手動で行う場合は「Import」から `GodotProject` を選ぶ。
3. Battlefield 6 Portal Projectを開く。初回起動は数分かかることがあります。
4. Godot右側の `BFPortal` タブにある `Portal Setup` を押し、セットアップ完了を待つ。
5. `Scene` メニューから `Open Scene` を選び、`levels` ディレクトリ内の編集したいレベルを開く。

レベルの地形が見当たらない場合は、カメラ位置より上に配置されていることがあります。まず上方向を見て、地形が読み込まれているか確認してください。

## マップエディタの基本操作

公式SDK docsでは、Spatial Editorの基本操作として次の操作を押さえます。

| 操作 | 内容 |
| ---- | ---- |
| Object Libraryからドラッグ | 使いたいオブジェクトを3D SceneまたはScene Outlinerへ配置する |
| 選択中に `W` | Move mode。配置したオブジェクトを移動する |
| 選択中に `E` | Rotate mode。配置したオブジェクトを回転する |
| 選択中に `R` | Scale mode。配置したオブジェクトをスケールする |

3Dビューの視点移動はGodot標準操作なので、マウス操作やWASD移動で位置を確認します。
配置したオブジェクトを触るときは、まず選択し、`W` / `E` / `R` で移動・回転・スケールを切り替えると覚えると迷いにくいです。

スケールは基本的に均一スケールにしてください。
X/Y/Zを別々に伸ばす非均一スケールは公式にサポートされていないため、ゲーム内での見た目や当たり判定が崩れる原因になります。

# TypeScriptの準備

本書では、ビジュアルエディタやブロック式のビジュアルプログラミングは詳しく扱いません。
ここから先は、TypeScript SDKとテンプレートリポジトリを使って開発するための準備を行います。

## 1. githubアカウントを作成

https://github.com/

githubにアクセスして、自分のアカウントを作成してください。

## 2. リポジトリ(プロジェクト)を作成

https://github.com/link1345/Battlefield6-SampleTemplate

上記のページすると、「use this template」というボタンが下記の画像のようにあるのでクリックし、その中の「Create a new repository」をクリックします。

![use this template](/images/bf_portal_doc/3-setup-1.png)


そうすると、「Create a new repository」というページが開くので、下記の画像のように、指示に従って記入します。
「Repository name」は、プロジェクトの名前です。用途に合った名前にしてください。
「Description」は、プロジェクトの説明です。何も書かなくても良いです。
「Choose visibility」はプロジェクトを「非公開」「公開」から選択できます。誰にも公開する予定がない場合は、privateで良いでしょう。

![Create a new repository](/images/bf_portal_doc/3-setup-1.png)

正常にリポジトリ(プロジェクト)が作成できたら、下記の画像のように表示されます。

![リポジトリ](/images/bf_portal_doc/3-setup-3.png)

## 3. ソースコードを触れるようにする

ソースコードを早速触りたいですが、今回は簡単に環境を作りたいので「Codespaces」を利用したいと思います。

:::message alert

今回、簡単に環境構築するために **Codespaces** を利用しています。

PortalのTypeScript登録仕様上、何GBも使うような大規模なプログラミングにはならないので、無料枠で十分問題ないと思います。
もし、 **ローカル環境で行う場合は** 、自分のパソコンにVSCodeをインストールし、リポジトリからgitでCloneして…という感じで、 **色々な作業が入ります。**

[テンプレートとしている「link1345/Battlefield6-SampleTemplate」](https://github.com/link1345/Battlefield6-SampleTemplate) のREADME.md(英語)やREADME-JP.md(日本語)に説明文がありますので、そちらをご確認ください。

:::

自分が建てたリポジトリのページにアクセスして、「Code」という緑のボタンを押すと、LocalとCodespacesという選択肢が出てきます。
今回は、「Codespaces」をクリックし、「Create codespace on main」ボタンを押します。

![codespaces top](/images/bf_portal_doc/3-setup-5.png)


少しすると、新しいブラウザのタブにVSCodeが開いて、下記の画像のように案内が出てきます。

![vscode top](/images/bf_portal_doc/3-setup-6.png)

下の方に「ターミナル」というタブがあるのでクリックし、「ターミナル」タブに切り替え「 `npm install` 」と入力してください。
特に `Error` という文言が出てなければ、問題ありません。

![vscode top](/images/bf_portal_doc/3-setup-7.png)

次に、VSCodeのエクスプローラーを見て `code` フォルダに、最初にBF公式からSDKをダウンロードし解凍した `code` フォルダの中身を入れます。
下記の図のように、入っていれば問題ありません。

![sdk setup](/images/bf_portal_doc/3-setup-8.png)

## 4. テンプレートで何が楽になるのか

本書では、TypeScript開発に [link1345/Battlefield6-SampleTemplate](https://github.com/link1345/Battlefield6-SampleTemplate) を使います。

Portal Web BuilderのScript欄に直接コードを書いても動きますが、少し大きくなると次の問題が出ます。

* 1ファイルが長くなり、どこに何を書いたか分からなくなる。
* ちょっとした文法ミスに、ゲームを起動するまで気づけない。
* 同じ処理をテストし直すたびに、手作業が増える。
* Portal Web BuilderのScript欄は最終的に1つのTypeScriptファイルを受け取るため、ファイル分割したコードを手でまとめる必要がある。

このテンプレートを使うと、次の作業が簡単になります。

| コマンド | できること |
| ---- | ---- |
| `npm run lint` | ESLintで文法や書き方をチェックする |
| `npm run lint:fix` | ESLintで直せるものを自動修正する |
| `npm run build` | `mods` 配下の複数 `.ts` ファイルを `dist/Script.ts` にまとめる |
| `npm run test` | Vitestでテストを実行する |

GitHubにpushしたときも、テンプレートに含まれるGitHub Actionsが `npm run lint` を実行します。つまり、公開前に「そもそもコードとして怪しい」ものを早めに止められます。

## 5. テンプレートのフォルダ構成

最初に見る場所は、次の4つです。

| 場所 | 役割 |
| ---- | ---- |
| `mods/` | 自分が書くTypeScriptコード置き場 |
| `code/` | Battlefield 6 SDKの `code` フォルダを入れる場所 |
| `dist/Script.ts` | `npm run build` で生成される、Portalに登録するTypeScript |
| `dist/Strings.json` | Portalに登録する文字列定義 |
| `test/` | Vitestのテスト置き場 |

開発中は `mods` に複数ファイルで書きます。完成したら `npm run build` を実行し、生成された `dist/Script.ts` と `dist/Strings.json` をPortal Web BuilderのScript欄に登録します。

:::message alert

READMEでは文字列ファイルを `String.json` と表記している箇所がありますが、テンプレート内の実ファイルは `dist/Strings.json` です。本書では `dist/Strings.json` と書きます。

:::

以上で、TypeScriptでPortalのスクリプトを作るための手順は終了です。

# SDKフォルダの歩き方

SDKは大きいので、最初から全部を読む必要はありません。まずは次の順番で見てください。

| 見る場所 | 何が分かるか |
| ---- | ---- |
| `docs/pages/getting_started.html` | Godot起動、`GodotProject` のImport、`Portal Setup` の流れ |
| `docs/pages/spatial_editor.html` | マップ編集、Object Library、`.spatial.json` のExport |
| `docs/pages/gameplay_logic.html` | TypeScript、Custom UI、AI、ObjId参照、ログ確認 |
| `docs/pages/tips_tricks.html` | 車両数、Player走査、UI Widget管理などの負荷対策 |
| `code/types/mod/index.d.ts` | Portal TypeScript APIの関数・型一覧 |
| `GodotProject/mods/_StartHere_BasicTemplate` | 最初に読む公式TypeScriptテンプレート |

ローカルSDKにある `sdk.version.json` では、基準SDKは `1.3.1.0` です。SDKは更新で内容が変わるため、本書の手順と画面が違う場合は、まず `sdk.version.json` と `docs/pages` を確認してください。

# 結論

「Portalカスタム」を使ったゲームを作るための環境を用意しました。
これで、この後に続く章において、円滑にプログラムに起こしゲームを作ることが出来ます。

---

📘 **次章「マップエディタ実務ガイド（配置と紐づけ）」** では、用意した環境を使って **「何を置けるか」「どこに置くか」「どうIDを付けるか」** を実務で進めます。Sharedは試し置き→警告マーク確認、IDは-1禁止＆台帳化。この二つを合言葉に、次のステップへ。
