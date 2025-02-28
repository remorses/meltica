import { describe, expect, it } from 'vitest'
import { getSVGRenderer, measureMonospaceTypeface } from './shiki-svg'
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

describe('measureMonospaceTypeface', () => {
    it('should measure a font', async () => {
        const measurement = await measureMonospaceTypeface('monospace')
        expect(measurement).toMatchInlineSnapshot(`
      {
        "height": 16,
        "width": 9,
      }
    `)
    })
})

const codeSnippet = `function hello() {
  console.log("Hello, world!");
  return 42;
}

const result = hello();
`

describe('getSVGRenderer', () => {
    it('should create a renderer that can render tokens to SVG', async () => {
        // Create a renderer with simple options
        const renderer = await getSVGRenderer({
            fontFamily: 'monospace',
            fontSize: 14,

            bg: '#282c34',
        })
        const { tokens } = await codeToTokens(codeSnippet, {
            lang: 'javascript',
            theme: 'github-dark',
        })

        // Render a simple token array
        const svg = renderer.renderToSVG(tokens)

        // Use snapshot testing
        expect(svg).toMatchFileSnapshot('svg-snapshots/simple-svg-render.svg')
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
        const svg = render(grid).end({ headless: true })

        // Use snapshot testing
        expect(svg).toMatchFileSnapshot(
            'svg-snapshots/code-outer-grid-render.svg',
        )
    })
})
