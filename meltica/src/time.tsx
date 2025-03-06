export function formatSecondsToTime(secs: number | string): string
export function formatSecondsToTime(
    secs?: number | string | null,
): string | undefined
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
    if (secs < 0) {
        return '-' + formatSecondsToTime(Math.abs(secs))
    }
    const hours = Math.floor(secs / 3600)
    const minutes = Math.floor((secs % 3600) / 60)
    const seconds = Math.floor(secs % 60)
    const milliseconds = Math.floor((secs % 1) * 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
}

export function parseTimeToSeconds(timeStr: string | number): number {
    if (typeof timeStr === 'number') {
        return timeStr
    }
    // Handle negative times
    if (timeStr.startsWith('-')) {
        return -parseTimeToSeconds(timeStr.slice(1))
    }

    // Split the time string into components
    const parts = timeStr.split(':')
    if (parts.length !== 3) {
        throw new Error(
            `Invalid time format: ${timeStr}. Expected format: HH:MM:SS.mmm`,
        )
    }

    // Split seconds and milliseconds
    const [secondsPart, millisecondsPart = '000'] = parts[2].split('.')

    const hours = parseInt(parts[0], 10)
    const minutes = parseInt(parts[1], 10)
    const seconds = parseInt(secondsPart, 10)
    const milliseconds = parseInt(millisecondsPart.padEnd(3, '0'), 10)

    if (
        isNaN(hours) ||
        isNaN(minutes) ||
        isNaN(seconds) ||
        isNaN(milliseconds)
    ) {
        throw new Error(`Invalid time components in: ${timeStr}`)
    }

    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000
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
