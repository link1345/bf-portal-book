import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterArticle } from "@/components/ChapterArticle";
import { ZennEmbedLoader } from "@/components/ZennEmbedLoader";
import { getAdjacentChapters, getChapter, getChapters } from "@/lib/chapters";

type ChapterPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const chapters = await getChapters();

  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getChapter(slug);

  if (!chapter) {
    return {};
  }

  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const [chapter, adjacent] = await Promise.all([
    getChapter(slug),
    getAdjacentChapters(slug),
  ]);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="reader-shell">
      <ZennEmbedLoader />
      <nav className="reader-nav" aria-label="読書ナビゲーション">
        <Link href="/">目次へ戻る</Link>
      </nav>

      <div className="reader-layout">
        <div>
          <header className="reader-header">
            <p>{chapter.title}</p>
            <h1>{chapter.title}</h1>
            {chapter.description ? <small>{chapter.description}</small> : null}
          </header>

          <ChapterArticle html={chapter.html} />

          <nav className="reader-pager" aria-label="前後の章">
            {adjacent.previous ? (
              <Link href={`/chapters/${adjacent.previous.slug}`}>
                前へ: {adjacent.previous.title}
              </Link>
            ) : null}
            {adjacent.next ? (
              <Link href={`/chapters/${adjacent.next.slug}`}>
                次へ: {adjacent.next.title}
              </Link>
            ) : null}
          </nav>
        </div>

        <aside className="heading-sidebar" aria-labelledby="heading-sidebar-title">
          <h2 id="heading-sidebar-title">見出し一覧</h2>
          {chapter.headings.length > 0 ? (
            <ol>
              {chapter.headings.map((heading) => (
                <li key={heading.id} data-level={heading.level}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          ) : (
            <p>この章には見出しがありません。</p>
          )}
        </aside>
      </div>
    </main>
  );
}
