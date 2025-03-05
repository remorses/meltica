import mime from 'mime'
import fs from 'fs'
import path from 'path'

/**
 * Uploads audio to MiniMax API
 *
 * @param options Upload options including API key, file path, and purpose
 * @returns Promise with the upload response containing voice_id and/or instrumental_id
 */
export async function uploadAudioToMiniMax({
    apiKey,
    filePath,
    purpose,
}: {
    /** API key for authentication */
    apiKey: string
    /**
     * Audio file path, supports WAV and MP3 formats.
     * The audio duration must be longer than 10s and no more than 10 minutes.
     */
    filePath: string
    /**
     * Purpose of the upload:
     * - song: Upload music file with both vocals and accompaniment
     * - voice: Upload file with only vocals in singing form
     * - instrumental: Upload file with only accompaniment
     */
    purpose: 'song' | 'voice' | 'instrumental'
}) {
    const formData = new FormData()

    // Add the purpose as regular form data
    formData.append('purpose', purpose)

    // Add the file with its name and proper mime type
    const fileName = path.basename(filePath)
    const fileBlob = new Blob([fs.readFileSync(filePath)], {
        type: mime.getType(filePath) || 'audio/mpeg',
    })
    formData.append('file', fileBlob, fileName)

    const response = await fetch('https://api.minimaxi.chat/v1/music_upload', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
    })

    if (!response.ok) {
        const res = await response.text()
        throw new Error(
            `Upload failed with status: ${response.status}, response: ${res}`,
        )
    }

    const data = (await response.json()) as {
        /** The voice_id will only be returned when the purpose is song or voice */
        voice_id?: string
        /** The instrumental_id will only be returned when the purpose is song or instrumental */
        instrumental_id?: string
        /** Error codes, status messages, and corresponding details */
        base_resp: {
            /**
             * Error codes:
             * 0: Success
             * 1001: Timeout
             * 1002: Trigger flow restriction
             * 1004: Authentication failure
             * 1008: Insufficient balance
             * 2013: Invalid input format
             * 2044: No Permission
             */
            status_code: number
            /** Status details */
            status_msg: string
        }
    }
    if (data.base_resp.status_code !== 0) {
        throw new Error(
            `Upload failed with status code: ${data.base_resp.status_code}, message: ${data.base_resp.status_msg}`,
        )
    }
    return data
}

export type MusicGenerationParams = {
    /** MiniMax API key */
    apiKey: string
    /** Optional voice_id from the Upload API */
    referVoice?: string
    /** Optional instrumental_id from the Upload API */
    referInstrumental?: string
    /** Lyrics for the song. Use \n to separate lines, \n\n for pauses, and ## to add accompaniment */
    lyrics: string
    /** Model to use for generation, defaults to 'music-01' */
    model?: string
    /** Optional audio settings for the generated track */
    audioSetting?: {
        /** Sample rate in Hz, defaults to 44100 */
        sample_rate?: number
        /** Bitrate in bits per second, defaults to 256000 */
        bitrate?: number
        /** Audio format, defaults to 'mp3' */
        format?: string
    }
}

/**
 * Generates an AI music track using MiniMax API
 *

 */
export async function generateMusic({
    apiKey,
    referVoice,
    referInstrumental,
    lyrics,
    model = 'music-01',
    audioSetting = {
        sample_rate: 44100,
        bitrate: 256000,
        format: 'mp3',
    },
}: MusicGenerationParams) {
    if (!referVoice && !referInstrumental) {
        throw new Error(
            'At least one of referVoice or referInstrumental is required',
        )
    }

    const formData = new FormData()

    if (referVoice) {
        formData.append('refer_voice', referVoice)
    }

    if (referInstrumental) {
        formData.append('refer_instrumental', referInstrumental)
    }

    formData.append('lyrics', lyrics)
    formData.append('model', model)
    formData.append('audio_setting', JSON.stringify(audioSetting))

    const response = await fetch(
        'https://api.minimaxi.chat/v1/music_generation',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            body: formData,
        },
    )

    if (!response.ok) {
        const res = await response.text()
        throw new Error(
            `Music generation failed with status: ${response.status}, response: ${res}`,
        )
    }

    const data = (await response.json()) as {
        data: {
            /** The generated audio data in hexadecimal format */
            audio: string
        }
        /** Extra information about the generated audio */
        extra_info?: {
            /** Duration of the audio in milliseconds */
            audio_length: number
            /** Size of the audio file in bytes */
            audio_size: number
            /** Bitrate of the audio in bits per second */
            audio_bitrate: number
            /** Sample rate of the audio in Hz */
            audio_sample_rate: number
        }
        /** Error codes, status messages, and corresponding details */
        base_resp: {
            /**
             * Error codes:
             * 0: Success
             * 1001: Timeout
             * 1002: Trigger flow restriction
             * 1004: Authentication failure
             * 1008: Insufficient balance
             * 2013: Invalid input format
             * 2044: No Permission
             */
            status_code: number
            /** Status details */
            status_msg: string
        }
    }

    if (data.base_resp.status_code !== 0) {
        throw new Error(
            `Music generation failed with status code: ${data.base_resp.status_code}, message: ${data.base_resp.status_msg}`,
        )
    }

    // Decode the hex string to a buffer
    const audioHex = data.data.audio
    const audioBuffer = Buffer.from(audioHex, 'hex')
    
    return {
        audioBuffer,
        data
    }
}
