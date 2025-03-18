#!/usr/bin/env tsx

import { spawn } from 'child_process'
import fs from 'fs'
import http from 'http'
import express from 'express'

// Configuration
const HTTP_PORT = 8080
const VIDEO_MLT_PATH = process.argv[2] || 'video.mp4'

// Check if the MLT file exists
if (!fs.existsSync(VIDEO_MLT_PATH)) {
    console.error(`Error: MLT file not found at ${VIDEO_MLT_PATH}`)
    process.exit(1)
}

const app = express()

const { createServer } = await import('vite')
const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base: '/',
})
app.use(vite.middlewares)

app.get('/stream', (req, res) => {
    // Set appropriate headers for MPEG-TS stream
    const command = `melt ${VIDEO_MLT_PATH} -consumer cbrts muxrate=10000000 vcodec=libx264 preset=veryfast vb=1984k maxrate=1984k bufsize=3968k real_time=1 g=60 acodec=aac  ab=128k f=flv`
    console.log(command)
    // Spawn melt process with the MLT file
    const meltProcess = spawn(command, {
        shell: true,
        stdio: ['inherit', 'pipe', 'pipe'],
    })
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
})

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(/* html */ `
        <!doctype html>
        <html>
            <head>
                <title>MLT Video Stream</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    #video-container {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    video {
                        width: 100%;
                    }
                </style>
                <script type="module" src="./src/client.ts"></script>
            </head>
            <body>
                <h1>MLT Video Stream</h1>
                <div id="video-container">
                    <video id="videoElement" controls></video>
                </div>
            </body>
        </html>
        
    `)
})

app.use((req, res) => {
    res.status(404).send('Not found')
})

// Start HTTP server
app.listen(HTTP_PORT, () => {
    console.log(`HTTP server running at http://localhost:${HTTP_PORT}`)
    console.log(`Streaming MLT file: ${VIDEO_MLT_PATH}`)
    console.log('Open your browser to http://localhost:8080 to view the stream')
})
