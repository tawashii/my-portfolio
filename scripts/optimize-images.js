// Image optimization script (optional)
// Install sharp package: npm install sharp

async function optimizeImages() {
  try {
    // Check if sharp is available
    let sharp;
    try {
      sharp = await import('sharp');
      sharp = sharp.default;
    } catch (error) {
      console.log('Sharp package not found. Skipping image optimization.');
      console.log('To enable image optimization, run: npm install sharp');
      return;
    }

    const { glob } = await import('glob');
    const path = await import('path');
    const fs = await import('fs/promises');
    
    const images = await glob('dist/**/*.{jpg,jpeg,png,webp}');
    
    if (images.length === 0) {
      console.log('No images found to optimize.');
      return;
    }
    
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
