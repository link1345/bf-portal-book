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
  }
> = {
  ja: {
    bookLabel: "Battlefield 6 Portal Book",
    bookTitle: "Battlefield 6 Portal エクスペリエンス制作大全",
    bookDescription:
      "Battlefield 6 Portalのエクスペリエンスビルダー、Godot SDK、TypeScript、公開運営までを扱う入門書です。Portalカスタムでマップを編集し、ObjIdで仕掛けをつなぎ、TypeScript SDKと公式サンプルを読みながら自分のゲームモードを作れる状態を目指します。",
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
  },
  en: {
    bookLabel: "Battlefield 6 Portal Book",
    bookTitle: "Battlefield 6 Portal Experience Creation Handbook",
    bookDescription:
      "An introductory book covering Battlefield 6 Portal Experience Builder, the Godot SDK, TypeScript, publishing, and operations. Learn to edit maps, connect objects with ObjId, and read the TypeScript SDK and official samples so you can build your own game modes.",
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
  },
  "zh-CN": {
    bookLabel: "Battlefield 6 Portal Book",
    bookTitle: "Battlefield 6 Portal 体验制作大全",
    bookDescription:
      "一本入门书，涵盖 Battlefield 6 Portal 的体验构建器、Godot SDK、TypeScript、发布和运营。学习编辑地图、用 ObjId 连接机关，并阅读 TypeScript SDK 与官方示例，最终制作自己的游戏模式。",
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
  },
  "zh-TW": {
    bookLabel: "Battlefield 6 Portal Book",
    bookTitle: "Battlefield 6 Portal 體驗製作大全",
    bookDescription:
      "一本入門書，涵蓋 Battlefield 6 Portal 的體驗建構器、Godot SDK、TypeScript、發布與營運。學習編輯地圖、用 ObjId 連接機關，並閱讀 TypeScript SDK 與官方範例，最後製作自己的遊戲模式。",
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
