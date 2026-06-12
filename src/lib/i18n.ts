export const locales = ["ja", "en", "zh-CN", "zh-TW"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

export const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export const localeHtmlLang: Record<Locale, string> = {
  ja: "ja",
  en: "en",
  "zh-CN": "zh-Hans",
  "zh-TW": "zh-Hant",
};

export const uiText: Record<
  Locale,
  {
    bookLabel: string;
    bookTitle: string;
    bookDescription: string;
    seoIntroTitle: string;
    seoIntro: string;
    seoTopics: string[];
    coverAlt: string;
    chaptersTitle: string;
    backToContents: string;
    readerNavLabel: string;
    pagerLabel: string;
    previous: string;
    next: string;
    headingsTitle: string;
    noHeadings: string;
    languageLabel: string;
    translationNotice: string;
  }
> = {
  ja: {
    bookLabel: "Battlefield 6 Portal Book",
    bookTitle: "Battlefield 6 Portal エクスペリエンス制作大全",
    bookDescription:
      "BF6 Portalの作り方を、エクスペリエンスビルダー、Portalカスタム、Godot SDK、TypeScript SDK、公式サンプル、公開運営まで順に学ぶ日本語リファレンスです。マップ編集、ObjIdによる仕掛けの接続、ゲームモード制作の手順を解説します。",
    seoIntroTitle: "BF6 Portalの作り方とリファレンス",
    seoIntro:
      "この解説本は、Battlefield 6 Portalで自分のゲームモードやカスタムサーバーを作りたい人向けの日本語ガイドです。BF6 Portalの始め方、Portal Builderの基本、マップエディタ、ルールエディタ、TypeScript API、イベントとアクション、公式サンプルの読み方を、実際に制作するときの順番で整理しています。検索で「BF6 Portal 作り方」「BF6 Portal リファレンス」「BF6 Protal 作り方」「BF6 Protal リファレンス」と調べている人が、必要な章へ進める入口になることを目指しています。",
    seoTopics: [
      "BF6 Portal 作り方",
      "BF6 Portal リファレンス",
      "BF6 Protal 作り方",
      "BF6 Protal リファレンス",
      "Battlefield 6 Portal TypeScript SDK",
      "Portal Builder",
      "Portal Custom",
    ],
    coverAlt: "Battlefield 6 Portal エクスペリエンス制作大全の表紙",
    chaptersTitle: "目次",
    backToContents: "目次へ戻る",
    readerNavLabel: "読書ナビゲーション",
    pagerLabel: "前後の章",
    previous: "前へ",
    next: "次へ",
    headingsTitle: "見出し一覧",
    noHeadings: "この章には見出しがありません。",
    languageLabel: "言語",
    translationNotice:
      "日本語を原文として制作しています。英語・中国語（簡体字／繁体字）は機械翻訳のため、意図と異なる表現になっている可能性があります。",
  },
  en: {
    bookLabel: "Battlefield 6 Portal Book",
    bookTitle: "Battlefield 6 Portal Experience Creation Handbook",
    bookDescription:
      "A guide and reference for building BF6 Portal experiences with Experience Builder, Portal Custom, the Godot SDK, TypeScript SDK, official samples, publishing, and operations.",
    seoIntroTitle: "How to Build BF6 Portal Experiences",
    seoIntro:
      "This handbook explains how to create Battlefield 6 Portal game modes and custom servers, from the first setup through Portal Builder, map editing, rule editing, TypeScript APIs, events, actions, and official sample projects. It is written as a practical BF6 Portal reference for creators who want to move from basic editor usage to their own playable experience.",
    seoTopics: [
      "BF6 Portal guide",
      "BF6 Portal reference",
      "Battlefield 6 Portal TypeScript SDK",
      "Portal Builder",
      "Portal Custom",
    ],
    coverAlt: "Cover of Battlefield 6 Portal Experience Creation Handbook",
    chaptersTitle: "Contents",
    backToContents: "Back to contents",
    readerNavLabel: "Reader navigation",
    pagerLabel: "Previous and next chapters",
    previous: "Previous",
    next: "Next",
    headingsTitle: "Headings",
    noHeadings: "This chapter has no headings.",
    languageLabel: "Language",
    translationNotice:
      "This book is written primarily in Japanese. The English and Chinese (Simplified/Traditional) versions are machine translated, so some wording may differ from the intended meaning.",
  },
  "zh-CN": {
    bookLabel: "Battlefield 6 Portal Book",
    bookTitle: "Battlefield 6 Portal 体验制作大全",
    bookDescription:
      "一本 BF6 Portal 制作指南和参考资料，涵盖体验构建器、Portal Custom、Godot SDK、TypeScript SDK、官方示例、发布和运营。",
    seoIntroTitle: "BF6 Portal 制作指南与参考",
    seoIntro:
      "本书面向想在 Battlefield 6 Portal 中制作自定义游戏模式和服务器的创作者，按实际制作顺序整理 Portal Builder、地图编辑器、规则编辑器、TypeScript API、事件、动作以及官方示例的阅读方法。",
    seoTopics: [
      "BF6 Portal 制作",
      "BF6 Portal 参考",
      "Battlefield 6 Portal TypeScript SDK",
      "Portal Builder",
      "Portal Custom",
    ],
    coverAlt: "Battlefield 6 Portal 体验制作大全封面",
    chaptersTitle: "目录",
    backToContents: "返回目录",
    readerNavLabel: "阅读导航",
    pagerLabel: "上一章和下一章",
    previous: "上一章",
    next: "下一章",
    headingsTitle: "标题列表",
    noHeadings: "本章没有标题。",
    languageLabel: "语言",
    translationNotice:
      "本书以日语原文为准。英语和中文（简体/繁体）为机器翻译，因此部分表述可能与原意不同。",
  },
  "zh-TW": {
    bookLabel: "Battlefield 6 Portal Book",
    bookTitle: "Battlefield 6 Portal 體驗製作大全",
    bookDescription:
      "一本 BF6 Portal 製作指南與參考資料，涵蓋體驗建構器、Portal Custom、Godot SDK、TypeScript SDK、官方範例、發布與營運。",
    seoIntroTitle: "BF6 Portal 製作指南與參考",
    seoIntro:
      "本書面向想在 Battlefield 6 Portal 中製作自訂遊戲模式與伺服器的創作者，依照實際製作順序整理 Portal Builder、地圖編輯器、規則編輯器、TypeScript API、事件、動作以及官方範例的閱讀方法。",
    seoTopics: [
      "BF6 Portal 製作",
      "BF6 Portal 參考",
      "Battlefield 6 Portal TypeScript SDK",
      "Portal Builder",
      "Portal Custom",
    ],
    coverAlt: "Battlefield 6 Portal 體驗製作大全封面",
    chaptersTitle: "目錄",
    backToContents: "返回目錄",
    readerNavLabel: "閱讀導覽",
    pagerLabel: "上一章與下一章",
    previous: "上一章",
    next: "下一章",
    headingsTitle: "標題列表",
    noHeadings: "本章沒有標題。",
    languageLabel: "語言",
    translationNotice:
      "本書以日文原文為準。英文與中文（簡體／繁體）為機器翻譯，因此部分表述可能與原意不同。",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleHomePath(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

export function getChapterPath(locale: Locale, slug: string) {
  return locale === defaultLocale ? `/chapters/${slug}` : `/${locale}/chapters/${slug}`;
}
