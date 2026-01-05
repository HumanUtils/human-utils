const fs = require('fs');
const { createCanvas } = require('canvas');

// Register Share Tech Mono font if available, otherwise use monospace
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// Dark background
ctx.fillStyle = '#1F2937';
ctx.fillRect(0, 0, 512, 512);

// Draw ">_" in emerald
ctx.fillStyle = '#10B981';
ctx.font = 'bold 280px monospace';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('>_', 256, 256);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('assets/favicon.png', buffer);
console.log('✓ Generated favicon.png');

// Generate 180x180 for Apple touch icon
const canvas180 = createCanvas(180, 180);
const ctx180 = canvas180.getContext('2d');
ctx180.fillStyle = '#1F2937';
ctx180.fillRect(0, 0, 180, 180);
ctx180.fillStyle = '#10B981';
ctx180.font = 'bold 98px monospace';
ctx180.textAlign = 'center';
ctx180.textBaseline = 'middle';
ctx180.fillText('>_', 90, 90);
fs.writeFileSync('assets/apple-touch-icon.png', canvas180.toBuffer('image/png'));
console.log('✓ Generated apple-touch-icon.png');
