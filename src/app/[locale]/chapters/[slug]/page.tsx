import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterReader } from "@/components/ChapterReader";
import { getAdjacentChapters, getChapter, getChapters } from "@/lib/chapters";
import { isLocale, locales } from "@/lib/i18n";

type LocalizedChapterPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) => {
      const chapters = await getChapters(locale);

      return chapters.map((chapter) => ({
        locale,
        slug: chapter.slug,
      }));
    }),
  );

  return params.flat();
}

export async function generateMetadata({
  params,
}: LocalizedChapterPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const chapter = await getChapter(slug, locale);

  if (!chapter) {
    return {};
  }

  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function LocalizedChapterPage({
  params,
}: LocalizedChapterPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [chapter, adjacent] = await Promise.all([
    getChapter(slug, locale),
    getAdjacentChapters(slug, locale),
  ]);

  if (!chapter) {
    notFound();
  }

  return <ChapterReader locale={locale} chapter={chapter} adjacent={adjacent} />;
}
