import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "content", "chapters");
const outputRoot = path.join(root, "content", "locales");
const locales = [
  { code: "en", target: "en" },
  { code: "zh-CN", target: "zh-CN" },
  { code: "zh-TW", target: "zh-TW" },
];

const cache = new Map();

function protect(text) {
  const values = [];
  const store = (value) => {
    const token = `https://codex.local/keep/${values.length}`;
    values.push(value);
    return token;
  };

  let protectedText = text
    .replace(/(?<=\]\()[^)]+(?=\))/g, store)
    .replace(/`[^`]+`/g, store)
    .replace(/https?:\/\/(?!codex\.local\/keep\/)[^\s)]+/g, store);

  return {
    text: protectedText,
    restore(translated) {
      return values.reduce(
        (current, value, index) =>
          current.replaceAll(`https://codex.local/keep/${index}`, value),
        translated,
      );
    },
  };
}

function shouldKeepLine(line) {
  const trimmed = line.trim();

  return (
    trimmed === "" ||
    trimmed === "---" ||
    trimmed.startsWith("```") ||
    trimmed.startsWith("$$") ||
    /^free:\s/.test(trimmed) ||
    /^order:\s/.test(trimmed)
  );
}

function extractImage(line) {
  const match = line.match(/^(\s*)!\[(.*)]\(([^)]+)\)(.*)$/);

  if (!match) {
    return null;
  }

  return {
    indent: match[1],
    alt: match[2],
    src: match[3],
    suffix: match[4],
  };
}

function extractFrontmatterValue(line) {
  const match = line.match(/^(\s*(?:title|description):\s*)["']?(.*?)["']?\s*$/);

  if (!match) {
    return null;
  }

  return {
    prefix: match[1],
    value: match[2],
  };
}

async function translateText(text, target) {
  if (!text.trim()) {
    return text;
  }

  const key = `${target}\n${text}`;
  const cached = cache.get(key);

  if (cached) {
    return cached;
  }

  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "ja");
  url.searchParams.set("tl", target);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Translate failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const translated = data[0].map((item) => item[0]).join("");
  cache.set(key, translated);

  return translated;
}

async function translateBatch(items, target) {
  const results = [];
  let batch = [];
  let batchLength = 0;

  async function flush() {
    if (batch.length === 0) {
      return;
    }

    const text = batch
      .map((item, index) => `${item.text}\n<seg id="${index}"></seg>`)
      .join("\n");
    const translated = await translateText(text, target);
    const parts = translated.split(/\n?<seg id="\d+"><\/seg>\n?/);

    batch.forEach((item, index) => {
      results.push({
        index: item.index,
        line: item.format(parts[index]?.trimEnd() ?? ""),
      });
    });

    batch = [];
    batchLength = 0;
  }

  for (const item of items) {
    if (batchLength + item.text.length > 1400) {
      await flush();
    }

    batch.push(item);
    batchLength += item.text.length;
  }

  await flush();

  return results;
}

function createTranslatableLine(line, index) {
  const frontmatter = extractFrontmatterValue(line);

  if (frontmatter) {
    return {
      index,
      text: frontmatter.value,
      format: (translated) => `${frontmatter.prefix}"${translated}"`,
    };
  }

  const image = extractImage(line);

  if (image) {
    if (!image.alt) {
      return {
        index,
        text: image.alt,
        format: () => line,
      };
    }

    return {
      index,
      text: image.alt,
      format: (translated) => `${image.indent}![${translated}](${image.src})${image.suffix}`,
    };
  }

  const protectedLine = protect(line);

  return {
    index,
    text: protectedLine.text,
    format: (translated) => protectedLine.restore(translated),
  };
}

async function translateMarkdown(source, target) {
  const lines = source.split("\n");
  const translated = [];
  const items = [];
  let inCodeBlock = false;

  for (const [index, line] of lines.entries()) {
    if (line.trim().startsWith("```")) {
      translated[index] = line;
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock || shouldKeepLine(line)) {
      translated[index] = line;
      continue;
    }

    items.push(createTranslatableLine(line, index));
  }

  const batchResults = await translateBatch(items, target);
  batchResults.forEach((item) => {
    translated[item.index] = item.line;
  });

  return translated.join("\n");
}

async function main() {
  const filenames = (await readdir(sourceDir))
    .filter((filename) => filename.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b, "ja", { numeric: true }));

  for (const locale of locales) {
    const outputDir = path.join(outputRoot, locale.code, "chapters");
    await mkdir(outputDir, { recursive: true });

    for (const filename of filenames) {
      const source = await readFile(path.join(sourceDir, filename), "utf8");
      const translated = await translateMarkdown(source, locale.target);
      await writeFile(path.join(outputDir, filename), translated, "utf8");
      console.log(`${locale.code}/${filename}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
