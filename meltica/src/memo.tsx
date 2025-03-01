import { render, useContext } from 'jsx-xml'
import { createFromFile, FlatCache } from 'flat-cache'
import {
    assetContext,
    compositionContext,
    renderingContext,
    trackContext,
} from 'meltica/src/context'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import xmlbuilder from 'xmlbuilder2'
import { isXmlBuilder, isElement } from 'meltica/src/utils'

type XmlSerialized = {
    type: 'xml'
    xml: string
}

function isXmlSerialized(value: any): value is XmlSerialized {
    return (
        value &&
        typeof value === 'object' &&
        value.type === 'xml' &&
        typeof value.xml === 'string'
    )
}

function reviver(key: string, value: any): any {
    // Handle serialized XML content
    if (isXmlSerialized(value)) {
        // For now, we just return the XML string representation
        // In a more advanced implementation, we might parse this back to a JSX element
        return xmlbuilder.create(value.xml)
    }
    return value
}

const globalMemoMemoryCache = new FlatCache({
    cacheDir: '.meltica',
    lruSize: 1000,
    ttl: 1000 * 60 * 60 * 24 * 7, // 1 week
    cacheId: 'memo.json',
    persistInterval: 100,
})
globalMemoMemoryCache.on('error', (e) =>
    console.error(`error loading cache`, e),
)
globalMemoMemoryCache.load()


// Register handlers to save cache on exit (only once)

process.on('exit', async () => {
    saveCacheToDisk()
})

// Handle process termination events
const handleTermination = async (exitCode: number = 0, errorMessage?: any) => {
    if (errorMessage) {
        console.error(errorMessage)
    }
    saveCacheToDisk()
    process.exit(exitCode)
}

// Handle SIGINT (Ctrl+C) and SIGTERM
process.on('SIGINT', () => handleTermination(0))
process.on('SIGTERM', () => handleTermination(0))

// Save cache to disk
const saveCacheToDisk = () => {
    return globalMemoMemoryCache.save()
}

/**
 * A memoization function that persists results to disk. Should be used on leaf components, because it does not work if a child is a non memoized async component.
 *
 * IMPORTANT: This function should only be used with stateless components.
 * State can also come from contexts, which is currently not factored into the cache key.
 *
 * // TODO: Add an argument for specifying which contexts to include in the cache key
 * to properly handle components that depend on more context values.
 */
export function persistentMemo<T, Args extends object[]>(
    fn: (...args: Args) => Promise<T>,
): (...args: Args) => Promise<T> | T {
    // Load cache from disk on first use

    return (...args: Args): Promise<T> | T => {
        const fnName = fn.name || 'anonymous'
        const { isRegistrationStep, assets, producers } =
            useContext(renderingContext)
        const composition = useContext(compositionContext)
        const asset = useContext(assetContext)
        const track = useContext(trackContext)

        function Container({ children }: { children: any }) {
            return (
                <renderingContext.Provider
                    value={{
                        isRegistrationStep,
                        assets,
                        producers,
                    }}
                >
                    <compositionContext.Provider value={composition}>
                        <assetContext.Provider value={asset}>
                            <trackContext.Provider value={track}>
                                {children}
                            </trackContext.Provider>
                        </assetContext.Provider>
                    </compositionContext.Provider>
                </renderingContext.Provider>
            )
        }

        let foundPromises = false

        function replacer(key: string, value: any): any {
            if (isXmlBuilder(value)) {
                const xml = value.end({ headless: true })
                return {
                    type: 'xml',
                    xml,
                } satisfies XmlSerialized
            }
            if (isElement(value)) {
                try {
                    const xml = render(Container({ children: value })).end({
                        headless: true,
                    })
                    return {
                        type: 'xml',
                        xml,
                    } satisfies XmlSerialized
                } catch (error) {
                    console.warn(`Failed to render element:`, error)
                    foundPromises = true
                }
            }
            return value
        }

        const argsKey = JSON.stringify(
            {
                isRegistrationStep,
                composition,
                asset,
                track,
                producers,
                ...args,
            },
            replacer,
            4,
        )
        if (process.env.DISABLE_CACHE || foundPromises) {
            console.warn(
                `Found promises in arguments, skipping cache for ${fnName}`,
            )
            return fn(...args)
        }

        const hash = crypto.createHash('md5').update(argsKey).digest('hex')
        const cacheKey = `${fnName}_${hash}`

        const cached = globalMemoMemoryCache.get(cacheKey) as string
        if (cached) {
            return JSON.parse(cached, reviver) as T
        }

        return fn(...args).then((result) => {
            // Save the result to memory cache
            globalMemoMemoryCache.set(
                cacheKey,
                JSON.stringify(result, replacer, 4),
            )

            return result
        })
    }
}
