import fs from 'fs'
import path from 'path'
import {
    execWithInheritedStdio,
    fastFileHashFromPath,
    randomString,
} from 'meltica/src/utils'
import { melticaFolder } from 'meltica/src/rendering'

/**
 * Extracts audio from a video file using FFmpeg
 *
 * @param videoPath - Path to the source video file
 * @param options - Additional options for audio extraction
 * @returns Path to the extracted audio file
 */
export async function extractAudioFromVideo(
    videoPath: string,

    options: {
        format?: 'mp3' | 'wav' | 'aac' | 'ogg'
        bitrate?: string
        sampleRate?: number
        channels?: number
        startTime?: string
        duration?: string
    } = {},
): Promise<string> {
    if (!fs.existsSync(videoPath)) {
        throw new Error(`Video file not found: ${videoPath}`)
    }

    // Set default options
    const format = options.format || 'mp3'
    const bitrate = options.bitrate || '192k'
    const sampleRate = options.sampleRate || 44100
    const channels = options.channels || 2

    const hash = fastFileHashFromPath(videoPath).substring(0, 8)
    const tempDir = path.join(process.cwd(), melticaFolder)

    // Create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true })
    }

    let outputPath = path.join(
        tempDir,
        `audio_${hash}_${randomString(4)}.${format}`,
    )
    // Build FFmpeg command
    let ffmpegCommand = `ffmpeg -i "${videoPath}" -vn -acodec ${format === 'wav' ? 'pcm_s16le' : format} -ar ${sampleRate} -ac ${channels} -b:a ${bitrate}`

    // Add time options if provided
    if (options.startTime) {
        ffmpegCommand += ` -ss ${options.startTime}`
    }

    if (options.duration) {
        ffmpegCommand += ` -t ${options.duration}`
    }

    // Add output path
    ffmpegCommand += ` "${outputPath}" -y`

    // Execute FFmpeg command
    try {
        await execWithInheritedStdio(ffmpegCommand)
        return outputPath
    } catch (error) {
        throw new Error(`Failed to extract audio: ${error.message}`)
    }
}
