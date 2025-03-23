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

        url: `ws://127.0.0.1:9224`,
    },
    {
        isLive: true,
        autoCleanupSourceBuffer: true,
        stashInitialSize: 0,
        customLoader: MyWebSocketLoader,
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

type Message = {
    type: 'pause' | 'seek' | 'play' | 'stop'
    seek_position?: number
}

{
    const button = document.createElement('button')
    button.textContent = 'Seek Back 1 minute'
    button.onclick = async () => {
        player.pause()
        const currentTime = player.currentTime
        const msg: Message = {
            type: 'seek',
            seek_position: Math.max(0, currentTime - 60), // Seek back 60 seconds from current position, but not before 0
        }
        MyWebSocketLoader.singleton.ws?.send(JSON.stringify(msg))
        discardBufferedData()
    }
    document.body.appendChild(button)
}

player.statisticsInfo
{
    const button = document.createElement('button')
    button.textContent = 'Seek Forward 1 minute'
    button.onclick = async () => {
        player.pause()
        if (!MyWebSocketLoader.singleton.ws) {
            console.log('WebSocket not connected')
            return
        }
        const currentTime = player.currentTime
        const msg: Message = {
            type: 'seek',
            seek_position: currentTime + 60, // Seek forward 60 seconds from current position
        }
        MyWebSocketLoader.singleton.ws.send(JSON.stringify(msg))
        discardBufferedData()
    }
    document.body.appendChild(button)
}

{
    const slider = document.createElement('input')
    slider.type = 'range'
    slider.min = '0'
    slider.max = '60'
    slider.step = '1'
    slider.value = '0'
    slider.style.width = '300px'

    slider.oninput = () => {
        if (!MyWebSocketLoader.singleton.ws) {
            console.log('WebSocket not connected')
            return
        }

        player.pause()
        const msg: Message = {
            type: 'seek',
            seek_position: Number(slider.value),
        }
        MyWebSocketLoader.singleton.ws.send(JSON.stringify(msg))
        discardBufferedData()
    }

    document.body.appendChild(slider)
}
