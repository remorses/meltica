import fs from 'fs'
import path from 'path'
import { createClient } from './generated'

/**
 * Represents a LottieFiles animation with all its properties.
 */
export interface LottieFilesAnimation {
    bgColor: string
    commentsCount: number
    createdAt: string
    createdByUserId: string
    description: string | null
    downloads: number
    dotlottieFormatVersion: string
    gifFileSize: string
    gifUrl: string
    id: number
    imageFileSize: number | null
    imageFrame: number | null
    imageUrl: string
    isLiked: boolean
    likesCount: number
    lottieFileSize: number
    lottieFileType: string
    lottieUrl: string
    jsonUrl: string
    lottieVersion: string | null
    name: string
    publishedAt: string
    slug: string
    sourceFileName: string
    sourceFileSize: number | null
    sourceFileType: string | null
    sourceFileUrl: string
    sourceName: string | null
    sourceVersion: string | null
    speed: number
    status: number
    updatedAt: string
    url: string
    uuid: string
    videoFileSize: number
    videoUrl: string
    isCanvaCompatible: boolean
    frameRate: number
    __typename: string
    createdBy?: {
        id: string
        username: string
    }
}

/**
 * Fetches all LottieFiles animations using pagination and saves them to a JSON file.
 * @param outputPath - Path where the JSON file will be saved. Defaults to 'lottiefiles-animations.json'.
 * @param batchSize - Number of animations to fetch per request. Defaults to 100.
 * @returns Promise that resolves when all animations have been fetched and saved.
 */
export async function fetchAllLottieFilesAnimations(
    outputPath: string = 'lottiefiles-animations.json',
    batchSize: number = 1000,
): Promise<void> {
    const client = createClient({})
    let hasNextPage = true

    let allAnimations: any[] = []
    let { lastCursor } = await writeAnimationsToFile([], outputPath)
    console.log('Starting to fetch LottieFiles animations...')

    while (hasNextPage) {
        try {
            console.time('graphql fetch')
            const response = await client.query({
                recentPublicAnimations: {
                    __args: {
                        first: batchSize,
                        after: lastCursor,
                    },
                    edges: {
                        cursor: true,
                        node: {
                            __scalar: true,
                            createdBy: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                    totalCount: true,
                    pageInfo: {
                        hasNextPage: true,
                        endCursor: true,
                    },
                },
            })
            console.timeEnd('graphql fetch')

            const { edges, pageInfo } = response.recentPublicAnimations

            if (!edges || edges.length === 0) {
                break
            }

            // Extract nodes from edges and add to our collection
            const nodes = edges.map((edge) => edge.node)
            allAnimations.push(...nodes)

            // Write to file after each batch
            await writeAnimationsToFile(
                allAnimations,
                outputPath,
                pageInfo.endCursor,
            )

            console.log(`Fetched batch with ${nodes.length} animations.`)

            // Update pagination variables
            hasNextPage = pageInfo.hasNextPage
            lastCursor = pageInfo.endCursor

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

    console.log('Writing animations to file...')
    await writeAnimationsToFile(allAnimations, outputPath, null)
    console.log('Finished writing animations to file.')

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
export async function writeAnimationsToFile(
    animations: any[],
    filePath: string,
    lastCursor: string | null | undefined = undefined,
) {
    try {
        const dirPath = path.dirname(filePath)

        // Ensure the directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
        }

        // Check if file exists and load existing data
        if (fs.existsSync(filePath)) {
            console.log(
                `Found existing file at ${filePath}, loading previous data...`,
            )
            const fileContent = await fs.promises.readFile(filePath, 'utf8')
            const parsedData = JSON.parse(fileContent)

            // Extract last cursor and animations if they exist
            if (
                !lastCursor &&
                parsedData.metadata &&
                parsedData.metadata.lastCursor
            ) {
                lastCursor = parsedData.metadata.lastCursor
                console.log(`Resuming from cursor: ${lastCursor}`)
            }

            if (parsedData.animations && Array.isArray(parsedData.animations)) {
                animations = [...parsedData.animations, ...animations]
                console.log(
                    `Loaded ${parsedData.animations.length} animations from previous file`,
                )
            }
        } else {
            console.log(`No existing file found at ${filePath}, starting fresh`)
        }

        // Sort animations by download count in descending order to ensure most downloaded files appear first
        animations.sort((a, b) => (b.downloads || 0) - (a.downloads || 0))

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
        return {
            lastCursor,
        }
    } catch (error) {
        console.error('Error writing animations to file:', error)
        throw error
    }
}

/**
 * Deduplicates animations in the JSON file based on their IDs.
 * @param filePath - Path to the JSON file containing animations
 * @returns Promise that resolves with the number of duplicates removed
 */
export async function deduplicateAnimations(
    filePath: string = 'lottiefiles-animations.json',
): Promise<number> {
    try {
        console.log(`Deduplicating animations in ${filePath}...`)

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`)
            return 0
        }

        // Read and parse the file
        const fileContent = await fs.promises.readFile(filePath, 'utf8')
        const data = JSON.parse(fileContent)

        if (!data.animations || !Array.isArray(data.animations)) {
            console.error('Invalid file format: animations array not found')
            return 0
        }

        const originalCount = data.animations.length
        console.log(`Original animation count: ${originalCount}`)

        // Create a Map to track unique animations by ID
        const uniqueAnimations = new Map()

        // Keep only the first occurrence of each animation ID
        data.animations.forEach((animation: any) => {
            if (animation.id && !uniqueAnimations.has(animation.id)) {
                uniqueAnimations.set(animation.id, animation)
            }
        })

        // Convert back to array
        const dedupedAnimations = Array.from(uniqueAnimations.values())
        const newCount = dedupedAnimations.length
        const duplicatesRemoved = originalCount - newCount

        // Update the data object
        data.animations = dedupedAnimations
        data.metadata.totalCount = newCount
        data.metadata.lastUpdated = new Date().toISOString()
        data.metadata.deduplicationPerformed = true

        // Write the deduplicated data back to the file
        await fs.promises.writeFile(
            filePath,
            JSON.stringify(data, null, 2),
            'utf8',
        )

        console.log(`Deduplication complete!`)
        console.log(`Removed ${duplicatesRemoved} duplicates`)
        console.log(`New animation count: ${newCount}`)

        return duplicatesRemoved
    } catch (error) {
        console.error('Error deduplicating animations:', error)
        throw error
    }
}
