import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterReader } from "@/components/ChapterReader";
import { getAdjacentChapters, getChapter, getChapters } from "@/lib/chapters";
import { defaultLocale, uiText } from "@/lib/i18n";

type ChapterPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const chapters = await getChapters(defaultLocale);

  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getChapter(slug, defaultLocale);

  if (!chapter) {
    return {};
  }

  const title = `${chapter.title} : ${uiText[defaultLocale].bookTitle}`;
  const description = chapter.description || uiText[defaultLocale].bookDescription;

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const [chapter, adjacent] = await Promise.all([
    getChapter(slug, defaultLocale),
    getAdjacentChapters(slug, defaultLocale),
  ]);

  if (!chapter) {
    notFound();
  }

  return <ChapterReader locale={defaultLocale} chapter={chapter} adjacent={adjacent} />;
}
