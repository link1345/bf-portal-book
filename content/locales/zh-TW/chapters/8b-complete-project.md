---
title: "第8.5章　把 Checkpoint Rush 做到發布前"
free: true
---

到第8章為止，我們已經看過了配置、ID、規則設計、TypeScript、UI、SFX、FX 的基本思路。
不過，這些內容分散在不同章節裡時，真正動手製作時的順序仍然不容易看清。

本章會把前面反覆使用的最小循環，整理成一個名為 **Checkpoint Rush** 的小模式。
這裡不會增加新的機制，而是把第4章到第8章的部件，依發布前的製作順序重新排列。

# 0　本章要製作的內容

Checkpoint Rush 是只有下面流程的小型體驗。

1. 按下大廳中央的開始按鈕。
2. 隱藏入口側的 WorldIcon，顯示目的地側的 WorldIcon。
3. 進入目的地的 AreaTrigger。
4. 防守 10 秒。
5. 只顯示一次成功訊息、SFX 和 FX。

本章的完成條件不是按下發布按鈕。
下面 5 項都準備好，並確認到可以註冊到 Portal Web Builder 之前的狀態，就算完成。

| 完成條件 | 要看什麼 |
| ---- | ---- |
| 配置 ID | Godot 側必要的 ObjId 已設定，並記錄在台帳中 |
| 程式碼 | `mods` 下的 ID、設定、顯示、流程、事件已經分開 |
| 字串 | 畫面顯示文案放在 `Strings.json` 中，沒有直接寫進程式碼 |
| 測試 | 按 `lint`、`test`、`build` 的順序通過 |
| 註冊前檢查 | 確認 `dist/Script.ts` 和 `dist/Strings.json` 是註冊對象 |

> 本章不是「總集篇」。它是用來固定動手順序的實踐篇。

# 1　先把設計整理成一張表

首先，要能用短句說明這個模式。

| 項目 | 內容 |
| ---- | ---- |
| 模式名 | Checkpoint Rush |
| 目標 | 按下中央終端，沿著標記前往目的地，並防守 10 秒 |
| 推薦人數 | 8〜16 人 |
| 所需時間 | 10〜15 分鐘 |
| 第一個行動 | 按下大廳中央的終端 |

接著，把 Godot 側放置的物件和 TypeScript 側呼叫的物件放進同一張表。

| 用途 | ObjId | Godot 物件 | TypeScript 取得函式 | 初始狀態 |
| ---- | ---- | ---- | ---- | ---- |
| 開始按鈕 | 500 | InteractPoint | `mod.GetInteractPoint(500)` | 啟用 |
| 入口引導 | 21 | WorldIcon | `mod.GetWorldIcon(21)` | 顯示 |
| 目的地引導 | 22 | WorldIcon | `mod.GetWorldIcon(22)` | 隱藏 |
| 目的地判定 | 11 | AreaTrigger | `mod.GetAreaTrigger(11)` | 啟用 |
| 成功 FX | 901 | FX / VFX | `mod.GetVFX(901)` | 隱藏 |
| 成功 SFX | 951 | SFX | `mod.PlaySound(951, 1)` | 未播放 |

如果沒有這張表就開始製作，之後一定會疑惑「500 是什麼」「21 和 22 哪個是入口」。
這裡直接把第4章的台帳當作製作檢查表來使用。

# 2　在 Godot 側放置物件

在 Godot 側，先放置遊戲流程需要的物件，再考慮細節裝飾。

1. 在大廳中央放置 `InteractPoint`，ObjId 設為 `500`。
2. 在入口側放置 `WorldIcon`，ObjId 設為 `21`。
3. 在目的地稍前方放置 `WorldIcon`，ObjId 設為 `22`。
4. 在目的地放置 `AreaTrigger`，ObjId 設為 `11`。
5. 在目的地放置成功用的 FX 和 SFX，ObjId 設為 `901` / `951`。

具體配置步驟請使用第4章的實務流程。
本章重要的是，放置完成後一定要更新台帳中的「測試結果」。

| 用途 | ObjId | 測試前 | 測試後 |
| ---- | ---- | ---- | ---- |
| 開始按鈕 | 500 | 未確認 | 能按下就是 OK |
| 入口引導 | 21 | 未確認 | 開始時可見就是 OK |
| 目的地引導 | 22 | 未確認 | 開始後可見就是 OK |
| 目的地判定 | 11 | 未確認 | 進入瞬間有反應就是 OK |
| 成功 FX/SFX | 901 / 951 | 未確認 | 只播放一次就是 OK |

`AreaTrigger` 很容易因為高度不足而失敗。
請給它足夠的厚度，讓玩家跳躍或從斜坡進入時也能觸發判定。

# 3　TypeScript 側的最小結構

程式碼不要一開始就全部塞進巨大的 `Script.ts`。
按照第7章的思路，分成下面 5 個檔案。

| 檔案 | 作用 | 放什麼 |
| ---- | ---- | ---- |
| `ids.ts` | ObjId | 500、21、22、11、901、951 |
| `config.ts` | 調整數值 | 防守秒數、訊息顯示秒數、SFX 冷卻 |
| `ui.ts` | 表現層 | 訊息、WorldIcon 切換、成功演出 |
| `game.ts` | 進度狀態 | 已開始、已到達、防守中、單次觸發 |
| `Script.ts` | 事件入口 | `OnGameModeStarted`、`OnPlayerInteract`、`OnPlayerEnterAreaTrigger` |

