import { getSVGRenderer } from '@/code/shiki-svg'
import { create } from 'xmlbuilder2'
import {
    BundledLanguage,
    BundledTheme,
    codeToTokens,
    CodeToTokensOptions,
} from 'shiki'

export async function CodeSnippet({
    code,
    lang = 'javascript',
    theme = 'github-dark',
    background = '#282c34',
    fontFamily = "Menlo, Monaco, 'Courier New', monospace",
    fontSize = 14,
}: {
    code: string
    lang?: BundledLanguage
    theme?: BundledTheme
    background?: string
    fontFamily?: string
    fontSize?: number
}) {
    const renderer = getSVGRenderer({
        fontFamily,
        fontSize,
        bg: background,
    })
    const { tokens } = await codeToTokens(code, {
        lang,
        theme,
    })

    const svg = renderer.renderToSVG(tokens)
    return create(svg)
}
