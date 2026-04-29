import Image from "next/image";
import Link from "next/link";
import { getChapters } from "@/lib/chapters";

export default async function Home() {
  const chapters = await getChapters();

  return (
    <main className="site-shell">
      <section className="book-hero" aria-labelledby="book-title">
        <div className="book-hero-copy">
          <p className="book-label">Battlefield 6 Portal Book</p>
          <h1 id="book-title">Battlefield 6 Portal エクスペリエンス制作大全</h1>
          <p className="book-description">
            Battlefield 6 Portalのエクスペリエンスビルダー、Godot SDK、TypeScript、公開運営までを扱う入門書です。
            Portalカスタムでマップを編集し、ObjIdで仕掛けをつなぎ、TypeScript SDKと公式サンプルを読みながら自分のゲームモードを作れる状態を目指します。
          </p>
        </div>
        <Image
          className="book-cover"
          src="/images/bf_portal_doc/cover.png"
          alt="Battlefield 6 Portal エクスペリエンス制作大全の表紙"
          width={500}
          height={700}
          priority
          unoptimized
        />
      </section>

      <section className="chapter-list" aria-labelledby="chapters-title">
        <h2 id="chapters-title">目次</h2>
        <ol>
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link href={`/chapters/${chapter.slug}`}>
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
