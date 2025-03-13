import { google } from '@ai-sdk/google'
import z from 'zod'
import { generateObject, generateText } from 'ai'
import { FlatCache } from 'flat-cache'
import { LottieFilesAnimation } from './lottiefiles'
import dedent from 'dedent'
import { RateLimit } from 'async-sema'

const model = google('gemini-2.0-flash-lite')
const cache = new FlatCache({
    cacheDir: '.cache',
    cacheId: 'animation-descriptions.json',
    ttl: 1000 * 60 * 60 * 24 * 7,
})
cache.load()

const limit = RateLimit(3800, { timeUnit: 1000 * 60 })

/**
 * Gets a description for an animation using Gemini AI model with caching
 * @param animation The animation to get a description for
 * @returns The AI-generated description
 */
export async function getAnimationDescription(animation: {
    videoUrl: string
    id: number
    url?: string
}) {
    const cacheKey = `animation-${animation.id}`
    const cachedDescription = cache.getKey(cacheKey) as any

    if (cachedDescription) {
        console.log(`Using cached description for animation ${animation.id}`)
        return cachedDescription as never
    }
    if (!animation.videoUrl) {
        throw new Error(`No videoUrl found for animation ${animation.url}`)
    }

    await limit()
    console.log(`Generating description for animation ${animation.videoUrl}`)
    try {
        const res = await generateObject({
            model,
            schema: z.object({
                description: z
                    .string()
                    .describe('description of the animation, should be first'),
                quality: z
                    .number()
                    .describe(
                        'animation quality from 0 to 10 based on how it looks, is it something that could be used in a professional animated video? or some random animation uploaded by a random user?',
                    ),
                styleTags: z
                    .array(z.string())
                    .describe(
                        'animation style tags like "flat", "3D", "cartoon", "minimalist", "isometric", "realistic", "hand-drawn"',
                    ),
            }),
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
                        Describe this Lottie animation in detail. 
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

        console.log(res.object)
        // Save to cache
        cache.setKey(cacheKey, res.object)
        cache.save()

        return res.object
    } catch (error) {
        console.error(
            `Error generating description for animation ${animation.id}:`,
            error,
        )
        throw error
    }
}
