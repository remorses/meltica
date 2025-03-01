// https://github.com/tornqvist/bpm-detective/blob/master/src/detect.js

import { OfflineAudioContext, AudioContext } from 'node-web-audio-api'

const context = new AudioContext()

export async function detectBpm(buffer: ArrayBuffer) {
    // Decode audio into an AudioBuffer
    const data = await context.decodeAudioData(buffer)

    // Run detection
    const bpm = detect(data)
    // Calculate interval in seconds
    const intervalInSeconds = 60 / bpm
    return { bpm, intervalInSeconds }
}

/**
 * Detect BPM of a sound source
 * @param  {AudioBuffer} buffer Sound to process
 * @return {Number}             Detected BPM
 */

export default function detect(buffer: AudioBuffer): number {
    const source = getLowPassSource(buffer)

    /**
     * Schedule the sound to start playing at time:0
     */

    source.start(0)

    /**
     * Pipe the source through the program
     */

    // Use explicit typing for the reduce function to fix type errors
    const channelData = source.buffer!.getChannelData(0)
    const peaks = findPeaks(channelData)
    const intervals = identifyIntervals(peaks)
    const tempoCounts = groupByTempo(buffer.sampleRate)(intervals)
    const bpm = getTopCandidate(tempoCounts)

    return bpm
}

/**
 * Sort results by count and return top candidate
 */
interface TempoCount {
    tempo: number
    count: number
}

function getTopCandidate(candidates: TempoCount[]): number {
    return candidates.sort((a, b) => b.count - a.count).splice(0, 5)[0].tempo
}

/**
 * Apply a low pass filter to an AudioBuffer
 */
function getLowPassSource(buffer: AudioBuffer): AudioBufferSourceNode {
    const { length, numberOfChannels, sampleRate } = buffer
    const context = new OfflineAudioContext(
        numberOfChannels,
        length,
        sampleRate,
    )

    /**
     * Create buffer source
     */

    const source = context.createBufferSource()
    source.buffer = buffer

    /**
     * Create filter
     */

    const filter = context.createBiquadFilter()
    filter.type = 'lowpass'

    /**
     * Pipe the song into the filter, and the filter into the offline context
     */

    source.connect(filter)
    filter.connect(context.destination)

    return source
}

/**
 * Find peaks in sampleRate
 */
function findPeaks(data: Float32Array): number[] {
    let peaks: number[] = []
    let threshold = 0.9
    const minThresold = 0.3
    const minPeaks = 15

    /**
     * Keep looking for peaks lowering the threshold until
     * we have at least 15 peaks (10 seconds @ 90bpm)
     */

    while (peaks.length < minPeaks && threshold >= minThresold) {
        peaks = findPeaksAtThreshold(data, threshold)
        threshold -= 0.05
    }

    /**
     * Too fiew samples are unreliable
     */

    if (peaks.length < minPeaks) {
        throw new Error(
            'Could not find enough samples for a reliable detection.',
        )
    }

    return peaks
}

/**
 * Function to identify peaks
 */
function findPeaksAtThreshold(data: Float32Array, threshold: number): number[] {
    const peaks: number[] = []

    /**
     * Identify peaks that pass the threshold, adding them to the collection
     */

    for (var i = 0, l = data.length; i < l; i += 1) {
        if (data[i] > threshold) {
            peaks.push(i)

            /**
             * Skip forward ~ 1/4s to get past this peak
             */

            i += 10000
        }
    }

    return peaks
}

/**
 * Identify intervals between peaks
 */
interface IntervalCount {
    interval: number
    count: number
}

function identifyIntervals(peaks: number[]): IntervalCount[] {
    const intervals: IntervalCount[] = []

    peaks.forEach((peak, index) => {
        for (let i = 0; i < 10; i += 1) {
            let interval = peaks[index + i] - peak

            /**
             * Try and find a matching interval and increase it's count
             */

            let foundInterval = intervals.some((intervalCount) => {
                if (intervalCount.interval === interval) {
                    intervalCount.count += 1
                    return true
                }
                return false
            })

            /**
             * Add the interval to the collection if it's unique
             */

            if (!foundInterval) {
                intervals.push({
                    interval: interval,
                    count: 1,
                })
            }
        }
    })

    return intervals
}

/**
 * Factory for group reducer
 */
function groupByTempo(
    sampleRate: number,
): (intervalCounts: IntervalCount[]) => TempoCount[] {
    /**
     * Figure out best possible tempo candidates
     */
    return (intervalCounts: IntervalCount[]): TempoCount[] => {
        const tempoCounts: TempoCount[] = []

        intervalCounts.forEach((intervalCount) => {
            if (intervalCount.interval !== 0) {
                /**
                 * Convert an interval to tempo
                 */

                let theoreticalTempo =
                    60 / (intervalCount.interval / sampleRate)

                /**
                 * Adjust the tempo to fit within the 90-180 BPM range
                 */

                while (theoreticalTempo < 90) theoreticalTempo *= 2
                while (theoreticalTempo > 180) theoreticalTempo /= 2

                /**
                 * Round to legible integer
                 */

                theoreticalTempo = Math.round(theoreticalTempo)

                /**
                 * See if another interval resolved to the same tempo
                 */

                let foundTempo = tempoCounts.some((tempoCount) => {
                    if (tempoCount.tempo === theoreticalTempo) {
                        tempoCount.count += intervalCount.count
                        return true
                    }
                    return false
                })

                /**
                 * Add a unique tempo to the collection
                 */

                if (!foundTempo) {
                    tempoCounts.push({
                        tempo: theoreticalTempo,
                        count: intervalCount.count,
                    })
                }
            }
        })

        return tempoCounts
    }
}
