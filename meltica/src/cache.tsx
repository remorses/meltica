import { FlatCache } from 'flat-cache'

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
    const wrap = <T extends Function>(key: string, fn: T): T => {
        return ((...args) => {
            // Create a unique cache key based on the function arguments
            const argsKey = JSON.stringify(args)
            const cacheKey = `${key}:${argsKey}`

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
