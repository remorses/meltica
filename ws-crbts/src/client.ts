import mpegts from 'mpegts.js'
import { MyWebSocketLoader } from './loader'

if (!mpegts.getFeatureList().mseLivePlayback) {
    throw new Error(`cannot play mpegts`)
}
var videoElement: HTMLMediaElement = document.getElementById(
    'videoElement',
)! as any
var player = mpegts.createPlayer(
    {
        type: 'flv',
        isLive: true,

        url: `ws://localhost:8080/stream`,
    },
    {
        isLive: true,
        // accurateSeek: true,
        autoCleanupSourceBuffer: true,
        stashInitialSize: 0,
        customLoader: MyWebSocketLoader,
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

function discardBufferedData() {
    
    // https://github.com/xqq/mpegts.js/blob/c7645faf88e66163ae186a350a7d9dc1c889e79a/src/player/live-latency-chaser.ts#L42
    const buffered = videoElement.buffered
    const target = buffered.end(buffered.length - 1)

    // https://github.com/xqq/mpegts.js/blob/c7645faf88e66163ae186a350a7d9dc1c889e79a/src/player/player-engine-main-thread.ts#L275
    player['_player_engine']['_onRequestDirectSeek'](target)
    player.play()
}
{
    const button = document.createElement('button')
    button.textContent = 'Seek Back 1 minute'
    button.onclick = async () => {
        player.pause()
        MyWebSocketLoader.singleton.ws?.send('back-minute')
        // const res = await fetch('/back-minute')
        // if (!res.ok) {
        //     console.log('Failed to seek', res.status)
        // }
        discardBufferedData()
    }
    document.body.appendChild(button)
}

{
    const button = document.createElement('button')
    button.textContent = 'Seek Forward 1 minute'
    button.onclick = async () => {
        player.pause()
        if (!MyWebSocketLoader.singleton.ws) {
            console.log('WebSocket not connected')
        }
        MyWebSocketLoader.singleton.ws?.send('next-minute')
        // const res = await fetch('/next-minute')
        // if (!res.ok) {
        //     console.log('Failed to seek', res.status)
        // }

        discardBufferedData()
    }
    document.body.appendChild(button)
}
