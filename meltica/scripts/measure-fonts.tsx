import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

// List of monospace fonts to measure
const fontsToMeasure = [
  'Consolas',
  'Menlo',
  'Monaco',
  'Courier New',
  'Courier',
  'monospace',
  'JetBrains Mono',
  'Fira Code',
  'Source Code Pro',
  'Ubuntu Mono',
  'DejaVu Sans Mono',
];

// Font size used for measurement
const fontSizeForMeasurement = 14;

// Text to measure (using a mix of characters to get a good average)
const textToMeasure = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// Function to measure font dimensions
function measureFont(fontFamily: string): { width: number; height: number } | null {
  try {
    // Create a canvas for measurement
    const canvas = createCanvas(500, 100);
    const ctx = canvas.getContext('2d');
    
    // Set font
    ctx.font = `${fontSizeForMeasurement}px ${fontFamily}`;
    
    // Measure text width
    const metrics = ctx.measureText(textToMeasure);
    const width = metrics.width / textToMeasure.length;
    
    // Approximate height using font metrics
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    
    return { width, height };
  } catch (error) {
    console.error(`Error measuring font ${fontFamily}:`, error);
    return null;
  }
}

// Main function
async function main() {
  console.log('Measuring fonts...');
  
  const measurements: Record<string, { width: number; height: number }> = {};
  
  for (const font of fontsToMeasure) {
    const result = measureFont(font);
    if (result) {
      measurements[font] = result;
      console.log(`Measured ${font}: width=${result.width.toFixed(2)}, height=${result.height.toFixed(2)}`);
    }
  }
  
  // Generate TypeScript file content
  const fileContent = `// Auto-generated font measurements
// Generated on ${new Date().toISOString()}

export const fontSizeForMeasurement = ${fontSizeForMeasurement};

export const fontsToMeasurement = ${JSON.stringify(measurements, null, 2)} as const;

`;
  
  // Write to file
  const outputPath = path.resolve(process.cwd(), 'src/code/fonts-measurements.ts');
  fs.writeFileSync(outputPath, fileContent);
  
  console.log(`Font measurements written to ${outputPath}`);
}

// Run the script
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
