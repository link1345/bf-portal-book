---
title: "第9.5章　把狀況和日誌交給AI來撰寫Portal程式碼"
free: true
---

第 9 章中，我們整理了完成後的體驗如何發布、說明，並在不破壞它的前提下更新。不過，發布後修復問題或追加新要素時，如果每次都只靠人去追所有 API 和型別，會變得很沉重。
本章會整理 **如何把 Portal 程式碼編寫工作交給 AI**。我們會建立一個流程，把想做的事、目標地圖、目標物件、觸發時機、實機中發生的現象，以及 `PortalLog.txt` 的內容，作為 AI 能使用的材料交給它。

這裡的目標不是把一切都丟給 AI 後就結束，而是以之後修正工作也能直接複用的形式，決定角色分工、提問寫法、日誌交接、MCP 使用點和實機確認之間的關係。

# 0　把狀況和日誌交給AI來撰寫Portal程式碼

用TypeScript撰寫Portal腳本時，實際寫程式這件事很大一部分可以交給AI。
尤其是查找函式名稱、配合型別、加入日誌、縮小原因範圍，這些工作AI很擅長。

相對地，也有一些資訊必須由人類提供。

* 想做什麼。
* 說的是哪張地圖、哪個物件、哪個時機。
* 實機中發生了什麼。
* 日誌裡出現了什麼。

這些資訊如果很含糊，AI即使寫出看起來像樣的程式碼，也容易不符合Portal現場的實際情況。
反過來，只要把現象和日誌清楚交給AI，它就會成為相當可靠的夥伴。

本章以可以使用BF6 Portal TypeScript MCP的AI環境為例，整理一種不僅適用於Codex，也適用於其他AI的「程式撰寫對話」推進方式。

:::message alert
即使讓AI寫程式碼，也不能省略實機確認。
Portal的事件觸發時機、士兵座標確定時機、各地圖的 `RuntimeSpawn_...` 差異，最後都必須用遊戲畫面和 `PortalLog.txt` 確認。
:::

# 1　與AI的分工

先把適合交給AI的事和人類應該觀察的事分開。

| 角色 | 負責方 | 內容 |
| ---- | ---- | ---- |
| 決定目標 | 人類 | 例如「想在玩家面前生成Apple」 |
| 提供條件 | 人類 | 地圖名、想使用的物件名、觸發時機 |
| 撰寫程式碼 | AI | TypeScript實作、Portal API呼叫、加入日誌 |
| 查詢SDK | AI | 使用MCP或型別定義確認函式名稱、型別、enum候選 |
| 實機測試 | 人類 | 註冊到Portal並在遊戲內確認行為 |
| 閱讀日誌 | AI和人類 | 提供 `PortalLog.txt` 並縮小原因範圍 |
| 修正程式碼 | AI | 根據日誌提出假設並修改程式碼 |

人類不需要一開始就記住所有API。
但是，「想讓什麼發生」和「實際上發生了什麼」必須由人類觀察並交給AI。

程式可以讓AI來寫。
不過，如果交給AI的狀況說明也很粗糙，對話就會開始迷路。
這裡偷懶，之後反而更麻煩。

# 2　什麼是BF6 Portal TypeScript MCP

BF6 Portal TypeScript MCP是一個MCP伺服器，可以讓AI開發環境查詢Portal SDK的型別資訊。

儲存庫在這裡。

https://github.com/link1345/bf6-portal-typescript-mcp

如果告訴AI「不清楚的Portal API請先用MCP查詢再寫」，AI就可以一邊參考SDK資訊一邊寫程式碼，而不需要人類每次都去搜尋 `index.d.ts`。

MCP就像交給AI的一本詞典。
與其把它理解成人類直接操作、用來背API的工具，不如把它理解成告訴AI「不清楚的地方就用MCP查」的工具。

不過，僅靠MCP並不能知道實機中的行為。
遊戲裡變成了什麼樣、日誌裡出現了什麼，仍然需要人類交給AI。

如果在MCP的設定或使用方法上卡住了，也可以先直接問Codex的AI。

