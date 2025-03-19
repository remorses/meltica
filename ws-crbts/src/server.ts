#!/usr/bin/env tsx

import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import fs from 'fs'
import http from 'http'
import express from 'express'

// Configuration
const HTTP_PORT = 8080
const VIDEO_MLT_PATH = process.argv[2] || 'video.mlt'

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

let meltProcess: ChildProcessWithoutNullStreams

app.all('/back-minute', (req, res) => {
    if (!meltProcess) {
        console.log('No melt process found')
        res.sendStatus(404)
        return
    }

    meltProcess.stdin.write('H', 'ascii')
    // meltProcess.stdin.uncork()
    meltProcess.stdin.write(' ', 'ascii')
    meltProcess.stdin.uncork()
    res.sendStatus(200)
})
app.all('/next-minute', (req, res) => {
    if (!meltProcess) {
        console.log('No melt process found')
        res.sendStatus(404)
        return
    }

    meltProcess.stdin.write('L', 'ascii')
    // meltProcess.stdin.uncork()
    meltProcess.stdin.write(' ', 'ascii')
    meltProcess.stdin.uncork()
    res.sendStatus(200)
})

app.get('/stream', (req, res) => {
    // Set appropriate headers for MPEG-TS stream
    // stdbuf flags: -i0: disable stdin buffering, -o0: disable stdout buffering, -e0: disable stderr buffering
    // TODO there is still some buffering somewhere, try stdbuf -i0 -o0 -e0, does not work still
    const command = ` melt ${VIDEO_MLT_PATH} -consumer avformat  muxpreload=0 buffer=0 vcodec=libx264 preset=veryfast muxdelay=0 vb=1984k maxrate=1984k bufsize=0 threads=1 g=60 keyint_min=1 prefill=0 acodec=aac ab=128k f=flv`
    console.log(command)
    // Spawn melt process with the MLT file
    meltProcess = spawn(command, {
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
            ...process.env,
        },
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
