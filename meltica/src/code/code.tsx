import {
    FontFamily,
    FontStyle,
    renderCodeToSVG,
} from 'meltica/src/code/shiki-svg'
import { create } from 'xmlbuilder2'
import {
    BundledLanguage,
    BundledTheme,
    codeToTokens,
    CodeToTokensOptions,
} from 'shiki'
import { persistentMemo } from 'meltica/src/memo'

export const CodeSnippet = persistentMemo(async function CodeSnippet({
    code,
    lang = 'javascript',
    theme = 'github-dark',
    background = '#282c34',
    fontFamily = 'Consolas' as const,
    fontSize = 14,
}: {
    code: string
    lang?: BundledLanguage
    theme?: BundledTheme
    background?: string
    fontFamily?: FontFamily
    fontSize?: number
}) {
    const { tokens } = await codeToTokens(code, {
        lang,
        theme,
    })
    const svg = renderCodeToSVG({
        fontFamily,
        fontSize,
        bg: background,
        tokens,
    })

    return create(svg)
})
