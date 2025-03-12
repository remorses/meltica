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
      "Here's a detailed description of the animation:

      Subject: The animation features a cartoon pencil character.

      Style: The animation has a flat, minimalist design. The pencil is composed of simple geometric shapes with no outlines. The style is clean and modern.

      Movements: The pencil is walking. It has a simple, looping walk cycle with its legs moving in a forward motion. The pencil's body bobs slightly as it walks.

      Colors: The pencil uses a bright and cheerful color palette. The main body is yellow-orange, the eraser is pink, the tip is gray, and the cap is dark purple. The pencil has a white band with a purple stripe. The legs are pink, and the shoes are black. The glasses are green.

      Illustration Abstract Meaning: The animation likely represents creativity, learning, or the act of writing and drawing. The cheerful expression and walking motion suggest a positive and active approach to these activities. The glasses could imply intelligence or a focus on detail. The overall impression is friendly and approachable.
      "
    `)
}, 30000) // Increased timeout for API call
