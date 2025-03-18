import mpegts from 'mpegts.js'

if (!mpegts.getFeatureList().mseLivePlayback) {
    throw new Error(`cannot play mpegts`)
}
var videoElement = document.getElementById('videoElement')!
var player = mpegts.createPlayer(
    {
        type: 'flv',
        isLive: true,

        url: 'http://localhost:${HTTP_PORT}/stream.ts',
    },
    {
        liveBufferLatencyChasing: true,
        liveBufferLatencyChasingOnPaused: true,
        liveBufferLatencyMaxLatency: 0.2,
        liveBufferLatencyMinRemain: 0.1,
        liveSync: true,
    },
)
player.attachMediaElement(videoElement as any)
player.load()
