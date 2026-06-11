---
title: "第 3 章「Portal Custom」的環境建構"
free: true
---

> 為了開始製作，先準備開發環境。

本章會準備進入後續章節所需的工具。
如果不完成這些步驟，就無法開發「Portal Custom」，請務必注意。

# 下載 BF 官方 SDK

https://portal.battlefield.com/

造訪上面的 URL 後，會詢問你選擇 Battlefield 2042 還是 Battlefield 6。請選擇 Battlefield 6，然後點擊「START CREATING」。

![start](/images/bf_portal_doc/3-setup-init-0.png)

頁面頂部有「Download SDK」按鈕，點擊它下載 SDK 的 zip 檔案。

![download](/images/bf_portal_doc/3-setup-init-1.png)

如果過程中提示需要登入，請使用 EA 帳戶登入。

下載完成後，請解壓縮 zip 檔案。解壓縮的方法是右鍵點擊下載好的檔案，選擇「全部解壓縮...」，即可解壓縮 zip 檔案。

# 準備地圖編輯器

只要把下載好的 SDK zip 檔案解壓縮，地圖編輯器就可以馬上使用。

按照官方 SDK 的步驟，需要在 Godot 側進行以下準備。

1. 啟動 SDK 中包含的 Godot 執行檔。
2. 開啟「Project Selection」畫面後，把 SDK 內的 `GodotProject` 資料夾拖進去讀取。如果手動操作，則從「Import」中選擇 `GodotProject`。
3. 開啟 Battlefield 6 Portal Project。首次啟動可能需要幾分鐘。
4. 點擊 Godot 右側 `BFPortal` 分頁中的 `Portal Setup`，等待設定完成。
5. 從 `Scene` 選單選擇 `Open Scene`，開啟 `levels` 目錄中想要編輯的關卡。

如果找不到關卡地形，它可能位於相機位置的上方。請先向上看，確認地形是否已經讀取。

## 地圖編輯器的基本操作

官方 SDK docs 中，將以下操作作為 Spatial Editor 的基本操作。

| 操作 | 內容 |
| ---- | ---- |
| 從 Object Library 拖曳 | 將想使用的物件放置到 3D Scene 或 Scene Outliner 中 |
| 選取時按 `W` | Move mode。移動已放置的物件 |
| 選取時按 `E` | Rotate mode。旋轉已放置的物件 |
| 選取時按 `R` | Scale mode。縮放已放置的物件 |

3D 視圖中的視角移動是 Godot 的標準操作，可以透過滑鼠操作或 WASD 移動來確認位置。
操作已放置物件時，請記住先選取物件，再用 `W` / `E` / `R` 切換移動、旋轉、縮放。這樣比較不容易迷路。

縮放原則上請使用統一縮放。
分別拉伸 X/Y/Z 的非統一縮放並未得到官方支援，可能會導致遊戲中的外觀或碰撞判定出問題。

# 準備 TypeScript

本書不會詳細講解視覺化編輯器或區塊式視覺化程式設計。
從這裡開始，我們會準備使用 TypeScript SDK 和範本儲存庫進行開發。

## 1. 建立 GitHub 帳戶

https://github.com/

造訪 GitHub，建立自己的帳戶。

## 2. 建立儲存庫（專案）

https://github.com/link1345/Battlefield6-SampleTemplate

開啟上面的頁面後，可以看到下圖中的「Use this template」按鈕。點擊它，然後點擊其中的「Create a new repository」。

![use this template](/images/bf_portal_doc/3-setup-1.png)


隨後會開啟「Create a new repository」頁面。請按照下圖的指示填寫。
「Repository name」是專案名稱。請使用符合用途的名稱。
「Description」是專案說明，可以不填寫。
「Choose visibility」可以選擇專案是「private」還是「public」。如果沒有公開給他人的計畫，選擇 private 即可。

![Create a new repository](/images/bf_portal_doc/3-setup-1.png)

儲存庫（專案）正常建立後，會顯示成下圖這樣。

![儲存庫](/images/bf_portal_doc/3-setup-3.png)

## 3. 讓原始碼可以編輯

雖然現在就想開始改原始碼，但這次為了簡單建構環境，我們會使用「Codespaces」。

:::message alert

這次為了簡化環境建構，使用 **Codespaces**。

由於 Portal 的 TypeScript 註冊規格限制，這不會變成需要佔用好幾 GB 的大型程式，所以免費額度應該足夠使用。
如果要在 **本機環境** 中進行，就需要在自己的電腦上安裝 VSCode，從儲存庫用 git Clone，並完成各種準備工作。

