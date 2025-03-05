import { google } from '@ai-sdk/google'
import { generateText, streamText } from 'ai'
import { test } from 'vitest'
test('google ai works with video', async () => {
    const model = google('gemini-2.0-flash-001')
    const res = await streamText({
        model,

        messages: [
            {
                role: 'user',

                content: [
                    {
                        type: 'file',
                        mimeType: 'video/mp4',
                        data: 'https://storage.googleapis.com/cloud-samples-data/generative-ai/video/ad_copy_from_video.mp4',
                    },
                ],
            },
            { role: 'user', content: 'What is this video about?' },
        ],
    })
    for await (let part of res.textStream) {
        process.stdout.write(part)
    }
    console.log(await res.text)
    console.log('done')
}, 1000 * 100)
