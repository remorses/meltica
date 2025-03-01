import { describe, expect, it } from 'vitest'
import fs from 'fs'
import path from 'path'
import { detectBpm } from './detect-bpm'

describe('detectBpm', () => {
    it('should detect BPM from audio file', async () => {
        const testAudioPath = 'edapollo - Let It Go [bQ5glYCsv94].mp3'
        // Read the audio file
        const audioBuffer = fs.readFileSync(testAudioPath)

        // Detect BPM
        console.time('detectBpm');
        const bpm = await detectBpm(Buffer.from(audioBuffer).buffer);
        console.timeEnd('detectBpm');

        expect(bpm).toMatchInlineSnapshot(`
          {
            "bpm": 111,
            "intervalInSeconds": 0.5405405405405406,
          }
        `)
    })
})