作為範本使用的 [link1345/Battlefield6-SampleTemplate](https://github.com/link1345/Battlefield6-SampleTemplate) 中，README.md（英文）和 README-JP.md（日文）都有說明，請根據需要查看。

:::

造訪自己建立的儲存庫頁面，點擊綠色的「Code」按鈕後，會出現 Local 和 Codespaces 兩個選項。
這次點擊「Codespaces」，然後點擊「Create codespace on main」按鈕。

![codespaces top](/images/bf_portal_doc/3-setup-5.png)


稍等片刻後，VSCode 會在新的瀏覽器分頁中開啟，並顯示如下圖所示的引導。

![vscode top](/images/bf_portal_doc/3-setup-6.png)

下面有一個「Terminal」分頁，點擊它切換到「Terminal」分頁，然後輸入 `npm install`。
如果沒有出現 `Error` 這個字樣，就沒有問題。

![vscode top](/images/bf_portal_doc/3-setup-7.png)

接著，在 VSCode 的檔案總管中查看 `code` 資料夾。把最開始從 BF 官方下載並解壓縮的 SDK 中，`code` 資料夾裡的內容放進去。
如果像下圖這樣放入，就沒有問題。

![sdk setup](/images/bf_portal_doc/3-setup-8.png)

## 4. 範本能讓哪些事情變輕鬆

本書使用 [link1345/Battlefield6-SampleTemplate](https://github.com/link1345/Battlefield6-SampleTemplate) 進行 TypeScript 開發。

即使直接在 Portal Web Builder 的 Script 欄中寫程式碼也能執行，但程式碼稍微變大後，就會出現以下問題。

* 單一檔案變得很長，分不清哪裡寫了什麼。
* 細小的語法錯誤，要到啟動遊戲後才會發現。
* 每次重新測試同一段處理，手動操作都會增加。
* Portal Web Builder 的 Script 欄最終只接收一個 TypeScript 檔案，因此需要手動把拆分後的程式碼合併起來。

使用這個範本後，下面的工作會變得更簡單。

| 命令 | 可以做什麼 |
| ---- | ---- |
| `npm run lint` | 用 ESLint 檢查語法和寫法 |
| `npm run lint:fix` | 自動修正 ESLint 可以修正的問題 |
| `npm run build` | 將 `mods` 下的多個 `.ts` 檔案合併到 `dist/Script.ts` |
| `npm run test` | 用 Vitest 執行測試 |

推送到 GitHub 時，範本內包含的 GitHub Actions 也會執行 `npm run lint`。也就是說，在發布前就能盡早攔下「作為程式碼本身就可疑」的內容。

## 5. 範本的資料夾結構

最先看的地方如下。

| 位置 | 作用 |
| ---- | ---- |
| `mods/` | 放置自己編寫的 TypeScript 程式碼 |
| `code/` | 放置 Battlefield 6 SDK 的 `code` 資料夾 |
| `dist/Script.ts` | 由 `npm run build` 生成，並註冊到 Portal 的 TypeScript |
| `dist/Strings.json` | 註冊到 Portal 的字串定義 |
| `test/` | 放置 Vitest 測試 |

開發中會在 `mods` 中分成多個檔案編寫。完成後執行 `npm run build`，再把生成的 `dist/Script.ts` 和 `dist/Strings.json` 註冊到 Portal Web Builder 的 Script 欄。

:::message alert

README 中有些地方把字串檔案寫成 `String.json`，但範本內實際檔案是 `dist/Strings.json`。本書統一寫作 `dist/Strings.json`。

:::

至此，使用 TypeScript 製作 Portal 腳本的步驟就結束了。

# SDK 資料夾的閱讀方式

SDK 很大，不需要一開始就全部閱讀。請先按下面的順序查看。

| 查看位置 | 可以了解什麼 |
| ---- | ---- |
| `docs/pages/getting_started.html` | Godot 啟動、`GodotProject` 的 Import、`Portal Setup` 的流程 |
| `docs/pages/spatial_editor.html` | 地圖編輯、Object Library、`.spatial.json` 的 Export |
| `docs/pages/gameplay_logic.html` | TypeScript、Custom UI、AI、ObjId 引用、日誌確認 |
| `docs/pages/tips_tricks.html` | 載具數量、Player 掃描、UI Widget 管理等負載對策 |
| `code/types/mod/index.d.ts` | Portal TypeScript API 的函數和型別列表 |
| `GodotProject/mods/_StartHere_BasicTemplate` | 最先閱讀的官方 TypeScript 範本 |

本機 SDK 的 `sdk.version.json` 中，基準 SDK 是 `1.3.2.0`。SDK 會隨著更新而改變內容，如果本書步驟和你的畫面不同，請先確認 `sdk.version.json` 和 `docs/pages`。

# 結論

我們已經準備好了使用「Portal Custom」製作遊戲的環境。
這樣，在後續章節中就可以更順利地把想法寫成程式，並製作成遊戲。

---

📘 **下一章「地圖編輯器實務指南（放置與關聯）」** 會使用準備好的環境，實際推進 **「可以放什麼」「放在哪裡」「如何賦予 ID」**。Shared 要先試放並確認警告標記，ID 禁止使用 -1，並整理成台帳。記住這兩點，進入下一步。
