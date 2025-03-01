import { render, useContext } from 'jsx-xml'
import {
    assetContext,
    compositionContext,
    renderingContext,
    trackContext,
} from '@/context'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import xmlbuilder from 'xmlbuilder2'
import { isXmlBuilder, isElement } from '@/utils'

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

// Global in-memory cache object
const globalMemoMemoryCache: Record<string, any> = {}

let cacheLoaded = false
const cacheDir = '.meltica'
export const cacheFile = path.resolve(cacheDir, 'persistentMemo.json')

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
    try {
        // No need to convert entries with an object
        fs.mkdirSync(cacheDir, { recursive: true })
        fs.writeFileSync(
            cacheFile,
            JSON.stringify(globalMemoMemoryCache),
            'utf8',
        )
    } catch (error) {
        console.warn(`Failed to write cache to disk:`, error)
    }
}

export const loadCacheFromDisk = () => {
    if (cacheLoaded) return

    try {
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true })
        }

        if (fs.existsSync(cacheFile)) {
            const cachedData = fs.readFileSync(cacheFile, 'utf8')
            const parsedCache = JSON.parse(cachedData, reviver)

            // Populate memory cache from disk
            for (const [key, value] of Object.entries(parsedCache)) {
                globalMemoMemoryCache[key] = value
            }
        }
    } catch (error) {
        console.warn(`Failed to load cache from disk:`, error)
        // File might not exist yet, that's okay
    }

    cacheLoaded = true
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
        // Ensure cache is loaded
        loadCacheFromDisk()

        // Create a cache key based on the function name and stringified arguments
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

        // Check if result is in memory cache
        if (cacheKey in globalMemoMemoryCache) {
            return JSON.parse(globalMemoMemoryCache[cacheKey], reviver) as T
        }
        return fn(...args).then((result) => {
            // Save the result to memory cache
            globalMemoMemoryCache[cacheKey] = JSON.stringify(
                result,
                replacer,
                4,
            )
            // TODO remove saving cache on every memo, instead do it on process exit
            // saveCacheToDisk()

            return result
        })
    }
}
