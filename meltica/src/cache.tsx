import { FlatCache } from 'flat-cache'
import { fastFileHashFromPath } from './utils'
import fs from 'fs'

export interface WrapOptions {
    key: string
    replacer?: (key: string, value: any) => string
}

export function createCache({
    cacheId,
    ttl = 1000 * 60 * 60 * 24 * 7,
    lruSize = 1000,
}) {
    const cache = new FlatCache({
        cacheDir: '.meltica',
        lruSize,
        ttl,
        cacheId,
        persistInterval: 100,
    })
    cache.on('error', (e) => console.error(`error loading cache`, e))
    cache.load()

    // Wrap a function with caching functionality
    const wrap = <T extends Function>(options: WrapOptions, fn: T): T => {
        // Handle string case for backward compatibility
        const key = options.key
        const replacer = options.replacer

        return ((...args) => {
            // Create a unique cache key based on the function arguments
            const argsKey = JSON.stringify(args, replacer)

            // Include function implementation hash in the key for better cache invalidation
            // when the function implementation changes
            const fnHash = fn.toString()
            const cacheKey = `${key}:${argsKey}:${fnHash}`

            // Check if result is already in cache
            const cachedResult = cache.getKey(cacheKey) as any
            if (cachedResult !== undefined) {
                return cachedResult
            }

            // Execute the function and cache the result
            const result = fn(...args)
            if (result instanceof Promise) {
                return result.then((resolvedResult) => {
                    cache.setKey(cacheKey, resolvedResult || null)
                    return resolvedResult
                })
            } else {
                cache.setKey(cacheKey, result || null)
                return result
            }
        }) as any
    }
    return { cache, wrap }
}
