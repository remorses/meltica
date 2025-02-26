import { describe, expect, it } from 'vitest'
import { getSVGRenderer, measureMonospaceTypeface } from './shiki-svg'
import { codeToTokens } from 'shiki'

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
