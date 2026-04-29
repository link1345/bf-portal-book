import fs from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";
import matter from "gray-matter";
import markdownToHtml from "zenn-markdown-html";
import { withBasePath } from "@/lib/basePath";
import { defaultLocale, type Locale } from "@/lib/i18n";

const localesDirectory = path.join(process.cwd(), "content", "locales");
const chapterSorter = new Intl.Collator("ja", {
  numeric: true,
  sensitivity: "base",
});

export type Chapter = {
  slug: string;
  title: string;
  description: string;
  order: number;
};

export type ChapterWithHtml = Chapter & {
  html: string;
  headings: ChapterHeading[];
};

export type ChapterHeading = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

type ChapterMatter = {
  title?: string;
  description?: string;
  order?: number;
};

type ChapterFile = Chapter & {
  content: string;
};

function slugFromFilename(filename: string) {
  return filename.replace(/\.md$/, "");
}

function toChapter(chapter: ChapterFile): Chapter {
  return {
    slug: chapter.slug,
    title: chapter.title,
    description: chapter.description,
    order: chapter.order,
  };
}

function extractHeadings(html: string): ChapterHeading[] {
  const $ = cheerio.load(html);

  return $("h1[id], h2[id], h3[id]")
    .toArray()
    .map((element) => {
      const heading = $(element);
      const tagName = element.tagName.toLowerCase();

      return {
        id: heading.attr("id") ?? "",
        text: heading.clone().children(".header-anchor-link").remove().end().text().trim(),
        level: Number(tagName.replace("h", "")) as ChapterHeading["level"],
      };
    })
    .filter((heading) => heading.id && heading.text);
}

function applyBasePathToAssetUrls(html: string) {
  const $ = cheerio.load(html, null, false);

  $("img[src]").each((_, element) => {
    const image = $(element);
    const src = image.attr("src");

    if (src?.startsWith("/")) {
      image.attr("src", withBasePath(src));
    }
  });

  return $.root().html() ?? html;
}

function getChaptersDirectory(locale: Locale) {
  return path.join(localesDirectory, locale, "chapters");
}

async function readChapterFile(filename: string, locale: Locale): Promise<ChapterFile> {
  const slug = slugFromFilename(filename);
  const filePath = path.join(getChaptersDirectory(locale), filename);
  const file = await fs.readFile(filePath, "utf8");
  const parsed = matter(file);
  const data = parsed.data as ChapterMatter;

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    order: data.order ?? Number.MAX_SAFE_INTEGER,
    content: parsed.content,
  };
}

export async function getChapters(locale: Locale = defaultLocale): Promise<Chapter[]> {
  const filenames = await fs.readdir(getChaptersDirectory(locale));
  const chapters = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => readChapterFile(filename, locale)),
  );

  return chapters
    .map(toChapter)
    .sort((a, b) => a.order - b.order || chapterSorter.compare(a.slug, b.slug));
}

export async function getChapter(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<ChapterWithHtml | null> {
  const filename = `${slug}.md`;

  try {
    const chapter = await readChapterFile(filename, locale);
    const html = applyBasePathToAssetUrls(
      await markdownToHtml(chapter.content, {
        embedOrigin: "https://embed.zenn.studio",
      }),
    );

    return {
      ...toChapter(chapter),
      html,
      headings: extractHeadings(html),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function getAdjacentChapters(slug: string, locale: Locale = defaultLocale) {
  const chapters = await getChapters(locale);
  const index = chapters.findIndex((chapter) => chapter.slug === slug);

  return {
    previous: index > 0 ? chapters[index - 1] : null,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}
