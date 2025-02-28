// server.ts
import NodeMediaServer from 'node-media-server'

const nms = new NodeMediaServer({
    rtmp: {
        port: 1935,
        // chunk_size: 60000,
        gop_cache: false,
        ping: 30,

        ping_timeout: 60,
    },
    http: {
        port: 8000,
        allow_origin: '*',
        mediaroot: './live', // Added required mediaroot property
    },
})
nms.run()

console.log('Node Media Server is running on:')
console.log('RTMP: rtmp://localhost:1935/live')
console.log('HTTP: http://localhost:8000/live')
console.log('To stream, use a stream key like "test"')
console.log('To play: ffplay rtmp://localhost:1935/live/test')
console.log('Or in browser: http://localhost:8000/live/test.flv')
