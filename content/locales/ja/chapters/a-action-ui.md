---
title: "付録A-3： アクション・値取得一覧（UI・参照・値）"
free: true
---

# アクション・値取得一覧（UI・参照・値）

この付録では、UI・通知・スコアボード以降の関数、よく使う型、実装時の注意、最小テンプレートを扱います。基本操作系の関数は「付録A-2：アクション・値取得一覧（基本操作）」を参照してください。

## UI・通知・スコアボード

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `AddUIIcon` | オブジェクトへUI Icon Widgetを追加する。表示対象をプレイヤーやチームに限定できる。 オーバーロード2種。 | parentObject: mod.Object, image: WorldIconImages, verticalOffset: number, iconColour: Vector, iconText: Message, visibility: Player \| Team | なし | `mod.AddUIIcon(...);` |
| `ClearAllCustomNotificationMessages` | 指定プレイヤーのカスタム通知スロットをすべて消す。 | target: Player | なし | `mod.ClearAllCustomNotificationMessages(...);` |
| `ClearCustomNotificationMessage` | 指定スロットのカスタム通知を消す。対象プレイヤーやチームも指定できる。 オーバーロード3種。 | slot: CustomNotificationSlots | なし | `mod.ClearCustomNotificationMessage(...);` |
| `DisplayCustomNotificationMessage` | 指定スロットへカスタム通知を表示する。対象プレイヤーやチームも指定できる。 オーバーロード3種。 | msg: Message, slot: CustomNotificationSlots, duration: number | なし | `mod.DisplayCustomNotificationMessage(...);` |
| `DisplayHighlightedWorldLogMessage` | ミニマップ上のワールドログへ強調メッセージを約6秒表示する。対象指定なしなら全員に表示する。 オーバーロード3種。 | message: Message | なし | `mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.ok));` |
| `DisplayNotificationMessage` | 画面右上へ通知メッセージを約6秒表示する。対象プレイヤーやチームも指定できる。 オーバーロード3種。 | message: Message | なし | `mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.start), eventPlayer);` |
| `SendErrorReport` | Adminメニューにエラーとして表示されるメッセージを送る。 | message: Message | なし | `mod.SendErrorReport(...);` |
| `SendPortalLogToAdmin` | 専用サーバーでホストしている現在のセッションのPortalログを管理者クライアントへ送る。ローカルホスト時や管理者不在時は何も起こらない。 | なし | なし | `mod.SendPortalLogToAdmin();` |
| `SetScoreboardColumnNames` | カスタムスコアボードの列名を設定する。 オーバーロード5種。 | column1Name: Message, column2Name: Message, column3Name: Message, column4Name: Message, column5Name: Message | なし | `mod.SetScoreboardColumnNames(...);` |
| `SetScoreboardColumnWidths` | カスタムスコアボードの列幅比率を設定する。 オーバーロード5種。 | column1Width: number, column2Width: number, column3Width: number, column4Width: number, column5Width: number | なし | `mod.SetScoreboardColumnWidths(...);` |
| `SetScoreboardHeader` | スコアボード左上に表示されるヘッダー名を設定する。 オーバーロード2種。 | team1Name: Message, team2Name: Message | なし | `mod.SetScoreboardHeader(...);` |
| `SetScoreboardPlayerValues` | カスタムスコアボードのプレイヤー別列値を最大5列まで設定する。 オーバーロード5種。 | player: Player, column1Value: number, column2Value: number, column3Value: number, column4Value: number, column5Value: number | なし | `mod.SetScoreboardPlayerValues(...);` |
| `SetScoreboardSorting` | カスタムスコアボードのソート列と逆順指定を設定する。 オーバーロード2種。 | sortingColumn: number, reverseSorting: boolean | なし | `mod.SetScoreboardSorting(...);` |
| `SetScoreboardType` | 使用するスコアボード種別を変更する。 | scoreboardType: ScoreboardType | なし | `mod.SetScoreboardType(...);` |
| `AddUIButton` | UI Button Widgetを作成する。 オーバーロード6種。 | name: string, position: Vector, size: Vector, anchor: UIAnchor | なし | `mod.AddUIButton(...);` |
| `AddUIContainer` | UI Container Widgetを作成する。 オーバーロード6種。 | name: string, position: Vector, size: Vector, anchor: UIAnchor | なし | `mod.AddUIContainer(...);` |
| `AddUIGadgetImage` | ガジェット画像を表示するUI Image Widgetを作成する。 オーバーロード2種。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, gadget: Gadgets, parent: UIWidget | なし | `mod.AddUIGadgetImage(...);` |
| `AddUIImage` | UI Image Widgetを作成する。 オーバーロード6種。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, imageType: UIImageType | なし | `mod.AddUIImage(...);` |
| `AddUIText` | UI Text Widgetを作成する。 オーバーロード6種。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, message: Message | なし | `mod.AddUIText("timer", pos, size, mod.UIAnchor.Top, mod.Message(mod.stringkeys.timerZero));` |
| `AddUIWeaponImage` | 武器画像を表示するUI Image Widgetを作成する。 オーバーロード4種。 | name: string, position: Vector, size: Vector, anchor: UIAnchor, weapon: Weapons, parent: UIWidget | なし | `mod.AddUIWeaponImage(...);` |
| `DeleteAllUIWidgets` | すべてのUI Widgetを削除する。 | なし | なし | `mod.DeleteAllUIWidgets(...);` |
| `DeleteUIWidget` | 指定UI Widgetを削除する。 | widget: UIWidget | なし | `mod.DeleteUIWidget(...);` |
| `EnableUIButtonEvent` | UI Button Widgetがボタンイベントを送るか設定する。 | widget: UIWidget, buttonEvent: UIButtonEvent, enabled: boolean | なし | `mod.EnableUIButtonEvent(...);` |
| `EnableUIInputMode` | UI Buttonを操作できる入力モードを有効または無効にする。対象指定もできる。 オーバーロード2種。 | enabled: boolean | なし | `mod.EnableUIInputMode(...);` |
| `SetUIButtonAlphaBase` | UI Buttonの通常時アルファ値を変更する。 | widget: UIWidget, value: number | なし | `mod.SetUIButtonAlphaBase(...);` |
| `SetUIButtonAlphaDisabled` | UI Buttonの無効時アルファ値を変更する。 | widget: UIWidget, value: number | なし | `mod.SetUIButtonAlphaDisabled(...);` |
| `SetUIButtonAlphaFocused` | UI Buttonのフォーカス時アルファ値を変更する。 | widget: UIWidget, value: number | なし | `mod.SetUIButtonAlphaFocused(...);` |
| `SetUIButtonAlphaHover` | UI Buttonのホバー時アルファ値を変更する。 | widget: UIWidget, value: number | なし | `mod.SetUIButtonAlphaHover(...);` |
| `SetUIButtonAlphaPressed` | UI Buttonの押下時アルファ値を変更する。 | widget: UIWidget, value: number | なし | `mod.SetUIButtonAlphaPressed(...);` |
| `SetUIButtonColorBase` | UI Buttonの通常時色を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIButtonColorBase(...);` |
| `SetUIButtonColorDisabled` | UI Buttonの無効時色を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIButtonColorDisabled(...);` |
| `SetUIButtonColorFocused` | UI Buttonのフォーカス時色を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIButtonColorFocused(...);` |
| `SetUIButtonColorHover` | UI Buttonのホバー時色を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIButtonColorHover(...);` |
| `SetUIButtonColorPressed` | UI Buttonの押下時色を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIButtonColorPressed(...);` |
| `SetUIButtonEnabled` | UI Buttonを有効または無効にする。 | widget: UIWidget, enabled: boolean | なし | `mod.SetUIButtonEnabled(...);` |
| `SetUIImageAlpha` | UI Imageのアルファ値を変更する。 | widget: UIWidget, value: number | なし | `mod.SetUIImageAlpha(...);` |
| `SetUIImageColor` | UI Imageの色を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIImageColor(...);` |
| `SetUIImageType` | UI Imageの画像種別を変更する。 | widget: UIWidget, imageType: UIImageType | なし | `mod.SetUIImageType(...);` |
| `SetUITextAlpha` | UI Textのアルファ値を変更する。 | widget: UIWidget, value: number | なし | `mod.SetUITextAlpha(...);` |
| `SetUITextAnchor` | UI Text内の文字アンカーを変更する。 | widget: UIWidget, anchor: UIAnchor | なし | `mod.SetUITextAnchor(...);` |
| `SetUITextColor` | UI Textの文字色を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUITextColor(...);` |
| `SetUITextLabel` | UI Textに表示するMessageを変更する。表示文は `Strings.json` に登録してから参照する。 | widget: UIWidget, message: Message | なし | `mod.SetUITextLabel(widget, mod.Message(mod.stringkeys.updated));` |
| `SetUITextSize` | UI Textの文字サイズを変更する。 | widget: UIWidget, value: number | なし | `mod.SetUITextSize(...);` |
| `SetUIWidgetAnchor` | UI Widgetのアンカー位置を変更する。 | widget: UIWidget, anchor: UIAnchor | なし | `mod.SetUIWidgetAnchor(...);` |
| `SetUIWidgetBgAlpha` | UI Widget背景のアルファ値を変更する。 | widget: UIWidget, value: number | なし | `mod.SetUIWidgetBgAlpha(...);` |
| `SetUIWidgetBgColor` | UI Widget背景色を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIWidgetBgColor(...);` |
| `SetUIWidgetBgFill` | UI Widget背景の描画方法を変更する。 | widget: UIWidget, bgFill: UIBgFill | なし | `mod.SetUIWidgetBgFill(...);` |
| `SetUIWidgetDepth` | UI Widgetの描画順を変更する。 | widget: UIWidget, depth: UIDepth | なし | `mod.SetUIWidgetDepth(...);` |
| `SetUIWidgetName` | UI Widget名を変更する。 | widget: UIWidget, name: string | なし | `mod.SetUIWidgetName(...);` |
| `SetUIWidgetPadding` | UI Widgetのパディングを変更する。 | widget: UIWidget, value: number | なし | `mod.SetUIWidgetPadding(...);` |
| `SetUIWidgetParent` | UI Widgetの親Widgetを変更する。 | widget: UIWidget, parent: UIWidget | なし | `mod.SetUIWidgetParent(...);` |
| `SetUIWidgetPosition` | UI Widgetの位置を変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIWidgetPosition(...);` |
| `SetUIWidgetSize` | UI Widgetのサイズを変更する。 | widget: UIWidget, value: Vector | なし | `mod.SetUIWidgetSize(...);` |
| `SetUIWidgetVisible` | UI Widgetの表示・非表示を切り替える。 | widget: UIWidget, visible: boolean | なし | `mod.SetUIWidgetVisible(widget, false);` |
| `FindUIWidgetWithName` | 名前に一致するUI Widgetを探して取得する。 オーバーロード2種。 | name: string, searchRoot: UIWidget | `UIWidget` | `const value = mod.FindUIWidgetWithName(...);` |
| `GetUIButtonAlphaBase` | UIButtonAlphaBaseを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaBase(...);` |
| `GetUIButtonAlphaDisabled` | UIButtonAlphaDisabledを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaDisabled(...);` |
| `GetUIButtonAlphaFocused` | UIButtonAlphaFocusedを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaFocused(...);` |
| `GetUIButtonAlphaHover` | UIButtonAlphaHoverを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaHover(...);` |
| `GetUIButtonAlphaPressed` | UIButtonAlphaPressedを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUIButtonAlphaPressed(...);` |
| `GetUIButtonColorBase` | UIButtonColorBaseを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorBase(...);` |
| `GetUIButtonColorDisabled` | UIButtonColorDisabledを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorDisabled(...);` |
| `GetUIButtonColorFocused` | UIButtonColorFocusedを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorFocused(...);` |
| `GetUIButtonColorHover` | UIButtonColorHoverを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorHover(...);` |
| `GetUIButtonColorPressed` | UIButtonColorPressedを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIButtonColorPressed(...);` |
| `GetUIButtonEnabled` | UIButtonEnabledを番号または対象から取得する。 | widget: UIWidget | `boolean` | `const value = mod.GetUIButtonEnabled(...);` |
| `GetUIImageAlpha` | UIImageAlphaを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUIImageAlpha(...);` |
| `GetUIImageColor` | UIImageColorを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIImageColor(...);` |
| `GetUIImageType` | UIImageTypeを番号または対象から取得する。 | widget: UIWidget | `UIImageType` | `const value = mod.GetUIImageType(...);` |
| `GetUIRoot` | UIRootを番号または対象から取得する。 | なし | `UIWidget` | `const value = mod.GetUIRoot(...);` |
| `GetUITextAlpha` | UITextAlphaを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUITextAlpha(...);` |
| `GetUITextAnchor` | UITextAnchorを番号または対象から取得する。 | widget: UIWidget | `UIAnchor` | `const value = mod.GetUITextAnchor(...);` |
| `GetUITextColor` | UITextColorを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUITextColor(...);` |
| `GetUITextSize` | UITextSizeを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUITextSize(...);` |
| `GetUIWidgetAnchor` | UIWidgetAnchorを番号または対象から取得する。 | widget: UIWidget | `UIAnchor` | `const value = mod.GetUIWidgetAnchor(...);` |
| `GetUIWidgetBgAlpha` | UIWidgetBgAlphaを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUIWidgetBgAlpha(...);` |
| `GetUIWidgetBgColor` | UIWidgetBgColorを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetBgColor(...);` |
| `GetUIWidgetBgFill` | UIWidgetBgFillを番号または対象から取得する。 | widget: UIWidget | `UIBgFill` | `const value = mod.GetUIWidgetBgFill(...);` |
| `GetUIWidgetDepth` | UIWidgetDepthを番号または対象から取得する。 | widget: UIWidget | `UIDepth` | `const value = mod.GetUIWidgetDepth(...);` |
| `GetUIWidgetName` | UIWidgetNameを番号または対象から取得する。 | widget: UIWidget | `string` | `const value = mod.GetUIWidgetName(...);` |
| `GetUIWidgetPadding` | UIWidgetPaddingを番号または対象から取得する。 | widget: UIWidget | `number` | `const value = mod.GetUIWidgetPadding(...);` |
| `GetUIWidgetParent` | UIWidgetParentを番号または対象から取得する。 | widget: UIWidget | `UIWidget` | `const value = mod.GetUIWidgetParent(...);` |
| `GetUIWidgetPosition` | UIWidgetPositionを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetPosition(...);` |
| `GetUIWidgetSize` | UIWidgetSizeを番号または対象から取得する。 | widget: UIWidget | `Vector` | `const value = mod.GetUIWidgetSize(...);` |
| `GetUIWidgetVisible` | UIWidgetVisibleを番号または対象から取得する。 | widget: UIWidget | `boolean` | `const value = mod.GetUIWidgetVisible(...);` |
| `HasUIWidgetWithName` | 名前に一致するUI Widgetが存在するか判定する。 オーバーロード2種。 | name: string, searchRoot: UIWidget | `boolean` | `const value = mod.HasUIWidgetWithName(...);` |

## プレイヤー・チーム参照

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `SetTeam` | 指定プレイヤーの所属チームを変更する。 | player: Player, team: Team | なし | `mod.SetTeam(...);` |
| `IsFaction` | 指定チームが指定陣営を使用しているか判定する。 | team: Team, factions: Factions | `boolean` | `const value = mod.IsFaction(...);` |
| `AllPlayers` | ゲーム内の全プレイヤー配列を取得する。 | なし | `Array` | `const players = mod.AllPlayers();` |
| `ClosestPlayerTo` | 指定座標に最も近い生存プレイヤーを取得する。チームで絞り込める。 オーバーロード2種。 | vector: Vector | `Player` | `const value = mod.ClosestPlayerTo(...);` |
| `FarthestPlayerFrom` | 指定座標から最も遠い生存プレイヤーを取得する。チームで絞り込める。 オーバーロード2種。 | vector: Vector | `Player` | `const value = mod.FarthestPlayerFrom(...);` |
| `GetPlayerDeaths` | 指定プレイヤーの死亡数を取得する。 | player: Player | `number` | `const value = mod.GetPlayerDeaths(...);` |
| `GetPlayerKills` | 指定プレイヤーのキル数を取得する。 | player: Player | `number` | `const value = mod.GetPlayerKills(...);` |
| `GetSquad` | 指定プレイヤーまたはチーム・分隊番号に対応するSquadを取得する。 オーバーロード2種。 | player: Player | `Squad` | `const value = mod.GetSquad(...);` |
| `GetSquadName` | 指定Squadの名前を文字列で取得する。 | arg0: Squad | `string` | `const value = mod.GetSquadName(...);` |
| `GetTeam` | 指定プレイヤーのチーム、または指定番号に対応するTeamを取得する。 オーバーロード2種。 | player: Player | `Team` | `const team = mod.GetTeam(eventPlayer);` |
| `IsPlayerValid` | 指定Player参照が有効か判定する。 | player: Player | `boolean` | `const value = mod.IsPlayerValid(...);` |
| `IsSquadLeader` | 指定プレイヤーが分隊長か判定する。 | player: Player | `boolean` | `const value = mod.IsSquadLeader(...);` |

## 配列

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `AppendToArray` | 配列末尾へ値を追加したコピーを返す。配列同士の場合は連結される。 | array: Array, value: Any | `Array` | `const value = mod.AppendToArray(...);` |
| `ArraySlice` | 配列から指定インデックス範囲だけを取り出したコピーを返す。 | array: Array, startIndex: number, endIndex: number | `Array` | `const value = mod.ArraySlice(...);` |
| `CountOf` | 配列内の要素数を取得する。 | array: Array | `number` | `const value = mod.CountOf(...);` |
| `EmptyArray` | 空の配列を作成する。 | なし | `Array` | `const value = mod.EmptyArray(...);` |
| `FirstOf` | 配列の最初の値を取得する。 | array: Array | `Any` | `const value = mod.FirstOf(...);` |
| `LastOf` | 配列の最後の値を取得する。 | array: Array | `Any` | `const value = mod.LastOf(...);` |
| `RandomValueInArray` | 配列からランダムな値を1つ取得する。 | array: Array | `Any` | `const value = mod.RandomValueInArray(...);` |
| `RandomizedArray` | 配列の要素順をランダムに並べ替えたコピーを返す。 | array: Array | `Array` | `const value = mod.RandomizedArray(...);` |
| `SortedArray` | 配列を指定した数値基準で昇順ソートしたコピーを返す。 | array: Array, index: number | `Array` | `const value = mod.SortedArray(...);` |
| `ValueInArray` | 配列の指定インデックスにある値を取得する。 | array: Array, index: number | `Any` | `const value = mod.ValueInArray(...);` |

## ObjId取得

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `GetWaypointPath` | WaypointPathを番号または対象から取得する。 | waypointPathNumber: number | `WaypointPath` | `const value = mod.GetWaypointPath(...);` |
| `GetSFX` | SFXを番号または対象から取得する。 | number: number | `SFX` | `const value = mod.GetSFX(...);` |
| `GetVO` | VOを番号または対象から取得する。 | number: number | `VO` | `const value = mod.GetVO(...);` |
| `GetVFX` | VFXを番号または対象から取得する。 | vfxNumber: number | `VFX` | `const value = mod.GetVFX(...);` |
| `GetSpawnPoint` | SpawnPointを番号または対象から取得する。 | number: number | `SpawnPoint` | `const value = mod.GetSpawnPoint(...);` |
| `GetSpawner` | Spawnerを番号または対象から取得する。 | number: number | `Spawner` | `const value = mod.GetSpawner(...);` |
| `GetVL7Cloud` | VL7Cloudを番号または対象から取得する。 | vl7CloudId: number | `VL7Cloud` | `const value = mod.GetVL7Cloud(...);` |

## 論理・文字列・拡張

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `JsAction` | JavaScript側の独自アクションを呼ぶ。テンプレート側で拡張するとき用。 | actionName: string, actionArg0: Any, actionArg1: Any | なし | `mod.JsAction("MyAction", eventPlayer, 0);` |
| `And` | 2つの真偽値が両方trueか判定する。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.And(...);` |
| `Equals` | 2つの値が等しいか判定する。 | left: Any, right: Any | `boolean` | `const value = mod.Equals(...);` |
| `GreaterThan` | 左の数値が右の数値より大きいか判定する。 | number0: number, number1: number | `boolean` | `const value = mod.GreaterThan(...);` |
| `GreaterThanEqualTo` | 左の数値が右の数値以上か判定する。 | left: number, right: number | `boolean` | `const value = mod.GreaterThanEqualTo(...);` |
| `IfThenElse` | 条件がtrueなら第1値、falseなら第2値を返す三項演算。 | condition: boolean, trueValue: Any, falseValue: Any | `Any` | `const value = mod.IfThenElse(...);` |
| `IsType` | 値が指定型と一致するか判定する。 | value: Any, type: Types | `boolean` | `const value = mod.IsType(...);` |
| `JsValue` | JavaScript側の独自値関数を呼ぶ。戻り値をPortal側で使う。 | valueName: string, valueArg0: Any, valueArg1: Any | `Any` | `const value = mod.JsValue("MyValue", eventPlayer, 0);` |
| `LessThan` | 左の数値が右の数値より小さいか判定する。 | left: number, right: number | `boolean` | `const value = mod.LessThan(...);` |
| `LessThanEqualTo` | 左の数値が右の数値以下か判定する。 | left: number, right: number | `boolean` | `const value = mod.LessThanEqualTo(...);` |
| `Not` | 真偽値を反転する。 | boolean: boolean | `boolean` | `const value = mod.Not(...);` |
| `NotEqualTo` | 2つの値が等しくないか判定する。 | left: Any, right: Any | `boolean` | `const value = mod.NotEqualTo(...);` |
| `Or` | 2つの真偽値のどちらかがtrueか判定する。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.Or(...);` |
| `Xor` | 2つの真偽値が異なるか判定する。 | boolean0: boolean, boolean1: boolean | `boolean` | `const value = mod.Xor(...);` |
| `Concat` | 2つの文字列を連結する。 | string0: string, string1: string | `string` | `const value = mod.Concat(...);` |

## 数値・ベクトル・座標

| 関数 | 機能・目的 | 主な引数 | 戻り値 | 使用例 |
| --- | --- | --- | --- | --- |
| `GetObjId` | 配置物やオブジェクトのObjIdを取得する。Godot配置とコード参照の確認に使う。 | object: mod.Object | `number` | `const id = mod.GetObjId(eventInteractPoint);` |
| `IsCurrentMap` | 現在のマップが指定マップと一致するか判定する。 | maps: Maps | `boolean` | `const value = mod.IsCurrentMap(...);` |
| `AbsoluteValue` | 数値の絶対値を取得する。 | number: number | `number` | `const value = mod.AbsoluteValue(...);` |
| `Add` | 数値同士またはVector同士を加算する。 オーバーロード2種。 | number0: number, number1: number | `number` | `const value = mod.Add(...);` |
| `AngleBetweenVectors` | 2つのVectorの間の角度を度数で取得する。 | vector0: Vector, vector1: Vector | `number` | `const value = mod.AngleBetweenVectors(...);` |
| `AngleDifference` | 2つの角度の差を度数で取得する。 | number0: number, number1: number | `number` | `const value = mod.AngleDifference(...);` |
| `ArccosineInDegrees` | 数値の逆余弦を度数で取得する。 | number: number | `number` | `const value = mod.ArccosineInDegrees(...);` |
| `ArccosineInRadians` | 数値の逆余弦をラジアンで取得する。 | number: number | `number` | `const value = mod.ArccosineInRadians(...);` |
| `ArcsineInDegrees` | 数値の逆正弦を度数で取得する。 | number: number | `number` | `const value = mod.ArcsineInDegrees(...);` |
| `ArcsineInRadians` | 数値の逆正弦をラジアンで取得する。 | number: number | `number` | `const value = mod.ArcsineInRadians(...);` |
| `ArctangentInDegrees` | 数値の逆正接を度数で取得する。 | number: number | `number` | `const value = mod.ArctangentInDegrees(...);` |
| `ArctangentInRadians` | 数値の逆正接をラジアンで取得する。 | number: number | `number` | `const value = mod.ArctangentInRadians(...);` |
| `Ceiling` | 数値を小数点以下切り上げで整数化する。 | number: number | `number` | `const value = mod.Ceiling(...);` |
| `CosineFromDegrees` | 度数角から余弦を取得する。 | number: number | `number` | `const value = mod.CosineFromDegrees(...);` |
| `CosineFromRadians` | ラジアン角から余弦を取得する。 | number: number | `number` | `const value = mod.CosineFromRadians(...);` |
| `CreateTransform` | PositionとRotationのVectorからTransformを作成する。 | position: Vector, rotation: Vector | `Transform` | `mod.CreateTransform(pos, rot);` |
| `CreateVector` | X、Y、Zの3値からVectorを作成する。Xは左右、Yは上下、Zは前後。 | number0: number, number1: number, number2: number | `Vector` | `mod.CreateVector(0, 2, 0);` |
| `CrossProduct` | 2つのVectorの外積を取得する。平行ならゼロVectorになる。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.CrossProduct(...);` |
| `DegreesToRadians` | 度数をラジアンへ変換する。 | number: number | `number` | `const value = mod.DegreesToRadians(...);` |
| `DirectionFromAngles` | YawとPitchの角度から方向Vectorを取得する。 | number0: number, number1: number | `Vector` | `const value = mod.DirectionFromAngles(...);` |
| `DirectionTowards` | 始点から終点へ向かう正規化方向Vectorを取得する。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.DirectionTowards(...);` |
| `DistanceBetween` | 2つの座標間の距離を取得する。 | vector0: Vector, vector1: Vector | `number` | `const value = mod.DistanceBetween(...);` |
| `Divide` | 数値同士の除算、またはVectorを数値で割ったスケール済みVectorを返す。 オーバーロード2種。 | number0: number, number1: number | `number` | `const value = mod.Divide(...);` |
| `DotProduct` | 2つのVectorの内積を取得する。直交している場合は0になる。 | vector0: Vector, vector1: Vector | `number` | `const value = mod.DotProduct(...);` |
| `Floor` | 数値を小数点以下切り捨てで整数化する。 | number: number | `number` | `const value = mod.Floor(...);` |
| `Max` | 2つの数値のうち大きい方を返す。 | number0: number, number1: number | `number` | `const value = mod.Max(...);` |
| `Modulo` | 左の数値を右の数値で割った余りを返す。 | number0: number, number1: number | `number` | `const value = mod.Modulo(...);` |
| `Multiply` | 数値同士の乗算、またはVectorに数値を掛けたスケール済みVectorを返す。 オーバーロード2種。 | number0: number, number1: number | `number` | `const value = mod.Multiply(...);` |
| `Normalize` | Vectorを長さ1の単位Vectorへ正規化する。 | vector: Vector | `Vector` | `const value = mod.Normalize(...);` |
| `Pi` | 円周率の近似値を返す。 | なし | `number` | `const value = mod.Pi(...);` |
| `RadiansToDegrees` | ラジアンを度数へ変換する。 | number: number | `number` | `const value = mod.RadiansToDegrees(...);` |
| `RaiseToPower` | 左の数値を右の数値で累乗する。 | number0: number, number1: number | `number` | `const value = mod.RaiseToPower(...);` |
| `RandomReal` | 指定した最小値から最大値までのランダムな実数を返す。 | number0: number, number1: number | `number` | `const value = mod.RandomReal(...);` |
| `RoundToInteger` | 数値を四捨五入して整数化する。 | number: number | `number` | `const value = mod.RoundToInteger(...);` |
| `SineFromDegrees` | 度数角から正弦を取得する。 | number: number | `number` | `const value = mod.SineFromDegrees(...);` |
| `SineFromRadians` | ラジアン角から正弦を取得する。 | number: number | `number` | `const value = mod.SineFromRadians(...);` |
| `SquareRoot` | 数値の平方根を取得する。 | number: number | `number` | `const value = mod.SquareRoot(...);` |
| `Subtract` | 数値同士またはVector同士を減算する。 オーバーロード2種。 | number0: number, number1: number | `number` | `const value = mod.Subtract(...);` |
| `TangentFromDegrees` | 度数角から正接を取得する。 | number: number | `number` | `const value = mod.TangentFromDegrees(...);` |
| `TangentFromRadians` | ラジアン角から正接を取得する。 | number: number | `number` | `const value = mod.TangentFromRadians(...);` |
| `BackwardVector` | 後方向のVector `(0, 0, 1)` を取得する。 | なし | `Vector` | `const value = mod.BackwardVector(...);` |
| `DownVector` | 下方向のVector `(0, -1, 0)` を取得する。 | なし | `Vector` | `const value = mod.DownVector(...);` |
| `ForwardVector` | 前方向のVector `(0, 0, -1)` を取得する。 | なし | `Vector` | `const value = mod.ForwardVector(...);` |
| `LeftVector` | 左方向のVector `(-1, 0, 0)` を取得する。 | なし | `Vector` | `const value = mod.LeftVector(...);` |
| `LocalPositionOf` | ワールド座標を、指定プレイヤー基準のローカル座標へ変換する。 | vector: Vector, player: Player | `Vector` | `const value = mod.LocalPositionOf(...);` |
| `LocalVectorOf` | ワールドVectorを、指定プレイヤー基準のローカルVectorへ変換する。 | vector: Vector, player: Player | `Vector` | `const value = mod.LocalVectorOf(...);` |
| `RightVector` | 右方向のVector `(1, 0, 0)` を取得する。 | なし | `Vector` | `const value = mod.RightVector(...);` |
| `UpVector` | 上方向のVector `(0, 1, 0)` を取得する。 | なし | `Vector` | `const value = mod.UpVector(...);` |
| `VectorTowards` | 始点から終点への変位Vectorを取得する。 | vector0: Vector, vector1: Vector | `Vector` | `const value = mod.VectorTowards(...);` |
| `WorldPositionOf` | 指定プレイヤー基準のローカル座標をワールド座標へ変換する。 | vector: Vector, player: Player | `Vector` | `const value = mod.WorldPositionOf(...);` |
| `WorldVectorOf` | 指定プレイヤー基準のローカルVectorをワールドVectorへ変換する。 | vector: Vector, player: Player | `Vector` | `const value = mod.WorldVectorOf(...);` |
| `XComponentOf` | VectorのX成分を取得する。 | vector: Vector | `number` | `const value = mod.XComponentOf(...);` |
| `YComponentOf` | VectorのY成分を取得する。 | vector: Vector | `number` | `const value = mod.YComponentOf(...);` |
| `ZComponentOf` | VectorのZ成分を取得する。 | vector: Vector | `number` | `const value = mod.ZComponentOf(...);` |
| `Message` | 通知やUIへ渡すMessageを作る。表示文は `Strings.json` に登録し、`mod.stringkeys.xxx` を渡す。`{}` には追加引数が入る。 オーバーロード4種。 | msg: string \| number \| Player, msgArg0: string \| number \| Player, msgArg1: string \| number \| Player, msgArg2: string \| number \| Player | `Message` | `mod.Message(mod.stringkeys.remainingSeconds, 10);` |

# よく使う型と取得の考え方

| 型 | 主な作り方・取り方 | 用途 |
| --- | --- | --- |
| `Player` | イベント引数、`AllPlayers()`、`ClosestPlayerTo()` | プレイヤー個別の処理、通知、装備、体力、移動 |
| `Team` | `GetTeam(player)`、`GetTeam(1)` | チーム単位の勝敗、通知、スコア、所属変更 |
| `Vector` | `CreateVector(x, y, z)`、`GetObjectPosition(obj)` | 座標、方向、色、UI位置など |
| `Message` | `Message(mod.stringkeys.textKey)` | 通知、WorldIconテキスト、スコアボード見出し |
| `UIWidget` | `AddUIText()`、`AddUIButton()`、`FindUIWidgetWithName()` | HUD、ボタン、画像、コンテナ |
| `Variable` | `GlobalVariable(index)`、`ObjectVariable(obj, index)` | フェーズ、カウンタ、状態保存 |
| `mod.Object` | `Player`、`Vehicle`、`SpatialObject`などの共用型 | 移動、Transform取得、ObjId確認 |

# 実装時の注意

- `OnPlayerLeaveGame(eventNumber: number)` は `Player` ではなく番号を受け取ります。離脱後のPlayer参照は無効になりやすいので、参加時に必要な情報を変数へ保持しておきます。
- `RayCast()` の結果は戻り値では返りません。`OnRayCastHit` または `OnRayCastMissed` で受けます。
- `DisablePlayerJoin()` はSDKコメント上「戻す方法がない」とされています。公開運用で使う場合は本当に締め切る場面だけにします。
- `AddUI...` 系は作り直しすぎると重くなります。最初に作って `SetUIWidgetVisible`、`SetUITextLabel`、`SetUIWidgetPosition` で更新するのが基本です。
- `Ongoing...` 系で `AllPlayers()` や `AllVehicles()` を毎回重く回すのは避けます。必要なら数秒間隔に間引きます。
- `GetObjId()` はGodotで置いたオブジェクトとTypeScript側の参照が合っているか確認する最重要デバッグ関数です。

# 最小テンプレート

画面に出す文字は、先に `Strings.json` に登録します。

```json
{
  "ready": "ready",
  "welcome": "welcome",
  "interactId": "Interact ID:{}"
}
```

```ts
const PHASE = mod.GlobalVariable(0);

export function OnGameModeStarted(): void {
  mod.SetVariable(PHASE, 0);
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.ready));
}

export function OnPlayerJoinGame(eventPlayer: mod.Player): void {
  mod.DisplayNotificationMessage(mod.Message(mod.stringkeys.welcome), eventPlayer);
}

export function OnPlayerInteract(eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint): void {
  const id = mod.GetObjId(eventInteractPoint);
  mod.DisplayHighlightedWorldLogMessage(mod.Message(mod.stringkeys.interactId, id), eventPlayer);
}
```
