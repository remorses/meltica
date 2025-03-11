import { describe, it, expect } from 'vitest'
import path from 'path'
import fs from 'fs'
import { transcribeAudioFileCached } from './transcript'

describe(
    'Transcription',
    () => {
        it('should transcribe an audio file and cache the result', async ({}) => {
            // PLACEHOLDER: Replace with the path to your audio file
            // Using a file from the music directory as a placeholder
            const audioFilePath = path.resolve(
                process.cwd(),
                'src/fixtures/speech/speech-tts1.mp3',
            )

            // Check if the file exists (this is just a safety check)
            if (!fs.existsSync(audioFilePath)) {
                throw new Error(`Test audio file not found at ${audioFilePath}`)
            }

            // Call the transcription function
            const result = await transcribeAudioFileCached({
                filePath: audioFilePath,
                language: 'en',
                prompt: 'Transcribe the following audio',
            })

            // Basic assertions
            expect(result).toBeDefined()
            expect(result.words).toBeDefined()
            expect(Array.isArray(result.words)).toBe(true)

            // Call it again to test caching
            const cachedResult = await transcribeAudioFileCached({
                filePath: audioFilePath,
                language: 'en',
                prompt: 'Transcribe the following audio',
            })

            // The cached result should match the original result
            expect(cachedResult).toMatchInlineSnapshot(`
              {
                "diarizationSegments": [],
                "text": " Hi everybody, how is it going?",
                "words": [
                  {
                    "speaker": null,
                    "text": " Hi",
                    "timestamp": [
                      0,
                      0,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " everybody,",
                    "timestamp": [
                      0,
                      0,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " how",
                    "timestamp": [
                      0,
                      0,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " is",
                    "timestamp": [
                      0,
                      0,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " it",
                    "timestamp": [
                      0,
                      0,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " going?",
                    "timestamp": [
                      0,
                      0.4,
                    ],
                  },
                ],
              }
            `)
        })
    },
    1000 * 100,
)
