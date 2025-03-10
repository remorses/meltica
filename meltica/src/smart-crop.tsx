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












export async function getSmartCropBoundingBoxes(imageBuffer: Buffer) {
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
                    - return bounding boxes for the main characters of this image
                    - each bounding box will be used to create a different zoomed scene in a video, with a different crop size and zoom
                    - ignore text annotations and text bubbles
                    - ignore comics text bubbles
                    - ignore speech bubbles and text boxes
                    - ignore text annotations and text information
                    - bounding boxes must not intersect. each bounding box should cover different parts of the image. 2 bounding boxes must never overlap 
                    - one bounding box must not be inside another bounding box. 
                    - vertices of bounding boxes must not be outside the image.
                    - ignore content that is cut from the image and you only see a small slice of it
                    
                    
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
