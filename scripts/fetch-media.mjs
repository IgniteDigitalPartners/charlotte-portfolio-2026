// Downloads portfolio images listed in src/data/media-sources.json into
// public/media as optimised WebP, and writes src/data/media-manifest.json.
// If an image can't be downloaded, the manifest falls back to its original URL,
// so the build never fails because of a missing image.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const sources = JSON.parse(await readFile(new URL("src/data/media-sources.json", root), "utf8"));
const outDir = new URL("public/media/", root);
await mkdir(outDir, { recursive: true });

const manifest = {};
let ok = 0;
await Promise.all(
  Object.entries(sources).map(async ([id, url]) => {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const img = sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 });
      const { data, info } = await img.toBuffer({ resolveWithObject: true });
      await writeFile(new URL(`${id}.webp`, outDir), data);
      manifest[id] = { src: `/media/${id}.webp`, width: info.width, height: info.height };
      ok++;
    } catch (err) {
      manifest[id] = { src: url, width: 1600, height: 1000 };
      console.warn(`[media] using remote URL for ${id}: ${err.message}`);
    }
  })
);
await writeFile(new URL("src/data/media-manifest.json", root), JSON.stringify(manifest, null, 2));
console.log(`[media] ${ok}/${Object.keys(sources).length} images stored locally`);
