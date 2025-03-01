import { render, renderAsync } from 'jsx-xml'
import fs from 'fs'
import path from 'path'
import xmlbuilder from 'xmlbuilder2'

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
    return JSON.stringify(resolved)
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

export function persistentMemo<T, Args extends any[]>(
    fn: (...args: Args) => Promise<T>,
    cacheDir: string = '.meltica/cache',
): (...args: Args) => Promise<T> {
    return async (...args: Args): Promise<T> => {
        // Create a cache key based on the function name and stringified arguments
        const fnName = fn.name || 'anonymous'
        const argsKey = await stringifyWithPromises(args, '  ')
        const cacheKey = `${fnName}_${Buffer.from(argsKey).toString('base64')}`
        const cacheFile = path.join(cacheDir, `${cacheKey}.json`)

        // Ensure cache directory exists
        try {
            await fs.promises.mkdir(cacheDir, { recursive: true })
        } catch (error) {
            console.warn(`Failed to create cache directory ${cacheDir}:`, error)
        }

        // Check if we have a cached result
        try {
            const cachedData = await fs.promises.readFile(cacheFile, 'utf8')
            return JSON.parse(cachedData, reviver)
        } catch (error) {
            // If there's an error reading the cache, continue to compute the result
            // This will happen if the file doesn't exist or can't be read
        }

        // Compute the result
        const result = await fn(...args)

        // Save the result to cache
        try {
            await fs.promises.writeFile(
                cacheFile,
                await stringifyWithPromises(result, '  '),
                'utf8',
            )
        } catch (error) {
            console.warn(`Failed to write cache for ${cacheKey}:`, error)
        }

        return result
    }
}
