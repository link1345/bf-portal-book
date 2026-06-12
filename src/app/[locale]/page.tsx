import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookHome } from "@/components/BookHome";
import { getChapters } from "@/lib/chapters";
import { isLocale, locales, uiText } from "@/lib/i18n";

type LocalizedHomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedHomeProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: uiText[locale].bookTitle,
    description: uiText[locale].bookDescription,
    keywords: uiText[locale].seoTopics,
    openGraph: {
      title: uiText[locale].bookTitle,
      description: uiText[locale].bookDescription,
      type: "website",
    },
  };
}

export default async function LocalizedHome({ params }: LocalizedHomeProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const chapters = await getChapters(locale);

  return <BookHome locale={locale} chapters={chapters} />;
}
