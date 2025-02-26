import { describe, expect, it } from 'vitest'
import { getSVGRenderer, measureMonospaceTypeface } from './code'

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

describe('getSVGRenderer', () => {
    it('should create a renderer that can render tokens to SVG', async () => {
        // Create a renderer with simple options
        const renderer = await getSVGRenderer({
            fontFamily: 'monospace',
            fontSize: 14,
            bg: '#282c34',
        })

        // Render a simple token array
        const svg = renderer.renderToSVG([
            [{ content: 'test', color: '#ff0000', fontStyle: 0, offset: 0 }],
        ])

        // Use snapshot testing
        expect(svg).toMatchFileSnapshot('svg-snapshots/simple-svg-render.svg')
    })
})
