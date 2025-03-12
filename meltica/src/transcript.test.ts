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
            'src/fixtures/speech/speech-tts2.wav',
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
                "Today is a new day and today ",
                "we will talk about Dune. ",
                "And now what should we do? ",
                "Longer text, that is.",
              ]
            `,
            )
        })
        it('splitTextInParts works on transcript, using pauses', async () => {
            const result = await transcribeAudioFileCached({
                filePath: audioFilePath,
            })
            const split = splitTextInParts({
                items: result.words,
                getText(item) {
                    return item.text
                },
                isSeparatorItem(currentItem, nextItem) {
                    if (!nextItem || !currentItem.end || !nextItem.start) {
                        return false
                    }
                    const isPause = nextItem?.start - currentItem.end > 0.4
                    if (isPause) {
                        console.log('is pause', currentItem, nextItem)
                    }
                    return isPause
                },
                maxLen: 30,
            })

            expect(
                split.map((x) => x.map((y) => y.text).join('')),
            ).toMatchInlineSnapshot(
                `
              [
                "Today is a new day and today ",
                "we will talk about Dune. ",
                "And now what should we do? ",
                "Longer text, that is.",
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
                "language_probability": 0.9767968058586121,
                "text": "Today is a new day and today we will talk about Dune. And now what should we do? Longer text, that is.",
                "words": [
                  {
                    "end": 0.539,
                    "pause": 0.14,
                    "start": 0.059,
                    "text": "Today ",
                    "type": "word",
                  },
                  {
                    "end": 0.74,
                    "pause": 0.08099999999999996,
                    "start": 0.539,
                    "text": "is ",
                    "type": "word",
                  },
                  {
                    "end": 0.919,
                    "pause": 0.16000000000000003,
                    "start": 0.74,
                    "text": "a ",
                    "type": "word",
                  },
                  {
                    "end": 1.139,
                    "pause": 0.1200000000000001,
                    "start": 0.919,
                    "text": "new ",
                    "type": "word",
                  },
                  {
                    "end": 1.819,
                    "pause": 0.24,
                    "start": 1.139,
                    "text": "day ",
                    "type": "word",
                  },
                  {
                    "end": 2.099,
                    "pause": 0.020000000000000018,
                    "start": 1.819,
                    "text": "and ",
                    "type": "word",
                  },
                  {
                    "end": 2.72,
                    "pause": 0.121,
                    "start": 2.099,
                    "text": "today ",
                    "type": "word",
                  },
                  {
                    "end": 2.96,
                    "pause": 0.040999999999999925,
                    "start": 2.72,
                    "text": "we ",
                    "type": "word",
                  },
                  {
                    "end": 3.199,
                    "pause": 0.040000000000000036,
                    "start": 2.96,
                    "text": "will ",
                    "type": "word",
                  },
                  {
                    "end": 3.479,
                    "pause": 0.040000000000000036,
                    "start": 3.199,
                    "text": "talk ",
                    "type": "word",
                  },
                  {
                    "end": 3.879,
                    "pause": 0.1389999999999998,
                    "start": 3.48,
                    "text": "about ",
                    "type": "word",
                  },
                  {
                    "end": 5.079,
                    "pause": 0.6989999999999998,
                    "start": 3.879,
                    "text": "Dune. ",
                    "type": "word",
                  },
                  {
                    "end": 5.359,
                    "pause": 0.019999999999999574,
                    "start": 5.079,
                    "text": "And ",
                    "type": "word",
                  },
                  {
                    "end": 5.859,
                    "pause": 0.1200000000000001,
                    "start": 5.359,
                    "text": "now ",
                    "type": "word",
                  },
                  {
                    "end": 6.179,
                    "pause": 0.14000000000000057,
                    "start": 5.859,
                    "text": "what ",
                    "type": "word",
                  },
                  {
                    "end": 6.44,
                    "pause": 0.020000000000000462,
                    "start": 6.179,
                    "text": "should ",
                    "type": "word",
                  },
                  {
                    "end": 6.719,
                    "pause": 0.020000000000000462,
                    "start": 6.44,
                    "text": "we ",
                    "type": "word",
                  },
                  {
                    "end": 7.679,
                    "pause": 0.4800000000000004,
                    "start": 6.719,
                    "text": "do? ",
                    "type": "word",
                  },
                  {
                    "end": 8.199,
                    "pause": 0.11999999999999922,
                    "start": 7.679,
                    "text": "Longer ",
                    "type": "word",
                  },
                  {
                    "end": 8.659,
                    "pause": 0.040000000000000924,
                    "start": 8.199,
                    "text": "text, ",
                    "type": "word",
                  },
                  {
                    "end": 8.84,
                    "pause": 0.03999999999999915,
                    "start": 8.659,
                    "text": "that ",
                    "type": "word",
                  },
                  {
                    "end": 8.96,
                    "start": 8.84,
                    "text": "is.",
                    "type": "word",
                  },
                ],
              }
            `)
        })
    },
    1000 * 100,
)
