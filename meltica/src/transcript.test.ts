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
                "language_code": "eng",
                "language_probability": 0.9767968058586121,
                "text": "Today is a new day and today we will talk about Dune. And now what should we do? Longer text, that is.",
                "words": [
                  {
                    "end": 0.399,
                    "start": 0.059,
                    "text": "Today",
                    "type": "word",
                  },
                  {
                    "end": 0.659,
                    "start": 0.399,
                    "text": " is",
                    "type": "word",
                  },
                  {
                    "end": 0.759,
                    "start": 0.659,
                    "text": " a",
                    "type": "word",
                  },
                  {
                    "end": 1.019,
                    "start": 0.759,
                    "text": " new",
                    "type": "word",
                  },
                  {
                    "end": 1.579,
                    "start": 1.019,
                    "text": " day",
                    "type": "word",
                  },
                  {
                    "end": 2.079,
                    "start": 1.579,
                    "text": " and",
                    "type": "word",
                  },
                  {
                    "end": 2.599,
                    "start": 2.079,
                    "text": " today",
                    "type": "word",
                  },
                  {
                    "end": 2.919,
                    "start": 2.599,
                    "text": " we",
                    "type": "word",
                  },
                  {
                    "end": 3.159,
                    "start": 2.919,
                    "text": " will",
                    "type": "word",
                  },
                  {
                    "end": 3.439,
                    "start": 3.159,
                    "text": " talk",
                    "type": "word",
                  },
                  {
                    "end": 3.74,
                    "start": 3.439,
                    "text": " about",
                    "type": "word",
                  },
                  {
                    "end": 4.38,
                    "start": 3.74,
                    "text": " Dune.",
                    "type": "word",
                  },
                  {
                    "end": 5.339,
                    "start": 4.38,
                    "text": " And",
                    "type": "word",
                  },
                  {
                    "end": 5.739,
                    "start": 5.339,
                    "text": " now",
                    "type": "word",
                  },
                  {
                    "end": 6.039,
                    "start": 5.739,
                    "text": " what",
                    "type": "word",
                  },
                  {
                    "end": 6.42,
                    "start": 6.039,
                    "text": " should",
                    "type": "word",
                  },
                  {
                    "end": 6.699,
                    "start": 6.42,
                    "text": " we",
                    "type": "word",
                  },
                  {
                    "end": 7.199,
                    "start": 6.699,
                    "text": " do?",
                    "type": "word",
                  },
                  {
                    "end": 8.079,
                    "start": 7.199,
                    "text": " Longer",
                    "type": "word",
                  },
                  {
                    "end": 8.619,
                    "start": 8.079,
                    "text": " text,",
                    "type": "word",
                  },
                  {
                    "end": 8.8,
                    "start": 8.619,
                    "text": " that",
                    "type": "word",
                  },
                  {
                    "end": 8.96,
                    "start": 8.8,
                    "text": " is.",
                    "type": "word",
                  },
                ],
              }
            `)
        })
    },
    1000 * 100,
)