`ids.ts` 只是把數字換成名字。

```ts
export const IP_START = 500;
export const ICON_ENTRANCE = 21;
export const ICON_TARGET = 22;
export const AREA_TARGET = 11;
export const FX_GOAL = 901;
export const SFX_GOAL = 951;
```

`config.ts` 收集之後可能調整的數字。

```ts
export const DEFEND_SECONDS = 10;
export const MESSAGE_SECONDS = 2;
export const SFX_COOLDOWN_SECONDS = 2;
```

`Strings.json` 只放畫面上顯示的文案。
不要把日文、中文等多位元組文字直接寫進程式碼。

```json
{
  "start": "Go to the checkpoint.",
  "defend": "Defend for {} seconds.",
  "success": "Checkpoint secured."
}
```

`Script.ts` 只保留容易閱讀的事件入口。

:::message alert
下面的程式碼是範例程式的一部分摘錄，單獨使用時並不能實際執行。
這裡省略了 `import`、`ids.ts` / `config.ts` / `ui.ts` / `game.ts` 的實作、`modlib.ConditionState`、SFX 冷卻、日誌輸出等輔助程式碼。
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

這段程式碼只是摘錄出各檔案職責的核心形狀。
如果直接把它貼進 `Script.ts`，會因為缺少必要的 `import` 和輔助函式而無法執行。
放入實際模板時，請按照第6章和第7章的形式補上 `import`、`modlib.ConditionState`、SFX 冷卻和日誌輸出。

# 4　分階段確認動作

不要一口氣檢查到最後，那樣反而慢。
Checkpoint Rush 按下面 3 個階段確認。

## 4.1 按下按鈕後 WorldIcon 會切換

只看兩點。

* 開始時能看到 `WorldIcon 21`。
* 按下 `InteractPoint 500` 後，`21` 消失，`22` 出現。

如果這裡失敗，就不用看 FX 或防守秒數。
請先修正 ObjId、初始顯示、`OnPlayerInteract` 的判定。

## 4.2 AreaTrigger 只觸發一次 FX/SFX

接著進入目的地。

* 進入 `AreaTrigger 11` 的瞬間才有反應。
* `SFX 951` 不會被連續觸發。
* `FX 901` 會作為成功演出出現。
* 如果使用循環 FX，必要時在退出時停止。

如果這裡失敗，請檢查 `AreaTrigger` 的高度、ObjId，以及 `ConditionState` 的使用方式。

## 4.3 確認 10 秒防守和日誌

最後確認防守計時和日誌。

```text
checkpoint:start
checkpoint:defend
checkpoint:success
```

如果 `PortalLog.txt` 中按這個順序出現，就能讀出事件流程。
如果同一行出現很多次，表示還沒有阻止重複觸發。
請確認應該用 `startGate`、`targetGate`、`game.started`、`game.reached` 中的哪一個來擋住。

# 5　註冊前檢查

註冊到 Portal Web Builder 前，請按下面順序在本地執行。

| 順序 | 命令 | 要看什麼 |
| ---- | ---- | ---- |
| 1 | `npm run lint` | 語法和寫法沒有可疑之處 |
| 2 | `npm run test` | ID 和小型條件函式沒有損壞 |
| 3 | `npm run build` | 生成 `dist/Script.ts` 和 `dist/Strings.json` |

註冊的不是開發中的 `mods/Script.ts`。
交給 Portal Web Builder 的是建置後的 **`dist/Script.ts`** 和 **`dist/Strings.json`**。

進入第9章之前，至少確認下面這些內容。

| 確認項 | 合格線 |
| ---- | ---- |
| 單人測試 | 從開始、移動、防守到成功都能走通 |
| 雙人測試 | 一個人按下按鈕後，兩個人都能理解下一步行動 |
| 重新部署 | 死亡後或重新出擊後，WorldIcon 和 UI 不會崩壞 |
| 中途加入 | 中途加入的玩家不會迷路 |
| 日誌 | 沒有意外的連續觸發或錯誤 |

這張表填完後，就可以進入發布和營運的話題。

# 6　本章不添加的內容

如果 Checkpoint Rush 變得太大，這個實踐章的作用就會變模糊。
本章不處理下面這些話題。

* 大規模招募玩家、縮圖、公告、營運日誌：第9章處理。
* 官方範例的詳細閱讀：附錄B處理。
* modlib 的函式列表和細節用法：附錄C處理。

這裡製作的不是華麗的成品，而是不容易壞的小型專案。
先把小循環跑通，看日誌，通過註冊前檢查。
然後再進入第9章的發布、託管、營運。

# 結論

* Checkpoint Rush 是把第4〜8章的部件按製作順序排列的小型實踐專案。
* 先準備設計表和 ObjId 台帳，Godot 側和 TypeScript 側的對應關係就不容易崩。
* 分成 `ids.ts`、`config.ts`、`ui.ts`、`game.ts`、`Script.ts` 後，發布前修正會輕鬆很多。
* `lint`、`test`、`build`、單人 / 雙人 / 重新部署 / 中途加入檢查完成後，就可以進入第9章的發布準備。

---

📘 **下一章《發布、託管、營運》** 會整理說明文、縮圖、測試會、更新步驟，讓這個小模式變成可以給別人遊玩的狀態。
