import fs from 'fs'
import path from 'path'
import { createClient } from './generated'

/**
 * Fetches all LottieFiles animations using pagination and saves them to a JSON file.
 * @param outputPath - Path where the JSON file will be saved. Defaults to 'lottiefiles-animations.json'.
 * @param batchSize - Number of animations to fetch per request. Defaults to 100.
 * @returns Promise that resolves when all animations have been fetched and saved.
 */
export async function fetchAllLottieFilesAnimations(
    outputPath: string = 'lottiefiles-animations.json',
    batchSize: number = 100,
): Promise<void> {
    const client = createClient({})
    let hasNextPage = true
    let endCursor: string | null = null
    const allAnimations: any[] = []

    console.log('Starting to fetch LottieFiles animations...')

    while (hasNextPage) {
        try {
            const response = await client.query({
                recentPublicAnimations: {
                    __args: {
                        first: batchSize,
                        after: endCursor,
                    },
                    edges: {
                        cursor: true,
                        node: {
                            __scalar: true,
                        },
                    },
                    totalCount: true,
                    pageInfo: {
                        hasNextPage: true,
                        endCursor: true,
                    },
                },
            })

            const { edges, pageInfo } = response.recentPublicAnimations

            if (!edges || edges.length === 0) {
                break
            }

            // Extract nodes from edges and add to our collection
            const nodes = edges.map((edge) => edge.node)
            allAnimations.push(...nodes)

            // Write to file after each batch
            await writeAnimationsToFile(allAnimations, outputPath)

            console.log(`Fetched ${allAnimations.length} animations so far...`)

            // Update pagination variables
            hasNextPage = pageInfo.hasNextPage
            endCursor = pageInfo.endCursor

            if (!hasNextPage) {
                console.log('No more pages to fetch.')
                break
            }
        } catch (error) {
            console.error('Error fetching animations:', error)
            break
        }
    }

    console.log(
        `Completed! Total of ${allAnimations.length} animations saved to ${outputPath}`,
    )
}

/**
 * Writes the animations array to a JSON file.
 * @param animations - Array of animation objects to write
 * @param filePath - Path where the JSON file will be saved
 */
async function writeAnimationsToFile(
    animations: any[],
    filePath: string,
): Promise<void> {
    try {
        const dirPath = path.dirname(filePath)

        // Ensure the directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
        }

        // Write the file
        await fs.promises.writeFile(
            filePath,
            JSON.stringify(animations, null, 2),
            'utf8',
        )
    } catch (error) {
        console.error('Error writing animations to file:', error)
        throw error
    }
}
