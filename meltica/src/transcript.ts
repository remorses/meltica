import { fal } from '@fal-ai/client'
import { WhisperInput, WhisperOutput } from '@fal-ai/client/endpoints'
import fs from 'fs'
import path from 'path'
import {
    createDataUrlFromBuffer,
    createDataUrlFromPath,
    fastFileHash,
} from 'meltica/src/utils'
import { createCache } from './cache'
import { melticaFolder } from 'meltica/src/rendering'

// Configure fal.ai client
fal.config({
    // Can also be auto-configured using environment variables:
    credentials: process.env.FAL_API_KEY,
})

// Define the language type based on Whisper supported languages
type WhisperLanguage = WhisperInput['language']

// Define common types for transcription functions
type TranscriptionOptions = {
    language?: WhisperLanguage
    prompt?: string
}

type TranscriptionResult = {
    text: string
    words: {
        timestamp: number[]
        /**
         * Transcription of the chunk
         */
        text: string
    }[]
    diarizationSegments?: {
        timestamp: number[]
        speaker: string
    }
}

// Create a cache for transcription results
const transcriptionCache = createCache({
    cacheId: 'transcription',
    ttl: 1000 * 60 * 60 * 24 * 30, // 30 days
})

/**
 * Transcribes audio using the fal.ai whisper model
 * @param audioBuffer - Buffer containing audio data
 * @param language - Language code (default: 'en')
 * @param prompt - Optional prompt for the transcription
 * @returns Object containing transcription data with word-level chunks
 */
export async function transcribeAudioBuffer({
    audioBuffer,
    language = 'en',
    prompt = 'Transcribe the following audio',
}: TranscriptionOptions & {
    audioBuffer: Buffer
}): Promise<TranscriptionResult> {
    const timerId = `transcribe ${Math.random().toString(36).substring(2, 10)}`
    console.time(timerId)

    // Convert buffer to data URL
    const audioUrl = await createDataUrlFromBuffer(audioBuffer)

    // Use fal.ai to transcribe audio with Whisper
    const transcription = await fal.subscribe('fal-ai/whisper', {
        input: {
            audio_url: audioUrl,
            language,
            prompt,
            chunk_level: 'word',
        },
        logs: true,
        onQueueUpdate: (update) => {
            if (update.status === 'IN_PROGRESS') {
                // update.logs.map((log) => log.message).forEach(console.log)
            }
        },
    })

    console.timeEnd(timerId)
    const chunks = transcription.data.chunks || []
    return {
        text: transcription.data.text,
        // TODO fal.ai has bugs in timestamp type, void[]
        words: chunks as any,
        diarizationSegments:
            (transcription.data.diarization_segments as any) || [],
    }
}

/**
 * Transcribes an audio file using the fal.ai whisper model
 * Results are cached using file content hash for efficient reuse
 * @param filePath - Path to the audio file
 * @param language - Language code (default: 'en')
 * @param prompt - Optional prompt for the transcription
 * @returns Object containing transcription data with word-level chunks
 */
export const transcribeAudioFileCached = transcriptionCache.wrap(
    {
        key: 'transcribeAudioFile',
        replacer(key, value) {
            if (key === 'filePath' && value) {
                return fastFileHash(value)
            }
            return value
        },
    },
    async ({
        filePath,
        language = 'en',
        prompt = 'Transcribe the following audio',
    }: TranscriptionOptions & {
        filePath: string
    }): Promise<TranscriptionResult> => {
        // Read the file into a buffer
        const audioBuffer = await fs.promises.readFile(filePath)

        // Call the existing transcribeAudioBuffer function
        return transcribeAudioBuffer({
            audioBuffer,
            language,
            prompt,
        })
    },
)
