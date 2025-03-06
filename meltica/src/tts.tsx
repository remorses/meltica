import { CartesiaClient } from '@cartesia/cartesia-js'
import process from 'node:process'
import fs from 'node:fs'
import { createCache } from 'meltica/src/cache'
import { Emotion, SupportedLanguage } from '@cartesia/cartesia-js/api/index'
import { Asset } from 'meltica/src/components'
import { melticaFolder } from 'meltica/src/rendering'
import path from 'node:path'

const apiKey = process.env.CARTESIA_API_KEY || ''

if (!apiKey) {
    throw new Error('CARTESIA_API_KEY is not set')
}
const client = new CartesiaClient({ apiKey })

const ttsCache = createCache({
    cacheId: 'tts-cache',
})

type Props = {
    text: string
    language?: SupportedLanguage
    id: string
    in?: number
    out?: number
    /**
     *  0.0 is the default speed, -1.0 is the slowest speed, and 1.0 is the fastest speed.
     */
    speed?: number
}

const generateSpeechToFile = ttsCache.wrap(
    'generateSpeechToFile',
    async function generateSpeechToFile({
        text,
        speed = 0,
        language = 'en',
        id,
    }: Props) {
        console.time(`Generate speech for ${id}`)
        const response = await client.tts.bytes({
            modelId: 'sonic-english',
            transcript: text,
            voice: {
                mode: 'id',
                experimentalControls: {
                    speed,
                    emotion: [],
                },
                id: 'bbf93c49-e188-4eb9-b731-c31ebb049399',
            },
            language: language,
            outputFormat: {
                container: 'mp3',
                sampleRate: 44100,
                bitRate: 128000,
            },
        })

        // Create meltica directory if it doesn't exist
        if (!fs.existsSync(melticaFolder)) {
            fs.mkdirSync(melticaFolder, { recursive: true })
        }

        // Save the file
        const filePath = path.join(melticaFolder, `speech-${id}.mp3`)
        await fs.promises.writeFile(filePath, Buffer.from(response))
        console.timeEnd(`Generate speech for ${id}`)
        return { filePath }
    },
)

export async function TextToSpeech(args: Props) {
    const { filePath } = await generateSpeechToFile(args)
    return (
        <Asset
            id={args.id}
            type='audio'
            filepath={filePath}
            in={args.in}
            out={args.out}
        />
    )
}
