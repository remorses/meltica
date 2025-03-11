import { fal } from '@fal-ai/client'
import mime from 'mime-types'
import {
    createDataUrlFromBuffer,
    createDataUrlFromPath,
    fastFileHash,
} from 'meltica/src/utils'
import fs from 'fs'
import { createCache } from './cache'
import { melticaFolder } from 'meltica/src/rendering'
import path from 'path'

fal.config({
    // Can also be auto-configured using environment variables:
    credentials: process.env.FAL_API_KEY,
})

const upscaleCache = createCache({
    cacheId: 'upscaler',
    ttl: 1000 * 60 * 60 * 24 * 30, // 30 days
})

/**
 * Upscales an image using the fal.ai clarity-upscaler model
 */
export async function upscaleImage({ imageBuffer }) {
    const timerId = `upscale ${Math.random().toString(36).substring(2, 10)}`
    console.time(timerId)

    const url = await createDataUrlFromBuffer(imageBuffer)
    const result = await fal.subscribe('fal-ai/clarity-upscaler', {
        input: {
            image_url: url,
            creativity: 0,
            resemblance: 0.9,
            enable_safety_checker: false,
            num_inference_steps: 10,
        },
        logs: true,
        onQueueUpdate: (update) => {
            if (update.status === 'IN_PROGRESS') {
                // update.logs.map((log) => log.message).forEach(console.log)
            }
        },
    })

    console.timeEnd(timerId)
    return result.data
}

/**
 * Upscales an image file using the fal.ai clarity-upscaler model
 * Results are cached using file content hash for efficient reuse
 */
export const upscaleImageFileCached = upscaleCache.wrap(
    {
        key: 'upscaleImageFile',
        replacer(key, value) {
            if (key === 'filePath' && value) {
                return fastFileHash(value)
            }
            return value
        },
    },
    async ({ filePath }) => {
        const imageBuffer = fs.readFileSync(filePath)
        const hash = fastFileHash(filePath)
        const result = await upscaleImage({ imageBuffer })
        // Extract the image data from the result
        const imageUrl = result.image.url

        const res = await fetch(imageUrl)
        if (!res.ok) {
            throw new Error(
                `Failed to fetch upscaled image: ${res.status} ${res.statusText}`,
            )
        }
        const buffer = Buffer.from(await res.arrayBuffer())
        const basename = path.basename(filePath)
        const extension = mime.extension(
            result.image.content_type || 'image/jpeg',
        )
        const resultFilePath = path.resolve(
            melticaFolder,
            `${basename}-${hash}-upscaled.${extension}`,
        )
        await fs.promises.writeFile(resultFilePath, buffer)
        return {
            resultFilePath,
            // result,
        }
    },
)
