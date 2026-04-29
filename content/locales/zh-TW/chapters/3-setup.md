---
title: "第三章 「門戶客製化」環境搭建"
free: true
---

> --- 為了創建它，讓我們準備一個開發環境。

本章為您提供了開始後續章節所需的工具。
請注意，如果不做這些事情，你絕對無法開發「入口網站客製化」。

# 下載BF官方SDK

https://portal.battlefield.com/

當您造訪上述網址時，系統會詢問您是“戰地 2042”還是“戰地 6”，因此選擇“戰地 6”並點擊“開始建立”。

![開始](/images/bf_portal_doc/3-setup-init-0.png)

頂部有一個“下載 SDK”按鈕，點擊它可以下載 SDK zip 檔案。

![下載](/images/bf_portal_doc/3-setup-init-1.png)

如果在這些步驟中提示您登錄，請使用您的 EA 帳戶登入。

另外，下載完成後，解壓縮 zip 檔案。要解壓縮文件，請右鍵單擊下載的文件，然後會出現一列“提取全部...”，單擊該列以解壓縮 zip 文件。

# 準備地圖編輯器

解壓縮下載的 SDK zip 檔案後，您可以立即使用地圖編輯器。

在官方的SDK說明中，Godot端做了以下準備工作。

1. 啟動 SDK 中包含的 Godot 執行檔。
2. 當「專案選擇」畫面開啟時，拖曳並載入 SDK 中的 `GodotProject` 資料夾。如果您想手動執行此操作，請從「匯入」中選擇 `GodotProject`。
3. 開啟戰地 6 門戶專案。首次啟動可能需要幾分鐘。
4. 在Godot右側的`BFPortal`標籤上按`Portal Setup`，等待設定完成。
5. 從 `Scene` 選單中選擇 `Open Scene`，然後在 `levels` 目錄中開啟要編輯的層級。

如果您在關卡中看不到地形，則它可能位於您的相機位置上方。首先，查看上方並確保地形已加載。

## 地圖編輯器的基本操作

在官方SDK文件中，描述了以下操作作為空間編輯器的基本操作。

|營運|內容 |
| ---- | ---- |
|從物件庫拖曳 |將要使用的物件放入 3D 場景或場景大綱 |
|選擇 `W` | 時移動模式。移動放置的物體 |
|選擇 `E` | 時旋轉模式。旋轉放置的物件 |
|選擇 `R` | 時縮放模式。縮放放置的物件 |

在 3D 視圖中移動視點是標準的 Godot 操作，因此請使用滑鼠或 WASD 移動來檢查位置。
當觸摸放置的物件時，請記住先選擇它，然後使用 `W` / `E` / `R` 來移動、旋轉和縮放它，這樣你就不會迷路。

基本上，比例應該是統一的。
單獨拉伸 X/Y/Z 的非均勻縮放不受官方支持，並且會導致遊戲內外觀和命中檢測損壞。

# 準備打字稿

本書不詳細介紹視覺化編輯器或區塊視覺化程式設計。
從現在開始，我們將準備好使用 TypeScript SDK 和模板儲存庫進行開發。

## 1. 建立github帳戶

https://github.com/

造訪 github 並建立您自己的帳戶。

## 2. 建立儲存庫（專案）

https://github.com/link1345/Battlefield6-SampleTemplate

在上面的頁面上，有一個名為“使用此模板”的按鈕，如下圖所示，因此單擊它，然後單擊“創建新存儲庫”。

![使用這個模板](/images/bf_portal_doc/3-setup-1.png)


然後，將開啟一個名為「建立新儲存庫」的頁面，因此請按照說明操作並填寫如下圖所示的資訊。
「儲存庫名稱」是您的專案的名稱。請選擇一個適合您目的的名稱。
「描述」是對項目的描述。你不必寫任何東西。
「選擇可見性」可讓您選擇項目是「私有」還是「公共」。如果您不打算向任何人公開，那麼私有也可以。

![建立一個新的儲存庫](/images/bf_portal_doc/3-setup-1.png)

如果儲存庫（專案）建立成功，將顯示如下圖所示。

![儲存庫](/images/bf_portal_doc/3-setup-3.png)

## 3 . 使原始程式碼可存取

我想立即接觸原始程式碼，但這次我想輕鬆創建一個環境，所以我想使用「Codespaces」。

:::message alert

這次，我們使用**Codespaces**輕鬆建置環境。

由於Portal的TypeScript註冊規範，它不會是一個使用很多GB的大型程序，所以我認為免費層就足夠了。
如果你想在本機環境中執行此操作，則需要在電腦上安裝 VSCode，使用 git 克隆儲存庫，並做很多工作。 **