```text
我想設定bf6_portal_typescript_mcp。
請看一下目前的設定畫面和錯誤，確認還缺什麼。
```

```text
如果Portal API有不清楚的地方，請先用MCP查詢後再回答。
```

問AI時，把錯誤訊息、設定畫面裡輸入的內容、SDK資料夾的位置一起交給它，會更快推進。

# 3　在Codex App中設定MCP伺服器

這裡是使用Codex App時的設定範例。
如果使用其他AI開發環境，請按該環境的MCP設定方法進行替換。

首先從Codex App左下角選單開啟設定。

![開啟Codex App設定](/images/bf_portal_doc/d-codex-1.png)

開啟設定畫面後，在左側選單選擇「MCP 伺服器」，然後按「新增伺服器」。

![Codex App的MCP伺服器設定](/images/bf_portal_doc/d-codex-2.png)

在自訂MCP設定畫面中，按如下方式輸入。

| 項目 | 輸入範例 |
| ---- | ---- |
| 名稱 | `bf6-portal-typescript-mcp` |
| 類型 | `STDIO` |
| 啟動命令 | `npx` |
| 參數1 | `bf6-portal-typescript-mcp@latest` |
| 參數2 | `mcp` |
| 參數3 | `--sdk_path` |
| 參數4 | `/path/to/bf6-portal-sdk` |

![Codex App中MCP伺服器的設定方法](/images/bf_portal_doc/d-codex-3.png)

請把 `/path/to/bf6-portal-sdk` 替換成自己的Portal SDK位置。
大致來說，指定能看到 `code/types/mod/index.d.ts` 的位置。

設定後，如果Codex的工具列表中可以使用 `bf6_portal_typescript_mcp`，就準備完成了。

## 不能正常運作時的確認

設定後仍然不能正常運作時，按下面的順序確認。

* `npx` 是否可用。
* `--sdk_path` 指定的資料夾中是否有 `code/types/mod/index.d.ts`。
* 設定後是否重新啟動了Codex App。
* Codex的工具列表中是否出現了 `bf6_portal_typescript_mcp`。
* 伺服器名稱是否簡短、容易識別。

如果伺服器名稱不好理解，AI可能會迷惑該使用哪個MCP。
OpenAI的Docs MCP說明中也提到，如果希望AI使用特定MCP，可以對AI明確說明，或寫入 `AGENTS.md`。

https://developers.openai.com/learn/docs-mcp

## Codex App的設定也稍微看一下

Codex App的Settings中，不僅可以調整MCP，也可以調整外觀、人格、Custom instructions等。
如果想用日語，可以在自訂指示中寫入下面這樣的內容。這樣說明會偏向日語，同時程式碼和日誌不容易被破壞。

```text
請用日語說明。
程式碼、函式名稱、日誌請保留原始英文。
```

如果連程式碼、函式名稱、日誌也被翻譯成日語，Portal側可能無法直接使用。
說明文字用日語，程式碼和API名保持英文，這樣分開比較穩妥。

# 4　最開始交給AI的請求

第一次請求時，要具體寫出想建立的現象。
程式碼細節可以交給AI，但目標、條件、可用工具要提供。

```text
請撰寫一個BF6 Portal的TypeScript程式，在玩家生成時，在玩家面前生成「Apple_01」物件。
可以使用bf6_portal_typescript_mcp伺服器，所以如果有不清楚的Portal內容，請使用該MCP伺服器查詢。
```

這個請求提供了三類資訊。

* 想做的事：在生成的玩家面前生成物件。
* 想使用的東西：`Apple_01`。
* 調查方式：Portal API有不清楚的地方就使用MCP。

如果已經知道地圖，也從一開始就寫進去。

```text
地圖是Mirak Valley。
如果Apple_01的RuntimeSpawn候選會因地圖而不同，請先用MCP確認後再選擇。
```

讓AI寫程式碼時，不要只說「請寫程式碼」。
把「不清楚的Portal API請查詢」也一起說出來，這是訣竅。

