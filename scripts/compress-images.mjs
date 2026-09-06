import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import path from "path";

const SRC = "tmp-images";
const OUT = "public/services";
const LIMIT = 100 * 1024; // 100KB hard limit

for (const f of readdirSync(SRC)) {
  const name = path.parse(f).name;
  const out = path.join(OUT, `${name}.webp`);
  let quality = 75;
  let buf;
  do {
    buf = await sharp(path.join(SRC, f))
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    quality -= 5;
  } while (buf.length > LIMIT && quality >= 30);
  if (buf.length > LIMIT) {
    // last resort: shrink dimensions
    buf = await sharp(path.join(SRC, f))
      .resize({ width: 640 })
      .webp({ quality: 40 })
      .toBuffer();
  }
  await sharp(buf).toFile(out);
  console.log(`${name}.webp -> ${(buf.length / 1024).toFixed(1)} KB`);
}
