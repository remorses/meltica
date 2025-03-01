// based on https://github.com/shikijs/shiki/blob/bd779ea535b8787f5e42bf2f350d59c8a12b24d1/packages/renderer-svg/src/index.ts

import { fontsToMeasurement } from 'meltica/src/code/fonts-measurements'
import type { ThemedToken as IThemedToken } from 'shiki'

const FontStyle = {
    NotSet: -1,
    None: 0,
    Italic: 1,
    Bold: 2,
    Underline: 4,
    Strikethrough: 8,
} as const

export type FontStyle = (typeof FontStyle)[keyof typeof FontStyle]

let fontSizeForMeasurement = 14

export type FontFamily = keyof typeof fontsToMeasurement

interface SVGRendererOptions {
    tokens: IThemedToken[][]
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
    fontFamily: FontFamily

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
    /**
     * Line height ratio. fontSize * lineHeight will be the line height in px
     */
    lineHeight?: number
    /**
     * Letter spacing as a ratio of fontSize (similar to em units).
     * For example, 0.05 adds spacing of 5% of the fontSize between characters.
     * Default is 0.02 (2% of fontSize).
     */
    letterSpacing?: number
    svgAttributes?: Record<string, string>
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

export function renderCodeToSVG(options: SVGRendererOptions) {
    const fontFamily = options.fontFamily
    const fontSize = options.fontSize ?? 16

    const lines = options.tokens
    const actualBg = options.bg ?? '#fff'

    const bgCornerRadius = options.bgCornerRadius ?? 4
    const bgSideCharPadding = options.bgSideCharPadding ?? 4
    const bgVerticalCharPadding = options.bgVerticalCharPadding ?? 1
    const letterSpacing = options.letterSpacing ?? 0.05

    const measurement = fontsToMeasurement[fontFamily]
    if (!measurement) {
        throw new Error(`Font family ${fontFamily} not supported`)
    }
    const lineHeight = options.lineHeightToFontSizeRatio ?? 1.6
    const lineheightPx = fontSize * lineHeight
    let letterWidth =
        (measurement.width * fontSize) / fontSizeForMeasurement +
        letterSpacing * fontSize

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
        (longestLineTextLength + bgSideCharPadding * 2) * letterWidth,
    )
    /**
     * all rows + 2 rows top/bot
     */
    const bgHeight = (lines.length + bgVerticalCharPadding * 2) * lineheightPx

    const svgAttributes = options.svgAttributes
        ? Object.entries(options.svgAttributes)
              .map(([key, value]) => `${key}="${value}"`)
              .join(' ')
        : ''
    let svg = `<svg viewBox="0 0 ${bgWidth} ${bgHeight}" width="${bgWidth}" height="${bgHeight}" xmlns="http://www.w3.org/2000/svg" ${svgAttributes}>\n`

    svg += `<rect id="bg" fill="${actualBg}" width="${bgWidth}" height="${bgHeight}" rx="${bgCornerRadius}"></rect>`

    svg += `<g id="tokens" transform="translate(${measurement.width * bgSideCharPadding}, ${
        lineheightPx * bgVerticalCharPadding
    })">`

    lines.forEach((l: IThemedToken[], index: number) => {
        if (l.length === 0) {
            svg += '\n'
        } else {
            const yPosition = lineheightPx * (index + 1)
            svg += `<text font-family="${fontFamily}" font-size="${fontSize}" y="${yPosition}" letter-spacing="${letterSpacing * fontSize}px">\n`

            let indent = 0

            l.forEach((token) => {
                const tokenAttributes = getTokenSVGAttributes(token)
                /**
                 * Handle whitespace leading content by splitting into separate tspan elements
                 */
                if (
                    token.content.startsWith(' ') &&
                    token.content.search(/\S/) !== -1
                ) {
                    const firstNonWhitespaceIndex = token.content.search(/\S/)

                    // Whitespace + content, such as ` foo`
                    // Render as separate tspan elements
                    svg += `<tspan x="${indent * letterWidth}" ${tokenAttributes}>${escapeHtml(
                        token.content.slice(0, firstNonWhitespaceIndex),
                    )}</tspan>`

                    svg += `<tspan x="${
                        (indent + firstNonWhitespaceIndex) * letterWidth
                    }" ${tokenAttributes}>${escapeHtml(
                        token.content.slice(firstNonWhitespaceIndex),
                    )}</tspan>`
                } else {
                    svg += `<tspan x="${indent * letterWidth}" ${tokenAttributes}>${escapeHtml(
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

    return { svg, width: bgWidth, height: bgHeight }
}
