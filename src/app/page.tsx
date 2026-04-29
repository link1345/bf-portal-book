import { BookHome } from "@/components/BookHome";
import { getChapters } from "@/lib/chapters";
import { defaultLocale } from "@/lib/i18n";

export default async function Home() {
  const chapters = await getChapters(defaultLocale);

  return <BookHome locale={defaultLocale} chapters={chapters} />;
}
