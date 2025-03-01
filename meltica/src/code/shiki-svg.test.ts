import { describe, expect, it } from 'vitest'
import xmlbuilder from 'xmlbuilder2'
import { FontFamily, renderCodeToSVG } from './shiki-svg'
import { codeToTokens } from 'shiki'
import { render } from 'jsx-xml'
import { CodeOuterGrid } from 'meltica/src/code/frame'

// Add a custom serializer for SVG content
expect.addSnapshotSerializer({
    serialize(val) {
        return val
    },
    test(val) {
        return typeof val === 'string' && val.includes('<svg')
    },
})

const codeSnippet = `
function hello() {
  console.log("Hello, world!");
  return 42;
}

const result = hello();
`
describe('getSVGRenderer', () => {
    it('should create a renderer that can render tokens to SVG', async () => {
        const fonts: FontFamily[] = ['Consolas', 'Menlo', 'Courier']
        const fontSizes = [9, 12, 14, 18, 24]

        for (const font of fonts) {
            for (const fontSize of fontSizes) {
                // Create a renderer with different font sizes

                const { tokens } = await codeToTokens(codeSnippet, {
                    lang: 'javascript',
                    theme: 'github-dark',
                })

                // Render a simple token array
                const { svg } = await renderCodeToSVG({
                    fontFamily: font,
                    fontSize: fontSize,
                    bg: '#000',
                    tokens,
                })

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

        const { tokens } = await codeToTokens(codeSnippet, {
            lang: 'javascript',
            theme: 'github-dark',
        })

        // Render a simple token array
        const {
            svg: childrenCode,
            height: codeHeight,
            width: codeWidth,
        } = await renderCodeToSVG({
            fontFamily: 'Consolas',
            fontSize: 14,
            bg: '#000',
            tokens,
            svgAttributes: {},
        })
        const padding = 50
        let width = codeWidth + padding * 2
        let height = codeHeight + padding * 2

        let children = xmlbuilder.create(childrenCode)
        const svgElement = children.find((node) => node.node.nodeName === 'svg')

        if (!svgElement) {
            throw new Error('No svg element found')
        }
        svgElement.att('x', String(padding))
        svgElement.att('y', String(padding))

        const grid = CodeOuterGrid({
            width,
            height,
            padding: padding - 4,
            lineColor: 'rgba(255, 255, 255, 0.15)',

            backgroundColor: '#000000',
            outerBackgroundColor: '#000000',
            cornerSize: 15,
            children,
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
