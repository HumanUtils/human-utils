#!/usr/bin/env node
/**
 * Logo Export Script
 *
 * Generates static logo assets for various use cases:
 * - Favicons (16x16, 32x32, 180x180)
 * - App icons (512x512, 1024x1024)
 * - Social cards (1200x630)
 *
 * Usage: node scripts/export-logos.js
 *
 * Requires: Sharp (npm install --save-dev sharp)
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Logo Export Script');
console.log('');
console.log('To generate static logo assets, you need to:');
console.log('');
console.log('1. Install Sharp:');
console.log('   npm install --save-dev sharp');
console.log('');
console.log('2. Create SVG source files:');
console.log('   - assets/logo-icon.svg (square, just ">_")');
console.log('   - assets/logo-full.svg (horizontal, ">_ Human Utils")');
console.log('');
console.log('3. Run this script again to generate PNG assets');
console.log('');
console.log('Or use an online tool like:');
console.log('   - https://realfavicongenerator.net/ (for favicons)');
console.log('   - https://www.appicon.co/ (for app icons)');
console.log('');
console.log('📝 Recommended sizes:');
console.log('   Favicons: 16x16, 32x32, 180x180 (Apple touch icon)');
console.log('   App icons: 512x512, 1024x1024');
console.log('   Social cards: 1200x630');
console.log('');

// Check if Sharp is installed
try {
  const sharp = require('sharp');
  
  const assetsDir = path.join(__dirname, '..', 'assets');
  const outputDir = path.join(assetsDir, 'generated');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const iconSvg = path.join(assetsDir, 'logo-icon.svg');
  const fullSvg = path.join(assetsDir, 'logo-full.svg');
  
  if (!fs.existsSync(iconSvg) || !fs.existsSync(fullSvg)) {
    console.log('⚠️  SVG source files not found. Please create:');
    console.log(`   ${iconSvg}`);
    console.log(`   ${fullSvg}`);
    process.exit(1);
  }
  
  console.log('✅ Sharp installed. Generating assets...\n');
  
  // Generate favicons from icon
  const faviconSizes = [16, 32, 180];
  faviconSizes.forEach(size => {
    sharp(iconSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDir, `favicon-${size}x${size}.png`))
      .then(() => console.log(`✓ Generated favicon-${size}x${size}.png`));
  });
  
  // Generate app icons from icon
  const appIconSizes = [512, 1024];
  appIconSizes.forEach(size => {
    sharp(iconSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDir, `app-icon-${size}x${size}.png`))
      .then(() => console.log(`✓ Generated app-icon-${size}x${size}.png`));
  });
  
  // Generate social card from full logo
  sharp(fullSvg)
    .resize(1200, 630)
    .png()
    .toFile(path.join(outputDir, 'social-card-1200x630.png'))
    .then(() => console.log(`✓ Generated social-card-1200x630.png`));
  
  console.log('\n✨ Logo assets generated in assets/generated/');
  
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    console.log('ℹ️  Sharp not installed. Install with: npm install --save-dev sharp');
  } else {
    console.error('Error:', err.message);
  }
}
