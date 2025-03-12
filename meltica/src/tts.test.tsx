import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { generateSpeechToFileCached } from './tts'

describe('generateSpeechToFile', () => {
    it('should generate speech file and return file path and duration', async () => {
        const outputPath = path.resolve(
            process.cwd(),
            'src/fixtures/speech/examplewithpause.wav',
        )

        // Make sure the directory exists
        const dir = path.dirname(outputPath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        const result = await generateSpeechToFileCached({
            text: 'Hello, my name is Sonic.<break time="1s"/>Nice to meet you.',
            id: 'test-speech',
            language: 'en',
            filepath: outputPath,
        })

        // Assert
        expect(result).toBeDefined()
        expect(result.filePath).toBe(outputPath)
        expect(result.durationInSeconds).toBeGreaterThan(0)

        // Verify file exists
        expect(fs.existsSync(result.filePath)).toBe(true)

        // Check file content
        const fileStats = fs.statSync(result.filePath)
        expect(fileStats.size).toBeGreaterThan(0)
    })
})
