import type { Metadata } from "next";
import { BookHome } from "@/components/BookHome";
import { getChapters } from "@/lib/chapters";
import { defaultLocale, uiText } from "@/lib/i18n";

export const metadata: Metadata = {
  title: uiText[defaultLocale].bookTitle,
  description: uiText[defaultLocale].bookDescription,
};

export default async function Home() {
  const chapters = await getChapters(defaultLocale);

  return <BookHome locale={defaultLocale} chapters={chapters} />;
}
