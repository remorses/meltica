import { describe, it, expect, beforeAll } from 'vitest'
import os from 'os'
import { upscaleImage, upscaleImageFileCached } from './upscale'
import fs from 'fs'
import path from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import {
    getSmartCropBoundingBoxes,
    getSmartCropFromFileCached,
} from './smart-crop'
import { createCanvas, loadImage } from 'canvas'
import { buffer } from 'stream/consumers'

// Add image snapshot matcher
declare module 'vitest' {
    interface Assertion<T = any> {
        toMatchImageSnapshot(options?: any): void
    }
}

expect.extend({ toMatchImageSnapshot })

// Define paths
const fixturesPath = path.join(__dirname, 'fixtures/smart-crop')
const outputPath = path.join(__dirname, '../test-output')

// Create output directory if it doesn't exist
beforeAll(() => {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true })
    }
})

/**
 * Crops an image to 16:9 aspect ratio centered on the given point
 * @param imageBuffer The image buffer to crop
 * @param centerX The x coordinate of the center point
 * @param centerY The y coordinate of the center point
 * @returns A buffer containing the cropped image
 */
async function cropImageTo16by9(
    imageBuffer: Buffer,
    centerX: number,
    centerY: number,
): Promise<Buffer> {
    const image = await loadImage(imageBuffer)
    const imageWidth = image.width
    const imageHeight = image.height

    // Calculate dimensions for 16:9 aspect ratio
    let cropWidth = imageWidth
    let cropHeight = Math.round((cropWidth * 9) / 16)

    // If calculated height is greater than image height, adjust width to maintain aspect ratio
    if (cropHeight > imageHeight) {
        cropHeight = imageHeight
        cropWidth = Math.round((cropHeight * 16) / 9)
    }

    // Calculate top-left corner of crop area, ensuring it stays within image bounds
    let x = Math.max(
        0,
        Math.min(imageWidth - cropWidth, centerX - cropWidth / 2),
    )
    let y = Math.max(
        0,
        Math.min(imageHeight - cropHeight, centerY - cropHeight / 2),
    )

    // Create canvas with 16:9 aspect ratio
    const canvas = createCanvas(cropWidth, cropHeight)
    const ctx = canvas.getContext('2d')

    // Draw the cropped portion of the image
    ctx.drawImage(
        image,
        x,
        y,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight,
    )

    // Convert canvas to buffer
    return canvas.toBuffer('image/png')
}

// Test suite for the cropImageTo16by9 function
describe('cropImageTo16by9', () => {
    it('should crop an image to 16:9 aspect ratio', async () => {
        // Skip if no test images are available
        if (
            !fs.existsSync(fixturesPath) ||
            fs.readdirSync(fixturesPath).length === 0
        ) {
            console.log('Skipping test: No test images available')
            return
        }

        // Get the first image from the fixtures directory
        const imageFiles = fs
            .readdirSync(fixturesPath)
            .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
        const sampleImage = imageFiles[0]
        const imagePath = path.join(fixturesPath, sampleImage)
        const imageBuffer = fs.readFileSync(imagePath)

        // Load the image to get dimensions
        const image = await loadImage(imageBuffer)
        const imageWidth = image.width
        const imageHeight = image.height

        // Test cases: center, top-left, bottom-right
        const testCases = [
            { name: 'center', x: imageWidth / 2, y: imageHeight / 2 },
            { name: 'top-left', x: imageWidth * 0.25, y: imageHeight * 0.25 },
            {
                name: 'bottom-right',
                x: imageWidth * 0.75,
                y: imageHeight * 0.75,
            },
        ]

        for (const testCase of testCases) {
            // Crop the image
            const croppedBuffer = await cropImageTo16by9(
                imageBuffer,
                testCase.x,
                testCase.y,
            )

            // Save the cropped image for reference
            const outputFilename = `${path.basename(sampleImage, path.extname(sampleImage))}-cropped-${testCase.name}.png`
            const outputFilePath = path.join(outputPath, outputFilename)
            fs.writeFileSync(outputFilePath, croppedBuffer)

            // Verify the cropped image has 16:9 aspect ratio
            const croppedImage = await loadImage(croppedBuffer)
            const aspectRatio = croppedImage.width / croppedImage.height

            // Check if aspect ratio is close to 16:9 (with small rounding error tolerance)
            expect(Math.abs(aspectRatio - 16 / 9)).toBeLessThan(0.01)

            // Use image snapshot testing to verify the crop
            expect(croppedBuffer).toMatchImageSnapshot()

            console.log(`Cropped image saved to ${outputFilePath}`)
        }
    })
})

describe(
    'upscaleImage',
    () => {
        // Get all image files from fixtures directory
        const imageFiles = fs.existsSync(fixturesPath)
            ? fs
                  .readdirSync(fixturesPath)
                  .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
            : []

        // Skip the entire test suite if no images are found
        if (imageFiles.length === 0) {
            it.skip('No test images found in fixtures/upscale directory', () => {})
        } else {
            // Test file-based upscaling with caching
            for (const imageFile of imageFiles) {
                // Test just first image to save API calls
                it(`should upscale image file ${imageFile} with caching`, async () => {
                    const sourceImagePath = path.join(fixturesPath, imageFile)

                    // First, get smart crop bounding boxes
                    const smartCropBoxes = await getSmartCropFromFileCached({
                        filePath: sourceImagePath,
                    })
                    expect(smartCropBoxes).toBeDefined()
                    expect(smartCropBoxes.length).toBeGreaterThan(0)

                    // Use the first bounding box for cropping
                    const box = smartCropBoxes[0]
                    console.log(`Using smart crop box: ${JSON.stringify(box)}`)

                    // Apply smart crop to 16:9 aspect ratio
                    const centerX = (box.box.xmin + box.box.xmax) / 2
                    const centerY = (box.box.ymin + box.box.ymax) / 2
                    const croppedBuffer = await cropImageTo16by9(
                        fs.readFileSync(sourceImagePath),
                        centerX,
                        centerY,
                    )

                    // Save the cropped image for reference
                    const croppedFilename = `${path.basename(imageFile, path.extname(imageFile))}-smart-cropped.png`
                    const croppedFilePath = path.join(
                        outputPath,
                        croppedFilename,
                    )
                    fs.writeFileSync(croppedFilePath, croppedBuffer)
                    console.log(
                        `Smart cropped image saved to ${croppedFilePath}`,
                    )

                    // Second call with caching
                    console.time('upscale call (should use cache)')
                    const result = await upscaleImageFileCached({
                        filePath: croppedFilePath,
                    })
                    console.timeEnd('upscale call (should use cache)')

                    // Should get result from cache
                    expect(result).toBeDefined()
                    expect(result.resultFilePath).toBeDefined()

                    // Save the upscaled image
                    const outputFilename = `${path.basename(imageFile, path.extname(imageFile))}-upscaled.png`
                    const outputFilePath = path.join(outputPath, outputFilename)
                    fs.writeFileSync(
                        outputFilePath,
                        fs.readFileSync(result.resultFilePath),
                    )

                    console.log(`Upscaled image saved to ${outputFilePath}`)
                })
            }
        }
    },
    1000 * 60 * 2, // Increase timeout to 2 minutes as upscaling might take longer
)
