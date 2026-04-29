import Link from "next/link";
import { ChapterArticle } from "@/components/ChapterArticle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ZennEmbedLoader } from "@/components/ZennEmbedLoader";
import type { Chapter, ChapterWithHtml } from "@/lib/chapters";
import {
  getChapterPath,
  getLocaleHomePath,
  localeHtmlLang,
  type Locale,
  uiText,
} from "@/lib/i18n";

type ChapterReaderProps = {
  locale: Locale;
  chapter: ChapterWithHtml;
  adjacent: {
    previous: Chapter | null;
    next: Chapter | null;
  };
};

export function ChapterReader({ locale, chapter, adjacent }: ChapterReaderProps) {
  const text = uiText[locale];

  return (
    <main className="reader-shell" lang={localeHtmlLang[locale]}>
      <ZennEmbedLoader />
      <div className="reader-topbar">
        <nav className="reader-nav" aria-label={text.readerNavLabel}>
          <Link href={getLocaleHomePath(locale)}>{text.backToContents}</Link>
        </nav>
        <LanguageSwitcher
          currentLocale={locale}
          label={text.languageLabel}
          getHref={(targetLocale) => getChapterPath(targetLocale, chapter.slug)}
        />
      </div>

      <div className="reader-layout">
        <div>
          <header className="reader-header">
            <p>{chapter.title}</p>
            <h1>{chapter.title}</h1>
            {chapter.description ? <small>{chapter.description}</small> : null}
          </header>

          <ChapterArticle html={chapter.html} />

          <nav className="reader-pager" aria-label={text.pagerLabel}>
            {adjacent.previous ? (
              <Link href={getChapterPath(locale, adjacent.previous.slug)}>
                {text.previous}: {adjacent.previous.title}
              </Link>
            ) : null}
            {adjacent.next ? (
              <Link href={getChapterPath(locale, adjacent.next.slug)}>
                {text.next}: {adjacent.next.title}
              </Link>
            ) : null}
          </nav>
        </div>

        <aside className="heading-sidebar" aria-labelledby="heading-sidebar-title">
          <h2 id="heading-sidebar-title">{text.headingsTitle}</h2>
          {chapter.headings.length > 0 ? (
            <ol>
              {chapter.headings.map((heading) => (
                <li key={heading.id} data-level={heading.level}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          ) : (
            <p>{text.noHeadings}</p>
          )}
        </aside>
      </div>
    </main>
  );
}
