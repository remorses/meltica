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

      **Style:**

      *   **Flat Design:** The animation uses a flat design aesthetic, characterized by simple shapes, solid colors, and a lack of gradients or textures. This gives it a clean, modern, and approachable look.
      *   **Geometric Shapes:** The character is constructed from basic geometric shapes like rectangles, triangles, and circles, making it visually straightforward and easy to understand.
      *   **Minimalist:** The animation is minimalist in its approach, focusing on essential elements and avoiding unnecessary details.
      *   **Cartoonish:** The character has a cartoonish style, with exaggerated features and a friendly expression.

      **Character:**

      *   **Pencil Personification:** The main character is a personified pencil. It has a pencil-shaped body with a pointed top, a pink eraser, and a yellow body with a white and purple band.
      *   **Facial Features:** The pencil has a simple face with a smiling expression, round green glasses, and a small, curved mouth.
      *   **Limbs:** The pencil has two pink legs with black feet and a single orange arm.

      **Movements:**

      *   **Walking:** The pencil is walking, with a simple, looping animation of its legs moving in a forward motion.
      *   **Arm Movement:** The pencil's arm is bent and moves in a swinging motion as it walks.
      *   **Smooth Animation:** The animation appears to be smooth and fluid, with no jerky movements.

      **Potential Use Cases:**

      *   **Educational Content:** The animation could be used in educational videos or presentations to introduce concepts related to writing, drawing, or creativity.
      *   **Explainer Videos:** It could be part of an explainer video for a writing app, a stationery store, or a creative service.
      *   **Website or App Animation:** The animation could be used as a loading animation, a welcome screen, or an interactive element on a website or in an app related to writing, art, or education.
      *   **Social Media Content:** It could be used in social media posts to promote writing tips, creative challenges, or educational content.
      *   **Marketing Materials:** The animation could be used in marketing materials for stationery products, art supplies, or educational programs.
      *   **Character Animation:** The animation could be used as a character in a larger animation project, such as a short film or a commercial.

      In summary, this animation is a charming and versatile piece that can be used in a variety of contexts to convey a friendly, approachable, and educational message.
      "
    `)
}, 30000) // Increased timeout for API call
