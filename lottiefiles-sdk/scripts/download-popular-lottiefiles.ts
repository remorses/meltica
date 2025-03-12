import { fetchAllLottieFilesAnimations } from '../src/lottiefiles'
import * as path from 'path'

/**
 * Main function to download all LottieFiles animations
 */
async function main() {
    // Set output path to be inside the scripts directory
    const outputPath = path.resolve(__dirname, './lottiefiles-animations.json')

    console.log('Starting download of all LottieFiles animations...')

    await fetchAllLottieFilesAnimations(outputPath)
    console.log('Download completed successfully!')
}

// Execute the main function
main().catch((error) => {
    console.error('Unhandled error:', error)
    process.exit(1)
})
