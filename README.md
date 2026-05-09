# BF Portal Book

Zenn記法のMarkdownをReact/Next.jsで表示する静的Web書籍サイトです。

## Questions / Support

If you have questions or feedback, feel free to contact me on the PlumRice Discord server 😄
(ご質問やご意見がありましたら、PlumRiceのDiscordサーバーでお気軽にご連絡ください)

Please use the appropriate thread/channel for discussions related to this project.
(このプロジェクトに関する議論は、適切なスレッド／チャンネルをご利用ください。)

https://discord.gg/Zy65k8AxH2

## Commands

依存関係はbunで管理します。

```bash
bun install
bun run dev
bun run lint
bun run build
```

`bun run build` を実行すると `out/` に静的サイトが出力されます。

## Writing

章は `content/chapters/*.md` に置きます。各ファイルには以下のfrontmatterを付けます。

```md
---
title: "章タイトル"
description: "章の説明"
order: 1
---
```

Markdown本文は `zenn-markdown-html` でHTMLへ変換され、`.znc` で包んで表示されます。
