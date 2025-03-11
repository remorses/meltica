import { describe, it, expect } from 'vitest'
import path from 'path'
import fs from 'fs'
import { transcribeAudioFileCached } from './transcript'

describe(
    'Transcription',
    () => {
        it('should transcribe an audio file and cache the result', async ({}) => {
            const audioFilePath = path.resolve(
                process.cwd(),
                'src/fixtures/speech/speech-tts2.wav',
            )

            // Check if the file exists (this is just a safety check)
            if (!fs.existsSync(audioFilePath)) {
                throw new Error(`Test audio file not found at ${audioFilePath}`)
            }

            // Call the transcription function
            const result = await transcribeAudioFileCached({
                filePath: audioFilePath,
                // language: 'en',
                // prompt: 'Transcribe the following audio',
            })

            // The cached result should match the original result
            expect(result).toMatchInlineSnapshot(`
              {
                "diarizationSegments": [],
                "text": " Today is a new day, and today we will talk about Dune. And now, what should we do? Longer text, that is.",
                "words": [
                  {
                    "speaker": null,
                    "text": " Today",
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
                    "text": " a",
                    "timestamp": [
                      0,
                      0,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " new",
                    "timestamp": [
                      0,
                      0,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " day,",
                    "timestamp": [
                      0,
                      0,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " and",
                    "timestamp": [
                      0,
                      0.12,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " today",
                    "timestamp": [
                      0.12,
                      0.52,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " we",
                    "timestamp": [
                      0.52,
                      0.68,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " will",
                    "timestamp": [
                      0.68,
                      0.92,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " talk",
                    "timestamp": [
                      0.92,
                      1.24,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " about",
                    "timestamp": [
                      1.24,
                      1.46,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " Dune.",
                    "timestamp": [
                      1.46,
                      2.7,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " And",
                    "timestamp": [
                      2.7,
                      2.98,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " now,",
                    "timestamp": [
                      2.98,
                      3.6,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " what",
                    "timestamp": [
                      3.6,
                      3.82,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " should",
                    "timestamp": [
                      3.82,
                      4.06,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " we",
                    "timestamp": [
                      4.06,
                      4.24,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " do?",
                    "timestamp": [
                      4.24,
                      5.52,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " Longer",
                    "timestamp": [
                      5.52,
                      5.88,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " text,",
                    "timestamp": [
                      5.88,
                      6.46,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " that",
                    "timestamp": [
                      6.46,
                      6.86,
                    ],
                  },
                  {
                    "speaker": null,
                    "text": " is.",
                    "timestamp": [
                      6.86,
                      7.74,
                    ],
                  },
                ],
              }
            `)
        })
    },
    1000 * 100,
)
