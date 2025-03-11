import { google } from '@ai-sdk/google'
import z from 'zod'
import { generateObject, generateText } from 'ai'
import dedent from 'dedent'

/**
 * Interface for the bounding box coordinates
 * Format: [ymin, xmin, ymax, xmax] where all values are normalized between 0 and 1
 */
export interface BoundingBox {
    ymin: number
    xmin: number
    ymax: number
    xmax: number
}
import { imageSize } from 'image-size'
import { fileTypeFromBuffer } from 'file-type'
import fs from 'fs'
import { createCache } from './cache'
import { fastFileHash } from 'meltica/src/utils'

const smartCropCache = createCache({
    cacheId: 'smart-crop',
    ttl: 1000 * 60 * 60 * 24 * 7, // 7 days
})

export const getSmartCropFromFileCached = smartCropCache.wrap(
    {
        key: 'getSmartCropFromFile',
        replacer(key, value) {
            if (key === 'filePath' && value) {
                return fastFileHash(value)
            }
            return value
        },
    },
    async ({ filePath }) => {
        const imageBuffer = fs.readFileSync(filePath)
        
        const boundingBoxes = await getSmartCropBoundingBoxes(imageBuffer)

        return boundingBoxes
    },
)

export async function getSmartCropBoundingBoxes(imageBuffer: Buffer) {
    const timeId = Math.random().toString(36).substring(2, 8)
    console.time(`getSmartCropBoundingBoxes ${timeId}`)
    // Initialize the Gemini model
    const model = google('gemini-2.0-flash-exp')

    // Convert buffer to base64 for the API
    const base64Image = imageBuffer.toString('base64')

    const { width, height } = imageSize(imageBuffer)
    if (!width || !height) {
        throw new Error('Image size is not defined')
    }
    console.log(`image size to crop: ${width}x${height}`)
    const fileTypeResult = await fileTypeFromBuffer(imageBuffer)
    const mimeType = fileTypeResult?.mime || 'image/jpeg'

    try {
        // Send the request to Gemini
        const result = await generateObject({
            model,
            // mode: 'tool',
            schema: z.array(
                z.object({
                    label: z
                        .string()
                        .describe(
                            'descriptive label for the content inside the bounding box. do not use generic labels like "person", "scene" or "subject". always return this field first.',
                        ),
                    box_2d: z
                        .array(z.number())
                        .length(4)
                        .describe(
                            `[ymin, xmin, ymax, xmax] in a coordinate system that is 1000x1000 pixels`,
                        ),
                }),
            ),
            maxRetries: 0,

            messages: [
                {
                    role: 'system',
                    content: dedent`
                    - return bounding boxes for the main scenes of this image
                    - ignore text annotations, text bubbles, speech bubbles and text boxes
                    - ignore text annotations and text information
                    - returned bounding boxes must not intersect. each bounding box should cover different parts of the image. 2 bounding boxes must never overlap 
                    - ignore content that is cut out of the image partly and you only see a small slice of it
                    
                    
                    `,
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            image: `data:${mimeType};base64,${base64Image}`,
                        },
                        // { type: 'text', text: prompt },
                    ],
                },
            ],
        })

        // Parse the JSON array
        const boundingBoxesRaw = result.object

        // Convert the raw arrays to BoundingBox objects
        const boundingBoxes = boundingBoxesRaw.map(({ box_2d: box, label }) => {
            console.log({ box, label })
            const ymin = box[0]
            const xmin = box[1]
            const ymax = box[2]
            const xmax = box[3]

            return {
                label,
                box: boundingBoxToPixelCoordinates(
                    {
                        ymin: ymin,
                        xmin: xmin,
                        ymax: ymax,
                        xmax: xmax,
                    },
                    width!,
                    height!,
                ),
            }
        })

        return boundingBoxes
    } catch (error) {
        console.error('Error analyzing image with Gemini:', error)
        throw error
    } finally {
        console.timeEnd(`getSmartCropBoundingBoxes ${timeId}`)
    }
}

/**
 * Helper function to convert bounding boxes (0-1000) to pixel coordinates
 */
export function boundingBoxToPixelCoordinates(
    boundingBox: BoundingBox,
    imageWidth: number,
    imageHeight: number,
) {
    const scaledWidth = 1000
    const scaledHeight = 1000

    return {
        ymin: Math.floor((boundingBox.ymin / scaledHeight) * imageHeight),
        xmin: Math.floor((boundingBox.xmin / scaledWidth) * imageWidth),
        ymax: Math.floor((boundingBox.ymax / scaledHeight) * imageHeight),
        xmax: Math.floor((boundingBox.xmax / scaledWidth) * imageWidth),
    }
}
