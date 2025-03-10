import { test, describe, expect } from 'vitest'
import fs from 'fs'
import { getLUFSVolume } from './rms-volume'

describe('getLUFSVolume', () => {
  test('should calculate LUFS volume for an audio file', async () => {
    // Path to the test audio file
    const filePath = '/Volumes/1tb sabrent/downloaded youtube videos/Blod Besvimelse - Misanthrop (Remastered) [0iAL29pwpcY].mp3'
    
    // Read the file as a buffer
    const fileBuffer = fs.readFileSync(filePath)
    
    // Calculate LUFS volume
    const result = await getLUFSVolume(fileBuffer.buffer as any)
    
   
    // Use inline snapshot for the result structure (excluding momentary array for brevity)
    expect({
      integrated: result.integrated,
      max: result.max,
      min: result.min,
      range: result.range,
      momentaryLength: result.momentary.length
    }).toMatchInlineSnapshot(`
      {
        "integrated": -14.597866096988852,
        "max": -10.118437462966634,
        "min": -63.3818056846823,
        "momentaryLength": 1566,
        "range": 53.263368221715666,
      }
    `)
  }, 30000) // Increase timeout to 30 seconds as audio processing might take time
})