# 5　第一次沒有完成也不是失敗

AI最初寫出的程式碼中，Apple有時不會顯示。
這可能是AI完全寫錯了，也可能只是缺少Portal側的載入資訊或實機時機資訊。

這裡重要的是，不要停在「看不見」。
讓AI加入下面這樣的確認用程式碼。

* 在 `OnGameModeStarted` 中加入 `console.log`。
* 在畫面右上角顯示通知。
* 在 `OnPlayerDeployed` 中加入 `console.log`。
* 把生成座標輸出到日誌。

例如，在 `OnGameModeStarted` 中加入這樣的確認。

```ts
export function OnGameModeStarted(): void {
    console.log("AppleInFront: OnGameModeStarted");
    mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
    mod.DisplayNotificationMessage(mod.Message("AppleInFront loaded"));
}
```

如果畫面右上角出現 `AppleInFront loaded`，表示該程式碼已經被Portal讀取。
如果沒有出現，在懷疑Apple座標之前，先懷疑註冊的 `Script.ts` 或建置後的 `dist/Script.ts`。

# 6　把日誌交給AI並請求解決

Portal日誌會輸出到如下位置。

```text
%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt
```

無法執行時，把這個日誌交給AI。
重要的不是感想，而是日誌本身。

不好的交法如下。

```text
Apple沒有顯示。請修復。
```

這樣無法判斷是載入失敗、事件未觸發、座標錯誤，還是物件不對。

好的交法如下。

```text
Apple沒有顯示。
`%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` 中只有下面這條日誌。

[UTC 2026-04-30 23:38:28] Mod started

請修改程式碼，讓我們能夠確認Portal是否讀取了程式碼、事件是否觸發。
必要時請用bf6_portal_typescript_mcp查詢Portal API。
```

有了這些資訊，AI就能判斷「首先應該確認程式碼是否被讀取」。

# 7　把狀態和現象一起交給AI

有時，程式碼已經被讀取，但Apple仍然看不見。

```text
地圖是Mirak Valley，所以Tungsten應該是正確的。
日誌如下。
我個人比較在意日誌裡的「0, -0.3499999940395355, 2」。
這看起來不像全域座標。

[UTC 2026-04-30 23:47:31] Mod started
[UTC 2026-04-30 23:47:48] QuickJS: console.log: AppleInFront: OnGameModeStarted
[UTC 2026-04-30 23:47:48] QuickJS: console.log: AppleInFront: OnPlayerDeployed
[UTC 2026-04-30 23:47:48] QuickJS: console.log: Apple spawn position: 0, -0.3499999940395355, 2
```

這種交法相當好。
AI可以把狀況拆開來思考。

* `OnGameModeStarted` 正在執行。
* `OnPlayerDeployed` 也正在執行。
* `Apple spawn position` 已經輸出。
* 但是座標看起來接近原點。
* 可能是在出擊後立刻讀取時，士兵座標或朝向還沒有確定。

這種情況下，把下面的修正交給AI處理。

* 把 `OnPlayerDeployed` 改成 `async`。
* 在讀取士兵狀態前使用 `await mod.Wait(...)` 稍等。
* 不以 `EyePosition` 為基準，而以 `GetPosition` 為基準。
* 輸出 `Player position`、`Player eye position`、`Player facing direction`、`Apple spawn position`。
* 把等待時間做成容易修改的常數。

人類不需要完全猜中原因。
只要把「這個值可疑」「看起來不像全域座標」這樣的觀察交出去，AI就更容易確定調查方向。

# 8　完成例：在玩家面前生成Apple

在Mirak Valley生成 `Apple_01` 時，完成形如下。
它會在出擊後等待3秒，讀取玩家的位置和朝向，然後在前方2公尺處生成稍大的Apple。

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

成功後，Apple會顯示在出擊玩家的面前。

![完成後的Apple生成畫面](/images/bf_portal_doc/d-codex-4.png)

# 9　交給AI的資訊範本

想讓AI修正Portal程式碼時，按下面的形式交給它，對話會更快。

