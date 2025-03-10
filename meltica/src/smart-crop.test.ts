import { describe, it, expect, beforeAll } from 'vitest'
import { getSmartCropBoundingBoxes, BoundingBox } from './smart-crop'
import fs from 'fs'
import path from 'path'
import { Canvas, Image } from 'canvas'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

// Add image snapshot matcher
declare module 'vitest' {
    interface Assertion<T = any> {
        toMatchImageSnapshot(): void
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

describe('getSmartCropBoundingBoxes', () => {
    // Get all image files from fixtures directory
    const imageFiles = fs.existsSync(fixturesPath)
        ? fs
              .readdirSync(fixturesPath)
              .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
        : []

    // Skip the entire test suite if no images are found
    if (imageFiles.length === 0) {
        it.skip('No test images found in fixtures/smart-crop directory', () => {})
    } else {
        // Test each image in the fixtures directory
        for (const imageFile of imageFiles) {
            it(`should generate and draw bounding boxes for ${imageFile}`, async () => {
                // Skip this test in CI environments where API access might not be available
                if (process.env.CI) {
                    console.log(
                        `Skipping test for ${imageFile} in CI environment`,
                    )
                    return
                }

                // Load the test image
                const imagePath = path.join(fixturesPath, imageFile)
                const imageBuffer = fs.readFileSync(imagePath)

                // Call the function with the test image
                const boundingBoxes =
                    await getSmartCropBoundingBoxes(imageBuffer)

                // Verify the result
                expect(Array.isArray(boundingBoxes)).toBe(true)

                // Load the image for drawing
                const image = new Image()
                image.src = imageBuffer

                // Create a canvas with the image dimensions
                const canvas = new Canvas(image.width, image.height)
                const ctx = canvas.getContext('2d')

                // Draw the original image
                ctx.drawImage(image, 0, 0, image.width, image.height)

                // Draw each bounding box
                boundingBoxes.forEach((box: BoundingBox, index: number) => {
                    // Verify box properties
                    expect(box).toHaveProperty('ymin')
                    expect(box).toHaveProperty('xmin')
                    expect(box).toHaveProperty('ymax')
                    expect(box).toHaveProperty('xmax')

                    // Verify coordinates are numbers
                    expect(typeof box.ymin).toBe('number')
                    expect(typeof box.xmin).toBe('number')
                    expect(typeof box.ymax).toBe('number')
                    expect(typeof box.xmax).toBe('number')

                    // Verify coordinates are valid (ymin < ymax, xmin < xmax)
                    expect(box.ymin).toBeLessThan(box.ymax)
                    expect(box.xmin).toBeLessThan(box.xmax)

                    // Draw the bounding box
                    const width = box.xmax - box.xmin
                    const height = box.ymax - box.ymin

                    // Use different colors for multiple boxes
                    const colors = [
                        '#FF0000',
                        '#00FF00',
                        '#0000FF',
                        '#FFFF00',
                        '#FF00FF',
                        '#00FFFF',
                    ]
                    const color = colors[index % colors.length]

                    ctx.strokeStyle = color
                    ctx.lineWidth = 3
                    ctx.strokeRect(box.xmin, box.ymin, width, height)

                    // Add box number
                    ctx.fillStyle = color
                    ctx.font = 'bold 16px Arial'
                    ctx.fillText(
                        `Box ${index + 1}`,
                        box.xmin + 5,
                        box.ymin + 20,
                    )
                })

                // Save the image with bounding boxes
                const outputFilename = `${path.basename(imageFile, path.extname(imageFile))}-boxes.png`
                const outputFilePath = path.join(outputPath, outputFilename)
                const buffer = canvas.toBuffer('image/png')
                fs.writeFileSync(outputFilePath, buffer)

                // Match against snapshot
                expect(buffer).toMatchImageSnapshot()

                console.log(
                    `Bounding boxes drawn and saved to ${outputFilePath}`,
                )
            })
        }
    }
})
