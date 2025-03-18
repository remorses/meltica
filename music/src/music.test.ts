import { test, describe, expect } from 'vitest'
import fs from 'fs'
import { generateMusic } from './music'
import { uploadAudioToMiniMax } from './music'
import path from 'path'

const apiKey = process.env.MINIMAX_API_KEY || ''
if (!apiKey) {
    throw new Error('MINIMAX_API_KEY is not set')
}

describe(
    'uploadAudioToMiniMax',
    () => {
        // Import the function to test

        // This test is marked as skipped since it would make a real API call
        // To run this test, you would need a valid API key and file path
        test('should upload audio file to MiniMax API', async () => {
            // Replace these with actual values when running the test

            let filePath = 'minecraft.mp3'
            // filePath = '/Volumes/1tb sabrent/downloaded youtube videos/Blod Besvimelse - Misanthrop (Remastered) [0iAL29pwpcY].mp3'

            const result = await uploadAudioToMiniMax({
                apiKey,
                filePath,
                purpose: 'instrumental',
            })

            console.log(result)
        })
    },
    1000 * 100,
)

describe(
    'upload and generate, play',
    () => {
        // Import the function to test

        // This test is marked as skipped since it would make a real API call
        // To run this test, you would need a valid API key and file path
        test('should upload audio file to MiniMax API', async () => {
            // Replace these with actual values when running the test

            let filePath =
                '/Volumes/1tb sabrent/downloaded youtube videos/Dune - The Planet Arrakis - (HDR - 4K - 5.1) [ng_DIUTuBZE]_no_vocals.mp3'
            // filePath = '/Volumes/1tb sabrent/downloaded youtube videos/Blod Besvimelse - Misanthrop (Remastered) [0iAL29pwpcY].mp3'

            console.log(`uploading file ${filePath}`)
            const result = await uploadAudioToMiniMax({
                apiKey,
                filePath,
                purpose: 'instrumental',
            })

            console.log(result)
            // Generate music using the uploaded instrumental
            console.log(
                `Generating music with instrumental ID: ${result.instrumental_id}`,
            )
            const { audioBuffer } = await generateMusic({
                apiKey,
                referInstrumental: result.instrumental_id,
                lyrics: '', // Empty lyrics for instrumental-only generation
                model: 'music-01',
            })

            // Save the generated music to a file
            const outputPath = `generated-music-${Date.now()}.mp3`
            fs.writeFileSync(outputPath, audioBuffer)

            console.log(`Generated music saved to: ${path.resolve(outputPath)}`)
        })
    },
    1000 * 100,
)

describe(
    'generateMusic',
    () => {
        // Import the function to test

        // This test is marked as skipped since it would make a real API call
        // To run this test, you would need a valid API key and reference IDs
        test('should generate music with MiniMax API', async () => {
            // Replace these with actual values when running the test

            let referInstrumental = 'instrumental-2025030600113825-eXqF5sp7'
            referInstrumental = 'instrumental-2025030600231125-kQXl8vPv'
            referInstrumental = 'instrumental-2025030600413225-XYwZZxwE'
            referInstrumental = 'instrumental-2025031103263025-DP0kpnV7'

            const lyrics = ``

            const { audioBuffer } = await generateMusic({
                apiKey,
                // referVoice,
                referInstrumental,
                lyrics,
                // Optional parameters can be customized
                model: 'music-01',
                // audioSetting: {
                //     sample_rate: 44100,
                //     bitrate: 256000,
                //     format: 'mp3',
                // },
            })

            const p = 'generated-music-5.mp3'
            fs.writeFileSync(p, audioBuffer)

            console.log('Generated music data:', p)
        })
    },
    1000 * 100, // 100 seconds timeout
)
