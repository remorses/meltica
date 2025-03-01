export function formatSecondsToTime(secs?: number | string | null) {
    if (secs == null) {
        return undefined
    }
    if (typeof secs === 'string') {
        if (secs.includes(':')) {
            return secs
        }
        const parsed = Number(secs)
        if (isNaN(parsed)) {
            throw new Error(`Invalid time string: ${secs}`)
        }
        return formatSecondsToTime(parsed)
    }
    const hours = Math.floor(secs / 3600)
    const minutes = Math.floor((secs % 3600) / 60)
    const seconds = Math.floor(secs % 60)
    const milliseconds = Math.floor((secs % 1) * 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
}

export function formatSecondsToFrames(seconds: number, fps: number): number {
    if (seconds == null) {
        return 0
    }

    const totalFrames = Math.floor(seconds * fps)
    return totalFrames
}

export function secondsToFramePreciseSeconds(
    seconds: number,
    fps: number,
): number {
    if (seconds == null) {
        return 0
    }

    // Calculate the total frames
    const totalFrames = Math.floor(seconds * fps)

    // Convert back to seconds with frame precision
    return totalFrames / fps
}
