import fs from "node:fs/promises";
import path from "node:path";

const oldBasePath = "/bf-portal-book";
const publicDirectory = path.join(process.cwd(), "public");
const sitemapPath = path.join(publicDirectory, "sitemap.xml");
const redirectDirectory = path.join(publicDirectory, oldBasePath);

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizePathname(pathname) {
  if (pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

function getRedirectOutputPath(pathname) {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === "/") {
    return [path.join(redirectDirectory, "index.html")];
  }

  return [
    path.join(publicDirectory, `${oldBasePath}${normalizedPathname}.html`),
    path.join(publicDirectory, oldBasePath, normalizedPathname, "index.html"),
  ];
}

function createRedirectHtml(destination) {
  const escapedDestination = escapeHtml(destination);

  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=${escapedDestination}">
    <link rel="canonical" href="${escapedDestination}">
    <title>Redirecting...</title>
    <script>
      location.replace(${JSON.stringify(destination)});
    </script>
  </head>
  <body>
    <p><a href="${escapedDestination}">Redirecting...</a></p>
  </body>
</html>
`;
}

async function removeExistingRedirects() {
  await fs.rm(redirectDirectory, { force: true, recursive: true });
}

const sitemap = await fs.readFile(sitemapPath, "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const urls = locs.map((loc) => new URL(loc));
const uniquePathnames = [...new Set(urls.map((url) => normalizePathname(url.pathname)))];

await removeExistingRedirects();

await Promise.all(
  uniquePathnames.map(async (pathname) => {
    const destination = `${urls[0].origin}${pathname}`;
    const outputPaths = getRedirectOutputPath(pathname);

    await Promise.all(
      outputPaths.map(async (outputPath) => {
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, createRedirectHtml(destination));
      }),
    );
  }),
);

console.log(`Generated GitHub Pages redirect pages for ${uniquePathnames.length} old URLs.`);
