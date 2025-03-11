import { deduplicateAnimations } from '../src/lottiefiles';

/**
 * Main function to run the deduplication process
 */
async function main() {
  try {
    console.log('Starting animation deduplication process...');
    
    // Get file path from command line arguments or use default
    const filePath = process.argv[2] || 'scripts/lottiefiles-animations.json';
    
    // Call the deduplication function
    const duplicatesRemoved = await deduplicateAnimations(filePath);
    
    console.log(`Deduplication complete! Removed ${duplicatesRemoved} duplicate animations.`);
    
    if (duplicatesRemoved > 0) {
      console.log('The file has been updated with unique animations only.');
    } else {
      console.log('No duplicates were found in the file.');
    }
    
  } catch (error) {
    console.error('Error during deduplication:', error);
    process.exit(1);
  }
}

// Run the main function
main();
