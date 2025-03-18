#!/usr/bin/env tsx

import { spawn } from 'child_process'
import fs from 'fs'
import http from 'http'

// Configuration
const HTTP_PORT = 8080
const WS_PORT = 8081
const VIDEO_MLT_PATH = process.argv[2] || 'video.mp4'

// Check if the MLT file exists
if (!fs.existsSync(VIDEO_MLT_PATH)) {
    console.error(`Error: MLT file not found at ${VIDEO_MLT_PATH}`)
    process.exit(1)
}

// Create a simple HTTP server to serve the web page and stream
const httpServer = http.createServer((req, res) => {
    if (req.url === '/stream.ts') {
        // Set appropriate headers for MPEG-TS stream

        const command = `melt ${VIDEO_MLT_PATH} -consumer cbrts muxrate=10000000 vcodec=libx264 preset=veryfast vb=1984k maxrate=1984k bufsize=3968k g=60 acodec=aac ab=128k f=flv`
        console.log(command)
        // Spawn melt process with the MLT file
        const meltProcess = spawn(
            command,
            {
                shell: true,
                stdio: ['inherit', 'pipe', 'pipe'],
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
            console.error(`${data}`)
        })

        // Clean up when the client disconnects
        req.on('close', () => {
            console.log('Client disconnected, killing melt process')
            meltProcess.kill()
        })
    } else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(/* html */ `
            
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
