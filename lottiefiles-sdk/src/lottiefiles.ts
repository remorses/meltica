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
    let endCursor: string | null | undefined = undefined
    let allAnimations: any[] = []

    console.log('Starting to fetch LottieFiles animations...')

    if (fs.existsSync(outputPath)) {
        console.log(
            `Found existing file at ${outputPath}, loading previous data...`,
        )
        const fileContent = await fs.promises.readFile(outputPath, 'utf8')
        const parsedData = JSON.parse(fileContent)

        // Extract last cursor and animations if they exist
        if (parsedData.metadata && parsedData.metadata.lastCursor) {
            endCursor = parsedData.metadata.lastCursor
            console.log(`Resuming from cursor: ${endCursor}`)
        }

        if (parsedData.animations && Array.isArray(parsedData.animations)) {
            allAnimations = parsedData.animations
            console.log(
                `Loaded ${allAnimations.length} animations from previous file`,
            )
        }
    } else {
        console.log(`No existing file found at ${outputPath}, starting fresh`)
    }

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
            // Sort animations by download count in descending order to ensure most downloaded files appear first
            allAnimations.sort(
                (a, b) => (b.downloads || 0) - (a.downloads || 0),
            )
            await writeAnimationsToFile(
                allAnimations,
                outputPath,
                pageInfo.endCursor,
            )

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
            throw error
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
 * @param lastCursor - The last cursor used for pagination
 */
async function writeAnimationsToFile(
    animations: any[],
    filePath: string,
    lastCursor: string | null | undefined = undefined,
): Promise<void> {
    try {
        const dirPath = path.dirname(filePath)

        // Ensure the directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
        }

        // Create a structured object with animations and metadata
        const dataToWrite = {
            metadata: {
                lastCursor: lastCursor,
                totalCount: animations.length,
                lastUpdated: new Date().toISOString(),
            },
            animations: animations,
        }

        // Write the file with proper indentation
        await fs.promises.writeFile(
            filePath,
            JSON.stringify(dataToWrite, null, 2),
            'utf8',
        )
    } catch (error) {
        console.error('Error writing animations to file:', error)
        throw error
    }
}


