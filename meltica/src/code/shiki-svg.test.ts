import { describe, expect, it } from 'vitest'
import { getSVGRenderer } from './shiki-svg'
import { codeToTokens } from 'shiki'
import { render } from 'jsx-xml'

// Add a custom serializer for SVG content
expect.addSnapshotSerializer({
    serialize(val) {
        return val
    },
    test(val) {
        return typeof val === 'string' && val.includes('<svg')
    },
})

const codeSnippet = `function hello() {
  console.log("Hello, world!");
  return 42;
}

const result = hello();
`
describe('getSVGRenderer', () => {
    it('should create a renderer that can render tokens to SVG', async () => {
        const fonts = ['Consolas'] as const
        const fontSizes = [9, 12, 14, 18, 24]

        for (const font of fonts) {
            for (const fontSize of fontSizes) {
                // Create a renderer with different font sizes
                const renderer = await getSVGRenderer({
                    fontFamily: font,
                    fontSize: fontSize,
                    bg: '#282c34',
                })

                const { tokens } = await codeToTokens(codeSnippet, {
                    lang: 'javascript',
                    theme: 'github-dark',
                })

                // Render a simple token array
                const svg = await renderer.renderToSVG(tokens)

                // Use snapshot testing with different filenames for each combination
                await expect(svg).toMatchFileSnapshot(
                    `svg-snapshots/${font}-${fontSize}-render.svg`,
                )
            }
        }
    })
})

describe('CodeOuterGrid', () => {
    it('should render a code frame with corner markers', async () => {
        // Import the CodeOuterGrid component
        const { CodeOuterGrid } = await import('./frame')

        // Create a simple CodeOuterGrid component
        const grid = CodeOuterGrid({
            width: 600,
            height: 400,
            padding: 50,
            lineColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: '#000000',
            outerBackgroundColor: '#000000',
            cornerSize: 15,
            // children: 'Test content',
        })

        // Render the component to SVG
        const svg = await render(grid).end({ headless: true })

        // Use snapshot testing
        await expect(svg).toMatchFileSnapshot(
            'svg-snapshots/code-outer-grid-render.svg',
        )
    })
})
