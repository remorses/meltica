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

export async function getSmartCropBoundingBoxes(
    imageBuffer: Buffer,
): Promise<BoundingBox[]> {
    // Initialize the Gemini model
    const model = google('gemini-2.0-flash-001')

    // Convert buffer to base64 for the API
    const base64Image = imageBuffer.toString('base64')

    // Prompt for Gemini
    const prompt = dedent`
    draw bounding boxes for the main elements of this image, each bounding box will create a different scene in a video, with a different crop and zoom, contain all the visual elements inside the bounding box, if there is only one main subject in the image and it can fit completely in the video 16:9 aspect ratio, just draw a bounding box that cover the full image

    Return bounding boxes as JSON arrays [ymin, xmin, ymax, xmax]

    the bounding box should have a horizontal video aspect ratio
  `
    const { width, height } = imageSize(imageBuffer)
    const fileTypeResult = await fileTypeFromBuffer(imageBuffer)
    const mimeType = fileTypeResult?.mime || 'image/jpeg'

    try {
        // Send the request to Gemini
        const result = await generateObject({
            model,
            schema: z.array(z.array(z.number()).length(4)),
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: prompt },
                        {
                            type: 'image',
                            image: `data:${mimeType};base64,${base64Image}`,
                        },
                    ],
                },
            ],
        })

        // Parse the JSON array
        const boundingBoxesRaw = result.object

        // Convert the raw arrays to BoundingBox objects
        const boundingBoxes: BoundingBox[] = boundingBoxesRaw.map(
            (box: number[]) => {
                const ymin = box[0]
                const xmin = box[1]
                const ymax = box[2]
                const xmax = box[3]

                return boundingBoxToPixelCoordinates(
                    {
                        ymin: ymin,
                        xmin: xmin,
                        ymax: ymax,
                        xmax: xmax,
                    },
                    width!,
                    height!,
                )
            },
        )

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