[範本「link1345/Battlefield6-SampleTemplate」](https://github.com/link1345/Battlefield6-SampleTemplate)在README.md（英文）和README-JP.md（日文）中有說明，所以請檢查那裡。

:::

當您造訪您建立的儲存庫的頁面並按下標有「程式碼」的綠色按鈕時，您將看到「本機」和「程式碼空間」選項。
這次，點擊“Codespaces”並按下“Create codespace on main”按鈕。

![程式碼空間頂部](/images/bf_portal_doc/3-setup-5.png)


片刻之後，VSCode 將在新的瀏覽器標籤中打開，並且將出現一個指南，如下圖所示。

![vscode 頂部](/images/bf_portal_doc/3-setup-6.png)

底部有一個名為“Terminal”的選項卡，因此請點擊它，切換到“Terminal”選項卡，然後輸入“`npm install`”。
特別是沒有出現`Error`這句話，就沒有問題。

![vscode 頂部](/images/bf_portal_doc/3-setup-7.png)

接下來，請查看VSCode的資源管理器，將第一次從BF官方下載並解壓縮的SDK所在的`code`資料夾中的內容放入`code`資料夾中。
如果按照下圖插入就沒有問題了。

![SDK設定](/images/bf_portal_doc/3-setup-8.png)

## 4 . 模板可以讓什麼變得更簡單？

在本書中，我們使用 [link1345/Battlefield6-SampleTemplate](https://github.com/link1345/Battlefield6-SampleTemplate) 進行 TypeScript 開發。

如果直接在Portal Web Builder的Script欄位中寫程式碼的話，是可以的，但是如果寫大一點的話，就會出現下面的問題。

* 1 個文件變得很長，我不記得我在哪裡寫了什麼。
* 直到開始遊戲我才注意到一個小文法錯誤。
* 每次重新測試相同流程時，手動工作都會增加。
* Portal Web Builder 的 Script 欄位最終接收的是一個 TypeScript 文件，因此需要手動將已經拆分成文件的程式碼拼湊在一起。

此模板可以輕鬆實現：

|命令 |你能做什麼|
| ---- | ---- |
| `npm run lint` | `npm run lint` |使用 ESLint 檢查語法和寫作風格 |
| `npm run lint:fix` | `npm run lint:fix` |自動修復可以使用 ESLint 修復的問題 |
| `npm run build` | `npm run build` |將 `mods` 下的多個 `.ts` 檔案合併到 `dist/Script.ts` |
| `npm run test` | `npm run test` |使用 Vitest 執行測試 |

當您推送到 GitHub 時，範本中包含的 GitHub Actions 將執行 `npm run lint`。換句話說，您可以在發布之前快速阻止「一開始就可疑」的程式碼。

## 5 . 範本資料夾結構

前四個要看的地方是：

|地點 |角色 |
| ---- | ---- |
| `mods/` | `mods/` |您寫的 TypeScript 程式碼 |
| `code/` | `code/` | 《戰地 6》SDK 的 `code` 資料夾放置在哪裡？
| `dist/Script.ts` | `dist/Script.ts` | `npm run build` 要註冊 Portal 的 TypeScript |
| `dist/Strings.json` | `dist/Strings.json` | Portal | 要註冊的字串定義
| `test/` | `test/` |維度測試測試儲存|

在開發過程中，多個檔案寫入`mods`。完成後，執行 `npm run build` 並將產生的 `dist/Script.ts` 和 `dist/Strings.json` 註冊到 Portal Web Builder 的 Script 欄位中。

:::message alert

在README中，有些地方字串檔案寫為`String.json`，但範本中的實際檔案是`dist/Strings.json`。本書寫為`dist/Strings.json`。

:::

使用 TypeScript 建立 Portal 腳本的步驟到此結束。

# 如何導航 SDK 資料夾

SDK 很大，因此您無需從頭閱讀所有內容。請先按以下順序觀看。

|去哪裡看|看什麼 |
| ---- | ---- |
| `docs/pages/getting_started.html` | `docs/pages/getting_started.html` |啟動Godot、匯入`GodotProject`、`Portal Setup`的流程 |
| `docs/pages/spatial_editor.html` | `docs/pages/spatial_editor.html` |地圖編輯、物件庫、匯出 `.spatial.json` |
| `docs/pages/gameplay_logic.html` | `docs/pages/gameplay_logic.html` | TypeScript、自訂 UI、AI、ObjId 參考、日誌確認 |
| `docs/pages/tips_tricks.html` | `docs/pages/tips_tricks.html` |車輛數量、玩家掃描、UI widget 管理等負載對策 |
| `code/types/mod/index.d.ts` | `code/types/mod/index.d.ts` | Portal TypeScript API 函數與類型清單 |
| `GodotProject/mods/_StartHere_BasicTemplate` | `GodotProject/mods/_StartHere_BasicTemplate` |先閱讀官方 TypeScript 範本 |

其中本地 SDK 為 `sdk.version.json` ，參考 SDK 為 `1.2.3.0` 。 SDK 的內容會隨著更新而變化，因此，如果本文檔中的步驟與畫面不同，請先檢查 `sdk.version.json` 和 `docs/pages`。

# 結論

我們準備了使用「Portal Custom」創建遊戲的環境。
現在您可以在接下來的章節中順利地編程和創建遊戲。

---

📘 **在下一章《地圖編輯器實用指南（實用放置與連結）》**中，我們將利用已經準備好的環境來進行「可以放置什麼」、「放置在哪裡」、「如何分配ID」**。共享是試用設定→警告標記確認，ID為-1禁止&分類帳。使用這兩個作為密碼，繼續下一步。
