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


import { createCache } from 'meltica/src/cache'

const codeCache = createCache({
    cacheId: 'code-snippet-cache',
})

const renderCodeSnippetToSVG = codeCache.wrap(
    'code-to-svg',
    async ({
        code,
        lang,
        theme,
        fontFamily,
        fontSize,
        background,
    }: Required<Props>) => {
        const { tokens } = await codeToTokens(code, {
            lang,
            theme,
        })
        const res = renderCodeToSVG({
            fontFamily,
            fontSize,
            bg: background,
            tokens,
        })

        return res
    },
)

type Props = {
    code: string
    lang?: BundledLanguage
    theme?: BundledTheme
    background?: string
    fontFamily?: FontFamily
    fontSize?: number
}

export const CodeSnippet = async function CodeSnippet({
    code,
    lang = 'javascript',
    theme = 'github-dark',
    background = '#282c34',
    fontFamily = 'Consolas' as const,
    fontSize = 14,
}: Props) {
    const { svg } = await renderCodeSnippetToSVG({
        code,
        lang,
        theme,
        fontFamily,
        fontSize,
        background,
    })
    try {
        return create(svg) as any
    } catch (error) {
        console.log(svg)
        console.error('Error creating code SVG:', error)
        return svg
    }
}
