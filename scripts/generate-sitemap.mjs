import fs from "node:fs/promises";
import path from "node:path";

const locales = ["ja", "en", "zh-CN", "zh-TW"];
const defaultLocale = "ja";
const contentDirectory = path.join(process.cwd(), "content", "locales");
const outputPath = path.join(process.cwd(), "public", "sitemap.xml");

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

async function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL);
  }

  try {
    const cname = await fs.readFile(path.join(process.cwd(), "CNAME"), "utf8");
    return `https://${trimTrailingSlash(cname.trim())}`;
  } catch {
    return "https://bf6-book.orizika.com";
  }
}

function withBasePath(pathname) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!basePath || !pathname.startsWith("/")) {
    return pathname;
  }

  if (pathname === basePath || pathname.startsWith(`${basePath}/`)) {
    return pathname;
  }

  return `${basePath}${pathname}`;
}

function getLocaleHomePath(locale) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

function getChapterPath(locale, slug) {
  return locale === defaultLocale ? `/chapters/${slug}` : `/${locale}/chapters/${slug}`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getChapters(locale) {
  const chaptersDirectory = path.join(contentDirectory, locale, "chapters");
  const filenames = await fs.readdir(chaptersDirectory);

  return Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const filePath = path.join(chaptersDirectory, filename);
        const stats = await fs.stat(filePath);

        return {
          slug: filename.replace(/\.md$/, ""),
          lastModified: stats.mtime,
        };
      }),
  );
}

function latestDate(dates) {
  return new Date(Math.max(...dates.map((date) => date.getTime()))).toISOString();
}

function createUrlEntry({ url, lastModified, alternates, changeFrequency, priority }) {
  const alternateLinks = Object.entries(alternates)
    .map(
      ([locale, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(locale)}" href="${escapeXml(
          href,
        )}" />`,
    )
    .join("\n");

  return [
    "  <url>",
    `    <loc>${escapeXml(url)}</loc>`,
    alternateLinks,
    `    <lastmod>${lastModified}</lastmod>`,
    `    <changefreq>${changeFrequency}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

const siteUrl = await getSiteUrl();
const absoluteUrl = (pathname) => `${siteUrl}${withBasePath(pathname)}`;
const chaptersByLocale = Object.fromEntries(
  await Promise.all(locales.map(async (locale) => [locale, await getChapters(locale)])),
);
const allChapterSlugs = Array.from(
  new Set(locales.flatMap((locale) => chaptersByLocale[locale].map((chapter) => chapter.slug))),
);
const homePaths = Object.fromEntries(locales.map((locale) => [locale, getLocaleHomePath(locale)]));
const homeLastModified = latestDate(
  locales.flatMap((locale) => chaptersByLocale[locale].map((chapter) => chapter.lastModified)),
);

const entries = [
  ...locales.map((locale) => ({
    url: absoluteUrl(getLocaleHomePath(locale)),
    lastModified: homeLastModified,
    alternates: Object.fromEntries(
      Object.entries(homePaths).map(([locale, pathname]) => [locale, absoluteUrl(pathname)]),
    ),
    changeFrequency: "weekly",
    priority: locale === defaultLocale ? "1" : "0.8",
  })),
  ...allChapterSlugs.flatMap((slug) => {
    const paths = Object.fromEntries(
      locales
        .filter((locale) => chaptersByLocale[locale].some((chapter) => chapter.slug === slug))
        .map((locale) => [locale, getChapterPath(locale, slug)]),
    );
    const lastModified = latestDate(
      locales
        .flatMap((locale) => chaptersByLocale[locale])
        .filter((chapter) => chapter.slug === slug)
        .map((chapter) => chapter.lastModified),
    );

    return Object.entries(paths).map(([locale, pathname]) => ({
      url: absoluteUrl(pathname),
      lastModified,
      alternates: Object.fromEntries(
        Object.entries(paths).map(([locale, pathname]) => [locale, absoluteUrl(pathname)]),
      ),
      changeFrequency: "monthly",
      priority: locale === defaultLocale ? "0.7" : "0.5",
    }));
  }),
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries.map(createUrlEntry),
  "</urlset>",
  "",
].join("\n");

await fs.writeFile(outputPath, sitemap);

console.log(`Generated ${path.relative(process.cwd(), outputPath)} with ${entries.length} URLs.`);
