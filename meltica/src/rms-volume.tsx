import { OfflineAudioContext, AudioContext } from 'node-web-audio-api'

const context = new AudioContext()

/**
 * Calculate the LUFS (Loudness Units Full Scale) volume of an audio buffer
 * LUFS is a standardized measurement of perceived loudness
 * @param buffer ArrayBuffer containing audio data
 * @returns Object with LUFS measurement
 */
export async function getLUFSVolume(buffer: ArrayBuffer) {
    // Generate a random ID for timing label
    const timerId = Math.random().toString(36).substring(2, 10);
    console.time(`LUFS calculation ${timerId}`);
    
    // Decode the audio data
    const audioBuffer = await context.decodeAudioData(buffer);
    
    // Create offline context for processing
    const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
    );
    
    
    // Create source node
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Parameters for LUFS calculation
    const blockSize = Math.floor(0.4 * audioBuffer.sampleRate); // 400ms blocks
    const hopSize = Math.floor(0.1 * audioBuffer.sampleRate); // 100ms hop
    
    // Pre-filtering to model human hearing (simplified K-weighting filter)
    const highPassFilter = offlineContext.createBiquadFilter();
    highPassFilter.type = 'highpass';
    highPassFilter.frequency.value = 60;
    highPassFilter.Q.value = 0.7;
    
    const highShelfFilter = offlineContext.createBiquadFilter();
    highShelfFilter.type = 'highshelf';
    highShelfFilter.frequency.value = 1500;
    highShelfFilter.gain.value = 4;
    
    // Connect nodes
    source.connect(highPassFilter);
    highPassFilter.connect(highShelfFilter);
    highShelfFilter.connect(offlineContext.destination);
    
    // Start source and render
    source.start(0);
    const renderedBuffer = await offlineContext.startRendering();
    
    // Calculate LUFS
    let momentaryLoudness: number[] = [];
    let integratedLoudness = 0;
    
    // Process in blocks
    for (let i = 0; i < renderedBuffer.length - blockSize; i += hopSize) {
        let sumSquared = 0;
        
        // Process all channels
        for (let channel = 0; channel < renderedBuffer.numberOfChannels; channel++) {
            const channelData = renderedBuffer.getChannelData(channel);
            
            // Calculate mean square for this block
            for (let j = 0; j < blockSize; j++) {
                sumSquared += channelData[i + j] * channelData[i + j];
            }
        }
        
        // Calculate momentary loudness (in LUFS)
        const meanSquare = sumSquared / (blockSize * renderedBuffer.numberOfChannels);
        const momentary = -0.691 + 10 * Math.log10(meanSquare);
        momentaryLoudness.push(momentary);
    }
    
    // Calculate integrated loudness (average of momentary values above threshold)
    const threshold = -70; // LUFS threshold
    const validMoments = momentaryLoudness.filter(value => value > threshold);
    
    if (validMoments.length > 0) {
        integratedLoudness = validMoments.reduce((sum, value) => sum + value, 0) / validMoments.length;
    }
    
    // Calculate loudness range
    const max = Math.max(...momentaryLoudness);
    const min = Math.min(...momentaryLoudness.filter(value => value > threshold));
    const loudnessRange = max - min;
    
    console.timeEnd(`LUFS calculation ${timerId}`);
    
    return {
        integrated: integratedLoudness,
        momentary: momentaryLoudness,
        max,
        min,
        range: loudnessRange
    };
}
