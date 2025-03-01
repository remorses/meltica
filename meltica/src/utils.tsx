import { render, renderAsync, useContext } from 'jsx-xml'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import xmlbuilder from 'xmlbuilder2'
import { melticaFolder, renderingContext } from '@/rendering'
import { assetContext, compositionContext, trackContext } from '@/components'

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

/**
 * A simplified version of JSON.stringify that resolves promises before stringifying.
 *
 * @param value - The value to stringify
 * @param space - Optional space parameter for formatting
 * @returns A promise that resolves to the JSON string
 */
export async function stringifyWithPromises(
    value: any,
    space?: string | number,
): Promise<string> {
    // Recursively resolve all promises in the object
    const resolved = await resolvePromises(value)

    // Then stringify using our replacer
    return JSON.stringify(resolved, null, space)
}

type XmlSerialized = {
    type: 'xml'
    xml: string
}

// Helper function to recursively resolve promises
async function resolvePromises(value: any): Promise<any> {
    // Handle primitive values and null
    if (value === null || typeof value !== 'object') {
        return value
    }

    // Handle promises
    if (value instanceof Promise) {
        const resolved = await value
        return resolvePromises(resolved)
    }

    // Handle arrays
    if (Array.isArray(value)) {
        return Promise.all(value.map(resolvePromises))
    }

    // Handle JSX elements
    if (isElement(value)) {
        return {
            type: 'xml',
            xml: (await renderAsync(value)).end({ headless: true }),
        } satisfies XmlSerialized
    }
    if (isXmlBuilder(value)) {
        return {
            type: 'xml',
            xml: value.end({ headless: true }),
        } satisfies XmlSerialized
    }

    // Handle objects
    const result: Record<string, any> = {}
    const keys = Object.keys(value)

    // Resolve all properties concurrently
    const resolvedValues = await Promise.all(
        keys.map((key) => resolvePromises(value[key])),
    )

    // Reconstruct the object with resolved values
    keys.forEach((key, index) => {
        result[key] = resolvedValues[index]
    })

    return result
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

// Global in-memory cache map
const globalMemoryCache = new Map<string, any>()
let cacheLoaded = false
const cacheDir = '.meltica'
const cacheFile = path.resolve(cacheDir, 'persistentMemo.json')
// Save cache to disk
const saveCacheToDisk = async () => {
    try {
        const cacheObject = Object.fromEntries(globalMemoryCache.entries())
        await fs.promises.mkdir(cacheDir, { recursive: true })
        await fs.promises.writeFile(
            cacheFile,
            await stringifyWithPromises(cacheObject, '  '),
            'utf8',
        )
    } catch (error) {
        console.warn(`Failed to write cache to disk:`, error)
    }
}

// Register handlers to save cache on exit (only once)

process.on('exit', async () => {
    await saveCacheToDisk()
})

// Handle process termination events
const handleTermination = async (exitCode: number = 0, errorMessage?: any) => {
    if (errorMessage) {
        console.error(errorMessage)
    }
    await saveCacheToDisk()
    process.exit(exitCode)
}

// Handle SIGINT (Ctrl+C) and SIGTERM
process.on('SIGINT', () => handleTermination(0))
process.on('SIGTERM', () => handleTermination(0))

export function persistentMemo<T, Args extends object[]>(
    fn: (...args: Args) => Promise<T>,
): (...args: Args) => Promise<T> {
    // Load cache from disk on first use
    const loadCacheFromDisk = async () => {
        if (cacheLoaded) return

        try {
            await fs.promises.mkdir(cacheDir, { recursive: true })
            const cachedData = await fs.promises.readFile(cacheFile, 'utf8')
            const parsedCache = JSON.parse(cachedData, reviver)

            // Populate memory cache from disk
            for (const [key, value] of Object.entries(parsedCache)) {
                globalMemoryCache.set(key, value)
            }
        } catch (error) {
            // File might not exist yet, that's okay
        }

        cacheLoaded = true
    }

    return async (...args: Args): Promise<T> => {
        // Ensure cache is loaded
        await loadCacheFromDisk()

        // Create a cache key based on the function name and stringified arguments
        const fnName = fn.name || 'anonymous'
        const { isRegistrationStep } = useContext(renderingContext)
        const composition = useContext(compositionContext)
        const asset = useContext(assetContext)
        const track = useContext(trackContext)

        const argsKey = await stringifyWithPromises(
            { isRegistrationStep, composition, asset, track, ...args },
            '  ',
        )
        // Create a hash of the arguments key for a more compact cache key

        const hash = crypto.createHash('md5').update(argsKey).digest('hex')
        const cacheKey = `${fnName}_${hash}`

        // Check if result is in memory cache
        if (globalMemoryCache.has(cacheKey)) {
            return globalMemoryCache.get(cacheKey) as T
        }

        // Compute the result
        const result = await fn(...args)

        // Save the result to memory cache
        globalMemoryCache.set(cacheKey, result)

        return result
    }
}