```text
想做的事:
想在生成的玩家面前生成Apple_01。

環境:
地圖是Mirak Valley。
可以使用bf6_portal_typescript_mcp，所以Portal API有不清楚的地方請查詢。

目前狀態:
程式碼已經註冊到Portal。
遊戲內看不到Apple。

日誌:
`%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` 的內容如下。

...

在意的點:
生成座標是 `0, -0.3499999940395355, 2`，看起來不像全域座標。

請求:
請加入用於切分原因的日誌，並進行必要的程式碼修正。
```

這種形式既適用於Codex，也適用於其他AI。
交給AI的不需要是完美推理。
目標、狀態、日誌、在意的點就夠了。

# 10　初學者容易卡住的地方

## 設定了MCP，但AI沒有使用

即使可以使用某個工具，AI也不一定每次都會自動選擇最合適的工具。
Portal API有不清楚的地方時，要在請求中明確寫出「請用MCP查詢」。

```text
可以使用bf6_portal_typescript_mcp。
如果Portal API或enum有不清楚的地方，請先用MCP確認後再寫程式碼。
```

如果每次都寫很麻煩，也可以把同樣的方針寫進專案的 `AGENTS.md`。

## 看不懂英文錯誤

錯誤訊息不需要勉強自己翻譯。
可以直接原樣貼給AI，然後讓它用日語說明原因和下一步確認步驟。

```text
出現了下面的錯誤。
我不太擅長英語，請用日語說明原因和確認步驟。
但是，程式碼和函式名稱請保持英文。

...
```

錯誤訊息省略太多，原因也可能一起消失。
即使日誌很長，也最好保留最開始的錯誤、最後的錯誤，以及自己執行的操作。

## Codex用英語回覆

可以在Codex App的Settings或Custom instructions中指定使用日語回答。
不過，也要寫明Portal程式碼、API名、日誌、檔案名稱要保持英文。

可以翻譯成日語的是說明。
如果程式碼內部也被翻譯成日語，複製使用時可能會壞掉。

## 害怕很快達到Rate limit

OpenAI的Rate limit會按請求數、Token數等多個維度計算，並且也會因模型而不同。

https://developers.openai.com/api/docs/guides/rate-limits

`fast` 不是「可以隨便大量消耗」的模式。
因為回覆很快，短時間內更容易連續發出很多請求。再加上如果每次都完整貼上很長的日誌或程式碼，Token消耗會變大，也就更容易感覺接近限制。

如果覺得不安，可以這樣拆開。

* 日誌先貼看起來相關的部分。
* 不要一次請求大規模修正，而是先請求「先只看原因」。
* 不要每次都貼完整程式碼，而是重點交出「上次之後改了哪裡」和「出現的錯誤」。
* 不要反覆貼同樣的說明，而是整理成目標、現象、日誌摘錄、請求的形式。

快速模式很方便，但不要把它當成節約模式，這樣更安全。

# 11　這種推進方式的注意點

* 可以以前提「讓AI寫程式碼」來推進。
* 人類交出「目標」「現象」「日誌」。
* 日誌從 `%LOCALAPPDATA%\Temp\Battlefieldâ„¢ 6\PortalLog.txt` 取得。
* 在能使用MCP的環境中，讓AI查詢不清楚的Portal API。
* 即使AI不能使用MCP，交出日誌和現象的對話形式也一樣。
* 如果不能執行，按讀取、事件觸發、座標、Prefab的順序切分。
* 實機看到的結果才是最終判斷。不要只憑AI的說明就當作完成。

# 結論

* Portal的TypeScript程式碼，很大程度上可以交給AI。
* 人類的工作是交出想做什麼、發生了什麼、日誌裡出現了什麼。
* BF6 Portal TypeScript MCP可以作為讓AI查詢Portal SDK的詞典。
* Codex App的設定只是使用MCP的一例，程式撰寫對話的基本方式在其他AI中也一樣。
* 只要交出目標、狀態、日誌、在意的點，和AI的修正循環就會快很多。
