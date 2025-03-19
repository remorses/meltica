import mpegts from 'mpegts.js'

if (!mpegts.getFeatureList().mseLivePlayback) {
    throw new Error(`cannot play mpegts`)
}
var videoElement: HTMLMediaElement = document.getElementById('videoElement')!
var player = mpegts.createPlayer(
    {
        type: 'flv',
        isLive: true,

        url: `http://localhost:8080/stream`,
    },
    {
        enableStashBuffer: false,
        isLive: true,
        accurateSeek: true,

        // liveBufferLatencyChasing: true,
        // liveBufferLatencyChasingOnPaused: true,
        // liveBufferLatencyMaxLatency: 0.2,
        // liveBufferLatencyMinRemain: 0.1,
        liveSync: false,
    },
)
console.log(player)
player.attachMediaElement(videoElement as any)
player.load()

const button = document.createElement('button')
button.textContent = 'Seek Back'
button.onclick = async () => {
    player.pause()
    const res = await fetch('/pause')
    if (!res.ok) {
        console.log('Failed to pause', res.status)
    }
    // https://github.com/xqq/mpegts.js/blob/c7645faf88e66163ae186a350a7d9dc1c889e79a/src/player/live-latency-chaser.ts#L42
    const buffered = videoElement.buffered
    const target = buffered.end(buffered.length - 1)
    
    // https://github.com/xqq/mpegts.js/blob/c7645faf88e66163ae186a350a7d9dc1c889e79a/src/player/player-engine-main-thread.ts#L275
    player._player_engine._onRequestDirectSeek(target)
    
    player.play()
}
document.body.appendChild(button)
