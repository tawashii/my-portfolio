import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

async function optimizeImages() {
  try {
    const images = await glob('dist/**/*.{jpg,jpeg,png,webp}');
    
    for (const image of images) {
      const imageBuffer = await fs.readFile(image);
      const sharpImage = sharp(imageBuffer);
      const metadata = await sharpImage.metadata();
      
      // Create WebP version
      const webpOutput = path.join(
        path.dirname(image),
        `${path.basename(image, path.extname(image))}.webp`
      );
      
      await sharpImage
        .webp({ quality: 80 })
        .resize({
          width: Math.min(metadata.width, 1920),
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(webpOutput);
      
      // Optimize original
      await sharpImage
        .resize({
          width: Math.min(metadata.width, 1920),
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(image + '.optimized');
      
      await fs.rename(image + '.optimized', image);
      
      console.log(`Optimized: ${image}`);
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
