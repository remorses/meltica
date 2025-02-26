// based on https://github.com/shikijs/shiki/blob/bd779ea535b8787f5e42bf2f350d59c8a12b24d1/packages/renderer-svg/src/index.ts

import type { ThemedToken as IThemedToken } from 'shiki'

import fontkit from 'fontkit'
import { findFontSync } from 'font-scanner'

export interface ThemedToken extends IThemedToken {}

/**
 * Measures a monospace typeface to determine its dimensions
 * @param fontFamily The font family name to measure
 * @returns An object containing the width and height of a single character
 */
export function measureMonospaceTypeface(fontFamily: string): {
    width: number
    height: number
} {
    try {
        // Find the font file path using font-scanner
        const fontPath = findFontSync(fontFamily)

        if (!fontPath) {
            console.warn(
                `Font "${fontFamily}" not found, using fallback measurements`,
            )
            return { width: 9, height: 16 } // Fallback to reasonable defaults
        }

        // Open the font using fontkit
        const font = fontkit.openSync(fontPath)

        // For monospace fonts, we can measure a single character (all have same width)
        const glyph = font.glyphForCodePoint('M'.charCodeAt(0))

        // Get the dimensions
        const width = glyph.advanceWidth
        const height = font.ascent - font.descent

        return {
            width,
            height,
        }
    } catch (error) {
        console.error('Error measuring typeface:', error)
        return { width: 9, height: 16 } // Fallback to reasonable defaults
    }
}

const FontStyle = {
    NotSet: -1,
    None: 0,
    Italic: 1,
    Bold: 2,
    Underline: 4,
    Strikethrough: 8,
} as const

type FontStyle = (typeof FontStyle)[keyof typeof FontStyle]

interface SVGRendererOptions {
    /**
     * A monospace font.
     *
     * If using in Node context and the font is not available in the host machine,
     * provide `cssURL` that loads the font remotely.
     * If using in the browser context, make sure the font is available in the webpage.
     *
     * ```js
     * getSVGRenderer({ fontFamily: 'SF Mono Regular' })
     *
     * getSVGRenderer({ fontFamily: {
     *   name: 'Inconsolata',
     *   cssURL: 'https://fonts.googleapis.com/css2?family=Inconsolata&display=swap'
     * }})
     */
    fontFamily: string

    /**
     * Default to 16px.
     */
    fontSize?: number

    /**
     * How high should a line be, in relation to `fontSize`. Default to 1.4.
     * Extra spaces are distributed evenly on top/bottom of each line.
     */
    lineHeightToFontSizeRatio?: number

    /**
     * Background color. Default to `#fff`.
     */
    bg?: string

    /**
     * Background corner radius. Default to `4px`.
     */
    bgCornerRadius?: number

    /**
     * How much padding should be left to the left/right in relation to font width. Default to 4.
     */

    bgSideCharPadding?: number

    /**
     * How much padding should be left to the top/bottom in relation to
     * line height (`fontSize * lineHeightToFontSizeRatio`). Default to 2.
     */
    bgVerticalCharPadding?: number

    /**
     * Background minimal width. Default to longest line calculated by font-measurements done by Playwright.
     */
    bgMinWidth?: number
}

interface TokenOptions {
    fill: string
    opacity?: string
    'font-weight'?: string
    'font-style'?: string
}

const collectTokenOptions = (options: TokenOptions) => {
    return Object.entries(options)
        .reduce(
            (acc, [key, value]: [string, string | undefined]) =>
                value ? `${acc}${key}="${value}" ` : acc,
            '',
        )
        .trim()
}

function getTokenSVGAttributes(token: IThemedToken) {
    const options: TokenOptions = {
        fill: '#fff',
        opacity: undefined,
        'font-weight': undefined,
        'font-style': undefined,
    }

    if (token.fontStyle && token.fontStyle === FontStyle.Bold) {
        options['font-weight'] = 'bold'
    }
    if (token.fontStyle && token.fontStyle === FontStyle.Italic) {
        options['font-style'] = 'italic'
    }

    if (!token.color) {
        return collectTokenOptions(options)
    }

    if (token.color.slice(1).length <= 6) {
        options.fill = token.color
    } else if (token.color.slice(1).length === 8) {
        const opacity = parseInt(token.color.slice(1 + 6), 16) / 255
        const roughRoundedOpacity = String(Math.floor(opacity * 100) / 100)
        options.fill = token.color.slice(0, 1 + 6)
        options.opacity = roughRoundedOpacity
    }

    return collectTokenOptions(options)
}

