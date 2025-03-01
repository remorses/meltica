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

let lineHeight = 1.4

export function getSVGRenderer(options: SVGRendererOptions) {
    const fontFamily = options.fontFamily
    const fontSize = options.fontSize ?? 16

    const _bg = options.bg ?? '#fff'
    const bgCornerRadius = options.bgCornerRadius ?? 4
    const bgSideCharPadding = options.bgSideCharPadding ?? 4
    const bgVerticalCharPadding = options.bgVerticalCharPadding ?? 2

    const measurement = fontsToMeasurement[fontFamily]
    if (!measurement) {
        throw new Error(`Font family ${fontFamily} not supported`)
    }
    const lineheight =
        measurement.height * lineHeight * (fontSize / fontSizeForMeasurement)
    let letterWidth = (measurement.width * fontSize) / fontSizeForMeasurement

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
                (longestLineTextLength + bgSideCharPadding * 2) * letterWidth,
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
                    const yPosition = lineheight * (index + 1)
                    let indent = 0

                    l.forEach((token) => {
                        const tokenAttributes = getTokenSVGAttributes(token)
                        /**
                         * Handle whitespace leading content by splitting into separate text elements
                         */
                        if (
                            token.content.startsWith(' ') &&
                            token.content.search(/\S/) !== -1
                        ) {
                            const firstNonWhitespaceIndex =
                                token.content.search(/\S/)

                            // Whitespace + content, such as ` foo`
                            // Render as separate text elements
                            svg += `<text font-family="${fontFamily}" font-size="${fontSize}" y="${yPosition}" transform="translate(${indent * letterWidth}, 0)" ${tokenAttributes}>${escapeHtml(
                                token.content.slice(0, firstNonWhitespaceIndex),
                            )}</text>`

                            svg += `<text font-family="${fontFamily}" font-size="${fontSize}" y="${yPosition}" transform="translate(${
                                (indent + firstNonWhitespaceIndex) * letterWidth
                            }, 0)" ${tokenAttributes}>${escapeHtml(
                                token.content.slice(firstNonWhitespaceIndex),
                            )}</text>`
                        } else {
                            svg += `<text font-family="${fontFamily}" font-size="${fontSize}" y="${yPosition}" transform="translate(${indent * letterWidth}, 0)" ${tokenAttributes}>${escapeHtml(
                                token.content,
                            )}</text>`
                        }
                        indent += token.content.length
                    })
                    svg += '\n'
                }
            })
            svg = svg.replace(/\n*$/, '') // Get rid of final new lines

            svg += '</g>'
            svg += '\n</svg>\n'

            return svg
        },
    }
}
