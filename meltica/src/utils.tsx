import crypto from 'crypto'
import readline from 'readline'
import mime from 'mime-types'
import fs from 'fs'
import path from 'path'
import { execSync, spawn } from 'child_process'
import { fileTypeFromBuffer } from 'file-type'

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

export function fastFileHash(filepath: string): string {
    try {
        const stats = fs.statSync(filepath)
        const fileSizeInMB = stats.size / (1024 * 1024)

        // If file is larger than 5MB, just use the file size as a simple hash
        if (fileSizeInMB > 5) {
            return `size-${stats.size}-${path.basename(filepath)}`
        }

        // For smaller files, compute MD5 hash of the content
        const fileContent = fs.readFileSync(filepath)
        return crypto.createHash('md5').update(fileContent).digest('hex')
    } catch (error) {
        console.error(`Error hashing file ${filepath}:`, error)
        // Return a fallback hash based on the filepath if we can't read the file
        return crypto.createHash('md5').update(filepath).digest('hex')
    }
}

/**
 * Creates a data URL from a file path.
 *
 * @param filePath - The path to the file
 * @returns A Promise that resolves to a data URL string
 */
export async function createDataUrlFromPath(filePath: string): Promise<string> {
    // Read the file
    const buffer = await fs.promises.readFile(filePath)
    
    // Determine MIME type from file extension using mime-types package
    const mimeType = mime.lookup(filePath) || 'application/octet-stream'
    
    return createDataUrlFromBuffer(buffer, mimeType)
}

/**
 * Creates a data URL from a buffer.
 *
 * @param buffer - The buffer containing file data
 * @param mimeType - The MIME type of the data (optional)
 * @returns A Promise that resolves to a data URL string
 */
export async function createDataUrlFromBuffer(buffer: Buffer, mimeType?: string): Promise<string> {
    // If mimeType is not provided, try to detect it from the buffer
    if (!mimeType) {
        const fileType = await fileTypeFromBuffer(buffer);
        mimeType = fileType?.mime || 'application/octet-stream';
    }
    
    // Convert buffer to base64
    const base64Data = buffer.toString('base64')
    
    // Create and return the data URL
    return `data:${mimeType};base64,${base64Data}`
}

/**
 * Generates a random string of specified length.
 * Useful for creating unique identifiers.
 *
 * @param length - The length of the random string (default: 8)
 * @returns A random alphanumeric string
 */
export function randomString(length: number = 8): string {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        )
    }

    return result
}
// Function that uses spawn and returns both stdout and stderr
export function execWithInheritedStdio(command: string, options?: any) {
    return new Promise<{ stdout: string; stderr: string; fullOut: string }>(
        (resolve, reject) => {
            let stdout = ''
            let stderr = ''
            let fullOut = ''
            const childProcess = spawn(command, {
                ...options,
                stdio: [
                    'inherit', // stdin
                    'pipe', // stdout
                    'pipe', // stderr
                ],
                shell: true,
            })

            childProcess.stdout.on('data', (data) => {
                const text = data.toString()
                stdout += text
                fullOut += text
            })

            childProcess.stderr.on('data', (data) => {
                const text = data.toString()
                stderr += text
                fullOut += text
                process.stderr.write(data) // Still show stderr in console
            })

            childProcess.on('close', (code) => {
                if (code === 0) {
                    resolve({ stdout, stderr, fullOut })
                } else {
                    reject(new Error(`Command failed with exit code ${code}`))
                }
            })

            childProcess.on('error', (err) => {
                reject(err)
            })
        },
    )
}

function resetTerminalMode() {
    try {
        // Use readline to reset terminal mode instead of stty

        // Check if stdin is TTY before attempting to use readline functions
        if (process.stdin.isTTY) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            })
            rl.close()
            // Force readline to refresh the line and restore terminal settings
            readline.cursorTo(process.stdout, 0)
            readline.clearLine(process.stdout, 0)
        } else {
            // Skip terminal operations if not in TTY mode
            // console.log('Skipping terminal reset (not in TTY mode)')
        }
    } catch (error) {
        console.warn('Failed to reset terminal settings:', error)
    }
}

// Set up process exit handlers to reset terminal mode
process.on('exit', () => {
    resetTerminalMode()
})

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    // console.log('\nReceived SIGINT (Ctrl+C). Cleaning up...')
    resetTerminalMode()
    process.exit(0)
})
