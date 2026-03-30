/**
 * Regenerates raster brand marks from `public/favicon.svg`.
 * Run: npm run build:brand-images
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const svgPath = path.join(root, 'public', 'favicon.svg');
const outDir = path.join(root, 'public', 'images');

const buf = fs.readFileSync(svgPath);
await fs.promises.mkdir(outDir, { recursive: true });

const raster = () =>
  sharp(buf).resize(192, 192, { fit: 'contain', background: { r: 5, g: 5, b: 5, alpha: 0 } });

await raster().webp({ quality: 88 }).toFile(path.join(outDir, 'medicore-mark.webp'));
await raster().avif({ quality: 55 }).toFile(path.join(outDir, 'medicore-mark.avif'));

console.log('Wrote public/images/medicore-mark.webp and .avif');
