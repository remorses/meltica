import { ChunkReqPayload, TrieveSDK } from 'trieve-ts-sdk'
import fs from 'fs'
import path from 'path'
import { LottieFilesAnimation } from '../src/lottiefiles'
import { RateLimit } from 'async-sema'
import { google } from '@ai-sdk/google'
import { generateText, streamText } from 'ai'
import { FlatCache } from 'flat-cache'
import { getAnimationDescription } from '../src/video-llm'

/**
 * Helper function to group an array into chunks of specified size
 * @param array The array to be chunked
 * @param size The size of each chunk
 * @returns An array of chunks
 */
function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size)
        chunks.push(chunk)
    }
    return chunks
}
const apiKey = process.env.TRIEVE_API_KEY_LOTTIE || ''
if (!apiKey) {
    throw new Error('TRIEVE_API_KEY_LOTTIE is not set')
}

const trieve = new TrieveSDK({
    apiKey,
    datasetId: '1b28c054-fbd5-4835-b12a-ad98a9e4e3d7',
})

export async function sync() {
    console.log('Starting sync function...')
    // https://ai.google.dev/gemini-api/docs/rate-limits

    // Clear Dataset Chunks
    await trieve.trieve.fetch(`/api/dataset/clear/{dataset_id}`, 'put', {
        datasetId: trieve.datasetId!,
    })

    // Read LottieFilesAnimation data from JSON file
    const filePath = path.resolve(__dirname, './lottiefiles-animations.json')
    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContent)
    const animations: LottieFilesAnimation[] = data.animations

    // Group animations into chunks of 120
    const chunkSize = 120
    const animationChunks = chunkArray(animations, chunkSize)

    let chunkCount = 0
    for (const animationChunk of animationChunks) {
        chunkCount++
        console.log(
            `Processing animation chunk ${chunkCount} with ${animationChunk.length} animations`,
        )
        console.time(`Process animation chunk ${chunkCount}`)

        // Get descriptions for this chunk of animations
        const chunkDocuments = await Promise.all(
            animationChunk.map(async function toTrievePayload(animation) {
                try {
                    const { description, styleTags, quality } =
                        await getAnimationDescription(animation)

                    const html = `${animation.name}\n${description}`
                    return {
                        tracking_id: `animation-${animation.id}`,
                        chunk_html: html,
                        link: animation.url,

                        tag_set: [...styleTags.map((tag) => `style:${tag}`)],
                        time_stamp: animation.createdAt,
                        metadata: { ...animation, styleTags, quality },
                        weight: animation.downloads,
                        upsert_by_tracking_id: true,
                    } as ChunkReqPayload
                } catch (error) {
                    console.error(
                        `Error processing animation ${animation.id}:`,
                        error,
                    )
                    return null
                }
            }),
        )

        // Filter out null values from failed animations
        const validChunkDocuments = chunkDocuments.filter(
            (doc) => doc !== null,
        ) as ChunkReqPayload[]

        console.log(
            `Creating chunk ${chunkCount} with ${validChunkDocuments.length} items`,
        )
        console.time(`Create chunk ${chunkCount}`)
        await retry(() => trieve.createChunk(validChunkDocuments))
        console.timeEnd(`Create chunk ${chunkCount}`)
        console.timeEnd(`Process animation chunk ${chunkCount}`)
    }

    console.log('Finished creating chunks.')
}

/**
 * Retries a function with exponential backoff
 * @param fn The function to retry
 * @param maxRetries Maximum number of retries
 * @param initialDelay Initial delay in milliseconds
 * @returns The result of the function
 * @throws The last error encountered
 */
async function retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 2,
    initialDelay: number = 1000,
): Promise<T> {
    let lastError: Error | undefined

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error as Error
            const delay = initialDelay * Math.pow(2, attempt)
            console.log(
                `Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`,
            )
            await new Promise((resolve) => setTimeout(resolve, delay))
        }
    }

    throw lastError
}

sync()
