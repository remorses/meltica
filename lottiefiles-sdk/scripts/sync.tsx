import { ChunkReqPayload, TrieveSDK } from 'trieve-ts-sdk'
import fs from 'fs'
import path from 'path'
import { LottieFilesAnimation } from '../src/lottiefiles'
import { RateLimit } from 'async-sema'
import { google } from '@ai-sdk/google'
import { generateText, streamText } from 'ai'
import { FlatCache } from 'flat-cache'

const trieve = new TrieveSDK({
    apiKey: 'tr-IgV6yDXLzL59pEwpIvamwITUhWhbYV2J',
    datasetId: '69c5163a-880e-4f45-83f7-27dbb15be71f',
})

export async function sync() {
    console.log('Starting sync function...')
    // https://ai.google.dev/gemini-api/docs/rate-limits
    const sema = RateLimit(100, { timeUnit: 1000 * 50 }) // Limit concurrency to 5

    // Clear Dataset Chunks
    await trieve.trieve.fetch(`/api/dataset/clear/{dataset_id}`, 'put', {
        datasetId: trieve.datasetId!,
    })

    // Read LottieFilesAnimation data from JSON file
    const filePath = path.resolve(__dirname, './lottiefiles-animations.json')
    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContent)
    const animations: LottieFilesAnimation[] = data.animations

    let documents = (
        await Promise.all(
            animations.map(async function toTrievePayload(animation) {
                await sema()

                const chunks: ChunkReqPayload[] = []

                try {
                    const description = await getAnimationDescription(animation)

                    const html = `${animation.name}\n${description}`
                    chunks.push({
                        tracking_id: `animation-${animation.id}`,
                        chunk_html: html,
                        link: animation.url,
                        tag_set: [],
                        time_stamp: animation.createdAt,

                        metadata: {
                            title: animation.name,
                            section: '',
                            section_id: '',
                            id: animation.id.toString(),
                        },
                        weight: animation.downloads,
                        upsert_by_tracking_id: true,
                        // group_tracking_ids: [animation.name],
                    })
                } catch (error) {
                    console.error(
                        `Error processing animation ${animation.id}:`,
                        error,
                    )
                } finally {
                }

                return chunks
            }),
        )
    ).flat()

    const chunkSize = 120
    const chunks: ChunkReqPayload[][] = []
    for (let i = 0; i < documents.length; i += chunkSize) {
        const chunk = documents.slice(i, i + chunkSize)
        chunks.push(chunk)
    }
    for (const chunk of chunks) {
        await trieve.createChunk(chunk)
    }
    console.log('Finished creating chunks.')
}

sync()
