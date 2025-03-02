import crypto from 'crypto'
import mime from 'mime-types'
import fs from 'fs'
import path from 'path'

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

/**
 * Creates a data URL for an audio file.
 *
 * @param filePath - The path to the audio file
 * @returns A Promise that resolves to a data URL string that can be used as an audio source
 */
export async function createDataUrlFromPath(filePath: string): Promise<string> {
    // Read the file
    const buffer = await fs.promises.readFile(filePath)

    // Determine MIME type from file extension using mime-types package
    const mimeType = mime.lookup(filePath) || 'audio/mp3'

    // Convert buffer to base64
    const base64Data = buffer.toString('base64')

    // Create and return the data URL
    return `data:${mimeType};base64,${base64Data}`
}
