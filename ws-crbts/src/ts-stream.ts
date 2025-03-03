#!/usr/bin/env tsx

import { spawn } from 'child_process'
import fs from 'fs'
import http from 'http'

// Configuration
const HTTP_PORT = 8080
const WS_PORT = 8081
const VIDEO_MLT_PATH = process.argv[2] || 'out.mp4'

// Check if the MLT file exists
if (!fs.existsSync(VIDEO_MLT_PATH)) {
    console.error(`Error: MLT file not found at ${VIDEO_MLT_PATH}`)
    process.exit(1)
}

// Create a simple HTTP server to serve the web page and stream
const httpServer = http.createServer((req, res) => {
    if (req.url === '/stream.ts') {
        // Set appropriate headers for MPEG-TS stream

        // Spawn melt process with the MLT file
        const meltProcess = spawn(
            `melt ${VIDEO_MLT_PATH} -consumer cbrts muxrate=20000000 vcodec=libx264 preset=veryfast vb=1984k maxrate=1984k bufsize=3968k g=60 acodec=aac ab=128k f=flv`,
            {
                shell: true,
                stdio: ['ignore', 'pipe', 'pipe'],
            },
        )
        res.writeHead(200, {
            // 'Content-Type': 'video/mp2t',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        })

        // Pipe the output directly to the response
        meltProcess.stdout.pipe(res)

        // Handle errors
        meltProcess.stderr.on('data', (data) => {
            console.error(`melt stderr: ${data}`)
        })

        // Clean up when the client disconnects
        req.on('close', () => {
            console.log('Client disconnected, killing melt process')
            meltProcess.kill()
        })
    } else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(/* html */ `
            <!DOCTYPE html>
            <html>
            <head>
                <title>MLT Video Stream</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    #video-container { max-width: 800px; margin: 0 auto; }
                    video { width: 100%; }
                </style>
                <script src="https://cdn.jsdelivr.net/npm/mpegts.js/dist/mpegts.min.js"></script>
            </head>
            <body>
                <h1>MLT Video Stream</h1>
                <div id="video-container">
                    <video id="videoElement" controls></video>
                </div>
                <script>
                    if (mpegts.getFeatureList().mseLivePlayback) {
                        var videoElement = document.getElementById('videoElement');
                        var player = mpegts.createPlayer({
                            type: 'flv',
                            isLive: true,
                            url: 'http://localhost:${HTTP_PORT}/stream.ts'
                        });
                        player.attachMediaElement(videoElement);
                        player.load();
                        
                    }
                </script>
            </body>
            </html>
        `)
    } else {
        res.writeHead(404)
        res.end('Not found')
    }
})

// Start HTTP server
httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP server running at http://localhost:${HTTP_PORT}`)
    console.log(`WebSocket server running at ws://localhost:${WS_PORT}`)
    console.log(`Streaming MLT file: ${VIDEO_MLT_PATH}`)
    console.log('Open your browser to http://localhost:8080 to view the stream')
})
