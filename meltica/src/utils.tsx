import { render, renderAsync, useContext } from 'jsx-xml'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import xmlbuilder from 'xmlbuilder2'
import { melticaFolder } from '@/rendering'
import {
    compositionContext,
    assetContext,
    trackContext,
    renderingContext,
} from '@/context'

/**
 * Utility function that creates a promise that resolves after the specified time.
 * @param ms The time to sleep in milliseconds. Defaults to 0.
 * @returns A promise that resolves after the specified time.
 */
export function sleep(ms: number = 0): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Type guard function that checks if a value is truthy and not null or undefined.
 * Useful for filtering arrays to remove null/undefined values while preserving type information.
 *
 * @param value - The value to check
 * @returns A boolean indicating whether the value is truthy, and a type predicate
 */
export function isTruthy<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined
}

/**
 * Checks if a value is a JSX element.
 *
 * @param value - The value to check
 * @returns A boolean indicating whether the value is a JSX element
 */
export function isElement(value: any): boolean {
    return (
        value !== null &&
        typeof value === 'object' &&
        (value.$$typeof || (value.type && value.props))
    )
}

/**
 * Checks if a value is an xmlbuilder2 object.
 *
 * @param value - The value to check
 * @returns A boolean indicating whether the value is an xmlbuilder2 object
 */
export function isXmlBuilder(value: any): boolean {
    return (
        value !== null &&
        typeof value === 'object' &&
        typeof value.end === 'function' &&
        typeof value.ele === 'function'
    )
}

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
            saveCacheToDisk()

            return result
        })
    }
}

export async function fastFileHash(filepath: string): Promise<string> {
    try {
        const stats = await fs.promises.stat(filepath)
        const fileSizeInMB = stats.size / (1024 * 1024)

        // If file is larger than 5MB, just use the file size as a simple hash
        if (fileSizeInMB > 5) {
            return `size-${stats.size}-${path.basename(filepath)}`
        }

        // For smaller files, compute MD5 hash of the content
        const fileContent = await fs.promises.readFile(filepath)
        return crypto.createHash('md5').update(fileContent).digest('hex')
    } catch (error) {
        console.error(`Error hashing file ${filepath}:`, error)
        // Return a fallback hash based on the filepath if we can't read the file
        return crypto.createHash('md5').update(filepath).digest('hex')
    }
}
