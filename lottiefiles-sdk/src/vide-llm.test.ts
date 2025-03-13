import { test, expect } from 'vitest'
import { getAnimationDescription } from './video-llm'
import { LottieFilesAnimation } from './lottiefiles'

test('getAnimationDescription generates a description for an animation', async () => {
    // Create a simplified test animation with only required properties
    const testAnimation = {
        id: 999999,
        name: 'Test Animation',
        videoUrl:
            'https://assets-v2.lottiefiles.com/a/ca63202e-1808-11ee-a20f-4717ec9b72d0/pj15ZkLz6l.mp4',
    }

    // Get the description
    const description = await getAnimationDescription(testAnimation)

    // Verify the description is a non-empty string
    expect(description).toMatchInlineSnapshot(`
      {
        "description": "The Lottie animation features a cartoon pencil character with glasses and a smiling face. The pencil has a yellow body, a pink eraser, and a purple and white striped band. It is walking on a gray line, with its legs and arms animated to create a walking motion. The style is flat and cartoonish, with simple shapes and bold colors. The movements are smooth and looping, giving the impression of a continuous walk. The colors are bright and cheerful, with a limited palette. The illustration's abstract meaning could represent creativity, education, or the act of writing.",
        "quality": 7.5,
        "styleTags": [
          "flat",
          "cartoon",
          "minimalist",
        ],
      }
    `)
}, 30000) // Increased timeout for API call

test('getAnimationDescription on a low quality video', async () => {
    // Create a simplified test animation with only required properties
    const testAnimation = {
        id: 91119,
        name: 'Test Animation',
        videoUrl:
            'https://assets-v2.lottiefiles.com/a/e02977aa-1164-11ee-82ab-67ffa4e99ec4/cIKtzFaYVo.mp4',
    }

    // Get the description
    const description = await getAnimationDescription(testAnimation)

    // Verify the description is a non-empty string
    expect(description).toMatchInlineSnapshot(`
      {
        "description": "This Lottie animation presents a sequence of black squares appearing and disappearing. The subject is abstract, focusing on geometric shapes and their transitions. The style is minimalist, with a clean design featuring solid black squares against a white background. The movements involve the squares appearing, remaining static for a moment, and then disappearing, creating a simple on-off effect. The color palette is limited to black and white. The illustration's abstract meaning could represent the passage of time, the concept of presence and absence, or a visual representation of binary states.",
        "quality": 6.5,
        "styleTags": [
          "minimalist",
          "abstract",
          "geometric",
          "flat",
        ],
      }
    `)
}, 30000) // Increased timeout for API call