const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
} as const

function escapeHtml(html: string) {
    return html.replace(
        /[&<>"']/g,
        (chr) => htmlEscapes[chr as keyof typeof htmlEscapes],
    )
}
export async function getSVGRenderer(options: SVGRendererOptions) {
    const fontFamily = options.fontFamily
    const fontSize = options.fontSize ?? 16
    const lineHeightToFontSizeRatio = options.lineHeightToFontSizeRatio ?? 1.4
    const _bg = options.bg ?? '#fff'
    const bgCornerRadius = options.bgCornerRadius ?? 4
    const bgSideCharPadding = options.bgSideCharPadding ?? 4
    const bgVerticalCharPadding = options.bgVerticalCharPadding ?? 2

    const measurement = await measureMonospaceTypeface(fontFamily)

    const lineheight = measurement.height * lineHeightToFontSizeRatio

    return {
        renderToSVG(lines: IThemedToken[][], { bg } = { bg: _bg }) {
            let longestLineTextLength = 0
            lines.forEach((lTokens) => {
                let lineTextLength = 0
                lTokens.forEach((l) => (lineTextLength += l.content.length))

                if (lineTextLength > longestLineTextLength) {
                    longestLineTextLength = lineTextLength
                }
            })

            /**
             * longest line + left/right 4 char width
             */
            const bgWidth = Math.max(
                options.bgMinWidth ?? 0,
                (longestLineTextLength + bgSideCharPadding * 2) *
                    measurement.width,
            )
            /**
             * all rows + 2 rows top/bot
             */
            const bgHeight =
                (lines.length + bgVerticalCharPadding * 2) * lineheight

            let svg = `<svg viewBox="0 0 ${bgWidth} ${bgHeight}" width="${bgWidth}" height="${bgHeight}" xmlns="http://www.w3.org/2000/svg">\n`

            svg += `<rect id="bg" fill="${bg}" width="${bgWidth}" height="${bgHeight}" rx="${bgCornerRadius}"></rect>`

            svg += `<g id="tokens" transform="translate(${measurement.width * bgSideCharPadding}, ${
                lineheight * bgVerticalCharPadding
            })">`

            lines.forEach((l: IThemedToken[], index: number) => {
                if (l.length === 0) {
                    svg += '\n'
                } else {
                    svg += `<text font-family="${fontFamily}" font-size="${fontSize}" y="${
                        lineheight * (index + 1)
                    }">\n`

                    let indent = 0

                    l.forEach((token) => {
                        const tokenAttributes = getTokenSVGAttributes(token)
                        /**
                         * SVG rendering in Sketch/Affinity Photos: `<tspan>` with leading whitespace will render without whitespace
                         * Need to manually offset `x`
                         */
                        if (
                            token.content.startsWith(' ') &&
                            token.content.search(/\S/) !== -1
                        ) {
                            const firstNonWhitespaceIndex =
                                token.content.search(/\S/)

                            // Whitespace + content, such as ` foo`
                            // Render as `<tspan> </tspan><tspan>foo</tspan>`, where the second `tspan` is offset by whitespace * width
                            svg += `<tspan x="${indent * measurement.width}" ${tokenAttributes}>${escapeHtml(
                                token.content.slice(0, firstNonWhitespaceIndex),
                            )}</tspan>`

                            svg += `<tspan x="${
                                (indent + firstNonWhitespaceIndex) *
                                measurement.width
                            }" ${tokenAttributes}>${escapeHtml(
                                token.content.slice(firstNonWhitespaceIndex),
                            )}</tspan>`
                        } else {
                            svg += `<tspan x="${indent * measurement.width}" ${tokenAttributes}>${escapeHtml(
                                token.content,
                            )}</tspan>`
                        }
                        indent += token.content.length
                    })
                    svg += '\n</text>\n'
                }
            })
            svg = svg.replace(/\n*$/, '') // Get rid of final new lines

            svg += '</g>'
            svg += '\n</svg>\n'

            return svg
        },
    }
}
