/**
 * Utility function that creates a promise that resolves after the specified time.
 * @param ms The time to sleep in milliseconds. Defaults to 0.
 * @returns A promise that resolves after the specified time.
 */
export function sleep(ms: number = 0): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Type guard function that checks if a value is truthy and not null or undefined.
 * Useful for filtering arrays to remove null/undefined values while preserving type information.
 * 
 * @param value - The value to check
 * @returns A boolean indicating whether the value is truthy, and a type predicate
 */
export function isTruthy<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}
