/**
 * Converts raw project screenshots into optimised WebP files for the Work grid.
 *
 *   1. Drop full-size PNG/JPG screenshots into `tmp-images/` (git-ignored).
 *      Name each file after the project's `id` in `lib/projects.ts`,
 *      e.g. `tmp-images/schuul.png`.
 *   2. Run `npm run images`.
 *   3. Point the project's `screenshot` field at `/work/<id>.webp`.
 */
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const SRC = 'tmp-images';
const OUT = 'public/work';
const WIDTH = 1600;

if (!existsSync(SRC)) {
  console.error(`Create ${SRC}/ and add screenshots first.`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

for (const file of readdirSync(SRC)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const name = path.parse(file).name;
  const out = path.join(OUT, `${name}.webp`);
  await sharp(path.join(SRC, file))
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log(`${out} → ${(statSync(out).size / 1024).toFixed(0)} KB`);
}
