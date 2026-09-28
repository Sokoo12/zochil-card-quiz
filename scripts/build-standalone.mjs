import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(projectRoot, "dist", "client");
const assetsDir = path.join(clientDir, "assets");
const outputPath = path.join(projectRoot, "ZOCHIL-QUIZ.html");
const assetNames = await readdir(assetsDir);
const cssName = assetNames.find((name) => /^index-.*\.css$/.test(name));
const jsName = assetNames.find((name) => /^index-.*\.js$/.test(name));

if (!cssName || !jsName) throw new Error("Built CSS or JavaScript bundle was not found.");

const mimeTypes = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

const dataUrlCache = new Map();
async function getDataUrl(assetName) {
  if (dataUrlCache.has(assetName)) return dataUrlCache.get(assetName);
  const bytes = await readFile(path.join(assetsDir, assetName));
  const mimeType = mimeTypes[path.extname(assetName).toLowerCase()] || "application/octet-stream";
  const value = `data:${mimeType};base64,${bytes.toString("base64")}`;
  dataUrlCache.set(assetName, value);
  return value;
}

async function inlineAssetReferences(source) {
  const references = [...source.matchAll(/\/assets\/([A-Za-z0-9_.-]+)/g)];
  let result = source;
  for (const [, assetName] of references) {
    result = result.replaceAll(`/assets/${assetName}`, await getDataUrl(assetName));
  }
  return result;
}

const css = await inlineAssetReferences(await readFile(path.join(assetsDir, cssName), "utf8"));
const javascript = (await inlineAssetReferences(await readFile(path.join(assetsDir, jsName), "utf8")))
  .replaceAll("</script", "<\\/script");

const html = `<!doctype html>
<html lang="mn">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <title>ZOCHIL CONTENT QUIZ</title>
    <style>${css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>${javascript}</script>
  </body>
</html>
`;

if (html.includes("/assets/")) throw new Error("Standalone file still contains external asset references.");
await writeFile(outputPath, html);
console.log(`Created ${outputPath} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB)`);
