import { describe, it, expect } from 'vitest'
import path from 'path'
import fs from 'fs'
import { transcribeAudioFileCached } from './transcript'
import { splitTextInParts } from 'meltica/src/split'

describe(
    'Transcription',
    () => {
        const audioFilePath = path.resolve(
            process.cwd(),
            'src/fixtures/speech/examplewithpause.wav',
        )

        // Check if the file exists (this is just a safety check)
        if (!fs.existsSync(audioFilePath)) {
            throw new Error(`Test audio file not found at ${audioFilePath}`)
        }

        it('splitTextInParts works on transcript', async () => {
            const result = await transcribeAudioFileCached({
                filePath: audioFilePath,
            })
            const split = splitTextInParts({
                items: result.words,
                getText(item) {
                    return item.text
                },
                maxLen: 30,
            })

            expect(
                split.map((x) => x.map((y) => y.text).join('')),
            ).toMatchInlineSnapshot(
                `
              [
                "Hello, my name is Sonic. ",
                "Nice to meet you.",
              ]
            `,
            )
        })
        it('splitTextInParts works on transcript, using pauses', async () => {
            const result = await transcribeAudioFileCached({
                filePath: audioFilePath,
            })
            let foundPause = false
            const split = splitTextInParts({
                items: result.words,
                getText(item) {
                    return item.text
                },
                isSeparatorItem(currentItem, nextItem) {
                    if (!nextItem || !currentItem.start || !nextItem.start) {
                        return false
                    }
                    const isPause = nextItem?.start - currentItem.start > 1
                    if (isPause) {
                        foundPause = true
                    }
                    return isPause
                },
                maxLen: 30,
            })
            expect(foundPause).toBe(true)

            expect(
                split.map((x) => x.map((y) => y.text).join('')),
            ).toMatchInlineSnapshot(
                `
              [
                "Hello, my name is Sonic. ",
                "Nice to meet you.",
              ]
            `,
            )
        })
        it('should transcribe an audio file and cache the result', async ({}) => {
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
                "language_probability": 0.9889909029006958,
                "text": "Hello, my name is Sonic. Nice to meet you.",
                "words": [
                  {
                    "end": 0.579,
                    "pause": 0.05999999999999994,
                    "start": 0.059,
                    "text": "Hello, ",
                    "type": "word",
                  },
                  {
                    "end": 0.699,
                    "pause": 0.018999999999999906,
                    "start": 0.579,
                    "text": "my ",
                    "type": "word",
                  },
                  {
                    "end": 0.939,
                    "pause": 0.039999999999999925,
                    "start": 0.699,
                    "text": "name ",
                    "type": "word",
                  },
                  {
                    "end": 1.079,
                    "pause": 0.020000000000000018,
                    "start": 0.939,
                    "text": "is ",
                    "type": "word",
                  },
                  {
                    "end": 2.72,
                    "pause": 0.06100000000000039,
                    "start": 1.079,
                    "text": "Sonic. ",
                    "type": "word",
                  },
                  {
                    "end": 2.96,
                    "pause": 0.040999999999999925,
                    "start": 2.72,
                    "text": "Nice ",
                    "type": "word",
                  },
                  {
                    "end": 3.079,
                    "pause": 0.07900000000000018,
                    "start": 2.96,
                    "text": "to ",
                    "type": "word",
                  },
                  {
                    "end": 3.279,
                    "pause": 0,
                    "start": 3.079,
                    "text": "meet ",
                    "type": "word",
                  },
                  {
                    "end": 3.459,
                    "start": 3.279,
                    "text": "you.",
                    "type": "word",
                  },
                ],
              }
            `)
        })
    },
    1000 * 100,
)
