import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import {
  getChapterPath,
  getLocaleHomePath,
  localeHtmlLang,
  type Locale,
  uiText,
} from "@/lib/i18n";
import type { Chapter } from "@/lib/chapters";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type BookHomeProps = {
  locale: Locale;
  chapters: Chapter[];
};

export function BookHome({ locale, chapters }: BookHomeProps) {
  const text = uiText[locale];

  return (
    <main className="site-shell" lang={localeHtmlLang[locale]}>
      <LanguageSwitcher
        currentLocale={locale}
        label={text.languageLabel}
        getHref={getLocaleHomePath}
      />

      <section className="book-hero" aria-labelledby="book-title">
        <div className="book-hero-copy">
          <p className="book-label">{text.bookLabel}</p>
          <h1 id="book-title">{text.bookTitle}</h1>
          <p className="book-description">{text.bookDescription}</p>
        </div>
        <Image
          className="book-cover"
          src={withBasePath("/images/bf_portal_doc/cover.png")}
          alt={text.coverAlt}
          width={500}
          height={700}
          priority
          unoptimized
        />
      </section>

      <section className="chapter-list" aria-labelledby="chapters-title">
        <h2 id="chapters-title">{text.chaptersTitle}</h2>
        <ol>
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link href={getChapterPath(locale, chapter.slug)}>
                <span>{chapter.title}</span>
                {chapter.description ? <small>{chapter.description}</small> : null}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
