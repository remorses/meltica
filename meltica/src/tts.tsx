import { CartesiaClient } from '@cartesia/cartesia-js'
import { AudioContext } from 'node-web-audio-api'
import crypto from 'node:crypto'
import process from 'node:process'
import fs from 'node:fs'
import { createCache } from 'meltica/src/cache'
import { Emotion, SupportedLanguage } from '@cartesia/cartesia-js/api/index'
import { Asset, FadeOutAudio } from 'meltica/src/components'
import { melticaFolder } from 'meltica/src/rendering'
import path from 'node:path'

const apiKey = process.env.CARTESIA_API_KEY || ''

if (!apiKey) {
    throw new Error('CARTESIA_API_KEY is not set')
}
const client = new CartesiaClient({ apiKey })

const ttsCache = createCache({
    cacheId: 'tts-cache.json',
})

type Props = {
    text: string
    language?: SupportedLanguage
    id: string
    in?: number
    out?: number
    children?: any

    /**
     *  0.0 is the default speed, -1.0 is the slowest speed, and 1.0 is the fastest speed.
     */
    speed?: number
}

export const generateSpeechToFile = ttsCache.wrap(
    { key: 'generateSpeechToFile' },
    async function generateSpeechToFile({
        text,
        speed = 0,
        language = 'en',
        id,
    }: Props) {
        const container = 'wav' as const
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
                container: container,
                sampleRate: 44100,
                bitRate: 320000,
                encoding: 'pcm_s16le',
            },
        })

        // Create meltica directory if it doesn't exist
        if (!fs.existsSync(melticaFolder)) {
            fs.mkdirSync(melticaFolder, { recursive: true })
        }
        // Create a hash of the text for caching purposes
        const textHash = crypto.createHash('md5').update(text).digest('hex')
        // Create an AudioContext and decode the audio data to get duration
        const audioContext = new AudioContext()
        const buffer = Buffer.from(response)
        const audioBuffer = await audioContext.decodeAudioData(buffer.buffer as any)
        const durationInSeconds = audioBuffer.duration
        audioContext.close()
        // Save the file
        const filePath = path.join(
            melticaFolder,
            `speech-${id}-${textHash}.${container}`,
        )
        await fs.promises.writeFile(filePath, buffer)
        console.timeEnd(`Generate speech for ${id}`)
        return { filePath, durationInSeconds }
    },
)

export async function TextToSpeech(props: Props) {
    const { filePath } = await generateSpeechToFile(props)
    return (
        <Asset
            id={props.id}
            type='audio'
            filepath={filePath}
            in={props.in}
            out={props.out}
        >
            {/* sometimes there is a pop sound at the end */}
            <FadeOutAudio duration={0.05} />
            {props.children}
        </Asset>
    )
}
