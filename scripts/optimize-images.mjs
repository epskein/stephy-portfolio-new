import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const DIRS_TO_PROCESS = [
  'public/assets/gallery/live',
  'public/assets/gallery/portraits',
  'public/assets',
];

const SINGLE_FILES = [
  'public/assets/hero-image.jpg',
  'public/assets/StephyLongueira6.jpg',
];

const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return;
  }

  // Skip .original backup files
  if (inputPath.endsWith('.original')) {
    return;
  }

  const stats = fs.statSync(inputPath);
  const sizeKB = Math.round(stats.size / 1024);
  
  // Skip if already small (under 500KB)
  if (sizeKB < 500) {
    console.log(`SKIP (already small): ${inputPath} (${sizeKB}KB)`);
    return;
  }

  console.log(`Processing: ${inputPath} (${sizeKB}KB)`);

  try {
    // Read entire file into buffer first to avoid Windows file locking issues
    const inputBuffer = fs.readFileSync(inputPath);
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();

    let pipeline = sharp(inputBuffer);

    // Resize if wider than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
      });
    }

    // Output as optimized JPEG (keeping same extension for compatibility)
    const buffer = await pipeline
      .jpeg({ quality: QUALITY, progressive: true })
      .toBuffer();

    // Backup original
    const backupPath = inputPath + '.original';
    if (!fs.existsSync(backupPath)) {
      fs.writeFileSync(backupPath, inputBuffer);
    }

    fs.writeFileSync(inputPath, buffer);

    const newSize = Math.round(buffer.length / 1024);
    console.log(`  -> Compressed to ${newSize}KB (was ${sizeKB}KB)`);
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
  }
}

async function processDirectory(dirPath) {
  const fullPath = path.join(rootDir, dirPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Directory not found: ${fullPath}`);
    return;
  }

  const files = fs.readdirSync(fullPath);
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      await optimizeImage(filePath);
    }
  }
}

async function main() {
  console.log('Starting image optimization...\n');

  for (const dir of DIRS_TO_PROCESS) {
    console.log(`\n=== Processing ${dir} ===`);
    await processDirectory(dir);
  }

  for (const file of SINGLE_FILES) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      await optimizeImage(fullPath);
    }
  }

  console.log('\nDone!');
}

main();
