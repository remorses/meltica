import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { FlatCache } from 'flat-cache'
import { LottieFilesAnimation } from './lottiefiles'
import dedent from 'dedent'

const model = google('gemini-2.0-flash-lite')
const cache = new FlatCache({
    cacheDir: '.cache',
    cacheId: 'animation-descriptions.json',
    ttl: 1000 * 60 * 60 * 24 * 7,
})
cache.load()

/**
 * Gets a description for an animation using Gemini AI model with caching
 * @param animation The animation to get a description for
 * @returns The AI-generated description
 */
export async function getAnimationDescription(animation: {
    videoUrl: string
    id: number
}): Promise<string> {
    const cacheKey = `animation-${animation.id}`
    const cachedDescription = cache.getKey(cacheKey) as any

    if (cachedDescription) {
        console.log(`Using cached description for animation ${animation.id}`)
        return cachedDescription
    }
    if (!animation.videoUrl) {
        throw new Error('No videoUrl found for animation')
    }

    console.log(`Generating description for animation ${animation.videoUrl}`)
    try {
        const res = await generateText({
            model,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'file',
                            mimeType: 'video/mp4',
                            data: animation.videoUrl,
                        },
                    ],
                },
                {
                    role: 'user',
                    content: dedent`
                        Describe this animation in detail. 
                        Include information about its 
                        - subject
                        - style (borders, design, etc)
                        - movements
                        - colors
                        - illustration abstract meaning
                        
                        Do not use markdown but just simple text instead.
                        `,
                },
            ],
        })

        let description = res.text

        console.log(description)
        // Save to cache
        cache.setKey(cacheKey, description)
        cache.save()

        return description
    } catch (error) {
        console.error(
            `Error generating description for animation ${animation.id}:`,
            error,
        )
        throw error
    }
}
